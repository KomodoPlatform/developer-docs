# ZHTLC Coin Methods

ZHTLC coins, like Pirate (ARRR) and the test coin ZOMBIE take a little longer to enable, and use a new two step method to enable. Activation can take a little while the first time, as we need to download some block cache data, and build a wallet database. Subsequent enabling will be faster, but still take a bit longer than other coins. The second step for activation is optional, but allows us to check the status of the activation process. 

To withdraw ZHTLC coins, you need to use the [task::withdraw](withdraw_tasks.html) methods:
- Generate a transaction with `task::withdraw::init`
- Query its status with `task::withdraw::status`
- Cancel generating the transaction with `task::withdraw::cancel`


## enable\_z\_coin\_init

:::tip
To enable Z coins you also need to [install some Zcash Params](https://forum.komodoplatform.com/t/installing-zcash-params/603)
:::


#### Arguments

| Structure                                     | Type            | Description                                                                                                                                                          |
| --------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticker                                        | string          | Ticker of coin to activate                                                                                                                                           |
| activation_params                             | object          | Contains details required for activation as explained below                                                                                                          |
| activation_params.required_confirmations      | integer         | Block confirmations to wait for transactions when doing a swap. Optional, defaults to `3`. Overrides value if set in `coins` file.                                   |
| activation_params.requires_notarization       | boolean         | For [dPoW](https://komodoplatform.com/en/blog/dpow-demystified/) protected coins, a `true` value will wait for transactions to be notarised when doing swaps. Optional, defaults to `false`. Overrides value if set in `coins` file.  |
| activation_params.mode.rpc                    | string          | Set as `Light` to use external electrum & lightwallet_d servers or `Native` to use local block chain data. If native, the `rpc_data` fields below are not required.  |
| activation_params.mode.rpc_data               | list of objects | Contains details about servers to be used for `Light` mode operation.                                                                                                |
| ..rpc_data.light_wallet_d_servers             | list of strings | Urls which are hosting lightwallet_d servers                                                                                                                         |
| ..rpc_data.electrum_servers                   | list of objects | Contains additional details about a coins electrum servers.                                                                                                          |
| ...electrum_servers.protocol                  | string          | Transport protocol used by AtomicDEX API to connect to the electrum server (`TCP` or `SSL`). Optional, defaults to `TCP`                                             |
| ...electrum_servers.url                       | string          | The URL and port of an electrum server.                                                                                                                              |
| ...electrum_servers.disable_cert_verification | boolean         | If `true`, this disables server SSL/TLS certificate verification (e.g. to use self-signed certificate). Optional, defaults to `false` <b>Use at your own risk!</b>   |
| activation_params.zcash_params_path           | string          | Path to folder containing [Zcash parameters](https://z.cash/technology/paramgen/). Optional, defaults to standard location as defined in [this guide](https://forum.komodoplatform.com/t/installing-zcash-params/603) |


#### Response

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | An identifying number which is used to query task status.                                                          |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"$userpass\",
    \"method\": \"task::enable_z_coin::init\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"ticker\": \"ZOMBIE\",
        \"activation_params\": {
            \"mode\": {
                \"rpc\": \"Light\",
                \"rpc_data\": {
                    \"electrum_servers\": [{\"url\":\"zombie.sirseven.me:10033\"}],
                    \"light_wallet_d_servers\": [\"http://zombie.sirseven.me:443\"]
                }
            },
            \"zcash_params_path\": \"/home/username/path_to/.zcash-params\"
        }
    }
}"
echo
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

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

## enable\_z\_coin\_status

After initiating z coin enabling, you can use the `task_id` to check progress.

#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.               |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true`  |


#### Response

| Structure              | Type              | Description                                                                                                           |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| status                 | string            | A short indication of how the enabling is progressing.                                                                |
| details                | object            | Depending on the state of enabling progress, this will contain different information as shown in the responses below. |


#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"${userpass}\",
    \"method\": \"task::enable_z_coin::status\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"task_id\": $1,
        \"forget_if_finished\": false
    }
}"
echo
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (ActivatingCoin - enabling has started)

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "InProgress",
    "details": "ActivatingCoin"
  },
  "id": null
}
```

#### Response (UpdatingBlocksCache)

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "InProgress",
    "details": {
      "UpdatingBlocksCache": {
        "current_scanned_block": 265930,
        "latest_block": 269656
      }
    }
  },
  "id": null
}

```

#### Response (BuildingWalletDb)

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "InProgress",
    "details": {
      "BuildingWalletDb": {
        "current_scanned_block": 265311,
        "latest_block": 269656
      }
    }
  },
  "id": null
}
```

#### Response (Enabling complete)

```json
{
  "mmrpc": "2.0",
  "result": {
    "status": "Ok",
    "details": {
      "ticker": "ZOMBIE",
      "current_block": 269657,
      "wallet_balance": {
        "wallet_type": "Iguana",
        "address": "zs1e3puxpnal8ljjrqlxv4jctlyndxnm5a3mj5rarjvp0qv72hmm9caduxk9asu9kyc6erfx4zsauj",
        "balance": {
          "spendable": "29.99989008",
          "unspendable": "0"
        }
      }
    }
  },
  "id": null
}
```

#### Response (no Zcash Params)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Error",
        "details": {
            "error": "Error on platform coin ZOMBIE creation: ZCashParamsNotFound",
            "error_path": "lib.z_coin_activation.z_coin",
            "error_trace": "lib:103] z_coin_activation:192] z_coin:761]",
            "error_type": "CoinCreationError",
            "error_data": {
                "ticker": "ZOMBIE",
                "error": "ZCashParamsNotFound"
            }
        }
    },
    "id": null
}
```

#### Response (error - no such task)

You'll see this if the task number does not exist, or the task has already completed.

```json
{
  "mmrpc": "2.0",
  "error": "No such task '1'",
  "error_path": "init_standalone_coin",
  "error_trace": "init_standalone_coin:119]",
  "error_type": "NoSuchTask",
  "error_data": 1,
  "id": null
}

```

</collapse-text>

</div>


## enable\_z\_coin\_cancel

If you want to cancel the enabling process before it has completed, you can use this method.


#### Arguments

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | The identifying number returned when initiating the enabling process.                                              |


#### Response

| Structure              | Type              | Description                                                    |
| ---------------------- | ----------------- | -------------------------------------------------------------- |
| result                 | string            | Indicates task cancellation was succesful.                     |
| error                  | string            | An error message to explain what went wrong.                   |
| error_path             | string            | An indicator of the class or function which reurned the error. |
| error_trace            | string            | An indicator of where in the source code the error was thrown. |
| error_type             | string            | An enumerated value for the returned  error.                   |
| error_data             | string            | The input task ID which resulted in the error.                 |


#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"${userpass}\",
    \"method\": \"task::enable_z_coin::cancel\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"task_id\": $1
    }
}"
echo
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


#### Response (success - already finished)


```json
{
  "mmrpc": "2.0",
  "error": "Task is finished already",
  "error_path": "init_standalone_coin.manager",
  "error_trace": "init_standalone_coin:144] manager:101]",
  "error_type": "TaskFinished",
  "error_data": 0,
  "id": null
}
```

#### Response (error - no such task)


```json
{
  "mmrpc": "2.0",
  "error": "No such task '1'",
  "error_path": "init_standalone_coin",
  "error_trace": "init_standalone_coin:119]",
  "error_type": "NoSuchTask",
  "error_data": 1,
  "id": null
}

```

</collapse-text>

</div>
