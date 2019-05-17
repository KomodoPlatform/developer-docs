# Smart Chain Maintenance

## Accessing the Coin Daemon Remotely

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

## Manually Deleting Blockchain Data

Sometimes it is necessary to manually delete all blockchain data. This should automatically trigger a full resync of the blockchain.

Users should exercise caution not to delete the `wallet.dat` file during this procedure. We recommend that the user make frequent backups of the `wallet.dat` file, especially before deleting files from the data directory.

To erase all synced blockchain data, the following files should be deleted from the `.komodo` folder:

#### Files to Delete

- `blocks`
- `chainstate`
- `notarisations`
- `komodostate` 
- `komodostate.ind`
- `peers.dat`

#### Default Location for Files

| Operating System | Directory |
| ---------------- | --------- |
| MacOS | `~/Library/Application Support/Komodo` |
| Windows | `C:\Users\myusername\AppData\Roaming\Komodo\` |
| GNU/Linux | `~/.komodo` |

