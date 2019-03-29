# Setting up a Full Relay(FR) Node for mmV1

## What is a Full Relay (FR) node?

Full Relay nodes (FR) create the p2p network & only relays data-packets for BarterDEX and allows ordermatching to happen. They don't trade. FR nodes never touch any funds of any sort and are equivalent to a bulletin board. There is no need to fund the wallet of a FR node. Bob and Alice connect to the FR network. Bob places orders and Alice fills the orders. It is ideal to have at least 3 FR nodes in each netid.

## How to setup an FR node?

A FR node is just `marketmaker` launched with `client:0` parameter. Very easy to setup, just follow along without skipping any steps.

### Install the following dependency packages:

```bash
sudo apt-get update
sudo apt-get install cmake git libcurl4-openssl-dev build-essential
```

### Install `nanomsg`

```bash
cd ~
git clone https://github.com/nanomsg/nanomsg
cd nanomsg
cmake . -DNN_TESTS=OFF -DNN_ENABLE_DOC=OFF
make -j2
sudo make install
sudo ldconfig
```

### Clone the SuperNET repo from github & Install:

Clone the repo, checkout `dev` branch for latest and install.

```bash
cd ~
git clone https://github.com/jl777/SuperNET
cd ~/SuperNET/iguana/exchanges
git checkout dev
./install
cp passphrase ../dexscripts/passphrase
```

### Edit the `client` script

The client script inside the directory `~/SuperNET/iguana/dexscripts` should look as follows to be running a FR node.

```bash
#!/bin/bash
source passphrase
source coins
./stop
git pull;
cp ../exchanges/updateprices .;./updateprices
cd ..;
./m_mm;
pkill -15 marketmaker;
stdbuf -oL $1 ./marketmaker "{\"gui\":\"nogui\",\"client\":0, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"$passphrase\", \"coins\":$coins}" &
```

barterDEX is now installed in your system.

### Starting FR node

Every time you want to run a Full Relay node (FR), open a new terminal window and type the following:

```bash
cd ~/SuperNET/iguana/dexscripts
./client &
```

## How to setup FR nodes for different netids?

You need to edit the value of `netid` in the `client` script along with `client:0` parameter.

### `client`

```bash
#!/bin/bash
source passphrase
source coins
./stop
git pull;
cp ../exchanges/updateprices .;./updateprices
cd ..;
./m_mm;
pkill -15 marketmaker;
stdbuf -oL $1 ./marketmaker "{\"gui\":\"nogui\",\"client\":0,\"netid\":1024, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"$passphrase\", \"coins\":$coins}" &
```

### Stopping a FR node

Just use the following command in any terminal session to stop marketmaker. This will stop the running FR node.

```bash
pkill -15 marketmaker
```
