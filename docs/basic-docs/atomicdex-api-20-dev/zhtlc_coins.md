# ZHTLC Coin Methods

ZHTLC coins, like Pirate (ARRR) and the test coin ZOMBIE take a little longer to enable, and use a new two step method to enable. Activation can take a little while the first time, as we need to download some block cache data, and build a wallet database. Subsequent enabling will be faster, but still take a bit longer than other coins. The second step for activation is optional, but allows us to check the status of the activation process.

To withdraw ZHTLC coins, you need to use the [task::withdraw](withdraw_tasks.html) methods:

- Generate a transaction with `task::withdraw::init`
- Query its status with `task::withdraw::status`
- Cancel generating the transaction with `task::withdraw::cancel`

## task_enable_z_coin_init

:::tip
To enable Z coins you also need to [install some Zcash Params](https://forum.komodoplatform.com/t/installing-zcash-params/603)
:::

#### Arguments

| Structure                                     | Type            | Description                                                                                                                                                                                                                          |
| --------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ticker                                        | string          | Ticker of coin to activate                                                                                                                                                                                                           |
| activation_params                             | object          | Contains details required for activation as explained below                                                                                                                                                                          |
| activation_params.required_confirmations      | integer         | Block confirmations to wait for transactions when doing a swap. Optional, defaults to `3`. Overrides value if set in `coins` file.                                                                                                   |
| activation_params.requires_notarization       | boolean         | For [dPoW](https://komodoplatform.com/en/blog/dpow-demystified/) protected coins, a `true` value will wait for transactions to be notarised when doing swaps. Optional, defaults to `false`. Overrides value if set in `coins` file. |
| activation_params.mode.rpc                    | string          | Set as `Light` to use external electrum & lightwallet_d servers or `Native` to use local block chain data. If native, the `rpc_data` fields below are not required.                                                                  |
| activation_params.mode.rpc_data               | list of objects | Contains details about servers to be used for `Light` mode operation.                                                                                                                                                                |
| ..rpc_data.light_wallet_d_servers             | list of strings | Urls which are hosting lightwallet_d servers                                                                                                                                                                                         |
| ..rpc_data.electrum_servers                   | list of objects | Contains additional details about a coins electrum servers.                                                                                                                                                                          |
| ...electrum_servers.protocol                  | string          | Transport protocol used by Komodo DeFi Framework to connect to the electrum server (`TCP` or `SSL`). Optional, defaults to `TCP`                                                                                                     |
| ...electrum_servers.url                       | string          | The URL and port of an electrum server.                                                                                                                                                                                              |
| ...electrum_servers.disable_cert_verification | boolean         | If `true`, this disables server SSL/TLS certificate verification (e.g. to use self-signed certificate). Optional, defaults to `false` <b>Use at your own risk!</b>                                                                   |
| activation_params.zcash_params_path           | string          | Path to folder containing [Zcash parameters](https://z.cash/technology/paramgen/). Optional, defaults to standard location as defined in [this guide](https://forum.komodoplatform.com/t/installing-zcash-params/603)                |
| activation_params.scan_blocks_per_iteration   | integer         | Sets the number of scanned blocks per iteration during `BuildingWalletDb` state. Optional, default value is 1000.                                                                                                                    |
| activation_params.scan_interval_ms            | integer         | Sets the interval in milliseconds between iterations of `BuildingWalletDb` state. Optional, default value is 0.                                                                                                                      |

:::tip
Using a smaller `scan_blocks_per_iteration` and larger `scan_interval_ms`, will reduce the average CPU load during Z coin activation (at the cost of a longer activation time). These optional fields are recommended when developing for iOS, where a high CPU load may kill the activation process. Android & desktop operating systems do not appear to have any problems with high CPU load during Z coin activation.
:::

#### Response

| Structure | Type    | Description                                               |
| --------- | ------- | --------------------------------------------------------- |
| task_id   | integer | An identifying number which is used to query task status. |

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
                    \"electrum_servers\": [{\"url\":\"zombie.sirseven.me:10033\"}, {\"url\":\"zombie.dragonhound.info:10033\"}],
                    \"light_wallet_d_servers\": [\"http://zombie.sirseven.me:443\", \"http://zombie.dragonhound.info:443\"]
                }
            },
            \"zcash_params_path\": \"/home/username/path_to/.zcash-params\",
            \"scan_blocks_per_iteration\": 100,
            \"scan_interval_ms\": 200
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

## task_enable_z_coin_status

After initiating z coin enabling, you can use the `task_id` to check progress.

#### Arguments

| Parameter          | Type    | Description                                                                              |
| ------------------ | ------- | ---------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.              |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true` |

#### Response

| Structure | Type   | Description                                                                                                           |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| status    | string | A short indication of how the enabling is progressing.                                                                |
| details   | object | Depending on the state of enabling progress, this will contain different information as shown in the responses below. |

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
        \"task_id\": TASK_ID,
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

## task_enable_z_coin_cancel

If you want to cancel the enabling process before it has completed, you can use this method.

#### Arguments

| Structure | Type    | Description                                                           |
| --------- | ------- | --------------------------------------------------------------------- |
| task_id   | integer | The identifying number returned when initiating the enabling process. |

#### Response

| Structure   | Type   | Description                                                    |
| ----------- | ------ | -------------------------------------------------------------- |
| result      | string | Indicates task cancellation was succesful.                     |
| error       | string | An error message to explain what went wrong.                   |
| error_path  | string | An indicator of the class or function which reurned the error. |
| error_trace | string | An indicator of where in the source code the error was thrown. |
| error_type  | string | An enumerated value for the returned error.                    |
| error_data  | string | The input task ID which resulted in the error.                 |

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
        \"task_id\": TASK_ID
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

## z_coin_tx_history

To get the transaction history for ZHTLC coins, you need to use this special method - the [v2 my_tx_history](../atomicdex-api-20/my_tx_history.html) and [legacy my_tx_history](../atomicdex-api-legacy/my_tx_history.html) methods are not compatible with ZHTLC coins. Currently trasaction memos will not be displayed in output, though they can be added to outgoing transactions with the [task::withdraw](withdraw_tasks.html) methods.

#### Arguments

| Structure                 | Type    | Description                                                                                                                                                                                                         |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                      | string  | Ticker of the coin to get history for.                                                                                                                                                                              |
| limit                     | integer | Optional. Limits the number of returned transactions. Defaults to `10`. Ignored if `max = true`.                                                                                                                    |
| paging_options.FromId     | string  | Optional. Komodo DeFi Framework will skip records until it reaches this ID, skipping the from_id as well; track the internal_id of the last displayed transaction to find the value of this field for the next page |
| paging_options.PageNumber | integer | Optional. Komodo DeFi Framework will return limit swaps from the selected page. Ignored if `FromId` .                                                                                                               |

#### Response

| Structure                                     | Type             | Description                                                                                                                                    |
| --------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| transactions                                  | array of objects | transactions data                                                                                                                              |
| from_id                                       | string           | the from_id specified in the request; this value is null if from_id was not set                                                                |
| skipped                                       | number           | the number of skipped records (i.e. the position of `from_id` in the list + 1); this value is 0 if `from_id` was not set                       |
| limit                                         | number           | the limit that was set in the request; note that the actual number of transactions can differ from the specified limit (e.g. on the last page) |
| total                                         | number           | the total number of transactions available                                                                                                     |
| page_number                                   | number           | the page_number that was set in the request                                                                                                    |
| total_pages                                   | number           | total pages available with the selected limit                                                                                                  |
| current_block                                 | number           | the number of the latest block of coin blockchain                                                                                              |
| sync_status                                   | object           | provides the information that helps to track the progress of transaction history preloading at background                                      |
| sync_status.state                             | string           | current state of sync; possible values: `NotEnabled`, `NotStarted`, `InProgress`, `Error`, `Finished`                                          |
| sync_status.additional_info                   | object           | additional info that helps to track the progress; present for `InProgress` and `Error` states only                                             |
| sync_status.additional_info.blocks_left       | number           | present for ETH/ERC20 coins only; displays the number of blocks left to be processed for `InProgress` state                                    |
| sync_status.additional_info.transactions_left | number           | present for UTXO coins only; displays the number of transactions left to be processed for `InProgress` state                                   |
| sync_status.additional_info.code              | number           | displays the error code for `Error` state                                                                                                      |
| sync_status.additional_info.message           | number           | displays the error message for `Error` state                                                                                                   |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"z_coin_tx_history\",
  \"mmrpc\": \"2.0\",
  \"params\": {
    \"coin\": \"ARRR\",
    \"limit\": 2,
    \"paging_options\": {
      \"PageNumber\": 2
    }
  }
}"
echo ""
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "mmrpc": "2.0",
  "result": {
    "coin": "ARRR",
    "target": {
      "type": "iguana"
    },
    "current_block": 2228711,
    "transactions": [
      {
        "tx_hash": "b7e8307778d7d61ebb2ebc7a130661ef6fbeb66ee5d15d0f84a3bfce3ebad5a1",
        "from": [
          "zs1e3puxpnal8ljjrqlxv4jctlyndxnm5a3mj5rarjvp0qv72hmm9caduxk9asu9kyc6erfx4zsauj"
        ],
        "to": [
          "zs1e3puxpnal8ljjrqlxv4jctlyndxnm5a3mj5rarjvp0qv72hmm9caduxk9asu9kyc6erfx4zsauj"
        ],
        "spent_by_me": "17.65495855",
        "received_by_me": "17.65494855",
        "my_balance_change": "-0.00001000",
        "block_height": 2224011,
        "confirmations": 4701,
        "timestamp": 1673018341,
        "transaction_fee": "0.00001",
        "coin": "ARRR",
        "internal_id": 26
      },
      {
        "tx_hash": "967deb0a8cbce0c1f0ba20deee7a955e1a82bd1173bb3dd15cc95f03738ca65c",
        "from": [
          "zs1e3puxpnal8ljjrqlxv4jctlyndxnm5a3mj5rarjvp0qv72hmm9caduxk9asu9kyc6erfx4zsauj"
        ],
        "to": [
          "zs10ah73fpudlecg678jmqjdyeym5fgccvjytqry533rq2w04dekenxe8ekt349s3lelmlss3j4u9q",
          "zs1e3puxpnal8ljjrqlxv4jctlyndxnm5a3mj5rarjvp0qv72hmm9caduxk9asu9kyc6erfx4zsauj"
        ],
        "spent_by_me": "20.65496855",
        "received_by_me": "17.65495855",
        "my_balance_change": "-3.00001000",
        "block_height": 2196913,
        "confirmations": 31799,
        "timestamp": 1671100306,
        "transaction_fee": "0.00001",
        "coin": "ARRR",
        "internal_id": 25
      }
    ],
    "sync_status": {
      "state": "Finished"
    },
    "limit": 2,
    "skipped": 2,
    "total": 28,
    "total_pages": 14,
    "paging_options": {
      "PageNumber": 2
    }
  },
  "id": null
}
```

#### Response (error - coin not supported)

```json
{
  "mmrpc": "2.0",
  "error": "TKL",
  "error_path": "my_tx_history_v2",
  "error_trace": "my_tx_history_v2:523]",
  "error_type": "NotSupportedFor",
  "error_data": "TKL",
  "id": null
}
```

#### Response (error - coin not active)

```json
{
  "mmrpc": "2.0",
  "error": "ZOMBIE",
  "error_path": "my_tx_history_v2.lp_coins",
  "error_trace": "my_tx_history_v2:521] lp_coins:2849]",
  "error_type": "CoinIsNotActive",
  "error_data": "ZOMBIE",
  "id": null
}
```

</collapse-text>

</div>
