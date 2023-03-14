### lightning\:\:channels\:\:get_claimable_balances

| Parameter                      | Type    | Description |
|--------------------------------|---------|-------------|
| coin                           | string  | A coin ticker          |
| include_open_channels_balances | boolean | `true` to include balances from open channels, `false` if not |


```json
{
    "userpass": "userpass",
    "mmrpc": "2.0",
    "method": "lightning::channels::get_claimable_balances",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "include_open_channels_balances": false
    },
    "id": 762
}
```