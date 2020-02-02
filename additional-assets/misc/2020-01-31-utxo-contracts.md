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

A reader that is charged with representing Komodo on this topic is encouraged to dedicate several hours of time to studying these topics. 

This topic can (and in the future likely will) require an entire textbook for a reader to gain masterful understanding. 

Fortunately, much of the necessary content for the Komodo marketing team to speak on these subjects is already documented through the collective efforts of many of the Komodo team members.

When questions arise during the course of study, please reach out to @Bryan\_Beus on the Komodo Discord Server.

## The Beginning of UTXO-based Contracts

#### Understanding a UTXO

UTXOs are a fundamental aspect of blockchain protocols. Yet, understanding what they are and how they function can sometimes be surprisingly difficult. 

The Official Komodo Documentation contains detailed explanations of UTXOs, and the reader is encouraged to read through the linked article below before continuing further in the discussion.

[Link to Introduction to UTXO Documentation Explanation](http://developers.komodoplatform.com/basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept)

Having read the above article, the reader should have a conceptual understanding of UTXOs. 

##### Simple Summary of the Above Article

As discussed in the article above, a UTXO can be described as a "digital bill" that resides in the user's digital wallet.

The size of a UTXO is determined by the variable amount of the money sent by a user to a new address.

Each time a user performs a transaction on a blockchain, they consume a UTXO from their local wallet and send the amount of money it contains to a destination address.

This creates a new UTXO in the destination address.

## Digging Deeper Into UTXOs

To understand how Interledger, Komodo, and Cardano function in regards to UTXO contracts, the reader is requested to also read the following article.

[Link to Advanced Discussion of UTXOs](http://developers.komodoplatform.com/basic-docs/antara/antara-tutorials/advanced-series-1.html#formation-of-a-transaction)

After reading the article, the reader should understand that a UTXO is comprised of "vins" and "vouts." 

These terms stand for "vector in" and "vector out." 

The inward vector consumes money from an unspent transaction (thus rendering that transaction "spent"), and allocates the money to outward vectors. The outward vectors are new "unspent transactions," or UTXOs.

Furthermore, the reader is introduced to the concept of a "Bitcoin Script." This is where the relevant portion of the discussion here truly begins. 

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

In the linked article above, "Advanced Series -- Smart Chain Development Basics," the reader encountered an introduction to Bitcoin Script.

Bitcoin Script is a separate programming language. All transactions that are executed on a 


