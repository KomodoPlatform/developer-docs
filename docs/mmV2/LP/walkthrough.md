---
sidebarDepth: 3
---

# How To Become a Liquidity Provider for AtomicDEX

## Requirements

A VPS with _atleast_ the following specifications:

- 2 vCPU
- 4GB RAM
- OS: Ubuntu 18.04 (Preferably a clean installation)

**(OR)**

A Home computer with a GOOD internet connection and decent specifications running Ubuntu 18.04.

- Internet speed - atleast 1 MBPS
- RAM - atleast 4 GB
- Processor - atleast i5 or equivalent

## Installing Dependencies

### Step 1: OS Packages

Command:

```bash
sudo apt update
sudo apt-get install build-essential git jq llvm-3.9-dev libclang-3.9-dev clang-3.9 cmake libssl-dev pkg-config
```

### Step 2: Install rust

Command:

```bash
curl https://sh.rustup.rs -sSf | sh
```

When asked to select an installation type, select:

```
1) Proceed with installation (default)
```

<collapse-text hidden title="Sample Output">

```
$ curl https://sh.rustup.rs -sSf | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust programming
language, and its package manager, Cargo.

It will add the cargo, rustc, rustup and other commands to Cargo's bin
directory, located at:

  /home/mylo/.cargo/bin

This path will then be added to your PATH environment variable by modifying the
profile file located at:

  /home/mylo/.profile

You can uninstall at any time with rustup self uninstall and these changes will
be reverted.

Current installation options:

   default host triple: x86_64-unknown-linux-gnu
     default toolchain: stable
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation

Press Enter

info: syncing channel updates for 'stable-x86_64-unknown-linux-gnu'
info: latest update on 2019-07-04, rust version 1.36.0 (a53f9df32 2019-07-03)
info: downloading component 'rustc'
info: downloading component 'rust-std'
info: downloading component 'cargo'
...
...
info: downloading component 'rust-docs'
info: installing component 'rustc'
 91.1 MiB /  91.1 MiB (100 %)  17.7 MiB/s in  5s ETA:  0s
info: installing component 'rust-std'
....
...
 stable installed - rustc 1.36.0 (a53f9df32 2019-07-03)


Rust is installed now. Great!

To get started you need Cargo's bin directory ($HOME/.cargo/bin) in your PATH
environment variable. Next time you log in this will be done automatically.

To configure your current shell run source $HOME/.cargo/env

```

</collapse-text>

Once the installation is complete, you need to either `Logout` then `Login` again or execute the following command in each shell you use till the next `Login`

```bash
source $HOME/.cargo/env
```

### Step 3: Install rust components

Command:

```bash
rustup install nightly-2019-06-26
```

<collapse-text hidden title="Sample Output">

```
$ rustup install nightly-2019-06-26
info: syncing channel updates for 'nightly-2019-06-26-x86_64-unknown-linux-gnu'
info: latest update on 2019-06-26, rust version 1.37.0-nightly (5f9c0448d 2019-06-25)
info: downloading component 'rustc'
info: downloading component 'rust-std'
info: downloading component 'cargo'
  4.6 MiB /   4.6 MiB (100 %)   1.8 MiB/s in  1s ETA:  0s
info: downloading component 'rust-docs'
info: installing component 'rustc'
 85.5 MiB /  85.5 MiB (100 %)  18.4 MiB/s in  4s ETA:  0s
info: installing component 'rust-std'
 61.7 MiB /  61.7 MiB (100 %)  19.9 MiB/s in  2s ETA:  0s
info: installing component 'cargo'
info: installing component 'rust-docs'
 11.2 MiB /  11.2 MiB (100 %)   7.8 MiB/s in  1s ETA:  0s

  nightly-2019-06-26-x86_64-unknown-linux-gnu installed - rustc 1.37.0-nightly (5f9c0448d 2019-06-25)

info: checking for self-updates
```

</collapse-text>

Command:

```bash
rustup default nightly-2019-06-26
```

<collapse-text hidden title="Sample Output">

```
$ rustup default nightly-2019-06-26
info: using existing install for 'nightly-2019-06-26-x86_64-unknown-linux-gnu'
info: default toolchain set to 'nightly-2019-06-26-x86_64-unknown-linux-gnu'

  nightly-2019-06-26-x86_64-unknown-linux-gnu unchanged - rustc 1.37.0-nightly (5f9c0448d 2019-06-25)

```

</collapse-text>

Command:

```bash
rustup component add rustfmt-preview
```

<collapse-text hidden title="Sample Output">

```
$ rustup component add rustfmt-preview
info: downloading component 'rustfmt'
  2.9 MiB /   2.9 MiB (100 %) 928.6 KiB/s in  1s ETA:  0s
info: installing component 'rustfmt'
```

</collapse-text>

## Installing the Marketmaker Software

### Step 1: Download source code

```bash
cd ~ ; git clone https://github.com/KomodoPlatform/atomicDEX-API --branch mm2 --single-branch && cd atomicDEX-API
```

<collapse-text hidden title="Sample Output">

```
$cd ~ ; git clone https://github.com/KomodoPlatform/atomicDEX-API --branch mm2 --single-branch && cd atomicDEX-API
Cloning into 'atomicDEX-API'...
remote: Enumerating objects: 34, done.
remote: Counting objects: 100% (34/34), done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 107436 (delta 14), reused 21 (delta 11), pack-reused 107402
Receiving objects: 100% (107436/107436), 194.19 MiB | 9.59 MiB/s, done.
Resolving deltas: 100% (84045/84045), done.
```

</collapse-text>

### Step 2: Compile source code

Command:

```bash
cargo build --features native -vv
```

<collapse-text hidden title="Sample Output">

```
…
…
    Finished dev [optimized + debuginfo] target(s) in 6m 40s
```

</collapse-text>

### Step 3: Download the coins configuration file

Command:

```bash
cd ~/atomicDEX-API/target/debug ; wget https://raw.githubusercontent.com/jl777/coins/master/coins
```

<collapse-text hidden title="Sample Output">

```
$ cd ~/atomicDEX-API/target/debug; wget https://raw.githubusercontent.com/jl777/coins/master/coins
--2019-07-20 05:27:50--  https://raw.githubusercontent.com/jl777/coins/master/coins
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.8.133
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.8.133|:443... connected.
HTTP request sent, awaiting response...
200 OK
Length: 58974 (58K) [text/plain]
Saving to: ‘coins’

coins                                                        100%[=================================================================================================================================================>]  57.59K  --.-KB/s    in 0.002s

2019-07-20 05:27:50 (37.2 MB/s) - ‘coins’ saved [58974/58974]
```

</collapse-text>

## Running the Marketmaker

### Step 1: Download and edit some scripts to provide liquidity for the KMD/LTC pair

We will now download some scripts to the directory: `~/atomicDEX-API/target/debug` for easy interaction with the Marketmaker.

Navigate to the directory: `~/atomicDEX-API/target/debug`

```bash
cd ~/atomicDEX-API/target/debug
```

Download the scripts used to start and interact with the Marketmaker

```bash
git clone https://github.com/gcharang/mm2scripts
```

Copy those scripts to the current directory

```bash
cp mm2scripts/* .
```

#### Edit the file named `start.sh`

```bash
nano start.sh
```

Replace the value `REPLACE_TRADING_WALLET_PASSPHRASE` in the file with a seed phrase (24 words) created using the AtomicDEX wallet or the Verus Agama wallet. **Failure to do so will result in lost coins**.

Backup these 24 words carefully. They provide access to the coins that are stored in the addresses created by the Marketmaker.

Replace the text `"RPC_CONTROL_USERPASSWORD"` with a sufficiently strong password.

<collapse-text hidden title="Example">

```bash
#!/bin/bash
stdbuf -oL ./mm2 "{\"gui\":\"MM2GUI\",\"netid\":9999, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"alpha sleep calm pumpkin brief game summer item monitor mother hobby filter clever desert boat prosper office entry major sauce praise neglect brand dove\", \"rpc_password\":\"GlHjhvYlev8fh8xZgSBI\"}" &
```

**DO NOT** use the seed phrase: `"alpha sleep calm pumpkin brief game summer item monitor mother hobby filter clever desert boat prosper office entry major sauce praise neglect brand dove"`. **Using it will result in lost coins**.

</collapse-text>

Hit `Ctrl + X` to save and exit. Observe the bottom part for any prompts. Hit `y` when asked to save. When the file name is shown, just hit `Enter` if the name matches `start.sh` .

#### Edit the file named `userpass`

Replace the text `RPC_CONTROL_USERPASSWORD` with the same password used in the `start.sh` file.

<collapse-text hidden title="Example">

```
userpass=GlHjhvYlev8fh8xZgSBI
```

</collapse-text>

We now have the basic scripts to use the Marketmaker.

#### More methods

More methods can be found in the [linked document.](https://developers.atomicdex.io/basic-docs/atomicdex/atomicdex-api.html)

The examples there can be used to create more scripts for convenience.

If the name of the script you create is `SCRIPT_NAME.sh` , make it executable using the following command.

```bash
chmod +x SCRIPT_NAME.sh
```

### Step 2: Start the Marketmaker

Command:

```bash
./start.sh
```

<collapse-text hidden title="Sample Output">

```
$ ./start.sh
mylo@vultr:~/atomicDEX-API/target/debug$ 20 08:05:19, mm2:143] AtomicDEX MarketMaker UNKNOWN
20 08:05:19, lp_native_dex:1311] version: UNKNOWN
20 08:05:19, lp_native_dex:1366] lp_init] Trying to fetch the real IP from 'http://checkip.amazonaws.com/' ...
20 08:05:19, lp_native_dex:1283] test_ip] Trying to listen on 207.148.124.43:15175
20 08:05:19, lp_native_dex:1300] test_ip] Checking http://207.148.124.43:15175/test_ip
🙂 2019-07-20 08:05:19 +0000 [myipaddr] We've detected an external IP 207.148.124.43 and we can bind on it (port 47772), so probably a dedicated IP.
… 2019-07-20 08:05:19 +0000 [seed_connection 195.201.116.176:47772] Connecting…
⚡  2019-07-20 08:05:19 +0000 [seed_connection 195.201.116.176:47772] Connected
… 2019-07-20 08:05:19 +0000 [seed_connection 46.4.87.18:47772] Connecting…
⚡  2019-07-20 08:05:19 +0000 [seed_connection 46.4.87.18:47772] Connected
… 2019-07-20 08:05:19 +0000 [seed_connection 46.4.78.11:47772] Connecting…
20 08:05:20, peers:1376] initialize] netid 9999 public key a91383e8aa2ccf4d2ed5fa3ac232b221fab6ccd5e6640114c9851742aa37ebc2 preferred port 47773 drill false
20 08:05:20, rpc:290] >>>>>>>>>> DEX stats 127.0.0.1:7783 DEX stats API enabled at unixtime.1563609920 <<<<<<<<<
⚡  2019-07-20 08:05:20 +0000 [seed_connection 46.4.78.11:47772] Connected
20 08:05:20, peers:1153] external_ip_alert: 207.148.124.43
· 2019-07-20 08:05:36 +0000 [dht-boot] DHT bootstrap ... Done.
```

</collapse-text>

### Step 3: Connect to the Coin Networks (KMD & LTC)

Open a new terminal and Navigate to the directory: `~/atomicDEX-API/target/debug`

```bash
cd ~/atomicDEX-API/target/debug
```

#### Connect to the KMD network

Command:

```bash
./KMDconnect.sh
```

Response:

```js
{"address":"RG1yR8UGqyHmRBcrwAakUEi8u1AC5jNABY","balance":"0","coin":"KMD","result":"success"}
```

Take note of the address and make sure that it matches the address generated for KMD by the AtomicDEX wallet or the Verus Agama wallet.

<collapse-text hidden title="Sample Output in the terminal start.sh has been executed">

```js
2019-07-20 08:07:13, lp_coins:669] ticker = "KMD", block_count = 1450741
```

</collapse-text>

#### Connect to the LTC network

Command:

```bash
./LTCconnect.sh
```

Response:

```js
{"address":"LRxjbptpKojFbywpe8avejShLx4sYvKSBZ","balance":"0","coin":"LTC","result":"success"}
```

Take note of the address and make sure that it matches the address generated for KMD by the AtomicDEX wallet or the Verus Agama wallet.

<collapse-text hidden title="Sample Output in the terminal start.sh has been executed">

```js
2019-07-20 08:08:11, lp_coins:669] ticker = "LTC", block_count = 1670767
```

</collapse-text>

## Trading

### Step 0: Query the current Orderbooks

See the [linked document](https://developers.atomicdex.io/basic-docs/atomicdex/atomicdex-api.html#orderbook) for explanation of the output.

Display the KMD/LTC Orderbook:

Command:

```bash
./orderbook.sh KMD LTC | jq '.'
```

<collapse-text hidden title="Sample Output">

```js
{
 "askdepth": 0,
 "asks": [
   {
     "coin": "KMD",
     "address": "RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd",
     "price": 0.013215470000000002,
     "numutxos": 0,
     "avevolume": 0,
     "maxvolume": 485.99773485000003,
     "depth": 0,
     "pubkey": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
     "age": 10,
     "zcredits": 0
   }
 ],
 "base": "KMD",
 "biddepth": 0,
 "bids": [
   {
     "coin": "LTC",
     "address": "Ld6814QT6fyChvvX3gmhNHbRDyiMBvPr9s",
     "price": 0.011956849349654498,
     "numutxos": 0,
     "avevolume": 0,
     "maxvolume": 1.03403044,
     "depth": 0,
     "pubkey": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
     "age": 11,
     "zcredits": 0
   }
 ],
 "netid": 9999,
 "numasks": 1,
 "numbids": 1,
 "rel": "LTC",
 "timestamp": 1563610320
}
```

</collapse-text>

Display the LTC/KMD Orderbook:

Command:

```bash
./orderbook.sh LTC KMD | jq '.'
```

<collapse-text hidden title="Sample Output">

```js
{
 "askdepth": 0,
 "asks": [
   {
     "coin": "LTC",
     "address": "Ld6814QT6fyChvvX3gmhNHbRDyiMBvPr9s",
     "price": 83.19879514,
     "numutxos": 0,
     "avevolume": 0,
     "maxvolume": 1.03403044,
     "depth": 0,
     "pubkey": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
     "age": 9,
     "zcredits": 0
   }
 ],
 "base": "LTC",
 "biddepth": 0,
 "bids": [
   {
     "coin": "KMD",
     "address": "RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd",
     "price": 75.27507393894138,
     "numutxos": 0,
     "avevolume": 0,
     "maxvolume": 485.99773485000003,
     "depth": 0,
     "pubkey": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
     "age": 10,
     "zcredits": 0
   }
 ],
 "netid": 9999,
 "numasks": 1,
 "numbids": 1,
 "rel": "KMD",
 "timestamp": 1563610443
}
```

</collapse-text>

Now that we are aware of the current prices for the trade pairs we are interested in, we can start funding the addresses.

### Step1: Fund the address

In this example, we are selling KMD for LTC.

To achieve this, we first fund the KMD address created by the Marketmaker.

To find the address and Check the balance, use the following command.

```bash
./mybalance.sh KMD
```

Response:

```js
{"address":"RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb","balance":"2.98","coin":"KMD"}
```

### Step2: Place an order

To sell 2 KMD for LTC at the price `1 KMD = 0.013 LTC`.

Command:

```bash
./place_order.sh KMD LTC 0.013 2 | jq '.'
```

Response:

```js
{
  "result": {
    "base": "KMD",
    "created_at": 1563800688606,
    "matches": {},
    "max_base_vol": "2",
    "min_base_vol": "0",
    "price": "0.013",
    "rel": "LTC",
    "started_swaps": [],
    "uuid": "d375fce0-5d7c-4d1d-9cfa-6177c78df44a"
  }
}
```

### Step3: Check the status of an Order

Check the status of an order by referring to its `uuid`

Command:

```bash
./order_status.sh 6621efd5-72dd-422c-89a8-7b655b744ead | jq '.'
```

Response:

```js
{
  "order": {
    "available_amount": "2",
    "base": "KMD",
    "cancellable": true,
    "created_at": 1563800688606,
    "matches": {},
    "max_base_vol": "2",
    "min_base_vol": "0",
    "price": "0.013",
    "rel": "LTC",
    "started_swaps": [],
    "uuid": "d375fce0-5d7c-4d1d-9cfa-6177c78df44a"
  },
  "type": "Maker"
}
```

### Step4: Withdrawal of Coins

Once someone accepts the order and the trade is finished, the coins Received (LTC) and the coins Leftover (KMD) can be withdrawn.

To withdraw 0.97 KMD to the address RUFf4de7gZE7sp5vPcxaAsvv6j79ZbQgAu:

Command:

```bash
./withdraw.sh KMD RUFf4de7gZE7sp5vPcxaAsvv6j79ZbQgAu 0.97 | jq '.'
```

Response:

```json
{
  "tx_hex": "0400008085202f8901c25ecb12f5fc17120bf92ed18ff71754b5f58e6eece2fba44fc114f14176df04010000006a4730440220732047807944afcb062f5dc7af87fe5b9979e447cd235ef1b130e50008c3d51a02201b232814bcee9c0b5a29aa24d453e493cd121a0e21d94c0e84476de0a15e74a101210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ffffffff02401ac805000000001976a914d020156e7d0fead249cfb5a458952ae941ac9f9e88ac5800fb0b000000001976a9144726f2838fc4d6ac66615e10604e18926e9b556e88ac06a5355d000000000000000000000000000000",
  "tx_hash": "e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",
  "from": ["RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb"],
  "to": ["RUFf4de7gZE7sp5vPcxaAsvv6j79ZbQgAu"],
  "total_amount": 2.98,
  "spent_by_me": 2.98,
  "received_by_me": 2.00999,
  "my_balance_change": -0.97001,
  "block_height": 0,
  "timestamp": 1563798788,
  "fee_details": {
    "amount": 1e-5
  },
  "coin": "KMD",
  "internal_id": ""
}
```

Copy the `"tx_hex"` from the above response and send it to the network using the `sendrawtransaction.sh` script.

Command:

```bash
./sendrawtransaction.sh KMD 0400008085202f8901c25ecb12f5fc17120bf92ed18ff71754b5f58e6eece2fba44fc114f14176df04010000006a4730440220732047807944afcb062f5dc7af87fe5b9979e447cd235ef1b130e50008c3d51a02201b232814bcee9c0b5a29aa24d453e493cd121a0e21d94c0e84476de0a15e74a101210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ffffffff02401ac805000000001976a914d020156e7d0fead249cfb5a458952ae941ac9f9e88ac5800fb0b000000001976a9144726f2838fc4d6ac66615e10604e18926e9b556e88ac06a5355d000000000000000000000000000000
```

Response:

```json
{
  "tx_hash": "e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855"
}
```

The above `tx_hash` can be searched for in an explorer to check the status of the withdraw.

## Miscellaneous

### Stop

To stop the Marketmaker, use the `stop.sh` script.

Command:

```bash
./stop.sh
```

Response:

```js
{
  "result": "success"
}
```

### To view all the orders placed by us

Command:

```bash
./myorders.sh  | jq .
```

Response:

```js
{
  "result": {
    "maker_orders": {
      "d82357c5-22c9-483d-bf3d-1d09d0d921bf": {
        "available_amount": "2",
        "base": "KMD",
        "cancellable": true,
        "created_at": 1563797287088,
        "matches": {},
        "max_base_vol": "2",
        "min_base_vol": "0",
        "price": "0.013",
        "rel": "LTC",
        "started_swaps": [],
        "uuid": "d82357c5-22c9-483d-bf3d-1d09d0d921bf"
      }
    },
    "taker_orders": {}
  }
}
```

### Cancel an order

Cancel an order by referring to its `uuid`

Command:

```bash
./cancel_order.sh 6621efd5-72dd-422c-89a8-7b655b744ead
```

Response:

```js
{
  "result": "success"
}
```

<!--
### Cancel all orders
### coins_needed_for_kick_start
-->