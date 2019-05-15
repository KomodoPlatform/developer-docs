# Tokens

## Introduction

The Tokens Custom Consensus (CC) module enables core-asset support for the on-chain creation of colored coins, also called tokens. The functionality is facilitated by utxo technology. Tokens can be generated on any chain where the [ac_cc](../installations/asset-chain-parameters.html#ac-cc) is enabled.

The `tokens` smart contract requires locking a proportional amount of satoshis of the native coins. These satoshis create the supply for the token.

For example, if you desire to create a one-of-a-kind token, use 1 satoshi in its creation.

## tokenaddress

**tokenaddress (pubkey)**

The `tokenaddress` method returns information about a token address according to a specific `pubkey`. If no `pubkey` is provided, the `pubkey` used to the launch the daemon is the default.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | --------------------------------- |
| pubkey    | (string, optional) | the pubkey of the desired address |

### Response

| Name | Type | Description | 
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| result          | (string) | whether the command executed successfully                                                                                        |
| AssetsCCaddress | (string) | taking the token contract's EVAL code as a modifier, this is the public address that corresponds to the token contract's privkey |
| Assetsmarker    | (string) | the unmodified public address generated from the token contract's privkey                                                        |
| CCaddress       | (string) | taking the token contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                          |
| myCCaddress     | (string) | taking the token contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                          |
| myaddress       | (string) | the public address of the pubkey used to launch the chain                                                                        |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokenaddress 028702e30d8465d6aa85f35d2f58c06a6ee17f23f376b56044dadf7b793f2c12b9
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "AssetsCCaddress": "RGKRjeTBw4LYFotSDLT6RWzMHbhXri6BG6",
  "Assetsmarker": "RFYE2yL3KknWdHK6uNhvWacYsCUtwzjY3u",
  "CCaddress": "RG6mr23tQ9nUhmi5GEnYqjfkqZt9x2MRXz",
  "myCCaddress": "RG6mr23tQ9nUhmi5GEnYqjfkqZt9x2MRXz",
  "myaddress": "RDjG4sM1y4udiJSszF6BLotqUnZX79Rom9"
}
```

</collapse-text>


## tokenask

**tokenask numtokens tokenid price**

The `tokenask` method posts a public ask order.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ------------------------------------------------------------------------------ |
| numtokens | (number) | the number of tokens to request in the order                                   |
| tokenid   | (string) | the txid that identifies the token                                             |
| price     | (number) | the price to pay for each token (units are in coins of the parent asset chain) |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1:

```bash
./komodo-cli -ac_name=HELLOWORLD tokenask 1000 c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59 1
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "010000000248403cd63777a2086206592c096ddfa1d4ba2647673b330610968eace2cf7b540200000049483045022100bde9eaf43a43fe252530bcf346be3e336e86f0171b817977d38d6ebd4bb0756e0220735f3292ef012fd56f7476700f5649b23aacf2387f4fa5a537e1b6c6daa6c1d101ffffffff4f2016d356282fca9d8278aa04fbdbed98ac6af0bf7a479959c5bb91f95e8ef5020000007b4c79a276a072a26ba067a5658021028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e278140fe6a2cd6fdb5a359d5d6eea9bcf34e5b7d8e2def612afe9c01af1129b006e68344d8f9905ea5f226cdb1556659df0c8741e8e3def1238761721b66718dabe92ca100af038001e3a10001ffffffff03e803000000000000302ea22c80201ab400e039122028345520ba041ac3e6ec81ad28d8415e78d760d55f41097dd58103120c008203000401cc5087b00e000000002321028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e27ac00000000000000004f6a4c4ce373c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b5900e876481700000021028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e2700000000"
}
```

</collapse-text>


Step 2: Use sendrawtransaction to broadcast the order

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000248403cd63777a2086206592c096ddfa1d4ba2647673b330610968eace2cf7b540200000049483045022100bde9eaf43a43fe252530bcf346be3e336e86f0171b817977d38d6ebd4bb0756e0220735f3292ef012fd56f7476700f5649b23aacf2387f4fa5a537e1b6c6daa6c1d101ffffffff4f2016d356282fca9d8278aa04fbdbed98ac6af0bf7a479959c5bb91f95e8ef5020000007b4c79a276a072a26ba067a5658021028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e278140fe6a2cd6fdb5a359d5d6eea9bcf34e5b7d8e2def612afe9c01af1129b006e68344d8f9905ea5f226cdb1556659df0c8741e8e3def1238761721b66718dabe92ca100af038001e3a10001ffffffff03e803000000000000302ea22c80201ab400e039122028345520ba041ac3e6ec81ad28d8415e78d760d55f41097dd58103120c008203000401cc5087b00e000000002321028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e27ac00000000000000004f6a4c4ce373c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b5900e876481700000021028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e2700000000
```


<collapse-text hidden title="Response">


```bash
8d5bb0ae5cc8406b8b12fff04437c748495f4f8852ae124e6a137bc130d3be64
```

</collapse-text>


## tokenbalance

**tokenbalance tokenid (pubkey)**

The `tokenbalanced` method checks the token balance according to a provided `pubkey`. If no `pubkey` is provided, the `pubkey` used the launch the daemon is the default.

### Arguments

| Name | Type | Description | 
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| tokenid   | (string) | the txid that identifies the token                                                                                         |
| pubkey    | (string) | the pubkey for which to examine the balance; if no pubkey is provided, the pubkey used to launch the daemon is the default |

### Response

| Name | Type | Description | 
| --------- | -------- | ------------------------------------------------------------------------------------------------------- |
| result    | (string) | whether the command executed succesfully                                                                |
| CCaddress | (string) | taking the token contract's EVAL code as a modifier, this is the CC address from the pubkey of the user |
| tokenid   | (string) | the txid that identifies the token                                                                      |
| balance   | (number) | the balance of the address that corresponds to the pubkey                                               |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokenbalance c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "CCaddress": "RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti",
  "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59",
  "balance": 99989
}
```

</collapse-text>


Check the token balance of a specific pubkey

```bash
./komodo-cli -ac_name=HELLOWORLD tokenbalance c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59 028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e27
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "CCaddress": "RQymbXA8FfWw2AaHv7oC8JRKo9W5HkFVMm",
  "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59",
  "balance": 999900011
}
```

</collapse-text>


## tokenbid

**tokenbid numtokens tokenid price**

The `tokenbid` method posts a public bid order.

To fill the order, the parent chain's coin must be used.

The method returns a raw hex, which must be broadcast using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) to complete the command.

The `sendrawtransaction` method then returns a `txid`, which is the identification method of the bid order, and should be saved for future use.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ------------------------------------------------------------------------------ |
| numtokens | (number) | the number of tokens to request in the order                                   |
| tokenid   | (string) | the txid that identifies the token                                             |
| price     | (number) | the price to pay for each token (units are in coins of the parent asset chain) |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokenbid 1000 c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59 1
```


<collapse-text hidden title="Response">


```bash
0100000001484256677a6417030dd99716a47b8c9cb06fba6e57ff4617e9932a6cde2972830100000049483045022100fc1926401b27ba044bbf17c36f36030adae52a188594efc75fe42861ab0b997802205e729d6f5587e5a5296b5649a154ce1fe3c581078fac7ae4e2b4577978c05c8901ffffffff0300e8764817000000302ea22c80201ab400e039122028345520ba041ac3e6ec81ad28d8415e78d760d55f41097dd58103120c008203000401cc10d262684a0300002321028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e27ac00000000000000004f6a4c4ce362c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59e80300000000000021028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e2700000000`
```

</collapse-text>


Use `sendrawtransaction` to publish order

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0100000001484256677a6417030dd99716a47b8c9cb06fba6e57ff4617e9932a6cde2972830100000049483045022100fc1926401b27ba044bbf17c36f36030adae52a188594efc75fe42861ab0b997802205e729d6f5587e5a5296b5649a154ce1fe3c581078fac7ae4e2b4577978c05c8901ffffffff0300e8764817000000302ea22c80201ab400e039122028345520ba041ac3e6ec81ad28d8415e78d760d55f41097dd58103120c008203000401cc10d262684a0300002321028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e27ac00000000000000004f6a4c4ce362c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59e80300000000000021028bb4ae66aa4f1960a4aa822907e800eb688d9ab2605c8067a34b421748c67e2700000000
```


<collapse-text hidden title="Response">


```bash
5fc8c472bc0e5f994b5a9a3fda23af1a3e1cfd746b902d7216352732e6adba05
```

</collapse-text>


## tokencancelask

**tokencancelask tokenid asktxid**

The `tokencancelask` method cancels a specific `ask`/`sell` order that you created.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ------------------------------------------------- |
| tokenid   | (string) | the txid that identifies the token                |
| asktxid   | (string) | the txid that identifies the original ask request |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Issue the call and get your raw transaction HEX value

```bash
./komodo-cli -ac_name=HELLOWORLD tokencancelask 9217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e 7194ae293330af80fdbe4b4b2c8b51194f12e334b4a0489288288c1b7336a65c
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "010000000234c335a46dadea8e42420b0e284f5577cfbcb7764a8d5c3b61312b71c5b14d0800000000494830450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001ffffffff030a00000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401ccf078724e18090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000"
}
```

</collapse-text>


Step 2: Broadcast using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000234c335a46dadea8e42420b0e284f5577cfbcb7764a8d5c3b61312b71c5b14d0800000000494830450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001ffffffff030a00000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401ccf078724e18090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000
```


<collapse-text hidden title="Response">


```bash
AssetValidate (x)
vin1 10, vout0 10, AssetValidateSellvin
Got 0.00000010 to origaddr.(RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ)
21d152480275568e3f82a5049d8b30308e3739ebd98171e075a75fea504364cd
```

</collapse-text>


Step 3 (optional): Decode the raw transaction (check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 010000000234c335a46dadea8e42420b0e284f5577cfbcb7764a8d5c3b61312b71c5b14d0800000000494830450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001ffffffff030a00000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401ccf078724e18090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000
```


<collapse-text hidden title="Response">


```json
{
  "txid": "21d152480275568e3f82a5049d8b30308e3739ebd98171e075a75fea504364cd",
  "size": 434,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "084db1c5712b31613b5c8d4a76b7bccf77554f280e0b42428eeaad6da435c334",
      "vout": 0,
      "scriptSig": {
        "asm": "30450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601",
        "hex": "4830450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601"
      },
      "sequence": 4294967295
    },
    {
      "txid": "7194ae293330af80fdbe4b4b2c8b51194f12e334b4a0489288288c1b7336a65c",
      "vout": 0,
      "scriptSig": {
        "asm": "a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001",
        "hex": "4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.0000001,
      "valueSat": 10,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti"]
      }
    },
    {
      "value": 99999.9999,
      "valueSat": 9999999990000,
      "n": 1,
      "scriptPubKey": {
        "asm": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc OP_CHECKSIG",
        "hex": "2103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 2,
      "scriptPubKey": {
        "asm": "OP_RETURN e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e",
        "hex": "6a22e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e",
        "type": "nulldata"
      }
    }
  ]
}
```

</collapse-text>


## tokencancelbid

**tokencancelbid tokenid bidtxid**

The `tokencancelbid` method cancels a specific `bid`/`buy` order that you created.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ------------------------------------------------- |
| tokenid   | (string) | the txid that identifies the token                |
| bidtxid   | (string) | the txid that identifies the original bid request |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Issue the call and get your raw transaction HEX value

```bash
./komodo-cli -ac_name=HELLOWORLD tokencancelbid 9217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e 7194ae293330af80fdbe4b4b2c8b51194f12e334b4a0489288288c1b7336a65c
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "010000000234c335a46dadea8e42420b0e284f5577cfbcb7764a8d5c3b61312b71c5b14d0800000000494830450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001ffffffff030a00000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401ccf078724e18090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000"
}
```

</collapse-text>


Step 2: Send raw transaction / broadcast the HEX value from above

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000234c335a46dadea8e42420b0e284f5577cfbcb7764a8d5c3b61312b71c5b14d0800000000494830450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001ffffffff030a00000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401ccf078724e18090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000
```


<collapse-text hidden title="Response">


```bash
AssetValidate (x)
vin1 10, vout0 10, AssetValidateBuyvin
Got 0.00000010 to origaddr.(RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ)
21d152480275568e3f82a5049d8b30308e3739ebd98171e075a75fea504364cd
```

</collapse-text>


Step 3: Decode the raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 010000000234c335a46dadea8e42420b0e284f5577cfbcb7764a8d5c3b61312b71c5b14d0800000000494830450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001ffffffff030a00000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401ccf078724e18090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000
```


<collapse-text hidden title="Response">


```json
{
  "txid": "21d152480275568e3f82a5049d8b30308e3739ebd98171e075a75fea504364cd",
  "size": 434,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "084db1c5712b31613b5c8d4a76b7bccf77554f280e0b42428eeaad6da435c334",
      "vout": 0,
      "scriptSig": {
        "asm": "30450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601",
        "hex": "4830450221009f365d429d03df66b34cad764368092498ebd7340587c558ea19c4248202317b0220531524ef076f9e5b26ec5aa38b3078c041f8d0603b85552177ef14d00b0e499601"
      },
      "sequence": 4294967295
    },
    {
      "txid": "7194ae293330af80fdbe4b4b2c8b51194f12e334b4a0489288288c1b7336a65c",
      "vout": 0,
      "scriptSig": {
        "asm": "a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001",
        "hex": "4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702814066f6a9d580da0ac901ada8c61922d93da005e92c9e419a44c1bcbf9ec8ad43790dfc8ca71b5c21b79a58aa173fb71e1ab0b82c590dc883359de60f743fabda16a100af038001e3a10001"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.0000001,
      "valueSat": 10,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti"]
      }
    },
    {
      "value": 99999.9999,
      "valueSat": 9999999990000,
      "n": 1,
      "scriptPubKey": {
        "asm": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc OP_CHECKSIG",
        "hex": "2103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 2,
      "scriptPubKey": {
        "asm": "OP_RETURN e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e",
        "hex": "6a22e3789217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e",
        "type": "nulldata"
      }
    }
  ]
}
```

</collapse-text>


## tokencreate

**tokencreate name supply description**

The `tokencreate` method creates a new token.

For every token created, the method requires one satoshi of the parent blockchain's coins. For example, `1 COIN` of the blockchain provides `100000000` tokens.

The method returns a hex-encoded transaction which should then be broadcast using `sendrawtransaction`.

`sendrawtransaction` then returns a `txid`, which is your `tokenid`.

::: tip
Tokens that can be divided and transferred in fractional amounts can be created too. If you consider 10 tokens as a single unit, then this unit can be named anything and it will be divisible to a single decimal place. This can be handled on the application side as it is just a change in the way of interpreting the numbers.
:::

### Arguments

| Name | Type | Description | 
| ------------- | -------- | ------------------------------------------------ |
| name          | (string) | the proposed name of the token                   |
| supply        | (number) | the intended supply of the token, given in coins |
| "description" | (string) | the description of the token                     |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokencreate TAK 10 "Testing phase."
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "01000000022c223cfc9c3349aed24ca89e44af6fcdb030150443bd6ac55e2080ce4b097c3002000000484730440220316605c400c47e2d5aa6104ac5c5229e71683b8db9482efa1655d257690d338802202344f254b208a6d724f52f4503531cf005a8ca68119bde4b6cb281ab9fccaf1101ffffffff80e66c0c47311449c5effc2782134006f05fd31e79659bc4b0608d7e247e280c0000000049483045022100ec494d3fa5c76fe0382e83980affdfd091509fb4e18b20fff8c095374e6b6bee022015ddaf95dc8b03e8cbba00ff7a377b80a7bd2200a68669718c329c617549757701ffffffff0400a0724e18090000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc1027000000000000232102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702acc01f66fa15090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000396a37e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e00000000"
}
```

</collapse-text>


Step 2: Broadcast the raw transaction hex

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000012c223cfc9c3349aed24ca89e44af6fcdb030150443bd6ac55e2080ce4b097c300200000049483045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa01ffffffff0400ca9a3b00000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc1027000000000000232102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702acc055cbbe15090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000396a37e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e00000000
```


<collapse-text hidden title="Response">


```bash
e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66
```

</collapse-text>


Step 3 (Optional): Use decoderawtransaction to verify the output is sane

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 01000000012c223cfc9c3349aed24ca89e44af6fcdb030150443bd6ac55e2080ce4b097c300200000049483045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa01ffffffff0400ca9a3b00000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc1027000000000000232102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702acc055cbbe15090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000396a37e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e00000000
```


<collapse-text hidden title="Response">


```json
{
  "txid": "e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
  "size": 335,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "307c094bce80205ec56abd43041530b0cd6faf449ea84cd2ae49339cfc3c222c",
      "vout": 2,
      "scriptSig": {
        "asm": "3045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa01",
        "hex": "483045022100dc83b88f5ed1f01aab7dee8bd8f2b3c0bf83537c9b3cbb0c6ea78ebafdf4c6f60220518440e7f43d24c5733531a8d5a825dbb90e716f7ba20c0d469e7004c1fcc5aa01"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 10.0,
      "valueSat": 1000000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti"]
      }
    },
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "02adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702 OP_CHECKSIG",
        "hex": "2102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa2702ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RFYE2yL3KknWdHK6uNhvWacYsCUtwzjY3u"]
      }
    },
    {
      "value": 99889.9996,
      "valueSat": 9988999960000,
      "n": 2,
      "scriptPubKey": {
        "asm": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc OP_CHECKSIG",
        "hex": "2103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 3,
      "scriptPubKey": {
        "asm": "OP_RETURN e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e",
        "hex": "6a37e3632103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc0354414b0e54657374696e672070686173652e",
        "type": "nulldata"
      }
    }
  ]
}
```

</collapse-text>


## tokenfillask

**tokenfillask tokenid asktxid fillamount**

The `tokenfillask` method fills an existing ask.

It returns a hex-encoded transaction which should then be broadcast using `sendrawtransaction`.

### Arguments

| Name | Type | Description | 
| ---------- | -------- | -------------------------------------- |
| tokenid    | (string) | the txid that identifies the token     |
| asktxid    | (string) | the txid that identifies the ask order |
| fillamount | (number) | the amount to fill                     |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create the raw transaction

```bash
./komodo-cli -ac_name=HELLOWORLD tokenfillask 9217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e d1b2676bb118d7bb8604dc5bb0a320a2ffb6f7ee118bfd20ed33be3fbd0b9b62 50
```


<collapse-text hidden title="Response">


```json
totally filled!
{
    "result": "success",
    "hex": "01000000031a47a2fa94f27f7e98645a6827f9382991d76fcfd2d84b96065763d1cfed78fc02000000494830450221008be941e56b10fb51459f66288bb68936c55fd17ecbebd12b142f4575b0fe4bf702205f048ad69269ba81530230496fea42983aad88882b1ef7d08304e1230040fb0001ffffffff629b0bbd3fbe33ed20fd8b11eef7b6ffa220a3b05bdc0486bbd718b16b67b2d1000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa27028140da534b773f52c77ebbd590330468ba49333acc0971da444de512b85d039f59f778c8bab7cb1be909b6473789b237966a0f137a9b24c93ebebe0d83ae34a6bd6fa100af038001e3a10001ffffffff2bf671abc3bdfb673c0103a3bd59282c1aee473c6ccc4b591cdb42dc469d68c4000000004847304402204fa686dfdc7c0b7d42e538751aee0534b54747df4f335fb4d3b0d1a86c68e96d02202083fa811dd4506ad83f6d58a420d31ff7ccbae84ea05399b616e3d6f373682401ffffffff050000000000000000302ea22c80201ab400e039122028345520ba041ac3e6ec81ad28d8415e78d760d55f41097dd58103120c008203000401cc3200000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc0065cd1d00000000232103fcc4b37ee767a67b75503832764b559d764d71c13785482b73609159aa6ae9efacf01710252d090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000004f6a4c4ce3539217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000000000002103fcc4b37ee767a67b75503832764b559d764d71c13785482b73609159aa6ae9ef00000000"
}
```

</collapse-text>


Step 2: Broadcast the hex using sendrawtransaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000031a47a2fa94f27f7e98645a6827f9382991d76fcfd2d84b96065763d1cfed78fc02000000494830450221008be941e56b10fb51459f66288bb68936c55fd17ecbebd12b142f4575b0fe4bf702205f048ad69269ba81530230496fea42983aad88882b1ef7d08304e1230040fb0001ffffffff629b0bbd3fbe33ed20fd8b11eef7b6ffa220a3b05bdc0486bbd718b16b67b2d1000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa27028140da534b773f52c77ebbd590330468ba49333acc0971da444de512b85d039f59f778c8bab7cb1be909b6473789b237966a0f137a9b24c93ebebe0d83ae34a6bd6fa100af038001e3a10001ffffffff2bf671abc3bdfb673c0103a3bd59282c1aee473c6ccc4b591cdb42dc469d68c4000000004847304402204fa686dfdc7c0b7d42e538751aee0534b54747df4f335fb4d3b0d1a86c68e96d02202083fa811dd4506ad83f6d58a420d31ff7ccbae84ea05399b616e3d6f373682401ffffffff050000000000000000302ea22c80201ab400e039122028345520ba041ac3e6ec81ad28d8415e78d760d55f41097dd58103120c008203000401cc3200000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc0065cd1d00000000232103fcc4b37ee767a67b75503832764b559d764d71c13785482b73609159aa6ae9efacf01710252d090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000004f6a4c4ce3539217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000000000002103fcc4b37ee767a67b75503832764b559d764d71c13785482b73609159aa6ae9ef00000000
```


<collapse-text hidden title="Response">


```bash
AssetValidate (S)
vin1 50, vout1 50, AssetValidateSellvin
Got 0.00000050 to origaddr.(RVCVaEHdH1gp1aPfu9MkgGBfdVNuW824PY)
  0 0 50 50 500000000 500000000
got recvunitprice 0.10000000 >= 0.10000000 unitprice, new unitprice 0.00000000
fill validated
b6ebeaafced887fd63deb9207e0484570d49abe8fe4fcbaa026666d4ea3f902e
```

</collapse-text>


Step 3: Wait for the transaction to be confirmed

## tokenfillbid

**tokenfillbid tokenid bidtxid fillamount**

The `tokenfillbid` method fills an existing ask.

It returns a hex-encoded transaction which should then be broadcast using `sendrawtransaction`.

### Arguments

| Name | Type | Description | 
| ---------- | -------- | -------------------------------------- |
| tokenid    | (string) | the txid that identifies the token     |
| bidtxid    | (string) | the txid that identifies the bid order |
| fillamount | (number) | the amount to fill                     |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create raw transaction

```bash
./komodo-cli -ac_name=HELLOWORLD tokenfillbid 9217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e d1b2676bb118d7bb8604dc5bb0a320a2ffb6f7ee118bfd20ed33be3fbd0b9b62 50
```


<collapse-text hidden title="Response">


```json
totally filled!
{
  "result": "success",
  "hex": "01000000031a47a2fa94f27f7e98645a6827f9382991d76fcfd2d84b96065763d1cfed78fc02000000494830450221008be941e56b10fb51459f66288bb68936c55fd17ecbebd12b142f4575b0fe4bf702205f048ad69269ba81530230496fea42983aad88882b1ef7d08304e1230040fb0001ffffffff629b0bbd3fbe33ed20fd8b11eef7b6ffa220a3b05bdc0486bbd718b16b67b2d1000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa27028140da534b773f52c77ebbd590330468ba49333acc0971da444de512b85d039f59f778c8bab7cb1be909b6473789b237966a0f137a9b24c93ebebe0d83ae34a6bd6fa100af038001e3a10001ffffffff2bf671abc3bdfb673c0103a3bd59282c1aee473c6ccc4b591cdb42dc469d68c4000000004847304402204fa686dfdc7c0b7d42e538751aee0534b54747df4f335fb4d3b0d1a86c68e96d02202083fa811dd4506ad83f6d58a420d31ff7ccbae84ea05399b616e3d6f373682401ffffffff050000000000000000302ea22c80201ab400e039122028345520ba041ac3e6ec81ad28d8415e78d760d55f41097dd58103120c008203000401cc3200000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc0065cd1d00000000232103fcc4b37ee767a67b75503832764b559d764d71c13785482b73609159aa6ae9efacf01710252d090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000004f6a4c4ce3539217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000000000002103fcc4b37ee767a67b75503832764b559d764d71c13785482b73609159aa6ae9ef00000000"
}
```

</collapse-text>


Step 2: Broadcast the hex or sendrawtransaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000031a47a2fa94f27f7e98645a6827f9382991d76fcfd2d84b96065763d1cfed78fc02000000494830450221008be941e56b10fb51459f66288bb68936c55fd17ecbebd12b142f4575b0fe4bf702205f048ad69269ba81530230496fea42983aad88882b1ef7d08304e1230040fb0001ffffffff629b0bbd3fbe33ed20fd8b11eef7b6ffa220a3b05bdc0486bbd718b16b67b2d1000000007b4c79a276a072a26ba067a565802102adf84e0e075cf90868bd4e3d34a03420e034719649c41f371fc70d8e33aa27028140da534b773f52c77ebbd590330468ba49333acc0971da444de512b85d039f59f778c8bab7cb1be909b6473789b237966a0f137a9b24c93ebebe0d83ae34a6bd6fa100af038001e3a10001ffffffff2bf671abc3bdfb673c0103a3bd59282c1aee473c6ccc4b591cdb42dc469d68c4000000004847304402204fa686dfdc7c0b7d42e538751aee0534b54747df4f335fb4d3b0d1a86c68e96d02202083fa811dd4506ad83f6d58a420d31ff7ccbae84ea05399b616e3d6f373682401ffffffff050000000000000000302ea22c80201ab400e039122028345520ba041ac3e6ec81ad28d8415e78d760d55f41097dd58103120c008203000401cc3200000000000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc0065cd1d00000000232103fcc4b37ee767a67b75503832764b559d764d71c13785482b73609159aa6ae9efacf01710252d090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000004f6a4c4ce3539217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e00000000000000002103fcc4b37ee767a67b75503832764b559d764d71c13785482b73609159aa6ae9ef00000000
```


<collapse-text hidden title="Response">


```bash
AssetValidate (S)
vin1 50, vout1 50, AssetValidateBidvin
Got 0.00000050 to origaddr.(RVCVaEHdH1gp1aPfu9MkgGBfdVNuW824PY)
0 0 50 50 500000000 500000000
got recvunitprice 0.10000000 >= 0.10000000 unitprice, new unitprice 0.00000000
fill validated
b6ebeaafced887fd63deb9207e0484570d49abe8fe4fcbaa026666d4ea3f902e
```

</collapse-text>


Step 3: Wait for the transaction to be confirmed

## tokeninfo

**tokeninfo tokenid**

The `tokeninfo` method reveals information about any token.

### Arguments

| Name | Type | Description | 
| --------- | -------- | ---------------------------------- |
| tokenid   | (string) | the txid that identifies the token |

### Response

| Name | Type | Description | 
| ----------- | -------- | ------------------------------------------------------------- |
| result      | (string) | whether the command executed successfully                     |
| tokenid     | (string) | the identifying txid for the token id                         |
| owner       | (string) | the identifying pubkey of the token creator                   |
| name        | (string) | the name of the token                                         |
| supply      | (number) | the total supply of the token                                 |
| description | (string) | the token description provided by the owner at token creation |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokeninfo 43850dfce744581ef44775086625745adecd628993c5ff4c1c786cfd21009add
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "tokenid": "43850dfce744581ef44775086625745adecd628993c5ff4c1c786cfd21009add",
  "owner": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc",
  "name": "TAKA",
  "supply": "100000.00000000",
  "description": "Testing phase 3."
}
```

</collapse-text>


## tokenlist

**tokenlist**

The `tokenlist` method lists all available tokens on the asset chain.

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| --------- | ------------------ | ------------------------------------- |
| tokenid   | (array of strings) | the identifying txid for the token id |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD tokenlist
```


<collapse-text hidden title="Response">


```bash
[
  "307c094bce80205ec56abd43041530b0cd6faf449ea84cd2ae49339cfc3c222c",
  "e7d034fb7dbad561c9a86dcbcc64aa89e1d311891b4e7c744280b7de13b1186f",
  "21020a609c162fa2d0bc223acfff14bb0b886743303f5e4a661dade7a69b24a5",
  "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59",
  "e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
  "045a31b7e38b1538d111ea87ad9ec53952a70e9a5e8d076f7ed7923d8723f02d",
  "f4131ee56a47273195a899f60a187862aa8e39a974b5a19d860e2fe69f60242f",
  "9217014eae0a83a0b64632f379c1b474859794f9eaf1cf1eecf5804ed6124a5e",
  "9eec77a3e02dec0ca60ead7e8cfb6cb6809c40fe54b804e51d5c6c2a445ffbf3",
  "43850dfce744581ef44775086625745adecd628993c5ff4c1c786cfd21009add"
]
```

</collapse-text>


## tokenorders

**tokenorders (tokenid)**

The `tokenorders` method displays the public on-chain orderbook for a specific token. If no `tokenid` is provided, it displays the on-chain orderbook for all available tokens.

Information about the `funcid` property:

- A lowercase `b` describes an bid offer.

- An uppercase `B` describes a bid fill.

- A lowercase `s` describes an ask offer.

- An uppercase `S` describes the ask fill.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ------------------------------------- |
| tokenid   | (string, optional) | the identifying txid for the token id |

### Response

| Name | Type | Description | 
| ------------------- | -------------------------- | ------------------------------------------------------------------------------ |
| funcid              | (string)                   | describes either a bid ask `b`, a bid fill `B`, an ask `s`, or an ask fill `S` |
| txid                | (string)                   | the txid of the identifying order or fill                                      |
| vout                | (number)                   | the vout value                                                                 |
| amount              | (number)                   | the amount remaining in the bid/ask request                                    |
| bidamount/askamount | (number)                   | the total amount of the relevant bid or ask request                            |
| origaddress         | (string)                   | the address that made the original bid `b` or ask `s`                          |
| tokenid             | (string)                   | the tokenid for the relevant bid/ask request/fill                              |
| totalrequired       | (number, `b` and `s` only) | the total amount available in the original big/ask request/fill                |
| price               | (number, `b` and `s` only) | the price per token, units are in the parent asset chain's coin                |

#### :pushpin: Examples

Show all available orders

```bash
./komodo-cli -ac_name=HELLOWORLD tokenorders
```


<collapse-text hidden title="Response">


```json
[
  {
    "funcid": "B",
    "txid": "b9d305e9b6a82e715efce9b6244cc15fef131baf1893a7eb45b199c23b3fb806",
    "vout": 0,
    "amount": 0,
    "bidamount": 0,
    "origaddress": "RQymbXA8FfWw2AaHv7oC8JRKo9W5HkFVMm",
    "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59"
  },
  {
    "funcid": "b",
    "txid": "45b3f7874fc4a2699729a9792bc7679f6b5f11035a29ad9f661425b19534dd1d",
    "vout": 0,
    "amount": 1000,
    "bidamount": 1000,
    "origaddress": "RQymbXA8FfWw2AaHv7oC8JRKo9W5HkFVMm",
    "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59",
    "totalrequired": 1000,
    "price": 1
  },
  {
    "funcid": "B",
    "txid": "d4643ce47e9799681a4549468d47c85337367f0ef2733afe1d79c50175e6ae32",
    "vout": 0,
    "amount": 0,
    "bidamount": 0,
    "origaddress": "R9sDyKt2kW5uJaoZT6GF9e3WRbGioBuhoZ",
    "tokenid": "e7d034fb7dbad561c9a86dcbcc64aa89e1d311891b4e7c744280b7de13b1186f"
  },
  {
    "funcid": "B",
    "txid": "0909df82ade3193c9a630dd80947141f34489732e9a2f8346790304ebbdcc251",
    "vout": 0,
    "amount": 0,
    "bidamount": 0,
    "origaddress": "R9sDyKt2kW5uJaoZT6GF9e3WRbGioBuhoZ",
    "tokenid": "e7d034fb7dbad561c9a86dcbcc64aa89e1d311891b4e7c744280b7de13b1186f"
  },
  {
    "funcid": "b",
    "txid": "a8d60a3ce429ccb885ad445e7a4534130a35d2424d1883c6513d0f4da2fe9a92",
    "vout": 0,
    "amount": 150,
    "bidamount": 150,
    "origaddress": "RQymbXA8FfWw2AaHv7oC8JRKo9W5HkFVMm",
    "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59",
    "totalrequired": 100,
    "price": 1.5
  },
  {
    "funcid": "B",
    "txid": "03e118fc442a223df4dd87add64f142e1bfd99baee94c8be26bc77ed809d50a4",
    "vout": 0,
    "amount": 0,
    "bidamount": 0,
    "origaddress": "R9sDyKt2kW5uJaoZT6GF9e3WRbGioBuhoZ",
    "tokenid": "e7d034fb7dbad561c9a86dcbcc64aa89e1d311891b4e7c744280b7de13b1186f"
  }
]
```

</collapse-text>


Show orders for specific token

```bash
./komodo-cli -ac_name=HELLOWORLD tokenorders c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59
```


<collapse-text hidden title="Response">


```json
[
  {
    "funcid": "B",
    "txid": "b9d305e9b6a82e715efce9b6244cc15fef131baf1893a7eb45b199c23b3fb806",
    "vout": 0,
    "amount": 0,
    "bidamount": 0,
    "origaddress": "RQymbXA8FfWw2AaHv7oC8JRKo9W5HkFVMm",
    "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59"
  },
  {
    "funcid": "b",
    "txid": "9dabd8c01bb7d59455b64fe100617149c20cb4520d266183686aa4986fd3021d",
    "vout": 0,
    "amount": 100,
    "bidamount": 100,
    "origaddress": "RQymbXA8FfWw2AaHv7oC8JRKo9W5HkFVMm",
    "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59",
    "totalrequired": 100,
    "price": 1
  },
  {
    "funcid": "b",
    "txid": "45b3f7874fc4a2699729a9792bc7679f6b5f11035a29ad9f661425b19534dd1d",
    "vout": 0,
    "amount": 1000,
    "bidamount": 1000,
    "origaddress": "RQymbXA8FfWw2AaHv7oC8JRKo9W5HkFVMm",
    "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59",
    "totalrequired": 1000,
    "price": 1
  },
  {
    "funcid": "b",
    "txid": "a8d60a3ce429ccb885ad445e7a4534130a35d2424d1883c6513d0f4da2fe9a92",
    "vout": 0,
    "amount": 150,
    "bidamount": 150,
    "origaddress": "RQymbXA8FfWw2AaHv7oC8JRKo9W5HkFVMm",
    "tokenid": "c5bbc34e6517c483afc910a3b0585c40da5c09b7c5d2d9757c5c5075e2d41b59",
    "totalrequired": 100,
    "price": 1.5
  }
]
```

</collapse-text>


## tokentransfer

**tokentransfer tokenid destpubkey amount**

The `tokentransfer` method transfers tokens from one cc address to another.

It is similar to the [sendmany](../komodo-api/wallet.html#sendmany) method used to send coins on the parent chain.

The method returns a raw hex, which must be broadcast using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) to complete the command.

::: tip
The source `txid/vout` needs to be specified as it is critical to match outputs with inputs.
:::

::: tip
A token may be burned by using `tokentransfer` to send to a burn address.
:::

### Arguments

| Name | Type | Description | 
| ---------- | ------------------ | ------------------------------------------ |
| tokenid    | (string, optional) | the identifying txid for the token id      |
| destpubkey | (string)           | the pubkey where the tokens should be sent |
| amount     | (number)           | the number of tokens to send               |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create the rawtransaction

```bash
./komodo-cli -ac_name=HELLOWORLD tokentransfer e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66 02ebc786cb83de8dc3922ab83c21f3f8a2f3216940c3bf9da43ce39e2a3a882c92 500000
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "01000000023b61e44ce3cedf536b52d8da11faacd041494a078e971551ed4e2bd496bc8da1000000006a4730440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f6012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcffffffff66cc65f38d7e878d312386777c4f049f738b8894353c30108f7fe4ca515489e4000000007b4c79a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001ffffffff0420a1070000000000302ea22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401cce028933b00000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc28b9486cb2430000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc6600000000"
}
```

</collapse-text>


Step 2: Broadcast using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000023b61e44ce3cedf536b52d8da11faacd041494a078e971551ed4e2bd496bc8da1000000006a4730440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f6012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcffffffff66cc65f38d7e878d312386777c4f049f738b8894353c30108f7fe4ca515489e4000000007b4c79a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001ffffffff0420a1070000000000302ea22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401cce028933b00000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc28b9486cb2430000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc6600000000
```


<collapse-text hidden title="Response">


```bash
ProcessAssets
AssetValidate (t)
vin1 1000000000, vout0 500000, vout1 999500000, transfer validated 10.00000000 -> 10.00000000
AssetValidate.(t) passed
88ac2d4d27654e9d8ac195d5ab482ee9895303902eaacfbb687b1e736bb06fb4
```

</collapse-text>


Step 3: Decode the raw transaction and check against the following if the data is sane

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 01000000023b61e44ce3cedf536b52d8da11faacd041494a078e971551ed4e2bd496bc8da1000000006a4730440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f6012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcffffffff66cc65f38d7e878d312386777c4f049f738b8894353c30108f7fe4ca515489e4000000007b4c79a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001ffffffff0420a1070000000000302ea22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401cce028933b00000000302ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc28b9486cb2430000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac0000000000000000246a22e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc6600000000
```


<collapse-text hidden title="Response">


```json
{
  "txid": "88ac2d4d27654e9d8ac195d5ab482ee9895303902eaacfbb687b1e736bb06fb4",
  "size": 524,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "a18dbc96d42b4eed5115978e074a4941d0acfa11dad8526b53dfcee34ce4613b",
      "vout": 0,
      "scriptSig": {
        "asm": "30440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f601 03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc",
        "hex": "4730440220111c67172740c0c2556979fdf84639ba299ff22586ebd220f25aa301f029003f02203da97a2575c0ed1b309774309f5dc952ee305a46cd83e95eae99e3564a1772f6012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc"
      },
      "sequence": 4294967295
    },
    {
      "txid": "e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
      "vout": 0,
      "scriptSig": {
        "asm": "a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001",
        "hex": "4c79a276a072a26ba067a565802103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc8140c875a14edcbece61a6c18721398c927dc1e4509863e075b3922a8e3a2da6848e037142436e9102b529ee93a9ec618a4c67b63c52790d71812bb94179056913bba100af038001e3a10001"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.005,
      "valueSat": 500000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020541be9f843b476373fc18d8c8fab59c98c2c009f49c07fa66b7b431e4142feae8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RLB1YWh4N115NFh8tbArCBGaTQ3F43Yg1F"]
      }
    },
    {
      "value": 9.995,
      "valueSat": 999500000,
      "n": 1,
      "scriptPubKey": {
        "asm": "a22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020bc485b86ffd067abe520c078b74961f6b25e4efca6388c6bfd599ca3f53d8dae8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RRPpWbVdxcxmhx4xnWnVZFDfGc9p1177ti"]
      }
    },
    {
      "value": 744335.99945,
      "valueSat": 74433599945000,
      "n": 2,
      "scriptPubKey": {
        "asm": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc OP_CHECKSIG",
        "hex": "2103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 3,
      "scriptPubKey": {
        "asm": "OP_RETURN e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
        "hex": "6a22e374e4895451cae47f8f10303c3594888b739f044f7c778623318d877e8df365cc66",
        "type": "nulldata"
      }
    }
  ]
}
```

</collapse-text>

