### lightning\:\:channels\:\:list_closed_channels_by_filter

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| coin                 | string  | The ticker of the coin you would like to view closed channels for  |
| filter               | object  | [Lightning closed channels filter](/basic-docs/atomicdex/common-structures.html#Lightning_closed_channel_filter) (optional)      |
| limit                | string  | Max number of records to return (optional)                         |

```json
{
    "userpass": "userpass",
    "mmrpc": "2.0",
    "method": "lightning::channels::list_closed_channels_by_filter",
    "params": {
        "coin": "tBTC-TEST-lightning"
    },
    "id": 55
}
```

```json
{
    "userpass": "userpass",
    "mmrpc": "2.0",
    "method": "lightning::channels::list_closed_channels_by_filter",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "filter": {
                "channel_id": null,
                "counterparty_node_id": null,
                "funding_tx": null,
                "from_funding_value": null,
                "to_funding_value": null,
                "closing_tx": null,
                "closure_reason": null,
                "claiming_tx": null,
                "from_claimed_balance": null,
                "to_claimed_balance": null,
                "channel_type": null,
                "channel_visibility": null
        },
        "limit": 10,
        "paging_options": {
           "PageNumber": 1
        }
    },
    "id": 55
}

```

```json
{
    "userpass": "userpass",
    "mmrpc": "2.0",
    "method": "lightning::channels::list_closed_channels_by_filter",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "filter": {
                "channel_id": null,
                "counterparty_node_id": null,
                "funding_tx": null,
                "from_funding_value": null,
                "to_funding_value": null,
                "closing_tx": null,
                "closure_reason": null,
                "claiming_tx": null,
                "from_claimed_balance": null,
                "to_claimed_balance": null,
                "channel_type": null,
                "channel_visibility": null
        },
        "limit": 10,
        "paging_options": {
           "FromId": 4
        }
    },
    "id": 55
}
```