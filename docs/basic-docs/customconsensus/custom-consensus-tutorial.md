# How to Build a New Custom Consensus Module

## Introduction

The following content and tutorial are provided for advanced developers desiring to discover deeper levels of potential in Komodo software. The content focuses around Komodo's framework for building blockchain-based decentralized applications (dApps). This framework is called, Custom Consensus, or CC for short.

#### Assumptions for this Content

This discussion is intended for developers who have a strong understanding of the C/C++ languages and who understand the core fundamentals of blockchain engineering, as these are prerequisites for use of the Custom Consensus (CC) framework.

Developers who possess this knowledge and who are already familiar with the essential nature of the CC framework may optionally skip all the following conceptual content and proceed directly to the tutorial.

<!--need link to next section, when it's available -->

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
