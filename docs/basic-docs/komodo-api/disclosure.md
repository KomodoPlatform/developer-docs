# Disclosure

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## z_getpaymentdisclosure

::: warning
EXPERIMENTAL FEATURE: Payment disclosure is currently DISABLED. This call always fails.
:::

**z_getpaymentdisclosure transaction js_index output_index ("message")**

The `z_getpaymentdisclosure` method generates a payment disclosure for a given joinsplit output.

### Arguments

| Name | Type | Description | 
| -------------- | ------------------ | ----------- |
| "txid"         | (string, required) |<!--need to fill in this table-->|
| "js_index"     | (string, required) ||
| "output_index" | (string, required) ||
| "message"      | (string, optional) ||

### Response

| Name | Type | Description | 
| ------------------- | -------- | ----------------------------------- |
| "paymentdisclosure" | (string) | a hex data string, with a "zpd:" prefix |

#### :pushpin: Examples

Command:

```bash
./komodo-cli z_getpaymentdisclosure 96f12882450429324d5f3b48630e3168220e49ab7b0f066e5c2935a6b88bb0f2 0 0 "refund"
```


<collapse-text hidden title="Response">


```bash
(currently disabled)
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in your coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_getpaymentdisclosure", "params": ["96f12882450429324d5f3b48630e3168220e49ab7b0f066e5c2935a6b88bb0f2", 0, 0, "refund"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```

<collapse-text hidden title="Response">


```bash
(currently disabled)
```

</collapse-text>

## z_validatepaymentdisclosure

**z_validatepaymentdisclosure "paymentdisclosure"**

The `z_validatepaymentdisclosure` method validates a payment disclosure.

::: warning
EXPERIMENTAL FEATURE: Payment disclosure is currently DISABLED. This call always fails.
:::

### Arguments

| Name | Type | Description | 
| ------------------- | ------------------ | ----------------------------------- |
| "paymentdisclosure" | (string, required) | hex data string, with "zpd:" prefix |

### Response

| Name | Type | Description | 
| -------------------- | ---- | ----------- |
| (currently disabled) |      |

#### :pushpin: Examples

Command:

```bash
./komodo-cli z_validatepaymentdisclosure "zpd:706462ff004c561a0447ba2ec51184e6c204..."
```


<collapse-text hidden title="Response">


```bash
(currently disabled)
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_validatepaymentdisclosure", "params": ["zpd:706462ff004c561a0447ba2ec51184e6c204..."] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/
```


<collapse-text hidden title="Response">


```bash
(currently disabled)
```

</collapse-text>

