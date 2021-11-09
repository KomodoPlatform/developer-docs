# start\_version\_stat\_collection


The `start_version_stat_collection` method initiates storing version statistics for nodes previously registered via the `add_node_to_version_stat` method.

### Arguments

| Structure | Type    | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| interval  | integer | polling rate (in seconds) to check node versions |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\": \"2.0\",\"method\":\"start_version_stat_collection\",\"userpass\":\"$userpass\",\"params\":{\"interval\": 600}}"
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

#### Response (error - invalid peer id unable to parse)

```json
{
  "mmrpc":"2.0",
  "error":"Database error: UNIQUE constraint failed: nodes.peer_id",
  "error_path":"lp_stats",
  "error_trace":"lp_stats:124]",
  "error_type":"DatabaseError",
  "error_data":"UNIQUE constraint failed: nodes.peer_id",
  "id":null
}
```


</collapse-text>

</div>
