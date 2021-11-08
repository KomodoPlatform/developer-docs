# stop\_simple\_market\_maker\_bot

The `stop_simple_market_maker_bot` method tells the bot to finish placing orders at the end of the current loop (30 seconds minimum & 30 seconds by default). This method takes as input a url to a price service, and configuration parameters of the pairs to trade at a defined spread percentage value. 

At the end of the final loop, orders placed by the bot will be cancelled. Users should wait until the loop ends before exiting the AtomicDEX API, otherwise orders will not cancel, and will reappear on the orderbook next time AtomicDEX API starts. 

### Arguments

| Structure                       | Type    | Description                               |
| ------------------------------- | ------- | ----------------------------------------- |
| (none   )                       |         |                                           |

#### :pushpin: Examples


#### Command

```bash
curl --location --request POST 'http://127.0.0.1:7783' \
--header 'Content-Type: application/json' \
--data-raw "{
    \"userpass\": \"${userpass}\",
    \"mmrpc\": \"2.0\",
    \"method\": \"stop_simple_market_maker_bot\",
    \"params\": {},
    \"id\": 0
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
    "mmrpc":"2.0",
    "result":{
        "result":"Success"
    },
    "id":0
}

```

#### Response (error - bot already stopped)

```json
{
    "mmrpc":"2.0",
    "error":"The bot is already stopped",
    "error_path":"simple_market_maker",
    "error_trace":"simple_market_maker:813]",
    "error_type":"AlreadyStopped",
    "id":0
}
```

</collapse-text>

</div>