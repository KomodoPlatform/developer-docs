
## max\_taker\_vol 

**max_taker_vol coin**

The `max_taker_vol` method returns the maximum available volume for buy/sell methods for selected `coin`.
This takes the dex fee and blockchain miner fees into account. The result should be used as is for `sell` method or divided by price for `buy` method.

#### Arguments

| Structure | Type   | Description                                                     |
| --------- | ------ | --------------------------------------------------------------- |
| coin      | string | the name of the coin to retrieve the max available taker volume |

#### Response

| Structure | Type     | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| result    | fraction | the max available taker volume in fraction representation |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"max_taker_vol\",\"coin\":\"RICK\",\"userpass\":\"$userpass\",\"mm2\":1}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "denom":"38900000000",
    "numer":"309786160299"
  }
}
```

</collapse-text>

</div>
