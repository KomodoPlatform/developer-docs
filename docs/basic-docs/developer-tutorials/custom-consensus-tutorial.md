# How to Build a New Custom Consensus Module

<!-- Sidd: Mylo is providing much more content than I originally envisioned. Will need to restructure the introduction and conceptual explanations to accommodate.-->

## Brief Note (Temporary)

All of the following tutorial content is not yet complete enough for me to be able to properly craft the overall structure of the content. I am still waiting on Part 2 of the tutorial, and there may also be a part 3.

As such, the section headings and navbar are still unfinished. Please ignore them.

The content, however, is fairly on par with what I expect the final product to be, so you can review that.

## Introduction

The following content and tutorial are provided for advanced developers desiring to discover deeper levels of potential in Komodo software. The content focuses around Komodo's framework for building blockchain-based decentralized applications (dApps). This framework is called, Custom Consensus, or CC for short.

#### Assumptions for this Content

This discussion is intended for developers who have a strong understanding of the C/C++ languages and who understand the core fundamentals of blockchain engineering, as these are prerequisites for use of the Custom Consensus (CC) framework.

Developers who possess this knowledge and who are already familiar with the essential nature of the CC framework may optionally skip all the following conceptual content and [proceed directly to the tutorial](../customconsensus/tutorial-introduction.html).

If the developer needs more experience with blockchain technology, the Komodo team recommends that the developer first study the seminal textbook, [Mastering Bitcoin,](https://bitcoinbook.info/) before approaching the CC framework.

Also, experienced developers who write in other languages, such as Python, JavaScript, or Solidity, may find value in skimming this discussion to understand key concepts at a high level. At this time, the CC framework has not expanded to include other languages, but Komodo may change this offering in the forseeable future.

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

## API Tutorials: Introduction

Now that the developer has an understanding of the general concepts of blockchain technology and Custom Consensus, the following tutorial can assist in gaining hands-on experience.

In this tutorial, we create two new blockchains, called RT1 & RT2. 

The first blockchain, RT1, demonstrates the fundamental API concepts, such as how to create and utilize a simple test blockchain, how to query a blockchain for data, etc.

The RT2 blockchain demonstrates the creation of a custom application-specific blockchain that <!--Sidd: Mylo, your original sentence cut off here -->

For simplicity's sake, we use the blockchain [<b>regtest</b>](../installations/common-runtime-parameters.html#regtest) feature, which allows us to run a blockchain on a single node without having to connect to a network. 

After the tutorial, the developer should be able to repeat the same concepts on live and fully functional Komodo asset chains, assuming the asset chain in question has the proper CC features enabled.

Also, after completing the tutorial, the developer should be prepared to continue learning more about CC through study of the source code of [existing CC modules](https://github.com/jl777/komodo/tree/master/src/cc).

### Tutorial Prerequisites

#### komodod and komodo-cli

The following tutorials assume that you have already [compiled the Komodo daemon](https://docs.komodoplatform.com/komodo/installation.html), and that you have used the default `~/komodo/src` directory as the root Komodo software directory.

As with all software related to `komodod`, at the command line we use the terminal-based `komodo-cli` software, and the `curl` command, to access the daemon. 

## Komodo API Fundamentals Tutorial

The following tutorial instructs the reader in basic fundamentals for utilizing the Komodo API. Familiarity with these fundamentals is prerequisite knowledge before attempting more advantanced usage of Komodo software.

Topics covered in this tutorial include:

- How to create a simple blockchain for testing purposes
- How to execute a komodo-cli command to query the blockchain for existing data
- How to execute a curl command for the same purpose
- Understanding common API methods ("RPC's")
- Understanding common technology concepts in the Komodo ecosystem

### Create a Regtest Blockchain

The quickest way to establish your own development environment is to use the [<b>regtest</b>](../installations/common-runtime-parameters.html#regtest) feature. 

In regtest mode, the daemon creates a blockchain that is almost fully functional, save for a few exceptions. Two of the exceptions are that the chain runs on a single host, and the user instructs the daemon on when and how to perform new blocks (as opposed to receiving new blocks from a decentralized network of miners).

The command to create our `RT1` regtest chain is as follows:

```bash
./komodod -regtest -ac_name=RT1 -ac_supply=1000 &
```

##### ac_supply

Note the `-ac_supply=1000` argument. This is the total number of coins we desire when the blockchain spawns. 

For more information, refer to the [<b>ac_supply</b>](../installations/asset-chain-parameters.html#ac-supply) launch parameter.

##### ac_name

Also note the `-ac_name=RT1` argument. This is the blockchain ticker name we desire. For more information, refer to the [<b>ac_name</b>](../installations/asset-chain-parameters.html#ac-name) launch parameter.

There are many additional parameters that you can explore later in the [Asset Chain Parameters](../installations/asset-chain-parameters.html) documentation.

##### Observe the Response

The daemon will return a response similar to the following: 

```txt
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

From the response, note the following information:

##### Asset Chain Supply

```txt
ASSETCHAINS_SUPPLY 1000
```

We see the 1000 coin initial supply.

##### Configuration File Location

```txt
Created (/home/mylo/.komodo/RT1/RT1.conf)
```

This is the location of the configuration file.

Placing the configuration data here follows the Komodo convention of placing all relevant data for an asset chain in a subdirectory contained in the `~/.komodo/` directory. The new subdirectory for our regtest chain is named after the `RT1` value we gave to the `ac_name` parameter.

##### Relevant RPC Data

```txt
>>>>>>>>>> RT1: p2p.13100 rpc.13101 magic.fd772ab9 4252445369 1000 coins
``` 

This information is the blockchain name, its network ports used for p2p (13100), and rpc control (13101).  The magic number is a number the Komodo daemon uses for network purposes, and the number of coins is informational.

##### Explanation of All Initial Daemon Output

Here is an explanation of all of the output, as it appears in the above response. Many of the actual values will be different on your machine, although the underlying purpose of the value is the same.

| Value | Description |
| ----- | ----------- |
| [1] 22892 | the process number; the value is dependent on your machine and will be different | 
| ASSETCHAINS_SUPPLY 1000 | the number of coins when the blockchain initiates for its first time |
| MAX_MONEY 106320417438 1063.20417438 | this value is not important at this time; it states that 100 billion coins is the maxmium possible amount the blockchain can mathematically support |
| Created (/home/mylo/.komodo/RT1/RT1.conf) | the location of the configuration file |
| call komodo_args.(./komodod) NOTARY_PUBKEY.() | this value specifies where the new coins from block rewards are sent; by default, the coins will be sent to your node's local wallet |
| >>>>>>>>>> RT1: p2p.13100 rpc.13101 magic.fd772ab9 4252445369 1000 coins | the blockchain name, its network ports and rpc controls; the magic number is used in Komodo networking and the number of coins derives from the <b>ac_supply</b> parameter included at runtime |  
| initialized RT1 at 1555581638 | the time in seconds, past epoch, when the blockchain was initialized | 
| finished loading blocks RT1 | informational |
| fAddressIndex.0/0 fSpentIndex.0/0 | informational and can be ignored for now |
| height.0 slowflag.1 possible.1 cmp.0 | informational and can be ignored for now |

### Querying the Blockchain Using komodo-cli

With the regtest asset chain operational we are prepared to execute our first API call. 

#### Access a Daemon via komodo-cli on an Asset Chain

When using `komodo-cli` to access the daemon of an asset chain, we must add an additional argument to each terminal input.

This required argument is the name of the asset chain for which the user desires `komodo-cli` to connect. The name is provided in the same format used to launch the chain. 

In our tutorial, the argument is: `-ac_name=RT1`

Furthermore, as we are using the regtest feature, we must also include the `-regtest` argument with each terminal input.

Therefore, each `komodo-cli` terminal input will begin with the following:

```bash
./komodo-cli -regtest -ac_name=RT1 INSERT_API_CALL_HERE INSERT_ARGUMENTS_HERE
```

#### Using the getinfo API Method

The [<b>getinfo</b>](../komodo-api/control.html#getinfo) API method does not require any additional parameters when called and provides useful information about our chain.

To execute the method in the terminal we can use the `komodo-cli` software:

```bash
./komodo-cli -regtest -ac_name=RT1 getinfo
```

The response:

```json
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

Note the `blocks` count of zero `0` and the `balance` sum of `0`. While our regtest chain's daemon is operational, we have yet to mine the genesis block and collect the initial coin value. 

### Querying the Blockchain Using curl

Alternatively, we can execute the [<b>getinfo</b>](../komodo-api/control.html#getinfo) method using the unix `curl` command. 

##### Sourcing the Configuration File

The `curl` command will also need information about which asset-chain daemon the user desires to connect. However, the `curl` command will receive these instructions in a different manner.

The user must provide the `myrpcuser`, `myrpcpassword`, and `myrpcport` values from the asset chain's configuration file.

The configuration file is automatically generated on asset-chain creation, and is formatted for use with the unix `source` command. 

To import all values into our terminal process environment, execute the following:

```bash
source ~/.komodo/RT1/RT1.conf
```

We can test that the variables were loaded correctly with the following commands:

```bash
echo $rpcuser $rpcpassword $rpcport
```

The terminal should return the values from the configuration file. 

##### Executing the curl Command

With these variables set we can now easily use the `curl` command to execute the `getinfo` API method:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

We execute the `curl` command with `-s` silent option; this mutes irrelevant response data.

The `$rpcuser:$rpcpassword` and the `...$rpcport` arguments utilize our sourced environment variables.

The HTTP header `-H`, `--data-binary`, and `content-type: text/plain;` arguments instruct `curl` to reply with a json object.

Without further intervention, the returned json response will be unformatted and difficult to read.

To improve readability, the developer may optionally install and utilize the `jq` terminal software.

[Link to download and install <b>jq</b>](https://stedolan.github.io/jq/download/)

Once installed, add a `|` pipe and a ` jq '.'` reference at the end of the curl command:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

This should return a well formatted json object.

## Preparing Your Local Wallet

The wallet is not part of the blockchain. Rather, it is a separate application that tracks your private keys and grants access to them upon user request. This separate application is built into the Komodo daemon and can be accessed using the API. 

Common API commands include the following:

| Command | Description |
| ------- | ----------- |
|[<b>getnewaddress</b>](../komodo-api/wallet.html#getnewaddress) | get a new address |
| [<b>validateaddress</b>](../komodo-api/util.html#validateaddress) | get the public key of the new address; used often when developing a custom application-specific blockchain |
| [<b>dumpprivkey</b>](../komodo-api/wallet.html#dumpprivkey) | get the private key of an address |

We save details from each response, so that we may avoid continually obtaining new wallet keys.

The next two sections demonstrate how to obtain a new private key. The first section uses `komodo-cli` software, and the second section repeats the same API steps using the `curl` command.

### Preparing Your Wallet Using komodo-cli

#### getnewaddress

To obtain a new address, we use the `getnewaddress` API method:

```bash
./komodo-cli -regtest -ac_name=RT1 getnewaddress
```

Response:

```json
RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs
```

Your response will be a different address of the same format.

#### validateaddress

To obtain the public key, also called the "pubkey", we use the `validateaddress` API method.

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

Make a note of the `pubkey` value. We will use it towards the end of the tutorial.

#### dumpprivkey

Use the response from `getnewaddress` as an argument for the `dumpprivkey` API method.

```bash
./komodo-cli -regtest -ac_name=RT1 dumpprivkey RWbzxx8tKncvcVBzBCetMsPRrcB3YFsXhw
```

```json
REDACTED_FOR_TUTORIAL
```
The response is the private key for this address.

The private key should never be shared under any circumstances. We have redacted the response for this tutorial.

### Preparing Your Wallet Using curl

#### getnewaddress

A `curl` command to obtain a new address using the `getnewaddress` API method:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getnewaddress", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

Response:

```json
{
  "result": "RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B",
  "error": null,
  "id": "curltest"
}
```

#### validateaddress

A `curl` command to obtain the `pubkey` using the `validateaddress` API method:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "validateaddress", "params": ["RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

Response:

```json
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

#### dumpprivkey

A `curl` command to obtain the `pubkey` using the `validateaddress` API method:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "dumpprivkey", "params": ["RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

Response:

```json
{
  "result": "REDACTED_FOR_TUTORIAL",
  "error": null,
  "id": "curltest"
}
```

## Generating Blocks and Getting the New Coins

When connecting to an existing blockchain that already has a populated network of miners or stakers, the user does not need to be concerned about how blocks are generated.

However, in this tutorial we are running a regtest chain, and therefore we must instruct the daemon to generate new blocks.

This also provides us with a useful opportunity to discuss the nature of simple mining in the Komodo ecosystem. The methods we discuss here reflect mining on a proof-of-work based asset chain. 

The reader should be aware that Komodo also offers proof-of-stake mining, and hybrid models that blend proof-of-work with proof-of-stake. For more information, the reader may turn to the [<b>ac_staked</b>](../installations/asset-chain-parameters.html#ac-staked) feature.

Here are several common API methods for mining:

| Command | Description |
| ------- | ----------- |
| [generate](../komodo-api/generate.html#generate) | the number of blocks to generate |
| [getblock](../komodo-api/blockchain.html#getblock) | query information about a block |
| [gettransaction](../komodo-api/wallet.html#gettransaction) | query a transaction |

In a moment, we will use these commands to generate new blocks on our regtest chain, and in the process of generating, the blockchain will create new coins.

#### Understanding the Coinbase Transaction

The reader should be aware of the manner in which a blockchain creates new coins. 

When a blockchain initiates for the first time, and before it has mined the first block, the total sum of coins on the blockchain is always `0`. 

To add coins into the total coin supply, the blockchain must mint new coins. This minting process occurs in a special transaction that is included as the first transaction in each block of the blockchain. 

This transaction is called the `coinbase` transaction.

While every other transaction on the blockchain can only take coins from the existing supply, the `coinbase` transaction may create new coins from nothing.

These new coins can be sent to any number of locations. The rules of the blockchain, as set by the blockchain's developer, determine how many coins are minted, and who receives the coins. 

For more information about how to customize your `coinbase` transactions on a Komodo asset chain, observe the many different customization parameters in the [Custom Asset Chain Parameters](../installations/asset-chain-parameters.html#ac-name) documentation.

For example, read about [<b>ac_reward</b>](../installations/asset-chain-parameters.html#ac-reward), [<b>ac_eras</b>](../installations/asset-chain-parameters.html#ac-eras), [<b>ac_founders</b>](../installations/asset-chain-parameters.html#ac-founders), and many others.

In our tutorial, when we mine our first block, all of the `1000` new coins we indicated will be mined in the first block's `coinbase` transaction. By default, these coins are distributed immediately into our own local wallet. 

### Generating Blocks Using komodo-cli

#### generate

We now generate a few blocks using the `generate` API method:

```bash
./komodo-cli -regtest -ac_name=RT1 generate 2
```

Response:

```json
[
  "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
  "0de2bb48b3a3ef47d5ece90b1ffeccc81b9609879ab86cc03a77cf248adea25d"
]
```

The response contains an array of blockhashes. These are the hashes of the blocks generated.

#### getblock

To inspect the particular information about any given block, we use the `getblock` API method and include our desired blockhash as an argument.

```bash
./komodo-cli -regtest -ac_name=RT1 getblock 0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab
```

Alternatively, with `getblock` we can instead include the desired block `height` of the block we wish to inspect. 

In our case, we desire to inspect the genesis block, which is the first block ever mined on our asset chain. Therefore, the block `height` will be `1`.

```bash
./komodo-cli -regtest -ac_name=RT1 getblock 1
```

Here is the response:

```json
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

Note in the response the `tx` value.

```json

    ...

  "tx": [
    "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"
  ],

    ...

```

This value is an array containing all transactions performed within this block. Because it is the genesis block, and because we did not send any transactions on our blockchain, the only transaction is our `coinbase` transaction, wherein the `1000` coins were minted and sent to our local wallet.

#### gettransaction

To observe this transaction, we use the [<b>gettransaction</b>](../komodo-api/wallet.html#gettransaction) API method.

```bash
./komodo-cli -regtest -ac_name=RT1 gettransaction 4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006
```

Response:

```json
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

Note that the `amount` value is slightly higher than `1000`. This is normal. It is due to the internal mathematical complexities of a blockchain.

### Generating Blocks Using curl

#### generate

We have already generated the genesis block. The following is a sample of using `curl` with the `generate` API method to generate 5 blocks.

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "generate", "params": [5]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

<collapse-text hidden title="Response">
```json
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
</collapse-text>

#### getblock

Here is a sample of using `curl` with the `getblock` API method on the blockhash of the genesis block:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

To use the block `height` instead, the `curl` command is formatted thus:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["1"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

<collapse-text hidden title="Response">

```json
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
</collapse-text>

#### gettransaction

Here is the `curl` command to retrieve the first block's `coinbase` transaction:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "gettransaction", "params": ["4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

<collapse-text hidden title="Response">
```json
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
</collapse-text>


## Inspecting the wallet

We have generated blocks and received the value from the `coinbase` transactions. Now, we would like to inspect the contents of our wallet. We will execute the [<b>listunspent</b>]() method for this purpose. 

However, before we execute this command, the reader should familiarize themselves with the way a blockchain stores value in a wallet. The title of the technical concept to understand is, <b>"utxo."</b> This stands for "unspent transaction." 

The way a utxo works is often difficult to understand for newcomers to blockchain technology. We have provided an article that explains this concept in more detail here, and we recommend the reader study it before proceeding.

[Click Here to Read Our Explanation of the Utxo](https://komodoplatform.com/whats-utxo/)

Also, the reader may turn to Chapter 6, Section 3 of the Komodo whitepaper. Search for the section titled, <u>"The Utxo: An elusive, yet fundamental concept."</u>

[Click Here to Read the Komodo Whitepaper; Search for Chapter 6, Section 3](https://komodoplatform.com/whitepaper)

In blockchain technology, all value is contained within utxos. Every transaction consumes a utxo and creates new utxos.

Once you are comfortably familiar with the concept, you are prepared to continue with the tutorial.

### Listing Unspent Transactions Using komodo-cli

A developer should be able to easily validate ownership of a utxo, as only the owner of a utxo is able to spend it. 

#### listunspent

For this purpose, we turn to the [<b>listunspent</b>](../komodo-api/wallet.html#listunspent) API method:

```bash
./komodo-cli -regtest -ac_name=RT1 listunspent
```

The response is an array of transactions ids, called `txid` for brevity's sake.

```json
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

### Listing Unspent Transactions Using curl

With `curl`, the terminal command for `listunspent` is as follows:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "listunspent", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

<collapse-text hidden title="Response">
```json
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
</collapse-text>

## Setting the pubkey Parameter

Observe this first `txid` returned from the `listunspent` transaction:

```json
  ...

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

  ...
```

Notice that the address to which these `1000` coins were sent is not the address we generated earlier. Rather, it is an entirely new address. At the moment we may not mind, because the coins were sent to an address that the wallet automatically generated and which we own. 

However, what if we want to control the address to which coins are sent when mining? When this is the case, we turn to the [<b>pubkey</b>](../installations/common-runtime-parameters.html#pubkey) launch parameter.

The `pubkey` we input into this parameter can be the same `pubkey` we generated earlier in the tutorial. 

#### Stopping the Daemon Using komodo-cli

To place this pubkey at startup, we must first stop the asset chain.

For this we use the [<b>stop</b>](../komodo-api/control.html#stop) API method:

```bash
./komodo-cli -regtest -ac_name=RT1 stop
```

Response:

```
RT1 server stopping
```

#### Stopping the Daemon Using curl

Using `curl` to stop the daemon:

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

#### Restarting the Asset Chain With the pubkey Parameter

Execute the following to relaunch `komodod` with the `pubkey` we saved at the beginning of the tutorial:

```
./komodod -regtest -ac_name=RT1 -ac_supply=1000 -pubkey=0350dd9b828e92600166dd74e521ac8510eb39064dfb30111c990396864542ce56 &
```

Now, when we generate new blocks, the `coinbase` transaction sends new coins to the new address associated with our `pubkey`.

First, we generate a new block using komodo-cli.

```bash
./komodo-cli -regtest -ac_name=RT1 generate 1
```

Response:

```json
[
  "06a639d7821f6ee803c6c53fe53a6b1dfe65063240ebc3a2907f7658cad8301e"
]
```

We can repeat the `getblock` method on the blockhash returned above to see the `coinbase` transaction.

With that `coinbase` transaction, we can the execute `gettransaction` to see the address to which the new coins were sent. 

After executing these previously explained methods, here is a snippet of the final result:


```json
...
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

Note that the `address` in this output is the one associated with our desired `pubkey`.

## Closing

Some of the fundamental blockchain and API skills we have learned include the following:

- How to create a new Komodo asset chain
- How to make a single-node regtest chain, for development purposes
- How to launch with the pubkey set
- How to generate new blocks
- How to obtain information about blocks and transactions
- The nature of a utxo
- The nature of a coinbase transaction

Having completed this tutorial, the developer should be able to explore the many API methods in the Komodo documentation.

In our next tutorial, we will cover ... (continued)
