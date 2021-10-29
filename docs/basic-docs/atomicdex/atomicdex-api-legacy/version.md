
## version

**version()**

The `version` method returns the AtomicDEX API version.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure | Type   | Description     |
| --------- | ------ | --------------- |
| result    | string | the AtomicDEX API version |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"method\":\"version\",
  \"userpass\":\"$userpass\"
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": "2.0.996_mm2_3bb412578_Linux"
}
```

</collapse-text>

</div>
