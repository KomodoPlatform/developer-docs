# Advanced Series — Final Conceptual Discussion

Up to this point in the tutorial series we have discussed the general concepts of the Antara Framework and we have discussed initial preparations to build a simplified prototype of the Heir Antara Module.

This section of the tutorial series reviews many of the conceptual aspects of the Antara Framework while also diving more thoroughly into technical details.

This is the final conceptual discussion necessary before we begin writing code.

## Understanding CryptoConditions

According to the industry-wide CryptoConditions standard, a CryptoCondition is a logical expression evaluated on electronic signatures and hashes of transaction data. 

CryptoConditions are stored in the scripts of transactions and are evaluated by a supporting CryptoCondition C library. 

In a Komodo Smart Chain, the default CC library is included during the installation procedure.

<!-- Sidd: Can we get a directory location here regarding the CC library on a default Smart Chain -->

#### Antara Extensions to CryptoConditions

In addition to the industry-standard CryptoCondition (CC) library, Komodo's implementation of CC integrates the ability to add arbitrary code into a Smart Chain's consensus mechanism. This allows developers to create essentially an unlimited number of application-specific transaction-validation rules.

For example, in the Heir Module, if the heir attempts to claim funds, the validation code checks whether the owner of the fund has shown recent activity, according to a specified amount of time. The owner can show activity by either adding to or spending from the fund. If the owner has not shown signs of activity, the validation code allows the heir to claim the funds.

Through CryptoConditions and Antara's extensions, the consensus mechanism can rule over the outcome of the cryptocondition logic and arbitrary validation code across the Smart Chain's decentralized network of nodes.

#### Makeup of a CryptoCondition

A CryptoCondition consists of two parts:

- <b>Part I: A condition that must be met</b>
  - This is stored in the transaction output's `scriptPubKey`
- <b>Part II: A fulfillment</b>
  - This is stored in the `scriptSig` field of the input of the transaction that spends the above output


The <b>condition</b> (Part I) contains data that checks the CryptoCondition in "fingeprinted" form. 

The term, "fingerprinted," comes from the industry-wide standard CC library. To fingerprint data, the CC library acquires the target data, combines it with other data that the developer does not need to manage, and then creates a hash, or "fingerprint."

For example, a condition can be a requirement that only a specific fingerprinted `pubkey` be allowed to spend this transaction output.

The <b>fulfillment</b> (Part II) contains instructions and data about how the consensus mechanism should evaluate the CryptoCondition. For example, the fulfillment could include an instruction to check a spending-transaction's electronic signature as well as the the `pubkey` associated with this signature.

To spend a CC output of a transaction, a node on the network sends a spending transaction that contains a CC input that fulfills the CC output's condition. The consensus mechanism of the Smart Chain checks that the fulfillment is correct. For this it uses the C CryptoCondition library to evaluate the fulfillment of the spending transaction. The result of this evaluation is checked against the condition stored in the previous transaction output.


For our example above of an electronic signature, the consensus mechanism runs the logical conditions and fulfillments of the CryptoCondition to verify the electronic signature with the provided pubkey. Then the validation logic calculates the fingerprint of the pubkey and checks it against the condition.

In adding Cryptoconditions to the Antara framework, Komodo extended the original CC protocol by adding an additional aspect beyond the inputs and outputs. This additional part is called the <b>EVAL</b> CryptoCondition, or eval code.

Each Antara Module has its own unique eval code. The eval code is a number between 0 and 255, and it identifies the specific Antara Module that is associated with a CC transaction. When the consensus validation logic encounters the Antara Module's eval code in a transaction input, the validation logic calls the module's validation function.

The process of validation of an Antara Module's transaction is depicted on the diagram below:

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; float: right; display: block;">

<img style="border: 1rem solid white; margin: 1rem 0rem 1rem 0rem;" src="/cc-verify-work-v2.3.png">

</div>

#### The Simplest form of a CryptoCondition

The simplest CryptoCondition evaluates an electronic signature of a spending-transaction's `scriptsig`. Assuming the evaluation is successful, the spending-transaction is then able to spend funds from the output of another transaction.

At first glance, you may be confused about why a CryptoCondition is useful in this event, as a normal blockchain protocol can already accomplish this task.

The answer is that there is an important difference in the CryptoCondition implementation. When a CryptoCondition transaction output is spent, the Antara Module's code can enforce additional validation logic. This is accomplished via the eval code that is stored as a part of the CryptoCondition's inputs and outputs. We will describe this further in the Heir Module development section.

The ability to enforce additional logic is the key difference that illuminates the power of Antara. For example, additional arbitrary validation code can include logic that allows a user to spend the output only at the appropriate time. The transaction output can be spent only via a spending transaction that has the matching fulfillment, and both the CryptoCondition and the Antara Module validation code evaluate to `true`.

Even the basic CryptoCondition features offer more complex logical expressions than a normal Bitcoin Script. For example, with CC a spending transaction could be required to have signatures from at least `M` of `N` acceptable `pubkeys`.

As logical conditions and subconditions can be added to a CryptoCondition as desired, the developer can utilize both the CryptoConditions features and customized module's validation code to build complex logic that governs the movement of Smart Chain assets. In this sense, Antara is an advanced evolution of the basic Bitcoin Script security features, such as pubkey or pubkey hash scripts. We will examine validation code in greater detail later in this tutorial.

In this section, we became acquainted with the concept of logical conditions that are associated with transaction outputs, and logical fulfillments associated with spending-transactions. These two elements make up the rudimentary aspect of a CryptoCondition.

There are yet other elements of an Antara-based CryptoCondition. One element is called the `EVAL` code, and it is stored in the CryptoCondition's inputs and outputs. We will touch on this topic soon.

#### Antara Module as Data and Business Logic Layer of Business Application

An Antara Module can be described as a combination of a data layer and a business-logic layer in an application. The data layer is the collection of transactions related to the Antara Module, and the business-logic layer is the module's arbitrary code.

These two layers tie in with other layers in an Antara-based software application. For example, the software external to the blockchain could include a presentation layer, consisting of a Graphical User Interface (GUI) and other visual elements. External applications interact with an Antara Module via its RPC calls.

Also, there can often be an additional oracle layer, wherein oracle software connects nodes to external data sources across the Internet. This can be the case in Antara-based software applications that make use of the [<b>Oracles</b>](../basic-docs/fluidity/fluidity-api/oracles.html#introduction) Antara Module.

#### A Global CC Address in the Antara Framework

Recall that each Antara Module has an associated global CC address. The private key to this global CC address is publicly available. The address can be used for such tasks as sharing funds between users of this module, and anyone can attempt to spend funds from this address.

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
| HeirNormaladdr | The normal address for the same pubkey and privkey. Spending from this address does not validation by the Antara Module |

In the Antara codebase, the global CC address is sometimes called the "unspendable" address. This is likely a reference to the fact that for any user to spend funds from this address, the spending transaction must pass the module's validation code.

For example, the global CC address could store funds shared between several users. As a global CC address's privkey is publicly available, anyone might try to spend these funds. This is where the Antara validation code will exercise control over whom is allowed to spend funds, and by which rules. The RPC aspect of the Antara Module must prevent the creation of inappropriate transactions as well.

A transaction can also send a nominal fee to the global CC address with the intention of turning this transaction's output into a search key (called a marker). To ensure these markers remain publicly visible forever, the module's validation code can disable spending for these markers. With this combination, the developer can use the `SetCCunspents` SDK function to enumerate all transactions in the global CC address, and thus discover the module's transaction history.

## Antara Development Checklist

Development requirements for each Antara Module:

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

From an architectural standpoint, an Antara Module is simply a C/C++ source file.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; float: right; display: block;">

<img src="/CC-Antara-arch-v2.3.png" style="border: 0.5rem solid white; margin: 1rem 0rem 1rem 0rem;" >

</div>

There are two parts to the module's source file: the implementation of RPC's and the validation code. You also need to inform the basic komodod source code of your new Antara Module through the following steps.

- Allocate a new eval code for your Antara Module in `src/cc/eval.h`
- add your module's global addresses and the validation code entry function into the registry of Antara Modules in `src/cc/CCcustom.cpp`

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

The main purpose of Antara Module validation code is two-fold. First, it ensures that the structure of the sequence of an Antara Module related transactions and their data is accurate. Second, the validation code prevents inappropriate Antara-related transactions from entering the chain. In other words, module validation code should protect against malicious transactions, and this is the code's most important task.

Antara Module Validation code is triggered anytime a node attempts to add a CC spending-transaction to the chain.

A module's validation code is activated only when a transaction has at least one CC input that bears the module's `EVAL` code inside the <b>scriptSig</b> in the transaction.

A module's initial transaction may not have a CC input. When this happens, the validation code is not triggered. Therefore, the transaction may be handled by the normal blockchain protocol.

As an aside, when the developer needs to write code that validates a spending transaction that spends a utxo that has no CC inputs, the code must first validate the utxo as well. If the result of the validation of the utxo is `false`, then the code can also reject the spending transaction. We will delve into this topic in thorough detail further in the tutorial.

#### The EVAL Code

A unique 8-bit `EVAL` code is attached to each Antara Module. The `EVAL` code is used by the core Smart Chain daemon's transaction-validation code to route any relevant transactions to the appropriate module's validation code.

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

Komodo is building an SDK for Antara Module development. The SDK is still in the early stages. Some of the SDK functions are already available, and can be found in the following source files:

- CCtx.cpp
- CCutils.cpp
- cc.cpp
- eval.cpp

We will return to the SDK functions when we discuss the Heir module development process.

-----------------

[<b>Link to Next Tutorial in Advanced Series</b>](../../../basic-docs/antara/antara-tutorials/advanced-series-5.html)
