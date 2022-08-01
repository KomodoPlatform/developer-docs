# AtomicDEX API RPC Protocol v2.0 (Dev)

Starting with version [beta-2.1.3434](https://github.com/KomodoPlatform/atomicDEX-API/releases/tag/beta-2.1.3434), the AtomicDEX API supports the standardized protocol format called `mmrpc 2.0`.

It includes a uniform request, successful and error response formats.

At the moment, only a few RPC methods support the `mmrpc 2.0` protocol, such as **withdraw** and **trade_preimage**.

### Request

| Structure | Type              | Description                                                                                                                                                       |
| --------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mmrpc     | string            | the string specifying the version of the AtomicDEX API RPC protocol. Must be exactly "2.0"                                                                        |
| userpass  | string (optional) | your password for protected RPC methods. Skip this field if the specified `method` is public                                                                      |
| method    | string            | the name of the method to be invoked                                                                                                                              |
| params    | object (optional) | a structured value that holds the parameter values to be used during the invocation of the method. This field may be omitted if the method doesn't take arguments |
| id        | number (optional) | the identifier is established by the client. AtomicDEX API will reply with the same value in the Response object if the `id` field is included and not `NULL`     |

### Response (Success)

| Structure | Type              | Description                                                                                 |
| --------- | ----------------- | ------------------------------------------------------------------------------------------- |
| mmrpc     | string            | the string specifying the version of the AtomicDEX API RPC protocol                         |
| result    | object            | the value of this field is determined by the method invoked on AtomicDEX API                |
| id        | number (optional) | the identifier established by the client. The same value as in the Request if it was passed |

### Response (Error)

| Structure   | Type              | Description                                                                                 |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------- |
| mmrpc       | string            | the string specifying the version of the AtomicDEX API RPC protocol                         |
| error       | string            | the common error description                                                                |
| error_path  | string            | the error path consisting of file names separated by a dot similar to JSON path notation    |
| error_trace | string            | the error path consisting of file and line number pairs separated by ']'                    |
| error_type  | string            | the string error identifier used to determine the cause of the error                        |
| error_data  | object            | an object containing the error data of the corresponding `error_type`                       |
| id          | number (optional) | the identifier established by the client. The same value as in the Request if it was passed |

### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"mmrpc\":\"2.0\",\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"params\":{\"coin\":\"KMD\",\"to\":\"RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh\",\"amount\":\"10\"},\"id\":0}"
```

#### Response (success)

```json
{
  "mmrpc": "2.0",
  "result": {
    "tx_hex": "0400008085202f8901ef25b1b7417fe7693097918ff90e90bba1351fff1f3a24cb51a9b45c5636e57e010000006b483045022100b05c870fcd149513d07b156e150a22e3e47fab4bb4776b5c2c1b9fc034a80b8f022038b1bf5b6dad923e4fb1c96e2c7345765ff09984de12bbb40b999b88b628c0f9012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac8cbaae5f010000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ace87a5e5d000000000000000000000000000000",
    "tx_hash": "1ab3bc9308695960bc728fa427ac00d1812c4ae89aaa714c7618cb96d111be58",
    "from": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
    "to": ["R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW"],
    "total_amount": "60.10253836",
    "spent_by_me": "60.10253836",
    "received_by_me": "60.00253836",
    "my_balance_change": "-0.1",
    "block_height": 0,
    "timestamp": 1566472936,
    "fee_details": {
      "type": "Utxo",
      "amount": "0.1"
    },
    "coin": "RICK",
    "internal_id": ""
  },
  "id": 0
}
```

#### Response (error)

```json
{
  "mmrpc": "2.0",
  "error": "The amount 0.000005 is too small",
  "error_path": "utxo_common",
  "error_trace": "utxo_common:1379] utxo_common:301]",
  "error_type": "AmountIsTooSmall",
  "error_data": {
    "amount": "0.000005"
  },
  "id": 0
}
```
