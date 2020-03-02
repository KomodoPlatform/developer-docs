# Enhanced Peer to Peer data broadcast and synchronisation between Nodes of a Smart Chain

:::tip Note
This Peer to Peer Messaging Enhancement technology is in development. The specifics of the implementation are subject to change. This document is a Work In Progress.
:::

## Introduction

All the nodes of a Smart Chain started with the **Optional** parameter `-dexp2p` (set to `1` or `2`) start listening and propagating data packets broadcasted by other nodes on the network. These data packets don't necessarily contain the Smart Chain's transactions, are stored in a node's RAM and dropped after 1 hour.

Let's call this local data stored as "Data Mempool" as opposed to the "Mempool/Transaction Mempool" that stores just the unconfirmed transactions of the Smart Chain. The data is transmitted from from one node to another in the form of "datablobs". A "datablob" contains the timestamp, the data itself (encrypted if a destination pubkey is provided, see: [DEX_broadcast](#dex-broadcast)), a nonce, the SHA256 hash of the payload and other metadata.

- if `-dexp2p=1` is used, the node will participate in the p2p data network but doesn't respond to requests from nSPV superlight clients
- if `-dexp2p=2` is used, the node will participate in the p2p data network and also responds to requests from nSPV superlight clients

This p2p data transmission and synchronisation layer can be used for any generic data. But, there are certain enhancements made to the RPC that enable the usage of this layer as a Decentralised, Peer to Peer order broadcasting mechanism for the [AtomicDEX-API](../../atomicdex/atomicdex-api.html)

## Installation

```bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev python-zmq zlib1g-dev wget curl bsdmainutils automake cmake clang libsodium-dev libcurl4-gnutls-dev libssl-dev git unzip python jq htop -y
git clone https://github.com/jl777/komodo -b jl777 --single-branch
cd komodo
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

## Launch

Currently, this technology is being tested on a testchain named `DORN`

Launch Parameters:

```bash
./komodod -ac_name=DORN -ac_cc=2 -ac_supply=1000000 -ac_reward=100000000 -addnode=136.243.58.134 -dexp2p=2 
```

You might want to add the parameter `-pubkey` with the value as your pubkey for convenient testing of encrypted "datablobs" across multiple daemon restarts

## Daemon Output

After the initial output common to all the daemons is printed, a daemon started with the `-dexp2p=2` command starts printing statistics about the datablobs it has seen and the state of the `dexp2p` network from its perspective. Most of the stats from the daemon output can also be accessed through the [DEX_stats](#dex-stats) RPC

Example:

```bash
2040: del.0 00000000, RAM.207 84b824a6 R.0 S.621 A.621 dup.0 | L.0 A.0 coll.0 | lag  0.000 (0.0000 0.0000 0.0000) err.0 pend.0 T/F 414/414 | 0 0 0 0 0 0 1 1 6 4 10 31 46 108  3/sec
```

### Explanation

- `2040` is the time in seconds since the last purge of the datablobs stored in the node's RAM; calculated as `unixtimestamp % purgetime` ; `%` means [modulo](https://en.wikipedia.org/wiki/Modulo_operation) and the default purge time is `1 hour`  
- `del.0` means `0` datablobs were purged by the node in the last minute
- `00000000` is the checksum of the purged datablobs in the last second (for performance reasons)
- `RAM.207` means there are currently `207` datablobs in the node's RAM
- `84b824a6` is the checksum of all the datablobs in the RAM
- `R.0 S.621 A.621` means the node Received `0` messages, Sent `621` messages, Added `621` messages; there are no right or wrong `R` and `S` values; ideally, all the nodes that don't publish/stream should have the same R and S values; but, some nodes may have larger `S` values than `R` based on connectivity, network topology and which datablobs its peers already have
- `dup.0` means the node received `0` duplicate datablobs; high amount of duplicates is bad as it wastes bandwidth
- `L.0 A.0 coll.0` these are some stats for internal tracking/debugging and should not be relevant to a user/developer  
- `lag  0.000 (0.0000 0.0000 0.0000)` in this string, the number right beside the word `lag` is the average lag over different windows of datablobs. The numbers in the brackets denote the actual lags in the different windows. The different windows are: `fast window`, `medium window`, `long window` which mean the most recent `1000`, `10000`, `100000` datablobs respectively; there might be huge values of lag recorded within the `first minute` of starting the node as VIP datablobs from other nodes start arriving even though they weren't published recently
- `err.0` means `0` non-VIP datablobs were received with over `1 minute` lag
- `pend.0` means there are `0` pending datablobs to be received from the network
- `T/F 414/414` means `414` datablobs were purged by the node the the datablobs are first `Truncated` and then their memory `Freed`; this number together with the value of `RAM` (number of datablobs currently in `RAM`) can be treated as the total number of datablobs processed by the node since its launch 
- `0 0 0 0 0 0 1 1 6 4 10 31 46 108` these numbers are the total number of datablobs in the node's RAM classified by their priority; the rightmost number gives the total number of datablobs with priority `0`, the one left to it gives the total number of datablobs with priority `1` amd so on.... ; the left most number gives the total number of datablobs with priority greater than `13`
- `3/sec` is the number of datablobs per second for the last minute


## DEX_anonsend

**DEX_anonsend message priority destpub33**

This method can be used by a user to broadcast any data to the p2p network without authenticating themselves. It will be added to the "Data Mempools" of all the nodes with the parameter `-dexp2p` set to `1` or `2`, but can only be decrypted by the node whose `DEX_pubkey` is `destpub33`.

::: tip Note

This is achieved by first encrypting the message to the `DEX_pubkey` : `destpub33` and then encrypt it again using a publicly known privatekey. This makes it so that, the datablob looks the same regardless who sent it, and only the node with `DEX_pubkey` set to `destpub33` will be able to decrypt it.

Note that, an attacker with large resources will be able to tell the ip address of the node which published the data packet and if the node publishes other datablobs that reveal its `DEX_pubkey`, then further link it. But, it is not possible for anyone to know who the intended recipient is.

:::

#### Arguments

| Name      | Type            | Description                                                                                                                                                             |
| --------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|message|(string) |the message to be sent|
|priority|(number)|the priority with which the anonymous message has to be sent |
|destpub33|(string) |the `DEX_pubkey` of the recipient node|

#### Response

| Name      | Type            | Description                                                                                                                                                             |
| --------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp | (number)        | UNIX timestamp at which the datablob was created                                                                                                                        |
| id        | (number)        | short hash of the datablob; can be treated as a unique id most of the time                                                                                              |
| hash      | (string)        | hash of the datablob                                                                                                                                                    |
| tagA      | (string)        | `tagA` of the datablob; is set to the value "anon"                                                                                                                                                  |
| tagB      | (string)        | `tagB` of the datablob; is empty for this datablob                                                                                                                                                  |
| pubkey      | (string)        | the public `DEX_pubkey` that was used to authenticate the datablob                                                                                                                                                  |
| payload   | (string)        | all the data being sent in the datablob; contains the data,tags,volumes etc.,                                                                                           |
| hex       | (boolean)       | whether the `payload` is in hexadecimal format                                                                                                                          |
| decrypted    | (number) | the decrypted payload;                                                                                        |
| decryptedhex | (number) | whether the decrypted payload is in hexadecimal format; `0` when `false` and `1` when `true`;                 |
| senderpub | (string)        | the actual `DEX_pubkey` of the sender                                                                                                                                          |
| amountA   | (string)        | amount associated with `tagA` (volumeA)                                                                                                                                 |
| amountB   | (string)        | amount associated with `tagB` (volumeB)                                                                                                                                 |
| priority  | (number)        | the priority with which the datablob will be routed by the network                                                                                                      |
| recvtime  | (number)        | the unix timestamp at which the datablob was first observed by the node                                                                                                 |
| cancelled | (number)        | whether the `datablob` is set to be purged prematurely; in the context of AtomicDEX orders, it means the order has been cancelled; `0` when `false` and `1` when `true` |


#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DORN DEX_anonsend "hello" 6 012767b0e6d680cf65b1993ddb4ccbb7f1acd027a04ed93c0b06f97714284e214d
```

<collapse-text hidden title="Response">

```json
{
  "timestamp": 1582121955,
  "id": 1382744064,
  "hash": "0700b02645281e947840db05439de8b1c2d38e1aac34c864558f86e845abac0f",
  "tagA": "anon",
  "tagB": "",
  "pubkey": "011259ec21d31a30898d7cd1609f80d9668b4778e3d97e941044b39f0c44d2e51b",
  "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063b5a6f12f8925545dab0f65a2589f272653b9db3e99fdcc76000000000000000000000000000000009e1d68cc7d8fa2d25eddbadebca787be37ccf36cf8dd964dd95c3775dfd7d04164f9e9f358c095a92bf1ea7541677ab3355c931b54471fcfeeae34bdfc8496615d1e754829a59357ff2efbee396fc6fb8d4c2770088531a23e2bcb87fdfa9b24d212c6731664a8d8a1f84c56f8efbbad08659d7387f0a02c7b516482b8872ec8ab85704ff293bd809acd84666b66b03d05a7de0523236812e988ba047a87da7176fa6113ad5047cb2c90dc1a0940dbcf67e52d64f70b2ae4a6bc10288a8b60daf243f0b9a7d1e51809ed48ef9c7f46b370974ca6694291a800f9d28868c79427254b1b12ad8a325da12fee9e707afb9398f00468ae54c26383243b9f2a013b50bc9ce0f81a446350f9767213f6738027f9e1cfa37244a40dbd73c308b9108ae5d9196f79c6f9e474ace0afbad6253ec69c78243e6a9d3ff3c2c7bf08db91c1878ce6a1a68a59dd635278d8266ccb5335b8c3b7ea9882ab40335615cb01e1f72922e9a71047fe9e49b49e17610ffcffb07d66d6ea1f3e568ff6f6039878afaa5d9ffe8d45e600c27f3dad5b83171589c76d0b3c3dfc7e5a4156283f038f245ba915fd869ef87e15c8d06ae178f983b9961f991e7c57b0db169fdd5a8783be87d22cc07f2ca79bd677506e70f6f03f9efb0a2b35b3b4352cd8f532bd325e23c9f23d7e707f5d8d8da9340d0963cec714009d6b2e73de757b37e9f938334545fa2dbcd3b07cc67f4722cf74c9dad52989f5706ba283a30c50de1a38c43d33393095ea91c09528004c424f2102a8e1050c7b45887e71169ea0b83740ff5231eead0d35539928d2bb080519fa36c49d9e8fa567ea4b599da83b609fc4e8c44074a20eea1a220cfc059048a1ac25df1b7b53d22c8593f9bf913a93aa5917ec1a0a5a87ce95dc9b8f090f67d5a16e2f19aab2ecc901f21f08eecc3c8a1998f1b05370804f5ef3b3b1ccb42c01b18f56b00dc69f3a5b59ca3bfb1d083e6f14d3d5d7943a991bd9c6fbb97041c39a3a5e9dd0990a0c6a78bc4f7c0cf58b66c24be050d338d7d28a0f33c13a08623dea3ccc05f1cb1f05f82357e59ec6e394d6fac32b59ec9424a9c75de522f24071b20553f2933caa33150de3d23b112523bdd0d4e3abb3a87e372c98a4ea25fee0c6cf40388548f9b42181ddf629c44b3fb9ffc4d30fdced6bc80e12c230b39b388187b9d3ee30a5b601bbeb115648c727ead14ee9a71f4bafd1bfbd154c03e8c1e85beb198a212e433e591aa80f5b98688f29de4077c1e8bae7edc74076952ea74b9ee00543c72a743184668ceaa80532b513200ad6ad0b67b7f913cd30e3c1ba9f8eaacdc518d62f515835247b488caa37d6aaed7ffcd523c7b6cf15f54b4d60240e7ba5cf713d884fd48c1caa797b72b4c161a89f1c71f35ffaf7db8c8b1670421f8c21395bfe455ce82bacb25ac93c6a887ccb21c41c74ff74139d2201b69af0852cc6fb2cef6af711e52986ca09cc558a040fcf31c91c518d1abc520a6d592aabf3aba8d839466597650f66fa153b2a5cb1f8f74faf680defc3b5546a673505c11ee5905f7960b3afbb3de3ca96ff04762afa8355609d937754557bc5ed0de5dc2d2a72fac4a256b296758d8d18c3a62045b3dec8a72ff9c45a9d77f007b713fead9ebb9eadeaf35e0684075ef34463c2c48221a9811df7f04190c74e6a7a279ccd6b3ea6b39e61269863ebc5c6fc1b0b29f34e44",
  "hex": 1,
  "decrypted": "1259ec21d31a30898d7cd1609f80d9668b4778e3d97e941044b39f0c44d2e51b595677ddb50546ed90b3b580d377cf83c3ffa7009996a55900000000000000000000000000000000a3a93c0cbd0b1edd933f251bcd15a67d7ca223b59d22e588a55ac9254ff8b3d8c257dc57d355c1e58c839d74938be45c7b214a5fcbe44821599997b38d904bcc20b66663470a27c940d3cf0cfec4533fef53ecc68608a38f9994521fd4b5452a11023446bf76b896734bf9163e84bc9b312fc53874b6dde1e0ad1699f63858d1290c1b78fddf18730bb537416871f8ff3276bdec6f62c8ce6fa17819097cbd1ce16c78b6965444ee7a8bd5b60850fad7b8e54b08f44ebba7406f32ba138c53e5708b8186863ec07da4027d24bea06f8be356cf6b727924ac51efa7a1415b7e2c634511cb84cdf4eea3e7ce4a5948e91c857ec2e71a10e7ab48c7d879035cf0774a1c5dc4c9afb02a7346da1b825a221baff2cb6ab9caa7f9529a9c95fc28364939aee684adaf4fbaac8e0643b0f44e6f1d97e4315444f92295d3d24df7c4b6fdab62b2ad5e06722b61839c4953986a0202631610116c12e1ccdf7bb78cccdba27ba18caeefc8d8dab90993e3993de1c05d7432d1012182d44a1fbac1b9707d62afa72fdf541ad79a4d57e4a509e4e9b862e38a0560c9e79693c546c955426ad1ff8e65059a98f741c96b0a7832a728e5e911197a2e6e74f0fd2e677fd245fc67bd9645b27906c217d17397f4b2c4d4e5b2b1f823cc09f0431432b3708b91dad0d929efd685eb3f61f550b8067458e6c58ff00212a28a87dff830c8014b3b23b35017f14ce74e2b723644423897f81635ba22cec5e4611b4d94f7f40cab7b1cee03d428f3210e69cc6b9491cf0ca81a7d5c0f819818ef4e30614c5e8e633fa569711168fb993521ec37e1527abfaf813933aa2fb72e5cf9d2e6c7466fec7df8a33c6ee2d96959d82672dada84bd343ad99e42642bc45a052f021f93471274228b4766f8c7d44767487bc4b6afd861be3898ee2e1866c3f9cd043e7d6ad331f5028817d755fe9f866342342902ebf309d47b99db5f0e1559c585031a83dcde839b0eeac73991a56775aaf375e7949b632d6e4f168901fa41672935d2f8b503b1c9a16bb6bced2eeab714d2529472c35694ade0b671ab60414b69d5349212812f589d119f5197e16df264dc054f9cf0715991934c82f728475c395d58ee328391625a49bd537777c67fb771b5b3588a61a2d472b119fb47ad320bf7c52090d56305ebd7d6a66ee5d583fd41e9564e565b373f0925aadb29006eaa5d2c6072634fbc0484295fe324dc6a546059f4955ea19dd32b58d5064793ef101b86834ef63d4db8a45c5b3bb850978bf61be83bc74b9437dde1f63302e8a40e7c6b07463ecc1d06a3ede7c5ec56f819c4b20c25c459232af13b1cc266c9a145972296a398a7827e44bf3f5785cb75495345e93739732e8e60bf6d7c874c9af43c3a785c037b493b35293d7aabade9afd8565d89b75899e9fc7a6f90a4deaad4a8d2dd39d36ebb06eebd3e0b034c8a1cb3ff25aaaa6ad1b143349d3f536a81f75a09fa9cdf97bb409aa39abe6e2f6c19c2ff903067fb2d59779219da6272a2ffbc64babedf232220a7c6891a2a2c4d2a0e252f7100e4bb2005a437b59fc23858367e0054197ac55d4a1b7526cab549",
  "decryptedhex": 1,
  "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "amountA": "0.00000000",
  "amountB": "0.00000000",
  "priority": 16,
  "recvtime": 1582121955,
  "cancelled": 0
}
```

</collapse-text>

The receiving node can find all the messages sent to it through the [DEX_anaonsend](#DEX_anaonsend) method by using the method [DEX_list](#dex-list) for listing all the the datablobs with `tagA` set to `"anon"`and looking for the matches that have the keys `"anonmsg"` and `"anonsender"` in them.

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DORN DEX_list "" 0 "anon" "" "" "" ""
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "matches": [
    {
      "timestamp": 1582121848,
      "id": 127520768,
      "hash": "07009d7950140c7fb40d9af5db18cb17d145e977587c9c436c304357b0c910c1",
      "tagA": "anon",
      "tagB": "",
      "pubkey": "011259ec21d31a30898d7cd1609f80d9668b4778e3d97e941044b39f0c44d2e51b",
      "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d0639dbf65e5ff38e9f39ed3d57513149e4b3af53e558459b49c0000000000000000000000000000000033cff9ea15df9af7f567eb723009c19ce044fe0c14ad78448c2271b728817004006a337d1a93e143dbe8b7478cfc826b4507e2c042937e2384ded8b5c2ab7def8708a268f4050eb86f89d315dcdd43a28bed8acc6ef444fa0dff5bb3369fecb6543064d7ddda83d6293ed223dfb1f73c91b7f4a52704d4d129d989cd3cd28e1ccd4fc6016365a9a8894e9c68ca5c21c104d3908aeafef4de766fcaae799db518cfec5f62784de983f8740eb1933a973e3f9b823f59fd5d3f35fe6ae38b0d20074d4f31e996d3b2e8f24e1edecd5697b520dd7dd811dcf353bc6e9a40ca9aca1b7886da443d89e3c69a9d795292d3a4059564fb6f6c807f6058e7711a640165aaeeb5a517c482f06d5819b425013ded1e58f7a1cea4a4e2d0a08e676b04dda763b078af6b3071beaecf4e632b7f702a91139788d80232cf83b3bc4618523c4723c712c701de86fc938d82c10d91312c6da97b6dd8a9601abab70f86dad45d03e3929b9aebc79a77a344157d1cf00217e0732c05d779deb228be037221373d0b71e6aaed268d84188999a2feaef4a110dbdbfa82282317ef6da05a8c7a81d8d5ef1e40a76b2502b81c528d9f728088340a028db75dd0e12b9f8ee8f88a30ad4364fb67d2cad84a8c05513d099c5ed2b13badd20a47c83ebbff930da1633f032a4092110f7574173143c90c9c2ef422ca610dfecf94367af88634656ef68908486cd906296286e8dbdeb83e168c575b38f2bc274e27ed717075c430e3269ae9991e1abfbb8d5a3a3f3725cb0e47a551e01e460ad3fb7ec0a0c0f7b09cb12b2f1962d3d98b8df2ffe6b4afca95b73679b30cde4ddc92c0eef5496f4f986a1691b23ae835405eafcf36c34e9d4d9807f7e864bf60d32eb0f1cd43ab9e375c9077495fd9e012f7e45e29fc72fbd3cf9945b7d5b0afcfd0db53ca5a5f6b6a952ed91d4106007949f8f83bb07fa2418a8199f27ad9eabd46e7235d6b98392a7f0f1db80ad648dc165c8cd8c67f97a3fe0c89efd39b3754476048334b1b0788b82c5910c1492595d69012d5480c35480626eebd979072b189f63ba284585c16351fec44bd8d8eba6e5fdb15ef36807ba9f2eebf932e339acaed5f9827cbfe27e69586c0c28e6c219ea2cf1f759bbef00aad17973d47e0f96b3e0abde459749c5655935f31a6e605ab9e61180d87475477dd26a3e5ae67ae209fe22f024ab50a3ab277c61235dbfb442a2a2c345e57d480471a99fe712254d8abba37fc173cfa1b22dddabc5eeff4396189be394bdb428e5d65531eb94012628aa49d644600093272de4175263610d713a069808643f4f2b8a69798fb1aefade26c5dee412da43c5f17aebde3f8951e5e2e9b05c0ea07b913422bcb0f16fe643911a3ecc8189fb9b96cc28925bd59aa7769904bdd55802732d70d02f96cfc2a324d51fa2870d0e6da84a52be3bb5b1016871a76767b36c9d66786b9b7e2a00dff589c3f55fd5fce851029d3f542e1af975c3d786149f42719049352a0573beb567f8e7cb4c5703f3668cf01ca6f84f83efd810c523db91332c540434efc3ade0229a07406b02e5ff35d9b7e9b0212f062bf5f75ba67e4eff1a5cc71602bbef27edbad99c45ec62b8b1a595ece67a573f59b0552d7ea57edace16cd2c40d2745f192397328c216949e370d1eca7280fb770c4a0c0deae1c9906146232410180c4d781b116a5373a8508e26bf",
      "hex": 1,
      "decrypted": "1259ec21d31a30898d7cd1609f80d9668b4778e3d97e941044b39f0c44d2e51bebb5f4271913895cc1b7556971d474e3c70ba3be8e532e340000000000000000000000000000000075a95ec3eb34710598e7fb1c04036b8b54605973a4f8b7647c8292a5f5c39b491f6aadc5f18e6f6a377197ff9d2284028c5d3ecafebc8701b7094d16f7884821753f60e56f89ab5cf5fce5d61fab5a0af55fa7c1f21b1e3d9eb219c1b10db7437d43e419ffa11554a68a3b527058c882367a62343c602e53cb81d13e0d9013a8d5ee5de9fbd25fa36323ba40728c49d15b38a78ac25269481224b1fb7d6c40d404a5b5018395c44acc3202214cdd89be1f78dcf40316a3c58c794761111b54fe7f397c79129e523d8cbede01c01fca7190f654e0265924e3a3df4aac8bd7159b8474b5a7e816908292c0e69add982b8cec35d4a8e7e5e7f41b68d4168b717e376a70b00b14ad4f0fa8c00e8250fbb0bac9b219a37fc935bd81af43c07adac0e67ac722b5091e8b866b50ae19488021abf8ae2c41157fdac12596b861628fcad69a10430ff2647058dc68815c8445a0b57928c85c0ae2ff4f16362860751d8cca58ecbc0da5b50eb921a8fc5524c07497a7021610900eeea204ec6ba91bf215de3b65f27bce94136f5f90051c88f3ac9612e8ae5278c05ab2e42aaee00aedc54f2da06fcd1fbd38d332e811110569b141a58c74e082bee036cc03f22a9323414856b3b4d43a0ab329f33af538b37c3aae90ae4d42655b1376da9306de5d88e9deccedf7a6b72675517285734a1ae43801d627bd2a74ef5711d1dd1270a00c8bf617a1a90b33079f64ebba506710cfbfa11a0db52f3c2843e1d7ced2a1a1a1ee91eb41005cc5b2cfef009b80baf0dece078a098c9691cf83534d82af8e5473730b60c6b7fe530a1dfb848383dd23bd869c02419887dda3184ad12596b7f7169b9bf62b09e17b4f3793098db44f16e1e4f225b427c82cb1f1ac40f0db3e71c8e6d236872e94c89e504cbd188f735e270697d0fc56ef2f0deadbfe29f7051288c63a26d74103671f904957c091b38527b1385a9bfc347d7421a1644f532301a59e37345abdbaa252c593a9b821dbd404264476d206257e399956e6f1078c3a4741cfd368233f825dec791b9a87e9fed95a9dccd8360e0eb488061f97c8e8325053d769073cf34a0bb0344db3f0ce493aa888de9ba70baed7470c92f9a06928b4c081772385bbadccd0fbc6754edeea94158a75919a05b8cac9bbb7ff48e5b4907d3e9d24490992c95d5bed399811cea1f45e2df2277b358565e28b70b59ba81952ef72e005b7524c252c99567b2ba8a1d56a508892e1d4436aa497c1f3564b8e9a661488b21dc59c3be70e4a9c651acab9276bfbdc96fd36c6075c0b8a10c79009c2c0d3a917f06873b00f32105532d94a64915c620de0b61a074516817b7b6d365339a66a0b10f945300251bbeeba6579df157bc0d609ad83e729dbd46c78ed12b7db3152ebeb430f498b51b6dca104dc44dbe0c573ae4a547ae7f57e9ca83083e9f73009dd9c5bf8423c71f308c763f2b25641d06db162e16df9d4f752ba85d2e82ce83fe7c6d0cf6032c5b54406e8afb49c58738ae242a8f5394f0720416c928e2e0a97f823f05031e7327e73c531ff872acca1003c11c19cb105a49f3b1b6fc87a861fbdf41a1fb1",
      "decryptedhex": 1,
      "anonmsg": "hello",
      "anonsender": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
      "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
      "amountA": "0.00000000",
      "amountB": "0.00000000",
      "priority": 12,
      "recvtime": 1582121849,
      "cancelled": 0
    }
  ],
  "tagA": "anon",
  "tagB": "",
  "pubkey": "",
  "n": 1
}
```

</collapse-text>

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
| pubkey33 | (string, optional)             | the pubkey which is associated with the datablob, called the `DEX_pubkey`; this is not a regular pubkey that starts with `02` or `03`, it starts with `01`; it can be found from the output of the [DEX_stats](#dex-stats) RPC; it is also printed in the STDOUT of the `komodod` in a line that starts with `DEX_pubkey.(` <br> <br> if the node is started with the `-pubkey` parameter using a regular pubkey owned by the node, its privatekey is used to create the corresponding `DEX_pubkey` and printed; else, a keypair is generated for the particular session and its privatekey is used to create the corresponding `DEX_pubkey` and printed <br> <br> if the `tagA` is set to "inbox", the datablob is encrypted to the `DEX_pubkey` specified by the `pubkey33` parameter; if `tagA` is not set to "inbox", the datablob is authenticated by the `DEX_pubkey` provided through the `pubkey33` parameter by encrypting it to a publicly known keypair; if `tagA` is not set to "inbox" and the parameter `pubkey33` is set to `""`, i.e., unspecified, the datablob is not authenticated by any `DEX_pubkey` and broadcasted to the network un-encrypted; |
| volA     | (float - 8 decimals, optional) | in the context of a atomicDEX order, volume of the coin denoted by `tagA`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| volB     | (float - 8 decimals, optional) | in the context of a atomicDEX order, volume of the coin denoted by `tagB`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Response

| Name         | Type     | Description                                                                                                                                                             |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp    | (number) | UNIX timestamp at which the datablob was created                                                                                                                        |
| id           | (number) | short hash of the datablob; can be treated as a unique id most of the time                                                                                              |
| hash         | (string) | hash of the datablob; the payload is hashed like so: `sha256(curve25519(sha256(payload)))`, the `curve25519` hash is included to make the process FPGA resistant to deter spammers; there are no known ASICS for it                                                                                                                                                    |
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
./komodo-cli -ac_name=DORN DEX_broadcast "hello" 5 "BTC" "KMD" "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063" "0.1" "100"
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
./komodo-cli -ac_name=DORN DEX_cancel 2432811744
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
./komodo-cli -ac_name=DORN DEX_cancel "" 01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063
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
./komodo-cli -ac_name=DORN DEX_cancel "" "" "KMD" "BTC"
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
./komodo-cli -ac_name=DORN DEX_get 2122297120
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

- call [DEX_list](#dex-list) with both `stopat` and `stophash` set to `""` and the rest of the filters as necessary
- the response will contain all the available datablobs sorted in the order: "latest" to "oldest"
- let the `id` of the latest datablob(first one in the list) be `id_1` and its `hash` be `hash_1`
- if we call [DEX_list](#dex-list) again with `stopat` set to `id_1` and `stophash` set to `""` (rest of the filters are the same), the response will contain all the newer datablobs till the datablob that has the `id` equal to `id_1` (excluding it)
- alternatively, if we call [DEX_list](#dex-list) with stopat set to `""` and `stophash` set to `hash_1` (rest of the filters are the same), the response will contain all the newer datablobs till the datablob that has the `hash` set to `hash_1` (excluding it)

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
|anonmsg|(string)|the decrypted anonymous message received by the node from a `anonsender` who most likely used the [DEX_anonsend](#dex-anonsend) method |
|anonsender|(string)| the `DEX_pubkey` of the anon message sender    |
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
./komodo-cli -ac_name=DORN DEX_list "" 0 "BTC" "" "" "" "" "" "" ""
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
./komodo-cli -ac_name=DORN DEX_orderbook 10 0 KMD BTC
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

This method allows a user to publish a file to the p2p Data Network. The file is broken into fragments and broadcast to the network using the datablobs. Take a look at the response of [DEX_broadcast](#dex-broadcast) for a list of all the keys available in a datablob. The `DEX_publish` method utilises the datablobs to

1) Indicate to the network that a file is published; this datablob contains the `DEX_pubkey` of the sender, the name of the file published, its SHA256 hash, its size, number of datablobs that have been used to send all the data of the file to the network (fragments); the datablobs of this type can be found using their `tagA`, which is set to `files`.

Example:

Command to filter the datablobs to get information on all the files published and available on the network

```bash
./komodo-cli -ac_name=DORN DEX_list 0 0 "files"
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "matches": [
    {
      "timestamp": 1583133132,
      "id": 612508960,
      "hash": "075222485238880d01d4f2f45bb1c458132279c4df4c18938b5f6b2b97f34332",
      "tagA": "files",
      "tagB": "roadmap2020.pdf",
      "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
      "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d06359b4e682c3e712ca637f96f7c48f9febd20760b5c1bd1868000000000000000000000000000000007623541bb93c35b1248460b1793cfb3e712c874216a272440edc73bb6ddf160657851f50b7bbcb33fc581f1e5ec3501c",
      "hex": 1,
      "decrypted": "8ed81c26721dcce7bfd1a811f301ec84a2f79389ab86cb45e481ab3f5f40f85d",
      "decryptedhex": 1,
      "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
      "amountA": "0.02049320",
      "amountB": "0.00000205",
      "priority": 5,
      "recvtime": 1583133133,
      "cancelled": 0
    }
  ],
  "tagA": "files",
  "tagB": "",
  "pubkey": "",
  "n": 1
}
```

</collapse-text>

The value of the key named `"matches"` is a JSON array. In it, we can see only one JSON. It means that, there is only `1` file that is currently published and available on the network. In that JSON, we can see that `tagA` is `files`, which we filtered for. The rest of the relevant keys are as follows

- `"tagB"` set to `"roadmap2020.pdf"`; it is the name of the file
- `"pubkey"` set to `"01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063"`; it is the `DEX_pubkey` of the publisher
- `"decrypted"` set to `"8ed81c26721dcce7bfd1a811f301ec84a2f79389ab86cb45e481ab3f5f40f85d"`; it is the SHA256 hash of the file
- `"amountA"` set to `"0.02049320"`; the value encodes the size of the file; to get the size in bytes, multiply the value with `10^8`
- `"amountB"` set to `"0.00000205"`; the value encodes the number of datablobs used to broadcast the file; to get the number, multiply the value with `10^8`

2) Inform the network about the ids of the datablobs that contain the actual file data; this is done by broadcasting a datablob that contains this information. This datablob has `tagA` as the filename and `tagB` as the word `locators`

Example:

Command to filter the datablobs to get the datablob that contains the locators information of a published file whose name is `roadmap2020.pdf`

```bash
./komodo-cli -ac_name=DORN DEX_list 0 0 "roadmap2020.pdf" "locators"
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "matches": [
    {
      "timestamp": 1583133132,
      "id": 4181200704,
      "hash": "07f48093ef4402a46703e38566f6b8616a2bd60fbcb4121e645ac122f1abc507",
      "tagA": "roadmap2020.pdf",
      "tagB": "locators",
      "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
      "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d06399cdf089b12873e23a752f0b2ad9e6f8b31b4f0629ac157400000000000000000000000000000000f8157d7e85cff371213d997f02e41a7fc28d7a328ff0be98fb348eb9efe16cf0dba971e1eb1c63761abe120e168a97208de2601bd58399a8f1ab928d4734b32f8fc33277c7567c2a3fc089e3835144dda94d0e6418ac5137f6c771501104f3922cfeba5689e8d76f43f20c1ae2b801a2d5b964f5af5268f4eb80b7399e7f917dc18afc4d48785cf526c187f3090856ed7c3bbad2b7fd47d70f70cea80bbf6d75e7ab78040bd3a650e659c83adcebd803e6897c748ebf4901433e2d7a780459a522009c2093b9823ca864e6efea410dc422c49ecf84333acedaddc66ca391a5d01d47f64743da6fd54cb5b95067a7930e00e59a0752ba3ed78893741f816d8ae9169d83015d243854ff77b0dfbeff85770d0913d1b90a5ba00a43c6845a7955c2fce8373d45f19a81fc2406d27b3c7ae31f3bd94f7096339f33c0ad0a78a588a5fc4b2168f279f429ec1579c4fb2d5c47bb9f3ffc31aa375248a8be759b504d48372eef4e91fe0be0557d71ec0eaf896fdcfb1ffac5b655b092cb8b19134e8959911713dcdf870c8f5375a132b4aabb5f31e07b3c570e069eb881df11717ffe1e7bfd3a199c013774497be2b5d399434db5416fbd97c8efc214e6460b0f1fd465224330de88794a81ee3b8a5484ba02af12711430b2e472873d245ee7ff293e82da1c632bcad64a714fc5b329a314a81b4eab16c4f3e02edd88adc07ee25866b34507c552f4eeb7d08256308aaad4bd145f59105f92c2a188f8a6218098d737596cf5978ff71d748b643df0dce16c0398acfe67ac77848b52d1bc2d94b679b4e0a37dc8ae9e74fedfb27f61ab551c4ad3eb4967823c6f22bb89420997cbeaf1355ad4b77b0203768664363a0eae751ba462685aee072d8b38071fdd50592cbda1c22458740dc162ed0d11208ca1307d0217cab2e7e0e19b8adf96c4f26344748910d88924ebd063e6a9bac4feea1240222d7d7da56f2a978d9348abadd48805c0317f7a8bf89c4646db053a301db62d5a1ba714d42f20cc56c85959cfdf6dda91ff495bf22d07be9dd6e048338a5abababe58afa33ceddbb1eea5dcfb86ee16c6238f1d3c1fd4ea04b0184e76d37fccade962d6f1be9340950a7e5795638acd94b0e4d2505e7af352944bf08d4e5697c806d80aa27ae9979292f9db9023e5dedd3a1b07b68b8cf695697e4b1f7f43a52a57f78b923cacaa5a6a0834ee34fc8f79c5908ce1161823eb5a2389904700828a3c70839fb1692c457538b5ea1f3a8edfb7229e627595b784c042c681667d94a0c0bd90532b9223f2da8d387d92451f8c6b46156032e70304e17d7cf1af6e5fee5b0929e374a54ac6c59c58fcaf0df9d6ce07debb23e0404a9464e42f893368eb5dc78215669fb58cb64254b666e34f35e657a7bd41dd6dac29244980b493013d88128d0aaf1003ae277374d64ba867ef3b3d585d5e552046d37e5b6956f4fa03dd706f1710155f8f18b711f77b754f5115dee144713c67312c4be484b719bca40a6e1eb0610493431ed6a091400f512c5f61d6d3c48cf11d3c7e4a97d4c66e4b5c809ace54fe7292390cd8f6d6926cc60b2076fbde92242f472d8ae371d56da6a0160a7d0ed661c6ab1a46e201d66d15036dbfb79d23079c8b9c55a9a1b5fd1ec03a01a3834c74bce535a5df6c230a51812c3b05661852206015f3fcaf93c5d5094697d0269115d9b586fe06cf94925733d706f38ceaaf5c951a17e50b9dfb94b3e7e7e68c28c62c57c832f3c8ca237a6d4dec2205427d101ef98981027e177d75592239abaadf18c921de73eaf0a1d9c2c1fb9a024b4d135b3b5fee16b1c466e31b334e71cfe5dc653956d4f46f460eaf6b005eebc5883d84d69ef2255a4b4766584237cf0e1f759348c39b3522deda89a234e654d0ef6987e59748b96713bd8737070bd172e218c399883aca265f148282c4566cc6aa598b76c2abcc761bbd43fc4dafbde08bac911f39b6bad4dc04cb714ddbcbe40f8c6554520cdc28ba484365ea27b2abd8e1ba642cf65b911f0a8d313f5318ed15c49adfaf8b2ba4dd120686ff2970a6e491a1c4b441ba7e2cccbd30acc8b17db4f1a2a04faaf263a4d5f0eb423042d9a3382f5e69e4e213005a4a610b53cde586819c46ff02814af45b76b6e88a3f29000e97710ce11f9b932ad4cc934ae78c53b6708c0da7b39f97902b4f0aeddbb8f455de3b157cbd39a34fba989533b3250b75b8b7c54ec44606d9e4222a05efcc6b2caf8e535286e34fa89bd8f253cdadceb931cdbeeb3923a55b599a7e104e05681206671ea3de0e85877667a820ee1292365db2ebaa6a69f6bfa8b15281754cfa52bf971332c8e8634e",
      "hex": 1,
      "decrypted": "0000000000000000f0d0d777c8b15c5e325096e2c8b15c5efcdc5398c8b15c5ed0f4dc2dc8b15c5e86710b15c8b15c5e7c8a0196c8b15c5e90485b8fc8b15c5e24a4e437c8b15c5e1be36edcc8b15c5e17477050c8b15c5e84a1c23fc8b15c5e8c9b0e67c8b15c5e349f8745c8b15c5e2df0c878c9b15c5ea8813bfbc9b15c5e5184d8e9c9b15c5e6feff863c9b15c5e7245e7c7c9b15c5e5e45bcd1c9b15c5ed4c28612c9b15c5ecc73160bc9b15c5e18e23196c9b15c5eab0158b6c9b15c5efa18d0ecc9b15c5e8319c73ec9b15c5e59474c2ec9b15c5e0c007108c9b15c5e0efd5d7bc9b15c5e92daa5c7c9b15c5e306e4e97c9b15c5e96c67f95c9b15c5e55ce859cc9b15c5e7f09b8aac9b15c5e71567a1ec9b15c5e01a550a2c9b15c5e845d5437c9b15c5ee4d3e63ec9b15c5ef0221eeec9b15c5e3faad430c9b15c5e03345654c9b15c5ec3a67339c9b15c5e88d05608c9b15c5ead5a5b7dc9b15c5e4a44eaadc9b15c5ee5aa9b83c9b15c5ea0ee76ccc9b15c5e1c305f86c9b15c5ee6b5991dc9b15c5ea743a239c9b15c5e9f614664c9b15c5efa77b3e2c9b15c5ec866e333c9b15c5e9266335ac9b15c5e108431aac9b15c5e359dd61fc9b15c5e3b05545dc9b15c5e6a202972c9b15c5e92d2a54ac9b15c5e610a3af3c9b15c5ea6f54144c9b15c5eda82431ac9b15c5ef7149357c9b15c5eafd0c1dac9b15c5e31de5c27c9b15c5e91aa89b2c9b15c5ea8d42409c9b15c5e0b3f08a3c9b15c5e6c9fa418c9b15c5eaab23219c9b15c5e2549f4eac9b15c5e8108b265c9b15c5e44812defc9b15c5eff3a6563c9b15c5ea3ca6382c9b15c5e41d03a46c9b15c5e42c96100c9b15c5ea465aad5c9b15c5e651df8fbc9b15c5e294164f3c9b15c5e3008c129c9b15c5eb057ca36c9b15c5e83bd7654c9b15c5e94f8f2c3c9b15c5e64574935c9b15c5e0e88ec1dc9b15c5e85238b48c9b15c5ef7721c5ccab15c5e2d536d91cab15c5ea3a456cccab15c5eccb84d51cab15c5ef69bb145cab15c5ebfcfc482cab15c5e9c55539ccab15c5ebaf46fd2cab15c5ee7d7ddb5cab15c5ea0977be2cab15c5e8d55d9c7cab15c5e8973bd61cab15c5e75c6119acab15c5e25dfb912cab15c5e84298d34cab15c5ea486d6cbcab15c5e8a236499cab15c5e4754adb6cab15c5e15ca24e4cab15c5ea6004b05cab15c5eea399503cab15c5ead9d8e7dcab15c5ed77cc616cab15c5e88a3ab14cab15c5e4df5ce3acab15c5eb85d3468cab15c5e683b8324cab15c5e7b29c8c1cab15c5ec2fd8bb9cab15c5e145e8812cab15c5e773fad80cab15c5e6571c1a1cab15c5eee734f31cab15c5e4b9e0e27cab15c5e709c4d46cab15c5ee7cbcf59cab15c5ec87e4554cab15c5e7c194974cab15c5ef87aead1cab15c5ecfb318b7cab15c5e97b3cd9acab15c5e156945dacab15c5e42b7cacbcab15c5eadc45b9bcab15c5eaa3864dfcab15c5e1361f3c1cab15c5ea34000cdcab15c5e18f92be5cab15c5e46189473cab15c5e322d2e09cab15c5e8f1ba3e3cab15c5ea8b61d80cab15c5ecaef0d5dcab15c5e38e587f3cbb15c5e6bfd388ecbb15c5e3879f068cbb15c5e9b02cccbcbb15c5efd15e702cbb15c5e49f3d144cbb15c5e54636568cbb15c5efcd7306ccbb15c5e92fefc75cbb15c5ed39b93f1cbb15c5e64611045cbb15c5e96d89c3fcbb15c5e653ff581cbb15c5ed20cbf02cbb15c5e19868170cbb15c5e52907df3cbb15c5e86fe3d96cbb15c5ed8e7e5fccbb15c5ef4157aadcbb15c5e02de281acbb15c5e66a3310bcbb15c5e56fc208dcbb15c5e8a694821cbb15c5e4f1ba990cbb15c5eae2e5c34cbb15c5e26e43b75cbb15c5e80c8a7ddcbb15c5e1a52a6eacbb15c5ede47eeeccbb15c5ec9d52965cbb15c5e3079dcafcbb15c5eb1ed054dcbb15c5e6436d343cbb15c5e0de1666ccbb15c5e41ea6097cbb15c5e1f0477bfcbb15c5e1d5a514dcbb15c5ecd73a3fecbb15c5e12375204cbb15c5e2a154d2ecbb15c5e8394f1adcbb15c5e244fd82ecbb15c5e2525344dcbb15c5e576c6cc3cbb15c5e71bd3b93cbb15c5e9e2b2181cbb15c5eefb267f3cbb15c5eac7f59a6cbb15c5eae16f7d8cbb15c5eafc56965cbb15c5e94e0d353cbb15c5e32a5d5c5cbb15c5e7fe5283acbb15c5e292ddd6ecbb15c5ee1bf4a9ecbb15c5e44fdc900cbb15c5e15d9fcb3cbb15c5e58917ed0cbb15c5ebc484fe7cbb15c5ec7d56387cbb15c5e7a4f5e36cbb15c5ec980d4f9cbb15c5eb546a7a4cbb15c5e10aca75bccb15c5e7852b27eccb15c5ef35bc132ccb15c5e",
      "decryptedhex": 1,
      "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
      "amountA": "0.02049320",
      "amountB": "0.00000205",
      "priority": 6,
      "recvtime": 1583133133,
      "cancelled": 0
    }
  ],
  "tagA": "roadmap2020.pdf",
  "tagB": "locators",
  "pubkey": "",
  "n": 1
}
```

</collapse-text>

The value of the key named `"matches"` is a JSON array. In it, we can see the datablob that contains the locators information about the published file. In the JSON that represents the datablob, we can see that `tagA` is the file name and `tagB` is the word `locators`, which we filtered for. The rest of the relevant keys are as follows

- `"pubkey"` set to `"01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063"`; it is the `DEX_pubkey` of the publisher
- the value of the key named `"decrypted"` contains the ids of all the datablobs that have the actual data of the file;  
- `"amountA"` set to `"0.02049320"`; the value encodes the size of the file; to get the size in bytes, multiply the value with `10^8`
- `"amountB"` set to `"0.00000205"`; the value encodes the number of datablobs used to broadcast the file; to get the number, multiply the value with `10^8`

3) Publish the actual data of the file after splitting it into fragments and broadcasting each fragment using a datablob. These datablobs have `tagA` as the filename and `tagB` as the word `data`

Example:

Command to filter the datablobs to get the datablobs that contains the data a published file whose name is `roadmap2020.pdf`

```bash
./komodo-cli -ac_name=DORN DEX_list 0 0 "roadmap2020.pdf" "data"
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "matches": [
    {
      "timestamp": 1583133131,
      "id": 2762426037,
      "hash": "47add129a9f20620e51f14c18648dd8e1ff9ae1671e95b7c83b232fbf3af6504",
      "tagA": "roadmap2020.pdf",
      "tagB": "data",
      "pubkey": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
      "payload": "e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063acd4b6bc7fd85d7861542e4a8ad14a15ecd38b7a192f56cc000000000000000000000000000000003b19665e99ac8b950ac4f4f24dbd453de334cbd36a1be02c81a0898405402657353c83cbca8e6351dddf0c716a1d427b9de920bcfa1ab54b2b0160ec7f72a66b833fe870d0415d3c5eaa78014a76f7e783858a2330074427fefe22e378f508ce3ac4e003676a98a6444e60ea7bd809a81fc0ddacbd8b505cc94a96dfd9443e24a696060c696b1d2d2c963fa708645a19bd4473fa8918bf28c4faaa42940fa1ce9961f6a1d663cbbd44dc5e051c43a6d9f68ca02962a154641218338e2ca99425c8fb6eecf77ce0ed030a04653864395e814e8d6496696917f653897c7525f75e34374f51725f6a4db4adda4ac095abbc630d90bae6dcf16f19502f3fe243ba10c6715028b55eca1113ad74dc07f537b1c9e5f2554edd29471f12b7fd28944b7fff368c0135adeef47db115b888099ff90c2b2f7f54a431c21d3ad7556281019ae3daefa12b010597853390ccacde113487beb656776bdb98f4dec27414e67c77523c0f20d18afd31365e4d8694354770e0501bfc5dbecf8180de693448040c28f814e5b230ede6172f874d36798614cd1ba51ae9351d23bbe5f0e3b1487a451b8074cdb06ab3464643617a0491d40c42badf3383472f1d802d762c89d5724e9a4e6d4e5c269b3a172b848b516edb5f0a0e3d8ed0ede5575b4e65490f26082eefac4ae6a18ca3fbe23a7e31045c26b7d004ac880506617e72445037bdf708f4e5110736dc3d53d3797b51a87004c0bc369f640b3cda5859ff62ba7bc64f701244811f7f8b1249420507360e832ef0722f4939e4144b3e5d5e1c6d70b22f762fa9af6de49c9bd0c2fedc7ad4b382532ade1c5893ab20088c8d447756fa1c03dd3da8d32529baa89fcd66aa99cd78f5c192e82cd3c5bd8447d8328899162415f2ad87b13462ac724add4d03fc3b1cf796b86198c3f9d3bc25a79c7c77c6de8a24b6d794d9ba1ff7867d8e3d0c1c7b2b7e06c707980a6e3835a4d3c0868ac871c1aab84c8d0e2730c5cacbd64214884f3e1a28ff1f6ce92bdc3fab47124e0fa16c908cff3a91c8ce3b6e82d99e122798a5dcc07d138f24287bc016ad8bd2f548992fa509a17ff9fe6f7f9df156834fd736654dba19acc7da3b60fba82039aa897b7dceaa57df8c28304b9e30b6c1465e2e0ae90f40b291f76f059a9d49c1f2743be9357a7ec5a63aedd4aa0fb53739cbba709160abb0e4620f5d6a1f6f25ff2035c92029e7f1800002b434b56c25e384130694e6d881bc980ac4f673c13ec70cdd37ed3d3dbb77176143ad3bc2c56c0b372e4fd72b5d3addbde731fd2767520f8953b1413f803a6179a20aff7270a53d3782fd3878eb0993047ce579e7b56e461c8af540a96f6c60778384c08ec4162706084e8b6469a33600bebf18a145afb67271df0b08df77c139cf8bbc9aa8dc5dc3b19fd5c4524940bbc3d6cc03272742c8fa8ca15356987d27315718fffb98d0b7caacd54f1a46a2c485553735fbc8880407a4603d8178df6c9c021a8c9d8ef560fcd33d0b6da7df59473296ea5372dc2e21c54f991dc12fe37d4b76f0f023bdd2b159af4ee03386f5e134e1461ed4d01cb09c7ff36f67b1d90d88359e079517514e91857d09573e55a4eb65e26c8583b4cd9b4ffcfa401c0e2d85b00b3010eb56300c19ea94348f0905b58170fc20278d4903b4aaf66b969e791f590ec22653a9b52f84594bfbe4632b81d7699b1eed34e0f67bb6745e1009516241b757b482192d434af7d7b3cff6297e4d6acd0eb02dfcd1d012d4377b4275ff95f0f586584c5e6f81d14e5c18eb6b50ac7562609417975740441866e0eeb24c6258d47a1e330531d33003ca74040ab4b765fdef075aef8c176ead9e406b5f5b3363b1d17e269424b348aca7f78cf8f9d909b51f051a3c78c4c7163c1a9cab4950ff6fb1a08ee64a87e77559be07ae00a02bbd7646cbde9a2fc68e2c2114643e16fcb1362668711edfa3256de6dc0974b8a9361248a144eb50da277e153773ac02fddb033fa775a2e67334ad58a6ee73beb6f5cebab3654d1bb751f75fbb959db6ac6505af7e2905c6d90ff9f3b9f42e153c77d7805b72dfd32ed2a30a35f7a157d9983dfb274dbfaeee1ebe52b0e7465704ba33b51afa6aa7c0095aa85d059d6347831a7aceec75358d3d8e5459e54bf80a6d9f8ed1d85319c1e743dae9d35723867c08fb7add204cdba624a7f12bd9a04aa1d30dcd9dc3b61a35b3f9c9b10ea0def66f0d3f6cdc81456888d662a9f064ea162fc2ed3f1a88ddbad2bb383eaece8be55e169745528c36f6942400890dc8338d785de8b3cef20a33a38b38c245ab4e54cbeee8375dff84942a4bb3a4ce27878611ac024a200498aad54a47b26514480bfe6a4bb1725b6809d634d2ea9fcc4c7a0be13e3db3840328df84994aa27dfef0b5275cd4be6f1e24707dc15128c19759178cd8bf7e6b9b67b762b8a86c20f6ff0eaf5c8df2ed21aaa5ea2be19d3de21435adff65a8238df032910338afeca7e92c7d7e965bc1a59423720eaeee4968ad4fc8ae96734c03ce11032b3cb4be211f69a1b964205c93066fa0e1481493c5ad9137118d3e86f785ac3bca97f10262828524d229d4860c73331e43836e4dd1e253c2fe3de1c008bd710b0379b873d724d6e505b76d6805214a6c98ae3d572596310d409c74b1b9e3c0f771defa8477a2653a4b82ed3f597e2f98bb0703b801514800121ca5d2b28b2c1f13cc25f56fc52ee09a4285651e0c8d45a87b35a05b172f2b1a261137d0d9f5f600e979084cd403c24f71800e36a7fabc0d36488e40cd6066d7893b91ccb9871157d35c1a3f91949b1bc36b862ce6608a977c3e2c2bc2a4e154134577913cf3affa37cf00abcd385e7cbb9cb77f8492e38076c994e52a5c60971cf985087eefdfae08c3af9648e198d7b16a47b63a2c1d8c5c85caca1b23ff6989739e45819220d8b939bab9297d64ebaa0f0519669f071a4dc5c8f5d1e9dee25408517e0e7ce30c351b12685cc6645520a39aedb0ee22c788edadd6ea53420e39cc502e040e4a649470f8863328175414268d1cbd78a23b877b7ecc98274d9fdedaaf5ea47363d77bcde233e58c5b55330872eb0aae967a414a590551756f4c7a35c1cc29c3fd463c316336e1792bd7f9a14673872ab46e36246e1e684d778a4c8a2260b4cf176d607fd7991da1842ff385c6050c7fd61ecb5f322d1ca58dc6b0f836e5232c791ed961b56bf9560539310859ed05aa741cb6db1b4333fec517265ad9d16661513a051ada1c96eb300e5ea899dd951b75db3a84a7c563f8fc504661a12a2825ec9ff0fa7f0d8ecf08a94981aff88acdebf6b9aac507c9260b6197def15ae3145c99ba67845a6f4853ecaf2d9a5cb7297f6f2c7fbb86e81871b3e6e09a53fbefa47531c52f7ca10ea386f3ab2ffed80bce37704e12d2180c385b41c5cae6d8e61bf6298d0e8d2d34873a5b2201eeae24804ff15d174a90d0c28a74de349bcc0bbc5ed9b05c917ec70796d8323ccb8945ccc2bf8792039c749551b1b0a6e833a656e1588095b5656fc78b1544e8e27e2abbb4cc8242db4c86f70a29194b9a961edaccb256d610c43b1946f85652bc45b4919eaa623ba04921990c0022880b5b194fd339781afb7bab204f42805c1f5807385ed8489c1618868edad22931d025af03c42518a509c4e8b6b32882880bb22606c6e9c1921bd95d07a7fb10aa94f77a3afa417be2bb7ed711294d6e231fe71acaf3e8905303430a450d6699d755d1393b8279a1c109c0384b5f51ed7c543d1ae5e7f8a6fa3fd71347a579512975176c7d82ad5e02f325c9d5087bcbdf03d5c576228cff5d12c3eb84a44b4dc79195bf30ba9fb209534fe8954725267173aa84cc42f3041718ed6a52846c7b8b814fa64a1cd316cf246284ff5d48c55c8bf05258754e3b961ff6759ba19179107c27cfa55e0ce1d301bcd52912ddf184e5f706a6ecfa631e5c15f5ffd565880cf7c538c0eeb5ed485d29ff672a4cc0530f750601223a6e201fbc6bf7111f25bc18f6d092333d052de697db9c92594ed6b1f74290b78a7a7b0efeca5e5816623a424c6768efd6fd2c67503380c1fe05edf7e8d879d8d159fea18a4ef2e6de9ce4a2ba21d9302710842729aa90c27cf7d9b7209643f6cf859acd54c5a2ae514f6c06913de5d015438cee33c14cc4cddbf51f092502ca6829bcb57182dc8bc550bc85fe159d801d67148a98fb97636ffa13649505798cdd891671620547eb537ccc995702f45e26b8b263a4b454e2d986f418bd241840790dd97ac326e76d568575ac1e8a024285bff0f1525e17cb7c8f6d12ad650a660268092d1fcc5ea621648adac3163de6f38ba96b4e6fa28374a3449051f0faef3762b116dd0c47967bf19eeb092e55e42c409b0b42bc337b75e0b721f65ff223b049be615c4b2effdb52bdf975150e0d5f3365461d85ce8ffd8cb3324713cb03885d71ea71a99dd3338133b393cdc4ca82a3b509889eedf92ebacd425c995e774922960530f33c79e91c0e761f7e53125647bb3d894b1c9b80667cf03a252259caded2d9db38d2ae35d64f1ef66a670faa04a56cb37576fc13cfa5b226c65d6d9836f9bd4de31aeb04d0f9f2daa0ee62bdd2ecdbf7702ee55612591fafe116c1d3fc29ed0a564cee38f04e0042adef31e84365b56b86f0177cefd9cc3fdd03af32172fe38654ee682ccd1c60c862eac5b5abc6ffe57beb5edfc6f83e030afb99972dddcc010bc97c13bfdf1d6019d5ae648028a603690784ea694eacc487147cdda44f4859d627e0107c5325e4475730c88f973ce5811c43a6f7d4c905038cf1642d434fb6fe485231b7b17dfcbed91b2cccc5a37e3ac0a4d547c5230cd530ae16a8ff66279a3bdacdba9244d77a6c5a1b90aa4acb37ccf534c967318559133343f7e01e49a40b8aaa4a0197b0e85f0269b9902d9d82bd1c6a93e04c691b8600af11ce00b56e6e90d88ac8a94631275d995dbf600721242dc70a2f8d40f0c9ad206502b52d13e429412e49d4b848e4fcfc4e3a3624da9d4a1ca16c0a9b1b1e9aeb5dbf4c32e831c52f1d2eb8e1893bc74362061d5fd715db1bae4561815b69e6b87d9a129e6ccc9721a1ae318bcffd90440a96906f47719c26b8d64ff2aa41022d725d4ec58d840028a396e8cdca0a315d4ddf924cb11d760835748a4f9aa2d2913a936448c9b45dc40247c2b68800e0ebc6558d1c4cbc3d7602ad7ce2d7a80b2be1b1a89c1472a08fdb1bdeed79cd0de5c3ff0686b8cce29e7cd9194e528ee5d33436bf04f2b93bdfc30a93978ac36032c519b2c8b42b7d00539490903927b3b7daecd99a3506bbe3cba921e004b415317f53906c8195c664bb66a4e63c9235cf020b2db0d1bd4adae127dd11b6740c0d331097f425aa7721d5f9021cd3fb491e1f860603d3458ed37f5b6e37d3fbfa1ad239f03fcc55f508930bc86a8577961f12e9aad22725edb773abff016d934ae1e7c09a28879a3541e6e013dab2cd5fff0bac2fe36cdb73e319f146cb1047efdd2092a55ab8f231def91423eda576b3f91f9f4e1d8c0ad658d5ed5f42e22ff2f36ce76c2acd3cd408507dbc19fa646e9fb105775061b27b923d2af9739abffb7b5804544fd3c5e0febeb80b92e524fe1889b66768be6c6f40c19acb3867b38abc263a2e786293e32e4d9c2da7f74fa70fcc01da2b8a008d4d5378a2441b4b63cda7fa2b329aa3bdbbe253e7970af7f7b214f20a379861a89cc402eb38d0594f0a9d912d972cf624244af2a801bea0fd5c255f0e7a8a6c06f63e249a594a576922e29c14f4b505af33827765b9f52008a3db7f8288b694d59126082ac390df3da42bc623d42f76bc696663cda553d8d54fdeb79dc6f3aefa3c9b5670ab6e5eb10e461baab4a582b1c8973f99b6ff756249aafd14ce008297ee18f704a8ab7d242109df1dea7adf5fe411a4d94b31d7d8e2d11c834602c2e2f8c39bb6d6f3d00c6303a226155a3be5939f77382757ec17e57eb15ae5e10703be8dfefbf473e41d20c95239849f425fd6a4b8c0067fed973d08b626951c01b48a4321d07dd4c38f8c66e225893e29f35bf515f2fa67c973e6c641311948c8ed550a9ca54f409bdf29d6fb7c4cafbdf9204ce137e3f9c0d65de170762d8ff91548d45eac0231dcd45f88d96321e1c11d877e278f0f2be6b52ba91238c2439dfaac2f713efee56185ed661e6ce02d5119537432d78cc69b2ca50d2356d66d262880d63fbef650ae15147a9d8410d20789dc5b352f95831e0056426a0cdecae6293ee9d226a04c2a5754547b64ac1f24c0c55b1cecf3aefd94d84bbf9e4e91ef37fc15c11370cf5256439d4569a5da73b0eaad044014fe96624f2f28c310a983d318614a83892d3d3b060b20e7f920d522816f5cbe325bc9de268169756428d88108ad00988dce8909faa01145dc7ae71219c505c2b55bfa36233be8dbf8ccb2f8386b6b833a907e29e61278f66d98e3e8e5776478c1ad1edf03920b6e68abe1f5db15dc7fe41729095f7c517a9fa6729cf830347b37ecada38dc7c9b91c8bd035599ce1df1c5feb749c8945b92ef4968e1fae135382f876587cfa881e762ae04d46089c1997129517ab84e533a81bd941fa3964e2036cdc93dabc29de4c6e6fbd19d8c5e4a669d5b72648bb08737361c58950e19b81d82500448bb2a6ff19bce073df46dc404d540d785b9feed5bfc7c1b31e9322cf5903e83f53594ef77ebc6762206f3a3c52031968bcd85db2868dcb79c3159b69d8056fad7f8b0e0da07045390df0e1f36032377cba9e0966fd0136699217ed1096d46124b7101b97ffe91045fede114989494275d2adffc560e23c695e46a9ab403f3e95340a9a7410793a61eb1b9c2ce2e9c57930b62f4f465c397fc94784dc73c53b6d370daaea7cf0241c016c07848b9e58568940501ff6ce0964ed2f063eba9adbc017af89c18c88db801d92abbd3bd78d52d5d11cb56914675c7e957c2fefbffe18ea0316ebfa2751498ec0bffc5bae7a82dc0b76025fd721762c075df0255975ca4edafc1256881141b61a99e83e890989bc7ccd12db4be20a371c006b234b0e6014924cb19afc56d0f3dec3df4bcd85165c8257e90a2affdd0e8509277e73004dcc760e79f2642eda2311faddb58116db45025ec473abd16e01026b7a6760679b9153112a04d369f7a908c00f5a31fdc48544bb04e902112c96da05af62b167941e9a7322c86865a859ad5a706fc47eba884fa22f80c01a00047e92343a4737739e092f33626fadb59597f589d97733bda1d520821a0334acb11fb59739bad0287d3bd105dfa75bab5083590f0b6cb405f5710d62d4f94e79491986a538ac34ed77c9af265cff98d38fc44b038ddfaa5a7a7bb529a1c5283145406b2466e7f24a6991d2cd8db83265087f538c6297a9fa4caa8d737750d7553d475054751df243fb5d85a6a3d6a7d43c628044786a11571d2f137e08e649ca646e5f2a743d89bbdba8e8cf93c0107f92d659b3b4685204c1e6755f3da920dab47742f684cd16ed54ca8286a5a73cf33bce82fbff41da28fb3530fb56ccaaed3754b8aaa28c97c3fdb3aa0873cbc38098d115d780de98498c36509615e39d8736a9efe8c19f1c8461e33f7e5b77f133be90c68e9c0985f05a56aa180bae76e7e559b520e58af96be7e91e8d355f6feea800245e33d54d39235c9fb103645a2a50de844f274ebb11e7e2bd05557507899dd34d19a42bea54d81e6b8d5f256fc5104c3160ab10e3f0f8d871ec37d545f7bddad61eeb1104590fc89ccb2be581116836d65ad083a96b726a055b79ff2f2574cebbd2b763197b087961320f99e8d41fbdd8ecf5526a8ea8d8bfb64fd91041bbd10a40820c88eb8f653c760f3293d1381f9337a388f173e0be89f4a59d49e4288f89fd82fa9e6b5b0329eb8e3f333a2dd6360e5372637c082623d8d7bdd3e64f9f1b59d1ed987710cf07eca62d751b3abec8eb25fd7f15d80e40b452efc18ba4c2d122ab5716ce85c09f7825dba6da155a19601049316d38d66940b708614274ea8067438b9b5d7642e977384dbe54fce48aa0fd12da048eaa03c8d1540421557277c1c802ba7f58bf5bf9508da978d184ef2ae2a8997c0d10ee3fdfb92b42f85dba947e2f9890b45061300f213150fd8a70c0cf16a57bbf4bef2cbab55e0f69486518700663646600e576c4ebbc48cfaca1e400fd969f5b5b744cdf29abe5ec58d3989665b3fe41e2e187e0e799d4ad23d29cc15a5f647eeae71b6aa607a6d56420d6328f4094d82afd4759939f83231bf47f6aa0133b1871316e190e95107650f2b4abaf519c4bf27ef91b517666c52f6ff7ca9cfe4c496f8ead9db6fdc71bbf94092ba7a50288f6bc1e0fdfc5690df07c2d227ab4883d5fbf150ae24151da786fc997eef2c232068c99ae4750e0a63aad18889f2f6a3c471aecb721f53752261b412190c37d3d98478dfb00bf46f09e400bf7b7641daf561fb21c79ef0b88089bdc4535eb86d1c192c17635ffa02b0aa038e681a15a7580d67114f7ffd8162f450ca12fcb3b8f2e0ebd07e2e6c1df0d3d0c17244892a159a2232922b099a923bf3ec7ea5be12da9c68584d22b0a8469b6e4c779c392ed81309dd69501c4df45cc89dc3ff9a79c119bd292eb3a2448d4a70d970e73051a28f6976bf9a048dc874b8ed0d433f06569fc5bab3b5548926fd7d90cf426f24d050fbacc5328cfb9cbde8ddcc1e9b467791f384fd2c42718c42cca74bb7c388b387d02ef764c26561861f7a9cf642b34b1991ef3ad7bf27108311522784214fe1dc524cbf413f3ecf300a19574b24eab575733f58b0c611c155e99845ab9ae10abb35088e4d6a6611122b66534a41bd211d959111f2a1c1baaf72de0edbc049e14021a7bce7d395f3133202bfbfd6d1d2c000bb61b60a43385b2d0a0b5c6dd6c77739212f920f9b9d08e9b6f3ec36ad192f07ca7bca8820a37c59c9668e43952fd8d51fa0e2b65048f408de2c3a548258114d38cd0e1959df4a43f435b1a1e752a608db95c024cf4c9278e0bccfa236cf47a3a9bed533e14d99689695b021dd2b505503d31ac6a8217c28e2039982a401d20e1323e5e0bb6643ec33c0051609b8b9c3396abbfe59792542d5123fa94014dca0acc7b8035b83fac1afeb7e12a260de0e52f57aa36e61767f4d0d7fe3a6d336042ad34bb11412c482cf3fcb49d1ff4eca66d56eb35c6e4e33ffe1bd475d96e60f5ba55bba6569fdd2089865caf5325939fbc1124266775fa0361d0f938a66c37a83a4479402cec2db57f644311b8622da55487296d8062131383d10eb1a081285f2ace2057ba4b8363da4fb41bab147a9de1f5f89478c510edb177c1e562f3c2d3a3862a697458fc97754751487157913a111ff744a1f6a033459088a50ee61e0ede15b39e5fcad14af5860ddf7fa0216fc4698277e9af1f32ec3fb193e90f6f892a4fcd333e22ca4499724864cea1a604180304bd6f872cb2b582c72c3f31d93e1b7da90fe9dd9f0f29a752a7480a1a82671b0617bb4191e4def1f242c4a6580f8a23f040bd5938ca071c536806c1cbf61acf9bc2f37ae8462f552f318366bbd206534141f1974d9e7103928f1e74bebd66ad5f271ae1fc9043f368b07d23ac5a206c3919068cd36c37cea76b42e7ee2706326cdb15a5c98e8a49650a3c2d1e7b50c6a95ea79e9ef62cac860a2ed54d5cf37418c3853473f424ae0ad7b3b0d4a8fdf9e838e65ca98f523889fb991dfc6d4ca8123c7dc65db9f3b578b6d55d4342792165f990fb9a6f5c9e3a2f0e9d536a9b735ec13227c9e9f758c76f7ce97503d1ec864c306d4101c800879e6ec0ca76e56c57330367ccf82c0852e6aad7fe15e70d7a24160f016e2f9bd554b1eaa048ac585fe00052aaf28a3991eae123e8488bed46c1d6fe325b26c96445216425590def606e0f55881be36a4b726a2a09830764c56fedc139a1f43d10c417cc47da19f2796d664ab9feb85b9c5d3f53325bb64116488f987f44bd3e1b51ec2e84f5221453db79581b6b0262def7ddbcf88607671bb3e921db900f1d86a35fec1931e5626db8871781ef4d2a9ca15e9b7fdc98a4c565bb24b4960ccbad76b5c4f7ba733b2f2c7f6f41e2c9846bccd94d5be13a2a77e02c5498ce62d16b4b9548e6de1cd6200e79120b8b104c6a09ac927e1e49a60a23542bc7cd9ee08207097dad239bc1807f4b283d666e822812568406edbc5b24ebb758a4abd9854ed3408d94504db53f343da87d3bccd91cb43cbb1a1b4019631528386a0345d2deea91d18d399598ee0e11ce95541afc2a6c1c4cf145fab8971ef5e08e15f2ba7df1b714644192316dff7c3bb6b660d3f978dc3387da4c24f6cceda599363b0799039ab2e53207513e4f551576b65856d23c5e3cb4be8677473bd9ffcf5a35fff6b7bfc54a48301ba732c28a4bde358b1f7586549035fb3e84b6d08faacbbe76bebd46dd756f82c1c96f33821be77f29331cc33a34275040e87e618a52e8ea5b21d64d77bcbaca1b607ed1c853d63eb16f9cd4ce180d764890005274ab732145728b68932701408781eca24ef9c3a9e3c8e343667e3118e9172791666cba19038f4af00f6f45edb5930935e18f71700cd14f7d5bdd1220140931753db96e0b1810ca5319e6e46c39694f30f12a496d1300ed4201c92b781b3d5a2449f28c2049b06e451b0e4e4a2f3d2d0c1c7af8717210922a55bd415d48f19acf11ef32898ad68180bfc92c0357da3802db29fab32560c08193218f77b25dbf18b6b7d5b77ee61535a21ecdf1486fe8876e35df42ff9ea16f2928c6a086c9ef1e022f7bfaca05416bb6a177ace900cb26a05d6527f2685d70ab6c4356b5e06979dd2310a7933041625518ad5c6fe3059e08b2613ea0c5d69605f27c54ed4e7833465431b3432d4a3e0b88480ab659b0e7e7b599e91f4e1cd79d08b7b0797b45bc9b04fc6dc8d61d2ea66e14c6f80f994e0fbc7af870f389d44113576ec838f07ad59743da7c915184f8b24957bce7908b0b7d710b4b0ba671721cb5e73c4a92f71553cc05802b9ef8dd5f3567aa8ad25cf693e2d91f9e93a99728b5e52ee88c372c3e51b3181c56752578a39bf6134a44315ef2a8d56a7f8a8f9dd88eee366076a1d9fb44bad005a2edb07a5473be1ecd0f26ae205d85d8731ecffa629ba6a88553d0c70ab280df4985d139f27f2cc491822422fa7e6c39f6474466792cfa0988c58484ca42ee02668307d6a3836e846bc843f6d75c375fe34b09989ad56ea30673ee557a083d02ccbdfaddd86fec5897f6be4172f04f9263972717d92b4557dd4486337355b6de340482c3a8fbf4e2b229d26ddfc57ac03d0d903913f73ba9cc6bf97955c46b7cd306cd8f5bec1b83a1962f91afad91419b52ec49d5376d129350af623d217fca931427c95f0c00784cd0e5a2cf3aa3b3bf3fd7bf073c228dd9473cbdbe068c8ab435f2cbed41b13723598b566bf434de772d39805ba0c7a527b2b54528faec56e658796db48a1d21dfd726d6b277f4aff37a78e69ef926446f847e59689df0a654b06bb280b3f6aaee376ff668a5f37f0e9820665b335241f0ada336d969af3c396b7affe951ac6e1f2a2a1f5822cb4d95b941b74af42e47be2f632a7601255fd6ba72787df14280725576eb3a02b92860e91e6872e5824bbf01c9cda22553e6c10d6f0cb559af5ac7d0283f0de2fbe9d982134991299cef36e0cb0a98bbd7a810f0a19395f8a50972b332791bd02e2100d185a15ae8328e69d77798448c511d9f0ffa9955fbbb233b799d9e130ba9b1d2522b086a1a21d01c29397b54d9192e15d903fd6956f5ddb360844e028fb65ab1acc8572276324a796c5db1a5302cffb788d57f27891731d54f30601ab1133fe9c98dc3afcb68ef0c871b4357da30cd9d6d63600d009e8d891f342d9d4903dce8fa4641c6ff22ee52c144d841c13978a47dc1c1b6a477ffe83c0f0162d6c0f56e9988e3d9bda763864d0b2b4a1720150c1a4f3151b62b54848746cad53f0b1ef97f44666228b5102c4264a3be026d7b1b8c250d94407a1efab0181d849b61c824cbe8dfad3c1cb627600d18a2d442516b74ef26610ec32f1e6552bf1b5b383c2bbe68cdeb890c94c88fbb43c081ce6b70f0d8e91e29bb7642394a666557e701cc9ce0f58012c830bce8e7241a95e2e74483d4590959dbac0fb1df14e8f922df2cce53d96657b230b5eef4ef9cc5ecf8ef60fd92983cbbb9af741ea2658f65d08504bb4649c155f58ed2a329e4eecbef37905fbdc289fbc540eb0fb1d3d314c2b5f07bf32ec9fa4be26752cc46cf27cb315785b61077f90d560d1811f82b64b5e3c782dda1c8d1fa2c725576df6efd1c3f22529d6fa4bfc0d3556e15999e93e4af7acf0307c17bc2bf5ba8c28ebacf655fc232321e05ffe97c5ae57f5a1a81dc7edf7f27dd2150e9ab6693bff61063b0151742ca3b1222352573f758c32877fd936abf0f6be87e3d33d21d05f569d4fcae05097b6c307d82c7b79120c896d955d236cc48614c64903f68982c8509bf4f0ae1802cff8ffded50a71dd3a951def512b56d2766094d01ab008b531ebb5a62b9af6472c92281ba2f7adcf4cd13d5377c29901fac552744be4893b218a32ed108b0a19a9876204547fc6970acd0a68f1402480649c11847d182914b1c614d63edf2f91a778fe95f29854588b28f313c1a0a836b5a9568a527e3bc620cec0451c6eeb525e6fe2b20647954559254df4c19a4c24e728370c289692080dde506377a4bee4994bb4fba42872bbfc10f376172cd0d75e4373be796b32f6b54232224ff7813da9d5748800f738dfb3160eceb47829bc4fe1e6d29088324c667c0ab468f76c1409c2497895e29cfecccdee84175bd88b256246527f4d712a265251f69b296a9e135bbcbf1d5c778adfec68e52d7a7ec734f9d1e23a71872e0d2652a58a4858067ce642b98de8d6241b2e1e82ea7af328629c8c8aac5335450bef879716affd16a84bce727e5fe89feecb3c42be886d08a49f3f0e298e5c1d08198d1938a5389fd7937643c5342b027346e19df0b60125d55d19cba489fc66ec8ed14d9fd8b224634a5374cc0a215a124b3e82c1ad250936f29eb82dae94c60cb3b211afd3daa2b94682c28574811b5eeda9733d9fd0012f55b747a79aaea1a60549161ab27ba1fcfe2ddadc680ddfd78ae608e9e85a7ec67ea9cf69e2404a0c0db7a12f1208599f9ff7d95dc5d9bd0c7cfa79e54edb6933ebd8a564158c771ea195b847b4b0e69ad777920fe8849f5bb2485d96d7cbcbe6ac4a3a001ce0ce71e0e76042ddfa20324c96395438c69c7d91ca1bdd6c01a411c209f5c416ff5fc51527c77809912cb63e748eae94607022b4130870b96cae58034016238a0d91a75674b096a577edb8a551bd210ea24b0b7b00aa382fc5e3452098f4962f0b0fd678c6caa48235374fde1198fd9f2aa27435a2fc12e8de948c5118d0ba8ad3b338ed87c435a32c2379769665b50e9e58145baa4fdda89dfed5cad5e9ba4e0c335149ff059145125d9cebf9b399301854ecb276fdcdb4669fba2fc28b91d9000bc127d6b9fa6b85c36ed4caa954ce39543b1c5e802cd439e99516ef2393833496e82cf41933bb9d5330c1b4c76e91b8073e19943e695b95f7aa27361fbfadf03d15782e99c18d77416c3a97e82dbddef95be6cbff5bc2bb79f20dedb68a03ee551823496e7a59314f971d44627d0bf385ac88c8433d2b1b603b85a28c9e296df917f18b60d9206efbab34211d79fce3783a3d9b9df0753e8bb5bf51e6e3a67075a808ecf46dd22744ede4b3552896ea4bc6d69db66831faf5c58b3d8fe041b79f957f92b5d18f25b4e7431c6cf4bdd29cdaf36f2e1c4cb27306b9d8c1fa57e87946745dd35a9556a82a63052a58dfec516aa684322ca57cc7f2d28f558895bad7802b3f4a2dee1bb8d456a78ad2fa7d4c458215810500ab84b2eb1b1dbbfa938fd0fa8af80344a11e2addb2d0e77d880ebf47a99cb594d88c6f60460df10a1fc105574adbbe898c986330c40d7a8c3b70ac5d96df636a5377ee89be07cc9c4c3e3156d6357f99e2c8ec53821d0172e7a8a86e979ae85b3ca46cba95cbc462b7731e74b1ece3c322e590b3a1fd8",
      "hex": 1,
      "decrypted": "edf084a7b7b777fb691057bb1f9f7fdbff7df1eb7effeefddf76bb57776fdf3edcdeecffbcfcedeeedddebbb77bfbfdcff7277fff6b2fd62f7e6feeee1ddeef5f57fae7fbf7bf7b6f5ffd5eb9bf7af1edebfbfb9bbfd72eaf0bb177586ac4deca716016fb87c1c807fdcbc79b8bf9eeb4fd8cd95270a3faefdc3f51ffb6feefe38546fdb6315e2c3c34e8538fe6a8853be6c8c1c425caa5f9e8ab09d19e1397cd7f7ef1f0b31612c7620fe1846ff6c18eb0761cc9f09638975183fb553edafeed4ac7ad9b2700e634a97fd2479348e7a661cdfdcec7f7df8790ada77531c9fcd71dc1dc23a4772b0363b4d73aaf5d9d93cbba7f7fb9b5f5ebeda13928f22a29de08fdb3c9b2b8bad6bd7d3b5c775ed72b2b6c6ba763e59db645d3b4ed77e64967eb2b63f324b3b5dfb9159eac9da9157b5fd74df793d129793b54b5ad5b6d36b59d631b1d3ab537d5dfb74bcc7f5ead8e9598e764eed768aadabcb27aaebf6ea4fdb7da71c52a6b7cc536d59c7f003837a933c1e9b94ad4d2a4d44b63629c726baa5c98bd6645aa2de361f946c624abfde6547cdcf75d31fb7caccb9fd6311ec4f4d3c55282885f9d0ebbdd68d933828d01a1ff0e8854a615ca635f6efe38c69e96a939693844ce3605ac1b482691d6af7821f07a4fdf2ece339035ad930b73f3120e7a9ee14586f27664eccbc1e23afe3c6c81bbd18bd18913fc0d2fb252a4e545c8f4fb2b4f1494a774677467746908de91ad3b53846bb55d7b2dc053644db56eacced4f445b199932326564cac89491290ba184904b4d7f72de1815e149c2938427094f129e243c49582c61b1644993b692edfb744e9c56e7dbdcfe449c12714a8c3e31fac4e813a34f8c3e31fac4e813a34fe33172be11be3cce83c8a350500a46c12904854ca150a8149610f61760b99e93d8be02746eff780873e1a9654e8b5c994f653e95f954e653994f653e95f954e65317057ca3bf39d34ba697ccf832e32b8caf30bec2f80ae32b8caf30be42cf65490edf88530eba0bbae3a0c81c149983220703e56cca9c4d99b32967069ae9392fbe34fc5b2f76c6a2c7eade914fde22fb7cf0333b03c2f78cef19df33be677ccfce549da9725e65ceab1c8bcc111bc3acf40bd119a233446788ce109d213a1b23e62cc99c2599b3247396644f4bbc737f643927de75156f2d9f8837946628cd509aa134436986d22c8c95e320731c648e83cc7190390e32c741d67c5c812cdb5620461e89ac195933b26664cdc89a9135236b46d68cac39d1b3d033274e163d2e457f6730c6738ed6bc7ab130b77f7c2902c202c202c202c202c2a2560af3e803ec03ec03ec03ec03ec03ec03ec635cf0c965e39a60626062606260626062606260626062606260626062147ae634084e83e034084e83a84b66e78dae07620462046204620437dce0861bb01bb01bb01bb01bb01bb01bb01bb01bb01bb01bb01b1fb0db82d9c6770e036575ab9fdb9fd87bb016b016b016b016b016b016b016b016b016b016b0165c9103e203e203e203e203e2c3172a8a6f5c52f238c8e3e0e6187017701770177017701770177017701770177017701770177017dc7e43e9992b7a5bdbfef675a473ee51ebb72ce6f68fafad23842384238423842384238423842384731d74ae838ec981c981c981c981c981c981c981c981c991968b59ddf8a2c921c721c721c721c721c721c721c721c721c721c721c721c721c721c7b9803a7a3b7a3b7a3b7a3b7afb0717d0baf10074ee388e588e588e588e588e588e588e588e588e588e588e588e588e588e588e588e588e58cefb2cceb9e0793954eac6172d4eb638d9e25cbe1ca51ca51ca51ca51ca51ca51ca51ca51ca51ca51ca51ca51ca51ca51ca51ca51ca5dc973796da3e68033de71d98ba7a5d34b73f91cf249293484e223989e45c6e9ccb8d83a283a283a283a283a283a283a283a283a283a283a283a283a283a2ab2f1b61e3c96c6494915146461919656494711f32b433b433b433b433b433b433b433b433b433b433b473b473b473b4f364cb46e81f34573d6323acdf2f9edb3fbe118c9c3472d2c84923278d9c3472d2b8ab19701a701a701a701a701a701a701a701a701a701a701a701a70da01ce69238c1bcf7323278d9c3472d2c84923278d9c345e1c1a701a701a701a701a701a701a701a701a701a701a701a701a705a4ecb3c37bec83432cac82823a38c8c3232cab86618d70c034e034e034e034e034e034e034e034e034e034e034e034e034eb3e51da1fe51bbc939af90c6d58bd5b9fde31b5ec9492527959c3472d2c84923278d1b8801a701a701a701a701a701a701a701a701a701a701a701a701a7c9f1086c01d9b611948c52324ac92825a3948c52ae22ca55448153815381538153815381538153815381538153815381538153c7e311a82df26da0671c819a562f95e7f627360239a9e4a492934a4e2a39a9e4a4729951e054e054e054e054e054e054e054e054e054e054e054e054e0d4e24b80fadf259df3369aa6d5dbcffaa9b7d194ac56b25ac96a25ab95ac56b25ac96ae53aa4d0abd0abd0abd0abd0abd0abd0abd0abd0abd0abd0abd0abcbfb72baf5a33d2527959c547252c9492527959c542e33ca6546a157a157a157a157a157a157a157a157a157a157a157a1574d8e1ba17f0aa9e77c0ea1eb4f21f5539f4308592d64b590d542560b592d64b590d5c27548a057a057a057a157a157a157a157a157a157a157a157a157978f3a74ebc7a3424e0a3929e4a49093424e0a39295c6684cb8c40af40af40af40af40af40af40af40af40af40af40af40af2caf025b3437ce938c12324ac82821a3848c122e33c2654680538053805380538053805380538053805380538053805380538eaf025ff4f46a23ce676c785d7d8030b73fb1e1c9492127859c147252c849212785eb9000a700a700a700a700a700a700a700a700a700a700a700a700a7781c37826ebc2c0a19256494905142460919255c6684cb8c00a700a700a700a700a700a700a700a700a700a700a700a700a7e872046aff23dd74ce11a8abcbe2dcfef18d90c8c9444e2672329193899c4ce464e23a948033016702ce049c0938137026e04cc09980330167024e014e014e49cb11681b2f8b899c4ce4642227133999c8c9444e262e330938137026e04cc0998033016702ce049c0938137026e04cc0998033d5e508b4fe97b4f99c23d0d67f8495d3e93f654af34b8aa7bfefbff8efff2ef4224dff868be71777172f2f5e5fbc6d5fdf5d0c5f4e7d7ff6a38fff0b3000171d26e80d0a656e6473747265616d0d656e646f626a0d3135312030206f626a0d3c3c2f457874656e647320313335203020522f46696c7465722f466c6174654465636f64652f4669727374203938392f4c656e67746820313039362f4e203130302f547970652f4f626a53746d3e3e73747265616d0d0a68deec57d16a25370cfd157fc15ccb926d19968586165ab6d0b0e95bd887ec2694d2348192c2f6ef7ba4b94a0c4dee0cf4a594fb76aee71c1d5992c7734b264d39954c2351ae0025a7aab65228b5a1064aea4d0c70d2360c481a44066a1a950db43486cb3be27037a440dde9884dc5f89c819a0998121537e402d4fc2927e2ec4f05a89a966b22c9feb401892584f024c3726478547763785477137834e403048fd64c21f0e8646e028f5e4d21f0d06cfb1278a8b8021eaaae80c760f380258d5e0c59783245b507d514d552f332555090aa216c81d43c2ac8855d01f3a2749471710528dc2dab8a9f52ccc3362d5ee4865095ccc38a53bd6a0d94964d6b3f9b97de5ab336aa2154175f83acfb3e1a3c947d0d3fb5fb1ac28f626b1d1ec32bd42971265f2b40d5d73831793fba0079ed912ea330865ae2c2bed681d4d734f1ba37b482b9db1a8689856c0ddb67f17d283caaef0332ae5e498547f37e283c9a95332b3c7ab69aa29cdc3d036c8bfb70053c544c8161601da618f018de05fce4e13540ba62e3032440ea8a9a84d8150dc8277ef48426e8da5029dd15230963de0b210d619b03c2388ae09c001520ab9f9549bc5b842d8877cbce9378b728c3c3bb851301347c0d1ede2dcaf0f06e11c1c3bb45385ee2ddc2c949e2dd22b447bc5b8421acde2dc25057ef16ce55aade2da20e845abd7b77b8b878fc7a8df3b3546c9d072f8283374a5dccbee6be54914f87ef1e6e7f78b8bd7b78427f16d4b11c7e3afc78f3d7e39f4f87cbfb9b2f77bfe3d1e1e2fef1cb6f87aba79b3f9e8ee463dcf7ef61f4e1da5f1d397dc469c14159415d57706a7aac5080128003d4002d801e418bc82de42de418ff2308790baf16f21ef21ef21ef21ef21ef21ef21e720db9865c43ae21d7906bc8f5591ed5181167847cc4de47c847ec7d449c318e35cc51cc5c0248801aa007d00021270a10720a39b9fcd3e1d24e82c1c3d5e1eafed7db3b6fed37eb6560cb1fae71f6234e8938850344c012f9941620122b91581961eab7cfeafaf3cde7fbd5d527f7388ea9f242382aa3b4c56e0e9cdca5b5fee9cd317d1e49898c243292c8482223898c244af53cb6ebb4ae39aed37db8fc25ad136bd97e7c312abb99792f937537b3ed66ca6ee6ee1df1fe1dcdf51cff647e7b64e21512e32f5311f895e0775f9f30292f0e3c39e84987387232156fddf469873a39f4930e53add7ba9f0edca7c0ed64e06993dcb6034f276d3d996f069e7aceba1958e676cac9c01353b6bb386f707dbbbc19789a3dd96e5e9d4bf10afdfb17a6ee66f6ddccb69b5977336537937733cb3e262e83a99eebcbf244f9419f8a5af3367daaac8c6dfa545ed16dfa5463e9dbf4a9d0d2b6e953b5a56ed3a792cbf6bb82a6add2e9e87e916aaf0b5e565d177c69e0bfdb82af1c1d4b192f77e8997c269fc9ff1972ab8ba6a64baff8b7380a2db8609517d55ccefc33ffccffdff0fd3e9fbe16a86cdfe73d2332d9bb045f2e8abfc3f854525d6a7f2d9733f94cfe57e4bf051800d7538d040d0a656e6473747265616d0d656e646f626a0d3135322030206f626a0d3c3c2f457874656e647320313335203020522f46696c7465722f466c6174654465636f64652f4669727374203937342f4c656e677468203638302f4e203130302f547970652f4f626a53746d3e3e73747265616d0d0a68deec58bb6e54410cfd157fc1ac67fc1c29a2480b1211d045292810659a2085bfe7d88b0442912891c23477cffa1efb786ccfbdb3bbe64c625a736e52c3e762daf57d4d9ad2864533db22b4565b9456b4c548665b9cc4a54090ce5920116e17d8641c00c264566499e45c6459e4566411f25d64510a6db251ec263ba5363928779393b63479d3ce222bd3e4ce55913467d11559971290004539a81256d31e0614ede158e66a8f00ea65691222f5dd0de465336818970d194fb3b641c33a4b83866bdba0e1d9366884b40d1ad16a068d5c6d83467adba0b167d920347797c8913873db165037a6eacbdd1ad76b8580ead2cd714773ba3b8e055edbe349ebda1fc7f2a5ddea86ce5a6f40432bfc0c5cacbb16b861bdde00d9b9aa56893bd205f2ea7bd52f70092c0b0837b2eb52254ed39f09edee7022e8b6d2c845c25c1a688f70d72f15a8fb9e35485a1a89499abb34d05a41828512a8eb9c9b44b4345008915d91311430553c7c15cd8ab2a16152be1b1a96ed6135a3ed51d3da558390c46a0f6844b40734b2461c1d00aae22c240e312e048d5d855d58a0f2acb2b302797b588d7f7b3890b707b6c4e2f6c09e58d61ed86cc2e581c6ab5485b00381aa1ad833a45a2b47978176edbb090dab556260806aeed15652978e020d47b16f6e2eb7b78fcff7c139d0dfc881a9ce29a3764f0e8b87cbfbcbbbcfdf1fbf3dbd7973c82f91ddf7607278186622cd06c6256564f23afcc33ffc57c37f7b8f073be3f4f3e1e172572fdc5df872f795f03e2ff4f1f2e9cbf313a2fe0aaf7e7d96c4c0f31f2fff817773c6f0f9522e877cc887fc8fc9ec030743b8b0e081e0e603c7ad5c30b21c87e3701cfe07073c2b947c0dfcdc56020de781491e43f5f00ffff05f0dbf0ef5ecbf1deaedef87fa40a0153497d58922d71a5cff7eea982fff9f70e87fd07f08300097f249860d0a656e6473747265616d0d656e646f626a0d3135332030206f626a0d3c3c2f457874656e647320313335203020522f46696c7465722f466c6174654465636f64652f4669727374203937342f4c656e677468203636302f4e203130302f547970652f4f626a53746d3e3e73747265616d0d0a68deec96bb6e163110855f659ec0ebb9d96329a2480b1211d045292810659a2085b7e71cd3a488448712c94d76367be67c33befd36d3922e66ba24269ed665059f2a1acac044ab18b89827037c2f6390e2b6180cf139184c09eacc0a76f4c5f7541a7b971c747695a174769391747697d9e9ec2133e90cce5c74f6211574f629b5e8ec8502e9ec4b56d1196fda9dd628587bd13b50b51acdc3114dba4788b21d448968d01fdeea4a00ba571f2444b1752262214a32128cec6424189964a052cd45468231828c04632c32128ce9642418b3c88095969381be31aa642418cbc81860ac49c6807d373206acfa2083a5a992c151547eb0c1d74ec6187f418860e59d0ca67992c1567d91c139892063c23e16191356e9644ca465d194650c2783433726199ce169644c584d8a6d16d702199414e1c6b69692c1a9586c86ebc57b27a31c51925121ae9d0c205d830c0c93eb220353eb9c3c44c56546462d717732f0ea5e64a0050f2703c3eec1820c0bc5d3c8c05af66483b6c0184a06ec7dec01c390f85432308d3e737f05a3b81a512f22ceb477306aed810563b12a0eb1afe2c0625944f79d91886a670c09b59d812da17367604f709f21c266db9387fe05c533037fc2b9d65c4d2238838ed23059ccc07022d8196064ec0c30b276061803ebeae6e6babd7d7cbe9f6336c0d5b2c1a7cc1a3a508fa6f3e1fa7c7dfafefbf1d7d3870f477ee4ff4b8e2fd82738891b76636536ec42b585c7911ff991bf4bf9c77bebd8fd5dbe3c5c77b8a8e0d711f175f75372fff7fa7a7dfbf1fc04d317eeb0e50f1e1f4be6d4b62f08a3e5eb07c7911ff991bf75f93e09f4c549d0ff7d12d48c868b3baf10b8652fedad7885c856f95a31477ee447fe4ee4235af10ab15ac8b2deaca0ee2de2a88ffaa8dfb6fa8f0003009f8639a00d0a656e6473747265616d0d656e646f626a0d3135342030206f626a0d3c3c2f457874656e647320313335203020522f46696c7465722f466c6174654465636f64652f4669727374203937342f4c656e677468203634392f4e203130302f547970652f4f626a53746d3e3e73747265616d0d0a68deec57316e1c310cfc8a5ea01545521401c385db04b091a4335ca40852ba7100e7f799911a1701d20538402ef666bdc3198aa3dddbeb2ab3b4d255b258e0b3b792c64f296242d08bcc49a0383801aecf4ee0457b128ca23108a2d8e2f50939eae2ba0b85b5151f54562943a8acbd0ca7b26a894665b5124e65f8445259479946658d3293ca3ad12095354b4e2ae34c9a521a0d4b9bbc68e85a3a0b4d8182a26645bad0d01c6835036d51591501e4ab6262e96d552490b1c2e1616b300e0f5f0da053f1c90a87c75056383c46ac0a78445f15f088350c87c79455018f3956053cb2b162c0239d1503e3698d15a4b415ccc0e2dbea808def6c0686b6c31910dde90c90773c63eef903f1b002621b3ba180c08e88c3d919052eec9002879d524074c744819d5380bc83e252775281c38e8a01ecac260476586c68a735b5e84e6b1a10293ab191a4d303e354a1a5828cbd470f2c103b8c1e330bb60f3db20171249a52903b3db203393d608ec4e8818121097a243c3ce991f018468f84c7487ae002564f0f2c06ab8287210074ab44f0985c16b7057c82081ec931198cf07f8e13c3b1c6b1e3584cc489704b086334846c889008375be75e63e38671100990d3433a50d243b418fe88e061490f889a2b3d3008f3490f8467dc7f7777d7a767c9e42dfde5e57ac27e820ef0f5f4b36093127dbdbefd787f7b787dbfbf07fd01e0d923abf296b08a14c7f4cabb5fbd8abe5c8fd7e7efbf5f7fbd1dfaa11ffacdd1352abe5664563c46a26be5975bcf9ae3b00ffbb06f853d2ade8244a4e2a5297bdb6751a51ffaa11ffa4dd2d7abba7d7855d77fbfaacfb08a1fd01250d79202759ccd5e25fed6cca11ffaa1df087d189f1832bc465f0f8e8e07478c1ae3d00ffd3fd2ff0830009e173c200d0a656e6473747265616d0d656e646f626a0d3135352030206f626a0d3c3c2f457874656e647320313335203020522f46696c7465722f466c6174654465636f64652f4669727374203937342f4c656e677468203735302f4e203130302f547970652f4f626a53746d3e3e73747265616d0d0a68deec98cd6a154110855fa59fa0a7abebb7415c045c8882c1b8932c820617c604e40af1ed3d67226623bad04d6036999acce9f35577553733779a541b6d9aac6689eb1c6d19afd2c484c16c52c540db546780e7351978d3b91844d30c06d9769dcd821d7df1dc85c63a9a079d555a089d75b6703aabb61c74566be9740627179d355a199d355b2d3a6b21413aeb6aabe88c3b194a6b242ca3e86dc85a26cd4d1125ddcd9acc497b7344417f788b0a0198bd689060c5a913610b9193e160f820c3c1702703998a2f321c8c30321c8c58643818a96438185964c04a4ac9c0bcb1aa6438186b921160ac2423603f261901ab116430351132b88ac20716b89d838c80fd743202563ac8e030753238555d64ec35313292f68b7f1256ae6424867991c13442c9e0d24592c10ae724236195145b167b81a69414e1c6692d2183a5589c8ca15f740c324a113919654d659001a48a918165525964a0b48a22332ab61919b59aaa92815bd5d28729a8ed5d8865d73d5d43a3a8efeb875e56dfb35a6084ec23c008df4780f1d07928a3e65e55b49d26d7ca0718c50c7c80518023026371173896581727c8b6b031f7118e685fc411cd44f611d81212fb08ec8929fb086c36652d1d6d861e6701f0009dcc113211b1968e748d204460386be918869e210d6d8b5e3046600416e2d9b3edececeefe7d85f562277a4771d71c1d5b41327ac6e5f6667b7df5fdeedbe9f9f343fe07f9abf7b2b0a4a3bdbddcceb131d17188b7f34f0dbb9dd1c5f6eefafe04d347f74ceb38fe24a5a3bf4abca331a5a4c7fa5d3287fc901ff2272257eb830747741cb9e58613e30fe7cc213fe487fce9c8f12e255e1daf9a7c27c005eff3f8e7213fe487fce9ca6315f7fe94c903216b757c42cdd9f5501fea43fd1fd555d1055fc606d958d89a63f488c55fe67acdcbedc5edc797b71faf6f4fcd57571deb97c7767e73f5e1fa0b1e6d6737771f3e6f17a7abafa79fe29fb6bfbec82b1ebfc8cbfffe455e0393589844f6c856b6bfe5cf993df3b7b338e4ff26ff21c000d8cf521d0d0a656e6473747265616d0d656e646f626a0d3135362030206f626a0d3c3c2f457874656e647320313335203020522f46696c7465722f466c6174654465636f64652f4669727374203937352f4c656e677468203934382f4e203130302f547970652f4f626a53746d3e3e73747265616d0d0a68deec584d6b65370cfd2bfe03e36759b23e609845a08bd24243a7bb218b3013bae8348192c2f4dff71ce7912690a1afd04d98b7794ff75ad239d6952cdb7349b6d1e6926a16f89fa395f15f9a9850984d3229689bba28603c2785d57416056f1a4e219a516fcd843bfac5f8da433a9aef2195e67b48670b21a66a0b27a85a4b212870721154bdd520a846ab4550cd564550ad26c3e8da06a4a26f3016313a37d096a477d32653e9de0c52d2bfad263a090007a241044c5fec61349bac875160ac3dba80e193041630dcc9007c24840c1630c2c9600123850c16307291c102460d32c0a3d42206662755c45870358c180eb351c470a88812c3f128490cba9f4a0cc66a26311c663a89e15031ddb678b4d8b6f9f06d20f13168cbc8fba46d00c3a9bc02662176540982afe0471e74c0e9e7223f7ec71ac40898956da750a9220620751831404d471103e1548497d28494c44845d6246df1a8ba532a9149ba638fa9aaed19e1e3a96dce483f65824202c69ef4827bf59d2b050cdf7146e834062d900c1a9b1f9259a3b6053072a734e86aeedc2860d48e293e850de57c915c364068fa18cd8431f521901853c7f46d32a60e2010554ad6107a0616a96aca98faf066c698fa404d1863ea08a72dc6d407309820d3912a46a7939331276717603863ea028c1cb4852b4bdbef8091b5df01a374bf0346217e6fdf1e2e2eeebe7cc097eba42bd1c1266d75d6e98c1e7175f8e9f0e3f55f777fdebf7b77567f55eab1561f5810de88f7e292115e9d1528f80f5d5787ef6e3f7d7ffbe9e6f69e0b4e47a23e7a395c7ebefe78f33b860e179fef3efe76787f7ffdc7fd51f9e8f80952c131124ba423ff735967edcfd9d55f2476563fab7f43ead802a152b5bdb1ec99a848ec4a7a0e36f2d125f56921da942e25a715e2d1f146fae183147ae5683f5f1d2e51cfe8a0900f97bf026d4bef0fbfdc7cb9079f7f88f9cc8e7ec30505fd12bb94cee68b0565e94bf338ab9fd5bf25751bd107764d3e6185c65b73f4e47374cb7856b65a2c643fad6c8f7e9ff01a0a8fe0353bce115edab9c7feea7a72563fabbf6af5c8ec8513956b179c465aa20f06af10d2ba573edb98aeea33eac48de983dfe7bc78e219abe374cb468d23968c5e5f9dc559fbacfdff6a67a2dbb07be0d436a6b58410337867d44d9e7511349a196aa725fbd1efe3e60f108f9bbfc87fdffc05bb20ef05403f5a8474de62847697176bf6ac7e56ff8fea8ef349a02128ce49bca47445c5f0060f6e26abe5c9060aaaeaebb4d43ffa7d028403192f10f19be8026819bc4aab6e2fb27a45ca7f0b3000b71caa9f0d0a656e6473747265616d0d656e646f626a0d3135372030206f626a0d3c3c2f457874656e647320313335203020522f46696c7465722f466c6174654465636f64652f4669727374203937352f4c656e67746820313032382f4e203130302f547970652f4f626a53746d3e3e73747265616d0d0a68deec584d6b24470cfd2bf50baa4b25955405cb1e0c39840462b2b92d3e985d9343363684096cfe7dded30cf638d864480e9b2c7de951d7e8aba45752a9bbcb2cad7497556ce0b7b7b2f8dea588e6422f3273454befb962a547ae8ca2922b5ed473258ab992986548aeac324680d056bc1909293e84442fbe26092d91c6d54aac4e6294a98b8497399d4494a5d4acb3acf407ff4beb546d0d5450b7c16b090a1adcee9d92a6a082a266d853a72cac897aca7a1193940d504ec76c16198d9e196c8c41d7066c78a36ff05df80728d8f0451b431924ca0ed898465988c95c290b1bcb521636d64c59b0344d59bcb649ff184251fa473724e89f43ac33e2ceb8f6a00dc7ab0a6d38d42b1fee506599156e6b645a1c2c23f3e234d9b8962c838f5495fe056c84e51a6cc4cc35d898e94be07546aec1c6caf8d1b5957663166da914615711ee08e951a1e33ea520e0f474765083fbc056551b25a681b294009234338f64ab694a04a89912b031d217844e3d610090aa270e166c44e2000a3412070b3666cf0dc2c66420b8555d1917a44c57fab780d7d6181c00d1daa02f0b27411a030127adb72025a046e2be1753663ac062ca4c07606dca4806426cc64c477350cc7440810d663a10081b33352f9e13781f3824163c6821b01193b2021bb35356606332ec0188dae2110c6cc156a4ac97d184fee1311a60f1e6cd7675f5f0f93d3651c131f09c25e6aa89a055ed66fb61fbfef68f87df0f6fdfeeccff9a1979ad0b0916910ae0e170d489aca006551937db37f71fbfbdff78777f00deaa4cf54715dbf5a7db0f77bfe2afedead3c3875fb67787dbdf0e27e693d634f3dd7b5900402b3fde6cd7281e3888a0b7eb9fc195d4bbeda7bbcf073873b6851e350b8a55200665a02610adaabeb8e39d7d679f13904509175330a2ebaea8acaa685715c5ec1ccbde2bfaa95d86e593de33bf9ae6913a1e3054ea9add12e7c35fdcc6cefe15b2b3ae1a9a1beb267b63a0e80a3bad4a5db2ced1865b1700a997a1eda4f7a972ea59e5ec7f5f396703daf3fa58713d9a366a3f1e9a292f1e9a9dfd2b64476dabcd3903a06662fc79ecea594afb3f6eeb27bd6786807a5e39618773ce18b5bd7ed5d899fff7cc404b63d18b5e312f60e6656be5e0d2d122e31c571d75b15f5cf48e7a9f17630e1c03c5b5c32bab9c1887d7f95ae9deb9ffabdc98626b04bfc100699886a7f6aa18120d17b9f56cc4105cf87c5e782b3b6a7dec93be9efaa4cf0b260c5bd5319f4bab00709803c09cf4f1f3e29677f62fc4ae35bf52a1e28cc1ef6e805e7e70c115fed92d4b9b83f3c23bfd49ed39a47bc590aac74be06968563100fce513b0b37f1976a49fdf90daa8fceecbda638007bb4debcf1a908065d885d5e4a4f7a99a9c7daff071f1ad5bdbe2c47aba9fbd8eea9dfdafec7f0a30002959c9e80d0a656e6473747265616d0d656e646f626a0d3135382030206f626a0d3c3c2f457874656e647320313335203020522f46696c7465722f466c6174654465636f64652f4669727374203937392f4c656e67746820313935352f4e203130302f547970652f4f626a53746d3e3e73747265616d0d0a68deec595b6f64350c9e9f924778c924b193381242da1517219058b1bc957da8baa55a51da55994af0e781cf3ec7d333da697b40542a02edce8c678e2fb1fdc5b1d3d2b384144acf2370c7674921d7a2440e798812f8c6ac04853294b770206a4ad44062cc2d7031e60e35c62ca1765338422bfa0ba5d07a562207b50aa284deaa121424ab1ee220752851c3486a027672ca26d64155939390412a3540d97219ebce4345190b2facb25c400d528a4226f3069e646695c55be661b2b051c96461a38ac9c2462393850d35597a858d2e2a5b61434865613c4b57d90a1ba3a86c858dd155b6823975fb0d6fb9d86f884aee1a477506a45250509a46a9e10135d5d7e03467956d9a81a6b2fa56b3ca2a73cbba168d605396de9439992c944a367db031b2fd360225cb048c1302a3540e54cccb5e0271358a400d5d151249d522d991e83ad41a9ca1c61a0d6497c4ac75016569432068ca9ba4c04997d12507ceb616400528318a029301065f99ba513530dbaa900066512f0570aaa4d91701d5750502a456cb25c008367d3a60432c4248689d228ec4d76299191c2a1b4ee1426d96c1d1804fd2b5c0d5aa0b0205cc4e590590ead0b8484aa0548b1a6a0988075540299425516879a21830cfc657415902108846d9247a683c3d15509a140d5dabd912859d51357902a037db24ba1d5a37890c1bfb8436317d786b637a0a1b43632550d53322f4c927db972faf7f3d81a9a8f94823c23be11a115c2a29e6fe66fbedf69bd3dfae6f779f7eeaecd84b31abca3c620550b103a2ae42e581b437dbcfafde7e75f5f6fc6a07961cb3c85ec9f6d5e5e9d9f9cf78b47d79797df6d3f6f5eef4663733cf7a1786060c004589224027b5468523c7de8e2eeb7fee0fb81b5324ad614815205129269a129d499689a2d4e268795da266ad66e6eb933cb09d52f8eecdf6158a19ca0be8edab8b50edd7edebedf7e7bfeeb098bb5555206c4ccb40f5ae52222a2761896d1c73e23fc42e2547d11a472d369461d498c87a528c1cb98f65c672e9b1765e97b159ef625d30d02718a1d057a84799531c1539eac67f87bd81cf0e978a9023755239563d892b76483ad834e82c2233addc3493dec375899eb93de662667052e3dcc5c77d6efc5bd9db4891adafd1dd30424f39122a05e373d001ac4b95d868e58931ebdd17227416fb4254e5f142849e200e6d5824a275a852235a296a12391f73e359b1ef4b85e0b3ee2b0559e5f8470a8545b42f22da1e8f28fae738b5803869027abb",
      "decryptedhex": 1,
      "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
      "amountA": "0.00000201",
      "amountB": "0.00000000",
      "priority": 0,
      "recvtime": 1583133132,
      "cancelled": 0
    },

    ... (omitted 204 other JSON for brevity)
  ],
  "tagA": "roadmap2020.pdf",
  "tagB": "data",
  "pubkey": "",
  "n": 205
}
```

</collapse-text>

The value of the key named `"matches"` is a JSON array. The length of the array is `205`, same as the number of fragments as indicated by the previous datablobs (file info datablob and the locators datablob). In it, we can see a datablob that contains data from the published file. In the JSON that represents the datablob, we can see that `tagA` is the file name and `tagB` is the word `data`, which we filtered for. The rest of the relevant keys are as follows

- `"pubkey"` set to `"01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063"`; it is the `DEX_pubkey` of the publisher
- the value of the key named `"decrypted"` contains the the actual data of the file broadcasted using this datablob;  
- `"amountA"` set to `"0.00000201"`; the value encodes the fragment number of the data stored in this datablob; to get the fragment number, multiply the value with `10^8`

:::tip Note

- we recommend to publish only one file at a time
- it is also recommended to not issue the `stop` command to the daemon while a file is being published; doing so will make the daemon stop receiving further RPC, but it continues to publish the datablobs containing the data of the file; once that is done, the daemon shuts down; note that, the daemon publishes neither the datablob with `tagA` set to `files` and `tagB` set to the file name nor the `locators` datblob, which results in no other node able to use the [DEX_subscribe](#dex-subscribe) RPC to download the file

:::

#### Arguments

| Name     | Type     | Description                                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| filename | (string) | the name of the file to be published; the name must be less than 15 characters long; the file must be present in the working directory from which the command to start the Komodo daemon(`komodod`) was issued; not to be confused with the directory in which `komodod` is present |
| priority | (number) | the minimum priority to be used for the broadcasted datablobs that contain the file's data; set this value above the `VIP_PRIORITY` level for prioritised transmission of the datablobs; for the `VIP_PRIORITY` being used by your node, see the value of `vip` in the response to the [DEX_stats](#dex-stats) RPC    |
| sliceid | (number) | if set to `0`, it publishes the file; if set to `0` and the file is already published, it scans the datablobs present in the "Data mempool" and republishes the missing ones; if the value is an integer greater than `0`, it is the id of the slice to publish; this method treats the file as a number of 1 MB sized slices and publishs only the mentioned slice of the file; this functionality is used by the [DEX_stream](#dex-stream) method  |

#### Response

| Name        | Type     | Description                                   |
| ----------- | -------- | --------------------------------------------- |
| fname       | (string) | the name of the file                                              |
| id          | (number) | the id of the published file's locators datablob                                              |
| senderpub   | (string) | the `DEX_pubkey` of the file's sender                                              |
| filesize    | (number) | the size of the file in bytes                                              |
| fragments   | (number) | the number of fragments the file has been broken down into; each fragment has a maximum size of `10000 byte`                                              |
| numlocators | (number) | the number of locators of the published file                                              |
| filehash    | (string) | the SHA256 hash of the file as indicated by the publishing node                                              |
| checkhash   | (string) | the SHA256 hash of the file based on all the fragments the node has currently available                                             |
| result      | (string) | whether the command was successfully executed |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DORN DEX_publish roadmap2020.pdf 3
```

<collapse-text hidden title="Response">

```json
{
  "fname": "roadmap2020.pdf",
  "id": 3277545472,
  "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "filesize": 2049320,
  "fragments": 205,
  "numlocators": 205,
  "filehash": "8ed81c26721dcce7bfd1a811f301ec84a2f79389ab86cb45e481ab3f5f40f85d",
  "checkhash": "8ed81c26721dcce7bfd1a811f301ec84a2f79389ab86cb45e481ab3f5f40f85d",
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
| cmdpriority        | (number) | the number of txpow bits being used for datablobs generated by commands; Example: [DEX_cancel](#dex-cancel)                                                                                                                                                                             |
| perfstats          | (string) | a string containing stats about the datablobs and the "Data mempool" the local node is seeing                                                                              |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DORN DEX_setpubkey 03ac42ded82688c381563d2e123a2eaf54b29d9fd15a8bd4f9f2727dbfe9be1688
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
| progress          | (number) | the percentage of datablobs already broadcast when a single file is being published using the [DEX_publish](#dex-publish) RPC                                            |
| vip                | (number) | the minimum number of txpow bits to be present in a datablob for it to be considered a VIP; VIP datablobs are prioritised for routing by all nodes on the `dexp2p` network; if a node notices its peer not having a VIP datablob it knows about, it will ping the peer about it even if the VIP datablob was received by it a long time before then; this property is useful for helping newer nodes bootstrap important datablobls in saturated networks    |
| cmdpriority        | (number) | the number of txpow bits being used for datablobs generated by commands; Example: [DEX_cancel](#dex-cancel)                                                                                                                                                                             |
| perfstats          | (string) | a string containing stats about the datablobs and the "Data mempool" the local node is seeing; Example: `RAM.207 50c5ce3d R.0 S.414 A.414 dup.0 | L.0 A.0 coll.0 | lag (0.0000 0.0000 0.0000) err.0 pend.0 T/F 207/207 | 0 0 0 0 0 1 0 1 3 4 5 32 62 99  0/sec`; for explanation on what each part of the string means, see the [Daemon Output](#daemon-output) section                                                                              |


#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DORN DEX_stats
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
  "progress": 2.81,
  "vip": 5,
  "cmdpriority": 7,
  "perfstats": "RAM.139 0cb9bb60 R.139 S.0 A.139 dup.0 | L.278 A.139 coll.0 | lag (0.0000 0.0000 0.0000) err.0 pend.0 T/F 0/0 | 1 1 0 2 6 9 17 32 71 0 0 0 0 0  0/sec"
}
```

</collapse-text>

<!----
DEX_stream filename priority
DEX_streamsub filename priority pubkey
---->

## DEX_subscribe

**DEX_subscribe filename priority id [publisher33]**

This method allows a user to download a file that has been published to the `dexp2p` network using the [DEX_publish](#dex-publish) method.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| filename | (string)     | the name of the file to download            |
| priority | (number)     |  the priority above the default value of the command priority with which the node should create a datablob if it needs to request missing blocks; can be `0` most of the time             |
| id | (string, deprecated)     | DEPRECATED; use the value `0` in its place; id of the datablob that contains the `locators` information for the file the user wants to download; find the `locators` datablob by filtering the avaialble datablobs with `tagA` set to the file's name and `tagB` set to the word `locators`           |
| publisher33 | (string)     | the `DEX_pubkey` of the file's publisher             |

#### Response

| Name        | Type     | Description                                   |
| ----------- | -------- | --------------------------------------------- |
| fname       | (string) | the name of the file                                              |
| id          | (number) | the id of the published file's locators datablob                                              |
| senderpub   | (string) | the `DEX_pubkey` of the file's sender                                              |
| filesize    | (number) | the size of the file in bytes                                              |
| fragments   | (number) | the number of fragments the file has been broken down into; each fragment has a maximum size of `10000 byte`                                              |
| numlocators | (number) | the number of locators of the published file                                              |
| filehash    | (string) | the SHA256 hash of the file as indicated by the publishing node                                              |
| checkhash   | (string) | the SHA256 hash of the file based on all the fragments the node has currently available                                             |
| result      | (string) | whether the command was successfully executed |

#### :pushpin: Examples

##### Command

```bash
./komodo-cli -ac_name=DORN DEX_subscribe "roadmap2020.pdf" 0 0 01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063
```

<collapse-text hidden title="Response">

```json
{
  "fname": "roadmap2020.pdf",
  "id": 4181200704,
  "senderpub": "01e28518858aa3515163a67deee2b19f0d30e4fa237f0aec255e4c94db0fe8d063",
  "filesize": 2049320,
  "fragments": 205,
  "numlocators": 205,
  "filehash": "8ed81c26721dcce7bfd1a811f301ec84a2f79389ab86cb45e481ab3f5f40f85d",
  "checkhash": "8ed81c26721dcce7bfd1a811f301ec84a2f79389ab86cb45e481ab3f5f40f85d",
  "result": "success"
}
```

</collapse-text>
