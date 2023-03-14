{
    "userpass": "{{userpass}}",
    "mmrpc": "2.0",
    "method": "lightning::payments::list_payments_by_filter",
    "params": {
        "coin": "tBTC-TEST-lightning"
        // "filter": null,
        // // "filter": {
        // //     // "payment_type": null,
        // //     // // "payment_type": {
        // //     // //     "type": "Outbound Payment", // Accepted values: "Outbound Payment", "Inbound Payment"
        // //     // //     "destination": "03933884aaf1d6b108397e5efe5c86bcf2d8ca8d2f700eda99db9214fc2712b134" // Required only if: "type": "Outbound Payment"
        // //     // // },
        // //     // "description": null, // Accepted values: Strings
        // //     // "status": null, // Accepted values: "pending", "succeeded", "failed"
        // //     // "from_amount_msat": null, // Accepted values: Integers
        // //     // "to_amount_msat": null, // Accepted values: Integers
        // //     // "from_fee_paid_msat": null, // Accepted values: Integers
        // //     // "to_fee_paid_msat": null, // Accepted values: Integers
        // //     // "from_timestamp": null, // Accepted values: Integers
        // //     // "to_timestamp": null // Accepted values: Integers
        // // },
        // "limit": 10,
        // "paging_options": {
        //     "PageNumber": 1
        //     // "FromId": "d6d3cf3fd5237ed15295847befe00da67c043da1c39a373bff30bd22442eea43" // used instead of: "PageNumber"
        // }
    }
    // "id": null // Accepted values: Integers
}