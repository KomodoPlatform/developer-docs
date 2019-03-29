# Funding the Smart Address

In order to start trading, you need to fund your smart address.

To find out the smartaddress of a coin, do the `./getcoin` api call, after editing it first:

```bash
nano getcoin
```

That will show you the following.

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"getcoin\",\"coin\":\"NAME_OF_COIN\"}"
```

Edit the coin name, save and close the file. (`CTRL-O` to save, `CTRL-X` to close)

**IMPORTANT: The smartaddress relies in the passphrase you assign. The smartaddress will not be imported to the wallet, it will stay as** `watchonly` **. If you lose the passphrase you lose all addresses of all coins assigned by it.**

Then **send transactions in duos** to your smartaddress provided by `./getcoin` (using Hush as an example):

```bash
hush-cli sendtoaddress <your smartaddress> 1
hush-cli sendtoaddress <your smartaddress> 1.2
```

## UTXO PAIRS

To make sure you have utxo pairs for both the bob and alice usage, it is best to send utxo in triplets of X, 1.2 X and 0.01 X. So if X is 10, send 10, 12, and 0.1 coins using sendtoaddress to your smartaddress. This means you will have to send 3 different transactions to the same address with 3 different quantities

If you send coins from a main address using the command line, make sure you either send from an account (sendfrom "account" "address" ) (depends on coin) to the smart address, or send the amounts from small to big: 0.01, then 1.0 and finally 1.2. Otherwise the CLI will send from the smartaddress instead of your other fund address.

## UTXOs explained by Jl777:

```bash
bob utxo are (X, X*1.125)
alice utxo are (X, X/777)
with the volume constraints, the bigger the utxo you have the larger offers you can handle
one pair uses 2 actual utxo
3 - 2 = 1
so maybe it is better to do 1, 1.2, .01, .01
then alice side pairs (1, .01) and (1.2, .01)
but all the pairing is automatic and you can see what specific utxos got paired with inventory command
```

**Example:**
If you want to fund a komodo smartaddress with 230 komodo, you would need to first send a tx with 100kmd, then another tx with 120 kmd and a third tx with 10kmd.
