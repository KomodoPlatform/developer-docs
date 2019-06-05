# Heir Module Tutorial

This tutorial demonstrates the process of developing a new [<b>Antara module</b>](). In the tutorial, we build a simplified prototype of the existing [<b>Heir</b>](../basic-docs/fluidity/fluidity-api/heir.html) Antara module.

#### Tutorial Objectives

The primary aim is to give the developer direct engagement with Antara module development, with a focus on the CryptoConditions aspects. This process will give the developer a better grasp of the broad potential of the Antara framework.

Furthermore, in the process of completing this tutorial the developer will learn how the Antara code directories are organized.

## Prerequisite Knowledge

Tutorial readers should have the following prerequisite experience. We provide links to relevant resources where available.

<!-- This may be too many links. Perhaps simplify method of communicating prerequisite knowledge. -->

- Confident programming skills with the C/C++ languages
- Familiarity with the Komodo platform
  - [Link to the Komodo whitepaper](https://komodoplatform.com/whitepaper)
  - [Link to <b>About Komodo Platform</b> section](../basic-docs/start-here/about-komodo-platform/about-komodo-platform.html)
- Conceptual understanding of Antara
  - [Link to Overview of Antara - 1](../basic-docs/fluidity/fluidity-tutorials/fluidity-overview.html#fluidity-overview)
  - [Link to Overview of Antara - 2](../basic-docs/fluidity/fluidity-tutorials/fluidity-conceptual-overview.html#introduction)
- Comprehension of the nature of Antara addresses
  - [Link to Antara Address Explanation]()
- Comprehension of concepts in the Main Path for Komodo Development
  - [Link to Main Path for Komodo Development in Learning Launchpad]()
- Familiarity with Bitcoin protocol basics
  - [Link to Mastering Bitcoin pdf book]()
  - [Link to JL777's tutorial on X]()
  - [Link to JL777's "Mastering CC" rewritten]()
  - [Link to conceptual overview of utxos]()
  - [Link to JL777's tutorial on utxos, bitcoin script, pubkeyscript, transaction structure, OP_RETURN opcode]()
- The `komodod` software should be installed on your local machine
  - [Link to installation instructions](../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html#linux)

<!-- Need to make sure this includes CC libs -->

### (temporary section) WIP Link from @dimxy

https://github.com/dimxy/komodo/wiki/Developing-my-first-cryptocondition-contract-Heir

https://github.com/dimxy/doc-dev/blob/master/first-cc-heir.md

## A Conceptual Understanding of the Intended Product

Read the introduction of the finished Heir Module API to gain a vision of what we are about to create. 

(Read until the start of the section named <b>Heir Module Flow</b> and then pause.)

[Link to Introduction to the Heir Antara Module](../basic-docs/fluidity/fluidity-api/heir.html#introduction)

The basic concept to understand is that the Heir module allows the owner of a Smart Chain digital asset to designate an inheritor of the asset, should the owner become inactive on the chain.

In terms of design, this is a relatively straightforward Antara module, which is one reason we use it here.

## Complete the Heir Module Flow Section (Optional)

Before we begin the development process, it may be helpful to first experiment with the flow of RPC commands for the existing Heir module. 

This section is optional, but recommended.

#### Launch the RICK Smart Chain

<!-- Note, only use one chain. If it's RICK, keep it RICK. -->

The community test chain, <b>RICK</b>, has the Heir module enabled and can serve our experiment purposes. Launch the chain as follows.

```bash
./komodod -pubkey=$pubkey -ac_name=RICK -ac_supply=90000000000 -ac_reward=100000000 -ac_cc=3 -addnode=138.201.136.145 &
```

#### Create a pubkey

Use the following guide to create an Antara pubkey and address on the <b>RICK</b> Smart Chain.

[Link to Antara pubkey creation guide](../basic-docs/fluidity/fluidity-setup/fluidity-instructions.html#creating-and-launching-with-a-pubkey)

#### Retrieve RICK Funds from the Community Faucet

<!-- Note from Dimxy: Change the header so that it's clear that we're temporarily using a separate module. Learning RPC aspects. -->

To obtain funds on the RICK Smart Chain, we utilize a different Antara module, [<b>Faucet</b>](../basic-docs/fluidity/fluidity-api/faucet.html#introduction). Our encounter with Faucet also presents an educational opportunity, which we discuss in a moment.

::: tip

If you need to gain a quick understanding of the <b>Faucet</b> module, you may read the introduction to the Faucet API section.

[Link to Faucet API Introduction](../basic-docs/fluidity/fluidity-api/faucet.html#introduction)

:::

Use the community Faucet to obtain a small amount of funds.

```bash
./komodo-cli -ac_name=RICK faucetget
```

Wait a few moments, and then use the [<b>getinfo</b>](../basic-docs/komodo-api/control.html#getinfo) method to verify that your wallet now contains RICK funds.

#### Complete Each API Method of the Heir Module

With funds in your wallet, you are prepared to experiment with the API commands available in the Heir Module Flow section. 

[Link to Heir Module Flow](../basic-docs/fluidity/fluidity-api/heir.html#introduction)

#### On the Relevance of Faucet

<!-- Dimxy: Maybe this section goes before the use of Faucet -->

The Faucet module provides a simple example of the nature of an Antara module for our study. Faucet allows a user to lock an arbitrary amount of funds within an Antara address. Other users on the network are able to withdraw funds from this Antara address in small portions. To prevent spam requests, the Faucet requires a small amount of proof-of-work from the requesting user's node. 

From this outline, we observe the basic business logic of the Faucet module. The module involves storing funds in a designated address, the creation of a faucet that can disburse funds, and the ability to limit the rate at which funds are withdrawn.

Compare this to our desired Heir module. The Heir module's business logic must allow a designated address the ability to inherit designated blockchain funds.

In both cases, the module's business logic is bound to transactions. 

#### Transactions as a Data Source

Transactions are a data source for Antara-based software. 

Transactions can store data in multiple forms. In the simplest form, transaction data records the movement of coins from one address to another. However, blockchain transactions are capable of storing additional data beyond simple coin movement. 

When we desire to place additional data into a transaction, we place this data into an <b>OP_RETURN</b>, or "<b>opreturn</b>" for short.

Observe the following transaction data structure for the existing Heir module:

```bash
./komodo-cli -ac_name=HELLOWORLD heirfund 0 5 MyDogHeir 037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f9299 100 'http://billionaire.com/mywill md5=5385639869'

{
  "txid": "9307989767c1d10b3c97834c7e9f50583387907848bc9776b4b77a705791864c",
  "overwintered": false,
  "version": 1,
  "locktime": 0,
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

<!-- Dimxy: Maybe seeing everything above is too much. Is it possible to reduce? Also, this transaction above has additional information not included in the simplified Heir module. Therefore, it may confuse them. -->

The <b>opreturn</b> is the last output in a transaction, and this output is never spendable under any circumstances. The <b>opreturn</b> is the location where all Antara module data is stored. 

```bash
  "vout": [
    
    ... (omitted for brevity) ...
    
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

  ...

```

Note how the value for the key, `asm`, begins with `OP_RETURN ... `, and is followed by hex-encoded data. 

The hex-encoded data is arbitrary, and can be used for any purposes a developer sees fit.

In the above example, the hex-encoded data can be decoded using the [<b>decodeccopret</b>](../../../basic-docs/smart-chains/smart-chain-api/util.html#decodeccopret) command. In our example, the decoded data is as follows.

<!-- Dimxy: Will look into specific details of this content and get back to us. -->

```
# Insert decoded hex data here
```

When an Antara module instance begins its lifecycle an initial transaction is created. In our example, the transaction we currently observe is an initial transaction of an Heir module.

<!--

Need to check that the above is accurate.

Also, need to resolve the type of cryptocondition in vouts and the CC outputs thing below.

-->

Note that the transaction takes value from normal inputs and sends it to CC outputs.

#### Value Taken From Normal vins

<collapse-text hidden title="Normal vins">

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

<collapse-text hidden title="CCvouts">

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

<!-- should the below first sentence say "module instance"? -->

As time progresses, more transactions on the Smart Chain are performed under this module. Each of the module's transactions spends from the previous transaction outputs associated with the module and creates new unspent transactions. This process effectively creates a [linked-list data structure.](https://en.wikipedia.org/wiki/Linked_list)

With each transaction, the <b>opreturn</b> data is never spent, and remains in the blockchain database for future recall.

## Understanding CryptoConditions

<!-- It may be better to have this section as a separate tutorial and discussion, and then link to it at the start of this tutorial. -->

Another important concept to understand is the nature of a <b>CryptoCondition</b>. This technology is part of [an industry-wide standard](https://tools.ietf.org/html/draft-thomas-crypto-conditions-01), and other platforms may use CryptoConditions differently.

Komodo has implemented our own unique version of CryptoConditions as a part of the Antara framework. Here, a CryptoCondition is a logical expression. The expression is executed by electronic signatures and by the hashes of spent transactions. 

The logical expressions of a CryptoCondition are stored in the scripts of transactions, and also in a supporting C library. The library is included during the installation procedure of the associated Smart Chain, and the library evaluates and checks the logical expressions that are stored in the transaction scripts. 

#### The Importance of CryptoConditions

CryptoConditions allow a developer to build and evaluate complex logical expressions that are based on the results of cryptographic functions.

This is a key aspect of Antara's ability to allow the developer to add arbitrary code into their Smart Chain's consensus mechanism. Through CryptoConditions and other elements, the consensus mechanism can rule over the outcome of the arbitrary code across the Smart Chain's decentralized network of nodes.

#### Makeup of a CryptoCondition

<!-- the original stuff here was a little unclear for me when reading -->

A CryptoCondition consists of three parts: 

- <b>Part I: A logical condition that must be met</b>
  - This is stored in the transaction output's `scriptPubKey` 
  - This transaction output will be spent
- <b>Part II: A logical fulfillment</b>
  - This is stored in the `scriptSig` input of the transaction that spends the above output
- <b>Part III: Data in OP_RETURN</b>
  - Data can be included in the opreturn output of any CryptoConditions transaction

<!-- the original content below was difficult to decipher. Specifically, I had a hard time understanding what the differences were between the condition and fulfillment's abilities. -->

The <b>logical condition</b> (Part I) contains instructions and data that check the CryptoCondition. For example, the condition can include a reference to a specific `pubkey` value that must be associated with any attempt to spend this transaction output.

<!-- Note question below.
-->

The <b>logical fulfillment</b> (Part II) contains instructions and data about how the (consensus mechanism?) should evaluate the CryptoCondition. For example, the logical fulfillment could include an instruction to check that any spending-transaction's signature has the correct value and associated `pubkey`.

<!-- In the above, that was the best that I could interpret the original content, but the Part II description seems backwards to me. -->

To fulfill the transaction output, first a node on the network must send a spending-transaction that is an attempt to spend the CryptoCondition transaction output. The consensus mechanism of the Smart Chain uses the (logical fulfillment? C library? All of the above?) aspect of the CryptoCondition to validate this attempted spending-transaction. The result of this validation is checked against the logical condition included in this spending-transaction.

#### The Simplest of CryptoConditions

The simplest CryptoCondition evaluates an electronic signature of a spending-transaction's `scriptsig`. Assuming the evaluation is successful, the spending-transaction is then able to spend funds from the output of another transaction.

At first glance, you may be confused about why a CryptoCondition is useful in this event, as a normal blockchain protocol can already accomplish this task. 

The answer is that there is an important difference in the CryptoCondition implementation. When a CryptoCondition transaction output is spent, the Antara module's code can enforce additional logic.

This key difference illuminates the power of Antara. For example, additional arbitrary code could include a logical condition that any attempted spending-transaction must be signed by at least `M` of `N` acceptable `pubkeys`. When the attempted spending-transaction has a suitable logical fulfillment, the CryptoCondition evaluates to `true`, and the transaction output is spent.

Furthermore, application validation can accomplish this as well. We will examine this possibility further on in the tutorial.

As logical conditions and fulfillments can be added to a CryptoCondition as desired, the developer can build a complex tree of subconditions that govern the movement of Smart Chain assets. In this sense, Antara is an advanced evolution of the basic Bitcoin Script security features of the original Bitcoin protocol (such as `pubkey` or `pubkey hash` scripts). 

In this section, we became acquainted with the concept of logical conditions that are associated with transaction outputs, and logical fulfillments associated with spending-transactions. These two elements make up the rudimentary aspect of a CryptoCondition.

There are yet other elements of an Antara-based CryptoCondition. One element is called the `EVAL` code, and it is stored in the CryptoCondition's inputs and outputs. We will touch on this topic soon. 

## Antara Module Features 

#### Two Layers to Each Module

An Antara module can be described as a combination of a data layer and a business-logic layer in an application. The data layer is the collection of transactions related to the Antara module, and the business-logic layer is the modules arbitrary code.

These two layers tie in with other layers in an Antara-based software application. For example, the software could include a presentation layer, consistenting of a Graphical User Interface (GUI) and other visual/audio elements. 

Also, there can often be a server layer, wherein the application connects nodes and their data across the Internet. This is often the case in Antara-based software applications that make use of the [<b>Oracles</b>](../basic-docs/fluidity/fluidity-api/oracles.html#introduction) Antara module. 

#### A Global CC Address in the Antara Framework

<!-- Who creates/uses/assigns this address? How can we see what it looks like? Where/when is it created? -->

Each Antara module has an associated global CC address. The private key to this global CC address is publicly available. The address can be used for such tasks as sharing funds between users of this module, and anyone can attempt to spend funds from this address. 

In the Antara codebase, this global CC address is sometimes called the "unspendable" address. This is likely a reference to the fact that for any user to spend funds from this address, the spending-transaction must pass the module's validation code. 

<!-- I don't understand the content below? -->

For example, a transaction can send funds to the global CC address so that these funds can be used as a marker. This marker can be found later through a special API function. The module's validation code would capture these funds and prohibit any user from ever spending from the transaction output of these funds, thus making them permanently fixed in the global CC address.

<!-- We've done the "two parts" thing above, need to reorganize. Perhaps this goes earlier? -->

## Antara Development Checklist

Development requirements for each Antara module:

- Allocate a new `EVAL` code for your contract
  - If you would like this module to be available across the Komodo ecosystem, please reach out to our team to let us know your intended `EVAL` code <b>(?)</b>
- Assign a global CC address for the module
- (? Something about normal addresses was in the original material, does the developer need to do anything to facilitate these normal addresses? Or can a user create them automatically?)
- Define the module's transactions
  - This includes the structure of their inputs, outputs, and opreturn format
- Implement the common RPC functions that nearly all modules feature
  - These are typically functions for retrieving a list of all of the module's initial transactions, and for retrieving user addresses and the global CC address
- Implement the module's unique RPC functions
  - These are used to create the module-related transactions and to return relevant information about the module's data and state
- Implement the module's validation code

## Antara Module Architecture

From an architectural standpoint, an Antara module is simply a C/C++ source file.

<!-- The original prose here had a few missing nouns in the sentences, so I'm not sure I understand this yet. Are the RPC's in the source file? Or are they separate? -->

(Diagram of source code layout would go well here.)

<!-- Do we want to show a directory tree here, to show how the files are actually organized in the directory? -->

There are two parts to the module's source file, the implementation of RPC's and the validation code.

_(Three for the EVAL code?)_

#### RPC Implementations

<!-- Specifically how do you include these so that they will automatically be added to komodo-cli ? --> 

The first part of the source file consists of the implementation of all Remote Procedure Calls (RPC's) for this module. These typically either perform transactions or query information about state and data. 

With this section properly added to the source file, the Smart Chain daemon's compiler will automatically make each RPC available at the command line and via `curl` through the `komodo-cli` software.

Essentially all modules have at least these two RPC's.

- XXXXlist
  - This lists all initial transactions relevant to the module
- XXXXinfo
  - This RPC typically also requires an additional input -- a transaction ID for which information is desired
  - When called, the method then returns information about this transaction ID

Include other RPC implementations as desired.

#### Validation Code

The other essential part of an Antara module is the validation code.

This code is triggered anytime a node attempts a spending-transaction that should be added to the module's chain of (CC?) transactions.

A module's validation code is activated only when a transaction has at least one CC input that bears the module's `EVAL` code inside the <b>scriptSig</b> of the (transaction output?).

A module's initial transaction may not have a CC input. When this happens, the validation code is not triggered. Therefore, the transaction may be handled by the normal blockchain protocol.

<!-- Should this information go here? Or towards the end, as an additional aside? Seems too prominent. -->

A small aside here is that if you do need to write code that valdiates a spending-transaction that has no CC input, your code must first validate the initial transaction. If the result of the validation is `false`, then you can ignore the (spending-transaction?). 

<!-- The below paragraph is important. It should probably go higher. -->

The main purpose of validation code is to (?) prevent inappropriate structure and spending of module's spending transaction (?), especially as a means of protecting against malicious spending-transactions. (For example, a malicious actor could attempt to manually create a spending-transaction that bypasses the module's built-in RPC functions.)


We will delve into this section in thorough detail further on in the tutorial

#### The EVAL Code

A unique 8-bit `EVAL` code is attached to each Antara module. The `EVAL` code is used by the core Smart Chain daemon's transaction-validation code to route any relevant transactions to the appropriate module's validation code.

The `EVAL` code itself is actually a simple CryptoCondition. The CryptoCondition tests for the byte value and, if the value is `true`, routes the result according to the core Smart Chain daemon's code. 

### Antara Module Transaction Structure

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; float: right; display: block;">

<img style="border: 10px solid white;" src="/cc-tx-structure-for-guide-v7.png">

</div>

A CryptoCondition input is called a "vin" and a CryptoCondition output is called a "vout".

An Antara transaction (tx) has one or more vins and one or more vouts.

The CC vin of a current transaction contains the transaction id of a previous transaction. The current transaction spends the utxo of the previous transaction. 

Each CC transaction has a vout that describes the requirements that must be met for any future CC transaction to consume the current transaction. 

If the current CC transaction is consuming the vout of a CC transaction (e.g. not a normal transaction), the current CC transaction will have a fulfillment vin that must meet the requirements set forth by the fulfillment vout of the previous CC transaction.

<!-- Could we get examples in here, like elsewhere? -->

A CC transaction typically also has an opreturn vout that contains module data.

#### Antara Module SDK

Komodo is building an SDK for Antara module development. The SDK is still in the early stages. Some of the SDK functions are already available, and can be found in the following source files:

- CCtx.cpp
- CCutils.cc
- cc.cpp
- eval.cpp

We will return to the SDK functions when we discuss the Heir module development process.

<!-- It's possible that most of the above could be put in a separate file, and below for an Heir module file alone. ? -->

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

(See ? Mastering CryptoConditions Chapter 2 for info on adding `EVAL` and global CC addresses?)

<!-- these simply need to be rewritten -->

### Heir Module Transactions

We require three types of module transactions

- an initial transaction with which a user creates the fund for inheritance
- a transaction for additional funding
- a transaction for spending funds by the owner or heir

(?
I'll try to describe these tx structure with the semi-formal notation used in James Lee 'Mastering cryptocondition' book which allows to specify vins or vouts position in a tx and their description.
)

#### The Initial Transaction: Creating a Fund

| Input/Output | Description |
| ------------ | ----------- |
| `vins.*` | <b>Normal input</b> <br> - The `*` notation implies that this can apply to any number of inputs <br> - These vins are typical of core blockchain software and not related to CC |
| `vout.0` (?) | <b>The `1of2` CC address that holds the funds that belong to the owner and, once available, to the heir</b> |
| `vout.1` | <b>The transaction fee to account for the `vout.0` amount above</b> <br> - The amount in `vout.1` is used as a marker. We will discuss markers and their uses cases further on in the tutorial |
| `vout.2` | <b>Normal change</b> <br> - Recall that `change` is the leftover amount from the original utxo that the user does not intend to send to the destination address, and which the user desires to keep <br> - Any amount of leftover funds not included in the `change` utxo is forfeited to the miner of the block; this is how miners receive their mining fee |
| `vout.n-1` | <b>OP_RETURN 'F' ownerpk heirpk inactivitytime heirname</b> <br> - This is the is the opreturn vout, and it contains any data relevant to the module <br> - The 'F' is a flag that indicates that this transaction is a "Funding" CC transaction <br> - `ownerpk` and `heirpk` respectively represent the pubkeys of the owner and heir <br> - Concerning `inactivitytime`, the owner should either make a donation to or spend from the `1of2` address within the `inactivitytime` amount of time to prevent opening the `1of2` address to the heir for spending. <br> - `heirname` is the name of this instance of the Heir module |

Through a funding transaction, the owner of the initial funds creates a "plan," which we can also call a "contract," and deposits funds for future spending. 

The initial funds are taken from the normal `vout` values of a utxo. The initial transaction of this plan can be the beginning of the relationship between the funds in the utxo and the Heir module.

The main funds for the plan are allocated to `vout.0` of our CC transaction. 

By design, and setting aside issues of timing, we desire that either the owner or the inheritor of the funds should be able to spend this utxo. We assume that the owner has one address, and the inheritor has another. To achieve this, we use an advanced CryptoConditions feature that states that either of two addresses can spend the funds. This is called a `1of2` CryptoCondition, and it is placed as a logical condition for (?) `vout.0 (?) or the OP_RETURN? vout.n-1`.

A fee is allocated to `vout.1`. This is used as a marker. The marker allows a developer to use a special SDK function <!-- what function? --> to create a list of all initial transactions for the module. 

As usual, out of the remaining amount of our initial utxo, we need to send all that we desire to keep to our `change` address.

Also, we need to leave an amount as an incentive for the miner. Any remainder beyond the sum total of our new `vout` values will automatically be allocated in this manner. We typically leave `10000` satoshis of our Smart Chain coin, by convention.

Note the `F` letter in the opreturn structure. The `F` stands for "fund." By convention, the first byte of any opreturn is the `EVAL` code. We omitted the `EVAL` code in the description above <!-- why? can we put it in there? -->. The second byte is the transaction functional id.

We also stored other relevant data in the opreturn:

- The owner and inheritor pubkeys
- Inactivity time
  - this is the amount of seconds during which the owner must exhibit activity to maintain sole control over the funds
  - If the owner does not spend funds <!-- or contribute funds, too, right? --> during this time period, the inheritor will gain the ability to spend these funds as well <!-- this should be explained earlier -->
- The descriptive name of this funding plan

#### The Add Coins Transaction

| Input/Output | Description |
| ------------ | ----------- |
| `vins.*` | normal inputs |
| `vout.0` | the funding CC `1of2` address for the owner and heir |
| `vout.1` | normal change |
| `vout.n-1` | OP_RETURN 'A' fundingtxid HasHeirSpendingBegun |

<!-- does the above mean that vout.0 can be either the owner or the heir's address? -->

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
| vout.n-1 | OP_RETURN `C` funding transaction HasHeirSpendingBegun |

This transaction allows either the owner or the heir to spend funds from this plan instance. 

To pay the transaction fee to the miners, the transaction has a normal input that draws from the wallet of the transaction creator. 

The transaction also has a CC input for spending the claimed value from the `1of2` fund address.

As for outputs, the claimed value is sent to the claimer's normal address <!-- What's this about? -->, and unspent `change` is returned to the `1of2` address.

We also indicate the normal `change`.

The functional id, `C`, in the opreturn indicates that this is a "claim" type transaction. 

We also include all the same opreturn data as in the `A` transaction.

<!-- What is in there specifically? The fundtxid, and anything else? -->

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
| amount         | (number)           | The initial funding amount, in coins or tokens <br> - This parameter is considered to be the amount of tokens if the (?) tokenid parameter is present)   |
| name           | (string)           | The name of the heir funding plan (arbitrary)                                                                                                    |
| heirpubkey     | (string)           | The heir's public key (in hexademical)                                                                                                           |
| inactivitytime | (number)           | The time (in seconds) that must pass without the owner executing an `heiradd` or `heirclaim` method, after which the address unlocks to the heir |

#### Adding the Command to the Source File

To add a new command to `komodo-cli` we open the `src/server.cpp` source file add a new element to the `vRPCCommands` array.

```json
    { "heir",       "heirfund",   &heirfund,      true },
```

| Object | Description |
| ------ | ----------- |
| heir | a common name for all heir contract rpc calls |
| heirfund | the name of the new command |
| &heirfund | the address of the rpc interface function |
| true | indicates that the command description will be shown in the help command output; placing `false` here would hide this RPC from the help menu |

#### Add the RPC Function Definition

We add the RPC function definitnion in the `rpc/server.h` source file. 

The declaration in this file is essentially the same across all RPC functions.

```cpp
UniValue heirfund(const UniValue& params, bool fHelp)
```

<!-- We could use some surrounding context above -->

#### The Two Levels of an RPC Implementation

There are two levels to an RPC implementation.

The first level is a short RPC function that has the same name as the RPC command itself (such as `heirfund`).

The body of this level is added to the `rpc/` subdirectory in the source code. <!-- Is this in the `src/` directory? `src/rpc/` ?-->

This function checks the RPC parameters and the needed environment, and then forwards the RPC to the second level. 

Creating a new RPC source file for each Antara module's RPC functions is considered a best practice.

To begin the RPC command, we declare the `heirfund` function and clear the global error object.

```cpp
// heirfund command rpc-level implementation, src/wallet/rpcwallet.cpp
UniValue heirfund(const UniValue& params, bool fHelp)
{
    CCerror.clear(); // clear global error object
```

Recall that a Smart Chain must have the [<b>ac_cc</b>](../basic-docs/smart-chains/smart-chain-setup/smart-chain-customizations.html#ac-cc) and [<b>ac_ccenable</b>](../basic-docs/smart-chains/smart-chain-setup/smart-chain-customizations.html#ac-ccenable) customization parameters properly initiated for any Antara module to function.

Therefore, we check that the wallet and Heir module features are available in the Smart Chain. We also check the RPC parameter's required number:

<!-- Can you please add more inline commentary below? What is the EnsureWalletIsAvailable command? and what is the ensure_CCrequirements command? State what arguments they take, as well.-->

```cpp
    if (!EnsureWalletIsAvailable(fHelp))
        return NullUniValue;
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

The UniValue object is a special type <!-- Is this unique to the Komodo source code? --> used to pass data in RPC calls. For parameters, UniValue requires an array of UniValue objects.

We must convert these UniValue objects into normal C/C++ language types, and then pass them to the second level of our module implementation.

Convert the parameters from the UniValue type to their basic C++ types and add checks to ensure that the converted parameter values are correct.

<!-- 

Sidd: Here, either we need to show these checks, or we can link to your source file for the example, if the content is inconviently long or something.

Original Content:

(what I ommitted in this sample), for example not negative or not exceeding some limit.

-->

Note the method for parsing the hex representation of the pubkey parameter and converting it to a `CPubKey` object.


```cpp
    CAmount amount = atof(params[0].get_str().c_str()) * COIN;  // Note conversion from satoshis to coins through a multiplication of 10E8
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

<!-- there should be a link here to the completed file. -->

#### Second Level Implementation

The second level of the RPC implementation is the transaction creation code. This resides in the `src/heir.cpp` <!-- or src/cc/heir.cpp ? --> source file.

<!-- 

Sidd: does the below mean that we're not showing all the code?

Original content:

Here is the skeleton of the heirfund rpc implementation.

-->

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

<!-- should we label the above "code the inputs" and the below "code the outputs"? -->

#### Outputs

According to our specification, we need two outputs: one for the funding deposit and one for the marker.

Here, we use two CC SDK functions that are designed to create CC vouts.

The first is `MakeCC1of2vout`. This creates a CC vout with a threshold of `2` addresses that can spend from the plan funds. We supply as arguments the two potential addresses, represented here as `myPubkey` and `heirPubkey`.

<!-- Sidd: maybe, for CryptoCondition, we need another name that implies the logic pair. Is there something already like this in technology? --> 

`MakeCC1vout` creates a vout with a simple CryptoCondition which sends a transaction fee to the Heir module global CC address. (This is returned by the `GetUnspendable()` function call below.) We need the global CC address so that we can both mark the transaction, and to find all Heir funding plans. 

You will always need some kind of marker for any instance of an Antara module plan for at least the initial transaction. Otherwise, you might lose the instance's data in the blockchain.

We call this a <b>marker pattern</b> in Antara development, and we will explore this later in the tutorial.

<!-- The below code feels like it needs more description? -->

```cpp
        mtx.vout.push_back( MakeCC1of2vout(EVAL_HEIR, amount, myPubkey, heirPubkey) );
        mtx.vout.push_back( MakeCC1vout(EVAL_HEIR, txfee, GetUnspendable(cp, NULL)) );
```

Finish the creation of the transaction by calling the `FinalizeCCTx` function along with its parameters from the `cp` object, the `mtx` object itself, the owner's pubkey, and the transaction fee amount. 

Note the cast to `uint8_t` for the constants `EVAL_HEIR` and `F` function id. This is important, as it <!--what does "it" refer to in this sentence? I will edit the rest of the sentence when I find out. --> (?) is supposed one-byte size for serialization of these values (otherwise they would be `int`). 

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

Note that we do not need to add the normal change output here because the `FinalizeCCTx` function add the change output for us.

`FinalizeCCTx` also builds the transaction input `scriptSigs` (both normal and CC aspects), adds signatures, and returns a signed transaction in hexadecimal.

Also note the `E_MARSHAL()` function. This serializes variables of various types to a byte array. The byte array is then serialized to a `CScript` object. The object is stored in the `scriptPubKey` transaction field. 

<!-- what about the E_UNMARSHAL function? Can you describe what it does with a little more detail? -->

There is also the mirror `E_UNMARSHAL()` function.

The returned transaction is ready to be sent to the Smart Chain network using the [<b>sendrawtransaction</b>](../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) RPC.

#### Implmenting the heirclaim RPC

As before, this implementation has two levels. The first level checks the required environment and converts the parameters. The second level creates the final transaction. 

##### heirclaim syntax

```bash
./komodo-cli -ac_name=YOURCHAIN heirclaim fundingtxid amount
```

##### Add the RPC to komodo-cli

Add a new command to `komodo-cli` by adding a new element into the `vRPCCommands` array in the source file `src/server.cpp`.

```cpp
    { "heir",       "heirclaim",   &heirclaim,      true },
```

Using the previous section of the tutorial as an example, add an `heirclaim` RPC implementation in the `src/rpc/wallet.cpp` source file.

<!-- No need to re-explain how and what is happening, but let's display the final code below. -->

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

<!-- Sidd: I probably messed up the above. Need to check it over. -->

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

Check whether the inactivity time of the owner has surpassed the amount designated in the plan. The <!-- CCduration ? --> CC SDK function returns the time (in seconds) since the confirmation of the block that bears the provided transaction to the chain-tip block.

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

In the opreturn we add a pair of standard ids: the CC `EVAL` code, the functional id, <!-- which one? Also, can we see this? --> and the `fundingtxid` to serve as the funding plan identifier.

The `hasHeirSpendingBegun` value is a special flag. When this value is changed to `1`, it indicates that the heir has spent funds in the fund at least once. Therefore, it is no longer necessary to check the inactivity time of the owner.

<!-- Above we say `1`, but below we say `true`? I know they are similar, but for consistency's sake, we need to choose one or the other? -->

Once `hasHeirSpendingBegun` is set to `true`, this flag should also be set to `true` in the following transaction OP_RETURN values.

#### Implementations for heiradd, heirlist and heirinfo

- `heiradd` allows a user to add more funding to a plan.
- `heirlist` is a standard RPC for all CC modules. This RPC outputs a list of all initial transaction IDs, which serve as the identifiers for each plan.
- `heirinfo` provides some data about a funding plan 

<!-- The implementation for these RPCs can be found in the github repository with the source code of this contract.  -->

<!-- Let's provide links to each one. -->

#### Simplified Add1of2AddressInputs() Function Implementation

```cpp
// add inputs from cc threshold=2 cryptocondition address to transaction object, src/cc/heir.cpp
int64_t Add1of2AddressInputs(CMutableTransaction &mtx, uint256 fundingtxid, char *coinaddr, int64_t amount, int32_t maxinputs)
{
    int64_t totalinputs = 0L;
    int32_t count = 0;
```
<!-- below: provider = returned ? --> 

By default, the CC SDK function, `SetCCunspents`, fills the provider vector with a list of unspent outputs of the provided `coinaddr` Bitcoin address.

For our Heir module, we pass the `1of2` address where the plan's funds are stored.

```cpp
    std::vector<std::pair<CAddressUnspentKey, CAddressUnspentValue>> unspentOutputs;
    SetCCunspents(unspentOutputs, coinaddr, true);  // get a vector of uxtos for the address in coinaddr[]
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

To add the utxo to the transaction's vins, set the utxo's vout number and transaction id in the transactions vins. 

<!-- paragraph separation may be removed -->

Pass an empty call to the `CScript()` function in the `scriptSig` parameter. This will be filled by the `FinalizeCCtx` function.

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

To calculate the owner-inactivity time and to enable the heir to <!-- claim? or send? --> the funds, we implement the function, `FindLatestOwnerTx()`.

This function iterates through the transactions of the module's funding plan <!-- should this say "plans", i.e. plural ? --> and finds the owner's latest transaction. We pass into this function the initial funding txid of the plan we desire to inspect.

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

Check <!-- Check the transaction rules? Or check (general) transaction rules? --> transaction rules. Return an empty id if the funding transaction cannot not be loaded or is incorrect.

```cpp
    if (!myGetTransaction(fundingtxid, fundingtx, hashBlock) ||  // NOTE: use non-locking version of GetTransaction as we may be called from validation code
        fundingtx.vout.size() == 0 ||    // no vouts, even opreturn
        !GetOpReturnData(fundingtx.vout.back().scriptPubKey, vopret) ||   // could not get opreturn from the last vout
        !E_UNMARSHAL(vopret, ss >> eval; ss >> funcId; ss >> ownerPubkey; ss >> heirPubkey; ss >> inactivityTime; ss >> name;) ||  // could not unmarshal opreturn
        eval != EVAL_HEIR ||   // incorrect eval code in 1st byte 
        funcId != 'F')    // incorrect funcid in the 2nd byte
        return zeroid;
```   

Initialize the CC contract object <!-- `CCcontract_info` or `cp` object? --> for the Heir module's `EVAL` code.

```cpp
    struct CCcontract_info *cp, C;
    cp = CCinit(&C, EVAL_HEIR);
```

Declare the `coinaddr` array and use the `GetCCaddress1of2` function to pass the array the `1of2` address that holds our funds.

```cpp       
    char coinaddr[64];
    GetCCaddress1of2(cp, coinaddr, ownerPubkey, heirPubkey); 
```

<!-- I don't understand the sentence below or the code below. Will need more detail. -->

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

<!-- Do you want to link to the location of these SDK functions in the source code, since we don't have them documented anywhere? -->

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

<!-- Is it important to clarify the level of importance between Validation and RPC implementations? Can rewrite, if needed --> 

Validation provides the logic control of spent Antara-module value, and validation also provides the data added to the Smart Chain. 

Recall that validation code is invoked for a transaction at the time the CC-related value is spent (as opposed to only being invoked at the time the value is added). <!-- I don't understand that previous sentence well enough still. --> We trigger the invokation of this validation function when at least one transaction input is a CC input bearing this module's `EVAL` code.

Validation code typically is not called for the CC module's initial transaction. Instead, we invoke validatation at the time the initial transaction is spent in a second transaction. 

One way to invoke validation for the first transaction when performing the second transaction is to load the initial transaction and validate it first. If the initial transaction turns out to be invalid, it can remain in the chain and is otherwise ignored. <!-- How does this affect the store of value of the customer? Can they lose funds if an initial CC transaction is improperly created? --> In this case, if a CC marker is used, it can be cleared <!-- How specifically? --> and the transaction is removed from the <!-- I changed this from "module instance" to "RPC", hope that's okay --> RPC list output.

#### Guidelines for Validation

In our Heir module prototype, we have three transactions to validate: the initial funding, the transaction that adds more value, and the transaction that claims the funds. The first and second of these transactions do not have any CC vins, and therefore all are validated together with the transaction that claims the funds.

Here are several common aspects of a module that require validation:

- The basic transaction structure
- The basic data structure in the OP_RETURN
  - Validation here ensures data integrity in the chain
  - All OP_RETURNs should contain the `EVAL` code and functional id in the first two bytes 
- Avoid all foreseeable attack vectors
  - Ensure DOS attacks are eliminated, especially in the event of a malformed transaction
  - Check the array size before use of any transaction (?) <!-- the sentence was unclear here -->
- Check the initial transaction for this transaction <!-- not clear what "this transaction" refers to --> by retrieving the txid from the OP_RETURN and loading the initial transaction

#### Heir Module Validations

The following are the aspects of validation the Heir module requires. 

- The funding transaction <!-- This is the same as the "initial" transaction, correct? -->
  - Validate that the `1of2` address accurately matches `pubkeys` in the OP_RETURN
- The spending transaction <!-- This is the same as the "claim" transaction, correct? -->
  - Validate the txid <!-- should ID be plural? --> in the OP_RETURNS and OP_RETURN of the transaction spent (`vintx`) <!-- I've never heard of a vintx? --> which binds the transaction to the contract instance data, so the txids should be equal to the initial txid. <!-- I don't understand this well enough to edit. -->
- Validate whether the heir is allowed to spend the funds
  - Check whether the flag indicates that the Heir is already spending the funds
  - Check whether enough time has passed since the last time the owner was active on the chain
- When validating, separate the owner's funding transaction from any other contributions to the `1of2` address
    - Although the Heir module is initiated based on the owner's initial transaction, nothing prevents other users on the Smart Chain from contributing funds
    - Therefore, when validating, for each utxo contained in the `1of2` address, calculate whether or not the utxo's vins contain the owner's pubkey
- During the course of validation, we fully check opreturn format

To activate the `HeirValidate()` function for the Heir module `EVAL` code <!-- Are we talking about what is happening in the daemon here? -->

<!-- Do we not see in the tutorial what is happening in the below sentence? Can we, if not? Not fully clear. I need to re-read first, probably. -->

(?), we followed JL's 'Mastering Cryptocondition' book instructions while we added a new cc contract to the system's code. (?)

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

<!-- I don't understand the sentence below well enough to edit yet. -->

(?) Common validation rules for all funcid. (?)

Check the basic transaction structure -- does it have the opreturn, with the correct basic `evalcode` and `funcid`

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

<!-- Need help to parse the sentence below. -->

Let's try to decode tx opreturn, fundingtxid is this contract instance id (the initial tx id):

```cpp
    uint8_t evalcode, funcId;
    uint256 fundingtxid; //initialized to null
    uint8_t hasHeirSpendingBegun;
    if (!E_UNMARSHAL(vopret, ss >> evalcode; ss >> funcId; ss >> fundingtxid; ss >> hasHeirSpendingBegun;))
        // return invalid state if unserializing function returned false:
        return eval->Invalid("incorrect opreturn data");
```

Check that the `fundingtxid` is correctly parsed:

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

Both of the following support functions, `CheckSpentTxns` and `CheckInactivityTime`, are in the (? link ?) `heir.cpp` source file.

<!-- Let's at least link to these in a permanently location that is held within the docs center. Likely, we should have permanent downloadable files for this tutorial, so that we don't have to try to keep it in sync with any other development. -->

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

For example, when sending a raw transaction, <!-- does the daemon do this? Need to know what specifically is acting here --> the daemon checks the transaction while adding it to the mempool. 

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

## Links to heir cc contract source code and building instructions

<!-- Move to top -->

A complete working example of this simplified Heir CC module tutorial can be found at the following link.

[Link to Simplified Heir Module](https://github.com/dimxy/komodo/tree/heir-simple)

The source files are found in the following directories.

- src/cc/heir.cpp
- src/cc/CCheir.h
- src/wallet/rpcwallet.cpp
- src/rpc/server.cpp
- src/rpc/server.h

Instructions to build the Komodo binaries, including the necessary CC modules, can be found here:

<!-- Does it actually have the CC library here? Review link, and move this to section for pre-requisite experience. -->

[Link to Instructions for Building from Source]()


#### Terminology

<!-- Move to front and evelop the definitions more. Or, make links for these words that we can reference each time they appear --> 

| Term | Definition |
| ---- | ---------- |
| CryptoCondition, or CC | An encoded expression, coupled with a supporting C library, that allows the Smart Chain's consensus mechanism to check several types of logical conditions based on electronic signatures and hashes |
| Antara module | A collection of customized code that a developer adds into the default daemon to add unique functionality, including customized consensus rules and more |
| CC input | A transaction input, CC encoded. Typically spends value from a CC output |
| CC output | A transaction output, CC encoded |
| normal inputs | Inputs spending value from normal transaction outputs (not CC outputs) |
| normal outputs | Not CC outputs, but normal transaction outputs (pubkey, pubkey hash, etc.) |
| OP_RETURN, opreturn | A special output in a transaction that holds user and module data. The output is prepended by  an OP_RETURN script opcode and therefore spending from this output is impossible |
| plan | An instance of an Antara module data. In other words, this is a collection of all CC transactions related to an initial CC transaction, that is itself one instance of an Antara module |
| tx, txn | Short for "transaction" |
| txid | Transaction id; a hash of a transaction |
| unspendable address | The global cc contract address, for which its public and private key are commonly known. This address is used for conditionally sharing funds between contract users. As the address's private key is not a secret, by default anyone can spend value from this address. However, CC validation code often applies business logic conditions and checks to ensure that only transactions that meet the given criteria are actually able to spend funds in this address |
| vin | An input, or an array of inputs, in a transaction structure (tx.vin) |
| vout | An output, or an array of outputs, in a transaction structure (tx.vout) |

## CC contract patterns

<!-- Perhaps we should include the marker pattern here, and possibly move this earlier in the docs, or something? -->

The following are useful patterns during Antara module development.

#### Baton Pattern

The baton pattern allows the developer to organize a single-linked list in a Smart Chain. 

To traverse a linked list using the baton method, start with the first transaction in any plan instance and iterate through the other transactions to collect properties in their opreturns.

### Marker Pattern

The marker pattern is used to place a mark on all similar transactions. This is accomplished by sending a small value to a common fixed address. Typically, we use the global CC address.

You can also create either a normal marker or a CC marker for <!-- here it says "future finding", and I don't know what that means --> (? see `<!--` comment) the transactions.

When using normal markers, there is a small problem that is easily solved. The global CC address allows any user to spend its funds, and therefore anyone can spend your marker transaction. To overcome this, use the CC SDK function, `Settxids()`, to retrieve all transactions with markers in the CC (?) contract list function. (?)

Another method is to create an unspendable CC marker. In this method, send a small value to a CC output in a known address. To retrieve the list of CC-marker transactions, use the CC SDK function, `SetCCunspents()`. This returns a list of transactions with unspent outputs for the appointed address. <!-- The "appointed address" is the same as the "known address", correct? -->

When using the unspendable CC marker method, in the validation code you should disable spending from this address. <!-- Not sure if I understood here. --> This prevents a scenario where spending from the address causes you to lose markers. (For example, if you were to allow for spending from this address using a burn transaction, the burn transactions would take the burned markers into a hidden state, thus removing the markers from the list of initial transactions.)

In all cases, the CC module validation code should disable unauthorized attempts to spend any markers. 

Concerning the method that relies on the CC marker, if the global CC address is used for storing not only the marker value, but also other funds, you need to ensure that marker values are not spent.

##### Another heading?

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

<!-- What is it specifically? The `CTxOut` or the `MakeCC1of2vouct()` below? -->

For example, the [<b>Payments</b>]() Antara module uses <!-- this function? --> to create a spendable <!-- why spendable? Were we trying to create an unspendable address? --> address as follows.

```cpp
CTxOut MakeCC1of2vout(uint8_t evalcode,CAmount nValue,CPubKey pk1,CPubKey pk2, std::vector<std::vector<unsigned char>>* vData)
```

For the RPC that manages merge functionality, <!-- I couldn't quite tell what this was about? --> we use the `vData` optional parameter to append the opreturn directly to the `ccvout` itself, rather than an actual opreturn as the last `vout` in a transaction. 

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

<!-- Did I get that right above? -->

In validation, we now have a totally diffrent transaction type <!-- I don't understand where this new type came from? -->than the types that are normally available. This new type allows us to have different validation paths for different `ccvouts`, and it allows for multiple `ccvouts` of different types per transaction.

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

<!-- These might belong in a separate document? -->

#### Test Chain Mining Issue

On a test chain consisting of two nodes, we do not recommend that you set both nodes to mine. When there are only two nodes, a blockchain struggles more to achieve consensus, and the chain can quickly stop syncing properly. Instead, have only one node mine for the two-node test chain.

#### Limits on AddNormalInputs() Function Calls per Transaction

Keep the number of `AddNormalInputs()` function calls to one for each block of code that creates a transaction.

As an example of why we should not exceed more than one call, we can look at the `FillSell()` function. This function calls `AddNormalInputs()` two times at once. The first time the `AddNormalInputs()` function must add a txfee and the second time it adds coins to pay for tokens. 

Let us suppose we have only two utxos in our wallet, one for `9,000,000` satoshis and another for `10,000` satoshis. In this case, when we execute the `FillSell()` function our large uxto is added during the first call and then we receive an error in the second call, `filltx not enough utxos`.

<!-- I didn't understand this next part well enough to finish it. -->

(?) Instead, we recommend that the developer place only one I think it is always better to combine these calls into a single call.

#### Troubleshooting Node Syncing on Test CC Chain

Sometimes, a developer may find after developing a new CC module that a node cannot sync with other nodes in their test network. Executing the [<b>getpeerinfo</b>](../basic-docs/smart-chains/smart-chain-api/network.html#getpeerinfo) shows fewer synced blocks than synced heads. The developer may also see errors in the console log on the malfunctioning node.

<!-- Does the above mean that only one node is updated with the new CC module, or in this situation are we assuming that all nodes on the network are operating on the same version of the daemon? -->

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

#### Upcoming Part II of this Tutorial

In the next part of this tutorial, we will extend the functionality of our Heir module to also work with tokens.
