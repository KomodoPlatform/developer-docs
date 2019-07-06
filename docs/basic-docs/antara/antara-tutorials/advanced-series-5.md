# Advanced Series — Developing the Heir Module Prototype

## Heir Module Development

Having finished an overview of the Antara development layout, we are now prepared to create a simplified prototype of the [Heir Module](../basic-docs/fluidity/fluidity-api/heir.html#introduction).

#### Links to Heir Source Code and Building Instructions

A complete working example of this simplified Heir CC module tutorial can be found at the following link. We invite the reader to download and review the final code while progressing through the tutorial.

[Link to Simplified Heir Module](https://github.com/dimxy/komodo/tree/heir-simple)

The source files are found in the following directories.

- src/cc/heir.cpp
- src/cc/CCheir.h
- src/wallet/rpcwallet.cpp
- src/rpc/server.cpp
- src/rpc/server.h

#### Downloading and Installing From Source

At this time, the reader will need to have the Komodo Smart Chain source code available. The reader begins with this default source code and adds to it to create a new Antara Module.

Instructions to download and build Komodo software is found here.

[Link to Instructions for Building from Source](../../../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html#linux)

## Begin Development

Our tasks are the following:

- Add a new `EVAL` code to represent this module
- Create a global CC address
- Define the Heir Module transactions
  - vouts, or logical conditions
  - vins, or logical fulfillments
- Implement the RPC interface
- Create the validation code

## Create the EVAL Code

In a previous section of this advanced series, we discussed the nature of creating a new EVAL code for an Antara Module.

[<b>Link to EVAL code instructions here.</b>](../../../basic-docs/antara/antara-tutorials/advanced-series-2.html#the-eval-code)

Review the above linked section and attempt to create an EVAL code on your own for this simplified Heir Module.

When you are finished with your attempt, compare your results with the downloadable files for this tutorial.

[<b>Link to EVAL code source file in simplified Heir Module downloadables.</b>](https://github.com/dimxy/komodo/blob/heir-simple/src/cc/eval.h)

## Global CC Address

We also recently discussed the method of adding a Global CC Address as a part of initiating a new Antara Module.

[<b>Link to Global CC Address instructions here.</b>](../../../basic-docs/antara/antara-tutorials/advanced-series-2.html#creating-a-global-cc-address)

Review the above linked section and attempt to create a Global CC Address on your own. 

When you are finished with your attempt, compare your results with the downloadable files for this tutorial.

<!--

Sidd: Please correct the link below, if needed.

-->

[<b>Link to Global CC Address file in simplified Heir Module downloadables.</b>](https://github.com/dimxy/komodo/blob/heir-simple/src/cc/CCcustom.cpp)

## Heir Module Transactions

We require three types of module transactions

- an initial transaction with which a user creates the fund for inheritance
- a transaction for additional funding
- a transaction for spending funds by the owner or heir

#### The Initial Transaction: Creating a Fund

| Input/Output | Description |
| ------------ | ----------- |
| `vins.*` | <b>Normal input</b> <br> - The `*` notation implies that this can apply to any number of inputs <br> - These vins are typical of core blockchain software and not related to CC |
| `vout.0` | <b>The `1of2` CC address that holds the funds that belong to the owner and, once available, to the heir</b> |
| `vout.1` | <b>The transaction fee to account for the `vout.0` amount above</b> <br> - The amount in `vout.1` is used as a marker. We will discuss markers and their uses cases further on in the tutorial |
| `vout.2` | <b>Normal change</b> <br> - Recall that `change` is the leftover amount from the original utxo that the user does not intend to send to the destination address, and which the user desires to keep <br> - Any amount of leftover funds not included in the `change` utxo is forfeited to the miner of the block; this is how miners receive their mining fee |
| `vout.n-1` | <b>OP_RETURN EVAL_HEIR 'F' ownerpk heirpk inactivitytime heirname</b> <br> - This is the is the opreturn vout, and it contains any data relevant to the module <br> - The 'F' is a flag that indicates that this transaction is a "Funding" CC transaction <br> - `ownerpk` and `heirpk` respectively represent the pubkeys of the owner and heir <br> - Concerning `inactivitytime`, the owner should either make a donation to or spend from the `1of2` address within the `inactivitytime` amount of time to prevent opening the `1of2` address to the heir for spending. <br> - `heirname` is the name of this instance of the Heir Module |

Through a funding transaction, the owner of the initial funds creates a "plan," which we can also call a "contract," and deposits funds for future spending.

The initial funds are taken from the normal `vout` values of a utxo. The initial transaction of this plan can be the beginning of the relationship between the funds in the utxo and the Heir Module.

The main funds for the plan are allocated to `vout.0` of our CC transaction.

By design, and setting aside issues of timing, we desire that either the owner or the inheritor of the funds should be able to spend this utxo. We assume that the owner has one address, and the inheritor has another. To achieve this, we use an advanced CryptoConditions feature that states that either of two addresses can spend the funds. This is called a `1of2` CryptoCondition, and it is placed as a logical condition into `vout.0`. 

A fee is allocated to `vout.1`. This is used as a marker. The marker allows a developer to use a special SDK function, `SetCCunspents()`, to create a list of all initial transactions for the module.

As usual, out of the remaining amount of our initial utxo, we need to send all that we desire to keep to our `change` address.

Also, we need to leave an amount as an incentive for the miner. Any remainder beyond the sum total of our new `vout` values will automatically be allocated in this manner. We typically leave `10000` satoshis of our Smart Chain coin, by convention.

Note the `F` letter in the opreturn structure. The `F` stands for "fund." By convention, the first byte of any opreturn is the `EVAL` code. The second byte is the transaction functional id, we use it to understand the transaction data structure in the opreturn.

We also stored other relevant data in the opreturn:

- The owner and inheritor pubkeys
- Inactivity time
  - this is the amount of seconds during which the owner must exhibit activity to maintain sole control over the funds
  - If the owner does not spend funds during this time period, the inheritor will gain the ability to spend these funds as well
- The descriptive name of this funding plan

#### The Add Coins Transaction

| Input/Output | Description |
| ------------ | ----------- |
| `vins.*` | normal inputs |
| `vout.0` | the funding CC `1of2` address for the owner and heir. This address consists of two parts: the owner and heir pubkeys. Either owner or heir can spend this vout |
| `vout.1` | normal change |
| `vout.n-1` | OP_RETURN 'A' fundingtxid HasHeirSpendingBegun |

This transaction serves the purpose of adding more funds to the owner's address. The transaction uses normal coin inputs (non-CC) and sends them to the CC `1of2` address.

We include the transaction id (txid) of the initial transaction in the opreturn to bind the add transaction to the plan.

Note the functional id, `A`. This flag indicates that this transaction is an `add` type of funding transaction.

#### The Claim Coins Transaction

| input/output | description |
| ------------ | ----------- |
| vin.0 | normal input transaction fee |
| vin.1+ | input from CC `1of2` address |
| vout.0 | normal output, sent to the owner or the heir address |
| vout.1 | `change` to CC `1of2` address |
| vout.2 | `change` to user's address from transaction fee input, if any |
| vout.n-1 | OP_RETURN EVAL_HEIR `C` fundingtxid HasHeirSpendingBegun |

This transaction allows either the owner or the heir to spend funds from this plan instance.

To pay the transaction fee to the miners, the transaction has a normal input that draws from the wallet of the transaction creator.

The transaction also has a CC input for spending the claimed value from the `1of2` fund address.

As for outputs, the claimed value is sent to the claimer's normal address, allowing the claimer to spend funds as usual. Unspent or leftover "change" from the transaction is returned to the `1of2` address.

We also indicate the normal `change`.

The functional id, `C`, in the opreturn indicates that this is a "claim" type transaction.

We also include all the same opreturn data as in the `A` transaction, include the `fundingtxid` and the `HasHeirSpendingBegun` flag.

## Heir Module RPC Implementations

#### heirfund

For a user to call the `heirfund` RPC, the user will need to supply the name of the RPC and its parameters as arguments.

We model the syntax as follows:

```bash
./komodo-cli -ac_name=YOURCHAIN heirfund amount name heirpubkey inactivitytime
```

##### Descriptions of the heirfund Syntax

| Argument | Type | Description |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| amount         | (number)           | The initial funding amount, in coins or tokens <br> - This parameter is considered to be the amount of tokens if the tokenid parameter is present)   |
| name           | (string)           | The name of the heir funding plan (arbitrary)                                                                                                    |
| heirpubkey     | (string)           | The heir's public key (in hexademical)                                                                                                           |
| inactivitytime | (number)           | The time (in seconds) that must pass without the owner executing an `heiradd` or `heirclaim` method, after which the address unlocks to the heir |

#### Adding the Command to the Source File

To add a new command to `komodo-cli` we open the `src/server.cpp` source file add a new element to the `vRPCCommands` array.

```cpp
    { "heir",       "heirfund",   &heirfund,      true },
```

| Object | Description |
| ------ | ----------- |
| heir | a common name for all heir contract RPC calls |
| heirfund | the name of the new command |
| &heirfund | the address of the RPC interface function |
| true | indicates that the command description will be shown in the help command output; placing `false` here would hide this RPC from the help menu |

#### Add the RPC Function Declaration

We add the RPC function declaration in the `rpc/server.h` source file.

The declaration in this file is essentially the same across all RPC functions.

```cpp
UniValue heirfund(const UniValue& params, bool fHelp);
```

### The Two Levels of an RPC Implementation

There are two levels to an RPC implementation.

The first level is a short RPC function that has the same name as the RPC command itself (such as `heirfund`).

The body of this level is added to a source file in the `rpc/` subdirectory in the source code (for this example, we added the RPC functions for Heir Module in the wallet/rpcwallet.cpp).

Creating a new RPC source file for each Antara Module's RPC functions is considered a best practice.

This function checks the RPC parameters and the needed environment, and then forwards the RPC to the second level.

To begin the RPC command, we declare the `heirfund` function and clear the global error object.

```cpp
// heirfund command rpc-level implementation, src/wallet/rpcwallet.cpp
UniValue heirfund(const UniValue& params, bool fHelp)

    CCerror.clear(); // clear global error object
```

Recall that a Smart Chain must have the [<b>ac_cc</b>](../basic-docs/smart-chains/smart-chain-setup/smart-chain-customizations.html#ac-cc) and [<b>ac_ccenable</b>](../basic-docs/smart-chains/smart-chain-setup/smart-chain-customizations.html#ac-ccenable) customization parameters properly initiated for any Antara Module to function.

Therefore, we check that the wallet and Heir Module features are available in the Smart Chain. We also check the RPC parameter's required number:

Ensure that the wallet object is initialized:

```cpp
    if (!EnsureWalletIsAvailable(fHelp))
        return NullUniValue;
```

Ensure that the chain parameters needed for Antara Modules are correctly set. For example, [<b>addressindex</b>]() and [<b>spentindex</b>]() should both be enabled. Also, ensure that the Heir Module is enabled on this chain.

```cpp
    if (ensure_CCrequirements(EVAL_HEIR) < 0)
        throw runtime_error("to use CC contracts, you need to launch daemon with valid -pubkey= for an address in your wallet\n");
    // output help message if asked or params count is incorrect:
    if (fHelp || params.size() != 4 )
        throw runtime_error("heirfund funds heirname heirpubkey inactivitytime\n");
```

Lock the user's wallet:

```cpp
    LOCK2(cs_main, pwalletMain->cs_wallet);
```

The `UniValue` object is a special type used to pass data in RPC calls. The `UniValue` object is native to all blockchains based on the Bitcoin protocol. For parameters, UniValue requires an array of UniValue objects.

We must convert these UniValue objects into normal C/C++ language types, and then pass them to the second level of our module implementation.

Convert the parameters from the UniValue type to their basic C++ types and add checks to ensure that the converted parameter values are correct.

This content is abbreviated. [For links to the full source code and example files, click here.](../../../basic-docs/antara/antara-tutorials/heir-module-tutorial.html#links-to-heir-source-code-and-building-instructions)

Note the method for parsing the hex representation of the pubkey parameter and converting it to a `CPubKey` object.

```cpp
    CAmount amount = atof(params[0].get_str().c_str()) * COIN;  // Note conversion from satoshis to coins through a multiplication of 10E8
    if( amount < 0 )
    	throw runtime_error("amount cant be negative");
    std::string name = params[1].get_str();
    std::vector<uint8_t> vheirpubkey = ParseHex(params[2].get_str().c_str());
    CPubKey heirpk = pubkey2pk(vheirpubkey);
    int64_t inactivitytime = atoll(params[3].get_str().c_str());
```

Finally, call the Heir Module code, pass our values (now in C++ type format), and set these as the value of the final `result` object. Bear in mind that the returned value from the Heir Module code, `HeirFund`, returns a hexadecimal value.

```cpp
    UniValue result = HeirFund(amount, name, heirpk, inactivitytime);
    RETURN_IF_ERROR(CCerror);  // use a macro to throw runtime_error if CCerror is set in HeirFund()
    return result;
}
```

[See the linked source code (line number is approximate.)](https://github.com/dimxy/komodo/blob/heir-simple/src/wallet/rpcwallet.cpp#L7740)

### Second Level Implementation

The second level of the RPC implementation is the transaction creation code. This resides in the `src/cc/heir.cpp` source file.

#### Implementing heirfund transaction creation
The following content displays the skeleton of the <b>heirfund</b> RPC implementation.

[For links to the full source code and example files, click here.](../../../basic-docs/antara/antara-tutorials/heir-module-tutorial.html#links-to-heir-source-code-and-building-instructions)

```cpp
// heirfund transaction creation code, src/cc/heir.cpp
std::string HeirFund(int64_t amount, std::string heirName, CPubKey heirPubkey, int64_t inactivityTimeSec)
{
```

Create a mutable version of a transaction object.

```cpp
    CMutableTransaction mtx = CreateNewContextualCMutableTransaction(Params().GetConsensus(), komodo_nextheight());
```

Declare and initialize an `CCcontract_info` object with Heir Module variables, such as our global CC address, our global private key, etc.

```cpp
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, EVAL_HEIR);
```

#### Adding Inputs to the Transaction

Add inputs to the transaction that are enough to make a deposit of the requested amount to the Heir fund. Also add one fee to serve as a marker, and another for the miners.

By tradition, we use a constant fee of `10000` satoshis.

We use the `pubkey` from the komodod `-pubkey` launch parameter as the destination address for the funds withdrawn from the `1of2` plan address.

We use a function in the CC SDK, `AddNormalinputs`, to add the normal inputs to the mutable transaction.

```cpp
    const int64_t txfee = 10000;
    CPubKey myPubkey = pubkey2pk(Mypubkey());
    if (AddNormalinputs(mtx, myPubkey, amount+2*txfee , 60) > 0) {
```

The parameters passed to the `AddNormalinputs()` function are:

- The transaction itself
- The user's pub
- The total value for the funding amount
- he marker and the miner fees
- The limit on the quantity of utxos the daemon can take from the wallet of the user
  - Naturally, only utxos that are available via the wallet's private keys can be used for these inputs

#### Adding Outputs to the Transaction

According to our specification, we need two outputs: one for the funding deposit and one for the marker.

Here, we use two CC SDK functions that are designed to create CC vouts.

The first is `MakeCC1of2vout`. This creates a CC vout with a threshold of `2` addresses that can spend from the plan funds. We supply as arguments the two potential addresses, represented here as `myPubkey` and `heirPubkey`.

`MakeCC1vout` creates a vout with a simple CryptoCondition which sends a transaction fee to the Heir Module global CC address. (This is returned by the `GetUnspendable()` function call below.) We need the global CC address so that we can both mark the transaction, and to find all Heir funding plans.

You will always need some kind of marker for any instance of an Antara Module plan for at least the initial transaction. Otherwise, you might lose the instance's data in the blockchain.

We call this a <b>marker pattern</b> in Antara development, and we will explore this later in the tutorial.

This first statement creates a vout with a threshold CryptoCondition. This allows spending via one of two possible pubkeys. The statment then adds this vout to the transaction.

Note the eval code, `EVAL_HEIR`. This triggers the Heir validation code whenever a Heir Module transaction occurs.

The second statement creates a marker vout with a simple CryptoCondition. There is a small fee sent to the Heir Module's global CC address. The statement then adds this vout to the transaction. This vout will be used for retrieving the list of all instances of the Heir Module via the <b>heirlist</b> RPC.

```cpp
        mtx.vout.push_back( MakeCC1of2vout(EVAL_HEIR, amount, myPubkey, heirPubkey) );
        mtx.vout.push_back( MakeCC1vout(EVAL_HEIR, txfee, GetUnspendable(cp, NULL)) );
```

Finish the creation of the transaction by calling the `FinalizeCCTx` function along with its parameters from the `cp` object, the `mtx` object itself, the owner's pubkey, and the transaction fee amount.

Note the cast to `uint8_t` for the constants `EVAL_HEIR` and `F` function id. This is important, as the cast supposes a one-byte size for the serialization of these values. If this size was not inferred, then the type would be an `int`.

Also, an opreturn object with the data from this module instance is passed. To create the opreturn object, serialize the needed ids and variables to a `CScript` object.

```cpp
        std::string rawhextx = FinalizeCCTx(0, cp, mtx, myPubkey, txfee,
            CScript() << OP_RETURN << (uint8_t)EVAL_HEIR << (uint8_t)'F' << myPubkey << heirPubkey << inactivityTimeSec << heirName));
        return rawhextx;
    }
```

In case the `AddNormalinputs()` function cannot find sufficient owner coins for the requested amount (including the transaction fee), we set the `CCerror` error object.

```cpp
    CCerror = "not enough coins for requested amount and txfee";
    return std::string("");
}
```

Note that we do not need to add the normal change output here because the `FinalizeCCTx` function adds the change output for us.

`FinalizeCCTx` also builds the transaction input `scriptSigs` (both normal and CC aspects), adds tx signatures to them, and returns a signed transaction in hexadecimal encoding.

Also note the `E_MARSHAL()` function. This serializes variables of various supported types to a byte array. The byte array is then serialized to a `CScript` object. The object is stored in the `scriptPubKey` transaction field in the last opreturn vout with transaction data.

There is also the mirror `E_UNMARSHAL()` function. This is used for unpacking opreturn data from a CScript object to C++ variables, and for further processing.

The returned transaction is ready to be sent to the Smart Chain network using the [<b>sendrawtransaction</b>](../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) RPC.

#### Implementing the heirclaim RPC

As before, this implementation has two levels. The first level checks the required environment and converts the parameters. The second level creates the final transaction.

##### heirclaim syntax

```bash
./komodo-cli -ac_name=YOURCHAIN heirclaim fundingtxid amount
```

##### Add the RPC command to komodo-cli

Add a new command to `komodo-cli` by adding a new element into the `vRPCCommands` array in the source file `src/server.cpp`.

```cpp
    { "heir",       "heirclaim",   &heirclaim,      true },
```

Using the previous section of the tutorial as an example, add an `heirclaim` RPC implementation in the `src/rpc/wallet.cpp` source file.

Add the `heirclaim` declaration in the `src/rpc/server.h` header file.

```cpp
// heirclaim command rpc-level implementation, src/wallet/rpcwallet.cpp

UniValue heirclaim(const UniValue& params, bool fHelp)
{
    CCerror.clear(); // clear global error object
```

Check that the wallet is available.

In case the user asks for help via the `--help` parameter, or in case the parameters are not correctly submitted, print a `help` message to the console.

Also check that cc contract requirements are satisfied:

```cpp
    if (!EnsureWalletIsAvailable(fHelp))
        return NullUniValue;
    if (fHelp || params.size() != 2)
	throw runtime_error("heirclaim txfee funds fundingtxid\n");
    if (ensure_CCrequirements(EVAL_HEIR) < 0)
	throw runtime_error("to use CC contracts, you need to launch daemon with valid -pubkey= for an address in your wallet\n");
```

Lock the wallet:

```cpp
    LOCK2(cs_main, pwalletMain->cs_wallet);
```

Convert the parameters from `UniValue` to `c++` type:

```cpp
    uint256 fundingtxid = Parseuint256((char*)params[0].get_str().c_str());
    CAmount amount = atof(params[1].get_str().c_str()) * COIN;  // Note conversion from satoshis to coins by multiplication by 10E8
```

Call the `HeirClaim` transaction creation function and return the created transaction in hexadecimal.

```cpp
    UniValue result = HeirClaim(fundingtxid, amount);
    RETURN_IF_ERROR(CCerror);  // use a macro to throw runtime_error if CCerror is set in HeirFund()
    return result;
}
```
#### Transaction creation code for heirclaom RPC

Implement the `HeirClaim` transaction creation code in the `src/cc/heir.cpp` source file.

```cpp
// heirclaim transaction creation function, src/cc/heir.cpp
std::string HeirClaim(uint256 fundingtxid, int64_t amount)
{
```

Start with creating a mutable transaction object:

```cpp
    CMutableTransaction mtx = CreateNewContextualCMutableTransaction(Params().GetConsensus(), komodo_nextheight());
```

Initialize the `cp` object:

```cpp
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, EVAL_HEIR);
```

Find the most recent owner transaction to calculate the owner's inactivity time. The helper function, `FindLatestOwnerTx()`, returns the latest transaction id, the `owner` and `heir` public keys, `inactivity time setting` value, and the `hasHeirSpendingBegun` flag value.

```cpp
    const int64_t txfee = 10000;
    CPubKey ownerPubkey, heirPubkey;
    int64_t inactivityTimeSec;
    uint8_t hasHeirSpendingBegun;
    uint256 latesttxid = FindLatestOwnerTx(fundingtxid, ownerPubkey, heirPubkey, inactivityTimeSec, hasHeirSpendingBegun);
    if( latesttxid.IsNull() )   {
        CCerror = "no funding tx found";
        return "";
    }
```

Check whether the inactivity time of the owner has surpassed the amount designated in the plan. The `CCduration` CC SDK function returns the time (in seconds) since the confirmation of the block that bears the provided transaction to the chain-tip block.

If `hasHeirSpendingBegun` is already `true`, there is no need to also check the owner's inactivity time.

```cpp
    int32_t numBlocks; // not used
    bool isAllowedToHeir = (hasHeirSpendingBegun || CCduration(numBlocks, latesttxid) > inactivityTimeSec) ? true : false;
    CPubKey myPubkey = pubkey2pk(Mypubkey());  // pubkey2pk sdk function converts pubkey from a byte array to CPubKey object
    if( myPubkey == heirPubkey && !isAllowedToHeir )    {
        CCerror = "spending funds is not allowed for heir yet";
        return "";
    }
```

Create the claim transaction inputs and outputs.

Add normal inputs for the transaction fee:

```cpp
    if (AddNormalinputs(mtx, myPubkey, txfee, 3) <= txfee)    {
        CCerror = "not enough normal inputs for txfee";
        return "";
    }
```

Get the address of the `1of2` threshold CryptoCondition output (where the funds were deposited). Add CC inputs for the requested amount.

```cpp
    char coinaddr[65];
    GetCCaddress1of2(cp, coinaddr, ownerPubkey, heirPubkey);
```

Add CC inputs for this address with the use of a custom function:

```cpp
    int64_t inputs;
    if( (inputs = Add1of2AddressInputs(mtx, fundingtxid, coinaddr, amount, 64)) < amount )   {
        CCerror = "not enough funds claimed";
        return "";
    }
```

Add a normal output to receive the claimed funds, and a CC change output for the remaining amount.

```cpp
    mtx.vout.push_back(CTxOut(amount, CScript() << ParseHex(HexStr(myPubkey)) << OP_CHECKSIG));
    if (inputs > amount)
        mtx.vout.push_back(MakeCC1of2vout(EVAL_HEIR, inputs - amount, ownerPubkey, heirPubkey));
```

Add normal change (if any), add OP_RETURN data, and sign the transaction:

```cpp
     return FinalizeCCTx(0, cp, mtx, myPubkey, txfee, CScript() << OP_RETURN << E_MARSHAL(ss << (uint8_t)EVAL_HEIR << (uint8_t)'C' << fundingtxid << (myPubkey == heirPubkey ? (uint8_t)1 : hasHeirSpendingBegun)));
}
```

In the opreturn we add a pair of standard ids: the CC `EVAL` code, the functional id, and the `fundingtxid` to serve as the funding plan identifier.

The `hasHeirSpendingBegun` value is a special flag. When this value is changed to `1`, it indicates that the heir has spent funds in the fund at least once. Therefore, it is no longer necessary to check the inactivity time of the owner.

Once `hasHeirSpendingBegun` is set to `true`, this flag should also be set to `true` in the following transaction OP_RETURN values.

#### Implementations for heiradd, heirlist and heirinfo

- `heiradd` allows a user to add more funding to a plan.
- `heirlist` is a standard RPC for all CC modules. This RPC outputs a list of all initial transaction IDs, which serve as the identifiers for each plan.
- `heirinfo` provides some data about a funding plan

The implementation for these RPCs can be found in the github repository with the source code of this contract.

[RPC implementation can be found here.](https://github.com/dimxy/komodo/blob/heir-simple/src/wallet/rpcwallet.cpp)

[Transaction creation and retrieval code can be found here.](https://github.com/dimxy/komodo/blob/heir-simple/src/cc/heir.cpp)

## Heir Module Helper Functions

#### Simplified Add1of2AddressInputs() Function Implementation

```cpp
// add inputs from cc threshold=2 cryptocondition address to transaction object, src/cc/heir.cpp
int64_t Add1of2AddressInputs(CMutableTransaction &mtx, uint256 fundingtxid, char *coinaddr, int64_t amount, int32_t maxinputs)
{
    int64_t totalinputs = 0L;
    int32_t count = 0;
```

By default, the CC SDK function, `SetCCunspents`, fills the provider vector with a list of unspent cc outputs of the provided `coinaddr` Bitcoin address.

For our Heir Module, we pass the `1of2` address where the plan's funds are stored.

```cpp
    std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>> unspentOutputs;
    SetCCunspents(unspentOutputs, coinaddr, true);  // get a vector of cc uxtos for the address in coinaddr[]
```

Iterate through the returned uxtos and add those that are appropriate to the transaction's vin array:

```cpp
    for (std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>>::const_iterator it = unspentOutputs.begin(); it != unspentOutputs.end(); it++) {
         CTransaction tx;
         uint256 hashBlock;
         std::vector<uint8_t> vopret;
```

Load the current uxto's transaction and check whether it has an opreturn in the back of the array of outputs.

```cpp
         if (GetTransaction(it->first.txhash, tx, hashBlock, false) && tx.vout.size() > 0 && GetOpReturnData(tx.vout.back().scriptPubKey, vopret) && vopret.size() > 2)
         {
              uint8_t evalCode, funcId, hasHeirSpendingBegun;
              uint256 txid;
```

Check that the uxto matches this plan.

```cpp
              if( it->first.txhash == fundingtxid ||   // if this is our contract instance coins
                  E_UNMARSHAL(vopret, { ss >> evalCode; ss >> funcId; ss >> txid >> hasHeirSpendingBegun; }) && // unserialize opreturn
                  fundingtxid == txid  ) // it is a tx from this funding plan
              {
```

To add the utxo to the transaction's vins, set the utxo's vout number and transaction id in the transactions vins. Pass an empty call to the `CScript()` function in the `scriptSig` parameter. This will be filled by the `FinalizeCCtx` function.

```cpp
                  mtx.vin.push_back(CTxIn(it->first.txhash, it->first.index, CScript()));
                  totalinputs += it->second.satoshis;
```

Stop once sufficient CC inputs are found.

In the event that the `amount` parameter is `0`, add all available inputs to calculate all available funds.

```cpp
                  if( amount > 0 && totalinputs >= amount || ++count > maxinputs )
                      break;
              }
         }
    }
```

Return the total amount of inputs added to the transaction's vin array:

```cpp
    return totalinputs;
}
```

#### Simplified Implementation of the FindLatestOwnerTx() Function

To calculate the owner-inactivity time and to enable the heir to claim the funds, we implement the function, `FindLatestOwnerTx()`.

This function iterates through the transactions of this plan, (which we can also call this instance of the Heir Module) and finds the owner's latest transaction. We pass into this function the initial funding txid of the plan we desire to inspect.

The function returns the pubkeys of both the owner and the heir, the owner inactivity time, and a flag that indicates whether the heir has already spent funds from the `1of2` address.

All returned values of the function are retrieved from the transactions' opreturns.

```cpp
// find the latest owner transaction id
// this function also returns some values from the initial and latest transaction opreturns
// Note: this function is also called from validation code (use non-locking calls)

uint256 FindLatestOwnerTx(uint256 fundingtxid, CPubKey& ownerPubkey, CPubKey& heirPubkey, int64_t& inactivityTime, uint8_t &hasHeirSpendingBegun)
{
    uint8_t eval, funcId;
```

Initialize the flag as though the heir has not yet spent any of their plan's funds.

```cpp
    hasHeirSpendingBegun = 0;
```

Initialize the following variables.

```cpp
    CTransaction fundingtx;
    uint256 hashBlock;
    std::vector<uint8_t> vopret;
    std::string name;
```

Load the initial funding transaction, check whether it has a correct opreturn, and de-serialize it.

Check the transaction rules. Return an empty id if the funding transaction cannot not be loaded or is incorrect.

```cpp
    if (!myGetTransaction(fundingtxid, fundingtx, hashBlock) ||  // NOTE: use non-locking version of GetTransaction as we may be called from validation code
        fundingtx.vout.size() == 0 ||    // no vouts, even opreturn
        !GetOpReturnData(fundingtx.vout.back().scriptPubKey, vopret) ||   // could not get opreturn from the last vout
        !E_UNMARSHAL(vopret, ss >> eval; ss >> funcId; ss >> ownerPubkey; ss >> heirPubkey; ss >> inactivityTime; ss >> name;) ||  // could not unmarshal opreturn
        eval != EVAL_HEIR ||   // incorrect eval code in 1st byte
        funcId != 'F')    // incorrect funcid in the 2nd byte
        return zeroid;
```

Initialize the CC contract object for the Heir Module's `EVAL` code.

```cpp
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, EVAL_HEIR);
```

Declare the `coinaddr` array and use the `GetCCaddress1of2` function to pass the array the `1of2` address that holds our funds.

```cpp
    char coinaddr[64];
    GetCCaddress1of2(cp, coinaddr, ownerPubkey, heirPubkey);
```

Get the vector with uxtos for the `1of2` address.

```cpp
    std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>> unspentOutputs;
    SetCCunspents(unspentOutputs, coinaddr, true);
```

Iterate through the returned uxto's to find the last funding or spending owner transaction:

```cpp
    int32_t maxBlockHeight = 0;
    uint256 latesttxid = fundingtxid;   // set to initial txid
    for (std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>>::const_iterator it = unspentOutputs.begin(); it != unspentOutputs.end(); it++)
    {
        CTransaction vintx;
        uint256 blockHash;
        std::vector<uint8_t> vopret;
        uint8_t eval, funcId, flagopret;
        uint256 txidopret;

        int32_t blockHeight = (int32_t)it->second.blockHeight;
```

Retrieve the transaction from the returned array. Check and unmarshal the transaction's opreturn and check whether this transaction is from the relevant Heir plan.

```cpp
        if (myGetTransaction(it->first.txhash, vintx, blockHash) &&     // NOTE: use non-locking version of GetTransaction as we may be called from validation code
            vintx.vout.size() > 0 &&
            GetOpReturnData(vintx.vout.back().scriptPubKey, vopret) &&
            E_UNMARSHAL(vopret, ss >> eval; ss >> funcId; ss >> txidopret; ss >> flagopret) &&
            eval == EVAL_HEIR &&
            (funcId == 'C' || funcId == 'A') &&
            fundingtxid == txidopret )   {
```

As the `SetCCunspents` function does not return uxtos in chronological order, order them by block height to find the latest utxo.

```cpp
            if (blockHeight > maxBlockHeight) {
```

Check whether this transaction indicates owner activity. Use a pair of CC SDK functions, `TotalPubkeyNormalInputs()` and `TotalPubkeyCCInputs()`, that iterate through the vin array to find if the transaction was signed with the owner's pubkey.

```cpp
                if (TotalPubkeyNormalInputs(vintx, ownerPubkey) > 0 || TotalPubkeyCCInputs(vintx, ownerPubkey) > 0) {
```

If this transaction represents owner activity, reset the latest txid to this current txid.

Set the flag for the transaction opreturn.

```cpp
                    latesttxid = it->first.txhash;
		    hasHeirSpendingBegun = flagopret;
                    maxBlockHeight = blockHeight;
                }
            }
        }
    }
```

Return the latest owner txid.

```cpp
    return latesttxid;
}
```

## Heir Module Validation

#### Simplified Validation Function Implementation

Validation provides the logic control of spent Antara-module value, and validation also provides the data added to the Smart Chain.

Recall that validation code is invoked for a transaction at the time the CC-related value is spent (as opposed to only being invoked at the time the value is added). We trigger the invocation of this validation function when at least one transaction input is a CC input bearing this module's `EVAL` code.

Validation code typically is not called for the CC module's initial transaction. Instead, we invoke validatation at the time the initial transaction is spent in a second transaction.

One way to invoke validation for the first transaction when performing the second transaction is to load the initial transaction and validate it first. If the initial transaction turns out to be invalid, it can remain in the chain and is otherwise ignored. In this case, if a CC marker is used, it can be cleared and the transaction is removed from the RPC list output.

#### Guidelines for Validation

In our Heir Module prototype, we have three transactions to validate: the initial funding, the adding transaction that adds more funds, and the transaction that claims the funds. The first and second of these transactions do not have any CC vins, and therefore all are validated together with the transaction that claims the funds.

Here are several common aspects of a module that require validation:

- The basic transaction structure
- The basic data structure in the OP_RETURN
  - Validation here ensures data integrity in the chain
  - All OP_RETURNs should contain the `EVAL` code and functional id in the first two bytes
- Avoid all foreseeable attack vectors
  - Ensure DOS attacks are eliminated, especially in the event of a malformed transaction
  - Check the array size before use of any transaction
- Check the previous Heir Module transactions which this transaction spends and which have no cc inputs. This is accomplished by retrieving the transaction id from the opreturn and loading and validating the previous transaction

#### Heir Module Validation Rules

The following are the aspects of validation the Heir Module requires.

- The initial funding transaction 
  - Validate that the `1of2` address accurately matches `pubkeys` in the opreturn
- The claiming transaction 
  - Validate that this transaction spends transactions from the same funding plan. This funding transaction id's values from the opreturn outputs of the previous transactions should match. (the previous transactions are often referred as `vintx` in code) 
- Validate whether the heir is allowed to spend the funds
  - Check whether the flag indicates that the Heir is already spending the funds
  - Check whether enough time has passed since the last time the owner was active on the chain
- When validating, separate the owner's funding transaction from any other contributions to the `1of2` address
    - Although the Heir Module is initiated based on the owner's initial transaction, nothing prevents other users on the Smart Chain from contributing funds
    - Therefore, when validating, for each utxo contained in the `1of2` address, calculate whether or not the utxo's vins contain the owner's pubkey
- During the course of validation, we fully check opreturn format

This validation logic is performed in the `HeirValidate()` function. The function is invoked whenever a CC transaction bearing the appropriate eval code occurs on the chain. When this eval code appears, the consensus mechanism calls the `HeirValidate()` function, executes the indicated validation code, and adds the transaction to the chain.

#### HeirValidate() Implementation

Explanation of code:

- Transaction-validation entry function
  - (This is actually a callback)
- Parameters
  - `cpHeir` - Pointer to the module's variable structure
  - `eval` - Pointer to the CC dispatching object
    - Used to return invalid state
  - `tx` - The transaction itself
  - `nIn` - Not used in validation code

```cpp
bool HeirValidate(struct CCcontract_info* cpHeir, Eval* eval, const CTransaction& tx, uint32_t nIn)
{
```

Check that the basic transaction structure has the opreturn with the correct basic `evalcode` and `funcid`.

::: tip

There is no need to check the function ids of the (`F`) funding transaction or the (`A`) add transaction, as these transactions have no Heir CC vins. Therefore, we do not create validation code for them.

:::

```cpp
    std::vector <uint8_t> vopret;
    if( tx.vout.size() < 1 || !GetOpReturnData(tx.vout.back().scriptPubKey, vopret) || vopret.size() < 2 || vopret.begin()[0] != EVAL_HEIR ||
        vopret.begin()[1] != 'C')

        // interrupt the validation and return invalid state:

        return eval->Invalid("incorrect or no opreturn data");  // note that you should not return simply 'false'
```

Decode the transaction's opreturn with the `E_UNMARSHAL` function. This function places the opreturn serialized data into several variables. One of them, the `fundingtxid` variable, is the transaction id (txid) of the initial funding transaction. We will use it further to find the latest owner transaction to check when the owner was last active on the chain.

```cpp
    uint8_t evalcode, funcId;
    uint256 fundingtxid; //initialized to null
    uint8_t hasHeirSpendingBegun;
    if (!E_UNMARSHAL(vopret, ss >> evalcode; ss >> funcId; ss >> fundingtxid; ss >> hasHeirSpendingBegun;))
        // return invalid state if unserializing function returned false:
        return eval->Invalid("incorrect opreturn data");
```

Check that the `fundingtxid` is a valid txid:

```cpp
    if( fundingtxid.IsNull() )
        return eval->Invalid("incorrect funding plan id in tx opret");
```

Here we come to a good place to load the initial transaction, check whether it exists, and whether it has a correctly formed opreturn.

Call the `FindLatestOwnerTx()` function. This function obtains the opreturn parameters and the `hasHeirSpendingBegun` flag, and checks the initial transaction.

```cpp
    CPubKey ownerPubkey, heirPubkey;
    int64_t inactivityTimeSec;
    uint8_t lastHeirSpendingBegun;
    uint256 latesttxid = FindLatestOwnerTx(fundingtxid, ownerPubkey, heirPubkey, inactivityTimeSec, lastHeirSpendingBegun);
    if (latesttxid.IsNull()) {
        return eval->Invalid("no or incorrect funding tx found");
    }
```

Log in the terminal that the daemon process is in the validation code:

```cpp
    std::cerr << "HeirValidate funcid=" << (char)funcId << " evalcode=" << (int)cpHeir->evalcode << std::endl;
```
Prepare for validation rules that are specific for each function id (`F`, `A`, and `C`).

```cpp
    switch (funcId) {
```

For `F` and `A`, we return an invalid response, as the process should never be able to access these function ids.

```cpp
    case 'F':
    case 'A':
        return eval->Invalid("unexpected HeirValidate for heirfund");
```

Validation for the claiming transaction.

- Check whether we are spending the correct funding transactions
  - For example, check that the transactions are from the correct module instance, as identified by the `fundingtxid`
  - If incorrect, return `false`
- If the heir is claiming the funds, check that he is allowed to do so
  - For example, check the inactivity time of the owner and whether the heir has already spent funds from the `1of2` address
- Check whether the new flag, `hasHeirSpendingBegun`, is set correctly

Both of the following support functions, `CheckSpentTxns` and `CheckInactivityTime`, are in the `heir.cpp` source file.

[Link to heir.cpp source file](https://github.com/dimxy/komodo/blob/heir-simple/src/cc/heir.cpp]

```cpp
    case 'C':
        if (!CheckSpentTxns(cpHeir, eval, tx, fundingtxid))
            return false;
        if (!CheckInactivityTime(cpHeir, eval, tx, latesttxid, inactivityTimeSec, heirPubkey, lastHeirSpendingBegun, hasHeirSpendingBegun) )
            return false;
        break;
```

For unsupported function ids, return an invalid state.

```cpp
    default:
        std::cerr << "HeirValidate() illegal heir funcid=" << (char)funcId << std::endl;
        return eval->Invalid("unexpected HeirValidate funcid");
    }
```

If all rules pass, return a valid state.

```cpp
    return eval->Valid();
}
```

#### Validation Code Errors

During the development of validation code, you will likely receive validation errors when any CC module validation function returns an invalid state.

For example, when sending a raw transaction, the daemon checks the transaction while adding it to the mempool.

During this process, if the CC validation code returns an invalid state you will see the following error:

```cpp
error code: -26
error message:
16: mandatory-script-verify-flag-failed (Script evaluated without error but finished with a false/empty top stack element)
```

When this happens, check the server output for a more specific error description. The first line of the output contains the `eval->invalid()` message from your validation code.

```cpp
CC Eval EVAL_HEIR Invalid: incorrect opreturn data spending tx 4b6e1ed868cf941dabf9edc7f675321bdb4258692ba02f56dc21100f88981ac4
ERROR: CScriptCheck(): 7961fe4f9f3bdabef154404ea8ec7a11be1546febc34efe67faede8d930c0749:1 VerifySignature failed: Script evaluated without error but finished with a false/empty top stack element
ERROR: AcceptToMemoryPool: BUG! PLEASE REPORT THIS! ConnectInputs failed against MANDATORY but not STANDARD flags 7961fe4f9f3bdabef154404ea8ec7a11be1546febc34efe67faede8d930c0749
```

--------------

[<b>Link to Next Tutorial in Advanced Series</b>](../../../basic-docs/antara/antara-tutorials/advanced-series-6.html)
