
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