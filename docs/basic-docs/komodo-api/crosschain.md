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

<!--- FIXME (can be deleted?)
The following migration RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.
--->

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

### migrate_converttoexport

**migrate_converttoexport burntx**

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

## Notarisation backup solution

There is an alternative solution for notarising burn transactions by the notary operators in case of MoMoM notarisation failing or being slow.

For this to work, the notary operators pick burn transactions sent to a special publishing resource, check them and return the ids of the transactions with the burn transaction proof objects which are created in destination chains.

### The workflow

- A user creates a burn transaction with the above described `migrate_createburntransaction` rpc method and publishes its hexademical representation to a publishing resource which is monitored by the notary operators (currently the discord channel ...???)
- The notary operators pick the burn transaction and check its structure and existence in the source chain with the rpc method `migrate_checkburntransactionsource`. If the burn transaction is successfully validated, the notary operators create approval transactions in the destination chain and publish their transaction ids back into the publishing resource.
- The user collects the transaction ids and calls `migrate_createimporttransaction` method, passing into it the collected notary approval transaction ids. Currently it is enough to have at least 5 successful notary approval transactions for an import transaction to be considered as valid in the destination chain.

### migrate_checkburntransactionsource

**migrate_checkburntransactionsource burntx**

The `migrate_checkburntransactionsource` method allows to a notary operator to check the burn transaction structure and verify its presence in the source chain.

#### Arguments

| Name     | Type               | Description                 |
| -------- | ------------------ | --------------------------- |
| "burntx" | (string, required) | the burn transaction in hex |

#### Response

| Name           | Type               | Description                                             |
| -------------- | ------------------ | ------------------------------------------------------- |
| "sourceSymbol" | (string)           | source chain name                                       |
| "targetSymbol" | (string)           | target chain name                                       |
| "targetCCid"   | (number)           | target chain CCid                                       |
| "tokenid"      | (string, optional) | token id if it is token to migrate                      |
| "TxOutProof"   | (string)           | proof of burn transaction existence in the source chain |

### migrate_createnotaryapprovaltransaction

**migrate_createnotaryapprovaltransaction burntxid txoutproof**

A notary operator uses the `migrate_createnotaryapprovaltransaction` method to create an approval transaction in the destination chain with the proof of the burn transaction existence in the source chain.
Returned notary transaction should be sent to the destination chain with [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method

#### Arguments

| Name         | Type               | Description                                 |
| ------------ | ------------------ | ------------------------------------------- |
| "burntxid"   | (string, required) | the burn transaction id                     |
| "txoutproof" | (string, required) | the proof of the burn transaction existence |

#### Response

| Name          | Type     | Description                        |
| ------------- | -------- | ---------------------------------- |
| "NotaryTxHex" | (string) | notary approval transaction in hex |

## Self import API

Self import API allows to a trusted pubkey to create more coins in the same chain.
Requirement: the chain should have command line parameters `-ac_import=PUBLIC` and `-ac_pubkey` set to a pubkey which is allowed to create coins.
For creating more coins in the chain with -ac_import=PUBKEY enabled there is an rpc method `selfimport`.
The method return a source transaction that contains a parameter with amount of coins to create and is a proof of the trusted pubkey owner's intention to create coins in the chain.
The returned source transaction should be sent into the chain with the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method. The source transaction spends txfee=10000 satoshis amount from the ac_pubkey owner UXTOs.
Then, after the source transaction is mined, the import transactions also should be sent to the chain with the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method. After it is mined, its vout would contain the amount of created coins on the appointed destination address.

### selfimport

**selfimport destAddress amount**

#### Arguments

| Name          | Type               | Description                                |
| ------------- | ------------------ | ------------------------------------------ |
| "destAddress" | (string, required) | address where created coins should be sent |
| "amount"      | (number, required) | amount in coins to create                  |

#### Response

| Name          | Type     | Description               |
| ------------- | -------- | ------------------------- |
| "SourceTxHex" | (string) | source transaction in hex |
| "ImportTxHex" | (string) | import transaction in hex |

## Notary API

Several methods are used by notary nodes to get block chain 'fingerprints' and notarisation data from chain.

### calc_MoM

**calc_MoM height MoMdepth**

The `calc_MoM` method calculates merkle root of blocks' merkle roots (MoM) value starting from the block of the appointed height for the passed depth. This method should be run on an asset chain.

#### Arguments

| Name       | Type               | Description                                    |
| ---------- | ------------------ | ---------------------------------------------- |
| "height"   | (number, required) | block height from which MoM calculation begins |
| "MoMdepth" | (number, required) | number of blocks to include in MoM calculation |

#### Response

| Name       | Type     | Description                                    |
| ---------- | -------- | ---------------------------------------------- |
| "coin"     | (string) | chain name                                     |
| "height"   | (string) | starting block height                          |
| "MoMdepth" | (number) | number of blocks to include in MoM calculation |
| "MoM"      | (string) | MoM value                                      |

### MoMoMdata

**MoMoMdata symbol kmdheight ccid**

The `MoMoMdata` method calculates merkle root of merkle roots of blocks' merkle roots (MoMoM) value starting from the block of the appointed height for the data of the chain with passed name and ccid. The method should be run on the KMD chain.

#### Arguments

| Name        | Type               | Description                                         |
| ----------- | ------------------ | --------------------------------------------------- |
| "symbol"    | (string, required) | chain name for which data MoMoM value is calculated |
| "kmdheight" | (number, required) | number of blocks to include in MoM calculation      |
| "ccid"      | (number, required) | chain ccid                                          |

#### Response

| Name               | Type     | Description                                               |
| ------------------ | -------- | --------------------------------------------------------- |
| "coin"             | (string) | chain name                                                |
| "kmdheight"        | (string) | starting block height                                     |
| "ccid"             | (number) | chain ccid                                                |
| "MoMs"             | (string) | array of MoM values                                       |
| "notarisationHash" | (string) | the first found notarisation transaction id for the chain |
| "MoMoM"            | (string) | MoMoM value                                               |

### assetchainproof

**assetchainproof txid**

For given transaction id the `assetchainproof` method scans the chain for the back MoM notarisation for this transaction and returns a proof object with MoM branch. Scanning is performed from the height upto the chain tip but no more than 1440 blocks.

#### Arguments

| Name   | Type               | Description                                         |
| ------ | ------------------ | --------------------------------------------------- |
| "txid" | (string, required) | transaction id for which a proof object is returned |

#### Response

for a txid returns a proof object with MoM branch in hex.

### getNotarisationsForBlock

**getNotarisationsForBlock blockHash**

For the block hash returns notarisation transactions within the block.

#### Arguments

| Name        | Type               | Description                                 |
| ----------- | ------------------ | ------------------------------------------- |
| "blockHash" | (string, required) | block hash where notarisations are searched |

#### Response

returns array of pairs of values `<notarisation txid`> `<notarisation data in hex`>

### scanNotarisationsDB

**scanNotarisationsDB blockHeight symbol [blocksLimit=1440]**

Scans notarisations db backwards from the block height for a notarisation of given symbol.

#### Arguments

| Name          | Type               | Description                                                |
| ------------- | ------------------ | ---------------------------------------------------------- |
| "blockHeight" | (number, required) | starting block height where notarisations are searched     |
| "symbol"      | (string, required) | chain name for which notarisations are searched            |
| "blocksLimit" | (number, optional) | optional block number to search for notarisations in depth |

#### Response

returns array of `<notarisation txid`> `<notarisation data in hex`>

## User API

There are some utility methods for getting information about burn transactions or import transactions existing in a chain.

### getimports

**getimports hash|height**

The `getimports` lists import transactions in the chain's block appointed by a block number or block hash parameter.

#### Arguments

| Name             | Type                         | Description                                             |
| ---------------- | ---------------------------- | ------------------------------------------------------- |
| "hash or height" | (string or number, required) | block's hash or height to search import transactions in |

#### Response

| Name             | Type              | Description                                   |
| ---------------- | ----------------- | --------------------------------------------- |
| "transaction id" | (string)          | import transaction id                         |
| "amount"         | (number)          | import transaction value in coins             |
| "address"        | (string)          | destination address                           |
| "export:"        |                   | export or burn transaction infomation         |
| "txid"           | (string)          | export transaction id                         |
| "amount"         | (number)          | export transaction value                      |
| "txid"           | (string)          | export transaction id                         |
| "source"         | (string)          | source chain name                             |
| "tokenid"        | (string,optional) | source chain token id, if tokens are imported |
| "TotalImported"  | (number)          | total imported amount in coins                |

### getwalletburntransaction

**getwalletburntransactions**

The `getwalletburntransactions` lists burn transactions in the current wallet.

#### Arguments

none

#### Response

| Name           | Type               | Description                    |
| -------------- | ------------------ | ------------------------------ |
| "txid"         | (string)           | burn transaction id            |
| "burnedAmount" | (number)           | burned value in coins          |
| "tokenid"      | (string, optional) | token id, if tokens are burned |
| "targetSymbol" | (string)           | target chain name              |
| "targetCCid"   | (number)           | target chain CCid              |
