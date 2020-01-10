# Debug Komodo

To run Komodo in debug mode, and help developers troubleshoot issues, please follow these steps:

::: tip Note
These steps are including notary node references in komodod command, but in case you are not a notary node, you don't need to include those command parameters.
:::

## Prerequisite is to install gdb

```bash
sudo apt-get install gdb
```

## Run Komodo daemon with `gdb` tool

Just add the command `gdb -args` before the launch parameters for the daemon.

If you normally start the daemon using the command `./src/komodod -gen -genproclimit=2 -notary -pubkey="03af2412ebf9517a43d192193490476fd0a44312c70755e07eb03b6d71338ebc9d"`, then to get a backtrace from it, execute:

```bash
gdb -args  ./src/komodod -gen -genproclimit=2 -notary -pubkey="03af2412ebf9517a43d192193490476fd0a44312c70755e07eb03b6d71338ebc9d"
```

_If you have trouble getting it started, try using the full path to the executable._

The above command initializes debugging.

Once you see the `gdb>` command prompt, type `run` to start komodo in debug mode.

## Getting backtrace data

When the daemon crashes, either by itself or after you issue a RPC command, you'll see a `gdb>` prompt again along with some output from the `komodod` daemon itself.

Type `backtrace` and and it will output debug information that must be shared with a developer.
