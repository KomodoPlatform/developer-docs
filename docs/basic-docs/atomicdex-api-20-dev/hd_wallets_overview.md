# HD Wallets Overview

The Komodo DeFi Framework now is able to activate coins in Iguana and HW modes simultaneously!

For example, you can activate RICK with seed phrase private key like usual, and also activate MORTY with Hardware wallet at the same time.

To get started, [configure and launch the Komodo DeFi Framework](../atomicdex/atomicdex-setup/get-started-atomicdex.html), then plug in your Trezor hardware wallet device.

Initialisation and authentication:

- Initialise connection with your Trezor with [task::init_trezor::init](trezor_initialisation.html#task-init-trezor-init)
- Check the status of the connecton with [task::init_trezor::status](trezor_initialisation.html#task-init-trezor-status)
- Cancel authentication process with [task::init_trezor::cancel](trezor_initialisation.html#task-init-trezor-cancel)
- Authenticate using PIN or phrase with [task::init_trezor::user_action](trezor_initialisation.html#task-init-trezor-user-action)

UTXO Coin Activation in Hardware Mode:

- Use [task::enable_utxo::init](coin_activation_tasks.html#task-enable-utxo-init) for UTXO coins like KMD, BTC and DOGE.
- Check the activation status with [task::enable_utxo::status](coin_activation_tasks.html#task-enable-utxo-status)
- Authenticate the activation with [task::enable_utxo::user_action](coin_activation_tasks.html#task-enable-utxo-user-action)

QTUM Coin Activation in Hardware Mode:

- Use [task::enable_qtum::init](coin_activation_tasks.html#task-enable-qtum-init) for QTUM Ecosystem coins.
- Check the activation status with [task::enable_qtum::status](coin_activation_tasks.html#task-enable-qtum-status)
- Authenticate the activation with [task::enable_qtum::user_action](coin_activation_tasks.html#task-enable-qtum-user-action)

Withdrawing your Funds:

- Prepare a transaction with [task::withdraw::init](withdraw_tasks.html#withdraw-init)
- Check the status of the transaction preparation with [task::withdraw::status](withdraw_tasks.html#withdraw-status)
- Cancel the transaction preparation with [task::withdraw::cancel](withdraw_tasks.html#withdraw-cancel)

Viewing Hardware Wallet Coin Balances:

- Initialise the balance request with [task::account_balance::init](account_balance_tasks.html#task-account-balance-init)
- Check the status of the balance request with [task::account_balance::status](account_balance_tasks.html#task-account-balance-status)

Creating New Addresses:

- Use [can_get_new_address](hd_address_management.html#can-get-new-address) to determine if your current address has been used, or should be updated.
- Use [get_new_address](hd_address_management.html#get-new-address) to generate a new address

:::tip
NOTE: These methods (and others with a `task::` prefix) will be linked to a numeric `task_id` value which is used to query the status or outcome of the task.
:::

## Details for HwError error type

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
{
  "mmrpc": "2.0",
  "result": {
    "status": "Error",
    "details": {
      "error": "Found multiple devices. Please unplug unused devices",
      "error_path": "init_hw.crypto_ctx.hw_client",
      "error_trace": "init_hw:151] crypto_ctx:248] crypto_ctx:354] hw_client:152] hw_client:126]",
      "error_type": "HwError",
      "error_data": "FoundMultipleDevices"
    }
  },
  "id": null
}
```

- `NoTrezorDeviceAvailable` - No Trezor device detected by the Komodo DeFi Framework. Make sure it is plugged in, or try a different USB cable / port.

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
