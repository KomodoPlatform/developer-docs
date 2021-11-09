# add\_delegation


The `add_delegation` method initiates your node's staking of a compatible coin. Currently QTUM and tQTUM (test tokens avalable at http://testnet-faucet.qtum.info/) have been integrated, but this functionality will be expanded to more coins in future.

Note: Only UTXOs of 100 QTUM / tQTUM will be actively staked. It is recomended to consolidate your balance into a single UTXO before initiating delegated staking. After running `add_delegation`, you will need to broadcast the returned hex via [`send_raw_transaction`](../atomicdex-api-legacy/send_raw_transaction.html) to complete the process. Staking will only work with legacy QTUM addresses (segwit addresses are not supported).

### Arguments

| Structure | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| coin      | string | the coin being staked           |
| staking_details.type      | string | the protocol being staked           |
| staking_details.address      | string | the delegated staker address           |


#### :pushpin: Examples

#### Command

```bash
curl --location --request POST "http://127.0.0.1:7783" \
--header "Content-Type: application/json" \
--data-raw "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"add_delegation\",
    \"params\": {
        \"coin\": \"tQTUM\",
        \"staking_details\": {
            \"type\": \"Qtum\",
            \"address\": \"qcyBHeSct7Wr4mAw18iuQ1zW5mMFYmtmBE\"
        }
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
    "tx_hex": "01000000017fdeb56c5b601454731451aa4daa004a7e1993e196462159c5e5360545fb9965000000006b483045022100c4101e0a70560dd8480404a620ac48a36a509c779cd3eb294d5b07f0447109ea0220145096570e6661fa52bf5df4b23329108959cb58cb02f1629e01cefb2d55fca6012102641b541e35bc915e375c8038f1099a977bc6736aa7265e9f65b7270b70d34366ffffffff020000000000000000fd0301540310552201284ce44c0e968c000000000000000000000000d4ea77298fdac12c657a18b222adc8b307e18127000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004120bf35729611a42875b49e890b7330c94a5227259b2cd987f885aaea3a08bad3897266a39db2d34f8009efa95eb877083b1eefccf2257f02cc0aa2e8db9a7f3eea00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000086c200c4a0ba030000001976a914c36ac1020b1eae632079692e7bef350d279489c988acb4db8061",
    "tx_hash": "308c91fd50ec0f724d8c9f5601676b93889ae072b369b7a3d62684d6c3c60e7b",
    "from": ["qbNeoqCbBu4hySDUzgmo666faYH3qgaeKz"],
    "to": ["qbNeoqCbBu4hySDUzgmo666faYH3qgaeKz"],
    "total_amount": "161.064",
    "spent_by_me": "161.064",
    "received_by_me": "160.16",
    "my_balance_change": "-0.904",
    "block_height": 0,
    "timestamp": 1635834804,
    "fee_details": {
      "type": "Qrc20",
      "coin": "tQTUM",
      "miner_fee": "0.004",
      "gas_limit": 2250000,
      "gas_price": 40,
      "total_gas_fee": "0.9"
    },
    "coin": "tQTUM",
    "internal_id": "",
    "transaction_type": "StakingDelegation"
  },
  "id": 0
}
```

#### Response (error - already delegating)

```json
{
  "mmrpc": "2.0",
  "error": "Already delegating to: qcyBHeSct7Wr4mAw18iuQ1zW5mMFYmtmBE",
  "error_path": "qtum_delegation",
  "error_trace": "qtum_delegation:222]",
  "error_type": "AlreadyDelegating",
  "error_data": "qcyBHeSct7Wr4mAw18iuQ1zW5mMFYmtmBE",
  "id": 0
}
```


</collapse-text>

</div>