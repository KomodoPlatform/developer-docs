# Trezor Initialisation

The methods below prepare your Trezor device for use within the Komodo DeFi Framework. Once completed, you can authenticate using your PIN or phrase with [task::init_trezor::user_action](#task-init-trezor-user-action).

## task_init_trezor_init

Before using this method, launch the Komodo DeFi Framework, and plug in your Trezor.

#### Arguments

| Parameter     | Type   | Description                                                                                                                                                          |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| device_pubkey | string | Optional. If known, you can specify the device pubkey. If not known, this will be part of the `task::init_trezor::status` response which you can save for future use |

#### Response

| Parameter | Type    | Description                                               |
| --------- | ------- | --------------------------------------------------------- |
| task_id   | integer | An identifying number which is used to query task status. |

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
  "result": {
    "task_id": 0
  },
  "id": null
}
```

</collapse-text>

</div>

## task_init_trezor_status

After running the `task::init_trezor::init` method, we can query the status of device initialisation to check its progress.

#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.               |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true`. |

#### Response

| Parameter             | Type         | Description                                                                                                                                                         |
| --------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                | string       | A short indication of how the requested process is progressing.                                                                                                     |
| details               | object       | Depending on the state of process progress, this will contain different information as detailed in the items below.                                                 |
| details.type          | string       | Type of hardware wallet device (e.g. `Trezor`)                                                                                                                      |
| details.model         | string       | The model of the hardware wallet device (e.g. `One` or `T`)                                                                                                         |
| details.device_name   | string       | The name of the device as defned by user in Trezor Suite or another wallet application.                                                                             |
| details.device_id     | string (hex) | An unique identifier of the device, set during manufacturing.                                                                                                       |
| details.device_pubkey | string (hex) | The hardware wallet device's pubkey. If included in the `task::init_trezor::init` request, it wll be the same as input. If not, it should be stored for future use. |

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

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (in progress)

Possible "In progress" Cases:

- `Initializing` - This is the normal task state. It does not require any action from the user.

- `WaitingForTrezorToConnect` - The Komodo DeFi Framework is waiting for the user to plugin a Trezor device.

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

- `FollowHwDeviceInstructions` - The Komodo DeFi Framework is waiting for the user to follow instructions displayed on the device (e.g. clicking a button to confirm).

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

- `UserActionRequired` - This will either be `EnterTrezorPin` or `EnterTrezorPassphrase`. Refer to the [task::init_trezor::user_action](#task_trezor_user_action) section for more information.

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

- `NoSuchTask` - Something went wrong or `task::init_trezor::init` was not called. Refer to the [task::init_trezor::init](#task_init_trezor_init) section for more information.

```json
{
  "mmrpc": "2.0",
  "error": "No such task '0'",
  "error_path": "init_hw",
  "error_trace": "init_hw:184]",
  "error_type": "NoSuchTask",
  "error_data": 0,
  "id": null
}
```

- `HwError` - **This is the most important error type.** Unlike other error types, `HwError` requires the GUI / User to check the details in `error_data` field to know which action is required. View the [HwError error type details](trezor_integration.html#Details_for_HwError_error_type) for more info.

</collapse-text>

</div>

## task_init_trezor_cancel

Use the `task::init_trezor::cancel` method to cancel the initialisation task.

#### Arguments

| Parameter | Type    | Description                                                                 |
| --------- | ------- | --------------------------------------------------------------------------- |
| task_id   | integer | The identifying number returned when initiating the initialisation process. |

#### Response

| Parameter   | Type   | Description                                                                            |
| ----------- | ------ | -------------------------------------------------------------------------------------- |
| result      | string | Returns with value `success` when successful, otherwise returns the error values below |
| error       | string | Description of the error                                                               |
| error_path  | string | Used for debugging. A reference to the function in code base which returned the error  |
| error_trace | string | Used for debugging. A trace of lines of code which led to the returned error           |
| error_type  | string | An enumerated error identifier to indicate the category of error                       |
| error_data  | string | Additonal context for the error type                                                   |

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

## task_init_trezor_user_action

When you see the pin grid on your device, or it asks for a passphrase word, use this method.

#### Arguments

| Parameter               | Type            | Description                                                                                                                                                                                                                          |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| task_id                 | integer         | The identifying number returned when initiating the initialisation process.                                                                                                                                                          |
| user_action             | object          | Object containing the params below                                                                                                                                                                                                   |
| user_action.action_type | string          | Either `TrezorPin` or `TrezorPassphrase`, depending on which is requested by responses from related methods returning `"status": "UserActionRequired"`                                                                               |
| user_action.pin         | string (number) | When the Trezor device is displaying a grid of numbers for PIN entry, this param will contain your Trezor pin, as mapped through your keyboard numpad. See the image below for more information.                                     |
| user_action.passphrase  | string          | The [passphrase](https://trezor.io/learn/a/passphrases-and-hidden-wallets) functions like an extra word added to your recovery seed, and it used to access hidden wallets. To access the default wallet, input an empty string here. |

<div style="margin: 2rem; text-align: center; width: 80%">
    <img src="/api_images/trezor_pin.png" />
</div>

#### Response

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| result    | string | The outcome of the request. |

:::tip
NOTE: Even an incorrect PIN will return `success`. This doesn't mean the PIN was accepted, just that it was communicated without errors. If the PIN was incorrect, you will see an error like below in the next response for a method that requires authentication.
:::

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
        "ticker": "KMD",
        "error": "Hardware Wallet context is not initialized"
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
  "mmrpc": "2.0",
  "result": "success",
  "id": null
}
```

</collapse-text>

</div>
