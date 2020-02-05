# Prices

::: tip Important Notice

The Prices Antara Module is currently in development. 

The specifics of the implementation are subject to change.

Please reach out to the Komodo team for more information before attempting to use this module in a production environment.

:::

## Introduction

The Prices Antara Module offers a decentralized and incentivized margin-trading system on a Smart Chain. This allows users to open long and short leveraged positions against the "House" (the module itself). 

A player opens a position with the desired betting amount and leverage. They can close the position anytime and receive the current equity that is in a non-negative state. 

When the debt ratio of a player is close to exceeding the allowed limits, other players on the network can liquidate the indebted player's account. The liquidating players thereby receive as an incentive a small percentage of the indebted player's holdings.

For a more detailed explanation of the nature of "leveraged positions" and other terms related to margin trading, please read [this explanation section.](../../../basic-docs/antara/antara-api/prices.html#a-brief-explanation-of-margin-trading-leveraged-trading)

##### The Prices Modules Requires a Separate Technology Called a DTO

The creation of the Prices Antara Module required the existence of a separate Antara-based module that provides trustless and decentralized price feeds. The Komodo community named this separate type of module a "Decentralized Trustless Oracle," or DTO for brevity. 

In order to create the trustless and decentralized price feeds, Komodo's DTO technology relies on [timestamp consensus rules](https://medium.com/@jameslee777/decentralized-trustless-oracles-dto-by-piggybacking-on-timestamp-consensus-rules-2adce34d67b6). 

The DTO requires the miners of the Smart Chain to include the required off-chain data as a part of the OP\_RETURN in the coinbase transaction (the transaction that pays the block reward to the miner).

The validation of the off-chain data is part of the consensus rules. If the data is false, the block is rejected by the network, which serves as an incentive for the miner to be truthful. To achieve consensus, all nodes allow for an error margin of approximately `1%` in the reported data. 

##### Manners of Obtaining Data

The Prices module retrieves prices of stocks and cryptocurrencies through the Antara Customization Parameters [ac\_stocks](../antara-setup/antara-customizations.md#ac-stocks) and [ac\_prices](../antara-setup/antara-customizations.md#ac-prices), respectively.

The module can extract data from a web source that can be accessed using the `http/https` protocols and return the data as a json object using the [ac\_feeds](../antara-setup/antara-customizations.md#ac-feeds) parameter. 

The module also has a pre-configured feed that always retrieves values for the pairs `BTC_USD`, `BTC_EUR` and `BTC_GBP`.

The DTO provides the required price feed. For markets, such as `AMZN/KMD`, that do not exist in real life, the DTO offers [synthetic prices](#synthetic-prices-and-their-calculation).

##### Manner of Preventing Miner Manipulation 

To counter the possibility of manipulation of price data by a miner (for example, a miner could attempt to take advantage of the `1%` error allowed to win an open bet), when a position is opened the price of purchase is not set until a twenty-four hour period has past. During this period, the module tracks the prices of the relevant currencies. At the end of the period, the module automatically sets the price of purchase for the position based on the price averages.

For long positions, the lock price (also called the "cost basis") is the maximum among averages; for short positions, the lock price is the minimum among averages.

Players should not expect high-speed trading in this type of system. 

### A Brief Explanation of Margin Trading ("Leveraged Trading")

Assume Player X has `$100` USD and is certain that Bitcoin (BTC) will soon have a large increase in value relative to USD. 

In this type of scenario, Player X can use margin trading to find a greater profit percentage than he would by simply buying `$100` USD worth of BTC and holding it.

However, margin trading increases the risk placed on Player X.

If Player X simply buys his BTC and then sells it after its price increases by `5%`, Player X's profit is `5%`, or `$5` USD. Similarly, the loss is `$5` USD if the price decreases by `5%`.

In a margin-trading system there are two roles: Lender and Trader.

In the example here, Player X is the Trader. 

Lender facilitates Trader in borrowing a multiple ("leverage") of the deposited collateral (`$100`). Thereby the Trader can trade using the total amount (deposit + leverage).

For example, Player X desires to trade with a leverage of `10`. This is `$100 * 10 = $1000` USD.

Lender gives Player X the remaining `$900` USD. Player X now buys `$1000` USD worth of BTC. 

If the price increases by `5%` and Player X sells their BTC, the profit is `$50` USD. 

Player X returns the loan of `$900` and is left with `$150` USD, which amounts to a profit of `50%`.

Alternatively, the price can drop and the Trader can lose higher amounts. In this example, the value of BTC relative to USD drops by `5%`.

Player X now only has `$950` USD worth of BTC. Player X sells and returns the loan amount of `$900` USD, and has `$50` USD remaining.

This is now a loss of `50%`.

In many scenarios, a Lender has the ability to liquidate the Trader at any given time, and will force liquidation before the player can lose more than they are able to immediately repay.

The following stop-loss values are common in margin trading:

- A `10x` leverage can tolerate up to a `10%` decrease in price before forced liquidation occurs
- A `100x` leverage can tolerate up to a `1%` decrease in price before forced liquidation occurs

##### Summary of a Brief Explanation to Margin Trading

Assuming `$0` fees, a player can calculate actual profit or loss percentage by the following formula.

```
price change in percent * leverage
```

The Trader's "position" is the amount of coins the player places as a bet.

The Trader's "equity" is the amount of coins the player can withdraw at the current moment. Equity is calculated by the following formula. 

```
position + (profit or loss)
```

"Cost basis" is the price at which the bet is opened.

### Synthetic Prices and Their Calculation

The Prices data on a Smart Chain is made available by an active Decentralized Trustless Oracle (DTO), which is comprised of all nodes and miners on the network.

There are limitations to a DTO. For example, the DTO cannot offer price feeds for all possible markets across the world. Furthermore, users on the network may desire a trading pair that does not yet have a real market. 

In such cases, price data of two or more different pairs can be used to derive the price of a desired pair. The resulting price data is called a "Synthetic Price."

For example, suppose the DTO for a Smart Chain does not supply the price data for the pair `AMZN/KMD`. However, the chain does supply the price data for the pairs `AMZN/USD`, `USD/BTC` and `BTC/KMD`.

The synthetic price of `AMZN/KMD` is available through considering the prices of all the three pairs.

##### A Forth-like Syntax for Synthetic Calculations

A simple syntax is offered in the Komodo API for calculating synthetic prices and use their value on the Smart Chain. 

This syntax is based on the [Forth](<https://en.wikipedia.org/wiki/Forth_(programming_language)>) programming language. 

In calculating a synthetic price, the Komodo API supports up to three pairs of prices and offers four operations:

- invert(`!`)
- multiply(`*`)
- divide(`/`)

These operations can be supplied with positive and negative integers. The integers allow the calculation of synthetic prices for baskets <!-- Sidd:What's a basket? --> of assets or indexes. The negative integers can be used to short a price.

For example, the synthetic price of a basket with `3/4` parts BTC and `1/4` parts BCH can be calculated.

#### Usage

The data in each price feed of the DTO has a key that appears in the structure of `AAA_BBB`. This is interpreted to mean that the price for the asset `AAA` is provided in the data in terms of another asset `BBB`. 

For example, the price of BTC in terms of USD is denoted by `BTC_USD`

##### Understanding Stacks

Understanding the concept of a stack is essential when using the Komodo API's syntax for calculating synthetic prices.

Stacks are dynamic data structures that follow the **Last In First Out (LIFO)** principle. In other words, the last item to be inserted into a stack is the first one to be deleted from it.

For example, assume a stack of trays on a table. When a person adds another tray to the stack, they place the tray on top of the stack. When a person removes a tray from the stack, they remove the tray at the top of the stack. Therefore, the last item added to the stack is also the first item removed.

##### Inserting and Deleting Elements

Stacks have restrictions on the insertion and deletion of elements.

Elements can be inserted or deleted only from one end of the stack (the top). The element at the top is called the **top** element.

The operations of inserting and deleting elements are called **push** and **pop** respectively.

When the top element of a stack is deleted, if the stack remains non-empty, the element just below the previous top element becomes the new top element of the stack.

For example, in the stack of trays, if a person takes the tray from the top, the tray just below it automatically becomes the top element.

[Source: Hackerearth.com](https://www.hackerearth.com/practice/data-structures/stacks/basics-of-stacks/tutorial/)

##### Komodo Stack API Symbols

The allowed symbols in the Komodo API's syntax are:

- prices
- operations: invert(`!`), multiply(`*`), divide(`/`)
- positive and negative integers

The interpretation of the symbols in all the possible cases is described in the subsequent sections.

The Komodo API limits the depth of the stack for prices to three, as this appears to be reasonably sufficient data for calculating synthetic prices.

##### Synthetic Price Weights

A synthetic price is calculated by summing the computed prices with integers that represent `weights`. 

The `weight` can be any positive or negative integer whose absolute value is less than `2048`.

After an operator acts on the stack, a weight must be applied to the top element. 

If the synthetic price calculation does not require the inclusion of a weight, set the weight's integer value to `1`.

With the weights sets, the module automatically calculates the resulting synthetic price.

###### Example

"BTC\_USD, 3, KMD\_USD, 1" gives the integer weight of `3` to the price pair of `BTC_USD` and the integer weight of `1` to the price pair of `KMD_USD`. The resulting value is described as `BTC_USD*(3/4) + KMD_USD*(1/4)`.

A "spread" in trading is a term that describes the amount or distance between the values of the maximum amount at which a buyer is willing to purchase and the minimum amount at which a seller is willing to sell.

To create a spread, use a negative weight for one of the synthetics.

For example, "BTC\_USD, -2, KMD\_USD, 1" gives the spread: `KMD_USD - 2 * BTC_USD`. When `KMD_USD` gains 2x more than `BTC_USD`, percentage wise, the spread would essentially disappear.

##### Operations Involving 1 Price

| Operator      | Function                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| `!` (inverse) | pops the top stack element, inverts it, and pushes it back on to the stack |

###### Example

"BTC\_USD, !, 1" is computed to "USD\_BTC".

##### Operations Involving 2 Prices

| Operator | Function                                                                                                                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `*`      | pops two elements from the top of the stack, multiplies them, and pushes the result back on to the stack                                                                                             |
| `/`      | pops two elements from the top of the stack, performs a division with the first element as the denominator and the second element as the numerator, and pushes the result back on to the stack |

###### Example

- "BTC\_USD, USD\_JPY, \*, 1" is computed to "BTC\_JPY"
- "BTC\_EUR, BTC\_USD, /, 1" is computed to "USD\_EUR"

##### Operations involving 3 prices

Each of these operators act on top of the stack in the order from left to right. It is possible that the value from an earlier computation rests at the top of the stack.

| Operator | Function                                                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `*//`    | pops three elements from the top of the stack, inverts the last two out, multiplies them and pushes the result back on to the stack |
| `**/`    | pops three elements from the top of the stack, inverts the last one out, multiplies them and pushes the result back on to the stack |
| `***`    | pops three elements from the top of the stack, multiplies them, and pushes the result back on to the stack                           |
| `///`    | pops three elements from the top of the stack, inverts all of them, multiplies them, and pushes the result back on to the stack      |

## mypriceslist

**mypriceslist [all|open|closed]**

The `mypriceslist` method returns the list of transaction ids (txid) of the bets executed on the Smart Chain from the executing user's pubkey. By default, the method returns both open and closed bets.

### Arguments

| Name                | Type               | Description                                                                                                                                                                                                            |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "all\|open\|closed" | (string, optional) | the filter to apply to the list<br><br>**all** - lists all of the user's bets <br><br>**open** - lists the user's bets that are open<br><br>**closed** - lists the user's bets that are closed |

### Response

| Name  | Type               | Description                                                                |
| ----- | ------------------ | -------------------------------------------------------------------------- |
| Array | (array of strings) | an array containing the txid's of the bets that satisfy the applied filter |

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

The `prices` method returns samples of the data that has successfully been added to the Smart Chain via the price-feed oracles. 

The argument `maxsamples` defines the maximum number of samples to display for each price.

### Arguments

| Name       | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| maxsamples | (number) | the maximum number of samples to list |

### Response

| Name            | Type                                 | Description                                                      |
| --------------- | ------------------------------------ | ---------------------------------------------------------------- |
| "firstheight"   | (number)                             | <!--Sidd: need info for all missing descriptions -->                                                                 |
| "timestamps"    | (array of numbers)                   | the unix timestamps at which the samples were collected          |
| "pricefeeds"    | (array of jsons)                     | the unix timestamps at which the samples were collected          |
| "name"          | (string)                             | the name (symbol) of the price                                        |
| "prices"        | (array of arrays containing numbers) | the mined (actual received) price; correlated price; smoothed price <!-- Sidd: in this context, I don't know what these terms mean, "actual received", "correlated", "smoothed" --> |
| "result"        | (string)                             | whether the command executed successfully                        |
| "seed"          | (number)                             |                                                                  |
| "height"        | (number)                             |                                                                  |
| "maxsamples"    | (number)                             | the maximum number of samples displayed                        |
| "width"         | (number)                             |                                                                  |
| "daywindow"     | (number)                             |                                                                  |
| "numpricefeeds" | (number)                             | the total number of price feeds available on the Smart Chain         |

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

    ... omitted for brevity ...

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

The `pricesaddfunding` method adds the `amount` of funding from the user's wallet to the `bettxid` bet. 

This can reduce the `bettxid` owner's risk of liquidation.

### Arguments

| Name    | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| bettxid | (string) | the transaction id returned previously by the [pricesbet](#pricesbet) method |
| amount  | (number) | the amount of funding to be added to the bet                                 |

### Response

| Name     | Type     | Description                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------- |
| "hex"    | (string) | the transaction in hex format; broadcast this value using the **sendrawtransaction** method |
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

The `pricesaddress` method returns information about the local instance of the Antara Prices Module on the Smart Chain and about associated addresses.

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

The `pricesbet` method is used to open a bet. 

The resulting transaction id is called the `bettxid` of this bet and is used in most of the subsequent RPC calls

### Arguments

| Name                 | Type     | Description                                                                                            |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| amount               | (number) | the amount of the Smart Chain's native coin to bet                                                     |
| leverage             | (number) | the leverage to be used to open the bet; use positive integers for longs, negative integers for shorts |
| synthetic-expression | (string) | the synthetic expression against which the bet is opened                                        |

### Response

| Name     | Type     | Description                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------- |
| "hex"    | (string) | the transaction in hex format; broadcast this value using the `sendrawtransaction` method |
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

The `pricescashout` method can be used to cash out the `bettxid` bet. At the moment this method is executed, the user's equity must be positive and the bet must be open and not rekt.

### Arguments

| Name    | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| bettxid | (string) | the transaction id returned previously by the [pricesbet](#pricesbet) method |

### Response

| Name              | Type            | Description                                                                                                           |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| bets              | (array of json) | the bets that are open currently                                                                                      |
| positionsize      | (number)        | the amount of native coin used to open the bet                                                                        |
| profits           | (number)        | the profits that can be actualized if the bet is closed at this moment; the value is negative if it is a loss         |
| costbasis         | (number)        | the price that has been locked in as the opening price of the bet                                                     |
| firstheight       | (number)        |                                                                                                                       |
| leverage          | (number)        | the leverage used to open the bet                                                                                     |
| TotalPositionSize | (number)        | the amount of native coin used to open all the bets                                                                   |
| TotalProfits      | (number)        | the total profits that can be actualized if the bets are closed at this moment; the value is negative if it is a loss |
| equity            | (number)        | the amount of native Smart Chain coin that can be redeemed if the bet is cashed out at this moment                    |
| LastPrice         | (number)        | the last known price                                                                                                  |
| LastHeight        | (number)        | the block height at which `LastPrice` was noted                                                                       |
| "hex"             | (string)        | the transaction in hex format; broadcast this value using the `sendrawtransaction` method                         |
| "txid"            | (string)        | the transaction id                                                                                                    |
| "result"          | (string)        | whether the command executed successfully                                                                             |

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

The `pricesgetorderbook` method shows the currently open bets and their details. The method also shows information about the house wallet's balance and statistics about the bets on the Smart Chain.

### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

### Response

| Name                  | Type            | Description                                                                                        |
| --------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| Symbol of a Price     | (string)        | whether the command executed successfully                                                          |
| positions             | (array of json) | whether the command executed successfully                                                          |
| isOpen                | (number)        | whether the bet is open; `0` if false and `1` if true                                              |
| expression            | (string)        | the synthetic expression supplied by the user                                                      |
| positionsize          | (number)        | the amount of native coin used to open the bet                                                     |
| leverage              | (number)        | the leverage used to open the bet                                                                  |
| costbasis             | (number)        | the price that has been locked in as the opening price of the bet                                  |
| lastprice             | (number)        | the last known price                                                                               |
| equity                | (number)        | the amount of native Smart Chain coin that can be redeemed if the bet is cashed out at this moment |
| isUpPosition          | (number)        |                                                                                                    |
| DiffLeveragedPosition | (number)        |                                                                                                    |
| TotalFund             | (number)        | the total amount of the Smart Chain's coins available in the House's public address                |
| TotalEquity           | (number)        | the total amount of equity across all the bets                                                     |
| TotalRekt             | (number)        | the total number of bets that are already rekt                                                         |
| TotalBets             | (number)        | the total number of active bets                                                                        |
| TotalCashoutBets      | (number)        | the total number of bets that have been cashed out                                                     |

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

The `pricesinfo` method returns information about the bet referred by the `bettxid` bet.

### Arguments

| Name    | Type               | Description                                                                  |
| ------- | ------------------ | ---------------------------------------------------------------------------- |
| bettxid | (string)           | the transaction id returned previously by the [pricesbet](#pricesbet) method |
| height  | (number, optional) | the height at which the information about the bet is required                |

### Response

| Name              | Type            | Description                                                                                                           |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| rekt              | (number)        | whether the bet is rekt; `0` if false and `1` if true                                                                 |
| open              | (number)        | whether the bet is open; `0` if false and `1` if true                                                                 |
| expression        | (string)        | the synthetic expression supplied by the user                                                                         |
| reduced           | (string)        | the reduced synthetic expression derived from the one supplied by the user                                            |
| costbasis         | (number)        | the price that has been locked in as the opening price of the bet                                                     |
| bets              | (array of json) | the bets that are open currently                                                                                      |
| positionsize      | (number)        | the amount of native coin used to open the bet                                                                        |
| profits           | (number)        | the profits that can be actualized if the bet is closed at this moment; the value is negative if the closing amount is a loss         |
| costbasis         | (number)        | the opening price of the bet; this value is locked for the duration of the bet                                                     |
| firstheight       | (number)        |                                                                                                                       |
| leverage          | (number)        | the leverage used to open the bet                                                                                     |
| TotalPositionSize | (number)        | the amount of native coin used to open all the bets                                                                   |
| TotalProfits      | (number)        | the total profits that can be actualized if the bets are closed at this moment; the value is negative if the amount is a loss |
| equity            | (number)        | the amount of native Smart Chain coin that can be redeemed if the bet is cashed out at this moment                    |
| LastPrice         | (number)        | the last known price                                                                                                  |
| LastHeight        | (number)        | the block height at which `LastPrice` was noted                                                                       |
| LiquidationPrice  | (number)        | the price at which the bet will be eligible for liquidation                                                           |

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

The `priceslist` method returns the list of transaction id's (txid) of all the bets executed on chain. The method returns both open and closed bets by default.

### Arguments

| Name                | Type               | Description                                                                                                                                                                                                            |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "all\|open\|closed" | (string, optional) | the filter to apply to the list<br><br>**all** - lists all of the user's bets<br><br>**open** - lists the user's bets that are open<br><br>**closed** - lists the user's bets that are closed |

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

The `pricesrefillfund` method adds funds to the house (the Global CC address).

### Arguments

| Name   | Type     | Description                                                   |
| ------ | -------- | ------------------------------------------------------------- |
| amount | (amount) | the amount of coins to be added to the House's public address |

### Response

| Name     | Type     | Description                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------- |
| "hex"    | (string) | the transaction in hex format; broadcast this value using the `sendrawtransaction` method |
| "txid"   | (string) | the transaction id                                                                            |
| "result" | (string) | whether the command executed successfully                                                     |

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

The `pricesrekt` method creates a transaction that liquidates a bet that is "rekt" — a bet where the debt ratio has exceeded maximum limits and is now open to liquidation.

A bet that is rekt has an `IsRekt: 1` flag in its [pricesinfo](#pricesinfo) call.

The `pricesrekt` call requires some proof-of-work (PoW) activity from the machine of the executing user. This deters spamming.

All nodes on the network are incentivised to execute this transaction as it rewards some of the liquidated funds to the node that created the rekt transaction.

### Arguments

| Name    | Type               | Description                                                                  |
| ------- | ------------------ | ---------------------------------------------------------------------------- |
| bettxid | (string)           | the transaction id returned previously by the [pricesbet](#pricesbet) method |
| height  | (number, optional) | the height at which the bet is rekt                                          |

### Response

| Name              | Type            | Description                                                                                                           |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| bets              | (array of json) | the bets that are open currently                                                                                      |
| positionsize      | (number)        | the amount of native coin used to open the bet                                                                        |
| profits           | (number)        | the profits that can be actualized if the bet is closed at this moment; the value is negative if the amount is a loss         |
| costbasis         | (number)        | the opening price of the bet                                                     |
| firstheight       | (number)        |                                                                                                                       |
| leverage          | (number)        | the leverage used to open the bet                                                                                     |
| TotalPositionSize | (number)        | the amount of native coin used to open all the bets                                                                   |
| TotalProfits      | (number)        | the total profits that can be actualized if the bets are closed at this moment; the value is negative if this amount is a loss |
| equity            | (number)        | the amount of native Smart Chain coin that can be redeemed if the bet is cashed out at this moment                    |
| LastPrice         | (number)        | the last known price                                                                                                  |
| LastHeight        | (number)        | the block height at which `LastPrice` was noted                                                                       |
| "result"          | (string)        | whether the command executed successfully                                                                             |
| "error"           | (string)        | the error encountered                                                                                                 |

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
