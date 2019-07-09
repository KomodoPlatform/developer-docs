# Musig Module Tutorial

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

Compile the appropriate library:

```bash
cd src/cc
./makecclib
cp sudokucc.so ../libcc.so
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

- [Instructions for obtaining and setting a pubkey](../customconsensus/custom-consensus-instructions.html#creating-and-launching-with-a-pubkey)

Once the asset chain is relaunched with the new pubkey included as a launch parameter, the MuSig asset chain is prepared for use.

### Acquire Funds for Testing

::: tip Note

The reader should launch the asset chain with a pubkey whose private key is already imported to the wallet. If this is not the case, restart the asset chain with an appropriate pubkey, or use the [importprivkey](../komodo-api/wallet.html#importprivkey) method to import the private key of the desired pubkey.

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

This method returns a hex value in the terminal. Select the entire hex value and copy it to the clipboard. (Use `CTRL + SHFT + C` to copy within the terminal)

Broadcast the hex value using the `sendrawtransaction` method:

```bash
./komodo-cli -ac_name=MUSIG sendrawtransaction <hex copied from the above response>
```

Wait for the transaction to be confirmed.

Once the broadcast transaction is confirmed, check the balance using the `getbalance` method:

```bash
./komodo-cli -ac_name=MUSIG getbalance
```

There should be a small amount of funds in the balance.

## Full Example

The aim of this example is to create a `20f2` MuSig pubkey, fund it, and spend from it.

To accomplish this, two nodes are necessary.

In this MuSig example we use the following pubkeys on our two nodes:

- Node1's daemon is launched using the pubkey: `0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a`
- Node2's daemon is launched using the pubkey: `02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567`

The `EVALCODE` for the MuSig module is `18`.

For this example, we use [the normal array formatting for `cclib` methods](../komodo-api/cclib.html#cclib-formatting), as we are not creating a bash script.

Steps 1 through 5 and 11 through 12 need to be executed only on the first node.

#### Step 1: combine

Use the [combine](../customconsensus/musig.html#combine) method to create a `combined_pk` address:

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib combine 18 '["0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a","02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567"]'
```


<collapse-text hidden title="Response">


```json
{
  "pkhash": "8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "result": "success"
}
```

</collapse-text>


Copy the values of `pkhash` and `combined_pk` and save them in a secure location for later use.

#### Step 2: send

Use the [send](../customconsensus/musig.html#send) method to send `1` coin to the `combined_pk` address:

Command:

```bash
./komodo-cli -ac_name=MUSIG  cclib send 18 '["03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",1]'
```


<collapse-text hidden title="Response">


```json
{
  "hex": "0400008085202f890b02b1bdd8707f82bc6f4cdeb4756eb04dfc3cc7a4b5ac38a388c0205cf8f31a0e0000000048473044022004de31b5132f03f761fc0d0d9761efbf77bb27b07ee99f2cc54928e2150f1f16022069381b36bb9839cc9cb3e1d584e00dbd52efadf7e2f3fa092e0bcca839cdce6801ffffffff04949d5bf1722c5df04f58cf2c7e662f32ab65de2f7990ce4c734df4f2991eb60000000049483045022100ab3ab2bb95ef095763dd3eeb56961d1234aa25efd91a30fa14e397717368e6a0022048d7f8268463cfb44f34467bd77eb2aee962eaec09a079741c75c5de898b4f6c01ffffffff0476a06188887bf93bec4e64a3a5681b5e271cb7055a11d0667dc565e498b6190000000048473044022022ef03c33b5942b1af16f7e4a9acd2aa485d73f6f6b5e0a01e15f70238cd85cd022063779c69511ee4eba179b40ce28d80da22d43f19110be2a9a97d0b47d6a5cca201ffffffff045587699381853735482dbfb1fe25dda8d5a7a238c05b872ecfcd97be38232f00000000484730440220051e6047dd9e82b004c29a2837bf127f94caa638c65d96c761371c18ff36170002204e73ddfbbe748f295d7a93e46d942618f291d302b7a666b78b49ab38594a89ac01ffffffff0426d8098ed0c5ee19ac8d4254ec9887ab7a231c68a8d9b024a50f417f0a94ff0000000049483045022100ebd193262a04f8c9cf1872527d2a7d4933222f8ce8ea11add90e263c483ca56a02204a29902ae6b31dc41f84b5ffad3b2076755ad19f25be47479704b2ab5e37463a01ffffffff040e294b76ca4492909b75b829566b3702b35245595e8c4806b7ef6a7f612dd6000000004847304402201573d230af50aa6d326b607ac6ba77bb15c1a143256e5141197ce6729195b0e602201301be6ad22ba5599597205cdfb7e2cf6823ce4597e5b902b6d4336958e0fbe101ffffffff03d9a453070627c94d940f57b40829713ee6b6bce4d801e591117c801221225900000000494830450221009d5eec551265274ade816fdb3a0dfee20e716a7d3f56155b698a9d0c41ccd11202202e811c4611ebf982b34db8a43002c759c54a077023ced1498421c4af2b12a0f901ffffffff03ce7cb872bdfdf264576c45ed899c00731959051cade1a19b088eabc02e07780000000049483045022100a9c8c795e34a393fafb839ef4bbf11e4adf04b4c8a8493ef0bd2353e7a1ddd430220251ff7eb5ca3d2ed4ee4145906532af803caaed756ff3d21e86ac4876333067e01ffffffff030d66186013342f71335bc67d0d87240b4a27809e67ba55e01dd72e7ae1b0af0000000049483045022100d4c82867562aa040a7695ffd53056018e0dc3a071d971b3774cdb8511b0f49aa022029b72c5af1b9c16e27d81827d478910ec3135415037cf2b3492922ff618538bc01ffffffff02f9b92abfa0324272e0ce465b856e6d9b53e3e2e0828934c8a0c8c2c10e67d5000000004847304402205df4c99c581bfe95ea95740320b16c423531663b42e25b97315d3126250c24a202206dff5da29fbb0fe21ae6ce3da7bac1e502feb8fdd7b803c0fafa6541e80ec0ff01ffffffff02bd8679e8383e6d9c4a10917b68b8918ed3f518fe2deef5b23e0012461fbf370000000049483045022100a04210427173ea0721f3cf859b99328c8e234ba39250c033aebfb37fb2c5a1d502200d5cb16ed0dccc5dfc0385a8763340cf98a162e863994069354a5fee187b8bd401ffffffff031008f60500000000302ea22c8020c71ddb3aac7f9b9e4bdacf032aaa8b8e4433c4ff9f8a43cebb9c1f5da96928a48103120c008203000401cc604898000000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000266a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a000000003f0800000000000000000000000000",
  "txid": "09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293",
  "result": "success"
}
```

</collapse-text>


Copy the `hex` value to your clipboard.

#### Step 3: Broadcast the hex Value and Retrieve the sendtxid

Use the [sendrawtransaction](../komodo-api/wallet.html#sendrawtransaction) method to broadcast the raw hex value:

Command:

```bash
./komodo-cli -ac_name=MUSIG  sendrawtransaction 0400008085202f890b02b1bdd8707f82bc6f4cdeb4756eb04dfc3cc7a4b5ac38a388c0205cf8f31a0e0000000048473044022004de31b5132f03f761fc0d0d9761efbf77bb27b07ee99f2cc54928e2150f1f16022069381b36bb9839cc9cb3e1d584e00dbd52efadf7e2f3fa092e0bcca839cdce6801ffffffff04949d5bf1722c5df04f58cf2c7e662f32ab65de2f7990ce4c734df4f2991eb60000000049483045022100ab3ab2bb95ef095763dd3eeb56961d1234aa25efd91a30fa14e397717368e6a0022048d7f8268463cfb44f34467bd77eb2aee962eaec09a079741c75c5de898b4f6c01ffffffff0476a06188887bf93bec4e64a3a5681b5e271cb7055a11d0667dc565e498b6190000000048473044022022ef03c33b5942b1af16f7e4a9acd2aa485d73f6f6b5e0a01e15f70238cd85cd022063779c69511ee4eba179b40ce28d80da22d43f19110be2a9a97d0b47d6a5cca201ffffffff045587699381853735482dbfb1fe25dda8d5a7a238c05b872ecfcd97be38232f00000000484730440220051e6047dd9e82b004c29a2837bf127f94caa638c65d96c761371c18ff36170002204e73ddfbbe748f295d7a93e46d942618f291d302b7a666b78b49ab38594a89ac01ffffffff0426d8098ed0c5ee19ac8d4254ec9887ab7a231c68a8d9b024a50f417f0a94ff0000000049483045022100ebd193262a04f8c9cf1872527d2a7d4933222f8ce8ea11add90e263c483ca56a02204a29902ae6b31dc41f84b5ffad3b2076755ad19f25be47479704b2ab5e37463a01ffffffff040e294b76ca4492909b75b829566b3702b35245595e8c4806b7ef6a7f612dd6000000004847304402201573d230af50aa6d326b607ac6ba77bb15c1a143256e5141197ce6729195b0e602201301be6ad22ba5599597205cdfb7e2cf6823ce4597e5b902b6d4336958e0fbe101ffffffff03d9a453070627c94d940f57b40829713ee6b6bce4d801e591117c801221225900000000494830450221009d5eec551265274ade816fdb3a0dfee20e716a7d3f56155b698a9d0c41ccd11202202e811c4611ebf982b34db8a43002c759c54a077023ced1498421c4af2b12a0f901ffffffff03ce7cb872bdfdf264576c45ed899c00731959051cade1a19b088eabc02e07780000000049483045022100a9c8c795e34a393fafb839ef4bbf11e4adf04b4c8a8493ef0bd2353e7a1ddd430220251ff7eb5ca3d2ed4ee4145906532af803caaed756ff3d21e86ac4876333067e01ffffffff030d66186013342f71335bc67d0d87240b4a27809e67ba55e01dd72e7ae1b0af0000000049483045022100d4c82867562aa040a7695ffd53056018e0dc3a071d971b3774cdb8511b0f49aa022029b72c5af1b9c16e27d81827d478910ec3135415037cf2b3492922ff618538bc01ffffffff02f9b92abfa0324272e0ce465b856e6d9b53e3e2e0828934c8a0c8c2c10e67d5000000004847304402205df4c99c581bfe95ea95740320b16c423531663b42e25b97315d3126250c24a202206dff5da29fbb0fe21ae6ce3da7bac1e502feb8fdd7b803c0fafa6541e80ec0ff01ffffffff02bd8679e8383e6d9c4a10917b68b8918ed3f518fe2deef5b23e0012461fbf370000000049483045022100a04210427173ea0721f3cf859b99328c8e234ba39250c033aebfb37fb2c5a1d502200d5cb16ed0dccc5dfc0385a8763340cf98a162e863994069354a5fee187b8bd401ffffffff031008f60500000000302ea22c8020c71ddb3aac7f9b9e4bdacf032aaa8b8e4433c4ff9f8a43cebb9c1f5da96928a48103120c008203000401cc604898000000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000266a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a000000003f0800000000000000000000000000
```


<collapse-text hidden title="Response">


```bash
09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293
```

</collapse-text>


The returned value is our `sendtxid`. Copy this to a secure location for later use.

#### Step 4: Obtain the change_script Value

Use the [getrawtransaction](../komodo-api/rawtransactions.html#getrawtransaction) method to decode the raw transaction. 

Command:

```bash
./komodo-cli -ac_name=MUSIG getrawtransaction 09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293 1
```

In the response there are a series of `vout` values, each of which has an array of json objects. Search for the `vout` value that has the `"type":"pubkey"` key pair listed. In this object, retrieve the `hex` value from the `scriptPubkey`:

```json

... (omitted for brevity) ...

"vout": [

    ... (omitted for brevity) ...

    {
      "value": 0.09980000,
      "valueSat": 9980000,
      "n": 1,
      "scriptPubKey": {
        "asm": "0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a OP_CHECKSIG",
        "hex": "210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "RUfCUd3UryKJ49baQvSuAs42wakNunvvfT"
        ]
      }
    },

    ... (omitted for brevity) ...

  ]

... (omitted for brevity) ...

```

This `hex` is our `change_script` value. Save this to a secure location for later use.

#### Step 5: calcmsg

Use the `calcmsg` method to calculate the `msg` value. The `calcmsg` method needs the `sendtxid` and `change_script` values retrieved from previous commands.

**cclib calcmsg 18 '["insert_sendtxid_here","insert_change_script_here"]'**

Command:

```bash
./komodo-cli -ac_name=MUSIG  cclib calcmsg 18 '["09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293","210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac"]'
```


<collapse-text hidden title="Response">


```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "result": "success"
}
```

</collapse-text>


Copy the `msg` value to a secure location for later use.

#### Step 6: session

From this point forward, all steps should be executed on both nodes 1 and 2.

After each step performed on each node, copy the relevant data to the opposing node.

##### Node 1

The following `session` command requires an array of arguments. The arguments are as follows:

1. `ind`: the index of the signatory in the set. In this example our current node, Node 1, is `0`
2. `numsigners`: the number of pubkeys participating in the multi-signature transaction
3. `combined_pk`: the `combined_pk` address, retrieved previously
4. `pkhash`: the `pkhash` value, retrieved previously
5. `msg`: the `msg` to be signed, retrieved previously

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib session 18 '[0,2,"03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9","3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603"]'
```


<collapse-text hidden title="Response">


```json
{
  "myind": 0,
  "numsigners": 2,
  "commitment": "a886a3a3c57efec161f6f72554b66f837de89ffdabe0acc46ae4cd59aab8129e",
  "result": "success"
}
```

</collapse-text>


Copy the value of `commitment` both to a secure location and to Node 2.

##### Node 2

Execute the same command as before, only change the `ind` value from `0` to `1` to indicate Node 2.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib session 18 '[1,2,"03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9","3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603"]'
```


<collapse-text hidden title="Response">


```json
{
  "myind": 1,
  "numsigners": 2,
  "commitment": "2854473733147ebdbf2fb70b956c8086c9d7659ca0093627fe0371098f8bc003",
  "result": "success"
}
```

</collapse-text>


Copy the `commitment` value both to a secure location and to Node 1.

#### Step 7: commit

##### Node 1

The `commit` method requires an array of arguments. The arguments are as follows:

1. `pkhash`: the `pkhash` value, retrieved previously
2. `ind`: the index of the opposite node. In our example, Node 2 is `1`
3. `commitment`: the `commitment` value from the opposing node

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib commit 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"2854473733147ebdbf2fb70b956c8086c9d7659ca0093627fe0371098f8bc003"]'
```


<collapse-text hidden title="Response">


```json
{
  "added_index": 1,
  "myind": 0,
  "nonce": "0379f6f42cf4c2cb30d064a6cac22ab6ffb3d93388d49b07f0623ff9bc8d191f89",
  "result": "success"
}
```

</collapse-text>


Copy the `nonce` value both to a secure location and to Node 2.

##### Node 2

Execute the same command as before, only change the value of `ind` to `0` to indicate Node 1.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib commit 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",0,"a886a3a3c57efec161f6f72554b66f837de89ffdabe0acc46ae4cd59aab8129e"]'
```


<collapse-text hidden title="Response">


```json
{
  "added_index": 0,
  "myind": 1,
  "nonce": "02402fe26abd7ed2cf22d872a6b22ced4309aac8ec273b9c89e0f8f5b77f1574db",
  "result": "success"
}
```

</collapse-text>


Copy the `nonce` value both to a secure location and to Node 1.

#### Step 8: nonce

##### Node 1

The `nonce` method requires an array of arguments. The arguments are as follows:

1. `pkhash`: the `pkhash` value, retrieved previously
2. `ind`: the index of the opposing node. In our example, the index of Node 2 is `1`.
3. `nonce`: the `nonce` from the opposing node

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib nonce 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"02402fe26abd7ed2cf22d872a6b22ced4309aac8ec273b9c89e0f8f5b77f1574db"]'
```


<collapse-text hidden title="Response">


```json
{
  "added_index": 1,
  "myind": 0,
  "partialsig": "dc913a9e7532c8edf2f822f482afdcf48c61919bf905fb77f6684a2d7e58d972",
  "result": "success"
}
```

</collapse-text>


Copy the `partialsig` value both to a secure location and to Node 2.

##### Node 2

Execute the same command, only change the `ind` value to `0` to indicate Node 1, and change the `nonce` to the value retrieved from Node 1.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib nonce 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",0,"0379f6f42cf4c2cb30d064a6cac22ab6ffb3d93388d49b07f0623ff9bc8d191f89"]'
```


<collapse-text hidden title="Response">


```json
{
  "added_index": 0,
  "myind": 1,
  "partialsig": "9e964dfd402f973ea1e9407e19918b1c3897ff6544d60dcdb19cfb0e5bc4c0c1",
  "result": "success"
}
```

</collapse-text>


Copy the `partialsig` value both to a secure location and to Node 1.

#### Step 9: partialsig

##### Node 1

The `partialsig` method requires an array of arguments. The arguments are as follows:

1. `pkhash`: the `pkhash` value, retrieved previously
2. `ind`: the index of the opposing node. In our example, the index of Node 2 is `1`
3. `partialsig`: the `partialsig` retrieved from the opposing node

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib partialsig 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",1,"9e964dfd402f973ea1e9407e19918b1c3897ff6544d60dcdb19cfb0e5bc4c0c1"]'
```


<collapse-text hidden title="Response">


```json
{
  "added_index": 1,
  "result": "success",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"
}
```

</collapse-text>


Copy the `combinedsig` value both to a secure location and to Node 2.

##### Node 2

Execute the same command, but change the `ind` value to `0` to indicate Node 1, and change the `partialsig` to the value retrieved from Node 1 previously.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib partialsig 18 '["8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",0,"dc913a9e7532c8edf2f822f482afdcf48c61919bf905fb77f6684a2d7e58d972"]'
```


<collapse-text hidden title="Response">


```json
{
  "added_index": 0,
  "result": "success",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"
}
```

</collapse-text>


Copy the `combinedsig` value to a secure location.

If the values of `combinedsig` produced by both nodes is the same, then you have followed the example without any errors to this point. Visually verify that this `combinedsig` value matches with the `combinedsig` value returned on Node 1.

#### Step 10: verify

##### Node 1

The `verify` method requires an array of arguments. The arguments are as follows:

1. `msg`: the `msg` value, retrieved previously
2. `combined_pk`: the `combined_pk` value, retrieved previously
3. `combinedsig`: the `combinedsig` value, retrieved previously

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib verify 18 '["3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603","03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```


<collapse-text hidden title="Response">


```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2",
  "result": "success"
}
```

</collapse-text>


##### Node 2

Execute the same command on Node 2.

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib verify 18 '["3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603","03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```


<collapse-text hidden title="Response">


```json
{
  "msg": "3ef43614242afd3c57e02a75a3bc99342fea7c731f6190b791c0f99826789603",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "combinedsig": "4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2",
  "result": "success"
}
```

</collapse-text>


The response from both nodes should display a `"result": "success"` key pair. If this is not the case, you made an error in a previous step.

#### Step 11: spend

::: tip Note
Currently, each node will output different raw transaction values, as both nodes are attempting to spend funds to their own wallets. Of the two, the node that broadcasts its returned raw transaction value first will receive the coins. The other node does not need to create or broadcast a transaction value.
:::

##### Node 1

We are now prepared to execute the `spend` method.

The `spend` method requires an array of arguments. The arguments are as follows:

1. `sendtxid`: the `sendtxid`, retrieved previously
2. `change_script`: the `change_script` value, retrieved previously
3. `combinedsig`: the `combinedsig` value, retrieved previously

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib spend 18 '["09daa45cb6e17028f9568347291a993cbf29c152a527b53e9ac0925d4900c293","210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac","4b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f2"]'
```


<collapse-text hidden title="Response">


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

</collapse-text>


Copy the `hex` value to a secure location.

##### Node 2

In this example, our desire is to receive the transferred coins on Node 1, not on Node 2.

Therefore, it is not necessary to execute the `spend` method again, nor is it necessary for Node 2 to execute the following step.

#### Step 12: sendrawtransaction

##### Node 1

Broadcast the `hex` value using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction):

```bash
./komodo-cli -ac_name=MUSIG sendrawtransaction "0400008085202f890193c200495d92c09a3eb527a552c129bf3c991a29478356f92870e1b65ca4da09000000007b4c79a276a072a26ba067a5658021032d29d6545a2aafad795d9cf50912ecade549137163934dfb2895ebc0e211ce8a81401272d03e011f002a464aa75e8c3d093d45a2c4865b7b334998c8dc2fbaa814c17a2f34c9746d2921483b884d577b86465095ce64a4716b4b5d2f0b578860e149a100af03800112a10001ffffffff0200e1f5050000000023210225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270aac0000000000000000686a4c6512792103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a404b3a9b2b162802bc6c2cca2d22e70ab1cf738a9d4f5692f4f881d0cce0319c137b27889bb562602c94e163729c4168120a4ab41a8e936909e832e6af09e758f200000000470800000000000000000000000000"
```

Once the broadcast transaction is mined and notarized, the MuSig transaction is complete.

You have now successfully executed a full cycle of the MuSig module.


