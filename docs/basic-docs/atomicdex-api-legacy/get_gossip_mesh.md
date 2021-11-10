
## get\_gossip\_mesh

**get_gossip_mesh**

The `get_gossip_mesh` method returns an array of peerIDs added to a topics' mesh for each known gossipsub topic.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure                           | Type | Description |
| ----------------------------------- | ---- | ----------- |
| Topic-PeerID map | Array  |   PeerIDs added to a topics' mesh (for each known gossipsub topic) |


#### :pushpin: Examples


#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
	{
        \"userpass\": \"${userpass}\",
        \"method\": \"get_gossip_mesh\"
    }
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result":{}
}
```

</collapse-text>

</div>
