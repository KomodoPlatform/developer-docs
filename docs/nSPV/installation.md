# Installation

```bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool libncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libqrencode-dev libdb++-dev ntp ntpdate nano software-properties-common curl libevent-dev libcurl4-gnutls-dev cmake clang libsodium-dev -y
git clone https://github.com/jl777/libnspv
./autogen.sh
./configure
make
```

<!--
Usage:

```bash
nspv [COIN defaults to NSPV] (-c|continuous) (-i|-ips <ip,ip,...]>) (-m[--maxpeers] <int>) (-t[--testnet]) (-f <headersfile|0 for in mem only>) (-p <rpcport>) (-r[--regtest]) (-d[--debug]) (-s[--timeout] <secs>) <command>
```

Supported commands:
scan (scan blocks up to the tip, creates header.db file)

Examples:
Sync up to the chain tip and stores all headers in headers.db (quit once synced):

> nspv scan

Sync up to the chain tip and give some debug output during that process:

> nspv -d scan

Sync up, show debug info, don't store headers in file (only in memory), wait for new blocks:

> nspv -d -f 0 -c scan
-->
