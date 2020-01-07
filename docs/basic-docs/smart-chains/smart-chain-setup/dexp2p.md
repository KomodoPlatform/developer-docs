# Enhanced Peer to Peer data broadcast and synchronisation between Nodes of a Smart Chain

## Introduction

All the nodes of a Smart Chain started with the parameter `-dexp2p` (with value 1 or 2) start listening and propagating data packets, not necessarily related to the Smart Chain's transactions broadcasted by other nodes on the network. These data packets are stored in the node's RAM and dropped after 1 hour. Let us call this local data stored as "Data Mempool" as opposed to the "Mempool/Transaction Mempool" that stores just the unconfirmed transactions of the Smart Chain.

- if `-dexp2p=1` is used, the Full nodes participate in the p2p data network but don't respond to requests from nSPV superlight clients
- if `-dexp2p=2` is used, the Full nodes participate in the p2p data network and also respond to requests from nSPV superlight clients

## Installation

```bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 libsodium-dev curl libevent-dev git cmake nano wget ntp ntpdate automake unzip autoconf libtool -y
git clone https://github.com/jl777/libnspv
cd libnspv
./autogen.sh
./configure
./onetime # compiles cc support
make
```

## RPC
