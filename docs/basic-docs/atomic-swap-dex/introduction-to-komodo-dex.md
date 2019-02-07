# Introduction to Komodo's Atomic-Swap DEX

One of Komodo's blockchain tools is an atomic-swap powered, decentralized exchange (DEX).

Komodo’s DEX software is entirely separate from the `komodod` software that powers the rest of Komodo.

Because this DEX software is built on atomic swaps, developers and users can rely on it to exchange cryptocurrencies at will, and without any middleman involvement. Users of this software maintain full control over the private keys to their assets at all times. This dramatically increases the security of the exchange process.

This software is capable of facilitating atomic-swap exchanges between approximately 99% of the coins listed on [coinmarketcap.com](https://coinmarketcap.com). All of these coins are listed without charge.

## Why is Komodo's DEX Special?

When it comes to DEX technology, Komodo has a remarkable story.

In May 2014 Komodo’s lead developer performed his first atomic swap. By August of 2017, the Komodo project released version 1.0 of this atomic-swap DEX software, allowing anonymous Internet users to perform atomic swaps via automation. These are but two examples of how Komodo has led the way in atomic-swap DEX technology since the beginning.

To understand Komodo DEX software, one must first understand what a decentralized exchange is, why it's important, and how atomic swaps come into play.

This discussion requires a small amount of foundational knowledge. The reader should be generally familiar with blockchain technology and should understand the basic ideas of the Komodo project. If an overview of Komodo is needed, head to the documentation introduction, ["Why Komodo?"](../start-here/outline-for-new-developers.html#why-komodo). For a more thorough understanding of blockchain technology in general, check out Part I of the Komodo [whitepaper](https://komodoplatform.com/whitepaper). It gives an overview of how a blockchain works and why it matters. After reading these two sections, the following discussion should be attainable.

## Understanding the Most Common Method of Cryptocurrency Exchange

In the world of cryptocurrency, the goods we are trading are our digital assets. These can be coins, tokens, or other forms of digital rights and property. By nature, each digital asset is bound to the individual blockchain that secures its transaction history.

### Trading Between Blockchains is a Challenge

So long as a user uses these assets within their parent blockchains the normal methods of conducting transactions are sufficient to trade between persons. However, questions start to arise once the user wants to exchange assets on one blockchain for assets on an entirely separate blockchain.

Typically, separate blockchains have separate demographics of miners and stakers securing the history. When a user trades value between the two blockchains, by default there is no inter-chain security mechanism that can ensure that the user's trading partner doesn't cheat, and that technical difficulties don’t destroy the user's assets.

### The Centralized Exchange as a Method

The simplest solution is to abandon decentralization during this process and trust a third party. This describes a normal "centralized exchange" (CEX), such as Coinbase, Kraken, and Binance.

To conduct an exchange using a CEX the user must entrust their digital assets to their care during the process. The user sends their digital assets to the CEX, and the CEX then issues the user "I Owe You" (IOU) tokens that represent the user's ownership of these assets throughout the trading process.

The user is then within a single environment that is controlled by a centralized authority. This grants all the benefits of the old system to the trading process, including greater speed of development and design.

Throughout this experience the user relies on the security of a centralized third party to ensure that their purchases and sales are conducted honestly and accurately. When the user is finished exchanging, they hand back their IOUs and tell the CEX the address where they would like to export their purchases.

Only once the user receives their digital assets back into an address which they control can the user rest assured that they truly "own" these assets again.

### Problems with Centralized Exchanges

Assuming all goes exactly as intended, a CEX is an efficient and effective tool for trading cryptocurrencies. However, reliable CEX's readily state that this model carries great risk. Many of the highest quality CEX's are looking to change their model to provide greater security.

There are two primary risks in the trading process: security and trust.

Concerning security, when a user places their assets on a centralized exchange, the private keys to these assets are held in a database that, by nature, must have some kind of connection to all types of people on the Internet. Therefore, the user's assets are in a more dangerous position than when the user personally holds them in a secure manner, such as with a paper wallet.

The danger is even greater when taking into consideration that this CEX database holds the assets of thousands of other users. Having a large amount of funds available via the Internet paints a bright target on the user's hard-earned digital valuables; any attacker who manages to break through the CEX's security measures will find a lucrative reward.

From 2017 to 2018, nearly 1 billion USD dollar's worth of digital assets were stolen from major exchanges around the world. Compared to fiat currency, it is far more difficult to recover stolen blockchain-based assets. 

The risks do not stop there, as we must also consider the integrity and competence of the CEX itself. When using a CEX, you must trust that the CEX will give you back your digital assets when you request. Even when working with large and popular CEX's, reports yet abound of users who lose their funds due to the CEX's mistakes, technical difficulties, or even legal concerns.

As an entrepreneur or developer searching for methods to allow your audience to trade the digital assets that you create, the responsibilities inherent in becoming a CEX are considerable. Depending on your local jurisdiction, you may even be liable in the event of a failure.

In short, while a CEX brings the many benefits of the old system back into play, it also brings considerable risk to all parties involved.

## A Decentralized Exchange Can Mitigate the Risk

To mitigate the risks inherent with the CEX model, an entrepreneur can instead turn to a decentralized exchange (DEX).

There are many types of decentralized exchanges, each having unique technical structures. One of the most popular and earliest methods of conducting a decentralized exchange was through a decentralized gateway.

In this popular model, a user must send their assets to what is called a blockchain “gateway.” A gateway performs two functions: it holds the assets that users send to it, and it issues IOUs. At first, it may seem that there is little difference when compared to a CEX, but the key differences will be apparent in a few moments.

The user sends their assets to the gateway, and the gateway issues the user IOUs. From this point, the trading process continues in much the same way as on a CEX. When a user is finished trading, they send their IOUs back to the gateway, and with this transaction they include an external address to which they would like their funds withdrawn.

Now comes the key difference. The actual assets that the gateway is holding are held in a special type of blockchain address. It is special because it is owned and controlled not by one person or central authority, but rather by several people or parties working together. This address can collect funds from anywhere and from anyone. However, it can only release funds when several of the address’s owners grant permission. In other words, a single owner cannot release funds from this address by himself, but rather he must wait until a few of the other owners also indicate their willingness to perform the transaction. This special type of blockchain address is called a “multi-signature” address.

Because a multi-signature address requires several different parties to sign the release of funds, the gateway is able to provide a somewhat improved measure of security. For an attacker to succeed, they must compromise several different parties, rather than a central authority. In some ways, this popular DEX model can be an improvement over the CEX model.

On the other hand, just as with the CEX model, once the user sends their assets to the gateway, the user is entirely out of control. Technical errors have the potential for disaster, and there is always the possibility that several of the gateway owners are not honest.

For a developer and entrepreneur looking to use this common DEX model to benefit users, the DEX method is arguably more difficult on a technical and political level than the CEX model. The entrepreneur must find trustworthy partners to be co-owners of the multi-signature address. The developer must ensure that their partners' infrastructure and other technical contributions are secure, as a failure by the partners can reflect poorly on the developer and entrepreneur's own brand.

## Atomic Swaps are a Significantly Superior Basis for Exchange

What if there was a way to trade different types of cryptocurrencies without any third-party? What if the user could simply set up a series of code that ensured that control over their assets is not released until they are sure they will be treated fairly?

This is the idea an atomic swap. It is simply a trade of assets between two users where, assuming both behave honestly, ownership over the assets is not released until both sides are secure in receiving a fair outcome. If one side tries to cheat or makes any kind of mistake, they cannot receive a financial reward from it, and the non-offending side cannot be penalized or lose their funds.

This is probably enough to get the basic idea. If the reader desires a more thorough understanding of the atomic swap process, read Part III of [the Komodo whitepaper](https://komodoplatform.com/whitepaper), or [this blog post for a condensed explanation](https://komodoplatform.com/atomic-swaps/).

The underlying ideas of atomic swaps were invented by Tier Nolan in 2013. He posted his ideas on an online community forum where Komodo's lead developer and primary visionary, JL777, was also exploring blockchain technology. Here’s where Komodo enters the picture.

### Komodo's Leadership in Atomic-Swap Technology

Upon reading Nolan’s discussion, JL777 began experimenting. In May 2014 he conducted his first on-chain atomic swap between two assets on the NXT blockchain. In 2015, he performed an atomic swap between BTC and NXT. This made him one of the first few people in the world to perform an atomic swap. (As an aside: It is not clear who did the first-ever atomic swap. Most likely it was Tier Nolan himself, as he had both the idea and the technical skills to achieve it.)

After performing his second atomic swap, JL777 began leading the creation of the Komodo ecosystem. Komodo is designed from the ground-up to facilitate blockchain interoperability and scalability, and our atomic-swap DEX software plays a key role.

In August 2017, Komodo released version 1.0 of the first atomic-swap based DEX to the public. Releasing this entirely new DEX software to the masses was an endeavor many years in the making, and countless developers and other dreamers contributed.

Upon release of Komodo’s DEX 1.0, members of the Komodo open-source community performed over 100,000 atomic swaps. It was the first time in history that users with no coding knowledge could trade assets without either a third-party acting as an arbiter, or even without any public knowledge of who was trading with whom.
 
Today, the Komodo developers took what they learned from version 1.0 and rewrote the code from the ground up to enhance essentially all aspects of the user experience. This is the Komodo DEX 2.0 software. Komodo is also partnered with Ideas By Nature, a UX/UI design and development firm, to create a well designed atomic-swap trading experience.

While the code behind Komodo's technology is complex, the good news is: it takes care of itself! A developer and entrepreneur building on Komodo can simply fire up the software and access its functionalities through the API.

[Need a section about how we are facilitating other exchanges to work with us. We don’t necessarily need to even take all the fees. Point out how networks work. We’re complimenting other exchanges. Open standards.]
