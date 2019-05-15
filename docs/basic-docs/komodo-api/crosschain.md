---
sidebarDepth: 3
---

# Crosschain (Migration) API

## Introduction

Crosschain (Migration) API allows a user to transfer value in the form of either coins or tokens between chains (or in the same chain).

The fundamental principle of migration is that some amount of coins or tokens is burned in the source chain and then exactly the same amount is created in the destination chain.

### Different ways of value migration using the Komodo platform

- MoMoM notarised migration
  - `MoMoM : Merkle root of Merkle roots of Merkle roots`
- An alternative migration method with notarisation of the given burn transaction by notary operators (A backup solution to the above MoMoM method)
- Selfimport

### The migration process

1. Make an `export/burn` transaction in the source chain.
1. Make an import transaction for the burned value, which is created in the source chain but is sent to the destination chain.
1. Komodo's validation code checks that for the import transaction there exists a corresponding burn transaction and that it is not spent more than once.

:::tip Note

- The following migration RPC calls interact with the `komodod` daemon, and are made available through the `komodo-cli`.
- In the examples, we use 2 chains: CFEKHOUND(source) and CFEKDRAGON(destination) that have been launched with the same `-ac_cc` parameter (> 100)

:::

#### Requirement

The source and destination chains should have the same `CCid` parameter ([-ac_cc](../installations/asset-chain-parameters.html#ac-cc)) and it should be greater than 100 (which means that the chains are fungible).

## MoMoM notarised migration

- The MoMoM notarised migration API allows the migration of coin or token value using Komodo's notary network, which allows the secure existence of highly scalable multichain architectures.
- Notary nodes store fingeprints (refered to as `MoM`, 'merkle root of merkle roots') of the blocks belonging to the blockchains of the various assets in the main Komodo (KMD) chain.
- After that, the fingerprints of fingerprints (refered to as `MoMoM`, 'merkle root of merkle roots of merkle roots') are delivered back into the blockchain of the assets (as back notarisations). More about the notarisation process is in this [article.](https://komodoplatform.com/komodo-platforms-new-scalability-tech/)

### Workflow of the MoMoM value migration

- On the source chain, the user calls the method [migrate_createburntransaction](./crosschain.html#migrate-createburntransaction) and broadcasts the hex of burn transaction (`BurnTxHex`) that is output using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) call.
- After that, on the source chain, the user runs [migrate_createimporttransaction](./crosschain.html#migrate-createimporttransaction) with `hex of the burn transaction` and `payouts object in hex format` (which the user received as output from the previous call) as arguments.
- On the main Komodo (KMD) chain the user calls [migrate_completeimporttransaction](./crosschain.html#migrate-completeimporttransaction) with the import transaction in hex format which was received from the previous call as an argument.
- At this stage the proof object for the burn transaction inside the import transaction is extended with MoMoM data. This allows verification of the burn transaction on the destination chain by using the standard Komodo notarisation process without the need to create additional proof objects.

### migrate_createburntransaction

**migrate_createburntransaction destChain destAddress amount [tokenid]**

- The `migrate_createburntransaction` method creates a transaction burning some amount of coins or tokens. This method also creates a `payouts object` which is later used for creating an import transaction for the value corresponding to the burned amount. This method should be called on the source chain.
- The method creates a burn transaction and returns it. It should be broadcasted to the source chain using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.
  After the burn transaction is successfully mined, it might be necessary to wait for some amount of time for the back notarisation with the "MoMoM fingerprints of the mined block with the burn transaction" to reach the source chain.
- The hex value of the burn transaction along with the other returned value `payouts` are used as arguments to the next method `migrate_createimporttransaction`.

#### Arguments

| Name          | Type                | Description                                                                                                                                                                                                                          |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "destChain"   | (string, required)  | the name of the destination chain                                                                                                                                                                                                    |
| "destAddress" | (string, required)  | the address on the destination chain where coins are to be sent; the pubkey if tokens are to be sent                                                                                                                                 |
| "amount"      | (numeric, required) | the amount in coins or tokens that should be burned on the source chain and created on the destination chain; If it is tokens, the amount can be set only to 1 (as only migration of non-fungible tokens are supported at this time) |
| "tokenid"     | (string, optional)  | token id in hex; if set, it is considered that tokens are to be migrated                                                                                                                                                             |

#### Response

| Name        | Type     | Description                                                                                              |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------- |
| "payouts"   | (string) | a hex string of the created payouts (to be passed into migrate_createimporttransaction rpc method later) |
| "BurnTxHex" | (string) | a hex string of the returned burn transaction                                                            |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=CFEKHOUND migrate_createburntransaction CFEKDRAGON RBQ1XwmzduHvciRJbXbWY9YBSNtaqZvfC4 7.77
```

<collapse-text hidden title="Response">

```json
{
  "payouts": "014014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac",
  "BurnTxHex": "0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c00000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "migrate_createburntransaction", "params": ["CFEKDRAGON","RBQ1XwmzduHvciRJbXbWY9YBSNtaqZvfC4","7.77"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "payouts": "014014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac",
    "BurnTxHex": "0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c00000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Broadcast the transaction:

```bash
./komodo-cli -ac_name=CFEKHOUND sendrawtransaction 0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c00000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610
```

</collapse-text>

### migrate_converttoexport

**migrate_converttoexport rawtx dest_symbol**

- The method `migrate_converttoexport` provides an alternative method to the user if they desire to create a customized burn transaction. It converts a given transaction to a burn transaction.
- It adds proof data to the transaction, extracts the transaction vouts, calculates their vaules and burns the value by sending it to an `OP_RETURN` vout which is added to the created transaction.
- The other returned value - `payouts` is used in the next method that must be executed: `migrate_createimporttransaction`.
- It is the responsibility of the caller to fund and sign the returned burn transaction using the methods [fundrawtransaction](../komodo-api/rawtransactions.html#fundrawtransaction) and [signrawtransaction](../komodo-api/rawtransactions.html#signrawtransaction).
- The signed burn transaction must be broadcasted to the <!-- FIXME destination chain ? --> source chain using the [sendrawtansaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

::: warning Limitations

- The method `migrate_converttoexport` supports only coins (tokens are not supported).
- The burn transaction has to be stored in the import transaction's `OP_RETURN` vout. As its size is limited to `10,001` bytes, it is recommended to limit the burn transaction's size to 30% of the `OP_RETURN` object.

:::

#### Arguments

| Name        | Type               | Description                        |
| ----------- | ------------------ | ---------------------------------- |
| "burntx"    | (string, required) | the burn transaction in hex format |
| "destChain" | (string, required) | the name of the destination chain  |

#### Response

| Name       | Type     | Description                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| "payouts"  | (string) | a hex string of the created payouts (to be passed into `migrate_createimporttransaction` rpc method later) |
| "exportTx" | (string) | a hex string of the returned burn transaction                                                              |

#### :pushpin: Examples

Create a raw transaction:

```bash
./komodo-cli -ac_name=CFEKHOUND createrawtransaction '[{"txid":"ad930d24e0d1c060d7acf46170e31b6863cb429969449d81babd7a644745bfff","vout":6}]' '{"RBQ1XwmzduHvciRJbXbWY9YBSNtaqZvfC4":0.077}'
```

<collapse-text hidden title="Response">

```bash
0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000000ffffffff01207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac00000000f36f00000000000000000000000000
```

</collapse-text>

Convert it to an export transaction:

```bash
./komodo-cli -ac_name=CFEKHOUND migrate_converttoexport 0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000000ffffffff01207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac00000000f36f00000000000000000000000000 CFEKDRAGON
```

<collapse-text hidden title="Response">

```json
{
  "payouts": "01207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac",
  "exportTx": "0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000000ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f00000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "migrate_converttoexport", "params": ["0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000000ffffffff01207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac00000000f36f00000000000000000000000000","CFEKDRAGON"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "payouts": "01207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac",
    "exportTx": "0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000000ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f00000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Sign the export transaction:

```bash
./komodo-cli -ac_name=CFEKHOUND signrawtransaction 0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000000ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f00000000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000049483045022100f609176d691bade4060799424d7d3813ea3337ad8aabc79bb6fd51797b6ec9c80220073d1ba3a74da7e33bcccf5851c2152d66fcd7aa0d2c1521ec8b2ab444d656f801ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f00000000000000000000000000",
  "complete": true
}
```

</collapse-text>

Broadcast the export transaction (using the method [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction), with the option `allowhighfees` set to `true`)

```bash
./komodo-cli -ac_name=CFEKHOUND sendrawtransaction 0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000049483045022100f609176d691bade4060799424d7d3813ea3337ad8aabc79bb6fd51797b6ec9c80220073d1ba3a74da7e33bcccf5851c2152d66fcd7aa0d2c1521ec8b2ab444d656f801ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f00000000000000000000000000 true
```

<collapse-text hidden title="Response">

```bash
ade1c02370f47004ad7c323fa1e456171fb3e508d7dff473a5b7fa1214480adb
```

</collapse-text>

To see the rest of the process when `migrate_converttoexport` is used, click the following button:

<collapse-text hidden title="rest of the Steps">

Create the import transaction using the signed export transaction that has been created:

```bash
./komodo-cli -ac_name=CFEKHOUND migrate_createimporttransaction 0400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000049483045022100f609176d691bade4060799424d7d3813ea3337ad8aabc79bb6fd51797b6ec9c80220073d1ba3a74da7e33bcccf5851c2152d66fcd7aa0d2c1521ec8b2ab444d656f801ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f00000000000000000000000000 01207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac
```

Response:

```json
{
  "ImportTxHex": "0400008085202f8901db0a481412fab7a573f4dfd708e5b31f1756e4a13f327cad0470f47023c0e1ad00ca9a3b0201e2ffffffff02207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fd9b016a4d9701e211faf6efe321866a1f23d337190f69d97700ba3ec5e62bd325eb10de76d4edb073030597d5b415e109dbadb1ec193255d6a22478d1a73ddbb49dd26d9419e8929a7608b7a9d42bf456c04852b93e1d50bee26870c13f90e12471b8b2c08ce9ae51c50d6fb355134e33e4c702181ad87a0f0bfec1861732f5c8b04eb9e64d2aaecf0274ef693f365305e5be0a98cc7c892b4d4c0fa75c952e0955fcb1fb0c2c4d3ad346813d801c8749e5a2b3834cbb874f11d8619523553fd21c9b07395f5679d1ad340400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000049483045022100f609176d691bade4060799424d7d3813ea3337ad8aabc79bb6fd51797b6ec9c80220073d1ba3a74da7e33bcccf5851c2152d66fcd7aa0d2c1521ec8b2ab444d656f801ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f0000000000000000000000000000000000000000000000000000000000000000"
}
```

Complete the import transaction by executing the `migrate_completeimporttransaction` method on the KMD chain:

```bash
./komodo-cli migrate_completeimporttransaction 0400008085202f8901db0a481412fab7a573f4dfd708e5b31f1756e4a13f327cad0470f47023c0e1ad00ca9a3b0201e2ffffffff02207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fd9b016a4d9701e211faf6efe321866a1f23d337190f69d97700ba3ec5e62bd325eb10de76d4edb073030597d5b415e109dbadb1ec193255d6a22478d1a73ddbb49dd26d9419e8929a7608b7a9d42bf456c04852b93e1d50bee26870c13f90e12471b8b2c08ce9ae51c50d6fb355134e33e4c702181ad87a0f0bfec1861732f5c8b04eb9e64d2aaecf0274ef693f365305e5be0a98cc7c892b4d4c0fa75c952e0955fcb1fb0c2c4d3ad346813d801c8749e5a2b3834cbb874f11d8619523553fd21c9b07395f5679d1ad340400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000049483045022100f609176d691bade4060799424d7d3813ea3337ad8aabc79bb6fd51797b6ec9c80220073d1ba3a74da7e33bcccf5851c2152d66fcd7aa0d2c1521ec8b2ab444d656f801ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f0000000000000000000000000000000000000000000000000000000000000000
```

Response:

```json
{
  "ImportTxHex": "0400008085202f8901db0a481412fab7a573f4dfd708e5b31f1756e4a13f327cad0470f47023c0e1ad00ca9a3b0201e2ffffffff02207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fd1b026a4d1702e211e48af72fc33ac62659441e7ab56499ea8afd5a258299bed66982c45fc5d9683a230997d5b415e109dbadb1ec193255d6a22478d1a73ddbb49dd26d9419e8929a7608b7a9d42bf456c04852b93e1d50bee26870c13f90e12471b8b2c08ce9ae51c50d6fb355134e33e4c702181ad87a0f0bfec1861732f5c8b04eb9e64d2aaecf0274ef693f365305e5be0a98cc7c892b4d4c0fa75c952e0955fcb1fb0c2c4d3ad346813d801c8749e5a2b3834cbb874f11d8619523553fd21c9b07395f5679d1ad34063e78002b6855b2a948d95d576fffcd9933550d8b91a35f16c39313347e78906bdca88c092c043f25170cf027411f918e234623a395de76ebe854e57c06c6f3e12befa6a56885f7fe3da8523e184cb93b394510246de78a750858c37cb5342bf12de3742ebc2905c5ce4df63ebdb2a9d937933e0d13be142c2faa8055f0f7d90400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000049483045022100f609176d691bade4060799424d7d3813ea3337ad8aabc79bb6fd51797b6ec9c80220073d1ba3a74da7e33bcccf5851c2152d66fcd7aa0d2c1521ec8b2ab444d656f801ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f0000000000000000000000000000000000000000000000000000000000000000"
}
```

Broadcast this transaction on the destination chain:

```bash
./komodo-cli -ac_name=CFEKDRAGON sendrawtransaction 0400008085202f8901db0a481412fab7a573f4dfd708e5b31f1756e4a13f327cad0470f47023c0e1ad00ca9a3b0201e2ffffffff02207e7500000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fd1b026a4d1702e211e48af72fc33ac62659441e7ab56499ea8afd5a258299bed66982c45fc5d9683a230997d5b415e109dbadb1ec193255d6a22478d1a73ddbb49dd26d9419e8929a7608b7a9d42bf456c04852b93e1d50bee26870c13f90e12471b8b2c08ce9ae51c50d6fb355134e33e4c702181ad87a0f0bfec1861732f5c8b04eb9e64d2aaecf0274ef693f365305e5be0a98cc7c892b4d4c0fa75c952e0955fcb1fb0c2c4d3ad346813d801c8749e5a2b3834cbb874f11d8619523553fd21c9b07395f5679d1ad34063e78002b6855b2a948d95d576fffcd9933550d8b91a35f16c39313347e78906bdca88c092c043f25170cf027411f918e234623a395de76ebe854e57c06c6f3e12befa6a56885f7fe3da8523e184cb93b394510246de78a750858c37cb5342bf12de3742ebc2905c5ce4df63ebdb2a9d937933e0d13be142c2faa8055f0f7d90400008085202f8901ffbf4547647abdba819d44699942cb63681be37061f4acd760c0d1e0240d93ad0600000049483045022100f609176d691bade4060799424d7d3813ea3337ad8aabc79bb6fd51797b6ec9c80220073d1ba3a74da7e33bcccf5851c2152d66fcd7aa0d2c1521ec8b2ab444d656f801ffffffff0130a57500000000003b6a39e283150a4346454b445241474f4efa2fe05c5d6cb0bf5a9be2aec4f1cd7a10c9472d6abc1e9bb9dc5903a4ec1a5b0a094346454b484f554e4400000000f36f0000000000000000000000000000000000000000000000000000000000000000
```

Response:

```bash
f8285da90da40f929598652cd90e6dd9968d91b1f69bdba79c46890bfd210d63
```

</collapse-text>

### migrate_createimporttransaction

**migrate_createimporttransaction burntx payouts [notaryTxid1]...[notaryTxidN]**

- The `migrate_createimporttransaction` method performs the initial step in creating an import transaction. This method should be called on the source chain.
- This method returns a created import transaction in hex format. This string should be passed to the `migrate_completeimporttransaction` method on the main KMD chain to be extended with the `MoMoM` proof object.
- When using the MoMoM backup solution (described later), the created import transaction is not passed to the `migrate_completeimporttransaction` method.
- In case of errors, it might be necessary to wait for some time before the back notarisations objects are stored in the destination chain.

#### Arguments

| Name          | Type               | Description                                                                                                    |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| "burntx"      | (string, required) | the burn transaction in hex format returned from the previous method                                           |
| "payouts"     | (string, required) | the payouts object in hex format returned from the previous method and used for creating an import transaction |
| "notaryTxid1" | (string, optional) | the notary approval transaction id 1, to be passed if the `MoMoM` backup solution is used for notarisation     |
| "notaryTxidN" | (string, optional) | the notary approval transaction id N, to be passed if the `MoMoM` backup solution is used for notarisation     |

#### Response

| Name          | Type     | Description                                  |
| ------------- | -------- | -------------------------------------------- |
| "ImportTxHex" | (string) | the created import transaction in hex format |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=CFEKHOUND migrate_createimporttransaction 0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c00000000000000000000000000 014014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac
```

<collapse-text hidden title="Response">

```json
{
  "ImportTxHex": "0400008085202f89011016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd100ca9a3b0201e2ffffffff024014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fdc9016a4dc501e211da14c5a904dcf9dcc5c4471bae0f3e90274bc782fcaf7a828c23190dbbd3392205042cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadf0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c0000000000000000000000000000000000000000000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "migrate_createimporttransaction", "params": ["0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c00000000000000000000000000","014014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "ImportTxHex": "0400008085202f89011016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd100ca9a3b0201e2ffffffff024014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fdc9016a4dc501e211da14c5a904dcf9dcc5c4471bae0f3e90274bc782fcaf7a828c23190dbbd3392205042cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadf0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c0000000000000000000000000000000000000000000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

### migrate_completeimporttransaction

**migrate_completeimporttransaction importtx**

- The `migrate_completeimporttransaction` method performs the finalizing step in creating an import transaction. This method should be called on the KMD (Komodo) chain.
- This method returns the import transaction in hex format, updated with the `MoMoM` proof object which would confirm that the burn transaction exists in the source chain.
- This finalized import transaction should be broadcasted on the destination chain through the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.
- It is recommended to wait till the notarisations objects are stored in the destination chain to broadcast the import transaction. Otherwise an error message is returned.
- In case of errors, it might be necessary to wait for some time before the notarisations objects are stored in the KMD chain.

#### Arguments

| Name       | Type               | Description                                                                                                    |
| ---------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| "importtx" | (string, required) | the import transaction in hex format created using the previous method                                         |
| "offset"   | (string, optional) | the number of blocks below the current KMD(Komodo) blockchain height in which a `MoMoM` proof must be searched |

#### Response

| Name          | Type     | Description                                                        |
| ------------- | -------- | ------------------------------------------------------------------ |
| "ImportTxHex" | (string) | import transaction in hex extended with MoMoM proof of the burn tx |

#### :pushpin: Examples

Command:

```bash
./komodo-cli migrate_completeimporttransaction 0400008085202f89011016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd100ca9a3b0201e2ffffffff024014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fdc9016a4dc501e211da14c5a904dcf9dcc5c4471bae0f3e90274bc782fcaf7a828c23190dbbd3392205042cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadf0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c0000000000000000000000000000000000000000000000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "ImportTxHex": "0400008085202f89011016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd100ca9a3b0201e2ffffffff024014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fd49026a4d4502e211a2f7550475bf21bac89b760b8c1e6a114d77c22de1584f3d65a09b98fe73360945082cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadfdfaa753cfdd54be8cc63b15bc2544964c03c43e0645a1ea9302522a1c9daf4c19dd9ff959973a556e4761ae171363572f782f5660a89acde315cd811a1b42140fa6d1de2ced3e371e4f8e4bca493a23d6121a608ccc0d66eb45b3ccce9518612bef75468f0fe5310972c8059e9aabf86b59a824bf5e2ac6f6b6eeb7dc171ebcb0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c0000000000000000000000000000000000000000000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "migrate_completeimporttransaction", "params": ["0400008085202f89011016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd100ca9a3b0201e2ffffffff024014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fd49026a4d4502e211a2f7550475bf21bac89b760b8c1e6a114d77c22de1584f3d65a09b98fe73360945082cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadfdfaa753cfdd54be8cc63b15bc2544964c03c43e0645a1ea9302522a1c9daf4c19dd9ff959973a556e4761ae171363572f782f5660a89acde315cd811a1b42140fa6d1de2ced3e371e4f8e4bca493a23d6121a608ccc0d66eb45b3ccce9518612bef75468f0fe5310972c8059e9aabf86b59a824bf5e2ac6f6b6eeb7dc171ebcb0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c0000000000000000000000000000000000000000000000000000000000000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "ImportTxHex": "0400008085202f89011016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd100ca9a3b0201e2ffffffff024014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fd49026a4d4502e211a2f7550475bf21bac89b760b8c1e6a114d77c22de1584f3d65a09b98fe73360945082cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadfdfaa753cfdd54be8cc63b15bc2544964c03c43e0645a1ea9302522a1c9daf4c19dd9ff959973a556e4761ae171363572f782f5660a89acde315cd811a1b42140fa6d1de2ced3e371e4f8e4bca493a23d6121a608ccc0d66eb45b3ccce9518612bef75468f0fe5310972c8059e9aabf86b59a824bf5e2ac6f6b6eeb7dc171ebcb0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c0000000000000000000000000000000000000000000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Broadcast the transaction:

```bash
./komodo-cli CFEKDRAGON sendrawtransaction 0400008085202f89011016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd100ca9a3b0201e2ffffffff024014502e000000001976a914173a5c80d8956eed4f1b2d46e3855fc97b3b64cf88ac0000000000000000fd49026a4d4502e211a2f7550475bf21bac89b760b8c1e6a114d77c22de1584f3d65a09b98fe73360945082cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadfdfaa753cfdd54be8cc63b15bc2544964c03c43e0645a1ea9302522a1c9daf4c19dd9ff959973a556e4761ae171363572f782f5660a89acde315cd811a1b42140fa6d1de2ced3e371e4f8e4bca493a23d6121a608ccc0d66eb45b3ccce9518612bef75468f0fe5310972c8059e9aabf86b59a824bf5e2ac6f6b6eeb7dc171ebcb0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c0000000000000000000000000000000000000000000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
b2ed563617771d4a919fb13906e93c8ec485bed145a3f380583796663e285e0d
```

</collapse-text>

## Notarisation backup solution

There is an alternative solution for notarising burn transactions by the notary operators in case of MoMoM notarisation failing or being slow.

For this to work, the notary operators pick burn transactions sent to a special publishing resource, check them and return the ids of the transactions with the burn transaction proof objects which are created in destination chains.

### The Workflow

- A user creates a burn transaction with the above described [migrate_createburntransaction](./crosschain.html#migrate-createburntransaction) method and publishes it in hex format to a publishing resource which is monitored by the notary operators (currently the discord channel: [#cc-momom](https://discord.gg/JE9tkmN))
- The notary operators must pick a burn transaction and check its validity and existence in the source chain using the method `migrate_checkburntransactionsource`. If the burn transaction is successfully validated, the notary operators must create approval transactions in the destination chain and publish their transaction ids back into the publishing resource.
- The user collects the transaction ids and calls the method [migrate_createimporttransaction](./crosschain.html#migrate-createimporttransaction), passing the collected notary approval transaction ids as arguments. Currently it is enough to have at least 5 successful notary approval transactions for an import transaction to be considered as valid in the destination chain.

### migrate_checkburntransactionsource

**migrate_checkburntransactionsource burntxid**

The `migrate_checkburntransactionsource` method allows a notary operator to check the burn transaction's structure and verify its presence in the source chain.

#### Arguments

| Name       | Type               | Description               |
| ---------- | ------------------ | ------------------------- |
| "burntxid" | (string, required) | the burn transaction's id |

#### Response

| Name           | Type               | Description                                                       |
| -------------- | ------------------ | ----------------------------------------------------------------- |
| "sourceSymbol" | (string)           | the source chain's name                                           |
| "targetSymbol" | (string)           | the target chain's name                                           |
| "targetCCid"   | (number)           | the target chain's `CCid`                                         |
| "tokenid"      | (string, optional) | the token id if a token is to be migrated                         |
| "TxOutProof"   | (string)           | the proof of the burn transaction's existence in the source chain |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=CFEKHOUND migrate_checkburntransactionsource d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610
```

<collapse-text hidden title="Response">

```json
{
  "SourceSymbol": "CFEKHOUND",
  "TargetSymbol": "CFEKDRAGON",
  "TargetCCid": "533",
  "TxOutProof": "040000009c6c2e1c0607ea57d44d6d0518cebc341a76e8f294ad6d2844d84f09983b35013bfacfeb3d1a412c1261f59f122fae6ae3d657d3a1871902282519a0b0d08045fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493ec64bd45c8fab0220360057fb64b4378bb1a33d9dcf9acf6e5b7c42f6a08db8eb87bfaad001910000143427efb28257954cb4e6596f4e06bdcad43cb9a402000000022cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b61016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd10105",
  "result": "success"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "migrate_checkburntransactionsource", "params": ["d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "SourceSymbol": "CFEKHOUND",
    "TargetSymbol": "CFEKDRAGON",
    "TargetCCid": "533",
    "TxOutProof": "040000009c6c2e1c0607ea57d44d6d0518cebc341a76e8f294ad6d2844d84f09983b35013bfacfeb3d1a412c1261f59f122fae6ae3d657d3a1871902282519a0b0d08045fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493ec64bd45c8fab0220360057fb64b4378bb1a33d9dcf9acf6e5b7c42f6a08db8eb87bfaad001910000143427efb28257954cb4e6596f4e06bdcad43cb9a402000000022cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b61016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd10105",
    "result": "success"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

### migrate_createnotaryapprovaltransaction

**migrate_createnotaryapprovaltransaction burntxid txoutproof**

- A notary operator uses the `migrate_createnotaryapprovaltransaction` method to create an approval transaction in the destination chain with the proof of the burn transaction's existence in the source chain.
- The returned notary approval transaction should be broadcasted to the destination chain using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

#### Arguments

| Name         | Type               | Description                                   |
| ------------ | ------------------ | --------------------------------------------- |
| "burntxid"   | (string, required) | the burn transaction's id                     |
| "txoutproof" | (string, required) | the proof of the burn transaction's existence |

#### Response

| Name          | Type     | Description                               |
| ------------- | -------- | ----------------------------------------- |
| "NotaryTxHex" | (string) | notary approval transaction in hex format |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=CFEKHOUND migrate_createnotaryapprovaltransaction d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610 040000009c6c2e1c0607ea57d44d6d0518cebc341a76e8f294ad6d2844d84f09983b35013bfacfeb3d1a412c1261f59f122fae6ae3d657d3a1871902282519a0b0d08045fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493ec64bd45c8fab0220360057fb64b4378bb1a33d9dcf9acf6e5b7c42f6a08db8eb87bfaad001910000143427efb28257954cb4e6596f4e06bdcad43cb9a402000000022cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b61016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd10105
```

<collapse-text hidden title="Response">

```json
{
  "NotaryTxHex": "0400008085202f890101627137f51e780237504126737cc1b3af7ccb4069ce10436fc541cfd527ff56060000004847304402202014638b902dab110afe48ee72890ab08ba7c9818b54e7ff521a5079dccccfad022061b6f790ba0508b57d5d189cea8fba90ed601cfcfbb0fed6b7e4b21c37ec851601ffffffff031027000000000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac0a02fe0000000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac0000000000000000ec6a4ce9e8040000009c6c2e1c0607ea57d44d6d0518cebc341a76e8f294ad6d2844d84f09983b35013bfacfeb3d1a412c1261f59f122fae6ae3d657d3a1871902282519a0b0d08045fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493ec64bd45c8fab0220360057fb64b4378bb1a33d9dcf9acf6e5b7c42f6a08db8eb87bfaad001910000143427efb28257954cb4e6596f4e06bdcad43cb9a402000000022cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b61016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd1010500000000d26f00000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "migrate_createnotaryapprovaltransaction", "params": ["d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610","040000009c6c2e1c0607ea57d44d6d0518cebc341a76e8f294ad6d2844d84f09983b35013bfacfeb3d1a412c1261f59f122fae6ae3d657d3a1871902282519a0b0d08045fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493ec64bd45c8fab0220360057fb64b4378bb1a33d9dcf9acf6e5b7c42f6a08db8eb87bfaad001910000143427efb28257954cb4e6596f4e06bdcad43cb9a402000000022cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b61016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd10105"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "NotaryTxHex": "0400008085202f890101627137f51e780237504126737cc1b3af7ccb4069ce10436fc541cfd527ff560600000048473044022072aa2c271ec12a82df9f9667161b117da0814400f08f26950bae4ac762ea712302205350ac5faf430398e01dff7d6cb608e6b5eee580a2a85d70566096897fb052b601ffffffff031027000000000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac0a02fe0000000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac0000000000000000ec6a4ce9e8040000009c6c2e1c0607ea57d44d6d0518cebc341a76e8f294ad6d2844d84f09983b35013bfacfeb3d1a412c1261f59f122fae6ae3d657d3a1871902282519a0b0d08045fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493ec64bd45c8fab0220360057fb64b4378bb1a33d9dcf9acf6e5b7c42f6a08db8eb87bfaad001910000143427efb28257954cb4e6596f4e06bdcad43cb9a402000000022cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b61016cf36b2605abe44354cd328d8cba6638c6cc53808d4e16609637e3f1c9fd1010500000000d56f00000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## Self import API

The Self import API is a special api available only in chains that need a pubkey to create new coins arbitrarily.

### selfimport

**selfimport destAddress amount**

The Self import API allows a trusted pubkey to create more coins on the same chain.

**Requirements:** The chain must have the custom parameters `-ac_import=PUBKEY` and `-ac_pubkey` set to a pubkey which is allowed to create coins.

- For creating more coins in the chain with `-ac_import=PUBKEY` enabled, the method `selfimport` can be used.
- The method returns a source transaction that contains a parameter with the amount of coins to create and is a proof of the trusted pubkey owner's intention to create new coins in the chain.
- The returned source transaction should be broadcasted to the chain using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method. The source transaction spends a `txfee=10000 satoshis` from the `-ac_pubkey` owner's UXTOs.
- Later, after the source transaction is mined, the import transaction should also be broadcasted to the chain with the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method. After it is mined, its vout would contain the amount of created coins in the chosen destination address.

#### Arguments

| Name          | Type               | Description                                        |
| ------------- | ------------------ | -------------------------------------------------- |
| "destAddress" | (string, required) | the address where the created coins should be sent |
| "amount"      | (number, required) | the amount in coins to create                      |

#### Response

| Name          | Type     | Description                          |
| ------------- | -------- | ------------------------------------ |
| "SourceTxHex" | (string) | the source transaction in hex format |
| "ImportTxHex" | (string) | the import transaction in hex format |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=IMPORTTEST selfimport RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3 100000
```

<collapse-text hidden title="Response">

```json
{
  "SourceTxHex": "0400008085202f8901011063706ccf8ccb228566bf94ff2c34e544a3d856b7f061d7d881789dd89d130000000049483045022100efc45823b3e190cd6fab3192d2f1c7ce2945396868f786c0c1f3fca6d4d54378022011d19799fb30e089cc16c38557da301aeb707e289ca911e1c99e6fcc603ba01e01ffffffff0310270000000000001976a914823a9534f765ff5f56d1d5bddc029087972f321c88ace092f5050000000023210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634ac00000000000000000c6a0ae24100a0724e18090000000000008f0100000000000000000000000000",
  "ImportTxHex": "0400008085202f89012764621f3e61d2b47b9f0595639db26b0455d5ac17f73676115e8967640a422400ca9a3b0201e2ffffffff0200a0724e180900001976a914823a9534f765ff5f56d1d5bddc029087972f321c88ac0000000000000000f16a4ceee211d51ab2be8a8c1439438b64a048ae4df3282234787d9c11574971f9429372dde089af17000400008085202f8901011063706ccf8ccb228566bf94ff2c34e544a3d856b7f061d7d881789dd89d130000000049483045022100efc45823b3e190cd6fab3192d2f1c7ce2945396868f786c0c1f3fca6d4d54378022011d19799fb30e089cc16c38557da301aeb707e289ca911e1c99e6fcc603ba01e01ffffffff0100a0724e18090000306a2ee28efefefe7f065055424b4559dded40d8b8826ad32af955a9ce0c2ebc0cd60d9978a1936d425b8f7bdc1c756700000000008f010000000000000000000000000000000000000000000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "selfimport", "params": ["RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3","100000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "SourceTxHex": "0400008085202f8901011063706ccf8ccb228566bf94ff2c34e544a3d856b7f061d7d881789dd89d130000000049483045022100efc45823b3e190cd6fab3192d2f1c7ce2945396868f786c0c1f3fca6d4d54378022011d19799fb30e089cc16c38557da301aeb707e289ca911e1c99e6fcc603ba01e01ffffffff0310270000000000001976a914823a9534f765ff5f56d1d5bddc029087972f321c88ace092f5050000000023210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634ac00000000000000000c6a0ae24100a0724e18090000000000008f0100000000000000000000000000",
    "ImportTxHex": "0400008085202f89012764621f3e61d2b47b9f0595639db26b0455d5ac17f73676115e8967640a422400ca9a3b0201e2ffffffff0200a0724e180900001976a914823a9534f765ff5f56d1d5bddc029087972f321c88ac0000000000000000f16a4ceee211d51ab2be8a8c1439438b64a048ae4df3282234787d9c11574971f9429372dde089af17000400008085202f8901011063706ccf8ccb228566bf94ff2c34e544a3d856b7f061d7d881789dd89d130000000049483045022100efc45823b3e190cd6fab3192d2f1c7ce2945396868f786c0c1f3fca6d4d54378022011d19799fb30e089cc16c38557da301aeb707e289ca911e1c99e6fcc603ba01e01ffffffff0100a0724e18090000306a2ee28efefefe7f065055424b4559dded40d8b8826ad32af955a9ce0c2ebc0cd60d9978a1936d425b8f7bdc1c756700000000008f010000000000000000000000000000000000000000000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

To see the rest of the process when migrate_converttoexport is used, click the following button:

<collapse-text hidden title="the whole process">

##### Node1

Start a chain with the parameters `-ac_import=PUBKEY` and `-ac_pubkey=<pubkey>` (`<pubkey>` is the pubkey that can create coins at will ):

```bash
./komodod -ac_name=IMPORTTEST -ac_import=PUBKEY -ac_pubkey=0257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634 -ac_supply=777777 -ac_reward=100000000 -pubkey=0257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634
```

Import the privkey corresponding to the pubkey used when starting the chain:

```bash
./komodo-cli -ac_name=IMPORTTEST importprivkey xxxxx
```

##### Node2

Connect to the chain created in Node1:

```bash
./komodod -ac_name=IMPORTTEST -ac_import=PUBKEY -ac_pubkey=0257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634 -ac_supply=777777 -ac_reward=100000000 -addnode=<ip address of Node1>
```

Notice that there is only `-ac_pubkey` in the above command but not `pubkey`. That's because, `-ac_pubkey` is part of the chain parameters and `-pubkey` is just [indicating the pubkey](../customconsensus/custom-consensus-instructions.html#creating-and-launching-with-a-pubkey) to the particular daemon for various features.

Verify that `connections:1` from the [getinfo](../komodo-api/control.html#getinfo) method

##### Node1

Start mining in Node1:

```bash
./komodo-cli -ac_name=IMPORTTEST setgenerate true 1
```

Verify that the balance increased by atleast the amount specified in `-ac_supply` through the method [getbalance](../komodo-api/control.html#getbalances)

Use the method `selfimport` to receive the `SourceTxHex` and the `ImportTxHex`

```bash
./komodo-cli -ac_name=IMPORTTEST selfimport RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3 100000
```

```json
{
  "SourceTxHex": "0400008085202f8901011063706ccf8ccb228566bf94ff2c34e544a3d856b7f061d7d881789dd89d130000000049483045022100efc45823b3e190cd6fab3192d2f1c7ce2945396868f786c0c1f3fca6d4d54378022011d19799fb30e089cc16c38557da301aeb707e289ca911e1c99e6fcc603ba01e01ffffffff0310270000000000001976a914823a9534f765ff5f56d1d5bddc029087972f321c88ace092f5050000000023210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634ac00000000000000000c6a0ae24100a0724e18090000000000008f0100000000000000000000000000",
  "ImportTxHex": "0400008085202f89012764621f3e61d2b47b9f0595639db26b0455d5ac17f73676115e8967640a422400ca9a3b0201e2ffffffff0200a0724e180900001976a914823a9534f765ff5f56d1d5bddc029087972f321c88ac0000000000000000f16a4ceee211d51ab2be8a8c1439438b64a048ae4df3282234787d9c11574971f9429372dde089af17000400008085202f8901011063706ccf8ccb228566bf94ff2c34e544a3d856b7f061d7d881789dd89d130000000049483045022100efc45823b3e190cd6fab3192d2f1c7ce2945396868f786c0c1f3fca6d4d54378022011d19799fb30e089cc16c38557da301aeb707e289ca911e1c99e6fcc603ba01e01ffffffff0100a0724e18090000306a2ee28efefefe7f065055424b4559dded40d8b8826ad32af955a9ce0c2ebc0cd60d9978a1936d425b8f7bdc1c756700000000008f010000000000000000000000000000000000000000000000000000000000000000"
}
```

Broadcast the `SourceTxHex`:

```bash
./komodo-cli -ac_name=IMPORTTEST sendrawtransaction 0400008085202f8901011063706ccf8ccb228566bf94ff2c34e544a3d856b7f061d7d881789dd89d130000000049483045022100efc45823b3e190cd6fab3192d2f1c7ce2945396868f786c0c1f3fca6d4d54378022011d19799fb30e089cc16c38557da301aeb707e289ca911e1c99e6fcc603ba01e01ffffffff0310270000000000001976a914823a9534f765ff5f56d1d5bddc029087972f321c88ace092f5050000000023210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634ac00000000000000000c6a0ae24100a0724e18090000000000008f0100000000000000000000000000
```

Response:

```bash
e0dd729342f9714957119c7d78342228f34dae48a0648b4339148c8abeb21ad5
```

After the above transaction is confirmed, Broadcast the `ImportTxHex`:

```bash
./komodo-cli -ac_name=IMPORTTEST sendrawtransaction 0400008085202f89012764621f3e61d2b47b9f0595639db26b0455d5ac17f73676115e8967640a422400ca9a3b0201e2ffffffff0200a0724e180900001976a914823a9534f765ff5f56d1d5bddc029087972f321c88ac0000000000000000f16a4ceee211d51ab2be8a8c1439438b64a048ae4df3282234787d9c11574971f9429372dde089af17000400008085202f8901011063706ccf8ccb228566bf94ff2c34e544a3d856b7f061d7d881789dd89d130000000049483045022100efc45823b3e190cd6fab3192d2f1c7ce2945396868f786c0c1f3fca6d4d54378022011d19799fb30e089cc16c38557da301aeb707e289ca911e1c99e6fcc603ba01e01ffffffff0100a0724e18090000306a2ee28efefefe7f065055424b4559dded40d8b8826ad32af955a9ce0c2ebc0cd60d9978a1936d425b8f7bdc1c756700000000008f010000000000000000000000000000000000000000000000000000000000000000
```

Response:

```bash
e78096bb4139430276fd5176ff8ac97182be17606558eefb0c21c332192bd189
```

Confirm that the address given to the `selfimport` command received the newly created funds

</collapse-text>

## Notary API

Several methods can be used by the notary nodes to get the blockchain 'fingerprints' and notarisation data.

### calc_MoM

**calc_MoM height MoMdepth**

The `calc_MoM` method calculates `the merkle root of the blocks' merkle roots (MoM)` value starting from the block of a given height for the chosen depth.

:::tip Note
This method should be run on an asset chain.
:::

#### Arguments

| Name       | Type               | Description                                                  |
| ---------- | ------------------ | ------------------------------------------------------------ |
| "height"   | (number, required) | the block height from which the `MoM` calculation must begin |
| "MoMdepth" | (number, required) | the number of blocks to include in the MoM calculation       |

#### Response

| Name       | Type     | Description                                            |
| ---------- | -------- | ------------------------------------------------------ |
| "coin"     | (string) | the chain's name                                       |
| "height"   | (string) | the starting block height                              |
| "MoMdepth" | (number) | the number of blocks included in the `MoM` calculation |
| "MoM"      | (string) | the `MoM` value                                        |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=CFEKHOUND calc_MoM 1000 100
```

<collapse-text hidden title="Response">

```json
{
  "coin": "CFEKHOUND",
  "height": 1000,
  "MoMdepth": 100,
  "MoM": "318e9e5636cb9ef99ca7343da72a3544fbcccb7889fa386083e69a8527557a4d"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "calc_MoM", "params": ["1000","100"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "coin": "CFEKHOUND",
    "height": 1000,
    "MoMdepth": 100,
    "MoM": "318e9e5636cb9ef99ca7343da72a3544fbcccb7889fa386083e69a8527557a4d"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

### MoMoMdata

**MoMoMdata symbol kmdheight ccid**

The `MoMoMdata` method calculates `the merkle root of merkle roots of the blocks' merkle roots (MoMoM)` value starting from the block of a given height for the data of a chain whose name and CCid are passed in as arguments.

:::tip Note
This method should be run on the KMD chain.
:::

#### Arguments

| Name        | Type               | Description                                                     |
| ----------- | ------------------ | --------------------------------------------------------------- |
| "symbol"    | (string, required) | the chain's name whose data's `MoMoM` value is to be calculated |
| "kmdheight" | (number, required) | the number of blocks to include in the `MoM` calculation        |
| "ccid"      | (number, required) | the chain's CCid                                                |

#### Response

| Name               | Type     | Description                                               |
| ------------------ | -------- | --------------------------------------------------------- |
| "coin"             | (string) | the chain's name                                          |
| "kmdheight"        | (string) | the starting block's height                               |
| "ccid"             | (number) | the chain's `CCid`                                        |
| "MoMs"             | (string) | the array of `MoM` values                                 |
| "notarisationHash" | (string) | the first found notarisation transaction id for the chain |
| "MoMoM"            | (string) | the MoMoM value                                           |

#### :pushpin: Examples

Command:

```bash
./komodo-cli MoMoMdata CFEKHOUND 1350074 533
```

<collapse-text hidden title="Response">

```json
{
  "coin": "CFEKHOUND",
  "kmdheight": 1350069,
  "ccid": 533,
  "MoMs": [
    "e02b0479aad97b3edf57eaffe951f9cd536c37ae2b4aa05c080798eac484e30b",
    "24866dd7b381c2418e44aae5030b513160bd8d706f5f7bf1fa75db297052bf0d",
    "4d5613567bbd3f169b96f51765487493129c0f9357a62318013e3b22b488d711",
    "fc8f1911a109f506095bae52f9b4152a1469a42037b2aa22aa6f4d4d3b04101b",
    "a0d872460a4a8a44261ec9201567636e62fcda5580164a00051e7dcb8f64511e",
    "fbad42139d7d35947b9ae4f20f1a1e88cd83ac6732e246165eecc2d99b05ee36",
    "323c3c9fd87c555f6795ecbbec607ce32007fe90b8e435512cd417a2fc6e2637",
    "9677f063342198a462ea89c0542a79424219287bc8e025b8f976ef5841ce927b",
    "154b989f4e9900da37710bfd5c00130a4c7d796382843706594ab6443e09297e",
    "0e1b82ea82b5c97486e2620423ab5fe81085f32cc38bfd19f8aac9416b4c5b84",
    "35ec0d4946bbcba8aae8fa1f939d020c13750ecc100eaa33035e620aed702d86",
    "80bc23baef9c7b5555fb2a83323ae77b01f7747ead37a9f4f24bcd4b9485b28b"
  ],
  "notarization_hash": "3b202647603e18aeea6d07bb39cda4f1df12117ce1c9439772f066d6cbda72c5",
  "MoMoM": "f944a1951bafc7548644c53745ed20a671f7fc574388e5e73ab5ae0929b46bba",
  "data": "ba6bb42909aeb53ae7e5884357fcf771a620ed4537c5448654c7af1b95a144f900000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "MoMoMdata", "params": ["CFEKHOUND","1350074","533"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "coin": "CFEKHOUND",
    "kmdheight": 1350069,
    "ccid": 533,
    "MoMs": [
      "e02b0479aad97b3edf57eaffe951f9cd536c37ae2b4aa05c080798eac484e30b",
      "24866dd7b381c2418e44aae5030b513160bd8d706f5f7bf1fa75db297052bf0d",
      "4d5613567bbd3f169b96f51765487493129c0f9357a62318013e3b22b488d711",
      "fc8f1911a109f506095bae52f9b4152a1469a42037b2aa22aa6f4d4d3b04101b",
      "a0d872460a4a8a44261ec9201567636e62fcda5580164a00051e7dcb8f64511e",
      "fbad42139d7d35947b9ae4f20f1a1e88cd83ac6732e246165eecc2d99b05ee36",
      "323c3c9fd87c555f6795ecbbec607ce32007fe90b8e435512cd417a2fc6e2637",
      "9677f063342198a462ea89c0542a79424219287bc8e025b8f976ef5841ce927b",
      "154b989f4e9900da37710bfd5c00130a4c7d796382843706594ab6443e09297e",
      "0e1b82ea82b5c97486e2620423ab5fe81085f32cc38bfd19f8aac9416b4c5b84",
      "35ec0d4946bbcba8aae8fa1f939d020c13750ecc100eaa33035e620aed702d86",
      "80bc23baef9c7b5555fb2a83323ae77b01f7747ead37a9f4f24bcd4b9485b28b"
    ],
    "notarization_hash": "3b202647603e18aeea6d07bb39cda4f1df12117ce1c9439772f066d6cbda72c5",
    "MoMoM": "f944a1951bafc7548644c53745ed20a671f7fc574388e5e73ab5ae0929b46bba",
    "data": "ba6bb42909aeb53ae7e5884357fcf771a620ed4537c5448654c7af1b95a144f900000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

### assetchainproof

**assetchainproof txid**

The `assetchainproof` method scans the chain for the back `MoM` notarisation for a transaction corresponding to the given transaction id and returns a proof object with MoM branch. Scanning is performed from the height upto the chain tip but no more than 1440 blocks.

#### Arguments

| Name   | Type               | Description                                                  |
| ------ | ------------------ | ------------------------------------------------------------ |
| "txid" | (string, required) | the transaction id for which a proof object must be returned |

#### Response

| Name           | Type     | Description                                             |
| -------------- | -------- | ------------------------------------------------------- |
| "proof object" | (string) | the returned proof object with MoM branch in hex format |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=CFEKHOUND assetchainproof d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610
```

<collapse-text hidden title="Response">

```bash
da14c5a904dcf9dcc5c4471bae0f3e90274bc782fcaf7a828c23190dbbd3392205042cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadf
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "assetchainproof", "params": ["d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "da14c5a904dcf9dcc5c4471bae0f3e90274bc782fcaf7a828c23190dbbd3392205042cd74dc8b4504472d782478b374fe3fa406f9b9199d5b8ccac7c202a73c812b6f7fb8e5644af270917b10fa879a0c5636de719d308efd245ff5613450b934a5f32fd21b84a67d7b6be78b5d625af836cf7efddab3c6e8fea54345bab9ea7732cf073ef25f0b8a0764d928c8a420d45beb793fa8ea93432a908c808e4f47daadf",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

### getNotarisationsForBlock

**getNotarisationsForBlock height**

The `getNotarisationsForBlock` method returns the notarisation transactions within the block for a given block hash.

#### Arguments

| Name     | Type               | Description                                                             |
| -------- | ------------------ | ----------------------------------------------------------------------- |
| "height" | (number, required) | the block number of the block in which notarisations are to be searched |

#### Response

| Name             | Type     | Description                                                                                                                |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| "Notary Cluster" | (string) | refers to the notary group which performed the notarisations; KMD for the main Komodo notaries, LABS for the LABS notaries |
| "txid"           | (string) | the notarisation transaction's id                                                                                          |
| "chain"          | (string) | the chain that has been notarised                                                                                          |
| "height"         | (number) | the notarisation transaction's block height                                                                                |
| "blockhash"      | (string) | the hash of the notarisation transaction's block                                                                           |
| "notaries"       | (array)  | the [ids](https://github.com/jl777/komodo/blob/master/src/komodo_notary.h) of the notaries who performed the notarisation  |

#### :pushpin: Examples

Command:

```bash
./komodo-cli getNotarisationsForBlock 1350074
```

<collapse-text hidden title="Response">

```json
{
  "KMD": [
    {
      "txid": "18c067eef7b264d3536e89e319e451d036f8c6a2256c60eb1132b9362f6d7dac",
      "chain": "KMD",
      "height": 1350060,
      "blockhash": "027d124806ce2938e166450ae50c06f11c2b254c2603b3c2d1024d48431b04ff",
      "notaries": [14, 17, 18, 19, 21, 25, 27, 28, 36, 43, 53, 55, 60]
    },
    {
      "txid": "17e77666028aa94f7793b7c916e82085d2cd555a75c21b55ba60989a7c49fff9",
      "chain": "HODL",
      "height": 447018,
      "blockhash": "0c321de920e0e3c342be96a8ffbe15c8dd738babfe7d7c5718ff2017f6f3247f",
      "notaries": [4, 18, 23, 29, 32, 39, 40, 44, 47, 48, 55, 57, 58]
    },
    {
      "txid": "2325ec9eebca3304b2b7587c5594659f40e0800d3add30c7209787af4393ded8",
      "chain": "BOTS",
      "height": 616740,
      "blockhash": "0923bbf209a22644ebe5d59555b770658e8e788579a4da1a49bf3f9e45324aa0",
      "notaries": [14, 15, 16, 25, 26, 30, 32, 43, 45, 46, 55, 57, 58]
    },
    {
      "txid": "2282d6adaeb1daa3c112395df2efc4a37bbd91f40905aecc294f908cae9cf0a1",
      "chain": "REVS",
      "height": 655866,
      "blockhash": "003dfc89999d585a92760ad335e4d3786b7860f1d1638ae0f4273cdc9dfa07e3",
      "notaries": [4, 14, 15, 16, 24, 25, 27, 32, 46, 47, 53, 55, 57]
    },
    {
      "txid": "5892ac6929f1e163ae8bad9219b52cd7d551bc295a461da9cae40accfd48ee8b",
      "chain": "MSHARK",
      "height": 631714,
      "blockhash": "07d02c0676f3a862a02190424a904d066cb1614b3866a4b7f8e11771ad5f3dde",
      "notaries": [4, 17, 23, 24, 27, 28, 30, 34, 36, 51, 56, 58, 60]
    }
  ],
  "LABS": [
    {
      "txid": "aae98ab897cedcf93600cea0b44ee4186514b2d43ac3ef07404ff4d862ef6e65",
      "chain": "LABSRCTEST",
      "height": 11655,
      "blockhash": "000e12b4d153f8e355d7ab76251c553c15116013cc678bcada5055342c1f7d7e",
      "notaries": [0, 4, 10, 13, 14, 17]
    },
    {
      "txid": "8c4ece82cc1aa467f61e9575718a06c5962934d573c13d60a715a349d5fe5694",
      "chain": "CFEKDRAGON",
      "height": 28990,
      "blockhash": "00e5a29c351f2c92e2435f8ed8d27335f6dc255bf3b658e1753ba7d3bec38efd",
      "notaries": [7, 10, 12, 13, 15, 17]
    }
  ]
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getNotarisationsForBlock", "params": ["1350074"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "KMD": [
      {
        "txid": "18c067eef7b264d3536e89e319e451d036f8c6a2256c60eb1132b9362f6d7dac",
        "chain": "KMD",
        "height": 1350060,
        "blockhash": "027d124806ce2938e166450ae50c06f11c2b254c2603b3c2d1024d48431b04ff",
        "notaries": [14, 17, 18, 19, 21, 25, 27, 28, 36, 43, 53, 55, 60]
      },
      {
        "txid": "17e77666028aa94f7793b7c916e82085d2cd555a75c21b55ba60989a7c49fff9",
        "chain": "HODL",
        "height": 447018,
        "blockhash": "0c321de920e0e3c342be96a8ffbe15c8dd738babfe7d7c5718ff2017f6f3247f",
        "notaries": [4, 18, 23, 29, 32, 39, 40, 44, 47, 48, 55, 57, 58]
      },
      {
        "txid": "2325ec9eebca3304b2b7587c5594659f40e0800d3add30c7209787af4393ded8",
        "chain": "BOTS",
        "height": 616740,
        "blockhash": "0923bbf209a22644ebe5d59555b770658e8e788579a4da1a49bf3f9e45324aa0",
        "notaries": [14, 15, 16, 25, 26, 30, 32, 43, 45, 46, 55, 57, 58]
      },
      {
        "txid": "2282d6adaeb1daa3c112395df2efc4a37bbd91f40905aecc294f908cae9cf0a1",
        "chain": "REVS",
        "height": 655866,
        "blockhash": "003dfc89999d585a92760ad335e4d3786b7860f1d1638ae0f4273cdc9dfa07e3",
        "notaries": [4, 14, 15, 16, 24, 25, 27, 32, 46, 47, 53, 55, 57]
      },
      {
        "txid": "5892ac6929f1e163ae8bad9219b52cd7d551bc295a461da9cae40accfd48ee8b",
        "chain": "MSHARK",
        "height": 631714,
        "blockhash": "07d02c0676f3a862a02190424a904d066cb1614b3866a4b7f8e11771ad5f3dde",
        "notaries": [4, 17, 23, 24, 27, 28, 30, 34, 36, 51, 56, 58, 60]
      }
    ],
    "LABS": [
      {
        "txid": "aae98ab897cedcf93600cea0b44ee4186514b2d43ac3ef07404ff4d862ef6e65",
        "chain": "LABSRCTEST",
        "height": 11655,
        "blockhash": "000e12b4d153f8e355d7ab76251c553c15116013cc678bcada5055342c1f7d7e",
        "notaries": [0, 4, 10, 13, 14, 17]
      },
      {
        "txid": "8c4ece82cc1aa467f61e9575718a06c5962934d573c13d60a715a349d5fe5694",
        "chain": "CFEKDRAGON",
        "height": 28990,
        "blockhash": "00e5a29c351f2c92e2435f8ed8d27335f6dc255bf3b658e1753ba7d3bec38efd",
        "notaries": [7, 10, 12, 13, 15, 17]
      }
    ]
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

### scanNotarisationsDB

**scanNotarisationsDB blockHeight symbol [blocksLimit=1440]**

The `scanNotarisationsDB` method scans the notarisations database backwards from the given block height for a notarisation of the chain with the given name (symbol).

#### Arguments

| Name          | Type               | Description                                                           |
| ------------- | ------------------ | --------------------------------------------------------------------- |
| "blockHeight" | (number, required) | the starting block height from which notarisations are to be searched |
| "symbol"      | (string, required) | the chain's name whose notarisations are to be searched               |
| "blocksLimit" | (number, optional) | an optional block depth to search for notarisations                   |

#### Response

| Name       | Type     | Description                                                             |
| ---------- | -------- | ----------------------------------------------------------------------- |
| "height"   | (number) | the block height of the notarisation transaction id that has been found |
| "hash"     | (string) | the hash of the notarisation transaction id that has been found         |
| "opreturn" | (string) | the notarisation data in hex format                                     |

#### :pushpin: Examples

Command:

```bash
./komodo-cli scanNotarisationsDB 1350074 EMC2
```

<collapse-text hidden title="Response">

```json
{
  "height": 1350067,
  "hash": "1b86cd4512d02561359ecfc841ea49692a4c9da112393a17bd4479443fbd47a4",
  "opreturn": "45dd5cbd1972b23bfd272279f3f0bd3878ad5e020aa18f31072a096e25c261dfb4f02300454d433200000000000000000000000000000000000000000000000000000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "scanNotarisationsDB", "params": ["1350074","EMC2"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "height": 1350067,
    "hash": "1b86cd4512d02561359ecfc841ea49692a4c9da112393a17bd4479443fbd47a4",
    "opreturn": "45dd5cbd1972b23bfd272279f3f0bd3878ad5e020aa18f31072a096e25c261dfb4f02300454d433200000000000000000000000000000000000000000000000000000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## User API

There are some utility methods for getting information about burn transactions or import transactions that exist on a chain.

### getimports

**getimports hash|height**

The `getimports` method lists import transactions in the chain's block chosen by a block number or block hash parameter.

#### Arguments

| Name             | Type                         | Description                                                                |
| ---------------- | ---------------------------- | -------------------------------------------------------------------------- |
| "hash or height" | (string or number, required) | the block's hash or height in which import transactions are to be searched |

#### Response

| Name            | Type              | Description                                         |
| --------------- | ----------------- | --------------------------------------------------- |
| "imports"       | (array)           |                                                     |
| "txid"          | (string)          | the import transaction id                           |
| "amount"        | (number)          | the import transaction's value in coins             |
| "export"        | (json)            | the export or burn transaction's infomation         |
| "txid"          | (string)          | the export transaction's id                         |
| "amount"        | (number)          | the export transaction's value                      |
| "txid"          | (string)          | the export transaction's id                         |
| "source"        | (string)          | the source chain's name                             |
| "tokenid"       | (string,optional) | the source chain's token id, if tokens are imported |
| "TotalImported" | (number)          | the total imported amount in coins                  |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=CFEKDRAGON getimports 027366fc75eb2adda37f54092f29130d3feafd5bf453b4005fbdc68a27391a8f
```

:::tip Note
If the transaction id of an import is known, use the [gettransaction](../komodo-api/wallet.html#gettransaction) method and get its block hash to use in the above method
:::

<collapse-text hidden title="Response">

```json
{
  "imports": [
    {
      "txid": "b2ed563617771d4a919fb13906e93c8ec485bed145a3f380583796663e285e0d",
      "amount": 0.0,
      "export": {
        "txid": "d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610",
        "amount": 7.7701,
        "source": "CFEKHOUND"
      }
    }
  ],
  "TotalImported": 7.77,
  "time": 1557421253
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getimports", "params": ["027366fc75eb2adda37f54092f29130d3feafd5bf453b4005fbdc68a27391a8f"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "imports": [
      {
        "txid": "b2ed563617771d4a919fb13906e93c8ec485bed145a3f380583796663e285e0d",
        "amount": 0.0,
        "export": {
          "txid": "d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610",
          "amount": 7.7701,
          "source": "CFEKHOUND"
        }
      }
    ],
    "TotalImported": 7.77,
    "time": 1557421253
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

### getwalletburntransactions

**getwalletburntransactions "count"**

The `getwalletburntransactions` method lists all the burn transactions in the current wallet.

#### Arguments

| Name    | Type               | Description                                                                                  |
| ------- | ------------------ | -------------------------------------------------------------------------------------------- |
| "count" | (number, optional) | the number of burn transactions to be returned; if omitted, defaults to 10 burn transactions |

#### Response

| Name           | Type               | Description                        |
| -------------- | ------------------ | ---------------------------------- |
| "txid"         | (string)           | the burn transaction's id          |
| "burnedAmount" | (number)           | the burned value in coins          |
| "tokenid"      | (string, optional) | the token id, if tokens are burned |
| "targetSymbol" | (string)           | the target chain's name            |
| "targetCCid"   | (number)           | the target chain's `CCid`          |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=CFEKHOUND getwalletburntransactions
```

<collapse-text hidden title="Response">

```json
[
  {
    "txid": "d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610",
    "burnedAmount": 7.7701,
    "targetSymbol": "CFEKDRAGON",
    "targetCCid": "533"
  },
  {
    "txid": "060f48ac5cf0f79370623320015dc243f49ef2c23fb1b60592f77bc77d6609df",
    "burnedAmount": 0.7701,
    "targetSymbol": "CFEKDRAGON",
    "targetCCid": "533"
  },
  {
    "txid": "ade1c02370f47004ad7c323fa1e456171fb3e508d7dff473a5b7fa1214480adb",
    "burnedAmount": 0.0771,
    "targetSymbol": "CFEKDRAGON",
    "targetCCid": "533"
  }
]
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwalletburntransactions", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": [
    {
      "txid": "d19f1c3f7e630966e1d40838c56c8c63a6cbd828d34c3544be5a60b236cf1610",
      "burnedAmount": 7.7701,
      "targetSymbol": "CFEKDRAGON",
      "targetCCid": "533"
    },
    {
      "txid": "060f48ac5cf0f79370623320015dc243f49ef2c23fb1b60592f77bc77d6609df",
      "burnedAmount": 0.7701,
      "targetSymbol": "CFEKDRAGON",
      "targetCCid": "533"
    },
    {
      "txid": "ade1c02370f47004ad7c323fa1e456171fb3e508d7dff473a5b7fa1214480adb",
      "burnedAmount": 0.0771,
      "targetSymbol": "CFEKDRAGON",
      "targetCCid": "533"
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>
