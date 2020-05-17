# Setup Komodo Notary Node

::: tip Disclaimer
This guide is here to give guidance and a general understanding on building a Komodo Notary Node server. It is possible that some instructions could be deprecated by the time you read it. It describes how to build the two required notary node servers: **Mainnet** and **Third Party(3P)**.
:::

Note that, whenever the "Main Server" is referenced, it is referring to the server that is used to notarise Komodo and Smart Chains to Bitcoin. Whenever "3rd Party server" is referenced, it is referring to the server that is used to notarise any 3rd party coin to Komodo.

This guide will explain how to setup your Main Server, then go through the process of setting up the 3rd Party Server separately. After that there are instructions on how to create your Notary Node `pubkeys`, import them to your servers and then, create a basic start script for each server. Having a second server (or VM) is now a requirement for Komodo Notary Nodes. There are ways to have a single server and then creating separate virtual machines on it, instead of having two separate servers. This guide won't touch on how to do that.

If you face problems, please join the `#notarynode` channel on the [Komodo Discord Server](https://komodoplatform.com/discord)

## NN Repo Quick Reference

::: tip Note

We recommend the Notary Node Operators to check the Table at [https://github.com/komodoplatform/dpow#dpow-asset-status](https://github.com/komodoplatform/dpow#dpow-asset-status) for latest information on the repositories and branches to run. If there is contradicting information in this document, treat the information at [https://github.com/komodoplatform/dpow#dpow-asset-status](https://github.com/komodoplatform/dpow#dpow-asset-status) as correct and inform the team through the [Komodo Discord Server](https://komodoplatform.com/discord). Using the **exact** repository and branch/tag recommended is very important for the security of the network.

:::

### Both Servers

- **KMD:** [https://github.com/KomodoPlatform/komodo](https://github.com/KomodoPlatform/komodo) Branch: `master`
- **Iguana (no autosplit):** [https://github.com/KomodoPlatform/dPoW](https://github.com/KomodoPlatform/dPoW) Branch: `master`

### Main Server

- **BTC:** [https://github.com/bitcoin/bitcoin](https://github.com/bitcoin/bitcoin) Branch: `0.16`
- **VRSC:** [https://github.com/VerusCoin/VerusCoin](https://github.com/VerusCoin/VerusCoin) Tag: `v0.6.0-7` . It should point to the commit: `249191886b59929575953425656d4a31328758eb`

### 3rd Party Server

- **HUSH:** [https://github.com/myhush/hush3](https://github.com/myhush/hush3) Tag: `v3.3.1`
- **EMC2:** [https://github.com/emc2foundation/einsteinium.git](https://github.com/emc2foundation/einsteinium.git) Branch: `master`
- **GAME:** [https://github.com/gamecredits-project/GameCredits.git](https://github.com/gamecredits-project/GameCredits.git) Branch: `master`
- **GIN:** [https://github.com/GIN-coin/gincoin-core.git](https://github.com/GIN-coin/gincoin-core.git) Branch: `master`
- **CHIPS:** [https://github.com/jl777/chips3.git](https://github.com/jl777/chips3.git) Branch: `dev`
- **AYA:** [https://github.com/sillyghost/AYAv2.git](https://github.com/sillyghost/AYAv2.git) Branch: `master`

## Requirements

### Hardware

#### Main Server

Komodo Notary Node currently only works on Linux. To setup Komodo Notary Node be sure you have a solid server with the following minimum requirements:

- OS: Ubuntu 18.x or Debian 10.x is recommended.
- CPU: A High-Performance CPU (e.g. Xeon, i7/i9, Ryzen, EPYC, etc.)
- RAM: 64 GB or more
- Disk: 1 TB SSD or greater
- Bandwidth: 100 Mbps or higher
- Location: The region where you were elected (refer to Komodo region documentation, but you should already know based on elections)

#### 3rd Party Server

At the moment the current minimum server specs are listed below, however, this may change as more 3rd party coins require notarising.

- OS: Ubuntu 18.x or Debian 10.x is recommended.
- CPU: A High-Performance CPU (e.g. Xeon, i7/i9, Ryzen, EPYC, etc.)
- RAM: 32 GB or more
- Disk: 500 GB SSD or greater
- Bandwidth: 100 Mbps or higher
- Location: Within the same region as your main server (not required to be in the same datacenter)

### Operating System

**Recommended:** Debian/Ubuntu LTS x64 - minimal installation with Openssh server.

### Security

_Before doing anything further, please ensure that your server is secure._

- Update the Operating System: `sudo apt-get update && sudo apt-get upgrade -y`

- Install [Fail2ban](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04).

- [Perform Initial Setup for creating new user, give it `sudo` permission, change SSH port, disable `root` login, disable password authentication for login](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)

- Please run processes as an unprivileged user and use `sudo` where necessary

**Here is a repo with automated scripts to prepare your fresh Ubuntu server with initial setup [https://github.com/webworker01/freshubuntu](https://github.com/webworker01/freshubuntu)**

## Initial Server Setup

The instructions below are required on both of your servers.

### Install Required Dependencies

```bash
sudo apt-get install libevent-dev libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev python-zmq zlib1g-dev wget curl bsdmainutils automake cmake clang libsodium-dev libcurl4-gnutls-dev libssl-dev git unzip python jq htop -y
```

### Install `nanomsg`

Required by iguana

```bash
cd ~
git clone https://github.com/nanomsg/nanomsg
cd nanomsg
cmake . -DNN_TESTS=OFF -DNN_ENABLE_DOC=OFF
make -j2
sudo make install
sudo ldconfig
```

## Install Komodo by compiling it from source

### Clone the source, checkout `beta` branch and compile

```bash
cd ~
git clone https://github.com/KomodoPlatform/komodo -b master
cd komodo
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

::: tip Note

`-j$(nproc)` uses all the available processor threads while compiling. If you don't want to use all threads, you may specify the number directly like so: `-j8` will use only 8 threads; Alternatively, you may like to use `-j$(expr $(nproc) - 1)`, which will use all the available processors except one.

:::

### Symlink the compiled binaries

```bash
sudo ln -sf /home/$USER/komodo/src/komodo-cli /usr/local/bin/komodo-cli
sudo ln -sf /home/$USER/komodo/src/komodod /usr/local/bin/komodod
```

### Create the data dir, `komodo.conf` file and secure it

```bash
cd ~
mkdir .komodo
nano ~/.komodo/komodo.conf
```

Add the following lines to the `komodo.conf` file and save it (replace rpcuser and rpcpassword)

```bash
rpcuser=usernameChangeItToSomethingSecure
rpcpassword=passwordChangeItToSomethingSecure
txindex=1
server=1
daemon=1
rpcworkqueue=256
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Restrict access to the `komodo.conf` file

```bash
chmod 600 ~/.komodo/komodo.conf
```

---

## Generate two `pubkey`, `address` & `WIF`'s

The mainnet notary node operators have to provide 2 seperate pubkeys, one for your Main Server and one for your 3rd Party Server. This means you will have to generate 2 seed phrases individually(passphrase) which will generate the 2 pubkeys, set of addresses and private keys (WIF). You will need to create your Main pubkey on your Main Server & follow the same actions on your 3rd Party Server for your 3rd Party pubkey.

**DO NOT IMPORT YOUR MAIN PUBKEY INTO ANY 3RD PARTY DAEMON. For security, you should never enter your seed phrase or privatekey in any other node than your specific notary node server. If you ever expose a private key for any particular coin, it can be converted to all other coins easily.**

### Generating a pubkey

The mainnet notary node operators need to provide 2 sets of pubkey to Kolo when he asks for it (pubkey starts with `02` or `03`). Follow [this guide](./generate-privkeys-third-party-coins-from-passphrase.md) to generate all the required info in your own server. You will need the "Compressed Public Key", "Compressed WIF" and "Compressed Address" from the output generated by the script. Based on the default seed used in the `genkomodo.php` file, we get the following information:

```bash
Pubkey: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1

BTC Address: 1M68ML9dMZZPEdrjncUCe7ZWadAGUxMNyv
BTC WIF: L24bEAJSkFCdjoQNEcboWfJdsLGLmkBgfGb4TSHnbhEmU9jenaes

KMD Address: RVNKRr2uxPMxJeDwFnTKjdtiLtcs7UzCZn
KMD WIF: UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh

GAME Address: Gdw3mTUaLRAgK7A2iZ8K4suQVnx7VRJ9rf
GAME WIF: Re6YxHzdQ61rmTuZFVbjmGu9Kqu8VeVJr4G1ihTPFsspAjGiErDL

EMC2 Address: EdF2quz8nWrJDwTbbTTieFYUMGfPsVB5dv
EMC2 WIF: T7trfubd9dBEWe3EnFYfj1r1pBueqqCaUUVKKEvLAfQvz3JFsNhs

GIN Address: Gdw3mTUaLRAgK7A2iZ8K4suQVnx7VRJ9rf
GIN WIF: WNejFTXR11LFx2L8wvEKEqvjHkL1D3Aa4CCBdEYQyBzbBKjPLHJQ

AYA Address: AVjkMgFfmMZbpFvmTxCcxadnD6g1EdQue3
AYA WIF: T6oxgc9ZYJA1Uvsm31Gb8Mg31hHgLWue7RuqQMjEHUWZEi5TdskL
```

CHIPS, all Komodo Smart Chains and Komodo source forks including HUSH3 and VRSC use the same address and WIF format as Komodo (KMD).

It is recommended that you write down the randomly generated seed (24 words) in a piece of paper and type directly into your server. Do not keep the seed saved in your local computer.

We will import these keys into our coin daemons and validate them later in this guide.

---

## Setup Iguana

On both servers:

### Clone the repository and build

```bash
cd ~
git clone https://github.com/KomodoPlatform/dPoW -b master
cd dPoW/iguana
./m_notary_build
```

### Create a `pubkey.txt` file

You will need to create a `pubkey.txt` file inside `~/dPoW/iguana` directory. This file will be used to start the dPoW process in the `dpowassets` script later on. `pubkey.txt` file should contain only the pubkey of the appropriate server. The file should contain only the information in the example below. Change `02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1` to the appropriate pubkey for the server the file is on.

```bash
pubkey=02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
```

### Main Server Iguana

The main server iguana will use the port 7776.

#### Create `wp_7776`

Create `wp_7776` file inside the `~/dPoW/iguana` directory with the same passphrase you used to generate your Main address/pubkey. The file should look as follows (replace `YOUR_VERY_SECURE_PASSPHRASE` with your own):

```bash
curl --url "http://127.0.0.1:7776" --data "{\"method\":\"walletpassphrase\",\"params\":[\"YOUR_VERY_SECURE_PASSPHRASE\", 9999999]}"
```

#### Make `wp_7776` file executable

```bash
chmod 700 wp_7776
```

### 3rd Party Server Iguana

The 3rd party server iguana will use the port 7779.

#### Create `wp_7779`

Create `wp_7779` file inside the `~/dPoW/iguana` directory with the same passphrase you used to generate your 3rd Party address/pubkey. The file should look as follows (replace `YOUR_VERY_SECURE_PASSPHRASE` with your own):

```bash
curl --url "http://127.0.0.1:7779" --data "{\"method\":\"walletpassphrase\",\"params\":[\"YOUR_VERY_SECURE_PASSPHRASE\", 9999999]}"
```

#### Make `wp_7779` file executable

```bash
chmod 700 wp_7779
```

---

## Main Server Setup

The instructions below are only required on your main server, which is the one that will be notarising Komodo, all the Smart Chains and runtime forks to Bitcoin.

### Bitcoin

#### Step 1: Clone Bitcoin source-code and checkout version 16.x

```bash
cd ~
git clone https://github.com/bitcoin/bitcoin -b 0.16
cd bitcoin
```

#### Step 2: Create a build script

Name the script as `build.sh` inside the `~/bitcoin` dir for easy compiling and add the contents below to the script. The script will also create symlinks for the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
berkeleydb () {
    BITCOIN_ROOT=$(pwd)
    BITCOIN_PREFIX="${BITCOIN_ROOT}/db4"
    mkdir -p $BITCOIN_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    if [ -f /etc/debian_version ]; then
        DEBIAN_VERSION=$(cat /etc/debian_version)
        DEBIAN_VERSION=${DEBIAN_VERSION%.*}
        if [ "$DEBIAN_VERSION" -eq 10 ]; then
            #https://www.fsanmartin.co/compiling-berkeley-db-4-8-30-in-ubuntu-19/
            sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
        fi
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$BITCOIN_PREFIX
    make install
    cd $BITCOIN_ROOT
}

buildBITCOIN () {
    git pull
    make clean
    ./autogen.sh
    ./configure LDFLAGS="-L${BITCOIN_PREFIX}/lib/" CPPFLAGS="-I${BITCOIN_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared
    make -j$(nproc)
}

cd ~/bitcoin
berkeleydb
buildBITCOIN
sudo ln -sf /home/$USER/bitcoin/src/bitcoin-cli /usr/local/bin/bitcoin-cli
sudo ln -sf /home/$USER/bitcoin/src/bitcoind /usr/local/bin/bitcoind
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create Bitcoin data dir, `bitcoin.conf` file and restrict access to it

```bash
cd ~
mkdir .bitcoin
nano ~/.bitcoin/bitcoin.conf
```

Insert the following contents inside the `bitcoin.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=bitcoinrpcChangeThisToSomethingSecure
rpcpassword=passwordChangeThisToSomethingSecure
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Restrict access to the `bitcoin.conf` file

```bash
chmod 600 ~/.bitcoin/bitcoin.conf
```

### VerusCoin (VRSC)

#### Clone VRSC source and compile

```bash
cd ~
git clone https://github.com/VerusCoin/VerusCoin -b v0.6.0-7
cd VerusCoin
./zcutil/build.sh -j$(nproc)
```

Symlink the compiled binary

```bash
sudo ln -sf /home/$USER/VerusCoin/src/verusd /usr/local/bin/verusd
```

### Start the daemons and sync all the chains

For the first time sync, we will run all the coin daemons normally. Make sure you have successfully compiled all the daemons from the above section. We will create a `start` script later in this guide to start the chains with `-pubkey` option for notarisation.

### Start the coins

```bash
komodod &
bitcoind &
verusd &
```

### Start Komodo and all the Smart Chains

```bash
cd ~/komodo/src
./assetchains.old
```

Now wait for all the chains to finish syncing. This might take about 8-10 hours depending on your machine and internet connection. You can check check sync progress by using `tail -f` on the `debug.log` file in the respective coin data directories. Komodo Smart Chains have their own data directory inside the `~/.komodo` directory.

Commands to tail `debug.log`

```bash
# BTC
tail -f ~/.bitcoin/debug.log
# KMD
tail -f ~/.komodo/debug.log
# SUPERNET
tail -f ~/.komodo/SUPERNET/debug.log
# VRSC
tail -f ~/.komodo/VRSC/debug.log
```

For any other Komodo Smart Chain, use the example of SUPERNET and change the path with the coin name that you are looking for accordingly. You can now wait for all the coins to finish syncing. Just double check the blocks you've downloaded with an explorer to verify.

### Import your main private key

Feel free to import these as the daemons are syncing.

- Follow the below example to import your main pubkey **only** into your coin daemons.

```bash
komodo-cli importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
bitcoin-cli importprivkey WNejFTXR11LFx2L8wvEKEqvjHkL1D3Aa4CCBdEYQyBzbBKjPLHJQ
komodo-cli -ac_name=VRSC importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
```

- For all other Komodo Smart Chains, use the following command to import privkey

```bash
cd ~/komodo/src
./fiat-cli importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
```

This command will import keys into all Smart Chains that are using the main Komodo daemon. This may take some time and will display the coin name and address after each import. You can tail the coin specific `debug.log` files to check the progress.

### Validate the addresses

After all the addresses are imported, using the respective `<COIN>-cli`, validate all addresses and make sure the response has `ismine:true`. If you have `ismine:false`, your address wasn't imported correctly and dPoW will not work for that coin. Sample command for that is below.

```bash
komodo-cli validateaddress RVNKRr2uxPMxJeDwFnTKjdtiLtcs7UzCZn
```

#### Copy the `pubkey.txt` file that we created from the `~/dPoW/iguana` dir

You will need to create a `pubkey.txt` file inside `~/komodo/src/`. This file will be used to start all of your daemons with the `-pubkey=` parameter in your `start` script that will be made later in this guide.

```bash
cp ~/dPoW/iguana/pubkey.txt ~/komodo/src/pubkey.txt
```

### Stop All the Coin Daemons Safely

Once you've completed syncing, imported and validated your keys in all your daemons, complete the following.

Never use `kill -9` to kill any Coin daemon if you don't like corrupt databases. Always shutdown wallet daemon and iguana gracefully with `pkill -15 iguana` or use the below RPC commands for wallets.

```bash
komodo-cli stop
bitcoin-cli stop
komodo-cli -ac_name=VRSC stop
```

For all other Komodo Smart Chains, use the following command to `stop` the daemons.

```bash
cd ~/komodo/src
./fiat-cli stop
```

### After all the chains' daemons were stopped gracefully, let's restrict access to all the Komodo Smart Chains' `.conf` files inside `~/.komodo` dir

```bash
find ~/.komodo -type f -iname "*.conf" -exec chmod 600 {} \;
```

To complete setting up your main server, go to the [Set 'ulimit' parameters on Ubuntu permanently](#set-ulimit-parameters-on-ubuntu-permanently) section.

---

## 3rd Party Server Setup

The instructions below are only required on your 3rd party server, which is the one that will be notarising 3rd party coins to Komodo.

### Aryacoin (AYA)

#### Step 1: Clone AYA source

```bash
cd ~
git clone https://github.com/sillyghost/AYAv2.git -b master
cd AYAv2
```

#### Step 2: Create a build script

Name the script as `build.sh` inside the `~/AYAv2` dir for easy compiling and add the contents below to the script. The script will also create symlinks gor the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
# AYA build script for Ubuntu & Debian 9 v.3 (c) Decker (and webworker)
berkeleydb () {
    AYA_ROOT=$(pwd)
    AYA_PREFIX="${AYA_ROOT}/db4"
    mkdir -p $AYA_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
  if [ -f /etc/debian_version ]; then
        DEBIAN_VERSION=$(cat /etc/debian_version)
        DEBIAN_VERSION=${DEBIAN_VERSION%.*}
        if [ "$DEBIAN_VERSION" -eq 10 ]; then
            #https://www.fsanmartin.co/compiling-berkeley-db-4-8-30-in-ubuntu-19/
            sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
        fi
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$AYA_PREFIX
    make install
    cd $AYA_ROOT
}
buildAYA () {
    git pull
    ./autogen.sh
    ./configure LDFLAGS="-L${AYA_PREFIX}/lib/" CPPFLAGS="-I${AYA_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared --with-incompatible-bdb
    make -j$(nproc)
}
berkeleydb
buildAYA
echo "Done building AYA!"
sudo ln -sf /home/$USER/AYAv2/src/aryacoin-cli /usr/local/bin/aryacoin-cli
sudo ln -sf /home/$USER/AYAv2/src/aryacoind /usr/local/bin/aryacoind
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create AYA data dir, `aryacoin.conf` file and restrict access to it

```bash
cd ~
mkdir .aryacoin
nano ~/.aryacoin/aryacoin.conf
```

Insert the following contents inside the `aryacoin.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Restrict access to the `aryacoin.conf` file

```bash
chmod 600 ~/.aryacoin/aryacoin.conf
```

### HUSH3

#### Step 1: Clone HUSH3 source and compile

```bash
cd ~
git clone https://github.com/myhush/hush3 -b v3.3.1
cd hush3
./zcutil/build.sh -j$(nproc)
```

#### Step 2: Symlink the compiled binaries

```shell
sudo ln -sf /home/$USER/hush3/src/hush-cli /usr/local/bin/hush-cli
sudo ln -sf /home/$USER/hush3/src/hushd /usr/local/bin/hushd
```

### Chips

#### Step 1: Clone CHIPS source

```bash
cd ~
git clone https://github.com/jl777/chips3 -b dev
cd chips3 
```

#### Step 2: Build

##### Ubuntu 18.04

```bash
./build.sh
```

##### Debian 10

Replace the contents of the `build.sh` file with the following code

```bash
#!/bin/bash

berkeleydb() {
    CHIPS_ROOT=$(pwd)
    CHIPS_PREFIX="${CHIPS_ROOT}/db4"
    mkdir -p $CHIPS_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    if [ -f /etc/debian_version ]; then
        DEBIAN_VERSION=$(cat /etc/debian_version)
        DEBIAN_VERSION=${DEBIAN_VERSION%.*}
        if [ "$DEBIAN_VERSION" -eq 10 ]; then
            #https://www.fsanmartin.co/compiling-berkeley-db-4-8-30-in-ubuntu-19/
            sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
        fi
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$CHIPS_PREFIX
    make install
    cd $CHIPS_ROOT
}

buildCHIPS() {
    git pull
    ./autogen.sh
    ./configure LDFLAGS="-L${CHIPS_PREFIX}/lib/" CPPFLAGS="-I${CHIPS_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared
    make -j$(nproc)
}
berkeleydb
buildCHIPS
echo "Done building CHIPS!"
```

#### Step 3: Symlink the compiled binaries

```shell
sudo ln -sf /home/$USER/chips3/src/chips-cli /usr/local/bin/chips-cli
sudo ln -sf /home/$USER/chips3/src/chipsd /usr/local/bin/chipsd
```

#### Step 4: Create CHIPS data dir, `chips.conf` file and restrict access to it

```bash
cd ~
mkdir .chips
nano ~/.chips/chips.conf
```

Insert the following contents inside the `chips.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
addnode=159.69.23.29
addnode=95.179.192.102
addnode=149.56.29.163
addnode=145.239.149.173
addnode=178.63.53.110
addnode=151.80.108.76
addnode=185.137.233.199
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Restrict access to the `chips.conf` file

```bash
chmod 600 ~/.chips/chips.conf
```

### GameCredits (GAME)

#### Step 1: Clone GAME source

```bash
cd ~
git clone https://github.com/gamecredits-project/GameCredits -b master
cd GameCredits
```

#### Step 2: Create a build script

Name the script as `build.sh` inside the `~/GameCredits` dir for easy compiling and add the contents below to the script. The script will also create symlinks gor the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
# GameCredits build script for Ubuntu & Debian 9 v.3 (c) Decker

# Step 1: Build BDB 4.8
GAMECREDITS_ROOT=$(pwd)
GAMECREDITS_PREFIX="${GAMECREDITS_ROOT}/db4"
mkdir -p $GAMECREDITS_PREFIX
wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
tar -xzvf db-4.8.30.NC.tar.gz
if [ -f /etc/debian_version ]; then
        DEBIAN_VERSION=$(cat /etc/debian_version)
        DEBIAN_VERSION=${DEBIAN_VERSION%.*}
        if [ "$DEBIAN_VERSION" -eq 10 ]; then
            #https://www.fsanmartin.co/compiling-berkeley-db-4-8-30-in-ubuntu-19/
            sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
        fi
    fi
cd db-4.8.30.NC/build_unix/
../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$GAMECREDITS_PREFIX
make -j$(nproc)
make install
cd $GAMECREDITS_ROOT

# Step 2: Build OpenSSL (libssl-dev) 1.0.x
version=1.0.2o
mkdir -p openssl_build
wget -qO- http://www.openssl.org/source/openssl-$version.tar.gz | tar xzv
cd openssl-$version
export CFLAGS=-fPIC
./config no-shared --prefix=$GAMECREDITS_ROOT/openssl_build
make -j$(nproc)
make install
cd ..

export PKG_CONFIG_PATH="$GAMECREDITS_ROOT/openssl_build/pkgconfig"
export CXXFLAGS+=" -I$GAMECREDITS_ROOT/openssl_build/include/ -I${GAMECREDITS_PREFIX}/include/"
export LDFLAGS+=" -L$GAMECREDITS_ROOT/openssl_build/lib -L${GAMECREDITS_PREFIX}/lib/ -static"
export LIBS+="-ldl"

# p.s. for Debian added -ldl in LDFLAGS it's enough, but on Ubuntu linker doesn't recognize it, so,
# we moved -ldl to LIBS and added -static to LDFLAGS, because linker on Ubuntu doesn't understan that
# it should link librypto.a statically.
#
# Or we can build OpenSSL 1.0.x as shared (instead of no-shared) and use:
# export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/$USER/GameCredits/openssl_build/lib before
# starting gamecreditsd.

# Step 3: Build GameCredits daemon
./autogen.sh
./configure --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared
make -j$(nproc)

sudo ln -sf /home/$USER/GameCredits/src/gamecredits-cli /usr/local/bin/gamecredits-cli
sudo ln -sf /home/$USER/GameCredits/src/gamecreditsd /usr/local/bin/gamecreditsd
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create GAME data dir, `gamecredits.conf` file and restrict access to it

```bash
cd ~
mkdir .gamecredits
nano ~/.gamecredits/gamecredits.conf
```

Insert the following contents inside the `gamecredits.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Restrict access to the `gamecredits.conf` file

```bash
chmod 600 ~/.gamecredits/gamecredits.conf
```

### Einsteinium (EMC2)

#### Step 1: Clone EMC2 source

```bash
cd ~
git clone https://github.com/emc2foundation/einsteinium -b master
cd einsteinium
```

#### Step 2: Create a build script

Name the script as `build.sh` inside the `~/einsteinium` dir for easy compiling and add the contents below to the script. The script will also create symlinks gor the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
berkeleydb () {
    EMC2_ROOT=$(pwd)
    EMC2_PREFIX="${EMC2_ROOT}/db4"
    mkdir -p $EMC2_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    if [ -f /etc/debian_version ]; then
        DEBIAN_VERSION=$(cat /etc/debian_version)
        DEBIAN_VERSION=${DEBIAN_VERSION%.*}
        if [ "$DEBIAN_VERSION" -eq 10 ]; then
            #https://www.fsanmartin.co/compiling-berkeley-db-4-8-30-in-ubuntu-19/
            sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
        fi
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$EMC2_PREFIX
    make install
    cd $EMC2_ROOT
}

buildEMC2 () {
    git pull
    make clean
    ./autogen.sh
    ./configure LDFLAGS="-L${EMC2_PREFIX}/lib/" CPPFLAGS="-I${EMC2_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared
    make -j$(nproc)
}

cd ~/einsteinium
berkeleydb
buildEMC2

sudo ln -sf /home/$USER/einsteinium/src/einsteinium-cli /usr/local/bin/einsteinium-cli
sudo ln -sf /home/$USER/einsteinium/src/einsteiniumd /usr/local/bin/einsteiniumd
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create EMC2 data dir, `einsteinium.conf` file and restrict access to it

```bash
cd ~
mkdir .einsteinium
nano ~/.einsteinium/einsteinium.conf
```

Insert the following contents inside the `einsteinium.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Restrict access to the `einsteinium.conf` file

```bash
chmod 600 ~/.einsteinium/einsteinium.conf
```

### GinCoin (GIN)

#### Step 1: Clone GIN source

```bash
cd ~
git clone https://github.com/GIN-coin/gincoin-core -b master
cd gincoin-core
```

#### Step 2: Create a build script

Name the script as `build.sh` inside the `~/gincoin-core` dir for easy compiling and add the contents below to the script. The script will also create symlinks gor the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
berkeleydb () {
    GIN_ROOT=$(pwd)
    GIN_PREFIX="${GIN_ROOT}/db4"
    mkdir -p $GIN_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    if [ -f /etc/debian_version ]; then
        DEBIAN_VERSION=$(cat /etc/debian_version)
        DEBIAN_VERSION=${DEBIAN_VERSION%.*}
        if [ "$DEBIAN_VERSION" -eq 10 ]; then
            #https://www.fsanmartin.co/compiling-berkeley-db-4-8-30-in-ubuntu-19/
            sed -i 's/__atomic_compare_exchange/__atomic_compare_exchange_db/g' db-4.8.30.NC/dbinc/atomic.h
        fi
    fi
    cd db-4.8.30.NC/build_unix/
    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$GIN_PREFIX
    make install
    cd $GIN_ROOT
}

buildgin () {
    git pull
    make clean
    ./autogen.sh
    ./configure LDFLAGS="-L${GIN_PREFIX}/lib/" CPPFLAGS="-I${GIN_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared --without-gui
    make -j$(nproc)
}

berkeleydb
buildgin

sudo ln -sf /home/$USER/gincoin-core/src/gincoin-cli /usr/local/bin/gincoin-cli
sudo ln -sf /home/$USER/gincoin-core/src/gincoind /usr/local/bin/gincoind
```

#### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

#### Step 4: Create GIN data dir, `gincoin.conf` file and restrict access to it

```bash
cd ~
mkdir .gincoincore
nano ~/.gincoincore/gincoin.conf
```

Insert the following contents inside the `gincoin.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
rpcuser=user
rpcpassword=password
server=1
daemon=1
txindex=1
litemode=1
bind=127.0.0.1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
```

Restrict access to the `gincoin.conf` file

```bash
chmod 600 ~/.gincoincore/gincoin.conf
```

### Start the daemons and sync all the chains

For the first time sync, we will run all the coin daemons normally. Make sure you have successfully compiled all the daemons from the above section. We will create a `start` script later in this guide to start the chains with `-pubkey` option for notarisation.

### Start the coins

```bash
komodod &
chipsd &
gamecreditsd &
einsteiniumd &
gincoind &
~/hush3/src/hushd &
aryacoind &
```

Now wait for all the chains to finish syncing. This might take about 8-10 hours depending on your machine and internet connection. You can check check sync progress by using `tail -f` on the `debug.log` file in the respective coin data directories.

Commands to tail `debug.log`

```bash
# KMD
tail -f ~/.komodo/debug.log
# CHIPS
tail -f ~/.chips/debug.log
# GAME
tail -f ~/.gamecredits/debug.log
# EMC2
tail -f ~/.einsteinium/debug.log
# GIN
tail -f ~/.gincoincore/debug.log
# HUSH
tail -f ~/.komodo/HUSH3/debug.log
# AYA
tail -f ~/.aryacoin/debug.log
```

You can now wait for all the coins to finish syncing. Just double check the block you've downloaded with an explorer to verify.

### Import 3rd party private key

Feel free to import your addresses whilst your daemons are syncing.

- Follow the example below to import your 3rd party pubkey **only** into your coin daemons.

```bash
komodo-cli importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
komodo-cli -ac_name=HUSH3 importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
chips-cli importprivkey UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
gamecredits-cli importprivkey Re6YxHzdQ61rmTuZFVbjmGu9Kqu8VeVJr4G1ihTPFsspAjGiErDL
einsteinium-cli importprivkey T7trfubd9dBEWe3EnFYfj1r1pBueqqCaUUVKKEvLAfQvz3JFsNhs
gincoin-cli importprivkey WNejFTXR11LFx2L8wvEKEqvjHkL1D3Aa4CCBdEYQyBzbBKjPLHJQ
aryacoin-cli importprivkey T6oxgc9ZYJA1Uvsm31Gb8Mg31hHgLWue7RuqQMjEHUWZEi5TdskL
```

This may take some time and will display the coin name and address after each import. You can tail the coin specific `debug.log` files to check the progress.

### Validate the addresses

After all the addresses are imported, using the respective `<COIN>-cli`, validate all addresses and make sure the response has `ismine:true`. If you have `ismine:false`, your address hasn't imported correctly and dPoW will not work for that coin. Sample command for that is below.

```bash
komodo-cli validateaddress RVNKRr2uxPMxJeDwFnTKjdtiLtcs7UzCZn
```

#### Copy the `pubkey.txt` file that we created from the `~/dPoW/iguana` dir

You will need to create a `pubkey.txt` file inside `~/komodo/src/`. This file will be used to start all of your daemons with the `-pubkey=` parameter in your `start` script that will be made later in this guide.

```bash
cp ~/dPoW/iguana/pubkey.txt ~/komodo/src/pubkey.txt
```

### Stop All the Coin Daemons Safely

Once your daemons have completed syncing, you've imported and validated all your keys, complete the following.

Never use `kill -9` to kill any Coin daemon if you don't like corrupt databases. Always shutdown wallet daemon and iguana gracefully with `pkill -15 iguana` or use the below RPC commands for wallets.

```bash
komodo-cli stop
komodo-cli -ac_name=HUSH3 stop
chips-cli stop
gamecredits-cli stop
einsteinium-cli stop
gincoin-cli stop
aryacoin-cli stop
```

---

## Set `ulimit` parameters on Ubuntu permanently

By default, the number of open files per user in Ubuntu is 1024. In our case this number is too small so we will increase it.

This is done with the `ulimit` command:

```bash
$ulimit -a   # see all the kernel parameters
$ulimit -n   # see the number of open files
$ulimit -n 1000000  #  set the number open files to 1000000
```

The problem with this way is that the `ulimit` parameter is only set currently for this command terminal and user. This means that after a reboot you’ll need to set the parameter again. Do the following to set it permanently:

### Edit the `/etc/security/limits.conf` file

```bash
sudo nano /etc/security/limits.conf
```

add these lines:

```bash
* soft nofile 1000000
* hard nofile 1000000
```

Save and close file

### Edit the `/etc/pam.d/common-session` file

```bash
sudo nano /etc/pam.d/common-session
```

add this line:

```bash
session required pam_limits.so
```

Save and close the file.

We are done. Now let's stop all our wallet daemons safely with RPC commands and reboot the server using `sudo reboot` or `sudo shutdown -r` command.

### Check the values now

```bash
ulimit -n
```

---

## Create a `start` Script

We need a `start` script in the home dir to start Komodo, Smart Chains and all 3rd party coin daemons with the `-pubkey` option. `-pubkey` is not required for BTC daemon. All other coins need it.

Here is an example of a Main Server start script that will start Notary easy mining on Komodo as well:

```bash
#!/bin/bash
source ~/komodo/src/pubkey.txt
bitcoind &
~/VerusCoin/src/verusd -pubkey=$pubkey &
sleep 60
cd komodo/src
./komodod -gen -genproclimit=1 -notary -pubkey=$pubkey &
sleep 600
./assetchains
```

Here is an example of a 3rd Party Server start script :

```bash
#!/bin/bash
source ~/komodo/src/pubkey.txt
chipsd -pubkey=$pubkey &
gamecreditsd -pubkey=$pubkey &
einsteiniumd -pubkey=$pubkey &
gincoind -pubkey=$pubkey &
sleep 60
cd komodo/src
./komodod -pubkey=$pubkey &
~/hush3/src/hushd &
aryacoind &
```

Make the file executable:

```bash
chmod +x start
```

### Execute the script

This may take upto 20-30 minutes maximum depending on your system spec.

```bash
cd ~
./start
```

**Make sure all daemons started properly before starting iguana in the next step.**

## Start `iguana`

Once all required daemons are running, we have funds on all coins(DM @kolo with your addresses if you need coins), we can go ahead and start `iguana`.

### Main Server

```bash
cd ~/dPoW/iguana
./m_notary_KMD
```

You can use the `m_notary` script if you wish, but this will issue a `git pull` command to update the repo, remove old iguana, compile fresh and start the whole process. This can take about 10 minutes maximum to finish. You will see `INIT with 64 notaries` once the process finishes.

#### Start dPoW process

After you see `INIT with 64 notaries`, you can safely start dPoW process. Just issue the following command from inside `iguana` dir to start with it.

```bash
./dpowassets
```

### 3rd Party Server

```bash
cd ~/dPoW/iguana
./m_notary_3rdparty
```

#### Start dPoW process

After you see `INIT with 64 notaries`, you can safely start dPoW process. Just issue the following command from inside `iguana` dir to start with it.

```bash
./dpowassets_3rdparty
```

## NN Scripts

There are many open sourced scripts for managing your Komodo Notary Node servers. If you're having trouble with something, you can have a look at [these tools](https://github.com/KomodoPlatform/komodotools), or ask the other NN's, who will show you the scripts they use to overcome issues. With that being said, if you find a way to make a job easier or find a way to better the ecosystem, please let the rest of the NN OPs know, we would love to hear it.
