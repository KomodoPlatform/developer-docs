# A Brief History of UTXO-based Blockchain Contracts

## With Respect to the Komodo, Cardano, Bitcoin, Ethereum, and Interledger Projects

The concept of blockchain-based logical contracts extends to the earliest roots of the Bitcoin protocol and the work of Satoshi Nakamoto.

Current innovation in this niche of the blockchain industry shows a variety of key players searching for the most effective and powerful methods to bring contract technology to the general public.

A key development is the progression of blockchain ecosystems that offer contracts that rely on UTXO technology. UTXO-based contracts are unique compared to the more common Account-based contracts found on many other current blockchain platforms.

The Bitcoin, Interledger, Komodo, and Cardano projects are all intimately involved in this development, and competition is likely to arise between the latter two in the near future.

This paper provides a synopsis and explanation of the relevant concepts that are pertinent to members of the Komodo business and marketing team.  

#### Understanding the Following Content Requires Dedicated Study

The following concepts are relatively simple, once understood. 

However, gaining an understanding of how these UTXO-based contracts function is not a topic that can be approached through a simple blog post. 

Any Komodo team member representing Komodo on these topics will need several to dedicate several hours of time to gain a working understanding of these topics. 

This topic can (and in the future likely will) require an entire textbook for a reader to gain masterful understanding. 

Fortunately, much of the necessary content for the Komodo marketing team to speak on these subjects is already documented through the collective efforts of many of the Komodo team members.

When questions arise during the course of study, please reach out to @Bryan\_Beus on the Komodo Discord Server.

## The Beginning of UTXO-based Contracts

#### Understanding a UTXO

UTXOs are a fundamental aspect of blockchain protocols. Yet, understanding what they are and how they function can sometimes be surprisingly difficult. 

The Official Komodo Documentation contains detailed explanations of UTXOs, and the discussion recommends the reader to read through the linked article below before continuing further in the discussion.

[Link to Introduction to UTXO Documentation Explanation](http://developers.komodoplatform.com/basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept)

Having read the above article, the reader should have a conceptual understanding of UTXOs. 

##### Simple Summary of the Above Article

As discussed in the article above, a UTXO can be described as a "digital bill" that resides in the user's digital wallet.

The size of a UTXO is determined by the variable amount of the money sent by a user to a new address.

Each time a user performs a transaction on a blockchain, they consume a UTXO from their local wallet and send the amount of money it contains to a destination address.

This creates a new UTXO in the destination address.

## Digging Deeper Into UTXOs

To understand how Interledger, Komodo, and Cardano function in regards to UTXO contracts, the discussion requests the reader to also read the following article.

Read only up to the heading, "Formation of a Transaction," and then stop. The reader will return to finish this article later.

[Link to Advanced Discussion of UTXOs](http://developers.komodoplatform.com/basic-docs/antara/antara-tutorials/advanced-series-1.html#formation-of-a-transaction)

After reading the article, the reader should understand that a UTXO is comprised of "vins" and "vouts." 

These terms stand for "vector in" and "vector out." 

The inward vector consumes money from an unspent transaction (thus rendering that transaction "spent"), and allocates the money to outward vectors. The outward vectors are new "unspent transactions," or UTXOs.

Furthermore, the article introduces the reader to the concept of a "Bitcoin Script." This is where the relevant portion of the discussion here truly begins. 

Before discussing Bitcoin Scripts, the following summary of UTXO structure and terminology is provided. 

The concept of a "coinbase transaction" in the content below was not discussed previously. Coinbase transactions are featured in the Cardano paper, and therefore they are introduced here.

## A Summary of UTXO Structure and Function

Money in a Bitcoin and UTXO-based blockchain protocol is created and transferred in the following manner.

##### Coinbase Transactions

Money is created and added to a blockchain's total supply via a **"Coinbase Transaction."**

A coinbase transaction is different from a normal transaction in that the coinbase transaction is able to mint new coins on the blockchain. 

When a miner mines a block on the Bitcoin blockchain, the rewards they receive are created "out of thin air" via a coinbase transaction.

This coinbase transaction is special. Other transactions, typically, are not allowed to mint new coins. They can only utilize existing funds that are available to the user performing the transaction.

As a part of minting new coins, the coinbase transaction immediately places the coins in the preferred wallet of the miner.

These coins are now held in the miner's wallet as a UTXO.

##### A Normal Transaction

A normal transaction consumes coins from the "vector outs" or "vouts" of previous transactions. These vouts can be found in coinbase transactions and normal transactions. 

The normal transaction then allocates the consumed coins to new location(s).

Any money that is consumed from an unspent transaction but not allocated to a destination address is automatically given to the miner that mines the transaction. This is how fees are offered to miners.

##### Summary of UTXOs

UTXOs are simply digital bills that reside in a user's local wallet and have not yet been spent.

UTXOs are consumed by transactions. 

The total value consumed is sent to one or more new addresses. 

Each amount of coins in the destination address is now a new "unspent transaction," or UTXO.

## Scripts in Bitcoin

Bitcoin Script is a separate programming language. All transactions that are executed on a Bitcoin-based blockchain, such as Komodo, rely for their foundation on Bitcoin Script. 

This language is purposefully limited. More details about Bitcoin Script can be found at the linked address below. The discussion here encourages the reader to read this content.

For now, read only up to the heading, "Gas-based Smart Contract Platforms," and then stop for now. Later in this discussion, the reader will return to this section and read the remaining content.

[Overview of Antara Modules - Part I](http://developers.komodoplatform.com/basic-docs/antara/antara-tutorials/overview-of-antara-modules-part-i.html#introduction)

As discussed in the article, Bitcoin Script provides the simple functionality necessary to transfer coins from one address to another. 

#### Diving Deeper into Bitcoin Script

A Bitcoin-protocol based blockchain, such as Komodo, executes Bitcoin Script each time a transaction is performed.

The type of Bitcoin Script logic that is executed depends upon the transaction itself. 

Included in the transaction data is a short sequence of numbers that tells the Bitcoin protocol how it should regard the transaction hash.

This short sequence is called an "Op Code."

A transaction hash can appear as follows, but the data is not readable by normal methods.

The reader will not be able to detect the data in the transaction hash itself, as the data is encoded; the transaction hash is included for display purposes only.

```
04ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84c
```

The Bitcoin protocol knows how to find and translate the op code automatically.

In a normal transaction hash, such as the one above, the Bitcoin protocol will decode the data and find an op code. In the case above, the op code turns out to be a hashed version of `172`.

This stands for `OP_CHECKSIG`. 

This op code instructs the Bitcoin protocol to perform a normal transaction: Simply check that the signature found in the transaction data (also coded into the transaction hash above) matches the required signature to spend funds from the requested UTXO.

When the Bitcoin protocol sees this simple op code, it calls the associated computer logic (the code written by Satoshi Nakamoto in the Bitcoin Script language for checking transaction signatures). 

The logic executes and detects that the signatures are valid. 

The money from the transaction's requested UTXO is spent to the destination address. (The specific destination address is also included in the encoded transaction data.)

#### Types of Op Codes

The op code above, `OP_CHECKSIG`, which is represented to the Bitcoin protocol by the numbers `172`, instructs the Bitcoin protocol to perform a normal transaction.

There are other types of op codes that can be included with a transaction.

The discussion here encourages the reader to view the following Bitcoin wiki page to skim briefly over the full list of available op codes.

[Link to Bitcoin Wiki Page](https://en.bitcoin.it/wiki/Script#Opcodes)

Op codes are used together to create transactions. More than one op code can be included in a transaction.

Op codes and Bitcoin script are not a full programming language. The op codes available in the Bitcoin protcol are just enough to create simple transactions.

A popular op code that the Komodo team uses for atomic swaps is the OP\_CHECKLOCKTIMEVERIFY.

This op code is viewable on the linked wiki page above.

On use case of OP\_CHECKLOCKTIMEVERIFY is the ability to allow a developer to set a timeout for a transaction. This is essential for atomic swaps, wherein a user's trading partner may fail to complete their half of the requirements and a refund is necessary.

#### The Types of Transactions

The discussion now requests that the reader finish reading the following article. 

[Link to "Formation of a Transaction"](http://developers.komodoplatform.com/basic-docs/antara/antara-tutorials/advanced-series-1.html#formation-of-a-transaction)

The second half of this familiar article informs the reader of the three most common types of transactions on the Bitcoin blockchain. 

These three transactions make up perhaps 99% of all BTC transactions. The remaining 1% of transactions are of more obscure op-code types, including the OP\_CHECKLOCKTIMEVERIFY type. 

The most common type of transaction is the simple quantum-proof transaction that utilizes a "change" address.

The article also introduces the reader to the manner in which the Komodo blockchain offers contracts: OP\_CHECKCRYPTOCONDITION.

This new op code is the entryway into the Komodo Platform's "Antara Modules."

More on this is discussed later.

## Approaching the Current Developments by Returning to the Beginning of the Bitcoin Blockchain

The idea of creating digital contracts is nothing new. The author of this discussion has often read that many of the current concepts in the blockchain industry were initiated in the 1980's with the advent of computer-based transaction processing systems.

The problem in the 80's, of course, was that there was no method to enforce a digital contract, should a participant become malicious.

Blockchain provided an opportunity for enforcement, based on mining power or stake ownership.

Satoshi Nakamoto was well aware of the concept of contracts, and the seeds for contract enforcement are found in the op codes described above.

Initially, the Bitcoin protocol allowed for a wide range of op codes.  While the feature provided a wide range of flexibility, the feature was short-lived due to code instability.

_(As an aside, one of the Bitcoin Cash project's efforts to differentiate from BTC includes the reinstatement of the original op codes offered by Satoshi Nakamoto. [This article contains more information.](https://news.bitcoin.com/bitcoin-cash-milestones-delivered-code-upgrades-and-platform-development/)_

One could describe many of the op codes as a miniature smart contracts. For example, in `OP_CHECKSIG`, a condition is set forth that must be met: the spender of the designated UTXO must be able to produce a valid signature. If a user sends a transaction that attempts to spend the UTXO, and the transaction is able to create a valid signature, the contract is fulfilled.

Technically, a developer can use the existing op codes to execute smart contracts that offer some of the functionality featured in popular platforms, such as Ethereum.

In fact, the original version of AtomicDEX utilized this functionality extensively when performing atomic swaps.

However, op codes are limited in nature and are a cumbersome method for problem solving. 

After introducing op codes in the Bitcoin protocol, and reducing their number, Satoshi Nakamoto no longer focused on the contract-aspect of blockchain technology. 

## Ethereum and Account-Based Smart Contracts

The popular platform, Ethereum, is likely familiar already to the reader. 

There are a few important concepts to understand about Ethereum for the purposes of this conversation.

The main blockchain in the Ethereum ecosystem (here the discussion does not delve into the Ethereum team's stated intent of future development goals) is a basic blockchain protocol. 

It does not run on the Bitcoin protocol.

Users can send Ethereum's currency coins, Ether, to addresses.

To create Smart Contracts, Ethereum offers a decentralized virtual machine. It is called the Ethereum Virtual Machine, or EVM.

This machine is a virtual operating system that runs simultaneously on computers around the world. 

EVM is designed by the Ethereum team. EVM is limited in nature to run code that is written only in a programming language, Solidity, that is designed and controlled by the Ethereum team.

The main Ethereum blockchain protocol is designed to allow the EVM to communicate with the blockchain. The blockchain by itself does not execute smart contracts; only EVM can perform a contract.

To create a smart contract on Ethereum, a developer writes the code for their smart contract in Solidity, launches both the blockchain software and EVM, and executes the smart contract code in EVM. 

EVM sends the code written by the developer to other instances of EVM running on other user machines around the world. The decentralized EVM collaborates across all these devices to mutually validate the code written by a developer.

As a part of this process, EVM will, as directed by the developer, communicate with the main Ethereum blockchain to move Ether coins and insert any meta data as necessary. 

This is the basic concept of the Ethereum smart contract set up. 

An advantage this machine offers is that it is quick and easy to create. Virtual machine technology is not new, and the creation of a new language, Solidity, is not an impossible task. 

The speed and flexibility of this setup is a key advantage of the Ethereum offering, and a person can argue that the focus on speed may be a primary contributor to Ethereum's success.

There are notable downsides to this setup, many of which the reader is already familiar. These disadvantages can include the fact that the Ethereum blockchain is largely unusable during times of congestion, during moments of peak activity, due to the single-chain nature. Efforts to scale have thus far proven unfruitful.

#### Ethereum Smart Contracts are Account Based

When a developer opens a smart contract on Ethereum, the smart contract is intricately connected to every token issued by this smart contract.

When a user of the smart contract executes a function offered by the smart contract, the contract extracts the costs from the user's total value in their smart-contract account.

When the code for a smart contract is reliable, the account-aspect of the EVM model is of no concern. However, unreliable smart-contract code can make vulnerable the entire value held in the associated accounts.

Many well-known attacks have exploited the account-aspect of the EVM model to drain developers and users of the full balance of their associated wallets.

#### Summary of Ethereum

Ethereum is a popular platform that uses a single main blockchain, an associated virtual machine, and account-based smart contract execution to offer smart contracts. 

This simple and flexible setup has proved to be arguably the most powerful combination in the early age of smart-contract technology. However, the ability to scale this type of system is proving to be excessive, and the vulnerabilities of account-based contracts have given users cause for concern.

## Interledger's Research and Design

The Interledger project is a arguably one of the largest and most important players in the 

