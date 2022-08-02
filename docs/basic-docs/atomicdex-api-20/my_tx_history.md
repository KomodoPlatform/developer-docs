# my\_tx\_history

This method currently works only for BCH and SLP protocols. Implementation for all other UTXO coins (and other protocols) will be added in future.


| parameter                                 | Type     | Description                               |
| ----------------------------------------- | -------- | ----------------------------------------- |
| ticker                                    | string   | Ticker of the coin to get history for.    |
| limit                                     | integer  | Optional. Limits the number of returned transactions. Defaults to `10`. Ignored if `max = true`. |
| paging_options.FromId                     | string   | Optional. AtomicDEX API will skip records until it reaches this ID, skipping the from_id as well; track the internal_id of the last displayed transaction to find the value of this field for the next page |
| paging_options.PageNumber                 | integer  | Optional. AtomicDEX API will return limit swaps from the selected page. Ignored if `FromId` . | 


# Request (tBCH from page 2)


```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"my_tx_history",
  "mmrpc":"2.0",
  "params": {
    "coin": "tBCH",
    "limit": 2,
    "paging_options": {
      "PageNumber": 2
    }
  }
}'
```


## Response
```json
{
  "mmrpc":"2.0",
  "result":{
    "coin":"tBCH",
    "current_block":1480496,
    "transactions":[
      {
        "tx_hex":"0100000001a789174935fb6af2d669b52d03e4dc37dbf0d6afced2d598c54bb692c02367d7010000006b483045022100c3fee0b751f098debd3cfd6befdcd7210f192840143655dee95157c20c9731920220548dab4ddaabd4da92c838d036853a97d6ab98af6d4d8894f82f261c9ed14aa34121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff013dfcad00000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88acda865161",
        "tx_hash":"091877294268b2b1734255067146f15c3ac5e6199e72cd4f68a8d9dec32bb0c0",
        "from":[
          "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66"
        ],
        "to":[
          "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66"
        ],
        "total_amount":"0.11403301",
        "spent_by_me":"0.11403301",
        "received_by_me":"0.11402301",
        "my_balance_change":"-0.00001000",
        "block_height":1467009,
        "timestamp":1632733367,
        "fee_details":{
          "type":"Utxo",
          "coin":"tBCH",
          "amount":"0.00001"
        },
        "coin":"tBCH",
        "internal_id":"091877294268b2b1734255067146f15c3ac5e6199e72cd4f68a8d9dec32bb0c0",
        "transaction_type":"StandardTransfer",
        "confirmations":13488
      },
      {
        "tx_hex":"010000000190e35c09c83b5818b441c18a2d5ec54734851e5581fb21bde7936e77c6c3dca8030000006b483045022100e6b1415cbd81f2d04360597fba65965bc77ab5a972f5b8f8d5c0f1b1912923c402206a63f305f03e9c49ffba6c71c7a76ef60631f67dce7631f673a0e8485b86898d4121036879df230663db4cd083c8eeb0f293f46abc460ad3c299b0089b72e6d472202cffffffff020000000000000000376a04534c500001010453454e4420bb309e48930671582bea508f9a1d9b491e49b69be3d6f372dc08da2ac6e90eb70800000000000003e82500ae00000000001976a9148cfffc2409d063437d6aa8b75a009b9ba51b71fc88ac62715161",
        "tx_hash":"d76723c092b64bc598d5d2ceafd6f0db37dce4032db569d6f26afb35491789a7",
        "from":[
          "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66"
        ],
        "to":[
          "bchtest:qzx0llpyp8gxxsmad25twksqnwd62xm3lsnnczzt66"
        ],
        "total_amount":"0.11404301",
        "spent_by_me":"0.11404301",
        "received_by_me":"0.11403301",
        "my_balance_change":"-0.00001000",
        "block_height":1467000,
        "timestamp":1632728165,
        "fee_details":{
          "type":"Utxo",
          "coin":"tBCH",
          "amount":"0.00001"
        },
        "coin":"tBCH",
        "internal_id":"d76723c092b64bc598d5d2ceafd6f0db37dce4032db569d6f26afb35491789a7",
        "transaction_type":"StandardTransfer",
        "confirmations":13497
      }
    ],
    "sync_status":{
      "state":"InProgress",
      "additional_info":{
        "transactions_left":123
      }
    },
    "limit":2,
    "skipped":2,
    "total":9,
    "total_pages":5,
    "paging_options":{
      "PageNumber":2
    }
  },
  "id":null
}
```


# Request (HONK with FromId)

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"my_tx_history",
  "mmrpc":"2.0",
  "params": {
    "coin": "HONK",
    "limit": 2,
    "paging_options": {
      "FromId": "433b641bc89e1b59c22717918583c60ec98421805c8e85b064691705d9aeb970"
    }
  }
}'
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

