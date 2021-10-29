
## kmd\_rewards\_info

**kmd_rewards_info**

The `kmd_rewards_info` method returns information about the active user rewards that can be claimed by an address's unspent outputs.

::: tip Note

This method only works when the KMD coin is activated.

:::

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure              | Type                       | Description                                                                                                                                         |
| ---------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------        |
| result                 | array of objects           | the rewards info; each element corresponds to an unspent output and contains detailed information about the active user rewards corresponding to it |
| result.tx_hash         | string                     | the hash of the transaction                                                                                                                         |
| result.height          | number (integer, optional) | the height of the block in which the transaction was included (empty if the tx is not mined yet)                                                    |
| result.output_index    | number (integer)           | the zero-based index of the output in the transaction’s list of outputs                                                                             |
| result.amount          | string (numeric)           | the transaction output’s value                                                                                                                      |
| result.locktime        | number (integer)           | the transaction output's locktime                                                                                                                   |
| result.accrued_rewards | object                     | the amount of accrued rewards if they exist or the reason for their non existence                                                                   |
| result.accrue_start_at | number (integer, optional) | the rewards start to accrue at this time for the given transaction (empty if the rewards will never accrue to it)                                   |
| result.accrue_stop_at  | number (integer, optional) | the rewards stop to accrue at this time for the given transaction (empty if the tx is not mined yet or if rewards will never accrue to it)          |

Where the `result.accrued_rewards` has either

| Structure | Type             | Description                   |
| --------- | ---------------- | ----------------------------- |
| Accrued   | string (numeric) | the amount of accrued rewards |

or

| Structure        | Type   | Description                            |
| ---------------- | ------ | -------------------------------------- |
| NotAccruedReason | string | the reason why rewards are not accrued |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783/" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"kmd_rewards_info\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": [
    {
      "accrue_stop_at":1596144028,
      "accrued_rewards":{
         "Accrued":"0.00450984"
      },
      "amount":"47.99897112",
      "height":1986467,
      "input_index":1,
      "locktime":1596099388,
      "tx_hash":"016bfb8fcf8704a30b5daf6b4bcce9d7e848141b53df44a5eae3db4279227401"
    },
    {
      "accrue_stop_at":1596142801,
      "accrued_rewards":{
        "NotAccruedReason":"UtxoAmountLessThanTen"
      },
      "amount":"0.5",
      "height":1986481,
      "input_index":0,
      "locktime":1596098161,
      "tx_hash":"762d02d9d52faf365b55375da5e61ce34bb0ea391fbcb23e74b2adf8165f1bbb"
    }
  ]
}
```

</collapse-text>

</div>
