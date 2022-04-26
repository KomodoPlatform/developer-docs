# get\_public\_key\_hash

The `get_public_key_hash` method returns the [RIPEMD-160](https://en.bitcoin.it/wiki/RIPEMD-160) hash version of your public key


#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |


#### Response

| Structure       | Type   | Description                        |
| --------------- | ------ | ---------------------------------- |
| public_key_hash | string | User's RIPEMD-160 public key hash  |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
{
     \"userpass\": \"${userpass}\",
     \"mmrpc\": \"2.0\",
     \"method\": \"get_public_key_hash\",
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
  "mmrpc": "2.0",
  "result": {
    "public_key_hash": "05aab5342166f8594baf17a7d9bef5d567443327"
  },
  "id": 0
}
```

</collapse-text>

</div>
