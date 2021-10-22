# remove\_node\_from\_version\_stat

The `remove_node_from_version_stat` method removes a Node (by name) from the local database which tracks which version of MM2 it is running. The name parameter is an arbitrary identifying string, such as "seed_alpha" or "dragonhound_DEV".

### Arguments

| Structure | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| name      | string | the name assigned to the node   |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\": \"2.0\",\"method\":\"remove_node_from_version_stat\",\"userpass\":\"$userpass\",\"params\":{\"name\": \"dragonhound_DEV\"}}"
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