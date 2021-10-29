
## buy

**buy base rel price volume (match_by order_type base_confs base_nota rel_confs rel_nota min_volume)**

The `buy` method issues a buy request and attempts to match an order from the orderbook based on the provided arguments.

::: tip

- Buy and sell methods always create the `taker` order first. A `taker` order must pay a `dexfee` during the swap as it is taking liquidity from the market. The `dexfee` is calculated as "the greater of either `Minimum transaction amount (dust) TAKER COIN` or `0.0001 TAKER COIN` or `1/777th` the size of the desired order". If your `GoodTillCancelled` order is not matched in 30 seconds, the order is automatically converted to a `maker` request and stays on the orderbook until the request is matched or cancelled. To always act as a maker, please use the [setprice](../../../basic-docs/atomicdex/atomicdex-api.html#setprice) method.
- To prevent a user from making trades in which the transaction fees may end up costing a significant portion of the value of the trade, we have set a lower limit to the value of a trade. See the description of the `volume` and `min_volume` arguments for more info.

:::

#### Arguments

| Structure       | Type                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | --------------------------            | -----------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                                         |
| base            | string                                | the name of the coin the user desires to receive                                                                                                                                                                                                                                                                                                                                                                      |
| rel             | string                                | the name of the coin the user desires to sell                                                                                                                                                                                                                                                                                                                                                                         |
| price           | numeric string or rational            | the price in `rel` the user is willing to pay per one unit of the `base` coin                                                                                                                                                                                                                                                                                                                                         |
| volume          | numeric string or rational            | the amount of coins the user is willing to receive of the `base` coin; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `volume`</li><li>the product of the arguments `volume` and `price`</li></ul>                                                                                                                                           |
| min_volume      | numeric string or rational (optional) | the amount of `base` coin that will be used as `min_volume` of `GoodTillCancelled` order after conversion to maker; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `min_volume`</li><li>the product of the arguments `min_volume` and `price`</li></ul>                                                                                      |
| match_by        | object                                | the created order is matched using this condition. *Important:* This condition is not applied after a `GoodTillCancelled` order is converted to a `maker` request                                                                                                                                                                                                                                                     |
| match_by.type   | string                                | `Any` to match with any other order; `Orders` to select specific uuids; `Pubkeys` to select specific nodes; default is `Any`                                                                                                                                                                                                                                                                                          |
| match_by.data   | array of strings                      | uuids of orders to match for `Orders` type; pubkeys of nodes to match for `Pubkeys` type                                                                                                                                                                                                                                                                                                                              |
| order_type      | object                                | the type of the order                                                                                                                                                                                                                                                                                                                                                                                                 |
| order_type.type | string                                | there are two types from which to choose: `GoodTillCancelled` and `FillOrKill`. The `GoodTillCancelled` order is automatically converted to a `maker` order if the order is not matched in 30 seconds, and this `maker` order stays in the orderbook until explicitly cancelled. On the other hand, a `FillOrKill` order is cancelled if it is not matched within 30 seconds. The default type is `GoodTillCancelled` |
| base_confs      | number                                | number of required blockchain confirmations for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                                                                                                      |
| base_nota       | bool                                  | whether dPoW notarization is required for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                                                                                                            |
| rel_confs       | number                                | number of required blockchain confirmations for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                                                                                                        |
| rel_nota        | bool                                  | whether dPoW notarization is required for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                                                                                                              |

#### Response

| Structure                       | Type             | Description                                                                                                                                                                                                     |
| ----------------------          | --------         | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                          | object           | the resulting order object                                                                                                                                                                                      |
| result.action                   | string           | the action of the request (`Buy`)                                                                                                                                                                               |
| result.base                     | string           | the base currency of request                                                                                                                                                                                    |
| result.base_amount              | string           | the resulting amount of base currency that is received if the order matches (in decimal representation)                                                                                                         |
| result.base_amount_rat          | rational         | the resulting amount of base currency that is received if the order matches (in rational representation)                                                                                                        |
| result.rel                      | string           | the rel currency of the request                                                                                                                                                                                 |
| result.rel_amount               | string           | the maximum amount of `rel` coin that is spent in order to buy the `base_amount` (according to `price`, in decimal representation)                                                                              |
| result.rel_amount_rat           | rational         | the maximum amount of `rel` coin that is spent in order to buy the `base_amount` (according to `price`, in rational representation)                                                                             |
| result.method                   | string           | this field is used for internal P2P interactions; the value is always equal to "request                                                                                                                         |
| result.dest_pub_key             | string           | reserved for future use. `dest_pub_key` allows the user to choose the P2P node that is eligible to match with the request. This value defaults to a "zero pubkey", which means `anyone` can be a match          |
| result.sender_pubkey            | string           | the public key of this node                                                                                                                                                                                     |
| result.uuid                     | string           | the request uuid                                                                                                                                                                                                |
| result.match_by                 | object           | the created order is matched using this condition                                                                                                                                                               |
| result.match_by.type            | string           | `Any` to match with any other order; `Orders` to select specific uuids; `Pubkeys` to select specific nodes; Default is `Any`                                                                                    |
| result.match_by.data            | array of strings | uuids of orders to match for `Orders` type; pubkeys of nodes to match for `Pubkeys` type                                                                                                                        |
| result.conf_settings.base_confs | number           | number of required blockchain confirmations for base coin atomic swap transaction                                                                                                                               |
| result.conf_settings.base_nota  | bool             | whether dPoW notarization is required for base coin atomic swap transaction                                                                                                                                     |
| result.conf_settings.rel_confs  | number           | number of required blockchain confirmations for rel coin atomic swap transaction                                                                                                                                |
| result.conf_settings.rel_nota   | bool             | whether dPoW notarization is required for rel coin atomic swap transaction                                                                                                                                      |

#### :pushpin: Examples

#### Command (decimal representation)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HELLO\",\"rel\":\"WORLD\",\"volume\":\"1\",\"price\":\"1\"}"
```

#### Command (rational representation in num-rational crate format)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HELLO\",\"rel\":\"WORLD\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]]}"
```

#### Command (rational representation as fraction object)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"buy\",
  \"base\":\"HELLO\",
  \"rel\":\"WORLD\",
  \"volume\":{
    \"numer\":\"3\",
    \"denom\":\"2\"
  },
  "price":{
    "numer":"2",
    "denom":"1"
  }
}"
```

#### Command (with confirmations and notarization settings)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"buy\",
  \"base\":\"HELLO\",
  \"rel\":\"WORLD\",
  \"volume\":{
    \"numer\":\"3\",
    \"denom\":\"2\"
  },
  \"price\":{
    \"numer\":\"2\",
    \"denom\":\"1\"
  },
  \"base_confs\": 2,
  \"base_nota\": true,
  \"rel_confs\": 5,
  \"rel_nota\": false  
}"
```

#### Command (GoodTillCancelled type)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"order_type\":{\"type\":\"GoodTillCancelled\"}}"
```

#### Command (FillOrKill type)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"order_type\":{\"type\":\"FillOrKill\"}}"
```

#### Command (match by Any)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"match_by\":{\"type\":\"Any\"}}"
```

#### Command (match by Pubkeys)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"match_by\":{\"type\":\"Pubkeys\",\"data\":[\"1ab7edc96abaefb358b52c583048eaaeb8ea42609d096d6cddfafa02fa510c6a\"]}}"
```

#### Command (match by Orders)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"match_by\":{\"type\":\"Orders\",\"data\":[\"d14452bb-e82d-44a0-86b0-10d4cdcb8b24\"]}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "action": "Buy",
    "base": "HELLO",
    "base_amount": "1",
    "base_amount_rat": [
      [1, [1]],
      [1, [1]]
    ],
    "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
    "method": "request",
    "rel": "WORLD",
    "rel_amount": "1",
    "rel_amount_rat": [
      [1, [1]],
      [1, [1]]
    ],
    "sender_pubkey": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
    "uuid": "288743e2-92a5-471e-92d5-bb828a2303c3",
    "match_by":{
      "data":["1ab7edc96abaefb358b52c583048eaaeb8ea42609d096d6cddfafa02fa510c6a"],
      "type":"Pubkeys"
    },
    "conf_settings":{
      "base_confs":2,
      "base_nota":true,
      "rel_confs":5,
      "rel_nota":false
    }
  }
}
```

#### Response (error)

```json
{
  "error": "rpc:278] utxo:884] REL balance 12.88892991 is too low, required 21.15"
}
```

#### Response (error)

```json
{
  "error": "rpc:275] lp_ordermatch:665] The WORLD amount 40000/3 is larger than available 47.60450107, balance: 47.60450107, locked by swaps: 0.00000000"
}
```

</collapse-text>

</div>
