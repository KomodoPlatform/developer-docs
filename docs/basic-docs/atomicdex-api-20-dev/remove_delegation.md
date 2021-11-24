# remove\_delegation


The `remove_delegation` method stops your node's staking of a compatible coin. Currently QTUM and tQTUM (test tokens avalable at http://testnet-faucet.qtum.info/) have been integrated, but this functionality will be expanded to more coins in future.

Note: After running `remove_delegation`, you will need to broadcast the returned hex via [`send_raw_transaction`](../atomicdex-api-legacy/send_raw_transaction.html) to complete the process.

### Arguments

| Structure | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| coin      | string | the coin being staked           |


#### :pushpin: Examples

#### Command

```bash
curl --location --request POST "http://127.0.0.1:7783" \
--header "Content-Type: application/json" \
--data-raw "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"remove_delegation\",
    \"params\": {
        \"coin\": \"tQTUM\"
    },
    \"id\": 0
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "mmrpc": "2.0",
  "result": {
    "tx_hex": "01000000015c7f32b1b3396ce1bed4f6c161bcc3a5bf5c58e4338c66a24c9de1deffc5b94e000000006a47304402203fcdf1e48f6e43fd718b4aab79c56a7ff81b12304339ddf6d871a3f26f217a7502200c22fa8e2bcc33d16f4bf62feb71f637acbefdd34135314e6aa526e6655cba73012102641b541e35bc915e375c8038f1099a977bc6736aa7265e9f65b7270b70d34366ffffffff020000000000000000225403a086010128043d666e8b140000000000000000000000000000000000000086c280584f00000000001976a914c36ac1020b1eae632079692e7bef350d279489c988acb8d98061",
    "tx_hash": "3564859a7ff902e8d65387c44f6049943582e0b9e29161bf1075a00097e535ae",
    "from": ["qbNeoqCbBu4hySDUzgmo666faYH3qgaeKz"],
    "to": ["qbNeoqCbBu4hySDUzgmo666faYH3qgaeKz"],
    "total_amount": "0.096",
    "spent_by_me": "0.096",
    "received_by_me": "0.052",
    "my_balance_change": "-0.044",
    "block_height": 0,
    "timestamp": 1635834296,
    "fee_details": {
      "type": "Qrc20",
      "coin": "tQTUM",
      "miner_fee": "0.004",
      "gas_limit": 100000,
      "gas_price": 40,
      "total_gas_fee": "0.04"
    },
    "coin": "tQTUM",
    "internal_id": "",
    "transaction_type": "RemoveDelegation"
  },
  "id": 0
}
```

</collapse-text>

</div>