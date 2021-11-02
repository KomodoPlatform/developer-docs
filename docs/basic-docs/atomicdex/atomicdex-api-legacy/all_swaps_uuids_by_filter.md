
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
