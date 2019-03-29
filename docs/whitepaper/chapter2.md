# Pow is Currently the Most Secure Form of Consensus Mechanisms

There are several reasons why PoW networks, especially Bitcoin, continue to dominate in terms of security and blockchain success. A simple, preliminary reason is
that PoW networks foster ever- increasing speed and computer power. Miners must
constantly update and innovate above their competitors to continue earning rewards.

There are yet more reasons behind PoW’s success, and The Longest Chain Rule is
one of the most notable. This rule can also be dangerous to the unwary and unprepared entrepreneur of a new blockchain product.

## Speed and Power are of the Essence

Among miners, having a faster and more powerful computer can mean earning
rewards more frequently. For miners seeking to maximize profit, competition requires constant upgrades to machinery and to a miner’s customized underlying code.

The frequency at which a device can create proposed block hashes is called "hash
power." The more hash power a collective PoW network has across all miners mining
the blockchain, the more secure thenetwork. This competitive pressure provides one important advantage in security to PoW networks, compared to alternate consensus mechanisms.

### The Network Effect: Bitcoin’s Ability to Dominate Begins

A high level of security fosters a sense of trust among users, and this can grow
a PoW network’s audience. As the audience grows, both the number of transactions
and the price of the coin increase. This attracts more miners. The rising level of miners
provides greater overall hash rate to the network, which in turn fosters a stronger
sense of trust. This increased sense of security can raise the number of users on the
network, which can increase the number of miners, and the cycle repeats.

In economics, this is classified as a "Network Effect," where a cycle of behavior encourages more of the same behavior, with compounding interest. Due to the Network Effect, and the fact that Bitcoin is the oldest PoW network, Bitcoin is increasing its
security at a rate faster than the rate of other PoW networks.

Furthermore, consider the effect caused when the price of a PoW-blockchain coin
rises. Before the rise, assume the blockchain coin is worth one dollar. A miner is
justified in spending the necessary money (on equipment, upgrades, and electrical
costs, etc.) to justify one dollar’s worth of hash rate. If the price shifts upwards to two
dollars, the miner must upgrade their entire business to justify two dollars’ worth of
a matching hash rate. If the miner does not upgrade, their competitor will, and then
the miner will no longer be able to compete for rewards.

## The Longest Chain Rule: The "Secret Sauce" of Pow Domination

There are many more reasons why PoW networks continue to dominate in security.
Yet, for our discussion, there is one element that rises above all others. It is called,
"The Longest Chain Rule," and some can argue that it is "the secret sauce" that fuels
PoW’s strength.

The Longest Chain Rule is the determining factor whenever two competing versions of the blockchain history arise on the network. The rule simply states that
whichever of the two versions grows longer first, wins. The other version is overwritten, and therefore all transactions and rewards on that version are erased. The
simplicity of this rule is a key to understanding why PoW consensus mechanisms
continue to outperform their competition.

### The Simple Effects of The Longest Chain Rule

On a surface level, this rule prevents a double spend by a network user. For instance,
consider a husband and wife accidentally attempting to spend the same money at the
exact same time, while each person is traveling in a different part of the world.

::: tip Note
For the sake of the discussion, we are oversimplifying the following actions so that they take place within only a few milliseconds. We also oversimplify the technical details, for clarity. The full explanation of this process is provided in the [Bitcoin wiki](https://en.bitcoin.it/wiki/Main_Page), for those who would like to gain a deeper understanding.
:::

### A Tale of Two Blockchains

Let us suppose that the husband is in Asia and the wife is in the Americas. Both
are purchasing a car. The husband uses all the funds from the family Bitcoin wallet to purchase a car at precisely 8:00 PM (UTC). The wife makes her purchase at the exact same moment, for a similar amount. After making his purchase, the husband’s transaction hash is immediately sent to a mining device in China, where it is held in the miner’s local mempool (recall that a mempool is a collection of all raw transaction
data across the network).

Let us suppose that the husband’s transaction arrives in the Chinese miner’s mempool at the exact moment that the Chinese mining equipment finds a correct nonce
and a valid block hash. The Chinese miner declares the winning information, mines
a new block, and collects a reward. All the miners in his local (Asian) vicinity (who
receive the winning information faster than in the Americas, due to proximity) complete the block verification process, increase the length of the blockchain, and begin
searching for the next valid block hash.

On the opposite side of the world, essentially the exact same actions happen. The
wife’s transaction is sent to the nearest miner, this time located in Washington state
of the United States. Just as the transaction enters the Washington state miner’s mempool, the miner discovers a valid block hash. He sends out the signal, mines a new
block, and also collects the reward (this is the same reward that the Chinese miner is
attempting to claim). All the miners in the local (US) vicinity verify the information
immediately and begin searching for a new valid block hash based on the Washington
state miner’s recent block.

### An Internal Conflict of Interest Arises Within the Bitcoin Network

Note the paradox here. There are now two versions of the Bitcoin history that are valid, yet different.

These two versions make their way across the Internet, around the world, each to
the other side. When the competing messages arrive, the Bitcoin protocol sees that there is a conflict: the same money was spent twice.

Consider how on each side of the world the miners are spending their financial and
temporal resources to further their own interests. There is no economic incentive for
either side to submit to the other, by nature. Therefore, there is a conflict of interest
within the Bitcoin network itself. The Bitcoin network would swiftly fail, were it not
for The Longest Chain Rule.

### The Longest Chain Rule: The History Which is Longer First, Wins

The Longest Chain Rule simply declares that whichever of the two competing
blockchains grows longer first, wins. The consensus mechanism erases the other version.

Let us suppose that the Chinese mining equipment is superior in this instance,
and the Chinese miner manages to discover the next valid block hash and send out
the signal before the Washington state miner can do likewise. Across the world, the
moment the information arrives that the Chinese miner completed yet another valid
block, the Bitcoin protocol erases the Washington state miner’s version of the Bitcoin history.

There is no sympathy for any wasted efforts, nor for any misunderstandings be-
tween the wife and her car dealer. The Bitcoin protocol’s consensus mechanism simply presses forward. The Washington state miner’s rewards disappear, as though they
never occurred. The wife’s purchase of a car likewise evaporates.

_(Typically, a normal and prepared car dealer utilizing cryptocurrency would not consider a
customer’s transactions acceptable until several new blocks were added to the blockchain. In
this manner,cryptocurrency users can ensure that a transaction is beyond contestation before
the customer can, for example, drive a new car off the lot.)_

The Washington state miner gets a raw deal in this scenario, but the network benefits as a whole. The Longest Chain Rule provides the necessary security to prevent
a Double Spend. The network accurately recorded one family member’s purchase of
a car, prevented the mistaken double spend, and ensured that the most competitive
miner received a just reward.

This example illuminates the importance of The Longest Chain Rule. However,
there is a dark side to this rule for the unsuspecting and unprepared blockchain
developer.

## The "Easy" Way to Destroy a PoW Network: The 51% Attack

Here’s where intrigue enters the picture. The "easiest" way to steal money on a PoW
blockchain (such as Bitcoin) is to perform a 51% Attack.

In this attack, the malicious actor first spends cryptocurrency in exchange for something of value, which they take from their victim. Next, the malicious actor creates an
alternate version of the PoW network’s history wherein those transactions never took
place. Using advanced mining equipment, the malicious actor then "attacks" the PoW
network by mining blocks to this "false" history faster than the rate at which other
miners on the PoW network can mine blocks to the "true" history.

Assuming the malicious actor has a sufficient hash rate, as this "false" history grows
longer than the "true" history, the Longest Chain Rule will cause the consensus mechanism to overwrite the "true" version. The earlier transactions the malicious actor
made would be as though they never occurred. Therefore, the malicious actor would
keep both their original funds and whatever item of value they exacted from their
victim.

This is known as the 51% Attack. The number 51% derives from the fact that to
successfully perform this attack, the attacker must add enough hashing power to the
overall PoW network to form a majority of the hash rate.

## Size is Yet Another Reason Behind Bitcoin’s Current Success Among PoW Networks

Today, Bitcoin’s overall hash rate is enormous. The collective of computers around
the world mining Bitcoin is effectively the largest supercomputer ever created by man.
As of the writing of this paper, some estimate that [the Bitcoin network consumes more
electricity than the entire country of Denmark](https://arstechnica.com/tech-policy/2017/12/bitcoins-insane-energy-consumption-explained/), and the number of miners continues
to grow.

Therefore, to attempt a 51% Attack against the Bitcoin network could cost millions,
if not billions of dollars in computer hardware. It would also require a sustained
consumption of electricity that is likely unfeasible for a single geographical location,
and would be expensive even for a decentralized-hardware network. So long as the
miners of Bitcoin remain interested in the Bitcoin network, therefore, Bitcoin has a
level of security that is nigh impenetrable.

_We will return to the proposition of the miners’ ability to choose a different network to mine,
later._

## The "Hard" Way to Destroy a PoW Network: The Genesis Attack

### A Genesis Attack on the Bitcoin Network

Recall that according to the original version of the Bitcoin protocol, sometimes
called the ["vanilla" version](https://www.worldcryptoindex.com/bitcoin-scaling-problem-explained/) , the Longest Chain Rule only requires that the blocks
in the longest chain all be properly mined. Furthermore, recall that computers can
endlessly duplicate code.

Finally, note that during our explanation, when describing a malicious actor’s at-
tempt to create an empty, meaningless blockchain history, we use quotation marks
when employing the word, "false." Likewise, when describing the blockchain history
trusted by the people on the network, we include the word "true" in quotations.

We do this because at the core level, the consensus mechanism is purposefully
blind regarding any human user’s preference between "truth" and "false." The code
only sees "truth" in terms of properly mined blocks, and overall blockchain length.
Nothing more.

Now suppose the existence of a supercomputer a thousand times more powerful
than the entirety of the Bitcoin-miner network. This supercomputer could, in theory,
stealthily re-create and execute the initial code that spawned the very first block of
the Bitcoin blockchain—the "Genesis Block." The supercomputer could then grind out block hashes, one-by-one, mining meaningless blocks and adding them to this empty,
"false" version of the Bitcoin history.

Once this meaningless blockchain’s length sufficiently exceed the so-called "true"
blockchain used today, the supercomputer could then release its "false" version to the
Internet.

Throughout the world, (assuming the vanilla protocol) the Bitcoin network would
automatically recognize the "false" blockchain as the correct blockchain! This would
all be according to the code. The so-called "false" blocks would be properly mined,
and the length would be longer than the chain that users currently trust. The vanilla
protocol would, in theory, replace the so-called "true" history with the empty variant.

It might seem to users like a virus being uploaded to the Internet. It could destroy
all human trust in the current version of the Bitcoin protocol, wreaking financial havoc
throughout the cryptocurrency realm. While users of the Bitcoin protocol would natu-
rally protest, the entire operation would be entirely in agreement with the underlying
code.

When observing Bitcoin’s current hash power, the creation of such an anti-Bitcoin
supercomputer is clearly not feasible in the immediate future. Assuming Bitcoin min-
ers remain interested in the Bitcoin network, the risk of a Genesis Attack on Bitcoin
is essentially non-existent.

However, consider the implications of the Genesis Attack on unsuspecting or un-
derprepared smaller PoW blockchain projects.

### The More Realistic Dangers of The Genesis Attack

Let us assume a naïve blockchain entrepreneur building a new product. They are
generally aware that malicious actors throughout the world are likely to attack their
blockchain, stealing funds and otherwise causing trouble. Therefore, the naïve entrepreneur decides to implement what they believe is the most secure method of a
blockchain consensus mechanism, PoW, and they offer ample financial rewards to
miners to incentivize a secure network.

The entrepreneur and their entire audience may not realize it, but so long as their
network’s overall hash rate remains below the threshold of an attack by even an
average supercomputer, their entire blockchain history is vulnerable to complete annihilation. A technically astute competitor, seeing the vulnerability, and possessing
ownership of the requisite computer hardware, would be able to create an empty and
longer version of the same blockchain code and vaporize their competitor’s financial
records.

The cryptocurrency industry is young, and few but the most advanced of develop-
ers understand the many ways in which blockchain competition can be technically
eliminated. Therefore, we have seen but a few serious cases of the Genesis Attack.
One notable instance occurred when an original Bitcoin developer, Luke-jr, used a variation of the attack to destroy a blockchain project called Coiledcoin. Luke- jr per-
formed this attack out of a belief that Coiledcoin was a [disingenuous project](https://bitcointalk.org/index.php?topic=56675.msg678006#msg678006). Setting
aside any human sentiment on either side of the event, the fact stands that Luke-jr’s
variation of the Genesis Attack was the end of the Coiledcoin network.

The complexity in establishing a secure PoW blockchain remains a challenge for
would-be entrepreneurs. Furthermore, there are existing PoW developers that are not
fully aware of their vulnerability. Likewise, there are would-be malicious actors that
have yet to realize the many methods available to cause frustration. The potential
danger surrounding the issue of the Genesis Attack shows the relative youthfulness
of the cryptocurrency industry.

For a PoW blockchain network to maintain Bitcoin-level security, therefore, it must
maintain a hash rate that is high enough to constantly mine blocks faster than a
potential competitor could either perform the 51% Attack (destroying the most recent
of transactions), or the deadly Genesis Attack (complete annihilation).

## The Financial and Eco-Unfriendly Problems With All PoW Networks

The problems with young PoW networks do not stop there, and furthermore, even
Bitcoin’s PoW network has issues: the security of a PoW network comes at a high cost
to the environment, and miners have no obligation to mine any particular network.

### PoW Networks Are Expensive

Some estimate that by 2020, the Bitcoin network alone will consume more elec-
tricity than the entire world currently consumes (as of [2017](https://arstechnica.com/tech-policy/2017/12/bitcoins-insane-energy-consumption-explained/)). Having just one PoW
network in existence, therefore, is already strain enough on our environment. It is
also a burden on our infrastructure and our worldwide economy. On the one hand,
adding additional PoW blockchains to the world can serve the purpose of forcing
free- market competition on the Bitcoin developers, encouraging ethical and innovative behavior. Therefore, some competition among PoW networks is likely useful.

However, as a human species, we can consider that there are more financially sound
and eco-friendly methods of innovating with blockchain technology without always
directly competing with Bitcoin PoW security. Our innovation, delayed Proof of Work,
is one response to this fact, as we will soon discuss.

### Miners are Free to Mine Other Networks

In November of 2017, for a few hours the majority of Bitcoin network miners
switched their hash power to a competitor’s PoW network, the "[Bitcoin Cash](https://www.coinwarz.com/network-hashrate-charts/bitcoincash-network-hashrate-chart)" net-
work. This switch was the result of clever software engineering on the part of the
Bitcoin Cash team.

The team recognized that most miners on the Bitcoin network are set to automatically mine whichever network is most profitable. Therefore, the team conducted a
calculated change in their underlying protocol that caused the profitability of the
Bitcoin Cash network to dramatically increase. The majority of the world’s Bitcoin
mining equipment, running via automation, recognized the higher profitability and
switched to the Bitcoin Cash network automatically.

While Bitcoin Cash’s play for a majority hash rate only proved effective for a matter
of hours, their accomplishment raised awareness to a tacit principle in the network:
Bitcoin’s hash rate is not bound to Bitcoin. The hardware is free to serve any compatible network the miners choose.

At the time of the writing of this paper, between Bitcoin and Bitcoin Cash, ~80% of
the available hash rate is aligned with the former, and ~20% with the latter. There is
speculation in the industry that if the Bitcoin Cash network creates a more favorable
position, the balance of hashing power could change on a long-term basis. Furthermore, there are many other blockchain competitors who may gain the attention of
Bitcoin’s miners in the future.

Were a shift in the balance of hash rate to occur, Bitcoin would no longer be the
leader of security in the cryptocurrency realm. The price of Bitcoin would likely drop
as users realized the resulting lack of security leadership. This might cause more
miners to switch to a more profitable network to cover the cost of operating their
expensive hardware. As miners abandon Bitcoin, and as users continue to leave, the
situation becomes a reversal of the Network Effect. The Bitcoin network would come
crashing downwards at an ever-compounding rate.

This is all theoretical, but it raises yet another concern that we need to illuminate:
the security of a blockchain depends on many things, including the potentially fickle
support of human blockchain miners. Our innovation, delayed Proof of Work (dPoW),
takes this fact into account as we empower members of the Komodo ecosystem with
Bitcoin-level security. Before we finally turn to our own solution, we must discuss the
primary competitor to the PoW consensus mechanism, Proof of Stake (PoS).

### The Primary Alternative Consensus Mechanism: Proof of Stake

Perhaps the most popular alternative consensus mechanism is Proof of Stake (PoS).
In this mechanism, blocks are mined not by miners performing work, but rather by
any user "staking" their coins on the open network for the right to mine blocks.

The meaning of "staking" has different variations depending on the specific rules
set forth by the developers of the unique variant of the PoS consensus mechanism. In
general, staking one’s coins means placing them as collateral on the open network in
exchange for the right to mine new blocks.

Users who stake their coins, thereby, can periodically extract a portion of the mempool, mine new blocks, and earn rewards. There is no need to perform any hardware-
expensive proof-of-work calculations, as the user’s incentive to be honest is encouraged by the fact that their own wealth hangs in the balance.

### The Security Risks and Shortcomings of PoS

The downside to PoS is that a user who simply leaves a large portion of wealth
staked (and therefore continually claims rewards) gradually becomes a centralized
point of wealth through the power of compound interest. On PoS networks, monopolies are a constant danger. The owner of a monopoly has power over the well-being
of the network.

Once a majority of the supply is obtained, the owner gains a position known as
"Nothing at Stake." The owner can mine "false" blocks to the PoS blockchain and use
their own majority supply over the network to declare these "false" blocks valid. All
other stakeholders on the network must adopt these "false" blocks, lest the majority
holder use their strength to declare competing blockchain versions as invalid.

If a non-majority holder attempts to challenge the monopoly holder’s version, the
non-majority holder can achieve little more than the loss of coins they placed at
stake. Compare this with non-majority holder in a PoW system: the question over the
"truth" of the blockchain history depends not upon ownership of wealth, but upon
the miner’s innovation and performance. PoW-based systems do not suffer from the
risk of monopolies, therefore, as majority stakeholders gain no unique control over
the mining of new blocks.

Variations of PoS, including the popular Delegated Proof of Stake (DPoS) and Delegated Byzantine Fault Tolerance (DBFT) systems, do not resolve the underlying issue
of monopoly ownership and centralized manipulation. In a vanilla PoS system, the
malicious actor needs only to purchase a majority supply of the coin to mine "false"
blocks. In a DPoS/DBFT type system, wherein the ecosystem stakeholders elect and
endow delegates with the responsibility to mine new blocks, the malicious actor has
only to compromise most of the delegates. Thereafter, the compromised delegates can
mine "false" blocks, and the users of the ecosystem have no direct means to retaliate,
beyond abandoning the network.

This is not to say that PoS and its variants have no use cases. Indeed, there are
scenarios in which PoS can be useful for entrepreneurs. In the Komodo ecosystem,
our dPoW consensus mechanism can provide security to networks that use either
type of consensus mechanism.

After the following section summary, we finally turn our attention to our dPoW
consensus mechanism.

### A Summary of the PoW Consensus Mechanism

In short, the PoW consensus mechanism, as designed by Satoshi Nakamoto, is
currently the soundest method of blockchain security. It solves the Double Spend
problem and creates a secure network, capable of transferring financial value. Furthermore, competition among miners and the Longest Chain Rule create fairness on
the blockchain. The combination of features provides a high level of defense against
two of the most dangerous methods of blockchain destruction—the 51% Attack and
the Genesis Attack—assuming a strong overall hash rate on the network.

New PoW blockchains can opt to compete directly with Bitcoin’s hash rate, and
some level of competition is good for the ethical values and innovative power of the
cryptocurrency industry. However, it is not necessary, cost-effective, nor eco-friendly
that every new blockchain innovation requiring security should attempt to compete
directly with Bitcoin. Not only is this unsustainable, but it is also unreliable, as it
depends on the arbitrary choices of the decentralized network of miners around the
world.
