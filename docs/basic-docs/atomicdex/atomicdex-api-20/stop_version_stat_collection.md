## stop\_version\_stat\_collection

The `stop_version_stat_collection` method stops the collection of version stats at the end of the current loop interval.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure | Type   | Description      |
| --------- | ------ | ---------------- |
| result    | string | success or error |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\": \"2.0\",\"method\":\"stop_version_stat_collection\",\"userpass\":\"$userpass\",\"params\":{}}
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "mmrpc":"2.0",
  "result":"success",
  "id":null
}
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (error - stats collection not running)

```json
{
  "mmrpc":"2.0",
  "error":"start_version_stat_collection is not running",
  "error_path":"lp_stats",
  "error_trace":"lp_stats:395]",
  "error_type":"NotRunning",
  "id":null
}

```

</collapse-text>

</div>
