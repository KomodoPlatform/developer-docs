# Smart Chain Maintenance

## Manually Deleting Blockchain Data

Sometimes it is necessary to manually delete all blockchain data. This should automatically trigger a full re-sync of the Smart Chain.

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

