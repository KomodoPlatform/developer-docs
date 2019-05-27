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
| base       | string | base currency of a pair |
| rel       | string | "related" currency, also can be called "quote currency" according to exchange terms |
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

**buy base rel price volume**

The `buy` method issues a buy request and attempts to match an order from the orderbook based on the provided arguments.

::: tip
Buy and sell methods always create the `taker` order first. It means that you will require to pay additional 1/777 fee 
of the trade amount during the swap for taking the liquidity from market. If your order is not matched in 5 seconds it's 
automatically converted to maker and stays in orderbook until it's matched or cancelled. 
To always act as maker please use [setprice method](../atomic-swap-dex/dex-api.html#setprice)
:::

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base      | string | the name of the coin the user desires to receive |
| rel       | string | the name of the coin the user desires to sell |
| price     | number | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| volume    | number | the amount of coins the user is willing to receive of the `base` coin |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| result        | object | resulting order object |
| result.action | string | the action of request (`Buy`) |
| result.base   | string | base currency of request |
| result.base_amount | string | the resulting amount of base currency that will be received if order matches |
| result.rel    | string | rel currency of request |
| result.rel_amount | string | the maximum amount of `rel` coin that will be spent to buy the `base_amount` (according to `price`) |
| result.method | string | this field used for internal P2P interactions, always equals to "request" |
| result.dest_pub_key    | string | reserved for future use, `dest_pub_key` will allow to choose the P2P node that will be eligible to match with our request. Defaults to zero pubkey which means `anyone` |
| result.sender_pubkey   | string | the public key of our node |
| result.uuid   | string | the request uuid |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HELLO\",\"rel\":\"WORLD\",\"volume\":1,\"price\":1}"
```

Response (success):

```json
{
    "result": {
        "action": "Buy",
        "base": "HELLO",
        "base_amount": "1",
        "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
        "method": "request",
        "rel": "WORLD",
        "rel_amount": "1",
        "sender_pubkey": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
        "uuid": "288743e2-92a5-471e-92d5-bb828a2303c3"
    }
}
```

Response (error):

```json
{"error":"rpc:278] utxo:884] REL balance 12.88892991 is too low, required 21.15"}
```

## sell

**sell base rel price volume**

The `sell` method issues a sell request and attempts to match an order from the orderbook based on the provided arguments.

::: tip
Buy and sell methods always create the `taker` order first. It means that you will require to pay additional 1/777 fee 
of the trade amount during the swap for taking the liquidity from market. If your order is not matched in 5 seconds it's 
automatically converted to maker and stays in orderbook until it's matched or cancelled. 
To always act as maker please use [setprice method](../atomic-swap-dex/dex-api.html#setprice)
:::

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base      | string | the name of the coin the user desires to sell |
| rel       | string | the name of the coin the user desires to receive |
| price     | number | the price in `rel` the user is willing to receive per one unit of the `base` coin |
| volume    | number | the amount of coins the user is willing to sell of the `base` coin |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| result        | object | resulting order object |
| result.action | string | the action of request (`Sell`) |
| result.base   | string | base currency of request |
| result.base_amount | string | the resulting amount of base currency that will be sold if order matches |
| result.rel    | string | rel currency of request |
| result.rel_amount | string | the minimum amount of `rel` coin that will be received to sell the `base_amount` of `base` (according to `price`) |
| result.method | string | this field used for internal P2P interactions, always equals to "request" |
| result.dest_pub_key    | string | reserved for future use, `dest_pub_key` will allow to choose the P2P node that will be eligible to match with our request. Defaults to zero pubkey which means `anyone` |
| result.sender_pubkey   | string | the public key of our node |
| result.uuid   | string | the request uuid |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":1,\"price\":1}"
```

Response (success):

```json
{
    "result": {
        "action": "Sell",
        "base": "BASE",
        "base_amount": "1",
        "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
        "method": "request",
        "rel": "REL",
        "rel_amount": "1",
        "sender_pubkey": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
        "uuid": "d14452bb-e82d-44a0-86b0-10d4cdcb8b24"
    }
}
```

Response (error):

```json
{"error":"rpc:278] utxo:884] BASE balance 12.88892991 is too low, required 21.15"}
```

## setprice

**setprice base rel price volume**

::: warning Note
This API method's documentation is currently limited, as we are still testing.
:::

The `setprice` method places an order on the orderbook, and it relies on this node acting as a `maker` -- also called a `Bob` node. 
`setprice` order is always considered as `sell` for internal implementation convenience.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base      | string | the name of the coin the user desires to sell |
| rel       | string | the name of the coin the user desires to receive |
| price     | number | the price in `rel` the user is willing to receive per one unit of the `base` coin |
| volume    | number | the maximum amount of `base` coin available for the order |

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

**withdraw coin to (amount, max)**

The `withdraw` method generates, signs, and returns a transaction that transfers the `amount` of `coin` to the address indicated in the `to` argument.  

This method generates a raw transaction which should then be broadcast using [send_raw_transaction](../atomic-swap-dex/dex-api.html#send-raw-transaction).

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string | the name of the coin the user desires to withdraw |
| to        | string | coins will be withdrawn to this address |
| amount    | number | the amount the user desires to withdraw, ignored when `max=true` |
| max       | bool   | withdraw the maximum available amount |

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

Command (max = true):

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"ETH\",\"to\":\"0xbab36286672fbdc7b250804bf6d14be0df69fa28\",\"max\":true,\"userpass\":\"$userpass\"}"
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
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"my_swap_status\",\"params\":{\"uuid\":\"d14452bb-e82d-44a0-86b0-10d4cdcb8b24\"},\"userpass\":\"$userpass\"}"
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
                        "maker_amount": "1",
                        "maker_coin": "BEER",
                        "maker_payment_confirmations": 1,
                        "maker_payment_wait": 1558960071,
                        "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
                        "started_at": 1558957471,
                        "taker_amount": "1",
                        "taker_coin": "ETOMIC",
                        "taker_payment_confirmations": 1,
                        "taker_payment_lock": 1558965271,
                        "uuid": "d14452bb-e82d-44a0-86b0-10d4cdcb8b24"
                    },
                    "type": "Started"
                },
                "timestamp": 1558957471266
            },
            {
                "event": {
                    "data": {
                        "maker_payment_locktime": 1558973070,
                        "maker_pubkey": "02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640",
                        "secret_hash": "5c6ed3232cabfd05072dd2c9f9061e379e09c5ac"
                    },
                    "type": "Negotiated"
                },
                "timestamp": 1558957532139
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
                        "internal_id": "acc4b3daf3c280b6b1be3c42a1795b07d60f3b9065e85e134f692a4e46d8cab3",
                        "my_balance_change": -0.001297,
                        "received_by_me": 5.76129422,
                        "spent_by_me": 5.76259122,
                        "timestamp": 0,
                        "to": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
                            "RThtXup6Zo7LZAi8kRWgjAyi1s4u6U9Cpf"
                        ],
                        "total_amount": 5.76259122,
                        "tx_hash": "acc4b3daf3c280b6b1be3c42a1795b07d60f3b9065e85e134f692a4e46d8cab3",
                        "tx_hex": "0400008085202f8901a4cc32a7fb6abdf0919b090f888fbcb49a0763756d5d0b877249c17f481e4a3b010000006a47304402207aa35a94b4bc6c72bf46ff37051e301bcc86001898226ac6cf5507d2e580d6f902206b41bd7a31260118597e4e17da93e7da5d6f83702ab212ff3220a7121fd93313012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac8e095722000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788acdccdeb5c000000000000000000000000000000"
                    },
                    "type": "TakerFeeSent"
                },
                "timestamp": 1558957536556
            },
            {
                "event": {
                    "data": {
                        "block_height": 144587,
                        "coin": "BEER",
                        "fee_details": {
                            "amount": 1e-05
                        },
                        "from": [
                            "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh"
                        ],
                        "internal_id": "3fddd8e65d6364f98d9c8b25a0c511fa041ce2fb781cccee4d787a383d8edc2d",
                        "my_balance_change": 0.0,
                        "received_by_me": 0.0,
                        "spent_by_me": 0.0,
                        "timestamp": 1558957575,
                        "to": [
                            "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh",
                            "bSNAPE147JxseW66zSMRKjss9XZCG9wchq"
                        ],
                        "total_amount": 8480.19169389,
                        "tx_hash": "3fddd8e65d6364f98d9c8b25a0c511fa041ce2fb781cccee4d787a383d8edc2d",
                        "tx_hex": "0400008085202f8901d0d6df13d5a875c9458f63743ab778800e397a65a01dac3360b84b87a5c5dab3010000006b4830450221009380fa57812ce60c1d912abfde310e9f7756c15805e3512d0614933b745210e0022010f4998410cb8b0c7f83b062bbbf249784f9a4bb065ff5dfe1eb4ac8172082a7012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0200e1f5050000000017a9149593c211a25149bd67916af3aa27bad63f7ba6ef8785bbeb6bc50000001976a91464ae8510aac9546d5e7704e31ce177451386455588acfacdeb5c000000000000000000000000000000"
                    },
                    "type": "MakerPaymentReceived"
                },
                "timestamp": 1558957588084
            },
            {
                "event": {
                    "type": "MakerPaymentWaitConfirmStarted"
                },
                "timestamp": 1558957588085
            },
            {
                "event": {
                    "type": "MakerPaymentValidatedAndConfirmed"
                },
                "timestamp": 1558957588883
            },
            {
                "event": {
                    "data": {
                        "block_height": 146176,
                        "coin": "ETOMIC",
                        "fee_details": {
                            "amount": 1e-05
                        },
                        "from": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                        ],
                        "internal_id": "cdf2d5c271ee144f77ae4da1f25f0b05377f51e8a3ab30bd10c0838d4797fd79",
                        "my_balance_change": -1.00001,
                        "received_by_me": 4.76128422,
                        "spent_by_me": 5.76129422,
                        "timestamp": 1558957590,
                        "to": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
                            "bc1y3ghXrpd8fJR7VWjN4w44gsAH8mughL"
                        ],
                        "total_amount": 5.76129422,
                        "tx_hash": "cdf2d5c271ee144f77ae4da1f25f0b05377f51e8a3ab30bd10c0838d4797fd79",
                        "tx_hex": "0400008085202f8901b3cad8464e2a694f135ee865903b0fd6075b79a1423cbeb1b680c2f3dab3c4ac010000006b483045022100ffa2559a3bf918d2b77cc8095bd74d80a92f81b910b291f6e2dcde13878ee20d02203a5d8320c9125c102ccdf6dfc725b19eddcfa985668d8bbea8cf67073821be49012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f5050000000017a914ff733badf8c51b974856c00153bbc94fc91cfae487a624611c000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac15ceeb5c000000000000000000000000000000"
                    },
                    "type": "TakerPaymentSent"
                },
                "timestamp": 1558957596570
            },
            {
                "event": {
                    "data": {
                        "secret": "aeb31b60b8128174d336e2e96d8f414f2edb658b3f5ba601d147479ea44f249f",
                        "transaction": {
                            "block_height": 0,
                            "coin": "ETOMIC",
                            "fee_details": {
                                "amount": 1e-05
                            },
                            "from": [
                                "bc1y3ghXrpd8fJR7VWjN4w44gsAH8mughL"
                            ],
                            "internal_id": "c098456b6c4ff20b53f5e2abacc0d59ab3a274c623688be18b69811a956b0cc3",
                            "my_balance_change": 0.0,
                            "received_by_me": 0.0,
                            "spent_by_me": 0.0,
                            "timestamp": 0,
                            "to": [
                                "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh"
                            ],
                            "total_amount": 1.0,
                            "tx_hash": "c098456b6c4ff20b53f5e2abacc0d59ab3a274c623688be18b69811a956b0cc3",
                            "tx_hex": "0400008085202f890179fd97478d83c010bd30aba3e8517f37050b5ff2a14dae774f14ee71c2d5f2cd00000000d747304402207f70ebc967a83cad8cf87f82c3ec43b2c9dd767fe61733621943802065cb631d0220174ca834423cd8a91b1c71f1ce5ba7bc14b2b89a3c79bf63df2d28fc5c5363a30120aeb31b60b8128174d336e2e96d8f414f2edb658b3f5ba601d147479ea44f249f004c6b630417eceb5cb1752102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac6782012088a9145c6ed3232cabfd05072dd2c9f9061e379e09c5ac882102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac68ffffffff0118ddf505000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac2eceeb5c000000000000000000000000000000"
                        }
                    },
                    "type": "TakerPaymentSpent"
                },
                "timestamp": 1558957630487
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
                            "bSNAPE147JxseW66zSMRKjss9XZCG9wchq"
                        ],
                        "internal_id": "a2d29b87ce185cadc70af03e742f83d9ce3866874be613d839090a69a8b9f3d3",
                        "my_balance_change": 0.99999,
                        "received_by_me": 0.99999,
                        "spent_by_me": 0.0,
                        "timestamp": 0,
                        "to": [
                            "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                        ],
                        "total_amount": 1.0,
                        "tx_hash": "a2d29b87ce185cadc70af03e742f83d9ce3866874be613d839090a69a8b9f3d3",
                        "tx_hex": "0400008085202f89012ddc8e3d387a784deecc1c78fbe21c04fa11c5a0258b9c8df964635de6d8dd3f00000000d747304402203edc6a5cf20a9627a4d0b035ad50e3198aaf7ba60323fb9b4b575df7ed029cdd0220016f67c1aa6bf779e7e700389e9eac9e44b10d0b6b1b46a51d86e0fb354b1d580120aeb31b60b8128174d336e2e96d8f414f2edb658b3f5ba601d147479ea44f249f004c6b63048e0aec5cb1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a9145c6ed3232cabfd05072dd2c9f9061e379e09c5ac882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0118ddf505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac3eceeb5c000000000000000000000000000000"
                    },
                    "type": "MakerPaymentSpent"
                },
                "timestamp": 1558957633573
            },
            {
                "event": {
                    "type": "Finished"
                },
                "timestamp": 1558957633575
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
        "uuid": "d14452bb-e82d-44a0-86b0-10d4cdcb8b24"
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
                        "maker_payment_wait": 1556035832,
                        "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
                        "started_at": 1556033232,
                        "taker_amount": 10000000,
                        "taker_coin": "ETOMIC",
                        "taker_payment_confirmations": 1,
                        "taker_payment_lock": 1556041032,
                        "uuid": "18acc6efad19b38b500ecb05baaaee4ed8b6f45a101857a7bcfd087dbb25b58f"
                    },
                    "type": "Started"
                },
                "timestamp": 1556033232367
            },
            {
                "event": {
                    "data": {
                        "maker_payment_locktime": 1556048831,
                        "maker_pubkey": "02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640",
                        "secret_hash": "2895bc9221159b947871c97454b648633c19e67d"
                    },
                    "type": "Negotiated"
                },
                "timestamp": 1556033293210
            },
            {
                "event": {
                    "data": {
                        "error": "lp_swap:1194] utxo:440] jsonrpc_client:66] Rpc request JsonRpcRequest { jsonrpc: \"2.0\", id: \"8\", method: \"blockchain.transaction.broadcast\", params: [String(\"0100000001a0fef63a75e2bce7e36b3757fef6e5ae62e2f0a982d90baae0570deab51bfc47010000006b483045022100aab33642a0c9db3bdc1659d7739900e22ad5b8aff02d187f53b2ec5b3b7a48c2022039097301d0b4d6254703aeb9395c8bf4bff8e6efdcbf8b5a25929543f8a74d1c012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac216d4838000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000\")] } failed with error, response: JsonRpcResponse { jsonrpc: \"2.0\", id: \"8\", result: Null, error: Object({\"code\": Number(1), \"message\": String(\"the transaction was rejected by network rules.\\n\\n16: tx-overwinter-active\\n[0100000001a0fef63a75e2bce7e36b3757fef6e5ae62e2f0a982d90baae0570deab51bfc47010000006b483045022100aab33642a0c9db3bdc1659d7739900e22ad5b8aff02d187f53b2ec5b3b7a48c2022039097301d0b4d6254703aeb9395c8bf4bff8e6efdcbf8b5a25929543f8a74d1c012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0246320000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac216d4838000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000]\")}) }"
                    },
                    "type": "TakerFeeSendFailed"
                },
                "timestamp": 1556033294179
            },
            {
                "event": {
                    "type": "Finished"
                },
                "timestamp": 1556033294180
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
        "uuid": "18acc6efad19b38b500ecb05baaaee4ed8b6f45a101857a7bcfd087dbb25b58f"
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

**(from_id limit=10)**

The `my_tx_history` method returns the blockchain transactions involving MM2 coin address.  

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | string   | the name of the coin to get the history |
| limit     | number   | limits the number of returned transactions |
| from_id   | string   | MM2 will skip records until this ID (skipping the `from_id` too, track the `internal_id` of last displayed transaction to get the value of this field fot next page) |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| transactions | array of objects | transactions data |
| from_id   | string           | from_id specified in request (null if it was not set) |
| skipped   | number           | the number of skipped records (the position of `from_id` in list + 1, 0 if `from_id` was not set) | 
| limit     | number           | the limit that was set in request, note that actual number of transactions can differ from specified limit (e.g. on last page) |
| total     | number           | total number of transactions available |

#### :pushpin: Examples:

Command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_tx_history\",\"coin\":\"RICK\",\"limit\":1,\"from_id\":\"1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1\"}"
```

Response (success):

```json
{
    "result": {
        "from_id": null,
        "limit": 1,
        "skipped": 0,
        "total": 13,
        "transactions": [
            {
                "block_height": 41464,
                "coin": "RICK",
                "confirmations": 18740,
                "fee_details": {
                    "amount": 1e-05
                },
                "from": [
                    "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                ],
                "internal_id": "1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1",
                "my_balance_change": -1e-05,
                "received_by_me": 0.998353,
                "spent_by_me": 0.998363,
                "timestamp": 1555410894,
                "to": [
                    "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
                ],
                "total_amount": 0.998363,
                "tx_hash": "1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1",
                "tx_hex": "0400008085202f89020f93cf7fae5f6a5c4d36081185c8c1db24564c0804eddf365324ac2571409b7a000000006b483045022100f565796fe1d89f5a93d84d2efe4f752b63313e99c5e687fede01ced2f58e20b802207b5a503e45db9ad530572551cf37a558aecaf29c65604e36fe4818cd3120424f012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0f93cf7fae5f6a5c4d36081185c8c1db24564c0804eddf365324ac2571409b7a010000006a473044022061c43c63c0dbf0eb50344e62708235d2807ddc89909bae518afa355f9d69d30302205135d6546dd08fbba592583276fc1189c16472dd11395acc3b568f8193a1f890012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0280969800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac24c75a05000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000"
            }
        ]
    }
}
```

Response (error)

```json
{
    "error": "lp_coins:1011] from_id 1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e2 is not found"
}
```
