# Adding a Coin on AtomicDEX Desktop

Before a coin can be listed in AtomicDEX, it needs to be confirmed for compatibility, and present within the [Komodo Platform coins repository](https://github.com/KomodoPlatform/coins).

This involves:
- Setting up two operational [electrum servers](https://electrumx-spesmilo.readthedocs.io/en/latest/)
- Setting up a [block explorer](https://github.com/gcharang/komodo-install-explorer)
- Performing a [test swap](https://github.com/KomodoPlatform/coins/tree/master/swaps)
- Submitting a Pull Request (PR) to the [coins repository](https://github.com/KomodoPlatform/coins)

Once these steps are complete, you can submit a PR to the [AtomicDEX-Desktop repository](https://github.com/KomodoPlatform/atomicDEX-Desktop)

Here is an [actual example](https://github.com/KomodoPlatform/atomicDEX-Desktop/pull/1504) of the files that need to be modified:
1) Add information to [0.x.x-coins.json](https://github.com/KomodoPlatform/atomicDEX-Desktop/blob/dev/assets/config/0.5.4-coins.json). Note: This filename changes depending on the current version of the Desktop app.
2) Add [TradingView IDs](https://github.com/KomodoPlatform/atomicDEX-Desktop/blob/dev/atomic_defi_design/Dex/Constants/General.qml#L487) (optional) if available. This is used to show price graphs.
3) Add an entry to the [Style.qml file](https://github.com/KomodoPlatform/atomicDEX-Desktop/blob/dev/atomic_defi_design/Dex/Constants/Style.qml#L278), to define the text color used to display the coin name. Be sure to check that this color works well and is readable within both lite and dark themes.
4) Add a coin icon to the [atomic_defi_design/assets/images/](https://github.com/KomodoPlatform/atomicDEX-Desktop/tree/dev/atomic_defi_design/assets/images/coins) folder. This should be in PNG format, optimised for filesize (less than 500kb), and at least 128 x 128 pixels in size.
5) Add a reference to the icon image file into [qml.qrc](https://github.com/KomodoPlatform/atomicDEX-Desktop/blob/dev/atomic_defi_design/qml.qrc#L162)

## Update coins.json 

| parameter              | Type     | Description           |
| ---------------------- | -------- | --------------------- |
| coin                   | string   | Ticker of the coin. Must match the "coin" field for an entry in the [coins repository](https://github.com/KomodoPlatform/coins/blob/master/coins#L5138) If the coin is on more than one network, use COIN-NETWORK as ticker, eg BTC-BEP20. |
| name                   | string   | Full name of the coin. Should match the "fname" field for an entry in the [coins repository](https://github.com/KomodoPlatform/coins/blob/master/coins#L5138). Coins on more than one network share the same name. |
| type                   | string   | Defines the category or network the coin is from. For example, `ERC20` for tokens on the Ethereum network; `Smart Chain` for Komodo Platform Antara smart chains; `UTXO` for Bitcoin forks (LTC, DOGE etc) |
| coinpaprika_id         | string   | (optional) This is the coin's ID on [CoinPaprika](https://coinpaprika.com/coin/minds-minds/), used to retrieve pricing info. |
| coingecko_id           | string   | (optional) This is the coin's ID on [CoinGecko](https://www.coingecko.com/en/coins/minds), used to retrieve pricing info. |
| nomics_id              | string   | (optional) This is the coin's ID on [Nomics](https://nomics.com/assets/minds-minds), used to retrieve pricing info. |
| nodes                  | list     | (required for ERC20) A list of nodes to be used for communicating with the coin's blockchain  |
| electrum               | list     | (required for UTXO) A list of electrum servers to be used for communicating with the coin's blockchain. `url` is for standard TCP, `url_ws` is for websockets. `protocol` defaults to TCP, but can be set to `SSL` if the electrum server supports it.  |
| explorer_url           | list     | (required) A list of block explorers, used to link the wallets to transaction details.  |
| explorer_tx_url        | string   | (optional) [Some explorers](https://chainz.cryptoid.info) use different url endpoint structures, and will require this additional field  |
| explorer_address_url   | string   | (optional) [Some explorers](https://chainz.cryptoid.info) use different url endpoint structures, and will require this additional field  |
| active                 | boolean  | This is used to define the coins that are loaded by default. Must be set to `false` unless you have forked the project or have made an arrangement with the developers  |
| currently_enabled      | boolean  | This is used to define the coins that are loaded by default. Must be set to `false` unless you have forked the project or have made an arrangement with the developers. After installing the Desktop app, your local copy of this file will set enabled coins to `true` so they will auto load on your computer.   |

<!-- Add a form on stats.kmd.io to assist with generating this? -->

Check out the examples below, and if you need any more information just drop into the [Komodo Platform Discord](https://discord.gg/kyXsDu46dQ) and ask!

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Smartchain example">

```json

  "TKL": {
    "coin": "TKL",
    "name": "Tokel",
    "type": "Smart Chain",
    "coinpaprika_id": "tkl-tokel",
    "coingecko_id": "test-coin",
    "nomics_id": "TKL2",
    "electrum": [
      {
        "url": "1.eu.tokel.electrum.dexstats.info:10077"
      },
      {
        "url": "2.eu.tokel.electrum.dexstats.info:10077"
      }
    ],
    "explorer_url": [
      "https://tokel.explorer.dexstats.info/"
    ],
    "active": false,
    "currently_enabled": false
  }
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="UTXO example">


```json
  "BCH": {
    "coin": "BCH",
    "name": "Bitcoin Cash",
    "type": "UTXO",
    "coingecko_id": "bitcoin-cash",
    "coinpaprika_id": "bch-bitcoin-cash",
    "nomics_id": "BCH",
    "electrum": [
      {
        "url": "electrum1.cipig.net:10055",
        "ws_url": "electrum1.cipig.net:30055"
      },
      {
        "url": "electrum2.cipig.net:10055",
        "ws_url": "electrum2.cipig.net:30055"
      },
      {
        "url": "electrum3.cipig.net:10055",
        "ws_url": "electrum3.cipig.net:30055"
      }
    ],
    "explorer_url": [
      "https://explorer.bitcoin.com/bch/"
    ],
    "active": false,
    "currently_enabled": false,
  }
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="ERC20 example">

```json
  "BAT-ERC20": {
    "coin": "BAT-ERC20",
    "name": "Basic Attention Token",
    "type": "ERC-20",
    "coinpaprika_id": "bat-basic-attention-token",
    "coingecko_id": "basic-attention-token",
    "nomics_id": "BAT",
    "nodes": [
      "http://eth1.cipig.net:8555",
      "http://eth2.cipig.net:8555",
      "http://eth3.cipig.net:8555"
    ],
    "explorer_url": [
      "https://etherscan.io/"
    ],
    "active": false,
    "currently_enabled": false
  }
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="BEP20 example">

```json
  "BTC-BEP20": {
    "coin": "BTC-BEP20",
    "name": "Bitcoin",
    "type": "BEP-20",
    "coinpaprika_id": "btc-bitcoin",
    "coingecko_id": "bitcoin",
    "nomics_id": "BTC",
    "nodes": [
      "http://bsc1.cipig.net:8655",
      "http://bsc2.cipig.net:8655",
      "http://bsc3.cipig.net:8655"
    ],
    "explorer_url": [
      "https://bscscan.com/"
    ],
    "active": false,
    "currently_enabled": false
  }
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="QRC20 example">

```json
  "DIMI-QRC20": {
    "coin": "DIMI-QRC20",
    "name": "DiminutiveCoin",
    "type": "QRC-20",
    "coinpaprika_id": "dimi-diminutive-coin",
    "coingecko_id": "diminutive-coin",
    "nomics_id": "DIMI",
    "explorer_url": [
      "https://explorer.qtum.org/"
    ],
    "active": false,
    "currently_enabled": false
  }
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="PLG20 example">

```json
  "COMP-PLG20": {
    "coin": "COMP-PLG20",
    "name": "Compound",
    "type": "Matic",
    "coinpaprika_id": "comp-compoundd",
    "coingecko_id": "compound-governance-token",
    "nomics_id": "COMP",
    "nodes": [
      "https://polygon-rpc.com"
    ],
    "explorer_url": [
      "https://polygonscan.com/"
    ],
    "active": false,
    "currently_enabled": false
  }
```
</collapse-text>

</div>


## Add TradingView IDs (optional)

Simply search for the coin on [https://www.tradingview.com/markets/cryptocurrencies/](https://www.tradingview.com/markets/cryptocurrencies/), and click on a result to see it's graph. 

The URL of the graph will be something like [https://www.tradingview.com/chart/?symbol=BINANCE%3AKMDBTC](https://www.tradingview.com/chart/?symbol=BINANCE%3AKMDBTC). Substitute `%3A` for `:` and we end up with `BINANCE:KMDBTC`, which represents the exchange and pair displayed on the graph.

For each graph available for the coin on Trading View, you can PR to add its ID to [Constants/General.qml](https://github.com/KomodoPlatform/atomicDEX-Desktop/blob/dev/atomic_defi_design/Dex/Constants/General.qml#L487)

The format looks like `"KMD/BTC": "BINANCE:KMDBTC"`. Only one graph ID per pair is required.


## Update Style.qml 

This is the easy bit! Just add a key/value entry with the coins ticker as key and a [hex color](https://www.color-hex.com/) as the value. Make sure the color you choose has good contrast against the lite and dark theme backgrounds.

By default, Network tokens will use the [same color](https://github.com/KomodoPlatform/atomicDEX-Desktop/blob/dev/atomic_defi_design/Dex/Constants/Style.qml#L241) as their parent chain. For example, a QRC-20 token will use the same hex color as QTUM. 

## Upload a Coin Icon

Generally the best quality icon image would be sourced directly from the project developing the coin. Alternatively, it could be sourced from a 3rd party such as [http://cryptoicons.co/](http://cryptoicons.co/), a block explorer, [CoinPaprika](https://coinpaprika.com), [CoinGecko](https://www.coingecko.com), or [Nomics](https://nomics.com)

If you have [created a new smart chain](../smart-chains/smart-chain-tutorials/create-a-default-smart-chain.html) and need a designer to help with creating an icon, there is much talent within the [Komodian community](https://discord.gg/53dxfFWj3x)

## Update qml.qrc

This file defines resources such as images to be used in the Desktop app. To make sure the app is aware of the icon you;ve uploaded, all you need to do is add an entry into this file with the path to your icon (relative to the qml.qrc file).

For example, `<file>assets/images/coins/minds.png</file>`

## Submit the Pull Request

If you are new to Github, you'll need to make an account first, and might want to read their [Pull Request Guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

Next, fork the [AtomicDEX-Desktop repository](https://github.com/KomodoPlatform/atomicDEX-Desktop/), and once you have made the required updates in your fork, make the [pull request](https://github.com/KomodoPlatform/atomicDEX-Desktop/compare)

The Komodo Platform Team will review your updates, and if anything needs fixing they will leave a comment detailing any changes that are needed before it is approved. Once approved, your updates will be merged into the `dev` branch, and upon release of the next version of [AtomicDEX-Desktop](https://github.com/KomodoPlatform/atomicDEX-Desktop), your coin will be available in the app.

