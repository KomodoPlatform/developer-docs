# get_raw_transaction
The  `get_raw_transaction`  method returns hexadecimal encoded signed transactions.

## Arguments
|Structure|Type|Description|
|:-------:|:---:|:--------:|
|coin|string|the name of the coin the user desires to request for the transaction |
|tx_hash|string|hash of the transaction|

## Response
|Structure|Type|Description|
|:--------:|:----:|:------:|
|tx_hex|BytesJson|raw bytes of signed transaction|


## Examples:

### Request
```
curl --url "http://127.0.0.1:7783" --data "{
    \"mmrpc\": \"2.0\",
    \"method\":\"get_raw_transaction\",
    \"userpass\":\"$userpass\",
    \"params\":{\"coin\": \"RICK\",
    \"tx_hash\": \"989360b0225b4e05fa13643e2e306c8eb5c52fa611615dfd30195089010b1c7b\"},
    \"id\":1
}"
```

### Response:
```json
{
  "mmrpc":"2.0",
  "result":{
  "tx_hex":"0400008085202f89025655b6fec358091a4a6b34107e69b10bd7660056d8f2a1e5f8eef0db6aec960100000000494830450221008c89db5e2d93d7674fe152e37344dfd24a0b1d4d382a7e0bcfc5d8190a141d72022050ce4ef929429e7e1a6c4ebd3f72a1a2aa25da1e0df65553a2c657658077ed1d01feffffff79cc137b70c39c9c7c2b9230c818ec684ffe731bf1ae821f91ba9d3e526f55f00000000049483045022100868c71f4a8e1452a3bc8b1d053a846959ab7df63fb0d147e9173f69818bbb1f3022060c7e045a34cf6af61bc3a74dc2db7b8bfa4949bc5919acceed40fc07d8706d201feffffff0240043a0000000000232102afdbba3e3c90db5f0f4064118f79cf308f926c68afd64ea7afc930975663e4c4ac201efc01000000001976a914347f2aedf63bac168c2cc4f075a2850435e20ac188ac96d3c96036dd0e000000000000000000000000"
  },
  "id":0
}
```

### Error response:
```json
{
  "mmrpc": "2.0",
  "error": "No such coin KMD",
  "error_path": "lp_coins",
  "error_trace": "lp_coins:2234] lp_coins:2156]",
  "error_type": "NoSuchCoin",
  "error_data": {
    "coin": "KMD"
  },
  "id": 0
}
```

## Error Types
|Structure|Type|Description|
|:-----:|:-----:|:------:|
|NoSuchCoin|string|The specified coin was not found or is not activated yet|
|InvalidHashError|string|The specified `hash` is not valid
|Transport|string|The request was failed due to a network error|
|HashNotExist|string|The specified `hash` is not exist|
|InternalError|string|The request was failed due to an AtomicDEX API internal error|
