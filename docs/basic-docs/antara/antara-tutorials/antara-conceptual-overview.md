# Overview of Antara Modules - Part II

## Introduction

Welcome to an <b>Overview of Antara Modules - Part II.</b>

The following content is provided for developers desiring to discover deeper levels of potential in Komodo software. The content covers technical aspects of Antara Modules that are not necessary for a common user to understand. Learning this content can help any developer in the Komodo ecosystem utilize or create new Antara Modules.

#### Assumptions for this Content

This discussion is intended for developers who feel confident in at least one mainstream programming language, and who understand the core concepts of blockchain and Komodo technology.

Other readers, such as business or marketing developers, may also find the content useful, although some topics may be difficult to understand. We invite any interested reader to reach out to our team on [Discord](https://komodoplatform.com/discord) with questions.

Consider reading the following resources, if necessary.

- [Overview of Antara Modules - Part I](../../../basic-docs/antara/antara-tutorials/antara-overview.html#introduction)
- [The Komodo Whitepaper](https://komodoplatform.com/whitepaper)
- [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)

#### Before We Begin: A Brief Note for Non-Blockchain Developers

Creating a new Antara Module is challenging. Fortunately, not every developer in the Komodo ecosystem is expected to program new modules from scratch. Rather, Komodo anticipates that many developers will consume existing modules without attempting to create new modules. 

Each module built on the Antara framework can be designed to have Remote Procedure Calls (RPC's) that can be called quickly and easily from other software and programming languages.

A good example can be seen in the MuSig module. This module uses the Antara framework to enable a complicated and useful technology called Schnorr Signatures. The RPC's for this module allow any developer of essentially any skill level to adopt MuSig functionality into their software without having to gain an in-depth understanding of Schnorr technology.

[See the MuSig module documentation here](../customconsensus/musig.html#introduction)

As the library of available modules grows, so too do the advantages to the many types of developers in the Komodo ecosystem.

## Understanding the Problem that Antara Modules Solve

Antara is Komodo's technology framework that developers use while creating decentralized software. Antara Modules are but one aspect of the wider Antara framework. The modules are a crucial element of the framework, as they allow any capable developer to directly add arbitrary code into the Smart Chain itself.

The reader may better understand the purpose and use case of Antara Modules by first understanding the key problem that they solve.

#### A Consensus Mechanism Is Not Easy to Create or Change

Adding new code into a blockchain's consensus mechanism (CM) is a challenging task. Creating an entirely new CM is more difficult by an order of magnitude. Yet, despite these facts, often when an experienced developer first approaches blockchain technology with creative intent, their initial impulse is to dive directly into the CM itself. As time passes, the developer can come to a realization that they are attempting to solve a problem that is too large for any one person.

Consider the Bitcoin consensus mechanism. This protocol is approximately ten years old and receives perhaps more attention than all other blockchain protocols combined. Every year, thousands upon thousands of the world's most intelligent developers, mathematicians, and cryptographers pore over the intricacies of this profitable technology. Yet, despite this valuable insight, mistakes in the code continue to reveal themselves: in 2018, the Bitcoin Core and Bitcoin Cash teams together [discovered a flaw in the code](https://www.coindesk.com/the-latest-bitcoin-bug-was-so-bad-developers-kept-its-full-details-a-secret) that would have allowed a malicious user to print an arbitrary number of new Bitcoins.

<!-- below: need a link to that flow path for the "viable use case for a blockchain" flow path -->

Mistakes in the code of a CM can cause economic instability, and volatility of this nature can wreak havoc on the lives of the CM's users. For this reason, seasoned blockchain engineers often avoid changing the CM altogether, once it is relatively stable.

For those few projects that create a useful and unique consensus mechanism, a new challenge immediately presents itself. If the CM relies on a Proof of Work type model, the project team must attract a sufficient number of miners. If the CM is more akin to Proof of Stake, the team must ensure the blockchain's total stake is distributed in a manner that ensures trustlessness. Neither of these tasks are easy to achieve.

In light of these challenges, the blockchain engineer finds themselves confronted with a paradox. The engineer desires to create something new, and at the same time, they cannot easily change the core software.

#### A Popular, But Flawed Solution: The Decentralized Virtual Machine

A popular solution to this paradox is to associate the consensus mechanism (CM) with a virtual machine (VM). This method was made popular by the Ethereum project.

In this model, the CM's design can be similar to existing and stable CM's, but it has one difference. The CM listens to instructions given by an external VM that is decentralized across all validating nodes. While code inside the VM can be arbitrary, the CM does not listen to the code's execution. Instead, the CM only listens to the same data as before: the history of transactions and associated meta data.

This solution is more effective than writing an entirely new CM, yet the solution is limited. The limitations include: the requirement of working in the mandatory VM programming language, such as Solidity; an excessive dependency on the core-software development team; volatile economics, and a lack of blockchain processing and storage capacity.

The requirement of the limited programming language derives from security concerns. All validating nodes in the decentralized VM must run all blockchain-related code in the ecosystem. Having this code written in a unique language designed for the VM reduces the available opportunities to malicious actors. While the limitation provides baseline security, the customized and often unstable nature of the VM programming language can make the creative process difficult. Also, the need to master a new language adds an additional burden to the developer.

The dependency on the blockchain's core engineers also slows creative progress for ecosystem developers. When the ecosystem developer discovers a new core-level technology that would increase the developer's productivity and creativity, they must convince the main chain's core-software team to implement the new feature. The core-software engineers, however, may have conflicting interests, as their decisions must meet the needs of all developers and users in their ecosystem.

In many of the VM-based models, economics for blockchain usage can be volatile. The underlying "gas" token that the VM requires (such as Ether) can change in price and value according to the interests of the uneducated masses. This may sound advantageous to a speculator, but a practical business will find that the volatility scares away new users.

The fact that the VM frequently relies on a single blockchain further hinders developers and users. Block space can be in short supply due to high demand on popular chains. Furthermore, data that is entirely irrelevant to the developer can become required baggage.

These challenges make the VM model unpleasant for many experienced blockchain engineers. In fact, before Komodo existed, these very concerns inspired the Komodo engineers to avoid the VM model in search of a better solution. 

Antara Modules provide this solution through Komodo's integration of a technology called CryptoConditions.

## CryptoConditions: An Industry-Wide Standard

CryptoConditions is a technology that allows for arbitrary logical conditions and fulfillments to be evaluated as a part of consensus. This allows for a Smart Chain's consensus mechanism to evaluate the results of arbitrary code and update state in the blockchain's data in a decentralized and secure fashion.

CryptoConditions technology is not a new concept. The [Interledger](https://interledger.org/) team originally proposed this technology in 2016.

The [original proposal](https://tools.ietf.org/html/draft-thomas-crypto-conditions-01) was that it would be an open-source industry-wide standard format. The Interledger team does not seem to have continued exploring the technology beyond the original proposal.

Komodo, on the other hand, found the CryptoConditions concept to be intriguing. In 2018, Komodo adopted this open-source technology into the suite of offerings in our Antara framework.

Our implementation uses many of the key ideas put forth by the Interledger team, and at the same time we depart in several significant ways. Those who are curious for specific details on this topic can explore the open-source code in the respective repositories.

The important takeaway is that Antara Modules rely on a core technology called, CryptoConditions (CC). This technology allows a developer to add arbitrary logical conditions and fulfillment to their Smart Chain, and to rely on the consensus mechanism to ensure state integrity in a decentralized environment.

## Creativity at the Consensus Level, Without Losing the Consensus Mechanism

Antara Modules and CryptoConditions together allow a developer to add arbitrary code at the consensus level, and within the core software's daemon, without interfering with the existing consensus mechanism (CM). This grants the developer the ability to add core-level features and innovations without waiting for the approval of other members of the Komodo ecosystem. Combined with Komodo's Bitcoin-hash rate security, the simplicity of Antara Modules provides the developer with a competitive level of creative freedom.

The entry point between Antara Modules and the CM is a new Bitcoin-script [operation code](https://bitcoin.org/en/glossary/op-code), "OP_CHECKCRYPTOCONDITIONS", or OP_CCC for short. When executed, OP_CCC is able to initiate additional arbitrary code that is written in any programming language, assuming the language can call and execute C/C++ code in return. The arbitrary code is separate from the CM, thus maintaining the CM's reliability. When the arbitrary code completes, OP_CCC returns a `true` or `false` statement to the daemon. If the returned OP_CCC value is `true`, the daemon performs a transaction.

The transaction can contain meta data in the normal manner. Therefore, these transactions can also implement other data-storage features of Komodo software. Examples include the [key-value storage](../komodo-api/blockchain.html#kvupdate) feature, the [Oracles CC Module](../customconsensus/oracles.html#introduction), or the native `vout` and `batontxid` key-value pairs. 

With access to the meta data established, Antara Modules are able to act as an application-state manager. State-related data is held in utxos that are accessible to the CM. As application-state management is based on the utxo model, the management also follows the CM's rules for consensus. This powerful combination allows the developer to collect, organize, and act upon data in a securely decentralized manner.

In addition, once the data is notarized, it can also be called by other Komodo-based Smart Chains, depending on the manner in which the developer(s) form their chain. This allows developers to form clusters of blockchains to enhance their software, as opposed to relying on a single blockchain, or on a single child chain. The speed and data-storage capabilities of a cluster are thus exponentially greater than the offerings of many VM-based competitors.

Also of note is the simplicity of the Antara Module architecture. All new code created for an individual Antara Module is contained in an optional library. Modules from the library are included in compilation only on participating blockchains. In this manner, developers who desire a module's functionality can include the necessary libraries, and those who do not require the module can avoid this excess baggage.

The Komodo daemon has no need of an external VM. This eliminates what would otherwise be a cumbersome requirement for the developer and the core engineers. At the same time, the daemon offers all the capabilities of a VM-based blockchain — ⁠and arguably more.

## Antara Modules In Action: Accomplishing Years' Worth of Work In But A Weekend

Examples of the power of Antara Modules can be found by observing existing modules. Consider how Antara allowed the Komodo ecosystem to swiftly and easily upgrade the Komodo consensus mechanism (CM) to include quantum-proofing capabilities.

In years past, other blockchain projects in the cryptocurrency community had focused on manually upgrading their CM for quantum-proofing protection. Although this feature appeared to be an advantage, this was not true. Adding customized code to the CM itself to protect addresses from quantum-capable computers was a time-consuming and expensive process.

Paradoxically, once the new quantum-proof CM was achieved, it only served to isolate the project team. The code itself was untested and unreliable, and the users of the cryptocurrency community had to endure these roadblocks. Furthermore, the customized CM was often incompatible with much of the activity in the open-source blockchain ecosystem; for each industry-wide technological advancement, the team often had to adapt their customized CM on their own.

Komodo's engineers chose not to spend energy building a new quantum-proof CM, but rather they worked to add Antara Modules first. Once this technology was available, the Komodo core software team took existing quantum-proofing technology, read summaries published by academics and researchers, and created a new Antara Module to add quantum-proofing functionality to the Komodo CM.

The time between project initiation and releasing a beta version for community testing was approximately one weekend. Only one core developer's attention was required. The Komodo daemon remains compatible with all other software features as before, able to quickly adopt new ideas from others in the open-source community as soon as they arrive. At the same time, users who desire quantum proofing for their long-term financial interests have a module readily available, and users who are not interested have not experienced an interruption in their blockchain services.

The ability to adopt the ideas of others quickly, while maintaining the accomplishments, security, and compatibilities of one's predecessors, makes Antara Modules a wise choice for experienced developers who wish to have the most advanced technology available without a significant hassle.
