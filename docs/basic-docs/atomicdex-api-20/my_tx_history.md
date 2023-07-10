# my_tx_history

To use this method, you must activate your coin with `"tx_history": true`. The response will vary depending on the coin.
Currently only BCH & SLP tokens are supported in the master/release API. In the latest dev API, UTXO coins, QTUM, and Tendermint/Tendermint tokens are also supported.
For ZHTLC coins, you must use the [z_coin_tx_history](../atomicdex-api-20-dev/zhtlc_coins.html#z_coin_tx_history) method.
For all other coins, use the legacy [my_tx_history](../atomicdex-api-legacy/my_tx_history.html) method.

#### Arguments

| parameter                 | Type    | Description                                                                                                                                                                                                         |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                      | string  | Ticker of the coin to get history for.                                                                                                                                                                              |
| limit                     | integer | Optional. Limits the number of returned transactions. Defaults to `10`. Ignored if `max = true`.                                                                                                                    |
| paging_options.FromId     | string  | Optional. Komodo DeFi Framework will skip records until it reaches this ID, skipping the from_id as well; track the internal_id of the last displayed transaction to find the value of this field for the next page |
| paging_options.PageNumber | integer | Optional. Komodo DeFi Framework will return limit swaps from the selected page. Ignored if `FromId` .                                                                                                               |

#### Response

| Structure                                     | Type             | Description                                                                                                                                    |
| --------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| transactions                                  | array of objects | transactions data                                                                                                                              |
| from_id                                       | string           | the from_id specified in the request; this value is null if from_id was not set                                                                |
| skipped                                       | number           | the number of skipped records (i.e. the position of `from_id` in the list + 1); this value is 0 if `from_id` was not set                       |
| limit                                         | number           | the limit that was set in the request; note that the actual number of transactions can differ from the specified limit (e.g. on the last page) |
| total                                         | number           | the total number of transactions available                                                                                                     |
| page_number                                   | number           | the page_number that was set in the request                                                                                                    |
| total_pages                                   | number           | total pages available with the selected limit                                                                                                  |
| current_block                                 | number           | the number of the latest block of coin blockchain                                                                                              |
| sync_status                                   | object           | provides the information that helps to track the progress of transaction history preloading at background                                      |
| sync_status.state                             | string           | current state of sync; possible values: `NotEnabled`, `NotStarted`, `InProgress`, `Error`, `Finished`                                          |
| sync_status.additional_info                   | object           | additional info that helps to track the progress; present for `InProgress` and `Error` states only                                             |
| sync_status.additional_info.blocks_left       | number           | present for ETH/ERC20 coins only; displays the number of blocks left to be processed for `InProgress` state                                    |
| sync_status.additional_info.transactions_left | number           | present for UTXO coins only; displays the number of transactions left to be processed for `InProgress` state                                   |
| sync_status.additional_info.code              | number           | displays the error code for `Error` state                                                                                                      |
| sync_status.additional_info.message           | number           | displays the error message for `Error` state                                                                                                   |

## Request (BCH from page 2)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"my_tx_history\",
  \"mmrpc\":\"2.0\",
  \"params\": {
    \"coin\": \"BCH\",
    \"limit\": 2,
    \"paging_options\": {
      \"PageNumber\": 2
    }
  }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "coin": "BCH",
    "target": {
      "type": "iguana"
    },
    "current_block": 772607,
    "transactions": [
      {
        "tx_hex": "0100000001b7b45d92f8f3413a0e5656258e0a51f5c7e8230c0a08cef2ebec1ddbb8f7c28200000000d747304402203ca957fdfcfbba6123d78afe28b17fd4103cc04f6ada4110eb61c2a0350c29b802204215f203d583e8bcc79bd70f33af4f4e27500b5a5375efe75a1c31ec112f3c344120b3f71dbea00eeace7f09b0911de31e46f76a48036b86ccc207dac55540912e01004c6b6304dbf67563b175210315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732ac6782012088a914dde61fe24ea3cfa39379c475702692fa2f080900882103ed00156316c46094c0cbcf21a5ee549a1b3a50938c43096ef499ca28059edca6ac68ffffffff0133980200000000001976a91411a1563bfa55ae05fa621b2e245abe5a358c852e88acdbf67563",
        "tx_hash": "e2167df56142bccdb8c620297f1b6ca3f7c8a955332838430d4d0f62530870f9",
        "from": ["bitcoincash:ppaa62685yaucdf2a54g3rgtyc9g7yawrvvmqsfumc"],
        "to": ["bitcoincash:qqg6z43mlf26up06vgdjufz6hedrtry99cvk5dgcnt"],
        "total_amount": "0.00171035",
        "spent_by_me": "0",
        "received_by_me": "0.00170035",
        "my_balance_change": "0.00170035",
        "block_height": 766923,
        "timestamp": 1668615553,
        "fee_details": {
          "type": "Utxo",
          "coin": "BCH",
          "amount": "0.00001"
        },
        "coin": "BCH",
        "internal_id": "e2167df56142bccdb8c620297f1b6ca3f7c8a955332838430d4d0f62530870f9",
        "transaction_type": "StandardTransfer",
        "confirmations": 5685
      },
      {
        "tx_hex": "0100000001eccfa8c296e7b3e229be28a8ca6a5e5a7e89ee07a2d9441faaf5905679286a3c00000000d7473044022077d38ae45bb7257b152d4cb803aab62ca879cab60e9b3a7ca05ef099078e000402203106be31513c6526c14bdf40b28b4d38f78bb1958fc995e040ac4b2165d9d79141203bffadbc5bf035674f0d0f6e1d1a121fc6d404720679ff9b6610b298b41375a3004c6b6304bc847463b175210315d9c51c657ab1be4ae9d3ab6e76a619d3bccfe830d5363fa168424c0d044732ac6782012088a91457c7ce14c0444edc37ee52ed32b68890b0647cd3882103ed00156316c46094c0cbcf21a5ee549a1b3a50938c43096ef499ca28059edca6ac68ffffffff0163b10200000000001976a91411a1563bfa55ae05fa621b2e245abe5a358c852e88acbc847463",
        "tx_hash": "98ddc27aa161967519f53cb3e91146a23b76ac4e33605f8e827c69f4d9b6de37",
        "from": ["bitcoincash:ppnzkha52y53d7r7qn6mq4mcmaadmxzj4clfgneaxv"],
        "to": ["bitcoincash:qqg6z43mlf26up06vgdjufz6hedrtry99cvk5dgcnt"],
        "total_amount": "0.00177483",
        "spent_by_me": "0",
        "received_by_me": "0.00176483",
        "my_balance_change": "0.00176483",
        "block_height": 766752,
        "timestamp": 1668519015,
        "fee_details": {
          "type": "Utxo",
          "coin": "BCH",
          "amount": "0.00001"
        },
        "coin": "BCH",
        "internal_id": "98ddc27aa161967519f53cb3e91146a23b76ac4e33605f8e827c69f4d9b6de37",
        "transaction_type": "StandardTransfer",
        "confirmations": 5856
      }
    ],
    "sync_status": {
      "state": "Finished"
    },
    "limit": 2,
    "skipped": 2,
    "total": 16,
    "total_pages": 8,
    "paging_options": {
      "PageNumber": 2
    }
  },
  "id": null
}
```

</collapse-text>

</div>

## Request (TTT-SLP with FromId)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"my_tx_history\",
  \"mmrpc\":\"2.0\",
  \"params\": {
    \"coin\": \"TTT-SLP\",
    \"limit\": 2,
    \"paging_options\": {
      \"FromId\": \"433b641bc89e1b59c22717918583c60ec98421805c8e85b064691705d9aeb970\"
    }
  }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "coin": "TTT-SLP",
    "target": {
      "type": "iguana"
    },
    "current_block": 772612,
    "transactions": [
      {
        "tx_hex": "0200000002365a29eb638da7fc57720ad6c99fdbc6cfb9c957920cfb62fd69e494b412c1c1020000006b483045022100de81bca8cfef2f95b3da8aa89edf4f5cc6cf489c565d0965b8142380ef3986f1022062d6ed47f2cd281f4860a27e835949aafbab89eeb0865fbf2280a283dfb7c417412102b9fdfedefde71b21523974b9f24a4b6a1b83c5640b839baa6eb14418cae08191ffffffffc1f73b403f893f93d95b8c7dfa1b59bb5445109d4c51107da1e08fb770e54136010000006a47304402203658375dac3b84ae17e72cf3f5157b8ad25e7caee0629fa8708868974f8d58b402206f38d016ed4e390d783627441685692d21b889d83919abd39368cba28f43f544412102b9fdfedefde71b21523974b9f24a4b6a1b83c5640b839baa6eb14418cae08191ffffffff040000000000000000406a04534c500001010453454e44205321508197ffed321c5fc9a1427e5c68b31d2c1ec92ae1c495f8acb08d8d66cd080000000000002710080000002278c569d322020000000000001976a914d346067e3c3c3964c395fee208594790e29ede5d88ac22020000000000001976a914580af35e3553d57b4b3a2036f4959f10246e98c788ac68955e03000000001976a914580af35e3553d57b4b3a2036f4959f10246e98c788ac00000000",
        "tx_hash": "7b58248f3486079951a57d6dbd41c019a83f2b876c9fa3afa6fcc5a7c595b837",
        "from": ["simpleledger:qpvq4u67x4fa276t8gsrday4nugzgm5ccu4usawss8"],
        "to": [
          "simpleledger:qpvq4u67x4fa276t8gsrday4nugzgm5ccu4usawss8",
          "simpleledger:qrf5vpn78s7rjexrjhlwyzzeg7gw98k7t5va3wuz4v"
        ],
        "total_amount": "1480551016.67",
        "spent_by_me": "0",
        "received_by_me": "100",
        "my_balance_change": "100",
        "block_height": 772211,
        "timestamp": 1671817336,
        "fee_details": {
          "type": "Utxo",
          "coin": "BCH",
          "amount": "0.00000482"
        },
        "coin": "TTT-SLP",
        "internal_id": "57b78eb912a704921640a589d8bb42bb147dfb88c3d1b4b2e3df910be6b9ab31",
        "transaction_type": {
          "TokenTransfer": "5321508197ffed321c5fc9a1427e5c68b31d2c1ec92ae1c495f8acb08d8d66cd"
        },
        "confirmations": 402
      }
    ],
    "sync_status": {
      "state": "Finished"
    },
    "limit": 10,
    "skipped": 0,
    "total": 1,
    "total_pages": 1,
    "paging_options": {
      "FromId": "433b641bc89e1b59c22717918583c60ec98421805c8e85b064691705d9aeb970"
    }
  },
  "id": null
}
```

</collapse-text>

</div>

## Request (IRIS with limit = 50)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"my_tx_history\",
  \"mmrpc\":\"2.0\",
  \"params\": {
    \"coin\": \"IRIS\",
    \"limit\": 50
  }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "coin": "IRIS",
    "target": {
      "type": "iguana"
    },
    "current_block": 18120346,
    "transactions": [
      {
        "tx_hex": "0a2a6961613136647271766c33753873756b667375346c6d3371736b32386a72336661686a6139767376366b122a6961613136647271766c33753873756b667375346c6d3371736b32386a72336661686a6139767376366b1a110a05756972697312083130303030303030",
        "tx_hash": "B34A8D5AD74067F01A0207DF1851A14673C859D8A6F4FB0CBE292D2104C143CA",
        "from": ["iaa16drqvl3u8sukfsu4lm3qsk28jr3fahja9vsv6k"],
        "to": ["iaa16drqvl3u8sukfsu4lm3qsk28jr3fahja9vsv6k"],
        "total_amount": "10.044559",
        "spent_by_me": "10.044559",
        "received_by_me": "10",
        "my_balance_change": "-0.044559",
        "block_height": 18120218,
        "timestamp": 1673016440,
        "fee_details": {
          "type": "Tendermint",
          "coin": "IRIS",
          "amount": "0.044559",
          "gas_limit": 100000
        },
        "coin": "IRIS",
        "internal_id": "4644373032304131304637363034374441354438413433420000000000000000",
        "transaction_type": "StandardTransfer",
        "memo": "while you are out, buy milk",
        "confirmations": 129
      },
      {
        "tx_hex": "0a2a6961613136647271766c33753873756b667375346c6d3371736b32386a72336661686a6139767376366b122a696161317a78733476776c36326b687174376e7a7276687a676b34377467366365706677707a673537711a4d0a446962632f3237333934464230393244324543434435363132334337344633364534433146393236303031434541444139434139374541363232423235463431453545423212053130303030",
        "tx_hash": "09ADDD3427A3BA4B0A94023456DF534DB5B9B6821EC17C7C1B2C168EFCF49F26",
        "from": ["iaa16drqvl3u8sukfsu4lm3qsk28jr3fahja9vsv6k"],
        "to": [],
        "total_amount": "0.051788",
        "spent_by_me": "0.051788",
        "received_by_me": "0",
        "my_balance_change": "-0.051788",
        "block_height": 17996530,
        "timestamp": 1672232661,
        "fee_details": {
          "type": "Tendermint",
          "coin": "IRIS",
          "amount": "0.051788",
          "gas_limit": 100000
        },
        "coin": "IRIS",
        "internal_id": "0000000000000000303941444444333432374133424134423041393430323334",
        "transaction_type": "FeeForTokenTx",
        "memo": null,
        "confirmations": 123817
      },
      {
        "tx_hex": "0a2a6961613136647271766c33753873756b667375346c6d3371736b32386a72336661686a6139767376366b1240343133433843414333434142363945454632344432423643414238314146454344383044413745323731433237343637453142324635463337314446353241441a4061353539343834666536316665383630326465383632353964643263663031613865393437306437666635346262323536336233393035646462366238366535",
        "tx_hash": "4E30C074CED6825F3E1B6584C376A426C20FDEFC9A22EB17D8E7DA4139FA0AEB",
        "from": ["iaa16drqvl3u8sukfsu4lm3qsk28jr3fahja9vsv6k"],
        "to": [],
        "total_amount": "182.742425",
        "spent_by_me": "0.053103",
        "received_by_me": "182.689322",
        "my_balance_change": "182.636219",
        "block_height": 17981793,
        "timestamp": 1672138900,
        "fee_details": {
          "type": "Tendermint",
          "coin": "IRIS",
          "amount": "0.053103",
          "gas_limit": 100000
        },
        "coin": "IRIS",
        "internal_id": "3438353642314533463532383644454334373043303345340000000000000000",
        "transaction_type": {
          "CustomTendermintMsg": {
            "msg_type": "SignClaimHtlc",
            "token_id": null
          }
        },
        "memo": null,
        "confirmations": 138554
      }
    ],
    "sync_status": {
      "state": "NotStarted"
    },
    "limit": 50,
    "skipped": 0,
    "total": 3,
    "total_pages": 1,
    "paging_options": {
      "PageNumber": 1
    }
  },
  "id": null
}
```

</collapse-text>

</div>

## Error cases

### Error - Coin not active

```json
{
  "mmrpc": "2.0",
  "error": "TTT-SLP",
  "error_path": "my_tx_history_v2.lp_coins",
  "error_trace": "my_tx_history_v2:389] lp_coins:2847]",
  "error_type": "CoinIsNotActive",
  "error_data": "TTT-SLP",
  "id": null
}
```

### Error - Coin not compatible

```json
{
  "mmrpc": "2.0",
  "error": "TTT-SLP",
  "error_path": "my_tx_history_v2",
  "error_trace": "my_tx_history_v2:336]",
  "error_type": "NotSupportedFor",
  "error_data": "TTT-SLP",
  "id": null
}
```

### Error - Coin enabled without tx_history = true

```json
{
  "mmrpc": "2.0",
  "error": "Storage is not initialized for TTT-SLP",
  "error_path": "my_tx_history_v2",
  "error_trace": "my_tx_history_v2:343]",
  "error_type": "StorageIsNotInitialized",
  "error_data": "Storage is not initialized for TTT-SLP",
  "id": null
}
```

### Error - Local database failed

```json
{
  "mmrpc": "2.0",
  "error": "SqliteFailure(Error { code: Unknown, extended_code: 1 }, Some(\"no such column: block_height\"))",
  "error_path": "my_tx_history_v2.sql_tx_history_storage",
  "error_trace": "my_tx_history_v2:351] sql_tx_history_storage:472]",
  "error_type": "StorageError",
  "error_data": "SqliteFailure(Error { code: Unknown, extended_code: 1 }, Some(\"no such column: block_height\"))",
  "id": null
}
```
