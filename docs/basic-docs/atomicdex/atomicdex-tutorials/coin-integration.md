# Get your Coin/Token/Asset listed on the AtomicDEX-API

- Below is a breakdown of the information needed from the source code and coin parameters. The first step is to gather all the information below and contact (Username: `@cipi#4502` in [our Discord server](https://komodoplatform.com/discord/)) our specialists for review.
- For ETH compatibles go to: [How to Add new ERC20 Tokens to MarketmakerV1](./coin-integration.html#how-to-add-new-erc20-tokens-in-atomicdex)
- The exact steps to be followed for submitting a Pull Request on Github are described [here.](./info-add-coin.html)

## Coin Spec

The Proposed coin must have support for the following API calls and must have BIP65 implemented.

```bash
estimatefee
getblock
getblockhash
getinfo
getrawmempool
getrawtransaction
gettxout
importaddress
importprivkey
listunspent
listreceivedbyaddress
listtransactions
sendrawtransaction
signrawtransaction
validateaddress
```

## Information Required

### Example

- **Coin Ticker** : LTC
- **Coin Name**: litecoin
- **rpcport** : 9332
- **pubtype** : 48
- **taddr** : 0
- **p2shtype** : 50
- **wiftype** : 176
- **txfee** : 1000000
- **active** : 1

### Details to take note of

1. After getting confirmation from our specialists, submit an icon to the `icons` directory of the repository: [https://github.com/KomodoPlatform/coins](https://github.com/KomodoPlatform/coins) through a Pull Request.
1. AtomicDEX-API uses the info of a coin in the file: [https://github.com/KomodoPlatform/coins/blob/master/coins](https://github.com/KomodoPlatform/coins/blob/master/coins) to perform atomic-swaps.
1. The explorer repository of the proposed coin contains some of the info required to connect AtomicDEX-API to the coin's own explorer infrastructure.
1. The coin devs will have to send us a small amount of the proposed coin to test the swaps with.
1. Electrum servers are in the electrums-directory. Every coin has its own file there: [https://github.com/KomodoPlatform/coins/tree/master/electrums](https://github.com/KomodoPlatform/coins/tree/master/electrums)

### Json Example

```json
{
  "coin": "LTC",
  "name": "litecoin",
  "active": 1,
  "rpcport": 9332,
  "pubtype": 48,
  "p2shtype": 50,
  "wiftype": 176,
  "txfee": 100000
}
```

### Note

The key **taddr** , is for zcash forks. It refers to the coin having transparent and zaddresses. The value that has to be passed is the value taken from the file `src/chainparams.cpp` from the wallets source code and it is the first value present in both `base58Prefixes[PUBKEY_ADDRESS]` and `base58Prefixes[SCRIPT_ADDRESS]`, but converted to decimal, not the HEX. So if `base58Prefixes[PUBKEY_ADDRESS]` = **{0x1C,0xB8}** , the `taddr` is 0x1C coverted to decimal: 0x1C in HEX = 28 in decimal. the **"taddr"** : **28**

## Search for the information in the source Repository of a coin

All of the information and parameters required are normally contained within but not limited to these files (depends on your coin):

- `init.cpp`: [https://github.com/litecoin-project/litecoin/blob/master/src/init.cpp](https://github.com/litecoin-project/litecoin/blob/master/src/init.cpp)
- `base58.h`: [https://github.com/litecoin-project/litecoin/blob/master/src/base58.h](https://github.com/litecoin-project/litecoin/blob/master/src/base58.h)
- `chainparamsbase.h`: [https://github.com/litecoin-project/litecoin/blob/master/src/chainparamsbase.h](https://github.com/litecoin-project/litecoin/blob/master/src/chainparamsbase.h)

## Additional Information

- Lead developer's Github account
- Bitcointalk Account
- Information about the team and purpose of the coin
- Social Media Accounts

## Contact Us

Once the information is collected, please contact us via email: [coinintegration@komodoplatform.com](mailto:coinintegration@komodoplatform.com) or in the `#mm_2_0` channel in [our Discord server](https://komodoplatform.com/discord) and request a coin addition. Provide us with all the relevant information and our specialists will get in touch.

## How to Add new ERC20 Tokens in BarterDEX

Adding ERC20 tokens in BarterDEX is very easy. We just need some information about the token.

### Requirements

- `approve` and `transferFrom` methods are a must for the swaps to work
- Contract address
- Ticker Symbol
- Name of the token
- CoinMarketCap name (for the autoprice with CMC to work)
- Token Logo
- Some tokens for testing
- rpcport is same for all tokens in BarterDEX

The following is an example using OmiseGo (OMG)

```json
{
  "coin": "OMG",
  "name": "omisego",
  "fname": "OmiseGo",
  "etomic": "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
  "rpcport": 80
}
```

## Contact Us

Once the information is collected, please contact us via email: [coinintegration@komodoplatform.com](mailto:coinintegration@komodoplatform.com) or in the `#dev-tradebots` channel in our [Discord](https://komodoplatform.com/discord) and request a coin addition. Provide us with all the relevant information and our specialists will get in touch.

You can send some tokens to test to the following BarterDEX test engineers.

Cipi: `0xdf38dd108bab50da564092ad0cd739c4634d963c`
