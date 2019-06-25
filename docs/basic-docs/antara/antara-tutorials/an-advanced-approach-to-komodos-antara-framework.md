# An Advanced Approach to Komodo's Antara Framework

## Introduction

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

## Antara Encompasses Several Technologies

The Antara framework greatly enhances blockchain functionality. Antara allows a developer to use their Smart Chain's consensus mechanism to enforce arbitrary code. Antara even allows clusters of Smart Chains to work together in this effort. 

The level of freedom this grants to the blockchain developer is sometimes difficult to comprehend until one has either seen the technology in action or engaged with the technology directly.

The Antara framework takes into account several different advanced technologies. To limit the scope of our introduction, for now we focus only on one crucial aspect: "CryptoConditions," or "CC" for brevity.

## A Less Conceptual Discussion of CryptoConditions 

#### CryptoConditions in Brief

CryptoConditions is a technology that allows for arbitrary logical conditions and fulfillments to be evaluated as a part of consensus. This allows for a Smart Chain's consensus mechanism to evaluate the results of arbitrary code and update state in the blockchain's data in a decentralized and secure fashion.

CryptoConditions technology is not a new concept. The [Interledger](https://interledger.org/) team originally proposed this technology in 2016. 

The [original proposal](https://tools.ietf.org/html/draft-thomas-crypto-conditions-01) was that it would be an open-source industry-wide standard format. The Interledger team does not seem to have continued exploring the technology beyond the original proposal. 

Komodo, on the other hand, found the CryptoConditions concept to be intriguing. In 2018, Komodo adopted this open-source technology into the suite of offerings in our Antara framework.

Our implementation uses many of the key ideas put forth by the Interledger team, and at the same time we depart in several significant ways. Those who are curious for specific details on this topic can explore the open-source code in the respective repositories. 

The important takeaway is that the Antara framework encompasses several underlying technologies, one of which is CryptoConditions (CC). This technology allows a developer to add arbitrary logical conditions and fulfillments to their Smart Chain, and to rely on the consensus mechanism to ensure state integrity in a decentralized environment.

#### CryptoConditions Depends Upon Transactions and Booleans

At the most fundamental level, blockchain data is advanced only through transactions. A blockchain itself is but a list of transactions, bound into blocks. By design, each transaction must be confirmed by the consensus mechanism.

Therefore, all decentralized data that a developer wishes to create or use with their arbitrary code must first be added to a transaction. This transaction is then passed through the consensus mechanism. Transactions that are successfully confirmed are finally added to the blockchain, and therefore the data is also added.

To take advantage of this functionality, a developer adds customized source code to the Antara framework to form a new module. Whenever a relevant transaction occurs on the blockchain, the consensus mechansim calls the developer's module,  validates the logical conditions and fulfillments as put forth by the arbitrary code, and either confirms or denies the transaction.

To simplify this process, Antara requires that the developer build their module such that each CryptoConditions (CC) transaction returns a boolean value as a part of the final results. If the returned boolean value is `true`, the transaction is approved.

With this framework in place, the developer can also add any other data to be saved as a part of the transaction.  This data is included in a special part of the transaction called an [<b>OP_RETURN</b>](https://en.bitcoin.it/wiki/OP_RETURN), or <b>opreturn</b> for brevity. We will discuss opreturns in greater detail further on.

Through Antara, the developer receives a powerful tool for creating and executing decentralized arbitrary code. A developer can also add data to any transaction, and their Smart Chain can utilize this data in future executions of arbitrary code. The primary requirement is that the arbitrary code return a meaningful boolean value as a part of the final result. 

#### Building an Antara Module is Harder Than Creating a Balance-Based Smart Contract 

Antara modules are fundamentally different than the "smart contracts" that are familiar on other blockchain platforms. The key difference is that Antara modules directly rely on ["unspent transactions,"](https://komodoplatform.com/whats-utxo/) which are called "utxos" for brevity. Smart contracts, on the other hand, rely on the total balance of funds held within an address. 

Utxo-based modules are harder to create than balance-based smart contracts. However, utxo-based modules result in dramatically more powerful and secure functionality, as they leverage the existing Bitcoin-utxo system. 

For example, with balance-based smart contracts, a bug in the smart-contract language can result in terrible events, such as the malicious printing of new coins in a smart contract, or the draining of all funds within a shared contract. Events such as these can happen even when the smart-contract author is a competent developer.

In a utxo-based module, the risk of such events is exponentially reduced. One reason utxo-based modules are more secure is that every update of the blockchain's state must be executed as a transaction, and therefore the data must pass the normal rules of consensus. 

Komodo is based on the Bitcoin protocol, and therefore Komodo's Smart Chain consensus mechanism is built on the most rigorously tested and heavily supported software in the industry. Balance-based smart contracts cannot compare to this level of security.

As the developer engages with Antara module development, they can learn how utxo-based modules allow for increased speed in achieving consensus, greater simplicity in software architecture, more flexible functionality between Smart Chains, and many more superior features. 

#### A Brief Look at an Antara Module Template

The following file, `customcc.cpp`, is a blank template a developer can use when beginning the creation of a new Antara module. Take a brief look to familiarize yourself with the essential layout.

[<b>Link to customcc.cpp file</b>](https://github.com/jl777/komodo/blob/dev/src/cc/customcc.cpp)

The key takeaway is that the entrypoints to Antara's CryptoConditions technology are broken down into a few functions and tables. Once the developer grasps the nature of working with these entrypoints, building Antara modules becomes a simple exercise in the common aspects of software development. 

Komodo already offers many SDK functions, tutorials, and best practices to simplify the learning curve and development process, and we continue to develop more of these sources of assistance.  

Before the developer can begin creating new Antara modules, there are several key concepts to understand in the Bitcoin Protocol.

## Smart Chain Basics

#### Understanding Utxos is Important in Antara Modules

In the prerequisite material the reader received encouragement to first learn the basics of blockchain technology and the Bitcoin protocol. The book, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook), provides a preliminary discussion, as does [the Komodo whitepaper.](https://komodoplatform.com/whitepaper) 

A key concept in these texts is the unspent transaction, or utxo. For a brief reminder on the nature of a utxo, read [this post on the Komodo blog.](https://komodoplatform.com/whats-utxo/)

Observe the data structure of a transaction.

<collapse-text hidden="true" title="Full Transaction Structure">

```json
{
  "hex": "0400008085202f890100277b16c44a997e8224cb1779688caa20f101c534e037054daa77aa6bbff6000100000049483045022100f26e8fa0fe08ad5d97fe4b2e56b409ef1126aed537878801eb1a38eb5152031d02205444da469fb12d9351b35e235e87c91db09fdbf9a7ac21c44c845046b672eac401feffffff02b8374c000000000023210275610ca15c4688cfebef16f84bce3691dc309591e23fc7298cf3683d9c3fd1efac404b4c00000000001976a914f3f476150b5a0f65a0972520653e6523dc2bd5ac88ac8dffff5cb8dd01000000000000000000000000",
  "txid": "6d3b67086ef6964e4022654938e71eb5a248aa5a1853b999381126c7d4dd0364",
  "overwintered": true,
  "version": 4,
  "versiongroupid": "892f2085",
  "locktime": 1560280973,
  "expiryheight": 122296,
  "vin": [
    {
      "txid": "00f6bf6baa77aa4d0537e034c501f120aa8c687917cb24827e994ac4167b2700",
      "vout": 1,
      "address": "RMhKqTr1ssari1wFoVFSSjdLsBXPkDdAac",
      "scriptSig": {
        "asm": "3045022100f26e8fa0fe08ad5d97fe4b2e56b409ef1126aed537878801eb1a38eb5152031d02205444da469fb12d9351b35e235e87c91db09fdbf9a7ac21c44c845046b672eac4[ALL]",
        "hex": "483045022100f26e8fa0fe08ad5d97fe4b2e56b409ef1126aed537878801eb1a38eb5152031d02205444da469fb12d9351b35e235e87c91db09fdbf9a7ac21c44c845046b672eac401"
      },
      "value": 0.10000000,
      "valueSat": 10000000,
      "address": "RMhKqTr1ssari1wFoVFSSjdLsBXPkDdAac",
      "sequence": 4294967294
    }
  ],
  "vout": [
    {
      "value": 0.04995000,
      "valueSat": 4995000,
      "n": 0,
      "scriptPubKey": {
        "asm": "0275610ca15c4688cfebef16f84bce3691dc309591e23fc7298cf3683d9c3fd1ef OP_CHECKSIG",
        "hex": "210275610ca15c4688cfebef16f84bce3691dc309591e23fc7298cf3683d9c3fd1efac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "RMhKqTr1ssari1wFoVFSSjdLsBXPkDdAac"
        ]
      }
    },
    {
      "value": 0.05000000,
      "valueSat": 5000000,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 f3f476150b5a0f65a0972520653e6523dc2bd5ac OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914f3f476150b5a0f65a0972520653e6523dc2bd5ac88ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "RXX78ba9g6aXuNLfeHTN24WhPWj3jWqyia"
        ]
      }
    }
  ],
  "vjoinsplit": [
  ],
  "valueBalance": 0.00000000,
  "vShieldedSpend": [
  ],
  "vShieldedOutput": [
  ],
  "blockhash": "002536f5e1cb5b9cad3952e45523d64b17bc56808483f7dc6cdfd7882d58d60d",
  "height": 122276,
  "confirmations": 1,
  "rawconfirmations": 1,
  "time": 1560281131,
  "blocktime": 1560281131
}
```

</collapse-text>

This transaction has an id, which is given as one of the first key-value pairs.

```json
"txid": "6d3b67086ef6964e4022654938e71eb5a248aa5a1853b999381126c7d4dd0364"
```

The term, `txid`, stands for transaction id.

Within this transaction there are two arrays. One contains the vins and the other contains the vouts.

A vin and a vout are short for "vector in" and "vector out". 

The vins and vouts can be considered to be sub-transactions that take place within the main transaction.

##### Observing the vin

The vins in a transaction consume unspent values from previous transactions.

Observe the first (and only) vin in this transaction.

```json
  "vin": [
    {
      "txid": "00f6bf6baa77aa4d0537e034c501f120aa8c687917cb24827e994ac4167b2700",
      "vout": 1,
      "address": "RMhKqTr1ssari1wFoVFSSjdLsBXPkDdAac",
      "scriptSig": {
        "asm": "3045022100f26e8fa0fe08ad5d97fe4b2e56b409ef1126aed537878801eb1a38eb5152031d02205444da469fb12d9351b35e235e87c91db09fdbf9a7ac21c44c845046b672eac4[ALL]",
        "hex": "483045022100f26e8fa0fe08ad5d97fe4b2e56b409ef1126aed537878801eb1a38eb5152031d02205444da469fb12d9351b35e235e87c91db09fdbf9a7ac21c44c845046b672eac401"
      },
      "value": 0.10000000,
      "valueSat": 10000000,
      "address": "RMhKqTr1ssari1wFoVFSSjdLsBXPkDdAac",
      "sequence": 4294967294
    }
  ],
```

This vin takes funds from an address, `RMhKqTr1ssari1wFoVFSSjdLsBXPkDdAac`.

The amount of funds the vin takes from that address is `"value": 0.10000000`.

##### Observe the vouts

To spend these funds, the transaction creates the vouts.

Observe the two vouts of this transaction.

```json
  "vout": [
    {
      "value": 0.04995000,
      "valueSat": 4995000,
      "n": 0,
      "scriptPubKey": {
        "asm": "0275610ca15c4688cfebef16f84bce3691dc309591e23fc7298cf3683d9c3fd1ef OP_CHECKSIG",
        "hex": "210275610ca15c4688cfebef16f84bce3691dc309591e23fc7298cf3683d9c3fd1efac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "RMhKqTr1ssari1wFoVFSSjdLsBXPkDdAac"
        ]
      }
    },
    {
      "value": 0.05000000,
      "valueSat": 5000000,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 f3f476150b5a0f65a0972520653e6523dc2bd5ac OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914f3f476150b5a0f65a0972520653e6523dc2bd5ac88ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "RXX78ba9g6aXuNLfeHTN24WhPWj3jWqyia"
        ]
      }
    }
  ],
```

The first vout sends `0.04995000` coins to the same address we saw in `vin0`.

The second vout sends `0.05000000` coins to a new address.

If we take the total value of all vins and subtract the total value of all vouts, we see that there is `0.00005000` difference. 

By design, any leftover amount not claimed by a vout is given to the miner that mines the block that contains this transaction. This is the mining fee.

##### Making Inferences 

To summarize, the utxo takes `0.1` coins from an address, sends `0.04995` back to the same address, and then sends `0.05` coins to a new address. The leftover amount is automatically given to the miner of the block.

This suggests that the user who created this transaction desired to send `0.05` coins to the new address. The user may have created this transaction using the [<b>sendtoaddress</b>]() API method.

From here, the software daemon took control. The software found that within the user's wallet was an existing value of `0.1` coins. This became the vin for the transaction. The first vout the software created was sent back to the address in the user's own wallet. This `0.04995000` value is the "change" from the transaction. The second vout contains the `0.05` the user intended to send to the new address.
 
#### Utxo is an Unspent Vout

A vout that can be spent, but has not yet been spent, is a utxo.

To determine whether a vout is spent, the developer cannot look directly at the data in a transaction. Rather, the developer makes a requst to the software to look at all following transactions on the blockchain.

If there is a later transaction that has a vin that consumes the `0.05` vout, that would indicate that the vout is spent. If there is no such transaction, then the vout is still a utxo.

A transaction can have multiple vouts, and therefore each transaction can technically contain multiple utxos.

Often times, in conversation developers may call a full transaction a "utxo," for simplicity's purposes. Yet, for developers to truly understand the underlying concept, they should understand that "utxo" refers to a vout, not to a txid.

#### A Utxo is Not Spent Until Confirmation

A utxo is not considered spent under any circumstances until the transaction that spends it receives confirmation from the Smart Chain's consensus mechanism.

Therefore, transactions sent to the [<b>mempool</b>](https://en.bitcoin.it/wiki/Protocol_documentation#mempool) are technically still unspent transactions, even if the user is fairly certain the transaction will be confirmed in the next block.

A useful comparison here can be found by observing people seeking to attend a ticketed event, such as a music concert. To gain acceptance into the music hall, a person must first have a ticket. We compare this to the creation of a txid. The person must wait in line. This is similar to the mempool. The person must have their ticket stamped, and this is akin to the consensus mechanism approving the transaction. Then the person may enter the music hall. This is the transaction becoming a part of the blockchain history.

The essence of blockchain technology is that a utxo can only be spent once. In building modules for the Antara framework, we constantly keep this principle in mind, and the consensus mechanism is our guide.

<!-- The example below is no longer needed, but we can keep it in case I change my mind later. 

Consider how the [<b>Channels module</b>]() uses CryptoConditions to enhance user security and convenience during the process of spending utxos.

Without CryptoConditions, a utxo in the Komodo ecosystem reaches effective finality once it is notarized to the Bitcoin network. For a typical smart chain, this process can take from twenty to forty minutes, on average.

While the user waits for their transaction to be notarized, they must rely on their Smart Chain's consensus mechansim to protect their transaction from a 51% attack. This period of waiting can be irritating to a user.

The Channels module effectively eliminates this waiting period for transactions that a user anticipates in advance. The developer allows their users to create a series of possible utxos that can happen. The utxos still belong to the user, but they are effectively locked to a destination address. This is typically the address of the potential recipient of the funds. 

With the utxos effectively locked to the destination address, the user can safely release the private key for this utxo at any time. When the user states that they are ready to spend their funds, CC forces them to publicly release the private key to these funds as a part of the transaction. 

At this point, with the private key for the utxos publicly available, the receiver can safely assume that they will receive their funds without having to wait for notarization. Even an attempted 51% attack would not remove the receiver's knowledge of the private keys. 

-->

## Formation of a Transaction

Contrary to what one may think, a blockchain transaction is not a simple accounting entry that says, "Address X pays Y amount of funds to address Z." Rather, a transaction also contains a Bitcoin script that must be satisfied before the requested funds can be spent.

<!-- I changed the above paragraph according to my best knowledge. It used to say, "on the blockchain." This wasn't clear to me, as I wasn't sure if we were talking about blockchain database, or the actual transaction itself, or something else. I guessed. We should correct. -->

The manner in which transactions are created has evolved over time. Originally, the process consisted only of a "Pay to Pubkey" script, or "P2PK" for brevity.

In a P2PK transaction, the software checks the cryptographic signature of the public key attempting to spend funds and if the signature is correct the transaction is approved. 

These simple transactions are common in coinbase transactions. (Recall that a coinbase transaction is the transaction that mints new coins onto a blockchain. Coinbase transactions are most frequently encountered as block rewards for miners/stakers.)

If the reader would like a more thorough technical explanation for P2PK transactions, tutorials and explanations abound across the web. [Here is one such example.](https://learnmeabitcoin.com/glossary/p2pk)

#### Quantum Computers, Cold Addresses, and Change

As the early Bitcoin community gained experience, Satoshi Nakamoto foresaw a potential danger. Far in the future, a quantum computer will be able to break the encryption protection of any pubkey address and thereby steal funds.

To solve this problem, Satoshi invented a method to have a "cold address." Cold addresses are based on a pubkey, but there are various cryptographic functions that separate the two. 

A user can send their funds to a cold address without revealing the associated pubkey. This allows the user to keep their pubkey private, and thus protect their funds from being spent even by a quantum computer, so long as the relationship between the cold address and the pubkey remains a secret.

Naturally, to spend their funds, the user must utilize their pubkey to create the transaction signature, and thus they reveal the relationship between the cold address and the pubkey. Once the secret is revealed, the cold address no longer offers any protection against quantum computers. 

This encouraged Satoshi to redesign the Bitcoin protocol so that, by default, each time a utxo is spent the leftover amount in the utxo is sent to a new cold address. This is the reason for the "change" addresses that a user sees in their wallet each time they send funds on a default Bitcoin-based blockchain. 

#### Smart Chain and CryptoConditions' Pubkey Parameter Disables Change Addresses

An astute reader may note that in the above example transaction, the "change" did not go to a new address, but rather to the same address from which the `0.1` coins were taken. The reason for this pertains to CryptoConditions (CC), as the transaction was performed on a Smart Chain that utilizes CryptoConditions.

When using CC technology, the user typically must provide a designated pubkey via the [<b>pubkey</b>]() launch parameter. The reason for this will be discussed later. 

A side effect of using this <b>pubkey</b> parameter is that once this is set, the software will stop creating new "change" addresses with each transaction. Instead, the software will send the "change" back to the same cold address that is associated with the pubkey.

If a user wants to keep funds safe from quantum computers, there are separate CC-related modules that provide protection. For example, [the upcoming Dilithium Antara module.](https://komodoplatform.com/dilithium-quantum-secure-blockchain/)

#### Pay to Pubkey Hash Transactions 

Transactions that send funds to a cold address are called "Pay to Pubkey Hash" transactions, or P2PKH for brevity. 

When performing a P2PKH transaction, the protocol has a few extra steps to perform. The protocol must check that the hash of the pubkey (which is included as a part of the cold address) is appropriately matched to the pubkey itself. The structure of a P2PKH transaction includes opreturns that instruct the daemon to perform these verification steps.

The Internet contains many thorough explanations of P2PKH transactions. For more information, [here is one such tutorial.](https://learnmeabitcoin.com/glossary/p2pkh)

Once a cold address is associated with a pubkey, the Bitcoin protocol no longer attempts to use these quantum-secure P2PKH transactions, as they require an extra 25 bytes of data space. Instead, the protocol reverts to the original P2PK transactions.

Because CryptoConditions typically requires the <b>pubkey</b> launch parameter to be enabled, users nearly always reuse the same addresses. For this reason, the Antara module developer can simply skip P2PKH transactions and use only P2PK transactions instead. 

#### Pay to Script Hash Payments

In addition to P2PK transactions, the original Bitcoin protocol allowed for any type of script opcode in transactions. This seemed like a promising idea at first, but developers quickly discovered that this level of freedom also brought instability. Satoshi limited the options available, and P2PK and P2PKH become the overwhelming majority of all transctions.

The community still desired the freedom to execute scripts as a part of transactions, and this eventually led to the Pay to Script Hash, or P2SH, standard.

This method allows the user to lock their funds to the hash of a script.  The script itself is typically designed to ensure that the funds are spent in a secure manner, and this is often through a P2PK or P2PKH transaction that is included in the script. 

To unlock the funds, a user provides the original script. The blockchain daemon checks that the script matches the hash, executes the script, and the funds are unlocked.

For more information about P2SH transactions, [a useful tutorial can be found here.](https://learnmeabitcoin.com/glossary/p2sh)

#### Understanding Op Codes

Each of the above transactions relies on an operation code, also called "opcode", to execute.

For example, the P2PKH transaction relies on the OP_CHECKSIG opcode, `172`, to execute. The opcode is included as a part of the transaction data, typically as a header and in hex format.

When the daemon detects the opcode in the raw data, the daemon understands what is being asked by the developer and performs the appropriate action.

Originally, Bitcoin had many opcodes available. Satoshi disabled a large number of opcodes for stability reasons. To see a list of current opcodes in Bitcoin, [visit the Bitcoin wiki.](https://en.bitcoin.it/wiki/Script#Opcodes) 

#### A New Op Code: OP_CheckCryptoCondition 

The CryptoConditions standard itself relies on a new opcode, OP_CHECKCRYPTOCONDITION, or OP_CCC for brevity.

This opcode is not included in the Bitcoin protocol. Rather, the OP_CCC standard was originally written and designed by the Interledger team. The full, original OP_CCC specification is a thirty-three page document, [which you can see here.](https://tools.ietf.org/html/draft-thomas-crypto-conditions-04)

There is no need to read and master the entire original proposal, however, as Komodo's Antara framework automates much of the underlying aspects. The primary takeaway is that the developer uses OP_CCC to create a "<b>CryptoConditions transaction</b>," or "<b>CC transaction</b>" for brevity.

A CC transaction includes several special features. This can include a logical condition that must be met for the utxo the transaction creates to be spent in the future. A CC transaction can also include a fulfillment of the logical conditions set forth in a previous CC transaction. The binary encodings of these CC transactions can be used in a Smart Chain utxo. These features are the foundation of a CC-related Antara module.

OP_CCC provides many relatively convenient use cases, and the developer can expand on the common OP_CCC use cases when necessary. For example, a standard use case of OP_CCC is a `1of1` CC script. This type of CC transaction requires only 1 signature, and is accompanied by a few custom constraints. Many of the current default Antara modules rely on the `1of1` script OP_CCC.

A more intricate use case of OP_CCC, on the other hand, can be found in the Payments module. This module uses a `1of2` CC script, which allows for one of two signatures to sign a CC transaction, and the script also features several customized constraints.

## Antara Module Basics

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

As the eval code must range between `0` and `255`, a Smart Chain can have up to 256 total modules. The developer of a Smart Chain can determine which modules to add from the available modules in the ecosystem. At this time, we do not yet have 256 total modules, and therefore there is no need to choose.

#### Validation Code

The developer adds validation code that will be executed any time the daemon encounters a transaction bearing the relevant module's eval code.

This is where the true power of CC begins. When validating a normal transaction, the daemon has access only to information included in the transaction itself. With a CC transaction, however, the daemon is running arbitrary code, and therefore anything is possible. The validation code can look trough the blockchain history, observe transactions in the mempool, and even utilize Antara's cross-chain technology.

Technically, OP_CCC scripts do not have a required structure. The scripts only need to follow the general structure of the initial layout. The developer may follow the general guideline, as provided in our templates and tutorials. This allows the developer to code and debug their OP_CCC related modules in an efficient manner.

<!-- Below content seems like it can be grouped with other "simplest" content, 1of1 and 1of2. -->

#### Flexbile Pubkey Expression

To understand how CryptoConditions (CC) manages addresses and scripts, the developer should first understand a few basic concepts regarding pubkeys.

Originally, Bitcoin pubkeys were 64 bytes, as opposed to the 33 byte pubkeys of today. The 64 byte pubkeys had a left half and a right half which were used for internal functions in the daemon. Using cryptographic methods, a developer could derive the left half of the function from the right half, and vice versa. 

Early Bitcoin developers took advantage of the ability to derive one half of the pubkey from the other, and compressed the pubkey to a smaller size. They also instituted prefixes that informed the daemon whether the pubkey was odd, even, or large (`02`, `03`, and `04` respectively). In the end, the developers compressed the 64 byte pubkey into a 33 byte version.

Today, there are multiple ways to express a pubkey. There are compressed and uncompressed versions of the pubkey, and the pubkey can also be expressed as two different base58 encoded addresses. All of these are associated with the same private key.

#### Pubkeys and CC Addresses 

When working with software based on the Bitcoin protocol, a common problem a developer encounters is found in creating an address that is associated with a script. A frequent solution is to hash the script and use the hash as the address. Komodo uses this solution in the Antara CC implementation. Using this method, the CC script serves as the CC address.

<!-- We say "CC script" below. It's not clear to me that the reader would know that a CC script and a CC address are essentially the same? -->

<!-- Above accurate? -->

With this in mind, the essential structure of a CC script is as follows. (The automatically generated content is handled by the daemon's internal functions and can be ignored.)

```
evalcode + pubkey + automatically generated content
```

Each CC script utilizes the eval code of the module to which the CC script belongs. Since the CC script includes both the pubkey and the module's unique eval code, a pubkey makes a unique CC address for each module.

Funds that are sent to a CC address can be spent only by the module with the appropriate eval code, and therefore funds created and associated with an eval code maintain scarcity within this module.

<!-- Maybe we rephrase based on content below. Also, maybe this content goes sooner, so that when we get to talking about CC addresses, we have more context. -->

A common and simple CC script exists in nearly all of the default Antara modules. The structure of this script consists of a single signature from a pubkey and CC validation. This is essentially the equivalent of a P2PK Bitcoin script; the CC validation returns `true` or `false`, whereas the P2PK Bitcoin script returns `1` or `0`.

#### Global CC Address

By convention, each Antara module has a global CC address where the privkey is publicly available. As usual, spending from this global CC address requires that the spender meet all validation rules set forth by the developer. Therefore, the lack of privacy for the private key is not an issue. 

One purpose for this global CC address is to create a repository that is global (within the module) for information regarding specific instances of this module on the chain.

For example, typically the design of an Antara module requires that each time a user initiates an instance of the module, the user also sends a small amount of funds to this global CC address. This transaction contains data about the instance the user desires to create. Other users on the network can retrieve the data in this global CC address, and thereby gain knowledge about the current state of all module instances on the Smart Chain.

## Vector Inputs and Outputs

A transaction in the Bitcoin protocol consists of input and output vectors, called "vins" and "vouts" for brevity. The vins take funds from utxos, combine them into one "spend" transaction, and create new vouts. Some of the vouts may be new utxos.

```
vin0 + vin1 + ... + vin[n-1] -> vout0 + vout1 + ... vout[n-1]
```

Each of the vouts has a spend script that must be satisfied before the vout can be spent. 

Suppose vout0 is a normal utxo with a small amount of funds and the receiver of this utxo desires to spend it. They create a new transaction with a vin that consumes vout0. This vin must satisfy any scripts that are contained in vout0.

#### CC Enhances the Script Between Vin and Vout to Advanced Levels

A key power of CryptoConditions (CC) is the ability to enhance the script that must be satisfied between a vin and a vout. In CC, the vout contains the logical condition, and the vin contains the logical fulfillment.

With access to arbitrary code, CC allows the Bitcoin protocol to rival the "smart contracts" common on other platforms. Yet, CC accomplishes this without requiring the virtual-machine counterpart that other smart-contract platforms require. Instead, the consensus mechanism is directly engaged with the scripts in the vins and vouts of transactions.

The Bitcoin protocol's consensus mechanism is constantly placed under the most intense of pressure in the industry, and therefore is likely the most reliable consensus mechanism available. The ability to engage the consensus mechansim in arbitrary code while not changing the consensus mechanism itself grants Antara security and stability. The utxo system of the Bitcoin protocol also reduces the likelihood that modules themselves will contain bugs internally. (The reader should note that CC cannot eliminate attack vectors altogether.)

#### The Many Possibilities of OC_CHECKCRYPTOCONDITION

Consider the implications of the combination of possibilities contained in this new opreturn, OP_CCC. As there can be up to 256 eval codes per Smart Chain, there can be up to 256 different types of CC outputs per chain. Each CC transaction can contain multiple vins and vouts, each of which provides CC related fulfillments and conditions. Also, each module has a globally available CC address to allow for chain-wide functionality, making the possibilities per vin or vout 257. 

Observe the essential structure of a transaction with 3 vins and 2 vouts.

```
vin0 + vin1 + vin2 -> vout0 + vout1
```

With the possibilities of OP_CCC, the combination allows for 1.12e+12 possibile combinations.

```
257 * 257 * 257 * 257 * 257 = 1.12e+12
```

This is a dramatic increase in the possibilities over the limits of the original Bitcoin protocol. 

While the possibilities of a transaction are essentially limitless, the developer must create validation code that ensures the module and its transactions function as intended. Therefore, in practice the developer often limits the possibilities to `1` to `3` types per vin or vout.

<!-- I don't understand how this works. Can you make a transaction that takes advantage of each module in each vin/vout? -->

## Introduction to the Remote Procedure Call (RPC)

A Remote Procedure Call (RPC) allows a module developer the ability to offer easy access to their module's functionality. The role of the RPC calls are to create properly signed raw transactions that are ready for broadcasting.

The developer places the command name of each RPC they desire to create into a table in the CC source code. <!-- Can we get a directory link to this file? --> From this table, the built-in komodo-cli software is able to access and execute the RPC. In this manner, developers of all skills levels can integrate Antara modules into other software.  

Antara modules can have any RPCs the developer desires, or even have no RPCs. By convention, each Antara modules has a few default RPCs: `<CC_Name>address`, `<CC_name>list`, and `<CC_name>info`. For example, the Dice module has, `diceaddress`, `dicelist`, and `diceinfo`. These RPCs return information about a CC-related address, the list of all instances of this module on the Smart Chain, and information about the chain-wide state of the module.  

## Creating a Global CC Address

<!-- Maybe this goes before RPCs. And/or maybe we could break down the code below into a simpler example, or one for Heir? -->

The following code from the Faucet module serves as an example of the manner in which we begin the creation of a global CC address for this module.

```C
const char *FaucetCCaddr = "R9zHrofhRbub7ER77B7NrVch3A63R39GuC";
const char *FaucetNormaladdr = "RKQV4oYs4rvxAWx1J43VnT73rSTVtUeckk";
char FaucetCChexstr[67] = { "03682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe12" };
uint8_t FaucetCCpriv[32] = { 0xd4, 0x4f, 0xf2, 0x31, 0x71, 0x7d, 0x28, 0x02, 0x4b, 0xc7, 0xdd, 0x71, 0xa0, 0x39, 0xc4, 0xbe, 0x1a, 0xfe, 0xeb, 0xc2, 0x46, 0xda, 0x76, 0xf8, 0x07, 0x53, 0x3d, 0x96, 0xb4, 0xca, 0xa0, 0xe9 };
```

<!-- For the below, let's just look at the switch statement here in the file? -->

For a template of this logic pattern, view the [CCcustom.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/CCcustom.cpp) file. Note that at the bottom of the file there is a switch statement. There, the above values are copied into an in-memory data structure for each CC type. This allows the entire CC codebase to access the global CC addresses in a standard manner.

To create a global CC address for a new module, follow these steps.

#### Create a value using getnewaddress

With the `komodod` daemon running, use the [<b>getnewaddress</b>](../basic-docs/smart-chains/smart-chain-api/wallet.html#getnewaddress) RPC with `komodo-cli` to get a new address. 

Copy this value into the first line of the code. For example, in the Faucet code above the result is as follows.

```C
const char *FaucetNormaladdr = "RKQV4oYs4rvxAWx1J43VnT73rSTVtUeckk";
```

#### Retrieve the pubkey using validateaddress

Use the [<b>validateaddress</b>](../basic-docs/smart-chains/smart-chain-api/util.html#validateaddress) RPC with `komodo-cli` to obtain the pubkey of the new normal address from the previous step.

Place the returned value into the `<CChexstr>[67]` line of code.

```C
char FaucetCChexstr[67] = { "03682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe12" };
```

#### Restart the Daemon with the pubkey 

Stop the daemon and restart with the [<b>pubkey</b>](../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#pubkey) launch parameter enabled. Use the pubkey from the <b>validateaddress</b> as the pubkey value.

#### Ensure the Myprivkey Function is Properly Enabled

Check that the `if ( 0 )` statement is enabled in the  `Myprivkey()` function in the `/src/cc/CCutils.cpp` file.

<!-- And if it's not? How to fix? -->

#### Obtain the CCaddress

<!-- I didn't think the <CC>address RPC call was enabled at this point, unless the RPCs are implemented? -->

Execute the `<CC_name>address` RPC call and use the returned value to complete the `<CC_Name>CCaddr` line of code.

```
const char *FaucetCCaddr = "R9zHrofhRbub7ER77B7NrVch3A63R39GuC";
```

#### Obtain the privkey in Hex Format

From the response returned by the `<CC_name>address` RPC, use the hex value of the private key to complete the appropriate line of code.

```
uint8_t FaucetCCpriv[32] = { 0xd4, 0x4f, 0xf2, 0x31, 0x71, 0x7d, 0x28, 0x02, 0x4b, 0xc7, 0xdd, 0x71, 0xa0, 0x39, 0xc4, 0xbe, 0x1a, 0xfe, 0xeb, 0xc2, 0x46, 0xda, 0x76, 0xf8, 0x07, 0x53, 0x3d, 0x96, 0xb4, 0xca, 0xa0, 0xe9 };
```

<!-- How do we have a new pubkey from this? -->

Stop the daemon and restart it using the new pubkey.

#### Add the First RPC

<!-- This should be part of its own section? Also, still confused about how to execute <CC>address above, since we create the RPC below. -->

Add a line to the `/src/rpcserver.h` file to create the `<CC_name>address` function for the module.

Update the commands array in the `/src/rpcserver.cpp` file.

#### Copy the Existing Default RPCs to the New Module

From the `/src/wallet/rpcwallet.cpp` file, copy and paste the existing RPC functions to create new versions for the new module. Change the eval code and customize the functions as desired.

Add an entry into the `/src/cc/eval.h` file.

<!-- Anything here about testing to ensure that it works properly, or anything? -->

## Introduction to Validation

A large portion of Antara module customization pertains to the manner in which the validation code constrains CC transaction input.

The CC validation code is called at the time that the consensus mechanism is validating a CC transaction. The consensus mechanism only calls the CC validation code and waits for a response of `true` or `false`. Whether or not the CC validation code is effective is a matter for the developer to resolve. 

The developer is responsible for properly designing both the validation code and the RPC implementations. Both should work together to ensure that RPCs cannot create transactions that should not exist, and the CC validation code should only validate proper transactions.

The CC validation code is already locked in the main loop of the Bitcoin protocol at the time the code is called. Care should be taken with the CC validation code to ensure that the code does not cause a deadlock on the chain.

#### Next Steps

This concludes this introductory discussion of Antara module development. 

The CryptoConditions aspect of Antara is a foundational aspect of this technology. CryptoConditions allows a developer to add arbitrary code into their Smart Chain daemon, and to rely on the consensus mechanism and utxo framework to provide a more secure and effective decentralized environment. 

<!-- 

This should probably be lumped in with the Heir CC tutorial. 

We didn't cover the method of adding data to an OP_RETURN

-->


To learn more about other Antara technologies, such as MoMoM, we recommend reaching out to our community on [<b>Discord.</b>](https://komodoplatform.com/discord) Documentation for other aspects of Antara is not yet developed, but these technologies can be explored through direct engagement.
