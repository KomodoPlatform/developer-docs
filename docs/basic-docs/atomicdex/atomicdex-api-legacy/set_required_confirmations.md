
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
