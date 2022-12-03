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

