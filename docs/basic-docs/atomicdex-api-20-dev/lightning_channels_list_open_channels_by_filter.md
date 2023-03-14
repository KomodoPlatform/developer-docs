### lightning\:\:channels\:\:list_open_channels_by_filter

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| coin                 | string  | The ticker of the coin you would like to view closed channels for  |
| filter               | object  | [Lightning open channels filter](/basic-docs/atomicdex/common-structures.html#Lightning_open_channels_filter) (optional)      |
| limit                | string  | Max number of records to return (optional)                         |


```json
{
    "userpass": "userpass",
    "mmrpc": "2.0",
    "method": "lightning::channels::list_open_channels_by_filter",
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
    "method": "lightning::channels::list_open_channels_by_filter",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "filter": {
                "channel_id": null,
                "counterparty_node_id": null,
                "funding_tx": null,
                "from_funding_value_sats": null,
                "to_funding_value_sats": null,
                "is_outbound": null,
                "from_balance_msat": null,
                "to_balance_msat": null,
                "from_outbound_capacity_msat": null,
                "to_outbound_capacity_msat": null,
                "from_inbound_capacity_msat": null,
                "to_inbound_capacity_msat": null,
                "confirmed": null,
                "is_usable": null,
                "is_public": null
        },
        "limit": 10,
        "paging_options": {
           "PageNumber": 1
        }
    },
    "id": 55
}

{
    "userpass": "userpass",
    "mmrpc": "2.0",
    "method": "lightning::channels::list_open_channels_by_filter",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "filter": {
                "channel_id": null,
                "counterparty_node_id": null,
                "funding_tx": null,
                "from_funding_value_sats": null,
                "to_funding_value_sats": null,
                "is_outbound": null,
                "from_balance_msat": null,
                "to_balance_msat": null,
                "from_outbound_capacity_msat": null,
                "to_outbound_capacity_msat": null,
                "from_inbound_capacity_msat": null,
                "to_inbound_capacity_msat": null,
                "confirmed": null,
                "is_usable": null,
                "is_public": null
        },
        "limit": 10,
        "paging_options": {
           "FromId": 4
        }
    },
    "id": 55
}
```
