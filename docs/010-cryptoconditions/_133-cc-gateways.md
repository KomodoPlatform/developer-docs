# Smart Contract: Gateways

The idea of the `gateways` smart contract is to facilitate, manage, and trade tokenized representations of foreign blockchain assets.

For example, a user is able to deposit their real-world BTC into a monitored address on the Bitcoin blockchain. Then, on the `gateways` asset chain, the ownership of this BTC is tokenized. Only the owner of the token has the right to withdraw the BTC to a chosen address. The user that made the deposit can use the token either for asset trading, or for other creative purposes.

This allows the `gateways`-enabled asset chain to feature secure, on-chain, high-speed trading.

Using an established `gateways` smart contract is not considered difficult. However, setting up the `gateways` requires the user to closely follow several detailed steps.

## Brief Gateways Tutorial

The flow of the `gateways` contract is as follows:

* Anyone can deposit a foreign asset, such as BTC, into a special address.
* This person then receives tokens on the `gateways`-enabled asset chain that represent the deposited BTC
* The user is able to trade, spend, or utilize the tokens in whatever further capacities the asset-chain developers enable
* Anyone who obtains the tokens can redeem the BTC to a BTC address, finishing the process

By bringing operations on-chain, we avoid the need for complex cross-chain swaps for each trade. The cross-chain transfers do still have to happen on the deposit and withdraw, but that is all.

### A Caveat: Gateways is Not Fully Decentralized

`gateways` relies on a special type of multisignature wallet address to function. It is called an `MofN` multisig address. In the name, `N` stands for the number of total signatories for the address and `M` stands for the number of signatories that are required to have their nodes online at the time of withdrawal.

With `N` trusted community members present, and a reasonable `M` value, this aspect of centralization is easy to overcome. Since all operations are automated -- including both deposit and withdrawal -- the only trust needed is that `M` of the `N` signatories are running their nodes with the `gateways` dApp active, and also that `M` of them will not collude to steal the funds locked in the address.

As anyone is able to create a `gateways`, users are free to work together as a community to discover and manage their signatories. The signatories are ultimately responsible for all `gateways` activity.

## Creating a Gateway

In this guide, we will

* Create tokens which will represent KMD on a `gateways`-enabled asset chain
* Convert these tokens for **GatewaysCC** usage
* Prepare a special oracle, having the data type `Ihh`; this oracle will retrieve information regarding Komodo's chainstate using the **oraclefeed dApp**
* Bind the tokens and the oracle to our gateway
* Deposit KMD
* Exchange it with other tokens on-chain
* Use the tokens to withdraw the KMD

Please ensure that you have the KMD main chain downloaded and synced before continuing further in the guide.

Also, please open an empty text file and save all output transaction ids and hex-encoded data from each step. You will need the information at various stages.

## Create a new Blockchain

With the KMD main chain installed, you should have all you need to start your own asset chain.

If you are unfamiliar with how to start an asset chain, [please read the relevant documentation](#building-a-komodo-asset-chain).

For this project, we suggest using the following launch parameters:

`./komodod -ac_name=HELLOWORLD -ac_supply=7777777 &`

Once your chain is up and running, you will need to create a pubkey.

[Follow the instructions in this documentation.](#creating-and-launching-with-a-pubkey)

Once you have restarted the asset chain with your pubkey enabled, you are prepared to create on-chain tokens.

## Create a token for on-chain representation of an external cryptocurrency

Use the [tokencreate](#tokencreate) method to create the token.

You should set the supply of tokens equal to the maximum supply of KMD satoshis you expect users to have in the multi-signature wallet at any one point in time.

`./komodo-cli -ac_name=HELLOWORLD tokencreate KMD 1000 "A KMD-equivalent token for gatewaysCC"`

This sets the name of the asset-chain token to `KMD`, the maximum supply equal to `1000` satoshis of actual KMD, and gives the description in the final string

The method returns a `hex` value in the response. Use the `sendrawtransaction` method to braodcast this value.

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

This returns a transaction id, which is now our **tokenid**.

Wait to ensure that the `tokenid` transaction is successfully notarized.

`./komodo-cli -ac_name=HELLOWORLD getinfo`

Watch for the notarization count to increase.

Check that the mempool does not have your `tokenid` transaction in it.

`./komodo-cli -ac_name=HELLOWORLD getrawmempool`

You should not see your `tokenid` transaction in the returned response.

You may also check the info in your token:

`./komodo-cli -ac_name=HELLOWORLD tokeninfo YOUR_TOKEN_ID`

You may also check the balance for a specific pubkey:

(If you have not transferred any of the tokens, then the entire supply should be within your own pubkey.)

`./komodo-cli -ac_name=HELLOWORLD tokenbalance TOKEN_ID PUBKEY`

## Convert the tokens to use with GatewaysCC

Before you may use these tokens as representatives of real KMD for spending and trading, the tokens need to be converted.

The conversion process will change the rules that constrain the token's CC `vouts`. Constraining is important because it prevents the token from being transferred or spent, except under the agreed upon definitions of the `gateways` contract. Initially, the TokensCC smart contract itself constrains the `vouts`. Now we use `tokenconvert` to render the token `vouts` constrained for use only by the GatewaysCC smart contract.

First, find the **GatewaysPubkey**:

`./komodo-cli -ac_name=HELLOWORLD gatewaysaddress`

This will return the gateways pubkey. ===?===

Then convert 100% of your KMD-token supply to the GatewayCC using the special `tokenconvert` call. Use the unique evalcode for `GatewaysCC` as the first parameter: `241`

You must set the supply in the number of tokens for this command. For example, if you used `1` coin from the parent chain to create `100000000` tokens, you now use `100000000` as the argument to indicate the total supply.

`./komodo-cli -ac_name=HELLOWORLD tokenconvert 241 YOUR_TOKEN_ID GATEWAYS_PUBKEY TOTAL_SUPPLY`

The above command will output a **hex** value, which you now broadcast using `sendrawtransaction`:


`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

## Create an Oracle for Storing "Blockheader Data" on the Blockchain

To add external data to the blockchain, we use the [`oracles`](#smart-contract-oracles) smart contract.

We have to create an oracle with an identical name, ie. `KMD`, and the data format must start with `Ihh` (height, blockhash, merkleroot):


`./komodo-cli -ac_name=HELLOWORLD oraclescreate KMD blockheaders Ihh`

Broadcast the returned HEX data:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

This returns a transaction id, which is the **oracleid**.

Register as a publisher for the oracle using [`oraclesregister`](#oraclesregister):

`./komodo-cli -ac_name=HELLOWORLD oraclesregister ORACLE_ID DATA_FEE_IN_SATOSHIS`

Broadcast the returned HEX value:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

Then you have to subscribe to it for getting the UTXOs for data publishing. The number of data publishing transactions you can perform in a block is equal to the number of active subscriptions there are.

Get the **data-publisher's pubkey** from the `oracesinfo` call:

`./komodo-cli -ac_name=HELLOWORLD oraclesinfo ORACLE_ID`

> Sample output:

```
    {
        "result": "success",
        "txid": "46e2dc958477160eb37de3a1ec1bb18899d77f5b47bd52b8a6f7a9ce14729157",
        "name": "KMD",
        "description": "blockheaders",
        "format": "Ihh",
        "marker": "RNFz9HAuzXhAjx6twEJzcHXconzChfiNM6",
        "registered": [
            {
                "publisher": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5",
                "baton": "RWg43P8s8RtJatAGNa2kV8N2abhQqH93w9",
                "batontxid": "99dd11f4eac1369f3fe8c6428f49e63da26e1b493f69b5bde29edbfbd06eb785",
                "lifetime": "0.00000000",
                "funds": "0.00000000",
                "datafee": "0.01000000"
            }
        ]
    }
```

Sample output for the above call can be seen on the right:

The property, `"publisher"`, in the entry, `"registered"`, of the json object is the data-publisher's `pubkey`, also called the `publisherpubkey`.

Now subscribe with a custom fee in the asset-chain coins:

`./komodo-cli -ac_name=HELLOWORLD oraclessubscribe ORACLE_ID PUBLISHERPUBKEY DATA_FEE_IN_COINS`

Broadcast the HEX using `sendrawtransaction`:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

<aside class="notice">
  It may be useful to execute the <b>oraclessubscribe</b> and <b>sendrawtransaction</b> methods with a few different values, in case you need to broadcast more than one sample of data in each block. In our example, you want to publish data for more than one KMD-height per block.
</aside>

Check the information about the oracle:

`./komodo-cli -ac_name=HELLOWORLD oraclesinfo ORACLE_ID`

Please keep in mind the flow of the oracle data fees :

* The publisher sets the `datafee` in the `oraclesregister` method
* Anyone can subscribe to this publisher on this oracle, committing their desired amount to the publisher
* The publisher may withdraw their fee from the total amount each time the publisher uses `oraclesdata` to publish data

## Bind the Tokens and Oracle as a Gateway

If you followed the previous steps you should already have:

* A supply of converted tokens, which represent the foreign coin
* A prepared oracle contract with the data-type `Ihh`
* An established publisher and subscriber account

With these in place, we may now create the exchange gateway.

We use the simpliest case, where both `M` and `N` values are equal to `1` in this guide. For more complicated multisignature wallets, see [`createmultisig`](#createmultisig).

`./komodo-cli -ac_name=HELLOWORLD gatewaysbind TOKEN_ID ORACLE_ID KMD 100000000000 1 1 MYPUBKEY`

Broadcast the returned HEX value:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

This returns a transaction id, and this value is called the **bindtxid**. This is the id of the gateway at `MYPUBKEY`.

If the command is successful, you may review your new gateway using [`gatewaysinfo`](#gatewaysinfo):

`./komodo-cli -ac_name=HELLOWORLD gatewaysinfo BINDTXID`

Verify that the returned **tokenid** and **oracleid** match those provided earlier.

## Assemble the dApp

Once compiled, the oracle dApp will handle the transfer of merkleroot data to our oracle.

Change into the `komodod` and `komodo-cli` directory:

`cd  ~/komodo/src/`

Compile the dApp:

`gcc cc/dapps/oraclefeed.c -lm -o oraclefeed`

Run the dApp:

`./oraclefeed $ACNAME $ORACLETXID $MYPUBKEY $FORMAT $BINDTXID &`

`$ACNAME`: The name of our asset chain; in our example it is HELLOWORLD

`$ORACLETXID`: The ID of the oracle

`$MYPUBKEY`: Your desired pubkey

`$FORMAT`: `Ihh`

`$BINDTXID`: The ID of the gateway bind, **bindtxid**

> Sample Response:

```
(succesfull oraclization of KMD heights):
KMD ht.1023334 <- 669d0f009eaf85900be0d54fa1b5f455d49edfc1d9dcfe71c43b8be19b7927dda3ecd20c0175bc7b8eb98d857baeeef6a18fc7d6b58bd34b4eb00beaa18c5842bbe5566a
broadcast HELLOWORLD txid.(9484283d8d4bf28b4053e21e7b7e8210eb59c41668e9c7280c4e6c4fbf61579a)
KMD ht.1023335 <- 679d0f00173d5dc169a64bba92e5765fde848cc620a700295ecce8837cb2a13b05000000ed71033532278f72c8f64990e27f0cb185310df163b3278faf267e87d12bf84b
broadcast HELLOWORLD txid.(837c132ab47f1ac1eee2e03828a9818369b919c1de128b99958ac95ffdc96551)
KMD ht.1023336 <- 689d0f0006a53215d5a07d9ee1c9206dcdccacd1c364968b555c56cdf78f9f0c40f87d08b30fdf63299d25bd9a09a3b3fb8a26800a0a4f6e93ca6cd8cb41b98b756dd937
broadcast HELLOWORLD txid.(f33d5ffaec7d13f14605556cee86262299db8fad0337d1baefadc59ec24b6055)
```

If the oracle is working as expected, a response similar to the one in the right column of the web browser following should occur:

## Using the Gateway

### `gatewaysdeposit`

You will need the **gatewaysDepositAddress**. This is the address where you should deposit your KMD on the main KMD chain.

`./komodo-cli -ac_name=HELLOWORLD gatewaysinfo BINDTXID`

Save the returned transaction id for later use.

To make a deposit to the gateway, thereby locking external coins in exchange for on-chain tokens, use the `z_sendmany` call to send funds both to the gatewaysDepositAddress on the KMD chain, and also a small amount of funds to the address corresponding to the `pubkey` where you want to receive the tokenized KMD to appear on the `HELLOWORLD` chain:

`./komodo-cli z_sendmany "SENDINGADDRESS" '[{"address":"addressOfPubkeyYouWantTokenizedKmdAppearIn","amount":0.0001},{"address":"gatewaysDepositAddress","amount":0.1}]'`

The returned transaction id is our **cointxid**.

This transaction should have two `vouts` (i.e. two addresses declared as recepients), and change.

Now you should have enough data to proceed with the [`gatewaysdeposit`](#gatewaysdeposit) call. This method broadcasts data about the KMD deposit on the asset chain, allowing for the nodes to validate the actions:

`./komodo-cli gatewaysdeposit BINDTXID HEIGHT COIN COINTXID CLAIMVOUT DEPOSITHEX PROOF DESTPUB AMOUNT`

`BINDTXID`: the bindtxid from earlier
`HEIGHT`: the block height of the `txid` returned from the `z_sendmany` command
`COIN`: the KMD desired for this example
`COINTXID`: the txid returned from `z_sendmany`
`CLAIMVOUT`: the `vout` of the claim (on the first use, this value should be 0)
`DEPOSITHEX`: returned from the txid of `z_sendmany`
`PROOF`: can be found using, `./komodo-cli gettxoutproof '["<txid of z_sendmany>"]'`
`DESTPUB`: the public key where these tokens should be received on the asset chain
`AMOUNT`: the amount for the deposit (in this case 0.1)

Broadcast the returned HEX data:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

The transaction id obtained for the above command will be called the **deposittxid**

Please note that for the deposit to process successfully, the needed height must be successfully process through the oracle, using the oraclefeed dApp

### `gatewaysclaim`

The next steps are to spend the marker and deposit asset, and to perform the claim which will actually credit asset tokens to the depositor.

This call can only be performed by the owner of the `privkey` corresponding to the pubkey which was used in the `gatewaysdeposit` call. This is the `-pubkey=$PUBKEY` parameter used to launch the daemon.

`./komodo-cli -ac_name=HELLOWORLD gatewaysclaim BINDTXID COIN DEPOSITTXID DESTPUB AMOUNT`

`BINDTXID`: the bindtxid from earlier
`COIN`: the KMD desired for this example
`DEPOSITTXID`: the transaction id returned from the `gatewaysdeposit`call
`DESTPUB`: the public key where these tokens should be received on the asset chain
`AMOUNT`: the amount for the deposit (in this case 0.1)

Broadcast the returned HEX value:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

Once this transaction is successfully confirmed, tokens should be credited to the indicated pubkey. These tokens are now usable as regular TokenCC tokens.

### `gatewayswithdraw`

The `gatewayswithdraw` call can be done by anyone in posession of the KMD tokens.

First, we must convert these tokens back to their non-bound form using `tokenconvert`:

`./komodo-cli -ac_name=ORCL tokenconvert 241 TOKENID PUBKEY TOTAL_SUPPLY`

`PUBKEY`: the pubkey on which tokens should be availiable after conversion (this pubkey is the `-pubkey=` parameter used to launch the daemon)

Please bear in mind that oracle dApp must be running for the `gatewayswithdraw` method to work.

After the `tokenconvert` transaction is confirmed, you can call the `gatewayswithdraw` rpc from the node that owns the `pubkey` used in `tokenconvert`.

Before executing `gatewayswithdraw`, import the private key for the `gatewaysdeposit` address. This is the address on the asset chain for which you are operating the gateway. Also, this should be on the same node that is running the oracle dApp.

Retrieve the following information:

* The **gatewayDepositAddress** from the "deposit" field returned from this command:
  * `./komodo-cli -ac_name=HELLOWORLD gatewaysinfo BINDTXID`

* The private key returned from this command:
  * `./komodo-cli -ac_name=HELLOWORLD dumprivkey gatewayDepositAddress`

Execute the following commands on the node running the oracle dApp:

`./komodo-cli importprivkey <private key>`

`./komodo-cli -ac_name=HELLOWORLD gatewayswithdraw BINDTXID COIN WITHDRAWPUB AMOUNT`

`BINDTXID`: the bindtxid from earlier
`COIN`: the KMD desired for this example
`WITHDRAWPUB`: the pubkey where the withdrawn coins should appear on the external chain (in this case, the KMD pubkey)
`AMOUNT`: the amount for the deposit (in this case 0.1)

This should complete the withdrawal process, and therefore the cycle for the `gateways` contract.
