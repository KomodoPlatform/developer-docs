# How to Split UTXO for Notarization

Iguana in your Notary Node will be splitting automatically if you have balance in your address and privkey already imported. However, with a lot of coins running inside and notarizing, it may run out of UTXO before auto splitting. It is always good to have manual script to do it when necessary.

Currently you need to have `0.00010000` UTXOs for Bitcoin, Komodo, assetchains and `0.00100000` for GameCredits (GAME) & Einsteinium (EMC2).

We can just use the following script to do manual UTXO split. The script uses satoshi as amount. Depending your need you can use different amount.

## Step 1: Create a script named `acsplit`

```bash
nano acsplit
```

Add the following to the `acsplit` file and save it.

```bash
#!/bin/bash
curl --url "http://127.0.0.1:7776" --data "{\"coin\":\""${1}"\",\"agent\":\"iguana\",\"method\":\"splitfunds\",\"satoshis\":\"10000\",\"sendflag\":1,\"duplicates\":"${2}"}"
```

If you want to split UTXO for `GAME`, `AYA` & `EMC2`, you need to change `\\"satoshis\\":\\"10000\\",` to `\\"satoshis\\":\\"100000\\",`.

## Step 2: Give executable permission to `acsplit`

```bash
chmod +x acsplit
```

## Step 3: Split UTXO

```bash
./acsplit KMD 50
```

## Important

- Make sure you have confirmed balance in your address.

- Directly mined UTXO will NOT work, you need to shield the mined funds first or send funds from another account or address for splitting.
