### lightning\:\:nodes\:\:remove_trusted_node

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| coin                 | string  | A coin ticker          |
| node_id              | string  | ID of node you would like to remove to your trusted list |

```json
{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "lightning::nodes::remove_trusted_node",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "node_id": "038863cf8ab91046230f561cd5b386cbff8309fa02e3f0c3ed161a3aeb64a643b9"
    },
    "id": 1
}
```
