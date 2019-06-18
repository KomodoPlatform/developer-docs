# Overview of Antara Modules - Part II

## Introduction

Welcome to an <b>Overview of Antara Modules - Part II.</b>

The following content and tutorial are provided for developers desiring to discover deeper levels of potential in Komodo software. The content focuses around Komodo's framework for building Antara Modules. This framework is called, Custom Consensus, or CC for short.

#### Assumptions for this Content

This discussion is intended for developers who feel confident in at least one mainstream programming language, and who understand the core concepts of blockchain technology.

If the developer needs more experience with blockchain technology, the Komodo team recommends that the developer first study the seminal textbook, [Mastering Bitcoin,](https://bitcoinbook.info/) before approaching the Antara Module framework.

#### Note for Other Developers

While creating a new Custom Consensus (CC) module requires a high level of specific blockchain and coding knowledge, developers who do not have this specific knowledge may still benefit from the CC framework.

Each module built on the CC framework can be designed to have API commands that can be called quickly and easily from other software and programming languages. Most CC modules that are added to the core `komodod` software have their API documentation added to this website.

For example, consider the MuSig CC module. This module relies on the CC framework to enable a complicated technology called Schnorr Signatures, which are a new method for creating multi-signature blockchain transactions. The API for this module allows any developer of essentially any skill level to adopt the MuSig functionality into the developer's software without having to gain an in-depth understanding of Schnorr technology.

[See the MuSig module documentation here](../customconsensus/musig.html#introduction)

As the library of available modules grows, so too do the advantages to the many types of developers in the Komodo ecosystem. For this reason, members of the Komodo community express gratitude to the more experienced blockchain developers who build and share CC modules via open-source ideology.

## Conceptual Explanation

Custom Consensus (CC) is a framework for making decentralized applications (dApps). The framework is built in the C and C++ languages. The reader may better understand the purpose and use case of CC by first understanding the key problem that CC solves.

#### A Consensus Mechanism Is Not Easy to Create or Change

Adding new code into a blockchain's consensus mechanism (CM) is a challenging task. Creating an entirely new CM is more difficult by an order of magnitude. Yet, despite these facts, often when an experienced developer first approaches blockchain technology with creative intent, their initial impulse is to dive directly into the CM itself. As time passes, the developer can come to a realization that they are attempting to solve a problem that is too large for any one person.

Consider the Bitcoin consensus mechanism. This protocol is approximately ten years old and receives perhaps more attention than all other blockchain protocols combined. Every year, thousands upon thousands of the world's most intelligent developers, mathematicians, and cryptographers pore over the intricacies of this profitable technology. Yet, despite all this valuable insight, mistakes in the code continue to reveal themselves: in 2018, the Bitcoin Core and Bitcoin Cash teams together [discovered a flaw in the code](https://www.coindesk.com/the-latest-bitcoin-bug-was-so-bad-developers-kept-its-full-details-a-secret) that would have allowed a malicious user to print an arbitrary number of new Bitcoins.

<!-- below: need a link to that flow path for the "viable use case for a blockchain" flow path -->

Mistakes in the code of a CM can cause economic instability, and volatility of this nature can wreak havoc on the lives of the CM's users. For this reason, seasoned blockchain engineers often avoid changing the CM altogether, once it is relatively stable.

For those few projects that create a useful and unique consensus mechanism, a new challenge immediately presents itself. If the CM relies on a Proof of Work type model, the project team must attract a sufficient number of miners. If the CM is more akin to Proof of Stake, the team must ensure the blockchain's total stake is distributed in a manner that ensures trustlessness. Neither of these tasks are easy to achieve.

In light of these challenges, the blockchain engineer finds themselves confronted with a paradox. The engineer desires to create something new, and at the same time, they cannot easily change the core software.

#### A Popular, But Flawed Solution: The Decentralized Virtual Machine

A popular solution to this paradox is to associate the consensus mechanism (CM) with a virtual machine (VM). This method was made popular by the Ethereum project.

In this model, the CM's design can be similar to existing and stable CM's, but it has one difference. The CM listens to instructions given by an external VM that is decentralized across all validating nodes. While code inside the VM can be arbitrary, the CM does not listen to the code's execution. Instead, the CM only listens to the same data as before: the history of transactions and associated meta data.

This solution is more effective than writing an entirely new CM, yet the solution is limited. The limitations include: the requirement of working in the mandatory VM programming language, such as Solidity; an excessive dependency on the core-software development team; volatile economics, and a lack of blockchain processing and storage capacity.

The requirement of the limited programming language derives from security concerns. All validating nodes in the decentralized VM must run all blockchain-related code in the ecosystem. Having this code written in a unique language designed for the VM reduces the available opportunities to malicious actors. While the limitation provides baseline security, the customized and often unstable nature of the VM programming language can make the creative process difficult. Also, the need to master a new language adds an additional burden to the developer.

The dependency on the blockchain's core engineers also slows creative progress for ecosystem developers. When the ecosystem developer discovers a new core-level technology that would increase the developer's productivity and creativity, they must convince the core-software team to implement the new feature. The core-software engineers, however, may have conflicting interests, as their needs must meet the needs of all developers and users in their ecosystem.

In many of the VM-based models, economics for blockchain usage can be volatile, and blockchain storage and speed are often in short supply. The economics can be adversely unpredictable, because the underlying "gas" token that the VM requires (such as Ether) can change in price and value according to the interests of the uneducated masses. This may sound advantageous to a speculator, but for a practical business attempting to consistently please a customer, the volatility can scare away new users.

Furthermore, the fact that the VM frequently relies on a single blockchain further hinders developers and users. Block space can be in short supply due to high demand on popular chains. Data that is entirely irrelevant to the developer can become required baggage while maintaining their own data validation.

These challenges make the VM model unpleasant for many experienced blockchain engineers. In fact, before Komodo existed, these very concerns inspired the Komodo engineers to avoid the VM model in search of a better solution. Custom Consensus is this solution.

#### Custom Consensus: Creativity at the Consensus Level, Without Losing the Consensus Mechanism

Custom Consensus (CC) allows a developer to add arbitrary code at the consensus level, and within the core software's daemon, without interferring with the existing consensus mechanism (CM). This grants the developer the ability to add core-level features and innovations without waiting for other members of the Komodo ecosystem. Combined with Komodo's Bitcoin-hash rate security, the simplicity of CC provides the developer with a competitive level of creative freedom.

The entry point between the CC framework and the CM is a new Bitcoin-script [operation code](https://bitcoin.org/en/glossary/op-code), "OP_CHECKCRYPTOCONDITIONS", or OP_CCC for short. When executed, OP_CCC is able to initiate additional arbitrary code that is written in any programming language, assuming the language can call and execute C/C++ code in return. The arbitrary code is separate from the CM, thus maintaining the CM's reliability. When the arbitrary code completes, OP_CCC returns a `true` or `false` statement to the daemon.

If the returned OP_CCC value is `true`, the daemon performs a transaction. The transaction can contain meta data in the normal manner. As an aside, these transactions can implement other data-storage features of Komodo software. Examples include the [key-value storage](../komodo-api/blockchain.html#kvupdate) feature, the [Oracles CC Module](../customconsensus/oracles.html#introduction), or using the native `vout` and `batontxid` properties of a utxo as a database (see the [Rogue CC Module](../customconsensus/rogue.html) for an example). 

With access to the meta data established, CC is able to act as an application-state manager. State-related data is held in utxos that are accessible to the CM. As the application-state management aspect of CC can be based on the utxo model, the application-state aspect can follow the CM's rules for consensus. This powerful combination allows the developer to collect, organize, and act upon data in a securely decentralized manner.

In addition, once the data is notarized, it can also be called by other Komodo-based asset chains, depending on the manner in which the developer(s) form their chain. This allows developers to form clusters of blockchains to enhance their software, as opposed to relying on a single blockchain, or on a single child chain. The speed and data-storage capabilities of a cluster are thus exponentially greater than the offerings of a VM-based competitor.

Also of note is the simplicity of the CC architecture. All new code created for the Quantum-Proof module is contained in an optional library. Modules from the library are included in compilation only on participating blockchains. The Komodo daemon has no need of an external VM. This eliminates what would otherwises be unnecessary baggage for the developer and the core engineers, and yet the daemon offers all the capabilities of a VM-based blockchain -- and arguably more.

With the CC framework in place, the developer may add to their blockchains whatever creativity the developer can imagine.

#### Custom Consensus In Action: Accomplishing Years' Worth of Work In But A Weekend

Examples of the power of Custom Consensus (CC) can be found by observing existing modules. Consider how CC allowed the Komodo ecosystem to swiftly and easily upgrade the Komodo consensus mechanism (CM) to include Quantum-Proofing capabilities.

In years past, other blockchain projects in the cryptocurrency community had focused on manually upgrading their CM for Quantum-Proofing protection. Although this feature appeared to be an advantage, this was not true. Adding customized code to the CM itself to protect addresses from Quantum-capable computers was a time-consuming and expensive process. Paradoxically, once the new Quantum-Proof CM was achieved, it only served to isolate the project team. The code itself was untested and unreliable, and the users of the cryptocurrency community had to endure these roadblocks. Furthermore, the customized CM was often incompatible with much of the activity in the open-source blockchain ecosystem; for each industry-wide technological advancement, the team often had to adapt on their own.

Komodo's engineers chose not to spend energy building a new Quantum-Proof CM, but rather they worked to add CC first. Once CC was available, the Komodo core software team took existing Quantum-Proofing technology, read summaries published by academics and researchers, and created a new CC module to add this functionality to the Komodo CM.

The time between project initiation and releasing a beta version for community testing was approximately one weekend. Only one core developer's attention was required. The Komodo daemon remains compatible with all other software features as before, able to quickly adopt new ideas from others in the open-source community as soon as they arrive. At the same time, users who desire Quantum-Proofing for their long-term financial interests have a CC tool readily available, and users who are not interested or are unaware have not experienced an interruption in their blockchain services.

The ability to adopt the ideas of others quickly, while maintaining the accomplishments, security, and compatibilities of one's predecessors, makes Custom Consensus a wise choice for experienced developers who wish to maintain a long-term course of productivity and creativity in their work.
