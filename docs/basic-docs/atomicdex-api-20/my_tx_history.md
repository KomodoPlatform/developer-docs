# my\_tx\_history

This method currently works only for BCH and SLP protocols. Implementation for all other UTXO coins (and other protocols) will be added in future.


| parameter                                 | Type     | Description                               |
| ----------------------------------------- | -------- | ----------------------------------------- |
| ticker                                    | string   | Ticker of the coin to get history for.    |
| limit                                     | integer  | Optional. Limits the number of returned transactions. Defaults to `10`. Ignored if `max = true`. |
| paging_options.FromId                     | string   | Optional. AtomicDEX API will skip records until it reaches this ID, skipping the from_id as well; track the internal_id of the last displayed transaction to find the value of this field for the next page |
| paging_options.PageNumber                 | integer  | Optional. AtomicDEX API will return limit swaps from the selected page. Ignored if `FromId` . | 


# Request (BCH from page 2)


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


## Response
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
        "from": [
          "bitcoincash:ppaa62685yaucdf2a54g3rgtyc9g7yawrvvmqsfumc"
        ],
        "to": [
          "bitcoincash:qqg6z43mlf26up06vgdjufz6hedrtry99cvk5dgcnt"
        ],
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
        "from": [
          "bitcoincash:ppnzkha52y53d7r7qn6mq4mcmaadmxzj4clfgneaxv"
        ],
        "to": [
          "bitcoincash:qqg6z43mlf26up06vgdjufz6hedrtry99cvk5dgcnt"
        ],
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


# Request (HONK with FromId)

```bash
curl --url "http://127.0.0.1:7783" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"my_tx_history\",
  \"mmrpc\":\"2.0\",
  \"params\": {
    \"coin\": \"HONK\",
    \"limit\": 2,
    \"paging_options\": {
      \"FromId\": \"433b641bc89e1b59c22717918583c60ec98421805c8e85b064691705d9aeb970\"
    }
  }
}"
```


## Response

```json
{
  "mmrpc":"2.0",
  "result":{
    "coin":"USDF",
    "current_block":1480496,
    "transactions":[
      {
        "tx_hex":"010000000270fba4f0921a57c550bfe911fa436757cc65f56825f2ff0581aed9775a72fb9c020000006b483045022100c0b9faeb97307ed33db1ac5c5b1b189d7b18267676a3e01d65a48d310651779302205e5be1e1d5ebfeed6994f52c1cc1af2908ff2d9d9b7eb846c7e715e9673e228a4121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff70fba4f0921a57c550bfe911fa436757cc65f56825f2ff0581aed9775a72fb9c030000006b483045022100965eed3d4152262adbacc52f928b59385480cd4ef44e899d2064a6f38503794902205cebbf1abaab0c116f4b63417cdf6a13dd681cf75e520e26caa7257f9064c6454121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff040000000000000000406a04534c500001010453454e4420bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb70800000000000003e808000000000000f9e7e80300000000000017a914fe9318c279369c68cb240c88ef2c2df18cea63e087e8030000000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88acd7bf4601000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88acc3c7ee60",
        "tx_hash":"eebc3d0d231be6a0569c197ffad3f97ab7b0f1d64631640807babae509c918f4",
        "from":[
          "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8"
        ],
        "to":[
          "slptest:prlfxxxz0ymfc6xtysxg3mev9hcce6nruq74at6frt",
          "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8"
        ],
        "total_amount":"6.4975",
        "spent_by_me":"6.4975",
        "received_by_me":"6.3975",
        "my_balance_change":"-0.1000",
        "block_height":1456229,
        "timestamp":1626261653,
        "fee_details":{
          "type":"Utxo",
          "coin":"tBCH",
          "amount":"0.00002"
        },
        "coin":"USDF",
        "internal_id":"cd6ec10b0cd9747ddc66ac5c97c2d7b493e8cea191bc2d847b3498719d4bd989",
        "transaction_type":{
          "TokenTransfer":"bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb7"
        },
        "confirmations":24268
      },
      {
        "tx_hex":"01000000026fd35b26526cebfc7df0b229bde298b04aa853c0499c4c54c12df0118ed84052020000006a47304402203bd00a6a61434abb4fe4359aad6991e28eeb224fc1f4524309bebca89fbe5807022062a38c4e1da944942c6722141df6bae9c44c07ed52fd736e1f8c75e15aaf99f44121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff6fd35b26526cebfc7df0b229bde298b04aa853c0499c4c54c12df0118ed84052030000006b483045022100909a8d0be19172c68c2889f240b1531d4a921bf9df8d081fce172d95c7a971cd02206ab0de0ed044b002341e72678106c558cd5e8565352fd78dcdf88a574c409a754121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff040000000000000000406a04534c500001010453454e4420bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb708000000000000000108000000000000fdcfe8030000000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ace8030000000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88ac8fcb4601000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88acc0c7ee60",
        "tx_hash":"9cfb725a77d9ae8105fff22568f565cc576743fa11e9bf50c5571a92f0a4fb70",
        "from":[
          "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8"
        ],
        "to":[
          "slptest:qr9pupr5t6x2p3sd33vgz5ca2xlvgur58u8m6uhlr8",
          "slptest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsg8lecug8"
        ],
        "total_amount":"6.4976",
        "spent_by_me":"6.4976",
        "received_by_me":"6.4975",
        "my_balance_change":"-0.0001",
        "block_height":1456229,
        "timestamp":1626261653,
        "fee_details":{
          "type":"Utxo",
          "coin":"tBCH",
          "amount":"0.00002"
        },
        "coin":"USDF",
        "internal_id":"1c1e68357cf5a6dacb53881f13aa5d2048fe0d0fab24b76c9ec48f53884bed97",
        "transaction_type":{
          "TokenTransfer":"bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb7"
        },
        "confirmations":24268
      }
    ],
    "sync_status":{
      "state":"Finished"
    },
    "limit":2,
    "skipped":6,
    "total":121,
    "total_pages":61,
    "paging_options":{
      "FromId":"433b641bc89e1b59c22717918583c60ec98421805c8e85b064691705d9aeb970"
    }
  },
  "id":null
}
```

## Error - Coin not active
```json
{
  "mmrpc":"2.0",
  "error":"USDF",
  "error_path":"my_tx_history_v2.lp_coins",
  "error_trace":"my_tx_history_v2:324] lp_coins:1924]",
  "error_type":"CoinIsNotActive",
  "error_data":"USDF",
  "id":null
}
```

## Error - Coin not compatible
```json
{
  "mmrpc":"2.0",
  "error":"BNBT",
  "error_path":"my_tx_history_v2",
  "error_trace":"my_tx_history_v2:336]",
  "error_type":"NotSupportedFor",
  "error_data":"BNBT",
  "id":null
}
```

## Error - Coin enabled without tx_history = true
```json
{
  "mmrpc":"2.0",
  "error":"Storage is not initialized for BCH",
  "error_path":"my_tx_history_v2",
  "error_trace":"my_tx_history_v2:343]",
  "error_type":"StorageIsNotInitialized",
  "error_data":"Storage is not initialized for BCH",
  "id":null
}
```


## Error - Local database failed
```json
{
  "mmrpc":"2.0",
  "error":"SqliteFailure(Error { code: Unknown, extended_code: 1 }, Some(\"no such column: block_height\"))",
  "error_path":"my_tx_history_v2.sql_tx_history_storage",
  "error_trace":"my_tx_history_v2:351] sql_tx_history_storage:472]",
  "error_type":"StorageError",
  "error_data":"SqliteFailure(Error { code: Unknown, extended_code: 1 }, Some(\"no such column: block_height\"))",
  "id":null
}
```

