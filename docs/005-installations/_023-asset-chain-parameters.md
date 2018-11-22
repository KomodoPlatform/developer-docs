# Asset Chain Parameters

The Komodo platform offers various default customizations for determining the underlying nature of your asset chain. The desired combination of parameters should be included with the `komodod` execution every time the asset-chain daemon is launched.

Changing these customizations at a later time is possible, but in many circumstances it can require a hard fork of your asset chain. In general, it is best to have your asset chain's parameters finalized before decentralizing the ownership of your coin. Should you discover a need to change these parameters after the fact, please reach out to our development team for assistance.

## ac_name

> A simple asset chain

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 &

```

<aside class="warning">
  All asset chains are required to set ac_name.
</aside>

This is the ticker symbol for the coin you wish to create. We recommended it consist only of numbers and uppercase letters.

## ac_supply

> A simple asset chain

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 &

```

<aside class="warning">
All chains are required to set `ac_supply`.
</aside>

This is the amount of pre-mined coins you would like the chain to have.

The node that sets [`gen`](#gen) during the creation process will mine these coins in the genesis block.

If `ac_supply` is not set, [`ac_reward`](#ac_reward) must be set, and a default value of 10 coins will be used in the genesis block. If [`ac_pubkey`](#ac_pubkey) is set, the  pre-mined coins will be mined to the address of the corresponding pubkey.

The `ac_supply` parameter should be set to a whole number without any decimals places. It should also be set to less than `2000000000` to avoid 64-bit overflows.

<aside class="notice">
  An additional fraction of a coin will be added to this based on the asset chain's parameters. This is used by nodes to verify the genesis block. For example, the DEX chain's `ac_supply` parameter is set to `999999`, but in reality the genesis block was `999999.13521376`.
</aside>

## ac_reward

> A 777777 coin pre-mine, with a 1 coin block reward that does not end. (Recall that ac_supply is given in coins, while ac_reward is given in satoshis.)

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 &
```

> A 777777-coin pre-mine, with a 10-coin block reward, and the block reward decreases by 25% every 2000 blocks.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000 &
```

This is the block reward for each mined block, given in satoshis.

If this is not set, the block reward will be `10000` satoshis and blocks will be [on-demand](#a-note-about-low-activity-blockchains) after block 127.

## ac_end


> A 777777-coin pre-mine, with a default block reward of 0.0001 coin, and on-demand blocks after block 128. The block reward ends at block 25000.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_end=25000 &
```

> A 777777-coin pre-mine, with a 5-coin block reward, and the block reward ends at block 200.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000 -ac_end=200 &
```

> A 777777-coin pre-mine, with a 5-coin block reward, the block reward decreases by 50% every 2000 blocks, and the block reward ends at block 10000.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000 -ac_halving=2000 -ac_end=10000 &
```

This is the block height in which block rewards will end. Every block after this height will have 0 block reward, and by default the only incentive to mine a new block will be transaction fees.

## ac_halving

> A 777777-coin pre-mine, with a 5-coin block reward, and the block reward decreases by 50% every 2000 blocks.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=500000000 -ac_halving=2000 &
```


> A 777777-coin pre-mine, with a 10-coin block reward, and the block reward decreases by 25% every 2000 blocks.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000 &
```

> A 777777-coin pre-mine, with a 10-coin block reward, and the block reward decreases by 25% every 2000 blocks.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000 &
```

This is the number of blocks between each block reward halving. This parameter will have no effect if [`ac_reward`](##ac_reward) is not set. The lowest possible value is `1440` (~1 day). If this parameter is set, but [`ac_decay`](#ac_decay) is not, the reward will decrease by 50% each halving.

## ac_decay

> A 777777-coin pre-mine, with a 10-coin block reward, and the block reward decreases by 25% every 2000 blocks.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000 &
```

> A 777777-coin pre-mine, a 1000-coin block reward, the block reward decreases by 25% every 100000 blocks, the block reward ends at block 1000000, and the chain adjusts difficulty so 1% of blocks are mined via PoS, 99% via PoW. The pubkey address receives an additional 0.5% above the block reward for each mined block. For example, before the first halving, the pubkey address will receive 5 coins (0.5% of 1000 coin block reward) for every mined block. After the first halving, the pubkey address will receive 3.75 coins for every mined block (0.5% of 750-block reward). The pubkey address receives an additional 0.5% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 0.5 coins are created and sent to the pubkey address. This includes the additional verification transaction in PoS blocks, meaning the pubkey address receives more coins for every PoS block.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000000 -ac_halving=100000 -ac_decay=75000000 -ac_end=1000000 -ac_perc=500000 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=1 &
```

This is the percentage the block reward will decrease by each block-reward halving. This parameter will have no effect if [`ac_reward`](#ac_reward) is not set.

This is the formula that `ac_decay` follows:

`numhalvings = (height / ac_halving);`

`for (i=0; i<numhalvings; i++)`

`reward_after = reward_before * ac_decay / 100000000;`

For example, if this is set to `750000000`, at each halving the block reward will drop to 75% of its previous value.

## ac_perc

> A 777777-coin pre-mine, a 10-coin block reward, the chain adjusts difficulty so 50% of blocks are mined via PoS, 50% via PoW. The pubkey address receives 1 coin for every mined block (an additional 10% above the block reward). The pubkey address receives an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 5 coins are created and sent to the pubkey address. This includes the additional verification transaction in PoS blocks, meaning the pubkey address receives more coins for every PoS block.


```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_perc=10000000 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50 &
```

The `ac_perc` parameter is the percentage added to both the block reward and to the transactions that will be sent to the [`ac_pubkey`](#ac_pubkey) address. If the `ac_perc` parameter is set, `ac_pubkey` must also be set.

For example, if `ac_reward=100000000` and `ac_perc=10000000`, for each block mined, the miner receives 1 coin along with the `ac_pubkey` address receiving 0.1 coin. For every transaction sent, the pubkey address will receive 10% of the overall transaction value. This 10% is not taken from the user, rather it is created at this point. Each transaction inflates the overall supply.

<aside class="notice">
  Vout 1 of each coinbase transaction must be the correct amount sent to the corresponding `pubkey`. The `vout` type for all coinbase vouts must be `pubkey` as opposed to `pubkeyhash`. This only affects a miner trying to use a stratum. Z-nomp is currently incompatible.
</aside>

## ac_pubkey

> A 777777-coin pre-mine, a 10-coin block reward, the chain adjusts difficulty so 50% of blocks are mined via PoS, 50% via PoW. The pubkey address receives 1 coin for every mined block (an additional 10% above the block reward). The pubkey address receives an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 5 coins are created and sent to the pubkey address. This includes the additional verification transaction in PoS blocks, meaning the pubkey address receives more coins for every PoS block.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_perc=10000000 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50
```

The `ac_pubkey` parameter designates a public address for receiving payments from the network. These payments can come in the genesis block, in all blocks mined thereafter, and from every transaction on the network.

It is used in combination with [`ac_perc`](#ac_perc), which sets the amount that is sent to the address. If `ac_perc` is not set, the only effect of `ac_pubkey` is to have the genesis block be mined to the `pubkey` specified.

If `ac_pubkey` is set, but `ac_perc` is not, this simply means the genesis block will be mined to the set `pubkey`'s address, and no blocks or transactions thereafter will mine payments to the `pubkey`.

`pubkey` must be set to a 33 byte hex string. You can get the pubkey of an address by using the [`validateaddress`](#validateaddress) command in `komodod`, and searching for the returned `pubkey` property. The address must be imported to the wallet before using `validateaddress`.

## ac_cc

> A 777777 pre-mined chain with no smart contracts enabled.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=0 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 &

```

> A 777777 pre-mined chain with smart contracts on-chain only; no cross-chain smart contracts.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=1 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 &

```

> A 777777 pre-mined chain where smart-contracts are allowed between all fellow asset chains that have -ac_cc=2 in their launch parameters. However, the cross-chain burn protocol is not active, and therefore coins cannot be transferred between chains.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=2 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 &

```

> A 777777 pre-mined chain. Smart-contracts are allowed between all fellow asset chains that have -ac_cc=102 in their launch parameters. Also, all -ac_cc=102 chains can use the cross-chain burn protocol to transfer coins from one chain to another.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=102 -ac_pubkey=DO_NOT_USE_5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 &

```

<aside class="notice">
  This parameter is still in testing.
</aside>

The `ac_cc` parameter sets the network cluster on which the chain can interact with other chains via cross-chain smart contracts and MoMoM technology.

Under most circumstances, this parameter requires the Komodo notarization service to achieve functionality, as it relies on the `pubkey` of the trusted notary nodes to ensure coin-supply stability.

Once activated, the `ac_cc` parameter can allow features such as cross-chain fungibility -- meaning that coins on one asset chain can be directly transferred to another asset chain that has the same `ac_cc` setting and notary nodes with the same `pubkey`.

### ac_cc=0

Setting `ac_cc=0` disables smart contracts on the asset chain entirely.

### ac_cc=1

Setting `ac_cc=1` permits smart contracts on the asset chain, but will not allow the asset chain to interact in cross-chain smart contracts with other asset chains.

### ac_cc=2 to 100

The values of `2` through `100` indicate asset chains that can import functions across asset chains, but their coins are not fungible.

For example, an asset chain may be able to query another asset chain on the same `ac_cc` cluster for details about a transaction.

However, coins may not be transferred between blockchains.

### ac_cc=101 to 9999

Setting the value of `ac_cc` to any value greater than or equal to `101` will permit cross-chain interaction with any asset chain that has the same `ac_cc` value and is secured by notary nodes with the same `pubkey`. For example, an asset chain set to `ac_cc=2` in its parameters can interact with other asset chains with `ac_cc=2`, on the same notary-node network, but cannot interact with an asset chain set to `ac_cc=3`.

## ac_staked

> A 777777-coin pre-mine with a 1-coin block reward. The chain adjusts difficulty to keep 90% of blocks mined via PoS, and 10% mined via PoW.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 -ac_staked=90 &
```

> A 777777 coin pre-mine with a 10-coin block reward. The chain adjusts difficulty so 2% of blocks are mined via PoS, 98% via PoW.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000 -ac_staked=2 &
```

> A 777777-coin pre-mine, with a 1-coin block reward, block reward decreases by 50% every 2000 blocks, and the chain adjusts difficulty so 10% of blocks are mined via PoS, 90% via PoW.


```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 -ac_havling=2000 -ac_staked=10 &
```

> A 777777-coin pre-mine, a 10000-coin block reward, the block reward decreases by 40% every 2000 blocks, and the chain adjusts difficulty so 50% of blocks are mined via PoS, 50% via PoW.


```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=1000000000000 -ac_halving=2000 -ac_decay=60000000 -ac_staked=50 &
```

<aside class="notice">
	This feature is currently only available in the <a href="https://github.com/jl777/komodo/tree/jl777">jl777 branch</a>
</aside>

`ac_staked` indicates the percentage of blocks the chain will aim to have mined via Proof of Stake (PoS), with the remainder via Proof of Work (PoW). For example, an `ac_staked=90` chain will have ~90% PoS blocks and 10% PoW blocks.

Measurements of the PoS:PoW ratio are approximate; the PoW difficulty will automatically adjust based on the overall percentage of PoW-mined blocks to adhere to the approximate `PoS` value.

When creating a chain with the `ac_staked` parameter, the creation process is slightly different. Start the first node with `-gen -genproclimit=0`, and start the second node with `-gen -genproclimit=$(nproc)`. Send coins from the second node to the first node, and the first node will begin staking.

<aside class="warning">
  On a chain using a high percentage for PoS, it's vital to have coins staking by block 100.  If too many PoW blocks are mined consecutively at the start of the chain, the PoW difficulty may increase enough to stop the chain entirely. This can prevent users from sending transactions to staking nodes.
</aside>

<aside class="warning">
  It is also vital to stake coins in all 64 segids. You can use the genaddresses.py script in <a href="https://github.com/alrighttt/dockersegid">this repository</a> to generate an address for each segid. This functionality will soon be integrated directly into the daemon.
</aside>

<aside class="notice">
  The first 100 blocks will allow PoW regardless of the ac_staked value.
</aside>

<aside class="notice">
  It is not possible to both PoW mine and stake on the same node. When the chain's consensus mechanism is set to both PoS and PoW, the developer will need a minimum of two nodes mining/staking to keep the blockchain moving.
</aside>

### Notes on How ac_staked Functions

To initiate staking, include `-gen -genproclimit=0` as a parameter while starting the daemon, or execute `./komodo-cli -ac_name=CHAIN_NAME setgenerate true 0` after launching the daemon.

Once staking is active, utxos available in the `wallet.dat` file will begin staking automatically.  

On an `ac_staked` asset chain there are 64 global segments (`segid`'s) to which all utxos belong, and these 64 `segid`'s will automatically take turns staking blocks. The method of determining which segment a utxo belongs to is determined automatically, according to the hash of the address in which the utxo resides and the height of the blockchain.

You can see which segment an address belongs to by using the [`validateaddress`](#validateaddress) rpc call. You can find out the amount of rewards your staked coins have earned via the [`getbalance64`](#getbalance64) rpc call.

Each staked block will have an additional transaction added to the end of the block in which the coins that staked the block are sent back to the same address. This is used to verify which coins staked the block, and this allows for compatibility with existing Komodo infrastructure. If `ac_staked` is used in conjunction with [`ac_perc`](#ac_perc), the [`ac_pubkey`](#ac_pubkey) address will receive slightly more coins for each staked block compared to a mined block because of this extra transaction.

### Rules for Staking a Block

The following are the (current) rules for staking a block:

* Block timestamps are used as the monotonically increasing timestamp. It is important to have a synced system clock.

* A utxo is not eligible for staking until a certain amount of time has passed after its creation. By default, it is 6000 seconds. More precisely, a utxo is not eligible for staking until `100 * the median time to mine a new block`. For example, utxos on a one-minute block time asset chain would be eligible for staking after one-hundred minutes.

* The `segid`s rotate through a cue to determine which `segid` has the most likely chance to stake a new block. The formula that determines this is based on the block height: `(height % 64) = the segid0 for this height`. For each block, the eligibility to stake a new block begins with `segid[0]`, and then the eligibility expands to the next segment in cue at every two-second interval until the block is staked. For example, if `segid[0]` has not mined a new block within two seconds, the consensus mechanism opens up the priority to include the second, `segid[1]`. This continues either until the block is staked, or all 64 `segid`'s are eligible to stake a new block. Once a block is staked, the `height` of the blockchain changes, pushing the `segid[0]` segment to the end of the cue, etc.

* By internal design, a utxo is more likely to win a block within a `segid` based on age of the utxo and amount of coins.

## ac_public

> A public-only asset chain.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_public=1 &
```

<aside class="notice">
	This feature is currently only available in the <a href="https://github.com/jl777/komodo/tree/jl777">jl777 branch</a>.
</aside>

If `ac_public` is set to `1`, zk-SNARKs are disabled, and all z address functionalilty is disabled. Therefore, all transactions on the blockchain are public.

## ac_private

> A private-only asset chain.

```
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_private=1 &
```

<aside class="notice">
	This feature is currently only available in the <a href="https://github.com/jl777/komodo/tree/jl777">jl777 branch</a>.
</aside>

If `ac_private` is set to `1`, all transactions other than coinbase transactions (block rewards) must use zk-SNARKs. Beyond sending mined coins from a transparent addresses to a z address, all other transparent activity is disabled.
