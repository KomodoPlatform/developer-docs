# Trading

Default timeout for a trade is 10 seconds, which means if no response, must wait 10 seconds between trade requests. It will generate an error if Alice tries to submit a trade while a previous request is pending.

However if the other side responds, you can do another trade and we are seeing virtually instant responses from the live FR (Full Relay) nodes.

## Trade Negotiation Sequence:

```bash
Alice submits a "request" to the Bob node.
Now we are in a pending state for up to 10 seconds.
Bob responds with a "reserved", which releases Alice from the pending state.
For the request that comes back, Alice can reject it or accept it and send a "connect" message.
Finally Bob returns a "connected" message and the atomic swap begins.
```

James has also added automated broadcast of any setprices, which will occur automatically when you do a buy/sell for the coin you are buying with, as long as you are not using Electrum.

To be a bob, you need the native coin. With the pruning of the orderbook to most recent 2 minutes, it required the setprice to be called regularly.

This function is internalized, so a single setprice is all that is needed. If you want to "cancel" it you can setprice to 0. GUI can now post bob orders if you have native coins enabled.

Using the `buy/sell` api is a fill or kill (except partial fills are allowed) and to put a limit order, `autoprice` needs to be used. The `autoprice` is a bit tricky to use, make sure you don't make the example backwards.

Note: To fully cancel an autotrade, `setprice 0` needs to be called twice, once with `base/rel` and then with `rel/base`, since there are actually 2 prices (bid and ask).

## autoprice

`autoprice` is a very powerful API and it allows you to specify the price for a specific trading pair that is automatically updated as the market price of it changes. barterDEX uses external price sources (Bittrex, Cryptopia, Coinmarketcap) to get up to date prices. You can use fixed price instead of `margin` or use autoprice based on coinmarketcap. For now, it is a relatively simple set of things you can do with the following fields (`base, rel, fixed, minprice, maxprice, margin, refbase, refrel, factor, offset`).

Sample File Contents:

```bash
#!/bin/bash
margin=0.05
source userpass

# KMD/BTC must be first as other prices depend on it
#curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"BTC\",\"margin\":$margin,\"refbase\":\"komodo\",\"refrel\":\"coinmarketcap\"}"
#curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BTC\",\"rel\":\"KMD\",\"fixed\":0.00025,\"margin\":$margin}"
#curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"BTC\",\"fixed\":4000,\"margin\":$margin}"
curl --url "http://127.0.0.1:7783" --data "{\"minprice\":0.0003,\"maxprice\":0.001,\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"BTC\",\"margin\":0.05,\"refbase\":\"komodo\",\"refrel\":\"coinmarketcap\"}"

./auto_chipskmd
./auto_chipsbtc

#curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"MNZ\",\"offset\":0.0,\"refbase\":\"KMD\",\"refrel\":\"BTC\",\"factor\":15000,\"margin\":-0.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HUSH\",\"rel\":\"KMD\",\"margin\":$margin,\"refbase\":\"hush\",\"refrel\":\"coinmarketcap\"}"
#curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"BTCH\",\"offset\":0.0,\"refbase\":\"KMD\",\"refrel\":\"HUSH\",\"factor\":1.44,\"buymargin\":0.05,\"sellmargin\":0.05}"
#curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BTCH\",\"rel\":\"KMD\",\"offset\":0.0,\"refbase\":\"HUSH\",\"refrel\":\"KMD\",\"factor\":0.7,\"buymargin\":0.05,\"sellmargin\":0.05}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BEER\",\"rel\":\"PIZZA\",\"fixed\":0.0001,\"margin\":0.00001}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BEER\",\"rel\":\"ETOMIC\",\"fixed\":10,\"margin\":0.00001}"

source crypto
source trackbtc

#source jumblr
#source trackbtc

source pangea
source trackbtc

source bet
source trackbtc

#source revs
#source trackbtc

sharkholdings="{\"coin\":\"iota\",\"balance\":1500000}, {\"coin\":\"komodo\",\"balance\":120000}, {\"coin\":\"bitcoin-cash\",\"balance\":1200}, {\"coin\":\"bitcoin\",\"balance\":100}"
curl --url "http://127.0.0.1:7783" --data "{\"base\":\"MSHARK\",\"rel\":\"KMD\",\"fundvalue_bid\":\"NAV_KMD\",\"fundvalue_ask\":\"assetNAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"margin\":$margin,\"address\":\"RTu3JZZKLJTcfNwBa19dWRagEfQq49STqC\",\"holdings\":[$sharkholdings],\"divisor\":1400000}"

curl --url "http://127.0.0.1:7783" --data "{\"margin\":$margin,\"base\":\"SUPERNET\",\"rel\":\"KMD\",\"fundvalue_bid\":\"NAV_KMD\",\"fundvalue_ask\":\"NAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"address\":\"RRyyejME7LRTuvdziWsXkAbSW1fdiohGwK\",\"holdings\":[{\"coin\":\"iota\",\"balance\":11000000}, {\"coin\":\"stratis\",\"balance\":1300000}, {\"coin\":\"zcash\",\"balance\":0.10000}, {\"coin\":\"syscoin\",\"balance\":20000000}, {\"coin\":\"waves\",\"balance\":700000}, {\"coin\":\"bitcoin\",\"balance\":600}, {\"coin\":\"bitcoin-cash\",\"balance\":1500}, {\"coin\":\"heat-ledger\",\"balance\":2323851 }, {\"coin\":\"decred\",\"balance\":0.20000}, {\"coin\":\"vericoin\",\"balance\":2199368 }, {\"coin\":\"byteball\",\"balance\":4238}, {\"coin\":\"iocoin\",\"balance\":0.150000}, {\"coin\":\"quantum-resistant-ledger\",\"balance\":0.375000}, {\"coin\":\"chips\",\"balance\":2577006 }, {\"coin\":\"hush\",\"balance\":100000 }, {\"coin\":\"mobilego\",\"balance\":100000 }],\"divisor\":612529}"

curl --url "http://127.0.0.1:7783" --data "{\"margin\":$margin,\"base\":\"HODL\",\"rel\":\"KMD\",\"fundvalue_bid\":\"assetNAV_KMD\",\"fundvalue_ask\":\"assetNAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"address\":\"RNcUaMUEFLxVwtTo7rgruhwYanGk1jTkeU\",\"holdings\":[{\"coin\":\"siacoin\",\"balance\":185000000,\"comment\":\"using siafunds equal to million siacoin\"}],\"divisor\":10000000}"

dexholdings="{\"coin\":\"blocknet\",\"balance\":2500000}"

curl --url "http://127.0.0.1:7783" --data "{\"base\":\"DEX\",\"rel\":\"KMD\",\"margin\":$margin,\"fundvalue_bid\":\"assetNAV_KMD\",\"fundvalue_ask\":\"assetNAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"address\":\"RThtXup6Zo7LZAi8kRWgjAyi1s4u6U9Cpf\",\"holdings\":[$dexholdings],\"divisor\":1000000}"

curl --url "http://127.0.0.1:7783" --data "{\"base\":\"BOTS\",\"rel\":\"KMD\",\"margin\":$margin,\"fundvalue_bid\":\"assetNAV_KMD\",\"fundvalue_ask\":\"assetNAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"address\":\"RNdqHx26GWy9bk8MtmH1UiXjQcXE4RKK2P\",\"holdings\":[$dexholdings],\"divisor\":3333333}"

curl --url "http://127.0.0.1:7783" --data "{\"base\":\"JUMBLR\",\"rel\":\"KMD\",\"margin\":$margin,\"fundvalue_bid\":\"assetNAV_KMD\",\"fundvalue_ask\":\"assetNAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"address\":\"RGhxXpXSSBTBm9EvNsXnTQczthMCxHX91t\",\"holdings\":[$dexholdings],\"divisor\":3333333}"

curl --url "http://127.0.0.1:7783" --data "{\"base\":\"MGW\",\"rel\":\"KMD\",\"margin\":$margin,\"fundvalue_bid\":\"assetNAV_KMD\",\"fundvalue_ask\":\"assetNAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"holdings\":[$dexholdings],\"divisor\":13000000}"

curl --url "http://127.0.0.1:7783" --data "{\"base\":\"REVS\",\"rel\":\"KMD\",\"margin\":$margin,\"fundvalue_bid\":\"assetNAV_KMD\",\"fundvalue_ask\":\"assetNAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"holdings\":[$dexholdings],\"divisor\":9000000}"
```

Sample Output:

```json
{
          "result": "success"
},
{
          "result": "success"
}
.......
```

### Knowledge Base:

`refbase` and `refrel` allow you to specify a different base/rel pair as the basis for the price, if there is no `refbase` and `refrel`, the the base/rel price from external sources is used as the starting point. This is calculated approximately once per minute and a set price done automatically:

```bash
setprice of (1. + margin) * ((price * factor) + offset)
```

The margin is usually set to 0.01 for 1% profit margin. using factor and offset it is possible to map a starting price to a standard multiple.

There is also a minprice field which sets the absolute minimum (post calculation) price that is accepted.

### Example `autoprice` script using coinmarketcap prices.

```bash
curl --url "http://127.0.0.1:7783" --data "{\"minprice\":0.00002,\"maxprice\":0.0001,\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CHIPS\",\"rel\":\"BTC\",\"margin\":0.05,\"refbase\":\"chips\",\"refrel\":\"coinmarketcap\"}"
```

or

```bash
curl --url "http://127.0.0.1:7783" --data "{\"minprice\":0.04,\"maxprice\":0.1,\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CHIPS\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"chips\",\"refrel\":\"coinmarketcap\"}"
```

### `autoprice` the value of a fund, ie. using the `fundvalue` api

The way to do is it start with the `fundvalue` api call, then change the `method` to `autoprice`. Add `base` and `rel` and most importantly `fundvalue_bid` and `fundvalue_ask` that will be values in the return of the fundvalue call. Additionally, `margin` is applied. This sounds complicated and it is, but now MSHARK, HODL and even SUPERNET are running using this autoprice. The following sample content is an example how to use it.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"base\":\"MSHARK\",\"rel\":\"KMD\",\"fundvalue_bid\":\"NAV_KMD\",\"fundvalue_ask\":\"assetNAV_KMD\",\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"address\":\"RTu3JZZKLJTcfNwBa19dWRagEfQq49STqC\",\"holdings\":[{\"coin\":\"iota\",\"balance\":5000000}],\"divisor\":1400000}"
```

Sample Output:

```json
{
  "result": "success"
}
```

### autoprice using usdpeg

There is a way for autoprice coinmarketcap to do USD pegs for orderbooks denominated in any coin. The syntax is pretty arbitrary but it works.

Make sure the `usdpeg` is set to non-zero. In that case put in the orderbook BACKWARDS (dont ask me why, it just works only in this way) for the coin that is the coinmarketcap refbase. Based on the example it is KMD so base KMD and rel OOT, will create OOT/KMD orderbooks using factor 0.15 (fifteen cents) denominated in KMD. The example script used different margins for buymargin and sellmargin, so it works for dICO scenario (allow people to sell back but at a steep loss) and also it is backwards (dont ask me why).

What this means is if you do a base DOGE rel OOT and refbase dogecoin, it should maintain an orderbook in DOGE pegged to the 15 cents price. Any CMC coin can be used. If you want to change the price, change the value of `factor` accordingly.

Sample File Content:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"OOT\",\"factor\":0.15,\"buymargin\":0.0001,\"sellmargin\":0.2,\"refbase\":\"komodo\",\"refrel\":\"coinmarketcap\",\"usdpeg\":1}"
```

Sample Output:

```json
{
  "result": "success"
}
```

## buy

In simple terms, this command will post a buy order. If there is a matching order in the orderbooks, then this will automatically start a trade. If a match is not found, a bid order will be added in the orderbook. Buy fills asks from the orderbook using relvolume. Trade request will last as long as defined in the 'timeout' field.

Call 'recentswaps' to check the status of the trade request. Alice side does not give feedback about expired trade request, unless a 'recentswaps' call is done.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MNZ\",\"rel\":\"KMD\",\"relvolume\":0.005,\"price\":0.172}"
```

### Knowledge Base:

`base:` the currency you want to buy `rel:` the currency you are paying with `price:` the max price you are willing to pay for 1 base `relvolume:` the amount of rel you want to trade `timeout:` the amount of time Alice or Bob should wait for payment. Default: 10 seconds (might be deprecated in future) `duration:` after the specified duration it wont be displayed

Sample Output:

```json
{
  "result": "success",
  "swaps": [
    [45030989, 41860326],
    [264022270, 1424922977],
    [3882191272, 3366340834]
  ],
  "pending": {
    "expiration": 1509564162,
    "timeleft": 15,
    "requestid": 0,
    "quoteid": 0,
    "bob": "MNZ",
    "base": "MNZ",
    "basevalue": 0.02803687,
    "alice": "KMD",
    "rel": "KMD",
    "relvalue": 0.0048,
    "aliceid": 7785695213943587000
  }
}
```

## electrum

This method enables a coin by connecting to the specified electrumx server. For this method running a native node and blockchain download is not necessary. You need to edit the file with coin name and IP address and port for the coin. For a list of electrumx server check this link [http://pad.supernet.org/electrum-servers](http://pad.supernet.org/electrum-servers)

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"KMD\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10001}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"MNZ\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10002}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"REVS\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10003}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"JUMBLR\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10004}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"SUPERNET\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10005}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"DEX\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10006}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"BOTS\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10007}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"CRYPTO\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10008}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HODL\",\"ipaddr\":\"electrum1.cipig.net\",\"port\":10009}"
```

## getfee

`getfee` API will display network tx fee based on that time. This should only be required for BTC, all other coins are hardcoded.

Sample file content:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":       \"$userpass\",\"method\":\"getfee\",\"coin\":\"BTC\"}"
```

Sample file output:

```json
{
  "result": "success",
  "coin": "BTC",
  "txfee": 0.0002
}
```

## getprices

The `./getprices` API lists all currently available trading pairs and its current prices. You need to specify a `base` and `rel` coin if you need a specific pair price.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"getprices\",\"coin\":\"KMD\"}"
```

Sample Output:

```json
[
  {
    "pubkey": "040f1d2d5d12027afa2cec30477312e225b0d24c77cc4aa08d3fffe51277b904",
    "rmd160": "8784673d815a20300412a9010b72e771963d45b6",
    "pubsecp": "03829863f4ed7660fbf62b2f84b0e655f523a33f23a1f681107d2a2942987584b1",
    "timestamp": 1508160175,
    "asks": [
      ["BTC", "KMD", 3304.53174512],
      ["KMD", "BTC", 0.00030268],
      ["KMD", "REVS", 0.78551134],
      ["KMD", "JUMBLR", 0.10432527],
      ["KMD", "HUSH", 1.17931676],
      ["REVS", "KMD", 1.29051134],
      ["JUMBLR", "KMD", 9.77904977],
      ["HUSH", "KMD", 0.86507888]
    ]
  }
]
```

## goal

The `./goal` command is basically the automatic trading tool of the API. When you execute this command, orders will be set until the goals are reached. The idea is that you set the goal for each coin and if you have more than the goal for a specific coin, it will allow sales of that coin. If you have less than the goal percentage, it will allow buys of that coin.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"goal\",\"coin\":\"KMD\",\"val\":99}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"goal\",\"coin\":\"BTC\",\"val\":10}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"goal\",\"coin\":\"REVS\",\"val\":1}"
```

Sample Output:

```json
{
  "result": "success",
  "kmd_equiv": 29.03290329,
  "buycoin": "KMD",
  "buyforce": 125.75072424,
  "sellcoin": "DGB",
  "sellforce": -412.28377122,
  "portfolio": [
    {
      "coin": "BTC",
      "address": "15XAhHK4ULofD6BTckrCWK6XSkCjscX7jj",
      "amount": 0,
      "price": 3315.35638637,
      "kmd_equiv": 0,
      "perc": 0,
      "goal": 10,
      "goalperc": 9.09090909,
      "relvolume": 0,
      "force": 82.6446281,
      "balanceA": 0,
      "valuesumA": 0,
      "balanceB": 0,
      "valuesumB": 0,
      "balance": 0
    },
    {
      "coin": "KMD",
      "address": "RDoMmoCM5AcEH6Yf5vqKbqRjD1fLcQHuWb",
      "amount": 22.87390295,
      "price": 1,
      "kmd_equiv": 22.87390295,
      "perc": 78.78613696,
      "goal": 99,
      "goalperc": 90,
      "relvolume": 0,
      "force": 125.75072424,
      "balanceA": 22.6448,
      "valuesumA": 22.87390295,
      "aliceutil": 98.99840901,
      "balanceB": 22.6448,
      "valuesumB": 22.87390295,
      "balance": 22.87390295,
      "bobutil": 98.99840901
    },
    {
      "coin": "DGB",
      "address": "D9fGEYFhmkhwk6N4MLqm45G8Ksw3E2AmTR",
      "amount": 919,
      "price": 0.00670185,
      "kmd_equiv": 6.15900034,
      "perc": 21.21386304,
      "goal": 1,
      "goalperc": 0.90909091,
      "relvolume": 186.60085587,
      "force": -412.28377122,
      "balanceA": 479.499,
      "valuesumA": 919,
      "aliceutil": 52.17616975,
      "balanceB": 479.499,
      "valuesumB": 919,
      "balance": 919,
      "bobutil": 52.17616975
    }
  ]
}
```

## goals

Displays the goal percentage for each coin and their status.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"goal\"}"
```

Sample Output:

```json
{
  "result": "success",
  "kmd_equiv": 28.98048555,
  "buycoin": "BTC",
  "buyforce": 625,
  "sellcoin": "KMD",
  "sellforce": -2908.30091422,
  "base": "BTC",
  "rel": "KMD",
  "relvolume": 12.33191136,
  "portfolio": [
    {
      "coin": "BTC",
      "address": "15XAhHK4ULofD6BTckrCWK6XSkCjscX7jj",
      "amount": 0,
      "price": 3321.5219084,
      "kmd_equiv": 0,
      "perc": 0,
      "goal": 25,
      "goalperc": 25,
      "relvolume": 0,
      "force": 625,
      "balanceA": 0,
      "valuesumA": 0,
      "balanceB": 0,
      "valuesumB": 0,
      "balance": 0
    },
    {
      "coin": "KMD",
      "address": "RDoMmoCM5AcEH6Yf5vqKbqRjD1fLcQHuWb",
      "amount": 22.87391037,
      "price": 1,
      "kmd_equiv": 22.87391037,
      "perc": 78.92866505,
      "goal": 25,
      "goalperc": 25,
      "relvolume": 12.33559451,
      "force": -2908.30091422,
      "balanceA": 22.6448,
      "valuesumA": 22.87391037,
      "aliceutil": 98.9983769,
      "balanceB": 22.6448,
      "valuesumB": 22.87391037,
      "balance": 22.87391037,
      "bobutil": 98.9983769
    },
    {
      "coin": "ZEC",
      "address": "t1NPmhcjCSfbFojEMZBfKe8CShQPpkcn4W7",
      "amount": 0,
      "price": 135.89703925,
      "kmd_equiv": 0,
      "perc": 0,
      "goal": 25,
      "goalperc": 25,
      "relvolume": 0,
      "force": 625,
      "balanceA": 0,
      "valuesumA": 0,
      "balanceB": 0,
      "valuesumB": 0,
      "balance": 0
    },
    {
      "coin": "DGB",
      "address": "D9fGEYFhmkhwk6N4MLqm45G8Ksw3E2AmTR",
      "amount": 919,
      "price": 0.0066448,
      "kmd_equiv": 6.10657518,
      "perc": 21.07133495,
      "goal": 25,
      "goalperc": 25,
      "relvolume": 0,
      "force": 15.43440909,
      "balanceA": 479.499,
      "valuesumA": 919,
      "aliceutil": 52.17616975,
      "balanceB": 479.499,
      "valuesumB": 919,
      "balance": 919,
      "bobutil": 52.17616975
    }
  ]
}
```

## myprice

Shows number of bids andprices you set for a given coin. Your wallet must be active to display the prices.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"myprice\",\"base\":\"REVS\",\"rel\":\"KMD\"}"
```

Sample Output:

```json
{
  "base": "REVS",
  "rel": "KMD",
  "bid": 2,
  "ask": 0
}
```

## myprices

`./myprices` shows numer of bids and ask for your `./buy` coin pair.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"myprices\"}"
```

Sample Output:

```json
[
  {
    "base": "KMD",
    "rel": "REVS",
    "bid": 0,
    "ask": 0.5
  },
  {
    "base": "REVS",
    "rel": "KMD",
    "bid": 2,
    "ask": 0
  }
]
```

## orderbook

Displays bid/ask for a specific coin/asset pair. You can display multiple pairs, just need to edit the file and add more line. The `numutxos/minvolume/maxvolume` are the state of your local `utxo` cache. It might or might not be 100% accurate. Also, if all `0`'s it could be that it hasn't been queried yet. Even if all zeros, it is possible, even likely that there are actually `utxo` available.

If you do an `./orderbook`, it will start fetching the details from the best prices. You can do `listunspent` for a specific address, but it is not possible to know for sure what trades are possible, especially as there are other nodes that might be going after the same `utxo`. Specifically doing a `listunspent` api will also fetch the details, also doing a trade will fetch the details as well. James uses just in time fetching to get the `utxo` data. This way we don't flood the network with data for `utxo` info.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"DGB\",\"rel\":\"KMD\"}"
```

Sample Output:

```json
{
  "bids": [
    {
      "coin": "KMD",
      "address": "RB8yufv3YTfdzYnwz5paNnnDynGJG6WsqD",
      "price": 0.00492739,
      "numutxos": 13,
      "minvolume": 0.072,
      "maxvolume": 0.76,
      "pubkey": "8adbf9d5de4fb49ec1fca9ca3f28ba384715752de1197c9cddbb756c3d2a1a7c",
      "age": 16
    },
    {
      "coin": "KMD",
      "address": "RHPBQQpjVqpwWC8NrpAxdoRQAkigA2zjRo",
      "price": 0.00487791,
      "numutxos": 5,
      "minvolume": 0.00016002,
      "maxvolume": 96,
      "pubkey": "22aaf8e3686d31ee9f5ebe61c97231114717aee943ef01cc58e9f843ddad0240",
      "age": 53
    }
  ],
  "numbids": 2,
  "asks": [
    {
      "coin": "DGB",
      "address": "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8",
      "price": 0.00532946,
      "numutxos": 38,
      "minvolume": 0.00586622,
      "maxvolume": 2.20800448,
      "pubkey": "8adbf9d5de4fb49ec1fca9ca3f28ba384715752de1197c9cddbb756c3d2a1a7c",
      "age": 16
    },
    {
      "coin": "DGB",
      "address": "DDF5s9t6CRveyBwn8EBQ63FoHczNsyFsFi",
      "price": 0.0053779,
      "numutxos": 3,
      "minvolume": 0.67844886,
      "maxvolume": 7.06141621,
      "pubkey": "22aaf8e3686d31ee9f5ebe61c97231114717aee943ef01cc58e9f843ddad0240",
      "age": 53
    }
  ],
  "numasks": 2,
  "base": "DGB",
  "rel": "KMD",
  "timestamp": 1508410319
}
```

## portfolio

Shows all active coin information and value. Such as, smartaddress, balance, current price per coin in barterDEX, KMD equivalent balance, percentage of your portfolio goal. You don’t need to edit or change the script for it work. It will get information from your active wallets and display them.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"portfolio\"}"
```

Sample Output:

```json
{
  "result": "success",
  "kmd_equiv": 29.09215302,
  "buycoin": "KMD",
  "buyforce": 129.37341083,
  "sellcoin": "DGB",
  "sellforce": -418.82246271,
  "base": "ZEC",
  "rel": "DGB",
  "relvolume": 189.62190318,
  "portfolio": [
    {
      "coin": "BTC",
      "address": "15XAhHK4ULofD6BTckrCWK6XSkCjscX7jj",
      "amount": 0,
      "price": 3351.92820521,
      "kmd_equiv": 0,
      "perc": 0,
      "goal": 10,
      "goalperc": 9.09090909,
      "relvolume": 0,
      "force": 82.6446281,
      "balanceA": 0,
      "valuesumA": 0,
      "balanceB": 0,
      "valuesumB": 0,
      "balance": 0
    },
    {
      "coin": "KMD",
      "address": "RDoMmoCM5AcEH6Yf5vqKbqRjD1fLcQHuWb",
      "amount": 22.87392545,
      "price": 1,
      "kmd_equiv": 22.87392545,
      "perc": 78.62575669,
      "goal": 99,
      "goalperc": 90,
      "relvolume": 0,
      "force": 129.37341083,
      "balanceA": 22.6448,
      "valuesumA": 22.87392545,
      "aliceutil": 98.99831163,
      "balanceB": 22.6448,
      "valuesumB": 22.87392545,
      "balance": 22.87392545,
      "bobutil": 98.99831163
    },
    {
      "coin": "DGB",
      "address": "D9fGEYFhmkhwk6N4MLqm45G8Ksw3E2AmTR",
      "amount": 919,
      "price": 0.0067663,
      "kmd_equiv": 6.21822757,
      "perc": 21.37424331,
      "goal": 1,
      "goalperc": 0.90909091,
      "relvolume": 188.07475055,
      "force": -418.82246271,
      "balanceA": 479.499,
      "valuesumA": 919,
      "aliceutil": 52.17616975,
      "balanceB": 479.499,
      "valuesumB": 919,
      "balance": 919,
      "bobutil": 52.17616975
    }
  ]
}
```

## sell

This script is completely opposite of `buy` and uses the same parameters. Edit the file with specific coin pair name, volume and price.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"KMD\",\"rel\":\"BTC\",\"basevolume\":10.0,\"price\":0.0005}"
```

Sample Output:

```json
{
  "result": "success"
}
```

## setconfirms

This will allow each node to set the number of required confirms on a coin by coin basis. During the atomic swap, each side sends to the other the required confirms and the "protocol" is that both sides use the bigger value.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setconfirms\",\"coin\":\"DGB\",\"numconfirms\":1}"
```

Sample Output:

```json
{
  "result": "success"
}
```

## setprice

To create a bob `utxo` (or an ask order) you need to first set the price. To set price you need to edit the `./setprice` script in the `dexscripts` folder

Note: To fully cancel an autotrade, `setprice 0` needs to be called twice, once with `base/rel` and then with `rel/base`, since there are actually 2 prices (bid and ask). Doing `setprice 0` for an order made with `coinmarketcap api` call doesn't end it. It is likely as it has two `0`'s and you can only set one `0` at a time. The only way to stop an order made with `coinmarketcap api` is to kill `marketmaker`.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"KMD\",\"rel\":\"REVS\",\"price\":0.5}"
```

Sample Output:

```json
{
  "result": "success"
}
```

## fomo

`fomo` Fear of missing out API will allow you buy for your specified relvol at the best current orderbook price. Orderbook has to be visible for this API to work. When using `fomo` you won't get the best price. No need to `fomo` if you are able to do normal ordermatch. It adds 5% to the orderbook entry that is the biggest that fits.

Sample file content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"KMD\",\"rel\":\"HODL\",\"fomo\":40.00038}"
```

## dump

As the name suggests, you can use `dump` API to dump the coins you want to at current orderbook price. Orderbook has to be visible for this API to work.

Sample file content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"KMD\",\"rel\":\"HODL\",\"dump\":40.00038}"
```

## pubkeystats

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"statsdisp\",\"starttime\":0,\"endtime\":0,\"pubkey\":\"a2593155464e37fcc88245780240a412a38cf3d316809445aad73f4e7789187d\"}"
```
