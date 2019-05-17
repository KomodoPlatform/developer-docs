# Building the komodod Daemon From Source Code

The basic Komodo software package includes two applications.

`komodod` - This is the Smart Chain daemon that powers all Komodo blockchains.

`komodo-cli` - This software allows a developer to execute API calls to `komodod` via the command line.

#### (Optional) Pre-compiled Executable Software

To install the basic Komodo software, the simplest method is to download and unzip pre-compiled executables. The can serve as a replacement method over building the `komodod` daemon from source for a typical (non-developer) user. Please see the linked section below, Simple Installations, for more information.

[<b>Link to Simple Installations section for pre-compiled executables</b>](../basic-docs/komodo-platform-overview/start-here/simple-installations.html)

#### Building Komodo Software From Source

You may also build Komodo software from source.

This is not required, but building from source is considered the best practice in a production environment as this allows you to instantly update to the latest patches and upgrades.

Source code exists for most major OS's, including Windows, MacOS, and Linux.

## Linux (Ubuntu/Debian)

#### Requirements

- Linux (easiest with a Debian-based distribution, such as Ubuntu)

- For Ubuntu, we recommend using only the 16.04 or 18.04 releases

- 64-bit Processor

- Minimum 4GB of free RAM (8GB+ recommended)

#### Get Started

Verify that your system is up to date.

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

#### Install the dependency packages

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool libncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libqrencode-dev libdb++-dev ntp ntpdate nano software-properties-common curl libevent-dev libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

This action takes some time, depending on your Internet connection. Let the process run in the background. 

Once completed, follow the steps below to install Komodo.

::: tip Note
At some point during the installation process, you will see a warning, "libgmp headers missing". This can safely be ignored.
:::

#### Installing Komodo

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout dev
./zcutil/fetch-params.sh
```

#### Build the Zcash Parameters

In the command below, the `-j$(nproc)` parameter instructs the script to utilize all available processors in your hardware. 

Alternatively, you may instruct the script to use only a set number of processors. For example, `-j8` will instructs the script to use `8` processors.

```bash
./zcutil/build.sh -j$(nproc)
```

This script can take some time.

#### Create the komodo.conf File

```bash
cd ~
mkdir .komodo
cd .komodo
nano komodo.conf
```

With the `komodo.conf` file open in the Nano text editor, add the following lines. 

(Create your own `rpcuser` username and `rpcpassword` password.)

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

Press `CTRL+O` to save the changes.

Press `CTRL+X` to exit the Nano editor.

Start the `komodod` daemon. It will automatically begin syncing with the network.

```bash
cd ~
cd komodo/src
./komodod &
```

The `&` parameter in the last instruction above instructs the terminal to continue allowing you to enter commands within this terminal shell. 

#### (Optional) Tail the komodod Daemon

Enter the following command to "tail" the `komodod` daemon. The `tail` command allows you to view the `debug.log` file updates in real time.

```bash
tail -f ~/.komodo/debug.log
```
#### Test Your Daemon with komodo-cli

Ensure that your current working directory is in the default `src` directory.

```bash
cd ~/komodo/src/
```

You may now use the `komodo-cli` software to send API (RPC) calls to the `komodod` daemon. 

For example:

```bash
./komodo-cli getinfo
```

This command returns the latest state information about the KMD blockchain and your `wallet.dat` file.d

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

When the `blocks` and `longestchain` values are equal to each other, your machine is in sync with the network.

### Updating komodod on Linux

To update your compiled `komodod` daemon, follow the steps below carefully. For each step, do not proceed to the next step until the current step is fully complete.

You may leave the `komodod` daemon running, if necessary, and if your machine has sufficient resources. 

Alternatively, you may stop the daemon by executing `~/komodo/src/komodo-cli stop`.

#### Navigate to your komodo directory

```bash
cd ~/komodo
```

#### Reset Your Local Repository

```bash
git reset --hard
```

#### Clean the Source Directory

```bash
make clean
```

#### Update Your Local Source Code

```bash
git pull
```

#### Compile the Latest Zcash Binary

```bash
./zcutil/build.sh -j$(nproc)
```

#### Reset the komodod Daemon

Start your sevices as usual. 

(If you did not stop the deamon before compiling, stop the daemon using `~/komodo/src/komodo-cli stop` and start the daemon again.)

```bash
~/komodo/src/komodod &
```

#### Rapid Update Method

The steps below can often be used to update the daemon. These steps take a lesser amount of time, and occasionally may produce an error. If the steps below do not succeed, simply use the update steps listed above.

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
./zcutil/build-mac.sh -j8
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


## Interacting with Komodo Chains

<!--

Sidd: We can move these sections below to separate files.

-->

Initiate the `komodod` daemon by calling it from the command line and including any desired runtime parameters.

When initiating any Smart Chain other than the main KMD chain, the user should always include all parameters that were used to create the Smart Chain.

::: tip
  Note to Windows Users: Replace ./komodod and ./komodo-cli with komodod.exe and komodo-cli.exe for each step.
:::

To launch the main KMD chain, execute the following command in the directory where `komodod` is installed.

```bash
./komodod &
```

After the daemon launches, you may interact with it using the `komodo-cli` software.

```bash
./komodo-cli API_COMMAND
```

To launch another Smart Chain, include the necessary parameters.

::: tip IMPORTANT
Always execute the launch command EXACTLY as indicated, and as the Smart Chain's developers instruct. If you make a mistake, you must delete the Smart Chain data and re-launch to regain access to the Smart Chain's network.
:::

For example, to launch the DEX Smart Chain, execute:

```bash
./komodod -ac_name=DEX -ac_supply=999999 -addnode=78.47.196.146 &
```

To interact with the DEX daemon, use `komodo-cli` like so:

```bash
./komodo-cli -ac_name=DEX API_COMMAND
```

In the terminal you can call the Komodo documentation by executing:

```bash
./komodo-cli help
```

To learn more via the terminal about a specific API command, execute:

```bash
./komodo-cli help API_COMMAND
```

## Ecosystem Launch Parameters

A list of launch parameters for all Smart Chains in the Komodo ecosystem can be found here.

[Link to list of all Smart Chain launch parameters](https://github.com/jl777/komodo/blob/master/src/assetchains.old)

