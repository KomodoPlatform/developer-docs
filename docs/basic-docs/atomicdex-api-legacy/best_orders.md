# best\_orders

**best_orders coin action volume**

The `best_orders` method returns the best price orders that can fill the volume for all existing pairs with selected coin.

::: tip

The response of this method can contain coins that are not activated on the AtomicDEX API instance.
Activation will be required to proceed with the trade.

:::

#### Arguments

| Structure       | Type                       | Description                                            |
| --------------- | -------------------------- | ------------------------------------------------------ |
| coin            | string                     | the ticker of the coin to get best orders              |
| action          | string                     | whether to `buy` or `sell` the selected coin           |
| volume          | string                     | the amount of `coin` user is willing to buy or sell    |

#### Response

| Structure              | Type         | Description                                                                   |
| ---------------------- | ---------    | ----------------------------------------------------------------------------- |
| result                 | object (map) | the `ticker -> array of order entries` map                                    |

where order entry has the following structure

| Structure                | Type              | Description                                                                          |
| ----------------------   | ----------------- | ------------------------------------------------------------------------------------ |
| coin                     | string            | the ticker of the coin                                                               |
| address                  | string            | the address offering the trade                                                       |
| price                    | string (decimal)  | the price the user is willing to buy or sell per one unit of the coin from request   |
| price_rat                | rational          | the price in num-rational crate format                                               |
| price_fraction           | object (fraction) | the price represented as an object                                                   |
| maxvolume                | string (decimal)  | the maximum amount of `base` the offer provider is willing to sell                   |
| max_volume_rat           | rational          | the max volume in num-rational crate format                                          |
| max_volume_fraction      | object (rational) | the max volume represented as an object                                              |
| min_volume               | string (decimal)  | the minimum amount of `base` coin the offer provider is willing to sell              |
| min_volume_rat           | rational          | the min volume in num-rational crate format                                          |
| min_volume_fraction      | object (rational) | the min volume represented as an object                                              |
| pubkey                   | string            | the pubkey of the offer provider                                                     |
| age                      | number            | the age of the offer (in seconds)                                                    |
| zcredits                 | number            | the zeroconf deposit amount (deprecated)                                             |
| netid                    | number            | the id of the network on which the request is made (default is `0`)                  |
| uuid                     | string            | the uuid of order                                                                    |
| is_mine                  | bool              | whether the order is placed by me                                                    |
| base_max_volume          | string (decimal)  | the maximum amount of `base` coin the offer provider is willing to buy or sell       |
| base_max_volume_rat      | rational          | the `base_max_volume` in num-rational crate format                                   |
| base_max_volume_fraction | object (rational) | the `base_max_volume` represented as an object                                       |
| base_min_volume          | string (decimal)  | the minimum amount of `base` coin the offer provider is willing to buy or sell       |
| base_min_volume_rat      | rational          | the `base_min_volume` in num-rational crate format                                   |
| base_min_volume_fraction | object (rational) | the `base_min_volume` represented as an object                                       |
| rel_max_volume           | string (decimal)  | the maximum amount of `rel` coin the offer provider is willing to buy or sell        |
| rel_max_volume_rat       | rational          | the `rel_max_volume` max volume in num-rational crate format                         |
| rel_max_volume_fraction  | object (rational) | the `rel_max_volume` max volume represented as an object                             |
| rel_min_volume           | string (decimal)  | the minimum amount of `rel` coin the offer provider is willing to buy or sell        |
| rel_min_volume_rat       | rational          | the `rel_min_volume` in num-rational crate format                                    |
| rel_min_volume_fraction  | object (rational) | the `rel_min_volume` represented as an object                                        |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\": \"best_orders\",
  \"coin\": \"RICK\",
  \"action\": \"buy\",
  \"volume\": \"1\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "MORTY": [
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
        "age": 1618306280,
        "zcredits": 0,
        "uuid": "09a61d61-9352-42f3-ae64-03e832aca07f",
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
        "rel_min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ]
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
        "maxvolume": "56210.95940853",
        "max_volume_rat": [ [ 1, [ 3278717685, 1308 ] ], [ 1, [ 100000000 ] ] ],
        "max_volume_fraction": {
          "numer": "5621095940853",
          "denom": "100000000"
        },
        "min_volume": "0.0001",
        "min_volume_rat": [ [ 1, [ 1 ] ], [ 1, [ 10000 ] ] ],
        "min_volume_fraction": {
          "numer": "1",
          "denom": "10000"
        },
        "pubkey": "0315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732",
        "age": 1618306280,
        "zcredits": 0,
        "uuid": "7b5fc790-cbe1-4714-812c-2e307818f258",
        "is_mine": false,
        "base_max_volume": "61832.055349383",
        "base_max_volume_fraction": {
          "numer": "61832055349383",
          "denom": "1000000000"
        },
        "base_max_volume_rat": [ [ 1, [ 1706156167, 14396 ] ], [ 1, [ 1000000000 ] ] ],
        "base_min_volume": "0.00011",
        "base_min_volume_fraction": {
          "numer": "11",
          "denom": "100000"
        },
        "base_min_volume_rat": [ [ 1, [ 11 ] ], [ 1, [ 100000 ] ] ],
        "rel_max_volume": "56210.95940853",
        "rel_max_volume_fraction": {
          "numer": "5621095940853",
          "denom": "100000000"
        },
        "rel_max_volume_rat": [ [ 1, [ 3278717685, 1308 ] ], [ 1, [ 100000000 ] ] ],
        "rel_min_volume": "0.0001",
        "rel_min_volume_fraction": {
          "numer": "1",
          "denom": "10000"
        },
        "rel_min_volume_rat": [ [ 1, [ 1 ] ], [ 1, [ 10000 ] ] ]
      }
    ],
    "OOT": [
      {
        "coin": "OOT",
        "address": "RMaprYNUp8ErJ9ZAKcxMfpC4ioVycYCCCc",
        "price": "0.01",
        "price_rat": [ [ 1, [ 1 ] ], [ 1, [ 100 ] ] ],
        "price_fraction": {
          "numer": "1",
          "denom": "100"
        },
        "maxvolume": "1140445.56120275",
        "max_volume_rat": [ [ 1, [ 526976459, 1062 ] ], [ 1, [ 4000000 ] ] ],
        "max_volume_fraction": {
          "numer": "4561782244811",
          "denom": "4000000"
        },
        "min_volume": "0.00777",
        "min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ],
        "min_volume_fraction": {
          "numer": "777",
          "denom": "100000"
        },
        "pubkey": "037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
        "age": 1618306280,
        "zcredits": 0,
        "uuid": "8ea62e1d-0df5-4807-9ee6-c6367ac4e8ce",
        "is_mine": false,
        "base_max_volume": "114044556.120275",
        "base_max_volume_fraction": {
          "numer": "4561782244811",
          "denom": "40000"
        },
        "base_max_volume_rat": [ [ 1, [ 526976459, 1062 ] ], [ 1, [ 40000 ] ] ],
        "base_min_volume": "0.777",
        "base_min_volume_fraction": {
          "numer": "777",
          "denom": "1000"
        },
        "base_min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 1000 ] ] ],
        "rel_max_volume": "1140445.56120275",
        "rel_max_volume_fraction": {
          "numer": "4561782244811",
          "denom": "4000000"
        },
        "rel_max_volume_rat": [ [ 1, [ 526976459, 1062 ] ], [ 1, [ 4000000 ] ] ],
        "rel_min_volume": "0.00777",
        "rel_min_volume_fraction": {
          "numer": "777",
          "denom": "100000"
        },
        "rel_min_volume_rat": [ [ 1, [ 777 ] ], [ 1, [ 100000 ] ] ]
      }
    ]
  }
}
```

</collapse-text>

</div>
