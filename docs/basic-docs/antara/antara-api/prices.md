# Prices (In development)

::: tip

The Prices Antara Module is in the final stages of production. Please reach out to the Komodo team for consultation before attempting to use this module in a production environment.

:::

## Introduction

The Prices Antara module implements a decentralized, incentivized margin trading system on a Smart Chain; allows users to open long and short leveraged positions against the House (the module itself). It required the existence of a completely trustless and decentralized price feed module (DTO - A decentralized trustless oracle). So the DTO was implemented by piggybacking on [timestamp consensus rules](https://medium.com/@jameslee777/decentralized-trustless-oracles-dto-by-piggybacking-on-timestamp-consensus-rules-2adce34d67b6). It works by requiring the miners of the Smart Chain to include the required off-chain data as a part of OP_RETURN of the coinbase transaction (The transaction that pays the block reward to the miner). The validation of the off-chain data is part of the consensus rules and if the data is false, the block will be rejected by the network, which incentivizes the miner to be truthful. To achieve consensus, all nodes allow an error of about 1% in the reported data. The DTO provides the required Price feed. For markets like `AMZN/KMD` that don’t exist in real life, [synthetic prices](#an-explanation-on-synthetic-prices-and-their-calculation) can be used.

A player opens a position with the desired betting amount and leverage. They can close the position anytime and receive the current equity that is in a non negative state. When the loss of a player is close to exceeding their position, it is liquidated by incentivized users who will receive a small percentage.

To counter the possibility of manipulation of Price data by a miner by taking advantage of the 1% allowed error to win an open bet, when a position is opened, the price of purchase is fixed 24 hours later based on the average of the prices in the past 24 hours. For longs, the lock price (cost basis) is the maximum among averages; For shorts it is the minimum among averages. So margin trading in such a system needs some patience.

### A brief explanation of Margin Trading (Leverage trading)

Let's say you have `$100` and absolutely sure that BTC will moon, margin trading allows you to have a greater Profit percentage than simply buying `$100` worth of BTC and holding it.

::: warning

It makes the risk you assume greater as well

:::

If you had just bought BTC and sold it after its price increased by `5%`, your profit would be `5%`; i.e., `$5`. Similar calculation for when the price decreases as well.

In a Margin trading system, there is always a Lender and a Trader(you). The Lender lets a trader borrow a multiple (Leverage) of the deposited collateral(`$100`) and lets you trade using the total amount.

For example, if you wanted to trade with a leverage of `10`, the Lender gives you the remaining `$900` and lets you buy BTC worth `$1000` at current market price. Now, if the price increases by `5%` and you sold the BTC, the profit you make is `$50` and if you return the loan(`$900`), you are left with `$150` which amounts to a profit of `50%`.

::: tip

In the above scenario, the lender recovered their capital and also received trading fees

:::

Now, consider the case of a decrease in price by `5%` after you bought BTC using leverage. If you sold the BTC now, you will receive `$950` if you return the loan(`$900`), you are left with `$50` which amounts to a loss of `50%`.

If the decrease in price was `10%`, after selling the BTC, you will receive `$900` and after returning the loan, there is `$0` left.

::: warning

Most lenders will liquidate your BTC long before this point. Remember, the house never loses.

:::

So by leveraging 10x, 5% volatility causes 50% profit/loss, 10% volatility causes doubling/liquidation,

::: tip Liquidation

When your position cannot take anymore loss due to decrease in price, the lender will forcibly sell your Holdings to recoup their capital

:::

It can be observed that

- 10x leverage can tolerate upto 10% decrease in price
- 100x leverage can tolerate upto 1% decrease in price

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

We limit the depth of the Stack to 3 as it appears to be sufficient to calculate all the possible synthetics from the available prices.

A Synthetic price is calculated by adding the results of each stack with integers as `weights`. The `weight` can be any positive or negative integer whose absolute value is less than `2048`. There should be only one element in the stack when an integer is encountered in the syntax.

##### Operations involving 1 price

| Operator | Function                                                                  |
| -------- | ------------------------------------------------------------------------- |
| `!`      | pops the top stack element, inverts it and pushes it back on to the stack |

##### Operations involving 2 prices

| Operator | Function                                                                                                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `*`      | pops two elements from the top of the stack, multiplies them and pushes the result back on to the stack                                                                            |
| `/`      | pops two elements from the top of the stack, divides them with first element as the denominator and the second element as the numerator and pushes the result back on to the stack |

##### Operations involving 3 prices

| Operator | Function                                                                                                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `*//`    | pops the top stack element, inverts it and pushes it back on to the stack                                                                                                          |
| `**/`    | pops two elements from the top of the stack, multiplies them and pushes the result back on to the stack                                                                            |
| `***`    | pops two elements from the top of the stack, divides them with first element as the denominator and the second element as the numerator and pushes the result back on to the stack |
| `///`    | pops two elements from the top of the stack, divides them with first element as the denominator and the second element as the numerator and pushes the result back on to the stack |
