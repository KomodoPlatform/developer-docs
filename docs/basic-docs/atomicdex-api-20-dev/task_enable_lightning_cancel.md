### task\:\:enable_lightning\:\:cancel

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| task_id              | integer | The task id returned from [task::enable_lightning::init](/basic-docs/atomicdex-api-20-dev/lighting-tasks.html#task_enable_lightning_init)         |

```json
{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "task::enable_lightning::cancel",
    "params": {
        "task_id": 0
    },
    "id": 1
}
```