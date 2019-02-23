# Module: MuSig (In Development)

::: warning
This module is under heavy development development. The document is here for testing purposes. It is incomplete and may contain some errors. If you find any info is missing or not accurate, please let us know at `#cc-musig` channel in the [Komodo Discord](https://komodoplatform.com/discord).
:::

This module is under heavy development and this guide is specifically for testing.

## Introduction

::: tip

- RPC are in the comments of the file:
  - [komodo/src/cc/musig.cpp](https://github.com/jl777/komodo/blob/jl777/src/cc/musig.cpp)
- There are comments in the following files that describe musig:
  - [komodo/src/secp256k1/include/secp256k1_musig.h](https://github.com/jl777/komodo/blob/jl777/src/secp256k1/include/secp256k1_musig.h)
  - [komodo//src/secp256k1/src/modules/musig/example.c](https://github.com/jl777/komodo/blob/jl777/src/secp256k1/src/modules/musig/example.c)

:::

The module `MuSig` implements a Schnorr-based multi-signature scheme, that produces "Short, constant-size signatures which look the same to verifiers regardless of signer set" and has "Provable security in the plain public key model.". See this [article](https://blockstream.com/2019/02/18/musig-a-new-multisignature-standard/) for more information.

## Install Dependencies

These are a must and you need to make sure all the dependencies are installed correctly

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

## Build instructions

```bash
git clone https://github.com/jl777/komodo
cd komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

then

```bash
cd src/cc
./makecclib
cd ../..
make -j$(nproc)
```

### Update

```bash
cd komodo
git checkout jl777
git pull
cd src/cc
./makecclib
cd ../..
make -j$(nproc)
```

## Chain params

In the directory `komodo/src/`

```bash
./komodod -ac_name=MUSIG -ac_supply=100000 -ac_reward=10000000 -pubkey=<yourpub> -ac_cclib=sudoku -ac_cc=2 -addnode=5.9.102.210 &
```

Learn about setting the pubkey [here.](../../cryptoconditions/dynamic/cc-rogue.html##set-pubkey-value)

### Get funds to test

In the directory `komodo/src/`

::: tip
Import the private key corresponding to the pubkey used to start the daemon using the [importprivkey](../../komodo-api/wallet.html#importprivkey) RPC.
:::

```bash
./komodo-cli -ac_name=MUSIG faucetget
# copy the hex in the response
./komodo-cli -ac_name=MUSIG sendrawtransaction <hex copied from the above response>
```

## Work flow when using MuSig

- First make a combined pubkey using the method [combine.](../dynamic/cc-musig.html#combine) From the response, take note of `combined_pk` and `pkhash`
- Next, send some coins to the `combined_pk` using the method [send.](../dynamic/cc-musig.html#send) From the decoded rawtransaction, take note of the `change_script` and `sendtxid`<!-- expalin what these two are -->
- Now calculate the message that needs to be signed by all the parties using the method [calcmsg,](../dynamic/cc-musig.html#calcmsg) which uses `change_script` and `sendtxid` as inputs. From the response, take note of `msg`. To create a valid spend, this `msg` needs to be signed by all the participating pubkeys.
- On each signing node, a session needs to be creted using the method [session,](../dynamic/cc-musig.html#session) which takes the follwing arguments as inputs: `ind` (index; node with the first pubkey gets `0`),`numsigners` (number of pubkeys participating), `combined_pk`, `pkhash`, `msg` (message to be signed). From the response on each node, take note of the `commitment` and send all the `commitment`s to all the other nodes.

::: warning

- The [session](../dynamic/cc-musig.html#session) method stores the commitment for each node into the global struct.
- Keep in mind there is a single global struct with the `session` unique to each `cclib session` call.
- This means that restarting any deamon in the middle of the process on any of the nodes results in a failure.
- Also `cclib session` method can't called more than a single time on each node during the whole process.
- This is an artificial restriction just to simplify the initial implementation of MuSig

:::

- On each node, use the method [commit,](../dynamic/cc-musig.html#commit)
  which takes the arguments: `pkhash` and `commitment`s from all the other nodes to output `nonce`s. Make sure to exchange the `nonce`s from all the nodes so that each node will have `nonce`s from all the other nodes.
- On each node, use the method [nonce,](../dynamic/cc-musig.html#nonce)
  which takes the arguments: `pkhash` and `nonce`s from all the other nodes to output `partialsig`s. Make sure to exchange the `partialsig`s from all the nodes so that each node will have `partialsig`s from all the other nodes.
- Finally, on each node, use the method [partialsig,](../dynamic/cc-musig.html#partialsig)
  which takes the arguments: `pkhash` and `partialsig`s from all the other nodes to output `combinedsig`s. Make sure to exchange the `combinedsig`s from all the nodes so that each node will have `combinedsig`s from all the other nodes. You can verify that all the nodes produced the same `combinedsig`.
- Now, for a sanity test, the method [verify](../dynamic/cc-musig.html#verify) can be used to make sure that, this `combinedsig` will work with the `msg` needed for the spend. It takes the arguments `msg`,`combined_pk`, `combinedsig`. <!-- what does it output -->
- Now the [spend](../dynamic/cc-musig.html#spend) part. This method takes `sendtxid`,`change_script`,`combinedsig` as inputs. <!-- who can spend, how much,something is missing here -->

## Available methods

These methods can be used through the RPC call: [cclib](../../komodo-api/cclib.html#cclib)

### combine

### send

### calcmsg

### session

### commit

### nonce

### partialsig

### verify

### spend
