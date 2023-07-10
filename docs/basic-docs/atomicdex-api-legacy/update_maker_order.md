# update_maker_order

**update_maker_order uuid (new_price volume_delta max base_confs base_nota rel_confs rel_nota min_volume)**

The `update_maker_order` method updates an active order on the orderbook created before by `setprice`, and it relies on this node acting as a `maker`, also called a `Bob` node.

::: tip

To prevent a user from making trades in which the transaction fees may end up costing a significant portion of the value of the trade, we have set a lower limit to the value of a trade. See the description of the `volume_delta` and `min_volume` arguments for more info.

:::

#### Arguments

| Structure    | Type                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| uuid         | string                                | the uuid of the order the user desires to update                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| new_price    | numeric string or rational (optional) | the price in `rel` the user is willing to receive per one unit of the `base` coin                                                                                                                                                                                                                                                                                                                                                                                                                 |     |
| volume_delta | numeric string or rational (optional) | volume added to or subtracted from the `max_base_vol` of the order to be updated, resulting in the new volume which is the maximum amount of `base` coin available for the order, ignored if max is `true`; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the new volume which is the `max_base_vol` of the order to be updated plus `volume_delta`</li><li>the product of the new volume and the argument `new_price`</li></ul> |
| min_volume   | numeric string or rational (optional) | the minimum amount of `base` coin available for the order; it must be less or equal than the new volume; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `min_volume`</li><li>the product of the arguments `min_volume` and `new_price`</li></ul>                                                                                                                                                                     |
| max          | bool (optional)                       | Komodo DeFi Framework will use the entire coin balance for the order, taking `0.001` coins into reserve to account for fees                                                                                                                                                                                                                                                                                                                                                                       |
| base_confs   | number (optional)                     | number of required blockchain confirmations for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                                                                                                                                                                                  |
| base_nota    | bool (optional)                       | whether dPoW notarization is required for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                                                                                                                                                                                        |
| rel_confs    | number (optional)                     | number of required blockchain confirmations for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                                                                                                                                                                                    |
| rel_nota     | bool (optional)                       | whether dPoW notarization is required for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                                                                                                                                                                                          |

#### Response

| Structure                       | Type             | Description                                                                                                                 |
| ------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| result                          | object           | the resulting order object                                                                                                  |
| result.base                     | string           | the base coin of the order                                                                                                  |
| result.rel                      | string           | the rel coin of the order                                                                                                   |
| result.price                    | string (numeric) | the expected amount of `rel` coin to be received per 1 unit of `base` coin; decimal representation                          |
| result.price_rat                | rational         | the expected amount of `rel` coin to be received per 1 unit of `base` coin; rational representation                         |
| result.max_base_vol             | string (numeric) | the maximum volume of base coin available to trade; decimal representation                                                  |
| result.max_base_vol_rat         | rational         | the maximum volume of base coin available to trade; rational representation                                                 |
| result.min_base_vol             | string (numeric) | Komodo DeFi Framework won't match with other orders that attempt to trade less than `min_base_vol`; decimal representation  |
| result.min_base_vol_rat         | rational         | Komodo DeFi Framework won't match with other orders that attempt to trade less than `min_base_vol`; rational representation |
| result.created_at               | number           | unix timestamp in milliseconds, indicating the order creation time                                                          |
| result.updated_at               | number           | unix timestamp in milliseconds, indicating the order update time                                                            |
| result.matches                  | object           | contains the map of ongoing matches with other orders, empty as the order was recently created                              |
| result.started_swaps            | array of strings | uuids of swaps that were initiated by the order                                                                             |
| result.uuid                     | string           | uuid of the updated order                                                                                                   |
| result.conf_settings.base_confs | number           | number of required blockchain confirmations for base coin atomic swap transaction                                           |
| result.conf_settings.base_nota  | bool             | whether dPoW notarization is required for base coin atomic swap transaction                                                 |
| result.conf_settings.rel_confs  | number           | number of required blockchain confirmations for rel coin atomic swap transaction                                            |
| result.conf_settings.rel_nota   | bool             | whether dPoW notarization is required for rel coin atomic swap transaction                                                  |

#### :pushpin: Examples

#### Command (with volume)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"update_maker_order\",\"uuid\":\"6a242691-6c05-474a-85c1-5b3f42278f41\",\"new_price\":\"0.9\",\"volume_delta\":\"1\"}"
```

#### Command (max = true)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"update_maker_order\",\"uuid\":\"6a242691-6c05-474a-85c1-5b3f42278f41\",\"new_price\":\"0.9\",\"max\":true}"
```

#### Command (rational representation in num-rational crate format)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"update_maker_order\",
  \"uuid\":\"6a242691-6c05-474a-85c1-5b3f42278f41\",
  \"volume_delta\":[[1,[1]],[1,[1]]],
  \"new_price\":[[1,[1]],[1,[1]]]
}"
```

#### Command (rational representation as fraction object)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"update_maker_order\",
  \"uuid\":\"6a242691-6c05-474a-85c1-5b3f42278f41\",
  \"volume_delta\":{
    \"numer\":\"3\",
    \"denom\":\"2\"
  },
  \"new_price\":{
    \"numer\":\"2\",
    \"denom\":\"1\"
  }
}"
```

#### Command (with min_volume)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"update_maker_order\",
  \"uuid\":\"6a242691-6c05-474a-85c1-5b3f42278f41\",
  \"volume_delta\":{
    \"numer\":\"3\",
    \"denom\":\"2\"
  },
  \"new_price\":{
    \"numer\":\"2\",
    \"denom\":\"1\"
  },
  \"min_volume\":\"1\"
}"
```

#### Command (with confirmations and notarization settings)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"update_maker_order\",
  \"uuid\":\"6a242691-6c05-474a-85c1-5b3f42278f41\",
  \"volume_delta\":{
    \"numer\":\"3\",
    \"denom\":\"2\"
  },
  \"new_price\":{
    \"numer\":\"2\",
    \"denom\":\"1\"
  },
  \"base_confs\": 2,
  \"base_nota\": true,
  \"rel_confs\": 5,
  \"rel_nota\": false
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "base": "BASE",
    "rel": "REL",
    "max_base_vol": "1",
    "max_base_vol_rat": [
      [1, [1]],
      [1, [1]]
    ],
    "min_base_vol": "0",
    "min_base_vol": [
      [0, []],
      [1, [1]]
    ],
    "created_at": 1559052299258,
    "updated_at": 1619736650000,
    "matches": {},
    "price": "1",
    "price_rat": [
      [1, [1]],
      [1, [1]]
    ],
    "started_swaps": [],
    "uuid": "6a242691-6c05-474a-85c1-5b3f42278f41",
    "conf_settings": {
      "base_confs": 2,
      "base_nota": true,
      "rel_confs": 5,
      "rel_nota": false
    }
  }
}
```

#### Response (error)

```json
{ "error": "There is no order with UUID  6a242691-6c05-474a-85c1-5b3f42278f41" }
```

</collapse-text>

</div>
