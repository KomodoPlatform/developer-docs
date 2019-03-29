# Setup Bitcoin Cash for mmV1

## GUI App

Download and install the latest GUI wallet for your OS from your choice of website.

- [https://www.bitcoincash.org/#wallets](https://www.bitcoincash.org/#wallets)
- [https://www.bitcoinabc.org/](https://www.bitcoinabc.org/)
- [https://download.bitcoinabc.org/](https://download.bitcoinabc.org/) (find the latest version from here)
- [https://download.bitcoinabc.org/0.16.1/](https://download.bitcoinabc.org/0.16.1/) (latest)

## Fixing Bitcoin Cash and Bitcoin-Core conflicting setup

As many users will be running Bitcoin-Core and Bitcoin Cash Wallets on the same machine, installing and running Bitcoin Cash on existing Bitcoin-Core running system may or may not conflict with existing Bitcoin-Core wallet setup. Just to make sure there is no chance of such case you can rename the Bitcoin Cash directory and file names.

If you have already Bitcoin Cash wallet running on your machine, please do these changes:

### Linux

```bash
# assuming ~/.bitcoin is being used by bitcoin cash
mv ~/.bitcoin/ ~/.bch/

# assuming ~/.bitcoin/bitcoin.conf file is setup/configured and is used for bitcoin cash
mv ~/.bch/bitcoin.conf ~/.bch/bch.conf

# If you don't have ~/.bch/bch.conf file then create one as follows:
echo "server=1" >> ~/.bch/bch.conf
echo "listen=0" >> ~/.bch/bch.conf
echo "listenonion=0" >> ~/.bch/bch.conf
echo "rpcport=33333" >> ~/.bch/bch.conf
echo "port=83333" >> ~/.bch/bch.conf
echo "rpcuser=barterbch" >> ~/.bch/bch.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bch/bch.conf
chmod 0600 ~/.bch/bch.conf
```

### OSX

```bash
# assuming $HOME/Library/Application\ Support/Bitcoin is being used by bitcoin cash
mv $HOME/Library/Application\ Support/Bitcoin $HOME/Library/Application\ Support/Bch

# assuming $HOME/Library/Application\ Support/Bitcoin/bitcoin.conf file is setup/configured and is used for bitcoin cash
mv $HOME/Library/Application\ Support/Bch/bitcoin.conf $HOME/Library/Application\ Support/Bch/bch.conf

# If you don't have $HOME/Library/Application\ Support/Bch/bch.conf file then create one as follows:
echo "server=1" >> $HOME/Library/Application\ Support/Bch/bch.conf
echo "listen=0" >> $HOME/Library/Application\ Support/Bch/bch.conf
echo "listenonion=0" >> $HOME/Library/Application\ Support/Bch/bch.conf
echo "rpcport=33333" >> $HOME/Library/Application\ Support/Bch/bch.conf
echo "port=83333" >> $HOME/Library/Application\ Support/Bch/bch.conf
echo "rpcuser=barterbch" >> $HOME/Library/Application\ Support/Bch/bch.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> $HOME/Library/Application\ Support/Bch/bch.conf
chmod 0600 $HOME/Library/Application\ Support/Bch/bch.conf
```

### Windows

- Open Windows Explorer
- Type in its address bar `%AppData%`, and press Enter key to open your logged in user's Application Data folder.
- Assuming you have Bitcoin Cash installed and it was using the directory named `Bitcoin` at this location, rename it to `Bch`.
- Open `Bch` directory and rename `bitcoin.conf` file to `bch.conf` file.
- Open `bch.conf` file in a notepad or any text editor of your choice and make sure it matches the following config settings:

```bash
rpcuser=examplerpcuser
rpcpassword=examplerpcpassword
prune=4096
server=1
rpcbind=127.0.0.1
bind=127.0.0.1
rpcport=33333
port=83333

* Make any changes required to bch.conf file and save it.
```

## Running Bitcoin Cash with new setup changes

Since the default directory and config file of bitcoin cash has been renamed you have to now use a command to run Bitcoin Cash.

### Linux

```bash
# If you want to run bitcoin cash wallet with prune mode on, which saves a lot of disk space, then use this command.
# if using daemon
# assuming you have bitcoin cash daemon with name 'bitcoind'
bitcoind -datadir=$HOME/.bch -conf=$HOME/.bch/bch.conf -prune=4096 -daemon

# if using QT wallet
bitcoin-qt -datadir=$HOME/.bch -conf=$HOME/.bch/bch.conf -prune=4096 -daemon

# Or

# if using daemon
# If you want to run bitcoin cash deamon with full blockchain downloaded then use this command:
bitcoind -datadir=$HOME/.bch -conf=$HOME/.bch/bch.conf -daemon

# if using QT wallet
bitcoin-qt -datadir=$HOME/.bch -conf=$HOME/.bch/bch.conf -daemon
```

### OSX

```bash
# If you want to run bitcoin cash wallet with prune mode on, which saves a lot of disk space, then use this command.
# if using daemon
# assuming you have bitcoin cash daemon with name 'bitcoind'
bitcoind -datadir=$HOME/Library/Application\ Support/Bch -conf=$HOME/Library/Application\ Support/Bch/bch.conf -prune=4096 -daemon

# if using QT wallet
bitcoin-qt -datadir=$HOME/Library/Application\ Support/Bch -conf=$HOME/Library/Application\ Support/Bch/bch.conf -prune=4096 -daemon

# Or

# if using daemon
# If you want to run bitcoin cash deamon with full blockchain downloaded then use this command:
bitcoind -datadir=$HOME/Library/Application\ Support/Bch -conf=$HOME/Library/Application\ Support/Bch/bch.conf -daemon

# if using QT wallet
bitcoin-qt -datadir=$HOME/Library/Application\ Support/Bch -conf=$HOME/Library/Application\ Support/Bch/bch.conf -daemon
```

### Windows

- If you want to run bitcoin cash wallet with prune mode on, which saves a lot of disk space, then use this command.

### if using daemon

- assuming you have bitcoin cash daemon with name 'bitcoind'

```bash
bitcoind -datadir=%AppData%Bch -conf=%AppData%Bchbch.conf -prune=4096 -daemon
```

### if using QT wallet

```bash
 Bitcoin-QT -datadir=%AppData%Bch -conf=%AppData%Bchbch.conf -prune=4096 -daemon
```

### if using daemon

- If you want to run bitcoin cash deamon with full blockchain downloaded then use this command:

```bash
bitcoind -datadir=%AppData%Bch -conf=%AppData%Bchbch.conf -daemon
```

### if using QT wallet

```bash
Bitcoin-QT -datadir=%AppData%Bch -conf=%AppData%Bchbch.conf -daemon
```

## If you want to install and run Bitcoin Cash from source

You need Bitcoin Cash (BCH) blockchain synced and the wallet daemon running.

Compile and run BitcoinABC wallet from source:

```bash
git clone https://github.com/Bitcoin-ABC/bitcoin-abc
cd bitcoin-abc
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc
make -j4
sudo mv src/bitcoind /usr/local/bin/bchd
sudo mv src/bitcoin-cli /usr/local/bin/bch-cli
sudo mv src/bitcoin-tx /usr/local/bin/bch-tx
mkdir ~/.bch
echo "server=1" >> ~/.bch/bch.conf
echo "listen=0" >> ~/.bch/bch.conf
echo "listenonion=0" >> ~/.bch/bch.conf
echo "rpcport=33333" >> ~/.bch/bch.conf
echo "port=83333" >> ~/.bch/bch.conf
echo "rpcuser=barterbch" >> ~/.bch/bch.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bch/bch.conf
chmod 0600 ~/.bch/bch.conf
bchd -daemon -datadir=~/.bch -conf=bch.conf
```

If you already have this installed, just run `bchd -datadir=/home/<user>/.bch -conf=bch.conf -prune=4096 -daemon`

If you already have Bitcoin ABC istalled on MacOS, you can restart using this command:

```bash
/Applications/BitcoinABC-Qt.app/Contents/MacOS/BitcoinABC-Qt -conf=$HOME/Library/Application\ Support/Bch/bch.conf  -datadir=$HOME/Library/Application\ Support/Bch/
```

Basically, just run the daemon with `.bch/bch.conf` for native and then start BarterDEX and test. That means to run Bitcoin Cash with BarterDEX the BCH users **must** change their Bitcoin Cash data directory, setup `bitcoin.conf` as `bch.conf` file.

`bch.conf` file contents:

```bash
rpcuser=examplerpcuser
rpcpassword=examplerpcpassword
prune=4096
server=1
rpcbind=127.0.0.1
bind=127.0.0.1
rpcport=33333
port=83333
```

BaterDEX GUI will automatically show you BitcoinCash (BCH)

Use RPC commands like this

```bash
bch-cli -datadir=/home/<user>/.bch -conf=bch.conf getinfo
```

to query data.

Optional: This entry goes to `coins.json` file (add this if this is not there).

```bash
{\"coin\":\"BCH\",\"name\":\"bch\",\"active\":1,\"rpcport\":33333,\"pubtype\":0,\"p2shtype\":5,\"wiftype\":128,\"txfee\":1000}
```

## Tips and Tricks

With the above setup it becomes bit inconvinient to run BitcoinABC app. As it always looks for `bitcoin` data directory on it's platform and to make it run with our own custom renamed `Bch` direcotry we have to always issue a command to run with the desired path.

But these few tips and tricks may help someone.

### OSX

Follow these commands to make setup your `BitcoinABC.app` to use `Bch` data directory on startup.

```bash
cd /Applications/BitcoinABC-Qt.app/Contents/MacOS

# Rename existing BitcoinABC-Qt file to something else, like BitcoinABCQt
mv BitcoinABC-Qt BitcoinABCQt

# Now create a new shells script and paste this line into it
nano BitcoinABC-Qt

# Paste this line in this script:
/Applications/BitcoinABC-Qt.app/Contents/MacOS/BitcoinABCQt -conf=$HOME/Library/Application\ Support/Bch/bch.conf  -datadir=$HOME/Library/Application\ Support/Bch/

# Press CTRL+O to write this change to file
# Press CTRL+X to exit the text editor and get back to command prompt

# Now change this shell script's permissions to executable
chmod +x BitcoinABC-Qt
```

With the above change, the `BitcoinABC-QT.app` will always start with directory and configuration file of `Bch`.

And in case you are doing upgrade of `BitcoinABC-QT.app` or anything similar for Bitcoin Cash wallet for QT wallet, you can probably apply the same method to set them up for `Bch` directory by default.
