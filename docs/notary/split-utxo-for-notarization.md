# How to Split UTXO for Notarization

To participate in a notarisation round, you need to ensure you have enough UTXOs of the correct size available in your wallet. The best way to do this is via a split script in crontab.
Most coins use UTXOs of `0.0001` value (10000 satoshis), but some third party projects like AYA, MIL & EMC2 require `0.001` value UTXOs (100000 satoshis).
To find out the correct size UTXO for each coin, check https://github.com/KomodoPlatform/dPoW/blob/master/iguana/dpow/dpow_rpc.c#L20


## Splitting with Iguana

### Step 1: Create a script named `acsplit`

```bash
nano acsplit
```

Add the following to the `acsplit` file and save it.

```bash
#!/bin/bash
port=7779  # Use port 7776 for main server and port 7779 for third party server
sats=10000
high_utxo_coins="AYA EMC2 MIL"
if [[ " ${high_utxo_coins[*]} " =~ " ${1} " ]]; then
    sats=100000
fi

curl --url "http://127.0.0.1:${port}" --data "{\"coin\":\""${1}"\",\"agent\":\"iguana\",\"method\":\"splitfunds\",\"satoshis\":\"${sats}\",\"sendflag\":1,\"duplicates\":"${2}"}"
```

### Step 2: Give executable permission to `acsplit`

```bash
chmod +x acsplit
```

### Step 3: Split UTXO

```bash
./acsplit AYA 50
```

### Optional: Check existing UTXO count first
If you run a split script on cron, running it too often might cause your wallet to bloat up with excessive UTXOs. To avoid this, you can check the current UTXO count for the coin, and either skip or split as required.
Here is an example:

```
chain="AYA"
source ~/dPoW/iguana/pubkey.txt
unspent=$(~/AYAv2/src/aryacoin-cli listunspent | jq '[.[] | select (.amount==0.001 and .spendable==true and (.scriptPubKey == "'21${pubkey}ac'"))] | length')
echo "${chain}: $unspent"
if [ $unspent -lt 20 ]; then
    echo "Topping up ${chain}"
    curl --url "http://127.0.0.1:7779" --data "{\"coin\":\""${chain}"\",\"agent\":\"iguana\",\"method\":\"splitfunds\",\"satoshis\":\"100000\",\"sendflag\":1,\"duplicates\":"40"}"
fi
```

:::tip Note
Make sure you have confirmed balance in your address.
Directly mined UTXO will NOT work, you need to either send yourself the mined funds first or send funds from another address before splitting.
:::

## WebWorker's split tool

Alternatively you can use this script, which buids a raw transaction to perform the split - https://github.com/webworker01/nntools/blob/master/splitfunds

