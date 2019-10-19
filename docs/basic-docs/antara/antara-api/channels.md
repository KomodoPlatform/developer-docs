# Channels

## Introduction

The Channels Antara Module facilitates instant payments in a trustless environment.

When a payment is executed properly with `channels`, as soon as it enters the mempool the odds that the payment can be withdrawn or attacked decrease to almost zero. Many developers and users may find the Channels Module to be an advantageous method for creating a secure instant-payment network that can be used within their business environment.

It supports both coins and tokens.

:::tip Note
For testing Channels, build the Komodo daemon in test mode. Instead of using the command: `./zcutil/build.sh -j8`, use

```bash
export CONFIGURE_FLAGS='CPPFLAGS=-DTESTMODE'
./zcutil/build.sh -j8
```

This will reduce the number of confirmations needed for `channelsopen` and `channelsclose` transactions from `100` to `2` for non-notarized chains.

DO NOT use a daemon created with the above parameter for actual use.
:::

#### Channels Module Flow

- Anyone can create a channel using [channelsopen](../../../basic-docs/antara/antara-api/channels.html#channelsopen)
  - When creating the channel, the user indicates the number and size of their potential payment(s), and what their destination is
- Once the channel is notarized, at any time in the future the user can execute [channelspayment](../../../basic-docs/antara/antara-api/channels.html#channelspayment) to release a specific amount of their available payments
  - As soon as the `channelspayment` result enters the mempool, the odds of withdrawing the `txid` from processing decrease to almost zero
- The creator of a channel may close the channel at any time using [channelsclose](../../../basic-docs/antara/antara-api/channels.html#channelsclose)
  - This shows the receiver that this payment stream is permanently ended
- Once the channel's closure is notarized, the creator may withdraw remaining funds using [channelsrefund](../../../basic-docs/antara/antara-api/channels.html#channelsrefund)
- The [channelsinfo](../../../basic-docs/antara/antara-api/channels.html#channelsinfo) method reveals public information for any or all available channels on an Smart Chain

## channelsaddress

**channelsaddress pubkey**

The `channelsaddress` method displays the various addresses and their balances for a specified pubkey.

Under normal circumstances, for the `pubkey` the user provides the destination address of the intended channel.

The global addresses are not used in the Channels Antara module. For more information about unique Antara addresses, see [this linked explanation.](../../../basic-docs/antara/antara-tutorials/understanding-antara-addresses.html)

### Arguments

| Name   | Type               | Description            |
| ------ | ------------------ | ---------------------- |
| pubkey | (string, required) | the destination pubkey |

### Response

| Name                        | Type      | Description                                                                                                                                                                                                                                   |
| --------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                      | (string)  | whether the method executed successfully                                                                                                                                                                                                      |
| ChannelsCCAddress           | (string)  | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey                                                                                                                          |
| CCbalance                   | (numeric) | the unspent amount in `ChannelsCCaddress`                                                                                                                                                                                                     |
| ChannelsNormalAddress       | (string)  | the unmodified normal public address generated from the contract's privkey; this is generally used for markers                                                                                                                                |
| ChannelsCC1of2Address       | (string)  | the channel address that will store the funds once the channel is opened; this property is only active when the channel is using coins                                                                                                        |
| ChannelsCC1of2TokensAddress | (string)  | the channel address that will store the funds once the channel is opened; this property is only active when the channel is using tokens                                                                                                       |
| myCCAddress(Channels)       | (string)  | taking the contract's EVAL code as a modifier, this is the Antara address from the `pubkey` [used to launch the daemon](../../../basic-docs/antara/antara-tutorials/understanding-antara-addresses.html#creating-and-launching-with-a-pubkey) |
| PubkeyCCaddress(Channels)   | (string)  | taking the contract's EVAL code as a modifier, this is the Antara address from the `pubkey` supplied as the argument                                                                                                                          |
| myCCbalance                 | (numeric) | the balance of `myccaddress` in coins                                                                                                                                                                                                         |
| myaddress                   | (string)  | the unmodified normal public address of the pubkey [used to launch the daemon](../../../basic-docs/antara/antara-tutorials/understanding-antara-addresses.html#creating-and-launching-with-a-pubkey)                                          |
| mybalance                   | (numeric) | the balance of `myaddress` in coins                                                                                                                                                                                                           |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD channelsaddress 02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "ChannelsCCAddress": "RQy3rwX8sP9oDm3c39vGKA6H315cgtPLfr",
  "ChannelsCCBalance": 0.0,
  "ChannelsNormalAddress": "RQUuT8zmkvDfXqECH4m3VD3SsHZAfnoh1v",
  "ChannelsNormalBalance": 0.0,
  "ChannelsCC1of2Address": "RSSfafKpi6b5TFmyGDh5aTXLJuyrMxQyjs",
  "ChannelsCC1of2TokensAddress": "RFgEqotRmMrhhEkEyUpxGDZD7DR1TncV8c",
  "PubkeyCCaddress(Channels)": "RXWFiYQbj3HK7fCvkfGnWQHLkrywWBQ72D",
  "PubkeyCCbalance(Channels)": 0.0,
  "myCCAddress(Channels)": "RXWFiYQbj3HK7fCvkfGnWQHLkrywWBQ72D",
  "myCCbalance(Channels)": 0.0001,
  "myaddress": "RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa",
  "mybalance": 7781877.16591359
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"channelsaddress", "params":["02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "ChannelsCCAddress": "RQy3rwX8sP9oDm3c39vGKA6H315cgtPLfr",
    "ChannelsCCBalance": 0.0,
    "ChannelsNormalAddress": "RQUuT8zmkvDfXqECH4m3VD3SsHZAfnoh1v",
    "ChannelsNormalBalance": 0.0,
    "ChannelsCC1of2Address": "RSSfafKpi6b5TFmyGDh5aTXLJuyrMxQyjs",
    "ChannelsCC1of2TokensAddress": "RFgEqotRmMrhhEkEyUpxGDZD7DR1TncV8c",
    "PubkeyCCaddress(Channels)": "RXWFiYQbj3HK7fCvkfGnWQHLkrywWBQ72D",
    "PubkeyCCbalance(Channels)": 0.0,
    "myCCAddress(Channels)": "RXWFiYQbj3HK7fCvkfGnWQHLkrywWBQ72D",
    "myCCbalance(Channels)": 0.0001,
    "myaddress": "RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa",
    "mybalance": 7782377.16591359
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## channelsclose

**channelsclose open_txid**

The `channelsclose` method marks a specific channel as closed, meaning that no additional payments will be added to the channel.

The owner of the `channel` may still execute [channelspayment](../../../basic-docs/antara/antara-api/channels.html#channelspayment) for any remaining payments in the channel, until all payments are used or withdrawn.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which is used in the [channelsrefund](../../../basic-docs/antara/antara-api/channels.html#channelsrefund) method to reclaim funds.

### Arguments

| Name      | Type     | Description                                                                |
| --------- | -------- | -------------------------------------------------------------------------- |
| open_txid | (string) | the unique identifying txid that is created when a channel is first opened |

### Response

| Name    | Type     | Description                                                                                          |
| ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result: | (string) | whether the command succeeded                                                                        |
| hex:    | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Close a channel

```bash
./komodo-cli -ac_name=HELLOWORLD channelsclose 04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0
```

Output from Step 1

```json
{
  "result": "success",
  "hex": "0400008085202f890301d6737a2ff4c9c63b49d9fa4526943ba402b471d9a9220fe9230198ed87c6800000000048473044022024e46c6054be26df24f794495e30b758ddd7afe6e5d0cb277342f2a2e9e5471f02201d0fa1de9c7d04602ad196bcf09fd24db70f8993fe2ecb252d0cd2f06d6e0f9f01ffffffffad2f890f95746fe3b79642b645abf1c48437d174bf44fab2e0e87dff2e376bd100000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140ed5cd683ce4e8a6d03a064e9008a330c9a91deb2aafdfff41c8c95843fb0f05d34213c069bfe6f08e3a69c43019ca59d9c800ae45c2735c44b4b71d99fd461b5a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffffad2f890f95746fe3b79642b645abf1c48437d174bf44fab2e0e87dff2e376bd1010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781400aeec3737f700487dd15331948fab80ea6b9c6b64af3c4be86733498f8bae83a657fbf274408d2929143ca8fe27988aa4195fb00e37a95d0e2d07a4298df309da100af038001eba10001ffffffff05808b874702000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cce0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb43d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d303000080969800000000000000000000000000000000000000000000000000000000000000000000000000000000002f0100000000000000000000000000"
}
```

Step 2: Broadcast the raw transaction using sendrawtransaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f890301d6737a2ff4c9c63b49d9fa4526943ba402b471d9a9220fe9230198ed87c6800000000048473044022024e46c6054be26df24f794495e30b758ddd7afe6e5d0cb277342f2a2e9e5471f02201d0fa1de9c7d04602ad196bcf09fd24db70f8993fe2ecb252d0cd2f06d6e0f9f01ffffffffad2f890f95746fe3b79642b645abf1c48437d174bf44fab2e0e87dff2e376bd100000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140ed5cd683ce4e8a6d03a064e9008a330c9a91deb2aafdfff41c8c95843fb0f05d34213c069bfe6f08e3a69c43019ca59d9c800ae45c2735c44b4b71d99fd461b5a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffffad2f890f95746fe3b79642b645abf1c48437d174bf44fab2e0e87dff2e376bd1010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781400aeec3737f700487dd15331948fab80ea6b9c6b64af3c4be86733498f8bae83a657fbf274408d2929143ca8fe27988aa4195fb00e37a95d0e2d07a4298df309da100af038001eba10001ffffffff05808b874702000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cce0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb43d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d303000080969800000000000000000000000000000000000000000000000000000000000000000000000000000000002f0100000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
3f22afe66f0dd0e7d45ea1f89509f60673efa026c545118b309cdc03fa3bec98
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"channelsclose", "params":["04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "hex": "0400008085202f890301d6737a2ff4c9c63b49d9fa4526943ba402b471d9a9220fe9230198ed87c6800000000048473044022024e46c6054be26df24f794495e30b758ddd7afe6e5d0cb277342f2a2e9e5471f02201d0fa1de9c7d04602ad196bcf09fd24db70f8993fe2ecb252d0cd2f06d6e0f9f01ffffffffad2f890f95746fe3b79642b645abf1c48437d174bf44fab2e0e87dff2e376bd100000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140ed5cd683ce4e8a6d03a064e9008a330c9a91deb2aafdfff41c8c95843fb0f05d34213c069bfe6f08e3a69c43019ca59d9c800ae45c2735c44b4b71d99fd461b5a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffffad2f890f95746fe3b79642b645abf1c48437d174bf44fab2e0e87dff2e376bd1010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781400aeec3737f700487dd15331948fab80ea6b9c6b64af3c4be86733498f8bae83a657fbf274408d2929143ca8fe27988aa4195fb00e37a95d0e2d07a4298df309da100af038001eba10001ffffffff05808b874702000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cce0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb43d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d303000080969800000000000000000000000000000000000000000000000000000000000000000000000000000000002f0100000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## channelsinfo

**channelsinfo (open_tx_id)**

The `channelsinfo` method fetches info about channels that are relevant to the user, either as sender or receiver.

If no `open_tx_id` argument is included, the method returns a list of all channels available to this user.

### Arguments

| Name      | Type               | Description                                                                |
| --------- | ------------------ | -------------------------------------------------------------------------- |
| open_txid | (string, optional) | the unique identifying txid that is created when a channel is first opened |

### Response

| Name                   | Type             | Description                                                           |
| ---------------------- | ---------------- | --------------------------------------------------------------------- |
| result                 | (string)         | whether the command executed successfully                             |
| Channel CC address     | (string)         | the 1of2 Channels CC address for the two pubkeys involved             |
| Destination address    | (string)         | the destination address of the Channel                                |
| Number of payments     | (number)         | the total number of payments available at the time of Channel opening |
| Denomination (satoshi) | (number)         | the size of each payment (in satoshis)                                |
| Amount (satoshi)       | (number)         | the total amount available to pay (in satoshis)                       |
| Transactions           | (array of jsons) | the transactions associated with the Channel                          |
| Open                   | (string)         | the id of the Channel opening transaction                             |
| Payment                | (string)         | the id of a payment transaction                                       |
| Number of payments     | (number)         | the number of payments used up in the transaction                     |
| Amount                 | (number)         | the total amount paid in the transaction (in satoshis)                |
| Destination            | (string)         | the destination address of the Channel                                |
| Secret                 | (string)         | the secret revealed to pay the amount                                 |
| Payments left          | (number)         | the total number of payments left after the transaction               |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD channelsinfo 04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "Channel CC address": "RVEZbEwMBQBdryswcWhtwWY5sYJTiEJ5SG",
  "Destination address": "RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3",
  "Number of payments": 1000,
  "Denomination (satoshi)": "10000000",
  "Amount (satoshi)": "10000000000",
  "Transactions": [
    {
      "Open": "04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0"
    }
  ]
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"channelsinfo", "params":[]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "Channel CC address": "RVEZbEwMBQBdryswcWhtwWY5sYJTiEJ5SG",
    "Destination address": "RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3",
    "Number of payments": 1000,
    "Denomination (satoshi)": "10000000",
    "Amount (satoshi)": "10000000000",
    "Transactions": [
      {
        "Open": "04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0"
      }
    ]
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Command (after a Payment is done):

```bash
./komodo-cli -ac_name=HELLOWORLD channelsinfo
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "Channel CC address": "RVEZbEwMBQBdryswcWhtwWY5sYJTiEJ5SG",
  "Destination address": "RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3",
  "Number of payments": 1000,
  "Denomination (satoshi)": "10000000",
  "Amount (satoshi)": "10000000000",
  "Transactions": [
    {
      "Open": "04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0"
    },
    {
      "Payment": "d16b372eff7de8e0b2fa44bf74d13784c4f1ab45b64296b7e36f74950f892fad",
      "Number of payments": 21,
      "Amount": 210000000,
      "Destination": "RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3",
      "Secret": "570fd06eb542eb0dcb163c42467860194a0a998dfccee047724067f5aab7490e",
      "Payments left": 979
    }
  ]
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"channelsinfo", "params":[]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "Channel CC address": "RVEZbEwMBQBdryswcWhtwWY5sYJTiEJ5SG",
  "Destination address": "RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3",
  "Number of payments": 1000,
  "Denomination (satoshi)": "10000000",
  "Amount (satoshi)": "10000000000",
  "Transactions": [
    {
      "Open": "04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0"
    },
    {
      "Payment": "d16b372eff7de8e0b2fa44bf74d13784c4f1ab45b64296b7e36f74950f892fad",
      "Number of payments": 21,
      "Amount": 210000000,
      "Destination": "RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3",
      "Secret": "570fd06eb542eb0dcb163c42467860194a0a998dfccee047724067f5aab7490e",
      "Payments left": 979
    }
  ]
}
```

</collapse-text>

For the Tokens case:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD channelsinfo 77925f6b05b1ecb299b1bb6c63b4451f73ff50ef494feda1293fb799238f2c4c
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "Channel CC address": "RVEZbEwMBQBdryswcWhtwWY5sYJTiEJ5SG",
  "Destination address": "RM9n6rts1CBKX4oXziLp1WBBgEUjKKWHb3",
  "Number of payments": 99,
  "Token id": "916a6907e39cec679a6c832255c71b74e4941895d2d8775a6d2a0e8a322401ed",
  "Denomination (token satoshi)": "1",
  "Amount (token satoshi)": "99",
  "Transactions": [
    {
      "Open": "77925f6b05b1ecb299b1bb6c63b4451f73ff50ef494feda1293fb799238f2c4c"
    }
  ]
}
```

</collapse-text>

## channelsopen

**channelsopen destination_pubkey total_number_of_payments payment_size [tokenid]**

The `channelsopen` method opens a channel between two public keys (sender and receiver).

To open a channel that sends tokens, include the `tokenid` of the required token.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which is the unique identifying `channels_tx_id`.

### Arguments

| Name                     | Type               | Description                                                                                            |
| ------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------ |
| destination_pubkey       | (string)           | the public key of the intended recipient of the channel                                                |
| total_number_of_payments | (number)           | the total number of payments to allocate in the channel                                                |
| payment_size             | (number)           | the amount per payment, given in satoshis; when tokenid is specified, the number of tokens per payment |
| tokenid                  | (string, optional) | the id of the token                                                                                    |

### Response

| Name    | Type     | Description                                                                                          |
| ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result: | (string) | whether the command succeeded                                                                        |
| hex:    | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create the raw hex

```bash
./komodo-cli -ac_name=HELLOWORLD channelsopen 0257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634 1000 10000000
```

<collapse-text hidden title="Response">

```json
{
  "hex": "010000000121a212c73e8a6265d2b1babfc3a9fcc74101e14742db394785f3604151b27ed80000000049483045022100bad26378f61b2cc6e482b63ca7d098b0dc0c060929794ba1ce5bb8d0cadf5b6502206021b228cf942a863591e9b897c40292b68aa55dc90d4cd66bf37db5a575cadd01ffffffff0500e40b5402000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401ccff16772860c30200232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb4f00000000000000000000000000000000000000000000000000000000000000002102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634e803000080969800000000009704b3bd04d351e193cdc4dc500253acb9d6c6db6562edbe101699b24df725bc00000000",
  "result": "success"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"channelsopen", "params":["0257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634" ,"1000" ,"10000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "hex": "010000000121a212c73e8a6265d2b1babfc3a9fcc74101e14742db394785f3604151b27ed80000000049483045022100bad26378f61b2cc6e482b63ca7d098b0dc0c060929794ba1ce5bb8d0cadf5b6502206021b228cf942a863591e9b897c40292b68aa55dc90d4cd66bf37db5a575cadd01ffffffff0500e40b5402000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401ccff16772860c30200232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb4f00000000000000000000000000000000000000000000000000000000000000002102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634e803000080969800000000009704b3bd04d351e193cdc4dc500253acb9d6c6db6562edbe101699b24df725bc00000000",
    "result": "success"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Broadcast the hex using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000121a212c73e8a6265d2b1babfc3a9fcc74101e14742db394785f3604151b27ed80000000049483045022100bad26378f61b2cc6e482b63ca7d098b0dc0c060929794ba1ce5bb8d0cadf5b6502206021b228cf942a863591e9b897c40292b68aa55dc90d4cd66bf37db5a575cadd01ffffffff0500e40b5402000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401ccff16772860c30200232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb4f00000000000000000000000000000000000000000000000000000000000000002102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634e803000080969800000000009704b3bd04d351e193cdc4dc500253acb9d6c6db6562edbe101699b24df725bc00000000
```

<collapse-text hidden title="Response">

```bash
04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["010000000121a212c73e8a6265d2b1babfc3a9fcc74101e14742db394785f3604151b27ed80000000049483045022100bad26378f61b2cc6e482b63ca7d098b0dc0c060929794ba1ce5bb8d0cadf5b6502206021b228cf942a863591e9b897c40292b68aa55dc90d4cd66bf37db5a575cadd01ffffffff0500e40b5402000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401ccff16772860c30200232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb4f00000000000000000000000000000000000000000000000000000000000000002102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634e803000080969800000000009704b3bd04d351e193cdc4dc500253acb9d6c6db6562edbe101699b24df725bc00000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

For the Tokens case:

Step 1: Create the raw hex

```bash
./komodo-cli -ac_name=HELLOWORLD channelsopen 0257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634 99 1 916a6907e39cec679a6c832255c71b74e4941895d2d8775a6d2a0e8a322401ed
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f8902068ffd7dd7dbf230c79ef08c97cff151ae371d6d638ed47791fc2bee9f31e40d00000000484730440220594cf8de63f2096410560ff81322ecb4f3c7f8edcc2b8716031417311b4d5af4022031f02f69a7834b4e7b72dabe78b5b3f3a576d2befa507a85a7212639e00a664901ffffffffed0124328a0e2a6d5a77d8d2951894e4741bc75522836c9a67ec9ce307696a91010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140b5333063661eb5013544e67282254a8f0abf6b7334c83bdde07eff054d53657876310286e17e81a9c8c26af8c744325a9268d3220cb9a80b1316cc0e1290aaa1a100af038001f2a10001ffffffff066300000000000000302ea22c8020f765a39dc65a1a5b9535633f65604f92d404de5ea156f3e660929f46db671ec781032214008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc0100000000000000302ea22c80205dcc33b0b3f0573b306ab85ffa9ce8622fbcb81cb6ad8ec00f366935bbf500f78103120c008203000401ccd06e0b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000fdfe006a4cfbf274916a6907e39cec679a6c832255c71b74e4941895d2d8775a6d2a0e8a322401ed022102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb030552866341492eb4f00000000000000000000000000000000000000000000000000000000000000002102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634630000000100000000000000e613adac747c26e76f8db6ca9818032f3d678b1b7f608938516662d857b2980f000000003b0100000000000000000000000000",
  "result": "success"
}
```

</collapse-text>

Step 2: Broadcast the hex using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f8902068ffd7dd7dbf230c79ef08c97cff151ae371d6d638ed47791fc2bee9f31e40d00000000484730440220594cf8de63f2096410560ff81322ecb4f3c7f8edcc2b8716031417311b4d5af4022031f02f69a7834b4e7b72dabe78b5b3f3a576d2befa507a85a7212639e00a664901ffffffffed0124328a0e2a6d5a77d8d2951894e4741bc75522836c9a67ec9ce307696a91010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140b5333063661eb5013544e67282254a8f0abf6b7334c83bdde07eff054d53657876310286e17e81a9c8c26af8c744325a9268d3220cb9a80b1316cc0e1290aaa1a100af038001f2a10001ffffffff066300000000000000302ea22c8020f765a39dc65a1a5b9535633f65604f92d404de5ea156f3e660929f46db671ec781032214008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc0100000000000000302ea22c80205dcc33b0b3f0573b306ab85ffa9ce8622fbcb81cb6ad8ec00f366935bbf500f78103120c008203000401ccd06e0b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000fdfe006a4cfbf274916a6907e39cec679a6c832255c71b74e4941895d2d8775a6d2a0e8a322401ed022102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb030552866341492eb4f00000000000000000000000000000000000000000000000000000000000000002102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634630000000100000000000000e613adac747c26e76f8db6ca9818032f3d678b1b7f608938516662d857b2980f000000003b0100000000000000000000000000
```

<collapse-text hidden title="Response">

```bash
77925f6b05b1ecb299b1bb6c63b4451f73ff50ef494feda1293fb799238f2c4c
```

</collapse-text>

## channelspayment

**channelspayment open_tx_id payment_amount (secret)**

The `channelspayment` method sends a payment in a channel to the receiver.

The method requires that the channel `open_tx_id` has either one notarization or 100 confirmations.

The owner of a channel reveals the password of a unique payment `txid` as a part of the payment. This password is intentionally visible to anyone watching the chain at the time of payment, although the password does not persist in the database.

If the receiver is monitoring the chain at the time of payment and saves the password, and there is a chain reorganization that nullifies the payment, the receiver now has the password to resend the payment. This option is available so long as the channel remains open and the payment has not been refunded.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which is the unique identifying `channels_tx_id`.

### Arguments

| Name           | Type               | Description                                                                                                                                                       |
| -------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open_tx_id     | (string)           | the transaction id of the channel open transaction                                                                                                                |
| payment_amount | (number)           | the amount to release to the receiver pubkey in satoshis; the number of tokens to release in case of Token                                                        |
| secret         | (string, optional) | to be used by the receiver when a payment was issued previously but not mined; the secret must be extracted from the initial payment that has reached the mempool |

### Response

| Name    | Type     | Description                                                                                          |
| ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result: | (string) | whether the command succeeded                                                                        |
| hex:    | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD channelspayment 04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0 210000000
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "010000000307f4bba340b8a8b45864613f0b608360a2df80a2ebc116ad0f1d8f9680bb85890000000049483045022100ffccb5b9ba7e2d2e0c3a0e8b4378d004932731c4116853df38ea3727b24bb2540220370d76eb59eb2b9de7087d96242b0c0d47598b4b8500bc586f04d312f0a693d101ffffffffd035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed0400000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140c32058837f4e2823c958462ea24115b88e8280c5c9e6ebdce2843cbafd0c9c624b1870da5cecd5b2743b41abfe24fbc98995eadcd76caf431aa0d9c55c6a2596a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffffd035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed04010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781407348f4137b5d80fb5d849a6aa3822cefffbdb855eaa038640b04f89d5bd426f47b64a8459092c8d5aeda3ef1cad3732bd80c8206d271689af4efb788d5c3287ea100af038001eba10001ffffffff06808b874702000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc8058840c0000000023210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634ace0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb50d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d303000015000000000000000e49b7aaf567407247e0cefc8d990a4a19607846423c16cb0deb42b56ed00f5700000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"channelspayment", "params":["04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0" ,"210000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "hex": "010000000307f4bba340b8a8b45864613f0b608360a2df80a2ebc116ad0f1d8f9680bb85890000000049483045022100ffccb5b9ba7e2d2e0c3a0e8b4378d004932731c4116853df38ea3727b24bb2540220370d76eb59eb2b9de7087d96242b0c0d47598b4b8500bc586f04d312f0a693d101ffffffffd035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed0400000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140c32058837f4e2823c958462ea24115b88e8280c5c9e6ebdce2843cbafd0c9c624b1870da5cecd5b2743b41abfe24fbc98995eadcd76caf431aa0d9c55c6a2596a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffffd035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed04010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781407348f4137b5d80fb5d849a6aa3822cefffbdb855eaa038640b04f89d5bd426f47b64a8459092c8d5aeda3ef1cad3732bd80c8206d271689af4efb788d5c3287ea100af038001eba10001ffffffff06808b874702000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc8058840c0000000023210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634ace0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb50d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d303000015000000000000000e49b7aaf567407247e0cefc8d990a4a19607846423c16cb0deb42b56ed00f5700000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Broadcast using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000307f4bba340b8a8b45864613f0b608360a2df80a2ebc116ad0f1d8f9680bb85890000000049483045022100ffccb5b9ba7e2d2e0c3a0e8b4378d004932731c4116853df38ea3727b24bb2540220370d76eb59eb2b9de7087d96242b0c0d47598b4b8500bc586f04d312f0a693d101ffffffffd035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed0400000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140c32058837f4e2823c958462ea24115b88e8280c5c9e6ebdce2843cbafd0c9c624b1870da5cecd5b2743b41abfe24fbc98995eadcd76caf431aa0d9c55c6a2596a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffffd035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed04010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781407348f4137b5d80fb5d849a6aa3822cefffbdb855eaa038640b04f89d5bd426f47b64a8459092c8d5aeda3ef1cad3732bd80c8206d271689af4efb788d5c3287ea100af038001eba10001ffffffff06808b874702000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc8058840c0000000023210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634ace0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb50d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d303000015000000000000000e49b7aaf567407247e0cefc8d990a4a19607846423c16cb0deb42b56ed00f5700000000
```

<collapse-text hidden title="Response">

```bash
d16b372eff7de8e0b2fa44bf74d13784c4f1ab45b64296b7e36f74950f892fad
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"sendrawtransaction", "params":["010000000307f4bba340b8a8b45864613f0b608360a2df80a2ebc116ad0f1d8f9680bb85890000000049483045022100ffccb5b9ba7e2d2e0c3a0e8b4378d004932731c4116853df38ea3727b24bb2540220370d76eb59eb2b9de7087d96242b0c0d47598b4b8500bc586f04d312f0a693d101ffffffffd035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed0400000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140c32058837f4e2823c958462ea24115b88e8280c5c9e6ebdce2843cbafd0c9c624b1870da5cecd5b2743b41abfe24fbc98995eadcd76caf431aa0d9c55c6a2596a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffffd035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed04010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781407348f4137b5d80fb5d849a6aa3822cefffbdb855eaa038640b04f89d5bd426f47b64a8459092c8d5aeda3ef1cad3732bd80c8206d271689af4efb788d5c3287ea100af038001eba10001ffffffff06808b874702000000302ea22c80205a8d5650f7e869c80fbe5b5e9b04d909f86800a579e21a26404799a98c47e0ff81031210008203000401cc1027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc8058840c0000000023210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634ace0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb50d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d303000015000000000000000e49b7aaf567407247e0cefc8d990a4a19607846423c16cb0deb42b56ed00f5700000000"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": "d16b372eff7de8e0b2fa44bf74d13784c4f1ab45b64296b7e36f74950f892fad",
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Check that the transaction is confirmed:

```bash
./komodo-cli -ac_name=HELLOWORLD getrawmempool
```

## channelsrefund

**channelsrefund open_tx_id close_tx_id**

The `channelsrefund` method withdraws funds directly to the Antara address of the channel creator.

The method can only be executed after the channel `close_tx_id` has either one notarization or 100 confirmations.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name        | Type     | Description                               |
| ----------- | -------- | ----------------------------------------- |
| open_tx_id  | (string) | the id of the Channel opening transaction |
| close_tx_id | (string) | the id of the Channel closing transaction |

### Response

| Name    | Type     | Description                                                                                          |
| ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result: | (string) | whether the command succeeded                                                                        |
| hex:    | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Command

```bash
./komodo-cli -ac_name=HELLOWORLD channelsrefund 04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0 3f22afe66f0dd0e7d45ea1f89509f60673efa026c545118b309cdc03fa3bec98
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "hex": "0400008085202f8903040759ca1117f2514e2f4e67acd095720b0ad0beadf71882ae0b11b3b88f59280000000049483045022100f16f085e286641494fc0773f2bdbb426b78708ea0d441a37781a964b60e110100220744abdc3830999492b1f5b96ea8cde9f6318c9e040a4e65c3497364455ea3f5501ffffffff98ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f00000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781407b41b291afeda4e533d22565b23542159af5079b1e1408da5b3f9188bed059e6751349e0d3d9b7b7e26aeadfb6b2fc839cc471b947d1b811325386f84abe3120a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffff98ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140f0a00a6b0f008e01f88308245f7cd6001af33e7fe909a1d4b1eb54c3663620a34ed2c2d692075915ed02c4ac72e3341e6af2196016a72609f4ca3fcb4f842f13a100af038001eba10001ffffffff051027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc808b874702000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ace0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb52d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d3030000809698000000000098ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f00000000330100000000000000000000000000"
}
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's .conf file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method":"channelsrefund", "params":["04ed7f0d7c90036bad2822ea32564e38cc517f2ac86c8c53a031543e7d8235d0" ,"3f22afe66f0dd0e7d45ea1f89509f60673efa026c545118b309cdc03fa3bec98"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "result": "success",
    "hex": "0400008085202f8903040759ca1117f2514e2f4e67acd095720b0ad0beadf71882ae0b11b3b88f59280000000049483045022100f16f085e286641494fc0773f2bdbb426b78708ea0d441a37781a964b60e110100220744abdc3830999492b1f5b96ea8cde9f6318c9e040a4e65c3497364455ea3f5501ffffffff98ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f00000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781407b41b291afeda4e533d22565b23542159af5079b1e1408da5b3f9188bed059e6751349e0d3d9b7b7e26aeadfb6b2fc839cc471b947d1b811325386f84abe3120a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffff98ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140f0a00a6b0f008e01f88308245f7cd6001af33e7fe909a1d4b1eb54c3663620a34ed2c2d692075915ed02c4ac72e3341e6af2196016a72609f4ca3fcb4f842f13a100af038001eba10001ffffffff051027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc808b874702000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ace0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb52d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d3030000809698000000000098ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f00000000330100000000000000000000000000"
  },
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

Step 2: Broadcast the hex using `sendrawtransaction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f8903040759ca1117f2514e2f4e67acd095720b0ad0beadf71882ae0b11b3b88f59280000000049483045022100f16f085e286641494fc0773f2bdbb426b78708ea0d441a37781a964b60e110100220744abdc3830999492b1f5b96ea8cde9f6318c9e040a4e65c3497364455ea3f5501ffffffff98ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f00000000a74ca5a281a1a0819ca28194a067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b4756781407b41b291afeda4e533d22565b23542159af5079b1e1408da5b3f9188bed059e6751349e0d3d9b7b7e26aeadfb6b2fc839cc471b947d1b811325386f84abe3120a129a52780203a76ccf53a3f5978c2102ab5151f744308a5e4071ea7d7dba6d915b05b692d8f8103020000af038001eba10001ffffffff98ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f010000007b4c79a276a072a26ba067a565802102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b475678140f0a00a6b0f008e01f88308245f7cd6001af33e7fe909a1d4b1eb54c3663620a34ed2c2d692075915ed02c4ac72e3341e6af2196016a72609f4ca3fcb4f842f13a100af038001eba10001ffffffff051027000000000000302ea22c8020928bb24f3e778e69a0fcec948892ddd7f2e33334a9e3ee602182056e648be0ec8103120c008203000401cc1027000000000000302ea22c8020fcfca0608f930c2b02e6b5a84a96815804f3ea22e7eab032b94ad5a377d281b18103120c008203000401cc808b874702000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ace0950b5402000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000956a4c92eb52d035827d3e5431a0538c6cc82a7f51cc384e5632ea2228ad6b03907c0d7fed042102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567210257e1074b542c47cd6f603e3d78400045df0781875f698138e92cb03055286634d3030000809698000000000098ec3bfa03dc9c308b1145c526a0ef7306f60995f8a15ed4e7d00d6fe6af223f00000000330100000000000000000000000000
```
