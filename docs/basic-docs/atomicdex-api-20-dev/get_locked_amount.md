# get\_locked\_amount

The `get_locked_amount` method returns the amount of a coin which is currently locked by a swap which is in progress. If the coin is not activated, a `NoSuchCoin` error will be returned.


#### Arguments

| Parameter | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| coin      | string | The ticker of the coin you want to query.                            |


#### Response

| Parameter                    | Type            | Description                                                                                                    |
| ---------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| coin                         | string          | The ticker of the coin you queried.                                                                                  |
| locked_amount                | object          | An object cointaining the locked amount in decimal, fraction and rational formats.                                   |
| locked_amount.decimal        | numeric string  | The locked amount in [decimal format](https://www.mathsisfun.com/definitions/decimal.html).                          |
| locked_amount.rational       | rational object | The locked amount in [rational format](../atomicdex-api-legacy/rational_number_note.md).                             |
| locked_amount.fraction       | fraction object | The locked amount in [fraction format](https://www.mathsisfun.com/definitions/fraction.html).                        |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"get_locked_amount\",
    \"params\": {
        \"coin\": \"RICK\"
    },
  "id": 42
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "mmrpc": "2.0",
  "result": {
    "coin": "RICK",
    "locked_amount": {
      "decimal": "0.77803",
      "rational": [ [ 1, [ 77803 ] ], [ 1, [ 100000 ] ] ],
      "fraction": {
        "numer": "77803",
        "denom": "100000"
      }
    }
  },
  "id": 42
}
```

#### Response (error)

```json
{
  "mmrpc": "2.0",
  "error": "No such coin: TIME",
  "error_path": "lp_swap.lp_coins",
  "error_trace": "lp_swap:486] lp_coins:2894]",
  "error_type": "NoSuchCoin",
  "error_data": {
    "coin": "TIME"
  },
  "id": 42
}
```


</collapse-text>

</div>
