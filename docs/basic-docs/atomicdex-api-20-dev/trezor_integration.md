# Trezor\_Integration

The AtomicDEX API now is able to activate coins in Iguana and HW modes simultaneously!

For example, you can activate RICK with seed phrase private key like usual, and also activate MORTY with Hardware wallet at the same time.


To get started, [configure and launch the AtomicDEX API]("../atomicdex/atomicdex-setup/get-started-atomicdex.html"), then plug in your Trezor hardware wallet device. 

Below are the new v2 RPC methods for interacting with your Trezor.

Authentication:
- Initialise connection with your Trezor with [task::init_trezor::init]("#task_init_trezor_init")
- Check the status of the connecton with [task::init_trezor::status]("#task_init_trezor_status")
- Authenticate using PIN or phrase with [task::init_trezor::user_action]("#task_init_trezor_user_action")
- Cancel authentication process with [task::init_trezor::cancel]("#task_init_trezor_cancel")

Coin Activation in Hardware Mode:
- Use [task::enable_utxo::init]("#task_enable_utxo_init") for UTXO coins like KMD, BTC and DOGE, and check the activation status with [task::enable_utxo::status]("#task_enable_utxo_status")
- Use [task::enable_qtum::init]("#task_enable_qtum_init") for QTUM Ecosystem coins, and check the activation status with [task::enable_qtum::status]("#task_enable_qtum_status")

Withdrawing your Funds:
- Prepare a transaction with [task::withdraw::init]("#task_withdraw_init")
- Check the status of the transaction preparation with [task::withdraw::status]("#task_withdraw_status")
- Cancel the transaction preparation with [task::withdraw::cancel]("#task_withdraw_cancel")

Viewing Hardware Wallet Coin Balances:
- Initialise the balance request with [task::account_balance::init]("#task_account_balance_init")
- Check the status of the balance request with [task::account_balance::status]("#task_account_balance_status")

Creating New Addresses:
- Use [can_get_new_address]("#can_get_new_address") to determine if your current address has been used, or should be updated.
- Use [get_new_address]("#get_new_address") to generate a new address

Additional information about Hardware Error response types:
- [HwError error type details](#Details_for_HwError_error_type)

**Note:** These methods (and others with a `task::` prefix) will be linked to a numeric `task_id` value which is used to query the status or outcome of the task.


# task\_init_trezor\_init

Before using this method, launch the AtomicDEX API, and plug in your Trezor.


#### Arguments

| Parameter          | Type   | Description                                                          |
| ------------------ | ------ | -------------------------------------------------------------------- |
| device_pubkey      | string | Optional. If known, you can specify the device pubkey. If not known, this will be part of the `task::init_trezor::status` response which you can save for future use |


#### Response

| Parameter  | Type    | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| task_id    | integer | An identifying number which is used to query task status. |


#### :pushpin: Examples

#### Command (without device_pubkey)

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::init_trezor::init\",
    \"params\": {}
}"
```

#### Command (with device_pubkey)

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::init_trezor::init\",
    \"params\": {
        \"device_pubkey\": \"066deb87b0d0500ec2e9b85f5314870b03a53517\"
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
    "mmrpc": "2.0",
    "result":{
        "task_id": 0
    },
    "id": null
}
```

</collapse-text>

</div>



# task\_init\_trezor\_status

After running the `task::init_trezor::init` method, we can query the status of device initialisation to check its progress.


#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.               |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true`. |


#### Response

| Parameter             | Type         | Description                                               |
| --------------------- | -------------| --------------------------------------------------------- |
| status                | string       | A short indication of how the requested process is progressing.                                                                                                    |
| details               | object       | Depending on the state of process progress, this will contain different information as detailed in the items below.                                                |
| details.type          | string       | Type of hardware wallet device (e.g. `Trezor`)                                                                                                                     |
| details.model         | string       | The model of the hardware wallet device  (e.g. `One` or `T`)                                                                                                       |
| details.device_name   | string       | The name of the device as defned by user in Trezor Suite or another wallet application.                                                                            |
| details.device_id     | string (hex) | An unique identifier of the device, set during manufacturing.                                                                                                      |
| details.device_pubkey | string (hex) | The hardware wallet device's pubkey. If included in the `task::init_trezor::init` request, it wll be the same as input. If not, it should be stored for future use.|

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::init_trezor::status\",
    \"params\": {
        \"task_id\": 0,
        \"forget_if_finished\": false
    }
}"
```

#### Response (in progress)

Possible "In progress" Cases:

- `Initializing` - This is the normal task state. It does not require any action from the user.

- `WaitingForTrezorToConnect` - The AtomicDEX API is waiting for the user to plugin a Trezor device.
```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "InProgress",
        "details": "WaitingForTrezorToConnect"
    },
    "id": null
}
```

- `FollowHwDeviceInstructions` - The AtomicDEX API is waiting for the user to follow instructions displayed on the device (e.g. clicking a button to confirm).
```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "InProgress",
        "details": "FollowHwDeviceInstructions"
    },
    "id": null
}
```

- `UserActionRequired` - This will either be `EnterTrezorPin` or `EnterTrezorPassphrase`. Refer to the [task::init_trezor::user_action]("#task_trezor_user_action") section for more information.
```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "UserActionRequired",
        "details": "EnterTrezorPin"
    },
    "id": null
}
```

</collapse-text>

</div>


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ready, successful)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Ok",
        "details": {
            "result": {
                "type": "Trezor",
                "model": "One",
                "device_name": "Fitzchivalry Farseer",
                "device_id": "A1CCF11243A795A84111955E",
                "device_pubkey": "066deb87b0d0500ec2e9b85f5314870b03a53517"
            }
        }
    },
    "id": null
}
```

#### Error Responses (by `error_type`)
:
- `HwContextInitializingAlready` - Returned if user calls `task::init_trezor::init` before the previous `task::init_trezor::init` task has been completed.
```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Error",
        "details": {
            "error": "Hardware Wallet context is initializing already",
            "error_path": "init_hw.crypto_ctx",
            "error_trace": "init_hw:151] crypto_ctx:235]",
            "error_type": "HwContextInitializingAlready"
        }
    },
    "id": null
}
```

- `Timeout` - Task timed out while trying to connect to a device.
```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Error",
        "details": {
            "error": "RPC timed out 300s",
            "error_path": "init_hw.crypto_ctx.hw_client",
            "error_trace": "init_hw:151] crypto_ctx:248] crypto_ctx:354] hw_client:156]",
            "error_type": "Timeout",
            "error_data": {
                "secs": 300,
                "nanos": 0
            }
        }
    },
    "id": null
}
```

- `HwError` - **This is the most important error type.** Unlike other error types, `HwError` requires the GUI / User to check the details in `error_data` field to know which action is required. View the [HwError error type details](#Details_for_HwError_error_type) for more info.



# task\_init\_trezor\_cancel

Use the `task::init_trezor::cancel` method to cancel the initialisation task.


#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.               |


#### Response

| Parameter          | Type     | Description                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| result             | string   | Returns with value `success` when successful, otherwise returns the error values below |
| error              | string   | Description of the error                                                               |
| error_path         | string   | Used for debugging. A reference to the function in code base which returned the error  |
| error_trace        | string   | Used for debugging. A trace of lines of code which led to the returned error           |
| error_type         | string   | An enumerated error identifier to indicate the category of error                       |
| error_data         | string   | Additonal context for the error type                                                   |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::init_trezor::cancel\",
    \"params\": {
        \"task_id\": 0
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ready, successful)

```json
{
    "mmrpc": "2.0",
    "result": "success",
    "id": null
}
```

#### Response (error, task already finished)

```json
{
    "mmrpc": "2.0",
    "error": "Task is finished already",
    "error_path": "init_hw.manager",
    "error_trace": "init_hw:209] manager:104]",
    "error_type": "TaskFinished",
    "error_data": 0,
    "id": null
}

```

</collapse-text>

</div>


# task\_init\_trezor\_user\_action

When you see the pin grid on your device, or it asks for a passphrase word, use this method.


#### Arguments

| Parameter                    | Type            | Description                                                                 |
| ---------------------------- | --------------- | --------------------------------------------------------------------------- |
| task_id                      | integer         | The identifying number returned when initiating the initialisation process. |
| user_action                  | object          | Object containing the params below                                          |
| user_action.action_type      | string          | Either `TrezorPin` or `TrezorPassphrase`, depending on which is requested by responses from related methods returning `"status": "UserActionRequired"`                                            |
| user_action.pin              | string (number) | When the Trezor device is displaying a grid of numbers for PIN entry, this param will contain your Trezor pin, as mapped through your keyboard numpad. See the image below for more information.  |
| user_action.passphrase       | string          | The [passphrase](https://trezor.io/learn/a/passphrases-and-hidden-wallets) functions like an extra word added to your recovery seed, and it used to access hidden wallets. To access the default wallet, input an empty string here. |


<div style="margin: 2rem; text-align: center; width: 80%">
    <img src="/api_images/trezor_pin.png" />
</div>


#### Response

| Parameter             | Type         | Description                 |
| --------------------- | -------------| --------------------------- |
| result                | string       | The outcome of the request. |


NOTE: Even an incorrect PIN will return `success`. This doesn't mean the PIN was accepted, just that it was communicated without errors. If the PIN was incorrect, you will see an error like below in the next response for a method that requires authentication - 

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Error",
        "details": {
            "error": "Error on platform coin KMD creation: Hardware Wallet context is not initialized",
            "error_path": "lib.init_utxo_standard_activation.utxo_coin_builder",
            "error_trace": "lib:103] init_utxo_standard_activation:79] utxo_coin_builder:317]",
            "error_type": "CoinCreationError",
            "error_data": {
                "ticker":"KMD",
                "error":"Hardware Wallet context is not initialized"
            }
        }
    },
    "id": null
}
```


#### :pushpin: Examples

#### Command (for TrezorPin)

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::init_trezor::user_action\",
    \"params\": {
        \"task_id\": 0,
        \"user_action\": {
            \"action_type\": \"TrezorPin\",
            \"pin\": \"862743\"
        }
    }
}"
```

#### Command (for TrezorPassphrase)

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::init_trezor::user_action\",
    \"params\": {
        \"task_id\": 0,
        \"user_action\": {
            \"action_type\": \"TrezorPassphrase\",
            \"passphrase\": \"breakfast\"
        }
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
    "mmrpc":"2.0",
    "result":"success",
    "id":null
}
```

</collapse-text>

</div>


# task\_enable\_utxo\_init

UTXO coins are activated using this method. For QTUM coins, refer to [task::enable_qtum::init]("#task_enable_qtum_init")

#### Arguments

| Parameter                     | Type    | Description                                                                     |
| ----------------------------- | ------- | ------------------------------------------------------------------------------- |
| ticker                        | string  | The ticker of tyhe coin you want to enable.                                     |
| activation_params             | object  | An object containing the actvation parameters below.                            |
| .priv_key_policy              | string  | Defaults to `ContextPrivkey`. Set as `Trezor` to activate in Trezor mode.        |
| .min_addresses_number         | integer | How many additional addreesses to generate at a minimum.                        |
| .scan_policy                  | string  | Whether or not to scan for new addresses. Select from `do_not_scan`, `scan_if_new_wallet` or `scan`. Note that `scan` will result in multple requests to the AtomicDEX-API. |
| .gap_limit                    | integer | The max number of empty addresses in a row. If transactions were sent to an address outside the `gap_limit`, they will not be identified when scanning.                     |
| .mode                         | object  | An object containing RPC type and data parameters as below.                     |
| ..rpc                         | string  | UTXO RPC mode. Options: `{ "rpc":"Native" }` if running a native blockchain node, or `"rpc":"Electrum"` to use electrum RPCs. If using electrum, a list of electrum servers is required under `rpc_data.servers` |
| ..rpc_data                    | object  | An object containing electrum server information.                               |
| ...servers                    | list    | A list of electrum server URLs                                                  |
| ....url                       | object  | The url and port of a coins electrum server                                     |
| ....ws_url                    | object  | Optional. Used to define electrum server url/port for websocket connections.    |
| ....protocol                  | object  | Defines electrum server protocol as `TCP` or `SSL`. Defaults to `TCP`           |
| ....disable_cert_verification | boolean | Optional. For `SSL` electrum connections, this will allow expired certificates. |


#### Response

| Parameter  | Type    | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| task_id    | integer | An identifying number which is used to query task status. |


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
    "result":{
        "task_id": 1
    },
    "id": null
}
```

</collapse-text>

</div>


# task\_enable\_utxo\_status

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

| Parameter             | Type            | Description                                                                |
| --------------------- | --------------- | -------------------------------------------------------------------------- |
| status                | string          | A short indication of how the requested process is progressing.            |
| details.result        | object          | Depending on the state of process progress, this will contain different information as detailed in the items below. |
| .ticker               | string          | The ticker of the coin being activated                                     |
| .current_block        | integer         | The block height of the coin being activated                               |
| .wallet_balance       | object          | Information about the addresses of the coin being activated                |
| ..wallet_type         | string          | In Trezor mode, this will return `HD`                                      |
| ..accounts            | list            | A list of addresses and related information for the coin being activated   |
| ...account_index      | integer         | `ACCOUNT_ID` child in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` BIP44 derivation path. **Please don't confuse with mm2 global Iguana/HD/HW account.** |
| ...derivation_path    | string          | Derivation path up to the `COIN` child. E.g. `"m/44'/141'/0'"`             |
| ...total_balance      | object          | Combined total spendable and unconfirmed balances of all account addresses |
| ....spendable         | string(numeric) | Combined total spendable balance of all account addreesses                 |
| ....unspendable       | string(numeric) | Combined total unspendable balance of all account addreesses               |
| ...addresses          | list            | A list of addresses in the account for the coin being activated            |
| ....address           | string          | One of the addresses in the account for the coin being activated           |
| ....derivation_path   | string          | The [BIP44 derivation path](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) of the address. |
| ....chain             | string          | Returns `External` when  `CHAIN=0` in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` derivation path. Returns `Internal` when  `CHAIN=1` in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` derivation path. External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| ....balance           | object          | Contains the spendable and unspendable balance for this address                     |
| .....spendable        | string(numeric) | Spendable balance for this address                                                 |
| .....unspendable      | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions) |


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

| Parameter           | Type            | Description                                                                         |
| ------------------- | --------------- | ----------------------------------------------------------------------------------- |
| status              | string          | A short indication of how the requested process is progressing.                     |
| details.result      | object          | Depending on the state of process progress, this will contain different information as detailed in the items below. |
| .ticker             | string          | The ticker of the coin being activated                                              |
| .current_block      | integer         | The block height of the coin being activated                                        |
| .wallet_balance     | object          | Information about the addresses of the coin being activated                         |
| ..wallet_type       | string          | In Trezor mode, this will return `HD`                                               |
| ..address           | string          | One of the addresses in the account for the coin being activated                    |
| ..balance           | object          | Contains the spendable and unspendable balance for this address                     |
| ...spendable        | string(numeric) | Spendable balance for this address                                                 |
| ...unspendable      | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions) |

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

| Parameter           | Type            | Description                                                 |
| ------------------- | --------------- | ----------------------------------------------------------- |
| status              | string          | Will return `InProgress` if task is not yet comepleted      |
| details             | string          | An indication of the current step of the activation process |

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

| Parameter           | Type            | Description                                                                           |
| ------------------- | --------------- | ------------------------------------------------------------------------------------- |
| status              | string          | A short indication of how the requested process is progressing.                       |
| details.result      | object          | Depending on the state of process progress, this will contain different information as detailed in the items below. |
| .error              | string          | The ticker of the coin being activated                                                |
| .error_path         | string          | Used for debugging. A reference to the function in code base which returned the error |
| .error_trace        | string          | Used for debugging. A trace of lines of code which led to the returned error          |
| .error_type         | string          | An enumerated error identifier to indicate the category of error                      |
| .error_data         | string          | Additonal context for the error type                                                  |

Possible Error Cases:
- `TaskTimedOut` - Timed out waiting for coin activation, connecting to the device trezor or for user to confirm pubkey)
- `CoinCreationError` - Error during activation. E.g. incorrect or inactive electrum servers.
- `HwError` - **This is the most important error type.** Unlike other error types, `HwError` requires the GUI / User to check the details in `error_data` field to know which action is required. View the [HwError error type details](#Details_for_HwError_error_type) for more info.


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Error",
        "details": {
            "error": "Found unexpected device. Please re-initialize Hardware wallet",
            "error_path": "lib.common_impl.coin_balance.utxo_common.hd_pubkey.hw_ctx",
            "error_trace": "lib:93] common_impl:46] coin_balance:304] utxo_common:163] hd_pubkey:176] hw_ctx:149]",
            "error_type": "HwError",
            "error_data": "FoundUnexpectedDevice"
        }
    },
    "id": null
}
```

</collapse-text>

</div>


# task\_enable\_utxo\_user_action

If the `task::enable_utxo::status` returns `UserActionRequired`, we need to use the `task::enable_utxo::user_action` method to enter our PIN


#### Arguments

| Parameter                    | Type            | Description                                                                 |
| ---------------------------- | --------------- | --------------------------------------------------------------------------- |
| task_id                      | integer         | The identifying number returned when initiating the initialisation process. |
| user_action                  | object          | Object containing the params below                                          |
| user_action.action_type      | string          | Will be `TrezorPin` for this method                                         |
| user_action.pin              | string (number) | When the Trezor device is displaying a grid of numbers for PIN entry, this param will contain your Trezor pin, as mapped through your keyboard numpad. See the image below for more information.  |


<div style="margin: 2rem; text-align: center; width: 80%">
    <img src="/api_images/trezor_pin.png" />
</div>


#### Response

| Parameter             | Type         | Description                 |
| --------------------- | -------------| --------------------------- |
| result                | string       | The outcome of the request. |


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
    "mmrpc":"2.0",
    "result":"success",
    "id":null
}
```

</collapse-text>

</div>


# task\_enable\_qtum\_init

QTUM coins are activated using this method. For UTXO coins, refer to [task::enable_utxo::init]("#task_enable_utxo_init")

#### Arguments

| Parameter                     | Type    | Description                                                                     |
| ----------------------------- | ------- | ------------------------------------------------------------------------------- |
| ticker                        | string  | The ticker of tyhe coin you want to enable.                                     |
| activation_params             | object  | An object containing the actvation parameters below.                            |
| .priv_key_policy              | string  | Defaults to `ContextPrivkey`. Set as `Trezor` to activate in Trezor mode.        |
| .min_addresses_number         | integer | How many additional addreesses to generate at a minimum.                        |
| .scan_policy                  | string  | Whether or not to scan for new addresses. Select from `do_not_scan`, `scan_if_new_wallet` or `scan`. Note that `scan` will result in multple requests to the AtomicDEX-API. |
| .gap_limit                    | integer | The max number of empty addresses in a row. If transactions were sent to an address outside the `gap_limit`, they will not be identified when scanning.                     |
| .mode                         | object  | An object containing RPC type and data parameters as below.                     |
| ..rpc                         | string  | UTXO RPC mode. Options: `{ "rpc":"Native" }` if running a native blockchain node, or `"rpc":"Electrum"` to use electrum RPCs. If using electrum, a list of electrum servers is required under `rpc_data.servers` |
| ..rpc_data                    | object  | An object containing electrum server information.                               |
| ...servers                    | list    | A list of electrum server URLs                                                  |
| ....url                       | object  | The url and port of a coins electrum server                                     |
| ....ws_url                    | object  | Optional. Used to define electrum server url/port for websocket connections.    |
| ....protocol                  | object  | Defines electrum server protocol as `TCP` or `SSL`. Defaults to `TCP`           |
| ....disable_cert_verification | boolean | Optional. For `SSL` electrum connections, this will allow expired certificates. |


#### Response

| Parameter  | Type    | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| task_id    | integer | An identifying number which is used to query task status. |


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
    "result":{
        "task_id": 1
    },
    "id": null
}
```

</collapse-text>

</div>


# task\_enable\_qtum\_status

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


#### Response (ready, successful, Trezor mode)

| Parameter             | Type            | Description                                                                |
| --------------------- | --------------- | -------------------------------------------------------------------------- |
| status                | string          | A short indication of how the requested process is progressing.            |
| details.result        | object          | Depending on the state of process progress, this will contain different information as detailed in the items below. |
| .ticker               | string          | The ticker of the coin being activated                                     |
| .current_block        | integer         | The block height of the coin being activated                               |
| .wallet_balance       | object          | Information about the addresses of the coin being activated                |
| ..wallet_type         | string          | In Trezor mode, this will return `HD`                                      |
| ..accounts            | list            | A list of addresses and related information for the coin being activated   |
| ...account_index      | integer         | `ACCOUNT_ID` child in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` BIP44 derivation path. **Please don't confuse with mm2 global Iguana/HD/HW account.** |
| ...derivation_path    | string          | Derivation path up to the `COIN` child. E.g. `"m/44'/141'/0'"`             |
| ...total_balance      | object          | Combined total spendable and unconfirmed balances of all account addresses |
| ....spendable         | string(numeric) | Combined total spendable balance of all account addreesses                 |
| ....unspendable       | string(numeric) | Combined total unspendable balance of all account addreesses               |
| ...addresses          | list            | A list of addresses in the account for the coin being activated            |
| ....address           | string          | One of the addresses in the account for the coin being activated           |
| ....derivation_path   | string          | The [BIP44 derivation path](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) of the address. |
| ....chain             | string          | Returns `External` when  `CHAIN=0` in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` derivation path. Returns `Internal` when  `CHAIN=1` in the `m/44'/COIN'/ACCOUNT_ID'/CHAIN/ADDRESS_ID` derivation path. |
| ....balance           | object          | Contains the spendable and unspendable balance for this address                     |
| .....spendable        | string(numeric) | Spendable balance for this address                                                 |
| .....unspendable      | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions) |


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

| Parameter           | Type            | Description                                                                         |
| ------------------- | --------------- | ----------------------------------------------------------------------------------- |
| status              | string          | A short indication of how the requested process is progressing.                     |
| details.result      | object          | Depending on the state of process progress, this will contain different information as detailed in the items below. |
| .ticker             | string          | The ticker of the coin being activated                                              |
| .current_block      | integer         | The block height of the coin being activated                                        |
| .wallet_balance     | object          | Information about the addresses of the coin being activated                         |
| ..wallet_type       | string          | In Trezor mode, this will return `HD`                                               |
| ..address           | string          | One of the addresses in the account for the coin being activated                    |
| ..balance           | object          | Contains the spendable and unspendable balance for this address                     |
| ...spendable        | string(numeric) | Spendable balance for this address                                                 |
| ...unspendable      | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions) |

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

| Parameter           | Type            | Description                                                 |
| ------------------- | --------------- | ----------------------------------------------------------- |
| status              | string          | Will return `InProgress` if task is not yet comepleted      |
| details             | string          | An indication of the current step of the activation process |

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

| Parameter           | Type            | Description                                                                           |
| ------------------- | --------------- | ------------------------------------------------------------------------------------- |
| status              | string          | A short indication of how the requested process is progressing.                       |
| details.result      | object          | Depending on the state of process progress, this will contain different information as detailed in the items below. |
| .error              | string          | The ticker of the coin being activated                                                |
| .error_path         | string          | Used for debugging. A reference to the function in code base which returned the error |
| .error_trace        | string          | Used for debugging. A trace of lines of code which led to the returned error          |
| .error_type         | string          | An enumerated error identifier to indicate the category of error                      |
| .error_data         | string          | Additonal context for the error type                                                  |

Possible Error Cases:
- `TaskTimedOut` - Timed out waiting for coin activation, connecting to the device trezor or for user to confirm pubkey)
- `CoinCreationError` - Error during activation. E.g. incorrect or inactive electrum servers.
- `HwError` - **This is the most important error type.** Unlike other error types, `HwError` requires the GUI / User to check the details in `error_data` field to know which action is required. View the [HwError error type details](#Details_for_HwError_error_type) for more info.


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

`FoundUnexpectedDevice`

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Error",
        "details": {
            "error": "Found unexpected device. Please re-initialize Hardware wallet",
            "error_path": "lib.common_impl.coin_balance.utxo_common.hd_pubkey.hw_ctx",
            "error_trace": "lib:93] common_impl:46] coin_balance:304] utxo_common:163] hd_pubkey:176] hw_ctx:149]",
            "error_type": "HwError",
            "error_data": "FoundUnexpectedDevice"
        }
    },
    "id": null
}
```

`CoinCreationError`

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
</collapse-text>

</div>


# task\_enable\_qtum\_user_action

If the `task::enable_qtum::status` returns `UserActionRequired`, we need to use the `task::enable_qtum::user_action` method to enter our PIN


#### Arguments

| Parameter                    | Type            | Description                                                                 |
| ---------------------------- | --------------- | --------------------------------------------------------------------------- |
| task_id                      | integer         | The identifying number returned when initiating the initialisation process. |
| user_action                  | object          | Object containing the params below                                          |
| user_action.action_type      | string          | Will be `TrezorPin` for this method                                         |
| user_action.pin              | string (number) | When the Trezor device is displaying a grid of numbers for PIN entry, this param will contain your Trezor pin, as mapped through your keyboard numpad. See the image below for more information.  |


<div style="margin: 2rem; text-align: center; width: 80%">
    <img src="/api_images/trezor_pin.png" />
</div>


#### Response

| Parameter             | Type         | Description                 |
| --------------------- | -------------| --------------------------- |
| result                | string       | The outcome of the request. |


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
    "mmrpc":"2.0",
    "result":"success",
    "id":null
}
```

</collapse-text>

</div>


# task\_withdraw\_init

To prepare a transaction for signing on your Trezor, we use the `task::withdraw::init` method. It will return the transaction hex (via `task::withdraw::status`), which then needs to be broadcast with the [sendrawtransaction](../atomicdex-api-legacy/send_raw_transaction.html) to complete the withdrawal. This method is uses the same input fields as the [standard v2 withdraw method](../atomicdex-api-20/withdraw.html), with additional fields to specify the `from` address. There are two methods to let your Trezor know which address to send funds from:

- Using `derivation_path` as a single input. E.g `m/44'/20'/0'/0/2`
- Using `account_id` (0), `chain` (External) & `address_id` (2) inputs. The bracketed values are the equavalent of the derivation path above.


#### Arguments (derivation path option)

| Parameter            | Type    | Description                                                                               |
| -------------------- | ------- | ----------------------------------------------------------------------------------------- |
| amount               | integer | The amount you want to withdraw                                                           |
| coin                 | string  | The coin you want to withdraw                                                             |
| to                   | string  | The destination address you want to withdraw to                                           |
| from.derivation_path | string  | Follows the format `m/44'/COIN_ID'/ACCOUNT_ID'/CHAIN/ADDRESS_ID`                          |

#### Command (derivation path option)

```bash
curl --url "$url:$port" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::withdraw::init\",
    \"params\": {
        \"coin\": \"$1\",
        \"to\": \"$2\",
        \"amount\": $3,
        \"from\": {
            \"derivation_path\": \"$4\"
        }
    }
}"
```

#### Arguments (account_id & address_id option)

| Parameter          | Type    | Description                                                                                |
| ------------------ | ------- | ------------------------------------------------------------------------------------------ |
| amount             | integer | The amount you want to withdraw                                                            |
| coin               | string  | The coin you want to withdraw                                                              |
| to                 | string  | The destination address you want to withdraw to                                            |
| from.account_id    | integer | Generally this will be `0` unless you have multiple accounts registered on your Trezor     |
| from.chain         | string  | `Internal`, or `External`. External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| from.address_id    | integer | Check the output from coin activation to find the ID of an address with balance            |


#### Command (account_id & address_id option)

```bash
curl --url "$url:$port" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::withdraw::init\",
    \"params\": {
        \"coin\": \"$1\",
        \"to\": \"$2\",
        \"amount\": $3,
        \"from\": {
            \"account_id\": 0,
            \"chain\": \"External\",
            \"address_id\": $4
        }
    }
}"
```

#### Response

| Parameter  | Type    | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| task_id    | integer | An identifying number which is used to query task status. |


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

```json
{
    "mmrpc": "2.0",
    "result": {
        "task_id": 6
    },
    "id": null
}
```


# task\_withdraw\_status

To get the status of your withdrawal, use the `task::withdraw::status`, Once ready, it will provide the raw hex used to broadcast your transaction with [sendrawtransaction](../atomicdex-api-legacy/send_raw_transaction.html).
The response returned here is the same as returned from the [standard v2 withdraw method](../atomicdex-api-20/withdraw.html#response)

#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.               |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true`. |


#### Response

| Parameter                 | Type                       | Description                                                                                                                                                                                 |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                      | array of strings           | coins are withdrawn from this address; the array contains a single element, but transactions may be sent from several addresses (UTXO coins)                                                |
| to                        | array of strings           | coins are withdrawn to this address; this may contain the `my_address` address, where change from UTXO coins is sent                                                                        |
| my_balance_change         | string (numeric)           | the expected balance of change in `my_address` after the transaction broadcasts                                                                                                             |
| received_by_me            | string (numeric)           | the amount of coins received by `my_address` after the transaction broadcasts; the value may be above zero when the transaction requires that the AtomicDEX API send change to `my_address` |
| spent_by_me               | string (numeric)           | the amount of coins spent by `my_address`; this value differ from the request amount, as the transaction fee is added here                                                                  |
| total_amount              | string (numeric)           | the total amount of coins transferred                                                                                                                                                       |
| fee_details               | object                     | the fee details of the generated transaction; this value differs for utxo and ETH/ERC20 coins, check the examples for more details                                                          |
| tx_hash                   | string                     | the hash of the generated transaction                                                                                                                                                       |
| tx_hex                    | string                     | transaction bytes in hexadecimal format; use this value as input for the `send_raw_transaction` method                                                                                      |
| coin                      | string                     | the name of the coin the user wants to withdraw                                                                                                                                             |
| kmd_rewards               | object (optional)          | an object containing information about accrued rewards; always exists if the coin is `KMD`                                                                                                  |
| kmd_rewards.amount        | string (numeric, optional) | the amount of accrued rewards                                                                                                                                                               |
| kmd_rewards.claimed_by_me | bool (optional)            | whether the rewards been claimed by me                                                                                                                                                      |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::withdraw::status\",
    \"params\": {
        \"task_id\": 4,
        \"forget_if_finished\": false
    }
}"
```


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ready, successful)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Ok",
        "details": {
            "tx_hex": "01000000013491ce86d6f55a5748d17be4ce54f5bc2aa1ec776c385f0a5ae198bb58e4171c000000006b483045022100816bd2f782ec9c7ca846a0ffd62ce541b7b82927ef358c8ebb87a344170235cf022074e6b55b5a38d4910dbf3f3c0aba840799af65b737ecbd14aee9824e590e9932012103587baa3738f6b12f500cfc854deec5d46d24748aceb8901d5c46174d3ceec66bffffffff0200f2052a010000001976a91421bf462cf9badbd63d3c69dec4c1d886e0723e8488ac606b042a010000001976a91497db49cfcbaaed2c00d840f6016c05ff7613b76e88ac7419a063",
            "tx_hash": "8ccf2d19ccd910483d78a145a122adcdda0989d05337553345e1204890f19a48",
            "from": ["DJz3GeMhqm1afkbEEBJfwH62Df5Nh5kJZU"],
            "to": ["D8DXyYjZbSstoNkD1iqYhUqBYbSSLqwSug"],
            "total_amount": "100",
            "spent_by_me": "100",
            "received_by_me": "49.999",
            "my_balance_change": "-50.001",
            "block_height": 0,
            "timestamp": 1671436676,
            "fee_details": {
                "type": "Utxo",
                "coin": "DGB",
                "amount": "0.001"
            },
            "coin": "DGB",
            "internal_id": "",
            "transaction_type": "StandardTransfer"
        }
    },
    "id": null
}
```

#### Response (error, waiting for user to confirm signing on device)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "InProgress",
        "details": "WaitingForUserToConfirmSigning"
    },
    "id": null
}
```

</collapse-text>

</div>


# task\_withdraw\_cancel

Use the `task::withdraw::cancel` method to cancel the withdrawal preparation task.


#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the withdrawal process.                   |


#### Response

| Parameter          | Type     | Description                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| result             | string   | Returns with value `success` when successful, otherwise returns the error values below |
| error              | string   | Description of the error                                                               |
| error_path         | string   | Used for debugging. A reference to the function in code base which returned the error  |
| error_trace        | string   | Used for debugging. A trace of lines of code which led to the returned error           |
| error_type         | string   | An enumerated error identifier to indicate the category of error                       |
| error_data         | string   | Additonal context for the error type                                                   |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::withdraw::cancel\",
    \"params\": {
        \"task_id\": 3
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ready, successful)

```json
{
    "mmrpc": "2.0",
    "result": "success",
    "id": null
}
```

#### Response (error, task already finished)

```json
{
    "mmrpc": "2.0",
    "error": "Task is finished already",
    "error_path": "init_withdraw.manager",
    "error_trace": "init_withdraw:94] manager:104]",
    "error_type": "TaskFinished",
    "error_data": 4,
    "id": null
}
```

</collapse-text>

</div>

# task\_account_balance\_init

Use the `task::account_balance::init` method to initialise an account balance request.


#### Arguments

| Parameter          | Type    | Description                                                                                                                                     |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| coin               | string  | Ticker of activated coin you want to see addresses and balance for                                                                              |
| account_index      | string  | For GUIs, this will be zero. In CLI you can use other values if you [know what you are doing](https://learnmeabitcoin.com/technical/hd-wallets) |


#### Response

| Parameter  | Type    | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| task_id    | integer | An identifying number which is used to query task status. |

#### :pushpin: Examples

#### Command

```bash
curl --url "$url:$port" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::account_balance::init\",
    \"params\": {
        \"coin\": \"$1\",
        \"account_index\": 0
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ready, successful)

```json
{
    "mmrpc": "2.0",
    "result": {
        "task_id": 6
    },
    "id": null
}

```

</collapse-text>

</div>


# task\_account_balance\_status

Use the `task::account_balance::status` method to view the status / response of an account balance request.


#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the withdrawal process.                   |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true`. |


#### Response

| Parameter           | Type            | Description                                                                         |
| ------------------- | --------------- | ----------------------------------------------------------------------------------- |
| result              | object          | Object containing status and details of the task                                    |
| .status             | string          | Status of the task (`Ok` or `Error`)                                                |
| ..account_index     | integer         | For GUIs, this will return `0`. In CLI it will return the same as the user request input |
| ..derivation_path   | string          | The The [BIP44 derivation path](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) of the wallet. |
| ..total_balance     | object          | Contains the spendable and unspendable balance for the wallet                       |
| ...spendable        | string(numeric) | Spendable balance for this wallet                                                   |
| ...unspendable      | string(numeric) | Unspendable balance for this wallet (e.g. from unconfirmed incoming transactions)   |
| ..addresses         | list            | Contains information about current active addresses in the wallet                   |
| ...address          | string          | Spendable balance for this address                                                  |
| ...derivation_path  | string          | The The [BIP44 derivation path](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) of an address. |
| ...chain            | string(numeric) | `Internal` or `External`.   External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| ...balance          | object          | Contains the spendable and unspendable balance for this address                     |
| ....spendable       | string(numeric) | Spendable balance for this address                                                  |
| ....unspendable     | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions)  |

#### :pushpin: Examples

#### Command

```bash
curl --url "$url:$port" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::account_balance::status\",
    \"params\": {
        \"task_id\": $1,
        \"forget_if_finished\": false
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ready, successful)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Ok",
        "details": {
            "account_index": 0,
            "derivation_path": "m/44'/20'/0'",
            "total_balance": {
                "spendable": "99.999",
                "unspendable": "0"
            },
            "addresses": [{
                "address": "DJdsr4Mhqm1afkbxwBJfwH6236xNh5kJZU",
                "derivation_path": "m/44'/20'/0'/0/0",
                "chain": "External",
                "balance": {
                    "spendable": "49.999",
                    "unspendable": "0"
                }
            }, {
                "address": "DJdsr4Mhqm1afkbxwBJfwH6236xNh5kJZU",
                "derivation_path": "m/44'/20'/0'/0/1",
                "chain": "External",
                "balance": {
                    "spendable": "50",
                    "unspendable": "0"
                }
            }, {
                "address": "DJdsr4Mhqm1afkbxwBJfwH6236xNh5kJZU",
                "derivation_path": "m/44'/20'/0'/0/2",
                "chain": "External",
                "balance": {
                    "spendable": "0",
                    "unspendable": "0"
                }
            }]
        }
    },
    "id": null
}
```

</collapse-text>

</div>

# task\_account_balance\_cancel

Use the `task::account_balance::cancel` method to cancel an account balance request.


#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the withdrawal process.                   |


#### Response

| Parameter          | Type     | Description                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| result             | string   | Returns with value `success` when successful, otherwise returns the error values below |
| error              | string   | Description of the error                                                               |
| error_path         | string   | Used for debugging. A reference to the function in code base which returned the error  |
| error_trace        | string   | Used for debugging. A trace of lines of code which led to the returned error           |
| error_type         | string   | An enumerated error identifier to indicate the category of error                       |
| error_data         | string   | Additonal context for the error type                                                   |

#### :pushpin: Examples

#### Command

```bash
curl --url "$url:$port" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::account_balance::cancel\",
    \"params\": {
        \"task_id\": $1
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ready, successful)

```json
{
    "mmrpc": "2.0",
    "result": "success",
    "id": null
}
```

#### Response (error, task already finished)

```json
{
    "mmrpc": "2.0",
    "error": "Task is finished already",
    "error_path": "init_account_balance.manager",
    "error_trace": "init_account_balance:113] manager:104]",
    "error_type": "TaskFinished",
    "error_data": 2,
    "id": null
}
```

</collapse-text>

</div>


# can\_get\_new\_address

To avoid generating too many addresses at once, we can use a `gap_limit` constraint so that no more than a specific amount of unused addresses can be generated before more addresses can be generated.


#### Arguments

| Parameter          | Type    | Description                                                                                      |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------ |
| coin               | string  | The ticker of the coin you want to get a new address for                                         |
| account_id         | integer | Generally this will be `0` unless you have multiple accounts registered on your Trezor           |
| chain              | string  | `Internal`, or `External`. External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| gap_limit          | integer | The maximum number of empty addresses in a row.                                                  |


#### Response

| Parameter              | Type     | Description                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- |
| result                 | string   | Returns with value `success` when successful, otherwise returns the error values below |
| result.allowed         | boolean  | Whether or not you can get a new address.                                                                    |
| result.reason          | string   | The reason you cant get a new address (if allowed is `false`).                                               |
| result.details         | object   | Contains extra contextual information about the reason why allowed is `false`                                |
| result.details.address | boolean  | If reason is `LastAddressNotUsed`, this is the address that should be used before you can get a new address. |

Other reasons you might not be able to get a new address are:

- `EmptyAddressesLimitReached` - Last gap_limit addresses are still unused.
- `AddressLimitReached` - Addresses limit reached. Currently, the limit is [2^31](https://www.wolframalpha.com/input?i=2%5E%2832%29)

#### :pushpin: Examples

#### Command

```bash
curl --url "$url:$port" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"can_get_new_address\",
    \"params\": {
        \"coin\": \"RICK\",
        \"account_id\": 0,
        \"chain\": \"External\",
        \"gap_limit\": 20,
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success, allowed)

```json
{
    "mmrpc": "2.0",
    "result": {
        "allowed": true
    },
    "id": null
}
```

#### Response (success, not allowed)

```json
{
    "mmrpc": "2.0",
    "result": {
        "allowed": false,
        "reason": "LastAddressNotUsed",
        "details": {
            "address": "RMHFCEWacWP7dYw1DWxH3TF5YW8q8hM5z7"
        }
    },
    "id": null
}
```

</collapse-text>

</div>


# get\_new\_address

If we don't already have too many unused addresses, we can use the `get_new_address` method to generate a new address. The generated address will be shown in account_balance and init_account_balance RPCs and on the next coin activation.


#### Arguments

| Parameter          | Type    | Description                                                                                      |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------ |
| coin               | string  | The ticker of the coin you want to get a new address for                                         |
| account_id         | integer | Generally this will be `0` unless you have multiple accounts registered on your Trezor           |
| chain              | string  | `Internal`, or `External`. External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| gap_limit          | integer | The maximum number of empty addresses in a row.                                                  |


#### Response

| Parameter                          | Type            | Description                                                                            |
| ---------------------------------- | --------        | -------------------------------------------------------------------------------------- |
| result                             | string          | Returns with value `success` when successful, otherwise returns the error values below |
| result.new_address                 | object          | Contains details about your new address.                                               |
| result.address                     | string          | The new address that was generated.                                                    |
| result.details                     | object          | Contains extra contextual information about the reason why allowed is `false`                                |
| result.details.address             | boolean         | If reason is `LastAddressNotUsed`, this is the address that should be used before you can get a new address. |
| result.details.derivation_path     | string          | The [BIP44 derivation path](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) of the address.  |
| result.details.chain               | string          | `External` or `Internal` External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| result.details.balance             | object          | Contains the spendable and unspendable balance for this address                    |
| result.details.balance.spendable   | string(numeric) | Spendable balance for this address                                                 |
| result.details.balance.unspendable | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions) |

Other reasons you might not be able to get a new address are:

- `EmptyAddressesLimitReached` - Last gap_limit addresses are still unused.
- `AddressLimitReached` - Addresses limit reached. Currently, the limit is [2^31](https://www.wolframalpha.com/input?i=2%5E%2832%29)

#### :pushpin: Examples

#### Command

```bash
curl --url "$url:$port" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"get_new_address\",
    \"params\": {
        \"coin\": \"RICK\",
        \"account_id\": 0,
        \"chain\": \"External\",
        \"gap_limit\": 20,
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
    "mmrpc": "2.0",
    "result": {
        "allowed": true
    },
    "id": null
}
```

#### Response (success, not allowed)

```json
{
    "mmrpc": "2.0",
    "result": {
        "new_address": {
            "address": "RRqF4cYniMwYs66S4QDUUZ4GJQFQF69rBE",
            "derivation_path": "m/44'/141'/0'/0/3",
            "chain": "External",
            "balance": {
                "spendable": "0",
                "unspendable": "0"
            }
        }
    },
    "id": null
}
```

</collapse-text>

</div>



# Details\_for\_HwError\_error\_type

When requesting the status of a task, if an `error_type` of `HwError` is returned, the GUI / User should check the details in `error_data` field to know which action is required (as detailed below).

 - `FoundUnexpectedDevice` - The connected Trezor device has a different pubkey value than what was specified in the `device_pubkey` parameter 
```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Error",
        "details": {
            "error": "Found unexpected device. Please re-initialize Hardware wallet",
            "error_path": "lib.common_impl.coin_balance.utxo_common.hd_pubkey.hw_ctx",
            "error_trace": "lib:93] common_impl:46] coin_balance:304] utxo_common:163] hd_pubkey:176] hw_ctx:149]",
            "error_type": "HwError",
            "error_data": "FoundUnexpectedDevice"
        }
    },
    "id": null
}
```

 - `FoundMultipleDevices` - Multiple Trezor devices are plugged in. Remove the additional devices, and keep the one you want to use plugged in.
```json

```

 - `NoTrezorDeviceAvailable` - No Trezor device detected by the AtomicDEX API. Make sure it is plugged in, or try a different USB cable / port.
```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Error",
        "details": {
            "error": "No Trezor device available",
            "error_path": "init_hw.crypto_ctx.hw_ctx.response.usb.libusb",
            "error_trace": "init_hw:151] crypto_ctx:248] crypto_ctx:354] hw_ctx:120] response:136] usb:46] libusb:195]",
            "error_type": "HwError",
            "error_data": "NoTrezorDeviceAvailable"
        }
    },
    "id": null
}
```
