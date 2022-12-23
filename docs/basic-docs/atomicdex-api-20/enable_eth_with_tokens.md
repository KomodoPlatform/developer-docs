# enable\_eth\_with\_tokens

The AtomicDEX-API supports ETH(Ethereum) and many other EVM type platform coins like AVAX(Avalanche), BNB(Binance), FTM(Fantom), MATIC(Polygon), ONE(Harmony), ETH-ARB20(Arbitrum) . Additionally, it supports ERC20 tokens on the ETH chain and associated ERC20 like tokens on the rest of the platform coin chains. Using this method, you can enable a platform coin along with multiple ERC20 like tokens of the platform coin chain in a single command.

| parameter                                    | Type                                                        | Description                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticker                                       | string                                                      | Ticker of the platform protocol coin. Options: `ETH`, `AVAX`, `BNB`, `FTM`, `MATIC`, `ONE`, `ETH-ARB20`                                                                                                                                                                                                                                         |
| gas_station_url                              | string (optional for ETH/ERC20 and other gas model chains)  | url of [ETH gas station API](https://docs.ethgasstation.info/); The AtomicDEX API uses [eth_gasPrice RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice) by default; when this parameter is set, the AtomicDEX API will request the current gas price from Station for new transactions, and this often results in lower fees |
| gas_station_decimals                         | integer (optional for ETH/ERC20 and other gas model chains) | Defines the decimals used to denominate the gas station response to gwei units. For example, the ETH gas station uses 8 decimals, which means that "average": 860 is equal to 86 gwei. While the Matic gas station uses 9 decimals, so 860 would mean 860 gwei exactly. Defaults to `8`                                                         |
| gas_station_policy.policy                    | string (optional for ETH/ERC20 and other gas model chains)  | Defines the method of gas price calculation from the station response. `"MeanAverageFast"` will use the mean between average and fast fields. `"Average"` will return a simple average value. Defaults to `"MeanAverageFast"`.                                                                                                                  |
| mm2                                          | integer                                                     | Required if not set in `coins` file. Informs the AtomicDEX API whether or not the coin is expected to function. Accepted values are `0` or `1`                                                                                                                                                                                                  |
| priv_key_policy                              | string (optional)                                           | defaults to `ContextPrivKey`. value can be `ContextPrivKey`,`Trezor` when AtomicDEX-API is built for native platforms. value can be `ContextPrivKey`, `Trezor`, `Metamask` when the AtomicDEX-API is built targeting `wasm`                                                                                                                     |
| swap_contract_address                        | string                                                      | address of etomic swap smart contract                                                                                                                                                                                                                                                                                                           |
| fallback_swap_contract                       | string                                                      | address of backup etomic swap smart contract                                                                                                                                                                                                                                                                                                    |
| nodes                                        | array of objects                                            | objects describing each of the nodes to connect to                                                                                                                                                                                                                                                                                              |
| nodes.url                                    | string                                                      | url of a node                                                                                                                                                                                                                                                                                                                                   |
| nodes.gui_auth                               | bool (optional)                                             | must be set to `true` for nodes run officially by the Komodo Platform team                                                                                                                                                                                                                                                                      |
| rpc_mode                                     | string (optional)                                           | defaults to `Http`, value can be `Metamask` when the AtomicDEX-API is built targeting `wasm`                                                                                                                                                                                                                                                    |
| tx_history                                   | bool                                                        | If `true` the AtomicDEX API will preload transaction history as a background process. Must be set to `true` to use the [my_tx_history](../../../basic-docs/atomicdex-api-legacy/my_tx_history.html#my-tx-history) method                                                                                                                        |
| erc20_tokens_requests                        | array of objects                                            | objects describing each of the tokens to be enabled                                                                                                                                                                                                                                                                                             |
| erc20_tokens_requests.ticker                 | string                                                      | Ticker of the token to be enabled                                                                                                                                                                                                                                                                                                               |
| erc20_tokens_requests.required_confirmations | integer                                                     | when the token is involved, the number of confirmations for the AtomicDEX API to wait during the transaction steps of an atomic swap.                                                                                                                                                                                                           |
| required_confirmations                       | integer (optional, defaults to `3`)                         | when the platform coin is involved, the number of confirmations for the AtomicDEX API to wait during the transaction steps of an atomic swap                                                                                                                                                                                                    |
| requires_notarization                        | boolean (optional, defaults to `false`)                     | If `true`, coins protected by [Komodo Platform's dPoW security](https://satindergrewal.medium.com/delayed-proof-of-work-explained-9a74250dbb86) will wait for a notarization before progressing to the next atomic swap transactions step.                                                                                                      |

## Example

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"enable_eth_with_tokens\",
  \"mmrpc\": \"2.0\",
  \"params\": {
    \"ticker\": \"ETH\",
    \"gas_station_url\": \"https://ethgasstation.info/json/ethgasAPI.json\",
    \"gas_station_decimals\": 8,
    \"gas_station_policy\": {
      \"policy\": \"MeanAverageFast\"
    },
    \"mm2\": 1,
    \"priv_key_policy\": \"ContextPrivKey\",
    \"swap_contract_address\": \"0x24ABE4c71FC658C91313b6552cd40cD808b3Ea80\",
    \"fallback_swap_contract\": \"0x8500AFc0bc5214728082163326C2FF0C73f4a871\",
    \"nodes\": [
      {
        \"url\": \"http://eth1.cipig.net:8555\",
        \"gui_auth\": false
      },
      {
        \"url\": \"http://eth2.cipig.net:8555\",
        \"gui_auth\": false
      },
      {
        \"url\": \"http://eth3.cipig.net:8555\",
        \"gui_auth\": false
      },
      {
        \"url\": \"https://node.komodo.live:8080/ethereum\",
        \"gui_auth\": true
      }
    ],
    \"rpc_mode\": \"Http\",
    \"tx_history\": true,
    \"erc20_tokens_requests\": [
      {
        \"ticker\": \"APE-ERC20\",
        \"required_confirmations\": 4
      },
      {
        \"ticker\": \"BCH-ERC20\",
        \"required_confirmations\": 4
      },
      {
        \"ticker\": \"MINDS-ERC20\",
        \"required_confirmations\": 4
      },
      {
        \"ticker\": \"BUSD-ERC20\",
        \"required_confirmations\": 4
      }
    ],
    \"required_confirmations\": 5,
    \"requires_notarization\": false
  }
}"
```

## Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "current_block": 16145371,
    "eth_addresses_infos": {
      "0x0d317904AF3BA3A993d557b6cba147FEA4DeB57E": {
        "derivation_method": { "type": "Iguana" },
        "pubkey": "042e6e6b1ca76a7cd1fd2e1ed13bdc83909ad17b17748781308abe55caf863bec6dac19a0ead812d54c8c07508e2f30a258628832c1337f4fdd423a879f67bc823",
        "balances": { "spendable": "0", "unspendable": "0" }
      }
    },
    "erc20_addresses_infos": {
      "0x0d317904AF3BA3A993d557b6cba147FEA4DeB57E": {
        "derivation_method": { "type": "Iguana" },
        "pubkey": "042e6e6b1ca76a7cd1fd2e1ed13bdc83909ad17b17748781308abe55caf863bec6dac19a0ead812d54c8c07508e2f30a258628832c1337f4fdd423a879f67bc823",
        "balances": {
          "MINDS-ERC20": { "spendable": "0", "unspendable": "0" },
          "APE-ERC20": { "spendable": "0", "unspendable": "0" },
          "BUSD-ERC20": { "spendable": "0", "unspendable": "0" },
          "BCH-ERC20": { "spendable": "0", "unspendable": "0" }
        }
      }
    }
  },
  "id": null
}
```

## Errors

### Error (The platform coin you are trying to activate is already activated)

In this case, you need to [disable](../atomicdex-api-legacy/disable_coin.md) the platform coin and try again.

```json
{
  "mmrpc": "2.0",
  "error": "ETH",
  "error_path": "platform_coin_with_tokens",
  "error_trace": "platform_coin_with_tokens:297]",
  "error_type": "PlatformIsAlreadyActivated",
  "error_data": "ETH",
  "id": null
}
```

### Error (Config of the platform coin you are trying to activate is not found)

```json
{
  "mmrpc": "2.0",
  "error": "Platform ETH config is not found",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:302] prelude:79]",
  "error_type": "PlatformConfigIsNotFound",
  "error_data": "ETH",
  "id": null
}
```

### Error (Parsing the protocol of the platform coin you are trying to activate failed)

```json
{
  "mmrpc": "2.0",
  "error": "Platform coin ETH protocol parsing failed: invalid type: null, expected adjacently tagged enum CoinProtocol",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:302] prelude:82]",
  "error_type": "CoinProtocolParseError",
  "error_data": {
    "ticker": "ETH",
    "error": "invalid type: null, expected adjacently tagged enum CoinProtocol"
  },
  "id": null
}
```

### Error (Unexpected platform protocol found for the platform coin you are trying to activate)

```json
{
  "mmrpc": "2.0",
  "error": "Unexpected platform protocol QTUM for ETH",
  "error_path": "platform_coin_with_tokens.prelude.eth_with_token_activation",
  "error_trace": "platform_coin_with_tokens:302] prelude:90] eth_with_token_activation:64]",
  "error_type": "UnexpectedPlatformProtocol",
  "error_data": { "ticker": "ETH", "protocol": { "type": "QTUM" } },
  "id": null
}
```

### Error (Config of the token you are trying to activate is not found)

```json
{
  "mmrpc": "2.0",
  "error": "Token BTUSD-ERC20 config is not found",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:314] platform_coin_with_tokens:109] prelude:79]",
  "error_type": "TokenConfigIsNotFound",
  "error_data": "BTUSD-ERC20",
  "id": null
}
```

### Error (Parsing the protocol of the token you are trying to activate failed)

```json
{
  "mmrpc": "2.0",
  "error": "Token BUSD-ERC20 protocol parsing failed: unknown variant `TERC20`, expected one of `UTXO`, `QTUM`, `QRC20`, `ETH`, `ERC20`, `SLPTOKEN`, `BCH`, `TENDERMINT`, `TENDERMINTTOKEN`, `LIGHTNING`, `SOLANA`, `SPLTOKEN`, `ZHTLC`",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:314] platform_coin_with_tokens:109] prelude:82]",
  "error_type": "TokenProtocolParseError",
  "error_data": {
    "ticker": "BUSD-ERC20",
    "error": "unknown variant `TERC20`, expected one of `UTXO`, `QTUM`, `QRC20`, `ETH`, `ERC20`, `SLPTOKEN`, `BCH`, `TENDERMINT`, `TENDERMINTTOKEN`, `LIGHTNING`, `SOLANA`, `SPLTOKEN`, `ZHTLC`"
  },
  "id": null
}
```

### Error (Unexpected protocol is found in the config of the token you are trying to activate)

```json
{
  "mmrpc": "2.0",
  "error": "Unexpected token protocol QRC20 { platform: \"ETH\", contract_address: \"0x4Fabb145d64652a948d72533023f6E7A623C7C53\" } for BUSD-ERC20",
  "error_path": "platform_coin_with_tokens.prelude.erc20_token_activation",
  "error_trace": "platform_coin_with_tokens:314] platform_coin_with_tokens:109] prelude:90] erc20_token_activation:58]",
  "error_type": "UnexpectedTokenProtocol",
  "error_data": {
    "ticker": "BUSD-ERC20",
    "protocol": {
      "type": "QRC20",
      "protocol_data": {
        "platform": "ETH",
        "contract_address": "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
      }
    }
  },
  "id": null
}
```

### Misc Errors

| Structure                  | Type   | Description                                                   |
| -------------------------- | ------ | ------------------------------------------------------------- |
| PlatformCoinCreationError  | string | There was an error when trying to activate the platform coin  |
| PrivKeyNotAllowed          | string | The privkey is not allowed                                    |
| UnexpectedDerivationMethod | string | The derivation method used is unexpected                      |
| Transport                  | string | The request was failed due to a network error                 |
| InternalError              | string | The request was failed due to an AtomicDEX API internal error |
