# Advanced Series — Smart Chain Development Basics

#### Understanding Utxos is Important in Antara Modules

In the [Learning Launchpad Outline](../../../basic-docs/start-here/learning-launchpad/learning-path-outline.html) the reader received encouragement to understand the basics of blockchain technology in preparation for this tutorial. The [<b>Core Technology Discussions section</b>](../../../basic-docs/start-here/core-technology-discussions/introduction.html) provides a useful introduction to most concepts that are necessary for blockchain engineers. 

A key basic concept to understand is the unspent transaction, or utxo. For a brief reminder on the nature of a utxo, read [this section in the Core Technology Discussions section.](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept)

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

The essence of blockchain technology is that a utxo can only be spent once. In building modules for the Antara Framework, we constantly keep this principle in mind, and the consensus mechanism is our guide.

## Formation of a Transaction

Contrary to what one may think, a blockchain transaction is not a simple accounting entry that says, "Address X pays Y amount of funds to address Z." Rather, a transaction also contains a Bitcoin script that must be satisfied before the requested funds can be spent.

The manner in which transactions are created has evolved over time. Originally, the process consisted only of a "Pay to Pubkey" script, or "P2PK" for brevity.

In a P2PK transaction, the software checks the cryptographic signature of the public key attempting to spend funds and if the signature is correct the transaction is approved. 

These simple transactions are common in coinbase transactions. (Recall that a coinbase transaction is the transaction that mints new coins onto a blockchain. Coinbase transactions are most frequently encountered as block rewards for miners/stakers, and in the Gensis Block of a chain.)

If the reader would like a more thorough technical explanation of P2PK transactions, tutorials and explanations abound across the web. [Here is one such example.](https://learnmeabitcoin.com/glossary/p2pk)

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

If a user wants to keep funds safe from quantum computers, there are separate CC-related modules that provide protection. For example, [the upcoming Dilithium Antara Module.](https://komodoplatform.com/dilithium-quantum-secure-blockchain/)

#### Pay to Pubkey Hash Transactions 

Transactions that send funds to a cold address are called "Pay to Pubkey Hash" transactions, or P2PKH for brevity. 

When performing a P2PKH transaction, the protocol has a few extra steps to perform. The protocol must check that the hash of the pubkey (which is included as a part of the cold address) is appropriately matched to the pubkey itself. The structure of a P2PKH transaction includes opreturns that instruct the daemon to perform these verification steps.

The Internet contains many thorough explanations of P2PKH transactions. For more information, [here is one such tutorial.](https://learnmeabitcoin.com/glossary/p2pkh)

Once a cold address is associated with a pubkey, the Bitcoin protocol no longer attempts to use these quantum-secure P2PKH transactions, as they require an extra 25 bytes of data space. Instead, the protocol reverts to the original P2PK transactions.

CryptoConditions typically requires the [<b>ac_pubkey</b>](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-pubkey) Antara Customization parameter to be enabled. One of the effects of this parameter is that each time a user makes a transaction, the "change" is automatically sent back not to a new cold address, but rather to the pubkey included in the `ac_pubkey` parameter. Therefore, as user transactions are already always returning to a default pubkey, the Antara Module developer can simply skip P2PKH transactions altogether and use only P2PK transactions instead. 

#### Pay to Script Hash Payments

In addition to P2PK transactions, the original Bitcoin protocol allowed for any type of script opcode in transactions. This seemed like a promising idea at first, but developers quickly discovered that this level of freedom also brought instability. Satoshi limited the options available, and P2PK and P2PKH become the overwhelming majority of all transctions.

The community still desired the freedom to execute scripts as a part of transactions, and this eventually led to the Pay to Script Hash, or P2SH, standard.

This method allows the user to lock their funds to the hash of a script.  The script itself is typically designed to ensure that the funds are spent in a secure manner, and this is often through a P2PK or P2PKH transaction that is included in the script. 

To unlock the funds, a user provides the original script. The blockchain daemon checks that the script matches the hash, executes the script, and the funds are unlocked.

For more information about P2SH transactions, [a useful tutorial can be found here.](https://learnmeabitcoin.com/glossary/p2sh)

#### Understanding Op Codes

Each of the above transactions relies on an operation code, also called "opcode", to execute.

For example, the P2PKH transaction relies on the OP_CHECKSIG opcode `172` to execute. The opcode is included as a part of the transaction data, typically as a header and in hex format.

When the daemon detects the opcode in the raw data, the daemon understands what is being asked by the developer and performs the appropriate action.

Originally, Bitcoin had many opcodes available. Satoshi disabled a large number of opcodes for stability reasons. To see a list of current opcodes in Bitcoin, [visit the Bitcoin wiki.](https://en.bitcoin.it/wiki/Script#Opcodes) 

#### A New Op Code: OP_CheckCryptoCondition 

The CryptoConditions standard itself relies on a new opcode, OP_CHECKCRYPTOCONDITION, or OP_CCC for brevity.

This opcode is not included in the Bitcoin protocol. Rather, the OP_CCC standard was originally written and designed by the Interledger team. The full, original OP_CCC specification is a thirty-three page document, [which you can see here.](https://tools.ietf.org/html/draft-thomas-crypto-conditions-04)

There is no need to read and master the entire original proposal, however, as Komodo's Antara Framework automates much of the underlying aspects. The primary takeaway is that the developer uses OP_CCC to create a "<b>CryptoConditions transaction</b>," also called a "<b>CC transaction</b>" for brevity.

A CC transaction includes several special features. This can include a logical condition that must be met for the utxo the transaction creates to be spent in the future. A CC transaction can also include a fulfillment of the logical conditions set forth in a previous CC transaction. The binary encodings of these CC transactions can be used in a Smart Chain utxo. These features are the foundation of a CC-related Antara Module.

OP_CCC provides many relatively convenient use cases, and the developer can expand on these use cases when necessary. For example, a standard use case of OP_CCC is a `1of1` CC script. This type of CC transaction requires only 1 signature, and is accompanied by a few custom constraints. Many of the current default Antara Modules rely on the `1of1` script OP_CCC.

A more intricate use case of OP_CCC, on the other hand, can be found in the upcoming Payments Module. This module uses a `1of2` CC script, which allows for one of two signatures to sign a CC transaction, and the script also features several customized constraints.

----------

[<b>Link to Next Tutorial in the Advanced Series</b>](../../../basic-docs/antara/antara-tutorials/advanced-series-2.html)

