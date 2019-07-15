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
    - The `paytxnids`
      - These contains data about the recipients and their corresponding shares
  - The returned transaction id is called `createtxid` and it will be the reference for this payment plan used by other methods
- Use [paymentsfund](#paymentsfund) to fund any existing Payments plan
- Use [paymentsrelease](#paymentsrelease) to release payments of a Payments plan

## paymentscreate

**paymentscreate '[lockedblocks,minamount,"paytxid",...,"paytxidN"]'**

Use the `paymentscreate` method after receiving the `paytxids` from all the recipients to create a new instance of the Payments plan.

#### Arguments

| Name         | Type                       | Description                                                                                                                                 |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| lockedblocks | (number)                   | the number of confirmations the "Payments create transaction" of a plan must receive on the network before the plan's funds can be released |
| minamount    | (number)                   | the minimum amount of funds that can be released                                                                                            |
| "paytxid"    | (string, accepts multiple) | the transaction ids of all transactions created using the preceding `paymentstxidopret` method                                              |

#### Response

| Name   | Type     | Description                                                                     |
| ------ | -------- | ------------------------------------------------------------------------------- |
| hex    | (string) | the transaction in raw format, provided in hexadecimal                          |
| txid   | (string) | the transaction id of the `paymentscreate` transaction, called the `createtxid` |
| result | (string) | whether the call executed successfully                                          |

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

## paymentsfund

**paymentsfund '[“createtxid", amount(, useopret)]'**

The `paymentsfund` method is used to add funds to a Payments plan that has been created.

<!---can revisit this later as part of another tutorial:
  this RPC can be used to obtain the <b>scriptPubKey</b> necessary to fund a Payments plan from another source; for example, a coinbase transaction or another module  --->

#### Arguments

| Name       | Type     | Description                                                                                                                                                                                                                                                          |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createtxid | (string) | the transaction id of the specific Payments plan the user desires to fund                                                                                                                                                                                            |
| amount     | (number) | the amount of funds to send                                                                                                                                                                                                                                          |
| useopret   | (number) | <br> a flag that instructs the Payments Module on where to send the funds <br><br> if `0` (default), funds are sent to the `1of2` address corresponding to the specific Payments plan <br><br> if `1`, funds are sent to the to the Payments Module's Global address |

#### Response

| Name   | Type     | Description                                            |
| ------ | -------- | ------------------------------------------------------ |
| hex    | (string) | the transaction in raw format, provided in hexadecimal |
| txid   | (string) | the transaction id of the `paymentsfund` transaction   |
| result | (string) | whether the call executed successfully                 |

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentsfund '["c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837",7,1]'
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f8908001efc1fdeee5ff6f02669c3b0dc44328a0ab3d164099be60bb752cd00a9474c000000004847304402200995f3ffcbf22ff71e4cd34f004f57faf0a63b02580ee703c3c7af8dbfad4db502203ff43305875d26a01c551dde40db13098c229eb35d0a17842bf49463d310676b01ffffffff0076f017cf49a7b952163e0f6e92898795197741e54c7975f2d3af1e49fe7e760000000048473044022063e5e1a7b3fdec6e19143817e208411656bae613f259bf51ecb27e4d2586134602204ede23fe353dc87bfd4b9e154b576812fd7e4e9232e8906ec3535fa8519956c001ffffffff00621604313b81ed8556ceaf29fe93b55d419de53e3947c48cb6f77cd852eefb00000000484730440220154b9727e0f377ce141f63845b729fc392096a5d04c966368fad4d077e1255a30220708f7bd907e180cf819e4fc3bec12f168fcdbbb8570cb919cade2cd84c159b1401ffffffff0060083ce708e81c46b2e12e87051a87817d072be85ba5dd55c728348c0dd6560000000048473044022010ee0f67a08c1d7d4939629e7a8786cb1b8b1ad4c8d0e0acb72fb33bfadcabe702204cd5a11c838917677c10d81105f19620649ba1ddb82677c384434ec38995397001ffffffff0055e6ca9fd40a82d4db0c626eb8e0aa6376d45ae9bd55ae5995e145a0095161000000004847304402200c4c94a85ba91417ad66ced737efbabdaa80fa78727b510a4b052b53307ac46702200c5895f74526cb6fc930568f2ae23638d7af37735e15b1c46f2bfb83ae0bb4cc01ffffffff003ffe904cdc927be067b21d19f0c57b2bfbc7f669c1f176134c24eee038d1760000000049483045022100b440206ef0613c5abc15803b047d1b73d024f2e3c33dce5db7633629c169847502206786c8cd7f29e2bc42559d42b441a812bf4a6604e0244c474e94a1e080b3657001ffffffff003c5c30c4107b975ca2bd4165940b432b1dae92110f0adb4540d84c42a7adf6000000004847304402205c994a23360b7d7147debc2c91300575b466c5b3862ca4d6c42bb2d0421539a7022031ed30cb9e667d30ee399d38899ad24aecd44e5545d2ce9357fc4192b41098e701ffffffff00339f6cb6e5b158a156b88e2b99d5bd08612000aa35e2e57fd54fc13145a69a0000000049483045022100db64b42398ff454c4370f90c903a2d9b1485f75dff8ee7f7b5285b531aee75fc02207d2162f469122af6d0c7edb622dd7dd4aef551b22ae1ea3c77320c12095a5cf401ffffffff020027b929000000005c2ea22c8020987fad30df055db6fd922c3a57e55d76601229ed3da3b31340112e773df3d0d28103120c008203000401cc2a0401f00101246a22f04637383c2bde377a8caafc73cba2f16671d0617f59fe5e64d00a1dd255ec51dec475f0b9f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000420f00000000000000000000000000",
  "txid": "4c04f2d75ece337c7b4f86eb3962b37b97f8af8b261fe68abb49815524e8be50",
  "result": "success"
}
```

</collapse-text>

</div>

###### Broadcast the transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f8908001efc1fdeee5ff6f02669c3b0dc44328a0ab3d164099be60bb752cd00a9474c000000004847304402200995f3ffcbf22ff71e4cd34f004f57faf0a63b02580ee703c3c7af8dbfad4db502203ff43305875d26a01c551dde40db13098c229eb35d0a17842bf49463d310676b01ffffffff0076f017cf49a7b952163e0f6e92898795197741e54c7975f2d3af1e49fe7e760000000048473044022063e5e1a7b3fdec6e19143817e208411656bae613f259bf51ecb27e4d2586134602204ede23fe353dc87bfd4b9e154b576812fd7e4e9232e8906ec3535fa8519956c001ffffffff00621604313b81ed8556ceaf29fe93b55d419de53e3947c48cb6f77cd852eefb00000000484730440220154b9727e0f377ce141f63845b729fc392096a5d04c966368fad4d077e1255a30220708f7bd907e180cf819e4fc3bec12f168fcdbbb8570cb919cade2cd84c159b1401ffffffff0060083ce708e81c46b2e12e87051a87817d072be85ba5dd55c728348c0dd6560000000048473044022010ee0f67a08c1d7d4939629e7a8786cb1b8b1ad4c8d0e0acb72fb33bfadcabe702204cd5a11c838917677c10d81105f19620649ba1ddb82677c384434ec38995397001ffffffff0055e6ca9fd40a82d4db0c626eb8e0aa6376d45ae9bd55ae5995e145a0095161000000004847304402200c4c94a85ba91417ad66ced737efbabdaa80fa78727b510a4b052b53307ac46702200c5895f74526cb6fc930568f2ae23638d7af37735e15b1c46f2bfb83ae0bb4cc01ffffffff003ffe904cdc927be067b21d19f0c57b2bfbc7f669c1f176134c24eee038d1760000000049483045022100b440206ef0613c5abc15803b047d1b73d024f2e3c33dce5db7633629c169847502206786c8cd7f29e2bc42559d42b441a812bf4a6604e0244c474e94a1e080b3657001ffffffff003c5c30c4107b975ca2bd4165940b432b1dae92110f0adb4540d84c42a7adf6000000004847304402205c994a23360b7d7147debc2c91300575b466c5b3862ca4d6c42bb2d0421539a7022031ed30cb9e667d30ee399d38899ad24aecd44e5545d2ce9357fc4192b41098e701ffffffff00339f6cb6e5b158a156b88e2b99d5bd08612000aa35e2e57fd54fc13145a69a0000000049483045022100db64b42398ff454c4370f90c903a2d9b1485f75dff8ee7f7b5285b531aee75fc02207d2162f469122af6d0c7edb622dd7dd4aef551b22ae1ea3c77320c12095a5cf401ffffffff020027b929000000005c2ea22c8020987fad30df055db6fd922c3a57e55d76601229ed3da3b31340112e773df3d0d28103120c008203000401cc2a0401f00101246a22f04637383c2bde377a8caafc73cba2f16671d0617f59fe5e64d00a1dd255ec51dec475f0b9f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000420f00000000000000000000000000
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```bash
4c04f2d75ece337c7b4f86eb3962b37b97f8af8b261fe68abb49815524e8be50
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

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```bash
9c731f6bbdaa6159b7c0955f3d1e1df72a64a38cd20198d59cd11f0fc506e00e
```

</collapse-text>

</div>

## paymentsinfo

**paymentsinfo '["createtxid"]'**

The `paymentsinfo` method returns relevant information about the Payments plan referred by the provided `createtxid` .

#### Arguments

| Name       | Type     | Description                                                                  |
| ---------- | -------- | ---------------------------------------------------------------------------- |
| createtxid | (string) | the transaction id of the specific Payments plan the user desires to inspect |

#### Response

| Name                               | Type             | Description                                                                         |
| ---------------------------------- | ---------------- | ----------------------------------------------------------------------------------- |
| plan_type                          | (string)         | the type of the plan                                                                |
| lockedblocks                       | (number)         | the number of blocks the funding to this Payment plan is locked                     |
| totalallocations                   | (number)         | sum of the allocation numbers of all the `paytxnids`                                |
| minrelease                         | (number)         | the miminum amount of funds locked that can be released                             |
| numoprets                          | (number)         | number of `OP_RETURN`s (can be `0`/`1`)                                             |
| txidoprets                         | (array of jsons) | an array containing `paytxnids` and their `scriptPubkeys`                           |
| txid                               | (string)         | the `paytxnid` of one of the recipients                                             |
| scriptPubKey                       | (string)         | the `scriptPubkey` corresponding to the above `paytxnid`                            |
| RDjEATVvJm8ff2rEYq6yRmzQEuL4mZtF2r | (number)         | the amount of funds stored in the `1of2` address corresponding to this Payment plan |
| utxos                              | (number)         | the number of utxos belonging to the above address                                  |
| REpyKi7avsVduqZ3eimncK4uKqSArLTGGK | (number)         | the amount of funds stored in the Payments modules's Global address                 |
| utxos                              | (number)         | the number of utxos belonging to the above address                                  |
| totalfunds                         | (number)         | the total amount of funds available                                                 |
| elegiblefunds                      | (number)         | the total amount of funds eleigible to be released                                  |
| min_release_height                 | (number)         | the block height after which atleast some of the funds can be released              |
| result                             | (string)         | whether the call executed successfully                                              |

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentsinfo '["c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837"]'
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "plan_type": "payments",
  "lockedblocks": 0,
  "totalallocations": 10,
  "minrelease": 0,
  "numoprets": 0,
  "txidoprets": [
    {
      "txid": "9c731f6bbdaa6159b7c0955f3d1e1df72a64a38cd20198d59cd11f0fc506e00e",
      "scriptPubKey": "222102d6f13a8f745921cdb811e32237bb98950af1a5952be7b3d429abd9152f8e388dac"
    },
    {
      "txid": "3398899808706726bf04c815ca994f616768a1d4ad2546f14246bef3a926117d",
      "scriptPubKey": "2221039433dc3749aece1bd568f374a45da3b0bc6856990d7da3cd175399577940a775ac"
    }
  ],
  "RDjEATVvJm8ff2rEYq6yRmzQEuL4mZtF2r": 800.0,
  "utxos": 1,
  "REpyKi7avsVduqZ3eimncK4uKqSArLTGGK": 777.0,
  "utxos": 1,
  "totalfunds": 1577.0,
  "elegiblefunds": 1577.0,
  "min_release_height": 3683,
  "result": "success"
}
```

</collapse-text>

</div>

## paymentslist

**paymentslist**

The `paymentslist` method lists all Payment plan `createtxids` that are active on the Smart Chain.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name        | Type     | Description                                                    |
| ----------- | -------- | -------------------------------------------------------------- |
| result      | (string) | whether the call executed successfully                         |
| createtxids | (array)  | the txids of all the Payments plans created on the Smart chain |

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentslist
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "createtxids": [
    "c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837"
  ]
}
```

</collapse-text>

</div>

## paymentsmerge

**paymentsmerge '[“createtxid"]'**

The `paymentsmerge` method merges funds into a single [utxo.](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept)

The funds merged can be either the funds currently in the `1of2` address, or the funds can be the funds in the Payments Module's Global Address.

Merged funds cannot be merged again for a period of time after the merger. The time required depends on the value set in the `lockedblocks` argument when the `paymentscreate` method was executed. The period of time in which the funds cannot be merged is `lockedblocks + 100`. This prevents the user from merging the funds a second time before the funds can be released from the first merger.

The size of a `paymentsrelease` transaction is bound by the normal rules of consensus, and therefore the number of inputs that can be provided as arguments is limited. If the number of inputs is too high, the consensus mechanism will reject the transaction when it is broadcast to the network. In this event, simply split the inputs between multiple `paymentsrelease` transactions as necessary.

#### Arguments

| Name       | Type     | Description                                                                             |
| ---------- | -------- | --------------------------------------------------------------------------------------- |
| createtxid | (string) | the transaction id of the specific Payments plan whose inputs the user desires to merge |

#### Response

| Name   | Type     | Description                                            |
| ------ | -------- | ------------------------------------------------------ |
| hex    | (string) | the transaction in raw format, provided in hexadecimal |
| txid   | (string) | the transaction id of the `paymentsmerge` transaction  |
| result | (string) | whether the call executed successfully                 |

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentsmerge '["c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837"]'
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f890a0724d77b165969158bd68d6502bf40ceff93f1c9fc5be0421eda9859488d21b900000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140b0d0df465b818c4b29871433f7913e80d8d27114283ba6ef1b7b91280c189aa829e29946a75d925410dc3087dcd482bed3f98149275e902c0e6bd4e338066e41a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff18a003bf4399b2cbcecbf6fd494eec9c80996603dad5e4ce300c9bc4b1a4cd5400000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140f725750c29f92e401033a6334016bb224aa4cf26064c28e0c39a0bc126cf2d5767af46207abc6662f084e3c257e30b6939acdc194f36624d9f8b4288626faaf6a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff199096b27c33b86f7bab650a2188e82a865e737913546108615ac7d77a1c540300000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814008a1b9d33980f42027cb680923e8e9ef03ed6df7ba32676acd134ca551260b1f5ccd82b52b47945f19523b3dcab456937ef4efa954df1adc5d77d1c974db4f41a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff1c48e0c48972da890aa32f2932f60ed00c270d0168108895ab6f5b88ac765f6600000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814049c690811754dc2242bf56c7fa538154274fc56ed4fcedc09f5cc2febb09bdcd3964644b8724f4118b269b80c9cb5147eb6ea627a6b72bae8be7c92205837d6fa129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff5241478ba2dad22756b37c0e5d9fd0101ab1fa791f78b26b8ee8b7a4b6b7849b00000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814014217e878c17c15d169d8d16cfdb87338993c711157a6f2d0e3dea2a57c80742740c2763267d9056f3004e10c451dd39651f4895f829e8b6a6f81432f2aef534a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff76a5e60ef27316f9c1876f2c5a83114ac26aa977bad655e24c735158025e770800000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b4685681400d1d01976f725fe7274e70261de970a34acfd1819a454b6e0c5e89395306dbd437d34152a1d06d3809395bf9de0928e03049a596b7e168d0d0c085bc8d5b45e7a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff80e0f4be24118fbe0e486535aa5d3076b1d8991e84907fc5bd08524694e1396300000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140582979c51f5c151f438fbafdbdd2a65cb2e79fa13bdeb92b197723d16508f35741c1cbc60f8e5b48f7e934a10bedc80e190d7fc95c26327ee0b4f5887fce2726a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffffb3442651af7f068feee52924827ea32cec67cfd3b4302e227289cce5d16cf3b600000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140aa44e1f346bd3a6bfa851769671f0d7b9d6d904946e922d9394135cb8eb633d041448d488bfd3ed09bc31a09da1e4057a4f74280224516296181422263b925bba129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffffbff13f72b030df0284a912169d194bf1f8af1f327e9f34cefc4a410e694d356d00000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140c9dfd6d9a487df51fc7d1c063c2b4df331d6b5145e451d9bf925870664aefb513906d90b2e178cadf0d1fae689df7f14cdaaebe51c1899ce6f792063aa1fb504a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffffe1dc8bd536f3687ecd56b2238aa31c874331f217e304b97377c1e9d1484e723900000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140fcda699e4cc5fec0a9239e4f0d98f25cb4cf012cc8b0f5505ca97945ecde11c5687cd8baa43e780078f2e061a9e2595c1c0ef78733cbb78d0d0948c9ac627cfaa129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff01e0b589fe0e0000005c2ea22c8020c657913e6b261b70e17c7724f33dea97bd7ba3fb91e0af9dde23eb63146f9a6681031210008203000401cc2a0401f00102246a22f04d37383c2bde377a8caafc73cba2f16671d0617f59fe5e64d00a1dd255ec51dec47500000000b70f00000000000000000000000000",
  "txid": "62382ecc0dd14773ce5dd278d08cb98d45168c0f375379eebd6df471111db8f6",
  "result": "success"
}
```

</collapse-text>

</div>

###### Broadcast the transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f890a0724d77b165969158bd68d6502bf40ceff93f1c9fc5be0421eda9859488d21b900000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140b0d0df465b818c4b29871433f7913e80d8d27114283ba6ef1b7b91280c189aa829e29946a75d925410dc3087dcd482bed3f98149275e902c0e6bd4e338066e41a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff18a003bf4399b2cbcecbf6fd494eec9c80996603dad5e4ce300c9bc4b1a4cd5400000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140f725750c29f92e401033a6334016bb224aa4cf26064c28e0c39a0bc126cf2d5767af46207abc6662f084e3c257e30b6939acdc194f36624d9f8b4288626faaf6a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff199096b27c33b86f7bab650a2188e82a865e737913546108615ac7d77a1c540300000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814008a1b9d33980f42027cb680923e8e9ef03ed6df7ba32676acd134ca551260b1f5ccd82b52b47945f19523b3dcab456937ef4efa954df1adc5d77d1c974db4f41a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff1c48e0c48972da890aa32f2932f60ed00c270d0168108895ab6f5b88ac765f6600000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814049c690811754dc2242bf56c7fa538154274fc56ed4fcedc09f5cc2febb09bdcd3964644b8724f4118b269b80c9cb5147eb6ea627a6b72bae8be7c92205837d6fa129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff5241478ba2dad22756b37c0e5d9fd0101ab1fa791f78b26b8ee8b7a4b6b7849b00000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814014217e878c17c15d169d8d16cfdb87338993c711157a6f2d0e3dea2a57c80742740c2763267d9056f3004e10c451dd39651f4895f829e8b6a6f81432f2aef534a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff76a5e60ef27316f9c1876f2c5a83114ac26aa977bad655e24c735158025e770800000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b4685681400d1d01976f725fe7274e70261de970a34acfd1819a454b6e0c5e89395306dbd437d34152a1d06d3809395bf9de0928e03049a596b7e168d0d0c085bc8d5b45e7a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff80e0f4be24118fbe0e486535aa5d3076b1d8991e84907fc5bd08524694e1396300000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140582979c51f5c151f438fbafdbdd2a65cb2e79fa13bdeb92b197723d16508f35741c1cbc60f8e5b48f7e934a10bedc80e190d7fc95c26327ee0b4f5887fce2726a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffffb3442651af7f068feee52924827ea32cec67cfd3b4302e227289cce5d16cf3b600000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140aa44e1f346bd3a6bfa851769671f0d7b9d6d904946e922d9394135cb8eb633d041448d488bfd3ed09bc31a09da1e4057a4f74280224516296181422263b925bba129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffffbff13f72b030df0284a912169d194bf1f8af1f327e9f34cefc4a410e694d356d00000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140c9dfd6d9a487df51fc7d1c063c2b4df331d6b5145e451d9bf925870664aefb513906d90b2e178cadf0d1fae689df7f14cdaaebe51c1899ce6f792063aa1fb504a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffffe1dc8bd536f3687ecd56b2238aa31c874331f217e304b97377c1e9d1484e723900000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140fcda699e4cc5fec0a9239e4f0d98f25cb4cf012cc8b0f5505ca97945ecde11c5687cd8baa43e780078f2e061a9e2595c1c0ef78733cbb78d0d0948c9ac627cfaa129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff01e0b589fe0e0000005c2ea22c8020c657913e6b261b70e17c7724f33dea97bd7ba3fb91e0af9dde23eb63146f9a6681031210008203000401cc2a0401f00102246a22f04d37383c2bde377a8caafc73cba2f16671d0617f59fe5e64d00a1dd255ec51dec47500000000b70f00000000000000000000000000
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```bash
62382ecc0dd14773ce5dd278d08cb98d45168c0f375379eebd6df471111db8f6
```

</collapse-text>

</div>

## paymentsrelease

**paymentsrelease '[“createtxid",amount,(skipminimum)]'**

The `paymentsrelease` method can be executed by anyone to release the **eligible** payments of the given `createtxid` Payments plan. The funds specified by `amount` are distributed among all the recipients of the Payments plan in predefined proportions.

#### Arguments

| Name        | Type     | Description                                                                                                                                                                                                                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createtxid  | (string) | the transaction id of the specific Payments plan whose payments the user desires to release                                                                                                                                                                                                       |
| amount      | (number) | the amount of funds to release; this value must be higher than the minimum-amount requirement originally set in the plan                                                                                                                                                                          |
| skipminimum | (number) | a flag; if there are recipients whose share is below the dust threshold (`10,000 sats`), setting this flag to `1` will skip payments to them <br><br> in the case of a plan created using[paymentsairdrop](#paymentsairdrop), the threshold is `mintoaddress` if it is greated than `10,000 sats` |

#### Response

| Name      | Type     | Description                                                             |
| --------- | -------- | ----------------------------------------------------------------------- |
| numoprets | (number) | number of `OP_RETURN`s (can be `0`/`1`)                                 |
| amount    | (number) | the amount that is being released                                       |
| newamount | (number) | the amount that is being released; corrected in case of rounding errors |
| hex       | (string) | the transaction in raw format, provided in hexadecimal                  |
| txid      | (string) | the transaction id of the `paymentsrelease` transaction                 |
| result    | (string) | whether the call executed successfully                                  |

#### :pushpin: Examples

###### Command

```bash
./komodo-cli -ac_name=HELLOWORLD paymentsrelease '["c4de51ec55d21d0ad0645efe597f61d07166f1a2cb73fcaa8c7a37de2b3c3837",1000]'
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```json
{
  "numoprets": 0,
  "amount": 1000.0,
  "newamount": 1000.0,
  "hex": "0400008085202f890450bee824558149bb8ae61f268baff8977bb36239eb864f7b7c33ce5ed7f2044c000000007b4c79a276a072a26ba067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814094c2b993048178521b2e139a8df680182b955bf41f0d2e129fcfa2222f350eff165cadf54eeb517453a91c4a286b372d5cbb2d4d3ecd4a2a2d718b354164bd88a100af038001f0a10001ffffffffc7a5b6eb4f534ff1c429487de3e43a23dfe8fdbfb5df10477a2c5788afce954d000000007b4c79a276a072a26ba067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140655cd777ef96ce0001fcbe9a96b457ed9354a019996173975716b0801738cc070e9b51654caedaba2d1826a7f876ff7ee37b6b54860f5f35d0019d65f51620d9a100af038001f0a10001ffffffff25496b4c2566cd3efc581797dd0dacf60f6e904418891059c343e84ba707a75600000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814065f5e4c8397b0cd58fd6f93b6a45e34d21e5a89124912f338bc0fabc79d89d4108b6541852935aecd95226c106765c89475d01d3d10f966cd6aa9bb85fa683e6a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffffc167bdc7aafdb9d648327bb3a1bd8334b9d3204295a540e96a6ee737b463a1b100000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140cedf8fbe886a8ac8c0b59a6c28d44604f53803b1072fcd5364cdb67f5d3ef148062920230101dcf2977f384e5d90d98665fecefee0bdda0fc5e81a8dc492a0eaa129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff03f066acbc0d000000642ea22c8020c657913e6b261b70e17c7724f33dea97bd7ba3fb91e0af9dde23eb63146f9a6681031210008203000401cc320401f001022c6a2af05237383c2bde377a8caafc73cba2f16671d0617f59fe5e64d00a1dd255ec51dec400e87648170000007500046bf41400000024222102d6f13a8f745921cdb811e32237bb98950af1a5952be7b3d429abd9152f8e388dac00e40b5402000000242221039433dc3749aece1bd568f374a45da3b0bc6856990d7da3cd175399577940a775ac000000005a0f00000000000000000000000000",
  "txid": "665f76ac885b6fab95881068010d270cd00ef632292fa30a89da7289c4e0481c",
  "result": "success"
}
```

</collapse-text>

</div>

###### Broadcast the transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f890450bee824558149bb8ae61f268baff8977bb36239eb864f7b7c33ce5ed7f2044c000000007b4c79a276a072a26ba067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814094c2b993048178521b2e139a8df680182b955bf41f0d2e129fcfa2222f350eff165cadf54eeb517453a91c4a286b372d5cbb2d4d3ecd4a2a2d718b354164bd88a100af038001f0a10001ffffffffc7a5b6eb4f534ff1c429487de3e43a23dfe8fdbfb5df10477a2c5788afce954d000000007b4c79a276a072a26ba067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140655cd777ef96ce0001fcbe9a96b457ed9354a019996173975716b0801738cc070e9b51654caedaba2d1826a7f876ff7ee37b6b54860f5f35d0019d65f51620d9a100af038001f0a10001ffffffff25496b4c2566cd3efc581797dd0dacf60f6e904418891059c343e84ba707a75600000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b46856814065f5e4c8397b0cd58fd6f93b6a45e34d21e5a89124912f338bc0fabc79d89d4108b6541852935aecd95226c106765c89475d01d3d10f966cd6aa9bb85fa683e6a129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffffc167bdc7aafdb9d648327bb3a1bd8334b9d3204295a540e96a6ee737b463a1b100000000a74ca5a281a1a0819ca28194a067a56580210358f1764f82c63abc7c7455555fd1d3184905e30e819e97667e247e5792b468568140cedf8fbe886a8ac8c0b59a6c28d44604f53803b1072fcd5364cdb67f5d3ef148062920230101dcf2977f384e5d90d98665fecefee0bdda0fc5e81a8dc492a0eaa129a5278020f0347bcbbb602b48197a8d6e291ec47bf5f549dc9ca6a778a2d050c7a6dccf638103020000af038001f0a10001ffffffff03f066acbc0d000000642ea22c8020c657913e6b261b70e17c7724f33dea97bd7ba3fb91e0af9dde23eb63146f9a6681031210008203000401cc320401f001022c6a2af05237383c2bde377a8caafc73cba2f16671d0617f59fe5e64d00a1dd255ec51dec400e87648170000007500046bf41400000024222102d6f13a8f745921cdb811e32237bb98950af1a5952be7b3d429abd9152f8e388dac00e40b5402000000242221039433dc3749aece1bd568f374a45da3b0bc6856990d7da3cd175399577940a775ac000000005a0f00000000000000000000000000
```

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Response">

```bash
665f76ac885b6fab95881068010d270cd00ef632292fa30a89da7289c4e0481c
```

</collapse-text>

</div>

<!---

## paymentsairdrop

**paymentsairdrop '[lockedblocks, minamount, mintoaddress, top, bottom, fixedFlag, "excludeAddress", ... , "excludeAddressN"]'**

The `paymentsairdrop` method allows the creation of a special Payments plan that rewards a certain range of addresses on the Smart Chain based on the specific criteria set by the arguments.

::: tip

The <b>paymentsairdrop</b> RPC requires the [<b>-ac_snapshot</b>](../antara-setup/antara-customizations.html#ac-snapshot) to be active.

:::

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| lockedblocks   | (number)           | the number of confirmations the "Payments create transaction" of a plan must receive on the network before the plan's funds can be released                                |
| minamount | (number)  | the minimum amount of funds that can be released  |
| mintoaddress | (number) | the minimum amount that can be paid to an address <br> setting this value to `0` defaults to `10000` satoshis |
| top | (number) | having sorted into an array all known addresses by their value from least (top) to greatest (bottom), this `top` value sets the index number of the lowest-value address that should receive a portion of the airdrop; this value must not be equal to `0` nor over `3999`  |
| bottom | (number) | having sorted into an array all known addresses by their value from least (top) to greatest (bottom), this `bottom` value sets the index number of the highest-value address that should receive a portion of the airdrop; this value is normally set to `0`, unless the airdrop issuer desires to exclude rich members from the airdrop  |
| fixedFlag | (string) | <br> set to `0`: all receiving addresses in the rich list are paid based on their balance  <br><br> set to `1`: the amount paid is fixed and split evenly over all receiving addresses <br><br> set to `7`: activates a "game mode" that changes the values of the bottom and top index numbers based on the block hash of the block in which the daily airdrop was taken <br><br>  |
| "excludeAddress" | (string, accepts multiple) | any address included as an <b>excludeAddress</b> is ommitted from the airdrop |

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| ( ) | | |



## payments_airdroptokens

**payments_airdroptokens '[“tokenid", lockedblocks, minamount, mintoaddress, top, bottom, fixedFlag, "excludePubKey", ... , "excludePubKeyN"]'**

::: danger

The <b>payments_airdroptokens</b> method is still in development. Please inquire on [<b>Discord</b>](komodoplatform.com/discord) for more details.

:::


--->

## paymentstxidopret

**paymentstxidopret '[allocation, "scriptPubKey", ("destopret")]'**

Use the `paymentstxidopret` method to create a transaction for each intended recipient of a Payments plan.

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| allocation   | (number)           | defines the share of a payment to the given `scriptPubkey`                                 |
| scriptPubKey | (string)           | [scriptPubkey](https://learnmeabitcoin.com/glossary/scriptPubKey) of the recipient          |
| destopret    | (string, optional) | data to be stored in the OP_RETURN of the transaction that sends funds to the scriptPubkey. |

#### Response

| Name   | Type     | Description                                               |
| ------ | -------- | --------------------------------------------------------- |
| hex    | (string) | the transaction in raw format, provided in hexadecimal    |
| txid   | (string) | the transaction id of the `paymentstxidopret` transaction |
| result | (string) | whether the call executed successfully                    |

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

