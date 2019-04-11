# Building Komodo from source

For OSx instructions: see [Installing Komodo on OSX](./installation.html#installing-komodo-on-osx)

For Windows instructions: see [Installing Komodo on Windows 64-bit systems](./installation.html#installing-komodo-on-windows-64-bit-systems)

## Installing Komodo on Ubuntu/Debian

### Requirements

Currently, you will need:

- Linux (easiest with a Debian-based distribution)

- For Ubuntu, we recommend using only the 16.04 or 18.04 releases

- 64-bit

- Minimum 4GB of free RAM (8GB+ recommended)

### Get Started

Log in as the user to your system, and issue these commands to make sure your Linux machine is up to date.

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

#### Install the dependency packages:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl libcurl4-gnutls-dev cmake clang libsodium-dev -y
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

This takes some time depending your internet connection. Let it run in the background. Now it is time to install Komodo. Follow each line step by step and ignore the "libgmp headers missing" at some point!

### Installing Komodo

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout dev
./zcutil/fetch-params.sh
```

`-j8` uses 8 threads - replace `8` with number of threads you want to use or use the `nproc` variable to use all threads.

```bash
./zcutil/build.sh -j$(nproc)
```

This can take some time.

#### When it is finished, let's create `komodo.conf`

```bash
cd ~
mkdir .komodo
cd .komodo
nano komodo.conf
```

Add the following lines to the `komodo.conf` file (replace `rpcuser` and `rpcpassword` with your own)

```bash
rpcuser=usernameChangeItToSomethingSecure
rpcpassword=passwordChangeItToSomethingSecure
txindex=1
bind=127.0.0.1
rpcbind=127.0.0.1
addnode=78.47.196.146
addnode=5.9.102.210
addnode=178.63.69.164
addnode=88.198.65.74
addnode=5.9.122.241
addnode=144.76.94.38
```

- Press `CTRL+O` to save the changes.

- Press `CTRL+X` to exit nano editor.

Now you can start komodod daemon to sync with the network

```bash
cd ~
cd komodo/src
./komodod &
```

You might see some outputs in terminal where you started the `komodod` daemon. So, open a new tab or new terminal window and go to Komodo data directory to see updated logs of Komodo:

```bash
tail -f ~/.komodo/debug.log
```

After `tail` command it will start showing logs update to you as it syncs with the network. If you want to terminate this command just press `CTRL+C`.

In another terminal window you can go to Komodo source directory and use `komodo-cli` command to check the latest update info. like:

```bash
cd ~/komodo/src/
./komodo-cli getinfo
```

This will show you latest info of blockchain and wallet like this:

```json
{
  "version": 1000550,
  "protocolversion": 170002,
  "KMDversion": "0.1.0",
  "notarized": 186670,
  "notarizedhash": "000000308845da840ab9af6c1e09dc02f3118683df065b5ec00b05c9bd58cdae",
  "notarizedtxid": "6723a10ef4fceab230d4245305d1ed2a916e435abb83269c20daad9bbefd3f0e",
  "notarizedtxid_height": "mempool",
  "notarized_confirms": 0,
  "walletversion": 60000,
  "balance": 0,
  "interest": 0,
  "blocks": 186773,
  "longestchain": 308867,
  "timeoffset": 0,
  "tiptime": 1486411069,
  "connections": 8,
  "proxy": "",
  "difficulty": 1624278.6287953,
  "testnet": false,
  "keypoololdest": 1482746526,
  "keypoolsize": 101,
  "paytxfee": 0.0,
  "relayfee": 0.00001,
  "errors": ""
}
```

in this output when you see `"blocks"` and `"longestchain"` values showing same, your wallet is in full sync.

### Updating Komodo installation to the latest version

If you already have installed Komodo from it's source code on your machine, and need to update to the latest version, follow the below steps.

Please follow each step carefully and don't skip to the next one until the previous step is successfully completed. If you have the `komodo daemon` running, you can leave it running while updating if you have enough resources in your machine. If you prefer to stop it before updating, please use `~/komodo/src/komodo-cli stop` to stop the daemon and proceed with the following steps to update.

1. Navigate to your komodo directory

```bash
cd ~/komodo
```

1. Make sure you don't have any changes made to the source and reset it. This will ensure clean source and shouldn't create issues while pulling the latest source in the next step.

```bash
git reset --hard
```

1. Clean the source directory

```bash
make clean
```

1. Update the source. (If you have any changes made to the source code, this command may not pull the latest source. Please make sure you have followed the previous steps)

```bash
git pull
```

1. Compile the latest binary

```bash
./zcutil/build.sh -j$(nproc)
```

Start your sevices as usual. If you didn't stop the deamon before compiling, please stop it using `~/komodo/src/komodo-cli stop` and start again.

If you are in a hurry, most of the time the below steps can be used to update the daemon and it takes lesser amount of time to compile. But it is a good practice to follow the steps outlined above to make sure the compilation process completes without an error.

```bash
cd ~/komodo
git checkout dev
git pull
make -j$(nproc)
```

### IMPORTANT: Backup your wallet

We can not stress enough to take a backup of your wallet.dat file time to time. Here's the reason why:

- When you send some funds from an address, sometimes the funds used from the unspent transaction outputs (utxo) leaves a change behind. This change doesn't go back to the same address the funds sent from. This change goes to a new address. And this new address is stored in the wallet.dat file located in Komodo data directory on your machine.

- Sometimes your wallet.dat file may got corrupted. It's always good to have backup handy.

If you are not sure when to take backup of your wallet.dat file, just take backup of it according to how often your use. If you use it regularly, then just take a backup of your wallet.dat file at then end of day. If not so often then maybe twice a week or depending on your use adjust your time period of taking backup.

You can find your wallet.dat file under linux at `~/.komodo/wallet.dat`.

To backup you can take a copy of this file and make archive of it.

```bash
# To copy
cp -av ~/.komodo/wallet.dat ~/wallet.dat

# To rename file
mv ~/wallet.dat ~/wallet_backup_DATE_HERE.dat

# example
mv ~/wallet.dat ~/wallet_backup_21May2017.dat

# To make archive
tar -czvf ~/wallet_backup_21May2017.dat.tgz ~/wallet_backup_21May2017.dat
```

## Installing Komodo on OSX

### Requirements

Ensure commandline tools from apple/xcode are installed. Issue the following command in a terminal.

```bash
xcode-select --install
```

`brew` is needed to install dependencies. If you have latest `brew` installed in your system already, skip this and install the deps directly.

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

These are the dependencies needed to install with `brew`.

```bash
brew update
brew upgrade
    brew tap discoteq/discoteq; brew install flock
    brew install autoconf autogen automake
    brew install gcc@6
    brew install binutils
    brew install protobuf
    brew install coreutils
    brew install wget
    brew install nanomsg
```

### Clone the Komodo repository

```bash
git clone https://github.com/jl777/komodo
```

### Get the Zcash params:

```bash
cd komodo
./zcutil/fetch-params.sh
```

### Compile Komodo

```bash
git checkout dev
./zcutil/build-mac.sh
```

This can take some time, so let's create a configuration file in the mean time using a fresh terminal.

### Create configuration file

The configuration file should be created in the following directory:

```bash
~/Library/Application\ Support/Komodo
```

Create the directory if it's missing:

```bash
mkdir ~/Library/Application\ Support/Komodo
```

and create the configuration file by entering this in terminal:

```bash
echo "rpcuser=komodouser" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "txindex=1" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "bind=127.0.0.1" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "rpcbind=127.0.0.1" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "addnode=5.9.102.210" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "addnode=78.47.196.146" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "addnode=178.63.69.164" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "addnode=88.198.65.74" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "addnode=5.9.122.241" >> ~/Library/Application\ Support/Komodo/komodo.conf
echo "addnode=144.76.94.38" >> ~/Library/Application\ Support/Komodo/komodo.conf
```

### Run Komodo

If the build went well, run komodo:

```bash
cd ~/komodo/src
./komodod &
```

To track progress of downloading the Komodo blockchain:

```bash
tail -f ~/Library/Application\ Support/Komodo/debug.log
```

or get info with the getinfo command:

```bash
cd ~/komodo/src
./komodo-cli getinfo
```

## Installing Komodo on Windows 64-bit systems

PLEASE FOLLOW THE VIDEO TUTORIAL: [https://youtu.be/gfZZy8b222E](https://youtu.be/gfZZy8b222E)

1. First download komodo windows [binaries](https://github.com/KomodoPlatform/komodo/releases) and place the files in a new folder on the Desktop called kmd ('`C:\\Users\\YourUserName\\Desktop\\kmd`') .

Open a Command Prompt for the following steps.

1. Next we'll create the Komodo directory in the `AppData` directory.

```bash
mkdir "%HOMEPATH%\AppData\Roaming\komodo"
```

1. Next we will create our `komodo.conf` file.

```bash
notepad “%HOMEPATH%\AppData\Roaming\Komodo\komodo.conf”
```

When Notepad opens, click `Yes` to create the komodo.conf file. Copy the information below and paste it into Notepad.

```bash
rpcuser=usernameChangeItToSomethingSecure
rpcpassword=passwordChangeItToSomethingSecure
daemon=1
rpcallowip=127.0.0.1
rpcbind=127.0.0.1
server=1
txindex=1
addnode=5.9.102.210
addnode=78.47.196.146
addnode=178.63.69.164
addnode=88.198.65.74
addnode=5.9.122.241
addnode=144.76.94.38
```

After pasting, save and exit Notepad.

1. Create the directory for ZcashParams:

```bash
mkdir “%HOMEPATH%\AppData\Roaming\ZcashParams”
```

And download following files in `ZcashParams` folder:

- [sprout-proving.key](<[https://z.cash/downloads/sprout-proving.key](https://z.cash/downloads/sprout-proving.key)>)

- [sprout-verifying.key](<[https://z.cash/downloads/sprout-verifying.key](https://z.cash/downloads/sprout-verifying.key)>)

- [sapling-spend.params](<[https://z.cash/downloads/sapling-spend.params](https://z.cash/downloads/sapling-spend.params)>)

- [sapling-output.params](<[https://z.cash/downloads/sapling-output.params](https://z.cash/downloads/sapling-output.params)>)

- [sprout-groth16.params](<[https://z.cash/downloads/sprout-groth16.params](https://z.cash/downloads/sprout-groth16.params)>)

1. Now we can run `komodod.exe`

```bash
"%HOMEPATH%\Desktop\kmd\komodod.exe"
```

1. Komodod should start syncing. You can check progress by running

```bash
"%HOMEPATH%\Desktop\kmd\komodo-cli.exe" getinfo
```

1. To stop `komodod`, run:

```bash
"%HOMEPATH%\Desktop\kmd\komodo-cli.exe" stop
```

Downloads:

- Windows Binaries: [https://github.com/KomodoPlatform/komodo/releases](https://github.com/KomodoPlatform/komodo/releases)

- [sprout-proving.key](<[https://z.cash/downloads/sprout-proving.key](https://z.cash/downloads/sprout-proving.key)>)

- [sprout-verifying.key](<[https://z.cash/downloads/sprout-verifying.key](https://z.cash/downloads/sprout-verifying.key)>)

- [sapling-spend.params](<[https://z.cash/downloads/sapling-spend.params](https://z.cash/downloads/sapling-spend.params)>)

- [sapling-output.params](<[https://z.cash/downloads/sapling-output.params](https://z.cash/downloads/sapling-output.params)>)

- [sprout-groth16.params](<[https://z.cash/downloads/sprout-groth16.params](https://z.cash/downloads/sprout-groth16.params)>)
