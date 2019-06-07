# An Advanced Approach to Komodo's Antara Framework

The following content is provided for the experienced C/C++ developer who desires to create new Antara modules for Komodo Smart Chains. 

The content herein provides introductory instruction that can allow the developer to more easily read existing Antara-related code and follow advanced tutorials that examine specific Antara modules.

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
- Familiarity with Bitcoin basics
  - [Link to Mastering Bitcoin pdf book]()
- The `komodod` software should be installed on your local machine
  - [Link to installation instructions](../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html#linux)

## The Starting Point of the Antara Framework

The Antara framework greatly enhances blockchain functionality. Antara allows a developer to write arbitrary code that can be enforced by their Smart Chain's consensus mechanism. Antara even allows clusters of Smart Chains to work together in this effort. 

The level of freedom this grants to the blockchain developer is sometimes difficult to comprehend until one has either seen the technology in action or engaged with the technology directly.

The Antara framework takes into account several different advanced technologies. To limit the scope of our introduction, for now we focus only one on crucial aspect: "CryptoConditions," or "CC" for short.

#### A Brief Explanation of CryptoConditions

CryptoConditions is a technology that allows for arbitrary logical conditions and fulfillments to be evaluated as a part of consensus. This allows for a Smart Chain's consensus mechanism to evaluate the results of arbitrary code and update state in the blockchain's data in a decentralized and secure fashion.

CryptoConditions technology is not a new concept. The [Interledger](https://interledger.org/) team originally proposed this technology in 2016. 

The [original proposal](https://tools.ietf.org/html/draft-thomas-crypto-conditions-01) was that it would be an open-source industry-wide standard format. The Interledger team does not seem to have continued exploring the technology beyond the original proposal. 

Komodo, on the other hand, found the CryptoConditions concept to be intriguing. In 2018, Komodo adopted this open-source technology into the suite of offerings in our Antara framework. Our implementation uses many of the key ideas put forth by the Interledger team, and at the same time we depart in several significant ways.

The specific details of the differences between Komodo and Interledger's versions of CryptoConditions are not necessary to understand here. However, those who are curious can explore the open-source code in the respective repositories. 

The important takeaway is that the Antara framework encompasses several underlying technologies, one of which is CryptoConditions (CC). This technology allows a developer to add arbitrary logical conditions and fulfillments to their Smart Chain, and to rely on the consensus mechanism to ensure state integrity in a decentralized environment.

#### CryptoConditions Depends Upon Transactions and Booleans

At the most fundamental level, blockchain data is advanced only through transactions. A blockchain itself is but a list of transactions, bound into blocks. By design, each transaction must be confirmed by the consensus mechanism.

Therefore, all decentralized data that a developer wishes to create or use with their arbitrary code must first be added to a transaction. This transaction is then passed through the consensus mechanism. Transactions that are successfully confirmed are finally added to the blockchain, and therefore the data is also added.

To take advantage of this functionality, a developer adds customized source code to the Antara framework to form a new module. Whenever a relevant transaction occurs on the blockchain, the consensus mechansim calls the developer's module, executes the arbitrary code, validates the logical conditions and fulfillments related to the transaction, and either confirms or denies it.

To simplify this process, Antara requires that the developer build their module such that each CryptoConditions (CC) transaction returns a boolean value as a part of the final results. If the returned boolean value is `true`, the transaction is approved.

With this framework in place, the developer can also add any other data to be saved as a part of the transaction.  This data is included in a special part of the transaction called an <b>OP_RETURN</b>, or <b>opreturn</b> for short. Also, not only does the Antara module contain arbitary source code, but the CC transaction itself contains the simple scripts that act as the logical conditions and expressions of a CryptoCondition. (?)

Through Antara, the developer receives a powerful tool for creating and executing decentralized arbitrary code. A developer can add also data to any transaction, and their Smart Chain can utilize this data in future executions of arbitrary code. The primary requirement is that the arbitrary code return a meaningful boolean value as a part of the final result. 

#### Building an Antara Module is Harder Than Creating a Balance-Based Smart Contract 

Antara modules are fundamentally different than the "smart contracts" that are familiar on other blockchain platforms. The key difference is that Antara modules directly rely on ["unspent transactions,"](https://komodoplatform.com/whats-utxo/) which are called "utxos" for short. Smart contracts, on the other hand, rely on the total balance of funds held within an address. 

Utxo-based modules are harder to create than balance-based smart contracts. However, utxo-based modules result in dramatically more powerful and secure functionality, as they leverage the existing Bitcoin-utxo system. 

For example, with balance-based smart contracts, a bug in the smart-contract language can result in terrible events, such as the malicious printing of new coins in a smart contract, or the draining of all funds within a shared contract. Events such as these can happen even when the smart-contract author is a competent developer.

In a utxo-based module, the risk of such events is exponentially reduced. The reason utxo-based modules are more secure is that every update of the blockchain's state must be executed as a transaction, and therefore the data must pass the normal rules of consensus. 

Komodo is based on the Bitcoin protocol, and therefore Komodo's Smart Chain consensus mechanism is built on the most rigorously tested and heavily supported software in the industry. Balance-based smart contracts cannot compare to this level of security.

As the developer engages with Antara module development, they can learn how utxo-based modules allow for increased speed in achieving consensus, greater simplicity in software architecture, more flexible functionality between Smart Chains, and many more superior features. 

#### A Brief Look at an Antara Module Template

The following file, `customcc.cpp`, is a blank template a developer can use when beginning the creation of a new Antara module. Take a brief look to familiarize yourself with the essential layout.

[<b>Link to customcc.cpp file</b>](https://github.com/jl777/komodo/blob/dev/src/cc/customcc.cpp)

The key takeaway is that the entrypoints to Antara's CryptoConditions technology is broken down into a few functions and tables. Once the developer grasps the nature of working with these entrypoints, building Antara modules becomes a simple exercise in the common aspects of software development. 

Komodo already offers many SDK functions, tutorials, and best practices to simplify the learning curve and development process, and we continue to develop more of these sources of assistance.  

Before the developer can begin creating new Antara modules, there are several key concepts to understand. Looking to the Bitcoin protocol basics, we first refresh our understanding of a utxo.

## Aspects of Utxos that are Important for Antara Modules

In the prerequisite material the reader was encouraged to first learn the basics of blockchain technology and the Bitcoin protocol. The book, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook), provides a preliminary discussion, as does [the Komodo whitepaper.](https://komodoplatform.com/whitepaper) 

A key concept in these texts is the unspent transaction, or utxo. For a brief reminder on the nature of a utxo, read [this post on the Komodo blog regarding utxos.](https://komodoplatform.com/whats-utxo/)

Observe the data structure of a utxo.

```json

```

Note how the <!-- vins and vouts -->

Once we spend the transaction using the [<b>sendtoaddress</b>](../basic-docs/smart-chains/smart-chain-api/wallet.html#sendtoaddress) RPC, our utxo gains a `txid`. <!-- add stuff -->

```json

```

Note how <!-- Note whatever. -->



 Just a fancy name for `txid/vout`, so when you sendtoaddress some coins, it creates a `txid` and the first output is `vout.0`, combine it and `txid/0` is a specific UTXO.

(?)

Of course, to understand even this level of detail requires that you understand what a `txid` is, but there are plenty of reference materials on that. It is basically the 64 char long set of letters and numbers that you get when you send funds.

(?)

The essence of blockchain technology is that once a utxo is spent, it cannot be spent again. At any given block height, you can check to see whether a `txid` has a `vout` indicating that it is spent. 

In building modules for the Antara framework, we constantly keep this principle in mind, and the consensus mechanism is our guide. We create our modules such that while our Smart Chain awaits notarization to the Bitcoin network, a 51% attack on our transaction spent/unspent history has minimal negative effects on our module users. Examples of how Antara can turn the user's stressful requirement to wait for sufficient blockchain confirmations into a secure, fast, and convenient asset-transfer protocol can be found in the [<b>Channels Antara Module.</b>](../basic-docs/fluidity/fluidity-api/channels.html#introduction)

One more aspect of utxos to consider is the nature of transactions in the mempool. A utxo is not considered spent under any circumstances until the transaction that spends it receives confirmation from the consensus mechanism. Therefore, transactions sent to the [<b>mempool</b>](https://en.bitcoin.it/wiki/Protocol_documentation#mempool) are technically still unspent transactions, even if we are fairly certain the transaction will be confirmed in the next block.

A useful comparison here can be found by observing people seeking to attend a ticketed event, such as a music concert. To gain acceptance into the music hall, a person must first have a ticket. We compare this to the creation of a txid. The person must wait in line. This is similar to the mempool. The person must have their ticket stamped, and this is akin to the consensus mechanism approving the transaction. Then the person may enter the music hall. This is the transaction becoming a part of the blockchain history.

## The Formation of a Transaction

The developer may benefit from understanding the specific method and manner in which a transaction is created.

Contrary to what one may think, a blockchain transaction is not a simple accounting entry that says, "Address X pays Y amount of funds to address Z." Rather, a transaction also contains a Bitcoin script that must be satisfied before the requested funds can be spent.

<!-- I changed the above paragraph according to my best knowledge. It used to say, "on the blockchain." This wasn't clear to me, as I wasn't sure if we were talking about blockchain database, or the actual transaction itself, or something else. I guessed. We should correct. -->

The manner in which transactions are created has evolved over time. Originally, the process consisted only of a "Pay to Pubkey" script, or "P2PK" for short.

The basic idea of a P2PK transaction is that the software checks the cryptographic signature of the public key attempting to spend funds, and if the signature is correct the transaction is approved. 

These simple transactions are common in coinbase transactions. (Recall that a coinbase transaction is the transaction that mints new coins onto a blockchain. Coinbase transactions are most frequently encountered as block rewards for miners/stakers.)

If the reader would like a more thorough technical explanation for P2PK transactions, tutorials and explanations abound across the web. [Here is one such example.](https://learnmeabitcoin.com/glossary/p2pk)

As the early Bitcoin community gained experience, Satoshi Nakamoto realized that in the future, quantum computers would be able to break the encryption protection surrounding pubkeys, and thereby steal funds in any pubkey address. 

To solve this problem, Satoshi invented a method to have a "cold address." Cold addresses are based on a pubkey, but there are various cryptographic functions that separate the two. 

A user can send their funds to a cold address without revealing the associated pubkey. This allows the user to keep their pubkey private, and thus protect their funds from being spent even by a quantum computer, so long as the relationship between the cold address and the pubkey remains a secret.

Naturally, to spend their funds, the user must utilize their pubkey to create the transaction signature, and thus they reveal the relationship between the cold address and the pubkey. Once the secret is revealed, the cold address no longer offers any protection again quantum computers. 

This encouraged Satoshi to redesign the Bitcoin protocol so that each time a utxo is spent, the leftover amount in the utxo is sent to a new cold address. This is the reason for the "change" addresses that a user sees in their wallet each time they send funds. 

Some people complain about the confusion this causes to new users, and about the difficulty of keeping track of the private keys to each new "change" address, but the design is now a permanent part of the protocol.

#### Pay to Pubkey Hash Transactions 

Transactions that take place with a cold address are called "Pay to Pubkey Hash" transactions, or P2PKH for short. 

The Internet contains many thorough explanations of P2PKH transactions, so we will limit our description. For more information on P2PKH transactions, [here is a useful Internet tutorial.](https://learnmeabitcoin.com/glossary/p2pkh)

The cold addresses of a P2PKH transaction are base58 encoded, meaning that the address consists of a prefix and a hash of the pubkey. The structure of the script to spend this type of transaction is as follows.

<!-- Let's give a specific example to go along with the descriptions. -->

```
<hash of the pubkey> <pubkey> <verify hash matches> <checksig>
```

Once a cold address is associated with a pubkey, the Bitcoin protocol no longer attempts to use these quantum-secure P2PKH transactions, as they require an extra 25 bytes of data space. Instead, the protocol reverts to the original P2PK transactions. The protocol does continue the "change" address pattern, however. The reason for this is beyond the scope of our tutorial.

As an aside, in Antara module development, when we create addresses that we intend to have our users reuse repeatedly, we simply skip P2PKH transactions altogether, and only use P2PK transactions instead. 

#### Pay to Script Hash Payments

In addition to P2PK transactions, the original Bitcoin protocol allowed for any type of script opcode in transactions. This seemed like a promising idea at first, but developers quickly discovered that this level of freedom also brought many bugs to the code. Satoshi soon limited the transaction-type options available to only a few, and P2PK and P2PKH become the overwhelming majority of all transctions.

The community still desired the freedom to execute scripts as a part of transactions, and this eventually led to the Pay to Script Hash, or P2SH, standard. This method allows the user to lock their funds to the hash of a script.

To unlock the funds, a user provides the original script. The blockchain daemon checks that the script matches the hash, executes the script, and the funds are unlocked.

The script itself is typically designed to ensure that the funds are spent in a secure manner, and this is often through a P2PK or P2PKH transaction that is included in the script. 

For more information about P2SH transaction, [a useful tutorial can be found here.](https://learnmeabitcoin.com/glossary/p2sh)

The structure of a P2SH transaction is as follows.

<!-- Again, let's show a full example. I still don't understand what specifically I'm looking at. -->

```
<hash the script> <script> <verify hash matches>
```

#### A New Op Code: CheckCryptoCondition 

Each of the above transactions relies on an operation code, also called "opcode", to execute. For example, the P2PKH transaction relies on the OP_CHECKSIG opcode, `172`, to execute. The opcode is included as a part of the transaction data, typically as a header and in hex format. When the daemon detects the opcode in the raw data, the daemon understands what is being asked by the developer and performs the appropriate action.

Originally, Bitcoin had many opcodes available. Satoshi disabled many opcodes for stability reasons. To see a list of current opcodes in Bitcoin, [visit the Bitcoin wiki.](https://en.bitcoin.it/wiki/Script#Opcodes) 

The CryptoConditions standard itself relies on a new opcode, OP_CHECKCRYPTOCONDITION, or OP_CCC for short. This opcode is not included in the Bitcoin protocol. Rather, the OP_CCC standard was originally written and designed by the Interledger team. The full, original OP_CCC specification is a thirty-three page document, [which you can see here.](https://tools.ietf.org/html/draft-thomas-crypto-conditions-04)

There is no need to read and master the entire original proposal, however, as Komodo's Antara framework automates much of the underlying aspects. The primary takeaway is that the developer uses OP_CCC to create many types of CryptoConditions transactions, and the binary encodings of these CC transactions can be used in a Smart Chain utxo. This is the foundation of a CC-related Antara module.

OP_CCC provides many relatively convenient use cases, and the developer can expand on the common OP_CCC use cases when necessary. For example, a standard use case of OP_CCC is a `1of1` CC script. This type of CC transaction requires only 1 signature, and is accompanied by a few custom constraints. Many of the current default Antara modules rely on the `1of1` script OP_CCC. An more intricate use case of OP_CCC, on the other hand, is the Payments module. This module uses a `1of2` CC script, which allows for one of two signatures to sign a CC transction, and the script also features several customized constraints.

## CC Contract Basics

#### The Eval Code

In the Komodo source code, each Antara module has an associated arbitrary number, called an "eval" code. This code can be any digit between `0` and `255`, there can be only one code per module, and each code is currently one byte in size. To add a new Antara module, the developer begins by adding a new eval code to the table of all active eval codes on their Smart Chain. 

We define all eval codes in the [~/komodo/src/cc/eval.h](https://github.com/jl777/komodo/tree/jl777/src/cc/eval.h) file. The following eval codes represent the essential, default modules in a Smart Chain.

```C
#define FOREACH_EVAL(EVAL)             \
        EVAL(EVAL_IMPORTPAYOUT, 0xe1)  \
        EVAL(EVAL_IMPORTCOIN,   0xe2)  \
        EVAL(EVAL_ASSETS,   0xe3)  \
        EVAL(EVAL_FAUCET, 0xe4) \
        EVAL(EVAL_REWARDS, 0xe5) \
        EVAL(EVAL_DICE, 0xe6) \
        EVAL(EVAL_FSM, 0xe7) \
        EVAL(EVAL_AUCTION, 0xe8) \
        EVAL(EVAL_LOTTO, 0xe9) \
        EVAL(EVAL_MOFN, 0xea) \
        EVAL(EVAL_CHANNELS, 0xeb) \
        EVAL(EVAL_ORACLES, 0xec) \
        EVAL(EVAL_PRICES, 0xed) \
        EVAL(EVAL_PEGS, 0xee) \
        EVAL(EVAL_TRIGGERS, 0xef) \
        EVAL(EVAL_PAYMENTS, 0xf0) \
        EVAL(EVAL_GATEWAYS, 0xf1)
```

As the eval code must range between `0` and `255`, a Smart Chain can have up to 256 total modules. The developer of a Smart Chain can determine which modules to add from the available modules in the ecosystem. Currently, we do not yet have 256 total modules, and therefore at this time there is no need to choose; the existing modules can be left on their default eval settings.

#### Validation Code

The developer adds validation code that will be executed any time the daemon encounters a transaction bearing the relevant module's eval code.

This is where the true power of CC begins. When validating a normal transaction, the daemon has access only to information included in the transaction itself. With a CC transaction, however, the daemon is running arbitrary code, and therefore anything is possible. The validation code can look trough the blockchain history, observe transactions in the mempool, and even utilize Antara's cross-chain technology.

Technically, OP_CCC scripts do not have a required structure. The scripts only need to follow the general structure of the initial layout, as provided in the proposal of the Interledger team (linked above).

The developer does not need to fully understand the entire proposal. Instead, the developer may follow the general guideline, as provided in our templates and tutorials. This allows the developer to code and debug their OP_CCC related modules in an efficient manner.

<!-- Below content seems like it can be grouped with other "simplest" content, 1of1 and 1of2. -->

A common and simple CC script exists in nearly all of the default Antara modules. This script consists of a single signature from a pubkey and CC validation. This is essentially the equivalent of a P2PK Bitcoin script; the CC validation returns `true` or `false`, and the P2PK Bitcoin script returns `1` or `0`.

<!-- We say "CC script" below. It's not clear to me that the reader would know that a CC script and a CC address are essentially the same? -->

The essential structure of a CC script is as follows. (The automatically generated content is handled by the daemon's internal functions and can be ignored.)

```
evalcode + pubkey + automatically generated content
```

Each CC script relies on the eval code unique to the module to which the CC script belongs.

In the Bitcoin protocol, when creating an address that is tied to a script a common solution is to hash the script and use the hash as the address. Since the CC script includes both the pubkey and the module's unique eval code, a pubkey makes a unique CC address for each module. Funds that are sent to a CC address can be spent only by the module with the appropriate eval code, and therefore funds created and associated with an eval code maintain scarcity within this module.

<!-- Maybe we rephrase based on content below. Also, maybe this content goes sooner, so that when we get to talking about CC addresses, we have more context. -->

Originally, Bitcoin pubkeys were 64 bytes, as opposed to the 33 byte pubkeys of today. The 64 byte pubkeys had a left half and a right half which were used for internal functions in the daemon. Using cryptographic methods, a developer could derive the left half of the function from the right half, and vice verse. 

Early Bitcoin developers took advantage of the ability to derive one half of the pubkey from the other, and compressed the pubkey to a smaller size. They also instituted prefixes that informed the daemon whether the pubkey was odd, even, or large (`02`, `03`, and `04` respectively). In the end, the developers compressed the 64 byte pubkey into a 33 byte version.

Today, there are multiple ways to express a pubkey. There are compressed and uncompressed versions of the pubkey, and the pubkey can also be expressed as two different base58 encoded address. All of these are associated with the same privkey.

Also, by convention, each Antara module has a global CC address where the privkey is publicly available. As usual, spending from this global CC address requires that the spender meet all validation rules set forth by the developer. Therefore, the lack of privacy for the privkey is not an issue. 

One purpose for this global CC address is to create a repository that is global (within the module) for information regarding specific instances of this module on the chain. For example, each time a user initiates an instance of the module, the design of the module requires that a user send a small amount of funds to this global CC address. This transaction contains data about the instance the user desires to create. Other users on the network can retrieve the data in this global CC address, and thereby gain knowledge about the current state of all module instances on the Smart Chain.

## CC vins and vouts

A transaction in the Bitcoin protocol consists of input and outputs. The vins take funds from utxos, combine them into one "spend" transaction, and create new vouts. Some of the vouts may be new utxos.

```
vin0 + vin1 + ... + vin[n-1] -> vout0 + vout1 + ... vout[n-1]
```

Each of the vouts has a spend script that must be satisfied before the vout can be spent. 

Suppose vout0 is a normal utxo with a small amount of funds and the receiver of this utxo desires to spend it. They create a new transaction with a vin that consumes vout0. This vin must satisfy any scripts that are contained in vout0.

A key power of CryptoConditions (CC) is the ability to enhance the script that must be satisfied between a vin and a vout. In CC, the vout contains the logical condition, and the vin contains the logical fulfillment.

With access to arbitrary code, CC allows the Bitcoin protocol to rival the "smart contracts" common on other platforms. Yet, CC accomplishes this without requiring the virtual-machine counterpart that other smart-contract platforms require. Instead, the consensus mechanism is directly engaged with the scripts in the vins and vouts of transactions.

The Bitcoin protocol's consensus mechanism is constantly placed under the most intense of cryptocurrency pressure in the industry, and therefore is likely the most reliable consensus mechanism available. The ability to engage the consensus mechansim in arbitrary code while not changing the consensus mechanism itself grants Antara security and stability. The utxo system of the Bitcoin protocol reduces the likelihood that modules themselves will contain bugs internally. (The reader should note here that although CC reduces the likelihood of viable attack vectors on a module, CC cannot eliminate attack vectors altogether.)

To recap, we have now a new standard bitcoin output type called a CC output. Further, there can be up to 256 different types of CC outputs active on any given blockchain. We also know that to spend any output, you need to satisfy its spending script, which in our case is the signature and whatever constraints the CC validation imposes. We also have the convention of a globally shared keypair, which gives us a general CC address that can have funds sent to it, along with a user pubkey specific CC address.
Let us go back to the 3+2 transaction example:

```
vin0 + vin1 + vin2 -> vout0 + vout1
```

Given the prior paragraph, try to imagine the possibilities the simple 3+2 transaction can be. Each `vin` could be a normal `vin`, from the global contract address, the user's CC address and the vouts can also have this range. Theoretically, there can be 257 * 257 * 257 * 257 * 257 forms of a 3+2 transaction!

In reality, we really dont want that much degrees of freedom as it will ensure a large degree of bugs! So we need to reduce things to a more manageable level where there are at most 3 types for each, and preferably just 1 type. That will make the job of validating it much simpler and simple is better as long as we dont sacrifice the power. We dont.

Ultimately the CC contract is all about how it constrains its inputs, but before it can constrain them, they need to be created as outputs. More about this in the CC validation chapter.

<!--

## Chapter 4 - CC RPC Extensions

Currently, CC contracts need to be integrated at the source level. This limits who is able to create and add new CC contracts, which at first is good, but eventually will be a too strict limitation. The runtime bindings chapter will touch on how to break out of the source based limitation, but there is another key interface level, the RPC.

By convention, each CC contract adds an associated set of RPC calls to the `komodo-cli`. This not only simplifies the creation of the CC contract transactions, it further will allow dapps to be created just via RPC calls. That will require there being enough foundational CC contracts already in place. As we find new usecases that cannot be implemented via rpc, then a new CC contract is made that can handle that (and more) and the power of the RPC level increases. This is a long term process.

The typical RPC calls that are added `<CC>address`, `<CClist>`, `<CCinfo>` return the various special CC addresses, the list of CC contract instances and info about each CC contract instance. Along with an RPC that creates a CC instance and of course the calls to invoke a CC instance.
The role of the RPC calls are to create properly signed `rawtransactions` that are ready for broadcasting. This then allows using only the RPC calls to not only invoke but to create a specific instance of a CC. The faucet contract is special in that it only has a single instance, so some of these RPC calls are skipped.

So, there is no MUSTHAVE RPC calls, just a sane convention to follow so it fits into the general pattern.

One thing that I forgot to describe was how to create a special CC address and even though this is not really an RPC issue, it is kind of separate from the core CC functions, so I will show how to do it here:

```C
const char *FaucetCCaddr = "R9zHrofhRbub7ER77B7NrVch3A63R39GuC";
const char *FaucetNormaladdr = "RKQV4oYs4rvxAWx1J43VnT73rSTVtUeckk";
char FaucetCChexstr[67] = { "03682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe12" };
uint8_t FaucetCCpriv[32] = { 0xd4, 0x4f, 0xf2, 0x31, 0x71, 0x7d, 0x28, 0x02, 0x4b, 0xc7, 0xdd, 0x71, 0xa0, 0x39, 0xc4, 0xbe, 0x1a, 0xfe, 0xeb, 0xc2, 0x46, 0xda, 0x76, 0xf8, 0x07, 0x53, 0x3d, 0x96, 0xb4, 0xca, 0xa0, 0xe9 };
```

Above are the specifics for the faucet CC, but each one has the equivalent in [CCcustom.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/CCcustom.cpp). At the bottom of the file is a big switch statement where these values are copied into an in memory data structure for each CC type. This allows all the CC codebase to access these special addresses in a standard way.

In order to get the above values, follow these steps:

A. use `getnewaddress` to get a new address and put that in the `<CC>Normaladdr = "";` line

B. use `validateaddress` `<newaddress from A>` to get the pubkey, which is put into the `<CC>hexstr[67] = "";` line

C. stop the daemon [`komodod`] and start with `-pubkey=<pubkey from B>` and do a `<CC>address` RPC call. In the console you will get a printout of the hex for the privkey, assuming the if ( 0 ) in `Myprivkey()` is enabled ([CCutils.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/CCutils.cpp))

D. update the `CCaddress` and `privkey` and dont forget to change the `-pubkey=` parameter

The first RPC command to add is `<CC>address` and to do that, add a line to [rpcserver.h](https://github.com/jl777/komodo/tree/jl777/src/rpcserver.h) and update the commands array in [rpcserver.cpp](https://github.com/jl777/komodo/tree/jl777/src/rpcserver.cpp)

In the [rpcwallet.cpp](https://github.com/jl777/komodo/tree/jl777/src/wallet/rpcwallet.cpp) file you will find the actual RPC functions, find one of the `<CC>address` ones, copy paste, change the eval code to your eval code and customize the function. Oh, and dont forget to add an entry into [eval.h](https://github.com/jl777/komodo/tree/jl777/src/cc/eval.h)

Now you have made your own CC contract, but it wont link as you still need to implement the actual functions of it. This will be covered in the following chapters.

## Chapter 5 - CC Validation

CC validation is what its all about, not the "hokey pokey"!

Each CC must have its own validation function and when the blockchain is validating a transaction, it will call the CC validation code. It is totally up to the CC validation whether to validate it or not.

Any set of rules that you can think of and implement can be part of the validation. Make sure that there is no ambiguity! Make sure that all transactions that should be rejected are in fact rejected.

Also, make sure any RPC calls that create a CC transaction dont create anything that doesnt validate.

Really, that is all that needs to be said about validation that is generic, as it is just a concept and gets a dedicated function to determine if a transaction is valid or not.

For most of the initial CC contracts, I made a function code for various functions of the CC contract and add that along with the creation txid. That enables the validation of the transactions much easier, as the required data is right there in the opreturn.

You do need to be careful not to cause a deadlock as the CC validation code is called while already locked in the main loop of the bitcoin protocol. As long as the provided CC contracts are used as models, you should keep out of deadlock troubles.




## Chapter 6 - Faucet Example
Finally, we are ready for the first actual example of a CC contract. The faucet. This is a very simple contract and it ran into some interesting bugs in the first incarnation.

The code in [~/komodo/src/cc/faucet.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/faucet.cpp) is the ultimate documentation for it with all the details, so I will just address the conceptual issues here.

There are only 7 functions in [faucet.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/faucet.cpp), a bit over 200 lines including comments. The first three are for validation, the last four for the RPC calls to use.

```C
int64_t IsFaucetvout(struct CCcontract_info *cp,const CTransaction& tx,int32_t v)

bool FaucetExactAmounts(struct CCcontract_info cp,Eval eval,const CTransaction &tx,int32_t minage,uint64_t txfee)

bool FaucetValidate(struct CCcontract_info cp,Eval eval,const CTransaction &tx)

int64_t AddFaucetInputs(struct CCcontract_info *cp,CMutableTransaction &mtx,CPubKey pk,int64_t total,int32_t maxinputs)

std::string FaucetGet(uint64_t txfee)

std::string FaucetFund(uint64_t txfee,int64_t funds)

UniValue FaucetInfo()
```

Functions in `rpcwallet` implement:

`faucetaddress` fully implemented in [rpcwallet.cpp](https://github.com/jl777/komodo/tree/jl777/src/wallet/rpcwallet.cpp)
`faucetfund` calls `FaucetFund`
`faucetget` calls `FaucetGet`
`faucetinfo` calls `FaucetInfo`


Now you might not be a programmer, but I hope you are able to understand the above sequence. user types in a cli call, `komodo-cli` processes it by calling the RPC function, which in turn calls the function inside [faucet.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/faucet.cpp)

No magic, just simple conversion of a user command line call that runs code inside the komodod. Both the `faucetfund` and `faucetget` create properly signed rawtransaction that is ready to be broadcast to the network using the standard `sendrawtransaction` RPC. It doesnt automatically do this to allow the GUI to have a confirmation step with all the details before doing an irrevocable CC contract transaction.

`faucetfund` allows anybody to add funds to the faucet

`faucetget` allows anybody to get 0.1 coins from the faucet as long as they dont violate the rules.

And we come to what it is all about. The rules of the faucet. Initially it was much less strict and that allowed it to be drained slowly, but automatically and it prevented most from being able to use the faucet.

To make it much harder to leech, it was made so each `faucetget` returned only 0.1 coins (down from 1.0) so it was worth 90% less. It was also made so that it had to be to a fresh address with less than 3 transactions. Finally each txid was constrained to start and end with 00! This is a cool trick to force usage of precious CPU time (20 to 60 seconds depending on system) to generate a valid txid. Like PoW mining for the txid and I expect other CC contracts to use a similar mechanism if they want to rate limit usage.

Combined, it became such a pain to get 0.1 coins, the faucet leeching problem was solved. It might not seem like too much trouble to change an address to get another 0.1 coins, but the way things are setup you need to launch the `komodod -pubkey=<your pubkey>` to change the pubkey that is active for a node. That means to change the pubkey being used, the `komodod` needs to be restarted and this creates a lot of issues for any automation trying to do this. Combined with the PoW required, only when 0.1 coins becomes worth a significant effort will faucet leeching return. In that case, the PoW requirement can be increased and coin amount decreased, likely with a faucet2 CC contract as I dont expect many such variations to be needed.





## Chapter 7 - Rewards Example
The next CC contract in complexity is the rewards CC contract. This is designed to capture what most people like about masternodes, without anything else, ie. the rewards!

The idea is to allow people to lock funds for some amount of time and get an extra reward. We also want to support having more than one rewards plan at a time and to allow customization of plan details. One twist that makes it a bit unexpected is that anybody should be able to unlock the funds that were locked, as long as it ends up in the locking address. The reason for this is that SPV servers want to be supported and while locking can be done via normal `sendrawtransaction`, it requires a native node to do the unlocking. By allowing anybody to be able to unlock, then there can be a special node that unlocks all locked funds when they are ready. This way, from the user's point of view, they lock the funds and after it is matured, it reappears in their wallet.

The above requirements leads us to using the global CC address for the rewards contract to lock the funds in. That allows anybody to properly sign the unlock, but of course that is not enough, we need to make sure they are following all the unlock requirements. Primarily that the funds go back to the locking address.

The four aspects of the rewards plan that are customizable are:

`APR`, `minseconds`, `maxseconds`, `mindeposit`

This allows each plan to set a different APR (up to 25%, anything above is becoming silly), the minimum time funds must be locked, the maximum time they are earning rewards and the minimum that can be deposited.

So the `tx` that creates the rewards plan will have these attributes and it is put into the `OP_RETURN` data. All the other calls will reference the plan creation `txid` and inherit these parameters from the creation `tx`. This means it is an important validation to do, to make sure the funding `txid` is a valid funding `txid`.

Since it is possible that the initial funding will be used up, there needs to be a way for more funding to be added to the rewards plan.

Having multiple possible rewards plans means it is useful to have RPC calls to get information about them. Hence: `rewardslist` returns the list of rewards creation `txid`s and `rewardsinfo <txid>` returns the details about a specific rewards plan.

A locking transaction sends funds to the rewards CC address, along with a normal (small) `tx` to the address that the unlock should go to. This allows the validation of the proper unlocking.

All of these things are done in [rewards.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/rewards.cpp), with the validation code being about 200 lines and a total of 700 lines or so. Bigger than faucet, but most of the code is the non-consensus code to create the proper transactions. In order to simplify the validation, specific vin and vout positions are designated to have specific required values:

#### createfunding

```C
vins.*: normal inputs
vout.0: CC vout for funding
vout.1: normal marker vout for easy searching
vout.2: normal change
vout.n-1: opreturn 'F' sbits APR minseconds maxseconds mindeposit
```


#### addfunding

```C
vins.*: normal inputs
vout.0: CC vout for funding
vout.1: normal change
vout.n-1: opreturn 'A' sbits fundingtxid
```

#### lock

```C
vins.*: normal inputs
vout.0: CC vout for locked funds
vout.1: normal output to unlock address
vout.2: change
vout.n-1: opreturn 'L' sbits fundingtxid
```

#### unlock

```C
vin.0: locked funds CC vout.0 from lock
vin.1+: funding CC vout.0 from 'F' and 'A' and 'U'
vout.0: funding CC change
vout.1: normal output to unlock address
vout.n-1: opreturn 'U' sbits fundingtxid
```

It is recommended to create such a vin/vout allocation for each CC contract to make sure that the rpc calls that create the transaction and the validation code have a specific set of constraints that can be checked for.



## Chapter 8 - Assets Example
In some respects the assets CC is the most complex, it was actually the first one that I coded. It is however using a simple model, even for the DEX functions, so while it is quite involved, it does not have the challenge/response complexity of dice.

There are two major aspects to creating tokens. First is to create and track it, down to every specific satoshi. The second is solving how to implement DEX functions of trading assets.

The model used is "colored coins". This means that the token creating txid issues the assets as denoted by all the satoshis, so locking 1 COIN issues 100 million tokens. This multiplication will allow creation of plenty of assets. We want to preserve all the tokens created across all allowed operations. The way this is achieved is that all operations attaches the token creation `txid` in its `OP_RETURN`, along with the specified operation.
Ownership of tokens are represented by the colored satoshis in the CC address for the user's `pubkey`. This allows using the standard UTXO system to automatically track ownership of the tokens. This automatic inheritance is one of the big advantages of UTXO CC contracts that compensates for the slightly more work needed to implement a CC contract.

So now we have the standard CC addresss, list and info commands that provide the CC addresses, list of all tokens and info on specific tokens and the ability to create and transfer tokens. Any amount of tokens can be created from 1 to very large numbers and using standard `addressbalance`, `addressutxo` type of commands, the details of all assets owned can be determined for a specific pubkey.

Now we can solve the DEX part of the tokenization, which turns out to be much simpler than initially imagined. We start with bidding for a specific token. Funds for the `bid` are locked into the global CC address, along with the desired token and price. This creates a `bid` UTXO that is able to be listed via an orderbook RPC call. To fill the `bid`, a specific `bid` UTXO is spent with the appropriate number of assets and change and updated price for the unfilled amount. if the entire amount is filled, then it wont appear in the orderbook anymore.

`asks` work by locking assets along with the required price. Partial fills can be supported and the RPC calls can mask the UTXO-ness of the funds/assets needed by automatically gathering the required amount of funds to fill the specific amount.

With calls to cancel the pending `bid` or `ask`, we get a complete set of RPC calls that can support a COIN-centric DEX.

In the future, it is expected that a token swap RPC can be supported to allow directly swapping one token for another, but at first it is expected that there wont be sufficient volumes for such token to token swaps, so it was left out of the initial implementation.

With just these RPC calls and associated validation, we get the ability to issue tokens and trade them on a DEX!


#### create

```C
 vin.0: normal input
 vout.0: issuance assetoshis to CC
 vout.1: tag sent to normal address of AssetsCCaddress
 vout.2: normal output for change (if any)
 vout.n-1: opreturn [EVAL_ASSETS] ['c'] [origpubkey] "<assetname>" "<description>"
```

#### transfer

```C
 vin.0: normal input
 vin.1 .. vin.n-1: valid CC outputs
 vout.0 to n-2: assetoshis output to CC
 vout.n-2: normal output for change (if any)
 vout.n-1: opreturn [EVAL_ASSETS] ['t'] [assetid]
```

#### buyoffer:

```C
 vins.: normal inputs (bid + change)
 vout.0: amount of bid to unspendable
 vout.1: normal output for change (if any)
 vout.n-1: opreturn [EVAL_ASSETS] ['b'] [assetid] [amount of asset required] [origpubkey]
```

#### cancelbuy:

```C
 vin.0: normal input
 vin.1: unspendable.(vout.0 from buyoffer) buyTx.vout[0]
 vout.0: vin.1 value to original pubkey buyTx.vout[0].nValue -> [origpubkey]
 vout.1: normal output for change (if any)
 vout.n-1: opreturn [EVAL_ASSETS] ['o'] [assetid]
```

#### fillbuy:

```C
 vin.0: normal input
 vin.1: unspendable.(vout.0 from buyoffer) buyTx.vout[0]
 vin.2+: valid CC output satisfies buyoffer (tx.vin[2])->nValue
 vout.0: remaining amount of bid to unspendable
 vout.1: vin.1 value to signer of vin.2
 vout.2: vin.2 assetoshis to original pubkey
 vout.3: CC output for assetoshis change (if any)
 vout.4: normal output for change (if any)
 vout.n-1: opreturn [EVAL_ASSETS] ['B'] [assetid] [remaining asset required] [origpubkey]
```


#### selloffer:

```C
 vin.0: normal input
 vin.1+: valid CC output for sale
 vout.0: vin.1 assetoshis output to CC to unspendable
 vout.1: CC output for change (if any)
 vout.2: normal output for change (if any)
 vout.n-1: opreturn [EVAL_ASSETS] ['s'] [assetid] [amount of native coin required] [origpubkey]
```

#### cancel:

```C
 vin.0: normal input
 vin.1: unspendable.(vout.0 from exchange or selloffer) sellTx/exchangeTx.vout[0] inputTx
 vout.0: vin.1 assetoshis to original pubkey CC sellTx/exchangeTx.vout[0].nValue -> [origpubkey]
 vout.1: normal output for change (if any)
 vout.n-1: opreturn [EVAL_ASSETS] ['x'] [assetid]
```

#### fillsell:

```C
 vin.0: normal input
 vin.1: unspendable.(vout.0 assetoshis from selloffer) sellTx.vout[0]
 vin.2+: normal output that satisfies selloffer (*tx.vin[2])->nValue
 vout.0: remaining assetoshis -> unspendable
 vout.1: vin.1 assetoshis to signer of vin.2 sellTx.vout[0].nValue -> any
 vout.2: vin.2 value to original pubkey [origpubkey]
 vout.3: CC asset for change (if any)
 vout.4: CC asset2 for change (if any) 'E' only
 vout.5: normal output for change (if any)
 vout.n-1: opreturn [EVAL_ASSETS] ['S'] [assetid] [amount of coin still required] [origpubkey]
```


## Chapter 9 - Dice Example
The dice CC contract is actually more complex in the sequences required than the assets/tokens CC. The reason is the need for realtime response by the dealer node, but also having a way to resolve bets if the dealer node is not online. The dice CC contract shows how to build in such a challenge/response mechanism, which likely will be very useful for many other realtime interactive CC contracts.

First, let us describe the issues that the dice CC contract needs to solve. Foremost is that it needs to be random and fair. It should also have realtime response and a fallback timeout in case the realtime response doesnt happen. As with the rewards CC contract, multiple dice plans are supported. Each plan can be customized as to the following:  `minbet`, `maxbet`, `maxodds`, `timeoutblocks`

This allows each plan to control the risk exposure and also advertises to everyone when dicebets expire and a timeout win can be claimed. In event the dealer node does not process a dicebet in time, in order to prevent dealer nodes from simply not responding to dicebets that they lose, a timeout must go to the dicebet player. A short timeframe means that the dealer would need to be running multiple redundant nodes to make sure they can respond in time. If the timeout is set to long, then many players would prefer to use a different dice plan with a shorter timeout.

Now to describe how to ensure a proper random number that is fair. The method chosen was for the dealer node to create transactions with hash of their entropy in the `OP_RETURN`. Then the dicebet player would select a specific entropy tx and include their (unhashed) entropy to their `OP_RETURN`. This allows the dealer node to immediately determine if the dicebet won or lost. If the dicebet included the hash of the bettor entropy, then another step would be needed. However, doing so would allow some timeouts to end with a refund, rather than an automatic win for the dicebet player.

One additional technique used to keep all required data on the blockchain is the dealer entropy value calculation. The vin0 txid is used as one of the `privkeys` to calculate a shared secret and then hashed to remove links to the original `privkey`. This method allows recreating the dealer's entropy value (by the dealer node) given the blockchain itself, which means there is no need for any local storage.

This allows the dealer node to recreate the unhashed entropy value used and so when the dicebet transaction is seen (in the mempool!), the dealer node can immediately determine if it is a winner or a loser. This is done by creating a dealer hash vs. a bettor hash via:

```C
dealer hash: SHA256(dealer entropy + bettor entropy)
bettor hash: SHA256(bettor entropy + dealer entropy)
```

The same values are used, but in different order. The resulting hashes are compared arithmetically for 1:1 bets and the standard industry use is used for the higher odds: https://dicesites.com/provably-fair

The dealer creates a dice plan and then also needs to create entropy transactions. Each win or loss that creates change also creates entropy transactions by the dealer, but timeout transactions wont as it needs to be created by the dealer node to prevent cheating. The dealer `tx` are locked into the global dice CC address, as is the dicebet transaction, which selects a specific entropy `tx` to "roll" against. Then the dicefinish process by the dealer will spend the dicebet outputs either all to itself for a loss, or the winning amount to th dice bettor's address. For dicebets that are not dicefinish'ed by the dealer, anybody is able to do a timeout completion.

#### createfunding:

```C
 vins.: normal inputs
 vout.0: CC vout for funding
 vout.1: owner vout
 vout.2: dice marker address vout for easy searching
 vout.3: normal change
 vout.n-1: opreturn 'F' sbits minbet maxbet maxodds timeoutblocks
 ```

#### addfunding (entropy):

```C
 vins.: normal inputs
 vout.0: CC vout for locked entropy funds
 vout.1: tag to owner address for entropy funds
 vout.2: normal change
 vout.n-1: opreturn 'E' sbits fundingtxid hentropy
```

#### bet:

```C
 vin.0: entropy txid from house (must validate vin0 of 'E')
 vins.1+: normal inputs
 vout.0: CC vout for locked entropy
 vout.1: CC vout for locked bet
 vout.2: tag for bettor's address (txfee + odds)
 vout.3: change
 vout.n-1: opreturn 'B' sbits fundingtxid entropy
```

#### loser:

```C
 vin.0: normal input
 vin.1: betTx CC vout.0 entropy from bet
 vin.2: betTx CC vout.1 bet amount from bet
 vin.3+: funding CC vout.0 from 'F', 'E', 'W', 'L' or 'T'
 vout.0: funding CC to entropy owner
 vout.1: tag to owner address for entropy funds
 vout.2: change to fundingpk
 vout.n-1: opreturn 'L' sbits fundingtxid hentropy proof
```

#### winner:

```C
 same as loser, but vout.2 is winnings
 vout.3: change to fundingpk
 vout.n-1: opreturn 'W' sbits fundingtxid hentropy proof
```

#### timeout:

```C
 same as winner, just without hentropy or proof
```

WARNING: there is an attack vector that precludes betting any large amounts, it goes as follows:
 1. do dicebet to get the house entropy revealed
 2. calculate bettor entropy that would win against the house entropy
 3. reorg the chain and make a big bet using the winning entropy calculated in 2.

In order to mitigate this, the disclosure of the house entropy needs to be delayed beyond a reasonable reorg depth (notarization). It is recommended for production dice game with significant amounts of money to use such a delayed disclosure method.


## Chapter 10 - Channels Example
It might be hard to believe, but channels CC implements an instant payment mechanism that is secured by dPoW in a way that is backward compatible with the existing wallets, explorers, etc. and channels CC does not require both nodes to be online. Its usecases are all the usecases for Lightning Network, it is just more secure, less expensive and backward compatible! The one aspect which some might consider a downside (and others another benefit) is that all payments are onchain. This means it would increase blockchain size, but the idea is for channels CC to be used on blockchains with relatively lower value coins, so a txfee of 0.0001 is not anything significant.

Warning: very confusing blockchain reorganization issues described below. Will be confusing to most people

From a distance, the blockchain is a chain of blocks. One block after the next, each referencing all the prior blocks. Each block containing a group of transactions. Prior to getting into a block, the transactions are broadcast to the network and if it is valid, it enters the memory pool. Each miner then constructs a valid block from these memory pool transactions and when a transaction gets mined (confirmed), it is removed from the memory pool.

That is the simple version!

The reality is quite a bit more complex, but the critical aspect is that the blockchain can (and is) reorganized as part of the expected protocol. This can happen even when there is no 51% attack happening and it is important to understand this process in detail, so here goes.

What happens if two miners find a valid block at the same time? In this case the "same time" means within the time it takes for a block to propagate to the network. When a miner finds a new block, it is broadcast to the network and nodes update and start waiting for the next block. When there are two different (and valid) blocks propagating at the same time, some nodes update with one of the blocks and some the other, lets call it blockA and blockB. Now the nodes will know about both blockA and blockB, but some will consider blockA to be the chaintip and others will consider blockB to be the chaintip.

This is where it gets confusing. Which is the correct chaintip (latest block?). It turns out that both blockA and blockB are valid at this moment in time. So there are actuall two blockchains. We have what is called a small fork! Now dont worry, the protocol will help us converge to a single chain, but in order to do that, we need the next block.

Some miners will be mining from blockA and others from blockB. In most all cases, when the next block is found, it wont be at the "same time" again. So we will end up with a chain that is blockA+blockA2 or blockB+blockB2. Here comes the small reorg! Let's assuming blockA2 was found before blockB2, so that means all nodes that had blockB as the chaintip now see a longer chain blockA+blockA2, which trumps blockB. When that happens, it reorgs the chain so it is on blockA+blockA2. To do this properly, all the transactions that were in blockB are put back into the mempool and blockA is added, then blockA2.

Of course, when blockB2 arrives, the nodes see it but blockB+blockB2 is the same length as blockA+blockA2, so no reorg happens. Since we postulated that blockAs arrived "before" blockB2, that means all nodes are on the same chaintip, including all the miners and the next block found would be blockA3, without any complications.

Believe it or not, this sort of thing is happening all the time, one all blockchains. The chaintip is a volatile thing and that is why more than one confirmation is needed to avoid the small reorgs invalidating blockhash. However, it is possible for more than just the blockhash to change. When the reorg happens, all the transactions in the block are put back into the mempool and then the new blocks are processed in order. So what happens if one of the inputs to a transaction that happened in blockB, gets spent in blockA2? Based on random utxo allocation by wallets this is not impossible if an address has a lot of activity, but if it is part of a 51% attack, then this remote chance of an utxo being spent becomes a certainity! In fact, that is what a 51% attack is.

The attack can go much deeper than just one block. For chains that use the longest chain rule, it can go quite deep indeed. So as all the reorged transactions are put back into the mempool, we feel good that it will get confirmed again. Unfortunately, there is no enforcement of a miner needing to mine any specific transaction in the mempool. And the 51% attacker is intent on mining the transaction that spends an already spent utxo in the reorganized chain. it is called a double spend, but in the reorganized chain, it is spent only once. So it is a bit of a misnomer.

The important thing to understand is that if any transaction has inputs that are signed by a node, it is possible when the chain reorganizes for that transaction to become invalid. This is why dPoW is important as it doesnt strictly use the longest chain rule, but rather the longest notarized chain rule. Once a block is notarized, then it will refuse to reorganize that block (or any block before). So the risk is still there, but only until a notarization. Please see more detailed information about dPoW `<here>`.

Given the above, if you are wondering how can it be possible to have a mempool payment be secured by dPoW. Since it is explained how the reorgs can make valid transactions disappear, it seems unlikely any such solution is possible. However, the CC is very powerful and it can make unlikely things possible.

The following describes how.

We know that any payment that is utxo based can be invalidated via 51% attack, or even an unlikely but not impossible random utxo allocation from a busy wallet. Which means the payment cant be via a utxo. Since the CC system is utxo based, you might think that it means CC cant solve this. However, CC is very powerful and can implement payments that are not utxo based. But before this non-utxo payment method is explained, first we need to solve the mechanics of payment.

At a high level, we want to lock funds into a channel, have this lock notarized so it cant be reorganized. Then payments can unlock funds. Additionally, if we are restricting the payment to just one destination, we also need a way for the sender to reclaim the unused funds. So there needs a way for a close channel notification, which when notarized allows the sender to reclaim all funds. After the channel close is notarized, then the only action possible should be a reclaim of sender funds.

We need to assume that any payment, channel close, reclaim can be reorganized until it is notarized so great care needs to be made that a payment that is made will always be valid. With some allowances for blocks after a channelclose is notarized, we can protect the payments using the logic of "stop accepting payments after a channelclose is seen". It might be that a full notarization of wait time after the channelclose is notarized is needed to provide sufficient time for all the payments to be reprocessed.

Now we can finally describe the requirements for the CC. The locked funds need to be able to be spent by either the sender or receiver, the former only after sufficient time after a channelclose and the latter only after a payment is seen (not just confirmed, but just seeing it should be enough). The protection from reorgs is that the payment itself reveals a secret that is needed for the payment and only the secret would be needed, so it wont matter what utxo is used. To lock funds into a CC address that can handle this we need a 1of2 CC address, which can accept a signature from either of two pubkeys. The additional CC constraints would be enforced to make sure payments are made until the channel is closed.

A hashchain has the nice property of being able to encode a lot of secrets with a single hash. You can hash the hash, over and over and the final hash is the public value. By revealing the next to last hash, it can be verified that it hashes to the final hash. There is a restriction that a hashchain needs to be of reasonable maximum depth, say 1000. That means each iteration of the hashchain that is revealed is worth 1/1000th the total channelfunds. In fact, if the 500th hash value is revealed, half the channelfunds are released. this allows 1/1000th resolution that can be released with a single hash value.

Now we can make the payment based on the hashvalue revealed at a specified depth before the prior released hashchain value. Both the sender and receiver can make a payment to the destination by attaching a hashchain secret. This means even if the sender's payment is reorganized, if the destination has the revealed secret, a replacement payment can be made that is valid. If the destination account isnt monitoring the blockchain, then it wont see the revealed secret, but in this case there shouldnt be value released for the payments that are reorganized. So it would be a case of no harm, no foul. In any event, all the payments end up verifiable on the blockchain to provide verifiability.

Payments at the speed of the mempool, protected by dPoW!

```
<details of rpc calls, vin/vout allocations, etc>
```



## Chapter 11 - Oracles Example
[Oracles CC](https://github.com/jl777/komodo/blob/jl777/src/cc/oracles.cpp) is an example where it ended up being simpler than I first expected, but at the same time a lot more powerful. It is one of the smaller CC, but it enables creation of an arbitrary number of data markets, in a performant way.

In order to gain the performance, some clever usage of special addresses was needed. It was a bit tricky to generate a special address to keep track of the latest data.

Let's back up to the beginning. Just what is an oracle? In this context it is something that puts data that is not on the blockchain, onto the blockchain. Since everything other than the transactions and blocks are not in the blockchain, there is a very large universe of data that can be oracle-ized. It can be literally anything, from the obvious like prices to specific results relative to an arbitrary description.

The most difficult issue about oracles is that they need to be trusted to various degree to provide accurate and timely data. The danger is that if a trusted node is used to write data to the blockchain, it creates a trust point and a single point of attack. Ultimately there is nothing that can ensure only valid data is written to the blockchain, so what is done is to reinforce good behavior via pay per datapoint. However, for critical data, higher level processing is needed that combines multiple data providers into a validated signal.

At the oracles CC level, it is enough that there is financial incentive to provide good data. Also it is needed to allow multiple vendors for each data that is required and to enable efficient ways to update and query the data.
The following are the RPC calls:

```shell
oraclescreate name description format
oracleslist
oraclesinfo oracletxid
oraclesregister oracletxid datafee
oraclessubscribe oracletxid publisher amount
oraclesdata oracletxid hexstr
oraclessamples oracletxid batonutxo num
```

The first step is to create a specific data description with `oraclescreate`, which also defines the format of the binary data. This creates an `oracletxid`, which is used in the other RPC calls. `name` and `description` are just arbitrary strings, with name preferably being a short name used to access the data. The format is a string comprised of a single character per data element:

```C
  's' -> <256 char string
  'S' -> <65536 char string
  'd' -> <256 binary data
  'D' -> <65536 binary data
  'c' -> 1 byte signed little endian number, 'C' unsigned
  't' -> 2 byte signed little endian number, 'T' unsigned
  'i' -> 4 byte signed little endian number, 'I' unsigned
  'l' -> 8 byte signed little endian number, 'L' unsigned
  'h' -> 32 byte hash
```

For example, if the datapoint is comprised of a `4byte` timestamp and an `8byte` number the format string would be: `"IL"`

`oracleslist` displays a list of all the `oraclestxid` and `oraclesinfo` displays information about the specific `oracletxid`. Each `oracletxid` deterministically generates a marker address and a small amount is sent to that address to mark a transaction's relation to the `oracltxid`.

```JSON
{
  "result": "success",
  "txid": "4895f631316a649e216153aee7a574bd281686265dc4e8d37597f72353facac3",
  "name": "BTCUSD",
  "description": "coindeskpricedata",
  "format": "L",
  "marker": "RVqJCSrdBm1gYJZS1h7dgtHioA5TEYzNRk",
  "registered": [
    {
      "publisher": "02ebc786cb83de8dc3922ab83c21f3f8a2f3216940c3bf9da43ce39e2a3a882c92",
      "baton": "RKY4zmHJZ5mNtf6tfKE5VMsKoV71Euej3i",
      "batontxid": "4de10b01242ce1a5e29d5fbb03098b4519976879e05ad0458ef7174ed9127f18",
      "lifetime": "1.50000000",
      "funds": "0.01000000",
      "datafee": "0.01000000"
    }
  ]
}
```

A data `publisher` needs to register a `datafee` and their `pubkey` for a specific `oracletxid`. `datafee` needs to be at least as big as a `txfee`. Using `oraclesregister` the current `datafee` can be updated so a `publisher` can adapt to market conditions. Once registered, subscribers can prepay for some number of datapoints to a specific `publisher` using the `oraclessubscribe` RPC. At first, it is likely that the `publisher` would pay themselves to enable the posting of initial data points so the potential subscribers can evaluate the quality and consistency of the data.

The one final RPC is `oraclessamples`, which returns the most recent samples of data from a specific `publisher`. In order to have a performant solution to track all the potential data streams from all the publishers for all the `oracletxid`, a baton `UTXO` is used. This is an output sent to a specific address and expected to have just a single `UTXO` at any given time to allow for direct lookup. `oraclessamples` requires a starting `txid` to use and with each datapoint having the prior `batontxid`, there is a reverse linked list to traverse the most recent data.

In order to implement this, the following vin/vout contraints are used:

```C
 create:
 vins.: normal inputs
 vout.0: txfee tag to oracle normal address
 vout.1: change, if any
 vout.n-1: opreturn with name and description and format for data
```

```C
 register:
 vins.: normal inputs
 vout.0: txfee tag to normal marker address
 vout.1: baton CC utxo
 vout.2: change, if any
 vout.n-1: opreturn with oracletxid, pubkey and price per data point
```

```C
 subscribe:
 vins.*: normal inputs
 vout.0: subscription fee to publishers CC address
 vout.1: change, if any
 vout.n-1: opreturn with oracletxid, registered provider's pubkey, amount
```

```C
 data:
 vin.0: normal input
 vin.1: baton CC utxo (most of the time)
 vin.2+: subscription or data vout.0
 vout.0: change to publishers CC address
 vout.1: baton CC utxo
 vout.2: payment for dataprovider
 vout.3: change, if any
 vout.n-1: opreturn with oracletxid, prevbatontxid and data in proper format
```

The `oraclesdata` transaction is the most complex as it needs to find and spend the baton `UTXO`, use the correct `datafee` and spend funds from the locked subscription funds. With the above, the oracles CC is complete and allows the creations of massively parallel data streams from multiple vendors that uses free market feedback via payments, ie. poorly performing providers wont get renewals.

I expect that at first, the data providers will just be dapp developers deploying a working system including the required data, but its structure allows open market competition. Of course, specific dapps could restrict themselves to using only publishers from a whitelist of pubkeys. The potential usecases for oracles CC is quite varied and limited only by the imagination.




## Chapter 12 - Limitless Possibilities
As can be seen, CC contracts can do a wide range of things and since they are Turing complete, we know that this is true. However, what is more important is the added security gained from using a UTXO based system. While in some ways it is more complex to have to deal with UTXO, as can be seen by the above examples, it is either solved and made invisible at the RPC level, or actually used as part of the solution.

Being UTXO based, automatically builds in a rate limit to how many tx per block a specific CC contract can do. The state advancing by one transaction at a time is another means that rate limits. Since more UTXO can be made available to increase capacity, it actually offers a way for managing load.

I believe I have made one of the first operational UTXO smart contracts, CC or otherwise and hope that there will be many more developers joining forces to create more foundational CC contracts. Feel free to contact me for feedback on the type of CC contract you want to make. I have not documented all my notes and it could well be I already sort of know how to implement what your want your CC contract to do. Just only so many I can actually make time to code and debug.

Our testing cycle went a lot faster than expected as the bugs found were few and far between. Considering the scope of the assets CC and the realtime response aspects of dice CC, this was quite unexpected. I can only attribute it to the fact that CC validation is just the final validation on top of all the standard bitcoin protocol validations. Not having to worry about double spends is sure a nice luxury, though dont get too complacent about chain rewrites! It is possible to wait for information to be divulged and then reorg the chain to take advantage of this knowledge in a chain which is rewound.

Yes, blockchains are complicated.

## Chapter 13 - Different Languages
The current codebase is integrated into the komodod codebase, which is C/C++. However, it is possible to use different languages and integrate into the C/C++ as zcash has shown by using the rust language for some parts of the `zcashd`.

I think any language that is compiled and can create a linkable library while being able to call and be called by C/C++ functions can be used. If you are able to make such a language binding for a simple CC contract like faucet, this will be good for a 777 KMD bounty. Of course, you need to be the first to submit a properly working pull request.


## Chapter 14 - Runtime Bindings
Once build time linking works, then it is one step away from being able to do runtime linking, ie. dynamically linked libraries. There will be some work required to prevent duplication of eval codes and making sure it is a valid version of the CC contract plugin, but these are issues that have been solved before and I dont see any reason they cant be solved for CC contracts.

This would open up the door for quite an interesting ecosystem of CC plugins that blockchains can subscribe to.

## Chapter 15 - RPC based dapps
Ultimately, I expect there to be so many new RPC calls (one set from each CC contract), that virtually any dapp can be made with RPC calls. We are just at the beginning now, but it is just a matter of time when we get there.

For now, we just need to keep listening to what the market wants as far as dapps go. Then make a new CC contract that enables doing as many of those as possible.

Repeat...

Imagine the scope that will exist after a year or two of continuous new CC contracts being created, along with all the RPC based dapps. I have seen some automatic GUI generators and it could be that for most cases, there can be a special GUI that not only create the dapp's GUI, but also all the RPC calls that are needed to make it work the way it is customized.

This codebase and tools in between the GUI and the RPC level will be a very good area for new initiatives.

---------

## Conclusion
I hope this document has helped you understand what a Komodo utxo based CC contract is and how it is different from the other smart contracts. If you are now able to dive into the cc directory and start making your own CC contract, then I am very happy!

-->
