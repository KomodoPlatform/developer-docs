# add\_node\_to\_version\_stat


The `add_node_to_version_stat` method adds a Node's name, IP address and PeerID to a local database to track which version of MM2 it is running. The name parameter is an arbitrary identifying string, such as "seed_alpha" or "dragonhound_DEV". The address parameter is the node's IP address or domain names. The Peer ID can be found in the MM2 log file after a connection has been initiated, and looks like the below:

`07 09:33:58, atomicdex_behaviour:610] INFO Local peer id: PeerId("12D3KooWReXsTVCKGAna1tzrD1jaUttTSs17ULFuvvzoGD9bqmmA")
`

Note: To allow collection of version stats, added nodes must open port 38890.

### Arguments

| Structure | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| name      | string | the name assigned to the node   |
| address   | string | the IP address of the node      |
| peer_id   | string | the node's unique Peer ID       |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"mmrpc\": \"2.0\",
    \"method\":\"add_node_to_version_stat\",
    \"userpass\":\"$userpass\",
    \"params\":{\"name\": \"seed1\",
    \"address\": \"168.119.236.241\",
    \"peer_id\": \"12D3KooWEsuiKcQaBaKEzuMtT6uFjs89P1E8MK3wGRZbeuCbCw6P\"}
}"
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

#### Response (error - peer id already in database)

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

#### Response (error - name already in database)

```json
{
  "mmrpc":"2.0",
  "error":"Database error: UNIQUE constraint failed: nodes.name",
  "error_path":"lp_stats","error_trace":"lp_stats:124]",
  "error_type":"DatabaseError",
  "error_data":"UNIQUE constraint failed: nodes.name",
  "id":null
}

```

#### Response (error - invalid Peer ID)

```json
{
  "mmrpc":"2.0",
  "error":"Error on parse peer id 12D3RsaaWRmXsJsCKGAD5FJSsd7CSbbdrsd: decoding multihash failed",
  "error_path":"lp_stats",
  "error_trace":"lp_stats:121]",
  "error_type":"PeerIdParseError",
  "error_data":["12D3RsaaWRmXsJsCKGAD5FJSsd7CSbbdrsd","decoding multihash failed"],
  "id":null
}

```

</collapse-text>

</div>