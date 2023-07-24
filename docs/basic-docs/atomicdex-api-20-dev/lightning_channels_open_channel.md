
```json
{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "lightning::channels::open_channel",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "node_address": "038863cf8ab91046230f561cd5b386cbff8309fa02e3f0c3ed161a3aeb64a643b9@203.132.94.196:9735",
        "amount": {
            "type": "Exact", // Accepted values: "Exact", "Max"
            "value": 0.004 // Required only if: "type": "Exact"
        }
        // "push_msat": 0,
        // "channel_options": {
        //     // "proportional_fee_in_millionths_sats": 0, // Default: Coin Config
        //     // "base_fee_msat": 1000, // Default: Coin Config
        //     // "cltv_expiry_delta": 72, // Default: Coin Config
        //     // "max_dust_htlc_exposure_msat": 5000000, // Default: Coin Config
        //     // "force_close_avoidance_max_fee_satoshis": 1000 // Default: Coin Config
        // },
        // "channel_configs" : {
        //     // "counterparty_locktime": 144, // Default: Coin Config
        //     // "our_htlc_minimum_msat": 1, // Default: Coin Config
        //     // "negotiate_scid_privacy": false, // Default: Coin Config
        //     // "max_inbound_in_flight_htlc_percent": 10, // Default: Coin Config
        //     // "announced_channel": false, // Default: Coin Config
        //     // "commit_upfront_shutdown_pubkey": true // Default: Coin Config
        // }
    }
    // "id": null // Accepted values: Integers
}

```