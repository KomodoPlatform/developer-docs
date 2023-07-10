## task_enable_utxo_init

UTXO coins are activated using this method. For QTUM coins, refer to [task::enable_qtum::init](#task-enable-qtum-init)

#### Arguments

| Parameter                     | Type    | Description                                                                                                                                                                                                      |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticker                        | string  | The ticker of the coin you want to enable.                                                                                                                                                                       |
| activation_params             | object  | An object containing the actvation parameters below.                                                                                                                                                             |
| .priv_key_policy              | string  | Defaults to `ContextPrivkey`. Set as `Trezor` to activate in Trezor mode.                                                                                                                                        |
| .min_addresses_number         | integer | How many additional addreesses to generate at a minimum.                                                                                                                                                         |
| .scan_policy                  | string  | Whether or not to scan for new addresses. Select from `do_not_scan`, `scan_if_new_wallet` or `scan`. Note that `scan` will result in multple requests to the Komodo DeFi Framework.                              |
| .gap_limit                    | integer | The max number of empty addresses in a row. If transactions were sent to an address outside the `gap_limit`, they will not be identified when scanning.                                                          |
| .mode                         | object  | An object containing RPC type and data parameters as below.                                                                                                                                                      |
| ..rpc                         | string  | UTXO RPC mode. Options: `{ "rpc":"Native" }` if running a native blockchain node, or `"rpc":"Electrum"` to use electrum RPCs. If using electrum, a list of electrum servers is required under `rpc_data.servers` |
| ..rpc_data                    | object  | An object containing electrum server information.                                                                                                                                                                |
| ...servers                    | list    | A list of electrum server URLs                                                                                                                                                                                   |
| ....url                       | object  | The url and port of a coins electrum server                                                                                                                                                                      |
| ....ws_url                    | object  | Optional. Used to define electrum server url/port for websocket connections.                                                                                                                                     |
| ....protocol                  | object  | Defines electrum server protocol as `TCP` or `SSL`. Defaults to `TCP`                                                                                                                                            |
| ....disable_cert_verification | boolean | Optional. For `SSL` electrum connections, this will allow expired certificates.                                                                                                                                  |

#### Response

| Parameter | Type    | Description                                               |
| --------- | ------- | --------------------------------------------------------- |
| task_id   | integer | An identifying number which is used to query task status. |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{

    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::enable_utxo::init\",
    \"params\": {
        \"ticker\": \"KMD\",
        \"activation_params\": {
            \"mode\": {
                \"rpc\": \"Electrum\",
                \"rpc_data\": {
                    \"servers\": [
                        {
                            \"url\": \"electrum2.cipig.net:10001\"
                        },
                        {
                            \"url\": \"electrum3.cipig.net:20001\",
                            \"ws_url\": \"electrum3.cipig.net:30001\",
                            \"protocol\": \"SSL\"
                        }
                    ]
                }
            },
            \"scan_policy\": \"scan_if_new_wallet\",
            \"priv_key_policy\": \"Trezor\",
            \"min_addresses_number\": 3,
            \"gap_limit\": 20
        }
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "task_id": 1
  },
  "id": null
}
```

</collapse-text>

</div>

## task_enable_utxo_status

After running the `task::enable_utxo::init` method, we can query the status of activation to check its progress.
The response will return the following:

- Result of the task (success or error)
- Progress status (what state the task is in)
- Required user action (what user should do before the task can continue)

#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.               |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true`. |

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::enable_utxo::status\",
    \"params\": {
        \"task_id\": 0,
        \"forget_if_finished\": false
    }
}"
```

#### Response (ready, successful, Trezor mode)

| Parameter           | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| status              | string          | A short indication of how the requested process is progressing.                                                                                                                                                                                                                                                                                                                                                                                              |
| details.result      | object          | Depending on the state of process progress, this will contain different information as detailed in the items below.                                                                                                                                                                                                                                                                                                                                          |
| .ticker             | string          | The ticker of the coin being activated                                                                                                                                                                                                                                                                                                                                                                                                                       |
| .current_block      | integer         | The block height of the coin being activated                                                                                                                                                                                                                                                                                                                                                                                                                 |
| .wallet_balance     | object          | Information about the addresses of the coin being activated                                                                                                                                                                                                                                                                                                                                                                                                  |
| ..wallet_type       | string          | In Trezor mode, this will return `HD`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ..accounts          | list            | A list of addresses and related information for the coin being activated                                                                                                                                                                                                                                                                                                                                                                                     |
| ...account_index    | integer         | `ACCOUNT_ID` child in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` BIP44 derivation path. **Please don't confuse with mm2 global Iguana/HD/HW account.**                                                                                                                                                                                                                                                                                                   |
| ...derivation_path  | string          | Derivation path up to the `COIN` child. E.g. `"m/44'/141'/0'"`                                                                                                                                                                                                                                                                                                                                                                                               |
| ...total_balance    | object          | Combined total spendable and unconfirmed balances of all account addresses                                                                                                                                                                                                                                                                                                                                                                                   |
| ....spendable       | string(numeric) | Combined total spendable balance of all account addreesses                                                                                                                                                                                                                                                                                                                                                                                                   |
| ....unspendable     | string(numeric) | Combined total unspendable balance of all account addreesses                                                                                                                                                                                                                                                                                                                                                                                                 |
| ...addresses        | list            | A list of addresses in the account for the coin being activated                                                                                                                                                                                                                                                                                                                                                                                              |
| ....address         | string          | One of the addresses in the account for the coin being activated                                                                                                                                                                                                                                                                                                                                                                                             |
| ....derivation_path | string          | The [BIP44 derivation path](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) of the address.                                                                                                                                                                                                                                                                                                                                                  |
| ....chain           | string          | Returns `External` when `CHAIN=0` in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` derivation path. Returns `Internal` when `CHAIN=1` in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` derivation path. External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| ....balance         | object          | Contains the spendable and unspendable balance for this address                                                                                                                                                                                                                                                                                                                                                                                              |
| .....spendable      | string(numeric) | Spendable balance for this address                                                                                                                                                                                                                                                                                                                                                                                                                           |
| .....unspendable    | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions)                                                                                                                                                                                                                                                                                                                                                                           |

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "Ok",
    "details": {
      "result": {
        "ticker": "RICK",
        "current_block": 1529989,
        "wallet_balance": {
          "wallet_type": "HD",
          "accounts": [
            {
              "account_index": 0,
              "derivation_path": "m/44'/141'/0'",
              "total_balance": {
                "spendable": "7.74199",
                "unspendable": "0"
              },
              "addresses": [
                {
                  "address": "RFarfkYdmMVv9q4dHTmHUgS5j6nBy6qate",
                  "derivation_path": "m/44'/141'/0'/0/0",
                  "chain": "External",
                  "balance": {
                    "spendable": "0",
                    "unspendable": "0"
                  }
                },
                {
                  "address": "RUu1JYSAYVmSLL2Nb5eLNdenp1JtHcReYZ",
                  "derivation_path": "m/44'/141'/0'/0/1",
                  "chain": "External",
                  "balance": {
                    "spendable": "7.74199",
                    "unspendable": "0"
                  }
                },
                {
                  "address": "RTnduXSuRJegfMXf7nQM6C5gS68sbpL7AY",
                  "derivation_path": "m/44'/141'/0'/1/0",
                  "chain": "Internal",
                  "balance": {
                    "spendable": "0",
                    "unspendable": "0"
                  }
                }
              ]
            }
          ]
        }
      }
    }
  },
  "id": null
}
```

</collapse-text>

</div>

#### Response (ready, successful, Iguana mode)

| Parameter       | Type            | Description                                                                                                         |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| status          | string          | A short indication of how the requested process is progressing.                                                     |
| details.result  | object          | Depending on the state of process progress, this will contain different information as detailed in the items below. |
| .ticker         | string          | The ticker of the coin being activated                                                                              |
| .current_block  | integer         | The block height of the coin being activated                                                                        |
| .wallet_balance | object          | Information about the addresses of the coin being activated                                                         |
| ..wallet_type   | string          | In Trezor mode, this will return `HD`                                                                               |
| ..address       | string          | One of the addresses in the account for the coin being activated                                                    |
| ..balance       | object          | Contains the spendable and unspendable balance for this address                                                     |
| ...spendable    | string(numeric) | Spendable balance for this address                                                                                  |
| ...unspendable  | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions)                                  |

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "Ok",
    "details": {
      "result": {
        "current_block": 1531669,
        "wallet_balance": {
          "wallet_type": "Iguana",
          "address": "RKK5UzcZnXBZNGvS5RqrnycHRiFfnL8fMq",
          "balance": {
            "spendable": "0",
            "unspendable": "0"
          }
        }
      }
    }
  },
  "id": null
}
```

</collapse-text>

</div>

#### Response (in progress)

| Parameter | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| status    | string | Will return `InProgress` if task is not yet comepleted      |
| details   | string | An indication of the current step of the activation process |

Possible In Progress Cases:

- `ActivatingCoin`: The first step of activation. It does not require any action from the user.
- `RequestingWalletBalance`: The first step of activation, while initial balances info is being requested. It does not require any action from the user.
- `Finishing`: Activation process completed
- `WaitingForTrezorToConnect`: Waiting for the user to plugin a Trezor device
- `FollowHwDeviceInstructions`: Waiting for the user to follow the instructions on the device

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "InProgress",
    "details": "RequestingWalletBalance"
  },
  "id": null
}
```

</collapse-text>

</div>

#### Response (ready, error)

| Parameter      | Type   | Description                                                                                                         |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| status         | string | A short indication of how the requested process is progressing.                                                     |
| details.result | object | Depending on the state of process progress, this will contain different information as detailed in the items below. |
| .error         | string | The ticker of the coin being activated                                                                              |
| .error_path    | string | Used for debugging. A reference to the function in code base which returned the error                               |
| .error_trace   | string | Used for debugging. A trace of lines of code which led to the returned error                                        |
| .error_type    | string | An enumerated error identifier to indicate the category of error                                                    |
| .error_data    | string | Additonal context for the error type                                                                                |

Possible Error Cases:

- `TaskTimedOut` - Timed out waiting for coin activation, connecting to the device trezor or for user to confirm pubkey)
- `CoinCreationError` - Error during activation. E.g. incorrect or inactive electrum servers.
- `HwError` - **This is the most important error type.** Unlike other error types, `HwError` requires the GUI / User to check the details in `error_data` field to know which action is required. View the [HwError error type details](trezor_integration.html#Details_for_HwError_error_type) for more info.

## task_enable_utxo_user_action

If the `task::enable_utxo::status` returns `UserActionRequired`, we need to use the `task::enable_utxo::user_action` method to enter our PIN

#### Arguments

| Parameter               | Type            | Description                                                                                                                                                                                      |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| task_id                 | integer         | The identifying number returned when initiating the initialisation process.                                                                                                                      |
| user_action             | object          | Object containing the params below                                                                                                                                                               |
| user_action.action_type | string          | Will be `TrezorPin` for this method                                                                                                                                                              |
| user_action.pin         | string (number) | When the Trezor device is displaying a grid of numbers for PIN entry, this param will contain your Trezor pin, as mapped through your keyboard numpad. See the image below for more information. |

<div style="margin: 2rem; text-align: center; width: 80%">
    <img src="/api_images/trezor_pin.png" />
</div>

#### Response

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| result    | string | The outcome of the request. |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::enable_utxo::user_action\",
    \"params\": {
        \"task_id\": 0,
        \"user_action\": {
            \"action_type\": \"TrezorPin\",
            \"pin\": \"862743\"
        }
    }
}"
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

## task_enable_qtum_init

QTUM coins are activated using this method. For UTXO coins, refer to [task::enable_utxo::init](#task-enable-utxo-init)

#### Arguments

| Parameter                     | Type    | Description                                                                                                                                                                                                      |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticker                        | string  | The ticker of the coin you want to enable.                                                                                                                                                                       |
| activation_params             | object  | An object containing the actvation parameters below.                                                                                                                                                             |
| .priv_key_policy              | string  | Defaults to `ContextPrivkey`. Set as `Trezor` to activate in Trezor mode.                                                                                                                                        |
| .min_addresses_number         | integer | How many additional addreesses to generate at a minimum.                                                                                                                                                         |
| .scan_policy                  | string  | Whether or not to scan for new addresses. Select from `do_not_scan`, `scan_if_new_wallet` or `scan`. Note that `scan` will result in multple requests to the Komodo DeFi Framework.                              |
| .gap_limit                    | integer | The max number of empty addresses in a row. If transactions were sent to an address outside the `gap_limit`, they will not be identified when scanning.                                                          |
| .mode                         | object  | An object containing RPC type and data parameters as below.                                                                                                                                                      |
| ..rpc                         | string  | UTXO RPC mode. Options: `{ "rpc":"Native" }` if running a native blockchain node, or `"rpc":"Electrum"` to use electrum RPCs. If using electrum, a list of electrum servers is required under `rpc_data.servers` |
| ..rpc_data                    | object  | An object containing electrum server information.                                                                                                                                                                |
| ...servers                    | list    | A list of electrum server URLs                                                                                                                                                                                   |
| ....url                       | object  | The url and port of a coins electrum server                                                                                                                                                                      |
| ....ws_url                    | object  | Optional. Used to define electrum server url/port for websocket connections.                                                                                                                                     |
| ....protocol                  | object  | Defines electrum server protocol as `TCP` or `SSL`. Defaults to `TCP`                                                                                                                                            |
| ....disable_cert_verification | boolean | Optional. For `SSL` electrum connections, this will allow expired certificates.                                                                                                                                  |

#### Response

| Parameter | Type    | Description                                               |
| --------- | ------- | --------------------------------------------------------- |
| task_id   | integer | An identifying number which is used to query task status. |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{

    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::enable_qtum::init\",
    \"params\": {
        \"ticker\": \"QTUM\",
        \"activation_params\": {
            \"mode\": {
                \"rpc\": \"Electrum\",
                \"rpc_data\": {
                    \"servers\": [
                        {
                            \"url\": \"electrum2.cipig.net:10050\"
                        },
                        {
                            \"url\": \"electrum3.cipig.net:20050\",
                            \"ws_url\": \"electrum3.cipig.net:30050\",
                            \"protocol\": \"SSL\"
                        }
                    ]
                }
            },
            \"scan_policy\": \"scan_if_new_wallet\",
            \"priv_key_policy\": \"Trezor\",
            \"min_addresses_number\": 3,
            \"gap_limit\": 20
        }
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "task_id": 1
  },
  "id": null
}
```

</collapse-text>

</div>

## task_enable_qtum_status

After running the `task::enable_qtum::init` method, we can query the status of activation to check its progress.
The response will return the following:

- Result of the task (success or error)
- Progress status (what state the task is in)
- Required user action (what user should do before the task can continue)

#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.               |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true`. |

#### Request

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::enable_qtum::status\",
    \"params\": {
        \"task_id\": 0,
        \"forget_if_finished\": false
    }
}"
```

The response formats for this method are the same as the [task::enable_utxo::status](#task-enable-utxo-status) responses.

## task_enable_qtum_user_action

If the `task::enable_qtum::status` returns `UserActionRequired`, we need to use the `task::enable_qtum::user_action` method to enter our PIN

#### Arguments

| Parameter               | Type            | Description                                                                                                                                                                                      |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| task_id                 | integer         | The identifying number returned when initiating the initialisation process.                                                                                                                      |
| user_action             | object          | Object containing the params below                                                                                                                                                               |
| user_action.action_type | string          | Will be `TrezorPin` for this method                                                                                                                                                              |
| user_action.pin         | string (number) | When the Trezor device is displaying a grid of numbers for PIN entry, this param will contain your Trezor pin, as mapped through your keyboard numpad. See the image below for more information. |

<div style="margin: 2rem; text-align: center; width: 80%">
    <img src="/api_images/trezor_pin.png" />
</div>

#### Response

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| result    | string | The outcome of the request. |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::enable_qtum::user_action\",
    \"params\": {
        \"task_id\": 0,
        \"user_action\": {
            \"action_type\": \"TrezorPin\",
            \"pin\": \"862743\"
        }
    }
}"
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

## Error Cases

`CoinCreationError`: Returned when a coin is not supported.

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "Error",
    "details": {
      "error": "Error on platform coin QTUM creation: Coin doesn't support Trezor hardware wallet. Please consider adding the 'trezor_coin' field to the coins config",
      "error_path": "lib.init_qtum_activation.utxo_coin_builder",
      "error_trace": "lib:103] init_qtum_activation:71] utxo_coin_builder:234]",
      "error_type": "CoinCreationError",
      "error_data": {
        "ticker": "QTUM",
        "error": "Coin doesn't support Trezor hardware wallet. Please consider adding the 'trezor_coin' field to the coins config"
      }
    }
  },
  "id": null
}
```
