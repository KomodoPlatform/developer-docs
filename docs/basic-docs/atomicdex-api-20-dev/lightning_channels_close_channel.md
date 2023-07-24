### lightning\:\:channels\:\:close_channel

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| coin                 | string  | A coin ticker          |
| rpc_channel_id       | integer | Channel ID you would like to see the details of |
| force_close          | boolean | Optional, defaults to `false`. If `true`, will force closing the channel |


```json
{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "lightning::channels::close_channel",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "rpc_channel_id": 1,
        "force_close": false
    },
    "id": 8
}
```
