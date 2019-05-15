# Util

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## createmultisig

**createmultisig nrequired [ "key", ... ]**

The `createmultisig` method creates a multi-signature address with `n` signature(s) of `m` key(s) required. The method returns a json object with the address and redeemScript.

### Arguments

| Name | Type | Description | 
| --------------- | ------------------- | ---------------------------------------------------------------------- |
| number_required | (numeric, required) | the number of required signatures out of the `n` key(s) or address(es) |
| "keys"          | (string, required)  | a json array of keys which are addresses or hex-encoded public keys    |
| "key"           | (string)            | an address or hex-encoded public key                                   |

### Response

| Name | Type | Description | 
| -------------- | -------- | ----------------------------------------------------- |
| "address"      | (string) | the value of the new multisig address                 |
| "redeemScript" | (string) | the string value of the hex-encoded redemption script |

#### :pushpin: Examples

Command:

```bash
./komodo-cli createmultisig 2 "[\"RJnVEQgucK1iwiRjfTZmreXkF49KgTErDn\",\"RCVyjn9MQ8Tw6YRJnDcsx67kfsmfUgLdfw\"]"
```


<collapse-text hidden title="Response">


```json
{
  "address": "bZjsy6bt2ZdyHV5hfCNL2HsuA4eV63s5u6",
  "redeemScript": "52210384c0db4f1eaa142a2745742b942f989375dbec32c55310a793225bb5c43cdc9821021f527b7269ab18da85a50b7f45f572e8b017fce476de06cb80a2550ee7d4b11652ae"
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createmultisig", "params": [2, ["RJnVEQgucK1iwiRjfTZmreXkF49KgTErDn","RCVyjn9MQ8Tw6YRJnDcsx67kfsmfUgLdfw"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "address": "bNnKtDC6UuSt5kGJewCQ5b2BhzFK3HTQUV",
    "redeemScript": "522103ae084021ff011b527c34914d2c40148080c09254dd3c7d1f31f32549b53ccd232103bee23783f726ba81b5977473b172497260d9c261b9ef9f5a9dd51c545c8db0ac52ae"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## decodeccopret

**decodeccopret scriptPubKey**

The `decodeccopret` method decodes the OP RETURN data from a CC transaction to output the `EVALCODE` and `function id` of the method that produced the transaction.

#### Finding the OP RETURN Data From a CC Transaction

The OP RETURN data from a CC transaction can be found by following these steps:

- Decode a transaction produced by a CC module using the method [getrawtransaction](./rawtransactions.html#getrawtransaction)'s verbose option.
- Look for the `vout` key; it is an array of jsons
- Find the json that contains the `scriptPubkey`, and which has the `type:nulldata` key pair
- Copy the `hex` value from that `scriptPubkey` json
- This is the hex-string that is expected as the argument for the above method.
- You can verify that the transaction was produced by a CC module by checking if one of the `vout` json's `scriptPubkey` json has the `type:cryptocondition` key pair

### Arguments

| Name | Type | Description | 
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| scriptPubKey | (string) | the hex-string format `scriptPubKey` of the `type` : `nulldata` in the `vout` of a transaction produced by a CC module |

### Response

| Name | Type | Description | 
| --------- | -------------------- | ------------------------------------------------------------- |
| result    | (string)             | whether the call succeeded                                    |
| OpRets    | (json)               | a json containing the keys `EVALCODE` and `function id`       |
| eval_code | (hexadecimal number) | the `EVALCODE` of the method that produced the transaction    |
| function  | (string)             | the `function id` of the method that produced the transaction |

#### :pushpin: Examples

Command:

```bash
./komodo-cli decodeccopret 6a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "OpRets": [
    {
      "eval_code": "0x12",
      "function": "x"
    }
  ]
}
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decodeccopret", "params": ["6a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": {
    "result": "success",
    "OpRets": [
      {
        "eval_code": "0x12",
        "function": "x"
      }
    ]
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## estimatefee

**estimatefee nblocks**

The `estimatefee` method estimates the approximate fee per kilobyte. The method is needed for a transaction to begin confirmation within `nblocks` blocks.

The value `-1.0` is returned if not enough transactions and blocks have been observed to make an estimate.

### Arguments

| Name | Type | Description | 
| --------- | --------- | ---------------------------------------------------------- |
| nblocks   | (numeric) | the number of blocks within which the fee should be tested |

### Response

| Name | Type | Description | 
| --------- | --------- | ------------- |
| n         | (numeric) | the estimated fee |

#### :pushpin: Examples

Command:

```bash
./komodo-cli estimatefee 6
```


<collapse-text hidden title="Response">


```bash
0.00019376
```

</collapse-text>


## estimatepriority

**estimatepriority nblocks**

The `estimatepriority` method estimates the approximate priority of a zero-fee transaction, when it needs to begin confirmation within `nblocks` blocks.

The value `-1.0` is returned if not enough transactions and blocks have been observed to make an estimate.

### Arguments

| Name | Type | Description | 
| --------- | --------- | --------------------------------------------------------------------------------- |
| nblocks   | (numeric) | a statement indicating within how many blocks the transaction should be confirmed |

### Response

| Name | Type | Description | 
| --------- | --------- | ------------------ |
| n         | (numeric) | the estimated priority |

#### :pushpin: Examples

Command:

```bash
./komodo-cli estimatepriority 6
```


<collapse-text hidden title="Response">


```bash
-1
```

</collapse-text>


## invalidateblock

**invalidateblock "hash"**

The `invalidateblock` method permanently marks a block as invalid, as if it violated a consensus rule.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ---------------------------------------- |
| hash      | (string, required) | the hash of the block to mark as invalid |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Command:

```bash
./komodo-cli invalidateblock "02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


You can find the `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "invalidateblock", "params": ["02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>


## reconsiderblock

**reconsiderblock "hash"**

The `reconsiderblock` method removes invalidity status of a block and its descendants, reconsidering them for activation. This can be used to undo the effects of the `invalidateblock` method.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ----------------------------------- |
| hash      | (string, required) | the hash of the block to reconsider |

### Response

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

#### :pushpin: Examples

Command:

```bash
./komodo-cli reconsiderblock "02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"
```


<collapse-text hidden title="Response">


```bash
(none)
```

</collapse-text>


## txnotarizedconfirmed

**txnotarizedconfirmed txid**

The `txnotarizedconfirmed` method returns information about a transaction's state of confirmation. 

If the transaction is on a chain that has Komodo's dPoW security service, the method returns `true` if the transaction is notarized.

If the chain does not have dPoW, the method returned `true` if the confirmation number is greater than `60`.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ------------------ |
| "txid"    | (string, required) | the transaction id |

### Response

| Name | Type | Description | 
| --------- | --------- | ----------------------------------------- |
| "result"  | (boolean) | whether the transaction is confirmed, for dPoW-based chains; for non-dPoW chains, the value indicates whether the transaction has `60` or more confirmations |

#### :pushpin: Examples

Command:

```bash
./komodo-cli txnotarizedconfirmed ce1e3df1fb24ab3301b4032c3a0af466ca03b9365f8c649511bdd72f5519fecb
```


<collapse-text hidden title="Response">


```json
{
  "result": true
}
```

</collapse-text>


## validateaddress

**validateaddress "komodoaddress"**

The `validateaddress` method returns information about the given address.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ----------------------- |
| "address" | (string, required) | the address to validate |

### Response

| Name | Type | Description | 
| -------------- | --------- | ----------------------------------------------------------------------------------------- |
| "isvalid"      | (boolean) | indicates whether the address is valid. If it is not, this is the only property returned. |
| "address"      | (string)  | the address validated                                                                     |
| "scriptPubKey" | (string)  | the hex encoded scriptPubKey generated by the address                                     |
| "ismine"       | (boolean) | indicates whether the address is yours                                                    |
| "isscript"     | (boolean) | whether the key is a script                                                               |
| "pubkey"       | (string)  | the hex value of the raw public key                                                       |
| "iscompressed" | (boolean) | whether the address is compressed                                                         |
| "account"      | (string)  | DEPRECATED the account associated with the address; "" is the default account             |

#### :pushpin: Examples

Command:

```bash
./komodo-cli validateaddress "RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7"
```


<collapse-text hidden title="Response">


```json
{
  "isvalid": true,
  "address": "RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7",
  "scriptPubKey": "76a9142cd2a4e3d1c2738ee4fce61e73ea822dcaacb9b488ac",
  "segid": 9,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "03c376b00b3a2ae43b8bf103a6c6962b241de684383301fe628a460b68a79ac1d8",
  "iscompressed": true,
  "account": ""
}
```

</collapse-text>


## verifymessage

**verifymessage "address" "signature" "message"**

The `verifymessage` method verifies a signed message.

::: tip
See also <b>signmessage</b>.
:::

### Arguments

| Name | Type | Description | 
| ----------- | ------------------ | -------------------------------------------------------- |
| "address"   | (string, required) | the address to use for the signature                     |
| "signature" | (string, required) | the signature provided by the signer in base 64 encoding |
| "message"   | (string, required) | the message that was signed                              |

### Response

| Name | Type | Description | 
| ---------- | --------- | ------------------------------------------- |
| true/false | (boolean) | indicates whether the signature is verified |

#### :pushpin: Examples

Create the signature:

Command:

```bash
./komodo-cli signmessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "my message"
```


<collapse-text hidden title="Response">


```bash
H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=
```

</collapse-text>


Verify the signature:

Command:

```bash
./komodo-cli verifymessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=" "my message"
```


<collapse-text hidden title="Response">


```bash
true
```

</collapse-text>


## z_validateaddress

**z_validateaddress "zaddr"**

The `z_validateaddress` method returns information about the given z address.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ------------------------- |
| "zaddr"   | (string, required) | the z address to validate |

### Response

| Name | Type | Description | 
| ----------------- | --------- | ---------------------------------------------------------------------------------- |
| "isvalid"         | (boolean) | indicates whether the address is valid; if not, this is the only property returned |
| "address"         | (string)  | the z address validated                                                            |
| "ismine"          | (boolean) | indicates if the address is yours or not                                           |
| "payingkey"       | (string)  | the hex value of the paying key, a_pk                                              |
| "transmissionkey" | (string)  | the hex value of the transmission key, pk_enc                                      |

#### :pushpin: Examples

Command:

```bash
./komodo-cli z_validateaddress "zcWsmqT4X2V4jgxbgiCzyrAfRT1vi1F4sn7M5Pkh66izzw8Uk7LBGAH3DtcSMJeUb2pi3W4SQF8LMKkU2cUuVP68yAGcomL"
```


<collapse-text hidden title="Response">


```json
{
  "isvalid": true,
  "address": "ztdChvxs2Z97X7qeBwsnRLbxva1ZVgWhFWZxZTA5bC8XLt9RHF8uXn16MWCU8DhKEt4gTtKqQwzsrk85f5tThWMNoYds2oX",
  "payingkey": "d9c09cb974fbe0bf7e36a2318b46396c5112511f90749531428936867d83bd92",
  "transmissionkey": "5ce3250912758cbb591e3d585ef110992f25ed7694b88f55315b060698b75404",
  "ismine": true
}
```

</collapse-text>

