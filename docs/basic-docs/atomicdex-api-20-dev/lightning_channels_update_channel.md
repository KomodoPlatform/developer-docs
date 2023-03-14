
```json
{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "lightning::channels::update_channel",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "rpc_channel_id": 1,
        "channel_options": {
            // "proportional_fee_in_millionths_sats": 0, // Default: Coin Config
            // "base_fee_msat": 1000, // Default: Coin Config
            // "cltv_expiry_delta": 72, // Default: Coin Config
            // "max_dust_htlc_exposure_msat": 5000000, // Default: Coin Config
            // "force_close_avoidance_max_fee_satoshis": 1000 // Default: Coin Config
        }
    },
    "id": 1
}

```
