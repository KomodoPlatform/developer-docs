---
sidebarDepth: 3
---

# Test komodo source from jl777 branch to make sure all the assetchains sync from scratch properly

## Purpose

The perpose of this test is to check if the komodo source from jl777 branch has no issues compiling, all assetchains starts and syncs fully from scratch, no stuck chains. You can use this guide for any branch you want to test, just change the branch name in clone and compile section.

::: tip Note
This doc is similar to compiling komodo with an additional `verify` script. Please make sure you are not testing this in a node with funds. This doc is intended for test nodes/computer. If you have funds in your assetchains please backup your wallet and private key. The information in this doc may change in the future to update.
:::

## Steps

1. Install Dependencies (most needed for the first time)
1. Clone komodo repo and compile
1. Create komodo.conf file and clear all assetchaiins dir from .komodo data dir
1. Start AC using ./assetchains.old and let them sync (it may take a while)
1. Verify the assetchains

## Details

### 1. Install dependencies

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate vim software-properties-common curl libcurl4-gnutls-dev cmake clang jq libsodium-dev -y
```

### 2. Clone, Compile & Symlink

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
sudo ln -sf /home/$USER/komodo/src/komodo-cli /usr/local/bin/komodo-cli
sudo ln -sf /home/$USER/komodo/src/komodod /usr/local/bin/komodod
sudo chmod +x /usr/local/bin/komodo-cli
sudo chmod +x /usr/local/bin/komodod
```

### 3. Create `komodo.conf` & clear existing assetchains database and files

Create `komodo.conf`

```bash
cd ~/.komodo
nano komodo.conf
```

Paste the following content inside the file and save it. Don't forget to change values for `rpcuser` & `rpcpassword`.

```bash
rpcuser=username
rpcpassword=password
txindex=1
bind=127.0.0.1
rpcbind=127.0.0.1
```

Remove existing assetchain block database and files

```bash
cd ~/.komodo
rm -rf AXO  BEER  BET  BNTN  BOTS  BTCH  CEAL  CHAIN  COQUI  CRYPTO  DEX  DSEC  ETOMIC  HODL  JUMBLR  KV  MESH  MGW  MNZ  MSHARK  NINJA  OOT  PANGEA  PIZZA  PRLPAY  REVS  SUPERNET  WLC
```

### 4. Start all assetchains

```bash
cd ~/komodo/src
./assetchains.old
```

Wait for all sync to finish before proceeding to next step. This may take a while depending your hardware and internet connection

### 5a. Create verify script and get coinlist file

```bash
cd ~
wget -qO coinlist https://raw.githubusercontent.com/KomodoPlatform/komodotools/master/webworker01/coinlist
nano verify
```

Paste the following content into it and save the file

```bash
#!/bin/bash

source coinlist
forked=false

for coins in "${coinlist[@]}"; do
    coin=($coins)

    blocks=$(komodo-cli -ac_name=${coin[0]} getinfo | jq .blocks)
    longest=$(komodo-cli -ac_name=${coin[0]} getinfo | jq .longestchain)

    if ((blocks < longest)); then
        forked=true
        printf "\033[0;31m${coin[0]} - Possible fork!\033[0m Blocks $blocks < LongestChain $longest\n"
    else
        echo "${coin[0]} - Blocks $blocks = LongestChain $longest"
    fi
done

if [ "$forked" = false ]; then
    printf "\033[0;32mAll coins are fine\033[0m\n"
fi
```

change permission of `verify` script

```bash
chmod +x verify
```

### 5b. Verify the block height

```bash
./verify
```

Result: The result will be similar to below. At the end of the output you will see All coins are fine.

```bash
KMD - Blocks 842790 = LongestChain 842790
CHIPS - Blocks 1987211 = Headers 1987211
REVS - Blocks 162517 = LongestChain 162517
SUPERNET - Blocks 221024 = LongestChain 221024
DEX - Blocks 179547 = LongestChain 179547
PANGEA - Blocks 18770 = LongestChain 18770
JUMBLR - Blocks 153932 = LongestChain 153932
BET - Blocks 47470 = LongestChain 47470
CRYPTO - Blocks 31645 = LongestChain 31645
HODL - Blocks 65524 = LongestChain 65524
MSHARK - Blocks 152851 = LongestChain 152851
BOTS - Blocks 141093 = LongestChain 141093
MGW - Blocks 21237 = LongestChain 21237
COQUI - Blocks 86948 = LongestChain 86948
WLC - Blocks 224671 = LongestChain 224671
KV - Blocks 59329 = LongestChain 59329
CEAL - Blocks 31095 = LongestChain 31095
MESH - Blocks 20467 = LongestChain 20467
MNZ - Blocks 87188 = LongestChain 87188
AXO - Blocks 8731 = LongestChain 8731
ETOMIC - Blocks 17931 = LongestChain 17931
BTCH - Blocks 49431 = LongestChain 49431
PIZZA - Blocks 31850 = LongestChain 31850
BEER - Blocks 37853 = LongestChain 37853
NINJA - Blocks 8102 = LongestChain 8102
OOT - Blocks 41106 = LongestChain 41106
BNTN - Blocks 39911 = LongestChain 39911
CHAIN - Blocks 2722 = LongestChain 2722
PRLPAY - Blocks 1335 = LongestChain 1335
DSEC - Blocks 230 = LongestChain 230
All coins are fine
```
