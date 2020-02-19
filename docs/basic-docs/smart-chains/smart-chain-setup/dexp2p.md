# Enhanced Peer to Peer data broadcast and synchronisation between Nodes of a Smart Chain

:::tip Note
This Peer to Peer Messaging Enhancement technology is in development. The specifics of the implementation are subject to change. This document is a Work In Progress.
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

You might want to add the parameter `-pubkey` with the value as your pubkey for convenient testing of encrypted "datablobs" across multiple daemon restarts

## DEX_broadcast

**DEX_broadcast hex [priority [tagA [tagB [pubkey33 [volA [volB]]]]]]**

This method can be used to broadcast any data to the p2p network, which will be added to the "Data Mempools" of all the nodes with the parameter `-dexp2p` set to `1` or `2`.

#### Arguments

| Name     | Type                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hex      | (string)                       | the data to be broadcasted; can be in hex format or ASCII; to specify that the string has to be parsed as ASCII, surround it with quotes <br> <br>the size limit of a "datablob" is 1MB; the size of the actual data to be broadcasted is recommended to be smaller than 1MB <br> <br> to combat spam, after the size of "datablob" crosses 1KB, each time the size doubles, its priority is reduced by 1; this will make generating valid packets for larger data more and more expensive as not only is the difficulty increased by the packetsize, the amount of data to be hashed is increasing too                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| priority | (string, optional)             | the priority with which other nodes will route the data; can be an integer between `0` to `16` <br><br> increasing the priority of a data broadcast increases the time taken by a CPU to create it; this is achieved by changing a "nonce" in the "datablob" until the lowest bits of the SHA256 hash match `011101110111` (`0x777`) and each of the next "priority" number of bits to `0` <br> <br> **Example:** if priority is set to `5`, the lowest bits of the hash will be `01110111011100000`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| tagA     | (string, optional)             | the first tag to be associated with the data; an index associated to a tag is created in the RAM of a node and is used for quick data lookups; limited to 15 characters ;in the context of a atomicDEX order, `tagA` is the "base" (maker) coin being traded; <br> <br> if all the three values: `tagA`, `tagB` and `pubkey33` are set to `""` ie., unspecified, `tagA` defaults to the value "general"; <br> <br> if `tagA` is set to `"inbox"`, then the data is encrypted to the destination pubkey set using the `pubkey33` parameter ; all the other nodes on the network can propagate the data; but, only the node that owns the destination pubkey is able to decrypt it; if `tagA` is not set to "inbox", the data is encrypted to a publicly known keypair so that the sender pubkey can be authenticated                                                                                                                                                                                                                                                                                                                                                    |
| tagB     | (string, optional)             | the second tag to be associated with the data; an index associated to a tag is created in the RAM of a node and is used for quick data lookups; limited to 15 characters; in the context of a atomicDEX order, `tagB` is the "rel" (taker) coin being traded                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| pubkey33 | (string, optional)             | the pubkey which is associated with the datablob, called the `DEX_pubkey`; this is not a regular pubkey that starts with `02` or `03`, it starts with `01`; it can be found from the output of the [DEX_stats](#DEX_stats) RPC; it is also printed in the STDOUT of the `komodod` in a line that starts with `DEX_pubkey.(` <br> <br> if the node is started with the `-pubkey` parameter using a regular pubkey owned by the node, its privatekey is used to create the corresponding `DEX_pubkey` and printed; else, a keypair is generated for the particular session and its privatekey is used to create the corresponding `DEX_pubkey` and printed <br> <br> if the `tagA` is set to "inbox", the datablob is encrypted to the `DEX_pubkey` specified by the `pubkey33` parameter; if `tagA` is not set to "inbox", the datablob is authenticated by the `DEX_pubkey` provided through the `pubkey33` parameter by encrypting it to a publicly known keypair; if `tagA` is not set to "inbox" and the parameter `pubkey33` is set to `""`, i.e., unspecified, the datablob is not authenticated by any `DEX_pubkey` and broadcasted to the network un-encrypted; |
| volA     | (float - 8 decimals, optional) | in the context of a atomicDEX order, volume of the coin denoted by `tagA`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| volB     | (float - 8 decimals, optional) | in the context of a atomicDEX order, volume of the coin denoted by `tagB`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Response

| Name         | Type     | Description                                                                                                                                                             |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp    | (number) | UNIX timestamp at which the datablob was created                                                                                                                        |
| id           | (number) | short hash of the datablob; can be treated as a unique id most of the time                                                                                              |
| hash         | (string) | hash of the datablob; the payload is hashed like so: `sha256(curve25519(sha256(payload)))`, the `curve25519` hash is included to make the process fpga resistant; there are no known ASICS for it                                                                                                                                                    |
| tagA         | (string) | `tagA` of the datablob                                                                                                                                                  |
| tagB         | (string) | `tagB` of the datablob                                                                                                                                                  |
| pubkey       | (string) | the `pubkey` the payload is tagged with; if `tagA` is "inbox", the payload is encrypted and only the owner of the `pubkey` can decrypt the datablob                     |
| payload      | (string) | all the data being sent in the datablob; contains the data,tags,volumes etc.,                                                                                           |
| hex          | (number) | whether the `payload` is in hexadecimal format; `0` when `false` and `1` when `true`                                                                                    |
| decrypted    | (number) | the decrypted payload;                                                                                        |
| decryptedhex | (number) | whether the decrypted payload is in hexadecimal format; `0` when `false` and `1` when `true`;                 |
| error        | (string) | errors if any                                                                                                                                                           |
| senderpub    | (string) | the `DEX_pubkey` of the sender                                                                                                                                          |
| amountA      | (string) | amount associated with `tagA` (volumeA)                                                                                                                                 |
| amountB      | (string) | amount associated with `tagB` (volumeB)                                                                                                                                 |
| priority     | (number) | the priority with which the datablob will be routed by the network                                                                                                      |
| recvtime     | (number) | the unix timestamp at which the datablob was first observed by the node                                                                                                 |
| cancelled    | (number) | whether the `datablob` is set to be purged prematurely; in the context of AtomicDEX orders, it means the order has been cancelled; `0` when `false` and `1` when `true` |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_broadcast "hello" 5 "BTC" "KMD" "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063" "0.1" "100"
```

<collapse-text hidden title="Response">

```json
{
  "timestamp": 1581510301,
  "id": 2122297120,
  "hash": "07f2fae7a7c024015c42c5c42e50c49dfd909926d27a0e7aefac1b1c5027ccc4",
  "tagA": "BTC",
  "tagB": "KMD",
  "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063db161df4a00f1f24ce4e50310e45e86d67209f461f294c430000000000000000000000000000000082058a046b30feb5869c7fd22b45504b5b942989d0ca",
  "hex": 1,
  "decrypted": "hello",
  "decryptedhex": 0,
  "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "amountA": "0.10000000",
  "amountB": "100.00000000",
  "priority": 5,
  "recvtime": 1581510301,
  "cancelled": 0
}
```

</collapse-text>

## DEX_cancel

**DEX_cancel id [pubkey33 [tagA tagB]]**

This method can be used to cancel an order issued by the user's node. A node can cancel only the orders that were broadcasted using its current `DEX_pubkey`. Orders that are broadcasted without being authenticated by a pubkey can not be canceled.

#### Arguments

| Name     | Type               | Description                                                                |
| -------- | ------------------ | -------------------------------------------------------------------------- |
| id       | (number, optional) | short hash of the datablob; can be treated as a unique id most of the time |
| pubkey33 | (string, optional) | the `pubkey` the payload is tagged with                                    |
| tagA     | (string, optional) | `tagA` of the datablob                                                     |
| tagB     | (string, optional) | `tagB` of the datablob                                                     |

#### Response

| Name         | Type     | Description                                                                                                                                                             |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp    | (number) | UNIX timestamp at which the datablob was created                                                                                                                        |
| id           | (number) | short hash of the datablob; can be treated as a unique id most of the time                                                                                              |
| hash         | (string) | hash of the datablob                                                                                                                                                    |
| tagA         | (string) | `tagA` of the datablob; it's value is `"cancel"` and it lets other nodes on the network                                                                                                                                                    |
| tagB         | (string) | `tagB` of the datablob                                                                                                                                                  |
| pubkey       | (string) | the `pubkey` the payload is tagged with; if `tagA` is "inbox", the payload is encrypted and only the owner of the `pubkey` can decrypt the datablob                     |
| payload      | (string) | all the data being sent in the datablob; contains the data,tags,volumes etc.,                                                                                           |
| hex          | (number) | whether the `payload` is in hexadecimal format; `0` when `false` and `1` when `true`                                                                                    |
| decrypted    | (number) | the decrypted payload; when the byte order is reversed and converted to decimal, gives the id to be cancelled                                                                                       |
| decryptedhex | (number) | whether the decrypted payload is in hexadecimal format; `0` when `false` and `1` when `true`;                 |
| error        | (string) | errors if any                                                                                                                                                           |
| senderpub    | (string) | the `DEX_pubkey` of the sender                                                                                                                                          |
| amountA      | (string) | amount associated with `tagA` (volumeA)                                                                                                                                 |
| amountB      | (string) | amount associated with `tagB` (volumeB)                                                                                                                                 |
| priority     | (number) | the priority with which the datablob will be routed by the network                                                                                                      |
| recvtime     | (number) | the unix timestamp at which the datablob was first observed by the node                                                                                                 |
| cancelled    | (number) | whether the `datablob` is set to be purged prematurely; in the context of AtomicDEX orders, it means the order has been cancelled; `0` when `false` and `1` when `true` |

#### :pushpin: Examples

##### Command (Using the id)

Cancel an order by its "id"

```bash
./komodo-cli -ac_name=DEXP2P DEX_cancel 2432811744
```

<collapse-text hidden title="Response">

```json
{
  "timestamp": 1580475219,
  "id": 673100032,
  "hash": "0710eb81d2061ad610f66dfe43d4c814b4644a57633e7f9fe9557462fa349605",
  "tagA": "cancel",
  "tagB": "",
  "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063ae2a67c540fdfe162f287bda6fd7fa8348373292d6fa61450000000000000000000000000000000034776c72512cdaef45dbd54dcc161adb5acd9f02",
  "hex": 1,
  "decrypted": "e0c20191",
  "decryptedhex": 1,
  "amountA": "0.00000000",
  "amountB": "0.00000000",
  "priority": 8,
  "recvtime": 1580475219,
  "cancelled": 0
}
```

</collapse-text>

##### Command (Using the pubkey)

Cancel all orders tagged with a "pubkey"

```bash
./komodo-cli -ac_name=DEXP2P DEX_cancel "" 01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063
```

<collapse-text hidden title="Response">

```json
{
  "timestamp": 1580477389,
  "id": 820606976,
  "hash": "0780970ea30e2aa7f7b5d5cfd2ac61493301b883db7fad17ad6479472d442ef3",
  "tagA": "cancel",
  "tagB": "",
  "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d06315a69a48086cb634506c2fdbabccaa40b06e5e4355503f6c00000000000000000000000000000000f26b764ccddca46aaac93ac02c5f4e2c1f1388af7876c9297d835e40e8a368536dea018fa374f914b2d62888ac4fdf627d",
  "hex": 1,
  "decrypted": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "decryptedhex": 1,
  "amountA": "0.00000000",
  "amountB": "0.00000000",
  "priority": 11,
  "recvtime": 1580477389,
  "cancelled": 0
}
```

</collapse-text>

##### Command (Using the tags tagA and tagB)

Cancel all orders published for a specific `base/rel` pair

```bash
./komodo-cli -ac_name=DEXP2P DEX_cancel "" "" "KMD" "BTC"
```

<collapse-text hidden title="Response">

```json
{
  "timestamp": 1580477489,
  "id": 1361541632,
  "hash": "07a07712851c911f6dbc1d63cadbd2eeb666329307e01211f16e0594d4706fe3",
  "tagA": "cancel",
  "tagB": "",
  "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d06366bfe76902e72060a193dc5c3d8c35a57a6227a35133788600000000000000000000000000000000efe08540f37f0263a9ba2c438ef210df93ce78bd6bf2d414",
  "hex": 1,
  "decrypted": "034b4d4403425443",
  "decryptedhex": 1,
  "amountA": "0.00000000",
  "amountB": "0.00000000",
  "priority": 9,
  "recvtime": 1580477489,
  "cancelled": 0
}
```

</collapse-text>

## DEX_get

**DEX_get id**

This method returns an order's data by its id.

#### Arguments

| Name | Type     | Description             |
| ---- | -------- | ----------------------- |
| id   | (number) | short hash of the order |

#### Response

| Name         | Type     | Description                                                                                                                                                             |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp    | (number) | UNIX timestamp at which the datablob was created                                                                                                                        |
| id           | (number) | short hash of the datablob; can be treated as a unique id most of the time                                                                                              |
| hash         | (string) | hash of the datablob                                                                                                                                                    |
| tagA         | (string) | `tagA` of the datablob                                                                                                                                                  |
| tagB         | (string) | `tagB` of the datablob                                                                                                                                                  |
| pubkey       | (string) | the `pubkey` the payload is tagged with; if `tagA` is "inbox", the payload is encrypted and only the owner of the `pubkey` can decrypt the datablob                     |
| payload      | (string) | all the data being sent in the datablob; contains the data,tags,volumes etc.,                                                                                           |
| hex          | (number) | whether the `payload` is in hexadecimal format; `0` when `false` and `1` when `true`                                                                                    |
| decrypted    | (number) | the decrypted payload;                                                                                        |
| decryptedhex | (number) | whether the decrypted payload is in hexadecimal format; `0` when `false` and `1` when `true`;                 |
| error        | (string) | errors if any                                                                                                                                                           |
| senderpub    | (string) | the `DEX_pubkey` of the sender                                                                                                                                          |
| amountA      | (string) | amount associated with `tagA` (volumeA)                                                                                                                                 |
| amountB      | (string) | amount associated with `tagB` (volumeB)                                                                                                                                 |
| priority     | (number) | the priority with which the datablob will be routed by the network                                                                                                      |
| recvtime     | (number) | the unix timestamp at which the datablob was first observed by the node                                                                                                 |
| cancelled    | (number) | whether the `datablob` is set to be purged prematurely; in the context of AtomicDEX orders, it means the order has been cancelled; `0` when `false` and `1` when `true` |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_get 2122297120
```

<collapse-text hidden title="Response">

```json
{
  "timestamp": 1581510301,
  "id": 2122297120,
  "hash": "07f2fae7a7c024015c42c5c42e50c49dfd909926d27a0e7aefac1b1c5027ccc4",
  "tagA": "BTC",
  "tagB": "KMD",
  "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063db161df4a00f1f24ce4e50310e45e86d67209f461f294c430000000000000000000000000000000082058a046b30feb5869c7fd22b45504b5b942989d0ca",
  "hex": 1,
  "decrypted": "hello",
  "decryptedhex": 0,
  "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "amountA": "0.10000000",
  "amountB": "100.00000000",
  "priority": 5,
  "recvtime": 1581510301,
  "cancelled": 0
}
```

</collapse-text>

## DEX_list

**DEX_list stopat minpriority tagA tagB pubkey33 [minA maxA minB maxB [stophash]]**

This method can be used to filter and list data from the "Data Mempool" of the node. Each specified filter narrows the list down to the datablobs that match it exactly. If a filter is specified as `""` or `0`, it matches all the values a datablob might have for the filter.

#### Arguments

| Name        | Type                           | Description                                                                                                                                                                                      |
| ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| stopat      | (string)                       | the `id` of the datablob until which the filtered list is to be displayed, excluding the datablob with the given `id`                                                                                                                  |
| minpriority | (string)                       | the minimum priority of the datablobs to be filtered                                                                                                                                             |
| tagA        | (string)                       | the value of `tagA` by which the available datablobs are filtered; if all the three values: `tagA`, `tagB` and `pubkey33` are set to `""` ie., unspecified, `tagA` defaults to the tag "general" |
| tagB        | (string)                       | the value of `tagB` by which the available datablobs are filtered                                                                                                                                |
| pubkey33    | (string)                       | the value of `destination publickey` to filter the available datablobs                                                                                                                           |
| minA        | (float - 8 decimals, optional) | the minimum value of the amount associated to `tagA` to filter the available datablobs                                                                                                           |
| maxA        | (float - 8 decimals, optional) | the maximum value of the amount associated to `tagA` to filter the available datablobs                                                                                                           |
| minB        | (float - 8 decimals, optional) | the minimum value of the amount associated to `tagB` to filter the available datablobs                                                                                                           |
| maxB        | (float - 8 decimals, optional) | the maximum value of the amount associated to `tagB` to filter the available datablobs                                                                                                           |
| stophash    | (string, optional)             | the `hash` of the datablob until which the filtered list is to be displayed excluding the datablob with the given `hash`; taken into account only when `stopat` is set to `""` or `0`      |

::: tip How to use the DEX_list RPC periodically to filter the datablobs received by the node and get each datablob exactly once?

- call [DEX_list](#DEX_list) with both `stopat` and `stophash` set to `""` and the rest of the filters as necessary
- the response will contain all the available datablobs sorted in the order: "latest" to "oldest"
- let the `id` of the latest datablob(first one in the list) be `id_1` and its `hash` be `hash_1`
- if we call [DEX_list](#DEX_list) again with `stopat` set to `id_1` and `stophash` set to `""` (rest of the filters are the same), the response will contain all the newer datablobs till the datablob that has the `id` equal to `id_1` (excluding it)
- alternatively, if we call [DEX_list](#DEX_list) with stopat set to `""` and `stophash` set to `hash_1` (rest of the filters are the same), the response will contain all the newer datablobs till the datablob that has the `hash` set to `hash_1` (excluding it)

:::

#### Response

| Name      | Type            | Description                                                                                                                                                             |
| --------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| matches   | (array of json) | an array containing json representations of the matched datablobs                                                                                                       |
| timestamp | (number)        | UNIX timestamp at which the datablob was created                                                                                                                        |
| id        | (number)        | short hash of the datablob; can be treated as a unique id most of the time                                                                                              |
| hash      | (string)        | hash of the datablob                                                                                                                                                    |
| tagA      | (string)        | `tagA` of the datablob                                                                                                                                                  |
| tagB      | (string)        | `tagB` of the datablob                                                                                                                                                  |
| destpub   | (string)        | the `destpubkey` to which the payload is encrypted to                                                                                                                   |
| payload   | (string)        | all the data being sent in the datablob; contains the data,tags,volumes etc.,                                                                                           |
| hex       | (boolean)       | whether the `payload` is in hexadecimal format                                                                                                                          |
| decrypted    | (number) | the decrypted payload;                                                                                        |
| decryptedhex | (number) | whether the decrypted payload is in hexadecimal format; `0` when `false` and `1` when `true`;                 |
| error     | (string)        | errors if any; the error says `"wrong sender"` if the actual `DEX_pubkey` of the sender is different from the claimed one                                                                                                                                                           |
| senderpub | (string)        | the actual `DEX_pubkey` of the sender                                                                                                                                          |
| amountA   | (string)        | amount associated with `tagA` (volumeA)                                                                                                                                 |
| amountB   | (string)        | amount associated with `tagB` (volumeB)                                                                                                                                 |
| priority  | (number)        | the priority with which the datablob will be routed by the network                                                                                                      |
| recvtime  | (number)        | the unix timestamp at which the datablob was first observed by the node                                                                                                 |
| cancelled | (number)        | whether the `datablob` is set to be purged prematurely; in the context of AtomicDEX orders, it means the order has been cancelled; `0` when `false` and `1` when `true` |
| tagA      | (string)        | the `tagA` used to filter                                                                                                                                               |
| tagB      | (string)        | the `tagB` used to filter                                                                                                                                               |
| pubkey    | (string)        | the `pubkey` used to filter                                                                                                                                             |
| n         | (integer)       | number of matches                                                                                                                                                       |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_list "" 0 "BTC" "" "" "" "" "" "" ""
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "matches": [
    {
  "timestamp": 1581510301,
  "id": 2122297120,
  "hash": "07f2fae7a7c024015c42c5c42e50c49dfd909926d27a0e7aefac1b1c5027ccc4",
  "tagA": "BTC",
  "tagB": "KMD",
  "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063db161df4a00f1f24ce4e50310e45e86d67209f461f294c430000000000000000000000000000000082058a046b30feb5869c7fd22b45504b5b942989d0ca",
  "hex": 1,
  "decrypted": "hello",
  "decryptedhex": 0,
  "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "amountA": "0.10000000",
  "amountB": "100.00000000",
  "priority": 5,
  "recvtime": 1581510301,
  "cancelled": 0
}
  ],
  "tagA": "BTC",
  "tagB": "",
  "pubkey": "",
  "n": 1
}
```

</collapse-text>

## DEX_orderbook

**DEX_orderbook maxentries minpriority tagA tagB pubkey33 [minA maxA minB maxB]**

This method interprets the datablobs as orders for AtomicDEX and displays relevant data for each order that matches the filters applied through the parameters.

#### Arguments

| Name        | Type                           | Description                                                                                                   |
| ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| maxentries  | (string)                       | the maximum number of orders to list                                                                          |
| minpriority | (string)                       | the minimum priority of the orders to be listed                                                               |
| tagA        | (string)                       | the value of `tagA` by which the available orders are filtered; this tag is treated as the "base" coin's name |
| tagB        | (string)                       | the value of `tagB` by which the available orders are filtered ; this tag is treated as the "rel" coin's name |
| pubkey33    | (string)                       | the value of `public key` to filter the available orders                                                      |
| minA        | (float - 8 decimals, optional) | the minimum volume of the coin named by `tagA` to filter the available orders                                 |
| maxA        | (float - 8 decimals, optional) | the maximum volume of the coin named by `tagA` to filter the available orders                                 |
| minB        | (float - 8 decimals, optional) | the minimum volume of the coin named by `tagB` to filter the available orders                                 |
| maxB        | (float - 8 decimals, optional) | the maximum volume of the coin named by `tagB` to filter the available orders                                 |

#### Response

| Name       | Type            | Description                                                                          |
| ---------- | --------------- | ------------------------------------------------------------------------------------ |
| asks       | (array of json) | all the asks for the base coin named by `tagA` w.r.t to the rel coin named by `tagB` |
| price      | (string)        | the price offered; calculated as `amountB/amountA` of the datablob                   |
| baseamount | (string)        | the volume of the base coin offered; `amountA` of the datablob                       |
| relamount  | (string)        | the volume of the base coin offered; `amountB` of the datablob                       |
| priority   | (number)        | the priority of the order                                                            |
| pubkey     | (string)        | the pubkey associated with the order                                                 |
| timestamp  | (number)        | the timestamp of the order                                                           |
| hash       | (number)        | the hash of the order                                                                |
| id         | (number)        | the short hash of the order ; can be treated as an unique id                         |
| bids       | (array of json) | all the bids for the base coin named by `tagB` w.r.t to the rel coin named by `tagA` |
| price      | (number)        | the price offered; calculated as `amountB/amountA` of the datablob                   |
| baseamount | (number)        | the volume of the base coin offered; `amountB` of the datablob                       |
| relamount  | (number)        | the volume of the base coin offered; `amountA` of the datablob                       |
| priority   | (number)        | the priority of the order                                                            |
| pubkey     | (number)        | the pubkey associated with the order                                                 |
| timestamp  | (number)        | the timestamp of the order                                                           |
| hash       | (number)        | the hash of the order                                                                |
| id         | (number)        | the short hash of the order; can be treated as an unique id                          |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_orderbook 10 0 KMD BTC
```

<collapse-text hidden title="Response">

```json
{
  "asks": [
    {
      "price": 0.001,
      "baseamount": 1000,
      "relamount": 1,
      "priority": 6,
      "pubkey": "01faed489d5ae6d66e6fb7f69a15aeb81051bd02169d29eb8883260f3798e40778",
      "timestamp": 1579200793,
      "hash": "813080b3936a263ebe294f518257383c6923a36d6818c5a9e4da8bdc0d3d96c2",
      "id": 1505761344
    }
  ],
  "bids": [
    {
      "price": 999,
      "baseamount": 999,
      "relamount": 1,
      "priority": 5,
      "pubkey": "01faed489d5ae6d66e6fb7f69a15aeb81051bd02169d29eb8883260f3798e40778",
      "timestamp": 1579201068,
      "hash": "c1a4416a4bdee3a650f84cb3d5d3704c50b42bcb77cb8715af3c11f7d1c11648",
      "id": 891343456
    }
  ]
}
```

</collapse-text>

## DEX_publish

**DEX_publish filename priority sliceid**

This method allows a user to publish a file to the p2p Data Network. The file is broken into chunks and sent using the datablobs

#### Arguments

| Name     | Type     | Description                                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| filename | (string) | the name of the file to be published; the file must be present in the directory from which the command to start the Komodo daemon(`komodod`) was issued; not to be confused with the directory in which `komodod` is present |
| priority | (number) | the minimum priority above the default VIP priority level to be used for broadcasting the involved datablobs; if VIP priority level is `txpow_bits = 5` and this parameter is set to `3`, the datablobs created will have a minimum priority level of `8` |
| sliceid | (number) | id of the slice to publish; if it is an integer greater than or equal to `1`, this method will publish only the mentioned slice of the file; if set to `0`, it scans the datablobs received from the network and republishes the missing ones  |

#### Response

| Name        | Type     | Description                                   |
| ----------- | -------- | --------------------------------------------- |
| fname       | (string) | the name of the file                                              |
| id          | (number) | the id of the published file                                              |
| senderpub   | (string) | the `DEX_pubkey` of the file's sender                                              |
| filesize    | (number) | the size of the file in bytes                                              |
| fragments   | (number) | the number of fragments the file has been broken down into; each fragment has a maximum size of `10000 byte`                                              |
| numlocators | (number) | the number of locators of the published file                                              |
| filehash    | (string) | the hash of the file                                              |
| checkhash   | (string) | the hash of the file based on all the fragments the node has currently available                                             |
| result      | (string) | whether the command was successfully executed |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_publish m.mkv 5
```

<collapse-text hidden title="Response">

```json
{
  "fname": "m.mkv",
  "id": 3066883072,
  "senderpub": "0118500131b0097e3f2fc8dcf50d691d92569a4c262e5316978c79347d05999364",
  "filesize": 4820415,
  "fragments": 483,
  "numlocators": 483,
  "filehash": "ab100868752b84c6e0ae55b347ef72156439e6632fe387faa9ac7b04c6302d2b",
  "checkhash": "ab100868752b84c6e0ae55b347ef72156439e6632fe387faa9ac7b04c6302d2b",
  "result": "success"
}
```

</collapse-text>

## DEX_setpubkey

**DEX_setpubkey pubkey33**

This method allows a user set the `DEX_pubkey` used by the node. Can only be used once per daemon start. It can't be used to change the pubkey that has already been set using the `-pubkey` launch parameter.

If this method is used with a pubkey not owned by the node, the datablobs created/broadcast by this node can't be authenticated by the other nodes and can cause unpredictable behavior. 

#### Arguments

| Name     | Type     | Description                                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| pubkey33 | (string) | a regular pubkey to be used to create the `DEX_pubkey`; recommended to use a pubkey of an address owned by the node |

#### Response

| Name               | Type     | Description                                                                                                                                                                |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result             | (string) | whether the command was successfully executed                                                                                                                              |
| publishable_pubkey | (string) | the pubkey to be shared with another user for receiving encrypted data packets                                                                                             |
| secpkey            | (string) | the regular pubkey to be shared with another user for receiving encrypted data packets                                                                                     |
| recvaddr           | (string) | the regular public address associated with the `secpkey`; this will be the R-address used for a `subatomic swap`                                                                                                                    |
| recvZaddr          | (string) | the value of the launch parameter `-recvZaddr` used when launching the node; it is the z-address of Pirate in the context of `subatomic swaps`                                                                                                                                                                           |
| handle             | (string) | the value of the launch parameter `-handle` used when launching the node; it is the "username" associated with the node in the context of `subatomic swaps`                                                                                                                                                                              |
| txpowbits          | (number) | the default number bits being used for txpow; the higher this value, the more resource intensive it is to send spam transactions                                           |
| vip                | (number) | the minimum number of txpow bits to be present in a datablob for it to be considered a VIP; VIP datablobs are prioritised for routing by all nodes on the `dexp2p` network; if a node notices its peer not having a VIP datablob it knows about, it will ping the peer about it even if the VIP datablob was received by it a long time before then; this property is useful for helping newer nodes bootstrap important datablobls in saturated networks    |
| cmdpriority        | (number) | the number of txpow bits being used for datablobs generated by commands; Example: [DEX_cancel](#DEX_cancel)                                                                                                                                                                             |
| perfstats          | (string) | a string containing stats about the datablobs and the "Data mempool" the local node is seeing                                                                              |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_setpubkey 03ac42ded82688c381563d2e123a2eaf54b29d9fd15a8bd4f9f2727dbfe9be1688
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "publishable_pubkey": "01d8fa7059137996cbb933ba45f618f57e361fa56087ae4fd275cc058a1aaf3b63",
  "secpkey": "03ac42ded82688c381563d2e123a2eaf54b29d9fd15a8bd4f9f2727dbfe9be1688",
  "recvaddr": "RTteDcwszpLbd2S6uw5ib2wqC9vjSE8N4Q",
  "recvZaddr": "",
  "handle": "",
  "txpowbits": 4,
  "vip": 5,
  "cmdpriority": 7,
  "perfstats": "RAM.5 10c0e280 R.0 S.5 A.5 dup.0 | L.0 A.0 coll.0 | lag (0.0000 0.0000 0.0000) err.0 pend.0 T/F 0/0 | 0 0 0 0 0 2 1 0 2 0 0 0 0 0  0/sec"
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

| Name               | Type     | Description                                                                                                                                                                |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result             | (string) | whether the command was successfully executed                                                                                                                              |
| publishable_pubkey | (string) | the pubkey to be shared with another user for receiving encrypted data packets                                                                                             |
| secpkey            | (string) | the regular pubkey to be shared with another user for receiving encrypted data packets                                                                                     |
| recvaddr           | (string) | the regular public address associated with the `secpkey`; this will be the R-address used for a `subatomic swap`                                                                                                                    |
| recvZaddr          | (string) | the value of the launch parameter `-recvZaddr` used when launching the node; it is the z-address of Pirate in the context of `subatomic swaps`                                                                                                                                                                           |
| handle             | (string) | the value of the launch parameter `-handle` used when launching the node; it is the "username" associated with the node in the context of `subatomic swaps`                                                                                                                                                                              |
| txpowbits          | (number) | the default number bits being used for txpow; the higher this value, the more resource intensive it is to send spam transactions                                           |
| vip                | (number) | the minimum number of txpow bits to be present in a datablob for it to be considered a VIP; VIP datablobs are prioritised for routing by all nodes on the `dexp2p` network; if a node notices its peer not having a VIP datablob it knows about, it will ping the peer about it even if the VIP datablob was received by it a long time before then; this property is useful for helping newer nodes bootstrap important datablobls in saturated networks    |
| cmdpriority        | (number) | the number of txpow bits being used for datablobs generated by commands; Example: [DEX_cancel](#DEX_cancel)                                                                                                                                                                             |
| perfstats          | (string) | a string containing stats about the datablobs and the "Data mempool" the local node is seeing                                                                              |


#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DEXP2P DEX_stats
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "publishable_pubkey": "01e727e5e4711e7b4aacabf000fec7309ca317d621a26ba83923cfac0ed395a93e",
  "secpkey": "03c144dbb2002f0731417f2ba09fe2a61c853f0b7ceffb9d7718efd32470ad9e28",
  "recvaddr": "RKnGqmg4My1mtNuLEz8uAaxSEQ4fAVviZA",
  "recvZaddr": "zs1dqweh8w8h62vcalet5ztlq2u8359v0s29tqsz6xu7lf4f2vrmwhs4vrcwtmgrd9mteg4ux3aprk",
  "handle": "gcharang_bob",
  "txpowbits": 4,
  "vip": 5,
  "cmdpriority": 7,
  "perfstats": "RAM.139 0cb9bb60 R.139 S.0 A.139 dup.0 | L.278 A.139 coll.0 | lag (0.0000 0.0000 0.0000) err.0 pend.0 T/F 0/0 | 1 1 0 2 6 9 17 32 71 0 0 0 0 0  0/sec"
}
```

</collapse-text>

