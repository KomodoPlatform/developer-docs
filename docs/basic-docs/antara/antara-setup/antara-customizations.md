# Antara Customizations

The Antara Framework offers various default Antara Customizations.

The desired combination of parameters should be included with the `komodod` execution every time the Smart Chain daemon is launched.

Changing these customizations at a later time is possible, but this typically requires a hard-fork of your Smart Chain. In general, the best practice for a developer is have all Smart Chain's parameters finalized before decentralizing the ownership of your coin. Should you discover a need to change these parameters after the fact, please reach out to our development team for assistance.

## ac_adaptivepow

::: warning

This parameter is in its final testing stages.

:::

#### Understanding Difficulty Stranding

The `ac_adaptivepow` parameter solves a vulnerability known as "Difficulty Stranding." Low-hashrate blockchains are particularly susceptible to this vulnerability.

When a blockchain's hashrate is much lower than that of another blockchain with the same mining algorithm, miners from the higher-powered chain can move to the lower-powered chain and mine a large number of blocks in a short amount of time.

In so doing, the rapid influx of new miners causes a part of the lower-powered chain's consensus mechanism called the Difficulty Adjustment Algorithm (DAA) to drastically increase the difficulty of finding a block. When the higher-powered group of miners leave, the difficulty level remains.

The smaller group of miners now may not be able to provide enough hash power to overcome the new difficulty level, and therefore this chain can be frozen.

This type of behavior is called "difficulty stranding,” and can be used as a method of malicious attack. This is a threat that is faced by all pure PoW chains that have a minor hashrate.

#### ac_adaptivepow Adjusts the Difficulty Level

The `ac_adaptivepow` parameter changes the Difficulty Adjustment Algorithm (DAA) of a Smart Chain to alleviate the potential effects of a "difficulty stranding" attack.

One method by which `ac_adaptivepow` alleviates the vulnerability is the changing of the time at which the difficulty level is set. Normally, the difficulty level is adjusted at the conclusion of finding a new block. With `ac_adaptivepow`, the difficulty target is adjusted as a part of the process of finding a new block.

This makes the process of lowering the difficulty easier and faster, as the DAA can take into account the amount of time the miners on the network are consuming to find a new block. If the amount of time is too high, the DAA can lower the difficulty as needed. More details on the implementation and rationale can be found in this [blog post.](https://medium.com/@jameslee777/adaptivepow-the-solution-to-diff-stranding-of-smaller-blockchains-425609df5563)

Adding the parameter `-ac_adaptivepow=1` enables AdaptivePoW for a newly created Smart Chain.

## ac_algo

::: warning

This parameter is in its final testing stages. Please reach out to us if you would like to use it on a production chain.

:::

The `ac_algo` parameter changes the chain's mining algorithm from the default equihash to the verushash.

To enable this feature, set `-ac_algo=verushash`.

This activates verushash1.0. More recent versions of verushash are not yet supported.

The verushash feature serves as a proof of concept for adding support for additional mining algorithms.

The Komodo team is currently testing methods to support compatibility for `ac_staked`, but this feature is not yet recommended for external testing.

## ac_blocktime

This parameter sets the average time (in seconds) by which a new block should be mined.

If this parameter is not included, the default value is `ac_blocktime=60`.

When the value of `ac_blocktime` is less than `60`, the Smart Chain's block time will stabilize within less than twelve hours after launch. If the Smart Chain's `ac_blocktime` value is greater than `60`, the Smart Chain's block time can require several days to stabilize.

When the value of `ac_blocktime` is less than `12` seconds (a high speed Smart Chain), the variances in network quality between consensus nodes (miners and stakers) can create difficulties in achieving a stable blockchain consensus. High-speed Smart Chains may function effectively on a LAN or other stable network, but Komodo recommends caution when attempting to manage a high-speed Smart Chain on the public Internet.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Examples">

A 777777 coin pre-mine with a 1-coin block reward and a block speed of 20 seconds.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 -ac_blocktime=20 &
```

</collapse-text>

## ac_cbmaturity

The `ac_cbmaturity` parameter allows the `COINBASE_MATURITY` value to be changed.

The `COINBASE_MATURITY` value is the number of blocks that must be confirmed between the creation of a coin (in a coinbase transaction) and the moment the coin can be spent.

This allows the developers of a Smart Chain to require that miners and stakers on a blockchain network wait for an arbitrary amount of time after mining new coins to spend them..

For example, if a Smart Chain is set to `ac_cbmaturity=10`, newly mined coins must wait for 10 confirmations on the network before they can be spent.

By default, this value is set to `1` on Smart Chains without [ac_eras](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-eras) and set to `100` on Smart Chains with [ac_eras](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-eras).

## ac_cbopret

(In Development)

The `ac_cbopret` parameter allows the Decentralised Trustless Oracle mechanism to be enabled on a Smart Chain.

::: tip Fact

The [Prices Antara module](../../../basic-docs/antara/antara-api/prices.md) required the existence of a completely trustless and decentralized price feed Oracle (a DTO). The DTO was implemented by [piggybacking on the timestamp consensus rules](https://medium.com/@jameslee777/decentralized-trustless-oracles-dto-by-piggybacking-on-timestamp-consensus-rules-2adce34d67b6). It works by requiring the miners of the Smart Chain to include the required off-chain data as a part of OP_RETURN of the coinbase transaction (The transaction that pays the block reward to the miner). The validation of the off-chain data is part of the consensus rules and if the data is false, the block will be rejected by the network, which incentivizes the miner to be truthful. To achieve consensus, all nodes allow an error of about 1% in the reported data.

:::

The value of the parameter is a 4 bit binary number converted to decimal. Each bit of the binary number has a specific meaning as explained below:

Let the 4 bit binary number be `wxyz`

w,x,y,z are bit4, bit3, bit2 and bit1 respectively

- if z = 1 : DTO is enabled and miners are required to add some data to the coinbase transaction's [OP_RETURN](../../../basic-docs/antara/antara-tutorials/advanced-series-3.html#response-annotated)
- if y = 1 : the data miners will write is prices of BTC vs fiat pairs viz., BTC_USD, BTC_GBP, BTC_EUR and Major fiat vs USD pairs
- if x = 1 : the data miners will write is prices of Cryptocurrencies included in the [-ac_prices](#ac-prices) parameter
- if w = 1 : the data miners will write is prices of Stocks included in the [-ac_stocks](#ac-stocks) parameter

### Examples

- If we only want the prices for BTC vs fiat pairs and fiat vs USD pairs, we have (w=0,x=0,y=1,z=1) i.e., `0011` -> converted to decimal is `3`; the value for the `ac_cbopret` parameter is `3`
- If we want the pairs from the above example and prices of the Cryptocurrencies included in the [-ac_prices](#ac-prices) parameter, we have (w=0,x=1,y=1,z=1) i.e., `0111` -> converted to decimal is `7`; the value for the `ac_cbopret` parameter is `7`
- If we just want the prices of the Stocks included in the [-ac_stocks](#ac-stocks) parameter, we have (w=1,x=0,y=0,z=1) i.e., `1001` -> converted to decimal is `9`; the value for the `ac_cbopret` parameter is `9`

## ac_cc

::: warning Notice
This parameter is still in testing.
:::

The `ac_cc` parameter sets the network cluster on which the chain can interact with other chains via Antara modules and MoMoM technology.

Once activated, the `ac_cc` parameter can allow features such as cross-chain fungibility -- coins on one Smart Chain can be directly transferred to any other Smart Chain that has the same `ac_cc` setting and the same set of notary nodes (same set of `notary pubkeys`) .

Most functionalities enabled by `ac_cc` can function with or without Komodo's notarization service. However, cross-chain transaction validation and its dependent features, including cross-chain fungibility, require notarization.

If the `ac_cc` parameter is set to a value greater than `0` (i.e. Antara is permitted on the Smart Chain) users should include the [-pubkey](../../smart-chains/smart-chain-setup/common-runtime-parameters.html#pubkey) parameter when launching the daemon of this Smart Chain.

### ac_cc=0

Setting `ac_cc=0` disables Antara on the Smart Chain entirely.

::: tip
It is better to <b>NOT</b> use `ac_cc=0` for a Smart Chain where Antara should not be enabled. Omitting the `ac_cc` parameter altogether will achieve the same result.
:::

### ac_cc=1

Setting `ac_cc=1` permits Antara on the Smart Chain, but will not allow the Smart Chain to interact in cross-chain Antara functionality with other Smart Chains.

### ac_cc=2 to 99

The values of `2` through `99` (inclusive) indicate Smart Chains that can validate transactions that occur on other Smart Chains on the same cluster (i.e. the same `ac_cc` value), but their coins are not fungible and therefore cannot be transferred between blockchains.

### ac_cc=100 to 9999

Setting the value of `ac_cc` to any value greater than or equal to `100` will permit cross-chain interaction with any Smart Chain that has the same `ac_cc` value and is secured by notary nodes with the same `pubkey`.

All Smart Chains that have the same `ac_cc (>= 100)` value form a cluster, where the base tokens of all the chains in the cluster are fungible via the [burn protocol](../../smart-chains/smart-chain-api/crosschain.html).

For example, a Smart Chain set to `ac_cc=201` in its parameters can interact with other Smart Chains with `ac_cc=201` on the same notary-node network, but cannot interact with a Smart Chain set to `ac_cc=301`.

### Summary of `ac_cc`

::: tip Consider a chain with -ac_cc=N

- If <b>N = 0</b>, Antara is disabled
- If <b>N > 0</b>, Antara is enabled
- If <b>N = 1</b>, on-chain Antara is active, cross-chain validation is disabled
- If <b>N >= 2 and <= 99</b>, the chain allows for cross-chain contracts between all other chains bearing the same N value. The base coins in each Smart Chain are non-fungible across chains.
- If <b>N >= 100</b>, the chain can form a cluster with all other chains with the same N value and on the same dPoW notarization network. The base coins of all chains in the cluster are fungible via the [burn protocol](../../smart-chains/smart-chain-api/crosschain.html).
  :::

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A 777777 pre-mined chain with no Antara modules enabled.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 &
```

A 777777 pre-mined chain with Antara modules on-chain only; no cross-chain Antara modules.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=1 &
```

A 777777 pre-mined chain where Antara modules are allowed between all fellow Smart Chains that have -ac_cc=2 in their launch parameters. However, the cross-chain burn protocol is not active, and therefore coins cannot be transferred between chains.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=2 &
```

A 777777 pre-mined chain. Antara modules are allowed between all fellow Smart Chains that have -ac_cc=102 in their launch parameters. Also, all -ac_cc=102 chains can use the cross-chain burn protocol to transfer coins from one chain to another.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=102 &
```

</collapse-text>

## ac_ccactivate

**-ac_ccactivate=block_height**

The `ac_ccactivate` launch parameter allows for the activation of Antara on an existing Komodo-based Smart Chain wherein Antara was not originally enabled.

Add the `ac_ccactivate` parameter to the existing launch command for the Smart Chain and set the value equal to a future block height. When this block height is reached, Antara will be available on the Smart Chain.

This change requires a hard fork of the Smart Chain. If the Smart Chain is receiving Komodo's dPoW security service, the notary nodes must relaunch their Smart Chain daemons with the new launch parameter. All nodes must also update their daemons in the same manner.

By default, `ac_ccactivate` uses the default `ac_cc` value of `ac_cc=2`. It is not necessary to further specify `ac_cc` in the launch parameters, unless a value other than `2` is required.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Examples">

##### Before Using `ac_ccactivate`

```bash
./komodod -ac_name=EXAMPLE -ac_supply=72000000 -addnode=24.54.206.138 &
```

##### After Using `ac_ccactivate`

```bash
./komodod -ac_name=EXAMPLE -ac_supply=72000000 -ac_ccactivate=140 -addnode=24.54.206.138 &
```

In this example, Antara will be available at blockheight `140`. All nodes, include the notary nodes, must relaunch the daemon with the new parameters before blockheight `140`.

</collapse-text>

## ac_ccenable

::: warning
This parameter is at the end of the beta development phase and is prepared for public testing. If you are interested in adopting this feature for a production Smart Chain, please reach out to us so that we can assist you.
:::

The `ac_ccenable` parameter restricts the Smart Chain so that only indicated Antara modules can be enabled. `ac_ccenable` requires [ac_cc](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-cc) to be active.

To indicate which Antara modules should be available, insert each module's eval code in decimal and separated by commas.

The following table presents an abbreviated list of EVAL codes. For more information, please see [this linked content](https://github.com/jl777/komodo/blob/master/src/cc/eval.h).

| Name of the module | EvalCode |
| ------------------ | -------- |
| IMPORTPAYOUT       | 225      |
| IMPORTCOIN         | 226      |
| ASSETS             | 227      |
| FAUCET             | 228      |
| REWARDS            | 229      |
| DICE               | 230      |
| FSM                | 231      |
| AUCTION            | 232      |
| LOTTO              | 233      |
| HEIR               | 234      |
| CHANNELS           | 235      |
| ORACLES            | 236      |
| PRICES             | 237      |
| PEGS               | 238      |
| TRIGGERS           | 239      |
| PAYMENTS           | 240      |
| GATEWAYS           | 241      |
| TOKENS             | 242      |
| IMPORTGATEWAYS     | 243      |

For example, the following parameters create a Smart Chain where only the `faucet` and `rewards` modules are active:

```bash
./komodod -ac_name=EXAMPLE -ac_supply=0 -ac_reward=100000000 -ac_cc=2 -ac_ccenable=228,229
```

When `-ac_cc` is set, but `-ac_ccenable` is not, all Antara modules are enabled.

::: warning
`ac_ccenable` disables spending utxos that are created under a non-enabled Antara module. We have also implemented additional functionality that disables API functions. This prevents the user from creating a utxo that `ac_ccenable` would render unspendable. It is still possible to create raw transactions that bypass this security feature, and thus create utxos that are unspendable. A normal user or developer relying on our API functionality should not be concerned with this. However, those who experiment with raw transactions should be cautious.
:::

::: warning
If the developer is also using a new feature that has yet to be documented here, `ac_cclib`, the eval codes in the `libcc.so` will not disable Antara API calls. Therefore, there remains a risk that a disabled API call can still be used to create a utxo, which will then be non-spendable.
:::

## ac_cclib

The `ac_cclib` parameter is used in conjunction with various Antara modules.

Typically, the Smart Chain that uses the `ac_cclib` parameter will have a unique build process. This is described as a part of each Antara module in question. Once the Smart Chain is properly built, the terminal command to launch the chain will include the `ac_cclib` parameter in a manner similar to the following:

```bash
-ac_cclib=desired_CC_module
```

Each Antara module uses the `ac_cclib` parameter differently, and therefore the reader should refer to the desired Antara module for further instructions.

## ac_decay

This is the percentage which determines the block reward decrease on each block-reward "halving".

This parameter will have no effect if [ac_reward](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-reward) is not set.

This is the formula that `ac_decay` follows:

```bash
block_reward_after = block_reward_before * ac_decay / 100000000;
```

For example, if this parameter is set to `75000000`, at each "halving" the block reward will drop to 75% of its previous value.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Examples">

A 777777-coin pre-mine, with a 10-coin block reward, and the block reward decreases by 25% every 2000 blocks.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000 &
```

</collapse-text>

## ac_end

This is the block height at which block rewards will end. Every block after this height will have 0 block reward (this means that, assuming all other settings are default, the only incentive to mine a new block will be transaction fees).

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Examples">

A 777777-coin pre-mine, with a block reward of 0.0005 coin. The block reward ends at block 25000.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=50000 -ac_end=25000 &
```

A 777777-coin pre-mine, with a 5-coin block reward, and the block reward ends at block 200.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000 -ac_end=200 &
```

A 777777-coin pre-mine, with a 5-coin block reward, the block reward decreases by 50% every 2000 blocks, and the block reward ends at block 10000.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000 -ac_halving=2000 -ac_end=10000 &
```

</collapse-text>

## ac_eras

The `ac_eras` parameter allows the value of a chain's block reward to vary over time.

Each different time interval is called an "era" and a chain can have at most seven eras.

#### ac_eras Combined With ac_cbmaturity

When active, `ac_eras` changes the behavior of coinbase coins (i.e., the coins that are created as a result of mining). `ac_eras` forces the `COINBASE_MATURITY` value of coinbase coins to be `100` instead of the normal value of `1`. Therefore, coinbase coins become spendable after `100` confirmations.

This `COINBASE_MATURITY` value can be explicitly changed using the [ac_cbmaturity](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-cbmaturity) parameter. Changing this `COINBASE_MATURITY` value to `1` is recommended if a chain uses `ac_eras` in conjunction with [ac_staked](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-staked).

#### ac_eras Instructions

The `ac_eras` parameter accepts only one value. The value must be between `2` and `7`, inclusive. When activated, `ac_eras` allows certain other Smart Chain parameters to accept multiple values.

The principle parameter that is affected by `ac_eras` is [<b>ac_reward</b>](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-reward). The `ac_reward` parameter must receive at least one value.

Also, [ac_decay](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-decay), [ac_halving](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-halving), [ac_end](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-end), and [ac_notarypay](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-notarypay) can each receive multiple values and thereby affect reward functionality.

For every era, there must be a corresponding value in `ac_end` that indicates the block height at which this era ends. To set the final era to last indefinitely, set the `ac_end` value of that era to `0`; the `0` setting should only be used for the last era. If the last era's `ac_end` value is not `0`, the chain's block rewards will stop after the final `ac_end` value, and every block after the final `ac_end` value will have no block reward.

In all parameters receiving multiple values, the values must be preceded by a comma.

For example:

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_eras=3 -ac_reward=5000000000,7000000000,4000000000 -ac_end=1000,10000,0
```

In this Smart Chain, the first era will have a reward of 5000000000, the second will have 7000000000, and the third will have 4000000000. The reward for the first era ends at block 1000, for the second era at block 10000, and the third era lasts indefinitely.

If any of the relevant parameters has fewer distinct values than eras, the parameter's final value will carry through the remaining eras.

For example:

```bash
-ac_eras=2 -ac_reward=100000000,200000000 -ac_halving=100 -ac_end=10000,0
```

In this Smart Chain, the `ac_halving` value for both eras is `100`.

One more feature of `ac_eras` is the ability to transition from one era to the next with a linear progression, rather than a direct switch. To achieve this effect, in the initial era (the point at which the linear progression should begin) set the `ac_decay` value to `100000000` and the `ac_halving` value to `1`.

For example, the following parameters create a Smart Chain with a "slow start" reward:

```bash
./komodod -ac_name=HELLOWORLD -ac_reward=0,10000000000 -ac_eras=2 -ac_end=1000,0 -ac_decay=100000000,100000000 -ac_halving=1
```

This chain's block reward will grow linearly from 0 to 100 over 1000 blocks, then stay at 100 indefinitely.

::: tip Tip

Use the [getblocksubsidy](../../../basic-docs/smart-chains/smart-chain-api/mining.html#getblocksubsidy) API method to verify your Smart Chain will work as expected at each relevant height: <br> `./komodo-cli -ac_name=HELLOWORLD getblocksubsidy <blockheight>`

:::

## ac_feeds 

::: tip Note

The ac_feeds customization is in development. Please reach out to the Komodo team for more information or to use this customization in a production environment.

:::

:::tip Note

The ac_feeds parameter is directly relevant to the [Prices Antara module](../antara-api/prices.md). The Prices module also requires the inclusion of the following parameters in the launch command of a Smart Chain: [-ac_cbopret](#ac-cbopret), [-ac_cc=n (where n >=2)](#ac-cc) .

:::

The `ac_feeds` parameter supports the retrieval of data from sources accessed using the `http/https` protocols and which return data as a json object. 

The [Antara Prices Module](#prices.html) has an internal parser that processes the json object using the [RFC 6901 'Json Pointer' addressing](https://tools.ietf.org/html/rfc6901). The internal parser extracts the value specified by the json pointer or calculates the average value for the specified value paths, as explained below.

This parameter also allows the addition of a custom shared object library (a `.so` file) that has the necessary parsing function to retrieve values from the json object returned by a web api. This feature can be used when the json object returned is non-standard and the internal parser's features are not sufficient. In this event, the parsing function takes the json object and several configuration options, such as `customdata`, as arguments and returns the price. The configuration options inform the function about the location of the price data within the json object.

The value of this parameter is a quoted string that contains a json array of feed-configuration options.

### Basic Usage

```bash
-ac_feeds='[{"name":"stocks", "url":"https://api.iextrading.com/1.0/tops/last?symbols=AAPL,ADBE", "results":[{"symbol":"AAPL","valuepath":"/0/price"}, {"symbol":"ADBE","valuepath":"/1/price"}], "multiplier":1000000, "interval":120 }, {configuration object for another feed ...}]'
```

Each json object in the above json array defines a unique Feed. The json array includes details such as the Feed's name, the web api's url, the symbol for each of the items in the feed, and the path to acquire the price data for an item from the json returned from the web api.

##### ac_feeds Example

```json
{
  "name": "stocks",
  "url": "https://api.iextrading.com/1.0/tops/last?symbols=AAPL,ADBE",
  "results": [
    { "symbol": "AAPL", "valuepath": "/0/price" },
    { "symbol": "ADBE", "valuepath": "/1/price" }
  ],
  "multiplier": 1000000,
  "interval": 120
}
```

The above configuration object defines a single feed named "stocks" that contains prices of the symbols `AAPL` and `ADBE` retreived from the web api with the "url": `https://api.iextrading.com/1.0/tops/last?symbols=AAPL,ADBE`. 

The returned data is a json array and is processed by ac_feeds's internal parser to set the prices of the symbols `AAPL` and `ADBE` based on the data in the json array. This data is found in the `results` key.

```json
{ "symbol": "AAPL", "valuepath": "/0/price" }
```

The value of the key named `symbol` sets the symbol for the item in the price feed.

The value of the key named `valuepath` is a json "pointer" that indicates the method to extract the value of the price matching the symbol in the response. For example, when the parser encounters the value `"/0/price"`, the parser selects the `0th` element of the json array and reads the value of the key named `price`.

The value of the key named `multiplier` is the number by which the value extracted should be multiplied before being added to the feed. This convers numbers with decimal paces into integers.

The value of the key named `interval` is the time in seconds between each refresh of the data from the web api. The minimum value is `120`.

#### Polling the Same url Multiple Times

The following example can be useful when polling the same url multiple times with a fixed subset of changing.

```bash
-ac_feeds='[{"name":"metals", "url":"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/%s/USD", "substitutes":["XAU","XPT"], "quote":"USD", "results":{"averagevaluepaths":["/*/spreadProfilePrices/*/ask","/*/spreadProfilePrices/*/bid"] }, "multiplier":10000, "interval":120 }]'
```

The above example has the configuration for a single feed named "metals" that allows for the retrieval of the prices `XAU/USD` (`XAU_USD`) and `XPT/USD` (`XPT_USD`) symbols from the web api hosted by `forex-data-feed.swissquote.com`. 

The key `url` has the actual address of the web api, with `%s` included to denote "substitute". All the urls formed by the substitution `%s` and with elements of the array stored in the key named `substitues` are polled. Their responses are processed and added to the feed. As before, the key named "results" holds the data that indicates the method for processing the responses.

```json
{
  "averagevaluepaths": [
    "/*/spreadProfilePrices/*/ask",
    "/*/spreadProfilePrices/*/bid"
  ]
}
```

In this case, the `results` object indicates that the price value to be added to the feed is the average of all values retrived from the responses based on the json pointers `"/*/spreadProfilePrices/*/ask"` and `"/*/spreadProfilePrices/*/bid"`. 

Note the '\*' symbols in the json pointers. These indicate that the response is an array and all the elements of the array will be used in the calculation of the average. When the key `substitutes` is used in the configuration, the `result` parameter is a json object and is applied to the resulting json response from polling each url formed by using each substitute.

There is also an optional parameter named `quote` which is added to the symbol of the price in the feed. For example, using the values `"quote":"USD"` displays the prices as `XAU_USD` and `XPT_USD` in the feed. The `quote` value can also be empty if the strings in the array `substitutes` are complete symbols.

#### Method of Handling when the Internal Parser is Inadequate

When the internal parser of the `ac_feeds` customization is inadequate for parsing responses from a web API, the following example can be of assistance.

```bash
-ac_feeds='[{"name":"metals", "url":"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/%s/USD", "substitutes":["XAU","XPT"], "quote":"USD", "customlib":"libpricessampleparser.so", "results":{"customdata":"/0/spreadProfilePrices/0/ask"}, "multiplier":10000, "interval":120 }]'
```

This feed configuration has a custom parser. 

The feed is differentiated from the previous feed by the `customlib` key, which contains the name of a shared library that contains the custom parser, and the `customdata` key, which is arbitraty data passed to the custom parser function in the shared library.

#### -ac\_feed Parameters

| Parameter     | Type                                   | Description                                                                                                                                                                                                                                                                               | Example                                                                                                                |
| ------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| "name"        | (mandatory, string)                    | the name of the configuration item                                                                                                                                                                                                                                                                | `"name":"stocks"`                                                                                                      |
| "url"         | (mandatory, string)                    | the url of the web api to be polled; if the url contains `%s`, the configuration must also contain the `substitutes` parameter                                                                                                                                                                | with no `%s` - "url": `https://api.trade.com/1.0/` <br><br> with `%s`: "url" - `https://api.fin.com/api/?symbol=%sBTC` |
| "substitutes" | (optional, array of strings)           | a list of strings to substitute '%s' symbols in the `url` parameter to create requests; this supposes that each request returns a single value. If there is no `substitutes` key array in the configuration, then a poll may return many values                                                                  | `"substitutes":["XAU","XPT"]`                                                                                          |
| "quote"       | (optional, string)                     | the string to be added to each string in the `substitutes` parameter to form a symbol of a currency pair, such as ``"USD_BTC"`, to represent the price data retreived from the feed                                                                                                                 | `"quote":"BTC"`                                                                                                        |
| "customlib"   | (optional, string)                     | the name of the custom-parser library                                                                                                                                                                                                                                                             | `"customlib": "libmyparser.so"`                                                                                        |
| "results"     | (mandatory, json object or json array) | contains parameters to parse the json response from the web api; this is an **object** if the parameter `substitutes` is present (in this case, the substitute is applied to the response from each poll, thus making the response arrive at one value ). Otherwise, the value is an **array** (this event allows for the retrieval of several values from the response). | see the structure and examples in the succeeding tables                                                                |
| "multiplier"  | (optional, number)                     | an integer multiplier that indicates the value by which the result(s) should be multiplied to create an integer; the default value is `1`                                                                                                                                                                                                                           | for forex prices, `"multiplier":10000` <br><br> for cryptocurrencies, `"multiplier":100000000`                         |
| "interval"    | (optional, number)                     | the poll interval, given in seconds; this value should be greater than or equal to `120`; the default value is `120`                                                                                                                                                                                                      | `"interval":180`                                                                                                       |
<!-- Sidd: i'm not sure I understood all of this re: results parameter -->
#### Results Array Members

| Name           | Type                         | Description                                                                                                                                                                                                           | Example                                            |
| -------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| "symbol"       | (optional, string)           | the symbol to be displayed in the feed for the value retrieved                                                                                                                                                  | `"symbol":"USD_BTC"`                               |
| "valuepath"    | (optional, string)           | a json pointer to the value                                                                                                                                                                                         | `"valuepath":"/BTC/price"`                         |
| "averagepaths" | (optional, array of strings) | a list of json pointers to values. If present, the average is calculated. In the position where an array index is expected in the json pointer, the value can be '\*' -- this instructs the parser to use all available array elements | `"averagepaths":["/prices/*/bid", /prices/*/ask"]` |
| "customdata"   | (optional, string)           | arbitrary data passed to the custom lib function                                                                                                                                                                      | `"customlib":"/price"`                             |

:::tip Notes

- The "results" array must be comprised of objects if the "substitutes" parameter is NOT used
- If no custom library (customlib) is used, the "symbol" property should be set
- If no custom library (customlib) is used, either the "valuepath" or the "averagepaths" property should be set

:::

#### Results Object Members

| Name           | Type                         | Description                                                                                                                                                                                                           | Example                                            |
| -------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| "valuepath"    | (optional, string)           | the json pointer to the value                                                                                                                                                                                         | `"valuepath":"/BTC/price"`                         |
| "averagepaths" | (optional, array of strings) | a list of json pointers that point to values. If present, the average is calculated. In the position where an array index is expected in the json pointer, the value can be '\*' -- this denotes that the parser must use all the available array elements | `"averagepaths":["/prices/*/bid", /prices/*/ask"]` |
| "customdata"   | (optional, string)           | arbitrary data passed to the customlib function                                                                                                                                                                      | `"customlib":"/price"`                             |

:::tip Notes

- "results" must be an object if the "substitutes" parameter is used
- The "symbol" parameter is not used in the "results" object as the symbol names are constructed from the strings in the "substitutes" array and in the optional "quote" property
- If no custom library (customlib) is used, then either the "valuepath" or the "averagepaths" property should be set in each array item

:::

#### Specification for the Custom Parser Library

The custom json parser is a shared library that should be placed along with the Komodo source code with building instructions in the `src/cc/priceslibs` directory.

The custom library should implement a single function written in the C-language with its declaration specified in the file `pricesfeeds.h` as follows:

```cpp
extern "C" {
    int pricesJsonParser(const char *sjson /*in*/, const char *symbol /*in*/, const char *customdata, uint32_t multiplier /*in*/, uint32_t *value /*out*/);
}
```

On each call, the function should retrieve a single value and place it in the '\*value' variable.

The function receives the following parameters:

- A string with the json returned by web api
- The symbol to retrieve
- Custom data from the configuration
  - The custom data might contain hints on how to find the value in the json object
- A multiplier used to convert the price value to integer

The function should return `1` for the `success` scenario and `0` if the function could not extract the value.

For an example implementation, see the custom parser lib example in the file named `PricesResultParserSample.cpp` in the directory `src/cc/priceslibs` in the Komodo source code.

#### Initializing Price Feed Configuration

The configuration object is named `feedconfig` and is found in the file `src/cc/pricesfeeds.cpp`. 

Use an existing configuration (config) item with `name="basic"` as an example.

## ac_founders

The `ac_founders` parameter creates a "founder's reward."

This parameter requires [ac_perc](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-perc). If the `ac_perc` value is not declared, the `ac_founders` value defaults to `35%`. Also, either [ac_pubkey](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-pubkey) OR [ac_script](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-script) must be set.

The `ac_perc` value determines the percentage of block rewards paid to the founder. These rewards are not paid out immediately, but rather according to the `ac_founders` setting.

`ac_founders` determines the frequency at which the founder's reward is paid.

For example:

```bash
-ac_reward=100000000 -ac_perc=10000000 -ac_founders=100
```

The above parameters result in mining rewards of 100000000 satoshis (1 coin) per block, with a difference on every 100th block. On the 100th block exception, 1000000000 additional satoshis (10 coins) are paid to the founder's address.

The coins rewarded to the founder are created at the moment of payment, thus increasing the overall coin supply. See [ac_perc](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-perc) for more details.

Use `ac_pubkey` to send the founder's reward to a normal address.

Use `ac_script` to send the founder's reward to a multi-signature address.

Set `ac_founders=1` to stay compatible with most stratum implementations. Any other value requires team member `Blackjok3r`'s modifications to knomp using the [disable-cb feature](https://github.com/webworker01/knomp#disable-coinbase-mode). Please reach out to our team on [discord](https://komodoplatform.com/discord) if you have further questions about how to set up a stratum.

## ac_founders_reward

The `ac_founders_reward` parameter functions in a manner that is similar to a combination of the `ac_perc` and `ac_founders` parameters.

However, the value specified in the `ac_founders_reward` parameter is given in satoshis, as opposed to a percentage of the block reward. Also, the founder's reward does not accumulate over several blocks.

The `ac_founders_reward` parameter can be used in place of `ac_perc`.

The `ac_founders_reward` parameter must be used in combation with `ac_founders` and either `ac_script` or `ac_pubkey`.

The `ac_founders_rewards` value is entirely independent of the `ac_reward` value.

Consider the following combination of parameters, for example.

```bash
-ac_reward=1000000000 -ac_perc=10000000 -ac_founders=10 -ac_pubkey=034916536402c0c4cf53b05e3b5d948aacafede47df640b33cb89bd28179cd2d3f
```

This combination pays the pubkey address 10 coins every 10 blocks.

Compare the above to the following combination.

```bash
ac_reward=1000000000 -ac_founders_reward=100000000 -ac_founders=10 -ac_pubkey=034916536402c0c4cf53b05e3b5d948aacafede47df640b33cb89bd28179cd2d3f
```

This combination pays the pubkey address 1 coin every 10 blocks.

The `ac_founders_reward` parameter is not compatible with the [ac_eras](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-eras) parameter.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Examples">

A 777777-coin pre-mine, with a 5-coin block reward, and founder's reward of 10 coins sent to `034916536402c0c4cf53b05e3b5d948aacafede47df640b33cb89bd28179cd2d3f` every 10 blocks.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000 -ac_founders_reward=1000000000 -ac_founders=10 -ac_pubkey=034916536402c0c4cf53b05e3b5d948aacafede47df640b33cb89bd28179cd2d3f &
```

</collapse-text>

## ac_halving

This is the number of blocks between each block reward halving. This parameter will have no effect if [ac_reward](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-reward) is not set. The lowest possible value is `1440` (~1 day). If this parameter is set, but [ac_decay](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-decay) is not, the reward will decrease by 50% each halving.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Examples">

A 777777-coin pre-mine, with a 5-coin block reward, and the block reward decreases by 50% every 2000 blocks.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000 -ac_halving=2000 &
```

</collapse-text>

## ac_name

::: warning
All Smart Chains are required to set ac_name.
:::

This is the ticker symbol for the coin you wish to create. We recommended it consist only of numbers and uppercase letters.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A simple Smart Chain

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 &
```

</collapse-text>

## ac_notarypay

The `ac_notarypay` parameter rewards the notary nodes each time they participate in a notarization.

This value should be set to the total amount of satoshis rewarded to all participating notaries in a notarization. The reward is then divided evenly between all participating notaries.

On the KMD dPoW network the amount of notaries in a notarization is 13. Therefore, if the `ac_notarypay` value is set to `1300000000`, each notary receives 1 coin for each notarization they perform.

Notarizations happen on average every 10 blocks by default.

This parameter is compatible with the [ac_eras](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-eras) parameter.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A Smart Chain with 777777 pre-mined coins, a 5 coin block reward in the first era, a 10 coin block reward in the second era, paying 1 coin per notarization in the first era and paying 2 coins per notarization in the second era. The first era ends at block 10000. The second era ends at block 20000. After block 20000, there will be no block reward and no `ac_notarypay` reward.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000,1000000000 -ac_notarypay=1300000000,2600000000 -ac_eras=2 -ac_end=10000,20000 &
```

</collapse-text>

## ac_perc

The `ac_perc` parameter has two different functionalities depending on the configuration of the chain parameters.

#### ac_perc without ac_founders

When `ac_perc` is used without [-ac_founders](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-founders) the chain will follow an inflation-tax model. In this model, the `-ac_perc` parameter is the percentage added to the block reward, and the transactions that allocate these rewards are sent to the `-ac_pubkey` address. Naturally, for this configuration to function the `-ac_pubkey` parameter must be included.

For example, if `-ac_reward=100000000` and `-ac_perc=10000000`, for each block mined the miner receives 100000000 satoshis (1 coin), and the owner of the `-ac_pubkey` address receives 10000000 satoshis (0.1 coin, which is 10% of the miner's reward). The amount sent to the pubkey is not taken from the user, rather it is created at this point. Therefore, each transaction inflates the overall coin supply.

The maximum amount of coins created via this method across all transactions per block is capped at `(1000000 * <percentage>)`.

::: tip
Vout 1 of each coinbase transaction must be the correct amount sent to the corresponding pubkey. This only affects a miner trying to use a stratum. Team member, `Blackjok3r`, developed a coinbase-override method for this purpose. Please see [this repo](https://github.com/webworker01/knomp/#disable-coinbase-mode) for details.
:::

#### ac_perc with ac_founders

Please see the [-ac_founders](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-founders) documentation for this functionality.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Examples">

This example coin combines both `ac_staked` and `ac_perc`. As described in the section, ["Notes on How ac_staked Functions"](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-staked), the method of rewards for the coin will vary over time. The coins used to stake will be included in the `ac_perc` calculations until block height `100000`. Therefore, the `pubkey` that receives `ac_perc` block rewards will receive more for the first `100000` blocks.

Other coin details include that it is a 777777-coin pre-mine, with a 10-coin block reward, and the chain adjusts difficulty so that 50% of the blocks are mined via PoS, and 50% via PoW.

For the first `100000` blocks, the `pubkey` address receives at least 1 coin for every mined block (an additional 10% above the block reward). The pubkey address also receives at least an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 10 coins are created and sent to the pubkey address. This includes the additional verification transaction in PoS blocks, meaning the pubkey address receives more coins for every PoS block. The extra amount sent to the `pubkey` address derives from blocks that are mined via `ac_staked`, the rewards of which are calculated into `ac_perc`.

After the first `100000` blocks, the rewards from `ac_staked` are no longer included in the `ac_perc` rewards sent to the `pubkey`.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_perc=10000000 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50 &
```

</collapse-text>

<!--

## ac_private

If `ac_private` is set to `1`, all transactions other than coinbase transactions (block rewards) must use zk-SNARKs. Beyond sending mined coins from a transparent addresses to a z address, all other transparent activity is disabled.

[Click here for more information about privacy features in the Komodo ecosystem.](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-nature-of-privacy-features-in-the-komodo-ecosystem)

::: tip Note
The dPoW security mechanism requires that transactions are sent to a transparent address. Therefore, on a chain with `ac_private` enabled, any address can send funds to the transparent notary-node addresses.
:::

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A private-only Smart Chain.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_private=1 &
```

</collapse-text>

-->

## ac_prices

(In Development)

The `ac_prices` parameter has to be used along with the [ac_cbopret](#ac-cbopret) parameter to supply TICKERS of the Cryptocurrencies whose BTC prices are to be included in the DTO.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A Smart Chain with a DTO that brings prices of various Cryptocurrencies vs BTC on-chain.

```bash
./komodod -ac_cbopret=5 -ac_name=HELLOWORLD -ac_cbopret=5 -ac_prices="ETH, LTC, BNB, NEO, LRC, QTUM, OMG, ZRX, STRAT, IOTA, XVG, KMD, EOS, ZEC, DASH, XRP, STORJ, XMR, BAT, BTS, LSK, ADA, WAVES, STEEM, RVN, DCR, XEM, ICX, HOT, ENJ" -ac_cc=10797 -ac_reward=3000000000 -ac_supply=120000000 -ac_pubkey=02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567 -ac_perc=77777 -ac_blocktime=120 &
```

</collapse-text>

## ac_pubkey

The `ac_pubkey` parameter designates a pubkey for receiving payments from the network. These payments can come in the genesis block, in all blocks mined thereafter, and from every transaction on the network.

This parameter is not intended for isolated use. It should only be activated on chains that also use at least one of the following parameters: `ac_perc`, `ac_founders`, or `ac_import=PUBKEY`.

The `pubkey` must be a 66 character string (a compressed pubkey). You can find this pubkey for any address by using the [validateaddress](../../../basic-docs/smart-chains/smart-chain-api/util.html#validateaddress) command, and searching for the returned `pubkey` property. The first two digits of a compressed `pubkey` are only either `02` or `03`. (The corresponding `private key` must be present/imported to the wallet before using `validateaddress`.)

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

This example coin combines both `ac_staked` and `ac_perc`. As described in the section, ["Notes on How ac_staked Functions"](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-staked), the method of rewards for the coin will vary over time. The coins used to stake will be included in the `ac_perc` calculations until block height `100000`. Therefore, the `pubkey` that receives `ac_perc` block rewards will receive more for the first `100000` blocks.

Other coin details include that it is a 777777-coin pre-mine, with a 10-coin block reward, and the chain adjusts difficulty so that 50% of the blocks are mined via PoS, and 50% via PoW.

For the first `100000` blocks, the `pubkey` address receives at least 1 coin for every mined block (an additional 10% above the block reward). The pubkey address also receives at least an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 10 coins are created and sent to the pubkey address. This includes the additional verification transaction in PoS blocks, meaning the pubkey address receives more coins for every PoS block. The extra amount sent to the `pubkey` address derives from blocks that are mined via `ac_staked`, the rewards of which are calculated into `ac_perc`.

After the first `100000` blocks, the rewards from `ac_staked` are no longer included in the `ac_perc` rewards sent to the `pubkey`.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_perc=10000000 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50
```

</collapse-text>

## ac_public

If `ac_public` is set to `1`, zk-SNARKs are disabled, and all z address functionality is disabled. Therefore, all transactions on the blockchain are public.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A public-only Smart Chain.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_public=1 &
```

</collapse-text>

## ac_reward

::: warning
Komodo recommends that this parameter be included on all Smart Chains. Please see below for additional notes.
:::

This is the block reward for each mined block, given in satoshis.

If both `ac_reward` and `ac_staked` are not set, the default block reward will be `10000` satoshis and blocks will be on-demand after block `127` (a new block will not be mined unless there is a transaction in the mempool).

Komodo recommends that `ac_reward` be included in all Smart Chains. This prevents the Smart Chain from becoming an on-demand blockchain, and therefore this increases the Smart Chain's security.

To make a Smart Chain that has no block reward and is not on-demand, include the parameters: `-ac_reward=1 -ac_end=1`. The Smart Chain's first block will reward only the `-ac_supply` value, after which the `ac_reward` value will be `0`.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Examples">

A 777777 coin pre-mine, with a 1 coin block reward that does not end. (Note that ac_supply is given in coins, while ac_reward is given in satoshis.)

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 &
```

A 0 coin pre-mine with a 1-coin block reward that does not end. This is an example of a pure PoW Smart Chain that has no pre-mined coins.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=0 -ac_reward=100000000 &
```

A 777777-coin pre-mine, with a 10-coin block reward, and the block reward decreases by 25% every 2000 blocks.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000 &
```

</collapse-text>

## ac_sapling

The `ac_sapling` parameter adjusts the block height of a Smart Chain's default sapling activation. (Sapling is an upstream privacy technology provided by [Zcash](https://z.cash/), of which Komodo is a fork.)

By default, sapling will activate at block 61 on a newly created Smart Chain.

This can also be used to activate sapling prior to block 61. (Activating sapling prior to block 61 should not be done on a chain intended for production use.)

To delay sapling activation, set `ac_sapling` to a block height far in the future. For example, `-ac_sapling=5000000` will delay sapling activation to block `5000000`. At block `5000000` sapling will be activated.

## ac_script

The `ac_script` parameter enables the `ac_founders` reward to be sent to a multi-signature address or any p2sh address. If this parameter is used, block 1 (the "premine") will be mined to the `ac_script` address.

This parameter requires that `ac_founders` also be active. If `ac_script` is set, `ac_pubkey` must not be.

`ac_script` should be set to the `"hex"` value of `"scriptPubKey"`.

#### Finding the scriptPubKey

To find the `"scriptPubKey"` value, first create a multi-signature address with the [createmultisig](../../../basic-docs/smart-chains/smart-chain-api/util.html#createmultisig) command.

##### Command

```bash
./komodo-cli -ac_name=EXAMPLE createmultisig 2 "[\"RMnZJpfLbFHUxMS3HM5gkvtFKeduhr96Ec\",\"RW2Yx4Tk9WGfUvhbJTXGFiRhr7PKcVtrm5\",\"RQ1uqBj9yk94BcxEZodbeNqb3jWv8pLeA4\"]"
```

##### Response

```json
{
  "address": "bGHcUFb7KsVbSFiwcBxRufkFiSuhqTnAaV",
  "redeemScript": "522102040ce30d52ff1faae7a673c2994ed0a2c4115a40fa220ce055d9b85e8f9311ef2102a2ba4606206c032914dd48390c15f5bf996d91bf9dbd07614d972f39d93a511321026014ef4194f6c7406a475a605d6a393ae2d7a2b12a6964587299bae84172fff053ae"
}
```

On a test chain, send coins to the `bGHcUFb7KsVbSFiwcBxRufkFiSuhqTnAaV` address.

##### Command

```bash
./komodo-cli -ac_name=EXAMPLE sendtoaddress bGHcUFb7KsVbSFiwcBxRufkFiSuhqTnAaV 10
```

##### Response (txid)

```bash
ef0d05f14ea2a5bfa1c99142c2e3d78c851223d7476ed2e57b61b6e07f741f0f
```

Observe the resulting transaction with `getrawtransaction <txid> 1`.

##### Command

```bash
./komodo-cli -ac_name=EXAMPLE getrawtransaction ef0d05f14ea2a5bfa1c99142c2e3d78c851223d7476ed2e57b61b6e07f741f0f 1
```

##### Response

```json
{
  "value": 10.0,
  "valueSat": 1000000000,
  "n": 1,
  "scriptPubKey": {
    "asm": "OP_HASH160 2706324daaac92c93420e985f55d88ea20e22ae1 OP_EQUAL",
    "hex": "a9142706324daaac92c93420e985f55d88ea20e22ae187",
    "reqSigs": 1,
    "type": "scripthash",
    "addresses": ["bGHcUFb7KsVbSFiwcBxRufkFiSuhqTnAaV"]
  }
}
```

Set `ac_script` to the `"hex"` value from the returned json object.

##### Command

```bash
-ac_script=a9142706324daaac92c93420e985f55d88ea20e22ae187
```

## ac_staked

`ac_staked` indicates the percentage of blocks the chain will aim to mine via Proof of Stake (PoS), with the remainder via Proof of Work (PoW). For example, an `ac_staked=90` chain will have ~90% PoS blocks and ~10% PoW blocks.

Measurements of the `PoS:PoW` ratio are approximate; the PoW difficulty will automatically adjust based on the overall percentage of PoW-mined blocks to adhere to the approximate `PoS` value.

When creating a chain with the `ac_staked` parameter, the creation process is slightly different.

- Start both the first and second nodes **without** `-gen -genproclimit=0`.
- Once both are connected, execute `setgenerate true 1` on the node that should receive the pre-mine.
- Observe the debug.log by executing `tail -f ~/.komodo/<CHAIN>/debug.log`
- Wait for the Smart Chain to mine two blocks
- Execute `setgenerate false` to stop mining
- All of the coins (including the pre-mine) are now located on the node that mined two blocks. Do not split them with a normal transaction. Rather, split them using this tool: [link](https://github.com/KMDLabs/pos64staker).
- On the first node use 'setgenerate true 0' to enable staking.
- On the second node use 'setgenerate true 1' (or use a desired processor number instead '1') to enable mining.
- Use the [getbalance64](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#getbalance64) method to ensure that there are coins staking in all 64 segids before block 10. The utxos may appear on any list, including both staking and nonstaking.

Following the above instructions will ensure that the Smart Chain is stable.

::: warning

On a chain using a high percentage for PoS, it's vital to have coins staking by block 100. If too many PoW blocks are mined consecutively at the start of the chain, the PoW difficulty may increase enough to stop the chain entirely. This can prevent users from sending transactions to staking nodes.

:::

::: warning

The Smart Chain developer must give the [ac_reward](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-reward) parameter a value for staking to function properly.

:::

::: warning

It is vital to stake coins in all 64 segids. You can use the genaddresses.py script in [this repository](https://github.com/KMDLabs/pos64staker) to generate an address for each segid. This functionality will soon be integrated directly into the daemon.

:::

::: tip
The first 100 blocks will allow PoW regardless of the ac_staked value.
:::

::: tip
It is not possible to both PoW mine and stake on the same node. Therefore, when the chain's consensus mechanism allows both PoS and PoW, the chain creator needs a minimum of two nodes mining/staking to keep the blockchain moving.
:::

### Notes on How ac_staked Functions

Once staking is active, utxos available in the `wallet.dat` file will stake automatically.

On an `ac_staked` Smart Chain there are 64 global segments (`segid`'s) to which all addresses and the corresponding utxos belong. These 64 `segid`'s become eligible to stake blocks in turns. The segment a utxo belongs to is determined automatically, according to the address in which the utxo resides.

You can see which segment an address belongs to by using the [validateaddress](../../../basic-docs/smart-chains/smart-chain-api/util.html#validateaddress) API command. You can use the [getbalance64](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#getbalance64) API command to observe how your staked coins are distributed across the separate segids.

Each staked block will have an additional transaction added to the end of the block in which the coins that staked the block are sent back to the same address. This is used to verify which coins staked the block, and this allows for compatibility with existing Komodo infrastructure.

There are additional considerations when `ac_staked` is used in conjunction with [ac_perc](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-perc) and [ac_pubkey](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-pubkey). The coins used to stake will be included in the `ac_perc` calculations until the Smart Chain reaches block height `1000000`. Therefore, the [ac_pubkey](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-pubkey) address will receive more coins for each staked block compared to a mined block. After block `1000000`, `ac_perc` will no longer include the coins used for staking, and therefore the amount of coins sent to the `ac_pubkey` address will normalize.

### Rules for Staking a Block

The following are the (current) rules for staking a block:

- Block timestamps are used as the monotonically increasing on-chain clock. It is important to have a synced system clock. Use the following sequence to sync your clock:`sudo apt-get install chrony`, `sudo systemctl restart chrony.service`, then check `timedatectl` for `NTP syncronized: Yes`

- A utxo is not eligible for staking until a certain amount of time has passed after its creation. By default, between blocks `1` and `2000` the amount of time required for a utxo to be eligibile is `blockheight * 3 seconds`. After block `2000`, the required amount of time is 6000 seconds. More precisely, after block `2000` a utxo is not eligible for staking until `100 * the expected blocktime (i.e. 1 minute)`. For example, utxos on a one-minute block-time Smart Chain would be eligible for staking one-hundred minutes after their creation.

- The `segid`s rotate through a queue to determine which `segid` has the most likely chance to stake a new block. The formula that determines this is based on the block height: `(height % 64) = the segid0 for this height`. For each block, the eligibility to stake a new block begins with `segid[0]`, and then the eligibility expands to the next segment in queue at every two-second interval until the block is staked. For example, if `segid[0]` has not mined a new block within two seconds, the consensus mechanism opens up the priority to include the second, `segid[1]`. This continues either until the block is staked, or all 64 `segid`'s are eligible to stake a new block. Once a block is staked, the `height` of the blockchain changes, pushing the `segid[0]` segment to the end of the queue, etc.

- By internal design, a utxo is more likely to win a block within a `segid` based on age of the utxo and amount of coins. Regarding the age eligibiility, the maximum maturity level is one month (e.g. after reaching one month of age, a utxo's likelihood of staking a coin does not further increase). The age of the utxo is set by the `nlocktime` property of the utxo, or if `nlocktime` is not set, the age is determined by the utxo's `blocktime` property.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A 777777-coin pre-mine with a 1-coin block reward. The chain adjusts difficulty to keep 90% of blocks mined via PoS, and 10% mined via PoW.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 -ac_staked=90 &
```

A 777777 coin pre-mine with a 10-coin block reward. The chain adjusts difficulty so 2% of blocks are mined via PoS, 98% via PoW.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_staked=2 &
```

A 777777-coin pre-mine, with a 1-coin block reward, block reward decreases by 50% every 2000 blocks, and the chain adjusts difficulty so 10% of blocks are mined via PoS, 90% via PoW.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 -ac_havling=2000 -ac_staked=10 &
```

A 777777-coin pre-mine, a 10000-coin block reward, the block reward decreases by 40% every 2000 blocks, and the chain adjusts difficulty so 50% of blocks are mined via PoS, 50% via PoW.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000000 -ac_halving=2000 -ac_decay=60000000 -ac_staked=50 &
```

A 777777-coin pre-mine, a 1000-coin block reward, the block reward decreases by 25% every 100000 blocks, the block reward ends at block 1000000, and the chain adjusts difficulty so 1% of blocks are mined via PoS, 99% via PoW. The pubkey address receives an additional 0.5% above the block reward for each mined block. For example, before the first halving, the pubkey address will receive 5 coins (0.5% of 1000 coin block reward) for every mined block. After the first halving, the pubkey address will receive 3.75 coins for every mined block (0.5% of 750-block reward). The pubkey address receives an additional 0.5% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 0.5 coins are created and sent to the pubkey address. This includes the additional verification transaction in PoS blocks, meaning the pubkey address receives more coins for every PoS block.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000000 -ac_halving=100000 -ac_decay=75000000 -ac_end=1000000 -ac_perc=500000 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=1 &
```

</collapse-text>

## ac_stocks

(In development)

The `ac_stocks` parameter has to be used along with the [ac_cbopret](#ac-cbopret) parameter to supply TICKERS of the Stocks (available at [https://api.iextrading.com/1.0/tops/last](https://api.iextrading.com/1.0/tops/last)) whose USD prices are to be included in the DTO.

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A Smart Chain with a DTO that brings prices of various Stocks vs USD on-chain.

```bash
./komodod -ac_cbopret=9 -ac_name=HELLOWORLD -ac_cbopret=9 -ac_stocks="AAPL,ADBE,ADSK,AKAM,AMD,AMZN,ATVI,BB,CDW,CRM,CSCO,CYBR,DBX,EA,FB,GDDY,GOOG,GRMN,GSAT,HPQ,IBM,INFY,INTC,INTU,JNPR,MSFT,MSI,MU,MXL,NATI,NCR,NFLX,NTAP,NVDA,ORCL,PANW,PYPL,QCOM,RHT,S,SHOP,SNAP,SPOT,SYMC,SYNA,T,TRIP,TWTR,TXN,VMW,VOD,VRSN,VZ,WDC,XRX,YELP,YNDX,ZEN,BRK.A" -ac_cc=10797 -ac_reward=3000000000 -ac_supply=120000000 -ac_pubkey=02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567 -ac_perc=77777 -ac_blocktime=120 &
```

</collapse-text>

## ac_supply

This is the amount of pre-mined coins you would like the chain to have.

The node that sets [gen](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#gen) during the creation process will mine these coins in the genesis block.

If `ac_supply` is not set, [ac_reward](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-reward) must be set, and a default value of 10 coins will be used in the genesis block. If [ac_founders](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-founders) is set, the pre-mined coins will be mined to the founder's reward address.

The `ac_supply` parameter should be set to a whole number without any decimals places. It should also be set to less than `2000000000` to avoid 64-bit overflows.

::: tip
An additional fraction of a coin will be added to the initial supply based on the Smart Chain's parameters. This is used by nodes to verify the genesis block. For example, the DEX chain's `ac_supply` parameter is set to `999999`, but in reality the genesis block was `999999.13521376`. When using `ac_staked`, the additional amount may be more than a full coin, and can add up to two digits left of the decimal point.
:::

#### :pushpin: Examples

<collapse-text hidden="true" style="margin-top: 1rem;" title="Example">

A simple Smart Chain with pre-mined coins and a block reward of 0.0005.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=50000 &
```

</collapse-text>

## ac_snapshot

The `ac_snapshot` parameter defines the frequency with which a Smart Chain creates snapshots of the `address - balance` data.

###### Example

The following example instructs the Smart Chain to execute a snapshot once every `1440` blocks. (Approximately one snapshot per day.)

```
-ac_snapshot=1440
```

##### Payments Module Functionality

The `ac_snapshot` parameter is required by the [paymentsairdrop](../../../basic-docs/antara/antara-api/payments.html#paymentsairdrop) method of the Payments Antara Module.

The user first executes the [paymentsairdrop](../antara-api/payments.html#paymentsairdrop) method to create a Payments plan that is designed to distribute airdrops to addresses on the chain.

The user then executes the [paymentsrelease](../../../basic-docs/antara/antara-api/payments.html#paymentsrelease) method to release payments based on the amounts in the addresses in the most recent snapshot, as recorded by the `ac_snapshot` customization.

The Payments Module features several customizations to control the nature of these automated airdrops.

## ac_timelock...

**-ac_timeunlockgte=satoshis -ac_timelockfrom=height -ac_timelockto=height**

The `ac_timelock...` parameters enforce "coinbase locking".

In coinbase locking, the Smart Chain's block-reward feature behaves in a different manner compared to a default Smart Chain. Any block reward that is greater than or equal to the `ac_timeunlockgte` satoshi amount is temporarily locked. It will be unlocked (and therefore spendable) on a random block between the `ac_timelockfrom` and `ac_timelockto` heights.

The random unlock time for each reward is independent of the unlock time of other rewards.

For example:

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=0 -ac_reward=10000000000 -ac_halving=10000 -ac_timelockgte=10000000000 -ac_timeunlockfrom=10000 -ac_timeunlockto=100000
```

For the first 10000 blocks, any rewards that are greater than or equal to 10000000000 are locked until a random block between 10000 and 100000.

## ac_txpow

::: warning
This parameter is in its final testing stages. Please reach out to us if you would like to use it on a production chain.
:::

Setting `-ac_txpow=1` enforces a transaction-rate limiter. This can help to prevent spam transactions on a Smart Chain.

`ac_txpow` forces all transactions (other than coinbase transactions) to have a txid starting and ending with `00`.

This parameter is currently a proof of concept. Many of the traditional API commands, such as `sendtoaddress` or `sendmany`, are not currently supported. Instead, use [createrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#createrawtransaction) and [signrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#signrawtransaction).

## ac_veruspos

::: warning
This parameter is in its final testing stages. Please reach out to us if you would like to use it on a production chain.
:::

The `ac_veruspos` parameter is an alternative to [ac_staked](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-staked).

When activated, the chain uses [Verus](http://veruscoin.io/)'s proof of stake implementation instead.

The only valid value for this parameter is `-ac_veruspos=50`. (`ac_veruspos` does not have the same segid mechanism as `-ac_staked`.)
