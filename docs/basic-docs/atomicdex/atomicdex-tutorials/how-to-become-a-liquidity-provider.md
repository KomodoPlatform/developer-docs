# How To Become a Liquidity Provider on Komodo DeFi Framework

The following tutorial introduces the reader to a simple method to become a liquidity provider on the main network of the KomoDeFi software.

## Requirements

#### Virtual Private Server (Recommended)

We recommend that the user [have a Virtual Private Server (VPS)](https://developers.komodoplatform.com/basic-docs/smart-chains/smart-chain-tutorials/basic-environment-setup-for-linux-vps.html) with _at least_ the following specifications.

- 2 vCPU
- 4GB RAM
- OS: Ubuntu 18.04 (Preferably a clean installation)

#### Home-Based Connection

If the user prefers to use computer hardware at home, instead of a VPS, we recommend that the user have a very strong Internet connection. We also recommend that the user have a competitive hardware setup running on Ubuntu 18.04.

- Internet speed - _at least_ 1 MBPS
- RAM - _at least_ 4 GB
- Processor - _at least_ i5 or equivalent

## Get the Komodo DeFi Framework and Coins Configuration File

#### Step 1: Get the Komodo DeFi Framework binary

You can get the Komodo DeFi Framework binary by downloading pre-compiled versions from the official repository or by building from source.

##### Downloading from the Official Repository (Option 1)

We will create `~/atomicDEX-API/target/debug` directory for compatibility with building from source method.

You can get the latest release of the Komodo DeFi Framework binary from the [atomicDEX-API/releases](https://github.com/KomodoPlatform/atomicDEX-API/releases) page on Github. Download and extract it to `~/atomicDEX-API/target/debug`.

For example:

```bash
mkdir -p ~/atomicDEX-API/target/debug
cd ~/atomicDEX-API/target/debug
wget https://github.com/KomodoPlatform/atomicDEX-API/releases/download/beta-2.1.4315/mm2-9fe6e9402-Linux-Release.zip
unzip mm2-9fe6e9402-Linux-Release.zip
```

Then you can proceed to [download the coins configuration file](#step-2-download-the-coins-configuration-file).

##### Building from Source (Option 2)

If you decide to build from source, please follow the [Build Komodo DeFi Framework from source guide](how-to-compile-mm2-from-source.html)

#### Step 2: Download the Coins Configuration File

##### Command

```bash
cd ~/atomicDEX-API/target/debug ; wget https://raw.githubusercontent.com/KomodoPlatform/coins/master/coins
```

<collapse-text hidden title="Sample Output">

```
$ cd ~/atomicDEX-API/target/debug; wget https://raw.githubusercontent.com/KomodoPlatform/coins/master/coins
--2019-07-20 05:27:50--  https://raw.githubusercontent.com/KomodoPlatform/coins/master/coins
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

## Running the Komodo DeFi Framework

#### Step 1: Download and Edit Scripts to Provide Liquidity for the KMD/LTC Pair

Navigate to the directory: `~/atomicDEX-API/target/debug`

```bash
cd ~/atomicDEX-API/target/debug
```

Download the scripts used to start and interact with the Komodo DeFi Framework.

```bash
git clone https://github.com/gcharang/mm2scripts
```

Copy those scripts to the current directory.

```bash
cp mm2scripts/* .
```

#### Create a Secure Seed Phrase

The user must create a seed phrase that will serve as a type of password for accessing all coins in the user's digital wallet.

Various tools are available in the cryptocurrency community to create a secure seed phrase. One available method is to use the automated procedure that is included in the [Komodo Desktop Wallet](https://komodoplatform.com/en/wallets.html).

Backup these 24 words carefully. They provide access to the coins that are stored in the addresses created by the Komodo DeFi Framework.

To learn more about creating secure phrases, [read this linked content on the Bitcoin wiki.](https://en.bitcoin.it/wiki/Seed_phrase)

#### Edit the start.sh File

::: danger Danger!

We are about to place the seed phrase in the `start.sh` file. Failure to properly execute this step can lead to a loss of your funds.

:::

Open the `start.sh` file in the current directory using the `nano` text-editor.

```bash
nano start.sh
```

Replace the value `REPLACE_TRADING_WALLET_PASSPHRASE` in the file with the seed phrase.

#### Create an RPC Control User Password

Keep the nano software and `start.sh` file open.

Separately, create an additional password for Remote Procedure Call (RPC) access.

This should be a simple password that is sufficiently random, has at least eight digits, and is based on numbers and letters.

#### Place the User Password into the start.sh File

Replace the text `"RPC_CONTROL_USERPASSWORD"` with your RPC user password.

##### Example

<div style="margin-top: 1rem; margin-bottom: 1rem;">

<collapse-text hidden title="Example">

::: warning Danger!

The below example contains an example for launching the Komodo DeFi Framework software with a 24-word passphrase. This is provided for demonstration purposes only. You should NOT copy/paste this example. Type this command in manually to your terminal, and MAKE SURE TO CHANGE THE PASSPHRASE TO YOUR OWN.

Failure to properly manage your passphrase can (and likely will) result in lost funds.

:::

```bash
#!/bin/bash
stdbuf -oL nohup ./mm2 "{\"gui\":\"Docs_Walkthru\",\"netid\":7777, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"alpha sleep calm pumpkin brief game summer item monitor mother hobby filter clever desert boat prosper office entry major sauce praise neglect brand dove\", \"rpc_password\":\"GlHjhvYlev8fh8xZgSBI\"}" &
```

</collapse-text>

</div>

Hit `Ctrl + X` to save and exit.

Observe the bottom of the terminal for any prompts. Hit `y` when asked to save. When the file name is shown, hit `Enter` if the name matches `start.sh`.

#### Edit the userpass File

Replace the text `RPC_CONTROL_USERPASSWORD` with the same password used in the `start.sh` file.

<collapse-text hidden title="Example">

```
userpass=GlHjhvYlev8fh8xZgSBI
```

</collapse-text>

We now have basic scripts to use the Komodo DeFi Framework as a liquidity provider.

#### Step 2: Start the Komodo DeFi Framework

##### Command

```bash
./start.sh
```

<collapse-text hidden title="Sample Output">

```
$ ./start.sh
nohup: appending output to 'nohup.out'
```

</collapse-text>

:::tip Note
Starting the Komodo DeFi Framework in the above manner causes the passphrase to be visible to other programs such as `htop`.

To avoid this issue, there is an alternate method that uses a json file to replace the command line parameters

To use it:

```bash
cp MM2_sample.json MM2.json
nano MM2.json
```

Edit the values of the keys `"rpc_password"` and `"passphrase"` with the same values used in the `start.sh` file. Save and close the file.

To start the Komodo DeFi Framework:

```bash
stdbuf -oL nohup ./mm2
```

:::

#### Step 3: Connect to the Coin Networks (KMD & LTC)

Open a new terminal and navigate to the directory: `~/atomicDEX-API/target/debug`

```bash
cd ~/atomicDEX-API/target/debug
```

#### Connect to the KMD network

##### Command

```bash
./KMDconnect.sh
```

##### Response

```js
{"address":"RG1yR8UGqyHmRBcrwAakUEi8u1AC5jNABY","balance":"0","coin":"KMD","result":"success"}
```

Take note of the address.

::: tip

We recommend here that you make sure that the public address above matches the address generated by the same passphrase, when entered into the Komodo wallet or the Verus Desktop wallet.

:::

<collapse-text hidden title="Response">

A sample response of the terminal output after the `start.sh` file is executed.

```js
2019-07-20 08:07:13, lp_coins:669] ticker = "KMD", block_count = 1450741
```

</collapse-text>

#### Connect to the LTC network

##### Command

```bash
./LTCconnect.sh
```

##### Response

```js
{"address":"LRxjbptpKojFbywpe8avejShLx4sYvKSBZ","balance":"0","coin":"LTC","result":"success"}
```

<collapse-text hidden title="Sample Output">

::: tip

Again, a best practice here is to ensure that the public address above matches with the address in the Komodo Wallet or Verus Desktop wallets.

:::

```js
2019-07-20 08:08:11, lp_coins:669] ticker = "LTC", block_count = 1670767
```

</collapse-text>

#### Connecting to a Network Other Than KMD or LTC

To connect to a coin network other than KMD or LTC, first make sure that the coin's details are present in the `coins` file you downloaded. Also make sure that the file has the property `"mm2": 1`.

Next, create a new file named "COINNAMEconnect.sh" and add the following contents; replace the characters `<` and `>` and all text between them with values from your `coins` file. (For example: `<text where 7771 should be inserted>` becomes `7771`.)

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"<COIN TICKER>\",\"servers\":[{\"url\":\"<url of electrum server 1>\"},{\"url\":\"<url of electrum server 2>\"}]}"
```

Make the file executable

```bash
cd ~/atomicDEX-API/target/debug
chmod +x COINNAMEconnect.sh
```

Execute the command `./COINNAMEconnect.sh` to instruct your Komodo DeFi Framework instance to connect to the coin's electrum server.

## Trading

#### Step 0: Query the Current Orderbooks

Display the KMD/LTC Orderbook.

::: tip

See this [linked document](../../../basic-docs/atomicdex-api-legacy/orderbook.html) for an explanation of the output.

:::

##### Command

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
     "price": "0.013215470000000002",
     "price_rat": [
       [1, [1536963325, 1773750]],
       [1, [0, 134217728]]
     ],
     "price_fraction": {
       "numer": "7618199778243325",
       "denom": "576460752303423488"
     },
     "maxvolume": "485.99773485000003",
     "max_volume_rat": [
       [1, [1550366371, 995323]],
       [1, [0, 2048]]
     ],
     "max_volume_fraction": {
       "numer": "4274881284322979",
       "denom": "8796093022208"
     },
     "pubkey": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
     "age": 10,
     "zcredits": 0,
     "uuid": "ac058b00-24e0-40e1-82f0-0ec4131450c5",
     "is_mine": false
   }
 ],
 "base": "KMD",
 "biddepth": 0,
 "bids": [
   {
     "coin": "LTC",
     "address": "Ld6814QT6fyChvvX3gmhNHbRDyiMBvPr9s",
     "price": "0.011956849349654498",
     "price_rat": [
       [1, [1238828453, 401205]],
       [1, [0, 33554432]]
     ],
     "price_fraction": {
       "numer": "1723163592820133",
       "denom": "144115188075855872"
     },
     "maxvolume": "1.03403044",
     "max_volume_rat": [
       [1, [3226923691, 542129]],
       [1, [0, 524288]]
     ],
     "max_volume_fraction": {
       "numer": "2328429552136875",
       "denom": "2251799813685248"
     },
     "depth": 0,
     "pubkey": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
     "age": 11,
     "zcredits": 0,
     "uuid": "80019ae0-5a42-40db-bc49-18975987e45b",
     "is_mine": false
   }
 ],
 "netid": 7777,
 "numasks": 1,
 "numbids": 1,
 "rel": "LTC",
 "timestamp": 1563610320
}
```

</collapse-text>

Display the LTC/KMD Orderbook.

##### Command

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
     "price": "83.19879514",
     "price_rat": [
       [1, [255867351, 1363129]],
       [1, [0, 16384]]
     ],
     "price_fraction": {
       "numer": "5854594731096535",
       "denom": "70368744177664"
     },
     "maxvolume": "1.03403044",
     "max_volume_rat": [
       [1, [3226923691, 542129]],
       [1, [0, 524288]]
     ],
     "max_volume_fraction": {
       "numer": "2328429552136875",
       "denom": "2251799813685248"
     },
     "pubkey": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
     "age": 9,
     "zcredits": 0,
     "uuid": "80019ae0-5a42-40db-bc49-18975987e45b",
     "is_mine": false
   }
 ],
 "base": "LTC",
 "biddepth": 0,
 "bids": [
   {
     "coin": "KMD",
     "address": "RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd",
     "price": "75.27507393894138",
     "price_rat": [
       [1, [3018734531, 308326]],
       [1, [0, 4096]]
     ],
     "price_fraction": {
       "numer": "1324253105241027",
       "denom": "17592186044416"
     },
     "maxvolume": "485.99773485000003",
     "max_volume_rat": [
       [1, [1550366371, 995323]],
       [1, [0, 2048]]
     ],
     "max_volume_fraction": {
       "numer": "4274881284322979",
       "denom": "8796093022208"
     },
     "pubkey": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
     "age": 10,
     "zcredits": 0,
     "uuid": "ac058b00-24e0-40e1-82f0-0ec4131450c5",
     "is_mine": false
   }
 ],
 "netid": 7777,
 "numasks": 1,
 "numbids": 1,
 "rel": "KMD",
 "timestamp": 1563610443
}
```

</collapse-text>

#### Step 1: Fund the Address

In this example, we sell KMD for LTC.

To achieve this, we first fund the KMD address created by the Komodo DeFi Framework.

Use the following command to find the address and check the balance.

```bash
./mybalance.sh KMD
```

##### Response

```js
{"address":"RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb","balance":"2.98","coin":"KMD"}
```

#### Step 2: Place an Order

Execute the following command to sell 2 KMD at the price of `1 KMD = 0.013 LTC`.

##### Command

```bash
./place_order.sh KMD LTC 0.013 2 | jq '.'
```

##### Response

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

#### Step 3: Check the Status of an Order

Check the status of an order by referring to its `uuid`.

##### Command

```bash
./order_status.sh 6621efd5-72dd-422c-89a8-7b655b744ead | jq '.'
```

##### Response

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

#### Step 4: Withdrawal of Coins

After someone accepts the order and your trade is finished, the coins received (LTC) and the coins leftover (KMD) can be withdrawn.

Execute the following command to withdraw `0.97` KMD to the address `RUFf4de7gZE7sp5vPcxaAsvv6j79ZbQgAu`.

##### Command

```bash
./withdraw.sh KMD RUFf4de7gZE7sp5vPcxaAsvv6j79ZbQgAu 0.97 | jq '.'
```

##### Response

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
    "type": "Utxo",
    "amount": 1e-5
  },
  "coin": "KMD",
  "internal_id": ""
}
```

Copy the `"tx_hex"` value from the above response and send it to the network using the `sendrawtransaction.sh` script.

##### Command

```bash
./sendrawtransaction.sh KMD 0400008085202f8901c25ecb12f5fc17120bf92ed18ff71754b5f58e6eece2fba44fc114f14176df04010000006a4730440220732047807944afcb062f5dc7af87fe5b9979e447cd235ef1b130e50008c3d51a02201b232814bcee9c0b5a29aa24d453e493cd121a0e21d94c0e84476de0a15e74a101210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ffffffff02401ac805000000001976a914d020156e7d0fead249cfb5a458952ae941ac9f9e88ac5800fb0b000000001976a9144726f2838fc4d6ac66615e10604e18926e9b556e88ac06a5355d000000000000000000000000000000
```

##### Response

```json
{
  "tx_hash": "e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855"
}
```

The above `tx_hash` can be searched for in an explorer to check the status of the withdraw.

## Miscellaneous

#### Stop

To stop the Komodo DeFi Framework, use the `stop.sh` script.

##### Command

```bash
./stop.sh
```

##### Response

```js
{
  "result": "success"
}
```

#### View All the Orders Placed by Our Node

##### Command

```bash
./myorders.sh  | jq .
```

##### Response

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

#### Cancel an Order

Cancel an order by referring to its `uuid`.

##### Command

```bash
./cancel_order.sh 6621efd5-72dd-422c-89a8-7b655b744ead
```

##### Response

```js
{
  "result": "success"
}
```
