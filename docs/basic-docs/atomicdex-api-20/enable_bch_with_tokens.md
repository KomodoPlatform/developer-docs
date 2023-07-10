# enable_bch_with_tokens

The Komodo DeFi Framework supports Bitcoin Cash SLP tokens. Using this method, you can enable BCH/tBCH along with multiple SLP tokens in a single command.

| parameter              | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticker                 | string  | Ticker of the platform protocol coin. Options: `BCH` or `tBCH`                                                                                                                                                                                                                                                                                                                                                |
| allow_slp_unsafe_conf  | boolean | Optional. If `true`, allows bchd_urls to be empty. **Warning:** it is highly unsafe to do so as it may lead to invalid SLP transactions generation and tokens burning. Defaults to `false`.                                                                                                                                                                                                                   |
| bchd_urls              | string  | An array of strings. URLs of BCHD gRPC API servers that are used for SLP tokens transactions validation. It's recommended to add as many servers as possible. The URLs list can be found at https://bchd.fountainhead.cash/.                                                                                                                                                                                  |
| mode                   | string  | Utxo RPC mode. Options: `{ "rpc":"Native" }` if running a native blockchain node, or `"rpc":"Electrum"` to use electrum RPCs. If using electrum, a list of electrum servers is required under `rpc_data.servers`                                                                                                                                                                                              |
| tx_history             | boolean | If `true`, spawns a background loop to store the local cache of address(es) transactions. Defaults to `false`.                                                                                                                                                                                                                                                                                                |
| slp_tokens_requests    | string  | Array of SLP activation requests. SLP activation requests contain mandatory `ticker` and optional `required_confirmations` fields. If required_confirmations is not set for a token, then MM2 will use the confirmations setting from its coins config or platform coin.                                                                                                                                      |
| required_confirmations | integer | Optional. Confirmations to wait for steps in swap. Defaults to value in the coins file if not set.                                                                                                                                                                                                                                                                                                            |
| requires_notarization  | boolean | Optional. Has no effect on BCH. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                          |
| address_format.format  | string  | Optional. Overwrites the address format from coins file, if set. Options: `{"format":"standard"}` for legacy/standard address format, `{"format":"cashaddress"}` for cash address format                                                                                                                                                                                                                      |
| address_format.network | string  | Optional. Overwrites the address network from coins file, if set. Options: `{"network":"bitcoincash"}` for mainnet, `{"network":"bchreg"}` for regtest, or `{"network":"bchtest"}` for testnet                                                                                                                                                                                                                |
| utxo_merge_params      | boolean | Optional. If defined, will spawn a background loop that checks the number of UTXOs every `check_every seconds` and merges `max_merge_at_once` utxos into a single utxo if the total exceeds `merge_at`. Recommended for addresses with high trading activity or mining which can increase the number of UTXOs in the address, leading to delays in RPC response (or in extreme cases, connection timing out). |

## Example using Electrum servers on testnet with tx_history, cashaddress format and automated utxo merging.

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"enable_bch_with_tokens\",
  \"mmrpc\":\"2.0\",
  \"params\":{
    \"ticker\":\"BCH\",
    \"allow_slp_unsafe_conf\":false,
    \"bchd_urls\":[
      \"https://bchd.imaginary.cash:8335/\"
    ],
    \"mode\":{
      \"rpc\":\"Electrum\",
      \"rpc_data\":{
        \"servers\":[
          {
            \"url\":\"electrum1.cipig.net:10055\"
          },
          {
            \"url\":\"electrum2.cipig.net:10055\"
          },
          {
            \"url\":\"electrum3.cipig.net:10055\"
          },
          {
            \"url\":\"electrum1.cipig.net:20055\",
            \"protocol\": \"SSL\"
          },
          {
            \"url\":\"electrum2.cipig.net:20055\",
            \"protocol\": \"SSL\"
          },
          {
            \"url\":\"electrum3.cipig.net:20055\",
            \"protocol\": \"SSL\"
          }
        ]
      }
    },
    \"tx_history\":true,
    \"slp_tokens_requests\":[
      {
        \"ticker\":\"ASLP-SLP\",
        \"required_confirmations\": 4
      }
    ],
    \"required_confirmations\":5,
    \"requires_notarization\":false,
    \"address_format\":{
      \"format\":\"cashaddress\",
      \"network\":\"bitcoincash\"
    },
    \"utxo_merge_params\":{
      \"merge_at\":50,
      \"check_every\":10,
      \"max_merge_at_once\":25
    }
  }
}"
```

## Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "current_block": 1480481,
    "bch_addresses_infos": {
      "bitcoincash:qrf5vpn78s7rjexrjhlwyzzeg7gw98k7t5qx64fztj": {
        "derivation_method": {
          "type": "Iguana"
        },
        "pubkey": "036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202c",
        "balances": {
          "spendable": "0.11398301",
          "unspendable": "0.00001"
        }
      }
    },
    "slp_addresses_infos": {
      "simpleledger:qrf5vpn78s7rjexrjhlwyzzeg7gw98k7t5va3wuz4v": {
        "derivation_method": {
          "type": "Iguana"
        },
        "pubkey": "036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202c",
        "balances": {
          "ASLP": {
            "spendable": "5.2974",
            "unspendable": "0"
          }
        }
      }
    }
  },
  "id": null
}
```

## Errors (BCH already activated)

In this case, you need to [disable](../atomicdex-api-legacy/disable_coin.md) BCH and try again.

```json
{
  "mmrpc": "2.0",
  "error": "BCH",
  "error_path": "platform_coin_with_tokens",
  "error_trace": "platform_coin_with_tokens:281]",
  "error_type": "PlatformIsAlreadyActivated",
  "error_data": "BCH",
  "id": null
}
```

## Error (Platform config missing from coins file)

```json
{
  "mmrpc": "2.0",
  "error": "Platform BCH-wrong config is not found",
  "error_path": "platform_coin_with_tokens.prelude",
  "error_trace": "platform_coin_with_tokens:286] prelude:56]",
  "error_type": "PlatformConfigIsNotFound",
  "error_data": "BCH-wrong",
  "id": null
}
```

## Errors (Platform protocol invalid from coins file)

```json
{
  "mmrpc": "2.0",
  "error": "Unexpected platform protocol UTXO for BTC",
  "error_path": "platform_coin_with_tokens.prelude.bch_with_tokens_activation",
  "error_trace": "platform_coin_with_tokens:286] prelude:67] bch_with_tokens_activation:127]",
  "error_type": "UnexpectedPlatformProtocol",
  "error_data": {
    "ticker": "BTC",
    "protocol": {
      "type": "UTXO"
    }
  },
  "id": null
}
```

```json
{
  "mmrpc": "2.0",
  "error": "Unexpected token protocol ERC20 { platform: \"ETH\", contract_address: \"0xdAC17F958D2ee523a2206206994597C13D831ec7\" } for USDT-ERC20",
  "error_path": "platform_coin_with_tokens.prelude.slp_token_activation",
  "error_trace": "platform_coin_with_tokens:301] platform_coin_with_tokens:114] prelude:67] slp_token_activation:47]",
  "error_type": "UnexpectedTokenProtocol",
  "error_data": {
    "ticker": "USDT-ERC20",
    "protocol": {
      "type": "ERC20",
      "protocol_data": {
        "platform": "ETH",
        "contract_address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
      }
    }
  },
  "id": null
}
```

## Error (Unsafe configuration with empty bchd_urls param)

```json
{
  "mmrpc": "2.0",
  "error": "Error Using empty bchd_urls is unsafe for SLP users! on platform coin BCH creation",
  "error_path": "platform_coin_with_tokens.bch_with_tokens_activation",
  "error_trace": "platform_coin_with_tokens:290] bch_with_tokens_activation:212]",
  "error_type": "PlatformCoinCreationError",
  "error_data": {
    "ticker": "BCH",
    "error": "Using empty bchd_urls is unsafe for SLP users!"
  },
  "id": null
}
```

## Error (conf file not found when enabling in native mode)

```json
{
  "mmrpc": "2.0",
  "error": "Error bch:633] utxo:1704] utxo:995] Error parsing the native wallet configuration '/home/user/.Bitcoin Cash Testnet/Bitcoin Cash Testnet.conf': No such file or directory (os error 2) on platform coin tBCH creation",
  "error_path": "platform_coin_with_tokens.bch_with_tokens_activation",
  "error_trace": "platform_coin_with_tokens:290] bch_with_tokens_activation:212]",
  "error_type": "PlatformCoinCreationError",
  "error_data": {
    "ticker": "tBCH",
    "error": "bch:633] utxo:1704] utxo:995] Error parsing the native wallet configuration '/home/user/.Bitcoin Cash Testnet/Bitcoin Cash Testnet.conf': No such file or directory (os error 2)"
  },
  "id": null
}
```

## Error (Electrum server not responding)

```json
{
  "mmrpc": "2.0",
  "error": "Error bch:633] utxo:1667] Failed to connect to at least 1 of [ElectrumRpcRequest { url: \"bch0.kister.net:5100\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"testnet.imaginary.cash:5000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"blackie.c3-soft.com:6000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"tbch.loping.net:6000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"electroncash.de:5000\", protocol: TCP, disable_cert_verification: false }] in 5 seconds. on platform coin tBCH creation",
  "error_path": "platform_coin_with_tokens.bch_with_tokens_activation",
  "error_trace": "platform_coin_with_tokens:290] bch_with_tokens_activation:212]",
  "error_type": "PlatformCoinCreationError",
  "error_data": {
    "ticker": "tBCH",
    "error": "bch:633] utxo:1667] Failed to connect to at least 1 of [ElectrumRpcRequest { url: \"bch0.kister.net:5100\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"testnet.imaginary.cash:5000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"blackie.c3-soft.com:6000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"tbch.loping.net:6000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"electroncash.de:5000\", protocol: TCP, disable_cert_verification: false }] in 5 seconds."
  },
  "id": null
}
```
