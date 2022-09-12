# Coin Activation

There are two methods of coin activation:
- `enable` - Connects to a native daemon, or a url which handles RPCs for Platform coins (e.g. ETH, MATIC, FTM, BNB, ONE)
- `electrum` - Connects to an [electrum server](https://github.com/kyuupichan/electrumx) for UTXO based coins and QTUM/QRC20 tokens.

A coin can only be activated once per session, and must be activated before it can be used in trading or wallet functions. 

::: warning Important

The AtomicDEX API requires an `mm2` parameter to be set for each `coin`. This can be added to the enable/electrum command, or defined in your [coins file](../../../basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.html#setting-up-the-coin-list).


The value of the `mm2` parameter informs the software as to whether the `coin` is expected to be compatible for atomic swaps.

- `0` = `non-compatible`
- `1` = `compatible`

:::

## Native mode activation

If you are running a UTXO based coin daemon locally and the blockchain is synchronised, you can connect the local daemon to the AtomicDEX API by using the `enable` method, though some additional configuration is required. The AtomicDEX API requires the following options to be added to  the native chain's [.conf file](http://bitcoincoredocs.com/bitcoin-conf.html).

```ini
logevents=1
txindex=1
addressindex=1
```

::: tip Note

The AtomicDEX API node's coin address needs to be imported manually into the coin daemon using the [importaddress](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#importaddress) method.

:::


## Lite mode activation

Activating coins in 'lite mode' means you don't need to have a native coin daemon installed, or keep a local blockchain synchronised. In this mode, the AtomicDEX API communicates with an external node to perform transactions and query the blockchain. UTXO based coins and QTUM/QRC20 tokens communicate via electrum servers, while other platform coins communicate via JSON RPC urls.

AtomicDEX is a true cross chain, cross protocol Decentralized Exchange (DEX), allowing for trades between coins and tokens across many platforms and ecosystems, such as:
- UTXO based coins (e.g. DOGE, BTC, ZEC, LTC, DASH, DGB)
- [Ethereum (ETH)](https://ethereum.org/en/) & [ERC20 tokens](https://etherscan.io/tokens) 
- [Binance Coin (BNB)](https://coinmarketcap.com/currencies/binance-coin/) & [BEP20](https://www.coingecko.com/en?asset_platform_id=binance-coin) tokens
- [QTUM](https://qtum.org/en) & [QRC20 tokens](https://qtum.info/qrc20)
- [Polygon (MATIC)](https://polygon.technology/) & [PLG20 tokens](https://polygonscan.com/tokens)
- [Harmony (ONE)](https://www.harmony.one/) & [HRC20 tokens](https://www.coingecko.com/en/categories/harmony-ecosystem)
- [Fantom (FTM)](https://fantom.foundation/) & [FTM20 tokens](https://ftmscan.com/tokens)
- [Avalanche (AVAX)](https://www.avax.network/) & [AVX20 tokens](https://avascan.info/)
- [Moonriver (MOVR)](https://moonbeam.network/networks/moonriver/) & [MVR20 tokens](https://moonriver.moonscan.io/tokens)
- And more!


## Electrum

::: tip

Electrum mode is only available for UTXO based coins and QTUM/QRC20 tokens. 

:::



#### Arguments

| Structure                           | Type                                             | Description                                                                                                                                                          |
| ----------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                                | string                                   | Ticker of coin to activate                                                                                                                                           |
| servers                             | array of objects                         | List of [Electrum servers](https://github.com/KomodoPlatform/coins/tree/master/electrums)                                                                            |
| servers.url                         | string                                   | Electrum server URL                                                                                                                                                  |
| servers.protocol                    | string (optional, defaults to `TCP`)     | Transport protocol used by AtomicDEX API to connect to the electrum server (`TCP` or `SSL`)                                                                          |
| servers.disable_cert_verification   | bool (optional, defaults to `false`.)    | If `true`, this disables server SSL/TLS certificate verification (e.g. to use self-signed certificate). <b>Use at your own risk</b>                                  |
| mm2                                 | integer                                  | Required if not set in `coins` file. Informs the AtomicDEX API whether or not the coin is expected to function. Accepted values are `0` or `1`                       |
| tx_history                          | bool                                     | If `true` the AtomicDEX API will preload trasaction history as a background process. Must be set to `true` to use the [my_tx_history](../../../basic-docs/atomicdex-api-legacy/my_tx_history.html#my-tx-history) method                |
| required_confirmations              | integer (optional, defaults to `3`)      | Number of confirmations for the AtomicDEX API to wait during the transaction steps of an atomic swap.                                                                |
| requires_notarization               | boolean (optional, defaults to `false`)  | If `true`, coins protected by [Komodo Platform's dPoW security](https://satindergrewal.medium.com/delayed-proof-of-work-explained-9a74250dbb86) will wait for a notarization before progressing to the next atomic swap transactions step.  |
| swap_contract_address               | string (required for QRC20 only)         | address of etomic swap smart contract                                                                                                                                |
| fallback_swap_contract              | string (required for QRC20 only)         | address of backup etomic swap smart contract                                                                                                                         |
| utxo_merge_params                   | object (optional)                        | If set, will consolidate excessive UTXOs (e.g. from mining)                                                                                                          |
| utxo_merge_params.merge_at          | integer                                  | Number of UTXOs in wallet required before merging                                                                                                                    |
| utxo_merge_params.check_every       | integer                                  | How often to check the UTXO count, in seconds. Ideally should be at least 3x the coins block time.                                                                   |
| utxo_merge_params.max_merge_at_once | integer                                  | Maximum number of UTXOs to merge in each consolidation transaction. Should be less that `merge_at` value, but will fail if so high the transaction becomes too large. Suggested maximum is 250.                                  |


#### Response

| Structure              | Type              | Description                                                                                                                                                     |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address                | string            | the address of the user's `coin` wallet, based on the user's passphrase                                                                                         |
| balance                | string (numeric)  | the amount of `coin` the user holds in their wallet; does not include `unspendable_balance`                                                                     |
| unspendable_balance    | string (numeric)  | the `coin` balance that is unspendable at the moment (e.g. if the address has immature UTXOs)                                                                   |
| coin                   | string            | the ticker of the enabled coin                                                                                                                                  |
| required_confirmations | number            | the number of transaction confirmations for which the AtomicDEX API must wait during the atomic swap process                                                    |
| mature_confirmations   | number (optional) | the number of coinbase transaction confirmations required to become mature; UTXO coins only                                                                     |
| requires_notarization  | bool              | whether the node must wait for a notarization of the selected coin that is performing the atomic swap transactions; applicable only for coins using Komodo dPoW |
| result                 | string            | the result of the request; this value either indicates `success`, or an error, or another type of failure                                                       |


#### :pushpin: Examples

#### Command for UTXO based coins

```bash
curl --url "http://127.0.0.1:7783" --data "{
	\"coin\": \"LTC\",
	\"method\": \"electrum\",
	\"servers\": [
		{\"url\": \"electrum1.cipig.net:10063\"},
		{\"url\": \"electrum2.cipig.net:10063\"},
		{\"url\": \"electrum3.cipig.net:10063\"}
	],
	\"userpass\": \"$userpass\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "LTC",
  "address": "Lh2zFS66gP5qF1bRxoCXT6bMw8YShjoRry",
  "balance": "7.62",
  "unspendable_balance": "0",
  "mature_confirmations": 100,
  "required_confirmations": 3,
  "requires_notarization": false,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command for UTXO based coins with `required_confirmations`, `requires_notarization` and `mm2` arguments

```bash
curl --url "http://127.0.0.1:7783" --data "{
	\"coin\": \"KMD\",
	\"method\": \"electrum\",
	\"servers\": [
		{\"url\": \"electrum1.cipig.net:10001\"},
		{\"url\": \"electrum2.cipig.net:10001\"},
		{\"url\": \"electrum3.cipig.net:10001\"}
	],
	\"required_confirmations\":10,
	\"requires_notarization\":true,
	\"mm2\":1,
	\"userpass\": \"$userpass\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "KMD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "762",
  "unspendable_balance": "0",
  "mature_confirmations": 100,
  "required_confirmations": 10,
  "requires_notarization": true,
  "result": "success"
}
```

</collapse-text>

</div>


#### Command (For QTUM/QRC20 tokens)

```bash
curl --url "http://127.0.0.1:7783" --data "{
	\"coin\": \"QTUM\",
	\"method\": \"electrum\",
	\"servers\": [
		{\"url\": \"electrum1.cipig.net:10050\"},
		{\"url\": \"electrum2.cipig.net:10050\"},
		{\"url\": \"electrum3.cipig.net:10050\"}
	],
	\"swap_contract_address\":\"0x2f754733acd6d753731c00fee32cb484551cc15d\",
	\"userpass\": \"$userpass\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "QTUM",
  "address": "QjXkGgoiycYRm2NbiMpkEHuQt7SB9BKHjz",
  "balance": "7.77",
  "required_confirmations": 3,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations": 100,
  "result": "success"
}
```

#### Response (Error, `mm2` is not set)

If mm2 is not set in either the command or your `coins` file, you will see the following error:

```bash
{
  "error":"lp_coins:943] lp_coins:693] mm2 param is not set neither in coins config nor enable request, assuming that coin is not supported"
}
```

</collapse-text>

</div>


## Enable


#### Arguments

| Structure              | Type                                             | Description                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                   | string                                           | the name of the coin the user desires to enable                                             |
| urls                   | array of strings (required for ETH/ERC20 and other gas model chains)        | urls of Ethereum RPC nodes to which the user desires to connect  |
| swap_contract_address  | string (required for QRC20 only)                 | address of etomic swap smart contract                                                       |
| fallback_swap_contract | string (required for QRC20 only)                 | address of backup etomic swap smart contract                                                |
| gas_station_url        | string (optional for ETH/ERC20 and other gas model chains)                  | url of [ETH gas station API](https://docs.ethgasstation.info/); The AtomicDEX API uses [eth_gasPrice RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice) by default; when this parameter is set, the AtomicDEX API will request the current gas price from Station for new transactions, and this often results in lower fees |
| gas_station_decimals   | integer (optional for ETH/ERC20 and other gas model chains)                  | Defines the decimals used to denominate the gas station response to gwei units. For example, the ETH gas station uses 8 decimals, which means that "average": 860 is equal to 86 gwei. While the Matic gas station uses 9 decimals, so 860 would mean 860 gwei exactly. Defaults to `8` |
| gas_station_policy.policy  | string (optional for ETH/ERC20 and other gas model chains) | Defines the method of gas price calculation from the station response. `"MeanAverageFast"` will use the mean between average and fast fields. `"Average"` will return a simple average value. Defaults to `"MeanAverageFast"`. |
| mm2                    | integer                        | Required if not set in `coins` file. Informs the AtomicDEX API whether or not the coin is expected to function. Accepted values are `0` or `1`                                   |
| tx_history                        | bool                                             | If `true` the AtomicDEX API will preload trasaction history as a background process. Must be set to `true` to use the [my_tx_history](../../../basic-docs/atomicdex-api-legacy/my_tx_history.html#my-tx-history) method              |
| required_confirmations | integer (optional, defaults to `3`)             | Number of confirmations for the AtomicDEX API to wait during the transaction steps of an atomic swap.      |
| requires_notarization  | boolean (optional, defaults to `false`)         | If `true`, coins protected by [Komodo Platform's dPoW security](https://satindergrewal.medium.com/delayed-proof-of-work-explained-9a74250dbb86) will wait for a notarization before progressing to the next atomic swap transactions step.    |


#### Response

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| address                | string            | the address of the user's `coin` wallet, based on the user's passphrase                                            |
| balance                | string (numeric)  | the amount of `coin` the user holds in their wallet; does not include `unspendable_balance`                        |
| unspendable_balance    | string (numeric)  | the `coin` balance that is unspendable at the moment (e.g. if the address has immature UTXOs)                      |
| coin                   | string            | the ticker of enabled coin                                                                                         |
| required_confirmations | number            | AtomicDEX API will wait for the this number of coin's transaction confirmations during the swap                    |
| requires_notarization  | bool              | whether the node must wait for a notarization of the selected coin that is performing the atomic swap transactions |
| mature_confirmations   | number (optional) | the number of coinbase transaction confirmations required to become mature; UTXO coins only                        |
| result                 | string            | the result of the request; this value either indicates `success`, or an error or other type of failure             |

#### :pushpin: Examples

#### Command (for native UTXO-based blockchains)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"enable\",
  \"coin\": \"TKL\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "TKL",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "333",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations": 100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `required_confirmations`,  `requires_notarization` and `mm2` arguments)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"enable\",
  \"coin\": \"TKL\",
  \"mm2\": 1,
  \"required_confirmations\":10,
  \"requires_notarization\":true
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "TKL",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "777",
  "required_confirmations": 10,
  "requires_notarization": true,
  "unspendable_balance": "0",
  "mature_confirmations": 100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (for Ethereum and ERC20-based blockchains)

```bash
curl --url "http://127.0.0.1:7783" --data "{
	\"coin\": \"ETH\",
	\"method\": \"enable\",
	\"urls\": [
		\"http://eth1.cipig.net:8555\",
		\"http://eth2.cipig.net:8555\",
		\"http://eth3.cipig.net:8555\"
	],
	\"swap_contract_address\": \"0x24ABE4c71FC658C91313b6552cd40cD808b3Ea80\",
	\"fallback_swap_contract\": \"0x8500AFc0bc5214728082163326C2FF0C73f4a871\",
	\"userpass\": \"$userpass\"
}"
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

#### Command (for Ethereum and ERC20-based blockchains with gas_station_url and policy)

```bash
curl --url "http://127.0.0.1:7783" --data "{
	\"coin\": \"ETH\",
	\"userpass\": \"$userpass\"
	\"method\": \"enable\",
	\"urls\": [
		\"http://eth1.cipig.net:8555\",
		\"http://eth2.cipig.net:8555\",
		\"http://eth3.cipig.net:8555\"
	],
	\"swap_contract_address\": \"0x24ABE4c71FC658C91313b6552cd40cD808b3Ea80\",
	\"fallback_swap_contract\": \"0x8500AFc0bc5214728082163326C2FF0C73f4a871\",
  \"gas_station_url\": \"https://ethgasstation.info/json/ethgasAPI.json\",
  \"gas_station_decimals\": 8,
  \"gas_station_policy\": {
    \"policy\": \"MeanAverageFast\"
  }
}"
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


#### Command for Polygon (MATIC) and PLG20 tokens

```bash
curl --url "http://127.0.0.1:7783" --data "{
	\"coin\": \"NZDS-PLG20\",
	\"method\": \"enable\",
	\"swap_contract_address\": \"0x9130b257D37A52E52F21054c4DA3450c72f595CE\",
	\"fallback_swap_contract\": \"0x9130b257D37A52E52F21054c4DA3450c72f595CE\",
	\"urls\": [
		\"https://polygon-rpc.com\"
	],
	\"userpass\": \"$userpass\"
	}"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "NZDS-PLG20",
  "address": "0x3c7aad7b693e94f13b61d4be4abaeaf802b2e3b5",
  "balance": "350",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "result": "success"
}
```

</collapse-text>

</div>



#### Command for Binance Coin (BNB) and BEP20 tokens

```bash
curl --url "http://127.0.0.1:7783" --data "{
	\"coin\": \"BUSD-BEP20\",
	\"method\": \"enable\",
	\"swap_contract_address\": \"0xeDc5b89Fe1f0382F9E4316069971D90a0951DB31\",
	\"fallback_swap_contract\": \"0xeDc5b89Fe1f0382F9E4316069971D90a0951DB31\",
	\"urls\": [
		\"http://bsc1.cipig.net:8655\",
		\"http://bsc2.cipig.net:8655\",
		\"http://bsc3.cipig.net:8655\"
	],
	\"userpass\": \"$userpass\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "BUSD-BEP20",
  "address": "0x3c7aad7b693e94f13b61d4be4abaeaf802b2e3b5",
  "balance": "45",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "result": "success"
}
```

</collapse-text>

</div>


## task::enable_z_coin::init

Z coins, like Pirate (ARRR) and the test coin ZOMBIE take a little longer to enable, and use a new two step method to enable. Activation can take a little while the first time, as we need to download some block cache data, and build a wallet database. Subsequent enabling will be faster, but still take a bit longer than other coins. The second step for activation is optional, but allows us to check the status of the activation process.
To enable Z coins you also need to [install some Zcash Params](https://forum.komodoplatform.com/t/installing-zcash-params/603)


#### Arguments

| Structure                           | Type            | Description                                                                                                                                                          |
| ----------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticker                              | string          | Ticker of coin to activate                                                                                                                                           |
| activation_params                   | object          | List of [Electrum servers](https://github.com/KomodoPlatform/coins/tree/master/electrums)                                                                            |
| activation_params.mode.rpc          | string          | Electrum server URL                                                                                                                                                  |
| activation_params.mode.rpc_data     | object          | Transport protocol used by AtomicDEX API to connect to the electrum server (`TCP` or `SSL`)                                                                          |
| ..rpc_data.electrum_servers         | list of objects | If `true`, this disables server SSL/TLS certificate verification (e.g. to use self-signed certificate). <b>Use at your own risk</b>                                  |
| ..rpc_data.electrum_servers.urls    | string          | If `true`, this disables server SSL/TLS certificate verification (e.g. to use self-signed certificate). <b>Use at your own risk</b>                                  |
| ..rpc_data.light_wallet_d_servers   | list of strings | Required if not set in `coins` file. Informs the AtomicDEX API whether or not the coin is expected to function. Accepted values are `0` or `1`                       |



#### Response

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | An identifying number which is used to query task status.                                                          |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"$userpass\",
    \"method\": \"task::enable_z_coin::init\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"ticker\": \"ZOMBIE\",
        \"activation_params\": {
            \"mode\": {
                \"rpc\": \"Light\",
                \"rpc_data\": {
                    \"electrum_servers\": [{\"url\":\"zombie.sirseven.me:10033\"}],
                    \"light_wallet_d_servers\": [\"http://zombie.sirseven.me:443\"]
                }
            }
        }
    }
}"
echo
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "task_id": 0
  },
  "id": null
}
```

</collapse-text>

</div>


## task::enable_z_coin::status

After initiating z coin enabling, you can use the `task_id` to check progress.


#### Arguments

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | The identifying number returned when initiating the enabling process.                                              |


#### Response

| Structure              | Type              | Description                                                                                                           |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| status                 | string            | A short indication of how the enabling is progressing.                                                                |
| details                | object            | Depending on the state of anabling progress, this will contain different information as shown in the responses below. |


#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"${userpass}\",
    \"method\": \"task::enable_z_coin::status\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"task_id\": $1
    }
}"
echo
```



<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ActivatingCoin - enabling has started)

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "InProgress",
    "details": "ActivatingCoin"
  },
  "id": null
}
```

</collapse-text>

</div>



<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (UpdatingBlocksCache)

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "InProgress",
    "details": {
      "UpdatingBlocksCache": {
        "current_scanned_block": 265930,
        "latest_block": 269656
      }
    }
  },
  "id": null
}

```

</collapse-text>

</div>




<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (BuildingWalletDb)

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "InProgress",
    "details": {
      "BuildingWalletDb": {
        "current_scanned_block": 265311,
        "latest_block": 269656
      }
    }
  },
  "id": null
}
```

</collapse-text>

</div>



<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Enabling complete)

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "Ok",
    "details": {
      "ticker": "ZOMBIE",
      "current_block": 269657,
      "wallet_balance": {
        "wallet_type": "Iguana",
        "address": "zs1e3puxpnal8ljjrqlxv4jctlyndxnm5a3mj5rarjvp0qv72hmm9caduxk9asu9kyc6erfx4zsauj",
        "balance": {
          "spendable": "29.99989008",
          "unspendable": "0"
        }
      }
    }
  },
  "id": null
}
```

</collapse-text>

</div>



<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (no Zcash Params)

```json
{
	"mmrpc": "2.0",
	"result": {
		"status": "Error",
		"details": {
			"error": "Error on platform coin ZOMBIE creation: ZCashParamsNotFound",
			"error_path": "lib.z_coin_activation.z_coin",
			"error_trace": "lib:103] z_coin_activation:192] z_coin:761]",
			"error_type": "CoinCreationError",
			"error_data": {
				"ticker": "ZOMBIE",
				"error": "ZCashParamsNotFound"
			}
		}
	},
	"id": null
}
```

</collapse-text>

</div>


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (error - no such task)

You'll see this if the task number does not exist, or the task has already completed.

```json
{
  "mmrpc": "2.0",
  "error": "No such task '1'",
  "error_path": "init_standalone_coin",
  "error_trace": "init_standalone_coin:119]",
  "error_type": "NoSuchTask",
  "error_data": 1,
  "id": null
}

```

</collapse-text>

</div>



## task::enable_z_coin::cancel

If you want to cancel the enabling process before it has completed, you can use this method.


#### Arguments

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | The identifying number returned when initiating the enabling process.                                              |


#### Response

| Structure              | Type              | Description                                                    |
| ---------------------- | ----------------- | -------------------------------------------------------------- |
| result                 | string            | Indicates task cancellation was succesful.                     |
| error                  | string            | An error message to explain what went wrong.                   |
| error_path             | string            | An indicator of the class or function which reurned the error. |
| error_trace            | string            | An indicator of where in the source code the error was thrown. |
| error_type             | string            | An enumerated value for the returned  error.                   |
| error_data             | string            | The input task ID which resulted in the error.                 |


#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"${userpass}\",
    \"method\": \"task::enable_z_coin::cancel\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"task_id\": $1
    }
}"
echo
```


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)


```json
{
  "mmrpc": "2.0",
  "result": "success",
  "id": null
}
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success - already finished)


```json
{
  "mmrpc": "2.0",
  "error": "Task is finished already",
  "error_path": "init_standalone_coin.manager",
  "error_trace": "init_standalone_coin:144] manager:101]",
  "error_type": "TaskFinished",
  "error_data": 0,
  "id": null
}
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (error - no such task)


```json
{
  "mmrpc": "2.0",
  "error": "No such task '1'",
  "error_path": "init_standalone_coin",
  "error_trace": "init_standalone_coin:119]",
  "error_type": "NoSuchTask",
  "error_data": 1,
  "id": null
}

```

</collapse-text>

</div>


To see more examples for other platforms like Fantom, Avalanche & Harmony, you can search the [AtomicDEX API Coin Activation Commands List
](http://stats.kmd.io/atomicdex/activation_commands/) or build a single `batch` command to enable a set of selected coins via the 
[Batch Coin Activation Form](http://stats.kmd.io/atomicdex/batch_activation_form/)


::: tip

We welcome volunteers to test new coins for AtomicDEX API compatibility! Follow the [Submitting Coin Test Results guide](https://github.com/KomodoPlatform/coins#about-this-repository) for more information, or drop into the [Komodo Platform Discord Server](https://komodoplatform.com/discord) for a chat if you need some help.

:::
