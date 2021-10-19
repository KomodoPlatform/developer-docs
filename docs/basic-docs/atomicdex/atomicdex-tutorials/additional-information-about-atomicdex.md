# Additional Notes

## A Back End for Front-End Implementations

The AtomicDEX API is built to have a core component that can serve many front-end graphical-user interfaces (GUIs). 

Various front-end GUIs exist in our ecosystem, some of them built by the volunteer efforts of our community members.

This also allows developers and entrepreneurs the freedom to create your own front-end implementation for your own purposes. For example, you can create your own front-end implementation that acts on the same atomic-swap network as other communities. Or, you could make a front-end implementation for your own private network. 

The documentation here only concerns the core component, the AtomicDEX API. This component is typically accessed via an API or a terminal interface.

Documentation for GUIs based on AtomicDEX API are not yet available.

## New Features of AtomicDEX API (Desktop)

Users who worked with the previous version of the AtomicDEX API software, MarketMaker 1.0 (MM1), will note several differences with the new release.  

### New Off-Chain Technology

MM1 used nanomsg technology for its off-chain network layer (e.g. orderbook propagation, ordermatching, client traffic routing, and other technologies that are not active on the blockchain itself).

AtomicDEX API replaced nanomsg with Rust TCP implementation and also uses `libtorrent` as a torrent/DHT network system for the off-chain network layer. This p2p software is widely used and highly reliable, granting a greater development experience.

### Rust Implementation

MM1 was based on ANSI C.

For AtomicDEX API we ported the system to Rust, utilizing the cargo ecosystem. Internal benchmarks prove this to be more efficient. Furthermore, the Rust code base supports mobile devices, including Android & iOS. This is a key benefit, as we expect mobile devices to be a key component of AtomicDEX API adoption.

### Multi-Threading and Other Multi-Tasking Improvements

MM1 had limited multi-tasking capabilities. Also, the bob-side technology was not reliable when using MM1 in lite mode (SPV), wherein blockchain syncing is not required for end-users.

AtomicDEX API has multi-threading. This allows it to reliably manage multiple concurrent requests.

## AtomicDEX API for Mobile (New!)

Komodo is pleased to announce that AtomicDEX API is preparing for release on compatible Android and iOS devices. The software is currently undergoing quality tests and external reviews before publication.

Notable aspects of the Mobile AtomicDEX software include:

- Optimization for low-data usage and CPU consumption
- Low storage requirements (less than 50 MB)
- Integrates seamlessly with the desktop AtomicDEX API software

Through the Komodo API, mobile-device developers can integrate AtomicDEX API for Mobile into other software packages.

Please reach out to our team on [Discord](https://komodoplatform.com/discord) to be involved with the software release.

## Add Your Coin to the AtomicDEX API 

All coins that are built on the BTC and ETH core software can be added to the AtomicDEX API quickly and simply. Coins built on other software frameworks may be able to be added as well, depending on specific details. Specifically, a coin must support functionality that is similar to the "CheckLockTimeVerify" of the Bitcoin protocol, wherein a utxo can be locked for a specific amount of time and then released in a manner determined by the developer. For more information, please reach out to our team on Discord.

To add your BTC or ETH-based coin to AtomicDEX API, first follow the linked checklist below:

[Link to checklist for adding coin to AtomicDEX API](https://github.com/KomodoPlatform/coins#about-this-repository)

Upon completing the checklist, please submit your proposed coin configuration files to the same repository with a pull request. 

## Features Carried From MM1

##### SPV-based Trading

AtomicDEX holds support for [SPV Electrum-based](https://en.bitcoin.it/wiki/Electrum) coins. This feature allows a user to trade with their coins without downloading their coins' blockchain data. This feature is available for all Bitcoin-protocol based coins running native-coin daemons, Ethereum, and Ethereum-based ERC20 tokens. The AtomicDEX API is built to handle the nature of the SPV requirements, providing additional functionality to developers.

##### Liquidity Multiplication

AtomicDEX also enables a feature known as Liquidity Multiplication, a protocol that allows the same funds to be used in multiple requests on AtomicDEX "orderbooks." The first request to fill completes the trade, and all outstanding requests are immediately cancelled. This feature is available to the user when providing liquidity to the exchange (called a "Bob-side" trade).

Liquidity Multiplication therefore allows an initial amount of funding to create an exponentially higher amount of liquidity on the exchange. This also provides a special advantage for traders that like to wait for below-market dumps. While this feature is something that any other exchange could implement, few do. 

On AtomicDEX, all orderbook entries are 100% backed by real funds, as opposed to a centralized exchange’s vouchers, which may be one reason why AtomicDEX can more readily offer this feature.

