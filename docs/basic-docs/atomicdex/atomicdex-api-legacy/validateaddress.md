
## validateaddress

**validateaddress coin address**

The `validateaddress` method checks if an input string is a valid address of the specified coin.

#### Arguments

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| coin      | string | the coin to validate address for        |
| address   | string | the input string to validate            |

#### Response

| Structure       | Type              | Description                                        |
| --------------- | ----------------- | -------------------------------------------------- |
| result.is_valid | bool              | whether input string is a valid coin address       |
| result.reason   | string (optional) | the reason why input string is not a valid address |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783/" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"validateaddress\",
  \"coin\":\"RICK\",
  \"address\":\"RRnMcSeKiLrNdbp91qNVQwwXx5azD4S4CD\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (valid address)

```json
{
  "result":{
    "is_valid":true
  }
}
```

#### Response (invalid cash address)

```json
{
  "result":{
    "is_valid":false,
    "reason":"utxo:415] Checksum verification failed"
  }
}
```

#### Response (invalid ETH address)

```json
{
  "result":{
    "is_valid":false,
    "reason":"eth:360] eth:2522] Invalid address checksum"
  }
}
```

</collapse-text>

</div>
