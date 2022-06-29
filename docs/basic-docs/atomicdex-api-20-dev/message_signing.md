# Signing\_and\_Verifying\_Messages

Cryptocraphically signed messages are a useful feature which can be used to [prove ownership of an address](https://www.coindesk.com/policy/2020/05/25/craig-wright-called-fraud-in-message-signed-with-bitcoin-addresses-he-claims-to-own/).
If you [`coins`](https://github.com/KomodoPlatform/coins) file contains the correct [message prefix](https://bitcoin.stackexchange.com/questions/3337/what-are-the-safety-guidelines-for-using-the-sign-message-feature/3339#3339) definitions for a coin, you can sign messages with the AtomicDEX-API(https://github.com/KomodoPlatform/atomicDEX-API). This can generally be found [within a coin's github repository](https://github.com/KomodoPlatform/komodo/blob/master/src/main.cpp#L146) and is assigned via the `sign_message_prefix` value as below.

```json
{
        "coin": "RICK",
        "asset": "RICK",
        "fname": "RICK (TESTCOIN)",
        "sign_message_prefix": "Komodo Signed Message:\n",
        "rpcport": 25435,
        "txversion": 4,
        "overwintered": 1,
        "mm2": 1,
        "protocol": {
                "type": "UTXO"
        }
}
```

## Message Signing


### Arguments

| Structure     | Type             | Description                                                                                                           |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| coin          | string           | The coin to sign a message with                                                                                       |
| message       | string           | The message you want to sign                                                                                          |


### Response

| Structure       | Type                       | Description                                                                                     |
| --------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| signature       | string                     | The message you want to sign                                                                    |


#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
{
  \"userpass\": \"$userpass\",
  \"method\": \"sign_message\",
  \"mmrpc\": \"2.0\",
  \"id\": 0,
  \"params\": {
    \"coin\": \"KMD\",
    \"message\": \"Between subtle shading and the absence of light lies the nuance illusion\"
  }
}"
```

#### Response (success)

```json
{
  "mmrpc": "2.0",
  "result": {
    "signature": "H43eTmJxBKEPiHkrCe/8NsRidkKCIkXDxLyp30Ez/RwoApGdg89Hlvj9mTMSPGp8om5297zvdL8EVx3IdIe2swY="
  },
  "id": 0
}
```


## Message Verification

### Arguments

| Structure     | Type             | Description                                                                                                           |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| coin          | string           | The coin to sign a message with                                                                                       |
| message       | string           | The message input via the `sign_message` method sign                                                                  |
| signature     | string           | The signature generated for the message                                                                               |
| address       | string           | The address used to sign the message                                                                                  |


### Response

| Structure       | Type                       | Description                                                                                     |
| --------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| is_valid        | boolean                    | `true` is message singature is valid; `false` if it is not.                                     |


#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "
{
  \"userpass\": \"$userpass\",
  \"method\": \"verify_message\",
  \"mmrpc\": \"2.0\",
  \"id\": 0,
  \"params\": {
    \"coin\": \"KMD\",
    \"message\": \"Between subtle shading and the absence of light lies the nuance illusion\",
    \"signature\": \"H43eTmJxBKEPiHkrCe/8NsRidkKCIkXDxLyp30Ez/RwoApGdg89Hlvj9mTMSPGp8om5297zvdL8EVx3IdIe2swY=\",
    \"address\": \"RUYJYSTuCKm9gouWzQN1LirHFEYThwzA2d\"
  }
}"
```

#### Response (valid)

```json
{
  "mmrpc": "2.0",
  "result": {
    "is_valid": true
  },
  "id": 0
}
```

#### Response (not valid)

```json
{
  "mmrpc": "2.0",
  "result": {
    "is_valid": false
  },
  "id": 0
}
```


### :warning: Error types


#### PrefixNotFound

```json
{
  "mmrpc": "2.0",
  "error": "sign_message_prefix is not set in coin config",
  "error_path": "utxo_common",
  "error_trace": "utxo_common:1699]",
  "error_type": "PrefixNotFound",
  "id": 0
}
```

#### InvalidRequest

```json
{
  "mmrpc": "2.0",
  "error": "Invalid request: utxo_common:578] utxo_common:566] Invalid address: 0xaB95D01Bc8214E4D993043E8Ca1B68dB2c946498",
  "error_path": "lp_coins",
  "error_trace": "lp_coins:2554]",
  "error_type": "InvalidRequest",
  "error_data": "utxo_common:578] utxo_common:566] Invalid address: 0xaB95D01Bc8214E4D993043E8Ca1B68dB2c946498",
  "id": 0
}
```



