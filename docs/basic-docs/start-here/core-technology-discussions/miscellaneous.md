# Miscellaneous

## Details Regarding KMD Main Chain


| Circulating Coin Supply:      | \~100000000 |
|-------------------------------|-------------|
| Total Coin Supply (yr. 2030): | \~200000000 |

The foundational coin of the Komodo ecosystem is named after the ecosystem itself, Komodo (KMD).

#### Rewards

Those who hold KMD may earn rewards of up to 5.1% annually. Any wallet address that holds at least 10 KMD is eligible. KMD holders must simply move their KMD once a month—even if the funds are sent back to the same address from which they originated—in order to earn their reward. This reward is built into the core code of Komodo.

The reward comes from an opportunity provided by our unique security system, dPoW. The nature of the reward is rooted in the financial incentive that is typically given to miners on a normal PoW chain. On a normal PoW, when a miner mines a new block, the blockchain mints new coins and delivers them to the miner’s indicated wallet. For instance, on the Bitcoin blockchain, the reward for mining a new block is currently ~12.5 BTC. In dPoW, we do not need to allocate such a high incentive to miners, as we already maintain access to the hash rate of our chosen PoW network, Bitcoin. Therefore, when we created the KMD main chain, we recoded this coin-minting reward to distribute 5.1% annual rewards to all holders of at least 10 KMD.

To earn rewards in the full amount of 5.1%, users must move their funds on the blockchain at least once per month. The reward is calculated as a part of the utxo transfer process. The KMD code only calculates rewards for utxos up to one month, and then stops. By simply sending the full balance of a wallet to the same receiving address, a user can generate a new utxo. In this manner, the user can claim their current rewards, and continue receiving them for at least one month.

The KMD 5.1% reward will continue for a period of approximately twelve to fourteen years. When Komodo’s overall coin supply reaches ~200M, this reward will also discontinue. Specifically, the reward will cease when the KMD chain reaches a block height of 7777777.

Note that no one is forced into using KMD in our ecosystem. We are often asked why we chose this route, as the free nature of the Komodo ecosystem can be in direct contrast to the philosophies of many other ecosystems and exchanges. Other ecosystems often require users to use the developer’s coin.

The reason why we follow a more open practice is that we strive to adhere to the guiding principles of decentralization and open-source technology. We want to create a blockchain platform where people are free to use whatever is most useful for them in their entrepreneurial endeavors. Keeping KMD as an optional element empowers the members of the Komodo ecosystem with freedom.

## The Nature of Privacy Features in the Komodo Ecosystem

##### The Option of Privacy is Essential

One primary goal of the Komodo ecosystem is to provide our users with the highest levels of security. The option to enable oneself with privacy is an inherent part of a strong security system. Privacy empowers users with the ability to make choices without being directly controlled or observed by a third-party actor.

Many of humanity’s most meaningful advancements in art, technology, and other human endeavors began in situations where the creator had the security of privacy in which to explore, to discover, to make mistakes, and to learn thereby.

##### Privacy Issues in Popular Privacy-Centric Blockchains

Across the entire cryptocurrency industry, current pathways to obtain privacy in the blockchain industry have many problems.

One of the most popular methods to obtain privacy is the use of a centralized mixing service. In this process, users send their cryptocurrencies to service providers, who then mix all the participants’ coins together, and return the coins according to the relevant contributions. With this method, the most dangerous issue, among many, is that for the duration of the mixing period users lose control over their currency.  The funds, therefore, are subject to theft and human error.

Other decentralized coin-mixing methods, such as the [coin shuffle,](https://bitcoinmagazine.com/articles/shuffling-coins-to-protect-privacy-and-fungibility-a-new-take-on-traditional-mixing-1465934826/) require coordinating with other human parties. This also introduces the potential for the same issues of theft and human error, and adds yet another risk: the coordination between human parties can result in the disclosure of a user’s privacy.

Some cryptocurrencies support mixing as a part of the normal transaction process out of a desire to provide constant anonymization. Varying methods for randomizing these transaction-mixing patterns exist among the many different brands of relevant cryptocurrencies, and each feature strengths and weaknesses in their approach.

#### Komodo's Approach to Privacy Technologies

The roots of the Komodo ecosystem stem from the seminal work of Satoshi Nakamoto and his Bitcoin protocol. One of the key challenges in this technology is that the original protocol does not make any account for privacy. Therefore, Komodo began not as a fork of the vanilla Bitcoin protocol, but rather as a fork of Zcash. The latter is a privacy-centric fork of Bitcoin, and therefore Komodo inherits technology from both Bitcoin and Zcash by this action. 

The Komodo Smart Chain software, komodod, retains the inherent privacy features of Zcash. These primarily consist of the ability to convert money from a transparent address to a private address, and then to transfer money from one private address to another. When sending money that is already private to an address that is also private, Zcash technology allows the funds to move without leaving a public data trail for later analysis.

This is one of the most powerful forms of blockchain privacy in existence, as the provided privacy is effectively permanent.  

##### Private and Non-Private Addresses

On any privacy-enabled Smart Chain, there are two types of addresses. One is transparent, the other is private.


##### Transparent Addresses

We call a transparent address a "T address." These are fully accessible to the user, and they are the means of conducting normal transactions. All currency entering and leaving a T address is fully visible to the network.

The user must use these addresses for most interactions on-chain, including most, if not all, of the Antara Module transactions, and when using AtomicDEX.

##### Private Addresses

We call a privacy-enabled address a "Z address," as they utilize the Zcash parameters and zk-SNARK technology.

Z addresses often have RPCs that are separate from the RPCs used for T address. For example, [<b>z_gettotalbalance</b>](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#z-gettotalbalance) is separate from [<b>getbalance.</b>](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#getbalance)

The cost of interacting with Z addresses is often higher than the cost of interacting with a T address. This is due to the fact that Z transactions require more block space, due to their demands for increased levels of encryption.

### Method of Moving Funds Privately

There are three types of transactions that can take place in respect to privacy technology.


#### Transparent to Private

-------

<div style="text-align: center;">

<b>T -> Z</b>

</div>

------

A user uses the [<b>z_sendmany</b>](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#z-sendmany) RPC to send funds from a T address to a Z address.

This is <b>not</b> a private transaction. An observer of the blockchain can observe both the T address from which the funds are consumed and the Z address to which the funds are sent.

#### Private to Private

------

<div style="text-align: center;">

<b>Z -> Z</b>

</div>

------

This <b>is</b> a private transaction. Using zk-SNARK technology inherited from Zcash, this transaction moves funds from one address <b>without leaving any data available in the public domain for later observation.</b> 

So long as the user does not reveal any information regarding this transaction, no other party may ever know the amount, specific time, or destination of funds in this transaction. The user may also consider enhancing their privacy through services such as [Tor](https://www.torproject.org/).

All privacy from zk-SNARK technology is derived solely as a part of this type of transaction.

#### Private to Transparent

------

<div style="text-align: center;">

<b>Z -> T</b>

</div>

------

This is <b>not</b> a private transaction. Rather, this is the transaction wherein funds again become public, and therefore usable for services such as a typical Antara Module or an AtomicDEX exchange.

Observers on the blockchain can observe both the Z address from which the funds are consumed and the T address to which the funds are sent.

### Additional Privacy Considerations

Although the anonymization process provides a measure of privacy and may appear to be sufficient, there are still more precautions a user must take. Two main attacks are available to a would-be sleuth.

#### The Timing Attack

In this attack, the sleuth simply studies the time the funds disappear from a T address and looks for funds to appear in another T address soon thereafter. If the privacy-user persistently chooses predictable timing for initiating and completing their transfer of funds from a T address, through a series of Z addresses, and back to a public T address, a determined sleuth may deduce the user's trail of funds.

For effective privacy, the user should wait for other users on the Smart Chain to exercise privacy transactions, and thereby conceal their own privacy behavior. The more users using privacy features, the more private the transactions become.

#### The Knapsack Attack

The Knapsack Attack is similar to the Timing Attack, but as applied to amounts. For example, if there is only one KMD address that sends 1000000 KMD from a T address to a Z address, and later 1000000 KMD emerges from a Z address to a T address, the sleuth can easily discern the user’s trail of funds.

To protect against the Knapsack Attack, users can vary their amount of funds in both `T -> Z` and `Z -> T` transactions.

### A Word on Risks Inherent in zk-SNARK Technology

Zero-knowledge transactions rely on the Zcash parameters as put forth by the Zcash team. The Zcash parameters are a "zero-knowledge" form of technology. This is a powerful form of privacy, and arguably superior to other forms as it is effectively permanent. Relying on the Zcash parameters allows us to turn our creative resources to other blockchain-technology challenges, while still empowering members of the Komodo ecosystem with the option of privacy.

To create the Zcash parameters, the original Zcash developers had to create a series of keys that, when combined, created a master key that could unlock and lock the parameters. After using the master key to create the parameters, the team destroyed every individual key. The team conducted this endeavor in a public manner. We encourage interested readers to view the "Zcash Ceremony" explanation, and to search for other viewpoints as well.

To briefly summarize the security measures, the Zcash team used several layers of protection including: multi-party computation, air-gapped compute nodes, hard-copy evidence trails, a uniquely crafted distribution of the Linux operating system, and the physical destruction of each piece of hardware that held an individual key. The resulting layers of defense would be of the highest level of difficulty for an outsider to penetrate. Furthermore, the method of creation and destruction ensured that the internal security of the project was faultless, so long as at least one member of the entire Zcash team was honest.

By our observation, the team performed this endeavor with sufficient competence and due diligence. Furthermore, given the nature of the project, the longstanding reputation of the Zcash developers, and the modus operandi of their lives’ work, we believe they were properly motivated to perform the creation and destruction in a capable and honest manner.

Nevertheless, there are privacy advocates in the cryptocurrency industry who maintain a degree of suspicion over any project that requires an element of human trust.  This suspicion extends to the Zcash parameters. These observers continually scrutinize the Zcash project, searching for more and more processes by which the creation ceremony could have failed. Yet, while various theories have been put forth, no actual failure in the Zcash parameters has been discovered.

In adopting the Zcash parameters, we receive frequent questions regarding how they affect Komodo-based currency. The answer is that the privacy in the Komodo ecosystem is permanent, regardless of any potential fault by the Zcash team. Furthermore, we can adopt any updates the Zcash team releases to the parameters.

In the unlikely event that someone was able to retain a complete copy of the master key, the only power the holder would have, would be the ability to create new private money in the currency of any Smart Chains utilizing zero-knowledge transactions.

This holder could then shift that value into transparent, spendable money. This could negatively impact any affected Smart Chain's local community, and we would be required to adapt our platform. If a fault in the Zcash parameters were to be discovered, the Komodo team has various contingency methods at our disposal to remove the Zcash parameters and replace them with a new set of parameters.

Though in Komodo we do not see this as a realistic threat, we nevertheless include the information here in our documentation to provide complete transparency for any user who seeks to invest their resources in a privacy-enabled Komodo Smart Chain.

## The Utxo: An Elusive, Yet Fundamental Concept

All Bitcoin-based software relies heavily on a technology called the "utxo," short for Unspent Transaction. This technology was invented in the original Bitcoin protocol. Yet despite the technology's age, even the most active of cryptocurrency users rarely know what utxos are or why they exist.

To better understand utxos, let us first examine the language of a common user when describing how much cryptocurrency money they have and how they perceive those funds. We will therefore need to understand the concept of "satoshis," the way a blockchain handles the collection and distribution of funds, and how we utilize these core technologies when trading on AtomicDEX.

### Comparing the Utxo to Fiat Money

Let us assume a cryptocurrency user, whom we name Charlie, has $10,000 in his physical wallet. Naturally, when Charlie thinks about the amount of physical (or "fiat") money he has, he says to himself, "I have $10,000."

However, there is no such thing as a $10,000-dollar bill. Instead, Charlie actually has a collection of smaller bills stacked together. For instance, he could have a stack of $100-dollar bills, the total of which equals $10,000 dollars.

If Charlie goes to purchase an item that costs $1, and he only has $100-dollar bills in his wallet, to make his purchase he will take out a single $100-dollar bill and give it to the cashier. The cashier then breaks that $100-dollar bill down into a series of smaller bills. The cost for the item, $1, remains with the cashier, and the cashier then provides change—perhaps in the form of one $50-dollar bill, two $20-dollar bills, one $5-dollar bill, and four $1-dollar bills.

Charlie now thinks to himself, "I have $9,999." Specifically, however, he has ninety-nine $100-dollar bills, a $50-dollar bill, two $20-dollar bills, one $5-dollar bill, and four $1-dollar bills.

We emphasize that not only does he not have ten thousand $1-dollar bills, he also does not have one million pennies ($0.01). Furthermore, because pennies are the smallest divisible unit of value in Charlie’s wallet, we could point out that each bill is a collection of its respective units of pennies. For instance, a $1-dollar bill in Charlie’s wallet we could describe as, "a bill that represents a collection of one hundred pennies and their value."

### Understanding Cryptocurrencies and Their Utxos

#### A Satoshi is The Smallest Divisible Unit of a Cryptocurrency

Continuing with our explanation of utxos, we next need to understand the concept of "satoshis." The name "satoshi" is derived in honor of Satoshi Nakamoto, author of the original Bitcoin whitepaper. By convention in the cryptocurrency community, one satoshi is equal to one unit of a coin at the smallest divisible level. For instance, 1 satoshi of Bitcoin is equal to 0.00000001 BTC.

Let us suppose now that Charlie has 9.99000999 BTC (Bitcoin) in his digital wallet. Assuming Charlie correctly understands the concept of satoshis, Charlie could say to himself, "I have nine hundred and ninety-nine million, nine hundred and ninety-nine satoshis of bitcoin." This is how Charlie might mentally perceive the collection of money that exists in his digital wallet, like he perceives the $9,999 in his fiat wallet.

#### A Utxo is a Packet of Satoshis, just as a Fiat Dollar Bill is a Packet of Pennies

Recall now that with fiat money, Charlie did not think about how his original $10,000 was comprised of smaller individual $100-dollar bills. Similarly, Charlie also does not think about how his 9.99000999 BTC could be comprised of smaller collections of satoshis.

Furthermore, just as Charlie did not carry around fiat money as a collection of pennies, he also is not carrying around a raft of satoshis. Were he to try to carry a million pennies in his physical wallet, the weight of the wallet would be unmanageable. Similarly, if the Bitcoin protocol were to attempt to manage nine hundred and ninety-nine million, nine-hundred and ninety-nine satoshis, the "data weight" would be so heavy, the Bitcoin protocol would be enormous and unmanageable.

To optimize "data weight," the Bitcoin protocol therefore bundles up the satoshis into something that is like the example of dollar bills earlier, but with one important difference. In fact, here is where the Bitcoin protocol exercises a superiority over fiat money by deviating from the limitations fiat money must obey when bundling smaller values into larger values.

In fiat money, one hundred pennies are bundled into a one-dollar bill, which can then be bundled into a larger bill, and so on. All the sizes of fiat money are preset and predetermined by the issuer of the fiat money when they print their bills and coins.

The Bitcoin protocol, however, does not need to pre-plan the sizes of "bills" (i.e. the collections of satoshis) in the owner’s wallet. Bitcoin is freer in this sense; it can shift and change the sizes of its "bills" at will because there is no need to accommodate for the printing of physical coins and paper.

Instead, the Bitcoin protocol allows for the developer of digital wallets to write code that can optimize how bitcoin satoshis are packaged into "bills," and thus the community of developers can work together to keep the data weight of the blockchain manageable. The better the digital-wallet developer, the more efficient the size of the "bills" (a.k.a. the packets of satoshis).

The Bitcoin protocol does have one limitation, however: It must keep track of how these satoshis are being collected into larger "bills" in everyone’s digital wallets. After all, a key idea of Bitcoin is that everything happens under the public eye, where it can be verified.

Because the Bitcoin blockchain must keep track of the sizes of these packets of satoshis, the only time the packets can be assembled or disassembled into larger and smaller sizes is at the moment when the user is spending money on the public blockchain. It is at this time that the user is under the public eye, and therefore his actions can be verified.

To compare this limitation to fiat money, consider the effect created were Charlie to cut a $100-dollar bill into smaller pieces. The $100-dollar bill would no longer be respected as a valid form of currency.

As the word, "utxo," is not a sonorous word, some users in the Komodo ecosystem simply refer to utxos as "bills." The concept is effectively the same. However, as the rest of the blockchain industry primarily uses the word "utxo," we frequently must use this word to maintain a common line of communication. The word utxo will be used throughout the rest of this documentation, to keep in line with industry practices.

The utxo packet can be any size, and the developer of the GUI software decides on this process. Most importantly, and to reiterate, a utxo can only be resized during the process of spending, as this is the moment when the user interacts with the public blockchain.

To further clarify this, let us return to Charlie’s example with fiat money. Recall that when Charlie went to purchase a $1-dollar item, he only had $100-dollar bills in his wallet. He had to give out one $100-dollar bill, and then receive a broken-down collection of dollar bills in return.

This is exactly how it works with utxos. Charlie has a collection of utxos in his digital wallet. When he goes to buy something, he will give out utxos until he surpasses how much he owes, and then the extra change from the last utxo used will be broken down and returned to him.

For example, let us suppose that Charlie’s 9.99000999 BTC is comprised of three utxos worth the following values:
| Utxos in Charlie’s Wallet | Value          |
| ------------------------- | -------------- |
| Utxo #1:                 | 0.50000000 BTC |
| Utxo #2:                 | 0.49000999 BTC |
| Utxo #3:                 | 9.00000000 BTC |
| Total                     | 9.99000999 BTC |

Charlie now desires to purchase an item that costs 0.60000000 BTC. He will have to hand out enough utxos from his wallet until he covers the costs of this transaction, just as he would if he were using fiat money. The Bitcoin protocol calculates the change from the transaction and then returns his change to him.

Remember that there is a fee when spending money on a blockchain. Since we are using Bitcoin in this example, the fee would be paid to cryptocurrency miners. Let us imagine that the fee the miners charge Charlie is 999 satoshis.

We begin by looking at how Charlie would see the process of making the purchase, assuming he does not understand the concept of utxos. For now, Charlie only understands how much is in his wallet at the satoshi level as he conducts his transaction.

| Value              | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| 9.99000999 BTC     | The amount Charlie initially owns                                 |
| (-) 0.60000000 BTC | The amount Charlie sends to the digital cashier for his purchase  |
| (-) 0.00000999 BTC | The network fee paid to miners                                    |
| ------------------ | ----------------------------------------------------------------- |
| 9.39000000 BTC     | The amount left in his wallet                                     |

This deduction for his purchase all appears very simple to Charlie—a testament to
the Bitcoin protocol’s effective design.

In the background, however, the digital wallet handles the utxos and the change process in a manner as determined by the programmer. In Charlie’s example, let us assume that it proceeds this way:

| Value                    | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| 0.60000999 BTC           | The total amount that Charlie owes to the cashier and network            |
| (-) 0.50000000 BTC   | The wallet sends the full value of **utxo #1** to the digital cashier   |
| ------------------------ | ------------------------------------------------------------------------ |
| 0.10000999 BTC           | This is the remaining total amount that Charlie still owes               |

The wallet now brings out utxo #2, which is worth 0.49000999 BTC:

This utxo is broken down or shattered into smaller pieces.

| Value                | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| 0.49000999 BTC       | The size of Charlie’s **utxo #2**, now in the process of change       |
| (-) 0.10000000 BTC   | This shatter of **utxo #2** goes to the cashier (payment fulfilled)   |
| (-) 0.00000999 BTC   | This shatter of **utxo #2** pays the network fee to the miners        |
| -------------------- | ---------------------------------------------------------------------- |
| 0.39000000 BTC       | This last shatter now returns to Charlie’s wallet as a new utxo        |

Charlie now has one new utxo in his wallet, and it is worth 0.39000000 BTC:

| Charlie’s New Wallet State   | Value            |
| ---------------------------- | ---------------- |
| Utxo #3:                    | 9.00000000 BTC   |
| Utxo #4:                    | 0.39000000 BTC   |
| ---------------------------- | ---------------- |
| Total                        | 9.39000000 BTC   |

If Charlie wants to buy something later, these utxos will have to be broken up once more, according to the costs and programming of the digital wallet. Again, whatever is left over from his last utxo comes back to his own wallet as a new utxo.

Now let us suppose that Charlie receives 0.4 BTC from someone else. In Charlie’s wallet, he will see a total of 9.79 BTC. However, in his wallet there are now actually three utxos:

| Charlie’s New Wallet State | Value          |
| -------------------------- | -------------- |
| Utxo #3:                  | 9.00000000 BTC |
| Utxo #4:                  | 0.39000000 BTC |
| Utxo #5:                  | 0.4000000 BTC  |
| Total                      | 9.79000000 BTC |

As a result, the number and sizes of utxos in Charlie’s wallet will vary over time. He may have many smaller utxos that make up his full balance, or sometimes he might just have one large utxo that comprises all of it. For Charlie, it is normally possible to ignore this since the wallet developer could handle everything automatically.

However, a developer in the Komodo ecosystem will likely encounter the concept of utxos in the course of software development, and therefore we encourage developers to practice their understanding.

## Conclusion

This concludes a thorough explanation of the foundational technologies of the Komodo ecosystem. We are working diligently to improve the user experience. While some may say that the cryptocurrency industry is but a bubble, at Komodo we believe we have not yet begun the fight. We hope that the innovations we provide will be a meaningful contribution to the remarkable advent of blockchain, decentralization, and open-source technologies.
