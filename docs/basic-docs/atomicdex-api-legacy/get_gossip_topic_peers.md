
## get\_gossip\_topic\_peers

**get_gossip_topic_peers**

The `get_gossip_topic_peers` method returns a map of topics to an array of the PeerIDs which are subscribers.
                            
#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure                           | Type | Description |
| ----------------------------------- | ---- | ----------- |
| Topic-PeerID map | Array     | PeerIDs subscribed to a topic  |


#### :pushpin: Examples


#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
	{
        \"userpass\": \"${userpass}\",
        \"method\": \"get_my_peer_id\"
    }
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result":"12D3KooWS9MeuFZhJCfQTntwbTVnXMAJpz9Tvd1XYFuURrGqnJVR"
}
```

</collapse-text>

</div>
