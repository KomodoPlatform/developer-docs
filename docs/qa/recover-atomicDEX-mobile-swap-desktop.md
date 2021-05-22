# How to recover a swap that failed in AtomicDEX mobile using Desktop

If for any reason, you don't want to/can't recover a stuck/timed out/failed swap in AtomicDEX mobile and wants to use the CLI on a desktop, follow this guide.

- First, export the log file from your AtomicDEX mobile (Settings -> "Share log File") and transfer it to your Desktop.
- Follow the instructions in [this linked guide](./extract-swap-data-atomicDEX-log.html) to extract the swap data from the log file into a format usable by `mm2`
- It should create two directories named "MAKER" and "TAKER" and files named `<uuid>.json` in the appropriate directory. `uuid` is the swap id from the AtomicDEX mobile app
- Find the file named after your stuck swap's id and save it in a accessible location. Also note if it was in the directory named "MAKER" or "TAKER" 
- Follow the instructions in [this linked guide](./atomicDEX-quickstart.html) to download, configure and setup AtomicDEX on your desktop. When creating the file `MM2.json` as described in the guide, use the seed words from AtomicDEX mobile as the value for the key `"passphrase"`
- Once `mm2` is up and running, open a new terminal window and export the `rpc_password` as value to the environment variable named `userpass`.

```bash
export userpass="<value of rpc_password from MM2.json here>"
```

- Stop `mm2` by issuing the `stop` command in the same terminal

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"stop\",\"userpass\":\"$userpass\"}"
```

- Navigate to the directory where `mm2` is located . You should find a directory named `DB`. Inside it, there should be a directory with a long hex (similar to `514fa660fa9976c87bb08e5636653ac75be9f606`) as its name. Navigate into it, then into "SWAPS", then "MY". 
  - the directory structure should look similar to `DB/514fa660fa9976c87bb08e5636653ac75be9f606/SWAPS/MY`
- now, place the swap file in the above mentioned directory 
- Now start `mm2` again using the command

```bash
stdbuf -oL nohup ./mm2
```

- Enable the coins involved in the swap using the [electrum](https://developers.atomicdex.io/basic-docs/atomicdex/atomicdex-api.html#electrum) command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"RICK\",\"servers\":[{\"url\":\"electrum1.cipig.net:10017\"},{\"url\":\"electrum2.cipig.net:10017\"},{\"url\":\"electrum3.cipig.net:10017\"}]}"
```

::: tip Note

- replace the value of the parameter `"coin"` in the above command with the coin name of your choosing
- find the electrum server addresses for the coin you are enabling from [https://github.com/jl777/coins/tree/master/electrums](https://github.com/jl777/coins/tree/master/electrums) and replace the values of the parameter named `"url"` in the above command with the appropriate values
- you have to enable both the coins involved in the stuck swap

:::

- The above command outputs a response similar to

```json
{
  "coin": "RICK",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "locked_by_swaps": "0",
  "required_confirmations": 1,
  "result": "success"
}
```

- Make sure the address and balance in the above response match the values shown in AtomicDEX mobile. If the address does not match, the `"passphrase"` (seed words) in `MM2.json` is incorrect. Stop `mm2`, delete the directory named `DB`, correct the passphrase and repeat all the steps from before. If the balance is `0`, either the electrum server's addresses you are using are incorrect or your connection might have an issue. Likely a firewall is blocking it.

:::warning Caution

Don't delete the DB if you have been using the `mm2` on your desktop before opening this guide. It contains information on your past/ongoing/stuck swaps. Deleting it may cause you to lose access to your locked coins. Instead of deleting the entire DB, simply delete the directory inside the DB that corresponds to the wrong `"passphrase"` value. It should be the direcory that was created/modified most recently

:::

- Once you are sure that both the coins have been enabled using the `electrum` method and the addresses and balances match the values in the AtomicDEX mobile, you are ready to recover the swap. Issue the `recover_funds_of_swap` command with the swap id as an argument 

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"recover_funds_of_swap\",\"params\":{\"uuid\":\"<swap id of the stuck swap here>\"}}"
```

- Replace the text `<swap id of the stuck swap here>` with the swap id of the stuck swap.
- You should see a response similar to the following, if it was successful

```json
{
  "result": {
    "action": "RefundedMyPayment",
    "coin": "RICK",
    "tx_hash": "696571d032976876df94d4b9994ee98faa870b44fbbb4941847e25fb7c49b85d",
    "tx_hex": "0400008085202f890113591b1feb52878f8aea53b658cf9948ba89b0cb27ad0cf30b59b5d3ef6d8ef700000000d8483045022100eda93472c1f6aa18aacb085e456bc47b75ce88527ed01c279ee1a955e85691b702201adf552cfc85cecf588536d5b8257d4969044dde86897f2780e8c122e3a705e40120576fa34d308f39b7a704616656cc124232143565ca7cf1c8c60d95859af8f22d004c6b63042555555db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a9146e602d4affeb86e4ee208802901b8fd43be2e2a4882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0198929800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac0238555d000000000000000000000000000000"
  }
}
```

Please contact us in the [Discord server](https://komodoplatform.com/discord) if any step is unclear. When in doubt, ask first before executing a command.
