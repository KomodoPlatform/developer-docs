# DEX API

## Note About Current Limitations

This API documentation currently only features RPC methods that are available in MarketMaker 2.0 (MM2). There are many commands from the legacy Market Maker 1.0 that Komodo intends to import to MM2 as soon as possible. For now, these commands are available at [this external website.](api.kmd.host)

## electrum

**electrum coin urls (mm2 tx_history=false)**

::: warning Important

This command must be executed at the initiation of each MM2 instance. Also, Komodo DEX software requires the `mm2` parameter to be set for each `coin`; the methods to activate the parameter vary. See below for further information.

:::

::: tip

Electrum mode is available for utxo-based coins only; this includes Bitcoin and Bitcoin-based forks. Electrum mode is not available for ETH/ERC20.

:::

The `electrum` method enables a `coin` by connecting the user's software instance to the `coin` blockchain using electrum technology (e.g. lite mode). This allows the user to avoid syncing the entire blockchain to their local machine.

Each `coin` can be enabled only once, and in either Electrum or Native mode. The DEX software does not allow a `coin` to be active in both modes at once.  

#### Notes on the mm2 Parameter

For each `coin`, Komodo software requires the user/developer to set the `mm2` parameter. This can be achieved either in the [coins](../atomic-swap-dex/dex-walkthrough.md#setting-up-coin-list) for more details), or via the [electrum](../atomic-swap-dex/dex-api.html#electrum) and [enable](../atomic-swap-dex/dex-api.html#enable) methods.

The value of the `mm2` parameter informs the software as to whether the `coin` is expected to function.

- `0` = `non-functioning`
- `1` = `functioning`

::: tip
GUI software developers may refer to the `coins` file [in this link](https://github.com/jl777/coins) for the default coin json configuration.
:::

Volunteers are welcome to test coins with Komodo DEX software at any time. After testing a coin, please create a pull request with the desired coin configuration and successful swap details using the guide linked below.

[Guide to Submitting Coin Test Results](https://github.com/jl777/coins#0-the-coin-must-be-tested-with-barterdex-atomic-swaps)


##### Examples of the Parameter Settings

Set the value of the `mm2` parameter in the [coins](../atomic-swap-dex/dex-walkthrough.md#setting-up-coin-list) file as follows:

```bash
mm2=1
```

For terminal interface examples, see the examples section below.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin you want to enable |
| urls      | array of strings | the urls of Electrum servers to which you want to connect |
| mm2       | number (required if not set in the `coins` file) | this property informs the Komodo DEX software as to whether the coin is expected to function; accepted values are either `0` or `1` |
| tx_history| bool | whether to enable `tx_history` preloading in background, must be `true` if you plan to use `my_tx_history` API |

::: warning Note
If the connection to at least one of the provided `urls` fails for any reason the software will not enable the coin. Instead, the software will return an error.
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

```json
{
  "coin": "HELLOWORLD",
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

Command (With `mm2` argument):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HELLOWORLD\",\"urls\":[\"electrum1.cipig.net:10022\",\"electrum2.cipig.net:10022\",\"electrum3.cipig.net:10022\"],\"mm2\":1}"
```

Response (Success):

```bash
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 10,
  "result": "success"
}
```

Response (Error, `mm2` is not set):

```bash
{
  "error":"lp_coins:943] lp_coins:693] mm2 param is not set neither in coins config nor enable request, assuming that coin is not supported"
}
```

## enable

**enable coin (urls swap_contract_address mm2 tx_history=false)**

::: warning Important

Komodo DEX software requires the `mm2` parameter to be set for each `coin`; the methods to activate the parameter vary. See below for further information.

:::

The `enable` method enables a coin by connecting the user's software instance to the `coin` blockchain using the `native` coin daemon.

Each `coin` can be enabled only once, and in either Electrum or Native mode. The DEX software does not allow a `coin` to be active in both modes at once.  

For utxo-based coins the daemon of this blockchain must also be running on the user's machine for `enable` to function.  

ETH/ERC20 coins are also enabled by the `enable` method, but a local installation of an ETH node is not required.  

#### Notes on the mm2 Parameter

Please refer to the `mm2` explanatory section in the `electrum` method for information about setting the `mm2` parameter and testing new coins.

[Link to `mm2` explanatory section](../atomic-swap-dex/dex-api.html#notes-on-the-mm2-parameter)

For terminal interface examples using the `mm2` parameter with the `enable` method, see the examples section below.

#### Using Komodo DEX Software on an ETH-Based Network

The following information can assist the user/developer in connecting Komodo DEX software to the Ethereum network:

- Swap smart contract on the ETH mainnet: [0x8500AFc0bc5214728082163326C2FF0C73f4a871](https://etherscan.io/address/0x8500AFc0bc5214728082163326C2FF0C73f4a871) 
  - Main-net node maintained by the Komodo team: <b>http://195.201.0.6:8555</b>  
- Swap smart contract on the Ropsten testnet: [0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94](https://ropsten.etherscan.io/address/0x7bc1bbdd6a0a722fc9bffc49c921b685ecb84b94) 
  - Ropsten node maintained by the Komodo team: <b>http://195.201.0.6:8545</b> 

To use Komodo DEX software on another Ethereum-based network, such as the Kovan testnet or ETC, deploy the Etomic swap contract code from the repository linked below. Use of this code requires either an ETH node setup or access to a public service such as [Infura.](https://infura.io/)

[Link to repository code for Ethereum-based networks](https://github.com/artemii235/etomic-swap)

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin the user desires to enable |
| urls      | array of strings (required for ETH/ERC20) | urls of Ethereum RPC nodes to which the user desires to connect |
| swap_contract_address | string (required for ETH/ERC20) | address of etomic swap smart contract |
| mm2       | number (required if not set in the `coins` file) | this property informs the Komodo DEX software as to whether the coin is expected to function; accepted values are either `0` or `1` |
| tx_history| bool | whether to enable `tx_history` preloading in background, must be `true` if you plan to use `my_tx_history` API |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| address    | string  | the address of the user's `coin` wallet, based on the user's passphrase |
| balance   | number    | the amount of `coin` the user holds in their wallet |
| result    | string    | the result of the request; this will be either `success`, or will indicate an error or failure otherwise |

#### :pushpin: Examples:

Command (for Bitcoin-based blockchains):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\"}"
```

Response:

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 10,
  "result": "success"
}
```

Command (for Ethereum and ERC20-based blockchains):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETH\",\"urls\":[\"http://195.201.0.6:8545\"],\"swap_contract_address\":\"0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94\"}"
```

Response:

```json
{
  "coin": "ETH",
  "address": "0x3c7aad7b693e94f13b61d4be4abaeaf802b2e3b5",
  "balance": 50,
  "result": "success"
}
```

Command (With `mm2` argument):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\",\"mm2\":1}"
```

Response (Success):

```bash
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 10,
  "result": "success"
}
```

Response (Error, `mm2` is not set):

```bash
{
  "error":"lp_coins:943] lp_coins:693] mm2 param is not set neither in coins config nor enable request, assuming that coin is not supported"
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

```json
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
| coin | string | the name of the `base` coin; the user desires this |
| address | string | the address offering the trade |
| price     | number | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| numutxos | number | `deprecated` the number of utxos the offer provider has in their wallet |
| avevolume | number | `deprecated` the average volume of `coin` per utxo |
| maxvolume | number | the total amount of `base` coins the offer provider has in their wallet |
| depth | number | `deprecated` |
| pubkey | string | the pubkey of the offer provider |
| age | number | the age of the offer |
| zcredits | number | the zeroconf deposit amount |
| numasks | number | the total number of asks |
| askdepth | number | the depth of the ask requests |
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

```json
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
| pending.uuid | string | the pending swap uuid -- same as request uuid |
| pending.expiration | number | indicates the time at which the swap expires |
| pending.timeleft | number | indicates the amount of time remaining before the swap times out |
| pending.tradeid | number | the unique id of this trade on this network |
| pending.requestid | number | the unique id of this trade request |
| pending.quoteid | number | `deprecated, will be removed` |
| pending.bob | string | `deprecated, will be removed`; the name of the coin bob is trading, same as `base` |
| pending.base | string | the name of the `base` coin the user desires |
| pending.basevalue | number | the value of `base` coin to be exchanged | 
| pending.alice | string | `deprecated, will be removed`; the name of the coin alice is trading, same as `rel` |
| pending.rel | string | the name of the `rel` coin the user is trading |
| pending.relvalue | number | the value of `rel` coin to be exchanged |
| pending.desthash | string | `deprecated, will be renamed`; taker (alice) curve25519 pubkey |
| pending.aliceid | number | `deprecated, will be removed or renamed`; alice's unique id on this network |
| uuid | string | the request uuid |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HELLO\",\"rel\":\"WORLD\",\"relvolume\":1,\"price\":0.95}"
```

Response (success):

```json
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

```json
{"error":"rpc:278] utxo:884] REL balance 12.88892991 is too low, required 21.15"}
```

## sell

**sell base rel price basevolume (timeout=number) (duration=number)**

The `sell` method issues a sell request and attempts to match an order from the orderbook based on the provided arguments.

Komodo software will set the `timeout` value by default, but the user may override by giving a value.

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
| pending.tradeid | number | the unique id of this trade on this network |
| pending.requestid | number | the unique id of this trade request |
| pending.quoteid | number | `deprecated, will be removed` |
| pending.bob | string | `deprecated, will be removed`, the name of the coin bob is trading, same as `base` |
| pending.base | string | the name of the `base` coin the user desires |
| pending.basevalue | number | the value of `base` coin to be exchanged | 
| pending.alice | string | `deprecated, will be removed`, the name of the coin alice is trading, same as `rel` |
| pending.rel | string | the name of the `rel` coin the user is trading |
| pending.relvalue | number | the value of `rel` coin to be exchanged |
| pending.desthash | string | `deprecated, will be renamed` the taker's (alice) curve25519 pubkey |
| pending.aliceid | number | `deprecated, will be removed or renamed` alice's unique id on this network |
| uuid | string | the request uuid |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"basevolume\":0.1,\"price\":2}"
```

Response (success):

```json
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

```json
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

```json
{"result":"success"}
```

Response (error):

```json
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

## withdraw

**withdraw coin to amount**

The `withdraw` method generates, signs, and returns a transaction that transfers the `amount` of `coin` to the address indicated in the `to` argument.  

This method generates a raw transaction which should then be broadcast using [send_raw_transaction](../atomic-swap-dex/dex-api.html#send-raw-transaction).

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin the user desires to withdraw |
| to        | string | coins will be withdrawn to this address |
| amount    | number | the amount the user desires to withdraw |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| from      | array of strings    | coins will be withdrawn from this address, the array contains single element, but in common case transactions might be sent from several addresses (UTXO coins) |
| to        | array of strings    | coins with be withdrawn to this address, might contain `my_address` for UTXO coins as change address |
| my_balance_change | number      | expected balance change after transaction will be broadcasted |
| received_by_me    | number      | the amount of coins received by `my_address` after transaction will be broadcasted, might be above zero for UTXO coins when MM2 has to send the change to `my_address` |
| spent_by_me       | number      | the amount of coins spent by `my_address`, might differ from request amount as transaction fee is added to this |
| total_amount      | number      | total amount of coins transferred |
| fee_details | object    | the fee details of the generated transaction; this value differs for utxo and ETH/ERC20 coins, check the examples for more details |
| tx_hash   | string    | hash of generated transaction |
| tx_hex    | string    | transaction bytes in hexadecimal format; use this value as input for the `send_raw_transaction` method |

#### :pushpin: Examples:

Command (BTC, KMD, and other BTC-based forks):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"KMD\",\"to\":\"RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh\",\"amount\":10,\"userpass\":\"$userpass\"}"
```

Response (success):

```json
{
    "block_height": 0,
    "coin": "ETOMIC",
    "fee_details": {
        "amount": 1e-05
    },
    "from": [
        "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
    ],
    "my_balance_change": -10.00001,
    "received_by_me": 0.34417325,
    "spent_by_me": 10.34418325,
    "to": [
        "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh"
    ],
    "total_amount": 10.34418325,
    "tx_hash": "3a1c382c50a7d12e4675d12ed7e723ce9f0167693dd75fd772bae8524810e605",
    "tx_hex": "0400008085202f890207a8e96978acfb8f0d002c3e4390142810dc6568b48f8cd6d8c71866ad8743c5010000006a47304402201960a7089f2d93480fff68ce0b7ca7bb7a32a52915753ac7ae780abd6162cb1d02202c9b11d442e5f72a532f44ceb10122898d486b1474a10eb981c60c5538b9c82d012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff97f56bf3b0f815bb737b7867e71ddb8198bba3574bb75737ba9c389a4d08edc6000000006a473044022055199d80bd7e2d1b932e54f097c6a15fc4b148d21299dc50067c1da18045f0ed02201d26d85333df65e6daab40a07a0e8a671af9d9b9d92fdf7d7ef97bd868ca545a012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200ca9a3b000000001976a91464ae8510aac9546d5e7704e31ce177451386455588acad2a0d02000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000"
}
```

Command (ETH, ERC20, and other ETH-based forks):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"ETH\",\"to\":\"0xbab36286672fbdc7b250804bf6d14be0df69fa28\",\"amount\":10,\"userpass\":\"$userpass\"}"
```

Response (success):

```json
{
    "block_height": 0,
    "coin": "ETH",
    "fee_details": {
        "coin": "ETH",
        "gas": 21000,
        "gas_price": 1e-09,
        "total_fee": 2.1e-05
    },
    "from": [
        "0xbab36286672fbdc7b250804bf6d14be0df69fa29"
    ],
    "my_balance_change": -10.000021,
    "received_by_me": 0.0,
    "spent_by_me": 10.000021,
    "to": [
        "0xbab36286672fbdc7b250804bf6d14be0df69fa28"
    ],
    "total_amount": 10.000021,
    "tx_hash": "8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
    "tx_hex": "f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
}
```

## send_raw_transaction

**send_raw_transaction coin tx_hex**

The `send_raw_transaction` method broadcasts the transaction to the network of selected coin.  

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin network on which to broadcast the transaction |
| tx_hex    | string | the transaction bytes in hexadecimal format; this is typically generated by the `withdraw` method |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| tx_hash   | string   | the hash of the broadcasted transaction |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"send_raw_transaction\",\"coin\":\"KMD\",\"tx_hex\":\"0400008085202f8902d6a5b976db5e5c9e8f9ead50713b25f22cd061edc8ff0ff1049fd2cd775ba087000000006b483045022100bf2073c1ecfef3fc78f272045f46a722591401f61c2d2fac87fc474a17df7c3102200ca1bd0664ba75f3383e5cbbe96127ad534a86238dbea256e000b0fe2067ab8c012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffd04d4e07ac5dacd08fb76e08d2a435fc4fe2b16eb0158695c820b44f42f044cb010000006a47304402200a0c21e8c0ae4a740f3663fe08aeff02cea6495157d531045b58d2dd79fb802702202f80dddd264db33f55e49799363997a175d39a91242a95f268c40f7ced97030b012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788acc3b3ca27000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000\",\"userpass\":\"$userpass\"}"
```

Response (success):

```json
{
    "tx_hash":"0b024ea6997e16387c0931de9f203d534c6b2b8500e4bda2df51a36b52a3ef33",
}
```

## my_swap_status

**uuid**

The `my_swap_status` method returns the data of atomic swap that was done by MM2 node.  

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| params uuid | string | the uuid of swap, typically received from buy/sell call |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| events         | array of objects | events happened during the swap |
| success_events | array of strings | list of events that considered as `success` swap state, they are also listed in order which they should occur in `events` array |
| error_events   | array of strings | list of events that considered as `error` swap state, if at least 1 of the event happens swap is considered as failed  |
| type           | string           | whether the node acted as market `Maker` or `Taker` |
| uuid           | string           | swap uuid |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"my_swap_status\",\"params\":{\"uuid\":\"fb5b23301f71a2d7262534e125915fc0dd088fc7d7919cb459aebee759db593d\"},\"userpass\":\"$userpass\"}"
```

Response (success):

```json
{
    "result": {
        "error_events": [
            "StartFailed",
            "NegotiateFailed",
            "TakerFeeSendFailed",
            "MakerPaymentValidateFailed",
            "TakerPaymentTransactionFailed",
            "TakerPaymentDataSendFailed",
            "TakerPaymentWaitForSpendFailed",
            "MakerPaymentSpendFailed",
            "TakerPaymentRefunded",
            "TakerPaymentRefundFailed"
        ],
        "events": [
            {
                "event": {
                    "data": {
                        "lock_duration": 7800,
                        "maker": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
                        "maker_amount": 10000000,
                        "maker_coin": "BEER",
                        "maker_payment_confirmations": 1,
                        "maker_payment_wait": 1556029536,
                        "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
                        "started_at": 1556026936,
                        "taker_amount": 10000000,
                        "taker_coin": "ETOMIC",
                        "taker_payment_confirmations": 1,
                        "taker_payment_lock": 1556034736,
                        "uuid": "37779e94a72b0016bdc0c9d6a082f422e92005b5a627b7620980351f22b7dbbf"
                    },
                    "type": "Started"
                },
                "timestamp": 1556026936463
            },
            {
                "event": {
                    "data": [
                        1556042535,
                        "02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640",
                        "bcb61bb141fbbc589f7401569a65043c7cfe14c0"
                    ],
                    "type": "Negotiated"
                },
                "timestamp": 1556026997174
            },
            {
                "event": {
                    "data": {
                        "block_height": 0,
                        "coin": "ETOMIC",
                        "fee_details": {
                            "amount": 1e-05
                        },
                        "from": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                        ],
                        "my_balance_change": -0.0001387,
                        "received_by_me": 0.04359845,
                        "spent_by_me": 0.04373715,
                        "to": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
                            "RThtXup6Zo7LZAi8kRWgjAyi1s4u6U9Cpf"
                        ],
                        "total_amount": 0.04373715,
                        "tx_hash": "4b6355e3e89ecf11902c72427366a633156c35db3f597a1a9e8b853e434c3c35",
                        "tx_hex": "0400008085202f890103ef1c6dec7372fd82c76a84c5d9d13166e22d2eeae6b7f27dcd521e877c87d8010000006b483045022100cbae5fe8d0c81613ba46d3621822dd2f49a8dc75e7a04e51f88fd2754c4a3e74022023a4d18863e35af5dbc47041bb72fb0215e0060f25c1078a075b97d0c2d8e604012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88aca5864200000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000"
                    },
                    "type": "TakerFeeSent"
                },
                "timestamp": 1556027001616
            },
            {
                "event": {
                    "data": {
                        "block_height": 106521,
                        "coin": "BEER",
                        "fee_details": {
                            "amount": 1e-05
                        },
                        "from": [
                            "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh"
                        ],
                        "my_balance_change": 0.0,
                        "received_by_me": 0.0,
                        "spent_by_me": 0.0,
                        "to": [
                            "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh",
                            "bWB6X1zjTuY5VdzLsrvAvF9y6QizLZvR5F"
                        ],
                        "total_amount": 9855.70532509,
                        "tx_hash": "e224e28bea9bf47d4003f5fae4b591a6895a44c83c1f9992f040b6d652532f94",
                        "tx_hex": "0400008085202f890143f27f20d8964200117483beabf1379f8e0db598b5a92c31769bbfa2059d4299010000006b483045022100df8da3cfe4179c3ab23279ce75095eb794d08d19d3a723461ca5f7c4a8a8ffa302205e60a2273e8abf6fab5f52e99c097d1f01a536a3a517d198d154789376db24b6012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff02809698000000000017a914bf5c7571a0c472b6b4c8cd508fb684891d34aa93873542fc77e50000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac00000000000000000000000000000000000000"
                    },
                    "type": "MakerPaymentReceived"
                },
                "timestamp": 1556027046718
            },
            {
                "event": {
                    "type": "MakerPaymentWaitConfirmStarted"
                },
                "timestamp": 1556027046718
            },
            {
                "event": {
                    "type": "MakerPaymentValidatedAndConfirmed"
                },
                "timestamp": 1556027047611
            },
            {
                "event": {
                    "data": {
                        "block_height": 0,
                        "coin": "ETOMIC",
                        "fee_details": {
                            "amount": 1e-05
                        },
                        "from": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                        ],
                        "my_balance_change": -0.10001,
                        "received_by_me": 9.94358845,
                        "spent_by_me": 10.04359845,
                        "to": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
                            "bJPg8HUb2kGsyydxvUXQKzQmBjkA8asPRZ"
                        ],
                        "total_amount": 10.04359845,
                        "tx_hash": "aba40df8c5fe5156f7941edbd5073fb87a7f72c69a5c607d347394f83e2eaafe",
                        "tx_hex": "0400008085202f8902353c4c433e858b9e1a7a593fdb356c1533a6667342722c9011cf9ee8e355634b010000006b483045022100e5e04fb81890f0aeef098682dcb261458eef2fc71067f78e6057440bbd9559990220758f33400ced63e56e234d89a08a634ae1ddf340c49548e8f389dc2ac03668d9012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff97f56bf3b0f815bb737b7867e71ddb8198bba3574bb75737ba9c389a4d08edc6000000006b483045022100c3ff993183cdb3e79fb9d9226c3dc124b616df3b0a1c5da8ca6c6cc4092f0c8802201fe34e6dd901d9eedb1764acb2cb6fe8cb9d9e7b9a9826141587b9928b227ad4012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff02809698000000000017a9143e1bfed8566a153b6dd0bda73ff886f0c4c57515873db6443b000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000"
                    },
                    "type": "TakerPaymentSent"
                },
                "timestamp": 1556027052624
            },
            {
                "event": {
                    "data": [
                        {
                            "block_height": 0,
                            "coin": "ETOMIC",
                            "fee_details": {
                                "amount": 1e-05
                            },
                            "from": [
                                "bJPg8HUb2kGsyydxvUXQKzQmBjkA8asPRZ"
                            ],
                            "my_balance_change": 0.0,
                            "received_by_me": 0.0,
                            "spent_by_me": 0.0,
                            "to": [
                                "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh"
                            ],
                            "total_amount": 0.1,
                            "tx_hash": "ef760cd7c273c17d78d84835f28fecda8a5f948c1cab4d7b2853028bd864f17a",
                            "tx_hex": "0400008085202f8901feaa2e3ef89473347d605c9ac6727f7ab83f07d5db1e94f75651fec5f80da4ab00000000d747304402207d6e0aa2ba23ae08fe8ab42bea293563d394b2f073e1f8287bf3820efaf612d20220230b75cb9721d4017393d689695439f836ae4dd70a8428a4983c5838cd82e3180120a884df81826a847f07d18c83bb15c3319284f6255ff1622f431e9eb23acc255c004c6b6304b034bf5cb1752102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac6782012088a914bcb61bb141fbbc589f7401569a65043c7cfe14c0882102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac68ffffffff0198929800000000001976a91464ae8510aac9546d5e7704e31ce177451386455588acc316bf5c000000000000000000000000000000"
                        },
                        "a884df81826a847f07d18c83bb15c3319284f6255ff1622f431e9eb23acc255c"
                    ],
                    "type": "TakerPaymentSpent"
                },
                "timestamp": 1556027086229
            },
            {
                "event": {
                    "data": {
                        "block_height": 0,
                        "coin": "BEER",
                        "fee_details": {
                            "amount": 1e-05
                        },
                        "from": [
                            "bWB6X1zjTuY5VdzLsrvAvF9y6QizLZvR5F"
                        ],
                        "my_balance_change": 0.09999,
                        "received_by_me": 0.09999,
                        "spent_by_me": 0.0,
                        "to": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                        ],
                        "total_amount": 0.1,
                        "tx_hash": "9e611de0f9e2c8ea81553246e789d4dbc82a9a0cb1a910ca3e3d4395e6ae9b4d",
                        "tx_hex": "0400008085202f8901942f5352d6b640f092991f3cc8445a89a691b5e4faf503407df49bea8be224e200000000d8483045022100a83ed304d2793e1927adc0b1e8c5cd7ffc66e3f1a5f7ac1f31cd3de254e814ca02207ec2aeb9dd8749938a3036ebb236f582e7acdc29bda07bfb1c8ccab9a48a8b4f0120a884df81826a847f07d18c83bb15c3319284f6255ff1622f431e9eb23acc255c004c6b63042753bf5cb1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a914bcb61bb141fbbc589f7401569a65043c7cfe14c0882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0198929800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788acce16bf5c000000000000000000000000000000"
                    },
                    "type": "MakerPaymentSpent"
                },
                "timestamp": 1556027089482
            },
            {
                "event": {
                    "type": "Finished"
                },
                "timestamp": 1556027089484
            }
        ],
        "success_events": [
            "Started",
            "Negotiated",
            "TakerFeeSent",
            "MakerPaymentReceived",
            "MakerPaymentWaitConfirmStarted",
            "MakerPaymentValidatedAndConfirmed",
            "TakerPaymentSent",
            "TakerPaymentSpent",
            "MakerPaymentSpent",
            "Finished"
        ],
        "type": "Taker",
        "uuid": "37779e94a72b0016bdc0c9d6a082f422e92005b5a627b7620980351f22b7dbbf"
    }
}
```

Response (error)

```json
{
    "error": "swap data is not found"
}
```

## my_recent_swaps

**(from_uuid limit=10)**

The `my_recent_swaps` method returns the data of the most recent atomic swaps that was done by MM2 node.  

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| limit     | number   | limits the number of returned swaps |
| from_uuid | string   | MM2 will skip records until this uuid (skipping the `from_uuid` too) |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| swaps     | array of objects | swaps data, each record has format of `my_swap_status` response |
| from_uuid | string           | from_uuid that was set in request (null if it was not set) |
| skipped   | number           | the number of skipped records (the position of `from_uuid` in list + 1, 0 if `from_uuid` was not set) | 
| limit     | number           | the limit that was set in request, note that actual number of swaps can differ from specified limit (e.g. on last page) |
| total     | number           | total number of swaps available |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_recent_swaps\",\"from_uuid\":\"e299c6ece7a7ddc42444eda64d46b163eaa992da65ce6de24eb812d715184e4c\",\"limit\":1}"
```

Response (success):

```json
{
    "result": {
        "from_uuid": "e299c6ece7a7ddc42444eda64d46b163eaa992da65ce6de24eb812d715184e4c",
        "limit": 1,
        "skipped": 1,
        "swaps": [
            {
                "error_events": [
                    "StartFailed",
                    "NegotiateFailed",
                    "TakerFeeSendFailed",
                    "MakerPaymentValidateFailed",
                    "TakerPaymentTransactionFailed",
                    "TakerPaymentDataSendFailed",
                    "TakerPaymentWaitForSpendFailed",
                    "MakerPaymentSpendFailed",
                    "TakerPaymentRefunded",
                    "TakerPaymentRefundFailed"
                ],
                "events": [
                    {
                        "event": {
                            "data": {
                                "lock_duration": 7800,
                                "maker": "2de6021ebcc1c8e4df14213514c16864ae78f2fa2d8322e7187320132d86f25d",
                                "maker_amount": 20000000,
                                "maker_coin": "RICK",
                                "maker_payment_confirmations": 1,
                                "maker_payment_wait": 1554982829,
                                "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
                                "started_at": 1554980229,
                                "taker_amount": 10000000,
                                "taker_coin": "MORTY",
                                "taker_payment_confirmations": 1,
                                "taker_payment_lock": 1554988029,
                                "uuid": "f413fbcc111974abbbb8f0340023c7ce85d408d6a642ba3752da34e06ebf000a"
                            },
                            "type": "Started"
                        },
                        "timestamp": 1554980229973
                    },
                    {
                        "event": {
                            "data": [
                                1554995829,
                                "039727ffa665389a4fed0a2b75687d1a7ad23a430f0aa06dfbf9edb9b972da7808",
                                "736819faee9d04ea3da5eebb88f474c8d354e9e7"
                            ],
                            "type": "Negotiated"
                        },
                        "timestamp": 1554980290452
                    },
                    {
                        "event": {
                            "data": "lp_swap:1153] utxo:407] jsonrpc_client:66] Rpc request JsonRpcRequest { jsonrpc: \"2.0\", id: \"8\", method: \"blockchain.transaction.broadcast\", params: [String(\"01000000012828a368f6ff9fe8b764602a2b60302ef5e766b4375a5ab517acd8bfdda81388000000006a4730440220641ccdd842691ecb23fbc442a65332c6a5d0d443b25ea3dae958a915891d7f3102203db40e562cd4fd0a917b59429c8ee11a704fcfc934792cfa8ab3acc89eec1a7e012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88acd2939a3b000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000\")] } failed with error, response: JsonRpcResponse { jsonrpc: \"2.0\", id: \"8\", result: Null, error: Object({\"code\": Number(1), \"message\": String(\"the transaction was rejected by network rules.\\n\\n16: tx-overwinter-active\\n[01000000012828a368f6ff9fe8b764602a2b60302ef5e766b4375a5ab517acd8bfdda81388000000006a4730440220641ccdd842691ecb23fbc442a65332c6a5d0d443b25ea3dae958a915891d7f3102203db40e562cd4fd0a917b59429c8ee11a704fcfc934792cfa8ab3acc89eec1a7e012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88acd2939a3b000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000]\")}) }",
                            "type": "TakerFeeSendFailed"
                        },
                        "timestamp": 1554980290854
                    },
                    {
                        "event": {
                            "type": "Finished"
                        },
                        "timestamp": 1554980290854
                    }
                ],
                "success_events": [
                    "Started",
                    "Negotiated",
                    "TakerFeeSent",
                    "MakerPaymentReceived",
                    "MakerPaymentWaitConfirmStarted",
                    "MakerPaymentValidatedAndConfirmed",
                    "TakerPaymentSent",
                    "TakerPaymentSpent",
                    "MakerPaymentSpent",
                    "Finished"
                ],
                "type": "Taker",
                "uuid": "f413fbcc111974abbbb8f0340023c7ce85d408d6a642ba3752da34e06ebf000a"
            }
        ],
        "total": 97
    }
}
```

Response (error)

```json
{
    "error": "lp_swap:1454] from_uuid e299c6ece7a7ddc42444eda64d46b163eaa992da65ce6de24eb812d715184e41 swap is not found"
}
```

## my_tx_history

**(from_tx_hash limit=10)**

The `my_tx_history` method returns the blockchain transactions involving MM2 coin address.  

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string   | the name of the coin to get the history |
| limit     | number   | limits the number of returned transactions |
| from_tx_hash | string   | MM2 will skip records until this hash (skipping the `from_tx_hash` too) |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| transactions | array of objects | transactions data |
| from_tx_hash | string           | from_tx_hash that was set in request (null if it was not set) |
| skipped   | number           | the number of skipped records (the position of `from_tx_hash` in list + 1, 0 if `from_tx_hash` was not set) | 
| limit     | number           | the limit that was set in request, note that actual number of transactions can differ from specified limit (e.g. on last page) |
| total     | number           | total number of transactions available |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_tx_history\",\"coin\":\"RICK\",\"limit\":1,\"from_tx_hash\":\"1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1\"}"
```

Response (success):

```json
{
    "result": {
        "from_tx_hash": "1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1",
        "limit": 1,
        "skipped": 1,
        "total": 13,
        "transactions": [
            {
                "block_height": 41459,
                "coin": "RICK",
                "confirmations": 10235,
                "fee_details": {
                    "amount": 1e-05
                },
                "from": [
                    "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                ],
                "my_balance_change": -1e-05,
                "received_by_me": 0.998363,
                "spent_by_me": 0.998373,
                "to": [
                    "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                ],
                "total_amount": 0.998373,
                "tx_hash": "7a9b407125ac245336dfed04084c5624dbc1c8851108364d5c6a5fae7fcf930f",
                "tx_hex": "0400008085202f8902fd429d8dd29167c2f0e27760c0947a99be008c657d86836e1bb12f66918ef184000000006b483045022100ffc926e5ccd495dbde6b4882acc4b15ccb55f945401f2705ad735d4f9025938902201c399c1ad7fa21db2dbefe6d271f611337df0df3fe046fb8b49c64a25b08f171012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3fffffffffd429d8dd29167c2f0e27760c0947a99be008c657d86836e1bb12f66918ef184010000006a473044022079cb728081017df7a501635968fcd145bbe23d7039f20578245c38b0bb11674b022042e295a56a88535fae2eedc2fdfa1a5a80ea60023e3c7a6bbe39563f360c3d34012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0280969800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac0ccb5a05000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000"
            }
        ]
    }
}
```

Response (error)

```json
{
    "error": "lp_coins:1011] from_tx_hash 1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e2 is not found"
}
```
