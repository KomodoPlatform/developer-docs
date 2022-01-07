# enable\_bch\_with\_tokens

The AtomicDEX-API supports Bitcoin Cash SLP tokens. Activation of these tokens is a little different to other coins and protocols. Using this method, you can enable multiple SLP tokens in a single command.


| parameter              | Type     | Description                               |
| ---------------------- | -------- | ----------------------------------------- |
| ticker                 | string   | Ticker of the platform BCH protocol coin. |
| allow_slp_unsafe_conf  | boolean  | Optional. Ticker of the platform BCH protocol coin. If `true`, allows bchd_urls to be empty. **Warning:** it is highly unsafe to do so as it may lead to invalid SLP transactions generation and tokens burning. Defaults to `false`. |
| bchd_urls              | string   | An array of strings. URLs of BCHD gRPC API servers that are used for SLP tokens transactions validation. It's recommended to add as many servers as possible. The URLs list can be found at https://bchd.fountainhead.cash/.          |
| mode                   | string   | Utxo RPC mode. Options: `{ "rpc":"Native" }` if running a native blockchain, or `"rpc":"Electrum"` to use electrum RPCs. If using electrum, a list of electrum servers is required under `rpc_data.servers` |
| tx_history             | boolean  | If `true`, spawns a background loop to store the local cache of address(es) transactions. Defaults to `false`. |
| slp_tokens_requests    | string   | Array of SLP activation requests. SLP activation requests contain mandatory `ticker` and optional `required_confirmations` fields. If required_confirmations is not set for a token, then MM2 will use the confirmations setting from its coins config or platform coin. |
| required_confirmations | integer  | Optional. Confirmations to wait for steps in swap. Defaults to value in the coins file if not set. |
| requires_notarization  | boolean  | Optional. Has no effect on BCH. Defaults to `false`. |
| address_format.format  | string   | Optional. Overwrites the address format from coins file, if set. Options: `{"format":"standard"}` for legacy/standard address format, `{"format":"cashaddress"}` for cash address format |
| address_format.network | string   | Optional. Overwrites the address format from coins file, if set. Options: `{"format":"standard"}` for legacy/standard address format, `{"format":"cashaddress"}` for cash address format |
| utxo_merge_params      | boolean  | Optional. If defined, will spawn a background loop that checks the number of UTXOs every `check_every seconds` and merges `max_merge_at_once` utxos into a single utxo if the total exceeds `merge_at`. Recommended for addresses with high trading activity or mining which can increase the number of UTXOs in the address, leading to delays in RPC response (or in extreme cases, connection timing out). |


## Example using Electrum servers on testnet with tx_history, cashaddress format and automated utxo merging.


```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"enable_bch_with_tokens",
  "mmrpc":"2.0",
  "params":{
    "ticker":"tBCH",
    "allow_slp_unsafe_conf":false,
    "bchd_urls":[
      "https://bchd-testnet.greyh.at:18335"
    ],
    "mode":{
      "rpc":"Electrum",
      "rpc_data":{
        "servers":[
          {
            "url":"electroncash.de:50003"
          },
          {
            "url":"tbch.loping.net:60001"
          },
          {
            "url":"blackie.c3-soft.com:60001"
          },
          {
            "url":"bch0.kister.net:51001"
          },
          {
            "url":"testnet.imaginary.cash:50001"
          }
        ]
      }
    },
    "tx_history":true,
    "slp_tokens_requests":[
      {
        "ticker":"USDF",
        "required_confirmations": 4
      }
    ],
    "required_confirmations":5,
    "requires_notarization":false,
    "address_format":{
      "format":"cashaddress",
      "network":"bchtest"
    },
    "utxo_merge_params":{
      "merge_at":50,
      "check_every":10,
      "max_merge_at_once":25
    }
  }
}'
```


## Response

```json
{
  "mmrpc":"2.0",
  "result":{
    "current_block":1480481,
    "bch_addresses_infos":{
      "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66":{
        "derivation_method":{
          "type":"Iguana"
        },
        "pubkey":"036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202c",
        "balances":{
          "spendable":"0.11398301",
          "unspendable":"0.00001"
        }
      }
    },
    "slp_addresses_infos":{
      "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8":{
        "derivation_method":{
          "type":"Iguana"
        },
        "pubkey":"036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202c",
        "balances":{
          "USDF":{
            "spendable":"5.2974",
            "unspendable":"0"
          }
        }
      }
    }
  },
  "id":null
}
```

## Errors (tBCH already activated)
In this case, you need to [disable](../atomicdex-api-legacy/disable.md) tBCH and try again.
```json
{
  "mmrpc":"2.0",
  "error":"tBCH",
  "error_path":"platform_coin_with_tokens",
  "error_trace":"platform_coin_with_tokens:281]",
  "error_type":"PlatformIsAlreadyActivated",
  "error_data":"tBCH",
  "id":null
}
```

## Error (Platform config missing from coins file)
```json
{
  "mmrpc":"2.0",
  "error":"Platform tBCH-wrong config is not found",
  "error_path":"platform_coin_with_tokens.prelude",
  "error_trace":"platform_coin_with_tokens:286] prelude:56]",
  "error_type":"PlatformConfigIsNotFound",
  "error_data":"tBCH-wrong",
  "id":null
}
```

## Errors (Platform protocol invalid from coins file)
```json
{
  "mmrpc":"2.0",
  "error":"Unexpected platform protocol UTXO for BTC",
  "error_path":"platform_coin_with_tokens.prelude.bch_with_tokens_activation",
  "error_trace":"platform_coin_with_tokens:286] prelude:67] bch_with_tokens_activation:127]",
  "error_type":"UnexpectedPlatformProtocol",
  "error_data":{
    "ticker":"BTC",
    "protocol":{
      "type":"UTXO"
    }
  },
  "id":null
}
```

```json
{
  "mmrpc":"2.0",
  "error":"Unexpected token protocol ERC20 { platform: \"ETH\", contract_address: \"0xdAC17F958D2ee523a2206206994597C13D831ec7\" } for USDT-ERC20",
  "error_path":"platform_coin_with_tokens.prelude.slp_token_activation",
  "error_trace":"platform_coin_with_tokens:301] platform_coin_with_tokens:114] prelude:67] slp_token_activation:47]",
  "error_type":"UnexpectedTokenProtocol",
  "error_data":{
    "ticker":"USDT-ERC20",
    "protocol":{
      "type":"ERC20",
      "protocol_data":{
        "platform":"ETH",
        "contract_address":"0xdAC17F958D2ee523a2206206994597C13D831ec7"
      }
    }
  },
  "id":null
}
```


## Error (Unsafe configuration with empty bchd_urls param)
```json
{
  "mmrpc":"2.0",
  "error":"Error Using empty bchd_urls is unsafe for SLP users! on platform coin tBCH creation",
  "error_path":"platform_coin_with_tokens.bch_with_tokens_activation",
  "error_trace":"platform_coin_with_tokens:290] bch_with_tokens_activation:212]",
  "error_type":"PlatformCoinCreationError",
  "error_data":{
    "ticker":"tBCH",
    "error":"Using empty bchd_urls is unsafe for SLP users!"
  },
  "id":null
}
```


## Error (conf file not found when enabling in native mode)
```json
{
  "mmrpc":"2.0",
  "error":"Error bch:633] utxo:1704] utxo:995] Error parsing the native wallet configuration '/home/user/.Bitcoin Cash Testnet/Bitcoin Cash Testnet.conf': No such file or directory (os error 2) on platform coin tBCH creation",
  "error_path":"platform_coin_with_tokens.bch_with_tokens_activation",
  "error_trace":"platform_coin_with_tokens:290] bch_with_tokens_activation:212]",
  "error_type":"PlatformCoinCreationError",
  "error_data":{
    "ticker":"tBCH",
    "error":"bch:633] utxo:1704] utxo:995] Error parsing the native wallet configuration '/home/user/.Bitcoin Cash Testnet/Bitcoin Cash Testnet.conf': No such file or directory (os error 2)"
  },
  "id":null
}
```


## Error (Electrum server not responding)
```json
{
  "mmrpc":"2.0",
  "error":"Error bch:633] utxo:1667] Failed to connect to at least 1 of [ElectrumRpcRequest { url: \"bch0.kister.net:5100\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"testnet.imaginary.cash:5000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"blackie.c3-soft.com:6000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"tbch.loping.net:6000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"electroncash.de:5000\", protocol: TCP, disable_cert_verification: false }] in 5 seconds. on platform coin tBCH creation",
  "error_path":"platform_coin_with_tokens.bch_with_tokens_activation",
  "error_trace":"platform_coin_with_tokens:290] bch_with_tokens_activation:212]",
  "error_type":"PlatformCoinCreationError",
  "error_data":{
    "ticker":"tBCH",
    "error":"bch:633] utxo:1667] Failed to connect to at least 1 of [ElectrumRpcRequest { url: \"bch0.kister.net:5100\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"testnet.imaginary.cash:5000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"blackie.c3-soft.com:6000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"tbch.loping.net:6000\", protocol: TCP, disable_cert_verification: false }, ElectrumRpcRequest { url: \"electroncash.de:5000\", protocol: TCP, disable_cert_verification: false }] in 5 seconds."
  },
  "id":null
}
```



# enable\_slp

The `enable_slp` method allows you to activate additional SLP tokens

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"enable_slp",
  "mmrpc":"2.0",
  "params":{
    "ticker":"sTST",
    "activation_params": {
      "required_confirmations": 3
    }
  }
}'
```

ticker - string, mandatory.
required_confirmations - number (unsigned integer), optional. If not set, MM2 will use the required_confirmations from the coins config. If neither of both is set, MM2 will use required_confirmations from the platform coin.

## Response

```json

{
  "mmrpc":"2.0",
  "result":{
    "balances":{
      "slptest:qqerzx34rz9fgwwxepnwssjkf4h7l5aq9qfmswjt20":{
        "spendable":"0","unspendable":"0"
      }
    },
    "token_id":"037eb9fc8a5f0faed4e5c15c15e69cd9f5d8a87b5f11e0ba3dce17b562705d6c",
    "platform_coin":"tBCH",
    "required_confirmations":3
  },
  "id":null
}
```

## Errors

```json
{
  "mmrpc":"2.0",
  "error":"Platform coin tBCH is not activated",
  "error_path":"token.lp_coins",
  "error_trace":"token:102] lp_coins:1924]",
  "error_type":"PlatformCoinIsNotActivated",
  "error_data":"tBCH",
  "id":null
}
```


```json
{
  "mmrpc":"2.0",
  "error":"Token USDF is already activated",
  "error_path":"token",
  "error_trace":"token:95]",
  "error_type":"TokenIsAlreadyActivated",
  "error_data":"USDF",
  "id":null
}
```


```json
{
  "mmrpc":"2.0",
  "error":"Token USDF-WRONG config is not found",
  "error_path":"token.prelude",
  "error_trace":"token:98] prelude:56]",
  "error_type":"TokenConfigIsNotFound",
  "error_data":"USDF-WRONG",
  "id":null
}
```


```json
{
  "mmrpc":"2.0",
  "error":"Unexpected token protocol ERC20 { platform: \"ETH\", contract_address: \"0xdAC17F958D2ee523a2206206994597C13D831ec7\" } for USDT-ERC20",
  "error_path":"token.prelude.slp_token_activation",
  "error_trace":"token:98] prelude:67] slp_token_activation:47]",
  "error_type":"UnexpectedTokenProtocol",
  "error_data":{
    "ticker":"USDT-ERC20",
    "protocol":{
      "type":"ERC20",
      "protocol_data":{
        "platform":"ETH",
        "contract_address":"0xdAC17F958D2ee523a2206206994597C13D831ec7"
      }
    }
  },
  "id":null
}
```


```json
{
  "mmrpc":"2.0",
  "error":"JsonRpcError { client_info: \"coin: tBCH\", request: JsonRpcRequest { jsonrpc: \"2.0\", id: \"13\", method: \"blockchain.scripthash.listunspent\", params: [String(\"4923eb8797ca66b1814933a1fdf2e27069394d604451550ba596fd50b9328be2\")] }, error: Transport(\"rpc_clients:1406] rpc_clients:1408] [\\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\"]\") }",
  "error_path":"token.slp_token_activation.rpc_clients",
  "error_trace":"token:112] slp_token_activation:108] rpc_clients:1645]",
  "error_type":"Transport",
  "error_data":"JsonRpcError { client_info: \"coin: tBCH\", request: JsonRpcRequest { jsonrpc: \"2.0\", id: \"13\", method: \"blockchain.scripthash.listunspent\", params: [String(\"4923eb8797ca66b1814933a1fdf2e27069394d604451550ba596fd50b9328be2\")] }, error: Transport(\"rpc_clients:1406] rpc_clients:1408] [\\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\"]\") }",
  "id":null
}
```



## my_tx_history

It currently works only for BCH and SLP protocols. Implementation for all other UTXO coins (and maybe other protocols) will be done later.

Request (tBCH with page number)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"my_tx_history",
  "mmrpc":"2.0",
  "params": {
    "coin": "tBCH",
    "limit": 2,
    "paging_options": {
      "PageNumber": 2
    }
  }
}'
```


## Response
```json
{
  "mmrpc":"2.0",
  "result":{
    "coin":"tBCH",
    "current_block":1480496,
    "transactions":[
      {
        "tx_hex":"0100000001a789174935fb6af2d669b52d03e4dc37dbf0d6afced2d598c54bb692c02367d7010000006b483045022100c3fee0b751f098debd3cfd6befdcd7210f192840143655dee95157c20c9731920220548dab4ddaabd4da92c838d036853a97d6ab98af6d4d8894f82f261c9ed14aa34121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff013dfcad00000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88acda865161",
        "tx_hash":"091877294268b2b1734255067146f15c3ac5e6199e72cd4f68a8d9dec32bb0c0",
        "from":[
          "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66"
        ],
        "to":[
          "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66"
        ],
        "total_amount":"0.11403301",
        "spent_by_me":"0.11403301",
        "received_by_me":"0.11402301",
        "my_balance_change":"-0.00001000",
        "block_height":1467009,
        "timestamp":1632733367,
        "fee_details":{
          "type":"Utxo",
          "coin":"tBCH",
          "amount":"0.00001"
        },
        "coin":"tBCH",
        "internal_id":"091877294268b2b1734255067146f15c3ac5e6199e72cd4f68a8d9dec32bb0c0",
        "transaction_type":"StandardTransfer",
        "confirmations":13488
      },
      {
        "tx_hex":"010000000190e35c09c83b5818b441c18a2d5ec54734851e5581fb21bde7936e77c6c3dca8030000006b483045022100e6b1415cbd81f2d04360597fba65965bc77ab5a972f5b8f8d5c0f1b1912923c402206a63f305f03e9c49ffba6c71c7a76ef60631f67dce7631f673a0e8485b86898d4121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff020000000000000000376a04534c500001010453454e4420bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb70800000000000003e82500ae00000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88ac62715161",
        "tx_hash":"d76723c092b64bc598d5d2ceafd6f0db37dce4032db569d6f26afb35491789a7",
        "from":[
          "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66"
        ],
        "to":[
          "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66"
        ],
        "total_amount":"0.11404301",
        "spent_by_me":"0.11404301",
        "received_by_me":"0.11403301",
        "my_balance_change":"-0.00001000",
        "block_height":1467000,
        "timestamp":1632728165,
        "fee_details":{
          "type":"Utxo",
          "coin":"tBCH",
          "amount":"0.00001"
        },
        "coin":"tBCH",
        "internal_id":"d76723c092b64bc598d5d2ceafd6f0db37dce4032db569d6f26afb35491789a7",
        "transaction_type":"StandardTransfer",
        "confirmations":13497
      }
    ],
    "sync_status":{
      "state":"InProgress",
      "additional_info":{
        "transactions_left":123
      }
    },
    "limit":2,
    "skipped":2,
    "total":9,
    "total_pages":5,
    "paging_options":{
      "PageNumber":2
    }
  },
  "id":null
}
```


## Request (USDF with FromId)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"my_tx_history",
  "mmrpc":"2.0",
  "params": {
    "coin": "USDF",
    "limit": 2,
    "paging_options": {
      "FromId": "433b641bc89e1b59c22717918583c60ec98421805c8e85b064691705d9aeb970"
    }
  }
}'
```


## Response

```json
{
  "mmrpc":"2.0",
  "result":{
    "coin":"USDF",
    "current_block":1480496,
    "transactions":[
      {
        "tx_hex":"010000000270fba4f0921a57c550bfe911fa436757cc65f56825f2ff0581aed9775a72fb9c020000006b483045022100c0b9faeb97307ed33db1ac5c5b1b189d7b18267676a3e01d65a48d310651779302205e5be1e1d5ebfeed6994f52c1cc1af2908ff2d9d9b7eb846c7e715e9673e228a4121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff70fba4f0921a57c550bfe911fa436757cc65f56825f2ff0581aed9775a72fb9c030000006b483045022100965eed3d4152262adbacc52f928b59385480cd4ef44e899d2064a6f38503794902205cebbf1abaab0c116f4b63417cdf6a13dd681cf75e520e26caa7257f9064c6454121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff040000000000000000406a04534c500001010453454e4420bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb70800000000000003e808000000000000f9e7e80300000000000017a914fe9318c279369c68cb240c88ef2c2df18cea63e087e8030000000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88acd7bf4601000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88acc3c7ee60",
        "tx_hash":"eebc3d0d231be6a0569c197ffad3f97ab7b0f1d64631640807babae509c918f4",
        "from":[
          "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8"
        ],
        "to":[
          "slptest:prlfxxxz0ymfc6xtysxg3mev9hcce6nruq74at6frt",
          "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8"
        ],
        "total_amount":"6.4975",
        "spent_by_me":"6.4975",
        "received_by_me":"6.3975",
        "my_balance_change":"-0.1000",
        "block_height":1456229,
        "timestamp":1626261653,
        "fee_details":{
          "type":"Utxo",
          "coin":"tBCH",
          "amount":"0.00002"
        },
        "coin":"USDF",
        "internal_id":"cd6ec10b0cd9747ddc66ac5c97c2d7b493e8cea191bc2d847b3498719d4bd989",
        "transaction_type":{
          "TokenTransfer":"bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb7"
        },
        "confirmations":24268
      },
      {
        "tx_hex":"01000000026fd35b26526cebfc7df0b229bde298b04aa853c0499c4c54c12df0118ed84052020000006a47304402203bd00a6a61434abb4fe4359aad6991e28eeb224fc1f4524309bebca89fbe5807022062a38c4e1da944942c6722141df6bae9c44c07ed52fd736e1f8c75e15aaf99f44121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff6fd35b26526cebfc7df0b229bde298b04aa853c0499c4c54c12df0118ed84052030000006b483045022100909a8d0be19172c68c2889f240b1531d4a921bf9df8d081fce172d95c7a971cd02206ab0de0ed044b002341e72678106c558cd5e8565352fd78dcdf88a574c409a754121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff040000000000000000406a04534c500001010453454e4420bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb708000000000000000108000000000000fdcfe8030000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ace8030000000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88ac8fcb4601000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88acc0c7ee60",
        "tx_hash":"9cfb725a77d9ae8105fff22568f565cc576743fa11e9bf50c5571a92f0a4fb70",
        "from":[
          "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8"
        ],
        "to":[
          "slptest:qr9pupr5t6x2p3sd33vgz5ca2xlvgur58u8m6uhlr8",
          "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8"
        ],
        "total_amount":"6.4976",
        "spent_by_me":"6.4976",
        "received_by_me":"6.4975",
        "my_balance_change":"-0.0001",
        "block_height":1456229,
        "timestamp":1626261653,
        "fee_details":{
          "type":"Utxo",
          "coin":"tBCH",
          "amount":"0.00002"
        },
        "coin":"USDF",
        "internal_id":"1c1e68357cf5a6dacb53881f13aa5d2048fe0d0fab24b76c9ec48f53884bed97",
        "transaction_type":{
          "TokenTransfer":"bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb7"
        },
        "confirmations":24268
      }
    ],
    "sync_status":{
      "state":"Finished"
    },
    "limit":2,
    "skipped":6,
    "total":121,
    "total_pages":61,
    "paging_options":{
      "FromId":"433b641bc89e1b59c22717918583c60ec98421805c8e85b064691705d9aeb970"
    }
  },
  "id":null
}
```

## Errors

```json
{
  "mmrpc":"2.0",
  "error":"USDF",
  "error_path":"my_tx_history_v2.lp_coins",
  "error_trace":"my_tx_history_v2:324] lp_coins:1924]",
  "error_type":"CoinIsNotActive",
  "error_data":"USDF",
  "id":null
}
```


```json
{
  "mmrpc":"2.0",
  "error":"BNBT",
  "error_path":"my_tx_history_v2",
  "error_trace":"my_tx_history_v2:336]",
  "error_type":"NotSupportedFor",
  "error_data":"BNBT",
  "id":null
}
```


```json
{
  "mmrpc":"2.0",
  "error":"Storage is not initialized for tBCH",
  "error_path":"my_tx_history_v2",
  "error_trace":"my_tx_history_v2:343]",
  "error_type":"StorageIsNotInitialized",
  "error_data":"Storage is not initialized for tBCH",
  "id":null
}
```


```json
{
  "mmrpc":"2.0",
  "error":"SqliteFailure(Error { code: Unknown, extended_code: 1 }, Some(\"no such column: block_height\"))",
  "error_path":"my_tx_history_v2.sql_tx_history_storage",
  "error_trace":"my_tx_history_v2:351] sql_tx_history_storage:472]",
  "error_type":"StorageError",
  "error_data":"SqliteFailure(Error { code: Unknown, extended_code: 1 }, Some(\"no such column: block_height\"))",
  "id":null
}
```


```json
{
  "mmrpc":"2.0",
  "error":"utxo_common:1525] rpc_clients:1699] JsonRpcError { client_info: \"coin: tBCH\", request: JsonRpcRequest { jsonrpc: \"2.0\", id: \"16\", method: \"blockchain.headers.subscribe\", params: [] }, error: Transport(\"rpc_clients:1406] rpc_clients:1408] [\\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\"]\") }",
  "error_path":"my_tx_history_v2",
  "error_trace":"my_tx_history_v2:349]",
  "error_type":"RpcError",
  "error_data":"utxo_common:1525] rpc_clients:1699] JsonRpcError { client_info: \"coin: tBCH\", request: JsonRpcRequest { jsonrpc: \"2.0\", id: \"16\", method: \"blockchain.headers.subscribe\", params: [] }, error: Transport(\"rpc_clients:1406] rpc_clients:1408] [\\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\", \\\"rpc_clients:2271] rpc_clients:2269] 12s timed out waiting for the future to complete\\\"]\") }",
  "id":null
}
```
