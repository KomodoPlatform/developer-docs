# Using `bitcore-lib-komodo`

This is an example of using the Komodo flavour of `bitcore-lib`: https://github.com/DeckerSU/bitcore-lib-komodo/

## Installing the library

The following commands install the required dependencies, `nvm`, `node v4` and the `bitcore-lib-komodo` library

```sh
# install nodejs and other dependencies
sudo apt --yes install git
sudo apt --yes install build-essential pkg-config libc6-dev libevent-dev m4 g++-multilib autoconf libtool libncurses5-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate
sudo apt --yes install libcurl4-gnutls-dev
sudo apt --yes install curl
sudo apt --yes install libsodium-dev
sudo apt --yes install libzmq3-dev

# install nvm
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
# switch node setup with nvm
nvm install v4
nvm use v4
npm install git+https://git@github.com/DeckerSU/bitcore-lib-komodo
```

## Example script to generate a Komodo address - privkey pair using `bitcore-lib-komodo`

Add the following code to a script (named address-pair.js) in a directory where the above library is installed.

```js
var bitcore = require("bitcore-lib-komodo");

var kmd = {
  name: "kmd",
  alias: "kmd",
  pubkeyhash: 60,
  privatekey: 188,
  scripthash: 85,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xf9eee48d,
  port: 7771,
  dnsSeeds: ["localhost", "mynet.localhost"]
};

bitcore.Networks.add(kmd);
var kmdNet = bitcore.Networks.get("kmd");
var privateKey = new bitcore.PrivateKey(kmdNet);
var address = privateKey.toAddress();
console.log(address);
console.log(privateKey);
console.log(privateKey.toWIF());
```

Run it using `node v4`:

```bash
$ which node
/home/$USER/.nvm/versions/node/v4.9.1/bin/node
$ node address-pair.js
```

## Output

```js
<Address: RSsVYEZw9LaZCYr4taeeicMUPZ7M3ThgBr, type: pubkeyhash, network: kmd>
<PrivateKey: bf25a2202cc0b591dd0032e515a2c7df98655fad18d19d1b291ece3e696cd8ab, network: kmd>
UvR7FKyu5SZau5226xThxyNDAfZuURzQZ33R1zJ6r5QucLKiN8Bo
```
