
## disable\_coin

**disable_coin coin**

The `disable_coin` method deactivates the previously enabled coin, and also cancels all active orders that use the selected coin. The method will return an error in the following cases:

- The coin is not enabled
- The coin is used by active swaps
- The coin is used by a currently matching order. In this case, other orders might still be cancelled

#### Arguments

| Structure | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| coin      | string | the ticker of coin to disable |

#### Response

| Structure               | Type             | Description                                                                      |
| ----------------------- | ---------------- | -------------------------------------------------------------------------------- |
| result.coin             | string           | the ticker of deactivated coin                                                   |
| result.cancelled_orders | array of strings | uuids of cancelled orders                                                        |
| swaps                   | array of strings | uuids of active swaps that use the selected coin; present only in error cases    |
| orders.matching         | array of strings | uuids of matching orders that use the selected coin; present only in error cases |
| orders.cancelled        | array of strings | uuids of orders that were successfully cancelled despite the error               |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"disable_coin\",\"coin\":\"RICK\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "cancelled_orders": ["e5fc7c81-7574-4d3f-b64a-47227455d62a"],
    "coin": "RICK"
  }
}
```

#### Response (error - coin is not enabled)

```json
{
  "error": "No such coin: RICK"
}
```

#### Response (error - active swap is using the coin)

```json
{
  "error": "There're active swaps using RICK",
  "swaps": ["d88d0a0e-f8bd-40ab-8edd-fe20801ef349"]
}
```

#### Response (error - the order is matched at the moment, but another order is cancelled)

```json
{
  "error": "There're currently matching orders using RICK",
  "orders": {
    "matching": ["d88d0a0e-f8bd-40ab-8edd-fe20801ef349"],
    "cancelled": ["c88d0a0e-f8bd-40ab-8edd-fe20801ef349"]
  }
}
```

</collapse-text>

</div>
