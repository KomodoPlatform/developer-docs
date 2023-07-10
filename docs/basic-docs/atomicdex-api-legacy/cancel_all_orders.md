# cancel_all_orders

**cancel_all_orders cancel_by**

The `cancel_all_orders` cancels the active orders created by the Komodo DeFi Framework node by specified condition.

#### Arguments

| Structure             | Type   | Description                                                                                                                      |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| cancel_by             | object | orders matching this condition are cancelled                                                                                     |
| cancel_by.type        | string | `All` to cancel all orders; `Pair` to cancel all orders for specific coin pairs; `Coin` to cancel all orders for a specific coin |
| cancel_by.data        | object | additional data the cancel condition; present with `Pair` and `Coin` types                                                       |
| cancel_by.data.base   | string | base coin of the pair; `Pair` type only                                                                                          |
| cancel_by.data.rel    | string | rel coin of the pair; `Pair` type only                                                                                           |
| cancel_by.data.ticker | string | order is cancelled if it uses `ticker` as base or rel; `Coin` type only                                                          |

#### Response

| Structure                 | Type                     | Description                                                                                                    |
| ------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| result                    | object                   |                                                                                                                |
| result.cancelled          | array of strings (uuids) | uuids of cancelled orders                                                                                      |
| result.currently_matching | array of strings (uuids) | uuids of the orders being matched with other orders; these are not cancelled even if they fit cancel condition |

#### :pushpin: Examples

#### Command (All orders)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"cancel_all_orders\",\"cancel_by\":{\"type\":\"All\"}}"
```

#### Command (Cancel by pair)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"cancel_all_orders\",\"cancel_by\":{\"type\":\"Pair\",\"data\":{\"base\":\"RICK\",\"rel\":\"MORTY\"}}}"
```

#### Command (Cancel by coin)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"cancel_all_orders\",\"cancel_by\":{\"type\":\"Coin\",\"data\":{\"ticker\":\"RICK\"}}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (1 order cancelled)

```json
{
  "result": {
    "cancelled": ["2aae69d1-0167-493e-ad15-c6a8b43546d6"],
    "currently_matching": []
  }
}
```

#### Response (1 order cancelled and 1 is currently matching)

```json
{
  "result": {
    "cancelled": ["2aae69d1-0167-493e-ad15-c6a8b43546d6"],
    "currently_matching": ["e9a6f422-e378-437f-bb74-ba4307a90e68"]
  }
}
```

</collapse-text>

</div>
