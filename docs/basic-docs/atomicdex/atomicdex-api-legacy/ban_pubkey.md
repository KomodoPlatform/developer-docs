
## ban\_pubkey

**ban_pubkey pubkey reason**

The `ban_pubkey` method bans the selected pubkey ignoring its order matching messages and preventing its orders from displaying in the orderbook.

::: tip

Use the secp256k1 pubkey without prefix for this method input. E.g. if pubkey is `022cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420` you should submit `2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420`.

:::

#### Arguments

| Structure       | Type                       | Description                                                                   |
| --------------- | -------------------------- | ----------------------------------------------------------------------------- |
| pubkey          | string                     | the pubkey to ban                                                             |
| reason          | string                     | the reason of banning                                                         |

#### Response

| Structure              | Type     | Description                                                                                                                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                 | string   | whether the ban was successful                                                                                                                                                                                  |
                                                                                                                                                               
#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"ban_pubkey\",
  \"pubkey\": \"2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420\",
  \"reason\": \"test\",
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": "success"
}
```

</collapse-text>

</div>
