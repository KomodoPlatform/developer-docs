# Examples and descriptions of various Smart Chain configurations

- The purpose of this document is to give a better understanding of Smart Chain parameters via examples. These chains are grouped simply by the number of parameters used in customizing each. As new parameters are added, the new combinations will be tested and added here.
- Please see [Creating a new Blockchain using Komodo Platform](./create-a-default-smart-chain.html) and [Parameters to customize Blockchains created using Komodo Platform](../../antara/antara-setup/antara-customizations.html) if you haven't already.
- All chains must have at least `ac_name` and `ac_supply` set. The `ac_pubkey` parameter can be used with any of these chains. If `ac_perc` is not set, the only effect `ac_pubkey` has is to have the genesis block be mined to the pubkey that has been specified. The parameters `ac_name` , `ac_supply` , `ac_pubkey` are not counted when grouping based on the `Number of parameters`.
- The values of parameters other than `ac_name` in these examples are completely arbitrary. The names of these example-asset-chains are assigned based on how a chain is customized and its grouping.

## Number of parameters: 1

### ac_reward

```bash
./komodod -ac_name=1REW -ac_supply=999999 -ac_reward=100000000
```

- 999999 coin premine
- 1 coin block reward that does not end.

### ac_halving

```bash
./komodod -ac_name=1HALV -ac_supply=999999 -ac_halving=2000
```

- 999999 coin premine
- Default block reward of 0.0001 coin; On demand blocks after block 128
- `ac_halving` has no effect unless `ac_reward` is set

### ac_decay

```bash
./komodod -ac_name=1DECAY -ac_supply=999999 -ac_decay=50000000
```

- 999999 coin premine
- Default block reward of 0.0001 coin; On demand blocks after block 128
- `ac_decay` has no effect unless `ac_reward` is set

### ac_end

```bash
./komodod -ac_name=1END -ac_supply=999999 -ac_end=25000
```

- 999999 coin premine
- Default block reward of 0.0001 coin; On demand blocks after block 128
- Block reward ends at block 25000.

### ac_perc ac_pubkey

```bash
./komodod -ac_name=1PERC -ac_supply=999999 -ac_perc=5000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_staked

```bash
./komodod -ac_name=1STAKE -ac_supply=999999 -ac_reward=100000000 -ac_staked=90
```

- 999999 coin premine
- 1 coin block reward
- Chain adjusts difficulty so 90% of blocks are proof of stake, 10% proof of work
- It’s important to start staking immediately for high percentages of POS. If too many POW blocks are mined consecutively at the start of the chain, the POW difficulty may increase enough to stop the chain entirely, meaning you can’t send a transaction to staking nodes.

## Number of parameters: 2

### ac_reward ac_halving

```bash
./komodod -ac_name=2REWHALV -ac_supply=999999 -ac_reward=500000000 -ac_halving=2000
```

- 999999 coin premine
- 5 coin block reward.
- Block reward decreases by 50% every 2000 blocks.

### ac_reward ac_decay

```bash
./komodod -ac_name=2REWDECAY -ac_supply=999999 -ac_reward=500000000 -ac_decay=75000000
```

- 999999 coin premine
- 5 coin block reward
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.

### ac_reward ac_end

```bash
./komodod -ac_name=2REWEND -ac_supply=999999 -ac_reward=500000000 -ac_end=200
```

- 999999 coin premine
- 5 coin block reward
- Block reward ends at block 200.

### ac_reward ac_perc ac_pubkey

```bash
./komodod -ac_name=2REWPERC -ac_supply=999999 -ac_reward=500000000 -ac_perc=5000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- 999999 coin premine
- 5 coin block reward
- Pubkey address receives 0.25 coin for every mined block.(an additional 5% of block reward)
- Pubkey address receives an additional 5% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 5 coins
- are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_staked

```bash
./komodod -ac_name=2REWSTAKE -ac_supply=100000 -ac_reward=1000000000 -ac_staked=2
```

- 100000 coin premine
- 10 coin block reward
- Chain adjusts difficulty so 2% of blocks are proof of stake, 98% proof of work.

### ac_halving ac_decay

```bash
./komodod -ac_name=2HALVDECAY -ac_supply=999999 -ac_halving=2000 -ac_decay=50000000
```

- 999999 coin premine
- Default block reward of 0.0001 coin; On demand blocks after block 128
- `ac_halving` and `ac_decay` have no effect if `ac_reward` is not set.

### ac_halving ac_end

```bash
./komodod -ac_name=2HALVEND -ac_supply=999999 -ac_halving=2000 -ac_end=10000
```

- 999999 coin premine
- Default block reward of 0.0001 coin; Blocks are on-demand after block 128
- Block reward ends at block 10000
- `ac_halving` has no effect without `ac_reward` being set.

### ac_halving ac_perc ac_pubkey

```bash
./komodod -ac_name=2HALVPERC -ac_supply=999999 -ac_halving=2000 -ac_perc=5000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- `ac_halving` has no effect if `ac_reward` is not set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_halving ac_staked

```bash
./komodod -ac_name=2HALVSTAKE -ac_supply=999999 -ac_halving=2000 -ac_staked=10
```

- Default block reward of 0.0001 coin
- Chain adjusts difficulty so 10% of blocks are proof of stake, 90% proof of work.
- `ac_halving` has no effect without `ac_reward` being set.

### ac_decay ac_end

```bash
./komodod -ac_name=2DECEND -ac_supply=999999 -ac_decay=5000000 -ac_end=10000
```

- 999999 coin premine
- Default block reward of 0.0001 coin; Blocks are on-demand after block 128
- Block reward ends at block 10000.
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.

### ac_decay ac_perc ac_pubkey

```bash
./komodod -ac_name=2DECPERC -ac_supply=999999 -ac_decay=75000000 -ac_perc=10000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- `ac_decay` has no effect without setting `ac_reward` and `ac_halving` both set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_decay ac_staked

```bash
./komodod -ac_name=2DECAYSTAKE -ac_supply=999999 -ac_decay=5000000 -ac_staked=50
```

- 999999 coin premine
- Default block reward of 0.0001 coin
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- Chain adjusts difficulty so 50% of blocks are proof of stake, 50% proof of work.

### ac_end ac_perc ac_pubkey

```bash
./komodod -ac_name=2ENDPERC -ac_supply=999999 -ac_end=10000 -ac_perc=5000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_end ac_staked

```bash
./komodod -ac_name=2ENDSTAKE -ac_supply=999999 -ac_end=10000 -ac_staked=5
```

- 999999 coin premine
- Default block reward of 0.0001 coin
- Block reward ends at block 10000.
- Chain adjusts difficulty so 5% of blocks are proof of stake, 95% proof of work.

### ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=2PERCSTAKE -ac_supply=999999 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50
```

- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

## Number of parameters: 3

### ac_reward ac_halving ac_decay

```bash
./komodod -ac_name=3REWHALVDEC -ac_supply=999999 -ac_reward=1000000000 -ac_halving=2000 -ac_decay=75000000
```

- 999999 coin premine
- 10 coin block reward
- Block reward decreases by 25% every 2000 blocks.

### ac_reward ac_halving ac_end

```bash
./komodod -ac_name=3REWHALVEND -ac_supply=999999 -ac_reward=500000000 -ac_halving=2000 -ac_end=10000
```

- 999999 coin premine
- 5 coin block reward
- Block reward decreases by 50% every 2000 blocks
- Block reward ends at block 10000

### ac_reward ac_halving ac_perc ac_pubkey

```bash
./komodod -ac_name=3REWHALVPERC -ac_supply=999999 -ac_reward=500000000 -ac_halving=1440 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_perc=50000000
```

- 999999 coin premine
- 5 coin block reward
- Block reward decreases by 50% every 1440 blocks.
- The pubkey address receives an additional 50% of the block reward for each mined block. For example, before the first halving the pubkey address will receive 2.5 coins(50% of 5 coin block reward) for every mined block. After the first halving, the pubkey address will receive 1.25 coins.
- The pubkey address receives an additional 50% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 50 coins are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_halving ac_staked

```bash
./komodod -ac_name=3REWHALVSTAKE -ac_supply=999999 -ac_reward=100000000 -ac_havling=2000 -ac_staked=10
```

- 999999 coin premine
- 1 coin block reward
- Block reward decreases by 50% every 2000 blocks
- Chain adjusts difficulty so 10% of blocks are proof of stake, 90% proof of work.

### ac_reward ac_decay ac_end

```bash
./komodod -ac_name=3REWDECEND -ac_supply=999999 -ac_reward=500000000 -ac_decay=75000000 -ac_end=5000
```

- 999999 coin premine
- 5 coin block reward
- Block reward ends at block 5000.
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.

### ac_reward ac_decay ac_perc ac_pubkey

```bash
./komodod -ac_name=3REWDECPERC -ac_supply=999999 -ac_reward=500000000 -ac_decay=75000000 -ac_perc=10000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- 999999 coin premine
- 5 coin block reward
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- Pubkey address receives 0.5 coin for every mined block(an additional 10% of block reward)
- Pubkey address receives an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 10 coins are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_decay ac_staked

```bash
./komodod -ac_name=3REWDECSTAKE -ac_supply=999999 -ac_reward=1000000000 -ac_decay=25000000 -ac_staked=50
```

- 999999 coin premine
- 10 coin block reward
- `ac_decay` has no effect if `ac_halving` is not set
- Chain adjusts difficulty so 50% of blocks are proof of stake, 50% proof of work.

### ac_reward ac_end ac_perc ac_pubkey

```bash
./komodod -ac_name=3ENDPERCREW -ac_supply=999999 -ac_reward=5000000000 -ac_end=10000 -ac_perc=5000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- 999999 coin premine
- 50 coin block reward
- Block reward ends at block 10000.
- Pubkey address receives 2.5 coins(an additional 5% of block reward) for every mined block before block 10000.
- Pubkey address receives an additional 5% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 5 coins are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be pubkey as opposed to pubkeyhash.

### ac_reward ac_end ac_staked

```bash
./komodod -ac_name=3REWENDSTAKE -ac_supply=500000 -ac_reward=10000000000 -ac_end=15000 -ac_staked=60
```

- 500000 coin premine
- 100 coin block reward
- Block reward ends at block 15000.
- Chain adjusts difficulty so 60% of blocks are proof of stake, 40% proof of work.

### ac_reward ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=3REWPERCSTAKE -ac_supply=1000000 -ac_reward=1000000000 -ac_perc=10000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50
```

- 1000000 coin premine
- 10 coin block reward
- Chain adjusts difficulty so 50% of blocks are proof of stake, 50% proof of work.
- Pubkey address receives 1 coin for every mined block.(an additional 10% of block reward)
- Pubkey address receives an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 5 coins are created and sent to the pubkey address. This includes the additional verification transaction in POS blocks, meaning the pubkey address receives more coins for every POS block.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_halving ac_decay ac_end

```bash
./komodod -ac_name=3HALVDECEND -ac_supply=999999 -ac_end=100000 -ac_halving=5000 -ac_end=100000
```

- 999999 coin premine
- Default block reward of .0001; Blocks are on-demand after block 128.
- Block reward ends at block 100000.
- `ac_halving` has no effect if `ac_reward` is not set.

### ac_halving ac_decay ac_perc ac_pubkey

```bash
./komodod -ac_name=3HALVDECPERC -ac_supply=999999 -ac_halving=2000 -ac_decay=25000000 -ac_perc=90000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- `ac_halving` has no effect if `ac_reward` is not set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_halving ac_decay ac_staked

```bash
./komodod -ac_name=3HALVDECSTAKE -ac_supply=50000 -ac_halving=2000 -ac_decay=45000000 -ac_staked=40
```

- 50000 coin premine
- `ac_halving` and `ac_decay` have no effect if `ac_reward` is not set
- Chain adjusts difficulty so 40% of blocks are proof of stake, 60% proof of work.

### ac_halving ac_end ac_perc ac_pubkey

```bash
./komodod -ac_name=3HALVENDPERC -ac_supply=999 -ac_halving=1441 -ac_end=20000 -ac_perc=10000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- `ac_halving` has no effect if `ac_reward` is not set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_halving ac_end ac_staked

```bash
./komodod -ac_name=3HALVENDSTAKE -ac_supply=50000 -ac_halving=2000 -ac_end=10000 -ac_staked=50
```

- 50000 coin premine
- Default block reward of 0.0001 coin
- `ac_halving\` has no effect if \`\`ac_reward` is not set.
- Block reward ends at block 10000.
- Chain adjusts difficulty so 50% of blocks are proof of stake, 50% proof of work.

### ac_halving ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=3HALVPERCSTAKE -ac_supply=99999 -ac_halving=2000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=10
```

- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_decay ac_end ac_perc ac_pubkey

```bash
./komodod -ac_name=3DECENDPERC -ac_supply=10000 -ac_decay=75000000 -ac_end=100000 -ac_perc=10000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_decay ac_end ac_staked

```bash
./komodod -ac_name=3DECENDSTAKE -ac_supply=800000 -ac_decay=20000000 -ac_end=20000 -ac_staked=60
```

- 800000 coin premine
- Default block reward of 0.0001 coin
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- Block reward ends at block 20000.
- Chain adjusts difficulty so 60% of blocks are proof of stake, 40% proof of work.

### ac_decay ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=3DECPERCSTAKE -ac_supply=77777 -ac_decay=40000000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_end ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=3ENDPERCSTAKE -ac_supply=999999 -ac_end=70000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=10
```

- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

## Number of parameters: 4

### ac_reward ac_halving ac_decay ac_end

```bash
./komodod -ac_name=4REWHALVDECEND -ac_supply=1000000 -ac_reward=10000000000 -ac_halving=10000 -ac_decay=25000000 -ac_end=100000
```

- 1000000 coin premine
- 100 coin block reward
- Block reward decreases by 75% every 10000 blocks.
- Block reward ends at block 100000.

### ac_reward ac_halving ac_decay ac_perc ac_pubkey

```bash
./komodod -ac_name=4REWHALVDECPERC -ac_supply=999999 -ac_reward=1000000000 -ac_halving=5000 -ac_decay=60000000 -ac_perc=5000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- 999999 coin premine
- 10 coin block reward
- Block reward decreases 40% every 5000 blocks
- The pubkey address receives an additional 5% of the block reward for each mined block. For example, before the first halving, the pubkey address will receive 0.5 coin(5% of 10 coin block reward) for every mined block. After the first halving, the pubkey address will receive 0.3 coin for every mined block.(5% of 6 coin block reward)
- Pubkey address receives an additional 5% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 5 coins
- are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_halving ac_decay ac_staked

```bash
./komodod -ac_name=4REWHALVDECSTAKE -ac_supply=99999 -ac_reward=1000000000000 -ac_halving=2000 -ac_decay=60000000 -ac_staked=50
```

- 99999 coin premine
- 10000 coin block reward
- Block reward decreases by 40% every 2000 blocks.
- Chain adjusts difficulty so 50% of blocks are proof of stake, 50% proof of work.

### ac_reward ac_halving ac_end ac_perc ac_pubkey

```bash
./komodod -ac_name=4REWPERCENDHALV -ac_supply=999999 -ac_reward=1000000000 -ac_halving=2000 -ac_end=60005 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_perc=10000000
```

- 999999 coin premine
- 10 coin block reward
- Block reward decreases by 50% every 2000 blocks.
- Block reward ends at block 60005.
- The pubkey address receives an additional 10% of the block reward for each mined block. For example, before the first halving, the pubkey address will receive 1 coin(10% of 10 coin block reward) for every mined block. After the first halving, the pubkey address will receive 0.5 coin for every mined block.
- Pubkey address receives an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 10 coins are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_halving ac_end ac_staked

```bash
./komodod -ac_name=4REWHALVENDSTAKE -ac_supply=99999 -ac_reward=10000000 -ac_halving=5000 -ac_end=50000 -ac_staked=40
```

- 99999 coin premine
- 0.1 coin block reward
- Block reward decreases by 50% every 5000 blocks.
- Block reward ends at block 50000.
- Chain adjusts difficulty so 40% of blocks are proof of stake, 60% proof of work.

### ac_reward ac_halving ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=4PERCREWHALVSTAKE -ac_supply=999999 -ac_reward=1000000000 -ac_halving=2000 -ac_perc=5000000 -ac_staked=50 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- 999999 coin premine
- 10 coin block reward
- Block reward decreases by 50% every 2000 blocks.
- Chain adjusts difficulty so 50% of blocks are proof of stake, 50% proof of work.
- The pubkey address receives an additional 5% of the block reward for each mined block. For example, before the first halving, the pubkey address will receive 0.5 coin(5% of 10 coin block reward) for every mined block. After the first halving, the pubkey address will receive 0.25 coin for every mined block.
- Pubkey address receives an additional 5% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 5 coins are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_decay ac_end ac_perc ac_pubkey

```bash
./komodod -ac_name=4REWDECENDPERC -ac_supply=70000 -ac_reward=700000000 -ac_decay=80000000 -ac_end=10000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- 70000 coin premine
- 7 coin block reward
- Block reward ends at block 10000.
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- Pubkey address receives .07 coin for every mined block.(an additional 1% of block reward)
- Pubkey address receives an additional 1% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 1 coins are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_decay ac_end ac_staked

```bash
./komodod -ac_name=4REWDECENDSTAKE -ac_supply=999999 -ac_reward=500000000 -ac_decay=75000000 -ac_end=12000 -ac_staked=40
```

- 999999 coin premine
- 5 coin block reward
- Block rewards ends at block 12000.
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- Chain adjusts difficulty so 40% of blocks are proof of stake, 60% proof of work.

### ac_reward ac_decay ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=4REWDECPERCSTAKE -ac_supply=9000 -ac_reward=1000000000 -ac_decay=80000000 -ac_perc=2000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=80
```

- 9000 coin premine
- 10 coin block reward.
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- Pubkey address receives 0.2 coin for every mined block.(an additional 2% of block reward)
- Pubkey address receives an additional 2% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 2 coins are created and sent to the pubkey address. This includes the additional verification transaction in POS blocks, meaning the pubkey address receives more coins for every POS block.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_end ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=4REWENDPERCSTAKE -ac_supply=999999 -ac_reward=5000000000 -ac_end=10000 -ac_staked=33 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- 999999 coin premine
- 50 coin block reward
- Block rewards ends at block 10000.
- Chain adjusts difficulty so 33% of blocks are proof of stake, 67% proof of work.
- Pubkey address receives 0.5 coin for every mined block(an additional 1% of block reward)
- Pubkey address receives an additional 1% for every transaction made on the chain. For example, if a transaction sends 100 coins, 1 additional coin is created and sent to the pubkey address. This includes the additional verification transaction in POS blocks, meaning the pubkey address receives more coins for every POS block.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_halving ac_decay ac_end ac_perc ac_pubkey

```bash
./komodod -ac_name=4HALVDECENDPERC -ac_supply=11 -ac_halving=5000000 -ac_decay=1000000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- `ac_halving` has no effect if `ac_reward` is not set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_halving ac_decay ac_end ac_staked

```bash
./komodod -ac_name=4HALVDECENDSTAKE -ac_supply=999999 -ac_halving=5000 -ac_decay=60000000 -ac_end=25000 -ac_staked=10
```

- 999999 coin premine
- Default block reward of .0001 coin.
- Block reward ends at block 25000
- `ac_halving` and `ac_decay` have no effect if `ac_reward` is not set
- Chain adjusts difficulty so 10% of blocks are proof of stake, 90% proof of work.

### ac_halving ac_decay ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=4HALVDECPERCSTAKE -ac_supply=40000 -ac_halving=5000 -ac_decay=75000000 -ac_perc=10000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=60
```

- `ac_halving` and `ac_decay` have no effect if `ac_reward` is not set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_halving ac_end ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=4HALVENDPERCSTAKE -ac_supply=99999 -ac_halving=6000 -ac_end=60000 -ac_perc=10000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=30
```

- `ac_halving` has no effect if `ac_reward` is not set
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

### ac_decay ac_end ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=4DECENDPERCSTAKE -ac_supply=999999 -ac_decay=75000000 -ac_end=100000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=40
```

- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

## Number of parameters: 5

### ac_reward ac_halving ac_decay ac_end ac_perc ac_pubkey

```bash
./komodod -ac_name=5REWHALVDECENDPERC -ac_supply=999999 -ac_reward=10000000000 -ac_halving=10000 -ac_decay=75000000 -ac_end=100000 -ac_perc=2000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

- 999999 coin premine
- 100 coin block reward
- Block reward reduces by 25% every 10000 blocks.
- Block reward ends at block 100000.
- The pubkey address receives an additional 2% of the block reward for each mined block. For example, before the first halving, the pubkey address will receive 2 coins(2% of 100 coin block reward) for every mined block. After the first halving, the pubkey address will receive 1.5 coins for every mined block.(2% of 75 coin block reward)
- Pubkey address receives an additional 2% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 2 coins are created and sent to the pubkey address.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_halving ac_decay ac_end ac_staked

```bash
./komodod -ac_name=5REWHALVDECENDSTAKE -ac_supply=50000 -ac_reward=500000000 -ac_halving=5000 -ac_decay=70000000 -ac_end=100000 -ac_staked=80
```

- 50000 coin premine
- 5 coin block reward
- Block reward decreases by 30% every 5000 blocks.
- Block reward ends at block 100000.
- Chain adjusts difficulty so 80% of blocks are proof of stake, 20% proof of work.

### ac_reward ac_halving ac_decay ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=5REWHALVDECPERCSTAKE -ac_supply=1 -ac_reward=50000000000 -ac_halving=2000 -ac_decay=25000000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50
```

- 1 coin premine
- 500 coin block reward
- Block reward decreases by 75% every 2000 blocks.
- Chain adjusts difficulty so 50% of blocks are proof of stake, 50% proof of work.
- The pubkey address receives an additional 1% of the block reward for each mined block. For example, before the first halving, the pubkey address will receive 5 coins(1% of 500 coin block reward) for every mined block. After the first halving, the pubkey address will receive 1.25 coins for every mined block.(1% of 125 block reward)
- Pubkey address receives an additional 1% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 1 coins are created and sent to the pubkey address. This includes the additional verification transaction in POS blocks, meaning the pubkey address receives more coins for every POS block.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_halving ac_end ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=5REWHALVENDPERCSTAKE -ac_supply=100 -ac_reward=100000000 -ac_halving=20000 -ac_end=100000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=90
```

- 100 coin premine
- 1 coin block reward
- Block reward decreases by 50% every 20000 blocks.
- Block reward ends at block 100000.
- Chain adjusts difficulty so 90% of blocks are proof of stake, 10% proof of work.
- The pubkey address receives an additional 1% of the block reward for each mined block. For example, before the first halving, the pubkey address will receive 0.01 coin(1% of 1 coin block reward) for every mined block. After the first halving, the pubkey address will receive 0.005 coin for every mined block.(1% of 0.5 block reward)
- Pubkey address receives an additional 1% for every transaction made on the chain. For example, if a transaction sends 100 coins, 1 additional coin is created and sent to the pubkey address. This includes the additional verification transaction in POS blocks, meaning the pubkey address receives more coins for every POS block.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_reward ac_decay ac_end ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=5REWDECENDPERCSTAKE -ac_supply=1000 -ac_reward=500000000 -ac_decay=75000000 -ac_end=10000 -ac_perc=10000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=60
```

- 1000 coin premine
- 5 coin block reward
- Block reward ends at block 10000.
- `ac_decay` has no effect without `ac_halving` and `ac_reward` both set.
- Chain adjusts difficulty so 60% of blocks are proof of stake, 40% proof of work.
- Pubkey address receives 0.5 coin for every mined block.(an additional 10% of block reward)
- Pubkey address receives an additional 10% for every transaction made on the chain. For example, if a transaction sends 100 coins, 10 additional coin is created and sent to the pubkey address. This includes the additional verification transaction in POS blocks, meaning the pubkey address receives more coins for every POS block.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.

### ac_halving ac_decay ac_end ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=5HALVDECENDPERCSTAKE -ac_supply=1000000 -ac_halving=10000 -ac_decay=75000000 -ac_end=100000 -ac_perc=1000000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=50
```

- `ac_halving` and `ac_decay` have no effect if `ac_reward` is not set.
- If `ac_perc` is set, `ac_reward` must be set also. This chain does not work at all because `ac_reward` is not set.

## Number of parameters: 6

### ac_reward ac_halving ac_decay ac_end ac_perc ac_pubkey ac_staked

```bash
./komodod -ac_name=6REWHALVDECENDPERCSTAKE -ac_supply=100000000 -ac_reward=100000000000 -ac_halving=100000 -ac_decay=75000000 -ac_end=1000000 -ac_perc=500000 -ac_pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392 -ac_staked=1
```

- 100000000 coin premine
- 1000 coin block reward
- Block reward decreases by 25% every 100000 blocks
- Block reward ends at block 1000000
- Chain adjusts difficulty so 1% of blocks are proof of stake, 99% proof of work.
- The pubkey address receives an additional 0.5% of the block reward for each mined block. For example, before the first halving, the pubkey address will receive 5 coins(0.5% of 1000 coin block reward) for every mined block. After the first halving, the pubkey address will receive 3.75 coins for every mined block.(0.5% of 750 block reward)
- Pubkey address receives an additional 0.5% for every transaction made on the chain. For example, if a transaction sends 100 coins, an additional 0.5 coin are created and sent to the pubkey address. This includes the additional verification transaction in POS blocks, meaning the pubkey address receives more coins for every POS block.
- `ac_perc` chains are currently incompatible with z-nomp. The coinbase transaction vout type must be `pubkey` as opposed to `pubkeyhash`.
