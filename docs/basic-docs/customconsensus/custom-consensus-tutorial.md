# How to Build a New Custom Consensus Module

## Introduction

The following content and tutorial are provided for advanced developers desiring to discover deeper levels of potential in Komodo software. The content focuses around Komodo's framework for building blockchain-based decentralized applications (dApps). This framework is called, Custom Consensus, or CC for short.

#### Assumptions for this Content

This discussion is intended for developers who have a strong understanding of the C/C++ languages and who understand the core fundamentals of blockchain engineering, as these are prerequisites for use of the Custom Consensus (CC) framework.

Developers who possess this knowledge and who are already familiar with the essential nature of the CC framework may optionally skip all the following conceptual content and proceed directly to the [tutorial](../customconsensus/tutorial-introduction.html).

If the developer needs more experience with blockchain technology, the Komodo team recommends that they first study the seminal textbook, [Mastering Bitcoin,](https://bitcoinbook.info/) before approaching the CC framework.

Also, experienced developers who write in other languages, such as Python, JavaScript, or Solidity, may find value in skimming this discussion to understand key concepts at a high level. At this time, the CC framework has not expanded to include other languages, but Komodo may change this offering in the forseeable future.

#### Note for Other Developers

While creating a new Custom Consensus (CC) module requires a high level of specific blockchain and coding knowledge, developers who do not have this specific knowledge may still benefit from the CC framework.

Each module built on the CC framework can be designed to have API commands that can be called quickly and easily from other software and programming languages. Most CC modules that are added to the core `komodod` software have their API documentation added to this website.

For example, consider the MuSig CC module. This module relies on the CC framework to enable a complicated technology called Schnorr Signatures, which are a new method for creating multi-signature blockchain transactions. The API for this module allows any developer of essentially any skill level to adopt the MuSig functionality into the developer's software without having to gain an in-depth understanding of Schnorr technology.

[See the MuSig module documentation here](../customconsensus/musig.html#introduction)

As the library of available modules grows, so too do the advantages to the many types of developers in the Komodo ecosystem. For this reason, members of the Komodo community express gratitude to the more experienced blockchain developers who build and share CC modules via open-source ideology.

## Conceptual Explanation

Custom Consensus (CC) is a framework for making decentralized applications (dApps). The framework is built in the C and C++ languages. The reader may better understand the purpose and use case of CC by first understanding the key problem that CC solves.

### A Consensus Mechanism Is Not Easy to Create or Change

Adding new code into a blockchain's consensus mechanism (CM) is a challenging task. Creating an entirely new CM is more difficult by an order of magnitude. Yet, despite these facts, often when an experienced developer first approaches blockchain technology with creative intent, their initial impulse is to dive directly into the CM itself. As time passes, the developer can come to a realization that they are attempting to solve a problem that is too large for any one person.

Consider the Bitcoin consensus mechanism. This protocol is approximately ten years old and receives perhaps more attention than all other blockchain protocols combined. Every year, thousands upon thousands of the world's most intelligent developers, mathematicians, and cryptographers pore over the intricacies of this profitable technology. Yet, despite all this valuable insight, mistakes in the code continue to reveal themselves: in 2018, the Bitcoin Core and Bitcoin Cash teams together [discovered a flaw in the code](https://www.coindesk.com/the-latest-bitcoin-bug-was-so-bad-developers-kept-its-full-details-a-secret) that would have allowed a malicious user to print an arbitrary number of new Bitcoins.

<!-- below: need a link to that flow path for the "viable use case for a blockchain" flow path -->

Mistakes in the code of a CM can cause economic instability, and volatility of this nature can wreak havoc on the lives of the CM's users. For this reason, seasoned blockchain engineers often avoid changing the CM altogether, once it is relatively stable.

For those few projects that create a useful and unique consensus mechanism, a new challenge immediately presents itself. If the CM relies on a Proof of Work type model, the project team must attract a sufficient number of miners. If the CM is more akin to Proof of Stake, the team must ensure the blockchain's total stake is distributed in a manner that ensures trustlessness. Neither of these tasks are easy to achieve.

In light of these challenges, the blockchain engineer finds themselves confronted with a paradox. The engineer desires to create something new, and at the same time, they cannot easily change the core software.

### A Popular, But Flawed Solution: The Decentralized Virtual Machine

A popular solution to this paradox is to associate the consensus mechanism (CM) with a virtual machine (VM). This method was made popular by the Ethereum project.

In this model, the CM's design can be similar to existing and stable CM's, but it has one difference. The CM listens to instructions given by an external VM that is decentralized across all validating nodes. While code inside the VM can be arbitrary, the CM does not listen to the code's execution. Instead, the CM only listens to the same data as before: the history of transactions and associated meta data.

This solution is more effective than writing an entirely new CM, yet the solution is limited. The limitations include: the requirement of working in the mandatory VM programming language, such as Solidity; an excessive dependency on the core-software development team; volatile economics, and a lack of blockchain processing and storage capacity.

The requirement of the limited programming language derives from security concerns. All validating nodes in the decentralized VM must run all blockchain-related code in the ecosystem. Having this code written in a unique language designed for the VM reduces the available opportunities to malicious actors. While the limitation provides baseline security, the customized and often unstable nature of the VM programming language can make the creative process difficult. Also, the need to master a new language adds an additional burden to the developer.

The dependency on the blockchain's core engineers also slows creative progress for ecosystem developers. When the ecosystem developer discovers a new core-level technology that would increase the developer's productivity and creativity, they must convince the core-software team to implement the new feature. The core-software engineers may have conflicting interests, as their needs must meet the needs of all developers and users in their ecosystem.

In many of the VM-based models, economics for blockchain usage can be volatile, and blockchain storage and speed are often in short supply. The economics can be adversely unpredictable, because the underlying "gas" token that the VM requires (such as Ether) can change in price and value according to the interests of the uneducated masses. This may sound advantageous to a speculator, but for a practical business attempting to consistently please a customer, the volatility can scare away new users.

Furthermore, as the VM frequently relies on a single blockchain, block space can be in short supply due to high demand on popular chains, and data that is entirely irrelevant to the developer can become required baggage to maintain their own data validation.

These challenges make the VM model unpleasant for many experienced blockchain engineers. In fact, before Komodo existed, these very concerns inspired the Komodo engineers to avoid the VM model in search of a better solution for blockchain creativity. Custom Consensus is this solution.

### Custom Consensus: Creativity at the Consensus Level, Without Losing the Consensus Mechanism

Custom Consensus (CC) allows a developer to add arbitrary code at the consensus level, and within the core software's daemon, without interferring with the existing consensus mechanism (CM). This grants the developer the ability to add core-level features and innovations without waiting for other members of the Komodo ecosystem. Combined with Komodo's Bitcoin-hash rate security, the simplicity of CC provides the developer with a competitive level of creative freedom.

The entry point between the CC framework and the CM is a new Bitcoin-script [operation code](https://bitcoin.org/en/glossary/op-code), "OP_CHECKCRYPTOCONDITIONS", or OP_CCC for short. When executed, OP_CCC is able to initiate additional arbitrary code that is written in any programming language, assuming the language can call and execute C/C++ code in return. The arbitrary code is separate from the CM, thus maintaining the CM's reliability. When the arbitrary code completes, OP_CCC returns a `true` or `false` statement to the daemon.

If the returned OP_CCC value is `true`, the daemon performs a transaction. The transaction can contain meta data in the normal manner. As an aside, these transactions can implement other data-storage features of Komodo software. Examples include the [key-value storage](../komodo-api/blockchain.html#kvupdate) feature, the [Oracles CC Module](../customconsensus/oracles.html#introduction), or using the native `vout` and `batontxid` properties of a utxo as a database (see the [Rogue CC Module](../customconsensus/rogue.html). 

With access to the meta data established, CC is able to act as application-state manager. State-related data is held in utxos that are accessible to the CM. As the application-state management aspect of CC can be based on the utxo model, the application-state aspect can follow the CM's rules for consensus. This powerful combination allows the developer to collect, organize, and act upon data in a securely decentralized manner.

In addition, once the data is notarized, it can also be called by other Komodo-based asset chains, depending on the manner in which the developer(s) form their chain. This allows developers to form clusters of blockchains to enhance their software, as opposed to relying on a single blockchain, or on a single child chain. The speed and data-storage capabilities of a cluster are thus exponentially greater than a VM-based competitor.

With the CC framework in place, the developer may add to their blockchains whatever creativity the developer can imagine.

### Custom Consensus In Action: Accomplishing Years' Worth of Work In But A Weekend

<!-- Point out how CC achieves everything in the VM model, without running multiple external softwars, such as the VM and any bridge technology needed to connect it. This makes the core development team faster, and simplifies the experience for the developer.-->

Examples of the power of Custom Consensus (CC) can be found by observing existing modules. Consider how CC allowed the Komodo ecosystem to swiftly and easily upgrade the Komodo consensus mechanism (CM) to include Quantum-Proofing capabilities.

In years past, many other blockchain projects <!--need list--> had focused on manually upgrading their CM for Quantum-Proof protection, and during the boom of 2017 this was sometimes touted as a key feature. Adding this manually to the <!-- add this --> CM was a time-consuming and expensive process. Paradoxically, once the new Quantum-Proof CM was achieved, it only served to isolate the project team. Their customized CM was incompatible with much of the activity in the open-source blockchain ecosystem, and therefore for each industry-wide technological advancement, the team often had to adapt on their own.

Komodo's engineers chose not to spend energy building a new CM, but rather they worked towards adding CC first. Once CC was available, the Komodo core software team took existing Quantum-Proofing technology, read summaries published by academics and researchers, and created a new CC module to add this functionality to the Komodo CM.

The time between project initiation and releasing a beta version for community testing was approximately one weekend. Only one core developer's attention was required. The Komodo daemon remains compatible with all other software features as before, able to quickly adopt new ideas from others in the open-source community as soon as they arrive. At the same time, users who desire Quantum-Proofing for their long-term financial interests have a CC tool readily available.

Also of note is the simplicity of CC architecture. All new code created for the Quantum-Proof module is contained in an optional library, and is included in compilation only for participating blockchains. The Komodo daemon has no need of an external VM. This eliminates what would otherwises be unnecessary baggage for the developer and the core engineers, and yet the daemon offers all the capabilities of a VM-based blockchain -- and arguably more.

The ability to adopt the ideas of others quickly, while maintaining the accomplishments, security, and compatibilities of one's predecessors, makes Custom Consensus a wise choice for experienced developers who wish to maintain a long-term course of productivity and creativity in their work.

## Tutorial Introduction

This assumes you have komodo compiled on linux and you are in the ~/komodo/src directory.

For other options please see alternatives including docker containers.

We will create two blockchains, called RT1 & RT2 in single host mode for developers.  The same tutorial can be done on live blockchains, you need to [create a seed node] or spin up a blockchain seed node with the [Chainlizard blockchain generator service](#).

The [configuration files](#) are automatically generated on start up and saved to ~/.komodo/RT1/RT1.conf & ~/.komodo/RT2/RT2.conf

RT1 will be used for a fundamental exercise.
RT2 will be used for an introduction to making a custom application specific blockchain that.

All commands will be done using `komodo-cli` from command line and `curl` for network programming.  All curl commands can be completed using Postman - just set the authorization to Basic Auth using the values from the [configuration file](#).  The body is raw and content type is text/plain.

# Check in with your fundamentals by creating a basic single host blockchain
## Create blockchain
```
./komodod -regtest -ac_name=RT1 -ac_supply=1000 &
```
The quickest way to spin up your own development environment is using `-regtest`.  In regtest mode, the blockchain runs on a single host and you control when blocks are produced.

The regtest mode is equivalent to the Ethereum ecosystem's ganache tool.

What you see on the screen is something like:
```
mylo@swift:~/komodo/src$ ./komodod -regtest -ac_name=RT1 -ac_supply=1000 &
[1] 22892
ASSETCHAINS_SUPPLY 1000
MAX_MONEY 106320417438 1063.20417438
Created (/home/mylo/.komodo/RT1/RT1.conf)
call komodo_args.(./komodod) NOTARY_PUBKEY.()
>>>>>>>>>> RT1: p2p.13100 rpc.13101 magic.fd772ab9 4252445369 1000 coins
initialized RT1 at 1555581638
finished loading blocks RT1
fAddressIndex.0/0 fSpentIndex.0/0
height.0 slowflag.1 possible.1 cmp.0

```
The important output for a developer is:
* `ASSETCHAINS_SUPPLY 1000` is the number of coins when the blockchain starts up. This [parameter](#) is passed into komodo with `-ac_supply` at start.
* `Created (/home/mylo/.komodo/RT1/RT1.conf)` is the [configuration file](#).  One of the [conventions](#) used by Komodo is all the data is stored in your [blockchain ticker name](#) subdirectory of the Komodo data directory.  The blockchain ticker name is set when the blockchain starts up.  This [parameter](#) is passed into komodo with `-ac_name` at start.
* `>>>>>>>>>> RT1: p2p.13100 rpc.13101 magic.fd772ab9 4252445369 1000 coins` are the blockchain name, it's network ports used for p2p (13100) and rpc control (13101).  The magic number and number of coins are informational.


All the output explained is:
* `[1] 22892` is the process number on my machine - yours will likely be different.
* `ASSETCHAINS_SUPPLY 1000` is the number of coins when the blockchain starts up. This [parameter](#) is passed into komodo with `-ac_supply` at start.
* `MAX_MONEY 106320417438 1063.20417438` is not important, it just means 100 billion coins is the maxmium for your blockchain.
* `Created (/home/mylo/.komodo/RT1/RT1.conf)` is the [configuration file](#).  One of the [conventions](#) used by Komodo is all the data is stored in your [blockchain ticker name](#) subdirectory of the Komodo data directory.  The blockchain ticker name is set when the blockchain starts up.  This [parameter](#) is passed into komodo with `-ac_name` at start.
* `call komodo_args.(./komodod) NOTARY_PUBKEY.()` specifies where the new coins from block rewards go.  The output is a bit of a misnomer, the notary key used on this server is simply the pubkey used on this server.  (Notary Nodes are a network security service.  The Komodo mainnet blockchain has 64 Notary Nodes globally.  A notarizing service for your network is not covered in this tutorial, and unless you have a team dedicated to blockchain security you will not need one.  The Komodo mainnet secures blockchains when enrolled in the blockchain security alliance.)
* `>>>>>>>>>> RT1: p2p.13100 rpc.13101 magic.fd772ab9 4252445369 1000 coins` are the blockchain name, it's network ports used for p2p (13100) and rpc control (13101).  The magic number and number of coins are informational.
* `initialized RT1 at 1555581638` is the time in seconds past epoch the blockchain was initialized.
* `finished loading blocks RT1` is informational.
* `fAddressIndex.0/0 fSpentIndex.0/0` is informational.
* `height.0 slowflag.1 possible.1 cmp.0` is informational.

## Querying the blockchain with `getinfo`
[Komodo API `getinfo` method](https://developers.komodoplatform.com/basic-docs/komodo-api/control.html#getinfo) does not require any parameters when called.
### Using komodo-cli `getinfo`
Using the `komodo-cli` application with the [Komodo API `getinfo` method](https://developers.komodoplatform.com/basic-docs/komodo-api/control.html#getinfo).
```
./komodo-cli -regtest -ac_name=RT1 getinfo
```
This outputs basic blockchain info.
Response:
```
{
  "version": 2001526,
  "protocolversion": 170007,
  "KMDversion": "0.3.3b",
  "notarized": 0,
  "prevMoMheight": 0,
  "notarizedhash": "0000000000000000000000000000000000000000000000000000000000000000",
  "notarizedtxid": "0000000000000000000000000000000000000000000000000000000000000000",
  "notarizedtxid_height": "mempool",
  "KMDnotarized_height": 0,
  "notarized_confirms": 0,
  "walletversion": 60000,
  "balance": 0.00000000,
  "blocks": 0,
  "longestchain": 0,
  "timeoffset": 0,
  "tiptime": 1296688602,
  "connections": 0,
  "proxy": "",
  "difficulty": 1,
  "testnet": false,
  "keypoololdest": 1555581641,
  "keypoolsize": 101,
  "paytxfee": 0.00000000,
  "relayfee": 0.00000100,
  "errors": "",
  "name": "RT1",
  "sapling": -1,
  "p2pport": 13100,
  "rpcport": 13101,
  "magic": -42521927,
  "premine": 1000
}
```
Note the `blocks` count of zero `(0)`.

### Using curl `getinfo`
The same can be queried by RPC over localhost using the [Komodo API `getinfo` RPC method](https://developers.komodoplatform.com/basic-docs/komodo-api/control.html#getinfo).  You will need your RPC user and password.  This was automatically generated when the blockchain started and is stored in the [configuration file](#), so using the `source`, variable substitution makes our developer lives easier.

```
source ~/.komodo/RT1/RT1.conf
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
If you do not have `jq` installed, remove the pipe character and the jq command `| jq '.'` from the example above.

Curl command has been called with `-s` silent option, `--user` from with the settings from [configuration file](#) which was `source`d for convenience.  The HTTP header `-H` for content-type was set to text/plain with our `--binary-data` - a JSON object requesting the method `getinfo`.

## Create a new set of keys in your wallet
The wallet is not part of the blockchain, it is a separate application but conveniently we have a wallet application built in.

Using:
* [Komodo API `getnewaddress` method](#) for getting a new address
* [Komodo API `validateaddress` method](https://developers.komodoplatform.com/basic-docs/komodo-api/util.html#validateaddress) for getting the public key of the new address which we use for doing custom application specific blockchain development.
* [Komodo API `dumpprivkey` method](#) for getting the private key of the new address


The address issued for this tutorial for `komodo-cli` is `RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs`.  Replace this with your new address from the following step.

The address issued for this tutorial using `curl` is `RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B`.  Replace this with your new address from the following step.

Save these details for your development so you don't have to keep re-issuing keys.
* Address:
* Pubkey:
* Privkey (never share):


### Using komodo-cli `getnewaddress`, `validateaddress` & `dumpprivkey`

```
./komodo-cli -regtest -ac_name=RT1 getnewaddress
RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs
```
The response will be an address, for me it was `RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs`.

Now to get the public key we issue the `validateaddress` method on the new address.
```
./komodo-cli -regtest -ac_name=RT1 validateaddress RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs
```
Response:
```
{
  "isvalid": true,
  "address": "RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs",
  "scriptPubKey": "76a91457afccfe042ee068257f95873e1fd3cd4aa210ad88ac",
  "segid": 28,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "0350dd9b828e92600166dd74e521ac8510eb39064dfb30111c990396864542ce56",
  "iscompressed": true,
  "account": ""
}
```
Make a note of the `pubkey`.  This will be used as a starting parameter for the application specific blockchain using Custom Consensus.


Now to get the private key, replace the address from the previous command.
```
./komodo-cli -regtest -ac_name=RT1 dumpprivkey RWbzxx8tKncvcVBzBCetMsPRrcB3YFsXhw
REDACTED_FOR_TUTORIAL
```
The response is the [private key (WIF)](#) for this address.  The private key should never be shared.  Never.  It has been redacted for the tutorial.


### Using curl `getnewaddress`, `validateaddress` & `dumpprivkey`
If using a new terminal, use the `source` to set command line variables.  (`source ~/.komodo/RT1/RT1.conf`)
```
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getnewaddress", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
Response:
```
{
  "result": "RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B",
  "error": null,
  "id": "curltest"
}
```
Now to get the public key we issue the `validateaddress` method on the new address.
```
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "validateaddress", "params": ["RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
Response:
```
{
  "result": {
    "isvalid": true,
    "address": "RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B",
    "scriptPubKey": "76a914fd3ca56e0dc10a080c1d351b42c75bd82fc76d2288ac",
    "segid": 56,
    "ismine": true,
    "iswatchonly": false,
    "isscript": false,
    "pubkey": "03cb108cdb893a4a6c72c2fe23768929ada335103c6fa2bea428f5204bd051dacc",
    "iscompressed": true,
    "account": ""
  },
  "error": null,
  "id": "curltest"
}
```
To get the [private key (WIF)](#) - never share the result.
```
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "dumpprivkey", "params": ["RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
Response:
```
{
  "result": "REDACTED_FOR_TUTORIAL",
  "error": null,
  "id": "curltest"
}
```

## Generating blocks and getting the new coins

* [Komodo API `generate` method](https://developers.komodoplatform.com/basic-docs/komodo-api/generate.html#generate) takes one parameter, the number of blocks to generate.  The response are the blockhashes for each of the blocks generated.
* [Komodo API `getblock` method](#) is used for querying the block, namely to get the coinbase transaction.
* [Komodo API `gettransaction` method](#) is used to query a transaction.


All of these blockhashes can be queried using `getblock`.  All the blocks have a [coinbase transaction](#) where newly mined blocks [create new coins](#).  The coinbase transaction is like any other transaction that can be queried, the new coins are called the [block reward](#).

### Using komodo-cli `generate`, `getblockhash` & `gettransaction`
Generating two blocks
```
./komodo-cli -regtest -ac_name=RT1 generate 2
```
Response:
```
[
  "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
  "0de2bb48b3a3ef47d5ece90b1ffeccc81b9609879ab86cc03a77cf248adea25d"
]
```
The response received is the blockhashes of the blocks created.  They will be different than the ones I received, because a blockhash is a deterministic (repeatable given the same inputs) procedure.  The inputs include things that will be different from system to system, including timestamps, public keys etc.

The first blockhash we will query.  This is the first block in our test blockchain RT1.  Substituting for your first blockhash you will get your blockchain info.

```
./komodo-cli -regtest -ac_name=RT1 getblock 0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab

OR

./komodo-cli -regtest -ac_name=RT1 getblock 1
```
Response:
```
{
  "hash": "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
  "confirmations": 2,
  "rawconfirmations": 2,
  "size": 276,
  "height": 1,
  "version": 4,
  "merkleroot": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
  "segid": -1,
  "finalsaplingroot": "3e49b5f954aa9d3545bc6c37744661eea48d7c34e3000d82b7f0010c30f4c2fb",
  "tx": [
    "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"
  ],
  "time": 1555589136,
  "nonce": "0000d66a538f8cc7de721633f23e5d52649e5031a3f0a90e9821189e5b530056",
  "solution": "01de6014269f75bae931362838b75c5fc3e318c620d2a203d65b9d52691b3d056ae753fc",
  "bits": "200f0f0f",
  "difficulty": 1,
  "chainwork": "0000000000000000000000000000000000000000000000000000000000000022",
  "anchor": "59d2cde5e65c1414c32ba54f0fe4bdb3d67618125286e6a191317917c812c6d7",
  "blocktype": "mined",
  "valuePools": [
    {
      "id": "sprout",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0,
      "valueDelta": 0.00000000,
      "valueDeltaZat": 0
    },
    {
      "id": "sapling",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0,
      "valueDelta": 0.00000000,
      "valueDeltaZat": 0
    }
  ],
  "previousblockhash": "029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327",
  "nextblockhash": "0de2bb48b3a3ef47d5ece90b1ffeccc81b9609879ab86cc03a77cf248adea25d"
}
```
Now I will query my transaction `4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006` because the first block sends the coin supply of the blockchain to an address in our wallet.
```
./komodo-cli -regtest -ac_name=RT1 gettransaction 4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006
```
Response:
```
{
  "amount": 1000.07809721,
  "rawconfirmations": 2,
  "generated": true,
  "confirmations": 2,
  "blockhash": "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
  "blockindex": 0,
  "blocktime": 1555589136,
  "expiryheight": 0,
  "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
  "walletconflicts": [
  ],
  "time": 1555589136,
  "timereceived": 1555589136,
  "vjoinsplit": [
  ],
  "details": [
    {
      "account": "",
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "category": "generate",
      "amount": 1000.07809721,
      "vout": 0,
      "size": 98
    }
  ],
  "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff01b912ee4817000000232103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac1068b85c"
}
```


### Using curl `generate`, `getblockhash` & `gettransaction`
The `generate` curl command follows because we cannot regenerate our first block.

Remember, if you have opened a new terminal and authorization with curl fails, use the `source` for variable substitution (`source ~/.komodo/RT1/RT1.conf`)
```
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'

OR

curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["1"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
Response:
```
{
  "result": {
    "hash": "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
    "confirmations": 2,
    "rawconfirmations": 2,
    "size": 276,
    "height": 1,
    "version": 4,
    "merkleroot": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
    "segid": -1,
    "finalsaplingroot": "3e49b5f954aa9d3545bc6c37744661eea48d7c34e3000d82b7f0010c30f4c2fb",
    "tx": [
      "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"
    ],
    "time": 1555589136,
    "nonce": "0000d66a538f8cc7de721633f23e5d52649e5031a3f0a90e9821189e5b530056",
    "solution": "01de6014269f75bae931362838b75c5fc3e318c620d2a203d65b9d52691b3d056ae753fc",
    "bits": "200f0f0f",
    "difficulty": 1,
    "chainwork": "0000000000000000000000000000000000000000000000000000000000000022",
    "anchor": "59d2cde5e65c1414c32ba54f0fe4bdb3d67618125286e6a191317917c812c6d7",
    "blocktype": "mined",
    "valuePools": [
      {
        "id": "sprout",
        "monitored": true,
        "chainValue": 0,
        "chainValueZat": 0,
        "valueDelta": 0,
        "valueDeltaZat": 0
      },
      {
        "id": "sapling",
        "monitored": true,
        "chainValue": 0,
        "chainValueZat": 0,
        "valueDelta": 0,
        "valueDeltaZat": 0
      }
    ],
    "previousblockhash": "029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327",
    "nextblockhash": "0de2bb48b3a3ef47d5ece90b1ffeccc81b9609879ab86cc03a77cf248adea25d"
  },
  "error": null,
  "id": "curltest"
}

```
Getting the first transaction that sent the coins to the wallet at start up.
```
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "gettransaction", "params": ["4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
Response:
```
{
  "result": {
    "amount": 1000.07809721,
    "rawconfirmations": 2,
    "generated": true,
    "confirmations": 2,
    "blockhash": "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
    "blockindex": 0,
    "blocktime": 1555589136,
    "expiryheight": 0,
    "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
    "walletconflicts": [],
    "time": 1555589136,
    "timereceived": 1555589136,
    "vjoinsplit": [],
    "details": [
      {
        "account": "",
        "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
        "category": "generate",
        "amount": 1000.07809721,
        "vout": 0,
        "size": 98
      }
    ],
    "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff01b912ee4817000000232103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac1068b85c"
  },
  "error": null,
  "id": "curltest"
}
```
Because we can't regenerate the first block, a sample of the curl command for `generate` follows which generates 5 blocks.
```
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "generate", "params": [5]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
Response:
```
{
  "result": [
    "0561e5c9e81ff8823be080af1232a99c87c41cb208595da20cf461b4ed34f0a9",
    "0792db3d6976c16ead4c42d4a3fc949931979a0120aefb822b632758fb1968d4",
    "0975e3320f31cc4e06bb6cfba74ae6762517421535f3c1440c6e4c41cb2428df",
    "01102d09117d797253899b5b1a68a66d552e30fcc0fa964b4ab64005acfecf0b",
    "02f1df412f56aee2ea94380e7c59c10ed089481b3a37dc73b9c78577b73ce9f1"
  ],
  "error": null,
  "id": "curltest"
}
```

## Inspecting the wallet
It's time to inspect the contents of the wallet using the [Komodo API `listunspent` method](#).  Unspent transaction outputs (UTXOs) are the **fundamental unit of value**.  The ["What is a UTXO?"](https://komodoplatform.com/whats-utxo/) article goes into detail on the Komodo Platform website.

Everything is derived from the UTXO.  What is supremely important in the world of a developer is being able to validate ownership of an unspent transaction output.  Only the owner of a UTXO is able to spend their own UTXO.  These outputs are used as new transaction inputs, and become the next rightful owner's output to spend in the future.  The value never disappears and the history of value transfer is auditable on a transparent blockchain - because of the underlying trustless public key encryption system, based on the mathematic principals of encryption.

What we notice is the block rewards do not go to one of our generated addresses from this tutorial.  When the `komodod` runs without a `-pubkey` option, it will send the new coins to a new wallet address.  If the `-pubkey` parameter is passed in at start up, the block rewards will go to the address with this public key.

### Using komodo-cli `listunspent` & `stop`
```
./komodo-cli -regtest -ac_name=RT1 listunspent
```
Response:
```
[
  {
    "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 1000.07809721,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 7,
    "confirmations": 7,
    "spendable": true
  },
  {
    "txid": "148d8970e3c7e113bd3b4038c1efdd273a6d975f45b194b4257fda6acec4b14a",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 5,
    "confirmations": 5,
    "spendable": true
  },
  {
    "txid": "a0e13cad677b4fede6211c78069aed9345880147ea79edb647383787eb15fe51",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 6,
    "confirmations": 6,
    "spendable": true
  },
  {
    "txid": "01be6fa42a897009477f7a7248c538896ad39a24e132e9bcba00138c781fd57b",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 1,
    "confirmations": 1,
    "spendable": true
  },
  {
    "txid": "73ba44853735808e0b07c45bb1e1acd7c0323bc72e872d4bae92428ad03899be",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 3,
    "confirmations": 3,
    "spendable": true
  },
  {
    "txid": "78a401c6bb7765d73fedf1e2c033935db281a94a58d35f33e6986bda36e57bd5",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 2,
    "confirmations": 2,
    "spendable": true
  },
  {
    "txid": "d81523ef05f9d19abca61982f8c0d5374eb61ecb88c923226277bc0d3e7120e6",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 4,
    "confirmations": 4,
    "spendable": true
  }
]
```
Stopping our blockchain
```
./komodo-cli -regtest -ac_name=RT1 stop
```
Response:
```
RT1 server stopping
```

### Using curl `listunspent` & `stop`
```
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "listunspent", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
Response:
```
{
  "result": [
    {
      "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 1000.07809721,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 7,
      "confirmations": 7,
      "spendable": true
    },
    {
      "txid": "148d8970e3c7e113bd3b4038c1efdd273a6d975f45b194b4257fda6acec4b14a",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 5,
      "confirmations": 5,
      "spendable": true
    },
    {
      "txid": "a0e13cad677b4fede6211c78069aed9345880147ea79edb647383787eb15fe51",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 6,
      "confirmations": 6,
      "spendable": true
    },
    {
      "txid": "01be6fa42a897009477f7a7248c538896ad39a24e132e9bcba00138c781fd57b",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 1,
      "confirmations": 1,
      "spendable": true
    },
    {
      "txid": "73ba44853735808e0b07c45bb1e1acd7c0323bc72e872d4bae92428ad03899be",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 3,
      "confirmations": 3,
      "spendable": true
    },
    {
      "txid": "78a401c6bb7765d73fedf1e2c033935db281a94a58d35f33e6986bda36e57bd5",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 2,
      "confirmations": 2,
      "spendable": true
    },
    {
      "txid": "d81523ef05f9d19abca61982f8c0d5374eb61ecb88c923226277bc0d3e7120e6",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 4,
      "confirmations": 4,
      "spendable": true
    }
  ],
  "error": null,
  "id": "curltest"
}
```
Issuing `stop` by RPC
```
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "stop", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```
Response:
```
{
  "result": "RT1 server stopping",
  "error": null,
  "id": "curltest"
}
```
## Restarting RT1 with pubkey set

Restarting the RT1 test blockchain with a [`-ac_pubkey` parameter at start up](https://developers.komodoplatform.com/basic-docs/installations/asset-chain-parameters.html#ac-pubkey), and generating a block, the block reward goes to the address of the `-ac_pubkey`.

```
./komodod -regtest -ac_name=RT1 -ac_supply=1000 -pubkey=0350dd9b828e92600166dd74e521ac8510eb39064dfb30111c990396864542ce56 &
```
Generate a new block similar to earlier in the tutorial, then look at the output of the [Komodo API `listunspent` method].
```
./komodo-cli -regtest -ac_name=RT1 generate 1
[
  "06a639d7821f6ee803c6c53fe53a6b1dfe65063240ebc3a2907f7658cad8301e"
]
```
Optionally check out the [Komodo API `getblock` method](#) and the coinbase transaction.

Listunspent output:
```
...snipped
  {
    "txid": "2411800f0e9c15f5233453ffc17ff301f43043c70887c256a041945d341796f0",
    "vout": 0,
    "generated": true,
    "address": "RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs",
    "segid": 28,
    "account": "",
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "210350dd9b828e92600166dd74e521ac8510eb39064dfb30111c990396864542ce56ac",
    "rawconfirmations": 1,
    "confirmations": 1,
    "spendable": true
  }
...snipped
```
Note the `address` in this output.  It is the one associated with the `pubkey` from our [Komodo API `validateaddress` method].

## Closing
We have some fundamental knowledge that is useful for validating our own developments in the future.   We also know that by setting an `-ac_pubkey` at the launch of the blockchain, the network will pay that address - wherever in the network that wallet is, the blockchain will pay to the address.  We will see this when we start our next blockchain and create our own consensus rules for an on-chain application.

## (Outline) Sketch for the Next Sections

In this section, the reader will learn more about Custom Consensus through hands-on participation.

The agenda for this tutorial is the following:

    item 1
    item 2..."

Make sure they're oriented, and then away we go with the tutorial.

I haven't looked at your stuff in depth yet. From the quick skim, it does look like you've got it very well laid out. I appreciate how you take the time to speak slowly to the reader, making sure each step of the journey is covered with an appropriate explanation.

Once you and gcharang have all the necessary information put together, I'll edit it and write that final outro section.

If you can think of a few ideas for what we should leave our reader with, that would be great.

I was thinking something along the lines of,

"Now that the reader is introduced to Custom Consensus, the journey from here is entirely of in the realms of the imagination.

The reader may find insight by observing the manner in which other CC modules function. The Rogue CC module displays how different softwares can be combined into one CC module. The pieces of the Rogue module include the following:

    Customized CC code in this repository:
        Link to Repository
        These files in particular are of note:
            File 1: Link
            File 2: Link
    A combination with the Oracles CC module
        To learn more about the Oracles CC module, look here:
            Link to Oracles Documentation here
        Observe how the oracle is integrated into the Rogue Module this file here:
            File: Link
        The reader may see the oracle itself by installing the Rogue asset chain and executing an RPC to call the Oracle's oracle_txid
            Link to installation instructions for Rogue
            Link to RPC that returns oracle txid
        The reader may see the publisher that receives and publishes data by executing this call
            Link to RPC, and possibly an example of the cli command
    An implementation of this old-school Rogue softwares
        Link to Rogue software installation that we borrowed
        Link to manual
    Anything else Rogue took

S
13:17
These open-source softwares, in combination with the customized CC code from a trained Komodo developer, swiftly created a new CC module that displays how CC can be used in the gaming industry.

CC is also useful in many other industries. The Komodo team looks forward to discovering what the community creates. Please reach out to the Komodo team on Discord with questions and discoveries, and please reach out to the marketing team for assistance in displaying new ideas."

## Other Content Not Developed

Today, in looking through the many innovations occuring within the blockchain industry, an observant researcher can quickly discover that many ideas that are touted as "new" and "novel" are, in fact, old ideas. For example, the idea of a "smart contract" was explored as early as the 1980's by computer-science academics. Yet another example can be found in the early proposals of the complicated "zk-SNARKS" technology, which Komodo now offers for privacy-based transactions.

<!--link instead for zk-SNARKS-->

The reason the world never heard of these relatively old computer-science technologies until today is that they were useless without a consensus mechanism. Without a method whereby a user could prove for themselves, without having to trust their fellow users, whether the code executed properly, no smart-contract code nor zk-SNARK could ever be considered safe when dealing with real value. When Satoshi Nakamoto created the first functioning consensus mechanism, everything changed.

<!--Sidd: I need to add more specifics. This is all too general.-->

Creating a new consensus mechanism is not an easy task. Prior to the birth of Bitcoin there were hundreds of intelligent researchers and academics in small circles of the world of cryptography and academia, searching for the proper combination of cryptography and code. Even with all the attention placed on blockchain technology more recently, including billions of dollars in funding and hundreds of thousands of developers flooding into this industry, only a small handful of new consensus mechanisms have emerged.

To create a new consensus mechanism, one must create a sequence of highly technical code that can withstand the most rigorous of trials the world has to offer. Even Satoshi Nakamoto's own first attempts at creating the Bitcoin consensus mechanism were nowhere near secure. Over the years of early development, dozens of high-risk security flaws were discovered by the early blockchain intelligencia. This process continues even to this day, where recently a member of the industry discovered yet another flaw in Bitcoin and alerted the Bitcoin developers to swiftly correct the error.

While Bitcoin's first consensus mechanism

If this were easy, the world would have thousands of well functioning consensus mechanisms already. The name "Bit CC itself is not a standalone programming language. This is in contast to other popular blockchain platforms, such as Ethereum, where the creation of decentralized applications requires a unique programming language, such as Solidity.

#### Knowledge Requirements Before Attempting to Use Custom Consensus

At this time, the creation of a new CC module is only achievable among experienced C/C++ developers, and who possess a working knowledge of the principles of blockchain engineering.

Those who are not experienced developers, or who work on high-level languages, such as JavaScript and Python, may still take advantage of the CC

(Notes)

Summary:

Public key cryptography is used when a private and public key pair are used for proving something.
Private Keys are stored in a wallet, not on the blockchain.
Private keys sign transactions.
Signatures on transaction are proven by the network using the corresponding public key to spend the claimed ownership of funds.
Transactions fill blocks, like an item on a shopping list fills a piece of paper.
Blocks are arranged in sequential order, forming a chain.
Each block contains agreed transactional information. The proof of the transactional detail and it's arrangement in the block is called consensus. Consensus is achieved by each participant relying on their own computation.
Coins & Tokens are used in transaction details to transfer value.
Nodes is the jargon term for computers that do the computations to maintain the network.

jl777
bool custom_validate(struct CCcontract_info *cp,int32_t height,Eval *eval,const CTransaction tx)
{
char expectedaddress[64]; CPubKey pk;
if ( tx.vout.size() != 2 ) // make sure the tx only has 2 outputs
return eval->Invalid("invalid number of vouts");
else if ( custom_opretdecode(pk,tx.vout[1].scriptPubKey) != '1' ) // verify has opreturn
return eval->Invalid("invalid opreturn");
GetCCaddress(cp,expectedaddress,pk);
if ( IsCClibvout(cp,tx,0,expectedaddress) == COIN ) // make sure amount and destination matches
return(true);
else return eval->Invalid("invalid vout0 amount");
}
J
that is the validation function for the customcc.cpp EVAL_CUSTOM CC

jl777
THAT is the CC validation
J
it is invoked if you spend a CC vout with EVAL_CUSTOM evalcode
not sure what you mean by "into account"
mylo5ha5
custom_func1 is great btw. thx.

Ssiddhartha_crypto do you want to "normal coin" p2p consensus? mastering bitcoin book explains.

siddhartha_crypto
To put it into other words, to check for understanding:

This is the code of Custom Consensus that every machine must run to ensure that the consensus across all machines is the same?
S
jl777
yes. custom_validate is what has to return "true" for it to pass validation
J
siddhartha_crypto
Great
S

How would you describe (in common language) the challenges a developer would face when trying to write a "smart contract" (for lack of a better term) that relies on a blockchain?
jl777
it is a very simple CC, so the validation is really simple. as you make more CC methods, you need to add the corresponding validation. otherwise they are not validated
J
smart contract does not change consensus rules, it is an interpreted set of commands that must follow consensus
i have no idea how to put CC in the context of smart contract
siddhartha_crypto
smart contract does not change consensus rules, it is an interpreted set of commands that must follow consensus
S
this is good stuff
jl777
it is like trying to explain a 3D object when all you have are 2D.
J
i guess you can sort of explain it but it will always be approximations. when the actual thing is so simple, why not to discuss the real thing, instead of a simulation of something that must be interpreted
the first consensus took many years to get working stable, ie. bitcoin protocol

anytime there is a new consensus it is a BIG project
changing consensus rules with CC is a bit easier, ie. customcc.cpp. it is simple enough it is possible for a coder to do in a few hours for simple things and a weekend for not that complex things
instead of taking years, it is reduced to weeks or days
siddhartha_crypto
this is helpful
S
jl777
it is like being able to make a car with custom engines in it, without even having to make a new car, or even a new engine. just the exact thing that is different needs to be created

How accurate is this, for the next thing we say to him:

The reason why you would choose Komodo over [insert competitor], is that Komodo allows you to add your creativity into the consensus mechanism itself, without having to rewrite the consensus mechanism from scratch.

Let's say that you want to make a game, and you want to have the rules of gameplay be adopted as a part of the blockchain consensus mechanism. You don't want to have to run a centralized database, because then it would put the responsibility over consensus on your shoulders, instead of on your players. This saves you loads of hassle. Everyone can verify the blockchain, and therefore everyone can be assured that the gameplay and the blockchain are in harmony.

The problem is this: Once you start adding a gameplay rule to a normal blockchain, you're basically dealing with a whole new consensus mechanism. It took years to make the Bitcoin consensus mechanism stable.

when you try to add on your creativity, without a framework to help you, you are going to have to basically start from scratch.

CC allows you to add in your creativity, without having to start over in the testing phase.

The only rule is that you have to bring everything down to true/false. If the result of your creative code + the user's actions is true, then a transaction is executed. It can have any metadata or value transfer in it you want. If false, then no transaction is executed.

J
you are not understanding the magnitude of labor savings
siddhartha_crypto
How can I better understand it?
S
jl777
imagine you have the idea of a little gizmo to make a car run more efficiently. this is your expertise. it might be hard to do, but you are good at this
J
you can basically plug that into a CC and test a new blockchain using your value add, in a weekend
alternative is to what?
write a new blockchain from scratch?
siddhartha_crypto
right.
S
no need to build a new car, if you're just trying to build a better radio

mylo5ha5
the CC stuff....whatever they customize, they just have build the validation rules for what they build.
example:

i will let daniel to put 10KMD into a CC address
i will let myself put 1KMD into the same CC address
there is a value in an oracle that tracks how many hits on the komodo website a page gets
if one day a page get 1000 hits, the author gets teh CC address funds released to their address
the author & their key is mapped
The validation rules are:

the registered oracle value is >1000 (if not, do nothing)
if it's >1000, get the author's payout address
release the funds to that address

jl777
something that projects with \$100 mil of funding take years to get completed
J
assuming there is an oracle, the CC would use the consensus rule that checks the tx for the pubkey of who is trying to spend it. then depending on that pubkey, checking the oracle to make sure they are allowed to do whatever spend is in the tx
tx.vout[0].nValue is the amount
tx.vout[0].scriptPubKey is the spending script (destination)
siddhartha_crypto
Okay, from here we need to get more into the technical stuff, and this is where we need to rely on Mylo for help.
