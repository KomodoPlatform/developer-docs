## task\:\:enable_lightning\:\:init

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| name                 | string  | a name for your channel?                 |
| listening port       | integer | Port listening for broadcasts (optional) |
| color                | string  | no idea (optional) |
| backup_path          | string  | no idea (optional) |

{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "task::enable_lightning::init",
    "params": {
        "ticker": "tBTC-TEST-lightning",
        "activation_params": {
            "name": "Mm2TestNode"
        }
    }
    "id": 2
}

{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "task::enable_lightning::init",
    "params": {
        "ticker": "tBTC-TEST-lightning",
        "activation_params": {
            "name": "Mm2TestNode"
            "listening_port": 9735,
            "color": "000000",
            "payment_retries": 5,
            "backup_path": null 
        }
    }
    "id": 2
}