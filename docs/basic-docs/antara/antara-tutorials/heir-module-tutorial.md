# Heir Module Development Tutorial

This tutorial demonstrates the process of developing a new [<b>Antara module</b>](). In the tutorial, we build a simplified prototype of the existing [<b>Heir</b>](../basic-docs/fluidity/fluidity-api/heir.html) Antara module.

#### Tutorial Objectives

The primary aim is to give the developer direct engagement with Antara module development, with a focus on the CryptoConditions aspects. This process will give the developer a better grasp of the broad potential of the Antara framework.

<!--

dimxy: why are we speaking of modules. Isn't 'contract' a more accurate term? Term 'module' is too broad, 'contract is more specific IMO

Sidd: It's a marketing thing. We're using modules instead of contract. The discussion has gone on at length and I haven't followed all of it. I know that JL and the support team were involved in the decision, so I think everyone's had a chance to come to some conclusion, and that's where we wound up.

-->

Furthermore, in the process of completing this tutorial the developer will learn how the source code is organized.

## Prerequisite Knowledge

Tutorial readers should have the following prerequisite experience. We provide links to relevant resources where available.

<!-- This may be too many links. Perhaps simplify method of communicating prerequisite knowledge. -->
<!-- dimxy yes, I suggest moving most of the links to the end of the document as additional info. The idea of this is not to make impression for a developer that he would need to learn too much first before starting developing antara modules -->
<!-- dimxy As we spoke on the voice call I'd like also to suggest making an additional simple and informal doc for absolute beginners which would explain most of concept of development in very simple terms without needing to read much before. Just engage into development and answer most of the questions right in the doc. Learn things by example -->

<!--

Sidd: Noted. We'll come back to this section after we finish Mylo's tutorials and we start creating a curriculum outline.

-->

- Confident programming skills with the C/C++ languages

- Familiarity with the Komodo platform
  - [Link to the Komodo whitepaper](https://komodoplatform.com/whitepaper)
  - [Link to <b>About Komodo Platform</b> section](../basic-docs/start-here/about-komodo-platform/about-komodo-platform.html)
- Conceptual understanding of Antara
  - [Link to Overview of Antara - 1](../basic-docs/fluidity/fluidity-tutorials/fluidity-overview.html#fluidity-overview)
  - [Link to Overview of Antara - 2](../basic-docs/fluidity/fluidity-tutorials/fluidity-conceptual-overview.html#introduction)
- Comprehension of the nature of Antara addresses
  - [Link to Antara Address Explanation]() <!-- dimxy6 What is 'Antara Address'? is this the address extracted from cc scriptPubKey? --> 
- Comprehension of concepts in the Main Path for Komodo Development
  - [Link to Main Path for Komodo Development in Learning Launchpad]()
- Familiarity with Bitcoin protocol basics
  - [Link to Mastering Bitcoin pdf book]()
- The `komodod` software should be installed on your local machine
  - [Link to installation instructions](../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html#linux)
- cryptocondition c-language library
  - [Link to cryptoconditions library](https://github.com/libscott/libcryptoconditions)

<!-- Need to make sure this includes CC libs --><!--dimxy6 added link to the cryptocondition library (from the source) ^^^ -->

## A Conceptual Understanding of the Intended Product

In this tutorial we will create a simplified version of the default Antara Heir module. To gain an idea of the intended result, read the introduction of the Heir Module API.

(Read until the start of the section named <b>Heir Module Flow</b> and then pause.)

[Link to Introduction to the Heir Antara Module](../basic-docs/fluidity/fluidity-api/heir.html#introduction)

The basic concept to understand is that the Heir module allows the owner of a Smart Chain digital asset to designate an inheritor of the asset, should the owner become inactive on the chain.

In terms of design, this is a relatively straightforward Antara module, which is one reason we use it here.

## Complete the Heir Module Flow Section (Optional)

<!-- dimxy: this 2-level header looks like it is prepended the following text and paragraphs. But seems it is not. Maybe it should not be the 2-level header, but of the same level as 'Launch the Rick Smart Chain' header  -->

<!-- dimxy maybe add a 2-level header like 'Learn how to work with Smart Chains' for the next 3 headers about faucet usage  -->

<!--

Sidd: I can see what you are saying.

Let me come back to this later. For now, I want to focus on technical aspects, and then we'll come back around in the final pass.

Some of this content is going to be restructured anyway, as we'll be cutting and combining elements across multiple tutorials.

-->

Before we begin the development process, it may be helpful to first experiment with the flow of RPC commands for the existing Heir module.

This section is optional, but recommended.

#### Launch the RICK Smart Chain (Optional)

<!-- Note, only use one chain. If it's RICK, keep it RICK. -->
<!-- dimxy: if the reader wanted to develop his own antara module he would still  need his own chain, so let it be RICK chain for testing rpc, and HELLOWORLD chain for developmment -->
<!-- dimxy maybe a paragraph like 'Setting Environment' is needed here -->

<!--

Sidd: Good point. Let me come back to this later.

-->

The live community test chain, <b>RICK</b>, has the Heir module enabled and can serve the purpose of providing a live demonstration of the Heir module.

Launch the chain as follows.

```bash
./komodod -pubkey=$pubkey -ac_name=RICK -ac_supply=90000000000 -ac_reward=100000000 -ac_cc=3 -addnode=138.201.136.145 &
```

#### Create a pubkey

Use the following guide to create an Antara pubkey and address on the <b>RICK</b> Smart Chain.

[<b>Link to Antara pubkey creation guide</b>](../basic-docs/fluidity/fluidity-setup/fluidity-instructions.html#creating-and-launching-with-a-pubkey)

#### Retrieve RICK Funds Using the Faucet Module

To obtain funds on the RICK Smart Chain, we utilize a different Antara module, [<b>Faucet</b>](../basic-docs/fluidity/fluidity-api/faucet.html#introduction). Our encounter with Faucet also presents an educational opportunity, which we discuss in a moment.

::: tip

If you need to gain a quick understanding of the <b>Faucet</b> module, you may read the introduction to the Faucet API section. 

[<b>Link to Faucet API Introduction</b>](../basic-docs/fluidity/fluidity-api/faucet.html#introduction)

:::

Use the community Faucet to obtain a small amount of funds.

```bash
./komodo-cli -ac_name=RICK faucetget
```

Wait a few moments, and then use the [<b>getinfo</b>](../basic-docs/komodo-api/control.html#getinfo) method to verify that your wallet now contains RICK funds.

#### Complete Each API Method of the Heir Module

With funds in your wallet, you are prepared to experiment with the API commands available in the Heir Module Flow section. We recommend experimenting with each command until you have executed each at least once.

[<b>Link to Heir Module Flow</b>](../basic-docs/fluidity/fluidity-api/heir.html#introduction)

#### On the Relevance of Faucet

<!--

Dimxy: Maybe this section goes before the use of Faucet

Sidd: Good point. Let me come back to this after restructuring all content.

-->

The Faucet module provides a simple example of the nature of an Antara module for our study. Faucet allows a user to lock an arbitrary amount of funds within an Antara address. Other users on the network are able to withdraw funds from this Antara address in small portions. To prevent spam requests, the Faucet requires a small amount of proof-of-work from the requesting user's node.

From this outline, we observe the basic business logic of the Faucet module. The module involves storing funds in a designated address, the creation of a faucet that can disburse funds, and the ability to limit the rate at which funds are withdrawn.

Compare this to our desired Heir module. The Heir module's business logic must allow a designated address the ability to inherit designated blockchain funds.

In both cases, the module's business logic is bound to transactions.

#### Transactions as a Data Source

Transactions are a data source for Antara-based software.

Transactions can store data in multiple forms. In the simplest form, transaction data records the movement of coins from one address to another. However, blockchain transactions are capable of storing additional data beyond simple coin movement.

When we desire to place additional data into a transaction, we place this data into an <b>OP_RETURN</b>, or "<b>opreturn</b>" for short.

Observe the following transaction data structure for the existing Heir module:

##### Command

```bash
./komodo-cli -ac_name=HELLOWORLD heirfund 0 5 MyDogHeir 037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f9299 100 'http://billionaire.com/mywill md5=5385639869'
```

##### Response (annotated) 

<!-- 

dimxy I suggest using 'jsonc' syntax (not 'json'): seems comments are looking better with it

sidd: jsonc doesn't have any color on my end. It looks all white? From what I can tell, it looks like there's no library for a jsonc syntax. Let me know if you're seeing something different?

--><!-- dimxy6 aha, maybe this syntax extension is not supported everywhere. In my chrome it looks nice with gray comments and black json field names and blue values, pity -->

<collapse-text hidden="true" style="margin-top: 1rem;" title="Full Response">

```json
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

The <b>opreturn</b> is the last output in a transaction, and this output is never spendable under any circumstances. The <b>opreturn</b> is the location where all Antara module data is stored. We will demonstrate how this is accomplished further on.

The opreturn vout contains two key-value pairs that are related to each other, `asm` and `hex`. The first, `asm`, is simply a less encoded version of the `hex` value.

In the above example data structure, note how the value for the key, `asm`, begins with `OP_RETURN ... `, and is followed by additional hex-encoded data. The additional hex-encoded data is arbitrary, and can be used for any purposes a developer sees fit.

Taking the value in the fully encoded key-value pair, `hex`, here is an approximate breakdown of the data.

| Translation | Hex Value |
| ----------- | --------- |
| 6a | OP_RETURN |
| 4c85 | Encoded length of the following data | <!-- dimxy it is encoded in the smart bitcoin variable length format, not directly readable. And it is not a string -->
| ea | Stands for "EVAL_HEIR". The eval code here tells the daemon that this is an Antara module, and that the specific module is HEIR |
| 46 | Stands for "F", which is a letter marker to indicate that this Heir transaction is a "Funding" transaction |
| 210... | The remaining portion of the hex encoded data is not related to the core software, but rather to the arbitrary data designed by the developer. Maximum data length is 10000 bytes |

In all modules, some of the hex-encoded data can be decoded using the [<b>decodeccopret</b>](../../../basic-docs/smart-chains/smart-chain-api/util.html#decodeccopret) command on the data contained in the `hex` key-value pair. In our example, the decoded data is as follows.

```json
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

When an Antara module instance begins its lifecycle an initial transaction is created. In our example, the transaction we see above is an initial transaction of a full, non-simplified Heir module.

Note that the transaction takes value from normal inputs and sends it to CC outputs, as indicated in the `type` key-value pair.

#### Value Taken From Normal vins

<collapse-text hidden="true" style="margin-top: 1rem;" title="Normal vins">

```json
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

```json

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

The important aspect to note here is that an initial transaction of a module instance typically takes value from normal inputs and sends it to CC outputs.

As time progresses, more transactions on the Smart Chain are performed under this module instance. Each of the module instance's transactions spends from the previous transaction outputs associated with the instance and creates new unspent transactions. This process effectively creates a [linked-list data structure.](https://en.wikipedia.org/wiki/Linked_list)

With each transaction, the <b>opreturn</b> output is never spent, and remains in the blockchain as a source of Antara module data (read only).

## Understanding CryptoConditions

Another important concept to understand is the nature of a <b>CryptoCondition</b> (CC). This technology is part of [an industry-wide standard](https://tools.ietf.org/html/draft-thomas-crypto-conditions-01), and other platforms may use CryptoConditions (CC) differently.

A CryptoCondition is a logical expression evaluated on electronic signatures and hashes of transaction data. CryptoConditions are stored in the scripts of transactions and are evaluated by a supporting CryptoCondition C library. The default CC library is included during the installation procedure of a Smart Chain.

#### Antara Extensions to CryptoConditions

In addition to the industry-standard CryptoCondition (CC) library, Komodo's implementation of CC integrates the ability to add arbitrary code into a Smart Chain's consensus mechanism. This allows developers to create essentially an unlimited number of application-specific transaction-validation rules.

For example, in the Heir Module, if the heir attempts to claim funds, the validation code checks whether the owner of the fund has shown recent activity, according to a specified amount of time. The owner can show activity by either adding to or spending from the fund. If the owner has not shown signs of activity, the validation code allows the heir to claim funds.

Through CryptoConditions and Antara's extensions, the consensus mechanism can rule over the outcome of the cryptocondition logic and arbitrary validation code across the Smart Chain's decentralized network of nodes.

#### Makeup of a CryptoCondition

A CryptoCondition consists of two parts:

- <b>Part I: A condition that must be met</b>
  - This is stored in the transaction output's `scriptPubKey`
- <b>Part II: A fulfillment</b>
  - This is stored in the `scriptSig` field of the input of the transaction that spends the above output


The <b>condition</b> (Part I) contains data that checks the CryptoCondition in "fingeprinted" form. 

::: tip

The term, "fingerprinted," is in the industry-wide standard CC library. To fingerprint data, the CC library acquires the target data, combines it with other data that the developer does not need to manage, and then creates a hash, or "fingerprint."

:::

For example, a condition can be a requirement that only a specific `pubkey` (fingerprinted) be allowed to spend this transaction output.

The <b>fulfillment</b> (Part II) contains instructions and data about how the consensus mechanism should evaluate the CryptoCondition. For example, the fulfillment could include an instruction to check a spending-transaction's electronic signature as well as the the `pubkey` associated with this signature.

To spend a CC output of a transaction, a node on the network sends a spending transaction that contains a CC input that fulfills the CC output's condition. The consensus mechanism of the Smart Chain checks that the fulfillment is correct. For this it uses the C CryptoCondition library to evaluate the fulfillment of the spending transaction. The result of this evaluation is checked against the condition stored in the previous transaction output.


For our example above of an electronic signature, the consensus mechanism runs the logical conditions and fulfillments of the CryptoCondition to verify the electronic signature with the provided pubkey. Then the validation logic calculates the fingerprint of the pubkey and checks it against the condition.

In adding Cryptoconditions to the Antara framework, Komodo extended the original CC protocol by adding an additional aspect beyond the inputs and outputs. This additional part is called the <b>EVAL</b> CryptoCondition, or eval code.

Each Antara Module has its own unique eval code. The eval code is a number between 0 and 255, and it identifies the specific Antara Module that is associated with a CC transaction. When the consensus validation logic encounters the Antara Module's eval code in a transaction input, the validation logic calls the module's validation function.

The process of validation of an Antara Module's transaction is depicted on the diagram below:

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; float: right; display: block;">

<img style="border: 1rem solid white; margin: 1rem 0rem 1rem 0rem;" src="/cc-verify-work-v2.3.png">

</div>

<!-- dimxy Actually there is no a dedicated fulfillment evaluation. There is always evaluation of the fulfillment in spending tx and checking the condition in the tx being spent. That's why I wrote 'So to evaluate this CryptoCondition..'.

Seems this is confusing (with fulfillment evaluation). Here is how the standard says about condition and fulfillment:

'A condition uniquely identifies a logical "boolean circuit"...

A fulfillment is a data structure encoding one or more cryptographic signatures and hash digest preimages that define the structure of the circuit and provide inputs to the logic gates allowing for the result of the circuit to be evaluated.

A fulfillment is validated by evaluating that the circuit output is TRUE but also that the provided fulfillment matches the circuit    fingerprint, the condition.'

So a spending tx must fulfill the condition in the tx that it spends.

With this in mind I suggest corrections (see above) -->

<!--

Sidd:

Okay. i don't understand all of that, but I don't think I need to. I tried to keep what you added changed and only correct grammar. Let me know if there are any other changes. 

-->

<!-- Sidd: That paragraph above seems out of place. Can we move it somewhere to where it's tied in with something else? I don't understand it well enough to do it myself. --><!-- dimxy6 I moved it up, it now begins with 'For this it uses the C CryptoCondition library...' -->

#### The Simplest form of a CryptoCondition

The simplest CryptoCondition evaluates an electronic signature of a spending-transaction's `scriptsig`. Assuming the evaluation is successful, the spending-transaction is then able to spend funds from the output of another transaction.

At first glance, you may be confused about why a CryptoCondition is useful in this event, as a normal blockchain protocol can already accomplish this task.

The answer is that there is an important difference in the CryptoCondition implementation. When a CryptoCondition transaction output is spent, the Antara Module's code can enforce additional validation logic. This is accomplished via the eval code that is stored as a part of the CryptoCondition's inputs and outputs. We will describe this further in the Heir Module development section.

The ability to enforce additional logic is the key difference that illuminates the power of Antara. For example, additional arbitrary validation code can include logic that allows a user to spend the output only at the appropriate time. The transaction output can be spent only via a spending transaction that has the matching fulfillment, and both the CryptoCondition and the Antara module validation code evaluate to `true`.

Even the basic CryptoCondition features offer more complex logical expressions than a normal Bitcoin Script. For example, with CC a spending transaction could be required to have signatures from at least `M` of `N` acceptable `pubkeys`.

 <!--dimxy here we are speaking about basic cryptocoondition lib feature, not the arbitrary module validation code. So this phrase is attached to the previous where it is said that basic cryptocondition features allows to build logic expressions on signatures and keys.  --> 

<!-- 

Sidd:

I don't fully understand the above comment. What would you like me to change in the paragraph below? I tried adding in more details about CC + Validation Code = Antara Module. ? Does that solve the issue?
--><!-- dimxy6 now this is okay. My comment was simply about that I rearranged the phrases because that feature of M of N pubkeys is not a provided of Antara module application validation code (as it was stated) but the standard feature of the cryptocondition library. -->

As logical conditions and subconditions can be added to a CryptoCondition as desired, the developer can utilize both the CryptoConditions features and customized module's validation code to build complex logic that governs the movement of Smart Chain assets. In this sense, Antara is an advanced evolution of the basic Bitcoin Script security features, such as pubkey or pubkey hash scripts. We will examine validation code in greater detail later in this tutorial.

<!-- dimxy The Module validation (also called arbitrary code above) can do things more advanced than basic cryptocondition-->


<!-- dimxy maybe that upper section 'Antara Extensions to CryptoConditions' to put after the current section as it describes more about the arbitrary validation? -->

<!-- 

Sidd: I don't fully understand what the distinction is between the validation code and basic CryptoConditions. The CryptoConditions are in the transaction, while the validation code is in the daemon's source code? Is that that idea?

--><!-- dimxy6 I meant that cryptocondition library is a common usage tool. It performs only predefined set of operations. By 'validation code' I assumed the arbitrary validation code which is invoked by adding a eval code to a cryptocondition. Eval code is an extension to cryptocondition library. So with this eval code extension we can create a customized validation code which 'knows' about the specific business data in the antara module. So I wanted to underline that cryptconditions lib is itself a very big advancement from the basic bitcoin script features but the customized validation code is an even further advancement.  And yes, using just the term 'validation code' is not clear and confusing in this context, I augmented it above to make it more clear (plus, I put the cryptoconditon lib in the first place as it is primary and customized code is secondary in the sense of their origin) -->   

In this section, we became acquainted with the concept of logical conditions that are associated with transaction outputs, and logical fulfillments associated with spending-transactions. These two elements make up the rudimentary aspect of a CryptoCondition.

There are yet other elements of an Antara-based CryptoCondition. One element is called the `EVAL` code, and it is stored in the CryptoCondition's inputs and outputs. We will touch on this topic soon.

#### Antara Module as Data and Business Logic Layer of Business Application

An Antara module can be described as a combination of a data layer and a business-logic layer in an application. The data layer is the collection of transactions related to the Antara Module, and the business-logic layer is the module's arbitrary code.

These two layers tie in with other layers in an Antara-based software application. For example, the software external to the blockchain could include a presentation layer, consisting of a Graphical User Interface (GUI) and other visual elements. External applications interact with an Antara Module via its RPC calls.

Also, there can often be an additional oracle layer, wherein oracle software connects nodes to external data sources across the Internet. This can be the case in Antara-based software applications that make use of the [<b>Oracles</b>](../basic-docs/fluidity/fluidity-api/oracles.html#introduction) Antara module.

#### A Global CC Address in the Antara Framework

Each Antara module has an associated global CC address. The private key to this global CC address is publicly available. The address can be used for such tasks as sharing funds between users of this module, and anyone can attempt to spend funds from this address.

The following is an example of a global CC address created and assigned for the Heir module.

```cpp
const char *HeirCCaddr = "RDVHcSekmXgeYBqRupNTmqo3Rn8QRXNduy";
const char *HeirNormaladdr = "RTPwUjKYECcGn6Y4KYChLhgaht1RSU4jwf";
char HeirCChexstr[67] = { "03c91bef3d7cc59c3a89286833a3446b29e52a5e773f738a1ad2b09785e5f4179e" };
uint8_t HeirCCpriv[32] = { 0x9d, 0xa1, 0xf8, 0xf7, 0xba, 0x0a, 0x91, 0x36, 0x89, 0x9a, 0x86, 0x30, 0x63, 0x20, 0xd7, 0xdf, 0xaa, 0x35, 0xe3, 0x99, 0x32, 0x2b, 0x63, 0xc0, 0x66, 0x9c, 0x93, 0xc4, 0x5e, 0x9d, 0xb9, 0xce };
```

| Function | Description |
| -------- | ----------- |
| HeirCCaddr | the global CC address itself |
| HeirCChexstr | the pubkey |
| HeirCCpriv | the privkey for the global CC address |
| HeirNormaladdr | The normal address for the same pubkey and privkey. Spending from this address does not validation by the Antara module |

In the Antara codebase, the global CC address is sometimes called the "unspendable" address. This is likely a reference to the fact that for any user to spend funds from this address, the spending transaction must pass the module's validation code.

For example, the global CC address could store funds shared between several users. As a global CC address's privkey is publicly available, anyone might try to spend these funds. This is where the Antara validation code will exercise control over whom is allowed to spend funds, and by which rules. The RPC aspect of the Antara module must prevent the creation of inappropriate transactions as well.

A transaction can also send a nominal fee to the global CC address with the intention of turning this transaction's output into a search key (called a marker). To ensure these markers remain publicly visible forever, the module's validation code can disable spending for these markers. With this combination, the developer can use the `SetCCunspents` SDK function to enumerate all transactions in the global CC address, and thus discover the module's transaction history.

## Antara Development Checklist

Development requirements for each Antara module:

- Allocate a new `EVAL` code for your contract
- Assign a global address for the module
- Define the module's transactions
  - This includes the structure of their inputs, outputs, and opreturn format
- Implement the common RPC functions that nearly all modules feature
  - These are typically functions for retrieving a list of all of the module's initial transactions, and for retrieving user addresses and the global CC address
- Implement the module's specific RPC functions
  - These are used to create the module-related transactions and to return relevant information about the module's data and state
- Implement the module's validation code

## Antara Module Architecture

From an architectural standpoint, an Antara module is simply a C/C++ source file.

<!--

dimxy2 actually there are yet additions to the common cc source file src/cc/custom.cpp with module evalcode, a link to the validation function and the module global pubkey and privkey. This would integrate the antara module into validation framework

sidd: how do I change the surrounding content to accommodate what you mention above?

-->

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; float: right; display: block;">

<img src="/CC-Antara-arch-v2.3.png" style="border: 0.5rem solid white; margin: 1rem 0rem 1rem 0rem;" >

</div>

There are two parts to the module's source file: the implementation of RPC's and the validation code.

#### RPC Implementations

The first part of the Antara's module source file consists of the implementation of all Remote Procedure Calls (RPC's) for this module. These typically either perform transactions or query information about state and data.

The developer must also implement high-level functions for any desired RPC commands that are called by the RPC engine and are responsible for converting the RPC data to native C++ data types.

These functions should be added into an existing source in the `/src/rpc` directory. Alternatively, the developer might create his own RPC source file.

A reference to the RPC-command functions should be added to the global RPC command table in the `/src/rpc/server.cpp` source file.

With this properly completed, the Smart Chain daemon's compiler will automatically make each RPC available at the command line through the `komodo-cli` software and via the `curl` utility.

Essentially all modules have at least these two RPC's.

- XXXXlist
  - This lists all initial transactions relevant to the module
- XXXXinfo
  - This RPC typically also requires an additional input -- a transaction ID for which information is desired
  - When called, the method then returns information about this transaction ID

Include other RPC implementations as desired.

#### Antara Module Validation Code

The main purpose of Antara Module validation code is two-fold. First, it prevents inappropriate Antara-related transactions from entering the chain. Second, it ensures that the structure of the chain of these transactions and their data is accurate. Most importantly, validation code should protect against malicious transactions.

<!-- Sidd: I rephrased the grammar above after your recent changes. Please check accuracy again. -->

Antara Module Validation code is triggered anytime a node attempts to add a CC spending-transaction to the chain.

A module's validation code is activated only when a transaction has at least one CC input that bears the module's `EVAL` code inside the <b>scriptSig</b> in the transaction.

A module's initial transaction may not have a CC input. When this happens, the validation code is not triggered. Therefore, the transaction may be handled by the normal blockchain protocol.

As an aside, when the developer needs to write code that validates a spending transaction that spends a utxo that has no CC inputs, the code must first validate the utxo as well. If the result of the validation of the utxo is `false`, then the code can also reject the spending transaction. We will delve into this topic in thorough detail further in the tutorial.

#### The EVAL Code

A unique 8-bit `EVAL` code is attached to each Antara module. The `EVAL` code is used by the core Smart Chain daemon's transaction-validation code to route any relevant transactions to the appropriate module's validation code.

The `EVAL` code itself is actually a simple CryptoCondition. The CryptoCondition tests for the byte value and, if the value is `true`, routes the result according to the core Smart Chain daemon's code.

### Antara Module Transaction Structure

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; float: right; display: block;">

<img style="border: 1rem solid white;" src="/cc-tx-structure-for-guide-v3.2.png">

</div>

A CryptoCondition (CC) input is called a "vin" and a CryptoCondition output is called a "vout".

A CC transaction has one or more vins and one or more vouts.

When creating a CC transaction, the transaction's vins can consume the vouts of previous transactions that were either related to CC, or not related.

When they are not related to CC, the vin of the current transaction does not need to include a CC fulfillment.

However, if the current transaction's vins are consuming vouts from a CC-related transaction, then the current transaction's vins must contain logical fulfillments that meet the requirements of the previous transaction's CC vouts. Also, the current transaction's CC vins contain the transaction id (txid) of the previous transaction.

A CC transaction typically also has an opreturn vout that contains module data.

#### Antara Module SDK

Komodo is building an SDK for Antara module development. The SDK is still in the early stages. Some of the SDK functions are already available, and can be found in the following source files:

- CCtx.cpp
- CCutils.cpp
- cc.cpp
- eval.cpp

We will return to the SDK functions when we discuss the Heir module development process.

## Heir Module Development

Having finished an overview of the Antara development layout, we are now prepared to create a simplified prototype of the [Heir module](../basic-docs/fluidity/fluidity-api/heir.html#introduction).

Our tasks are the following:

- Add a new `EVAL` code to represent this module
- Create a global CC address
- Define the Heir module transactions
  - vouts, or logical conditions
  - vins, or logical fulfillments
- Implement the RPC interface
- Create the validation code

<!-- 
(See ? Mastering CryptoConditions Chapter 2 for info on adding `EVAL` and global CC addresses?)

Sidd: We need to note that the previous advanced tutorial, the rewrite of JL's content, contains instructions for EVAL and global CC addresses.

-->

### Heir Module Transactions

We require three types of module transactions

- an initial transaction with which a user creates the fund for inheritance
- a transaction for additional funding
- a transaction for spending funds by the owner or heir

#### The Initial Transaction: Creating a Fund

| Input/Output | Description |
| ------------ | ----------- |
| `vins.*` | <b>Normal input</b> <br> - The `*` notation implies that this can apply to any number of inputs <br> - These vins are typical of core blockchain software and not related to CC |
| `vout.0` | <b>The `1of2` CC address that holds the funds that belong to the owner and, once available, to the heir</b> |
| `vout.1` | <b>The transaction fee to account for the `vout.0` amount above</b> <br> - The amount in `vout.1` is used as a marker. We will discuss markers and their uses cases further on in the tutorial |
| `vout.2` | <b>Normal change</b> <br> - Recall that `change` is the leftover amount from the original utxo that the user does not intend to send to the destination address, and which the user desires to keep <br> - Any amount of leftover funds not included in the `change` utxo is forfeited to the miner of the block; this is how miners receive their mining fee |
| `vout.n-1` | <b>OP_RETURN EVAL_HEIR 'F' ownerpk heirpk inactivitytime heirname</b> <br> - This is the is the opreturn vout, and it contains any data relevant to the module <br> - The 'F' is a flag that indicates that this transaction is a "Funding" CC transaction <br> - `ownerpk` and `heirpk` respectively represent the pubkeys of the owner and heir <br> - Concerning `inactivitytime`, the owner should either make a donation to or spend from the `1of2` address within the `inactivitytime` amount of time to prevent opening the `1of2` address to the heir for spending. <br> - `heirname` is the name of this instance of the Heir module |

Through a funding transaction, the owner of the initial funds creates a "plan," which we can also call a "contract," and deposits funds for future spending.

The initial funds are taken from the normal `vout` values of a utxo. The initial transaction of this plan can be the beginning of the relationship between the funds in the utxo and the Heir module.

The main funds for the plan are allocated to `vout.0` of our CC transaction.

By design, and setting aside issues of timing, we desire that either the owner or the inheritor of the funds should be able to spend this utxo. We assume that the owner has one address, and the inheritor has another. To achieve this, we use an advanced CryptoConditions feature that states that either of two addresses can spend the funds. This is called a `1of2` CryptoCondition, and it is placed as a logical condition into `vout.0`. 

A fee is allocated to `vout.1`. This is used as a marker. The marker allows a developer to use a special SDK function, `SetCCunspents()`, to create a list of all initial transactions for the module.

As usual, out of the remaining amount of our initial utxo, we need to send all that we desire to keep to our `change` address.

Also, we need to leave an amount as an incentive for the miner. Any remainder beyond the sum total of our new `vout` values will automatically be allocated in this manner. We typically leave `10000` satoshis of our Smart Chain coin, by convention.

Note the `F` letter in the opreturn structure. The `F` stands for "fund." By convention, the first byte of any opreturn is the `EVAL` code. The second byte is the transaction functional id, we use it to understand the transaction data structure in the opreturn.

We also stored other relevant data in the opreturn:

- The owner and inheritor pubkeys
- Inactivity time
  - this is the amount of seconds during which the owner must exhibit activity to maintain sole control over the funds
  - If the owner does not spend funds during this time period, the inheritor will gain the ability to spend these funds as well
- The descriptive name of this funding plan

#### The Add Coins Transaction

| Input/Output | Description |
| ------------ | ----------- |
| `vins.*` | normal inputs |
| `vout.0` | the funding CC `1of2` address for the owner and heir. This address consists of two parts: the owner and heir pubkeys. Either owner or heir can spend this vout |
| `vout.1` | normal change |
| `vout.n-1` | OP_RETURN 'A' fundingtxid HasHeirSpendingBegun |

This transaction serves the purpose of adding more funds to the owner's address. The transaction uses normal coin inputs (non-CC) and sends them to the CC `1of2` address.

We include the transaction id (txid) of the initial transaction in the opreturn to bind the add transaction to the plan.

Note the functional id, `A`. This flag indicates that this transaction is an `add` type of funding transaction.

#### The Claim Coins Transaction

| input/output | description |
| ------------ | ----------- |
| vin.0 | normal input transaction fee |
| vin.1+ | input from CC `1of2` address |
| vout.0 | normal output, sent to the owner or the heir address |
| vout.1 | `change` to CC `1of2` address |
| vout.2 | `change` to user's address from transaction fee input, if any |
| vout.n-1 | OP_RETURN EVAL_HEIR `C` fundingtxid HasHeirSpendingBegun |

This transaction allows either the owner or the heir to spend funds from this plan instance.

To pay the transaction fee to the miners, the transaction has a normal input that draws from the wallet of the transaction creator.

The transaction also has a CC input for spending the claimed value from the `1of2` fund address.

As for outputs, the claimed value is sent to the claimer's normal address, allowing the claimer to spend funds as usual. Unspent or leftover "change" from the transaction is returned to the `1of2` address.

We also indicate the normal `change`.

The functional id, `C`, in the opreturn indicates that this is a "claim" type transaction.

We also include all the same opreturn data as in the `A` transaction, include the `fundingtxid` and the `HasHeirSpendingBegun` flag.

## Heir Module RPC Implementations

#### heirfund

For a user to call the `heirfund` RPC, the user will need to supply the name of the RPC and its parameters as arguments.

We model the syntax as follows:

```bash
./komodo-cli -ac_name=YOURCHAIN heirfund amount name heirpubkey inactivitytime
```

##### Descriptions of the heirfund Syntax

| Argument | Type | Description |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| amount         | (number)           | The initial funding amount, in coins or tokens <br> - This parameter is considered to be the amount of tokens if the tokenid parameter is present)   |
| name           | (string)           | The name of the heir funding plan (arbitrary)                                                                                                    |
| heirpubkey     | (string)           | The heir's public key (in hexademical)                                                                                                           |
| inactivitytime | (number)           | The time (in seconds) that must pass without the owner executing an `heiradd` or `heirclaim` method, after which the address unlocks to the heir |

#### Adding the Command to the Source File

To add a new command to `komodo-cli` we open the `src/server.cpp` source file add a new element to the `vRPCCommands` array.

```cpp
    { "heir",       "heirfund",   &heirfund,      true },
```

| Object | Description |
| ------ | ----------- |
| heir | a common name for all heir contract rpc calls |
| heirfund | the name of the new command |
| &heirfund | the address of the rpc interface function |
| true | indicates that the command description will be shown in the help command output; placing `false` here would hide this RPC from the help menu |

#### Add the RPC Function ~~Definition~~Declaraion

We add the RPC function declaration in the `rpc/server.h` source file.

The declaration in this file is essentially the same across all RPC functions.

```cpp
UniValue heirfund(const UniValue& params, bool fHelp);
```

### The Two Levels of an RPC Implementation

There are two levels to an RPC implementation.

The first level is a short RPC function that has the same name as the RPC command itself (such as `heirfund`).

The body of this level is added to a source file in the `rpc/` subdirectory in the source code (for this example, we added the rpc functions for Heir module in the wallet/rpcwallet.cpp).

Creating a new RPC source file for each Antara module's RPC functions is considered a best practice.

This function checks the RPC parameters and the needed environment, and then forwards the RPC to the second level.

To begin the RPC command, we declare the `heirfund` function and clear the global error object.

```cpp
// heirfund command rpc-level implementation, src/wallet/rpcwallet.cpp
UniValue heirfund(const UniValue& params, bool fHelp)
{
    CCerror.clear(); // clear global error object
```

Recall that a Smart Chain must have the [<b>ac_cc</b>](../basic-docs/smart-chains/smart-chain-setup/smart-chain-customizations.html#ac-cc) and [<b>ac_ccenable</b>](../basic-docs/smart-chains/smart-chain-setup/smart-chain-customizations.html#ac-ccenable) customization parameters properly initiated for any Antara module to function.

Therefore, we check that the wallet and Heir module features are available in the Smart Chain. We also check the RPC parameter's required number:

Ensure that the wallet object is initialized:

```cpp
    if (!EnsureWalletIsAvailable(fHelp))
        return NullUniValue;
```

Ensure that the chain parameters needed for Antara modules are correctly set. For example, [<b>addressindex</b>]() and [<b>spentindex</b>]() should both be enabled. Also, ensure that the Heir module is enabled on this chain.

```cpp
    if (ensure_CCrequirements(EVAL_HEIR) < 0)
        throw runtime_error("to use CC contracts, you need to launch daemon with valid -pubkey= for an address in your wallet\n");
    // output help message if asked or params count is incorrect:
    if (fHelp || params.size() != 4 )
        throw runtime_error("heirfund funds heirname heirpubkey inactivitytime\n");
```

Lock the user's wallet:

```cpp
    LOCK2(cs_main, pwalletMain->cs_wallet);
```

The `UniValue` object is a special type used to pass data in RPC calls. The `UniValue` object is native to all blockchains based on the Bitcoin protocol. For parameters, UniValue requires an array of UniValue objects.

We must convert these UniValue objects into normal C/C++ language types, and then pass them to the second level of our module implementation.

Convert the parameters from the UniValue type to their basic C++ types and add checks to ensure that the converted parameter values are correct.

This content is abbreviated. [For links to the full source code and example files, click here.](../../../basic-docs/antara/antara-tutorials/heir-module-tutorial.html#links-to-heir-source-code-and-building-instructions)

Note the method for parsing the hex representation of the pubkey parameter and converting it to a `CPubKey` object.

```cpp
    CAmount amount = atof(params[0].get_str().c_str()) * COIN;  // Note conversion from satoshis to coins through a multiplication of 10E8
    if( amount < 0 )
    	throw runtime_error("amount cant be negative");
    std::string name = params[1].get_str();
    std::vector<uint8_t> vheirpubkey = ParseHex(params[2].get_str().c_str());
    CPubKey heirpk = pubkey2pk(vheirpubkey);
    int64_t inactivitytime = atoll(params[3].get_str().c_str());
```

Finally, call the Heir module code, pass our values (now in C++ type format), and set these as the value of the final `result` object. Bear in mind that the returned value from the Heir module code, `HeirFund`, returns a hexadecimal value.

```cpp
    UniValue result = HeirFund(amount, name, heirpk, inactivitytime);
    RETURN_IF_ERROR(CCerror);  // use a macro to throw runtime_error if CCerror is set in HeirFund()
    return result;
}
```

[See the linked source code (line number is approximate.)](https://github.com/dimxy/komodo/blob/heir-simple/src/wallet/rpcwallet.cpp#L7740)

### Second Level Implementation

The second level of the RPC implementation is the transaction creation code. This resides in the `src/cc/heir.cpp` source file.

#### Implementing heirfund transaction creation
The following content displays the skeleton of the <b>heirfund</b> RPC implementation.

[For links to the full source code and example files, click here.](../../../basic-docs/antara/antara-tutorials/heir-module-tutorial.html#links-to-heir-source-code-and-building-instructions)

```cpp
// heirfund transaction creation code, src/cc/heir.cpp
std::string HeirFund(int64_t amount, std::string heirName, CPubKey heirPubkey, int64_t inactivityTimeSec)
{
```

Create a mutable version of a transaction object.

```cpp
    CMutableTransaction mtx = CreateNewContextualCMutableTransaction(Params().GetConsensus(), komodo_nextheight());
```

Declare and initialize an `CCcontract_info` object with Heir module variables, such as our global CC address, our global private key, etc.

```cpp
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, EVAL_HEIR);
```

#### Adding Inputs to the Transaction

Add inputs to the transaction that are enough to make a deposit of the requested amount to the Heir fund. Also add one fee to serve as a marker, and another for the miners.

By tradition, we use a constant fee of `10000` satoshis.

We use the `pubkey` from the komodod `-pubkey` launch parameter as the destination address for the funds withdrawn from the `1of2` plan address.

We use a function in the CC SDK, `AddNormalinputs`, to add the normal inputs to the mutable transaction.

```cpp
    const int64_t txfee = 10000;
    CPubKey myPubkey = pubkey2pk(Mypubkey());
    if (AddNormalinputs(mtx, myPubkey, amount+2*txfee , 60) > 0) {
```

The parameters passed to the `AddNormalinputs()` function are:

- The transaction itself
- The user's pub
- The total value for the funding amount
- he marker and the miner fees
- The limit on the quantity of utxos the daemon can take from the wallet of the user
  - Natuarlly, only utxos that are available via the wallet's private keys can be used for these inputs

#### Adding Outputs to the Transaction

According to our specification, we need two outputs: one for the funding deposit and one for the marker.

Here, we use two CC SDK functions that are designed to create CC vouts.

The first is `MakeCC1of2vout`. This creates a CC vout with a threshold of `2` addresses that can spend from the plan funds. We supply as arguments the two potential addresses, represented here as `myPubkey` and `heirPubkey`.

`MakeCC1vout` creates a vout with a simple CryptoCondition which sends a transaction fee to the Heir module global CC address. (This is returned by the `GetUnspendable()` function call below.) We need the global CC address so that we can both mark the transaction, and to find all Heir funding plans.

You will always need some kind of marker for any instance of an Antara module plan for at least the initial transaction. Otherwise, you might lose the instance's data in the blockchain.

We call this a <b>marker pattern</b> in Antara development, and we will explore this later in the tutorial.

This first statement creates a vout with a threshold CryptoCondition. This allows spending via one of two possible pubkeys. The statment then adds this vout to the transaction.

Note the eval code, `EVAL_HEIR`. This triggers the Heir validation code whenever a Heir module transaction occurs.

The second statement creates a marker vout with a simple CryptoCondition. There is a small fee sent to the Heir module's global CC address. The statement then adds this vout to the transaction. This vout will be used for retrieving the list of all instances of the Heir module via the <b>heirlist</b> RPC.

```cpp
        mtx.vout.push_back( MakeCC1of2vout(EVAL_HEIR, amount, myPubkey, heirPubkey) );
        mtx.vout.push_back( MakeCC1vout(EVAL_HEIR, txfee, GetUnspendable(cp, NULL)) );
```

Finish the creation of the transaction by calling the `FinalizeCCTx` function along with its parameters from the `cp` object, the `mtx` object itself, the owner's pubkey, and the transaction fee amount.

Note the cast to `uint8_t` for the constants `EVAL_HEIR` and `F` function id. This is important, as the cast supposes a one-byte size for the serialization of these values. If this size was not inferred, then the type would be an `int`.

Also, an opreturn object with the data from this module instance is passed. To create the opreturn object, serialize the needed ids and variables to a `CScript` object.

```cpp
        std::string rawhextx = FinalizeCCTx(0, cp, mtx, myPubkey, txfee,
            CScript() << OP_RETURN << (uint8_t)EVAL_HEIR << (uint8_t)'F' << myPubkey << heirPubkey << inactivityTimeSec << heirName));
        return rawhextx;
    }
```

In case the `AddNormalinputs()` function cannot find sufficient owner coins for the requested amount (including the transaction fee), we set the `CCerror` error object.

```cpp
    CCerror = "not enough coins for requested amount and txfee";
    return std::string("");
}
```

Note that we do not need to add the normal change output here because the `FinalizeCCTx` function adds the change output for us.

`FinalizeCCTx` also builds the transaction input `scriptSigs` (both normal and CC aspects), adds tx signatures to them, and returns a signed transaction in hexadecimal encoding.

Also note the `E_MARSHAL()` function. This serializes variables of various supported types to a byte array. The byte array is then serialized to a `CScript` object. The object is stored in the `scriptPubKey` transaction field in the last opreturn vout with transaction data.

There is also the mirror `E_UNMARSHAL()` function. This is used for unpacking opreturn data from a CScript object to C++ variables, and for further processing.

The returned transaction is ready to be sent to the Smart Chain network using the [<b>sendrawtransaction</b>](../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) RPC.

#### Implementing the heirclaim RPC

As before, this implementation has two levels. The first level checks the required environment and converts the parameters. The second level creates the final transaction.

##### heirclaim syntax

```bash
./komodo-cli -ac_name=YOURCHAIN heirclaim fundingtxid amount
```

##### Add the RPC command to komodo-cli

Add a new command to `komodo-cli` by adding a new element into the `vRPCCommands` array in the source file `src/server.cpp`.

```cpp
    { "heir",       "heirclaim",   &heirclaim,      true },
```

Using the previous section of the tutorial as an example, add an `heirclaim` RPC implementation in the `src/rpc/wallet.cpp` source file.

Add the `heirclaim` declaration in the the `src/rpc/server.h` header file.

```cpp
// heirclaim command rpc-level implementation, src/wallet/rpcwallet.cpp

UniValue heirclaim(const UniValue& params, bool fHelp)
{
    CCerror.clear(); // clear global error object
```

Check that the wallet is available.

In case the user asks for help via the `--help` parameter, or in case the parameters are not correctly submitted, print a `help` message to the console.

Also check that cc contract requirements are satisfied:

```cpp
    if (!EnsureWalletIsAvailable(fHelp))
        return NullUniValue;
    if (fHelp || params.size() != 2)
	throw runtime_error("heirclaim txfee funds fundingtxid\n");
    if (ensure_CCrequirements(EVAL_HEIR) < 0)
	throw runtime_error("to use CC contracts, you need to launch daemon with valid -pubkey= for an address in your wallet\n");
```

Lock the wallet:

```cpp
    LOCK2(cs_main, pwalletMain->cs_wallet);
```

Convert the parameters from `UniValue` to `c++` type:

```cpp
    uint256 fundingtxid = Parseuint256((char*)params[0].get_str().c_str());
    CAmount amount = atof(params[1].get_str().c_str()) * COIN;  // Note conversion from satoshis to coins by multiplication by 10E8
```

Call the `HeirClaim` transaction creation function and return the created transaction in hexademical.

```cpp
    UniValue result = HeirClaim(fundingtxid, amount);
    RETURN_IF_ERROR(CCerror);  // use a macro to throw runtime_error if CCerror is set in HeirFund()
    return result;
}
```
#### Transaction creation code for heirclaom rpc
Implement the `HeirClaim` transaction creation code in the `src/cc/heir.cpp` source file.

```cpp
// heirclaim transaction creation function, src/cc/heir.cpp
std::string HeirClaim(uint256 fundingtxid, int64_t amount)
{
```

Start with creating a mutable transaction object:

```cpp
    CMutableTransaction mtx = CreateNewContextualCMutableTransaction(Params().GetConsensus(), komodo_nextheight());
```

Initialize the `cp` object:

```cpp
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, EVAL_HEIR);
```

Find the most recent owner transaction to calculate the owner's inactivity time. The helper function, `FindLatestOwnerTx()`, returns the lastest transaction id, the `owner` and `heir` public keys, `inactivity time setting` value, and the `hasHeirSpendingBegun` flag value.

```cpp
    const int64_t txfee = 10000;
    CPubKey ownerPubkey, heirPubkey;
    int64_t inactivityTimeSec;
    uint8_t hasHeirSpendingBegun;
    uint256 latesttxid = FindLatestOwnerTx(fundingtxid, ownerPubkey, heirPubkey, inactivityTimeSec, hasHeirSpendingBegun);
    if( latesttxid.IsNull() )   {
        CCerror = "no funding tx found";
        return "";
    }
```

Check whether the inactivity time of the owner has surpassed the amount designated in the plan. The `CCduration` CC SDK function returns the time (in seconds) since the confirmation of the block that bears the provided transaction to the chain-tip block.

If `hasHeirSpendingBegun` is already `true`, there is no need to also check the owner's inactivity time.

```cpp
    int32_t numBlocks; // not used
    bool isAllowedToHeir = (hasHeirSpendingBegun || CCduration(numBlocks, latesttxid) > inactivityTimeSec) ? true : false;
    CPubKey myPubkey = pubkey2pk(Mypubkey());  // pubkey2pk sdk function converts pubkey from a byte array to CPubKey object
    if( myPubkey == heirPubkey && !isAllowedToHeir )    {
        CCerror = "spending funds is not allowed for heir yet";
        return "";
    }
```

Create the claim transaction inputs and outputs.

Add normal inputs for the transaction fee:

```cpp
    if (AddNormalinputs(mtx, myPubkey, txfee, 3) <= txfee)    {
        CCerror = "not enough normal inputs for txfee";
        return "";
    }
```

Get the address of the `1of2` threshold CryptoCondition output (where the funds were deposited). Add CC inputs for the requested amount.

```cpp
    char coinaddr[65];
    GetCCaddress1of2(cp, coinaddr, ownerPubkey, heirPubkey);
```

Add CC inputs for this address with the use of a custom function:

```cpp
    int64_t inputs;
    if( (inputs = Add1of2AddressInputs(mtx, fundingtxid, coinaddr, amount, 64)) < amount )   {
        CCerror = "not enough funds claimed";
        return "";
    }
```

Add a normal output to receive the claimed funds, and a CC change output for the remaining amount.

```cpp
    mtx.vout.push_back(CTxOut(amount, CScript() << ParseHex(HexStr(myPubkey)) << OP_CHECKSIG));
    if (inputs > amount)
        mtx.vout.push_back(MakeCC1of2vout(EVAL_HEIR, inputs - amount, ownerPubkey, heirPubkey));
```

Add normal change (if any), add OP_RETURN data, and sign the transaction:

```cpp
     return FinalizeCCTx(0, cp, mtx, myPubkey, txfee, CScript() << OP_RETURN << E_MARSHAL(ss << (uint8_t)EVAL_HEIR << (uint8_t)'C' << fundingtxid << (myPubkey == heirPubkey ? (uint8_t)1 : hasHeirSpendingBegun)));
}
```

In the opreturn we add a pair of standard ids: the CC `EVAL` code, the functional id, and the `fundingtxid` to serve as the funding plan identifier.

The `hasHeirSpendingBegun` value is a special flag. When this value is changed to `1`, it indicates that the heir has spent funds in the fund at least once. Therefore, it is no longer necessary to check the inactivity time of the owner.

Once `hasHeirSpendingBegun` is set to `true`, this flag should also be set to `true` in the following transaction OP_RETURN values.

#### Implementations for heiradd, heirlist and heirinfo

- `heiradd` allows a user to add more funding to a plan.
- `heirlist` is a standard RPC for all CC modules. This RPC outputs a list of all initial transaction IDs, which serve as the identifiers for each plan.
- `heirinfo` provides some data about a funding plan

The implementation for these RPCs can be found in the github repository with the source code of this contract.

[RPC implementation can be found here.](https://github.com/dimxy/komodo/blob/heir-simple/src/wallet/rpcwallet.cpp)

[Transaction creation and retrieval code can be found here.](https://github.com/dimxy/komodo/blob/heir-simple/src/cc/heir.cpp)

### Heir Module Helper functions

#### Simplified Add1of2AddressInputs() Function Implementation

```cpp
// add inputs from cc threshold=2 cryptocondition address to transaction object, src/cc/heir.cpp
int64_t Add1of2AddressInputs(CMutableTransaction &mtx, uint256 fundingtxid, char *coinaddr, int64_t amount, int32_t maxinputs)
{
    int64_t totalinputs = 0L;
    int32_t count = 0;
```

By default, the CC SDK function, `SetCCunspents`, fills the provider vector with a list of unspent cc outputs of the provided `coinaddr` Bitcoin address.

For our Heir module, we pass the `1of2` address where the plan's funds are stored.

```cpp
    std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>> unspentOutputs;
    SetCCunspents(unspentOutputs, coinaddr, true);  // get a vector of cc uxtos for the address in coinaddr[]
```

Iterate through the returned uxtos and add those that are appropriate to the transaction's vin array:

```cpp
    for (std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>>::const_iterator it = unspentOutputs.begin(); it != unspentOutputs.end(); it++) {
         CTransaction tx;
         uint256 hashBlock;
         std::vector<uint8_t> vopret;
```

Load the current uxto's transaction and check whether it has an opreturn in the back of the array of outputs.

```cpp
         if (GetTransaction(it->first.txhash, tx, hashBlock, false) && tx.vout.size() > 0 && GetOpReturnData(tx.vout.back().scriptPubKey, vopret) && vopret.size() > 2)
         {
              uint8_t evalCode, funcId, hasHeirSpendingBegun;
              uint256 txid;
```

Check that the uxto matches this plan.

```cpp
              if( it->first.txhash == fundingtxid ||   // if this is our contract instance coins
                  E_UNMARSHAL(vopret, { ss >> evalCode; ss >> funcId; ss >> txid >> hasHeirSpendingBegun; }) && // unserialize opreturn
                  fundingtxid == txid  ) // it is a tx from this funding plan
              {
```

To add the utxo to the transaction's vins, set the utxo's vout number and transaction id in the transactions vins. Pass an empty call to the `CScript()` function in the `scriptSig` parameter. This will be filled by the `FinalizeCCtx` function.

```cpp
                  mtx.vin.push_back(CTxIn(it->first.txhash, it->first.index, CScript()));
                  totalinputs += it->second.satoshis;
```

Stop once sufficient CC inputs are found.

In the event that the `amount` parameter is `0`, add all available inputs to calculate all available funds.

```cpp
                  if( amount > 0 && totalinputs >= amount || ++count > maxinputs )
                      break;
              }
         }
    }
```

Return the total amount of inputs added to the transaction's vin array:

```cpp
    return totalinputs;
}
```

#### Simplified Implementation of the FindLatestOwnerTx() Function

To calculate the owner-inactivity time and to enable the heir to claim the funds, we implement the function, `FindLatestOwnerTx()`.

This function iterates through the transactions of this plan, (which we can also call this instance of the Heir module) and finds the owner's latest transaction. We pass into this function the initial funding txid of the plan we desire to inspect.

The function returns the pukeys of both the owner and the heir, the owner inactivity time, and a flag that indicates whether the heir has already spent funds from the `1of2` address.

All returned values of the function are retrieved from the transactions' opreturns.

```cpp
// find the latest owner transaction id
// this function also returns some values from the initial and latest transaction opreturns
// Note: this function is also called from validation code (use non-locking calls)

uint256 FindLatestOwnerTx(uint256 fundingtxid, CPubKey& ownerPubkey, CPubKey& heirPubkey, int64_t& inactivityTime, uint8_t &hasHeirSpendingBegun)
{
    uint8_t eval, funcId;
```

Initialize the flag as though the heir has not yet spent any of their plan's funds.

```cpp
    hasHeirSpendingBegun = 0;
```

Initialize the following variables.

```cpp
    CTransaction fundingtx;
    uint256 hashBlock;
    std::vector<uint8_t> vopret;
    std::string name;
```

Load the initial funding transaction, check whether it has a correct opreturn, and deserialize it.

Check the transaction rules. Return an empty id if the funding transaction cannot not be loaded or is incorrect.

```cpp
    if (!myGetTransaction(fundingtxid, fundingtx, hashBlock) ||  // NOTE: use non-locking version of GetTransaction as we may be called from validation code
        fundingtx.vout.size() == 0 ||    // no vouts, even opreturn
        !GetOpReturnData(fundingtx.vout.back().scriptPubKey, vopret) ||   // could not get opreturn from the last vout
        !E_UNMARSHAL(vopret, ss >> eval; ss >> funcId; ss >> ownerPubkey; ss >> heirPubkey; ss >> inactivityTime; ss >> name;) ||  // could not unmarshal opreturn
        eval != EVAL_HEIR ||   // incorrect eval code in 1st byte
        funcId != 'F')    // incorrect funcid in the 2nd byte
        return zeroid;
```

Initialize the CC contract object for the Heir module's `EVAL` code.

```cpp
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, EVAL_HEIR);
```

Declare the `coinaddr` array and use the `GetCCaddress1of2` function to pass the array the `1of2` address that holds our funds.

```cpp
    char coinaddr[64];
    GetCCaddress1of2(cp, coinaddr, ownerPubkey, heirPubkey);
```

Get the vector with uxtos for the `1of2` address.

```cpp
    std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>> unspentOutputs;
    SetCCunspents(unspentOutputs, coinaddr, true);
```

Iterate through the returned uxto's to find the last funding or spending owner transaction:

```cpp
    int32_t maxBlockHeight = 0;
    uint256 latesttxid = fundingtxid;   // set to initial txid
    for (std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>>::const_iterator it = unspentOutputs.begin(); it != unspentOutputs.end(); it++)
    {
        CTransaction vintx;
        uint256 blockHash;
        std::vector<uint8_t> vopret;
        uint8_t eval, funcId, flagopret;
        uint256 txidopret;

        int32_t blockHeight = (int32_t)it->second.blockHeight;
```

Retrieve the transaction from the returned array. Check and unmarshal the transaction's opreturn and check whether this transaction is from the relevant Heir plan.

```cpp
        if (myGetTransaction(it->first.txhash, vintx, blockHash) &&     // NOTE: use non-locking version of GetTransaction as we may be called from validation code
            vintx.vout.size() > 0 &&
            GetOpReturnData(vintx.vout.back().scriptPubKey, vopret) &&
            E_UNMARSHAL(vopret, ss >> eval; ss >> funcId; ss >> txidopret; ss >> flagopret) &&
            eval == EVAL_HEIR &&
            (funcId == 'C' || funcId == 'A') &&
            fundingtxid == txidopret )   {
```

As the `SetCCunspents` function does not return uxtos in chronological order, order them by block height to find the latest utxo.

```cpp
            if (blockHeight > maxBlockHeight) {
```

Check whether this transaction indicates owner activity. Use a pair of CC SDK functions, `TotalPubkeyNormalInputs()` and `TotalPubkeyCCInputs()`, that iterate through the vin array to find if the transaction was signed with the owner's pubkey.

```cpp
                if (TotalPubkeyNormalInputs(vintx, ownerPubkey) > 0 || TotalPubkeyCCInputs(vintx, ownerPubkey) > 0) {
```

If this transaction represents owner activity, reset the lastest txid to this current txid.

Set the flag for the transaction opreturn.

```cpp
                    latesttxid = it->first.txhash;
		    hasHeirSpendingBegun = flagopret;
                    maxBlockHeight = blockHeight;
                }
            }
        }
    }
```

Return the latest owner txid.

```cpp
    return latesttxid;
}
```

#### Simplified Validation Function Implementation

Validation provides the logic control of spent Antara-module value, and validation also provides the data added to the Smart Chain.

Recall that validation code is invoked for a transaction at the time the CC-related value is spent (as opposed to only being invoked at the time the value is added). We trigger the invokation of this validation function when at least one transaction input is a CC input bearing this module's `EVAL` code.

Validation code typically is not called for the CC module's initial transaction. Instead, we invoke validatation at the time the initial transaction is spent in a second transaction.

One way to invoke validation for the first transaction when performing the second transaction is to load the initial transaction and validate it first. If the initial transaction turns out to be invalid, it can remain in the chain and is otherwise ignored. In this case, if a CC marker is used, it can be cleared and the transaction is removed from the RPC list output.

#### Guidelines for Validation

In our Heir module prototype, we have three transactions to validate: the initial funding, the adding transaction that adds more funds, and the transaction that claims the funds. The first and second of these transactions do not have any CC vins, and therefore all are validated together with the transaction that claims the funds.

Here are several common aspects of a module that require validation:

- The basic transaction structure
- The basic data structure in the OP_RETURN
  - Validation here ensures data integrity in the chain
  - All OP_RETURNs should contain the `EVAL` code and functional id in the first two bytes
- Avoid all foreseeable attack vectors
  - Ensure DOS attacks are eliminated, especially in the event of a malformed transaction
  - Check the array size before use of any transaction
- Check the previous Heir module transactions which this transaction spends and which have no cc inputs. This is accomplished by retrieving the transaction id from the opreturn and loading and validating the previous transaction

#### Heir Module Validation Rules

The following are the aspects of validation the Heir module requires.

- The inital funding transaction 
  - Validate that the `1of2` address accurately matches `pubkeys` in the opreturn
- The claiming transaction 
  - Validate that this transaction spends transactions from the same funding plan. This funding transaction id's values from the opreturn outputs of the transactions should match. (`vintx`) 
- Validate whether the heir is allowed to spend the funds
  - Check whether the flag indicates that the Heir is already spending the funds
  - Check whether enough time has passed since the last time the owner was active on the chain
- When validating, separate the owner's funding transaction from any other contributions to the `1of2` address
    - Although the Heir module is initiated based on the owner's initial transaction, nothing prevents other users on the Smart Chain from contributing funds
    - Therefore, when validating, for each utxo contained in the `1of2` address, calculate whether or not the utxo's vins contain the owner's pubkey
- During the course of validation, we fully check opreturn format

This validation logic is performed in the `HeirValidate()` function. The function is invoked whenever a CC transaction bearing the appropriate eval code occurs on the chain. When this eval code appears, the consensus mechansim calls the `HeirValidate()` function, executes the indicated validation code, and adds the transaction to the chain.

<!-- Rephrased the above to break it into smaller sentences. Please check accuracy. -->

#### HeirValidate() Implementation

Explanation of code:

- Transaction-validation entry function
  - (This is actually a callback)
- Parameters
  - `cpHeir` - Pointer to the module's variable structure
  - `eval` - Pointer to the CC dispatching object
    - Used to return invalid state
  - `tx` - The transaction itself
  - `nIn` - Not used in validation code

```cpp
bool HeirValidate(struct CCcontract_info* cpHeir, Eval* eval, const CTransaction& tx, uint32_t nIn)
{
```

Check that the basic transaction structure has the opreturn with the correct basic `evalcode` and `funcid`.

::: tip

There is no need to check the function ids of the (`F`) funding transaction or the (`A`) add transaction, as these transactions have no Heir CC vins. Therefore, we do not create validation code for them.

:::

```cpp
    std::vector <uint8_t> vopret;
    if( tx.vout.size() < 1 || !GetOpReturnData(tx.vout.back().scriptPubKey, vopret) || vopret.size() < 2 || vopret.begin()[0] != EVAL_HEIR ||
        vopret.begin()[1] != 'C')

        // interrupt the validation and return invalid state:

        return eval->Invalid("incorrect or no opreturn data");  // note that you should not return simply 'false'
```

Decode the transaction's opreturn with the `E_UNMARSHAL` function. This function places the opreturn serialized data into several variables. One of them, the `fundingtxid` variable, is the transaction id (txid) of the initial funding transaction. We will use it further to find the latest owner transaction to check when the owner was last active on the chain.

```cpp
    uint8_t evalcode, funcId;
    uint256 fundingtxid; //initialized to null
    uint8_t hasHeirSpendingBegun;
    if (!E_UNMARSHAL(vopret, ss >> evalcode; ss >> funcId; ss >> fundingtxid; ss >> hasHeirSpendingBegun;))
        // return invalid state if unserializing function returned false:
        return eval->Invalid("incorrect opreturn data");
```

Check that the `fundingtxid` is a valid txid:

```cpp
    if( fundingtxid.IsNull() )
        return eval->Invalid("incorrect funding plan id in tx opret");
```

Here we come to a good place to load the initial transaction, check whether it exists, and whether it has a correctly formed opreturn.

Call the `FindLatestOwnerTx()` function. This function obtains the opreturn parameters and the `hasHeirSpendingBegun` flag, and checks the initial transaction.

```cpp
    CPubKey ownerPubkey, heirPubkey;
    int64_t inactivityTimeSec;
    uint8_t lastHeirSpendingBegun;
    uint256 latesttxid = FindLatestOwnerTx(fundingtxid, ownerPubkey, heirPubkey, inactivityTimeSec, lastHeirSpendingBegun);
    if (latesttxid.IsNull()) {
        return eval->Invalid("no or incorrect funding tx found");
    }
```

Log in the terminal that the daemon process is in the validation code:

```cpp
    std::cerr << "HeirValidate funcid=" << (char)funcId << " evalcode=" << (int)cpHeir->evalcode << std::endl;
```
Prepare for validation rules that are specific for each function id (`F`, `A`, and `C`).

```cpp
    switch (funcId) {
```

For `F` and `A`, we return an invalid response, as the process should never be able to access these function ids.

```cpp
    case 'F':
    case 'A':
        return eval->Invalid("unexpected HeirValidate for heirfund");
```

Validation for the claiming transaction.

- Check whether we are spending the correct funding transactions
  - For example, check that the transactions are from the correct module instance, as identified by the `fundingtxid`
  - If incorrect, return `false`
- If the heir is claiming the funds, check that he is allowed to do so
  - For example, check the inactivity time of the owner and whether the heir has already spent funds from the `1of2` address
- Check whether the new flag, `hasHeirSpendingBegun`, is set correctly

Both of the following support functions, `CheckSpentTxns` and `CheckInactivityTime`, are in the `heir.cpp` source file.

[Link to heir.cpp source file](https://github.com/dimxy/komodo/blob/heir-simple/src/cc/heir.cpp]

```cpp
    case 'C':
        if (!CheckSpentTxns(cpHeir, eval, tx, fundingtxid))
            return false;
        if (!CheckInactivityTime(cpHeir, eval, tx, latesttxid, inactivityTimeSec, heirPubkey, lastHeirSpendingBegun, hasHeirSpendingBegun) )
            return false;
        break;
```

For unsupported function ids, return an invalid state.

```cpp
    default:
        std::cerr << "HeirValidate() illegal heir funcid=" << (char)funcId << std::endl;
        return eval->Invalid("unexpected HeirValidate funcid");
    }
```

If all rules pass, return a valid state.

```cpp
    return eval->Valid();
}
```

#### Validation Code Errors

During the development of validation code, you will likely receive validation errors when any CC module validation function returns an invalid state.

For example, when sending a raw transaction, the daemon checks the transaction while adding it to the mempool.

During this process, if the CC validation code returns an invalid state you will see the following error:

```cpp
error code: -26
error message:
16: mandatory-script-verify-flag-failed (Script evaluated without error but finished with a false/empty top stack element)
```

When this happens, check the server output for a more specific error description. The first line of the output contains the `eval->invalid()` message from your validation code.

```cpp
CC Eval EVAL_HEIR Invalid: incorrect opreturn data spending tx 4b6e1ed868cf941dabf9edc7f675321bdb4258692ba02f56dc21100f88981ac4
ERROR: CScriptCheck(): 7961fe4f9f3bdabef154404ea8ec7a11be1546febc34efe67faede8d930c0749:1 VerifySignature failed: Script evaluated without error but finished with a false/empty top stack element
ERROR: AcceptToMemoryPool: BUG! PLEASE REPORT THIS! ConnectInputs failed against MANDATORY but not STANDARD flags 7961fe4f9f3bdabef154404ea8ec7a11be1546febc34efe67faede8d930c0749
```

## Links to Heir Source Code and Building Instructions

A complete working example of this simplified Heir CC module tutorial can be found at the following link.

[Link to Simplified Heir Module](https://github.com/dimxy/komodo/tree/heir-simple)

The source files are found in the following directories.

- src/cc/heir.cpp
- src/cc/CCheir.h
- src/wallet/rpcwallet.cpp
- src/rpc/server.cpp
- src/rpc/server.h

Instructions to build the Komodo binaries, including the necessary CC modules, can be found here:

[Link to Instructions for Building from Source]()


#### Terminology

| Term | Definition |
| ---- | ---------- |
| CryptoCondition, or CC | An encoded expression, coupled with a supporting C library, that allows the Smart Chain's consensus mechanism to check several types of logical conditions based on electronic signatures and hashes |
| Antara module | A collection of customized code that a developer adds into the default daemon to add unique functionality, including customized consensus rules and more |
| CC input | A transaction input, CC encoded. Typically spends value from a CC output |
| CC output | A transaction output, CC encoded |
| funding plan | The txid of an Antara Module's initial transaction, it is the identifier for all of the Antara module's CC transactions, related to this funding plan |
| normal inputs | Inputs spending value from normal transaction outputs (not CC outputs) |
| normal outputs | Not CC outputs, but normal transaction outputs (pubkey, pubkey hash, etc.) |
| OP_RETURN, opreturn | A special output in a transaction that holds user and module data. The output is prepended by  an OP_RETURN script opcode and therefore spending from this output is impossible |
| tx, txn | Short for "transaction" |
| txid | Transaction id; a hash of a transaction |
| unspendable address | The global cc contract address, for which its public and private key are commonly known. This address is used for conditionally sharing funds between contract users. As the address's private key is not a secret, by default anyone can spend value from this address. However, CC validation code often applies business logic conditions and checks to ensure that only transactions that meet the given criteria are actually able to spend funds in this address |
| vin | An input, or an array of inputs, in a transaction structure (tx.vin) |
| vout | An output, or an array of outputs, in a transaction structure (tx.vout) |

## CC contract patterns

The following are useful patterns during Antara module development.

#### Baton Pattern

The baton pattern allows the developer to organize a single-linked list in a Smart Chain.

To traverse a linked list using the baton method, start with the first transaction in any plan instance and iterate through the other transactions to collect properties in their opreturns.

### Marker Pattern

The marker pattern is used to place a mark on all similar transactions. This is accomplished by sending a small value to a common fixed address. Typically, we use the global CC address.

You can also create either a normal marker or a CC marker for the purpose of finding transactions related to your module.

When using normal markers, there is a small problem that is easily solved. The global CC address allows any user to spend its funds, and therefore anyone can spend your marker transaction. To overcome this, use the CC SDK function, `Settxids()`, to retrieve all transactions with markers in the CC contract list function.

Another method is to create an unspendable CC marker. In this method, send a small value to a CC output with a well-known address. To retrieve the list of CC-marker transactions, use the CC SDK function, `SetCCunspents()`. This returns a list of transactions with unspent outputs for that known address.

When using the unspendable CC marker method, in the validation code you should disable spending from this address.  This prevents a scenario where spending from the address causes you to lose markers. (For example, if you were to allow for spending from this address using a burn transaction, the burn transactions would take the burned markers into a hidden state, thus removing the markers from the list of initial transactions.)

In all cases, the CC module validation code should disable unauthorized attempts to spend any markers.

Concerning the method that relies on the CC marker, if the global CC address is used for storing not only the marker value, but also other funds, you need to ensure that marker values are not spent.

A code example for finding transactions marked with a normal marker:

```cpp
    std::vector<std::pair<CAddressIndexKey, CAmount> > addressIndex;
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, <some eval code>);
    SetCCtxids(addressIndex, cp->normaladdr, false);
    for (std::vector<std::pair<CAddressIndexKey, CAmount> >::const_iterator it = addressIndex.begin(); it != addressIndex.end(); it++) 	{
        CTransaction vintx;
        uint256 blockHash;
        if( GetTransaction(it->first.txhash, vintx, blockHash, false) ) {
            // check tx and add its txid to a list
        }
    }
```

Many other Antara modules contain examples for finding marked transactions in any CC module standard list function.

::: tip

The <b>SetCCtxids()</b> function requires that the Smart Chain [<b>txindex</b>](../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#txindex) launch parameter NOT be adjusted beyond the default and automatic settings.

:::

A code example for finding transactions marked with an unspendable CC marker:

```cpp
    std::vector<std::pair<CAddressIndexKey, CAmount> > addressIndex;
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, <some eval code>);
    SetCCunspents(addressIndexCCMarker, cp->unspendableCCaddr, true);
    for (std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue> >::const_iterator it = addressIndexCCMarker.begin(); it != addressIndexCCMarker.end(); it++) {
        CTransaction vintx;
        uint256 blockHash;
        if( GetTransaction(it->first.txhash, vintx, hashBlock, false) ) {
            // check tx and add its txid to a list
        }
    }
```

::: tip

The <b>CCunspents()</b> function requires the Smart Chain [<b>addressindex</b>](../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#addressindex) and [<b>spentindex</b>](../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#spentindex) launch parameters to be set to `1`.

:::

#### Txidaddress Pattern

You can use the txidaddress pattern to send value to an address from which the value should never again be spent.

A function is available for creating an address that is not associated with any known private key.

For example, the [<b>Payments</b>]() Antara Module uses <!-- there's a missing noun here. Do we say, "Antara Module uses this function to create ..." ? And if so, are we referring to the MakeCC1of2vout function below, or something else? --> to create a spendable address as follows.

```cpp
CTxOut MakeCC1of2vout(uint8_t evalcode,CAmount nValue,CPubKey pk1,CPubKey pk2, std::vector<std::vector<unsigned char>>* vData)
```

For the RPC that manages merge functionality, we use the `vData` optional parameter to append the opreturn directly to the `ccvout` itself, rather than an actual opreturn as the last `vout` in a transaction.

```cpp
opret = EncodePaymentsMergeOpRet(createtxid);
std::vector<std::vector<unsigned char>> vData = std::vector<std::vector<unsigned char>>();
if ( makeCCopret(opret, vData) )
    mtx.vout.push_back(MakeCC1of2vout(EVAL_PAYMENTS,inputsum-PAYMENTS_TXFEE,Paymentspk,txidpk,&vData));
GetCCaddress1of2(cp,destaddr,Paymentspk,txidpk);
CCaddr1of2set(cp,Paymentspk,txidpk,cp->CCpriv,destaddr);
rawtx = FinalizeCCTx(0,cp,mtx,mypk,PAYMENTS_TXFEE,CScript());
```

Using a modification to the `IsPaymentsvout` function, we can now spend a `ccvout` in the Payments module back to its own address, without needing a `markervout` or an opreturn.

```cpp
int64_t IsPaymentsvout(struct CCcontract_info *cp,const CTransaction& tx,int32_t v,char *cmpaddr, CScript &ccopret)
{
    char destaddr[64];
    if ( getCCopret(tx.vout[v].scriptPubKey, ccopret) )
    {
        if ( Getscriptaddress(destaddr,tx.vout[v].scriptPubKey) > 0 && (cmpaddr[0] == 0 || strcmp(destaddr,cmpaddr) == 0) )
            return(tx.vout[v].nValue);
    }
    return(0);
}
```

In place of the `IsPayToCryptoCondition()` function we can use the `getCCopret()` function. This latter function is a lower level of the former call, and will return any `vData` appended to the `ccvout` along with a `true`/`false` value that would otherwise be returned by the `IsPayToCryptoCondition()` function.

In validation, we now have a totally diffrent transaction type than the types that are normally available. This new type allows us to have different validation paths for different `ccvouts`, and it allows for multiple `ccvouts` of different types per transaction.

```cpp
if ( tx.vout.size() == 1 )
{
    if ( IsPaymentsvout(cp,tx,0,coinaddr,ccopret) != 0 && ccopret.size() > 2 && DecodePaymentsMergeOpRet(ccopret,createtxid) )
    {
        fIsMerge = true;
    } else return(eval->Invalid("not enough vouts"));
}
```

## Various Tips and Tricks in Antara Module Development

#### Test Chain Mining Issue

On a test chain consisting of two nodes, we do not recommend that you set both nodes to mine. When there are only two nodes, a blockchain struggles more to achieve consensus, and the chain can quickly stop syncing properly. Instead, have only one node mine for the two-node test chain.

#### Limits on AddNormalInputs() Function Calls per Transaction

Keep the number of `AddNormalInputs()` function calls to one for each block of code that creates a transaction.

As an example of why we should not exceed more than one call, we can look at the `FillSell()` function. This function calls `AddNormalInputs()` two times at once. The first time the `AddNormalInputs()` function must add a txfee and the second time it adds coins to pay for tokens.

Let us suppose we have only two utxos in our wallet, one for `9,000,000` satoshis and another for `10,000` satoshis. In this case, when we execute the `FillSell()` function our large uxto is added during the first call and then we receive an error in the second call, `filltx not enough utxos`.

Instead, we recommend that the developer place only one I think it is always better to combine these calls into a single call.

#### Troubleshooting Node Syncing on Test CC Chain

Sometimes, a developer may find after developing a new CC module that a node cannot sync with other nodes in their test network. Executing the [<b>getpeerinfo</b>](../basic-docs/smart-chains/smart-chain-api/network.html#getpeerinfo) shows fewer synced blocks than synced heads. The developer may also see errors in the console log on the malfunctioning node.

When this happens, the cause is most commonly rooted in the CC module's validation code. For example, the developer may have changed validation rules, and in so doing may have rendered old transactions invalid in the node's state.

A quick remedy in this situation is to [manually delete the blockchain data on the malfunctioning node and resync the network.](../basic-docs/smart-chains/smart-chain-setup/smart-chain-maintenance.html#manually-deleting-blockchain-data) Old transactions should pass validation, assuming the new validation code takes their situation into account.

When resyncing the node is not a viable solution, another option is to use code logging and the gdb debug software to investigate the cause of failure.

Yet another solution, if necessary, is to setup the validation code to only be effective after a certain block height. See the following example.

```cpp
if (strcmp(ASSETCHAINS_SYMBOL, "YOURCHAIN") == 0 && chainActive.Height() <= 501)
    return true;
```

You may also use the hidden `reconsiderblock` komodo-cli command to restart the malfunctioning node's syncing process at a desired block height.

#### Deadlocks in Validation Code

If komodod hangs while executing Antara module validation code, consider that some blockchain functions use locks. The combination of your validation code and the locks could be causing deadlocks in the consensus mechanism. If this is the case, use functions that are non-locking instead.

For example, the `GetTransaction()` function is a locking function. Instead, use `myGetTransaction()` or `eval->GetConfirmed()`.

<!--

Sidd: Let's wait on putting this in here until the tutorial is done.

#### Upcoming Part II of this Tutorial

In the next part of this tutorial, we will extend the functionality of our Heir module to also work with tokens.

-->

