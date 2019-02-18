# Introduction to Komodo's DEX Software

One of Komodo's blockchain tools is an atomic-swap powered, decentralized exchange (DEX).

Komodo’s DEX software is entirely separate from the `komodod` software that powers the rest of Komodo.

Because this DEX software is built on atomic swaps, developers and users can rely on it to exchange cryptocurrencies at will, and without any middleman involvement. Users of this software maintain full control over the private keys of their assets at all times. This dramatically increases the security of the exchange process.

This software is capable of facilitating atomic-swap exchanges between approximately 99% of the coins listed on [coinmarketcap.com](https://coinmarketcap.com). All coins were listed without charge.

## Why is Komodo's DEX Special?

When it comes to DEX technology, Komodo has a remarkable story.

In May 2014, Komodo’s lead developer performed his first atomic swap. By August of 2017, Komodo released version 1.0 of the atomic-swap DEX software, allowing anonymous Internet users to perform atomic swaps via automation. These are but two examples of how Komodo has led the way in atomic-swap DEX technology since the beginning.

To understand Komodo DEX software, one must first understand what a decentralized exchange is, why it's important, and how atomic swaps come into play.

This discussion requires a small amount of foundational knowledge. The reader should be generally familiar with blockchain technology and should understand the basic ideas of the Komodo project. If an overview of Komodo is needed, head to the documentation introduction, ["Why Komodo?"](../start-here/outline-for-new-developers.html#why-komodo) For a more thorough understanding of blockchain technology in general, check out [Part I of the Komodo whitepaper.](https://komodoplatform.com/whitepaper) It gives an overview of how a blockchain works and why it matters. After reading these two sections, the following discussion should be attainable.

## Understanding the Most Common Method of Cryptocurrency Exchange

In the world of cryptocurrency, the goods we are trading are our digital assets. These can be coins, tokens, or other forms of digital rights and property. By nature, each digital asset is bound to the individual blockchain that secures its transaction history.

### Trading Between Blockchains is a Challenge

So long as a user exchanges these assets within their parent blockchains the normal methods of conducting transactions are sufficient for trading. However, questions arise once the user wants to exchange assets on one blockchain for assets on an entirely separate blockchain.

Typically, separate blockchains have separate demographics of miners and stakers securing the history. When a user trades value between the two blockchains, by default there is no inter-chain security mechanism that can ensure that the user's trading partner does not cheat, and that technical difficulties do not destroy the user's assets.

### The Centralized Exchange as a Method

The simplest solution is to abandon decentralization during this process and trust a third party. This describes a normal "centralized exchange" (CEX), such as Coinbase, Kraken, and Binance.

To conduct an exchange using a CEX the user must entrust their digital assets to their care during the process. The user sends their digital assets to the CEX, and the CEX then issues the user "I Owe You" (IOU) tokens that represent the user's ownership of these assets.

The user is then within a single environment that is controlled by a centralized authority. This grants all the benefits of the old system to the trading process, including greater speed of development and design.

Throughout this experience the user relies on the security of a centralized third party to ensure that their purchases and sales are conducted honestly and accurately. When the user is finished exchanging, they hand back their IOUs and tell the CEX the address where they would like to export their purchases.

Once the user receives their digital assets back into an address which they control, they are again truly the "owner" of these assets.

### Problems with Centralized Exchanges

Assuming all goes as intended, a CEX is an efficient and effective tool for trading cryptocurrencies. However, reliable CEX's readily state that this model carries great risk. Many of the highest quality CEX's are looking to change their model to mitigate these dangers.

The primary concern for a CEX is security. When a user places their assets on a centralized exchange, the private keys to these assets are held in a database that, by nature, must have some kind of connection to the public Internet. As the database must always be available online, an attacker can penetrate an individual user's account and gain control over the IOUs even when the user is offline. The attacker can then trade these IOUs at malicious prices into an account the attacker controls and withdraw the true assets. 

Furthermore, this database holds the assets of thousands of other users. Having a large amount of vulnerable funds on the Internet is an additional incentive for attackers. [As reported by IG Group studies,](https://www.group-ib.com/resources/threat-research/2018-report.html) from 2017 to 2018, nearly 1 billion US dollar's worth of digital assets were stolen from major exchanges around the world. 

A CEX has several challenges to consider as a result of this danger. From a legal perspective, [the infamous Mt. Gox case](https://www.coindesk.com/mississippi-doctors-sued-mt-gox-for-bitcoin-loss-now-worth-135-million) illustrates how users may attempt to hold the CEX liabile in the event of a theft. A CEX may struggle to find an insurance provider that will protect them. Also, compared to fiat currency, government authorities can do little to assist in recovering stolen funds.

--Pro and Con Table--

In light of these concerns, many reputable and established CEX's are turning to decentralized technologies. For example, Binance, one of the most popular CEX's on the Internet, [is moving swiftly into decentralized technology](https://www.theblockcrypto.com/2019/02/07/binance-moves-away-from-ethereum-as-it-prepares-to-launch-dex/) to enhance both security and functionality for their users.

## A Decentralized Exchange Can Mitigate the Risk

To understand why a CEX may wish to implement decentralized technologies within their environment, one must first understand how a typical decentralize exchange (DEX) works. There are many types of decentralized exchanges, each having a unique technical structure. Perhaps the most popular and earliest methods of conducting a DEX is a decentralized gateway.

--table showing several different types of DEXs, and perhaps a paragraph to summarize the ideas of the others--

A decentralized gateway can be thought of as a cryptocurrency holding station that is owned and controlled by several different parties. The gateway performs two functions: it holds the assets that users send to it, and it issues IOUs.

The IOUs issued to the user do not derive from a centralized database, but rather, they are managed through a blockchain. The user maintains control over the private keys to their IOUs at all times. While this is not as secure as having access to the private keys to the true digital assets, it does provide some protection. Assuming the user knows how to secure their private keys, when the user is offline their IOUs are not vulnerable to attackers. This is one improvement over the CEX model, where IOUs are available online at all times. 

The user trades their IOUs with other users in much the same way as on a CEX. When a user is finished trading, they send their IOUs back to the gateway, and with this transaction they include an external address to which they would like their funds withdrawn.

Now comes another key difference. The actual assets that the gateway is holding are contained in a special type of blockchain address. It is special because it is owned and controlled not by one person or central authority, but rather by several people or parties working together. This address can collect funds from anywhere and from anyone. However, it can only release funds when several of the address’s owners together grant permission. This special type of blockchain address is called a “multi-signature” address.

Because a multi-signature address requires several different parties to sign the release of funds, the gateway is able to provide an improved measure of security. For an attacker to succeed, they must compromise several different parties, rather than a central authority. 

In many ways, this popular DEX model is an improvement over the CEX model, and this is why many CEX's are expanding into this territory. Users have control over their IOUs, making them responsible for individual attacks, rather than the exchange owners. The risk of an exchange-wide attack is also shared across multiple parties.

For a developer and entrepreneur, the DEX method is more secure than the CEX model, but there remain many difficulties on technical and political levels. The entrepreneur must find trustworthy partners to be co-owners of the multi-signature address. The developer must ensure that their partners' infrastructure and other technical contributions are secure, as a failure by the partners can reflect poorly on the developer and entrepreneur's own brand.

Furthermore, from the user's perspective, the primary danger persists in this DEX model. Once the user sends their assets to the gateway, the user loses control and responsibility over their funds.

## Atomic Swaps are a Significantly Superior Basis for Exchange

What if there was a way to trade different types of cryptocurrencies without the user ever transferring control until the trade is complete? Could a user keep the private keys to their assets, and only deal directly with their trading partner and not with a third party?

This is the idea an atomic swap. It is simply a trade of assets between two users where, assuming both behave honestly, ownership over the assets is not released until both sides are secure in receiving a fair outcome. If one side tries to cheat or makes any kind of mistake, they cannot receive a financial reward from it, and the non-offending side cannot be penalized or lose their funds.

--table comparing CEX, DEX, and atomic swap--

This is probably enough to get the basic idea. If the reader desires a more thorough understanding of the atomic swap process, read Part III of [the Komodo whitepaper,](https://komodoplatform.com/whitepaper) or [this blog post for a condensed explanation.](https://komodoplatform.com/atomic-swaps/)

The underlying ideas of atomic swaps were invented by Tier Nolan in 2013. He posted his ideas on an online community forum where Komodo's lead developer and primary visionary, JL777, was also exploring blockchain technology. Here’s where Komodo enters the picture.

### Komodo's Leadership in Atomic-Swap Technology

Upon reading Nolan’s discussion, JL777 began experimenting. In May 2014 he conducted his first on-chain atomic swap between two assets on the NXT blockchain. In 2015, he performed an atomic swap between BTC and NXT. This made him one of the first few people in the world to perform an atomic swap. (As an aside: It is not clear who did the first-ever atomic swap. Most likely it was Tier Nolan himself, as he had both the idea and the technical skills to achieve it.)

After performing his second atomic swap, JL777 began leading the creation of the Komodo ecosystem. Komodo is designed from the ground-up to facilitate blockchain interoperability and scalability, and our atomic-swap DEX software plays a key role.

In August 2017, Komodo released version 1.0 of the first atomic-swap based DEX to the public. Releasing this entirely new DEX software to the masses was an endeavor many years in the making, and countless developers and other dreamers contributed.

Upon release of Komodo’s DEX 1.0, members of the Komodo open-source community performed over 100,000 atomic swaps. It was the first time in history that users with no coding knowledge could trade assets without either a third-party acting as an arbiter, or even without any public knowledge of who was trading with whom.
 
Today, the Komodo developers took what they learned from version 1.0 and rewrote the code from the ground up to enhance essentially all aspects of the user experience. This is the Komodo DEX 2.0 software. Komodo is also partnered with Ideas By Nature, a UX/UI design and development firm, to create a well designed atomic-swap trading experience.

While the code behind Komodo's technology is complex, the good news is; it takes care of itself. A developer and entrepreneur building on Komodo can simply fire up the software and access its functionalities through the API.

[Need a section about how we are facilitating other exchanges to work with us. We don’t necessarily need to even take all the fees. Point out how networks work. We’re complimenting other exchanges. Open standards.]

