### lightning\:\:payments\:\:send_payment

| Parameter  | Type    | Description |
|------------|---------|-------------|
| coin       | string  | A coin ticker                           |
| payment    | object  | [Lightning payment object](/basic-docs/atomicdex/common-structures.html#Lightning_payment)  |


```json
{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "lightning::payments::send_payment",
    "params": {
        "coin": "tBTC-TEST-lightning",
        "payment": {
            "type": "invoice", // Accepted values: "invoice", "keysend"
            "invoice": "lntb20u1p32wwxapp5p8gjy2e79jku5tshhq2nkdauv0malqqhzefnqmx9pjwa8h83cmwqdp8xys9xcmpd3sjqsmgd9czq3njv9c8qatrvd5kumcxqrrsscqp79qy9qsqsp5m473qknpecv6ajmwwtjw7keggrwxerymehx6723avhdrlnxmuvhs54zmyrumkasvjp0fvvk2np30cx5xpjs329alvm60rwy3payrnkmsd3n8ahnky3kuxaraa3u4k453yf3age7cszdxhjxjkennpt75erqpsfmy4y" // Required only if: "type": "invoice"
            // "destination": "038863cf8ab91046230f561cd5b386cbff8309fa02e3f0c3ed161a3aeb64a643b9", // Required only if: "type": "keysend"
            // "amount_in_msat": 1000, // Required only if: "type": "keysend"
            // "expiry": 24 // Required only if: "type": "keysend"
        }
    }
    // "id": null // Accepted values: Integers
}
```