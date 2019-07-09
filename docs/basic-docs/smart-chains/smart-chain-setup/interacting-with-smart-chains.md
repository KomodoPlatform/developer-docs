# Interacting with Komodo Chains

## Using komodo-cli
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
Always execute the launch command EXACTLY as indicated, and as the Smart Chain's developers instruct. If you make a mistake, you must [<b>delete the Smart Chain data</b>](../../../basic-docs/smart-chains/smart-chain-setup/smart-chain-maintenance.html#manually-deleting-blockchain-data) and re-launch to regain access to the Smart Chain's network.
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
## Using curl

To access a coin daemon remotely -- for example, via a `curl` command in the shell -- the user will need to obtain the `rpcuser`, `rpcpassword`, and `rpcport` from the `.conf` file of the relevant coin daemon.

Assuming the default installation location, the `.conf` file can be found by exploring the following directories:

| Operating System | Directory |
| ---------------- | --------- |
| MacOS | `~/Library/Application Support/Komodo` |
| Windows | `C:\Users\myusername\AppData\Roaming\Komodo\` |
| GNU/Linux | `~/.komodo` |


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

