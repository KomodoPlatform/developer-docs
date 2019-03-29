# The Komodo Solution

## The Decentralized Initial Coin Offering

The Komodo ecosystem presents a solution, the decentralized the initial coin offering (dICO), that solves these issues and even adds new possibilities to the cryptocurrency market. The decentralized nature of the dICO enables the entrepreneur to
release a blockchain product beyond the reach of a malicious third-party influencer.
Furthermore, through our decentralized exchange, BarterDEX, the dICO allows an
entrepreneur to release their product in a manner that mitigates and even eliminates
many of the issues regarding whales, hackers, and human error. With the advantage
of Komodo’s privacy technology, Jumblr, the participants in a dICO are empowered
with their right to barter in private.

Our decentralized exchange, BarterDEX, is explained in detail in [Part III](./chapter6.md). An indepth discussion of our privacy technology, Jumblr, is provided in [Part IV](./chapter7.md).

## The Process of Creating a New Blockchain in the Komodo Ecosystem

Formerly, coding and generating the blockchain itself were a most difficult aspect
of the development process. Now, the Komodo team has simplified the process into
easy steps. Through Komodo’s Iguana Core technology (introduced in Part I), the
entrepreneur can create a new independent blockchain by entering just two simple
commands in the command prompt of their computer.

The following steps rely on one of Komodo’s underlying software processes that
run in the background on a user’s computer. The name of this software is the "Komodo daemon," or `komodod`, for short. `komodod` is rooted in Iguana Core technology.

### The First Command to Create a New Coin

```bash
./komodod -ac_name=[ENTREPRENEUR'S COIN] -ac_supply=[TOTAL COIN SUPPLY] -gen
```

The first part of the command, `./komodod`, initiates a new instance of Komodod.

By default, the initial `./komodod` command executed alone would launch the
Komodo main chain, KMD, on the user’s computer. However, the next part of the
command tells Komodod to behave differently.

```bash
-ac_name=[ENTREPRENEUR'S COIN]
```

This command tells Komodod to look for a coin with the inserted name.

```bash
-ac_supply=[TOTAL COIN SUPPLY]
```

This tells Komodod how many total coins there should be in this chain.

```bash
-gen
```

This tells Komodod that the user desires to mine this network.

The underlying code of Iguana Core can now make several decisions. First, it will check its connection to the Komodo ecosystem to see if there is a coin by the name of \*ENTREPRENEUR’S COIN+, having a coin supply of [TOTAL COIN SUPPLY]. If the coin name and total supply are not found, Komodod will assume that the user is attempting to create a new coin, and the [-gen] command tells Komodod that the user wants to mine it.

Komodod now begins the automated process of creating a new asset chain in the Komodo ecosystem. Komodod will first make a fresh and empty clone of the KMD main chain (though it will not yet generate the actual coins), with only a few differences to the underlying nature of the chain.

### The Features of the New Asset Chain

There are several primary differences between an asset chain and the main Komodo
chain. For example, the asset chain will not automatically generate 5.1% rewards for
all wallet addresses holding coins, unlike the main chain. Furthermore, the asset
chain’s dPoW consensus mechanism is built to notarize to the KMD main chain (as
explained in [Part I](chapter1.md)).

Some of the differences reveal strong advantages held by members of the Komodo
ecosystem. By design, this asset chain is capable of automatically adopting any updates that the Komodo core development team add to the framework. The asset chain
also has a built-in capacity within the framework to allow the entrepreneur to code
new rules.

For example, the entrepreneur may decide not to use a PoW consensus mechanism,
but may instead prefer PoS (discussed in [Part I](chapter1.md). Other changes can also be made, according to the entrepreneur’s imagination and developer knowledge. So long as
the new code that the entrepreneur adds to the asset chain does not interfere with
the overall framework, the asset chain will smoothly integrate with the rest of the Komodo ecosystem. We provide more details on this topic in [Part V](chapter8.md)’s section regarding
smart contracts.

For the purposes of our discussion, this new asset chain is otherwise the same as
the Komodo main chain, including the features to communicate natively with other
blockchains via BarterDEX. The reader may note that this new Komodo asset chain
is not a colored-token running on top of a parent blockchain, as is often the case in
other blockchain ecosystems (consider the ERC20 token of the Ethereum platform).
Instead, this asset chain is an entirely unique and independent blockchain unto itself.

This empowers the entrepreneur with significant advantages over other blockchain
ecosystems. The asset chain can run on its own nodes, act according to whatever
rules the entrepreneur can imagine, and can scale according to its own audience.
Should an asset chain in the Komodo network experience a sudden explosion of
activity, the sudden change will not negatively impact the overall Komodo ecosystem.
This independence grants a significant competitive advantage in the form of overall
security, speed, and ease of use.

Consider the advantage of developing an entrepreneurial product as a fully independent blockchain. Should the entrepreneur desire at a future point to leave the
Komodo ecosystem for any reason, they are free to take their blockchain product
with them.

### Generating and Mining the New Coins

Let us return now to the moment after the entrepreneur executes the first command in the command prompt, and Komodod creates a fresh and empty clone of
the Komodo main chain. While the instance of the Komodod program (running on
the entrepreneur’s local computer device) will create the necessary code for the new
asset chain, Komodod will not yet generate the coin supply itself. Komodod instead
will wait for the next few steps to occur.

The reason for the wait is that a blockchain’s essence depends upon existing not
in isolation, but in a network of multiple devices connected. This is the nature of
decentralization. Komodod will wait until it receives a signal from another device,
thus indicating that it has a peer with which to form the asset-chain network.

#### The Entire Coin Supply is Distributed in the Genesis Block

It is imperative to note that in the Komodod process, the entire coin supply is
created and distributed immediately to the device that mines the first block, the Genesis Block. The code performs this distribution as a one-time reward for discovering the first valid block hash (as explained in [Part I](chapter1.md)). Due to the sensitive nature of this
step, we recommend that the entrepreneur use a Virtual Private Server (VPS) service.
This allows two secure devices to connect to each other with little, if any, risk of a
third-party actor mining the first block (which would thus enable a would-be thief to
acquire the entire coin supply before distribution).

Having established a secure connection with a second device, the entrepreneur will
enter the following command on the second device.

```bash
./komodod -ac_name=[ENTREPRENUER'S COIN] -ac_supply=[TOTAL COIN SUPPLY] -addnode=[INSERT IP ADDRESS OF FIRST DEVICE]
```

Note that the first three elements of the command, [./komodod], [-ac_name], and
[-ac_supply], are the same. It is important that the parameters inserted into these commands match exactly. Otherwise, the instances of Komodod running on the separate devices will ignore each other, and the coin will not be mined.

::: tip Note
In the second VPS, the [-gen] command is not present. In this circumstance, we are assuming that the entrepreneur wants to capture the entire coin supply on the first device. Technically speaking, assuming the entrepreneur has ownership over both devices, it does not matter if both devices initiate the [-gen] command. Both devices will attempt to mine the first block and the superior device will receive the coin supply.
:::

There is another key difference in the command.

```bash
-addnode=[INSERT IP ADDRESS OF FIRST DEVICE]
```

An "IP address" can be compared to a human being’s home mailing address, where
the IP address is designed for computers to be able to geographically find each other.

With the execution of the IP address command, the second device knows to look
across the available connection (the Internet, VPS service, etc.) for the first device,
which is already running an instance of Komodod and the new coin. The command
here simply tells the computer the proper IP address of the first device.

As soon as these two devices connect, having all the proper Komodod software
running and set in place, the mining begins. One of the devices will mine the first
block and instantly receive the total coin supply of the entire blockchain into the
user’s chosen wallet.

Both devices sync this information to each other, and the \*ENTREPRENEUR’S COIN+ now exists in the world. The entrepreneur can also add more and more devices to the network.

### Notarizing to the Komodo Main Chain

To receive the security of the dPoW consensus mechanism, the entrepreneur simply needs to have the elected notary nodes add the \*ENTREPENEUR’S COIN+ to their internal list of coins to notarize. This will empower the entrepreneur’s product with the same verifiable and decentralized security of the Komodo parent chain.

The process of adding a new notarization service can be executed by the notary
nodes with just a simple command. While we are at this early stage of development,
this sign-up process for new dICO products is not yet automated. In the future, we
intend to automate as much of this process as possible.

There is a fee for receiving notarization services. This helps to cover the business
costs associated with notarization (recall that all notarizations are financial transactions, by nature).

We already have over fifteen partners successfully notarizing to the Komodo main
chain. We are actively seeking more partners, and we encourage the reader to reach
out to our team directly with inquiries.

Entrepreneurs are thus able to use the asset chain’s native dPoW consensus mechanism to notarize to the Komodo main chain to create a secure backup of the coin’s history. Even in the event of an attack at this early state of existence the entrepreneur can
rest assured that their product will survive, so long as one copy of the blockchain’s
history exists.

Everything is set on the backend for the entrepreneur, and they are now fully prepared to begin the dICO process. Naturally, we understand that for many potential
entrepreneurs in the Komodo ecosystem, this process is unfamiliar territory. We encourage interested entrepreneurs to reach out to our team for guidance during development.

## The Distribution of Coins

### The Trials and Travails of the Centralized ICO Method

Previously, the entrepreneur at this point would have been required to go through
a centralized ICO process.

This could have required several cumbersome and possibly dangerous steps. For
example, the entrepreneur would begin gathering cryptocurrencies from their audience to personally hold in escrow while the process of matching purchases to the new
blockchain coin were verified.

To distribute these coins, the entrepreneur had two primary options. They could
have created and distributed a digital software wallet capable of holding the entrepreneur’s coins. This would requiretheir audience to download the software. The
entrepreneur would then have to send all the appropriate coins to each wallet address,
according to the process they established during their ICO.

Or, the entrepreneur would have to make formal arrangements with another service
to manage this process, such as with a centralized exchange. This would require a successful negotiation with this third party, likely paying fees as a part of the agreement.

The entrepreneur would then be required to act within the centralized exchange’s
arbitrary framework.

The centralized ICO process can be arduous and, at times, disastrous.

### Enter the dICO

#### Powered by Komodo’s BarterDEX & Jumblr Technology

The Komodo dICO model is an extension of Komodo’s BarterDEX technology.
BarterDEX is an atomic- swap powered, decentralized exchange. It enables users to
directly exchange cryptocurrencies from one person to another without third-party
involvement (i.e. no centralized exchanges, escrow services, vouchers, etc.). Furthermore, as the dICO model is entirely decentralized, anyone can use it at will. There are
no centralized authority figures capable of creating artificial control points that can
be manipulated at the expense of the users. Please turn to [Part III](./chapter6.md) for more details.

To begin the distribution process, the entrepreneur first chooses how many nodes
they would like to use for the distribution. Nodes can be any type of machine capable
of connecting to BarterDEX. Typically, a small-business entrepreneur may choose to
use server machines. Server capacity can be rented online, and the servers can be
distributed geographically throughout the world, if desired.

While renting a multiplicity of servers may be the method of choice for an estab-
lished small-business, it is not a requirement. An owner of an even smaller business,
operating on a low budget, can simply use their own computer(s), geographically
stationed nearby for convenience. On the other hand, a large corporation could use
the server capacity they already own. The number and strength of the machines is a
choice made by the entrepreneur.

Having decided the method of distribution, the entrepreneur will then prepare the
total supply of coins. (We are assuming the coins are still located on the first device
that mined the entrepreneur’s genesis block.) The entrepreneur will first break down
the total collection of coins into smaller digital pouches. These small bags of coins
are ultimately what will be traded on BarterDEX with their audience. The size of
the bags is chosen by the entrepreneur, and therefore the entrepreneur can choose a
size that is agreeable to their outlook on any KYC legal requirements. For a detailed
explanation of the process of breaking down the total collection into smaller bags of
coins, we also recommend reading about UTXO technology in [Part III](./chapter6.md) of this paper.

Having created these bags of coins, the entrepreneur then sends them to all chosen nodes throughout the BarterDEX network. Coins are distributed to each node’s
wallet(s) by a normal transaction.
With the coins distributed as desired, the entrepreneur sets the time and date when
each bag of coins will be available for purchase. When a bag of coins becomes available on BarterDEX for trading, members of the Komodo ecosystem simply purchase the coins. Please see our discussion on atomic- swap technology in [Part III](./chapter6.md) for more
details.

#### The Many Solutions of the dICO Model: Security, Privacy, Decentralization, and Freedom

This method of conducting a decentralized initial coin offering mitigates and cir-
cumvents the issues found in a centralized ICO. The entire process is conducted in a
decentralized manner. The dICO entrepreneur has direct access to their audience, as
there are no centralized human authorities acting as middlemen.

Because the bags of coins can be distributed across a vast range of nodes, and because the entrepreneur can program the time at which each bag of coins becomes
available, it is possible to prevent a "whale" from seizing a majority control in one
swooping moment of the dICO. The whale will have to compete to purchase their desired amount one transaction at a time, just like the other members of the ecosystem.

Furthermore, BarterDEX has advanced trading features that provide additional
whale resistance. For example, BarterDEX can perform ten to twenty trades at once,
unlike a normal node in the typical ICO model. Therefore, even if the whale were able
to place large orders on every node of a dICO, BarterDEX would still be performing
orders simultaneously for other members of the Komodo ecosystem.

Concerning theft, the dICO provides solutions to both methods of theft in the centralized ICO. Unlike the centralized ICO, once the distribution of the bags takes place the effect of their distribution adds a layer of security from a would-be hacker. The hacker can only steal funds at the node they manage to penetrate. Were the hacker to steal coins before the actual dICO, the entrepreneur would have the option to simply create a \*NEW ENTREPRENEUR’S COIN+ again, without losing any personal wealth.

Furthermore, since the trades happen instantaneously with each bag available for sale, the entrepreneur is only in possession of either their own \*ENTREPRENEUR’S COIN+, or the cryptocurrency funds provided by the dICO participants—but not both. The entrepreneur is never at risk of losing both their own funds and the funds of their audience, which is a strong advantage over today’s ICO model.

Regarding human error, should one of the node’s databases be corrupted by accident or hardware failure, only one node’s coin supply is lost.

Since the coins are immediately available on the BarterDEX exchange for trading,
the entrepreneur’s audience has an immediate trading market. This stands in contrast
to today’s ICO model, where users often wait weeks or even months before liquidity
for their ICO product arises in a centralized exchange.

Finally, through Jumblr technology, participants have the option of privacy when
purchasing the dICO product. This enables them to support the crowdsourcing efforts
of the entrepreneur within their inherent right to barter in private.

Upon conclusion of the distribution of the dICO coin supply the entrepreneur
has successfully and immediately completed all the crowdsourcing-related steps that
could have taken months in today’s typical ICO model.

Komodo’s dICO model is significantly easier, freer from manipulation, more flexible, and more secure.
