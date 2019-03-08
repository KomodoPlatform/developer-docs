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

**enable coin**

The `enable` method enables a coin by connecting your MM2 instance to the `coin` blockchain using the `native` coin daemon (e.g. komodod for KMD).

Each coin can be enabled only once, and in either Electrum or Native mode. It is not possible to use both modes at once.  

For utxo-based coins the daemon of this blockchain must also be running on the user's machine for `enable` to function.  

ETH/ERC20 coins are also enabled by the `enable` method, but a local installation of an ETH node is not required.  

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin the user desires to enable |
| urls      | array of strings (required for ETH/ERC20) | urls of Ethereum RPC nodes to which the user desires to connect |
| swap_contract_address | string (required for ETH/ERC20) | address of etomic swap smart contract |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| address    | string  | the address of the user's `coin` wallet, based on the user's passphrase |
| balance   | number    | the amount of `coin` the user holds in their wallet |
| result    | string    | the result of the request; this will be either `success`, or will indicate an error or failure otherwise |


#### :pushpin: Examples:

Command (For BTC Fork):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\"}"
```

Response:

```bash
{
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 10,
  "result": "success"
}
```

::: tip
- Swap smart contract on ETH mainnet: [0x8500AFc0bc5214728082163326C2FF0C73f4a871](https://etherscan.io/address/0x8500AFc0bc5214728082163326C2FF0C73f4a871) 
Main-net node maintained by MM2 team: <b>http://195.201.0.6:8555</b>  
:::

::: tip
- Swap smart contract on Ropsten testnet: [0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94](https://ropsten.etherscan.io/address/0x7bc1bbdd6a0a722fc9bffc49c921b685ecb84b94) 
Ropsten node maintained by MM2 team: <b>http://195.201.0.6:8545</b> 
:::

::: tip
To use MM2 on other Ethereum networks (such as the Kovan testnet or ETC), deploy the Etomic swap contract code from [this repository.](https://github.com/artemii235/etomic-swap) This requires an ETH node setup, or access to a public service such as [Infura.](https://infura.io/)
:::

Command (For ETH and ERC20 forks):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETH\",\"urls\":[\"http://195.201.0.6:8545\"],\"swap_contract_address\":\"0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94\"}"
```

Response:

```bash
{
  "address": "0x3c7aad7b693e94f13b61d4be4abaeaf802b2e3b5",
  "balance": 50,
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
| tx_hex    | string    | transaction bytes in hexadecimal format; use this value as input for the `send_raw_transaction` method |
| from      | string    | coins will be withdrawn from this address |
| to        | string    | coins with be withdrawn to this address |
| amount    | number    | the amount of coins to be withdrawn |
| fee_details | object    | fee details of the generated transaction; this value differs for utxo and ETH/ERC20 coins, check the examples for more details |


#### :pushpin: Examples:

Command (BTC, KMD, and other BTC-based forks):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"KMD\",\"to\":\"R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW\",\"amount\":10,\"userpass\":\"$userpass\"}"
```

Response (success):

```bash
{
    "tx_hex":"0400008085202f8903d6a5b976db5e5c9e8f9ead50713b25f22cd061edc8ff0ff1049fd2cd775ba087000000006a473044022023b228a198d0845320b91471152727aa192831e37e1e909777660ea81d2cec930220634992c2a37e4439b92cf5b866bccec0f0e343fa2601cc441535faa2cebc2b11012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffd04d4e07ac5dacd08fb76e08d2a435fc4fe2b16eb0158695c820b44f42f044cb010000006b483045022100c4b0bab86626124cb2eba8b0ed76870a75564dba0d4efc347799e5bbf162d48702206b673f63d9505d6d06e9c8e3f52f683a04f1323b5cd527d589ced18697cac83d012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff230946ea9795558bcdecda5e56b3ff823664e2f4627faedb0e6edf2961a1079c010000006a47304402201e8afe0429897cbf2fb45261985d75489cfce41d21034da8eb7962e1d7b8aa8102200273c6d337de43af8b188da303ff622c645b4c2149e62888af2202d1ed362a2f012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200ca9a3b000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac1f9abe2d000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000",
    "from":"R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
    "to":"R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
    "amount":10.0,
    "fee_details":{
        "amount":0.00001
    }
}
```

Command (ETH, ERC20, and other ETH-based forks):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"ETH\",\"to\":\"0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29\",\"amount\":10,\"userpass\":\"$userpass\"}"
```

Response (success):

```bash
{
    "tx_hex":"f86d820a4c843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa29888ac7230489e80000801ca00813afcd3661b62879aa01e1b90f3cbb8c355a318aa3a020c1da21d6b19ea1d6a01492bf4698105f5d81c4ebcce4913cb026a323b9b34b5896a562ea19524728c8",
    "from":"0xbab36286672fbdc7b250804bf6d14be0df69fa29",
    "to":"0xbab36286672fbdc7b250804bf6d14be0df69fa29",
    "amount":10.0,
    "fee_details":{
        "coin":"ETH",
        "gas":21000,
        "gas_price":1e-9,
        "total_fee":0.000021
    }
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

```bash
{
    "tx_hash":"0b024ea6997e16387c0931de9f203d534c6b2b8500e4bda2df51a36b52a3ef33",
}
```
