# orderbook\_depth

**orderbook_depth pairs**

The `orderbook_depth` method returns the number of asks and bids for the specified trading pairs.

#### Arguments

| Structure | Type   | Description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| pairs     | array  | an array of trading pairs                                                           |

#### Response

::: warning Important

The pairs in the response are not guaranteed to be in the order of pairs in the request.

:::

| Structure      | Type                 | Description                                                                   |
| -------------- | ----------------     | ----------------------------------------------------------------------------- |
| result         | array of `PairDepth` | an array of pair depth objects                                                |

Where `PairDepth` object structure is as follows

| Structure                     | Type               | Description                                                                                                               |
| ----------------------------- | -----------------  | ------------------------------------------------------------------------------------------------------------------------- |
| pair                          | array of 2 strings | the orderbook pair                                                                                                        |
| depth.asks                    | number             | the number of asks                                                                                                        |
| depth.bids                    | number             | the number of bids                                                                                                        |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
{
  \"userpass\":\"${userpass}\",
  \"method\":\"orderbook_depth\",
  \"pairs\":[[\"RICK\",\"MORTY\"],[\"BTC\",\"KMD\"],[\"DOGE\",\"KMD\"]]
}
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
    "result": [
        {
            "pair": [ "RICK", "MORTY" ],
            "depth": {
                "asks": 2,
                "bids": 6
            }
        },
        {
            "pair": [ "DOGE", "KMD" ],
            "depth": {
                "asks": 3,
                "bids": 3
            }
        },
        {
            "pair": [ "BTC", "KMD" ],
            "depth": {
                "asks": 5,
                "bids": 9
            }
        }
    ]
}
```

</collapse-text>

</div>
