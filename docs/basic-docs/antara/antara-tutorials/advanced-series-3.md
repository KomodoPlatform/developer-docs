# Advanced Series — Preparing for Heir Development

This tutorial in the series assists the reader in preparing to later build a full simplified prototype of the default [<b>Heir Antara Module.</b>](../../../basic-docs/fluidity/fluidity-api/heir.html)

The primary aim for buildling the Heir prototype is to give the developer direct engagement with Antara Module development, with a focus on the CryptoConditions (CC) aspects. This process will give the developer a better grasp of the broad potential of the Antara framework.

Furthermore, in the process of completing this tutorial the developer will learn how the source code is organized.

## A Conceptual Understanding of the Intended Product

To gain an idea of the intended result, read the introduction of the Heir Module API. (Read until the start of the section named <b>Heir Module Flow</b> and then pause.)

[Link to Introduction to the Heir Antara Module](../basic-docs/fluidity/fluidity-api/heir.html#introduction)

The basic concept to understand is that the Heir module allows the owner of a Smart Chain digital asset to designate an inheritor of the asset, should the owner become inactive on the chain.

In terms of design, this is a relatively straightforward Antara Module, which is one reason we use it here.

## Complete the Heir Module Flow Section (Optional)

Before we begin the development process, it may be helpful to first experiment with the flow of RPC commands for the existing Heir module.

This section is optional, but recommended.

At this point in the tutorial series, the reader can either create a new default Smart Chain to test the Heir Module, or they may use an existing Smart Chain, such as RICK.

[Link to instructions to create a new default Smart Chain.](../../../basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.html#creating-a-new-smart-chain)

The reader will need to create a new default Smart Chain either way as a part of the tutorial, but if the reader chooses to use the RICK Smart Chain for this optional step, the reader has the opportunity to observe another Antara Module in action. This presents a learning opportunity.

The module we refer to here is the [<b>Faucet Antara Module</b>](../../../basic-docs/antara/antara-api/faucet.html)

#### On the Relevant of the Faucet Module

The Faucet Module allows a user to tap into existing funds on a public Smart Chain.  This module provides a simple example of the nature of an Antara Module for our study.  

Faucet allows a user to lock an arbitrary amount of funds within an Antara address. Other users on the network are able to withdraw funds from this Antara address in small portions. To prevent spam requests, Faucet requires a small amount of proof-of-work from the requesting user's node.

From this outline, we observe the basic business logic of the Faucet module. The module involves storing funds in a designated address, the creation of a faucet that can disburse funds, and the ability to limit the rate at which funds are withdrawn.

Compare this to our desired Heir module. The Heir module's business logic must allow a designated address the ability to inherit designated blockchain funds.

In both cases, the module's business logic is bound to transactions.

#### Launch the RICK Smart Chain (Optional)

The live community test chain, <b>RICK</b>, has the Heir Module enabled and can serve the purpose of providing a live demonstration.

Launch the chain as follows.

```bash
./komodod -pubkey=$pubkey -ac_name=RICK -ac_supply=90000000000 -ac_reward=100000000 -ac_cc=3 -addnode=138.201.136.145 &
```

#### Create a pubkey

Use the following guide to create an Antara pubkey and address on the <b>RICK</b> Smart Chain.

[<b>Link to Antara pubkey creation guide</b>](../../../basic-docs/antara/antara-tutorials/understanding-antara-addresses.html#creating-and-launching-with-a-pubkey)

#### Retrieve RICK Funds Using the Faucet Module

To obtain funds on the RICK Smart Chain we utilize the Faucet Antara Module.

```bash
./komodo-cli -ac_name=RICK faucetget
```

This returns a raw transaction that you must now broaadcast using [<b>sendrawtransaction</b>](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction)

Wait a few moments, and then use the [<b>getinfo</b>](../basic-docs/komodo-api/control.html#getinfo) method to verify that your wallet now contains RICK funds.

#### Complete Each API Method of the Heir Module

With funds in your wallet, you are prepared to experiment with the API commands available in the Heir Module Flow section. We recommend experimenting with each command until you have executed each at least once.

[<b>Link to Heir Module Flow</b>](../basic-docs/fluidity/fluidity-api/heir.html#introduction)

## Transactions as a Data Source

Transactions are a data source for Antara-based software.

Transactions can store data in multiple forms. In the simplest form, transaction data records the movement of coins from one address to another. However, blockchain transactions are capable of storing additional data beyond simple coin movement.

When we desire to place additional data into a transaction, we place this data into an <b>OP_RETURN</b>, or "<b>opreturn</b>" for short.

Observe the following transaction data structure for the existing Heir module:

##### Command

```bash
./komodo-cli -ac_name=HELLOWORLD heirfund 0 5 MyDogHeir 037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f9299 100 'http://billionaire.com/mywill md5=5385639869'
```

##### Response (annotated) 

<collapse-text hidden="true" style="margin-top: 1rem;" title="Full Response">

```json5
{
  "txid": "9307989767c1d10b3c97834c7e9f50583387907848bc9776b4b77a705791864c",
  "overwintered": false,
  "version": 1,
  "locktime": 0,

    // List of transaction inputs
        // These are the references to the transaction outputs of older transactions
        // The transactions of older outputs are spent in this transaction input

  "vin": [
    {
      "txid": "e5af0f5993d64e68c655e3ca9309d5fd4f10906032ab587fc2142673a3a73109",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100bae36ff4c95978379391bf1330d964d9cb6bd767386f427099185838ae30a9660220448463c41fa2a4628bde304c922c6d52618f5c427b243dfb24da9c14590118b7[ALL]",
        "hex": "483045022100bae36ff4c95978379391bf1330d964d9cb6bd767386f427099185838ae30a9660220448463c41fa2a4628bde304c922c6d52618f5c427b243dfb24da9c14590118b701"
      },
      "sequence": 4294967295
    },
    {
      "txid": "0a97509be8c178c5c13903844d187148f0c10d309b7a2e260a629ea724d39395",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100b931e2928b882ebb6adafb906d3480cc3e8537f92190dd355e548bac7405e9ca022047b2c3fc8fadb8483156d05b1acbba97b4bcb357b47fefb5e3ea602205e38f5c[ALL]",
        "hex": "483045022100b931e2928b882ebb6adafb906d3480cc3e8537f92190dd355e548bac7405e9ca022047b2c3fc8fadb8483156d05b1acbba97b4bcb357b47fefb5e3ea602205e38f5c01"
      },
      "sequence": 4294967295
    }
  ],

  // List of transaction outputs

  "vout": [
    {
      "value": 5.00000000,
      "valueZat": 500000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020676da179ba51a7f6398418c272945433aed27c6d255297a4724693abb5adfa2181031210008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020676da179ba51a7f6398418c272945433aed27c6d255297a4724693abb5adfa2181031210008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": [
          "RDTm14n15gjwcRaj4BD94NTkJdRiRsV7N7"
        ]
      }
    },

    // This is a cryptocondition output
    // It contains a fingerprinted condition

    {
      "value": 0.00010000,
      "valueZat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "a22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": [
          "RDVHcSekmXgeYBqRupNTmqo3Rn8QRXNduy"
        ]
      }
    },

    // A normal output (i.e. not a cryptocondition) with a standard OP_CHECKSIG script

    {
      "value": 999994.06084534,
      "valueZat": 99999406084534,
      "n": 2,
      "scriptPubKey": {
        "asm": "02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567 OP_CHECKSIG",
        "hex": "2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa"
        ]
      }
    },

    // Normal output with a standard OP_CHECKSIG script

    {
      "value": 0.99980000,
      "valueZat": 99980000,
      "n": 3,
      "scriptPubKey": {
        "asm": "02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567 OP_CHECKSIG",
        "hex": "2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa"
        ]
      }
    },

    // At the end of the output array there is an opreturn output with serialized data
    // This is created by the Anatara Heir module

    {
      "value": 0.00000000,
      "valueZat": 0,
      "n": 4,
      "scriptPubKey": {
        "asm": "OP_RETURN ea462102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756721037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d35333835363339383639",
        "hex": "6a4c85ea462102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756721037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d35333835363339383639",
        "type": "nulldata"
      }
    }

  ],
  "vjoinsplit": [
  ]
}
```

</collapse-text>

The <b>opreturn</b> is the last output in a transaction, and this output is never spendable under any circumstances. The <b>opreturn</b> is the location where all Antara Module data is stored. We will demonstrate how this is accomplished further on.

The opreturn vout contains two key-value pairs that are related to each other, `asm` and `hex`. The first, `asm`, is simply a less encoded version of the `hex` value.

In the above example data structure, note how the value for the key, `asm`, begins with `OP_RETURN ... `, and is followed by additional hex-encoded data. The additional hex-encoded data is arbitrary, and can be used for any purposes a developer sees fit.

Taking the value in the fully encoded key-value pair, `hex`, here is an approximate breakdown of the data.

| Translation | Hex Value |
| ----------- | --------- |
| 6a | OP_RETURN |
| 4c85 | Encoded length of the following data. This value is not a string, the value is encoded in the Smart Bitcoin variable length format, and the value is not directly readable. | 
| ea | Stands for "EVAL_HEIR". The eval code here tells the daemon that this is an Antara Module, and that the specific module is HEIR |
| 46 | Stands for "F", which is a letter marker to indicate that this Heir transaction is a "Funding" transaction |
| 210... | The remaining portion of the hex encoded data is not related to the core software, but rather to the arbitrary data designed by the developer. Maximum data length is 10000 bytes |

In all modules, some of the hex-encoded data can be decoded using the [<b>decodeccopret</b>](../../../basic-docs/smart-chains/smart-chain-api/util.html#decodeccopret) command on the data contained in the `hex` key-value pair. In our example, the decoded data is as follows.

```json5
{
    "result": "success",
    "OpRets": [
        {
            "eval_code": "EVAL_HEIR",
            "function": "F"
        }
    ]
}
```

When an Antara Module instance begins its life cycle an initial transaction is created. In our example, the transaction we see above is an initial transaction of a full, non-simplified Heir module.

Note that the transaction takes value from normal inputs and sends it to CC outputs, as indicated in the `type` key-value pair.

#### Value Taken From Normal vins

<collapse-text hidden="true" style="margin-top: 1rem;" title="Normal vins">

```json5
  "vin": [
    {
      "txid": "e5af0f5993d64e68c655e3ca9309d5fd4f10906032ab587fc2142673a3a73109",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100bae36ff4c95978379391bf1330d964d9cb6bd767386f427099185838ae30a9660220448463c41fa2a4628bde304c922c6d52618f5c427b243dfb24da9c14590118b7[ALL]",
        "hex": "483045022100bae36ff4c95978379391bf1330d964d9cb6bd767386f427099185838ae30a9660220448463c41fa2a4628bde304c922c6d52618f5c427b243dfb24da9c14590118b701"
      },
      "sequence": 4294967295
    },
    {
      "txid": "0a97509be8c178c5c13903844d187148f0c10d309b7a2e260a629ea724d39395",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100b931e2928b882ebb6adafb906d3480cc3e8537f92190dd355e548bac7405e9ca022047b2c3fc8fadb8483156d05b1acbba97b4bcb357b47fefb5e3ea602205e38f5c[ALL]",
        "hex": "483045022100b931e2928b882ebb6adafb906d3480cc3e8537f92190dd355e548bac7405e9ca022047b2c3fc8fadb8483156d05b1acbba97b4bcb357b47fefb5e3ea602205e38f5c01"
      },
      "sequence": 4294967295
    }
  ],
```

</collapse-text>

#### Value Sent to CC vouts

<collapse-text hidden="true" style="margin-top: 1rem;" title="Normal vins">

```json5

    ...

    {
      "value": 5.00000000,
      "valueZat": 500000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020676da179ba51a7f6398418c272945433aed27c6d255297a4724693abb5adfa2181031210008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020676da179ba51a7f6398418c272945433aed27c6d255297a4724693abb5adfa2181031210008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": [
          "RDTm14n15gjwcRaj4BD94NTkJdRiRsV7N7"
        ]
      }
    },
    {
      "value": 0.00010000,
      "valueZat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "a22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": [
          "RDVHcSekmXgeYBqRupNTmqo3Rn8QRXNduy"
        ]
      }
    },

    ...

```

</collapse-text>

#### Key Takeaways

The important aspect to note here is that an initial transaction of a module instance typically takes value from normal inputs and sends it to CC outputs.

As time progresses, more transactions on the Smart Chain are performed under this module instance. Each of the module instance's transactions spends from the previous transaction outputs associated with the instance and creates new unspent transactions. This process effectively creates a [linked-list data structure.](https://en.wikipedia.org/wiki/Linked_list)

With each transaction, the <b>opreturn</b> output is never spent, and remains in the blockchain as a source of Antara Module data (read only).

-----------

[<b>Link to Next Tutorial in Advanced Series</b>](../../../basic-docs/antara/antara-tutorials/advanced-series-4.html)
