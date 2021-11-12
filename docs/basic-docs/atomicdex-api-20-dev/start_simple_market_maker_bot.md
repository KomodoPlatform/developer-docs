# start\_simple\_market\_maker\_bot

The AtomicDEX API allows for simple bot trading via the `start_simple_market_maker_bot` method. This method takes as input a url to a price service, and configuration parameters of the pair to trade at a defined spread percentage value. It will update orders every 30 seconds (or higher values if defined with the `bot_refresh_rate` parameter). 

Note: If using a custom prices API endpoint, please ensure it conforms to the same schema as the url in the example.

### Arguments

| Structure                       | Type   | Description                     |
| ------------------------------- | ------- | ----------------------------------------- |
| price_url                       | string  | Link to a price service API               |
| bot_refresh_rate                | float   | Bot loop interval in seconds (optional, 30 sec default)       |
| cfg.name                        | string  | The name assigned to this configuration (e.g. the pair being configured) |
| cfg.name.base                   | string  | Ticker of the coin you wish to sell       |
| cfg.name.rel                    | string  | Ticker of the coin you wish to buy        |
| cfg.name.max                    | boolean | Set to `true` if you would like to trade your whole balance (optional)  |
| cfg.name.max_volume.percentage  | string  | Percentage of balance to trade (optional; can not use at same time as `max_volume.usd`; if greater than 1.0 `max=true` is implied)       |
| cfg.name.max_volume.usd         | string  | Maximum USD trade volume value to trade (optional; can not use at same time as `max_volume.percentage`; if greater than full balance `max=true` is implied)       |
| cfg.name.min_volume.percentage  | string  | Minimum percentage of balance to accept in trade (optional, can not use at same time as `min_volume.usd`)       |
| cfg.name.min_volume.usd         | float   | Minimum USD trade volume of trades accepted for order (optional, can not use at same time as `min_volume.percentage`)       |
| cfg.name.min_base_price         | float   | Minimum USD price of base coin to accept in trade (optional)       |
| cfg.name.min_rel_price          | float   | Minimum USD price of rel coin to accept in trade (optional)       |
| cfg.name.min_pair_price         | float   | Minimum USD price of pair (base/rel) to accept in trade (optional)       |
| cfg.name.spread**               | string  | Target price in relation to prices API value  |
| cfg.name.base_confs             | integer | number of required blockchain confirmations for base coin atomic swap transaction; default to base coin configuration if not set       |
| cfg.name.base_nota              | boolean | whether dPoW notarization is required for base coin atomic swap transaction; default to base coin configuration if not set       |
| cfg.name.rel_confs              | integer | number of required blockchain confirmations for rel coin atomic swap transaction; default to rel coin configuration if not set       |
| cfg.name.rel_nota               | boolean | whether dPoW notarization is required for rel coin atomic swap transaction; default to base coin configuration if not set       |
| cfg.name.enable                 | boolean | Bot will ignore this config entry if set to false       |
| cfg.name.price_elapsed_validity | float   | Will cancel current orders for this pair and not submit a new order if last price update time has been longer than this value in seconds (optional; defaults to 5 minutes)      |
| cfg.name.check_last_bidirectional_trade_thresh_hold | boolean | Will readjust the calculated cex price if a precedent trade exists for the pair (or reversed pair), applied via a [VWAP logic](https://www.investopedia.com/terms/v/vwap.asp#:~:text=VWAP%20is%20calculating%20the%20sum,periods%20there%20are%20(10))) (optional; defaults to false)      |

* Percentage values are within the range of 0-1, such that 0.25 = 25%
* For spread, a value of 1.05 equates to 5% over the value returned from the prices API url.
* At least one of the optional fields `max`, `max_volume.usd` or `max_volume.percentage` must be present, or orders will not be placed.

#### :pushpin: Examples

As demonstrated below, multiple configs can be included within the same command. It is recommended to not exceed 500-1000 simultaneous orders placed to avoid decreased performance.

In the example below, the first config lets the bot know we want to:
- Sell DASH in exchange for KMD
- Use whole of available DASH balance, with minimum trade volume accepted as 25% of your balance
- Sets the sell price at 2.5% over the value returned from the prices API (spread).
- Only accepts values from the prices API that have been updated within the last 30 seconds
- Waits for 3 confirmations and does not wait for a notarisation to progress to the next steps in the atomic swap process
- Checks trade history within the local AtomicDEX API database to never create trades with a sell price that is less than the average trading price.

The second config tells the bot to:
- Sell DASH in exchange for DGB
- Trade at most 50% of your DASH balance, with minimum trade volume accepted at least $20 USD.
- Only place an order when the DASH price is $250 USD or more.
- Sets the sell price at 4% over the value returned from the prices API (spread).
- Only accepts values from the prices API that have been updated within the last 60 seconds
- Waits for 1 confirmation and does not wait for a notarisation to progress to the next steps in the atomic swap process
- Ignores your trade history and average trading price, creating/updating orders regardless.

The third config tells the bot to:
- Sell DASH in exchange for LTC
- Trade at most $500 USD worth of DASH, with minimum trade volume accepted at least $50 USD.
- Only place an order when the DASH price is $250 USD or more.
- Sets the sell price at 5% over the value returned from the prices API (spread).
- Only accepts values from the prices API that have been updated within the last 60 seconds
- Waits for 1 confirmation and does not wait for a notarisation to progress to the next steps in the atomic swap process
- Ignores your trade history and average trading price, creating/updating orders regardless.


#### Command

```bash
curl --location --request POST 'http://127.0.0.1:7783' \
--header 'Content-Type: application/json' \
--data-raw "{
    \"userpass\": \"${userpass}\",
    \"mmrpc\": \"2.0\",
    \"method\": \"start_simple_market_maker_bot\",
    \"params\": {
        \"price_url\": \"http://price.cipig.net:1313/api/v2/tickers?expire_at=600\",
        \"bot_refresh_rate\": 60,
        \"cfg\": {
            \"DASH/KMD\": {

                \"base\": \"DASH\",
                \"rel\": \"KMD\",
                \"max\": true,
                \"min_volume\": {\"percentage\": \"0.25\"},
                \"spread\": \"1.025\",
                \"base_confs\": 3,
                \"base_nota\": false,
                \"rel_confs\": 3,
                \"rel_nota\": false,
                \"enable\": true,
                \"price_elapsed_validity\": 30.0,
                \"check_last_bidirectional_trade_thresh_hold\": true
            },
             \"DASH/DGB\": {
                \"base\": \"DASH\",
                \"rel\": \"DGB\",
                \"balance_percent\": \"0.5\",
                \"min_volume\": {\"usd\": \"20\"},
                \"min_base_price\": \"250\",
                \"spread\": \"1.04\",
                \"base_confs\": 1,
                \"base_nota\": false,
                \"rel_confs\": 1,
                \"rel_nota\": false,
                \"enable\": true,
                \"price_elapsed_validity\": 60.0,
                \"check_last_bidirectional_trade_thresh_hold\": false
            }
        },
             \"DASH/LTC\": {
                \"base\": \"DASH\",
                \"rel\": \"LTC\",
                \"max_volume\": {\"usd\": \"500\"},
                \"min_volume\": {\"usd\": \"50\"},
                \"min_base_price\": \"250\",
                \"spread\": \"1.04\",
                \"base_confs\": 1,
                \"base_nota\": false,
                \"rel_confs\": 1,
                \"rel_nota\": false,
                \"enable\": true,
                \"price_elapsed_validity\": 60.0,
                \"check_last_bidirectional_trade_thresh_hold\": false
            }
        }
    },
    \"id\": 0
}"

```

As we have `\"bot_refresh_rate\": 60,` in the above command, our bot loop will update order prices every 60 seconds, as long as the price service returns data that is no more than 30 seconds old (for DASH/KMD) or no more than 60 seconds old (for DASH/DGB).



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

#### Response (error - bot already started)

```json
{
    "mmrpc":"2.0",
    "error":"The bot is already started",
    "error_path":"simple_market_maker",
    "error_trace":"simple_market_maker:770]",
    "error_type":"AlreadyStarted",
    "id":0
}
```

</collapse-text>

</div>
