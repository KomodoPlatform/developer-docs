# Trade

Don't forget: Coins for trade pairs need to be activated in the MarketmakerV1, either [native](./enable-native-wallet-coins.md) or [electrum](./enable-electrum-wallet-coins.md) wallets can be used.

## LOOKING AT THE ORDERBOOK

To see the order book you need to execute: `./orderbook`

If the `./client` is synced the orderbook will be listed. Remember that you have to add that coin to the orderbook file:

```bash
nano ./orderbook
```

add this command with the name of the coin you want to see:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"NAME_OF_COIN\",\"rel\":\"KMD\"}"
```

## BUYING

`./buy` executes trades based on the values specified in the command. The command looks like this:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autotrade\",\"base\":\"NAME_OF_BASE_COIN",\"rel\":\"NAME_OF_REL_COIN\",\"relvolume\":VOLUME_OF_REL_COIN,\"price\"PRICE_OF_BASE_COIN}"
```

You will need to edit this script based on the info the orderbook prints. The script will look for the orders most similar to the values of `./buy` and do an atomic swap between the chains.

After editing the `./buy` file with your order parameters, execute it and you should have a trade going.

**IMPORTANT: For better results and security (dust attack vector)** `./buy` **only execute trades that are at least 10% of the offered bob(ask) order. For example, if a bob order (an ask in the orderbook) of 10 REVS is offered at a price of 1.25 komodo per REV the autotrade command should be with a relvolume of at least: 1 REV**

```bash
"{\"userpass\":\"$userpass\",\"method\":\"autotrade\",\"base\":\"REVS\",\"rel\":\"KMD\",\"relvolume\":1,\"price\":10}"
```

**since 1 is 10% of the total order of 10 REVS.**

**Alice, the one buying the REVS with KMD, will pay 1/777th of the KMD amount as fee, as a sort of safeguard against spam attacks.**

If you found an order in the orderbook with duration in the command, you should include that in the `./buy` method as well:

```json
{
  "userpass": "$userpass",
  "method": "autotrade",
  "duration": 10000,
  "base": "REVS",
  "rel": "KMD",
  "relvolume": 12.5,
  "price": 10
}
```

## SELLING (bob utxos)

`./setprice`

To create a bob utxo (or an ask order) you need to first set the price. To set price you need to edit the `./setprice` script in the dexscripts folder:

```bash
cd ~/KomodoPlatform/iguana/dexscripts/
nano setprice
```

This script contains a curl command that looks like this:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"NAME_OF_COIN_TO_TRADE\",\"rel\":\"KMD\",\"price\":PRICE_OF_ORDER}"
```

In this command you should edit the coin (`NAME_OF_COIN_TO_TRADE`) and then set the price (`PRICE_OF_ORDER`) per coin based in Komodo.

For example: if you want to sell REVS at 1.25 komodo per REV, then `NAME_OF_COIN_TO_TRADE` should be REVS and `PRICE_OF_ORDER` should be 1.25.

**After you edit the file, execute it (** `./setprice` **), then it will appear in orderbooks with that coin in either the base or rel.**
