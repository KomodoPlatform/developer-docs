# Contract Module: MuSig 

## Introduction

::: tip Notice
The MuSig module is in the final stages of testing. If you would like to use MuSig on a production-level asset chain, please reach out to the Komodo team on [Discord](https://komodoplatform.com/discord)
:::

The MuSig CryptoConditions (CC) module implements a new type of multi-signature functionality. MuSig allows a blockchain to process multi-signature transactions in a more data-efficient manner, and MuSig also keeps private the number of signers partaking in a multi-signature transaction.

To allow this functionality, the MuSig module makes use of Schnorr Signatures. Schnorr Signatures are unique in that each signature is 64 bytes in size, regardless of the number of signers in a transaction. Also, a multi-signature Schnorr Signatures can be processed in one verification. 

Schnorr Signatures differs from the existing multi-signature method (ECDSA), as the ECDSA method requires each signer of a transaction to be verified separately. Also, with the ECDSA method each set of signers must be collected into a final verification. The size of the ECDSA multi-signature transaction can vary according to the number of signers in the set, and this can disclose information that would otherwise be kept private.

Therefore, Schnorr Signatures greatly reduce verification time and data-storage requirements, and enhance user privacy.

For further information, see this [article.](https://blockstream.com/2019/02/18/musig-a-new-multisignature-standard/)

Also, the reader may refer to the comments in the following core `komodod` files: 

- [komodo/src/secp256k1/include/secp256k1_musig.h](https://github.com/jl777/komodo/blob/jl777/src/secp256k1/include/secp256k1_musig.h)
- [komodo//src/secp256k1/src/modules/musig/example.c](https://github.com/jl777/komodo/blob/jl777/src/secp256k1/src/modules/musig/example.c)

### Workflow When Using MuSig

- Make a combined pubkey using the method [combine.](../dynamic/cc-musig.html#combine)
  - From the response, take note of the `combined_pk` and `pkhash` values
- Send coins to the `combined_pk` address using the [send](../dynamic/cc-musig.html#send) method.
  - From the decoded rawtransaction, take note of the `sendtxid` and `change_script`
- Now calculate the message that needs to be signed by all the parties using the method [calcmsg,](../dynamic/cc-musig.html#calcmsg) which uses `sendtxid` and `change_script` as arguments. From the response, take note of `msg`. To create a valid spend, this `msg` needs to be signed by all the participating pubkeys.
- On each signing node, a session needs to be created using the method [session,](../dynamic/cc-musig.html#session) which takes the follwing arguments: `ind` (index; node with the first pubkey gets `0`),`numsigners` (number of pubkeys participating), `combined_pk`, `pkhash`, `msg` (message to be signed). From the response on each node, take note of the `commitment` and send all the `commitment`s to all the other nodes.

::: warning

- The [session](../dynamic/cc-musig.html#session) method stores the commitment for each node into the global struct.
- Keep in mind there is a single global struct with the `session` unique to each `cclib session` call.
- This means that restarting any deamon in the middle of the process on any of the nodes results in a failure.
- Also `cclib session` method can't be called more than a single time on each node during the whole process.
- This is an artificial restriction just to simplify the initial implementation of MuSig

:::

- On each node, use the method [commit,](../dynamic/cc-musig.html#commit)
  which takes the arguments: `pkhash` and `commitment`s from all the other nodes to output `nonce`s. Make sure to exchange the `nonce`s from all the nodes so that each node will have `nonce`s from all the other nodes.
- On each node, use the method [nonce,](../dynamic/cc-musig.html#nonce)
  which takes the arguments: `pkhash` and `nonce`s from all the other nodes to output `partialsig`s. Make sure to exchange the `partialsig`s from all the nodes so that each node will have `partialsig`s from all the other nodes.
- Finally, on each node, use the method [partialsig,](../dynamic/cc-musig.html#partialsig)
  which takes the arguments: `pkhash` and `partialsig`s from all the other nodes to output `combinedsig`s. Make sure to exchange the `combinedsig`s from all the nodes so that each node will have `combinedsig`s from all the other nodes. You can verify that all the nodes produced the same `combinedsig`.
- Now, for a sanity test, the method [verify](../dynamic/cc-musig.html#verify) can be used to make sure that, this `combinedsig` will work with the `msg` needed for the spend. It takes the arguments `msg`,`combined_pk`, `combinedsig`.
- Now the [spend](../dynamic/cc-musig.html#spend) part. This method takes `sendtxid`,`change_script`,`combinedsig` as arguments. <!-- who can spend, how much, the code needs to be updated to control these things -->

## Installation

MuSig is currently only available on MacOS and Linux operating systems.

Please check with the Komodo team on [Discord](https://komodoplatform.com/discord) for information regarding Windows functionality.

### Install Dependencies

Ensure that local repositories are up to date:

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

Install Dependencies:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

### Build instructions

Build `komodod` by executing the following series of commands. Each line should be executed separately:

```bash
git clone https://github.com/jl777/komodo
cd komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

Compile the appropriate CC library by executing the following series of command. Each line should be executed separately:

```bash
cd src/cc
./makecclib
cd ../..
make -j$(nproc)
```

### Update

Update the `komodod` daemon by executing the following series of commands. Each line should be executed separately:

```bash
cd komodo
git checkout jl777
git pull
cd src/cc
./makecclib
cd ../..
make -j$(nproc)
```

### Launch the Asset Chain

Change into the `~/komodo/src` directory:

```bash
cd ~/komodo/src
```

Launch the MuSig asset chain using the following launch parameters.

```bash
./komodod -ac_name=MUSIG -ac_supply=100000 -ac_reward=10000000 -pubkey=<yourpub> -ac_cclib=sudoku -ac_cc=2 -addnode=5.9.102.210 &
```

### Obtain a Pubkey

Without a pubkey, the MuSig asset chain will not function properly on the user's local machine. Follow these instruction for obtaining and setting a pubkey:

- [Instructions for obtaining and setting a pubkey](../cryptoconditions/cryptoconditions-instructions.html#creating-and-launching-with-a-pubkey)

Once the asset chain is relaunched with the new pubkey included as a launch parameter, the MuSig asset chain is prepared for use.

### Acquire Funds for Testing

::: tip Note

The reader should launch the asset chain with a pubkey whose private key is already imported to the wallet. If this is not the case, restart the asset chain with an appropriate pubkey, or use the [importprivkey](../../komodo-api/wallet.html#importprivkey) method to import the private key of the desired pubkey.

:::

The MuSig asset chain has an available faucet. The faucet allows a user to obtain a nominal amount of funds for testing and orientation purposes. 

Ensure that the terminal's working directory is in the `~/komodo/src` directory:

```bash
cd ~/komodo/src
```

Execute the `faucetget` method:

```bash
./komodo-cli -ac_name=MUSIG faucetget
```

This method returns a hex value in the terminal. Select the entire hex value and copy it to the clipboard. (Use CTRL + SHFT + C to copy within the terminal)

Broadcast the hex value using the `sendrawtransaction` method:

```bash
./komodo-cli -ac_name=MUSIG sendrawtransaction <hex copied from the above response>
```

Wait for the transaction to be confirmed.

Once the broadcast transaction is confirmed, check the balance using the `getinfo` method:

```bash
./komodo-cli -ac_name=MUSIG getinfo | grep balance
```

There should be a small amount of funds in the balance.

## A Complete Example

The aim of this example is to create a `20f2` MuSig pubkey, fund it, and spend from it.

To accomplish this, two nodes are necessary. For more information about connecting an asset chain using two nodes, refer to the following documentation:

- [Basic Info for Connecting At Least Two Nodes](../installations/creating-asset-chains.html#creating-a-new-asset-chain)

In this MuSig example we use the following pubkeys on our two nodes:

- Node1's daemon is launched using the pubkey: `0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a`
- Node2's daemon is launched using the pubkey: `02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567`

The `EVALCODE` for the MuSig module is `18`.

Of the following steps, the first three need to be executed only on the first node. 

### combine

Use the `combine` method to create a `combined_pk` address:

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib combine 18 '["0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a","02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567"]'
```

Response:

```json
{
  "pkhash": "8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "result": "success"
}
```

Copy the values of `pkhash` and `combined_pk` and save them in a secure location for later use.

### send

Use the `send` method to send `1` coin to the `combined_pk` address:

Command:

```bash
./komodo-cli -ac_name=MUSIG  cclib send 18 '["03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",1]'
```

Response:

```json
{
  "hex": "0400008085202f890b02b1bdd8707f82bc6f4cdeb4756eb04dfc3cc7a4b5ac38a388c0205cf8f31a0e0000000048473044022004de31b5132f03f761fc0d0d9761efbf77bb27b07ee99f2cc54928e2150f1f16022069381b36bb9839cc9cb3e1d584e00dbd52efadf7e2f3fa092e0bcca839cdce6801ffffffff04949d5bf1722c5df04f58cf2c7e662f32ab65de2f7990ce4c734df4f2991eb60000000049483045022100ab3ab2bb95ef095763dd3eeb56961d1234aa25efd91a30fa14e397717368e6a0022048d7f8268463cfb44f34467bd77eb2aee962eaec09a079741c75c5de898b4f6c01ffffffff0476a06188887bf93bec4e64a3a5681b5e271cb7055a11d0667dc565e498b6190000000048473044022022ef03c33b5942b1af16f7e4a9acd2aa485d73f6f6b5e0a01e15f70238cd85cd022063779c69511ee4eba179b40ce28d80da22d43f19110be2a9a97d0b47d6a5cca201ffffffff045587699381853735482dbfb1fe25dda8d5a7a238c05b872ecfcd97be38232f00000000484730440220051e6047dd9e82b004c29a2837bf127f94caa638c65d96c761371c18ff36170002204e73ddfbbe748f295d7a93e46d942618f291d302b7a666b78b49ab38594a89ac01ffffffff0426d8098ed0c5ee19ac8d4254ec9887ab7a231c68a8d9b024a50f417f0a94ff0000000049483045022100ebd193262a04f8c9cf1872527d2a7d4933222f8ce8ea11add90e263c483ca56a02204a29902ae6b31dc41f84b5ffad3b2076755ad19f25be47479704b2ab5e37463a01ffffffff040e294b76ca4492909b75b829566b3702b35245595e8c4806b7ef6a7f612dd6000000004847304402201573d230af50aa6d326b607ac6ba77bb15c1a143256e5141197ce6729195b0e602201301be6ad22ba5599597205cdfb7e2cf6823ce4597e5b902b6d4336958e0fbe101ffffffff03d9a453070627c94d940f57b40829713ee6b6bce4d801e591117c801221225900000000494830450221009d5eec551265274ade816fdb3a0dfee20e716a7d3f56155b698a9d0c41ccd11202202e811c4611ebf982b34db8a43002c759c54a077023ced1498421c4af2b12a0f901ffffffff03ce7cb872bdfdf264576c45ed899c00731959051cade1a19b088eabc02e07780000000049483045022100a9c8c795e34a393fafb839ef4bbf11e4adf04b4c8a8493ef0bd2353e7a1ddd430220251ff7eb5ca3d2ed4ee4145906532af803caaed756ff3d21e86ac4876333067e01ffffffff030d66186013342f71335bc67d0d87240b4a27809e67ba55e01dd72e7ae1b0af0000000049483045022100d4c82867562aa040a7695ffd53056018e0dc3a071d971b3774cdb8511b0f49aa022029b72c5af1b9c16e27d81827d478910ec3135415037cf2b3492922ff618538bc01ffffffff02f9b92abfa0324272e0ce465b856e6d9b53e3e2e0828934c8a0c8c2c10e67d5000000004847304402205df4c99c581bfe95ea95740320b16c423531663b42e25b97315d3126250c24a202206dff5da29fbb0fe21ae6ce3da7bac1e502feb8fdd7b803c0fafa6541e80ec0ff01ffffffff02bd8679e8383e6d9c4a10917b68b8918ed3f518fe2deef5b23e0012461fbf370000000049483045022100a04210427173ea0721f3cf859b99328c8e234ba39250c033aebfb37fb2c5a1d502200d5cb16ed0dccc5dfc0385a8763340cf98a162e863994069354a5fee187b8bd401ffffffff031008f60500000000302ea22c8020c71ddb3aac7f9b9e4bdacf032aaa8b8e4433c4ff9f8a43cebb9c1f5da96928a48103120c008203000401cc604898000000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000266a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a000000003f0800000000000000000000000000",
  "txid": "09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293",
  "result": "success"
}
```

Copy the `hex` value to your clipboard. 

### Broadcast the hex Value and Retrieve the sendtxid

Use the [sendrawtransaction](../../komodo-api/wallet.html#sendrawtransaction) method to broadcast the raw hex value:

Command:

```bash
./komodo-cli -ac_name=MUSIG  sendrawtransaction 0400008085202f890b02b1bdd8707f82bc6f4cdeb4756eb04dfc3cc7a4b5ac38a388c0205cf8f31a0e0000000048473044022004de31b5132f03f761fc0d0d9761efbf77bb27b07ee99f2cc54928e2150f1f16022069381b36bb9839cc9cb3e1d584e00dbd52efadf7e2f3fa092e0bcca839cdce6801ffffffff04949d5bf1722c5df04f58cf2c7e662f32ab65de2f7990ce4c734df4f2991eb60000000049483045022100ab3ab2bb95ef095763dd3eeb56961d1234aa25efd91a30fa14e397717368e6a0022048d7f8268463cfb44f34467bd77eb2aee962eaec09a079741c75c5de898b4f6c01ffffffff0476a06188887bf93bec4e64a3a5681b5e271cb7055a11d0667dc565e498b6190000000048473044022022ef03c33b5942b1af16f7e4a9acd2aa485d73f6f6b5e0a01e15f70238cd85cd022063779c69511ee4eba179b40ce28d80da22d43f19110be2a9a97d0b47d6a5cca201ffffffff045587699381853735482dbfb1fe25dda8d5a7a238c05b872ecfcd97be38232f00000000484730440220051e6047dd9e82b004c29a2837bf127f94caa638c65d96c761371c18ff36170002204e73ddfbbe748f295d7a93e46d942618f291d302b7a666b78b49ab38594a89ac01ffffffff0426d8098ed0c5ee19ac8d4254ec9887ab7a231c68a8d9b024a50f417f0a94ff0000000049483045022100ebd193262a04f8c9cf1872527d2a7d4933222f8ce8ea11add90e263c483ca56a02204a29902ae6b31dc41f84b5ffad3b2076755ad19f25be47479704b2ab5e37463a01ffffffff040e294b76ca4492909b75b829566b3702b35245595e8c4806b7ef6a7f612dd6000000004847304402201573d230af50aa6d326b607ac6ba77bb15c1a143256e5141197ce6729195b0e602201301be6ad22ba5599597205cdfb7e2cf6823ce4597e5b902b6d4336958e0fbe101ffffffff03d9a453070627c94d940f57b40829713ee6b6bce4d801e591117c801221225900000000494830450221009d5eec551265274ade816fdb3a0dfee20e716a7d3f56155b698a9d0c41ccd11202202e811c4611ebf982b34db8a43002c759c54a077023ced1498421c4af2b12a0f901ffffffff03ce7cb872bdfdf264576c45ed899c00731959051cade1a19b088eabc02e07780000000049483045022100a9c8c795e34a393fafb839ef4bbf11e4adf04b4c8a8493ef0bd2353e7a1ddd430220251ff7eb5ca3d2ed4ee4145906532af803caaed756ff3d21e86ac4876333067e01ffffffff030d66186013342f71335bc67d0d87240b4a27809e67ba55e01dd72e7ae1b0af0000000049483045022100d4c82867562aa040a7695ffd53056018e0dc3a071d971b3774cdb8511b0f49aa022029b72c5af1b9c16e27d81827d478910ec3135415037cf2b3492922ff618538bc01ffffffff02f9b92abfa0324272e0ce465b856e6d9b53e3e2e0828934c8a0c8c2c10e67d5000000004847304402205df4c99c581bfe95ea95740320b16c423531663b42e25b97315d3126250c24a202206dff5da29fbb0fe21ae6ce3da7bac1e502feb8fdd7b803c0fafa6541e80ec0ff01ffffffff02bd8679e8383e6d9c4a10917b68b8918ed3f518fe2deef5b23e0012461fbf370000000049483045022100a04210427173ea0721f3cf859b99328c8e234ba39250c033aebfb37fb2c5a1d502200d5cb16ed0dccc5dfc0385a8763340cf98a162e863994069354a5fee187b8bd401ffffffff031008f60500000000302ea22c8020c71ddb3aac7f9b9e4bdacf032aaa8b8e4433c4ff9f8a43cebb9c1f5da96928a48103120c008203000401cc604898000000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000266a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a000000003f0800000000000000000000000000
```

Response:

```bash
09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293
```

The returned value is our `sendtxid`. Copy this to a secure location for later use.

### Obtain the change_script Value 

Decode the raw transaction to take note of the `hex` value in the `scriptPubKey` of the `vout` value that has the `"type":"pubkey"` key pair.

Command:

```bash
./komodo-cli -ac_name=MUSIG getrawtransaction 09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293 1
```

In the response there are a series of `vout` values, each of which has an array of json objects. Search for the `vout` value that has the `"type":"pubkey"` key pair listed. In this object, retrieve the `hex` value from the `scriptPubkey`:

```json
(omitted for brevity)

...

{
  "value": 0.0998,
  "valueSat": 9980000,
  "n": 1,
  "scriptPubKey": {
    "asm": "0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a OP_CHECKSIG",
    "hex": "210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac",
    "reqSigs": 1,
    "type": "pubkey",
    "addresses": ["RUfCUd3UryKJ49baQvSuAs42wakNunvvfT"]
  }
}

...

```

The `hex` value in the `scriptPubkey` object is our `change_script` value. Copy this value and save it to a secure location for later use.

### calcmsg

Use the `calcmsg` method to <!--do what?-->. The `calcmsg` method needs the `sendtxid` and `change_script` values retrieved from previous commands.

<!--Do these values need %22 around them? And escaped quotes?-->

**cclib calcmsg 18 '["insert_sendtxid_here","insert_change_script_here"]'**

Command:

```bash
./komodo-cli -ac_name=MUSIG  cclib calcmsg 18 '["09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293","210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac"]'
```

Response:

```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "result": "success"
}
```

Copy the `msg` value to a secure location for later use. The `msg` value needs to be signed to create a valid `spend` transaction.

### session

From this point forward, all steps should be executed on both nodes 1 and 2.

After each step on the first node, copy the relevant data to the second node before proceeding to the following step.

The following `session` command requires an array of arguments. The arguments are as follows:

1. `ind`: the index of the signatory in the set. In this example our current node, Node 1, is `0`
2. `numsigners`: the number of pubkeys participating in the multi-signature transaction
3. `combined_pk`: the `combined_pk` address, retrieved previously
4. `pkhash`: the `pkhas`, retrieved previously
5. `msg`: the `msg` to be signed, retrieved previously

#### Node 1

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib session 18 '[0,2,"03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9","3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603"]'
```

Response:

```json
{
  "myind": 0,
  "numsigners": 2,
  "commitment": "a886a3a3c57efec161f6f72554b66f837de89ffdabe0acc46ae4cd59aab8129e",
  "result": "success"
}
```

Copy the value of `commitment` to a secure location for later use, and also copy the `commitment` value to Node 2.

#### Node 2

Execute the same command as before, only change the `ind` value from `0` to `1`, to indicate Node 2.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib session 18 '[1,2,"03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9","3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603"]'
```

Response:

```json
{
  "myind": 1,
  "numsigners": 2,
  "commitment": "2854473733147ebdbf2fb70b956c8086c9d7659ca0093627fe0371098f8bc003",
  "result": "success"
}
```

Copy the `commitment` value to a secure location for later use, and also copy the `commitment` value to Node 1.

### commit

#### Node 1

The `commit` method requires an array of arguments. The arguments are as follows:

1. `pkhash`: the `pkhash` value, retrieved previously
2. `ind`: the index of the opposite node. In our example, Node 2 is `1`
3. `commitment`: the `commitment` value from the opposing node

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib commit 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"2854473733147ebdbf2fb70b956c8086c9d7659ca0093627fe0371098f8bc003"]'
```

Response:

```json
{
  "added_index": 1,
  "myind": 0,
  "nonce": "0379f6f42cf4c2cb30d064a6cac22ab6ffb3d93388d49b07f0623ff9bc8d191f89",
  "result": "success"
}
```

Copy the `nonce` value to a secure location, and also copy the `nonce` value to Node 2.

#### Node 2

Execute the same command as before, only change the value of `ind` to `0` to indicate Node 1.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib commit 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",0,"a886a3a3c57efec161f6f72554b66f837de89ffdabe0acc46ae4cd59aab8129e"]'
```

Response:

```json
{
  "added_index": 0,
  "myind": 1,
  "nonce": "02402fe26abd7ed2cf22d872a6b22ced4309aac8ec273b9c89e0f8f5b77f1574db",
  "result": "success"
}
```

Copy the `nonce` value to a secure location, and also copy the `nonce` value to Node 1.


### nonce

#### Node 1

The `nonce` method requires an array of arguments. The arguments are as follows:

1. `pkhash`: the `pkhash` value, retrieved previously
2. `ind`: the index of the opposing node. In our example, the index of Node 2 is `1`.
3. `nonce`: the `nonce` from the opposing node

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib nonce 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"02402fe26abd7ed2cf22d872a6b22ced4309aac8ec273b9c89e0f8f5b77f1574db"]'
```

Response:

```json
{
  "added_index": 1,
  "myind": 0,
  "partialsig": "dc913a9e7532c8edf2f822f482afdcf48c61919bf905fb77f6684a2d7e58d972",
  "result": "success"
}
```

Copy the `partialsig` value to a secure location, and also copy the `partialsig` value to Node 2.

#### Node 2

Execute the same command, only change the `ind` value to `0` to indicate Node 1, and change the `nonce` to the value retrieved from Node 1.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib nonce 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",0,"0379f6f42cf4c2cb30d064a6cac22ab6ffb3d93388d49b07f0623ff9bc8d191f89"]'
```

Response:

```json
{
  "added_index": 0,
  "myind": 1,
  "partialsig": "9e964dfd402f973ea1e9407e19918b1c3897ff6544d60dcdb19cfb0e5bc4c0c1",
  "result": "success"
}
```

Copy the `partialsig` value to a secure location, and also copy the `partialsig` value to Node 1.

### partialsig

#### Node 1

The `partialsig` method requires an array of arguments. The arguments are as follows:

1. `pkhash`: the `pkhash` value, retrieved previously
2. `ind`: the index of the opposing node. In our example, the index of Node 2 is `1`
3. `partialsig`: the `partialsig` retrieved from the opposing node

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib partialsig 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"9e964dfd402f973ea1e9407e19918b1c3897ff6544d60dcdb19cfb0e5bc4c0c1"]'
```

Response:

```json
{
  "added_index": 1,
  "result": "success",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"
}
```

Copy the `combinedsig` value to a secure location, and also copy the `combinedsig` value to Node 2.

#### Node 2

Execute the same command, but change the `ind` value to `0` to indicate Node 1, and change the `partialsig` to the value retrieved from Node 1 previously.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib partialsig 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",0,"dc913a9e7532c8edf2f822f482afdcf48c61919bf905fb77f6684a2d7e58d972"]'
```

Response:

```json
{
  "added_index": 0,
  "result": "success",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"
}
```

Copy the `combinedsig` value to a secure location.

If the values of `combinedsig` produced by both the nodes is the same, then you have followed the example without any errors to this point.

### verify

#### Node 1
The `verify` method requires an array of arguments. The arguments are as folows:

1. `msg`: the `msg` value, retrieved previously
2. `combined_pk`: the `combined_pk` value, retrieved previously
3. `combinedsig`: the `combinedsig` value, retrieved previously

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib verify 18 '["3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603","03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```

Response:

```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2",
  "result": "success"
}
```

Copy the `combinedsig` value to a secure location.

#### Node 2

Execute the same command on Node 2.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib verify 18 '["3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603","03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```

Response:

```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2",
  "result": "success"
}
```

Copy the `combinedsig` value to a secure location. It should match with the `combinedsig` value returned on Node 1.

The response from both nodes should display a `"result": "success"` key pair. If this is not the case, you made an error in a previous step.  

### spend

::: tip Note
Each node will output different raw transaction values, as both nodes are attempting to spend funds to their own wallets. Of the two, the node that broadcasts its returned raw transaction value first will receive the coins. The other node does not need to broadcast its raw transaction value.
:::

#### Node 1

We are now prepared to execute the `spend` method.

The `spend` method requires an array of arguments. The arguments are as follows:

1. `sendtxid`: the `sendtxid`, retrieved previously
2. `change_script`: the `change_script` value, retrieved previously
3. `combinedsig`: the `combinedsig` value, retrieved previously

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib spend 18 '["09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293","210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```

Response:

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

Copy the `hex` value to a secure location.

#### Node 2

Execute the same command:

```bash
./komodo-cli -ac_name=MUSIG cclib spend 18 '["09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293","210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```

Response:

```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2",
  "hex": "0400008085202f890193c200495d92c09a3eb527a552c129bf3c991a29478356f92870e1b65ca4da09000000007b4c79a276a072a26ba067a5658021032d29d6545a2aafad795d9cf50912ecade549137163934dfb2895ebc0e211ce8a81401272d03e011f002a464aa75e8c3d093d45a2c4865b7b334998c8dc2fbaa814c17a2f34c9746d2921483b884d577b86465095ce64a4716b4b5d2f0b578860e149a100af03800112a10001ffffffff0200e1f5050000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000686a4c6512792103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a404b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f200000000470800000000000000000000000000",
  "txid": "f0c64b8af416d4cafae01079d95be8ef3a84c88dcb68dc8e63907bb6a20455dd",
  "result": "success"
}
```

Copy the `hex` value to a secure location.

Both nodes have now executed the command, but the response on both nodes is only a raw transaction. One of the nodes must broadcast the raw `hex` value. The node that executes the `sendrawtransaction` method will receive the coins. The other node does not need to broadcast a `hex` value, and no attempt to broadcast the `hex` value will succeed. 

### sendrawtransaction

#### Node 1

Broadcast the `hex` value using `sendrawtransaction:

```bash
./komodo-cli -ac_name=MUSIG sendrawtransaction "0400008085202f890193c200495d92c09a3eb527a552c129bf3c991a29478356f92870e1b65ca4da09000000007b4c79a276a072a26ba067a5658021032d29d6545a2aafad795d9cf50912ecade549137163934dfb2895ebc0e211ce8a81401272d03e011f002a464aa75e8c3d093d45a2c4865b7b334998c8dc2fbaa814c17a2f34c9746d2921483b884d577b86465095ce64a4716b4b5d2f0b578860e149a100af03800112a10001ffffffff0200e1f5050000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000686a4c6512792103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a404b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f200000000470800000000000000000000000000"
```

Congratulations. You have now successfully executed a full cycle of the MuSig module. 


## combine

**cclib combine 18 '[ "pubkey1" , "pubkey2" , .....]'**

The `combine` method combines multiple pubkeys into a `combined_pk` address.

Usage of this method depends upon the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`. 

### Arguments:

| Name                   | Type     | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| pubkey1, pubkey2, .... | (string) | the pubkeys of all the signers of the MuSig address |

### Response:

| Name        | Type     | Description                                                   |
| ----------- | -------- | ------------------------------------------------------------- |
| pkhash      | (string) | the 32-byte hash of the original public keys                  |
| combined_pk | (string) | the combined pubkey of all the signers computed through MuSig |
| result      | (string) | whether the call executed successfully                     |

## send

**cclib send 18 '["combined_pk" , amount]'**

The `send` method sends coins to the indicated `combined_pk`.

Usage of this method depends upon the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`. 

### Arguments: 

| Name        | Type     | Description                                                   |
| ----------- | -------- | ------------------------------------------------------------- |
| combined_pk | (string) | the combined pubkey of all the signers computed through MuSig |
| amount      | (number) | the amount of coins to be sent to the `combined_pk`           |

### Response:

| Name   | Type     | Description                                               |
| ------ | -------- | --------------------------------------------------------- |
| hex    | (string) | the send_transaction in raw-transaction format, provided in hexadecimal |
| txid   | (string) | the transaction id of the send transaction                |
| result | (string) | whether the call executed successfully                 |

## calcmsg

**cclib calcmsg 18 '["sendtxid" , "scriptPubKey"]'**

The `calcmsg` method takes the indicated `sendtxid` and the indicated `scriptPubkey` and calculates the `msg` value.

Usage of this method depends on the [cclib](../komodo-api/cclib.html#cclib) method. The `EVALCODE` is `18`. 
The `scriptPubkey` argument can be any valid `pubkey`. To create a `scriptPubkey` from a normal `pubkey`, simply add the values `21` to the beginning of the `pubkey` string and the values `ac` to the end of the string:

```
scriptPubkey = 21 + pubkey + ac
```

For example:
* The `pubkey` is: `02f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193e`
* The `scriptPubkey` is: `2102f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193eac`

### Arguments: 

| Name         | Type     | Description                                                                                                                                                                                                                                                                                                                         |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendtxid     | (string) | the transaction id of the transaction created by the [send](../../dynamic/cc-musig.html#send-2) method that was executed to fund the MuSig address; only the funds in the `vout0` of the `sendtxid` are spent                                                                                                                                    |
| scriptPubKey | (string) | a modified form of a pubkey; this is the pubkey that will receive the spent funds.  |

### Response:

| Name   | Type     | Description                                                                                                                  |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| msg    | (string) | the message that must be signed by all the signers for the final [spend](../../dynamic/cc-musig.html#spend-2) to succeed |
| result | (string) | whether the call executed successfully                                                                                    |

### session

**cclib session 18 '["myindex" , "numsigners" , "combined_pk" , "pkhash" , "msg"]'**

#### Parameters

| Name        | Type             | Description                                                                                                                                |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| myindex     | (decimal number) | index of the node that is running this method; each node must be assigned a unique index from the set: {0,1,2,3, ... , (`numsigners` - 1)} |
| numsigners  | (decimal number) | the total number of signers participating                                                                                                  |
| combined_pk | (string)         | the combined pubkey of all the signers computed through MuSiG                                                                              |
| pkhash      | (string)         | the 32-byte hash of the original public keys                                                                                               |
| msg         | (string)         | the message that needs to be signed by all the signers for the final [spend](../../dynamic/cc-musig.html#spend-2) to succeed               |

#### Response

| Name       | Type             | Description                                                    |
| ---------- | ---------------- | -------------------------------------------------------------- |
| myind      | (decimal number) | index of the node in which this method has been run            |
| numsigners | (decimal number) | the total number of signers participating                      |
| commitment | (string)         | `commitment` produced by the node for this `msg` and `session` |
| result     | (string)         | whether the call was a success or failure                      |

### commit

**cclib commit 18 '["pkhash" , ind , "commitment"]'**

#### Parameters

| Name       | Type             | Description                                                               |
| ---------- | ---------------- | ------------------------------------------------------------------------- |
| pkhash     | (string)         | the 32-byte hash of the original public keys                              |
| ind        | (decimal number) | index of the node, whose `commitment` is being added to the global struct |
| commitment | (string)         | `commitment` produced by the node with index `ind`                        |

#### Response

| Name        | Type             | Description                                                    |
| ----------- | ---------------- | -------------------------------------------------------------- |
| added_index | (decimal number) | index of the node whose `commitment` has been added            |
| myind       | (decimal number) | index of the node in which this method has been run            |
| nonce       | (string)         | `nonce` produced by the node in which this method has been run |
| result      | (string)         | whether the call was a success or failure                      |

### nonce

**cclib nonce 18 '["pkhash" , ind , "nonce"]'**

#### Parameters

| Name   | Type             | Description                                                          |
| ------ | ---------------- | -------------------------------------------------------------------- |
| pkhash | (string)         | the 32-byte hash of the original public keys                         |
| ind    | (decimal number) | index of the node, whose `nonce` is being added to the global struct |
| nonce  | (string)         | `nonce` produced by the node with index `ind`                        |

#### Response

| Name        | Type             | Description                                                         |
| ----------- | ---------------- | ------------------------------------------------------------------- |
| added_index | (decimal number) | index of the node whose `nonce` has been added                      |
| myind       | (decimal number) | index of the node in which this method has been run                 |
| partialsig  | (string)         | `partialsig` produced by the node in which this method has been run |
| result      | (string)         | whether the call was a success or failure                           |

### partialsig

**cclib partialsig 18 '["pkhash" , ind , "partialsig"]'**

#### Parameters

#### Parameters

| Name       | Type             | Description                                                               |
| ---------- | ---------------- | ------------------------------------------------------------------------- |
| pkhash     | (string)         | the 32-byte hash of the original public keys                              |
| ind        | (decimal number) | index of the node, whose `partialsig` is being added to the global struct |
| partialsig | (string)         | `partialsig` produced by the node with index `ind`                        |

#### Response

| Name        | Type             | Description                                                          |
| ----------- | ---------------- | -------------------------------------------------------------------- |
| added_index | (decimal number) | index of the node whose `partialsig` has been added                  |
| myind       | (decimal number) | index of the node in which this method has been run                  |
| combinedsig | (string)         | `combinedsig` produced by the node in which this method has been run |
| result      | (string)         | whether the call was a success or failure                            |

### verify

**cclib verify 18 '["msg" , "combined_pk" , "combinedsig"]'**

#### Parameters

| Name        | Type     | Description                                                                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| msg         | (string) | the message that needs to be signed by all the signers for the final [spend](../../dynamic/cc-musig.html#spend-2) to succeed |
| combined_pk | (string) | the combined pubkey of all the signers computed through MuSig                                                                |
| combinedsig | (string) | `combinedsig` produced by the node in which this method is being run                                                         |

#### Response

| Name        | Type     | Description                                                                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| msg         | (string) | the message that needs to be signed by all the signers for the final [spend](../../dynamic/cc-musig.html#spend-2) to succeed |
| combinedsig | (string) | `combinedsig` produced by the node in which this method is being run                                                         |
| combined_pk | (string) | the combined pubkey of all the signers computed through MuSig                                                                |
| result      | (string)         | whether the call was a success or failure                            |

### spend

**cclib spend 18 '["sendtxid" , "combinedsig" , "scriptPubKey"]'**

#### Parameters

| Name         | Type     | Description                                                                                                                                                                                                                                                                                                                         |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendtxid     | (string) | the transaction id of the transaction created by the [send](../../dynamic/cc-musig.html#send-2) method used to fund the MuSig address; only the funds in the `vout0` of the `sendtxid` are spent                                                                                                                                    |
| combinedsig  | (string) | the combined signature produced by all the signers                                                                                                                                                                                                                                                                                  |
| scriptPubKey | (string) | a modified form of a pubkey to which funds are to be spent; modification: concatenate `21` at the beginning and `ac` at the end of the pubkey; If pubkey is `02f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193e` then scriptPubkey will be `2102f7597468703c1c5c8465dd6d43acaae697df9df30bed21494d193412a1ea193eac` |

<!--
FIXME:
The description of scriptPubkey needs to be made more coherent
-->

#### Response

| Name        | Type     | Description                                                                                                                  |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| msg         | (string) | the message that needs to be signed by all the signers for the final [spend](../../dynamic/cc-musig.html#spend-2) to succeed |
| combined_pk | (string) | the combined pubkey of all the signers computed through MuSig                                                                |
| combinedsig | (string) | the combined signature produced by all the signers                                                                           |
| hex         | (string) | `spend` transaction in rawtransaction format; in hexadecimal                                                                 |
| txid        | (string) | the transaction id of the spend transaction                                                                                  |
| result      | (string) | whether the call was a success or failure                                                                                    |


