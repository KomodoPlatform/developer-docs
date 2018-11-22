# Util

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## createmultisig

```
command:

komodo-cli createmultisig 2 "[\"RJnVEQgucK1iwiRjfTZmreXkF49KgTErDn\",\"RCVyjn9MQ8Tw6YRJnDcsx67kfsmfUgLdfw\"]"

response:

{
  "address": "bZjsy6bt2ZdyHV5hfCNL2HsuA4eV63s5u6",
  "redeemScript": "52210384c0db4f1eaa142a2745742b942f989375dbec32c55310a793225bb5c43cdc9821021f527b7269ab18da85a50b7f45f572e8b017fce476de06cb80a2550ee7d4b11652ae"
}
```

```
  command:

	curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createmultisig", "params": [2, ["RJnVEQgucK1iwiRjfTZmreXkF49KgTErDn","RCVyjn9MQ8Tw6YRJnDcsx67kfsmfUgLdfw"]] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

  response:

  {
    "result": {
      "address": "bNnKtDC6UuSt5kGJewCQ5b2BhzFK3HTQUV",
      "redeemScript": "522103ae084021ff011b527c34914d2c40148080c09254dd3c7d1f31f32549b53ccd232103bee23783f726ba81b5977473b172497260d9c261b9ef9f5a9dd51c545c8db0ac52ae"
    },
    "error": null,
    "id": "curltest"
  }
```

**createmultisig nrequired [ "key", ... ]**

The `createmultisig` method creates a multi-signature address with `n` signature(s) of `m` key(s) required. The method returns a json object with the address and redeemScript.

### Arguments:

Structure|Type|Description
---------|----|-----------
number_required                              |(numeric, required)          |the number of required signatures out of the `n` key(s) or address(es)
"keys"                                       |(string, required)           |a json array of keys which are addresses or hex-encoded public keys
                                             |                             |
[                                            |                             |
"key"                                        |(string)                     |an address or hex-encoded public key
,                                            |                             |
]                                            |                             |

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"address"                                    |(string)                     |the value of the new multisig address
"redeemScript"                               |(string)                     |the string value of the hex-encoded redemption script
}                                            |                             |

## estimatefee

```
  command:

	komodo-cli estimatefee 6

  response:

  0.00019376
```

**estimatefee nblocks**

The `estimatefee` method estimates the approximate fee per kilobyte. The method is needed for a transaction to begin confirmation within `nblocks` blocks.

The value `-1.0` is returned if not enough transactions and blocks have been observed to make an estimate.

### Arguments:

Structure|Type|Description
---------|----|-----------
nblocks                                      |(numeric)                    |the number of blocks within which the fee should be tested

### Response:

Structure|Type|Description
---------|----|-----------
n                                            |                             |

## estimatepriority

```
  command:

	komodo-cli estimatepriority 6

  response:

```

**estimatepriority nblocks**

The `estimatepriority` method estimates the approximate priority of a zero-fee transaction, when it needs to begin confirmation within `nblocks` blocks.

The value `-1.0` is returned if not enough transactions and blocks have been observed to make an estimate.

### Arguments:

Structure|Type|Description
---------|----|-----------
nblocks                                      |(numeric)                    |a statement indicating within how many blocks the transaction should be confirmed

### Response:

Structure|Type|Description
---------|----|-----------
n                                            |(numeric)                    |estimated priority

## invalidateblock

```
command:

komodo-cli invalidateblock "02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"

response:

(none)
```

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "invalidateblock", "params": ["02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

**invalidateblock "hash"**

The `invalidateblock` method permanently marks a block as invalid, as if it violated a consensus rule.

### Arguments:

Structure|Type|Description
---------|----|-----------
hash                                         |(string, required)           |the hash of the block to mark as invalid

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## reconsiderblock

```
  command:

	komodo-cli reconsiderblock "02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"

  response:

  (none)
```

**reconsiderblock "hash"**

The `reconsiderblock` method removes invalidity status of a block and its descendants, reconsidering them for activation. This can be used to undo the effects of invalidateblock.

### Arguments:

Structure|Type|Description
---------|----|-----------
hash                                         |(string, required)           |the hash of the block to reconsider

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## validateaddress

```
command:

komodo-cli validateaddress "RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7"

response:

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

**validateaddress "komodoaddress"**

The `validateaddress` method returns information about the given address.

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string, required)           |the address to validate

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"isvalid"                                    |(boolean)                    |indicates whether the address is valid. If it is not, this is the only property returned.
"address"                                    |(string)                     |the address validated
"scriptPubKey"                               |(string)                     |the hex encoded scriptPubKey generated by the address
"ismine"                                     |(boolean)                    |indicates whether the address is yours
"isscript"                                   |(boolean)                    |whether the key is a script
"pubkey"                                     |(string)                     |the hex value of the raw public key
"iscompressed"                               |(boolean)                    |whether the address is compressed
"account"                                    |(string)                     |DEPRECATED the account associated with the address; "" is the default account
}                                            |                             |

## verifymessage

> Create the signature:

```
command:

komodo-cli signmessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "my message"

response:

H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=
```

> Verify the signature:

```
  command:

	komodo-cli verifymessage "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ" "H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs=" "my message"

  response:

  true
```

**verifymessage "address" "signature" "message"**

The `verifymessage` method verifies a signed message.

<aside class="notice">
  See also <b>signmessage</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"address"                                    |(string, required)           |the address to use for the signature
"signature"                                  |(string, required)           |the signature provided by the signer in base 64 encoding
"message"                                    |(string, required)           |the message that was signed

### Response:

Structure|Type|Description
---------|----|-----------
true/false                                   |(boolean)                    |indicates whether the signature is verified

## z_validateaddress

```
command:

komodo-cli z_validateaddress "zcWsmqT4X2V4jgxbgiCzyrAfRT1vi1F4sn7M5Pkh66izzw8Uk7LBGAH3DtcSMJeUb2pi3W4SQF8LMKkU2cUuVP68yAGcomL"

{
  "isvalid": true,
  "address": "ztdChvxs2Z97X7qeBwsnRLbxva1ZVgWhFWZxZTA5bC8XLt9RHF8uXn16MWCU8DhKEt4gTtKqQwzsrk85f5tThWMNoYds2oX",
  "payingkey": "d9c09cb974fbe0bf7e36a2318b46396c5112511f90749531428936867d83bd92",
  "transmissionkey": "5ce3250912758cbb591e3d585ef110992f25ed7694b88f55315b060698b75404",
  "ismine": true
}
```

**z_validateaddress "zaddr"**

The `z_validateaddress` method returns information about the given z address.

### Arguments:

Structure|Type|Description
---------|----|-----------
"zaddr"                                      |(string, required)           |the z address to validate

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"isvalid"                                    |(boolean)                    |indicates whether the address is valid; if not, this is the only property returned
"address"                                    |(string)                     |the z address validated
"ismine"                                     |(boolean)                    |indicates if the address is yours or not
"payingkey"                                  |(string)                     |the hex value of the paying key, a_pk
"transmissionkey"                            |(string)                     |the hex value of the transmission key, pk_enc
}                                            |                             |
