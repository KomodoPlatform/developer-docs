# orderbook

**orderbook base rel**

The `orderbook` method requests from the network the currently available orders for the specified trading pair.

#### Arguments

| Structure | Type   | Description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| base      | string | base currency of a pair                                                             |
| rel       | string | related" currency, also can be called "quote currency" according to exchange terms  |

#### Response

| Structure                    | Type             | Description                                                                   |
| --------------               | ---------------- | ----------------------------------------------------------------------------- |
| asks                         | array of `Order` | an array of objects containing outstanding asks                               |
| bids                         | array of `Order` | an array of objects containing outstanding bids                               |
| numbids                      | number           | the number of outstanding bids                                                |
| biddepth                     | number           | `deprecated`                                                                  |
| base                         | string           | the name of the coin the user desires to receive                              |
| rel                          | string           | the name of the coin the user will trade                                      |
| timestamp                    | number           | the timestamp of the orderbook request                                        |
| netid                        | number           | the id of the network on which the request is made (default is `0`)           |
| total_asks_base_vol          | string (decimal) | the base volumes sum of all asks                                              |
| total_asks_base_vol_rat      | rational         | the `total_asks_base_vol` in num-rational crate format                        |
| total_asks_base_vol_fraction | fraction         | the `total_asks_base_vol` represented as an object                            |
| total_asks_rel_vol           | string (decimal) | the rel volumes sum of all asks                                               |
| total_asks_rel_vol_rat       | rational         | the `total_asks_rel_vol` in num-rational crate format                         |
| total_asks_rel_vol_fraction  | fraction         | the `total_asks_rel_vol` represented as an object                             |
| total_bids_base_vol          | string (decimal) | the base volumes sum of all bids                                              |
| total_bids_base_vol_rat      | rational         | the `total_bids_base_vol` in num-rational crate format                        |
| total_bids_base_vol_fraction | fraction         | the `total_bids_base_vol` represented as an object                            |
| total_bids_rel_vol           | string (decimal) | the rel volumes sum of all bids                                               |
| total_bids_rel_vol_rat       | rational         | the `total_bids_rel_vol` in num-rational crate format                         |
| total_bids_rel_vol_fraction  | fraction         | the `total_bids_rel_vol` represented as an object                             |

Where `Order` object structure is as follows

| Structure                     | Type              | Description                                                                                                                       |
| ----------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------         |
| coin                          | string            | the name of the `base` coin; the user desires this                                                                                |
| address                       | string            | the address offering the trade                                                                                                    |
| price                         | string (decimal)  | the price in `rel` the user is willing to pay per one unit of the `base` coin                                                     |
| price_rat                     | rational          | the price in num-rational crate format                                                                                            |
| price_fraction                | object (rational) | the price represented as an object                                                                                                |
| maxvolume                     | string (decimal)  | the maximum amount of `base` coin the offer provider is willing to sell                                                           |
| max_volume_rat                | rational          | the max volume in num-rational crate format                                                                                       |
| max_volume_fraction           | object (rational) | the max volume represented as an object                                                                                           |
| min_volume                    | string (decimal)  | the minimum amount of `base` coin the offer provider is willing to sell                                                           |
| min_volume_rat                | rational          | the min volume in num-rational crate format                                                                                       |
| min_volume_fraction           | object (rational) | the min volume represented as an object                                                                                           |
| pubkey                        | string            | the pubkey of the offer provider                                                                                                  |
| age                           | number            | the age of the offer (in seconds)                                                                                                 |
| zcredits                      | number            | the zeroconf deposit amount                                                                                                       |
| numasks                       | number            | the total number of asks                                                                                                          |
| askdepth                      | number            | the depth of the ask requests                                                                                                     |
| uuid                          | string            | the uuid of order                                                                                                                 |
| is_mine                       | bool              | whether the order is placed by me                                                                                                 |
| base_confs                    | number            | the confirmations settings of `base` coin set by the offer provider                                                               |
| base_nota                     | bool              | the notarisation settings of `base` coin set by the offer provider                                                                |
| base_max_volume               | string (decimal)  | the maximum amount of `base` coin the offer provider is willing to buy or sell                                                    |
| base_max_volume_rat           | rational          | the `base` max volume in num-rational crate format                                                                                |
| base_max_volume_fraction      | object (rational) | the `base` max volume represented as an object                                                                                    |
| base_min_volume               | string (decimal)  | the minimum amount of `base` coin the offer provider is willing to buy or sell                                                    |
| base_min_volume_rat           | rational          | the `base` min volume in num-rational crate format                                                                                |
| base_min_volume_fraction      | object (rational) | the `base` min volume represented as an object                                                                                    |
| rel_confs                     | number            | the confirmations settings of `rel` coin set by the offer provider                                                                |
| rel_nota                      | bool              | the notarisation settings of `rel` coin set by the offer provider                                                                 |
| rel_max_volume                | string (decimal)  | the maximum amount of `rel` coin the offer provider is willing to buy or sell                                                     |
| rel_max_volume_rat            | rational          | the `rel` max volume in num-rational crate format                                                                                 |
| rel_max_volume_fraction       | object (rational) | the `rel` max volume represented as an object                                                                                     |
| rel_min_volume                | string (decimal)  | the minimum amount of `rel` coin the offer provider is willing to buy or sell                                                     |
| rel_min_volume_rat            | rational          | the `rel` min volume in num-rational crate format                                                                                 |
| rel_min_volume_fraction       | object (rational) | the `rel` min volume represented as an object                                                                                     |
| base_max_volume_aggr          | string (decimal)  | the base max volume aggregated at the price level; the sum of base volumes of the current order and all orders with a worse price |
| base_max_volume_aggr_rat      | rational          | the `base_max_volume_aggr` in num-rational crate format                                                                           |
| base_max_volume_aggr_fraction | object (rational) | the `base_max_volume_aggr` represented as an object                                                                               |
| rel_max_volume_aggr           | string (decimal)  | the rel max volume aggregated at the price level; the sum of rel volumes of the current order and all orders with a worse price   |
| rel_max_volume_aggr_rat       | rational          | the `rel_max_volume_aggr` in num-rational crate format                                                                            |
| rel_max_volume_aggr_fraction  | object (rational) | the `rel_max_volume_aggr` represented as an object                                                                                |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"HELLO\",\"rel\":\"WORLD\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "askdepth": 0,
  "asks": [
    {
      "coin": "RICK",
      "address": "RB8yufv3YTfdzYnwz5paNnnDynGJG6WsqD",
      "price": "1.1",
      "price_rat": [ [ 1, [ 11 ] ], [ 1, [ 10 ] ] ],
      "price_fraction": {
        "numer": "11",
        "denom": "10"
      },
      "maxvolume": "69709.32528304",
      "max_volume_rat": [ [ 1, [ 1891586123, 101 ] ], [ 1, [ 6250000 ] ] ],
      "max_volume_fraction": {
        "numer": "435683283019",
        "denom": "6250000"
      },
      "min_volume": "0.0001",
      "min_volume_rat": [ [ 1, [ 1 ] ], [ 1, [ 10000 ] ] ],
      "min_volume_fraction": {
        "numer": "1",
        "denom": "10000"
      },
      "pubkey": "0315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732",
      "age": 1618381531,
      "zcredits": 0,
      "uuid": "bf66f122-aabd-4836-baa9-e08d7b4c3a4d",
      "is_mine": false,
      "base_max_volume": "69709.32528304",
      "base_max_volume_fraction": {
        "numer": "435683283019",
        "denom": "6250000"
      },
      "base_max_volume_rat": [ [ 1, [ 1891586123, 101 ] ], [ 1, [ 6250000 ] ] ],
      "base_min_volume": "0.0001",
      "base_min_volume_fraction": {
        "numer": "1",
        "denom": "10000"
      },
      "base_min_volume_rat": [ [ 1, [ 1 ] ], [ 1, [ 10000 ] ] ],
      "rel_max_volume": "76680.257811344",
      "rel_max_volume_fraction": {
        "numer": "4792516113209",
        "denom": "62500000"
      },
      "rel_max_volume_rat": [ [ 1, [ 3627578169, 1115 ] ], [ 1, [ 62500000 ] ] ],
      "rel_min_volume": "0.00011",
      "rel_min_volume_fraction": {
        "numer": "11",
        "denom": "100000"
      },
      "rel_min_volume_rat": [ [ 1, [ 11 ] ], [ 1, [ 100000 ] ] ],
      "base_confs": 1,
      "base_nota": false,
      "rel_confs": 2,
      "rel_nota": false,
      "base_max_volume_aggr": "69711.32528304",
      "base_max_volume_aggr_fraction": {
        "numer": "435695783019",
        "denom": "6250000"
      },
      "base_max_volume_aggr_rat": [ [ 1, [ 1904086123, 101 ] ], [ 1, [ 6250000 ] ] ],
      "rel_max_volume_aggr": "76682.257811344",
      "rel_max_volume_aggr_fraction": {
        "numer": "4792641113209",
        "denom": "62500000"
      },
      "rel_max_volume_aggr_rat": [ [ 1, [ 3752578169, 1115 ] ], [ 1, [ 62500000 ] ] ]
    },
    {
      "coin": "RICK",
      "address": "RMaprYNUp8ErJ9ZAKcxMfpC4ioVycYCCCc",
      "price": "1",
      "price_rat": [ [ 1, [ 1 ] ], [ 1, [ 1 ] ] ],
      "price_fraction": {
        "numer": "1",
        "denom": "1"
      },
      "maxvolume": "2",
      "max_volume_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ],
      "max_volume_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "min_volume": "0.00777",
      "min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
      "min_volume_fraction": {
        "numer": "777",
        "denom": "100000"
      },
      "pubkey": "037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
      "age": 1618381531,
      "zcredits": 0,
      "uuid": "f99a1ca7-0202-49b4-80da-23d95361c704",
      "is_mine": false,
      "base_max_volume": "2",
      "base_max_volume_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "base_max_volume_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ],
      "base_min_volume": "0.00777",
      "base_min_volume_fraction": {
        "numer": "777",
        "denom": "100000"
      },
      "base_min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
      "rel_max_volume": "2",
      "rel_max_volume_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "rel_max_volume_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ],
      "rel_min_volume": "0.00777",
      "rel_min_volume_fraction": {
        "numer": "777",
        "denom": "100000"
      },
      "rel_min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
      "base_confs": 1,
      "base_nota": false,
      "rel_confs": 2,
      "rel_nota": false,
      "base_max_volume_aggr": "2",
      "base_max_volume_aggr_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "base_max_volume_aggr_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ],
      "rel_max_volume_aggr": "2",
      "rel_max_volume_aggr_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "rel_max_volume_aggr_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ]
    }
  ],
  "base": "RICK",
  "biddepth": 0,
  "bids": [
    {
      "coin": "MORTY",
      "address": "RMaprYNUp8ErJ9ZAKcxMfpC4ioVycYCCCc",
      "price": "1",
      "price_rat": [ [ 1, [ 1 ] ], [ 1, [ 1 ] ] ],
      "price_fraction": {
        "numer": "1",
        "denom": "1"
      },
      "maxvolume": "2",
      "max_volume_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ],
      "max_volume_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "min_volume": "0.00777",
      "min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
      "min_volume_fraction": {
        "numer": "777",
        "denom": "100000"
      },
      "pubkey": "037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
      "age": 1618381531,
      "zcredits": 0,
      "uuid": "ebc8e982-a1fb-46dd-ac5d-9773e094d699",
      "is_mine": false,
      "base_max_volume": "2",
      "base_max_volume_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "base_max_volume_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ],
      "base_min_volume": "0.00777",
      "base_min_volume_fraction": {
        "numer": "777",
        "denom": "100000"
      },
      "base_min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
      "rel_max_volume": "2",
      "rel_max_volume_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "rel_max_volume_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ],
      "rel_min_volume": "0.00777",
      "rel_min_volume_fraction": {
        "numer": "777",
        "denom": "100000"
      },
      "rel_min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
      "base_confs": 1,
      "base_nota": false,
      "rel_confs": 2,
      "rel_nota": false,
      "base_max_volume_aggr": "2",
      "base_max_volume_aggr_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "base_max_volume_aggr_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ],
      "rel_max_volume_aggr": "2",
      "rel_max_volume_aggr_fraction": {
        "numer": "2",
        "denom": "1"
      },
      "rel_max_volume_aggr_rat": [ [ 1, [ 2 ] ], [ 1, [ 1 ] ] ]
    },
    {
      "coin": "MORTY",
      "address": "RJ64uWA7fhoaSnoZga9mDhE6FSuNyrts5y",
      "price": "0.9847283211370791847221527988755820581396993104499014936871233734208355041669172800243960533191784546",
      "price_rat": [ [ 1, [ 25000000 ] ], [ 1, [ 25387713 ] ] ],
      "price_fraction": {
        "numer": "25000000",
        "denom": "25387713"
      },
      "maxvolume": "380.86547541",
      "max_volume_rat": [ [ 1, [ 3726809173, 8 ] ], [ 1, [ 100000000 ] ] ],
      "max_volume_fraction": {
        "numer": "38086547541",
        "denom": "100000000"
      },
      "min_volume": "0.00777",
      "min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
      "min_volume_fraction": {
        "numer": "777",
        "denom": "100000"
      },
      "pubkey": "0251ecfa90e8b04dfd034b7a3cf36e7b35b7c76c11238f3ae3493b11cd535eca00",
      "age": 1618381531,
      "zcredits": 0,
      "uuid": "5a483a02-ac7a-4c82-aac7-5ec4d94131de",
      "is_mine": false,
      "base_max_volume": "386.7721352527054932",
      "base_max_volume_fraction": {
        "numer": "966930338131763733",
        "denom": "2500000000000000"
      },
      "base_max_volume_rat": [ [ 1, [ 4276380181, 225131012 ] ], [ 1, [ 2616213504, 582076 ] ] ],
      "base_min_volume": "0.0078905012004",
      "base_min_volume_fraction": {
        "numer": "19726253001",
        "denom": "2500000000000"
      },
      "base_min_volume_rat": [ [ 1, [ 2546383817, 4 ] ], [ 1, [ 329033728, 582 ] ] ],
      "rel_max_volume": "380.86547541",
      "rel_max_volume_fraction": {
        "numer": "38086547541",
        "denom": "100000000"
      },
      "rel_max_volume_rat": [ [ 1, [ 3726809173, 8 ] ], [ 1, [ 100000000 ] ] ],
      "rel_min_volume": "0.00777",
      "rel_min_volume_fraction": {
        "numer": "777",
        "denom": "100000"
      },
      "rel_min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
      "base_confs": 1,
      "base_nota": false,
      "rel_confs": 2,
      "rel_nota": false,
      "base_max_volume_aggr": "388.7721352527054932",
      "base_max_volume_aggr_fraction": {
        "numer": "971930338131763733",
        "denom": "2500000000000000"
      },
      "base_max_volume_aggr_rat": [ [ 1, [ 918872597, 226295166 ] ], [ 1, [ 2616213504, 582076 ] ] ],
      "rel_max_volume_aggr": "382.86547541",
      "rel_max_volume_aggr_fraction": {
        "numer": "38286547541",
        "denom": "100000000"
      },
      "rel_max_volume_aggr_rat": [ [ 1, [ 3926809173, 8 ] ], [ 1, [ 100000000 ] ] ]
    },
    {
      "coin": "MORTY",
      "address": "RB8yufv3YTfdzYnwz5paNnnDynGJG6WsqD",
      "price": "0.9090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909091",
      "price_rat": [ [ 1, [ 10 ] ], [ 1, [ 11 ] ] ],
      "price_fraction": {
        "numer": "10",
        "denom": "11"
      },
      "maxvolume": "56120.59538087909090909090909090909090909090909090909090909090909090909090909090909090909090909090909",
      "max_volume_rat": [ [ 1, [ 1089973559, 14373 ] ], [ 1, [ 1100000000 ] ] ],
      "max_volume_fraction": {
        "numer": "61732654918967",
        "denom": "1100000000"
      },
      "min_volume": "0.0001",
      "min_volume_rat": [ [ 1, [ 1 ] ], [ 1, [ 10000 ] ] ],
      "min_volume_fraction": {
        "numer": "1",
        "denom": "10000"
      },
      "pubkey": "0315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732",
      "age": 1618381531,
      "zcredits": 0,
      "uuid": "7b5fc790-cbe1-4714-812c-2e307818f258",
      "is_mine": false,
      "base_max_volume": "61732.654918967",
      "base_max_volume_fraction": {
        "numer": "61732654918967",
        "denom": "1000000000"
      },
      "base_max_volume_rat": [ [ 1, [ 1089973559, 14373 ] ], [ 1, [ 1000000000 ] ] ],
      "base_min_volume": "0.00011",
      "base_min_volume_fraction": {
        "numer": "11",
        "denom": "100000"
      },
      "base_min_volume_rat": [ [ 1, [ 11 ] ], [ 1, [ 100000 ] ] ],
      "rel_max_volume": "56120.59538087909090909090909090909090909090909090909090909090909090909090909090909090909090909090909",
      "rel_max_volume_fraction": {
        "numer": "61732654918967",
        "denom": "1100000000"
      },
      "rel_max_volume_rat": [ [ 1, [ 1089973559, 14373 ] ], [ 1, [ 1100000000 ] ] ],
      "rel_min_volume": "0.0001",
      "rel_min_volume_fraction": {
        "numer": "1",
        "denom": "10000"
      },
      "rel_min_volume_rat": [ [ 1, [ 1 ] ], [ 1, [ 10000 ] ] ],
      "base_confs": 1,
      "base_nota": false,
      "rel_confs": 2,
      "rel_nota": false,
      "base_max_volume_aggr": "62121.4270542197054932",
      "base_max_volume_aggr_fraction": {
        "numer": "155303567635549263733",
        "denom": "2500000000000000"
      },
      "base_max_volume_aggr_rat": [ [ 1, [ 1405359989, 1799691246, 8 ] ], [ 1, [ 2616213504, 582076 ] ] ],
      "rel_max_volume_aggr": "56503.46085628909090909090909090909090909090909090909090909090909090909090909090909090909090909090909",
      "rel_max_volume_aggr_fraction": {
        "numer": "31076903470959",
        "denom": "550000000"
      },
      "rel_max_volume_aggr_rat": [ [ 1, [ 2815084399, 7235 ] ], [ 1, [ 550000000 ] ] ]
    },
    {
      "coin": "MORTY",
      "address": "RD9Jv1onKkFSey1km2AdcvhsRPvRxv8saX",
      "price": "0.17",
      "price_rat": [ [ 1, [ 17 ] ], [ 1, [ 100 ] ] ],
      "price_fraction": {
        "numer": "17",
        "denom": "100"
      },
      "maxvolume": "0.01921",
      "max_volume_rat": [ [ 1, [ 1921 ] ], [ 1, [ 100000 ] ] ],
      "max_volume_fraction": {
        "numer": "1921",
        "denom": "100000"
      },
      "min_volume": "0.0001000008",
      "min_volume_rat": [ [ 1, [ 125001 ] ], [ 1, [ 1250000000 ] ] ],
      "min_volume_fraction": {
        "numer": "125001",
        "denom": "1250000000"
      },
      "pubkey": "039ef1b42c635c32440099910bbe1c5e8b0c9373274c3f21cf1003750fc88d3499",
      "age": 1618381531,
      "zcredits": 0,
      "uuid": "41559ddd-8cba-4322-a74b-69ea1027a7c4",
      "is_mine": false,
      "base_max_volume": "0.113",
      "base_max_volume_fraction": {
        "numer": "113",
        "denom": "1000"
      },
      "base_max_volume_rat": [ [ 1, [ 113 ] ], [ 1, [ 1000 ] ] ],
      "base_min_volume": "0.00058824",
      "base_min_volume_fraction": {
        "numer": "7353",
        "denom": "12500000"
      },
      "base_min_volume_rat": [ [ 1, [ 7353 ] ], [ 1, [ 12500000 ] ] ],
      "rel_max_volume": "0.01921",
      "rel_max_volume_fraction": {
        "numer": "1921",
        "denom": "100000"
      },
      "rel_max_volume_rat": [ [ 1, [ 1921 ] ], [ 1, [ 100000 ] ] ],
      "rel_min_volume": "0.0001000008",
      "rel_min_volume_fraction": {
        "numer": "125001",
        "denom": "1250000000"
      },
      "rel_min_volume_rat": [ [ 1, [ 125001 ] ], [ 1, [ 1250000000 ] ] ],
      "base_confs": 1,
      "base_nota": false,
      "rel_confs": 2,
      "rel_nota": false,
      "base_max_volume_aggr": "62121.5400542197054932",
      "base_max_volume_aggr_fraction": {
        "numer": "155303850135549263733",
        "denom": "2500000000000000"
      },
      "base_max_volume_aggr_rat": [ [ 1, [ 4226432885, 1799757020, 8 ] ], [ 1, [ 2616213504, 582076 ] ] ],
      "rel_max_volume_aggr": "56503.48006628909090909090909090909090909090909090909090909090909090909090909090909090909090909090909",
      "rel_max_volume_aggr_fraction": {
        "numer": "31076914036459",
        "denom": "550000000"
      },
      "rel_max_volume_aggr_rat": [ [ 1, [ 2825649899, 7235 ] ], [ 1, [ 550000000 ] ] ]
    },
    {
      "coin": "MORTY",
      "address": "RD9Jv1onKkFSey1km2AdcvhsRPvRxv8saX",
      "price": "0.113",
      "price_rat": [ [ 1, [ 113 ] ], [ 1, [ 1000 ] ] ],
      "price_fraction": {
        "numer": "113",
        "denom": "1000"
      },
      "maxvolume": "0.014351",
      "max_volume_rat": [ [ 1, [ 14351 ] ], [ 1, [ 1000000 ] ] ],
      "max_volume_fraction": {
        "numer": "14351",
        "denom": "1000000"
      },
      "min_volume": "0.00010000048",
      "min_volume_rat": [ [ 1, [ 625003 ] ], [ 1, [ 1955032704, 1 ] ] ],
      "min_volume_fraction": {
        "numer": "625003",
        "denom": "6250000000"
      },
      "pubkey": "039ef1b42c635c32440099910bbe1c5e8b0c9373274c3f21cf1003750fc88d3499",
      "age": 1618381531,
      "zcredits": 0,
      "uuid": "6949a7c0-0c8b-4a01-bf6a-ee80e7c05a09",
      "is_mine": false,
      "base_max_volume": "0.127",
      "base_max_volume_fraction": {
        "numer": "127",
        "denom": "1000"
      },
      "base_max_volume_rat": [ [ 1, [ 127 ] ], [ 1, [ 1000 ] ] ],
      "base_min_volume": "0.00088496",
      "base_min_volume_fraction": {
        "numer": "5531",
        "denom": "6250000"
      },
      "base_min_volume_rat": [ [ 1, [ 5531 ] ], [ 1, [ 6250000 ] ] ],
      "rel_max_volume": "0.014351",
      "rel_max_volume_fraction": {
        "numer": "14351",
        "denom": "1000000"
      },
      "rel_max_volume_rat": [ [ 1, [ 14351 ] ], [ 1, [ 1000000 ] ] ],
      "rel_min_volume": "0.00010000048",
      "rel_min_volume_fraction": {
        "numer": "625003",
        "denom": "6250000000"
      },
      "rel_min_volume_rat": [ [ 1, [ 625003 ] ], [ 1, [ 1955032704, 1 ] ] ],
      "base_confs": 1,
      "base_nota": false,
      "rel_confs": 2,
      "rel_nota": false,
      "base_max_volume_aggr": "62121.6670542197054932",
      "base_max_volume_aggr_fraction": {
        "numer": "155304167635549263733",
        "denom": "2500000000000000"
      },
      "base_max_volume_aggr_rat": [ [ 1, [ 3064043381, 1799830944, 8 ] ], [ 1, [ 2616213504, 582076 ] ] ],
      "rel_max_volume_aggr": "56503.49441728909090909090909090909090909090909090909090909090909090909090909090909090909090909090909",
      "rel_max_volume_aggr_fraction": {
        "numer": "31076921929509",
        "denom": "550000000"
      },
      "rel_max_volume_aggr_rat": [ [ 1, [ 2833542949, 7235 ] ], [ 1, [ 550000000 ] ] ]
    },
    {
      "coin": "MORTY",
      "address": "RD9Jv1onKkFSey1km2AdcvhsRPvRxv8saX",
      "price": "0.111",
      "price_rat": [ [ 1, [ 111 ] ], [ 1, [ 1000 ] ] ],
      "price_fraction": {
        "numer": "111",
        "denom": "1000"
      },
      "maxvolume": "0.012321",
      "max_volume_rat": [ [ 1, [ 12321 ] ], [ 1, [ 1000000 ] ] ],
      "max_volume_fraction": {
        "numer": "12321",
        "denom": "1000000"
      },
      "min_volume": "0.00010000101",
      "min_volume_rat": [ [ 1, [ 10000101 ] ], [ 1, [ 1215752192, 23 ] ] ],
      "min_volume_fraction": {
        "numer": "10000101",
        "denom": "100000000000"
      },
      "pubkey": "039ef1b42c635c32440099910bbe1c5e8b0c9373274c3f21cf1003750fc88d3499",
      "age": 1618381531,
      "zcredits": 0,
      "uuid": "8cc74b4d-3b16-4f2b-8658-66b1195934f0",
      "is_mine": false,
      "base_max_volume": "0.111",
      "base_max_volume_fraction": {
        "numer": "111",
        "denom": "1000"
      },
      "base_max_volume_rat": [ [ 1, [ 111 ] ], [ 1, [ 1000 ] ] ],
      "base_min_volume": "0.00090091",
      "base_min_volume_fraction": {
        "numer": "90091",
        "denom": "100000000"
      },
      "base_min_volume_rat": [ [ 1, [ 90091 ] ], [ 1, [ 100000000 ] ] ],
      "rel_max_volume": "0.012321",
      "rel_max_volume_fraction": {
        "numer": "12321",
        "denom": "1000000"
      },
      "rel_max_volume_rat": [ [ 1, [ 12321 ] ], [ 1, [ 1000000 ] ] ],
      "rel_min_volume": "0.00010000101",
      "rel_min_volume_fraction": {
        "numer": "10000101",
        "denom": "100000000000"
      },
      "rel_min_volume_rat": [ [ 1, [ 10000101 ] ], [ 1, [ 1215752192, 23 ] ] ],
      "base_confs": 1,
      "base_nota": false,
      "rel_confs": 2,
      "rel_nota": false,
      "base_max_volume_aggr": "62121.7780542197054932",
      "base_max_volume_aggr_fraction": {
        "numer": "155304445135549263733",
        "denom": "2500000000000000"
      },
      "base_max_volume_aggr_rat": [ [ 1, [ 932081525, 1799895555, 8 ] ], [ 1, [ 2616213504, 582076 ] ] ],
      "rel_max_volume_aggr": "56503.50673828909090909090909090909090909090909090909090909090909090909090909090909090909090909090909",
      "rel_max_volume_aggr_fraction": {
        "numer": "31076928706059",
        "denom": "550000000"
      },
      "rel_max_volume_aggr_rat": [ [ 1, [ 2840319499, 7235 ] ], [ 1, [ 550000000 ] ] ]
    }
  ],
  "netid": 7777,
  "numasks": 2,
  "numbids": 6,
  "rel": "MORTY",
  "timestamp": 1618381531,
  "total_asks_base_vol": "69711.32528304",
  "total_asks_base_vol_fraction": {
    "numer": "435695783019",
    "denom": "6250000"
  },
  "total_asks_base_vol_rat": [ [ 1, [ 1904086123, 101 ] ], [ 1, [ 6250000 ] ] ],
  "total_asks_rel_vol": "76682.257811344",
  "total_asks_rel_vol_fraction": {
    "numer": "4792641113209",
    "denom": "62500000"
  },
  "total_asks_rel_vol_rat": [ [ 1, [ 3752578169, 1115 ] ], [ 1, [ 62500000 ] ] ],
  "total_bids_base_vol": "62121.7780542197054932",
  "total_bids_base_vol_fraction": {
    "numer": "155304445135549263733",
    "denom": "2500000000000000"
  },
  "total_bids_base_vol_rat": [ [ 1, [ 932081525, 1799895555, 8 ] ], [ 1, [ 2616213504, 582076 ] ] ],
  "total_bids_rel_vol": "56503.50673828909090909090909090909090909090909090909090909090909090909090909090909090909090909090909",
  "total_bids_rel_vol_fraction": {
    "numer": "31076928706059",
    "denom": "550000000"
  },
  "total_bids_rel_vol_rat": [ [ 1, [ 2840319499, 7235 ] ], [ 1, [ 550000000 ] ] ]
}
```

</collapse-text>

</div>
