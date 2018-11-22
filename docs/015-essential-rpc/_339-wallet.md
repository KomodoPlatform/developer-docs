# Wallet

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## sigaddress

> Add a multisig address from 2 addresses:

```
command:

komodo-cli addmultisigaddress 2 '["RSWwtqsNr9mW21UXRm6Lz4AzQnj4pVzzkp","RW8d8EChHTooVbwF3reqHYgkzWCnJFLXgh"]'

response:

bLz2YZ7Mm8MgPc9mPNiFqhjFPbFZU4WUD5
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addmultisigaddress", "params": [2, ["RL4CuA2MSAbBiqJKQEr2TKnKT2fSwK99mG","RBYVFCxpJdLgvUixhguxzuH1TJpoNLYCJ6"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "bNdB9fAt9HmQD8CmBjkY6QwmrNSBrbzsgA",
  "error": null,
  "id": "curltest"
}
```

**sigaddress nrequired [ "key", ... ] \( "account" )**

The `addmultisigaddress` method adds a multi-signature address to the wallet, where `nrequired` indicates the number of keys (out of the total provided) required to execute a transaction.

The keys function as signatures, allowing multiple parties or entities to manage an account. Each key in the array can be an address or a hex-encoded public key.

<aside class="notice">
  DEPRECATED: If <b>account</b> is specified, the method assigns the multi-signature address to that account.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
nrequired                                    |(numeric, required)          |the number of required keys (out of the `n` submitted)
"keysobject"                                 |(string, required)           |a json array of addresses or hex-encoded public keys
[                                            |                             |
"address"                                    |(string)                     |address or hex-encoded public key
...,                                         |                             |
]                                            |                             |
"account"                                    |(string, optional)           |DEPRECATED: if provided, "account" MUST be set to the empty string "" to represent the default account; passing any other string will result in an error


### Response:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string)                     |an address associated with the keys

## backupwallet

```
komodo-cli backupwallet "mybackupdata"

/home/myusername/myexportdir/mybackupdata
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "backupwallet", "params": ["backupdata"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "/home/siddhartha/Desktop/backupdata",
  "error": null,
  "id": "curltest"
}
```

**backupwallet "destination"**

The `backupwallet` method safely copies the `wallet.dat` file to the indicated destination. The `destination` input accepts only alphanumeric characters.

<aside class="notice">
  This method requires that the coin daemon have the <b>exportdir</b> runtime parameter enabled.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"destination"                                |(string, required)           |the destination filename, saved in the directory set by the [`exportdir`](#exportdir) runtime parameter

### Response:

Structure|Type|Description
---------|----|-----------
"path"                                       |(string)                     |the full path of the destination file

## dumpprivkey

```
command:

komodo-cli dumpprivkey "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs"

response:

DONOTUSExxxxxxxxxxxxxxxxxxxx4KkCmRnnSg7iXvAUjoYivC8K
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpprivkey", "params": ["RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "DONOTUSExxxxxxxxxxxxxxxxxxxx4KkCmRnnSg7iXvAUjoYivC8K",
  "error": null,
  "id": "curltest"
}
```

**dumpprivkey "address"**

The `dumpprivkey` method reveals the private key corresponding to the indicated `address`.

<aside class="notice">
  See also <b>importprivkey</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string, required)           |the address for the private key

### Response:

Structure|Type|Description
---------|----|-----------
"data"                                       |(string)                     |the private key

## dumpwallet

```
command:

komodo-cli dumpwallet "test"

response:

/home/myusername/myexportdir/test
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

{
  "result": "/home/myusername/myexportdir/test",
  "error": null,
  "id": "curltest"
}
```

**dumpwallet "filename"**

The `dumpwallet` method dumps all transparent-address wallet keys into a file, using a human-readable format.

Overwriting an existing file is not permitted. The `destination` parameter accepts only alphanumeric characters.

<aside class="notice">
  This method requires that the coin daemon have the <b>exportdir</b> runtime parameter enabled.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"filename"                                   |(string, required)           |the filename, saved in folder set by the [`exportdir`](#exportdir) runtime parameter


### Response:

Structure|Type|Description
---------|----|-----------
"path"                                       |(string)                     |the full path of the destination file

## encryptwallet

> Encrypt your wallet:

```
command:

komodo-cli encryptwallet "mypassphrase"

response:

(disabled)
```

> Set the passphrase to use the wallet, such as for signing or sending coins:

```
command:

komodo-cli walletpassphrase "mypassphrase"

response:

(disabled)
```

> Enter a test command like `signmessage`:

```
command:

komodo-cli signmessage "address" "test message"

response:

(disabled)
```

> Lock the wallet again by removing the passphrase:

```
command:

komodo-cli walletlock

response:

(disabled)
```

> As a json rpc call:

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "encryptwallet", "params": ["mypassphrase"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(disabled)
```

**encryptwallet "passphrase"**

<aside class="warning">
  Wallet encryption is DISABLED. This call always fails.
</aside>

The `encryptwallet` method encrypts the wallet with the indicated `passphrase`.

This method is for first-time encryption only. After this, any calls that interact with private keys, such as sending or signing, will require the passphrase to be set prior to making these calls. Use the [`walletpassphrase`](#walletpassphrase) call for this, and then [`walletlock`](#walletlock). If the wallet is already encrypted, use the [`walletpassphrasechange`](#walletpassphrasechange) call.

<aside class="notice">
  Using the <b>encryptwallet</b> method will shutdown the server.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"passphrase"                                 |(string)                     |the passphrase with which to encrypt the wallet; it must be at least 1 character, but should be long

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## getaccount

```
command:

komodo-cli getaccount "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"

response:

(deprecated)

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccount", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(deprecated)
```

**getaccount "address"**

<aside class="notice">
  The <b>getaccount</b> method returns the account associated with the given address.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string, required)           |the address

### Response:

Structure|Type|Description
---------|----|-----------
"accountname"                                |(string)                     |the account address

## getaccountaddress


```
command:

komodo-cli getaccountaddress

response:

(deprecated)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccountaddress", "params": ["myaccount"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(deprecated)
```

**getaccountaddress "account"**

<aside class="notice">
DEPRECATED
</aside>

The `getaccountaddress` method returns the current address for receiving payments to this account.

### Arguments:

Structure|Type|Description
---------|----|-----------
"account"                                    |(string, required)           |MUST be set to the empty string "" to represent the default account; passing any other string will result in an error

### Response:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string)                     |the account address

## getaddressesbyaccount

```
command:

komodo-cli getaddressesbyaccount "tabby"

response:

(deprecated)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressesbyaccount", "params": ["tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(deprecated)
```

**getaddressesbyaccount "account"**

<aside class="notice">
DEPRECATED
</aside>

The `getaddressesbyaccount` method returns the list of addresses for the given `account`.

### Arguments:

Structure|Type|Description
---------|----|-----------
"account"                                    |(string, required)           |MUST be set to the empty string "" to represent the default account; passing any other string will result in an error

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
"address"                                    |(string)                     |an address associated with the given account
,                                            |                             |
]                                            |                             |

## getbalance

> The total amount in the wallet:

```
command:

komodo-cli getbalance

response:

10.05000000

The total amount in the wallet where at least five blocks are confirmed:
```

```
command:

komodo-cli getbalance "*" 5

response:

10.05000000
```

> As a json rpc call:

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": ["", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": 10.09234883,
  "error": null,
  "id": "curltest"
}
```

**getbalance ( "account" minconf includeWatchonly )**

The `getbalance` method returns the server's total available balance.

<aside class="notice">
  The <b>account</b> input is deprecated.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"account"                                    |(string, optional)           |DEPRECATED if provided, it MUST be set to the empty string `""` or to the string `"*"`
minconf                                      |(numeric, optional, default=1)|only include transactions confirmed at least this many times
includeWatchonly                             |(bool, optional, default=false)|also include balance in watchonly addresses (see `importaddress`)

### Response:

Structure|Type|Description
---------|----|-----------
amount                                       |(numeric)                    |the total amount

## getbalance64

**getbalance64**

<aside class="notice">
  This method is part of the new <b>ac_staked</b> functionality.
</aside>

The `getbalance64` method is used only on asset chains that are utilizing the `ac_staked` functionality. On KMD-based Proof-of-Stake (PoS) asset chains, all staked coins are placed into one of 64 segments (`segid`'s'). The `getbalance64` method returns the balance of coins in each `segid`. For further information, please reach out to our support team.

## getnewaddress

```
command:

komodo-cli getnewaddress

response:

"RYDuQ2oQCCz1PQNxUQTDAaRinWKiCoT2E6"
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "R9iQRG6J9eY8SwaCcYZ65QJxg5UhgLC5Rx",
  "error": null,
  "id": "curltest"
}
```

**getnewaddress ( "account" )**

The `getnewaddress` method returns a new address for receiving payments.

### Arguments:

Structure|Type|Description
---------|----|-----------
"account"                                    |(string, optional)           |DEPRECATED: If provided, the account MUST be set to the empty string `""` to represent the default account; passing any other string will result in an error

### Response:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string)                     |the new address

## getrawchangeaddress

```
command:

komodo-cli getrawchangeaddress

response:

RS8oqzbjShKhftmuk2RpRmHH2hTAukp6yP
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawchangeaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN",
  "error": null,
  "id": "curltest"
}
```

**getrawchangeaddress**

The `getrawchangeaddress` returns a new address that can be used to receive change.

<aside class="notice">
  This is for use with raw transactions, NOT normal use.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string)                     |the address

## getreceivedbyaccount

```
command:

komodo-cli getreceivedbyaccount ""

response:

(deprecated)
```

**getreceivedbyaccount "account" ( minconf )**

<aside class="notice">
  DEPRECATED
</aside>

The <b>getreceivedbyaccount</b> method returns the total amount received by <b>account</b> in transactions with at least <b>minconf</b> confirmations.

### Arguments:

Structure|Type|Description
---------|----|-----------
"account"                                    |(string, required)           |MUST be set to the empty string "" to represent the default account; passing any other string will result in an error
minconf                                      |(numeric, optional, default=1)|only include transactions confirmed at least this many times

### Response:

Structure|Type|Description
---------|----|-----------
amount                                       |(numeric)                    |the total amount received for this account

## getreceivedbyaddress

```
command:

komodo-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN"

response:
10.0500000
```

```
command:

komodo-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" 0

response:

10.0500000
```

```
command:

komodo-cli getreceivedbyaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" 6

response:

10.0500000
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaddress", "params": ["RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": 0,
  "error": null,
  "id": "curltest"
}
```

**getreceivedbyaddress "address" ( minconf )**

The `getreceivedbyaddress` method returns the total amount received by the given `address` in transactions with at least `minconf` confirmations.

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string, required)           |the address for transactions
minconf                                      |(numeric, optional, default=1)|only include transactions confirmed at least this many times

### Response:

Structure|Type|Description
---------|----|-----------
amount                                       |(numeric)                    |the total amount of the relevant coin received at this address

## gettransaction

```
command:

komodo-cli gettransaction "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa"

response:

{
  "amount": 0.00000000,
  "fee": -0.00005000,
  "confirmations": 0,
  "txid": "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa",
  "walletconflicts": [
  ],
  "time": 1536993107,
  "timereceived": 1536993107,
  "vjoinsplit": [
  ],
  "details": [
  ],
  "hex": "0100000001d69a6c4b9aa1991bd72ab86086db91a4c709c4b954c15d1622f2e1fb2deeb262000000004847304402205927908c985e09f6d9888e37e23b82770ca906b145c74a388ea9359afba63fff02204bd49a9b158ecfb7c12737579a31dd9e44dc63214813f70617f9a24a1e4d987801feffffff02302d903b000000001976a9141c973dbbed002e189caf31664d9ca7e8b1e92d8788ac40420f00000000001976a914646e1ddd9b6415e0209e5bbe3861309353301eec88aca2659c5b"
}
```

```
command:

komodo-cli gettransaction "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa" true

response:

{
  "amount": 0.00000000,
  "fee": -0.00005000,
  "confirmations": 0,
  "txid": "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa",
  "walletconflicts": [
  ],
  "time": 1536993107,
  "timereceived": 1536993107,
  "vjoinsplit": [
  ],
  "details": [
  ],
  "hex": "0100000001d69a6c4b9aa1991bd72ab86086db91a4c709c4b954c15d1622f2e1fb2deeb262000000004847304402205927908c985e09f6d9888e37e23b82770ca906b145c74a388ea9359afba63fff02204bd49a9b158ecfb7c12737579a31dd9e44dc63214813f70617f9a24a1e4d987801feffffff02302d903b000000001976a9141c973dbbed002e189caf31664d9ca7e8b1e92d8788ac40420f00000000001976a914646e1ddd9b6415e0209e5bbe3861309353301eec88aca2659c5b"
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettransaction", "params": ["7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": {
    "amount": 0,
    "fee": -5e-05,
    "confirmations": 0,
    "txid": "7281407d85619901ee10d52c96869f7879393434b782331df6f67a0e0e9d1ffa",
    "walletconflicts": [],
    "time": 1536993107,
    "timereceived": 1536993107,
    "vjoinsplit": [],
    "details": [],
    "hex": "0100000001d69a6c4b9aa1991bd72ab86086db91a4c709c4b954c15d1622f2e1fb2deeb262000000004847304402205927908c985e09f6d9888e37e23b82770ca906b145c74a388ea9359afba63fff02204bd49a9b158ecfb7c12737579a31dd9e44dc63214813f70617f9a24a1e4d987801feffffff02302d903b000000001976a9141c973dbbed002e189caf31664d9ca7e8b1e92d8788ac40420f00000000001976a914646e1ddd9b6415e0209e5bbe3861309353301eec88aca2659c5b"
  },
  "error": null,
  "id": "curltest"
}
```

**gettransaction "txid" ( includeWatchonly )**

The `gettransaction` method queries detailed information about transaction `txid`. This command applies only to `txid`'s that are in the user's local wallet.

### Arguments:

Structure|Type|Description
---------|----|-----------
"txid"                                       |(string, required)           |the transaction id
"includeWatchonly"                           |(bool, optional, default=false)|whether to include watchonly addresses in the returned balance calculation and in the `details[]` returned values

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"amount"                                     |(numeric)                    |the transaction amount
"confirmations"                              |(numeric)                    |the number of confirmations
"blockhash"                                  |(string)                     |the block hash
"blockindex"                                 |(numeric)                    |the block index
"blocktime"                                  |(numeric)                    |the time in seconds since epoch (1 Jan 1970 GMT)
"txid"                                       |(string)                     |the transaction id
"time"                                       |(numeric)                    |the transaction time in seconds since epoch (1 Jan 1970 GMT)
"timereceived"                               |(numeric)                    |the time received in seconds since epoch (1 Jan 1970 GMT)
"details"                                    |                             |
{                                            |                             |
"account"                                    |(string)                     |DEPRECATED the account name involved in the transaction; can be "" for the default account
"address"                                    |(string)                     |the address involved in the transaction
"category"                                   |(string)                     |the category - either `send` or `receive`
"amount"                                     |(numeric)                    |the amount
"vout"                                       |(numeric)                    |the vout value
}                                            |                             |
,                                            |                             |
],                                           |                             |
"vjoinsplit"                                 |                             |
{                                            |                             |
"anchor"                                     |(string)                     |merkle root of note commitment tree
"nullifiers"                                 |                             |
"commitments"                                |                             |
"macs"                                       |                             |
"vpub_old"                                   |(numeric)                    |the amount removed from the transparent value pool
"vpub_new"                                   |(numeric)                    |the amount added to the transparent value pool
}                                            |                             |
,                                            |                             |
],                                           |                             |
"hex"                                        |(string)                     |raw data for transaction
}                                            |                             |

## getunconfirmedbalance

```
command:

komodo-cli getunconfirmedbalance

response:

10.05000000
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getunconfirmedbalance", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": 10.05000000,
  "error": null,
  "id": "curltest"
}
```

**getunconfirmedbalance**

The `getunconfirmedbalance` method returns the server's total unconfirmed balance.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## getwalletinfo

```
command:

komodo-cli getwalletinfo

response:

{
  "walletversion": 60000,
  "balance": 10.01334496,
  "unconfirmed_balance": 0.00000000,
  "immature_balance": 0.00010000,
  "txcount": 106,
  "keypoololdest": 1536889653,
  "keypoolsize": 101,
  "paytxfee": 0.00000000
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwalletinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

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

**getwalletinfo**

The `getwalletinfo` method returns an object containing various information about the wallet state.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"walletversion"                              |(numeric)                    |the wallet version
"balance"                                    |(numeric)                    |the total confirmed balance of the wallet
"unconfirmed_balance"                        |(numeric)                    |the total unconfirmed balance of the wallet
"immature_balance"                           |(numeric)                    |the total immature balance of the wallet
"txcount"                                    |(numeric)                    |the total number of transactions in the wallet
"keypoololdest"                              |(numeric)                    |the timestamp (seconds since GMT epoch) of the oldest pre-generated key in the key pool
"keypoolsize"                                |(numeric)                    |how many new keys are pre-generated
"unlocked_until"                             |(numeric)                    |the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
"paytxfee"                                   |(numeric)                    |the transaction fee configuration, denotated as the relevant COIN per KB
}                                            |                             |

## importaddress

> Import an address with rescan:

```
command:

komodo-cli importaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN"

response:

(none)
```

```
command:

komodo-cli importaddress "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN" "testing" false

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importaddress", "params": ["R9z796AehK5b6NCPeVkGUHSpJnawerf8oP", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

**importaddress "address" ( "label" rescan )**

The `importaddress` method adds an address or script (in hex) that can be watched as if it were in your wallet, although it cannot be used to spend.

<aside class="notice">
  This call can take an increased amount of time to complete if rescan is true.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string, required)           |the address to watch
"label"                                      |(string, optional, default="")|an optional label
rescan                                       |(boolean, optional, default=true)|rescan the wallet for transactions

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## key

```
command:

komodo-cli importprivkey "DONOTUSExxxxxxxxxxxxxxxxxxxxj4Xu9jjinhLpffhdtoKg5gar2"

response:

R9z796AehK5b6NCPeVkGUHSpJnawerf8oP
```

```
command:

komodo-cli importprivkey "DONOTUSExxxxxxxxxxxxxxxxxxxxj4Xu9jjinhLpffhdtoKg5gar2" "testing" false

response:

RFtA32tttJm89VWRWPCQtV8bkQ1FvE1MBG
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importprivkey", "params": ["UwibHKsYfiM19BXQmcUwAfw331GzGQK8aoPqqYEbyoPrzc2965nE", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "RC5qhqgYRzf3dUXGAst9ah5LcuLjmMgT64",
  "error": null,
  "id": "curltest"
}
```

**key "komodoprivkey" ( "label" rescan )**

The `importprivkey` method adds a private key to your wallet.

<aside class="notice">
  This call can take minutes to complete if <b>rescan</b> is true.
</aside>

<aside class="notice">
  See also <b>dumpprivkey</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"privkey"                                    |(string, required)           |the private key (see [`dumpprivkey`](#dumpprivkey))
"label"                                      |(string, optional, default="")|an optional label
rescan                                       |(boolean, optional, default=true)|rescan the wallet for transactions

### Response:

Structure|Type|Description
---------|----|-----------
addresses                                    |(string)                     |the public address

## importwallet

```
command:

komodo-cli importwallet "path/to/exportdir/nameofbackup"

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importwallet", "params": ["path/to/exportdir/nameofbackup"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

**importwallet "filename"**

The `importwallet` method imports transparent-address keys from a wallet-dump file (see [`dumpwallet`](#dumpwallet)).

### Arguments:

Structure|Type|Description
---------|----|-----------
"filename"                                   |(string, required)           |the wallet file

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## keypoolrefill

```
command:

komodo-cli keypoolrefill

response:

(none)
```

```
command:

komodo-cli keypoolrefill 100

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "keypoolrefill", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

**keypoolrefill ( newsize )**

The `keypoolrefill` method refills the keypool.

### Arguments:

Structure|Type|Description
---------|----|-----------
newsize                                      |(numeric, optional, default=100)|the new keypool size

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## listaccounts

```
command:

komodo-cli listaccounts 6

response:

(deprecated)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaccounts", "params": [6] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(deprecated)
```

**listaccounts ( minconf includeWatchonly)**

<aside class="notice">
  DEPRECATED
</aside>

The <b>listaccounts</b> method returns an object that has account names as keys and account balances as values.

### Arguments:

Structure|Type|Description
---------|----|-----------
minconf                                      |(numeric, optional, default=1)|only include transactions with at least this many confirmations
includeWatchonly                             |(bool, optional, default=false)|include balances in watchonly addresses (see 'importaddress')

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"account_number"                             |(numeric)                    |the property name is the account name, and the value is the total balance for the account
...                                          |                             |
}                                            |                             |

## listaddressgroupings

```
command:

komodo-cli listaddressgroupings

response (note how there are two separate, unique groupings of addresses):

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

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressgroupings", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    [
      [
        "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ",
        9.99304496
      ],
      [
        "RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7",
        0.0004,
        ""
      ],
      [
        "RJSDZjp7kjBNhHsbECDE1jwYNK7af41pZN",
        0.01
      ]
    ],
    [
      [
        "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
        0.0099,
        ""
      ]
    ]
  ],
  "error": null,
  "id": "curltest"
}
```

**listaddressgroupings**

The `listaddressgroupings` method lists groups of addresses which have had their common ownership made public by common use as inputs or as the resulting change in past transactions.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
[                                            |(array)                      |each array at this indentation level is a unique grouping of addresses
[                                            |                             |
"address",                                   |(string)                     |the address
amount,                                      |(numeric)                    |the amount
"account"                                    |(string, optional)           |(DEPRECATED) the account
]                                            |                             |
,                                            |                             |
]                                            |                             |
,                                            |                             |
]                                            |                             |

## listlockunspent

```
command:

komodo-cli listlockunspent

response:

[
  {
    "txid": "d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd",
    "vout": 0
  }
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listlockunspent", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

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

**listlockunspent**

The `listlockunspent` method returns a list of temporarily non-spendable outputs.

<aside class="notice">
See the <b>lockunspent</b> call to lock and unlock transactions for spending.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"txid"                                       |(string)                     |the transaction id locked
"vout"                                       |(numeric)                    |the vout value
}                                            |                             |
,                                            |                             |
]                                            |                             |

## listreceivedbyaccount

```
command:

komodo-cli listreceivedbyaccount

response:

(deprecated)
```

```
command:

komodo-cli listreceivedbyaccount 6 true

response:

(deprecated)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaccount", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(deprecated)
```

**listreceivedbyaccount ( minconf includeempty includeWatchonly)**

<aside class="notice">
  DEPRECATED
</aside>

The `listreceivedbyaccount` method lists balances by account.

### Arguments:

Structure|Type|Description
---------|----|-----------
minconf                                      |(numeric, optional, default=1)|the minimum number of confirmations before payments are included
includeempty                                 |(boolean, optional, default=false)|whether to include accounts that haven't received any payments
includeWatchonly                             |(bool, optional, default=false)|whether to include watchonly addresses (see 'importaddress')

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"involvesWatchonly"                          |(bool)                       |only returned if imported addresses were involved in transaction
"account"                                    |(string)                     |the account name of the receiving account
"amount"                                     |(numeric)                    |the total amount received by addresses with this account
"confirmations"                              |(numeric)                    |the number of confirmations of the most recent transaction included
}                                            |                             |
,                                            |                             |
]                                            |                             |

## listreceivedbyaddress

```
command:

komodo-cli listreceivedbyaddress

response:

[
  {
    "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
    "account": "",
    "amount": 0.01000000,
    "confirmations": 10,
    "txids": [
      "5e6349567c893bab51a525219e5d2264532f1e73277fa1179449343cf2864211"
    ]
  }
]
```

```
command:

komodo-cli listreceivedbyaddress 6 true

response:

[
  {
    "address": "RSWwtqsNr9mW21UXRm6Lz4AzQnj4pVzzkp",
    "account": "",
    "amount": 0.00000000,
    "confirmations": 0,
    "txids": [
    ]
  },
  {
    "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
    "account": "",
    "amount": 0.01000000,
    "confirmations": 10,
    "txids": [
      "5e6349567c893bab51a525219e5d2264532f1e73277fa1179449343cf2864211"
    ]
  }
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaddress", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

{
  "result": [
    {
      "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
      "account": "",
      "amount": 0.01,
      "confirmations": 10,
      "txids": [
        "5e6349567c893bab51a525219e5d2264532f1e73277fa1179449343cf2864211"
      ]
    },
    {
      "address": "RV3vVf5wPHwtToNzHqMomieLoqyF1VodB1",
      "account": "",
      "amount": 0,
      "confirmations": 0,
      "txids": []
    }
  ],
  "error": null,
  "id": "curltest"
}
```

**listreceivedbyaddress ( minconf includeempty includeWatchonly)**

The `listreceivedbyaddress` method lists balances by receiving address.

### Arguments:

Structure|Type|Description
---------|----|-----------
minconf                                      |(numeric, optional, default=1)|the minimum number of confirmations before payments are included
includeempty                                 |(numeric, optional, default=false)|whether to include addresses that haven't received any payments
includeWatchonly                             |(bool, optional, default=false)|whether to include watchonly addresses (see 'importaddress')

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"involvesWatchonly"                          |(bool)                       |only returned if imported addresses were involved in transaction
"address"                                    |(string)                     |the receiving address
"account"                                    |(string)                     |DEPRECATED the account of the receiving address; the default account is ""
"amount"                                     |(numeric)                    |the total amount received by the address
"confirmations"                              |(numeric)                    |the number of confirmations of the most recent transaction included
}                                            |                             |
,                                            |                             |
]                                            |                             |

## listsinceblock

```
command:

komodo-cli listsinceblock

response:

{
  "transactions": [
    {
      "account": "",
      "address": "RSqt98kgCcXEKLSoMjBkwnMoYpVvHjxqaf",
      "category": "generate",
      "amount": 0.00010000,
      "vout": 0,
      "confirmations": 19,
      "generated": true,
      "blockhash": "02738f05d6e13f4be0ed2c04d472d42112ec03d5f35bd797b8ef0e0fc61dd472",
      "blockindex": 0,
      "blocktime": 1537220864,
      "expiryheight": 0,
      "txid": "a4a589a5c5397ae8a72ee6819ce18703418d21b6ab7370a8f58a8a48dca7cd01",
      "walletconflicts": [
      ],
      "time": 1537220863,
      "timereceived": 1537220863,
      "vjoinsplit": [
      ],
      "size": 99
    },
      ...
  ],
  "lastblock": "003852ef655d7577492ffed079894a66788a8679b4c291f08850b9cea7b20ad0"
}
```

```
command:

komodo-cli listsinceblock "029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327" 6

response:

{
  "transactions": [
    {
      "account": "",
      "address": "RSqt98kgCcXEKLSoMjBkwnMoYpVvHjxqaf",
      "category": "generate",
      "amount": 0.00010000,
      "vout": 0,
      "confirmations": 19,
      "generated": true,
      "blockhash": "02738f05d6e13f4be0ed2c04d472d42112ec03d5f35bd797b8ef0e0fc61dd472",
      "blockindex": 0,
      "blocktime": 1537220864,
      "expiryheight": 0,
      "txid": "a4a589a5c5397ae8a72ee6819ce18703418d21b6ab7370a8f58a8a48dca7cd01",
      "walletconflicts": [
      ],
      "time": 1537220863,
      "timereceived": 1537220863,
      "vjoinsplit": [
      ],
      "size": 99
    },
      ...
  ],
  "lastblock": "0542c8f7c718e062af872b08a8a4469ed1b2f48ecb023533e57997b074a4430f"
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": ["029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:
{
  "transactions": [
    {
       "account": "",
       "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
       "category": "generate",
       "amount": 0.0001,
       "vout": 0,
       "confirmations": 86,
       "generated": true,
       "blockhash": "006b9064941f7b04c5f8c36e6456f30a592b46fc6b256d15e3a9fa36a319b52f",
       "blockindex": 0,
       "blocktime": 1536976225,
       "expiryheight": 0,
       "txid": "0a47e3965b76cd0593fa37dabb8fc1a3fbb0660cd0d9c1ac3fc5ae8c83e3bcd5",
       "walletconflicts": [],
       "time": 1536976224,
       "timereceived": 1536976224,
       "vjoinsplit": [],
       "size": 99
     },
      ...
   ],
   "lastblock": "0542c8f7c718e062af872b08a8a4469ed1b2f48ecb023533e57997b074a4430f"
 },
 "error": null,
 "id": "curltest"
}
```

**listsinceblock ( "blockhash" target-confirmations includeWatchonly )**

The `listsinceblock` method queries all transactions in blocks since block `blockhash`, or all transactions if `blockhash` is omitted.

### Arguments:

Structure|Type|Description
---------|----|-----------
"blockhash"                                  |(string, optional)           |the block hash from which to list transactions
target-confirmations                         |(numeric, optional)          |the confirmations required (must be 1 or more)
includeWatchonly                             |(bool, optional, default=false)|include transactions to watchonly addresses (see also 'importaddress')

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"transactions":                              |                             |
"account"                                    |(string)                     |DEPRECATED the account name associated with the transaction; will be "" for the default account
"address"                                    |(string)                     |the address of the transaction (not present for move transactions -- category = move)
"category"                                   |(string)                     |the transaction category; `send` has negative amounts, `receive` has positive amounts
"amount"                                     |(numeric)                    |the amount of the relevant currency -- negative for the `send` category, and for the `move` category for moves outbound. It is positive for the `receive` category, and for the `move` category for inbound funds.
"vout"                                       |(numeric)                    |the vout value
"fee"                                        |(numeric)                    |the amount of the fee; this value is negative and only available for the `send` category of transactions
"confirmations"                              |(numeric)                    |the number of confirmations for the transaction; available for `send` and `receive` category of transactions
"blockhash"                                  |(string)                     |the block hash containing the transaction; available for the `send` and `receive` categories of transactions
"blockindex"                                 |(numeric)                    |the block index containing the transaction; available for the `send` and `receive` categories of transactions
"blocktime"                                  |(numeric)                    |the block time in seconds since epoch (1 Jan 1970 GMT)
"txid"                                       |(string)                     |the transaction id; available for `send` and `receive` categories of transactions
"time"                                       |(numeric)                    |the transaction time in seconds since epoch (Jan 1 1970 GMT)
"timereceived"                               |(numeric)                    |the time received in seconds since epoch (Jan 1 1970 GMT); available for `send` and `receive` category of transactions
"comment"                                    |(string)                     |whether a comment is associated with the transaction
"to"                                         |(string)                     |whether a 'to' comment is associated with the transaction
],                                           |                             |
"lastblock"                                  |(string)                     |the hash of the last block
}                                            |                             |

## listtransactions

```
command:

komodo-cli listtransactions

response:

[
  {
    "account": "",
    "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
    "category": "generate",
    "amount": 0.00021689,
    "vout": 0,
    "confirmations": 10,
    "generated": true,
    "blockhash": "038a888c0a6e6c8103684f3a7b53dcab71186c7cb2136fd298f7900b3da05d94",
    "blockindex": 0,
    "blocktime": 1537223045,
    "expiryheight": 0,
    "txid": "760788836335913068a66d3e4279233214b96a7dfc7757b899ea5d700aa4bc57",
    "walletconflicts": [
    ],
    "time": 1537223044,
    "timereceived": 1537223044,
    "vjoinsplit": [
    ],
    "size": 99
  }
  , ... (9 responses ommitted from documentation for brevity)
]
```

```
command:

komodo-cli listtransactions "*" 20 100

result:

[
  {
    "account": "",
    "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
    "category": "generate",
    "amount": 0.00010000,
    "vout": 0,
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

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtransactions", "params": ["*", 20, 100] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:
{
  [
    {
      "account": "",
      "address": "RTcwYaQPDVN7V9SdfFHARWnoB7vcpSfdvs",
      "category": "generate",
      "amount": 0.0001,
      "vout": 0,
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

**listtransactions ( "account" count from includeWatchonly )**

The `listtransactions` method returns up to `count` most recent transactions skipping the first `from` transactions for `account`.

### Arguments:

Structure|Type|Description
---------|----|-----------
"account"                                    |(string, optional)           |DEPRECATED the account name; should be `"*"`
count                                        |(numeric, optional, default=10)|the number of transactions to return
from                                         |(numeric, optional, default=0)|the number of transactions to skip
includeWatchonly                             |(bool, optional, default=false)|include transactions to watchonly addresses (see `importaddress`)

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"account"                                    |(string)                     |DEPRECATED the account name associated with the transaction; it will be "" for the default account
"address"                                    |(string)                     |the address of the transaction; not present for move transactions (category = move)
"category"                                   |(string)                     |The transaction category. This property can be `send` | `receive` | `move`. `move` is a local (off blockchain) transaction between accounts -- not associated with an address, transaction id, or block. `send` and `receive` transactions are associated with an address, transaction id, and block details.
"amount"                                     |(numeric)                    |The amount. This value is negative for the `send` category, and for the `move` category for moves outbound. It is positive for the `receive` category and for the `move` category for inbound funds.
"vout"                                       |(numeric)                    |the vout value
"fee"                                        |(numeric)                    |the amount of the fee; this is negative and only available for the `send` category of transactions
"confirmations"                              |(numeric)                    |the number of confirmations for the transaction; available for the `send` and `receive` categories of transactions
"blockhash"                                  |(string)                     |the block hash containing the transaction; available for the `send` and `receive` categories of transactions
"blockindex"                                 |(numeric)                    |the block index containing the transaction; available for the `send` and `receive` categories of transactions
"txid"                                       |(string)                     |the transaction id; available for the `send` and `receive` categories of transactions
"time"                                       |(numeric)                    |the transaction time in seconds since epoch (midnight Jan 1 1970 GMT)
"timereceived"                               |(numeric)                    |the time received in seconds since epoch (midnight Jan 1 1970 GMT); available for the `send` and `receive` categories of transactions
"comment"                                    |(string)                     |whether a comment is associated with the transaction
"otheraccount"                               |(string)                     |for the `move` category of transactions; indicates the account which sent the funds (for receiving funds, positive amounts), or went to (for sending funds, negative amounts)
"size"                                       |(numeric)                    |transaction size in bytes
}                                            |                             |
]                                            |                             |

## listunspent

```
command:

komodo-cli listunspent

response:

[
  {
    "txid": "269b658b9a52e9142c96f3a49c0ad917e5d0c08126baa96713827267137d150f",
    "vout": 0,
    "generated": true,
    "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
    "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
    "amount": 0.00010000,
    "interest": 0.00000000,
    "confirmations": 6,
    "spendable": true
  },
    ...
]
```

```
command:

komodo-cli listunspent 6 9999999 '["RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu","RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"]'

response:

[
  {
    "txid": "0ca752c996c4074ca62071cdbf848ccd33864894151f982024006b3d69d021ac",
    "vout": 0,
    "generated": true,
    "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
    "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
    "amount": 0.00010000,
    "interest": 0.00000000,
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
    "interest": 0.00000000,
    "confirmations": 21,
    "spendable": true
  }
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listunspent", "params": [6, 9999999, ["RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu","RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    {
      "txid": "0ca752c996c4074ca62071cdbf848ccd33864894151f982024006b3d69d021ac",
      "vout": 0,
      "generated": true,
      "address": "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
      "scriptPubKey": "21037e631c6a03d028e48aecfd93b2d2737d5d7e2852a426b940ff301f78aa31690cac",
      "amount": 0.00010000,
      "interest": 0.00000000,
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
      "interest": 0.00000000,
      "confirmations": 21,
      "spendable": true
    }
  ],
  "error": null,
  "id": "curltest"
}
```

**listunspent ( minconf maxconf  ["address", ... ] )**

The `listunspent` method returns an array of unspent transaction outputs, with a range between `minconf` and `maxconf` (inclusive) confirmations. The method can, optionally, filter to only include `txouts` paid to specified addresses.

### Arguments:

Structure|Type|Description
---------|----|-----------
minconf                                      |(numeric, optional, default=1)|the minimum confirmations to filter
maxconf                                      |(numeric, optional, default=9999999)|the maximum confirmations to filter
[                                            |                             |
"address"                                    |(string)                     |a series of addresses
,                                            |                             |
]                                            |                             |

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"txid"                                       |(string)                     |the transaction id
"vout"                                       |(numeric)                    |the vout value
"generated"                                  |(boolean)                    |true if txout is a coinbase transaction output
"address"                                    |(string)                     |the address
"account"                                    |(string)                     |DEPRECATED the associated account, or "" for the default account
"scriptPubKey"                               |(string)                     |the script key
"amount"                                     |(numeric)                    |the transaction amount
"confirmations"                              |(numeric)                    |the number of confirmations
}                                            |                             |
,                                            |                             |
]                                            |                             |

## lockunspent

```
command:

komodo-cli lockunspent false '[{"txid":"d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd","vout":0}]'

response:

true
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "lockunspent", "params": [false, [{"txid":"d7ba45296c66e16eb61f27a4eef8848c7f5579fe801f277c1b0e074a4f47d6fd","vout":0}]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": true,
  "error": null,
  "id": "curltest"
}
```

**lockunspent unlock [{ "txid": "txid", "vout": n }, ... ]**

The `lockunspent` method locks (unlock = `false`) or unlocks (unlock = `true`) specified transaction outputs. A locked transaction output will not be chosen by automatic coin selection, when spending the relevant coin. The locks are stored in memory only; at runtime a node always starts with zero locked outputs, and the locked output list is always cleared when a node stops or fails.

<aside class="notice">
  See the <b>listunspent</b> and <b>listlockunspent</b> calls to determine local transaction state and info.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
unlock                                       |(boolean, required)          |whether to unlock (true) or lock (false) the specified transactions
[                                            |                             |
{                                            |                             |
"txid"                                       |(string)                     |the transaction id
"vout"                                       |(numeric)                    |the output number
}                                            |                             |
,                                            |                             |
]                                            |                             |

### Response:

Structure|Type|Description
---------|----|-----------
true/false                                   |(boolean)                    |whether the command was successful

## move

```
command:

komodo-cli move "" "tabby" 0.01

response:

(deprecated)
```

```
command:

komodo-cli move "timotei" "akiko" 0.01 6 "happy birthday!"

response:

(deprecated)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "move", "params": ["timotei", "akiko", 0.01, 6, "happy birthday!"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(deprecated)
```

**move "fromaccount" "toaccount" amount ( minconf "comment" )**

<aside class="notice">
  DEPRECATED
</aside>

The `move` method moves a specified amount from one account in your wallet to another.

### Arguments:

Structure|Type|Description
---------|----|-----------
"fromaccount"                                |(string, required)           |MUST be set to the empty string "" to represent the default account; passing any other string will result in an error
"toaccount"                                  |(string, required)           |MUST be set to the empty string "" to represent the default account; passing any other string will result in an error
amount                                       |(numeric)                    |quantity to move between accounts
minconf                                      |(numeric, optional, default=1)|only use funds with at least this many confirmations
"comment"                                    |(string, optional)           |an optional comment, stored in the wallet only

### Response:

Structure|Type|Description
---------|----|-----------
true/false                                   |(boolean)                    |true if successful

## resendwallettransactions

```
command:

komodo-cli resendwallettransactions

response:

[
  "4e847051279ead30fb2d8d53cc0d4649f62c85a44b23f90152d2ef4ed6af2006"
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "resendwallettransactions", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    "4e847051279ead30fb2d8d53cc0d4649f62c85a44b23f90152d2ef4ed6af2006"
  ],
  "error": null,
  "id": "curltest"
}
```

**resendwallettransactions**

The `resendwallettransactions` method immediately re-broadcasts unconfirmed wallet transactions to all peers. This method is intended only for testing; the wallet code periodically re-broadcasts automatically.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
"transaction_id"                             |(string)                     |an array of the rebroadcasted transaction id's
]                                            |                             |

## sendfrom

```
command:

komodo-cli sendfrom "" "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu" 0.01

response:

(deprecated)
```

```
command:

komodo-cli sendfrom "tabby" "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu" 0.01 6 "donation" "seans outpost"

response:

(deprecated)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendfrom", "params": ["tabby", "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu", 0.01, 6, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(deprecated)
```

**sendfrom "account" "address" amount ( minconf "comment" "comment-to" )**

<aside class="notice">
  DEPRECATED: Use <b>sendtoaddress</b> instead.
</aside>

The `sendfrom` method sends an amount from `account` to `address`.

### Arguments:

Structure|Type|Description
---------|----|-----------
"account"                                    |(string, required)           |MUST be set to the empty string "" to represent the default account; passing any other string will result in an error
"address"                                    |(string, required)           |the address to receive funds
amount                                       |(numeric, required)          |the amount (transaction fee not included)
minconf                                      |(numeric, optional, default=1)|only use funds with at least this many confirmations
"comment"                                    |(string, optional)           |a comment used to store what the transaction is for; this is not part of the transaction, just kept in your wallet
"comment-to"                                 |(string, optional)           |an optional comment to store the name of the person or organization to which you're sending the transaction; this is not part of the transaction, it is only kept in your wallet

### Response:

Structure|Type|Description
---------|----|-----------
"transaction_id"                             |(string)                     |the transaction id

## sendmany

```
command:

komodo-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}'

response:

e39b046f0e30bd2a80c64ec78d902107858c8f0d55097d7f2293df1c9a4496ae
```

```
command:

komodo-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}' 6 "testing"

response:

3829164d8a68d9b7c2c89efe419eca77e37883318b7187b7e000e80e8138a370
```

```
command:

komodo-cli sendmany "" '{"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}' 1 "" '["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ","RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu"]'

response:

1813a39247913abf73af10ed51537234fe4e58eb5cfc4f49ac4fbcdecb42b4b4
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendmany", "params": ["", {"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ":0.01,"RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu":0.02}, 6, "testing"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "fe7db27ed66b9d999c21d3cc9c8c687bd68721d711da6573a0a0ccf75c1cace5",
  "error": null,
  "id": "curltest"
}
```

**sendmany "account" { "address": amount, ... } ( minconf "comment" [ "address", ... ] )**

The `sendmany` method can send multiple transactions at once. Amounts are double-precision floating point numbers.

### Arguments:

Structure|Type|Description
---------|----|-----------
"account"                                    |(string, required)           |MUST be set to the empty string "" to represent the default account; passing any other string will result in an error
"amounts"                                    |                             |
{                                            |                             |
"address":amount                             |("string":numeric)           |the address (string) and the value (double-precision floating numeric)
,                                            |                             |
}                                            |                             |
minconf                                      |(numeric, optional, default=1)|only use the balance confirmed at least this many times
"comment"                                    |(string, optional)           |a comment
subtractfeefromamount                        |(string, optional)           |a json array with addresses. The fee will be equally deducted from the amount of each selected address; the recipients will receive less than you enter in their corresponding amount field. If no addresses are specified here, the sender pays the fee.
[                                            |                             |
"address"                                    |(string)                     |subtract fee from this address
,                                            |                             |
]                                            |                             |

### Response:

Structure|Type|Description
---------|----|-----------
"transaction_id"                             |(string)                     |the transaction id for the send; only 1 transaction is created regardless of the number of addresses

## sendtoaddress

```
command:

komodo-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1

response:

cc23924c007adc98b8ea5b9b8b47638e080aa469eb9738b976def487a44f467b
```

```
command:

komodo-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1 "donation" "seans outpost"

response:

86948c27dc63be415b235c5b3ed807c1e07d9a2cac252f58734add700c55fe18
```

```
command:

komodo-cli sendtoaddress "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" 0.1 "" "" true

response:

c5727cafd7d6dfc888d4a0596dc58bfafb24859e29f827e1bf1443037d8461fc
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", 0.1, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "6e411f3534af8847d705d87934f6061046e2034abad96b7a1fb1d3996129cb1e",
  "error": null,
  "id": "curltest"
}
```

**sendtoaddress "address" amount ( "comment" "comment-to" subtractfeefromamount )**

The `sendtoaddress` method sends an amount to a given address. The amount is real and is rounded to the nearest 0.00000001.

### Arguments:

Structure|Type|Description
---------|----|-----------
"komodoaddress"                              |(string, required)           |the receiving address
"amount"                                     |(numeric, required)          |the amount to send (json requires all decimals values less than 1 begin with the characters '0.')
"comment"                                    |(string, optional)           |a comment used to store what the transaction is for; this is not part of the transaction, just kept in your wallet
"comment-to"                                 |(string, optional)           |a comment to store the name of the person or organization to which you're sending the transaction; this is stored in your local wallet file only
subtractfeefromamount                        |(boolean, optional, default=false)|when `true`, the fee will be deducted from the amount being sent

### Response:

Structure|Type|Description
---------|----|-----------
"transaction_id"                             |(string)                     |the transaction id

## setaccount

```
command:

komodo-cli setaccount "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "tabby"

response:

(deprecated)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setaccount", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", "tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(deprecated)
```

**setaccount "address" "account"**

<aside class="notice">
  DEPRECATED
</aside>

The `setaccount` method sets the account associated with the given address.

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string, required)           |the address to be associated with an account
"account"                                    |(string, required)           |MUST be set to the empty string "" to represent the default account; passing any other string will result in an error

## settxfee

```
command:

komodo-cli settxfee 0.00001

response:

true
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "settxfee", "params": [0.00001] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": true,
  "error": null,
  "id": "curltest"
}
```

**settxfee amount**

The `settxfee` method sets the transaction fee per kB.

### Arguments:

Structure|Type|Description
---------|----|-----------
amount                                       |(numeric, required)          |the transaction fee in COIN/kB rounded to the nearest 0.00000001

### Response:

Structure|Type|Description
---------|----|-----------
true/false                                   |(boolean)                    |returns true if successful

## signmessage

> Create the signature:

```
command:

komodo-cli signmessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "my message"

response:

H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=
```

> Verify the signature:

```
command:

komodo-cli verifymessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=" "my message"

response:

true
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessage", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=",
  "error": null,
  "id": "curltest"
}
```

**signmessage "address" "message"**

The `signmessage` method signs a message via the private key of an address.

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string, required)           |the address to use for the private key
"message"                                    |(string, required)           |the message

### Response:

Structure|Type|Description
---------|----|-----------
"signature"                                  |(string)                     |the signature of the message encoded in base 64

## z_exportkey

```
command:

komodo-cli z_exportkey "ztffWAUUY9PnLiBVXY2pnX67kfm71SevtPC5d9LLM3xZqehy4XxV1FeyxPWcHGTiCd7GtQ17gk5jDTQxhHB13K1A7HT6hZH"

response:

DONOTUSExxxxxxxxxxxxxxxxV6EyPpaZFVDsqeNB6k8eoLFERdag
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_exportkey", "params": ["ztffWAUUY9PnLiBVXY2pnX67kfm71SevtPC5d9LLM3xZqehy4XxV1FeyxPWcHGTiCd7GtQ17gk5jDTQxhHB13K1A7HT6hZH"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "DONOTUSExxxxxxxxxxxxxxxxV6EyPpaZFVDsqeNB6k8eoLFERdag",
  "error": null,
  "id": "curltest"
}
```

**z_exportkey "z_address"**

The `z_exportkey` method reveals the private z_key corresponding to `z_address`.

<aside class="notice">
  See also <b>z_importkey</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"z_address"                                  |(string, required)           |the z_address for the private key

### Response:

Structure|Type|Description
---------|----|-----------
"key"                                        |(string)                     |the private key

## z_exportviewingkey

```
command:

komodo-cli z_exportviewingkey "ztffWAUUY9PnLiBVXY2pnX67kfm71SevtPC5d9LLM3xZqehy4XxV1FeyxPWcHGTiCd7GtQ17gk5jDTQxhHB13K1A7HT6hZH"

response:

ZiVtf1yjjR9DeDNNgd4kvRgS1oovQwfK6xt2csfhTwpbUVjnC9RrEeuVkAfJrxN1jDR3d7vR6XmLne4vC9SCYR5F9XMzW19VJ
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_exportviewingkey", "params": ["ztffWAUUY9PnLiBVXY2pnX67kfm71SevtPC5d9LLM3xZqehy4XxV1FeyxPWcHGTiCd7GtQ17gk5jDTQxhHB13K1A7HT6hZH"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "ZiVtf1yjjR9DeDNNgd4kvRgS1oovQwfK6xt2csfhTwpbUVjnC9RrEeuVkAfJrxN1jDR3d7vR6XmLne4vC9SCYR5F9XMzW19VJ",
  "error": null,
  "id": "curltest"
}
```

**z_exportviewingkey "z_address"**

The `z_exportviewingkey` method reveals the viewing key corresponding to `z_address`.

<aside class="notice">
  See also <b>z_importviewingkey</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"z_address"                                  |(string, required)           |the z_address for the viewing key

### Response:

Structure|Type|Description
---------|----|-----------
"vkey"                                       |(string)                     |the viewing key

## z_exportwallet

```
command:

komodo-cli z_exportwallet "test"

response:

/home/myusername/mydirector/test
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_exportwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "/home/myusername/mydirector/test",
  "error": null,
  "id": "curltest"
}
```

**z_exportwallet "filename"**

The `z_exportwallet` method exports all wallet keys, including both t address and z address types, in a human-readable format.  Overwriting an existing file is not permitted.

### Arguments:

Structure|Type|Description
---------|----|-----------
"filename"                                   |(string, required)           |the filename, saved to the directory indicated by the [`exportdir`](#exportdir) parameter at daemon runtime (required)

### Response:

Structure|Type|Description
---------|----|-----------
"path"                                       |(string)                     |the full path of the destination file

## z_getbalance

> The total amount received by address "myaddress" at least 5 blocks confirmed

```
command:

komodo-cli z_getbalance "ztfF6SFBfq2qha73dAgsXnL86F8air32CXKxJg8aYtEPJFdLcw4y3zWzBasocnx1V9GLnnFeKnkPvkScjNkQBfWn2kBDmkn"

response:

0.01980000
```

```
command:

komodo-cli z_getbalance "ztfF6SFBfq2qha73dAgsXnL86F8air32CXKxJg8aYtEPJFdLcw4y3zWzBasocnx1V9GLnnFeKnkPvkScjNkQBfWn2kBDmkn" 5

response:

0.01980000
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getbalance", "params": ["ztfF6SFBfq2qha73dAgsXnL86F8air32CXKxJg8aYtEPJFdLcw4y3zWzBasocnx1V9GLnnFeKnkPvkScjNkQBfWn2kBDmkn", 5] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": 0.0198,
  "error": null,
  "id": "curltest"
}
```

**z_getbalance "address" ( minconf )**

The `z_getbalance` method returns the balance of a t address or z address belonging to the node’s wallet.

<aside class="warning">
  CAUTION: If <b>address</b> is a watch-only z address, the returned balance may be larger than the actual balance,
  as spends cannot be detected with incoming viewing keys.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string)                     |the selected z or t address
minconf                                      |(numeric, optional, default=1)|only include transactions confirmed at least this many times

### Response:

Structure|Type|Description
---------|----|-----------
amount                                       |(numeric)                    |the total amount received at this address (in the relevant COIN value)

## z_getnewaddress

```
command:

komodo-cli z_getnewaddress

response:

ztbUD83kXgHt3A1M282wFvT9Ms6SiBCd6GSbQbPa2C7UtPojVZjPENytFqu7JxgnsgL9EN42xWnyhhzniHYSRJDnEPTgo3Y
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3",
  "error": null,
  "id": "curltest"
}
```

**z_getnewaddress**

The `z_getnewaddress` method returns a new z_address for receiving payments.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
"z_address"                                  |(string)                     |the new z_address

## z_getoperationresult

```
command:

komodo-cli z_getoperationresult '["opid-6e581ee5-4e90-4e70-8961-f95d8d28748c"]'

response:

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

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getoperationresult", "params": [["opid-6a9da0dd-a950-4d95-848c-d3c18e44be03"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

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

**z_getoperationresult ([ "operationid", ... ])**

The `z_getoperationresult` method retrieves the result and status of an operation which has finished, and then removes the operation from memory.

<aside class="notice">
  See also <b>z_getoperationstatus</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
"operationid"                                |(string, optional)           |a list of operation ids to query; if not provided, the method examines all operations known to the node
,                                            |                             |
]                                            |                             |

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"id"                                         |(string)                     |the operation id
"status"                                     |(string)                     |the result of the operation; can be `success` | `failed` | `executing`
"creation_time"                              |(numeric)                    |the creation time, in seconds since epoch (Jan 1 1970 GMT)
"result":                                    |                             |
"txid":                                      |(string)                     |the transaction id
},                                           |                             |
"execution_secs"                             |(numeric)                    |the length of time to calculate the transaction
"method"                                     |(string)                     |the name of the method used in the operation
"params":                                    |                             |
"fromaddress"                                |(string)                     |the address from which funds are drawn
"amounts":                                   |                             |
{                                            |                             |
"address"                                    |(string)                     |the receiving address
"amount"                                     |(numeric)                    |the amount to receive
}                                            |                             |
,                                            |                             |
],                                           |                             |
"minconf"                                    |(numeric)                    |the minimum number of confirmations required
"fee"                                        |(numeric)                    |the transaction fee
}                                            |                             |
}                                            |                             |
]                                            |                             |

## z_getoperationstatus

```
command:

komodo-cli z_getoperationstatus

response:

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

```
command:

komodo-cli z_getoperationstatus '["opid-47e12224-8477-4cd4-852d-d8c3ddbc6375"]'

response:

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

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getoperationstatus", "params": [["opid-47e12224-8477-4cd4-852d-d8c3ddbc6375"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

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

**z_getoperationstatus ([ "operationid", ... ])**

The `z_getoperationstatus` message queries the operation status and any associated result or error data of any `operationid` stored in local memory. The operation will remain in memory (unlike `z_getoperationresult`, which removes the data from the local memory).

### Arguments:

Structure|Type|Description
---------|----|-----------
"operationid"                                |(array, optional)            |a list of operation ids we are interested in; if an array is not provided, the method examines all operations known to the node

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"id"                                         |(string)                     |the operation id
"status"                                     |(string)                     |the status of the operation; can be `success` | `executing` | `failed`
"creation_time"                              |(numeric)                    |the creation time, in seconds since epoch (Jan 1 1970 GMT)
"error":                                     |                             |
"code"                                       |(numeric)                    |the associated error code
"message"                                    |(string)                     |a message to indicate the nature of the error, if such a message is available
},                                           |                             |
"method"                                     |(string)                     |name of the method used in the operation
"params":                                    |                             |
"fromaddress"                                |(string)                     |the address from which funds are drawn
"amounts":                                   |                             |
{                                            |                             |
"address"                                    |(string)                     |the receiving address
"amount"                                     |(numeric)                    |the amount to receive
}                                            |                             |
],                                           |                             |
"minconf"                                    |(numeric)                    |indicates the required number of mining confirmations
"fee"                                        |(numeric)                    |the fee
}                                            |                             |
}                                            |                             |
]                                            |                             |

## z_gettotalbalance

```
command:

komodo-cli z_gettotalbalance

response:

{
  "transparent": "9.98794883",
  "interest": "0.00",
  "private": "0.08205",
  "total": "10.06999883"
}
```

```
command:

komodo-cli z_gettotalbalance 5

response:

{
  "transparent": "9.98794883",
  "interest": "0.00",
  "private": "0.08205",
  "total": "10.06999883"
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_gettotalbalance", "params": [5] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

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

**z_gettotalbalance ( minconf includeWatchonly )**

The `z_gettotalbalance` method returns the total value of funds, including both transparent and private, stored in the node’s wallet.

<aside class="warning">
  CAUTION: If the wallet contains watch-only z addresses the returned private balance may be larger than the actual balance, as spends cannot be detected with incoming viewing keys.
</aside>

<aside class="notice">
  While the <b>interest</b> property is returned for all KMD-based coin daemons, only the main KMD chain utilizes the interest feature. KMD-based asset chains will always return a <b>0.00</b> interest value.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
minconf                                      |(numeric, optional, default=1)|only include private and transparent transactions confirmed at least this many times
includeWatchonly                             |(bool, optional, default=false)|also include balance in watchonly addresses (see 'importaddress' and 'z_importviewingkey')

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"transparent"                                |(numeric)                    |the total balance of transparent funds
"interest"                                   |(numeric)                    |the total balance of unclaimed interest earned
"private"                                    |(numeric)                    |the total balance of private funds
"total"                                      |(numeric)                    |the total balance of both transparent and private funds
}                                            |                             |

## z_importkey

```
command:

komodo-cli z_importkey "DONOTUSExxxxxxxxxxxxxxxxBP6ipkmBxmEQbugcCQ16vUaWGFK"

response:

(none)
```

```
command:

komodo-cli z_importkey "DONOTUSExxxxxxxxxxxxxxxxBP6ipkmBxmEQbugcCQ16vUaWGFK" whenkeyisnew 30000

response:

(none)
```

```
command:

komodo-cli z_importkey "DONOTUSExxxxxxxxxxxxxxxxBP6ipkmBxmEQbugcCQ16vUaWGFK" yes 20000

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_importkey", "params": ["DONOTUSExxxxxxxxxxxxxxxxBP6ipkmBxmEQbugcCQ16vUaWGFK", "no"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

**z_importkey "z_privatekey" ( rescan startHeight )**

The `z_importkey` method imports `z_privatekey` to your wallet.

<aside class="notice">
  This call can take minutes to complete if <b>rescan</b> is true.
</aside>

<aside class="notice">
  The optional parameters are currently not functional with KMD-based blockchains.
</aside>

<aside class="notice">
  See also <b>z_exportkey</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"z_privatekey"                               |(string, required)           |the z_privatekey (see [`z_exportkey`](#z_exportkey))
rescan                                       |(string, optional, default=`"whenkeyisnew"`)|rescan the wallet for transactions; can be `yes` | `no` | `whenkeyisnew`
startHeight                                  |(numeric, optional, default=0)|block height to start rescan

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## z_importviewingkey

```
command:

komodo-cli z_importviewingkey "ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja"

response:

(none)

```

```
command:

komodo-cli z_importviewingkey "ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja" no

response:

(none)
```

```
command:

komodo-cli z_importviewingkey "ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja" whenkeyisnew 30000

response:

(none)
```

```
command:

komodo-cli z_importviewingkey "ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja" yes 20000

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_importviewingkey", "params": ["ZiVtfYkeyRY3y8Wykm5zjLcnssEkVrkej6j3kQ5B1AE2qp2F3VsKzpoXTzD82hrvMjWB9WxCHbXXrXax2ceyHLWrnQDaMrMja", "no"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(none)
```

**z_importviewingkey "viewing_key" ( rescan startHeight )**

The `z_importviewingkey` adds a viewing key to your wallet. This method allows you to view the balance in a z address that otherwise does not belong to your wallet.

<aside class="notice">
  See also <b>z_exportviewingkey</b>.
</aside>

<aside class="notice">
  This call can take minutes to complete if <b>rescan</b> is true.
</aside>

<aside class="notice">
  The optional parameters are currently not functional for KMD-based blockchains.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"viewing_key"                                |(string, required)           |the viewing key
rescan                                       |(string, optional, default="whenkeyisnew")|rescan the wallet for transactions; can be `"yes"` | `"no"` | `"whenkeyisnew"`
startHeight                                  |(numeric, optional, default=0)|block height to start rescan

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## z_importwallet

```
command:

komodo-cli z_importwallet "/mydirectory/nameofbackup"

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_importwallet", "params": ["/mydirectory/nameofbackup"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

**z_importwallet "filename"**

The `z_importwallet` method imports t address and z address keys from a wallet export file.

<aside class="notice">
  See also <b>z_exportwallet</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"filename"                                   |(string, required)           |the wallet file

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## z_listaddresses

```
command:

komodo-cli z_listaddresses

response:

[
  "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP",
  "ztbUD83kXgHt3A1M282wFvT9Ms6SiBCd6GSbQbPa2C7UtPojVZjPENytFqu7JxgnsgL9EN42xWnyhhzniHYSRJDnEPTgo3Y"
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_listaddresses", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP",
    "ztbUD83kXgHt3A1M282wFvT9Ms6SiBCd6GSbQbPa2C7UtPojVZjPENytFqu7JxgnsgL9EN42xWnyhhzniHYSRJDnEPTgo3Y"
  ],
  "error": null,
  "id": "curltest"
}
```

**z_listaddresses ( includeWatchonly )**

The `z_listaddresses` method returns the list of z addresses belonging to the wallet.

<aside class="notice">
  See also <b>z_importviewingkey</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
includeWatchonly                             |(bool, optional, default=false)|also include watchonly addresses

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
"z_address"                                  |(string)                     |a z address belonging to the wallet
,                                            |                             |
]                                            |                             |

## z_listoperationids


```
command:

komodo-cli z_listoperationids

response:

[
  "opid-47e12224-8477-4cd4-852d-d8c3ddbc6375",
  "opid-b650b582-c2f5-43e0-9a65-9fe23f65c1a5"
]
```

```
command:

komodo-cli z_listoperationids "success"

response:

[
  "opid-47e12224-8477-4cd4-852d-d8c3ddbc6375"
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_listoperationids", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    "opid-47e12224-8477-4cd4-852d-d8c3ddbc6375",
    "opid-b650b582-c2f5-43e0-9a65-9fe23f65c1a5"
  ],
  "error": null,
  "id": "curltest"
}
```

**z_listoperationids**

The `z_listoperationids` method returns the list of operation ids currently known to the wallet.

### Arguments:

Structure|Type|Description
---------|----|-----------
"status"                                     |(string, optional)           |filter result by the operation's state e.g. "success"

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
"operationid"                                |(string)                     |an operation id belonging to the wallet
,                                            |                             |
]                                            |                             |

## z_listreceivedbyaddress

```
command:

komodo-cli z_listreceivedbyaddress "ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf"

response:

[
  {
    "txid": "8f68178ad521c8cc0f22d9589d07dbe52a1c775fae1840c0a129955d13928704",
    "amount": 0.01000000,
    "memo": "f600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

```
command:

komodo-cli z_listreceivedbyaddress "ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf" 2

response:

[
  {
    "txid": "8f68178ad521c8cc0f22d9589d07dbe52a1c775fae1840c0a129955d13928704",
    "amount": 0.01000000,
    "memo": "f600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_listreceivedbyaddress", "params": ["ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    {
      "txid": "8f68178ad521c8cc0f22d9589d07dbe52a1c775fae1840c0a129955d13928704",
      "amount": 0.01,
      "memo": "f600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    }
  ],
  "error": null,
  "id": "curltest"
}
```

**z_listreceivedbyaddress "z_address" ( minconf )**

The `z_listreceivedbyaddress` method returns a list of amounts received by a z address belonging to the node’s wallet.

### Arguments:

Structure|Type|Description
---------|----|-----------
"z_address"                                  |(string)                     |the private address
minconf                                      |(numeric, optional, default=1)|only include transactions confirmed at least this many times

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"txid"                                       |(string)                     |the transaction id
"amount"                                     |(numeric)                    |the amount of value in the note
"memo"                                       |(string)                     |hexademical string representation of memo field
}                                            |                             |

## z_mergetoaddress

```
command:

komodo-cli z_mergetoaddress '["t1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd"]' ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf

response:

(disabled)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_mergetoaddress", "params": [["t1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd"], "ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(disabled)
```

**z_mergetoaddress [ "fromaddress", ... ] "toaddress" ( fee ) ( transparent_limit ) ( shielded_limit ) ( memo )**

<aside class="warning">
CAUTION: <b>z_mergetoaddress</b> is DISABLED but can be enabled as an experimental feature.
</aside>

The `z_mergetoaddress` method merges multiple utxos and notes into a single utxo or note. The method works for both t addresses and z addresses, both separately and in combination.  Coinbase utxos are ignored; use `z_shieldcoinbase` to combine those into a single note.

This is an asynchronous operation, and utxos selected for merging will be locked.  If there is an error, they are unlocked.  The RPC call `listlockunspent` can be used to return a list of locked utxos.

The number of utxos and notes selected for merging can be limited by the caller.  If the transparent limit parameter is set to `0`, the `mempooltxinputlimit` option will determine the number of utxos. Any limit is constrained by the consensus rule defining a maximum transaction size of 100000 bytes.

### The fromaddresses array

The following special strings are accepted inside the `fromaddresses` array:

 - `"*"`: Merge both utxos and notes from all addresses belonging to the wallet

 - `"ANY_TADDR"`: Merge utxos from all t addresses belonging to the wallet

 - `"ANY_ZADDR"`: Merge notes from all z addresses belonging to the wallet

If a special string is given, any given addresses of that type will be ignored

### Arguments:

Structure|Type|Description
---------|----|-----------
fromaddresses                                |(string, required)           |
[                                            |                             |
"address"                                    |(string)                     |can be a t address or a z address
,                                            |                             |
]                                            |                             |
"toaddress"                                  |(string, required)           |the t address or z address to receive the combined utxo
fee                                          |(numeric, optional, default=0.0001)|the fee amount to attach to this transaction
transparent_limit                            |(numeric, optional, default=50)|limit on the maximum number of transparent UTXOs to merge; you may set this value to 0 to use the node option [`mempooltxinputlimit`](#mempooltxinputlimit)
shielded_limit                               |(numeric, optional, default=10)|limit on the maximum number of hidden notes to merge; you may set this value to 0 to merge as many as will fit in the transaction
"memo"                                       |(string, optional)           |encoded as hex; when ``toaddress`` is a z address, this value will be stored in the memo field of the new note

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"remainingUTXOs"                             |(numeric)                    |number of utxos still available for merging
"remainingTransparentValue"                  |(numeric)                    |value of utxos still available for merging
"remainingNotes"                             |(numeric)                    |number of notes still available for merging
"remainingShieldedValue"                     |(numeric)                    |value of notes still available for merging
"mergingUTXOs"                               |(numeric)                    |number of utxos being merged
"mergingTransparentValue"                    |(numeric)                    |value of utxos being merged
"mergingNotes"                               |(numeric)                    |number of notes being merged
"mergingShieldedValue"                       |(numeric)                    |value of notes being merged
"opid"                                       |(string)                     |an operationid to pass to `z_getoperationstatus` to get the result of the operation
}                                            |                             |

## z_sendmany

```
command:

komodo-cli z_sendmany "RUX5vGkxJCKBPGm8b97VUumt2aHkuCjp8e" '[{"address":"RVEsww91UBdUNGyCC1GjDVuvJShEei2kj4","amount":0.01}]'

response:

opid-ad947755-b348-4842-90ca-0f0c71d13d34
```

```
command:

komodo-cli z_sendmany "RCpMUZwxc3pWsgip5aj3Sy1cKkh86P3Tns" '[{"address":"ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3","amount":0.01}]'

response:

opid-cdd6af37-88a2-44d7-9630-d54d21f8b1c4
```

```
command:

komodo-cli z_sendmany "ztci8RzNSo2pdiDpAeHpz9Rp91hq12Mn7zcFfBR8Jjs2ydZUCTw8rLZzkVP888M4vGezpZVfsTR8orgxYK3N8gdgbBzakx3" '[{"address":"ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP","amount":0.0099}]'

response:

opid-3c3d6f25-f333-4898-8a50-06f4012cf975
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_sendmany", "params": ["RCpMUZwxc3pWsgip5aj3Sy1cKkh86P3Tns", [{"address": "ztfaW34Gj9FrnGUEf833ywDVL62NWXBM81u6EQnM6VR45eYnXhwztecW1SjxA7JrmAXKJhxhj3vDNEpVCQoSvVoSpmbhtjf" ,"amount": 0.01}]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": "opid-73306924-3466-4944-a8f7-c45c14be0438",
  "error": null,
  "id": "curltest"
}
```

**z_sendmany "fromaddress" [ { "address": ..., "amount": ... }, ... ] \( minconf ) ( fee )**

The `z_sendmany` method sends one or more transactions at once, and allows for sending transactions of types `t --> z`, `z --> z`, `z --> t`. It is the principle method for dealing with shielded `z` transactions in the Komodo ecosystem.

The `amount` values are double-precision floating point numbers. Change from a t address flows to a new t address address, while change from z address returns to itself. When sending coinbase utxos to a z address, change is not allowed. The entire value of the utxo(s) must be consumed. Currently, the maximum number of z address outputs is 54 due to transaction-size limits.

### Arguments:

Structure|Type|Description
---------|----|-----------
"fromaddress"                                |(string, required)           |the sending t address or z address
"amounts"                                    |                             |
[                                            |                             |
{                                            |                             |
"address"                                    |(string, required)           |the receiving address; can be a t address or z address
"amount"                                     |(numeric, required)          |the numeric amount
"memo"                                       |(string, optional)           |if the address is a z address, this property accepts raw data represented in hexadecimal string format
}                                            |                             |
,                                            |                             |
]                                            |                             |
minconf                                      |(numeric, optional, default=1)|only use funds confirmed at least this many times
fee                                          |(numeric, optional, default=0.0001)|the fee amount to attach to this transaction

### Response:

Structure|Type|Description
---------|----|-----------
"operationid"                                |(string)                     |an operationid to pass to z_getoperationstatus to get the result of the operation

## z_shieldcoinbase

```
command:

komodo-cli z_shieldcoinbase "RXN2rxidK4cwzRL44UTnWvQjjvLdoMmCpU" "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP"

response:

{
  "remainingUTXOs": 0,
  "remainingValue": 0.00000000,
  "shieldingUTXOs": 2,
  "shieldingValue": 0.00030000,
  "opid": "opid-c0a7875c-aaa0-4bdc-8f17-b34ab99e8bab"
}
```

```
command:

komodo-cli z_shieldcoinbase "REyaj53EB2nwUnsmVyn8JHCcquKf1zYkEP" "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP" 0.0001 50

response:

{
  "remainingUTXOs": 0,
  "remainingValue": 0.00000000,
  "shieldingUTXOs": 14,
  "shieldingValue": 0.00160000,
  "opid": "opid-08ce931d-876c-45d5-9aea-15cf4c695e72"
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_shieldcoinbase", "params": ["RWRSfEYcfLv3yy9mhAuKHQTMCs9fArpPiH", "ztYMDvwUqi5FZLQy4so71ZGHXk2fDtEYU9HNns9DNYjXJr9PEzSL8Dq8NcdiRijsgCm4r3nNWA6dUrqW9suGd2F7uuj2BhP"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

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

**z_shieldcoinbase "fromaddress" "tozaddress" ( fee ) ( limit )**

The `z_shieldcoinbase` method shields transparent coinbase funds by sending the funds to a shielded z address.  This is an asynchronous operation and utxos selected for shielding will be locked. If there is an error, they are unlocked.  

The RPC call `listlockunspent` can be used to return a list of locked utxos. The number of coinbase utxos selected for shielding can be limited by the caller. If the limit parameter is set to zero, the [`mempooltxinputlimit`](#mempooltxinputlimit) option will determine the number of uxtos.  Any limit is constrained by the consensus rule defining a maximum transaction size of 100000 bytes.

### Arguments:

Structure|Type|Description
---------|----|-----------
"fromaddress"                                |(string, required)           |the address is a t address or `"*"` for all t address belonging to the wallet
"toaddress"                                  |(string, required)           |the address is a z address
fee                                          |(numeric, optional, default=0.0001)|the fee amount to attach to this transaction
limit                                        |(numeric, optional, default=50)|limit on the maximum number of utxos to shield; set to `0` to use node option `mempooltxinputlimit`

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"remainingUTXOs"                             |(numeric)                    |number of coinbase utxos still available for shielding
"remainingValue"                             |(numeric)                    |value of coinbase utxos still available for shielding
"shieldingUTXOs"                             |(numeric)                    |number of coinbase utxos being shielded
"shieldingValue"                             |(numeric)                    |value of coinbase utxos being shielded
"opid"                                       |(string)                     |an operationid to pass to z_getoperationstatus to get the result of the operation
}                                            |                             |
