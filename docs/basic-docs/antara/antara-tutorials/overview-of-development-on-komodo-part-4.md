# Komodo Developer Path | Understanding Tokens

## Introduction

Each Smart Chain in the Komodo ecosystem can act as a fully tokenizable platform. This provides many opportunities to the developer in creating on-chain assets that represent varying types of value for their users.

For example, tokens can be used to represent real world assets, and users can then trade these tokens using Komodo's [Token DEX]() and [AtomicDEX]() features. The developer could also create tokens that provide incentives to their audience. Or, tokens can represent collectible assets. These are but a few examples of the usefulness of on-chain tokenization. 

## Conceptualizing Tokens

#### A Token is a Satoshi

All Smart Chain coins abide by the Bitcoin-protocol standard wherein 1 coin is divisible for up to eight decimal places: `1.00000000`. The smallest unit of a Smart Coin therefore is `0.00000001` coins. By convention it is called a "satoshi," in honor of the inventor of the Bitcoin protocol.

On a Smart Chain, each individual token is derived from one individual satoshi. Therefore, each coin can be transformed into 100,000,000 tokens. 

At the time of the creation of these tokens, the creator can define their properties, grant meta data to them, and establish the nature of their scarcity. 

All of this functionality is established and secured through the [Tokens Antara Module]().

#### Fungible Token Creation

With `0.1` of our `TUT1` tutorial coins, we can create `10,000,000` tokens in one creation transaction using the [<b>tokencreate</b>](../../../basic-docs/antara/antara-api/tokens.html#tokencreate) RPC.

In the process of creation we can choose a name for these tokens.

All of the tokens created from this single transaction are fungible one with another, and maintain scarcity across the Smart Chain.

*(It is even possible with Antara technology to maintain token scarcity across multiple chains, but this is an advanced topic that we do not cover here.)*

#### Non-Fungible Token Creation

Alternatively, rather than creating a large collective of many fungible tokens, you could instead create non-fungible tokens. To achieve this, use the <b>tokencreate</b> RPC to create one token at a time. Each token requires `1` satoshi, plus transaction fees.

#### Attaching Data to Tokens

We can attach meta data to the tokens at their creation. 

The maximum size of data that can fit in a single Komodo transaction is `10000` bytes. This is enough to include all sorts of data, and even simple images.

The developer is naturally free to use their imagination in the design of this data. For example, you can describe their purpose and add a json data structure that informs other software of the properties of this token.

Advanced developers can even add functionality to allow the tokens to gain new data over time as they are passed through transactions.

## Create a Token Set on TUT1 Smart Chain

In our guided tutorial, we now create `50,000` tokens that we give the name `GOLD`.

- Enter the `SEED-MENU`
- Select the `TOKENS` submenu
- Select `CREATE`
- Enter the name `GOLD`
- Use `0.0005` tokens
- For the short description `Some GOLD tokens`

This creates 50,000 GOLD tokens by sending 0.0005 TUT1 coins to the [Tokens Antara Module.]()

Wait a minute or so for the transaction to be mined and then use the `GETINFO` function to check the balance of our wallet. There are now `0.0993` coins remaining from the `0.1` coins we had previously.

We used `0.0005` coins to create the tokens. 

We had a fee paid to the miners of `0.0001` coins. 

We also had another fee of `0.0001` coins that were sent to a special address in the Tokens Antara Module, called the "global address." The transaction for this fee had a small amount of data that permanently tells the entire `TUT1` Smart Chain community that we created these tokens. Therefore, if other users or developers want to learn about our `GOLD` tokens, they have a starting point in this global address.

## Seed or Mining Node RPC: tokenlist & tokeninfo to find details of the tokens

To see our tokens afterwards, we can use the [<b>tokenlist</b>]() and [<b>tokeninfo</b>]() RPC's.

In our guided tutorial, we have automated functions available to make this simpler.

- `SEED-MENU` > `TOKENS` > `LIST`
- `SEED-MENU` > `TOKENS` > `INFO` > `GOLD`

`LIST` calls the <b>tokenlist</b> RPC. This returns an array of token ids. A "token id" is the id of the transaction that created the token. We use this token id nearly every time hereafter when we transact with these tokens.

`INFO` calls the <b>tokeninfo</b> RPC. This RPC requires the token id of the token we desire to inspect. In our case, we chose the `GOLD` token.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-4-img-1.png">

</div>

## Create SILVER Tokens

Repeat the process to create `SILVER` tokens.

- `SEED-NODE` > `TOKENS` > `CREATE`
- Name: `SILVER`
- Amount: `0.002`
- Description: `Some SILVER tokens`

Wait for confirmation and then verify that our `0.0993` TUT1 balance is reduced to `0.0971`.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-4-img-2.png">

</div>

## Create ROCK Tokens

- `TOKENS` > `CREATE`
- Name: `ROCK`
- Amount: `0.04`
- Description: `Some ROCK Tokens`

Use the `LIST` function to find the token id for `ROCK`, and then use the `TOKENS` > `ROCK` function to retrieve the token's full information. We see the token id included as a part of the returned data.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-4-img-3.png">

</div>

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-4-img-4.png">

</div>

## Create a Non-Fungible Token

Switch to the mining node.

Recall that to create a non-fungible token, we simply use only one satoshi of the coin.

- `MINING-MENU` > `TOKENS`
- `TOKENS` > `CREATE`
- Name: `NFT1`
- Amount: `0.00000001`
- Description: `First unique token`

## Compare the Tokens on One Node Against the Other

Check the balance of the `NFT1` token on both the `SEED` node and the `MINING` node.

- `TOKENS` > `BALANCE` > `NFT1`

Note that the balance is different for the two.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-4-img-6.png">

</div>

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-4-img-7.png">

</div>

## Tutorial Series Conclusion

Thank you for following along on this introductory tutorial.

We have covered many topics using our guided-tutorial software.

To learn more about any particular aspect, visit the links below.

If you are ready to proceed with the next tutorials in our educational series, return to the [<b>Learning Launchpad</b>]() section.

- Create a new Smart Chain
  - [<b>Create a Default Smart Chain</b>](../../../basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.html#creating-a-new-smart-chain)
  - [<b>ac_name</b>]()
- Create a coin supply
  - [<b>ac_supply</b>]()
- Create and use a faucet
  - [<b>Faucet Antara Module</b>]()
- Mine transactions
  - [<b>setgenerate</b>]()
- Create fungible and non-fungible tokens
  - [<b>Tokens Antara Module </b>]()
