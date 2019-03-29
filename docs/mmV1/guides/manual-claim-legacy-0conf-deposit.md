# Manually Claim 0conf Deposits Using Linux

If you are having trouble with claiming your `0conf` deposit using the GUI, fear not. The deposits are safe as long as you have your `passphrase` and `txid`. Follow this guide accordingly and you will be able to claim your deposit. This guide will be helpful for both GUI and CLI users for claiming.

Note: Linux is needed to follow this guide and claim deposits using terminal window a.k.a. CLI.

Requirements:

1. Komodo (KMD) running in native mode, blockchain fully synced and passphrase imported; [instructions.](../../komodo/installation.html)

1. Deposit txid/deposit files

1. Latest mmV1 - [Instructions](../installation/install-marketmakerV1.md)

## Prepare the 0conf deposit files

### For users with deposit files

If you have the deposit files, you can just use them to claim and don't have to worry about re-creating them from. Just copy them to `~/SuperNET/iguana/DB/` dir inside the CLI installation.

#### CLI

CLI users already should have these files created inside that dir. Just check that you have all the files inside the dir `~/SuperNET/iguana/DB/`.

#### GUI

If using GUI, 0conf deposit files can be found inside the BarterDEX data dir called DB which is inside . So, the directory structure is `.BarterDEX/DB` in user home directory. This directory is hidden in all OS. In Linux the data dir is `.BarterDEX` in user home. In Windows it is `%appdata%/BarterDEX`.

Inside the DB dir you will find various files which are your 0conf deposit files. Example:

```
-rw-rw-r-- 1 devx devx  64 Dec 12 13:32 deposits.RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ
-rw-rw-r-- 1 devx devx   0 Dec 10 12:56 deposits.RPZVpjptzfZnFZZoLnuSbfLexjtkhe6uvn
-rw-rw-r-- 1 devx devx  69 Dec 10 11:04 instantdex.json
-rw-rw-r-- 1 devx devx 137 Jan  9 11:59 instantdex_RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ_append.json
-rw-rw-r-- 1 devx devx  69 Jan  9 11:59 instantdex_RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ.json
-rw-rw-r-- 1 devx devx   3 Jan  9 11:58 instantdex_RPZVpjptzfZnFZZoLnuSbfLexjtkhe6uvn_append.json
-rw-rw-r-- 1 devx devx   3 Jan  9 11:58 instantdex_RPZVpjptzfZnFZZoLnuSbfLexjtkhe6uvn.json
```

Copy these files inside `~/SuperNET/iguana/DB/` dir to be used by the CLI.

### Users with txid only

This can be used by all users. You need to put the `txid` of the 0conf deposit in an `instantdex.json` file inside `~/SuperNET/iguana/DB/` dir. The content inside `instantdex.json` should look like following:

```bash
["d5705d948a5a4e0171acec3eb718ca1421ef998b37d0af5c37ac3b440898aef5"].
```

You can use multiple txid usig a `,` inbetween the txids. Once you start native KMD and run BarterDEX the deposit files will be created automatically.

## Process of claiming

By now you should have all the deposit files ready inside `~/SuperNET/iguana/DB/` if you been following this guide without any errors. Now, is the time to claim them.

1. Start KMD in native mode using Agama or `komodod`, let the blockchain load.

1. Start BarterDEX by issuing `./client` script in one terminal and let it running. Output from this terminal is very important for troubleshooting purposes.

1. Open another terminal and use `./buy` or any other script as the first API call which will not do anything except showing you coin wallet smartaddress and info.

1. KMD will be activated automatically if you are running native mode.

1. Verify you have the deposits working by issuing `./balance` script for KMD smarataddress. It will show you `zcredits` and the amount in the output.

1. Use `./claim` script. This will claim your 0conf deposit. You may have to wait some time to get back your deposit as this may not be instant.

Useful Link: [Processing InstantDEX swap on barterDEX](./0conf-deposit-claim.html)
