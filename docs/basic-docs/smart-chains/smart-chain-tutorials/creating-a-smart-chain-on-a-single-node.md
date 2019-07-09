# Creating a Smart Chain on a Single Node

## Introduction

Under most circumstances, a developer should [use two separate nodes to set up and create a Smart Chain.](../../../basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.html)

However, occasionally a developer may need to create a Smart Chain on a single node.

In this situation, the developer may create a Smart Chain by running two daemons with slightly different configurations on the same node.

#### Tutorial Prerequisites

- Komodo Smart Chain software installed on a compatible machine
  - [Install instructions here](../../../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html)

## Launch the First daemon

Select the desired Antara customization parameters.

[Link to Antara Customization Parameters](../../../basic-docs/antara/antara-setup/antara-customizations.html)

For this example, we use simple configurations.

##### Command

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777
```

##### Response (truncated)

Search for the part of the response that begins with this string: `>>>>>>>>>`

```bash
>>>>>>>>>> HELLOWORLD: p2p.14165 rpc.14166 magic.01362c2a 20327466 777777 coins
```

The default `p2p` and `rpc` ports of our chain are `14165` and `14166` respectively.

#### Test komodo-cli

To interact with this first daemon, use a `komodo-cli` command as follows.

```bash
./komodo-cli -ac_name=HELLOWORLD getinfo
```

## Create a Data Directory for the Second Daemon

Create a directory on your machine for the second daemon.

In this guide, we use a directory named `coinData` in the Home directory:

```bash
mkdir ~/coinData
```

Create the data directory for the second daemon.

```bash
mkdir ~/coinData/HELLOWORLD
```

Copy the `.conf` file created for the first daemon to this new data directory.

```bash
cp ~/.komodo/HELLOWORLD/HELLOWORLD.conf ~/coinData/HELLOWORLD/
```

Change the values of `rpcuser`, `rpcpassword`, and `rpcport` in the file `~/coinData/HELLOWORLD/HELLOWORLD.conf`.

##### The HELLOWORLD.CONF File

```
rpcuser=changethis
rpcpassword=changethis
... (ommitted) ...
rpcport=12345
```

(Change all values shown above on the right side of the `=` side.)

Add a new line `port=<choose a port number betwen 1 and 65000>` to the file.

```
... (file continued) ...
port=22020
```

In all values above, the chosen values must be different from the values in the first daemon's .conf file. 

## Launch the Second daemon

When launching the second daemon, use the same Antara customization parameters as the first daemon.

However, now we specify the data directory for the daemon, as well as the `p2p` connection.

To accomplish this, we use the <b>datadir</b> and <b>addnode</b> common launch parameters.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -datadir=/home/<USERNAME>/coinData/HELLOWORLD -addnode=localhost
```

::: tip

Replace `<USERNAME>` with the USERNAME for your local node. You can find this value use the `echo $USER` command in the terminal.

:::

To interact with the second daemon, add the <b>datadir</b> parameter to the `komodo-cli` command:

```bash
./komodo-cli -ac_name=HELLOWORLD -datadir=/home/<USERNAME>/coinData/HELLOWORLD getinfo
```

After launching the second daemon, calling `getinfo` to either of the daemons should report `"connections":1`.

## Using curl

To issue a `getinfo` call using curl, observe the following example.

Replace `<rpcuser>`, `<rpcpassword>`, `<rpcport>` with the values from the `.conf` file in the data directory corresponding to the daemon that needs to be queried.

```bash
curl -s --user <rpcuser>:<rpcpassword> --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:<rpcport>/
```

Alternatively, source the `.conf` file before using the curl command. Each time you desire to switch daemons, source the `.conf` file of your target daemon.

##### Source the First Daemon's .conf File

```bash
# Source the .conf file

source ~/.komodo/HELLOWORLD/HELLOWORLD.conf

# Execute the curl command

curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

##### Source the Second Daemon's .conf File

```bash
# Source the .conf file

source ~/coinData/HELLOWORLD/HELLOWORLD.conf

# Execute the curl command

curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```
