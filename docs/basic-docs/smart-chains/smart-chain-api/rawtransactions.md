# Rawtransactions

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## createrawtransaction

**createrawtransaction '[{ "txid": "id_string", "vout": number }, ... ]' '{ "address": amount, ... }'**

The `createrawtransaction` method creates a transaction, spending the given inputs and sending to the given addresses. The method returns a hex-encoded raw transaction.

::: tip
This is a raw transaction, and therefore the inputs are not signed and the transaction is not stored in the wallet nor transmitted to the network.
:::

### Arguments

| Name | Type | Description | 
| -------------- | ------------------- | ---------------------------------------------------------- |
| "transactions" | (string, required)  | a json array of json objects                               |
| "txid"         | (string, required)  | the transaction id                                         |
| "vout"         | (numeric, required) | the output number                                          |
| "addresses"    | (string, required)  | a json object with addresses as keys and amounts as values |
| "address"      | (numeric, required) | the key is the address, the value is the COIN amount       |

### Response

| Name | Type | Description | 
| ------------- | -------- | ------------------------------- |
| "transaction" | (string) | a hex string of the transaction |

#### :pushpin: Examples

Command:

```bash
./komodo-cli createrawtransaction '[{"txid":"9f44dc664882198b14e9a8c466d466efcdd070ccb6f57be8e2884aa11e7b2a30","vout":0}]' '{"RHCXHfXCZQpbUbihNHh5gTwfr7NXmJXmHi":0.01}'
```


<collapse-text hidden title="Response">


```bash
0100000001302a7b1ea14a88e2e87bf5b6cc70d0cdef66d466c4a8e9148b19824866dc449f0000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createrawtransaction", "params": [[{"txid":"9f44dc664882198b14e9a8c466d466efcdd070ccb6f57be8e2884aa11e7b2a30","vout":0}], {"RHCXHfXCZQpbUbihNHh5gTwfr7NXmJXmHi":0.01} ]}' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "0100000001302a7b1ea14a88e2e87bf5b6cc70d0cdef66d466c4a8e9148b19824866dc449f0000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## decoderawtransaction

**decoderawtransaction "hexstring"**

The `decoderawtransaction` method returns a json object representing the serialized, hex-encoded transaction.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | -------------------------- |
| "hex"     | (string, required) | the transaction hex string |

### Response

| Name | Type | Description | 
| ----------------------- | ---------------------------------------------- | ----------------------------------------------------------------- |
| "txid"                  | (string)                                       | the transaction id                                                |
| "overwintered"          | (boolean)                                      | the overwintered flag                                             |
| "version"               | (numeric)                                      | the version                                                       |
| "versiongroupid"        | (string, optional)                             | the version group id (overwintered txs)                           |
| "locktime"              | (numeric)                                      | the lock time                                                     |
| "expiryheight"          | (numeric, optional)                            | last valid block height for mining transaction (overwintered txs) |
| "vin" : [ ... ]         | (array of json objects)                        |
| "txid"                  | (string)                                       | the transaction id                                                |
| "vout" : [ ... ]        | (numeric)                                      | the output number                                                 |
| "scriptSig"             | (json object)                                  | the script                                                        |
| "asm"                   | (string)                                       | asm                                                               |
| "hex"                   | (string)                                       | hex                                                               |
| "sequence"              | (numeric)                                      | the script sequence number                                        |
| "vout"                  | (array of json objects)                        |
| "value"                 | (numeric)                                      | the value                                                         |
| "number"                | (numeric)                                      | index                                                             |
| "scriptPubKey"          | (json object)                                  |
| "asm"                   | (string)                                       | the asm                                                           |
| "hex"                   | (string)                                       | the hex                                                           |
| "reqSigs"               | (numeric)                                      | the required sigs                                                 |
| "type"                  | (string)                                       | the type, eg 'pubkeyhash'                                         |
| "addresses"             |                                                |
| "address"               | (string)                                       | the address                                                       |
| "vjoinsplit" : [ ... ]  | (array of json objects, only for version >= 2) |
| "vpub_old"              | (numeric)                                      | public input value                                                |
| "vpub_new"              | (numeric)                                      | public output value                                               |
| "anchor"                | (string)                                       | the anchor                                                        |
| "nullifiers" : [ ... ]  | (array of strings)                             |
| "hex"                   | (string)                                       | input note nullifier                                              |
| "commitments" : [ ... ] | (array of strings)                             |
| "hex"                   | (string)                                       | output note commitment                                            |
| "onetimePubKey"         | (string)                                       | the onetime public key used to encrypt the ciphertexts            |
| "randomSeed"            | (string)                                       | the random seed                                                   |
| "macs" : [ ... ]        | (array of strings)                             |
| "hex"                   | (string)                                       | input note MAC                                                    |
| "proof"                 | (string)                                       | the zero-knowledge proof                                          |
| "ciphertexts" : [ ... ] | (array of strings)                             |
| "hex"                   | (string)                                       | output note ciphertext                                            |

#### :pushpin: Examples

Command:

```bash
./komodo-cli decoderawtransaction "0100000001302a7b1ea14a88e2e87bf5b6cc70d0cdef66d466c4a8e9148b19824866dc449f0000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"
```


<collapse-text hidden title="Response">


```json
{
  "txid": "bdb537d0a0588eb63e696d5f6e5cdc7bda071fe39327c680f42e8c3af6719df1",
  "size": 85,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "9f44dc664882198b14e9a8c466d466efcdd070ccb6f57be8e2884aa11e7b2a30",
      "vout": 0,
      "scriptSig": {
        "asm": "",
        "hex": ""
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.01,
      "valueSat": 1000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 56def632e67aa11c25ac16a0ee52893c2e5a2b6a OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": ["RHCXHfXCZQpbUbihNHh5gTwfr7NXmJXmHi"]
      }
    }
  ],
  "vjoinsplit": []
}
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decoderawtransaction", "params": ["0100000001302a7b1ea14a88e2e87bf5b6cc70d0cdef66d466c4a8e9148b19824866dc449f0000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "txid": "bdb537d0a0588eb63e696d5f6e5cdc7bda071fe39327c680f42e8c3af6719df1",
    "size": 85,
    "version": 1,
    "locktime": 0,
    "vin": [
      {
        "txid": "9f44dc664882198b14e9a8c466d466efcdd070ccb6f57be8e2884aa11e7b2a30",
        "vout": 0,
        "scriptSig": {
          "asm": "",
          "hex": ""
        },
        "sequence": 4294967295
      }
    ],
    "vout": [
      {
        "value": 0.01,
        "valueSat": 1000000,
        "n": 0,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 56def632e67aa11c25ac16a0ee52893c2e5a2b6a OP_EQUALVERIFY OP_CHECKSIG",
          "hex": "76a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac",
          "reqSigs": 1,
          "type": "pubkeyhash",
          "addresses": ["RHCXHfXCZQpbUbihNHh5gTwfr7NXmJXmHi"]
        }
      }
    ],
    "vjoinsplit": []
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## decodescript

**decodescript "hex"**

The `decodescript` method decodes a hex-encoded script.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ---------------------- |
| "hex"     | (string) | the hex encoded script |

### Response

| Name | Type | Description | 
| -------------------- | ------------------ | ----------------------- |
| "asm"                | (string)           | the script public key       |
| "hex"                | (string)           | the hex-encoded public key  |
| "type"               | (string)           | the output type         |
| "reqSigs"            | (numeric)          | the required signatures |
| "addresses": [ ... ] | (array of strings) |
| "address"            | (string)           | the address             |
| "p2sh"               | (string)           | the script address          |

#### :pushpin: Examples

Command:

```bash
./komodo-cli decodescript "0100000001302a7b1ea14a88e2e87bf5b6cc70d0cdef66d466c4a8e9148b19824866dc449f0000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"
```


<collapse-text hidden title="Response">


```json
{
  "asm": "0 0 0 48 7b1ea14a88e2e87bf5b6cc70d0cdef66d466c4a8e9148b19824866dc449f0000000000ffffffff014042 00000000001976a91456def632e67a OP_LESSTHANOREQUAL [error]",
  "type": "nonstandard",
  "p2sh": "bQXGP7b2uRaWbMGkLaJat9LisWr8ZMGLbs"
}
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decodescript", "params": ["0100000001302a7b1ea14a88e2e87bf5b6cc70d0cdef66d466c4a8e9148b19824866dc449f0000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "asm": "0 0 0 48 7b1ea14a88e2e87bf5b6cc70d0cdef66d466c4a8e9148b19824866dc449f0000000000ffffffff014042 00000000001976a91456def632e67a OP_LESSTHANOREQUAL [error]",
    "type": "nonstandard",
    "p2sh": "bQXGP7b2uRaWbMGkLaJat9LisWr8ZMGLbs"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## fundrawtransaction

**fundrawtransaction "hexstring"**

The `fundrawtransaction` method adds inputs to a transaction until it has enough `in` value to meet its `out` value. This will not modify existing inputs, and will add one `change` output to the outputs.

::: tip
Inputs which were signed may need to be resigned after completion since in/outputs have been added. To sign the inputs added, use <b>signrawtransaction</b>.
:::

::: tip
This method comes from the BTC codebase, of which KMD is ultimately a fork (via Zcash). For full details, please see <a href="https://bitcoin.org/en/developer-reference#fundrawtransaction">the linked documentation</a>.
:::

### Arguments

| Name | Type | Description | 
| ----------- | ------------------ | ------------------------------------- |
| "hexstring" | (string, required) | the hex string of the raw transaction |

### Response

| Name | Type | Description | 
| ----------- | --------- | -------------------------------------------------- |
| "hex"       | (string)  | the resulting raw transaction (hex-encoded string) |
| "fee"       | (numeric) | the fee added to the transaction                   |
| "changepos" | (numeric) | the position of the added change output, or -1     |

#### :pushpin: Examples

Create a transaction with no inputs:

Command:

```bash
./komodo-cli createrawtransaction "[]" '{"RHCXHfXCZQpbUbihNHh5gTwfr7NXmJXmHi":0.01}'
```


<collapse-text hidden title="Response">


```bash
01000000000140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000
```

</collapse-text>


Add sufficient unsigned inputs to meet the output value:

Command:

```bash
./komodo-cli fundrawtransaction "rawtransactionhex"
```


<collapse-text hidden title="Response">


```json
{
  "hex": "01000000660aeb1fef3f0f6e8e9598a2f4b434466b5ccb95e49aa7c4286bc5392d43fa1f280000000000feffffff0d204965060600f1e79bfd183e7ee1b5b9b61c6379d6c95984cb7cdf79231c4c0000000000feffffff0d3eba8ce5b6b6ee7d2e804be57dbe4544d7b7169caf5afd6f207c1275e8977e0000000000feffffff04f8b24c1eb3aeb01cc483a5b6922eb341da17fd42c944b0bb18998c04fea67e0000000000feffffff0360b074597abb6e32c319078ea5f83cdfc85d5c892c0388893d8b66876c077b0000000000feffffff0e2ae757c446029f5dbea36926883744a2d3fe8ee05381c2b4311e7d58057fd40000000000feffffff149c5bbedff321a7810d5db264829ffa5529a4f29ca3a452b0543736339bf0260000000000feffffff1f9e6624bb5185f0b51d36a3a94982f0d8a325bdf81db90bf67945354a6f40c60000000000feffffff22e752f465434c0563a7e0b9d104b8633bdbd6073bbe61d17dee0d53ac8220430000000000feffffff2780816ab4fd0177dfff1a98b7783bbefe8d08f339c964d2438b7e73c8ce614c0000000000feffffff2da12ef31d8678120d4961c9090035ae9e8f48dcfe4e2f461fb10437473c2bc90000000000feffffff39a00efcf7f678ecf0252ee2b4998a43121aaad28abe518be06a830fd34ae24e0000000000feffffff3c5b78d98b3edf510b003cc5723270854313d51ad40859ba08a622f3a269a6690000000000feffffff3ca10423750150708e817fe0020a7fd0a687a0456158db659af112dfefefa2990000000000feffffff4005c2dd439c35e3f04384142b66871e15a72149218d66be2ca3b13f7e1604b00000000000feffffff408d53f3499c6db833b4a9b19aa8cf61c95182775a0539efef9c62a0456520c40000000000feffffff43671a7bd5f31ee1642842027378035d73b06d446fbb1666e95638eb0d55d1c90000000000feffffff45ee4a5c7a98f315d26c1020b26576500ecae4d6a6a78b3ad169788006e7c76c0000000000feffffff48244290df0dccc781e7d081c731081c2e7e022176cc7b4b31fd92c1e31d970e0000000000feffffff48c28c27f8303266e0547b8c453b9823baed7a9e06105c09ba4cf65cb2bd5d2b0000000000feffffff4b28d567f5933d5992559fb19f90115b145db32bd1b6e52d309021da8e6063cc0000000000feffffff4d45006be4acc1bf5c69722cb744b967e615d2d35014fc82cf61c2a4905717a50000000000feffffff4d8540fa9e580b140359e0a17aac6415ca80072f9ba26fc2b43914092f4702400000000000feffffff4ff26de89311f83d65a3936e06937f30a75dd50594246d910035bcbe19c0ea6a0000000000feffffff511e169a83c0c0f8ee7163c34fa0e3b024275892419f11a2bb96d4976d3f9b470000000000feffffff52325adf85f74f38f467bc3a99657f322988add8aebb371bd080088efb95836f0000000000feffffff532ff452f8423507348c542063deb6f257de711237ff8d718143358128e2c6470000000000feffffff5b0d6fe54dce0515e6947f5170478cabb06d1e855365a6b7dbb0118c4450ff0b0000000000feffffff5b7db5b32a8e8e8c6307a7d0afec7062637eec39670f1afb08f0b04a50fbc4740000000000feffffff5cbecf874fd1996cd4e49cd41c98a586c533eac1ebc37df92cf5a9545203f9350000000000feffffff5d015b907e23b9c5e00907013f66d258fab2f016842f0c8e69346d72b0221dd70000000000feffffff65c461a04f571b50ab4fe3e367952bfba755eec9b6ed23cb460ab3bdc873fff80000000000feffffff686da3cbb1a1af26c2c01793345a5fb8ee47829aa907ab95b8144fbeda1707920000000000feffffff6896423421d7e1193a7b88d2fbf1eef1c46f637e7a49217c171a18852d29e8d60000000000feffffff6a0f6f77ae1d42dc96c39c620f401f32c9774f18f1a039e97b4b405b8aaa757d0000000000feffffff6cfa0bcd2e2689498496dc4b15feb0fc535667a88005f2c88198265bb1f8f3d80000000000feffffff705456a54cb0b94ec15890bd957dd778581f606270a331ad5b15ef48684a5fc40000000000feffffff718076a7dd771121e817b98e98f46c7f52722d6cdfca9130203fe5965f0a3c000000000000feffffff780ed86aeead9747bc96bf7053b02ada6ac566481763e70c29d3d00162bc7b530000000000feffffff7b3ad2352be9169286629dcf064fa769c23a8aabd468c30eec35a0c79b61f1f80000000000feffffff7fc4676bc415a467bd10d303eacd54617acfb6876945e3bf1217dfd208c6d58d0000000000feffffff80fe96eb05e5fcf89fa7e19b1a653e0b8164cba383e2d2ff5934a61c42698cb10000000000feffffff875ea454109c4725766d372f0fe395dd4744737378b3a246094dc0db7fb6e95f0000000000feffffff87b7c1fd810834fdd892975a795b9e6c1b1aa398436ae3ecb19bce62ac11aa4e0000000000feffffff88b22fca9de29db1901e9c8accbf1caf8fd4d5a37802b3bf5142038809ee3c690000000000feffffff89e4b0f44e022cf53736520aef84a324100f19f4f0862c9d2150b686e951d3740000000000feffffff8e0611807aa639621ca6be13a2eda8d98c32867041f929dbbef7742c7c867db00000000000feffffff8e77d64182b666e50377b3c9a39395735a89d2c90f5ff62024143f2c25ea51d50000000000feffffff8fe0b55ad0e150fbfe8d263c44527b967c44fd79ebbe88a09a91a4318f1c17c40000000000feffffff91ad86b51f541d480383681c4faa26575f723154ed6e39cb76e03317c8984c610000000000feffffff927673288f7c95f452e035b65c8cd46a57e58451b93dcfecfae0c33f00b4e5350000000000feffffff9477cc8e7dddfa7d183bfe0771def3778e7b2641996a3ea52f42d085d4007d190000000000feffffff948a1e5af04f265b29fd23700d1ac9926b5bed71ed5b2968f29abaa15036848c0000000000feffffff98a1cd6c74d9d42f88032e74182cfe8e71f125eb7eb1b49e8334d5b17bf4d07e0000000000feffffff9a7fefd1b1409dfc23d6be09dab5692cd9f6c59c98b2d7b0231f40b396999c2b0000000000feffffff9b0ed42c0446f8ea3c19b47be97f42d1a546bbd6a5a311cded5c1dd16c3606d40000000000feffffff9ba78bb678f5b7a289ca37b49835bc6ad383e2089dd3711833383c0c6e6d40cb0000000000feffffff9d2bdc85ec46fb0457dd41f02f5f7b203ff8c844062f3376c7f86cf2144dc6a60000000000feffffff9dc64c498135ebd6c025d7d43ae71120d6477bcbcd9828aebe21911ea21655c80000000000feffffffa0c3203666c02ea6f958408c8f2241b4d6e3a8beb9ab54736fe73621feb57ce40000000000feffffffa14e8b18777a8710e58942b56d094243151299f033cc21bb3ad3dfce2b3e77ad0000000000feffffffa262a97a28944d41d47c7f8788528c797d322f7abc0390c20bf22e3b835e127a0000000000feffffffaa3c2496b8237d865f81ff0bb8eb01bf2b69ee806463816ec83b60cace7a58330000000000feffffffabfc5cf05834234e1ee8a3c87c8de5d6a07f9530a09f2b34d9303ef30d8646cf0000000000feffffffa2d1512943366ab64e6d1749b81f993e830e5b546a87b9bd68fe0c5c865da9530100000000feffffffad976a10bc9ebe391cee6b83191520a9d0fb62a24e969477a4cc6dd26b29e4da0000000000feffffffadd486a6d94629b19713d723301b135c11af92b5ed69e6f0b9ed07d417078b240000000000feffffffb04574d6517ca90a26e07a749ebcde23f67f7ef8a594b23e699fa084529d96e80000000000feffffffb2197245ddc53b189c18d05d167210fd6291c6b9116862144c3654da5bb55d060000000000feffffffb4b953583df750085d727027674f69c6ba63513915941e42924a462d5bc15c9b0000000000feffffffb7f5149ac38efb591ad8c3a46ec9e979d5647c964190a135342435b55484dd570000000000feffffffbfc02225e0c5351bbeb63adb8e3b7859752363a5b85f5b2a6da5240a449e80650000000000feffffffc0def09bb3cbf791c52764cceadd389199be9d7603cc3d6d213ba45ffc98518d0000000000feffffffc5c9957c3a3e03204e603c313368d3c01206320beddfd28b850fd17b09a61a410000000000feffffffc64396e634d716a5ae280d9fd821507239d7b25a812eea6751254e462c8a73a50000000000feffffffc69c9cdd6825a657be1a06008f73b78cf185a9d195ba771451ca1ec09ce54d4f0000000000feffffffca6112fdc1db1a441961f6eb62b492c1397732cc5519d40f6aa335612f42d39c0000000000feffffffcb15dbc245dec1ef8cb8e25ef11921ca804c023e6ad803ebcb2a7b98380b60b30000000000feffffffcfe47e6ce0780c4594a2d1b76a2906c0a9ea32d39a73c244aa9d5d8dea67248c0000000000feffffffd0a4d502c22cea7da0d1a3cf99aef598b74fad19a6de35f21c6fd0d1b8cf27560000000000feffffffd25452b8575cafca10255179f95c8c66e255329220b7ff645af522af7b8038320000000000feffffffd3922dfd1a65216bbcd4646d0cbcfa70cfe587775cf4c673043c57061f48d7630000000000feffffffd75c777645d534009bc8e7b2c0b58a78cd63f41f47f6cd30868aeaf9b55e47700000000000feffffffd8f837530faf0d9b50efe1d79aed453b11916d565a2b9c40a380a85f0be2af6b0000000000feffffffdbce76e284668c829366dafd00ae4884ea39b2aa597cc1b4d2a37991a9b2ea560000000000feffffffe481d9493d67997104c12972b7c8a73fb87b16e228665bb784436fc0f58d7e660000000000feffffffe7a22d3d87255e4adaab9a6fd8a72320299a6902426424aa8b2b89b7c3b0c0950000000000feffffffe80ac9635b6bd91c1935eca6df80876ac8cdc87a2b91e925cfdcc0f06059b2e50000000000feffffffedad3357a1a9aeeb8c2771cc6f284db92a2aa31f458e35bb270216015bb0edd40000000000feffffffee85afefc31a99a4616bfb228e1f48691976b900ecdfe838e1310bf5b33fadcf0000000000fefffffff13e4784de0564595f3b4cce57ec0d8a4b72a798feb65f5fbca5b26a3a91d0760000000000fefffffff205212771fd3ca5a68340fa307810e44315ae02464b5d8a235ba6bca691bd710000000000fefffffff31cea9351fddc36393fa996962e204c461a34ff1c6ad243b3a4902440f165da0000000000fefffffff3c67e78777cc42ae2834bcf5dce5493fbcfcc6e0aabd7608cf4f9c936a37f490000000000fefffffff3ddc14df664f6e4f59b1f1e25241a61fc69f13125ea5a67edbd03b37d332eb50000000000fefffffff614bd5d83278ad95d8c5bf6fefe59b3675e832cc1c2349d7952aa734fd202830000000000fefffffff67ef42d75fc5d36ff32ab40f5c9f88f279a1173ee1db227a4706aa0480d66ab0000000000fefffffff69f0798ab6de485dcfe72391f4cbb1e5f4d39ee8f852b80fd4bb730eabd8e930000000000fefffffff8dd75e7c674cf7bf15f42fcb1256ef4f16b96e0ff6a359bc24c07ba734f09a30000000000fefffffffa0c47583d4c6f18e12b93764ccf57d2430a52bdd0ceb611924a79c82daf48b90000000000fefffffffa5ca0440f302bcf118946714dba6e81036e48477ff3a315084fe682aea6d1d50000000000fefffffffef369694bf0493161762e49d7ca16f1ba600250d801a848d0ca8d3f2d677d4a0000000000feffffff02c5490f00000000001976a9146843838a0aa11686cd0c01fbf470c9c5f302249488ac40420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000",
  "changepos": 0,
  "fee": 0.0001174
}
```

</collapse-text>


Sign the transaction:

Command:

```bash
./komodo-cli signrawtransaction "01000000660aeb1fef3f0f6e8e9598a2f4b434466b5ccb95e49aa7c4286bc5392d43fa1f280000000000feffffff0d204965060600f1e79bfd183e7ee1b5b9b61c6379d6c95984cb7cdf79231c4c0000000000feffffff0d3eba8ce5b6b6ee7d2e804be57dbe4544d7b7169caf5afd6f207c1275e8977e0000000000feffffff04f8b24c1eb3aeb01cc483a5b6922eb341da17fd42c944b0bb18998c04fea67e0000000000feffffff0360b074597abb6e32c319078ea5f83cdfc85d5c892c0388893d8b66876c077b0000000000feffffff0e2ae757c446029f5dbea36926883744a2d3fe8ee05381c2b4311e7d58057fd40000000000feffffff149c5bbedff321a7810d5db264829ffa5529a4f29ca3a452b0543736339bf0260000000000feffffff1f9e6624bb5185f0b51d36a3a94982f0d8a325bdf81db90bf67945354a6f40c60000000000feffffff22e752f465434c0563a7e0b9d104b8633bdbd6073bbe61d17dee0d53ac8220430000000000feffffff2780816ab4fd0177dfff1a98b7783bbefe8d08f339c964d2438b7e73c8ce614c0000000000feffffff2da12ef31d8678120d4961c9090035ae9e8f48dcfe4e2f461fb10437473c2bc90000000000feffffff39a00efcf7f678ecf0252ee2b4998a43121aaad28abe518be06a830fd34ae24e0000000000feffffff3c5b78d98b3edf510b003cc5723270854313d51ad40859ba08a622f3a269a6690000000000feffffff3ca10423750150708e817fe0020a7fd0a687a0456158db659af112dfefefa2990000000000feffffff4005c2dd439c35e3f04384142b66871e15a72149218d66be2ca3b13f7e1604b00000000000feffffff408d53f3499c6db833b4a9b19aa8cf61c95182775a0539efef9c62a0456520c40000000000feffffff43671a7bd5f31ee1642842027378035d73b06d446fbb1666e95638eb0d55d1c90000000000feffffff45ee4a5c7a98f315d26c1020b26576500ecae4d6a6a78b3ad169788006e7c76c0000000000feffffff48244290df0dccc781e7d081c731081c2e7e022176cc7b4b31fd92c1e31d970e0000000000feffffff48c28c27f8303266e0547b8c453b9823baed7a9e06105c09ba4cf65cb2bd5d2b0000000000feffffff4b28d567f5933d5992559fb19f90115b145db32bd1b6e52d309021da8e6063cc0000000000feffffff4d45006be4acc1bf5c69722cb744b967e615d2d35014fc82cf61c2a4905717a50000000000feffffff4d8540fa9e580b140359e0a17aac6415ca80072f9ba26fc2b43914092f4702400000000000feffffff4ff26de89311f83d65a3936e06937f30a75dd50594246d910035bcbe19c0ea6a0000000000feffffff511e169a83c0c0f8ee7163c34fa0e3b024275892419f11a2bb96d4976d3f9b470000000000feffffff52325adf85f74f38f467bc3a99657f322988add8aebb371bd080088efb95836f0000000000feffffff532ff452f8423507348c542063deb6f257de711237ff8d718143358128e2c6470000000000feffffff5b0d6fe54dce0515e6947f5170478cabb06d1e855365a6b7dbb0118c4450ff0b0000000000feffffff5b7db5b32a8e8e8c6307a7d0afec7062637eec39670f1afb08f0b04a50fbc4740000000000feffffff5cbecf874fd1996cd4e49cd41c98a586c533eac1ebc37df92cf5a9545203f9350000000000feffffff5d015b907e23b9c5e00907013f66d258fab2f016842f0c8e69346d72b0221dd70000000000feffffff65c461a04f571b50ab4fe3e367952bfba755eec9b6ed23cb460ab3bdc873fff80000000000feffffff686da3cbb1a1af26c2c01793345a5fb8ee47829aa907ab95b8144fbeda1707920000000000feffffff6896423421d7e1193a7b88d2fbf1eef1c46f637e7a49217c171a18852d29e8d60000000000feffffff6a0f6f77ae1d42dc96c39c620f401f32c9774f18f1a039e97b4b405b8aaa757d0000000000feffffff6cfa0bcd2e2689498496dc4b15feb0fc535667a88005f2c88198265bb1f8f3d80000000000feffffff705456a54cb0b94ec15890bd957dd778581f606270a331ad5b15ef48684a5fc40000000000feffffff718076a7dd771121e817b98e98f46c7f52722d6cdfca9130203fe5965f0a3c000000000000feffffff780ed86aeead9747bc96bf7053b02ada6ac566481763e70c29d3d00162bc7b530000000000feffffff7b3ad2352be9169286629dcf064fa769c23a8aabd468c30eec35a0c79b61f1f80000000000feffffff7fc4676bc415a467bd10d303eacd54617acfb6876945e3bf1217dfd208c6d58d0000000000feffffff80fe96eb05e5fcf89fa7e19b1a653e0b8164cba383e2d2ff5934a61c42698cb10000000000feffffff875ea454109c4725766d372f0fe395dd4744737378b3a246094dc0db7fb6e95f0000000000feffffff87b7c1fd810834fdd892975a795b9e6c1b1aa398436ae3ecb19bce62ac11aa4e0000000000feffffff88b22fca9de29db1901e9c8accbf1caf8fd4d5a37802b3bf5142038809ee3c690000000000feffffff89e4b0f44e022cf53736520aef84a324100f19f4f0862c9d2150b686e951d3740000000000feffffff8e0611807aa639621ca6be13a2eda8d98c32867041f929dbbef7742c7c867db00000000000feffffff8e77d64182b666e50377b3c9a39395735a89d2c90f5ff62024143f2c25ea51d50000000000feffffff8fe0b55ad0e150fbfe8d263c44527b967c44fd79ebbe88a09a91a4318f1c17c40000000000feffffff91ad86b51f541d480383681c4faa26575f723154ed6e39cb76e03317c8984c610000000000feffffff927673288f7c95f452e035b65c8cd46a57e58451b93dcfecfae0c33f00b4e5350000000000feffffff9477cc8e7dddfa7d183bfe0771def3778e7b2641996a3ea52f42d085d4007d190000000000feffffff948a1e5af04f265b29fd23700d1ac9926b5bed71ed5b2968f29abaa15036848c0000000000feffffff98a1cd6c74d9d42f88032e74182cfe8e71f125eb7eb1b49e8334d5b17bf4d07e0000000000feffffff9a7fefd1b1409dfc23d6be09dab5692cd9f6c59c98b2d7b0231f40b396999c2b0000000000feffffff9b0ed42c0446f8ea3c19b47be97f42d1a546bbd6a5a311cded5c1dd16c3606d40000000000feffffff9ba78bb678f5b7a289ca37b49835bc6ad383e2089dd3711833383c0c6e6d40cb0000000000feffffff9d2bdc85ec46fb0457dd41f02f5f7b203ff8c844062f3376c7f86cf2144dc6a60000000000feffffff9dc64c498135ebd6c025d7d43ae71120d6477bcbcd9828aebe21911ea21655c80000000000feffffffa0c3203666c02ea6f958408c8f2241b4d6e3a8beb9ab54736fe73621feb57ce40000000000feffffffa14e8b18777a8710e58942b56d094243151299f033cc21bb3ad3dfce2b3e77ad0000000000feffffffa262a97a28944d41d47c7f8788528c797d322f7abc0390c20bf22e3b835e127a0000000000feffffffaa3c2496b8237d865f81ff0bb8eb01bf2b69ee806463816ec83b60cace7a58330000000000feffffffabfc5cf05834234e1ee8a3c87c8de5d6a07f9530a09f2b34d9303ef30d8646cf0000000000feffffffa2d1512943366ab64e6d1749b81f993e830e5b546a87b9bd68fe0c5c865da9530100000000feffffffad976a10bc9ebe391cee6b83191520a9d0fb62a24e969477a4cc6dd26b29e4da0000000000feffffffadd486a6d94629b19713d723301b135c11af92b5ed69e6f0b9ed07d417078b240000000000feffffffb04574d6517ca90a26e07a749ebcde23f67f7ef8a594b23e699fa084529d96e80000000000feffffffb2197245ddc53b189c18d05d167210fd6291c6b9116862144c3654da5bb55d060000000000feffffffb4b953583df750085d727027674f69c6ba63513915941e42924a462d5bc15c9b0000000000feffffffb7f5149ac38efb591ad8c3a46ec9e979d5647c964190a135342435b55484dd570000000000feffffffbfc02225e0c5351bbeb63adb8e3b7859752363a5b85f5b2a6da5240a449e80650000000000feffffffc0def09bb3cbf791c52764cceadd389199be9d7603cc3d6d213ba45ffc98518d0000000000feffffffc5c9957c3a3e03204e603c313368d3c01206320beddfd28b850fd17b09a61a410000000000feffffffc64396e634d716a5ae280d9fd821507239d7b25a812eea6751254e462c8a73a50000000000feffffffc69c9cdd6825a657be1a06008f73b78cf185a9d195ba771451ca1ec09ce54d4f0000000000feffffffca6112fdc1db1a441961f6eb62b492c1397732cc5519d40f6aa335612f42d39c0000000000feffffffcb15dbc245dec1ef8cb8e25ef11921ca804c023e6ad803ebcb2a7b98380b60b30000000000feffffffcfe47e6ce0780c4594a2d1b76a2906c0a9ea32d39a73c244aa9d5d8dea67248c0000000000feffffffd0a4d502c22cea7da0d1a3cf99aef598b74fad19a6de35f21c6fd0d1b8cf27560000000000feffffffd25452b8575cafca10255179f95c8c66e255329220b7ff645af522af7b8038320000000000feffffffd3922dfd1a65216bbcd4646d0cbcfa70cfe587775cf4c673043c57061f48d7630000000000feffffffd75c777645d534009bc8e7b2c0b58a78cd63f41f47f6cd30868aeaf9b55e47700000000000feffffffd8f837530faf0d9b50efe1d79aed453b11916d565a2b9c40a380a85f0be2af6b0000000000feffffffdbce76e284668c829366dafd00ae4884ea39b2aa597cc1b4d2a37991a9b2ea560000000000feffffffe481d9493d67997104c12972b7c8a73fb87b16e228665bb784436fc0f58d7e660000000000feffffffe7a22d3d87255e4adaab9a6fd8a72320299a6902426424aa8b2b89b7c3b0c0950000000000feffffffe80ac9635b6bd91c1935eca6df80876ac8cdc87a2b91e925cfdcc0f06059b2e50000000000feffffffedad3357a1a9aeeb8c2771cc6f284db92a2aa31f458e35bb270216015bb0edd40000000000feffffffee85afefc31a99a4616bfb228e1f48691976b900ecdfe838e1310bf5b33fadcf0000000000fefffffff13e4784de0564595f3b4cce57ec0d8a4b72a798feb65f5fbca5b26a3a91d0760000000000fefffffff205212771fd3ca5a68340fa307810e44315ae02464b5d8a235ba6bca691bd710000000000fefffffff31cea9351fddc36393fa996962e204c461a34ff1c6ad243b3a4902440f165da0000000000fefffffff3c67e78777cc42ae2834bcf5dce5493fbcfcc6e0aabd7608cf4f9c936a37f490000000000fefffffff3ddc14df664f6e4f59b1f1e25241a61fc69f13125ea5a67edbd03b37d332eb50000000000fefffffff614bd5d83278ad95d8c5bf6fefe59b3675e832cc1c2349d7952aa734fd202830000000000fefffffff67ef42d75fc5d36ff32ab40f5c9f88f279a1173ee1db227a4706aa0480d66ab0000000000fefffffff69f0798ab6de485dcfe72391f4cbb1e5f4d39ee8f852b80fd4bb730eabd8e930000000000fefffffff8dd75e7c674cf7bf15f42fcb1256ef4f16b96e0ff6a359bc24c07ba734f09a30000000000fefffffffa0c47583d4c6f18e12b93764ccf57d2430a52bdd0ceb611924a79c82daf48b90000000000fefffffffa5ca0440f302bcf118946714dba6e81036e48477ff3a315084fe682aea6d1d50000000000fefffffffef369694bf0493161762e49d7ca16f1ba600250d801a848d0ca8d3f2d677d4a0000000000feffffff02c5490f00000000001976a9146843838a0aa11686cd0c01fbf470c9c5f302249488ac40420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"
```


<collapse-text hidden title="Response">


```json
{
  "hex": "01000000660aeb1fef3f0f6e8e9598a2f4b434466b5ccb95e49aa7c4286bc5392d43fa1f2800000000484730440220234b370cddf91b27e172cb5d6257a9807e63cf680a644229147b39d87e597875022047a58509a11b190107a9ff6e08143bd0d450db233518ed26f123bd739576e9c201feffffff0d204965060600f1e79bfd183e7ee1b5b9b61c6379d6c95984cb7cdf79231c4c000000004847304402202ffed5ef972b01ec4290343ab0bc4cff989d0047f2cbc9e8b69f0f3102824c0e02203c7e3214344e6ac430e4f996a8980e7d9172ea1e8c0c238ba32b8930f4d4119301feffffff0d3eba8ce5b6b6ee7d2e804be57dbe4544d7b7169caf5afd6f207c1275e8977e00000000484730440220096fdd062535f200897de2f2dfb7d782499dc5fc24d8e06805eebed6ec125c07022077e4379409bd7c9052608e8cd52cd83b0c9314c623d9b85012eab28e10f8c13601feffffff04f8b24c1eb3aeb01cc483a5b6922eb341da17fd42c944b0bb18998c04fea67e000000004847304402204a8f45abf51333ec7c4491cd5750e5d46785475ebdb0a13a6a946711f17483a9022075805ee9f2130c3938e273c280b6b14b27640349b537b55348c40ede1508938f01feffffff0360b074597abb6e32c319078ea5f83cdfc85d5c892c0388893d8b66876c077b000000004948304502210089c7919c6e7412a1569434f74caf7110bbb0341361384067265c142c8e033b2d02203d5eaa583d727fad487bbb689bf433bac32d907e707043e8f96f8c50fd3480d501feffffff0e2ae757c446029f5dbea36926883744a2d3fe8ee05381c2b4311e7d58057fd40000000049483045022100a0672d882511b01696192965175f3827e65ef8d45b3217b563d0f97f3cab512602205c568b5c1eda0c149976380b38d2f93ee384500bb5eecf6e9f3f2101d649eace01feffffff149c5bbedff321a7810d5db264829ffa5529a4f29ca3a452b0543736339bf0260000000049483045022100981f7f5210e17e1c73fe5083ca7b29a5b1a9dfbbf5474c109069a4b3eecbb5c5022065e21331260c718788b72902da250418b0091537a540e8f6152ae097632637da01feffffff1f9e6624bb5185f0b51d36a3a94982f0d8a325bdf81db90bf67945354a6f40c6000000004847304402204391d39a88d2f8427396bbbca508bcdb3b6897c25bee4c68d357b878419285a602205da8f54aec5bb9253aeaa9b4c4a1a8a2fe602e894422da0279f21f9799a3540201feffffff22e752f465434c0563a7e0b9d104b8633bdbd6073bbe61d17dee0d53ac8220430000000049483045022100d5a4b70ce4542e30a7cfb09ea259405ee202f99b556c88604b06a86419b2e72602202417376668f93e44b404ec2bfe6e797b699367604de296377dfc6944afce722901feffffff2780816ab4fd0177dfff1a98b7783bbefe8d08f339c964d2438b7e73c8ce614c00000000494830450221009d1878ce69f3a438748bcc73de00d531492cd36d2bf7a292bc5bbf67fcf6c774022066e1705510ed5a5177e78a71ba9891d69e11a7a3bc28599d5d18c29c2033a00e01feffffff2da12ef31d8678120d4961c9090035ae9e8f48dcfe4e2f461fb10437473c2bc90000000049483045022100fe0f6284ddb97b4595d77cf7ad5ef4f5caa67cb7c4b6e6ee9812bac076787377022032991f85e1962140673af04a85a442bca3df931ca52c365d3cf24e79b782b2d101feffffff39a00efcf7f678ecf0252ee2b4998a43121aaad28abe518be06a830fd34ae24e0000000048473044022038759690b62c95f80a54d3bde28abdf7dddae992ee4a18c511a4d442da67d758022016aa7dba3da26aa7531731222a0f66cec25c5026cc4903b51dd3fe5483af4cc401feffffff3c5b78d98b3edf510b003cc5723270854313d51ad40859ba08a622f3a269a66900000000484730440220141e545e4ea0c27a630972d474b7d95dd2c9da1a129a7e680016e4ad70c5579102207a3384d8c988bfa526bea0f7cebfb8a8d81ae4b7272d23e83268791fc8eba2bf01feffffff3ca10423750150708e817fe0020a7fd0a687a0456158db659af112dfefefa299000000004847304402205c4e4f8934cea71191f87208bbbaae36b2b3ac4f7282256cc05446cdd1ccc0980220038db0a46e2b06fd61acdf1b47a5de87b787a62a1b65db823c904efa6223129b01feffffff4005c2dd439c35e3f04384142b66871e15a72149218d66be2ca3b13f7e1604b0000000004847304402206b8854445fdb689929143c8daf33fa52ddee06c360073f6262ffea4db0b8b71102200b4d7a166bfa81e8f2570afcd9de338b9a0d7bc72a3962c775205933690f302901feffffff408d53f3499c6db833b4a9b19aa8cf61c95182775a0539efef9c62a0456520c40000000049483045022100c1f028354c1034e61d59999070a8ab554a97f81583d72f38c0f6b0b7a52fe8ab0220538d6fec3f35a595614602203b360730b2f13c3bd879fdadca06dd8a16b90b9d01feffffff43671a7bd5f31ee1642842027378035d73b06d446fbb1666e95638eb0d55d1c9000000004847304402203fc7529cc7a96726728a4aa6a1698fc31bad94d1eadda2a0f74ea8f22d752869022011983a3c457e5c7ffc87b576d877e6f02ab8e08dbda6a94dfbf245315a3365e201feffffff45ee4a5c7a98f315d26c1020b26576500ecae4d6a6a78b3ad169788006e7c76c000000004847304402207a60671e1d0cd3d5d7b8eb2a1b53a0014f30de45f0e379a30435a47e7f9861eb0220689af75a99876c1d1d206869dca223806c45ad64f32cc08cd624936ec6c0600f01feffffff48244290df0dccc781e7d081c731081c2e7e022176cc7b4b31fd92c1e31d970e000000004847304402201972bc346632bcd5166cecbd9d7ca29583c7ad938640d7db9f4bdc6629fff086022019135d7341ef96813a839c6cc14f47c7d2e42c262abbe8747e16c6869cf2b90a01feffffff48c28c27f8303266e0547b8c453b9823baed7a9e06105c09ba4cf65cb2bd5d2b000000004847304402205e40a09a37c939cfa6b5143a2ce596452ecbbd223400922b0001bda694f4c63602205aad66d989167c9bbca130aa489de6286390e55f9e9ef4c5c043c2f13377c7c701feffffff4b28d567f5933d5992559fb19f90115b145db32bd1b6e52d309021da8e6063cc0000000049483045022100ceb282925d7eac742085d5ac48443e9af8b72873fb7a2f96b4e196a58a4b29d7022074790a63adec4088a5d5c2bf1fa80597be0e17afc7490620163a873a2ef1855d01feffffff4d45006be4acc1bf5c69722cb744b967e615d2d35014fc82cf61c2a4905717a50000000049483045022100c6f42ccf0af44182e144aa925b631cab8d90959fa96eb0453335a970e74910d402205e99e1f1d23813e336a3c96efd6e75490f3b5d807f0f2bbc677499cc0b92f47a01feffffff4d8540fa9e580b140359e0a17aac6415ca80072f9ba26fc2b43914092f4702400000000049483045022100b42e72fdb23f4f50af0222d5e590bcc676d60858583dffc1ba8b35730e1c8eb102207cc50ecd38639100131b4c4950cedaac4c4ee37c7a6f87d3ed7fb7eb165559c101feffffff4ff26de89311f83d65a3936e06937f30a75dd50594246d910035bcbe19c0ea6a00000000484730440220425c41bc88fce16ba54f2611a54737d9b5197abc541c730711157b290486cdc6022003f967d0f98864249d80720c65e04c475cbc12c482104aa7e45a06bc9eb080b901feffffff511e169a83c0c0f8ee7163c34fa0e3b024275892419f11a2bb96d4976d3f9b4700000000484730440220136e776a7bfe3fdb5a5b8db2783452ed7cf1fe3c89ec001ed69455a082337e49022057e7dc0ace7ae100a2f2c26291cfe80352b34dfd9269d07468ee2dfba13fc02001feffffff52325adf85f74f38f467bc3a99657f322988add8aebb371bd080088efb95836f000000004847304402201fafc46f92d80a9b4f71a15113ae8e8182dcaa09cff63645db5b858044f329730220160082cc1a3bb262458a204040c3ecc23b276c4558ea095c1b66e20a4004e26b01feffffff532ff452f8423507348c542063deb6f257de711237ff8d718143358128e2c6470000000049483045022100d8dfe5557eae68e8b3da5cc787b14e85fb4d10d2c8a80eda12e69b807319ff9902200b104ae561f1d9c4f0c1646327686f890aed1ea8fb1c1b411f07059517737d0001feffffff5b0d6fe54dce0515e6947f5170478cabb06d1e855365a6b7dbb0118c4450ff0b000000004847304402207fad37e344180882f9cfa3e36d036282a91467ff15fca2f24278f5fa5283b99d0220325dda0a7c35a85cb617bcac369ec0033023c221771cf02f1f877f693f1059d901feffffff5b7db5b32a8e8e8c6307a7d0afec7062637eec39670f1afb08f0b04a50fbc47400000000484730440220752cc9659edbddc78293b1947f84d2bd69e32ef4d5425d4e55df4ca74a7a962402203a755152ab6d38a7ba91f26f476d611cd9c6b27167d6e20b511c4830038d102c01feffffff5cbecf874fd1996cd4e49cd41c98a586c533eac1ebc37df92cf5a9545203f935000000004847304402203af4f03cfed41a4d8387a0859324ce3c40c953582e8848867d06d3aef096deba0220104c18b2e243cf7f076d2833c4fac30e0f5e62b58bc039cba6ce7fe47ea394a101feffffff5d015b907e23b9c5e00907013f66d258fab2f016842f0c8e69346d72b0221dd70000000049483045022100bc3e1c873f25e1a661ef81c109de1758ab13df3fc591540658c5fc05bb1e8c150220309b87661ce039899d5be3b510fcdbb9464ff8cb47af06c016390d79daa7029c01feffffff65c461a04f571b50ab4fe3e367952bfba755eec9b6ed23cb460ab3bdc873fff80000000048473044022037b231fec860afbac51e3034e1308e1873d87dc586258ad8c7ede04cf0fab97e022012eceff07cf09a2c3d2f6884ee885ff9f8e7526de8c08b54e5e538ab223bb31b01feffffff686da3cbb1a1af26c2c01793345a5fb8ee47829aa907ab95b8144fbeda1707920000000049483045022100a0d89b8331105f34528f2c9687f53897a2a14f57cde1390513b4d0fda530a4200220573800bfa5cba98af2a08fa3e87fd0142fe1db6f391a4d160f70565b1078210d01feffffff6896423421d7e1193a7b88d2fbf1eef1c46f637e7a49217c171a18852d29e8d60000000049483045022100cde87af1eb614761149aef298153c541e24ff45345f99dbef18bf2379d27f347022063115fb6b37842eb7cc4d8910ccd047635a9674e72d9418894614014c19d583a01feffffff6a0f6f77ae1d42dc96c39c620f401f32c9774f18f1a039e97b4b405b8aaa757d0000000049483045022100a82d1afe573bfaf0668b3acbec55f68bcbb58bed7b806d59837c32f3560cd1d70220198904866e0bd9d19cc465cf09e256c439ad5309caffa347b8c416443ed07a0c01feffffff6cfa0bcd2e2689498496dc4b15feb0fc535667a88005f2c88198265bb1f8f3d8000000004847304402207917043acb4879438625ace42109cc1bee16054222473d2f975b3edf27286f3602207413e93cf5e696de7c0d210dfa70cd4dd9e62e78ed86a3d99682ef8ea5c064cd01feffffff705456a54cb0b94ec15890bd957dd778581f606270a331ad5b15ef48684a5fc4000000004847304402206668503174e874bc09d999d7bc47f82a5ac47c3f1bc1c43ffa1cca74c1cde4410220616df31f268371b61d83acdfd394a7bcd8da5817174faa29b51c648786c5405a01feffffff718076a7dd771121e817b98e98f46c7f52722d6cdfca9130203fe5965f0a3c00000000004847304402200f1c2ef04cf5fceacb53724360ce3af3794d14ef8a47d4d09c8e3b95b20e48770220659021ba00a68e5f2f4053ec904cc7e65b5bd5db76ff45a9be4ba35ad1a2d0a201feffffff780ed86aeead9747bc96bf7053b02ada6ac566481763e70c29d3d00162bc7b530000000048473044022027f04c7d149ed6c9c72ce3956917444cb5f943aa95adb694ec30ef53c930cfe202206dc14b5f1d59b6724fea484501e36fe7bf40849614921cf76130ec20665f35d401feffffff7b3ad2352be9169286629dcf064fa769c23a8aabd468c30eec35a0c79b61f1f80000000049483045022100c4a61d02e54b0c0b8a9749d394d6447326bf66f3524388b8854c5585ad71704702200b0e71e178082df01e66d0bb72aad0238b0063018cae190c2f21c0fbd78a462001feffffff7fc4676bc415a467bd10d303eacd54617acfb6876945e3bf1217dfd208c6d58d0000000048473044022064ab0c92b7cb2205f1d7af0a2faa441eac041cbb892b166b8f1f060019301546022066924807801b03876a0ac1830eb355ed26c7a67b9e28fcb0b3c6dc5d3c8ca1db01feffffff80fe96eb05e5fcf89fa7e19b1a653e0b8164cba383e2d2ff5934a61c42698cb100000000484730440220515b9c588036449b326ab8d74679cf65c7fe780a03b23ba8428cf829a070abd402204c71e343cfe18e166b7259509b47dcbec0b5b29a764e4dbd29a39479ef60d34601feffffff875ea454109c4725766d372f0fe395dd4744737378b3a246094dc0db7fb6e95f0000000048473044022039167229a3f6ece80aebdfb425608c855989a0e7934abe0c4fca1175f60d46b5022069f57fb057a537cd95e5ebd6a93709e0bffde3d05bd01322f08d0fecef7c061f01feffffff87b7c1fd810834fdd892975a795b9e6c1b1aa398436ae3ecb19bce62ac11aa4e0000000049483045022100ab701a93c793c182bd54f06f80de91c03e36fa9b33b220a91d028f2196d329b5022020e23cff44abe2510b50ce0a8cab286d3ae17c59d8aebd20b42613b764a128c801feffffff88b22fca9de29db1901e9c8accbf1caf8fd4d5a37802b3bf5142038809ee3c6900000000494830450221008ade6fbaec28bf02b3914ffc62c4e0dd7da3d50b41b1054653826a38573e6c13022032d2528595fad675d3f01aad532bdd5ca64960a9cdec35822bb0e69b57fb78ba01feffffff89e4b0f44e022cf53736520aef84a324100f19f4f0862c9d2150b686e951d3740000000049483045022100e69902cff246e6ae5ae8a502aaf2ecc0f8505b8546b17fef18a6e2dde8703bc60220121b6293f7c24aad7766900a746693b9e30ef4e8cc1ca01b2ed4537b47debd2f01feffffff8e0611807aa639621ca6be13a2eda8d98c32867041f929dbbef7742c7c867db000000000484730440220710257eb2b9f5e7b9517770f81c0999a7fcd5b798d8665e0674abec0909b5bad02207bcbcebecb36661cbc8793575f62524dac431fbee3f9c02fb0d854933357694001feffffff8e77d64182b666e50377b3c9a39395735a89d2c90f5ff62024143f2c25ea51d50000000049483045022100ec5f6927e57df66eefcd1275d4236f38841466cdb29aa9ed8c6f8b8f64e0cc4302200141c090ae22c294844bd0b5179f97fd4b98cee426dfb795c3288f37f67a70e401feffffff8fe0b55ad0e150fbfe8d263c44527b967c44fd79ebbe88a09a91a4318f1c17c40000000049483045022100bbaec071109be2005be905bc0b2877286f24cfdb4d8431a31c8f57d802db31270220345e56f174738a6a191ef0a91c4cdeb686dd552d8992ea6ce7517e0ff9cafad001feffffff91ad86b51f541d480383681c4faa26575f723154ed6e39cb76e03317c8984c610000000048473044022046628accc862ea34ab15232f97505cf673d8bfd23d6316677e524e3643e92a20022078414e64419c96474fe2559c30134ac4c08b5a0617a0dc9bd1ce09e85a8df89001feffffff927673288f7c95f452e035b65c8cd46a57e58451b93dcfecfae0c33f00b4e5350000000049483045022100b9e84841140ae7b9bf08f82e014247a8c270d4073b457fbee74743c413e0b4370220292fc63652cd2fae0d1baf9c705de61478b2ec8d4623b9ecaf2aca715c1e69d801feffffff9477cc8e7dddfa7d183bfe0771def3778e7b2641996a3ea52f42d085d4007d190000000048473044022073842db3431ea57cb4aa05435648817bacb36a623e2528817e399126068fbd8b02206744687cfc5587f07d6a507eeeb2aaff45731b3dd9222c40f2b62b60e4db59b301feffffff948a1e5af04f265b29fd23700d1ac9926b5bed71ed5b2968f29abaa15036848c000000004847304402207c5440b72bc608cdf4c7fad0bccdc19d43877e31b22fe3f5873f558a6068e28c022013e3a5b0b11eeec0bfd5cc8317c8a61ccf28ce19a1b50fd7759502a350b991e401feffffff98a1cd6c74d9d42f88032e74182cfe8e71f125eb7eb1b49e8334d5b17bf4d07e00000000484730440220393955bb76c236467d92d42091a290631cbcd9ef3c3f177ace6f1ce73abe319f0220153d5c0aef39f5cea8ef53822993e374dc6d66a758d599f25d2e934d8c97769601feffffff9a7fefd1b1409dfc23d6be09dab5692cd9f6c59c98b2d7b0231f40b396999c2b000000004847304402201f9d944711c3ee35c47b68ddac1a0e1f728884847d8df788b398157de22e9bbd022005d97ceca294e96f5484420189d7a99b9850ecb2c849223ddb934c6c772e32f401feffffff9b0ed42c0446f8ea3c19b47be97f42d1a546bbd6a5a311cded5c1dd16c3606d40000000049483045022100d42b4c9c6fbcbd65d69f0967cca562227f8fbab7ca2727822eb9eb4d0ce8e77a022049d752916ee19c285675786aa04c37d7025e2cef6907f70849f55cda414f3fb501feffffff9ba78bb678f5b7a289ca37b49835bc6ad383e2089dd3711833383c0c6e6d40cb000000004847304402205d3a652a05971d324947fb9d4d15e98393262498e09a6d8fdde7422af91d341a022070e017f2edf61310cb724401a451c1d2be59175e68b49e5c1f82f20084f0b2e501feffffff9d2bdc85ec46fb0457dd41f02f5f7b203ff8c844062f3376c7f86cf2144dc6a6000000004847304402202f93a774f96364ad8fdf46132f47dde1fac4b833d1cf7c20c6c69f03c605c09702207cf7ef42d8c97b96e349d023efd9e7e0b1fd74c50561290d16f3f122e1ead8fb01feffffff9dc64c498135ebd6c025d7d43ae71120d6477bcbcd9828aebe21911ea21655c80000000049483045022100f72cd391c5dd1bc77de0605a3cb35c246a5c1cc14e7b9b3fc1cdd90fd42cfa4b022069049bca8a2f5100ada2a407a2354d04efa94573a7cd1bfa4130cde66e481a1001feffffffa0c3203666c02ea6f958408c8f2241b4d6e3a8beb9ab54736fe73621feb57ce40000000049483045022100daa9b7a48975348b41dfdf8b5e4614721fd018b950d3cec1d7009386bffddb470220522220c5f3ad8f1f19cb0eafea1aae7a3489cdd3dcb3d64f2ce75bd2066a73dd01feffffffa14e8b18777a8710e58942b56d094243151299f033cc21bb3ad3dfce2b3e77ad0000000049483045022100a9e02b9ad05da478a1cf06a235743d202d1f9e8c2e969ea8b1b7d5fe6778fd9602203880f139bf40766d264c2d7f858eb36dc2257b4cacd116cacca400645f80680401feffffffa262a97a28944d41d47c7f8788528c797d322f7abc0390c20bf22e3b835e127a0000000048473044022059a9da8cb72d3d3967ad3adcfb400ee6043ee088707424728de63cba9361da2102206ca3e6681ff149bff11135315d431e24e05aa3c794b41ef0822b8969b0d1597401feffffffaa3c2496b8237d865f81ff0bb8eb01bf2b69ee806463816ec83b60cace7a5833000000004847304402205637e4e9538fa7489e017da763bce9182c5e78492fe23d5366c0638af15c7eef022034e9a552d342053c4184cea58684ffbd0881467cd0a40f009db155275deae1c001feffffffabfc5cf05834234e1ee8a3c87c8de5d6a07f9530a09f2b34d9303ef30d8646cf0000000049483045022100a68eff499320029204dd73f707d36d65583d21ebfa063d770f55139ed546ea8102206646e141b55f506ed457f24311eeec6e302833f69cd08c9ea3086c78f82dfd3801feffffffa2d1512943366ab64e6d1749b81f993e830e5b546a87b9bd68fe0c5c865da953010000006b483045022100c686f7a4b2e8af7deca60cb20b0c626609548f5426dda6bf33207f82923e0ea202200d9c36dc490f014d0d4970ce8c18621d39b6c0c134c7e43da0f62326725598ba01210360cfa32fd05b4c3bc270fc6e8c891af45a149d34664746ffc67f5cb49c6b5f5bfeffffffad976a10bc9ebe391cee6b83191520a9d0fb62a24e969477a4cc6dd26b29e4da000000004847304402203385b46d676be7f898b316fdcf56a8521bda2224ae891b48be05cd880ae7a0e502201f6de4117623336529e445e0943c519e80150cf0d4a5b1427766d06db2d7a26b01feffffffadd486a6d94629b19713d723301b135c11af92b5ed69e6f0b9ed07d417078b2400000000484730440220575a03c7a331f65defeab66ab1404503a700ece0780889266bd1866ff806096b022069348e446f67f551949267b49861e96904e0b47c75a220aa1cd7ffec3b8fa7d801feffffffb04574d6517ca90a26e07a749ebcde23f67f7ef8a594b23e699fa084529d96e80000000049483045022100948f7ec200d121bdea79b29bf1c608c6d5e007aec62acfb3a5cbcae84ce457490220431802ca646caacfeaf1827e1ceb70f07752413c65bb50db24957166603bab3f01feffffffb2197245ddc53b189c18d05d167210fd6291c6b9116862144c3654da5bb55d06000000004847304402204def3dfa143d5887b4075f45d92a91df9825f1e08bee1c29901c1f117ab30df302207eff300c5347d13f531ec36789a6f4f66c07149ff4c86f21107d0f21dc400d9e01feffffffb4b953583df750085d727027674f69c6ba63513915941e42924a462d5bc15c9b0000000049483045022100a267fdd914d9ce78ca819e08312fb2b3c0f9c395bd30d22b26ea8c6a8af3618f0220548b821abd8f1f1fec1db25fbc277cbfc5840e47185a830174a97b74645af60401feffffffb7f5149ac38efb591ad8c3a46ec9e979d5647c964190a135342435b55484dd570000000049483045022100d1d05a271a8516b9357b0e3e73d5413aa138ae9a10c1ccbe30ba7ef15994c24202203df3584a99260ff637db9515361b258e6cf7fbbfa15278b29173dd2c4f25264901feffffffbfc02225e0c5351bbeb63adb8e3b7859752363a5b85f5b2a6da5240a449e8065000000004948304502210082c85c2c7d8316e9e3cfba9f5bafcdbbeaf0509c3e896bd4121f19e4b82cbfe6022070d7650714cb1975215fe109b8f1da2eea866abbdf05e487eb1d75e12776e52d01feffffffc0def09bb3cbf791c52764cceadd389199be9d7603cc3d6d213ba45ffc98518d0000000049483045022100841df35265191f063a9ad2414ec9b36fe39ef9ae13c9fde0e82d67ec9bc654e302206dd8523cf58547ab425ea55a8d879e75d31558701d4f57d76b0f67736ca5e5ea01feffffffc5c9957c3a3e03204e603c313368d3c01206320beddfd28b850fd17b09a61a410000000049483045022100c3467add04b9e313238376a0d3867bc5b59fca8b2eb76bcc18fbc0b0805e63960220578a2cf379848771a9b13e12559cd130853c7f02d9ab497a74f3305aeaf7b00b01feffffffc64396e634d716a5ae280d9fd821507239d7b25a812eea6751254e462c8a73a50000000048473044022040e5e55b23846cbd5e0af588564e5501d58cf2a18eb485c562352fe2801230d002200c70fcf828a81c1cfb856a2d2cc9de21f2564e6080b2f84f44c65b679f49d09c01feffffffc69c9cdd6825a657be1a06008f73b78cf185a9d195ba771451ca1ec09ce54d4f0000000049483045022100e10488858800081f775278c5d844ba2c2cda71ebb4a822d028637191e13efb2602203f7e7f580dad9d7ed1d4cda38222095d8377917c7d4e90c8abb4b9bf3a40975c01feffffffca6112fdc1db1a441961f6eb62b492c1397732cc5519d40f6aa335612f42d39c000000004948304502210097ed9842254112825356823d7365ce8d0bbc973702be7f25951e21f48fcd6e5702203a0aab0ef62926936815e1d9490b335359f766d0ace9b858d59bbd8ba26cb1d901feffffffcb15dbc245dec1ef8cb8e25ef11921ca804c023e6ad803ebcb2a7b98380b60b30000000049483045022100bb9285cab4a68dcb68b46687b59ab1769a0b5aa1ea6f45488e189f58e698321f02205e6499101ee3b0f005e6d3ba151282c236a79d32488e16b1867c6e70c8f7f51001feffffffcfe47e6ce0780c4594a2d1b76a2906c0a9ea32d39a73c244aa9d5d8dea67248c0000000049483045022100a4681709fd0b79ceaddd9d695bd5c740391970a1feff2dd3a90674d20ca95a2a022076dbad3df0c4f8158eba4a087650feeeb1736b5a8b03aef15f698be4fc668abd01feffffffd0a4d502c22cea7da0d1a3cf99aef598b74fad19a6de35f21c6fd0d1b8cf275600000000494830450221009d8a22fe94f18d0a65e8f188b702b4023948e236ac2efd36bfb20d2054e1d55402201383ab2ed9465790eb9496483f10f54e40ae201fb98358cbdd71a0e650ad1b9701feffffffd25452b8575cafca10255179f95c8c66e255329220b7ff645af522af7b8038320000000048473044022013581d5e4794efb6df6dbe04339478ecf019493814d9d52390b6cc790c998762022006aef7acc10019a8cfd7ae99e11e5877a9cf1a5a6ef084549815435f7b681e1801feffffffd3922dfd1a65216bbcd4646d0cbcfa70cfe587775cf4c673043c57061f48d763000000004847304402200bc9095368e4409c7debdf0871f18af1d36e1a4851e4b948a1ce362926550611022034fb19afe76cf133e4bb561fcd3cfe7f3d49743fd75022c124b6e45bd9f503cd01feffffffd75c777645d534009bc8e7b2c0b58a78cd63f41f47f6cd30868aeaf9b55e477000000000494830450221008f4a11d94e97f02e3226c509c70a3582a280ea3bf33309ec392ceeda7a59567e022044bf0d858442058b7c5fd8c73e47287f9283e957fdb39fc005cef70e22b0c07001feffffffd8f837530faf0d9b50efe1d79aed453b11916d565a2b9c40a380a85f0be2af6b0000000048473044022065ac672cfaffe8f8d02fb8064cb54f4d335e7af222452ee71c9b249602cbfcac02202cdb7e8cc05c52db51b71a05258abaf0810d61199eff9ee0ea37d8c373a876ab01feffffffdbce76e284668c829366dafd00ae4884ea39b2aa597cc1b4d2a37991a9b2ea56000000004847304402204480dd6aac1167bb49f32fc04feaa3a7c19ad6cba48479cb72dc7d0bd71ca279022036e654a48cadceba49dbb097892ce5d90d8f082460fb18776d353e9d832ba83301feffffffe481d9493d67997104c12972b7c8a73fb87b16e228665bb784436fc0f58d7e66000000004847304402203645fe9770f3851392a85b8dc9dd405ab13fd8434122f6763de459129527fd0702204d240e91298a1487d496feb320dee028df7dbb5c9236e5d62a4964347f97279001feffffffe7a22d3d87255e4adaab9a6fd8a72320299a6902426424aa8b2b89b7c3b0c0950000000049483045022100b362e030a6739f020622f0f7e34c48fc4ff6147ed88a194a37a8a04c8e42822a0220755bcc63667eb4cbcd52108d27245765176c6c5b2e9a77013aea4d7474c0a1ec01feffffffe80ac9635b6bd91c1935eca6df80876ac8cdc87a2b91e925cfdcc0f06059b2e5000000004847304402204a2b8c311a11920eef4d64e786c5f26ed82d4c1562f2cc0e73fd5a5374c7061e02203693e77f88372a335d1463df4edd062b6dfe2bb895d56d58f3a404c27757378501feffffffedad3357a1a9aeeb8c2771cc6f284db92a2aa31f458e35bb270216015bb0edd40000000049483045022100abad2415b7c6ca9ccf3c52b4008c4d531360f2d6541d9025ec2caa4d764b46da022054f5d2833704686a860fcf978313a3c6c61f16e9a1cf84a3e4ac76c8950dabb701feffffffee85afefc31a99a4616bfb228e1f48691976b900ecdfe838e1310bf5b33fadcf000000004847304402200f7afc12d43432f5303b892b08417743d43a05bf938719428a88c85e255e5b0d02201a12cc706286a1c9329f9e37e62143866563b3773769def6912494a73c17a9f201fefffffff13e4784de0564595f3b4cce57ec0d8a4b72a798feb65f5fbca5b26a3a91d0760000000049483045022100fd3c9b2e02db889ae2bd43537a308a87a7d701bac19083e3a985a93674239e2802206dd36da12f3f2b222ce4387cb91e1098c5f93d25ce95fed0e5d21e6724af554401fefffffff205212771fd3ca5a68340fa307810e44315ae02464b5d8a235ba6bca691bd710000000048473044022062aa2571a91a7e06f0e96570bb3a348296ce7b756ceed48fe69be91f94a6c5c70220631885aa6fc967e40cd1820c83310143884e175227c5434e33b89245598d5e5c01fefffffff31cea9351fddc36393fa996962e204c461a34ff1c6ad243b3a4902440f165da000000004847304402203355527ee222e6bc756ef30c6ad687a21109a5175b1eb27592e9e1938b9e8f850220206ea10896e9e307ee73d33813048fece04bbeda702e11cae8bd61297b73590601fefffffff3c67e78777cc42ae2834bcf5dce5493fbcfcc6e0aabd7608cf4f9c936a37f49000000004847304402207cd40b7d6ca2b869d3f00c0babb484c7a2896c080c593767e0a293acd1505a9c02203a2f8c191b20fe4fb08958b3bb20411834d17f7fa075deb8b2272d22112ec8b001fefffffff3ddc14df664f6e4f59b1f1e25241a61fc69f13125ea5a67edbd03b37d332eb50000000049483045022100a40f81d4e1791d0253a2484656c27994d1e42aaaf77995e9fa6e0eb02480bde30220669c0bfbd0772ec1ad8ca9357eb3ca1100d7b40ed97bb34e23c8cecb42511c7001fefffffff614bd5d83278ad95d8c5bf6fefe59b3675e832cc1c2349d7952aa734fd20283000000004847304402207709f2089f820012e76eaa6221aa0b9776cbdcd0b0b458d400c7c1ca9ed7eedb02200de75bbdae8100b4b27e5deb164e13d596b6661248be45d817b573cdf8cb2c7c01fefffffff67ef42d75fc5d36ff32ab40f5c9f88f279a1173ee1db227a4706aa0480d66ab0000000049483045022100b09aa2cca247052451537f64801ea561506bff82794a8870c077c32c69d0bebc022013bceb4edd8f126af25c07a74d5c16935b0e916cdcc25d49ee335c430400eb2601fefffffff69f0798ab6de485dcfe72391f4cbb1e5f4d39ee8f852b80fd4bb730eabd8e9300000000494830450221009d91a34a7294250ac5b31bc86a2f7ceac8ce79e49d8ac7b3b02ad0cc278f16d102207b9ea41b03e72746a67e7bedfd1cad7f5055a915abdabc13f8e51815f29e983601fefffffff8dd75e7c674cf7bf15f42fcb1256ef4f16b96e0ff6a359bc24c07ba734f09a30000000049483045022100cf9283df82dc2c0d26c2fc9349d16faf2c961919066798705da4afe6fbf27af202207740172e195f5713eff2aeb39d12923625401dea6a0c4b4aa19be3b973c9077601fefffffffa0c47583d4c6f18e12b93764ccf57d2430a52bdd0ceb611924a79c82daf48b9000000004847304402207b46c5dfb4e65c5f91f9770acca2a1ad24a4cdd7e4f27ac9c5e55b14f8d7c00202203b17ab29bd9be1559d550cae9f79728a644682a8aab5db1a1cc3432bad159f4701fefffffffa5ca0440f302bcf118946714dba6e81036e48477ff3a315084fe682aea6d1d50000000049483045022100929668780086aa4c8945fc6d9aaa340ee8ae2807ff2f6a89623ffa102d2bdf6d0220318d3e075a82195af58a66b47c8d62849d69ed1da2e07402d89440a6a77b63ba01fefffffffef369694bf0493161762e49d7ca16f1ba600250d801a848d0ca8d3f2d677d4a0000000049483045022100f7dd5f966156c81a1d2aa694befa6b19e35aa8d7fa199c37a803cd382836fdbe0220669d85a44632a8ea6093b783693c4626ad8c71be4b82b027c4cdfa63682a9a1601feffffff02c5490f00000000001976a9146843838a0aa11686cd0c01fbf470c9c5f302249488ac40420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000",
  "complete": true
}
```

</collapse-text>


Send the transaction:

Command:

```bash
./komodo-cli sendrawtransaction "01000000660aeb1fef3f0f6e8e9598a2f4b434466b5ccb95e49aa7c4286bc5392d43fa1f2800000000484730440220234b370cddf91b27e172cb5d6257a9807e63cf680a644229147b39d87e597875022047a58509a11b190107a9ff6e08143bd0d450db233518ed26f123bd739576e9c201feffffff0d204965060600f1e79bfd183e7ee1b5b9b61c6379d6c95984cb7cdf79231c4c000000004847304402202ffed5ef972b01ec4290343ab0bc4cff989d0047f2cbc9e8b69f0f3102824c0e02203c7e3214344e6ac430e4f996a8980e7d9172ea1e8c0c238ba32b8930f4d4119301feffffff0d3eba8ce5b6b6ee7d2e804be57dbe4544d7b7169caf5afd6f207c1275e8977e00000000484730440220096fdd062535f200897de2f2dfb7d782499dc5fc24d8e06805eebed6ec125c07022077e4379409bd7c9052608e8cd52cd83b0c9314c623d9b85012eab28e10f8c13601feffffff04f8b24c1eb3aeb01cc483a5b6922eb341da17fd42c944b0bb18998c04fea67e000000004847304402204a8f45abf51333ec7c4491cd5750e5d46785475ebdb0a13a6a946711f17483a9022075805ee9f2130c3938e273c280b6b14b27640349b537b55348c40ede1508938f01feffffff0360b074597abb6e32c319078ea5f83cdfc85d5c892c0388893d8b66876c077b000000004948304502210089c7919c6e7412a1569434f74caf7110bbb0341361384067265c142c8e033b2d02203d5eaa583d727fad487bbb689bf433bac32d907e707043e8f96f8c50fd3480d501feffffff0e2ae757c446029f5dbea36926883744a2d3fe8ee05381c2b4311e7d58057fd40000000049483045022100a0672d882511b01696192965175f3827e65ef8d45b3217b563d0f97f3cab512602205c568b5c1eda0c149976380b38d2f93ee384500bb5eecf6e9f3f2101d649eace01feffffff149c5bbedff321a7810d5db264829ffa5529a4f29ca3a452b0543736339bf0260000000049483045022100981f7f5210e17e1c73fe5083ca7b29a5b1a9dfbbf5474c109069a4b3eecbb5c5022065e21331260c718788b72902da250418b0091537a540e8f6152ae097632637da01feffffff1f9e6624bb5185f0b51d36a3a94982f0d8a325bdf81db90bf67945354a6f40c6000000004847304402204391d39a88d2f8427396bbbca508bcdb3b6897c25bee4c68d357b878419285a602205da8f54aec5bb9253aeaa9b4c4a1a8a2fe602e894422da0279f21f9799a3540201feffffff22e752f465434c0563a7e0b9d104b8633bdbd6073bbe61d17dee0d53ac8220430000000049483045022100d5a4b70ce4542e30a7cfb09ea259405ee202f99b556c88604b06a86419b2e72602202417376668f93e44b404ec2bfe6e797b699367604de296377dfc6944afce722901feffffff2780816ab4fd0177dfff1a98b7783bbefe8d08f339c964d2438b7e73c8ce614c00000000494830450221009d1878ce69f3a438748bcc73de00d531492cd36d2bf7a292bc5bbf67fcf6c774022066e1705510ed5a5177e78a71ba9891d69e11a7a3bc28599d5d18c29c2033a00e01feffffff2da12ef31d8678120d4961c9090035ae9e8f48dcfe4e2f461fb10437473c2bc90000000049483045022100fe0f6284ddb97b4595d77cf7ad5ef4f5caa67cb7c4b6e6ee9812bac076787377022032991f85e1962140673af04a85a442bca3df931ca52c365d3cf24e79b782b2d101feffffff39a00efcf7f678ecf0252ee2b4998a43121aaad28abe518be06a830fd34ae24e0000000048473044022038759690b62c95f80a54d3bde28abdf7dddae992ee4a18c511a4d442da67d758022016aa7dba3da26aa7531731222a0f66cec25c5026cc4903b51dd3fe5483af4cc401feffffff3c5b78d98b3edf510b003cc5723270854313d51ad40859ba08a622f3a269a66900000000484730440220141e545e4ea0c27a630972d474b7d95dd2c9da1a129a7e680016e4ad70c5579102207a3384d8c988bfa526bea0f7cebfb8a8d81ae4b7272d23e83268791fc8eba2bf01feffffff3ca10423750150708e817fe0020a7fd0a687a0456158db659af112dfefefa299000000004847304402205c4e4f8934cea71191f87208bbbaae36b2b3ac4f7282256cc05446cdd1ccc0980220038db0a46e2b06fd61acdf1b47a5de87b787a62a1b65db823c904efa6223129b01feffffff4005c2dd439c35e3f04384142b66871e15a72149218d66be2ca3b13f7e1604b0000000004847304402206b8854445fdb689929143c8daf33fa52ddee06c360073f6262ffea4db0b8b71102200b4d7a166bfa81e8f2570afcd9de338b9a0d7bc72a3962c775205933690f302901feffffff408d53f3499c6db833b4a9b19aa8cf61c95182775a0539efef9c62a0456520c40000000049483045022100c1f028354c1034e61d59999070a8ab554a97f81583d72f38c0f6b0b7a52fe8ab0220538d6fec3f35a595614602203b360730b2f13c3bd879fdadca06dd8a16b90b9d01feffffff43671a7bd5f31ee1642842027378035d73b06d446fbb1666e95638eb0d55d1c9000000004847304402203fc7529cc7a96726728a4aa6a1698fc31bad94d1eadda2a0f74ea8f22d752869022011983a3c457e5c7ffc87b576d877e6f02ab8e08dbda6a94dfbf245315a3365e201feffffff45ee4a5c7a98f315d26c1020b26576500ecae4d6a6a78b3ad169788006e7c76c000000004847304402207a60671e1d0cd3d5d7b8eb2a1b53a0014f30de45f0e379a30435a47e7f9861eb0220689af75a99876c1d1d206869dca223806c45ad64f32cc08cd624936ec6c0600f01feffffff48244290df0dccc781e7d081c731081c2e7e022176cc7b4b31fd92c1e31d970e000000004847304402201972bc346632bcd5166cecbd9d7ca29583c7ad938640d7db9f4bdc6629fff086022019135d7341ef96813a839c6cc14f47c7d2e42c262abbe8747e16c6869cf2b90a01feffffff48c28c27f8303266e0547b8c453b9823baed7a9e06105c09ba4cf65cb2bd5d2b000000004847304402205e40a09a37c939cfa6b5143a2ce596452ecbbd223400922b0001bda694f4c63602205aad66d989167c9bbca130aa489de6286390e55f9e9ef4c5c043c2f13377c7c701feffffff4b28d567f5933d5992559fb19f90115b145db32bd1b6e52d309021da8e6063cc0000000049483045022100ceb282925d7eac742085d5ac48443e9af8b72873fb7a2f96b4e196a58a4b29d7022074790a63adec4088a5d5c2bf1fa80597be0e17afc7490620163a873a2ef1855d01feffffff4d45006be4acc1bf5c69722cb744b967e615d2d35014fc82cf61c2a4905717a50000000049483045022100c6f42ccf0af44182e144aa925b631cab8d90959fa96eb0453335a970e74910d402205e99e1f1d23813e336a3c96efd6e75490f3b5d807f0f2bbc677499cc0b92f47a01feffffff4d8540fa9e580b140359e0a17aac6415ca80072f9ba26fc2b43914092f4702400000000049483045022100b42e72fdb23f4f50af0222d5e590bcc676d60858583dffc1ba8b35730e1c8eb102207cc50ecd38639100131b4c4950cedaac4c4ee37c7a6f87d3ed7fb7eb165559c101feffffff4ff26de89311f83d65a3936e06937f30a75dd50594246d910035bcbe19c0ea6a00000000484730440220425c41bc88fce16ba54f2611a54737d9b5197abc541c730711157b290486cdc6022003f967d0f98864249d80720c65e04c475cbc12c482104aa7e45a06bc9eb080b901feffffff511e169a83c0c0f8ee7163c34fa0e3b024275892419f11a2bb96d4976d3f9b4700000000484730440220136e776a7bfe3fdb5a5b8db2783452ed7cf1fe3c89ec001ed69455a082337e49022057e7dc0ace7ae100a2f2c26291cfe80352b34dfd9269d07468ee2dfba13fc02001feffffff52325adf85f74f38f467bc3a99657f322988add8aebb371bd080088efb95836f000000004847304402201fafc46f92d80a9b4f71a15113ae8e8182dcaa09cff63645db5b858044f329730220160082cc1a3bb262458a204040c3ecc23b276c4558ea095c1b66e20a4004e26b01feffffff532ff452f8423507348c542063deb6f257de711237ff8d718143358128e2c6470000000049483045022100d8dfe5557eae68e8b3da5cc787b14e85fb4d10d2c8a80eda12e69b807319ff9902200b104ae561f1d9c4f0c1646327686f890aed1ea8fb1c1b411f07059517737d0001feffffff5b0d6fe54dce0515e6947f5170478cabb06d1e855365a6b7dbb0118c4450ff0b000000004847304402207fad37e344180882f9cfa3e36d036282a91467ff15fca2f24278f5fa5283b99d0220325dda0a7c35a85cb617bcac369ec0033023c221771cf02f1f877f693f1059d901feffffff5b7db5b32a8e8e8c6307a7d0afec7062637eec39670f1afb08f0b04a50fbc47400000000484730440220752cc9659edbddc78293b1947f84d2bd69e32ef4d5425d4e55df4ca74a7a962402203a755152ab6d38a7ba91f26f476d611cd9c6b27167d6e20b511c4830038d102c01feffffff5cbecf874fd1996cd4e49cd41c98a586c533eac1ebc37df92cf5a9545203f935000000004847304402203af4f03cfed41a4d8387a0859324ce3c40c953582e8848867d06d3aef096deba0220104c18b2e243cf7f076d2833c4fac30e0f5e62b58bc039cba6ce7fe47ea394a101feffffff5d015b907e23b9c5e00907013f66d258fab2f016842f0c8e69346d72b0221dd70000000049483045022100bc3e1c873f25e1a661ef81c109de1758ab13df3fc591540658c5fc05bb1e8c150220309b87661ce039899d5be3b510fcdbb9464ff8cb47af06c016390d79daa7029c01feffffff65c461a04f571b50ab4fe3e367952bfba755eec9b6ed23cb460ab3bdc873fff80000000048473044022037b231fec860afbac51e3034e1308e1873d87dc586258ad8c7ede04cf0fab97e022012eceff07cf09a2c3d2f6884ee885ff9f8e7526de8c08b54e5e538ab223bb31b01feffffff686da3cbb1a1af26c2c01793345a5fb8ee47829aa907ab95b8144fbeda1707920000000049483045022100a0d89b8331105f34528f2c9687f53897a2a14f57cde1390513b4d0fda530a4200220573800bfa5cba98af2a08fa3e87fd0142fe1db6f391a4d160f70565b1078210d01feffffff6896423421d7e1193a7b88d2fbf1eef1c46f637e7a49217c171a18852d29e8d60000000049483045022100cde87af1eb614761149aef298153c541e24ff45345f99dbef18bf2379d27f347022063115fb6b37842eb7cc4d8910ccd047635a9674e72d9418894614014c19d583a01feffffff6a0f6f77ae1d42dc96c39c620f401f32c9774f18f1a039e97b4b405b8aaa757d0000000049483045022100a82d1afe573bfaf0668b3acbec55f68bcbb58bed7b806d59837c32f3560cd1d70220198904866e0bd9d19cc465cf09e256c439ad5309caffa347b8c416443ed07a0c01feffffff6cfa0bcd2e2689498496dc4b15feb0fc535667a88005f2c88198265bb1f8f3d8000000004847304402207917043acb4879438625ace42109cc1bee16054222473d2f975b3edf27286f3602207413e93cf5e696de7c0d210dfa70cd4dd9e62e78ed86a3d99682ef8ea5c064cd01feffffff705456a54cb0b94ec15890bd957dd778581f606270a331ad5b15ef48684a5fc4000000004847304402206668503174e874bc09d999d7bc47f82a5ac47c3f1bc1c43ffa1cca74c1cde4410220616df31f268371b61d83acdfd394a7bcd8da5817174faa29b51c648786c5405a01feffffff718076a7dd771121e817b98e98f46c7f52722d6cdfca9130203fe5965f0a3c00000000004847304402200f1c2ef04cf5fceacb53724360ce3af3794d14ef8a47d4d09c8e3b95b20e48770220659021ba00a68e5f2f4053ec904cc7e65b5bd5db76ff45a9be4ba35ad1a2d0a201feffffff780ed86aeead9747bc96bf7053b02ada6ac566481763e70c29d3d00162bc7b530000000048473044022027f04c7d149ed6c9c72ce3956917444cb5f943aa95adb694ec30ef53c930cfe202206dc14b5f1d59b6724fea484501e36fe7bf40849614921cf76130ec20665f35d401feffffff7b3ad2352be9169286629dcf064fa769c23a8aabd468c30eec35a0c79b61f1f80000000049483045022100c4a61d02e54b0c0b8a9749d394d6447326bf66f3524388b8854c5585ad71704702200b0e71e178082df01e66d0bb72aad0238b0063018cae190c2f21c0fbd78a462001feffffff7fc4676bc415a467bd10d303eacd54617acfb6876945e3bf1217dfd208c6d58d0000000048473044022064ab0c92b7cb2205f1d7af0a2faa441eac041cbb892b166b8f1f060019301546022066924807801b03876a0ac1830eb355ed26c7a67b9e28fcb0b3c6dc5d3c8ca1db01feffffff80fe96eb05e5fcf89fa7e19b1a653e0b8164cba383e2d2ff5934a61c42698cb100000000484730440220515b9c588036449b326ab8d74679cf65c7fe780a03b23ba8428cf829a070abd402204c71e343cfe18e166b7259509b47dcbec0b5b29a764e4dbd29a39479ef60d34601feffffff875ea454109c4725766d372f0fe395dd4744737378b3a246094dc0db7fb6e95f0000000048473044022039167229a3f6ece80aebdfb425608c855989a0e7934abe0c4fca1175f60d46b5022069f57fb057a537cd95e5ebd6a93709e0bffde3d05bd01322f08d0fecef7c061f01feffffff87b7c1fd810834fdd892975a795b9e6c1b1aa398436ae3ecb19bce62ac11aa4e0000000049483045022100ab701a93c793c182bd54f06f80de91c03e36fa9b33b220a91d028f2196d329b5022020e23cff44abe2510b50ce0a8cab286d3ae17c59d8aebd20b42613b764a128c801feffffff88b22fca9de29db1901e9c8accbf1caf8fd4d5a37802b3bf5142038809ee3c6900000000494830450221008ade6fbaec28bf02b3914ffc62c4e0dd7da3d50b41b1054653826a38573e6c13022032d2528595fad675d3f01aad532bdd5ca64960a9cdec35822bb0e69b57fb78ba01feffffff89e4b0f44e022cf53736520aef84a324100f19f4f0862c9d2150b686e951d3740000000049483045022100e69902cff246e6ae5ae8a502aaf2ecc0f8505b8546b17fef18a6e2dde8703bc60220121b6293f7c24aad7766900a746693b9e30ef4e8cc1ca01b2ed4537b47debd2f01feffffff8e0611807aa639621ca6be13a2eda8d98c32867041f929dbbef7742c7c867db000000000484730440220710257eb2b9f5e7b9517770f81c0999a7fcd5b798d8665e0674abec0909b5bad02207bcbcebecb36661cbc8793575f62524dac431fbee3f9c02fb0d854933357694001feffffff8e77d64182b666e50377b3c9a39395735a89d2c90f5ff62024143f2c25ea51d50000000049483045022100ec5f6927e57df66eefcd1275d4236f38841466cdb29aa9ed8c6f8b8f64e0cc4302200141c090ae22c294844bd0b5179f97fd4b98cee426dfb795c3288f37f67a70e401feffffff8fe0b55ad0e150fbfe8d263c44527b967c44fd79ebbe88a09a91a4318f1c17c40000000049483045022100bbaec071109be2005be905bc0b2877286f24cfdb4d8431a31c8f57d802db31270220345e56f174738a6a191ef0a91c4cdeb686dd552d8992ea6ce7517e0ff9cafad001feffffff91ad86b51f541d480383681c4faa26575f723154ed6e39cb76e03317c8984c610000000048473044022046628accc862ea34ab15232f97505cf673d8bfd23d6316677e524e3643e92a20022078414e64419c96474fe2559c30134ac4c08b5a0617a0dc9bd1ce09e85a8df89001feffffff927673288f7c95f452e035b65c8cd46a57e58451b93dcfecfae0c33f00b4e5350000000049483045022100b9e84841140ae7b9bf08f82e014247a8c270d4073b457fbee74743c413e0b4370220292fc63652cd2fae0d1baf9c705de61478b2ec8d4623b9ecaf2aca715c1e69d801feffffff9477cc8e7dddfa7d183bfe0771def3778e7b2641996a3ea52f42d085d4007d190000000048473044022073842db3431ea57cb4aa05435648817bacb36a623e2528817e399126068fbd8b02206744687cfc5587f07d6a507eeeb2aaff45731b3dd9222c40f2b62b60e4db59b301feffffff948a1e5af04f265b29fd23700d1ac9926b5bed71ed5b2968f29abaa15036848c000000004847304402207c5440b72bc608cdf4c7fad0bccdc19d43877e31b22fe3f5873f558a6068e28c022013e3a5b0b11eeec0bfd5cc8317c8a61ccf28ce19a1b50fd7759502a350b991e401feffffff98a1cd6c74d9d42f88032e74182cfe8e71f125eb7eb1b49e8334d5b17bf4d07e00000000484730440220393955bb76c236467d92d42091a290631cbcd9ef3c3f177ace6f1ce73abe319f0220153d5c0aef39f5cea8ef53822993e374dc6d66a758d599f25d2e934d8c97769601feffffff9a7fefd1b1409dfc23d6be09dab5692cd9f6c59c98b2d7b0231f40b396999c2b000000004847304402201f9d944711c3ee35c47b68ddac1a0e1f728884847d8df788b398157de22e9bbd022005d97ceca294e96f5484420189d7a99b9850ecb2c849223ddb934c6c772e32f401feffffff9b0ed42c0446f8ea3c19b47be97f42d1a546bbd6a5a311cded5c1dd16c3606d40000000049483045022100d42b4c9c6fbcbd65d69f0967cca562227f8fbab7ca2727822eb9eb4d0ce8e77a022049d752916ee19c285675786aa04c37d7025e2cef6907f70849f55cda414f3fb501feffffff9ba78bb678f5b7a289ca37b49835bc6ad383e2089dd3711833383c0c6e6d40cb000000004847304402205d3a652a05971d324947fb9d4d15e98393262498e09a6d8fdde7422af91d341a022070e017f2edf61310cb724401a451c1d2be59175e68b49e5c1f82f20084f0b2e501feffffff9d2bdc85ec46fb0457dd41f02f5f7b203ff8c844062f3376c7f86cf2144dc6a6000000004847304402202f93a774f96364ad8fdf46132f47dde1fac4b833d1cf7c20c6c69f03c605c09702207cf7ef42d8c97b96e349d023efd9e7e0b1fd74c50561290d16f3f122e1ead8fb01feffffff9dc64c498135ebd6c025d7d43ae71120d6477bcbcd9828aebe21911ea21655c80000000049483045022100f72cd391c5dd1bc77de0605a3cb35c246a5c1cc14e7b9b3fc1cdd90fd42cfa4b022069049bca8a2f5100ada2a407a2354d04efa94573a7cd1bfa4130cde66e481a1001feffffffa0c3203666c02ea6f958408c8f2241b4d6e3a8beb9ab54736fe73621feb57ce40000000049483045022100daa9b7a48975348b41dfdf8b5e4614721fd018b950d3cec1d7009386bffddb470220522220c5f3ad8f1f19cb0eafea1aae7a3489cdd3dcb3d64f2ce75bd2066a73dd01feffffffa14e8b18777a8710e58942b56d094243151299f033cc21bb3ad3dfce2b3e77ad0000000049483045022100a9e02b9ad05da478a1cf06a235743d202d1f9e8c2e969ea8b1b7d5fe6778fd9602203880f139bf40766d264c2d7f858eb36dc2257b4cacd116cacca400645f80680401feffffffa262a97a28944d41d47c7f8788528c797d322f7abc0390c20bf22e3b835e127a0000000048473044022059a9da8cb72d3d3967ad3adcfb400ee6043ee088707424728de63cba9361da2102206ca3e6681ff149bff11135315d431e24e05aa3c794b41ef0822b8969b0d1597401feffffffaa3c2496b8237d865f81ff0bb8eb01bf2b69ee806463816ec83b60cace7a5833000000004847304402205637e4e9538fa7489e017da763bce9182c5e78492fe23d5366c0638af15c7eef022034e9a552d342053c4184cea58684ffbd0881467cd0a40f009db155275deae1c001feffffffabfc5cf05834234e1ee8a3c87c8de5d6a07f9530a09f2b34d9303ef30d8646cf0000000049483045022100a68eff499320029204dd73f707d36d65583d21ebfa063d770f55139ed546ea8102206646e141b55f506ed457f24311eeec6e302833f69cd08c9ea3086c78f82dfd3801feffffffa2d1512943366ab64e6d1749b81f993e830e5b546a87b9bd68fe0c5c865da953010000006b483045022100c686f7a4b2e8af7deca60cb20b0c626609548f5426dda6bf33207f82923e0ea202200d9c36dc490f014d0d4970ce8c18621d39b6c0c134c7e43da0f62326725598ba01210360cfa32fd05b4c3bc270fc6e8c891af45a149d34664746ffc67f5cb49c6b5f5bfeffffffad976a10bc9ebe391cee6b83191520a9d0fb62a24e969477a4cc6dd26b29e4da000000004847304402203385b46d676be7f898b316fdcf56a8521bda2224ae891b48be05cd880ae7a0e502201f6de4117623336529e445e0943c519e80150cf0d4a5b1427766d06db2d7a26b01feffffffadd486a6d94629b19713d723301b135c11af92b5ed69e6f0b9ed07d417078b2400000000484730440220575a03c7a331f65defeab66ab1404503a700ece0780889266bd1866ff806096b022069348e446f67f551949267b49861e96904e0b47c75a220aa1cd7ffec3b8fa7d801feffffffb04574d6517ca90a26e07a749ebcde23f67f7ef8a594b23e699fa084529d96e80000000049483045022100948f7ec200d121bdea79b29bf1c608c6d5e007aec62acfb3a5cbcae84ce457490220431802ca646caacfeaf1827e1ceb70f07752413c65bb50db24957166603bab3f01feffffffb2197245ddc53b189c18d05d167210fd6291c6b9116862144c3654da5bb55d06000000004847304402204def3dfa143d5887b4075f45d92a91df9825f1e08bee1c29901c1f117ab30df302207eff300c5347d13f531ec36789a6f4f66c07149ff4c86f21107d0f21dc400d9e01feffffffb4b953583df750085d727027674f69c6ba63513915941e42924a462d5bc15c9b0000000049483045022100a267fdd914d9ce78ca819e08312fb2b3c0f9c395bd30d22b26ea8c6a8af3618f0220548b821abd8f1f1fec1db25fbc277cbfc5840e47185a830174a97b74645af60401feffffffb7f5149ac38efb591ad8c3a46ec9e979d5647c964190a135342435b55484dd570000000049483045022100d1d05a271a8516b9357b0e3e73d5413aa138ae9a10c1ccbe30ba7ef15994c24202203df3584a99260ff637db9515361b258e6cf7fbbfa15278b29173dd2c4f25264901feffffffbfc02225e0c5351bbeb63adb8e3b7859752363a5b85f5b2a6da5240a449e8065000000004948304502210082c85c2c7d8316e9e3cfba9f5bafcdbbeaf0509c3e896bd4121f19e4b82cbfe6022070d7650714cb1975215fe109b8f1da2eea866abbdf05e487eb1d75e12776e52d01feffffffc0def09bb3cbf791c52764cceadd389199be9d7603cc3d6d213ba45ffc98518d0000000049483045022100841df35265191f063a9ad2414ec9b36fe39ef9ae13c9fde0e82d67ec9bc654e302206dd8523cf58547ab425ea55a8d879e75d31558701d4f57d76b0f67736ca5e5ea01feffffffc5c9957c3a3e03204e603c313368d3c01206320beddfd28b850fd17b09a61a410000000049483045022100c3467add04b9e313238376a0d3867bc5b59fca8b2eb76bcc18fbc0b0805e63960220578a2cf379848771a9b13e12559cd130853c7f02d9ab497a74f3305aeaf7b00b01feffffffc64396e634d716a5ae280d9fd821507239d7b25a812eea6751254e462c8a73a50000000048473044022040e5e55b23846cbd5e0af588564e5501d58cf2a18eb485c562352fe2801230d002200c70fcf828a81c1cfb856a2d2cc9de21f2564e6080b2f84f44c65b679f49d09c01feffffffc69c9cdd6825a657be1a06008f73b78cf185a9d195ba771451ca1ec09ce54d4f0000000049483045022100e10488858800081f775278c5d844ba2c2cda71ebb4a822d028637191e13efb2602203f7e7f580dad9d7ed1d4cda38222095d8377917c7d4e90c8abb4b9bf3a40975c01feffffffca6112fdc1db1a441961f6eb62b492c1397732cc5519d40f6aa335612f42d39c000000004948304502210097ed9842254112825356823d7365ce8d0bbc973702be7f25951e21f48fcd6e5702203a0aab0ef62926936815e1d9490b335359f766d0ace9b858d59bbd8ba26cb1d901feffffffcb15dbc245dec1ef8cb8e25ef11921ca804c023e6ad803ebcb2a7b98380b60b30000000049483045022100bb9285cab4a68dcb68b46687b59ab1769a0b5aa1ea6f45488e189f58e698321f02205e6499101ee3b0f005e6d3ba151282c236a79d32488e16b1867c6e70c8f7f51001feffffffcfe47e6ce0780c4594a2d1b76a2906c0a9ea32d39a73c244aa9d5d8dea67248c0000000049483045022100a4681709fd0b79ceaddd9d695bd5c740391970a1feff2dd3a90674d20ca95a2a022076dbad3df0c4f8158eba4a087650feeeb1736b5a8b03aef15f698be4fc668abd01feffffffd0a4d502c22cea7da0d1a3cf99aef598b74fad19a6de35f21c6fd0d1b8cf275600000000494830450221009d8a22fe94f18d0a65e8f188b702b4023948e236ac2efd36bfb20d2054e1d55402201383ab2ed9465790eb9496483f10f54e40ae201fb98358cbdd71a0e650ad1b9701feffffffd25452b8575cafca10255179f95c8c66e255329220b7ff645af522af7b8038320000000048473044022013581d5e4794efb6df6dbe04339478ecf019493814d9d52390b6cc790c998762022006aef7acc10019a8cfd7ae99e11e5877a9cf1a5a6ef084549815435f7b681e1801feffffffd3922dfd1a65216bbcd4646d0cbcfa70cfe587775cf4c673043c57061f48d763000000004847304402200bc9095368e4409c7debdf0871f18af1d36e1a4851e4b948a1ce362926550611022034fb19afe76cf133e4bb561fcd3cfe7f3d49743fd75022c124b6e45bd9f503cd01feffffffd75c777645d534009bc8e7b2c0b58a78cd63f41f47f6cd30868aeaf9b55e477000000000494830450221008f4a11d94e97f02e3226c509c70a3582a280ea3bf33309ec392ceeda7a59567e022044bf0d858442058b7c5fd8c73e47287f9283e957fdb39fc005cef70e22b0c07001feffffffd8f837530faf0d9b50efe1d79aed453b11916d565a2b9c40a380a85f0be2af6b0000000048473044022065ac672cfaffe8f8d02fb8064cb54f4d335e7af222452ee71c9b249602cbfcac02202cdb7e8cc05c52db51b71a05258abaf0810d61199eff9ee0ea37d8c373a876ab01feffffffdbce76e284668c829366dafd00ae4884ea39b2aa597cc1b4d2a37991a9b2ea56000000004847304402204480dd6aac1167bb49f32fc04feaa3a7c19ad6cba48479cb72dc7d0bd71ca279022036e654a48cadceba49dbb097892ce5d90d8f082460fb18776d353e9d832ba83301feffffffe481d9493d67997104c12972b7c8a73fb87b16e228665bb784436fc0f58d7e66000000004847304402203645fe9770f3851392a85b8dc9dd405ab13fd8434122f6763de459129527fd0702204d240e91298a1487d496feb320dee028df7dbb5c9236e5d62a4964347f97279001feffffffe7a22d3d87255e4adaab9a6fd8a72320299a6902426424aa8b2b89b7c3b0c0950000000049483045022100b362e030a6739f020622f0f7e34c48fc4ff6147ed88a194a37a8a04c8e42822a0220755bcc63667eb4cbcd52108d27245765176c6c5b2e9a77013aea4d7474c0a1ec01feffffffe80ac9635b6bd91c1935eca6df80876ac8cdc87a2b91e925cfdcc0f06059b2e5000000004847304402204a2b8c311a11920eef4d64e786c5f26ed82d4c1562f2cc0e73fd5a5374c7061e02203693e77f88372a335d1463df4edd062b6dfe2bb895d56d58f3a404c27757378501feffffffedad3357a1a9aeeb8c2771cc6f284db92a2aa31f458e35bb270216015bb0edd40000000049483045022100abad2415b7c6ca9ccf3c52b4008c4d531360f2d6541d9025ec2caa4d764b46da022054f5d2833704686a860fcf978313a3c6c61f16e9a1cf84a3e4ac76c8950dabb701feffffffee85afefc31a99a4616bfb228e1f48691976b900ecdfe838e1310bf5b33fadcf000000004847304402200f7afc12d43432f5303b892b08417743d43a05bf938719428a88c85e255e5b0d02201a12cc706286a1c9329f9e37e62143866563b3773769def6912494a73c17a9f201fefffffff13e4784de0564595f3b4cce57ec0d8a4b72a798feb65f5fbca5b26a3a91d0760000000049483045022100fd3c9b2e02db889ae2bd43537a308a87a7d701bac19083e3a985a93674239e2802206dd36da12f3f2b222ce4387cb91e1098c5f93d25ce95fed0e5d21e6724af554401fefffffff205212771fd3ca5a68340fa307810e44315ae02464b5d8a235ba6bca691bd710000000048473044022062aa2571a91a7e06f0e96570bb3a348296ce7b756ceed48fe69be91f94a6c5c70220631885aa6fc967e40cd1820c83310143884e175227c5434e33b89245598d5e5c01fefffffff31cea9351fddc36393fa996962e204c461a34ff1c6ad243b3a4902440f165da000000004847304402203355527ee222e6bc756ef30c6ad687a21109a5175b1eb27592e9e1938b9e8f850220206ea10896e9e307ee73d33813048fece04bbeda702e11cae8bd61297b73590601fefffffff3c67e78777cc42ae2834bcf5dce5493fbcfcc6e0aabd7608cf4f9c936a37f49000000004847304402207cd40b7d6ca2b869d3f00c0babb484c7a2896c080c593767e0a293acd1505a9c02203a2f8c191b20fe4fb08958b3bb20411834d17f7fa075deb8b2272d22112ec8b001fefffffff3ddc14df664f6e4f59b1f1e25241a61fc69f13125ea5a67edbd03b37d332eb50000000049483045022100a40f81d4e1791d0253a2484656c27994d1e42aaaf77995e9fa6e0eb02480bde30220669c0bfbd0772ec1ad8ca9357eb3ca1100d7b40ed97bb34e23c8cecb42511c7001fefffffff614bd5d83278ad95d8c5bf6fefe59b3675e832cc1c2349d7952aa734fd20283000000004847304402207709f2089f820012e76eaa6221aa0b9776cbdcd0b0b458d400c7c1ca9ed7eedb02200de75bbdae8100b4b27e5deb164e13d596b6661248be45d817b573cdf8cb2c7c01fefffffff67ef42d75fc5d36ff32ab40f5c9f88f279a1173ee1db227a4706aa0480d66ab0000000049483045022100b09aa2cca247052451537f64801ea561506bff82794a8870c077c32c69d0bebc022013bceb4edd8f126af25c07a74d5c16935b0e916cdcc25d49ee335c430400eb2601fefffffff69f0798ab6de485dcfe72391f4cbb1e5f4d39ee8f852b80fd4bb730eabd8e9300000000494830450221009d91a34a7294250ac5b31bc86a2f7ceac8ce79e49d8ac7b3b02ad0cc278f16d102207b9ea41b03e72746a67e7bedfd1cad7f5055a915abdabc13f8e51815f29e983601fefffffff8dd75e7c674cf7bf15f42fcb1256ef4f16b96e0ff6a359bc24c07ba734f09a30000000049483045022100cf9283df82dc2c0d26c2fc9349d16faf2c961919066798705da4afe6fbf27af202207740172e195f5713eff2aeb39d12923625401dea6a0c4b4aa19be3b973c9077601fefffffffa0c47583d4c6f18e12b93764ccf57d2430a52bdd0ceb611924a79c82daf48b9000000004847304402207b46c5dfb4e65c5f91f9770acca2a1ad24a4cdd7e4f27ac9c5e55b14f8d7c00202203b17ab29bd9be1559d550cae9f79728a644682a8aab5db1a1cc3432bad159f4701fefffffffa5ca0440f302bcf118946714dba6e81036e48477ff3a315084fe682aea6d1d50000000049483045022100929668780086aa4c8945fc6d9aaa340ee8ae2807ff2f6a89623ffa102d2bdf6d0220318d3e075a82195af58a66b47c8d62849d69ed1da2e07402d89440a6a77b63ba01fefffffffef369694bf0493161762e49d7ca16f1ba600250d801a848d0ca8d3f2d677d4a0000000049483045022100f7dd5f966156c81a1d2aa694befa6b19e35aa8d7fa199c37a803cd382836fdbe0220669d85a44632a8ea6093b783693c4626ad8c71be4b82b027c4cdfa63682a9a1601feffffff02c5490f00000000001976a9146843838a0aa11686cd0c01fbf470c9c5f302249488ac40420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"
```


<collapse-text hidden title="Response">


```bash
a44feb2e788d0332e283d8ca69c6a20999944dccac93246cbf9b36d841b08c95
```

</collapse-text>


## getrawtransaction

**getrawtransaction "transaction_id" ( verbose )**

The `getrawtransaction` method returns the raw transaction data.

If `verbose=0`, the method returns a string that is serialized, hex-encoded data for `transaction_id`. If `verbose` is non-zero, the method returns an object with information about `transaction_id`.

::: tip
This method relies on the <b>txindex</b> runtime parameter, which is enabled by default on all KMD-based chains. Disabling <b>txindex</b> will cause this method to malfunction.
:::

### Arguments

| Name | Type | Description | 
| --------- | ------------------------------ | ----------------------------------------------------------------------------- |
| "txid"    | (string, required)             | the transaction id                                                            |
| verbose   | (numeric, optional, default=0) | if 0, the method returns a string in hex; otherwise, it returns a json object |

### Response (if `verbose` is not set, or set to `0`)

| Name | Type | Description | 
| --------- | -------- | ------------------------------------------- |
| "data"    | (string) | the serialized, hex-encoded data for 'txid' |

### Response (if `verbose` > `0`)

| Name | Type | Description | 
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| "hex"                   | (string)                                       | the serialized, hex-encoded data for 'txid'                                                                                     |
| "txid"                  | (string)                                       | the transaction id (same as provided)                                                                                           |
| "version"               | (numeric)                                      | the version                                                                                                                     |
| "locktime"              | (numeric)                                      | the lock time                                                                                                                   |
| "expiryheight"          | (numeric, optional)                            | the block height after which the transaction expires                                                                            |
| "vin" : [ ... ]         | (array of json objects)                        |
| "txid"                  | (string)                                       | the transaction id                                                                                                              |
| "vout"                  | (numeric)                                      |
| "scriptSig": { ... }    | (array of json objects)                        | the script                                                                                                                      |
| "asm"                   | (string)                                       | asm                                                                                                                             |
| "hex"                   | (string)                                       | hex                                                                                                                             |
| "sequence"              | (numeric)                                      | the script sequence number                                                                                                      |
| "vout" : [ ... ]        | (array of json objects)                        |
| "value"                 | (numeric)                                      | the value                                                                                                                       |
| "number"                | (numeric)                                      | index                                                                                                                           |
| "scriptPubKey"          |                                                |
| "asm"                   | (string)                                       | the asm                                                                                                                         |
| "hex"                   | (string)                                       | the hex                                                                                                                         |
| "reqSigs"               | (numeric)                                      | the required sigs                                                                                                               |
| "type"                  | (string)                                       | the type, e.g. 'pubkeyhash'                                                                                                       |
| "addresses" : [ ... ]   | (array of strings)                             |
| "address"               | (string)                                       | the address                                                                                                                     |
| "vjoinsplit" : [ ... ]  | (array of json objects, only for version >= 2) |
| "vpub_old"              | (numeric)                                      | public input value                                                                                                              |
| "vpub_new"              | (numeric)                                      | public output value                                                                                                             |
| "anchor"                | (string)                                       | the anchor                                                                                                                      |
| "nullifiers"            |                                                |
| "hex"                   | (string)                                       | input note nullifier                                                                                                            |
| "commitments" : [ ... ] | (array of strings)                             |
| "hex"                   | (string)                                       | output note commitment                                                                                                          |
| "onetimePubKey"         | (string)                                       | the onetime public key used to encrypt the ciphertexts                                                                          |
| "randomSeed"            | (string)                                       | the random seed                                                                                                                 |
| "macs": [ ... ]         | (array of strings)                             |
| "hex"                   | (string)                                       | input note MAC                                                                                                                  |
| "proof"                 | (string)                                       | the zero-knowledge proof                                                                                                        |
| "ciphertexts": [ ... ]  | (array of strings)                             |
| "hex"                   | (string)                                       | output note ciphertext                                                                                                          |
| "blockhash"             | (string)                                       | the block hash                                                                                                                  |
| "height"                | (numeric)                                      | height of the block                                                                                                             |
| "confirmations"         | (numeric)                                      | a confirmation number that is dPoW aware; see this [article](https://docs.komodoplatform.com/komodo/dPOW-conf.html) for more info |
| "rawconfirmations"      | (numeric)                                      | the raw confirmations (number of blocks on top of this transaction's block)                                                     |
| "time"                  | (numeric)                                      | the transaction time in seconds since epoch (Jan 1 1970 GMT)                                                                    |
| "blocktime"             | (numeric)                                      | the block time in seconds since epoch (Jan 1 1970 GMT)                                                                          |

#### :pushpin: Examples

Command:

```bash
./komodo-cli getrawtransaction "a44feb2e788d0332e283d8ca69c6a20999944dccac93246cbf9b36d841b08c95"
```


<collapse-text hidden title="Response">


```bash
01000000660aeb1fef3f0f6e8e9598a2f4b434466b5ccb95e49aa7c4286bc5392d43fa1f2800000000484730440220234b370cddf91b27e172cb5d6257a9807e63cf680a644229147b39d87e597875022047a58509a11b190107a9ff6e08143bd0d450db233518ed26f123bd739576e9c201feffffff0d204965060600f1e79bfd183e7ee1b5b9b61c6379d6c95984cb7cdf79231c4c000000004847304402202ffed5ef972b01ec4290343ab0bc4cff989d0047f2cbc9e8b69f0f3102824c0e02203c7e3214344e6ac430e4f996a8980e7d9172ea1e8c0c238ba32b8930f4d4119301feffffff0d3eba8ce5b6b6ee7d2e804be57dbe4544d7b7169caf5afd6f207c1275e8977e00000000484730440220096fdd062535f200897de2f2dfb7d782499dc5fc24d8e06805eebed6ec125c07022077e4379409bd7c9052608e8cd52cd83b0c9314c623d9b85012eab28e10f8c13601feffffff04f8b24c1eb3aeb01cc483a5b6922eb341da17fd42c944b0bb18998c04fea67e000000004847304402204a8f45abf51333ec7c4491cd5750e5d46785475ebdb0a13a6a946711f17483a9022075805ee9f2130c3938e273c280b6b14b27640349b537b55348c40ede1508938f01feffffff0360b074597abb6e32c319078ea5f83cdfc85d5c892c0388893d8b66876c077b000000004948304502210089c7919c6e7412a1569434f74caf7110bbb0341361384067265c142c8e033b2d02203d5eaa583d727fad487bbb689bf433bac32d907e707043e8f96f8c50fd3480d501feffffff0e2ae757c446029f5dbea36926883744a2d3fe8ee05381c2b4311e7d58057fd40000000049483045022100a0672d882511b01696192965175f3827e65ef8d45b3217b563d0f97f3cab512602205c568b5c1eda0c149976380b38d2f93ee384500bb5eecf6e9f3f2101d649eace01feffffff149c5bbedff321a7810d5db264829ffa5529a4f29ca3a452b0543736339bf0260000000049483045022100981f7f5210e17e1c73fe5083ca7b29a5b1a9dfbbf5474c109069a4b3eecbb5c5022065e21331260c718788b72902da250418b0091537a540e8f6152ae097632637da01feffffff1f9e6624bb5185f0b51d36a3a94982f0d8a325bdf81db90bf67945354a6f40c6000000004847304402204391d39a88d2f8427396bbbca508bcdb3b6897c25bee4c68d357b878419285a602205da8f54aec5bb9253aeaa9b4c4a1a8a2fe602e894422da0279f21f9799a3540201feffffff22e752f465434c0563a7e0b9d104b8633bdbd6073bbe61d17dee0d53ac8220430000000049483045022100d5a4b70ce4542e30a7cfb09ea259405ee202f99b556c88604b06a86419b2e72602202417376668f93e44b404ec2bfe6e797b699367604de296377dfc6944afce722901feffffff2780816ab4fd0177dfff1a98b7783bbefe8d08f339c964d2438b7e73c8ce614c00000000494830450221009d1878ce69f3a438748bcc73de00d531492cd36d2bf7a292bc5bbf67fcf6c774022066e1705510ed5a5177e78a71ba9891d69e11a7a3bc28599d5d18c29c2033a00e01feffffff2da12ef31d8678120d4961c9090035ae9e8f48dcfe4e2f461fb10437473c2bc90000000049483045022100fe0f6284ddb97b4595d77cf7ad5ef4f5caa67cb7c4b6e6ee9812bac076787377022032991f85e1962140673af04a85a442bca3df931ca52c365d3cf24e79b782b2d101feffffff39a00efcf7f678ecf0252ee2b4998a43121aaad28abe518be06a830fd34ae24e0000000048473044022038759690b62c95f80a54d3bde28abdf7dddae992ee4a18c511a4d442da67d758022016aa7dba3da26aa7531731222a0f66cec25c5026cc4903b51dd3fe5483af4cc401feffffff3c5b78d98b3edf510b003cc5723270854313d51ad40859ba08a622f3a269a66900000000484730440220141e545e4ea0c27a630972d474b7d95dd2c9da1a129a7e680016e4ad70c5579102207a3384d8c988bfa526bea0f7cebfb8a8d81ae4b7272d23e83268791fc8eba2bf01feffffff3ca10423750150708e817fe0020a7fd0a687a0456158db659af112dfefefa299000000004847304402205c4e4f8934cea71191f87208bbbaae36b2b3ac4f7282256cc05446cdd1ccc0980220038db0a46e2b06fd61acdf1b47a5de87b787a62a1b65db823c904efa6223129b01feffffff4005c2dd439c35e3f04384142b66871e15a72149218d66be2ca3b13f7e1604b0000000004847304402206b8854445fdb689929143c8daf33fa52ddee06c360073f6262ffea4db0b8b71102200b4d7a166bfa81e8f2570afcd9de338b9a0d7bc72a3962c775205933690f302901feffffff408d53f3499c6db833b4a9b19aa8cf61c95182775a0539efef9c62a0456520c40000000049483045022100c1f028354c1034e61d59999070a8ab554a97f81583d72f38c0f6b0b7a52fe8ab0220538d6fec3f35a595614602203b360730b2f13c3bd879fdadca06dd8a16b90b9d01feffffff43671a7bd5f31ee1642842027378035d73b06d446fbb1666e95638eb0d55d1c9000000004847304402203fc7529cc7a96726728a4aa6a1698fc31bad94d1eadda2a0f74ea8f22d752869022011983a3c457e5c7ffc87b576d877e6f02ab8e08dbda6a94dfbf245315a3365e201feffffff45ee4a5c7a98f315d26c1020b26576500ecae4d6a6a78b3ad169788006e7c76c000000004847304402207a60671e1d0cd3d5d7b8eb2a1b53a0014f30de45f0e379a30435a47e7f9861eb0220689af75a99876c1d1d206869dca223806c45ad64f32cc08cd624936ec6c0600f01feffffff48244290df0dccc781e7d081c731081c2e7e022176cc7b4b31fd92c1e31d970e000000004847304402201972bc346632bcd5166cecbd9d7ca29583c7ad938640d7db9f4bdc6629fff086022019135d7341ef96813a839c6cc14f47c7d2e42c262abbe8747e16c6869cf2b90a01feffffff48c28c27f8303266e0547b8c453b9823baed7a9e06105c09ba4cf65cb2bd5d2b000000004847304402205e40a09a37c939cfa6b5143a2ce596452ecbbd223400922b0001bda694f4c63602205aad66d989167c9bbca130aa489de6286390e55f9e9ef4c5c043c2f13377c7c701feffffff4b28d567f5933d5992559fb19f90115b145db32bd1b6e52d309021da8e6063cc0000000049483045022100ceb282925d7eac742085d5ac48443e9af8b72873fb7a2f96b4e196a58a4b29d7022074790a63adec4088a5d5c2bf1fa80597be0e17afc7490620163a873a2ef1855d01feffffff4d45006be4acc1bf5c69722cb744b967e615d2d35014fc82cf61c2a4905717a50000000049483045022100c6f42ccf0af44182e144aa925b631cab8d90959fa96eb0453335a970e74910d402205e99e1f1d23813e336a3c96efd6e75490f3b5d807f0f2bbc677499cc0b92f47a01feffffff4d8540fa9e580b140359e0a17aac6415ca80072f9ba26fc2b43914092f4702400000000049483045022100b42e72fdb23f4f50af0222d5e590bcc676d60858583dffc1ba8b35730e1c8eb102207cc50ecd38639100131b4c4950cedaac4c4ee37c7a6f87d3ed7fb7eb165559c101feffffff4ff26de89311f83d65a3936e06937f30a75dd50594246d910035bcbe19c0ea6a00000000484730440220425c41bc88fce16ba54f2611a54737d9b5197abc541c730711157b290486cdc6022003f967d0f98864249d80720c65e04c475cbc12c482104aa7e45a06bc9eb080b901feffffff511e169a83c0c0f8ee7163c34fa0e3b024275892419f11a2bb96d4976d3f9b4700000000484730440220136e776a7bfe3fdb5a5b8db2783452ed7cf1fe3c89ec001ed69455a082337e49022057e7dc0ace7ae100a2f2c26291cfe80352b34dfd9269d07468ee2dfba13fc02001feffffff52325adf85f74f38f467bc3a99657f322988add8aebb371bd080088efb95836f000000004847304402201fafc46f92d80a9b4f71a15113ae8e8182dcaa09cff63645db5b858044f329730220160082cc1a3bb262458a204040c3ecc23b276c4558ea095c1b66e20a4004e26b01feffffff532ff452f8423507348c542063deb6f257de711237ff8d718143358128e2c6470000000049483045022100d8dfe5557eae68e8b3da5cc787b14e85fb4d10d2c8a80eda12e69b807319ff9902200b104ae561f1d9c4f0c1646327686f890aed1ea8fb1c1b411f07059517737d0001feffffff5b0d6fe54dce0515e6947f5170478cabb06d1e855365a6b7dbb0118c4450ff0b000000004847304402207fad37e344180882f9cfa3e36d036282a91467ff15fca2f24278f5fa5283b99d0220325dda0a7c35a85cb617bcac369ec0033023c221771cf02f1f877f693f1059d901feffffff5b7db5b32a8e8e8c6307a7d0afec7062637eec39670f1afb08f0b04a50fbc47400000000484730440220752cc9659edbddc78293b1947f84d2bd69e32ef4d5425d4e55df4ca74a7a962402203a755152ab6d38a7ba91f26f476d611cd9c6b27167d6e20b511c4830038d102c01feffffff5cbecf874fd1996cd4e49cd41c98a586c533eac1ebc37df92cf5a9545203f935000000004847304402203af4f03cfed41a4d8387a0859324ce3c40c953582e8848867d06d3aef096deba0220104c18b2e243cf7f076d2833c4fac30e0f5e62b58bc039cba6ce7fe47ea394a101feffffff5d015b907e23b9c5e00907013f66d258fab2f016842f0c8e69346d72b0221dd70000000049483045022100bc3e1c873f25e1a661ef81c109de1758ab13df3fc591540658c5fc05bb1e8c150220309b87661ce039899d5be3b510fcdbb9464ff8cb47af06c016390d79daa7029c01feffffff65c461a04f571b50ab4fe3e367952bfba755eec9b6ed23cb460ab3bdc873fff80000000048473044022037b231fec860afbac51e3034e1308e1873d87dc586258ad8c7ede04cf0fab97e022012eceff07cf09a2c3d2f6884ee885ff9f8e7526de8c08b54e5e538ab223bb31b01feffffff686da3cbb1a1af26c2c01793345a5fb8ee47829aa907ab95b8144fbeda1707920000000049483045022100a0d89b8331105f34528f2c9687f53897a2a14f57cde1390513b4d0fda530a4200220573800bfa5cba98af2a08fa3e87fd0142fe1db6f391a4d160f70565b1078210d01feffffff6896423421d7e1193a7b88d2fbf1eef1c46f637e7a49217c171a18852d29e8d60000000049483045022100cde87af1eb614761149aef298153c541e24ff45345f99dbef18bf2379d27f347022063115fb6b37842eb7cc4d8910ccd047635a9674e72d9418894614014c19d583a01feffffff6a0f6f77ae1d42dc96c39c620f401f32c9774f18f1a039e97b4b405b8aaa757d0000000049483045022100a82d1afe573bfaf0668b3acbec55f68bcbb58bed7b806d59837c32f3560cd1d70220198904866e0bd9d19cc465cf09e256c439ad5309caffa347b8c416443ed07a0c01feffffff6cfa0bcd2e2689498496dc4b15feb0fc535667a88005f2c88198265bb1f8f3d8000000004847304402207917043acb4879438625ace42109cc1bee16054222473d2f975b3edf27286f3602207413e93cf5e696de7c0d210dfa70cd4dd9e62e78ed86a3d99682ef8ea5c064cd01feffffff705456a54cb0b94ec15890bd957dd778581f606270a331ad5b15ef48684a5fc4000000004847304402206668503174e874bc09d999d7bc47f82a5ac47c3f1bc1c43ffa1cca74c1cde4410220616df31f268371b61d83acdfd394a7bcd8da5817174faa29b51c648786c5405a01feffffff718076a7dd771121e817b98e98f46c7f52722d6cdfca9130203fe5965f0a3c00000000004847304402200f1c2ef04cf5fceacb53724360ce3af3794d14ef8a47d4d09c8e3b95b20e48770220659021ba00a68e5f2f4053ec904cc7e65b5bd5db76ff45a9be4ba35ad1a2d0a201feffffff780ed86aeead9747bc96bf7053b02ada6ac566481763e70c29d3d00162bc7b530000000048473044022027f04c7d149ed6c9c72ce3956917444cb5f943aa95adb694ec30ef53c930cfe202206dc14b5f1d59b6724fea484501e36fe7bf40849614921cf76130ec20665f35d401feffffff7b3ad2352be9169286629dcf064fa769c23a8aabd468c30eec35a0c79b61f1f80000000049483045022100c4a61d02e54b0c0b8a9749d394d6447326bf66f3524388b8854c5585ad71704702200b0e71e178082df01e66d0bb72aad0238b0063018cae190c2f21c0fbd78a462001feffffff7fc4676bc415a467bd10d303eacd54617acfb6876945e3bf1217dfd208c6d58d0000000048473044022064ab0c92b7cb2205f1d7af0a2faa441eac041cbb892b166b8f1f060019301546022066924807801b03876a0ac1830eb355ed26c7a67b9e28fcb0b3c6dc5d3c8ca1db01feffffff80fe96eb05e5fcf89fa7e19b1a653e0b8164cba383e2d2ff5934a61c42698cb100000000484730440220515b9c588036449b326ab8d74679cf65c7fe780a03b23ba8428cf829a070abd402204c71e343cfe18e166b7259509b47dcbec0b5b29a764e4dbd29a39479ef60d34601feffffff875ea454109c4725766d372f0fe395dd4744737378b3a246094dc0db7fb6e95f0000000048473044022039167229a3f6ece80aebdfb425608c855989a0e7934abe0c4fca1175f60d46b5022069f57fb057a537cd95e5ebd6a93709e0bffde3d05bd01322f08d0fecef7c061f01feffffff87b7c1fd810834fdd892975a795b9e6c1b1aa398436ae3ecb19bce62ac11aa4e0000000049483045022100ab701a93c793c182bd54f06f80de91c03e36fa9b33b220a91d028f2196d329b5022020e23cff44abe2510b50ce0a8cab286d3ae17c59d8aebd20b42613b764a128c801feffffff88b22fca9de29db1901e9c8accbf1caf8fd4d5a37802b3bf5142038809ee3c6900000000494830450221008ade6fbaec28bf02b3914ffc62c4e0dd7da3d50b41b1054653826a38573e6c13022032d2528595fad675d3f01aad532bdd5ca64960a9cdec35822bb0e69b57fb78ba01feffffff89e4b0f44e022cf53736520aef84a324100f19f4f0862c9d2150b686e951d3740000000049483045022100e69902cff246e6ae5ae8a502aaf2ecc0f8505b8546b17fef18a6e2dde8703bc60220121b6293f7c24aad7766900a746693b9e30ef4e8cc1ca01b2ed4537b47debd2f01feffffff8e0611807aa639621ca6be13a2eda8d98c32867041f929dbbef7742c7c867db000000000484730440220710257eb2b9f5e7b9517770f81c0999a7fcd5b798d8665e0674abec0909b5bad02207bcbcebecb36661cbc8793575f62524dac431fbee3f9c02fb0d854933357694001feffffff8e77d64182b666e50377b3c9a39395735a89d2c90f5ff62024143f2c25ea51d50000000049483045022100ec5f6927e57df66eefcd1275d4236f38841466cdb29aa9ed8c6f8b8f64e0cc4302200141c090ae22c294844bd0b5179f97fd4b98cee426dfb795c3288f37f67a70e401feffffff8fe0b55ad0e150fbfe8d263c44527b967c44fd79ebbe88a09a91a4318f1c17c40000000049483045022100bbaec071109be2005be905bc0b2877286f24cfdb4d8431a31c8f57d802db31270220345e56f174738a6a191ef0a91c4cdeb686dd552d8992ea6ce7517e0ff9cafad001feffffff91ad86b51f541d480383681c4faa26575f723154ed6e39cb76e03317c8984c610000000048473044022046628accc862ea34ab15232f97505cf673d8bfd23d6316677e524e3643e92a20022078414e64419c96474fe2559c30134ac4c08b5a0617a0dc9bd1ce09e85a8df89001feffffff927673288f7c95f452e035b65c8cd46a57e58451b93dcfecfae0c33f00b4e5350000000049483045022100b9e84841140ae7b9bf08f82e014247a8c270d4073b457fbee74743c413e0b4370220292fc63652cd2fae0d1baf9c705de61478b2ec8d4623b9ecaf2aca715c1e69d801feffffff9477cc8e7dddfa7d183bfe0771def3778e7b2641996a3ea52f42d085d4007d190000000048473044022073842db3431ea57cb4aa05435648817bacb36a623e2528817e399126068fbd8b02206744687cfc5587f07d6a507eeeb2aaff45731b3dd9222c40f2b62b60e4db59b301feffffff948a1e5af04f265b29fd23700d1ac9926b5bed71ed5b2968f29abaa15036848c000000004847304402207c5440b72bc608cdf4c7fad0bccdc19d43877e31b22fe3f5873f558a6068e28c022013e3a5b0b11eeec0bfd5cc8317c8a61ccf28ce19a1b50fd7759502a350b991e401feffffff98a1cd6c74d9d42f88032e74182cfe8e71f125eb7eb1b49e8334d5b17bf4d07e00000000484730440220393955bb76c236467d92d42091a290631cbcd9ef3c3f177ace6f1ce73abe319f0220153d5c0aef39f5cea8ef53822993e374dc6d66a758d599f25d2e934d8c97769601feffffff9a7fefd1b1409dfc23d6be09dab5692cd9f6c59c98b2d7b0231f40b396999c2b000000004847304402201f9d944711c3ee35c47b68ddac1a0e1f728884847d8df788b398157de22e9bbd022005d97ceca294e96f5484420189d7a99b9850ecb2c849223ddb934c6c772e32f401feffffff9b0ed42c0446f8ea3c19b47be97f42d1a546bbd6a5a311cded5c1dd16c3606d40000000049483045022100d42b4c9c6fbcbd65d69f0967cca562227f8fbab7ca2727822eb9eb4d0ce8e77a022049d752916ee19c285675786aa04c37d7025e2cef6907f70849f55cda414f3fb501feffffff9ba78bb678f5b7a289ca37b49835bc6ad383e2089dd3711833383c0c6e6d40cb000000004847304402205d3a652a05971d324947fb9d4d15e98393262498e09a6d8fdde7422af91d341a022070e017f2edf61310cb724401a451c1d2be59175e68b49e5c1f82f20084f0b2e501feffffff9d2bdc85ec46fb0457dd41f02f5f7b203ff8c844062f3376c7f86cf2144dc6a6000000004847304402202f93a774f96364ad8fdf46132f47dde1fac4b833d1cf7c20c6c69f03c605c09702207cf7ef42d8c97b96e349d023efd9e7e0b1fd74c50561290d16f3f122e1ead8fb01feffffff9dc64c498135ebd6c025d7d43ae71120d6477bcbcd9828aebe21911ea21655c80000000049483045022100f72cd391c5dd1bc77de0605a3cb35c246a5c1cc14e7b9b3fc1cdd90fd42cfa4b022069049bca8a2f5100ada2a407a2354d04efa94573a7cd1bfa4130cde66e481a1001feffffffa0c3203666c02ea6f958408c8f2241b4d6e3a8beb9ab54736fe73621feb57ce40000000049483045022100daa9b7a48975348b41dfdf8b5e4614721fd018b950d3cec1d7009386bffddb470220522220c5f3ad8f1f19cb0eafea1aae7a3489cdd3dcb3d64f2ce75bd2066a73dd01feffffffa14e8b18777a8710e58942b56d094243151299f033cc21bb3ad3dfce2b3e77ad0000000049483045022100a9e02b9ad05da478a1cf06a235743d202d1f9e8c2e969ea8b1b7d5fe6778fd9602203880f139bf40766d264c2d7f858eb36dc2257b4cacd116cacca400645f80680401feffffffa262a97a28944d41d47c7f8788528c797d322f7abc0390c20bf22e3b835e127a0000000048473044022059a9da8cb72d3d3967ad3adcfb400ee6043ee088707424728de63cba9361da2102206ca3e6681ff149bff11135315d431e24e05aa3c794b41ef0822b8969b0d1597401feffffffaa3c2496b8237d865f81ff0bb8eb01bf2b69ee806463816ec83b60cace7a5833000000004847304402205637e4e9538fa7489e017da763bce9182c5e78492fe23d5366c0638af15c7eef022034e9a552d342053c4184cea58684ffbd0881467cd0a40f009db155275deae1c001feffffffabfc5cf05834234e1ee8a3c87c8de5d6a07f9530a09f2b34d9303ef30d8646cf0000000049483045022100a68eff499320029204dd73f707d36d65583d21ebfa063d770f55139ed546ea8102206646e141b55f506ed457f24311eeec6e302833f69cd08c9ea3086c78f82dfd3801feffffffa2d1512943366ab64e6d1749b81f993e830e5b546a87b9bd68fe0c5c865da953010000006b483045022100c686f7a4b2e8af7deca60cb20b0c626609548f5426dda6bf33207f82923e0ea202200d9c36dc490f014d0d4970ce8c18621d39b6c0c134c7e43da0f62326725598ba01210360cfa32fd05b4c3bc270fc6e8c891af45a149d34664746ffc67f5cb49c6b5f5bfeffffffad976a10bc9ebe391cee6b83191520a9d0fb62a24e969477a4cc6dd26b29e4da000000004847304402203385b46d676be7f898b316fdcf56a8521bda2224ae891b48be05cd880ae7a0e502201f6de4117623336529e445e0943c519e80150cf0d4a5b1427766d06db2d7a26b01feffffffadd486a6d94629b19713d723301b135c11af92b5ed69e6f0b9ed07d417078b2400000000484730440220575a03c7a331f65defeab66ab1404503a700ece0780889266bd1866ff806096b022069348e446f67f551949267b49861e96904e0b47c75a220aa1cd7ffec3b8fa7d801feffffffb04574d6517ca90a26e07a749ebcde23f67f7ef8a594b23e699fa084529d96e80000000049483045022100948f7ec200d121bdea79b29bf1c608c6d5e007aec62acfb3a5cbcae84ce457490220431802ca646caacfeaf1827e1ceb70f07752413c65bb50db24957166603bab3f01feffffffb2197245ddc53b189c18d05d167210fd6291c6b9116862144c3654da5bb55d06000000004847304402204def3dfa143d5887b4075f45d92a91df9825f1e08bee1c29901c1f117ab30df302207eff300c5347d13f531ec36789a6f4f66c07149ff4c86f21107d0f21dc400d9e01feffffffb4b953583df750085d727027674f69c6ba63513915941e42924a462d5bc15c9b0000000049483045022100a267fdd914d9ce78ca819e08312fb2b3c0f9c395bd30d22b26ea8c6a8af3618f0220548b821abd8f1f1fec1db25fbc277cbfc5840e47185a830174a97b74645af60401feffffffb7f5149ac38efb591ad8c3a46ec9e979d5647c964190a135342435b55484dd570000000049483045022100d1d05a271a8516b9357b0e3e73d5413aa138ae9a10c1ccbe30ba7ef15994c24202203df3584a99260ff637db9515361b258e6cf7fbbfa15278b29173dd2c4f25264901feffffffbfc02225e0c5351bbeb63adb8e3b7859752363a5b85f5b2a6da5240a449e8065000000004948304502210082c85c2c7d8316e9e3cfba9f5bafcdbbeaf0509c3e896bd4121f19e4b82cbfe6022070d7650714cb1975215fe109b8f1da2eea866abbdf05e487eb1d75e12776e52d01feffffffc0def09bb3cbf791c52764cceadd389199be9d7603cc3d6d213ba45ffc98518d0000000049483045022100841df35265191f063a9ad2414ec9b36fe39ef9ae13c9fde0e82d67ec9bc654e302206dd8523cf58547ab425ea55a8d879e75d31558701d4f57d76b0f67736ca5e5ea01feffffffc5c9957c3a3e03204e603c313368d3c01206320beddfd28b850fd17b09a61a410000000049483045022100c3467add04b9e313238376a0d3867bc5b59fca8b2eb76bcc18fbc0b0805e63960220578a2cf379848771a9b13e12559cd130853c7f02d9ab497a74f3305aeaf7b00b01feffffffc64396e634d716a5ae280d9fd821507239d7b25a812eea6751254e462c8a73a50000000048473044022040e5e55b23846cbd5e0af588564e5501d58cf2a18eb485c562352fe2801230d002200c70fcf828a81c1cfb856a2d2cc9de21f2564e6080b2f84f44c65b679f49d09c01feffffffc69c9cdd6825a657be1a06008f73b78cf185a9d195ba771451ca1ec09ce54d4f0000000049483045022100e10488858800081f775278c5d844ba2c2cda71ebb4a822d028637191e13efb2602203f7e7f580dad9d7ed1d4cda38222095d8377917c7d4e90c8abb4b9bf3a40975c01feffffffca6112fdc1db1a441961f6eb62b492c1397732cc5519d40f6aa335612f42d39c000000004948304502210097ed9842254112825356823d7365ce8d0bbc973702be7f25951e21f48fcd6e5702203a0aab0ef62926936815e1d9490b335359f766d0ace9b858d59bbd8ba26cb1d901feffffffcb15dbc245dec1ef8cb8e25ef11921ca804c023e6ad803ebcb2a7b98380b60b30000000049483045022100bb9285cab4a68dcb68b46687b59ab1769a0b5aa1ea6f45488e189f58e698321f02205e6499101ee3b0f005e6d3ba151282c236a79d32488e16b1867c6e70c8f7f51001feffffffcfe47e6ce0780c4594a2d1b76a2906c0a9ea32d39a73c244aa9d5d8dea67248c0000000049483045022100a4681709fd0b79ceaddd9d695bd5c740391970a1feff2dd3a90674d20ca95a2a022076dbad3df0c4f8158eba4a087650feeeb1736b5a8b03aef15f698be4fc668abd01feffffffd0a4d502c22cea7da0d1a3cf99aef598b74fad19a6de35f21c6fd0d1b8cf275600000000494830450221009d8a22fe94f18d0a65e8f188b702b4023948e236ac2efd36bfb20d2054e1d55402201383ab2ed9465790eb9496483f10f54e40ae201fb98358cbdd71a0e650ad1b9701feffffffd25452b8575cafca10255179f95c8c66e255329220b7ff645af522af7b8038320000000048473044022013581d5e4794efb6df6dbe04339478ecf019493814d9d52390b6cc790c998762022006aef7acc10019a8cfd7ae99e11e5877a9cf1a5a6ef084549815435f7b681e1801feffffffd3922dfd1a65216bbcd4646d0cbcfa70cfe587775cf4c673043c57061f48d763000000004847304402200bc9095368e4409c7debdf0871f18af1d36e1a4851e4b948a1ce362926550611022034fb19afe76cf133e4bb561fcd3cfe7f3d49743fd75022c124b6e45bd9f503cd01feffffffd75c777645d534009bc8e7b2c0b58a78cd63f41f47f6cd30868aeaf9b55e477000000000494830450221008f4a11d94e97f02e3226c509c70a3582a280ea3bf33309ec392ceeda7a59567e022044bf0d858442058b7c5fd8c73e47287f9283e957fdb39fc005cef70e22b0c07001feffffffd8f837530faf0d9b50efe1d79aed453b11916d565a2b9c40a380a85f0be2af6b0000000048473044022065ac672cfaffe8f8d02fb8064cb54f4d335e7af222452ee71c9b249602cbfcac02202cdb7e8cc05c52db51b71a05258abaf0810d61199eff9ee0ea37d8c373a876ab01feffffffdbce76e284668c829366dafd00ae4884ea39b2aa597cc1b4d2a37991a9b2ea56000000004847304402204480dd6aac1167bb49f32fc04feaa3a7c19ad6cba48479cb72dc7d0bd71ca279022036e654a48cadceba49dbb097892ce5d90d8f082460fb18776d353e9d832ba83301feffffffe481d9493d67997104c12972b7c8a73fb87b16e228665bb784436fc0f58d7e66000000004847304402203645fe9770f3851392a85b8dc9dd405ab13fd8434122f6763de459129527fd0702204d240e91298a1487d496feb320dee028df7dbb5c9236e5d62a4964347f97279001feffffffe7a22d3d87255e4adaab9a6fd8a72320299a6902426424aa8b2b89b7c3b0c0950000000049483045022100b362e030a6739f020622f0f7e34c48fc4ff6147ed88a194a37a8a04c8e42822a0220755bcc63667eb4cbcd52108d27245765176c6c5b2e9a77013aea4d7474c0a1ec01feffffffe80ac9635b6bd91c1935eca6df80876ac8cdc87a2b91e925cfdcc0f06059b2e5000000004847304402204a2b8c311a11920eef4d64e786c5f26ed82d4c1562f2cc0e73fd5a5374c7061e02203693e77f88372a335d1463df4edd062b6dfe2bb895d56d58f3a404c27757378501feffffffedad3357a1a9aeeb8c2771cc6f284db92a2aa31f458e35bb270216015bb0edd40000000049483045022100abad2415b7c6ca9ccf3c52b4008c4d531360f2d6541d9025ec2caa4d764b46da022054f5d2833704686a860fcf978313a3c6c61f16e9a1cf84a3e4ac76c8950dabb701feffffffee85afefc31a99a4616bfb228e1f48691976b900ecdfe838e1310bf5b33fadcf000000004847304402200f7afc12d43432f5303b892b08417743d43a05bf938719428a88c85e255e5b0d02201a12cc706286a1c9329f9e37e62143866563b3773769def6912494a73c17a9f201fefffffff13e4784de0564595f3b4cce57ec0d8a4b72a798feb65f5fbca5b26a3a91d0760000000049483045022100fd3c9b2e02db889ae2bd43537a308a87a7d701bac19083e3a985a93674239e2802206dd36da12f3f2b222ce4387cb91e1098c5f93d25ce95fed0e5d21e6724af554401fefffffff205212771fd3ca5a68340fa307810e44315ae02464b5d8a235ba6bca691bd710000000048473044022062aa2571a91a7e06f0e96570bb3a348296ce7b756ceed48fe69be91f94a6c5c70220631885aa6fc967e40cd1820c83310143884e175227c5434e33b89245598d5e5c01fefffffff31cea9351fddc36393fa996962e204c461a34ff1c6ad243b3a4902440f165da000000004847304402203355527ee222e6bc756ef30c6ad687a21109a5175b1eb27592e9e1938b9e8f850220206ea10896e9e307ee73d33813048fece04bbeda702e11cae8bd61297b73590601fefffffff3c67e78777cc42ae2834bcf5dce5493fbcfcc6e0aabd7608cf4f9c936a37f49000000004847304402207cd40b7d6ca2b869d3f00c0babb484c7a2896c080c593767e0a293acd1505a9c02203a2f8c191b20fe4fb08958b3bb20411834d17f7fa075deb8b2272d22112ec8b001fefffffff3ddc14df664f6e4f59b1f1e25241a61fc69f13125ea5a67edbd03b37d332eb50000000049483045022100a40f81d4e1791d0253a2484656c27994d1e42aaaf77995e9fa6e0eb02480bde30220669c0bfbd0772ec1ad8ca9357eb3ca1100d7b40ed97bb34e23c8cecb42511c7001fefffffff614bd5d83278ad95d8c5bf6fefe59b3675e832cc1c2349d7952aa734fd20283000000004847304402207709f2089f820012e76eaa6221aa0b9776cbdcd0b0b458d400c7c1ca9ed7eedb02200de75bbdae8100b4b27e5deb164e13d596b6661248be45d817b573cdf8cb2c7c01fefffffff67ef42d75fc5d36ff32ab40f5c9f88f279a1173ee1db227a4706aa0480d66ab0000000049483045022100b09aa2cca247052451537f64801ea561506bff82794a8870c077c32c69d0bebc022013bceb4edd8f126af25c07a74d5c16935b0e916cdcc25d49ee335c430400eb2601fefffffff69f0798ab6de485dcfe72391f4cbb1e5f4d39ee8f852b80fd4bb730eabd8e9300000000494830450221009d91a34a7294250ac5b31bc86a2f7ceac8ce79e49d8ac7b3b02ad0cc278f16d102207b9ea41b03e72746a67e7bedfd1cad7f5055a915abdabc13f8e51815f29e983601fefffffff8dd75e7c674cf7bf15f42fcb1256ef4f16b96e0ff6a359bc24c07ba734f09a30000000049483045022100cf9283df82dc2c0d26c2fc9349d16faf2c961919066798705da4afe6fbf27af202207740172e195f5713eff2aeb39d12923625401dea6a0c4b4aa19be3b973c9077601fefffffffa0c47583d4c6f18e12b93764ccf57d2430a52bdd0ceb611924a79c82daf48b9000000004847304402207b46c5dfb4e65c5f91f9770acca2a1ad24a4cdd7e4f27ac9c5e55b14f8d7c00202203b17ab29bd9be1559d550cae9f79728a644682a8aab5db1a1cc3432bad159f4701fefffffffa5ca0440f302bcf118946714dba6e81036e48477ff3a315084fe682aea6d1d50000000049483045022100929668780086aa4c8945fc6d9aaa340ee8ae2807ff2f6a89623ffa102d2bdf6d0220318d3e075a82195af58a66b47c8d62849d69ed1da2e07402d89440a6a77b63ba01fefffffffef369694bf0493161762e49d7ca16f1ba600250d801a848d0ca8d3f2d677d4a0000000049483045022100f7dd5f966156c81a1d2aa694befa6b19e35aa8d7fa199c37a803cd382836fdbe0220669d85a44632a8ea6093b783693c4626ad8c71be4b82b027c4cdfa63682a9a1601feffffff02c5490f00000000001976a9146843838a0aa11686cd0c01fbf470c9c5f302249488ac40420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000
```

</collapse-text>


Command:

```bash
./komodo-cli getrawtransaction "3ac97fdd33c713857c1aac8de58cee5d51c768619602b969db9c752e65b28d69" 1
```


<collapse-text hidden title="Response">


```json
{
  "hex": "0400008085202f890193b9bc75f8d057088c61a832cbbef4e4e6792eefce990bc77adc65056eb509eb010000006b483045022100bd390bb79971e15054cd203098d9109c0dac0ca20413ba5d9bfda66095b80ae902204d9afc50892fa13df30131a3f1fdbf7d1426307599c48cdf3069eb80de99660b012103ab19ae57aa6e013a660f82b5ffd1434d28c7a15f14c0b2eb40dae614e00b0374feffffff0220cbce3b280000001976a9140a11a6cd3eb3cc4005f6f8d1e8bfd47be9e99c6188ac402a41510d0000001976a914a90b2782f35e63d9d2a0f57ac37baa4d9869d7b488ac1b838a5cfa5b13000000000000000000000000",
  "txid": "3ac97fdd33c713857c1aac8de58cee5d51c768619602b969db9c752e65b28d69",
  "overwintered": true,
  "version": 4,
  "versiongroupid": "892f2085",
  "locktime": 1552581403,
  "expiryheight": 1268730,
  "vin": [
    {
      "txid": "eb09b56e0565dc7ac70b99ceef2e79e6e4f4becb32a8618c0857d0f875bcb993",
      "vout": 1,
      "address": "R9kXMEiPQrFrDgNtnc7nYAQsDmLRXF2F5n",
      "scriptSig": {
        "asm": "3045022100bd390bb79971e15054cd203098d9109c0dac0ca20413ba5d9bfda66095b80ae902204d9afc50892fa13df30131a3f1fdbf7d1426307599c48cdf3069eb80de99660b[ALL] 03ab19ae57aa6e013a660f82b5ffd1434d28c7a15f14c0b2eb40dae614e00b0374",
        "hex": "483045022100bd390bb79971e15054cd203098d9109c0dac0ca20413ba5d9bfda66095b80ae902204d9afc50892fa13df30131a3f1fdbf7d1426307599c48cdf3069eb80de99660b012103ab19ae57aa6e013a660f82b5ffd1434d28c7a15f14c0b2eb40dae614e00b0374"
      },
      "value": 2300.0,
      "valueSat": 230000000000,
      "address": "R9kXMEiPQrFrDgNtnc7nYAQsDmLRXF2F5n",
      "sequence": 4294967294
    }
  ],
  "vout": [
    {
      "value": 1728.021,
      "interest": 0.0,
      "valueSat": 172802100000,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 0a11a6cd3eb3cc4005f6f8d1e8bfd47be9e99c61 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a9140a11a6cd3eb3cc4005f6f8d1e8bfd47be9e99c6188ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": ["RACRytPnrER2Mae5tKhnXnW5FqJSxLX5FY"]
      }
    },
    {
      "value": 571.978,
      "interest": 0.0,
      "valueSat": 57197800000,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 a90b2782f35e63d9d2a0f57ac37baa4d9869d7b4 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914a90b2782f35e63d9d2a0f57ac37baa4d9869d7b488ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": ["RQh1dxD25pU2NbhprGTMUsiwPzw1GJBeah"]
      }
    }
  ],
  "vjoinsplit": [],
  "valueBalance": 0.0,
  "vShieldedSpend": [],
  "vShieldedOutput": [],
  "blockhash": "0d1b5c0a59353f4290c52075cffadb32aeec6a1cdec9fa5625f9206ca6417a2f",
  "height": 1268711,
  "confirmations": 1,
  "rawconfirmations": 3,
  "time": 1552581666,
  "blocktime": 1552581666
}
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawtransaction", "params": ["3ac97fdd33c713857c1aac8de58cee5d51c768619602b969db9c752e65b28d69", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "hex": "0400008085202f890193b9bc75f8d057088c61a832cbbef4e4e6792eefce990bc77adc65056eb509eb010000006b483045022100bd390bb79971e15054cd203098d9109c0dac0ca20413ba5d9bfda66095b80ae902204d9afc50892fa13df30131a3f1fdbf7d1426307599c48cdf3069eb80de99660b012103ab19ae57aa6e013a660f82b5ffd1434d28c7a15f14c0b2eb40dae614e00b0374feffffff0220cbce3b280000001976a9140a11a6cd3eb3cc4005f6f8d1e8bfd47be9e99c6188ac402a41510d0000001976a914a90b2782f35e63d9d2a0f57ac37baa4d9869d7b488ac1b838a5cfa5b13000000000000000000000000",
    "txid": "3ac97fdd33c713857c1aac8de58cee5d51c768619602b969db9c752e65b28d69",
    "overwintered": true,
    "version": 4,
    "versiongroupid": "892f2085",
    "locktime": 1552581403,
    "expiryheight": 1268730,
    "vin": [
      {
        "txid": "eb09b56e0565dc7ac70b99ceef2e79e6e4f4becb32a8618c0857d0f875bcb993",
        "vout": 1,
        "address": "R9kXMEiPQrFrDgNtnc7nYAQsDmLRXF2F5n",
        "scriptSig": {
          "asm": "3045022100bd390bb79971e15054cd203098d9109c0dac0ca20413ba5d9bfda66095b80ae902204d9afc50892fa13df30131a3f1fdbf7d1426307599c48cdf3069eb80de99660b[ALL] 03ab19ae57aa6e013a660f82b5ffd1434d28c7a15f14c0b2eb40dae614e00b0374",
          "hex": "483045022100bd390bb79971e15054cd203098d9109c0dac0ca20413ba5d9bfda66095b80ae902204d9afc50892fa13df30131a3f1fdbf7d1426307599c48cdf3069eb80de99660b012103ab19ae57aa6e013a660f82b5ffd1434d28c7a15f14c0b2eb40dae614e00b0374"
        },
        "value": 2300.0,
        "valueSat": 230000000000,
        "address": "R9kXMEiPQrFrDgNtnc7nYAQsDmLRXF2F5n",
        "sequence": 4294967294
      }
    ],
    "vout": [
      {
        "value": 1728.021,
        "interest": 0.0,
        "valueSat": 172802100000,
        "n": 0,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 0a11a6cd3eb3cc4005f6f8d1e8bfd47be9e99c61 OP_EQUALVERIFY OP_CHECKSIG",
          "hex": "76a9140a11a6cd3eb3cc4005f6f8d1e8bfd47be9e99c6188ac",
          "reqSigs": 1,
          "type": "pubkeyhash",
          "addresses": ["RACRytPnrER2Mae5tKhnXnW5FqJSxLX5FY"]
        }
      },
      {
        "value": 571.978,
        "interest": 0.0,
        "valueSat": 57197800000,
        "n": 1,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 a90b2782f35e63d9d2a0f57ac37baa4d9869d7b4 OP_EQUALVERIFY OP_CHECKSIG",
          "hex": "76a914a90b2782f35e63d9d2a0f57ac37baa4d9869d7b488ac",
          "reqSigs": 1,
          "type": "pubkeyhash",
          "addresses": ["RQh1dxD25pU2NbhprGTMUsiwPzw1GJBeah"]
        }
      }
    ],
    "vjoinsplit": [],
    "valueBalance": 0.0,
    "vShieldedSpend": [],
    "vShieldedOutput": [],
    "blockhash": "0d1b5c0a59353f4290c52075cffadb32aeec6a1cdec9fa5625f9206ca6417a2f",
    "height": 1268711,
    "confirmations": 1,
    "rawconfirmations": 5,
    "time": 1552581666,
    "blocktime": 1552581666
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## sendrawtransaction

**sendrawtransaction "hexstring" ( allowhighfees )**

The `sendrawtransction` method submits raw transaction (serialized, hex-encoded) to local nodes and the network.

Also see [createrawtransaction](../komodo-api/rawtransactions.html#createrawtransaction) and [signrawtransaction](../komodo-api/rawtransactions.html#signrawtransaction) calls.

### Arguments

| Name | Type | Description | 
| ------------- | ---------------------------------- | ------------------------------------- |
| "hexstring"   | (string, required)                 | the hex string of the raw transaction |
| allowhighfees | (boolean, optional, default=false) | whether to allow high fees                       |

### Response

| Name | Type | Description | 
| --------- | -------- | --------------------------- |
| "hex"     | (string) | the transaction hash in hex |

#### :pushpin: Examples

Create a transaction:

Command:

```bash
./komodo-cli createrawtransaction '[{"txid" : "a44feb2e788d0332e283d8ca69c6a20999944dccac93246cbf9b36d841b08c95","vout":0}]' '{"RHCXHfXCZQpbUbihNHh5gTwfr7NXmJXmHi":0.01}'
```


<collapse-text hidden title="Response">


```bash
0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa40000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000
```

</collapse-text>


Sign the transaction, and get back the hex:

Command:

```bash
./komodo-cli signrawtransaction "0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa40000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"
```


<collapse-text hidden title="Response">


```json
{
  "hex": "0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa4000000006a4730440220242c38740261799f9b6ccbde8f941e2567e86c84108c508d108d062ab9677b6e02206fea089b28c6d66d1c8f2343e1de7960dadafa3cf268c00f7dbe391cd8b9365f01210384c0db4f1eaa142a2745742b942f989375dbec32c55310a793225bb5c43cdc98ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000",
  "complete": true
}
```

</collapse-text>


Send the transaction (signed hex):

Command:

```bash
./komodo-cli sendrawtransaction "0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa4000000006a4730440220242c38740261799f9b6ccbde8f941e2567e86c84108c508d108d062ab9677b6e02206fea089b28c6d66d1c8f2343e1de7960dadafa3cf268c00f7dbe391cd8b9365f01210384c0db4f1eaa142a2745742b942f989375dbec32c55310a793225bb5c43cdc98ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"
```


<collapse-text hidden title="Response">


```bash
f1e041b2e2f1dafd331535d8277193aa27c33309a801949e0739a6b31c3d8a56
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendrawtransaction", "params": ["0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa4000000006a4730440220242c38740261799f9b6ccbde8f941e2567e86c84108c508d108d062ab9677b6e02206fea089b28c6d66d1c8f2343e1de7960dadafa3cf268c00f7dbe391cd8b9365f01210384c0db4f1eaa142a2745742b942f989375dbec32c55310a793225bb5c43cdc98ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": "f1e041b2e2f1dafd331535d8277193aa27c33309a801949e0739a6b31c3d8a56",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## signrawtransaction

**signrawtransaction "hexstring" ( [{ "txid": "id", "vout": n, "scriptPubKey": "hex", "redeemScript": "hex" }, ... ][ "privatekey1", ... ] sighashtype )**

The `signrawtransaction` method signs inputs for a raw transaction (serialized, hex-encoded). The second optional argument (may be `null`) is an array of previous transaction outputs that this transaction depends on, but may not yet be in the block chain. The third optional argument (may be `null`) is an array of base58-encoded private keys that, if given, will be the only keys used to sign the transaction.

::: tip
For full details, please see <a href="https://bitcoin.org/en/developer-reference#signrawtransaction">the linked documentation</a>.
:::

### Arguments

| Name | Type | Description | 
| -------------- | ------------------------------- | ------------------------------------------------------------------- |
| "hexstring"    | (string, required)              | the transaction hex string                                          |
| "prevtxs"      | (string, optional)              | a json array of previous dependent transaction outputs             |
| "txid"         | (string, required)              | the transaction id                                                  |
| "vout"         | (numeric, required)             | the output number                                                   |
| "scriptPubKey" | (string, required)              | the script key                                                          |
| "redeemScript" | (string, required for P2SH)     | redeem script                                                       |
| "amount"       | (numeric, required)             | the amount spent                                                    |
| "privatekeys"  | (string, optional)              | a json array of base58-encoded private keys for signing             |
| "privatekey"   | (string)                        | the private key in base58-encoding                                      |
| "sighashtype"  | (string, optional, default=ALL) | the signature hash type; the following options are available: "ALL" | "NONE" | "SINGLE" | "ALL | ANYONECANPAY" | "NONE | ANYONECANPAY" | "SINGLE | ANYONECANPAY" |

### Response

| Name | Type | Description | 
| ----------- | --------- | -------------------------------------------------------- |
| "hex"       | (string)  | the hex-encoded raw transaction with signature(s)        |
| "complete"  | (boolean) | whether the transaction has a complete set of signatures |
| "errors"    |           |
| "txid"      | (string)  | the hash of the referenced, previous transaction         |
| "vout"      | (numeric) | the index of the output to spend and used as input       |
| "scriptSig" | (string)  | the hex-encoded signature script                         |
| "sequence"  | (numeric) | the script sequence number                                   |
| "error"     | (string)  | verification or signing error related to the input       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli signrawtransaction "0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa40000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"
```


<collapse-text hidden title="Response">


```json
{
  "hex": "0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa4000000006a4730440220242c38740261799f9b6ccbde8f941e2567e86c84108c508d108d062ab9677b6e02206fea089b28c6d66d1c8f2343e1de7960dadafa3cf268c00f7dbe391cd8b9365f01210384c0db4f1eaa142a2745742b942f989375dbec32c55310a793225bb5c43cdc98ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000",
  "complete": true
}
```

</collapse-text>


You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signrawtransaction", "params": ["0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa40000000000ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "hex": "0100000001958cb041d8369bbf6c2493accc4d949909a2c669cad883e232038d782eeb4fa4000000006a4730440220242c38740261799f9b6ccbde8f941e2567e86c84108c508d108d062ab9677b6e02206fea089b28c6d66d1c8f2343e1de7960dadafa3cf268c00f7dbe391cd8b9365f01210384c0db4f1eaa142a2745742b942f989375dbec32c55310a793225bb5c43cdc98ffffffff0140420f00000000001976a91456def632e67aa11c25ac16a0ee52893c2e5a2b6a88ac00000000",
    "complete": true
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

