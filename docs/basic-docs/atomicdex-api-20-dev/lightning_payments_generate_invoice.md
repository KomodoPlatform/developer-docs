### lightning\:\:payments\:\:generate_invoice

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| coin                 | string  | Ticker of coin                              |
| description          | object  | Description of the invoice                  |
| amount_in_msat       | integer | Max number of records to return (optional)  |
| expiry               | integer | Epoch timestamp of expiry (optional)        |



```json
{
    "userpass": "userpass",
    "mmrpc": "2.0",
    "method": "lightning::payments::generate_invoice",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "description": "test invoice"
    },
    "id": 56
}

```

```json
{
    "userpass": "userpass",
    "mmrpc": "2.0",
    "method": "lightning::payments::generate_invoice",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "description": "test invoice",
        "amount_in_msat": null,
        "expiry": null 
    },
    "id": 56
}
```
