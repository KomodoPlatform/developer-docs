
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
