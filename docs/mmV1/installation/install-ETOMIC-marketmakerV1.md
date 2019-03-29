# Step by Step Setup Guide for ETH (ERC20) Token Swap Using barterDEX

## BarterDEX is officially deprecated as of this writing and mm2 is under testing before public release.

**This guide will set you up with ETH swaps in BarterDEX. If you are not looking for non ETH based token swap, please follow this** [installation guide.](./install-marketmakerV1.md) **The project is still in development. This guide may change accordingly in the future. Make sure you are following the latest guide before reporting anything is broken.**

## Installation steps

Please follow all the steps by their order of appearance in this guide. If you get any error for any step and skip to the next, things will not work for you. If you have any questions or need help, head over to `#etomic` channel in Komodo Platform [Discord](https://komodoplatform.com/discord) and ask there.

### Install required dependencies

Install all the following dependencies. Without installing these, your `marketmaker` binary may crash and not work.

### Linux

#### Install gcc-7.2 & g++-7.2 and symlink them as gcc & g++

The following are steps to install them in Ubuntu. If you are using Debian use

```bash
echo "deb http://ftp.us.debian.org/debian testing main contrib non-free" | sudo tee /etc/apt/sources.list.d/forgcc.list
```

to add the repository and continue from the `sudo apt-get update` command.

```bash
sudo add-apt-repository ppa:jonathonf/gcc-7.2
sudo apt-get update
sudo apt-get install gcc-7 g++-7
sudo rm /usr/bin/gcc && sudo rm /usr/bin/g++
sudo ln -s /usr/bin/gcc-7 /usr/bin/gcc
sudo ln -s /usr/bin/g++-7 /usr/bin/g++
```

### MacOS

#### To install latest cmake 3.10.2, gcc 7.3.0 and Leveldb 1.20.2

```bash
brew install cmake
brew install gcc
brew install leveldb
```

#### To upgrade to latest cmake 3.10.2, gcc 7.3.0 and Leveldb 1.20.2

```bash
brew upgrade cmake
brew upgrade gcc
brew ugprade leveldb
```

#### To check which version of cmake, gcc and leveldb

```bash
brew info cmake
brew info gcc
brew info leveldb
```

### Copy the source repo and compile

#### Clone `SuperNET` repo and compile `marketmaker` for ETH swaps

```bash
cd ~
git clone https://github.com/jl777/SuperNET
cd ~/SuperNET
git checkout dev
git submodule update --init --recursive
mkdir build
cd build
wget https://cmake.org/files/v3.12/cmake-3.12.3-Linux-x86_64.tar.gz
tar -xvf cmake-3.12.3-Linux-x86_64.tar.gz
./cmake-3.12.3-Linux-x86_64/bin/cmake ..
cmake --build . --target marketmaker-mainnet
cmake --build . --target marketmaker-testnet
cd ~/SuperNET/build/iguana/exchanges/
strip marketmaker-mainnet
strip marketmaker-testnet
```

#### Copy `marketmaker` binary to `iguana` dir

The compiled `marketmaker` binary file can be found in `~/SuperNET/build/iguana/exchanges`. Copy `marketmaker` into `~/SuperNET/iguana/` dir.

```bash
cp ~/SuperNET/build/iguana/exchanges/marketmaker-mainnet ~/SuperNET/iguana/marketmaker
```

### Install barterDEX & preparation

#### Install, copy `passphrase` file from `exchanges` dir to `dexscripts` dir

The following command will install `barterDEX` and copy all the required API scripts in `~/SuperNET/iguana/dexscripts` dir. You need to issue all the required API scripts (e.g.: `client`, `run`, `orderbook`, `buy`, `sell`, `balance`, `stop`) from `~/SuperNET/iguana/dexscripts` dir while running as normal after installation.

```bash
cd ~/SuperNET/iguana/exchanges
./install
cp passphrase ../dexscripts/passphrase
cd ~/SuperNET/iguana/dexscripts
nano passphrase
```

Enter a strong 24 words seed passphrase or WIF key or SHA256 of `userpass` or ETH private key in between `""`, save the file and close nano editor using `CTRL+X` then `Y` then `ENTER`.

#### Edit the `client` script

You need to edit the `client` or `run` script to disable `git pull` & `./m_mm` commands. Otherwise, the commands will compile the `marketmaker` for non ETH/ERC20 token swap. After the changes, the file should look like similar to the following:

```bash
#!/bin/bash
source passphrase
source coins
./stop
#git pull;
cd ..;
#./m_mm;
pkill -15 marketmaker;
./marketmaker "{\"gui\":\"nogui\",\"client\":1, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"$passphrase\", \"coins\":$coins}" &
```

#### Run marketmaker using client script for the first time to get the userpass value

```bash
./client &
./setpassphrase
```

This should display the `userpass` value and your smartaddresses in console. Make a note of the `userpass`. Stop `maketmaker` using the following command before proceeding to the next step.

```bash
pkill -15 marketmaker
```

**The above command should always be used to stop the** `marketmaker` **binary.**

#### Copy the `userpass` file from `exchanges` dir to `dexscripts` dir and enter userpass value

```bash
cd ~/SuperNET/iguana/exhanges
cp userpass ../dexscripts/userpass
cd ~/SuperNET/iguana/dexscripts
nano userpass
```

Enter the passphrase we got earlier in between "", save the file and close nano editor using `CTRL+X` then `Y` then `ENTER`. All these scripts found in `~/SuperNET/iguana/dexscripts` are expecting a userpass file, which contains the definition of the `$userpass` variable (found inside scripts) to authenticate API access. This is to prevent malicious webpages from issuing port 7783 calls to steal your money.

#### Edit `coins` file to add `DEC8` & `JST` token

Edit the `coins` file in `dexscripts` dir and add the following lines for adding `DEC8` & `JST` ERC20 test tokens. Without these, you will not be able to add these coins and use them.

```bash
{\"coin\":\"ETH\",\"name\":\"ethereum\",\"etomic\":\"0x0000000000000000000000000000000000000000\",\"rpcport\":80},      {\"coin\":\"JST\",\"name\":\"JST\",\"etomic\":\"0x996a8ae0304680f6a69b8a9d7c6e37d65ab5ab56\",\"rpcport\":80},   {\"coin\":\"DEC8\",\"name\":\"DEC8\",\"etomic\":\"0x3ab100442484dc2414aa75b2952a0a6f03f8abfd\",\"rpcport\":80},         {\"coin\":\"EOS\",\"name\":\"EOS\",\"etomic\":\"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0\",\"rpcport\":80},
```

### Run ETOMIC

You need to have ETOMIC running in native mode or electrum mode and KMD or other coins either running native or electrum (native is faster). If running native mode, make sure you have blockchain synced and seed passphrase / WIF key / private key imported into the chain.

For ETOMIC you need to have utxos. You can get free BEER from [this faucet](http://atomicexplorer.com/#/faucet) and swap it for ETOMIC in normal BarterDEX. You also need to have ETH testnet coins as long as we are testing testnet. Use main-net ETH when testing main-net. If you are unsure which net to use, ask in [Discord](https://komodoplatform.com/discord).

```bash
cd ~/SuperNET/iguana/dexscripts
./client &
./setpassphrase
```

Then, we need to enable ETH and other coins/tokens to start trading. Check the following example script:

Example `enable` script:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BEER\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETOMIC\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DEC8\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"JST\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETH\"}"
```

And, rest of things are same as normal BarterDEX. More helpful info is available in the following links:

- [MarketmakerV1 API](../api/general.md)
- [enable-native-wallet-coins](../usage/enable-native-wallet-coins.md)
- [enable-electrum-wallet-coins](../usage/enable-electrum-wallet-coins.md)
- [Electrum Servers List.](../coin-integration//electrum-servers-list.md)
- [Trade](../usage/trade.md)
