# DEX API

## Note About Current Limitations

This API documentation currently only features RPC methods that are available in MarketMaker 2.0 (MM2). There are many commands from the legacy Market Maker 1.0 that we intend to import to MM2 as soon as possible. For now, you may find those commands at [this external website.](api.kmd.host)

## electrum

**electrum coin ipaddr port**

::: warning Note
This command must be executed at the initiation of each MM2 instance.
:::

The `electrum` method connects your MM2 instance to the `coin` blockchain using electrum technology (e.g. lite mode).

This allows the user to rely on SPV technology for blockchain syncing, rather than syncing the entire blockchain to their local machine.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin to which you desire to connect |
| ipaddr    | string | the initial ip address by which you desire to connect |
| port      | number | the port on which to connect |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| address    | string  | the address of the user's `coin` wallet, based on the user's passphrase |
| balance   | number    | the amount of `coin` the user holds in their wallet |
| result    | string    | the result of the request; this will be either `success`, or will indicate an error or failure otherwise |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HELLOWORLD\",\"urls\":[\"electrum1.cipig.net:10022\",\"electrum2.cipig.net:10022\",\"electrum3.cipig.net:10022\"]}"
```

Response:

```bash
{
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 10,
  "result": "success"
}
```

## enable

**enable (coin)**

The `enable` method connects your MM2 instance to the `coin` blockchain using this blockchain's native technology.

A native installation of this blockchain must also be running on the user's node for `enable` to function.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the blockchain to which the user desires to connect |

### Response:


| Structure | Type     | Description |
| --------- | -------- | ----------- |
| [still needed] | | |

#### :pushpin: Examples:

[still needed]

## my_balance

**my_balance coin**

The `my_balance` method returns the current balance of the specified `coin`.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin to which you desire to connect |

### Response:


| Structure | Type     | Description |
| --------- | -------- | ----------- |
| address | string | the address that holds the coins |
| balance | number | the number of coins in the address |
| coin  | string    | the name of the coin |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_balance\",\"coin\":\"HELLOWORLD\"}"
```

Response:

```bash
{
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 10,
  "coin": "HELLOWORLD"
}
```

## orderbook

**orderbook base rel duration=number**

The `orderbook` method requests from the network the currently available orders for the specified trading pair.

By default `duration` should be set to `duration=3600`.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | string | the name of the coin the user desires to receive |
| rel       | string | the name of the coin the user desires to sell |
| duration  | number | [still needed] |

### Response:


| Structure | Type     | Description |
| --------- | -------- | ----------- |
| bids | array | an array of objects containing outstanding bids (from Alice nodes) |
| numbids | number | the number of outstanding bids |
| biddepth | number | [still needed, along with the rest of this] |
| asks | array | an array of objects containing outstanding asks (from Bob nodes) |
| coin | string | name of the `base` coin; the user desires this |
| address | string | address offering the trade |
| price | number | asking price of `rel` coin the user will sell per every 1 unit of `base` coin |
| numutxos | number | the number of utxos the offer provider has in their wallet |
| avevolume | number | the average volume of `coin` per utxo |
| maxvolume | number | the total amount of `base` coins the offer provider has in their wallet |
| depth | number | [still need this] |
| pubkey | string | the pubkey of the offer provider |
| age | number | the age of the offer |
| zcredits | number | [still need this] |
| numasks | number | total number of asks |
| askdepth | number | depth of the ask requests |
| base | string | the name of the coin the user desires to receive |
| rel | string | the name of the coin the user will trade |
| timestamp | number | the timestamp of the orderbook request |
| netid | number | the id of the network on which the requst is made (default is `0`) |

#### :pushpin: Examples

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"HELLO\",\"rel\":\"WORLD\"}"
```

Response:

```bash
{
  "bids": [],
  "numbids": 0,
  "biddepth": 0,
  "asks": [
    {
      "coin": "HELLO",
      "address": "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh",
      "price": 0.89999998,
      "numutxos": 0,
      "avevolume": 0,
      "maxvolume": 10855.85028615,
      "depth": 0,
      "pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
      "age": 11,
      "zcredits": 0
    }
  ],
  "numasks": 1,
  "askdepth": 0,
  "base": "HELLO",
  "rel": "WORLD",
  "timestamp": 1549327944,
  "netid": 9999
}
```

## buy

**buy base rel price relvolume timeout=number duration=number**

The `buy` method issues a buy request and attempts to match an order from the orderbook based on the provided arguments.

By default, `timeout` and `duration` should be set to `timeout=10` and `duration=3600`.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | (string) | the name of the coin the user desires to receive |
| rel       | (string) | the name of the coin the user desires to sell |
| price     | (number) | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| relvolume | (number) | the amount of coins the user is willing to spend of the `rel` coin |
| timeout | (number) | |
| duration | (number) | | 

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| result | string | whether the request was entered successfully |
| swaps | array | an array of swap ids; indicates current ongoing swaps |
| netamounts | array | an array of [still need this] |
| pending |  object | an object containing the swap information |
| uuid | string | [still need] |
| expiration | number | indicates the time at which the swap expires |
| timeleft | number | indicates the amount of time remaining before the swap times out |
| tradeid | number | unique id of this trade on this network |
| requestid | number | unique id of this trade request |
| quoteid | number | [still need] |
| bob | string | name of the coin bob is trading |
| base | string | name of the `base` coin the user desires |
| basevalue | number | the value of `base` coin for every `1` unit of `rel` coin | 
| alice | string | name of the coin alice is trading |
| rel | string | name of the `rel` coin the user is trading |
| relvalue | number | [still need this] |
| desthash | string | [still need this] |
| aliceid | number | alice's unique id on this network |
| uuid | string | [still need this] |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HELLO\",\"rel\":\"WORLD\",\"relvolume\":1,\"price\":0.95}"
```

Response:

```bash
{
  "result": "success",
  "swaps": [
    [
      2840245791,
      3687103952
    ],
    [
      925874441,
      2994130620
    ],
    [
      2153536788,
      640664548
    ]
  ],
  "netamounts": [],
  "pending": {
    "uuid": "611b85f8721d37c71e77e8d116fb60b5ebe51d949aa8d2ff15c5b34da26bfdf3",
    "expiration": 1549329023,
    "timeleft": 29,
    "tradeid": 329880305,
    "requestid": 0,
    "quoteid": 0,
    "bob": "HELLO",
    "base": "HELLO",
    "basevalue": 1.0530423,
    "alice": "WORLD",
    "rel": "WORLD",
    "relvalue": 1.0002,
    "desthash": "edb2a3d86a7c1b3665a9bd269974ca154e005c0afa3e95e0e7da6e9bd231ae11",
    "aliceid": 502776683
  },
  "uuid": "611b85f8721d37c71e77e8d116fb60b5ebe51d949aa8d2ff15c5b34da26bfdf3"
}
```

## sell

**sell base rel price basevolume timeout=number duration=number**

The `sell` method issues a sell request and attempts to match an order from the orderbook based on the provided arguments.

By default, `timeout` and `duration` should be set to `timeout=10` and `duration=3600`.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | (string) | the name of the coin the user desires to receive |
| rel       | (string) | the name of the coin the user desires to sell |
| price     | (number) | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| relvolume | (number) | the amount of coins the user is willing to spend of the `rel` coin |
| timeout | (number) | |
| duration | (number) | | 

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
[still need all of this]

#### :pushpin: Examples:

[Need an example to work with, don't know how to use it on my machine yet, gives me errors.]

## setprice

**setprice base rel price broadcast=number**

::: warning Note
This API method's documentation is currently limited, as we are still testing.
:::

The `setprice` method places an order on the orderbook, and it relies on this node acting as a `maker` -- also called a `Bob` node.

`setprice` requires that the node have the `maker` environment enabled at runtime. To achieve this, do not set the `client=1` parameter.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | (string) | the name of the coin the user desires to receive |
| rel       | (string) | the name of the coin the user desires to sell |
| price     | (number) | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| broadcast | (number) | |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (coming soon) | | | 

#### :pushpin: Examples:

(coming soon)

## stop

**stop()**

The `stop` method stops the MM2 software if there are no swaps in process. 

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |   | |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |   | |

## help

**help()**

The `help` method returns the full API documentation in the terminal. 

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |   | |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (returns the full docs in terminal)    |   | |

