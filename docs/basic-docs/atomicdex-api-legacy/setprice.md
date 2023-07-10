# setprice

**setprice base rel price (volume max cancel_previous=true base_confs base_nota rel_confs rel_nota min_volume)**

The `setprice` method places an order on the orderbook, and it relies on this node acting as a `maker`, also called a `Bob` node.

The `setprice` order is always considered a `sell`, for internal implementation convenience.

::: tip

To prevent a user from making trades in which the transaction fees may end up costing a significant portion of the value of the trade, we have set a lower limit to the value of a trade. See the description of the `volume` and `min_volume` arguments for more info.

:::

#### Arguments

| Structure       | Type                       | Description                                                                                                                                                                                                                                                                                                                   |
| --------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| base            | string                     | the name of the coin the user desires to sell                                                                                                                                                                                                                                                                                 |
| rel             | string                     | the name of the coin the user desires to receive                                                                                                                                                                                                                                                                              |
| price           | numeric string or rational | the price in `rel` the user is willing to receive per one unit of the `base` coin                                                                                                                                                                                                                                             |
| volume          | numeric string or rational | the maximum amount of `base` coin available for the order, ignored if max is `true`; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `volume`</li><li>the product of the arguments `volume` and `price`</li></ul>                                 |
| min_volume      | numeric string or rational | the minimum amount of `base` coin available for the order; it must be less or equal than `volume` param; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `min_volume`</li><li>the product of the arguments `min_volume` and `price`</li></ul>     |
| max             | bool                       | Komodo DeFi Framework will use the entire coin balance for the order, taking `0.001` coins into reserve to account for fees                                                                                                                                                                                                   |
| cancel_previous | bool                       | Komodo DeFi Framework will cancel all existing orders for the selected pair by default; set this value to `false` to prevent this behavior                                                                                                                                                                                    |
| base_confs      | number                     | number of required blockchain confirmations for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                              |
| base_nota       | bool                       | whether dPoW notarization is required for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                    |
| rel_confs       | number                     | number of required blockchain confirmations for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                |
| rel_nota        | bool                       | whether dPoW notarization is required for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                      |
| save_in_history | boolean                    | Defaults to `true`. If set to `false` no order history will be saved (though order status will be temporarily stored while in progress). If `true`, each order's short record history is stored in a local SQLite database table, and when the order is cancelled or fully matched, it's history will be saved as a json file |

#### Response

| Structure                       | Type             | Description                                                                                                                                          |
| ------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                          | object           | the resulting order object                                                                                                                           |
| result.base                     | string           | the base coin of the order                                                                                                                           |
| result.rel                      | string           | the rel coin of the order                                                                                                                            |
| result.price                    | string (numeric) | the expected amount of `rel` coin to be received per 1 unit of `base` coin; decimal representation                                                   |
| result.price_rat                | rational         | the expected amount of `rel` coin to be received per 1 unit of `base` coin; rational representation                                                  |
| result.max_base_vol             | string (numeric) | the maximum volume of base coin available to trade; decimal representation                                                                           |
| result.max_base_vol_rat         | rational         | the maximum volume of base coin available to trade; rational representation                                                                          |
| result.min_base_vol             | string (numeric) | Komodo DeFi Framework won't match with other orders that attempt to trade less than `min_base_vol`; decimal representation                           |
| result.min_base_vol_rat         | rational         | Komodo DeFi Framework won't match with other orders that attempt to trade less than `min_base_vol`; rational representation                          |
| result.created_at               | number           | unix timestamp in milliseconds, indicating the order creation time                                                                                   |
| result.updated_at               | number           | unix timestamp in milliseconds, indicating the order update time                                                                                     |
| result.matches                  | object           | contains the map of ongoing matches with other orders, empty as the order was recently created                                                       |
| result.started_swaps            | array of strings | uuids of swaps that were initiated by the order                                                                                                      |
| result.uuid                     | string           | uuid of the created order                                                                                                                            |
| result.conf_settings.base_confs | number           | number of required blockchain confirmations for base coin atomic swap transaction                                                                    |
| result.conf_settings.base_nota  | bool             | whether dPoW notarization is required for base coin atomic swap transaction                                                                          |
| result.conf_settings.rel_confs  | number           | number of required blockchain confirmations for rel coin atomic swap transaction                                                                     |
| result.conf_settings.rel_nota   | bool             | whether dPoW notarization is required for rel coin atomic swap transaction                                                                           |
| result.base_orderbook_ticker    | string           | the ticker of the base currency if `orderbook_ticker` is configured for the base currency in `coins` file. If not defined, will return a null value. |
| result.rel_orderbook_ticker     | string           | the ticker of the rel currency if `orderbook_ticker` is configured for the rel currency in `coins` file. If not defined, will return a null value.   |

#### :pushpin: Examples

#### Command (with volume)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"setprice\",
  \"base\":\"BASE\",
  \"rel\":\"REL\",
  \"price\":\"0.9\",
  \"volume\":\"1\"
}"
```

#### Command (max = true)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"setprice\",
  \"base\":\"BASE\",
  \"rel\":\"REL\",
  \"price\":\"0.9\",
  \"max\":true
}"
```

#### Command (rational representation in num-rational crate format)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"setprice\",
  \"base\": \"HELLO\",
  \"rel\": \"WORLD\",
  \"volume\": [[1,[1]],[1,[1]]],
  \"price\": [[1,[1]],[1,[1]]]
}"
```

#### Command (rational representation as fraction object)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"setprice\",
  \"base\": \"HELLO\",
  \"rel\": \"WORLD\",
  \"volume\": {
    \"numer\": \"3\",
    \"denom\": \"2\"
  },
  \"price\": {
    \"numer\":\"2\",
    \"denom\":\"1\"
  }
}"
```

#### Command (with min_volume)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"setprice\",
  \"base\": \"HELLO\",
  \"rel\": \"WORLD\",
  \"volume\": {
    \"numer\": \"3\",
    \"denom\": \"2\"
  },
  \"price\": {
    \"numer\": \"2\",
    \"denom\": \"1\"
  },
  \"min_volume\": \"1\"
}"
```

#### Command (with confirmations and notarization settings)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"setprice\",
  \"base\": \"HELLO\",
  \"rel\": \"WORLD\",
  \"volume\": {
    \"numer\": \"3\",
    \"denom\": \"2\"
  },
  \"price\": {
    \"numer\": \"2\",
    \"denom\": \"1\"
  },
  \"base_confs\": 2,
  \"base_nota\": true,
  \"rel_confs\": 5,
  \"rel_nota\": false
}"
```

#### Command (set to not save order history)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"setprice\",
  \"base\": \"KMD\",
  \"rel\": \"TKL\",
  \"volume\": {
    \"numer\": \"4\",
    \"denom\": \"3\"
  },
  \"price\": {
    \"numer\": \"7\",
    \"denom\": \"12\"
  },
  \"save_in_history\": false
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
  },
  "base_orderbook_ticker": null,
  "rel_orderbook_ticker": null
}
```

#### Response (error)

```json
{ "error": "Rel coin REL is not found" }
```

</collapse-text>

</div>
