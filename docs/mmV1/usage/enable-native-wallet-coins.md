# Enabling Native Wallet Coins

There are two ways of enabling coins. One method is to edit the `./enable` file, the other is to edit the `./coins` file. The `./enable` file is simple to edit but it will need to be executed manually every time the `./client` is executed. On the other hand, the `./coins` file is a little more complicated to edit, but a coin that has been activated in the coins file will automatically be activated after `./client` is executed.

## Editing the `./enable` file

```bash
cd ~/SuperNET/iguana/dexscripts
nano ./enable
```

Will show:

```bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"NAME_OF_COIN\"}"
```

To list a coin on the enable file you need to change NAME_OF_COIN for the coin you want enabled. Copy and paste the line with a new coin for whatever other coins you want enabled. NOTE: KMD is enabled by default and doesn't need to be listed in the enable file.

After changes in the enable file, run:

```bash
./enable
```

## Editing the `./coins` file

Assuming you are in `~/SuperNET/iguana/dexscripts`

```bash
nano ./coins
```

Will show:

```bash
export coins="[{\"coin\":\"REVS\",\"active\":1, \"asset\":\"REVS\",\"rpcport\":10196}, {\"coin\":\"JUMBLR\",\"active\":1, \"asset\":\"JUMBLR\",\"rpcport\":15106}, etc, etc, etc}]"
```

Add ,\`\`"active":1\`\`, to any coin you want to be active by default at startup like this:

```bash
{\"coin\":\"NAME_OF_COIN\",\"active\":1, \"asset\":\"NAME_OF_COIN\",\"rpcport\":10196}
```

If a coin is PoS, add the following parameter:

```bash
\"isPos\":1,
```

You will need to restart the `./client` for the coin to get active. This change won't take effect automatically. But once a coin is active, it will activate automatically when you restart `./client` without the need to run `./enable` first.

**To stop the** `./client` **process, use** `./stop`
