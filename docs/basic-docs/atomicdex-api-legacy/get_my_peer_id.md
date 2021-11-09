# get\_my\_peer\_id

**get_my_peer_id**

The `get_my_peer_id` method returns your unique identifying Peer ID on the network

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure                           | Type | Description |
| ----------------------------------- | ---- | ----------- |
| PeerID | string      | The PeerID of your node on the network |


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
