# enable\_slp

The `enable_slp` method allows you to activate additional SLP tokens. Before using this method, you first need to use the [enable_bch_with_tokens](enable_bch_with_tokens.html) method.


| parameter                                 | Type     | Description                               |
| ----------------------------------------- | -------- | ----------------------------------------- |
| ticker                                    | string   | Ticker of the platform BCH protocol coin. |
| activation_params.required_confirmations  | integer  | Optional. Confirmations to wait for steps in swap. Defaults to value in the coins file if not set. |

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"enable_slp",
  "mmrpc":"2.0",
  "params":{
    "ticker":"HONK",
    "activation_params": {
      "required_confirmations": 3
    }
  }
}'
```


## Response

```json

{
  "mmrpc":"2.0",
  "result":{
    "balances":{
      "simpleledger:qrf5vpn78s7rjexrjhlwyzzeg7gw98k7t5va3wuz4v":{
        "spendable":"0","unspendable":"0"
      }
    },
    "token_id":"7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1",
    "platform_coin":"BCH",
    "required_confirmations":3
  },
  "id":null
}
```

## Error - BCH not yet activated

```json
{
  "mmrpc":"2.0",
  "error":"Platform coin BCH is not activated",
  "error_path":"token.lp_coins",
  "error_trace":"token:102] lp_coins:1924]",
  "error_type":"PlatformCoinIsNotActivated",
  "error_data":"BCH",
  "id":null
}
```

## Error - Token already activated

```json
{
  "mmrpc":"2.0",
  "error":"Token HONK is already activated",
  "error_path":"token",
  "error_trace":"token:95]",
  "error_type":"TokenIsAlreadyActivated",
  "error_data":"HONK",
  "id":null
}
```


## Error - Token config not found in coins file

```json
{
  "mmrpc":"2.0",
  "error":"Token HONK-WRONG config is not found",
  "error_path":"token.prelude",
  "error_trace":"token:98] prelude:56]",
  "error_type":"TokenConfigIsNotFound",
  "error_data":"HONK-WRONG",
  "id":null
}
```
