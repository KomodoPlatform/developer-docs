# Payments

## Introduction

The Payments Module allows a payment to be distributed between multiple recipients in a pre-defined proportion.

<!-- Sidd: After working through this documentation, I'm still confused about a few things.

What is the Rich List? Can we please explain this here?

How does this module hook up with other modules? Is this intended to be used with other modules? When would you use this with a module, and when would you use it without a module?

What is the deal with the airdrop-related RPCs? -->

### Payments Module Flow

- Use [paymentstxidopret](#paymentstxidopret) to create as many transactions as there are recipients
  - Each recipient must have the following data in the associated transaction's opreturn. This step makes the data available on the blockchain so that the data can be used by a later method
    - Weight (also called "share")
    - Recipient
    - Destopret (optional)
      - This data is stored in the OP_RETURN of the subsequent payment transaction
  - The transaction id is called `paytxnid` and it is used as a reference to the data
- Use [paymentscreate](#paymentscreate) to create a new Payment plan
  - The arguments passed include the following
    - The number of blocks to lock the funds after funding
    - The minimum release amount
    - The `paytxnid`
      - This contains data about the recipients and their corresponding shares
  - The returned transaction id is called `createtxid` and it will be the reference for this payment plan used by other methods
- Use [paymentsfund](#paymentsfund) to fund any existing payment plan
- Use [paymentsrelease](#paymentsrelease) to release payments to a Payments plan

## paymentstxidopret

**paymentstxidopret '[allocation,"scriptPubKey",("destopret")]'**

Use the `paymentstxidopret` method to create a transaction for each intended recipient of a Payments plan.

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| allocation   | (number)           | defines the share of a payment to the given `scriptPubkey`.                                 |
| scriptPubKey | (string)           | [scriptPubkey](https://learnmeabitcoin.com/glossary/scriptPubKey) of the recipient          |
| destopret    | (string, optional) | data to be stored in the OP_RETURN of the transaction that sends funds to the scriptPubkey. |

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| hex    | (string) | the transaction in raw format, provided in hexadecimal |
| txid   | (string) | the transaction id of the `paymentstxidopret` transaction                            |
| result | (string) | whether the call executed successfully                                |

#### Additional Details

##### allocation

Recall that `allocation` is the number that defines the share of a payment to the given `scriptPubkey`.

For example, if a Payments plan has the allocation to `scriptPubkey_1` as the number `n1` and allocation to `scriptPubkey_2` as the number `n2`, then any funds sent to this payment plan are split between `scriptPubkey_1` and `scriptPubkey_2` in the ratio `n1:n2`. 

If funds sent to the Payments plan has the value N, `scriptPubkey_1` will receive `(N*n1)/(n1+n2)` and `scriptPubkey_1` will receive `(N*n2)/(n1+n2)`

##### scriptPubkey

Recall that `scriptPubkey` is the puzzle that locks coins in a transaction.

###### Pubkey Mutation

If the recipient is a normal pubkey, the [scriptPubkey](https://learnmeabitcoin.com/glossary/scriptPubKey) can be constructed by sandwiching the pubkey between the strings `"21"` and `"ac"`. In this case, the private key corresponding to the pubkey can be used to sign a transaction that unlocks the coins.

The `scriptPubKey` parameter can belong to any valid type described [in this linked list](https://learnmeabitcoin.com/glossary/scriptPubKey). This list is not exhaustive of all types available to a valid `scriptPubkey` parameter; please inquire with our developers for more details, if necessary.

For example, given the pubkey `02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567`, the `scriptPubkey` will be `2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac`.

###### Address Substitution

The node that executes the `paymentstxidopret` RPC can replace the `scriptPubkey` with a normal base58 encoded address, so long as the node has the address's associated private key in the node's local wallet.

For example, the address `RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa` can be used in place of a `scriptPubkey` without any modifications by a node which has access to the corresponding private key.

The `validateaddress` RPC can be used to verify that an address belongs to the node. 

The `validateaddress` RPC can also verify that the `pubkey` on which the base58 encoded address is based is also the `pubkey` associated with the relevant `scriptPubkey`.

Therefore, using either `RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa` or `2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac` as the `scriptPubkey` argument is equivalent.

###### Command

```bash
./komdo-cli -ac_name=HELLOWORLD validateaddress RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa
```

###### Response

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "isvalid": true,
  "address": "RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa",
  "scriptPubKey": "76a9148cad275b85eb32fff144f3650b74e7c18bdd9b2288ac",
  "segid": 51,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567",
  "iscompressed": true,
  "account": ""
}
```

</collapse-text>

</div>

##### destopret (optional)

Data provided in `destopret` is stored in the opreturn of the transaction that sends funds to the `scriptPubkey`.

If the `scriptPubkey` belongs to an Antara Module that expects opreturn data, this data must be provided using `destopret`.

For example, if a Payments plan sends a portion of funds to an instance of the Rewards Antara Module, the Payments transaction must add data to the `destopret` to specify the specific instance of the Rewards plan.

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentstxidopret '[9,"222102d6f13a8f745921cdb811e32237bb98950af1a5952be7b3d429abd9152f8e388dac"]'
```

###### Response

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f89010012d25c46d1f831d74c7c3e71fd32343f53ead192cc70e9e8edf7586571759a0000000048473044022004f5a7e3eb7f5010953c2bca7af2113ee3559b5f7adc86ad09b872526e3b36f6022040b6409eb612c847185b274eb76a3ff60f0e970e5e78d3eee9269b5f0661611001ffffffff02f0b9f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000326a30f054090000000000000024222102d6f13a8f745921cdb811e32237bb98950af1a5952be7b3d429abd9152f8e388dac00000000000b0400000000000000000000000000",
  "txid": "9c731f6bbdaa6159b7c0955f3d1e1df72a64a38cd20198d59cd11f0fc506e00e",
  "result": "success"
}
```

</collapse-text>

</div>

###### Broadcast the transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f89010012d25c46d1f831d74c7c3e71fd32343f53ead192cc70e9e8edf7586571759a0000000048473044022004f5a7e3eb7f5010953c2bca7af2113ee3559b5f7adc86ad09b872526e3b36f6022040b6409eb612c847185b274eb76a3ff60f0e970e5e78d3eee9269b5f0661611001ffffffff02f0b9f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000326a30f054090000000000000024222102d6f13a8f745921cdb811e32237bb98950af1a5952be7b3d429abd9152f8e388dac00000000000b0400000000000000000000000000
```

###### Response

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```bash
9c731f6bbdaa6159b7c0955f3d1e1df72a64a38cd20198d59cd11f0fc506e00e
```

</collapse-text>

</div>

## paymentscreate

**paymentscreate '[lockedblocks,minamount,"paytxid",...,"paytxidN"]'**

Use the `paymentscreate` method after the `paymentstxidopret` method to create a new instance of the Payments plan.

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| lockedblocks   | (number)           | the number of blocks that must be confirmed on the network before the plan's funds can be released                                 |
| minamount | (number)  | the minimum amount of funds that can be released  |
| "paytxid"    | (string, accepts multiple) | the transaction ids of all transactions created in the preceding `paymentstxidopret` method |

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| hex    | (string) | the transaction in raw format, provided in hexadecimal |
| txid   | (string) | the transaction id of the `paymentscreate` transaction                            |
| result | (string) | whether the call executed successfully                                |

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentscreate '[0,0,"9c731f6bbdaa6159b7c0955f3d1e1df72a64a38cd20198d59cd11f0fc506e00e","3398899808706726bf04c815ca994f616768a1d4ad2546f14246bef3a926117d"]'
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f8901002a73fb5f67f406f4686cd3124f38bf1ecbc9b997adc548914c2bc344453f700000000048473044022034b381a812ad57e5a726319f47db4e59666b65dc1eb7ab3e8eb32f7a3637624b02203ca606a74c18389f7ba20ab09086db66a4d21826673e9970ceb3d6f2c4bfea0501ffffffff031027000000000000302ea22c8020f7d6c2e6ca04be384f425a199bc2ad90dcc3e13effe6822b29598f47e2795da781031210008203000401cce092f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000566a4c53f04300000000000000000a00000000000000020ee006c50f1fd19cd59801d28ca3642af71d1e3d5f95c0b75961aabd6b1f739c7d1126a9f3be4642f14625add4a16867614f99ca15c804bf266770089889983300000000860a00000000000000000000000000",
  "txid": "c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837",
  "result": "success"
}
```

</collapse-text>

</div>

###### Broadcast the transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f8901002a73fb5f67f406f4686cd3124f38bf1ecbc9b997adc548914c2bc344453f700000000048473044022034b381a812ad57e5a726319f47db4e59666b65dc1eb7ab3e8eb32f7a3637624b02203ca606a74c18389f7ba20ab09086db66a4d21826673e9970ceb3d6f2c4bfea0501ffffffff031027000000000000302ea22c8020f7d6c2e6ca04be384f425a199bc2ad90dcc3e13effe6822b29598f47e2795da781031210008203000401cce092f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000566a4c53f04300000000000000000a00000000000000020ee006c50f1fd19cd59801d28ca3642af71d1e3d5f95c0b75961aabd6b1f739c7d1126a9f3be4642f14625add4a16867614f99ca15c804bf266770089889983300000000860a00000000000000000000000000
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```bash
c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837
```

</collapse-text>

</div>

## paymentsairdrop

**paymentsairdrop '[lockedblocks, minamount, mintoaddress, top, bottom, fixedFlag, "excludeAddress", ... , "excludeAddressN"]'**

The `paymentsairdrop` method 

<!-- Sidd: We need a description here -->

<!-- Sidd: ac_snapshot is not yet documented. -->

::: tip

The <b>paymentsairdrop</b> RPC requires the [<b>-ac_snapshot</b>]() to be active.

:::

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| lockedblocks   | (number)           | the number of blocks that must be confirmed on the network before the plan's funds can be released                                 |
| minamount | (number)  | the minimum amount of funds that can be released  |
| mintoaddress | (number) | the minimum amount that can be paid to an address <br> setting this value to `0` defaults to `10000` satoshis |
| top | (number) | having sorted into an array all known addresses by their value from least (top) to greatest (bottom), this `top` value sets the index number of the lowest-value address that should receive a portion of the airdrop; this value must not be equal to `0` nor over `3999` <!-- Sidd: I totally guessed on this --> |
| bottom | (number) | having sorted into an array all known addresses by their value from least (top) to greatest (bottom), this `bottom` value sets the index number of the highest-value address that should receive a portion of the airdrop; this value is normally set to `0`, unless the airdrop issuer desires to exclude rich members from the airdrop <!-- Sidd: Totally guessing --> |
| fixedFlag | (string) | <br> set to `0`: all receiving addresses in the rich list are paid based on their balance <!-- Sidd: I don't understand this --> <br><br> set to `1`: the amount paid is fixed and split evenly over all receiving addresses <br><br> set to `7`: activates a "game mode" that changes the values of the bottom and top index numbers based on the block hash of the block in which the daily airdrop was taken <br><br> <!-- Sidd: I don't get this --> |
| "excludeAddress" | (string, accepts multiple) | <!-- Sidd: I'm guessing here --> any address included as an <b>excludeAddress</b> is ommitted from the airdrop |

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| ( ) | | | 

<!-- Sidd: Need examples -->

## payments_airdroptokens

**payments_airdroptokens '[“tokenid", lockedblocks, minamount, mintoaddress, top, bottom, fixedFlag, "excludePubKey", ... , "excludePubKeyN"]'**

::: danger

The <b>payments_airdroptokens</b> method is still in development. Please inquire on [<b>Discord</b>](komodoplatform.com/discord) for more details.

:::

<!-- 

Tokenid, is the token to base the airdrop on.

-->

## paymentsinfo

**paymentsinfo '[“createtxid"]'**

The `paymentsinfo` method returns relevant information about the provided `createtxid` Payments plan.

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| createtxid | (string) | the transaction id of the specific Payments plan the user desires to inspect |

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| hex    | (string) | the transaction in raw format, provided in hexadecimal |
| txid   | (string) | the transaction id of the `paymentscreate` transaction                            |
| result | (string) | whether the call executed successfully                                |

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentscreate '[0,0,"9c731f6bbdaa6159b7c0955f3d1e1df72a64a38cd20198d59cd11f0fc506e00e","3398899808706726bf04c815ca994f616768a1d4ad2546f14246bef3a926117d"]'
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f8901002a73fb5f67f406f4686cd3124f38bf1ecbc9b997adc548914c2bc344453f700000000048473044022034b381a812ad57e5a726319f47db4e59666b65dc1eb7ab3e8eb32f7a3637624b02203ca606a74c18389f7ba20ab09086db66a4d21826673e9970ceb3d6f2c4bfea0501ffffffff031027000000000000302ea22c8020f7d6c2e6ca04be384f425a199bc2ad90dcc3e13effe6822b29598f47e2795da781031210008203000401cce092f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000566a4c53f04300000000000000000a00000000000000020ee006c50f1fd19cd59801d28ca3642af71d1e3d5f95c0b75961aabd6b1f739c7d1126a9f3be4642f14625add4a16867614f99ca15c804bf266770089889983300000000860a00000000000000000000000000",
  "txid": "c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837",
  "result": "success"
}
```

</collapse-text>

</div>

###### Broadcast the transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f8901002a73fb5f67f406f4686cd3124f38bf1ecbc9b997adc548914c2bc344453f700000000048473044022034b381a812ad57e5a726319f47db4e59666b65dc1eb7ab3e8eb32f7a3637624b02203ca606a74c18389f7ba20ab09086db66a4d21826673e9970ceb3d6f2c4bfea0501ffffffff031027000000000000302ea22c8020f7d6c2e6ca04be384f425a199bc2ad90dcc3e13effe6822b29598f47e2795da781031210008203000401cce092f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000566a4c53f04300000000000000000a00000000000000020ee006c50f1fd19cd59801d28ca3642af71d1e3d5f95c0b75961aabd6b1f739c7d1126a9f3be4642f14625add4a16867614f99ca15c804bf266770089889983300000000860a00000000000000000000000000
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```bash
c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837
```

</collapse-text>

</div>

## paymentslist

**paymentslist**

The `paymentslist` method lists all Payment plan `createtxids` that are active on the Smart Chain.

<!-- Sidd: I made up the above, based on the title of the RPC. However, it doesn't make any sense, when compared with the example that Gcharang provided below. Need someone to fix everything here. -->

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| (none) | | | 

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| hex    | (string) | the transaction in raw format, provided in hexadecimal |
| txid   | (string) |  |
| result | (string) | whether the call executed successfully                                |

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentscreate '[0,0,"9c731f6bbdaa6159b7c0955f3d1e1df72a64a38cd20198d59cd11f0fc506e00e","3398899808706726bf04c815ca994f616768a1d4ad2546f14246bef3a926117d"]'
```

###### Response

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f8901002a73fb5f67f406f4686cd3124f38bf1ecbc9b997adc548914c2bc344453f700000000048473044022034b381a812ad57e5a726319f47db4e59666b65dc1eb7ab3e8eb32f7a3637624b02203ca606a74c18389f7ba20ab09086db66a4d21826673e9970ceb3d6f2c4bfea0501ffffffff031027000000000000302ea22c8020f7d6c2e6ca04be384f425a199bc2ad90dcc3e13effe6822b29598f47e2795da781031210008203000401cce092f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000566a4c53f04300000000000000000a00000000000000020ee006c50f1fd19cd59801d28ca3642af71d1e3d5f95c0b75961aabd6b1f739c7d1126a9f3be4642f14625add4a16867614f99ca15c804bf266770089889983300000000860a00000000000000000000000000",
  "txid": "c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837",
  "result": "success"
}
```

</collapse-text>

</div>

###### Broadcast the transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f8901002a73fb5f67f406f4686cd3124f38bf1ecbc9b997adc548914c2bc344453f700000000048473044022034b381a812ad57e5a726319f47db4e59666b65dc1eb7ab3e8eb32f7a3637624b02203ca606a74c18389f7ba20ab09086db66a4d21826673e9970ceb3d6f2c4bfea0501ffffffff031027000000000000302ea22c8020f7d6c2e6ca04be384f425a199bc2ad90dcc3e13effe6822b29598f47e2795da781031210008203000401cce092f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000566a4c53f04300000000000000000a00000000000000020ee006c50f1fd19cd59801d28ca3642af71d1e3d5f95c0b75961aabd6b1f739c7d1126a9f3be4642f14625add4a16867614f99ca15c804bf266770089889983300000000860a00000000000000000000000000
```

###### Response

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```bash
c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837
```

</collapse-text>

</div>

## paymentsfund

**paymentsfund '[“createtxid", amount(, useopret)]'**

<!-- Sidd: Need explanation -->

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| createtxid | (string) | the transaction id of the specific Payments plan the user desires to fund |
| amount | (number) | the amount of funds to send |
| useopret | (number) | <br> a flag that instructions the Payments Module to create a transaction for the global Payments Module address (also called the global CC address) <br><br>use this RPC to obtain the <b>scriptPubKey</b> you need to fund a Payments plan from another source; for example, a coinbase transaction or another contract <br><br> <!-- Sidd: This last part doesn't make sense to me. Can someone please provide more information? --> |

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| | | |

<!-- Sidd: Need responses -->

#### :pushpin: Examples

###### Command

###### Response

<!-- Sidd: Need examples above. -->

## paymentsmerge

**paymentsmerge '[“createtxid"]'**

The `paymentsmerge` method merges all funds on a Payments plan into a single [utxo](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept) in the plan's special address. <!-- Sidd: What does "special address" mean? -->

Merged funds enforce a state called "lockedblocks." In this state, funds cannot be spent until a certain number of blocks are confirmed on the network. The number of blocks is determined by the way the Payments plan was originally created. 

Once locked, the funds cannot be merged again for at least `100` blocks beyond the number of `lockedblocks` set in the plan. This prevents a user from merging again the funds before the funds can be released the first time, which would thus allow users to accidentally overlap periods of locking. 

<!-- Sidd: What does "it" mean in the below sentence? Need more information. -->

It exists because a very large tx cannot have lots of inputs.

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| createtxid | (string) | the transaction id of the specific Payments plan the user desires to merge |

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| | | |

<!-- Sidd: Need responses -->

#### :pushpin: Examples

###### Command

###### Response

<!-- Sidd: Need examples above. -->

## paymentsrelease

**paymentsrelease '[“createtxid",amount,(skipminimum)]'**

The `paymentsrelease` method releases payments of the given `createtxid` Payments plan. Payments are given in the `amount` size.

<!-- Sidd: Do we need to say something about who has the right to execute this plan? Do you have to send this from the pubkey that created the plan? -->

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| createtxid | (string) | the transaction id of the specific Payments plan the user desires to fund |
| amount | (number) | the amount of funds to release; this value must be higher than the minimum-amount requirement originally set in the plan |
| skipminimum | (number) | a flag; if there is an address that has a balance too low to meet the minimum-amount requirement, setting this `skipminimum` flag to <!-- Sidd: I need a value? --> wil truncate the rich list <!-- Sidd: what is the Rich list? I've heard of the general concept before, but I need a specific definition for this module --> at the first address that is set to receive an amount below the threshold <!-- Sidd: I had to guess tat the meaning for the last part -->

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| | | |

<!-- Sidd: Need responses -->

#### :pushpin: Examples

###### Command

###### Response

<!-- Sidd: Need examples above. -->

