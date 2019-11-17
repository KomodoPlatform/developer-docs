# Pegs Module Creator Tutorial

**The guide here has been tested to work on Ubuntu/(debian). The system is being constantly updated based on specifications, bugfixes or other improvements. Please let us know in the #cc-pegs channel of [Komodo Discord](https://komodoplatform.com/discord) if you find any issues or incorrect information. Also use the same channel for test reports and feedback.**

## Tutorial

In this tutorial, we will launch a new Smart Chain named TESTUSDK and follow a walkthrough of the flow a creator of the Pegs module will experience.

To that effect, we will go through the following steps:

- launch a new test Chain - TESTUSDK
- Deposit KMD coins in the multisig address that belongs to the Gateway on the USDKTEST chain
- Claim the tokenized KMD on the USDKTEST chain
- Lock the tokenized KMD in the Pegs module and get the USDK coins
- Redeem the tokenized KMD using the pegsredeem command
- Send the tokenized KMD back to the Gateway to receive the KMD coins in the KMD chain

## Installation

### Dependencies

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl clang libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

#### Optional

Create a swap partition if you are using a VPS with low amount of RAM. The following commands create a 4GB SWAP file. You can create 8GB if you have the required free storage and want it.

```bash
sudo swapon --show
free -h
df -h
sudo fallocate -l 4G /swapfile
ls -lh /swapfile
sudo chmod 600 /swapfile
ls -lh /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
free -h
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10 # This setting will persist until the next reboot. We can set this value automatically at restart by adding the line to our /etc/sysctl.conf file:
sudo nano /etc/sysctl.conf
vm.swappiness=10
```

### Build the Komodo daemon

```bash
git clone https://github.com/Mixa84/komodo
cd komodo
git checkout pegsCC
export CONFIGURE_FLAGS='CPPFLAGS=-DTESTMODE'
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
cd src
```

## Connecting to the test Chain - USDKTEST

Navigate to the source directory

```bash
cd ~/komodo/src
```

Launch parameters:

```bash
./komodod -ac_supply=1000000 -ac_reward=10000 -ac_name=USDKTEST -ac_cc=2 -ac_import=PEGSCC -ac_end=1 -ac_perc=0 -ac_cbopret=5 -debug=pegscc-2 -debug=importcoin -debug=cctokens -debug=gatewayscc -printtoconsole=1 -addnode=116.203.17.140 -addnode=116.203.17.141 -earlytxid=a9539ec8db34ee44ff213cda59f412a02795821cf05844b0bc184660711371f7 -pubkey=<your pubkey> &
```

Replace the text `<your pubkey>` with your pubkey and execute the above command to launch the chain.

Import the privatekey corresponding to the pubkey used to start the USDKTEST chain

```bash
./komodo-cli -ac_name=USDKTEST importprivkey <your privkey>
```
