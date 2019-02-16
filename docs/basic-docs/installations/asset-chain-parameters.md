# Asset Chain Parameters

The Komodo platform offers various default customizations for determining the underlying nature of your asset chain. The desired combination of parameters should be included with the `komodod` execution every time the asset-chain daemon is launched.

Changing these customizations at a later time is possible, but this typically requires a hard-fork of your asset chain. In general, it is best to have your asset chain's parameters finalized before decentralizing the ownership of your coin. Should you discover a need to change these parameters after the fact, please reach out to our development team for assistance.

## ac_name

::: warning
All asset chains are required to set ac_name.
:::

This is the ticker symbol for the coin you wish to create. We recommended it consist only of numbers and uppercase letters.

#### :pushpin: Examples:

A simple asset chain

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 &
```

## ac_supply

This is the amount of pre-mined coins you would like the chain to have.

The node that sets [`gen`](../installations/common-runtime-parameters.html#gen) during the creation process will mine these coins in the genesis block.

If `ac_supply` is not set, [`ac_reward`](../installations/asset-chain-parameters.html#ac-reward) must be set, and a default value of 10 coins will be used in the genesis block. If [`ac_founders`](../installations/asset-chain-parameters.html#ac-founders) is set, the pre-mined coins will be mined to the founder's reward address.

The `ac_supply` parameter should be set to a whole number without any decimals places. It should also be set to less than `2000000000` to avoid 64-bit overflows.

::: tip
An additional fraction of a coin will be added to the initial supply based on the asset chain's parameters. This is used by nodes to verify the genesis block. For example, the DEX chain's `ac_supply` parameter is set to `999999`, but in reality the genesis block was `999999.13521376`. When using `ac_staked`, the additional amount may be more than a full coin, and can add up to two digits left of the decimal point.
:::
(FIX ME ac_staked chains can add more than a fraction of a coin. Up to 2 decimal places I believe. Example, MGNX -ac_supply=12465003 vs actual 12465040.4364023

#### :pushpin: Examples:

A simple asset chain with pre-mined coins and a block reward of 0.0005.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=50000 &
```

## ac_reward

::: warning
Komodo recommends that this parameter be included on all asset chains. Please see below for additional notes.
:::

This is the block reward for each mined block, given in satoshis.

If both `ac_reward` and `ac_staked` are not set, the default block reward will be `10000` satoshis and blocks will be on-demand after block 127 (a new block will not be mined unless there is a transaction in the mempool).

Komodo recommends that `ac_reward` be included in all asset chains. This prevents the asset chain from becoming an on-demand blockchain, and therefore this increases the asset chain's security.

To make an asset chain that has no block reward and is not on-demand, include the parameters: `-ac_reward=1 -ac_end=1`. The asset chain's first block will reward only the `-ac_supply` value, after which the `ac_reward` value will be `0`. 

#### :pushpin: Examples:

A 777777 coin pre-mine, with a 1 coin block reward that does not end. (Note that ac_supply is given in coins, while ac_reward is given in satoshis.)

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 &
```

A 0 coin pre-mine with a 1-coin block reward that does not end. This is an example of a pure PoW asset chain that has no pre-mined coins.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=0 -ac_reward=100000000 &
```

A 777777-coin pre-mine, with a 10-coin block reward, and the block reward decreases by 25% every 2000 blocks.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000 &
```

## ac_blocktime

This parameter sets the average time (in seconds) by which a new block should be mined.

If this parameter is not included, the default value is `ac_blocktime=60`.

When the value of `ac_blocktime` is less than `60`, the asset chain's block time will stabilize within less than twelve hours after launch. If the asset chain's `ac_blocktime` value is greater than `60`, the asset chain's block time can require several days to stabilize. 

When the value of `ac_blocktime` is less than `12` seconds (a high speed asset chain), the variances in network quality between consensus nodes (miners and stakers) can create difficulties in achieving a stable blockchain consensus. High-speed asset chains may function effectively on a LAN or other stable network, but Komodo recommends caution when attempting to manage a high-speed asset chain on the public Internet. 

#### :pushpin: Examples:

A 777777 coin pre-mine with a 1-coin block reward and a block speed of 20 seconds.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 -ac_blocktime=20 &
```

## ac_end

This is the block height at which block rewards will end. Every block after this height will have 0 block reward (this means that, assuming all other settings are default, the only incentive to mine a new block will be transaction fees).

#### :pushpin: Examples:

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

## ac_halving

This is the number of blocks between each block reward halving. This parameter will have no effect if [`ac_reward`](../installations/asset-chain-parameters.html#ac-reward) is not set. The lowest possible value is `1440` (~1 day). If this parameter is set, but [`ac_decay`](../installations/asset-chain-parameters.html#ac-decay) is not, the reward will decrease by 50% each halving.

#### :pushpin: Example:

A 777777-coin pre-mine, with a 5-coin block reward, and the block reward decreases by 50% every 2000 blocks.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000 -ac_halving=2000 &
```

## ac_decay

This is the percentage which determines the block reward decrease on each block-reward "halving".

This parameter will have no effect if [`ac_reward`](../installations/asset-chain-parameters.html#ac-reward) is not set.

This is the formula that `ac_decay` follows:

```
block_reward_after = block_reward_before * ac_decay / 100000000;
```

For example, if this parameter is set to `75000000`, at each "halving" the block reward will drop to 75% of its previous value.

#### :pushpin: Examples:

A 777777-coin pre-mine, with a 10-coin block reward, and the block reward decreases by 25% every 2000 blocks.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000 &
```

## ac_eras
The `ac_eras` parameter allows the value of a chain's block reward to vary over time.

Each different time interval is called an "era" and a chain can have at most three eras.

When active, `ac_eras` changes the behavior of coinbase coins (i.e. the coins that are created as a result of mining). `ac_eras` forces the `COINBASE_MATURITY` value of coinbase coins to be `100` instead of the normal value of `1`. Therefore, coinbase coins become spendable after `100` confirmations.

The `ac_eras` parameter accepts only one value (`1`, `2`, or `3`). When activated, it allows certain other asset-chain parameters to accept multiple values.

The principle parameter that is affected by `ac_eras` is [`ac_reward`](../installations/asset-chain-parameters.html#ac-reward), and it must receive at least one value.

Also, [`ac_decay`](../installations/asset-chain-parameters.html#ac-decay), [`ac_halving`](../installations/asset-chain-parameters.html#ac-halving), and [`ac_end`](../installations/asset-chain-parameters.html#ac-end) can each receive multiple values and thereby affect reward functionality.

For every era, there must be a corresponding value in `ac_end` that indicates the block height at which this era ends. To set the final era to last indefinitely, set the `ac_end` value of that era to `0`; the `0` setting should only be used for the last era.

In all parameters receiving multiple values, the values for the second and third eras must be preceded by a comma.

For example:

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_eras=3 -ac_reward=5000000000,7000000000,4000000000 -ac_end=1000,10000,0
```

In this asset chain, the first era will have a reward of 5000000000, the second will have 7000000000, and the third will have 4000000000. The reward for the first era ends at block 1000, for the second era at block 10000, and the third era lasts indefinitely.

If any of the relevant parameters has fewer distinct values than eras, the parameter's final value will carry through the remaining eras.

For example:

```
-ac_eras=2 -ac_reward=100000000,200000000 -ac_halving=100 -ac_end=10000,0
```

In this asset chain, the `ac_halving` value for both eras is `100`.

One more feature of `ac_eras` is the ability to transition from one era to the next with a linear progression, rather than a direct switch. To achieve this effect, in the initial era (the point at which the linear progression should begin) set the `ac_decay` value to `100000000` and the `ac_halving` value to `1`.

For example, the following parameters create an asset chain with a "slow start" reward:

```
./komodod -ac_name=HELLOWORLD -ac_reward=0,10000000000 -ac_eras=2 -ac_end=1000,0 -ac_decay=100000000,100000000 -ac_halving=1
```

This chain's block reward will grow linearly from 0 to 100 over 1000 blocks, then stay at 100 indefinitely.

::: tip
Use the [`getblocksubsidy`](../komodo-api/mining.html#getblocksubsidy) rpc method to verify your asset chain will work as expected at each relevant height: `./komodo-cli -ac_name=HELLOWORLD getblocksubsidy <blockheight>`
:::

## ac_perc

The `ac_perc` parameter has two different functionailites depending on the configuation of the chain params.

#### ac_perc without ac_founders
When `ac_perc` is used without [`-ac_founders`](../installations/asset-chain-parameters.html#ac-founders) the chain will follow an inflation tax model. In this model, the `-ac_perc` parameter is the percentage added to the block reward, and the transactions that allocate these rewards are sent to the `-ac_pubkey` address. Naturally, for this configuration to function the `-ac_pubkey` parameter must be included.

For example, if `-ac_reward=100000000` and `-ac_perc=10000000`, for each block mined the miner receives 100000000 satoshis (1 coin), and the owner of the `-ac_pubkey` address receives 10000000 satoshis (0.1 coin, which is 10% of the miner's reward). The amount sent to the pubkey is not taken from the user, rather it is created at this point. Therefore, each transaction inflates the overall coin supply.

The maximum amount of coins created via this method across all transactions per block is capped at `(1000000 * <percentage>)`.

::: tip
Vout 1 of each coinbase transaction must be the correct amount sent to the corresponding pubkey. This only affects a miner trying to use a stratum. Team member, Blackjok3r, developed a coinbase overide method for this purpose. Please see [this repo](https://github.com/blackjok3rtt/knomp#disable-coinbase-mode) for details.
:::

#### ac_perc with ac_founders

Please see the [`-ac_founders`](../installations/asset-chain-parameters.html#ac-founders) documentation for this functionality.

#### :pushpin: Examples:

A 777777-coin pre-mine, a 10-coin block reward, the chain adjusts difficulty so 50% of blocks are mined via PoS, 50% via PoW. The pubkey address receives 1 coin for every mined block (an additional 10% above the block reward). The pubkey address receives an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 10 coins are created and sent to the pubkey address. This includes the additional verification transaction in PoS blocks, meaning the pubkey address receives more coins for every PoS block. (FIXME we missed this. Needs to reflect the new block 100k rule mentioned on line 423)

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_perc=10000000 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50 &
```

## ac_founders

The `ac_founders` parameter creates a "founder's reward."

This parameter requires [`ac_perc`](../installations/asset-chain-parameters.html#ac-perc). If the `ac_perc` value is not declared, the `ac_founders` value defaults to `35%`.  Also, either [`ac_pubkey`](../installations/asset-chain-parameters.html#ac-pubkey) OR [`ac_script`](../installations/asset-chain-parameters.html#ac-script) must be set.

The `ac_perc` value determines the percentage of block rewards paid to the founder. These rewards are not paid out immediately, but rather according to the `ac_founders` setting.

`ac_founders` determines the frequency at which the founder's reward is paid.

For example:

```
-ac_reward=100000000 -ac_perc=10000000 -ac_founders=100
```

The above parameters result in mining rewards of 100000000 satoshis (1 coin) per block, with a difference on every 100th block. On the 100th block exception, 1000000000 additional satoshis (10 coins) are paid to the founder's address.

The coins rewarded to the founder are created at the moment of payment, thus increasing the overall coin supply. See [`ac_perc`](../installations/asset-chain-parameters.html#ac-perc) for more details.

Use `ac_pubkey` to send the founder's reward to a normal address.

Use `ac_script` to send the founder's reward to a multi-signature address.

Set `ac_founders=1` to stay compatible with most straum implementations. Any other value requires team member @blackjok3r's fork of knomp using the [disable-cb feature](https://github.com/blackjok3rtt/knomp#disable-coinbase-mode). Please reach out to our team on [`discord`](https://komodoplatform.com/discord) if you have further questions about how to set up a stratum.

## ac_pubkey

The `ac_pubkey` parameter designates a pubkey for receiving payments from the network. These payments can come in the genesis block, in all blocks mined thereafter, and from every transaction on the network.

This parameter is not intended for isolated use. It should only be activated on chains that also use at least one of the following parameters: `ac_perc`, `ac_founders`, or `ac_import=PUBKEY`.

The `pubkey` must be a 66 character string (a compressed pubkey). You can find this pubkey for any address by using the [`validateaddress`](../komodo-api/util.html#validateaddress) command, and searching for the returned `pubkey` property. The first two digits of a compressed `pubkey` are only either `02` or `03`. (The corresponding `private key` must be present/imported to the wallet before using `validateaddress`.)

#### :pushpin: Examples:

A 777777-coin pre-mine, a 10-coin block reward, the chain adjusts difficulty so 50% of blocks are mined via PoS, 50% via PoW. The pubkey address receives 1 coin for every mined block (an additional 10% above the block reward). The pubkey address receives an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 10 coins are created and sent to the pubkey address. This includes the additional verification transaction in PoS blocks, meaning the pubkey address receives more coins for every PoS block.(FIXME we missed this. Needs to reflect the new block 100k rule mentioned on line 423)

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_perc=10000000 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50
```

## ac_script

The `ac_script` parameter enables the `ac_founders` reward to be sent to a multisig address or any p2sh address. If this parameter is used, block 1 (the "premine") will be mined to the `ac_script` address.

This parameter requires that `ac_founders` also be active. If `ac_script` is set, `ac_pubkey` must not be.

`ac_script` should be set to the `"hex"` value of `"scriptPubKey"`.

#### Finding the `"scriptPubKey"`:

To find the `"scriptPubKey"` value, first create a multisig address with the [`createmultisig`](../komodo-api/util.html#createmultisig) command.

Command:

```
komodo-cli -ac_name=EXAMPLE createmultisig 2 "[\"RMnZJpfLbFHUxMS3HM5gkvtFKeduhr96Ec\",\"RW2Yx4Tk9WGfUvhbJTXGFiRhr7PKcVtrm5\",\"RQ1uqBj9yk94BcxEZodbeNqb3jWv8pLeA4\"]"
```

Response:
```
{
	"address": "bGHcUFb7KsVbSFiwcBxRufkFiSuhqTnAaV",
	"redeemScript": 	"522102040ce30d52ff1faae7a673c2994ed0a2c4115a40fa220ce055d9b85e8f9311ef2102a2ba4606206c032914dd48390c15f5bf996d91bf9dbd07614d972f39d93a511321026014ef4194f6c7406a475a605d6a393ae2d7a2b12a6964587299bae84172fff053ae"
}
```

On a test chain, send coins to the `bGHcUFb7KsVbSFiwcBxRufkFiSuhqTnAaV` address.

```
komodo-cli -ac_name=EXAMPLE sendtoaddress bGHcUFb7KsVbSFiwcBxRufkFiSuhqTnAaV 10
```

Response (txid):

```
ef0d05f14ea2a5bfa1c99142c2e3d78c851223d7476ed2e57b61b6e07f741f0f
```

Observe the resulting transaction with `getrawtransaction <txid> 1`:

```
komodo-cli -ac_name=EXAMPLE getrawtransaction ef0d05f14ea2a5bfa1c99142c2e3d78c851223d7476ed2e57b61b6e07f741f0f 1
```

Observe the output:

```
{
	"value": 10.00000000,
	"valueSat": 1000000000,
	"n": 1,
	"scriptPubKey": {
		"asm": "OP_HASH160 2706324daaac92c93420e985f55d88ea20e22ae1 OP_EQUAL",
		"hex": "a9142706324daaac92c93420e985f55d88ea20e22ae187",
		"reqSigs": 1,
		"type": "scripthash",
		"addresses": [
			"bGHcUFb7KsVbSFiwcBxRufkFiSuhqTnAaV"
		]
	}
}
```

Set `ac_script` to the `"hex"` value from the returned json object.

```
-ac_script=a9142706324daaac92c93420e985f55d88ea20e22ae187
```

## ac_cc

::: warning Notice
This parameter is still in testing.
:::

The `ac_cc` parameter sets the network cluster on which the chain can interact with other chains via CryptoConditions modules and MoMoM technology.

Once activated, the `ac_cc` parameter can allow features such as cross-chain fungibility -- coins on one asset chain can be directly transferred to any other asset chain that has the same `ac_cc` setting and the same set of notary nodes (same set of `notary pubkeys`) .


Most functionalities enabled by `ac_cc` can function with or without Komodo's notarization service. However, cross-chain transaction validation and its dependent features, including cross-chain fungibility, require notarization.
### ac_cc=0

Setting `ac_cc=0` disables CryptoConditions on the asset chain entirely. 

::: tip
It is better to <b>NOT</b> use `ac_cc=0` for an asset chain where CryptoConditions should not be enabled. Omitting the `ac_cc` parameter altogether will achieve the same result.
:::

### ac_cc=1

Setting `ac_cc=1` permits CryptonConditions on the asset chain, but will not allow the asset chain to interact in cross-chain CryptoConditions functionality with other asset chains.

### ac_cc=2 to 99

The values of `2` through `99` (inclusive) indicate asset chains that can validate transactions that occur on other asset chains on the same cluster (i.e. the same `ac_cc` value), but their coins are not fungible.

However, coins are not fungible, and therefore cannot be transferred between blockchains.

### ac_cc=100 to 9999

Setting the value of `ac_cc` to any value greater than or equal to `100` will permit cross-chain interaction with any asset chain that has the same `ac_cc` value and is secured by notary nodes with the same `pubkey`.

All asset chains that have the same `ac_cc (>= 100)` value form a cluster, where the base tokens of all the chains in the cluster are fungible via the burn protocol.

For example, an asset chain set to `ac_cc=201` in its parameters can interact with other asset chains with `ac_cc=201` on the same notary-node network, but cannot interact with an asset chain set to `ac_cc=301`.

### Summary of `ac_cc`

::: tip Consider a chain with -ac_cc=N
* If <b>N = 0</b>, CryptoConditions is disabled
* If <b>N > 0</b>, CryptoConditions is enabled
* If <b>N = 1</b>, on-chain CryptoConditions is active, cross-chain validation is disabled
* If <b>N >= 2 and <= 99</b>, the chain allows for cross-chain contracts between all other chains bearing the same N value. The base coins in each asset chain are non-fungible across chains.
* If <b>N >= 100</b>, the chain can form a cluster with all other chains with the same N value and on the same dPoW notarization network. The base coins of all chains in the cluster are fungible via the burn protocol.
:::

#### :pushpin: Examples:

A 777777 pre-mined chain with no smart contracts enabled.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 &
```

A 777777 pre-mined chain with smart contracts on-chain only; no cross-chain smart contracts.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=1 &
```

A 777777 pre-mined chain where smart-contracts are allowed between all fellow asset chains that have -ac_cc=2 in their launch parameters. However, the cross-chain burn protocol is not active, and therefore coins cannot be transferred between chains.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=2 &
```

A 777777 pre-mined chain. Smart-contracts are allowed between all fellow asset chains that have -ac_cc=102 in their launch parameters. Also, all -ac_cc=102 chains can use the cross-chain burn protocol to transfer coins from one chain to another.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=102 &
```

## ac_staked

`ac_staked` indicates the percentage of blocks the chain will aim to mine via Proof of Stake (PoS), with the remainder via Proof of Work (PoW). For example, an `ac_staked=90` chain will have ~90% PoS blocks and ~10% PoW blocks.

Measurements of the PoS:PoW ratio are approximate; the PoW difficulty will automatically adjust based on the overall percentage of PoW-mined blocks to adhere to the approximate `PoS` value.

When creating a chain with the `ac_staked` parameter, the creation process is slightly different.

* Start both the first and second nodes **without** `-gen -genproclimit=0`.
* Once both are connected, execute `setgenerate true 1` on the node that should receive the pre-mine.
* Observe the debug.log by executing `tail -f ~/.komodo/<CHAIN>/debug.log`
* Wait for the asset chain to mine two blocks
* Execute `setgenerate false` to stop mining
* All of the coins (including the pre-mine) are now located on the node that mined two blocks. Do not split them with a normal transaction. Rather, split them using this script: [link](https://github.com/stakedchain/pos64staker).
* Send coins to the other node, and on both nodes use the `generate` method to begin staking.
* Use the [`getbalance`](../komodo-api/wallet.html#getbalance64) method to ensure that there are coins staking in all 64 segids before block 10.

Following the above instructions will ensure that the asset chain is stable.

::: warning
On a chain using a high percentage for PoS, it's vital to have coins staking by block 100. If too many PoW blocks are mined consecutively at the start of the chain, the PoW difficulty may increase enough to stop the chain entirely. This can prevent users from sending transactions to staking nodes.
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

Once staking is active, utxos available in the `wallet.dat` file will begin staking automatically.

On an `ac_staked` asset chain there are 64 global segments (`segid`'s) to which all addresses and the corresponding utxos belong. These 64 `segid`'s become eligible to stake blocks in turns. The segment a utxo belongs to is determined automatically, according to the address in which the utxo resides.

You can see which segment an address belongs to by using the [`validateaddress`](../komodo-api/util.html#validateaddress) rpc call. You can use the [`getbalance64`](../komodo-api/wallet.html#getbalance64) rpc call to observe how your staked coins are distributed across the separate segids.

Each staked block will have an additional transaction added to the end of the block in which the coins that staked the block are sent back to the same address. This is used to verify which coins staked the block, and this allows for compatibility with existing Komodo infrastructure.

There are additional considerations when `ac_staked` is used in conjunction with [`ac_perc`](../installations/asset-chain-parameters.html#ac-perc) and [`ac_pubkey`](../installations/asset-chain-parameters.html#ac-pubkey). The coins that are mined via `ac_staked` will be included in the `ac_perc` calculations until the asset chain reaches block height `1000000`. Therefore, the [`ac_pubkey`](../installations/asset-chain-parameters.html#ac-pubkey) address will receive slightly more coins for each staked block compared to a mined block because of this extra transaction. After block `1000000`, `ac_perc` will no longer include the coins mined from `ac_staked`, and therefore the amount of coins sent to the `ac_pubkey` address will normalize.

### Rules for Staking a Block

The following are the (current) rules for staking a block:

- Block timestamps are used as the monotonically increasing on-chain clock. It is important to have a synced system clock. Use the following sequence to sync your clock:`sudo apt-get install chrony`, `sudo systemctl restart chrony.service`, then check `timedatectl` for `NTP syncronized: Yes`

- A utxo is not eligible for staking until a certain amount of time has passed after its creation. By default, between blocks `1` and `2000` the amount of time required for a utxo to be eligibile is `blockheight * 3 seconds`. After block `2000`, the required amount of time is 6000 seconds. More precisely, after block `2000` a utxo is not eligible for staking until `100 * the expected blocktime (i.e. 1 minute)`. For example, utxos on a one-minute block-time asset chain would be eligible for staking one-hundred minutes after their creation.

- The `segid`s rotate through a cue to determine which `segid` has the most likely chance to stake a new block. The formula that determines this is based on the block height: `(height % 64) = the segid0 for this height`. For each block, the eligibility to stake a new block begins with `segid[0]`, and then the eligibility expands to the next segment in cue at every two-second interval until the block is staked. For example, if `segid[0]` has not mined a new block within two seconds, the consensus mechanism opens up the priority to include the second, `segid[1]`. This continues either until the block is staked, or all 64 `segid`'s are eligible to stake a new block. Once a block is staked, the `height` of the blockchain changes, pushing the `segid[0]` segment to the end of the cue, etc.

- By internal design, a utxo is more likely to win a block within a `segid` based on age of the utxo and amount of coins. Regarding the age eligibiility, the maximum maturity level is one month (e.g. after reaching one month of age, a utxo's likelihood of staking a coin does not further increase). The age of the utxo is set by the `nlocktime` property of the utxo, or if `nlocktime` is not set, the age is determined by the utxo's `blocktime` property.

#### :pushpin: Examples:

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

## ac_public

If `ac_public` is set to `1`, zk-SNARKs are disabled, and all z address functionalilty is disabled. Therefore, all transactions on the blockchain are public.

#### :pushpin: Examples:

A public-only asset chain.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_public=1 &
```

## ac_private

If `ac_private` is set to `1`, all transactions other than coinbase transactions (block rewards) must use zk-SNARKs. Beyond sending mined coins from a transparent addresses to a z address, all other transparent activity is disabled.

::: tip Note
The dPoW security mechanism requires that transactions are sent to a transparent address. Therefore, on a chain with `ac_private` enabled, any address can send funds to the transparent notary-node addresses.  
:::

#### :pushpin: Examples:

A private-only asset chain.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_private=1 &
```

## ac_sapling

The `ac_sapling` parameter adjusts the block height of an asset chain's default sapling activation. (Sapling is an upstream privacy technology provided by [Zcash](https://z.cash/), of which Komodo is a fork.)

By default, sapling will activate at block 61 on a newly created assetchain.

This can also be used to activate sapling prior to block 61. (Activating sapling prior to block 61 should not be done on a chain intended for production use.)

To delay sapling activation, set `ac_sapling` to a block height far in the future. For example, `-ac_sapling=5000000` will delay sapling activation to block `5000000`. At block `5000000` sapling will be activated.


## ac_timelock...

**-ac_timeunlockgte=satoshis -ac_timelockfrom=height -ac_timelockto=height**

The `ac_timelock...` parameters enforce "coinbase locking".

In coinbase locking, the asset chain's block-reward feature behaves in a different manner compared to a default asset chain. Any block reward that is greater than or equal to the `ac_timeunlockgte` satoshi amount is temporarily locked. It will be unlocked (and therefore spendable) on a random block between the `ac_timelockfrom` and `ac_timelockto` heights.

The random unlock time for each reward is independent of the unlock time of other rewards.  

For example:

```
komodod -ac_name=HELLOWORLD -ac_supply=0 -ac_reward=10000000000 -ac_halving=10000 -ac_timelockgte=10000000000 -ac_timeunlockfrom=10000 -ac_timeunlockto=100000
```

For the first 10000 blocks, any rewards that are greater than or equal to 10000000000 are locked until a random block between 10000 and 100000.

## ac_txpow

::: warning
This parameter is in its final testing stages. Please reach out to us if you would like to use it on a production chain.
:::

Setting `-ac_txpow=1` enforces a transaction-rate limiter. This can help to prevent spam transactions on an asset chain.

`ac_txpow` forces all transactions (other than coinbase transactions) to have a txid starting and ending with `00`.

This parameter is currently a proof of concept. Many of the traditional rpc commands, such as `sendtoaddress` or `sendmany`, are not currently supported. Instead, use [`createrawtransaction`](../komodo-api/rawtransactions.html#createrawtransaction) and [`signrawtransaction`](../komodo-api/rawtransactions.html#signrawtransaction).

## ac_algo

::: warning
This parameter is in its final testing stages. Please reach out to us if you would like to use it on a production chain.
:::

The `ac_algo` parameter changes the chain's mining algorithm from the default equihash to the verushash.

To enable this feature, set `-ac_algo=verushash`.

This activates verushash1.0. More recent versions of verushash are not yet supported.

The verushash feature serves as a proof of concept for adding support for additional mining algorithms.

We are currently testing methods to support compatibility for `ac_staked`, but this feature is not yet recommended for external testing.

## ac_veruspos

::: warning
This parameter is in its final testing stages. Please reach out to us if you would like to use it on a production chain.
:::

The `ac_veruspos` parameter is an alternative to [`ac_staked`](../installations/asset-chain-parameters.html#ac-staked).

When activated, the chain uses [Verus](http://veruscoin.io/)'s proof of stake implementation instead.

The only valid value for this parameter is `-ac_veruspos=50`. (`ac_veruspos` does not have the same segid mechanism as `-ac_staked`.)

## ac_ccenable

::: warning
This parameter is at the end of the beta development phase and is prepared for public testing. If you are interested in adopting this feature for a production asset chain, please reach out to us so that we can assist you: [link](https://komodoplatform.com/discord).
:::

The `ac_ccenable` parameter restricts the asset chain so that only indicated CryptoConditions modules can be enabled. `ac_ccenable` requires [`ac_cc`](../installations/asset-chain-parameters.html#ac-cc) to be active.

To indicate which CryptoConditions modules should be available, insert each module's eval code in decimal and separated by commas. A list of all eval codes can be found [here](https://github.com/jl777/komodo/blob/master/src/cc/eval.h).

For example, the following parameters create an asset chain where only the `faucet` and `rewards` modules are active:

```
komodod -ac_name=EXAMPLE -ac_supply=0 -ac_reward=100000000 -ac_cc=2 -ac_ccenable=228,229
```

When `-ac_cc` is set, but `-ac_ccenable` is not, all CryptoConditions modules are enabled.

::: warning
`ac_ccenable` disables spending utxos that are created under a non-enabled CryptoConditions module. We have also implemented additional functionality that disables RPC functions. This prevents the user from creating a utxo that `ac_ccenable` would render unspendable. It is still possible to create raw transactions that bypass this security feature, and thus create utxos that are unspendable. A normal user or developer relying on our RPC functionality should not be concerned with this. However, those who experiment with raw transactions should be cautious.
:::

::: warning
If the developer is also using a new feature that has yet to be documented here, `ac_cclib`, the evalcodes in the `libcc.so` will not disable CryptoConditions RPC calls. Therefore, there remains a risk that a disabled RPC call can still be used to create a utxo, which will then be unspendable.
:::
