# Common Terminology and Concepts

## 51% Attack

A 51% attack is a dangerous event wherein an attacker uses the fair rules of blockchain technology to "steal" an item of value from their intended victim.

A Komodo Smart Chain that uses the Komodo Notary Node dPoW service receives protection from the 51% Attack.

#### Process of Conducting a 51% Attack

In a 51% Attack, an attacker first performs a transaction that spends funds to their intended victim.

Once the victim distributes to the attacker the purchased item of value, the attacker then provides 51% of the total hash rate of the blockchain network to support a version of the blockchain history wherein the transaction never took place.

The attacker must maintain this hash rate long enough for the "false" version of history to become so deeply embedded, removal is impossible. Once accomplished, the attacker may discontinue their hash rate and leave with their spoils.

#### Komodo's dPoW Security Service is Designed to Prevent 51% Attacks

The Komodo blockchain's consensus mechanism protects Komodo Smart Chains from 51% Attacks. For more information, see the [Delayed Proof of Work Core Technology Discussion.](../../../basic-docs/start-here/core-technology-discussions/delayed-proof-of-work.html#the-51-attack)

## Antara Address

An Antara Address is a user address that is uniquely associated with a single Antara Module.

The Antara Address is based in part on the private key associated with the pubkey that the user provides during the initiation of an Antara-enabled Smart Chain instance.

The Antara Address is different from a normal base58 encoded address, as the Antara Address also takes into account other information besides the pubkey's private key. The additional information includes an EVAL code that is unique to the Antara Module associated with this Antara Address.

For more information, see the [Understanding Antara Addresses section here.](../../../basic-docs/antara/antara-tutorials/understanding-antara-addresses.html)

## Antara Customization

An Antara Customization is a blockchain-functionality enhancement created by the Komodo team to add features that extend the capabilities of the default Bitcoin/Zcash protocol fork, upon which Komodo is based.

Antara Customizations are activated at runtime using special parameters.

For more information, see the [Antara Customizations section here.](../../../basic-docs/antara/antara-setup/antara-customizations.html)

## Antara Framework

The Antara Framework is a collection of features and functionality created by the Komodo developers to enhance the capabilities available to a Smart Chain developer.

The framework includes Antara Customizations, Antara Modules, Antara Smart Chain Composer (coming soon), among other Komodo technologies.

## Antara Module

An Antara Module is a Smart Chain enhancement that allows for arbitrary code to be included and evaluated as a part of achieving consensus.

Most developers use Antara Modules without directly engaging with the arbitrary code of the module.

Advanced developers can develop new modules by adding new arbitrary code into a new Antara Module.

## Asset

An asset in the Komodo ecosystem typically refers to a blockchain coin or token that represents value to the holder.

Assets can represent both digital and real-world valuables. However, enforcing blockchain asset behavior on real-world valuables requires an arbitrating party, such as a legal system or physical security service.

## Atomic Swap

An atomic swap is an exchange of assets that takes place between two separate and unconnected blockchains.

Atomic swap technology is unique in that it requires no middleman to hold the assets in escrow during the process of exchange. Instead, users retain the private keys to their funds until the precise moment the exchange occurs.

Should either party fail to complete the trade, Komodo's atomic-swap software ensures that all parties receive their funds in return, and neither side receives a reward for the failure.

For more information, [discover the AtomicDEX Introduction section here.](../../../basic-docs/atomicdex/atomicdex-tutorials/introduction-to-atomicdex.html)

## Block

A block is a collection of transactions.

In the Komodo ecosystem, by default miners and stakers on a Smart Chain network create a new block every minute. Each block contains transactions that were created by users since the previous block.

Various block customizations are available in the [Antara Customizations section.](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-blocktime)

## Block Explorer

A block explorer is a website that allows users to query information about a particular blockchain.

Users can request information about a specific transaction, block, address, and more.

## Block Reward

A block reward is a financial reward given to the miner or staker who finds the nonce necessary to create a new valid block hash.

Because the Komodo ecosystem and the KMD main chain are designed to avoid competing directly with the Bitcoin hash rate, KMD also features a different kind of block reward.

Users automatically receive a monthly 5.1% Reward (given in KMD) for holding +10KMD in any address on the KMD main chain.

This reward derives from the funds that would otherwise be granted to a miner on a competitive Proof-of-Work based blockchain.

For more information, see the [Rewards section.](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#details-regarding-kmd-main-chain)

## Burn

In various instances, a user can "burn" cryptocurrency assets by sending the assets to an address from which recovery is provably impossible. The address in this situation is called a "burn address."

Burn addresses can only receive funds. These addresses do not have associated private keys necessary for spending, and this can be verified using publicly available encryption tools.

## CC Address

"CC Address" is another name for an [Antara Address.](#antara-address)

The term "CC Address", however, is used only among developers of Antara Modules, as this activity involves directly managing CryptoConditions (CC).

## CC Transaction

A CC transaction is a transaction that is directly associated in any way with an Antara Module.

A normal user would not call these types of transactions "CC transactions," but would instead call them "transactions" as normal.

## Centralized Exchange (CEX)

A centralized exchange is a corporate entity that allows users to send cryptocurrency funds into the care of the corporation to hold in escrow while the user trades for alternate currencies with other users.

For more information about centralized exchanges, [read the Introduction to AtomicDEX here.](../../../basic-docs/atomicdex/atomicdex-tutorials/introduction-to-atomicdex.html#why-is-atomicdex-special)

## Cluster

A "cluster" can refer to a Smart Chain Cluster in the Komodo ecosystem.

A Smart Chain cluster is a collective of Smart Chains that act in unison to manage a single coin supply, or to serve a unified purpose that requires multiple chains acting under a compatible directive.

This technology uses Komodo Antara Cross-Chain Syncing ("MoMoM") to function.

## Coinbase

To add coins into the total coin supply of a blockchain, the blockchain must mint new coins.

This minting process occurs in a special transaction that is included as the first transaction in each block of the blockchain.

This transaction is called the `coinbase` transaction.

## Confirmation

Confirmation typically refers to the confirmation of a block.

A block is confirmed when a miner or staker submits a correctly formed block hash to the network for processing and the blockchain network accepts this block hash into the blockchain history.

## Consensus Mechanism

A consensus mechansim is a core aspect of any blockchain software. The consensus mechanism is the aspect of the software's code that collects all publicly available information, performs calculations to ensure that the history of the chain is proceeding in an honest manner, and sends the final result to be added to the chain of block histories that have come before.

Komodo software builds upon the Bitcoin consensus mechanism by default. The Bitcoin protocol is arguably the most secure and well tested consensus mechanism in existence, and therefore this provides Komodo users with a strong degree of security in any associated Komodo technology.

## Cross-Chain Syncing

Cross-Chain syncing is the process by which Smart Chains in the Komodo ecosystem are able to make actionable information on one chain available to another participating chain.

For more information, [read the Crosschain API documentation.](../../../basic-docs/smart-chains/smart-chain-api/crosschain.html)

## CryptoCondition (CC)

A CryptoCondition is a conditational statement that is evaluated by the consensus mechanism. CryptoConditions allows for arbitrary logical requirements and fulfillments to be evaluated during runtime.

For more information, [read the Advanced Development Tutorial Series.](../../../basic-docs/antara/antara-tutorials/advanced-series-0.html)

## Daemon

A daemon is an instance of software running on the user's machine. Typically, the word "daemon" refers to a software process that runs in the background on the user's node, as opposed to running in a manner that would require constant direct engagement.

The name of the Komodo Smart Chain software, "komodod," is an abbreviation of "Komodo Daemon."

## Decentralization

Decentralization is the movement of transferring any subject from centralized parties and individuals to decentralized parties.

In blockchain, decentralization often refers to the ability to accurately record and verify a historical record. Whereas in the old record-keeping system, a centralized authority recorded and verified the accuracy of a ledger, the blockchain system allows all users on the network to record and verify all activity.

## Decentralized Exchange (DEX)

A decentralized exchange (DEX) is an entity that enables users to trade assets within at least a partially decentralized environment.

For example, a common DEX uses a decentralized network of gateway nodes to hold user funds in escrow within the trading environment. No single individual has access to the escrow treasury.

Komodo features a new form of DEX: AtomicDEX. This uses atomic swaps, and provides a revolutionary form of trading cryptocurrencies. Users maintain control over their assets at all times during the trading process, which makes AtomicDEX a truly decentralized DEX.

## Initial DEX Offering (IDO)

A initial DEX offering (IDO) is a method of releasing cryptocurrency assets to the public without passing through the technology of a centralized authority.

For more information, [read the IDO section.](../../../basic-docs/start-here/core-technology-discussions/initial-dex-offering.html)

## Delayed Proof of Work (dPoW)

Delayed Proof of Work is Komodo's signature method for achieving consensus on a network of multiple blockchains.

Delayed proof of work relies on a small network of sixty-four nodes that create a trustless notarization of all the history of the Komodo ecosystem and write this notarization into the history of a stronger Proof of Work blockchain network (Bitcoin).

By having the notarization visible for all to view and verify, Komodo enables the ecosystem to operate with Bitcoin-level security without having to compete directly with Bitcoin for PoW hash rate security.

An important aspect of notary nodes to understand is that notary nodes are not arbiters of "truth." All information a notary nodes signs in a notarization is created publicly and verified by all full nodes on any participating blockchain. Notary nodes cannot alter transaction histories; notary nodes can only notarize the history on behalf of the network, and nothing more.

For more information, [read the Core Technology Discussion regarding dPoW.](../../../basic-docs/start-here/core-technology-discussions/delayed-proof-of-work.html)

## Dependency

In a programming environment, a dependency can be described as a foreign collection of code that the developer adds to their source code in order to enhance functionality.

The developer typically does not hold a strong understanding of the dependency and must trust that the developer of this dependency is acting with professional due diligence.

In blockchain technology, developers are encouraged to avoid dependencies wherever possible.

## Double Spend

A "double spend" is the act of spending the same value twice, and blockchain technology is built to prevent users from this behavior.

In a double spend, a user sends money to one person, and then sends the exact same money again to another person.

The dangers associated with a double spend prevented digital currency from becoming feasible until the invention of the Bitcoin protocol's consensus mechanism.

## Equihash Algorithm

An equihash algorithm is a blockchain mining algorithm that discourages certain high-powered and specially built mining devices from mining on the network.

## Gas

Gas is a concept that pertains to foreign blockchain platforms, such as Ethereum.

Gas is a cryptocurrency that is spent as payment for the blockchain's decentralized network of nodes to process arbitrary "smart contract" code.

Komodo does not require gas. Rather, when users execute arbitrary code (using Antara Modules), the only fee required is the fee paid to the miners when performing a transaction. This fee is paid in the native coin on which the arbitrary code is run. Compared to the gas-based smart-contract model, the Komodo fee structure is exponentially less expensive.

## Genesis Attack

In a Genesis Attack, the attacker launches a fresh version of the targeted blockchain. Using a high rate of hash power and competitive mining equipment, the attacker proceeds to recreate the entire blockchain history as though the so-called "true" history never existed.

Once the block height of the attacker's chain surpasses the height of the "true" chain, the attacker releases their empty creation on the network.

When the default Bitcoin protocol encounters the attacker's chain on the network, the protocol observes that this "empty" chain is created properly and is longer than the so-called "true" chain.

At this point, the protocol will automatically erase the "true" chain from all nodes on the network and the nodes will then sync the "empty" blockchain to their local machines.

## Genesis Block

The first block in a blockchain.

Historically, a large portion of the total coin supply of the associated blockchain is distributed to the miner who mines the Genesis Block.

## Hash Rate

The rate at which hashes are created by a node on the network.

Often, the term "hash rate" is used in reference to the total power of all miners mining a blockchain network. Miners produce hashes in their search for a properly formed hash that satisfies the requirements for adding the next block to the blockchain history.

## Iguana Core

Iguana Core is a core component in essentially all Komodo software. Iguana is a collection of blockchain tools and enhancements, designed by Komodo's lead developer, JL777.

## Jumblr

Jumblr was a decentralized zk-SNARK based mixing service on the Komodo main chain, KMD. Jumblr enabled users to coordinate their transparent-to-private and private-to-transparent currency conversions. This allowed users to mask their privacy-related transactions by performing them in equal amounts synchronously.

In the spring of 2019, Jumblr technology was removed from the KMD chain. This occurred in response to community feedback and industry developments.

## Liquidity Maker

A liquidity maker on the AtomicDEX network is a user who offers assets for trade and waits for a user to accept the offer.

## Liquidity Pool

A liquidity pool is a collection of live offers on an AtomicDEX trading network.

## Liquidity Taker

A liquidity taker on the AtomicDEX network is a user who accepts a standing and live offer of another user.

## Magic

To help differentiate one runtime instance of Komodo software from another, komodod creates a unique number for each chain.

The development name this number is "magic."

Each time a request arrives in the Komodo daemon, the magic number is checked to ensure that it is the number expected. When correct, the daemon allows the request access to the process.

## Mempool

The collection of unprocessed transactions on the network waiting for confirmation.

## Miner

A user, or hardware controlled by a user, that is attempting to collect transactions from the mempool and format them in a new block.

The miner who is first to mine a new block typically receives a reward from the network. This can include fees from the transactions successfully mined in the block. This can also include a possible coinbase transaction that adds new coins to the chain's total coin supply and gives them to the miner.

## Multi-Chain Syncing

Multi-chain syncing is the act of syncing one Komodo Smart Chain with another with verifiable and actionable information.

This allows Komodo Smart Chains to work together to serve an audience that may need more than one blockchain for scalability or other purposes.

## Multi-Chain Architecture

A multi-chain architecture is a term to describe a blockchain platform that allows for multiple blockchains to operate and collaborate together within the same network, and optionally using the same coin supply.

## Node

A node can be a unique desktop computer connected to the Internet. It can also be a virtual-private server (VPS) that is rented or purchased, and which the developer can access at will. Or, it can be another type of unique instance of a computational machine.

## Nonce

A nonce is a number that the miner guesses while attempting to create a block hash that fits the requirements for the consensus mechanism and the next block.

Nonce is short for, "a number you use once."

More information [is available in this section.](../../../basic-docs/start-here/core-technology-discussions/delayed-proof-of-work.html#what-is-a-consensus-mechanism)

## Notarization

A "notarization" in the Komodo ecosystem is a special transaction performed by the notary nodes that writes a hash of the entire Komodo history up to this point in time.

Notarizations are a foundational aspect of Komodo's security capabilities.

For more information, [read the dPoW section on notary nodes.](../../../basic-docs/start-here/core-technology-discussions/delayed-proof-of-work.html#the-komodo-solution-delayed-proof-of-work-dpow)

## Notary Node

A notary node is an elected security steward in the Komodo ecosystem.

There are 64 notary nodes in total.

Notary nodes can be either a single individual, or a group of people working together to secure and manage one node.

## On-Demand Notarization

The software of a default, unmodified, PoW-based Komodo Smart Chain will only instruct mining nodes to attempt to mine a new block when there are a few transactions in the mempool. This conserves energy and helps the chains to avoid processing nearly empty blocks.

Developers who wish to avoid the on-demand notarization situation have a few options available. Using Antara Customizations that allow for a hybrid of PoS and PoW will help to keep the blockchain stable when transaction activity is low. Also, developers can create a node on the network that constantly executes transactions of low value, to ensure the mempool is always non-empty.

## Orderbook

An orderbook is a record of all trade offers on an exchange. Typically, the orderbook only displays current offers.

Komodo's AtomicDEX software offers a decentralized orderbook, wherein users send orders to a P2P network for distribution, and all nodes on the network assemble the orderbook locally.

## Passphrase

A passphrase is typically a twelve to twenty-four sequence of words that is used as a base password to create a series of blockchain addresses and private keys.

## Proof of Stake (PoS)

A proof-of-stake (PoS) consensus mechansim requires users to place personal funds on the network as collatoral in exchange for the right to "stake" new blocks on the blockchain.

## Proof of Work

A proof-of-work (PoW) consensus mechanism requires miners on the network to complete a simple puzzle before the miner may obtain the right to add a new block to the blockchain and receive a block reward.

Solving the puzzle requires work from the computer, and therefore the correct answer to the puzzle is considered to be "proof of work" accomplished in solving the puzzle.

## Public Key (pubkey)

A public key or pubkey is a blockchain address that can receive funds on the network.

Sending funds out of this pubkey requires a matching private key that unlocks this public key (also called a public address).

On a non-Komodo blockchain a user may not interact often with their full pubkey, but rather they may use an abbreviated version of it. This shorter version is called a based58 encoded address.

On the other hand, users are required to use at least one full pubkey when using Antara Modules. This pubkey serves as the basis for all Antara-related addresses.

## Remote Procedure Call (RPC)

A remote procedure call (RPC) is a call to the Komodo daemon from a separate software process.

An RPC can request that the Komodo daemon send money to an address, or the RPC could request information about the state of the chain, among many other possibilities.

## Runtime Fork

In general, Komodo Smart Chains are created using the exact same software installation, but each Smart Chain has a separate data directory.

Each time the user initiates an instance of Smart Chain software, the user includes parameters that indicate which Smart Chain they are launching. These parameters can be simple, such as the "name" or "coin supply" of the desired Smart Chain.

Because each Smart Chain is based on the same software (generally speaking) and they differentiate at the moment of initiation, they are called "runtime forks." This represents the fact that each Smart Chain forks from the main KMD chain at runtime.

## Satoshi

The smallest divisible unit of a coin. All coins in the Komodo ecosystem follow the Bitcoin-protocol standard where `1` coin has `8` decimal places. Therefore, a satoshi is `0.00000001` of a coin.

## SPV Electrum Server

An SPV Electrum Server is a server that provides "lite mode" type functionality. These servers have a full copy of the blockchain history and the servers are able to help complete the requests of users on the blockchain network who do not want to download and sync the full blockchain history.

SPV Servers cannot assist a user to perform a zero-knowledge type transaction. Instead, users creating zero-knowledge transactions must download the full blockchain to their local node.

## Seed Node

A seed node is a node that is called at runtime and helps the caller to find other nodes on the network.

Seed nodes help new nodes on the network to obtain enough of a connection to the peer-to-peer network to download and sync the blockchain's history.

## Smart Chain

A Smart Chain is a blockchain built on Komodo technology.

Komodo is a fork of Zcash, which is itself a fork of Bitcoin. Therefore, each Smart Chain contains all the upstream technology, including Komodo, Zcash, and Bitcoin features.

A few notable Komodo-based features of Smart Chains include Antara Modules, which allow for arbitrary code to be executed as a part of achieving consensus, and cross-chain syncing, which allow for multiple Smart Chains to collaborate in maintaining scarcity and user activity.

## Smart Contract

A smart contract is a popular concept on other blockchain platforms. A smart contract allows developers to program scripts that update blockchain state based on user activity.

Komodo has a replacement technology, Antara Modules, that are capable of achieving all that a smart contract can achieve, and more. Please see the [Antara Overview discussions](../../../basic-docs/antara/antara-tutorials/overview-of-antara-modules-part-i.html#introduction) for more information.

## Staker

A staker is a user, or a node controlled by a user, that places funds in escrow on a Smart Chain network in exchange for the right to "stake" new blocks in the blockchain history. A staker receives rewards each time they successfully stake a block.

## T Address

A "t address" is a transparent address. Transactions performed in this address are fully visible to the network.

## T Transaction

A "t transaction" is a transparent transaction. The transaction can be fully viewed by the network.

## Terminal

The UNIX terminal is a simple software application that allows a user to execute commands and receive replies without a graphical user interface (GUI).

Linux and MacOS users will find a UNIX terminal installed by default, whereas Windows users may need to install secondary software, such as [GitBash.](https://gitforwindows.org/)

## Token

A token is a digital asset which functions on top of a blockchain. Tokens are separate from coins.

Foreign blockchain platforms, such as Ethereum, use token models such as ERC20 to allow users to print, distribute, and program their own currencies.

The Komodo Platform uses the Tokens Antara Module (or any similar module) to transform and restrict the Smart Chain's coins so that they behave as tokens with desirable features This allows for ERC20-like possibilities, and more.

## Trade Clearing

The term "trade clearing" refers to the process of completing a promised trade between users.

In AtomicDEX, trades are first matched on the peer-to-peer network, and then AtomicDEX uses our own signature atomic-swap process to clear the trade. Once both users either complete their sides of the trade, or abandon the procedure (and receive their appropriate refunds), the trade is considered cleared.

## Trade Matching

The term "trade matching" refers to the process of matching an offer to buy or sell with a willing trade partner.

In AtomicDEX, trade offers are distributed on a decentralized peer-to-peer network. Liquidity makers make new offers, and liquidity takers accept offers made by liquidity makers.

## Trustless

The word "trust" has a different connotation in blockchain technology.

Blockchain's specific and unique contribution to the field of technology is to allow users <b>not</b> to trust each other in achieving consensus over a history of transactions.

Rather, users all collect the same data from the open peer-to-peer network and use the same software and calculations to arrive at the same conclusions themselves. The less an individual user must trust another individual user, the more effective the blockchain is.

By removing the need for trust, power over the history of transactions and the correct "truth" of history is decentralized in favor of the average user, and away from centralized points of control. As centralized points of control are easily corrupted and manipulated, this has the potential to allow the average user to have a more fair level of influence within the blockchain network.

## Turing Complete

A programming language is considered "Turing Complete" if, when granted a few basic assumptions, the language is theoretically able to “compute any computable sequence.”

In other words, the language should be able to solve any mathematical problem that uses only computable numbers.

According to Turing’s definition, “...a number is computable if its decimal can be written down by a machine.”

Komodo's Antara Modules allow for Turing Complete programming languages to add arbitrary code to the evaluation process of a consensus mechanism of a Smart Chain.

## Tx

An abbreviation of "transaction."

## Txid

An abbreviation of "transaction id."

## Utxo

The term "utxo" is an abbreviated form of "unspent transaction."

Utxos can be difficult for new developers to understand.

For more information, please [read the Utxo explanation here.](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept)

## Virtual Machine Interpreter

A Virtual Machine (VM) interpreter is a popular concept on other blockchain platforms. The virtual machine is decentralized across all nodes on the network. Any smart contract code that a user pays gas to have executed will be evaluated within the VM. The VM sends the results to the associated blockchain for transaction processing.

Komodo's Smart Chain technology eliminates the need for a virtual machine. Instead, developers add their arbitrary code to an Antara Module. The code is evaluated as a part of achieving blockchain consensus. Users do not need to pay gas fees. Instead, they only pay the transaction fee necessary to send their transaction to the network. This is paid in the native coin of the Smart Chain.

## Z Address

A "z address" is a privacy-enabled address. These are active on a default Smart Chain, but developers of the Smart Chain can elect to disable z addresses.

Users use the [z_sendmany](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#z-sendmany) remote procedure call (RPC) when dealing with z addresses.

Z addresses only offer privacy when funds are sent from one z address to another. When a user sends money from a t address to a z address, or vice versa, the transaction should not be considered private.

Please see the [privacy discussion section](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-nature-of-privacy-features-in-the-komodo-ecosystem) for further details and warnings.

## Z Transaction

A "z transaction" is a zero-knowledge transaction. When a z transaction occurs between two z addresses, only the user is able to see the details of the transaction. No further data remains in the public domain for later analysis.

Please see the [privacy discussion section](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-nature-of-privacy-features-in-the-komodo-ecosystem) for further details and warnings.

## Zcash Parameters

The Zcash parameters are an implementation of zk-SNARK technology that allow for zero-knowledge transactions.

Assuming the Zcash parameters were implemented properly, zero-knowledge transactions leave no trace in the public domain for later data analysis.

Please see the [privacy discussion section](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-nature-of-privacy-features-in-the-komodo-ecosystem) for further details and warnings.

## zk-SNARK

"zk-SNARK" stands for "zero-knowledge succinct non-interactive argument of knowledge." This is a powerful form of privacy technology pioneered by the Zcash team.

As Komodo is downstream from the Zcash protocol (which is itself downstream from Bitcoin), Komodo inherits all zk-SNARK technology by default.

Please see the [privacy discussion section](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-nature-of-privacy-features-in-the-komodo-ecosystem) for further details and warnings.
