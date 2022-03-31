# unban\_pubkeys

**unban_pubkeys type data**

The `unban_pubkeys` method will remove all currently banned pubkeys from your ban list, or specific pubkeys from a user defined list.

::: tip

Use the secp256k1 pubkey without prefix for this method input. E.g. if pubkey is `022cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420` you should submit `2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420`.

:::

#### Arguments

| Structure       | Type                       | Description                                                                   |
| --------------- | -------------------------- | ----------------------------------------------------------------------------- |
| pubkey          | string                     | the pubkey to ban                                                             |
| unban_by.type   | string                     | `All` to unban all pubkeys, or `Few` to provide a list of pubkeys to unban    |
| unban_by.data   | list                       | A list of pubkeys to unbanned. Only required when `type` is `Few`.            |


#### Response

| Structure              | Type     | Description                                                                                                                                             |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------|
| result                 | string   | Whether the ban was successful                                                                                                                          |
| result.still_banned    | list     | List of pubkeys which remain banned. For each `pubkey`, the reason it was banned `pubkey.reason` and the type of of ban `pubkey.type` is also returned. |
| result.unbanned        | list     | List of pubkeys which were unbanned. For each `pubkey`, the reason it was banned `pubkey.reason` and the type of of ban `pubkey.type` is also returned. |
| result.were_not_banned | list     | If using `unban_by.type: Few` this will return a list of pubkeys which were not banned, but had been requested to be unbanned.                          |


#### :pushpin: Examples


#### Command

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"unban_pubkeys\",\"unban_by\":{\"type\":\"All\"}}"

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"unban_pubkeys\",
  \"unban_by\": {\"type\":\"All\"}
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result":{
    "still_banned":{},
    "unbanned":{
      "2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420":{
        "type":"Manual",
        "reason":"testing"
      }
    },
    "were_not_banned":[]
  }
}
```
</collapse-text>

</div>

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\": \"$userpass\",
  \"method\": \"unban_pubkeys\",
  \"unban_by\": {\"type\":\"Few\"},
  \"data\":[\"2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420\", \"2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520422\"]
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "still_banned": {
      "2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520421":{
        "type":"Manual",
        "reason":"testing"
      }
    },
    "unbanned": {
      "2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520420": {
        "type":"Manual",
        "reason":"testing"
      }
    },
  "were_not_banned": ["2cd3021a2197361fb70b862c412bc8e44cff6951fa1de45ceabfdd9b4c520422"]
  }
}
```

</collapse-text>

</div>
