# Disclosure

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## z_getpaymentdisclosure

```
command:

komodo-cli z_getpaymentdisclosure 96f12882450429324d5f3b48630e3168220e49ab7b0f066e5c2935a6b88bb0f2 0 0 "refund"

response:

(currently disabled)
```

> You can find your rpcuser, rpcpassword, and rpcport in your coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getpaymentdisclosure", "params": ["96f12882450429324d5f3b48630e3168220e49ab7b0f066e5c2935a6b88bb0f2", 0, 0, "refund"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(currently disabled)
```

<aside class="warning">
  EXPERIMENTAL FEATURE: Payment disclosure is currently DISABLED. This call always fails.
</aside>

**z_getpaymentdisclosure transaction js_index output_index ("message")**

The `z_getpaymentdisclosure` method generates a payment disclosure for a given joinsplit output.

### Arguments:

Structure|Type|Description
---------|----|-----------
"txid"                                       |(string, required)           |
"js_index"                                   |(string, required)           |
"output_index"                               |(string, required)           |
"message"                                    |(string, optional)           |

### Response:

Structure|Type|Description
---------|----|-----------
"paymentdisclosure"                          |(string)                     |hex data string, with "zpd:" prefix

## z_validatepaymentdisclosure

```
command:

komodo-cli z_validatepaymentdisclosure "zpd:706462ff004c561a0447ba2ec51184e6c204..."

response:

(currently disabled)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_validatepaymentdisclosure", "params": ["zpd:706462ff004c561a0447ba2ec51184e6c204..."] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(currently disabled)
```

**z_validatepaymentdisclosure "paymentdisclosure"**

The `z_validatepaymentdisclosure` method validates a payment disclosure.

<aside class="warning">
  EXPERIMENTAL FEATURE: Payment disclosure is currently DISABLED. This call always fails.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
"paymentdisclosure"                          |(string, required)           |hex data string, with "zpd:" prefix

### Response:

Structure|Type|Description
---------|----|-----------
(currently disabled)                         |                             |
