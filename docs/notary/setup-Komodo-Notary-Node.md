# Setup Komodo Notary Node

## Komodo Notary Nodes

### Note

This is still in _BETA_ phase. This is to give you a good understanding on building a Komodo Notary Node. It is possible that some commands could be deprecated by the time you read it.

If you have any problems, please join `#notarynode` on the [Komodo Discord](https://komodoplatform.com/discord)

## Requirements

### Hardware

Komodo currently only works on Linux. To setup Komodo Notary Node be sure you have a good solid server with the following requirements:

- CPU: A good CPU (Xeon/i7)

- RAM: 64GB

- Disk: 500GB SSD

- Bandwidth: 100Mbps

### Operating System

Ubuntu x64 - _14.04 or 16.04_ minimal installation with Openssh server. _This tutorial has been successfully tested with 14.04 and 16.04_.

### Security

_Before doing anything further, please ensure that your server is secure._

- Update the Operating System: `sudo apt-get -y update && sudo apt-get -y upgrade`

- Install [Fail2ban](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04).

- Create an unprivileged user and [install a SSH key](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)

- Please run processes as an unprivileged user and use sudo where necessary

### Bitcoin funded Address

You'll also need to fund the bitcoin address used with notary node.

Each notary node when notarise a block is currently set to use 0.0001 BTC. So, it is best to put some BTC to it if you are participating in testnet of Komodo Notary Nodes.

Example:

`0.0001 \* aprox. 144 (btc blocks per day) = aprox. 0.0144`

## Get Started

Log in as the user you made earlier (`ssh user@ip_address_of_server`)

```bash
sudo apt-get update
sudo apt-get upgrade (and say Y when it wants to upgrade stuff)
```

The following packages are needed:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libqrencode-dev libdb++-dev ntp ntpdate nano software-properties-common curl libevent-dev libcurl4-gnutls-dev cmake clang libsodium-dev
```

### Install `nanomsg`

Libnanomsg needs to be installed.

```bash
cd ~
git clone https://github.com/nanomsg/nanomsg
cd nanomsg
cmake . -DNN_TESTS=OFF -DNN_ENABLE_DOC=OFF
make -j2
sudo make install
sudo ldconfig
```

### Installing `bitcoind`

Let us first install Bitcoind, because it takes some time to sync it all up (around 12 hours)

```bash
sudo add-apt-repository ppa:bitcoin/bitcoin
sudo apt-get update
sudo apt-get install bitcoind
```

Let's create folder `.bitcoin`

```bash
cd ~/
mkdir .bitcoin
cd .bitcoin
nano bitcoin.conf
```

Paste this in your `bitcoin.conf` (replace rpcuser and rpcpassword)

```bash
server=1
daemon=1
txindex=1
rpcuser=bitcoinrpc
rpcpassword=password
bind=127.0.0.1
rpcbind=127.0.0.1
```

secure the `bitcoin.conf` file

```bash
chmod 600 ~/.bitcoin/bitcoin.conf
```

Start Bitcoind

```bash
bitcoind -daemon
```

check to see if it's downloading the blocks

```bash
bitcoin-cli getblockchaininfo
```

This takes some time depending your internet connection. Let it run in the background. Now it is time to install Komodo. Follow each line step by step and ignore the "libgmp headers missing" at some point!

### Installing Komodo

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout dev
./zcutil/fetch-params.sh
```

-j8 uses 8 threads - replace 8 with number of threads you want to use or `nproc` variable

```bash
./zcutil/build.sh -j$(nproc)
```

This can take some time.

### When it is finished, let's create `komodo.conf`

```bash
cd ~
mkdir .komodo
cd .komodo
nano komodo.conf
```

Add the following lines to the komodo.conf file (replace rpcuser and rpcpassword)

```bash
rpcuser=bitcoinrpc
rpcpassword=password
txindex=1
```

Now let's start the mining process. Use `CTRL-C` to get out when you miss your cursor

```bash
cd ~
cd komodo
```

To start the daemon to import btcdwif later on this setup

```bash
./src/komodod &
```

### Komodo is now performing the initial blockchain download

Here are some additional commands which will be handy in the future

This will get the stats:

```bash
./src/komodo-cli getinfo
```

To stop the daemon:

```bash
./src/komodo-cli stop
```

To view komodod output (very handy):

```bash
tail -f ~/.komodo/debug.log
```

To view all commands

```bash
./src/komodo-cli help
```

## Setting up SuperNET/Iguana

Personally I prefer to have a full downloaded Bitcoin blockchain. But be sure you stop Bitcoind when you are going to install SuperNET/Iguana!!

```bash
cd ~
git clone https://github.com/jl777/SuperNET
cd SuperNET/iguana
git checkout dev
./m_LP
```

Temporary: start `~/SuperNET/agents/iguana` just for setup, not for normal NN use, i.e., one time to get the pubkey

```bash
~/SuperNET/agents/iguana
```

Open up a new SSH window and login to your server

```bash
cd ~/SuperNET/iguana/coins
./basilisk.old
```

if you receive this error: `"ERROR BINDING PORT.8332` this is normal tcp timeout, unless another process is using port" then you were already running Bitcoind in the background. Stop Iguana and Bitcoind and start the above again.

Create an iguana wallet with encryptwallet and importprivkey into both komodod and bitcoind using the KMDwif and BTCwif in the encryptwallet result once you have them installed and running. Put in a really good password and be sure you keep the slash at the end.

```bash
curl --url "http://127.0.0.1:7778" --data "{\"agent\":\"bitcoinrpc\",\"method\":\"encryptwallet\",\"passphrase\":\"insert very secure password here\"}"
```

Goto to `~/SuperNET/iguana` and create the executable file "wp"

```bash
cd ~/SuperNET/iguana
nano wp
```

Paste this into your wp file and be sure you set the password that you have made above (watch out for the slash at the end)

```bash
curl --url "http://127.0.0.1:7778" --data "{\"method\":\"walletpassphrase\",\"params\":[\"same passphrase as above\", 9999999]}"
```

Make it executable

```bash
chmod +x wp
```

Run the `wp` script file

```bash
./wp
```

Output example below

```json
{
  "pubkey": "7fa4cbfb3c33981b3015c6d08895fe5769ead9cbfae4b89afab681ab0db15f43",
  "RS": "NXT-KL8J-EFN2-2BXJ-BUUTB",
  "NXT": "10729644020227164368",
  "btcpubkey": "03a47c429b6fd83dc9687ba409ee6f34823094b97bad4c0f4f60649c55bbdf497b",
  "rmd160": "58e7000f7d6e4d48e6bf46b1cdb2ad5842232411",
  "BTCD": "RHPGGaJML2Ts7TLz6WasK3xSX3XKuKsHeD",
  "BTC": "1975C4R4jCfJ3SyndLbkDXdEkn4jJibuqK",
  "result": "success",
  "handle": "",
  "persistent": "7fa4cbfb3c33981b3015c6d08895fe5769ead9cbfae4b89afab681ab0db15f43",
  "status": "unlocked",
  "duration": 3600,
  "tag": "14543391360640231809"
}
```

In the output of the executed file you will see a lot of data. Get the **btcpubkey (not the pubkey!)** (`03a47c429b6fd83dc9687ba409ee6f34823094b97bad4c0f4f60649c55bbdf497b`) and send it to Kolo. It is strongly recommended to write the above info somewhere and save it.

Create a text file `~/SuperNET/iguana/userhome.txt` with just this path in it

```bash
nano ~/SuperNET/iguana/userhome.txt
# and put your home folder in it. Mostly it is home/username (without the front and back slash!)
```

Copy these files then change them from using port 7778 to 7776

```bash
cp ~/SuperNET/iguana/coins/btc ~/SuperNET/iguana/
cp ~/SuperNET/iguana/coins/kmd ~/SuperNET/iguana/
```

Create the wallet passphrase (unlocking) api call at `~/SuperNET/iguana/wp_7776` - this gets called at notary start up

```bash
curl --url "http://127.0.0.1:7776" --data "{\"method\":\"walletpassphrase\",\"params\":[\"YOUR VERY SECURE PASSPHRASE\", 9999999]}"
```

Now create a new file for the btcpubkey. Enter it as: pubkey=xxxxxxxxxxxxxxxxxxxxxxx

```bash
nano pubkey.txt
cp ~/SuperNET/iguana/pubkey.txt ~/komodo/src/pubkey.txt
```

We have installed all the things we needed, but we have some configurations to do. Komodo is now mining with his own komodo pubkey, but we have to integrate some stuff into komodo. Let's hope you have copied and pasted the part where you got your btcpubkey etc. somewhere. Bring it back up.

## Final Steps

While komodo is still mining we can send commands to it. We need to import the privkey of your BTCD address into Komodo. Find your BTCDwif key (do NOT mistake it with your BTCwif). Now let's import it.

```bash
cd ~
cd komodo
./src/komodo-cli importprivkey BTCDwif
# replace BTCDwif with the key you received earlier (like: UvCbPGo2B5QHKgMN5KFRz10sMzbTSXunRTLB9utqGhNFUZrJrEWa)
```

To check to see if it imported successfully run

```bash
./src/komodo-cli validateaddress btcdaddress
# replace btcdaddress with the address you received earlier (like: RVxtoUT0CXbC1LrtltNAf9yR5yWnFnSPQh)
```

if `ismine: true` it has been successfully imported

We have successfully imported the BTCD address into Komodo.

Now we have to integrate your BTC privkey into your Bitcoin installation. Be sure Bitcoind is running at this point!

Import BTC Priv Key (BTCwif)

```bash
bitcoin-cli importprivkey BTCwif &
# replace BTCwif with the key you received earlier (like: L3Qm5bB3frS2rdMNtmZrEMReRvYKMReALwxMaf00oz9YahvZaB4a)
```

Run the following to confirm it has imported properly.

```bash
bitcoin-cli validateaddress yourbtcaddress
# replace yourbtcaddress with the address you received earlier (like: 1MghixZrbhncwLGTIiP3ZdeDKhzBaPUKKu)
```

if `ismine: true` it has been successfully imported

### Import private key into assetchains

Import your KMD/BTCD WIF into all assetchains

```bash
cd ~
cd komodo/src
./assetchains
# wait for the blockchain to fully, will take a long time
./fiat-cli importprivkey BTCDwif
# replace BTCDwif with the key you received earlier (like: UvCbPGo2B5QHKgMN5KFRz10sMzbTSXunRTLB9utqGhNFUZrJrEWa)
```

This will trigger blockchain rescan and may take a very long time. Wait for the process to be finished.

### Install Chips

```bash
cd ~
sudo apt-get update && sudo apt-get install software-properties-common autoconf git build-essential libtool libprotobuf-c-dev libgmp-dev libsqlite3-dev python python3 zip jq libevent-dev pkg-config libssl-dev libcurl4-gnutls-dev cmake libboost-all-dev -y
git clone https://github.com/jl777/chips3.git
cd chips3/
git checkout dev
```

Build Berkeley DB 4.8

```bash
CHIPS_ROOT=$(pwd)
BDB_PREFIX="${CHIPS_ROOT}/db4"
mkdir -p $BDB_PREFIX
wget 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
tar -xzvf db-4.8.30.NC.tar.gz
cd db-4.8.30.NC/build_unix/
../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$BDB_PREFIX
make -j$(nproc)
make install
```

Build Chips

```bash
cd ~/chips3
./autogen.sh
./configure LDFLAGS="-L${BDB_PREFIX}/lib/" CPPFLAGS="-I${BDB_PREFIX}/include/" -without-gui -without-miniupnpc --disable-tests --disable-bench --with-gui=no
make -j$(nproc)
```

Create `chips.conf` file with random username, password, txindex and daemon turned on:

```bash
cd ~
mkdir .chips
nano .chips/chips.conf
```

Add the following lines into your `chips.conf` file

```bash
rpcuser=chipsuser
rpcpassword=passworddrowssap
txindex=1
daemon=1
addnode=5.9.253.195
addnode=74.208.210.191
```

Symlinking the binaries

```bash
sudo ln -sf /home/$USER/chips3/src/chips-cli /usr/local/bin/chips-cli
sudo ln -sf /home/$USER/chips3/src/chipsd /usr/local/bin/chipsd
sudo chmod +x /usr/local/bin/chips-cli
sudo chmod +x /usr/local/bin/chipsd
```

Run!

```bash
chipsd
```

Check

```bash
chips-cli getinfo
```

Import privkey

```bash
chips-cli importprivkey BTCDwif
# replace BTCDwif with the key you received earlier (like: UvCbPGo2B5QHKgMN5KFRz10sMzbTSXunRTLB9utqGhNFUZrJrEWa)
```

### Install GameCredits

```bash
cd ~
sudo apt-get update && sudo apt-get install software-properties-common autoconf git build-essential libtool libprotobuf-c-dev libgmp-dev libsqlite3-dev python python3 zip jq libevent-dev pkg-config libssl-dev libcurl4-gnutls-dev cmake -y
git clone https://github.com/gamecredits-project/GameCredits
cd GameCredits/
git checkout master
```

In Debian9 you might need to do `sudo apt-get install libssl1.0-dev` or compile the openssl and place it in the Gamecredits folder and point `gamecreditsd` at it, so that it wouldn't interfere with other coin daemons.

Build Berkeley DB 4.8

```bash
GAME_ROOT=$(pwd)
BDB_PREFIX="${GAME_ROOT}/db4"
mkdir -p $BDB_PREFIX
wget 'http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz'
echo '12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef db-4.8.30.NC.tar.gz' | sha256sum -c
tar -xzvf db-4.8.30.NC.tar.gz
cd db-4.8.30.NC/build_unix/
../dist/configure -enable-cxx -disable-shared -with-pic -prefix=$BDB_PREFIX
make -j$(nproc)
make install
```

Build GameCredits

```bash
cd ~/GameCredits
./autogen.sh
./configure LDFLAGS="-L${BDB_PREFIX}/lib/" CPPFLAGS="-I${BDB_PREFIX}/include/" -without-gui -without-miniupnpc --disable-tests --disable-bench --with-gui=no
make -j$(nproc)
```

Create `gamecredits.conf` file with random username, password, txindex and daemon turned on:

```bash
cd ~
mkdir .gamecredits
nano .gamecredits/gamecredits.conf
```

Add the following lines into your `gamecredits.conf` file

```bash
rpcuser=gamecreditsuser
rpcpassword=passworddrowssap
txindex=1
daemon=1
bind=127.0.0.1
rpcbind=127.0.0.1
addnode=x.x.x.x
addnode=y.y.y.y
```

Symlinking the binaries

```bash
sudo ln -sf /home/$USER/GameCredits/src/gamecredits-cli /usr/local/bin/gamecredits-cli
sudo ln -sf /home/$USER/GameCredits/src/gamecreditsd /usr/local/bin/gamecreditsd
sudo chmod +x /usr/local/bin/gamecredits-cli
sudo chmod +x /usr/local/bin/gamecreditsd
```

Run!

```bash
gamecreditsd
```

Check

```bash
gamecredits-cli getinfo
```

Import privkey

```bash
gamecredits-cli importprivkey GAMEwif
# replace GAMEwif with the key you received earlier (like: UvCbPGo2B5QHKgMN5KFRz10sMzbTSXunRTLB9utqGhNFUZrJrEWa)
```

Now we need to chain everything together. Pondsea came up with a nice handy little script. So let's start

Create a script file at `/home/username/` and name it start

```bash
nano start
```

Paste into file and replace the pubkey with your `btcpubkey` and save it.

```bash
bitcoind &
chipsd -pubkey="0225aa6f6f19e543180b31153d9e6d55d41bc7ec2ba191fd29f19a2f973544e29d" &
gamecreditsd -pubkey="0225aa6f6f19e543180b31153d9e6d55d41bc7ec2ba191fd29f19a2f973544e29d" &
cd komodo
./src/komodod -gen -genproclimit=1 -notary -pubkey="0225aa6f6f19e543180b31153d9e6d55d41bc7ec2ba191fd29f19a2f973544e29d" &
```

Make it executable

```bash
chmod +x start
```

This should bind all the tech stuff together, but not before we make some tweaking to the system. Hagbard came up with the following tweak.

## Set `ulimit` parameters on Ubuntu permanent

By default the number of open files per user in Ubuntu is 1024. In our case this number is too small so you have to increase it.

This is done with the `ulimit` command:

```bash
$ulimit -a   # see all the kernel parameters
$ulimit -n   # see the number of open files
$ulimit -n 1000000  #  set the number open files to 1000000
```

The problem with this way is that the `ulimit` parameter is only set currently for this command terminal and user. This means that after a reboot you’ll need to set the parameter again. Do the following to set it permanent:

edit `/etc/security/limits.conf`

```bash
sudo nano /etc/security/limits.conf
```

add these lines:

```bash
* soft nofile 1000000
* hard nofile 1000000
```

save and close file

edit `/etc/pam.d/common-session`

```bash
sudo nano /etc/pam.d/common-session
```

add this line:

```bash
session required pam_limits.so
```

save and close file

reboot & check:

```bash
ulimit -n
```

We are done. Now let's reboot the server and chain everything together with the start script and m_notary

When the server is rebooted and you are logged in as user (and lands into your home dir)

```bash
./start
CTRL-C
cd komodo/src
./assetchains
# and wait 15 minutes before you go to the next step
cd ~/SuperNET/iguana
git checkout dev && git pull && ./m_notary &
# wait until you see `INIT with 64 notaries`
cd ~/komodo/src && ./dpowassets
```

We are done! If you have given the btcpubkey to James and he has added it to the `notaries.h` files located ([jl777/SuperNET:iguana/notaries.h@master](https://github.com/jl777/SuperNET/blob/master/iguana/notaries.h)) everything should work now.

## N00b Q&A

- I receive "null utxo array size" as output when i start script start2 You have to fund your BTC wallet with 0.01btc. Send your BTC address to James and he will fund it.
- If I did not initially run bitcoind or komodod with txindex=1, then should I add that to .conf and rescan blockchain or something? Yes, you need to launch it with -reindex in the command line arg (like bitcoind -reindex &)
- When i start Iguana, i see a message that my IP is dead. Is it? It isn't ;-) just start de start2 script and it's alive.
- When i log out of my server and log back in again after i while, the Iguana proces has been killed, why? I do not know why, i had this problem myself. Contact BadAss for a solution for this.
- I get all kinds of strange warnings in the output of start2. Did i broke something? Rule nr.1, if you do not see any ERROR's, let it run. James is busy with debugging the code. Do you see warnings, then let it run. If you don't trust it, restart it again.
- My Iguana process gets killed by a buffer overflow error. Do i have to start over again? No, just go to ~/SuperNET and do a git pull.
