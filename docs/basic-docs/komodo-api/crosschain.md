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
- In the examples, we use 2 chains: CHAIN1(source) and CHAIN2(destination) that have been launched with the same `-ac_cc` parameter (> 100)

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
./komodo-cli CFEKHOUND sendrawtransaction 0400008085202f8901a91010764d209bb4bdc9586f44cfced36ea75289026e714e040acac9eea475c00c0000006b483045022100e57af148204d15daa51fde4d21f0a0e54e7dd237f2bb4ee4a82bf34b27002178022052dc8e4601dd0bcbab3024ef47517391258fe5ef0fc2d4be38cc10e0c15fdbb6012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ffffffff02403b5a0c00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac503b502e000000003b6a39e283150a4346454b445241474f4e8c5970dd6f483fef99e6be0bbc64adc1ab1060e341a5c2c8b0f0a56a6d7936e80a094346454b484f554e4400000000466c00000000000000000000000000
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

Command:

```bash

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

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

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

## Self import API

The Self import API is a special api available only in chains that need a pubkey to create new coins arbitrarily.

### selfimport

**selfimport destAddress amount**

The Self import API allows a trusted pubkey to create more coins on the same chain.

Requirements: The chain must have the custom parameters `-ac_import=PUBLIC` and `-ac_pubkey` set to a pubkey which is allowed to create coins.

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

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

```

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

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

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

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

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

<!--FIXME fill in the response box

for a txid returns a proof object with MoM branch in hex.

-->

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

### getNotarisationsForBlock

**getNotarisationsForBlock blockHash**

The `getNotarisationsForBlock` method returns the notarisation transactions within the block for a given block hash.

#### Arguments

| Name        | Type               | Description                                                           |
| ----------- | ------------------ | --------------------------------------------------------------------- |
| "blockHash" | (string, required) | the block hash of the block in which notarisations are to be searched |

#### Response

<!--FIXME fill in the response box

returns array of pairs of values `<notarisation txid`> `<notarisation data in hex`>

-->

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

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

<!-- FIXME fill in the response box

returns array of `<notarisation txid`> `<notarisation data in hex`>

-->

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

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

| Name             | Type                    | Description                                         |
| ---------------- | ----------------------- | --------------------------------------------------- |
| "transaction id" | (string)                | the import transaction id                           |
| "amount"         | (number)                | the import transaction's value in coins             |
| "address"        | (string)                | the destination address                             |
| "export:"        | <!-- FIXME fill this--> | the export or burn transaction's infomation         |
| "txid"           | (string)                | the export transaction's id                         |
| "amount"         | (number)                | the export transaction's value                      |
| "txid"           | (string)                | the export transaction's id                         |
| "source"         | (string)                | the source chain's name                             |
| "tokenid"        | (string,optional)       | the source chain's token id, if tokens are imported |
| "TotalImported"  | (number)                | the total imported amount in coins                  |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

### getwalletburntransaction

**getwalletburntransactions**

The `getwalletburntransactions` method lists all the burn transactions in the current wallet.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

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

```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "", "params": [""] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">

```bash

```

</collapse-text>
