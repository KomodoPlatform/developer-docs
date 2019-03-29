# Enabling Electrum Wallet Coins

To enable SPV wallets, also known as Electrum Wallets, just edit the `./electrum` script to add the command for the prefered coin. A list of all available electrum servers for various coins is available [here.](../coin-integration/electrum-servers-list.md)

## Copy `./electrum` to `../dexscripts` directory:

```bash
cd ``/KomodoPlatform/iguana/echanges``
cp ./electrum ../dexscripts
```

## Open `./electrum` to add a coin:

```bash
cd ../dexscripts
nano electrum
```

Will show:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{"userpass":"$userpass","method":"electrum","coin":"BTC","ipaddr":"173.212.225.176","port":50001}"
```

- Add any curl command from [here](../coin-integration/electrum-servers-list.md) to the file.
- Hit `CTRL+X` then `Y` then `ENTER` to save the file and exit
- Execute: `./electrum`
- **Now electrum coins specified will be active and available for trading.**
