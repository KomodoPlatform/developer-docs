# max\_maker\_vol

The `max_maker_vol` method returns the maximum volume of a coin which can be used to create a maker order (taking into account estimated fees). If the coin is not activated, a `NoSuchCoin` error will be returned.


#### Arguments

| Parameter | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| coin      | string | The ticker of the coin you want to query.                            |


#### Response

| Parameter                    | Type            | Description                                                                                                                          |
| ---------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| coin                         | string          | The ticker of the coin you queried.                                                                                                  |
| volume                       | object          | An object cointaining the tradable maker volume in decimal, fraction and rational formats.                                           |
| volume.decimal               | numeric string  | The tradable maker volume in [decimal format](https://www.mathsisfun.com/definitions/decimal.html).                                  |
| volume.rational              | rational object | The tradable maker volume in [rational format](../atomicdex-api-legacy/rational_number_note.md).                                     |
| volume.fraction              | fraction object | The tradable maker volume in [fraction format](https://www.mathsisfun.com/definitions/fraction.html).                                |
| balance                      | object          | An object cointaining the locked amount in decimal, fraction and rational formats.                                                   |
| balance.decimal              | numeric string  | The coin balance in [decimal format](https://www.mathsisfun.com/definitions/decimal.html).                                           |
| balance.rational             | rational object | The coin balance in [rational format](../atomicdex-api-legacy/rational_number_note.md).                                              |
| balance.fraction             | fraction object | The coin balance in [fraction format](https://www.mathsisfun.com/definitions/fraction.html).                                         |
| locked_by_swaps              | object          | An object cointaining the volume of a coin's balance which is locked by swaps in progress in decimal, fraction and rational formats. |
| locked_by_swaps.decimal      | numeric string  | The locked by swaps amount in [decimal format](https://www.mathsisfun.com/definitions/decimal.html).                                 |
| locked_by_swaps.rational     | rational object | The locked by swaps amount in [rational format](../atomicdex-api-legacy/rational_number_note.md).                                    |
| locked_by_swaps.fraction     | fraction object | The locked by swaps amount in [fraction format](https://www.mathsisfun.com/definitions/fraction.html).                               |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"YOUR_RPCPASSWORD\",
  \"mmrpc\": \"2.0\",
  \"method\": \"max_maker_vol\",
  \"params\": {
    \"coin\": \"RICK\",
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
    "coin": "MORTY",
    "volume": {
      "decimal": "4.489763268712998712998712998712998712998712998712998712998712998712998712998712998712998712998712999",
      "rational": [
        [1, [962255003, 81]],
        [1, [390588672, 18]]
      ],
      "fraction": {
        "numer": "348854605979",
        "denom": "77700000000"
      }
    },
    "balance": {
      "decimal": "5.49110027",
      "rational": [
        [1, [549110027]],
        [1, [100000000]]
      ],
      "fraction": {
        "numer": "549110027",
        "denom": "100000000"
      }
    },
    "locked_by_swaps": {
      "decimal": "1.001317001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001",
      "rational": [
        [1, [77802331]],
        [1, [77700000]]
      ],
      "fraction": {
        "numer": "77802331",
        "denom": "77700000"
      }
    }
  },
  "id": null
}
```

#### Response (error)

```json
{
  "mmrpc": "2.0",
  "error": "No such coin TIME",
  "error_path": "max_maker_vol_rpc.lp_coins",
  "error_trace": "max_maker_vol_rpc:140] lp_coins:2894]",
  "error_type": "NoSuchCoin",
  "error_data": {
    "coin": "TIME"
  },
  "id": null
}
```


</collapse-text>

</div>
