# withdraw_init

The `withdraw_init` method generates, signs, and returns a transaction that transfers the `amount` of `coin` to the address indicated in the `to` argument. It is only used for z coins like ZOMBIE, which may take some time to complete. The status of this method can be queried via the [withdraw_status](withdraw_status.html) method, or cancelled with [withdraw_status](withdraw_cancel.html).


### Arguments

| Structure     | Type             | Description                                                                                                                               |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| coin          | string           | the name of the coin the user desires to withdraw                                                                                         |
| to            | string           | coins are withdrawn to this address                                                                                                       |
| amount        | string (numeric) | the amount the user desires to withdraw, ignored when `max=true`                                                                          |
| max           | bool             | withdraw the maximum available amount                                                                                                     |
| fee.type      | string           | type of transaction fee; possible values: `UtxoFixed`, `UtxoPerKbyte`, `EthGas`                                                           |
| fee.amount    | string (numeric) | fee amount in coin units, used only when type is `UtxoFixed` (fixed amount not depending on tx size) or `UtxoPerKbyte` (amount per Kbyte) |



#### Response

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | An identifying number which is used to query task status.                                                          |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{
    \"mmrpc\":\"2.0\",
    \"userpass\":\"${userpass}\",
    \"method\":\"task::withdraw::init\",
    \"params\": {
        \"coin\":\"$1\",
        \"to\":\"$2\",
        \"amount\":\"$3\"
    },
    \"id\":0
}"
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

</div>                                                                                                                   |
