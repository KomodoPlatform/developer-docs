# Setup Komodo Notary Node

## Komodo Notary Nodes

### Note

This guide is still in _BETA_ phase. It is here is to give you a good understanding on building a Komodo Notary Node. It is possible that some commands could be deprecated by the time you read it.

If you have any problems, please join `#notarynode` on the [Komodo Discord](https://komodoplatform.com/discord)

## Requirements

### Hardware

Komodo currently only works on Linux. To setup Komodo Notary Node be sure you have a good solid server with the following requirements:

- CPU: A good CPU (Xeon/i7)

- RAM: 64GB

- Disk: 500GB SSD

- Bandwidth: 100Mbps

### Operating System

Ubuntu LTS x64 - minimal installation with Openssh server.

### Security

_Before doing anything further, please ensure that your server is secure._

- Update the Operating System: `sudo apt-get update && sudo apt-get upgrade -y`

- Install [Fail2ban](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04).

- [Perform Initial Setup for creating new user, give `sudo` permission, change SSH port, disable `root` login, disable password authentication for login](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)

- Please run processes as an unprivileged user and use `sudo` where necessary

### Install Dependencies

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool libncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl libcurl4-gnutls-dev cmake clang libsodium-dev jq htop -y
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

### Install Komodo by compiling it from source

#### Clone the source, checkout `beta` branch and compile

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout beta
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

`-j$(nproc)` uses all available processor threads while compiling. If you don't want to use all threads, you can use `-j8` which will use only 8 threads.

#### Symlink the compiled binaries

```bash
sudo ln -sf /home/$USER/komodo/src/komodo-cli /usr/local/bin/komodo-cli
sudo ln -sf /home/$USER/komodo/src/komodod /usr/local/bin/komodod
```

#### Create the data dir, `komodo.conf` file and secure it

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
```

Restrict access to the `komodo.conf` file

```bash
chmod 600 ~/.komodo/komodo.conf
```

---

### Compile Bitcoin and other 3rd-party Coins from Source

#### Bitcoin

##### Step 1: Clone Bitcoin source-code and checkout version 16.x

```bash
cd ~
git clone https://github.com/bitcoin/bitcoin
cd bitcoin
git checkout 0.16
```

##### Step 2: Create a build script

Name the script as `build.sh` inside the `~/bitcoin` dir for easy compiling and add the contents below to the script. The script will also create symlinks gor the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
berkeleydb () {
    BITCOIN_ROOT=$(pwd)
    BITCOIN_PREFIX="${BITCOIN_ROOT}/db4"
    mkdir -p $BITCOIN_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
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

##### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

##### Step 4: Create Bitcoin data dir, `bitcoin.conf` file and restrict access to it

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
rpcuser=bitcoinrpc
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
```

Restrict access to the `bitcoin.conf` file

```bash
chmod 600 ~/.bitcoin/bitcoin.conf
```

#### Chips

##### Step 1: Clone CHIPS source

```bash
cd ~
git clone https://github.com/jl777/chips3
cd chips3
git checkout dev
```

##### Step 2: Create a build script

Name the script as `build.sh` inside the `~/chips3` dir for easy compiling and add the contents below to the script. The script will also create symlinks gor the binaries at `/usr/local/bin/` and for that, you will be asked to provide the `sudo` password.

```bash
#!/bin/bash
berkeleydb () {
    CHIPS_ROOT=$(pwd)
    CHIPS_PREFIX="${CHIPS_ROOT}/db4"
    mkdir -p $CHIPS_PREFIX
    wget -N 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
    echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
    tar -xzvf db-4.8.30.NC.tar.gz
    cd db-4.8.30.NC/build_unix/

    ../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$CHIPS_PREFIX

    make install
    cd $CHIPS_ROOT
}

buildCHIPS () {
    git pull
    make clean
    ./autogen.sh
    ./configure LDFLAGS="-L${CHIPS_PREFIX}/lib/" CPPFLAGS="-I${CHIPS_PREFIX}/include/" --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm --enable-static --disable-shared
    make -j$(nproc)
}

cd ~/chips3
berkeleydb
buildCHIPS
sudo ln -sf /home/$USER/chips3/src/chips-cli /usr/local/bin/chips-cli
sudo ln -sf /home/$USER/chips3/src/chipsd /usr/local/bin/chipsd
```

##### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

##### Step 4: Create CHIPS data dir, `chips.conf` file and restrict access to it

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
addnode=5.9.253.195
addnode=74.208.210.191
```

Restrict access to the `chips.conf` file

```bash
chmod 600 ~/.chips/chips.conf
```

#### GameCredits (GAME)

##### Step 1: Clone GAME source

```bash
cd ~
git clone https://github.com/gamecredits-project/GameCredits
cd GameCredits
git checkout master
```

##### Step 2: Create a build script

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

##### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

##### Step 4: Create GAME data dir, `gamecredits.conf` file and restrict access to it

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
```

Restrict access to the `gamecredits.conf` file

```bash
chmod 600 ~/.gamecredits/gamecredits.conf
```

#### Einsteinium (EMC2)

##### Step 1: Clone EMC2 source

```bash
cd ~
git clone https://github.com/emc2foundation/einsteinium
cd einsteinium
git checkout master
```

##### Step 2: Create a build script

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

##### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

##### Step 4: Create EMC2 data dir, `einsteinium.conf` file and restrict access to it

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
```

Restrict access to the `einsteinium.conf` file

```bash
chmod 600 ~/.einsteinium/einsteinium.conf
```

#### GinCoin (GIN)

##### Step 1: Clone GIN source

```bash
cd ~
git clone https://github.com/GIN-coin/gincoin-core
cd gincoin-core
git checkout master
```

##### Step 2: Create a build script

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

##### Step 3: Make the script executable and run it

```bash
chmod +x build.sh
./build.sh
```

##### Step 4: Create GIN data dir, `gincoin.conf` file and restrict access to it

```bash
cd ~
mkdir .gincoincore
nano ~/.gincoincore/gincoin.conf
```

Insert the following contents inside the `gincoin.conf` file and save it. (change the `rpcuser` and `rpcpassword` values)

```bash
server=1
daemon=1
txindex=1
rpcuser=user
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
```

Restrict access to the `gincoin.conf` file

```bash
chmod 600 ~/.gincoincore/gincoin.conf
```

#### HUSH3

##### Clone HUSH3 source and compile

```bash
cd ~
git clone https://github.com/MyHush/hush3
cd hush3
git checkout dev
./zcutil/build.sh -j$(nproc)
```

---

#### VerusCoin (VRSC)

##### Clone VRSC source and compile

```bash
cd ~
git clone https://github.com/VerusCoin/VerusCoin
cd VerusCoin
git checkout master
./zcutil/build.sh -j$(nproc)
```

### Start the daemons and sync all the chains

For the first time sync, we will run all the coin daemons normally. Make sure you have successfully compiled all the daemons from the above section. We will create a `start` script later in this guide to start the chains with `-pubkey` option for notarisation.

#### Start the 3rd-party coins

```bash
bitcoind &
chipsd &
gamecreditsd &
einsteiniumd &
gincoind &
```

#### Start Komodo and all the assetchains including VRSC & HUSH3

```bash
cd ~/komodo/src
./komodod &
./assetchains.old
```

Now wait for all the chains to finish syncing. You can check check sync progress by using `tail -f` on the `debug.log` file in the respective coin data directories. Komodo assetchains have their own data directory inside the `~/.komodo` directory.

Commands to tail `debug.log`

```bash
# BTC
tail -f ~/.bitcoin/debug.log
# CHIPS
tail -f ~/.chips/debug.log
# GAME
tail -f ~/.gamecredits/debug.log
# EMC2
tail -f ~/.einsteinium/debug.log
# GIN
tail -f ~/.gincoincore/debug.log
# KMD
tail -f ~/.komodo/debug.log
# VRSC
tail -f ~/.komodo/VRSC/debug.log
# HUSH3
tail -f ~/.komodo/HUSH3/debug.log
# SUPERNET
tail -f ~/.komodo/SUPERNET/debug.log
```

For any other Komodo assetchain, use the example of VRSC, HUSH3 or SUPERNET and change the path with the coin name accordingly. Wait for all the coins to finish syncing.
