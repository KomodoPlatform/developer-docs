# TradeBots

## bot_buy

Starts a auto tradebot to do the trading for you. `maxprice` is the highest price you want to pay for 1 base, `relvolume` is the total amount of coins you want to spend.

Sample file contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_buy\",\"base\":\"MNZ\",\"rel\":\"KMD\",\"maxprice\":3,\"relvolume\":10.0}"
```

Sample output:

```json
{
  "result": "success",
  "name": "buy_MNZ_KMD.1509539940",
  "botid": 3601212692,
  "started": 1509539940,
  "action": "buy",
  "base": "MNZ",
  "rel": "KMD",
  "maxprice": 3,
  "totalrelvolume": 10,
  "totalbasevolume": 3.33333333,
  "trades": []
}
```

## bot_list

This script will display a list of all `botid`s that you used.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_list\"}"
```

Sample Output:

```bash
[
  2833291137,
  3601212692,
  2712409213
]
```

## bot_pause

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_pause\",\"botid\":$1}"
```

Sample usage: `./bot_resume 3601212692` # here **3601212692** is the `botid` from `./bot_buy` or `./bot_sell` script output.

Sample Output:

```json
{
  "result": "success"
}
```

## bot_resume

Resumes a paused tradebot.

Sample file contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_resume\",\"botid\":$1}"
```

Sample Usage: `./bot_resume 3601212692` # here **3601212692** is the `botid` from `./bot_buy` or `./bot_sell` script output.

Sample Output:

```json
{
  "result": "success"
}
```

## bot_sell

Place a sell order using tradebots. `minprice` is the lowest you will sell for 1 coin, `basevolume` is the total amount of coins you want to sell.

Sample file contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_sell\",\"base\":\"REVS\",\"rel\":\"KMD\",\"minprice\":2,\"basevolume\":5.0}"
```

Sample Output:

```json
{
  "result": "success",
  "name": "sell_MNZ_KMD.1509549405",
  "botid": 2247122510,
  "started": 1509549405,
  "action": "sell",
  "base": "MNZ",
  "rel": "KMD",
  "minprice": 2,
  "totalbasevolume": 5,
  "totalrelvolume": 10,
  "trades": []
}
```

## bot_settings

`./bot_settings` allows you to change price or volume after starting the `bot_buy` or `bot_sell`.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_settings\",\"botid\":$1,\"newprice\":$1,\"newvolume\":$2}"
```

Sample Usage:

`./bot_settings 2247122510 3 6` # here **2247122510** is `botid` and 3 is the `new price`, 6 is the `new volume`

Sample Outputs:

```json
{
  "result": "success",
  "name": "sell_MNZ_KMD.1509549405",
  "botid": 2247122510,
  "started": 1509549405,
  "paused": 1509549517,
  "action": "sell",
  "base": "MNZ",
  "rel": "KMD",
  "minprice": 2247122510,
  "totalbasevolume": 0,
  "totalrelvolume": 3,
  "aveprice": 2,
  "volume": 4,
  "trades": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  "completed": 4,
  "percentage": 149808167333.3333,
  "pending": 6,
  "pendingprice": 2,
  "pendingvolume": 6
}
```

## bot_status

Tradebot status. Use `botid` after the `./bot_status` script.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_status\",\"botid\":$1}"
```

Sample Usage: `./bot_status 3601212692` # here **3601212692** is the `botid` from `./bot_buy` or `./bot_sell` script output.

Sample Output:

```json
{
  "result": "success",
  "name": "buy_MNZ_KMD.1509542273",
  "botid": 2384827585,
  "started": 1509542273,
  "paused": 1509542452,
  "action": "buy",
  "base": "MNZ",
  "rel": "KMD",
  "maxprice": 0.21,
  "totalrelvolume": 0.1,
  "totalbasevolume": 0.47619048,
  "aveprice": 0.20486144,
  "volume": 0.0672,
  "trades": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  "completed": 7,
  "percentage": 67.2,
  "pending": 4,
  "pendingprice": 0.20633316,
  "pendingvolume": 0.0387
}
```

## bot_statuslist

Displays the status of all bots.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_statuslist\"}"
```

## bot_stop

To stop the tradebots. Use `botid` from your buy or sell order.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"bot_stop\",\"botid\":$1}"
```

Sample usage: `./bot_stop 3601212692` # here **3601212692** is the `botid` from `./bot_buy` or `./bot_sell` script output.

Sample Output:

```json
{
  "result": "success"
}
```
