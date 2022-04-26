# get\_public\_key

The `get_public_key` method returns the compressed secp256k1 pubkey corresponding to the user's seed phrase.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure  | Type   | Description      |
| ---------- | ------ | ---------------- |
| public_key | string | User's pubkey    |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
{
     \"userpass\": \"${userpass}\",
     \"mmrpc\": \"2.0\",
     \"method\": \"get_public_key\",
     \"params\": {},
     \"id\": 0
}
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "mmrpc":"2.0",
  "result":{
    "public_key":"0366d28a7926fb20287132692c4cef7bc7e00e76da064948676f8549c0ed7114d3"
  },
  "id":0
}
```

</collapse-text>

</div>
