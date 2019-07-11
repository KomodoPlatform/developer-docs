# Advanced Series — Miscellaneous

This last tutorial in the Advanced Series provides miscellaneous information that our development team considered to be useful for prospective developers. 

Congratulations on finishing the Advanced Series. Make sure to reach out to the Komodo team to see if there are any bounties that you can fill with your new ability to create Antara Modules. And we welcome you to the Komodo ecosystem as a prepared developer. We look forward to seeing what you create.

## Terminology

| Term | Definition |
| ---- | ---------- |
| CryptoCondition, or CC | An encoded expression, coupled with a supporting C library, that allows the Smart Chain's consensus mechanism to check several types of logical conditions based on electronic signatures and hashes |
| Antara module | A collection of customized code that a developer adds into the default daemon to add unique functionality, including customized consensus rules and more |
| CC input | A transaction input, CC encoded. Typically spends value from a CC output |
| CC output | A transaction output, CC encoded |
| funding plan | The txid of an Antara Module's initial transaction, it is the identifier for all of the Antara module's CC transactions, related to this funding plan |
| normal inputs | Inputs spending value from normal transaction outputs (not CC outputs) |
| normal outputs | Not CC outputs, but normal transaction outputs (pubkey, pubkey hash, etc.) |
| OP_RETURN, opreturn | A special output in a transaction that holds user and module data. The output is prepended by  an OP_RETURN script opcode and therefore spending from this output is impossible |
| tx, txn | Short for "transaction" |
| txid | Transaction id; a hash of a transaction |
| unspendable address | The global cc contract address, for which its public and private key are commonly known. This address is used for conditionally sharing funds between contract users. As the address's private key is not a secret, by default anyone can spend value from this address. However, CC validation code often applies business logic conditions and checks to ensure that only transactions that meet the given criteria are actually able to spend funds in this address |
| vin | An input, or an array of inputs, in a transaction structure (tx.vin) |
| vout | An output, or an array of outputs, in a transaction structure (tx.vout) |

## CC contract patterns

The following are useful patterns during Antara module development.

### Baton Pattern

The baton pattern allows the developer to organize a single-linked list in a Smart Chain. This list is formed by transactions which spend the baton from a previous transaction.

To traverse a linked list using the baton method, start with the first transaction in any plan instance and iterate through the other transactions to collect properties in their opreturns.

Example:

Add a baton to a transaction by sending a small fixed fee to a predefined output:
```cpp
mtx.vout.push_back(MakeCC1vout(cp->evalcode, 10000, Mypubkey()));  // BATON_VOUT
```
We use the baton on my pubkey here (the pubkey from the '-pubkey' daemon parameter).

Iterate through the transactions marked with the baton:
```cpp
int64_t EnumerateBatons(uint256 initialtxid)
{
    int64_t total = 0LL;
    int32_t vini;
    int32_t height;
    int32_t retcode;

    uint256 batontxid;
    uint256 sourcetxid = initialtxid;

    // iterate through the tx spending the baton, adding up amount from the tx opreturn
    while ((retcode = CCgetspenttxid(batontxid, vini, height, sourcetxid, BATON_VOUT)) == 0)  // find a tx which spent the baton vout
    {
        CTransaction txBaton;
        uint256 hashBlock;
        uint8_t funcId;
        int64_t amount;

        if (GetTransaction(batontxid, txBaton, hashBlock, true) &&  // load the transaction which spent the baton
            !hashBlock.IsNull() &&                           // tx not in mempool
            txBaton.vout.size() > BATON_VOUT &&             
            txBaton.vout[BATON_VOUT].nValue == 10000 &&     // check baton fee 
            (funcId = DecodeOpReturn(txBaton.vout.back().scriptPubKey, amount)) != 0) // decode opreturn
        {    
             total += amount;
        }
        else
        {
            // some error:
            return -1;
        }
        sourcetxid = batontxid;
    }
    return total;
}
```



### Marker Pattern

The marker pattern is used to place a mark on all similar transactions. This is accomplished by sending a small value to a common fixed address. Typically, we use the global CC address.

You can also create either a normal marker or a CC marker for the purpose of finding transactions related to your module.

When using normal markers, there is a small problem that is easily solved. The global CC address allows any user to spend its funds, and therefore anyone can spend your marker transaction. To overcome this, use the CC SDK function, `Settxids()`, to retrieve all transactions with markers in the CC contract list function.

Another method is to create an unspendable CC marker. In this method, send a small value to a CC output with a well-known address. To retrieve the list of CC-marker transactions, use the CC SDK function, `SetCCunspents()`. This returns a list of transactions with unspent outputs for that known address.

When using the unspendable CC marker method, in the validation code you should disable spending from this address.  This prevents a scenario where spending from the address causes you to lose markers. (For example, if you were to allow for spending from this address using a burn transaction, the burn transactions would take the burned markers into a hidden state, thus removing the markers from the list of initial transactions.)

In all cases, the CC module validation code should disable unauthorized attempts to spend any markers.

Concerning the method that relies on the CC marker, if the global CC address is used for storing not only the marker value, but also other funds, you need to ensure that marker values are not spent.

A code example for finding transactions marked with a normal marker:

```cpp
    std::vector<std::pair<CAddressIndexKey, CAmount> > addressIndex;
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, <some eval code>);
    SetCCtxids(addressIndex, cp->normaladdr, false);
    for (std::vector<std::pair<CAddressIndexKey, CAmount> >::const_iterator it = addressIndex.begin(); it != addressIndex.end(); it++) 	{
        CTransaction vintx;
        uint256 blockHash;
        if( GetTransaction(it->first.txhash, vintx, blockHash, false) ) {
            // check tx and add its txid to a list
        }
    }
```

Many other Antara modules contain examples for finding marked transactions in any CC module standard list function.

::: tip

The <b>SetCCtxids()</b> function requires that the Smart Chain [<b>txindex</b>](../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#txindex) launch parameter NOT be adjusted beyond the default and automatic settings.

:::

A code example for finding transactions marked with an unspendable CC marker:

```cpp
    std::vector<std::pair<CAddressIndexKey, CAmount> > addressIndex;
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, <some eval code>);
    SetCCunspents(addressIndexCCMarker, cp->unspendableCCaddr, true);
    for (std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue> >::const_iterator it = addressIndexCCMarker.begin(); it != addressIndexCCMarker.end(); it++) {
        CTransaction vintx;
        uint256 blockHash;
        if( GetTransaction(it->first.txhash, vintx, hashBlock, false) ) {
            // check tx and add its txid to a list
        }
    }
```

::: tip

The <b>CCunspents()</b> function requires the Smart Chain [<b>addressindex</b>](../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#addressindex) and [<b>spentindex</b>](../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#spentindex) launch parameters to be set to `1`.

:::


### Txidaddress Pattern <!-- I updated this, as I split the first version of txidaddress pattern into 2 patterns-->

You can use the txidaddress pattern to send value to an address from which the value should never again be spent.

A function CCtxidaddr is available for creating an address that is not associated with any known private key. It creates a public key with no private key from a transaction id.

For example, the [<b>Payments</b>]() Antara Module uses `CCtxidaddr` to create a non-spendable txidpk from the `createtxid`. Furthermore, the module also uses the `GetCCaddress1of2` function to create a `1of2` address from both the Payments module global pubkey and txid-pubkey.

This allows the module to collect funds on a special CC address that is intended only for a particular type of creation transaction. Funds are sent to this address via the `MakeCC1of2vout` function. Only the Payments module global pubkey and txid-pubkey can successfully create transaction that can be sent to this special address.

<!-- 

dimxy6 seems this looks very much like yet another pattern 

sidd: would you like to rename it and/or add in a separate headline? Feel free to do so, if that would be best.
--><!-- dimxy7 added a new pattern description and made the current one shorter -->

How to create an unspendable publickey for a transaction id:
```cpp
// use Antara SDK function to create a public key from some transaction id:
CPubKey txidpk = CCtxidaddr(txidaddr, createtxid);
```

How to create a cc vout with 1 of 2 pubkeys, one of which is txid pubkey
```cpp
// create a cc vout with 1 of 2 pubkeys, one of which is txid pubkey
mtx.vout.push_back(MakeCC1of2vout(EVAL_PAYMENTS, inputsum-PAYMENTS_TXFEE, Paymentspk, txidpk));
```

How to spend 1 of 2 pubkeys outputs with txid pubkey in a previous transaction:
```cpp
// function AddPaymentsInputs adds inputs from the address of 1of2 pubkeys (global and txid pk) outputs to the mtx object (the function parameters are not important for now): 
if ( (inputsum= AddPaymentsInputs(true,0,cp,mtx,txidpk,newamount+2*PAYMENTS_TXFEE,CC_MAXVINS/2,createtxid,lockedblocks,minrelease,blocksleft)) >= newamount+2*PAYMENTS_TXFEE )
{
    // Get the address for 1 of 2 pubkeys cc output (into `destaddress` variable):
    GetCCaddress1of2(cp, destaddr, Paymentspk, txidpk);

    // Set the pubkeys, address and global private key for spending the 1 of 2 pubkeys address (which also consists of the global and txid pk) in the previous transaction: 
    CCaddr1of2set(cp, Paymentspk, txidpk, cp->CCpriv, destaddr);

    // Sign the transaction in the mtx variable:
    std::string rawtx = FinalizeCCTx(0, cp, mtx, mypk, PAYMENTS_TXFEE, CScript());
    // return `rawtx` to the user...
}
```

### Application data in cryptocondition vout ('cc opret') <!-- dimxy restored from my prev patch. This is 2nd part of split txidaddress pattern split into 2 patterns-->

With the latest changes to Antara SDK there is a possibility appeared to add application data to cryptocondition output ('cc opret'). This allows more flexibility in creation of Antara Module transactions: as cc output content is hashed and not directly readable, with cc opret it is possible to add some identification data to a cc output to distinguish this vout from other vouts. It is also possible to put any application data to cc vouts instead of the last vout as it was always done before. This allows to have outputs of two or more Antara modules in the same transaction (for example, to make swaps of values between modules or other similar purposes).

An example of cc opret usage is the Payments module, where the `vData` optional parameter in MakeCC1of2vout function is used to append the opreturn data directly to the `ccvout` itself, rather than an actual opreturn as the last `vout` in a transaction. 

```cpp
std::vector<unsigned char>> opret = EncodePaymentsMergeOpRet(createtxid);  // create Antara module opreturn data

// create a public key from a transaction id as it was made in 'Txidaddress pattern':
CPubKey txidpk = CCtxidaddr(txidaddr, createtxid);

// create vData object that will be added to cc vout:
std::vector<std::vector<unsigned char>> vData = std::vector<std::vector<unsigned char>>();

// Put the opreturn into vData object:
if ( makeCCopret(opret, vData) )  {
    // pass vData object as the last parameter in MakeCC1of2vout:
    mtx.vout.push_back(MakeCC1of2vout(EVAL_PAYMENTS, inputsum-PAYMENTS_TXFEE, Paymentspk, txidpk, &vData));
}
    
// some other stuff to prepare the parameters for signing the transaction:    
GetCCaddress1of2(cp, destaddr, Paymentspk, txidpk);
CCaddr1of2set(cp, Paymentspk, txidpk, cp->CCpriv, destaddr);

// sign the transaction:
rawtx = FinalizeCCTx(0, cp, mtx, mypk, PAYMENTS_TXFEE, CScript());  // use the empty last vout opreturn, we don't need it any more
```

Now this is an example how to use cc opret data for identification of Antara module cc outputs (remember that a cc output's content is hashed and it is a problem to identify a cc vout). Using a modification to the `IsPaymentsvout` function, we can now spend a `ccvout` in the Payments module back to its own address, without needing a `markervout` or an opreturn.

```cpp
// function used to check if this is a Payments module vout:
int64_t IsPaymentsvout(struct CCcontract_info *cp, const CTransaction& tx, int32_t v, char *cmpaddr, CScript &ccopret)
{
    char destaddr[64];
    
    // use getCCopret instead of the former usage of IsPayToCryptoCondition() function
    // retrieve the application data from cc vout script pubkey and return it in the `ccopret` reference variable:
    if ( getCCopret(tx.vout[v].scriptPubKey, ccopret) )
    {
        if ( Getscriptaddress(destaddr, tx.vout[v].scriptPubKey) && (cmpaddr[0] == 0 || strcmp(destaddr, cmpaddr) == 0) )
            return(tx.vout[v].nValue);
    }
    return(0);
}
```
Note, that if you need additionally differenciate the cc outputs in a transaction (for example, from another Antara module vouts) you may also analyze the ccopret content, specifically the eval code stored in it. 

In place of the `IsPayToCryptoCondition()` function we can use the `getCCopret()` function. This latter function is a lower level of the former call, and will return any `vData` appended to the `ccvout` along with a `true`/`false` value that would otherwise be returned by the `IsPayToCryptoCondition()` function. 

In validation, we now have a totally different transaction type than the types that are normally available. This new type allows us to have different validation paths for different `ccvouts`, and it allows for multiple `ccvouts` of different types per transaction.

```cpp
if ( tx.vout.size() == 1 )
{
    // IsPaymentsvout returns application data in `ccopret` variable, the returned data is checked immediately:
    if ( IsPaymentsvout(cp, tx, 0, coinaddr, ccopret) != 0 && ccopret.size() > 2 && DecodePaymentsMergeOpRet(ccopret, createtxid) == 'M' )
    {
        fIsMerge = true;
    } else return(eval->Invalid("not enough vouts"));
}
```

## Various Tips and Tricks in Antara Module Development

#### Test Chain Mining Issue

On a test chain consisting of two nodes, we do not recommend that you set both nodes to mine. When there are only two nodes, a blockchain struggles more to achieve consensus, and the chain can quickly stop syncing properly. Instead, have only one node mine for the two-node test chain.

#### Limits on AddNormalInputs() Function Calls per Transaction

Keep the number of `AddNormalInputs()` function calls to one for each block of code that creates a transaction.

As an example of why we should not exceed more than one call, we can look at the `FillSell()` function. This function calls `AddNormalInputs()` two times at once. The first time the `AddNormalInputs()` function must add a txfee and the second time it adds coins to pay for tokens.

Let us suppose we have only two utxos in our wallet, one for `9,000,000` satoshis and another for `10,000` satoshis. In this case, when we execute the `FillSell()` function our large uxto is added during the first call and then we receive an error in the second call, `filltx not enough utxos`.

Instead, we recommend that the developer place only one I think it is always better to combine these calls into a single call.

#### Troubleshooting Node Syncing on Test CC Chain

Sometimes, a developer may find after developing a new CC module that a node cannot sync with other nodes in their test network. Executing the [<b>getpeerinfo</b>](../basic-docs/smart-chains/smart-chain-api/network.html#getpeerinfo) shows fewer synced blocks than synced heads. The developer may also see errors in the console log on the malfunctioning node.

When this happens, the cause is most commonly rooted in the CC module's validation code. For example, the developer may have changed validation rules, and in so doing may have rendered old transactions invalid in the node's state.

A quick remedy in this situation is to [manually delete the blockchain data on the malfunctioning node and resync the network.](../basic-docs/smart-chains/smart-chain-setup/smart-chain-maintenance.html#manually-deleting-blockchain-data) Old transactions should pass validation, assuming the new validation code takes their situation into account.

When resyncing the node is not a viable solution, another option is to use code logging and the gdb debug software to investigate the cause of failure.

Yet another solution, if necessary, is to setup the validation code to only be effective after a certain block height. See the following example.

```cpp
if (strcmp(ASSETCHAINS_SYMBOL, "YOURCHAIN") == 0 && chainActive.Height() <= 501)
    return true;
```

You may also use the hidden `reconsiderblock` komodo-cli command to restart the malfunctioning node's syncing process at a desired block height.

#### Deadlocks in Validation Code

If komodod hangs while executing Antara module validation code, consider that some blockchain functions use locks. The combination of your validation code and the locks could be causing deadlocks in the consensus mechanism. If this is the case, use functions that are non-locking instead.

For example, the `GetTransaction()` function is a locking function. Instead, use `myGetTransaction()` or `eval->GetConfirmed()`.
