# Trezor\_Integration

The AtomicDEX API now is able to activate coins in Iguana and HW modes simultaneously!

For example, you can activate RICK with seed phrase private key like usual, and also activate MORTY with Hardware wallet at the same time.


To get started, [configure and launch the AtomicDEX API]("../atomicdex/atomicdex-setup/get-started-atomicdex.html"), then plug in your Trezor hardware wallet device. 

Below are the new v2 RPC methods for interacting with your Trezor.

Authentication:
- Initialise connection with your Trezor with [task::init_trezor::init]("#task_trezor_init")
- Check the status of the connecton with [task::init_trezor::status]("#task_trezor_status")
- Authenitcate usng PIN or phrase with [task::init_trezor::user_action]("#task_trezor_user_action")

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


# task\_trezor\_init

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
}
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
}
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



# task\_trezor\_status

After running the `task::init_trezor::init` method, we can query the status of device initialisation to check its progress.


#### Arguments

| Parameter          | Type    | Description                                                                 |
| ------------------ | ------- | --------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process. |


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
    	\"task_id\": 0
    }
}
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

#### Response (ready, error)

Possible Error Cases:
- `HwContextInitializingAlready` - Returned if user calls `task::init_trezor::init` before the previous `task::init_trezor::init` task has been completed.
- `Timeout` - Timed out while trying to connect to a device.
- `HwError` - There is a problem with the hardware. Check the details in error_data field for more information.
- `NoTrezorDeviceAvailable` - No Trezor device detected by the AtomicDEX API.
- `FoundMultipleDevices` - Multiple Trezor devices are pluged in. Remove the additional devices, and keep the one you want to use plugged in.
- `FoundUnexpectedDevice` - The connected Trezor device has a different pubkey value than what was specified in the `device_pubkey` parameter during the `task::init_trezor::init` request.


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

#### Response (in progress)

Possible "In progress" Cases:

- `Initializing` - This is the normal task state. It does not require any action from the user.
- `WaitingForTrezorToConnect` - The AtomicDEX API is waiting for the user to plugin a Trezor device.
- `FollowHwDeviceInstructions` - The AtomicDEX API is waiting for the user to follow instructions displayed on the device (e.g. clicking a button to confirm).
- `UserActionRequired` - This will either be `EnterTrezorPin` or `EnterTrezorPassphrase`. Refer to the [task::init_trezor::user_action]("#task_trezor_user_action") section for more information.


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

