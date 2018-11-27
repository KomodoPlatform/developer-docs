# Smart Contract: Gateways

The idea of the `gateways` smart contract is to facilitate, manage, and trade tokenized representations of foreign blockchain assets.

For example, a user is able to deposit their real-world BTC into a monitored address on the Bitcoin blockchain. Then, on the `gateways` asset chain, the ownership of this BTC is tokenized. Only the owner of the token has the right to withdraw the BTC to a chosen address. The user that made the deposit can use the token either for asset trading, or for other creative purposes.

This allows the `gateways`-enabled asset chain to feature secure, on-chain, high-speed trading.

Using an established `gateways` smart contract is not considered difficult. However, setting up the `gateways` requires the user to closely follow several detailed steps.

**GatewaysCC** usage
* Prepare a special oracle, having the data type `Ihh`; this oracle will retrieve information regarding Komodo's chainstate using the **oraclefeed dApp**
* Bind the tokens and the oracle to our gateway
* Deposit KMD
* Exchange it with other tokens on-chain
* Use the tokens to withdraw the KMD

Please ensure that you have the KMD main chain downloaded and synced before continuing further in the guide.

Also, please open an empty text file and save all output transaction ids and hex-encoded data from each step. You will need the information at various stages.

**tokenid**:

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

**GatewaysPubkey**:

`./komodo-cli -ac_name=HELLOWORLD gatewaysaddress`

This call returns the **GatewaysPubkey**.

Then convert 100% of your KMD-token supply to the GatewayCC using the special `tokenconvert` call. Use the unique evalcode for `GatewaysCC` as the first parameter: `241`

You must set the supply in the number of tokens for this command. For example, if you used `1` coin from the parent chain to create `100000000` tokens, you now use `100000000` as the argument to indicate the total supply.

`./komodo-cli -ac_name=HELLOWORLD tokenconvert 241 YOUR_TOKEN_ID GATEWAYS_PUBKEY TOTAL_SUPPLY`

The above command will output a **hex** value, which you now broadcast using `sendrawtransaction`:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

## Create an Oracle for Storing "Blockheader Data" on the Blockchain

To add external data to the blockchain, we use the [`oracles`](../cryptoconditions/cc-oracles.html) smart contract.

We have to create an oracle with an identical name, ie. `KMD`, and the data format must start with `Ihh` (height, blockhash, merkleroot):

`./komodo-cli -ac_name=HELLOWORLD oraclescreate KMD blockheaders Ihh`

Broadcast the returned HEX data:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

This returns a transaction id, which is the **oracleid**.

Register as a publisher for the oracle using [`oraclesregister`](../cryptoconditions/cc-oracles.html#oraclesregister):

`./komodo-cli -ac_name=HELLOWORLD oraclesregister ORACLE_ID DATA_FEE_IN_SATOSHIS`

Broadcast the returned HEX value:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

Then you have to subscribe to it for getting the UTXOs for data publishing. The number of data publishing transactions you can perform in a block is equal to the number of active subscriptions there are.

Get the **data-publisher's pubkey** from the `oracesinfo` call:

`./komodo-cli -ac_name=HELLOWORLD oraclesinfo ORACLE_ID`

**oracleid**:

Register as a publisher for the oracle using [`oraclesregister`](../cryptoconditions/cc-oracles.html#oraclesregister):

`./komodo-cli -ac_name=HELLOWORLD oraclesregister ORACLE_ID DATA_FEE_IN_SATOSHIS`

Broadcast the returned HEX value:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

Then you have to subscribe to it for getting the UTXOs for data publishing. The number of data publishing transactions you can perform in a block is equal to the number of active subscriptions there are.

Get the **data-publisher's pubkey** from the `oracesinfo` call:

`./komodo-cli -ac_name=HELLOWORLD oraclesinfo ORACLE_ID`

#### :pushpin: Sample output:

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

The property, `"publisher"`, in the entry, `"registered"`, of the json object is the data-publisher's `pubkey`, also called the `publisherpubkey`.

Now subscribe with a custom fee in the asset-chain coins:

`./komodo-cli -ac_name=HELLOWORLD oraclessubscribe ORACLE_ID PUBLISHERPUBKEY DATA_FEE_IN_COINS`

Broadcast the HEX using `sendrawtransaction`:

`./komodo-cli -ac_name=HELLOWORLD sendrawtransaction HEX_DATA_HERE`

::: tip
It may be useful to execute the <b>oraclessubscribe</b> and <b>sendrawtransaction</b> methods with a few different values, in case you need to broadcast more than one sample of data in each block. In our example, you want to publish data for more than one KMD-height per block.
:::

Check the information about the oracle:

`./komodo-cli -ac_name=HELLOWORLD oraclesinfo ORACLE_ID`

Please keep in mind the flow of the oracle data fees :

* The publisher sets the `datafee` in the `oraclesregister` method
* Anyone can subscribe to this publisher on this oracle, committing their desired amount to the publisher
* The publisher may withdraw their fee from the total amount each time the publisher uses `oraclesdata` to publish data

**bindtxid**:

This is the id of the gateway at `MYPUBKEY`.

If the command is successful, you may review your new gateway using [`gatewaysinfo`](../cryptoconditions/cc-gateways.html#gatewaysinfo):

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

`$ORACLETXID`: The ID of the oracle that is bound to the gateway

`$MYPUBKEY`: Your desired pubkey

`$FORMAT`: `Ihh`

`$BINDTXID`: The ID of the gateway bind, **bindtxid**

**bindtxid**

#### :pushpin: Sample Response:

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

Now you should have enough data to proceed with the [`gatewaysdeposit`](../cryptoconditions/cc-gateways.html#gatewaysdeposit-2) call. This method broadcasts data about the KMD deposit on the asset chain, allowing for the nodes to validate the actions:

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

## gatewayslist

**gatewayslist**

The `gatewayslist` method displays a list of `bindtxids` for the available gateways.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
bindtxid                         |(string)                     |the bindtxid of an available gateway
,                                            |                             |
]                                            |                             |

#### :pushpin: Examples:

Command:

```
./komodo-cli -ac_name=CCNG1 gatewayslist
```

Response:

```
[
  "4114e3c5dcddc464c5fd94efebf8215322f12226bffc93f84d6d5e0b4ca131a9",
  "aeef4320afe73e1cfe43c4c129b31da018990f49d65b5eeb45cb9a348fdf6ece"
]
```

## gatewaysbind

**gatewaysbind tokenid oracletxid coin tokensupply M N pubkey(s)**

The `gatewaysbind` method binds the provided sources into a new gateway.

### Arguments:

Structure|Type|Description
---------|----|-----------
tokenid                                      |(string)                     |the `tokenid` that the gateway will control as a proxy of foreign (off-chain) assets
oracletxid                                   |(string)                     |the `oracletxid` under which the gateway should be created
name                                         |(string)                     |the name of the coin represented by the gateway's proxy token
tokensupply                                  |(number)                     |the maximum available supply of the proxy token; this should be equal to the total number of `tokenid` tokens
M                                            |(number)                     |the minimum number of gateway signatory nodes required to facilitate a gateway transaction
N                                            |(number)                     |the full number of gateway signatory nodes that will control the gateway
pubkey                                       |(string)                     |the pubkey on which tokens will be available after conversion

### Response:

Structure|Type|Description
---------|----|-----------
result:                                      |(string)                     |whether the command succeeded
hex:                                         |(string)                     |a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command

#### :pushpin: Examples:

Step One:

Command:

```
./komodo-cli -ac_name=CCNG1 gatewaysbind 202277c3a48ef168b164f7995eaced940e6416afefd6acd5aac0cb0a439df210 51a3fa99ef2abb3c1ce8248896d934bd348b7a1e0c5dbc06688c976247263a25 KMD 100000000 1 1 024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0
```

Response from Step One:

```
{
  "result": "success",
  "hex": "010000000152d7d470197f5dc650c9ec09e1c8f4975d315219e3b6edad3c927c2fc23197ca0200000048473044022006bf373f1dd51c638a38d1e592741db73387e6acc186fca2011cd7283520ff770220673be91d346ba72adcbc9ab1df712f750047c2609399256c07ad3170d9ea850401ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce05c9836180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c550010f29d430acbc0aad5acd6efaf16640e94edac5e99f764b168f18ea4c377222000e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0253a264762978c6806bc5d0c1e7a8b34bd34d9968824e81c3cbb2aef99faa35100000000"
}
```

Step Two:

Broadcast using [`sendrawtransction`](../essential-rpc/rawtransactions.html#sendrawtransaction):

```
./komodo-cli -ac_name=CCNG1 sendrawtransaction 010000000152d7d470197f5dc650c9ec09e1c8f4975d315219e3b6edad3c927c2fc23197ca0200000048473044022006bf373f1dd51c638a38d1e592741db73387e6acc186fca2011cd7283520ff770220673be91d346ba72adcbc9ab1df712f750047c2609399256c07ad3170d9ea850401ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce05c9836180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c550010f29d430acbc0aad5acd6efaf16640e94edac5e99f764b168f18ea4c377222000e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0253a264762978c6806bc5d0c1e7a8b34bd34d9968824e81c3cbb2aef99faa35100000000
```

Response from Step Two:

(This is the `bindtxid` for the gateway.)

```
aa1b82d78398184c93405ccd15e3cf00b63634aac98a7b75053aa90eaf9cb47d
```

## gatewaysinfo

**gatewaysinfo bindtxid**

The `gateaysinfo` method returns information about the `bindtxid` gateway.

### Arguments:

Structure|Type|Description
---------|----|-----------
bindtxid                                     |(string)                     |the `bindtxid` for the associated gateway

### Response:

Structure|Type|Description
---------|----|-----------
result                                       |(string)                     |whether the command executed successfully
name                                         |(string)                     |name of the command
pubkey                                       |(string)                     |the pubkey that holds the converted proxy tokens
coin                                         |(string)                     |name of the asset that the proxy token represents
oracletxid                                   |(string)                     |the `oracletxid` of the associated oracle
taddr                                        |(number)                     |===
prefix                                       |(number)                     |===
prefix2                                      |(number)                     |===
deposit                                      |(string)                     |=== the t address associated with the gateay pubkey
tokenid                                      |(string)                     |the `tokenid` of the proxy token
totalsupply                                  |(number)                     |total available supply of proxy tokens
remaining                                    |(number)                     |amount of proxy tokens not currently issued
issued                                       |(number)                     |amount of proxy tokens currently issued

#### :pushpin: Examples:

Command:

```
./komodo-cli -ac_name=CCNG1 ca0779f403d2c56ed65c68797ab9a6c30095689b127f0557897bbc628280b508
```

Response:

```
{
  "result": "success",
  "name": "Gateways",
  "pubkey": "024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0",
  "coin": "KMD",
  "oracletxid": "ba26ba27dc17a017a2c0915378c0a8430e468dffb42c4fc1cd36abf69c88388b",
  "taddr": 0,
  "prefix": 60,
  "prefix2": 85,
  "deposit": "RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp",
  "tokenid": "07646d72dec393f486f8a116facd9b8a575dcf00ec99f819151fd1784015941b",
  "totalsupply": "1.00000000",
  "remaining": "1.00000000",
  "issued": "0.00000000"
}
```

## gatewaysdeposit

**gatewaysdeposit bindtxid height coin cointxid claimvout deposithex proof destpub amount**

The `gatewaysdeposit` method is used to alert the gateway of the completed deposit of the foreign (off-chain) asset.

The method returns a hex value which must then be broadcast using the [`sendrawtransaction`](../essential-rpc/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which serves as the **deposittxid**.

### Arguments:

Structure|Type|Description
---------|----|-----------
bindtxid                                     |(string)                     |the bindtxid of the gateway
height                                       |(number)                     |the block height of the `txid` wherein the funds were sent to the foreign-asset gateway pubkey
name                                         |(string)                     |the name of the foreign asset
cointxid                                     |(string)                     |the `txid` returned when the foreign assets were sent to the gateway pubkey
claimvout                                    |(string)                     |the `vout` of the claim (on the first use, this value should be 0)
deposithex                                   |(string)                     |returned from the `txid` wherein the funds were sent to the foreign-asset gateway pubkey
proof                                        |(string)                     |the proof for the `txid`; can be found using the [`gettxoutproof`](../essential-rpc/blockchain.html#gettxoutproof) method
destpub                                      |(string)                     |the public key where the tokens should be received on the asset chain
amount                                       |(number)                     |the amount of the deposit

### Response:

Structure|Type|Description
---------|----|-----------
result:                                      |(string)                     |whether the command succeeded
hex:                                         |(string)                     |a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command

#### :pushpin: Examples:

Command:

```
./komodo-cli -ac_name=CCNG1 gatewaysdeposit aa1b82d78398184c93405ccd15e3cf00b63634aac98a7b75053aa90eaf9cb47d 1098280 KMD 6d8943f3f524161a9846b7d2d7fec1f6ba404859d75d8a6480e8f4a47b17b3d9 0 0100000001b4b5544d2ae02144e79a1efa43234fc69f08914a01f773e4e553580cca7d0093020000006a473044022064ab9e33c12e80066d09e9ca04f34deb4733c1bfd8c61d0c30426865c9b41b9d02201b24ebcd52079e211def1c32387a82fe80d96670036c41be115a860ba4425f30012103f19aa259c35bf4d55127d40e8e22a799ed8fd4e6e2661fd57147c68e6b0387e9ffffffff0310270000000000001976a914f0d1fc29f8962ac2805a1659192d9ad26794d22988ac809698000000000017a914c8314a58d6f87baad4f309ff8df9de06321ce0038720332b04000000001976a91401d5f57c3bb86cc797b72b8f0a64d5d428e1c01388ac9462ed5b 040000009fc5ca8f9f5c2f07c77853fe803c0281cc363010a9868ec3dbfe0230b32ac3015c37ec8139db16274879b52e5d3d26738ba72a10ad9a34cafe6ef3fc1b3f16210000000000000000000000000000000000000000000000000000000000000000dc62ed5b9cb4041d70006514000000000000025f0000000000000200000000000000000000000000fd4005005693b415e4366fd571c19ac9f5cd62b71075c4e1303ee2ef5fd47ce78fe7d3625f4fcd129dc8d9f7490eb17a6e62df1fad007771f4f7bfcdf53c3f7ded1c0fbf4bc6720e20ace5171176d6abdc7ed7543ddaa900cb19da1dcc19eab82b1249e16e40aa89f675b05414686499fc0852d58261b747c9ea1a82131511c2481f5782cec733193fb58d46516fcd9bf3739bbcf45f26d85411c81b09d31ea773ec7df9a5d762165ea1fd009768165bd659e8e3eeb1c8ac7ba219222a7379c10943ef6abd5c2dd53252e1acdbb428560ac23ba88904861fae4315a3dae69c9223fbe7bffe73fdd8b38805aff3c32faecfefd15b0307dde0ff8b99c6dea43d083776fc47a088c58e0dd8af555189ba42ec7f040a419ab7a4ed97921f99255921d7521c6f3044ddb67319445d5352ca5886fdb153d6c7d05aa546b49d9d09290d1d88f25d0f95e0696511676af2f9c4dbb4730108b727d23f77642dee2071364b2dff3cc9e38af5e92443f6cde8a345d31ace241afc3b89066dff7b6a333f6ac2786e5157c392e974035823b4155b27348045502516e0a9d4b3f30e65c82d31cc8c37a73efda57c178d8c1379e495f3a3011485dbac785d42019cafde1857c2eca365d5939310f20e2112434163c29c2abf4e74559401599f532739d7f397541623de4effe15960d5dc9f6d1c9e8d153d87f1bffc19ba46a05766820df6cb3e4485479b604de518c0e210961633d4dd8a0e190f1530c9a2b4c6dbb508376e28d6185778680815b61fc51f47490bcbbad5419bee6b9dac5d7c8ee31756dba9c015dd25075ae8409f7276ba2ad933886f0eda0a3653cc82c2e04e123bb6e1e41653e91a2571214f85f12161091f19c762ce1b9c25551aad35a5db15ee962607c6b07782adc1c65bbdcb4ce1851dda2b1c1c2439111c2b9539f4c269433fe6da6d16d8fc5200c069e10b9d0bc16e1ef284d9951c6e4a1d15c86c10e00de3ef9481f391d8a338ad7b109dfdc291d84a042e15aa98f4a205ae6337ea5760f323390ebd808d23be7b77d5ce5fac8fce46e33767e7e1efcc3ae0fd05d464d1c6b9f6c1f574c2c8beddabda796cdf3b360b69c0833052cec9cb7774805143c6958952cd547b0d72818c2354141fceb8a4eb9d3d460d801d7b0dfa1cc32931ebca0760d603c47692a5716e4fd315b4d30c342eff4acc48bf21890138a0ad7af05393f9af2110ec3c4238fa8671e6e7c46e5ae809caeff57aa1fc0e93f287665f5c77d2e831aee325279e14e6d8ca5a244015b58a3a008be481d30cea37c8e9f40abb9b740d990becce3d8e09ed67d1ab71a9528d375092d6e518da3910bc163d65749602b10dfac3b1dcbfd8b3a61523db017596c02ded2a38d7d44c0a7f7fdddc52f73b3d46a2b4a61bed50cf0e118cfdcaf385b31e514a00eb3d933c05bcb45346b52066b2f519d2460fac8d0e37acd062078d0ca0de84e5e5f40e5977dc9b86b2150859c0b8e00f8f0e5362f929beedd4dd7c359587295b7a8ced25df53d872f52d3566ad4388dcfdd4530c85e5c9b04d4dc3285590d1f9d4fecd62525ed5fd0f831d2872486e91e7953248d132e819948436a589106cc1a9c850d99793d0e4061cf1fa5e4b521b354622dd41b2a1634f9ff2e1176baff998360c0dd46edf0526f3645089896b60f140f221e2f45aa2931d6c283dc126486f28c349ae7c84eb00e65eed3fc92bbea9152c29b4bed3e02f707843230affad170fce3d234546787eb0b11cfc1902390bc62664e6df80b69fe25f13327d1c396438c3b83a622094b4f741b4e0ddedb745e7baeab553f2551c1f44b1dd7b26f2fca1dee78f2405a99134bda9adf827725e04e9d2316348d7289624618da381782a5fd1bdb5e2473ce56a322ddb0dc807000000049512fa1cc7454e93a427b793bd2eb7198539322938bc5804b028f87d037ba9c8d9b3177ba4f4e880648a5dd7594840baf6c1fed7d2b746981a1624f5f343896dafdcd50a74cb85fb3dc25cd06abe2d07cc95f6579bfd25cbb19dc445a04c432a00be8a04bce4cc877fc3e2ca2540aa08fea06b7c10b556df369966371b58368b011b 024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0 0.1
```

Response:

```
{
  "result": "success",
  "hex": "010000000152d7d470197f5dc650c9ec09e1c8f4975d315219e3b6edad3c927c2fc23197ca0200000048473044022006bf373f1dd51c638a38d1e592741db73387e6acc186fca2011cd7283520ff770220673be91d346ba72adcbc9ab1df712f750047c2609399256c07ad3170d9ea850401ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce05c9836180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c550010f29d430acbc0aad5acd6efaf16640e94edac5e99f764b168f18ea4c377222000e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0253a264762978c6806bc5d0c1e7a8b34bd34d9968824e81c3cbb2aef99faa35100000000"
}
```

Step Two: Broadcast using `sendrawtransction`

```
./komodo-cli -ac_name=CCNG1 sendrawtransaction 010000000152d7d470197f5dc650c9ec09e1c8f4975d315219e3b6edad3c927c2fc23197ca0200000048473044022006bf373f1dd51c638a38d1e592741db73387e6acc186fca2011cd7283520ff770220673be91d346ba72adcbc9ab1df712f750047c2609399256c07ad3170d9ea850401ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce05c9836180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c550010f29d430acbc0aad5acd6efaf16640e94edac5e99f764b168f18ea4c377222000e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0253a264762978c6806bc5d0c1e7a8b34bd34d9968824e81c3cbb2aef99faa35100000000
```

Response:

(This is the `deposittxid`)

```
===
```

## gatewaysclaim

**gatewaysclaim bindtxid coin deposittxid destpub amount**

The `gatewaysclaim` method allows the owner of the `deposittxid` to claim their on-chain proxy tokens. This method can only be executed by the owner of the `pubkey` that was used to launch the daemon from which the `gatewaysdeposit` call was executed.

The method returns a hex value which must then be broadcast using the [`sendrawtransaction`](../essential-rpc/rawtransactions.html#sendrawtransaction) method.

### Arguments:

Structure|Type|Description
---------|----|-----------
bindtxid                                     |(string)                     |the `bindtxid` of the gateway
coin                                         |(string)                     |name of the proxy token
deposittxid                                  |(string)                     |the `deposittxid` returned after broadcasting the hex returned from the `gatewaysdeposit` method
destpub                                      |(string)                     |the `pubkey` address to which the proxy tokens should be sent
amount                                       |(number)                     |the amount to send to the `pubkey`

### Response:

Structure|Type|Description
---------|----|-----------
result:                                      |(string)                     |whether the command succeeded
hex:                                         |(string)                     |a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command

#### :pushpin: Examples:

Step One:

Command

```
./komodo-cli -ac_name=CCNG1 gatewaysclaim aa1b82d78398184c93405ccd15e3cf00b63634aac98a7b75053aa90eaf9cb47d KMD 0450336eed92b90f6921d017b5fe77aab0c608d69f737dabfa52c983b10027a0 024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0 0.1
```

Response from Step One:

```
===
```

Step Two: Broadcast using `sendrawtransction`

```
./komodo-cli -ac_name=CCNG1 sendrawtransaction ===
```

Response from Step Two:

```
===
```

## gatewayswithdraw

**gatewayswithdraw bindtxid coin withdrawpub amount**

The `gatewayswithdraw` method sends proxy tokens in the gateways `pubkey`. The gateway then sends the foreign assets to the indicated foreign `withdrawpub` pubkey.

### Arguments:

Structure|Type|Description
---------|----|-----------
bindtxid                                     |(string)                     |the `bindtxid` of the gateway
coin                                         |(string)                     |the name of the asset
withdrawpub                                  |(string)                     |the `pubkey` to which the foreign assets should be sent
amount                                       |(number)                     |the number of proxy tokens to send to the gateway, which will then be exchanged for the relevant amount of the foreign asset

### Response:

Structure|Type|Description
---------|----|-----------
result:                                      |(string)                     |whether the command succeeded
hex:                                         |(string)                     |a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command


#### :pushpin: Examples:

Command:

```
./komodo-cli -ac_name=CCNG1 gatewayswithdraw aa1b82d78398184c93405ccd15e3cf00b63634aac98a7b75053aa90eaf9cb47d KMD 03d8448c9a23f78addaca57669e31cd4b10a846579500442f40e87601453ca4e1d 0.1
```

Response:

```
===
```

Step Two: Broadcast using `sendrawtransction`:

```
./komodo-cli -ac_name=CCNG1 sendrawtransaction ===
```

Response:

```
===
```
