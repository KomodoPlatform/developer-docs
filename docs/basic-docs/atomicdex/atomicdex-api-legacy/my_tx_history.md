# my\_tx\_history

**my_tx_history (from_id limit=10 max=false page_number)**

The `my_tx_history` method returns the blockchain transactions involving the AtomicDEX API node's coin address.

The coin that is used must have `tx_history` set to true in its [enable](../../../basic-docs/atomicdex/atomicdex-api.html#enable) or [electrum](../../../basic-docs/atomicdex/atomicdex-api.html#electrum) call.

#### Arguments

| Structure   | Type   | Description                                                                                                                                                                                 |
| ----------  | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin        | string | the name of the coin for the history request                                                                                                                                                |
| limit       | number | limits the number of returned transactions; ignored if `max = true`                                                                                                                         |
| max         | bool   | whether to return all available records; defaults to `false`                                                                                                                                |
| from_id     | string | AtomicDEX API will skip records until it reaches this ID, skipping the `from_id` as well; track the `internal_id` of the last displayed transaction to find the value of this field for the next page |
| page_number | number | AtomicDEX API will return limit swaps from the selected page; This param will be ignored if from_uuid is set.                                                                                         |

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

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_tx_history\",\"coin\":\"RICK\",\"limit\":1,\"from_id\":\"1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1\"}"
```

#### Command (max = true)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_tx_history\",\"coin\":\"RICK\",\"max\":true,\"from_id\":\"1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e1\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result": {
    "current_block": 172418,
    "from_id": null,
    "limit": 1,
    "skipped": 0,
    "sync_status": {
      "additional_info": {
        "transactions_left": 126
      },
      "state": "InProgress"
    },
    "total": 5915,
    "total_pages": 5915,
    "page_number": null,
    "transactions": [
      {
        "block_height": 172409,
        "coin": "ETOMIC",
        "confirmations": 10,
        "fee_details": {
          "type": "Utxo",
          "amount": "0.00001"
        },
        "from": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
        "internal_id": "903e5d71b8717205314a71055fe8bbb868e7b76d001fbe813a34bd71ff131e93",
        "my_balance_change": "-0.10001",
        "received_by_me": "0.8998513",
        "spent_by_me": "0.9998613",
        "timestamp": 1566539526,
        "to": [
          "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
          "bJrMTiiRiLHJHc6RKQgesKTg1o9VVuKwT5"
        ],
        "total_amount": "0.9998613",
        "tx_hash": "903e5d71b8717205314a71055fe8bbb868e7b76d001fbe813a34bd71ff131e93",
        "tx_hex": "0400008085202f8901a242dc691de64c732e823ed0a4d8cfa6a230f8e31bc9bd21499009f1a90b855a010000006b483045022100d83113119004ac0504f812a853a831039dfc4b0bc1cb863d2c7a94c0670f07e902206af87b846b18c0d5e38bd874d43918e0400e4b6b838ab0793f5976843daa20cd012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff02809698000000000017a9144327a5516b28f66249576c18d15debf6dfbd1124876a105d05000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac047f5f5d000000000000000000000000000000"
      }
    ]
  }
}
```

#### Response (error)

```json
{
  "error": "lp_coins:1011] from_id 1d5c1b67f8ebd3fc480e25a1d60791bece278f5d1245c5f9474c91a142fee8e2 is not found"
}
```

#### Response (History too large in electrum mode)

```json
{
  "result": {
    "current_block": 144753,
    "from_id": null,
    "limit": 0,
    "skipped": 0,
    "sync_status": {
      "additional_info": {
        "code": -1,
        "message": "Got `history too large` error from Electrum server. History is not available"
      },
      "state": "Error"
    },
    "total": 0,
    "transactions": []
  }
}
```

#### Response (Sync in progress for UTXO coins)

```json
{
  "result": {
    "current_block": 148300,
    "from_id": null,
    "limit": 0,
    "skipped": 0,
    "sync_status": {
      "additional_info": {
        "transactions_left": 1656
      },
      "state": "InProgress"
    },
    "total": 3956,
    "transactions": []
  }
}
```

#### Response (Sync in progress for ETH/ERC20 coins)

```json
{
  "result": {
    "current_block": 8039935,
    "from_id": null,
    "limit": 0,
    "skipped": 0,
    "sync_status": {
      "additional_info": {
        "blocks_left": 2158991
      },
      "state": "InProgress"
    },
    "total": 0,
    "transactions": []
  }
}
```

#### Response (Successful result in case of ETH/ERC20 coins)

```json
{
  "result": {
    "current_block": 9071551,
    "from_id": null,
    "limit": 3,
    "skipped": 0,
    "total_pages": 14,
    "page_number": 1,
    "sync_status": {
      "state": "Finished"
    },
    "total": 41,
    "transactions": [
      {
        "block_height": 8980257,
        "coin": "ETH",
        "confirmations": 91295,
        "fee_details": {
          "type": "Eth",
          "coin": "ETH",
          "gas": 57196,
          "gas_price": "0.000000027",
          "total_fee": "0.001544292"
        },
        "from": ["0xE4406Af4CA1dcB05AFE384eBfF3c1F233dCA176A"],
        "internal_id": "3978545ce08ca4c7f4b92e10b6c61efc6ce436f35f8a23f4e6a2e74f309cfd0a",
        "my_balance_change": "-0.010193732",
        "received_by_me": "0",
        "spent_by_me": "0.010193732",
        "timestamp": 1574423598,
        "to": ["0x8500AFc0bc5214728082163326C2FF0C73f4a871"],
        "total_amount": "0.00864944",
        "tx_hash": "e578a719896ec5f1475c273e02fbdd3cf283d9808c20db336f110e4b4faef10c",
        "tx_hex": "f8f11b850649534e00830249f0948500afc0bc5214728082163326c2ff0c73f4a871871eba9eaeb4c000b884152cf3af1b065716fc0c8254828abed3061c181f73a3c698cf1bc0fc8620e158448988050000000000000000000000007296a0cbae6ccfa5cddff9130569731a3b7da419d068b8936743ace66f192407debdcfc38445674e000000000000000000000000000000000000000000000000000000000000000000000000000000005dd808491ba0c78ad466381e0db9fb01f103d9e5c9d9c0c9cb28ee02bf990dc6371313c71bc3a0624e653559cfb19141a67e567e2e1fd4ca1ccd73f40d8b3672d14bd37072dad1"
      },
      {
        "block_height": 8953592,
        "coin": "ETH",
        "confirmations": 117960,
        "fee_details": {
          "type": "Eth",
          "coin": "ETH",
          "gas": 57196,
          "gas_price": "0.00000001",
          "total_fee": "0.00057196"
        },
        "from": ["0xE4406Af4CA1dcB05AFE384eBfF3c1F233dCA176A"],
        "internal_id": "15a3891932876cae74933b66bbfc2bba95b3e09c025152dd8b8d8023ad9a5fbd",
        "my_balance_change": "-0.31519846",
        "received_by_me": "0",
        "spent_by_me": "0.31519846",
        "timestamp": 1574038246,
        "to": ["0x8500AFc0bc5214728082163326C2FF0C73f4a871"],
        "total_amount": "0.3146265",
        "tx_hash": "235be0e6ac3860a637ec0c1d0ec2c364e85ab5cd54659c6987c37b2ba3378ffb",
        "tx_hex": "f8f21a8502540be400830249f0948500afc0bc5214728082163326c2ff0c73f4a87188045dc722816ca800b884152cf3af84519291dc1e8ea4efe055a1c27e6d33a74137164f5799352c1e10798e7a403c000000000000000000000000ee4398a7ab0a610daab82fef97affae44a5ce1464fd4d66db1e00256442acacc546a8a67433217de000000000000000000000000000000000000000000000000000000000000000000000000000000005dd226fb1ca030a665aeb07080e959e8027663d8f6af4069477c1ec8c712566108a9525b9629a052123cb075c404ff14d5281bd48232185590464de034bc6c86a818e699e4e288"
      },
      {
        "block_height": 8952273,
        "coin": "ETH",
        "confirmations": 119279,
        "fee_details": {
          "type": "Eth",
          "coin": "ETH",
          "gas": 49472,
          "gas_price": "0.00000001",
          "total_fee": "0.00049472"
        },
        "from": ["0x8500AFc0bc5214728082163326C2FF0C73f4a871"],
        "internal_id": "8796cee96c32121cd2ca9fef9d23affb4c173cf719a08e03436cf92e6ae90668",
        "my_balance_change": "0.29278494869327806",
        "received_by_me": "0.29278494869327806",
        "spent_by_me": "0",
        "timestamp": 1574019481,
        "to": ["0xE4406Af4CA1dcB05AFE384eBfF3c1F233dCA176A"],
        "total_amount": "0.29278494869327806",
        "tx_hash": "4d02298575e9abf0d18ea2abb4d7f02ddba9266019fe4952eb6fa90f90775850",
        "tx_hex": "f9010a198502540be400830249f0948500afc0bc5214728082163326c2ff0c73f4a87180b8a402ed292b0b6ed2b0bbdc333949f4847ffe567064a2a9c2239bcef95abd7f8408321dba3d00000000000000000000000000000000000000000000000004102e5c0e719d6cad1841132d7f23ffedb0e036ae85a80a337dface71b2d494893c16603686073500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f2b27558e45a3f44853e78b3c4bd05217723f841ba007650709e390395e659776b2ec390d951e2ab82ebcd7c540ce73dc6d352bc399a00d727f58ab77970c62bd92a356d057738b88f36fa4948c57b9b50de0815a951f"
      }
    ]
  }
}
```

</collapse-text>

</div>
