# Blockchain

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## getbestblockhash

**getbestblockhash**

The `getbestblockhash` method returns the hash of the best (tip) block in the longest block chain.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
"hex"                                        |(string)                     |the block hash, hex encoded

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getbestblockhash
```

Response:

```json
0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbestblockhash", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
  "error": null,
  "id": "curltest"
}
```

## getblock

**getblock hash|height ( verbose )**

The `getblock` method returns the block's relevant state information.

The verbose input is optional. The default value is true, and it will return a json object with information about the indicated block. If verbose is `false`, the command returns a string that is serialized hex-encoded data for the indicated block.

### Arguments:

Structure|Type|Description
---------|----|-----------
hash  `OR` height                                      |string `OR` number respectively                            | the block hash `OR` the block height
verbose                                      |(boolean, optional, default=true)|true returns a json object, false returns hex-encoded data

### Response (verbose = true):

Structure|Type|Description
---------|----|-----------
"hash"                                       |(string)                     |the block hash (same as provided hash)
"confirmations"                              |(numeric)                    |the number of confirmations, or -1 if the block is not on the main chain
"size"                                       |(numeric)                    |the block size
"height"                                     |(numeric)                    |the block height or index (same as provided height)
"version"                                    |(numeric)                    |the block version
"merkleroot"                                 |(string)                     |the merkle root
"tx" : [ "transaction_id" ,...]              |(array of string)                             |the transaction ids
"time"                                       |(numeric)                    |the block time in seconds since epoch (Jan 1 1970 GMT)
"nonce"                                      |(numeric)                    |the nonce
"bits"                                       |(string)                     |the bits
"difficulty"                                 |(numeric)                    |the difficulty
"previousblockhash"                          |(string)                     |the hash of the previous block
"nextblockhash"                              |(string)                     |the hash of the next block

### Response:

Structure|Type|Description
---------|----|-----------
"data"                                       |(string)                     |a string that is serialized, hex-encoded data for the indicated block

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getblock "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
```

Response:

```json
{
  "hash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
  "confirmations": 1,
  "size": 278,
  "height": 398,
  "version": 4,
  "merkleroot": "d6e8292d85181a177c21497a7e636fc4f1eef1fbd2887b3a19e1d72134429668",
  "segid": -2,
  "tx": [
    "d6e8292d85181a177c21497a7e636fc4f1eef1fbd2887b3a19e1d72134429668"
  ],
  "time": 1536603968,
  "nonce": "00002474e66d5ef243d7b0a8eec32983492daf29e0b0887bd67b2107d1000004",
  "solution": "30a5e9153392b643d139cf205b270d55cb7d3b4779fd7a3666bdb744ef221c966fde1324",
  "bits": "200f0ef8",
  "difficulty": 1.000023305960651,
  "chainwork": "0000000000000000000000000000000000000000000000000000000000001a7f",
  "anchor": "59d2cde5e65c1414c32ba54f0fe4bdb3d67618125286e6a191317917c812c6d7",
  "valuePools": [
    {
      "id": "sprout",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0,
      "valueDelta": 0.00000000,
      "valueDeltaZat": 0
    }
  ],
  "previousblockhash": "09f9b547842b38a7748c8633eedb609b269138fdb3f2f75570fcb0d653fe42f4"
}
```

Command:

```bash
./komodo-cli getblock "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084" false
```

Response:

```bash
04000000f442fe53d6b0fc7055f7f2b3fd3891269b60dbee33868c74a7382b8447b5f9096896423421d7e1193a7b88d2fbf1eef1c46f637e7a49217c171a18852d29e8d6000000000000000000000000000000000000000000000000000000000000000040b7965bf80e0f20040000d107217bd67b88b0e029af2d498329c3eea8b0d743f25e6de6742400002430a5e9153392b643d139cf205b270d55cb7d3b4779fd7a3666bdb744ef221c966fde13240101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff05028e010101ffffffff0110270000000000002321033097c6f4b12bd13a2e39b686b3a2fc30fe55a1d51221d857421e40564d5e237cac3fb7965b
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "hash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
    "confirmations": 1,
    "size": 278,
    "height": 398,
    "version": 4,
    "merkleroot": "d6e8292d85181a177c21497a7e636fc4f1eef1fbd2887b3a19e1d72134429668",
    "segid": -2,
    "tx": [
      "d6e8292d85181a177c21497a7e636fc4f1eef1fbd2887b3a19e1d72134429668"
    ],
    "time": 1536603968,
    "nonce": "00002474e66d5ef243d7b0a8eec32983492daf29e0b0887bd67b2107d1000004",
    "solution": "30a5e9153392b643d139cf205b270d55cb7d3b4779fd7a3666bdb744ef221c966fde1324",
    "bits": "200f0ef8",
    "difficulty": 1.000023305960651,
    "chainwork": "0000000000000000000000000000000000000000000000000000000000001a7f",
    "anchor": "59d2cde5e65c1414c32ba54f0fe4bdb3d67618125286e6a191317917c812c6d7",
    "valuePools": [
      {
        "id": "sprout",
        "monitored": true,
        "chainValue": 0,
        "chainValueZat": 0,
        "valueDelta": 0,
        "valueDeltaZat": 0
      }
    ],
    "previousblockhash": "09f9b547842b38a7748c8633eedb609b269138fdb3f2f75570fcb0d653fe42f4"
  },
  "error": null,
  "id": "curltest"
}
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09", false] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "04000000f442fe53d6b0fc7055f7f2b3fd3891269b60dbee33868c74a7382b8447b5f9096896423421d7e1193a7b88d2fbf1eef1c46f637e7a49217c171a18852d29e8d6000000000000000000000000000000000000000000000000000000000000000040b7965bf80e0f20040000d107217bd67b88b0e029af2d498329c3eea8b0d743f25e6de6742400002430a5e9153392b643d139cf205b270d55cb7d3b4779fd7a3666bdb744ef221c966fde13240101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff05028e010101ffffffff0110270000000000002321033097c6f4b12bd13a2e39b686b3a2fc30fe55a1d51221d857421e40564d5e237cac3fb7965b",
  "error": null,
  "id": "curltest"
}
```

Command:

```bash
./komodo-cli getblock 120
```

Response:

```json
{
  "hash": "0939408360b273fd681bbe5823999655fd5a7240303cdcbf952afe252246cc13",
  "confirmations": 279,
  "size": 277,
  "height": 120,
  "version": 4,
  "merkleroot": "4781cefbf7e14f6d7cdf89ae972391ae59b5776d1ed51204e94e65adf3ca6331",
  "segid": -2,
  "tx": [
    "4781cefbf7e14f6d7cdf89ae972391ae59b5776d1ed51204e94e65adf3ca6331"
  ],
  "time": 1536347890,
  "nonce": "000054c5822bb572319a67a89a3f511cf8caf8cd8ed6b7739c0b044b62ea000b",
  "solution": "03fc1abba5f415b1c422942835d46c7ba3e94665964da4c31e236c6cf9b3dfe6ffb65db1",
  "bits": "200f0f08",
  "difficulty": 1.000007093003461,
  "chainwork": "0000000000000000000000000000000000000000000000000000000000000809",
  "anchor": "59d2cde5e65c1414c32ba54f0fe4bdb3d67618125286e6a191317917c812c6d7",
  "valuePools": [
    {
      "id": "sprout",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0,
      "valueDelta": 0.00000000,
      "valueDeltaZat": 0
    }
  ],
  "previousblockhash": "01d1bfef50e079c53b36463fdf0ae55dc26b2205cd5f39c2bd030d19c2375e28",
  "nextblockhash": "0438bfda6a2706a622df7808fa5f4f32ac2e5d3039895ff8cb080d7e8e231188"
}
```

Command:

```bash
./komodo-cli getblock 120 false
```

Response:

```bash
04000000285e37c2190d03bdc2395fcd05226bc25de50adf3f46363bc579e050efbfd1013163caf3ad654ee90412d51e6d77b559ae912397ae89df7c6d4fe1f7fbce81470000000000000000000000000000000000000000000000000000000000000000f2ce925b080f0f200b00ea624b040b9c73b7d68ecdf8caf81c513f9aa8679a3172b52b82c55400002403fc1abba5f415b1c422942835d46c7ba3e94665964da4c31e236c6cf9b3dfe6ffb65db10101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0401780101ffffffff011027000000000000232103c0259e1a166e53f6ccf094ce37c0843d4a013622603bc301b4eb0f89c7cce823acf1ce925b
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["120"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "hash": "0939408360b273fd681bbe5823999655fd5a7240303cdcbf952afe252246cc13",
    "confirmations": 279,
    "size": 277,
    "height": 120,
    "version": 4,
    "merkleroot": "4781cefbf7e14f6d7cdf89ae972391ae59b5776d1ed51204e94e65adf3ca6331",
    "segid": -2,
    "tx": [
      "4781cefbf7e14f6d7cdf89ae972391ae59b5776d1ed51204e94e65adf3ca6331"
    ],
    "time": 1536347890,
    "nonce": "000054c5822bb572319a67a89a3f511cf8caf8cd8ed6b7739c0b044b62ea000b",
    "solution": "03fc1abba5f415b1c422942835d46c7ba3e94665964da4c31e236c6cf9b3dfe6ffb65db1",
    "bits": "200f0f08",
    "difficulty": 1.000007093003461,
    "chainwork": "0000000000000000000000000000000000000000000000000000000000000809",
    "anchor": "59d2cde5e65c1414c32ba54f0fe4bdb3d67618125286e6a191317917c812c6d7",
    "valuePools": [
      {
        "id": "sprout",
        "monitored": true,
        "chainValue": 0,
        "chainValueZat": 0,
        "valueDelta": 0,
        "valueDeltaZat": 0
      }
    ],
    "previousblockhash": "01d1bfef50e079c53b36463fdf0ae55dc26b2205cd5f39c2bd030d19c2375e28",
    "nextblockhash": "0438bfda6a2706a622df7808fa5f4f32ac2e5d3039895ff8cb080d7e8e231188"
  },
  "error": null,
  "id": "curltest"
}
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["120", false] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "04000000285e37c2190d03bdc2395fcd05226bc25de50adf3f46363bc579e050efbfd1013163caf3ad654ee90412d51e6d77b559ae912397ae89df7c6d4fe1f7fbce81470000000000000000000000000000000000000000000000000000000000000000f2ce925b080f0f200b00ea624b040b9c73b7d68ecdf8caf81c513f9aa8679a3172b52b82c55400002403fc1abba5f415b1c422942835d46c7ba3e94665964da4c31e236c6cf9b3dfe6ffb65db10101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0401780101ffffffff011027000000000000232103c0259e1a166e53f6ccf094ce37c0843d4a013622603bc301b4eb0f89c7cce823acf1ce925b",
  "error": null,
  "id": "curltest"
}
```

## getblockchaininfo

**getblockchaininfo**

The `getblockchaininfo` method returns a json object containing state information about blockchain processing.

::: tip
When the chain tip is at the last block before a network upgrade activation, the <b>consensus.chaintip</b> value is not equal to the <b>consensus.nextblock</b> value.
:::

[getblockchaininfo](../komodo-api/blockchain.html#getblockchaininfo) now returns a new size_on_disk key, which is the size of the blockchain, on disk, in bytes.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
"chain"                                      |(string)                     |current network name as defined in BIP70 (main, test, regtest)
"blocks"                                     |(numeric)                    |the current number of blocks processed in the server
"headers"                                    |(numeric)                    |the current number of headers we have validated
"bestblockhash"                              |(string)                     |the hash of the currently best block
"difficulty"                                 |(numeric)                    |the current difficulty
"verificationprogress"                       |(numeric)                    |estimate of verification progress [0..1]
"chainwork"                                  |(string)                     |total amount of work in active chain, in hexadecimal
"pruned"                                     |(bool)                       |whether the current state is in pruning mode; if true, the blockchain will not keep all transaction and block information, to preserve disk space
"size_on_disk"                               |(numeric)                    |the size of the blockchain on disk, measured in bytes
"commitments"                                |(numeric)                    |the current number of note commitments in the commitment tree
"softforks": { ..... }                       |(array)                      |status of softforks in progress
"id"                                         |(string)                     |name of softfork
"version"                                    |(numeric)                    |block version
"enforce": { ... }                           |(object)                              |progress toward enforcing the softfork rules for new-version blocks
"status"                                     |(boolean)                    |true if threshold reached
"found"                                      |(numeric)                    |number of blocks with the new version found
"required"                                   |(numeric)                    |number of blocks required to trigger
"window"                                     |(numeric)                    |maximum size of examined window of recent blocks
"reject": { ... }                            |(object)                     |progress toward rejecting pre-softfork blocks (same fields as "enforce")
"upgrades":                                  |(object)                     |status of network upgrades
"xxxxxxxxx_string":                          |(string)                     |branch ID of the upgrade
"name"                                       |(string)                     |name of upgrade
"activationheight"                           |(numeric)                    |block height of activation
"status"                                     |(string)                     |status of upgrade
"info"                                       |(string)                     |additional information about upgrade
"consensus": { ..... }                       |(object)                     |branch IDs of the current and upcoming consensus rules
"chaintip"                                   |(string)                     |branch ID used to validate the current chain tip
"nextblock"                                  |(string)                     |branch ID that the next block will be validated under



#### :pushpin: Examples:

Command:

```bash
./komodo-cli getblockchaininfo
```

Response:

```json
{
  "chain": "regtest",
  "blocks": 398,
  "headers": 398,
  "bestblockhash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
  "difficulty": 1.000023305960651,
  "verificationprogress": 1,
  "chainwork": "0000000000000000000000000000000000000000000000000000000000001a7f",
  "pruned": false,
  "size_on_disk": 5058467629,
  "commitments": 0,
  "valuePools": [
    {
      "id": "sprout",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0
    }
  ],
  "softforks": [
    {
      "id": "bip34",
      "version": 2,
      "enforce": {
        "status": false,
        "found": 399,
        "required": 750,
        "window": 1000
      },
      "reject": {
        "status": false,
        "found": 399,
        "required": 950,
        "window": 1000
      }
    }
  ],
  "upgrades": {
  },
  "consensus": {
    "chaintip": "00000000",
    "nextblock": "00000000"
  }
}
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "chain": "regtest",
    "blocks": 398,
    "headers": 398,
    "bestblockhash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
    "difficulty": 1.000023305960651,
    "verificationprogress": 1,
    "chainwork": "0000000000000000000000000000000000000000000000000000000000001a7f",
    "pruned": false,
    "size_on_disk": 5058467629,
    "commitments": 0,
    "valuePools": [
      {
        "id": "sprout",
        "monitored": true,
        "chainValue": 0,
        "chainValueZat": 0
      }
    ],
    "softforks": [
      {
        "id": "bip34",
        "version": 2,
        "enforce": {
          "status": false,
          "found": 399,
          "required": 750,
          "window": 1000
        },
        "reject": {
          "status": false,
          "found": 399,
          "required": 950,
          "window": 1000
        }
      }
    ],
    "upgrades": {},
    "consensus": {
      "chaintip": "00000000",
      "nextblock": "00000000"
    }
  },
  "error": null,
  "id": "curltest"
}
```

## getblockcount

**getblockcount**

The `getblockcount` method returns the number of blocks in the best valid block chain.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
data                                         |(numeric)                    |the current block count

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getblockcount
```

Response:

```bash
398
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 398,
  "error": null,
  "id": "curltest"
}
```

## getblockhash

**getblockhash index**

The `getblockhash` method returns the hash of the indicated block index, according to the best blockchain at the time provided.

### Arguments:

Structure|Type|Description
---------|----|-----------
index                                        |(numeric, required)          |the block index

### Response:

Structure|Type|Description
---------|----|-----------
"hash"                                       |(string)                     |the block hash

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getblockhash 100
```

Response:

```bash
08674c7a6ab6c40000d45e2094f2cafc6575bfcfdd1ce90fa0060fa573803024
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockhash", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": "08674c7a6ab6c40000d45e2094f2cafc6575bfcfdd1ce90fa0060fa573803024",
  "error": null,
  "id": "curltest"
}
```

## getblockhashes

**getblockhashes high low '{"noOrphans": bool, "logicalTimes": bool}'**

The `getblockhashes` method returns an array of hashes of blocks within the timestamp range provided. It requires [`timestampindex`](../installations/common-runtime-parameters.html#timestampindex) to be enabled.

### Arguments:

Structure|Type|Description
---------|----|-----------
high                                         |(numeric, required)          |the newer block timestamp
low                                          |(numeric, required)          |the older block timestamp
options                                      |(string, required)           |a json object
"noOrphans"                                  |(boolean)                    |will only include blocks on the main chain
"logicalTimes"                               |(boolean)                    |will include logical timestamps with hashes


### Response:

Structure|Type|Description
---------|----|-----------
"hash"                                       |(string)                     |the block hash
"blockhash"                                  |(string)                     |the block hash
"logicalts"                                  |(numeric)                    |the logical timestamp

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getblockhashes 1531614698 1531614498
```

Response:

```bash
[
  "01c555caa581783c94af1ec4fdd1237a37829fc8ccf9fd956f3df462495a8629",
  "0debf03ff8fe2c09ccb7e8b3770121d71ef8c7fce267a04f9301cc50f594f9ac",
  "01c92378d9fa66eb83d0bfcf601678792e0351f9b51483db1084347dabd78432"
]

```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockhashes", "params": [1531614698, 1531614498] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{  
   "result":[  
      "01c555caa581783c94af1ec4fdd1237a37829fc8ccf9fd956f3df462495a8629",
      "0debf03ff8fe2c09ccb7e8b3770121d71ef8c7fce267a04f9301cc50f594f9ac",
      "01c92378d9fa66eb83d0bfcf601678792e0351f9b51483db1084347dabd78432"
   ],
   "error":null,
   "id":"curltest"
}
```

Command:

```bash
./komodo-cli getblockhashes 1531614698 1531614498 '{"noOrphans":false, "logicalTimes":true}'
```

Response:

```json
[
  {
    "blockhash": "01c555caa581783c94af1ec4fdd1237a37829fc8ccf9fd956f3df462495a8629",
    "logicalts": 1531614555
  },
  {
    "blockhash": "0debf03ff8fe2c09ccb7e8b3770121d71ef8c7fce267a04f9301cc50f594f9ac",
    "logicalts": 1531614615
  },
  {
    "blockhash": "01c92378d9fa66eb83d0bfcf601678792e0351f9b51483db1084347dabd78432",
    "logicalts": 1531614692
  }
]
```

## getblockheader

**getblockheader "hash" ( verbose )**

The `getblockheader` method returns information about the indicated block.

The verbose input is optional. If verbose is false, the method returns a string that is serialized, hex-encoded data for the indicated blockheader. If verbose is true, the method returns a json object with information about the indicated blockheader.

### Arguments:

Structure|Type|Description
---------|----|-----------
"hash"                                       |(string, required)           |the block hash
verbose                                      |(boolean, optional, default=true)|true returns a json object, false returns hex-encoded data

### Response (verbose = `true`):

Structure|Type|Description
---------|----|-----------
"hash"                                       |(string)                     |the block hash (same as provided)
"confirmations"                              |(numeric)                    |the number of confirmations, or -1 if the block is not on the main chain
"height"                                     |(numeric)                    |the block height or index
"version"                                    |(numeric)                    |the block version
"merkleroot"                                 |(string)                     |the merkle root
"time"                                       |(numeric)                    |the block time in seconds since epoch (Jan 1 1970 GMT)
"nonce"                                      |(numeric)                    |the nonce
"bits"                                       |(string)                     |the bits
"difficulty"                                 |(numeric)                    |the difficulty
"previousblockhash"                          |(string)                     |the hash of the previous block
"nextblockhash"                              |(string)                     |the hash of the next block

### Response (verbose = `false`):

Structure|Type|Description
---------|----|-----------
"data"                                       |(string)                     |a string that is serialized hex-encoded data for the indicated block

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getblockheader "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
```

Response:

```json
{
  "hash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
  "confirmations": 1,
  "height": 398,
  "version": 4,
  "merkleroot": "d6e8292d85181a177c21497a7e636fc4f1eef1fbd2887b3a19e1d72134429668",
  "time": 1536603968,
  "nonce": "00002474e66d5ef243d7b0a8eec32983492daf29e0b0887bd67b2107d1000004",
  "solution": "30a5e9153392b643d139cf205b270d55cb7d3b4779fd7a3666bdb744ef221c966fde1324",
  "bits": "200f0ef8",
  "difficulty": 1.000023305960651,
  "chainwork": "0000000000000000000000000000000000000000000000000000000000001a7f",
  "segid": -2,
  "previousblockhash": "09f9b547842b38a7748c8633eedb609b269138fdb3f2f75570fcb0d653fe42f4"
}
```

Command:

```bash
./komodo-cli getblockheader "043daeb9276c4fb9176f95d043567e18d40bff3aff114f551b950ee48c75ca02" false
```

Response:

```bash
0400000057d656a1f4e1f063a2c7f29bc8f83f4355898214da6d1cb6753cb838a07ec40298a4d266d7048e3d2c70b36299eed7329aa30681e76a98acac03b2e9825f161600000000000000000000000000000000000000000000000000000000000000001860dc570f0f0f200000234d537c49212e208712fd66a5a02b368d955287e671b191baf4d2350000fd40050046b5d05bc4e28d970dd26082d6ff4d2e4c5e1e4a25156668ed26ad399f4e72dcd8d188f4e5ccd8f8500d8b10db7450364109f5751792ec3019febab4f54c1dc1c1e99f1f2581bb90a351c44260756292189019125b8cdd4ae94b8b5d49ca38f8ddae7ea3e115d93e1bc6a3f08f6c539f903ad202eedb92b4b510122b1b199351e2136dd1ddad94661a7244b7ba25cfb710c21c4702e8f7379ec5e8af966ceaf1a412450eb6e79e06d3e70acbd38dbaddce5096ccf95224632aa9009d186dd5d626121841419b71a1add9a648a4507864ec1f5d7b32fbc92f731f3ab6b042ddcb51e92c1109ee4feb76aed7aa6b2f7b7b3726445856a78f5c1cadb8097ef271e51713d974d565ed0f356fb734ee3f76fe10e310cdb6cd2d486d143486d54e887ddd7912fa760f8c088bbc04c92b4f5f6639cdb57ca9c86bfd95ac2cdc3ab8a5a8a399ea2f44fcb175ff1948436a88ac013f1d956713c5917d8192df1e25b4450db47bb0c104ef29f9ee53626da86ed2f66c3ca9959e5019380811471e4f208adf6ac9d8631f2427c3e9a560d367721f8b0276514c4e2d966fe5d016d5114ab83d5e4b74028828e8c462f59d67ce04c35a54b0a5fdd9dbaf162fa30a05bc309971ed2544f6b57de7c55e54dc9dae0fc33765bbc7ada3b988597391f45426c0b0dc5e221876346b719ebbf359fa31cda14549a24683da8fa207bb6d0bde876238642a828057d4a992074a3c7e4d08ac34c9620aa00b95dda1d623a6e38129f2bfee2f1d7435a05a4d2103b4f512692553e9ccc96bbb9bc03ccfce20c49fea0d85a306fae6ed65d2c38ff6cb86375272ad64b236e3c58564489dc3c1c14a39f1943b528994ed37177869fb5845fb19e58d42d9e39884f1624dde56d4ee203f7e01365b3b7ae8ae59471788f07761f45f827309e3b2c35bb1bf6bf05321007df6cc00e15426b49cc56ba2d9e0a12d75cc6df394f6798561c097ff85ae88037688a82d5e524662d732b784f004e8a16b0084f90d06f290b83563d49c587e9081eb19fe92b02935124bc0ecc3e61ebbad861feddb7b3d073d3c7abdcb74dfb5b1b68adc7e0379baaad718041520643aa729b8e999f102a59451297d0ee7f4a5ad25bef65b6f68e931d786d952b44fb22abc0b19bcf34b61060e24f53cb9fcc4a5c22af37ed1c00dd7a59d0844bfad11d629c772f083cdbfb15c4118eb96ebc1220be6082b0b8374882bf7461ebaf8a1e4417ffccd22a173d0dfe4edafaec255cf71638afe8edc9bb8372736da8631d359c8c01482dd4a7aaeb67a4bbf29fb0baba460694929c7ede0f1bc1aea916d48e75fee4e126a24c95351428ba63622d5b67090b25f3336a47217cae177f654dcbf4fec952ee444e19eafe67acabe431b573bd451cb892d3136b6d87f7855d938568b330113f7b26ad128c9ef3f420d8dc636413d1cb5c6960fdb64d7a7c853f99ad204f9274d49e16c57be5ebb01aaeccd0a907619abd7336744478fc237981917410289c43cbfd62496ddc8362e183e2f39ac4bfde9bb03d8b5ac8bcd2e9cdf2d75522b325bb6e5ee5d18ca14dd3c04c72afa2fd537b5942946cdb25161f96ac50ad086debb23ccdbc6da364f42ff7cf78e6cbef89347b6cf97856e7763a92ef799c94ce93369b89c7cca0c35c9e70bf24553bc1cc2c638cababd6dddf0da863cb48dd06edc0186ece1352624506e39c9605e68e60fa6ebc3c69d8a299c691630f9c65ad3536f1dfa921b4671dd3ca66559941603d0d824907951a69071b016ec1a3a85d5ec61cdeec2236c9f9afd9612d74ec819e0ba439134f3c9e5b2f391b06ec586015bdfa5df252c242d4e22fbe3b6d5c3ada0f12d426096fe574143ccec2f66e881559fbfa4edf0af5676311c9f8274
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockheader", "params": ["0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "hash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
    "confirmations": 1,
    "height": 398,
    "version": 4,
    "merkleroot": "d6e8292d85181a177c21497a7e636fc4f1eef1fbd2887b3a19e1d72134429668",
    "time": 1536603968,
    "nonce": "00002474e66d5ef243d7b0a8eec32983492daf29e0b0887bd67b2107d1000004",
    "solution": "30a5e9153392b643d139cf205b270d55cb7d3b4779fd7a3666bdb744ef221c966fde1324",
    "bits": "200f0ef8",
    "difficulty": 1.000023305960651,
    "chainwork": "0000000000000000000000000000000000000000000000000000000000001a7f",
    "segid": -2,
    "previousblockhash": "09f9b547842b38a7748c8633eedb609b269138fdb3f2f75570fcb0d653fe42f4"
  },
  "error": null,
  "id": "curltest"
}
```

## getchaintips

**getchaintips**

The `getchaintips` method returns information about all known tips in the block tree, including the main chain and any orphaned branches.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
"height"                                     |(numeric)                    |height of the chain tip
"hash"                                       |(string)                     |block hash of the tip
"branchlen"                                  |(numeric)                    |zero for main chain
"status"                                     |(string)                     |"active" for the main chain
"height"                                     |(numeric)                    |height of the branch tip
"hash"                                       |(string)                     |blockhash of the branch tip
"branchlen"                                  |(numeric)                    |length of branch connecting the tip to the main chain
"status"                                     |(string)                     |status of the chain

### Possible values for the returned status property:

Status|Description
------|-----------
"invalid"           |this branch contains at least one invalid block
"headers-only"      |not all blocks for this branch are available, but the headers are valid
"valid-headers"     |all blocks are available for this branch, but they were never fully validated
"valid-fork"        |this branch is not part of the active chain, but is fully validated
"active"            |this is the tip of the active main chain, which is certainly valid

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getchaintips
```

Response:

```json
[
  {
    "height": 398,
    "hash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
    "branchlen": 0,
    "status": "active"
  }
]
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getchaintips", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": [
    {
      "height": 398,
      "hash": "0dd66ee1f151c38f73843378c08715ee3f4d3cf2888783e2846b81c057987084",
      "branchlen": 0,
      "status": "active"
    }
  ],
  "error": null,
  "id": "curltest"
}
```

## getdifficulty

**getdifficulty**

The `getdifficulty` method returns the proof-of-work difficulty as a multiple of the minimum difficulty.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
number                                       |(numeric)                    |the proof-of-work difficulty as a multiple of the minimum difficulty

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getdifficulty
```

Response:

```bash
1.000023305960651
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getdifficulty", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": 1.000023305960651,
  "error": null,
  "id": "curltest"
}
```

## getmempoolinfo

**getmempoolinfo**

The `getmempoolinfo` method returns details on the active state of the transaction memory pool.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
"size"                                       |(numeric)                    |current tx count
"bytes"                                      |(numeric)                    |sum of all tx sizes
"usage"                                      |(numeric)                    |total memory usage for the mempool

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getmempoolinfo
```

Response:

```json
{
  "size": 1,
  "bytes": 226,
  "usage": 896
}
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "size": 1,
    "bytes": 226,
    "usage": 896
  },
  "error": null,
  "id": "curltest"
}
```

## getrawmempool

**getrawmempool ( verbose )**

The `getrawmempool` method returns all transaction ids in the memory pool as a json array of transaction ids.

The verbose input is optional and is false by default. When it is true, the method instead returns a json object with various related data.

### Arguments:

Structure|Type|Description
---------|----|-----------
verbose                                      |(boolean, optional, default=false)|true for a json object, false for a json array of transaction ids

### Response (verbose = `false`):

Structure|Type|Description
---------|----|-----------
"transaction_id"                             |(string)                     |the transaction id

### Response (verbose = `true`):

Structure|Type|Description
---------|----|-----------
"transaction_id": { .... }                   |(json object)                |
"size"                                       |(numeric)                    |transaction size in bytes
"fee"                                        |(numeric)                    |transaction fee
"time"                                       |(numeric)                    |local time transaction entered pool in seconds since 1 Jan 1970 GMT
"height"                                     |(numeric)                    |block height when transaction entered pool
"startingpriority"                           |(numeric)                    |priority when transaction entered pool
"currentpriority"                            |(numeric)                    |transaction priority now
"depends": { ... }                           |(array)                     |unconfirmed transactions used as inputs for this transaction
"transaction_id"                             |(string)                     |parent transaction id

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getrawmempool true
```

Response:

```json
{
  "44760f145303cae081819c6e54665d6716c98e97691603b4edf133b8180e6048": {
    "size": 488,
    "fee": 0.00011462,
    "time": 1536618366,
    "height": 448,
    "startingpriority": 20910198.65384615,
    "currentpriority": 20910198.65384615,
    "depends": [
    ]
  }
}
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawmempool", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "44760f145303cae081819c6e54665d6716c98e97691603b4edf133b8180e6048": {
      "size": 488,
      "fee": 0.00011462,
      "time": 1536618366,
      "height": 448,
      "startingpriority": 20910198.65384615,
      "currentpriority": 20910198.65384615,
      "depends": []
    }
  },
  "error": null,
  "id": "curltest"
}
```

## getspentinfo

**getspentinfo '{"txid": "txid_string", "index"}'**

The `getspentinfo` method returns the transaction id and index where the given output is spent. It requires [`spentindex`](../installations/common-runtime-parameters.html#spentindex) to be enabled.

### Arguments:

Structure|Type|Description
---------|----|-----------
"txid"                                       |(string)                     |the hex string of the txid
"index"                                      |(number)                     |the output's index

### Response:

Structure|Type|Description
---------|----|-----------
"txid"                                       |(string)                     |the transaction id
"index"                                      |(number)                     |the spending input index

#### :pushpin: Examples:

Command:

```bash
./komodo-cli getspentinfo '{"txid": "4479f2c05ba22adf2333db724f247a09effcc9edea8c079da0da05d3a0451064", "index": 0}'
```

Response:

```json
{
  "txid": "d2a7b19178ff6b4b1d54befc300879239969716322e4bcd2742162d86ef113c8",
  "index": 228,
  "height": 994953
}
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getspentinfo", "params": [{"txid": "4479f2c05ba22adf2333db724f247a09effcc9edea8c079da0da05d3a0451064", "index": 0}] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{  
   "result":{  
      "txid":"d2a7b19178ff6b4b1d54befc300879239969716322e4bcd2742162d86ef113c8",
      "index":228,
      "height":994953
   },
   "error":null,
   "id":"curltest"
}
```

## gettxout

**gettxout "txid_string" vout_number ( includemempool_bool )**

The `gettxout` method returns details about an unspent transaction output.

### Arguments:

Structure|Type|Description
---------|----|-----------
"txid"                                       |(string, required)           |the transaction id
vout                                         |(numeric, required)          |vout value
includemempool                               |(boolean, optional)          |whether to include the mempool

### Response:

Structure|Type|Description
---------|----|-----------
"bestblock"                                  |(string)                     |the block hash
"confirmations"                              |(numeric)                    |the number of confirmations
"value"                                      |(numeric)                    |the transaction value
"scriptPubKey":                              |(json object)                |the transaction value in KMD
"asm"                                        |(string)                     |
"hex"                                        |(string)                     |
"reqSigs"                                    |(numeric)                    |the number of required signatures
"type"                                       |(string)                     |the type, e.g. pubkeyhash
"addresses"                                  |(array of strings)            |an array of Komodo addresses
"address"                                    |(string)                     |the blockchain address
"version"                                    |(numeric)                    |the version
"coinbase"                                   |(boolean)                    |coinbase or not

#### :pushpin: Examples:

Command:

```bash
./komodo-cli gettxout "txid" 1
```

Response:

```json
{
  "bestblock": "0e398d8d00f7846f28b47a6c0da16b14002441f5a5340b6d492060c698bdd84c",
  "confirmations": 252,
  "value": 0.00010000,
  "scriptPubKey": {
    "asm": "03c0259e1a166e53f6ccf094ce37c0843d4a013622603bc301b4eb0f89c7cce823 OP_CHECKSIG",
    "hex": "2103c0259e1a166e53f6ccf094ce37c0843d4a013622603bc301b4eb0f89c7cce823ac",
    "reqSigs": 1,
    "type": "pubkey",
    "addresses": [
      "RM1mKzZDEr462UBqVjXSKXR3F83yMpG3Ue"
    ]
  },
  "version": 1,
  "coinbase": true
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxout", "params": ["txid", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "bestblock": "0e398d8d00f7846f28b47a6c0da16b14002441f5a5340b6d492060c698bdd84c",
    "confirmations": 252,
    "value": 0.0001,
    "scriptPubKey": {
      "asm": "03c0259e1a166e53f6ccf094ce37c0843d4a013622603bc301b4eb0f89c7cce823 OP_CHECKSIG",
      "hex": "2103c0259e1a166e53f6ccf094ce37c0843d4a013622603bc301b4eb0f89c7cce823ac",
      "reqSigs": 1,
      "type": "pubkey",
      "addresses": [
        "RM1mKzZDEr462UBqVjXSKXR3F83yMpG3Ue"
      ]
    },
    "version": 1,
    "coinbase": true
  },
  "error": null,
  "id": "curltest"
}
```

## gettxoutproof

**gettxoutproof '["transaction_id", ... ]' ( "blockhash_string" )**

The `gettxoutproof` method returns a hex-encoded proof showing that the indicated transaction was included in a block.

::: tip
The <b>gettxoutproof</b> method relies on the <b>txindex</b> runtime parameter. This parameter is enabled by default on all KMD-based blockchains, and should never be disabled.
:::

### Arguments:

Structure|Type|Description
---------|----|-----------
"txid"                                       |(string)                     |a transaction hash
"blockhash"                                  |(string, optional)           |if specified, looks for the relevant txid in this block

### Response:

Structure|Type|Description
---------|----|-----------
"data"                                       |(string)                     |a string that is a serialized, hex-encoded data for the proof

#### :pushpin: Examples:

Command:

```bash
./komodo-cli gettxoutproof '["c71f4a2ebf87bdd588e3aa168917933ee4be1661245ebf52d5708a8339cf9d7a"]' "0a28e2fb630b282138bf23bb79f597b11acff6f57c8d9c1c10fa54770035c813"
```

Response:

```json
040000004cd8bd98c66020496d0b34a5f5412400146ba10d6c7ab4286f84f7008d8d390e9ca9575183f60906e293e9766997396bec59f1c0b966085de3d17f8ac3c9d5280000000000000000000000000000000000000000000000000000000000000000da05975bf50e0f202d004b81fcc388cfd411d8c7c59a548e070b5affe938ce8ce830f10b298b00002402939a9a31df1305b40d26d9748283b102c708258717248d0d63f01d2957d8e3dcf56f6e03000000022e4babc29707fbdd8da2e4277b7c8b8b09e837f409eb047c936904d75fc8e6267a9dcf39838a70d552bf5e246116bee43e93178916aae388d5bd87bf2e4a1fc7010d
```

## gettxoutsetinfo

**gettxoutsetinfo**

The `gettxoutsetinfo` method returns statistics about the unspent transaction output set.

::: tip
Note this call may take a long time to complete, depending on the state of your blockchain.
:::

### Arguments:
Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:
Structure|Type|Description
---------|----|-----------
"height"                                     |(numeric)                    |the current block height (index)
"bestblock"                                  |(string)                     |the best block hash hex
"transactions"                               |(numeric)                    |the number of transactions
"txouts"                                     |(numeric)                    |the number of output transactions
"bytes_serialized"                           |(numeric)                    |the serialized size
"hash_serialized"                            |(string)                     |the serialized hash
"total_amount"                               |(numeric)                    |the total amount

#### :pushpin: Examples:

Command:

```bash
./komodo-cli gettxoutsetinfo
```

Response:

```json
{
  "height": 459,
  "bestblock": "0a28e2fb630b282138bf23bb79f597b11acff6f57c8d9c1c10fa54770035c813",
  "transactions": 258,
  "txouts": 261,
  "bytes_serialized": 18051,
  "hash_serialized": "fdd2039fa21400be0928b26dfe534f543dc5090989bcbd97fdc81b30ce7dca3a",
  "total_amount": 10.16456229
}
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxoutsetinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "height": 459,
    "bestblock": "0a28e2fb630b282138bf23bb79f597b11acff6f57c8d9c1c10fa54770035c813",
    "transactions": 258,
    "txouts": 261,
    "bytes_serialized": 18051,
    "hash_serialized": "fdd2039fa21400be0928b26dfe534f543dc5090989bcbd97fdc81b30ce7dca3a",
    "total_amount": 10.16456229
  },
  "error": null,
  "id": "curltest"
}
```

## kvsearch

**kvsearch "key_string"**

The `kvsearch` method searches for a key stored via the [`kvupdate`](../komodo-api/blockchain.html#kvupdate) command.

::: tip
This feature is only available for asset chains.
:::

### Arguments:

Structure|Type|Description
---------|----|-----------
key                                          |(string, required)           |search the chain for this key


### Response:

Structure|Type|Description
---------|----|-----------
"coin"                                       |(string)                     |chain the key is stored on
"currentheight"                              |(numeric)                    |current height of the chain
"key"                                        |(string)                     |key
"keylen"                                     |(string)                     |length of the key
"owner"                                      |(string)                     |hex string representing the owner of the key
"height"                                     |(numeric)                    |height the key was stored at
"expiration"                                 |(numeric)                    |height the key will expire
"flags"                                      |(numeric)                    |1 if the key was created with a password; 0 otherwise
"value"                                      |(string)                     |stored value
"valuesize"                                  |(string)                     |amount of characters stored

#### :pushpin: Examples:

Command:

```bash
./komodo-cli kvsearch examplekey
```

Response:

```json
{
  "coin": "MYCOIN",
  "currentheight": 566,
  "key": "examplekey",
  "keylen": 10,
  "owner": "1ff91604c6adb6ec550e7575fe9f1ca591704572e125f55bed03a21c242c31b7",
  "height": 561,
  "expiration": 2001,
  "flags": 0,
  "value": "examplevalue",
  "valuesize": 12
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "kvsearch", "params": ["examplekey"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "coin": "MYCOIN",
    "currentheight": 566,
    "key": "examplekey",
    "keylen": 10,
    "owner": "1ff91604c6adb6ec550e7575fe9f1ca591704572e125f55bed03a21c242c31b7",
    "height": 561,
    "expiration": 2001,
    "flags": 0,
    "value": "examplevalue",
    "valuesize": 12
  },
  "error": null,
  "id": "curltest"
}
```

## kvupdate

**kvupdate "key_string" "value_string" days "passphrase_string"**

The `kvupdate` method stores a key/value pair via OP_RETURN.

::: tip
This feature is available only for asset chains. The maximum value memory size is 8kB.
:::

### Arguments:

Structure|Type|Description
---------|----|-----------
"key"                                        |(string, required)           |key (should be unique)
"value"                                      |(string, required)           |value
"days"                                       |(numeric, required)          |amount of days before the key expires (1440 blocks/day); minimum 1 day
"passphrase"                                 |(string, optional)           |passphrase required to update this key

### Response:

Structure|Type|Description
---------|----|-----------
"coin"                                       |(string)                     |chain the key is stored on
"height"                                     |(numeric)                    |height the key was stored at
"expiration"                                 |(numeric)                    |height the key will expire
"flags"                                      |(string)                     |amount of days the key will be stored
"key"                                        |(numeric)                    |stored key
"keylen"                                     |(numeric)                    |length of the key
"value"                                      |(numeric)                    |stored value
"valuesize"                                  |(string)                     |length of the stored value
"fee"                                        |(string)                     |transaction fee paid to store the key
"txid"                                       |(string)                     |transaction id

#### :pushpin: Examples:

Command:

```bash
./komodo-cli kvupdate "examplekey" "examplevalue" 2 "examplepassphrase"
```

Response:

```json
{
  "coin": "MYCOIN",
  "owner": "1ff91604c6adb6ec550e7575fe9f1ca591704572e125f55bed03a21c242c31b7",
  "height": 566,
  "expiration": 2006,
  "flags": 3,
  "key": "examplekey",
  "keylen": 10,
  "value": "examplevalue",
  "valuesize": 12,
  "fee": 0.001,
  "txid": "2dc76f39188bb006931a2c924fdf66bc3baf149bf880fffad778cabd6ace5749"
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "kvupdate", "params": ["examplekey", "examplevalue", "2", "examplepassphrase"] }' -H 'content-type: text/plain;' http://127.0.0.1:9801
```

Response:

```json
{
  "result": {
    "coin": "MYCOIN",
    "owner": "1ff91604c6adb6ec550e7575fe9f1ca591704572e125f55bed03a21c242c31b7",
    "height": 566,
    "expiration": 2006,
    "flags": 3,
    "key": "examplekey",
    "keylen": 10,
    "value": "examplevalue",
    "valuesize": 12,
    "fee": 0.001,
    "txid": "9f44dc664882198b14e9a8c466d466efcdd070ccb6f57be8e2884aa11e7b2a30"
  },
  "error": null,
  "id": "curltest"
}
```

## minerids

**minerids height**

The `minerids` method returns information about the notary nodes and external miners at a specific block height. The response will calculate results according to the 2000 blocks proceeding the indicated "height" block.

### Arguments:

Structure|Type|Description
---------|----|-----------
heights                                      |(number)                     |the block height for the query

### Response:

Structure|Type|Description
---------|----|-----------
"mined":                                     |                             |
"notaryid"                                   |(number)                     |the id of the specific notary node
"kmdaddress"                                 |(string)                     |the KMD address of the notary node
"pubkey"                                     |(string)                     |the public signing key of the notary node
"blocks"                                     |(number)                     |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli minerids 1000000
```

Response:

```json
{
  "mined": [
    {
      "notaryid": 0,
      "KMDaddress": "RNJmgYaFF5DbnrNUX6pMYz9rcnDKC2tuAc",
      "pubkey": "03b7621b44118017a16043f19b30cc8a4cfe068ac4e42417bae16ba460c80f3828",
      "blocks": 22
    }
      ...    (63 responses omitted for brevity)
    ,
    {
      "pubkey": "external miners",
      "blocks": 541
    }
  ],
  "numnotaries": 64
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "minerids", "params": ["1000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": {
    "mined": [
      {
        "notaryid": 0,
        "KMDaddress": "RNJmgYaFF5DbnrNUX6pMYz9rcnDKC2tuAc",
        "pubkey": "03b7621b44118017a16043f19b30cc8a4cfe068ac4e42417bae16ba460c80f3828",
        "blocks": 22
      }
        ...    (63 responses omitted for brevity)
      ,
      {
        "pubkey": "external miners",
        "blocks": 541
      }
    ],
    "numnotaries": 64
  },
  "error": null,
  "id": "curltest"
}
```

## notaries

**notaries height timestamp**

**notaries height**

**notaries timestamp**

The `notaries` method returns the public key, BTC address, and KMD address for each Komodo notary node.

Either or both of the height and timestamp parameters will suffice.

### Arguments:

Structure|Type|Description
---------|----|-----------
height                                       |(number)                     |the block height desired for the query
timestamp                                    |(number)                     |the timestamp of the block desired for the query

### Response:

Structure|Type|Description
---------|----|-----------
"notaries": [ ... ]                          |(array)                             |
"pubkey"                                     |(string)                     |the public signing key of the indicated notary node, used on the KMD network to create notary-node authorized transactions
"BTCaddress"                                 |(string)                     |the public BTC address the notary node uses on the BTC blockchain to create notarizations
"KMDaddress"                                 |(string)                     |the public KMD address the notary node uses on the KMD blockchain to create notarizations
"numnotaries"                                |(number)                     |the number of notary nodes; typically it is 64, but may vary on rare circumstances, such as during election seasons
"height"                                     |(number)                     |the block height number at which the notary-node information applies
"timestamp"                                  |(number)                     |the timestamp at which the notary-node information applies

#### :pushpin: Examples:

Command:

```bash
./komodo-cli notaries 1536365515
```

Response:

```json
{
  "notaries": [
    {
      "pubkey": "03b7621b44118017a16043f19b30cc8a4cfe068ac4e42417bae16ba460c80f3828",
      "BTCaddress": "1E2ac2gxeFR2ir1H3vqETTperWkiXkwy99",
      "KMDaddress": "RNJmgYaFF5DbnrNUX6pMYz9rcnDKC2tuAc"
    },
      ...  (63 responses omitted from the documentation for brevity)
  ],
  "numnotaries": 64,
  "height": 1536365515,
  "timestamp": 1536792974
}
```

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "notaries", "params": ["1000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
"result": {
  "notaries": [
    {
      "pubkey": "03b7621b44118017a16043f19b30cc8a4cfe068ac4e42417bae16ba460c80f3828",
      "BTCaddress": "1E2ac2gxeFR2ir1H3vqETTperWkiXkwy99",
      "KMDaddress": "RNJmgYaFF5DbnrNUX6pMYz9rcnDKC2tuAc"
    },
      ...      (63 responses omitted from documentation for brevity)
  ],
  "numnotaries": 64,
  "height": 1000000,
  "timestamp": 1536365515
},
"error": null,
"id": "curltest"
}
```

## verifychain

**verifychain ( checklevel numblocks )**

The `verifychain` method verifies the coin daemon's blockchain database.

::: tip
Depending on the state of your blockchain database and daemon, this call can take a prolonged period of time to complete.
:::

### Arguments:

Structure|Type|Description
---------|----|-----------
checklevel                                   |(numeric, optional, 0-4, default=3)|indicates the thoroughness of block verification
numblocks                                    |(numeric, optional, default=288, 0=all)|indicates the number of blocks to verify

### Response:

Structure|Type|Description
---------|----|-----------
true/false                                   |(boolean)                    |verification was successful or unsuccessful

#### :pushpin: Examples:

Command:

```bash
./komodo-cli verifychain
```

Response:

```bash
true
```

You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifychain", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

Response:

```json
{
  "result": true,
  "error": null,
  "id": "curltest"
}
```

## verifytxoutproof

**verifytxoutproof "proof_string"**

The `verifytxoutproof` method verifies that a proof points to a transaction in a block. It returns the transaction to which the proof is committed, or it will throw an RPC error if the block is not in the current best chain.

### Arguments:

Structure|Type|Description
---------|----|-----------
"proof_string"                               |(string, required)           |the hex-encoded proof generated by gettxoutproof

### Response:

Structure|Type|Description
---------|----|-----------
"txid"                                       |(string)                     |the transaction ids which the proof commits to; the array is empty if the proof is invalid


#### :pushpin: Examples:

Command:

```bash
./komodo-cli verifytxoutproof "040000004cd8bd98c66020496d0b34a5f5412400146ba10d6c7ab4286f84f7008d8d390e9ca9575183f60906e293e9766997396bec59f1c0b966085de3d17f8ac3c9d5280000000000000000000000000000000000000000000000000000000000000000da05975bf50e0f202d004b81fcc388cfd411d8c7c59a548e070b5affe938ce8ce830f10b298b00002402939a9a31df1305b40d26d9748283b102c708258717248d0d63f01d2957d8e3dcf56f6e03000000022e4babc29707fbdd8da2e4277b7c8b8b09e837f409eb047c936904d75fc8e6267a9dcf39838a70d552bf5e246116bee43e93178916aae388d5bd87bf2e4a1fc7010d"
```

Response:

```json
[
  "c71f4a2ebf87bdd588e3aa168917933ee4be1661245ebf52d5708a8339cf9d7a"
]
```

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifytxoutproof", "params": ["040000004cd8bd98c66020496d0b34a5f5412400146ba10d6c7ab4286f84f7008d8d390e9ca9575183f60906e293e9766997396bec59f1c0b966085de3d17f8ac3c9d5280000000000000000000000000000000000000000000000000000000000000000da05975bf50e0f202d004b81fcc388cfd411d8c7c59a548e070b5affe938ce8ce830f10b298b00002402939a9a31df1305b40d26d9748283b102c708258717248d0d63f01d2957d8e3dcf56f6e03000000022e4babc29707fbdd8da2e4277b7c8b8b09e837f409eb047c936904d75fc8e6267a9dcf39838a70d552bf5e246116bee43e93178916aae388d5bd87bf2e4a1fc7010d"] }' -H 'content-type: text/plain;' http://127.0.0.1:9801
```

Response:

```json
{
  "result": [
    "c71f4a2ebf87bdd588e3aa168917933ee4be1661245ebf52d5708a8339cf9d7a"
  ],
  "error": null,
  "id": "curltest"
}
```
