# Delayed Proof of Work

## A Foundational Discussion of Blockchain Security

Komodo’s form of providing security is called Delayed Proof of Work technology (dPoW). It builds on the most advanced form of blockchain security in existence, Proof of Work technology (PoW). The latter form of security is the method that the Bitcoin network utilizes.

To understand the value of Komodo’s dPoW security, we must first explain how PoW works and why it is the most secure method of maintaining a decentralized blockchain. We must also examine PoW’s shortcomings, so that we may understand the need for Komodo’s dPoW method and the advantages it provides to the blockchain community.

To understand how PoW technology functions, we begin by explaining the roots that make the Bitcoin protocol a viable means of securely transferring value.

## What Is A Consensus Mechanism?

#### The "Double Spend" Problem

The creation of blockchain technology stems from the early mathematical studies of encryption using computer technology.

One such example is related to the information-encoding device, "Enigma," invented by the Germans at the end of World War I. Alan Turing, a British Intelligence agent, famously beat the Enigma device by inventing the world’s first "digital computer." This provided enough computing power to break [Enigma’s](https://en.wikipedia.org/wiki/Enigma_machine) encryption and discover German secret communications.

This early affair with encryption set off a race throughout the world to develop myriad forms of securely transferring information from one party to another via computer technology. While each new form of computer encryption provided more advantages, there remained one problem that prevented encryption from being useful as a means of transferring not just information, but also financial value.

This challenge is known as the "Double Spend" problem. The issue lies in the ability of computers to endlessly duplicate information. In the case of financial value, there are three important things to record: who owns a specific value; the time at which the person owns this value; the wallet address in which the value resides. When transferring financial value from one person to another, it is essential that if Person A sends money to Person B, Person A should not be able to duplicate the same money and send it again to Person C.

The [Bitcoin protocol](https://en.wikipedia.org/wiki/Bitcoin_network), invented by an anonymous person (or persons) claiming the name of Satoshi Nakamoto, solved the Double Spend problem. The underlying math and computer code is both highly complex and innovative. For the purposes of this paper we need only focus on the one aspect of the Bitcoin protocol that solves the Double Spend problem: the consensus mechanism.

#### The Consensus Mechanism Provides Security Against a "Double Spend"

The consensus mechanism created by Nakamoto is perhaps one of the most powerful innovations of the twenty-first century. His invention allows individual devices to work together, using high levels of encryption, to securely and accurately track ownership of digital value (be it financial resources, digital real estate, etc.). It performs this in a manner that does not allow anyone on the same network (i.e. the Internet) to spend the same value twice.

Let us suppose a user, Alice, indicates in her digital wallet that she wants to send cryptocurrency money to a friend. Alice’s computer now gathers several pieces of information, including any necessary permissions and passwords, the amount that Alice wants to spend, and the receiving address of her friend’s wallet. All this information is gathered into a packet of data, called a "transaction," and Alice’s device sends the transaction to the Internet.

There are several types of devices that will interact with Alice’s transaction on the Internet. These devices will share the transaction information with other devices supporting the cryptocurrency network. For this discussion, we need only focus on one type of device: a cryptocurrency miner.

::: tip Note

The following descriptions are simplified explanations of a truly complex process. There are many other strategies cryptocurrency miners devise to out-mine their competition, and those strategies can vary widely.

:::

#### A Miner Competes to Add Blocks to the Network’s History, in Exchange for a Reward

##### Step One: Preparing the Preliminary Information

This device is performing an activity called cryptocurrency "mining." Let us focus now on a mining device that captures Alice’s raw transaction data. This device is owned by a tech-savvy miner, named Bob, who wants to add Alice’s transaction to the permanent history of the Bitcoin network.

If Bob is the first person to properly process Alice’s transaction he will receive a financial reward. One key part of this reward is a percentage-based fee, taken from Alice’s total transaction amount.

##### The Mempool is the Collection of All Raw Transactions Waiting to be Processed

Furthermore, Bob does not have just one transaction alone to mine. Rather, he has an entire pool of raw transactions, created by many people across the Internet. The raw data for each of these transactions sits in the local memory bank of each miner’s mining device, awaiting the miner’s commands. Miners call this pool of transactions, the "mempool." Most miners have automated systems to determine the transaction-selection process, based on estimated profit.

##### Creating Transaction Hashes

After Bob makes his choices about which transactions he will attempt to mine (and we assume that he includes Alice’s transaction), Bob’s mining device then begins a series of calculations.

His device will first take each individual transaction’s raw data and use mathematical formulas to compress the transaction into a smaller, more manageable form. This new form is called a "transaction hash." For instance, Alice’s transaction hash could look like this:

```bash
b1fea52486ce0c62bb442b530a3f0132b826c74e473d1f2c220bfa78111c5082
```

Bob will prepare potentially hundreds of transaction hashes before proceeding to the next step. One important thing to understand about the compression of data in the Bitcoin protocol, including the transaction hash above, is that calculations herein obey a principle called, The Cascade Effect.

##### The Cascade Effect: Changing One Bit of Data Changes the Entire Result

The Cascade Effect simply means that were Bob to attempt to change even the smallest bit in the raw data—whether from a desire to cheat, or by mistake, or for any other reason—the entire transaction hash would dramatically change. In this way, the mathematical formulas in the Bitcoin protocol ensure that Bob cannot create an improper history.

Were Bob to attempt to create an incorrect transaction hash, other miners on the network could use the raw transaction data from Alice, perform the proper mathematical formulas in the Bitcoin protocol, and immediately discover that Bob’s hashes are incorrect. Thus, all the devices on the network would reject Bob’s incorrect attempts and prevent him from claiming rewards.

##### Step One Continued: Finishing the Preliminary Calculations

Now, using more mathematical formulas, Bob takes the transaction hashes he is attempting to process and compresses them into a new manageable piece of data.

This is called, "the merkle root." It represents all the transactions that Bob hopes to process, and from which he hopes to gain a reward. Bob’s merkle root could look like this:

```bash
7dac2c5666815c17a3b36427de37bb9d2e2c5ccec3f8633eb91a4205cb4c10ff
```

Finally, Bob will gather information provided from the last miner that successfully added to the permanent blockchain history. This information is called, "the block header." It contains a large amount of complex data, and we won’t go into all the details. The one important element to note is that the block header gives Bob clues about how to properly add the next piece of information to the permanent Bitcoin history. One of these hints could look like this:

```bash
"difficulty" : 1.00000000
```

We will return to this clue further on.

Having all this information, Bob is nearly prepared. His next step is where the real challenge begins.

##### Step Two: The Race to Finish First

Bob’s computer is going to gather all the above information and collect it into a set of data called a "block." Mining this block and adding it to the list of blocks that came before is the process of creating a "chain" of blocks—hence the industry title, "blockchain."

However, adding blocks to the blockchain is not so easy. While Bob may have everything up to this point correctly prepared, the Bitcoin protocol does not yet give Bob the right to add his proposed block to the chain.

The consensus mechanism is designed to force the miners to compete for this right. By requiring the miners to work for the right to mine a new valid block, competition spreads across the network. This provides many benefits, including time for the trans- actions of users (like Alice) to disseminate around the world, thus providing a level of decentralization to the network.

Therefore, although Bob would prefer to immediately create a new valid block and collect his reward, he cannot. He must win the competition by performing the proper work first. This is the source of the title of the Bitcoin-protocol consensus mechanism, "Proof of Work" (PoW).

The competition that Bob must win is to be the first person to find an answer to a simple mathematical puzzle, designed by Satoshi Nakamoto. To solve the puzzle, Bob guesses at random numbers until he discovers a correct number. The correct number is determined by the internal complex formulas of the consensus mechanism and cannot be discovered by any means other than guessing. Bitcoin miners call this number a "nonce," which is short for "a ‘number’ you use ‘once.’"

Bob’s mining device will make random guesses at the nonce, one after another, until a correct nonce is found. With each attempt, Bob will first insert the proposed nonce into the rest of his block. To find out if his guess is correct, he will next use mathematical formulas (like those he used earlier) to compress his attempt into a "block hash." A block hash is a small and manageable form of data that represents the entire history of the Bitcoin blockchain and all the information in Bob’s proposed block. A block hash can look like this:

```bash
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

Recall now The Cascade Effect, and how it states that changing one small number in the data before performing the mathematical computations creates a vastly different outcome. Since Bob is continually including new guesses at the nonce with each computation of a block hash, each block-hash attempt will produce a widely different sequence of numbers. Miners on the Bitcoin network know when a miner, such as Bob, solves the puzzle; by observing the clues that were provided earlier. Recall that the last time a miner successfully added data to the blockchain, they provided these clues in their block header. One of the clues from the previous block header can look like this:

```bash
"difficulty" : 1.00000000
```

This detail, "difficulty," simply tells miners how many zeros should be at the front of the next valid block hash. When the difficulty setting is the level displayed above, it tells miners that there should be exactly ten zeros. Observe Bob’s attempted block hash once again, which he created after making a guess at a nonce, adding this proposed nonce into his block, and performing the mathematical formulas:

```bash
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

The block hash above has ten zeros at the beginning, which matches the number of zeros in the difficulty level. Therefore, the hash that Bob proposed is correct. This must mean that he guessed a correct nonce. All the miners on the network can prove for themselves that Bob was correct by taking all the same information from their mempools, adding Bob’s nonce, and performing the mathematical calculations. They will receive the same result, and therefore Bob is the winner of this round.

On the other hand, due to the Cascade Effect, if Bob’s attempted nonce had produced a block hash with the incorrect number of zeros at the front, his block hash would be invalid. The network would not afford him the right to add an incorrect block hash to the network, and all the miners would continue searching.

##### Step Three: Bob Finds the Nonce

Once a miner discovers a nonce that produces a valid block hash, the miner has "found a new block," and can send the signal across the Internet. The consensus mechanism running on every other mining device can verify for themselves the calculations. Once verified, the consensus mechanism grants the miner the right both to add the proposed block to the blockchain, and to receive the reward.

Let us return to Bob’s machine, having just guessed a correct nonce, and thus holding a valid block hash. Bob’s machine instantly sends out the winning information across the Internet, and Bob collects his reward from the Bitcoin network. All the other miners must readjust. Earlier, they were searching for the correct nonce based off the information from the previous block header. However, Bob’s new valid block includes a new block header. All the other miners on the network abandon their current work, adopt Bob’s new block header, make many recalculations in their underlying data, and begin their search for the next nonce.

There is no sympathy in the Bitcoin protocol for any miner’s wasted efforts. Suppose another machine on the network was also trying to mine Alice’s transaction, and lost to Bob in the race. Only Bob earns the reward from Alice’s transaction, and the other miner receives nothing in return for their costs and time.

For Alice, this process seems simple. She first indicated the wallet address of her friend and sent cryptocurrency. After a certain amount of time, her friend received the money. Alice can ignore the byzantine process of the miners that occurred between these two events. Alice may not realize it, but the PoW consensus mechanism provides the foundation of security upon which she relies.

## The Dominance of the Proof-of-Work Consensus Mechanism

#### Proof of Work (PoW) Fosters Ever Increasing Security

There are several reasons why PoW networks, especially Bitcoin, continue to dominate in terms of security and blockchain success.

A simple, preliminary reason is that PoW networks foster ever-increasing speed and computer power. Miners must constantly update and innovate above their competitors to continue earning rewards.

##### Speed and Power are of the Essence

Among miners, having a faster and more powerful computer can mean earning rewards more frequently. For miners seeking to maximize profit, competition requires constant upgrades to machinery and to a miner’s customized underlying code.

The frequency at which a device can create proposed block hashes is called "hash power." The more hash power a collective PoW network has across all miners mining the blockchain, the more secure the network. This competitive pressure provides one important advantage in security to PoW networks, when compared to alternate consensus mechanisms.

##### The Network Effect: Bitcoin’s Ability to Dominate Begins

A high level of security fosters a sense of trust among users, and this can grow a PoW network’s audience. As the audience grows, both the number of transactions and the price of the coin increase. This attracts more miners. The rising level of miners provides greater overall hash rate to the network, which in turn fosters a stronger sense of trust. This increased sense of security can raise the number of users on the network, which can increase the number of miners, and the cycle repeats.

In economics, this is classified as a "Network Effect," where a cycle of behavior encourages more of the same behavior, with compounding interest. Due to the Network Effect, and the fact that Bitcoin is the oldest PoW network, Bitcoin is increasing its security at a rate faster than the rate of other PoW networks.

Furthermore, consider the effect caused when the price of a PoW-blockchain coin rises. Before the rise, assume the blockchain coin is worth one dollar. A miner is justified in spending the necessary money (on equipment, upgrades, and electrical costs, etc.) to justify one dollar’s worth of hash rate. If the price shifts upwards to two dollars, the miner must upgrade their entire business to justify two dollars’ worth of a matching hash rate. If the miner does not upgrade, their competitor will, and then the miner will no longer be able to compete for rewards.

#### The Longest Chain Rule: The True "Secret Sauce" of Pow Domination

There are many more reasons why PoW networks continue to dominate in security.  Yet, for our discussion, there is one element that rises above all others. It is called, "The Longest Chain Rule," and some blockchain developers may argue that it is "the secret sauce" that fuels PoW’s strength.

The Longest Chain Rule is the determining factor whenever two competing versions of the blockchain history arise on the network. The rule simply states that whichever of the two versions grows longer first, wins. The other version is overwritten, and therefore all transactions and rewards on that version are erased. The simplicity of this rule is a key to understanding why PoW consensus mechanisms continue to outperform their competition.

##### The Simple Effects of The Longest Chain Rule

On a surface level, this rule prevents a double spend by a network user. For instance, consider a husband and wife accidentally attempting to spend the same money at the exact same time, while each person is traveling in a different part of the world.

::: tip Note

For the sake of the discussion, we are oversimplifying the following actions so that they take place within only a few milliseconds. We also oversimplify the technical details, for clarity. The full explanation of this process is provided in the [Bitcoin wiki](https://en.bitcoin.it/wiki/Main_Page), for those who would like to gain a deeper understanding.

:::

##### A Tale of Two Blockchains

Let us suppose that the husband is in Asia and the wife is in the Americas. Both are purchasing a car. The husband uses all the funds from the family Bitcoin wallet to purchase a car at precisely 8:00 PM (UTC). The wife makes her purchase at the exact same moment, for a similar amount.

After making his purchase, the husband’s transaction hash is immediately sent to a mining device in China, where it is held in the miner’s local mempool (recall that a mempool is a collection of all raw transaction data across the network).

Let us suppose that the husband’s transaction arrives in the Chinese miner’s mempool at the exact moment that the Chinese mining equipment finds a correct nonce and a valid block hash. The Chinese miner declares the winning information, mines a new block, and collects a reward. All the miners in his local (Asian) vicinity (who receive the winning information faster than in the Americas, due to proximity) complete the block verification process, increase the length of the blockchain, and begin searching for the next valid block hash.

On the opposite side of the world, essentially the exact same actions happen. The wife’s transaction is sent to the nearest miner, this time located in Washington state of the United States. Just as the transaction enters the Washington state miner’s mempool, the miner discovers a valid block hash. He sends out the signal, mines a new block, and also collects the reward (this is the same reward that the Chinese miner is attempting to claim). All the miners in the local (US) vicinity verify the information immediately and begin searching for a new valid block hash based on the Washington state miner’s recent block.

##### An Internal Conflict of Interest Arises Within the Bitcoin Network

Note the paradox here. There are now two versions of the Bitcoin history that are valid, yet different.

These two versions make their way across the Internet, around the world, each to the other side. When the competing messages arrive, the Bitcoin protocol sees that there is a conflict: the same money was spent twice.

Consider how on each side of the world the miners are spending their financial and temporal resources to further their own interests. There is no economic incentive for either side to submit to the other, by nature. Therefore, there is a conflict of interest within the Bitcoin network itself. The Bitcoin network would swiftly fail, were it not for The Longest Chain Rule.

##### The Longest Chain Rule: The History Which is Longer First, Wins

The Longest Chain Rule simply declares that whichever of the two competing blockchains grows longer first, wins. The consensus mechanism erases the other version.

Let us suppose that the Chinese mining equipment is superior in this instance, and the Chinese miner manages to discover the next valid block hash and send out the signal before the Washington state miner can do likewise. Across the world, the moment the information arrives that the Chinese miner completed yet another valid block, the Bitcoin protocol erases the Washington state miner’s version of the Bitcoin history.

There is no sympathy for any wasted efforts, nor for any misunderstandings between the wife and her car dealer. The Bitcoin protocol’s consensus mechanism simply presses forward. The Washington state miner’s rewards disappear, as though they never occurred. The wife’s purchase of a car likewise evaporates.

_(Typically, a normal and prepared car dealer utilizing cryptocurrency would not consider a customer’s transactions acceptable until several new blocks were added to the blockchain. In this manner,cryptocurrency users can ensure that a transaction is beyond contestation before the customer can, for example, drive a new car off the lot.)_

The Washington state miner gets a raw deal in this scenario, but the network benefits as a whole. The Longest Chain Rule provides the necessary security to prevent a Double Spend. The network accurately recorded one family member’s purchase of a car, prevented the mistaken double spend, and ensured that the most competitive miner received a just reward.

This example illuminates the importance of The Longest Chain Rule. However, there is a dark side to this rule for the unsuspecting and unprepared blockchain developer.

## The 51% Attack

Here’s where intrigue enters the picture. The "easiest" way to steal money on a PoW blockchain (such as Bitcoin) is to perform a 51% Attack.

In this attack, the malicious actor first spends cryptocurrency in exchange for something of value, which they take from their victim. Next, the malicious actor creates an alternate version of the PoW network’s history wherein those transactions never took place. Using advanced mining equipment, the malicious actor then "attacks" the PoW network by mining blocks to this "false" history faster than the rate at which other miners on the PoW network can mine blocks to the "true" history.

Assuming the malicious actor has a sufficient hash rate, as this "false" history grows longer than the "true" history, the Longest Chain Rule will cause the consensus mechanism to overwrite the "true" version. The earlier transactions the malicious actor made would be as though they never occurred. Therefore, the malicious actor would keep both their original funds and whatever item of value they exacted from their victim.

This is known as the 51% Attack. The number 51% derives from the fact that to successfully perform this attack, the attacker must add enough hashing power to the overall PoW network to form a majority of the hash rate.

##### Size is Yet Another Reason Behind Bitcoin’s Current Success Among PoW Networks

Today, Bitcoin’s overall hash rate is enormous. The collective of computers around the world mining Bitcoin is effectively the largest supercomputer ever created by man.  As of the writing of this paper, some estimate that [the Bitcoin network consumes more electricity than the entire country of Denmark](https://arstechnica.com/tech-policy/2017/12/bitcoins-insane-energy-consumption-explained/), and the number of miners continues to grow.

Therefore, to attempt a 51% Attack against the Bitcoin network could cost millions, if not billions of dollars in computer hardware. It would also require a sustained consumption of electricity that is likely unfeasible for a single geographical location, and would be expensive even for a decentralized-hardware network. So long as the miners of Bitcoin remain interested in the Bitcoin network, therefore, Bitcoin has a level of security that is nigh impenetrable.

_We will return to the proposition of the miners’ ability to choose a different network to mine later in our discussion._

## The Genesis Attack

##### A Genesis Attack on the Bitcoin Network

Recall that according to the original version of the Bitcoin protocol, sometimes called the ["vanilla" version,](https://www.worldcryptoindex.com/bitcoin-scaling-problem-explained/) the Longest Chain Rule only requires that the blocks in the longest chain all be properly mined. Furthermore, recall that computers can endlessly duplicate code.

Finally, note that during our explanation, when describing a malicious actor’s attempt to create an empty, meaningless blockchain history, we use quotation marks when employing the word, "false." Likewise, when describing the blockchain history trusted by the people on the network, we include the word "true" in quotations.

We do this because at the core level, the consensus mechanism is purposefully blind regarding any human user’s preference between "truth" and "false." The code only sees "truth" in terms of properly mined blocks, and overall blockchain length.  Nothing more.

Now suppose the existence of a supercomputer a thousand times more powerful than the entirety of the Bitcoin-miner network. This supercomputer could, in theory, stealthily re-create and execute the initial code that spawned the very first block of the Bitcoin blockchain—the "Genesis Block." The supercomputer could then grind out block hashes, one-by-one, mining meaningless blocks and adding them to this empty, "false" version of the Bitcoin history.

Once this meaningless blockchain’s length sufficiently exceed the so-called "true" blockchain used today, the supercomputer could then release its "false" version to the Internet.

Throughout the world, (assuming the vanilla protocol) the Bitcoin network would automatically recognize the "false" blockchain as the correct blockchain! This would all be according to the code. The so-called "false" blocks would be properly mined, and the length would be longer than the chain that users currently trust. The vanilla protocol would, in theory, replace the so-called "true" history with the empty variant.

It might seem to users like a virus being uploaded to the Internet. It could destroy all human trust in the current version of the Bitcoin protocol, wreaking financial havoc throughout the cryptocurrency realm. While users of the Bitcoin protocol would naturally protest, the entire operation would be entirely in agreement with the underlying code.

When observing Bitcoin’s current hash power, the creation of such an anti-Bitcoin supercomputer is clearly not feasible in the immediate future. Assuming Bitcoin miners remain interested in the Bitcoin network, the risk of a Genesis Attack on Bitcoin is essentially non-existent.

However, consider the implications of the Genesis Attack on unsuspecting or underprepared smaller PoW blockchain projects.

##### The More Realistic Dangers of The Genesis Attack

Let us assume a naïve blockchain entrepreneur building a new product. They are generally aware that malicious actors throughout the world are likely to attack their blockchain, stealing funds and otherwise causing trouble. Therefore, the naïve entrepreneur decides to implement what they believe is the most secure method of a blockchain consensus mechanism, PoW, and they offer ample financial rewards to miners to incentivize a secure network.

The entrepreneur and their entire audience may not realize it, but so long as their network’s overall hash rate remains below the threshold of an attack by even an average supercomputer, their entire blockchain history is vulnerable to complete annihilation. A technically astute competitor, seeing the vulnerability, and possessing ownership of the requisite computer hardware, would be able to create an empty and longer version of the same blockchain code and vaporize their competitor’s financial records.

The cryptocurrency industry is young, and few but the most advanced of developers understand the many ways in which blockchain competition can be technically eliminated. Therefore, we have seen but a few serious cases of the Genesis Attack. 

One notable instance occurred when an original Bitcoin developer, Luke-jr, used a variation of the attack to destroy a blockchain project called Coiledcoin. Luke-jr performed this attack out of a belief that Coiledcoin was a [disingenuous project.](https://bitcointalk.org/index.php?topic=56675.msg678006#msg678006) Setting aside any human sentiment on either side of the event, the fact stands that Luke-jr’s variation of the Genesis Attack was the end of the Coiledcoin network.

The complexity in establishing a secure PoW blockchain remains a challenge for would-be entrepreneurs. Furthermore, there are existing PoW developers that are not fully aware of their vulnerability. Likewise, there are would-be malicious actors that have yet to realize the many methods available to cause frustration. The potential danger surrounding the issue of the Genesis Attack shows the relative youthfulness of the cryptocurrency industry.

For a PoW blockchain network to maintain Bitcoin-level security, therefore, it must maintain a hash rate that is high enough to constantly mine blocks faster than a potential competitor could either perform the 51% Attack (destroying the most recent of transactions), or the deadly Genesis Attack (complete annihilation).

## The Financial and Eco-Unfriendly Problems With All PoW Networks

The problems with young PoW networks do not stop there, and furthermore, even Bitcoin’s PoW network has issues: the security of a PoW network comes at a high cost to the environment, and miners have no obligation to mine any particular network.

#### PoW Networks Are Expensive

Some estimate that by 2020, the Bitcoin network alone will consume more electricity than the entire world currently consumes (as of [2017.](https://arstechnica.com/tech-policy/2017/12/bitcoins-insane-energy-consumption-explained/)) Having just one PoW network in existence, therefore, is already strain enough on our environment. It is also a burden on our infrastructure and our worldwide economy. 

On the one hand, adding additional PoW blockchains to the world can serve the purpose of forcing free-market competition on the Bitcoin developers, encouraging ethical and innovative behavior. Therefore, some competition among PoW networks is likely useful.

However, as a human species, we can consider that there are more financially sound and eco-friendly methods of innovating with blockchain technology without always directly competing with Bitcoin PoW security. Our innovation, delayed Proof of Work, is one response to this fact, as we will soon discuss.

#### Miners are Free to Mine Other Networks

Another inherent weakness of the PoW consensus mechanism to discuss is the ability of miners to choose alternate networks.

In November of 2017, for a few hours the majority of Bitcoin network miners switched their hash power to a competitor’s PoW network, the "[Bitcoin Cash](https://www.coinwarz.com/network-hashrate-charts/bitcoincash-network-hashrate-chart)" network. This switch was the result of clever software engineering on the part of the Bitcoin Cash team.

The team recognized that most miners on the Bitcoin network are set to automatically mine whichever network is most profitable. Therefore, the team conducted a calculated change in their underlying protocol that caused the profitability of the Bitcoin Cash network to dramatically increase. The majority of the world’s Bitcoin mining equipment, running via automation, recognized the higher profitability and switched to the Bitcoin Cash network automatically.

While Bitcoin Cash’s play for a majority hash rate proved effective only for a matter of hours, their accomplishment raised awareness to a tacit principle in the network: Bitcoin’s hash rate is not bound to Bitcoin. The hardware is free to serve any compatible network the miners choose.

At the time of the writing of this paper, between Bitcoin and Bitcoin Cash, ~80% of the available hash rate is aligned with the former, and ~20% with the latter. There is speculation in the industry that if the Bitcoin Cash network creates a more favorable position, the balance of hashing power could change on a long-term basis. Furthermore, there are many other blockchain competitors who may gain the attention of Bitcoin’s miners in the future.

Were a shift in the balance of hash rate to occur, Bitcoin would no longer be the leader of security in the cryptocurrency realm. The price of Bitcoin would likely drop as users realized the resulting lack of security leadership. This might cause more miners to switch to a more profitable network to cover the cost of operating their expensive hardware. As miners abandon Bitcoin, and as users continue to leave, the situation becomes a reversal of the Network Effect. The Bitcoin network would come crashing downwards at an ever-compounding rate.

This is all theoretical, but it raises yet another concern that we need to illuminate: the security of a blockchain depends on many things, including the potentially fickle support of human blockchain miners. Our innovation, delayed Proof of Work (dPoW), takes this fact into account as we empower members of the Komodo ecosystem with Bitcoin-level security. Before we finally turn to our own solution, we must discuss the primary competitor to the PoW consensus mechanism, Proof of Stake (PoS).

#### The Primary Alternative: Proof of Stake

Perhaps the most popular alternative consensus mechanism is Proof of Stake (PoS).  In this mechanism, blocks are mined not by miners performing work, but rather by any user "staking" their coins on the open network for the right to mine blocks.

The meaning of "staking" has different variations depending on the specific rules set forth by the developers of the unique variant of the PoS consensus mechanism. In general, staking one’s coins means placing them as collateral on the open network in exchange for the right to mine new blocks.

Users who stake their coins, thereby, can periodically extract a portion of the mempool, mine new blocks, and earn rewards. There is no need to perform any hardware-expensive proof-of-work calculations, as the user’s incentive to be honest is encouraged by the fact that their own wealth hangs in the balance.

#### The Security Risks and Shortcomings of PoS

The downside to PoS is that a user who simply leaves a large portion of wealth staked (and therefore continually claims rewards) gradually becomes a centralized point of wealth through the power of compound interest. On PoS networks, monopolies are a constant danger. The owner of a monopoly has power over the well-being of the network.

Once a majority of the supply is obtained, the owner gains a position known as "Nothing at Stake." The owner can mine "false" blocks to the PoS blockchain and use their own majority supply over the network to declare these "false" blocks valid. All other stakeholders on the network must adopt these "false" blocks, lest the majority holder use their strength to declare competing blockchain versions as invalid.

If a non-majority holder attempts to challenge the monopoly holder’s version, the non-majority holder can achieve little more than the loss of coins they placed at stake. Compare this with non-majority holder in a PoW system: the question over the "truth" of the blockchain history depends not upon ownership of wealth, but upon the miner’s innovation and performance. PoW-based systems do not suffer from the risk of monopolies, therefore, as majority stakeholders gain no unique control over the mining of new blocks.

Variations of PoS, including the popular Delegated Proof of Stake (DPoS) and Delegated Byzantine Fault Tolerance (DBFT) systems, do not resolve the underlying issue of monopoly ownership and centralized manipulation. In a vanilla PoS system, the malicious actor needs only to purchase a majority supply of the coin to mine "false" blocks. In a DPoS/DBFT type system, wherein the ecosystem stakeholders elect and endow delegates with the responsibility to mine new blocks, the malicious actor has only to compromise most of the delegates. Thereafter, the compromised delegates can mine "false" blocks, and the users of the ecosystem have no direct means to retaliate, beyond abandoning the network.

This is not to say that PoS and its variants have no use cases. Indeed, there are scenarios in which PoS can be useful for entrepreneurs. In the Komodo ecosystem, our dPoW consensus mechanism can provide security to networks that use either type of consensus mechanism.

After the following section summary, we finally turn our attention to our dPoW consensus mechanism.

## A Summary of the PoW Consensus Mechanism

In short, the PoW consensus mechanism, as designed by Satoshi Nakamoto, is currently the soundest method of blockchain security. It solves the Double Spend problem and creates a secure network, capable of transferring financial value. Furthermore, competition among miners and the Longest Chain Rule create fairness on the blockchain. The combination of features provides a high level of defense against two of the most dangerous methods of blockchain destruction—the 51% Attack and the Genesis Attack—assuming a strong overall hash rate on the network.

New PoW blockchains can opt to compete directly with Bitcoin’s hash rate, and some level of competition is good for the ethical values and innovative power of the cryptocurrency industry. However, it is not necessary, cost-effective, nor eco-friendly that every new blockchain innovation requiring security should attempt to compete directly with Bitcoin. Not only is this unsustainable, but it is also unreliable, as it depends on the arbitrary choices of the decentralized network of miners around the world.

## The Komodo Solution: Delayed Proof Of Work (dPOW)

Komodo presents a technology, the delayed Proof of Work consensus mechanism, that solves the problems described above. Komodo’s unique consensus mechanism provides the same level of security as the strongest PoW network, without attempting direct competition. Instead, Komodo’s consensus mechanism uses the chosen PoW network as a storage space for "backups" of Komodo transactions. By this method, in the event of an attempted attack on Komodo’s blockchain history, even a single surviving copy of the Komodo main chain will allow the entire ecosystem to overwrite and overrule any of the attacker’s attempted changes.

In a key difference separating Komodo from regular PoW networks, our dPoW consensus mechanism does not recognize the Longest Chain Rule for any transactions that are older than the most recent "backup" of the Komodo blockchain. For conflicts that may arise which refer to transactions that are older than the most recent "backup," our consensus mechanism looks to the backups in the chosen PoW blockchain to find the accurate record.

Furthermore, entrepreneurs who build independent blockchains (Smart Chains) in the Komodo ecosystem can likewise elect to have backups of their own records inserted into the Komodo main chain. In this manner, the records of the entrepreneur’s chain are then included in the backup that is pushed into the protective hash rate of the main PoW blockchain (Bitcoin). Thus, entrepreneurs and developers in the Komodo ecosystem can have their independent blockchains protected by the chosen PoW network’s hash rate.

Therefore, to destroy even the smallest Smart Chain that is employing Komodo’s dPoW security, the attacker would have to destroy: a) all existing copies of the Smart Chain; b) all copies of the Komodo main chain; c) the accompanying PoW security network into which the dPoW backups are inserted (Bitcoin). This endows the Komodo ecosystem with higher than Bitcoin-level security, while avoiding the excessive financial and eco-unfriendly costs.

In addition, the dPoW security provided by Komodo is not only greater than Bitcoin, but is also more flexible. The Komodo security services are performed by notary nodes, chosen through a stake-weighted vote. Notary nodes have the freedom to switch notarization to another PoW network. Reasons the notary nodes might elect to switch networks could include an event where worldwide miners’ hashing power changes to another PoW network, or the cost of notarization to the current PoW network becomes more than necessary. Through this flexibility, the Komodo ecosystem maintains both a superior level of security and a more flexible and adaptive nature than Bitcoin itself.

#### A Note About Komodo’s Iguana Core Technology

All the following processes are supported by a deeper Komodo technology called Iguana Core. Readers of this entire section of documentation will note that Iguana Core is featured in each section. This is because Iguana Core is the heart of the underlying technology that enables the vast Komodo ecosystem to work together. The Iguana Core code itself is complex and to fully explain would require a separate whitepaper.

In short, Iguana Core is a collection of code that serves many purposes. One function of Iguana Core is to empower the blockchain technologies Komodo either builds or adopts to act in coordination with each other. Often, Iguana Core can advance their initial capabilities beyond original expectations. In the case of dPoW, the code that underlies notary-node functionality spawned from Iguana Core technology.

Iguana Core is coded in the C programming language—the language of choice of our lead developer, JL777. The C language is designed to enable computers to process high volumes of information in a secure manner at high speed. This aligns with Komodo’s directives to provide security and scalability to our users.

#### A Brief Discussion on the Security Provided by the Notary Nodes

Security is the foundational aspect of the Komodo ecosystem. Therefore, for the reader, we must first discuss the nature of the security the notary nodes provide.  More detailed explanations on individual components will follow.

The Komodo ecosystem uses a stake-weighted vote to elect parties who will run sixty-four separate "notary nodes." These notary nodes perform the "backup" process via automation provided by the Iguana Core software that runs at the heart of our system. These backups are called "notarizations." Each notarization performed by the notary nodes acts as a marker of the "true" history for the Komodo ecosystem, and this marker’s accuracy is secured by the hash power of the chosen PoW network.

The notary nodes work together in a decentralized and trustless manner both to create each notarization and to write it to the chosen PoW network (Bitcoin). Frequency varies between two to six notarizations per hour, and the yearly cost to perform this service is ~180 BTC. Funds for this service were raised as a part of our initial Komodo ICO, and our holdings allow us to continue this method for many years before we will be required to implement a business model to replenish our reserves.

With our dPoW mechanism, each confirmation on the chosen PoW network is also a confirmation of the entire Komodo ecosystem’s history. The only sacrifice that is made is the time it takes to push the Komodo ecosystem’s records into the protection of the main hash rate. For this reason, we name our consensus mechanism, "delayed Proof of Work" (dPoW).

Our consensus mechanism is designed to keep the advantages provided by the PoW system, circumvent the excessive financial and eco-unfriendly overhead costs, and avoid the security risks found in a PoS system. We accomplish these measures by several means. The most important measure is that all actions a notary node takes are publicly verifiable, and the Iguana Core software running on the users’ machines verifies notary nodes’ actions. The notary nodes themselves are not arbiters of "truth."

Therefore, the only type of "false" behavior a malicious notary node can perform is to withhold notarization. There are sixty-four notary nodes. The minimum number of notary nodes required to maintain the Komodo ecosystem is thirteen. Thus, a malicious actor would have to compromise fifty-one notary nodes to shut down the Komodo ecosystem. Such an action would be uneconomic, as this would be destroying the access to the financial rewards a notary node receives for performing its duties. By this design, notary nodes have only one economically favorable position: to properly transfer the records of the Komodo ecosystem into a secure location and to increase Komodo’s market share and value.

For the average user, when performing a trade of goods and services where security is desired, the user simply needs to wait until the notarization process is complete.  After the notary nodes are finished, the only way to break the security protecting their transaction history requires breaking the security of the chosen PoW network (Bitcoin). The Iguana Core code running in the main Komodo software automates the verification process. Entrepreneurs and developers should be aware of this information as they design business models and services for their users.

Thus, Komodo’s dPoW consensus mechanism maintains the security innovated by Satoshi Nakamoto, and because it enables the Bitcoin hash rate to serve more independent blockchains than just the single Bitcoin blockchain, dPoW even expands on Nakamoto’s original design.

## The Notarization Process

#### Step One: Gathering the Appropriate Data

The process of notarization is simple. Roughly every ten to twenty-five minutes, notary nodes perform a special block hash mined on the Komodo blockchain and take note of the overall Komodo blockchain "height" (i.e. the number of total blocks in the Komodo blockchain since inception). The notary nodes process this specific block in such a manner that their signatures are cryptographically included within the content of the notarized data.

[<i>All examples herein are estimated based off an actual KMD notarization to the BTC network, linked here.</i>](https://www.blocktrail.com/BTC/tx/313031a1ed2dbe12a20706dff48d3dffb0e39d15e3e4ff936d01f091fb3b8556#tx_messages)

The pieces going into the notarization process could look like this:

##### The Block Hash

```bash
0a88371cc63969d29492110592189f839557e606db6f2b418ecfe8af24451c07
```

This is the "block hash" from the KMD blockchain—mined and cryptographically signed by the notary nodes

##### Block 607240

This is the blockchain "height" of the Komodo blockchain at the time of notarization (i.e. the total number of KMD blocks ever created)

##### KMD

The letters "KMD" are added into the notarization mixture to indicate the name of the blockchain to which this notarization belongs


#### Creating a Notarization

The notary nodes will take these three pieces of information and compress them into a format that is more computer-friendly. The result will look like this:

```bash
6a28071c4524afe8cf8e412b6fdb06e65795839f189205119294d26939c61c37880a084409004b4d4400
```

The above number can be said to be a cryptographic representation of all that has happened on the Komodo blockchain up to this point in time. According to the Cascade Effect, were an attacker to attempt to go back in the history of the Komodo blockchain and change even a single character of data, and then perform the same hashing formulas in the Komodo code, the number above would dramatically change.

This makes the notary nodes’ notarization a useful backup, assuming this number is in a safe location where anyone on the Internet can view and verify it. It enables a single surviving copy of the "true" Komodo main chain to identify itself to the rest of the Komodo network, as only the "true" data can produce the same result.

On the other hand, an incorrect history of the Komodo network will not be able to produce the same notarization. Through the automation in the Iguana Core software that underlies the Komodo ecosystem, all users will align with the "true" blockchain history and ignore any malicious actors’ "false" attempts.

#### Step Two: Notarizing the Data to a Secure Location

Naturally, for security purposes this number cannot simply be saved to one person’s local computer, or be written down on a piece of paper. Were the number to be in such a centralized location, a would-be attacker could simply destroy the backup, or replace it with a "false" version.

For the number to be useful, it must be placed in a secure and decentralized location. Here is where Komodo adopts security from another network: Komodo will perform a simple transaction in which it writes the above number into the data history of the strongest PoW blockchain (currently Bitcoin). This location is as secure as the miners’ hash rate makes it, and the location is decentralized, by nature.

To place this information in the accompanying PoW network, the notary nodes will use a feature that exists at the core of the Bitcoin protocol when making a transaction.  The feature is called "OP_RETURN," and it allows for a message to be added to the blockchain, permanently, as a part of performing a transaction.

A notable use of the ability to write messages to a PoW blockchain is found in the first actions of Satoshi Nakamoto himself (themselves). In the first Bitcoin block ever mined, Satoshi used a feature like OP_RETURN to include this [message](https://en.bitcoin.it/wiki/Genesis_block):

```bash
03-Jan-2009 Chancellor on brink of second bailout for banks
```

::: tip

Nakamoto used a feature called "coinbase," which is similar to OP_RETURN. A primary difference between coinbase and OP_RETURN is that coinbase is used by miners when mining a block, whereas OP_RETURN can be used by any user when performing transactions.

:::

Readers who have downloaded the Bitcoin blockchain to their local computer, and who possess the knowledge necessary to inspect the raw Bitcoin data, can discover these very words written to their own hard drive. The important thing to understand for our discussion is that any message written to a secure and decentralized PoW blockchain is viewable and verifiable to all.

The permanence and security of OP_RETURN messages are a core aspect of dPoW’s security. In the event of a powerful attack on the Komodo network, there need be no argument over the correct notarized marker upon which the ecosystem members should rely. The Iguana Core code running at the heart of each user’s Komodo software can continue securing, decentralizing, and distributing the accurate version of the Komodo history as though the attack never occurred.

#### Step Three: Notarizing the PoW Network Information Back to the KMD Main Chain

One final step remains to complete the loop of security between the KMD main chain and the chosen PoW network. The KMD blockchain must record within its own records the specific location where it placed this backup into the PoW blockchain.  This enables the Iguana Core software to identify the location of the most recent notarization.

To create this reminder, the notary nodes will now gather one more piece of information, this time drawn from the accompanying PoW network: the transaction hash (txid) identifying the location of the first notarization. This information could look like this:

```bash
313031a1ed2dbe12a20706dff48d3dffb0e39d15e3e4ff936d01f091fb3b8556
```

The notary nodes will combine it with all the information that has come before. The result will be transformed, again, into a computer-friendly version:

```bash
6a28071c4524afe8cf8e412b6fdb06e65795839f189205119294d26939c61c37880a0844090056853bfb91f0016d93ffe4e3159de3b0ff3d8df4df0607a212be2deda13130314b4d4400
```

This number is a compressed cryptographic representation of everything that has happened in the Komodo ecosystem up to this point in time. The notarization is placed as a transaction message directly into the KMD main chain itself. It enables the Komodo ecosystem to know how to find a reference of its own history.

As each notarization is built upon all the notarizations that came before, Iguana Core does not need to monitor each notarization. Rather, it only needs to observe the most recent iteration. This is favorable for Komodo security, as there is always a possibility that the chosen PoW network (Bitcoin) could fail. In this event, the notary nodes would place their next notarization in a competing PoW network (such as Bitcoin Cash) and the entire Komodo ecosystem would remain secure. The notarizations in the failing PoW network would no longer be required to verify ecosystem accuracy.

## Understanding Security and Economic Incentives

The nature of mining in the Komodo ecosystem serves as an incentive to motivate the notary nodes to perform their job well. This setup is also a principle method by which the Komodo ecosystem dramatically reduces the overhead costs necessary to function. Portions of the mining rewards are available not just to the notary nodes, but also to all members of the Komodo ecosystem, through various means.

The Komodo network on a surface-level is a minable network, like other PoW networks. Any technically savvy user can activate a device capable of mining the Komodo network, and thereby process users’ transactions, mine blocks, and receive rewards. For these miners, the Komodo protocol functions in almost the exact same manner as the Bitcoin blockchain’s mining rewards function.

Understanding the similarities will explain to the reader the motivations for the notary nodes and other Komodo miners to secure the Komodo network. The differences, on the other hand, are explained in [Part V](./chapter8.md) of this paper. <i>(See the section regarding the 5.1% rewards allocated to all users who hold at least 10 KMD in their wallet address. This 5.1% reward is given to users out of the funds that would normally be given to a Bitcoin miner as a method of minting new Bitcoin coins.)</i>

#### "Easy Difficulty" in dPoW: The Key to Notary Nodes’ Financial Incentives

The foundational similarity to understand is that with each block header, clues are provided for miners to find the next valid block hash. The specific clue, "difficulty," changes with each block header.

Under normal circumstances on a PoW blockchain, with each block header the difficulty level can change. The Bitcoin protocol itself decides what the difficulty for the next valid block should be.

The difficulty is decided based on the amount of overall hash power mining the network. If many miners are active, then the hash rate is high, and the Bitcoin protocol sets the difficulty to a higher number. On the other hand, if the hash rate is low, then the protocol sets the difficulty to a lower number.

Recall that the "difficulty" level determines the number of zeros at the beginning of the next valid block hash. The more zeros at the beginning of a valid block hash, the more unlikely each attempt at finding a valid block hash will be.

When the Bitcoin protocol was in its infancy, the difficulty setting was easy. In fact, the block hash we used earlier as an example is, in truth, the very first block hash ever created—by Satoshi Nakamoto himself (themselves).

```bash
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

He (they) designed the difficulty setting to encourage the network to find new block hashes once every ten minutes, on average.

For a computer, to guess within ten minutes a nonce that will produce a block hash beginning with ten zeros is relatively easy. It is so simple, in fact, no special computer is required. Early Bitcoin miners could use nothing more than the average desktop machine, having the CPU—the small heart of the computer—performing the calculations.

As more miners joined the network, however, the Bitcoin protocol automatically increased the difficulty. This maintained the speed at which the pool of all miners discovered new blocks, despite the increased size of the pool. Stabilizing the speed created several benefits, including an amount of economic predictability upon which users can rely.

Today, at Bitcoin’s current level of overall hash power, a valid block hash requires a much higher level of difficulty. Here is a recent successful block hash:

```bash
0000000000000000002d08398d6f21f038019600266b419bad5ab88add5b638d
```

There are seventeen zeros, and to find a valid block hash at this level requires a prodigious effort.

In the race to win blockchain rewards, miners all over the world have built entire farms of specialized equipment for mining. The small CPU of a desktop is no longer useful, and the time of "easy difficulty" on Bitcoin has passed.

#### The dPoW System has Sixty-Four Elected Notary Nodes

Here is where our dPoW consensus mechanism diverges from the Bitcoin protocol’s limitations. In addition to performing the notarizations of the Komodo ecosystem, notary nodes are also a special type of blockchain miner. They have a certain feature in their underlying code that both enables them to maintain an effective and cost-efficient blockchain ecosystem and provides the notary nodes with a financial incentive. The combination of benefits prevents the Komodo ecosystem from falling into the trap of directly competing with other PoW networks for hash-rate security status.

#### Each Notary Node Gets One Chance Per Every Sixty-Five Blocks to Mine on Easy

Each individual node periodically receives the privilege to mine a block on "easy difficulty." In other words, while the rest of the miners in the Komodo ecosystem are mining at a calculated difficulty level, the notary nodes occasionally receive the chance to mine as though they are alone on the network.

The notary nodes’ "easy difficulty" setting operates in a cyclical manner, with each notary node on its own cycle. At the start of the cycle the notary node holds the "easy difficulty" ability until it mines one "easy" block. Then the Iguana Core code removes the ability for the next sixty-four blocks. After the sixty-four-block period passes, the notary node can once again attempt to capture a block on "easy difficulty."

Therefore, while everyone else on the network mines at an adjustable level of difficulty according to the normal PoW consensus mechanism (which keeps the overall speed of the Komodo network stable) the notary nodes have a chance to step outside the normal rules. For every sixty-five-block period on the Komodo blockchain, the odds that a block will be mined by a notary node, as opposed to a normal miner, are essentially 3:1.

Since the rest of the miners have an adjustable difficulty ratio, it does not matter how many more miners attempt to mine Komodo. Most of the valid blocks will always be found by the sixty-four elected notary nodes, even were the entire hash power of the Bitcoin network to switch all its attention to mining Komodo.

The mining rewards that a notary node receives through this feature are ~50 KMD per day. This reward occurs regardless of KMD’s popularity, market value, or even of the competition from normal KMD miners. The reward notary nodes receive creates an economic incentive for each party controlling a notary node to support and protect the Komodo ecosystem, and to increase the relative value of this daily ~50 KMD reward.

## Komodo’s Protective Measures in Action

There are myriad ways that an attacker can assail a blockchain project, and the Komodo ecosystem is well prepared. In this foundational paper, we only discuss two of the most crucial attacks—the 51% Attack and the Genesis Attack.

In a separate technical whitepaper, written by our lead developer, we provide several more discussions on how Komodo responds to many other forms of attack.

Some mentioned therein include the Sybil Attack, the Eclipse Attack, and more. We encourage any reader searching for information about the deepest levels of Komodo security not only to read the accompanying whitepaper, but also to reach out to our team directly.

::: tip Note (2019)

The whitepaper referred to above was written in ~2016 and is now obsolete, and therefore is no longer posted here. Please reach out to our team directly for a copy, if interested.

:::

#### Notarizations Provide a Defense Against Both the 51% Attack and the Genesis Attack

By relying on the notarizations in the chosen PoW network’s hash rate (Bitcoin), users in the Komodo ecosystem are well protected from both the 51% Attack and the Genesis Attack. Recall that in a 51% Attack, the attacker first makes a transaction and then erases it by providing 51% of the total hash rate to a "false" blockchain where the transaction never occurred. In the Genesis Attack, the attacker recreates the genesis block of a blockchain and mines an entirely false history. For either of these attacks to play any part in the Komodo ecosystem, the successful attack would have to destroy every transaction at every level it is recorded.

First, let us consider the implications of the notarization process provided against the Genesis Attack. Once an independent blockchain has even just a single transaction pushed through the notarization process into the chosen PoW network, that notarization protects against the Genesis Attack. To successfully complete a Genesis Attack against a Komodo-built blockchain, the attacker would have to destroy the chosen PoW network’s records from that moment going forward. The attacker would also have to destroy the KMD main chain from that moment forward, and the entire independent Smart Chain. The likelihood of achieving this task is effectively as probable as performing a Genesis Attack on the chosen PoW network itself.

The Komodo ecosystem is also well protected against the 51% Attack, so long as users wait for a desirable number of notarizations. Consider a transaction that is recently performed on a Smart Chain in the Komodo ecosystem. While the notary nodes have not yet notarized the transaction into the KMD main chain, then it is plausible that during this approximately ten-minute period an attacker could successfully perform a 51% Attack on this transaction. The attacker would simply make a transaction, and then provide 51% of the total hash rate to a "false" version of the independent Smart Chain to erase the transaction. Therefore, users should always wait until they receive at least one notarization to the KMD main chain before considering any transaction final.

::: tip Update 2019

Additionally, Komodo's new (2019) Antara Framework provides additional options that allow Smart Chain users to greatly reduce the required wait time for notarizations. In some instances, the wait time can be effectively eliminated.

An introduction to the Antara Framework is discussed [in this linked Core Technology Discussion section.](../../../basic-docs/start-here/core-technology-discussions/antara.html#introduction)

On the other hand, for the full Antara documentation, [click here](../../../basic-docs/antara/introduction-to-antara.html)

:::

Once the transaction reaches the KMD main chain, at this point, the attacker would have to successfully perform the 51% Attack against both the KMD main chain and the independent Smart Chain. This is already quite difficult to achieve, as it would require overcoming the notary nodes and other KMD miners, while simultaneously attacking the independent chain. Entrepreneurs, developers, and users should decide for themselves how much trust they wish to place in the system at this point of the notarization process.

When considering large sums of money, the need for protection grows. A large sum of money can be both a single large transaction, or it can be the collective value of many small and normal-sized transactions that build up over hours, days, and years. These transaction histories need protection against the sophisticated blockchain attacker. It is for this reason that the notarization process exists.

Once the notary nodes have pushed the most recent version of the Komodo ecosystem’s history into the chosen PoW network (Bitcoin), the entire ecosystem relies only on that notarization as the arbiter of truth. All transaction records that have been pushed into the chosen PoW network can only be rescinded by altering the chosen PoW network itself (while simultaneously altering the histories of the KMD main chain and the independent Smart Chain). Accomplishing such a task is highly improbable (though we warn the reader never to consider any attack impossible).

Therefore, any record that has been on the Komodo main chain for at least one notarization has a fortress of hash rate and other security measures at its guard. So long as users and developers are mindful to wait for the desired number of notarizations to secure their payments, both the 51% Attack and the Genesis Attack are highly unlikely either to be successful, or to provide economic value to the would-be malicious actor.

Nevertheless, we remind all users of our ecosystem to consider their own vigilance and mindfulness as the most effective protection against the would-be attacker. Users, entrepreneurs, and developers utilize all aspects of the Komodo network at their own risk.

#### Considering an Attack on the Notarization Process

To create a notarization for the KMD main chain, the minimum number of notary nodes required is 13. If the notary nodes themselves come under attack and must work to maintain access to the Internet, just 13 of the full 64 are required for the Komodo ecosystem to continue its operations.

In the possible event of a disconnect from the minimum number of notary nodes, chains in the Komodo ecosystem should simply be on the alert. Users, developers, and entrepreneurs would simply need to wait for the notary nodes to regain access to the Internet and resume the notarization process before considering any transaction final.

For this reason, the position of a notary node is held with high importance, and the parties which gain these positions are measured foremost by their Information Technology experience and capabilities. Komodo stakeholders are responsible to vote for candidates that are the most qualified to perform in the notary-node duties.

## The dPOW Consensus Mechanism is Inherent in all Komodo Smart Chains

These security features extend to any Smart Chain relying on the notarization process. The primary difference between a Smart Chain and the main chain is that the main chain notarizes to an exterior PoW network (Bitcoin), whereas the Smart Chain notarizes to the KMD main chain.

The notarization for the Smart Chain is performed by the notary nodes as a service to the independent developer and entrepreneur. Notary nodes create a notarization of the Smart Chain and write it into the KMD main chain. Then they write their actions into the Smart Chain itself. This allows Iguana Core (running at the heart of the Smart Chain) to identify where its most recent notarization can be found. The notarization process cycles every ten minutes, assuming the Smart Chain’s network is consistently active. If the network has periods of inactivity, the notary nodes halt the process (to save against unnecessary notarization costs) and reactivate as soon as new transaction activity appears on the Smart Chain’s network.

There is also a difference in the number of notary nodes required to notarize a Smart Chain as compared to the KMD main chain. Whereas with the KMD main chain 13 notary nodes are required, only 11 notary nodes are required to notarize a Smart Chain. This difference is based on the underlying math that ensures that the number of Smart Chains in the Komodo ecosystem can scale into the tens of thousands.

We invite the reader to consider the fact as each Smart Chain can support thousands of transactions per minute, this makes the combined ecosystem capable of supporting millions of transactions per minute. This includes cross-blockchain interoperability, via our atomic-swap powered technology and our Antara Framework. This makes Komodo among the most scalable of financial-technology solutions in existence, and capable of competing with the transaction volumes of fiat networks.

Naturally, as each level of notarization takes time to perform, there is an additional delay for Smart Chains as compared to the KMD main chain. A Smart Chain’s history is notarized into the KMD main chain approximately every ten minutes, assuming constant activity. This notarization will then be pushed through the notarization process into the chosen PoW network (Bitcoin). We estimate that a transaction performed on a Smart Chain will receive the KMD main chain’s protection within approximately ten minutes, and will receive the Bitcoin hash rate’s protection in approximately twenty to thirty minutes.

Another difference between the KMD main chain and a Smart Chain is that the notary nodes only mine the KMD main chain. Asset-chain developers are responsible to create any required network of miners to process their Smart Chain’s transactions.  This does not need to be a full network of mining farms, such as those in Bitcoin.  Rather, it only needs to be enough computing power to process transactions, and to provide any desired level of hash-rate security to cover the ten-minute waiting period. For a small business with intermittent periods of transaction activity, a single, dedicated, full-time server may be enough. Larger businesses can scale as desired and can also work to attract a network of freelance miners.

It is also possible that a network of freelance miners will naturally arise within the Komodo ecosystem, to observe and manage transaction-processing services wherever and whenever they are required, through automation.

This setup dramatically reduces the overhead costs and effort the entrepreneur and developer would otherwise have to allocate to a network of high-hash rate miners.  These freed resources of the entrepreneur and developer can therefore be allocated to other uses in their business models.

The total yearly cost for the Komodo notary nodes to notarize the KMD main chain into the currently chosen PoW chain, Bitcoin, is approximately ~180 BTC/year (a value of ~\$1.5M USD at the time of the writing of this paper). Funding for the notary nodes to perform this service was raised during the Komodo ICO, and current BTC holdings give us many years to come before we will be required to implement any business models to replenish our BTC funds.

On the other hand, the total cost for the Smart Chain developer to notarize their independent chain into the KMD main chain is but a fraction of the cost. This security mechanism is not limited to Smart Chains created within the Komodo ecosystem. In fact, Komodo’s Blockchain Security Services are available to any existing blockchain. With Komodo, any blockchain can be protected with the power of the Bitcoin hash rate for a tiny percentage of the cost.

Thus, an entrepreneur in our ecosystem can have their own independent blockchain that is backed up by the hash rate of the Bitcoin mining network, at only a fraction of the cost. In the following sections, we discuss the formation of a new Komodo Smart Chain, the method of distribution and trading using our atomic-swap technology, AtomicDEX, and our "smart contract" like technology, the Antara Framework.

