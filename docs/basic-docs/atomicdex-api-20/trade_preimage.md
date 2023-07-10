# trade_preimage

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

### Arguments

| Structure   | Type                                  | Description                                                                                                                          |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| base        | string                                | the base currency of the request                                                                                                     |
| rel         | string                                | the rel currency of the request                                                                                                      |
| swap_method | string                                | the name of the method whose preimage is requested. Possible values: `buy`, `sell`, `setprice`                                       |
| price       | numeric string or rational            | the price in `rel` the user is willing to pay per one unit of the `base` coin                                                        |
| volume      | numeric string or rational (optional) | the amount the user is willing to trade; ignored if `max = true` **and** `swap_method = setprice`, otherwise, it must be set         |
| max         | bool (optional)                       | whether to return the maximum available volume for `setprice` method; must not be set or `false` if `swap_method` is `buy` or `sell` |

### Result

| Structure                    | Type                                 | Description                                                                                                                                    |
| ---------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| result                       | object                               | an object containing the relevant information                                                                                                  |
| result.base_coin_fee         | object (`ExtendedFeeInfo`)           | the approximate miner fee is paid per the whole swap concerning the `base` coin                                                                |
| result.rel_coin_fee          | object (`ExtendedFeeInfo`)           | the approximate miner fee is paid per the whole swap concerning the `rel` coin                                                                 |
| result.volume                | string (numeric, optional)           | the max available volume that can be traded (in decimal representation); empty if the `max` argument is missing or false                       |
| result.volume_rat            | rational (optional)                  | the max available volume that can be traded (in rational representation); empty if the `max` argument is missing or false                      |
| result.volume_fraction       | fraction (optional)                  | the max available volume that can be traded (in fraction representation); empty if the `max` argument is missing or false                      |
| result.taker_fee             | object (optional, `ExtendedFeeInfo`) | the dex fee to be paid by Taker; empty if `swap_method` is `setprice`                                                                          |
| result.fee_to_send_taker_fee | object (optional, `ExtendedFeeInfo`) | the approximate miner fee is paid to send the dex fee; empty if `swap_method` is `setprice`                                                    |
| result.total_fees            | array of `ExtendedFeeInfo` objects   | each element is a sum of fees required to be paid from user's balance of corresponding `ExtendedFeeInfo.coin`; the elements are unique by coin |

Where the `ExtendedFeeInfo` has

| Structure             | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                  | string           | the fee is paid from the user's balance of this coin. This coin name may differ from the `base` or `rel` coins. For example, ERC20 fees are paid by ETH (gas)                                                                                                                                                                                                                                                        |
| amount                | string (numeric) | fee amount (in decimal representation)                                                                                                                                                                                                                                                                                                                                                                               |
| amount_rat            | rational         | fee amount (in rational representation)                                                                                                                                                                                                                                                                                                                                                                              |
| amount_fraction       | fraction         | fee amount (in fraction representation)                                                                                                                                                                                                                                                                                                                                                                              |
| paid_from_trading_vol | boolean          | If `true`, fees are deducted from the payment amount for the spend/refund UTXO HTLC transaction. If `false`, fees are not deducted from the traded volume. This is where an additional miner fee is needed to broadcast a swap transaction and/or where gas paid (e.g in ETH for an ERC20 trade) - in this case, user requires a sufficient current ETH balance to cover the fees before they can initiate the swap. |

### :warning: Error types

#### NotSufficientBalance

The `available` balance of the `coin` is not sufficient to start the swap.

| Structure       | Type                       | Description                                                                               |
| --------------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| coin            | string                     | the name of the coin which balance is not sufficient                                      |
| available       | string (numeric)           | the balance available for swap, including the amount locked by other swaps                |
| required        | string (numeric)           | the amount required to start the swap. This amount is necessary but may not be sufficient |
| locked_by_swaps | string (numeric, optional) | the amount locked by other swaps                                                          |

#### NotSufficientBaseCoinBalance

The available balance of the base `coin` is not sufficient to pay transaction fees.

For example, ERC20 fees are paid by ETH (gas), and this error type is returned if the ETH coin balance is not sufficient to start the swap.

| Structure       | Type                       | Description                                                                               |
| --------------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| coin            | string                     | the name of the base coin which balance is not sufficient                                 |
| available       | string (numeric)           | the balance available for swap, including the amount locked by other swaps                |
| required        | string (numeric)           | the amount required to start the swap. This amount is necessary but may not be sufficient |
| locked_by_swaps | string (numeric, optional) | the amount is locked by other swaps                                                       |

#### VolumeTooLow

The specified `volume` is too low. Required at least `threshold`.

::: tip Note

If the `coin` field returned in Response is the same as the `rel` argument in Request, then the base volume threshold can be calculated as follows:
`base_coin_threshold = rel_vol_threshold / price`

:::

| Structure | Type             | Description                                        |
| --------- | ---------------- | -------------------------------------------------- |
| coin      | string           | either `base` or `rel` coin specified in Request   |
| volume    | string (numeric) | the amount the user was willing to trade in `coin` |
| threshold | string (numeric) | the `volume` has not to be less than this amount   |

#### NoSuchCoin

The specified coin was not found or is not activated yet.

| Structure | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| coin      | string | either `base` or `rel` coin specified in Request |

#### CoinIsWalletOnly

The specified coin is wallet only and cannot be participated in the swap.

| Structure | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| coin      | string | either `base` or `rel` coin specified in Request |

#### BaseEqualRel

The coin is wallet only and cannot be participated in the swap.

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### InvalidParam

Incorrect use of the `param` parameter in Request.

| Structure | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| param     | string | the name of the parameter in Request             |
| reason    | string | the reason why the parameter is used incorrectly |

#### PriceTooLow

The specified `price` is too low.

| Structure | Type             | Description                                                                        |
| --------- | ---------------- | ---------------------------------------------------------------------------------- |
| price     | string (numeric) | the price in `rel` the user was willing to receive per one unit of the `base` coin |
| threshold | string (numeric) | the `price` has not to be less than this amount                                    |

#### Transport

The request was failed due to a network error.

| Structure | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| (none)    | string | the transport error description |

#### InternalError

The request was failed due to a Komodo DeFi Framework internal error.

| Structure | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| (none)    | string | the internal error description |

### :pushpin: Examples

#### Command (setprice)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"params\":{\"base\":\"BTC\",\"rel\":\"RICK\",\"price\":\"1\",\"volume\":\"0.1\",\"swap_method\":\"setprice\"},\"id\":0}"
```

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "base_coin_fee": {
      "coin": "KMD",
      "amount": "0.00001",
      "amount_fraction": {
        "numer": "1",
        "denom": "100000"
      },
      "amount_rat": [
        [1, [1]],
        [1, [100000]]
      ],
      "paid_from_trading_vol": false
    },
    "rel_coin_fee": {
      "coin": "DGB",
      "amount": "0.00030782",
      "amount_fraction": {
        "numer": "15391",
        "denom": "50000000"
      },
      "amount_rat": [
        [1, [15391]],
        [1, [50000000]]
      ],
      "paid_from_trading_vol": true
    },
    "volume": "1138.46868712",
    "volume_fraction": {
      "numer": "14230858589",
      "denom": "12500000"
    },
    "volume_rat": [
      [1, [1345956701, 3]],
      [1, [12500000]]
    ],
    "total_fees": [
      {
        "coin": "KMD",
        "amount": "0.00001",
        "amount_fraction": {
          "numer": "1",
          "denom": "100000"
        },
        "amount_rat": [
          [1, [1]],
          [1, [100000]]
        ],
        "required_balance": "0.00001",
        "required_balance_fraction": {
          "numer": "1",
          "denom": "100000"
        },
        "required_balance_rat": [
          [1, [1]],
          [1, [100000]]
        ]
      },
      {
        "coin": "DGB",
        "amount": "0.00030782",
        "amount_fraction": {
          "numer": "15391",
          "denom": "50000000"
        },
        "amount_rat": [
          [1, [15391]],
          [1, [50000000]]
        ],
        "required_balance": "0",
        "required_balance_fraction": {
          "numer": "0",
          "denom": "1"
        },
        "required_balance_rat": [
          [0, []],
          [1, [1]]
        ]
      }
    ]
  },
  "id": 0
}
```

#### Command (buy)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"params\":{\"base\":\"BTC\",\"rel\":\"RICK\",\"price\":\"1\",\"volume\":\"0.1\",\"swap_method\":\"buy\"},\"id\":0}"
```

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "base_coin_fee": {
      "amount": "0.00042049",
      "amount_fraction": {
        "denom": "100000000",
        "numer": "42049"
      },
      "amount_rat": [
        [1, [42049]],
        [1, [100000000]]
      ],
      "coin": "BTC",
      "paid_from_trading_vol": true
    },
    "rel_coin_fee": {
      "amount": "0.0001",
      "amount_fraction": {
        "denom": "10000",
        "numer": "1"
      },
      "amount_rat": [
        [1, [1]],
        [1, [10000]]
      ],
      "coin": "RICK",
      "paid_from_trading_vol": false
    },
    "taker_fee": {
      "amount": "0.00012870012870012872",
      "amount_fraction": {
        "denom": "7770",
        "numer": "1"
      },
      "amount_rat": [
        [1, [1]],
        [1, [7770]]
      ],
      "coin": "RICK",
      "paid_from_trading_vol": false
    },
    "fee_to_send_taker_fee": {
      "amount": "0.0001",
      "amount_fraction": {
        "denom": "10000",
        "numer": "1"
      },
      "amount_rat": [
        [1, [1]],
        [1, [10000]]
      ],
      "coin": "RICK",
      "paid_from_trading_vol": false
    },
    "total_fees": [
      {
        "coin": "RICK",
        "amount": "0.001307001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287",
        "amount_fraction": {
          "numer": "50777",
          "denom": "38850000"
        },
        "amount_rat": [
          [1, [50777]],
          [1, [38850000]]
        ],
        "required_balance": "0.001307001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287",
        "required_balance_fraction": {
          "numer": "50777",
          "denom": "38850000"
        },
        "required_balance_rat": [
          [1, [50777]],
          [1, [38850000]]
        ]
      },
      {
        "coin": "tBTC",
        "amount": "0.00042049",
        "amount_fraction": {
          "denom": "100000000",
          "numer": "42049"
        },
        "amount_rat": [
          [1, [42049]],
          [1, [100000000]]
        ],
        "required_balance": "0",
        "required_balance_fraction": {
          "numer": "0",
          "denom": "1"
        },
        "required_balance_rat": [
          [0, []],
          [1, [1]]
        ]
      }
    ]
  },
  "id": 0
}
```

#### Command (sell, max)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"params\":{\"base\":\"BTC\",\"rel\":\"RICK\",\"price\":\"1\",\"volume\":\"2.21363478\",\"swap_method\":\"sell\"},\"id\":0}"
```

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "base_coin_fee": {
      "amount": "0.00042049",
      "amount_fraction": {
        "denom": "100000000",
        "numer": "42049"
      },
      "amount_rat": [
        [1, [42049]],
        [1, [100000000]]
      ],
      "coin": "BTC",
      "paid_from_trading_vol": false
    },
    "rel_coin_fee": {
      "coin": "RICK",
      "amount": "0.00001",
      "amount_fraction": {
        "numer": "1",
        "denom": "100000"
      },
      "amount_rat": [
        [1, [1]],
        [1, [100000]]
      ],
      "paid_from_trading_vol": true
    },
    "taker_fee": {
      "amount": "0.0028489508108108107",
      "amount_fraction": {
        "denom": "1850000000",
        "numer": "5270559"
      },
      "amount_rat": [
        [1, [5270559]],
        [1, [1850000000]]
      ],
      "coin": "BTC",
      "paid_from_trading_vol": false
    },
    "fee_to_send_taker_fee": {
      "amount": "0.00033219",
      "amount_fraction": {
        "denom": "100000000",
        "numer": "33219"
      },
      "amount_rat": [
        [1, [33219]],
        [1, [100000000]]
      ],
      "coin": "BTC",
      "paid_from_trading_vol": false
    },
    "total_fees": [
      {
        "coin": "RICK",
        "amount": "0.00001",
        "amount_fraction": {
          "numer": "1",
          "denom": "100000"
        },
        "amount_rat": [
          [1, [1]],
          [1, [100000]]
        ],
        "required_balance": "0",
        "required_balance_fraction": {
          "numer": "0",
          "denom": "1"
        },
        "required_balance_rat": [
          [0, []],
          [1, [1]]
        ]
      },
      {
        "coin": "BTC",
        "amount": "0.0036016308108108106",
        "amount_fraction": {
          "denom": "1850000000",
          "numer": "6663017"
        },
        "amount_rat": [
          [1, [6663017]],
          [1, [1850000000]]
        ],
        "required_balance": "0.0036016308108108106",
        "required_balance_fraction": {
          "denom": "1850000000",
          "numer": "6663017"
        },
        "required_balance_rat": [
          [1, [6663017]],
          [1, [1850000000]]
        ]
      }
    ]
  },
  "id": 0
}
```

#### Command (ERC20 and QRC20)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"params\":{\"base\":\"BAT\",\"rel\":\"QC\",\"price\":\"1\",\"volume\":\"2.21363478\",\"swap_method\":\"setprice\"},\"id\":0}"
```

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "base_coin_fee": {
      "amount": "0.0045",
      "amount_fraction": {
        "denom": "2000",
        "numer": "9"
      },
      "amount_rat": [
        [1, [9]],
        [1, [2000]]
      ],
      "coin": "ETH",
      "paid_from_trading_vol": false
    },
    "rel_coin_fee": {
      "amount": "0.00325",
      "amount_fraction": {
        "denom": "4000",
        "numer": "13"
      },
      "amount_rat": [
        [0, [13]],
        [1, [4000]]
      ],
      "coin": "QTUM",
      "paid_from_trading_vol": false
    },
    "total_fees": [
      {
        "amount": "0.003",
        "amount_fraction": {
          "denom": "1000",
          "numer": "3"
        },
        "amount_rat": [
          [1, [3]],
          [1, [1000]]
        ],
        "required_balance": "0.003",
        "required_balance_fraction": {
          "denom": "1000",
          "numer": "3"
        },
        "required_balance_rat": [
          [1, [3]],
          [1, [1000]]
        ],
        "coin": "ETH"
      },
      {
        "amount": "0.00325",
        "amount_fraction": {
          "denom": "4000",
          "numer": "13"
        },
        "amount_rat": [
          [0, [13]],
          [1, [4000]]
        ],
        "required_balance": "0.00325",
        "required_balance_fraction": {
          "denom": "4000",
          "numer": "13"
        },
        "required_balance_rat": [
          [0, [13]],
          [1, [4000]]
        ],
        "coin": "QTUM"
      }
    ]
  },
  "id": 0
}
```

#### Response (NotSufficientBalance error)

```json
{
  "mmrpc": "2.0",
  "error": "Not enough BTC for swap: available 0.000015, required at least 0.10012, locked by swaps None",
  "error_path": "maker_swap",
  "error_trace": "maker_swap:1540] maker_swap:1641]",
  "error_type": "NotSufficientBalance",
  "error_data": {
    "coin": "BTC",
    "available": "0.000015",
    "required": "0.10012",
    "locked_by_swaps": "0"
  },
  "id": 0
}
```

#### Response (VolumeTooLow error)

```json
{
  "mmrpc": "2.0",
  "error": "The volume 0.00001 of the RICK coin less than minimum transaction amount 0.0001",
  "error_path": "maker_swap",
  "error_trace": "maker_swap:1599]",
  "error_type": "VolumeTooLow",
  "error_data": {
    "coin": "RICK",
    "volume": "0.00001",
    "threshold": "0.0001"
  },
  "id": 0
}
```

#### Response (Transport error)

```json
{
  "mmrpc": "2.0",
  "error": "Transport error: JsonRpcError { client_info: 'coin: tBTC', request: JsonRpcRequest { jsonrpc: '2.0', id: '31', method: 'blockchain.estimatefee', params: [Number(1), String('ECONOMICAL')] }, error: Transport('rpc_clients:1237] rpc_clients:1239] ['rpc_clients:2047] common:1385] future timed out']') }",
  "error_path": "taker_swap.utxo_common",
  "error_trace": "taker_swap:1599] utxo_common:1990] utxo_common:166]",
  "error_type": "Transport",
  "error_data": "JsonRpcError { client_info: 'coin: tBTC', request: JsonRpcRequest { jsonrpc: '2.0', id: '31', method: 'blockchain.estimatefee', params: [Number(1), String('ECONOMICAL')] }, error: Transport('rpc_clients:1237] rpc_clients:1239] ['rpc_clients:2047] common:1385] future timed out']') }",
  "id": 0
}
```

#### Response (incorrect use of "max" error)

```json
{
  "mmrpc": "2.0",
  "error": "Incorrect use of the 'max' parameter: 'max' cannot be used with 'sell' or 'buy' method",
  "error_path": "taker_swap",
  "error_trace": "taker_swap:1602]",
  "error_type": "InvalidParam",
  "error_data": {
    "param": "max",
    "reason": "'max' cannot be used with 'sell' or 'buy' method"
  },
  "id": 0
}
```
