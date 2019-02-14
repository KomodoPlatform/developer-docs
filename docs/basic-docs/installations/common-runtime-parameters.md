# Launch Settings & Maintenance

The following parameters and walkthroughs primarily concern the `komodod` software.

## Accessing the Coin Daemon Remotely

To access a coin daemon remotely -- for example, via a `curl` command in the shell -- the user will need to obtain the `rpcuser`, `rpcpassword`, and `rpcport` from the `.conf` file of the relevant coin daemon.

Assuming the default installation location, the `.conf` file can be found by exploring the following directories:

- **MacOS:** `~/Library/Application Support/Komodo`
- **Windows:** `C:\Users\myusername\AppData\Roaming\Komodo\`
- **GNU/Linux:** `~/.komodo`

Within this directory there are also subdirectories containing all KMD-compatible `.conf` files used on this node.

Contents of a KMD `.conf` file:

```bash
rpcuser=myusername
rpcpassword=myrpcpassword
server=1
rpcport=7771
addnode=78.47.196.146
addnode=5.9.102.210
addnode=178.63.69.164
addnode=88.198.65.74
addnode=5.9.122.241
addnode=144.76.94.3
```

## Manually Deleting Blockchain Data

Sometimes it is necessary to manually delete all blockchain data. This should automatically trigger a full resync of the blockchain.

Users should exercise caution not to delete the `wallet.dat` file during this procedure. We recommend that the user make frequent backups of the `wallet.dat` file, especially before deleting files from the data directory.

To erase all synced blockchain data, the following files should be deleted from the `.komodo` folder:

**blocks** , **chainstate** , **notarisations** , **komodostate** , **komodostate.ind** , **peers.dat**

These files can typically be found in the default file locations:

- **MacOS:** `~/Library/Application Support/Komodo`
- **Windows:** `C:\Users\myusername\AppData\Roaming\Komodo\`
- **GNU/Linux:** `~/.komodo`

## Intro to Parameters and Settings

The following is an abbreviated list of runtime parameters and settings that can be initiated in a [coin daemon's .conf file](../installations/common-runtime-parameters.html#accessing-the-coin-daemon-remotely).

These commands largely derive from the upstream Bitcoin software, `bitcoind`. (Komodo is a fork of Zcash, and Zcash is a privacy-centric fork of Bitcoin. Therefore essentially all commands available in both Bitcoin and Zcash are available in Komodo.)

To see additional runtime parameters not included here, please visit [the relevant Bitcoin wiki page](https://en.bitcoin.it/wiki/Running_Bitcoin).

## addressindex

`addressindex` instructs a KMD-based coin daemon to maintain an index of all addresses and balances.

We recommend that the user [manually delete the blockchain data](../installations/common-runtime-parameters.html#manually-deleting-blockchain-data) before initiating this parameter.

`addressindex` is enabled by default on any asset chain that utilizes the Crypto Conditions (CC) smart-contract protocol.

::: tip
The <b>reindex</b> parameter is not a viable alternative method for re-syncing the blockchain in this circumstance.
:::

#### :pushpin: Examples:

Using `addressindex` as a runtime parameter:

```bash
komodod -addressindex=1
```

Using `addressindex` as a default value in the coin's .conf file:

```
addressindex=1
```

## txindex

`txindex` instructs a KMD-based coin daemon to track every transaction made on the relevant blockchain.

`txindex` is enabled by default on all KMD-based coin daemons, and is utilized in delayed Proof of Work (dPoW), JUMBLR, and the Crypto Conditions (CC) smart-contract protocol.

::: danger Warning!
Disabling `txindex` will cause the default KMD-based daemon to malfunction.
:::

## reindex

`reindex` instructs the daemon to re-index the currently synced blockchain data.

::: tip
Depending on the size and state of the chain you are re-indexing, this parameter may prolong the daemon launch time.
:::

#### :pushpin: Examples:

Using reindex as a runtime parameter:

```
komodod -reindex
```

## timestampindex

`timestampindex` instructs a KMD-based coin daemon to maintain a timestamp index for all blockhashes.

We recommend that the user [manually delete the blockchain data](../installations/common-runtime-parameters.html#manually-deleting-blockchain-data) before initiating this parameter.

::: tip
The <b>reindex</b> parameter is not a viable alternative method for re-syncing the blockchain in this circumstance.
:::

#### :pushpin: Examples:

Using timestampindex as a runtime parameter:

```
./komodod -timestampindex=1
```

Using timestampindex as a default value in the coin's .conf file:

```
timestampindex=1
```

## spentindex

`spentindex` instructs a KMD-based coin daemon to maintain a full index of all spent transactions (txids).

We recommend that the user [manually delete the blockchain data](../installations/common-runtime-parameters.html#manually-deleting-blockchain-data) before initiating this parameter.

`spentindex` is enabled by default on any asset chain that utilizes the Crypto Conditions (CC) smart contract protocol.

::: tip
The <b>reindex</b> parameter is not a viable alternative method for re-syncing the blockchain in this circumstance.
:::

#### :pushpin: Examples:

Using spentindex as a runtime parameter:

```
komodod -spentindex=1
```

Using spentindex as a default value in the coin's `.conf` file:

```
spentindex=1
```

## regtest

`regtest` instructs the coin daemon to run a regression test network. Typically, the user will create a disposable asset chain for these purposes. The asset-chain coin supply parameter is not required in this instance.

(A regression-test network is a useful tool for rapid trial and testing. Please reach out to [us](https://komodoplatform.com/discord) if you are curious to implement this tool in your workflow and are unfamiliar with how it is done.)

#### :pushpin: Examples:

Using regtest as a runtime parameter:

```bash
komodod -ac_name=TEST -regtest
```

Using regtest as a default value in the coin's .conf file:

```
regtest=0
```

## bantime

`bantime` sets the default number of seconds for a ban initiated during the daemon's session. The default is 86400.

#### :pushpin: Examples:

Using bantime as a runtime parameter:

```
komodod -bantime=100000
```

Using bantime as a default value in the coin's .conf file:

```
bantime=100000
```

## mempooltxinputlimit

::: tip
DEPRECATED
:::

`mempooltxinputlimit` is a runtime parameter inherited from Zcash. The functionality it facilitates is now enabled by default, and therefore the parameter is deprecated. Please see [the Zcash documentation for more information](https://blog.z.cash/new-release-1-1-0/).

## proxy

`proxy` allows the user to connect via a `SOCKS5` proxy.

#### :pushpin: Examples:

Using proxy as a runtime parameter:

```bash
komodod -proxy=127.0.0.1:9050
```

Using proxy as a default value in the coin's `.conf` file:

```
proxy=127.0.0.1:9050
```

## bind

`bind` instructs the coin daemon to bind to a given address and always listen on it.

Use `[host]:port` notation for IPv6.

#### :pushpin: Examples:

Using bind as a runtime parameter:

```bash
komodod -bind=127.0.0.1:9050
```

Using bind as a default value in the coin's `.conf` file:

```
bind=127.0.0.1:9050
```

## whitebind

`whitelist` binds the daemon to a given address and whitelists peers connecting to it.

Use `[host]:port` notation for IPv6

#### :pushpin: Examples:

Using whitebind as a runtime parameter:

```bash
komodod -whitebind=127.0.0.1:9050
```

Using whitebind as a default value in the coin's `.conf` file:

```
whitebind=127.0.0.1:9050
```

## addnode

`addnode` tells the daemon which nodes are trusted to act as seed nodes. After connecting to a node via `addnode`, the trusted node will send your node the list of all nodes that it is connected to, and your node will then connect to these additional nodes until [the max limit](../installations/common-runtime-parameters.html#maxconnections) is reached.

This contrasts from the [`connect`](../installations/common-runtime-parameters.html#connect) runtime parameter, as the latter does not attempt to connect your node to additional nodes.

If you are behind a firewall or are having issues connecting to the network, `addnode` is a stronger option.

On the other hand, if you want to connect only to designated and trusted nodes, `connect` is a stronger option.

If you run multiple nodes that are connected via a LAN, it is not necessary for each node to open multiple connections. Instead, use `connect` to connect all to one primary node, and then use `addnode` on the primary node to connect to the network.

The p2p port must not be blocked by a firewall. If the computers do not have public IP addresses, you will need to port-forward the p2p port on both computers and append the forwarded port to the IP.

#### :pushpin: Examples:

`./komodod -ac_name=EXAMPLECHAIN -ac_supply=1000000 -addnode=<IP of the second node>:8096`

Using addnode as a default value in the coin's `.conf` file:

```
addnode=69.164.218.197
```

## connect

`connect` connects the `komodod` server to a trusted peer node, but not to request or add any additional nodes.

Please refer to the [`addnode`](../installations/common-runtime-parameters.html#addnode) parameter entry for more information.

#### :pushpin: Examples:

Using connect as a default value in the coin's .conf file:

```
connect=69.164.218.197
```

## gen

`gen` instructs the daemon to attempt to generate new blocks, and thereby mine new coins.

See also [`setgenerate`](../komodo-api/generate.html#setgenerate).

::: warning
This parameter should be avoided. Instead, start the daemon without the `-gen` parameter. Once the asset chain is launched, wait until the blockchain is synced to the current block and then execute the [`setgenerate`](../komodo-api/generate.html#setgenerate) method. The sync status of the blockchain can be found by executing the [`getinfo`](../komodo-api/control.html#getinfo) method and comparing the `blocks` and `longestchain` properties.
:::

::: tip
* If the `genproclimit` property is not specified after the `gen` option, the daemon mines using 1 thread. 
* To mine using all available threads, use: `-genproclimit=-1`
:::

::: tip
`gen=0` in the .conf file on an asset chain where `ac_staked` is enabled sets the daemon to stake using all available coins
:::

#### :pushpin: Examples:

Using gen as a runtime parameter to mine using 4 threads:

```bash
./komodod -gen -genproclimit=4
```

## listen

`listen` instructs the daemon to listen for RPC calls on the network. It is enabled by default, except when `connect` is used.

#### :pushpin: Examples:

Using listen as a runtime parameter:

```bash
komodod -listen=1
```

Using listen as a default value in the coin's `.conf` file:

```
listen=1
```

## maxconnections

`maxconnections` sets the maximum number of inbound and outbound connections.

#### :pushpin: Examples:

Using maxconnections as a runtime parameter:

```bash
komodod -maxconnections=NUMBER
```

Using maxconnections as a default value in the coin's .conf file:

```
maxconnections=NUMBER
```

## server

`server` instructs the daemon to accept json-rpc commands. It is enabled by default.

#### :pushpin: Examples:

Using server as a runtime parameter:

```bash
komodod -server=1
```

Using server as a default value in the coin's .conf file:

```
server=1
```

## rpcbind

`rpcbind` instructs the daemon to listen for json-rpc connections.

Use `[host]:port` notation for IPv6.

This option can be specified multiple times.

The default setting is to bind to all interfaces.

#### :pushpin: Examples:

Using rpcbind as a runtime parameter:

```bash
komodod -rpcbind=127.0.0.1:9704
```

Using rpcbind as a default value in the coin's .conf file:

```
rpcbind=127.0.0.1:9704
```

## rpcclienttimeout

`rpcclienttimeout` indicates the number of seconds to wait for an rpc command to complete before killing the process.

#### :pushpin: Examples:

Using rpcclienttimeout as a runtime parameter:

```bash
komodod -rpcclienttimeout=SECONDS
```

Using rpcclienttimeout as a default value in the coin's .conf file:

```
rpcclientttimeout=SECONDS
```

## rpcallowip

`rpcallowip` tells the daemon which ip addresses are acceptable for receiving RPC commands.

By default, only RPC connections from localhost are allowed.

Specify as many `rpcallowip=` settings as you like to allow connections from other hosts, either as a single IPv4/IPv6 or with a subnet specification.

::: warning
Opening up the RPC port to hosts outside your local trusted network is NOT RECOMMENDED. The rpcpassword is transmitted over the network unencrypted. Also note that anyone that can authenticate on the RPC port can steal your keys and take over the server. [For more information click here](https://github.com/zcash/zcash/issues/1497).
:::

#### :pushpin: Examples:

Using rpcallowip as a default value in the coin's .conf file:

```
  rpcallowip=10.1.1.34/255.255.255.0
  rpcallowip=1.2.3.4/24
  rpcallowip=2001:db8:85a3:0:0:8a2e:370:7334/96
```

## rpcport

`rpcport` tells the daemon to listen for RPC connections on the indicated TCP port.

#### :pushpin: Examples:

Using rpcport as a default value in the coin's `.conf` file:

```
rpcport=8232
```

## rpcconnect

`rpcconnect` allows the user to connect to `komodod` and send RPC commands from a host. By default, it is set to localhost.

::: warning
We DO NOT RECOMMEND that the average user set this value to anything other than the localhost, as it can grant access to a foreign party, who are then able to take control over komodod and all funds in your wallet.dat file.
:::

#### :pushpin: Examples:

Using rpcconnect as a default value in the coin's `.conf` file:

```
rpcconnect=127.0.0.1
```

## sendfreetransactions

`sendfreetransactions` instructs the daemon to send transactions as zero-fee transactions if possible. The default value is 0.

#### :pushpin: Examples:

Using sendfreetransactions as a default value in the coin's .conf file:

```
sendfreetransactions=0
```

## genproclimit

`genproclimit` sets the number of threads to be used for mining. To use all the available processors, use the value `-1`.

::: tip
Setting `genproclimit=0` instructs the daemon to stake (if possible) using all available coins.
:::

#### :pushpin: Examples:

Using genproclimit as a default value in the coin's .conf file, to mine using 2 threads:

```
genproclimit=2
```

## keypool

`keypool` instructs the daemon to pre-generate a certain number of public/private key pairs. This can facilitate `wallet.dat` backups being valid for both prior transactions and several dozen future transactions.

#### :pushpin: Examples:

Using keypool as a default value in the coin's .conf file:

```
keypool=100
```

## rewind

`rewind` rewinds the chain to specific block height. This is useful for creating snapshots at a given block height.

#### :pushpin: Examples:

Using rewind as a runtime parameter:

```bash
komodod -rewind=777777
```

## stopat

`stopat` stops the chain at a specific block height. This is useful for creating snapshots at a given block height.

#### :pushpin: Examples:

Using stopat as a runtime parameter:

```
komodod -stopat=1000000
```

## pubkey

`pubkey` sets an address to use as a change address for all transactions. This value must be set to a 33 byte pubkey. All mined coins will also be sent to this address. We recommend that the user ensure they own the corresponding `privkey` of their chosen `pubkey`, lest their funds be sent to a `pubkey` they do not own or control.

The `pubkey` parameter is required for all Crypto Conditions (CC) smart-contract enabled chains. All smart-contract transactions will utilize the `pubkey` as an integral property.

#### :pushpin: Examples:

Using pubkey as a default value in the coin's `.conf` file:

```
pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

Using pubkey as a startup parameter:

```
-pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

## exchange

`exchange` forfeits all user rewards to miners. Set this to explicitly not claim user rewards.

#### :pushpin: Examples:

Using exchange as a default value in the coin's .conf file:

```
exchange=1
```

## donation

`donation` donates all user rewards to a specific address. This value must be set to a 33 byte pubkey.

#### :pushpin: Examples:

Using donation as a default value in the coin's .conf file:

```
donation=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

## exportdir

`exportdir` tells the coin daemon where to store the wallet backup files created through the [backupwallet](../komodo-api/wallet.html#backupwallet) and [dumpwallet](../komodo-api/wallet.html#dumpwallet) calls.

#### :pushpin: Examples:

Using exportdir as a default value in the coin's `.conf` file:

```
exportdir=/home/myusername/mydirectory
```
