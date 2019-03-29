# The Komodo Solution

## Abstract of the Delayed Proof Of Work Consensus Mechanism (dPOW)

Komodo presents a technology, the delayed Proof of Work consensus mechanism,
that solves the problems described above. Komodo’s unique consensus mechanism
provides the same level of security as the strongest PoW network, without attempting
direct competition. Instead, Komodo’s consensus mechanism uses the chosen PoW
network as a storage space for "backups" of Komodo transactions. By this method, in
the event of an attempted attack on Komodo’s blockchain history, even a single surviving copy of the Komodo main chain will allow the entire ecosystem to overwrite
and overrule any of the attacker’s attempted changes.

In a key difference separating Komodo from regular PoW networks, our dPoW consensus mechanism does not recognize the Longest Chain Rule for any transactions that are older than the most recent "backup" of the Komodo blockchain. For conflicts that may arise which refer to transactions that are older than the most recent "backup," our consensus mechanism looks to the backups in the chosen PoW blockchain to find the accurate record.

Furthermore, entrepreneurs who build independent blockchains (asset chains) in
the Komodo ecosystem can likewise elect to have backups of their own records inserted into the Komodo main chain. In this manner, the records of the entrepreneur’s
chain are then included in the backup that is pushed into the protective hash rate
of the main PoW blockchain (Bitcoin). Thus, entrepreneurs and developers in the
Komodo ecosystem can have their independent blockchains protected by the chosen
PoW network’s hash rate.

Therefore, to destroy even the smallest asset chain that is employing Komodo’s
dPoW security, the attacker would have to destroy: a) all existing copies of the asset
chain; b) all copies of the Komodo main chain; c) the accompanying PoW security
network into which the dPoW backups are inserted (Bitcoin). This endows the Komodo ecosystem with higher than Bitcoin-level security, while avoiding the excessive
financial and eco-unfriendly costs.

In addition, the dPoW security provided by Komodo is not only greater than Bitcoin, but is also more flexible. The Komodo security services are performed by notary nodes, chosen through a stake-weighted vote. Notary nodes have the freedom to
switch notarization to another PoW network. Reasons the notary nodes might elect
to switch networks could include an event where worldwide miners’ hashing power
changes to another PoW network, or the cost of notarization to the current PoW network becomes more than necessary. Through this flexibility, the Komodo ecosystem
maintains both a superior level of security and a more flexible and adaptive nature
than Bitcoin itself.

### A Note About Komodo’s Iguana Core Technology

All the following processes are supported by a deeper Komodo technology called
Iguana Core. Readers of our entire white paper will note that Iguana Core is featured
in each section. This is because Iguana Core is the heart of the underlying technology
that enables the vast Komodo ecosystem to work together. The Iguana Core code
itself is complex and to fully explain would require a separate white paper.

In short, Iguana Core is a collection of code that serves many purposes. One function of Iguana Core is to empower the blockchain technologies Komodo either builds
or adopts to act in coordination with each other. Often, Iguana Core can advance their
initial capabilities beyond original expectations. In the case of dPoW, the code that
underlies notary-node functionality spawned from Iguana Core technology.

Iguana Core is coded in the C programming language—the language of choice
of our lead developer, JL777. The C language is designed to enable computers to
process high volumes of information in a secure manner at high speed. This aligns
with Komodo’s directives to provide security and scalability to our users.

### A Brief Discussion on the Security Provided by the Notary Nodes

Security is the foundational aspect of the Komodo ecosystem. Therefore, for the
reader, we must first discuss the nature of the security the notary nodes provide.
More detailed explanations on individual components will follow.

The Komodo ecosystem uses a stake-weighted vote to elect parties who will run
sixty-four separate "notary nodes." These notary nodes perform the "backup" process
via automation provided by the Iguana Core software that runs at the heart of our
system. These backups are called "notarizations." Each notarization performed by the
notary nodes acts as a marker of the "true" history for the Komodo ecosystem, and
this marker’s accuracy is secured by the hash power of the chosen PoW network.

The notary nodes work together in a decentralized and trustless manner both to create each notarization and to write it to the chosen PoW network (Bitcoin). Frequency
varies between two to six notarizations per hour, and the yearly cost to perform this
service is ~180 BTC. Funds for this service were raised as a part of our initial Komodo
ICO, and our holdings allow us to continue this method for many years before we
will be required to implement a business model to replenish our reserves.

With our dPoW mechanism, each confirmation on the chosen PoW network is also
a confirmation of the entire Komodo ecosystem’s history. The only sacrifice that is
made is the time it takes to push the Komodo ecosystem’s records into the protection
of the main hash rate. For this reason, we name our consensus mechanism, "delayed
Proof of Work" (dPoW).

Our consensus mechanism is designed to keep the advantages provided by the
PoW system, circumvent the excessive financial and eco-unfriendly overhead costs,
and avoid the security risks found in a PoS system. We accomplish these measures
by several means. The most important measure is that all actions a notary node takes
are publicly verifiable, and the Iguana Core software running on the users’ machines
verifies notary nodes’ actions. The notary nodes themselves are not arbiters of "truth."

Therefore, the only type of "false" behavior a malicious notary node can perform
is to withhold notarization. There are sixty-four notary nodes. The minimum number of notary nodes required to maintain the Komodo ecosystem is thirteen. Thus,
a malicious actor would have to compromise fifty-one notary nodes to shut down
the Komodo ecosystem. Such an action would be uneconomic, as this would be destroying the access to the financial rewards a notary node receives for performing its
duties. By this design, notary nodes have only one economically favorable position:
to properly transfer the records of the Komodo ecosystem into a secure location and
to increase Komodo’s market share and value.

For the average user, when performing a trade of goods and services where security
is desired, the user simply needs to wait until the notarization process is complete.
After the notary nodes are finished, the only way to break the security protecting
their transaction history requires breaking the security of the chosen PoW network
(Bitcoin). The Iguana Core code running in the main Komodo software automates the
verification process. Entrepreneurs and developers should be aware of this information as they design business models and services for their users.

Thus, Komodo’s dPoW consensus mechanism maintains the security innovated
by Satoshi Nakamoto, and because it enables the Bitcoin hash rate to serve more
independent blockchains than just the single Bitcoin blockchain, dPoW even expands
on Nakamoto’s original design.

## The Notarization Process

### Step One: Gathering the Appropriate Data

The process of notarization is simple. Roughly every ten to twenty-five minutes,
the notary nodes perform a special block hash mined on the Komodo blockchain and
take note of the overall Komodo blockchain "height" (i.e. the number of total blocks
in the Komodo blockchain since inception). The notary nodes process this specific block in such a manner that their signatures are cryptographically included within
the content of the notarized data.

(All examples herein are estimated based off this actual KMD notarization to the BTC network:
[https://www.blocktrail.com/BTC/tx/313031a1ed2dbe12a20706dff48d3dffb0e39d15e3e4ff936d01f091fb3b8556#tx_messages](https://www.blocktrail.com/BTC/tx/313031a1ed2dbe12a20706dff48d3dffb0e39d15e3e4ff936d01f091fb3b8556#tx_messages))

The pieces going into the notarization process could look like this:

```bash
0a88371cc63969d29492110592189f839557e606db6f2b418ecfe8af24451c07
This is the "block hash" from the KMD blockchain—mined and cryptographically signed by the notary nodes
```

#### Block 607240

- This is the blockchain "height" of the Komodo blockchain at the time of notarization (i.e. the total number of KMD blocks ever created)

#### KMD

- The letters "KMD" are added into the notarization mixture to indicate the name of the blockchain to which this notarization belongs

The notary nodes will take these three pieces of information and compress them into
a format that is more computer-friendly. The result will look like this:

```bash
6a28071c4524afe8cf8e412b6fdb06e65795839f189205119294d26939c61c37880a084409004b4d4400
```

The above number can be said to be a cryptographic representation of all that has
happened on the Komodo blockchain up to this point in time. According to the Cascade Effect, were an attacker to attempt to go back in the history of the Komodo
blockchain and change even a single character of data, and then perform the same
hashing formulas in the Komodo code, the number above would dramatically change.

This makes the notary nodes’ notarization a useful backup, assuming this number
is in a safe location where anyone on the Internet can view and verify it. It enables
a single surviving copy of the "true" Komodo main chain to identify itself to the
rest of the Komodo network, as only the "true" data can produce the same result.
On the other hand, an incorrect history of the Komodo network will not be able to
produce the same notarization. Through the automation in the Iguana Core software
that underlies the Komodo ecosystem, all users will align with the "true" blockchain
history and ignore any malicious actors’ "false" attempts.

### Step Two: Notarizing the Data to a Secure Location

Naturally, for security purposes this number cannot simply be saved to one person’s local computer, or be written down on a piece of paper. Were the number to be
in such a centralized location, a would-be attacker could simply destroy the backup,
or replace it with a "false" version. For the number to be useful, it must be placed
in a secure and decentralized location. Here is where Komodo adopts security from
another network: Komodo will perform a simple transaction in which it writes the
above number into the data history of the strongest PoW blockchain (currently Bitcoin). This location is as secure as the miners’ hash rate makes it, and the location is
decentralized, by nature.

To place this information in the accompanying PoW network, the notary nodes will
use a feature that exists at the core of the Bitcoin protocol when making a transaction.
The feature is called "OP_RETURN," and it allows for a message to be added to the
blockchain, permanently, as a part of performing a transaction.

A notable use of the ability to write messages to a PoW blockchain is found in the
first actions of Satoshi Nakamoto himself (themselves). In the first Bitcoin block ever
mined, Satoshi used a feature like OP_RETURN (Nakamoto used a feature called "coinbase," which is similar to OP_RETURN. A primary difference
between coinbase and OP_RETURN is that coinbase is used by miners when mining a block, whereas
OP_RETURN can be used when performing transactions.) to include this [message](https://en.bitcoin.it/wiki/Genesis_block):

```bash
03-Jan-2009 Chancellor on brink of second bailout for banks
```

Readers who have downloaded the Bitcoin blockchain to their local computer, and
who possess the knowledge necessary to inspect the raw Bitcoin data, can discover
these very words written to their own hard drive. The important thing to understand
for our discussion is that any message written to a secure and decentralized PoW
blockchain is viewable and verifiable to all.

The permanence and security of OP_RETURN messages are a core aspect of dPoW’s
security. In the event of a powerful attack on the Komodo network, there need be no
argument over the correct notarized marker upon which the ecosystem members
should rely. The Iguana Core code running at the heart of each user’s Komodo soft-
ware can continue securing, decentralizing, and distributing the accurate version of
the Komodo history as though the attack never occurred.

### Step Three: Notarizing the PoW Network Information Back to the KMD Main Chain

One final step remains to complete the loop of security between the KMD main
chain and the chosen PoW network. The KMD blockchain must record within its own
records the specific location where it placed this backup into the PoW blockchain.
This enables the Iguana Core software to identify the location of the most recent
notarization.

To create this reminder, the notary nodes will now gather one more piece of information, this time drawn from the accompanying PoW network: the transaction hash
(txid) identifying the location of the first notarization. This information could look
like this:

```bash
313031a1ed2dbe12a20706dff48d3dffb0e39d15e3e4ff936d01f091fb3b8556
```

The notary nodes will combine it with all the information that has come before. The
result will be transformed, again, into a computer-friendly version:

```bash
6a28071c4524afe8cf8e412b6fdb06e65795839f189205119294d26939c61c37880a0844090056853bfb91f0016d93ffe4e3159de3b0ff3d8df4df0607a212be2deda13130314b4d4400
```

This number is a compressed cryptographic representation of everything that has
happened in the Komodo ecosystem up to this point in time. The notarization is
placed as a transaction message directly into the KMD main chain itself. It enables
the Komodo ecosystem to know how to find a reference of its own history.

As each notarization is built upon all the notarizations that came before, Iguana
Core does not need to monitor each notarization. Rather, it only needs to observe
the most recent iteration. This is favorable for Komodo security, as there is always a
possibility that the chosen PoW network (Bitcoin) could fail. In this event, the notary
nodes would place their next notarization in a competing PoW network (such as Bitcoin Cash) and the entire Komodo ecosystem would remain secure. The notarizations
in the failing PoW network would no longer be required to verify ecosystem accuracy.

## Understanding Security and Economic Incentives in the Komodo dPoW Network

The nature of mining in the Komodo ecosystem serves as an incentive to motivate
the notary nodes to perform their job well. This setup is also a principle method
by which the Komodo ecosystem dramatically reduces the overhead costs necessary
for it to function. Portions of the mining rewards are available not just to the notary
nodes, but also to all members of the Komodo ecosystem, through various means.

The Komodo network on a surface-level is a minable network, like other PoW
networks. Any technically savvy user can activate a device capable of mining the
Komodo network, and thereby process users’ transactions, mine blocks, and receive
rewards. For these miners, the Komodo protocol functions in almost the exact same
manner as the Bitcoin blockchain’s mining rewards function.

Understanding the similarities will explain to the reader the motivations for the notary nodes and other Komodo miners to secure the Komodo network. The differences, on the other hand, are explained in [Part V](./chapter8.md) of this paper. (See the section regarding the 5.1% rewards allocated to all users who hold at least 10 KMD in their wallet address. This 5.1% reward is given to users out of the funds that would normally be given to a Bitcoin miner as a method of minting new Bitcoin coins.)

### "Easy Difficulty" in dPoW: The Key to Notary Nodes’ Financial Incentives

The foundational similarity to understand is that with each block header, clues are
provided for miners to find the next valid block hash. The specific clue, "difficulty,"
changes with each block header.

Under normal circumstances on a PoW blockchain, with each block header the
difficulty level can change. The Bitcoin protocol itself decides what the difficulty for
the next valid block should be. The difficulty is decided based on the amount of
overall hash power mining the network. If many miners are active, then the hash rate
is high, and the Bitcoin protocol sets the difficulty to a higher number. On the other
hand, if the hash rate is low, then the protocol sets the difficulty to a lower number.
Recall that the "difficulty" level determines the number of zeros at the beginning of
the next valid block hash. The more zeros at the beginning of a valid block hash, the
more unlikely each attempt at finding a valid block hash will be.
When the Bitcoin protocol was in its infancy, the difficulty setting was easy. In fact,
the block hash we used earlier as an example is, in truth, the very first block hash
ever created—by Satoshi Nakamoto himself (themselves).

```bash
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

He (they) designed the difficulty setting to encourage the network to find new block
hashes once every ten minutes, on average.

For a computer, to guess within ten minutes a nonce that will produce a block
hash beginning with ten zeros is relatively easy. It is so simple, in fact, no special
computer is required. Early Bitcoin miners could use nothing more than the average
desktop machine, having the CPU—the small heart of the computer—performing the
calculations.

As more miners joined the network, however, the Bitcoin protocol automatically
increased the difficulty. This maintained the speed at which the pool of all miners
discovered new blocks, despite the increased size of the pool. Stabilizing the speed
created several benefits, including an amount of economic predictability upon which
users can rely.

Today, at Bitcoin’s current level of overall hash power, a valid block hash requires
a much higher level of difficulty. Here is a recent successful block hash:

```bash
0000000000000000002d08398d6f21f038019600266b419bad5ab88add5b638d
```

There are seventeen zeros, and to find a valid block hash at this level requires a
prodigious effort.

In the race to win blockchain rewards, miners all over the world have built entire
farms of specialized equipment for mining. The small CPU of a desktop is no longer
useful, and the time of "easy difficulty" on Bitcoin has passed.

### The dPoW System has Sixty-Four Elected Notary Nodes

Here is where our dPoW consensus mechanism diverges from the Bitcoin proto-
col’s limitations. In addition to performing the notarizations of the Komodo ecosystem, notary nodes are also a special type of blockchain miner. They have a certain
feature in their underlying code that both enables them to maintain an effective and
cost-efficient blockchain ecosystem and provides the notary nodes with a financial
incentive. The combination of benefits prevents the Komodo ecosystem from falling
into the trap of directly competing with other PoW networks for hash-rate security
status.

### Each Notary Node Gets One Chance Per Every Sixty-Five Blocks to Mine on Easy

Each individual node periodically receives the privilege to mine a block on "easy
difficulty." In other words, while the rest of the miners in the Komodo ecosystem
are mining at a calculated difficulty level, the notary nodes occasionally receive the
chance to mine as though they are alone on the network.

The notary nodes’ "easy difficulty" setting operates in a cyclical manner, with each
notary node on its own cycle. At the start of the cycle the notary node holds the "easy
difficulty" ability until it mines one "easy" block. Then the Iguana Core code removes
the ability for the next sixty-four blocks. After the sixty-four-block period passes, the
notary node can once again attempt to capture a block on "easy difficulty."

Therefore, while everyone else on the network mines at an adjustable level of difficulty according to the normal PoW consensus mechanism (which keeps the overall
speed of the Komodo network stable) the notary nodes have a chance to step outside
the normal rules. For every sixty-five-block period on the Komodo blockchain (See following section of the Free-for-All Period) , the
odds that a block will be mined by a notary node, as opposed to a normal miner, are
essentially 3:1.

Since the rest of the miners have an adjustable difficulty ratio, it does not matter
how many more miners attempt to mine Komodo. Most of the valid blocks will
always be found by the sixty-four elected notary nodes, even were the entire hash
power of the Bitcoin network to somehow switch all its attention to mining Komodo.

The mining rewards that a notary node receives through this feature are ~50 KMD
per day. This reward occurs regardless of KMD’s popularity, market value, or even of
the competition from normal KMD miners. The reward notary nodes receive creates an economic incentive for each party controlling a notary node to support and protect
the Komodo ecosystem, and to increase the relative value of this daily ~50 KMD
reward.

### The Free-for-All Period

Every 2000 blocks, the Iguana Core code removes the easy-difficulty mining ability
from all notary nodes for a sixty-four-block period. This gives the entire ecosystem the
chance to freely mine the Komodo blockchain. The primary purpose of the Free-for-
All period is to recalibrate the difficulty level of all miners on the Komodo network.
It also gives a fair chance to all members of the Komodo ecosystem to capture mining
rewards.

The notary nodes continue the notarization process itself throughout the Free-for-
All mining period. When the Free-for-All period concludes, the notary nodes regain
their abilities and resume mining the current chain.

## Komodo’s Protective Measures in Action

There are myriad ways that an attacker can assail a blockchain project, and the
Komodo ecosystem is well prepared. In this foundational paper, we only discuss two
of the most crucial attacks—the 51% Attack and the Genesis Attack.

In a separate technical white paper, written by our lead developer, we provide
several more discussions on how Komodo responds to many other forms of attack.

::: tip Note
Some of this earlier paper is now deprecated, and therefore it has been removed from most locations on our website. There remain relevant sections regarding Komodo’s protections against various other attacks. Please reach out to our team directly for a copy of this white paper, if interested.
:::

Some mentioned therein include the Sybil Attack, the Eclipse Attack, and more. We
encourage any reader searching for information about the deepest levels of Komodo
security not only to read the accompanying white paper, but also to reach out to our team directly.

### Notarizations Provide a Defense Against Both the 51% Attack and the Genesis Attack

By relying on the notarizations in the chosen PoW network’s hash rate (Bitcoin),
users in the Komodo ecosystem are well protected from both the 51% Attack and the
Genesis Attack. Recall that in a 51% Attack, the attacker first makes a transaction and
then erases it by providing 51% of the total hash rate to a "false" blockchain where the
transaction never occurred. In the Genesis Attack, the attacker recreates the genesis
block of a blockchain and mines an entirely false history. For either of these attacks to
play any part in the Komodo ecosystem, the successful attack would have to destroy
every transaction at every level it is recorded.

First, let us consider the implications of the notarization process provided against
the Genesis Attack. Once an independent blockchain has even just a single transaction
pushed through the notarization process into the chosen PoW network, that notarization protects against the Genesis Attack. To successfully complete a Genesis Attack
against a Komodo-built blockchain, the attacker would have to destroy the chosen
PoW network’s records from that moment going forward. The attacker would also
have to destroy the KMD main chain from that moment forward, and the entire independent asset chain. The likelihood of achieving this task is effectively as probable as
performing a Genesis Attack on the chosen PoW network itself.

The Komodo ecosystem is also well protected against the 51% Attack, so long as
users wait for a desirable number of notarizations. Consider a transaction that is
recently performed on an asset chain in the Komodo ecosystem. While the notary
nodes have not yet notarized the transaction into the KMD main chain, then it is
plausible that during this approximately ten-minute period an attacker could successfully perform a 51% Attack on this transaction. The attacker would simply make
a transaction, and then provide 51% of the total hash rate to a "false" version of the
independent asset chain to erase the transaction. Therefore, users should always wait
until they receive at least one notarization to the KMD main chain before considering
any transaction final.

There are methods and resources available for developers and entrepreneurs who
wish to securely alleviate any wait time a user might experience during this ten-minute period. The Trust API (briefly explained in [Part III](./chapter6.md) of this white paper), our forthcoming CHIPS technology, and our Crypto Conditions and MoM smart-contract
technology (currently in beta and alpha stages) can serve these purposes. The Speed
Mode setting on BarterDEX is a demonstration of the Trust API feature. It allows users
to have a certain amount of high-speed transaction bandwidth available, without
having to wait for any notarizations. Development on these features is currently a
top priority, and progress is proceeding quickly. Please reach out to our team for
more details, if these features are of interest.

Once the transaction reaches the KMD main chain, at this point, the attacker would
have to successfully perform the 51% Attack against both the KMD main chain and
the independent asset chain. This is already quite difficult to achieve, as it would
require overcoming the notary nodes and other KMD miners, while simultaneously
attacking the independent chain. Entrepreneurs, developers, and users should decide
for themselves how much trust they wish to place in the system at this point of the
notarization process.

When considering large sums of money, the need for protection grows. A large
sum of money can be both a single large transaction, or it can be the collective value
of many small and normal-sized transactions that build up over hours, days, and
years. These transaction histories need protection against the sophisticated blockchain
attacker. It is for this reason that the notarization process exists.

Once the notary nodes have pushed the most recent version of the Komodo ecosystem’s history into the chosen PoW network (Bitcoin), the entire ecosystem relies only on that notarization as the arbiter of truth. All transaction records that have been
pushed into the chosen PoW network can only be rescinded by altering the chosen
PoW network itself (while simultaneously altering the histories of the KMD main
chain and the independent asset chain). Accomplishing such a task is highly improbable (though we warn the reader never to consider any attack impossible).

Therefore, any record that has been on the Komodo main chain for at least one notarization has a fortress of hash rate and other security measures at its guard. So long
as users and developers are mindful to wait for the desired number of notarizations
to secure their payments, both the 51% Attack and the Genesis Attack are highly unlikely either to be successful, or to provide economic value to the would-be malicious
actor. Nevertheless, we remind all users of our ecosystem to consider their own vigilance and mindfulness as the most effective protection against the would-be attacker. Users, entrepreneurs, and developers utilize all aspects of the Komodo network at their own risk.

#### Considering an Attack on the Notarization Process

To create a notarization for the KMD main chain, the minimum number of notary
nodes required is 13. If the notary nodes themselves come under attack and must
work to maintain access to the Internet, just 13 of the full 64 are required for the
Komodo ecosystem to continue its operations.

In the possible event of a disconnect from the minimum number of notary nodes,
chains in the Komodo ecosystem should simply be on the alert. Users, developers,
and entrepreneurs would simply need to wait for the notary nodes to regain access to
the Internet and resume the notarization process before considering any transaction
final.

For this reason, the position of a notary node is held with high importance, and
the parties which gain these positions are measured foremost by their Information
Technology experience and capabilities. Komodo stakeholders are responsible to vote
for candidates that are the most qualified to perform in the notary-node duties.

## The dPOW Consensus Mechanism is Inherent in all Komodo Asset Chains

These security features extend to any asset chain relying on the notarization process. The primary difference between an asset chain and the main chain is that the
main chain notarizes to an exterior PoW network (Bitcoin), whereas the asset chain
notarizes to the KMD main chain.

The notarization for the asset chain is performed by the notary nodes as a service
to the independent developer and entrepreneur. Notary nodes create a notarization
of the asset chain and write it into the KMD main chain. Then they write their actions
into the asset chain itself. This allows Iguana Core (running at the heart of the asset chain) to identify where its most recent notarization can be found. The notarization
process cycles every ten minutes, assuming the asset chain’s network is consistently
active. If the network has periods of inactivity, the notary nodes halt the process (to
save against unnecessary notarization costs) and reactivate as soon as new transaction
activity appears on the asset chain’s network.

There is also a difference in the number of notary nodes required to notarize an
asset chain as compared to the KMD main chain. Whereas with the KMD main chain
13 notary nodes are required, only 11 notary nodes are required to notarize an asset
chain. This difference is based on the underlying math that ensures that the number
of asset chains in the Komodo ecosystem can scale into the tens of thousands.

(We invite the reader to consider the fact as each asset chain can support thousands
of transactions per minute, this makes the combined ecosystem capable of supporting millions of transactions per minute. This includes cross-blockchain interoperability, via our atomic-swap powered technology, as explained in [Part III](./chapter6.md). This makes
Komodo among the most scalable of financial-technology solutions in existence, and
capable of competing with the transaction volumes of fiat networks.)

Naturally, as each level of notarization takes time to perform, there is an additional
delay for asset chains as compared to the KMD main chain. An asset chain’s history
is notarized into the KMD main chain approximately every ten minutes, assuming
constant activity. This notarization will then be pushed through the notarization process into the chosen PoW network (Bitcoin). We estimate that a transaction performed
on an asset chain will receive the KMD main chain’s protection within approximately
ten minutes, and the Bitcoin hash rate’s protection in approximately twenty to thirty
minutes.

Another difference between the KMD main chain and an asset chain is that the
notary nodes only mine the KMD main chain. Asset-chain developers are responsible
to create any required network of miners to process the asset chain’s transactions.
This does not need to be a full network of mining farms, such as those in Bitcoin.
Rather, it only needs to be enough computing power to process transactions, and
to provide any desired level of hash-rate security to cover the ten-minute waiting
period. For a smallbusiness with intermittent periods of transaction activity, a single,
dedicated, full-time server may be enough. Larger businesses can scale as desired and
can also work to attract a network of freelance miners.

It is also possible that a network of freelance miners will naturally arise within the
Komodo ecosystem, to observe and manage transaction-processing services wherever
and whenever they are required, through automation.

This setup dramatically reduces the overhead costs and effort the entrepreneur and
developer would otherwise have to allocate to a network of high-hash rate miners.
These freed resources of the entrepreneur and developer can therefore be allocated to
other uses in their business models.

The total yearly cost for the Komodo notary nodes to notarize the KMD main chain
into the currently chosen PoW chain, Bitcoin, is approximately ~180 BTC/year (a
value of ~\$1.5M USD at the time of the writing of this paper). Funding for the notary nodes to perform this service was raised during the Komodo ICO, and current BTC holdings give us many years to come before we will be required to implement any business models to replenish our BTC funds.

On the other hand, the total cost for the asset chain developer to notarize their independent chain into the KMD main chain is but a fraction of the cost. This security mechanism is not limited to asset chains created within the Komodo ecosystem. In fact, Komodo’s Blockchain Security Services are available to any existing blockchain. With Komodo, any blockchain can be protected with the power of the Bitcoin hashrate for a tiny percentage of the cost. We have not yet finalized the details, so please contact the Komodo Platform team at marketing@komodoplatform.com for more information.

Thus, an entrepreneur in our ecosystem can have their own independent blockchain
that is backed up by the hash rate of the Bitcoin mining network, at only a fraction of
the cost. In the following section, [Part II](./chapter5.md), we begin our discussion of an entrepreneur’s
formation and distribution of a Komodo asset chain. In [Part III](./chapter6.md), we discuss in detail
our method of distribution and trading, using our atomic-swap technology. [Part IV](./chapter7.md)
discusses how with each of these components, users have the option of zero-knowledge privacy. In [Part V](./chapter8.md), we mention our smart-contract technology (our current development focus).
