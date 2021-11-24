
## get\_relay\_mesh

**get_relay_mesh**

The `get_relay_mesh` method returns a list of peerIDs included in our local relay mesh.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure                           | Type | Description |
| ----------------------------------- | ---- | ----------- |
| PeerIDs | List      | PeerIDs within your local relay mesh |


#### :pushpin: Examples


#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
	{
        \"userpass\": \"${userpass}\",
        \"method\": \"get_relay_mesh\"
    }
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
	"result":[
		"12D3KooWM8BrDBXc1TVw2vswoqYcQVn7fFvpAvcCfaV2Uqg2L9jU",
		"12D3KooWJDoV9vJdy6PnzwVETZ3fWGMhV41VhSbocR1h2geFqq9Y"
	]
}

```

</collapse-text>

</div>
