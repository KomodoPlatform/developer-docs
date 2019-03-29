# Contract Module: Gateways

## Introduction

The `gateways` CryptoConditions module allows the user to facilitate, manage, and trade tokenized representations of foreign blockchain assets.

For example, a user is able to deposit their real-world BTC into a monitored address on the Bitcoin blockchain. Then, on the `gateways` asset chain, the ownership of this BTC is tokenized. Only the owner of the token has the right to withdraw the BTC to a chosen address. The user that made the deposit can use the token either for asset trading, or for other creative purposes.

This allows the `gateways`-enabled asset chain to feature secure, on-chain, high-speed trading.

Using an established `gateways` contract is not considered difficult. However, setting up the gateway requires the user to closely follow several detailed steps.

## GatewaysCC Tutorial and Overview

In this tutorial, we will create a gateway that can serve to represent KMD. The following are the steps in the gateway-creation process:

- Create a new asset chain and provide representative tokens
- Prepare a special oracle to monitor Komodo's chain state
- Bind the tokens and the oracle to our gateway
- Deposit KMD into the gateway
- Exchange tokens with other tokens on-chain
- Use the tokens to withdraw KMD

Please ensure that you have the KMD main chain downloaded and synced before continuing further in the guide.

Also, please open an empty text file and save all output transaction ids and hex-encoded data from each step. You will need the information at various stages.

#### Manually Compile and Install Komodo From Source

For this tutorial, please compile and install Komodo software from the source repositories.

[Information on manual installations can be found at this linked documentation.](https://docs.komodoplatform.com/komodo/install-Komodo-manually.html)

#### Create a New Blockchain

For this tutorial we will create a temporary asset chain called `HELLOWORLD` for educational purposes.

Make sure that the total `ac_supply` of this asset chain is fairly large. `777777` coins will do for our purposes.

[Follow these linked instructions](../installations/creating-asset-chains.html#creating-a-new-asset-chain) before continuing.

Recall also that a user must have a `pubkey` enabled when interacting with a CryptoConditions asset chain. [View this linked material for an explanation.](../cryptoconditions/cryptoconditions-instructions.html#creating-and-launching-with-a-pubkey)

If desired, the reader may use an existing asset chain instead of a temporary educational chain. [Follow this link](https://github.com/jl777/komodo/blob/master/src/assetchains.old) for a list of asset-chain launch parameters.

#### Create a Token to Represent an External Cryptocurrency

For the GatewaysCC module to function it must have access to tokens that can represent an external cryptocurrency. We use the [Tokens](../cryptoconditions/cc-tokens.html) CC module to this effect.

#### Decide the Number of Tokens to Create

We want the number of total tokens to be the maximum possible amount of the represented cryptocurrency that we expect to hold.

Each token is created not from a full coin, but rather from a satoshi.

For example, `1` HELLOWORLD coin creates `100000000` tokens.

The HELLOWORLD satoshis should pair on a one-to-one basis with KMD satoshis.

For our purposes, we will use `1000` coins of HELLOWORLD.

#### Creating the tokens:

To create the tokens, execute the following command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokencreate KMD 1000 KMD_equivalent_token_for_gatewaysCC
```

This creates a `100000000000` token supply of on-chain tokens with the name of `KMD`, which represent the external cryptocurrency, `KMD`.

For more details on the above command, see [tokencreate.](../cryptoconditions/cc-tokens.html#tokencreate)

This command returns a hex value as a response:

````json
{
  "result": "success",
  "hex": "01000000022c223cfc9c3349aed24ca89e44af6fcdb030150443bd6ac55e2080ce4b097c3002000000484730440220316605c400c47e2d5aa6104ac5c5229e71683b8db9482efa1655d257690d338802202344f254b208a6d724f52f4503531cf005a8ca68119bde4b6cb281ab9fccaf1101ffffffff80e66c0c47311449c5effc2782134006f05fd31e79659bc4b0608d7e247e280c0000000049483045022100ec494d3fa5c76fe0382e83980affdfd091509fb4e18b20fff8c095374e6b6bee022015ddaf95dc8b03e8cbba00ff7a377b80a7bd2200a68669718c329c617549757701ffffffff0400a0724e18090000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc1027000000000000232102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702acc01f66fa15090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000396a37e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e00000000" } ```
````

Select the hex value (`01000000022c223c...`) and copy it (CTRL + SHFT + C).

Broadcast this value using [sendrawtransaction:](../komodo-api/rawtransactions.html#sendrawtransaction)

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction insert_hex
```

This returns a string, and this string is our `tokenid`.

```bash
315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf
```

Copy the `tokenid` into the text editor we opened at the beginning of the tutorial and keep it available for future use.

Watch the mempool using [getrawmempool](../komodo-api/blockchain.html#getrawmempool) to verify that the `tokenid` is successfully mined:

```bash
./komodo-cli -ac_name=HELLOWORLD getrawmempool
```

Once the `tokenid` disappears from the mempool the transaction is mined.

If this asset chain were receiving full dPoW security services, at this point it would be appropriate to wait for notarization. We can use [getinfo](../komodo-api/control.html#getinfo) to watch for the `notarizations` property to increase:

```bash
./komodo-cli -ac_name=HELLOWORLD getinfo
```

On this educational asset chain, however, we can continue without waiting for notarization.

We can check to see that our token is successfully created on the chain using [tokeninfo:](../cryptoconditions/cc-tokens.html#tokeninfo)

```bash
./komodo-cli -ac_name=HELLOWORLD tokeninfo insert_token_id
```

We can check the balance of our `pubkey` using [tokenbalance:](../cryptoconditions/cc-tokens.html#tokenbalance)

```bash
./komodo-cli -ac_name=HELLOWORLD tokenbalance insert_tokenid insert_pubkey
```

#### Create an Oracle

We use the [oracles](../cryptoconditions/cc-oracles.html) CryptoConditions module to add external data to the blockchain.

The name of our oracle should be identical to the name of our tokens, `KMD`, and the data format must start with `Ihh` (height, blockhash, merkleroot):

Create the oracle using [oraclescreate:](../cryptoconditions/cc-oracles.html#oraclescreate)

```bash
./komodo-cli -ac_name=HELLOWORLD oraclescreate KMD blockheaders Ihh
```

This returns a hex value:

```json
{
  "result": "success",
  "hex": "010000000185b76ed0fbdb9ee2bdb5693f491b6ea23de6498f42c6e83f9f36c1eaf411dd990200000049483045022100aa198a2ae959ee191e1359df48867480bf5a1a5bd4fa76b4398481c89ff3095102205034824dcd56b312183acd65c27a002a13dae84f5d22c767f1efaae09ef63a5c01ffffffff0310270000000000002321038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aac378740a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000001c6a1aec43064e5957544852014c0e5765617468657220696e204e594300000000"
}
```

Broadcast the returned hex data using [sendrawtransaction:](../komodo-api/rawtransactions.html#sendrawtransaction)

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction insert_hex_data
```

This returns a transaction id, which is the `oracleid`:

```bash
0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203
```

Record this in the text editor.

To prepare for the oraclefeed dApp, use [oraclesregister](../cryptoconditions/cc-oracles.html#oraclesregister) to register as a publisher for the oracle. This must be done on a node which can post KMD blockheaders and which can execute withdrawal transactions:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesregister insert_oracleid data_fee_in_satoshis`
```

This returns a hex value (not shown for brevity), which we now broadcast:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction insert_hex_value
```

Retrieve the data publisher's `pubkey` using [oraclesinfo:](../cryptoconditions/cc-oracles.html#oraclesinfo)

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesinfo insert_oracleid
```

Response from `oraclesinfo`:

```json
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

The property, `"publisher"`, in the entry, `"registered"`, of the returned json object is the data publisher's `pubkey`, also called the `publisherpubkey`.

Subscribe to the oracle using [oraclessubscribe](../cryptoconditions/cc-oracles.html#oraclessubscribe) to receive utxo information for data publishing.

The frequency of data-publishing transactions we can perform in a block is equal to the number of active subscriptions committed to the oracle. Therefore, we must have at least one subscription for the oracle to allow publishing.

```bash
./komodo-cli -ac_name=HELLOWORLD oraclessubscribe insert_oracleid insert_publisherpubkey insert_amount_of_funds_to_add
```

This returns a hex value (not shown for brevity), which we now broadcast:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction insert_hex_value
```

::: warning Note
Execute the <b>oraclessubscribe</b> and <b>sendrawtransaction</b> methods several times and with the same amount. This gives us the opportunity to broadcast more than one sample of data per block. In our example, we want to publish data for more than one KMD-height per block.
:::

Verify the oracle information to ensure it is properly established:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesinfo insert_oracleid
```

#### Activating Gateway Binding

We now create a gateway and bind our information to it, using the [gatewaysbind](../cryptoconditions/cc-gateways.html#gatewaysbind) method.

This method requires that we decide how many total gateway signatures we desire (`N`), and how many signatures are required to withdraw funds (`M`).

For our educational example, we may set both `N` and `M` equal to `1`, for simplicity.

As a part of this command we will need to indicate the `pubtype`, `p2shtype`, and `wiftype` values for our chosen coin. For KMD, these values are `60`, `85` and `188` respectively.

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysbind insert_tokenid insert_oracleid KMD insert_tokensupply 1 1 insert_gatewayspubkey 60 85 188
```

This method returns a hex value (not shown for brevity), which we now broadcast:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction insert_hex_value
```

The broadcast returns a transaction id, also called the `bindtxid`. Copy this information into the text editor.

Assuming all is properly created and executed, we may now review our new gateway using [gatewaysinfo:](../cryptoconditions/cc-gateways.html#gatewaysinfo)

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysinfo insert_bindtxid
```

Use the returned information to verify that the `tokenid` and `oracleid` match the information in our text editor.

#### Assemble an Oracle dApp

An oracle dApp automates the transfer of merkleroot data to our oracle. The Komodo software suite includes built-in tools for creating an oracle dApp.

Change into the correct directory (this command assumes we installed Komodo in the default directory):

```bash
cd  ~/komodo/src/
```

Compile the dApp:

```bash
gcc cc/dapps/oraclefeed.c -lm -o oraclefeed
```

Run the dApp:

```bash
./oraclefeed HELLOWORLD insert_oracleid insert_mypubkey Ihh insert_bindtxid &
```

Response example:

```bash
(succesfull oraclization of KMD heights):
KMD ht.1023334 <- 669d0f009eaf85900be0d54fa1b5f455d49edfc1d9dcfe71c43b8be19b7927dda3ecd20c0175bc7b8eb98d857baeeef6a18fc7d6b58bd34b4eb00beaa18c5842bbe5566a
broadcast HELLOWORLD txid.(9484283d8d4bf28b4053e21e7b7e8210eb59c41668e9c7280c4e6c4fbf61579a)
KMD ht.1023335 <- 679d0f00173d5dc169a64bba92e5765fde848cc620a700295ecce8837cb2a13b05000000ed71033532278f72c8f64990e27f0cb185310df163b3278faf267e87d12bf84b
broadcast HELLOWORLD txid.(837c132ab47f1ac1eee2e03828a9818369b919c1de128b99958ac95ffdc96551)
KMD ht.1023336 <- 689d0f0006a53215d5a07d9ee1c9206dcdccacd1c364968b555c56cdf78f9f0c40f87d08b30fdf63299d25bd9a09a3b3fb8a26800a0a4f6e93ca6cd8cb41b98b756dd937
broadcast HELLOWORLD txid.(f33d5ffaec7d13f14605556cee86262299db8fad0337d1baefadc59ec24b6055)
```

#### Using the Gateway

With our gateway created and our oracle dApp running as a background process, we are finally prepared to test our gateway.

First, we need the `gatewaysDepositAddress`. This is the address where we will deposit our KMD on the main KMD chain.

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysinfo insert_bindtxid
```

Example Response:

```json
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

The `deposit` property contains the `gatewaysDepositAddress`. When we send funds to this address, we receive in return HELLOWORLD KMD tokens to an on-chain address that we indicate as follows.

Use the [z_sendmany](../komodo-api/wallet.html#z-sendmany) method to send funds to two addresses simultaneously. The first address is the `pubkey` that corresponds to our pubkey on the HELLOWORLD asset chain which will receive tokens. The second address is the `gatewaysDepositAddress` on the KMD chain. We send a nominal amount into the first address, and the amount we wish to have available for trading into the second address. This is done on the external chain -- in this case, KMD.

```bash
./komodo-cli z_sendmany "insert_address_where_KMD_funds_are_currently_held" '[{"address":"addressOfPubkeyForTokenizedKmd","amount":0.0001},{"address":"gatewaysDepositAddress","amount":0.1}]'
```

The returned string is the `operation_id`. Use this with the [z_getoperationstatus](../komodo-api/wallet.html#z-getoperationstatus) method.

```bash
./komodo-cli z_getoperationstatus '["insert_operation_id"]'
```

Execute this every few seconds until the `status` property reads `success`. Once this occurs, find the `txid` value. This is our `cointxid`, and we copy this into our text editor.

Wait for the transaction to be mined. Once confirmed, execute the [gettransaction](../komodo-api/wallet.html#gettransaction) method with the `cointxid` to obtain more information we will need later.

```bash
./komodo-cli gettransaction insert_cointxid
```

Via the returned information from the `gettransaction` method, we can verify the addresses were correct by looking at the `vout` properties. At the bottom, there is a `hex` value. Copy the value to the text editor for later.

In the returned results there is also a `blockhash` value, which we can use to find out the height of the block which contains the `cointtxid` by using the method below. 

/komodo-cli getblock insert_cointxid | jq '.height'

Next, execute the following command for more information:

```bash
 ./komodo-cli gettxoutproof '["insert_cointxid"]' 
 ```

This returns a `proof` value. Transfer this to the text editor.

We now have the necessary data to execute the [gatewaysdeposit](../cryptoconditions/cc-gateways.html#gatewaysdeposit-2) method on the HELLOWORLD asset chain.

The `gatewaysdeposit` method broadcasts the relevant data on the asset chain so that the gateway nodes may validate the information and prepare to distribute the KMD tokens.

Here is the information we need for this call:

- `BINDTXID`: our bindtxid
- `HEIGHT`: the `height` value of the `blockhash` containing the `cointxid` transaction
- `COIN`: KMD for this example
- `COINTXID`: the `cointxid` returned from `z_sendmany`
- `CLAIMVOUT`: the `vout` of the claim (this value should be 0, as it is our first use)
- `DEPOSITHEX`: the `hex` value that is found by executing `gettransaction` on the cointxid
- `PROOF`: the `proof` value returned after executing `gettxoutproof` on the cointxid
- `DESTPUB`: the public key where the KMD tokens should be received on the asset chain (the same pubkey used earlier to retrieve the first address for the z_sendmany method)
- `AMOUNT`: the amount of the deposit (in this case 0.1)

```bash
./komodo-cli -ac_name=HELLOWORLD  gatewaysdeposit BINDTXID HEIGHT COIN COINTXID CLAIMVOUT DEPOSITHEX PROOF DESTPUB AMOUNT
```

Successfully executing this command will return a hex value.

Broadcast the hex data:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction insert_hex_data
```

The broadcast returns a transaction id. Copy this to the text editor. It is the `deposittxid`.

::: warning Note
For the deposit to process successfully, the oraclefeed dApp must first process the block height of the z_sendmany transaction through the oracle
:::

#### Claim the Funds on the Asset Chain

To claim the funds we must spend the marker and the deposit asset, and perform the claim.

This method is only available to the owner of the `privkey` corresponding to the pubkey used previously in the `gatewaysdeposit` method. The pubkey should be the `-pubkey=$PUBKEY` parameter used to launch the daemon.

- `BINDTXID`: our bindtxid
- `COIN`: KMD for this example
- `DEPOSITTXID`: the transaction id returned from the `gatewaysdeposit` call
- `DESTPUB`: the public key where these tokens should be received on the asset chain
- `AMOUNT`: the amount of the deposit (in this case 0.1)

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysclaim BINDTXID COIN DEPOSITTXID DESTPUB AMOUNT
```

Broadcast the returned hex value:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction insert_hex_data
```

Once this transaction is successfully confirmed, the gateway will credit tokens to our indicated pubkey. These tokens are now usable as regular Token CC tokens.

::: warning Note
For the claim to process successfully, the deposit and bind transaction must be confirmed first. This requires either 101 confirmations, or if the chain has dPoW, 1 notarization.
:::

#### Withdrawing KMD Funds

When finished with our tokens, we may send them to the gateway and withdraw the corresponding KMD funds via the [gatewayswithdraw](../cryptoconditions/cc-gateways.html#gatewayswithdraw) method. Only the current owner of the KMD funds may execute the `gatewayswithdraw` method for these funds.

::: tip
Recall that for the gateway to function, the oracle dApp must be running.
:::

Before we execute `gatewayswithdraw`, we must first import the private key for the `gatewaysdeposit address` on node which has oraclefeed dApp running (this is needed only once).

Find the `gatewayDepositAddress` in the `deposit` property of the returned values of the following command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysinfo insert_bindtxid
```

Find the private key returned from this command:

```bash
./komodo-cli -ac_name=HELLOWORLD dumprivkey insert_gatewayDepositAddress
```

Execute the following commands on the node running the oraclefeed dApp:

```bash
./komodo-cli importprivkey "insert_private_key" "label" false
```

Information for the next command:

- `BINDTXID`: our bindtxid
- `COIN`: KMD for this example
- `WITHDRAWPUB`: the pubkey where the withdrawn coins should appear on the external chain; in this case, the KMD pubkey
- `AMOUNT`: the amount to withdraw

```bash
./komodo-cli -ac_name=HELLOWORLD gatewayswithdraw insert_bindtxid KMD insert_withdraw_pubkey insert_desired_withdraw_amount
```

Once executed, the remaining portion of the withdrawal process should happen automatically.

Congratulations, you have successfully completed the cycle of the Gateways CC module.

## Full Example

The following content provides the full terminal input and output of a complete gateway cycle.

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokencreate KMD 1 testing
```

Response:

```json
{
  "result": "success",
  "hex": "010000000100ab0161028985d24b473d758ee9cbb944006c27b69eb6ec5b0625e7c72bdab400000000494830450221008914c99e55f8471d7985db10fead22d4abdd52670709da9c962e20a1dd77064c022022e1900ab245872eede0439e3acbd8e481304a9ba71039590ee4ca452a628fa801ffffffff0400e1f50500000000302ea22c802090bc95b90831a7837c7ef178f6fd47f26a933bcf8de56da4a2f62894ab6c73fc8103120c008203000401cc1027000000000000232102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702ace0707c48180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000326a30e36321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0034b4d440774657374696e6700000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000100ab0161028985d24b473d758ee9cbb944006c27b69eb6ec5b0625e7c72bdab400000000494830450221008914c99e55f8471d7985db10fead22d4abdd52670709da9c962e20a1dd77064c022022e1900ab245872eede0439e3acbd8e481304a9ba71039590ee4ca452a628fa801ffffffff0400e1f50500000000302ea22c802090bc95b90831a7837c7ef178f6fd47f26a933bcf8de56da4a2f62894ab6c73fc8103120c008203000401cc1027000000000000232102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702ace0707c48180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000326a30e36321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0034b4d440774657374696e6700000000
```

Response:

```bash
315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokeninfo 315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf
```

Response:

```json
{
  "result": "success",
  "tokenid": "315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf",
  "owner": "024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0",
  "name": "KMD",
  "supply": 100000000,
  "description": "testing"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclescreate KMD testing Ihh
```

Response:

```json
{
  "result": "success",
  "hex": "010000000100d7be6a83f6398b2b30315d6a9fb6af048971fbdc233e36fb4307fde654ab5a0000000049483045022100a0155127857c36c35d72e718f052a8a6b2ac5003f8a67e622c006f2f071e5d020220087febeac78eba36a2b6c92a860f32141f9dc453f77988f9da6cfaa14d1e9d9001ffffffff0310270000000000002321038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aace051724e180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000146a12ec43034b4d44034968680774657374696e6700000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000100d7be6a83f6398b2b30315d6a9fb6af048971fbdc233e36fb4307fde654ab5a0000000049483045022100a0155127857c36c35d72e718f052a8a6b2ac5003f8a67e622c006f2f071e5d020220087febeac78eba36a2b6c92a860f32141f9dc453f77988f9da6cfaa14d1e9d9001ffffffff0310270000000000002321038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aace051724e180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000146a12ec43034b4d44034968680774657374696e6700000000
```

Response:

```bash
9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesregister 9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40 10000
```

Response:

```json
{
  "result": "success",
  "hex": "010000000100da09e69ee37b713b3bbc5e4cf5f7b9525766af13c86fd5bddb246aff675cbe000000004847304402202d1aa9c1c39ed4428f381d727780fdd6fddfeef616595b7add6b0c7dac66e35f022070c227072ea93b099941daa1b5a2a41afa84ea955a536727c2307c10dc5aa53c01ffffffff041027000000000000232102407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9eac1027000000000000302ea22c802070f8ca74a159596583083b3744665976848f8c9f2e6d61b962e66c8a0d6b225d8103120c008203000401ccd02a724e180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac00000000000000004f6a4c4cec52407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9e21024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0102700000000000000000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000100da09e69ee37b713b3bbc5e4cf5f7b9525766af13c86fd5bddb246aff675cbe000000004847304402202d1aa9c1c39ed4428f381d727780fdd6fddfeef616595b7add6b0c7dac66e35f022070c227072ea93b099941daa1b5a2a41afa84ea955a536727c2307c10dc5aa53c01ffffffff041027000000000000232102407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9eac1027000000000000302ea22c802070f8ca74a159596583083b3744665976848f8c9f2e6d61b962e66c8a0d6b225d8103120c008203000401ccd02a724e180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac00000000000000004f6a4c4cec52407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9e21024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0102700000000000000000000
```

Response:

```bash
b0bbe39a33e794ecff5af817440c0cd7d92479cca74f3c763f88111383015d73
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesinfo 9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40
```

Response:

```json
{
  "result": "success",
  "txid": "9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40",
  "name": "KMD",
  "description": "testing",
  "format": "Ihh",
  "marker": "RVzbTDynxQysZbYXURkq5W3TjnevyWX1fA",
  "registered": [
    {
      "publisher": "024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0",
      "baton": "RMYk1vLfWGi3aVxjGJYaAyYNZkZUvmoFJ6",
      "batontxid": "b0bbe39a33e794ecff5af817440c0cd7d92479cca74f3c763f88111383015d73",
      "lifetime": "0.00000000",
      "funds": "0.00000000",
      "datafee": "0.00010000"
    }
  ]
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclessubscribe 9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40 024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0 1
```

Response:

```json
{
  "result": "success",
  "hex": "010000000100e078a6ecd74f0b1609656ea3e7ee54c4a95ae66bfd19929c2e2cdc781b0f410000000049483045022100d48c862acde5e8756d11ef14ea9aaae26cf3da4344b49eb0e496b639c91499e602204dd685b86aae4dd8685e0b14b53c8a2957f5980a61f36d30eb8886726894570401ffffffff0400e1f50500000000302ea22c8020d5ad5ece52f2a6c9dd46cd4e658abce5dc1881e9c470d5cdf1f3f71199996f788103120c008203000401cc1027000000000000232102407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9eace0707c48180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac00000000000000004f6a4c4cec53407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9e21024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff000e1f5050000000000000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000100e078a6ecd74f0b1609656ea3e7ee54c4a95ae66bfd19929c2e2cdc781b0f410000000049483045022100d48c862acde5e8756d11ef14ea9aaae26cf3da4344b49eb0e496b639c91499e602204dd685b86aae4dd8685e0b14b53c8a2957f5980a61f36d30eb8886726894570401ffffffff0400e1f50500000000302ea22c8020d5ad5ece52f2a6c9dd46cd4e658abce5dc1881e9c470d5cdf1f3f71199996f788103120c008203000401cc1027000000000000232102407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9eace0707c48180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac00000000000000004f6a4c4cec53407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9e21024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff000e1f5050000000000000000
```

Response:

```bash
2e0192ed35349009581cb6be842283b472247abbbeff62d8daef6fc2acfdf808
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysbind 315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf 9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40 KMD 100000000 1 1 024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0 60 85 188
```

Response:

```json
{
  "result": "success",
  "hex": "010000000101069d6ef8a20a726959a9802151f3367558a3e2360bb5620cf269c5949777430000000048473044022065e97dc3e0f8aee9c6bc041c728c18ab021c174b8570a8c332a170ec7a94773f022023c19d04002940298ae961d1c155e889df29ae9976bb61cfebd87715de3d7fbf01ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce051724e180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c5500bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d3100e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9e00000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000101069d6ef8a20a726959a9802151f3367558a3e2360bb5620cf269c5949777430000000048473044022065e97dc3e0f8aee9c6bc041c728c18ab021c174b8570a8c332a170ec7a94773f022023c19d04002940298ae961d1c155e889df29ae9976bb61cfebd87715de3d7fbf01ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce051724e180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c5500bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d3100e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0407eab204e0889bab53c76e8a1b399a79e0ff1205ed044b8af09c22744632b9e00000000
```

Response:

```bash
897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysinfo 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d
```

Response:

```json
{
  "result": "success",
  "name": "Gateways",
  "pubkey": "024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0",
  "coin": "KMD",
  "oracletxid": "9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40",
  "taddr": 0,
  "prefix": 60,
  "prefix2": 85,
  "deposit": "RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp",
  "tokenid": "315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf",
  "totalsupply": "1.00000000",
  "remaining": "1.00000000",
  "issued": "0.00000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD dumpprivkey RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp
```

Response:

```bash
DONOTUSE_privkey_STRING
```

Command:

```bash
./komodo-cli importprivkey "privkey" "label" false
```

Response:

```bash
(corresponding address to privkey)
```

Command:

```bash
./oraclefeed HELLOWORLD 9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40 024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0 Ihh 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d
```

Response:

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   671  100   671    0     0  41937      0 --:--:-- --:--:-- --:--:-- 41937
BTC/USD 3836.4150
Powered by CoinDesk (https://www.coindesk.com/price/) 3836.41500000
coin.KMD vs KMD
set refcoin RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp <- KMD [./komodo-cli] M.1 of N.1
broadcast HELLOWORLD txid.(8553c068743984692dfa91bee2ce27749352c9b2aef5a06b011f1d3bd263eada)
KMD ht.1116166 <- 060811006a039b728c305c8d98b42801cde542386fc3fba3a7dbcdfbb97e6e88a891d909976d2c4de105822f03f6b81d35f3075e08bb098553bfbd3709127aac112a7819
```

#### Example Continues - From Gateway USER Node

Make a Deposit

```bash
./komodo-cli listaddressgroupings
```

Response:

```bash
[
    [
      "RFUL6arBgucq9TUPvTaUTnpQ2DkrcxtSxx",
      0.26455000
    ]
]
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD getaccountaddress ""
```

Response:

```bash
RBm4FN3JhjhbVFaGKJ8DQgtgPHKXvhFMs3
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysinfo 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d
```

Response:

```json
{
  "result": "success",
  "name": "Gateways",
  "pubkey": "024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0",
  "coin": "KMD",
  "oracletxid": "9e2b634427c209afb844d05e20f10f9ea799b3a1e8763cb5ba89084e20ab7e40",
  "taddr": 0,
  "prefix": 60,
  "prefix2": 85,
  "deposit": "RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp",
  "tokenid": "315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf",
  "totalsupply": "1.00000000",
  "remaining": "1.00000000",
  "issued": "0.00000000"
}
```

Command:

```bash
./komodo-cli z_sendmany "RFUL6arBgucq9TUPvTaUTnpQ2DkrcxtSxx" '[{"address":"RBm4FN3JhjhbVFaGKJ8DQgtgPHKXvhFMs3","amount":0.0001},{"address":"RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp","amount":0.1}]'
```

Response:

```bash
opid-fbe98b01-a870-4bd5-9bc9-b937b08c79b5
```

Command:

```bash
./komodo-cli z_getoperationstatus '["opid-fbe98b01-a870-4bd5-9bc9-b937b08c79b5"]'
```

Response:

```json
[
  {
    "id": "opid-fbe98b01-a870-4bd5-9bc9-b937b08c79b5",
    "status": "success",
    "creation_time": 1543366284,
    "result": {
      "txid": "907812ee8d2762b589f6ca88ee8ba18a65ebf5c7486c472df7395628d22d0d98"
    },
    "execution_secs": 0.007361979,
    "method": "z_sendmany",
    "params": {
      "fromaddress": "RFUL6arBgucq9TUPvTaUTnpQ2DkrcxtSxx",
      "amounts": [
        {
          "address": "RBm4FN3JhjhbVFaGKJ8DQgtgPHKXvhFMs3",
          "amount": 0.0001
        },
        {
          "address": "RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp",
          "amount": 0.1
        }
      ],
      "minconf": 1,
      "fee": 0.0001
    }
  }
]
```

Wait until this height is oraclized by the `oraclefeed` dApp.

Find the `height` and `hex` values here:

Command:

```bash
./komodo-cli getrawtransaction 907812ee8d2762b589f6ca88ee8ba18a65ebf5c7486c472df7395628d22d0d98 1
```

Response:

```json
{
  "hex": "010000000197d6ea16c68dc5db95b72e029a0e23cb403ae0a33b561b863963cfd9cbfec747000000006b483045022100aca47515602989979b514b6211c375e4d0d9471dd8297c5238c12245ad01dd830220191105caf1b63313c6988194f5f03fd6f70d4a30edc7820add1185d35edff1bb012102924664b536f3710a8e8abea38bb4bf71b470a653a4dceabd50df08d7b2a38436ffffffff0310270000000000001976a9141b355cb6b76cab1b16cb873db8828fe5d2521ae488ac80969800000000001976a914f0d1fc29f8962ac2805a1659192d9ad26794d22988ac38c7fa00000000001976a91482804b943dd6a2008af73f8ba40449c062f0935188ac50e6fd5b",
  "txid": "907812ee8d2762b589f6ca88ee8ba18a65ebf5c7486c472df7395628d22d0d98",
  "overwintered": false,
  "version": 1,
  "locktime": 1543366224,
  "vin": [
    {
      "txid": "47c7fecbd9cf6339861b563ba3e03a40cb230e9a022eb795dbc58dc616ead697",
      "vout": 0,
      "address": "RFUL6arBgucq9TUPvTaUTnpQ2DkrcxtSxx",
      "scriptSig": {
        "asm": "3045022100aca47515602989979b514b6211c375e4d0d9471dd8297c5238c12245ad01dd830220191105caf1b63313c6988194f5f03fd6f70d4a30edc7820add1185d35edff1bb[ALL] 02924664b536f3710a8e8abea38bb4bf71b470a653a4dceabd50df08d7b2a38436",
        "hex": "483045022100aca47515602989979b514b6211c375e4d0d9471dd8297c5238c12245ad01dd830220191105caf1b63313c6988194f5f03fd6f70d4a30edc7820add1185d35edff1bb012102924664b536f3710a8e8abea38bb4bf71b470a653a4dceabd50df08d7b2a38436"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.0001,
      "interest": 0.0,
      "valueSat": 10000,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 1b355cb6b76cab1b16cb873db8828fe5d2521ae4 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a9141b355cb6b76cab1b16cb873db8828fe5d2521ae488ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": ["RBm4FN3JhjhbVFaGKJ8DQgtgPHKXvhFMs3"]
      }
    },
    {
      "value": 0.1,
      "interest": 0.0,
      "valueSat": 10000000,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 f0d1fc29f8962ac2805a1659192d9ad26794d229 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914f0d1fc29f8962ac2805a1659192d9ad26794d22988ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": ["RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp"]
      }
    },
    {
      "value": 0.16435,
      "interest": 0.0,
      "valueSat": 16435000,
      "n": 2,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 82804b943dd6a2008af73f8ba40449c062f09351 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a91482804b943dd6a2008af73f8ba40449c062f0935188ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": ["RMBDcZbvjhfureuAaobJmKJLSApAVbBx6g"]
      }
    }
  ],
  "vjoinsplit": [],
  "blockhash": "00000006396dff8e9eb78217f17dbf83711d9066a91f25917cc504c76a83a85f",
  "height": 1116196,
  "confirmations": 1,
  "rawconfirmations": 1,
  "time": 1543366322,
  "blocktime": 1543366322
}
```

Command:

```bash
./komodo-cli gettxoutproof '["907812ee8d2762b589f6ca88ee8ba18a65ebf5c7486c472df7395628d22d0d98"]'
```

Response:

```bash
04000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysdeposit 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d 1116196 KMD 907812ee8d2762b589f6ca88ee8ba18a65ebf5c7486c472df7395628d22d0d98 0 010000000197d6ea16c68dc5db95b72e029a0e23cb403ae0a33b561b863963cfd9cbfec747000000006b483045022100aca47515602989979b514b6211c375e4d0d9471dd8297c5238c12245ad01dd830220191105caf1b63313c6988194f5f03fd6f70d4a30edc7820add1185d35edff1bb012102924664b536f3710a8e8abea38bb4bf71b470a653a4dceabd50df08d7b2a38436ffffffff0310270000000000001976a9141b355cb6b76cab1b16cb873db8828fe5d2521ae488ac80969800000000001976a914f0d1fc29f8962ac2805a1659192d9ad26794d22988ac38c7fa00000000001976a91482804b943dd6a2008af73f8ba40449c062f0935188ac50e6fd5b 04000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b 02d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d 0.1
```

Response:

```json
{
  "result": "success",
  "hex": "01000000010db4b1686d1f27de5e2a11c793dfd30f09b296754f95ae8649858cca97d5b07a0000000049483045022100ad6bc26f0c66b89f5d63aff251c78965a50201f909a997b8ed6469da0334aa0c0220136d71f5ad1f4496785df81864f9be3ae7b8dd012dae08d59fd544869eacb3ba01ffffffff041027000000000000302ea22c80205fd998129698de9cf1455f4f4795794c9e57bf1fd5f28598b5e6c0322de5d0358103120c008203000401cc1027000000000000232102980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890acd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000fd04096a4d0009f144034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a890121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0012fea85ecfda42975a2aaed72e946792df41a486033af8dc45ab1e4ddcb34b1b424081100980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee12789000000000fd080230313030303030303031393764366561313663363864633564623935623732653032396130653233636234303361653061333362353631623836333936336366643963626665633734373030303030303030366234383330343530323231303061636134373531353630323938393937396235313462363231316333373565346430643934373164643832393763353233386331323234356164303164643833303232303139313130356361663162363333313363363938383139346635663033666436663730643461333065646337383230616464313138356433356564666631626230313231303239323436363462353336663337313061386538616265613338626234626637316234373061363533613464636561626435306466303864376232613338343336666666666666666630333130323730303030303030303030303031393736613931343162333535636236623736636162316231366362383733646238383238666535643235323161653438386163383039363938303030303030303030303139373661393134663064316663323966383936326163323830356131363539313932643961643236373934643232393838616333386337666130303030303030303030313937366139313438323830346239343364643661323030386166373366386261343034343963303632663039333531383861633530653666643562fd360604000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b2102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000010db4b1686d1f27de5e2a11c793dfd30f09b296754f95ae8649858cca97d5b07a0000000049483045022100ad6bc26f0c66b89f5d63aff251c78965a50201f909a997b8ed6469da0334aa0c0220136d71f5ad1f4496785df81864f9be3ae7b8dd012dae08d59fd544869eacb3ba01ffffffff041027000000000000302ea22c80205fd998129698de9cf1455f4f4795794c9e57bf1fd5f28598b5e6c0322de5d0358103120c008203000401cc1027000000000000232102980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890acd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000fd04096a4d0009f144034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a890121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0012fea85ecfda42975a2aaed72e946792df41a486033af8dc45ab1e4ddcb34b1b424081100980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee12789000000000fd080230313030303030303031393764366561313663363864633564623935623732653032396130653233636234303361653061333362353631623836333936336366643963626665633734373030303030303030366234383330343530323231303061636134373531353630323938393937396235313462363231316333373565346430643934373164643832393763353233386331323234356164303164643833303232303139313130356361663162363333313363363938383139346635663033666436663730643461333065646337383230616464313138356433356564666631626230313231303239323436363462353336663337313061386538616265613338626234626637316234373061363533613464636561626435306466303864376232613338343336666666666666666630333130323730303030303030303030303031393736613931343162333535636236623736636162316231366362383733646238383238666535643235323161653438386163383039363938303030303030303030303139373661393134663064316663323966383936326163323830356131363539313932643961643236373934643232393838616333386337666130303030303030303030313937366139313438323830346239343364643661323030386166373366386261343034343963303632663039333531383861633530653666643562fd360604000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b2102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000
```

Response:

```bash
07d79e39354cc38a76dfe2ca8a5fb711432192237608ea066621662f13e0c08e
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysclaim 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d KMD 07d79e39354cc38a76dfe2ca8a5fb711432192237608ea066621662f13e0c08e 02d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d 0.1
```

Response:

```json
{
  "result": "success",
  "hex": "01000000030a9a982a898012f4cc982796f381f16c9e2e5fe28e0be58ad59c7c90409530f8020000004847304402207959e4befae9e917cde7d6ba6f5e62e4cf679858b1a5c8b1eb270b1c7eac7c7e0220503ea9a24245db21b4db8ae68e48da6c5d33ef436371c6d03872d45d1364047c01ffffffffc6fc3b75a37a6ed10507a1bb73f2c5d5c8f75bcb358b0aa4bab3b80b5aa39f19010000007b4c79a276a072a26ba067a565802103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb408140d4c46b8282d42d7e7ebe99361264c21b9ee221b7b3a47e1549e06bf06659fa194298618a2969a421543753a5994ebc3944e93ac6072a233ab617b229b3922a52a100af038001f1a10001ffffffff8ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed707000000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d8140f3938953c9087e1e25c31263c5a717dd59d2f7d6f0815cfd7c0cb01a6c4d586b630b11cca1e60a19036d937095941660e488a07494fc721471d4a53f5eb89a25a100af038001f1a10001ffffffff048096980000000000302ea22c8020abd72b18452f1bc72f4312dbb1cd341b7c7f38a994ddacd8b35412231f01cb088103120c008203000401cc804a5d0500000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc1027000000000000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000936a4c90e374bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a898ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed7072102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000030a9a982a898012f4cc982796f381f16c9e2e5fe28e0be58ad59c7c90409530f8020000004847304402207959e4befae9e917cde7d6ba6f5e62e4cf679858b1a5c8b1eb270b1c7eac7c7e0220503ea9a24245db21b4db8ae68e48da6c5d33ef436371c6d03872d45d1364047c01ffffffffc6fc3b75a37a6ed10507a1bb73f2c5d5c8f75bcb358b0aa4bab3b80b5aa39f19010000007b4c79a276a072a26ba067a565802103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb408140d4c46b8282d42d7e7ebe99361264c21b9ee221b7b3a47e1549e06bf06659fa194298618a2969a421543753a5994ebc3944e93ac6072a233ab617b229b3922a52a100af038001f1a10001ffffffff8ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed707000000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d8140f3938953c9087e1e25c31263c5a717dd59d2f7d6f0815cfd7c0cb01a6c4d586b630b11cca1e60a19036d937095941660e488a07494fc721471d4a53f5eb89a25a100af038001f1a10001ffffffff048096980000000000302ea22c8020abd72b18452f1bc72f4312dbb1cd341b7c7f38a994ddacd8b35412231f01cb088103120c008203000401cc804a5d0500000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc1027000000000000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000936a4c90e374bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a898ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed7072102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000
```

Response:

```bash
9bf287d544c6f5597ccf67641398718398cd79fde02caa32a4b338b5a923cb61
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokenbalance 315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf
```

Response:

```json
{
  "result": "success",
  "CCaddress": "RTjscp9uKYQ8bT3jmShC8mEbuz3qwtGWor",
  "tokenid": "315d16c2dddd737f8a48f81499908897b53d05d20fb1344e349e304fb603f6bf",
  "balance": 10000000
}
```

#### User Withdraws Funds

```bash
./komodo-cli -ac_name=HELLOWORLD gatewayswithdraw 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d KMD 0271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328 0.1
```

Response:

```json
{
  "result": "success",
  "hex": "01000000020e2778e5c0917b00a995ffd0e027ac896492b70b2004ca0096d5309bc1d695ce0000000048473044022072bd3e74c1fb6a56111fc34caab1d605cedfbcb0a9dcd1a4c8d0dae9db61d43902205ccea739077b3374559353af3392e637b7c462ca699f9b9dba786b5398491b4201ffffffff8425c1bf730444ceac45a47376164d66a156e6c2a48116ec14cd17a88f8ab8e5010000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d814051e39b89bace8226f3ca1779b754f2b57ee480e9636b16322bb36a89ec22de967ea66cdc906debb5f6b7c26a51ac2d089966aeb92d07aacc43507b1555c02313a100af038001f1a10001ffffffff058096980000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc102700000000000023210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328ac1027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401ccd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000536a4c50f157bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d44210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328809698000000000000000000"
}
```

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000020e2778e5c0917b00a995ffd0e027ac896492b70b2004ca0096d5309bc1d695ce0000000048473044022072bd3e74c1fb6a56111fc34caab1d605cedfbcb0a9dcd1a4c8d0dae9db61d43902205ccea739077b3374559353af3392e637b7c462ca699f9b9dba786b5398491b4201ffffffff8425c1bf730444ceac45a47376164d66a156e6c2a48116ec14cd17a88f8ab8e5010000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d814051e39b89bace8226f3ca1779b754f2b57ee480e9636b16322bb36a89ec22de967ea66cdc906debb5f6b7c26a51ac2d089966aeb92d07aacc43507b1555c02313a100af038001f1a10001ffffffff058096980000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc102700000000000023210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328ac1027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401ccd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000536a4c50f157bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d44210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328809698000000000000000000
```

Response:

```bash
79d41ffefa359a7ae2f62adf728a3ec3f3d2653889780ed9776bf9b74fe9a6fe
```

## gatewaysaddress

**gatewaysaddress**

The `gatewaysaddress` method returns information about the on-chain gateway.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |            |

### Response:

| Structure           | Type     | Description                                                                                                          |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| "result"            | (string) | whether the command executed successfully                                                                            |
| "GatewaysCCaddress" | (string) | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey |
| "Gatewaysmarker"    | (string) | the unmodified public address generated from the contract's privkey                                                  |
| "GatewaysPubkey"    | (string) | the pubkey for the gateways cc                                                                                       |
| "GatewaysCCassets"  | (string) | this property is used for development purposes only and can otherwise be ignored                                     |
| "myCCaddress"       | (string) | taking the contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                    |
| "myaddress"         | (string) | the public address of the pubkey used to launch the chain                                                            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysaddress
```

Response:

```json
{
  "result": "success",
  "GatewaysCCaddress": "RKWpoK6vTRtq5b9qrRBodLkCzeURHeEk33",
  "Gatewaysmarker": "RGJKV97ZN1wBfunuMt1tebiiHENNEq73Yh",
  "GatewaysPubkey": "03ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb40",
  "GatewaysCCassets": "RD7tdFCpk2SPuiZqvDq5yysectsuhAc5wz",
  "myCCaddress": "RWR1hg4Ud6C5PhpWjkrEBhSfqhZCAGDwd9",
  "myaddress": "RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp"
}
```

## gatewaysbind

**gatewaysbind tokenid oracletxid coin tokensupply M N pubkey(s) pubtype p2shtype wiftype [taddr]**

The `gatewaysbind` method binds the provided sources into a new gateway.

### Arguments:

| Structure   | Type     | Description                                                                                                   |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| tokenid     | (string) | the `tokenid` that the gateway will control as a proxy of foreign (off-chain) assets                          |
| oracletxid  | (string) | the `oracletxid` under which the gateway should be created                                                    |
| name        | (string) | the name of the coin represented by the gateway's proxy token                                                 |
| tokensupply | (number) | the maximum available supply of the proxy token; this should be equal to the total number of `tokenid` tokens |
| M           | (number) | the minimum number of gateway signatory nodes required to facilitate a gateway transaction                    |
| N           | (number) | the full number of gateway signatory nodes that will control the gateway                                      |
| pubkey      | (string) | the pubkey on which tokens will be available after conversion                                                 |
| pubtype     | (number) | the prefix number of pubkey type of external chain                                                            |
| p2shtype    | (number) | the prefix number of p2sh type of external chain                                                              |
| wiftype     | (number) | the prefix number of wif type of external chain                                                               |
| taddr       | (number) | the 2nd byte of prefix number of pubkey type (optional, only for 2 byte prefix chains)                        |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Step One:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysbind 202277c3a48ef168b164f7995eaced940e6416afefd6acd5aac0cb0a439df210 51a3fa99ef2abb3c1ce8248896d934bd348b7a1e0c5dbc06688c976247263a25 KMD 100000000 1 1 024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0 60 85 188
```

Response from Step One:

```json
{
  "result": "success",
  "hex": "010000000152d7d470197f5dc650c9ec09e1c8f4975d315219e3b6edad3c927c2fc23197ca0200000048473044022006bf373f1dd51c638a38d1e592741db73387e6acc186fca2011cd7283520ff770220673be91d346ba72adcbc9ab1df712f750047c2609399256c07ad3170d9ea850401ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce05c9836180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c550010f29d430acbc0aad5acd6efaf16640e94edac5e99f764b168f18ea4c377222000e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0253a264762978c6806bc5d0c1e7a8b34bd34d9968824e81c3cbb2aef99faa35100000000"
}
```

Step Two:

Broadcast using [sendrawtransction:](../komodo-api/rawtransactions.html#sendrawtransaction)

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000152d7d470197f5dc650c9ec09e1c8f4975d315219e3b6edad3c927c2fc23197ca0200000048473044022006bf373f1dd51c638a38d1e592741db73387e6acc186fca2011cd7283520ff770220673be91d346ba72adcbc9ab1df712f750047c2609399256c07ad3170d9ea850401ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce05c9836180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c550010f29d430acbc0aad5acd6efaf16640e94edac5e99f764b168f18ea4c377222000e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0253a264762978c6806bc5d0c1e7a8b34bd34d9968824e81c3cbb2aef99faa35100000000
```

Response from Step Two:

```bash
aa1b82d78398184c93405ccd15e3cf00b63634aac98a7b75053aa90eaf9cb47d
```

This is the `bindtxid` for the gateway.

<!--FIXME new RPC added
## gatewayscompletesigning

**gatewayscompletesigning withdrawtxid coin hex**
-->

## gatewaysclaim

**gatewaysclaim bindtxid coin deposittxid destpub amount**

The `gatewaysclaim` method allows the owner of the `deposittxid` to claim their on-chain proxy tokens. This method can only be executed by the owner of the `pubkey` that was used to launch the daemon from which the `gatewaysdeposit` call was executed.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments:

| Structure   | Type     | Description                                                                                      |
| ----------- | -------- | ------------------------------------------------------------------------------------------------ |
| bindtxid    | (string) | the `bindtxid` of the gateway                                                                    |
| coin        | (string) | the name of the proxy token                                                                      |
| deposittxid | (string) | the `deposittxid` returned after broadcasting the hex returned from the `gatewaysdeposit` method |
| destpub     | (string) | the `pubkey` address to which the proxy tokens should be sent                                    |
| amount      | (number) | the amount to send to the `pubkey`                                                               |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Step One:

Command

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysclaim 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d KMD 07d79e39354cc38a76dfe2ca8a5fb711432192237608ea066621662f13e0c08e 02d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d 0.1
```

Response from Step One:

```json
{
  "result": "success",
  "hex": "01000000030a9a982a898012f4cc982796f381f16c9e2e5fe28e0be58ad59c7c90409530f8020000004847304402207959e4befae9e917cde7d6ba6f5e62e4cf679858b1a5c8b1eb270b1c7eac7c7e0220503ea9a24245db21b4db8ae68e48da6c5d33ef436371c6d03872d45d1364047c01ffffffffc6fc3b75a37a6ed10507a1bb73f2c5d5c8f75bcb358b0aa4bab3b80b5aa39f19010000007b4c79a276a072a26ba067a565802103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb408140d4c46b8282d42d7e7ebe99361264c21b9ee221b7b3a47e1549e06bf06659fa194298618a2969a421543753a5994ebc3944e93ac6072a233ab617b229b3922a52a100af038001f1a10001ffffffff8ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed707000000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d8140f3938953c9087e1e25c31263c5a717dd59d2f7d6f0815cfd7c0cb01a6c4d586b630b11cca1e60a19036d937095941660e488a07494fc721471d4a53f5eb89a25a100af038001f1a10001ffffffff048096980000000000302ea22c8020abd72b18452f1bc72f4312dbb1cd341b7c7f38a994ddacd8b35412231f01cb088103120c008203000401cc804a5d0500000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc1027000000000000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000936a4c90e374bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a898ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed7072102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000"
}
```

Step Two: Broadcast using `sendrawtransction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000030a9a982a898012f4cc982796f381f16c9e2e5fe28e0be58ad59c7c90409530f8020000004847304402207959e4befae9e917cde7d6ba6f5e62e4cf679858b1a5c8b1eb270b1c7eac7c7e0220503ea9a24245db21b4db8ae68e48da6c5d33ef436371c6d03872d45d1364047c01ffffffffc6fc3b75a37a6ed10507a1bb73f2c5d5c8f75bcb358b0aa4bab3b80b5aa39f19010000007b4c79a276a072a26ba067a565802103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb408140d4c46b8282d42d7e7ebe99361264c21b9ee221b7b3a47e1549e06bf06659fa194298618a2969a421543753a5994ebc3944e93ac6072a233ab617b229b3922a52a100af038001f1a10001ffffffff8ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed707000000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d8140f3938953c9087e1e25c31263c5a717dd59d2f7d6f0815cfd7c0cb01a6c4d586b630b11cca1e60a19036d937095941660e488a07494fc721471d4a53f5eb89a25a100af038001f1a10001ffffffff048096980000000000302ea22c8020abd72b18452f1bc72f4312dbb1cd341b7c7f38a994ddacd8b35412231f01cb088103120c008203000401cc804a5d0500000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc1027000000000000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000936a4c90e374bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a898ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed7072102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000
```

Response from Step Two:

```bash
9bf287d544c6f5597ccf67641398718398cd79fde02caa32a4b338b5a923cb61
```

## gatewaysdeposit

**gatewaysdeposit bindtxid height coin cointxid claimvout deposithex proof destpub amount**

The `gatewaysdeposit` method is used to alert the gateway of the completed deposit of the foreign (off-chain) asset.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which serves as the **deposittxid**.

### Arguments:

| Structure  | Type     | Description                                                                                                          |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| bindtxid   | (string) | the bindtxid of the gateway                                                                                          |
| height     | (number) | the block height of the `txid` wherein the funds were sent to the foreign-asset gateway pubkey                       |
| name       | (string) | the name of the foreign asset                                                                                        |
| cointxid   | (string) | the `txid` returned when the foreign assets were sent to the gateway pubkey                                          |
| claimvout  | (string) | the `vout` of the claim (on the first use, this value should be 0)                                                   |
| deposithex | (string) | returned from the `txid` wherein the funds were sent to the foreign-asset gateway pubkey                             |
| proof      | (string) | the proof for the `txid`; can be found using the [gettxoutproof](../komodo-api/blockchain.html#gettxoutproof) method |
| destpub    | (string) | the public key where the tokens should be received on the asset chain                                                |
| amount     | (number) | the amount of the deposit                                                                                            |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysdeposit 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d 1116196 KMD 907812ee8d2762b589f6ca88ee8ba18a65ebf5c7486c472df7395628d22d0d98 0 010000000197d6ea16c68dc5db95b72e029a0e23cb403ae0a33b561b863963cfd9cbfec747000000006b483045022100aca47515602989979b514b6211c375e4d0d9471dd8297c5238c12245ad01dd830220191105caf1b63313c6988194f5f03fd6f70d4a30edc7820add1185d35edff1bb012102924664b536f3710a8e8abea38bb4bf71b470a653a4dceabd50df08d7b2a38436ffffffff0310270000000000001976a9141b355cb6b76cab1b16cb873db8828fe5d2521ae488ac80969800000000001976a914f0d1fc29f8962ac2805a1659192d9ad26794d22988ac38c7fa00000000001976a91482804b943dd6a2008af73f8ba40449c062f0935188ac50e6fd5b 04000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b 02d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d 0.1
```

Response:

```json
{
  "result": "success",
  "hex": "01000000010db4b1686d1f27de5e2a11c793dfd30f09b296754f95ae8649858cca97d5b07a0000000049483045022100ad6bc26f0c66b89f5d63aff251c78965a50201f909a997b8ed6469da0334aa0c0220136d71f5ad1f4496785df81864f9be3ae7b8dd012dae08d59fd544869eacb3ba01ffffffff041027000000000000302ea22c80205fd998129698de9cf1455f4f4795794c9e57bf1fd5f28598b5e6c0322de5d0358103120c008203000401cc1027000000000000232102980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890acd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000fd04096a4d0009f144034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a890121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0012fea85ecfda42975a2aaed72e946792df41a486033af8dc45ab1e4ddcb34b1b424081100980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee12789000000000fd080230313030303030303031393764366561313663363864633564623935623732653032396130653233636234303361653061333362353631623836333936336366643963626665633734373030303030303030366234383330343530323231303061636134373531353630323938393937396235313462363231316333373565346430643934373164643832393763353233386331323234356164303164643833303232303139313130356361663162363333313363363938383139346635663033666436663730643461333065646337383230616464313138356433356564666631626230313231303239323436363462353336663337313061386538616265613338626234626637316234373061363533613464636561626435306466303864376232613338343336666666666666666630333130323730303030303030303030303031393736613931343162333535636236623736636162316231366362383733646238383238666535643235323161653438386163383039363938303030303030303030303139373661393134663064316663323966383936326163323830356131363539313932643961643236373934643232393838616333386337666130303030303030303030313937366139313438323830346239343364643661323030386166373366386261343034343963303632663039333531383861633530653666643562fd360604000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b2102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000"
}
```

Step Two: Broadcast using `sendrawtransction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000010db4b1686d1f27de5e2a11c793dfd30f09b296754f95ae8649858cca97d5b07a0000000049483045022100ad6bc26f0c66b89f5d63aff251c78965a50201f909a997b8ed6469da0334aa0c0220136d71f5ad1f4496785df81864f9be3ae7b8dd012dae08d59fd544869eacb3ba01ffffffff041027000000000000302ea22c80205fd998129698de9cf1455f4f4795794c9e57bf1fd5f28598b5e6c0322de5d0358103120c008203000401cc1027000000000000232102980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890acd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000fd04096a4d0009f144034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a890121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0012fea85ecfda42975a2aaed72e946792df41a486033af8dc45ab1e4ddcb34b1b424081100980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee12789000000000fd080230313030303030303031393764366561313663363864633564623935623732653032396130653233636234303361653061333362353631623836333936336366643963626665633734373030303030303030366234383330343530323231303061636134373531353630323938393937396235313462363231316333373565346430643934373164643832393763353233386331323234356164303164643833303232303139313130356361663162363333313363363938383139346635663033666436663730643461333065646337383230616464313138356433356564666631626230313231303239323436363462353336663337313061386538616265613338626234626637316234373061363533613464636561626435306466303864376232613338343336666666666666666630333130323730303030303030303030303031393736613931343162333535636236623736636162316231366362383733646238383238666535643235323161653438386163383039363938303030303030303030303139373661393134663064316663323966383936326163323830356131363539313932643961643236373934643232393838616333386337666130303030303030303030313937366139313438323830346239343364643661323030386166373366386261343034343963303632663039333531383861633530653666643562fd360604000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b2102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000
```

Response:

(This is the `deposittxid`)

```bash
07d79e39354cc38a76dfe2ca8a5fb711432192237608ea066621662f13e0c08e
```

## gatewaysexternaladdress

**gatewaysexternaladdress bindtxid pubkey**

The `gatewaysexternaladdress` method returns the address on the external chain for the gateways associated with the given `pubkey` and `bindtxid` values.

### Arguments:

| Structure | Type     | Description                                                       |
| --------- | -------- | ----------------------------------------------------------------- |
| bindtxid  | (string) | the `bindtxid` for the associated gateway                         |
| pubkey    | (string) | the `pubkey` needed to generate the address on the external chain |

### Response:

| Structure | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| result    | (string) | whether the command executed successfully |
| address   | (string) | the address for the given pubkey          |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysexternaladdress 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d 02ebb42018347eb3a4da76e85347bb0f042355ff3d16e323b21f8e6cb10098654e
```

Response:

```json
{
  "result": "success",
  "address": "RPq3opCLxV3xgpiM8ewUvyRE5aqovfVeH5"
}
```

## gatewaysdumpprivkey

**gatewaysdumpprivkey bindtxid address**

The `gatewaysdumpprivkey` method returns the private key for the given `address` and `bindtxid`.

The private key is returned in the wif format of the associated external chain.

### Arguments:

| Structure | Type     | Description                                          |
| --------- | -------- | ---------------------------------------------------- |
| bindtxid  | (string) | the `bindtxid` for the associated gateway            |
| address   | (string) | the `address` for which the private key is requested |

### Response:

| Structure | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| result    | (string) | whether the command executed successfully |
| privkey   | (string) | the private key                           |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysdumpprivkey 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d RVHLGTE3aFGwqpUVsoHJiJGs9pmsnd3fNB
```

Response:

```json
{
  "result": "success",
  "privkey": "1pAcQXouEKKjuCpH25AjPoiihGNWB7DGwgfRCRAhJtRVGKvRHrk"
}
```

## gatewaysinfo

**gatewaysinfo bindtxid**

The `gatewaysinfo` method returns information about the `bindtxid` gateway.

### Arguments:

| Structure | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| bindtxid  | (string) | the `bindtxid` for the associated gateway |

### Response:

| Structure   | Type     | Description                                                                                                 |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| result      | (string) | whether the command executed successfully                                                                   |
| name        | (string) | the name of the command                                                                                     |
| pubkey      | (string) | the pubkey that holds the converted proxy tokens                                                            |
| coin        | (string) | the name of the asset that the proxy token represents                                                       |
| oracletxid  | (string) | the `oracletxid` of the associated oracle                                                                   |
| taddr       | (number) | the coin-specific address that customizes the address for the relevant foreign coin         |
| prefix      | (number) | the coin-specific address prefix that customizes the address for the relevant foreign coin  |
| prefix2     | (number) | the coin-specific address prefix that customizes the address for the relevant foreign coin  |
| deposit     | (string) | the t address associated with the gateway pubkey                                                            |
| tokenid     | (string) | the `tokenid` of the proxy token                                                                            |
| totalsupply | (number) | the total available supply of proxy tokens                                                                  |
| remaining   | (number) | the amount of proxy tokens not currently issued                                                             |
| issued      | (number) | the amount of proxy tokens currently issued                                                                 |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysinfo 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d
```

Response:

```json
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

## gatewayslist

**gatewayslist**

The `gatewayslist` method displays a list of `bindtxids` for the available gateways.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| bindtxid  | (string) | the bindtxid of an available gateway |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewayslist
```

Response:

```bash
[
  "4114e3c5dcddc464c5fd94efebf8215322f12226bffc93f84d6d5e0b4ca131a9",
  "aeef4320afe73e1cfe43c4c129b31da018990f49d65b5eeb45cb9a348fdf6ece"
]
```

<!--FIXME new RPC added
gatewaysmarkdone completesigningtx coin
gatewayspartialsign txidaddr refcoin hex
gatewayspendingdeposits bindtxid coin
gatewayspendingwithdraws bindtxid coin
gatewaysprocessed bindtxid coin
-->

## gatewayswithdraw

**gatewayswithdraw bindtxid coin withdrawpub amount**

The `gatewayswithdraw` method sends proxy tokens in the gateways `pubkey`. The gateway then sends the foreign assets to the indicated foreign `withdrawpub` pubkey.

### Arguments:

| Structure   | Type     | Description                                                                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| bindtxid    | (string) | the `bindtxid` of the gateway                                                                                                |
| coin        | (string) | the name of the asset                                                                                                        |
| withdrawpub | (string) | the `pubkey` to which the foreign assets should be sent                                                                      |
| amount      | (number) | the number of proxy tokens to send to the gateway, which will then be exchanged for the relevant amount of the foreign asset |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewayswithdraw 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d KMD 0271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328 0.1
```

Response:

```json
{
  "result": "success",
  "hex": "01000000020e2778e5c0917b00a995ffd0e027ac896492b70b2004ca0096d5309bc1d695ce0000000048473044022072bd3e74c1fb6a56111fc34caab1d605cedfbcb0a9dcd1a4c8d0dae9db61d43902205ccea739077b3374559353af3392e637b7c462ca699f9b9dba786b5398491b4201ffffffff8425c1bf730444ceac45a47376164d66a156e6c2a48116ec14cd17a88f8ab8e5010000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d814051e39b89bace8226f3ca1779b754f2b57ee480e9636b16322bb36a89ec22de967ea66cdc906debb5f6b7c26a51ac2d089966aeb92d07aacc43507b1555c02313a100af038001f1a10001ffffffff058096980000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc102700000000000023210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328ac1027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401ccd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000536a4c50f157bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d44210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328809698000000000000000000"
}
```

Step Two: Broadcast using `sendrawtransction`:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000020e2778e5c0917b00a995ffd0e027ac896492b70b2004ca0096d5309bc1d695ce0000000048473044022072bd3e74c1fb6a56111fc34caab1d605cedfbcb0a9dcd1a4c8d0dae9db61d43902205ccea739077b3374559353af3392e637b7c462ca699f9b9dba786b5398491b4201ffffffff8425c1bf730444ceac45a47376164d66a156e6c2a48116ec14cd17a88f8ab8e5010000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d814051e39b89bace8226f3ca1779b754f2b57ee480e9636b16322bb36a89ec22de967ea66cdc906debb5f6b7c26a51ac2d089966aeb92d07aacc43507b1555c02313a100af038001f1a10001ffffffff058096980000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc102700000000000023210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328ac1027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401ccd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000536a4c50f157bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d44210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328809698000000000000000000
```

Response:

```bash
79d41ffefa359a7ae2f62adf728a3ec3f3d2653889780ed9776bf9b74fe9a6fe
```
