# order\_status

**order_status uuid**

The `order_status` method returns the data of the order with the selected `uuid` created by the AtomicDEX API node. The response is different for `maker` and `taker` orders.

#### Argument

| Structure | Type   | Description              |
| --------- | ------ | ------------------------ |
| uuid      | string | uuid of order to display |


#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"order_status\",\"uuid\":\"c3b3105c-e914-4ed7-9f1c-604783b054a1\"}"
```

#### Response (No order found)

```json
{ "error": "Order with uuid c3b3105c-e914-4ed7-9f1c-604783b054a1 is not found" }
```

#### Maker Order Response

| Structure                    | Type   | Description                            |
| ---------------------------- | ------ | -------------------------------------- |
| type                         | string | type of the order ("Maker" or "Taker") |
| order                        | object | order data                             |
| order.base                   | string | base currency                          |
| order.rel                    | string | rel currency                           |
| order.price                  | number | order price as decimal number          |
| order.price_rat              | rational number | order price as rational number         |
| order.max_base_vol           | number | Maximum trade volume                   |
| order.max_base_vol_rat       | rational number | Maximum trade volume as rational number|
| order.min_base_vol           | number | Minimum trade volume                   |
| order.min_base_vol_rat       | rational number | Minimum trade volume as rational number|
| order.created_at             | number | timestamp of order creation                     |
| order.updated_at             | number | timestamp of last order update                  |
| order.matches                | list   | UUIDS of matching orders                        |
| order.started_swaps          | list   | UUIDS of swaps started                          |
| order.uuid                   | string | UUID of this order                              |
| order.conf_settings          | object | Confirmation / Notarisation settings for order  |
| order.base_orderbook_ticker  | string | the ticker of the base currency if `orderbook_ticker` is configured for the base currency in `coins` file. If not defined, will return a null value. |
| order.rel_orderbook_ticker   | string | the ticker of the rel currency if `orderbook_ticker` is configured for the rel currency in `coins` file. If not defined, will return a null value. |
| order.cancellable            | boolean| `true` if order is in a state which it can be cancelled. `false` if not (e.g. swap is in progress) |
| order.cancellation_reason    | string | `Cancelled` indicates order was withdrawn by user. `Fulfilled` indicates order was swapped successfully. `TimedOut` indicates a taker order with type `FillOrKill` expired before matching.   |
| order.available_amount       | string | Funds available for order to be matched against, taking into account current spendable balance and `max_volume` |

#### :pushpin: Maker Order Examples

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

```json
{
  "order": {
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
  },
  "type": "Maker",
  "base_orderbook_ticker":null,
  "rel_orderbook_ticker":null
}
```

#### Maker Order Response (Cancelled order from history)

```json
{
  "type": "Maker",
  "order": {
    "base": "DGB",
    "rel": "KMD",
    "price": "0.05009337477044780336205678768187597118237039129820596129396807458680604605170221782737674812826670434",
    "price_rat": [
      [1, [354611]],
      [1, [7079000]]
    ],
    "max_base_vol": "2509.982886480319452367370222475755847119224187107815173987450085567598402738163148887621220764403879",
    "max_base_vol_rat": [
      [1, [4400000]],
      [1, [1753]]
    ],
    "min_base_vol": "227.8553118769581315864426089433209911706066647678724010253489034463115921389917402449444602677299915",
    "min_base_vol_rat": [
      [1, [800000]],
      [1, [3511]]
    ],
    "created_at": 1640147130806,
    "updated_at": 1640148500481,
    "matches": {
      "ca791f47-3a84-414b-b7c1-942a0f2fb4ca": {
        "request": {
          "base": "KMD",
          "rel": "DGB",
          "base_amount": "12",
          "base_amount_rat": [
            [1, [12]],
            [1, [1]]
          ],
          "rel_amount": "241.1820189434802008438151288032397078840799082760529333024574562419162623621175580193501380942429668",
          "rel_amount_rat": [
            [1, [42702000]],
            [1, [177053]]
          ],
          "action": "Sell",
          "uuid": "ca791f47-3a84-414b-b7c1-942a0f2fb4ca",
          "method": "request",
          "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
          "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
          "match_by": {
            "type": "Any"
          },
          "conf_settings": {
            "base_confs": 2,
            "base_nota": true,
            "rel_confs": 7,
            "rel_nota": false
          }
        },
        "reserved": {
          "base": "DGB",
          "rel": "KMD",
          "base_amount": "241.1820189434802008438151288032397078840799082760529333024574562419162623621175580193501380942429668",
          "base_amount_rat": [
            [1, [42702000]],
            [1, [177053]]
          ],
          "rel_amount": "12",
          "rel_amount_rat": [
            [1, [12]],
            [1, [1]]
          ],
          "taker_order_uuid": "ca791f47-3a84-414b-b7c1-942a0f2fb4ca",
          "maker_order_uuid": "9c034d5f-18d6-494d-8460-7974be2d5beb",
          "sender_pubkey": "caecf84197b88739079e55c92f26fe4bc329220a74d7f9d2094dc16e5a0d765e",
          "dest_pub_key": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
          "conf_settings": {
            "base_confs": 3,
            "base_nota": true,
            "rel_confs": 3,
            "rel_nota": true
          },
          "method": "reserved"
        },
        "connect": {
          "taker_order_uuid": "ca791f47-3a84-414b-b7c1-942a0f2fb4ca",
          "maker_order_uuid": "9c034d5f-18d6-494d-8460-7974be2d5beb",
          "method": "connect",
          "sender_pubkey": "0000000000000000000000000000000000000000000000000000000000000000",
          "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000"
        },
        "connected": {
          "taker_order_uuid": "ca791f47-3a84-414b-b7c1-942a0f2fb4ca",
          "maker_order_uuid": "9c034d5f-18d6-494d-8460-7974be2d5beb",
          "method": "connected",
          "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
          "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000"
        },
        "last_updated": 1640147223000
      }
    },
    "started_swaps": ["ca791f47-3a84-414b-b7c1-942a0f2fb4ca"],
    "uuid": "9c034d5f-18d6-494d-8460-7974be2d5beb",
    "conf_settings": {
      "base_confs": 3,
      "base_nota": true,
      "rel_confs": 3,
      "rel_nota": true
    },
    "base_orderbook_ticker": null,
    "rel_orderbook_ticker": null
  },
  "cancellation_reason": "Cancelled"
}
```
</collapse-text>

</div>


#### Response: Taker Orders

| Structure                    | Type   | Description                                     |
| ---------------------------- | ------ | ----------------------------------------------- |
| type                         | string | type of the order ("Maker" or "Taker")          |
| order                        | object | order data                                      |
| order.created_at             | number | timestamp of order creation                     |
| order.request                | object | details of requested trade                      |
| order.request.base           | string | base currency                                   |
| order.request.base_amount    | number | base currency amount                            |
| order.request.base_amount_rat| rational number | base currency amount as rational number|
| order.request.rel            | string | rel currency                                    |
| order.request.rel_amount     | number | rel currency amount                             |
| order.request.rel_amount_rat | rational number | rel currency amount as rational number |
| order.request.action         | string | `buy` or `sell`                                 |
| order.request.uuid           | string | Taker order UUID                                |
| order.request.method         | string | Deprecated field, which always has the value `request`. | 
| order.request.sender_pubkey  | string | Pubkey of Taker                                 |
| order.request.dest_pub_key   | string | reserved for future use. The `dest_pub_key` allows the user to choose the P2P node that is eligible to match with the request. This value defaults to "zero pubkey", meaning that `anyone` can match |
| order.request.match_by.type  | string | `Orders` to select specific uuids; `Pubkeys` to select specific nodes; Defaults to `Any`    | 
| order.request.conf_settings  | object | base/rel confirmation/notarisation settings     |
| order.matches                | object | Details of matching Maker Order UUIDs           |
| order.order_type             | object | `FillOrKill`  or `GoodTillCancelled`            |
| order.matches                | list   | UUIDS of matching orders                        |
| order.base_orderbook_ticker  | string | the ticker of the base currency if `orderbook_ticker` is configured for the base currency in `coins` file. If not defined, will return a null value. |
| order.rel_orderbook_ticker   | string | the ticker of the rel currency if `orderbook_ticker` is configured for the rel currency in `coins` file. If not defined, will return a null value. |
| order.cancellable            | boolean| `true` if order is in a state which it can be cancelled. `false` if not (e.g. swap is in progress) |
| cancellation_reason          | string | `Cancelled` indicates order was withdrawn by user. `Fulfilled` indicates order was swapped successfully. `TimedOut` indicates a taker order with type `FillOrKill` expired before matching.   |


#### :pushpin: Taker Order Examples

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">


#### Response: Taker Order Fullfilled

```json
{
  "type": "Taker",
  "order": {
    "created_at": 1640159838631,
    "request": {
      "base": "RICK",
      "rel": "MORTY",
      "base_amount": "1",
      "base_amount_rat": [
        [1, [1]],
        [1, [1]]
      ],
      "rel_amount": "33",
      "rel_amount_rat": [
        [1, [33]],
        [1, [1]]
      ],
      "action": "Buy",
      "uuid": "d1a43d2a-f7c1-4a83-ba32-1ae640cc3b32",
      "method": "request",
      "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
      "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
      "match_by": {
        "type": "Any"
      },
      "conf_settings": {
        "base_confs": 1,
        "base_nota": false,
        "rel_confs": 1,
        "rel_nota": false
      }
    },
    "matches": {
      "cc9efdb5-e0f1-4196-b3b2-e4930623c976": {
        "reserved": {
          "base": "RICK",
          "rel": "MORTY",
          "base_amount": "1",
          "base_amount_rat": [
            [1, [1]],
            [1, [1]]
          ],
          "rel_amount": "1",
          "rel_amount_rat": [
            [1, [1]],
            [1, [1]]
          ],
          "taker_order_uuid": "d1a43d2a-f7c1-4a83-ba32-1ae640cc3b32",
          "maker_order_uuid": "cc9efdb5-e0f1-4196-b3b2-e4930623c976",
          "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
          "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
          "conf_settings": {
            "base_confs": 1,
            "base_nota": false,
            "rel_confs": 1,
            "rel_nota": false
          },
          "method": "reserved"
        },
        "connect": {
          "taker_order_uuid": "d1a43d2a-f7c1-4a83-ba32-1ae640cc3b32",
          "maker_order_uuid": "cc9efdb5-e0f1-4196-b3b2-e4930623c976",
          "method": "connect",
          "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
          "dest_pub_key": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920"
        },
        "connected": null,
        "last_updated": 0
      }
    },
    "order_type": {
      "type": "FillOrKill"
    },
    "cancellable": false,
    "base_orderbook_ticker": null,
    "rel_orderbook_ticker": null
  },
  "cancellation_reason": "Fulfilled"
}
```

#### Response: 'FillOrKill' Taker order after timeout with no match
```json
{
  "type": "Taker",
  "order": {
    "created_at": 1640159991278,
    "request": {
      "base": "RICK",
      "rel": "MORTY",
      "base_amount": "1",
      "base_amount_rat": [
        [1, [1]],
        [1, [1]]
      ],
      "rel_amount": "0.03",
      "rel_amount_rat": [
        [1, [3]],
        [1, [100]]
      ],
      "action": "Buy",
      "uuid": "6053016b-e1ba-490f-9501-eafb69b4d3a7",
      "method": "request",
      "sender_pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
      "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
      "match_by": {
        "type": "Any"
      },
      "conf_settings": {
        "base_confs": 1,
        "base_nota": false,
        "rel_confs": 1,
        "rel_nota": false
      }
    },
    "matches": {},
    "order_type": {
      "type": "FillOrKill"
    },
    "cancellable": true,
    "base_orderbook_ticker": null,
    "rel_orderbook_ticker": null
  },
  "cancellation_reason": "TimedOut"
}
```

</collapse-text>

</div>
