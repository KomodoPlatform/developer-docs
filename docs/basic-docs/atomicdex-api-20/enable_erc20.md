# enable\_erc20

The `enable_erc20` method allows you to activate additional ERC20 like tokens of a EVM type platform coin. Before using this method, you first need to use the [enable_eth_with_tokens](enable_eth_with_tokens.html) method.

| parameter                                | Type    | Description                                                                                        |
| ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| ticker                                   | string  | Ticker of the ERC20 like token coin.                                                               |
| activation_params.required_confirmations | integer | Optional. Confirmations to wait for steps in swap. Defaults to value in the coins file if not set. |

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"enable_erc20\",
  \"mmrpc\":\"2.0\",
  \"params\":{
    \"ticker\":\"BAT-ERC20\",
    \"activation_params\": {
      \"required_confirmations\": 3
    }
  }
}"
```

## Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "balances": {
      "0x0d317904AF3BA3A993d557b6cba147FEA4DeB57E": {
        "spendable": "0",
        "unspendable": "0"
      }
    },
    "platform_coin": "ETH",
    "token_contract_address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    "required_confirmations": 3
  },
  "id": null
}
```

## Error - Platform coin is not yet activated

```json
{
  "mmrpc": "2.0",
  "error": "Platform coin ETH is not activated",
  "error_path": "token.lp_coins",
  "error_trace": "token:126] lp_coins:2797]",
  "error_type": "PlatformCoinIsNotActivated",
  "error_data": "ETH",
  "id": null
}
```

## Error - Token already activated

```json
{
  "mmrpc": "2.0",
  "error": "Token BAT-ERC20 is already activated",
  "error_path": "token",
  "error_trace": "token:119]",
  "error_type": "TokenIsAlreadyActivated",
  "error_data": "BAT-ERC20",
  "id": null
}
```

## Error - Token config not found in coins file

```json
{
  "mmrpc": "2.0",
  "error": "Token BATT-ERC20 config is not found",
  "error_path": "token.prelude",
  "error_trace": "token:122] prelude:79]",
  "error_type": "TokenConfigIsNotFound",
  "error_data": "BATT-ERC20",
  "id": null
}
```
