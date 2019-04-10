# Channels

## Introduction

The Channels Custom Consensus (CC) module facilitates instant payments in a trustless environment.

When a payment is executed properly with `channels`, as soon as it enters the mempool the odds that the payment can be withdrawn or attacked decrease to almost zero. Many developers and users may find it advantageous to use `channels` to create a secure instant-payment network that can be used within their business environment.

#### Channels CC Module Flow

- Anyone can create a channel using [channelsopen](../customconsensus/channels.html#channelsopen)
  - When creating the channel, the user indicates the number and size of their potential payment(s), and what their destination is
- Once the channel is notarized, at any time in the future the user can execute [channelspayment](../customconsensus/channels.html#channelspayment) to release a specific amount of their available payments
  - As soon as the `channelspayment` result enters the mempool, the odds of withdrawing the `txid` from processing decrease to almost zero
- The creator of a channel may close the channel at any time using [channelsclose](../customconsensus/channels.html#channelsclose)
  - This shows the receiver that this payment stream is permanently ended
- Once the channel's closure is notarized, the creator may withdraw remaining funds using [channelsrefund](../customconsensus/channels.html#channelsrefund)
- The [channelsinfo](../customconsensus/channels.html#channelsinfo) method reveals public information for any or all available channels on an asset chain

## channelsaddress

**channelsaddress pubkey**

The `channelsaddress` method displays the various addresses and their balances for a specified pubkey.

Under normal circumstances, for the `pubkey` the user provides the destination address of the intended channel.

The global addresses are not used in the Channels CC module. For more information about unique CC addresses, see [this linked explanation.](../customconsensus/custom-consensus-instructions.html#understanding-the-types-of-addresses)

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ---------------------- |
| pubkey    | (string, required) | the destination pubkey |

### Response

| Name | Type | Description | 
| --------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                      | (string)  | whether the method executed successfully                                                                                                                                                                                                                                                                                                                        |
| ChannelsCCAddress           | (string)  | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey                                                                                                                                                                                                                                            |
| CCbalance                   | (numeric) | the unspent amount in `ChannelsCCaddress`                                                                                                                                                                                                                                                                                                                       |
| ChannelsNormalAddress       | (string)  | the unmodified normal public address generated from the contract's privkey; this is generally used for markers                                                                                                                                                                                                                                                  |
| ChannelsCC1of2Address       | (string)  | the channel address that will store the funds once the channel is opened; this property is only active when the channel is using coins <!--I'm confused. Do we need this whole sentence? Seems like we can cut out everything about "from the pubkey to the ...", and just the keep the part at the end about this being used for channels that deal with coins | from the `pubkey` [used to launch the daemon.](../customconsensus/custom-consensus-instructions.html#creating-and-launching-with-a-pubkey) to the supplied pubkey --> |
| ChannelsCC1of2TokensAddress | (string)  | the channel address that will store the funds once the channel is opened; this property is only active when the channel is using tokens <!-- same                                                                                                                                                                                                               | the channel address where funds are stored when channel is opened from the `pubkey` [used to launch the daemon.](../customconsensus/custom-consensus-instructions.html#creating-and-launching-with-a-pubkey) to the supplied pubkey (if using tokens) --> |
| myCCAddress(Channels)       | (string)  | taking the contract's EVAL code as a modifier, this is the CC address from the `pubkey` [used to launch the daemon](../customconsensus/custom-consensus-instructions.html#creating-and-launching-with-a-pubkey)                                                                                                                                                 |
| PubkeyCCaddress(Channels)   | (string)  | taking the contract's EVAL code as a modifier, this is the CC address from the `pubkey` supplied as the argument                                                                                                                                                                                                                                                |
| myCCbalance                 | (numeric) | the balance of `myccaddress` in coins                                                                                                                                                                                                                                                                                                                           |
| myaddress                   | (string)  | the unmodified normal public address of the pubkey [used to launch the daemon](../customconsensus/custom-consensus-instructions.html#creating-and-launching-with-a-pubkey)                                                                                                                                                                                      |
| mybalance                   | (numeric) | the balance of `myaddress` in coins                                                                                                                                                                                                                                                                                                                             |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD channelsaddress 0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "ChannelsCCAddress": "RQy3rwX8sP9oDm3c39vGKA6H315cgtPLfr",
  "CCbalance": 0.0,
  "ChannelsNormalAddress": "RQUuT8zmkvDfXqECH4m3VD3SsHZAfnoh1v",
  "ChannelsCC1of2Address": "RW5qo7cPFuap1cifuFWMHurvmBU7drn9cv",
  "ChannelsCC1of2TokensAddress": "RNjxnUR9QScLiRzo841DjCG5w5FbVbATMy",
  "myAddress": "RJYiWn3FRCSSLf9Pe5RJcbrKQYosaMburP",
  "myCCAddress(Channels)": "R9coADhfQwsbF8V1HVskZoYCuSw5FH8RsS",
  "PubkeyCCaddress(Channels)": "RFiRURHbjQNDunGC3SmiNcpt89BRbqvBQb",
  "myCCaddress": "R9coADhfQwsbF8V1HVskZoYCuSw5FH8RsS",
  "myCCbalance": 0.0,
  "myaddress": "RJYiWn3FRCSSLf9Pe5RJcbrKQYosaMburP",
  "mybalance": 9.9387
}
```

</collapse-text>

## channelsclose

**channelsclose open_txid**

The `channelsclose` method marks a specific channel as closed, meaning that no additional payments will be added to the channel.

The owner of the `channel` may still execute [channelspayment](../customconsensus/channels.html#channelspayment) for any remaining payments in the channel, until all payments are used or withdrawn.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which is used in the [channelsrefund](../customconsensus/channels.html#channelsrefund) method to reclaim funds.

### Arguments

| Name | Type | Description | 
| --------- | -------- | -------------------------------------------------------------------------- |
| open_txid | (string) | the unique identifying txid that is created when a channel is first opened |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Close a channel

```bash
./komodo-cli -ac_name=HELLOWORLD channelsclose 2f95b0f4e3dbe7f5ebc0f9479800c9ff3f44e76f5378313c9406ab5a92ff4631
```

Output from Step 1

```json
{
  "result": "success",
  "hex": "010000000337bc987132bc04b527260b1243d2c6ec3bcf2ce79dff33542ed665bf428a00360400000049483045022100dacf03fc670dfcedff732374e5dfde63668c8f1bb036076a185d620f84cdbefe02206d5c7af679e42bc35d02d97a1809ea9eba48392409be0ddf6172a76469cb9b3601ffffffff37bc987132bc04b527260b1243d2c6ec3bcf2ce79dff33542ed665bf428a003600000000a74ca5a281a1a0819ca28194a067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272814024c8da3b4a5e9595a360e4b3b44e86aa6627df774fd554ee7e55536dae7bd7af452410e6a827b1f14f63643d6cbf48a1336dde0c26d2e2e249dd9cc4aa9f044da129a5278020e73e4b0745bdf31657ac09e3cf99fd65cb262d8498f86c977ece01b551925f028103020000af038001eba10001ffffffff37bc987132bc04b527260b1243d2c6ec3bcf2ce79dff33542ed665bf428a0036010000007b4c79a276a072a26ba067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba012728140decb986f860f6b67fa458e89c50b90ebef048a72a4bfb0bb0cc8c39a5f0fc8763fdc49780154d56a89be1a7b54d17b5a9c1489c6c2b0feb11c921f75d5e8f1b7a100af038001eba10001ffffffff050087930300000000302ea22c80206dafed6d15c24a9a60f01d5972ee08aeb40ba7849d9af3608e97397364ee16a281031210008203000401cc1027000000000000302ea22c8020c9ada2adfc6c6dec0bd9dd29f4e48c86f84c016abc3552b8815ca3c4a44c561b8103120c008203000401cc1027000000000000302ea22c802019be575785c322e9c7d2ae4b5f3df78c9a38ff7357e9e689f26de8e224cb186c8103120c008203000401cca0ad96a60100000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac0000000000000000956a4c92eb433146ff925aab06943c3178536fe7443fffc9009847f9c0ebf5e7dbe3f4b0952f210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127221027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4060000008096980000000000000000000000000000000000000000000000000000000000000000000000000000000000"
}
```

Step 2: Broadcast the raw transaction using sendrawtransaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000337bc987132bc04b527260b1243d2c6ec3bcf2ce79dff33542ed665bf428a00360400000049483045022100dacf03fc670dfcedff732374e5dfde63668c8f1bb036076a185d620f84cdbefe02206d5c7af679e42bc35d02d97a1809ea9eba48392409be0ddf6172a76469cb9b3601ffffffff37bc987132bc04b527260b1243d2c6ec3bcf2ce79dff33542ed665bf428a003600000000a74ca5a281a1a0819ca28194a067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272814024c8da3b4a5e9595a360e4b3b44e86aa6627df774fd554ee7e55536dae7bd7af452410e6a827b1f14f63643d6cbf48a1336dde0c26d2e2e249dd9cc4aa9f044da129a5278020e73e4b0745bdf31657ac09e3cf99fd65cb262d8498f86c977ece01b551925f028103020000af038001eba10001ffffffff37bc987132bc04b527260b1243d2c6ec3bcf2ce79dff33542ed665bf428a0036010000007b4c79a276a072a26ba067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba012728140decb986f860f6b67fa458e89c50b90ebef048a72a4bfb0bb0cc8c39a5f0fc8763fdc49780154d56a89be1a7b54d17b5a9c1489c6c2b0feb11c921f75d5e8f1b7a100af038001eba10001ffffffff050087930300000000302ea22c80206dafed6d15c24a9a60f01d5972ee08aeb40ba7849d9af3608e97397364ee16a281031210008203000401cc1027000000000000302ea22c8020c9ada2adfc6c6dec0bd9dd29f4e48c86f84c016abc3552b8815ca3c4a44c561b8103120c008203000401cc1027000000000000302ea22c802019be575785c322e9c7d2ae4b5f3df78c9a38ff7357e9e689f26de8e224cb186c8103120c008203000401cca0ad96a60100000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac0000000000000000956a4c92eb433146ff925aab06943c3178536fe7443fffc9009847f9c0ebf5e7dbe3f4b0952f210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127221027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4060000008096980000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
2079c46cd9f3970f9fd73d8022bf6f30aaf5031bf877d2c541c4c0df1dea1be5
```

</collapse-text>

## channelsinfo

**channelsinfo (open_tx_id)**

The `channelsinfo` method fetches info about channels that are relevant to the user, either as sender or receiver.

If no `open_tx_id` argument is included, the method returns a list of all channels available to this user.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | -------------------------------------------------------------------------- |
| open_txid | (string, optional) | the unique identifying txid that is created when a channel is first opened |

### Response

| Name | Type | Description | 
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| result    | (string) | whether the command executed successfully                                                                                                           |
| name      | (string) | the name of the channel                                                                                                                             |
| Open:     | (string) | a channel and its relevant information: address of the destination pubkey, number of payments, denomination per payment, and the channel open_tx_id |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD channelsinfo
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "name": "Channel RKgkZ3RybqGHBXBhDoeM4cu7hBLD8UgHBW",
  "Open": "20 payments of 30000 satoshi"
}
```

</collapse-text>

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD channelsinfo
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "name": "Channel RKgkZ3RybqGHBXBhDoeM4cu7hBLD8UgHBW",
  "Open": "20 payments of 30000 satoshi",
  "Payment": "60000 satoshi to RBvjFvWJ43f8mcMCUE2MNamoRzc7KtDvn2, 18 payments left",
  "Payment": "30000 satoshi to RBvjFvWJ43f8mcMCUE2MNamoRzc7KtDvn2, 17 payments left"
}
```

</collapse-text>

## channelsopen

**channelsopen destination_pubkey total_number_of_payments payment_size**

The `channelsopen` method opens a channel between two public keys (sender and receiver).

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which is the unique identifying `channels_tx_id`.

### Arguments

| Name | Type | Description | 
| ------------------------ | -------- | ------------------------------------------------------- |
| destination_pubkey       | (string) | the public key of the intended recipient of the channel |
| total_number_of_payments | (number) | the total number of payments to allocate in the channel |
| payment_size             | (number) | the amount per payment, given in satoshis               |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create the raw hex

```bash
./komodo-cli -ac_name=HELLOWORLD channelsopen 027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4 10 10000000
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "01000000016ee478b8470aee10aa95878bf306f853406993f953703b47fd373eba9ee7659d030000004847304402201267b68487060b6d80a0e8529271cf203f1a018c2caa508e5bdf798cd2f9099802202553dca29335f4fa491d117f5a268027b738b65b6d0945f892896775d98ae95b01ffffffff0500e1f50500000000302ea22c80206dafed6d15c24a9a60f01d5972ee08aeb40ba7849d9af3608e97397364ee16a281031210008203000401cc1027000000000000302ea22c8020c9ada2adfc6c6dec0bd9dd29f4e48c86f84c016abc3552b8815ca3c4a44c561b8103120c008203000401cc1027000000000000302ea22c802019be575785c322e9c7d2ae4b5f3df78c9a38ff7357e9e689f26de8e224cb186c8103120c008203000401cc20e697a60100000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac0000000000000000956a4c92eb4f0000000000000000000000000000000000000000000000000000000000000000210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127221027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a40a0000008096980000000000b0a3ff942c0de4972a3bbdc90f1a2851bc498f3c947cbf0d9524ccae118f515b00000000"
}
```

</collapse-text>

Step 2: Broadcast the hex using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000016ee478b8470aee10aa95878bf306f853406993f953703b47fd373eba9ee7659d030000004847304402201267b68487060b6d80a0e8529271cf203f1a018c2caa508e5bdf798cd2f9099802202553dca29335f4fa491d117f5a268027b738b65b6d0945f892896775d98ae95b01ffffffff0500e1f50500000000302ea22c80206dafed6d15c24a9a60f01d5972ee08aeb40ba7849d9af3608e97397364ee16a281031210008203000401cc1027000000000000302ea22c8020c9ada2adfc6c6dec0bd9dd29f4e48c86f84c016abc3552b8815ca3c4a44c561b8103120c008203000401cc1027000000000000302ea22c802019be575785c322e9c7d2ae4b5f3df78c9a38ff7357e9e689f26de8e224cb186c8103120c008203000401cc20e697a60100000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac0000000000000000956a4c92eb4f0000000000000000000000000000000000000000000000000000000000000000210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127221027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a40a0000008096980000000000b0a3ff942c0de4972a3bbdc90f1a2851bc498f3c947cbf0d9524ccae118f515b00000000
```

<collapse-text hidden title="Response">

```bash
2f95b0f4e3dbe7f5ebc0f9479800c9ff3f44e76f5378313c9406ab5a92ff4631
```

</collapse-text>

## channelspayment

**channelspayment open_tx_id payment_amount (secret)**

The `channelspayment` method sends a payment in a channel to the receiver.

The method requires that the channel `open_tx_id` has either one notarization or 60 confirmations.

The owner of a channel reveals the password of a unique payment `txid` as a part of the payment. This password is intentionally visible to anyone watching the chain at the time of payment, although the password does not persist in the database.

If the receiver is monitoring the chain at the time of payment and saves the password, and there is a chain reorganization that nullifies the payment, the receiver now has the password to resend the payment. This option is available so long as the channel remains open and the payment has not been refunded.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which is the unique identifying `channels_tx_id`.

### Arguments

| Name | Type | Description | 
| ------------------------ | -------- | ------------------------------------------------------- |
| destination_pubkey       | (string) | the public key of the intended recipient of the channel |
| total_number_of_payments | (number) | the total number of payments to allocate in the channel |
| payment_size             | (number) | the amount per payment, given in satoshis               |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD channelspayment 2f95b0f4e3dbe7f5ebc0f9479800c9ff3f44e76f5378313c9406ab5a92ff4631 10000000
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "010000000371f8f5550a8cb53b7bdfb752687cd6aaaf1fedb4dd9414a08ee17fd3460047ed0400000049483045022100c512cbccd63871a3eee9069a90b5447a11912a7a6ccd0eeecdf40b92cd9aca2402200d7b36424e04bc77386ac3f1a030a27919d766485d5bb984234f257cc396527601ffffffff71f8f5550a8cb53b7bdfb752687cd6aaaf1fedb4dd9414a08ee17fd3460047ed00000000a74ca5a281a1a0819ca28194a067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127281400245156c5e4923c9dfbba452f4638da8ef58dc385f7511dca21d4cf87bb3fa564864d8b1f8f81742795181988f50b60bd82db618e11b432351595295eafd1c18a129a5278020e73e4b0745bdf31657ac09e3cf99fd65cb262d8498f86c977ece01b551925f028103020000af038001eba10001ffffffff71f8f5550a8cb53b7bdfb752687cd6aaaf1fedb4dd9414a08ee17fd3460047ed010000007b4c79a276a072a26ba067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba012728140be52fb33d895d684c1bd0a7cb12a735814ef7c22b89a11464215a5f80cde369765fc636153d15a8f17e7faee749b5f87ec5f88530b619586f58cc6452794517fa100af038001eba10001ffffffff060087930300000000302ea22c80206dafed6d15c24a9a60f01d5972ee08aeb40ba7849d9af3608e97397364ee16a281031210008203000401cc1027000000000000302ea22c8020c9ada2adfc6c6dec0bd9dd29f4e48c86f84c016abc3552b8815ca3c4a44c561b8103120c008203000401cc1027000000000000302ea22c802019be575785c322e9c7d2ae4b5f3df78c9a38ff7357e9e689f26de8e224cb186c8103120c008203000401cc80969800000000002321027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4acc0fb96a60100000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac0000000000000000956a4c92eb503146ff925aab06943c3178536fe7443fffc9009847f9c0ebf5e7dbe3f4b0952f210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127221027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4060000000100000000000000f676963e7537d614651bc1a3d5508243ab74e32400e4175ebceb03226b956f1a00000000"
}
```

</collapse-text>

Step 2: Broadcast using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000371f8f5550a8cb53b7bdfb752687cd6aaaf1fedb4dd9414a08ee17fd3460047ed0400000049483045022100c512cbccd63871a3eee9069a90b5447a11912a7a6ccd0eeecdf40b92cd9aca2402200d7b36424e04bc77386ac3f1a030a27919d766485d5bb984234f257cc396527601ffffffff71f8f5550a8cb53b7bdfb752687cd6aaaf1fedb4dd9414a08ee17fd3460047ed00000000a74ca5a281a1a0819ca28194a067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127281400245156c5e4923c9dfbba452f4638da8ef58dc385f7511dca21d4cf87bb3fa564864d8b1f8f81742795181988f50b60bd82db618e11b432351595295eafd1c18a129a5278020e73e4b0745bdf31657ac09e3cf99fd65cb262d8498f86c977ece01b551925f028103020000af038001eba10001ffffffff71f8f5550a8cb53b7bdfb752687cd6aaaf1fedb4dd9414a08ee17fd3460047ed010000007b4c79a276a072a26ba067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba012728140be52fb33d895d684c1bd0a7cb12a735814ef7c22b89a11464215a5f80cde369765fc636153d15a8f17e7faee749b5f87ec5f88530b619586f58cc6452794517fa100af038001eba10001ffffffff060087930300000000302ea22c80206dafed6d15c24a9a60f01d5972ee08aeb40ba7849d9af3608e97397364ee16a281031210008203000401cc1027000000000000302ea22c8020c9ada2adfc6c6dec0bd9dd29f4e48c86f84c016abc3552b8815ca3c4a44c561b8103120c008203000401cc1027000000000000302ea22c802019be575785c322e9c7d2ae4b5f3df78c9a38ff7357e9e689f26de8e224cb186c8103120c008203000401cc80969800000000002321027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4acc0fb96a60100000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac0000000000000000956a4c92eb503146ff925aab06943c3178536fe7443fffc9009847f9c0ebf5e7dbe3f4b0952f210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127221027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4060000000100000000000000f676963e7537d614651bc1a3d5508243ab74e32400e4175ebceb03226b956f1a00000000
```

<collapse-text hidden title="Response">

```bash
36008a42bf65d62e5433ff9de72ccf3becc6d243120b2627b504bc327198bc37
```

</collapse-text>

Check that the transaction is confirmed:

```bash
./komodo-cli -ac_name=HELLOWORLD getrawmempool
```

## channelsrefund

**channelsrefund open_tx_id close_tx_id**

The `channelsrefund` method withdraws funds directly to the CC address of the channel creator.

The method can only be executed after the channel `close_tx_id` has either one notarization or 60 confirmations.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name | Type | Description | 
| ------------------------ | -------- | ------------------------------------------------------- |
| destination_pubkey       | (string) | the public key of the intended recipient of the channel |
| total_number_of_payments | (number) | the total number of payments to allocate in the channel |
| payment_size             | (number) | the amount per payment, given in satoshis               |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Command

```bash
./komodo-cli -ac_name=HELLOWORLD channelsrefund 2f95b0f4e3dbe7f5ebc0f9479800c9ff3f44e76f5378313c9406ab5a92ff4631 2079c46cd9f3970f9fd73d8022bf6f30aaf5031bf877d2c541c4c0df1dea1be5
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0100000003e51bea1ddfc0c441c5d277f81b03f5aa306fbf22803dd79f0f97f3d96cc479200300000049483045022100bbed947e3c33b21b8519a7d78dc08cb70d3fe3e6c788119db95a459448caa64c02200a1c73431d118a7fad4f58b760b025f399747e127a46da5c421add2e599b897f01ffffffffe51bea1ddfc0c441c5d277f81b03f5aa306fbf22803dd79f0f97f3d96cc4792000000000a74ca5a281a1a0819ca28194a067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127281403fe5789a3f0e25f46a000f381fc2e7f7b759855184532a6e1e0c5e84d1dc284b4d37422735aa93175ea74d6829ac3b68a7c8c928c22b870ab4b9507bc872dbd6a129a5278020e73e4b0745bdf31657ac09e3cf99fd65cb262d8498f86c977ece01b551925f028103020000af038001eba10001ffffffffe51bea1ddfc0c441c5d277f81b03f5aa306fbf22803dd79f0f97f3d96cc47920010000007b4c79a276a072a26ba067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127281400b4d6aaeb127417839b76dc78d78379147cfff760f03824e5565aae1c371bbd34559d951cdd2e8622bd5f5aa5528d2a20ee95174c3fea09ef48824ecd647c0b2a100af038001eba10001ffffffff051027000000000000302ea22c8020c9ada2adfc6c6dec0bd9dd29f4e48c86f84c016abc3552b8815ca3c4a44c561b8103120c008203000401cc1027000000000000302ea22c802019be575785c322e9c7d2ae4b5f3df78c9a38ff7357e9e689f26de8e224cb186c8103120c008203000401cc008793030000000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac805f96a60100000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac0000000000000000956a4c92eb523146ff925aab06943c3178536fe7443fffc9009847f9c0ebf5e7dbe3f4b0952f210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127221027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4060000008096980000000000e51bea1ddfc0c441c5d277f81b03f5aa306fbf22803dd79f0f97f3d96cc4792000000000"
}
```

</collapse-text>

Step 2: Broadcast the hex using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0100000003e51bea1ddfc0c441c5d277f81b03f5aa306fbf22803dd79f0f97f3d96cc479200300000049483045022100bbed947e3c33b21b8519a7d78dc08cb70d3fe3e6c788119db95a459448caa64c02200a1c73431d118a7fad4f58b760b025f399747e127a46da5c421add2e599b897f01ffffffffe51bea1ddfc0c441c5d277f81b03f5aa306fbf22803dd79f0f97f3d96cc4792000000000a74ca5a281a1a0819ca28194a067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127281403fe5789a3f0e25f46a000f381fc2e7f7b759855184532a6e1e0c5e84d1dc284b4d37422735aa93175ea74d6829ac3b68a7c8c928c22b870ab4b9507bc872dbd6a129a5278020e73e4b0745bdf31657ac09e3cf99fd65cb262d8498f86c977ece01b551925f028103020000af038001eba10001ffffffffe51bea1ddfc0c441c5d277f81b03f5aa306fbf22803dd79f0f97f3d96cc47920010000007b4c79a276a072a26ba067a56580210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127281400b4d6aaeb127417839b76dc78d78379147cfff760f03824e5565aae1c371bbd34559d951cdd2e8622bd5f5aa5528d2a20ee95174c3fea09ef48824ecd647c0b2a100af038001eba10001ffffffff051027000000000000302ea22c8020c9ada2adfc6c6dec0bd9dd29f4e48c86f84c016abc3552b8815ca3c4a44c561b8103120c008203000401cc1027000000000000302ea22c802019be575785c322e9c7d2ae4b5f3df78c9a38ff7357e9e689f26de8e224cb186c8103120c008203000401cc008793030000000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac805f96a60100000023210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba01272ac0000000000000000956a4c92eb523146ff925aab06943c3178536fe7443fffc9009847f9c0ebf5e7dbe3f4b0952f210324f94e76159d69a5163b91588c3a04dac2c80e0011f713e3bfc5a8b67ba0127221027166e21e9579307a1ae4f8c223516e70aae3cbfab4bd6ac7cebfa625dcc0a2a4060000008096980000000000e51bea1ddfc0c441c5d277f81b03f5aa306fbf22803dd79f0f97f3d96cc4792000000000
```
