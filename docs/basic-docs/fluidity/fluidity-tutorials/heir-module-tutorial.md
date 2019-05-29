# Heir Module Tutorial

This tutorial demonstrates for advanced C/C++ developers the path and methods for developing a new Antara module by building a prototype of the existing [<b>Heir Module</b>](../basic-docs/fluidity/fluidity-api/heir.html). 

#### Tutorial Objectives

The primary aim is to give the Antara module developer direct engagement with validation code in a Antara environment. By understanding validation, the developer should be more able to grasp the broad potential of the Antara framework.

Furthermore, in the process of completing this tutorial the developer will learn how the Antara code directories are organized.

## Prerequisite Knowledge

Tutorial readers should have the following prerequisite experience. We provide links to relevant resources where available.

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

### (temporary section) WIP Link from @dimxy

https://github.com/dimxy/komodo/wiki/Developing-my-first-cryptocondition-contract-Heir

https://github.com/dimxy/doc-dev/blob/master/first-cc-heir.md

## A Conceptual Understanding of the Intended Product

Read the introduction of the finished Heir Module API to gain a vision of what we are about to create. (Read until the start of the section named <b>Heir Module Flow</b> and then pause.)

[Link to Introduction to the Heir Antara Module](../basic-docs/fluidity/fluidity-api/heir.html#introduction)

The basic concept to understand is that the Heir module allows the owner of a Smart Chain digital asset to designate an inheritor of the asset, should the owner become inactive on the chain.

In terms of design, this is a relatively straightforward Antara module, which is one reason why we use it here.

## Complete the Heir Module Flow Section

To understand specifically how the final Heir module functions, we use the [<b>komodo-cli</b>](../basic-docs/smart-chains/smart-chain-setup/interacting-with-smart-chains.html#using-komodo-cli) software and the <b>RICK</b> Smart Chain to experiment with each Heir API command.

#### Launch the RICK Smart Chain

```bash
./komodod -pubkey=$pubkey -ac_name=RICK -ac_supply=90000000000 -ac_reward=100000000 -ac_cc=3 -addnode=138.201.136.145 &
```

#### Create a pubkey

Use the following guide to create a Antara pubkey and address on the <b>RICK</b> Smart Chain.

[Link to Antara pubkey creation guide](../basic-docs/fluidity/fluidity-setup/fluidity-instructions.html#creating-and-launching-with-a-pubkey)

#### Retrieve RICK Funds from the Community Faucet

To obtain funds on the RICK Smart Chain, we utilize a different Antara module, [<b>Faucet</b>](../basic-docs/fluidity/fluidity-api/faucet.html#introduction). Our encounter with Faucet also presents an educational opportunity, which will discuss in a moment.

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

With funds in your wallet, you are prepared to experiment with the API commands available in the Heir Module Flow section. This may help you to envision the intended design of our Heir module prototype.

[Link to Heir Module Flow](../basic-docs/fluidity/fluidity-api/heir.html#introduction)

#### On the Relevance of Faucet

The Faucet module provides a simple example of the nature of a Antara module for our study. Faucet allows a user to lock an arbitrary amount of funds within a Antara address. Other users on the network are able to withdraw funds from this Antara address in small portions. To prevent spam requests, the Faucet requires a small amount of work from the requesting user's node. 

From this outline, we observe the basic business logic of the Faucet module. The module involves storing funds in a designated address, the creation of a faucet that can disburse funds, and the ability to limit the rate at which funds are withdrawn.

Compare this to our desired Heir module. The Heir module's business logic must allow a designated address the ability to inherit designated blockchain funds.

In both cases, the module's business logic is bound to transactions. 

#### Transactions as a Data Source

Transactions are a data source for Antara-based software. 

Transactions can store data in multiple forms. In the simplest form, transaction data records the movement of coins from one address to another. However, blockchain transactions are capable of storing additional data beyond simple coin movement. 

When we desire to place additional data into a transaction, we place this data into an <b>OP_RETURN</b>.

Observe the following transaction data structure:

##### Transaction Data Structure

```bash
# (Place an example OP_RETURN transaction here)
```

The <b>OP_RETURN</b> is the last output in a transaction, and this output is never spendable under any circumstances. 

```bash
# (focus on OP_RETURN here)
```

The <b>OP_RETURN</b> is the location where all Antara module information is stored. 

When a Antara module instance begins its lifecycle, an initial transaction is created. For example, observe this initial transaction of the (Faucet module?):

##### Initial Transaction of a Faucet Module Instance

```bash
# Insert example of initial Antara module transaction with OP_RETURN data here
```

**An initial cc contract transaction usually sends value from normal inputs to cc outputs.**

As time progresses, more transactions on the Smart Chain are performed under this module. Each of the module's transactions spends from the previous transaction outputs associated with the module and creates new unspent transactions. This process effectively creates a [linked-list data structure.](https://en.wikipedia.org/wiki/Linked_list)

```bash
# Place an example of the second transaction of a Faucet module here, and maybe provide notes showing how this transaction is tied to the initial transaction above
```

With each transaction, the <b>OP_RETURN</b> data is never spent, and remains in the blockchain database for future recall.

#### Understanding CryptoConditions

Another important concept to understand is the nature of a <b>Crypto-Condition</b>. This technology is part of [an industry-wide standard](https://tools.ietf.org/html/draft-thomas-crypto-conditions-01), and other platforms may use Crypto-Conditions differently.

Komodo has implemented our own unique version of Crypto-Conditions as a part of the Antara framework. Here, a Crypto-Condition is a logical expression. The expression is executed by electronic signatures and by the hashes of spent transactions. 

The logical expressions of a Crypto-Condition are stored in the scripts of transactions, and also in a supporting C library. The library is included during the installation procedure of the associated Smart Chain, and the library evaluates and checks the logical expressions that are stored in the transaction scripts. 

#### The Importance of Crypto-Conditions

Crypto-Conditions allow a developer to build and evaluate complex logical expressions that are based on the results of cryptographic functions.

This is a key aspect of Antara's ability to allow the developer to add arbitrary code into their Smart Chain's consensus mechanism. Through Crypto-Conditions and other elements, the consensus mechanism can rule over the outcome of the arbitrary code across the Smart Chain's decentralized network of nodes.

#### Makeup of a Crypto-Condition

<!-- the original stuff here was a little unclear for me when reading -->

A Crypto-Condition consists of three parts: 

- <b>Part I: A logical condition that must be met</b>
  - This is stored in the transaction output's `scriptPubKey` 
  - This transaction output will be spent
- <b>Part II: A logical fulfillment</b>
  - This is stored in the `scriptSig` input of the transaction that spends the above output
- <b>Part III: Data in OP_RETURN</b>
  - (?)Data can be included in the OP_RETURN output of any Crypto-Conditions transaction
-
<!-- the original content below was difficult to decipher. Specifically, I had a hard time understanding what the differences were between the condition and fulfillment's abilities. -->

The <b>logical condition</b> (Part I) contains instructions and data that check the Crypto-Condition. For example, the condition can include a reference to a specific `pubkey` value that must be associated with any attempt to spend this transaction output.

The <b>logical fulfillment</b> (Part II) contains instructions and data about how the (consensus mechanism?) should evaluate the Crypto-Condition. For example, the logical fulfillment could include an instruction to check that any spending-transaction's signature has the correct value and associated `pubkey`.

<!-- In the above, that was the best that I could interpret the original content, but the Part II description seems backwards to me. -->

To fulfill the transaction output, first a node on the network must send a spending-transaction that is an attempt to spend the Crypto-Condition transaction output. The consensus mechanism of the Smart Chain uses the (logical fulfillment? C library? All of the above?) aspect of the Crypto-Condition to validate that this attempted spending-transaction meets all requirements. The result of this validation is checked against the logical condition included in this spending-transaction.

#### The Simplest of Crypto-Conditions

The simplest Crypto-Condition evaluates an electronic signature of a spending-transaction's `scriptsig`. Assuming the evaluation is successful, the spending-transaction is then able to spend funds from the output of another transaction.

At first glance, you may be confused about why a Crypto-Condition is useful in this event, as a normal blockchain protocol can already accomplish this task. 

The answer is that there is an important difference in the Crypto-Condition implementation. When a Crypto-Condition transaction output is spent, the Antara module's code can enforce additional logic.

This key difference illuminates the power of Crypto-Conditions, and of Antara. For example, additional arbitrary code could include a logical condition that any attempted spending-transaction must be signed by at least `M` of `N` acceptable `pubkeys`. When the attempted spending-transaction has a suitable logical fulfillment, the Crypto-Condition evaluates to `true`, and the transaction output is spent.

Furthermore, application validation can accomplish this as well. We will examine this possibility further on in the tutorial.

As logical conditions and fulfillments can be added to a Crypto-Condition as desired, the developer can build a complex tree of subconditions that govern the movement of Smart Chain assets. In this sense, Antara is an advanced evolution of the basic Bitcoin Script security features of the original Bitcoin protocol (such as `pubkey` or `pubkey hash` scripts). 

In this section, we have become acquainted with the concept of logical conditions that are associated with transaction outputs, and logical fulfillments associated with spending-transactions. These two elements make up the rudimentary aspect of a Crypto-Condition.

There are yet other elements of a Antara-based Crypto-Condition. One element is called the `EVAL` code, and it is stored in the Crypto-Condition's inputs and outputs. We will touch on this topic soon. 

### Antara Module Features 

A Antara module can be described as a combination of a data layer and a business-logic layer in an application. The data layer is the collection of transactions related to the Antara module, and the business-logic layer is the modules arbitrary code.

These two layers tie in with other layers in a Antara-based software application. For example, the software could include a presentation layer, consistenting of a Graphical User Interface (GUI) and other visual/audio elements. 

Also, there can often be a server layer, wherein the application connects nodes and their data across the Internet. This is often the case in Antara-based software applications that make use of the [<b>Oracles</b>](../basic-docs/fluidity/fluidity-api/oracles.html#introduction) Antara module. 

*

#### A Global Address in the Antara Framework

<!-- Who creates/uses/assigns this address? How can we see what it looks like? Where/when is it created? -->

Each Antara module has an associated global address. The private key to this global address is publicly available. The address can be used for such tasks as sharing funds between users of this module, and anyone can attempt to spend funds from this address. 

In the Antara codebase, this global address is sometimes called the "unspendable" address. This is likely a reference to the fact that for any user to spend funds from this address, the spending-transaction must pass the module's validation code. 

<!-- I don't understand the content below? -->

For example, a transaction can send funds to the global address so that these funds can later be used as a marker. This marker can be found later through a special API function. The module's validation code would capture these funds and prohibit any user from ever spending from the transaction output of these funds, thus making them permanently fixed in the global address.

<!-- We've done the "two parts" thing above, need to reorganize. Perhaps this goes earlier? -->

There are two parts to the module's code. 

The first is a set of Remote Procedure Call (RPC) functions. These are used to create transactions that are associated with the module. 

The second is the validation code that is triggered anytime a node attempts a spending-transaction that should be added to the module's chain of transactions.

A module's validation code is activated only when a transaction has at least one Antara input that bears the module's <b>EVAL</b> code inside the <b>scriptSig</b> of the (transaction output?).

A module's initial transaction may not have a (do I need to use "CC" or "Antara" here?) input. When this happens, the validation code is not triggered. Therefore, the transaction may be handled by the normal blockchain protocol.

<!-- Should this information go here? Or towards the end, as an additional aside? Seems too prominent. -->

A small aside here is that if you do need to write code that valdiates a spending-transaction that has no (module/Antara?) input, your code must first validate the initial transaction. If the result of the validation is `false`, then you can ignore the (spending-transaction?). 

<!-- The below paragraph is important. It should probably go higher. -->

The main purpose of validation code is to prevent inappropriate structure and spending of module's spending transaction, especially as a means of protecting against malicious spending-transactions. (For example, a malicious actor could attempt to manually create a spending-transaction that bypasses the module's built-in RPC functions.)

<!-- This should probably go higher as well. -->

For a Antara module, you will need to do the following:
- allocate a new `EVAL` code for your contract
  - If you would like this module to be available across the Komodo ecosystem, please reach out to our team to let us know your intended `EVAL` code <b>(?)</b>
- assign a global address for the module
- (? Something about normal addresses was in the original material, does the developer need to do anything to facilitate these normal addresses? Or can a user create them automatically?)
- define the modules' transactions
  - this includes the structure of their inputs, outputs, and OP_RETURN format
- implement the common RPC functions that nearly all modules feature
  - these are typically functions for retrieving a list of all of the module's initial transactions, and for retrieving user addresses and the global Antara address
- implement the module's unique RPC functions
  - these are used to create the module-related transactions, and to return relevant information about the module's data and state
- implement the module's validation code

### Antara Module Architecture

From an architectural standpoint, a Antara module is simply a C/C++ source file.

<!-- The original prose here had a few missing nouns in the sentences, so I'm not sure I understand this yet. Are the RPC's in the source file? Or are they separate? -->

There are two parts to the module's source file, the implementation of RPC's and the validation code.

_(Three for the EVAL code?)_
<!-- Do we want to show a directory tree here, to show how the files are actually organized in the directory? -->

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

The other essential part of a Antara module is the validation code. We will delve into this section in thorough detail further on in the tutorial

#### The EVAL Code

A unique 8-bit `EVAL` code is attached to each Antara module. The `EVAL` code is used by the core Smart Chain daemon's transaction-validation code to route any relevant transactions to the appropriate module's validation code.

The `EVAL` code itself is actually a simple Crypto-Condition. The Crypto-Condition tests for the byte value and, if the value is `true`, routes the result according to the core Smart Chain daemon's code. 

### Antara Module Transaction Structure

Observe the following structural layout of a Antara module transaction.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; float: right; display: block;">

<img style="border: 10px solid white;" src="/cc-tx-structure-for-guide-v7.png">

</div>

A Crypto-Condition input is called a "vin" and a Crypto-Condition output is called a "vout". 

As displayed on the above diagram, a Antara transaction has one or more vins and one or more vouts.

A vin with Crypto-Conditions contains the transaction ID (txid) of a previous transaction. In this transaction, the utxo of that txid is spent. The Crypto-Conditions transaction also includes a fulfillment vin. 

The previous Crypto-conditions transaction has a vout that describes the requirements for the fulfillment vin. As the consensus mechanism of the Smart Chain attempts to add the current Crypto-Conditions transaction to the blockchain, if the fulfillment successfully matches the vout conditions of the last transaction, the consensus mechansim will approve the current transaction. 

<! -- the above is too repetitive and can be paired down, and reorganized. -->

The current transaction also has an OP_RETURN vout that contains module data.

<!-- the above section should probably go earlier -->

#### Antara Module SDK

Komodo is building an SDK for Antara module development. The SDK is still in the early stages. Some of the SDK functions are already available, and can be found in the following source files:

- CCtx.cpp
- CCutils.cc
- cc.cpp
- eval.cpp

We will return to the SDK functions later, when we discuss the Heir module development process.

## Heir Module Development 

Having finished an overview of the Antara development layout, we are now prepared to create a simplified prototype of the [Heir module](../basic-docs/fluidity/fluidity-api/heir.html#introduction). 

Our tasks are the following:

- Add a new `EVAL` code to represent this module
- Create a global address
- Define the Heir module transactions
  - vouts, or logical conditions
  - vins, or logical fulfillments
- Implement the RPC interface
- Create the validation code

(See ? Mastering CryptoConditions for info on adding `EVAL` and global addresses?)

<!-- I think we should include them here, unless they are super complicated? Need to have this organized -->

### Heir Module Transactions

We require three types of module transactions

- an initial transaction with which a user creates the fund for inheritance
- a transaction for additional funding
- a transaction for spending funds by the owner or heir

(?
I'll try to describe these tx structure with the semi-formal notation used in James Lee 'Mastering cryptocondition' book which allows to specify vins or vouts position in a tx and their description.
)

#### The Initial Transaction: Creating a Fund

- `vins.*` - normal inputs
- `vout.0` (?) - the funding CC 1 of 2 address for the owner and the heir
- `vout.1` - the transaction fee for CC address
  - this is used as a marker <!-- We probably need to explain the marker terminology sooner -->
- `vout.2` - normal change
  - recall that `change` is the leftover amount from the original utxo that the user does not intend to spend
  - any amount leftover not included here is forfeited to the miner of the block; this is how miners receive their mining fee
- `vout.n-1` - OP_RETURN `F` ownerpk heirpk inactivitytime heirname

Here is some explanation of the used notation:

- `vins.*`: any number of inputs
- `normal`: vins and vouts that are typical of the core blockchain software; not related to CC
- 'vout.0' an output with an index of `0`
- 'vout.n-1' the last vout in the list
  - this is typically the OP_RETURN vout, and contains the module's relevant data

Through a funding transaction, the owner of the initial funds creates a "plan," which we can also call a "contract," and deposits funds for future spending. 

The initial funds are taken from the normal `vout` values of a utxo. The initial transaction of this plan can be the beginning of the relationship between the funds in the utxo and the Heir module.

The main funds for the plan are allocated to `vout.0` of our Heir module transaction. 

<!-- Note after discussion with James:

The acronym `CC` appears frequently in the Antara source code. The specific letters, `CC`, arose organically during the development process and no longer have any special meaning. `CC` now only serves as an indicator that the associated object in the source code is associated with Antara-specific functionality, and nothing more. -->

By design, and setting aside issues of timing, we desire that either the owner or the inheritor of the funds should be able to spend this utxo. We assume that the owner has one address, and the inheritor has another. To achieve this, we use an advanced Crypto-Conditions feature that states that either of two addresses can spend the funds. This is called a `1of2` Crypto-Condition, and it is placed as a logical condition for `vout.0 (?) or the OP_RETURN? vout.n-1`.

A fee is allocated to `vout.1`. This is used as a marker. The marker allows a developer to use a special SDK function to create a list of all module initial transactions. 

As usual, out of the remaining amount of our initial utxo, we need to send all that we desire to keep to our `change` address.

Also, we need to leave an amount as an incentive for the miner. Any remainder beyond the sum total of our new `vout` values will automatically be allocated in this manner. We typically leave `10000` satoshis of our Smart Chain coin, by convention.

Note the `F` letter in the OP_RETURN structure. The `F` stands for "fund." By convention, the first byte of any OP_RETURN is the `EVAL` code. We omitted the `EVAL` code in the description above <!-- why? -->. The second byte is the transaction functional id.

We also stored other relevant data in OP_RETURN:

- the owner and inheritor pubkeys
- inactivity time
  - this is the amount of seconds during which the owner must exhibit activity to maintain sole control over the funds
  - if the owner does not spend funds during this time period, the inheritor will gain the ability to spend these funds as well <!-- this should be explained earlier -->
- the descriptive name of this funding plan
  - we can also call this a "contract instance"

#### The Add Coins Transaction

- `vins.*` - normal inputs
- `vout.0` - funding CC `1of2` addr for the owner and heir
<!-- does the above mean that vout.0 can be either the owner or the heir's address? -->
- `vout.1` - normal change
- `vout.n-1` - OP_RETURN `A` fundingtxid HasHeirSpendingBegun

This transaction serves the purpose of adding more funds to the owner's address. on the vout with 1of2 cryptocondition from normal coin inputs.

<!-- can shorten transaction ID to txid, but needs to be explained earlier -->

We include the `txid` of the initial transaction in the OP_RETURN to bind this add transaction to this Heir module instance.

Note the functional ID, `A`. The ID marks this transaction as an `add` type of funding transaction.

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

The functional ID, `C`, in the OP_RETURN indicates that this is a "claim" type transaction. 

We also include all the same OP_RETURN data as in the `A` transaction.

<!-- What is in there specifically? The fundtxid, and anything else? -->

#### Heir Module RPC implementation

#### heirfund

For a user to call the `heirfund` RPC, the user will need to supply the name of the RPC and its parameters as arguments.

We model the syntax as follows:

```bash
./komodo-cli -ac_name=YOURCHAIN heirfund amount name heirpubkey inactivitytime
```

##### Table: Descriptions of the heirfund Syntax

| Argument | Type | Description |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| amount         | (number)           | the initial funding amount, in coins or tokens (this parameter is considered to be the amount of tokens if the (tokenid) parameter is present)   |
| name           | (string)           | the name of the heir funding plan (arbitrary)                                                                                                    |
| heirpubkey     | (string)           | the heir's public key (in hexademical)                                                                                                           |
| inactivitytime | (number)           | the time (in seconds) that must pass without the owner executing an `heiradd` or `heirclaim` method, after which the address unlocks to the heir |

#### Adding the Command to the Source File

To add a new command to `komodo-cli` we open the `src/server.cpp` source file add a new element to the `vRPCCommands` array.

```json
    { "heir",       "heirfund",   &heirfund,      true },
```

| Object | Description |
| ------ | ----------- |
| heir | a common name for all heir contract rpc calls |
| heirfund | the name of the new command |
| &heirfund | the address of rpc interface function |
| true | indicates that the command description will be shown in the help command output; placing `false` here would hide this RPC from the help menu |

#### Add RPC Function Definition

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

The parameters passed to the `AddNormalinputs()` function are the transaction itself, the user's pubkey, the total value for the funding amount, the marker and the miner fees, and the limit on the quantity of utxos the daemon can take from the wallet of the user. (Natuarlly, only utxos that are available via the user's wallet's private can be used for these inputs.)

<!-- should we label the above "code the inputs" and the below "code the outputs"? -->

#### Outputs

According to our specification, we need two outputs: one for the funding deposit, and one for the marker.

Here, we use two CC SDK functions that are designed to create CC vouts.

The first is `MakeCC1of2vout`. This creates a CC vout with a threshold of `2` addresses that can spend from the plan funds. We supply as arguments the two potential addresses, represented here as `myPubkey` and `heirPubkey`.

<!-- Sidd: maybe, for Crypto-Condition, we need another name that implies the logic pair. Is there something already like this in technology? --> 

`MakeCC1vout` creates a vout with a simple Crypto-Condition which sends a transaction fee to the Heir module global address. (This is returned by the `GetUnspendable()` function call below.) We need the global address so that we can both mark the transaction, and to find all Heir funding plans. 

You will always need some kind of marker for any Antara module instance for at least the initial transaction. Otherwise, you might lose the instance's data in the blockchain.

We call this a <b>marker pattern</b> in Antara development, and we will explore this later in the tutorial.

```cpp
        mtx.vout.push_back( MakeCC1of2vout(EVAL_HEIR, amount, myPubkey, heirPubkey) );
        mtx.vout.push_back( MakeCC1vout(EVAL_HEIR, txfee, GetUnspendable(cp, NULL)) );
```

Finish the creation of the transaction by calling the `FinalizeCCTx` function along with its parameters from the `cp` object, the `mtx` object itself, the owner's pubkey, and the transaction fee amount. 

Note the cast to `uint8_t` for the constants `EVAL_HEIR` and `F` function id. This is important, as it <!--what does "it" refer to in this sentence? I will edit the rest of the sentence when I find out. --> is supposed one-byte size for serialization of these values (otherwise they would be `int`). 

Also, an OP_RETURN object with the data from this module instance is passed. To create the OP_RETURN object, serialize the needed ids and variables to a `CScript` object.

```cpp
        std::string rawhextx = FinalizeCCTx(0, cp, mtx, myPubkey, txfee,
            CScript() << OP_RETURN << (uint8_t)EVAL_HEIR << (uint8_t)'F' << myPubkey << heirPubkey << inactivityTimeSec << heirName));
        return rawhextx;
    }
```

In case the `AddNormalinputs` function cannot find sufficient owner coins for the requested amount (including the transaction fee), we set the `CCerror` error object.

```cpp
    CCerror = "not enough coins for requested amount and txfee";
    return std::string("");
}
```

Note that we do not need to add the normal change output here because the `FinalizeCCTx` function add the change output for us.

`FinalizeCCTx` also builds the transaction input `scriptSigs` (both the normal and the Crypto-Condition <!-- instances? -->), adds signatures, and returns a signed transaction in hexadecimal.

Also note the `E_MARSHAL` function. This serializes variables of various types to a byte array. The byte array is then serialized to `CScript` object. The object is stored in the `scriptPubKey` transaction field. 

<!-- what about the E_UNMARSHAL function? Can you describe what it does with a little more detail? -->

There is also the mirror `E_UNMARSHAL` function.

The returned transaction is ready to be sent to the Smart Chain network using the [<b>sendrawtransaction</b>](../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) RPC.

#### Implmenting the heirclaim RPC

As before, this implementation has two levels. The first level checks the required environment and converts the parameters. The second level creates creates the final transaction. 

##### heirclaim syntax

```bash
./komodo-cli -ac_name=YOURCHAIN heirclaim fundingtxid amount
```

##### Add the RPCto komodo-cli

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

Find the most recent owner transaction to calculate the owner's inactivity time. The helper function, `FindLatestOwnerTx`, returns the lastest transaction id, the `owner` and `heir` public keys, `inactivity time setting` value, and the `hasHeirSpendingBegun` flag value.

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

Get the address of the `1of2` threshold Crypto-Condition output (where the funds were deposited). Add CC inputs for the requested amount.

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

In the OP_RETURN we add a pair of standard ids: the CC `EVAL` code, the functional id, <!-- which one? Also, can we see this? --> and the `fundingtxid` to serve as the funding plan identifier.

The `hasHeirSpendingBegun` value is a special flag. When this value is changed to `1`, it indicates that the heir has spent funds in the fund at least once. Therefore, it is no longer necessary to check the inactivity time of the owner.

<!-- Above we say `1`, but below we say `true`? I know they are similar, but for consistency's sake, we need to choose one or the other? -->

Once `hasHeirSpendingBegun` is set to `true`, this flag should also be set to `true` in the following transaction OP_RETURN values.

#### Implementations for heiradd, heirlist and heirinfo

- `heiradd` allows a user to add more funding to a plan.
- `heirlist` is a standard RPC for all CC modules. This RPC outputs a list of all initial transaction IDs, which serve as the identifiers for each plan.
- `heirinfo` provides some data about a funding plan 

<!-- The implementation for these RPCs can be found in the github repository with the source code of this contract.  -->

<!-- Let's provide links to each one. -->

#### Simplified Add1of2AddressInputs function implementation

```cpp
// add inputs from cc threshold=2 cryptocondition address to transaction object, src/cc/heir.cpp
int64_t Add1of2AddressInputs(CMutableTransaction &mtx, uint256 fundingtxid, char *coinaddr, int64_t amount, int32_t maxinputs)
{
    int64_t totalinputs = 0L;
    int32_t count = 0;
```

By default, the CC SDK function, `SetCCunspents`, fills the provider <!-- provider = returned ? --> vector with a list of unspent outputs of the provided `coinaddr` Bitcoin address.

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

Load the current uxto's transaction and check whether it has an OP_RETURN in the back of the array of outputs: 

```cpp
         if (GetTransaction(it->first.txhash, tx, hashBlock, false) && tx.vout.size() > 0 && GetOpReturnData(tx.vout.back().scriptPubKey, vopret) && vopret.size() > 2)
         {
              uint8_t evalCode, funcId, hasHeirSpendingBegun;
              uint256 txid;
```

Check that the uxto matches this plan: 

```cpp
              if( it->first.txhash == fundingtxid ||   // if this is our contract instance coins 
                  E_UNMARSHAL(vopret, { ss >> evalCode; ss >> funcId; ss >> txid >> hasHeirSpendingBegun; }) && // unserialize opreturn
                  fundingtxid == txid  ) // it is a tx from this funding plan
              {
```

<!-- For the sentence below, is this an accurate rewrite?

To add the utxo to the transaction's vins, set the utxo's vout number and transaction id in the transactions vins. 

? -->

Add the uxto to the transaction's vins, that is, set the txid of the transaction and vout number providing the uxto.

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

#### Simplified Implementation of the FindLatestOwnerTx Function

To calculate the owner-inactivity time and to enable the heir to <!-- claim? or send? --> the funds, we implement the function, `FindLatestOwnerTx`.

This function iterates through the transactions of the module's funding plan <!-- should this say "plans", i.e. plural ? --> and finds the owner's latest transaction. We pass into this function the initial funding transaction id of the plan we desire to inspect.

The function returns the pukeys of both the owner and the heir, the owner inactivity time, and a flag that indicates whether the heir has already spent funds from the `1of2` address. 

All returned values of the function are retrieved from the transactions' OP_RETURNs. 

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

Load the initial funding transaction, check whether it has a correct OP_RETURN, and deserialize it. 

Check <!-- Check the transaction rules? Or check (general) transaction rules? --> transaction rules. Return an empty ID if the funding transaction cannot not be loaded or is incorrect.

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

Retrieve the transaction from the returned array. Check and unmarshal the transaction's OP_RETURN and check whether this transaction is from the relevant Heir plan.

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

If this transaction represents owner activity, reset the lastest transaction ID to this current transaction ID.

Set the flag for the transaction OP_RETURN.

```cpp
                    latesttxid = it->first.txhash;
		    hasHeirSpendingBegun = flagopret;
                    maxBlockHeight = blockHeight;
                }
            }
        }
    }
```

Return the latest owner transaction ID:

```cpp
    return latesttxid;
}
```

#### Simplified Validation Function Implementation

<!-- Is it important to clarify the level of importance between Validation and RPC implementations? Can rewrite, if needed --> Validation provides the logic control of spent Antara-module value, and validation also provides the data added to the Smart Chain. 

Recall that validation code is invoked for a transaction at the time the CC-related value is spent (as opposed to only being invoked at the time the value is added). <!-- I don't understand that previous sentence well enough still. --> We trigger the invokation of this validation function when at least one transaction input is a CC input bearing this module's `EVAL` code.

Validation code typically is not called for the CC module's initial transaction. Instead, we invoke validatation at the time the initial transaction is spent in a second transaction. 

One way to invoke validation for the first transaction when performing the second transaction is to load the initial transaction and validate it first. If the initial transaction turns out to be invalid, it can remain in the chain and is otherwise ignored. <!-- How does this affect the store of value of the customer? Can they lose funds if an initial CC transaction is improperly created? --> In this case, if a CC marker is used, it can be cleared <!-- How specifically? --> and the transaction is removed from the <!-- I changed this from "module instance" to "RPC", hope that's okay --> RPC list output.

#### Guidelines for Validation

In our Heir module prototype, we have three transactions to validate: the initial funding, the transaction that adds more value, and the transaction that claims the funds. The first and second of these transactions do not have any CC vins, and therefore all are validated together with the transaction that claims the funds.

Here are several common aspects of a module that require validation:

- The basic transaction structure
- The basic data structure in OP_RETURN
  - Validation here ensures data integrity in the chain
  - All OP_RETURNs should contain the `EVAL` code and functional id in the first two bytes 
- Avoid all foreseeable attack vectors
  - Ensure DOS attacks are eliminated, especially in the event of a malformed transaction
  - Check the array size before use of any transaction (?) <!-- the sentence was unclear here -->
- Check the initial transaction for this transaction <!-- not clear what "this transaction" refers to --> by retrieving the transaction ID from the OP_RETURN and loading the initial transaction

#### Heir Module Validations

The following are the aspects of validation the Heir module requires. 

- The funding transaction <!-- This is the same as the "initial" transaction, correct? -->
  - Validate that the `1of2` address accurately matches `pubkeys` in the OP_RETURN
- The spending transaction <!-- This is the same as the "claim" transaction, correct? -->
  - Validate the transaction ID <!-- should ID be plural? --> in the OP_RETURNS and OP_RETURN of the transaction spent (`vintx`) <!-- I've never heard of a vintx? --> which binds the transaction to the contract instance data, so the txids should be equal to the initial txid. <!-- I don't understand this well enough to edit. -->
- Validate whether the heir is allowed to spend the funds
  - Check whether the flag indicates that the Heir is already spending the funds
  - Check whether enough time has passed since the last time the owner was active on the chain
- When validating, separate the owner's funding transaction from any other contributions to the `1of2` address
    - Although the Heir module is initiated based on the owner's initial transaction, nothing prevents other users on the Smart Chain from contributing funds
    - Therefore, when validating, for each utxo contained in the `1of2` address, calculate whether or not the utxo's vins contain the owner's pubkey
- During the course of validation, we fully check OP_RETURN format

To activate the `HeirValidate()` function for the Heir module `EVAL` code <!-- Are we talking about what is happening in the daemon here? -->

<!-- Do we not see in the tutorial what is happening in the below sentence? Can we, if not? Not fully clear. I need to re-read first, probably. -->

(?), we followed JL's 'Mastering Cryptocondition' book instructions while we added a new cc contract to the system's code. (?)

##### `HeirValidate()` Implementation

Explanation of code:

- Transaction-validation entry function
  - (this is actually a callback)
- Parameters
  - `cpHeir` - pointer to the module's variable structure
  - `eval` - pointer to the CC dispatching object
    - used to return invalid state
  - `tx` - the transaction itself
  - `nIn` - not used in validation code

```cpp
bool HeirValidate(struct CCcontract_info* cpHeir, Eval* eval, const CTransaction& tx, uint32_t nIn)
{
```

<!-- I don't understand the sentence below well enough to edit yet. -->

(?) Common validation rules for all funcid. (?)

Check the basic transaction structure -- does it have the OP_RETURN, with the correct basic `evalcode` and `funcid`

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

Here we come to a good place to load the initial transaction, check whether it exists, and whether it has a correctly formed OP_RETURN. 

Call the `FindLatestOwnerTx()` function. This function obtains the OP_RETURN parameters and the `hasHeirSpendingBegun` flag, and checks the initial transaction.

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

For `F` and `A`, we return an invalid response, as the process should never be able to access these function IDs.

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

For unsupported function IDs, return an invalid state.

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
| Crypto-Condition | in simple terms an encoded expression and supporting c-library which allows to check several types of logical conditions based on electronic signatures and hashes. Frequently used cryptocondition is checking that some transaction is signed by one of several possible keys |
| CC module | custom consensus contract (rebranded cryptocondition contract) |
| CC input | tx cryptocondition input spending value from cc output |
| CC output | tx output with cryptocondition encoded |
| normal inputs | inputs spending value from normal tx outputs (not cryptocondition outputs) |
| normal outputs | not cryptocondition outputs but usual tx outputs like pubkey or pubkeyhash |
| opreturn, opret | <!-- I prefer opreturn, so I'll need to go back and make it consistent --> a special output item in transaction, usually the last one, which is prepended by OP_RETURN script opcode and therefore is never able to spend. We put user and contract data into it. |
| plan | an instance <!-- we can skip "module instance" and just use "plan" --> of cc contract data, that is, a set of all the relevant transactions, usually beginning from an initial tx whose txid serves a whole plan's id. Any cc contract has a list function to return a list of all the created plans. |
| tx, txn | short for `transaction` |
| txid | transaction id, a hash of a transaction |
| "unspendable" address | the global cc contract address, for which its public and private key are commonly known. It is used for conditionally sharing funds between contract users. As its private key is not a secret theoretically, anyone can request spending value from this address, but cc contract validation code might and usually does apply various business logic conditions and checks about who can spend the funds from the and what he or she should provide to be able to do this (usually the spending transaction and/or its previous transactions are checked) |
| vin | input or array of inputs in transaction structure (tx.vin) |
| vout | output or array of outputs in transaction structure (tx.vout) |

## CC contract patterns

<!-- Perhaps we should include the marker pattern here, and possibly move this earlier in the docs, or something? -->

The following are useful patterns during Antara module development.

#### Baton Pattern

The baton pattern allows the developer to organize a single-linked list in a Smart Chain. 

To traverse a linked list using the baton method, start with the first transaction in any plan instance and iterate through the other transactions to collect properties in their opreturns.

### Marker pattern

The marker pattern is used to place a mark on all similar transactions. This is accomplished by sending a small value to a common fixed address. Typically, we use the CC global address.

You can also create either a normal marker or a CC marker for <!-- here it says "future finding", and I don't know what that means --> (? see `<!--` comment) the transactions.

When using normal markers, there is a small problem that is easily solved. The problem is that the CC global address allows any user to spend its funds. Therefore, anyone can spend your marker transaction. To overcome this, use the CC SDK function, `Settxids()`, to retrieve all transactions with markers in the CC (?) contract list function. (?)

Another method is to create an unspendable CC marker. In this method, send a small value to a CC output in a known address. To retrieve the list of CC-marker transactions, use the CC SDK function, `SetCCunspents()`. This returns a list of transactions with unspent outputs for the appointed address. <!-- The "appointed address" is the same as the "known address", correct? -->

When using the unspendable CC marker method, in the validation code you should disable spending from this address. <!-- Not sure if I understood here. --> This prevents a scenario where spending from the address causes you to lose markers. (For example, if you were to allow spending from this address using a burn transaction, the burn transactions would take the burned markers into a hidden state, thus removing the markers from the list of initial transactions.)

In all cases, the CC module validation code should disable unauthorized attempts to spend any markers. 

Concerning the method that relies on the CC marker, if the CC global address is used for storing not only the marker value, but also other funds, you need to ensure that marker values are not spent.

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

For example, the [<b>Payments</b>] Antara module uses <!-- this function? --> to create a spendable <!-- why spendable? Were we trying to create an unspendable address? --> as follows.

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
 
In place of the `IsPayToCryptoCondition()` fucntion we can use the `getCCopret` function. This latter function is a lower level of the former call, and will return any `vData` appended to the `ccvout` along with a `true`/`false` value that would otherwise be returned by the `IsPayToCryptoCondition()` function. <!-- Did I get that right? -->

In validation, we now have a totally diffrent transaction type than exists allowing to have diffrent validation paths for diffrent ccvouts. And also allowing multiple ccvouts of diffrent types per transaction.

```cpp
if ( tx.vout.size() == 1 )
{
    if ( IsPaymentsvout(cp,tx,0,coinaddr,ccopret) != 0 && ccopret.size() > 2 && DecodePaymentsMergeOpRet(ccopret,createtxid) )
    {
        fIsMerge = true;
    } else return(eval->Invalid("not enough vouts"));
}
```

## Various tips and tricks in cc contract development

### Test chain mining issue

On a test chain consisting of two nodes do not mine on both nodes - the chain might get out of sync. It is recommended to have only one miner node for two-node test chains.

### Try not to do more than one AddNormalInputs call in one tx creation code

FillSell function calls AddNormalInputs two times at once: at the first time it adds txfee, at the second time it adds some coins to pay for tokens. 

I had only 2 uxtos in my wallet: for 10,000 and 9 ,0000,000 sat. Seems my large uxto has been added during the first call and I receive 'filltx not enough utxos' message after the second call. I think it is always better to combine these calls into a single call.

### Nodes in your test chain are not syncing

You deployed a new or updated developed cc contract in Komodo daemon and see a node could not sync with other nodes in your network (`komodo-cli ac_name=YOURCHAIN getpeerinfo` shows synced blocks less than synced heaeds). It might be seen errors in console log.

Most commonly it is the cc contract validation code problem. Your might have changed the validation rules and old transactions might become invalid. It is easy to get into this if you try to resync a node from scratch. In this case old transactions should undergo the validation.

Use validation code logging and gdb debug to investigate which is the failing rule.

If you really do not want to validate old transactions you might set up the chain height at which a rule begin to action with the code like this:

```cpp
if (strcmp(ASSETCHAINS_SYMBOL, "YOURCHAIN") == 0 && chainActive.Height() <= 501)
    return true;
```

Use hidden `reconsiderblock` komodo-cli command to restart syncing from the block with the transaction which failed validation.

### Deadlocks in validation code

If komodod hangs in cc contract validation code you should know that some blockchain functions use locks and might cause deadlocks. You should check with this functions and use non-locking versions.

An example of such function is GetTransaction(). Instead you should use myGetTransaction() or eval->GetConfirmed()

## What next? Contract architecture extending for token support

My contract should work both with coins and tokens. The program logic for inheritance coins and tokens was very the same, so I used templates for contract functions which were extended in specific points to deal either with coins or tokens (like to make opreturn and cc vouts). In the next part of this tutorial I will show ho to deal with tokens.
