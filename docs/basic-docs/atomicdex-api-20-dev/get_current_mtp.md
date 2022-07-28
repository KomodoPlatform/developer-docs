# get\_current\_mtp

The `get_current_mtp` method returns the Median Time Past (MTP) from electrum servers for UTXO coins. This information is useful for debugging, specifically in cases where an electrum server has been misconfigured.


#### Arguments

| Parameter | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| coin      | string | A compatible (UTXO) coin's ticker                                    |
| id        | integer| Optional. Identifies a request to allow matching it with a response. Defaults to `null`  |


#### Response

| Parameter  | Type   | Description      |
| ---------- | ------ | ---------------- |
| mtp        | integer| Unix timestamp   |
| id         | integer| Identifies a response to allow matching it with a request. Defaults to `null` if `id` not provided in request |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"method\": \"get_current_mtp\",
    \"userpass\": \"USERPASS\",
    \"mmrpc\": \"2.0\",
    \"id\": 42,
    \"params\": {
        \"coin\": \"RICK\"
    }
}
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
    "mmrpc": "2.0",
    "result": {
        "mtp": 1658746383
    },
    "id": 42
}
```

</collapse-text>

</div>
