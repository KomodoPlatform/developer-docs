# Add a Bitcoin Compatible coin (SPV) to Agama Mobile

The Agama mobile code comprises of two parts. Agama wallet library and MeteorJS app. This assetchain adding guide will cover both.

## Agama wallet library

- Add network params [pbca26/agama-wallet-lib:src/bitcoinjs-networks.js@dev](https://github.com/pbca26/agama-wallet-lib/blob/dev/src/bitcoinjs-networks.js). Make use of isPoS or isZcash flags if applicable in your case.

- Add an electrum server [pbca26/agama-wallet-lib:src/electrum-servers.js@dev#L1](https://github.com/pbca26/agama-wallet-lib/blob/dev/src/electrum-servers.js#L1)

- Add a safe fixed fee (per transaction) [pbca26/agama-wallet-lib:src/fees.js@dev#L1](https://github.com/pbca26/agama-wallet-lib/blob/dev/src/fees.js#L1).

- Add an explorer [pbca26/agama-wallet-lib:src/coin-helpers.js@dev#L62](https://github.com/pbca26/agama-wallet-lib/blob/dev/src/coin-helpers.js#L62).

- Submit a PR to the `dev` branch

## MeteorJS app

- Drop a 60 x 60 px logo into [/public/images/cryptologo/btc@dev](https://github.com/KomodoPlatform/agama-mobile/tree/dev/public/images/cryptologo/btc)

- Add explorer url to whitelist [/mobile-config.js@dev#L118](https://github.com/KomodoPlatform/agama-mobile/blob/dev/mobile-config.js#L118)

- Add coin ticker to coins file [/imports/ui/actions/coins.js@dev#L39](https://github.com/KomodoPlatform/agama-mobile/blob/dev/imports/ui/actions/coins.js#L39)

- Add coin name to translation file [/imports/ui/translate/en.js@dev#L344](https://github.com/KomodoPlatform/agama-mobile/blob/dev/imports/ui/translate/en.js#L344).

- Submit a PR, use dev branch!

## How to get network parameters

- pubKeyHash: [KomodoPlatform/komodo:src/chainparams.cpp@fbb3b3e#L169](https://github.com/KomodoPlatform/komodo/blob/fbb3b3e9a0c432173a8d733ebbcbd7b0324d58df/src/chainparams.cpp#L169)

- scriptHash: [KomodoPlatform/komodo:src/chainparams.cpp@fbb3b3e#L170](https://github.com/KomodoPlatform/komodo/blob/fbb3b3e9a0c432173a8d733ebbcbd7b0324d58df/src/chainparams.cpp#L170)

- wif: [KomodoPlatform/komodo:src/chainparams.cpp@fbb3b3e#L171](https://github.com/KomodoPlatform/komodo/blob/fbb3b3e9a0c432173a8d733ebbcbd7b0324d58df/src/chainparams.cpp#L171)

- bip32 public: [KomodoPlatform/komodo:src/chainparams.cpp@fbb3b3e#L172](https://github.com/KomodoPlatform/komodo/blob/fbb3b3e9a0c432173a8d733ebbcbd7b0324d58df/src/chainparams.cpp#L172)

- bip32 private: [KomodoPlatform/komodo:src/chainparams.cpp@fbb3b3e#L173](https://github.com/KomodoPlatform/komodo/blob/fbb3b3e9a0c432173a8d733ebbcbd7b0324d58df/src/chainparams.cpp#L173)

If you can't find `chainparams.cpp` in your code base, all of the information and parameters required are normally contained within but not limited to these files (depends on your coin):

- `init.cpp`: [https://github.com/litecoin-project/litecoin/blob/master/src/init.cpp](https://github.com/litecoin-project/litecoin/blob/master/src/init.cpp)
- `base58.h`: [https://github.com/litecoin-project/litecoin/blob/master/src/base58.h](https://github.com/litecoin-project/litecoin/blob/master/src/base58.h)
- `chainparamsbase.h`: [https://github.com/litecoin-project/litecoin/blob/master/src/chainparamsbase.h](https://github.com/litecoin-project/litecoin/blob/master/src/chainparamsbase.h)

Please make sure the BTC compatible coin is working in Agama before making a PR. Pull requests containing partial information or not working assets/servers will remain unmerged until all requirements are fulfilled.
