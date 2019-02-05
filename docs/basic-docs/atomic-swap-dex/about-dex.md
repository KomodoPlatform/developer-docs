# Additional Notes

## A Backend for Frontend Implementations

Komodo's DEX software is built to have a core component that can serve many front-end graphical-user interfaces (GUIs). 

The core component is called MarketMaker 2.0, or MM2 for brevity.

Various front-end GUIs exist in our ecosystem, some of them built by the volunteer efforts of our community members. We are also working to release a Komodo-supported User Experience and User Interface, in coordination with Ideas By Nature, a UX/UI design firm.

This also allows developers and entrepreneurs the freedom to create your own frontend implementation for your own purposes. For example, you can create your own frontend implementation that acts on the same atomic-swap network as other communities. Or, you could make a frontend implementation for your own private network. 

The documentation here only concerns the core component, MarketMaker 2.0 (MM2). This component is typically accessed via an API or a terminal interface.

Documentation for a GUI for MM2 is not yet available.

## New Features of MarketMaker 2.0

Users who worked with the previous version of the MM software, MarketMaker 1.0 (MM1), will note several differences with the new release.  

### New Off-Chain Technology

MM1 used nanomsg technology for its off-chain network layer (e.g. orderbook propagation, ordermatching, client traffic routing, and other technologies that are not active on the blockchain itself).

MM2 uses `libtorrent` as a torrent/DHT network system for the off-chain network layer. This p2p software is widely used and highly reliable, granting a greater development experience.

### Rust Implementation

MM1 was based on ANSI C.

For MM2 we ported the system to Rust, utilizing the cargo ecosystem. Internal benchmarks prove this to be more efficient. Furthermore, the Rust codebase supports mobile devices natively, including Android & iOS. This is a key benefit, as we expect mobile devices to be a key component of MM2 adoption.

### Multi-Threading and Other Multi-Tasking Improvements

MM1 had limited multi-tasking capabilities. Also, the bob-side technology was not reliable when using MM1 in lite mode (SPV), wherein blockchain syncing is not required for end-users.

MM2 has multi-threading. This allows it to reliably manage multiple concurrent requests.

###  Each Node is a Standalone P2P Solution

MM1 had two separate types of nodes: full relay and non-full relay. Non-full relay nodes had to rely on full relay nodes for network functionality. This additional layer of complexity was not optimal.

With MM2, each node is a full standalone p2p solution (e.g. there are no longer two types of nodes).

