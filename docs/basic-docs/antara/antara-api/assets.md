# Assets

## Introduction

The Assets Module provides basic distributed exchange (DEX) functionality for trading `tokens` created using the [Tokens]() module.

The Asset Module allows anyone to buy or sell tokens using the Smart Chain's coins.

#### Assets Module Flow

##### Seller's Perspective

- A token owner places a new "ask" request with the <b>tokenask</b> method specifying the amount of tokens they want to sell and the price. The assets module then creates a new token ask order and the specified amount of tokens is locked in the CC Assets global address
- To fulfill the ask, a buyer executes the <b>tokenfillask</b> method. The purchased token amount moves from the global CC address to the buyer's token CC address. At the same time, the required amount of coins move from the buyer to seller's address. This process can be repeated so long as tokens remaining in the ask order
- At any time, the creator of an order can cancel it via the <b>tokencancelask</b> method. The remaining tokens will return to their token CC address

##### Buyer's Perspective

- A buyer places a new bid using the <b>tokenbid</b> method. The bid specifies the amount of tokens and the price. The Assets Module creates a new token bid order and the specified amount of coins is locked in the modules' global CC address.
- A willing seller executes the <b>tokenfillbid</b> method. The token amount sold moves from the seller's token CC address to the buyer's token CC address. At the same time, the locked coins move from the global CC address to the seller's address. This process can be repeated so long as tokens remain in the bid order
- At any time, the creator of an order can cancel it via the <b>tokencancelbid</b> method. The remaining coins will return to their token CC address

To retrieve a current list of all active orders, use the <b>tokenorders</b> or <b>mytokenorders</b> methods.

## assetsaddress

**assetsaddress (pubkey)**

The `assetsaddress` method returns information about a asset address according to a specific `pubkey`. If no `pubkey` is provided, the `pubkey` used to launch the daemon is the default.

### Arguments

| Structure | Type               | Description                       |
| --------- | ------------------ | --------------------------------- |
| pubkey    | (string, optional) | the pubkey of the desired address |

### Response

| Structure           | Type     | Description                                                                                                                      |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| result              | (string) | whether the command executed successfully                                                                                        |
| AssetsCCaddress     | (string) | taking the token contract's EVAL code as a modifier, this is the public address that corresponds to the token contract's privkey |
| AssetsNormalAddress | (string) | the unmodified public address generated from the token contract's privkey                                                        |
| myCCaddress         | (string) | taking the token contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                          |
| myaddress           | (string) | the public address of the pubkey used to launch the chain                                                                        |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD assetsaddress 028702e30d8465d6aa85f35d2f58c06a6ee17f23f376b56044dadf7b793f2c12b9
```

<collapse-text hidden title="Response">

Response:

```json
{
  "result": "success",
  "AssetsCCaddress": "RGKRjeTBw4LYFotSDLT6RWzMHbhXri6BG6",
  "AssetsNormalAddress": "RFYE2yL3KknWdHK6uNhvWacYsCUtwzjY3u",
  "myCCaddress": "RG6mr23tQ9nUhmi5GEnYqjfkqZt9x2MRXz",
  "myaddress": "RDjG4sM1y4udiJSszF6BLotqUnZX79Rom9"
}
```

</collapse-text>

## mytokenorders

**mytokenorders [evalcode]**

The `mytokenorders` method displays the public on-chain orders created by the user's pubkey, which is set in `-pubkey` parameter of komodod.

The additional `evalcode` parameter allows the display of orders for non-fungible tokens bound to this evalcode.

The Response from this method is similar to the response from the `tokenorders` method.

## tokenask

**tokenask numtokens tokenid price**

The `tokenask` method posts a public ask order.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Structure | Type     | Description                                                                    |
| --------- | -------- | ------------------------------------------------------------------------------ |
| numtokens | (number) | the number of tokens to request in the order                                   |
| tokenid   | (string) | the txid that identifies the token                                             |
| price     | (number) | the price to pay for each token (units are in coins of the parent asset chain) |

### Response

| Structure | Type     | Description                                                                                          |
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

## tokenbid

**tokenbid numtokens tokenid price**

The `tokenbid` method posts a public bid order.

To fill the order, the parent chain's coin must be used.

The method returns a raw hex, which must be broadcast using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) to complete the command.

The `sendrawtransaction` method then returns a `txid`, which is the identification method of the bid order, and should be saved for future use.

### Arguments

| Structure | Type     | Description                                                                    |
| --------- | -------- | ------------------------------------------------------------------------------ |
| numtokens | (number) | the number of tokens to request in the order                                   |
| tokenid   | (string) | the txid that identifies the token                                             |
| price     | (number) | the price to pay for each token (units are in coins of the parent asset chain) |

### Response

| Structure | Type     | Description                                                                                          |
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

The response is the transaction id.

## tokencancelask

**tokencancelask tokenid asktxid**

The `tokencancelask` method cancels a specific `ask`/`sell` order that you created.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Structure | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| tokenid   | (string) | the txid that identifies the token                |
| asktxid   | (string) | the txid that identifies the original ask request |

### Response

| Structure | Type     | Description                                                                                          |
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
21d152480275568e3f82a5049d8b30308e3739ebd98171e075a75fea504364cd
```

</collapse-text>

The response is the transaction id.

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

| Structure | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| tokenid   | (string) | the txid that identifies the token                |
| bidtxid   | (string) | the txid that identifies the original bid request |

### Response

| Structure | Type     | Description                                                                                          |
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
21d152480275568e3f82a5049d8b30308e3739ebd98171e075a75fea504364cd
```

</collapse-text>

The response is the transaction id.

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

## tokenfillask

**tokenfillask tokenid asktxid fillamount**

The `tokenfillask` method fills an existing ask.

It returns a hex-encoded transaction which should then be broadcast using `sendrawtransaction`.

### Arguments

| Structure  | Type     | Description                            |
| ---------- | -------- | -------------------------------------- |
| tokenid    | (string) | the txid that identifies the token     |
| asktxid    | (string) | the txid that identifies the ask order |
| fillamount | (number) | the amount to fill                     |

### Response

| Structure | Type     | Description                                                                                          |
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
b6ebeaafced887fd63deb9207e0484570d49abe8fe4fcbaa026666d4ea3f902e
```

</collapse-text>

The response is the transaction id.

Step 3: Wait for the transaction to be confirmed

## tokenfillbid

**tokenfillbid tokenid bidtxid fillamount**

The `tokenfillbid` method fills an existing ask.

It returns a hex-encoded transaction which should then be broadcast using `sendrawtransaction`.

### Arguments

| Structure  | Type     | Description                            |
| ---------- | -------- | -------------------------------------- |
| tokenid    | (string) | the txid that identifies the token     |
| bidtxid    | (string) | the txid that identifies the bid order |
| fillamount | (number) | the amount to fill                     |

### Response

| Structure | Type     | Description                                                                                          |
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
b6ebeaafced887fd63deb9207e0484570d49abe8fe4fcbaa026666d4ea3f902e
```

</collapse-text>

The response is the transaction id.

Step 3: Wait for the transaction to be confirmed

## tokenorders

**tokenorders (tokenid)**

The `tokenorders` method displays the public on-chain orderbook for a specific token. If no `tokenid` is provided, it displays the on-chain orderbook for all available tokens.

Information about the `funcid` property:

- A lowercase `b` describes an bid offer.

- An uppercase `B` describes a bid fill.

- A lowercase `s` describes an ask offer.

- An uppercase `S` describes the ask fill.

### Arguments

| Structure | Type               | Description                           |
| --------- | ------------------ | ------------------------------------- |
| tokenid   | (string, optional) | the identifying txid for the token id |

### Response

| Structure           | Type                       | Description                                                                    |
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

#### :pushpin: Examples:

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


