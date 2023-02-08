# Account Balance Tasks

If you have activated a coin with the [task::enable_utxo::init](coin_activation_tasks.html#task-enable-utxo-init) or [task::enable_qtum::init](coin_activation_tasks.html#task-enable-qtum-init) and used the `"priv_key_policy": "Trezor"` parameter, your funds may be spread across a range of addresses under a specified account index. The methods below will return the combined balance of your account, detailing the balance for each active account address.


## task\_account\_balance\_init

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
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::account_balance::init\",
    \"params\": {
        \"coin\": \"COIN_NAME\",
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


## task\_account\_balance\_status

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
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::account_balance::status\",
    \"params\": {
        \"task_id\": TASK_ID,
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

## task\_account\_balance\_cancel

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
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::account_balance::cancel\",
    \"params\": {
        \"task_id\": TASK_ID
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
