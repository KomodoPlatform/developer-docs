
## get\_peers\_info

**get_peers_info**

The `get_peers_info` method (FILL IN THE BLANK)

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure                           | Type | Description |
| ----------------------------------- | ---- | ----------- |
| PeerIDs | Array      | Key value pairs linking PeerIDs to thier respective IP addresses  |


#### :pushpin: Examples


#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
	{
        \"userpass\": \"${userpass}\",
        \"method\": \"get_peers_info\"
    }
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result":{
  	"12D3KooWM8BrDBXc1TVw2vswoqYcQVn7fFvpAvcCfaV2Uqg2L9jU":["/ip4/89.248.168.39/tcp/38890"],
  	"12D3KooWJ3dEWK7ym1uwc5SmwbmfFSRmELrA9aPJYxFRrQCCNdwF":["/ip4/188.124.46.112/tcp/38890/p2p/12D3KooWJ3dEWK7ym1uwc5SmwbmfFSRmELrA9aPJYxFRrQCCNdwF"],
  	"12D3KooWL6yrrNACb7t7RPyTEPxKmq8jtrcbkcNd6H5G2hK7bXaL":["/ip4/168.119.236.233/tcp/38890/p2p/12D3KooWL6yrrNACb7t7RPyTEPxKmq8jtrcbkcNd6H5G2hK7bXaL"],
  	"12D3KooWPR2RoPi19vQtLugjCdvVmCcGLP2iXAzbDfP3tp81ZL4d":["/ip4/168.119.237.13/tcp/38890/p2p/12D3KooWPR2RoPi19vQtLugjCdvVmCcGLP2iXAzbDfP3tp81ZL4d"],
  	"12D3KooWKxavLCJVrQ5Gk1kd9m6cohctGQBmiKPS9XQFoXEoyGmS":["/ip4/168.119.236.249/tcp/38890/p2p/12D3KooWKxavLCJVrQ5Gk1kd9m6cohctGQBmiKPS9XQFoXEoyGmS"],
  	"12D3KooWDbBdifGp3viDR4dCECEFKepjhwhd2YwAqgNVdXpEeewu":["/ip4/80.82.76.214/tcp/38890"],
  	"12D3KooWJDoV9vJdy6PnzwVETZ3fWGMhV41VhSbocR1h2geFqq9Y":["/ip4/89.248.173.231/tcp/38890"]
  }
}
```

</collapse-text>

</div>
