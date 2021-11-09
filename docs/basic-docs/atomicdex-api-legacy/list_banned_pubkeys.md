# list\_banned\_pubkeys

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
