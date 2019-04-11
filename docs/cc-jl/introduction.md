# How to write UTXO based CC modules for KMD based chains - by jl777

A non-technical introduction: [https://komodoplatform.com/crypto-conditions-utxo-based-smart-contracts/](https://komodoplatform.com/crypto-conditions-utxo-based-smart-contracts/)

Source text: [jl777/komodo:src/cc/CC%20made%20easy@FSM](https://github.com/jl777/komodo/blob/FSM/src/cc/CC%20made%20easy.md)

## Introduction

This is not the only smart contracts methodology that is possible to build on top of `OP_CHECKCRYPTOCONDITION`, just the first one. All the credit for getting `OP_CHECKCRYPTOCONDITION` working in the Komodo codebase goes to [@libscott](https://github.com/libscott). I am just hooking into the code that he made and tried to make it just a little easier to make new contracts.

There is probably some fancy marketing name to use, but for now, I will just call it "CC contract" for short, knowing that it is not 100% technically accurate as the CryptoConditions aspect is not really the main attribute. However, the KMD contracts were built to make the CryptoConditions codebase that was integrated into it to be more accessible.

Since CC contracts run native C/C++ code, it is turing complete and that means that any contract that is possible to do on any other platform will be possible to create via CC contract.

UTXO based contracts are a bit harder to start writing than for balance based contracts. However, they are much more secure as they leverage the existing bitcoin utxo system. That makes it much harder to have bugs that issue a zillion new coins from a bug, since all the CC contract operations needs to also obey the existing bitcoin utxo protocol.

This document will be heavily example based so it will utilize many of the existing reference CC contracts. After understanding this document, you should be in a good position to start creating either a new CC contract to be integrated into komodod or to make rpc based dapps directly.

I hope this document will help you understand what a Komodo utxo based CC contract is and how it is different from the other smart contracts. If you are able to dive into the [cc directory](https://github.com/jl777/komodo/blob/FSM/src/cc/) and start making your own CC contract after reading this document, then I am very happy!
