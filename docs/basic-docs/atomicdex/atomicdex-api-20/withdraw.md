# withdraw

The `withdraw` method generates, signs, and returns a transaction that transfers the `amount` of `coin` to the address indicated in the `to` argument.

This method generates a raw transaction which should then be broadcast using [send_raw_transaction](../../../basic-docs/atomicdex/atomicdex-api.html#send-raw-transaction).

### Arguments

| Structure     | Type             | Description                                                                                                                               |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| coin          | string           | the name of the coin the user desires to withdraw                                                                                         |
| to            | string           | coins are withdrawn to this address                                                                                                       |
| amount        | string (numeric) | the amount the user desires to withdraw, ignored when `max=true`                                                                          |
| max           | bool             | withdraw the maximum available amount                                                                                                     |
| fee.type      | string           | type of transaction fee; possible values: `UtxoFixed`, `UtxoPerKbyte`, `EthGas`                                                           |
| fee.amount    | string (numeric) | fee amount in coin units, used only when type is `UtxoFixed` (fixed amount not depending on tx size) or `UtxoPerKbyte` (amount per Kbyte) |
| fee.gas_price | string (numeric) | used only when fee type is EthGas; sets the gas price in `gwei` units                                                                     |
| fee.gas       | number (integer) | used only when fee type is EthGas; sets the gas limit for transaction                                                                     |

### Response

| Structure                 | Type                       | Description                                                                                                                                                                   |
| ------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                      | array of strings           | coins are withdrawn from this address; the array contains a single element, but transactions may be sent from several addresses (UTXO coins)                                  |
| to                        | array of strings           | coins are withdrawn to this address; this may contain the `my_address` address, where change from UTXO coins is sent                                                          |
| my_balance_change         | string (numeric)           | the expected balance of change in `my_address` after the transaction broadcasts                                                                                               |
| received_by_me            | string (numeric)           | the amount of coins received by `my_address` after the transaction broadcasts; the value may be above zero when the transaction requires that MM2 send change to `my_address` |
| spent_by_me               | string (numeric)           | the amount of coins spent by `my_address`; this value differ from the request amount, as the transaction fee is added here                                                    |
| total_amount              | string (numeric)           | the total amount of coins transferred                                                                                                                                         |
| fee_details               | object                     | the fee details of the generated transaction; this value differs for utxo and ETH/ERC20 coins, check the examples for more details                                            |
| tx_hash                   | string                     | the hash of the generated transaction                                                                                                                                         |
| tx_hex                    | string                     | transaction bytes in hexadecimal format; use this value as input for the `send_raw_transaction` method                                                                        |
| coin                      | string                     | the name of the coin the user wants to withdraw                                                                                                                             |
| kmd_rewards               | object (optional)          | an object containing information about accrued rewards; always exists if the coin is `KMD`                                                                                    |
| kmd_rewards.amount        | string (numeric, optional) | the amount of accrued rewards                                                                                                                                                 |
| kmd_rewards.claimed_by_me | bool (optional)            | whether the rewards been claimed by me                                                                                                                                        |

### :warning: Error types

#### NotSufficientBalance

The `available` balance is not sufficient to transfer the specified amount.

| Structure | Type             | Description                                                                                                                                            |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| coin      | string           | the name of the coin which balance is not sufficient. This coin name may differ from the requested coin. For example, ERC20 fees are paid by ETH (gas) |
| available | string (numeric) | the balance available for transfer                                                                                                                     |
| required  | string (numeric) | the amount required to transfer the specified amount. This amount is necessary but may not be sufficient                                               |

#### ZeroBalanceToWithdrawMax

The available balance is zero.

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### AmountTooLow

The specified amount is too low. Required at least `threshold`.

| Structure | Type             | Description                                          |
| --------- | ---------------- | ---------------------------------------------------- |
| amount    | string (numeric) | the amount the user was willing to transfer          |
| threshold | string (numeric) | the `amount` has not to be less than the `threshold` |

#### InvalidAddress

The specified `to` address is not valid.

| Structure | Type   | Description           |
| --------- | ------ | --------------------- |
| (none)    | string | the error description |

#### InvalidFeePolicy

The specified `fee` is not valid.

| Structure | Type   | Description           |
| --------- | ------ | --------------------- |
| (none)    | string | the error description |

#### NoSuchCoin

The specified coin was not found or is not activated yet.

| Structure | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| coin      | string | the not found `coin` specified in the Request |

#### Transport

The request was failed due to a network error.

| Structure | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| (none)    | string | the transport error description |

#### InternalError

The request was failed due to a MarketMaker internal error.

| Structure | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| (none)    | string | the internal error description |

### :pushpin: Examples

#### Command (BTC, KMD, and other BTC-based forks)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"mmrpc\":\"2.0\",\"method\":\"withdraw\",\"params\":{\"coin\":\"KMD\",\"to\":\"RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh\",\"amount\":\"10\"},\"id\":0}"
```

#### Response (KMD success)

```json
{
  "mmrpc":"2.0",
  "result":{
    "block_height":0,
    "coin":"KMD",
    "fee_details":{
      "type":"Utxo",
      "amount":"0.00001"
    },
    "from":[
      "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
    ],
    "my_balance_change":"-10.00001",
    "received_by_me":"0.34417325",
    "spent_by_me":"10.34418325",
    "to":[
      "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh"
    ],
    "total_amount":"10.34418325",
    "tx_hash":"3a1c382c50a7d12e4675d12ed7e723ce9f0167693dd75fd772bae8524810e605",
    "tx_hex":"0400008085202f890207a8e96978acfb8f0d002c3e4390142810dc6568b48f8cd6d8c71866ad8743c5010000006a47304402201960a7089f2d93480fff68ce0b7ca7bb7a32a52915753ac7ae780abd6162cb1d02202c9b11d442e5f72a532f44ceb10122898d486b1474a10eb981c60c5538b9c82d012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff97f56bf3b0f815bb737b7867e71ddb8198bba3574bb75737ba9c389a4d08edc6000000006a473044022055199d80bd7e2d1b932e54f097c6a15fc4b148d21299dc50067c1da18045f0ed02201d26d85333df65e6daab40a07a0e8a671af9d9b9d92fdf7d7ef97bd868ca545a012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200ca9a3b000000001976a91464ae8510aac9546d5e7704e31ce177451386455588acad2a0d02000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac00000000000000000000000000000000000000",
    "kmd_rewards": {
      "amount": "0.0791809",
      "claimed_by_my": true
    }
  },
  "id":0
}
```

#### Response (NotSufficientBalance error)

```json
{
  "mmrpc":"2.0",
  "error":"Not enough RICK to withdraw: available 69.75066225, required at least 1000.00001",
  "error_path":"utxo_common",
  "error_trace":"utxo_common:1379] utxo_common:449]",
  "error_type":"NotSufficientBalance",
  "error_data":{
    "coin":"RICK",
    "available":"69.75066225",
    "required":"1000.00001"
  },
  "id":0
}
```

#### Command (BTC, KMD, and other BTC-based forks, fixed fee)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"params\":{\"coin\":\"RICK\",\"to\":\"R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW\",\"amount\":\"1.0\",\"fee\":{\"type\":\"UtxoFixed\",\"amount\":\"0.1\"}},\"id\":0}"
```

#### Response (success)

```json
{
  "mmrpc":"2.0",
  "result":{
    "tx_hex":"0400008085202f8901ef25b1b7417fe7693097918ff90e90bba1351fff1f3a24cb51a9b45c5636e57e010000006b483045022100b05c870fcd149513d07b156e150a22e3e47fab4bb4776b5c2c1b9fc034a80b8f022038b1bf5b6dad923e4fb1c96e2c7345765ff09984de12bbb40b999b88b628c0f9012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac8cbaae5f010000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ace87a5e5d000000000000000000000000000000",
    "tx_hash":"1ab3bc9308695960bc728fa427ac00d1812c4ae89aaa714c7618cb96d111be58",
    "from":[
      "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
    ],
    "to":[
      "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
    ],
    "total_amount":"60.10253836",
    "spent_by_me":"60.10253836",
    "received_by_me":"60.00253836",
    "my_balance_change":"-0.1",
    "block_height":0,
    "timestamp":1566472936,
    "fee_details":{
      "type":"Utxo",
      "amount":"0.1"
    },
    "coin":"RICK",
    "internal_id":""
  },
  "id":0
}
```

#### Response (InvalidFeePolicy error - attempt to use EthGas for UTXO coin)

```json
{
  "mmrpc":"2.0",
  "error":"Invalid fee policy: Expected 'UtxoFixed' or 'UtxoPerKbyte' fee types, found EthGas",
  "error_path":"utxo_common",
  "error_trace":"utxo_common:1371]",
  "error_type":"InvalidFeePolicy",
  "error_data":"Expected 'UtxoFixed' or 'UtxoPerKbyte' fee types, found EthGas",
  "id":0
}
```

#### Command (BTC, KMD, and other BTC-based forks, 1 RICK per Kbyte)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"params\":{\"coin\":\"RICK\",\"to\":\"R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW\",\"amount\":\"1.0\",\"fee\":{\"type\":\"UtxoPerKbyte\",\"amount\":\"1\"}},\"id\":0}"
```

#### Response (success)

```json
{
  "mmrpc":"2.0",
  "result":{
    "tx_hex":"0400008085202f890258be11d196cb18764c71aa9ae84a2c81d100ac27a48f72bc6059690893bcb31a000000006b483045022100ef11280e981be280ca5d24c947842ca6a8689d992b73e3a7eb9ff21070b0442b02203e458a2bbb1f2bf8448fc47c51485015904a5271bb17e14be5afa6625d67b1e8012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff58be11d196cb18764c71aa9ae84a2c81d100ac27a48f72bc6059690893bcb31a010000006b483045022100daaa10b09e7abf9d4f596fc5ac1f2542b8ecfab9bb9f2b02201644944ddc0280022067aa1b91ec821aa48f1d06d34cd26fb69a9f27d59d5eecdd451006940d9e83db012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788acf31c655d010000001976a91405aab5342166f8594baf17a7d9bef5d56744332788accd7c5e5d000000000000000000000000000000",
    "tx_hash":"fd115190feec8c0c14df2696969295c59c674886344e5072d64000379101b78c",
    "from":[
      "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
    ],
    "to":[
      "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"
    ],
    "total_amount":"60.00253836",
    "spent_by_me":"60.00253836",
    "received_by_me":"59.61874931",
    "my_balance_change":"-0.38378905",
    "block_height":0,
    "timestamp":1566473421,
    "fee_details":{
      "type":"Utxo",
      "amount":"0.38378905"
    },
    "coin":"RICK",
    "internal_id":""
  },
  "id":0
}
```

#### Command (ETH, ERC20, and other ETH-based forks)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"params\":{\"coin\":\"ETH\",\"to\":\"0xbab36286672fbdc7b250804bf6d14be0df69fa28\",\"amount\":10},\"id\":0}"
```

#### Response (success)

```json
{
  "mmrpc":"2.0",
  "result":{
    "block_height":0,
    "coin":"ETH",
    "fee_details":{
      "type":"Eth",
      "coin":"ETH",
      "gas":21000,
      "gas_price":"0.000000001",
      "total_fee":"0.000021"
    },
    "from":[
      "0xbab36286672fbdc7b250804bf6d14be0df69fa29"
    ],
    "my_balance_change":"-10.000021",
    "received_by_me":"0",
    "spent_by_me":"10.000021",
    "to":[
      "0xbab36286672fbdc7b250804bf6d14be0df69fa28"
    ],
    "total_amount":"10.000021",
    "tx_hash":"8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
    "tx_hex":"f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
  },
  "id":0
}
```

#### Command (ETH, ERC20, and other ETH-based forks, with gas fee)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"params\":{\"coin\":\"$1\",\"to\":\"$2\",\"amount\":\"$3\",\"fee\":{\"type\":\"EthGas\",\"gas_price\":\"3.5\",\"gas\":55000}},\"id\":0}"
```

#### Response (success)

```json
{
  "mmrpc":"2.0",
  "result":{
    "tx_hex":"f86d820b2884d09dc30082d6d894bab36286672fbdc7b250804bf6d14be0df69fa29888ac7230489e80000801ca0ef0167b0e53ed50d87b6fd630925f2bce6ee72e9b5fdb51c6499a7caaecaed96a062e5cb954e503ff83f2d6ce082649fdcdf8a77c8d37c7d26d46d3f736b228d10",
    "tx_hash":"a26c4dcacf63c04e385dd973ca7e7ca1465a3b904a0893bcadb7e37681d38c95",
    "from":[
      "0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29"
    ],
    "to":[
      "0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29"
    ],
    "total_amount":"10",
    "spent_by_me":"10.0001925",
    "received_by_me":"10",
    "my_balance_change":"-0.0001925",
    "block_height":0,
    "timestamp":1566474670,
    "fee_details":{
      "type":"Eth",
      "coin":"ETH",
      "gas":55000,
      "gas_price":"0.0000000035",
      "total_fee":"0.0001925"
    },
    "coin":"ETH",
    "internal_id":""
  },
  "id":0
}
```

#### Response (InvalidFeePolicy error - attempt to use UtxoFixed or UtxoPerKbyte for ETH coin)

```json
{
  "mmrpc":"2.0",
  "error":"Invalid fee policy: Expected 'EthGas' fee type, found UtxoFixed",
  "error_path":"eth",
  "error_trace":"eth:535]",
  "error_type":"InvalidFeePolicy",
  "error_data":"Expected 'EthGas' fee type, found UtxoFixed",
  "id":0
}
```

#### Command (max = true)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"params\":{\"coin\":\"ETH\",\"to\":\"0xbab36286672fbdc7b250804bf6d14be0df69fa28\",\"max\":true},\"id\":0}"
```

##### Response (success)

```json
{
  "mmrpc":"2.0",
  "result":{
    "block_height":0,
    "coin":"ETH",
    "fee_details":{
      "type":"Eth",
      "coin":"ETH",
      "gas":21000,
      "gas_price":"0.000000001",
      "total_fee":"0.000021"
    },
    "from":[
      "0xbab36286672fbdc7b250804bf6d14be0df69fa29"
    ],
    "my_balance_change":"-10.000021",
    "received_by_me":"0",
    "spent_by_me":"10.000021",
    "to":[
      "0xbab36286672fbdc7b250804bf6d14be0df69fa28"
    ],
    "total_amount":"10.000021",
    "tx_hash":"8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
    "tx_hex":"f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
  },
  "id":0
}
```

##### Command (QRC20)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"params\":{\"coin\":\"QRC20\",\"to\":\"qHmJ3KA6ZAjR9wGjpFASn4gtUSeFAqdZgs\",\"amount\":10},\"id\":0}"
```

##### Response (success)

```json
{
  "mmrpc":"2.0",
  "result":{
    "block_height":0,
    "coin":"QRC20",
    "timestamp":1608725061,
    "fee_details":{
      "type":"Qrc20",
      "coin":"tQTUM",
      "miner_fee":"0.00000447",
      "gas_limit":100000,
      "gas_price":40,
      "total_gas_fee":"0.04"
    },
    "from":[
      "qXxsj5RtciAby9T7m98AgAATL4zTi4UwDG"
    ],
    "my_balance_change":"-10",
    "received_by_me":"0",
    "spent_by_me":"10",
    "to":[
      "qHmJ3KA6ZAjR9wGjpFASn4gtUSeFAqdZgs"
    ],
    "total_amount":"10",
    "tx_hash":"8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
    "tx_hex":"f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
  },
  "id":0
}
```

##### Command (QRC20, with gas fee)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"params\":{\"coin\":\"QRC20\",\"to\":\"qHmJ3KA6ZAjR9wGjpFASn4gtUSeFAqdZgs\",\"amount\":10,\"fee\":{\"type\":\"Qrc20Gas\",\"gas_limit\":250000,\"gas_price\":40}},\"id\":0}"
```

```json
{
  "mmrpc":"2.0",
  "result":{
    "block_height":0,
    "coin":"QRC20",
    "timestamp":1608725061,
    "fee_details":{
      "type":"Qrc20",
      "coin":"tQTUM",
      "miner_fee":"0.00000447",
      "gas_limit":250000,
      "gas_price":40,
      "total_gas_fee":"0.1"
    },
    "from":[
      "qXxsj5RtciAby9T7m98AgAATL4zTi4UwDG"
    ],
    "my_balance_change":"-10",
    "received_by_me":"0",
    "spent_by_me":"10",
    "to":[
      "qHmJ3KA6ZAjR9wGjpFASn4gtUSeFAqdZgs"
    ],
    "total_amount":"10",
    "tx_hash":"8fbc5538679e4c4b78f8b9db0faf9bf78d02410006e8823faadba8e8ae721d60",
    "tx_hex":"f86d820a59843b9aca0082520894bab36286672fbdc7b250804bf6d14be0df69fa28888ac7230489e80000801ba0fee87414a3b40d58043a1ae143f7a75d7f47a24e872b638281c448891fd69452a05b0efcaed9dee1b6d182e3215d91af317d53a627404b0efc5102cfe714c93a28"
  },
  "id":0
}
```
