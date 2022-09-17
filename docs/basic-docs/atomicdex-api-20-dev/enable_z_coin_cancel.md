## task::enable_z_coin::cancel

If you want to cancel the enabling process before it has completed, you can use this method.


#### Arguments

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | The identifying number returned when initiating the enabling process.                                              |


#### Response

| Structure              | Type              | Description                                                    |
| ---------------------- | ----------------- | -------------------------------------------------------------- |
| result                 | string            | Indicates task cancellation was succesful.                     |
| error                  | string            | An error message to explain what went wrong.                   |
| error_path             | string            | An indicator of the class or function which reurned the error. |
| error_trace            | string            | An indicator of where in the source code the error was thrown. |
| error_type             | string            | An enumerated value for the returned  error.                   |
| error_data             | string            | The input task ID which resulted in the error.                 |


#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"${userpass}\",
    \"method\": \"task::enable_z_coin::cancel\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"task_id\": $1
    }
}"
echo
```


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)


```json
{
  "mmrpc": "2.0",
  "result": "success",
  "id": null
}
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success - already finished)


```json
{
  "mmrpc": "2.0",
  "error": "Task is finished already",
  "error_path": "init_standalone_coin.manager",
  "error_trace": "init_standalone_coin:144] manager:101]",
  "error_type": "TaskFinished",
  "error_data": 0,
  "id": null
}
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (error - no such task)


```json
{
  "mmrpc": "2.0",
  "error": "No such task '1'",
  "error_path": "init_standalone_coin",
  "error_trace": "init_standalone_coin:119]",
  "error_type": "NoSuchTask",
  "error_data": 1,
  "id": null
}

```

</collapse-text>

</div>


To see more examples for other platforms like Fantom, Avalanche & Harmony, you can search the [AtomicDEX API Coin Activation Commands List
](http://stats.kmd.io/atomicdex/activation_commands/) or build a single `batch` command to enable a set of selected coins via the 
[Batch Coin Activation Form](http://stats.kmd.io/atomicdex/batch_activation_form/)


::: tip

We welcome volunteers to test new coins for AtomicDEX API compatibility! Follow the [Submitting Coin Test Results guide](https://github.com/KomodoPlatform/coins#about-this-repository) for more information, or drop into the [Komodo Platform Discord Server](https://komodoplatform.com/discord) for a chat if you need some help.

:::
