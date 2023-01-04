## task::enable_z_coin::status

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

</collapse-text>

</div>



<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

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

</collapse-text>

</div>




<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

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

</collapse-text>

</div>



<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

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

</collapse-text>

</div>



<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

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

</collapse-text>

</div>


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

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
