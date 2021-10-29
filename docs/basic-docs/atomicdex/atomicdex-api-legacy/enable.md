
## enable

**enable coin (urls swap_contract_address mm2 tx_history=false)**

::: warning Important

AtomicDEX software requires the `mm2` parameter to be set for each `coin`; the methods to activate the parameter vary. See below for further information.

:::

The `enable` method enables a coin by connecting the user's software instance to the `coin` blockchain using the `native` coin daemon.

Each `coin` can be enabled only once, and in either Electrum or Native mode. The DEX software does not allow a `coin` to be active in both modes at once.

For utxo-based coins the daemon of this blockchain must also be running on the user's machine for `enable` to function. 

::: tip Note

The AtomicDEX API node's coin address needs to be imported manually into the coin daemon using the [importaddress](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#importaddress) call.

:::

::: tip

To enable QRC20 token using the `enable` method, make sure the Qtum blockchain daemon is configured correctly. MM2 requires the following options to be in the `qtum.conf`:

```ini
logevents=1
txindex=1
addressindex=1
```

If a QRC20 token is based on Qtum testnet/regtest, please make sure that the `coins` file has the property `"network": "testnet"` or `"network": "regtest"`. See the example below.

```json
{
  "coin":"QRC20",
  "pubtype":120,
  "p2shtype":50,
  "wiftype":128,
  "segwit":true,
  "txfee":0,
  "mm2":1,
  "mature_confirmations":500,
  "required_confirmations":1,
  "network":"testnet",
  "protocol":{
    "type":"QRC20",
    "protocol_data":{
      "platform":"tQTUM",
      "contract_address":"0xd362e096e873eb7907e205fadc6175c6fec7bc44"
    }
  }
}
```

:::

ETH/ERC20 coins are also enabled by the `enable` method, but a local installation of an ETH node is not required.

#### Notes on the mm2 Parameter

Please refer to the `mm2` explanatory section in the `electrum` method for information about setting the `mm2` parameter and testing new coins.

[Link to mm2 explanatory section](../../../basic-docs/atomicdex/atomicdex-api.html#notes-on-the-mm2-parameter)

For terminal interface examples using the `mm2` parameter with the `enable` method, see the examples section below.

#### Using AtomicDEX Software on an ETH-Based Network

The following information can assist the user/developer in connecting AtomicDEX software to the Ethereum network:

- Swap smart contract on the ETH mainnet: [0x8500AFc0bc5214728082163326C2FF0C73f4a871](https://etherscan.io/address/0x8500AFc0bc5214728082163326C2FF0C73f4a871)
  - Main-net nodes maintained by the Komodo team: <b>http://eth1.cipig.net:8555</b>, <b>http://eth2.cipig.net:8555</b>, <b>http://eth3.cipig.net:8555</b>
- Swap smart contract on the Ropsten testnet: [0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94](https://ropsten.etherscan.io/address/0x7bc1bbdd6a0a722fc9bffc49c921b685ecb84b94)
  - Ropsten node maintained by the Komodo team: <b>http://eth-ropsten.cipig.net:8645</b>

To use AtomicDEX software on another Ethereum-based network, such as the Kovan testnet or ETC, deploy the Etomic swap contract code from the repository linked below. Use of this code requires either an ETH node setup or access to a public service such as [Infura.](https://infura.io/)

[Link to repository code for Ethereum-based networks](https://github.com/artemii235/etomic-swap)

#### Arguments

| Structure              | Type                                             | Description                                                                                                                                                                                                                                                                                                         |
| ---------------------  | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                   | string                                           | the name of the coin the user desires to enable                                                                                                                                                                                                                                                                     |
| urls                   | array of strings (required for ETH/ERC20)        | urls of Ethereum RPC nodes to which the user desires to connect                                                                                                                                                                                                                                                     |
| swap_contract_address  | string (required for ETH/ERC20)                  | address of etomic swap smart contract                                                                                                                                                                                                                                                                               |
| gas_station_url        | string (optional for ETH/ERC20)                  | url of [ETH gas station API](https://docs.ethgasstation.info/); The AtomicDEX API uses [eth_gasPrice RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice) by default; when this parameter is set, the AtomicDEX API will request the current gas price from Station for new transactions, and this often results in lower fees |
| mm2                    | number (required if not set in the `coins` file) | this property informs the AtomicDEX software as to whether the coin is expected to function; accepted values are either `0` or `1`                                                                                                                                                                                  |
| tx_history             | bool                                             | whether the node should enable `tx_history` preloading as a background process; this must be set to `true` if you plan to use the `my_tx_history` API                                                                                                                                                               |
| required_confirmations | number                                           | the number of confirmations for which the AtomicDEX API must wait for the selected coin to perform the atomic swap transactions; applicable only for coins using Komodo dPoW                                                                                                                                                      |
| requires_notarization  | bool                                             | whether the node should wait for a notarization of the selected coin that is performing the atomic swap transactions applicable only for coins using Komodo dPoW                                                                                                                                                    |

#### Response

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------  | ------------------------------------------------------------------------------------------------------------------ |
| address                | string            | the address of the user's `coin` wallet, based on the user's passphrase                                            |
| balance                | string (numeric)  | the amount of `coin` the user holds in their wallet; does not include `unspendable_balance`                        |
| unspendable_balance    | string (numeric)  | the `coin` balance that is unspendable at the moment (e.g. if the address has immature UTXOs)                      |
| coin                   | string            | the ticker of enabled coin                                                                                         |
| required_confirmations | number            | AtomicDEX API will wait for the this number of coin's transaction confirmations during the swap                              |
| requires_notarization  | bool              | whether the node must wait for a notarization of the selected coin that is performing the atomic swap transactions |
| mature_confirmations   | number (optional) | the number of coinbase transaction confirmations required to become mature; UTXO coins only                        |
| result                 | string            | the result of the request; this value either indicates `success`, or an error or other type of failure             |

#### :pushpin: Examples

#### Command (for Bitcoin-based blockchains)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `required_confirmations` and `requires_notarization` arguments)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\",\"required_confirmations\":10,\"requires_notarization\":true}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 10,
  "requires_notarization": true,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (for Ethereum and ERC20-based blockchains)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETH\",\"urls\":[\"http://eth-ropsten.cipig.net:8645\"],\"swap_contract_address\":\"0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "ETH",
  "address": "0x3c7aad7b693e94f13b61d4be4abaeaf802b2e3b5",
  "balance": "50",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (for Ethereum and ERC20-based blockchains with gas_station_url)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETH\",\"urls\":[\"http://eth-ropsten.cipig.net:8645\"],\"swap_contract_address\":\"0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94\",\"gas_station_url\":\"https://ethgasstation.info/json/ethgasAPI.json\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "ETH",
  "address": "0x3c7aad7b693e94f13b61d4be4abaeaf802b2e3b5",
  "balance": "50",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `mm2` argument)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\",\"mm2\":1}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success):

```bash
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

#### Response (Error, `mm2` is not set)

```bash
{
  "error":"lp_coins:943] lp_coins:693] mm2 param is not set neither in coins config nor enable request, assuming that coin is not supported"
}
```

</collapse-text>

</div>
