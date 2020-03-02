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

The receiving node can find all the messages sent to it through the [DEX_anaonsend](#DEX_anaonsend) method by using the method [DEX_list](#DEX_list) for listing all the the datablobs with `tagA` set to `"anon"`and looking for the matches that have the keys `"anonmsg"` and `"anonsender"` in them.

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
| pubkey33 | (string, optional)             | the pubkey which is associated with the datablob, called the `DEX_pubkey`; this is not a regular pubkey that starts with `02` or `03`, it starts with `01`; it can be found from the output of the [DEX_stats](#DEX_stats) RPC; it is also printed in the STDOUT of the `komodod` in a line that starts with `DEX_pubkey.(` <br> <br> if the node is started with the `-pubkey` parameter using a regular pubkey owned by the node, its privatekey is used to create the corresponding `DEX_pubkey` and printed; else, a keypair is generated for the particular session and its privatekey is used to create the corresponding `DEX_pubkey` and printed <br> <br> if the `tagA` is set to "inbox", the datablob is encrypted to the `DEX_pubkey` specified by the `pubkey33` parameter; if `tagA` is not set to "inbox", the datablob is authenticated by the `DEX_pubkey` provided through the `pubkey33` parameter by encrypting it to a publicly known keypair; if `tagA` is not set to "inbox" and the parameter `pubkey33` is set to `""`, i.e., unspecified, the datablob is not authenticated by any `DEX_pubkey` and broadcasted to the network un-encrypted; |
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
|anonmsg|(string)|the decrypted anonymous message received by the node from a `anonsender` who most likely used the [DEX_anonsend](#DEX_anonsend) method |
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

This method allows a user to publish a file to the p2p Data Network. The file is broken into fragments and broadcast to the network using the datablobs. Take a look at the response of [DEX_broadcast](#DEX_broadcast) for a list of all the keys available in a datablob. The `DEX_publish` method utilises the datablobs to

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

#### Arguments

| Name     | Type     | Description                                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| filename | (string) | the name of the file to be published; the name must be less than 15 characters long; the file must be present in the working directory from which the command to start the Komodo daemon(`komodod`) was issued; not to be confused with the directory in which `komodod` is present |
| priority | (number) | the minimum priority above the default VIP priority level to be used for broadcasting the involved datablobs; if VIP priority level is `txpow_bits = 5` and this parameter is set to `3`, the datablobs created will have a minimum priority level of `8`; if the command is issued by a publisher node after it is restarted to republish an already published file, and the priority is set to VIP level or more, the node will automatically fetch all the relevant datablobs from the network |
| sliceid | (number) | if set to `0`, it publishes the file; if set to `0` and the file is already published, it scans the datablobs present in the "Data mempool" and republishes the missing ones; if the value is an integer greater than `0`, it is the id of the slice to publish; this method treats the file as a number of 1 MB sized slices and publishs only the mentioned slice of the file; this functionality is used by the [DEX_stream](#DEX_stream) method  |

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
| cmdpriority        | (number) | the number of txpow bits being used for datablobs generated by commands; Example: [DEX_cancel](#DEX_cancel)                                                                                                                                                                             |
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
| vip                | (number) | the minimum number of txpow bits to be present in a datablob for it to be considered a VIP; VIP datablobs are prioritised for routing by all nodes on the `dexp2p` network; if a node notices its peer not having a VIP datablob it knows about, it will ping the peer about it even if the VIP datablob was received by it a long time before then; this property is useful for helping newer nodes bootstrap important datablobls in saturated networks    |
| cmdpriority        | (number) | the number of txpow bits being used for datablobs generated by commands; Example: [DEX_cancel](#DEX_cancel)                                                                                                                                                                             |
| perfstats          | (string) | a string containing stats about the datablobs and the "Data mempool" the local node is seeing                                                                              |


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

This method allows a user to download a file that has been published to the `dexp2p` network using the [DEX_publish](#DEX_publish) method.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| filename | (string)     | the name of the file to download            |
| priority | (number)     |  the priority above the default value of the command priority with which the node should create a datablob if it needs to request missing blocks; can be `0` most of the time             |
| id | (string, deprecated)     | DEPRECATED; use the value `0` in its place id of the datablob that contains the `locators` information for the file the user wants to download; find the `locators` datablob by filtering the avaialble datablobs with `tagA` set to the file's name and `tagB` set to the word `locators`           |
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

