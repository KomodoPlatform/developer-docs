# Wallet

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## addmultisigaddress

**addmultisigaddress nrequired [ "key", ... ] \( "account" )**

The `addmultisigaddress` method adds a multi-signature address to the wallet, where `nrequired` indicates the number of keys (out of the total provided) required to execute a transaction.

The keys function as signatures, allowing multiple parties or entities to manage an account. Each key in the array can be an address or a hex-encoded public key.

::: tip
DEPRECATED: If <b>account</b> is specified, the method assigns the multi-signature address to that account.
:::

### Arguments:

| Structure    | Type                | Description                                                                                                                                              |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nrequired    | (numeric, required) | the number of required keys (out of the `n` submitted)                                                                                                   |
| "keysobject" | (string, required)  | a json array of addresses or hex-encoded public keys                                                                                                     |
| "address"    | (string)            | the address or hex-encoded public key                                                                                                                    |
| "account"    | (string, optional)  | DEPRECATED: if provided, "account" MUST be set to the empty string "" to represent the default account; passing any other string will result in an error |

### Response:

| Structure | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| "address" | (string) | an address associated with the keys |

#### :pushpin: Examples:

Add a multisig address from 2 addresses:

Command:

```bash
./komodo-cli addmultisigaddress 2 '["RSWwtqsNr9mW21UXRm6Lz4AzQnj4pVzzkp","RW8d8EChHTooVbwF3reqHYgkzWCnJFLXgh"]'
```

Response:

```bash
bLz2YZ7Mm8MgPc9mPNiFqhjFPbFZU4WUD5
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addmultisigaddress", "params": [2, ["RL4CuA2MSAbBiqJKQEr2TKnKT2fSwK99mG","RBYVFCxpJdLgvUixhguxzuH1TJpoNLYCJ6"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "bNdB9fAt9HmQD8CmBjkY6QwmrNSBrbzsgA",
  "error": null,
  "id": "curltest"
}
```

## backupwallet

**backupwallet "destination"**

The `backupwallet` method safely copies the `wallet.dat` file to the indicated destination. The `destination` input accepts only alphanumeric characters.

::: tip
This method requires that the coin daemon have the <b>exportdir</b> runtime parameter enabled.
:::

### Arguments:

| Structure     | Type               | Description                                                                                                                                          |
| ------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "destination" | (string, required) | the destination filename, saved in the directory set by the [exportdir](../installations/common-runtime-parameters.html#exportdir) runtime parameter |

### Response:

| Structure | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| "path"    | (string) | the full path of the destination file |

#### :pushpin: Examples:

```bash
./komodo-cli backupwallet "mybackupdata"

/home/myusername/myexportdir/mybackupdata
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "backupwallet", "params": ["backupdata"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "/home/myusername/Desktop/backupdata",
  "error": null,
  "id": "curltest"
}
```

## dumpprivkey

**dumpprivkey "address"**

The `dumpprivkey` method reveals the private key corresponding to the indicated `address`.

::: tip
See also <b>importprivkey</b>.
:::

### Arguments:

| Structure | Type               | Description                     |
| --------- | ------------------ | ------------------------------- |
| "address" | (string, required) | the address for the private key |

### Response:

| Structure | Type     | Description     |
| --------- | -------- | --------------- |
| "data"    | (string) | the private key |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli dumpprivkey "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs"
```

Response:

```bash
DONOTUSExxxxxxxxxxxxxxxxxxxx4KkCmRnnSg7iXvAUjoYivC8K
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpprivkey", "params": ["RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "DONOTUSExxxxxxxxxxxxxxxxxxxx4KkCmRnnSg7iXvAUjoYivC8K",
  "error": null,
  "id": "curltest"
}
```

## dumpwallet

**dumpwallet "filename"**

The `dumpwallet` method dumps all transparent-address wallet keys into a file, using a human-readable format.

Overwriting an existing file is not permitted. The `destination` parameter accepts only alphanumeric characters.

::: tip
This method requires that the coin daemon have the [exportdir](../installations/common-runtime-parameters.html#exportdir) runtime parameter enabled.
:::

### Arguments:

| Structure  | Type               | Description                                                                                                                           |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| "filename" | (string, required) | the filename, saved in the folder set by the [exportdir](../installations/common-runtime-parameters.html#exportdir) runtime parameter |

### Response:

| Structure | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| "path"    | (string) | the full path of the destination file |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli dumpwallet "test"
```

Response:

```bash
/home/myusername/myexportdir/test
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "/home/myusername/myexportdir/test",
  "error": null,
  "id": "curltest"
}
```

## encryptwallet

**encryptwallet "passphrase"**

::: warning
Using the `encryptwallet` method will shutdown the Komodo daemon (`komodod`).
:::

:::tip
This feature is available only on chains where `-ac_public` is enabled. Chains that feature private transactions cannot use this feature.
:::

The `encryptwallet` method encrypts the wallet with the indicated `passphrase`.

For more information, please see these instructions: [Encrypt Komodo's wallet.dat File](https://docs.komodoplatform.com/komodo/encrypt-wallet.html)

This method is for first-time encryption only. After the first encryption, any calls that interact with private keys will require the passphrase via [walletpassphrase](../komodo-api/wallet.html#walletpassphrase) prior to calling the corresponding method. This includes methods that create a transaction, dump a private key for an address, sign a transaction, etc.

### Arguments:

| Structure  | Type     | Description                                                                                           |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------- |
| passphrase | (string) | the passphrase for wallet encryption; the passphrase must be at least 1 character, but should be many |

### Response:

| Text Response                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet encrypted; Komodo server stopping, restart to run with encrypted wallet. The keypool has been flushed, you need to make a new backup. |

#### :pushpin: Examples:

##### Encrypt your wallet:

Command:

```bash
./komodo-cli encryptwallet "mypassphrase"
```

Response:

```bash
wallet encrypted; Komodo server stopping, restart to run with encrypted wallet. The keypool has been flushed, you need to make a new backup.
```

##### Unlock the wallet for 60 seconds

Command:

```bash
./komodo-cli walletpassphrase "mypassphrase" 60
```

Response:

```bash
(disabled)
```

##### Lock the wallet again by removing the passphrase:

Command:

```bash
./komodo-cli walletlock
```

Response:

```bash
(No response)
```

As a json rpc call:

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "encryptwallet", "params": ["mypassphrase"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
{
    "result":"wallet encrypted; Komodo server stopping, restart to run with encrypted wallet. The keypool has been flushed, you need to make a new backup.",
    "error":null,
    "id":"curltest"
}
```

## getaccount

**getaccount "address"**

The `getaccount` method returns the account associated with the given address.

### Arguments:

| Structure | Type               | Description |
| --------- | ------------------ | ----------- |
| "address" | (string, required) | the address |

### Response:

| Structure     | Type     | Description         |
| ------------- | -------- | ------------------- |
| "accountname" | (string) | the account address |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getaccount "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"
```

Response:

```bash
(deprecated)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccount", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(deprecated)
```

## getaccountaddress

**getaccountaddress "account"**

::: tip
DEPRECATED
:::

The `getaccountaddress` method returns the current address for receiving payments to this account.

### Arguments:

| Structure | Type               | Description                                                                                                           |
| --------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| "account" | (string, required) | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error |

### Response:

| Structure | Type     | Description         |
| --------- | -------- | ------------------- |
| "address" | (string) | the account address |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getaccountaddress
```

Response:

```bash
(deprecated)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccountaddress", "params": ["myaccount"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(deprecated)
```

## getaddressesbyaccount

**getaddressesbyaccount "account"**

::: tip
DEPRECATED
:::

The `getaddressesbyaccount` method returns the list of addresses for the given `account`.

### Arguments:

| Structure | Type               | Description                                                                                                           |
| --------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| "account" | (string, required) | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error |

### Response:

| Structure | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| "address" | (string) | an address associated with the given account |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getaddressesbyaccount "tabby"
```

Response:

```bash
(deprecated)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressesbyaccount", "params": ["tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(deprecated)
```

## getbalance

**getbalance ( "account" minconf includeWatchonly )**

The `getbalance` method returns the server's total available balance.

::: tip
The <b>account</b> input is deprecated.
:::

### Arguments:

| Structure        | Type                            | Description                                                                            |
| ---------------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| "account"        | (string, optional)              | DEPRECATED if provided, it MUST be set to the empty string `""` or to the string `"*"` |
| minconf          | (numeric, optional, default=1)  | only include transactions confirmed at least this many times                           |
| includeWatchonly | (bool, optional, default=false) | also include balance in watchonly addresses (see `importaddress`)                      |

### Response:

| Structure | Type      | Description      |
| --------- | --------- | ---------------- |
| amount    | (numeric) | the total amount |

#### :pushpin: Examples:

The total amount in the wallet:

Command:

```bash
./komodo-cli getbalance

```

Response:

```bash
10.05000000
```

The total amount in the wallet where at least five blocks are confirmed:

Command:

```bash
./komodo-cli getbalance "*" 5
```

Response:

```bash
10.05000000
```

As a json rpc call:

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": ["", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 10.09234883,
  "error": null,
  "id": "curltest"
}
```

## getbalance64

**getbalance64**

::: tip
This method is part of the new <b>ac_staked</b> functionality.
:::

The `getbalance64` method is used only on asset chains that are utilizing the `ac_staked` functionality. On KMD-based Proof-of-Stake (PoS) asset chains, all staked coins are placed into one of 64 segments (`segid`'s'). The `getbalance64` method returns the balance of coins in each `segid`. For further information, please reach out to our support team.

## getnewaddress

**getnewaddress ( "account" )**

The `getnewaddress` method returns a new address for receiving payments.

### Arguments:

| Structure | Type               | Description                                                                                                                                                  |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "account" | (string, optional) | DEPRECATED: If provided, the account MUST be set to the empty string `""` to represent the default account; passing any other string will result in an error |

### Response:

| Structure | Type     | Description     |
| --------- | -------- | --------------- |
| "address" | (string) | the new address |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getnewaddress
```

Response:

```bash
"RYDuQ2oQCCz1PQNxUQTDAaRinWKiCoT2E6"
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "R9iQRG6J9eY8SwaCcYZ65QJxg5UhgLC5Rx",
  "error": null,
  "id": "curltest"
}
```

## getrawchangeaddress

**getrawchangeaddress**

The `getrawchangeaddress` returns a new address that can be used to receive change.

::: tip
This is for use with raw transactions, NOT normal use.
:::

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| "address" | (string) | the address |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getrawchangeaddress
```

Response:

```bash
RS8oqzbjShKhftmuk2RpRmHH2hTAukp6yP
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawchangeaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN",
  "error": null,
  "id": "curltest"
}
```

## getreceivedbyaccount

**getreceivedbyaccount "account" ( minconf )**

::: tip
DEPRECATED
:::

The <b>getreceivedbyaccount</b> method returns the total amount received by <b>account</b> in transactions with at least <b>minconf</b> confirmations.

### Arguments:

| Structure | Type                           | Description                                                                                                           |
| --------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| "account" | (string, required)             | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error |
| minconf   | (numeric, optional, default=1) | only include transactions confirmed at least this many times                                                          |

### Response:

| Structure | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| amount    | (numeric) | the total amount received for this account |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getreceivedbyaccount ""
```

Response:

```bash
(deprecated)
```

## getreceivedbyaddress

**getreceivedbyaddress "address" ( minconf )**

The `getreceivedbyaddress` method returns the total amount received by the given `address` in transactions with at least `minconf` confirmations.

### Arguments:

| Structure | Type                           | Description                                                  |
| --------- | ------------------------------ | ------------------------------------------------------------ |
| "address" | (string, required)             | the address for transactions                                 |
| minconf   | (numeric, optional, default=1) | only include transactions confirmed at least this many times |

### Response:

| Structure | Type      | Description                                                    |
| --------- | --------- | -------------------------------------------------------------- |
| amount    | (numeric) | the total amount of the relevant coin received at this address |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN"
```

Response:

```bash
10.0500000
```

Command:

```bash
./komodo-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" 0
```

Response:

```bash
10.0500000
```

Command:

```bash
./komodo-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" 6
```

Response:

```bash
10.0500000
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaddress", "params": ["RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 0,
  "error": null,
  "id": "curltest"
}
```

## gettransaction

**gettransaction "txid" ( includeWatchonly )**

The `gettransaction` method queries detailed information about transaction `txid`. This command applies only to `txid`'s that are in the user's local wallet.

### Arguments:

| Structure          | Type                            | Description                                                                                                       |
| ------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| "txid"             | (string, required)              | the transaction id                                                                                                |
| "includeWatchonly" | (bool, optional, default=false) | whether to include watchonly addresses in the returned balance calculation and in the `details[]` returned values |

### Response:

| Structure               | Type                    | Description                                                                                                                       |
| ----------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| "amount"                | (numeric)               | the transaction amount                                                                                                            |
| "confirmations"         | (numeric)               | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info |
| "rawconfirmations"      | (numeric)               | the raw confirmations (number of blocks on top of this transaction's block)                                                       |
| "blockhash"             | (string)                | the block hash                                                                                                                    |
| "blockindex"            | (numeric)               | the block index                                                                                                                   |
| "blocktime"             | (numeric)               | the time in seconds since epoch (1 Jan 1970 GMT)                                                                                  |
| "txid"                  | (string)                | the transaction id                                                                                                                |
| "time"                  | (numeric)               | the transaction time in seconds since epoch (1 Jan 1970 GMT)                                                                      |
| "timereceived"          | (numeric)               | the time received in seconds since epoch (1 Jan 1970 GMT)                                                                         |
| "details" : [ ... ]     | (array)                 |
| "account"               | (string)                | DEPRECATED the account name involved in the transaction; can be "" for the default account                                        |
| "address"               | (string)                | the address involved in the transaction                                                                                           |
| "category"              | (string)                | the category - either `send` or `receive`                                                                                         |
| "amount"                | (numeric)               | the amount                                                                                                                        |
| "vout"                  | (numeric)               | the vout value                                                                                                                    |
| "vjoinsplit" : [ ... ]  | (array of json objects) |
| "anchor"                | (string)                | merkle root of note commitment tree                                                                                               |
| "nullifiers" : [ ... ]  | (array of strings)      | <!--Need these? If not, let's leave a comment here saying why they're not needed, so that next time we don't forget. -->
| "hex"                   | (string)                |
| "commitments" : [ ... ] | (array of strings)      |
| "hex"                   | (string)                |
| "macs" : [ ... ]        | (array of strings)      |
| "hex"                   | (string)                |
| "vpub_old"              | (numeric)               | the amount removed from the transparent value pool                                                                                |
| "vpub_new"              | (numeric)               | the amount added to the transparent value pool                                                                                    |
| "hex"                   | (string)                | transaction data translated into hex                                                                                                          |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli gettransaction "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"
```

Response:

```json
{
  "amount": 0.000001,
  "rawconfirmations": 14,
  "confirmations": 1,
  "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
  "blockindex": 1,
  "blocktime": 1552585479,
  "expiryheight": 1268793,
  "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
  "walletconflicts": [],
  "time": 1552585444,
  "timereceived": 1552585444,
  "vjoinsplit": [],
  "details": [
    {
      "account": "",
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "category": "receive",
      "amount": 0.000001,
      "vout": 1,
      "size": 254
    }
  ],
  "hex": "0400008085202f8901310bd18e1c5de58eed0482e13c855763e83fadb19c1abd330e62c07a13370edf1b0000006a47304402207a607ff3b479317dd41842f024380994ec7e4353c0cb33bff32bc795cfa8a7c202205ff036aeee1760f0677d22155be8210b78ffffb3b03f568304278a914fe6e0d1012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8feffffff0254738e1d00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac64000000000000001976a914522bd057d4304d6204187c99e6dece0c29bdbe9788acce928a5c395c13000000000000000000000000"
}
```

Command:

```bash
./komodo-cli gettransaction "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a" true
```

Response:

```json
{
  "amount": 0.000001,
  "rawconfirmations": 14,
  "confirmations": 1,
  "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
  "blockindex": 1,
  "blocktime": 1552585479,
  "expiryheight": 1268793,
  "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
  "walletconflicts": [],
  "time": 1552585444,
  "timereceived": 1552585444,
  "vjoinsplit": [],
  "details": [
    {
      "account": "",
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "category": "receive",
      "amount": 0.000001,
      "vout": 1,
      "size": 254
    }
  ],
  "hex": "0400008085202f8901310bd18e1c5de58eed0482e13c855763e83fadb19c1abd330e62c07a13370edf1b0000006a47304402207a607ff3b479317dd41842f024380994ec7e4353c0cb33bff32bc795cfa8a7c202205ff036aeee1760f0677d22155be8210b78ffffb3b03f568304278a914fe6e0d1012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8feffffff0254738e1d00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac64000000000000001976a914522bd057d4304d6204187c99e6dece0c29bdbe9788acce928a5c395c13000000000000000000000000"
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettransaction", "params": ["34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "amount": 0.000001,
    "rawconfirmations": 19,
    "confirmations": 1,
    "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
    "blockindex": 1,
    "blocktime": 1552585479,
    "expiryheight": 1268793,
    "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
    "walletconflicts": [],
    "time": 1552585444,
    "timereceived": 1552585444,
    "vjoinsplit": [],
    "details": [
      {
        "account": "",
        "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
        "category": "receive",
        "amount": 0.000001,
        "vout": 1,
        "size": 254
      }
    ],
    "hex": "0400008085202f8901310bd18e1c5de58eed0482e13c855763e83fadb19c1abd330e62c07a13370edf1b0000006a47304402207a607ff3b479317dd41842f024380994ec7e4353c0cb33bff32bc795cfa8a7c202205ff036aeee1760f0677d22155be8210b78ffffb3b03f568304278a914fe6e0d1012103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8feffffff0254738e1d00000000232103336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8ac64000000000000001976a914522bd057d4304d6204187c99e6dece0c29bdbe9788acce928a5c395c13000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

## getunconfirmedbalance

**getunconfirmedbalance**

The `getunconfirmedbalance` method returns the server's total unconfirmed balance.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getunconfirmedbalance
```

Response:

```bash
10.05000000
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getunconfirmedbalance", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 10.05,
  "error": null,
  "id": "curltest"
}
```

## getwalletinfo

**getwalletinfo**

The `getwalletinfo` method returns an object containing various information about the wallet state.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure             | Type      | Description                                                                                                                            |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| "walletversion"       | (numeric) | the wallet version                                                                                                                     |
| "balance"             | (numeric) | the total confirmed balance of the wallet                                                                                              |
| "unconfirmed_balance" | (numeric) | the total unconfirmed balance of the wallet                                                                                            |
| "immature_balance"    | (numeric) | the total immature balance of the wallet                                                                                               |
| "txcount"             | (numeric) | the total number of transactions in the wallet                                                                                         |
| "keypoololdest"       | (numeric) | the timestamp (seconds since GMT epoch) of the oldest pre-generated key in the key pool                                                |
| "keypoolsize"         | (numeric) | how many new keys are pre-generated                                                                                                    |
| "unlocked_until"      | (numeric) | the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked |
| "paytxfee"            | (numeric) | the transaction fee configuration, given as the relevant COIN per KB                                                               |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getwalletinfo
```

Response:

```json
{
  "walletversion": 60000,
  "balance": 10.01334496,
  "unconfirmed_balance": 0.0,
  "immature_balance": 0.0001,
  "txcount": 106,
  "keypoololdest": 1536889653,
  "keypoolsize": 101,
  "paytxfee": 0.0
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwalletinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "walletversion": 60000,
    "balance": 10.01334496,
    "unconfirmed_balance": 0,
    "immature_balance": 0.0001,
    "txcount": 106,
    "keypoololdest": 1536889653,
    "keypoolsize": 101,
    "paytxfee": 0
  },
  "error": null,
  "id": "curltest"
}
```

## importaddress

**importaddress "address" ( "label" rescan )**

The `importaddress` method adds an address or script (in hex) that can be watched as if it were in your wallet, although it cannot be used to spend.

::: tip
This call can take an increased amount of time to complete if rescan is true.
:::

### Arguments:

| Structure | Type                              | Description                        |
| --------- | --------------------------------- | ---------------------------------- |
| "address" | (string, required)                | the address to watch               |
| "label"   | (string, optional, default="")    | an optional label                  |
| rescan    | (boolean, optional, default=true) | rescan the wallet for transactions |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Import an address with rescan:

Command:

```bash
./komodo-cli importaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN"
```

Response:

```bash
(none)
```

Command:

```bash
./komodo-cli importaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" "testing" false
```

Response:

```bash
(none)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importaddress", "params": ["R9z796AehK5b6NCPeVkGUHSpJnawerf8oP", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

## importprivkey

**importkey "komodoprivkey" ( "label" rescan )**

The `importprivkey` method adds a private key to your wallet.

::: tip
This call can take minutes to complete if <b>rescan</b> is true.
:::

::: tip
See also <b>dumpprivkey</b>.
:::

### Arguments:

| Structure | Type                              | Description                                                                |
| --------- | --------------------------------- | -------------------------------------------------------------------------- |
| "privkey" | (string, required)                | the private key (see [dumpprivkey](../komodo-api/wallet.html#dumpprivkey)) |
| "label"   | (string, optional, default="")    | an optional label                                                          |
| rescan    | (boolean, optional, default=true) | rescan the wallet for transactions                                         |

### Response:

| Structure | Type     | Description        |
| --------- | -------- | ------------------ |
| addresses | (string) | the public address |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli importprivkey "DONOTUSExxxxxxxxxxxxxxxxxxxxj4Xu9jjinhLpffhdtoKg5gar2"
```

Response:

```bash
R9z796AehK5b6NCPeVkGUHSpJnawerf8oP
```

Command:

```bash
./komodo-cli importprivkey "DONOTUSExxxxxxxxxxxxxxxxxxxxj4Xu9jjinhLpffhdtoKg5gar2" "testing" false
```

Response:

```bash
RFtA32tttJm89VWRWPCQtV8bkQ1FvE1MBG
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importprivkey", "params": ["UwibHKsYfiM19BXQmcUwAfw331GzGQK8aoPqqYEbyoPrzc2965nE", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "RC5qhqgYRzf3dUXGAst9ah5LcuLjmMgT64",
  "error": null,
  "id": "curltest"
}
```

## importwallet

**importwallet "filename"**

The `importwallet` method imports transparent-address keys from a wallet-dump file (see [dumpwallet](../komodo-api/wallet.html#dumpwallet)).

### Arguments:

| Structure  | Type               | Description     |
| ---------- | ------------------ | --------------- |
| "filename" | (string, required) | the wallet file |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli importwallet "path/to/exportdir/nameofbackup"
```

Response:

```bash
(none)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importwallet", "params": ["path/to/exportdir/nameofbackup"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

## keypoolrefill

**keypoolrefill ( newsize )**

The `keypoolrefill` method refills the keypool.

### Arguments:

| Structure | Type                             | Description          |
| --------- | -------------------------------- | -------------------- |
| newsize   | (numeric, optional, default=100) | the new keypool size |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli keypoolrefill
```

Response:

```bash
(none)
```

Command:

```bash
./komodo-cli keypoolrefill 100
```

Response:

```bash
(none)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "keypoolrefill", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

## listaccounts

**listaccounts ( minconf includeWatchonly )**

::: tip
DEPRECATED
:::

The <b>listaccounts</b> method returns an object that has account names as keys and account balances as values.

### Arguments:

| Structure        | Type                            | Description                                                     |
| ---------------- | ------------------------------- | --------------------------------------------------------------- |
| minconf          | (numeric, optional, default=1)  | only include transactions with at least this many confirmations |
| includeWatchonly | (bool, optional, default=false) | include balances in watchonly addresses (see 'importaddress')   |

### Response:

| Structure        | Type      | Description                                                                               |
| ---------------- | --------- | ----------------------------------------------------------------------------------------- |
| "account_number" | (numeric) | the property name is the account name, and the value is the total balance for the account |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli listaccounts 6
```

Response:

```bash
(deprecated)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaccounts", "params": [6] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(deprecated)
```

## listaddressgroupings

**listaddressgroupings**

The `listaddressgroupings` method lists groups of addresses which have had their common ownership made public by common use as inputs or as the resulting change in past transactions.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure  | Type               | Description              |
| ---------- | ------------------ | ------------------------ |
| "address", | (string)           | the address              |
| amount,    | (numeric)          | the amount               |
| "account"  | (string, optional) | (DEPRECATED) the account |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli listaddressgroupings
```

Response:

(note how there are two separate, unique groupings of addresses)

```bash
[
  [
    [
      "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ",
      9.99304496
    ],
    [
      "RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7",
      0.00040000,
      ""
    ],
    [
      "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN",
      0.01000000
    ]
  ],
  [
    [
      "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
      0.00990000,
      ""
    ]
  ]
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressgroupings", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    [
      ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", 9.99304496],
      ["RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7", 0.0004, ""],
      ["RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN", 0.01]
    ],
    [["RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs", 0.0099, ""]]
  ],
  "error": null,
  "id": "curltest"
}
```

## listlockunspent

**listlockunspent**

The `listlockunspent` method returns a list of temporarily non-spendable outputs.

::: tip
See the <b>lockunspent</b> call to lock and unlock transactions for spending.
:::

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure | Type      | Description               |
| --------- | --------- | ------------------------- |
| "txid"    | (string)  | the transaction id locked |
| "vout"    | (numeric) | the vout value            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli listlockunspent
```

Response:

```json
[
  {
    "txid": "d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd",
    "vout": 0
  }
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listlockunspent", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    {
      "txid": "d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd",
      "vout": 0
    }
  ],
  "error": null,
  "id": "curltest"
}
```

## listreceivedbyaccount

**listreceivedbyaccount ( minconf includeempty includeWatchonly )**

::: warning
DEPRECATED
:::

The `listreceivedbyaccount` method lists balances by account.

### Arguments:

| Structure        | Type                               | Description                                                      |
| ---------------- | ---------------------------------- | ---------------------------------------------------------------- |
| minconf          | (numeric, optional, default=1)     | the minimum number of confirmations before payments are included |
| includeempty     | (boolean, optional, default=false) | whether to include accounts that haven't received any payments   |
| includeWatchonly | (bool, optional, default=false)    | whether to include watchonly addresses (see 'importaddress')     |

### Response:

| Structure           | Type      | Description                                                                                                                       |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| "involvesWatchonly" | (bool)    | only returned if the imported addresses were involved in the transaction                                                                  |
| "account"           | (string)  | the account name of the receiving account                                                                                         |
| "amount"            | (numeric) | the total amount received by addresses with this account                                                                          |
| "confirmations"     | (numeric) | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info |
| "rawconfirmations"  | (numeric) | the raw confirmations of the most recent transaction included (number of blocks on top of this transaction's block)               |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli listreceivedbyaccount
```

Response:

```json
[
  {
    "account": "",
    "amount": 0.000001,
    "rawconfirmations": 21,
    "confirmations": 21
  }
]
```

Command:

```bash
./komodo-cli listreceivedbyaccount 6 true
```

Response:

```json
[
  {
    "account": "",
    "amount": 0.000001,
    "rawconfirmations": 23,
    "confirmations": 23
  }
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaccount", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    {
      "account": "",
      "amount": 0.000001,
      "rawconfirmations": 24,
      "confirmations": 24
    }
  ],
  "error": null,
  "id": "curltest"
}
```

## listreceivedbyaddress

**listreceivedbyaddress ( minconf includeempty includeWatchonly)**

The `listreceivedbyaddress` method lists balances by receiving address.

### Arguments:

| Structure        | Type                               | Description                                                      |
| ---------------- | ---------------------------------- | ---------------------------------------------------------------- |
| minconf          | (numeric, optional, default=1)     | the minimum number of confirmations before payments are included |
| includeempty     | (numeric, optional, default=false) | whether to include addresses that haven't received any payments  |
| includeWatchonly | (bool, optional, default=false)    | whether to include watchonly addresses (see 'importaddress')     |

### Response:

| Structure           | Type      | Description                                                                                                                       |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| "involvesWatchonly" | (bool)    | only returned if imported addresses were involved in transaction                                                                  |
| "address"           | (string)  | the receiving address                                                                                                             |
| "account"           | (string)  | DEPRECATED the account of the receiving address; the default account is ""                                                        |
| "amount"            | (numeric) | the total amount received by the address                                                                                          |
| "confirmations"     | (numeric) | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info |
| "rawconfirmations"  | (numeric) | the raw confirmations of the most recent transaction included (number of blocks on top of this transaction's block)               |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli listreceivedbyaddress
```

Response:

```json
[
  {
    "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
    "account": "",
    "amount": 0.000001,
    "rawconfirmations": 40,
    "confirmations": 40,
    "txids": [
      "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"
    ]
  }
]
```

Command:

```bash
./komodo-cli listreceivedbyaddress 6 true
```

Response:

```json
[
  {
    "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
    "account": "",
    "amount": 0.000001,
    "rawconfirmations": 41,
    "confirmations": 41,
    "txids": [
      "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"
    ]
  },
  {
    "address": "RSMmyzk2cZ7xJdDx62wAZbvM5dzxH8CPqv",
    "account": "",
    "amount": 0.0,
    "rawconfirmations": 0,
    "confirmations": 0,
    "txids": []
  },
  {
    "address": "RVErfGzpdNSLrg19FVAuet6nXGDaWnqiVc",
    "account": "",
    "amount": 0.0,
    "rawconfirmations": 0,
    "confirmations": 0,
    "txids": []
  }
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaddress", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    {
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "account": "",
      "amount": 0.000001,
      "rawconfirmations": 41,
      "confirmations": 41,
      "txids": [
        "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a"
      ]
    },
    {
      "address": "RSMmyzk2cZ7xJdDx62wAZbvM5dzxH8CPqv",
      "account": "",
      "amount": 0.0,
      "rawconfirmations": 0,
      "confirmations": 0,
      "txids": []
    },
    {
      "address": "RVErfGzpdNSLrg19FVAuet6nXGDaWnqiVc",
      "account": "",
      "amount": 0.0,
      "rawconfirmations": 0,
      "confirmations": 0,
      "txids": []
    }
  ],
  "error": null,
  "id": "curltest"
}
```

## listsinceblock

**listsinceblock ( "blockhash" target-confirmations includeWatchonly )**

The `listsinceblock` method queries all transactions in blocks since block `blockhash`, or all transactions if `blockhash` is omitted.

### Arguments:

| Structure            | Type                            | Description                                                            |
| -------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| "blockhash"          | (string, optional)              | the block hash from which to list transactions                         |
| target-confirmations | (numeric, optional)             | the confirmations required (must be 1 or more)                         |
| includeWatchonly     | (bool, optional, default=false) | include transactions to watchonly addresses (see also 'importaddress') |

### Response:

| Structure          | Type      | Description                                                                                                                                                                                                        |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "transactions":    |           |
| "account"          | (string)  | DEPRECATED the account name associated with the transaction; will be "" for the default account                                                                                                                    |
| "address"          | (string)  | the address of the transaction (not present for move transactions -- category = move)                                                                                                                              |
| "category"         | (string)  | the transaction category; `send` has negative amounts, `receive` has positive amounts                                                                                                                              |
| "amount"           | (numeric) | the amount of the relevant currency -- negative for the `send` category, and for the `move` category for moves outbound. It is positive for the `receive` category, and for the `move` category for inbound funds. |
| "vout"             | (numeric) | the vout value                                                                                                                                                                                                     |
| "fee"              | (numeric) | the amount of the fee; this value is negative and only available for the `send` category of transactions                                                                                                           |
| "confirmations"    | (numeric) | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info                                                                                  |
| "rawconfirmations" | (numeric) | the raw confirmations of the transaction; available for `send` and `receive` category of transactions (number of blocks on top of this transaction's block)                                                        |
| "blockhash"        | (string)  | the block hash containing the transaction; available for the `send` and `receive` categories of transactions                                                                                                       |
| "blockindex"       | (numeric) | the block index containing the transaction; available for the `send` and `receive` categories of transactions                                                                                                      |
| "blocktime"        | (numeric) | the block time in seconds since epoch (1 Jan 1970 GMT)                                                                                                                                                             |
| "txid"             | (string)  | the transaction id; available for `send` and `receive` categories of transactions                                                                                                                                  |
| "time"             | (numeric) | the transaction time in seconds since epoch (Jan 1 1970 GMT)                                                                                                                                                       |
| "timereceived"     | (numeric) | the time received in seconds since epoch (Jan 1 1970 GMT); available for `send` and `receive` category of transactions                                                                                             |
| "comment"          | (string)  | whether a comment is associated with the transaction                                                                                                                                                               |
| "to"               | (string)  | whether a 'to' comment is associated with the transaction                                                                                                                                                          |
| "lastblock"        | (string)  | the hash of the last block                                                                                                                                                                                         |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli listsinceblock
```

Response:

```json
{
  "transactions": [
    {
      "account": "",
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "category": "receive",
      "amount": 0.000001,
      "vout": 1,
      "rawconfirmations": 44,
      "confirmations": 44,
      "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
      "blockindex": 1,
      "blocktime": 1552585479,
      "expiryheight": 1268793,
      "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
      "walletconflicts": [],
      "time": 1552585444,
      "timereceived": 1552585444,
      "vjoinsplit": [],
      "size": 254
    }
  ],
  "lastblock": "05686392a3011a180988246b3b0343bc4eec992c101d2e651c6ee786af1b2fb5"
}
```

Command:

```bash
./komodo-cli listsinceblock "029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327" 6
```

Response:

```json
{
  "transactions": [
    {
      "account": "",
      "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
      "category": "receive",
      "amount": 0.000001,
      "vout": 1,
      "rawconfirmations": 45,
      "confirmations": 45,
      "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
      "blockindex": 1,
      "blocktime": 1552585479,
      "expiryheight": 1268793,
      "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
      "walletconflicts": [],
      "time": 1552585444,
      "timereceived": 1552585444,
      "vjoinsplit": [],
      "size": 254
    }
  ],
  "lastblock": "08db1a09b32ebb55f026c41d5555281ebeae4c9eb8b36e88db62b6f1d7fd12d1"
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": ["029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "transactions": [
      {
        "account": "",
        "address": "RGmfyV6GLkNXTSM5XaxtpwPrw4R7iiHEa2",
        "category": "receive",
        "amount": 0.000001,
        "vout": 1,
        "rawconfirmations": 46,
        "confirmations": 46,
        "blockhash": "07eb80d845eae646a95351a47a1b54964610f3caf4d4ff53750d0de66fbfc525",
        "blockindex": 1,
        "blocktime": 1552585479,
        "expiryheight": 1268793,
        "txid": "34efdb82ec718dede04feccecdc44f119cb7263f11c56ec3d7bf6234c9d0e27a",
        "walletconflicts": [],
        "time": 1552585444,
        "timereceived": 1552585444,
        "vjoinsplit": [],
        "size": 254
      }
    ],
    "lastblock": "01b4ce6c4659138de1a7a67e8dac354b5acc3a998145effedbfec7ef41a2cec6"
  },
  "error": null,
  "id": "curltest"
}
```

## listtransactions

**listtransactions ( "account" count from includeWatchonly )**

The `listtransactions` method returns up to `count` most recent transactions skipping the first `from` transactions for `account`.

### Arguments:

| Structure        | Type                            | Description                                                       |
| ---------------- | ------------------------------- | ----------------------------------------------------------------- |
| "account"        | (string, optional)              | DEPRECATED the account name; should be `"*"`                      |
| count            | (numeric, optional, default=10) | the number of transactions to return                              |
| from             | (numeric, optional, default=0)  | the number of transactions to skip                                |
| includeWatchonly | (bool, optional, default=false) | include transactions to watchonly addresses (see `importaddress`) |

### Response:

| Structure          | Type      | Description                                                                                                                                                                                          |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "account"          | (string)  | DEPRECATED the account name associated with the transaction; it will be "" for the default account                                                                                                   |
| "address"          | (string)  | the address of the transaction; not present for move transactions (category = move)                                                                                                                  |
| "category"         | (string)  | The transaction category. This property can be `send`                                                                                                                                                | `receive` | `move`. `move` is a local (off blockchain) transaction between accounts -- not associated with an address, transaction id, or block. `send` and `receive` transactions are associated with an address, transaction id, and block details. |
| "amount"           | (numeric) | The amount. This value is negative for the `send` category, and for the `move` category for moves outbound. It is positive for the `receive` category and for the `move` category for inbound funds. |
| "vout"             | (numeric) | the vout value                                                                                                                                                                                       |
| "fee"              | (numeric) | the amount of the fee; this is negative and only available for the `send` category of transactions                                                                                                   |
| "confirmations"    | (numeric) | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info                                                                    |
| "rawconfirmations" | (numeric) | the raw confirmations of the transaction; available for `send` and `receive` category of transactions (number of blocks on top of this transaction's block)                                          |
| "blockhash"        | (string)  | the block hash containing the transaction; available for the `send` and `receive` categories of transactions                                                                                         |
| "blockindex"       | (numeric) | the block index containing the transaction; available for the `send` and `receive` categories of transactions                                                                                        |
| "txid"             | (string)  | the transaction id; available for the `send` and `receive` categories of transactions                                                                                                                |
| "time"             | (numeric) | the transaction time in seconds since epoch (midnight Jan 1 1970 GMT)                                                                                                                                |
| "timereceived"     | (numeric) | the time received in seconds since epoch (midnight Jan 1 1970 GMT); available for the `send` and `receive` categories of transactions                                                                |
| "comment"          | (string)  | whether a comment is associated with the transaction                                                                                                                                                 |
| "otheraccount"     | (string)  | for the `move` category of transactions; indicates the account which sent the funds (for receiving funds, positive amounts), or went to (for sending funds, negative amounts)                        |
| "size"             | (numeric) | transaction size in bytes                                                                                                                                                                            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli listtransactions
```

Response:

```json
[
  {
    "account": "",
    "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
    "category": "generate",
    "amount": 0.00010000,
    "vout": 0,
    "rawconfirmations": 99,
    "confirmations": 99,
    "generated": true,
    "blockhash": "0eb4edeb5141a7670ef8be413873e1bef4f6f321867a2b8d67a616cdc7df1e77",
    "blockindex": 0,
    "blocktime": 1536976212,
    "expiryheight": 0,
    "txid": "3041aa7374e530d4d28e14620dd2bb9d2ff0bf71dd1106f08bc9f02fce44598e",
    "walletconflicts": [
    ],
    "time": 1536976211,
    "timereceived": 1536976211,
    "vjoinsplit": [
    ],
    "size": 99
  }
  , ... (9 responses ommitted from documentation for brevity)
]
```

Command:

```bash
./komodo-cli listtransactions "*" 20 100
```

Response:

```json
[
  {
    "account": "",
    "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
    "category": "generate",
    "amount": 0.00010000,
    "vout": 0,
    "rawconfirmations": 99,
    "confirmations": 99,
    "generated": true,
    "blockhash": "0eb4edeb5141a7670ef8be413873e1bef4f6f321867a2b8d67a616cdc7df1e77",
    "blockindex": 0,
    "blocktime": 1536976212,
    "expiryheight": 0,
    "txid": "3041aa7374e530d4d28e14620dd2bb9d2ff0bf71dd1106f08bc9f02fce44598e",
    "walletconflicts": [
    ],
    "time": 1536976211,
    "timereceived": 1536976211,
    "vjoinsplit": [
    ],
    "size": 99
  }
  , ... (9 responses ommitted from documentation for brevity)
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtransactions", "params": ["*", 20, 100] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  [
    {
      "account": "",
      "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
      "category": "generate",
      "amount": 0.0001,
      "vout": 0,
      "rawconfirmations": 99,
      "confirmations": 99,
      "generated": true,
      "blockhash": "0eb4edeb5141a7670ef8be413873e1bef4f6f321867a2b8d67a616cdc7df1e77",
      "blockindex": 0,
      "blocktime": 1536976212,
      "expiryheight": 0,
      "txid": "3041aa7374e530d4d28e14620dd2bb9d2ff0bf71dd1106f08bc9f02fce44598e",
      "walletconflicts": [],
      "time": 1536976211,
      "timereceived": 1536976211,
      "vjoinsplit": [],
      "size": 99
    }
    , ... (9 responses ommitted from documentation for brevity)
  ],
  "error": null,
  "id": "curltest"
}
```

## listunspent

**listunspent ( minconf maxconf ["address", ... ] )**

The `listunspent` method returns an array of unspent transaction outputs, with a range between `minconf` and `maxconf` (inclusive) confirmations. The method can, optionally, filter to only include `txouts` paid to specified addresses.

### Arguments:

| Structure | Type                                 | Description                         |
| --------- | ------------------------------------ | ----------------------------------- |
| minconf   | (numeric, optional, default=1)       | the minimum confirmations to filter |
| maxconf   | (numeric, optional, default=9999999) | the maximum confirmations to filter |
| "address" | (string)                             | a series of addresses               |

### Response:

| Structure          | Type      | Description                                                                                                                       |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| "txid"             | (string)  | the transaction id                                                                                                                |
| "vout"             | (numeric) | the vout value                                                                                                                    |
| "generated"        | (boolean) | true if txout is a coinbase transaction output                                                                                    |
| "address"          | (string)  | the address                                                                                                                       |
| "account"          | (string)  | DEPRECATED the associated account, or "" for the default account                                                                  |
| "scriptPubKey"     | (string)  | the script key                                                                                                                    |
| "amount"           | (numeric) | the transaction amount                                                                                                            |
| "confirmations"    | (numeric) | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info |
| "rawconfirmations" | (numeric) | the raw confirmations (number of blocks on top of this transaction's block)                                                       |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli listunspent
```

Response:

```json
[
  {
    "txid": "269b658b9a52e9142c96f3a49c0ad917e5d0c08126baa96713827267137d150f",
    "vout": 0,
    "generated": true,
    "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
    "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
    "amount": 0.00010000,
    "interest": 0.00000000,
    "rawconfirmations": 6,
    "confirmations": 1,
    "spendable": true
  },
    ...
]
```

Command:

```bash
./komodo-cli listunspent 6 9999999 '["RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu","RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"]'
```

Response:

```json
[
  {
    "txid": "0ca752c996c4074ca62071cdbf848ccd33864894151f982024006b3d69d021ac",
    "vout": 0,
    "generated": true,
    "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
    "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
    "amount": 0.0001,
    "interest": 0.0,
    "rawconfirmations": 7,
    "confirmations": 1,
    "spendable": true
  },
  {
    "txid": "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa",
    "vout": 0,
    "generated": false,
    "address": "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ",
    "scriptPubKey": "76a9141c973dbbed002e189caf31664d9ca7e8b1e92d8788ac",
    "amount": 9.99304496,
    "interest": 0.0,
    "rawconfirmations": 21,
    "confirmations": 21,
    "spendable": true
  }
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listunspent", "params": [6, 9999999, ["RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu","RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    {
      "txid": "0ca752c996c4074ca62071cdbf848ccd33864894151f982024006b3d69d021ac",
      "vout": 0,
      "generated": true,
      "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
      "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
      "amount": 0.0001,
      "interest": 0.0,
      "rawconfirmations": 7,
      "confirmations": 7,
      "spendable": true
    },
    {
      "txid": "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa",
      "vout": 0,
      "generated": false,
      "address": "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ",
      "scriptPubKey": "76a9141c973dbbed002e189caf31664d9ca7e8b1e92d8788ac",
      "amount": 9.99304496,
      "interest": 0.0,
      "rawconfirmations": 21,
      "confirmations": 21,
      "spendable": true
    }
  ],
  "error": null,
  "id": "curltest"
}
```

## lockunspent

**lockunspent unlock [{ "txid": "txid", "vout": n }, ... ]**

The `lockunspent` method locks (unlock = `false`) or unlocks (unlock = `true`) specified transaction outputs. A locked transaction output will not be chosen by automatic coin selection, when spending the relevant coin. The locks are stored in memory only; at runtime a node always starts with zero locked outputs, and the locked output list is always cleared when a node stops or fails.

::: tip
See the <b>listunspent</b> and <b>listlockunspent</b> calls to determine local transaction state and info.
:::

### Arguments:

| Structure | Type                | Description                                                         |
| --------- | ------------------- | ------------------------------------------------------------------- |
| unlock    | (boolean, required) | whether to unlock (true) or lock (false) the specified transactions |
| "txid"    | (string)            | the transaction id                                                  |
| "vout"    | (numeric)           | the output number                                                   |

### Response:

| Structure  | Type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| true/false | (boolean) | whether the command was successful |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli lockunspent false '[{"txid":"d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd","vout":0}]'
```

Response:

```bash
true
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "lockunspent", "params": [false, [{"txid":"d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd","vout":0}]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": true,
  "error": null,
  "id": "curltest"
}
```

## move

**move "fromaccount" "toaccount" amount ( minconf "comment" )**

::: tip
DEPRECATED
:::

The `move` method moves a specified amount from one account in your wallet to another.

### Arguments:

| Structure     | Type                           | Description                                                                                                           |
| ------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| "fromaccount" | (string, required)             | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error |
| "toaccount"   | (string, required)             | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error |
| amount        | (numeric)                      | the quantity to move between accounts                                                                                 |
| minconf       | (numeric, optional, default=1) | only use funds with at least this many confirmations                                                                  |
| "comment"     | (string, optional)             | an optional comment, stored in the wallet only                                                                        |

### Response:

| Structure  | Type      | Description        |
| ---------- | --------- | ------------------ |
| true/false | (boolean) | true if successful |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli move "" "tabby" 0.01
```

Response:

```bash
(deprecated)
```

Command:

```bash
./komodo-cli move "timotei" "akiko" 0.01 6 "happy birthday!"
```

Response:

```bash
(deprecated)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "move", "params": ["timotei", "akiko", 0.01, 6, "happy birthday!"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(deprecated)
```

## resendwallettransactions

**resendwallettransactions**

The `resendwallettransactions` method immediately re-broadcasts unconfirmed wallet transactions to all peers. This method is intended only for testing; the wallet code periodically re-broadcasts automatically.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure        | Type     | Description                                    |
| ---------------- | -------- | ---------------------------------------------- |
| "transaction_id" | (string) | an array of the rebroadcasted transaction id's |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli resendwallettransactions
```

Response:

```bash
[
  "4e847051279ead30fb2d8d53cc0d4649f62c85a44b23f90152d2ef4ed6af2006"
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "resendwallettransactions", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    "4e847051279ead30fb2d8d53cc0d4649f62c85a44b23f90152d2ef4ed6af2006"
  ],
  "error": null,
  "id": "curltest"
}
```

## sendfrom

**sendfrom "account" "address" amount ( minconf "comment" "comment-to" )**

::: tip
DEPRECATED: Use <b>sendtoaddress</b> instead.
:::

The `sendfrom` method sends an amount from `account` to `address`.

### Arguments:

| Structure    | Type                           | Description                                                                                                                                                                      |
| ------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "account"    | (string, required)             | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error                                                            |
| "address"    | (string, required)             | the address to receive funds                                                                                                                                                     |
| amount       | (numeric, required)            | the amount (transaction fee not included)                                                                                                                                        |
| minconf      | (numeric, optional, default=1) | only use funds with at least this many confirmations                                                                                                                             |
| "comment"    | (string, optional)             | a comment used to store what the transaction is for; this is not part of the transaction, just kept in your wallet                                                               |
| "comment-to" | (string, optional)             | an optional comment to store the name of the person or organization to which you're sending the transaction; this is not part of the transaction, it is only kept in your wallet |

### Response:

| Structure        | Type     | Description        |
| ---------------- | -------- | ------------------ |
| "transaction_id" | (string) | the transaction id |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli sendfrom "" "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu" 0.01
```

Response:

```bash
(deprecated)
```

Command:

```bash
./komodo-cli sendfrom "tabby" "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu" 0.01 6 "donation" "seans outpost"
```

Response:

```bash
(deprecated)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendfrom", "params": ["tabby", "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu", 0.01, 6, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(deprecated)
```

## sendmany

**sendmany "account" { "address": amount, ... } ( minconf "comment" [ "address", ... ] )**

The `sendmany` method can send multiple transactions at once. Amounts are double-precision floating point numbers.

### Arguments:

| Structure                           | Type                           | Description                                                                                                                                                                                                                                               |
| ----------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "account"                           | (string, required)             | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error                                                                                                                                     |
| "amounts" { "address":amount, ... } | ("string":numeric)             | the address (string) and the value (double-precision floating numeric)                                                                                                                                                                                    |
| minconf                             | (numeric, optional, default=1) | only use the balance confirmed at least this many times                                                                                                                                                                                                   |
| "comment"                           | (string, optional)             | a comment                                                                                                                                                                                                                                                 |
| subtractfeefromamount               | (string, optional)             | a json array with addresses. The fee will be equally deducted from the amount of each selected address; the recipients will receive less than you enter in their corresponding amount field. If no addresses are specified here, the sender pays the fee. |
| "address"                           | (string)                       | subtract fee from this address                                                                                                                                                                                                                            |

### Response:

| Structure        | Type     | Description                                                                                          |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| "transaction_id" | (string) | the transaction id for the send; only 1 transaction is created regardless of the number of addresses |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}'
```

Response:

```bash
e39b046f0e30bd2a80c64ec78d902107858c8f0d55097d7f2293df1c9a4496ae
```

Command:

```bash
./komodo-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}' 6 "testing"
```

Response:

```bash
3829164d8a68d9b7c2c89efe419eca77e37883318b7187b7e000e80e8138a370
```

Command:

```bash
./komodo-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}' 1 "" '["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ","RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu"]'
```

Response:

```bash
1813a39247913abf73af10ed51537234fe4e58eb5cfc4f49ac4fbcdecb42b4b4
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendmany", "params": ["", {"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}, 6, "testing"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "fe7db27ed66b9d999c21d3cc9c8c687bd68721d711da6573a0a0ccf75c1cace5",
  "error": null,
  "id": "curltest"
}
```

## sendtoaddress

**sendtoaddress "address" amount ( "comment" "comment-to" subtractfeefromamount )**

The `sendtoaddress` method sends an amount to a given address. The amount is real and is rounded to the nearest 0.00000001.

### Arguments:

| Structure             | Type                               | Description                                                                                                                                      |
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| "komodoaddress"       | (string, required)                 | the receiving address                                                                                                                            |
| "amount"              | (numeric, required)                | the amount to send (json requires all decimals values less than 1 begin with the characters '0.')                                                |
| "comment"             | (string, optional)                 | a comment used to store what the transaction is for; this is not part of the transaction, just kept in your wallet                               |
| "comment-to"          | (string, optional)                 | a comment to store the name of the person or organization to which you're sending the transaction; this is stored in your local wallet file only |
| subtractfeefromamount | (boolean, optional, default=false) | when `true`, the fee will be deducted from the amount being sent                                                                                 |

### Response:

| Structure        | Type     | Description        |
| ---------------- | -------- | ------------------ |
| "transaction_id" | (string) | the transaction id |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1
```

Response:

```bash
cc23924c007adc98b8ea5b9b8b47638e080aa469eb9738b976def487a44f467b
```

Command:

```bash
./komodo-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1 "donation" "seans outpost"
```

Response:

```bash
86948c27dc63be415b235c5b3ed807c1e07d9a2cac252f58734add700c55fe18
```

Command:

```bash
./komodo-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1 "" "" true
```

Response:

```bash
c5727cafd7d6dfc888d4a0596dc58bfafb24859e29f827e1bf1443037d8461fc
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", 0.1, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "6e411f3534af8847d705d87934f6061046e2034abad96b7a1fb1d3996129cb1e",
  "error": null,
  "id": "curltest"
}
```

## setaccount

**setaccount "address" "account"**

::: tip Notice
DEPRECATED
:::

The `setaccount` method sets the account associated with the given address.

### Arguments:

| Structure | Type               | Description                                                                                                           |
| --------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| "address" | (string, required) | the address to be associated with an account                                                                          |
| "account" | (string, required) | MUST be set to the empty string "" to represent the default account; passing any other string will result in an error |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli setaccount "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "tabby"
```

Response:

```bash
(deprecated)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setaccount", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", "tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(deprecated)
```

## setpubkey

**setpubkey pubkey**

The `setpubkey` method sets the indicated `pubkey`. This method can be used in place of the [pubkey](../installations/common-runtime-parameters.html#pubkey) launch parameter, when necessary.

Visit the section [pubkey](../installations/common-runtime-parameters.html#pubkey) to understand when it is essential to set a pubkey and the consequences of setting it.

::: warning
This method works only once per daemon start. It can't be used to change the pubkey that has already been set.
:::

### Arguments:

| Structure | Type     | Description        |
| --------- | -------- | ------------------ |
| pubkey    | (string) | the desired pubkey |

### Response:

| Structure | Type      | Description                                       |
| --------- | --------- | ------------------------------------------------- |
| pubkey    | (string)  | the pubkey                                        |
| ismine    | (boolean) | indicates whether the address belongs to the user |
| R-address | (string)  | the public address associated with the pubkey     |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli setpubkey 0260801166cebdc9be1e3460ba9e4959fb29feee7725f565ffc296fa4636aa706f
```

Response:

```bash
{
  "address": "RK47DQhSHJEMGFSiRtgki67xG3u1Qsq1Gw",
  "ismine": true,
  "pubkey": "0260801166cebdc9be1e3460ba9e4959fb29feee7725f565ffc296fa4636aa706f"
}
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setpubkey", "params": ["02f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193e"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
{
  "result": {
    "address": "RK47DQhSHJEMGFSiRtgki67xG3u1Qsq1Gw",
    "ismine": true,
    "pubkey": "0260801166cebdc9be1e3460ba9e4959fb29feee7725f565ffc296fa4636aa706f"
  },
  "error": null,
  "id": "curltest"
}
```

## settxfee

**settxfee amount**

The `settxfee` method sets the transaction fee per kB.

### Arguments:

| Structure | Type                | Description                                                      |
| --------- | ------------------- | ---------------------------------------------------------------- |
| amount    | (numeric, required) | the transaction fee in COIN/kB rounded to the nearest 0.00000001 |

### Response:

| Structure  | Type      | Description                |
| ---------- | --------- | -------------------------- |
| true/false | (boolean) | returns true if successful |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli settxfee 0.00001
```

Response:

```bash
true
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "settxfee", "params": [0.00001] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": true,
  "error": null,
  "id": "curltest"
}
```

## signmessage

**signmessage "address" "message"**

The `signmessage` method signs a message via the private key of an address.

### Arguments:

| Structure | Type               | Description                            |
| --------- | ------------------ | -------------------------------------- |
| "address" | (string, required) | the address to use for the private key |
| "message" | (string, required) | the message                            |

### Response:

| Structure   | Type     | Description                                     |
| ----------- | -------- | ----------------------------------------------- |
| "signature" | (string) | the signature of the message encoded in base 64 |

#### :pushpin: Examples:

Create the signature:

Command:

```bash
./komodo-cli signmessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "my message"
```

Response:

```bash
H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=
```

Verify the signature:

Command:

```bash
./komodo-cli verifymessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=" "my message"
```

Response:

```bash
true
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessage", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=",
  "error": null,
  "id": "curltest"
}
```

## walletlock

**walletlock**

::: tip
The `walletlock` method is neither active nor visible in the `help` method until the [encryptwallet](../komodo-api/wallet.html#encryptwallet) passphrase is set.
:::

:::tip
This feature is available only on chains where `-ac_public` is enabled. Chains that feature private transactions cannot use this feature.
:::

The `walletlock` method re-locks a wallet that has a passphrase enabled via [encryptwallet](../komodo-api/wallet.html#encryptwallet).

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli walletlock
```

Response:

```bash
(none)
```

## walletpassphrase

**walletpassphrase "passphrase" (timeout)**

::: tip
The `walletpassphrase` method is neither active nor visible in the `help` method until the [encryptwallet](../komodo-api/wallet.html#encryptwallet) passphrase is set.
:::

:::tip
This feature is available only on chains where `-ac_public` is enabled. Chains that feature private transactions cannot use this feature.
:::

The `walletpassphrase` method unlocks the wallet using the passphrase that was set by the [encryptwallet](../komodo-api/wallet.html#encryptwallet) method.

The `timeout` argument can be included to limit the length of time (in seconds) the wallet will remain unlocked.

### Arguments:

| Structure    | Type                          | Description                                                            |
| ------------ | ----------------------------- | ---------------------------------------------------------------------- |
| "passphrase" | (string)                      | the passphrase that was set by the `encryptwallet` method              |
| timeout      | (number in seconds, optional) | the amount of time for which the wallet should remember the passphrase |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli walletpassphrase
```

Response:

```bash
(none)
```

## walletpassphrasechange

**walletpassphrasechange "oldpassphrase" "newpassphrase"**

::: tip
The `walletpassphrasechange` method is neither active nor visible in the `help` method until the [encryptwallet](../komodo-api/wallet.html#encryptwallet) passphrase is set.
:::

:::tip
This feature is available only on chains where `-ac_public` is enabled. Chains that feature private transactions cannot use this feature.
:::

The `walletpassphrasechange` method changes `"oldpassphrase"` to `"newpassphrase"`.

### Arguments:

| Structure       | Type     | Description        |
| --------------- | -------- | ------------------ |
| "oldpassphrase" | (string) | the old passphrase |
| "newpassphrase" | (string) | the new passphrase |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli walletpassphrasechange "oldpassphrase" "newpassphrase"
```

Response:

```bash
(none)
```

## z_exportkey

**z_exportkey "z_address"**

The `z_exportkey` method reveals the private z_key corresponding to `z_address`.

::: tip
See also <b>z_importkey</b>.
:::

### Arguments:

| Structure   | Type               | Description                       |
| ----------- | ------------------ | --------------------------------- |
| "z_address" | (string, required) | the z_address for the private key |

### Response:

| Structure | Type     | Description     |
| --------- | -------- | --------------- |
| "key"     | (string) | the private key |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_exportkey "ztffWAUUY9PnLiBVXY2pnX67kfm71SevtPC5d9LLM3xZqehy4XxV1FeyxPWcHGTiCd7GtQ17gk5jDTQxhHB13K1A7HT6hZH"
```

Response:

```bash
DONOTUSExxxxxxxxxxxxxxxxV6EyPpaZFVDsqeNB6k8eoLFERdag
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_exportkey", "params": ["ztffWAUUY9PnLiBVXY2pnX67kfm71SevtPC5d9LLM3xZqehy4XxV1FeyxPWcHGTiCd7GtQ17gk5jDTQxhHB13K1A7HT6hZH"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "DONOTUSExxxxxxxxxxxxxxxxV6EyPpaZFVDsqeNB6k8eoLFERdag",
  "error": null,
  "id": "curltest"
}
```

## z_exportviewingkey

**z_exportviewingkey "z_address"**

The `z_exportviewingkey` method reveals the viewing key corresponding to `z_address`.

::: tip
See also <b>z_importviewingkey</b>.
:::

### Arguments:

| Structure   | Type               | Description                       |
| ----------- | ------------------ | --------------------------------- |
| "z_address" | (string, required) | the z_address for the viewing key |

### Response:

| Structure | Type     | Description     |
| --------- | -------- | --------------- |
| "vkey"    | (string) | the viewing key |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_exportviewingkey "ztffWAUUY9PnLiBVXY2pnX67kfm71SevtPC5d9LLM3xZqehy4XxV1FeyxPWcHGTiCd7GtQ17gk5jDTQxhHB13K1A7HT6hZH"
```

Response:

```bash
ZiVtf1yjjR9DeDNNgd4kvRgS1oovQwfK6xt2csfhTwpbUVjnC9RrEeuVkAfJrxN1jDR3d7vR6XmLne4vC9SCYR5F9XMzW19VJ
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_exportviewingkey", "params": ["ztffWAUUY9PnLiBVXY2pnX67kfm71SevtPC5d9LLM3xZqehy4XxV1FeyxPWcHGTiCd7GtQ17gk5jDTQxhHB13K1A7HT6hZH"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "ZiVtf1yjjR9DeDNNgd4kvRgS1oovQwfK6xt2csfhTwpbUVjnC9RrEeuVkAfJrxN1jDR3d7vR6XmLne4vC9SCYR5F9XMzW19VJ",
  "error": null,
  "id": "curltest"
}
```

## z_exportwallet

**z_exportwallet "filename"**

The `z_exportwallet` method exports all wallet keys, including both t address and z address types, in a human-readable format. Overwriting an existing file is not permitted.

### Arguments:

| Structure  | Type               | Description                                                                                                                                                         |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "filename" | (string, required) | the filename, saved to the directory indicated by the [exportdir](../installations/common-runtime-parameters.html#exportdir) parameter at daemon runtime (required) |

### Response:

| Structure | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| "path"    | (string) | the full path of the destination file |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_exportwallet "test"
```

Response:

```bash
/home/myusername/mydirectory/test
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_exportwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "/home/myusername/mydirectory/test",
  "error": null,
  "id": "curltest"
}
```

## z_getbalance

**z_getbalance "address" ( minconf )**

The `z_getbalance` method returns the balance of a t address or z address belonging to the node’s wallet.

::: warning
CAUTION: If <b>address</b> is a watch-only z address, the returned balance may be larger than the actual balance,
as spends cannot be detected with incoming viewing keys.
:::

### Arguments:

| Structure | Type                           | Description                                                  |
| --------- | ------------------------------ | ------------------------------------------------------------ |
| "address" | (string)                       | the selected z or t address                                  |
| minconf   | (numeric, optional, default=1) | only include transactions confirmed at least this many times |

### Response:

| Structure | Type      | Description                                                            |
| --------- | --------- | ---------------------------------------------------------------------- |
| amount    | (numeric) | the total amount received at this address (in the relevant COIN value) |

#### :pushpin: Examples:

The total amount received by address "myaddress" at least 5 blocks confirmed

Command:

```bash
./komodo-cli z_getbalance "ztfF6SFBfq2qha73dAgsXnL86F8air32CXKxJg8aYtEPJFdLcw4y3zWzBasocnx1V9GLnnFeKnkPvkScjNkQBfWn2kBDmkn"
```

Response:

```bash
0.01980000
```

Command:

```bash
./komodo-cli z_getbalance "ztfF6SFBfq2qha73dAgsXnL86F8air32CXKxJg8aYtEPJFdLcw4y3zWzBasocnx1V9GLnnFeKnkPvkScjNkQBfWn2kBDmkn" 5
```

Response:

```bash
0.01980000
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getbalance", "params": ["ztfF6SFBfq2qha73dAgsXnL86F8air32CXKxJg8aYtEPJFdLcw4y3zWzBasocnx1V9GLnnFeKnkPvkScjNkQBfWn2kBDmkn", 5] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 0.0198,
  "error": null,
  "id": "curltest"
}
```

## z_getnewaddress

**z_getnewaddress**

The `z_getnewaddress` method returns a new z_address for receiving payments.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure   | Type     | Description       |
| ----------- | -------- | ----------------- |
| "z_address" | (string) | the new z_address |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_getnewaddress
```

Response:

```bash
ztbUD83kXgHt3A1M282wFvT9Ms6SiBCd6GSbQbPa2C7UtPojVZjPENytFqu7JxgnsgL9EN42xWnyhhzniHYSRJDnEPTgo3Y
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3",
  "error": null,
  "id": "curltest"
}
```

## z_getoperationresult

**z_getoperationresult ([ "operationid", ... ])**

The `z_getoperationresult` method retrieves the result and status of an operation which has finished, and then removes the operation from memory.

::: tip
See also <b>z_getoperationstatus</b>.
:::

### Arguments:

| Structure     | Type               | Description                                                                                             |
| ------------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| "operationid" | (string, optional) | a list of operation ids to query; if not provided, the method examines all operations known to the node |

### Response:

| Structure          | Type                    | Description                                                |
| ------------------ | ----------------------- | ---------------------------------------------------------- |
| "id"               | (string)                | the operation id                                           |
| "status"           | (string)                | the result of the operation; can be `success`              | `failed` | `executing` |
| "creation_time"    | (numeric)               | the creation time, in seconds since epoch (Jan 1 1970 GMT) |
| "result": { ... }  | (array of json objects) |
| "txid":            | (string)                | the transaction id                                         |
| "execution_secs"   | (numeric)               | the length of time to calculate the transaction            |
| "method"           | (string)                | the name of the method used in the operation               |
| "params": { ... }  | (json)                  |
| "fromaddress"      | (string)                | the address from which funds are drawn                     |
| "amounts": [ ... ] | (array of json objects) |
| "address"          | (string)                | the receiving address                                      |
| "amount"           | (numeric)               | the amount to receive                                      |
| "minconf"          | (numeric)               | the minimum number of confirmations required               |
| "fee"              | (numeric)               | the transaction fee                                        |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_getoperationresult '["opid-6e581ee5-4e90-4e70-8961-f95d8d28748c"]'
```

Response:

```json
[
  {
    "id": "opid-6e581ee5-4e90-4e70-8961-f95d8d28748c",
    "status": "success",
    "creation_time": 1537287690,
    "result": {
      "txid": "65e01c8485f6a85fbf7093d8233864eed0f31e6e2eff22a7e468e92c37dc864c"
    },
    "execution_secs": 44.606282288,
    "method": "z_sendmany",
    "params": {
      "fromaddress": "RWUwHqRUYgxfYNNSHWkQuY5sh93VGiiPoX",
      "amounts": [
        {
          "address": "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3",
          "amount": 0.01
        }
      ],
      "minconf": 1,
      "fee": 0.0001
    }
  }
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getoperationresult", "params": [["opid-6a9da0dd-a950-4d95-848c-d3c18e44be03"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    {
      "id": "opid-6a9da0dd-a950-4d95-848c-d3c18e44be03",
      "status": "success",
      "creation_time": 1537288235,
      "result": {
        "txid": "f0309f8dc2e33e108dec39285bc8755058375cf6e51bdb452fb45f3d14909fef"
      },
      "execution_secs": 44.978749064,
      "method": "z_sendmany",
      "params": {
        "fromaddress": "RWUwHqRUYgxfYNNSHWkQuY5sh93VGiiPoX",
        "amounts": [
          {
            "address": "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3",
            "amount": 0.01
          }
        ],
        "minconf": 1,
        "fee": 0.0001
      }
    }
  ],
  "error": null,
  "id": "curltest"
}
```

## z_getoperationstatus

**z_getoperationstatus ([ "operationid", ... ])**

The `z_getoperationstatus` message queries the operation status and any associated result or error data of any `operationid` stored in local memory. The operation will remain in memory (unlike `z_getoperationresult`, which removes the data from the local memory).

### Arguments:

| Structure     | Type              | Description                                                                                                                     |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| "operationid" | (array, optional) | a list of operation ids we are interested in; if an array is not provided, the method examines all operations known to the node |

### Response:

| Structure          | Type                    | Description                                                                   |
| ------------------ | ----------------------- | ----------------------------------------------------------------------------- |
| "id"               | (string)                | the operation id                                                              |
| "status"           | (string)                | the status of the operation; can be `success`                                 | `executing` | `failed` |
| "creation_time"    | (numeric)               | the creation time, in seconds since epoch (Jan 1 1970 GMT)                    |
| "error" : { ... }  | (array of json objects) |
| "code"             | (numeric)               | the associated error code                                                     |
| "message"          | (string)                | a message to indicate the nature of the error, if such a message is available |
| "method"           | (string)                | the name of the method used in the operation                                  |
| "params" : { ... } | (array of json objects) |
| "fromaddress"      | (string)                | the address from which funds are drawn                                        |
| "amounts": [ ... ] | (array of json objects) |
| "address"          | (string)                | the receiving address                                                         |
| "amount"           | (numeric)               | the amount to receive                                                         |
| "minconf"          | (numeric)               | indicates the required number of mining confirmations                         |
| "fee"              | (numeric)               | the fee                                                                       |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_getoperationstatus
```

Response:

```json
[
  {
    "id": "opid-b650b582-c2f5-43e0-9a65-9fe23f65c1a5",
    "status": "failed",
    "creation_time": 1537288268,
    "error": {
      "code": -6,
      "message": "Insufficient funds, no UTXOs found for taddr from address."
    },
    "method": "z_sendmany",
    "params": {
      "fromaddress": "RWUwHqRUYgxfYNNSHWkQuY5sh93VGiiPoX",
      "amounts": [
        {
          "address": "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3",
          "amount": 0.01
        }
      ],
      "minconf": 1,
      "fee": 0.0001
    }
  }
]
```

Command:

```bash
./komodo-cli z_getoperationstatus '["opid-47e12224-8477-4cd4-852d-d8c3ddbc6375"]'
```

Response:

```json
[
  {
    "id": "opid-47e12224-8477-4cd4-852d-d8c3ddbc6375",
    "status": "executing",
    "creation_time": 1537289777,
    "method": "z_sendmany",
    "params": {
      "fromaddress": "RWUwHqRUYgxfYNNSHWkQuY5sh93VGiiPoX",
      "amounts": [
        {
          "address": "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3",
          "amount": 0.01
        }
      ],
      "minconf": 1,
      "fee": 0.0001
    }
  }
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getoperationstatus", "params": [["opid-47e12224-8477-4cd4-852d-d8c3ddbc6375"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    {
      "id": "opid-47e12224-8477-4cd4-852d-d8c3ddbc6375",
      "status": "success",
      "creation_time": 1537289777,
      "result": {
        "txid": "2b988a708db2b8d99a92bbff65a57d0d73fdb22c30fc3f3e4f81ab15cfeafc45"
      },
      "execution_secs": 45.200043917,
      "method": "z_sendmany",
      "params": {
        "fromaddress": "RWUwHqRUYgxfYNNSHWkQuY5sh93VGiiPoX",
        "amounts": [
          {
            "address": "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3",
            "amount": 0.01
          }
        ],
        "minconf": 1,
        "fee": 0.0001
      }
    }
  ],
  "error": null,
  "id": "curltest"
}
```

## z_gettotalbalance

**z_gettotalbalance ( minconf includeWatchonly )**

The `z_gettotalbalance` method returns the total value of funds, including both transparent and private, stored in the node’s wallet.

::: warning
CAUTION: If the wallet contains watch-only z addresses the returned private balance may be larger than the actual balance, as spends cannot be detected with incoming viewing keys.
:::

::: tip
While the <b>interest</b> property is returned for all KMD-based coin daemons, only the main KMD chain utilizes the interest feature. KMD-based asset chains will always return a <b>0.00</b> interest value.
:::

### Arguments:

| Structure        | Type                            | Description                                                                                |
| ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------ |
| minconf          | (numeric, optional, default=1)  | only include private and transparent transactions confirmed at least this many times       |
| includeWatchonly | (bool, optional, default=false) | also include balance in watchonly addresses (see 'importaddress' and 'z_importviewingkey') |

### Response:

| Structure     | Type      | Description                                             |
| ------------- | --------- | ------------------------------------------------------- |
| "transparent" | (numeric) | the total balance of transparent funds                  |
| "interest"    | (numeric) | the total balance of unclaimed interest earned          |
| "private"     | (numeric) | the total balance of private funds                      |
| "total"       | (numeric) | the total balance of both transparent and private funds |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_gettotalbalance
```

Response:

```json
{
  "transparent": "9.98794883",
  "interest": "0.00",
  "private": "0.08205",
  "total": "10.06999883"
}
```

Command:

```bash
./komodo-cli z_gettotalbalance 5
```

Response:

```json
{
  "transparent": "9.98794883",
  "interest": "0.00",
  "private": "0.08205",
  "total": "10.06999883"
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_gettotalbalance", "params": [5] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "transparent": "0.00615",
    "interest": "0.00",
    "private": "0.06205",
    "total": "0.0682"
  },
  "error": null,
  "id": "curltest"
}
```

## z_importkey

**z_importkey "z_privatekey" ( rescan startHeight )**

The `z_importkey` method imports `z_privatekey` to your wallet.

::: tip
This call can take minutes to complete if <b>rescan</b> is true.
:::

::: tip
The optional parameters are currently not functional with KMD-based blockchains.
:::

::: tip
See also <b>z_exportkey</b>.
:::

### Arguments:

| Structure      | Type                                         | Description                                                                 |
| -------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| "z_privatekey" | (string, required)                           | the z_privatekey (see [z_exportkey](../komodo-api/wallet.html#z-exportkey)) |
| rescan         | (string, optional, default=`"whenkeyisnew"`) | rescan the wallet for transactions; can be `yes`                            | `no` | `whenkeyisnew` |
| startHeight    | (numeric, optional, default=0)               | the block height at which to begin the rescan                               |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_importkey DONOTUSExxxxxxxxxxxxxxxxBP6ipkmBxmEQbugcCQ16vUaWGFK
```

Response:

```bash
(none)
```

Command:

```bash
./komodo-cli z_importkey DONOTUSExxxxxxxxxxxxxxxxBP6ipkmBxmEQbugcCQ16vUaWGFK whenkeyisnew 30000
```

Response:

```bash
(none)
```

Command:

```bash
./komodo-cli z_importkey DONOTUSExxxxxxxxxxxxxxxxBP6ipkmBxmEQbugcCQ16vUaWGFK yes 20000
```

Response:

```bash
(none)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_importkey", "params": ["DONOTUSExxxxxxxxxxxxxxxxBP6ipkmBxmEQbugcCQ16vUaWGFK", "no"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

## z_importviewingkey

**z_importviewingkey "viewing_key" ( rescan startHeight )**

The `z_importviewingkey` adds a viewing key to your wallet. This method allows you to view the balance in a z address that otherwise does not belong to your wallet.

::: tip
See also <b>z_exportviewingkey</b>.
:::

::: tip
This call can take minutes to complete if <b>rescan</b> is true.
:::

::: tip
The optional parameters are currently not functional for KMD-based blockchains.
:::

### Arguments:

| Structure     | Type                                       | Description                                                   |
| ------------- | ------------------------------------------ | ------------------------------------------------------------- |
| "viewing_key" | (string, required)                         | the viewing key                                               |
| rescan        | (string, optional, default="whenkeyisnew") | whether to rescan the wallet for transactions; can be `"yes"` | `"no"` | `"whenkeyisnew"` |
| startHeight   | (numeric, optional, default=0)             | block height to start rescan                                  |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_importviewingkey "ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja"
```

Response:

```bash
(none)
```

Command:

```bash
./komodo-cli z_importviewingkey "ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja" no
```

Response:

```bash
(none)
```

Command:

```bash
./komodo-cli z_importviewingkey "ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja" whenkeyisnew 30000
```

Response:

```bash
(none)
```

Command:

```bash
./komodo-cli z_importviewingkey "ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja" yes 20000
```

Response:

```bash
(none)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_importviewingkey", "params": ["ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja", "no"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(none)
```

## z_importwallet

**z_importwallet "filename"**

The `z_importwallet` method imports t address and z address keys from a wallet export file.

::: tip
See also <b>z_exportwallet</b>.
:::

### Arguments:

| Structure  | Type               | Description     |
| ---------- | ------------------ | --------------- |
| "filename" | (string, required) | the wallet file |

### Response:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_importwallet "/mydirectory/nameofbackup"
```

Response:

```bash
(none)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_importwallet", "params": ["/mydirectory/nameofbackup"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

## z_listaddresses

**z_listaddresses ( includeWatchonly )**

The `z_listaddresses` method returns the list of z addresses belonging to the wallet.

::: tip
See also <b>z_importviewingkey</b>.
:::

### Arguments:

| Structure        | Type                            | Description                      |
| ---------------- | ------------------------------- | -------------------------------- |
| includeWatchonly | (bool, optional, default=false) | also include watchonly addresses |

### Response:

| Structure   | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| "z_address" | (string) | a z address belonging to the wallet |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_listaddresses
```

Response:

```json
[
  "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP",
  "ztbUD83kXgHt3A1M282wFvT9Ms6SiBCd6GSbQbPa2C7UtPojVZjPENytFqu7JxgnsgL9EN42xWnyhhzniHYSRJDnEPTgo3Y"
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_listaddresses", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP",
    "ztbUD83kXgHt3A1M282wFvT9Ms6SiBCd6GSbQbPa2C7UtPojVZjPENytFqu7JxgnsgL9EN42xWnyhhzniHYSRJDnEPTgo3Y"
  ],
  "error": null,
  "id": "curltest"
}
```

## z_listoperationids

**z_listoperationids**

The `z_listoperationids` method returns the list of operation ids currently known to the wallet.

### Arguments:

| Structure | Type               | Description                                           |
| --------- | ------------------ | ----------------------------------------------------- |
| "status"  | (string, optional) | filter result by the operation's state e.g. "success" |

### Response:

| Structure     | Type     | Description                             |
| ------------- | -------- | --------------------------------------- |
| "operationid" | (string) | an operation id belonging to the wallet |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_listoperationids
```

Response:

```bash
[
  "opid-47e12224-8477-4cd4-852d-d8c3ddbc6375",
  "opid-b650b582-c2f5-43e0-9a65-9fe23f65c1a5"
]
```

Command:

```bash
./komodo-cli z_listoperationids "success"
```

Response:

```bash
[
  "opid-47e12224-8477-4cd4-852d-d8c3ddbc6375"
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_listoperationids", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    "opid-47e12224-8477-4cd4-852d-d8c3ddbc6375",
    "opid-b650b582-c2f5-43e0-9a65-9fe23f65c1a5"
  ],
  "error": null,
  "id": "curltest"
}
```

## z_listreceivedbyaddress

**z_listreceivedbyaddress "address" ( minconf )**

The `z_listreceivedbyaddress` method returns a list of amounts received by a z address belonging to the node’s wallet.

### Arguments:

| Structure | Type                           | Description                                                  |
| --------- | ------------------------------ | ------------------------------------------------------------ |
| address   | (string)                       | the private address.                                         |
| minconf   | (numeric, optional, default=1) | only include transactions confirmed at least this many times |

### Result:

An array of json objects, each having the properties below.

| Structure          | Type                                         | Description                                                                                                                       |
| ------------------ | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| txid               | (string)                                     | the transaction id                                                                                                                |
| amount             | (numeric)                                    | the amount of value in the note                                                                                                   |
| memo               | (string)                                     | hexadecimal string representation of memo field                                                                                   |
| "confirmations"    | (numeric)                                    | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info |
| "rawconfirmations" | (numeric)                                    | the raw confirmations (number of blocks on top of this transaction's block)                                                       |
| jsindex            | (sprout)                                     | (numeric, received only by sprout addresses) the joinsplit index                                                                  |
| jsoutindex         | (numeric, received only by sprout addresses) | the output index of the joinsplit                                                                                                 |
| outindex           | (numeric, sapling)                           | the output index                                                                                                                  |
| change             | (boolean)                                    | true if the address that received the note is also one of the sending addresses                                                   |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_listreceivedbyaddress "zs1wqykmk74mv2ezjscpxsgzrn4fasqwh50tgk0ym64m45c5yw5fjtpkps64gle963veqzuj04872z"
```

Response:

```bash
[
  {
    "txid": "b9a98f3cbfec7a8a93c240e19e8eea5ab3ee8de3e6372105ffb72308b72ea05f",
    "amount": 77.00000000,
    "memo": "f600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "outindex": 0,
    "rawconfirmations": 9,
    "confirmations": 9,
    "change": false
  }
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user rpcuser:rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_listreceivedbyaddress", "params": ["zs1umhaattx6lna933m9zwfqlmkm2qj49hpa9lnymtj5h5c7cwtd3evfpu29hppprax9cs45fzeyqg"] }' -H 'content-type: text/plain;' http://127.0.0.1:rpcport/
```

Response:

```
blockHash 0a4f15fe5425ef8bc6eb84e7bc3625c1ceccb3e49132b696a1841ab17a75a705 height 55200
{"result":[{"txid":"23d33c0c12ba2224b2c9c252e304f491bf76ca05670c8f00d48300776c10850f","amount":100.00000000,"memo":"f600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","outindex":0,"rawconfirmations":1,"confirmations":1,"change":false}],"error":null,"id":"curltest"}
```

## z_listunspent

**z_listunspent ( minconf maxconf includeWatchonly ["zaddr", ...] )**

The `z_listunspent` method returns an array of unspent shielded notes.

The method can also filter to only include results that have between `minconf` and `maxconf` (inclusive) confirmations, and also for specified z_addresses (`["zaddr", ...])`.

When `minconf` is `0` unspent notes with zero confirmations are returned, even though they are not immediately spendable.

Results are an array of Objects, each of which has:
{txid, jsindex, jsoutindex, confirmations, address, amount, memo} (Sprout)
{txid, outindex, confirmations, address, amount, memo} (Sapling)

### Arguments:

| Structure        | Type                                 | Description                                                                                                          |
| ---------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| minconf          | (numeric, optional, default=1)       | the minimum confirmations to filter                                                                                  |
| maxconf          | (numeric, optional, default=9999999) | the maximum confirmations to filter                                                                                  |
| includeWatchonly | (bool, optional, default=false)      | whether to also include watchonly addresses (see [z_importviewingkey](../komodo-api/wallet.html#z-importviewingkey)) |
| addresses        | (array)                              | a json array of z addresses (both Sprout and Sapling) to act as a filter; duplicate addresses are not allowed        |
| address          | (string)                             | a z address                                                                                                          |

### Results:

An array of json objects, each having the properties below.

| Structure          | Type                                          | Description                                                                                                                       |
| ------------------ | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| txid               | (string)                                      | the transaction id                                                                                                                |
| jsindex            | (numeric)                                     | the joinsplit index                                                                                                               |
| jsoutindex         | (numeric, only returned on sprout addresses)  | the output index of the joinsplit                                                                                                 |
| outindex           | (numeric, only returned on sapling addresses) | the output index                                                                                                                  |
| "confirmations"    | (numeric)                                     | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info |
| "rawconfirmations" | (numeric)                                     | the raw confirmations (number of blocks on top of this transaction's block)                                                       |  |
| spendable          | (boolean)                                     | true if note can be spent by wallet, false if note has zero confirmations, false if address is watchonly                          |
| address            | (string)                                      | the shielded address                                                                                                              |
| amount             | (numeric)                                     | the amount of value in the note                                                                                                   |
| memo               | (string)                                      | hexadecimal string representation of memo field                                                                                   |
| change             | (boolean)                                     | true if the address that received the note is also one of the sending addresses                                                   |

#### :pushpin: Examples:

Command:

```
./komodo-cli z_listunspent
```

Response:

```bash
[
  {
    "txid": "b9a98f3cbfec7a8a93c240e19e8eea5ab3ee8de3e6372105ffb72308b72ea05f",
    "outindex": 0,
    "confirmations": 1,
    "rawconfirmations": 1,
    "spendable": true,
    "address": "zs1wqykmk74mv2ezjscpxsgzrn4fasqwh50tgk0ym64m45c5yw5fjtpkps64gle963veqzuj04872z",
    "amount": 77.00000000,
    "memo": "f600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "change": false
  }
]
```

Command:

```bash
./komodo-cli -ac_name=BEER z_listunspent 1 100 false "[\"zs1wqykmk74mv2ezjscpxsgzrn4fasqwh50tgk0ym64m45c5yw5fjtpkps64gle963veqzuj04872z\"]"
```

Response:

```bash
[
  {
    "txid": "b9a98f3cbfec7a8a93c240e19e8eea5ab3ee8de3e6372105ffb72308b72ea05f",
    "outindex": 0,
    "confirmations": 2,
    "rawconfirmations": 2,
    "spendable": true,
    "address": "zs1wqykmk74mv2ezjscpxsgzrn4fasqwh50tgk0ym64m45c5yw5fjtpkps64gle963veqzuj04872z",
    "amount": 77.00000000,
    "memo": "f600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "change": false
  }
]
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user rpcuser:rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_listunspent", "params": [1, 9999999, false, ["zs1umhaattx6lna933m9zwfqlmkm2qj49hpa9lnymtj5h5c7cwtd3evfpu29hppprax9cs45fzeyqg"] ] }' -H 'content-type: text/plain;' http://127.0.0.1:rpcport/
```

Response:

```bash
blockHash 0a4f15fe5425ef8bc6eb84e7bc3625c1ceccb3e49132b696a1841ab17a75a705 height 55200
{"result":[{"txid":"23d33c0c12ba2224b2c9c252e304f491bf76ca05670c8f00d48300776c10850f","outindex":0,"confirmations":1,"rawconfirmations":1,"spendable":true,"address":"zs1umhaattx6lna933m9zwfqlmkm2qj49hpa9lnymtj5h5c7cwtd3evfpu29hppprax9cs45fzeyqg","amount":100.00000000,"memo":"f600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","change":false}],"error":null,"id":"curltest"}
```

## z_mergetoaddress

**z_mergetoaddress [ "fromaddress", ... ] "toaddress" ( fee ) ( transparent_limit ) ( shielded_limit ) ( memo )**

::: warning
CAUTION: <b>z_mergetoaddress</b> is DISABLED but can be enabled as an experimental feature.
:::

The `z_mergetoaddress` method merges multiple utxos and notes into a single utxo or note. The method works for both t addresses and z addresses, both separately and in combination. Coinbase utxos are ignored; use `z_shieldcoinbase` to combine those into a single note.

This is an asynchronous operation, and utxos selected for merging will be locked. If there is an error, they are unlocked. The RPC call `listlockunspent` can be used to return a list of locked utxos.

The number of utxos and notes selected for merging can be limited by the caller. If the transparent limit parameter is set to `0`, the `mempooltxinputlimit` option will determine the number of utxos. Any limit is constrained by the consensus rule defining a maximum transaction size of 100000 bytes.

### The fromaddresses array

The following special strings are accepted inside the `fromaddresses` array:

- `"*"`: Merge both utxos and notes from all addresses belonging to the wallet

- `"ANY_TADDR"`: Merge utxos from all t addresses belonging to the wallet

- `"ANY_ZADDR"`: Merge notes from all z addresses belonging to the wallet

If a special string is given, any given addresses of that type will be ignored

### Arguments:

| Structure         | Type                                | Description                                                                                                                                                                                              |
| ----------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromaddresses     | (string, required)                  |
| "address"         | (string)                            | can be a t address or a z address                                                                                                                                                                        |
| "toaddress"       | (string, required)                  | the t address or z address to receive the combined utxo                                                                                                                                                  |
| fee               | (numeric, optional, default=0.0001) | the fee amount to attach to this transaction                                                                                                                                                             |
| transparent_limit | (numeric, optional, default=50)     | limit on the maximum number of transparent utxos to merge; you may set this value to 0 to use the node option [mempooltxinputlimit](../installations/common-runtime-parameters.html#mempooltxinputlimit) |
| shielded_limit    | (numeric, optional, default=10)     | limit on the maximum number of hidden notes to merge; you may set this value to 0 to merge as many as will fit in the transaction                                                                        |
| "memo"            | (string, optional)                  | encoded as hex; when `toaddress` is a z address, this value will be stored in the memo field of the new note                                                                                             |

### Response:

| Structure                   | Type      | Description                                                                         |
| --------------------------- | --------- | ----------------------------------------------------------------------------------- |
| "remainingUTXOs"            | (numeric) | the number of utxos still available for merging                                     |
| "remainingTransparentValue" | (numeric) | the value of utxos still available for merging                                      |
| "remainingNotes"            | (numeric) | the number of notes still available for merging                                     |
| "remainingShieldedValue"    | (numeric) | the value of notes still available for merging                                      |
| "mergingUTXOs"              | (numeric) | the number of utxos being merged                                                    |
| "mergingTransparentValue"   | (numeric) | the value of utxos being merged                                                     |
| "mergingNotes"              | (numeric) | the number of notes being merged                                                    |
| "mergingShieldedValue"      | (numeric) | the value of notes being merged                                                     |
| "opid"                      | (string)  | an operationid to pass to `z_getoperationstatus` to get the result of the operation |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_mergetoaddress '["t1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd"]' ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf
```

Response:

```bash
(disabled)
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_mergetoaddress", "params": [["t1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd"], "ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
(disabled)
```

## z_sendmany

**z_sendmany "fromaddress" [ { "address": ..., "amount": ... }, ... ] \( minconf ) ( fee )**

The `z_sendmany` method sends one or more transactions at once, and allows for sending transactions of types `t --> t`, `t --> z`, `z --> z`, `z --> t`. It is the principle method for dealing with shielded `z` transactions in the Komodo ecosystem.

The `amount` values are double-precision floating point numbers. Change from a t address flows to a new t address address, while change from z address returns to itself. When sending coinbase utxos to a z address, change is not allowed. The entire value of the utxo(s) must be consumed. Currently, the maximum number of z address outputs is 54 due to transaction-size limits.

### Arguments:

| Structure     | Type                                | Description                                                                                            |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| "fromaddress" | (string, required)                  | the sending t address or z address                                                                     |
| "amounts"     | (array of json objects)             |
| "address"     | (string, required)                  | the receiving address; can be a t address or z address                                                 |
| "amount"      | (numeric, required)                 | the numeric amount                                                                                     |
| "memo"        | (string, optional)                  | if the address is a z address, this property accepts raw data represented in hexadecimal string format |
| minconf       | (numeric, optional, default=1)      | only use funds confirmed at least this many times                                                      |
| fee           | (numeric, optional, default=0.0001) | the fee amount to attach to this transaction                                                           |

### Response:

| Structure     | Type     | Description                                                                       |
| ------------- | -------- | --------------------------------------------------------------------------------- |
| "operationid" | (string) | an operationid to pass to z_getoperationstatus to get the result of the operation |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_sendmany "RUX5vGkxJCKBPGm8b97VUumt2aHkuCjp8e" '[{"address":"RVEsww91UBdUNGyCC1GjDVuvJShEei2kj4","amount":0.01}]'
```

Response:

```bash
opid-ad947755-b348-4842-90ca-0f0c71d13d34
```

Command:

```bash
./komodo-cli z_sendmany "RCpMUZwxc3pWsgip5aj3Sy1cKkh86P3Tns" '[{"address":"ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3","amount":0.01}]'
```

Response:

```bash
opid-cdd6af37-88a2-44d7-9630-d54d21f8b1c4
```

Command:

```bash
./komodo-cli z_sendmany "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3" '[{"address":"ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP","amount":0.0099}]'
```

Response:

```bash
opid-3c3d6f25-f333-4898-8a50-06f4012cf975
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_sendmany", "params": ["RCpMUZwxc3pWsgip5aj3Sy1cKkh86P3Tns", [{"address": "ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf" ,"amount": 0.01}]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```bash
{
  "result": "opid-73306924-3466-4944-a8f7-c45c14be0438",
  "error": null,
  "id": "curltest"
}
```

## z_shieldcoinbase

**z_shieldcoinbase "fromaddress" "tozaddress" ( fee ) ( limit )**

The `z_shieldcoinbase` method shields transparent coinbase funds by sending the funds to a shielded z address. This is an asynchronous operation and utxos selected for shielding will be locked. If there is an error, they are unlocked.

The RPC call `listlockunspent` can be used to return a list of locked utxos. The number of coinbase utxos selected for shielding can be limited by the caller. If the limit parameter is set to zero, the [mempooltxinputlimit](../installations/common-runtime-parameters.html#mempooltxinputlimit) option will determine the number of uxtos. Any limit is constrained by the consensus rule defining a maximum transaction size of 100000 bytes.

### Arguments:

| Structure     | Type                                | Description                                                                                         |
| ------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| "fromaddress" | (string, required)                  | the address is a t address or `"*"` for all t address belonging to the wallet                       |
| "toaddress"   | (string, required)                  | the address is a z address                                                                          |
| fee           | (numeric, optional, default=0.0001) | the fee amount to attach to this transaction                                                        |
| limit         | (numeric, optional, default=50)     | limit on the maximum number of utxos to shield; set to `0` to use node option `mempooltxinputlimit` |

### Response:

| Structure        | Type      | Description                                                                       |
| ---------------- | --------- | --------------------------------------------------------------------------------- |
| "remainingUTXOs" | (numeric) | the number of coinbase utxos still available for shielding                        |
| "remainingValue" | (numeric) | the value of coinbase utxos still available for shielding                         |
| "shieldingUTXOs" | (numeric) | the number of coinbase utxos being shielded                                       |
| "shieldingValue" | (numeric) | the value of coinbase utxos being shielded                                        |
| "opid"           | (string)  | an operationid to pass to z_getoperationstatus to get the result of the operation |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli z_shieldcoinbase "RXN2rxidK4cwzRL44UTnWvQjjvLdoMmCpU" "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP"
```

Response:

```json
{
  "remainingUTXOs": 0,
  "remainingValue": 0.0,
  "shieldingUTXOs": 2,
  "shieldingValue": 0.0003,
  "opid": "opid-c0a7875c-aaa0-4bdc-8f17-b34ab99e8bab"
}
```

Command:

```bash
./komodo-cli z_shieldcoinbase "REyaj53EB2nwUnsmVyn8JHCcquKf1zYkEP" "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP" 0.0001 50
```

Response:

```json
{
  "remainingUTXOs": 0,
  "remainingValue": 0.0,
  "shieldingUTXOs": 14,
  "shieldingValue": 0.0016,
  "opid": "opid-08ce931d-876c-45d5-9aea-15cf4c695e72"
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_shieldcoinbase", "params": ["RWRSfEYcfLv3yy9mhAuKHQTMCs9fArpPiH", "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "remainingUTXOs": 0,
    "remainingValue": 0,
    "shieldingUTXOs": 1,
    "shieldingValue": 0.00025,
    "opid": "opid-53018a85-cf68-4e7d-a065-0defea6bf061"
  },
  "error": null,
  "id": "curltest"
}
```

## zcbenchmark

**zcbenchmark benchmarktype samplecount**

The `zcbenchmark` method runs a benchmark of the selected `benchmarktype`. This benchmark is calculated `samplecount` times.

When finished, the method returns the running times of each sample.

### Arguments:

| Structure       | Type               | Description                   |
| --------------- | ------------------ | ----------------------------- |
| "benchmarktype" | (string, required) | the type of the benchmark     |
| "samplecount"   | (numeric)          | the number of samples to take |

### Response:

| Structure     | Type      | Description                                          |
| ------------- | --------- | ---------------------------------------------------- |
| "runningtime" | (numeric) | the time it took to run the selected `benchmarktype` |

Output:

```json
[
  {
    "runningtime": runningtime
  },
  {
    "runningtime": runningtime
  }
  ...
]
```

## zcrawjoinsplit

**zcrawjoinsplit rawtx inputs outputs vpub_old vpub_new**

::: warning
DEPRECATED.
:::

- inputs: a JSON object mapping {note: zcsecretkey, ...}
- outputs: a JSON object mapping {zcaddr: value, ...}

Splices a joinsplit into a raw transaction. Inputs are unilaterally confidential.
Outputs are confidential between sender/receiver. The vpub_old and
vpub_new values are globally public and move transparent value into
or out of the confidential value store, respectively.

Note: The caller is responsible for delivering the output enc1 and
enc2 to the appropriate recipients, as well as signing rawtxout and
ensuring it is mined. (A future RPC call will deliver the confidential
payments in-band on the blockchain.)

Output:

```json
{
  "encryptednote1": enc1,
  "encryptednote2": enc2,
  "rawtxn": rawtxout
}
```

## zcrawkeygen

**zcrawkeygen**

::: warning
DEPRECATED.
:::

the `zcrawkeygen` method generates a zcaddr which can send and receive confidential values.

Output:

```json
{
  "zcaddress": zcaddr,
  "zcsecretkey": zcsecretkey,
  "zcviewingkey": zcviewingkey
}
```

## zcrawreceive zcsecretkey encryptednote

**zcrawreceive zcsecretkey encryptednote**

::: warning
DEPRECATED.
:::

Decrypts `encryptednote` and checks if the coin commitments
are in the blockchain as indicated by the "exists" result.

Output:

```json
{
  "amount": value,
  "note": noteplaintext,
  "exists": exists
}
```

## zcsamplejoinsplit

Perform a joinsplit and return the JSDescription.
