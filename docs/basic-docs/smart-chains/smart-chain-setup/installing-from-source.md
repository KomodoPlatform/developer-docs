# Installing Smart Chain Software From Source Code

The basic Komodo software package includes two applications.

##### komodod

The `komodod` software application is the Smart Chain daemon that powers all Komodo blockchains.

##### komodo-cli

The `komodo-cli` software application allows a developer to execute API calls to `komodod` via the command line.

##### Both are Installed Automatically

Both of these software applications are installed in the `~/komodo/src/` directory as a part of any of the following installation procedures.

### The Two Methods to Install Smart Chain Software

There are two methods available to install Smart Chain software.

##### Pre-compiled Binaries

You can download and unzip our pre-compiled binaries. This is the simplest method and requires no installation procedure.

For more information on this method, please see the link below.

[<b>Link to simple installations section for pre-compiled executables</b>](../basic-docs/start-here/about-komodo-platform/simple-installations.html)

##### Building Smart Chain Software From Source

You may also build Smart Chain software from source.

This is not required, but building from source is considered the best practice in a production environment, as this allows you to instantly update to the latest patches and upgrades.

- [<b>Linux</b>](../../../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html#linux)
- [<b>MacOS</b>](../../../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html#macos)
- [<b>Windows</b>](../../../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html#windows)

## Linux

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

#### Clone the Komodo Repository

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout dev
```

#### Fetch the Zcash Parameters

```bash
./zcutil/fetch-params.sh
```

#### Build the Komodo Daemon

In the command below, the `-j$(nproc)` parameter instructs the script to utilize all available processors in your hardware. 

Alternatively, you may instruct the script to use only a set number of processors. For example, `-j8` instructs the script to use `8` processors, `-j4` instructs the script to use `4` processors, etc.

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

This command returns the latest state information about the KMD blockchain and your `wallet.dat` file.

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

#### Backup your wallet

We can not stress enough the importance of backing up your `wallet.dat` file.

On Linux, the file is located here:  `~/.komodo/wallet.dat`

One method to backup this file is to archive a copy of the file.

```bash
# Copy the file
cp -av ~/.komodo/wallet.dat ~/wallet.dat

# Rename file
mv ~/wallet.dat ~/2019-05-17-wallet_backup.dat

# To make archive
tar -czvf ~/2019-05-17-wallet_backup.dat.tgz ~/2019-05-17-wallet_backup.dat

# Move the final file to a secure location
```

## MacOS

### Requirements

- OSX (version > 10.11)
- Minimum 4GB of free RAM (8GB+ recommended)

##### Ensure Command Line Tools are Installed. 

Issue the following command in a terminal.

```bash
xcode-select --install
```

##### Ensure brew is Installed 

We use the software `brew` to install dependencies. If you have the latest version of `brew` installed already, you may skip this step.

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

##### Use brew to Install Dependencies

Execute each command separately

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

#### Clone the Komodo repository

```bash
git clone https://github.com/jl777/komodo
```

#### Fetch the Zcash Parameters:

```bash
cd komodo
./zcutil/fetch-params.sh
```

#### Compile Komodo

```bash
git checkout dev
./zcutil/build-mac.sh -j8
```

This can take some time.

While this process proceeds, open a new terminal for the next step.

#### Create Configuration File

Create the configuration file in the following directory:

```bash
~/Library/Application\ Support/Komodo
```

If the directory does not yet exist, create the directory.

```bash
mkdir ~/Library/Application\ Support/Komodo
```

Create the configuration file by entering the following commands in the terminal. Execute each line separately.

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

#### Run Komodo

Once all processes are complete, run the `komodod` daemon.

```bash
cd ~/komodo/src
./komodod &
```

#### Track the Syncing Progress

##### Using the tail Command

```bash
tail -f ~/Library/Application\ Support/Komodo/debug.log
```

##### Using komodo-cli and getinfo

```bash
cd ~/komodo/src
./komodo-cli getinfo
```

When the returned properties of `blocks` and `longestchain` are equal to each other, the daemon is finished syncing with the network.

#### Backup Your Wallet

We can not stress enough the importance of backing up your `wallet.dat` file.

On MacOS, the file is located here:  `~/Library/Application\ Support/Komodo/wallet.dat`

One method to backup this file is to archive a copy of the file.

```bash
# Copy the file
cp -av ~/Library/Application\ Support/Komodo/wallet.dat ~/wallet.dat

# Rename file
mv ~/wallet.dat ~/2019-05-17-wallet_backup.dat

# To make archive
tar -czvf ~/2019-05-17-wallet_backup.dat.tgz ~/2019-05-17-wallet_backup.dat

# Move the final file to a secure location
```

## Windows

The Windows software for `komodod` and `komodo-cli` files are slightly different than their MacOS and Linux counterparts in two ways.

- The Windows software cannot be directly compiled on a Windows machine. Rather, the software must be compiled on a Linux machine (Ubuntu recommended), and then transferred to the Windows machine
  - You can use a Virtual Machine-based installation of Ubuntu Linux, running on a Windows machine, as a solution
- The names of the software are `komodod.exe` and `komodo-cli.exe`

Once you have access to an Ubuntu machine and have access to a terminal [with <b>sudo</b> privileges](https://help.ubuntu.com/community/RootSudo), you are prepared to continue the installation process.

#### Install dependencies

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python python-zmq zlib1g-dev wget libcurl4-gnutls-dev bsdmainutils automake curl libsodium-dev cmake mingw-w64
```

#### Install Rust

```bash
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup target add x86_64-pc-windows-gnu
```

#### Clone the Komodo Repository

```bash
git clone https://github.com/jl777/komodo
cd komodo
git checkout dev
```

#### Fetch the Zcash Parameters

```bash
./zcutil/fetch-params.sh
```

#### Build the Komodo Daemon

In the command below, you may instruct the script to use only a set number of processors. For example, `-j8` instructs the script to use `8` processors, `-j4` instructs the script to use `4` processors, etc.

```bash
./zcutil/build-win.sh -j8
```

This script can take some time. Once completed, you will find `komodod.exe` & `komodo-cli.exe` files inside the `src` directory.

Transfer these 2 executable files to your Windows computer and place the files in a new folder on the Desktop called kmd or any other location you prefer (remember the location and use that). For this guide we are using `kmd` directory on Desktop.

Open a command prompt for the following steps.

#### Create the Komodo Directory

```bash
mkdir "%HOMEPATH%\AppData\Roaming\komodo"
```

#### Create the Configuration File

```bash
notepad “%HOMEPATH%\AppData\Roaming\Komodo\komodo.conf”
```

When the software dialogue box opens, click `Yes` to create the `komodo.conf` file.

Copy the information below and paste it into Notepad.

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

#### Create the Directory for the Zcash Parameters

```bash
mkdir “%HOMEPATH%\AppData\Roaming\ZcashParams”
```

Download following files and move them into the new directory.

- [sprout-proving.key](<[https://z.cash/downloads/sprout-proving.key](https://z.cash/downloads/sprout-proving.key)>)

- [sprout-verifying.key](<[https://z.cash/downloads/sprout-verifying.key](https://z.cash/downloads/sprout-verifying.key)>)

- [sapling-spend.params](<[https://z.cash/downloads/sapling-spend.params](https://z.cash/downloads/sapling-spend.params)>)

- [sapling-output.params](<[https://z.cash/downloads/sapling-output.params](https://z.cash/downloads/sapling-output.params)>)

- [sprout-groth16.params](<[https://z.cash/downloads/sprout-groth16.params](https://z.cash/downloads/sprout-groth16.params)>)

#### Run Smart Chain Software

```bash
"%HOMEPATH%\Desktop\kmd\komodod.exe"
```

#### Verify Syncing Progress

```bash
"%HOMEPATH%\Desktop\kmd\komodo-cli.exe" getinfo
```

#### Backup Your Wallet

We can not stress enough the importance of backing up your `wallet.dat` file.

On Windows, the file is located here:  `%HOMEPATH%\AppData\Roaming\Komodo\wallet.dat`

One method to backup this file is to create a copy and archive it.
