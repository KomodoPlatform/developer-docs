# enable\_tendermint\_with\_assets

Use this method to activate Tendermint coins (COSMOS/IRIS/OSMOSIS) and IBC assets in a single command.

| parameter                            | Type                                    | Description                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ticker                               | string                                  | Ticker of the platform protocol coin. Options: `ATOM`, `IRIS`, `OSMOSIS`                                                                                                                                                                   |
| mm2                                  | integer                                 | Required if not set in `coins` file. Informs the AtomicDEX API whether or not the coin is expected to function. Accepted values are `0` or `1`                                                                                             |
| priv_key_policy                      | string (optional)                       | defaults to `ContextPrivKey`. value can be `ContextPrivKey`,`Trezor` when AtomicDEX-API is built for native platforms. value can be `ContextPrivKey`, `Trezor`, `Metamask` when the AtomicDEX-API is built targeting `wasm`                |
| tx_history                           | bool                                    | If `true` the AtomicDEX API will preload transaction history as a background process. Must be set to `true` to use the [my_tx_history](../../../basic-docs/atomicdex-api-legacy/my_tx_history.html#my-tx-history) method                   |
| tokens_params                        | array of objects                        | objects describing each of the tokens to be enabled                                                                                                                                                                                        |
| tokens_params.ticker                 | string                                  | Ticker of the token to be enabled                                                                                                                                                                                                          |
| tokens_params.required_confirmations | integer                                 | when the token is involved, the number of confirmations for the AtomicDEX API to wait during the transaction steps of an atomic swap                                                                                                       |
| required_confirmations               | integer (optional, defaults to `3`)     | when the platform coin is involved, the number of confirmations for the AtomicDEX API to wait during the transaction steps of an atomic swap                                                                                               |
| requires_notarization                | boolean (optional, defaults to `false`) | If `true`, coins protected by [Komodo Platform's dPoW security](https://satindergrewal.medium.com/delayed-proof-of-work-explained-9a74250dbb86) will wait for a notarization before progressing to the next atomic swap transactions step  |

## Example

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"method\":\"enable_tendermint_with_assets\",
    \"mmrpc\":\"2.0\",
    \"params\": {
        \"ticker\":\"IRIS\",
        \"tokens_params\": [
             {\"ticker\":\"ATOM-IBC_IRIS\"}
        ],
        \"rpc_urls\": [
            \"https://iris.komodo.live/\",
            \"https://rpc.irishub-1.irisnet.org\"
       ],
       \"tx_history\":true
    },
    \"userpass\":\"${userpass}\"
}"; echo


```

## Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "ticker": "IRIS",
    "address": "iaa16drqvl3u8sukfsu4lm3qsk28jr3fahja9vsv6k",
    "current_block": 18036678,
    "balance": {
      "spendable": "198.692769",
      "unspendable": "0"
    },
    "tokens_balances": {
      "ATOM-IBC_IRIS": {
        "spendable": "0.028306",
        "unspendable": "0"
      }
    }
  },
  "id": null
}
```

### Error (Config of the platform coin you are trying to activate is not found)

```json
{
  "mmrpc": "2.0",
  "error": "Platform WALDO config is not found",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:302] prelude:79]",
  "error_type": "PlatformConfigIsNotFound",
  "error_data": "WALDO",
  "id": null
}
```

## Error (Platform coin is already activated)

```json
{
  "mmrpc": "2.0",
  "error": "IRIS",
  "error_path": "platform_coin_with_tokens",
  "error_trace": "platform_coin_with_tokens:297]",
  "error_type": "PlatformIsAlreadyActivated",
  "error_data": "IRIS",
  "id": null
}
```

### Error (Parsing the protocol of the platform coin you are trying to activate failed)

```json
{
  "mmrpc": "2.0",
  "error": "Platform coin IRIS protocol parsing failed: invalid type: null, expected adjacently tagged enum CoinProtocol",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:302] prelude:82]",
  "error_type": "CoinProtocolParseError",
  "error_data": {
    "ticker": "IRIS",
    "error": "invalid type: null, expected adjacently tagged enum CoinProtocol"
  },
  "id": null
}
```

### Error (Unexpected platform protocol found for the platform coin you are trying to activate)

```json
{
  "mmrpc": "2.0",
  "error": "Unexpected platform protocol BCH { slp_prefix: \"simpleledger\" } for BCH",
  "error_path": "platform_coin_with_tokens.prelude.tendermint_with_assets_activation",
  "error_trace": "platform_coin_with_tokens:302] prelude:90] tendermint_with_assets_activation:92]",
  "error_type": "UnexpectedPlatformProtocol",
  "error_data": {
    "ticker": "BCH",
    "protocol": {
      "type": "BCH",
      "protocol_data": {
        "slp_prefix": "simpleledger"
      }
    }
  },
  "id": null
}
```

### Error (Config of the token you are trying to activate is not found)

```json
{
  "mmrpc": "2.0",
  "error": "Token GALT config is not found",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:314] platform_coin_with_tokens:109] prelude:79]",
  "error_type": "TokenConfigIsNotFound",
  "error_data": "GALT",
  "id": null
}
```

### Error (Parsing the protocol of the token you are trying to activate failed)

```json
{
  "mmrpc": "2.0",
  "error": "Token BABYDOGE-BEP20 protocol parsing failed: unknown variant `WOOF`, expected one of `UTXO`, `QTUM`, `QRC20`, `ETH`, `ERC20`, `SLPTOKEN`, `BCH`, `TENDERMINT`, `TENDERMINTTOKEN`, `LIGHTNING`, `SOLANA`, `SPLTOKEN`, `ZHTLC`",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:314] platform_coin_with_tokens:109] prelude:82]",
  "error_type": "TokenProtocolParseError",
  "error_data": {
    "ticker": "BABYDOGE-BEP20",
    "error": "unknown variant `WOOF`, expected one of `UTXO`, `QTUM`, `QRC20`, `ETH`, `ERC20`, `SLPTOKEN`, `BCH`, `TENDERMINT`, `TENDERMINTTOKEN`, `LIGHTNING`, `SOLANA`, `SPLTOKEN`, `ZHTLC`"
  },
  "id": null
}
```

### Error (Unexpected protocol is found in the config of the token you are trying to activate)

```json
{
  "mmrpc": "2.0",
  "error": "Unexpected token protocol UTXO for KMD",
  "error_path": "platform_coin_with_tokens.prelude.tendermint_with_assets_activation",
  "error_trace": "platform_coin_with_tokens:314] platform_coin_with_tokens:109] prelude:90] tendermint_with_assets_activation:101]",
  "error_type": "UnexpectedTokenProtocol",
  "error_data": {
    "ticker": "KMD",
    "protocol": {
      "type": "UTXO"
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
