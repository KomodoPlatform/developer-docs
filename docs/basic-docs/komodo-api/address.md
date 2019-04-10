# Address Index

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## getaddressbalance

**getaddressbalance '{ "addresses" : [ "address" , ... ] }'**

The `getaddressbalance` method returns the confirmed balance for an address, or addresses. It requires [addressindex](../installations/common-runtime-parameters.html#addressindex) to be enabled.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ----------- |
| "address" | (string) | the address |

### Response

| Name | Type | Description | 
| ---------- | -------- | ------------------------------------------------------------------ |
| "balance"  | (number) | the current confirmed balance in satoshis                          |
| "received" | (number) | the total confirmed number of satoshis received (including change) |

#### :pushpin: Examples

Command:

```bash
./komodo-cli getaddressbalance '{"addresses":["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}'
```


<collapse-text hidden title="Response">


```json
{
  "balance": 40000,
  "received": 1011916229
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressbalance", "params": [{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "balance": 450010000,
    "received": 1711916229
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getaddressdeltas

**getaddressdeltas '{ "addresses" : [ "address" , ... ] }'**

**getaddressdeltas '{ "addresses" : [ "address" , ... ] , "start": start, "end": end, "chainInfo": boolean }'**

The `getaddressdeltas` method returns all confirmed balance changes of an address. The user can optionally limit the response to a given interval of blocks. The method requires [addressindex](../installations/common-runtime-parameters.html#addressindex) to be enabled.

### Arguments

| Name | Type | Description | 
| ----------- | --------- | ----------------------------------------------------------------------- |
| "address"   | (string)  | the address                                                             |
| "start"     | (number)  | the start block height                                                  |
| "end"       | (number)  | the end block height                                                    |
| "chainInfo" | (boolean) | include chain info in results (only applies if start and end specified) |

### Response

| Name | Type | Description | 
| ---------- | -------- | --------------------------------- |
| "satoshis" | (number) | the difference in satoshis        |
| "txid"     | (string) | the related transaction id        |
| "index"    | (number) | the related input or output index |
| "height"   | (number) | the block height                  |
| "address"  | (string) | the address                       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli getaddressdeltas '{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}'
```


<collapse-text hidden title="Response">


```json
[
  {
    "satoshis": 1011876229,
    "txid": "39c61e8ea769ba1fc971cb7dadc531f25a2528d01a4244f379043248b6c51cc1",
    "index": 0,
    "blockindex": 0,
    "height": 1,
    "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"
  }
]
```

</collapse-text>


Command:

```bash
./komodo-cli getaddressdeltas '{"addresses":["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"],"start":1,"end":200,"chainInfo":true}'
```


<collapse-text hidden title="Response">


```json
{
  "deltas": [
    {
      "satoshis": 1011876229,
      "txid": "39c61e8ea769ba1fc971cb7dadc531f25a2528d01a4244f379043248b6c51cc1",
      "index": 0,
      "blockindex": 0,
      "height": 1,
      "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"
    }
  ],
  "start": {
    "hash": "022df4cd1b0bdf548fedc48f27c6367536a560857f61f9bec4b35179c8a45734",
    "height": 1
  },
  "end": {
    "hash": "001fd35407abd8f4e2ec9734ce6f91d820ff553efcb9c39d657afed84da84963",
    "height": 200
  }
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressdeltas", "params": [{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    {
      "satoshis": 1011876229,
      "txid": "39c61e8ea769ba1fc971cb7dadc531f25a2528d01a4244f379043248b6c51cc1",
      "index": 0,
      "blockindex": 0,
      "height": 1,
      "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressdeltas", "params": [{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"],"start":1,"end":200,"chainInfo":true}]}' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "deltas": [
      {
        "satoshis": 1011876229,
        "txid": "39c61e8ea769ba1fc971cb7dadc531f25a2528d01a4244f379043248b6c51cc1",
        "index": 0,
        "blockindex": 0,
        "height": 1,
        "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"
      }
    ],
    "start": {
      "hash": "022df4cd1b0bdf548fedc48f27c6367536a560857f61f9bec4b35179c8a45734",
      "height": 1
    },
    "end": {
      "hash": "001fd35407abd8f4e2ec9734ce6f91d820ff553efcb9c39d657afed84da84963",
      "height": 200
    }
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getaddressmempool

**getaddressmempool '{ "addresses" : [ "address" , ... ] }'**

The `getaddressmempool` method returns all mempool deltas for an address, or addresses. It requires [addressindex](../installations/common-runtime-parameters.html#addressindex) to be enabled.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ----------- |
| "address" | (string) | the address |

### Response

| Name | Type | Description | 
| ----------- | -------- | ------------------------------------------------------ |
| "address"   | (string) | the address                                            |
| "txid"      | (string) | the related txid                                       |
| "index"     | (number) | the related input or output index                      |
| "satoshis"  | (number) | the difference in satoshis                             |
| "timestamp" | (number) | the time the transaction entered the mempool (seconds) |
| "prevtxid"  | (string) | the previous txid (if spending)                        |
| "prevout"   | (string) | the previous transaction output index (if spending)    |

#### :pushpin: Examples

Command:

```bash
./komodo-cli getaddressmempool '{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}'
```


<collapse-text hidden title="Response">


```json
[
  {
    "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb",
    "txid": "55c9830c0b2efcbbbac4fb813ff0d85722c6d720a748459287b60ef96cdb6732",
    "index": 1,
    "satoshis": 200000000,
    "timestamp": 1536356143
  }
]
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressmempool", "params": [{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    {
      "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb",
      "txid": "708d8b67ea1f1b0a534515088911e90e77d623cddf901633e24cbb5b4c6f793c",
      "index": 0,
      "satoshis": -50000000,
      "timestamp": 1536603876,
      "prevtxid": "17474b73ec5a985c78a46435a021a1ad3ebd5609724ffd23d9c787c30f661342",
      "prevout": 1
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getaddresstxids

**getaddresstxids '{ "addresses" : [ "address" , ... ] }'**

The `getaddresstxids` method returns the txids for an address, or addresses. It requires [addressindex](../installations/common-runtime-parameters.html#addressindex) to be enabled.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ---------------------- |
| "address" | (string) | the address            |
| "start"   | (number) | the start block height |
| "end"     | (number) | the end block height   |

### Response

| Name | Type | Description | 
| ---------------- | -------- | ------------------ |
| "transaction_id" | (string) | the transaction id |

#### :pushpin: Examples

Command:

```bash
	komodo-cli getaddresstxids '{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb","RQUAkqRiRMqxcNrB29B4duTK4qkqfV9HVJ"]}'
```


<collapse-text hidden title="Response">


```bash
  [
    "39c61e8ea769ba1fc971cb7dadc531f25a2528d01a4244f379043248b6c51cc1",
    "800e4331018d02458ff4f2a7722f0508b810f7fcf53bc1c5ac85aec4e5fa706b",
    "2a3c3664851370ff762b47d735cc661e3dbce4cf36b6c1b74799f3b1c847bd52",
    "275f8383d85c0873c91ebfea3917d4136c89f43526da053177922d6c036634af"
  ]

```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddresstxids", "params": [{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    "39c61e8ea769ba1fc971cb7dadc531f25a2528d01a4244f379043248b6c51cc1",
    "800e4331018d02458ff4f2a7722f0508b810f7fcf53bc1c5ac85aec4e5fa706b",
    "2a3c3664851370ff762b47d735cc661e3dbce4cf36b6c1b74799f3b1c847bd52"
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getaddressutxos

**getaddressutxos '{ "addresses" : [ "address" , ... ], "chaininfo" }'**

The `getaddressutxos` method returns all unspent outputs for an address. It requires [addressindex](../installations/common-runtime-parameters.html#addressindex) to be enabled.

### Arguments

| Name | Type | Description | 
| ----------- | --------- | ------------------------------- |
| "address"   | (string)  | the address                     |
| "chainInfo" | (boolean) | include chain info with results |

### Response

| Name | Type | Description | 
| ------------- | -------- | ------------------------------------ |
| "address"     | (string) | the address                          |
| "txid"        | (string) | the output txid                      |
| "height"      | (number) | the block height                     |
| "outputIndex" | (number) | the output index                     |
| "script"      | (string) | the script hex encoded               |
| "satoshis"    | (number) | the number of satoshis of the output |

#### :pushpin: Examples

Command:

```bash
./komodo-cli getaddressutxos '{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}'
```


<collapse-text hidden title="Response">


```json
[
  {
    "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb",
    "txid": "2a3c3664851370ff762b47d735cc661e3dbce4cf36b6c1b74799f3b1c847bd52",
    "outputIndex": 0,
    "script": "2102e0d9ea73a391400ed2cb090e029d3f03eda0efaf371da11f436c076d817025e4ac",
    "satoshis": 10000,
    "height": 3
  }
]
```

</collapse-text>


Command:

```bash
./komodo-cli getaddressutxos '{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"], "chainInfo": true}'

```


<collapse-text hidden title="Response">


```json
{
  "utxos": [
    {
      "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb",
      "txid": "2a3c3664851370ff762b47d735cc661e3dbce4cf36b6c1b74799f3b1c847bd52",
      "outputIndex": 0,
      "script": "2102e0d9ea73a391400ed2cb090e029d3f03eda0efaf371da11f436c076d817025e4ac",
      "satoshis": 10000,
      "height": 3
    }
  ],
  "hash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
  "height": 398
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressutxos", "params": [{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"]}] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": [
    {
      "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb",
      "txid": "2a3c3664851370ff762b47d735cc661e3dbce4cf36b6c1b74799f3b1c847bd52",
      "outputIndex": 0,
      "script": "2102e0d9ea73a391400ed2cb090e029d3f03eda0efaf371da11f436c076d817025e4ac",
      "satoshis": 10000,
      "height": 3
    }
  ],
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressutxos", "params": [{"addresses": ["RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb"], "chainInfo": true}] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "utxos": [
      {
        "address": "RTTg3izdeVnqkTTxjzsPFrdUQexgqCy1qb",
        "txid": "2a3c3664851370ff762b47d735cc661e3dbce4cf36b6c1b74799f3b1c847bd52",
        "outputIndex": 0,
        "script": "2102e0d9ea73a391400ed2cb090e029d3f03eda0efaf371da11f436c076d817025e4ac",
        "satoshis": 10000,
        "height": 3
      }
    ],
    "hash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
    "height": 398
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## getsnapshot

**getsnapshot top**

The `getsnapshot` method returns a snapshot of addresses and their amounts at the asset chain's current height. 

The method requires [addressindex](../installations/common-runtime-parameters.html#addressindex) to be enabled.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ---------------------------------------------------- |
| "top"     | (number, optional) | Only return this many addresses, i.e. top N rich list |

### Response

| Name | Type | Description | 
| ----------------- | ---------------- | --------------------------------------------------- |
| "addresses"       | (array of jsons) | the array containing the address and amount details |
| "addr"            | (string)         | an address                                          |
| "amount"          | (number)         | the amount of coins in the above address            |
| "total"           | (numeric)        | the total amount in snapshot                        |
| "average"         | (numeric)        | the average amount in each address                  |
| "utxos"           | (number)         | the total number of UTXOs in snapshot               |
| "total_addresses" | (number)         | the total number of addresses in snapshot,          |
| "start_height"    | (number)         | the block height snapshot began                     |
| "ending_height"   | (number)         | the block height snapshot finished,                 |
| "start_time"      | (number)         | the unix epoch time snapshot started                |
| "end_time"        | (number)         | the unix epoch time snapshot finished               |

#### :pushpin: Examples

Command:

```bash
./komodo-cli getsnapshot 5
```


<collapse-text hidden title="Response">


```json
{
  "start_time": 1552473201,
  "addresses": [
    {
      "addr": "RRyyejME7LRTuvdziWsXkAbSW1fdiohGwK",
      "amount": "6193787.46198546",
      "segid": 13
    },
    {
      "addr": "RNaNh2fDvnoimuFGSFtp2c6xb5pN7mMWQV",
      "amount": "6169247.09074260",
      "segid": 44
    },
    {
      "addr": "RTu3JZZKLJTcfNwBa19dWRagEfQq49STqC",
      "amount": "5124337.23955756",
      "segid": 61
    },
    {
      "addr": "RBpEnyzuQNj1hNdAG1pKLALpAWEUS67PBj",
      "amount": "3029259.10629025",
      "segid": 24
    },
    {
      "addr": "RCyANUW2H5985zk8p6NHJfPyNBXnTVzGDh",
      "amount": "2700034.72826615",
      "segid": 48
    }
  ],
  "total": 23216665.62684202,
  "average": 4643333,
  "utxos": 2416430,
  "total_addresses": 5,
  "ignored_addresses": 31,
  "start_height": 1266933,
  "ending_height": 1266933,
  "end_time": 1552473348
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getsnapshot", "params": ["5"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "start_time": 1552473714,
    "addresses": [
      {
        "addr": "RRyyejME7LRTuvdziWsXkAbSW1fdiohGwK",
        "amount": "6193787.46198546",
        "segid": 13
      },
      {
        "addr": "RNaNh2fDvnoimuFGSFtp2c6xb5pN7mMWQV",
        "amount": "6169247.09074260",
        "segid": 44
      },
      {
        "addr": "RTu3JZZKLJTcfNwBa19dWRagEfQq49STqC",
        "amount": "5124337.23955756",
        "segid": 61
      },
      {
        "addr": "RBpEnyzuQNj1hNdAG1pKLALpAWEUS67PBj",
        "amount": "3029259.10629025",
        "segid": 24
      },
      {
        "addr": "RCyANUW2H5985zk8p6NHJfPyNBXnTVzGDh",
        "amount": "2700034.72826615",
        "segid": 48
      }
    ],
    "total": 23216665.62684202,
    "average": 4643333,
    "utxos": 2416443,
    "total_addresses": 5,
    "ignored_addresses": 31,
    "start_height": 1266941,
    "ending_height": 1266941,
    "end_time": 1552473829
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

