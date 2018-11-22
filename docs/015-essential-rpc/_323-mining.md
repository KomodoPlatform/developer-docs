# Mining

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## getblocksubsidy

```
command:

komodo-cli getblocksubsidy 100

response:

{
  "miner": 0.00010000
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockubsidy", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:
```

**getblocksubsidy height_number**

The `getblocksubsidy` method returns the block-subsidy reward. The resulting calculation takes into account the mining slow start. This method can be used in conjunction with custom mining rewards designed by the developers of a KMD-based asset chain.

### Arguments:

Structure|Type|Description
---------|----|-----------
true/false                                   |(boolean)                    |indicates whether the server is set to generate coins

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"miner"                                      |(numeric)                    |the mining reward amount
}                                            |                             |

## getblocktemplate

```
command:

komodo-cli getblocktemplate '{"mode":"template","capabilities":["workid"]}'

response:

{
  "capabilities": [
    "proposal"
  ],
  "version": 4,
  "previousblockhash": "0ec57dbbaa7fdb290b847981e38908482b1be05f375f021c4d1f6f6315fd5c7e",
  "transactions": [
  ],
  "coinbasetxn": {
    "data": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0503d7590f00ffffffff0100a3e111000000002321029400ae04d9c0e3e49b114fc5e0a7e250ece5f5b5b8f1614075ddfd62c67319aeac1ba2985b",
    "hash": "6af34ca0711ff5c7d3b4d2334ec55f4995014261f3c537446537169f9b96b0d6",
    "depends": [
    ],
    "fee": 0,
    "sigops": 1,
    "coinbasevalue": 300000000,
    "required": true
  },
  "longpollid": "0ec57dbbaa7fdb290b847981e38908482b1be05f375f021c4d1f6f6315fd5c7e39",
  "target": "000000070be50000000000000000000000000000000000000000000000000000",
  "mintime": 1536729153,
  "mutable": [
    "time",
    "transactions",
    "prevblock"
  ],
  "noncerange": "00000000ffffffff",
  "sigoplimit": 20000,
  "sizelimit": 2000000,
  "curtime": 1536729628,
  "bits": "1d070be5",
  "height": 1006039
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": {
    "capabilities": [
      "proposal"
    ],
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
    "mutable": [
      "time",
      "transactions",
      "prevblock"
    ],
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

**getblocktemplate ( "jsonrequestobject" )**

The `getblocktemplate` method returns data that is necessary to construct a block.

<aside class="notice">
  See <a href="https://en.bitcoin.it/wiki/BIP_0022">the Bitcoin wiki</a> for full specification.
</aside>

If the request parameters include a `mode` key, it is used to explicitly select between the default 'template' request or a 'proposal'.

### Arguments:

Structure|Type|Description
---------|----|-----------
"jsonrequestobject"                          |(string, optional)           |a json object in the following spec
{                                            |                             |
"mode"                                       |(string, optional)           |can be: "template" | "omitted"
"capabilities":                              |                             |
"support"                                    |(string)                     |client side supported features: "longpoll", "coinbasetxn", "coinbasevalue", "proposal", "serverlist", "workid"
,                                            |                             |
]                                            |                             |
}                                            |                             |

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"version"                                    |(numeric)                    |the block version
"previousblockhash"                          |(string)                     |the hash of current highest block
"transactions"                               |                             |
{                                            |                             |
"data"                                       |(string)                     |transaction data encoded in hexadecimal (byte-for-byte)
"hash"                                       |(string)                     |hash/id encoded in little-endian hexadecimal
"depends"                                    |                             |
number                                       |(numeric)                    |transactions before this one (by 1-based index in "transactions" list) that must be present in the final block, if this one is
,                                            |                             |
],                                           |                             |
"fee"                                        |(numeric)                    |the difference in value between transaction inputs and outputs (in Satoshis). For coinbase transactions, this is a negative number of the total collected block fees (ie, not including the block subsidy). If a key is not present, the fee is unknown and clients MUST NOT assume it is not present.
"sigops"                                     |(numeric)                    |total number of sigops, as counted for the purposes of block limits; if a key is not present, the sigop count is unknown and clients MUST NOT assume they are not present.
"required"                                   |(boolean)                    |if provided and true, this transaction must be in the final block
}                                            |                             |
,                                            |                             |
],                                           |                             |
"coinbasetxn"                                |                             |
...                                          |(json object)                |information for coinbase transaction
},                                           |                             |
"target"                                     |(string)                     |the hash target
"mintime"                                    |(numeric)                    |the minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
"mutable"                                    |                             |
"value"                                      |(string)                     |a way the block template may be changed, e.g. "time", "transactions", "prevblock"
,                                            |                             |
],                                           |                             |
"noncerange"                                 |(string)                     |a range of valid nonces
"sigoplimit"                                 |(numeric)                    |limit of sigops in blocks
"sizelimit"                                  |(numeric)                    |limit of block size
"curtime"                                    |(numeric)                    |current timestamp in seconds since epoch (Jan 1 1970 GMT)
"bits"                                       |(string)                     |compressed target of next block
"height"                                     |(numeric)                    |the height of the next block
}                                            |                             |

## getlocalsolps

```
command:

komodo-cli getlocalsolps

response:

0.4141607577247555
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getlocalsolps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": 0.4141607577247555,
  "error": null,
  "id": "curltest"
}
```

**getlocalsolps**

The `getlocalsolps` method returns the average local solutions per second since this node was started.

<aside class="notice">
  This is the same information shown on the metrics screen (if enabled).
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |(none)                       |

### Response:
Structure|Type|Description
---------|----|-----------
"data"                                       |(numeric)                    |solutions per second average

## getmininginfo

```
command:

komodo-cli getmininginfo

response:

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

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

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

**getmininginfo**

The `getmininginfo` method returns a json object containing mining-related information.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |(none)                       |

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"blocks"                                     |(numeric)                    |the current block
"currentblocksize"                           |(numeric)                    |the last block size
"currentblocktx"                             |(numeric)                    |the last block transaction
"difficulty"                                 |(numeric)                    |the current difficulty
"errors":                                    |                             |
"generate"                                   |(boolean)                    |if the generation is on or off (see [getgenerate](#getgenerate) or [setgenerate](#setgenerate) calls)
"genproclimit"                               |(numeric)                    |the processor limit for generation; -1 if no generation (see[getgenerate](#getgenerate) or [setgenerate](#setgenerate) calls)
"localsolps"                                 |(numeric)                    |the average local solution rate (solutions per second) since this node was started
"networksolps"                               |(numeric)                    |the estimated network solution rate (solutions per second)
"pooledtx":                                  |                             |
"testnet"                                    |(boolean)                    |if using testnet or not
"chain"                                      |(string)                     |current network name as defined in BIP70 (main, test, regtest)
}                                            |                             |

## getnetworkhashps

```
command:

komodo-cli getnetworkhashps

response:

10724120
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkhashps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": 10449287,
  "error": null,
  "id": "curltest"
}
```

<aside class="warning">
  DEPRECATED: Use <b>getnetworksolps</b> instead.
</aside>

**getnetworkhashps ( blocks height )**

The `getnetworkhashps` method returns the estimated network solutions per second based on the last `n` blocks.

Pass in `blocks` value to override the default number of blocks. Passing in `-1` will return a value based on the average hashps of the relevant difficulty window.

Pass in `height` to estimate the network speed at the time when a certain block was found.

### Arguments:

Structure|Type|Description
---------|----|-----------
blocks                                       |(numeric, optional, default=120)|the number of blocks (use -1 to calculate over the relevant difficulty averaging window)
height                                       |(numeric, optional, default=-1)|to estimate at the time of the given height

### Response:

Structure|Type|Description
---------|----|-----------
data                                         |(numeric)                    |solutions per second estimated

## getnetworksolps

```
command:

komodo-cli getnetworksolps

response:

9954190
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworksolps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:
```

**getnetworksolps ( blocks height )**

The `getnetworksolps` method returns the estimated network solutions per second based on the last `n` blocks.

Pass in `blocks` to override the default number of blocks. Use -1 to calculate according to the relevant difficulty averaging window.
Pass in `height` to estimate the network speed at the time when a certain block was found.

### Arguments:

Structure|Type|Description
---------|----|-----------
blocks                                       |(numeric, optional, default=120)    |the number of blocks; use -1 to calculate according to the relevant difficulty averaging window
height                                       |(numeric, optional, default=-1)     |to estimate at the time of the given height


### Response:

Structure|Type|Description
---------|----|-----------
data                                         |(numeric)                    |solutions per second, estimated

## prioritisetransaction

```
command:

komodo-cli prioritisetransaction "7dc902b280da27cf2dabe41ed6f4d04c828714f289435db193a49341005607eb" 0.0 10000

result:

true
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "prioritisetransaction", "params": ["txid", 0.0, 10000] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

result:

{
  "result": true,
  "error": null,
  "id": "curltest"
}
```

**prioritisetransaction "transaction_id" priority_delta fee_delta**

The `prioritisetransaction` method instructs the daemon to accept the indicated transaction into mined blocks at a higher (or lower) priority. The transaction selection algorithm considers the transaction as it would have a higher priority.

<aside class="notice">
  This method is inherited from the original Bitcoin protocol, of which KMD is a fork (via Zcash). For more examples regarding this method, please see <a href="https://bitcoincore.org/en/doc/0.16.1/rpc/mining/prioritisetransaction/">the linked documentation</a>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"transaction_id"                             |(string, required)           |the transaction id
priority                                     |                             |
fee                                          |                             |

### Response:

Structure|Type|Description
---------|----|-----------
true                                         |(boolean)                    |returns true

## submitblock

```
command:

komodo-cli submitblock "mydata"

response:

```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitblock", "params": ["mydata"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:
```

**submitblock "hexdata" ( "jsonparametersobject" )**

The `submitblock` method instructs the daemon to propose a new block to the network.

<aside class="notice">
  The <b>jsonparametersobject</b> parameter is currently ignored. See <a href="https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki">the linked documentation</a> for full specification details.
</aside>

<aside class="notice">
  Note: for more information on <b>submitblock</b> parameters and results, see <a href="https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki#block-submission">the linked documentation</a>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"hexdata"                                    |(string, required)           |the hex-encoded block data to submit
"jsonparametersobject"                       |(string, optional)           |object of optional parameters
{                                            |                             |
"workid"                                     |(string, sometimes optional) |if the server provides a workid, it MUST be included with submissions
}                                            |                             |

### Response:

Structure|Type|Description
---------|----|-----------
	"duplicate"                                |                             |node already has valid copy of block
	"duplicate-invalid"                        |                             |node already has block, but it is invalid
	"duplicate-inconclusive"                   |                             |node already has block but has not validated it
	"inconclusive"                             |                             |node has not validated the block, it may not be on the node's current best chain
	"rejected"                                 |                             |block was rejected as invalid
