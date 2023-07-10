# my_orders

**my_orders()**

The `my_orders` method returns the data of all active orders created by the Komodo DeFi Framework node.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure    | Type           | Description                                           |
| ------------ | -------------- | ----------------------------------------------------- |
| maker_orders | map of objects | orders that are currently active in market-maker mode |
| taker_orders | map of objects | orders that are currently active in market-taker mode |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_orders\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "maker_orders": {
      "ea77dcc3-a711-4c3d-ac36-d45fc5e1ee0c": {
        "available_amount": "1",
        "base": "BEER",
        "cancellable": true,
        "created_at": 1568808684710,
        "matches": {
          "60aaacca-ed31-4633-9326-c9757ea4cf78": {
            "connect": {
              "dest_pub_key": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
              "maker_order_uuid": "fedd5261-a57e-4cbf-80ac-b3507045e140",
              "method": "connect",
              "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
              "taker_order_uuid": "60aaacca-ed31-4633-9326-c9757ea4cf78"
            },
            "connected": {
              "dest_pub_key": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
              "maker_order_uuid": "fedd5261-a57e-4cbf-80ac-b3507045e140",
              "method": "connected",
              "sender_pubkey": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
              "taker_order_uuid": "60aaacca-ed31-4633-9326-c9757ea4cf78"
            },
            "last_updated": 1560529572571,
            "request": {
              "action": "Buy",
              "base": "BEER",
              "base_amount": "1",
              "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
              "method": "request",
              "rel": "PIZZA",
              "rel_amount": "1",
              "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
              "uuid": "60aaacca-ed31-4633-9326-c9757ea4cf78"
            },
            "reserved": {
              "base": "BEER",
              "base_amount": "1",
              "dest_pub_key": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
              "maker_order_uuid": "fedd5261-a57e-4cbf-80ac-b3507045e140",
              "method": "reserved",
              "rel": "PIZZA",
              "rel_amount": "1",
              "sender_pubkey": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
              "taker_order_uuid": "60aaacca-ed31-4633-9326-c9757ea4cf78"
            }
          }
        },
        "max_base_vol": "1",
        "max_base_vol_rat": [
          [1, [1]],
          [1, [1]]
        ],
        "min_base_vol": "0",
        "min_base_vol_rat": [
          [0, []],
          [1, [1]]
        ],
        "price": "1",
        "price_rat": [
          [1, [1]],
          [1, [1]]
        ],
        "rel": "ETOMIC",
        "started_swaps": ["60aaacca-ed31-4633-9326-c9757ea4cf78"],
        "uuid": "ea77dcc3-a711-4c3d-ac36-d45fc5e1ee0c"
      }
    },
    "taker_orders": {
      "ea199ac4-b216-4a04-9f08-ac73aa06ae37": {
        "cancellable": true,
        "created_at": 1568811351456,
        "matches": {
          "15922925-cc46-4219-8cbd-613802e17797": {
            "connect": {
              "dest_pub_key": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
              "maker_order_uuid": "15922925-cc46-4219-8cbd-613802e17797",
              "method": "connect",
              "sender_pubkey": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
              "taker_order_uuid": "45252de5-ea9f-44ae-8b48-85092a0c99ed"
            },
            "connected": {
              "dest_pub_key": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
              "maker_order_uuid": "15922925-cc46-4219-8cbd-613802e17797",
              "method": "connected",
              "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
              "taker_order_uuid": "45252de5-ea9f-44ae-8b48-85092a0c99ed"
            },
            "last_updated": 1560529049477,
            "reserved": {
              "base": "BEER",
              "base_amount": "1",
              "dest_pub_key": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
              "maker_order_uuid": "15922925-cc46-4219-8cbd-613802e17797",
              "method": "reserved",
              "rel": "ETOMIC",
              "rel_amount": "1",
              "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
              "taker_order_uuid": "45252de5-ea9f-44ae-8b48-85092a0c99ed"
            }
          }
        },
        "request": {
          "action": "Buy",
          "base": "BEER",
          "base_amount": "1",
          "base_amount_rat": [
            [1, [1]],
            [1, [1]]
          ],
          "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
          "method": "request",
          "rel": "ETOMIC",
          "rel_amount": "1",
          "rel_amount_rat": [
            [1, [1]],
            [1, [1]]
          ],
          "sender_pubkey": "031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
          "uuid": "ea199ac4-b216-4a04-9f08-ac73aa06ae37",
          "match_by": {
            "type": "Any"
          }
        },
        "order_type": {
          "type": "GoodTillCancelled"
        },
        "base_orderbook_ticker": null,
        "rel_orderbook_ticker": null
      }
    }
  }
}
```

</collapse-text>

</div>
