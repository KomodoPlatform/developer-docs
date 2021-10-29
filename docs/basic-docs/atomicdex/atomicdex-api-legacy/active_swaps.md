
## active\_swaps

**active_swaps (include_status)**

The `active_swaps` method returns all the swaps that are currently running on the AtomicDEX API node.

#### Arguments

| Structure      | Type                          | Description                                                             |
| -------------- | ----------------------------- | ----------------------------------------------------------------------- |
| include_status | bool                          | whether to include swap statuses in response; defaults to `false`       |

#### Response

| Structure             | Type             | Description                                                                                                |
| --------------------- | ---------------- | ---------------------------------------------------------------                                            |
| result                | result object    |                                                                                                            |
| result.uuids          | array of strings | uuids of currently running swaps                                                                           |
| result.statuses       | object (map)     | the `uuid -> swap status` map of currently running swaps; `null` if include_status is false in the request |

#### :pushpin: Examples

#### Command (without include_status)

```bash
curl --url "http://127.0.0.1:7783" --data "
{
  \"userpass\":\"$userpass\",
  \"method\":\"active_swaps\"
}
"

```

#### Command (include_status = true)

```bash
curl --url "http://127.0.0.1:7783" --data "
{
  \"userpass\":\"$userpass\",
  \"method\":\"active_swaps\",
  \"include_status\": true
}
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (uuids only)

```json
{
  "result":{
    "uuids":[
      "015c13bc-da79-43e1-a6d4-4ac8b3099b34",
      "7592a07a-2805-4050-8ab8-984480e812f0",
      "82cbad96-ea9f-40fb-9225-07496323e35d",
      "177f7fa5-c9f3-4673-a2fa-28451a123e61"
    ]
  }
}
```

#### Response (statuses included)

```json
{
  "uuids": [
    "5d02843e-d1b4-488d-aad0-114d82020453"
  ],
  "statuses": {
    "5d02843e-d1b4-488d-aad0-114d82020453": {
      "type": "Taker",
      "uuid": "5d02843e-d1b4-488d-aad0-114d82020453",
      "events": [
        {
          "timestamp": 1612780908698,
          "event": {
            "type": "Started",
            "data": {
              "taker_coin": "MORTY",
              "maker_coin": "RICK",
              "maker": "7310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
              "my_persistent_pub": "03ad6f89abc2e5beaa8a3ac28e22170659b3209fe2ddf439681b4b8f31508c36fa",
              "lock_duration": 7800,
              "maker_amount": "1",
              "taker_amount": "1",
              "maker_payment_confirmations": 1,
              "maker_payment_requires_nota": false,
              "taker_payment_confirmations": 1,
              "taker_payment_requires_nota": false,
              "taker_payment_lock": 1612788708,
              "uuid": "5d02843e-d1b4-488d-aad0-114d82020453",
              "started_at": 1612780908,
              "maker_payment_wait": 1612784028,
              "maker_coin_start_block": 793472,
              "taker_coin_start_block": 797356,
              "fee_to_send_taker_fee": {
                "coin": "MORTY",
                "amount": "0.00001"
              },
              "taker_payment_trade_fee": {
                "coin": "MORTY",
                "amount": "0.00001"
              },
              "maker_payment_spend_trade_fee": {
                "coin": "RICK",
                "amount": "0"
              }
            }
          }
        },
        {
          "timestamp": 1612780924704,
          "event": {
            "type": "Negotiated",
            "data": {
              "maker_payment_locktime": 1612796508,
              "maker_pubkey": "037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
              "secret_hash": "026bebc2e19c243d0940dd583c9573bf10377afd"
            }
          }
        },
        {
          "timestamp": 1612780924962,
          "event": {
            "type": "TakerFeeSent",
            "data": {
              "tx_hex": "0400008085202f8901f425fbefe21f33ccb7b487df251191b27dfa7b639b04f60e5493c7ea41dbf149000000006b483045022100d5ec3e542175479bd4bd011e19b76a75e99f19cc49867e5bca9541950322c33a02207a4d1ffd674fb9760de79bb4929af44d66344b5e182de3c377186deebf6bf376012103ad6f89abc2e5beaa8a3ac28e22170659b3209fe2ddf439681b4b8f31508c36faffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac5ce6f305000000001976a914d55f0df6cb82630ad21a4e6049522a6f2b6c9d4588ac7c152160000000000000000000000000000000",
              "tx_hash": "75323ab7acd64bd35242611fabaec560d9acf2e1f9ca28d3a4aba47a79fb49c4"
            }
          }
        },
        {
          "timestamp": 1612780935966,
          "event": {
            "type": "MakerPaymentReceived",
            "data": {
              "tx_hex": "0400008085202f89028bef955e42107c562e4e02421f25c455723a701573f86c17b4d82e35a7d8f9f7020000006b483045022100b12fc9d95acca76bf5fd8d5c6acc288b454032ba4561b1c2b1f5f33b2cf2926d022017e561bc2cd93308848674b47b2e8ebd8f074ea78e32454d5fea6f08c0b1f1e40121037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ffffffff5dfd0b24c0f7c3cf235868cf9a26ec49574764d135796fc4e7d20e95d55a8653000000006a47304402207c752d14601d1c99892f9d6c88c8ff2f93211640a65b2ee69172a16b908b21e402206f0b66684158445888271a849ab46258ad722496ee64fde055a6f44e36ed2ccc0121037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ffffffff0300e1f5050000000017a9141b85c1a277f44f7d77d52b78e2ba70a0becc2ff9870000000000000000166a14026bebc2e19c243d0940dd583c9573bf10377afda7d26301000000001976a91486f747b28c60ad1130bdd3f84f48eeaf1801ca9888ac87152160000000000000000000000000000000",
              "tx_hash": "27dafe553246553d54f909fbbded80e6d490fdb95ca7b6807d73eca45f0d7a22"
            }
          }
        },
        {
          "timestamp": 1612780935967,
          "event": {
            "type": "MakerPaymentWaitConfirmStarted"
          }
        }
      ],
      "maker_amount": "1",
      "maker_coin": "RICK",
      "taker_amount": "1",
      "taker_coin": "MORTY",
      "gui": null,
      "mm_version": "23c89ced5",
      "success_events": [
        "Started",
        "Negotiated",
        "TakerFeeSent",
        "MakerPaymentReceived",
        "MakerPaymentWaitConfirmStarted",
        "MakerPaymentValidatedAndConfirmed",
        "TakerPaymentSent",
        "TakerPaymentSpent",
        "MakerPaymentSpent",
        "Finished"
      ],
      "error_events": [
        "StartFailed",
        "NegotiateFailed",
        "TakerFeeSendFailed",
        "MakerPaymentValidateFailed",
        "MakerPaymentWaitConfirmFailed",
        "TakerPaymentTransactionFailed",
        "TakerPaymentWaitConfirmFailed",
        "TakerPaymentDataSendFailed",
        "TakerPaymentWaitForSpendFailed",
        "MakerPaymentSpendFailed",
        "TakerPaymentWaitRefundStarted",
        "TakerPaymentRefunded",
        "TakerPaymentRefundFailed"
      ]
    }
  }
}
```

</collapse-text>

</div>
