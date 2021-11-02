
## cancel\_order

**cancel_order uuid**

The `cancel_order` cancels the active order created by the AtomicDEX API node.

#### Arguments

| Structure | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| uuid      | string | the uuid of the order the user desires to cancel |

#### Response

| Structure | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| result    | string | indicates the status of operation |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"cancel_order\",\"uuid\":\"6a242691-6c05-474a-85c1-5b3f42278f41\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{ "result": "success" }
```

#### Response (error)

```json
{ "error": "Order with uuid 6a242691-6c05-474a-85c1-5b3f42278f42 is not found" }
```

</collapse-text>

</div>
