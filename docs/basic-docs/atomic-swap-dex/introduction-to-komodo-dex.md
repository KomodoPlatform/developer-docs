# Introduction to Komodo's Atomic-Swap DEX

One of Komodo's blockchain tools is our atomic-swap powered, decentralized exchange (DEX).

Our DEX software is entirely separate from the `komodod` software that powers the rest of Komodo.

Because our DEX software is built on atomic swaps, you and your users can rely on it to exchange cryptocurrencies at will, and without any middleman involvement. You also maintain full control over the private keys to your assets at all times. This dramatically increases the security of the exchange process.

Our DEX software is capable of facilitating atomic-swap exchanges between approximately 99% of the coins listed on [coinmarketcap.com](https://coinmarketcap.com).

## Why is Komodo's DEX Special?

We're admittedly biased, but all the same, we are proud of Komodo's DEX technology as it has a truly remarkable story.

In May 2014 we performed our first atomic swap. By August of 2017, we released version 1.0 of our publicly available atomic-swap DEX software. These are but two examples of how we have been leading the way in atomic-swap DEX technology since the beginning.

But before we dig any deeper into Komodo's tech, let's make sure we're all on the same page about what a decentralized exchange is, why it's important, and how atomic swaps come into play.

We're going to assume you're familiar with blockchain technology for this discussion. If you need a refresher about how Komodo works, head to [our introduction](../start-here/outline-for-new-developers.html#why-komodo) for an overview. If you need to start from the beginning, we recommend checking out our [whitepaper](https://komodoplatform.com/whitepaper).

## Understanding the Most Common Method of Cryptocurrency Exchange

In the world of cryptocurrency, the goods we are trading are our digital assets. These can be coins, tokens, or other forms of digital rights and property. By nature, each digital asset is bound to the individual blockchain that secures its transaction history.

### Trading Between Blockchains is a Challenge

So long as we use these assets within their parent blockchains the normal methods of conducting transactions are sufficient to trade between persons. However, questions start to arise once we want to exchange assets on one blockchain for assets on an entirely separate blockchain.

Typically, separate blockchains have separate demographics of miners and stakers securing the history. When we trade value between the two blockchains, by default there is no inter-chain security mechanism that can ensure that our trading partner doesn't cheat, and that technical difficulties don’t destroy our assets.

### The Centralized Exchange as a Method

The simplest solution is to abandon decentralization during this process and trust a third party. This describes a normal "centralized exchange" (CEX), such as Coinbase, Kraken, and Binance.

To conduct an exchange using a CEX we have to entrust our digital assets to their care during the process. We send our digital assets to the CEX, and the CEX then issues us "I Owe You" (IOU) tokens that represent our ownership of these assets while we trade.

We are then within a single environment that is controlled by a centralized authority. This grants all the benefits of the old system to the trading process, including greater speed of development and design.

Throughout this experience we rely on the security of a centralized third party to ensure that our purchases and sales are conducted honestly and accurately. When we finish exchanging we hand back our IOUs and tell the CEX the address where we would like to export our purchases.

Only once we receive our digital assets back into an address where we control the private keys can we rest assured that we truly "own" these assets again.

### Problems with Centralized Exchanges

Assuming all goes exactly as we intend, a CEX is an efficient and effective tool for trading cryptocurrencies. However, as anyone in this industry can tell you: things don't always go well.

There are two primary issues: security and trust.

Concerning security, when you place your assets on a centralized exchange, the private keys to these assets are held in a database that, by nature, must have some kind of connection to all types of people on the Internet. Therefore, your assets are in a more dangerous position than when you personally hold them in a secure manner, such as with a paper wallet.

The danger is even greater as we consider that this CEX database holds the assets of thousands of other users. Having a large amount of funds available via the Internet paints a bright target on your hard-earned digital valuables; any attacker who manages to break through the CEX's security measures will find a lucrative reward.

Last year alone (2018), hundreds of millions of US Dollar's worth of digital assets were stolen from major exchanges around the world. Once those assets are gone, they are gone.

The risks do not stop there, as we must also consider the integrity and competence of the CEX itself. When using a CEX, you must trust that the CEX will give you back your digital assets when you request. Even when working with large and popular CEX's, reports yet abound of users who lose their funds due to the CEX's mistakes, technical difficulties, or even legal concerns.

As an entrepreneur or developer searching for methods to allow your audience to trade the digital assets that you create, the responsibilities inherent in becoming a CEX are considerable. Depending on your local jurisdiction, you may even be liable in the event of a failure.

In short, while a CEX brings the many benefits of the old system back into play, it also brings considerable risk to all parties involved.

## A Decentralized Exchange Can Mitigate the Risk

To mitigate the risks inherent with the CEX model, we can instead turn to a decentralized exchange (DEX).

There are many types of decentralized exchanges, each having unique technical structures. One of the most popular and earliest methods of conducting a decentralized exchange was through a decentralized gateway.

In this popular model, a user must send their assets to what is called a blockchain “gateway.” A gateway performs two functions: it holds the assets that users send to it, and it issues IOUs. At first, it may seem that there is little difference when compared to a CEX, but we’ll come to the key difference soon.

The user sends their assets to the gateway, and the gateway issues the user IOUs. From this point, the trading process continues in much the same way as on a CEX. When a user is finished trading, they send their IOUs back to the gateway, and with this transaction they include an external address to which they would like their funds withdrawn. 

Now comes the key difference. The actual assets that the gateway is holding are held in a special type of blockchain address. It is special because it is owned and controlled not by one person or central authority, but rather by several people or parties working together. This address can collect funds from anywhere and from anyone. However, it can only release funds when several of the address’s owners grant permission. In other words, a single owner cannot release funds from this address by himself, but rather he must wait until a few of the other owners also indicate their willingness to perform the transaction. This special type of blockchain address is called a “multi-signature” address. 

Because a multi-signature address requires several different parties to sign the release of funds, the gateway is able to provide a somewhat improved measure of security. For an attacker to succeed, they must compromise several different parties, rather than a central authority. In some ways, this popular DEX model can be an improvement over the CEX model.

On the other hand, just as with the CEX model, once the user sends their assets to the gateway, the user is entirely out of control. Technical errors have the potential for disaster, and there is always the possibility that several of the gateway owners are not honest.

As a developer and entrepreneur looking to use this common DEX model to benefit your users, it is arguably more difficult on a technical and political level than the CEX model. You must find partners whom you trust to be co-owners of the multi-signature address. You must ensure that their infrastructure and other technical contributions are secure, as a failure on their part can reflect poorly on your own brand.

## Atomic Swaps are a Significantly Superior Basis for Exchange

What if there was a way to trade different types of cryptocurrencies without any third-party? What if the user could simply set up a series of code that ensured that control over their assets is not released until they are sure that they will be treated fairly?

This is the idea an atomic swap. It is simply a trade of assets between two users where, assuming both behave honestly, ownership over the assets is not released until both sides are secure in receiving a fair outcome. If one side tries to cheat or makes any kind of mistake, they cannot receive a financial reward from it, and the non-offending side cannot be penalized or lose their funds. 

This is probably enough to get the basic idea, but if you’d like to know the full process of how an atomic swap works, we recommend reading Part III of our [whitepaper](https://komodoplatform.com/whitepaper), or [this blog post for a short primer](https://komodoplatform.com/atomic-swaps/).

The underlying ideas of atomic swaps were invented by Tier Nolan in 2013. He posted his ideas on an online community forum where our lead developer and primary visionary, JL777, was also exploring blockchain technology. Here’s where Komodo enters the picture. 

### Komodo's Leadership in Atomic-Swap Technology

Upon reading Nolan’s discussion, JL777 began experimenting. In May 2014 he conducted his first on-chain atomic swap between two assets on the NXT blockchain. In 2015, he performed an atomic swap between BTC and NXT. This made him one of the first few people in the world to perform an atomic swap. (As an aside: We’ve looked into it, and we’re not sure who did the first-ever atomic swap. Most likely it was Tier Nolan himself, as he had both the idea and the technical skills to achieve it.) 

After performing his second atomic swap, JL777 began building the ecosystem you see before you now. Komodo is designed from the ground-up to facilitate blockchain interoperability and scalability, and our atomic-swap DEX software plays a key role.

In August 2017 we released version 1.0 of our first atomic-swap based DEX to the public. Releasing this entirely new DEX software to the masses was an endeavor many years in the making, and countless developers and other dreamers contributed. Many of them remain anonymous, and to all of them we are grateful. 

Upon release of Komodo’s DEX 1.0, our open-source community performed over 100,000 atomic swaps. It was the first time in history that users with no coding knowledge could trade assets without either a third-party acting as an arbiter, or even without any public knowledge of who was trading with whom.
 
Today, we took what we learned from version 1.0 and rewrote the code from the ground up to enhance essentially all aspects of the user experience. This is what you will find with our DEX 2.0 software. We are also working with Ideas By Nature -- a UX/UI design and development firm -- to create a well designed atomic-swap trading experience.

While the code behind our technology is complex, the good news is: it takes care of itself! As a developer and entrepreneur building on Komodo, you can simply fire up our DEX software and access its functionalities through our API. 

So, without further ado, we now turn our attention to installing and using the Komodo DEX.

