# import\_swaps

**import_swaps swaps**

The `import_swaps` method imports to the local database the `swaps` data that was exported from another AtomicDEX API instance.

Use this method in combination with `my_swap_status` or `my_recent_swaps` to copy the swap history between different devices.

#### Arguments

| Structure | Type             | Description                                                             |
| --------- | ---------------- | ----------------------------------------------------------------------- |
| swaps     | array of objects | swaps data; each record has the format of the `my_swap_status` response |

#### Response

| Structure       | Type             | Description                                                  |
| --------------- | ---------------- | ------------------------------------------------------------ |
| result.imported | array of strings | uuids of swaps that were successfully imported               |
| result.imported | map              | uuids of swaps that failed to import; includes error message |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"import_swaps\",\"swaps\":[{"error_events":["StartFailed","NegotiateFailed","TakerFeeSendFailed","MakerPaymentValidateFailed","TakerPaymentTransactionFailed","TakerPaymentDataSendFailed","TakerPaymentWaitForSpendFailed","MakerPaymentSpendFailed","TakerPaymentRefunded","TakerPaymentRefundFailed"],"events":[{"event":{"data":{"lock_duration":7800,"maker":"631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640","maker_amount":"3","maker_coin":"BEER","maker_coin_start_block":156186,"maker_payment_confirmations":0,"maker_payment_wait":1568883784,"my_persistent_pub":"02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3","started_at":1568881184,"taker_amount":"4","taker_coin":"ETOMIC","taker_coin_start_block":175041,"taker_payment_confirmations":1,"taker_payment_lock":1568888984,"uuid":"07ce08bf-3db9-4dd8-a671-854affc1b7a3"},"type":"Started"},"timestamp":1568881185316},{"event":{"data":{"maker_payment_locktime":1568896784,"maker_pubkey":"02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640","secret_hash":"eba736c5cc9bb33dee15b4a9c855a7831a484d84"},"type":"Negotiated"},"timestamp":1568881246025},{"event":{"data":{"tx_hash":"0c07be4dda88d8d75374496aa0f27e12f55363ce8d558cb5feecc828545e5f87","tx_hex":"0400008085202f890146b98696761d5e8667ffd665b73e13a8400baab4b22230a7ede0e4708597ee9c000000006a473044022077acb70e5940dfe789faa77e72b34f098abbf0974ea94a0380db157e243965230220614ec4966db0a122b0e7c23aa0707459b3b4f8241bb630c635cf6e943e96362e012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff02f0da0700000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac68630700000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac5e3a835d000000000000000000000000000000"},"type":"TakerFeeSent"},"timestamp":1568881250689},{"event":{"data":{"tx_hash":"31d97b3359bdbdfbd241e7706c90691e4d7c0b7abd27f2b22121be7f71c5fd06","tx_hex":"0400008085202f8901b4679094d4bf74f52c9004107cb9641a658213d5e9950e42a8805824e801ffc7010000006b483045022100b2e49f8bdc5a4b6c404e10150872dbec89a46deb13a837d3251c0299fe1066ca022012cbe6663106f92aefce88238b25b53aadd3522df8290ced869c3cc23559cc23012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0200a3e1110000000017a91476e1998b0cd18da5f128e5bb695c36fbe6d957e98764c987c9bf0000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac753a835d000000000000000000000000000000"},"type":"MakerPaymentReceived"},"timestamp":1568881291571},{"event":{"type":"MakerPaymentWaitConfirmStarted"},"timestamp":1568881291571},{"event":{"type":"MakerPaymentValidatedAndConfirmed"},"timestamp":1568881291985},{"event":{"data":{"tx_hash":"95926ab204049edeadb370c17a1168d9d79ee5747d8d832f73cfddf1c74f3961","tx_hex":"0400008085202f8902875f5e5428c8ecfeb58c558dce6353f5127ef2a06a497453d7d888da4dbe070c010000006a4730440220416059356dc6dde0ddbee206e456698d7e54c3afa92132ecbf332e8c937e5383022068a41d9c208e8812204d4b0d21749b2684d0eea513467295e359e03c5132e719012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff46b98696761d5e8667ffd665b73e13a8400baab4b22230a7ede0e4708597ee9c010000006b483045022100a990c798d0f96fd5ff7029fd5318f3c742837400d9f09a002e7f5bb1aeaf4e5a0220517dbc16713411e5c99bb0172f295a54c97aaf4d64de145eb3c5fa0fc38b67ff012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff020084d7170000000017a9144d57b4930e6c86493034f17aa05464773625de1c877bd0de03010000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac8c3a835d000000000000000000000000000000"},"type":"TakerPaymentSent"},"timestamp":1568881296904},{"event":{"data":{"secret":"fb968d5460399f20ffd09906dc8f65c21fbb5cb8077a8e6d7126d0526586ca96","transaction":{"tx_hash":"68f5ec617bd9a4a24d7af0ce9762d87f7baadc13a66739fd4a2575630ecc1827","tx_hex":"0400008085202f890161394fc7f1ddcf732f838d7d74e59ed7d968117ac170b3adde9e0404b26a929500000000d8483045022100a33d976cf509d6f9e66c297db30c0f44cced2241ee9c01c5ec8d3cbbf3d41172022039a6e02c3a3c85e3861ab1d2f13ba52677a3b1344483b2ae443723ba5bb1353f0120fb968d5460399f20ffd09906dc8f65c21fbb5cb8077a8e6d7126d0526586ca96004c6b63049858835db1752102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac6782012088a914eba736c5cc9bb33dee15b4a9c855a7831a484d84882102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac68ffffffff011880d717000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac942c835d000000000000000000000000000000"}},"type":"TakerPaymentSpent"},"timestamp":1568881328643},{"event":{"data":{"error":"taker_swap:798] utxo:950] utxo:950] error"},"type":"MakerPaymentSpendFailed"},"timestamp":1568881328645},{"event":{"type":"Finished"},"timestamp":1568881328648}],"my_info":{"my_amount":"4","my_coin":"ETOMIC","other_amount":"3","other_coin":"BEER","started_at":1568881184},"recoverable":true,"success_events":["Started","Negotiated","TakerFeeSent","MakerPaymentReceived","MakerPaymentWaitConfirmStarted","MakerPaymentValidatedAndConfirmed","TakerPaymentSent","TakerPaymentSpent","MakerPaymentSpent","Finished"],"type":"Taker","uuid":"07ce08bf-3db9-4dd8-a671-854affc1b7a3"}]}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": {
    "imported": ["07ce08bf-3db9-4dd8-a671-854affc1b7a3"],
    "skipped": {
      "1af6bb5e-e131-4b06-b235-36fae8daab0a": "lp_swap:424] File already exists"
    }
  }
}
```

</collapse-text>

</div>
