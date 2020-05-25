# Common Runtime Parameters

## Introduction

The following is an abbreviated list of runtime parameters and settings that can be initiated in a [Smart Chain's .conf file.](../../../basic-docs/smart-chains/smart-chain-setup/interacting-with-smart-chains.html#location-of-conf-file)

These commands largely derive from the upstream Bitcoin software, `bitcoind`.

Komodo is a fork of Zcash, and Zcash is a privacy-centric fork of Bitcoin. Therefore, essentially all runtime parameters and API commands available in both Bitcoin and Zcash are available in Komodo.

To see additional Bitcoin-based runtime parameters not included here, please visit [the relevant Bitcoin wiki page](https://en.bitcoin.it/wiki/Running_Bitcoin).

## addnode

`addnode` tells the daemon which nodes are trusted to act as seed nodes. After connecting to a node via `addnode`, the trusted node will send your node the list of all nodes that it is connected to, and your node will then connect to these additional nodes until [the max limit](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#maxconnections) is reached.

This contrasts from the [connect](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#connect) runtime parameter, as the latter does not attempt to connect your node to additional nodes.

If you are behind a firewall or are having issues connecting to the network, `addnode` is a stronger option.

On the other hand, if you want to connect only to designated and trusted nodes, `connect` is a stronger option.

If you run multiple nodes that are connected via a LAN, it is not necessary for each node to open multiple connections. Instead, use `connect` to connect all to one primary node, and then use `addnode` on the primary node to connect to the network.

The p2p port must not be blocked by a firewall. If the computers do not have public IP addresses, you will need to port-forward the p2p port on both computers and append the forwarded port to the IP.

#### :pushpin: Examples:

`./komodod -ac_name=EXAMPLECHAIN -ac_supply=1000000 -addnode=<IP of the second node>:8096`

Using addnode as a default value in the Smart Chain's `.conf` file:

```bash
addnode=69.164.218.197
```

## addressindex

`addressindex` instructs a Smart Chain to maintain an index of all addresses and balances.

We recommend that the user [manually delete the blockchain data](../../../basic-docs/smart-chains/smart-chain-setup/smart-chain-maintenance.html#manually-deleting-blockchain-data) before initiating this parameter.

`addressindex` is enabled by default on any Smart Chain that utilizes Antara.

::: tip
The <b>reindex</b> parameter is not a viable alternative method for re-syncing the Smart Chain in this circumstance.
:::

#### :pushpin: Examples:

Using `addressindex` as a runtime parameter:

```bash
komodod -addressindex=1
```

Using `addressindex` as a default value in the Smart Chain's `.conf` file:

```bash
addressindex=1
```

## bantime

`bantime` sets the default number of seconds for a ban initiated during the daemon's session. The default is 86400.

#### :pushpin: Examples:

Using bantime as a runtime parameter:

```bash
komodod -bantime=100000
```

Using bantime as a default value in the Smart Chain's `.conf` file:

```bash
bantime=100000
```

## bind

`bind` instructs the Smart Chain daemon to bind to a given address and always listen on it.

Use `[host]:port` notation for IPv6.

#### :pushpin: Examples:

Using bind as a runtime parameter:

```bash
komodod -bind=127.0.0.1:9050
```

Using bind as a default value in the Smart Chain's `.conf` file:

```bash
bind=127.0.0.1:9050
```

## connect

`connect` connects the `komodod` server to a trusted peer node, but not to request or add any additional nodes.

Please refer to the [addnode](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#addnode) parameter entry for more information.

#### :pushpin: Examples:

Using connect as a default value in the Smart Chain's `.conf` file:

```bash
connect=69.164.218.197
```

## conf

`conf` allows the user to indicate an alternative configuration file for the Smart Chain daemon. The `conf` runtime parameter requires an absolute path. For example, `/home/user/mydirectory/MYCOIN/MYCOIN.conf`. Once the `conf` parameter is activated, the default configuration file is otherwise ignored.

#### :pushpin: Examples:

Using `conf` as a runtime parameter:

```bash
komodod -conf=/home/username/coinConfs/DEX.conf
```

## datadir

`datadir` allows the user to indicate an alternative blockchain-data directory for the Smart Chain daemon. The `datadir` parameter requires an absolute path. For example, `home/user/mydirectory/MYCOIN/MYCOINDATA`. Once this parameter is activated, the daemon will ignore the default data directory.

The name of the alternative directory must match the value provided to the [ac_name](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-name) parameter.

#### :pushpin: Examples:

Using `datadir` as a runtime parameter:

```bash
komodod -datadir=/home/username/coinData/DEX
```

## donation

`donation` donates all user rewards to a specific address. This value must be set to a 33 byte pubkey.

#### :pushpin: Examples:

Using donation as a default value in the Smart Chain's `.conf` file:

```bash
donation=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

## exchange

`exchange` forfeits all user rewards to miners. Set this to explicitly not claim user rewards.

#### :pushpin: Examples:

Using exchange as a default value in the Smart Chain's `.conf` file:

```bash
exchange=1
```

## exportdir

`exportdir` tells the Smart Chain daemon where to store the wallet backup files created through the [backupwallet](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#backupwallet) and [dumpwallet](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#dumpwallet) calls.

#### :pushpin: Examples:

Using exportdir as a default value in the Smart Chain's `.conf` file:

```bash
exportdir=/home/myusername/mydirectory
```

## gen

`gen` instructs the daemon to attempt to generate new blocks, and thereby mine new coins.

See also [setgenerate](../../../basic-docs/smart-chains/smart-chain-api/generate.html#setgenerate).

::: warning
This parameter should be avoided. Instead, start the daemon without the `-gen` parameter. Once the Smart Chain is launched, wait until the blockchain is synced to the current block and then execute the [setgenerate](../../../basic-docs/smart-chains/smart-chain-api/generate.html#setgenerate) method. The sync status of the blockchain can be found by executing the [getinfo](../../../basic-docs/smart-chains/smart-chain-api/control.html#getinfo) method and comparing the `blocks` and `longestchain` properties.
:::

::: tip

- If the `genproclimit` property is not specified after the `gen` option, the daemon mines using 1 thread.
- To mine using all available threads, use: `-genproclimit=-1`
  :::

::: tip
`gen=0` in the .conf file on an Smart Chain where [<b>ac_staked</b>](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-staked) is enabled sets the daemon to stake using all available coins
:::

#### :pushpin: Examples:

Using gen as a runtime parameter to mine using 4 threads:

```bash
./komodod -gen -genproclimit=4
```

## genproclimit

`genproclimit` sets the number of threads to be used for mining. To use all the available processors, use the value `-1`.

::: tip
Setting `genproclimit=0` instructs the daemon to stake (if possible) using all available coins.
:::

#### :pushpin: Examples:

Using genproclimit as a default value in the Smart Chain's `.conf` file, to mine using 2 threads:

```bash
genproclimit=2
```

## keypool

`keypool` instructs the daemon to pre-generate a certain number of public/private key pairs. This can facilitate `wallet.dat` backups being valid for both prior transactions and several dozen future transactions.

#### :pushpin: Examples:

Using keypool as a default value in the Smart Chain's `.conf` file:

```bash
keypool=100
```

## listen

`listen` instructs the daemon to listen for RPC calls on the network. It is enabled by default, except when `connect` is used.

#### :pushpin: Examples:

Using listen as a runtime parameter:

```bash
komodod -listen=1
```

Using listen as a default value in the Smart Chain's `.conf` file:

```bash
listen=1
```

## maxconnections

`maxconnections` sets the maximum number of inbound and outbound connections.

#### :pushpin: Examples:

Using maxconnections as a runtime parameter:

```bash
komodod -maxconnections=NUMBER
```

Using maxconnections as a default value in the Smart Chain's `.conf` file:

```bash
maxconnections=NUMBER
```

## mempooltxinputlimit

::: tip
DEPRECATED
:::

`mempooltxinputlimit` is a runtime parameter inherited from Zcash. The functionality it facilitates is now enabled by default, and therefore the parameter is deprecated. Please see [the Zcash documentation for more information](https://blog.z.cash/new-release-1-1-0/).

## port

`port` tells the daemon to listen for p2p connections on the indicated TCP port, overwriting the default. The default p2pport for the Komodo(KMD) blockchain is 7770. The default p2p port of a Smart Chain is solely dependant on the `-ac_` [Antara customization parameters](../../antara/antara-setup/antara-customizations.html) and values used to launch it.

#### :pushpin: Examples:

Using port as a default value in the Smart Chain's `.conf` file:

```bash
port=8231
```

## proxy

`proxy` allows the user to connect via a `SOCKS5` proxy.

#### :pushpin: Examples:

Using proxy as a runtime parameter:

```bash
komodod -proxy=127.0.0.1:9050
```

Using proxy as a default value in the Smart Chain's `.conf` file:

```bash
proxy=127.0.0.1:9050
```

## pubkey

`pubkey` sets an address to use as a change address for all transactions. This value must be set to a 33 byte pubkey. All mined/staked coins will also be sent to this address. We recommend that the user ensure they own the corresponding `privkey` of their chosen `pubkey`, lest their funds be sent to a `pubkey` they do not own or control.

The `pubkey` parameter is required for all Antara-enabled chains. All Antara transactions will utilize the `pubkey` as an integral property.

#### :pushpin: Examples:

Using pubkey as a default value in the Smart Chain's `.conf` file:

```bash
pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

Using pubkey as a startup parameter:

```bash
-pubkey=027dc7b5cfb5efca96674b45e9fda18df069d040b9fd9ff32c35df56005e330392
```

## regtest

`regtest` instructs the Smart Chain daemon to run a regression test network. Typically, the user will create a disposable Smart Chain for these purposes. The [ac_supply](../../../basic-docs/antara/antara-setup/antara-customizations.html#ac-supply) parameter is not required in this instance.

(A regression-test network is a useful tool for rapid trial and testing. [Please reach out to us](https://komodoplatform.com/discord) if you are curious to implement this tool in your workflow and are unfamiliar with the process.)

#### :pushpin: Examples:

Using regtest as a runtime parameter:

```bash
komodod -ac_name=TEST -regtest
```

Using regtest as a default value in the Smart Chain's `.conf` file:

```bash
regtest=0
```

## reindex

`reindex` instructs the daemon to re-index the currently synced blockchain data.

::: tip
Depending on the size and state of the chain you are re-indexing, this parameter may prolong the daemon launch time.
:::

#### :pushpin: Examples:

Using reindex as a runtime parameter:

```bash
komodod -reindex
```

## rewind

`rewind` rewinds the chain to a specific block height. This is useful for creating snapshots at a given block height.

#### :pushpin: Examples:

Using rewind as a runtime parameter:

```bash
komodod -rewind=777777
```

## rpcallowip

`rpcallowip` tells the daemon which ip addresses are acceptable for receiving rpc commands.

By default, only rpc connections from localhost are allowed.

Specify as many `rpcallowip=` settings as you like to allow connections from other hosts, either as a single IPv4/IPv6 or with a subnet specification.

::: warning

Opening up the RPC port to hosts outside your local trusted network is NOT RECOMMENDED. The rpcpassword is transmitted over the network unencrypted. Also note that anyone that can authenticate on the RPC port can steal your keys and take over the server. [For more information click here](https://github.com/zcash/zcash/issues/1497).

:::

#### :pushpin: Examples:

Using rpcallowip as a default value in the Smart Chain's `.conf` file:

```bash
  rpcallowip=10.1.1.34/255.255.255.0
  rpcallowip=1.2.3.4/24
  rpcallowip=2001:db8:85a3:0:0:8a2e:370:7334/96
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

Using rpcbind as a default value in the Smart Chain's `.conf` file:

```bash
rpcbind=127.0.0.1:9704
```

## rpcclienttimeout

`rpcclienttimeout` indicates the number of seconds to wait for an rpc command to complete before killing the process.

#### :pushpin: Examples:

Using rpcclienttimeout as a runtime parameter:

```bash
komodod -rpcclienttimeout=SECONDS
```

Using rpcclienttimeout as a default value in the Smart Chain's `.conf` file:

```bash
rpcclientttimeout=SECONDS
```

## rpcconnect

`rpcconnect` allows the user to connect to `komodod` and send RPC commands from a host. By default, it is set to localhost.

::: warning
We DO NOT RECOMMEND that the average user set this value to anything other than the localhost, as it can grant access to a foreign party, who are then able to take control over komodod and all funds in your wallet.dat file.
:::

#### :pushpin: Examples:

Using rpcconnect as a default value in the Smart Chain's `.conf` file:

```bash
rpcconnect=127.0.0.1
```

## rpcport

`rpcport` tells the daemon to listen for RPC connections on the indicated TCP port overwriting the default. The default rpcport for the Komodo(KMD) blockchain is 7771. The default rpcport of a Smart Chain is solely dependant on the `-ac_` [Antara customization parameters](../../antara/antara-setup/antara-customizations.html) and values used to launch it.

#### :pushpin: Examples:

Using rpcport as a default value in the Smart Chain's `.conf` file:

```bash
rpcport=8232
```

## sendfreetransactions

`sendfreetransactions` instructs the daemon to send transactions as zero-fee transactions if possible. The default value is 0.

#### :pushpin: Examples:

Using sendfreetransactions as a default value in the Smart Chain's `.conf` file:

```bash
sendfreetransactions=0
```

## server

`server` instructs the daemon to accept json-rpc commands. It is enabled by default.

#### :pushpin: Examples:

Using server as a runtime parameter:

```bash
komodod -server=1
```

Using server as a default value in the Smart Chain's `.conf` file:

```bash
server=1
```

## spentindex

`spentindex` instructs a Smart Chain to maintain a full index of all spent transactions (txids).

We recommend that the user [manually delete the blockchain data](../../../basic-docs/smart-chains/smart-chain-setup/smart-chain-maintenance.html#manually-deleting-blockchain-data) before initiating this parameter.

`spentindex` is enabled by default on any Smart Chain that utilizes Antara.

::: tip
The <b>reindex</b> parameter is not a viable alternative method for re-syncing the blockchain in this circumstance.
:::

#### :pushpin: Examples:

Using spentindex as a runtime parameter:

```bash
komodod -spentindex=1
```

Using spentindex as a default value in the Smart Chain's `.conf` file:

```bash
spentindex=1
```

## stopat

`stopat` stops the chain at a specific block height. This is useful for creating snapshots at a given block height.

#### :pushpin: Examples:

Using stopat as a runtime parameter:

```bash
komodod -stopat=1000000
```

<!---FIXME: Needs confirmation from alright

 splitperc

The `splitperc` parameter allows the user to decide what happens to a UTXO that is successfully able to stake a block in the POS64 staking system (i.e. a Smart Chain started using the [-ac_staked](../../antara/antara-setup/antara-customizations.md#ac-staked) Antara customization parameter). This parameter's value defines the percentage of the staking UTXO value to leave in the same address. The rest of of the staking UTXO value is added to the new UTXO created to the coinbase address.

Examples:

- `-splitperc=0` merges the staking UTXO value and the coinbase value to the coinbase address
- `-splitperc=50` takes half of the staking UTXO value and sends it to the coinbase address 
- `-splitperc=100` does not change the staking UTXO 

#### :pushpin: Examples:

Using splitperc as a runtime parameter:

```bash
komodod -ac_name=HELLOWORLD -ac_supply=777777 -ac_reward=100000000 -ac_staked=20 -splitperc=50
```
--->

## testnode

The `testnode` parameter allows the daemon to mine without being connected to any other peers. This is useful for debugging and testing.

If this parameter is not set, the daemon will not attempt to mine blocks unless it has at least one other peer.

#### :pushpin: Examples:

Using testnode as a runtime parameter:

```bash
./komodod -testnode=1
```

Using testnode as a default value in the Smart Chain's `.conf` file:

```bash
testnode=1
```

## timestampindex

`timestampindex` instructs a Smart Chain to maintain a timestamp index for all block hashes.

We recommend that the user [manually delete the blockchain data](../../../basic-docs/smart-chains/smart-chain-setup/smart-chain-maintenance.html#manually-deleting-blockchain-data) before initiating this parameter.

::: tip
The <b>reindex</b> parameter is not a viable alternative method for re-syncing the Smart Chain in this circumstance.
:::

#### :pushpin: Examples:

Using timestampindex as a runtime parameter:

```bash
./komodod -timestampindex=1
```

Using timestampindex as a default value in the Smart Chain's `.conf` file:

```bash
timestampindex=1
```

## txindex

`txindex` instructs a Smart Chain to track every transaction made on the relevant blockchain.

`txindex` is enabled by default on all Smart Chains, and is utilized in delayed Proof of Work (dPoW), privacy modules, and Antara.

::: danger Warning!
Disabling `txindex` will cause the default Smart Chain daemon to malfunction.
:::

## whitebind

`whitelist` binds the daemon to a given address and whitelists peers connecting to it.

Use `[host]:port` notation for IPv6

#### :pushpin: Examples:

Using whitebind as a runtime parameter:

```bash
komodod -whitebind=127.0.0.1:9050
```

Using whitebind as a default value in the Smart Chain's `.conf` file:

```bash
whitebind=127.0.0.1:9050
```
