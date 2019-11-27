# Pegs Module Creator Tutorial

::: tip

The Pegs Module is in the final stages of production.

The following tutorial is currently only compatible with computer-hardware setups that are running Linux OS's Ubuntu/Debian-based distributions.

For questions and assistance, please reach out to the Komodo team using the `#cc-pegs` channel on the [Komodo Discord](https://komodoplatform.com/discord) live-chat server. Thank you.

:::

## Tutorial Overview

This tutorial assists the reader in discovering the process of creating a new Smart Chain with an active stablecoin using the [Pegs Antara Module.](./pegs.html)

#### Tutorial Outline

- Launch a new test Smart Chain (`TESTUSDK`) to activate the Pegs Module
- Peg the test chain's coins to `USD` and create a pathway for users to back the stablecoin with `KMD`
- Create tokens to represent the `KMD` coins
- Create an oracle, register as a publisher, and subscribe to it
- Create a gateway and bind the previously created token and oracle to it
- Start the `oraclefeed` software to bring the `blockheader` data from the `KMD` chain to the `TESTUSDK` chain through the previously created oracle
- Create a peg by attaching the previously created gateway to it

Upon completion of this tutorial, the reader may follow the [user tutorial](./pegs-module-user-tutorial.html) and use the Smart Chain they have created for testing purposes.

## Installation (Only for Testing, do not use in Production)

Please read the following installation instructions, but do not yet execute them. Instead, read until  Do not follow these instructions yet. Proceed to the next section and based on your selection there, execute the installation steps in the required environment.

#### Dependencies

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl clang libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

### Optional

Create a swap partition if you are using a VPS with low amount of RAM. The following commands create a 4GB SWAP file. You can create 8GB if you have the required free storage and want it.

```bash
sudo swapon --show
free -h
df -h
sudo fallocate -l 4G /swapfile
ls -lh /swapfile
sudo chmod 600 /swapfile
ls -lh /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
free -h
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10 # This setting will persist until the next reboot. We can set this value automatically at restart by adding the line to our /etc/sysctl.conf file:
sudo nano /etc/sysctl.conf
vm.swappiness=10
```

## Build the Komodo daemon

```bash
git clone https://github.com/Mixa84/komodo
cd komodo
git checkout pegsCC
export CONFIGURE_FLAGS='CPPFLAGS=-DTESTMODE' # Tweaks some settings to make it easy for testing
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
cd src
```

## Launch the test Smart Chain - `TESTUSDK`

Launch parameters:

- `-ac_import=PEGSCC` alows the Pegs Antara module to create new Smart Chain coins.
- `-ac_end=1` ensures that, after block 1, there is no block reward and the only incentive to mine is transaction fees.
- `-debug` and `-printoconsole` are debug parameters that print miscellaneous
  information to the komodo daemon output, that are useful for testing and debugging.
- the amount of intial coin supply `-ac_supply=1000000` used here is somewhat arbitrary. We recommend the user to calculate all the requirements for the initial supply and use that number and be transparent regarding its usage with their community. Some of the uses of the initial supply include: funding an on-chain Faucet, creating Tokens, transaction fees related to Oracle subscription and publishing, transaction fees related to maintaining Gateways, creation of Pegs etc.,

Consult the [Antara Customizations](../../../basic-docs/antara/antara-setup/antara-customizations.html) doc for explanations of the other parameters used.

```bash
./komodod -ac_supply=1000000 -ac_reward=10000 -ac_name=TESTUSDK -ac_cc=2 -ac_import=PEGSCC -ac_end=1 -ac_perc=0 -ac_cbopret=5 -debug=pegscc-2 -debug=importcoin -debug=cctokens -debug=gatewayscc -printtoconsole=1
```

Launch a Smart Chain with the above parameters. The Komodo daemon (`komodod`) used to launch the Smart Chain should be compiled using the instructions in the [installation section](#installation) .If you have access to two VPS, follow [this guide](../../../basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.html). If you want to launch this Smart Chain in your Personal Computer or using a single VPS, follow [this guide](../../../basic-docs/smart-chains/smart-chain-tutorials/creating-a-smart-chain-on-a-single-node.html)

Recall also that a user must have a `pubkey` enabled when interacting with an Antara-related Smart Chain. [View this linked material for an explanation.](../../../basic-docs/antara/antara-tutorials/understanding-antara-addresses.html)

**In the rest of this walkthrough, we will be using the `TESTUSDK` Chain.**

## Create a token to represent the `KMD` coins

To create the tokens, execute the following command:

```bash
./komodo-cli -ac_name=TESTUSDK tokencreate KMD 100000 "KMD_BTC,BTC_USD,*,1"
```

This creates a total of `100000 * 10^8` tokens named `KMD` on the `TESTUSDK` chain, where each token will represent a single satoshi of the external coin `KMD`.

So, all these tokens together allow representation of upto `100000` `KMD` coins on the `TESTUSDK` chain.

The description of the token, `"KMD_BTC,BTC_USD,*,1"` specifies the synthetic price to be used by the Peg that we will associate with it.

`"KMD_BTC,BTC_USD,*,1"` means `(KMD/BTC) * (BTC/KMD) * 1` which gives `KMD/USD` or `KMD_USD` which is the price we need for the `TESTUSDK` coin to be pegged to the `USD` and backed by `KMD`

The command returns a hex value as a response:

```json
{
  "result": "success",
  "hex": "0100000001c05c55f5183a412750a912579bf5f915a261b68d51b2ce5e2664659e9dcce3010000000049483045022100e4a0fffaf4aa10be58716561a1f2043dfdc2c3a4b595e74031582bac9edcc7690220211a5984f8ab480ff7641073f9dc8622b02ee602228fe27fda788443cd6aadb401ffffffff041027000000000000302ea22c8020432de388aabcb6b4e3326351d1d815cee8be9a8d37b055cd1c0cf8782e5c50c08103120c008203000401cc00a0724e18090000302ea22c80205dcc33b0b3f0573b306ab85ffa9ce8622fbcb81cb6ad8ec00f366935bbf500f78103120c008203000401cc1f0493c2da510000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000426a40f2632102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567074b4d4454455354134b4d445f4254432c4254435f5553442c2a2c3100000000"
}
```

Select the hex value (`0100000001c05c55f5183a412750a...`) and copy it (CTRL + SHFT + C).

Broadcast this value using [sendrawtransaction:](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction)

```bash
./komodo-cli -ac_name=TESTUSDK sendrawtransaction insert_hex
```

This returns a string, and this string is our `tokenid`.

```bash
0946d12135cca0757a12931944ff930657f21fd676966c12d66d5750848ea712
```

Copy the `tokenid` into the text editor we opened at the beginning of the tutorial and keep it available for future use.

Watch the mempool using [getrawmempool](../../../basic-docs/smart-chains/smart-chain-api/blockchain.html#getrawmempool) to verify that the `tokenid` is successfully mined:

```bash
./komodo-cli -ac_name=TESTUSDK getrawmempool
```

Once the `tokenid` disappears from the mempool the transaction is mined.

We can check to see that our token is successfully created on the chain using [tokeninfo](../../../basic-docs/antara/antara-api/tokens.html#tokeninfo)

```bash
./komodo-cli -ac_name=TESTUSDK tokeninfo 0946d12135cca0757a12931944ff930657f21fd676966c12d66d5750848ea712
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "tokenid": "0946d12135cca0757a12931944ff930657f21fd676966c12d66d5750848ea712",
  "owner": "02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567",
  "name": "KMD",
  "supply": 10000000000000,
  "description": "KMD_BTC,BTC_USD,*,1"
}
```

</collapse-text>

We can check the balance of our `pubkey` using [tokenbalance:](../../../basic-docs/antara/antara-api/tokens.html#tokenbalance)

```bash
./komodo-cli -ac_name=TESTUSDK tokenbalance insert_tokenid insert_pubkey
```

## Create an Oracle

We use the [Oracles](../../../basic-docs/antara/antara-api/oracles.html#introduction) Module to add external data to the blockchain.

The name of our oracle should be identical to the name of our tokens, `KMD`, and the data format must start with `Ihh` (height, blockhash, merkleroot)

Create the oracle using [oraclescreate:](../../../basic-docs/antara/antara-api/oracles.html#oraclescreate)

```bash
./komodo-cli -ac_name=TESTUSDK oraclescreate KMD blockheaders Ihh
```

This returns a hex value:

```json
{
  "hex": "0400008085202f890112a78e8450576dd6126c9676d61ff2570693ff441993127a75a0cc3521d14609020000004847304402206d05f874b04808f5d989325e140e0a618de8081909bc20db24fd70ebfd53fedc02205f88c98f2399119ab680a246ac0613dffabb4a77022cc755b9fca6c96f50c52d01ffffffff0310270000000000002321038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aacffb592c2da510000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000000000001d6a1bec43074b4d4454455354034968680c626c6f636b6865616465727300000000280100000000000000000000000000",
  "result": "success"
}
```

Broadcast the returned hex data using [sendrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction)

```bash
./komodo-cli -ac_name=TESTUSDK sendrawtransaction insert_hex_data
```

This returns a transaction id, which is the `oracleid`:

```bash
ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e
```

Record this in the text editor.

Before registering as an oracle publisher, we need to run the `oraclesfund` method:

```bash
./komodo-cli -ac_name=TESTUSDK oraclesfund ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f89010e7a96165cbbc6655cf07f2c6ccfd18193406ccaa9956359af1d67d3744668ee01000000494830450221008f3db99deddacc6cf6c39260faac62aa00395a808715923e0301d6063a23618d022044565a478e2fbf316f843ac96c2921f267da71701f51fd0c244aff1aedb00ed101ffffffff031027000000000000302ea22c8020de1ac583c081d079fd4118ec0c29fe975121739d8fba70103e5fb45614913cbe8103120c008203000401ccdf6792c2da510000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000000000004f6a4c4cec460e7a96165cbbc6655cf07f2c6ccfd18193406ccaa9956359af1d67d3744668ee2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567102700000000000000000000290100000000000000000000000000",
  "result": "success"
}
```

</collapse-text>

Send the raw transaction by broadcasting the hex value:

```bash
./komodo-cli -ac_name=TESTUSDK sendrawtransaction 0400008085202f89010e7a96165cbbc6655cf07f2c6ccfd18193406ccaa9956359af1d67d3744668ee01000000494830450221008f3db99deddacc6cf6c39260faac62aa00395a808715923e0301d6063a23618d022044565a478e2fbf316f843ac96c2921f267da71701f51fd0c244aff1aedb00ed101ffffffff031027000000000000302ea22c8020de1ac583c081d079fd4118ec0c29fe975121739d8fba70103e5fb45614913cbe8103120c008203000401ccdf6792c2da510000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000000000004f6a4c4cec460e7a96165cbbc6655cf07f2c6ccfd18193406ccaa9956359af1d67d3744668ee2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567102700000000000000000000290100000000000000000000000000
```

Response:

<collapse-text hidden title="Response">

```bash
4f87b9769300282ce706eb0bd75d534d7cbbc940b04c1a7131c70e4b35f7c240
```

</collapse-text>

(Use `./komodo-cli -ac_name=TESTUSDK getrawmempool` to ensure that the transaction receives confirmation.)

To prepare for the oraclefeed instance, use [oraclesregister](../../../basic-docs/antara/antara-api/oracles.html#oraclesregister) to register as a publisher for the oracle. This must be done on a node which can post KMD block headers and which can execute withdrawal transactions:

```bash
./komodo-cli -ac_name=TESTUSDK oraclesregister insert_oracleid data_fee_in_satoshis`
```

This returns a hex value (not shown for brevity), which we now broadcast:

```bash
./komodo-cli -ac_name=TESTUSDK sendrawtransaction insert_hex_value
```

Retrieve the data publisher's `pubkey` using [oraclesinfo:](../../../basic-docs/antara/antara-api/oracles.html#oraclesinfo)

```bash
./komodo-cli -ac_name=TESTUSDK oraclesinfo insert_oracleid
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "txid": "ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e",
  "name": "KMD",
  "description": "blockheaders",
  "format": "Ihh",
  "marker": "RKbG81CYx6Qtxnu59edtQS6isycKbbFB1o",
  "registered": [
    {
      "publisher": "02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567",
      "baton": "RSY69ZqzUADpqSeVNR7o3Jdo2UnXjMCbjq",
      "batontxid": "1bfbdbc1062921b3e2620d57af2f7d6989ccc5dce5e6bdb2d8c2809ec98bdc44",
      "lifetime": "0.00000000",
      "funds": "0.00000000",
      "datafee": "0.00100000"
    }
  ]
}
```

</collapse-text>

The property, `"publisher"`, in the entry, `"registered"`, of the returned json object is the data publisher's `pubkey`, also called the `publisherpubkey`.

Subscribe to the oracle using [oraclessubscribe](../../../basic-docs/antara/antara-api/oracles.html#oraclessubscribe) to receive utxo information for data publishing.

The frequency of data-publishing transactions we can perform in a block is equal to the number of active subscriptions committed to the oracle. Therefore, we must have at least one subscription for the oracle to allow publishing.

```bash
./komodo-cli -ac_name=TESTUSDK oraclessubscribe insert_oracleid insert_publisherpubkey insert_amount_of_funds_to_add
```

This returns a hex value (not shown for brevity), which we now broadcast:

```bash
./komodo-cli -ac_name=TESTUSDK sendrawtransaction insert_hex_value
```

::: warning Note
Execute the <b>oraclessubscribe</b> and <b>sendrawtransaction</b> methods several times and with the same amount. This gives us the opportunity to broadcast more than one sample of data per block. In our example, we want to publish data for more than one KMD-height per block.
:::

Verify the oracle information to ensure it is properly established:

```bash
./komodo-cli -ac_name=TESTUSDK oraclesinfo insert_oracleid
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "txid": "ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e",
  "name": "KMD",
  "description": "blockheaders",
  "format": "Ihh",
  "marker": "RKbG81CYx6Qtxnu59edtQS6isycKbbFB1o",
  "registered": [
    {
      "publisher": "02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567",
      "baton": "RSY69ZqzUADpqSeVNR7o3Jdo2UnXjMCbjq",
      "batontxid": "1bfbdbc1062921b3e2620d57af2f7d6989ccc5dce5e6bdb2d8c2809ec98bdc44",
      "lifetime": "4.00000000",
      "funds": "4.00000000",
      "datafee": "0.00100000"
    }
  ]
}
```

</collapse-text>

## Bind the Token and Oracle to a Gateway

We now create a gateway and bind our information to it, using the [gatewaysbind](../../../basic-docs/antara/antara-api/gateways.html#gatewaysbind) method.

This method requires that we decide how many total gateway signatures we desire (`N`), and how many signatures are required to withdraw funds (`M`).

For our educational example, we may set both `N` and `M` equal to `1`, for simplicity.

As a part of this command we will need to indicate the `pubtype`, `p2shtype`, and `wiftype` values for our chosen coin. For Smart Chains, these values are `60`, `85` and `188` respectively.

```bash
./komodo-cli -ac_name=TESTUSDK gatewaysbind insert_tokenid insert_oracleid KMD insert_tokensupply 1 1 insert_gatewayspubkey 60 85 188
```

This method returns a hex value (not shown for brevity), which we now broadcast:

```bash
./komodo-cli -ac_name=TESTUSDK sendrawtransaction insert_hex_value
```

The broadcast returns a transaction id, also called the `bindtxid`. Copy this information into the text editor.

Assuming everything is properly created and executed, we may now review our new gateway using [gatewaysinfo:](../../../basic-docs/antara/antara-api/gateways.html#gatewaysinfo)

```bash
./komodo-cli -ac_name=HELLOWORLD gatewaysinfo insert_bindtxid
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "name": "Gateways",
  "M": 1,
  "N": 1,
  "pubkeys": [
    "02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567"
  ],
  "coin": "KMD",
  "oracletxid": "ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e",
  "taddr": 0,
  "prefix": 60,
  "prefix2": 85,
  "wiftype": 188,
  "deposit": "RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa",
  "tokenid": "0946d12135cca0757a12931944ff930657f21fd676966c12d66d5750848ea712",
  "totalsupply": "100000.00000000",
  "remaining": "100000.00000000",
  "issued": "0.00000000"
}
```

</collapse-text>

Use the returned information to verify that the `tokenid` and `oracleid` match the information in our text editor.

## Start the oraclefeed software

The `oraclefeed` software instance automates the transfer of merkleroot data from the `KMD` chain to our Oracle on the `TESTUSDK` chain.

Change into the directory where `komodod` and `komodo-cli` are compiled bt default (this command assumes we installed Komodo in the default directory):

```bash
cd  ~/komodo/src/
```

Compile the instance:

```bash
gcc cc/dapps/oraclefeed.c -lm -o oraclefeed
```

Run the instance:

```bash
./oraclefeed TESTUSDK insert_oracleid insert_mypubkey Ihh insert_bindtxid "cli command to access te external coin(KMD)"
```

Inserting the vaues:

```bash
./oraclefeed TESTUSDK ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e 02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567 Ihh 0b5716554e523aa4678112a8ac3d15039e0aae6f4812b9d4c631cc9cfbf48786 "./komodo-cli"
```

<collapse-text hidden title="Response">

```bash
BTC/USD 8469.7417
Powered by CoinDesk (https://www.coindesk.com/price/) 8469.74170000
must supply reference coin
set refcoin RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa <- KMD [./komodo-cli] M.1 of N.1
broadcast TESTUSDK txid.(13bb4ba78686ae65894c79e67e346e8f8c0bde96dda8d041d4653ce203423b17)
KMD ht.16 <- 10000000f7a5a84d008a6c4107c3bbad442a879355bd7f951e4bf5ac48b8458afa6a1600bbf054d5a9219e8034990f764106c719f9bfc278b1d909be4486ff52d8523ca6
broadcast TESTUSDK txid.(2eaef55baf9895b4a5b45f0450cc8b4b8e6f95563bc4c0d95086b3ff0d4d394a)
KMD ht.17 <- 1100000010da30ab6d70443dc881c8ee85b02869b3520d016fcd076e4a1e67543a3a9c0714d4bad1c68f74d6d65b7e26ed821fc38aed36f03c101d117440e094823fb2fa
broadcast TESTUSDK txid.(eff38402e9669ffe7521ab98368e114e44fa8c5ec7a98d57bf600d6ba1cac45d)
KMD ht.18 <- 1200000018d4169fde5fc716b9ebc44da85fa3cfe5d64adf94d4bee09d97bbbebaaeb80e098c0417881230d51281346f29d2566cd164b7ef0e6a6c08332f969f690e10c9
broadcast TESTUSDK txid.(388c23187083cdc789483d9b8af90c4a4ce3ecaf856785b86f00bf37db900ede)
KMD ht.19 <- 13000000f1fea637bf33149d161bd5a1d20e0ad8911a3710cf941a318b68fa973d4d9403bb5521d6171bcb1d65d6cadff6916e96814b46ae2487d100987820367b702c2f
```

</collapse-text>

## Creating the Peg

We can finally create a Peg that will create `TESTUSDK` coins pegged to USD and backed by `KMD` using the [pegscreate](../../../basic-docs/antara/antara-api/pegs.html#pegscreate)

This method allows us to create a Peg that is backed by more than 1 external coin. To achieve this, we can add more than 1 `bindtxid` to the `pegscreate` command. Each of these Gateways have to prepared properly by binding Tokens, Oracles and running the `oraclefeed` software as previously described in this Tutorial.

For the sake of simplicity, we will simply use 1 Gateway which will tokenize the `KMD` coins.

```bash
./komodo-cli -ac_name=TESTUSDK pegscreate 100000 1 0b5716554e523aa4678112a8ac3d15039e0aae6f4812b9d4c631cc9cfbf48786
```

This method returns a hex value (not shown for brevity), which we now broadcast:

```bash
./komodo-cli -ac_name=TESTUSDK sendrawtransaction insert_hex_value
```

The broadcast returns a transaction id, also called the `pegstxid`. Copy this information into the text editor.

The `pegstxid` is the reference for the Peg we just created. To make sure all the nodes running the `TESTUSDK` chain are aware of the correct Pegs contract, the reader must shutdown the daemons running the Chain once the `pegstxid` is mined. Then all the nodes have to be started with a new parameter called `-earlytxid` added to the launch parameters. Its value must be the `pegstxid`. So, the new launch parameters are:

```bash
./komodod -ac_supply=1000000 -ac_reward=10000 -ac_name=TESTUSDK -ac_cc=2 -ac_import=PEGSCC -ac_end=1 -ac_perc=0 -ac_cbopret=5 -debug=pegscc-2 -debug=importcoin -debug=cctokens -debug=gatewayscc -printtoconsole=1 -earkytxid=<pegstxid>
```

Replace the text `<pegstxid>` with the actual Pegs transaction id (`pegstxid`) we just created.

:::tip Note
The Komodo daemon acceps adding `-earlytxid` to the launch parameters only before the total blocks reach 100. So, be sure to start the mining when required using `setgenerate true 1` and stopping it when construction commands etc., using (`setgenerate false`)
:::

Any new node joining the `TESTUSDK` network must use the new launch parameters with the `-earlytxid` included.

## Test the Setup

We recommend the reader to follow the [user tutorial](./pegs-module-user-tutorial.html) and replace the `USDKTEST` chain in it with the `TESTUSDK` chain to test the system setup from the current tutorial.
