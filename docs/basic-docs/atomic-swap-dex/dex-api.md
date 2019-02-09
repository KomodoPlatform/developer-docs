# DEX API

## Note About Current Limitations

This API documentation currently only features RPC methods that are available in MarketMaker 2.0 (MM2). There are many commands from the legacy Market Maker 1.0 that Komodo intends to import to MM2 as soon as possible. For now, these commands are available at [this external website.](api.kmd.host)

## electrum

**electrum coin urls**

::: warning Note
This command must be executed at the initiation of each MM2 instance.
:::

The `electrum` method enables a `coin` by connecting the user's MM2 instance to the `coin` blockchain using electrum technology (e.g. lite mode).

This allows the user to avoid syncing the entire blockchain to their local machine.

Each `coin` can be enabled only once, and in either Electrum or Native mode. It's not possible to use both modes at once.  

Electrum mode is available for utxo-based coins only (BTC and forks). It's not available for ETH/ERC20.


### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin you want to enable |
| urls      | array of strings | the urls of coin Electrum servers to which you want to connect |

::: warning Note
If the connection to at least one of the provided `urls` fails for any reason, MM2 will not enable the coin and will return an error.
:::

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

Response (Success):

```bash
{
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 10,
  "result": "success"
}
```
Response (Error):
```bash
{
  "error":"lp_coins:829] lp_coins:786] utxo:951] rpc_clients:557] rpc_clients:384] electrum4.cipig.net:10025 error Custom { kind: Other, error: StringError(\"failed to lookup address information: Name or service not known\") }"
}
```

## enable

**enable (coin)**

The `enable` method enables a coin by connecting your MM2 instance to the `coin` blockchain using the `native` coin daemon (e.g. komodod for KMD).

Each coin can be enabled only once, and in either Electrum or Native mode. It's not possible to use both modes at once.  

For utxo-based coins the daemon of this blockchain must also be running on the user's machine for `enable` to function.  

ETH/ERC20 coins are also enabled by the `enable` method, but a local installation of an ETH node is not required.  

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin you want to enable |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| address    | string  | the address of the user's `coin` wallet, based on the user's passphrase |
| balance   | number    | the amount of `coin` the user holds in their wallet |
| result    | string    | the result of the request; this will be either `success`, or will indicate an error or failure otherwise |


#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\"}"
```

Response (success):

```bash
{
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 10,
  "result": "success"
}
```

## my_balance

**my_balance coin**

The `my_balance` method returns the current balance of the specified `coin`.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin to retrieve the balance |

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

**orderbook base rel (duration=number)**

The `orderbook` method requests from the network the currently available orders for the specified trading pair.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | string | the name of the coin the user desires to receive |
| rel       | string | the name of the coin the user desires to sell |
| duration  | number | `deprecated` |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| bids | array | an array of objects containing outstanding bids (from Alice nodes) |
| numbids | number | the number of outstanding bids |
| biddepth | number | `deprecated` |
| asks | array | an array of objects containing outstanding asks (from Bob nodes) |
| coin | string | name of the `base` coin; the user desires this |
| address | string | address offering the trade |
| price | number | asking price of `rel` coin the user will sell per every 1 unit of `base` coin |
| numutxos | number | `deprecated` the number of utxos the offer provider has in their wallet |
| avevolume | number | `deprecated` the average volume of `coin` per utxo |
| maxvolume | number | the total amount of `base` coins the offer provider has in their wallet |
| depth | number | `deprecated` |
| pubkey | string | the pubkey of the offer provider |
| age | number | the age of the offer |
| zcredits | number | zeroconf deposit amount |
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

**buy base rel price relvolume (timeout=number) (duration=number)**

The `buy` method issues a buy request and attempts to match an order from the orderbook based on the provided arguments.

MM2 will set the `timeout` value by default, but the user may override by giving it a value.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | string | the name of the coin the user desires to receive |
| rel       | string | the name of the coin the user desires to sell |
| price     | number | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| relvolume | number | the amount of coins the user is willing to spend of the `rel` coin |
| timeout | number | the amount of time to wait until the request expires; MM2 handles automatically |
| duration | number | `deprecated |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| result | string | whether the request was entered successfully |
| swaps | array | an array of swap ids; indicates current ongoing swaps |
| netamounts | array | `deprecated, will be removed` |
| pending |  object | an object containing the swap information |
| pending.uuid | string | pending swap uuid, same as request uuid |
| pending.expiration | number | indicates the time at which the swap expires |
| pending.timeleft | number | indicates the amount of time remaining before the swap times out |
| pending.tradeid | number | unique id of this trade on this network |
| pending.requestid | number | unique id of this trade request |
| pending.quoteid | number | `deprecated, will be removed` |
| pending.bob | string | `deprecated, will be removed`; name of the coin bob is trading, same as `base` |
| pending.base | string | name of the `base` coin the user desires |
| pending.basevalue | number | the value of `base` coin to be exchanged | 
| pending.alice | string | `deprecated, will be removed`; name of the coin alice is trading, same as `rel` |
| pending.rel | string | name of the `rel` coin the user is trading |
| pending.relvalue | number | the value of `rel` coin to be exchanged |
| pending.desthash | string | `deprecated, will be renamed`; taker (alice) curve25519 pubkey |
| pending.aliceid | number | `deprecated, will be removed or renamed`; alice's unique id on this network |
| uuid | string | request uuid |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HELLO\",\"rel\":\"WORLD\",\"relvolume\":1,\"price\":0.95}"
```

Response (success):

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

Response (error):

```bash
{"error":"rpc:278] utxo:884] REL balance 12.88892991 is too low, required 21.15"}
```

## sell

**sell base rel price basevolume (timeout=number) (duration=number)**

The `sell` method issues a sell request and attempts to match an order from the orderbook based on the provided arguments.

MM2 will set the `timeout` value by default, but the user may override by giving a value.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | string | the name of the coin the user desires to receive |
| rel       | string | the name of the coin the user desires to sell |
| price     | number | the price in `base` the user is willing to receive per one unit of the `rel` coin |
| basevolume | number | the amount of coins the user is willing to spend of the `base` coin |
| timeout | number | the amount of time to wait until the request expires |
| duration | number | `deprecated` |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| result | string | whether the request was entered successfully |
| swaps | array | an array of swap ids; indicates current ongoing swaps |
| netamounts | array | `deprecated, will be removed` |
| pending |  object | an object containing the swap information |
| pending.uuid | string | pending swap uuid, same as request uuid |
| pending.expiration | number | indicates the time at which the swap expires |
| pending.timeleft | number | indicates the amount of time remaining before the swap times out |
| pending.tradeid | number | unique id of this trade on this network |
| pending.requestid | number | unique id of this trade request |
| pending.quoteid | number | `deprecated, will be removed` |
| pending.bob | string | `deprecated, will be removed`, name of the coin bob is trading, same as `base` |
| pending.base | string | name of the `base` coin the user desires |
| pending.basevalue | number | the value of `base` coin to be exchanged | 
| pending.alice | string | `deprecated, will be removed`, name of the coin alice is trading, same as `rel` |
| pending.rel | string | name of the `rel` coin the user is trading |
| pending.relvalue | number | the value of `rel` coin to be exchanged |
| pending.desthash | string | `deprecated, will be renamed` taker (alice) curve25519 pubkey |
| pending.aliceid | number | `deprecated, will be removed or renamed` alice's unique id on this network |
| uuid | string | request uuid |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"basevolume\":0.1,\"price\":2}"
```

Response (success):

```bash
{
"result":"success",
"swaps":[[185307610, 3224582451], [1966701661, 660662362], [1689278922, 1884083697]],
"netamounts":[],
"pending":{
    "uuid":"858b786db415182d8ff60e7a928b3350e16e632ceb95e3a0296ef78c1d28caac",
    "expiration":1549376070,
    "timeleft":9,
    "tradeid":1486969254,
    "requestid":0,
    "quoteid":0,
    "bob":"BASE",
    "base":"BASE",
    "basevalue":0.20060019,
    "alice":"REL",
    "rel":"REL",
    "relvalue":0.10020000,
    "desthash":"c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
    "aliceid":2946902639
    },
"uuid":"858b786db415182d8ff60e7a928b3350e16e632ceb95e3a0296ef78c1d28caac"}
```

Response (error):

```bash
{"error":"rpc:278] utxo:884] REL balance 12.88892991 is too low, required 21.15"}
```

## setprice

**setprice base rel price broadcast=number**

::: warning Note
This API method's documentation is currently limited, as we are still testing.
:::

The `setprice` method places an order on the orderbook, and it relies on this node acting as a `maker` -- also called a `Bob` node.

::: warning Note
`setprice` currently requires that the node can bind ports on a public IP to accept direct TCP connections from other nodes for ordermatching. This requirement will be removed soon.
:::

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | string | the name of the coin the user desires to receive |
| rel       | string | the name of the coin the user desires to sell |
| price     | number | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| broadcast | number | defines whether the price should be broadcast to p2p network as an order; the default value is `1` |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| result | string | whether the request succeeded | 

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BASE\",\"rel\":\"REL\",\"price\":0.9}
```

Response (success):

```bash
{"result":"success"}
```

Response (error):

```bash
{"error":"Rel coin REL is not found"}
```

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

