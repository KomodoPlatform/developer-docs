# Mining

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## getblocksubsidy

**getblocksubsidy height_number**

The `getblocksubsidy` method returns the block-subsidy reward. The resulting calculation takes into account the mining slow start. This method can be used in conjunction with custom mining rewards designed by the developers of a KMD-based asset chain.

### Arguments:

| Structure | Type                | Description                                                                                                   |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| height    | (numeric, optional) | the block height; if the block height is not provided, the method defaults to the current height of the chain |

### Response:

| Structure | Type      | Description              |
| --------- | --------- | ------------------------ |
| "miner"   | (numeric) | the mining reward amount |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getblocksubsidy 100
```

Response:

```json
{
  "miner": 3.0
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocksubsidy", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "miner": 3.0
  },
  "error": null,
  "id": "curltest"
}
```

## getblocktemplate

**getblocktemplate ( "jsonrequestobject" )**

::: tip
See <a href="https://en.bitcoin.it/wiki/BIP_0022">the Bitcoin wiki</a> for the full specification.
:::

The `getblocktemplate` method returns data that is necessary to construct a block.

If the request parameters include a `mode` key, it is used to explicitly select between the default 'template' request, a 'proposal' or 'disablecb'.

#### A Note on Unique Mining Circumstances

There are many features in the Komodo Ecosystem that can make an asset chain's daemon produce non-standard coinbase transactions. Examples include an asset chain parameter that creates new coins for a specific pubkey in every block or a CC module that adds outputs to the coinbase transaction.

This can be dealt using a mode called `disablecb`

Usage:

```bash
./komodo-cli getblocktemplate '{"mode":"disablecb"}'
```

The block template produced using this mode doesn't have the `"coinbasetxn": { ... }` json object but adds the coinbase transaction to the `"transactions":[ ... ]` array, just like a regular transaction.

Now the pool software can use the `"transactions":[ ... ]` array to create a block and take fees in the payment processor. The `knomp` [fork](https://github.com/blackjok3rtt/knomp) by [@blackjok3rtt](https://github.com/blackjok3rtt) uses this mode.

### Arguments:

| Structure                     | Type               | Description                                                                                                    |
| ----------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| "jsonrequestobject" : { ... } | (string, optional) | a json object in the following spec                                                                            |
| "mode"                        | (string, optional) | this must be set to "template" or omitted                                                                      |
| "capabilities": [ ... ]       | (array, optional)  | a list of strings                                                                                              |
| "support"                     | (string)           | client side supported features: "longpoll", "coinbasetxn", "coinbasevalue", "proposal", "serverlist", "workid" |

### Response:

| Structure              | Type               | Description                                                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "version"              | (numeric)          | the block version                                                                                                                                                                                                                                                                                |
| "previousblockhash"    | (string)           | the hash of current highest block                                                                                                                                                                                                                                                                |
| "finalsaplingroothash" | (string)           | the hash of the final sapling root                                                                                                                                                                                                                                                               |
| "transactions":[ ... ] | (array)            | the contents of non-coinbase transactions that should be included in the next block                                                                                                                                                                                                              |
| "data"                 | (string)           | transaction data encoded in hexadecimal (byte-for-byte)                                                                                                                                                                                                                                          |
| "hash"                 | (string)           | the hash/id encoded in little-endian hexadecimal                                                                                                                                                                                                                                                 |
| "depends" : [ ... ]    | (array)            | an array of numbers                                                                                                                                                                                                                                                                              |
| number                 | (numeric)          | the indexes of transactions that must be present in the final block if this transaction is present in the final block; the index of the array of transactions starts with "1"                                                                                                                    |
| "fee"                  | (numeric)          | the difference in value between transaction inputs and outputs in Satoshis; for coinbase transactions, this is the negative number of the total collected block fees, not including the block subsidy; if a key is not present, the fee is unknown and clients MUST NOT assume it is not present |
| "sigops"               | (numeric)          | the total number of sigops, as counted for the purposes of block limits; if a key is not present, the sigop count is unknown and clients MUST NOT assume they are not present.                                                                                                                   |
| "required"             | (boolean)          | if provided and true, this transaction must be in the final block                                                                                                                                                                                                                                |
| "coinbasetxn": { ... } | (json object)      | information for the coinbase transaction                                                                                                                                                                                                                                                         |
| "longpollid"           | (string)           | the lastseen longpollid when this response was sent by the server                                                                                                                                                                                                                                |
| "data"                 | (string)           | transaction data encoded in hexadecimal (byte-for-byte)                                                                                                                                                                                                                                          |
| "hash"                 | (string)           | the hash/id encoded in little-endian hexadecimal                                                                                                                                                                                                                                                 |
| "depends" : [ ... ]    | (array)            | an array of numbers                                                                                                                                                                                                                                                                              |
| "fee"                  | (numeric)          | the difference in value between transaction inputs and outputs in Satoshis; for coinbase transactions, this is the negative number of the total collected block fees, not including the block subsidy; if a key is not present, the fee is unknown and clients MUST NOT assume it is not present |
| "sigops"               | (numeric)          | the total number of sigops, as counted for the purposes of block limits; if a key is not present, the sigop count is unknown and clients MUST NOT assume they are not present.                                                                                                                   |
| "foundersreward"       | (numeric)          | the founder's reward that should be paid out in this block; this key is present only in the blocks that payout the founder's reward; present only in chains with [ac_founders](../installations/asset-chain-parameters.html#ac_founders) enabled                                                 |
| "coinbasevalue"        | (numeric)          | the value of the coinbase transaction (in satoshis)                                                                                                                                                                                                                                              |
| "required"             | (boolean)          | if provided and true, this transaction must be in the final block                                                                                                                                                                                                                                |
| "target"               | (string)           | the hash target                                                                                                                                                                                                                                                                                  |
| "mintime"              | (numeric)          | the minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)                                                                                                                                                                                                    |
| "mutable": [ ... ]     | (array of strings) | a list of ways the block template may be changed                                                                                                                                                                                                                                                 |
| "value"                | (string)           | a way the block template may be changed, e.g. "time", "transactions", "prevblock"                                                                                                                                                                                                                |
| "noncerange"           | (string)           | a range of valid nonces                                                                                                                                                                                                                                                                          |
| "sigoplimit"           | (numeric)          | the limit of sigops in blocks                                                                                                                                                                                                                                                                    |
| "sizelimit"            | (numeric)          | the limit of block size                                                                                                                                                                                                                                                                          |
| "curtime"              | (numeric)          | current timestamp in seconds since epoch (Jan 1 1970 GMT)                                                                                                                                                                                                                                        |
| "bits"                 | (string)           | the compressed target of the next block                                                                                                                                                                                                                                                          |
| "height"               | (numeric)          | the height of the next block                                                                                                                                                                                                                                                                     |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getblocktemplate '{"mode":"template","capabilities":["workid"]}'
```

Response:

```json
{
  "capabilities": ["proposal"],
  "version": 4,
  "previousblockhash": "01499bd2021bb8f74e65712fdeb2a689b12b183eb9e64584d9ea9ebd6e38754e",
  "finalsaplingroothash": "3e49b5f954aa9d3545bc6c37744661eea48d7c34e3000d82b7f0010c30f4c2fb",
  "transactions": [],
  "coinbasetxn": {
    "data": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff025600ffffffff0200e1f505000000002321039d6cc8a91d6551258a68e9d4bf8e8cfe3defd4be1f9e1c3f341f7a8592772fc8ac80c3c9010000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aacb0918c5c",
    "hash": "ac7f63d0df14a996d77a2883e6341615245811b5a8e36a48b7ca8011eb6a149f",
    "depends": [],
    "fee": 0,
    "sigops": 2,
    "foundersreward": 30000000,
    "coinbasevalue": 100000000,
    "required": true
  },
  "longpollid": "01499bd2021bb8f74e65712fdeb2a689b12b183eb9e64584d9ea9ebd6e38754e7",
  "target": "0f0f0f0000000000000000000000000000000000000000000000000000000000",
  "mintime": 1552716187,
  "mutable": ["time", "transactions", "prevblock"],
  "noncerange": "00000000ffffffff",
  "sigoplimit": 60000,
  "sizelimit": 2000000,
  "curtime": 1552716208,
  "bits": "200f0f0f",
  "height": 6
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "capabilities": ["proposal"],
    "version": 4,
    "previousblockhash": "0c77fb62dcabffd39c0b4ad79da9a51ecc4265158b01ae09d7fd70f93ab7d499",
    "transactions": [
      {
        "data": "010000000d0bf48c25bbb9e5c9cf2959c39ea62266784932a17a8fe1ad190197c398e341870200000048473044022071db2fad2d5bab5f6cf8e2d415fe9cfbc146fc561ce55c379044d5eab7206e1b0220296970cf0265e28a49ac525faef6114386d2ed5c8ea2ced9ccfcd37ca4563bf401ffffffff50aca334345c7b4e7285d883d58efeb74c43e58d4fa61bac21f922a014f292aa1700000048473044022038f17fe42006a3f30ff658f0c8b1495567ffd0dbbe4ba36229df4bcabce201740220516ed6fca4a453f3305b47315d5efd2b230b3a575cb506cb04c89a730a62eade01ffffffff73e2bd82aa10c0bf751d7eabff50209e46827294c2b77932a096f89f7a4aa631210000004847304402200d7f4c2b8a537c98e19f0044d97c0d5ee6afb598d9b4523d586ec39b5be68ed0022071c5587f347bf56b0d1a340e6326c1ec612ee6a77abf5a24e93a446eeaee31af01ffffffffc335b0a285d04766b560bec88c191ed4494bb7e6e964eba1f5ccde3a89ad2e5a0100000049483045022100dce3c8e92b1487bb39681e58634f6414df14bf848b4a0de3ce11e2ddd4b5836202201e8ce810a67fb84350c62e3c5ed28bc1350d754f3a61a3c1a85e824c946fb30801ffffffff2ed2a51a1f8fe7feb456fa21c4ae172733d921c933e0ddc1368cfd9e09a746e5030000004847304402204f2c0eee23e34937b624e8ec4f0221ad3a43787fdbaa5b936ac39d2a3d30d7fe02200fd6e39b0eac4cbd80601f9625b40152e3bad6115f4d1e158b8709aa215778fb01ffffffff31b2c613750303538593437354af923637ee972932d1997fc93bf8d9199ebe905c000000494830450221008c760aef6b34d79e7076b6c249506c91070931f641039f44243e6abf798c731d02203c9a44d0adb04e64956720b4a97b49944825fa704679c21b18679a63c98e99ec01ffffffff0a81b4834feaa5f1044540928290e6d19667ede024923836d94bac13c7c9237914000000494830450221009d8ceb46e48dc0e86e13b0a549efbedc95ca199e1068f8e5e1f31cf4460dee3f022005079476092ac474c42ffae9fcf49fba82f68c94637ea97add61a5b1a147badb01ffffffffd81465cb221c3374a0a69bffc9f2bc225249328c50badd8683c351b2c30fdb171700000048473044022039da2916a77777c77b1a97840d1a888f2b12f0994ad134c8075a0b659884211a022006cbb6c807d1814b88f280e0036306e6d73cc79c0b6ff60966f47161feaccb3e01ffffffff59128ea85b2240d8b781a00b1ad0ebcdd8502d8d3f5722878f963b7f601e1d69020000004847304402203374d06656f35edf5d1b0d16455da2d6f22520a00c948a9c1d6bf51dba7a70ef0220529ec3146e080a637118b891a6b739f58e6f57d2aa3a24759a39eb6696af36ac01ffffffffc7d79714f379e9de8d752861f27d7e4685137dc6db5ad2cd50ec7b36429826d7050000004847304402207a426bb189ac657a9e8b699c67091de8df28306ce67b14653aea561800dfcb1502207e00216a6ff84e3f5b6d82c0683d8ea72a9fd6f636f9b3102b657e09a5f7481501ffffffffd872945ebfef211230ad8147f994892ab45c6cb4710ac29950e40354e1861d78e300000049483045022100af153b219376ffcbef42bd900e678d2504a6acd7c2bf945dcae895a9f07da79702201615016f196ad9452755d9c303fa151c242ed963b5373d148db733482487e8af01ffffffff671edc29af69a848081dd3790afb3fb113377d995e34ea9f219331d5c18c6885ad000000484730440220572ad6110ca5bafd749cfb77740f1aaac35e18c4a814cfb771c5286dd8b1249802207f4a27b90ff91663ee8ec6fc14dae64d16274fd2e35069ac6891de0385740a9801ffffffffba4dc1b3ef20747310640e4e0337c8db570ec63fa62eeffc492098502eaa9a2e5700000049483045022100f3ac3b80a66b6f1e6f96faf15a6535b104fbba987b357732e5b45830841a0a0a02202fee1f97494b2232a32517272d49992612729f4d9f762ede8d9b06ddf294293001ffffffff02f0810100000000002321020e46e79a2a8d12b9b5d12c7a91adb4e454edfae43c0a0cb805427d2ac7613fd9ac0000000000000000506a4c4da83be8f6e61cb9837708c1a847bdd80b8b8c1e1b9067b338433ca6c663869d004c6e01004345414c00e76cb540d63746c82676637b51e4f9f894c444822844224dd840975c7652dd760e00000000000000",
        "hash": "14473b8754bf69cc365784633e1a80787d4f9f950c95c48af0c6a28983c31098",
        "depends": [],
        "fee": 31200,
        "sigops": 1
      }
    ],
    "coinbasetxn": {
      "data": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0503e6590f00ffffffff01a010e311000000002321029400ae04d9c0e3e49b114fc5e0a7e250ece5f5b5b8f1614075ddfd62c67319aeac57a4985b",
      "hash": "334b02c0c2fa087862f845fefbd8f6ac4b72e4aed6d024f22b7fa0aa84759006",
      "depends": [],
      "fee": -93600,
      "sigops": 1,
      "coinbasevalue": 300000000,
      "required": true
    },
    "longpollid": "0c77fb62dcabffd39c0b4ad79da9a51ecc4265158b01ae09d7fd70f93ab7d499147",
    "target": "0000000670be0000000000000000000000000000000000000000000000000000",
    "mintime": 1536729888,
    "mutable": ["time", "transactions", "prevblock"],
    "noncerange": "00000000ffffffff",
    "sigoplimit": 20000,
    "sizelimit": 2000000,
    "curtime": 1536730200,
    "bits": "1d0670be",
    "height": 1006054
  },
  "error": null,
  "id": "curltest"
}
```

## getlocalsolps

**getlocalsolps**

The `getlocalsolps` method returns the average local solutions per second since this node was started.

::: tip
This is the same information shown on the metrics screen (if enabled).
:::

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| "data"    | (numeric) | the solutions-per-second average |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getlocalsolps
```

Response:

```bash
0.4141607577247555
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getlocalsolps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 0.4141607577247555,
  "error": null,
  "id": "curltest"
}
```

## getmininginfo

**getmininginfo**

The `getmininginfo` method returns a json object containing mining-related information.

### Arguments:

| Structure | Type   | Description |
| --------- | ------ | ----------- |
| (none)    | (none) |

### Response:

| Structure          | Type      | Description                                                                                                                                                                            |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "blocks"           | (numeric) | the current block                                                                                                                                                                      |
| "currentblocksize" | (numeric) | the last block size                                                                                                                                                                    |
| "currentblocktx"   | (numeric) | the last block transaction                                                                                                                                                             |
| "difficulty"       | (numeric) | the current difficulty                                                                                                                                                                 |
| "errors":          |           |
| "generate"         | (boolean) | if the generation is on or off (see [getgenerate](../komodo-api/generate.html#getgenerate) or [setgenerate](../komodo-api/generate.html#setgenerate) calls)                            |
| "genproclimit"     | (numeric) | the processor limit for generation; `-1` if no generation (see [getgenerate](../komodo-api/generate.html#getgenerate) or [setgenerate](../komodo-api/generate.html#setgenerate) calls) |
| "localsolps"       | (numeric) | the average local solution rate (solutions per second) since this node was started                                                                                                     |
| "networksolps"     | (numeric) | the estimated network solution rate (solutions per second)                                                                                                                             |
| "pooledtx":        |           |
| "testnet"          | (boolean) | if using testnet or not                                                                                                                                                                |
| "chain"            | (string)  | the current network name as defined in BIP70 (main, test, regtest)                                                                                                                     |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getmininginfo
```

Response:

```json
{
  "blocks": 1007341,
  "currentblocksize": 0,
  "currentblocktx": 0,
  "difficulty": 42918151.0730477,
  "errors": "",
  "genproclimit": -1,
  "localsolps": 0,
  "networksolps": 11414148,
  "networkhashps": 11414148,
  "pooledtx": 5,
  "testnet": false,
  "chain": "main",
  "generate": false,
  "numthreads": -1
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "blocks": 1007341,
    "currentblocksize": 0,
    "currentblocktx": 0,
    "difficulty": 42918151.0730477,
    "errors": "",
    "genproclimit": -1,
    "localsolps": 0,
    "networksolps": 11414148,
    "networkhashps": 11414148,
    "pooledtx": 11,
    "testnet": false,
    "chain": "main",
    "generate": false,
    "numthreads": -1
  },
  "error": null,
  "id": "curltest"
}
```

## getnetworkhashps

**getnetworkhashps ( blocks height )**

::: warning
DEPRECATED: Use <b>getnetworksolps</b> instead.
:::

The `getnetworkhashps` method returns the estimated network solutions per second based on the last `n` blocks.

Pass in `blocks` value to override the default number of blocks. Passing in `-1` will return a value based on the average `hashps` of the relevant difficulty window.

Pass in `height` to estimate the network speed at the time when a certain block was found.

### Arguments:

| Structure | Type                             | Description                                                                                |
| --------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| blocks    | (numeric, optional, default=120) | the number of blocks (use `-1` to calculate over the relevant difficulty averaging window) |
| height    | (numeric, optional, default=-1)  | the block height that corresponds to the requested data                                                |

### Response:

| Structure | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| data      | (numeric) | the solutions-per-second estimate |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getnetworkhashps
```

Response:

```bash
10724120
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkhashps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 10724120,
  "error": null,
  "id": "curltest"
}
```

## getnetworksolps

**getnetworksolps ( blocks height )**

The `getnetworksolps` method returns the estimated network solutions per second based on the last `n` blocks.

Pass in `blocks` to override the default number of blocks. Use -1 to calculate according to the relevant difficulty averaging window.
Pass in `height` to estimate the network speed at the time when a certain block was found.

### Arguments:

| Structure | Type                             | Description                                                                                       |
| --------- | -------------------------------- | ------------------------------------------------------------------------------------------------- |
| blocks    | (numeric, optional, default=120) | the number of blocks; use `-1` to calculate according to the relevant difficulty averaging window |
| height    | (numeric, optional, default=-1)  | the block height that corresponds to the requested data                                                |

### Response:

| Structure | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| data      | (numeric) | solutions per second, estimated |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getnetworksolps
```

Response:

```bash
17547717
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworksolps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 17547717,
  "error": null,
  "id": "curltest"
}
```

## prioritisetransaction

**prioritisetransaction "transaction_id" priority_delta fee_delta**

The `prioritisetransaction` method instructs the daemon to accept the indicated transaction into mined blocks at a higher (or lower) priority. The transaction selection algorithm considers the transaction as it would have a higher priority.

::: tip
This method is inherited from the original Bitcoin protocol, of which KMD is a fork (via Zcash). For more examples regarding this method, please see <a href="https://bitcoincore.org/en/doc/0.16.1/rpc/mining/prioritisetransaction/">the linked documentation</a>.
:::

### Arguments:

| Structure        | Type                | Description                                                                                                                                                                                                           |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "transaction_id" | (string, required)  | the transaction id                                                                                                                                                                                                    |
| priority_delta   | (numeric, required) | the priority to add or subtract (if negative). The transaction selection algorithm assigns the tx a higher or lower priority. The transaction priority calculation: `coinage * value_in_satoshis / txsize`            |
| fee_delta        | (numeric, required) | the fee value in satoshis to add or subtract (if negative); the fee is not actually paid, only the algorithm for selecting transactions into a block considers the transaction as if it paid a higher (or lower) fee. |

### Response:

| Structure | Type      | Description  |
| --------- | --------- | ------------ |
| true      | (boolean) | returns true |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli prioritisetransaction "7dc902b280da27cf2dabe41ed6f4d04c828714f289435db193a49341005607eb" 0.0 10000
```

Response:

```bash
true
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "prioritisetransaction", "params": ["txid", 0.0, 10000] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": true,
  "error": null,
  "id": "curltest"
}
```

## submitblock

**submitblock "hexdata" ( "jsonparametersobject" )**

The `submitblock` method instructs the daemon to propose a new block to the network.

::: tip
The <b>jsonparametersobject</b> parameter is currently ignored. See <a href="https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki">the linked documentation</a> for full specification details.
:::

::: tip
Note: for more information on <b>submitblock</b> parameters and results, see <a href="https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki#block-submission">the linked documentation</a>.
:::

### Arguments:

| Structure                        | Type                         | Description                                                           |
| -------------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| "hexdata"                        | (string, required)           | the hex-encoded block data to submit                                  |
| "jsonparametersobject" : { ... } | (string, optional)           | object of optional parameters                                         |
| "workid"                         | (string, sometimes optional) | if the server provides a workid, it MUST be included with submissions |

### Response:

| Structure                | Type | Description                                                                          |
| ------------------------ | ---- | ------------------------------------------------------------------------------------ |
| "duplicate"              |      | the node already has a valid copy of the block                                       |
| "duplicate-invalid"      |      | the node already has the block, but it is invalid                                    |
| "duplicate-inconclusive" |      | the node already has the block but has not validated it                              |
| "inconclusive"           |      | the node has not validated the block, it may not be on the node's current best chain |
| "rejected"               |      | the block was rejected as invalid                                                    |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli submitblock "0400000029865a4962f43d6f95fdf9ccc89f82377a23d1fdc41eaf943c7881a5ca55c5018973d81f5ce7ab99f027b15c86ca88ec5e4b6f35ad4018bfc2058568bbe7f526000000000000000000000000000000000000000000000000000000000000000097954a5b9e830c1d1600ac305580abea34bda62eb503b02fc4b7872428cfa60bf5824a9b78fc0000fd400500c80d4a8c84cec781a5740d8d3fb18587a850b6380f073cd861c4ce7c4290460c533e0d4dd3b89fe0f0052ccdf9d450a1dfcd7263a39422000378da3eeb621078af689447a5ed0a7265a857463a36d72cdd35910d14de9816a25d631aeb0249ede829aca77f9cce1a2e4a84b75e4bd515845043d52f718638fb41e92d8b18bfe1f49e1c0d23223a285b2850e8469dfbb9782b20c8bebf2a61d7b7d8eea310c7c8d5bfa612bf94fd05562ec8876eacafa0c334a651ef70c941459161b60c20511087d63223878052d4fd1a92298789d7c57609fe3a247489674592e8e34a1728b28e2c2b3165f01d5fefa22e6384f7fe4e566de1741e264f057a0feb1b35d51694647ba52afd71c3bd375b924da95e2b413dbea256a2de9ccddcab88bd2e69cc3acc8a778b4d1db78b41df9fea6d69b071f570f628ad47537d081740a4f2c4fa6666dbb862a6d02ff07b5ae0a9fa24b003fa0355dbde0425d6c14452f0d357f2cfd97960c343ba73789a2d7ba580ea8834ef656a9e79c49fc0f61aa9452a644c8bc06afe31dce2a7ca5d6995adc8ce1f77165a075399e1d006e2bb57c09ffd6e21fcff440645faef599264a3b8c005cf60683371ba1af8847d1992c64e512f13d9d2d364969759233a27c65e1f2f1113cdb665e3e8f7baa2c398c4a2ee85a6ad1bdb095962fafaa01c3d85bc820653544b89b6e75a584d8d04bc77e5284a9ebbcd46c1a6732b841e46c876976805d932a90ac215bcc37801900d49cfb87fe5c809b30ebd8ece38669153c1f1a2438253a56a6507d556cc16b2990f0bd290fea59462d25eebdbfcb78eb403c8080e0c68e8e2ef8f67145121bce83b94dc8f9d0a742752323c5a4b42409ffcc37053c58596deff7981a20e3f412c07c839a341fdc177d5e28f7909696f90c90efff14048f440e7ea3181378f66d35b0697dc02c60154778f438cdd3dba5dc4c2763319498bbb3b8fae17508b073d07d83f5f1dc71bf2dc205f06245872620dfa341dbcdf9c574598c121120e91dd687dfd08451369ab29a11dc73f69d0722992a1c70cf1498ec9b9143fcb0abfd7b1e39189125e8567cb2cc3d71fcdb541a0776a5a665161f98385633153fc9702f079269a1dac0d2c708f5d94e346159858cfd50624ff5a0505358739b5f41adbe739bf75852eebb06eeccd79e030019a5227cd9a19e77b6821ba0794fe09cb074f40ce0b92c081c31cda2d4711d53889fc6f0579839fa74309768ef0a796fa1fa660e150d3ea5c0a369e1297d11177fc284524d6d5e40eb7ee4b400f6dfd6a10402904394e1694de300ddd565622e7ca7ed62970ff5add0b36a513b5d90d2194cf414ecc97e5dcc88698e06405dea09f49503c81cc61518f8aee882da6eeae09b4127a7fcc0c0829fca8fda3502ebf13ece0a90a8dfd05d8e514452247f79472c20683e2b1fde5ec14a2453bf00f9f1cd5a088d229a7fdfdfdc24f176fb9a8a409af70d894998957394d30a46668d71cd16907aa800ee9d96c2b9fc7fb5a7944a9b8d4f76609fc186e3c0a4d80fb9c8c236f76eb00bc24dd9abddef7d653740ece7141ac6175f7e9cab1cb0216e85adde43907b60c0581336b50ccd7682f28f00f7efd663df4d31701141657da989d236d16052c4b59fc46fb41657a26d7074fbc9dee602f7d03b86179e4c12bc0df253f815319dff12353a478d95febd5f902e363734e6e5ef4bf1865eb70750b9238be3382a51ded182569d112f37870d43465615ca9174d41f7f3b9eb780a28c7dba674075bbe04538ad669eef7716d1b7b252d49da3b00993f0c829860a1efafdcdc865d46f2f8aec9893b5bc607db33272e5b9f7cf134595e1ad5e8f34b1b7f93ca181c513afc4d8a531c36929e95cfbb4d268a9d94f80201000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0603860f0e0101ffffffff0188b6e1110000000023210383d0b37f59f4ee5e3e98a47e461c861d49d0d90c80e9e16f7e63686a2dc071f3ac67954a5b01000000010b1561554a46ec535c4972a3a16652b270ee4af847ec3bbfcf6ba663ebcfefcb1a00000049483045022100b9cd7c1c56d69d9b05d695f9ac86c1233427ec26860774a0eb4e6052fe11ca8502207eca5a4eda1ccf92ccdb501ab7d61cf084d0f4431f059e27ee13ce11f9aa159b01ffffffff0188130000000000002321020e46e79a2a8d12b9b5d12c7a91adb4e454edfae43c0a0cb805427d2ac7613fd9ac00000000"
```

Response:

```bash
duplicate
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitblock", "params": ["0400000029865a4962f43d6f95fdf9ccc89f82377a23d1fdc41eaf943c7881a5ca55c5018973d81f5ce7ab99f027b15c86ca88ec5e4b6f35ad4018bfc2058568bbe7f526000000000000000000000000000000000000000000000000000000000000000097954a5b9e830c1d1600ac305580abea34bda62eb503b02fc4b7872428cfa60bf5824a9b78fc0000fd400500c80d4a8c84cec781a5740d8d3fb18587a850b6380f073cd861c4ce7c4290460c533e0d4dd3b89fe0f0052ccdf9d450a1dfcd7263a39422000378da3eeb621078af689447a5ed0a7265a857463a36d72cdd35910d14de9816a25d631aeb0249ede829aca77f9cce1a2e4a84b75e4bd515845043d52f718638fb41e92d8b18bfe1f49e1c0d23223a285b2850e8469dfbb9782b20c8bebf2a61d7b7d8eea310c7c8d5bfa612bf94fd05562ec8876eacafa0c334a651ef70c941459161b60c20511087d63223878052d4fd1a92298789d7c57609fe3a247489674592e8e34a1728b28e2c2b3165f01d5fefa22e6384f7fe4e566de1741e264f057a0feb1b35d51694647ba52afd71c3bd375b924da95e2b413dbea256a2de9ccddcab88bd2e69cc3acc8a778b4d1db78b41df9fea6d69b071f570f628ad47537d081740a4f2c4fa6666dbb862a6d02ff07b5ae0a9fa24b003fa0355dbde0425d6c14452f0d357f2cfd97960c343ba73789a2d7ba580ea8834ef656a9e79c49fc0f61aa9452a644c8bc06afe31dce2a7ca5d6995adc8ce1f77165a075399e1d006e2bb57c09ffd6e21fcff440645faef599264a3b8c005cf60683371ba1af8847d1992c64e512f13d9d2d364969759233a27c65e1f2f1113cdb665e3e8f7baa2c398c4a2ee85a6ad1bdb095962fafaa01c3d85bc820653544b89b6e75a584d8d04bc77e5284a9ebbcd46c1a6732b841e46c876976805d932a90ac215bcc37801900d49cfb87fe5c809b30ebd8ece38669153c1f1a2438253a56a6507d556cc16b2990f0bd290fea59462d25eebdbfcb78eb403c8080e0c68e8e2ef8f67145121bce83b94dc8f9d0a742752323c5a4b42409ffcc37053c58596deff7981a20e3f412c07c839a341fdc177d5e28f7909696f90c90efff14048f440e7ea3181378f66d35b0697dc02c60154778f438cdd3dba5dc4c2763319498bbb3b8fae17508b073d07d83f5f1dc71bf2dc205f06245872620dfa341dbcdf9c574598c121120e91dd687dfd08451369ab29a11dc73f69d0722992a1c70cf1498ec9b9143fcb0abfd7b1e39189125e8567cb2cc3d71fcdb541a0776a5a665161f98385633153fc9702f079269a1dac0d2c708f5d94e346159858cfd50624ff5a0505358739b5f41adbe739bf75852eebb06eeccd79e030019a5227cd9a19e77b6821ba0794fe09cb074f40ce0b92c081c31cda2d4711d53889fc6f0579839fa74309768ef0a796fa1fa660e150d3ea5c0a369e1297d11177fc284524d6d5e40eb7ee4b400f6dfd6a10402904394e1694de300ddd565622e7ca7ed62970ff5add0b36a513b5d90d2194cf414ecc97e5dcc88698e06405dea09f49503c81cc61518f8aee882da6eeae09b4127a7fcc0c0829fca8fda3502ebf13ece0a90a8dfd05d8e514452247f79472c20683e2b1fde5ec14a2453bf00f9f1cd5a088d229a7fdfdfdc24f176fb9a8a409af70d894998957394d30a46668d71cd16907aa800ee9d96c2b9fc7fb5a7944a9b8d4f76609fc186e3c0a4d80fb9c8c236f76eb00bc24dd9abddef7d653740ece7141ac6175f7e9cab1cb0216e85adde43907b60c0581336b50ccd7682f28f00f7efd663df4d31701141657da989d236d16052c4b59fc46fb41657a26d7074fbc9dee602f7d03b86179e4c12bc0df253f815319dff12353a478d95febd5f902e363734e6e5ef4bf1865eb70750b9238be3382a51ded182569d112f37870d43465615ca9174d41f7f3b9eb780a28c7dba674075bbe04538ad669eef7716d1b7b252d49da3b00993f0c829860a1efafdcdc865d46f2f8aec9893b5bc607db33272e5b9f7cf134595e1ad5e8f34b1b7f93ca181c513afc4d8a531c36929e95cfbb4d268a9d94f80201000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0603860f0e0101ffffffff0188b6e1110000000023210383d0b37f59f4ee5e3e98a47e461c861d49d0d90c80e9e16f7e63686a2dc071f3ac67954a5b01000000010b1561554a46ec535c4972a3a16652b270ee4af847ec3bbfcf6ba663ebcfefcb1a00000049483045022100b9cd7c1c56d69d9b05d695f9ac86c1233427ec26860774a0eb4e6052fe11ca8502207eca5a4eda1ccf92ccdb501ab7d61cf084d0f4431f059e27ee13ce11f9aa159b01ffffffff0188130000000000002321020e46e79a2a8d12b9b5d12c7a91adb4e454edfae43c0a0cb805427d2ac7613fd9ac00000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "duplicate",
  "error": null,
  "id": "curltest"
}
```
