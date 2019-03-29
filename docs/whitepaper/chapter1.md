# A Foundational Discussion of Blockchain Security

Komodo’s form of providing security is called Delayed Proof of Work technology
(dPoW). It builds on the most advanced form of blockchain security in existence,
Proof of Work technology (PoW). The latter form of security is the method that the
Bitcoin network utilizes. To understand the value of Komodo’s dPoW security, we
must first explain how PoW works and why it is the most secure method of maintaining a decentralized blockchain. We must also examine PoW’s shortcomings, so
that we may understand the need for Komodo’s dPoW method and the advantages
it provides to the blockchain community.

To understand how PoW technology functions, we begin by explaining the roots
that make the Bitcoin protocol a viable means of securely transferring value.

## What Is A Consensus Mechanism?

### The "Double Spend" Problem

The creation of blockchain technology stems from the early mathematical studies
of encryption using computer technology.

One such example is related to the information-encoding device, "Enigma," invented by the Germans at the end of World War I. Alan Turing, a British Intelligence agent, famously beat the Enigma device by inventing the world’s first "digital computer." This provided enough computing power to break [Enigma’s](https://en.wikipedia.org/wiki/Enigma_machine) encryption and discover the German secret communications.

This early affair with encryption set off a race throughout the world to develop
myriad forms of securely transferring information from one party to another via
computer technology. While each new form of computer encryption provided more
advantages, there remained one problem that prevented encryption from being useful
as a means of transferring not just information, but also financial value.

This challenge is known as the "Double Spend" problem. The issue lies in the ability
of computers to endlessly duplicate information. In the case of financial value, there
are three important things to record: who owns a specific value; the time at which the person owns this value; the wallet address in which the value resides. When
transferring financial value from one person to another, it is essential that if Person A
sends money to Person B, Person A should not be able to duplicate the same money
and send it again to Person C.

The [Bitcoin protocol](https://en.wikipedia.org/wiki/Bitcoin_network), invented by an anonymous person (or persons) claiming the
name of Satoshi Nakamoto, solved the Double Spend problem. The underlying math
and computer code is both highly complex and innovative. For the purposes of this
paper we need only focus on the one aspect of the Bitcoin protocol that solves the
Double Spend problem: the consensus mechanism.

### The Consensus Mechanism Provides Security Against a "Double Spend"

The consensus mechanism created by Nakamoto is perhaps one of the most powerful innovations of the twenty-first century. His invention allows individual devices to
work together, using high levels of encryption, to securely and accurately track ownership of digital value (be it financial resources, digital eal estate, etc.). It performs
this in a manner that does not allow anyone on the same network (i.e. the Internet)
to spend the same value twice.

Let us suppose a user, Alice, indicates in her digital wallet that she wants to send
cryptocurrency money to a friend. Alice’s computer now gathers several pieces of
information, including any necessary permissions and passwords, the amount that
Alice wants to spend, and the receiving address of her friend’s wallet. All this information is gathered into a packet of data, called a "transaction," and Alice’s device
sends the transaction to the Internet.

There are several types of devices that will interact with Alice’s transaction on
the Internet. These devices will share the transaction information with other devices
supporting the cryptocurrency network. For this discussion, we need only focus on
one type of device: a cryptocurrency miner.

::: tip Note
The following descriptions are simplified explanations of a truly complex byzantine process. There are many other strategies cryptocurrency miners devise to out-mine their competition, and those strategies can vary widely.
:::

### A Miner Competes to Add Blocks to the Network’s History, in Exchange for a Reward

#### Step One: Preparing the Preliminary Information

This device is performing an activity called cryptocurrency "mining." Let us focus
now on a mining device that captures Alice’s raw transaction data. This device is
owned by a tech-savvy miner, named Bob, who wants to add Alice’s transaction to
the permanent history of the Bitcoin network.

If Bob is the first person to properly process Alice’s transaction he will receive a
financial reward. One key part of this reward is a percentage-based fee, taken from
Alice’s total transaction amount.

#### The Mempool is the Collection of All Raw Transactions Waiting to be Processed

Furthermore, Bob does not have just one transaction alone to mine. Rather, he has
an entire pool of raw transactions, created by many people across the Internet. The
raw data for each of these transactions sits in the local memory bank of each miner’s
mining device, awaiting the miner’s commands. Miners call this pool of transactions,
the "mempool." Most miners have automated systems to determine the transaction-
selection process, based on estimated profit.

#### Creating Transaction Hashes

After Bob makes his choices about which transactions he will attempt to mine (and
we assume that he includes Alice’s transaction), Bob’s mining device then begins a
series of calculations.

His device will first take each individual transaction’s raw data and use mathematical formulas to compress the transaction into a smaller, more manageable form. This
new form is called a "transaction hash." For instance, Alice’s transaction hash could
look like this:

```bash
b1fea52486ce0c62bb442b530a3f0132b826c74e473d1f2c220bfa78111c5082
```

Bob will prepare potentially hundreds of transaction hashes before proceeding to
the next step.One important thing to understand about the compression of data in
the Bitcoin protocol, including the transaction hash above, is that calculations herein
obey a principle called, The Cascade Effect.

#### The Cascade Effect: Changing One Bit of Data Changes the Entire Result

The Cascade Effect simply means that were Bob to attempt to change even the
smallest bit in the raw data—whether from a desire to cheat, or by mistake, or for
any other reason—the entire transaction hash would dramatically change. In this
way, the mathematical formulas in the Bitcoin protocol ensure that Bob cannot create
an improper history.

Were Bob to attempt to create an incorrect transaction hash, other miners on the
network could use the raw transaction data from Alice, perform the proper mathematical formulas in the Bitcoin protocol, and immediately discover that Bob’s hashes are
incorrect. Thus, all the devices on the network would reject Bob’s incorrect attempts
and prevent him from claiming rewards.

#### Step One Continued: Finishing the Preliminary Calculations

Now, using more mathematical formulas, Bob takes the transaction hashes he is
attempting to process and compresses them into a new manageable piece of data.

This is called, "the merkle root." It represents all the transactions that Bob hopes to
process, and from which he hopes to gain a reward. Bob’s merkle root could look like this:

```bash
7dac2c5666815c17a3b36427de37bb9d2e2c5ccec3f8633eb91a4205cb4c10ff
```

Finally, Bob will gather information provided from the last miner that successfully
added to the permanent blockchain history. This information is called, "the block
header." It contains a large amount of complex data, and we won’t go into all the
details. The one important element to note is that the block header gives Bob clues
about how to properly add the next piece of information to the permanent Bitcoin
history. One of these hints could look like this:

```bash
"difficulty" : 1.00000000
```

We will return to this clue further on.

Having all this information, Bob is nearly prepared. His next step is where the real challenge begins.

#### Step Two: The Race to Finish First

Bob’s computer is going to gather all the above information and collect it into a
set of data called a "block." Mining this block and adding it to the list of blocks that
came before is the process of creating a "chain" of blocks—hence the industry title,
"blockchain."

However, adding blocks to the blockchain is not so easy. While Bob may have
everything up to this point correctly prepared, the Bitcoin protocol does not yet give
Bob the right to add his proposed block to the chain.

The consensus mechanism is designed to force the miners to compete for this right.
By requiring the miners to work for the right to mine a new valid block, competition
spreads across the network. This provides many benefits, including time for the trans-
actions of users (like Alice) to disseminate around the world, thus providing a level
of decentralization to the network.

Therefore, although Bob would prefer to immediately create a new valid block and
collect his reward, he cannot. He must win the competition by performing the proper
work first. This is the source of the title of the Bitcoin-protocol consensus mechanism,
"Proof of Work" (PoW).

The competition that Bob must win is to be the first person to find an answer to
a simple mathematical puzzle, designed by Satoshi Nakamoto. To solve the puzzle,
Bob guesses at random numbers until he discovers a correct number. The correct
number is determined by the internal complex formulas of the consensus mechanism
and cannot be discovered by any means other than guessing. Bitcoin miners call this
number a "nonce," which is short for "a ‘number’ you use ‘once.’"
Bob’s mining device will make random guesses at the nonce, one after another,
until a correct nonce is found. With each attempt, Bob will first insert the proposed
nonce into the rest of his block. To find out if his guess is correct, he will next use
mathematical formulas (like those he used earlier) to compress his attempt into a
"block hash."
A block hash is a small and manageable form of data that represents the entire
history of the Bitcoin blockchain and all the information in Bob’s proposed block. A
block hash can look like this:

```bash
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

Recall now The Cascade Effect, and how it states that changing one small number in
the data before performing the mathematical computations creates a vastly different
outcome.
Since Bob is continually including new guesses at the nonce with each computation
of a block hash, each block-hash attempt will produce a widely different sequence of
numbers.
Miners on the Bitcoin network know when a miner, such as Bob, solves the puzzle;
by observing the clues that were provided earlier. Recall that the last time a miner
successfully added data to the blockchain, they provided these clues in their block
header. One of the clues from the previous block header can look like this:

```bash
"difficulty" : 1.00000000
```

This detail, "difficulty," simply tells miners how many zeros should be at the front
of the next valid block hash. When the difficulty setting is the level displayed above,
it tells miners that there should be exactly ten zeros.
Observe Bob’s attempted block hash once again, which he created after making
a guess at a nonce, adding this proposed nonce into his block, and performing the
mathematical formulas:

```bash
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

The block hash above has ten zeros at the beginning, which matches the number of
zeros in the difficulty level.
Therefore, the hash that Bob proposed is correct. This must mean that he guessed
a correct nonce. All the miners on the network can prove for themselves that Bob was
correct by taking all the same information from their mempools, adding Bob’s nonce,
and performing the mathematical calculations. They will receive the same result, and
therefore Bob is the winner of this round.
On the other hand, due to the Cascade Effect, if Bob’s attempted nonce had produced a block hash with the incorrect number of zeros at the front, his block hash would be invalid. The network would not afford him the right to add an incorrect
block hash to the network, and all the miners would continue searching.

#### Step Three: Bob Finds the Nonce

Once a miner discovers a nonce that produces a valid block hash, the miner has
"found a new block," and can send the signal across the Internet. The consensus
mechanism running on every other mining device can verify for themselves the calculations. Once verified, the consensus mechanism grants the miner the right both to
add the proposed block to the blockchain, and to receive the reward.
Let us return to Bob’s machine, having just guessed a correct nonce, and thus holding a valid block hash. Bob’s machine instantly sends out the winning information
across the Internet, and Bob collects his reward from the Bitcoin network.
All the other miners must readjust. Earlier, they were searching for the correct
nonce based off the information from the previous block header. However, Bob’s new
valid block includes a new block header. All the other miners on the network abandon
their current work, adopt Bob’s new block header, make many recalculations in their
underlying data, and begin their search for the next nonce.
There is no sympathy in the Bitcoin protocol for any miner’s wasted efforts. Suppose another machine on the network was also trying to mine Alice’s transaction, and
lost to Bob in the race. Only Bob earns the reward from Alice’s transaction, and the
other miner receives nothing in return for their costs and time.
For Alice, this process seems simple. She first indicated the wallet address of her
friend and sent cryptocurrency. After a certain amount of time, her friend received
the money. Alice can ignore the byzantine process of the miners that occurred between these two events. Alice may not realize it, but the PoW consensus mechanism
provides the foundation of security upon which she relies.
