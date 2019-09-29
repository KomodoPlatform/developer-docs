A 51% Attack

PoW, with preparation for dPoW

The Notarization Process

Notary Nodes and the Notarization Process

Utxos


Architecture of an Antara Module

Bitcoin Script

The Consensus Mechanism

Utxos

RPCs


Descriptions:

## The Consensus Mechanism

This series of diagrams needs to show the process of creating a transaction (Alice), having (Bob) the miner confirm it, and then this transaction sinks into the Bitcoin history.

## PoW

Shows that the number of miners and the quality of their hardware mining a PoW network is what gives the blockchain its protection.

## The 51% Attack

A diagram of the process of a 51% Attack

## dPoW & Notary Nodes

Show notary nodes

Show KMD blockchain

Show Smart Chain

Show Hash process

Show notarization into Bitcoin

Show Smart Chain (without additional security) before dPoW during a 51% attack (up to notarization)

Show notary nodes protecting against 51% attack after first notarization (KMD)

Show notary nodes protecting against 51% attack after Bitcion notarization

## Utxos

Show how a Utxo is like a bill in a digital wallet

Show how a Smart Contract platform goes for the whole balance

Show how with Antara, the utxo itself is marked as belonging to a contract by both the user and the developer

Show how the utxo is limited for as long as it remains within that module (and that, if the developer chooses, can be released)

## Architecture of an Antara Module

Show the consensus mechanism of Komodo

This software has a lot of the things that run the Komodo ecosystem -- including Bitcoin basics, Zcash privacy, notary node features, and then the Antara Framework.

Antara Framework includes customizations, modules, and integration/API.

An Antara module is a piece of the software and connects with the consensus mechanism.

Transactions sent to an Antara Module are associated with it thereafter (unless developer releases it).

Transactions for an Antara Module must pass both the consensus mechanism and the module.

An Antara Module builds on part of Bitcoin script.

A normal developer sends simplified API commands to access the functionality of a module. 
