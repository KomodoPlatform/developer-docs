# Final Notes Regarding the Komodo Project

There are few final miscellaneous topics to discuss. These include our strategy for
fiat-pegged cryptocurrencies (PAX), our outlook for smart-contract technology, and
the nature of the main chain in the Komodo ecosystem, KMD.

## Fiat-Pegged Cryptocurrencies

Our strategy towards fiat-pegged cryptocurrencies (PAX) has recently changed. Previously, we featured on our website a white paper that outlined a PAX strategy. That
former strategy was created before it was clear whether governments of the world
would embrace blockchain technology.

Today, it seems that governments are updating their philosophies and preparing
for blockchain adoption. Governments appear to be considering a need to create
blockchain-based cryptocurrencies that can be exchanged for their existing fiat currencies.

In many cases, we may be able to directly integrate these government-sponsored
fiat-to-blockchain cryptocurrencies natively in BarterDEX. Blockchain projects that
properly utilize the core security features of the Bitcoin protocol are capable of properly performing atomic swaps.

As it is possible that government-sponsored cryptocurrencies may natively inte-
grate with BarterDEX, it appears that creating our own PAX technology may be un-
necessary. We are putting all PAX endeavors on hold at this time.

## Smart Contracts on the Komodo Platform

There are several smart-contract options available in the Komodo ecosystem. The
options based on the Bitcoin protocol have been included with our technology, and indeed even with Bitcoin, since the beginning. We also recently released Crypto Conditions, Merkle Root of Merkle Root (MoM) notarizations, and Asset Chain Customizations. These provide enhanced smart-contract and asset-chain functionality. All are
still in beta stages.

### Bitcoin-protocol Based Smart Contracts

A rarely known fact in the blockchain industry is that Satoshi Nakamoto included
secure and advanced smart-contract technology in the original release of the Bitcoin
protocol. Asset chains in the Komodo ecosystem can use the smart-contract capabilities native to the Bitcoin protocol, as Komodo is ultimately a fork of Bitcoin.

Various vendors and developers in the open-source community provide resources
to make this easier, though we make no specific endorsements of any product. One
example of smart-contract technology native to the Bitcoin protocol is a Conditional
Time-Locked Deposit, which our BarterDEX technology utilizes in the trading process.

### Crypto Conditions, Merkle Root of Merkle Root (MoM), and Customized Asset Chains

We are also in the process of releasing our own smart-contract technology that
greatly enhances the Komodo developer’s experience. Our smart-contract technology
is geared to be language-agnostic, meaning that any language (JavaScript, Ruby, C#,
Python, etc.) can execute smart contracts in theKomodo ecosystem. Furthermore, the
MoM technology allows for multi-chain and cross-chain smart- contract interoperability. These many features empower both asset chains as well as the main chain.

As each technology is still in the beta stages, we refrain from including detailed
documentation in our white paper. Please visit our communities to find documentation resources and to converse with our developers, if you are interested in building
on Komodo. We intend to create thorough educational experiences for these products
in due time.

Details Regarding the Primary Chain of the Komodo Ecosystem: Kmd


| Circulating Coin Supply:      | \~100000000 |
|-------------------------------|-------------|
| Total Coin Supply (yr. 2030): | \~200000000 |

The foundational coin of the Komodo ecosystem is named after the ecosystem itself, Komodo (KMD).

It is the most versatile coin we are building. Whenever we create new technologies
for our ecosystem, we seek to establish a relationship between the functionality of the technology and the usefulness of KMD. For instance, KMD is the native cryptocurrency for Jumblr. All other cryptocurrencies in the Komodo ecosystem that seek
to utilize Jumblr’s privacy must first be traded on BarterDEX for KMD. After the
privacy process is complete, the users then exchange KMD on BarterDEX for their
desired cryptocurrency. KMD is also the fuel for our smart-contract technology, and
MoM smart contracts store their data in the KMD main chain. These are but a few
examples of Komodo’s usefulness. Readers may discover many more by discussing
KMD with members of our community.

### Rewards

Furthermore, those who hold KMD may earn rewards of up to 5.1% annually. Any
wallet address that holds at least 10 KMD is eligible. KMD holders must simply move
their KMD once a month—even if the funds are sent back to the same address from
which they originated—in order to earn their reward. This reward is built into the
core code of Komodo.

The reward comes from an opportunity provided by our unique security system,
dPoW. The nature of the reward is rooted in the financial incentive that is typically
given to miners on a normal PoW chain. On a normal PoW, when a miner mines
a new block, the blockchain mints new coins and delivers them to the miner’s indicated wallet. For instance, on the Bitcoin blockchain, the reward for mining a new
block is currently ~12.5 BTC. In dPoW, we do not need to allocate such a high incentive to miners, as we already maintain access to the hash rate of our chosen PoW
network, Bitcoin. Therefore, when we created the KMD main chain, we recoded this
coin-minting reward to distribute 5.1% annual rewards to all holders of at least 10
KMD.

To earn rewards in the full amount of 5.1%, users must move their funds on the
blockchain at least once per month. The reward is calculated as a part of the UTXO
transfer process of this paper for details on UTXOs). The KMD code only
calculates rewards for UTXOs up to one month, and then stops. By simply sending
the full balance of a wallet to the same receiving address, a user can generate a
new UTXO. In this manner, the user can claim their current rewards, and continue
receiving them for at least one month.

The KMD 5.1% reward will continue for a period of approximately twelve to fourteen years. When Komodo’s overall coin supply reaches ~200M, this reward will also
discontinue. Specifically, the reward will cease when the KMD chain reaches a block
height of 7777777.

It is important to note that no one is forced into using KMD in our ecosystem. We
are often asked why we chose this route, as the free nature of the Komodo ecosystem
can be in direct contrast to the philosophies of many other ecosystems and exchanges.
Other ecosystems often require users use the developer’s coin.

The reason why we follow a more open practice is that we strive to adhere to the
guiding principles of decentralization and open-source technology. We want to create
a blockchain platform where people are free to use whatever is most useful for them
in their entrepreneurial endeavors. Keeping KMD as an optional element empowers
the members of the Komodo ecosystem with freedom.

## Conclusion

This concludes a thorough explanation of the foundational technologies of the Komodo ecosystem. We are working diligently to improve the user experience. While
some may say that the cryptocurrency industry is but a bubble, at Komodo we believe we have not yet begun the fight. We hope that the innovations we provide will be a meaningful contribution to the remarkable advent of blockchain, decentralization,
and open-source technologies.
