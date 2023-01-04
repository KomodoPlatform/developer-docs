# enable\_tendermint\_token

The `enable_tendermint_token` method allows you to activate additional Tendermint assets. Before using this method, you first need to use the [enable_tendermint_with_assets](enable_tendermint_with_assets.html) method.

| parameter                                | Type    | Description                                                                                        |
| ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| ticker                                   | string  | Ticker of the Tendermint asset.                                                                    |
| activation_params.required_confirmations | integer | Optional. Confirmations to wait for steps in swap. Defaults to value in the coins file if not set. |

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"enable_tendermint_token\",
  \"mmrpc\":\"2.0\",
  \"params\":{
    \"ticker\":\"ATOM-IBC_IRIS\",
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
      "iaa16drqvl3u8sukfsu4lm3qsk28jr3fahja9vsv6k": {
        "spendable": "0.028306",
        "unspendable": "0"
      }
    },
    "platform_coin": "IRIS"
  },
  "id": null
}
```

## Error - Platform coin is not yet activated

```json
{
  "mmrpc": "2.0",
  "error": "Platform coin IRIS is not activated",
  "error_path": "token.lp_coins",
  "error_trace": "token:126] lp_coins:2847]",
  "error_type": "PlatformCoinIsNotActivated",
  "error_data": "IRIS",
  "id": null
}
```

## Error - Token already activated

```json
{
  "mmrpc": "2.0",
  "error": "Token ATOM-IBC_IRIS is already activated",
  "error_path": "token",
  "error_trace": "token:119]",
  "error_type": "TokenIsAlreadyActivated",
  "error_data": "ATOM-IBC_IRIS",
  "id": null
}
```

## Error - Token config not found in coins file

```json
{
  "mmrpc": "2.0",
  "error": "Token UP-AND-ATOM config is not found",
  "error_path": "token.prelude",
  "error_trace": "token:122] prelude:79]",
  "error_type": "TokenConfigIsNotFound",
  "error_data": "UP-AND-ATOM",
  "id": null
}
```
