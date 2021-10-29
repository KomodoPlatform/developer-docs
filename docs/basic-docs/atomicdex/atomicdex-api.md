# AtomicDEX API

## Note About Rational Number Type

The AtomicDEX API now offers the [num-rational crate](https://crates.io/crates/num-rational) feature. This is used to represent order volumes and prices.

Komodo highly recommends that the developer use the rational number type when calculating an order's price and volume. This avoids rounding and precision errors when calculating numbers, such as `1/3`, as these cannot be represented as a finite decimal.

The AtomicDEX API typically will return both the rational number type as well as the decimal representation, but the decimal representation should be considered only a convenience feature for readability.

The number can be represented in the following two JSON formats:

1. As a fraction object that contains a numerator and a denominator as numeric strings, as follows:

```json
{
  "numer": "10000",
  "denom": "3000"
}
```

2. As a unique format supplied by the `num-rational` crate:

```json
[
  [1, [0, 1]],
  [1, [1]]
]
```

In the above unique format, the first item `[1,[0,1]]` is the `numerator` and the second item `[1,[1]]` is the `denominator`.

The `numerator` and `denominator` are BigInteger numbers represented as a sign and a uint32 array (where numbers are 32-bit parts of big integer in little-endian order).

`[1,[0,1]]` represents `+0000000000000000000000000000000010000000000000000000000000000000` = `4294967296`

`[-1,[1,1]]` represents `-1000000000000000000000000000000010000000000000000000000000000000` = `-4294967297`

## batch requests

A batch request is a method for sending several unique requests to the network all at once.

The requests are sent as an array filled with request objects. Results are returned in the order of received requests.

::: tip

Avoid sending requests that depend on each other. For example, do not send a coin activation and a balance request to that coin in the same batch.

Such requests result in non-deterministic behavior, as the AtomicDEX API may or may not execute the requests in the desired order.

:::

#### Arguments

| Structure       | Type                       | Description                                                                   |
| --------------- | -------------------------- | ----------------------------------------------------------------------------- |
| (none)          | array of objects           | request objects to be executed in parallel                                    |

#### Response

| Structure       | Type                | Description                                                                                                                                                                                                     |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (none)          | array of objects    | the results, provided in the order of received requests; this may contain null elements                                                                                                                         |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "[
{\"method\":\"electrum\",\"coin\":\"RICK\",\"servers\":[{\"url\":\"electrum1.cipig.net:10017\"},{\"url\":\"electrum2.cipig.net:10017\"},{\"url\":\"electrum3.cipig.net:10017\"}],\"userpass\":\"$userpass\",\"mm2\":1},
{\"method\":\"electrum\",\"coin\":\"MORTY\",\"servers\":[{\"url\":\"electrum1.cipig.net:10018\"},{\"url\":\"electrum2.cipig.net:10018\"},{\"url\":\"electrum3.cipig.net:10018\"}],\"userpass\":\"$userpass\",\"mm2\":1},
{\"method\":\"electrum\",\"coin\":\"RICK\",\"servers\":[{\"url\":\"electrum1.cipig.net:10017\"},{\"url\":\"electrum2.cipig.net:10017\"},{\"url\":\"electrum3.cipig.net:10017\"}],\"userpass\":\"invalid userpass\",\"mm2\":1}
]"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
[
  {
    "address":"RR5ecgYgykX8NCjR5zjiHMLy7F62LZUecQ",
    "balance":"9.8688213",
    "coin":"RICK",
    "locked_by_swaps":"0",
    "required_confirmations":1,
    "requires_notarization":false,
    "result":"success"
  },
  {
    "address":"RR5ecgYgykX8NCjR5zjiHMLy7F62LZUecQ",
    "balance":"4.40662368",
    "coin":"MORTY",
    "locked_by_swaps":"0",
    "required_confirmations":1,
    "requires_notarization":false,
    "result":"success"
  },
  {
    "error":"rpc:295] Userpass is invalid!"
  }
]
```

</collapse-text>

</div>

## active\_swaps

**active_swaps (include_status)**

The `active_swaps` method returns all the swaps that are currently running on the AtomicDEX API node.

#### Arguments

| Structure      | Type                          | Description                                                             |
| -------------- | ----------------------------- | ----------------------------------------------------------------------- |
| include_status | bool                          | whether to include swap statuses in response; defaults to `false`       |

#### Response

| Structure             | Type             | Description                                                                                                |
| --------------------- | ---------------- | ---------------------------------------------------------------                                            |
| result                | result object    |                                                                                                            |
| result.uuids          | array of strings | uuids of currently running swaps                                                                           |
| result.statuses       | object (map)     | the `uuid -> swap status` map of currently running swaps; `null` if include_status is false in the request |

#### :pushpin: Examples

#### Command (without include_status)

```bash
curl --url "http://127.0.0.1:7783" --data '
{
  "userpass":"'$userpass'",
  "method":"active_swaps"
}
'

```

#### Command (include_status = true)

```bash
curl --url "http://127.0.0.1:7783" --data '
{
  "userpass":"'$userpass'",
  "method":"active_swaps",
  "include_status": true
}
'
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (uuids only)

```json
{
  "result":{
    "uuids":[
      "015c13bc-da79-43e1-a6d4-4ac8b3099b34",
      "7592a07a-2805-4050-8ab8-984480e812f0",
      "82cbad96-ea9f-40fb-9225-07496323e35d",
      "177f7fa5-c9f3-4673-a2fa-28451a123e61"
    ]
  }
}
```

#### Response (statuses included)

```json
{
  "uuids": [
    "5d02843e-d1b4-488d-aad0-114d82020453"
  ],
  "statuses": {
    "5d02843e-d1b4-488d-aad0-114d82020453": {
      "type": "Taker",
      "uuid": "5d02843e-d1b4-488d-aad0-114d82020453",
      "events": [
        {
          "timestamp": 1612780908698,
          "event": {
            "type": "Started",
            "data": {
              "taker_coin": "MORTY",
              "maker_coin": "RICK",
              "maker": "7310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
              "my_persistent_pub": "03ad6f89abc2e5beaa8a3ac28e22170659b3209fe2ddf439681b4b8f31508c36fa",
              "lock_duration": 7800,
              "maker_amount": "1",
              "taker_amount": "1",
              "maker_payment_confirmations": 1,
              "maker_payment_requires_nota": false,
              "taker_payment_confirmations": 1,
              "taker_payment_requires_nota": false,
              "taker_payment_lock": 1612788708,
              "uuid": "5d02843e-d1b4-488d-aad0-114d82020453",
              "started_at": 1612780908,
              "maker_payment_wait": 1612784028,
              "maker_coin_start_block": 793472,
              "taker_coin_start_block": 797356,
              "fee_to_send_taker_fee": {
                "coin": "MORTY",
                "amount": "0.00001"
              },
              "taker_payment_trade_fee": {
                "coin": "MORTY",
                "amount": "0.00001"
              },
              "maker_payment_spend_trade_fee": {
                "coin": "RICK",
                "amount": "0"
              }
            }
          }
        },
        {
          "timestamp": 1612780924704,
          "event": {
            "type": "Negotiated",
            "data": {
              "maker_payment_locktime": 1612796508,
              "maker_pubkey": "037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
              "secret_hash": "026bebc2e19c243d0940dd583c9573bf10377afd"
            }
          }
        },
        {
          "timestamp": 1612780924962,
          "event": {
            "type": "TakerFeeSent",
            "data": {
              "tx_hex": "0400008085202f8901f425fbefe21f33ccb7b487df251191b27dfa7b639b04f60e5493c7ea41dbf149000000006b483045022100d5ec3e542175479bd4bd011e19b76a75e99f19cc49867e5bca9541950322c33a02207a4d1ffd674fb9760de79bb4929af44d66344b5e182de3c377186deebf6bf376012103ad6f89abc2e5beaa8a3ac28e22170659b3209fe2ddf439681b4b8f31508c36faffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac5ce6f305000000001976a914d55f0df6cb82630ad21a4e6049522a6f2b6c9d4588ac7c152160000000000000000000000000000000",
              "tx_hash": "75323ab7acd64bd35242611fabaec560d9acf2e1f9ca28d3a4aba47a79fb49c4"
            }
          }
        },
        {
          "timestamp": 1612780935966,
          "event": {
            "type": "MakerPaymentReceived",
            "data": {
              "tx_hex": "0400008085202f89028bef955e42107c562e4e02421f25c455723a701573f86c17b4d82e35a7d8f9f7020000006b483045022100b12fc9d95acca76bf5fd8d5c6acc288b454032ba4561b1c2b1f5f33b2cf2926d022017e561bc2cd93308848674b47b2e8ebd8f074ea78e32454d5fea6f08c0b1f1e40121037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ffffffff5dfd0b24c0f7c3cf235868cf9a26ec49574764d135796fc4e7d20e95d55a8653000000006a47304402207c752d14601d1c99892f9d6c88c8ff2f93211640a65b2ee69172a16b908b21e402206f0b66684158445888271a849ab46258ad722496ee64fde055a6f44e36ed2ccc0121037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ffffffff0300e1f5050000000017a9141b85c1a277f44f7d77d52b78e2ba70a0becc2ff9870000000000000000166a14026bebc2e19c243d0940dd583c9573bf10377afda7d26301000000001976a91486f747b28c60ad1130bdd3f84f48eeaf1801ca9888ac87152160000000000000000000000000000000",
              "tx_hash": "27dafe553246553d54f909fbbded80e6d490fdb95ca7b6807d73eca45f0d7a22"
            }
          }
        },
        {
          "timestamp": 1612780935967,
          "event": {
            "type": "MakerPaymentWaitConfirmStarted"
          }
        }
      ],
      "maker_amount": "1",
      "maker_coin": "RICK",
      "taker_amount": "1",
      "taker_coin": "MORTY",
      "gui": null,
      "mm_version": "23c89ced5",
      "success_events": [
        "Started",
        "Negotiated",
        "TakerFeeSent",
        "MakerPaymentReceived",
        "MakerPaymentWaitConfirmStarted",
        "MakerPaymentValidatedAndConfirmed",
        "TakerPaymentSent",
        "TakerPaymentSpent",
        "MakerPaymentSpent",
        "Finished"
      ],
      "error_events": [
        "StartFailed",
        "NegotiateFailed",
        "TakerFeeSendFailed",
        "MakerPaymentValidateFailed",
        "MakerPaymentWaitConfirmFailed",
        "TakerPaymentTransactionFailed",
        "TakerPaymentWaitConfirmFailed",
        "TakerPaymentDataSendFailed",
        "TakerPaymentWaitForSpendFailed",
        "MakerPaymentSpendFailed",
        "TakerPaymentWaitRefundStarted",
        "TakerPaymentRefunded",
        "TakerPaymentRefundFailed"
      ]
    }
  }
}
```

</collapse-text>

</div>

## all\_swaps\_uuids\_by\_filter

**all_swaps_uuids_by_filter (my_coin other_coin from_timestamp to_timestamp)**

The `all_swaps_uuids_by_filter` method returns all uuids of swaps that match the selected filters. Please note that all filters (my_coin, from_timestamp, etc.) are combined using logical AND.

#### Arguments

| Structure      | Type                          | Description                                                                            |
| -------------- | ----------------------------- | -----------------------------------------------------------------------                |
| my_coin        | string                        | return only swaps that match the `swap.my_coin = request.my_coin` condition            |
| other_coin     | string                        | return only swaps that match the `swap.other_coin = request.other_coin` condition      |
| from_timestamp | number (timestamp in seconds) | return only swaps that match the `swap.started_at >= request.from_timestamp` condition |
| to_timestamp   | number (timestamp in seconds) | return only swaps that match the `swap.started_at < request.to_timestamp` condition    |

#### Response

| Structure             | Type             | Description                                                     |
| --------------------- | ---------------- | --------------------------------------------------------------- |
| result                | result object    |                                                                 |
| result.uuids          | array of strings | uuids of swaps that match the selected filters                  |
| result.my_coin        | string           | my_coin that was set in request                                 |
| result.other_coin     | string           | other_coin that was set in request                              |
| result.from_timestamp | number           | from_timestamp that was set in request                          |
| result.to_timestamp   | number           | to_timestamp that was set in request                            |
| result.records_found  | number           | the number of found uuids                                       |

#### :pushpin: Examples

#### Command (select swaps uuids that have my_coin = RICK and other_coin = MORTY)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"all_swaps_uuids_by_filter\",\"my_coin\":\"RICK\",\"other_coin\":\"MORTY\"}"
```

#### Command (select swaps uuids that have my_coin = RICK and started_at >= 1611705600 (January 27, 2021 0:00:00 GMT))

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"all_swaps_uuids_by_filter\",\"my_coin\":\"RICK\",\"from_timestamp\":1611705600}"
```

#### Command (select swaps uuids that have started_at >= 1611705600 (January 27, 2021 0:00:00 GMT) and started_at < 1611792001 (January 28, 2021 0:00:01 GMT))

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"all_swaps_uuids_by_filter\",\"my_coin\":\"RICK\",\"from_timestamp\":1611705600,\"to_timestamp\":1611792001}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result":{
    "uuids":[
      "015c13bc-da79-43e1-a6d4-4ac8b3099b34",
      "7592a07a-2805-4050-8ab8-984480e812f0",
      "82cbad96-ea9f-40fb-9225-07496323e35d",
      "177f7fa5-c9f3-4673-a2fa-28451a123e61"
    ],
    "my_coin":"MORTY",
    "other_coin":null,
    "from_timestamp":null,
    "to_timestamp":null,
    "found_records":4
  }
}
```

</collapse-text>

</div>

## ban\_pubkey

**ban_pubkey pubkey reason**

The `ban_pubkey` method bans the selected pubkey ignoring its order matching messages and preventing its orders from displaying in the orderbook.

::: tip

Use the secp256k1 pubkey without prefix for this method input. E.g. if pubkey is `022cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420` you should submit `2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420`.

:::

#### Arguments

| Structure       | Type                       | Description                                                                   |
| --------------- | -------------------------- | ----------------------------------------------------------------------------- |
| pubkey          | string                     | the pubkey to ban                                                             |
| reason          | string                     | the reason of banning                                                         |

#### Response

| Structure              | Type     | Description                                                                                                                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                 | string   | whether the ban was successful                                                                                                                                                                                  |
                                                                                                                                                               
#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method": "ban_pubkey",
  "pubkey": "2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420",
  "reason": "test",
}'
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": "success"
}
```

</collapse-text>

</div>

## best\_orders

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
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method": "best_orders",
  "coin": "RICK",
  "action": "buy",
  "volume": "1"
}'
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
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"buy",
  "base":"HELLO",
  "rel":"WORLD",
  "volume":{
    "numer":"3",
    "denom":"2"
  },
  "price":{
    "numer":"2",
    "denom":"1"
  }
}'
```

#### Command (with confirmations and notarization settings)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"buy",
  "base":"HELLO",
  "rel":"WORLD",
  "volume":{
    "numer":"3",
    "denom":"2"
  },
  "price":{
    "numer":"2",
    "denom":"1"
  },
  "base_confs": 2,
  "base_nota": true,
  "rel_confs": 5,
  "rel_nota": false  
}'
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

## cancel\_all\_orders

**cancel_all_orders cancel_by**

The `cancel_all_orders` cancels the active orders created by the AtomicDEX API node by specified condition.

#### Arguments

| Structure             | Type   | Description                                                                                                                      |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| cancel_by             | object | orders matching this condition are cancelled                                                                                     |
| cancel_by.type        | string | `All` to cancel all orders; `Pair` to cancel all orders for specific coin pairs; `Coin` to cancel all orders for a specific coin |
| cancel_by.data        | object | additional data the cancel condition; present with `Pair` and `Coin` types                                                       |
| cancel_by.data.base   | string | base coin of the pair; `Pair` type only                                                                                          |
| cancel_by.data.rel    | string | rel coin of the pair; `Pair` type only                                                                                           |
| cancel_by.data.ticker | string | order is cancelled if it uses `ticker` as base or rel; `Coin` type only                                                          |

#### Response

| Structure                 | Type                     | Description                                                                                                    |
| ------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| result                    | object                   |                                                                                                                |
| result.cancelled          | array of strings (uuids) | uuids of cancelled orders                                                                                      |
| result.currently_matching | array of strings (uuids) | uuids of the orders being matched with other orders; these are not cancelled even if they fit cancel condition |

#### :pushpin: Examples

#### Command (All orders)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"cancel_all_orders\",\"cancel_by\":{\"type\":\"All\"}}"
```

#### Command (Cancel by pair)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"cancel_all_orders\",\"cancel_by\":{\"type\":\"Pair\",\"data\":{\"base\":\"RICK\",\"rel\":\"MORTY\"}}}"
```

#### Command (Cancel by coin)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"cancel_all_orders\",\"cancel_by\":{\"type\":\"Coin\",\"data\":{\"ticker\":\"RICK\"}}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (1 order cancelled)

```json
{
  "result": {
    "cancelled": ["2aae69d1-0167-493e-ad15-c6a8b43546d6"],
    "currently_matching": []
  }
}
```

#### Response (1 order cancelled and 1 is currently matching)

```json
{
  "result": {
    "cancelled": ["2aae69d1-0167-493e-ad15-c6a8b43546d6"],
    "currently_matching": ["e9a6f422-e378-437f-bb74-ba4307a90e68"]
  }
}
```

</collapse-text>

</div>

## cancel\_order

**cancel_order uuid**

The `cancel_order` cancels the active order created by the AtomicDEX API node.

#### Arguments

| Structure | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| uuid      | string | the uuid of the order the user desires to cancel |

#### Response

| Structure | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| result    | string | indicates the status of operation |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"cancel_order\",\"uuid\":\"6a242691-6c05-474a-85c1-5b3f42278f41\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{ "result": "success" }
```

#### Response (error)

```json
{ "error": "Order with uuid 6a242691-6c05-474a-85c1-5b3f42278f42 is not found" }
```

</collapse-text>

</div>

## coins\_needed\_for\_kick\_start

**coins_needed_for_kick_start()**

If the AtomicDEX API is stopped while making a swap/having the active order it will attempt to kick-start them on next launch and continue from the point where it's stopped. `coins_needed_for_kick_start` returns the tickers of coins that should be activated ASAP after the AtomicDEX API is started to continue the interrupted swaps. Consider calling this method on AtomicDEX API startup and activate the returned coins using `enable` or `electrum` methods.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure | Type             | Description                                                              |
| --------- | ---------------- | ------------------------------------------------------------------------ |
| result    | array of strings | tickers of coins that should be activated to kick-start swaps and orders |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"coins_needed_for_kick_start\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (BTC and KMD should be activated ASAP in this case)

```json
{ "result": ["BTC", "KMD"] }
```

#### Response (no swaps and orders waiting to be started)

```json
{ "result": [] }
```

</collapse-text>

</div>

## convertaddress

**convertaddress coin from to_address_format**

The `convertaddress` method converts an input address to a specified address format.

For example, this method can be used to convert a BCH address from legacy to cash address format and vice versa.

Or this can be used to convert an ETH address from single to mixed case checksum format.

#### Arguments

| Structure                 | Type          | Description                                                                                                                                                 |
| -----------------         | ------        | -------------------------------------------------------------                                                                                               |
| coin                      | string        | the name of the coin address context                                                                                                                        |
| from                      | string        | input address                                                                                                                                               |
| to_address_format         | object        | address format to which the input address should be converted                                                                                               |
| to_address_format.format  | string (enum) | address format to which the input address should be converted, possible values: `mixedcase` for ETH/ERC20 coins; `cashaddress` or `standard` for UTXO coins |
| to_address_format.network | string (enum) | network prefix for `cashaddress` format. Possible values: `bitcoincash` for BCH mainnet; `bchtest` for BCH testnet; `bchreg` for BCH regtest                |

#### Response

| Structure               | Type             | Description                                                                      |
| ----------------------- | ---------------- | -------------------------------------------------------------------------------- |
| result.address          | string           | the result of address conversion                                                 |

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Examples">

#### :pushpin: Examples

#### Command (ETH single case address to mixed checksum)

```bash  
curl --url "http://127.0.0.1:7783/" --data "{"userpass":"$userpass","method":"convertaddress","coin":"ETH","from":"0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359", "to_address_format":{"format":"mixedcase"}}"
```

#### Response

```json
{
  "result":{
    "address":"0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"
  }
}
```

#### Command (BCH legacy to cash address)

```bash
curl --url "http://127.0.0.1:7783/" --data "{"userpass":"$userpass","method":"convertaddress","coin":"BCH","from":"1DmFp16U73RrVZtYUbo2Ectt8mAnYScpqM","to_address_format":{"format":"cashaddress","network":"bitcoincash"}}"
```

#### Response

```json
{
  "result":{
    "address":"bitcoincash:qzxqqt9lh4feptf0mplnk58gnajfepzwcq9f2rxk55"
  }
}
```

#### Command (BCH cash address to legacy)

```bash
curl --url "http://127.0.0.1:7783/" --data "{"userpass":"$userpass","method":"convertaddress","coin":"BCH","from":"bitcoincash:qzxqqt9lh4feptf0mplnk58gnajfepzwcq9f2rxk55","to_address_format":{"format":"standard"}}"
```

#### Response:

```json
{
  "result":{
    "address":"1DmFp16U73RrVZtYUbo2Ectt8mAnYScpqM"
  }
}
```

#### Command (Qtum wallet address to QRC20 contract address)

```bash
curl --url "http://127.0.0.1:7783/" --data "{"userpass":"$userpass","method":"convertaddress","coin":"QRC20","from":"qKVvtDqpnFGDxsDzck5jmLwdnD2jRH6aM8", "to_address_format":{"format":"contract"}}"
```

#### Response

```json
{
  "result":{
    "address":"0x1549128bbfb33b997949b4105b6a6371c998e212"
  }
}
```

#### Command (QRC20 contract address to Qtum wallet address)

```bash
curl --url "http://127.0.0.1:7783/" --data "{"userpass":"$userpass","method":"convertaddress","coin":"QRC20","from":"0x1549128bbfb33b997949b4105b6a6371c998e212", "to_address_format":{"format":"wallet"}}"
```

#### Response

```json
{
  "result":{
    "address":"qKVvtDqpnFGDxsDzck5jmLwdnD2jRH6aM8"
  }
}
```

</collapse-text>

</div>

## disable\_coin

**disable_coin coin**

The `disable_coin` method deactivates the previously enabled coin, and also cancels all active orders that use the selected coin. The method will return an error in the following cases:

- The coin is not enabled
- The coin is used by active swaps
- The coin is used by a currently matching order. In this case, other orders might still be cancelled

#### Arguments

| Structure | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| coin      | string | the ticker of coin to disable |

#### Response

| Structure               | Type             | Description                                                                      |
| ----------------------- | ---------------- | -------------------------------------------------------------------------------- |
| result.coin             | string           | the ticker of deactivated coin                                                   |
| result.cancelled_orders | array of strings | uuids of cancelled orders                                                        |
| swaps                   | array of strings | uuids of active swaps that use the selected coin; present only in error cases    |
| orders.matching         | array of strings | uuids of matching orders that use the selected coin; present only in error cases |
| orders.cancelled        | array of strings | uuids of orders that were successfully cancelled despite the error               |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"disable_coin\",\"coin\":\"RICK\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "cancelled_orders": ["e5fc7c81-7574-4d3f-b64a-47227455d62a"],
    "coin": "RICK"
  }
}
```

#### Response (error - coin is not enabled)

```json
{
  "error": "No such coin: RICK"
}
```

#### Response (error - active swap is using the coin)

```json
{
  "error": "There're active swaps using RICK",
  "swaps": ["d88d0a0e-f8bd-40ab-8edd-fe20801ef349"]
}
```

#### Response (error - the order is matched at the moment, but another order is cancelled)

```json
{
  "error": "There're currently matching orders using RICK",
  "orders": {
    "matching": ["d88d0a0e-f8bd-40ab-8edd-fe20801ef349"],
    "cancelled": ["c88d0a0e-f8bd-40ab-8edd-fe20801ef349"]
  }
}
```

</collapse-text>

</div>

## electrum

**electrum coin servers (mm2 tx_history=false)**

::: warning Important

This command must be executed at the initiation of each AtomicDEX API instance. Also, AtomicDEX software requires the `mm2` parameter to be set for each `coin`; the methods to activate the parameter vary. See below for further information.

:::

::: tip

Electrum mode is available for utxo-based coins and QRC20 tokens only; this includes Bitcoin and Bitcoin-based forks. Electrum mode is not available for ETH/ERC20.

:::

The `electrum` method enables a `coin` by connecting the user's software instance to the `coin` blockchain using electrum technology (e.g. lite mode). This allows the user to avoid syncing the entire blockchain to their local machine.

Each `coin` can be enabled only once, and in either Electrum or Native mode. The DEX software does not allow a `coin` to be active in both modes at once.

#### Notes on the MM2 Parameter

For each `coin`, Komodo software requires the user/developer to set the `mm2` parameter. This can be achieved either in the [coins](../../../basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.html#setting-up-the-coin-list) for more details), or via the [electrum](../../../basic-docs/atomicdex/atomicdex-api.html#electrum) and [enable](../../../basic-docs/atomicdex/atomicdex-api.html#enable) methods.

The value of the `mm2` parameter informs the software as to whether the `coin` is expected to function.

- `0` = `non-functioning`
- `1` = `functioning`

::: tip

GUI software developers may refer to the `coins` file [in this link](https://github.com/KomodoPlatform/coins) for the default coin json configuration.

:::

Volunteers are welcome to test coins with AtomicDEX software at any time. After testing a coin, please create a pull request with the desired coin configuration and successful swap details using the guide linked below.

[Guide to Submitting Coin Test Results](https://github.com/KomodoPlatform/coins#about-this-repository)

##### Examples of the Parameter Settings

Set the value of the `mm2` parameter in the [coins](../../../basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.html#setting-up-the-coin-list) file as follows:

```bash
"mm2" : 1
```

For terminal interface examples, see the examples section below.

#### Using AtomicDEX Software on an Qtum Network

The following information can assist the user/developer in using QRC20 tokens with AtomicDEX software on the Qtum network:

- Swap smart contract on the Qtum mainnet: [0x2f754733acd6d753731c00fee32cb484551cc15d](https://qtum.info/contract/2f754733acd6d753731c00fee32cb484551cc15d)
- Swap smart contract on the Qtum testnet: [0xba8b71f3544b93e2f681f996da519a98ace0107a](https://testnet.qtum.info/contract/ba8b71f3544b93e2f681f996da519a98ace0107a)

To use AtomicDEX software on another Qtum-based network, deploy the Etomic swap contract code from the repository linked below. Use of this code requires a Qtum node setup.

[Link to repository code for Ethereum-based networks](https://github.com/artemii235/etomic-swap)

::: tip

Smart contract deployment is similar to [creating QRC20 tokens](https://docs.qtum.site/en/QRC20-Token-Introduce.html#creating-qrc20-tokens).

:::

#### Arguments

| Structure                           | Type                                             | Description                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                                | string                                           | the name of the coin you want to enable                                                                                                                              |
| servers                             | array of objects                                 | the list of Electrum servers to which you want to connect                                                                                                            |
| servers.url                         | string                                           | server url                                                                                                                                                           |
| servers.protocol                    | string                                           | the transport protocol that the AtomicDEX API will use to connect to the server. Possible values: `TCP`, `SSL`. Default value: `TCP`                                               |
| servers.disable\_cert\_verification | bool                                             | when set to true, this disables server SSL/TLS certificate verification (e.g. to use self-signed certificate). Default value is `false`. <b>Use at your own risk</b> |
| mm2                                 | number (required if not set in the `coins` file) | this property informs the AtomicDEX software as to whether the coin is expected to function; accepted values are either `0` or `1`                                   |
| tx\_history                         | bool                                             | whether the node should enable `tx_history` preloading as a background process; this must be set to `true` if you plan to use the `my_tx_history` API                |
| required\_confirmations             | number                                           | the number of confirmations for which the AtomicDEX API must wait for the selected coin to perform the atomic swap transactions                                                    |
| requires\_notarization              | bool                                             | whether the node should wait for a notarization of the selected coin that is performing the atomic swap transactions applicable only for coins using Komodo dPoW     |
| swap_contract_address               | string (required for QRC20 only)                 | address of etomic swap smart contract                                                                                                                                |

#### Response

| Structure              | Type                       | Description                                                                                                                                                     |
| ---------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address                | string                     | the address of the user's `coin` wallet, based on the user's passphrase                                                                                         |
| balance                | string (numeric)           | the amount of `coin` the user holds in their wallet; does not include `unspendable_balance`                                                                     |
| unspendable_balance    | string (numeric)           | the `coin` balance that is unspendable at the moment (e.g. if the address has immature UTXOs)                                                                   |
| coin                   | string                     | the ticker of the enabled coin                                                                                                                                  |
| required_confirmations | number                     | the number of transaction confirmations for which the AtomicDEX API must wait during the atomic swap process                                                                  |
| mature_confirmations   | number (optional)          | the number of coinbase transaction confirmations required to become mature; UTXO coins only                                                                     |
| requires_notarization  | bool                       | whether the node must wait for a notarization of the selected coin that is performing the atomic swap transactions; applicable only for coins using Komodo dPoW |
| result                 | string                     | the result of the request; this value either indicates `success`, or an error, or another type of failure                                                       |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HELLOWORLD\",\"servers\":[{\"url\":\"localhost:20025\",\"protocol\":\"SSL\",\"disable_cert_verification\":true},{\"url\":\"localhost:10025\"}]}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "required_confirmations": 1,
  "requires_notarization": false,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `mm2` argument)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HELLOWORLD\",\"servers\":[{\"url\":\"localhost:20025\",\"protocol\":\"SSL\",\"disable_cert_verification\":true},{\"url\":\"localhost:10025\"}],\"mm2\":1}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `required_confirmations` and `requires_notarization` arguments)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HELLOWORLD\",\"servers\":[{\"url\":\"localhost:20025\",\"protocol\":\"SSL\",\"disable_cert_verification\":true},{\"url\":\"localhost:10025\"}],\"required_confirmations\":10,\"requires_notarization\":true}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 10,
  "requires_notarization": true,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (For QRC20 tokens)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"QRC20-TOKEN\",\"servers\":[{\"url\":\"localhost:20025\",\"protocol\":\"SSL\",\"disable_cert_verification\":true},{\"url\":\"localhost:10025\"}],\"swap_contract_address\":\"0xba8b71f3544b93e2f681f996da519a98ace0107a\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "QRC20-TOKEN",
  "address": "QjXkGgoiycYRm2NbiMpkEHuQt7SB9BKHjz",
  "balance": "10",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

#### Response (Error, `mm2` is not set)

```bash
{
  "error":"lp_coins:943] lp_coins:693] mm2 param is not set neither in coins config nor enable request, assuming that coin is not supported"
}
```

</collapse-text>

</div>

## enable

**enable coin (urls swap_contract_address mm2 tx_history=false)**

::: warning Important

AtomicDEX software requires the `mm2` parameter to be set for each `coin`; the methods to activate the parameter vary. See below for further information.

:::

The `enable` method enables a coin by connecting the user's software instance to the `coin` blockchain using the `native` coin daemon.

Each `coin` can be enabled only once, and in either Electrum or Native mode. The DEX software does not allow a `coin` to be active in both modes at once.

For utxo-based coins the daemon of this blockchain must also be running on the user's machine for `enable` to function. 

::: tip Note

The AtomicDEX API node's coin address needs to be imported manually into the coin daemon using the [importaddress](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#importaddress) call.

:::

::: tip

To enable QRC20 token using the `enable` method, make sure the Qtum blockchain daemon is configured correctly. MM2 requires the following options to be in the `qtum.conf`:

```ini
logevents=1
txindex=1
addressindex=1
```

If a QRC20 token is based on Qtum testnet/regtest, please make sure that the `coins` file has the property `"network": "testnet"` or `"network": "regtest"`. See the example below.

```json
{
  "coin":"QRC20",
  "pubtype":120,
  "p2shtype":50,
  "wiftype":128,
  "segwit":true,
  "txfee":0,
  "mm2":1,
  "mature_confirmations":500,
  "required_confirmations":1,
  "network":"testnet",
  "protocol":{
    "type":"QRC20",
    "protocol_data":{
      "platform":"tQTUM",
      "contract_address":"0xd362e096e873eb7907e205fadc6175c6fec7bc44"
    }
  }
}
```

:::

ETH/ERC20 coins are also enabled by the `enable` method, but a local installation of an ETH node is not required.

#### Notes on the mm2 Parameter

Please refer to the `mm2` explanatory section in the `electrum` method for information about setting the `mm2` parameter and testing new coins.

[Link to mm2 explanatory section](../../../basic-docs/atomicdex/atomicdex-api.html#notes-on-the-mm2-parameter)

For terminal interface examples using the `mm2` parameter with the `enable` method, see the examples section below.

#### Using AtomicDEX Software on an ETH-Based Network

The following information can assist the user/developer in connecting AtomicDEX software to the Ethereum network:

- Swap smart contract on the ETH mainnet: [0x8500AFc0bc5214728082163326C2FF0C73f4a871](https://etherscan.io/address/0x8500AFc0bc5214728082163326C2FF0C73f4a871)
  - Main-net nodes maintained by the Komodo team: <b>http://eth1.cipig.net:8555</b>, <b>http://eth2.cipig.net:8555</b>, <b>http://eth3.cipig.net:8555</b>
- Swap smart contract on the Ropsten testnet: [0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94](https://ropsten.etherscan.io/address/0x7bc1bbdd6a0a722fc9bffc49c921b685ecb84b94)
  - Ropsten node maintained by the Komodo team: <b>http://eth-ropsten.cipig.net:8645</b>

To use AtomicDEX software on another Ethereum-based network, such as the Kovan testnet or ETC, deploy the Etomic swap contract code from the repository linked below. Use of this code requires either an ETH node setup or access to a public service such as [Infura.](https://infura.io/)

[Link to repository code for Ethereum-based networks](https://github.com/artemii235/etomic-swap)

#### Arguments

| Structure              | Type                                             | Description                                                                                                                                                                                                                                                                                                         |
| ---------------------  | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                   | string                                           | the name of the coin the user desires to enable                                                                                                                                                                                                                                                                     |
| urls                   | array of strings (required for ETH/ERC20)        | urls of Ethereum RPC nodes to which the user desires to connect                                                                                                                                                                                                                                                     |
| swap_contract_address  | string (required for ETH/ERC20)                  | address of etomic swap smart contract                                                                                                                                                                                                                                                                               |
| gas_station_url        | string (optional for ETH/ERC20)                  | url of [ETH gas station API](https://docs.ethgasstation.info/); The AtomicDEX API uses [eth_gasPrice RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice) by default; when this parameter is set, the AtomicDEX API will request the current gas price from Station for new transactions, and this often results in lower fees |
| mm2                    | number (required if not set in the `coins` file) | this property informs the AtomicDEX software as to whether the coin is expected to function; accepted values are either `0` or `1`                                                                                                                                                                                  |
| tx_history             | bool                                             | whether the node should enable `tx_history` preloading as a background process; this must be set to `true` if you plan to use the `my_tx_history` API                                                                                                                                                               |
| required_confirmations | number                                           | the number of confirmations for which the AtomicDEX API must wait for the selected coin to perform the atomic swap transactions; applicable only for coins using Komodo dPoW                                                                                                                                                      |
| requires_notarization  | bool                                             | whether the node should wait for a notarization of the selected coin that is performing the atomic swap transactions applicable only for coins using Komodo dPoW                                                                                                                                                    |

#### Response

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------  | ------------------------------------------------------------------------------------------------------------------ |
| address                | string            | the address of the user's `coin` wallet, based on the user's passphrase                                            |
| balance                | string (numeric)  | the amount of `coin` the user holds in their wallet; does not include `unspendable_balance`                        |
| unspendable_balance    | string (numeric)  | the `coin` balance that is unspendable at the moment (e.g. if the address has immature UTXOs)                      |
| coin                   | string            | the ticker of enabled coin                                                                                         |
| required_confirmations | number            | AtomicDEX API will wait for the this number of coin's transaction confirmations during the swap                              |
| requires_notarization  | bool              | whether the node must wait for a notarization of the selected coin that is performing the atomic swap transactions |
| mature_confirmations   | number (optional) | the number of coinbase transaction confirmations required to become mature; UTXO coins only                        |
| result                 | string            | the result of the request; this value either indicates `success`, or an error or other type of failure             |

#### :pushpin: Examples

#### Command (for Bitcoin-based blockchains)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `required_confirmations` and `requires_notarization` arguments)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\",\"required_confirmations\":10,\"requires_notarization\":true}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 10,
  "requires_notarization": true,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (for Ethereum and ERC20-based blockchains)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETH\",\"urls\":[\"http://eth-ropsten.cipig.net:8645\"],\"swap_contract_address\":\"0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "ETH",
  "address": "0x3c7aad7b693e94f13b61d4be4abaeaf802b2e3b5",
  "balance": "50",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (for Ethereum and ERC20-based blockchains with gas_station_url)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETH\",\"urls\":[\"http://eth-ropsten.cipig.net:8645\"],\"swap_contract_address\":\"0x7Bc1bBDD6A0a722fC9bffC49c921B685ECB84b94\",\"gas_station_url\":\"https://ethgasstation.info/json/ethgasAPI.json\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "coin": "ETH",
  "address": "0x3c7aad7b693e94f13b61d4be4abaeaf802b2e3b5",
  "balance": "50",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `mm2` argument)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HELLOWORLD\",\"mm2\":1}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success):

```bash
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

#### Response (Error, `mm2` is not set)

```bash
{
  "error":"lp_coins:943] lp_coins:693] mm2 param is not set neither in coins config nor enable request, assuming that coin is not supported"
}
```

</collapse-text>

</div>

## get\_enabled\_coins

**get_enabled_coins**

The `get_enabled_coins` method returns data of coins that are currently enabled on the user's AtomicDEX API node.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure      | Type             | Description                            |
| -------------- | ---------------- | -------------------------------------- |
| result         | array of objects | tickers and addresses of enabled coins |
| result.address | string           | the user's address for this coin       |
| result.ticker  | string           | the ticker name of this coin           |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"get_enabled_coins\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": [
    {
      "address": "1WxswvLF2HdaDr4k77e92VjaXuPQA8Uji",
      "ticker": "BTC"
    },
    {
      "address": "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
      "ticker": "PIZZA"
    },
    {
      "address": "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
      "ticker": "BEER"
    },
    {
      "address": "0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29",
      "ticker": "ETH"
    },
    {
      "address": "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
      "ticker": "ETOMIC"
    },
    {
      "address": "0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29",
      "ticker": "DEC8"
    },
    {
      "address": "0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29",
      "ticker": "BAT"
    }
  ]
}
```

</collapse-text>

</div>

## get\_trade\_fee (deprecated)

**get_trade_fee coin**

The `get_trade_fee` method returns the approximate amount of the miner fee that is paid per swap transaction.

This amount should be multiplied by 2 and deducted from the volume on `buy/sell` calls when the user is about to trade the entire balance of the selected coin. This aspect is currently under development.

::: tip

This function is deprecated. Please consider using [trade_preimage v2.0](../../../basic-docs/atomicdex/atomicdex-api-20/trade_preimage.html) instead.

:::

::: tip Note

To send QRC20 Maker/Taker payment, you may need to allow the [Etomic Swap](https://github.com/artemii235/etomic-swap/) smart contract to withdraw amounts from your account using the [approve](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-approve-address-uint256-) call.
In the worst case, you should call the `approve` twice (reduce allowance to 0 and set it to a required value) before the [erc20Payment](https://github.com/artemii235/etomic-swap/blob/1.0/contracts/EtomicSwap.sol#L51) is called.

Gas Limit `100000` and Gas Price `40` are sufficient for one smart contract call.

As a result, the value returned by the `get_trade_fee` for a QRC20 token includes gas fee `3 * 100000 * 40 = 12000000` that can be used in the worst case.

:::

#### Arguments

| Structure | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| coin      | string | the name of the coin for the requested trade fee |

#### Response

| Structure              | Type             | Description                                                                                                                                                |
| -------------          | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                 | object           | an object containing the relevant information                                                                                                              |
| result.coin            | string           | the fee is paid from the user's balance of this coin. This coin name may differ from the requested coin. For example, ERC20 fees are paid by ETH (gas)     |
| result.amount          | string (numeric) | the approximate fee amount to be paid per swap transaction in decimal representation                                                                       |
| result.amount_rat      | rational         | the approximate fee amount to be paid per swap transaction in rational representation                                                                      |
| result.amount_fraction | fraction         | the approximate fee amount to be paid per swap transaction in fraction representation                                                                      |

#### :pushpin: Examples

#### Command (BTC)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"get_trade_fee\",\"coin\":\"BTC\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "amount":"0.00042049",
    "amount_fraction":{
      "denom":"100000000",
      "numer":"42049"
    },
    "amount_rat":[[1,[42049]],[1,[100000000]]],
    "coin":"BTC"
  }
}
```

</collapse-text>

</div>

#### Command (ETH)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"get_trade_fee\",\"coin\":\"ETH\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "amount":"0.00594",
    "amount_fraction":{
      "denom":"50000",
      "numer":"297"
    },
    "amount_rat":[[1,[297]],[1,[50000]]],
    "coin":"ETH"
  }
}
```

</collapse-text>

</div>

#### Command (ERC20)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"get_trade_fee\",\"coin\":\"BAT\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "amount":"0.00594",
    "amount_fraction":{
      "denom":"50000",
      "numer":"297"
    },
    "amount_rat":[[1,[297]],[1,[50000]]],
    "coin":"ETH"
  }
}
```

</collapse-text>

</div>

## help

**help()**

The `help` method returns the full API documentation in the terminal.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure                           | Type | Description |
| ----------------------------------- | ---- | ----------- |
| (returns the full docs in terminal) |      |             |

## import\_swaps

**import_swaps swaps**

The `import_swaps` method imports to the local database the `swaps` data that was exported from another AtomicDEX API instance.

Use this method in combination with `my_swap_status` or `my_recent_swaps` to copy the swap history between different devices.

#### Arguments

| Structure | Type             | Description                                                             |
| --------- | ---------------- | ----------------------------------------------------------------------- |
| swaps     | array of objects | swaps data; each record has the format of the `my_swap_status` response |

#### Response

| Structure       | Type             | Description                                                  |
| --------------- | ---------------- | ------------------------------------------------------------ |
| result.imported | array of strings | uuids of swaps that were successfully imported               |
| result.imported | map              | uuids of swaps that failed to import; includes error message |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"import_swaps\",\"swaps\":[{"error_events":["StartFailed","NegotiateFailed","TakerFeeSendFailed","MakerPaymentValidateFailed","TakerPaymentTransactionFailed","TakerPaymentDataSendFailed","TakerPaymentWaitForSpendFailed","MakerPaymentSpendFailed","TakerPaymentRefunded","TakerPaymentRefundFailed"],"events":[{"event":{"data":{"lock_duration":7800,"maker":"631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640","maker_amount":"3","maker_coin":"BEER","maker_coin_start_block":156186,"maker_payment_confirmations":0,"maker_payment_wait":1568883784,"my_persistent_pub":"02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3","started_at":1568881184,"taker_amount":"4","taker_coin":"ETOMIC","taker_coin_start_block":175041,"taker_payment_confirmations":1,"taker_payment_lock":1568888984,"uuid":"07ce08bf-3db9-4dd8-a671-854affc1b7a3"},"type":"Started"},"timestamp":1568881185316},{"event":{"data":{"maker_payment_locktime":1568896784,"maker_pubkey":"02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640","secret_hash":"eba736c5cc9bb33dee15b4a9c855a7831a484d84"},"type":"Negotiated"},"timestamp":1568881246025},{"event":{"data":{"tx_hash":"0c07be4dda88d8d75374496aa0f27e12f55363ce8d558cb5feecc828545e5f87","tx_hex":"0400008085202f890146b98696761d5e8667ffd665b73e13a8400baab4b22230a7ede0e4708597ee9c000000006a473044022077acb70e5940dfe789faa77e72b34f098abbf0974ea94a0380db157e243965230220614ec4966db0a122b0e7c23aa0707459b3b4f8241bb630c635cf6e943e96362e012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff02f0da0700000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac68630700000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac5e3a835d000000000000000000000000000000"},"type":"TakerFeeSent"},"timestamp":1568881250689},{"event":{"data":{"tx_hash":"31d97b3359bdbdfbd241e7706c90691e4d7c0b7abd27f2b22121be7f71c5fd06","tx_hex":"0400008085202f8901b4679094d4bf74f52c9004107cb9641a658213d5e9950e42a8805824e801ffc7010000006b483045022100b2e49f8bdc5a4b6c404e10150872dbec89a46deb13a837d3251c0299fe1066ca022012cbe6663106f92aefce88238b25b53aadd3522df8290ced869c3cc23559cc23012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0200a3e1110000000017a91476e1998b0cd18da5f128e5bb695c36fbe6d957e98764c987c9bf0000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac753a835d000000000000000000000000000000"},"type":"MakerPaymentReceived"},"timestamp":1568881291571},{"event":{"type":"MakerPaymentWaitConfirmStarted"},"timestamp":1568881291571},{"event":{"type":"MakerPaymentValidatedAndConfirmed"},"timestamp":1568881291985},{"event":{"data":{"tx_hash":"95926ab204049edeadb370c17a1168d9d79ee5747d8d832f73cfddf1c74f3961","tx_hex":"0400008085202f8902875f5e5428c8ecfeb58c558dce6353f5127ef2a06a497453d7d888da4dbe070c010000006a4730440220416059356dc6dde0ddbee206e456698d7e54c3afa92132ecbf332e8c937e5383022068a41d9c208e8812204d4b0d21749b2684d0eea513467295e359e03c5132e719012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff46b98696761d5e8667ffd665b73e13a8400baab4b22230a7ede0e4708597ee9c010000006b483045022100a990c798d0f96fd5ff7029fd5318f3c742837400d9f09a002e7f5bb1aeaf4e5a0220517dbc16713411e5c99bb0172f295a54c97aaf4d64de145eb3c5fa0fc38b67ff012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff020084d7170000000017a9144d57b4930e6c86493034f17aa05464773625de1c877bd0de03010000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac8c3a835d000000000000000000000000000000"},"type":"TakerPaymentSent"},"timestamp":1568881296904},{"event":{"data":{"secret":"fb968d5460399f20ffd09906dc8f65c21fbb5cb8077a8e6d7126d0526586ca96","transaction":{"tx_hash":"68f5ec617bd9a4a24d7af0ce9762d87f7baadc13a66739fd4a2575630ecc1827","tx_hex":"0400008085202f890161394fc7f1ddcf732f838d7d74e59ed7d968117ac170b3adde9e0404b26a929500000000d8483045022100a33d976cf509d6f9e66c297db30c0f44cced2241ee9c01c5ec8d3cbbf3d41172022039a6e02c3a3c85e3861ab1d2f13ba52677a3b1344483b2ae443723ba5bb1353f0120fb968d5460399f20ffd09906dc8f65c21fbb5cb8077a8e6d7126d0526586ca96004c6b63049858835db1752102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac6782012088a914eba736c5cc9bb33dee15b4a9c855a7831a484d84882102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac68ffffffff011880d717000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac942c835d000000000000000000000000000000"}},"type":"TakerPaymentSpent"},"timestamp":1568881328643},{"event":{"data":{"error":"taker_swap:798] utxo:950] utxo:950] error"},"type":"MakerPaymentSpendFailed"},"timestamp":1568881328645},{"event":{"type":"Finished"},"timestamp":1568881328648}],"my_info":{"my_amount":"4","my_coin":"ETOMIC","other_amount":"3","other_coin":"BEER","started_at":1568881184},"recoverable":true,"success_events":["Started","Negotiated","TakerFeeSent","MakerPaymentReceived","MakerPaymentWaitConfirmStarted","MakerPaymentValidatedAndConfirmed","TakerPaymentSent","TakerPaymentSpent","MakerPaymentSpent","Finished"],"type":"Taker","uuid":"07ce08bf-3db9-4dd8-a671-854affc1b7a3"}]}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "imported": ["07ce08bf-3db9-4dd8-a671-854affc1b7a3"],
    "skipped": {
      "1af6bb5e-e131-4b06-b235-36fae8daab0a": "lp_swap:424] File already exists"
    }
  }
}
```

</collapse-text>

</div>

## kmd\_rewards\_info

**kmd_rewards_info**

The `kmd_rewards_info` method returns information about the active user rewards that can be claimed by an address's unspent outputs.

::: tip Note

This method only works when the KMD coin is activated.

:::

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure              | Type                       | Description                                                                                                                                         |
| ---------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------        |
| result                 | array of objects           | the rewards info; each element corresponds to an unspent output and contains detailed information about the active user rewards corresponding to it |
| result.tx_hash         | string                     | the hash of the transaction                                                                                                                         |
| result.height          | number (integer, optional) | the height of the block in which the transaction was included (empty if the tx is not mined yet)                                                    |
| result.output_index    | number (integer)           | the zero-based index of the output in the transaction’s list of outputs                                                                             |
| result.amount          | string (numeric)           | the transaction output’s value                                                                                                                      |
| result.locktime        | number (integer)           | the transaction output's locktime                                                                                                                   |
| result.accrued_rewards | object                     | the amount of accrued rewards if they exist or the reason for their non existence                                                                   |
| result.accrue_start_at | number (integer, optional) | the rewards start to accrue at this time for the given transaction (empty if the rewards will never accrue to it)                                   |
| result.accrue_stop_at  | number (integer, optional) | the rewards stop to accrue at this time for the given transaction (empty if the tx is not mined yet or if rewards will never accrue to it)          |

Where the `result.accrued_rewards` has either

| Structure | Type             | Description                   |
| --------- | ---------------- | ----------------------------- |
| Accrued   | string (numeric) | the amount of accrued rewards |

or

| Structure        | Type   | Description                            |
| ---------------- | ------ | -------------------------------------- |
| NotAccruedReason | string | the reason why rewards are not accrued |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783/" --data "{"userpass":"$userpass","method":"kmd_rewards_info"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": [
    {
      "accrue_stop_at":1596144028,
      "accrued_rewards":{
         "Accrued":"0.00450984"
      },
      "amount":"47.99897112",
      "height":1986467,
      "input_index":1,
      "locktime":1596099388,
      "tx_hash":"016bfb8fcf8704a30b5daf6b4bcce9d7e848141b53df44a5eae3db4279227401"
    },
    {
      "accrue_stop_at":1596142801,
      "accrued_rewards":{
        "NotAccruedReason":"UtxoAmountLessThanTen"
      },
      "amount":"0.5",
      "height":1986481,
      "input_index":0,
      "locktime":1596098161,
      "tx_hash":"762d02d9d52faf365b55375da5e61ce34bb0ea391fbcb23e74b2adf8165f1bbb"
    }
  ]
}
```

</collapse-text>

</div>

## list\_banned\_pubkeys

**list_banned_pubkeys**

The `list_banned_pubkeys` method returns a list of public keys of nodes that are banned from interacting with the node executing the method.

Banned nodes cannot complete orders and order matching requests with the node executing the method.

::: tip

Some cases of swap failures give cause for banning a node. For example, a market taker may not follow the atomic-swap protocol by not sending the dex fee. The <b>list\_banned\_pubkeys</b> method is useful in these circumstances.

:::

#### Arguments

| Structure | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| (none)    |        |                                              |

#### Response

| Structure                | Type                                                        | Description                                                                                                                                                                                                                                              |
| ------------------------ | ----------------                                            | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                   | map of objects (key - pubkey in hexadecimal representation) | the list of pubkeys banned by current node                                                                                                                                                                                                               |
| result.*.type            | string                                                      | the type of the ban; possible values: `Manual` or `FailedSwap`                                                                                                                                                                                           |
| result.*.caused_by_swap  | string (optional)                                           | the uuid of the swap that triggered the ban; present only for the `FailedSwap` type                                                                                                                                                                      |
| result.*.caused_by_event | object (optional)                                           | the swap event that triggered the ban; present only for the `FailedSwap` type                                                                                                                                                                            |
| result.*.reason          | string (optional)                                           | the reason for the `Manual` ban                                                                                                                                                                                                                          |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"list_banned_pubkeys\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "15d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732": {
      "type": "FailedSwap",
      "caused_by_event": {
        "event": {
          "data": {
            "error": "taker_swap:547] \"taker_swap:543] timeout (180.0 > 180.0)\""
          },
          "type": "NegotiateFailed"
        },
        "type": "Taker"
      },
      "caused_by_swap": "e8400870-e85a-42af-bb4f-9658ac86ffdf"
    },
    "15d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044730": {
      "type": "Manual",
      "reason": "test"
    }
  }
}
```

</collapse-text>

</div>

## min\_trading\_vol 

**min_trading_vol coin**

The `min_trading_vol` method returns the minimum required volume for buy/sell/setprice methods for the selected `coin`.


#### Arguments

| Structure  | Type              | Description                                                           |
| ---------- | ----------------- | --------------------------------------------------------------------- |
| coin       | string            | the name of the coin to retrieve the minimum trading volume           |

#### Response

| Structure                       | Type             | Description                                                     |
| ------------------------------- | ---------------- | --------------------------------------------------------------- |
| result                          | object           | result object                                                   |
| result.coin                     | string           | the coin ticker from the request                                |
| result.min_trading_vol          | string (decimal) | the minimum trading volume threshold in decimal representation  |
| result.min_trading_vol_rat      | rational         | the minimum trading volume threshold in rational representation |
| result.min_trading_vol_fraction | fraction         | the minimum trading volume threshold in fraction representation |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data '
{
  "userpass":"'$userpass'",
  "method":"min_trading_vol",
  "coin": "RICK"
}
'
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "coin": "RICK",
    "min_trading_vol": "0.0001",
    "min_trading_vol_fraction": {
      "numer": "1",
      "denom": "10000"
    },
    "min_trading_vol_rat": [ [ 1, [ 1 ] ], [ 1, [ 10000 ] ] ]
  }
}
```

</collapse-text>

</div>

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

## my\_balance

**my_balance coin**

The `my_balance` method returns the current balance of the specified `coin`.

#### Arguments

| Structure | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| coin      | string | the name of the coin to retrieve the balance |

#### Response

| Structure           | Type             | Description                                                                                   |
| ------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| address             | string           | the address that holds the coins                                                              |
| balance             | string (numeric) | the number of coins in the address; does not include `unspendable_balance`                    |
| unspendable_balance | string (numeric) | the `coin` balance that is unspendable at the moment (e.g. if the address has immature UTXOs) |
| coin                | string           | the name of the coin                                                                          |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_balance\",\"coin\":\"HELLOWORLD\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "address": "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
  "balance": "60.00253836",
  "unspendable_balance": "0.1",
  "coin": "HELLOWORLD"
}
```

</collapse-text>

</div>

## my\_orders

**my_orders()**

The `my_orders` method returns the data of all active orders created by the AtomicDEX API node.

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
          "match_by":{
            "type":"Any"
          }
        },
        "order_type":{
          "type":"GoodTillCancelled"
        }
      }
    }
  }
}
```

</collapse-text>

</div>

## my\_recent\_swaps

**my_recent_swaps (from_uuid page_number=1 limit=10 my_coin other_coin from_timestamp to_timestamp)**

The `my_recent_swaps` method returns the data of the most recent atomic swaps executed by the AtomicDEX API node. Please note that all filters (my_coin, from_timestamp, etc.) are combined using logical AND.

#### Arguments

| Structure      | Type                          | Description                                                                                                                                           |
| -------------- | ----------------------------- | -----------------------------------------------------------------------                                                                               |
| limit          | number                        | limits the number of returned swaps. The default is `10`.                                                                                             |
| from_uuid      | string                        | AtomicDEX API will skip records until this uuid, skipping the `from_uuid` as well; The `from_uuid` approach is convenient for infinite scrolling implementation |
| page_number    | number                        | AtomicDEX API will return `limit` swaps from the selected page; This param will be ignored if `from_uuid` is set.                                               |
| my_coin        | string                        | return only swaps that match the `swap.my_coin = request.my_coin` condition                                                                           |
| other_coin     | string                        | return only swaps that match the `swap.other_coin = request.other_coin` condition                                                                     |
| from_timestamp | number (timestamp in seconds) | return only swaps that match the `swap.started_at >= request.from_timestamp` condition                                                                |
| to_timestamp   | number (timestamp in seconds) | return only swaps that match the `swap.started_at < request.to_timestamp` condition                                                                   |

#### Response

| Structure     | Type             | Description                                                                                                                                                                                           |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------                                                               |
| swaps         | array of objects | swaps data; each record has the format of the `my_swap_status` response                                                                                                                               |
| from_uuid     | string           | the from_uuid that was set in the request; this value is null if nothing was set                                                                                                                      |
| skipped       | number           | the number of skipped records (i.e. the position of `from_uuid` in the list + 1 or `(page_number - 1) * limit`; the value is 0 if `from_uuid` or `page_number` were not set or `page_number` is 1)    |
| limit         | number           | the limit that was set in the request; note that the actual number of swaps can differ from the specified limit (e.g. on the last page)                                                               |
| total         | number           | total number of swaps available with the selected filters                                                                                                                                             |
| page_number   | number           | the page_number that was set in the request; if both `page_number` and `from_uuid` are not set in request it will default to `1`; if `from_uuid` is present in request this value will be always null |
| total_pages   | number           | total pages available with the selected filters and limit                                                                                                                                             |
| found_records | number           | the number of returned swaps                                                                                                                                                                          |

#### :pushpin: Examples

#### Command (limit + from_uuid)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_recent_swaps\",\"from_uuid\":\"e299c6ece7a7ddc42444eda64d46b163eaa992da65ce6de24eb812d715184e4c\",\"limit\":2}"
```

#### Command (limit + page_number)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_recent_swaps\",\"page_number\":3,\"limit\":2}"
```

#### Command (select swaps that have my_coin = RICK and other_coin = MORTY)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_recent_swaps\",\"limit\":2,\"my_coin\":\"RICK\",\"other_coin\":\"MORTY\"}"
```

#### Command (select swaps that have my_coin = RICK and started_at >= 1611705600 (January 27, 2021 0:00:00 GMT))

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_recent_swaps\",\"limit\":2,\"my_coin\":\"RICK\",\"from_timestamp\":1611705600}"
```

#### Command (select swaps that have started_at >= 1611705600 (January 27, 2021 0:00:00 GMT) and started_at < 1611792001 (January 28, 2021 0:00:01 GMT))

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_recent_swaps\",\"limit\":2,\"my_coin\":\"RICK\",\"from_timestamp\":1611705600,\"to_timestamp\":1611792001}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "from_uuid": "e299c6ece7a7ddc42444eda64d46b163eaa992da65ce6de24eb812d715184e4c",
    "limit": 2,
    "skipped": 1,
    "total": 49,
    "found_records": 2,
    "page_number": null,
    "total_pages": 25,
    "swaps": [
      {
        "error_events": ["StartFailed","NegotiateFailed","TakerFeeValidateFailed","MakerPaymentTransactionFailed","MakerPaymentDataSendFailed","MakerPaymentWaitConfirmFailed","TakerPaymentValidateFailed","TakerPaymentWaitConfirmFailed","TakerPaymentSpendFailed","TakerPaymentSpendConfirmFailed","MakerPaymentWaitRefundStarted","MakerPaymentRefunded","MakerPaymentRefundFailed"],
        "events": [
          {
            "event": {
              "data": {
                "lock_duration": 7800,
                "maker_amount": "1",
                "maker_coin": "BEER",
                "maker_coin_start_block": 154221,
                "maker_payment_confirmations": 1,
                "maker_payment_requires_nota": false,
                "maker_payment_lock": 1561545442,
                "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
                "secret": "ea774bc94dce44c138920c6e9255e31d5645e60c0b64e9a059ab025f1dd2fdc6",
                "started_at": 1561529842,
                "taker": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
                "taker_amount": "1",
                "taker_coin": "PIZZA",
                "taker_coin_start_block": 141363,
                "taker_payment_confirmations": 1,
                "taker_payment_requires_nota": true,
                "uuid": "6bf6e313-e610-4a9a-ba8c-57fc34a124aa"
              },
              "type": "Started"
            },
            "timestamp": 1561529842866
          },
          {
            "event": {
              "data": {
                "taker_payment_locktime": 1561537641,
                "taker_pubkey": "02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640"
              },
              "type": "Negotiated"
            },
            "timestamp": 1561529883208
          },
          {
            "event": {
              "data": {
                "tx_hash": "a91469546211cc910fbe4a1f4668ab0353765d3d0cb03f4a67bff9326991f682",
                "tx_hex": "0400008085202f89021c7eeec33f8eb5ff2ed6c3d09e40e04b05a9674ea2feefcc12de3f9dcc16aff8000000006b483045022100e18e3d1afa8a24ecec82c92bfc05c119bfacdbb71b5f5663a4b96cc2a41ab269022017a79a1a1f6e0220d8fa1d2cf3b1c9788272f1ad18e4987b8f1cd4418acaa5b0012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff6a0d321eb52c3c7165adf80f83b15b7a5caa3a0dfa87746239021600d47fb43e000000006b483045022100937ed900e084d57d5e3341499fc66c5574884ca71cd4331fa696c8b7a517591b02201f5f851f94c3ca0ffb4789f1af22cb95dc83564e127ed7d23f1129eb2b981a2f012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac9c120100000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac2f0e135d000000000000000000000000000000"
              },
              "type": "TakerFeeValidated"
            },
            "timestamp": 1561529927879
          },
          {
            "event": {
              "data": {
                "tx_hash": "efa90a2918e6793c8a2725c06ee34d0fa76c43bc85e680be195414e7aee36154",
                "tx_hex": "0400008085202f890cdcd071edda0d5f489b0be9c8b521ad608bb6d7f43f6e7a491843e7a4d0078f85000000006b483045022100fbc3bd09f8e1821ed671d1b1d2ed355833fb42c0bc435fef2da5c5b0a980b9a002204ef92b35576069d640ca0ac08f46645e5ade36afd5f19fb6aad19cfc9fb221fb012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffe6ae2a3ce221a6612d9e640bdbe10a2e477b3bc68a1aeee4a6784cb18648a785010000006a47304402202000a7e60ae2ce1529247875623ef2c5b42448dcaeac8de0f8f0e2f8e5bd8a6b0220426321a004b793172014f522efbca77a3dc92e86ce0a75330d8ceb83072ad4e7012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff9335553edcbac9559cae517a3e25b880a48fabf661c4ac338394972eef4572da000000006b4830450221008ded7230f2fb37a42b94f96174ec192baf4cd9e9e68fb9b6cf0463a36a6093e00220538de51ceda1617f3964a2350802377940fdfa018cc1043d77c66081b1cab0c4012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3fffffffff91b5d3733877f84108de77fec46bee156766e1a6837fa7b580ccbc3905acb14000000006b483045022100d07cf1fd20e07aafdc942ba56f6b45baee61b93145a2bdba391e2cdb8024bf15022056ea8183990703ef05018df2fe8bd5ec678ec0f9207b0283292b2cdafc5e1e0c012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff147870387ca938b2b6e7daa96ba2496014f125c0e4e576273ef36ee8186c415a000000006a47304402204c5b15b641d7e34444456d2ea6663bdc8bd8216e309a7220814474f346b8425e0220634d1dd943b416b7a807704d7f7a3d46a60d88ef4e20734588a0b302c55fa82d012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffd2b954ae9b4a61fad9f7bc956d24e38d7b6fe313da824bd3bd91287d5a6b49d9000000006b483045022100a7387d9ab7b2c92d3cbce525e96ffac5ae3ef14f848661741ada0db17715c4a002202c1417d5e3e04b1a2d1774a83bb8d5aa1c0536c100138123089fa69921b5d976012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff28792a2e26d9d7be0467fac52b12ece67410b23eea845008257979bd87d083e3000000006a473044022027c40517c33cd3202d4310cfd2c75f38e6d7804b255fc3838a32ea26e5a3cb0002202b4399e1d7e655b64f699318f2bfbdced49f064ee54e9d6a678668fce51caf96012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffa8bf797bacd213b74a9977ae1b956afe3af33a1ee94324e010a16db891a07441000000006a473044022004cbb1d970b9f02c578b5c1d7de33361581eebc19c3cd8d2e50b0211ca4ef13702200c93b9fe5428055b6274dc8e52073c3e87f5b5e4206134d745928ccfc9393919012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff2b6fd82c9a68111b67ad85a614a6ecb50f7b6eac3d21d8ebefd9a6065cdf5729000000006b483045022100fdff16c595c7b4a9b4fc1e445b565f7b29fe5b7a08f79291b0ff585c7b72ac2902200c694aa124013bd419ce2349f15d10435827868d35db939b9d3c344d16e78420012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff6a5468dd8c83553dc51022f2a2fb772cf91c8607dc2ca1b8f203ac534612ab29000000006b483045022100ba7cc79e7ae3720238bfc5caa225dc8017d6a0d1cb1ec66abaf724fd20b3b7ab02206e8c942756604af0f63b74af495a9b3b7f4a44c489267f69a14cf2b1b953f46e012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff5f9f48a91d343fd5aef1d85f00850070931459ab256697afb728d1c81c1fa1d2000000006a47304402200ec85fc66f963e7504eb27361a4b4bb17de60e459da414fdc3962476de636134022056b62c15cf7f9b4e7d4e11c03e4e541dd348919b8c55efa4f1927e2fdd5ae8ea012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffee1f455924d3167e7f7abf452c1856e9abdcfe27dc889942dd249cb376169d38000000006b48304502210089274eed807c5d23d819f6dfa8a358a9748e56f2080be4396ef77bb19d91b17402207fc7b22c879534fffe0eeaaec8fc284e22c2756f380c05ea57b881a96b09f3af012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f5050000000017a9144eb3a361d8a15d7f6a8ef9d1cf44962a90c44d548702912b00000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac490e135d000000000000000000000000000000"
              },
              "type": "MakerPaymentSent"
            },
            "timestamp": 1561529938879
          },
          {
            "event": {
              "data": {
                "tx_hash": "7e0e38e31dbe80792ef320b8c0a7cb9259127427ef8c2fca1d796f24484046a5",
                "tx_hex": "0400008085202f892082f6916932f9bf674a3fb00c3d5d765303ab68461f4abe0f91cc1162546914a9010000006b483045022100999b8bb0224476b5c344a466d0051ec7a8c312574ad8956a4177a42625cb86e302205a6664396bff3f2e6fe57adb7e082a26d1b8da9ee77b3fc24aa4148fdd5c84db012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffcad29a146b81bcaa44744efbec5149b6e3ca32bace140f75ad5794288d5bff6c000000006b483045022100b4dbfe88561c201fb8fbaf5bbf5bc0985893c909429c579425da84b02d23cc12022075f1e1e3eba38d167a6e84aac23faee5a2eb0799511e647213cee168529d4e5d012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffa13eeacd04b3e26ae3f41530b560c615dafa0fd4235cc5b22d48ab97e7c3399c000000006a47304402201158306fe668cbf56ad3f586dc83c1cda9efab44cef46da6bc0fe242292c85ed02201d622fe283410320e760233ae81dc53df65406b09fd07f8649f1775689219c35012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff4352b9f1f01dde4209b9e91076a3cfcabdaa23d9d5a313abfe7edb67ee4273e3000000006b483045022100825242fb3c6d460580016e93718ae1f43917e53abcc1558a64a6ab6f406763dd0220543936ce4c725e5e9f03831274a8475b535171bb29e1919fcf52ba2a9c85a553012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffcc0fa94b5973c893e61d470ae3982b0bedfd29cb0da2c60a362de438598f108c000000006b4830450221008c70a8e10ca37819e5a4d9783366e729e690d78f2fdd8a1f4812ddc14ec7d6ad022035ba8cb4d4e50684107f8af5c184582687b5d7dfda5d9be1bd45e45749c77f08012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffb0bd3bb9fedb7bbf49ca1612c955ba6095202186cef5be6952aed3dd32da4268000000006a4730440220592216d63c199faa587a4a6cbe11ca26027368a116b50818ce30eced59ca887202201bcafcf88f9f2632151596732f839d77cbe2f2243822c8551faffecc90b5dc19012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff65cf2831fc200e55aaacbe0881ad0edfb298ee6d4421b08b048aecc151716bd1000000006a47304402202032eb1ccebc3be4b94bae343d1d168e87040d2d20977c47d073d6bf490ef6c00220067656e00c4b8930167c54078609925cec7b893a52bcb9304e6b2602f564413e012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffeaf67880bee214acecc74b12f648c1014d6394c4abf99832d408981bb460e999000000006b483045022100b9ae1cc824149220ac517298e6f21c26939485b31d0ae19d97d986c5f8f34e4502200a90578cf2c1835dbea00484af1f225711c255f1d0a3208f2e4f1154f0db2c9a012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffad089c3fe7987a44f150f34b7ac66972de76dd84c739bdeddf360ab029dfd4d6000000006a473044022015f0386ed67a61626fbe5ae79e0d39d38e7b4072b648e8a26e23adadc0a8e5bc02202398188fa2feb26994e5c1e7e758788de3d5f0f0096f956a0cd58804710bea6a012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffd6c66730546c62dd003b5af1f1e5ecfd339c62db0169c1d499584e09a8a9b288000000006b4830450221008d4c73f0e3c9d913ba32fd864167649242e3e891412ab80bdd3f7ff43a238ee20220602738e98008b146256b51d0df99e222aa165f2ce351241ebc23d8a098e2b0db012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff12d9eff354f46cbd4446a0bff27a6a635ff5b1dc8a5dd8b0178bb5f89c9ec080000000006b48304502210098d3349ba9b13560748949933d2704663a5ab52cdc804afa1ac4da3e5992e0a002201525d7ad8466ad260219f3873fb7781addbd363f91e8063bfa86c7ed4e385b84012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff69e16767806ea5f069b7d46674f7aa747fcc6e541189ce7fcf92edcfd7642ff4000000006b4830450221008a5ebfe904c87f21947a44d8418190be5893993a683fde0f96df8a9487923da002205be1bbd8b518ba2f303cae23bc20806e84ffbba6a03f032385b15edb8df107f4012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640fffffffff4fbabd508178f553e676d67ce325796b03aa249b41a23c681c1ad9dedb45ae7000000006a47304402207cea6824abe1ce35e18954b858d45243e2cb57d27d782adc5b6b07ebd21a02d7022007ba0469b298c4b1a7c4a148fa16bae93d28593b34e197c10ac0d1faf9cc1bfa012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff14867aa59932d895be607fb7398f5594e39d9fa2e1c7daaed7b1390dbfdddcab000000006b4830450221009fb6e1885a3658c593809f95ecd2049f8ef9e00379686ac236b17312c9613d4c0220709fc50c9a920a19254389944db366c354708c19885d2479d9968fda0848f9f7012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff75777c692daaa21d216a1a2a7059203becfcdcf6793aa1259cdd7aadec957ab6000000006a47304402202945019860abf9b80e71f340320d114846efa4d2780ce12513e3983fb4d3f15b022019be008fb7368e3f1f022924dc7af1138b94041f46084dd27768bc8cacd1529f012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffca037b85742e93df4eef8e8ac3b8531321c8a8e21a4a941360866ea57a973665000000006a4730440220760283a7828edcc53671fc73e29c30cdc64d60d300292761d39730f0d09f94c202201e026293e3891a6fe46e40cd21778a41e21641a261a7fbf3bf75b034d9c788d9012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffa68edd030b4307ad87bfeff96a6db5b3ddd1a0901c488a4fe4d2093531896d75000000006b48304502210091a41e16b2c27d7ef6077e8de9df692b6013e61d72798ff9f7eba7fc983cdb65022034de29a0fb22a339e8044349913915444ab420772ab0ab423e44cfe073cb4e70012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff8c952791181993a7512e48d098a06e6197c993b83241a4bf1330c0e95f2c304d000000006b483045022100fa14b9301feb056f6e6b10446a660525cc1ff3e191b0c45f9e12dcd4f142422c02203f4a94f2a9d3ec0b74fac2156dd9b1addb8fa5b9a1cfc9e34b0802e88b1cbfa3012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff32bc4d014542abf328fecff29b9f4c243c3dd295fe42524b20bf591a3ddc26a1000000006a47304402206f92c4da6651c8959f7aed61608d26b9e46f5c1d69f4fc6e592b1f552b6067f102201c8cc221eac731867d15d483cc83322dba2f14f31d3efb26be937a68ad772394012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffbb3877248c26b23023d7dbb83a5f8293c65c5bff4ac47935a4a31248cefffd91000000006a47304402205bab19ad082a1918e18ccb6462edc263196fb88c8fdfd6bd07a0cf031a4637810220371a621c1bdc6b957db2447a92dcf87b0309653a2db480c9ed623f34a6e6d8a9012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff6415b7356c94609b9a7a7eb06e4c306896767abbc11399779f952fb9ae197059000000006b483045022100e2d038dbb9a873f5a58ec7901d6a7e79f1b404afea3d852056f4d0746cfb821102207fb274947b10d467cd71aa948e9a50f5f4430b661b27afc347efd9d6cc409d9c012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff1aeefdf80ec8a07d657ca64a2c0aa465f58e6284755c9a263c5a807be43b4b81000000006a47304402206e7ff765ba47a8785008f64f49c8e73232d582b2b2d0a49be0880c2557de8f8602206448423a6a37ad9740eb316513b31f73599ae14f65623709fb5443ae609f3e2e012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff3c091681df17b46f280bc9d8011c1bb31397637ce945b393f70380f8cd0a8b0d010000006a47304402206ca8717000f3086d364318f56d52e2369c40b88a1cb86455a8db262b4816698a02206711caf453bfda6b1b3542e27e68c3180f92f0548326d74e30b3ed18cd2c2353012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff91f32d98b581def165495aff6b69530e1f3de7f68fabfeb93730cf9793bbcd2a000000006a47304402200a8cd5e29ee7ff136772ea1789a39a027eaa1cd92f90f9d57fd8cf77202251f402203dd2bc282a838a5730e840a0d22b4f0edbe3cb2da00466c66bc2b5c66fc8b032012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff854d9226c28a1f5fe440e08f41000f3547f304ecf9cc010d0b5bc845ef1f039a000000006b483045022100fe6cce49975cc78af1c394bc02d995710833ba08cf7f8dd5f99add2cc7db26c40220793491309c215d8314a1c142bef7ec6b9a397249bec1c00a0a5ab47dfc1208b6012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff593bc907aa71f3b0f7aa8c48bb5f650595e65a5a733a9601a8374ed978eec9a7000000006a47304402206362ae3c4cf1a19ba0e43424b03af542077b49761172c1ad26d802f54b1b6ca602206bc7edb655bb0024c0e48c1f4c18c8864f8d1ce59ae55cd81dc0bd1234430691012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff3b9da8c5ab0c0cd6b40f602ea6ed8e36a48034b182b9d1a77ffebd15fe203b94000000006b483045022100f8610eae25899663cb5fa9a4575d937da57cdfd41958794bbb4c02f8bed75da40220262d40e019ec3a57b252f4150d509cce6f8a2dbd83184a9fc2ed56aba8018b15012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0897c8a57e15e7f3893b195d65cf6c6001b29c8c9734213d7a3131f57b9eca2e000000006b483045022100c485cbd6408cf0759bcf23c4154249882934b522a93c6b49e62412305bf7646902201cc4b668af4bb22fe57c32c4d34e822bceb12f6bd6923afdabf4894752a56ec3012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffffdc7000f7c45b62960623fa3a277e8a55348a4fe4936fef1224b6953434a249000000006b4830450221008a51a9c26f475d5c0838afe9d51524f95adfb21a9b0a02eae31cb01dc0a31fab022071c5492fbc7270731d4a4947a69398bf99dd28c65bb69d19910bf53a515274c8012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff10ec2af7e31ca28e27177215904d9a59abf80f0652b24e3f749f14fb7b2264ec000000006b483045022100fe4269f8f5ca53ebcff6fb782142a6228f0e50498a531b7a9c0d54768af9854102207cc740a9ea359569b49d69a94215ce3e23aeda5779cebc434ad3d608e1752990012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff5e3830c088dd6ea412d778b0a700ef27c183cf03e19f3d6f71bc5eaf53b2c22e000000006b4830450221009788a7e7f2407ba2f7c504091fbdf8f8498367781e8a357616d68e2a6770b4e70220518c92f5fb21e6bfd7d870a783b2a5572ce003f2dbb237ec59df419c9a148966012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff51630ccb0ad32b24cc7ae1b3602950ba518dca6aa65ef560e57f08c23eed8d80000000006a47304402201aa556153ffeb13aa674353bf88c04a7af15c7eb32e1a835464e4b613c31dc2802200395858c29a46e9108de1f90b401ee26c296388b4073143b63f849b2cce461af012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0200e1f5050000000017a914ab802c4d644be63fd1a72834ff63b650d6b5353987bb7e1e00000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac680e135d000000000000000000000000000000"
              },
              "type": "TakerPaymentReceived"
            },
            "timestamp": 1561529998938
          },
          {
            "event": {
              "type": "TakerPaymentWaitConfirmStarted"
            },
            "timestamp": 1561529998941
          },
          {
            "event": {
              "type": "TakerPaymentValidatedAndConfirmed"
            },
            "timestamp": 1561530000859
          },
          {
            "event": {
              "data": {
                "tx_hash": "235f8e7ab3c9515a17fe8ee721ef971bbee273eb90baf70788edda7b73138c86",
                "tx_hex": "0400008085202f8901a5464048246f791dca2f8cef2774125992cba7c0b820f32e7980be1de3380e7e00000000d8483045022100beca668a946fcad98da64cc56fa04edd58b4c239aa1362b4453857cc2e0042c90220606afb6272ef0773185ade247775103e715e85797816fbc204ec5128ac10a4b90120ea774bc94dce44c138920c6e9255e31d5645e60c0b64e9a059ab025f1dd2fdc6004c6b6304692c135db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a914eb78e2f0cf001ed7dc69276afd37b25c4d6bb491882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0118ddf505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac8000135d000000000000000000000000000000"
              },
              "type": "TakerPaymentSpent"
            },
            "timestamp": 1561530003429
          },
          {
            "event": {
              "type": "TakerPaymentSpendConfirmStarted"
            },
            "timestamp": 1561530003430
          },
          {
            "event": {
              "type": "TakerPaymentSpendConfirmed"
            },
            "timestamp": 1561530003522
          },
          {
            "event": {
              "type": "Finished"
            },
            "timestamp": 1561530003525
          }
        ],
        "my_info": {
          "my_amount": "1",
          "my_coin": "BEER",
          "other_amount": "1",
          "other_coin": "PIZZA",
          "started_at": 1561529842
        },
        "maker_coin": "BEER",
        "maker_amount": "1",
        "taker_coin": "PIZZA",
        "taker_amount": "1",
        "gui": null,
        "mm_version": "unknown",
        "success_events": [
          "Started",
          "Negotiated",
          "TakerFeeValidated",
          "MakerPaymentSent",
          "TakerPaymentReceived",
          "TakerPaymentWaitConfirmStarted",
          "TakerPaymentValidatedAndConfirmed",
          "TakerPaymentSpent",
          "TakerPaymentSpendConfirmStarted",
          "TakerPaymentSpendConfirmed",
          "Finished"
        ],
        "type": "Maker",
        "uuid": "6bf6e313-e610-4a9a-ba8c-57fc34a124aa",
        "my_order_uuid": "3447b727-fe93-4357-8e5a-8cf2699b7e86"
      },
      {
        "error_events": ["StartFailed","NegotiateFailed","TakerFeeSendFailed","MakerPaymentValidateFailed","MakerPaymentWaitConfirmFailed","TakerPaymentTransactionFailed","TakerPaymentWaitConfirmFailed","TakerPaymentDataSendFailed","TakerPaymentWaitForSpendFailed","MakerPaymentSpendFailed","TakerPaymentWaitRefundStarted","TakerPaymentRefunded","TakerPaymentRefundFailed"],
        "events": [
          {
            "event": {
              "data": {
                "lock_duration": 31200,
                "maker": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
                "maker_amount": "0.01",
                "maker_coin": "BEER",
                "maker_coin_start_block": 154187,
                "maker_payment_confirmations": 1,
                "maker_payment_wait": 1561492367,
                "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
                "started_at": 1561481967,
                "taker_amount": "0.01",
                "taker_coin": "BCH",
                "taker_coin_start_block": 588576,
                "taker_payment_confirmations": 1,
                "taker_payment_lock": 1561513167,
                "uuid": "491df802-43c3-4c73-85ef-1c4c49315ac6"
              },
              "type": "Started"
            },
            "timestamp": 1561481968393
          },
          {
            "event": {
              "data": {
                "maker_payment_locktime": 1561544367,
                "maker_pubkey": "02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640",
                "secret_hash": "ba5128bcca5a2f7d2310054fb8ec51b80f352ef3"
              },
              "type": "Negotiated"
            },
            "timestamp": 1561482029079
          },
          {
            "event": {
              "data": {
                "tx_hash": "9dd7c0c8124315d7884fb0c7bf8dbfd3f3bd185c62a2ee42dfbc1e3b74f21a0e",
                "tx_hex": "0100000001f1beda7feba9fa5c52aa38027587db50b6428bbbcc053cd4ab17461fb00b89d1000000006a473044022004ad0330210e20dea416c3ff442e50dc59970c5d1a8b4d0a7d5cc61a2edc701602204459e1ee6774f1ba8258322fff72e1e1acddeb7aed2f75657458aa3deecc9465412102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0207050000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac64b61700000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac2d53125d"
              },
              "type": "TakerFeeSent"
            },
            "timestamp": 1561482032294
          },
          {
            "event": {
              "data": {
                "tx_hash": "ba36c890785e3e9d4b853310ad4d79ce8175e7c4184a398128b37339321672f4",
                "tx_hex": "0400008085202f890197f703d245127e5b88471791f2820d29152046f4be133907afa8ac5542911190000000006b48304502210090e1c52aa2eba12b7c71fceab83b77f1456830a3dee1b956a831ecee5b5b353602205353a48c0129eae44b7c06a1f1651b9ceb8642374a1d5224a1e907240a978ad2012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0240420f000000000017a914192f34528c6c8cd11eefebec27f195f3894eb11187f096e605000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac4353125d000000000000000000000000000000"
              },
              "type": "MakerPaymentReceived"
            },
            "timestamp": 1561482073479
          },
          {
            "event": {
              "type": "MakerPaymentWaitConfirmStarted"
            },
            "timestamp": 1561482073482
          },
          {
            "event": {
              "type": "MakerPaymentValidatedAndConfirmed"
            },
            "timestamp": 1561482074296
          },
          {
            "event": {
              "data": {
                "tx_hash": "bc98def88d93c270ae3cdb8a098d1b939ca499bf98f7a22b97be36bca13cdbc7",
                "tx_hex": "01000000010e1af2743b1ebcdf42eea2625c18bdf3d3bf8dbfc7b04f88d7154312c8c0d79d010000006a4730440220030266d6d6435a4772cce2cebd91b6d4afffb920e23e9bc761434f105349cda002202335a050e2f28e4ca28862868141d3d7b553f3d30bceb83724ad70a32d04b0bd412102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0240420f000000000017a9140094798ed4100852f10a9ad85990f19b364f4c2d873c700800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac5a53125d"
              },
              "type": "TakerPaymentSent"
            },
            "timestamp": 1561482078908
          },
          {
            "event": {
              "data": {
                "secret": "66ed6c24bbb4892634eac4ce1e1ad0627d6379da4443b8d656b64d49ef2aa7a3",
                "transaction": {
                  "tx_hash": "eec643315d4495aa5feb5062344fe2474223dc0f231b610afd336f908ae99ebc",
                  "tx_hex": "0100000001c7db3ca1bc36be972ba2f798bf99a49c931b8d098adb3cae70c2938df8de98bc00000000d747304402202e344f8c61f2f49f4d620d687d02448cfba631a8ce8c0f8ee774da177230a75902201f4a175e7fa40f26896f522b5c51c7c0485e0ad18d3221c885e8b96b52ed1cab412066ed6c24bbb4892634eac4ce1e1ad0627d6379da4443b8d656b64d49ef2aa7a3004c6b6304cfcc125db1752102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac6782012088a914ba5128bcca5a2f7d2310054fb8ec51b80f352ef3882102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac68ffffffff01583e0f00000000001976a91464ae8510aac9546d5e7704e31ce177451386455588acfd49125d"
                }
              },
              "type": "TakerPaymentSpent"
            },
            "timestamp": 1561483355081
          },
          {
            "event": {
              "data": {
                "tx_hash": "858f07d0a4e74318497a6e3ff4d7b68b60ad21b5c8e90b9b485f0ddaed71d0dc",
                "tx_hex": "0400008085202f8901f47216323973b32881394a18c4e77581ce794dad1033854b9d3e5e7890c836ba00000000d8483045022100847a65faed4bea33c5cbccff2bee7c1292871a3b130bd2f23e696bd80c07365f02202039ea02b4463afd4f1e2b20b348d64b40aaea165f8dfb483293e2b368d536fe012066ed6c24bbb4892634eac4ce1e1ad0627d6379da4443b8d656b64d49ef2aa7a3004c6b6304af46135db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a914ba5128bcca5a2f7d2310054fb8ec51b80f352ef3882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff01583e0f00000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac4b4a125d000000000000000000000000000000"
              },
              "type": "MakerPaymentSpent"
            },
            "timestamp": 1561483358319
          },
          {
            "event": {
              "type": "Finished"
            },
            "timestamp": 1561483358321
          }
        ],
        "my_info": {
          "my_amount": "0.01",
          "my_coin": "BCH",
          "other_amount": "0.01",
          "other_coin": "BEER",
          "started_at": 1561481967
        },
        "maker_coin": "BEER",
        "maker_amount": "0.01",
        "taker_coin": "BCH",
        "taker_amount": "0.01",
        "gui": null,
        "mm_version": "unknown",
        "success_events": [
          "Started",
          "Negotiated",
          "TakerFeeSent",
          "MakerPaymentReceived",
          "MakerPaymentWaitConfirmStarted",
          "MakerPaymentValidatedAndConfirmed",
          "TakerPaymentSent",
          "TakerPaymentSpent",
          "MakerPaymentSpent",
          "Finished"
        ],
        "type": "Taker",
        "uuid": "491df802-43c3-4c73-85ef-1c4c49315ac6"
      }
    ]
  }
}
```

Response (error)

```json
{
  "error": "lp_swap:1454] from_uuid e299c6ece7a7ddc42444eda64d46b163eaa992da65ce6de24eb812d715184e41 swap is not found"
}
```

</collapse-text>

</div>

## my\_swap\_status

**uuid**

The `my_swap_status` method returns the data of an atomic swap executed on an AtomicDEX API node.

#### Arguments

| Structure   | Type   | Description                                                 |
| ----------- | ------ | ----------------------------------------------------------- |
| params uuid | string | the uuid of swap, typically received from the buy/sell call |

#### Response

| Structure      | Type                       | Description                                                                                                                                                                                                                                                                    |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| events         | array of objects           | the events that occurred during the swap                                                                                                                                                                                                                                       |
| events.type    | string                     | an event type; the list of event types with their data structure is available below                                                                                                                                                                                            |
| events.data    | object                     | additional data of the event; the list of events with their data structure is available below                                                                                                                                                                                  |
| success_events | array of strings           | a list of events that gained a `success` swap state; the contents are listed in the order in which they should occur in the `events` array                                                                                                                                     |
| error_events   | array of strings           | a list of events that fell into an `error` swap state; if at least 1 of the events happens, the swap is considered a failure                                                                                                                                                   |
| type           | string                     | whether the node acted as a market `Maker` or `Taker`                                                                                                                                                                                                                          |
| uuid           | string                     | swap uuid                                                                                                                                                                                                                                                                      |
| gui            | string (optional)          | information about gui; copied from AtomicDEX API configuration (MM2.json)                                                                                                                                                                                                                        |
| mm_version     | string (optional)          | AtomicDEX API version                                                                                                                                                                                                                                                                    |
| maker_coin     | string (optional)          | ticker of maker coin                                                                                                                                                                                                                                                           |
| taker_coin     | string (optional)          | ticker of taker coin                                                                                                                                                                                                                                                           |
| maker_amount   | string (numeric, optional) | the amount of coins to be swapped by maker                                                                                                                                                                                                                                     |
| taker_amount   | string (numeric, optional) | the amount of coins to be swapped by taker                                                                                                                                                                                                                                     |
| my_info        | object (optional)          | this object maps event data to make displaying swap data in a GUI simpler (`my_coin`, `my_amount`, etc.)                                                                                                                                                                       |
| recoverable    | bool                       | whether the swap can be recovered using the `recover_funds_of_swap` API command. Important note: The AtomicDEX API does not record the state regarding whether the swap was recovered or not. The AtomicDEX API allows as many calls to the `recover_funds_of_swap` method as necessary, in case of errors |
| my_order_uuid  | string (uuid, optional)    | the uuid of order that matched to start the swap                                                                                                                                                                                                                               |

#### Maker Swap Events

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="">

##### Started

The `Started` event indicates that mandatory pre-checks passed, such as "available balance," and that the swap started successfully.  

The swap goes to the negotiation stage after this event occurs.

| Structure                   | Type                              | Description                                                                                                                                                                                                                     |
| --------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taker_coin                  | string                            | the ticker of the taker coin                                                                                                                                                                                                    |
| maker_coin                  | string                            | the ticker of the maker coin                                                                                                                                                                                                    |
| taker                       | string (hexadecimal)              | the p2p ID of taker node                                                                                                                                                                                                        |
| secret                      | string (hexadecimal)              | a random secret, the hash of which is used to lock atomic-swap payments                                                                                                                                                         |
| secret_hash                 | string (hexadecimal)              | the hash of the swap secret                                                                                                                                                                                                     |
| my_persistent_pub           | string (hexadecimal)              | a persistent secp256k1 public key of maker node                                                                                                                                                                                 |
| lock_duration               | number (integer)                  | the lock duration of swap payments in seconds. The sender can refund the transaction when the lock duration is passed. The taker payment is locked for the lock duration. The maker payment is locked for lock duration * 2     |
| maker_amount                | string (numeric)                  | the amount of coins to be swapped by maker                                                                                                                                                                                      |
| taker_amount                | string (numeric)                  | the amount of coins to be swapped by taker                                                                                                                                                                                      |
| maker_payment_confirmations | number (integer)                  | the required number of blockchain confirmations for maker payment                                                                                                                                                               |
| maker_payment_requires_nota | bool                              | whether dPoW notarization is required for maker payment; can be null; available since `beta-2.0.1738`                                                                                                                           |
| taker_payment_confirmations | number (integer)                  | the required number of blockchain confirmations for taker payment                                                                                                                                                               |
| taker_payment_requires_nota | bool                              | whether dPoW notarization is required for taker payment; can be null; available since `beta-2.0.1738`                                                                                                                           |
| maker_payment_lock          | number (UTC timestamp in seconds) | the maker payment is locked until this timestamp                                                                                                                                                                                |
| uuid                        | string                            | the swap uuid                                                                                                                                                                                                                   |
| started_at                  | number (UTC timestamp in seconds) | the timestamp at the start of the swap                                                                                                                                                                                          |
| maker_coin_start_block      | number (integer)                  | the maker coin block number at the start of the swap                                                                                                                                                                            |
| taker_coin_start_block      | number (integer)                  | the taker coin block number at the start of the swap                                                                                                                                                                            |

##### StartFailed

The `StartFailed` event indicates that some of the pre-checks did not pass, and therefore the swap did not start.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### Negotiated

The `Negotiated` event indicates that maker has received and validated swap negotiation data from taker.

Maker starts waiting for taker to send the dex fee after this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| taker_payment_locktime | number (UTC timestamp in seconds) | the taker payment is locked until this timestamp        |
| taker_pubkey           | string (hexadecimal)              | a persistent secp256k1 public key of taker node         |

##### NegotiateFailed

The `NegotiateFailed` event indicates that taker negotiation data was not received or did not pass validation.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerFeeValidated

The `TakerFeeValidated` event indicates that maker received and validated dex fee data from taker.  

Maker sends their payment after this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### TakerFeeValidateFailed

The `TakerFeeValidateFailed` event indicates that taker dex fee data was not received or did not pass validation.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentTransactionFailed

The `MakerPaymentTransactionFailed` event indicates that maker was not able to broadcast his payment transaction to maker coin blockchain.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentSent

The `MakerPaymentSent` event indicates that maker has broadcast the maker payment transaction.  

Maker starts waiting for taker to send his payment after this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### MakerPaymentDataSendFailed

The `MakerPaymentDataSendFailed` event indicates that maker was not able to send his payment data to taker due to a network error.
When this event occurs, maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentWaitConfirmFailed

The `MakerPaymentWaitConfirmFailed` event indicates that maker payment transaction did not reach the required number of confirmations before the internal timeout expiration.

When this event occurs maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentReceived

The `TakerPaymentReceived` event indicates that maker received the taker payment transaction data.  

Maker starts waiting for taker payment confirmation after this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### TakerPaymentWaitConfirmStarted

The `TakerPaymentReceived` event indicates that maker started waiting for taker payment confirmation.  

This event does not have additional data.

##### TakerPaymentValidateFailed

The `TakerPaymentValidateFailed` event indicates that taker payment did not pass validation. For example, taker payment may have an invalid amount or the payment might be locked with a non-matching hash or timestamp.

When this event occurs maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentWaitConfirmFailed

The `MakerPaymentWaitConfirmFailed` event indicates that the taker payment transaction did not reach the required number of confirmations before the internal timeout expiration.

When this event occurs maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentValidatedAndConfirmed

The `TakerPaymentValidatedAndConfirmed` event indicates that maker validated taker payment and payment was confirmed the required number of times.  

Maker attempts to spend the taker payment after this event occurs.

This event does not have additional data.

##### TakerPaymentSpendFailed

The `TakerPaymentSpendFailed` event indicates that maker payment was not able to spend taker payment.

When this event occurs maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentSpent

The `TakerPaymentSpent` event indicates that maker has broadcast the **taker payment spend** transaction.  

Maker starts waiting for **taker payment spend** confirmation after this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### TakerPaymentSpendConfirmStarted

The `TakerPaymentSpendConfirmStarted` event indicates that maker started waiting for **taker payment spend** transaction confirmation.  

This event does not have additional data.

##### TakerPaymentSpendConfirmFailed

The `TakerPaymentSpendConfirmFailed` event indicates that the **taker payment spend** transaction did not reach the required number of confirmations before the **maker payment lock time expiration** or the **taker payment spend** transaction rejected for some reason.

Maker attempts to refund the maker payment.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentSpendConfirmed

The `TakerPaymentSpendConfirmed` event indicates that the taker payment spend transaction was confirmed the required number of times.

The swap finishes immediately when this event occurs.

This event does not have additional data.

##### MakerPaymentWaitRefundStarted

The `MakerPaymentWaitRefundStarted` event indicates that maker started waiting for lock time expiration to refund the payment.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| wait_until             | number (UTC timestamp)            | the timestamp at which a refund will occur              |

##### MakerPaymentRefundFailed

The `MakerPaymentRefundFailed` event indicates that maker was not able to broadcast a refund transaction to the maker coin blockchain.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentRefunded

The `MakerPaymentRefunded` event indicates that maker has broadcast the maker payment refund transaction.  

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### Finished

The `Finished` event indicates that the swap finished.  

This event does not have additional data.

</collapse-text>

</div>

#### Taker Swap Events

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="">

##### Started

The `Started` event indicates that mandatory pre-checks, such as "available balance," passed and the swap started successfully.  

The swap goes to negotiation stage after this event occurs.

| Structure                   | Type                              | Description                                                                                                                                                                                                                  |
| --------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taker_coin                  | string                            | the ticker of taker coin                                                                                                                                                                                                     |
| maker_coin                  | string                            | the ticker of maker coin                                                                                                                                                                                                     |
| maker                       | string (hexadecimal)              | the p2p ID of maker node                                                                                                                                                                                                     |
| my_persistent_pub           | string (hexadecimal)              | a persistent secp256k1 public key of taker node                                                                                                                                                                              |
| lock_duration               | number (integer)                  | the lock duration of swap payments in seconds. The sender can refund the transaction when the lock duration is passed. The taker payment is locked for the lock duration. The maker payment is locked for lock duration * 2  |
| maker_amount                | string (numeric)                  | the amount of coins to be swapped by maker                                                                                                                                                                                   |
| taker_amount                | string (numeric)                  | the amount of coins to be swapped by taker                                                                                                                                                                                   |
| maker_payment_confirmations | number (integer)                  | the required number of blockchain confirmations for maker payment                                                                                                                                                            |
| maker_payment_requires_nota | bool                              | whether dPoW notarization is required for maker payment; can be null; available since `beta-2.0.1738`                                                                                                                        |
| taker_payment_confirmations | number (integer)                  | the required number of blockchain confirmations for taker payment                                                                                                                                                            |
| taker_payment_requires_nota | bool                              | whether dPoW notarization is required for taker payment; can be null; available since `beta-2.0.1738`                                                                                                                        |
| taker_payment_lock          | number (UTC timestamp in seconds) | the taker payment is locked until this timestamp                                                                                                                                                                             |
| uuid                        | string                            | the swap uuid                                                                                                                                                                                                                |
| started_at                  | number (UTC timestamp in seconds) | the timestamp at the start of the swap                                                                                                                                                                                       |
| maker_payment_wait          | number (UTC timestamp in seconds) | taker will wait for maker payment confirmation until this timestamp                                                                                                                                                          |
| maker_coin_start_block      | number (integer)                  | the maker coin block number at the start of the swap                                                                                                                                                                         |
| taker_coin_start_block      | number (integer)                  | the taker coin block number at the start of the swap                                                                                                                                                                         |

##### StartFailed

The `StartFailed` event indicates that some of the pre-checks did not pass, and therefore the swap did not start.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### Negotiated

The `Negotiated` event indicates that taker has received and validated swap negotiation data from maker.

Taker sends dex fee after this event occurs.

| Structure              | Type                              | Description                                                       |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------- |
| maker_payment_locktime | number (UTC timestamp in seconds) | the maker payment is locked until this timestamp                  |
| maker_pubkey           | string (hexadecimal)              | a persistent secp256k1 public key of maker node                   |
| secret_hash            | string (hexadecimal)              | the swap payments are expected to be locked with this secret hash |

##### NegotiateFailed

The `NegotiateFailed` event indicates that maker negotiation data was not received or did not pass validation.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerFeeSent

The `TakerFeeSent` event indicates that taker broadcast the dex fee transaction.  

Taker starts waiting for maker payment after this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### TakerFeeSendFailed

The `TakerFeeSendFailed` event indicates that the taker dex fee transaction failed to broadcast to the taker coin blockchain, or that the taker failed to send the transaction data to maker.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentValidateFailed

The `MakerPaymentValidateFailed` event indicates that taker was not able to receive or validate the maker payment transaction.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentReceived

The `MakerPaymentReceived` event indicates that taker received the maker payment transaction data.  

Taker starts waiting for transaction confirmation after this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### MakerPaymentWaitConfirmStarted

The `MakerPaymentWaitConfirmStarted` event indicates that taker started waiting for maker payment confirmation.  

This event does not have additional data.

##### MakerPaymentWaitConfirmFailed

The `MakerPaymentWaitConfirmFailed` event indicates that the maker payment transaction did not reach the required number of confirmations before the internal timeout expiration.

Taker swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentValidatedAndConfirmed

The `MakerPaymentValidatedAndConfirmed` event indicates that taker validated maker payment and the payment was confirmed the required number of times.  

Taker sends his payment after this event occurs.

This event does not have additional data.

##### TakerPaymentSent

The `TakerPaymentSent` event indicates that taker broadcast taker payment transaction to taker coin blockchain.  

Taker starts waiting for maker to spend this transaction.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### TakerPaymentTransactionFailed

The `TakerPaymentTransactionFailed` event indicates that taker failed to broadcast transaction to taker coin blockchain.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentWaitConfirmFailed

The `TakerPaymentWaitConfirmFailed` event indicates that the taker payment transaction did not reach the required number of confirmations before the internal timeout expiration.

When this event occurs taker starts waiting for taker payment lock time expiration to issue a refund.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentDataSendFailed

The `TakerPaymentDataSendFailed` event indicates that taker was not able to send his payment data to maker due to a network error.

When this event occurs taker starts waiting for taker payment lock time expiration to issue a refund.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentSpent

The `TakerPaymentSpent` event indicates that maker spent taker payment and taker discovered the transaction.

When this event occurs taker extracts the secret from the transaction and attempts to spend maker payment.

| Structure              | Type                              | Description                                                |
| ---------------------- | --------------------------------- | ---------------------------------------------------------- |
| secret                 | string                            | the atomic swap secret extracted from spending transaction |
| transaction            | object                            | transaction object                                         |
| transaction.tx_hash    | string                            | the hash of the transaction                                |
| transaction.tx_hex     | string                            | transaction bytes in hexadecimal format                    |

##### TakerPaymentWaitForSpendFailed

The `TakerPaymentWaitForSpendFailed` event indicates that maker did not spend taker payment before lock time expiration.

When this event occurs taker attempts to refund the payment.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentSpendFailed

The `MakerPaymentSpendFailed` event indicates that taker failed to broadcast **maker payment spend** transaction to the maker coin blockchain.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### MakerPaymentSpent

The `MakerPaymentSpent` event indicates that taker spent maker payment.

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### TakerPaymentWaitRefundStarted

`TakerPaymentWaitRefundStarted` event indicates that taker started waiting for lock time expiration to refund the payment.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| wait_until             | number (UTC timestamp)            | the timestamp at which a refund will occur              |

##### TakerPaymentRefundFailed

`TakerPaymentRefundFailed` event indicates that taker was not able to broadcast a refund transaction to taker coin blockchain.
The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| error                  | string                            | error description with stack trace                      |

##### TakerPaymentRefunded

The `TakerPaymentRefunded` event indicates that taker broadcast the taker payment refund transaction.  

The swap finishes immediately when this event occurs.

| Structure              | Type                              | Description                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| tx_hash                | string                            | the hash of the transaction                             |
| tx_hex                 | string                            | transaction bytes in hexadecimal format                 |

##### Finished

The `Finished` event indicates that the swap finished.  

This event does not have additional data.

</collapse-text>

</div>

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"my_swap_status\",\"params\":{\"uuid\":\"d14452bb-e82d-44a0-86b0-10d4cdcb8b24\"},\"userpass\":\"$userpass\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Successful Taker Swap

```json
{
  "result": {
    "error_events": ["StartFailed","NegotiateFailed","TakerFeeSendFailed","MakerPaymentValidateFailed","MakerPaymentWaitConfirmFailed","TakerPaymentTransactionFailed","TakerPaymentWaitConfirmFailed","TakerPaymentDataSendFailed","TakerPaymentWaitForSpendFailed","MakerPaymentSpendFailed","TakerPaymentWaitRefundStarted","TakerPaymentRefunded","TakerPaymentRefundFailed"],
    "events": [
      {
        "event": {
          "data": {
            "lock_duration": 31200,
            "maker": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
            "maker_amount": "0.01",
            "maker_coin": "BEER",
            "maker_coin_start_block": 154187,
            "maker_payment_confirmations": 1,
            "maker_payment_requires_nota": null,
            "maker_payment_wait": 1561492367,
            "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
            "started_at": 1561481967,
            "taker_amount": "0.01",
            "taker_coin": "BCH",
            "taker_coin_start_block": 588576,
            "taker_payment_confirmations": 1,
            "taker_payment_requires_nota": null,
            "taker_payment_lock": 1561513167,
            "uuid": "491df802-43c3-4c73-85ef-1c4c49315ac6"
          },
          "type": "Started"
        },
        "timestamp": 1561481968393
      },
      {
        "event": {
          "data": {
            "maker_payment_locktime": 1561544367,
            "maker_pubkey": "02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640",
            "secret_hash": "ba5128bcca5a2f7d2310054fb8ec51b80f352ef3"
          },
          "type": "Negotiated"
        },
        "timestamp": 1561482029079
      },
      {
        "event": {
          "data": {
            "tx_hash": "9dd7c0c8124315d7884fb0c7bf8dbfd3f3bd185c62a2ee42dfbc1e3b74f21a0e",
            "tx_hex": "0100000001f1beda7feba9fa5c52aa38027587db50b6428bbbcc053cd4ab17461fb00b89d1000000006a473044022004ad0330210e20dea416c3ff442e50dc59970c5d1a8b4d0a7d5cc61a2edc701602204459e1ee6774f1ba8258322fff72e1e1acddeb7aed2f75657458aa3deecc9465412102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0207050000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac64b61700000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac2d53125d"
          },
          "type": "TakerFeeSent"
        },
        "timestamp": 1561482032294
      },
      {
        "event": {
          "data": {
            "tx_hash": "ba36c890785e3e9d4b853310ad4d79ce8175e7c4184a398128b37339321672f4",
            "tx_hex": "0400008085202f890197f703d245127e5b88471791f2820d29152046f4be133907afa8ac5542911190000000006b48304502210090e1c52aa2eba12b7c71fceab83b77f1456830a3dee1b956a831ecee5b5b353602205353a48c0129eae44b7c06a1f1651b9ceb8642374a1d5224a1e907240a978ad2012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0240420f000000000017a914192f34528c6c8cd11eefebec27f195f3894eb11187f096e605000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac4353125d000000000000000000000000000000"
          },
          "type": "MakerPaymentReceived"
        },
        "timestamp": 1561482073479
      },
      {
        "event": {
          "type": "MakerPaymentWaitConfirmStarted"
        },
        "timestamp": 1561482073482
      },
      {
        "event": {
          "type": "MakerPaymentValidatedAndConfirmed"
        },
        "timestamp": 1561482074296
      },
      {
        "event": {
          "data": {
            "tx_hash": "bc98def88d93c270ae3cdb8a098d1b939ca499bf98f7a22b97be36bca13cdbc7",
            "tx_hex": "01000000010e1af2743b1ebcdf42eea2625c18bdf3d3bf8dbfc7b04f88d7154312c8c0d79d010000006a4730440220030266d6d6435a4772cce2cebd91b6d4afffb920e23e9bc761434f105349cda002202335a050e2f28e4ca28862868141d3d7b553f3d30bceb83724ad70a32d04b0bd412102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0240420f000000000017a9140094798ed4100852f10a9ad85990f19b364f4c2d873c700800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac5a53125d"
          },
          "type": "TakerPaymentSent"
        },
        "timestamp": 1561482078908
      },
      {
        "event": {
          "data": {
            "secret": "66ed6c24bbb4892634eac4ce1e1ad0627d6379da4443b8d656b64d49ef2aa7a3",
            "transaction": {
              "tx_hash": "eec643315d4495aa5feb5062344fe2474223dc0f231b610afd336f908ae99ebc",
              "tx_hex": "0100000001c7db3ca1bc36be972ba2f798bf99a49c931b8d098adb3cae70c2938df8de98bc00000000d747304402202e344f8c61f2f49f4d620d687d02448cfba631a8ce8c0f8ee774da177230a75902201f4a175e7fa40f26896f522b5c51c7c0485e0ad18d3221c885e8b96b52ed1cab412066ed6c24bbb4892634eac4ce1e1ad0627d6379da4443b8d656b64d49ef2aa7a3004c6b6304cfcc125db1752102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac6782012088a914ba5128bcca5a2f7d2310054fb8ec51b80f352ef3882102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac68ffffffff01583e0f00000000001976a91464ae8510aac9546d5e7704e31ce177451386455588acfd49125d"
            }
          },
          "type": "TakerPaymentSpent"
        },
        "timestamp": 1561483355081
      },
      {
        "event": {
          "data": {
            "tx_hash": "858f07d0a4e74318497a6e3ff4d7b68b60ad21b5c8e90b9b485f0ddaed71d0dc",
            "tx_hex": "0400008085202f8901f47216323973b32881394a18c4e77581ce794dad1033854b9d3e5e7890c836ba00000000d8483045022100847a65faed4bea33c5cbccff2bee7c1292871a3b130bd2f23e696bd80c07365f02202039ea02b4463afd4f1e2b20b348d64b40aaea165f8dfb483293e2b368d536fe012066ed6c24bbb4892634eac4ce1e1ad0627d6379da4443b8d656b64d49ef2aa7a3004c6b6304af46135db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a914ba5128bcca5a2f7d2310054fb8ec51b80f352ef3882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff01583e0f00000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac4b4a125d000000000000000000000000000000"
          },
          "type": "MakerPaymentSpent"
        },
        "timestamp": 1561483358319
      },
      {
        "event": {
          "type": "Finished"
        },
        "timestamp": 1561483358321
      }
    ],
    "my_info": {
      "my_amount": "0.01",
      "my_coin": "BCH",
      "other_amount": "0.01",
      "other_coin": "BEER",
      "started_at": 1561481967
    },
    "maker_coin": "BEER",
    "maker_amount": "0.01",
    "taker_coin": "BCH",
    "taker_amount": "0.01",
    "gui": null,
    "mm_version": "unknown",
    "recoverable": false,
    "success_events": [
      "Started",
      "Negotiated",
      "TakerFeeSent",
      "MakerPaymentReceived",
      "MakerPaymentWaitConfirmStarted",
      "MakerPaymentValidatedAndConfirmed",
      "TakerPaymentSent",
      "TakerPaymentSpent",
      "MakerPaymentSpent",
      "Finished"
    ],
    "type": "Taker",
    "uuid": "491df802-43c3-4c73-85ef-1c4c49315ac6"
  }
}
```

#### Taker Swap Failed with MakerPaymentSpendFailed Event

```json
{
  "error_events": ["StartFailed","NegotiateFailed","TakerFeeSendFailed","MakerPaymentValidateFailed","MakerPaymentWaitConfirmFailed","TakerPaymentTransactionFailed","TakerPaymentWaitConfirmFailed","TakerPaymentDataSendFailed","TakerPaymentWaitForSpendFailed","MakerPaymentSpendFailed","TakerPaymentWaitRefundStarted","TakerPaymentRefunded","TakerPaymentRefundFailed"],
  "events": [
    {
      "event": {
        "data": {
          "lock_duration": 7800,
          "maker": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
          "maker_amount": "0.12596566232185483",
          "maker_coin": "KMD",
          "maker_coin_start_block": 1458035,
          "maker_payment_confirmations": 1,
          "maker_payment_wait": 1564053079,
          "my_persistent_pub": "0326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0a",
          "started_at": 1564050479,
          "taker_amount": "50.000000000000001504212457800000",
          "taker_coin": "DOGE",
          "taker_coin_start_block": 2823448,
          "taker_payment_confirmations": 1,
          "taker_payment_lock": 1564058279,
          "uuid": "41383f43-46a5-478c-9386-3b2cce0aca20"
        },
        "type": "Started"
      },
      "timestamp": 1564050480269
    },
    {
      "event": {
        "data": {
          "maker_payment_locktime": 1564066080,
          "maker_pubkey": "031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
          "secret_hash": "3669eb83a007a3c507448d79f45a9f06ec2f36a8"
        },
        "type": "Negotiated"
      },
      "timestamp": 1564050540991
    },
    {
      "event": {
        "data": {
          "tx_hash": "bdde828b492d6d1cc25cd2322fd592dafd722fcc7d8b0fedce4d3bb4a1a8c8ff",
          "tx_hex": "0100000002c7efa995c8b7be0a8b6c2d526c6c444c1634d65584e9ee89904e9d8675eac88c010000006a473044022051f34d5e3b7d0b9098d5e35333f3550f9cb9e57df83d5e4635b7a8d2986d6d5602200288c98da05de6950e01229a637110a1800ba643e75cfec59d4eb1021ad9b40801210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0affffffffae6c233989efa7c7d2aa6534adc96078917ff395b7f09f734a147b2f44ade164000000006a4730440220393a784c2da74d0e2a28ec4f7df6c8f9d8b2af6ae6957f1e68346d744223a8fd02201b7a96954ac06815a43a6c7668d829ae9cbb5de76fa77189ddfd9e3038df662c01210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0affffffff02115f5800000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac41a84641020000001976a914444f0e1099709ba4d742454a7d98a5c9c162ceab88ac6d84395d"
        },
        "type": "TakerFeeSent"
      },
      "timestamp": 1564050545296
    },
    {
      "event": {
        "data": {
          "tx_hash": "0a0f11fa82802c2c30862c50ab2162185dae8de7f7235f32c506f814c142b382",
          "tx_hex": "0400008085202f8902ace337db2dd4c56b0697f58fb8cfb6bd1cd6f469d925fc0376d1dcfb7581bf82000000006b483045022100d1f95be235c5c8880f5d703ace287e2768548792c58c5dbd27f5578881b30ea70220030596106e21c7e0057ee0dab283f9a1fe273f15208cba80870c447bd559ef0d0121031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ffffffff9f339752567c404427fd77f2b35cecdb4c21489edc64e25e729fdb281785e423000000006a47304402203179e95877dbc107123a417f1e648e3ff13d384890f1e4a67b6dd5087235152e0220102a8ab799fadb26b5d89ceb9c7bc721a7e0c2a0d0d7e46bbe0cf3d130010d430121031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ffffffff025635c0000000000017a91480a95d366d65e34a465ab17b0c9eb1d5a33bae08876cbfce05000000001976a914c3f710deb7320b0efa6edb14e3ebeeb9155fa90d88ac8d7c395d000000000000000000000000000000"
        },
        "type": "MakerPaymentReceived"
      },
      "timestamp": 1564050588176
    },
    {
      "event": {
        "type": "MakerPaymentWaitConfirmStarted"
      },
      "timestamp": 1564050588178
    },
    {
      "event": {
        "type": "MakerPaymentValidatedAndConfirmed"
      },
      "timestamp": 1564050693585
    },
    {
      "event": {
        "data": {
          "tx_hash": "539cb6dbdc25465bbccc575554f05d1bb04c70efce4316e41194e747375c3659",
          "tx_hex": "0100000001ffc8a8a1b43b4dceed0f8b7dcc2f72fdda92d52f32d25cc21c6d2d498b82debd010000006a47304402203967b7f9f5532fa47116585c7d1bcba51861ea2059cca00409f34660db18e33a0220640991911852533a12fdfeb039fb9c8ca2c45482c6993bd84636af3670d49c1501210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0affffffff0200f2052a0100000017a914f2fa08ae416b576779ae5da975e5442663215fce87415173f9000000001976a914444f0e1099709ba4d742454a7d98a5c9c162ceab88ac0585395d"
        },
        "type": "TakerPaymentSent"
      },
      "timestamp": 1564050695611
    },
    {
      "event": {
        "data": {
          "secret": "1b8886b8a2cdb62505699400b694ac20f04d7bd4abd80e1ab154aa8d861fc093",
          "transaction": {
            "tx_hash": "cc5af1cf68d246419fee49c3d74c0cd173599d115b86efe274368a614951bc47",
            "tx_hex": "010000000159365c3747e79411e41643ceef704cb01b5df0545557ccbc5b4625dcdbb69c5300000000d747304402200e78e27d2f1c18676f98ca3dfa4e4a9eeaa8209b55f57b4dd5d9e1abdf034cfa0220623b5c22b62234cec230342aa306c497e43494b44ec2425b84e236b1bf01257001201b8886b8a2cdb62505699400b694ac20f04d7bd4abd80e1ab154aa8d861fc093004c6b6304a7a2395db175210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0aac6782012088a9143669eb83a007a3c507448d79f45a9f06ec2f36a88821031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ac68ffffffff01008d380c010000001976a914c3f710deb7320b0efa6edb14e3ebeeb9155fa90d88ac8c77395d"
          }
        },
        "type": "TakerPaymentSpent"
      },
      "timestamp": 1564051092890
    },
    {
      "event": {
        "data": {
          "error": "lp_swap:1981] utxo:891] rpc_clients:738] JsonRpcError { request: JsonRpcRequest { jsonrpc: \"2.0\", id: \"67\", method: \"blockchain.transaction.broadcast\", params: [String(\"0400008085202f890182b342c114f806c5325f23f7e78dae5d186221ab502c86302c2c8082fa110f0a00000000d7473044022035791ea5548f87484065c9e1f0bdca9ebc699f2c7f51182c84f360102e32dc3d02200612ed53bca52d9c2568437f087598531534badf26229fe0f652ea72ddf03ca501201b8886b8a2cdb62505699400b694ac20f04d7bd4abd80e1ab154aa8d861fc093004c6b630420c1395db17521031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ac6782012088a9143669eb83a007a3c507448d79f45a9f06ec2f36a888210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0aac68ffffffff01460ec000000000001976a914444f0e1099709ba4d742454a7d98a5c9c162ceab88ac967e395d000000000000000000000000000000\")] }, error: Transport(\"rpc_clients:668] All electrums are currently disconnected\") }"
        },
        "type": "MakerPaymentSpendFailed"
      },
      "timestamp": 1564051092897
    },
    {
      "event": {
        "type": "Finished"
      },
      "timestamp": 1564051092900
    }
  ],
  "success_events": [
    "Started",
    "Negotiated",
    "TakerFeeSent",
    "MakerPaymentReceived",
    "MakerPaymentWaitConfirmStarted",
    "MakerPaymentValidatedAndConfirmed",
    "TakerPaymentSent",
    "TakerPaymentSpent",
    "MakerPaymentSpent",
    "Finished"
  ],
  "uuid": "41383f43-46a5-478c-9386-3b2cce0aca20"
}
```

#### Successful Maker Swap

```json
{
  "result": {
    "error_events": ["StartFailed","NegotiateFailed","TakerFeeValidateFailed","MakerPaymentTransactionFailed","MakerPaymentDataSendFailed","MakerPaymentWaitConfirmFailed","TakerPaymentValidateFailed","TakerPaymentWaitConfirmFailed","TakerPaymentSpendFailed","TakerPaymentSpendConfirmFailed","MakerPaymentWaitRefundStarted","MakerPaymentRefunded","MakerPaymentRefundFailed"],
    "events": [
      {
        "event": {
          "data": {
            "lock_duration": 7800,
            "maker_amount": "1",
            "maker_coin": "BEER",
            "maker_coin_start_block": 154221,
            "maker_payment_confirmations": 1,
            "maker_payment_lock": 1561545442,
            "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
            "secret": "ea774bc94dce44c138920c6e9255e31d5645e60c0b64e9a059ab025f1dd2fdc6",
            "started_at": 1561529842,
            "taker": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
            "taker_amount": "1",
            "taker_coin": "PIZZA",
            "taker_coin_start_block": 141363,
            "taker_payment_confirmations": 1,
            "uuid": "6bf6e313-e610-4a9a-ba8c-57fc34a124aa"
          },
          "type": "Started"
        },
        "timestamp": 1561529842866
      },
      {
        "event": {
          "data": {
            "taker_payment_locktime": 1561537641,
            "taker_pubkey": "02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640"
          },
          "type": "Negotiated"
        },
        "timestamp": 1561529883208
      },
      {
        "event": {
          "data": {
            "tx_hash": "a91469546211cc910fbe4a1f4668ab0353765d3d0cb03f4a67bff9326991f682",
            "tx_hex": "0400008085202f89021c7eeec33f8eb5ff2ed6c3d09e40e04b05a9674ea2feefcc12de3f9dcc16aff8000000006b483045022100e18e3d1afa8a24ecec82c92bfc05c119bfacdbb71b5f5663a4b96cc2a41ab269022017a79a1a1f6e0220d8fa1d2cf3b1c9788272f1ad18e4987b8f1cd4418acaa5b0012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff6a0d321eb52c3c7165adf80f83b15b7a5caa3a0dfa87746239021600d47fb43e000000006b483045022100937ed900e084d57d5e3341499fc66c5574884ca71cd4331fa696c8b7a517591b02201f5f851f94c3ca0ffb4789f1af22cb95dc83564e127ed7d23f1129eb2b981a2f012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac9c120100000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac2f0e135d000000000000000000000000000000"
          },
          "type": "TakerFeeValidated"
        },
        "timestamp": 1561529927879
      },
      {
        "event": {
          "data": {
            "tx_hash": "efa90a2918e6793c8a2725c06ee34d0fa76c43bc85e680be195414e7aee36154",
            "tx_hex": "0400008085202f890cdcd071edda0d5f489b0be9c8b521ad608bb6d7f43f6e7a491843e7a4d0078f85000000006b483045022100fbc3bd09f8e1821ed671d1b1d2ed355833fb42c0bc435fef2da5c5b0a980b9a002204ef92b35576069d640ca0ac08f46645e5ade36afd5f19fb6aad19cfc9fb221fb012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffe6ae2a3ce221a6612d9e640bdbe10a2e477b3bc68a1aeee4a6784cb18648a785010000006a47304402202000a7e60ae2ce1529247875623ef2c5b42448dcaeac8de0f8f0e2f8e5bd8a6b0220426321a004b793172014f522efbca77a3dc92e86ce0a75330d8ceb83072ad4e7012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff9335553edcbac9559cae517a3e25b880a48fabf661c4ac338394972eef4572da000000006b4830450221008ded7230f2fb37a42b94f96174ec192baf4cd9e9e68fb9b6cf0463a36a6093e00220538de51ceda1617f3964a2350802377940fdfa018cc1043d77c66081b1cab0c4012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3fffffffff91b5d3733877f84108de77fec46bee156766e1a6837fa7b580ccbc3905acb14000000006b483045022100d07cf1fd20e07aafdc942ba56f6b45baee61b93145a2bdba391e2cdb8024bf15022056ea8183990703ef05018df2fe8bd5ec678ec0f9207b0283292b2cdafc5e1e0c012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff147870387ca938b2b6e7daa96ba2496014f125c0e4e576273ef36ee8186c415a000000006a47304402204c5b15b641d7e34444456d2ea6663bdc8bd8216e309a7220814474f346b8425e0220634d1dd943b416b7a807704d7f7a3d46a60d88ef4e20734588a0b302c55fa82d012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffd2b954ae9b4a61fad9f7bc956d24e38d7b6fe313da824bd3bd91287d5a6b49d9000000006b483045022100a7387d9ab7b2c92d3cbce525e96ffac5ae3ef14f848661741ada0db17715c4a002202c1417d5e3e04b1a2d1774a83bb8d5aa1c0536c100138123089fa69921b5d976012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff28792a2e26d9d7be0467fac52b12ece67410b23eea845008257979bd87d083e3000000006a473044022027c40517c33cd3202d4310cfd2c75f38e6d7804b255fc3838a32ea26e5a3cb0002202b4399e1d7e655b64f699318f2bfbdced49f064ee54e9d6a678668fce51caf96012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffa8bf797bacd213b74a9977ae1b956afe3af33a1ee94324e010a16db891a07441000000006a473044022004cbb1d970b9f02c578b5c1d7de33361581eebc19c3cd8d2e50b0211ca4ef13702200c93b9fe5428055b6274dc8e52073c3e87f5b5e4206134d745928ccfc9393919012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff2b6fd82c9a68111b67ad85a614a6ecb50f7b6eac3d21d8ebefd9a6065cdf5729000000006b483045022100fdff16c595c7b4a9b4fc1e445b565f7b29fe5b7a08f79291b0ff585c7b72ac2902200c694aa124013bd419ce2349f15d10435827868d35db939b9d3c344d16e78420012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff6a5468dd8c83553dc51022f2a2fb772cf91c8607dc2ca1b8f203ac534612ab29000000006b483045022100ba7cc79e7ae3720238bfc5caa225dc8017d6a0d1cb1ec66abaf724fd20b3b7ab02206e8c942756604af0f63b74af495a9b3b7f4a44c489267f69a14cf2b1b953f46e012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff5f9f48a91d343fd5aef1d85f00850070931459ab256697afb728d1c81c1fa1d2000000006a47304402200ec85fc66f963e7504eb27361a4b4bb17de60e459da414fdc3962476de636134022056b62c15cf7f9b4e7d4e11c03e4e541dd348919b8c55efa4f1927e2fdd5ae8ea012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffee1f455924d3167e7f7abf452c1856e9abdcfe27dc889942dd249cb376169d38000000006b48304502210089274eed807c5d23d819f6dfa8a358a9748e56f2080be4396ef77bb19d91b17402207fc7b22c879534fffe0eeaaec8fc284e22c2756f380c05ea57b881a96b09f3af012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f5050000000017a9144eb3a361d8a15d7f6a8ef9d1cf44962a90c44d548702912b00000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac490e135d000000000000000000000000000000"
          },
          "type": "MakerPaymentSent"
        },
        "timestamp": 1561529938879
      },
      {
        "event": {
          "data": {
            "tx_hash": "7e0e38e31dbe80792ef320b8c0a7cb9259127427ef8c2fca1d796f24484046a5",
            "tx_hex": "0400008085202f892082f6916932f9bf674a3fb00c3d5d765303ab68461f4abe0f91cc1162546914a9010000006b483045022100999b8bb0224476b5c344a466d0051ec7a8c312574ad8956a4177a42625cb86e302205a6664396bff3f2e6fe57adb7e082a26d1b8da9ee77b3fc24aa4148fdd5c84db012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffcad29a146b81bcaa44744efbec5149b6e3ca32bace140f75ad5794288d5bff6c000000006b483045022100b4dbfe88561c201fb8fbaf5bbf5bc0985893c909429c579425da84b02d23cc12022075f1e1e3eba38d167a6e84aac23faee5a2eb0799511e647213cee168529d4e5d012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffa13eeacd04b3e26ae3f41530b560c615dafa0fd4235cc5b22d48ab97e7c3399c000000006a47304402201158306fe668cbf56ad3f586dc83c1cda9efab44cef46da6bc0fe242292c85ed02201d622fe283410320e760233ae81dc53df65406b09fd07f8649f1775689219c35012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff4352b9f1f01dde4209b9e91076a3cfcabdaa23d9d5a313abfe7edb67ee4273e3000000006b483045022100825242fb3c6d460580016e93718ae1f43917e53abcc1558a64a6ab6f406763dd0220543936ce4c725e5e9f03831274a8475b535171bb29e1919fcf52ba2a9c85a553012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffcc0fa94b5973c893e61d470ae3982b0bedfd29cb0da2c60a362de438598f108c000000006b4830450221008c70a8e10ca37819e5a4d9783366e729e690d78f2fdd8a1f4812ddc14ec7d6ad022035ba8cb4d4e50684107f8af5c184582687b5d7dfda5d9be1bd45e45749c77f08012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffb0bd3bb9fedb7bbf49ca1612c955ba6095202186cef5be6952aed3dd32da4268000000006a4730440220592216d63c199faa587a4a6cbe11ca26027368a116b50818ce30eced59ca887202201bcafcf88f9f2632151596732f839d77cbe2f2243822c8551faffecc90b5dc19012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff65cf2831fc200e55aaacbe0881ad0edfb298ee6d4421b08b048aecc151716bd1000000006a47304402202032eb1ccebc3be4b94bae343d1d168e87040d2d20977c47d073d6bf490ef6c00220067656e00c4b8930167c54078609925cec7b893a52bcb9304e6b2602f564413e012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffeaf67880bee214acecc74b12f648c1014d6394c4abf99832d408981bb460e999000000006b483045022100b9ae1cc824149220ac517298e6f21c26939485b31d0ae19d97d986c5f8f34e4502200a90578cf2c1835dbea00484af1f225711c255f1d0a3208f2e4f1154f0db2c9a012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffad089c3fe7987a44f150f34b7ac66972de76dd84c739bdeddf360ab029dfd4d6000000006a473044022015f0386ed67a61626fbe5ae79e0d39d38e7b4072b648e8a26e23adadc0a8e5bc02202398188fa2feb26994e5c1e7e758788de3d5f0f0096f956a0cd58804710bea6a012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffd6c66730546c62dd003b5af1f1e5ecfd339c62db0169c1d499584e09a8a9b288000000006b4830450221008d4c73f0e3c9d913ba32fd864167649242e3e891412ab80bdd3f7ff43a238ee20220602738e98008b146256b51d0df99e222aa165f2ce351241ebc23d8a098e2b0db012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff12d9eff354f46cbd4446a0bff27a6a635ff5b1dc8a5dd8b0178bb5f89c9ec080000000006b48304502210098d3349ba9b13560748949933d2704663a5ab52cdc804afa1ac4da3e5992e0a002201525d7ad8466ad260219f3873fb7781addbd363f91e8063bfa86c7ed4e385b84012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff69e16767806ea5f069b7d46674f7aa747fcc6e541189ce7fcf92edcfd7642ff4000000006b4830450221008a5ebfe904c87f21947a44d8418190be5893993a683fde0f96df8a9487923da002205be1bbd8b518ba2f303cae23bc20806e84ffbba6a03f032385b15edb8df107f4012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640fffffffff4fbabd508178f553e676d67ce325796b03aa249b41a23c681c1ad9dedb45ae7000000006a47304402207cea6824abe1ce35e18954b858d45243e2cb57d27d782adc5b6b07ebd21a02d7022007ba0469b298c4b1a7c4a148fa16bae93d28593b34e197c10ac0d1faf9cc1bfa012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff14867aa59932d895be607fb7398f5594e39d9fa2e1c7daaed7b1390dbfdddcab000000006b4830450221009fb6e1885a3658c593809f95ecd2049f8ef9e00379686ac236b17312c9613d4c0220709fc50c9a920a19254389944db366c354708c19885d2479d9968fda0848f9f7012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff75777c692daaa21d216a1a2a7059203becfcdcf6793aa1259cdd7aadec957ab6000000006a47304402202945019860abf9b80e71f340320d114846efa4d2780ce12513e3983fb4d3f15b022019be008fb7368e3f1f022924dc7af1138b94041f46084dd27768bc8cacd1529f012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffca037b85742e93df4eef8e8ac3b8531321c8a8e21a4a941360866ea57a973665000000006a4730440220760283a7828edcc53671fc73e29c30cdc64d60d300292761d39730f0d09f94c202201e026293e3891a6fe46e40cd21778a41e21641a261a7fbf3bf75b034d9c788d9012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffa68edd030b4307ad87bfeff96a6db5b3ddd1a0901c488a4fe4d2093531896d75000000006b48304502210091a41e16b2c27d7ef6077e8de9df692b6013e61d72798ff9f7eba7fc983cdb65022034de29a0fb22a339e8044349913915444ab420772ab0ab423e44cfe073cb4e70012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff8c952791181993a7512e48d098a06e6197c993b83241a4bf1330c0e95f2c304d000000006b483045022100fa14b9301feb056f6e6b10446a660525cc1ff3e191b0c45f9e12dcd4f142422c02203f4a94f2a9d3ec0b74fac2156dd9b1addb8fa5b9a1cfc9e34b0802e88b1cbfa3012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff32bc4d014542abf328fecff29b9f4c243c3dd295fe42524b20bf591a3ddc26a1000000006a47304402206f92c4da6651c8959f7aed61608d26b9e46f5c1d69f4fc6e592b1f552b6067f102201c8cc221eac731867d15d483cc83322dba2f14f31d3efb26be937a68ad772394012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffbb3877248c26b23023d7dbb83a5f8293c65c5bff4ac47935a4a31248cefffd91000000006a47304402205bab19ad082a1918e18ccb6462edc263196fb88c8fdfd6bd07a0cf031a4637810220371a621c1bdc6b957db2447a92dcf87b0309653a2db480c9ed623f34a6e6d8a9012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff6415b7356c94609b9a7a7eb06e4c306896767abbc11399779f952fb9ae197059000000006b483045022100e2d038dbb9a873f5a58ec7901d6a7e79f1b404afea3d852056f4d0746cfb821102207fb274947b10d467cd71aa948e9a50f5f4430b661b27afc347efd9d6cc409d9c012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff1aeefdf80ec8a07d657ca64a2c0aa465f58e6284755c9a263c5a807be43b4b81000000006a47304402206e7ff765ba47a8785008f64f49c8e73232d582b2b2d0a49be0880c2557de8f8602206448423a6a37ad9740eb316513b31f73599ae14f65623709fb5443ae609f3e2e012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff3c091681df17b46f280bc9d8011c1bb31397637ce945b393f70380f8cd0a8b0d010000006a47304402206ca8717000f3086d364318f56d52e2369c40b88a1cb86455a8db262b4816698a02206711caf453bfda6b1b3542e27e68c3180f92f0548326d74e30b3ed18cd2c2353012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff91f32d98b581def165495aff6b69530e1f3de7f68fabfeb93730cf9793bbcd2a000000006a47304402200a8cd5e29ee7ff136772ea1789a39a027eaa1cd92f90f9d57fd8cf77202251f402203dd2bc282a838a5730e840a0d22b4f0edbe3cb2da00466c66bc2b5c66fc8b032012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff854d9226c28a1f5fe440e08f41000f3547f304ecf9cc010d0b5bc845ef1f039a000000006b483045022100fe6cce49975cc78af1c394bc02d995710833ba08cf7f8dd5f99add2cc7db26c40220793491309c215d8314a1c142bef7ec6b9a397249bec1c00a0a5ab47dfc1208b6012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff593bc907aa71f3b0f7aa8c48bb5f650595e65a5a733a9601a8374ed978eec9a7000000006a47304402206362ae3c4cf1a19ba0e43424b03af542077b49761172c1ad26d802f54b1b6ca602206bc7edb655bb0024c0e48c1f4c18c8864f8d1ce59ae55cd81dc0bd1234430691012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff3b9da8c5ab0c0cd6b40f602ea6ed8e36a48034b182b9d1a77ffebd15fe203b94000000006b483045022100f8610eae25899663cb5fa9a4575d937da57cdfd41958794bbb4c02f8bed75da40220262d40e019ec3a57b252f4150d509cce6f8a2dbd83184a9fc2ed56aba8018b15012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0897c8a57e15e7f3893b195d65cf6c6001b29c8c9734213d7a3131f57b9eca2e000000006b483045022100c485cbd6408cf0759bcf23c4154249882934b522a93c6b49e62412305bf7646902201cc4b668af4bb22fe57c32c4d34e822bceb12f6bd6923afdabf4894752a56ec3012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffffdc7000f7c45b62960623fa3a277e8a55348a4fe4936fef1224b6953434a249000000006b4830450221008a51a9c26f475d5c0838afe9d51524f95adfb21a9b0a02eae31cb01dc0a31fab022071c5492fbc7270731d4a4947a69398bf99dd28c65bb69d19910bf53a515274c8012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff10ec2af7e31ca28e27177215904d9a59abf80f0652b24e3f749f14fb7b2264ec000000006b483045022100fe4269f8f5ca53ebcff6fb782142a6228f0e50498a531b7a9c0d54768af9854102207cc740a9ea359569b49d69a94215ce3e23aeda5779cebc434ad3d608e1752990012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff5e3830c088dd6ea412d778b0a700ef27c183cf03e19f3d6f71bc5eaf53b2c22e000000006b4830450221009788a7e7f2407ba2f7c504091fbdf8f8498367781e8a357616d68e2a6770b4e70220518c92f5fb21e6bfd7d870a783b2a5572ce003f2dbb237ec59df419c9a148966012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff51630ccb0ad32b24cc7ae1b3602950ba518dca6aa65ef560e57f08c23eed8d80000000006a47304402201aa556153ffeb13aa674353bf88c04a7af15c7eb32e1a835464e4b613c31dc2802200395858c29a46e9108de1f90b401ee26c296388b4073143b63f849b2cce461af012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0200e1f5050000000017a914ab802c4d644be63fd1a72834ff63b650d6b5353987bb7e1e00000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac680e135d000000000000000000000000000000"
          },
          "type": "TakerPaymentReceived"
        },
        "timestamp": 1561529998938
      },
      {
        "event": {
          "type": "TakerPaymentWaitConfirmStarted"
        },
        "timestamp": 1561529998941
      },
      {
        "event": {
          "type": "TakerPaymentValidatedAndConfirmed"
        },
        "timestamp": 1561530000859
      },
      {
        "event": {
          "data": {
            "tx_hash": "235f8e7ab3c9515a17fe8ee721ef971bbee273eb90baf70788edda7b73138c86",
            "tx_hex": "0400008085202f8901a5464048246f791dca2f8cef2774125992cba7c0b820f32e7980be1de3380e7e00000000d8483045022100beca668a946fcad98da64cc56fa04edd58b4c239aa1362b4453857cc2e0042c90220606afb6272ef0773185ade247775103e715e85797816fbc204ec5128ac10a4b90120ea774bc94dce44c138920c6e9255e31d5645e60c0b64e9a059ab025f1dd2fdc6004c6b6304692c135db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a914eb78e2f0cf001ed7dc69276afd37b25c4d6bb491882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0118ddf505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac8000135d000000000000000000000000000000"
          },
          "type": "TakerPaymentSpent"
        },
        "timestamp": 1561530003429
      },
      {
        "event": {
          "type": "TakerPaymentSpendConfirmStarted"
        },
        "timestamp": 1561530003430
      },
      {
        "event": {
          "type": "TakerPaymentSpendConfirmed"
        },
        "timestamp": 1561530003522
      },
      {
        "event": {
          "type": "Finished"
        },
        "timestamp": 1561530003525
      }
    ],
    "my_info": {
      "my_amount": "1",
      "my_coin": "BEER",
      "other_amount": "1",
      "other_coin": "PIZZA",
      "started_at": 1561529842
    },
    "maker_coin": "BEER",
    "maker_amount": "1",
    "taker_coin": "PIZZA",
    "taker_amount": "1",
    "gui": "AtomicDEX 1.0",
    "mm_version": "unknown",
    "recoverable": false,
    "success_events": [
      "Started",
      "Negotiated",
      "TakerFeeValidated",
      "MakerPaymentSent",
      "TakerPaymentReceived",
      "TakerPaymentWaitConfirmStarted",
      "TakerPaymentValidatedAndConfirmed",
      "TakerPaymentSpent",
      "TakerPaymentSpendConfirmStarted",
      "TakerPaymentSpendConfirmed",
      "Finished"
    ],
    "type": "Maker",
    "uuid": "6bf6e313-e610-4a9a-ba8c-57fc34a124aa",
    "my_order_uuid": "3447b727-fe93-4357-8e5a-8cf2699b7e86"
  }
}
```

#### Maker Swap Failed with MakerPaymentTransactionFailed Event

```json
{
  "error_events": ["StartFailed","NegotiateFailed","TakerFeeValidateFailed","MakerPaymentTransactionFailed","MakerPaymentDataSendFailed","MakerPaymentWaitConfirmFailed","TakerPaymentValidateFailed","TakerPaymentWaitConfirmFailed","TakerPaymentSpendFailed","TakerPaymentSpendConfirmFailed","MakerPaymentWaitRefundStarted","MakerPaymentRefunded","MakerPaymentRefundFailed"],
  "events": [
    {
      "event": {
        "data": {
          "lock_duration": 7800,
          "maker_amount": "3.54932734",
          "maker_coin": "KMD",
          "maker_coin_start_block": 1452970,
          "maker_payment_confirmations": 1,
          "maker_payment_lock": 1563759539,
          "my_persistent_pub": "031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
          "secret": "0000000000000000000000000000000000000000000000000000000000000000",
          "started_at": 1563743939,
          "taker": "101ace6b08605b9424b0582b5cce044b70a3c8d8d10cb2965e039b0967ae92b9",
          "taker_amount": "0.02004833998671660000000000",
          "taker_coin": "ETH",
          "taker_coin_start_block": 8196380,
          "taker_payment_confirmations": 1,
          "uuid": "3447b727-fe93-4357-8e5a-8cf2699b7e86"
        },
        "type": "Started"
      },
      "timestamp": 1563743939211
    },
    {
      "event": {
        "data": {
          "taker_payment_locktime": 1563751737,
          "taker_pubkey": "03101ace6b08605b9424b0582b5cce044b70a3c8d8d10cb2965e039b0967ae92b9"
        },
        "type": "Negotiated"
      },
      "timestamp": 1563743979835
    },
    {
      "event": {
        "data": {
          "tx_hash": "a59203eb2328827de00bed699a29389792906e4f39fdea145eb40dc6b3821bd6",
          "tx_hex": "f8690284ee6b280082520894d8997941dd1346e9231118d5685d866294f59e5b865af3107a4000801ca0743d2b7c9fad65805d882179062012261be328d7628ae12ee08eff8d7657d993a07eecbd051f49d35279416778faa4664962726d516ce65e18755c9b9406a9c2fd"
        },
        "type": "TakerFeeValidated"
      },
      "timestamp": 1563744052878
    },
    {
      "event": {
        "data": {
          "error": "lp_swap:1888] eth:654] RPC error: Error { code: ServerError(-32010), message: \"Transaction with the same hash was already imported.\", data: None }"
        },
        "type": "MakerPaymentTransactionFailed"
      },
      "timestamp": 1563744118577
    },
    {
      "event": {
        "type": "Finished"
      },
      "timestamp": 1563763243350
    }
  ],
  "success_events": [
    "Started",
    "Negotiated",
    "TakerFeeValidated",
    "MakerPaymentSent",
    "TakerPaymentReceived",
    "TakerPaymentWaitConfirmStarted",
    "TakerPaymentValidatedAndConfirmed",
    "TakerPaymentSpent",
    "TakerPaymentSpendConfirmStarted",
    "TakerPaymentSpendConfirmed",
    "Finished"
  ],
  "uuid": "3447b727-fe93-4357-8e5a-8cf2699b7e86"
}
```

#### Response (error)

```json
{
  "error": "swap data is not found"
}
```

</collapse-text>

</div>

## my\_tx\_history

**my_tx_history (from_id limit=10 max=false page_number)**

The `my_tx_history` method returns the blockchain transactions involving the AtomicDEX API node's coin address.

The coin that is used must have `tx_history` set to true in its [enable](../../../basic-docs/atomicdex/atomicdex-api.html#enable) or [electrum](../../../basic-docs/atomicdex/atomicdex-api.html#electrum) call.

#### Arguments

| Structure   | Type   | Description                                                                                                                                                                                 |
| ----------  | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin        | string | the name of the coin for the history request                                                                                                                                                |
| limit       | number | limits the number of returned transactions; ignored if `max = true`                                                                                                                         |
| max         | bool   | whether to return all available records; defaults to `false`                                                                                                                                |
| from_id     | string | AtomicDEX API will skip records until it reaches this ID, skipping the `from_id` as well; track the `internal_id` of the last displayed transaction to find the value of this field for the next page |
| page_number | number | AtomicDEX API will return limit swaps from the selected page; This param will be ignored if from_uuid is set.                                                                                         |

#### Response

| Structure                                     | Type             | Description                                                                                                                                    |
| --------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| transactions                                  | array of objects | transactions data                                                                                                                              |
| from_id                                       | string           | the from_id specified in the request; this value is null if from_id was not set                                                                |
| skipped                                       | number           | the number of skipped records (i.e. the position of `from_id` in the list + 1); this value is 0 if `from_id` was not set                       |
| limit                                         | number           | the limit that was set in the request; note that the actual number of transactions can differ from the specified limit (e.g. on the last page) |
| total                                         | number           | the total number of transactions available                                                                                                     |
| page_number                                   | number           | the page_number that was set in the request                                                                                                    |
| total_pages                                   | number           | total pages available with the selected limit                                                                                                  |
| current_block                                 | number           | the number of the latest block of coin blockchain                                                                                              |
| sync_status                                   | object           | provides the information that helps to track the progress of transaction history preloading at background                                      |
| sync_status.state                             | string           | current state of sync; possible values: `NotEnabled`, `NotStarted`, `InProgress`, `Error`, `Finished`                                          |
| sync_status.additional_info                   | object           | additional info that helps to track the progress; present for `InProgress` and `Error` states only                                             |
| sync_status.additional_info.blocks_left       | number           | present for ETH/ERC20 coins only; displays the number of blocks left to be processed for `InProgress` state                                    |
| sync_status.additional_info.transactions_left | number           | present for UTXO coins only; displays the number of transactions left to be processed for `InProgress` state                                   |
| sync_status.additional_info.code              | number           | displays the error code for `Error` state                                                                                                      |
| sync_status.additional_info.message           | number           | displays the error message for `Error` state                                                                                                   |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_tx_history\",\"coin\":\"RICK\",\"limit\":1,\"from_id\":\"1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1\"}"
```

#### Command (max = true)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_tx_history\",\"coin\":\"RICK\",\"max\":true,\"from_id\":\"1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "current_block": 172418,
    "from_id": null,
    "limit": 1,
    "skipped": 0,
    "sync_status": {
      "additional_info": {
        "transactions_left": 126
      },
      "state": "InProgress"
    },
    "total": 5915,
    "total_pages": 5915,
    "page_number": null,
    "transactions": [
      {
        "block_height": 172409,
        "coin": "ETOMIC",
        "confirmations": 10,
        "fee_details": {
          "type": "Utxo",
          "amount": "0.00001"
        },
        "from": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
        "internal_id": "903e5d71b8717205314a71055fe8bbb868e7b76d001fbe813a34bd71ff131e93",
        "my_balance_change": "-0.10001",
        "received_by_me": "0.8998513",
        "spent_by_me": "0.9998613",
        "timestamp": 1566539526,
        "to": [
          "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
          "bJrMTiiRiLHJHc6RKQgesKTg1o9VVuKwT5"
        ],
        "total_amount": "0.9998613",
        "tx_hash": "903e5d71b8717205314a71055fe8bbb868e7b76d001fbe813a34bd71ff131e93",
        "tx_hex": "0400008085202f8901a242dc691de64c732e823ed0a4d8cfa6a230f8e31bc9bd21499009f1a90b855a010000006b483045022100d83113119004ac0504f812a853a831039dfc4b0bc1cb863d2c7a94c0670f07e902206af87b846b18c0d5e38bd874d43918e0400e4b6b838ab0793f5976843daa20cd012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff02809698000000000017a9144327a5516b28f66249576c18d15debf6dfbd1124876a105d05000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac047f5f5d000000000000000000000000000000"
      }
    ]
  }
}
```

#### Response (error)

```json
{
  "error": "lp_coins:1011] from_id 1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e2 is not found"
}
```

#### Response (History too large in electrum mode)

```json
{
  "result": {
    "current_block": 144753,
    "from_id": null,
    "limit": 0,
    "skipped": 0,
    "sync_status": {
      "additional_info": {
        "code": -1,
        "message": "Got `history too large` error from Electrum server. History is not available"
      },
      "state": "Error"
    },
    "total": 0,
    "transactions": []
  }
}
```

#### Response (Sync in progress for UTXO coins)

```json
{
  "result": {
    "current_block": 148300,
    "from_id": null,
    "limit": 0,
    "skipped": 0,
    "sync_status": {
      "additional_info": {
        "transactions_left": 1656
      },
      "state": "InProgress"
    },
    "total": 3956,
    "transactions": []
  }
}
```

#### Response (Sync in progress for ETH/ERC20 coins)

```json
{
  "result": {
    "current_block": 8039935,
    "from_id": null,
    "limit": 0,
    "skipped": 0,
    "sync_status": {
      "additional_info": {
        "blocks_left": 2158991
      },
      "state": "InProgress"
    },
    "total": 0,
    "transactions": []
  }
}
```

#### Response (Successful result in case of ETH/ERC20 coins)

```json
{
  "result": {
    "current_block": 9071551,
    "from_id": null,
    "limit": 3,
    "skipped": 0,
    "total_pages": 14,
    "page_number": 1,
    "sync_status": {
      "state": "Finished"
    },
    "total": 41,
    "transactions": [
      {
        "block_height": 8980257,
        "coin": "ETH",
        "confirmations": 91295,
        "fee_details": {
          "type": "Eth",
          "coin": "ETH",
          "gas": 57196,
          "gas_price": "0.000000027",
          "total_fee": "0.001544292"
        },
        "from": ["0xE4406Af4CA1dcB05AFE384eBfF3c1F233dCA176A"],
        "internal_id": "3978545ce08ca4c7f4b92e10b6c61efc6ce436f35f8a23f4e6a2e74f309cfd0a",
        "my_balance_change": "-0.010193732",
        "received_by_me": "0",
        "spent_by_me": "0.010193732",
        "timestamp": 1574423598,
        "to": ["0x8500AFc0bc5214728082163326C2FF0C73f4a871"],
        "total_amount": "0.00864944",
        "tx_hash": "e578a719896ec5f1475c273e02fbdd3cf283d9808c20db336f110e4b4faef10c",
        "tx_hex": "f8f11b850649534e00830249f0948500afc0bc5214728082163326c2ff0c73f4a871871eba9eaeb4c000b884152cf3af1b065716fc0c8254828abed3061c181f73a3c698cf1bc0fc8620e158448988050000000000000000000000007296a0cbae6ccfa5cddff9130569731a3b7da419d068b8936743ace66f192407debdcfc38445674e000000000000000000000000000000000000000000000000000000000000000000000000000000005dd808491ba0c78ad466381e0db9fb01f103d9e5c9d9c0c9cb28ee02bf990dc6371313c71bc3a0624e653559cfb19141a67e567e2e1fd4ca1ccd73f40d8b3672d14bd37072dad1"
      },
      {
        "block_height": 8953592,
        "coin": "ETH",
        "confirmations": 117960,
        "fee_details": {
          "type": "Eth",
          "coin": "ETH",
          "gas": 57196,
          "gas_price": "0.00000001",
          "total_fee": "0.00057196"
        },
        "from": ["0xE4406Af4CA1dcB05AFE384eBfF3c1F233dCA176A"],
        "internal_id": "15a3891932876cae74933b66bbfc2bba95b3e09c025152dd8b8d8023ad9a5fbd",
        "my_balance_change": "-0.31519846",
        "received_by_me": "0",
        "spent_by_me": "0.31519846",
        "timestamp": 1574038246,
        "to": ["0x8500AFc0bc5214728082163326C2FF0C73f4a871"],
        "total_amount": "0.3146265",
        "tx_hash": "235be0e6ac3860a637ec0c1d0ec2c364e85ab5cd54659c6987c37b2ba3378ffb",
        "tx_hex": "f8f21a8502540be400830249f0948500afc0bc5214728082163326c2ff0c73f4a87188045dc722816ca800b884152cf3af84519291dc1e8ea4efe055a1c27e6d33a74137164f5799352c1e10798e7a403c000000000000000000000000ee4398a7ab0a610daab82fef97affae44a5ce1464fd4d66db1e00256442acacc546a8a67433217de000000000000000000000000000000000000000000000000000000000000000000000000000000005dd226fb1ca030a665aeb07080e959e8027663d8f6af4069477c1ec8c712566108a9525b9629a052123cb075c404ff14d5281bd48232185590464de034bc6c86a818e699e4e288"
      },
      {
        "block_height": 8952273,
        "coin": "ETH",
        "confirmations": 119279,
        "fee_details": {
          "type": "Eth",
          "coin": "ETH",
          "gas": 49472,
          "gas_price": "0.00000001",
          "total_fee": "0.00049472"
        },
        "from": ["0x8500AFc0bc5214728082163326C2FF0C73f4a871"],
        "internal_id": "8796cee96c32121cd2ca9fef9d23affb4c173cf719a08e03436cf92e6ae90668",
        "my_balance_change": "0.29278494869327806",
        "received_by_me": "0.29278494869327806",
        "spent_by_me": "0",
        "timestamp": 1574019481,
        "to": ["0xE4406Af4CA1dcB05AFE384eBfF3c1F233dCA176A"],
        "total_amount": "0.29278494869327806",
        "tx_hash": "4d02298575e9abf0d18ea2abb4d7f02ddba9266019fe4952eb6fa90f90775850",
        "tx_hex": "f9010a198502540be400830249f0948500afc0bc5214728082163326c2ff0c73f4a87180b8a402ed292b0b6ed2b0bbdc333949f4847ffe567064a2a9c2239bcef95abd7f8408321dba3d00000000000000000000000000000000000000000000000004102e5c0e719d6cad1841132d7f23ffedb0e036ae85a80a337dface71b2d494893c16603686073500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f2b27558e45a3f44853e78b3c4bd05217723f841ba007650709e390395e659776b2ec390d951e2ab82ebcd7c540ce73dc6d352bc399a00d727f58ab77970c62bd92a356d057738b88f36fa4948c57b9b50de0815a951f"
      }
    ]
  }
}
```

</collapse-text>

</div>

## order\_status

**order_status uuid**

The `order_status` method returns the data of the order with the selected `uuid` created by the AtomicDEX API node.

#### Arguments

| Structure | Type   | Description              |
| --------- | ------ | ------------------------ |
| uuid      | string | uuid of order to display |

#### Response

| Structure | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| type      | string | type of the order ("Maker" or "Taker") |
| order     | object | order data                             |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"order_status\",\"uuid\":\"c3b3105c-e914-4ed7-9f1c-604783b054a1\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Maker order)

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
  "type": "Maker"
}
```

#### Response (Taker order)

```json
{
  "order": {
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
      "match_by":{
        "type":"Any"
      } 
    },
    "order_type":{
      "type":"GoodTillCancelled"
    }
  },
  "type": "Taker"
}
```

#### Response (No order found)

```json
{ "error": "Order with uuid c3b3105c-e914-4ed7-9f1c-604783b054a1 is not found" }
```

</collapse-text>

</div>

## orderbook

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
| base_max_volume               | string (decimal)  | the maximum amount of `base` coin the offer provider is willing to buy or sell                                                    |
| base_max_volume_rat           | rational          | the `base` max volume in num-rational crate format                                                                                |
| base_max_volume_fraction      | object (rational) | the `base` max volume represented as an object                                                                                    |
| base_min_volume               | string (decimal)  | the minimum amount of `base` coin the offer provider is willing to buy or sell                                                    |
| base_min_volume_rat           | rational          | the `base` min volume in num-rational crate format                                                                                |
| base_min_volume_fraction      | object (rational) | the `base` min volume represented as an object                                                                                    |
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

## orderbook\_depth

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
curl --url "http://127.0.0.1:7783" --data '
{
  "userpass":"'$userpass'",
  "method":"orderbook_depth",
  "pairs":[["RICK","MORTY"],["BTC","KMD"],["DOGE","KMD"]]
}
'
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

## orders\_history\_by\_filter

**orders_history_by_filter (order_type initial_action base rel from_price to_price from_volume to_volume from_timestamp to_timestamp was_taker status include_details)**

The `orders_history_by_filter` method returns all orders whether active or inactive that match the selected filters. Please note that all filters (order_type initial_action, etc.) are combined using logical AND.

#### Arguments

| Structure      | Type                          | Description                                                                            |
| -------------- | ----------------------------- | -----------------------------------------------------------------------                |
| order_type        | string | return only orders that match the  `request.order_type`; `order_type` can be "Maker" or "Taker" |
| initial_action     | string | return only orders that match the  `request.initial_action`; `initial_action` can be "Sell" or "Buy". Note that maker order `initial_action` is considered "Sell" |
| base | string | return only orders that match the `order.base = request.base` condition |
| rel   | string | return only orders that match the `order.rel = request.rel` condition |
| from_price   | numeric string or rational | return only orders that match the `order.price >= request.from_price` condition    |
| to_price   | numeric string or rational | return only orders that match the `order.price <= request.to_price` condition    |
| from_volume   | numeric string or rational | return only orders that match the `order.volume >= request.from_volume` condition    |
| to_volume   | numeric string or rational | return only orders that match the `order.volume <= request.to_volume` condition    |
| from_timestamp   | number (timestamp in seconds) | return only orders that match the `order.created_at >= request.from_timestamp` condition    |
| to_timestamp   | number (timestamp in seconds) | return only orders that match the `order.created_at <= request.to_timestamp` condition    |
| was_taker   | bool | return only `GoodTillCancelled` orders that got converted from `taker` to `maker`      |
| status   | string | return only orders that match the  `request.status`; `status` can be: <ul><li>For active maker order `Created`, `Updated`</li><li>For active taker order `Created`</li><li>For inactive maker order `Fulfilled`, `Insufficient Balance`, `Cancelled`</li><li>For inactive taker order `Fulfilled`, `Timed Out`, `Cancelled`</li></ul>    |
| include_details   | bool | whether to include complete order details in response; defaults to false    |

#### Response

| Structure                  | Type                           | Description                                                          |
| --------------------------- | ------------------------------ | -------------------------------------------------------------------- |
| result                      | result object                  |                                                                      |
| result.orders               | array of order objects         | array of orders that match the selected filters with minimal details |
| result.orders.uuid          | string                         | uuid of the order                                                    |
| result.orders.order_type    | string                         | type of the order; "Maker" or "Taker"                                |
| result.orders.base          | string                         | base coin of the order                                               |
| result.orders.rel           | string                         | rel coin of the order                                                |
| result.orders.price         | number (decimal)               | price of the order                                                   |
| result.orders.volume        | number (decimal)               | volume of the order                                                  |
| result.orders.created_at    | number                         | unix timestamp in milliseconds, indicating the order creation time   |
| result.orders.last_updated  | number                         | unix timestamp in milliseconds, indicating the time the order was last updated |
| result.orders.was_taker     | number                         | `1` if the order was a "Taker" order that got converted to "Maker", `0` otherwise |
| result.orders.status        | string                         | status of the Order                                                  |
| result.details              | array of order details objects | array of complete order details for every order that matches the selected filters; returns `[]` if `include_details` is false or not included in the request. |
| result.details.type         | string                         | type of the order; "Maker" or "Taker"                                |
| result.details.order        | object                         | the order details object                                             |
| result.details.order.changes_history | array                          | array containing previous details that was changed for this order as objects, available only for maker orders that was updated with `update_maker_order` method |
| found_records               | number                         | the number of returned orders                                        |
| warnings                    | array                          | array containing warnings objects                                    |
| warnings.uuid               | string                         | uuid of the order that produced this warning                         |
| warnings.warning            | string                         | warning message                                                      |

#### :pushpin: Examples

#### Command (select orders from history that have order_type = Taker and initial_action = Buy)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"order_type\":\"Taker\",\"initial_action\":\"Buy\"}"
```

#### Command (select orders from history that have base = RICK and rel = MORTY)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"base\":\"RICK\",\"rel\":\"MORTY\"}"
```

#### Command (select orders from history that have base = RICK and price >= 1  and volume <= 1)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"base\":\"RICK\",\"from_price\":1,\"to_volume\":1}"
```

#### Command (select orders from history that was_taker and created_at >= 1611705600 (January 27, 2021 0:00:00 GMT))

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"was_taker\":true,\"from_timestamp\":1611705600}"
```

#### Command (select orders with details from history that was cancelled because it timed-out)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orders_history_by_filter\",\"status\":\"Timed Out\",\"include_details\":true}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (orders only)

```json
{
  "result": {
    "orders": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "order_type": "Maker",
        "initial_action": "Sell",
        "base": "RICK",
        "rel": "MORTY",
        "price": 2,
        "volume": 3,
        "created_at": 1620727954406,
        "last_updated": 1620727954406,
        "was_taker": 0,
        "status": "Created"
      }
    ],
    "details": [],
    "found_records": 1,
    "warnings": []
  }
}
```

#### Response (details included)

```json
{
  "result": {
    "orders": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "order_type": "Maker",
        "initial_action": "Sell",
        "base": "RICK",
        "rel": "MORTY",
        "price": 2,
        "volume": 3,
        "created_at": 1620727954406,
        "last_updated": 1620727954406,
        "was_taker": 0,
        "status": "Created"
      }
    ],
    "details": [
      {
        "type":"Maker",
        "order": {
          "base": "RICK",
          "rel": "MORTY",
          "price":"2",
          "price_rat":[
            [
                1,
                [
                  2
                ]
            ],
            [
                1,
                [
                  1
                ]
            ]
          ],
          "max_base_vol":"3",
          "max_base_vol_rat": [
            [
              1,
              [
                3
              ]
            ],
            [
              1,
              [
                1
              ]
            ]
          ],
          "min_base_vol":"0.0001",
          "min_base_vol_rat": [
            [
              1,
              [
                1
              ]
            ],
            [
              1,
              [
                10000
              ]
            ]
          ],
          "created_at": 1620727954406,
          "updated_at": 1620727954406,
          "matches": {},
          "started_swaps": [],
          "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
          "conf_settings": {
            "base_confs": 1,
            "base_nota": false,
            "rel_confs": 1,
            "rel_nota": false
          }
        }
      }
    ],
    "found_records": 1,
    "warnings": []
  }
}
```

#### Response (details with history included)

```json
{
  "result": {
    "orders": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "order_type": "Maker",
        "initial_action": "Sell",
        "base": "RICK",
        "rel": "MORTY",
        "price": 1.5,
        "volume": 2,
        "created_at": 1620727954406,
        "last_updated": 1620727984838,
        "was_taker": 0,
        "status": "Updated"
      }
    ],
    "details": [
      {
        "type":"Maker",
        "order": {
          "base": "RICK",
          "rel": "MORTY",
          "price":"1.5",
          "price_rat":[
            [
                1,
                [
                  3
                ]
            ],
            [
                1,
                [
                  2
                ]
            ]
          ],
          "max_base_vol":"2",
          "max_base_vol_rat": [
            [
              1,
              [
                2
              ]
            ],
            [
              1,
              [
                1
              ]
            ]
          ],
          "min_base_vol":"0.0001",
          "min_base_vol_rat": [
            [
              1,
              [
                1
              ]
            ],
            [
              1,
              [
                10000
              ]
            ]
          ],
          "created_at": 1620727954406,
          "updated_at": 1620727954406,
          "matches": {},
          "started_swaps": [],
          "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
          "conf_settings": {
            "base_confs": 1,
            "base_nota": false,
            "rel_confs": 1,
            "rel_nota": false
          },
          "changes_history": [
            {
              "max_base_vol": [
                [
                  1,
                  [
                    3
                  ]
                ],
                [
                  1,
                  [
                    1
                  ]
                ]
              ],
              "price": [
                [
                  1,
                  [
                    2
                  ]
                ],
                [
                  1,
                  [
                    1
                  ]
                ]
              ],
              "updated_at": 1620727954406
            }
          ]
        }
      }
    ],
    "found_records": 1,
    "warnings": []
  }
}
```

#### Response (warning - uuid could not be parsed)

```json
{
  "result": {
    "orders": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "order_type": "Maker",
        "initial_action": "Sell",
        "base": "RICK",
        "rel": "MORTY",
        "price": 2,
        "volume": 3,
        "created_at": 1620727954406,
        "last_updated": 1620727954406,
        "was_taker": 0,
        "status": "Created"
      }
    ],
    "details": [],
    "found_records": 1,
    "warnings": [
      {
        "uuid": "e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e",
        "warning": "Order details for Uuid e5f453e2-b414-4df2-9fc3-eeedb5cc1f1e were skipped because uuid could not be parsed"
      }
    ]
  }
}
```

</collapse-text>

</div>

## recover\_funds\_of\_swap

**recover_funds_of_swap uuid**

In certain cases, a swap can finish with an error wherein the user's funds are stuck on the swap-payment address. (This address is the P2SH address when executing on a utxo-based blockchain, or an etomic-swap smart contract when executing on an ETH/ERC20 blockchain.)

This error can occur when one side of the trade does not follow the protocol (for any reason). The error persists as attempts to refund the payment fail due to network connection issues between the AtomicDEX API node and the coin's RPC server.

In this scenario, the `recover_funds_of_swap` method instructs the AtomicDEX API software to attempt to reclaim the user funds from the swap-payment address, if possible.

#### Arguments

| Structure   | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| params.uuid | string | uuid of the swap to recover the funds |

#### Response

| Structure      | Type   | Description                                                                                       |
| -------------- | ------ | ------------------------------------------------------------------------------------------------- |
| result.action  | string | the action executed to unlock the funds. Can be either `SpentOtherPayment` or `RefundedMyPayment` |
| result.coin    | string | the balance of this coin will be unstuck by the recovering transaction                            |
| result.tx_hash | string | the hash of the recovering transaction                                                            |
| result.tx_hex  | string | raw bytes of the recovering transaction in hexadecimal representation                             |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"recover_funds_of_swap\",\"params\":{\"uuid\":\"6343b2b1-c896-47d4-b0f2-a11798f654ed\"}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success - SpentOtherPayment)

```json
{
  "result": {
    "action": "SpentOtherPayment",
    "coin": "HELLO",
    "tx_hash": "696571d032976876df94d4b9994ee98faa870b44fbbb4941847e25fb7c49b85d",
    "tx_hex": "0400008085202f890113591b1feb52878f8aea53b658cf9948ba89b0cb27ad0cf30b59b5d3ef6d8ef700000000d8483045022100eda93472c1f6aa18aacb085e456bc47b75ce88527ed01c279ee1a955e85691b702201adf552cfc85cecf588536d5b8257d4969044dde86897f2780e8c122e3a705e40120576fa34d308f39b7a704616656cc124232143565ca7cf1c8c60d95859af8f22d004c6b63042555555db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a9146e602d4affeb86e4ee208802901b8fd43be2e2a4882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0198929800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac0238555d000000000000000000000000000000"
  }
}
```

#### Response (success - RefundedMyPayment)

```json
{
  "result": {
    "action": "RefundedMyPayment",
    "coin": "HELLO",
    "tx_hash": "696571d032976876df94d4b9994ee98faa870b44fbbb4941847e25fb7c49b85d",
    "tx_hex": "0400008085202f890113591b1feb52878f8aea53b658cf9948ba89b0cb27ad0cf30b59b5d3ef6d8ef700000000d8483045022100eda93472c1f6aa18aacb085e456bc47b75ce88527ed01c279ee1a955e85691b702201adf552cfc85cecf588536d5b8257d4969044dde86897f2780e8c122e3a705e40120576fa34d308f39b7a704616656cc124232143565ca7cf1c8c60d95859af8f22d004c6b63042555555db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a9146e602d4affeb86e4ee208802901b8fd43be2e2a4882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0198929800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac0238555d000000000000000000000000000000"
  }
}
```

#### Response (error - maker payment was already spent)

```json
{
  "error": "lp_swap:702] lp_swap:412] taker_swap:890] Maker payment is spent, swap is not recoverable"
}
```

#### Response (error - swap is not finished yet)

```json
{
  "error": "lp_swap:702] lp_swap:412] taker_swap:886] Swap must be finished before recover funds attempt"
}
```

</collapse-text>

</div>

## sell

**sell base rel price volume (match_by order_type base_confs base_nota rel_confs rel_nota)**

The `sell` method issues a sell request and attempts to match an order from the orderbook based on the provided arguments.

::: tip

- Buy and sell methods always create the `taker` order first. A `taker` order must pay a `dexfee` during the swap as it is taking liquidity from the market. The `dexfee` is calculated as "the greater of either `Minimum transaction amount (dust) TAKER COIN` or `0.0001 TAKER COIN` or `1/777th` the size of the desired order". If your `GoodTillCancelled` order is not matched in 30 seconds, the order is automatically converted to a `maker` request and stays on the orderbook until the request is matched or cancelled. To always act as a maker, please use the [setprice](../../../basic-docs/atomicdex/atomicdex-api.html#setprice) method.
- To prevent a user from making trades in which the transaction fees may end up costing a significant portion of the value of the trade, we have set a lower limit to the value of a trade. See the description of the `volume` argument for more info. 

:::

#### Arguments

| Structure       | Type                       | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | -------------------------- | ---------------------------------------------------------------------------------                                                                                                                                                                                                                                                                                                                                     |
| base            | string                     | the name of the coin the user desires to sell                                                                                                                                                                                                                                                                                                                                                                         |
| rel             | string                     | the name of the coin the user desires to receive                                                                                                                                                                                                                                                                                                                                                                      |
| price           | numeric string or rational | the price in `rel` the user is willing to receive per one unit of the `base` coin                                                                                                                                                                                                                                                                                                                                     |
| volume          | numeric string or rational | the amount of coins the user is willing to sell of the `base` coin; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `volume`</li><li>the product of the arguments `volume` and `price`</li></ul>                                                                                                                                                                                |
| min_volume      | numeric string or rational (optional) | the amount of `base` coin that will be used as `min_volume` of `GoodTillCancelled` order after conversion to maker; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `min_volume`</li><li>the product of the arguments `min_volume` and `price`</li></ul>                                                                                      |
| match_by        | object                     | the created order is matched using this condition; *important:* this condition is not applied after `GoodTillCancelled` order conversion to `maker` request                                                                                                                                                                                                                                                           |
| match_by.type   | string                     | `Any` to match with any other order; `Orders` to select specific uuids; `Pubkeys` to select specific nodes; Default is `Any`                                                                                                                                                                                                                                                                                          |
| match_by.data   | array of strings           | uuids of orders to match for `Orders` type; pubkeys of nodes to match for `Pubkeys` type                                                                                                                                                                                                                                                                                                                              |
| order_type      | object                     | the type of the order                                                                                                                                                                                                                                                                                                                                                                                                 |
| order_type.type | string                     | there are two types from which to choose: `GoodTillCancelled` and `FillOrKill`. The `GoodTillCancelled` order is automatically converted to a `maker` order if the order is not matched in 30 seconds, and this `maker` order stays in the orderbook until explicitly cancelled. On the other hand, a `FillOrKill` order is cancelled if it is not matched within 30 seconds. The default type is `GoodTillCancelled` |
| base_confs      | number                     | number of required blockchain confirmations for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                                                                                                      |
| base_nota       | bool                       | whether dPoW notarization is required for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                                                                                                            |
| rel_confs       | number                     | number of required blockchain confirmations for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                                                                                                        |
| rel_nota        | bool                       | whether dPoW notarization is required for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                                                                                                              |

#### Response

| Structure                       | Type             | Description                                                                                                                                                                                                     |
| ----------------------          | --------         | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                          | object           | the resulting order object                                                                                                                                                                                      |
| result.action                   | string           | the action of the request (`Sell`)                                                                                                                                                                              |
| result.base                     | string           | the base currency of the request                                                                                                                                                                                |
| result.base_amount              | string           | the resulting amount of base currency that is sold if the order matches (in decimal representation)                                                                                                             |
| result.base_amount_rat          | rational         | the resulting amount of base currency that is sold if the order matches (in rational representation)                                                                                                            |
| result.rel                      | string           | the rel currency of the request                                                                                                                                                                                 |
| result.rel_amount               | string           | the minimum amount of `rel` coin that must be received in order to sell the `base_amount` of `base` (according to `price`, in decimal representation)                                                           |
| result.rel_amount_rat           | rational         | the minimum amount of `rel` coin that must be received in order to sell the `base_amount` of `base` (according to `price`, in rational representation)                                                          |
| result.method                   | string           | this field is used for internal P2P interactions; the value is always equal to "request                                                                                                                         |
| result.dest_pub_key             | string           | reserved for future use. The `dest_pub_key` allows the user to choose the P2P node that is eligible to match with the request. This value defaults to "zero pubkey", meaning that `anyone` can match            |
| result.sender_pubkey            | string           | the public key of our node                                                                                                                                                                                      |
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
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":\"1\",\"price\":\"1\"}"
```

#### Command (rational representation in num-rational crate format)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]]}"
```

#### Command (rational representation as a fraction object)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"sell",
  "base":"HELLO",
  "rel":"WORLD",
  "volume":{
    "numer":"3",
    "denom":"2"
  },
  "price":{
    "numer":"2",
    "denom":"1"
  }
}'
```

#### Command (with confirmations and notarization settings)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"sell",
  "base":"HELLO",
  "rel":"WORLD",
  "volume":{
    "numer":"3",
    "denom":"2"
  },
  "price":{
    "numer":"2",
    "denom":"1"
  },
  "base_confs": 2,
  "base_nota": true,
  "rel_confs": 5,
  "rel_nota": false
}'
```

#### Command (GoodTillCancelled type)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"order_type\":{\"type\":\"GoodTillCancelled\"}}"
```

#### Command (FillOrKill type)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"order_type\":{\"type\":\"FillOrKill\"}}"
```

#### Command (match by Any)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"match_by\":{\"type\":\"Any\"}}"
```

#### Command (match by Pubkeys)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"match_by\":{\"type\":\"Pubkeys\",\"data\":[\"1ab7edc96abaefb358b52c583048eaaeb8ea42609d096d6cddfafa02fa510c6a\"]}}"
```

#### Command (match by Orders)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sell\",\"base\":\"BASE\",\"rel\":\"REL\",\"volume\":[[1,[1]],[1,[1]]],\"price\":[[1,[1]],[1,[1]]],\"match_by\":{\"type\":\"Orders\",\"data\":[\"d14452bb-e82d-44a0-86b0-10d4cdcb8b24\"]}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "action": "Sell",
    "base": "BASE",
    "base_amount": "1",
    "base_amount_rat": [
      [1, [1]],
      [1, [1]]
    ],
    "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
    "method": "request",
    "rel": "REL",
    "rel_amount": "1",
    "rel_amount_rat": [
      [1, [1]],
      [1, [1]]
    ],
    "sender_pubkey": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
    "uuid": "d14452bb-e82d-44a0-86b0-10d4cdcb8b24",
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
  "error": "rpc:278] utxo:884] BASE balance 12.88892991 is too low, required 21.15"
}
```

</collapse-text>

</div>

## send\_raw\_transaction

**send_raw_transaction coin tx_hex**

The `send_raw_transaction` method broadcasts the transaction to the network of selected coin.

#### Arguments

| Structure | Type   | Description                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------- |
| coin      | string | the name of the coin network on which to broadcast the transaction                                |
| tx_hex    | string | the transaction bytes in hexadecimal format; this is typically generated by the `withdraw` method |

#### Response

| Structure | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| tx_hash   | string | the hash of the broadcast transaction |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"send_raw_transaction\",\"coin\":\"KMD\",\"tx_hex\":\"0400008085202f8902d6a5b976db5e5c9e8f9ead50713b25f22cd061edc8ff0ff1049fd2cd775ba087000000006b483045022100bf2073c1ecfef3fc78f272045f46a722591401f61c2d2fac87fc474a17df7c3102200ca1bd0664ba75f3383e5cbbe96127ad534a86238dbea256e000b0fe2067ab8c012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffd04d4e07ac5dacd08fb76e08d2a435fc4fe2b16eb0158695c820b44f42f044cb010000006a47304402200a0c21e8c0ae4a740f3663fe08aeff02cea6495157d531045b58d2dd79fb802702202f80dddd264db33f55e49799363997a175d39a91242a95f268c40f7ced97030b012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788acc3b3ca27000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000\",\"userpass\":\"$userpass\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "tx_hash": "0b024ea6997e16387c0931de9f203d534c6b2b8500e4bda2df51a36b52a3ef33"
}
```

</collapse-text>

</div>

## setprice

**setprice base rel price (volume max cancel_previous=true base_confs base_nota rel_confs rel_nota min_volume)**

The `setprice` method places an order on the orderbook, and it relies on this node acting as a `maker`, also called a `Bob` node.

The `setprice` order is always considered a `sell`, for internal implementation convenience.

::: tip

To prevent a user from making trades in which the transaction fees may end up costing a significant portion of the value of the trade, we have set a lower limit to the value of a trade. See the description of the `volume` and `min_volume` arguments for more info. 

:::

#### Arguments

| Structure       | Type                       | Description                                                                                                                                                                                                                                                                                                               |
| --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                  |
| base            | string                     | the name of the coin the user desires to sell                                                                                                                                                                                                                                                                             |
| rel             | string                     | the name of the coin the user desires to receive                                                                                                                                                                                                                                                                          |
| price           | numeric string or rational | the price in `rel` the user is willing to receive per one unit of the `base` coin                                                                                                                                                                                                                                         |
| volume          | numeric string or rational | the maximum amount of `base` coin available for the order, ignored if max is `true`; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `volume`</li><li>the product of the arguments `volume` and `price`</li></ul>                             |
| min_volume      | numeric string or rational | the minimum amount of `base` coin available for the order; it must be less or equal than `volume` param; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `min_volume`</li><li>the product of the arguments `min_volume` and `price`</li></ul> |
| max             | bool                       | AtomicDEX API will use the entire coin balance for the order, taking `0.001` coins into reserve to account for fees                                                                                                                                                                                                                 |
| cancel_previous | bool                       | AtomicDEX API will cancel all existing orders for the selected pair by default; set this value to `false` to prevent this behavior                                                                                                                                                                                                  |
| base_confs      | number                     | number of required blockchain confirmations for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                          |
| base_nota       | bool                       | whether dPoW notarization is required for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                |
| rel_confs       | number                     | number of required blockchain confirmations for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                            |
| rel_nota        | bool                       | whether dPoW notarization is required for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                  |

#### Response

| Structure                       | Type             | Description                                                                                               |
| -----------------------         | ---------------- | --------------------------------------------------------------------------------------------------------- |
| result                          | object           | the resulting order object                                                                                |
| result.base                     | string           | the base coin of the order                                                                                |
| result.rel                      | string           | the rel coin of the order                                                                                 |
| result.price                    | string (numeric) | the expected amount of `rel` coin to be received per 1 unit of `base` coin; decimal representation        |
| result.price_rat                | rational         | the expected amount of `rel` coin to be received per 1 unit of `base` coin; rational representation       |
| result.max_base_vol             | string (numeric) | the maximum volume of base coin available to trade; decimal representation                                |
| result.max_base_vol_rat         | rational         | the maximum volume of base coin available to trade; rational representation                               |
| result.min_base_vol             | string (numeric) | AtomicDEX API won't match with other orders that attempt to trade less than `min_base_vol`; decimal representation  |
| result.min_base_vol_rat         | rational         | AtomicDEX API won't match with other orders that attempt to trade less than `min_base_vol`; rational representation |
| result.created_at               | number           | unix timestamp in milliseconds, indicating the order creation time                                        |
| result.updated_at               | number           | unix timestamp in milliseconds, indicating the order update time                                        |
| result.matches                  | object           | contains the map of ongoing matches with other orders, empty as the order was recently created            |
| result.started_swaps            | array of strings | uuids of swaps that were initiated by the order                                                           |
| result.uuid                     | string           | uuid of the created order                                                                                 |
| result.conf_settings.base_confs | number           | number of required blockchain confirmations for base coin atomic swap transaction                         |
| result.conf_settings.base_nota  | bool             | whether dPoW notarization is required for base coin atomic swap transaction                               |
| result.conf_settings.rel_confs  | number           | number of required blockchain confirmations for rel coin atomic swap transaction                          |
| result.conf_settings.rel_nota   | bool             | whether dPoW notarization is required for rel coin atomic swap transaction                                |

#### :pushpin: Examples

#### Command (with volume)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BASE\",\"rel\":\"REL\",\"price\":\"0.9\",\"volume\":\"1\"}"
```

#### Command (max = true)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BASE\",\"rel\":\"REL\",\"price\":\"0.9\",\"max\":true}"
```

#### Command (rational representation in num-rational crate format)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"setprice",
  "base":"HELLO",
  "rel":"WORLD",
  "volume":[[1,[1]],[1,[1]]],
  "price":[[1,[1]],[1,[1]]]
}'
```

#### Command (rational representation as fraction object)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"setprice",
  "base":"HELLO",
  "rel":"WORLD",
  "volume":{
    "numer":"3",
    "denom":"2"
  },
  "price":{
    "numer":"2",
    "denom":"1"
  }
}'
```

#### Command (with min_volume)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"setprice",
  "base":"HELLO",
  "rel":"WORLD",
  "volume":{
    "numer":"3",
    "denom":"2"
  },
  "price":{
    "numer":"2",
    "denom":"1"
  },  
  "min_volume":"1"
}'
```

#### Command (with confirmations and notarization settings)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"setprice",
  "base":"HELLO",
  "rel":"WORLD",
  "volume":{
    "numer":"3",
    "denom":"2"
  },
  "price":{
    "numer":"2",
    "denom":"1"
  },
  "base_confs": 2,
  "base_nota": true,
  "rel_confs": 5,
  "rel_nota": false  
}'
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
{ "error": "Rel coin REL is not found" }
```

</collapse-text>

</div>

## set\_required\_confirmations

**set\_required\_confirmations coin confirmations**

The `set_required_confirmations` method sets the number of confirmations for which AtomicDEX API must wait for the selected coin.

::: tip Note

This setting is _**not**_ persistent. The value must be reset in the coins file on restart.

:::

#### Arguments

| Structure     | Type   | Description                            |
| ------------- | ------ | -------------------------------------- |
| coin          | string | the ticker of the selected coin        |
| confirmations | number | the number of confirmations to require |

#### Response

| Structure            | Type   | Description                                |
| -------------------- | ------ | ------------------------------------------ |
| result.coin          | string | the coin selected in the request           |
| result.confirmations | number | the number of confirmations in the request |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"set_required_confirmations\",\"coin\":\"RICK\",\"confirmations\":3}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "coin": "ETOMIC",
    "confirmations": 3
  }
}
```

</collapse-text>

</div>

## set\_requires\_notarization

**set\_requires\_notarization coin requires\_notarization**

The `set_requires_notarization` method indicates whether AtomicDEX API must wait for a dPoW notarization of the given atomic swap transactions.

::: tip Note

This setting is _**not**_ persistent. The value must be reset in the coins file on restart.

:::

#### Arguments

| Structure              | Type   | Description                                                                    |
| ---------------------  | ------ | --------------------------------------                                         |
| coin                   | string | the ticker of the selected coin                                                |
| requires\_notarization | bool   | whether the node should wait for dPoW notarization of atomic swap transactions |

#### Response

| Structure                     | Type   | Description                                                                        |
| ----------------------------  | ------ | ------------------------------------------                                         |
| result.coin                   | string | the coin selected in the request                                                   |
| result.requires\_notarization | bool   | whether the node must wait for a dPoW notarization of the atomic swap transactions |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"set_requires_notarization\",\"coin\":\"RICK\",\"requires_notarization\":true}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "coin": "ETOMIC",
    "requires_notarization": true
  }
}
```

</collapse-text>

</div>

## show\_priv\_key

**show_priv_key coin**

The `show_priv_key` method returns the private key of the specified `coin` in a format compatible with `coin` wallets.
The output can be used for the `importprivkey` method (UTXO coins) or as a private key for MyEtherWallet (ETH/ERC20).

#### Arguments

| Structure | Type   | Description                                     |
| --------- | ------ | --------------------------------------------    |
| coin      | string | the name of the coin of the private key to show |

#### Response

| Structure       | Type             | Description                                                                                                                                                                                                                                              |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin            | string           | the name of the coin                                                                                                                                                                                                                                     |
| priv_key        | string           | the private key of the coin                                                                                                                                                                                                                              |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"show_priv_key\",\"coin\":\"HELLOWORLD\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (UTXO WIF)

```json
{
  "coin": "HELLOWORLD",
  "priv_key": "UvCjJf4dKSs2vFGVtCnUTAhR5FTZGdg43DDRa9s7s5DV1sSDX14g"
}
```

#### Response (0x-prefixed ETH private key)

```json
{
  "coin": "ETH",
  "priv_key": "0xb8c774f071de08c7fd8f62b97f1a5726f6ce9f1bcf141b70b86689254ed6714e"
}
```

</collapse-text>

</div>

## stop

**stop()**

The `stop` method stops the AtomicDEX API software.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

## trade\_preimage (deprecated)

**trade_preimage**

The `trade_preimage` method returns the approximate fee amounts that are paid per the whole swap.
Depending on the parameters, the function returns different results:

- If the `swap_method` is `buy` or `sell`, then the result will include the `taker_fee` and the `fee_to_send_taker_fee`.
  The `taker_fee` amount is paid from the `base` coin balance if the `swap_method` is `sell`, else it is paid from the `rel` coin balance;
- If the `max` field is true, then the result will include the `volume`.

::: tip Note

This method can be used instead of **max_taker_vol**, if the `max` field is true and the `swap_method` is `buy` or `sell`.
Use the resulting `volume` as an argument of the `buy` or `sell` requests.

:::

::: warning Important

Use the `trade_preimage` request with `max = true` and `swap_method = "setprice"` arguments to approximate the fee amounts **only**. Do not use the resulting `volume` as an argument of the `setprice`.

:::

::: tip

This function is deprecated. Please consider using [trade_preimage v2.0](../../../basic-docs/atomicdex/atomicdex-api-20/trade_preimage.html) instead.

:::

#### Arguments

| Structure   | Type                                  | Description                                                                                                                          |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| base        | string                                | the base currency of the request                                                                                                     |
| rel         | string                                | the rel currency of the request                                                                                                      |
| swap_method | string                                | the name of the method whose preimage is requested. Possible values: `buy`, `sell`, `setprice`                                       |
| price       | numeric string or rational            | the price in `rel` the user is willing to pay per one unit of the `base` coin                                                        |
| volume      | numeric string or rational (optional) | the amount the user is willing to trade; ignored if `max = true` **and** `swap_method = setprice`, otherwise, it must be set         |
| max         | bool (optional)                       | whether to return the maximum available volume for `setprice` method; must not be set or `false` if `swap_method` is `buy` or `sell` |

#### Response

| Structure                                    | Type                                 | Description                                                                                                                                    |
| -------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| result                                       | object                               | an object containing the relevant information                                                                                                  |
| result.base_coin_fee                         | object (`ExtendedFeeInfo`)           | the approximate miner fee is paid per the whole swap concerning the `base` coin                                                                |
| result.rel_coin_fee                          | object (`ExtendedFeeInfo`)           | the approximate miner fee is paid per the whole swap concerning the `rel` coin                                                                 |
| result.volume                                | string (numeric, optional)           | the max available volume that can be traded (in decimal representation); empty if the `max` argument is missing or false                       |
| result.volume_rat                            | rational (optional)                  | the max available volume that can be traded (in rational representation); empty if the `max` argument is missing or false                      |
| result.volume_fraction                       | fraction (optional)                  | the max available volume that can be traded (in fraction representation); empty if the `max` argument is missing or false                      |
| result.taker_fee                             | object (optional, `ExtendedFeeInfo`) | the dex fee to be paid by Taker; empty if `swap_method` is `setprice`                                                                          |
| result.fee_to_send_taker_fee                 | object (optional, `ExtendedFeeInfo`) | the approximate miner fee is paid to send the dex fee; empty if `swap_method` is `setprice`                                                    |
| result.total_fees                            | array of `TotalFeeInfo` objects      | each element is a sum of fees required to be paid from user's balance of corresponding `ExtendedFeeInfo.coin`; the elements are unique by coin |

The `ExtendedFeeInfo` structure is as follows:

| Structure             | Type             | Description                                                                                                                                                   |
| ---------------       | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                  | string           | the fee is paid from the user's balance of this coin. This coin name may differ from the `base` or `rel` coins. For example, ERC20 fees are paid by ETH (gas) |
| amount                | string (numeric) | fee amount (in decimal representation)                                                                                                                        |
| amount_rat            | rational         | fee amount (in rational representation)                                                                                                                       |
| amount_fraction       | fraction         | fee amount (in fraction representation)                                                                                                                       |
| amount_fraction       | fraction         | fee amount (in fraction representation)                                                                                                                       |
| paid_from_trading_vol | bool             | whether the fee is paid from trading volume and not use actual `coin` balance                                                                                 |

The `TotalFeeInfo` structure is as follows:

| Structure                 | Type             | Description                                                                                                                                                   |
| ---------------           | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                      | string           | the fee is paid from the user's balance of this coin. This coin name may differ from the `base` or `rel` coins. For example, ERC20 fees are paid by ETH (gas) |
| amount                    | string (numeric) | fee amount (in decimal representation)                                                                                                                        |
| amount_rat                | rational         | fee amount (in rational representation)                                                                                                                       |
| amount_fraction           | fraction         | fee amount (in fraction representation)                                                                                                                       |
| required_balance          | string (numeric) | the required `coin` balance to pay the fee                                                                                                                    |
| required_balance_rat      | rational         | `required_balance` in rational representation                                                                                                                 |
| required_balance_fraction | fraction         | `required_balance` in fraction representation                                                                                                                 |

#### :pushpin: Examples

#### Command (setprice)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"base\":\"RICK\",\"rel\":\"BTC\",\"price\":\"1\",\"volume\":\"0.1\",\"swap_method\":\"setprice\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "base_coin_fee": {
      "coin": "RICK",
      "amount": "0.00001",
      "amount_fraction": {
        "numer": "1",
        "denom": "100000"
      },
      "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ],
      "paid_from_trading_vol": false
    },
    "rel_coin_fee": {
      "coin": "BTC",
      "amount": "0.00029211",
      "amount_fraction": {
        "numer": "29211",
        "denom": "100000000"
      },
      "amount_rat": [ [ 1, [ 29211 ] ], [ 1, [ 100000000 ] ] ],
      "paid_from_trading_vol": true
    },
    "total_fees": [
      {
        "coin": "RICK",
        "amount": "0.00001",
        "amount_fraction": {
          "numer": "1",
          "denom": "100000"
        },
        "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ],
        "required_balance": "0.00001",
        "required_balance_fraction": {
          "numer": "1",
          "denom": "100000"
        },
        "required_balance_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ]
      },
      {
        "coin": "BTC",
        "amount": "0.00029211",
        "amount_fraction": {
          "numer": "29211",
          "denom": "100000000"
        },
        "amount_rat": [ [ 1, [ 29211 ] ], [ 1, [ 100000000 ] ] ],
        "required_balance": "0",
        "required_balance_fraction": {
          "numer": "0",
          "denom": "1"
        },
        "required_balance_rat": [ [ 0, [] ], [ 1, [ 1 ] ] ]
      }
    ]
  }
}
```

</collapse-text>

</div>

#### Command (buy)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"base\":\"BTC\",\"rel\":\"RICK\",\"price\":\"1\",\"volume\":\"0.1\",\"swap_method\":\"buy\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "base_coin_fee": {
      "coin": "BTC",
      "amount": "0.00029211",
      "amount_fraction": {
        "numer": "29211",
        "denom": "100000000"
      },
      "amount_rat": [ [ 1, [ 29211 ] ], [ 1, [ 100000000 ] ] ],
      "paid_from_trading_vol": true
    },
    "rel_coin_fee": {
      "coin": "RICK",
      "amount": "0.00001",
      "amount_fraction": {
        "numer": "1",
        "denom": "100000"
      },
      "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ],
      "paid_from_trading_vol": false
    },
    "taker_fee": {
      "coin": "RICK",
      "amount": "0.0001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287",
      "amount_fraction": {
        "numer": "1",
        "denom": "7770"
      },
      "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 7770 ] ] ],
      "paid_from_trading_vol": false
    },
    "fee_to_send_taker_fee": {
      "coin": "RICK",
      "amount": "0.00001",
      "amount_fraction": {
        "numer": "1",
        "denom": "100000"
      },
      "amount_rat": [ [ 1, [ 1 ] ], [ 1, [ 100000 ] ] ],
      "paid_from_trading_vol": false
    },
    "total_fees": [
      {
        "coin": "BTC",
        "amount": "0.00029211",
        "amount_fraction": {
          "numer": "29211",
          "denom": "100000000"
        },
        "amount_rat": [ [ 1, [ 29211 ] ], [ 1, [ 100000000 ] ] ],
        "required_balance": "0",
        "required_balance_fraction": {
          "numer": "0",
          "denom": "1"
        },
        "required_balance_rat": [ [ 0, [] ], [ 1, [ 1 ] ] ]
      },
      {
        "coin": "RICK",
        "amount": "0.0001487001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287",
        "amount_fraction": {
          "numer": "5777",
          "denom": "38850000"
        },
        "amount_rat": [ [ 1, [ 5777 ] ], [ 1, [ 38850000 ] ] ],
        "required_balance": "0.0001487001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287001287",
        "required_balance_fraction": {
          "numer": "5777",
          "denom": "38850000"
        },
        "required_balance_rat": [ [ 1, [ 5777 ] ], [ 1, [ 38850000 ] ] ]
      }
    ]
  }
}
```

</collapse-text>

</div>

#### Command (ERC20 and QRC20)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"trade_preimage\",\"base\":\"BAT\",\"rel\":\"QC\",\"price\":\"1\",\"volume\":\"2.21363478\",\"swap_method\":\"setprice\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "base_coin_fee": {
      "amount":"0.0045",
      "amount_fraction":{
        "denom":"2000",
        "numer":"9"
      },
      "amount_rat":[[1,[9]],[1,[2000]]],
      "coin":"ETH",
      "paid_from_trading_vol": false
    },
    "rel_coin_fee": {
      "amount":"0.00325",
      "amount_fraction":{
        "denom":"4000",
        "numer":"13"
      },
      "amount_rat":[[0,[13]],[1,[4000]]],
      "coin":"QTUM",
      "paid_from_trading_vol": false
    },
    "total_fees": [
      {
        "amount":"0.003",
        "amount_fraction":{
          "denom":"1000",
          "numer":"3"
        },
        "amount_rat":[[1,[3]],[1,[1000]]],        
        "required_balance":"0.003",
        "required_balance_fraction":{
          "denom":"1000",
          "numer":"3"
        },
        "required_balance_rat":[[1,[3]],[1,[1000]]],
        "coin":"ETH"
      },
      {
        "amount":"0.00325",
        "amount_fraction":{
          "denom":"4000",
          "numer":"13"
        },
        "amount_rat":[[0,[13]],[1,[4000]]],        
        "required_balance":"0.00325",
        "required_balance_fraction":{
          "denom":"4000",
          "numer":"13"
        },
        "required_balance_rat":[[0,[13]],[1,[4000]]],
        "coin":"QTUM"
      }
    ]
  }
}
```

</collapse-text>

</div>

## unban\_pubkeys

**unban_pubkeys unban_by**

The `unban_pubkeys` method removes the selected pubkeys from the black list, allowing the node executing the method to receive orders and order matching requests from the unbanned nodes.

#### Arguments

| Structure             | Type                           | Description                                                                                                                      |
| --------------------- | ------                         | -------------------------------------------------------------------------------------------------------------------------------- |
| unban_by              | object                         | pubkeys matching this condition are removed from the black list                                                                  |
| unban_by.type         | string                         | `All` to unban all pubkeys; `Few` to unban several selected pubkeys                                                              |
| cancel_by.data        | array of strings (hexadecimal) | pubkeys that should be removed from the black list; must be present with `Few` type                                              |

#### Response

| Structure                 | Type                     | Description                                                                                                    |
| ------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| result                    | object                   |                                                                                                                |
| result.still_banned       | map of objects           | the pubkeys that remain banned                                                                                 |
| result.unbanned           | map of objects           | data of unbanned pubkeys                                                                                       |
| result.were_not_banned    | array of strings         | the pubkeys that were not black listed before the `unban_pubkeys` call                                         |

#### :pushpin: Examples

#### Command (All pubkeys)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"unban_pubkeys\",\"unban_by\":{\"type\":\"All\"}}"
```

#### Command (Unban selected pubkeys)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"unban_pubkeys\",\"unban_by\":{\"type\":\"Few\",\"data\":[\"15d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732\",\"16d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732\"]}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "still_banned":{
     "25d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732":{
       "caused_by_event":{
         "event":{
           "data":{
             "error":"taker_swap:547] \"taker_swap:543] timeout (180.0 > 180.0)\""
           },
           "type":"NegotiateFailed"
         },
         "type":"Taker"
       },
       "caused_by_swap":"a87f4187-fac3-49d9-a517-f50b7530be40"
     }
    },
    "unbanned":{
      "15d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732":{
        "caused_by_event":{
          "event":{
            "data":{
              "error":"taker_swap:547] \"taker_swap:543] timeout (180.0 > 180.0)\""
            },
            "type":"NegotiateFailed"
          },
          "type":"Taker"
        },
        "caused_by_swap":"f87f4187-fac3-49d9-a517-f50b7530be40"
      }
    },
    "were_not_banned":["16d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732"]
  }
}
```

</collapse-text>

</div>

## update\_maker\_order

**update\_maker\_order uuid (new_price volume_delta max base_confs base_nota rel_confs rel_nota min_volume)**

The `update_maker_order` method updates an active order on the orderbook created before by `setprice`, and it relies on this node acting as a `maker`, also called a `Bob` node.

::: tip

To prevent a user from making trades in which the transaction fees may end up costing a significant portion of the value of the trade, we have set a lower limit to the value of a trade. See the description of the `volume_delta` and `min_volume` arguments for more info. 

:::

#### Arguments

| Structure       | Type                       | Description                                                                                                                                                                                                                                                                                                               |
| --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                  |
| uuid            | string                  | the uuid of the order the user desires to update |
| new_price           | numeric string or rational (optional) | the price in `rel` the user is willing to receive per one unit of the `base` coin          |                                                                                                                                                                                                                               |
| volume_delta          | numeric string or rational (optional) | volume added to or subtracted from the `max_base_vol` of the order to be updated, resulting in the new volume which is the maximum amount of `base` coin available for the order, ignored if max is `true`; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the new volume which is the `max_base_vol` of the order to be updated plus `volume_delta`</li><li>the product of the new volume and the argument `new_price`</li></ul>                             |
| min_volume      | numeric string or rational (optional) | the minimum amount of `base` coin available for the order; it must be less or equal than the new volume; the following values must be greater than or equal to the `min_trading_vol` of the corresponding coin: <ul><li>the argument `min_volume`</li><li>the product of the arguments `min_volume` and `new_price`</li></ul> |
| max             | bool (optional)                       | AtomicDEX API will use the entire coin balance for the order, taking `0.001` coins into reserve to account for fees                                                                                                                                                                                                                                                       |
| base_confs      | number (optional)                     | number of required blockchain confirmations for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                          |
| base_nota       | bool (optional)                      | whether dPoW notarization is required for base coin atomic swap transaction; default to base coin configuration if not set                                                                                                                                                                                                |
| rel_confs       | number (optional)                    | number of required blockchain confirmations for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                            |
| rel_nota        | bool (optional)                      | whether dPoW notarization is required for rel coin atomic swap transaction; default to rel coin configuration if not set                                                                                                                                                                                                  |

#### Response

| Structure                       | Type             | Description                                                                                               |
| -----------------------         | ---------------- | --------------------------------------------------------------------------------------------------------- |
| result                          | object           | the resulting order object                                                                                |
| result.base                     | string           | the base coin of the order                                                                                |
| result.rel                      | string           | the rel coin of the order                                                                                 |
| result.price                    | string (numeric) | the expected amount of `rel` coin to be received per 1 unit of `base` coin; decimal representation        |
| result.price_rat                | rational         | the expected amount of `rel` coin to be received per 1 unit of `base` coin; rational representation       |
| result.max_base_vol             | string (numeric) | the maximum volume of base coin available to trade; decimal representation                                |
| result.max_base_vol_rat         | rational         | the maximum volume of base coin available to trade; rational representation                               |
| result.min_base_vol             | string (numeric) | AtomicDEX API won't match with other orders that attempt to trade less than `min_base_vol`; decimal representation  |
| result.min_base_vol_rat         | rational         | AtomicDEX API won't match with other orders that attempt to trade less than `min_base_vol`; rational representation |
| result.created_at               | number           | unix timestamp in milliseconds, indicating the order creation time                                        |
| result.updated_at               | number           | unix timestamp in milliseconds, indicating the order update time                                        |
| result.matches                  | object           | contains the map of ongoing matches with other orders, empty as the order was recently created            |
| result.started_swaps            | array of strings | uuids of swaps that were initiated by the order                                                           |
| result.uuid                     | string           | uuid of the updated order                                                                                 |
| result.conf_settings.base_confs | number           | number of required blockchain confirmations for base coin atomic swap transaction                         |
| result.conf_settings.base_nota  | bool             | whether dPoW notarization is required for base coin atomic swap transaction                               |
| result.conf_settings.rel_confs  | number           | number of required blockchain confirmations for rel coin atomic swap transaction                          |
| result.conf_settings.rel_nota   | bool             | whether dPoW notarization is required for rel coin atomic swap transaction                                |

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
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"update_maker_order",
  "uuid":"6a242691-6c05-474a-85c1-5b3f42278f41",
  "volume_delta":[[1,[1]],[1,[1]]],
  "new_price":[[1,[1]],[1,[1]]]
}'
```

#### Command (rational representation as fraction object)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"update_maker_order",
  "uuid":"6a242691-6c05-474a-85c1-5b3f42278f41",
  "volume_delta":{
    "numer":"3",
    "denom":"2"
  },
  "new_price":{
    "numer":"2",
    "denom":"1"
  }
}'
```

#### Command (with min_volume)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"update_maker_order",
  "uuid":"6a242691-6c05-474a-85c1-5b3f42278f41",
  "volume_delta":{
    "numer":"3",
    "denom":"2"
  },
  "new_price":{
    "numer":"2",
    "denom":"1"
  },  
  "min_volume":"1"
}'
```

#### Command (with confirmations and notarization settings)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"update_maker_order",
  "uuid":"6a242691-6c05-474a-85c1-5b3f42278f41",
  "volume_delta":{
    "numer":"3",
    "denom":"2"
  },
  "new_price":{
    "numer":"2",
    "denom":"1"
  },
  "base_confs": 2,
  "base_nota": true,
  "rel_confs": 5,
  "rel_nota": false  
}'
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
{ "error": "There is no order with UUID  6a242691-6c05-474a-85c1-5b3f42278f41" }
```

</collapse-text>

</div>

## validateaddress

**validateaddress coin address**

The `validateaddress` method checks if an input string is a valid address of the specified coin.

#### Arguments

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| coin      | string | the coin to validate address for        |
| address   | string | the input string to validate            |

#### Response

| Structure       | Type              | Description                                        |
| --------------- | ----------------- | -------------------------------------------------- |
| result.is_valid | bool              | whether input string is a valid coin address       |
| result.reason   | string (optional) | the reason why input string is not a valid address |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783/" --data "{"userpass":"$userpass","method":"validateaddress","coin":"RICK","address":"RRnMcSeKiLrNdbp91qNVQwwXx5azD4S4CD"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (valid address)

```json
{
  "result":{
    "is_valid":true
  }
}
```

#### Response (invalid cash address)

```json
{
  "result":{
    "is_valid":false,
    "reason":"utxo:415] Checksum verification failed"
  }
}
```

#### Response (invalid ETH address)

```json
{
  "result":{
    "is_valid":false,
    "reason":"eth:360] eth:2522] Invalid address checksum"
  }
}
```

</collapse-text>

</div>

## version

**version()**

The `version` method returns the AtomicDEX API version.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure | Type   | Description     |
| --------- | ------ | --------------- |
| result    | string | the AtomicDEX API version |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"version\",\"userpass\":\"$userpass\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": "2.0.996_mm2_3bb412578_Linux"
}
```

</collapse-text>

</div>

## withdraw

**withdraw coin to (amount max)**

The `withdraw` method generates, signs, and returns a transaction that transfers the `amount` of `coin` to the address indicated in the `to` argument.

This method generates a raw transaction which should then be broadcast using [send_raw_transaction](../../../basic-docs/atomicdex/atomicdex-api.html#send-raw-transaction).

#### Arguments

| Structure     | Type             | Description                                                                                                                               |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| coin          | string           | the name of the coin the user desires to withdraw                                                                                         |
| to            | string           | coins are withdrawn to this address                                                                                                       |
| amount        | string (numeric) | the amount the user desires to withdraw, ignored when `max=true`                                                                          |
| max           | bool             | withdraw the maximum available amount                                                                                                     |
| fee.type      | string           | type of transaction fee; possible values: `UtxoFixed`, `UtxoPerKbyte`, `EthGas`                                                           |
| fee.amount    | string (numeric) | fee amount in coin units, used only when type is `UtxoFixed` (fixed amount not depending on tx size) or `UtxoPerKbyte` (amount per Kbyte) |
| fee.gas_price | string (numeric) | used only when fee type is EthGas; sets the gas price in `gwei` units                                                                     |
| fee.gas       | number (integer) | used only when fee type is EthGas; sets the gas limit for transaction                                                                     |

#### Response

| Structure                 | Type                       | Description                                                                                                                                                                   |
| ------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                      | array of strings           | coins are withdrawn from this address; the array contains a single element, but transactions may be sent from several addresses (UTXO coins)                                  |
| to                        | array of strings           | coins are withdrawn to this address; this may contain the `my_address` address, where change from UTXO coins is sent                                                          |
| my_balance_change         | string (numeric)           | the expected balance of change in `my_address` after the transaction broadcasts                                                                                               |
| received_by_me            | string (numeric)           | the amount of coins received by `my_address` after the transaction broadcasts; the value may be above zero when the transaction requires that the AtomicDEX API send change to `my_address` |
| spent_by_me               | string (numeric)           | the amount of coins spent by `my_address`; this value differ from the request amount, as the transaction fee is added here                                                    |
| total_amount              | string (numeric)           | the total amount of coins transferred                                                                                                                                         |
| fee_details               | object                     | the fee details of the generated transaction; this value differs for utxo and ETH/ERC20 coins, check the examples for more details                                            |
| tx_hash                   | string                     | the hash of the generated transaction                                                                                                                                         |
| tx_hex                    | string                     | transaction bytes in hexadecimal format; use this value as input for the `send_raw_transaction` method                                                                        |
| coin                      | string                     | the name of the coin the user wants to withdraw                                                                                                                             |
| kmd_rewards               | object (optional)          | an object containing information about accrued rewards; always exists if the coin is `KMD`                                                                                    |
| kmd_rewards.amount        | string (numeric, optional) | the amount of accrued rewards                                                                                                                                                 |
| kmd_rewards.claimed_by_me | bool (optional)            | whether the rewards been claimed by me                                                                                                                                        |

#### :pushpin: Examples

#### Command (BTC, KMD, and other BTC-based forks)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"KMD\",\"to\":\"RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh\",\"amount\":\"10\",\"userpass\":\"$userpass\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (KMD success)

```json
{
  "block_height": 0,
  "coin": "KMD",
  "fee_details": {
    "type": "Utxo",
    "amount": "0.00001"
  },
  "from": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
  "my_balance_change": "-10.00001",
  "received_by_me": "0.34417325",
  "spent_by_me": "10.34418325",
  "to": ["RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh"],
  "total_amount": "10.34418325",
  "tx_hash": "3a1c382c50a7d12e4675d12ed7e723ce9f0167693dd75fd772bae8524810e605",
  "tx_hex": "0400008085202f890207a8e96978acfb8f0d002c3e4390142810dc6568b48f8cd6d8c71866ad8743c5010000006a47304402201960a7089f2d93480fff68ce0b7ca7bb7a32a52915753ac7ae780abd6162cb1d02202c9b11d442e5f72a532f44ceb10122898d486b1474a10eb981c60c5538b9c82d012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff97f56bf3b0f815bb737b7867e71ddb8198bba3574bb75737ba9c389a4d08edc6000000006a473044022055199d80bd7e2d1b932e54f097c6a15fc4b148d21299dc50067c1da18045f0ed02201d26d85333df65e6daab40a07a0e8a671af9d9b9d92fdf7d7ef97bd868ca545a012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200ca9a3b000000001976a91464ae8510aac9546d5e7704e31ce177451386455588acad2a0d02000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000",
  "kmd_rewards": {
    "amount": "0.0791809",
    "claimed_by_my": true
  }
}
```

</collapse-text>

</div>

#### Command (BTC, KMD, and other BTC-based forks, fixed fee)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"RICK\",\"to\":\"R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW\",\"amount\":\"1.0\",\"fee\":{\"type\":\"UtxoFixed\",\"amount\":\"0.1\"}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "tx_hex": "0400008085202f8901ef25b1b7417fe7693097918ff90e90bba1351fff1f3a24cb51a9b45c5636e57e010000006b483045022100b05c870fcd149513d07b156e150a22e3e47fab4bb4776b5c2c1b9fc034a80b8f022038b1bf5b6dad923e4fb1c96e2c7345765ff09984de12bbb40b999b88b628c0f9012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac8cbaae5f010000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ace87a5e5d000000000000000000000000000000",
  "tx_hash": "1ab3bc9308695960bc728fa427ac00d1812c4ae89aaa714c7618cb96d111be58",
  "from": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
  "to": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
  "total_amount": "60.10253836",
  "spent_by_me": "60.10253836",
  "received_by_me": "60.00253836",
  "my_balance_change": "-0.1",
  "block_height": 0,
  "timestamp": 1566472936,
  "fee_details": {
    "type": "Utxo",
    "amount": "0.1"
  },
  "coin": "RICK",
  "internal_id": ""
}
```

#### Response (error - attempt to use EthGas for UTXO coin)

```json
{ "error": "utxo:1295] Unsupported input fee type" }
```

</collapse-text>

</div>

#### Command (BTC, KMD, and other BTC-based forks, 1 RICK per Kbyte)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"RICK\",\"to\":\"R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW\",\"amount\":\"1.0\",\"fee\":{\"type\":\"UtxoPerKbyte\",\"amount\":\"1\"}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "tx_hex": "0400008085202f890258be11d196cb18764c71aa9ae84a2c81d100ac27a48f72bc6059690893bcb31a000000006b483045022100ef11280e981be280ca5d24c947842ca6a8689d992b73e3a7eb9ff21070b0442b02203e458a2bbb1f2bf8448fc47c51485015904a5271bb17e14be5afa6625d67b1e8012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff58be11d196cb18764c71aa9ae84a2c81d100ac27a48f72bc6059690893bcb31a010000006b483045022100daaa10b09e7abf9d4f596fc5ac1f2542b8ecfab9bb9f2b02201644944ddc0280022067aa1b91ec821aa48f1d06d34cd26fb69a9f27d59d5eecdd451006940d9e83db012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788acf31c655d010000001976a91405aab5342166f8594baf17a7d9bef5d56744332788accd7c5e5d000000000000000000000000000000",
  "tx_hash": "fd115190feec8c0c14df2696969295c59c674886344e5072d64000379101b78c",
  "from": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
  "to": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
  "total_amount": "60.00253836",
  "spent_by_me": "60.00253836",
  "received_by_me": "59.61874931",
  "my_balance_change": "-0.38378905",
  "block_height": 0,
  "timestamp": 1566473421,
  "fee_details": {
    "type": "Utxo",
    "amount": "0.38378905"
  },
  "coin": "RICK",
  "internal_id": ""
}
```

#### Response (error - attempt to use EthGas for UTXO coin)

```json
{ "error": "utxo:1295] Unsupported input fee type" }
```

</collapse-text>

</div>

#### Command (ETH, ERC20, and other ETH-based forks)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"ETH\",\"to\":\"0xbab36286672fbdc7b250804bf6d14be0df69fa28\",\"amount\":10,\"userpass\":\"$userpass\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "block_height": 0,
  "coin": "ETH",
  "fee_details": {
    "type": "Eth",
    "coin": "ETH",
    "gas": 21000,
    "gas_price": "0.000000001",
    "total_fee": "0.000021"
  },
  "from": ["0xbab36286672fbdc7b250804bf6d14be0df69fa29"],
  "my_balance_change": "-10.000021",
  "received_by_me": "0",
  "spent_by_me": "10.000021",
  "to": ["0xbab36286672fbdc7b250804bf6d14be0df69fa28"],
  "total_amount": "10.000021",
  "tx_hash": "8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
  "tx_hex": "f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
}
```

</collapse-text>

</div>

#### Command (ETH, ERC20, and other ETH-based forks, with gas fee)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"coin\":\"$1\",\"to\":\"$2\",\"amount\":\"$3\",\"fee\":{\"type\":\"EthGas\",\"gas_price\":\"3.5\",\"gas\":55000}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "tx_hex": "f86d820b2884d09dc30082d6d894bab36286672fbdc7b250804bf6d14be0df69fa29888ac7230489e80000801ca0ef0167b0e53ed50d87b6fd630925f2bce6ee72e9b5fdb51c6499a7caaecaed96a062e5cb954e503ff83f2d6ce082649fdcdf8a77c8d37c7d26d46d3f736b228d10",
  "tx_hash": "a26c4dcacf63c04e385dd973ca7e7ca1465a3b904a0893bcadb7e37681d38c95",
  "from": ["0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29"],
  "to": ["0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29"],
  "total_amount": "10",
  "spent_by_me": "10.0001925",
  "received_by_me": "10",
  "my_balance_change": "-0.0001925",
  "block_height": 0,
  "timestamp": 1566474670,
  "fee_details": {
    "type": "Eth",
    "coin": "ETH",
    "gas": 55000,
    "gas_price": "0.0000000035",
    "total_fee": "0.0001925"
  },
  "coin": "ETH",
  "internal_id": ""
}
```

#### Response (error - attempt to use UtxoFixed or UtxoPerKbyte for ETH coin)

```json
{ "error": "eth:369] Unsupported input fee type" }
```

</collapse-text>

</div>

#### Command (max = true)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"ETH\",\"to\":\"0xbab36286672fbdc7b250804bf6d14be0df69fa28\",\"max\":true,\"userpass\":\"$userpass\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "block_height": 0,
  "coin": "ETH",
  "fee_details": {
    "type": "Eth",
    "coin": "ETH",
    "gas": 21000,
    "gas_price": "0.000000001",
    "total_fee": "0.000021"
  },
  "from": ["0xbab36286672fbdc7b250804bf6d14be0df69fa29"],
  "my_balance_change": "-10.000021",
  "received_by_me": "0",
  "spent_by_me": "10.000021",
  "to": ["0xbab36286672fbdc7b250804bf6d14be0df69fa28"],
  "total_amount": "10.000021",
  "tx_hash": "8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
  "tx_hex": "f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
}
```

</collapse-text>

</div>

#### Command (QRC20)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"withdraw\",\"coin\":\"QRC20\",\"to\":\"qHmJ3KA6ZAjR9wGjpFASn4gtUSeFAqdZgs\",\"amount\":10,\"userpass\":\"$userpass\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "block_height": 0,
  "coin":"QRC20",
  "timestamp":1608725061,
  "fee_details":{
    "type": "Qrc20",
    "coin":"tQTUM",
    "miner_fee":"0.00000447",
    "gas_limit":100000,
    "gas_price":40,
    "total_gas_fee":"0.04"
  },
  "from": ["qXxsj5RtciAby9T7m98AgAATL4zTi4UwDG"],
  "my_balance_change": "-10",
  "received_by_me": "0",
  "spent_by_me": "10",
  "to": ["qHmJ3KA6ZAjR9wGjpFASn4gtUSeFAqdZgs"],
  "total_amount": "10",
  "tx_hash": "8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
  "tx_hex": "f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
}
```

</collapse-text>

</div>

#### Command (QRC20, with gas fee)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"coin\":\"QRC20\",\"to\":\"qHmJ3KA6ZAjR9wGjpFASn4gtUSeFAqdZgs\",\"amount\":10,\"fee\":{\"type\":\"Qrc20Gas\",\"gas_limit\":250000,\"gas_price\":40}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

```json
{
  "block_height": 0,
  "coin":"QRC20",
  "timestamp":1608725061,
  "fee_details":{
    "type": "Qrc20",
    "coin":"tQTUM",
    "miner_fee":"0.00000447",
    "gas_limit":250000,
    "gas_price":40,
    "total_gas_fee":"0.1"
  },
  "from": ["qXxsj5RtciAby9T7m98AgAATL4zTi4UwDG"],
  "my_balance_change": "-10",
  "received_by_me": "0",
  "spent_by_me": "10",
  "to": ["qHmJ3KA6ZAjR9wGjpFASn4gtUSeFAqdZgs"],
  "total_amount": "10",
  "tx_hash": "8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
  "tx_hex": "f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
}
```

</collapse-text>

</div>
