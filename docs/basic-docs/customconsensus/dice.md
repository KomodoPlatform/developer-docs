# Dice

## Introduction

The Dice Custom Consensus module allows for a decentralized `dice` game on a blockchain. The `dice` module is essentially a simple, but fully functional decentralized application (dApp).

It is also useful as a demonstration to show how Custom Consensus based contracts can leverage provably random entropy to enable blockchain-enforced real-time gameplay.

The Dice CC module is a simple gambling game, where one node creates a "house" contract, with seed funds and other parameters, and other users place bets within the indicated parameters. Winners and losers are determined through blockchain technology. This technology includes on-chain, consensus based, provably random entropy that derives from the activity of both the "house" and the users.

The "house" node should be running the [dicestatus](../customconsensus/dice.html#dicestatus) method at a regular frequency. This method resolves unfinished bets and generates new entropy utxos for the "house" contract.

To create a "house" contract, use [dicefund](../customconsensus/dice.html#dicefund) to initiate the contract, and then add several utxos to the fund with [diceaddfunds.](../customconsensus/dice.html#diceaddfunds)

Once the contract is created and funded, users can place a bet using [dicebet.](../customconsensus/dice.html#dicebet)

Anyone can execute a [dicefinish](../customconsensus/dice.html#dicefinish) RPC after the contract's time expires. This prevents the "house" node from cheating by going offline.

## diceaddfunds

**diceaddfunds name fundingtxid amount**

The `diceaddfunds` method adds funds to the desired `dice` contract.

Only the owner of the `dice` contract is able to add funds.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name | Type | Description | 
| ----------- | -------- | ----------------------------------------------------------------- |
| name        | (string) | the name of the user's dice contract                              |
| fundingtxid | (string) | the txid of the transaction that created and funded this contract |
| amount      | (number) | the amount of funds you want to add to your dice from your wallet |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create a raw transaction hex value for adding funds

```bash
./komodo-cli -ac_name=HELLOWORLD diceaddfunds MYDICECONTRACT ebfcff20fa5ab7bebf14b778e74bd6b34b02f100ff75e4cb611190f160ae4cf7 10
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0100000001646b59153d05ed0cb2b241dbbc42cd86df446ea43db8a66c68fdc2462e1bc6850000000049483045022100bdbf75970d7f708c4a5637d703b0a055e65a2eab0e71f6435604281d5981143d022008942029da09aa09bd0c9358b8169528e596968150e85d15c143c6961bf2b39501ffffffff0400ca9a3b00000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc1027000000000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcacf0aed71218090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000006d6a4c6ae6454b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffcebd22d4e75f4939198938b49036f71c3a0e00d20ca05237147aaed0d85cd50ff29000000000000000000000000000000000000000000000000000000000000000000000000"
}
```

</collapse-text>

Step 2: Send the raw transaction / broadcast the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0100000001646b59153d05ed0cb2b241dbbc42cd86df446ea43db8a66c68fdc2462e1bc6850000000049483045022100bdbf75970d7f708c4a5637d703b0a055e65a2eab0e71f6435604281d5981143d022008942029da09aa09bd0c9358b8169528e596968150e85d15c143c6961bf2b39501ffffffff0400ca9a3b00000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc1027000000000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcacf0aed71218090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000006d6a4c6ae6454b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffcebd22d4e75f4939198938b49036f71c3a0e00d20ca05237147aaed0d85cd50ff29000000000000000000000000000000000000000000000000000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
83370785623efc679de990b0d90bd45b375a0a53ce9e011259c31a8c747fd1ff
```

</collapse-text>

Step 3: Decode the raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 0100000001646b59153d05ed0cb2b241dbbc42cd86df446ea43db8a66c68fdc2462e1bc6850000000049483045022100bdbf75970d7f708c4a5637d703b0a055e65a2eab0e71f6435604281d5981143d022008942029da09aa09bd0c9358b8169528e596968150e85d15c143c6961bf2b39501ffffffff0400ca9a3b00000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc1027000000000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcacf0aed71218090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000006d6a4c6ae6454b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffcebd22d4e75f4939198938b49036f71c3a0e00d20ca05237147aaed0d85cd50ff29000000000000000000000000000000000000000000000000000000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "txid": "83370785623efc679de990b0d90bd45b375a0a53ce9e011259c31a8c747fd1ff",
  "size": 387,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "85c61b2e46c2fd686ca6b83da46e44df86cd42bcdb41b2b20ced053d15596b64",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100bdbf75970d7f708c4a5637d703b0a055e65a2eab0e71f6435604281d5981143d022008942029da09aa09bd0c9358b8169528e596968150e85d15c143c6961bf2b39501",
        "hex": "483045022100bdbf75970d7f708c4a5637d703b0a055e65a2eab0e71f6435604281d5981143d022008942029da09aa09bd0c9358b8169528e596968150e85d15c143c6961bf2b39501"
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
        "asm": "a22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["REabWB7KjFN5C3LFMZ5odExHPenYzHLtVw"]
      }
    },
    {
      "value": 0.0001,
      "valueSat": 10000,
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
      "value": 99989.9999,
      "valueSat": 9998999990000,
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
        "asm": "OP_RETURN e6454b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffcebd22d4e75f4939198938b49036f71c3a0e00d20ca05237147aaed0d85cd50ff290000000000000000000000000000000000000000000000000000000000000000",
        "hex": "6a4c6ae6454b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffcebd22d4e75f4939198938b49036f71c3a0e00d20ca05237147aaed0d85cd50ff290000000000000000000000000000000000000000000000000000000000000000",
        "type": "nulldata"
      }
    }
  ]
}
```

</collapse-text>

## diceaddress

**diceaddress (pubkey)**

The `diceaddress` method takes either your pubkey or a pubkey that you provide and returns the smart-contract address for the `dice` smart contract.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | -------------------------------------------------------------------------------------- |
| pubkey    | (string, optional) | the pubkey of the requested info; by default it is the pubkey used to launch the chain |

### Response

| Name | Type | Description | 
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| result         | (string) | whether the diceaddress method was successful                                                                                  |
| DiceCCaddress  | (string) | taking the dice contract's EVAL code as a modifier, this is the public address that corresponds to the dice contract's privkey |
| Dicemarker     | (string) | the unmodified public address generated from the dice contract's privkey                                                       |
| DiceCCassets   | (string) | the internal address; this value is not related to the usage of the Dice CC module                                             |
| GatewaysPubkey | (string) | the global pubkey for this Gateways CC module                                                                                  |
| myCCaddress    | (string) | taking the dice contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                         |
| myaddress      | (string) | the public address of the pubkey used to launch the chain                                                                      |

#### :pushpin: Examples

For the non-default pubkey.

```bash
./komodo-cli -ac_name=HELLOWORLD diceaddress 03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "DiceCCaddress": "REabWB7KjFN5C3LFMZ5odExHPenYzHLtVw",
  "Dicemarker": "RLEe8f7Eg3TDuXii9BmNiiiaVGraHUt25c",
  "GatewaysPubkey": "03ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb40",
  "DiceCCassets": "RLW83eT1eUAHHNenLzEutoLDe8nDf7Tdf6",
  "myCCaddress": "RTEk4ykVCGYpATHUm98NwKcPCu3z76oAmi",
  "myaddress": "RJYiWn3FRCSSLf9Pe5RJcbrKQYosaMburP"
}
```

</collapse-text>

## dicebet

**dicebet name fundingtxid amount odds**

The `dicebet` method places a bet on the indicated `dice` contract.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name | Type | Description | 
| ----------- | -------- | ----------------------------------------------------------------------- |
| name        | (string) | the name of the dice contract for which the user desires to place a bet |
| fundingtxid | (string) | the txid of the transaction that created and funded this contract       |
| amount      | (number) | the amount the user dires to place as a bet                             |
| odds        | (number) | specify the user's odds                                                 |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| "result"  | (string) | whether the dicebet command executed successfully                                                          |
| "hex"     | (string) | the data of the user's transaction, in a raw hex-encoded format; broadcast this using `sendrawtransaction` |

#### :pushpin: Examples

Step 1: Set your parameters to create a raw transaction and get the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD dicebet KMDDice ebfcff20fa5ab7bebf14b778e74bd6b34b02f100ff75e4cb611190f160ae4cf7 7 7
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "010000000378c9b0720ac4ffda232bd8ebc1ebf10d78efe23daf59ad887439baf72a3ffd03000000007b4c79a276a072a26ba067a5658021039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94e8140fe35ae062eb8239b1eec5407c71e27531f281dc369b55c3d3c235a87f6c10b3d4e7a029a6420e4fa076bd1d3da013287a17973fb6684bc487335ce176e7488d3a100af038001e6a10001ffffffff0b2261be0d143f42b833bcdf6e95582d4071f7d7d1d03eb1de0893eb7dc563ef0200000049483045022100f934f292e5ef9b3c605b83381abec1d99c7119d35a3833e40e65d788191ea51402207e925062602bb603f7109e3f36009563952741e666210195686de27b61515cc801ffffffff0b2261be0d143f42b833bcdf6e95582d4071f7d7d1d03eb1de0893eb7dc563ef0300000048473044022020aa8c2d6dc9727ce32f34ae704eb374b7cf87f43250a2d10072fad266f6602e02201fce01ae5c550438f2a512ab13f4c40d411d7726f32046e989b9747af33fd4e101ffffffff0500ca9a3b00000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc0027b92900000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc1727000000000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcacc91265bf17090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000006d6a4c6ae6424b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffceb6b2540dd22241ca6e72fe32c1cd1d2a9528140cad290f1599041e06589040067000000000000000000000000000000000000000000000000000000000000000000000000"
}
```

</collapse-text>

Step 2: Send/broadcast the raw transaction hex

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000378c9b0720ac4ffda232bd8ebc1ebf10d78efe23daf59ad887439baf72a3ffd03000000007b4c79a276a072a26ba067a5658021039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94e8140fe35ae062eb8239b1eec5407c71e27531f281dc369b55c3d3c235a87f6c10b3d4e7a029a6420e4fa076bd1d3da013287a17973fb6684bc487335ce176e7488d3a100af038001e6a10001ffffffff0b2261be0d143f42b833bcdf6e95582d4071f7d7d1d03eb1de0893eb7dc563ef0200000049483045022100f934f292e5ef9b3c605b83381abec1d99c7119d35a3833e40e65d788191ea51402207e925062602bb603f7109e3f36009563952741e666210195686de27b61515cc801ffffffff0b2261be0d143f42b833bcdf6e95582d4071f7d7d1d03eb1de0893eb7dc563ef0300000048473044022020aa8c2d6dc9727ce32f34ae704eb374b7cf87f43250a2d10072fad266f6602e02201fce01ae5c550438f2a512ab13f4c40d411d7726f32046e989b9747af33fd4e101ffffffff0500ca9a3b00000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc0027b92900000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc1727000000000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcacc91265bf17090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000006d6a4c6ae6424b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffceb6b2540dd22241ca6e72fe32c1cd1d2a9528140cad290f1599041e06589040067000000000000000000000000000000000000000000000000000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
694c309c86a928fde1919a86381f61670479c3ede85ea0574d08636cc406e798
```

</collapse-text>

Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 010000000378c9b0720ac4ffda232bd8ebc1ebf10d78efe23daf59ad887439baf72a3ffd03000000007b4c79a276a072a26ba067a5658021039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94e8140fe35ae062eb8239b1eec5407c71e27531f281dc369b55c3d3c235a87f6c10b3d4e7a029a6420e4fa076bd1d3da013287a17973fb6684bc487335ce176e7488d3a100af038001e6a10001ffffffff0b2261be0d143f42b833bcdf6e95582d4071f7d7d1d03eb1de0893eb7dc563ef0200000049483045022100f934f292e5ef9b3c605b83381abec1d99c7119d35a3833e40e65d788191ea51402207e925062602bb603f7109e3f36009563952741e666210195686de27b61515cc801ffffffff0b2261be0d143f42b833bcdf6e95582d4071f7d7d1d03eb1de0893eb7dc563ef0300000048473044022020aa8c2d6dc9727ce32f34ae704eb374b7cf87f43250a2d10072fad266f6602e02201fce01ae5c550438f2a512ab13f4c40d411d7726f32046e989b9747af33fd4e101ffffffff0500ca9a3b00000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc0027b92900000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc1727000000000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcacc91265bf17090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000006d6a4c6ae6424b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffceb6b2540dd22241ca6e72fe32c1cd1d2a9528140cad290f1599041e06589040067000000000000000000000000000000000000000000000000000000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "txid": "694c309c86a928fde1919a86381f61670479c3ede85ea0574d08636cc406e798",
  "size": 721,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "03fd3f2af7ba397488ad59af3de2ef780df1ebc1ebd82b23daffc40a72b0c978",
      "vout": 0,
      "scriptSig": {
        "asm": "a276a072a26ba067a5658021039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94e8140fe35ae062eb8239b1eec5407c71e27531f281dc369b55c3d3c235a87f6c10b3d4e7a029a6420e4fa076bd1d3da013287a17973fb6684bc487335ce176e7488d3a100af038001e6a10001",
        "hex": "4c79a276a072a26ba067a5658021039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94e8140fe35ae062eb8239b1eec5407c71e27531f281dc369b55c3d3c235a87f6c10b3d4e7a029a6420e4fa076bd1d3da013287a17973fb6684bc487335ce176e7488d3a100af038001e6a10001"
      },
      "sequence": 4294967295
    },
    {
      "txid": "ef63c57deb9308deb13ed0d1d7f771402d58956edfbc33b8423f140dbe61220b",
      "vout": 2,
      "scriptSig": {
        "asm": "3045022100f934f292e5ef9b3c605b83381abec1d99c7119d35a3833e40e65d788191ea51402207e925062602bb603f7109e3f36009563952741e666210195686de27b61515cc801",
        "hex": "483045022100f934f292e5ef9b3c605b83381abec1d99c7119d35a3833e40e65d788191ea51402207e925062602bb603f7109e3f36009563952741e666210195686de27b61515cc801"
      },
      "sequence": 4294967295
    },
    {
      "txid": "ef63c57deb9308deb13ed0d1d7f771402d58956edfbc33b8423f140dbe61220b",
      "vout": 3,
      "scriptSig": {
        "asm": "3044022020aa8c2d6dc9727ce32f34ae704eb374b7cf87f43250a2d10072fad266f6602e02201fce01ae5c550438f2a512ab13f4c40d411d7726f32046e989b9747af33fd4e101",
        "hex": "473044022020aa8c2d6dc9727ce32f34ae704eb374b7cf87f43250a2d10072fad266f6602e02201fce01ae5c550438f2a512ab13f4c40d411d7726f32046e989b9747af33fd4e101"
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
        "asm": "a22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["REabWB7KjFN5C3LFMZ5odExHPenYzHLtVw"]
      }
    },
    {
      "value": 7.0,
      "valueSat": 700000000,
      "n": 1,
      "scriptPubKey": {
        "asm": "a22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["REabWB7KjFN5C3LFMZ5odExHPenYzHLtVw"]
      }
    },
    {
      "value": 0.00010007,
      "valueSat": 10007,
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
      "value": 99975.99969993,
      "valueSat": 9997599969993,
      "n": 3,
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
      "n": 4,
      "scriptPubKey": {
        "asm": "OP_RETURN e6424b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffceb6b2540dd22241ca6e72fe32c1cd1d2a9528140cad290f1599041e065890400670000000000000000000000000000000000000000000000000000000000000000",
        "hex": "6a4c6ae6424b4d444469636500f74cae60f1901161cbe475ff00f1024bb3d64be778b714bfbeb75afa20fffceb6b2540dd22241ca6e72fe32c1cd1d2a9528140cad290f1599041e065890400670000000000000000000000000000000000000000000000000000000000000000",
        "type": "nulldata"
      }
    }
  ]
}
```

</collapse-text>

## dicefinish

**dicefinish name fundingtxid bettxid**

The `dicefinish` method rebroadcasts a bet that was previously broadcast.

If the returned `hex` value is `0` the bet is finished.

If the returned `hex` value is not `0`, the `hex` value should be broadcast with [sendrawtransaction.](../komodo-api/rawtransactions.html#sendrawtransaction) If the bet has not finished or is stuck, the `hex` will have a value.

### Arguments

| Name | Type | Description | 
| ----------- | -------- | ----------------------------------------------------------------- |
| name        | (string) | the name of the dice contract                                     |
| fundingtxid | (string) | the txid of the transaction that created and funded this contract |
| bettxid     | (string) | the txid of the bet for which finish status is requested          |

### Response

| Name | Type | Description | 
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| result    | (string) | whether the command executed successfully                                                                                                                                                                                                  |
| hex       | (string) | if the contract is already finished, the resulting hex is 0; if the contract is not finished, the value of hex will be a rawtransaction that the user can broadcast to let the blockchain automatically declare a winner and close the bet |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD dicefinish DICE3 4132ca8e8d46df9f8a8cbe83c99794497e06bbd190bd71f4abcdedf84e90952e d54335073e549cd75a050fd4d6ba5939307cda7096ba0f3da779fb7d07e46343
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0"
}
```

</collapse-text>

## dicefund

**dicefund name funds minbet maxbet maxodds timeoutblocks**

The `dicefund` method creates and funds a dice contract.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

Ideally, the dice creator node should be online throughout the contract's life, to determine `winning bid` or `losing bid`.

If the dice creator node is offline after the `timeoutblocks` period completes, the system will automatically declare the bet's winner and payout winning funds.

Typically, the creator should set the `timeoutblocks` property to a longer period. This prevents the house from losing funds if the house's node unexpectedly experiences downtime.

The `maxodds` property must be between 1 and 9999.

### Arguments

| Name | Type | Description | 
| ------------- | -------- | --------------------------------------------------------------------------------------------- |
| name          | (string) | the name of the user's dice contract                                                          |
| funds         | (number) | the amount of funds with which the user desires to start                                      |
| minbet        | (number) | the minimum amount allowed for a bet                                                          |
| maxbet        | (number) | the maximum amount allowed for a bet                                                          |
| maxodds       | (number) | the largest odds an end-user can use for betting                                              |
| timeoutblocks | (number) | the number of blocks before the contract times out and pays the automatically declared winner |

### Response

| Name | Type | Description | 
| --------- | -------- | --------------------------------------------------------------------------------------------------------- |
| result    | (string) | whether the command executed successfully                                                                 |
| hex       | (string) | the data of the transaction in raw hex-encoded format; broadcast this using the sendrawtransaction method |

#### :pushpin: Examples

Step 1: Create your customized Dice contract and get the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD dicefund KMDDice 777777 0.777 7.77 777 7
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "010000000a5890b79f42a2039d6b661cec3f0a748f8122b51427d2747d7cddb45e7c774988010000004847304402206544c1d0bb42da89d93e58526a28b3c80ef45dca516ecd11ee3fe7fc35a5261c02207f0b134ff5cdb840692a65eccd86fb2fc2a63afc6f1309a2ed9d054d1a076b1201ffffffff5b90bd88124ebd1a0988c612902234782b737b860189fb5871088d2d3aae2481020000004948304502210091972c641291022da6d49ab8d3790ccdbb0f563b385b89ac723fa688a6c84ee202207198c3d48ce1d9591fce6fb41192145c38f8312c7a78251f4231986070a3283a01ffffffff5bfb06fac51707a69414a1f908ac3f9eb3fca50f303c4ae960f94491e8dc7f5c0100000049483045022100ea0b49d902f844ef280b8621cdc5a5365a779a04a159ba30e00bd0b3eaf284da02205aece19ee807ce11b0ed7b74175df29dd2be4560361174664571a6a596a894fd01ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471020000004847304402203eb318ae650753ab7cc2e9ea9b2cc2477add2fbd9e49e0ac1d7560f7e08ecbb002202d77d75ed2c1d3b53feda45c699374f74d1bf1065b46e3a24514dd072f2a9dcb01ffffffff5d5132ee6f33ba09b4bcfb84beddfcbdf58888ea7f221cc8078a96865e1e0ea10000000049483045022100e3cc5062becc979fc347a9ccde6af8ebba39c0d88105c9a35c89876207fafb0202204f631d063911e4526958f6629a847cca832d845a86adcae248625fd45b03e7d001ffffffff5e626ec0b20cd783ee0bf52aa33189796ddd4649d31b64fdee10b6daecbd079200000000494830450221009f3c17ccc73f28d9ba1d80c149890f56c6aafa576e152eb776082d12d54548eb022053f3b87eee04d9f5ef9f961d79433ec76b0f0e4a2288104212db01f6d2d7d1f801ffffffff5eb56cd4df0702b06debcf36de8309432b8140daa0a2544159ff68bbb96ed2050000000048473044022029bbf3fa5dea810d70ea9ef9b81b5ee72c3b3ec7d59faae4ca9658ed723ef683022060226d854ff44aebeba36bfda9e664185be0999ce7ee8b7b053f67642bd8c64101ffffffff603757f4b8370432cf30b12abdbb93b888e7707cd4321851f926779ee126e24402000000484730440220717994adac8b009a0f110438cef1e226d6674494e774813fad044b340c38052002202852c11fcc5bb1f3aa39e3dbbf00aa0d2b808c1c0769fbd692201cf10e96644b01ffffffff62347ddc97606a28457514a53b16d7fd9534c3c12d3f890cf72536f130737bae020000004847304402202dcf8a066fc56dae83f2259f902707aff7484251666c5b01a2e71e909fe859630220306a4149afce43dc343e103cdf4926ae9bf9f9a7a6eed9bf235efe04e619daea01ffffffff63686994d134931e0b43809f6d9ab73f7053d9aaa143987c56083345eddb5ec60100000048473044022066b3aadd3f2545c953f7389a062831736eda6c01f9df20e56b107d87fa6bfe8d02204357d85e1ab484c779fac5eab5d01fd39f5caf1ecde499873de34ac5e204b7ab01ffffffff0400112e08bd460000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc10270000000000002321039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94eac100b47751c020000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000002c6a2ae6464b4d444469636500a09ba104000000004014502e000000000903000000000000070000000000000000000000"
}
```

</collapse-text>

Step 2: Send raw transaction / Broadcast the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000a5890b79f42a2039d6b661cec3f0a748f8122b51427d2747d7cddb45e7c774988010000004847304402206544c1d0bb42da89d93e58526a28b3c80ef45dca516ecd11ee3fe7fc35a5261c02207f0b134ff5cdb840692a65eccd86fb2fc2a63afc6f1309a2ed9d054d1a076b1201ffffffff5b90bd88124ebd1a0988c612902234782b737b860189fb5871088d2d3aae2481020000004948304502210091972c641291022da6d49ab8d3790ccdbb0f563b385b89ac723fa688a6c84ee202207198c3d48ce1d9591fce6fb41192145c38f8312c7a78251f4231986070a3283a01ffffffff5bfb06fac51707a69414a1f908ac3f9eb3fca50f303c4ae960f94491e8dc7f5c0100000049483045022100ea0b49d902f844ef280b8621cdc5a5365a779a04a159ba30e00bd0b3eaf284da02205aece19ee807ce11b0ed7b74175df29dd2be4560361174664571a6a596a894fd01ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471020000004847304402203eb318ae650753ab7cc2e9ea9b2cc2477add2fbd9e49e0ac1d7560f7e08ecbb002202d77d75ed2c1d3b53feda45c699374f74d1bf1065b46e3a24514dd072f2a9dcb01ffffffff5d5132ee6f33ba09b4bcfb84beddfcbdf58888ea7f221cc8078a96865e1e0ea10000000049483045022100e3cc5062becc979fc347a9ccde6af8ebba39c0d88105c9a35c89876207fafb0202204f631d063911e4526958f6629a847cca832d845a86adcae248625fd45b03e7d001ffffffff5e626ec0b20cd783ee0bf52aa33189796ddd4649d31b64fdee10b6daecbd079200000000494830450221009f3c17ccc73f28d9ba1d80c149890f56c6aafa576e152eb776082d12d54548eb022053f3b87eee04d9f5ef9f961d79433ec76b0f0e4a2288104212db01f6d2d7d1f801ffffffff5eb56cd4df0702b06debcf36de8309432b8140daa0a2544159ff68bbb96ed2050000000048473044022029bbf3fa5dea810d70ea9ef9b81b5ee72c3b3ec7d59faae4ca9658ed723ef683022060226d854ff44aebeba36bfda9e664185be0999ce7ee8b7b053f67642bd8c64101ffffffff603757f4b8370432cf30b12abdbb93b888e7707cd4321851f926779ee126e24402000000484730440220717994adac8b009a0f110438cef1e226d6674494e774813fad044b340c38052002202852c11fcc5bb1f3aa39e3dbbf00aa0d2b808c1c0769fbd692201cf10e96644b01ffffffff62347ddc97606a28457514a53b16d7fd9534c3c12d3f890cf72536f130737bae020000004847304402202dcf8a066fc56dae83f2259f902707aff7484251666c5b01a2e71e909fe859630220306a4149afce43dc343e103cdf4926ae9bf9f9a7a6eed9bf235efe04e619daea01ffffffff63686994d134931e0b43809f6d9ab73f7053d9aaa143987c56083345eddb5ec60100000048473044022066b3aadd3f2545c953f7389a062831736eda6c01f9df20e56b107d87fa6bfe8d02204357d85e1ab484c779fac5eab5d01fd39f5caf1ecde499873de34ac5e204b7ab01ffffffff0400112e08bd460000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc10270000000000002321039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94eac100b47751c020000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000002c6a2ae6464b4d444469636500a09ba104000000004014502e000000000903000000000000070000000000000000000000
```

<collapse-text hidden title="Response">

```bash
ebfcff20fa5ab7bebf14b778e74bd6b34b02f100ff75e4cb611190f160ae4cf7
```

</collapse-text>

Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 010000000a5890b79f42a2039d6b661cec3f0a748f8122b51427d2747d7cddb45e7c774988010000004847304402206544c1d0bb42da89d93e58526a28b3c80ef45dca516ecd11ee3fe7fc35a5261c02207f0b134ff5cdb840692a65eccd86fb2fc2a63afc6f1309a2ed9d054d1a076b1201ffffffff5b90bd88124ebd1a0988c612902234782b737b860189fb5871088d2d3aae2481020000004948304502210091972c641291022da6d49ab8d3790ccdbb0f563b385b89ac723fa688a6c84ee202207198c3d48ce1d9591fce6fb41192145c38f8312c7a78251f4231986070a3283a01ffffffff5bfb06fac51707a69414a1f908ac3f9eb3fca50f303c4ae960f94491e8dc7f5c0100000049483045022100ea0b49d902f844ef280b8621cdc5a5365a779a04a159ba30e00bd0b3eaf284da02205aece19ee807ce11b0ed7b74175df29dd2be4560361174664571a6a596a894fd01ffffffff5ca636731b8c28889248a0b434e3124f19518b2c4b4bbefd80af303329ae9471020000004847304402203eb318ae650753ab7cc2e9ea9b2cc2477add2fbd9e49e0ac1d7560f7e08ecbb002202d77d75ed2c1d3b53feda45c699374f74d1bf1065b46e3a24514dd072f2a9dcb01ffffffff5d5132ee6f33ba09b4bcfb84beddfcbdf58888ea7f221cc8078a96865e1e0ea10000000049483045022100e3cc5062becc979fc347a9ccde6af8ebba39c0d88105c9a35c89876207fafb0202204f631d063911e4526958f6629a847cca832d845a86adcae248625fd45b03e7d001ffffffff5e626ec0b20cd783ee0bf52aa33189796ddd4649d31b64fdee10b6daecbd079200000000494830450221009f3c17ccc73f28d9ba1d80c149890f56c6aafa576e152eb776082d12d54548eb022053f3b87eee04d9f5ef9f961d79433ec76b0f0e4a2288104212db01f6d2d7d1f801ffffffff5eb56cd4df0702b06debcf36de8309432b8140daa0a2544159ff68bbb96ed2050000000048473044022029bbf3fa5dea810d70ea9ef9b81b5ee72c3b3ec7d59faae4ca9658ed723ef683022060226d854ff44aebeba36bfda9e664185be0999ce7ee8b7b053f67642bd8c64101ffffffff603757f4b8370432cf30b12abdbb93b888e7707cd4321851f926779ee126e24402000000484730440220717994adac8b009a0f110438cef1e226d6674494e774813fad044b340c38052002202852c11fcc5bb1f3aa39e3dbbf00aa0d2b808c1c0769fbd692201cf10e96644b01ffffffff62347ddc97606a28457514a53b16d7fd9534c3c12d3f890cf72536f130737bae020000004847304402202dcf8a066fc56dae83f2259f902707aff7484251666c5b01a2e71e909fe859630220306a4149afce43dc343e103cdf4926ae9bf9f9a7a6eed9bf235efe04e619daea01ffffffff63686994d134931e0b43809f6d9ab73f7053d9aaa143987c56083345eddb5ec60100000048473044022066b3aadd3f2545c953f7389a062831736eda6c01f9df20e56b107d87fa6bfe8d02204357d85e1ab484c779fac5eab5d01fd39f5caf1ecde499873de34ac5e204b7ab01ffffffff0400112e08bd460000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc10270000000000002321039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94eac100b47751c020000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000000000002c6a2ae6464b4d444469636500a09ba104000000004014502e000000000903000000000000070000000000000000000000
```

<collapse-text hidden title="Response">

```json
{
  "txid": "ebfcff20fa5ab7bebf14b778e74bd6b34b02f100ff75e4cb611190f160ae4cf7",
  "size": 1342,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "8849777c5eb4dd7c7d74d22714b522818f740a3fec1c666b9d03a2429fb79058",
      "vout": 1,
      "scriptSig": {
        "asm": "304402206544c1d0bb42da89d93e58526a28b3c80ef45dca516ecd11ee3fe7fc35a5261c02207f0b134ff5cdb840692a65eccd86fb2fc2a63afc6f1309a2ed9d054d1a076b1201",
        "hex": "47304402206544c1d0bb42da89d93e58526a28b3c80ef45dca516ecd11ee3fe7fc35a5261c02207f0b134ff5cdb840692a65eccd86fb2fc2a63afc6f1309a2ed9d054d1a076b1201"
      },
      "sequence": 4294967295
    },
    {
      "txid": "8124ae3a2d8d087158fb8901867b732b7834229012c688091abd4e1288bd905b",
      "vout": 2,
      "scriptSig": {
        "asm": "304502210091972c641291022da6d49ab8d3790ccdbb0f563b385b89ac723fa688a6c84ee202207198c3d48ce1d9591fce6fb41192145c38f8312c7a78251f4231986070a3283a01",
        "hex": "48304502210091972c641291022da6d49ab8d3790ccdbb0f563b385b89ac723fa688a6c84ee202207198c3d48ce1d9591fce6fb41192145c38f8312c7a78251f4231986070a3283a01"
      },
      "sequence": 4294967295
    },
    {
      "txid": "5c7fdce89144f960e94a3c300fa5fcb39e3fac08f9a11494a60717c5fa06fb5b",
      "vout": 1,
      "scriptSig": {
        "asm": "3045022100ea0b49d902f844ef280b8621cdc5a5365a779a04a159ba30e00bd0b3eaf284da02205aece19ee807ce11b0ed7b74175df29dd2be4560361174664571a6a596a894fd01",
        "hex": "483045022100ea0b49d902f844ef280b8621cdc5a5365a779a04a159ba30e00bd0b3eaf284da02205aece19ee807ce11b0ed7b74175df29dd2be4560361174664571a6a596a894fd01"
      },
      "sequence": 4294967295
    },
    {
      "txid": "7194ae293330af80fdbe4b4b2c8b51194f12e334b4a0489288288c1b7336a65c",
      "vout": 2,
      "scriptSig": {
        "asm": "304402203eb318ae650753ab7cc2e9ea9b2cc2477add2fbd9e49e0ac1d7560f7e08ecbb002202d77d75ed2c1d3b53feda45c699374f74d1bf1065b46e3a24514dd072f2a9dcb01",
        "hex": "47304402203eb318ae650753ab7cc2e9ea9b2cc2477add2fbd9e49e0ac1d7560f7e08ecbb002202d77d75ed2c1d3b53feda45c699374f74d1bf1065b46e3a24514dd072f2a9dcb01"
      },
      "sequence": 4294967295
    },
    {
      "txid": "a10e1e5e86968a07c81c227fea8888f5bdfcddbe84fbbcb409ba336fee32515d",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100e3cc5062becc979fc347a9ccde6af8ebba39c0d88105c9a35c89876207fafb0202204f631d063911e4526958f6629a847cca832d845a86adcae248625fd45b03e7d001",
        "hex": "483045022100e3cc5062becc979fc347a9ccde6af8ebba39c0d88105c9a35c89876207fafb0202204f631d063911e4526958f6629a847cca832d845a86adcae248625fd45b03e7d001"
      },
      "sequence": 4294967295
    },
    {
      "txid": "9207bdecdab610eefd641bd34946dd6d798931a32af50bee83d70cb2c06e625e",
      "vout": 0,
      "scriptSig": {
        "asm": "30450221009f3c17ccc73f28d9ba1d80c149890f56c6aafa576e152eb776082d12d54548eb022053f3b87eee04d9f5ef9f961d79433ec76b0f0e4a2288104212db01f6d2d7d1f801",
        "hex": "4830450221009f3c17ccc73f28d9ba1d80c149890f56c6aafa576e152eb776082d12d54548eb022053f3b87eee04d9f5ef9f961d79433ec76b0f0e4a2288104212db01f6d2d7d1f801"
      },
      "sequence": 4294967295
    },
    {
      "txid": "05d26eb9bb68ff594154a2a0da40812b430983de36cfeb6db00207dfd46cb55e",
      "vout": 0,
      "scriptSig": {
        "asm": "3044022029bbf3fa5dea810d70ea9ef9b81b5ee72c3b3ec7d59faae4ca9658ed723ef683022060226d854ff44aebeba36bfda9e664185be0999ce7ee8b7b053f67642bd8c64101",
        "hex": "473044022029bbf3fa5dea810d70ea9ef9b81b5ee72c3b3ec7d59faae4ca9658ed723ef683022060226d854ff44aebeba36bfda9e664185be0999ce7ee8b7b053f67642bd8c64101"
      },
      "sequence": 4294967295
    },
    {
      "txid": "44e226e19e7726f9511832d47c70e788b893bbbd2ab130cf320437b8f4573760",
      "vout": 2,
      "scriptSig": {
        "asm": "30440220717994adac8b009a0f110438cef1e226d6674494e774813fad044b340c38052002202852c11fcc5bb1f3aa39e3dbbf00aa0d2b808c1c0769fbd692201cf10e96644b01",
        "hex": "4730440220717994adac8b009a0f110438cef1e226d6674494e774813fad044b340c38052002202852c11fcc5bb1f3aa39e3dbbf00aa0d2b808c1c0769fbd692201cf10e96644b01"
      },
      "sequence": 4294967295
    },
    {
      "txid": "ae7b7330f13625f70c893f2dc1c33495fdd7163ba5147545286a6097dc7d3462",
      "vout": 2,
      "scriptSig": {
        "asm": "304402202dcf8a066fc56dae83f2259f902707aff7484251666c5b01a2e71e909fe859630220306a4149afce43dc343e103cdf4926ae9bf9f9a7a6eed9bf235efe04e619daea01",
        "hex": "47304402202dcf8a066fc56dae83f2259f902707aff7484251666c5b01a2e71e909fe859630220306a4149afce43dc343e103cdf4926ae9bf9f9a7a6eed9bf235efe04e619daea01"
      },
      "sequence": 4294967295
    },
    {
      "txid": "c65edbed453308567c9843a1aad953703fb79a6d9f80430b1e9334d194696863",
      "vout": 1,
      "scriptSig": {
        "asm": "3044022066b3aadd3f2545c953f7389a062831736eda6c01f9df20e56b107d87fa6bfe8d02204357d85e1ab484c779fac5eab5d01fd39f5caf1ecde499873de34ac5e204b7ab01",
        "hex": "473044022066b3aadd3f2545c953f7389a062831736eda6c01f9df20e56b107d87fa6bfe8d02204357d85e1ab484c779fac5eab5d01fd39f5caf1ecde499873de34ac5e204b7ab01"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 777777.0,
      "valueSat": 77777700000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["REabWB7KjFN5C3LFMZ5odExHPenYzHLtVw"]
      }
    },
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94e OP_CHECKSIG",
        "hex": "21039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94eac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RLEe8f7Eg3TDuXii9BmNiiiaVGraHUt25c"]
      }
    },
    {
      "value": 23212.4993,
      "valueSat": 2321249930000,
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
        "asm": "OP_RETURN e6464b4d444469636500a09ba104000000004014502e0000000009030000000000000700000000000000",
        "hex": "6a2ae6464b4d444469636500a09ba104000000004014502e0000000009030000000000000700000000000000",
        "type": "nulldata"
      }
    }
  ]
}
```

</collapse-text>

## diceinfo

**diceinfo fundingtxid**

The `diceinfo` method looks up information about the specific `dice` contract referred by the relevant `fundingtxid`.

A `fundingtxid` is the txid of the transaction that created and funded the relevant contract.

Use the [dicelist](../customconsensus/dice.html#dicelist) method to discover a list of available `fundingtxid` hashes on the asset chain.

### Arguments

| Name | Type | Description | 
| ----------- | -------- | ----------------------------------------------------------------- |
| fundingtxid | (string) | the txid of the transaction that created and funded this contract |

### Response

| Name | Type | Description | 
| --------------- | -------- | --------------------------------------------------------------------------------------------------- |
| "result"        | (string) | whether the command executed successfully                                                           |
| "fundingtxid"   | (string) | the txid of the transaction that created and funded this contract                                   |
| "name"          | (string) | the name of the dice contract                                                                       |
| "sbits"         | (number) | a 64-bit int binary encoding of the first 8 characters of the name property                         |
| "minbet"        | (number) | the minimum bet amount this contract accepts                                                        |
| "maxbet"        | (number) | the maximum bet amount this contract accepts                                                        |
| "maxodds"       | (number) | the maximum odds the contract accepts                                                               |
| "timeoutblocks" | (number) | the number of blocks before the contract allows an automatically declared winner and the bet closes |
| "funding"       | (number) | the current amount of funds in the contract                                                         |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD diceinfo 0d6e82af9959caec14d7af42fd67db68a45bcd23c755457ebf192a52d62c599c
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "fundingtxid": "0d6e82af9959caec14d7af42fd67db68a45bcd23c755457ebf192a52d62c599c",
  "name": "dice",
  "sbits": 1701013860,
  "minbet": "1.00000000",
  "maxbet": "100.00000000",
  "maxodds": 10,
  "timeoutblocks": 5,
  "funding": "1000.00000000"
}
```

</collapse-text>

## dicelist

**dicelist**

The `dicelist` method displays the total list of `fundingtxid`'s of all `dice` contracts available on the asset chain.

A `fundingtxid` is the txid of the transaction that created and funded the relevant contract.

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| ----------- | -------- | ------------------------------------------------------------------------- |
| fundingtxid | (string) | the txid of the transaction that created and funded the relevant contract |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD dicelist
```

<collapse-text hidden title="Response">

```bash
[
  "0d6e82af9959caec14d7af42fd67db68a45bcd23c755457ebf192a52d62c599c"
]
```

</collapse-text>

## dicestatus

**dicestatus name fundingtxid bettxid**

The `dicestatus` method prints the status of a `dicebet` and returns whether the `bettxid` received a winning or losing result.

### Arguments

| Name | Type | Description | 
| ----------- | -------- | ----------------------------------------------------------------- |
| name        | (string) | the name of the dice contract                                     |
| fundingtxid | (string) | the txid of the transaction that created and funded this contract |
| bettxid     | (string) | the bettxid, the result of which is desired                       |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------- |
| result    | (string) | whether the command executed successfully      |
| status    | (string) | the result of the bet for the relevant bettxid |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=AT1 dicestatus DICE3 4132ca8e8d46df9f8a8cbe83c99794497e06bbd190bd71f4abcdedf84e90952e d54335073e549cd75a050fd4d6ba5939307cda7096ba0f3da779fb7d07e46343
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "status": "loss"
}
```

</collapse-text>
