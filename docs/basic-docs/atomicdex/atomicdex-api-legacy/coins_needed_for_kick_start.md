
## coins\_needed\_for\_kick\_start

**coins_needed_for_kick_start()**

If the AtomicDEX API is stopped while making a swap/having the active order it will attempt to kick-start them on next launch and continue from the point where it's stopped. `coins_needed_for_kick_start` returns the tickers of coins that should be activated ASAP after the AtomicDEX API is started to continue the interrupted swaps. Consider calling this method on AtomicDEX API startup and activate the returned coins using `enable` or `electrum` methods.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure | Type             | Description                                                              |
| --------- | ---------------- | ------------------------------------------------------------------------ |
| result    | array of strings | tickers of coins that should be activated to kick-start swaps and orders |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"coins_needed_for_kick_start\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (BTC and KMD should be activated ASAP in this case)

```json
{ "result": ["BTC", "KMD"] }
```

#### Response (no swaps and orders waiting to be started)

```json
{ "result": [] }
```

</collapse-text>

</div>
