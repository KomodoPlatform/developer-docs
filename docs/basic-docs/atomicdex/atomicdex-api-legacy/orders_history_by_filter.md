
## orders\_history\_by\_filter

**orders_history_by_filter (order_type initial_action base rel from_price to_price from_volume to_volume from_timestamp to_timestamp was_taker status include_details)**

The `orders_history_by_filter` method returns all orders whether active or inactive that match the selected filters. Please note that all filters (order_type initial_action, etc.) are combined using logical AND.

#### Arguments

| Structure      | Type                          | Description                                                                            |
| -------------- | ----------------------------- | -----------------------------------------------------------------------                |
| order_type        | string | return only orders that match the  `request.order_type`; `order_type` can be "Maker" or "Taker" |
| initial_action     | string | return only orders that match the  `request.initial_action`; `initial_action` can be "Sell" or "Buy". Note that maker order `initial_action` is considered "Sell" |
| base | string | return only orders that match the `order.base = request.base` condition |
| rel   | string | return only orders that match the `order.rel = request.rel` condition |
| from_price   | numeric string or rational | return only orders that match the `order.price >= request.from_price` condition    |
| to_price   | numeric string or rational | return only orders that match the `order.price <= request.to_price` condition    |
| from_volume   | numeric string or rational | return only orders that match the `order.volume >= request.from_volume` condition    |
| to_volume   | numeric string or rational | return only orders that match the `order.volume <= request.to_volume` condition    |
| from_timestamp   | number (timestamp in seconds) | return only orders that match the `order.created_at >= request.from_timestamp` condition    |
| to_timestamp   | number (timestamp in seconds) | return only orders that match the `order.created_at <= request.to_timestamp` condition    |
| was_taker   | bool | return only `GoodTillCancelled` orders that got converted from `taker` to `maker`      |
| status   | string | return only orders that match the  `request.status`; `status` can be: <ul><li>For active maker order `Created`, `Updated`</li><li>For active taker order `Created`</li><li>For inactive maker order `Fulfilled`, `Insufficient Balance`, `Cancelled`</li><li>For inactive taker order `Fulfilled`, `Timed Out`, `Cancelled`</li></ul>    |
| include_details   | bool | whether to include complete order details in response; defaults to false    |

#### Response

| Structure                  | Type                           | Description                                                          |
| --------------------------- | ------------------------------ | -------------------------------------------------------------------- |
| result                      | result object                  |                                                                      |
| result.orders               | array of order objects         | array of orders that match the selected filters with minimal details |
| result.orders.uuid          | string                         | uuid of the order                                                    |
| result.orders.order_type    | string                         | type of the order; "Maker" or "Taker"                                |
| result.orders.base          | string                         | base coin of the order                                               |
| result.orders.rel           | string                         | rel coin of the order                                                |
| result.orders.price         | number (decimal)               | price of the order                                                   |
| result.orders.volume        | number (decimal)               | volume of the order                                                  |
| result.orders.created_at    | number                         | unix timestamp in milliseconds, indicating the order creation time   |
| result.orders.last_updated  | number                         | unix timestamp in milliseconds, indicating the time the order was last updated |
| result.orders.was_taker     | number                         | `1` if the order was a "Taker" order that got converted to "Maker", `0` otherwise |
| result.orders.status        | string                         | status of the Order                                                  |
| result.details              | array of order details objects | array of complete order details for every order that matches the selected filters; returns `[]` if `include_details` is false or not included in the request. |
| result.details.type         | string                         | type of the order; "Maker" or "Taker"                                |
| result.details.order        | object                         | the order details object                                             |
| result.details.order.changes_history | array                          | array containing previous details that was changed for this order as objects, available only for maker orders that was updated with `update_maker_order` method |
| found_records               | number                         | the number of returned orders                                        |
| warnings                    | array                          | array containing warnings objects                                    |
| warnings.uuid               | string                         | uuid of the order that produced this warning                         |
| warnings.warning            | string                         | warning message                                                      |

#### :pushpin: Examples

#### Command (select orders from history that have order_type = Taker and initial_action = Buy)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"order_type\":\"Taker\",\"initial_action\":\"Buy\"}"
```

#### Command (select orders from history that have base = RICK and rel = MORTY)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"base\":\"RICK\",\"rel\":\"MORTY\"}"
```

#### Command (select orders from history that have base = RICK and price >= 1  and volume <= 1)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"base\":\"RICK\",\"from_price\":1,\"to_volume\":1}"
```

#### Command (select orders from history that was_taker and created_at >= 1611705600 (January 27, 2021 0:00:00 GMT))

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"was_taker\":true,\"from_timestamp\":1611705600}"
```

#### Command (select orders with details from history that was cancelled because it timed-out)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"status\":\"Timed Out\",\"include_details\":true}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (orders only)

```json
{
  "result": {
    "orders": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "order_type": "Maker",
        "initial_action": "Sell",
        "base": "RICK",
        "rel": "MORTY",
        "price": 2,
        "volume": 3,
        "created_at": 1620727954406,
        "last_updated": 1620727954406,
        "was_taker": 0,
        "status": "Created"
      }
    ],
    "details": [],
    "found_records": 1,
    "warnings": []
  }
}
```

#### Response (details included)

```json
{
  "result": {
    "orders": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "order_type": "Maker",
        "initial_action": "Sell",
        "base": "RICK",
        "rel": "MORTY",
        "price": 2,
        "volume": 3,
        "created_at": 1620727954406,
        "last_updated": 1620727954406,
        "was_taker": 0,
        "status": "Created"
      }
    ],
    "details": [
      {
        "type":"Maker",
        "order": {
          "base": "RICK",
          "rel": "MORTY",
          "price":"2",
          "price_rat":[
            [
                1,
                [
                  2
                ]
            ],
            [
                1,
                [
                  1
                ]
            ]
          ],
          "max_base_vol":"3",
          "max_base_vol_rat": [
            [
              1,
              [
                3
              ]
            ],
            [
              1,
              [
                1
              ]
            ]
          ],
          "min_base_vol":"0.0001",
          "min_base_vol_rat": [
            [
              1,
              [
                1
              ]
            ],
            [
              1,
              [
                10000
              ]
            ]
          ],
          "created_at": 1620727954406,
          "updated_at": 1620727954406,
          "matches": {},
          "started_swaps": [],
          "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
          "conf_settings": {
            "base_confs": 1,
            "base_nota": false,
            "rel_confs": 1,
            "rel_nota": false
          }
        }
      }
    ],
    "found_records": 1,
    "warnings": []
  }
}
```

#### Response (details with history included)

```json
{
  "result": {
    "orders": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "order_type": "Maker",
        "initial_action": "Sell",
        "base": "RICK",
        "rel": "MORTY",
        "price": 1.5,
        "volume": 2,
        "created_at": 1620727954406,
        "last_updated": 1620727984838,
        "was_taker": 0,
        "status": "Updated"
      }
    ],
    "details": [
      {
        "type":"Maker",
        "order": {
          "base": "RICK",
          "rel": "MORTY",
          "price":"1.5",
          "price_rat":[
            [
                1,
                [
                  3
                ]
            ],
            [
                1,
                [
                  2
                ]
            ]
          ],
          "max_base_vol":"2",
          "max_base_vol_rat": [
            [
              1,
              [
                2
              ]
            ],
            [
              1,
              [
                1
              ]
            ]
          ],
          "min_base_vol":"0.0001",
          "min_base_vol_rat": [
            [
              1,
              [
                1
              ]
            ],
            [
              1,
              [
                10000
              ]
            ]
          ],
          "created_at": 1620727954406,
          "updated_at": 1620727954406,
          "matches": {},
          "started_swaps": [],
          "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
          "conf_settings": {
            "base_confs": 1,
            "base_nota": false,
            "rel_confs": 1,
            "rel_nota": false
          },
          "changes_history": [
            {
              "max_base_vol": [
                [
                  1,
                  [
                    3
                  ]
                ],
                [
                  1,
                  [
                    1
                  ]
                ]
              ],
              "price": [
                [
                  1,
                  [
                    2
                  ]
                ],
                [
                  1,
                  [
                    1
                  ]
                ]
              ],
              "updated_at": 1620727954406
            }
          ]
        }
      }
    ],
    "found_records": 1,
    "warnings": []
  }
}
```

#### Response (warning - uuid could not be parsed)

```json
{
  "result": {
    "orders": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "order_type": "Maker",
        "initial_action": "Sell",
        "base": "RICK",
        "rel": "MORTY",
        "price": 2,
        "volume": 3,
        "created_at": 1620727954406,
        "last_updated": 1620727954406,
        "was_taker": 0,
        "status": "Created"
      }
    ],
    "details": [],
    "found_records": 1,
    "warnings": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "warning": "Order details for Uuid e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e were skipped because uuid could not be parsed"
      }
    ]
  }
}
```

</collapse-text>

</div>
