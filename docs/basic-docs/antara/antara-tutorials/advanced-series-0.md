# An Advanced Approach to Komodo's Antara Framework

## Introduction

The following content is provided for the experienced C/C++ developer who desires to create new Antara Modules for Komodo Smart Chains. 

The content herein provides introductory instruction that can allow the developer to more easily read existing Antara-related code and follow advanced tutorials that examine specific Antara Modules.

## Link to Learning Path Outline

The following tutorial series is intended for advanced Komodo developers who intend to manipulate the default software setup. Please review the placement of this tutorial in [the Learning Path Outline section.](../../../basic-docs/start-here/learning-launchpad/learning-path-outline.html#step-15-begin-the-advanced-development-tutorial)

## Antara Encompasses Several Technologies

The Antara Framework greatly enhances blockchain functionality. Antara allows a developer to use their Smart Chain's consensus mechanism to enforce arbitrary code. Antara even allows clusters of Smart Chains to work together in this effort. 

The level of freedom this grants to the blockchain developer is sometimes difficult to comprehend until one has either seen the technology in action or engaged with the technology directly.

The Antara Framework takes into account several different advanced technologies. To limit the scope of our introduction, for now we focus only on one crucial aspect: "CryptoConditions," or "CC" for brevity.

## A Less Conceptual Discussion of CryptoConditions 

#### CryptoConditions in Brief

CryptoConditions is a technology that allows for logical conditions and fulfillments to be evaluated as a part of consensus. 

##### CryptoConditions is Based on an Industry-Wide Proposed Standard

CryptoConditions technology is not a new concept. The [Interledger](https://interledger.org/) team originally proposed this technology in 2016. 

The [original proposal](https://tools.ietf.org/html/draft-thomas-crypto-conditions-01) was that it would be an open-source industry-wide standard format. The Interledger team does not seem to have continued exploring the technology beyond the original proposal. 

Komodo, on the other hand, found the CryptoConditions concept to be intriguing. In 2018, Komodo adopted this open-source technology into the suite of offerings in our Antara Framework.

Our implementation uses many of the key ideas put forth by the Interledger team, and at the same time we depart in several significant ways. Those who are curious for specific details on this topic can explore the open-source code in the respective repositories. 

##### A Brief Description of Komodo Enhancements

At the simplest level, CryptoConditions operates with electronic signatures and hashes. The Komodo team enhanced CryptoCondition technology beyond the original specifications. Our implementation allows for a Smart Chain's consensus mechanism to evaluate the results of arbitrary code and to update state in the blockchain's data in a decentralized and secure fashion.

The important takeaway is that the Antara Framework encompasses several underlying technologies, one of which is CryptoConditions (CC). This technology allows a developer to add several enhancements to their Smart Chain. These enhancements include complex logical conditions and fulfillments, and arbitrary code. The enhancements rely on the consensus mechanism to ensure state integrity in a decentralized environment.

#### CryptoConditions Depends Upon Transactions and Booleans

At the most fundamental level, blockchain data is advanced only through transactions. A blockchain itself is nothing but a list of transactions, bound into blocks. By design, each transaction must be confirmed by the consensus mechanism.

Therefore, all decentralized data that a developer wishes to create or use with their arbitrary code must first be added to a transaction. This transaction is then passed through the consensus mechanism. Transactions that are successfully confirmed are finally added to the blockchain, and therefore the data is also added.

To take advantage of this functionality, a developer adds customized source code to the Antara Framework to form a new module. Whenever a relevant transaction occurs on the blockchain, the consensus mechanism calls the developer's module, validates the logical conditions and fulfillments as put forth by the arbitrary code, and either confirms or denies the transaction.

To simplify this process, Antara requires that the developer build their module such that each CryptoConditions (CC) transaction returns a boolean value as a part of the final results. If the returned boolean value is `true`, the transaction is approved.

With this framework in place, the developer can also add any other data to be saved as a part of the transaction.  This data is included in a special part of the transaction called an [<b>OP_RETURN</b>](https://en.bitcoin.it/wiki/OP_RETURN), or <b>opreturn</b> for brevity. We will discuss opreturns in greater detail further on.

Through Antara, the developer receives a powerful tool for creating and executing decentralized arbitrary code. A developer can also add data to any transaction, and their Smart Chain can utilize this data in future executions of arbitrary code. The primary requirement is that the arbitrary code return a meaningful boolean value as a part of the final result. 

#### Building an Antara Module is Harder Than Creating a Balance-Based Smart Contract 

Antara Modules are fundamentally different than the "smart contracts" that are familiar on other blockchain platforms. The key difference is that Antara Modules directly rely on ["unspent transactions,"](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept) which are called "utxos" for brevity. Balance-based smart contracts, on the other hand, rely on the total balance of funds held within an address.

Utxo-based modules are harder to create than balance-based smart contracts. However, because utxo-based modules leverage the existing Bitcoin-utxo system, they result in more powerful functionality that can even be more secure than a smart contract.

For example, within balance-based smart contracts transactions do not have to pass a full review by the consensus mechanism of the underlying blockchain. Instead, most of the transaction verification happens within [a decentralized virtual machine](https://bitcoin.eu/top-8-blockchain-virtual-machines-for-decentralized-applications/) that executes code written by a developer.

In this situation, all developers involved in a smart contract must maintain a high level of programming awareness to avoid disasters, such as those seen in [the Parity Attack.](http://hackingdistributed.com/2017/07/22/deep-dive-parity-bug/) Furthermore, a typical smart contract has access to the full balance held in the wallets of all users who are actively engaged with the contract. If a developer makes a mistake in their code, the full balance associated with the smart contract is vulnerable.

In a utxo-based module these risks are reduced. One reason utxo-based modules are more secure is that every update of the blockchain's state must be executed as a Bitcoin-protocol based transaction — as opposed to using a virtual-machine with a developer-created transaction. Creating a transaction that passes the Bitcoin protocol's security checks, while more challenging, grants a higher level of security to the final code.

Furthermore, any mistakes that a developer does make in a utxo-based module risk only those funds that are held in utxos that are committed to the Antara Module — as opposed to the entire balance of the wallet associated with a smart contract.

Balance-based smart contracts that use the popular virtual-machine model cannot compare to the security measures offered by the Bitcoin-protocol's consensus mechanism that is featured in a Komodo Smart Chain.

As the developer engages with Antara Module development, they can learn how utxo-based modules allow for increased speed in achieving consensus, greater simplicity in software architecture, more flexible functionality between Smart Chains, and many more superior features.

#### A Brief Look at an Antara Module Template

The following file, `customcc.cpp`, is a blank template a developer can use when beginning the creation of a new Antara Module. Take a brief look to familiarize yourself with the essential layout.

[<b>Link to customcc.cpp file</b>](https://github.com/jl777/komodo/blob/dev/src/cc/customcc.cpp)

The key takeaway is that the entrypoints to Antara's CryptoConditions technology are broken down into a few functions and tables. Once the developer grasps the nature of working with these entry points, building Antara Modules becomes a simple exercise in the common aspects of software development. 

Komodo already offers many SDK functions, tutorials, and best practices to simplify the learning curve and development process, and we continue to develop more of these sources of assistance.  

Before the developer can begin creating new Antara Modules, there are several key concepts to understand in the Bitcoin Protocol.

------------

[<b>Link to Next Tutorial in the Advanced Series</b>](../../../basic-docs/antara/antara-tutorials/advanced-series-1.html)
