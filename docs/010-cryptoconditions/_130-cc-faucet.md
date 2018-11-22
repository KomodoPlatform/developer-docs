# Smart Contract: Faucet

The `faucet` CryptoConditions smart contract enables anyone to set up and operate an on-chain faucet.

There may only be one `faucet` contract per asset chain.

For any faucet, there is a public address to which anyone can send their funds to support the faucet.  

A `faucet` rpc call can be executed by anyone on the asset chain, as long as their public address satisfies a few constraints: the user's pubkey and address must have no history of funds or transactions, and an address can claim faucet funds only once.

The [`faucetget`](#faucetget) is the rpc call that executes the `faucet` contract, and the rpc call requires the user to perform a small PoW calculation. This deters leechers.

When called, `faucet` sends 0.1 coins to the indicated address, and requires about 30 seconds of CPU time.

## faucetaddress


> Command:

```
./komodo-cli -ac_name=HELLOWORLD faucetaddress 03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc
```

> Response:

```
{
  "result": "success",
  "FaucetCCaddress": "RSxACZQhskPjQyxp7TUPG1oP1wm4agFycJ",
  "CCaddress": "RSxACZQhskPjQyxp7TUPG1oP1wm4agFycJ",
  "myCCaddress": "RSxACZQhskPjQyxp7TUPG1oP1wm4agFycJ",
  "myaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"
}
```

**faucetaddress [pubkey]**

The `faucetaddress` method returns the CC address information for the requested pubkey. If no pubkey is provided, the method returns information for the pubkey used to launch the daemon.

### Arguments:

Structure|Type|Description
---------|----|-----------
pubkey                                       |(string, optional)           |the desired pubkey; the method uses the pubkey used to launch the daemon if no pubkey is provided

### Response:

Structure|Type|Description
---------|----|-----------
FaucetCCaddress                              |(string)                     |taking the faucet contract's EVAL code as a modifyer, this is the public address that corresponds to the faucet contract's privkey
CCaddress                                    |(string)                     |taking the faucet contract's EVAL code as a modifyer, this is the CC address from the pubkey of the user
myCCaddress                                  |(string)                     |taking the dice contract's EVAL code as a modifyer, this is the CC address from the pubkey of the user
myaddress                                    |(string)                     |the unmodified public address of the pubkey used to launch the chain

## faucetfund

> Step 1: Specify faucet amount and get the raw transaction HEX value

```
./komodo-cli -ac_name=HELLOWORLD faucetfund 100
```

> Response from Step 1:

```
{
  "result": "success",
  "hex": "01000000013c34d14c6a32219f4b633a1fe01f5826b3bd7b4cbe01c20cfc0c29138d9c99720100000049483045022100b265993f541d580f10e8820f9986bdd479859fdcb2e636dd1ee1b23506eebeac02202234a6e5141345459c4b4959e921aa85b9fa616f4c44ea15e53d08bf4885259501ffffffff0200e40b5402000000302ea22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401cce06d66fa15090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000"
}
```

> Step 2: Broadcast/send raw transaction

```
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000013c34d14c6a32219f4b633a1fe01f5826b3bd7b4cbe01c20cfc0c29138d9c99720100000049483045022100b265993f541d580f10e8820f9986bdd479859fdcb2e636dd1ee1b23506eebeac02202234a6e5141345459c4b4959e921aa85b9fa616f4c44ea15e53d08bf4885259501ffffffff0200e40b5402000000302ea22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401cce06d66fa15090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000
```

> Response from Step 2:

```
    f2baf8d9a1eaf42bb1a85462b5699ffc0f04e8c54aafc4661767df96be9022b7
```

> Step 3: Decode raw transaction (optional to check if the values are sane)

```
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 01000000013c34d14c6a32219f4b633a1fe01f5826b3bd7b4cbe01c20cfc0c29138d9c99720100000049483045022100b265993f541d580f10e8820f9986bdd479859fdcb2e636dd1ee1b23506eebeac02202234a6e5141345459c4b4959e921aa85b9fa616f4c44ea15e53d08bf4885259501ffffffff0200e40b5402000000302ea22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401cce06d66fa15090000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000
```

> Response from Step 3

```
{
    "txid": "f2baf8d9a1eaf42bb1a85462b5699ffc0f04e8c54aafc4661767df96be9022b7",
    "size": 225,
    "version": 1,
    "locktime": 0,
    "vin": [
        {
            "txid": "72999c8d13290cfc0cc201be4c7bbdb326581fe01f3a634b9f21326a4cd1343c",
            "vout": 1,
            "scriptSig": {
                "asm": "3045022100b265993f541d580f10e8820f9986bdd479859fdcb2e636dd1ee1b23506eebeac02202234a6e5141345459c4b4959e921aa85b9fa616f4c44ea15e53d08bf4885259501",
                "hex": "483045022100b265993f541d580f10e8820f9986bdd479859fdcb2e636dd1ee1b23506eebeac02202234a6e5141345459c4b4959e921aa85b9fa616f4c44ea15e53d08bf4885259501"
            },
            "sequence": 4294967295
        }
    ],
    "vout": [
        {
            "value": 100.00000000,
            "valueSat": 10000000000,
            "n": 0,
            "scriptPubKey": {
                "asm": "a22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401 OP_CHECKCRYPTOCONDITION",
                "hex": "2ea22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401cc",
                "reqSigs": 1,
                "type": "cryptocondition",
                "addresses": [
                    "R9zHrofhRbub7ER77B7NrVch3A63R39GuC"
                ]
            }
        },
        {
            "value": 99899.99980000,
            "valueSat": 9989999980000,
            "n": 1,
            "scriptPubKey": {
                "asm": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc OP_CHECKSIG",
                "hex": "2103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac",
                "reqSigs": 1,
                "type": "pubkey",
                "addresses": [
                    "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"
                ]
            }
        }
    ]
}
```

**faucetfund amount**

The `faucetfund` method creates and funds a faucet contract.

The method returns a hex value which must then be broadcast using the [`sendrawtransaction`](#sendrawtransaction) method.

### Arguments:

Structure|Type|Description
---------|----|-----------
amount                                       |(number)                     |the amount to add to the faucet, taken from the user's available funds

### Response:

Structure|Type|Description
---------|----|-----------
result                                       |(string)                     |whether the command executed successfully
hex                                          |(string)                     |the data in hex-encoded format; you must broadcast this hex using sendrawtransaction for the command to complete

## faucetget

> Step 1: Use faucetget and get the raw HEX value

```
./komodo-cli -ac_name=HELLOWORLD faucetget
```

> Response from Step 1:

```
{
  "result": "success",
  "hex": "01000000010941cea65a560aeae02f0d49770965490bd99eeac4185f25075685da58e99d40000000007b4c79a276a072a26ba067a565802103682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe128140150ad95012ad8fae990096787d75d563977cef914e812e9dc8b6236243ac5f0050b3af4f2675ad433dcff4be16d113fb9a46357ee60682ed5d76c60f9ccffe8ea100af038001e4a10001ffffffff02b077a43018090000302ea22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401cc00e1f50500000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000"
  }
```

> Step 2: Broadcast/send the raw transaction

```
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000010941cea65a560aeae02f0d49770965490bd99eeac4185f25075685da58e99d40000000007b4c79a276a072a26ba067a565802103682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe128140150ad95012ad8fae990096787d75d563977cef914e812e9dc8b6236243ac5f0050b3af4f2675ad433dcff4be16d113fb9a46357ee60682ed5d76c60f9ccffe8ea100af038001e4a10001ffffffff02b077a43018090000302ea22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401cc00e1f50500000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000
```

> Response from Step 2:

```
faucetget validated
64760e66c49df97eea14896ecdd505d2d78ea214eb583c8a6a0ac863b2b989b3
```

> Step 3: Decode the raw transaction (optional to check if the value are sane)

```
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 01000000010941cea65a560aeae02f0d49770965490bd99eeac4185f25075685da58e99d40000000007b4c79a276a072a26ba067a565802103682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe128140150ad95012ad8fae990096787d75d563977cef914e812e9dc8b6236243ac5f0050b3af4f2675ad433dcff4be16d113fb9a46357ee60682ed5d76c60f9ccffe8ea100af038001e4a10001ffffffff02b077a43018090000302ea22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401cc00e1f50500000000232103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac00000000
```

> Response from Step 3:

```
{
    "txid": "64760e66c49df97eea14896ecdd505d2d78ea214eb583c8a6a0ac863b2b989b3",
    "size": 275,
    "version": 1,
    "locktime": 0,
    "vin": [
        {
            "txid": "409de958da855607255f18c4ea9ed90b49650977490d2fe0ea0a565aa6ce4109",
            "vout": 0,
            "scriptSig": {
                "asm": "a276a072a26ba067a565802103682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe128140150ad95012ad8fae990096787d75d563977cef914e812e9dc8b6236243ac5f0050b3af4f2675ad433dcff4be16d113fb9a46357ee60682ed5d76c60f9ccffe8ea100af038001e4a10001",
                "hex": "4c79a276a072a26ba067a565802103682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe128140150ad95012ad8fae990096787d75d563977cef914e812e9dc8b6236243ac5f0050b3af4f2675ad433dcff4be16d113fb9a46357ee60682ed5d76c60f9ccffe8ea100af038001e4a10001"
            },
            "sequence": 4294967295
        }
    ],
    "vout": [
        {
            "value": 99994.99950000,
            "valueSat": 9999499950000,
            "n": 0,
            "scriptPubKey": {
                "asm": "a22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401 OP_CHECKCRYPTOCONDITION",
                "hex": "2ea22c8020e029c511da55523565835887e412e5a0c9b920801b007000df45e545f25028248103120c008203000401cc",
                "reqSigs": 1,
                "type": "cryptocondition",
                "addresses": [
                    "R9zHrofhRbub7ER77B7NrVch3A63R39GuC"
                ]
            }
        },
        {
            "value": 1.00000000,
            "valueSat": 100000000,
            "n": 1,
            "scriptPubKey": {
                "asm": "03fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abc OP_CHECKSIG",
                "hex": "2103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcac",
                "reqSigs": 1,
                "type": "pubkey",
                "addresses": [
                    "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"
                ]
            }
        }
    ]
}
```

**faucetget**

The `faucetget` method requests the `faucet` contract to send coins.

The method returns a hex value which must then be broadcast using the [`sendrawtransaction`](#sendrawtransaction) method.

A `faucet` command yields 0.1 coins and requires about 30 seconds of CPU time.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
result                                       |(string)                     |whether the command executed successfully
hex                                          |(string)                     |the data in hex-encoded format; you must broadcast this hex using sendrawtransaction for the command to complete

## faucetinfo

> Command:

```
./komodo-cli -ac_name=HELLOWORLD faucetinfo
```

> Response:

```
    {
      "result": "success",
      "name": "Faucet",
      "funding": "200207.99860023"
    }
```

**faucetinfo**

The `faucetinfo` method displays the balance of funds in the chain's faucet.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
result                                       |(string)                     |whether the command executed successfully
name                                         |(string)                     |the name of the faucet contract
funding                                      |(number)                     |the amount of funds available in the faucet
