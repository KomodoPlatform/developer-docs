# Prerequisites for a coin to be compatible with Komodo DeFi Framework

Before a coin can be listed in Komodo DeFi Framework, it needs to be confirmed for compatibility, and present within the [Komodo Platform coins repository](https://github.com/KomodoPlatform/coins).

The information below details the requirements for creating a working coins configuration file and submitting a successful pull request to the [coins repository](https://github.com/KomodoPlatform/coins/tree/readme-update). Please contact our support team in the `#dev-support` channel on the [Komodo Platorm Discord](https://komodoplatform.com/discord) if you have any questions or need assistance with performing a [test swap](https://github.com/KomodoPlatform/coins/tree/master/swaps).

## 1. Coins JSON config (required)

## 1a. General parameters for all coins

Different platforms & protocols vary slightly in what data is required. Review the parameter descriptions and examples below to understand what information is needed to list your coin.

| Parameter              | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                   | string  | Ticker of the coin/token. If the coin is a token, please use `COIN-PROTOCOL` as ticker, eg `USDC-BEP20`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| name                   | string  | This is the value which is expected to be default data directory name for that coin - e.g. if coin's name is `litecoin` then it's expected data directory on `~/.litecoin/` on Linux, `~/Library/Applications Support/Litecoin/` on Mac, `%AppData%\Litecoin` on Windows. Please keep this key's value in small letters only.                                                                                                                                                                                                                                                      |
| fname                  | string  | The full name of the coin/token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| mm2                    | integer | Indicates trading compatibility with Komodo DeFi Framework. `1` is compatible, `0` is not compatible. Non-compatible coins may still be listed as `wallet only` in Komodo Wallet apps.                                                                                                                                                                                                                                                                                                                                                                                             |
| required_confirmations | integer | Defaults to `1`. The number of confirmations KomoDeFi will wait for during the swap. WARNING, this setting affects the security of the atomic swap. 51% attacks (double spending) are a threat and have been succesfully conducted in the past. You can find a collection of coins and the theoretical cost of a 51% attack [here](https://www.crypto51.app/). Please be aware that some of the coins supported by the Komodo DeFi Framework may be vulnerable to such attacks, so consider using higher confirmation values for them, especially when dealing with large amounts. |
| requires_notarization  | boolean | Defaults to `false`. For coins protected by [dPoW](https://komodoplatform.com/51-attack-how-komodo-can-help-prevent-one/) can be set to `true` wait for a notarization when sending transactions during a swap. If `true`, `"required_confirmations"` must be set to `2` or higher.                                                                                                                                                                                                                                                                                                |
| decimals               | integer | Defines the number of digits after the decimal point that should be used to display the orderbook amounts, balance, and the value of inputs to be used in the case of order creation or a `withdraw` transaction. The default value used for a UTXO type coin (Bitcoin Protocol) is `8` and the default value used for a ERC20 Token is `18`. It is **very important** for this value to be set correctly. For example, if this value was set as `9` for BTC, a command to withdraw `1 BTC` tries to withdraw `10^9` satoshis of Bitcoin, i.e., `10 BTC`                           |
| protocol               | string  | Contains the coin protocol `"type"` (UTXO, ETH, etc.) and specific protocol configuration - `"protocol_data"` object that can have arbitrary format.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| orderbook_ticker       | string  | If set, coins with the same value will share the same orderbook. For example, if `BTC-Segwit` and `BTC-BEP20` are set with `"orderbook_ticker":"BTC"` the same orderbook is returned for KMD/BTC, KMD/BTC-BEP20 and KMD/BTC-Segwit pairs.                                                                                                                                                                                                                                                                                                                                          |
| sign_message_prefix    | string  | Optional, required to allow for message signing in Komodo DeFi Framework. Can normally be found within a projects github repository [[example](https://github.com/KomodoPlatform/komodo/blob/master/src/main.cpp#L146)] and follows a standard format like `"Komodo Signed Message:\n"`                                                                                                                                                                                                                                                                                            |

## 1b. UTXO coins (BTC, LTC, KMD, ZEC, DASH, DOGE, DGB)

The following rpc methods should be available.

```bash
estimatefee
getblock
getblockhash
getinfo
getrawtransaction
gettxout
importaddress
listunspent
listreceivedbyaddress
listtransactions
sendrawtransaction
```

| Parameter            | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                 | string  | This is the value which is expected to be default data directory name for that coin - e.g. if coin's name is `litecoin` then it's expected data directory on `~/.litecoin/` on Linux, `~/Library/Applications Support/Litecoin/` on Mac, `%AppData%\Litecoin` on Windows. Please keep this key's value in small letters only.                                                                                                                                                                                                                                                           |
| rpcport              | integer | The coin's default RPC port. It is expected that it doesn't conflict with any existing coin in the coins db.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| pubtype              | integer | This information can be found in source code of a coin project in files like `src/init.cpp`, `src/base58.h`, and `src/chainparamsbase.h` if the project is following the **bitcoin** source code directory/files structure. If unsure, then please have these confirmed by that coin/project's developers to ensure it is correct.                                                                                                                                                                                                                                                      |
| p2shtype             | integer | This information can be found in source code of a coin project in files like `src/init.cpp`, `src/base58.h`, and `src/chainparamsbase.h` if the project is following the **bitcoin** source code directory/files structure. If unsure, then please have these confirmed by that coin/project's developers to ensure it is correct.                                                                                                                                                                                                                                                      |
| wiftype              | integer | This information can be found in source code of a coin project in files like `src/init.cpp`, `src/base58.h`, and `src/chainparamsbase.h` if the project is following the **bitcoin** source code directory/files structure. If unsure, then please have these confirmed by that coin/project's developers to ensure it is correct.                                                                                                                                                                                                                                                      |
| txfee                | integer | The default transaction fee (in satoshi). Komodefi uses this as the default transaction fee value when making atomic swap transactions. If set to `0`, KomoDefi will use a dynamic fee based on output from `estimatesmartfee`.                                                                                                                                                                                                                                                                                                                                                         |
| overwintered         | integer | Must be `1` if Overwinter upgrade was activated for the coin. Defaults to `0`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| taddr                | integer | Optional. Is only relevant for coins that forked the Zcash protocol and have both transparent addresses and z-addresses. The value to be set for this key can be found from the file `src/chainparams.cpp` of the coin's source code and it is the first value present in both `base58Prefixes[PUBKEY_ADDRESS]` and `base58Prefixes[SCRIPT_ADDRESS]`. But it has to be converted to decimal from HEX. So if `base58Prefixes[PUBKEY_ADDRESS]` = `{0x1C,0xB8}` , the `taddr` is `0x1C` coverted to decimal. As 0x1C in HEX = 28 in decimal, the entry in the json would be `"taddr" : 28` |
| force_min_relay_fee  | boolean | If `true` for coins with dynamic fees, when a new transaction is generated, Komodo DeFi Framework will check whether the total fee set (`sat * tx size`) is lower than relay fee and will use the relay fee instead. Defaults to `false`                                                                                                                                                                                                                                                                                                                                                |
| mtp_block_count      | integer | Optional. Number of blocks to be used for the calculation of `median time past`. Must be greater than `0`. Default value is `11`. While this parameter is applicable only in the case of KMD reward calculation for now, it will be used for calculating locktimes to be set for the atomic swap refund transactions.                                                                                                                                                                                                                                                                   |
| estimate_fee_mode    | string  | Sets the fee mode for the `estimatesmartfee` call. Supported values are: `ECONOMICAL`,`CONSERVATIVE`, `UNSET`. Please note that some coins may not support some of these modes. Makes no effect for coins that do not have the `estimatesmartfee` RPC.                                                                                                                                                                                                                                                                                                                                  |
| address_format       | Object  | Optional. Defines whether to use the standard bitcoin address format or the cash address format for BCH. More formats may be added in the future. Possible values as of now: `"address_format":{"format":"standard"}` to set the standard BTC/UTXO address format. `"address_format":{"format":"cashaddress","network":"NETWORK_ID"}` to use BCH specific address format. `NETWORK_ID` can be: `bitcoincash` for BCH mainnet, `bchtest` for BCH testnet and `bchreg` for BCH regtest.                                                                                                   |
| isPoS                | integer | Optional, defaults to `0`. A value of `1` indicates the coin uses proof of stake, so transactions created will have the `nTime` field.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| segwit               | Boolean | If `true`, Komodo DeFi Framework will use to `P2SH` segwit addresses.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| version_group_id     | integer | Optional, used by Zcash (and its forks') transactions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| consensus_branch_id  | integer | Optional, used in Zcash (and its forks') transactions' signature hash calculation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| mature_confirmations | integer | Number of blockchain confirmations required for coinbase output to be considered mature (spendable).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### UTXO coin example

```json
{
  "coin": "LTC",
  "name": "litecoin",
  "fname": "Litecoin",
  "rpcport": 9332,
  "pubtype": 48,
  "p2shtype": 50,
  "wiftype": 176,
  "txfee": 0,
  "dust": 5460,
  "segwit": true,
  "mm2": 1,
  "required_confirmations": 2,
  "avg_blocktime": 2.5,
  "protocol": {
    "type": "UTXO"
  }
}
```

### Antara smartchain example

```json
{
  "coin": "MCL",
  "asset": "MCL",
  "fname": "MarmaraCreditLoops",
  "rpcport": 33825,
  "txversion": 4,
  "overwintered": 1,
  "mm2": 1,
  "required_confirmations": 5,
  "requires_notarization": false,
  "avg_blocktime": 1,
  "protocol": {
    "type": "UTXO"
  }
}
```

## 1c. EVM-like tokens (ETH/ERC20, MATIC/PLG20, BNB/BEP20)

The token's contract **must** have `approve` and `transferFrom` methods. Additionally, the `transfer` and `transferFrom` methods must return a boolean value (`true/false`) indicating whether a transfer was successful. This requirement is actually a part of the ERC20 standard, but many tokens seem to not follow it.

- `chain_id` - ID of the chain, see [Chainlist](https://chainlist.org/)
- Protocol `"type"` field: `"ETH"` or `"ERC20"`
- Protocol `"protocol_data"` field (ERC20 only): `"platform"` - `"ETH"`, `"ETC"` or other Ethereum forks. `"contract_address"` - ERC20 token [checksummed](https://coincodex.com/article/2078/ethereum-address-checksum-explained/) smart contract address.

| Parameter                               | Type    | Description                                                                                                                                                                                                        |
| --------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| chain_id                                | integer | To find the EVM chain ID, see [Chainlist](https://chainlist.org/)                                                                                                                                                  |
| protocol.type                           | string  | Platform / protocol - e.g `ETH` for Ethereum, `ERC20` for ERC20 tokens on the Ethereum network                                                                                                                     |
| protocol.protocol_data                  | object  | Required for tokens only.                                                                                                                                                                                          |
| protocol.protocol_data.platform         | string  | The parent coin of the token's platform - e.g `MATIC` for PLG20 tokens                                                                                                                                             |
| protocol.protocol_data.contract_address | string  | **Must be mixed case** The indentifying hex string for the token's contract. Can be found on sites like [EthScan](https://etherscan.io/), [BscScan](https://bscscan.com/) & [PolygonScan](https://polygonscan.com/ |

### ERC20 token example

```json
{
  "coin": "USDC-ERC20",
  "name": "usdc_erc20",
  "fname": "USD Coin",
  "rpcport": 80,
  "mm2": 1,
  "chain_id": 1,
  "required_confirmations": 3,
  "avg_blocktime": 0.25,
  "protocol": {
    "type": "ERC20",
    "protocol_data": {
      "platform": "ETH",
      "contract_address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    }
  }
}
```

### BEP20 token example

```json
        {
                "coin": "USDC-BEP20",
                "name": "usdc_bep20",
                "fname": "USD Coin",
                "rpcport": 80,
                "mm2": 1,
                "chain_id": 56,
                "avg_blocktime": 0.05,
                "required_confirmations": 3,
                "protocol": {
                        "type": "ERC20",
                        "protocol_data": {
                                "platform": "BNB",
                                "contract_address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
                        }
                }
        },
```

## 1d. QRC20 tokens

QTUM & QRC20 tokens are a special case which also support all fields of UTXO specific config.

```json
{
  "coin": "QC-QRC20",
  "name": "qtum",
  "fname": "Qcash",
  "rpcport": 3889,
  "pubtype": 58,
  "p2shtype": 50,
  "wiftype": 128,
  "segwit": true,
  "txfee": 0,
  "mm2": 1,
  "required_confirmations": 3,
  "mature_confirmations": 500,
  "avg_blocktime": 2.133,
  "protocol": {
    "type": "QRC20",
    "protocol_data": {
      "platform": "QTUM",
      "contract_address": "0xf2033ede578e17fa6231047265010445bca8cf1c"
    }
  }
}
```

## 2. Icon file (required)

- The icon file is required.
- Icon must be a .png format file.
- Dimensions of icon file is at least 128x128 pixels.
- Icon file name MUST be the coin/token ticker in **small letters** without protocl suffix - e.g. for KMD or KMD-BEP20, use `kmd.png`.
- Icon file location is [icons_original](https://github.com/KomodoPlatform/coins/tree/master/icons_original) folder.

## 3. Explorer URL (required, excluding tokens)

- Tokens do not need this data, they will use the values for their parent coin.
- Explorer file name must be coin's ticker name in all **capital** letters.
- Explorer file name must not have any file extension. It is a file without any `.` extension.
- It must have a valid JSON array with at least one Explorer URL in it. Multiple explorer URLs are recommended - e.g. `["https://komodod.com/","https://kmd.explorer.dexstats.info/"]`
- Add the path suffixes for the explorer's address and transaction URLs in [explorer_paths.json](https://github.com/KomodoPlatform/coins/blob/master/explorers/explorer_paths.json)

## 4. Electrum Servers (Optional; Required for listing in Mobile GUIs)

- Electrum file name must be coin's ticker name in all **capital** letters.
- Electrum file name must not have any file extension. It is a file without any `.` extension.
- It must be a valid JSON format as shown in the following example:
- Details of at least 2 Electrum servers must be provided.
- The address and port of electrum server are required. The address of electrum server can either be a DNS or an IP address.
- Protocol can be "SSL" or "TCP". For WebDEX (wasm) listings, SSL is required.
- Contact information must be provided in case the server admin needs to be contacted in emergency situations. Failing servers will result in an automatic delisting of your coin upon the next release of the Komodo Wallet apps.
- The status of currently listed [ElectrumX](https://electrumx.readthedocs.io/en/latest/) servers is monitored via a public [API](https://electrum-status.dragonhound.info/api/v1/electrums_status) and [Dashboard](https://stats.kmd.io/atomicdex/electrum_status/). For help setting up Telegram or Discord alerts for your servers, join the `#dev-support` channel in the [Komodo Platform Discord](https://komodoplatform.com/discord).

```JSON
[
  {
    "url": "nmc.bitcoins.sk:50002",
    "protocol": "SSL",
    "disable_cert_verification": true,
    "contact": [
      {"email": "electrum1_admin_email@example.com"},
      {"matrix": "@electrum1_admin:matrix.org"},
      {"skype": "example_username"},
      {"twitter": "example_username"},
      {"reddit": "example_username"},
      {"github": "example_username"},
      {"keybaseio": "example_username"}
    ]
  },
  {
    "url": "electrum-nmc.le-space.de:50002",
    "protocol": "SSL",
    "disable_cert_verification": false,
    "contact": [
      {"email": "electrum2_admin_email@example.com"}
    ]
  }
]
```

## 5. Ethereum info file (Required for EVM-like platforms)

- Ethereum file name must be coin's ticker name in all **capital** letters.
- Ethereum file name must not have any file extension. It is a file without any `.` extension.
- Swap contract address must be the address of [etomic swap smart contract](https://github.com/artemii235/etomic-swap) deployed to ETH network, [example](https://etherscan.io/address/0x8500afc0bc5214728082163326c2ff0c73f4a871).
- At least minimum 2 or more URLs of RPC nodes must be provided.
- Contact information must be provided in case the server admin needs to be contacted in urgent cases. It can be any contact information out of the examples provided.
- The RPC node URL can either be a DNS or an IP address with port.
- It must be a valid JSON format as shown in the following example:

```JSON
{
  "swap_contract_address":"0x8500AFc0bc5214728082163326C2FF0C73f4a871",
  "rpc_nodes": [
      {
        "url":"http://ethnode.com:8545",
        "contact": [
          {"email": "ethnode_admin_email@example.com"},
          {"matrix": "@ethnode_admin:matrix.org"},
          {"skype": "example_username"},
          {"twitter": "example_username"},
          {"reddit": "example_username"},
          {"github": "example_username"},
          {"keybaseio": "example_username"}
        ]
      },
      {
        "url":"http://ethnode2.com:8545",
        "contact": [
          {"email": "ethnode2_admin_email@example.com"}
        ]
      }
  ]
}
```

## 5. Forex, Nomics, CoinGecko & CoinPaprika Price IDs (optional)

The API IDs are stored in json files within the `/api_ids` folder, and used to source price and chart date in Komodo Wallet apps.

For [CoinGecko](https://www.coingecko.com/en/coins/komodo) it is conveniently displayed on the right had side of a coins page as below -

<img src="/api_images/gecko_api.png" />

For [CoinPaprika](https://coinpaprika.com/coin/kmd-komodo/) it is the same as displayed in a coin's URL -

<img src="/api_images/paprika_api.png" />

For [Nomics](https://nomics.com/assets/kmd-komodo/widget) you can find it under the "widget" tab for a coin.

<img src="/api_images/nomics_api.png" />

For For Forex the API ID is the same as the [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217).

Add these IDs to their respective json file within the `/api_ids` folder in the format `"TICKER": "API_ID"`

## 6. Derivation Path

The [BIP44 derivation path](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) is now required to ensure Heirarchical deterministic wallet functionality. The best source for this data is via [Satoshi Labs SLP-044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)

## 7. Trezor coin name (optional)

For Trezor compatibility, this field is required. You can find this value at [https://trezor.io/coins](https://trezor.io/coins). Not all coins are listed on this page by default, but if compatible can be found by searching the supported coins. The value is the name of the coin in larger black text (not the grey text in brackets). E.g. for the image below, the Trezor coin name would be `Qtum`.

<img src="/api_images/qtum.png" />

## 8. Successful swap confirmation

The coin must have participated in a successful Atomic Swap using [Komodo DeFi Framework](https://github.com/KomodoPlatform/atomicDEX-API/)

When submitting your coin addition request, please submit the URLs of the 5 transactions (`takerfee sent`, `maker payment`, `taker payment` and `taker payment spent`, `maker payment spent`) produced by successful swap in a new file inside the [swaps directory](swaps)- here's an [example for KMD-ETH](https://github.com/KomodoPlatform/coins/blob/master/swaps/KMD-ETH.md). This means that, before going through the further steps and submitting the information to this coins database repo, you would have performed a successful atomic swap. The further steps explain the expected files/values to be submitted.

You can learn about performing an atomic swap from our documentation at [this link](https://developers.komodoplatform.com/basic-docs/atomicdex/atomicdex-tutorials/introduction-to-atomicdex.html)

Activating a coin: [https://developers.komodoplatform.com/basic-docs/atomicdex-api-legacy/coin_activation.html](https://developers.komodoplatform.com/basic-docs/atomicdex-api-legacy/coin_activation.html)

Walkthrough: [https://developers.komodoplatform.com/basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.html](https://developers.komodoplatform.com/basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.html)

If you have any questions, please ask in the `#support` channel in [our Discord server](https://komodoplatform.com/discord) or you can get help from the team at coinintegration@komodoplatform.com or partners@komodplatform.com .
