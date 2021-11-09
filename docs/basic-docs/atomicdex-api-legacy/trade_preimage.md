# trade\_preimage (deprecated)

**trade_preimage**

The `trade_preimage` method returns the approximate fee amounts that are paid per the whole swap.
Depending on the parameters, the function returns different results:

- If the `swap_method` is `buy` or `sell`, then the result will include the `taker_fee` and the `fee_to_send_taker_fee`.
  The `taker_fee` amount is paid from the `base` coin balance if the `swap_method` is `sell`, else it is paid from the `rel` coin balance;
- If the `max` field is true, then the result will include the `volume`.

::: tip Note

This method can be used instead of **max_taker_vol**, if the `max` field is true and the `swap_method` is `buy` or `sell`.
Use the resulting `volume` as an argument of the `buy` or `sell` requests.

:::

::: warning Important

Use the `trade_preimage` request with `max = true` and `swap_method = "setprice"` arguments to approximate the fee amounts **only**. Do not use the resulting `volume` as an argument of the `setprice`.

:::

::: tip

This function is deprecated. Please consider using [trade_preimage v2.0](../../../basic-docs/atomicdex/atomicdex-api-20/trade_preimage.html) instead.

:::

#### Arguments

| Structure   | Type                                  | Description                                                                                                                          |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| base        | string                                | the base currency of the request                                                                                                     |
| rel         | string                                | the rel currency of the request                                                                                                      |
| swap_method | string                                | the name of the method whose preimage is requested. Possible values: `buy`, `sell`, `setprice`                                       |
| price       | numeric string or rational            | the price in `rel` the user is willing to pay per one unit of the `base` coin                                                        |
| volume      | numeric string or rational (optional) | the amount the user is willing to trade; ignored if `max = true` **and** `swap_method = setprice`, otherwise, it must be set         |
| max         | bool (optional)                       | whether to return the maximum available volume for `setprice` method; must not be set or `false` if `swap_method` is `buy` or `sell` |

#### Response

| Structure                                    | Type                                 | Description                                                                                                                                    |
| -------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| result                                       | object                               | an object containing the relevant information                                                                                                  |
| result.base_coin_fee                         | object (`ExtendedFeeInfo`)           | the approximate miner fee is paid per the whole swap concerning the `base` coin                                                                |
| result.rel_coin_fee                          | object (`ExtendedFeeInfo`)           | the approximate miner fee is paid per the whole swap concerning the `rel` coin                                                                 |
| result.volume                                | string (numeric, optional)           | the max available volume that can be traded (in decimal representation); empty if the `max` argument is missing or false                       |
| result.volume_rat                            | rational (optional)                  | the max available volume that can be traded (in rational representation); empty if the `max` argument is missing or false                      |
| result.volume_fraction                       | fraction (optional)                  | the max available volume that can be traded (in fraction representation); empty if the `max` argument is missing or false                      |
| result.taker_fee                             | object (optional, `ExtendedFeeInfo`) | the dex fee to be paid by Taker; empty if `swap_method` is `setprice`                                                                          |
| result.fee_to_send_taker_fee                 | object (optional, `ExtendedFeeInfo`) | the approximate miner fee is paid to send the dex fee; empty if `swap_method` is `setprice`                                                    |
| result.total_fees                            | array of `TotalFeeInfo` objects      | each element is a sum of fees required to be paid from user's balance of corresponding `ExtendedFeeInfo.coin`; the elements are unique by coin |

The `ExtendedFeeInfo` structure is as follows:

| Structure             | Type             | Description                                                                                                                                                   |
| ---------------       | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                  | string           | the fee is paid from the user's balance of this coin. This coin name may differ from the `base` or `rel` coins. For example, ERC20 fees are paid by ETH (gas) |
| amount                | string (numeric) | fee amount (in decimal representation)                                                                                                                        |
| amount_rat            | rational         | fee amount (in rational representation)                                                                                                                       |
| amount_fraction       | fraction         | fee amount (in fraction representation)                                                                                                                       |
| amount_fraction       | fraction         | fee amount (in fraction representation)                                                                                                                       |
| paid_from_trading_vol | bool             | whether the fee is paid from trading volume and not use actual `coin` balance                                                                                 |

The `TotalFeeInfo` structure is as follows:

| Structure                 | Type             | Description                                                                                                                                                   |
| ---------------           | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                      | string           | the fee is paid from the user's balance of this coin. This coin name may differ from the `base` or `rel` coins. For example, ERC20 fees are paid by ETH (gas) |
| amount                    | string (numeric) | fee amount (in decimal representation)                                                                                                                        |
| amount_rat                | rational         | fee amount (in rational representation)                                                                                                                       |
| amount_fraction           | fraction         | fee amount (in fraction representation)                                                                                                                       |
| required_balance          | string (numeric) | the required `coin` balance to pay the fee                                                                                                                    |
| required_balance_rat      | rational         | `required_balance` in rational representation                                                                                                                 |
| required_balance_fraction | fraction         | `required_balance` in fraction representation                                                                                                                 |

#### :pushpin: Examples

#### Command (setprice)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"base\":\"RICK\",\"rel\":\"BTC\",\"price\":\"1\",\"volume\":\"0.1\",\"swap_method\":\"setprice\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "base_coin_fee": {
      "coin": "RICK",
      "amount": "0.00001",
      "amount_fraction": {
        "numer": "1",
        "denom": "100000"
      },
      "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ],
      "paid_from_trading_vol": false
    },
    "rel_coin_fee": {
      "coin": "BTC",
      "amount": "0.00029211",
      "amount_fraction": {
        "numer": "29211",
        "denom": "100000000"
      },
      "amount_rat": [ [ 1, [ 29211 ] ], [ 1, [ 100000000 ] ] ],
      "paid_from_trading_vol": true
    },
    "total_fees": [
      {
        "coin": "RICK",
        "amount": "0.00001",
        "amount_fraction": {
          "numer": "1",
          "denom": "100000"
        },
        "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ],
        "required_balance": "0.00001",
        "required_balance_fraction": {
          "numer": "1",
          "denom": "100000"
        },
        "required_balance_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ]
      },
      {
        "coin": "BTC",
        "amount": "0.00029211",
        "amount_fraction": {
          "numer": "29211",
          "denom": "100000000"
        },
        "amount_rat": [ [ 1, [ 29211 ] ], [ 1, [ 100000000 ] ] ],
        "required_balance": "0",
        "required_balance_fraction": {
          "numer": "0",
          "denom": "1"
        },
        "required_balance_rat": [ [ 0, [] ], [ 1, [ 1 ] ] ]
      }
    ]
  }
}
```

</collapse-text>

</div>

#### Command (buy)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"base\":\"BTC\",\"rel\":\"RICK\",\"price\":\"1\",\"volume\":\"0.1\",\"swap_method\":\"buy\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "base_coin_fee": {
      "coin": "BTC",
      "amount": "0.00029211",
      "amount_fraction": {
        "numer": "29211",
        "denom": "100000000"
      },
      "amount_rat": [ [ 1, [ 29211 ] ], [ 1, [ 100000000 ] ] ],
      "paid_from_trading_vol": true
    },
    "rel_coin_fee": {
      "coin": "RICK",
      "amount": "0.00001",
      "amount_fraction": {
        "numer": "1",
        "denom": "100000"
      },
      "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ],
      "paid_from_trading_vol": false
    },
    "taker_fee": {
      "coin": "RICK",
      "amount": "0.0001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287",
      "amount_fraction": {
        "numer": "1",
        "denom": "7770"
      },
      "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 7770 ] ] ],
      "paid_from_trading_vol": false
    },
    "fee_to_send_taker_fee": {
      "coin": "RICK",
      "amount": "0.00001",
      "amount_fraction": {
        "numer": "1",
        "denom": "100000"
      },
      "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ],
      "paid_from_trading_vol": false
    },
    "total_fees": [
      {
        "coin": "BTC",
        "amount": "0.00029211",
        "amount_fraction": {
          "numer": "29211",
          "denom": "100000000"
        },
        "amount_rat": [ [ 1, [ 29211 ] ], [ 1, [ 100000000 ] ] ],
        "required_balance": "0",
        "required_balance_fraction": {
          "numer": "0",
          "denom": "1"
        },
        "required_balance_rat": [ [ 0, [] ], [ 1, [ 1 ] ] ]
      },
      {
        "coin": "RICK",
        "amount": "0.0001487001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287",
        "amount_fraction": {
          "numer": "5777",
          "denom": "38850000"
        },
        "amount_rat": [ [ 1, [ 5777 ] ], [ 1, [ 38850000 ] ] ],
        "required_balance": "0.0001487001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287",
        "required_balance_fraction": {
          "numer": "5777",
          "denom": "38850000"
        },
        "required_balance_rat": [ [ 1, [ 5777 ] ], [ 1, [ 38850000 ] ] ]
      }
    ]
  }
}
```

</collapse-text>

</div>

#### Command (ERC20 and QRC20)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"base\":\"BAT\",\"rel\":\"QC\",\"price\":\"1\",\"volume\":\"2.21363478\",\"swap_method\":\"setprice\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "base_coin_fee": {
      "amount":"0.0045",
      "amount_fraction":{
        "denom":"2000",
        "numer":"9"
      },
      "amount_rat":[[1,[9]],[1,[2000]]],
      "coin":"ETH",
      "paid_from_trading_vol": false
    },
    "rel_coin_fee": {
      "amount":"0.00325",
      "amount_fraction":{
        "denom":"4000",
        "numer":"13"
      },
      "amount_rat":[[0,[13]],[1,[4000]]],
      "coin":"QTUM",
      "paid_from_trading_vol": false
    },
    "total_fees": [
      {
        "amount":"0.003",
        "amount_fraction":{
          "denom":"1000",
          "numer":"3"
        },
        "amount_rat":[[1,[3]],[1,[1000]]],        
        "required_balance":"0.003",
        "required_balance_fraction":{
          "denom":"1000",
          "numer":"3"
        },
        "required_balance_rat":[[1,[3]],[1,[1000]]],
        "coin":"ETH"
      },
      {
        "amount":"0.00325",
        "amount_fraction":{
          "denom":"4000",
          "numer":"13"
        },
        "amount_rat":[[0,[13]],[1,[4000]]],        
        "required_balance":"0.00325",
        "required_balance_fraction":{
          "denom":"4000",
          "numer":"13"
        },
        "required_balance_rat":[[0,[13]],[1,[4000]]],
        "coin":"QTUM"
      }
    ]
  }
}
```

</collapse-text>

</div>
