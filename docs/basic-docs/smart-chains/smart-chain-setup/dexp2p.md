# Enhanced Peer to Peer data broadcast and synchronisation between Nodes of a Smart Chain

:::tip Note
This Peer to Peer Messaging Enhancement technology is in development. The specifics of the implementation are also subject to change. This document is a Work In Progress.
:::

## Introduction

All the nodes of a Smart Chain started with the **Optional** parameter `-dexp2p` (set to `1` or `2`) start listening and propagating data packets broadcasted by other nodes on the network. These data packets don't necessarily contain the Smart Chain's transactions, are stored in a node's RAM and dropped after 1 hour.

Let's call this local data stored as "Data Mempool" as opposed to the "Mempool/Transaction Mempool" that stores just the unconfirmed transactions of the Smart Chain. The data is transmitted from from one node to another in the form of "datablobs". A "datablob" contains the timestamp, the data itself (encrypted if a destination pubkey is provided, see: [DEX_broadcast](#DEX_broadcast)), a nonce, the SHA256 hash of the payload and other metadata.

- if `-dexp2p=1` is used, the node will participate in the p2p data network but doesn't respond to requests from nSPV superlight clients
- if `-dexp2p=2` is used, the node will participate in the p2p data network and also responds to requests from nSPV superlight clients

This p2p data transmission and synchronisation layer can be used for any generic data. But, there are certain enhancements made to the RPC that enable the usage of this layer as a Decentralised, Peer to Peer order broadcasting mechanism for the [AtomicDEX-API](../../atomicdex/atomicdex-api.html)

## Installation

```bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev python-zmq zlib1g-dev wget curl bsdmainutils automake cmake clang libsodium-dev libcurl4-gnutls-dev libssl-dev git unzip python jq htop -y
git clone https://github.com/jl777/komodo -b DEX --single-branch
cd komodo
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

## Launch

Currently, this technology is being tested on a testchain named `DEXP2P`

Launch Parameters:

```bash
./komodod -ac_name=DEXP2P -dexp2p=2 -ac_supply=999999 -addnode=37.9.62.186 -addnode=94.130.224.11
```

You might want to add the parameter `-pubkey` with the value as your pubkey for convenient testing of encrypted "datablobs" across different sessions

## DEX_broadcast

**DEX_broadcast hex [priority [tagA [tagB [destpub33 [volA [volB]]]]]]**

This method can be used to broadcast any data to the p2p network, which will be added to the "Data Mempools" of all the nodes with the parameter `-dexp2p` set to `1` or `2`.

#### Arguments

| Name      | Type                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hex       | (string)                       | the data to be broadcasted; can be in hex format or ASCII; to specify that the string has to be parsed as ASCII, surround it with quotes <br> <br>the size limit of a "datablob" is 1MB; the size of the actual data to be broadcasted is recommended to be smaller than 1MB <br> <br> to combat spam, after the size of "datablob" crosses 1KB, each time the size doubles, its priority is reduced by 1; this will make generating valid packets for larger data more and more expensive as not only is the difficulty increased by the packetsize, the amount of data to be hashed is increasing too                                                                                                                                                                            |
| priority  | (string, optional)             | the priority with which other nodes will route the data; can be an integer between `0` to `16` <br><br> increasing the priority of a data broadcast increases the time taken by a CPU to create it; this is achieved by changing a "nonce" in the "datablob" until the lowest bits of the SHA256 hash match `011101110111` (`0x777`) and the next "priority" number of bits to `0` <br> <br> **Example:** if priority is set to `5`, the lowest bits of the hash will be `01110111011100000`                                                                                                                                                                                                                                                                                       |
| tagA      | (string, optional)             | the first tag to be associated with the data; an index associated to a tag is created in the RAM of a node and is used for quick data lookups; limited to 15 characters ;in the context of a atomicDEX order, `tagA` is the "base" (maker) coin being traded; if all the three values: `tagA`, `tagB` and `destpub33` are set to `""` ie., unspecified, `tagA` defaults to the tag "general"                                                                                                                                                                                                                                                                                                                                                                                       |
| tagB      | (string, optional)             | the second tag to be associated with the data; an index associated to a tag is created in the RAM of a node and is used for quick data lookups; limited to 15 characters; in the context of a atomicDEX order, `tagB` is the "rel" (taker) coin being traded                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| destpub33 | (string, optional)             | the destination pubkey (destpubkey) to which the data must be encrypted; this is not a regular pubkey that starts with `02` or `03`, it starts with `01`; it can be found from the output of the [DEX_stats](#DEX_stats) RPC; it is also printed in the STDOUT of the `komodod` in a line that starts with `DEX_pubkey.(` <br> <br> encrypting the data allows all the other nodes to propagate the data, but, only the node that owns the destpubkey is able to decrypt it <br> <br> if the node is started with the `-pubkey` parameter using a regular pubkey, its privatekey is used to create the corresponding destpubkey and printed; else, a keypair is generated for the particular session and its privatekey is used to create the corresponding destpubkey and printed |
| volA      | (float - 8 decimals, optional) | in the context of a atomicDEX order, volume of the coin denoted by `tagA`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| volB      | (float - 8 decimals, optional) | in the context of a atomicDEX order, volume of the coin denoted by `tagB`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### Response

| Name      | Type      | Description                                                                   |
| --------- | --------- | ----------------------------------------------------------------------------- |
| timestamp | (number)  | UNIX timestamp at which the datablob was created                              |
| id        | (number)  | short hash of the datablob; can be treated as a unique id most of the time    |
| hash      | (string)  | hash of the datablob                                                          |
| tagA      | (string)  | `tagA` of the datablob                                                        |
| tagB      | (string)  | `tagB` of the datablob                                                        |
| destpub   | (string)  | the `destpubkey` to which the payload is encrypted to                         |
| payload   | (string)  | all the data being sent in the datablob; contains the data,tags,volumes etc., |
| hex       | (boolean) | whether the `payload` is in hexadecimal format                                |
| amountA   | (number)  | amount associated with `tagA` (volumeA)                                       |
| amountB   | (number)  | amount associated with `tagB` (volumeB)                                       |
| priority  | (number)  | the priority with which the datablob will be routed by the network            |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_broadcast "hello" 5 "BTC" "KMD" "01faed489d5ae6d66e6fb7f69a15aeb81051bd02169d29eb8883260f3798e40778" "0.1" "100"
```

<collapse-text hidden title="Response">

```json
{
  "timestamp": 1578397116,
  "id": 1800711079,
  "tagA": "BTC",
  "tagB": "KMD",
  "destpub": "01faed489d5ae6d66e6fb7f69a15aeb81051bd02169d29eb8883260f3798e40778",
  "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063cbabee9707fd587c7f2af7edce4dbdbf6b6a64cb706e87bf00000000000000000000000000000000aae2016af1c943f2370b12f96a6f437f23df448bccd0",
  "hex": 1,
  "amountA": 0.1,
  "amountB": 100,
  "priority": 5
}
```

</collapse-text>

## DEX_list

**DEX_list stopat minpriority tagA tagB destpub33 [minA maxA minB maxB]**

This method can be used to filter and list data from the "Data Mempool" of the node.

#### Arguments

| Name        | Type                           | Description                                                                                                                                                                                 |
| ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| stopat      | (string)                       | the `id/hash` of the datablob until which the filtered list is to be displayed                                                                                                              |
| minpriority | (string)                       | the minimum priority of the datablobs to be filtered                                                                                                                                        |
| tagA        | (string)                       | the value of `tagA` to filter the available datablobs; if all the three values: `tagA`, `tagB` and `destpub33` are set to `""` ie., unspecified, `tagA` defaults to the tag "general"       |
| tagB        | (string)                       | the value of `tagB` to filter the available datablobs                                                                                                                                       |
| destpub33   | (string)                       | the value of `destpublickey` to filter the available datablobs                                                                                                                              |
| minA        | (float - 8 decimals, optional) | the minimum value of the amount associated to `tagA` to filter the available datablobs                                                                                                      |
| maxA        | (float - 8 decimals, optional) | the maximum value of the amount associated to `tagA` to filter the available datablobs                                                                                                      |
| minB        | (float - 8 decimals, optional) | the minimum value of the amount associated to `tagB` to filter the available datablobs                                                                                                      |
| maxB        | (float - 8 decimals, optional) | the maximum value of the amount associated to `tagB` to filter the available datablobs                                                                                                      |
| stophash    | (string, optional)             | the `id/hash` of the datablob until which the filtered list is to be displayed excluding the datablob with the given `id/hash`; taken into account only when `stopat` is set to `""` or `0` |

::: tip Note

How to use [DEX_list](#DEX_list) periodically to filter the datablobs received by the node and get each datablob exactly once?

- call [DEX_list](#DEX_list) with `stopat` set to `0` and the rest of the filters as necessary
- the response will contain datablobs sorted in the order: "latest" to "oldest"
- note the `id/hash` of the latest datablob(first one); let's call it `id_1`
- if we call [DEX_list](#DEX_list) again with `stopat` set to `id_1` (rest of the filters are the same), the response will contain all the newer datablobs till the datablob that has the `id/hash` equal to `id_1` (including it)
- alternatively, if we call [DEX_list](#DEX_list) again with stopat set to `0` and `stophash` set to `id_1` (rest of the filters are the same), the response will contain all the newer datablobs till the datablob that has the `id/hash` set to `id_1` (excluding it)

:::

#### Response

| Name      | Type            | Description                                                                   |
| --------- | --------------- | ----------------------------------------------------------------------------- |
| matches   | (array of json) | an array containing json representations of the matched datablobs             |
| timestamp | (number)        | UNIX timestamp at which the datablob was created                              |
| id        | (number)        | short hash of the datablob; can be treated as a unique id most of the time    |
| hash      | (string)        | hash of the datablob                                                          |
| tagA      | (string)        | `tagA` of the datablob                                                        |
| tagB      | (string)        | `tagB` of the datablob                                                        |
| destpub   | (string)        | the `destpubkey` to which the payload is encrypted to                         |
| payload   | (string)        | all the data being sent in the datablob; contains the data,tags,volumes etc., |
| hex       | (boolean)       | whether the `payload` is in hexadecimal format                                |
| amountA   | (number)        | amount associated with `tagA` (volumeA)                                       |
| amountB   | (number)        | amount associated with `tagB` (volumeB)                                       |
| priority  | (number)        | the priority with which the datablob will be routed by the network            |
| tagA      | (string)        | the `tagA` used to filter                                                     |
| tagB      | (string)        | the `tagB` used to filter                                                     |
| destpub   | (string)        | the `destpubkey` used to filter                                               |
| n         | (integer)       | number of matches                                                             |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_list "" 0 "" "DOGE"
```

<collapse-text hidden title="Response">

```json
{
  "matches": [
    {
      "timestamp": 1578399257,
      "id": 712810782,
      "tagA": "BTC",
      "tagB": "DOGE",
      "destpub": "01faed489d5ae6d66e6fb7f69a15aeb81051bd02169d29eb8883260f3798e40778",
      "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063b555fcd17dfcf6a123b54fd9c9ee4150252846e41481351500000000000000000000000000000000bb8743c7c47f3257f24e6507d26563a2ae5a640d97c7",
      "hex": 1,
      "amountA": 0.1,
      "amountB": 100000,
      "priority": 5
    }
  ],
  "tagA": "",
  "tagB": "DOGE",
  "destpub": "",
  "n": 1
}
```

</collapse-text>

## DEX_stats

**DEX_stats**

This method gives info and stats related to the p2p data layer.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name               | Type     | Description                                                                    |
| ------------------ | -------- | ------------------------------------------------------------------------------ |
| publishable_pubkey | (string) | the pubkey to be shared with another user for receiving encrypted data packets |
