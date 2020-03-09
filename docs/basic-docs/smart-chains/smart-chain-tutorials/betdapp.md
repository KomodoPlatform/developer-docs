# Testing the [DEXP2P](../smart-chain-setup/dexp2p.html) based realtime P2P betting App

::: tip Note
This tech is in development. The specifics of the implementation are subject to change. This document is a Work In Progress.
:::

## Introduction

This is a C program that issues RPC calls and automates several steps required to create a p2p betting game. It uses the the DEXP2P Peer to Peer messaging layer for communication between nodes and the blockchain layer for payments.

This program serves to demonstrate the capabilities the [DEXP2P messaging layer](https://docs.komodoplatform.com/basic-docs/smart-chains/smart-chain-setup/dexp2p.html) opens up for all Smart Chains. A similar program can be written using any Programming Language that has a library to issue RPC calls.

The bet is a double or nothing game, where you will either get double the money you bet or nothing at all.

## Requirements

- Be comfortable with issuing CLI commands
- Launch the test chain named "DORN" (instructions in the subsequent sections)

## Installation

### Dependencies

```bash
sudo apt-get install g++-8 gcc-8 build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python python-zmq zlib1g-dev wget curl bsdmainutils automake cmake clang ntp ntpdate nano -y
```

### Build Komodo

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

### Link `komodo-cli`

```bash
sudo ln -sf /home/$USER/komodo/src/komodo-cli /usr/local/bin/komodo-cli
```

### Compile the `betdapp` binary

```bash
cd ~/komodo/src/cc/dapps
./make_betdapp.sh
```

## Launch parameters of the "DORN" smart chain

```bash
./komodod -ac_name=DORN -ac_cc=2 -ac_supply=1000000 -ac_reward=100000000 -addnode=136.243.58.134
```

For now, we are using this chain for both dexp2p messaging and as the coin to bet.

## Bob node

This is a node that offers bets that can be filled by any other node on the network. Launch the node using the above launch parameters. Then get a pubkey, corresponding R-address from it by following the guide [here](./get-new-pubkey)  

Stop the chain and relaunch it after adding the following parameters to the previous launch parameters.

```bash
-dexp2p=2 -handle=<ANY NAME>_bob -pubkey=<REGULAR PUBKEY>
```

- replace `<ANY NAME>` with a name for this node 
- replace `<REGULAR PUBKEY>` with the pubkey noted down previously

Create a script named `bet.sh` with the following contents

```bash
#!/bin/bash
komodo-cli -ac_name=DORN DEX_broadcast <Raddress of your Pubkey> 5 DORN DORN <Your Pubkey> $1 $2
```

- replace `<Raddress of your Pubkey>` with the normal address that corresponds to your Pubkey
- replace `<Your Pubkey>` with your pubkey

### Start the `betdapp`

```bash
cd ~/komodo/src
./betdapp DORN "" DORN
```

### Publish the bet

Execute the script using with the amount to offer as bet as arguments

```bash
./bet.sh 20 20
```

Observe the screen where `betdapp` is running to see if any Alice node is trying to fill a bet.

## Alice node

This is a node that fills bets that are offered by other nodes on the network. Launch the node using the above launch parameters. Then get a pubkey from it by following the guide [here](./get-new-pubkey)  

Stop the chain and relaunch it after adding the following parameters to the previous launch parameters.

```bash
-dexp2p=2 -handle=<ANY NAME>_alice -pubkey=<REGULAR PUBKEY>
```

- replace `<ANY NAME>` with a name for this node 
- replace `<REGULAR PUBKEY>` with the pubkey noted down previously

### Find active bets

```bash
komodo-cli -ac_name=DORN DEX_list 0 0 DORN DORN
```

From the matches, select a datablob and note its id

### Start the `betdapp`

```bash
cd ~/komodo/src
./betdapp DORN "" <id of bet datablob>  <amount to bet>
```

- replace `<id of bet datablob>` with the id noted before
- replace `<amount to bet>` with the total amount to bet

Now, the program should execute and start betting with the Bob node. In each step, the program bets only `1/1000` th of the total bet value
