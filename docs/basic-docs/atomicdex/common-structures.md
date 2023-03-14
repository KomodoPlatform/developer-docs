## Lightning\_channels\_filter

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| channel_id           | string  |             |
| counterparty_node_id | string  |             |
| funding_tx           | string  |             |
| from_funding_value   | integer |             |
| to_funding_value     | integer |             |
| closing_tx           | string  |             |
| closure_reason       | string  |             |
| claiming_tx          | string  |             |
| from_claimed_balance | decimal |             |
| to_claimed_balance   | decimal |             |
| channel_type         | string  | Accepted values: "Outbound", "Inbound" |
| channel_visibility   | string  | Accepted values: "Public", "Private"   |


```
"filter": {
    "channel_id": null, // Accepted values: Strings
    "counterparty_node_id": null, // Accepted values: Strings
    "funding_tx": null, // Accepted values: Strings
    "from_funding_value": null, // Accepted values: Integers
    "to_funding_value": null, // Accepted values: Integers
    "closing_tx": null, // Accepted values: Strings
    "closure_reason": null, // Accepted values: Strings
    "claiming_tx": null, // Accepted values: Strings
    "from_claimed_balance": null, // Accepted values: Decimals
    "to_claimed_balance": null, // Accepted values: Decimals
    "channel_type": null, // Accepted values: "Outbound", "Inbound"
    "channel_visibility": null // Accepted values: "Public", "Private"
}
```

## Paging Options

| Parameter  | Type    | Description                     |
|------------|---------|---------------------------------|
| PageNumber | integer | Offset for paginated results    |
| FromId     | integer | Ignore results priod to this Id |

Use either value, not both.

```
{
    "PageNumber": 1
}
```

```
{
    "FromId": 4
}
```

