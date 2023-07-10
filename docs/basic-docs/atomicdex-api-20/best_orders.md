# best_orders

The `best_orders` method returns the best priced trades available on the orderbook. There are two options for the request, either `volume` or `number`.
If request is made by `volume`, the returned results will show the best prices for trades that can fill the requested volume.
If request is made by `number`, the returned results will show a list of the best prices, `number` pairs long (e.g. top 5 best priced orders).
For coins with segwit, they may appear twice in the output (once for each address). E.g. `LTC` and `LTC-segwit`

::: tip

The response of this method can contain coins that are not activated on the Komodo DeFi Framework instance.
Activation will be required to proceed with the trade.

:::

#### Arguments

| Structure        | Type   | Description                                                                                                                                                        |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| coin             | string | The ticker of the coin to get best orders                                                                                                                          |
| action           | string | Whether to `buy` or `sell` the selected coin                                                                                                                       |
| request_by.type  | string | Defines whether requesting by `volume` or by `number`                                                                                                              |
| request_by.value | string | If `request_by.type` is `volume`, the amount of `coin` user is willing to buy or sell. If `request_by.type` is `number`, the number of best price trades to return |

#### Response

| Structure | Type         | Description                                |
| --------- | ------------ | ------------------------------------------ |
| result    | object (map) | the `ticker -> array of order entries` map |

where order entry has the following structure

| Structure                | Type              | Description                                                                                             |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------- |
| coin                     | string            | the ticker of the coin                                                                                  |
| address                  | string            | the address offering the trade                                                                          |
| price                    | string (decimal)  | the price the user is willing to buy or sell per one unit of the coin from request                      |
| price_rat                | rational          | the price in num-rational crate format                                                                  |
| price_fraction           | object (fraction) | the price represented as an object                                                                      |
| maxvolume                | string (decimal)  | the maximum amount of `base` the offer provider is willing to sell                                      |
| max_volume_rat           | rational          | the max volume in num-rational crate format                                                             |
| max_volume_fraction      | object (rational) | the max volume represented as an object                                                                 |
| min_volume               | string (decimal)  | the minimum amount of `base` coin the offer provider is willing to sell                                 |
| min_volume_rat           | rational          | the min volume in num-rational crate format                                                             |
| min_volume_fraction      | object (rational) | the min volume represented as an object                                                                 |
| pubkey                   | string            | the pubkey of the offer provider                                                                        |
| age                      | number            | the age of the offer (in seconds)                                                                       |
| zcredits                 | number            | the zeroconf deposit amount (deprecated)                                                                |
| netid                    | number            | the id of the network on which the request is made (default is `0`)                                     |
| uuid                     | string            | the uuid of order                                                                                       |
| is_mine                  | bool              | whether the order is placed by me                                                                       |
| base_max_volume          | string (decimal)  | the maximum amount of `base` coin the offer provider is willing to buy or sell                          |
| base_max_volume_rat      | rational          | the `base_max_volume` in num-rational crate format                                                      |
| base_max_volume_fraction | object (rational) | the `base_max_volume` represented as an object                                                          |
| base_min_volume          | string (decimal)  | the minimum amount of `base` coin the offer provider is willing to buy or sell                          |
| base_min_volume_rat      | rational          | the `base_min_volume` in num-rational crate format                                                      |
| base_min_volume_fraction | object (rational) | the `base_min_volume` represented as an object                                                          |
| base_confs               | number            | the confirmations settings of `base` coin set by the offer provider                                     |
| base_nota                | bool              | the notarisation settings of `base` coin set by the offer provider                                      |
| rel_max_volume           | string (decimal)  | the maximum amount of `rel` coin the offer provider is willing to buy or sell                           |
| rel_max_volume_rat       | rational          | the `rel_max_volume` max volume in num-rational crate format                                            |
| rel_max_volume_fraction  | object (rational) | the `rel_max_volume` max volume represented as an object                                                |
| rel_min_volume           | string (decimal)  | the minimum amount of `rel` coin the offer provider is willing to buy or sell                           |
| rel_min_volume_rat       | rational          | the `rel_min_volume` in num-rational crate format                                                       |
| rel_min_volume_fraction  | object (rational) | the `rel_min_volume` represented as an object                                                           |
| rel_confs                | number            | the confirmations settings of `rel` coin set by the offer provider                                      |
| rel_nota                 | bool              | the notarisation settings of `rel` coin set by the offer provider                                       |
| original_tickers         | list (string)     | Tickers included in response when `orderbook_ticker` is configured for the queried coin in `coins` file |

#### :pushpin: Examples

#### Command (by number)

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"$userpass\",
    \"method\": \"best_orders\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"coin\": \"DGB\",
        \"action\": \"buy\",
        \"request_by\": {
              \"type\": \"number\",
              \"value\": 100
        }
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (by number - success)

```json
{
  "mmrpc": "2.0",
  "result": {
    "orders": {
      "TKL": [
        {
          "coin": "TKL",
          "address": {
            "address_type": "Transparent",
            "address_data": "RAwv8JhfvmFx2V3QpY7ehiYpBJ1eqxxdxR"
          },
          "price": {
            "decimal": "8.7753611926",
            "rational": [
              [1, [927133003, 10]],
              [1, [705032704, 1]]
            ],
            "fraction": {
              "numer": "43876805963",
              "denom": "5000000000"
            }
          },
          "pubkey": "02dbd8c73e2e80e4f3cf88d2f04a9d2d0df4269496608b14a3e17556fdcb01e0c1",
          "uuid": "416bb993-acac-42cf-ae54-bf57a21f7a3d",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "2478.31474597274",
            "rational": [
              [1, [1635841741, 28851]],
              [1, [2755359744, 11]]
            ],
            "fraction": {
              "numer": "123915737298637",
              "denom": "50000000000"
            }
          },
          "base_min_volume": {
            "decimal": "0.0001",
            "rational": [
              [1, [1]],
              [1, [10000]]
            ],
            "fraction": {
              "numer": "1",
              "denom": "10000"
            }
          },
          "rel_max_volume": {
            "decimal": "21748.107044857509733489724",
            "rational": [
              [1, [2703103759, 3484586521, 294741]],
              [1, [2007498752, 2373086065, 13]]
            ],
            "fraction": {
              "numer": "5437026761214377433372431",
              "denom": "250000000000000000000"
            }
          },
          "rel_min_volume": {
            "decimal": "0.00087753611926",
            "rational": [
              [1, [927133003, 10]],
              [1, [2285707264, 11641]]
            ],
            "fraction": {
              "numer": "43876805963",
              "denom": "50000000000000"
            }
          },
          "conf_settings": {
            "base_confs": 7,
            "base_nota": false,
            "rel_confs": 2,
            "rel_nota": true
          }
        }
      ],
      "XMY-segwit": [
        {
          "coin": "XMY-segwit",
          "address": {
            "address_type": "Transparent",
            "address_data": "MJx4vyc657NwQUMjzRgDcypvRw5NduzSz4"
          },
          "price": {
            "decimal": "88.3356107012",
            "rational": [
              [1, [1795694657, 51]],
              [1, [2500000000]]
            ],
            "fraction": {
              "numer": "220839026753",
              "denom": "2500000000"
            }
          },
          "pubkey": "025d81c96aa4269c5946c0bd8dad7785ae0f4f595e7aea2ec4f8fe71f77ebf74a9",
          "uuid": "999b34ca-c7b2-4caa-92e2-76349ed2d4b5",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "2478.31474597274",
            "rational": [
              [1, [1635841741, 28851]],
              [1, [2755359744, 11]]
            ],
            "fraction": {
              "numer": "123915737298637",
              "denom": "50000000000"
            }
          },
          "base_min_volume": {
            "decimal": "0.0001",
            "rational": [
              [1, [1]],
              [1, [10000]]
            ],
            "fraction": {
              "numer": "1",
              "denom": "10000"
            }
          },
          "rel_max_volume": {
            "decimal": "218923.446595291331147485288",
            "rational": [
              [1, [1174424077, 4198508482, 1483482]],
              [1, [3151233024, 3334026680, 6]]
            ],
            "fraction": {
              "numer": "27365430824411416393435661",
              "denom": "125000000000000000000"
            }
          },
          "rel_min_volume": {
            "decimal": "0.00883356107012",
            "rational": [
              [1, [1795694657, 51]],
              [1, [3290337280, 5820]]
            ],
            "fraction": {
              "numer": "220839026753",
              "denom": "25000000000000"
            }
          },
          "conf_settings": {
            "base_confs": 7,
            "base_nota": false,
            "rel_confs": 3,
            "rel_nota": false
          }
        }
      ],
      "LTC": [
        {
          "coin": "LTC",
          "address": {
            "address_type": "Transparent",
            "address_data": "Lgrta1iKRcy8zzygVkZeEXuxBqzssPWtae"
          },
          "price": {
            "decimal": "0.0001087673",
            "rational": [
              [1, [1087673]],
              [1, [1410065408, 2]]
            ],
            "fraction": {
              "numer": "1087673",
              "denom": "10000000000"
            }
          },
          "pubkey": "026da2fc632afabbb1b86d04a9a012db25eca74db38ba2eccd88552f27f4c0b245",
          "uuid": "8530300a-b11c-4eca-80ab-c4124aaf3b64",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "24706.624279842",
            "rational": [
              [1, [986196625, 2876]],
              [1, [500000000]]
            ],
            "fraction": {
              "numer": "12353312139921",
              "denom": "500000000"
            }
          },
          "base_min_volume": {
            "decimal": "5.019891088590044985947063133864681756373468864263432116086360514603194158538457790163036133102504153",
            "rational": [
              [1, [5460000]],
              [1, [1087673]]
            ],
            "fraction": {
              "numer": "5460000",
              "denom": "1087673"
            }
          },
          "rel_max_volume": {
            "decimal": "2.6872728150328587666",
            "rational": [
              [1, [4244429513, 3128397295]],
              [1, [1156841472, 1164153218]]
            ],
            "fraction": {
              "numer": "13436364075164293833",
              "denom": "5000000000000000000"
            }
          },
          "rel_min_volume": {
            "decimal": "0.000546",
            "rational": [
              [1, [273]],
              [1, [500000]]
            ],
            "fraction": {
              "numer": "273",
              "denom": "500000"
            }
          },
          "conf_settings": {
            "base_confs": 7,
            "base_nota": false,
            "rel_confs": 2,
            "rel_nota": false
          }
        }
      ],
      "LTC-segwit": [
        {
          "coin": "LTC-segwit",
          "address": {
            "address_type": "Transparent",
            "address_data": "Lgrta1iKRcy8zzygVkZeEXuxBqzssPWtae"
          },
          "price": {
            "decimal": "0.0001087673",
            "rational": [
              [1, [1087673]],
              [1, [1410065408, 2]]
            ],
            "fraction": {
              "numer": "1087673",
              "denom": "10000000000"
            }
          },
          "pubkey": "026da2fc632afabbb1b86d04a9a012db25eca74db38ba2eccd88552f27f4c0b245",
          "uuid": "8530300a-b11c-4eca-80ab-c4124aaf3b64",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "24706.624279842",
            "rational": [
              [1, [986196625, 2876]],
              [1, [500000000]]
            ],
            "fraction": {
              "numer": "12353312139921",
              "denom": "500000000"
            }
          },
          "base_min_volume": {
            "decimal": "5.019891088590044985947063133864681756373468864263432116086360514603194158538457790163036133102504153",
            "rational": [
              [1, [5460000]],
              [1, [1087673]]
            ],
            "fraction": {
              "numer": "5460000",
              "denom": "1087673"
            }
          },
          "rel_max_volume": {
            "decimal": "2.6872728150328587666",
            "rational": [
              [1, [4244429513, 3128397295]],
              [1, [1156841472, 1164153218]]
            ],
            "fraction": {
              "numer": "13436364075164293833",
              "denom": "5000000000000000000"
            }
          },
          "rel_min_volume": {
            "decimal": "0.000546",
            "rational": [
              [1, [273]],
              [1, [500000]]
            ],
            "fraction": {
              "numer": "273",
              "denom": "500000"
            }
          },
          "conf_settings": {
            "base_confs": 7,
            "base_nota": false,
            "rel_confs": 2,
            "rel_nota": false
          }
        }
      ],
      "MATIC": [
        {
          "coin": "MATIC",
          "address": {
            "address_type": "Transparent",
            "address_data": "0xf2ed2ac92489106c942c9e32c6a912ba61af93e3"
          },
          "price": {
            "decimal": "0.0104639634",
            "rational": [
              [1, [52319817]],
              [1, [705032704, 1]]
            ],
            "fraction": {
              "numer": "52319817",
              "denom": "5000000000"
            }
          },
          "pubkey": "02dbd8c73e2e80e4f3cf88d2f04a9d2d0df4269496608b14a3e17556fdcb01e0c1",
          "uuid": "95bb48ce-7411-4be7-a1b9-70e8f8d7887f",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "8964.021726027",
            "rational": [
              [1, [424979275, 2087]],
              [1, [1000000000]]
            ],
            "fraction": {
              "numer": "8964021726027",
              "denom": "1000000000"
            }
          },
          "base_min_volume": {
            "decimal": "20.0825412816031",
            "rational": [
              [1, [1331989663, 46758]],
              [1, [1316134912, 2328]]
            ],
            "fraction": {
              "numer": "200825412816031",
              "denom": "10000000000000"
            }
          },
          "rel_max_volume": {
            "decimal": "93.7991952579513554118",
            "rational": [
              [1, [2658798179, 1822452630, 25]],
              [1, [1156841472, 1164153218]]
            ],
            "fraction": {
              "numer": "468995976289756777059",
              "denom": "5000000000000000000"
            }
          },
          "rel_min_volume": {
            "decimal": "0.21014297694968393172654",
            "rational": [
              [1, [3263923031, 2549837702, 569]],
              [1, [2067791872, 2170810533, 2710]]
            ],
            "fraction": {
              "numer": "10507148847484196586327",
              "denom": "50000000000000000000000"
            }
          },
          "conf_settings": {
            "base_confs": 7,
            "base_nota": false,
            "rel_confs": 3,
            "rel_nota": false
          }
        }
      ]
    },
    "original_tickers": {
      "LTC": ["LTC-segwit"],
      "BTC": ["BTC-segwit"],
      "XMY": ["XMY-segwit"]
    }
  },
  "id": 0
}
```

</collapse-text>

</div>

#### Command (by volume)

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"$userpass\",
    \"method\": \"best_orders\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"coin\": \"BTC\",
        \"action\": \"buy\",
        \"request_by\": {
              \"type\": \"volume\",
              \"value\": 0.01
        }
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (by volume - success)

```json
{
  "mmrpc": "2.0",
  "result": {
    "orders": {
      "DASH": [
        {
          "coin": "DASH",
          "address": {
            "address_type": "Transparent",
            "address_data": "XefPeyw3KQYa5PUJeTMQRhMHQZGVy4YMWa"
          },
          "price": {
            "decimal": "3333.333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333",
            "rational": [
              [1, [10000]],
              [1, [3]]
            ],
            "fraction": {
              "numer": "10000",
              "denom": "3"
            }
          },
          "pubkey": "0261eef15cbc141f555aff1aa40fb21de17a0a9e6897eee18c14c6032586b456b3",
          "uuid": "b17d7aee-2c0b-4311-935c-8c05e81f3813",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "0.097714296984",
            "rational": [
              [1, [3624352531, 2]],
              [1, [445948416, 29]]
            ],
            "fraction": {
              "numer": "12214287123",
              "denom": "125000000000"
            }
          },
          "base_min_volume": {
            "decimal": "0.000002331",
            "rational": [
              [1, [2331]],
              [1, [1000000000]]
            ],
            "fraction": {
              "numer": "2331",
              "denom": "1000000000"
            }
          },
          "rel_max_volume": {
            "decimal": "325.71432328",
            "rational": [
              [1, [4071429041]],
              [1, [12500000]]
            ],
            "fraction": {
              "numer": "4071429041",
              "denom": "12500000"
            }
          },
          "rel_min_volume": {
            "decimal": "0.00777",
            "rational": [
              [1, [777]],
              [1, [100000]]
            ],
            "fraction": {
              "numer": "777",
              "denom": "100000"
            }
          },
          "conf_settings": null
        }
      ],
      "LTC": [
        {
          "coin": "LTC",
          "address": {
            "address_type": "Transparent",
            "address_data": "LPCW5waySMa3BFZsxi2UrBjFnS464b97WU"
          },
          "price": {
            "decimal": "10000",
            "rational": [
              [1, [10000]],
              [1, [1]]
            ],
            "fraction": {
              "numer": "10000",
              "denom": "1"
            }
          },
          "pubkey": "0261eef15cbc141f555aff1aa40fb21de17a0a9e6897eee18c14c6032586b456b3",
          "uuid": "07764da3-bbec-4e50-9711-2baf0f8bf30b",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "0.11423436",
            "rational": [
              [1, [2855859]],
              [1, [25000000]]
            ],
            "fraction": {
              "numer": "2855859",
              "denom": "25000000"
            }
          },
          "base_min_volume": {
            "decimal": "0.000000777",
            "rational": [
              [1, [777]],
              [1, [1000000000]]
            ],
            "fraction": {
              "numer": "777",
              "denom": "1000000000"
            }
          },
          "rel_max_volume": {
            "decimal": "1142.3436",
            "rational": [
              [1, [2855859]],
              [1, [2500]]
            ],
            "fraction": {
              "numer": "2855859",
              "denom": "2500"
            }
          },
          "rel_min_volume": {
            "decimal": "0.00777",
            "rational": [
              [1, [777]],
              [1, [100000]]
            ],
            "fraction": {
              "numer": "777",
              "denom": "100000"
            }
          },
          "conf_settings": {
            "base_confs": 1,
            "base_nota": false,
            "rel_confs": 2,
            "rel_nota": false
          }
        }
      ],
      "KMD": [
        {
          "coin": "KMD",
          "address": {
            "address_type": "Transparent",
            "address_data": "RDFjuFARxX8YzTEvFk2JfgzhLV9QcPWy5f"
          },
          "price": {
            "decimal": "322580.6451612903225806451612903225806451612903225806451612903225806451612903225806451612903225806452",
            "rational": [
              [1, [10000000]],
              [1, [31]]
            ],
            "fraction": {
              "numer": "10000000",
              "denom": "31"
            }
          },
          "pubkey": "0261eef15cbc141f555aff1aa40fb21de17a0a9e6897eee18c14c6032586b456b3",
          "uuid": "adff2e1d-4514-49ea-a30b-9575711767cd",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "0.031",
            "rational": [
              [1, [31]],
              [1, [1000]]
            ],
            "fraction": {
              "numer": "31",
              "denom": "1000"
            }
          },
          "base_min_volume": {
            "decimal": "0.000000024087",
            "rational": [
              [1, [24087]],
              [1, [3567587328, 232]]
            ],
            "fraction": {
              "numer": "24087",
              "denom": "1000000000000"
            }
          },
          "rel_max_volume": {
            "decimal": "10000",
            "rational": [
              [1, [10000]],
              [1, [1]]
            ],
            "fraction": {
              "numer": "10000",
              "denom": "1"
            }
          },
          "rel_min_volume": {
            "decimal": "0.00777",
            "rational": [
              [1, [777]],
              [1, [100000]]
            ],
            "fraction": {
              "numer": "777",
              "denom": "100000"
            }
          },
          "conf_settings": null
        }
      ],
      "DAI-ERC20": [
        {
          "coin": "DAI-ERC20",
          "address": {
            "address_type": "Transparent",
            "address_data": "0xe5e6d27100474d34cc0f87ee387756395019019c"
          },
          "price": {
            "decimal": "33333333.33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333",
            "rational": [
              [1, [100000000]],
              [1, [3]]
            ],
            "fraction": {
              "numer": "100000000",
              "denom": "3"
            }
          },
          "pubkey": "0261eef15cbc141f555aff1aa40fb21de17a0a9e6897eee18c14c6032586b456b3",
          "uuid": "15a47eff-607e-4729-896b-6acb309d5022",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "0.1075026242236026",
            "rational": [
              [1, [2258990909, 125149]],
              [1, [937459712, 1164153]]
            ],
            "fraction": {
              "numer": "537513121118013",
              "denom": "5000000000000000"
            }
          },
          "base_min_volume": {
            "decimal": "0.0081585",
            "rational": [
              [1, [16317]],
              [1, [2000000]]
            ],
            "fraction": {
              "numer": "16317",
              "denom": "2000000"
            }
          },
          "rel_max_volume": {
            "decimal": "3583420.80745342",
            "rational": [
              [1, [2184652735, 41716]],
              [1, [50000000]]
            ],
            "fraction": {
              "numer": "179171040372671",
              "denom": "50000000"
            }
          },
          "rel_min_volume": {
            "decimal": "271950",
            "rational": [
              [1, [271950]],
              [1, [1]]
            ],
            "fraction": {
              "numer": "271950",
              "denom": "1"
            }
          },
          "conf_settings": null
        }
      ],
      "NMC": [
        {
          "coin": "NMC",
          "address": {
            "address_type": "Transparent",
            "address_data": "MzYv2Nn8H5RYSz8E4PMkngpQJT5ruqWV4N"
          },
          "price": {
            "decimal": "80000",
            "rational": [
              [1, [80000]],
              [1, [1]]
            ],
            "fraction": {
              "numer": "80000",
              "denom": "1"
            }
          },
          "pubkey": "0261eef15cbc141f555aff1aa40fb21de17a0a9e6897eee18c14c6032586b456b3",
          "uuid": "87e3e99c-481f-46cc-9a64-ccc89ba5e434",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "0.025",
            "rational": [
              [1, [1]],
              [1, [40]]
            ],
            "fraction": {
              "numer": "1",
              "denom": "40"
            }
          },
          "base_min_volume": {
            "decimal": "0.000000097125",
            "rational": [
              [1, [777]],
              [1, [3705032704, 1]]
            ],
            "fraction": {
              "numer": "777",
              "denom": "8000000000"
            }
          },
          "rel_max_volume": {
            "decimal": "2000",
            "rational": [
              [1, [2000]],
              [1, [1]]
            ],
            "fraction": {
              "numer": "2000",
              "denom": "1"
            }
          },
          "rel_min_volume": {
            "decimal": "0.00777",
            "rational": [
              [1, [777]],
              [1, [100000]]
            ],
            "fraction": {
              "numer": "777",
              "denom": "100000"
            }
          },
          "conf_settings": null
        }
      ],
      "DOGE": [
        {
          "coin": "DOGE",
          "address": {
            "address_type": "Transparent",
            "address_data": "D97eMzDnf7EGTT4KXA2k7vq6TMR7JDpe1D"
          },
          "price": {
            "decimal": "20000000",
            "rational": [
              [1, [20000000]],
              [1, [1]]
            ],
            "fraction": {
              "numer": "20000000",
              "denom": "1"
            }
          },
          "pubkey": "0261eef15cbc141f555aff1aa40fb21de17a0a9e6897eee18c14c6032586b456b3",
          "uuid": "14de5083-daee-4d82-bc41-ac809076bf5f",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "0.02074779",
            "rational": [
              [1, [2074779]],
              [1, [100000000]]
            ],
            "fraction": {
              "numer": "2074779",
              "denom": "100000000"
            }
          },
          "base_min_volume": {
            "decimal": "0.00777",
            "rational": [
              [1, [777]],
              [1, [100000]]
            ],
            "fraction": {
              "numer": "777",
              "denom": "100000"
            }
          },
          "rel_max_volume": {
            "decimal": "414955.8",
            "rational": [
              [1, [2074779]],
              [1, [5]]
            ],
            "fraction": {
              "numer": "2074779",
              "denom": "5"
            }
          },
          "rel_min_volume": {
            "decimal": "155400",
            "rational": [
              [1, [155400]],
              [1, [1]]
            ],
            "fraction": {
              "numer": "155400",
              "denom": "1"
            }
          },
          "conf_settings": null
        }
      ],
      "ETH": [
        {
          "coin": "ETH",
          "address": {
            "address_type": "Transparent",
            "address_data": "0xe5e6d27100474d34cc0f87ee387756395019019c"
          },
          "price": {
            "decimal": "400000",
            "rational": [
              [1, [400000]],
              [1, [1]]
            ],
            "fraction": {
              "numer": "400000",
              "denom": "1"
            }
          },
          "pubkey": "0261eef15cbc141f555aff1aa40fb21de17a0a9e6897eee18c14c6032586b456b3",
          "uuid": "19220788-3643-4fb2-9445-e13515ef811e",
          "is_mine": false,
          "base_max_volume": {
            "decimal": "0.11209544",
            "rational": [
              [1, [1401193]],
              [1, [12500000]]
            ],
            "fraction": {
              "numer": "1401193",
              "denom": "12500000"
            }
          },
          "base_min_volume": {
            "decimal": "0.0081585",
            "rational": [
              [1, [16317]],
              [1, [2000000]]
            ],
            "fraction": {
              "numer": "16317",
              "denom": "2000000"
            }
          },
          "rel_max_volume": {
            "decimal": "44838.176",
            "rational": [
              [1, [5604772]],
              [1, [125]]
            ],
            "fraction": {
              "numer": "5604772",
              "denom": "125"
            }
          },
          "rel_min_volume": {
            "decimal": "3263.4",
            "rational": [
              [1, [16317]],
              [1, [5]]
            ],
            "fraction": {
              "numer": "16317",
              "denom": "5"
            }
          },
          "conf_settings": null
        }
      ]
    },
    "original_tickers": {
      "MONA": ["MONA-segwit"],
      "NMC": ["NMC-segwit"],
      "LTC": ["LTC-segwit"],
      "PIC": ["PIC-segwit"],
      "LCC": ["LCC-segwit"],
      "BSTY": ["BSTY-segwit"],
      "BTC": ["BTC-segwit"],
      "PPC": ["PPC-segwit"],
      "GLEEC-OLD": ["GLEEC-OLD-segwit"],
      "LBC": ["LBC-segwit"],
      "BTE": ["BTE-segwit"],
      "VTC": ["VTC-segwit"],
      "LTFN": ["LTFN-segwit"],
      "SYS": ["SYS-segwit"],
      "BTX": ["BTX-segwit"],
      "tBTC-TEST": ["tBTC-TEST-segwit"],
      "CDN": ["CDN-segwit"],
      "FTC": ["FTC-segwit"],
      "GRS": ["GRS-segwit"],
      "RIC": ["RIC-segwit"],
      "XMY": ["XMY-segwit"],
      "VIA": ["VIA-segwit"],
      "WHIVE": ["WHIVE-segwit"],
      "XEP": ["XEP-segwit"],
      "FJC": ["FJC-segwit"],
      "WCN": ["WCN-segwit"],
      "QTUM": ["QTUM-segwit"],
      "tQTUM": ["tQTUM-segwit"],
      "DGB": ["DGB-segwit"]
    }
  },
  "id": null
}
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Error Responses

`InvalidRequest` - Invalid type (`number` value must be integer)
`InvalidRequest` - Invalid type (type must be either `volume` or `number`, action mut be either `buy` or `sell`)
`CoinIsWalletOnly` - Wallet only coins can not be traded.
`P2PError` - There is a connection problem.

</collapse-text>

</div>
