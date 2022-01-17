# recreate\_swap\_data

The `recreate_swap_data` can assist in the event of local stored swap data being lost due to storage errors related to low disk space or hardware failure, and if required, aid with the refunding of failed swaps.

To source the opposite side of the trade, please [contact the Komodo Support team on Discord](https://discord.gg/RRZ8hzc). You will need to provide details about the trade you are trying to recover, such as the coins and amounts being traded, the approximate time of the trade, any known transaction IDs involved in the trade, and if available the UUID of the trade. 

#### Arguments

| Structure | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| swap      | object | Swap data from other side of trade. For example to recreate a Maker's swap data, the input would be the corresponding Taker's swap data            |

#### Response

| Structure | Type   | Description               |
| --------- | ------ | ------------------------- |
| result    | object | Opposite side's swap data. For example if a Taker's swap data is input, the reponse would be the corresponding Maker's swap data.            |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
{
     \"userpass\": \"${userpass}\",
     \"mmrpc\": \"2.0\",
     \"method\": \"recreate_swap_data\",
     \"params\": {
          \"swap\": {
              \"type\": \"Taker\",
              \"uuid\": \"f87fa9ce-0820-4675-b85d-db18c7bc9fb4\",
              \"my_order_uuid\": \"f87fa9ce-0820-4675-b85d-db18c7bc9fb4\",
              \"events\": [
                  {
                      \"timestamp\": 1638984440546,
                      \"event\": {
                          \"type\": \"Started\",
                          \"data\": {
                              \"taker_coin\": \"MORTY\",
                              \"maker_coin\": \"RICK\",
                              \"maker\": \"15d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732\",
                              \"my_persistent_pub\": \"03b1e544ce2d860219bc91314b5483421a553a7b33044659eff0be9214ed58addd\",
                              \"lock_duration\": 7800,
                              \"maker_amount\": \"0.9090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909091\",
                              \"taker_amount\": \"1\",
                              \"maker_payment_confirmations\": 1,
                              \"maker_payment_requires_nota\": false,
                              \"taker_payment_confirmations\": 1,
                              \"taker_payment_requires_nota\": false,
                              \"taker_payment_lock\": 1638992240,
                              \"uuid\": \"f87fa9ce-0820-4675-b85d-db18c7bc9fb4\",
                              \"started_at\": 1638984440,
                              \"maker_payment_wait\": 1638987560,
                              \"maker_coin_start_block\": 1207822,
                              \"taker_coin_start_block\": 1222573,
                              \"fee_to_send_taker_fee\": {
                                  \"coin\": \"MORTY\",
                                  \"amount\": \"0.00001\",
                                  \"paid_from_trading_vol\": false
                              },
                              \"taker_payment_trade_fee\": {
                                  \"coin\": \"MORTY\",
                                  \"amount\": \"0.00001\",
                                  \"paid_from_trading_vol\": false
                              },
                              \"maker_payment_spend_trade_fee\": {
                                  \"coin\": \"RICK\",
                                  \"amount\": \"0.00001\",
                                  \"paid_from_trading_vol\": true
                              }
                          }
                      }
                  },
                  {
                      \"timestamp\": 1638984456603,
                      \"event\": {
                          \"type\": \"Negotiated\",
                          \"data\": {
                              \"maker_payment_locktime\": 1639000040,
                              \"maker_pubkey\": \"0315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732\",
                              \"secret_hash\": \"4da9e7080175e8e10842e0e161b33cd298cab30b\",
                              \"maker_coin_swap_contract_addr\": null,
                              \"taker_coin_swap_contract_addr\": null
                          }
                      }
                  },
                  {
                      \"timestamp\": 1638984456814,
                      \"event\": {
                          \"type\": \"TakerFeeSent\",
                          \"data\": {
                              \"tx_hex\": \"0400008085202f89016383e8aced2256378bb126a1ca1a41e2f344d9295f65b3ea4b99055c5eb4a6cb000000006a47304402201c7e661e0dbeb9b3eb6e4e9e3194010e5772227017772b2e48c1b8d48ed3b21f02201c2eda64e74455fa1878a5c221f25d22fe626abd0078a26a9fc0f829e0921639012103b1e544ce2d860219bc91314b5483421a553a7b33044659eff0be9214ed58adddffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac74c3e90b000000001976a91483762a373935ca241d557dfce89171d582b486de88ac08ebb061000000000000000000000000000000\",
                              \"tx_hash\": \"fcb49167c79e8e014143643b94878866f7e80b26c5a5dcf693010543da70b5bc\"
                          }
                      }
                  },
                  {
                      \"timestamp\": 1638984457822,
                      \"event\": {
                          \"type\": \"MakerPaymentReceived\",
                          \"data\": {
                              \"tx_hex\": \"0400008085202f8901c41fdf6b9d8aea4b472f83e4fa0d99dfafc245e897d681fd2ca7df30707fbf48020000006b483045022100c7b294bd46cbf3b13530879a43c5cf67414047266d8b64c3c7263b5e75b989ba02201974f38d688b184bc44e628806c6ab2ac9092f394729d0ce838f14e1e76117c001210315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732ffffffff03a2296b050000000017a91491c45f69e1760c12a1f90fb2a811f6dfde35cc35870000000000000000166a144da9e7080175e8e10842e0e161b33cd298cab30bac503d64000000001976a9141462c3dd3f936d595c9af55978003b27c250441f88ac09ebb061000000000000000000000000000000\",
                              \"tx_hash\": \"6287e0d30951cd859bfb837eb1e5409f7596e75ffeb2e61fd6df1843bfd0203d\"
                          }
                      }
                  },
                  {
                      \"timestamp\": 1638984457826,
                      \"event\": {
                          \"type\": \"MakerPaymentWaitConfirmStarted\"
                      }
                  },
                  {
                      \"timestamp\": 1638984503611,
                      \"event\": {
                          \"type\": \"MakerPaymentWaitConfirmFailed\",
                          \"data\": {
                              \"error\": \"An error\"
                          }
                      }
                  },
                  {
                      \"timestamp\": 1638984503615,
                      \"event\": {
                          \"type\": \"Finished\"
                      }
                  }
              ],
              \"maker_amount\": \"0.9090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909091\",
              \"maker_coin\": \"RICK\",
              \"taker_amount\": \"1\",
              \"taker_coin\": \"MORTY\",
              \"gui\": \"atomicDEX 0.5.1 iOS\",
              \"mm_version\": \"1b065636a\",
              \"success_events\": [
                  \"Started\",
                  \"Negotiated\",
                  \"TakerFeeSent\",
                  \"MakerPaymentReceived\",
                  \"MakerPaymentWaitConfirmStarted\",
                  \"MakerPaymentValidatedAndConfirmed\",
                  \"TakerPaymentSent\",
                  \"TakerPaymentSpent\",
                  \"MakerPaymentSpent\",
                  \"Finished\"
              ],
              \"error_events\": [
                  \"StartFailed\",
                  \"NegotiateFailed\",
                  \"TakerFeeSendFailed\",
                  \"MakerPaymentValidateFailed\",
                  \"MakerPaymentWaitConfirmFailed\",
                  \"TakerPaymentTransactionFailed\",
                  \"TakerPaymentWaitConfirmFailed\",
                  \"TakerPaymentDataSendFailed\",
                  \"TakerPaymentWaitForSpendFailed\",
                  \"MakerPaymentSpendFailed\",
                  \"TakerPaymentWaitRefundStarted\",
                  \"TakerPaymentRefunded\",
                  \"TakerPaymentRefundFailed\"
              ]
          }
     },
     \"id\": 0
}
"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
    "mmrpc": "2.0",
    "result": {
        "swap": {
            "type": "Maker",
            "uuid": "f87fa9ce-0820-4675-b85d-db18c7bc9fb4",
            "my_order_uuid": "f87fa9ce-0820-4675-b85d-db18c7bc9fb4",
            "events": [
                {
                    "timestamp": 1638984440546,
                    "event": {
                        "type": "Started",
                        "data": {
                            "taker_coin": "MORTY",
                            "maker_coin": "RICK",
                            "taker": "b1e544ce2d860219bc91314b5483421a553a7b33044659eff0be9214ed58addd",
                            "secret": "0000000000000000000000000000000000000000000000000000000000000000",
                            "secret_hash": "4da9e7080175e8e10842e0e161b33cd298cab30b",
                            "my_persistent_pub": "0315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732",
                            "lock_duration": 7800,
                            "maker_amount": "0.9090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909091",
                            "taker_amount": "1",
                            "maker_payment_confirmations": 1,
                            "maker_payment_requires_nota": false,
                            "taker_payment_confirmations": 1,
                            "taker_payment_requires_nota": false,
                            "maker_payment_lock": 1639000040,
                            "uuid": "f87fa9ce-0820-4675-b85d-db18c7bc9fb4",
                            "started_at": 1638984440,
                            "maker_coin_start_block": 1207822,
                            "taker_coin_start_block": 1222573,
                            "maker_payment_trade_fee": null,
                            "taker_payment_spend_trade_fee": null
                        }
                    }
                },
                {
                    "timestamp": 1638984456603,
                    "event": {
                        "type": "Negotiated",
                        "data": {
                            "taker_payment_locktime": 1638992240,
                            "taker_pubkey": "03b1e544ce2d860219bc91314b5483421a553a7b33044659eff0be9214ed58addd",
                            "maker_coin_swap_contract_addr": null,
                            "taker_coin_swap_contract_addr": null
                        }
                    }
                },
                {
                    "timestamp": 1638984457822,
                    "event": {
                        "type": "TakerFeeValidated",
                        "data": {
                            "tx_hex": "0400008085202f89016383e8aced2256378bb126a1ca1a41e2f344d9295f65b3ea4b99055c5eb4a6cb000000006a47304402201c7e661e0dbeb9b3eb6e4e9e3194010e5772227017772b2e48c1b8d48ed3b21f02201c2eda64e74455fa1878a5c221f25d22fe626abd0078a26a9fc0f829e0921639012103b1e544ce2d860219bc91314b5483421a553a7b33044659eff0be9214ed58adddffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac74c3e90b000000001976a91483762a373935ca241d557dfce89171d582b486de88ac08ebb061000000000000000000000000000000",
                            "tx_hash": "fcb49167c79e8e014143643b94878866f7e80b26c5a5dcf693010543da70b5bc"
                        }
                    }
                },
                {
                    "timestamp": 1638984457822,
                    "event": {
                        "type": "MakerPaymentSent",
                        "data": {
                            "tx_hex": "0400008085202f8901c41fdf6b9d8aea4b472f83e4fa0d99dfafc245e897d681fd2ca7df30707fbf48020000006b483045022100c7b294bd46cbf3b13530879a43c5cf67414047266d8b64c3c7263b5e75b989ba02201974f38d688b184bc44e628806c6ab2ac9092f394729d0ce838f14e1e76117c001210315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732ffffffff03a2296b050000000017a91491c45f69e1760c12a1f90fb2a811f6dfde35cc35870000000000000000166a144da9e7080175e8e10842e0e161b33cd298cab30bac503d64000000001976a9141462c3dd3f936d595c9af55978003b27c250441f88ac09ebb061000000000000000000000000000000",
                            "tx_hash": "6287e0d30951cd859bfb837eb1e5409f7596e75ffeb2e61fd6df1843bfd0203d"
                        }
                    }
                },
                {
                    "timestamp": 1638984503611,
                    "event": {
                        "type": "TakerPaymentValidateFailed",
                        "data": {
                            "error": "Origin Taker error event: MakerPaymentWaitConfirmFailed(SwapError { error: \"An error\" })"
                        }
                    }
                },
                {
                    "timestamp": 1638984503611,
                    "event": {
                        "type": "MakerPaymentWaitRefundStarted",
                        "data": {
                            "wait_until": 1639003740
                        }
                    }
                }
            ],
            "maker_amount": "0.9090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909090909091",
            "maker_coin": "RICK",
            "taker_amount": "1",
            "taker_coin": "MORTY",
            "gui": "nogui",
            "mm_version": "",
            "success_events": [
                "Started",
                "Negotiated",
                "TakerFeeValidated",
                "MakerPaymentSent",
                "TakerPaymentReceived",
                "TakerPaymentWaitConfirmStarted",
                "TakerPaymentValidatedAndConfirmed",
                "TakerPaymentSpent",
                "TakerPaymentSpendConfirmStarted",
                "TakerPaymentSpendConfirmed",
                "Finished"
            ],
            "error_events": [
                "StartFailed",
                "NegotiateFailed",
                "TakerFeeValidateFailed",
                "MakerPaymentTransactionFailed",
                "MakerPaymentDataSendFailed",
                "MakerPaymentWaitConfirmFailed",
                "TakerPaymentValidateFailed",
                "TakerPaymentWaitConfirmFailed",
                "TakerPaymentSpendFailed",
                "TakerPaymentSpendConfirmFailed",
                "MakerPaymentWaitRefundStarted",
                "MakerPaymentRefunded",
                "MakerPaymentRefundFailed"
            ]
        }
    },
    "id": null
}
```

</collapse-text>

</div>
