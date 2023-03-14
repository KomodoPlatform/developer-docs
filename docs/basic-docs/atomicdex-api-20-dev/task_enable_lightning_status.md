### task\:\:enable\_lightning\:\:status

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| task_id              | integer | The task id returned from [task::enable_lightning::init](/basic-docs/atomicdex-api-20-dev/lighting-tasks.html#task_enable_lightning_init)                                   |
| forget_if_finished   | boolean | Optional, defaults to `true`. If `false`, task_is status will still be available after the task has completed |

```json
{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "task::enable_lightning::status",
    "params": {
        "task_id": 0,
        "forget_if_finished": true
    },
    "id": 2
}
```