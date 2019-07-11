# MuSig

## Introduction

::: tip Notice

The MuSig module is an experimental feature. It is provided as a demonstration of Antara capabilities and of the MuSig concept. If you would like to use MuSig on a production-level asset chain, please reach out to the Komodo team on [Discord.](https://komodoplatform.com/discord)

:::

The MuSig Antara module implements a new type of multi-signature functionality. MuSig allows a blockchain to process multi-signature transactions in a more data-efficient manner. MuSig also keeps private the number of signers partaking in a multi-signature transaction.

This functionality is facilitated by MuSig's implementation of Schnorr Signature technology. Schnorr Signatures are unique in that each signature is 64 bytes in size, regardless of the number of signers in a transaction. Also, a multi-signature Schnorr Signature can be processed in one verification.

Schnorr Signatures differs from the existing multi-signature method (ECDSA), as the ECDSA method requires each signer of a transaction to be verified separately. Also, with the ECDSA method each set of signers must be collected into a final verification. The size of the ECDSA multi-signature transaction can vary according to the number of signers in the set, and this can disclose information that would otherwise remain private.

Therefore, Schnorr Signatures greatly reduce verification time and data-storage requirements, and enhance user privacy.

For further information, see this [article.](https://blockstream.com/2019/02/18/musig-a-new-multisignature-standard/) Also, the reader may refer to the comments in the following core `komodod` files, [File 1](https://github.com/jl777/komodo/blob/jl777/src/secp256k1/include/secp256k1_musig.h) and [File 2.](https://github.com/jl777/komodo/blob/jl777/src/secp256k1/src/modules/musig/example.c)

#### MuSig Module Flow

- Create a combined pubkey using the [combine](../customconsensus/musig.html#combine) method
  - From the response, take note of the `combined_pk` and `pkhash` values
- Send coins to `combined_pk` using the [send](../customconsensus/musig.html#send) method
  - Decode the returned raw transaction using [getrawtransaction](../komodo-api/rawtransactions.html#getrawtransaction)
  - From the decoded raw transaction, take note of the `sendtxid` value
- Calculate the message that needs to be signed using the [calcmsg](../customconsensus/musig.html#calcmsg) method
  - From the response, take note of `msg`
  - This `msg` needs to be signed by all participating pubkeys
- On each node create a session using the [session](../customconsensus/musig.html#session) method
  - From the response on each node take note of the `commitment` value
  - Transfer each node's `commitment` value to each other node
  - Do not stop the `komodod` daemon on any node from this point forward
    - The `komodod` daemon stores the `commitment` value as a part of a `global data structure`
    - Should any `komodod` daemon be stopped, the MuSig workflow must be restarted from the beginning
  - Also, execute the `sessions` method only once on each node
- On each node use the [commit](../customconsensus/musig.html#commit) method
  - Transfer each node's `nonce` value to each other node
- On each node use the [nonce](../customconsensus/musig.html#nonce) method
  - Transfer each node's `partialsig` value to each other node
- On each node execute the [partialsig](../customconsensus/musig.html#partialsig) method
  - Verify that the `combinedsig` value of each node is the same as each other node by transferring one `combinedsig` value on one node to all other nodes
- On at least one node execute the [verify](../customconsensus/musig.html#verify) method
  - Use the returned output to verify that the `combinedsig` value will be able to successfully execute the `spend` method for the desired `msg`
- On one node execute the [spend](../customconsensus/musig.html#spend) method and broadcast the returned raw transaction

## Musig Tutorial Availability

The Antara Tutorials section features a full installation and walkthrough tutorial of the Musig module.

[<b>Link to Musig Module Tutorial</b>](../../../basic-docs/antara/antara-tutorials/musig-module-tutorial.md)

## calcmsg

**cclib calcmsg 18 '["sendtxid", "scriptPubKey"]'**

The `calcmsg` method can be used by any one of the signers to initiate a `spend` transaction.

To calculate the `msg` value, this method requires a `sendtxid` and a `scriptPubKey`.

- The `sendtxid` is the id of a transaction that added funds to the `combined_pk` through the [send](../customconsensus/musig.html#send) method.
- The `scriptPubKey` expected here is of the type [p2pk](http://learnmeabitcoin.com/glossary/p2pk) in `hex` form.

To create a `scriptPubkey` from a normal `pubkey`, add the characters `21` to the beginning of the `pubkey` string and the characters `ac` to the end of the string:

```bash
scriptPubkey = 21 + pubkey + ac
```

For example:

- The `pubkey` is: `02f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193e`
- The associated `scriptPubkey` is: `2102f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193eac`

Usage of this method depends on the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name         | Type     | Description                                                                                                                                                                                                   |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendtxid     | (string) | the transaction id of the transaction created by the [send](../customconsensus/musig.html#send) method that was executed to fund the MuSig address; only the funds in the `vout0` of the `sendtxid` are spent |
| scriptPubKey | (string) | a modified form of a pubkey; this is the pubkey that will receive the spent funds                                                                                                                             |

#### Response

| Name   | Type     | Description                                                                                                              |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| msg    | (string) | the message that must be signed by all the signers for the final [spend](../customconsensus/musig.html#spend) to succeed |
| result | (string) | whether the call executed successfully                                                                                   |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG  cclib calcmsg 18 '["09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293","210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac"]'
```

<collapse-text hidden title="Response">

```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "result": "success"
}
```

</collapse-text>

## combine

**cclib combine 18 '[ "pubkey1", "pubkey2", .....]'**

The `combine` method produces the combined pubkey ( `combined_pk` ) from all pubkeys provided.

Usage of this method depends upon the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name                   | Type     | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| pubkey1, pubkey2, .... | (string) | the pubkeys of all the signers of the MuSig address |

#### Response

| Name        | Type     | Description                                  |
| ----------- | -------- | -------------------------------------------- |
| pkhash      | (string) | the 32-byte hash of the original public keys |
| combined_pk | (string) | the combined pubkey of all the signers       |
| result      | (string) | whether the call executed successfully       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib combine 18 '["0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a","02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567"]'
```

<collapse-text hidden title="Response">

```json
{
  "pkhash": "8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "result": "success"
}
```

</collapse-text>

## commit

**cclib commit 18 '["pkhash", ind, "commitment"]'**

The `commit` method produces a `nonce` for each set of `index` and `commitment` values provided.

The returned `nonce` must be shared with all corresponding nodes.

Usage of this method depends on the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name       | Type             | Description                                                                             |
| ---------- | ---------------- | --------------------------------------------------------------------------------------- |
| pkhash     | (string)         | the 32-byte hash of the original public keys                                            |
| ind        | (decimal number) | the index of the node, whose `commitment` is being added to the `global data structure` |
| commitment | (string)         | the `commitment` value produced by the node with index `ind`                            |

#### Response

| Name        | Type             | Description                                                             |
| ----------- | ---------------- | ----------------------------------------------------------------------- |
| added_index | (decimal number) | the index of the node whose `commitment` is added                       |
| myind       | (decimal number) | the index of the node on which this method is executed                  |
| nonce       | (string)         | the `nonce` value produced by the node on which this method is executed |
| result      | (string)         | whether the call executed successfully                                  |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib commit 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"2854473733147ebdbf2fb70b956c8086c9d7659ca0093627fe0371098f8bc003"]'
```

<collapse-text hidden title="Response">

```json
{
  "added_index": 1,
  "myind": 0,
  "nonce": "0379f6f42cf4c2cb30d064a6cac22ab6ffb3d93388d49b07f0623ff9bc8d191f89",
  "result": "success"
}
```

</collapse-text>

## nonce

**cclib nonce 18 '["pkhash", ind, "nonce"]'**

The `nonce` method produces a `partialsig` for each set of `index` and `nonce` value provided.

The returned `partialsig` must be shared with all corresponding nodes.

Usage of this method depends on the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name   | Type             | Description                                                                        |
| ------ | ---------------- | ---------------------------------------------------------------------------------- |
| pkhash | (string)         | the 32-byte hash of the original public keys                                       |
| ind    | (decimal number) | the index of the node, whose `nonce` is being added to the `global data structure` |
| nonce  | (string)         | the `nonce` value produced by the node with index `ind`                            |

#### Response

| Name        | Type             | Description                                                                  |
| ----------- | ---------------- | ---------------------------------------------------------------------------- |
| added_index | (decimal number) | the index of the node whose `nonce` is added                                 |
| myind       | (decimal number) | the index of the node on which this method is executed                       |
| partialsig  | (string)         | the `partialsig` value produced by the node on which this method is executed |
| result      | (string)         | whether the call executed successfully                                       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib nonce 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"02402fe26abd7ed2cf22d872a6b22ced4309aac8ec273b9c89e0f8f5b77f1574db"]'
```

<collapse-text hidden title="Response">

```json
{
  "added_index": 1,
  "myind": 0,
  "partialsig": "dc913a9e7532c8edf2f822f482afdcf48c61919bf905fb77f6684a2d7e58d972",
  "result": "success"
}
```

</collapse-text>

## partialsig

**cclib partialsig 18 '["pkhash", ind, "partialsig"]'**

The `partialsig` method produces a `combinedsig` for each set of `index` and `nonce` values provided.

The returned `combinedsig` must be shared with all corresponding nodes.

Usage of this method depends on the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name       | Type             | Description                                                                           |
| ---------- | ---------------- | ------------------------------------------------------------------------------------- |
| pkhash     | (string)         | the 32-byte hash of the original public keys                                          |
| ind        | (decimal number) | the index of the node, whose `partialsig` is now added to the `global data structure` |
| partialsig | (string)         | the `partialsig` value produced by the node with index `ind`                          |

#### Response

| Name        | Type             | Description                                                                   |
| ----------- | ---------------- | ----------------------------------------------------------------------------- |
| added_index | (decimal number) | the index of the node whose `partialsig` is added                             |
| myind       | (decimal number) | the index of the node on which this method is executed                        |
| combinedsig | (string)         | the `combinedsig` value produced by the node on which this method is executed |
| result      | (string)         | whether the call executed successfully                                        |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib partialsig 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"9e964dfd402f973ea1e9407e19918b1c3897ff6544d60dcdb19cfb0e5bc4c0c1"]'
```

<collapse-text hidden title="Response">

```json
{
  "added_index": 1,
  "result": "success",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"
}
```

</collapse-text>

## send

**cclib send 18 '["combined_pk", amount]'**

The `send` method allows any node on the network to fund the `combined_pk` with the specified `amount` .

The returned transaction id is called the `sendtxid`. It is used as a parameter for the methods [calcmsg](../customconsensus/musig.html#calcmsg) and [spend.](../customconsensus/musig.html#spend)

Usage of this method depends upon the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name        | Type     | Description                                         |
| ----------- | -------- | --------------------------------------------------- |
| combined_pk | (string) | the combined pubkey of all the signers              |
| amount      | (number) | the amount of coins to be sent to the `combined_pk` |

#### Response

| Name   | Type     | Description                                                             |
| ------ | -------- | ----------------------------------------------------------------------- |
| hex    | (string) | the send_transaction in raw-transaction format, provided in hexadecimal |
| txid   | (string) | the transaction id of the send transaction                              |
| result | (string) | whether the call executed successfully                                  |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG  cclib send 18 '["03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",1]'
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f890b02b1bdd8707f82bc6f4cdeb4756eb04dfc3cc7a4b5ac38a388c0205cf8f31a0e0000000048473044022004de31b5132f03f761fc0d0d9761efbf77bb27b07ee99f2cc54928e2150f1f16022069381b36bb9839cc9cb3e1d584e00dbd52efadf7e2f3fa092e0bcca839cdce6801ffffffff04949d5bf1722c5df04f58cf2c7e662f32ab65de2f7990ce4c734df4f2991eb60000000049483045022100ab3ab2bb95ef095763dd3eeb56961d1234aa25efd91a30fa14e397717368e6a0022048d7f8268463cfb44f34467bd77eb2aee962eaec09a079741c75c5de898b4f6c01ffffffff0476a06188887bf93bec4e64a3a5681b5e271cb7055a11d0667dc565e498b6190000000048473044022022ef03c33b5942b1af16f7e4a9acd2aa485d73f6f6b5e0a01e15f70238cd85cd022063779c69511ee4eba179b40ce28d80da22d43f19110be2a9a97d0b47d6a5cca201ffffffff045587699381853735482dbfb1fe25dda8d5a7a238c05b872ecfcd97be38232f00000000484730440220051e6047dd9e82b004c29a2837bf127f94caa638c65d96c761371c18ff36170002204e73ddfbbe748f295d7a93e46d942618f291d302b7a666b78b49ab38594a89ac01ffffffff0426d8098ed0c5ee19ac8d4254ec9887ab7a231c68a8d9b024a50f417f0a94ff0000000049483045022100ebd193262a04f8c9cf1872527d2a7d4933222f8ce8ea11add90e263c483ca56a02204a29902ae6b31dc41f84b5ffad3b2076755ad19f25be47479704b2ab5e37463a01ffffffff040e294b76ca4492909b75b829566b3702b35245595e8c4806b7ef6a7f612dd6000000004847304402201573d230af50aa6d326b607ac6ba77bb15c1a143256e5141197ce6729195b0e602201301be6ad22ba5599597205cdfb7e2cf6823ce4597e5b902b6d4336958e0fbe101ffffffff03d9a453070627c94d940f57b40829713ee6b6bce4d801e591117c801221225900000000494830450221009d5eec551265274ade816fdb3a0dfee20e716a7d3f56155b698a9d0c41ccd11202202e811c4611ebf982b34db8a43002c759c54a077023ced1498421c4af2b12a0f901ffffffff03ce7cb872bdfdf264576c45ed899c00731959051cade1a19b088eabc02e07780000000049483045022100a9c8c795e34a393fafb839ef4bbf11e4adf04b4c8a8493ef0bd2353e7a1ddd430220251ff7eb5ca3d2ed4ee4145906532af803caaed756ff3d21e86ac4876333067e01ffffffff030d66186013342f71335bc67d0d87240b4a27809e67ba55e01dd72e7ae1b0af0000000049483045022100d4c82867562aa040a7695ffd53056018e0dc3a071d971b3774cdb8511b0f49aa022029b72c5af1b9c16e27d81827d478910ec3135415037cf2b3492922ff618538bc01ffffffff02f9b92abfa0324272e0ce465b856e6d9b53e3e2e0828934c8a0c8c2c10e67d5000000004847304402205df4c99c581bfe95ea95740320b16c423531663b42e25b97315d3126250c24a202206dff5da29fbb0fe21ae6ce3da7bac1e502feb8fdd7b803c0fafa6541e80ec0ff01ffffffff02bd8679e8383e6d9c4a10917b68b8918ed3f518fe2deef5b23e0012461fbf370000000049483045022100a04210427173ea0721f3cf859b99328c8e234ba39250c033aebfb37fb2c5a1d502200d5cb16ed0dccc5dfc0385a8763340cf98a162e863994069354a5fee187b8bd401ffffffff031008f60500000000302ea22c8020c71ddb3aac7f9b9e4bdacf032aaa8b8e4433c4ff9f8a43cebb9c1f5da96928a48103120c008203000401cc604898000000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000266a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a000000003f0800000000000000000000000000",
  "txid": "09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293",
  "result": "success"
}
```

</collapse-text>

## session

**cclib session 18 '["myindex", "numsigners", "combined_pk", "pkhash", "msg"]'**

The `session` method creates a `global data structure` on each node on which the method is executed. The method also adds a `commitment` to sign the `msg` message provided.

Usage of this method depends on the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name        | Type             | Description                                                                                                                                    |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| myindex     | (decimal number) | the index of the node that is running this method; each node must be assigned a unique index from the set: {0,1,2,3, ... , (`numsigners` - 1)} |
| numsigners  | (decimal number) | the total number of signers participating                                                                                                      |
| combined_pk | (string)         | the combined pubkey of all the signers                                                                                                         |
| pkhash      | (string)         | the 32-byte hash of the original public keys                                                                                                   |
| msg         | (string)         | the message that needs to be signed by all the signers for the final [spend](../customconsensus/musig.html#spend) to succeed                   |

#### Response

| Name       | Type             | Description                                                              |
| ---------- | ---------------- | ------------------------------------------------------------------------ |
| myind      | (decimal number) | the index of the node on which this method is executed                   |
| numsigners | (decimal number) | the total number of signers participating                                |
| commitment | (string)         | the `commitment` value produced by the node for this `msg` and `session` |
| result     | (string)         | whether the call executed successfully                                   |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib session 18 '[0,2,"03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9","3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603"]'
```

<collapse-text hidden title="Response">

```json
{
  "myind": 0,
  "numsigners": 2,
  "commitment": "a886a3a3c57efec161f6f72554b66f837de89ffdabe0acc46ae4cd59aab8129e",
  "result": "success"
}
```

</collapse-text>

## spend

**cclib spend 18 '["sendtxid", "combinedsig", "scriptPubKey"]'**

The `spend` method spends coins to the indicated `scriptPubKey`.

The `scriptPubKey` expected here is of the type [p2pk](http://learnmeabitcoin.com/glossary/p2pk) in `hex` form.

To create a `scriptPubkey` from a normal `pubkey`, add the characters `21` to the beginning of the `pubkey` string and the characters `ac` to the end of the string:

```bash
scriptPubkey = 21 + pubkey + ac
```

For example:

- The `pubkey` is: `02f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193e`
- The associated `scriptPubkey` is: `2102f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193eac`

The method generates a raw transaction which must then be broadcast using [sendrawtransaction.](../komodo-api/rawtransactions.html#sendrawtransaction)

Usage of this method depends on the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name         | Type     | Description                                                                                                                                                                                      |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sendtxid     | (string) | the transaction id of the transaction created by the [send](../customconsensus/musig.html#send) method used to fund the MuSig address; only the funds in the `vout0` of the `sendtxid` are spent |
| combinedsig  | (string) | the combined signature produced by all the signers                                                                                                                                               |
| scriptPubKey | (string) | a modified form of a pubkey to which funds are to be spent                                                                                                                                       |

#### Response

| Name        | Type     | Description                                                                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| msg         | (string) | the message that needs to be signed by all the signers for the final [spend](../customconsensus/musig.html#spend) to succeed |
| combined_pk | (string) | the combined pubkey of all the signers                                                                                       |
| combinedsig | (string) | the combined signature produced by all the signers                                                                           |
| hex         | (string) | the `spend` transaction in raw-transaction format, provided in hexadecimal                                                   |
| txid        | (string) | the transaction id of the spend transaction                                                                                  |
| result      | (string) | whether the call executed successfully                                                                                       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib spend 18 '["09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293","210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```

<collapse-text hidden title="Response">

```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2",
  "hex": "0400008085202f890193c200495d92c09a3eb527a552c129bf3c991a29478356f92870e1b65ca4da09000000007b4c79a276a072a26ba067a5658021032d29d6545a2aafad795d9cf50912ecade549137163934dfb2895ebc0e211ce8a8140878ae4c7520e729e74339e1d463d8aabc1e63c0f726c868adcf7ceab268ef62870596c7c87bdd9382bd364749662ffc79e6ee094a155678b7c2127480960b631a100af03800112a10001ffffffff0200e1f5050000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000686a4c6512792103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a404b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f200000000460800000000000000000000000000",
  "txid": "332373cd0e4cbdddd3916e827a408ba4a175eb5039cc5a43725a50b83cb74e52",
  "result": "success"
}
```

</collapse-text>

## verify

**cclib verify 18 '["msg", "combined_pk", "combinedsig"]'**

The `verify` method verifies that the `combinedsig` is able to spend the funds owned by `combined_pk`. The funds in question are those which were referenced in the creation of the `msg` value.

Usage of this method depends on the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`.

#### Arguments

| Name        | Type     | Description                                                                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| msg         | (string) | the message that needs to be signed by all the signers for the final [spend](../customconsensus/musig.html#spend) to succeed |
| combined_pk | (string) | the combined pubkey of all the signers                                                                                       |
| combinedsig | (string) | the `combinedsig` value produced by the node on which this method is executed                                                |

#### Response

| Name        | Type     | Description                                                                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| msg         | (string) | the message that needs to be signed by all the signers for the final [spend](../customconsensus/musig.html#spend) to succeed |
| combinedsig | (string) | the `combinedsig` value produced by the node on which this method is executed                                                |
| combined_pk | (string) | the combined pubkey of all the signers                                                                                       |
| result      | (string) | whether the call executed successfully                                                                                       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib verify 18 '["3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603","03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```

<collapse-text hidden title="Response">

```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2",
  "result": "success"
}
```

</collapse-text>


