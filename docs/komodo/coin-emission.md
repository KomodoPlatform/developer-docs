# Inflation Mechanisms

New KMD coins are created in two ways:

1. Mining (Normal mining - `25%` and notary mining - `75%`)
2. [Rewards](../whitepaper/chapter8.html#rewards) (~ `5.1%` reward to active users that have atleast `10 KMD`)

:::tip Note

The emission schedule for KMD is as follows:

- 3 KMD per block till the block height of KMD reaches `7777777`. This is the same block height at which Reward creation stops
- 2 KMD per block from the block height `7777777` till the block height of KMD reaches `2 * 7777777`
- 1 KMD per block from the block height `2 * 7777777` till forever

:::

Let us explore the amount of KMD created each year through these two mechanisms.

## Mining

- Each block of KMD mined, creates `3 KMD`
- KMD block creation rate: 1 block per minute
- Total minutes in a year = `365 * 1440` = `525600`
- Total KMD mined in a year = `525600 * 3` = `1576800` ~ `1.58` million

:::tip Note

Out of the above mining rewards,

- `25%` is mined by normal miners = `0.25 * 1576800` = `394200` ~ `0.4` million
- `75%` is mined by notaries = `0.75 * 1576800` = `1182600` ~ `1.18` million

:::

## Rewards

[Rewards](../whitepaper/chapter8.html#rewards), more accurately called the "Active User Rewards", are a unique feature to Komodo, made possible by our consensus mechanism [Delayed Proof of Work (dPoW)](../whitepaper/chapter3.html). The important point to note is that, as KMD chain is secured by dPoW (thereby recycling BTC chain's hash power), there is no need to attract huge quantities of its own hash power for security. This is the rationale behind having a `75%` notary mining even in the comparitively smaller amount of the mining induced inflation.

### How [Rewards](../whitepaper/chapter8.html#rewards) work

- Any utxo on the KMD chain whose age is greater than `1 hour` and value greater than `10 KMD` is eligible to send a transaction whose output is greater than its input.
- The amount that can be claimed keeps increasing as the age of the utxo increases and caps at the age of 1 month. If the utxo hasn't claimed the rewards or done another transaction in a month, the rewards are capped.
- The monthly reward comes out to be approximately: ~ `0.42%`. Please see this [npm module](https://github.com/atomiclabs/get-komodo-rewards/blob/master/index.js) or the [source code](https://github.com/jl777/komodo/blob/jl777/src/komodo_interest.h) to learn about the exact way the rewards are calculated.
- The above rule and the value of extra satoshis that can be claimed is part of the KMD chain's consensus rules
- The total value of the rewards that can be claimed by a person claiming atleast once a month compounded is approximately ~ `5.1%` . This [page](https://www.atomicexplorer.com/#/rewards-calc) has a handy rewards calculator.
- Rewards cannot be claimed by utxos created after the KMD block height: `7777777`

### Now let us calculate the inflation caused by "Rewards"

Assume that, all the KMD currently in circulation is in utxos whose size is greater than `10` and all the users will claim atleast once a month for the next 1 year = 12 months.

::: warning
This is not actually the reality, as many exchanges and cold storage wallets don't regularly claim their rewards. These unclaimed rewards are minable.
:::

- KMD in circulation currently: ~ `112462628` ~ `122.4` million
- Approximate amount of rewards claimable (excluding the mined KMD as that too will be eligible to claim rewards) = `112462628 * 0.051` = `5735594` ~ `5.73` million

## Summary

In 1 year:

- KMD created by normal miners : ~ `0.4` million
- KMD created by notaries : ~ `1.18` million
- KMD created by claims of the "Active User Reward": ~ `5.73` million

::: tip Note
Also worth observing is that, while the mining rewards stay the same for both notaries and miners, the KMD produced through the rewards claim process keeps increasing every year as the amount of KMD held by the community increases.
:::
