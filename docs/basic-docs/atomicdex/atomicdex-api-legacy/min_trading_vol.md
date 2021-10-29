
## min\_trading\_vol 

**min_trading_vol coin**

The `min_trading_vol` method returns the minimum required volume for buy/sell/setprice methods for the selected `coin`.


#### Arguments

| Structure  | Type              | Description                                                           |
| ---------- | ----------------- | --------------------------------------------------------------------- |
| coin       | string            | the name of the coin to retrieve the minimum trading volume           |

#### Response

| Structure                       | Type             | Description                                                     |
| ------------------------------- | ---------------- | --------------------------------------------------------------- |
| result                          | object           | result object                                                   |
| result.coin                     | string           | the coin ticker from the request                                |
| result.min_trading_vol          | string (decimal) | the minimum trading volume threshold in decimal representation  |
| result.min_trading_vol_rat      | rational         | the minimum trading volume threshold in rational representation |
| result.min_trading_vol_fraction | fraction         | the minimum trading volume threshold in fraction representation |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data '
{
  "userpass":\"$userpass\",
  "method":"min_trading_vol",
  "coin": "RICK"
}
'
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "coin": "RICK",
    "min_trading_vol": "0.0001",
    "min_trading_vol_fraction": {
      "numer": "1",
      "denom": "10000"
    },
    "min_trading_vol_rat": [ [ 1, [ 1 ] ], [ 1, [ 10000 ] ] ]
  }
}
```

</collapse-text>

</div>
