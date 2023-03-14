## connect\_to\_node

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| coin                 | string  | A coin ticker          |
| node_address         | string  | URI to a lighning node |

{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "lightning::nodes::connect_to_node",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "node_address": "038863cf8ab91046230f561cd5b386cbff8309fa02e3f0c3ed161a3aeb64a643b9@203.132.94.196:9735"
    }
    "id": 1
}