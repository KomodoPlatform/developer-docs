# Trezor\_Integration

The AtomicDEX API now is able to activate coins in Iguana and HW modes simultaneously!

For example, you can activate RICK with seed phrase private key like usual, and also activate MORTY with Hardware wallet at the same time.

To get started, [configure and launch the AtomicDEX API](../atomicdex/atomicdex-setup/get-started-atomicdex.html), then plug in your Trezor hardware wallet device. 

Initialisation and authentication:

- Initialise connection with your Trezor with [task::init_trezor::init](trezor_initialisation.html#task-init-trezor-init)
- Check the status of the connecton with [task::init_trezor::status](trezor_initialisation.html#task_init_trezor_status)
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
- Use [can_get_new_address](#can-get-new-address) to determine if your current address has been used, or should be updated.
- Use [get_new_address](#get-new-address) to generate a new address

tip:::
NOTE: These methods (and others with a `task::` prefix) will be linked to a numeric `task_id` value which is used to query the status or outcome of the task.
:::


## can\_get\_new\_address

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
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"can_get_new_address\",
    \"params\": {
        \"coin\": \"RICK\",
        \"account_id\": 0,
        \"chain\": \"External\",
        \"gap_limit\": 20
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


## get\_new\_address

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
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"get_new_address\",
    \"params\": {
        \"coin\": \"RICK\",
        \"account_id\": 0,
        \"chain\": \"External\",
        \"gap_limit\": 20
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

