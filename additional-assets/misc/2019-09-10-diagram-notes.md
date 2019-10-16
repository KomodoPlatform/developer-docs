## Page 1

#### Important Concept

Convey the idea of "decentralized software."

A blockchain is software that is installed the same way on each machine, but the software itself cannot run on one machine alone. The software exists across at least two or more machines (preferrably millions of machines), that are each connected.

The software is a composite of many small instances of the software all working together in coordination.

## Page 2

#### Important Concept

Each node on the network must have the exact same data (all of it, no matter how large).

This is fine as long as everyone agrees with each other, but what happens when one node on the network is (temporarily) different from another node when managing recent transactions?

The software has many pieces to it, including scripts that manage transactions, a database that stores data, and more. 

The most crucial piece of the software is called the "consensus mechanism," and this is the piece of the software that deals with disagreements.

## Page 3

On the Bitcoin network, at any given moment, there are thousands of nodes making and verifying transactions.

Let's say that a node accidentally creates two transactions that conflict with each other. One of the transactions sends money that benefits one group of nodes, and the other transaction sends the same money to benefit another group of nodes.

The transactions are already made, and the two different groups have no financial incentive to come to an agreement, as one side stands to lose money from the outcome, no matter what.

This is a solution for the consensus mechanism.

## Page 4

The consensus mechanism keeps the transactions on separate tracks. One track has the transaction that benefits group 1, the other track has the transaction that benefits group 2.

The consensus mechanism then allows for a competition. Whichever group of nodes can verify their version of history faster than the other will win, and the group will have their track erased.

The two groups compete with their computer machines to perform all the calculations, and whichever is fastest wins.

All of the machines across the network will automatically follow this conclusion from the consensus mechanism, and in this manner the network as a whole rapidly comes to a conclusion over this disagreement. 

The consensus mechanism is what allows for this decentralized network to manage a complex history of transactions, where disagreements would otherwise cause a failure.

## Page 5

This is all very well, so long as everyone on the network is acting as a normal, honest person. From time to time, there may be small disagreements, but nothing that would threaten the network as a whole.

However, what happens if there is someone on the network who would like to take advantage of the entire system?

Let us assume that this person has a lot of resources and computing power with which to attack.


## Page 6

To conduct their attack, the attacker first sends some money on the network to an unsuspecting victim, with the intent to buy something from them that exists in another environment.
 
For example, the attacker could wish to purchase a separate blockchain currency -- one that is not connected to this network's consensus mechanism.

Or, the attacker could wish to purchase a real world item, such as food or fiat money, or anything else, so long as that item is separate from this blockchain.

## Page 7

The attacker waits until the intended victim sends the attacker the item of value.

## Page 8

Once the attacker has the stolen goods, they activate their powerful computer hardware. They use this computer hardware to support a version of the blockchain's history wherein their transaction never took place.

They support this malicious version of the history until enough time passes that fixing the blockchain is impossible. All of the nodes on the network will, eventually, support the version of history that is validated the fastest. Once all the machines on the network switch, the funds in the victim's hands disappear. 

The attacker keeps both the off-blockchain goods that they stole from their victim, and the funds that would otherwise be sent to the victim as compensation.

This is called a "51% Attack," because the attacker must provide the majority of computer power to the network for it to work.

## Page 9

The only way to defend against a 51% Attack is to have a blockchain network that is so large, an attacker cannot feasibly attack the network. 

The computer power supporting a blockchain network is called "hash power." This names comes from the encryption "hashes" that are created by the validating nodes while performing the necessary encryption calculations.

This is a principle reason why Bitcoin is considered valuable -- it has the largest network of miners.

## Page 10

A large network provides defense against an attack, but a network can only grow so large before the laws of physics slow it down. 

Remember, every full node on the network must have all of the data downloaded, and all validating nodes must validate every update to the network. As the network grows ever larger, eventually the data and speed of the network begin to become cumbersome. 

This is where Komodo comes into play.

## Page 11

Komodo is designed to not compete against Bitcoin for hash rate. 

Instead, Komodo relies on Bitcoin's hash rate. Every ten to twenty minutes, Komodo makes a hash of its own history. This hash represents the entire history of the Komodo ecosystem, up to that point in time. 

Komodo writes this hash into the Bitcoin blockchain, and then the Komodo consensus mechanism relies on that hash in the Bitcoin network to settle all disagreements on the Komodo network.

## Page 12

Likewise, Komodo endows this same service onto Smart Chains. 

Smart Chains create hashes of their own histories and write them into Komodo, and from that point forward the Smart Chain considers all transactions older than the most recent hash to be entirely "settled."

These hashes are taken into an account when Komodo makes a hash of the entire ecosystem's history and writes that hash into Bitcoin. Therefore, the Smart Chain's histories are protected by Bitcoin, just as Komodo is protected by Bitcoin.

## Page 13

A utxo is like a digital dollar bill in a digital wallet. 

The utxo can be split into new utxos only when it is in the process of being spent and confirmed by the consensus mechanism. 

## Page 14

Within the Bitcoin software, there are several important components. Those include the consensus mechanism, the ability to store data, and many more.

One key component is the ability to execute a script to perform a transaction.

There are three main scripts that support the Bitcoin blockchain. (One is a regular transaction, another is a quantum-proof transaction, and another is a multi-key transaction that allows for multiple to manage the same funds.)

These three scripts account for the overwhelming majority of all transactions on the Bitcoin blockchain, where the scripts manage the movement of funds passing as utxos from one digital wallet to the next.

## Page 15

The Komodo software allows for a fourth type of script, and it is the source of the power and flexibility of the Antara Framework.

This type of script can be executed on the main Komodo chain, KMD, or on a Smart Chain.

Adding this fourth script to Komodo and to Smart Chains is easily possible, because of the way our framework functions and the nature of application-specific blockchains. Bitcoin, on the other hand, does not current have the ability to support this fourth type of script, because of the nature of its community and use case. 

## Page (16)

The fourth script of the Antara Framework is powerful because it allows for a developer to add arbitrary code that will be managed and executed by the Smart Chain's consensus mechansim.

This means that a developer can make a utxo do far more than the three simple transactions available on the Bitcoin blockchain. In fact, the developers can make the utxos perform any imaginable task, so long as the transactions associated with the fourth script can successfully fulfill the requirements of the consensus mechanism.

This grants powerful "smart contract" like capability to a developer, and also gives the developer access to tools and security features that are not available on other common "smart contract" blockchain platforms.


