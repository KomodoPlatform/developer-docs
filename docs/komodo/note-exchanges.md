# A Note to Exchanges

When the Komodo daemon (`komodod`) is started with the parameter called `-exchange`, the daemon ignores the rewards that can be collected from a UTXO when it is used in a transaction. This allows exchanges to manage their account balances against their accounting software without any modification during account reconciliation.

## Example

If you normally start the daemon using the command:

```bash
./src/komodod -addnode=78.47.196.146 -daemon
```

adding the - parameter `-exchange` will make it:

```bash
./src/komodod -addnode=78.47.196.146 -exchange -daemon
```

This post on Bitcointalk gives the context related to addition of the parameter to Komodo: [https://bitcointalk.org/index.php?topic=1605144.msg17732151#msg17732151](https://bitcointalk.org/index.php?topic=1605144.msg17732151#msg17732151)

If you were already running the normal mode, to enable the parameter,

1. Backup all privkeys (launch `komodod` with `-exportdir=<path>` and run `./komodo-cli dumpwallet <filename>`)
1. Start a totally new sync including a new `wallet.dat`, launch with the same `exportdir` and the parameter
1. Stop it before it gets too far and import all the privkeys backed up during step a) using `./komodo-cli importwallet <filename>`
1. Resume sync till it gets to chaintip

For example:

```bash
./komodod -exportdir=/tmp &
./komodo-cli dumpwallet example
./komodo-cli stop
mv ~/.komodo ~/.komodo.old && mkdir ~/.komodo && cp ~/.komodo.old/komodo.conf ~/.komodo.old/peers.dat ~/.komodo
./komodod -exchange -exportdir=/tmp &
./komodo-cli importwallet /tmp/example
```
