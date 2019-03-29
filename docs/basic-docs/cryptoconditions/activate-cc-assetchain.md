# How to Activate CryptoConditions on an Existing Komodo Assetchain

If you have an existing assetchain based on Komodo platform without CryptoConditions (CC) enabled, you can activate it at any time. Komodo daemon now supports the command-line parameter `-ac_ccactivate=height` , using which you can activate CC on a non-CC enabled chain in a future block height.

## Example

The first existing chain which doesn't have CC enabled, whose startup command looks like this

```bash
./komodod -ac_name=EXAMPLE -ac_supply=72000000 -addnode=24.54.206.138 &
```

It was a very easy way to start a chain using Komodo technology, with very few parameters. In order to activate CC in this chain, all we have to do is the following:

```bash
./komodod -ac_name=EXAMPLE -ac_supply=72000000 -ac_ccactivate=140 -addnode=24.54.206.138 &
```

`-ac_ccactivate=140` means, CryptoConditions are activated at block 140. You can set this parameter to any block height you want the CC to be activated.

As this is a hardforking change, all nodes must update. If the chain is being notarized, Notary Nodes need to update to the new parameters as well for the notarization to continue without disruption past the activation block.

Once CC is activated on a chain, do not change the startup script. If you do, that will create a new fork.

By default, `-ac_ccactivate=height` uses `-ac_cc=2` (If you [recall](../installations/asset-chain-parameters.html), `-ac_cc` is the parameter that defines the cluster of chains which can have cross chain CryptoConditions). But, you cant add -ac_cc=2 to the command line, as this will create a new fork. `-ac_ccactivate=height` will take care of those things automagically.

Also, addressindex=1 and spentindex=1 need to be in the configuration file, but the daemon will take care of setting this up when `-ac_ccactivate=height` is included as a command-line parameter.
