# Gateways

## Introduction

The Gateway Fluidity module allows the user to facilitate, manage, and trade tokenized representations of foreign blockchain assets.

For example, a user is able to deposit their real-world BTC into a monitored address on the Bitcoin blockchain. Then, on the `gateways` Smart Chain, the ownership of this BTC is tokenized. Only the owner of the token has the right to withdraw the BTC to a chosen address. The user that made the deposit can use the token either for asset trading, or for other creative purposes.

This allows the `gateways`-enabled Smart Chain to feature secure, on-chain, high-speed trading.

Using an established `gateways` contract is not considered difficult. However, setting up the gateway requires the user to closely follow several detailed steps.

## Gateways Module Tutorial Availability

The Fluidity Tutorials section features a full walkthrough of the Gateways module.

[<b>Link to Gateways Module Tutorial</b>](../basic-docs/fluidity/fluidity-tutorials/gateways-module-tutorial.md)

## gatewaysaddress

**gatewaysaddress**

The `gatewaysaddress` method returns information about the on-chain gateway.

### Arguments

| Name | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |            |

### Response

| Name | Type | Description |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| "result"            | (string) | whether the command executed successfully                                                                            |
| "GatewaysCCaddress" | (string) | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey |
| "Gatewaysmarker"    | (string) | the unmodified public address generated from the contract's privkey                                                  |
| "GatewaysPubkey"    | (string) | the pubkey for the gateways module                                                                                       |
| "GatewaysCCassets"  | (string) | this property is used for development purposes only and can otherwise be ignored                                     |
| "myCCaddress"       | (string) | taking the contract's EVAL code as a modifier, this is the Fluidity address from the pubkey of the user                    |
| "myaddress"         | (string) | the public address of the pubkey used to launch the chain                                                            |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysaddress
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "GatewaysCCaddress": "RKWpoK6vTRtq5b9qrRBodLkCzeURHeEk33",
  "Gatewaysmarker": "RGJKV97ZN1wBfunuMt1tebiiHENNEq73Yh",
  "GatewaysPubkey": "03ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb40",
  "GatewaysCCassets": "RD7tdFCpk2SPuiZqvDq5yysectsuhAc5wz",
  "myCCaddress": "RWR1hg4Ud6C5PhpWjkrEBhSfqhZCAGDwd9",
  "myaddress": "RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp"
}
```

</collapse-text>


## gatewaysbind

**gatewaysbind tokenid oracletxid coin tokensupply M N pubkey(s) pubtype p2shtype wiftype [taddr]**

The `gatewaysbind` method binds the provided sources into a new gateway.

### Arguments

| Name | Type | Description |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| tokenid     | (string) | the `tokenid` that the gateway will control as a proxy of foreign (off-chain) assets                          |
| oracletxid  | (string) | the `oracletxid` under which the gateway should be created                                                    |
| name        | (string) | the name of the coin represented by the gateway's proxy token                                                 |
| tokensupply | (number) | the maximum available supply of the proxy token; this should be equal to the total number of `tokenid` tokens |
| M           | (number) | the minimum number of gateway signatory nodes required to facilitate a gateway transaction                    |
| N           | (number) | the full number of gateway signatory nodes that will control the gateway                                      |
| pubkey      | (string) | the pubkey on which tokens will be available after conversion                                                 |
| pubtype     | (number) | the prefix number of pubkey type of external chain                                                            |
| p2shtype    | (number) | the prefix number of p2sh type of external chain                                                              |
| wiftype     | (number) | the prefix number of wif type of external chain                                                               |
| taddr       | (number) | the 2nd byte of prefix number of pubkey type (optional, only for 2 byte prefix chains)                        |

### Response

| Name | Type | Description |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step One:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysbind 202277c3a48ef168b164f7995eaced940e6416afefd6acd5aac0cb0a439df210 51a3fa99ef2abb3c1ce8248896d934bd348b7a1e0c5dbc06688c976247263a25 KMD 100000000 1 1 024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0 60 85 188
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "010000000152d7d470197f5dc650c9ec09e1c8f4975d315219e3b6edad3c927c2fc23197ca0200000048473044022006bf373f1dd51c638a38d1e592741db73387e6acc186fca2011cd7283520ff770220673be91d346ba72adcbc9ab1df712f750047c2609399256c07ad3170d9ea850401ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce05c9836180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c550010f29d430acbc0aad5acd6efaf16640e94edac5e99f764b168f18ea4c377222000e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0253a264762978c6806bc5d0c1e7a8b34bd34d9968824e81c3cbb2aef99faa35100000000"
}
```

</collapse-text>


Step Two:

Broadcast using [sendrawtransction:](../komodo-api/rawtransactions.html#sendrawtransaction)

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000152d7d470197f5dc650c9ec09e1c8f4975d315219e3b6edad3c927c2fc23197ca0200000048473044022006bf373f1dd51c638a38d1e592741db73387e6acc186fca2011cd7283520ff770220673be91d346ba72adcbc9ab1df712f750047c2609399256c07ad3170d9ea850401ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cce05c9836180900002321024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0ac0000000000000000796a4c76f142034b4d443c550010f29d430acbc0aad5acd6efaf16640e94edac5e99f764b168f18ea4c377222000e1f5050000000001010121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0253a264762978c6806bc5d0c1e7a8b34bd34d9968824e81c3cbb2aef99faa35100000000
```


<collapse-text hidden title="Response">


```bash
aa1b82d78398184c93405ccd15e3cf00b63634aac98a7b75053aa90eaf9cb47d
```

</collapse-text>


This is the `bindtxid` for the gateway.

<!--FIXME new RPC added
## gatewaysclaim

**gatewaysclaim bindtxid coin deposittxid destpub amount**

The `gatewaysclaim` method allows the owner of the `deposittxid` to claim their on-chain proxy tokens. This method can only be executed by the owner of the `pubkey` that was used to launch the daemon from which the `gatewaysdeposit` call was executed.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name | Type | Description |
| ----------- | -------- | ------------------------------------------------------------------------------------------------ |
| bindtxid    | (string) | the `bindtxid` of the gateway                                                                    |
| coin        | (string) | the name of the proxy token                                                                      |
| deposittxid | (string) | the `deposittxid` returned after broadcasting the hex returned from the `gatewaysdeposit` method |
| destpub     | (string) | the `pubkey` address to which the proxy tokens should be sent                                    |
| amount      | (number) | the amount to send to the `pubkey`                                                               |

### Response

| Name | Type | Description |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step One:

Command

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysclaim 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d KMD 07d79e39354cc38a76dfe2ca8a5fb711432192237608ea066621662f13e0c08e 02d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d 0.1
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "01000000030a9a982a898012f4cc982796f381f16c9e2e5fe28e0be58ad59c7c90409530f8020000004847304402207959e4befae9e917cde7d6ba6f5e62e4cf679858b1a5c8b1eb270b1c7eac7c7e0220503ea9a24245db21b4db8ae68e48da6c5d33ef436371c6d03872d45d1364047c01ffffffffc6fc3b75a37a6ed10507a1bb73f2c5d5c8f75bcb358b0aa4bab3b80b5aa39f19010000007b4c79a276a072a26ba067a565802103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb408140d4c46b8282d42d7e7ebe99361264c21b9ee221b7b3a47e1549e06bf06659fa194298618a2969a421543753a5994ebc3944e93ac6072a233ab617b229b3922a52a100af038001f1a10001ffffffff8ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed707000000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d8140f3938953c9087e1e25c31263c5a717dd59d2f7d6f0815cfd7c0cb01a6c4d586b630b11cca1e60a19036d937095941660e488a07494fc721471d4a53f5eb89a25a100af038001f1a10001ffffffff048096980000000000302ea22c8020abd72b18452f1bc72f4312dbb1cd341b7c7f38a994ddacd8b35412231f01cb088103120c008203000401cc804a5d0500000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc1027000000000000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000936a4c90e374bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a898ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed7072102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000"
}
```

</collapse-text>


Step Two: Broadcast using `sendrawtransction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000030a9a982a898012f4cc982796f381f16c9e2e5fe28e0be58ad59c7c90409530f8020000004847304402207959e4befae9e917cde7d6ba6f5e62e4cf679858b1a5c8b1eb270b1c7eac7c7e0220503ea9a24245db21b4db8ae68e48da6c5d33ef436371c6d03872d45d1364047c01ffffffffc6fc3b75a37a6ed10507a1bb73f2c5d5c8f75bcb358b0aa4bab3b80b5aa39f19010000007b4c79a276a072a26ba067a565802103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb408140d4c46b8282d42d7e7ebe99361264c21b9ee221b7b3a47e1549e06bf06659fa194298618a2969a421543753a5994ebc3944e93ac6072a233ab617b229b3922a52a100af038001f1a10001ffffffff8ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed707000000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d8140f3938953c9087e1e25c31263c5a717dd59d2f7d6f0815cfd7c0cb01a6c4d586b630b11cca1e60a19036d937095941660e488a07494fc721471d4a53f5eb89a25a100af038001f1a10001ffffffff048096980000000000302ea22c8020abd72b18452f1bc72f4312dbb1cd341b7c7f38a994ddacd8b35412231f01cb088103120c008203000401cc804a5d0500000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc1027000000000000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000936a4c90e374bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a898ec0e0132f66216606ea08762392214311b75f8acae2df768ac34c35399ed7072102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000
```


<collapse-text hidden title="Response">


```bash
9bf287d544c6f5597ccf67641398718398cd79fde02caa32a4b338b5a923cb61
```

</collapse-text>


## gatewayscompletesigning

**gatewayscompletesigning withdrawtxid coin hex**
-->

## gatewaysdeposit

**gatewaysdeposit bindtxid height coin cointxid claimvout deposithex proof destpub amount**

The `gatewaysdeposit` method is used to alert the gateway of the completed deposit of the foreign (off-chain) asset.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a `txid` which serves as the **deposittxid**.

### Arguments

| Name | Type | Description |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| bindtxid   | (string) | the bindtxid of the gateway                                                                                          |
| height     | (number) | the block height of the `txid` wherein the funds were sent to the foreign-asset gateway pubkey                       |
| name       | (string) | the name of the foreign asset                                                                                        |
| cointxid   | (string) | the `txid` returned when the foreign assets were sent to the gateway pubkey                                          |
| claimvout  | (string) | the `vout` of the claim (on the first use, this value should be 0)                                                   |
| deposithex | (string) | returned from the `txid` wherein the funds were sent to the foreign-asset gateway pubkey                             |
| proof      | (string) | the proof for the `txid`; can be found using the [gettxoutproof](../komodo-api/blockchain.html#gettxoutproof) method |
| destpub    | (string) | the public key where the tokens should be received on the Smart Chain                                                |
| amount     | (number) | the amount of the deposit                                                                                            |

### Response

| Name | Type | Description |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysdeposit 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d 1116196 KMD 907812ee8d2762b589f6ca88ee8ba18a65ebf5c7486c472df7395628d22d0d98 0 010000000197d6ea16c68dc5db95b72e029a0e23cb403ae0a33b561b863963cfd9cbfec747000000006b483045022100aca47515602989979b514b6211c375e4d0d9471dd8297c5238c12245ad01dd830220191105caf1b63313c6988194f5f03fd6f70d4a30edc7820add1185d35edff1bb012102924664b536f3710a8e8abea38bb4bf71b470a653a4dceabd50df08d7b2a38436ffffffff0310270000000000001976a9141b355cb6b76cab1b16cb873db8828fe5d2521ae488ac80969800000000001976a914f0d1fc29f8962ac2805a1659192d9ad26794d22988ac38c7fa00000000001976a91482804b943dd6a2008af73f8ba40449c062f0935188ac50e6fd5b 04000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b 02d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d 0.1
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "01000000010db4b1686d1f27de5e2a11c793dfd30f09b296754f95ae8649858cca97d5b07a0000000049483045022100ad6bc26f0c66b89f5d63aff251c78965a50201f909a997b8ed6469da0334aa0c0220136d71f5ad1f4496785df81864f9be3ae7b8dd012dae08d59fd544869eacb3ba01ffffffff041027000000000000302ea22c80205fd998129698de9cf1455f4f4795794c9e57bf1fd5f28598b5e6c0322de5d0358103120c008203000401cc1027000000000000232102980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890acd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000fd04096a4d0009f144034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a890121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0012fea85ecfda42975a2aaed72e946792df41a486033af8dc45ab1e4ddcb34b1b424081100980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee12789000000000fd080230313030303030303031393764366561313663363864633564623935623732653032396130653233636234303361653061333362353631623836333936336366643963626665633734373030303030303030366234383330343530323231303061636134373531353630323938393937396235313462363231316333373565346430643934373164643832393763353233386331323234356164303164643833303232303139313130356361663162363333313363363938383139346635663033666436663730643461333065646337383230616464313138356433356564666631626230313231303239323436363462353336663337313061386538616265613338626234626637316234373061363533613464636561626435306466303864376232613338343336666666666666666630333130323730303030303030303030303031393736613931343162333535636236623736636162316231366362383733646238383238666535643235323161653438386163383039363938303030303030303030303139373661393134663064316663323966383936326163323830356131363539313932643961643236373934643232393838616333386337666130303030303030303030313937366139313438323830346239343364643661323030386166373366386261343034343963303632663039333531383861633530653666643562fd360604000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b2102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000"
}
```

</collapse-text>


Step Two: Broadcast using `sendrawtransction`

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000010db4b1686d1f27de5e2a11c793dfd30f09b296754f95ae8649858cca97d5b07a0000000049483045022100ad6bc26f0c66b89f5d63aff251c78965a50201f909a997b8ed6469da0334aa0c0220136d71f5ad1f4496785df81864f9be3ae7b8dd012dae08d59fd544869eacb3ba01ffffffff041027000000000000302ea22c80205fd998129698de9cf1455f4f4795794c9e57bf1fd5f28598b5e6c0322de5d0358103120c008203000401cc1027000000000000232102980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890acd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000fd04096a4d0009f144034b4d440d8d1f63bf680d6191b100d90992b0f6bf6ce1cc851f259da8b49e74524e7a890121024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0012fea85ecfda42975a2aaed72e946792df41a486033af8dc45ab1e4ddcb34b1b424081100980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee12789000000000fd080230313030303030303031393764366561313663363864633564623935623732653032396130653233636234303361653061333362353631623836333936336366643963626665633734373030303030303030366234383330343530323231303061636134373531353630323938393937396235313462363231316333373565346430643934373164643832393763353233386331323234356164303164643833303232303139313130356361663162363333313363363938383139346635663033666436663730643461333065646337383230616464313138356433356564666631626230313231303239323436363462353336663337313061386538616265613338626234626637316234373061363533613464636561626435306466303864376232613338343336666666666666666630333130323730303030303030303030303031393736613931343162333535636236623736636162316231366362383733646238383238666535643235323161653438386163383039363938303030303030303030303139373661393134663064316663323966383936326163323830356131363539313932643961643236373934643232393838616333386337666130303030303030303030313937366139313438323830346239343364643661323030386166373366386261343034343963303632663039333531383861633530653666643562fd360604000000380b8fd2b9bdf570358980a4c9fc94e418ac656913999b5f9a016ec5afc46b0b188320f231637a0ded0b0bdada1f34c81ad5873b8c3f096b2014018af13f43980000000000000000000000000000000000000000000000000000000000000000b2e6fd5ba786061d57fff87a00000000000046430000000000000200000000000000000000000000fd40050035435dd2c1df5c20cb48e0617b6cee81f5349f0735b36fe93f17f82d678ad3eb374d0e398b049fddcb21a4d7ddf7345867c6a363eddcfe61f31d49dbc35652794c60da61bd5f164fd554f17b5bd669f636744412822af2ebd0f318dacb71514720164c59c392ef2b1ccc3a5dc5c9c83cd37a11f98b97c8f5170a357a972ec3cacbeb0dab34b757354883b46a598f2b93fcd735b4163db6b2b037f7d7d71a773e909ac4ce3f1228012d5bebfd9edad9842ae8c6cddf6942c543594b85013591a604c4223a3d2e007ed25f5994e9d8f6b6a704daf57cad41aea9609923612eee2fc55ad075c91c23a8cc46af9a45a7390c537d2e2302994239ae44230537ceaa2188e7f4eb6a0ab55471d152b9177e9fd90843504f29d3e92fd3d7142caae018b51318ec6b86083b7e2d155ce868f6b673b13cf1ed59107d15c6c84201441dde14074930f4755ec64975f354a99bd957021c073768f575dde3ab020dd73b488e2d03d57bc414a16d45b3e2052b24fb2360ec5f73524525fc59d2151b89310b19764541b801ad72171085bc6275832222484b8d7ee6ed91ab6a544c45af5c4d8445b0624f04a234aec6997eecf007f0e971eea33b21e45ba8f72825fa84605cdfa929aeb6dc425f2612000e7ce2ba04ff8c53061154eb38cba7f6d0bfe5dab031dadea2095e01e93f9e063d0b42e412f865572625f77aa8b10b58f7b0428ea0ff530ea10d37150496bb181e37fc5814ad524ce4618955e9158b6aebb956b02b961f920ee48eb5a08efc39d27fc2fd4ec175e38798bcca7331a7b5da2ca6c56fcb98e740c2f471eac6b67ced78125c5fcecd4f76eac1d76233aa58ed808e398b9e2b1eaa74e773d18276b732239403ce0c452cb26f0f34156a0a63e007ccfbd76f168fb941fbd2fbe23b57e519835c804ace6e22e281b3d0adda7c4b93a87d94500103315c780fe91ee67320a422eecb4a6daedc2d774567bfebc1d5b72fa693178f3443aa1eb47f18d6931f7b0fc6ec151caad4eae5f787c2a963c3963ffc924ba66a7ea1754763faf2884de0c86a0f75fe7f8dfb1265b449184668cb7348520810cf731663f5180ac31642d6b135d5ce7de88ba63d6db3d6c5dfa19492281dfed3b3765451717f3497ac2b4c040e2e4e77219b2586c227cd138b8d94ccc273fbfbb51a35523870c503e2d8527b840ced11917075e8a41ae9616f1df8d41df5bae39c6d6de5bb8d43d401bb9089723db59f0f06aa4fdf4145a905812ef799eb574abb9985de878a289e5f4b1256ca2121d553465f44065580cb5bde170459d1c22e8d388cbec9e37dc3cca07e489a9859942a9ccef4a5e45eed7228b94c86d10a233b5a1ddfcb1735cb9b16de6e8f49f3c841796acba31a8e9c90b531952ed03bd72e0b00fa3373ea4bc845d7469afae305639c772285a5223bf2d86a12c92312dc19db86400c6760b9e75af40ce4c16278bba8a804d5a69b88290dd4c2b43423bee9eb97c54261f956a32d80fdd3f421d1199ee45d42ad657e928be2e9fa54d844cff60b06bc525ce54daca9689e0616bfdbdbc36e09bea11a276d25d3ca9a80ed7109183784dfd1d23b7c791a7913a633e2d28948c655e68ade706654e38f717fe29119af4282430c8d1f702a52ea189f1e9e6faafb213205a195dab1c2d01dc6a3711f671ea118e8a3c995632903c58ebbd4eae5dbc4555b24c1649e89e03efb92134b9e24fb9fc649462f928d992fa33d45edcb4ef13f0d5c2cb6663e7dbf2414b5ed617e56b8715ace6910807e4a901ba603dab4092f9eeb46566ec3f38f3a1789c60822530c390d19b1d939217b7a691abb91454fce76cccf3557ddb3fc55bd4f44761aa9363db0f38360adf60e743ba3b902788bb254637f6074df62460400000003a973b7134b7fcbcb1fe70fdfaaf056c209a9f5dd77800eb37b065ca8317cbb3a980d2dd2285639f72d476c48c7f5eb658aa18bee88caf689b562278dee127890445df562c183ed7279f2f8e37ba249447439884d5b7030eac6485112eb07ea2d010b2102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d809698000000000000000000
```


<collapse-text hidden title="Response">


(This is the `deposittxid`)

```bash
07d79e39354cc38a76dfe2ca8a5fb711432192237608ea066621662f13e0c08e
```

</collapse-text>


## gatewaysdumpprivkey

**gatewaysdumpprivkey bindtxid address**

The `gatewaysdumpprivkey` method returns the private key for the given `address` and `bindtxid`.

The private key is returned in the wif format of the associated external chain.

### Arguments

| Name | Type | Description |
| --------- | -------- | ---------------------------------------------------- |
| bindtxid  | (string) | the `bindtxid` for the associated gateway            |
| address   | (string) | the `address` for which the private key is requested |

### Response

| Name | Type | Description |
| --------- | -------- | ----------------------------------------- |
| result    | (string) | whether the command executed successfully |
| privkey   | (string) | the private key                           |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysdumpprivkey 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d RVHLGTE3aFGwqpUVsoHJiJGs9pmsnd3fNB
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "privkey": "1pAcQXouEKKjuCpH25AjPoiihGNWB7DGwgfRCRAhJtRVGKvRHrk"
}
```

</collapse-text>


## gatewaysexternaladdress

**gatewaysexternaladdress bindtxid pubkey**

The `gatewaysexternaladdress` method returns the address on the external chain for the gateways associated with the given `pubkey` and `bindtxid` values.

### Arguments

| Name | Type | Description |
| --------- | -------- | ----------------------------------------------------------------- |
| bindtxid  | (string) | the `bindtxid` for the associated gateway                         |
| pubkey    | (string) | the `pubkey` needed to generate the address on the external chain |

### Response

| Name | Type | Description |
| --------- | -------- | ----------------------------------------- |
| result    | (string) | whether the command executed successfully |
| address   | (string) | the address for the given pubkey          |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysexternaladdress 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d 02ebb42018347eb3a4da76e85347bb0f042355ff3d16e323b21f8e6cb10098654e
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "address": "RPq3opCLxV3xgpiM8ewUvyRE5aqovfVeH5"
}
```

</collapse-text>


## gatewaysinfo

**gatewaysinfo bindtxid**

The `gatewaysinfo` method returns information about the `bindtxid` gateway.

### Arguments

| Name | Type | Description |
| --------- | -------- | ----------------------------------------- |
| bindtxid  | (string) | the `bindtxid` for the associated gateway |

### Response

| Name | Type | Description |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| result      | (string) | whether the command executed successfully                                                                   |
| name        | (string) | the name of the command                                                                                     |
| pubkey      | (string) | the pubkey that holds the converted proxy tokens                                                            |
| coin        | (string) | the name of the asset that the proxy token represents                                                       |
| oracletxid  | (string) | the `oracletxid` of the associated oracle                                                                   |
| taddr       | (number) | the coin-specific address that customizes the address for the relevant foreign coin         |
| prefix      | (number) | the coin-specific address prefix that customizes the address for the relevant foreign coin  |
| prefix2     | (number) | the coin-specific address prefix that customizes the address for the relevant foreign coin  |
| deposit     | (string) | the t address associated with the gateway pubkey                                                            |
| tokenid     | (string) | the `tokenid` of the proxy token                                                                            |
| totalsupply | (number) | the total available supply of proxy tokens                                                                  |
| remaining   | (number) | the amount of proxy tokens not currently issued                                                             |
| issued      | (number) | the amount of proxy tokens currently issued                                                                 |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysinfo 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "name": "Gateways",
  "pubkey": "024026d4ad4ecfc1f705a9b42ca64af6d2ad947509c085534a30b8861d756c6ff0",
  "coin": "KMD",
  "oracletxid": "ba26ba27dc17a017a2c0915378c0a8430e468dffb42c4fc1cd36abf69c88388b",
  "taddr": 0,
  "prefix": 60,
  "prefix2": 85,
  "deposit": "RXEXoa1nRmKhMbuZovpcYwQMsicwzccZBp",
  "tokenid": "07646d72dec393f486f8a116facd9b8a575dcf00ec99f819151fd1784015941b",
  "totalsupply": "1.00000000",
  "remaining": "1.00000000",
  "issued": "0.00000000"
}
```

</collapse-text>


## gatewayslist

**gatewayslist**

The `gatewayslist` method displays a list of `bindtxids` for the available gateways.

### Arguments

| Name | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description |
| --------- | -------- | ------------------------------------ |
| bindtxid  | (string) | the bindtxid of an available gateway |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewayslist
```


<collapse-text hidden title="Response">


```bash
[
  "4114e3c5dcddc464c5fd94efebf8215322f12226bffc93f84d6d5e0b4ca131a9",
  "aeef4320afe73e1cfe43c4c129b31da018990f49d65b5eeb45cb9a348fdf6ece"
]
```

</collapse-text>


<!--FIXME new RPC added
gatewaysmarkdone completesigningtx coin
gatewayspartialsign txidaddr refcoin hex
gatewayspendingdeposits bindtxid coin
gatewayspendingwithdraws bindtxid coin
gatewaysprocessed bindtxid coin
-->

## gatewayswithdraw

**gatewayswithdraw bindtxid coin withdrawpub amount**

The `gatewayswithdraw` method sends proxy tokens in the gateways `pubkey`. The gateway then sends the foreign assets to the indicated foreign `withdrawpub` pubkey.

### Arguments

| Name | Type | Description |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| bindtxid    | (string) | the `bindtxid` of the gateway                                                                                                |
| coin        | (string) | the name of the asset                                                                                                        |
| withdrawpub | (string) | the `pubkey` to which the foreign assets should be sent                                                                      |
| amount      | (number) | the number of proxy tokens to send to the gateway, which will then be exchanged for the relevant amount of the foreign asset |

### Response

| Name | Type | Description |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD gatewayswithdraw 897a4e52749eb4a89d251f85cce16cbff6b09209d900b191610d68bf631f8d0d KMD 0271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328 0.1
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "01000000020e2778e5c0917b00a995ffd0e027ac896492b70b2004ca0096d5309bc1d695ce0000000048473044022072bd3e74c1fb6a56111fc34caab1d605cedfbcb0a9dcd1a4c8d0dae9db61d43902205ccea739077b3374559353af3392e637b7c462ca699f9b9dba786b5398491b4201ffffffff8425c1bf730444ceac45a47376164d66a156e6c2a48116ec14cd17a88f8ab8e5010000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d814051e39b89bace8226f3ca1779b754f2b57ee480e9636b16322bb36a89ec22de967ea66cdc906debb5f6b7c26a51ac2d089966aeb92d07aacc43507b1555c02313a100af038001f1a10001ffffffff058096980000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc102700000000000023210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328ac1027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401ccd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000536a4c50f157bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d44210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328809698000000000000000000"
}
```

</collapse-text>


Step Two: Broadcast using `sendrawtransction`:

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000020e2778e5c0917b00a995ffd0e027ac896492b70b2004ca0096d5309bc1d695ce0000000048473044022072bd3e74c1fb6a56111fc34caab1d605cedfbcb0a9dcd1a4c8d0dae9db61d43902205ccea739077b3374559353af3392e637b7c462ca699f9b9dba786b5398491b4201ffffffff8425c1bf730444ceac45a47376164d66a156e6c2a48116ec14cd17a88f8ab8e5010000007b4c79a276a072a26ba067a565802102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9d814051e39b89bace8226f3ca1779b754f2b57ee480e9636b16322bb36a89ec22de967ea66cdc906debb5f6b7c26a51ac2d089966aeb92d07aacc43507b1555c02313a100af038001f1a10001ffffffff058096980000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc102700000000000023210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328ac1027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401ccd02a724e18090000232102d389e879ca68809794c0ef29869b23b4dd8e22122fcc4e8b69adb1d33752dd9dac0000000000000000536a4c50f157bff603b64f309e344e34b10fd2053db59788909914f8488a7f73ddddc2165d31034b4d44210271bc6b553f5f763ca7f64457710f8a0b3f5273b2941edc5091ca41cec39b7328809698000000000000000000
```


<collapse-text hidden title="Response">


```bash
79d41ffefa359a7ae2f62adf728a3ec3f3d2653889780ed9776bf9b74fe9a6fe
```

</collapse-text>



