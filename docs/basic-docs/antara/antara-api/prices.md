# Prices (In development)

::: tip

The Prices Antara Module is currently in development. The specifics of the implementation are also subject to change. This document is a Work In Progress.

:::

## Introduction

The Prices Antara module implements a decentralized, incentivized margin trading system on a Smart Chain; allows users to open long and short leveraged positions against the House (the module itself). It required the existence of a completely trustless and decentralized price feed module (DTO - A decentralized trustless oracle). So the DTO was implemented by piggybacking on [timestamp consensus rules](https://medium.com/@jameslee777/decentralized-trustless-oracles-dto-by-piggybacking-on-timestamp-consensus-rules-2adce34d67b6). It works by requiring the miners of the Smart Chain to include the required off-chain data as a part of OP_RETURN of the coinbase transaction (The transaction that pays the block reward to the miner). The validation of the off-chain data is part of the consensus rules and if the data is false, the block will be rejected by the network, which incentivizes the miner to be truthful. To achieve consensus, all nodes allow an error of about 1% in the reported data. The DTO provides the required Price feed. For markets like `AMZN/KMD` that don’t exist in real life, [synthetic prices](#an-explanation-on-synthetic-prices-and-their-calculation) can be used.

The Prices module can retrieve prices of stocks and cryptocurrencies through the Antara Customization Parameters [ac_stocks](../antara-setup/antara-customizations.md#ac-stocks) and [ac_prices](../antara-setup/antara-customizations.md#ac-prices) respectively. It can also extract data from a web source that can be accessed using the `http/https` protocols and return the data as a json object using the [ac_feeds](../antara-setup/antara-customizations.md#ac-feeds) parameter. It also has a pre-configured feed that always retrieves values for the pairs: `BTC_USD`, `BTC_EUR` and `BTC_GBP`

A player opens a position with the desired betting amount and leverage. They can close the position anytime and receive the current equity that is in a non negative state. When the loss of a player is close to exceeding their position, it is liquidated by incentivized users who will receive a small percentage.

To counter the possibility of manipulation of Price data by a miner by taking advantage of the 1% allowed error to win an open bet, when a position is opened, the price of purchase is fixed 24 hours later based on the average of the prices in the past 24 hours. For longs, the lock price (cost basis) is the maximum among averages; For shorts it is the minimum among averages. So margin trading in such a system needs some patience.

### A brief explanation of Margin Trading (Leveraged trading)

Let's say you have `$100` and absolutely sure that BTC will moon, margin trading allows you to have a greater Profit percentage than simply buying `$100` worth of BTC and holding it.

::: warning

It makes the risk you assume greater as well

:::

If you had just bought BTC and sold it after its price increased by `5%`, your profit would be `5%`; i.e., `$5`. Similar calculation for when the price decreases as well.

In a Margin trading system, there is always a Lender and a Trader(you). The Lender lets a Trader borrow a multiple (Leverage) of the deposited collateral(`$100`) and lets you trade using the total amount.

For example, if you wanted to trade with a leverage of `10`, the Lender gives you the remaining `$900` and lets you buy BTC worth `$1000` at current market price. Now, if the price increases by `5%` and you sold the BTC, the profit you make is `$50` and if you return the loan(`$900`), you are left with `$150` which amounts to a profit of `50%`.

::: tip

In the above scenario, the lender recovered their capital and also received trading fees

:::

Now, consider the case of a decrease in price by `5%` after you bought BTC using a leverage of `10`. If you sold the BTC now, you will receive `$950` if you return the loan(`$900`), you are left with `$50` which amounts to a loss of `50%`.

If the decrease in price was `10%`, after selling the BTC, you will receive `$900` and after returning the loan, there is `$0` left.

::: warning

Most lenders will liquidate your BTC long before this point. Remember, the house never loses.

:::

So by leveraging 10x, 5% volatility causes 50% profit/loss, 10% volatility causes doubling/liquidation,

::: tip Liquidation

When your position cannot take anymore loss due to decrease in price, the lender will forcibly sell your Holdings to recoup their capital

:::

It can be observed that

- 10x leverage can tolerate up to 10% decrease in price
- 100x leverage can tolerate up to 1% decrease in price

To summarize the concepts and standardise the terms:

Assuming `0` fees, you can simply calculate your actual profit/loss percentage as `price change in percent * leverage`

Your `Position` is the amount of coins you are betting with.

Your `Equity` is the amount of coins you can withdraw if you cashout at this instance. It is calculated as `Position + (profit or loss)`

`costbasis` is the price at which the bet was opened.

### An Explanation on Synthetic prices and their calculation

As the Prices data on the Smart Chain is made available using a Decentralized Trustless Oracle(DTO) made up of all the nodes and miners on the network, it may not always be possible to have access to Price feeds from all the possible markets. There might also be a case where the desired pair doesn't have a real market, yet. In such cases, Price data of two or more different pairs can be used to derive the Price of the desired pair. Such a Price is called `Synthetic Price`.

Example: Suppose the DTO for the Smart Chain doesn't supply the Price data for the pair `AMZN/KMD`; but it does supply the Price data for the pairs `AMZN/USD`, `USD/BTC` and `BTC/KMD`

We can get the Synthetic Price of `AMZN/KMD` by multiplying the Prices of all the three pairs.

To calculate Synthetic Prices and use their value on the Smart Chain, a simple [Forth](<https://en.wikipedia.org/wiki/Forth_(programming_language)>) like syntax was implemented. It is a Stack based language and supports the usage of Prices of up to 3 pairs and the operations: invert(`!`), multiply(`*`), divide(`/`) along with positive and negative integers. The integers allow the calculation of Synthetic prices for baskets of assets or indexes. The negative integers can be used to short a Price.

Example: The synthetic price of a basket with `3/4`parts BTC and `1/4` parts BCH can be calculated.

#### Usage

Let us start with the most basic component: The price feed from the DTO. Each price feed will be represented by a key that looks like `ABC_DEF` ( will be refered to as `price`). This means, the price given is for the asset `ABC` in terms of another asset `DEF`. For example, the price of BTC in terms of USD is denoted by `BTC_USD`

The assets can be cryptocurrencies, fiat currencies, stocks etc.,

It is essential to understand what a stack is to use the syntax for calculating Synthetic prices.

::: tip On Stacks

Stacks are dynamic data structures that follow the **Last In First Out (LIFO)** principle. The last item to be inserted into a stack is the first one to be deleted from it.

For example, you have a stack of trays on a table. The tray at the top of the stack is the first item to be moved if you require a tray from that stack.

**Inserting and deleting elements**

Stacks have restrictions on the insertion and deletion of elements. Elements can be inserted or deleted only from one end of the stack i.e. from the **top** . The element at the top is called the **top** element. The operations of inserting and deleting elements are called **push** and **pop** respectively.

When the top element of a stack is deleted, if the stack remains non-empty, then the element just below the previous top element becomes the new top element of the stack.

For example, in the stack of trays, if you take the tray on the top and do not replace it, then the second tray automatically becomes the top element (tray) of that stack.

Source: [https://www.hackerearth.com/practice/data-structures/stacks/basics-of-stacks/tutorial/](https://www.hackerearth.com/practice/data-structures/stacks/basics-of-stacks/tutorial/)

:::

The allowed symbols in our syntax are:

- the prices
- operations: invert(`!`), multiply(`*`), divide(`/`)
- positive and negative integers

The interpretation of the symbols in all the possible cases is described in the subsequent sections.

We limit the depth of the Stack for Prices to 3 as it appears to be sufficient to calculate all the possible synthetics from the available prices.

A Synthetic price is calculated by summing the computed prices with integers as `weights`. The `weight` can be any positive or negative integer whose absolute value is less than `2048`. After an operator acts on the stack, a weight must be applied on the top element. If the synthetic price calculation doesn't need inclusion of a weight, set it as "1". A weight consumes the top stack element and adds the value obtained by multiplying it with the weight to an accumulator. The accumulator starts at the value `0` and its value increases with each weight encountered in the syntax.

###### Example

- "BTC_USD, 3, KMD_USD, 1" is computed to a index, whose value is `BTC_USD*(3/4) + KMD_USD*(1/4)`
- To create a spread, use a negative weight for one of the synthetics. "BTC_USD, -2, KMD_USD, 1" gives the spread: `KMD_USD - 2*BTC_USD`. When `KMD_USD` gains 2x more than `BTC_USD` percentage wise, it would be break even.

##### Operations involving 1 price

| Operator      | Function                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| `!` (inverse) | pops the top stack element, inverts it and pushes it back on to the stack |

###### Example

"BTC_USD, !, 1" is computed to "USD_BTC"

##### Operations involving 2 prices

| Operator | Function                                                                                                                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `*`      | pops two elements from the top of the stack, multiplies them and pushes the result back on to the stack                                                                                             |
| `/`      | pops two elements from the top of the stack, performs a division with the first element out as the denominator , the second element out as the numerator and pushes the result back on to the stack |

###### Example

- "BTC_USD, USD_JPY, \*, 1" is computed to "BTC_JPY"
- "BTC_EUR, BTC_USD, /, 1" is computed to "USD_EUR"

##### Operations involving 3 prices

Each of these operators act on top of the stack in the order from left to right. It is possible that the value from an earlier computation rests at the top of the stack.

| Operator | Function                                                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `*//`    | pops three elements from the top of the stack, inverts the last two out, multiplies them and pushes the result back on to the stack |
| `**/`    | pops three elements from the top of the stack, inverts the last one out, multiplies them and pushes the result back on to the stack |
| `***`    | pops three elements from the top of the stack, multiplies them and pushes the result back on to the stack                           |
| `///`    | pops three elements from the top of the stack, inverts all of them, multiplies them and pushes the result back on to the stack      |

## Prices Antara Module Flow

## mypriceslist

**mypriceslist [all|open|closed]**

The `mypriceslist` method returns the list of txid's of the bets executed on chain from the user's pubkey. Returns both open and closed bets by default.

### Arguments

| Name                | Type               | Description                                                                                                                                                                                                            |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "all\|open\|closed" | (string, optional) | the filter to apply to the list; can use any one of all,open,closed<br><br>all - lists all of the user's bets <br><br>open - lists the user's bets that are open<br><br>closed - lists the user's bets that are closed |

### Response

| Name  | Type               | Description                                                                |
| ----- | ------------------ | -------------------------------------------------------------------------- |
| Array | (array of strings) | An array containing the txid's of the bets that satisfy the applied filter |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD mypriceslist
```

<collapse-text hidden title="Response">

```json
["573d45389ce9394d35f14f04f48b72a2ac639fdecf0afbe11b3d5dbf07e8fce9"]
```

</collapse-text>

## prices

**prices maxsamples**

The `prices` method returns samples of the prices feed data that has been oraclized onto the Smart Chain. The argument "maxsamples" defines the maximum number of samples for each Price to display.

### Arguments

| Name       | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| maxsamples | (number) | maximum number of samples to list |

### Response

| Name            | Type                                 | Description                                                      |
| --------------- | ------------------------------------ | ---------------------------------------------------------------- |
| "firstheight"   | (number)                             |                                                                  |
| "timestamps"    | (array of numbers)                   | the unix timestamps at which the samples were collected          |
| "pricefeeds"    | (array of jsons)                     | the unix timestamps at which the samples were collected          |
| "name"          | (string)                             | name(symbol) of the price                                        |
| "prices"        | (array of arrays containing numbers) | mined (actual received) price; correlated price ; smoothed price |
| "result"        | (string)                             | whether the command executed successfully                        |
| "seed"          | (number)                             |                                                                  |
| "height"        | (number)                             |                                                                  |
| "maxsamples"    | (number)                             | maximum number of samples being displayed                        |
| "width"         | (number)                             |                                                                  |
| "daywindow"     | (number)                             |                                                                  |
| "numpricefeeds" | (number)                             | total number of price feeds available on the Smart Chain         |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD prices 5
```

<collapse-text hidden title="Response">

```json
{
  "firstheight": 1604,
  "timestamps": [
    1574860856,
    1574860730,
    1574860730,
    1574860605,
    1574860480
  ],
  "pricefeeds": [
    {
      "name": "BTC_USD",
      "prices": [
        [
          7283.27170000,
          7280.79830000,
          7269.59738571
        ],
        [
          7286.85330000,
          7281.90500000,
          7266.62501428
        ],
        [
          7286.85330000,
          7259.99170000,
          7264.39740000
        ],
        [
          7278.08330000,
          7259.99170000,
          7263.26905714
        ],
        [
          7281.90500000,
          7259.99170000,
          7262.14071428
        ]
      ]
    },
....many more json objects omitted for brevity
  ],
  "result": "success",
  "seed": 1045657799360186951,
  "height": 1624,
  "maxsamples": 5,
  "width": 20,
  "daywindow": 7,
  "numpricefeeds": 36
}
```

</collapse-text>

## pricesaddfunding

**pricesaddfunding bettxid amount**

The `pricesaddfunding` method adds the amount specified by the argument "amount" more funding to the bet referred by "bettxid" to reduce the risk of liquidation

### Arguments

| Name    | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| bettxid | (string) | the transaction id returned previously by the [pricesbet](#pricesbet) method |
| amount  | (number) | the amount of funding to be added to the bet                                 |

### Response

| Name     | Type     | Description                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------- |
| "hex"    | (string) | the transaction in hex format; it has to ne broadcasted using the `sendrawtransaction` method |
| "txid"   | (string) | the transaction id                                                                            |
| "result" | (string) | whether the command executed successfully                                                     |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pricesaddfunding 573d45389ce9394d35f14f04f48b72a2ac639fdecf0afbe11b3d5dbf07e8fce9 2
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f8902001ba9e5249f390cf83f9e066f40a5fa514f9d9effbfa8e1c62893af4a8f2920000000004847304402203e41b90dd37de286dcd1132c7927b83388ccf9b364b958101132df85ee0abf6c022076cd8ebe8070d20b115f106deec8bb802adcb4f4ab00a49ed84e41cf39295a9201ffffffffe9fce807bf5d3d1be1fb0acfde9f63aca2728bf4044ff1354d39e99c38453d57000000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567814042c55e009fa5571262beed60e90a5aaed4d87c03cf4047dc73203d0c26b7ba075a67920cfbb38c560eee029ceebe2f7ef0920d2d4b3d59ef4bcaa9f2f4a24ceba100af038001eda10001ffffffff051027000000000000302ea22c80203f3e915b5ac6710cb47dc1b1fce5efa52cd958ceab630fd9aa52c9274b446b478103120c008203000401ccc07fdc0b00000000302ea22c80203ee64ec5f134da404710d306dcd9ca54a0139b3c4827b43a988fc6316e6c2a688103120c008203000401cc40420f00000000002321037c803ec82d12da939ac04379bbc1130a9065c53d8244a61eece1db942cf0efa7acf074e4a600000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000000000004f6a4c4ced41e9fce807bf5d3d1be1fb0acfde9f63aca2728bf4044ff1354d39e99c38453d572102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756700c2eb0b00000000000000002f0700000000000000000000000000",
  "txid": "74dea4695a097facb5a71d1a56799f9caed4bf7461b613ae9c5800b85fb97ded",
  "result": "success"
}
```

</collapse-text>

## pricesaddress

**pricesaddress [pubkey]**

The `pricesaddress` method returns information about the Prices module and associated addresses.

Optionally, if a pubkey is supplied, this method also returns the corresponding Prices CC Address and balance.

### Arguments

| Name   | Type               | Description                               |
| ------ | ------------------ | ----------------------------------------- |
| pubkey | (string, optional) | the pubkey of another user on the network |

### Response

| Name                    | Type     | Description                                                                                                          |
| ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| "result"                | (string) | whether the command executed successfully                                                                            |
| "PricesCCAddress"       | (string) | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey |
| "PricesCCBalance"       | (number) | the amount of funds in the `PricesCCAddress`                                                                         |
| "PricesNormalAddress"   | (string) | the unmodified public address generated from the contract's privkey                                                  |
| "PricesNormalBalance"   | (number) | the amount of funds in the `PricesNormalAddress`                                                                     |
| "PricesCCTokensAddress" | (string) | the public address where Tokens are locked in the Prices module                                                      |
| "myCCAddress(Prices)"   | (string) | taking the module's EVAL code as a modifier, this is the Antara address from the pubkey of the user                  |
| "myCCbalance(Prices)"   | (number) | the amount of funds in the `myCCAddress(Prices)`                                                                     |
| "myaddress"             | (string) | the public address of the pubkey used to launch the chain                                                            |
| "mybalance"             | (number) | the amount of funds in the `myaddress`                                                                               |
| "myaddr"                | (string) |                                                                                                                      |
| "houseaddr"             | (string) | the public address of the House                                                                                      |
| "exposureaddr"          | (string) |                                                                                                                      |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pricesaddress
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "PricesCCAddress": "RAL5Vh8NXmFqEKJRKrk1KjKaUckK7mM1iS",
  "PricesCCBalance": 0.0,
  "PricesNormalAddress": "RBunXCsMHk5NPd6q8SQfmpgre3x133rSwZ",
  "PricesNormalBalance": 0.0,
  "PricesCCTokensAddress": "RTSAiZc1b5H8WKPjqydsNfG11bLjbXZAY5",
  "myCCAddress(Prices)": "RDmC5R7MLqBKZxVYKkHvR7Piz73RADhvHm",
  "myCCbalance(Prices)": 0.0,
  "myaddress": "RGr9gqm88JtTntHJLgRxBjMS25K1w4rCzi",
  "mybalance": 0.0,
  "myaddr": "RDmC5R7MLqBKZxVYKkHvR7Piz73RADhvHm",
  "houseaddr": "RPLU8yLsUS8iN9YUvtw4CbX9oZJmU5Dg5y",
  "exposureaddr": "RJuhhPF7s8bR1532NWLnYZeCSs5BY9ZZBC"
}
```

</collapse-text>

## pricesbet

**pricesbet amount leverage "synthetic-expression"**

The `pricesbet` method is used to open a bet. The the resulting transaction id is called the "bettxid" of this bet. Used in most of the subsequent rpc calls

### Arguments

| Name                 | Type     | Description                                                                                            |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| amount               | (number) | the amount of the Smart Chain's native coin to bet                                                     |
| leverage             | (number) | the leverage to be used to open the bet; use positive integers for longs, negative integers for shorts |
| synthetic-expression | (string) | the synthetic expression against which the bet has to be opened                                        |

### Response

| Name     | Type     | Description                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------- |
| "hex"    | (string) | the transaction in hex format; it has to ne broadcasted using the `sendrawtransaction` method |
| "txid"   | (string) | the transaction id                                                                            |
| "result" | (string) | whether the command executed successfully                                                     |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pricesbet 1 2 "BTC_USD,1"
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f89010019d58a792d663704f6d35a97134bfe24290de126aa220812a05f2a297efbca0000000049483045022100fbac0908eb3431c7781adeea0e2d83f05851ba131def70cb5ab207d5b2a322d102201cda02d44e9254ee26bf9b2aa88adf3b19a49c1fc2258a0ad85cb544585b745f01ffffffff071027000000000000302ea22c80203f3e915b5ac6710cb47dc1b1fce5efa52cd958ceab630fd9aa52c9274b446b478103120c008203000401cc1027000000000000302ea22c80203ee64ec5f134da404710d306dcd9ca54a0139b3c4827b43a988fc6316e6c2a688103120c008203000401cce03fee0500000000302ea22c80203ee64ec5f134da404710d306dcd9ca54a0139b3c4827b43a988fc6316e6c2a688103120c008203000401cc10270000000000002321039894cb054c0032e99e65e715b03799607aa91212a16648d391b6fa2cc52ed0cfac20a10700000000002321037c803ec82d12da939ac04379bbc1130a9065c53d8244a61eece1db942cf0efa7acc0e0d9ac00000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000626a4c5fed422102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475675a06000000e1f50500000000020012db9450a90000000201000108000000000000000000000000000000000000000000000000000000000000000000000000230700000000000000000000000000",
  "txid": "90e4e83f750d46f13b2934af77aacc3423031ac520467e4f0b238e9389160c31",
  "result": "success"
}
```

</collapse-text>

## pricescashout

**pricescashout bettxid**

The `pricescashout` method can be used to cash out the bet referred by "bettxid". At the moment this method is executed, the user's equity should be positive, the bet should be open and not be rekt already.

### Arguments

| Name    | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| bettxid | (string) | the transaction id returned previously by the [pricesbet](#pricesbet) method |

### Response

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| "result" | (string) | whether the command executed successfully |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pricescashout 573d45389ce9394d35f14f04f48b72a2ac639fdecf0afbe11b3d5dbf07e8fce9
```

<collapse-text hidden title="Response">

```json
{
  "bets": [
    {
      "positionsize": 1.0,
      "profits": -0.00354064,
      "costbasis": 7290.34905714,
      "firstheight": 35
    }
  ],
  "leverage": 2,
  "TotalPositionSize": 1.0,
  "TotalProfits": -0.00354064,
  "equity": 0.99645936,
  "LastPrice": 7277.44287142,
  "LastHeight": 1637,
  "hex": "0400008085202f8903e9fce807bf5d3d1be1fb0acfde9f63aca2728bf4044ff1354d39e99c38453d57010000007b4c79a276a072a26ba067a5658021039894cb054c0032e99e65e715b03799607aa91212a16648d391b6fa2cc52ed0cf81409c7720352bfef193930d6bd18a5ed4178edec85011948fe71ec5d598c5bd51ec44c4bbaa3350250512b538418fbbfe34f2b468ff5c8d16f17c12914faa689d55a100af038001eda10001ffffffff310c1689938e230b4f7e4620c51a032334ccaa77af34293bf1460d753fe8e490020000007b4c79a276a072a26ba067a5658021039894cb054c0032e99e65e715b03799607aa91212a16648d391b6fa2cc52ed0cf814040648b2b6837cefb5ae4592836ee628606a2ab6f2fb33674cebc95aeb04d0c431e19540dfbb054fe55fa45822fa93b0da50808d03680a45deac3d7f03d1e9209a100af038001eda10001ffffffff8e65f2faf9f137dc59c74f5c846c0fcc8a00b331da52639cdfbbd4cf286aaf40000000007b4c79a276a072a26ba067a5658021039894cb054c0032e99e65e715b03799607aa91212a16648d391b6fa2cc52ed0cf814078db50a91159707b5ee2d1e8c7500b60efa85498c13fde53bd86b4d94f77d5610f5dbfe533d08d8dd7fb2eb5b0b5942916f081002220673699baf1e94679563aa100af038001eda10001ffffffff03f079f00500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567acf065704e18090000302ea22c80203ee64ec5f134da404710d306dcd9ca54a0139b3c4827b43a988fc6316e6c2a688103120c008203000401cc0000000000000000776a4c74ed46e9fce807bf5d3d1be1fb0acfde9f63aca2728bf4044ff1354d39e99c38453d572102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475676506000072d8ddbda9000000a691f070a9000000ec6e07a356000000f079f00500000000102700000000000000000000000000002e0700000000000000000000000000",
  "txid": "84ca754d5e0230c5e2d455900aad3239fc14cc268705c2371db5e5e44bcfc773",
  "result": "success"
}
```

</collapse-text>

## pricesgetorderbook

**pricesgetorderbook**

The `pricesgetorderbook` method shows the currently open bets on chain and their details. It also shows information about the house wallet balance and statistics about the bets on the Smart Chain.

### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

### Response

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| "result" | (string) | whether the command executed successfully |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pricesgetorderbook
```

<collapse-text hidden title="Response">

```json
{
  "BTC_USD": {
    "positions": [
      {
        "isOpen": 1,
        "expression": "BTC_USD, 1",
        "positionsize": 100000000,
        "leverage": 2,
        "costbasis": 729034905714,
        "lastprice": 726786761428,
        "equity": 99383254,
        "isUpPosition": 1
      },
      {
        "isOpen": 1,
        "expression": "BTC_USD, 1",
        "positionsize": 100000000,
        "leverage": 2,
        "costbasis": 728389262857,
        "lastprice": 726786761428,
        "equity": 99559986,
        "isUpPosition": 1
      }
    ],
    "DiffLeveragedPosition": 400000000
  },
  "TotalFund": 100002.0002,
  "TotalEquity": 1.9894324,
  "TotalRekt": 0.0,
  "TotalBets": 2.0,
  "TotalCashoutBets": 0.0
}
```

</collapse-text>

## pricesinfo

**pricesinfo bettxid [height]**

The `pricesinfo` method returns information about the bet referred by the "bettxid"

### Arguments

| Name    | Type               | Description                                                                  |
| ------- | ------------------ | ---------------------------------------------------------------------------- |
| bettxid | (string)           | the transaction id returned previously by the [pricesbet](#pricesbet) method |
| height  | (number, optional) |                                                                              |

### Response

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| "result" | (string) | whether the command executed successfully |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pricesinfo 573d45389ce9394d35f14f04f48b72a2ac639fdecf0afbe11b3d5dbf07e8fce9
```

<collapse-text hidden title="Response">

```json
{
  "rekt": 0,
  "open": 1,
  "expression": "BTC_USD, 1",
  "reduced": "BTC_USD, 1",
  "costbasis": 7290.34905714,
  "bets": [
    {
      "positionsize": 1.0,
      "profits": -0.00623532,
      "costbasis": 7290.34905714,
      "firstheight": 35
    }
  ],
  "leverage": 2,
  "TotalPositionSize": 1.0,
  "TotalProfits": -0.00623532,
  "equity": 0.99376468,
  "LastPrice": 7267.62024285,
  "LastHeight": 1615,
  "LiquidationPrice": 3721.02360812
}
```

</collapse-text>

## priceslist

**priceslist [all|open|closed]**

The `priceslist` method returns the list of txid's of all the bets executed on chain. Returns both open and closed bets by default.

### Arguments

| Name                | Type               | Description                                                                                                                                                                                                            |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "all\|open\|closed" | (string, optional) | the filter to apply to the list; can use any one of all,open,closed<br><br>all - lists all of the user's bets <br><br>open - lists the user's bets that are open<br><br>closed - lists the user's bets that are closed |

### Response

| Name  | Type               | Description                                                                |
| ----- | ------------------ | -------------------------------------------------------------------------- |
| Array | (array of strings) | An array containing the txid's of the bets that satisfy the applied filter |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD priceslist
```

<collapse-text hidden title="Response">

```json
["573d45389ce9394d35f14f04f48b72a2ac639fdecf0afbe11b3d5dbf07e8fce9"]
```

</collapse-text>

## pricesrefillfund

**pricesrefillfund amount**

The `pricesrefillfund` method adds funds to the house (Global CC address)

### Arguments

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| amount | (amount) |             |

### Response

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| "result" | (string) | whether the command executed successfully |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pricesrefillfund 100000
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f89018e65f2faf9f137dc59c74f5c846c0fcc8a00b331da52639cdfbbd4cf286aaf400100000049483045022100f3929f772182537d30d2f9bfbf9ee77fda8b1cd9222e997916ac63d62ce0976402200c980637650a7d27e8eede43238f5bc9c28f54a7d757e6367dd63d13ec4c782401ffffffff0200a0724e18090000302ea22c80203ee64ec5f134da404710d306dcd9ca54a0139b3c4827b43a988fc6316e6c2a688103120c008203000401cc27a9421dbf8f2a00232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac000000002e0700000000000000000000000000",
  "txid": "54098ecb3d5bfdc8ce3a5b0d9f0f08d1dd21af97f714c8068938008543b793d7",
  "result": "success"
}
```

</collapse-text>

## pricesrekt

**pricesrekt bettxid height**

The `pricesrekt` method creates a transaction that liquidates a bet that is rekt(a bet which has `IsRekt: 1` flag in its [pricesinfo](#pricesinfo) call). This call performs some PoW to deter spamming. All nodes on the network are incentivised to execute this transaction as it rewards some of the liquidated funds to the node that created the rekt transaction.

### Arguments

| Name    | Type               | Description                                                                  |
| ------- | ------------------ | ---------------------------------------------------------------------------- |
| bettxid | (string)           | the transaction id returned previously by the [pricesbet](#pricesbet) method |
| height  | (number, optional) |                                                                              |

### Response

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| "result" | (string) | whether the command executed successfully |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pricesrekt 573d45389ce9394d35f14f04f48b72a2ac639fdecf0afbe11b3d5dbf07e8fce9 1540
```

<collapse-text hidden title="Response">

```json
{
  "bets": [
    {
      "positionsize": 1.0,
      "profits": -0.00612918,
      "costbasis": 7290.34905714,
      "firstheight": 35
    }
  ],
  "leverage": 2,
  "TotalPositionSize": 1.0,
  "TotalProfits": -0.00612918,
  "equity": 0.99387082,
  "LastPrice": 7268.00712857,
  "LastHeight": 1644,
  "result": "error",
  "error": "position not rekt"
}
```

</collapse-text>
