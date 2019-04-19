# Create and test an Asset Chain using a Single Node

Normally at least two different nodes are required to setup and [create an Asset Chain](../basic-docs/installations/creating-asset-chains.html).

If you are in a situation where you have control over a single computer or have access to two machines but they aren't able to connect to each other, you can create an assetchain using a by running two daemons with slightly different configurations on the same computer.

Get `komodod` and `komodo-cli` by following the instructions here: [Installing Basic Komodo Software](../basic-docs/installations/basic-instructions.html#installing-basic-komodo-software)

## Launch the First daemon

Select the assetchain parameters applicable and launch the daemon from the list here: [Custom Asset Chain Parameters](/basic-docs/installations/asset-chain-parameters.html)

Here we are running a very simple configuration:

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777
```

In the output, take note of the string that starts with `>>>>>>>>>>`

```bash
>>>>>>>>>> HELLOWORLD: p2p.14165 rpc.14166 magic.01362c2a 20327466 777777 coins
```

The default p2p and rpc ports of a chain with the above selected parameters are `14165` and `14166` respectively.

To interact with the first daemon, use the `komodo-cli` command:

```bash
./komodo-cli -ac_name=HELLOWORLD getinfo
```

## Create the data directory for the second daemon

Create a directory in any location of your machine. In this guide we will use a directory named coinData in the user's Home directory

```bash
mkdir ~/coinData
```

Then create the data directory for the second daemon

```bash
mkdir ~/coinData/HELLOWORLD
```

Copy the `.conf` file created for the first daemon to this new data directory

```bash
cp ~/.komodo/HELLOWORLD/HELLOWORLD.conf ~/coinData/HELLOWORLD/
```

Change the values of `rpcuser`, `rpcpassword`, `rpcport` and in the file `~/coinData/HELLOWORLD/HELLOWORLD.conf`

Add a new line `port=<desired_p2p_port>` to the above file. The `port` and `rpcport` must be distinct from the ports found in the previous step where we ran the first daemon.

## Launch the Second daemon

When launching the second daemon,we use the same parameters as the first deamon, but specify the data directory it must use and the p2p connection to the first node using `-datadir` and `-addnode` respectively.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -datadir=/home/<USERNAME>/coinData/HELLOWORLD -addnode=localhost
```

Replace `<USERNAME>` with the USERNAME of the account logged in. Can be found using `echo $USER`

To interact with the second daemon, add the `-datadir` parameter to the `komodo-cli` command:

```bash
./komodo-cli -ac_name=HELLOWORLD -datadir=/home/<USERNAME>/coinData/HELLOWORLD -addnode=localhost getinfo
```

After launching the second daemon, `getinfo` to both the daemons should repont `"connections":1`

## Using curl to interact with the daemons

To issue a `getinfo` call, execute:

```bash
curl -s --user <rpcuser>:<rpcpassword> --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:<rpcport>/
```

Replace `<rpcuser>`,`<rpcpassword>`,`<rpcport>` with the values from the `.conf` file in the data directory corresponding to the daemon that needs to be queried.
