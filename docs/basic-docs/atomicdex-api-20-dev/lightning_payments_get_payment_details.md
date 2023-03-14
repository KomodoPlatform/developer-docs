### lightning\:\:payments\:\:get_payment_details

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| coin                 | string  | A coin ticker          |
| payment_hash         | string  | The payment hash you would like to view the details for |

```json
{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "lightning::payments::get_payment_details",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "payment_hash": "32f996e6e0aa88e567318beeadb37b6bc0fddfd3660d4a87726f308ed1ec7b33"
    },
    "id": 1
}
```