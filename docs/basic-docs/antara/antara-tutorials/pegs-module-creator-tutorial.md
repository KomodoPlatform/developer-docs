# Pegs Module Creator Tutorial

::: tip

The Pegs Module is in the final stages of production.

The following tutorial is currently only compatible with computer-hardware setups that are running Linux OS's Ubuntu/Debian-based distributions.

For questions and assistance, please reach out to the Komodo team using the `#cc-pegs` channel on the [Komodo Discord](https://komodoplatform.com/discord) live-chat server. Thank you.

:::

## Tutorial Overview

This tutorial assists the reader in discovering the process of creating a new Smart Chain with an active stablecoin using the [Pegs Antara Module.](./pegs.html)

#### Tutorial Outline

- Launch a new test Smart Chain (`CREATORUSDK`) to activate the Pegs Module
- Peg the test chain's coins to `USD` and create a pathway for users to back the stablecoin with `KMD`
- Create tokens to represent the `KMD` coins
- Create an oracle, register as a publisher, and subscribe to it
- Create a gateway and bind the previously created token and oracle to it
- Start the `oraclefeed` software to bring the `blockheader` data from the `KMD` chain to the `CREATORUSDK` chain through the oracle
- Create a peg by attaching the gateway to it

Upon completion of this tutorial, the reader may follow the [user tutorial](./pegs-module-user-tutorial.html) and use the Smart Chain created here to discover the possibilities of the Pegs Module.

## Installation

#### Dependencies

Execute the following commands to install the necessary dependencies.

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl clang libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

#### Create a Swap Partition (Optional)

For tutorial users using a VPS with a low amount of RAM, create a swap partition. 

On the VPS, execute the following commands to create a 4GB SWAP file. (If sufficient space is available, consider creating an 8GB swap file instead, as this can facilitate better software performance.)

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

Execute the following commands to build the Komodo daemon.

```bash
git clone https://github.com/Mixa84/komodo
cd komodo
git checkout pegsCC
export CONFIGURE_FLAGS='CPPFLAGS=-DTESTMODE' # Tweaks some settings to make it easy for testing
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
cd src
```

This tutorial requires that the tutorial reader compile the Komodo daemon from source code. For more instructions, please see the [installation section](#installation) .If you have access to two VPS, follow [this guide](../../../basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.html). If you want to launch this Smart Chain in your Personal Computer or using a single VPS, follow [this guide](../../../basic-docs/smart-chains/smart-chain-tutorials/creating-a-smart-chain-on-a-single-node.html) 

#### Obtain a pubkey

Recall also that a user must have a `pubkey` enabled when interacting with an Antara-related Smart Chain. [View this linked material for an explanation.](../../../basic-docs/antara/antara-tutorials/understanding-antara-addresses.html)

## Launch the Test Smart Chain

The command below creates and launches a new Smart Chain. 

The following list explains a few of the Smart Chain customizations that are necessary and desirable for a Smart Chain designed for testing purposes.

  - `-ac_name=CREATORUSDK` — the name of this Smart Chain is set to `CREATORUSDK`
  - `-ac_import=PEGSCC` — the key customization that activated the Pegs Antara Module on the new Smart Chain
  - `-ac_end=1` — sets the mining block reward to zero (after the first block)
  - `-debug` — a debug parameter that instructs the daemon to track various information for console output
  - `-printoconsole` — instructs the daemon to print the information from the `debug` parameter to the console 
  - `-ac_supply=1000000` — the amount of intial coin supply for the chain (an arbitrary amount here that includes enough coin to manage testing purposes of the chain)

Consult the [Antara Customizations](../../../basic-docs/antara/antara-setup/antara-customizations.html) documentation for explanations of the other parameters in the command.

```bash
./komodod -ac_supply=1000000 -ac_reward=10000 -ac_name=CREATORUSDK -ac_cc=2 -ac_import=PEGSCC -ac_end=1 -ac_perc=0 -ac_cbopret=5 -debug=pegscc-2 -debug=importcoin -debug=cctokens -debug=gatewayscc -printtoconsole=1
```

## Create a Token to Represent KMD Coins

To create tokens that are capable of representing `KMD` (although the tokens are not yet tied to actual `KMD`), execute the following command on the test chain.

```bash
./komodo-cli -ac_name=CREATORUSDK tokencreate KMD 100000 "KMD_BTC,BTC_USD,*,1"
```

This creates a total of `100000 * 10^8` tokens named `KMD` on the `CREATORUSDK` chain. Each token is capable of representing a single satoshi of the external coin `KMD`.

All the tokens combined allow up to `100000` `KMD` coins on the `CREATORUSDK` chain.

The description of the token, `"KMD_BTC,BTC_USD,*,1"` specifies the synthetic price to be used by a peg (not yet created). 

`"KMD_BTC,BTC_USD,*,1"` means `(KMD/BTC) * (BTC/USD) * 1`. This simplifies to `KMD/USD`, which provides an exchange price between the two currencies. This provides the necessary information to peg the `CREATORUSDK` stablecoin to `USD` and to back the coin using `KMD`.

The command returns a hex value as a response.

```json
{
  "result": "success",
  "hex": "0100000001c05c55f5183a412750a912579bf5f915a261b68d51b2ce5e2664659e9dcce3010000000049483045022100e4a0fffaf4aa10be58716561a1f2043dfdc2c3a4b595e74031582bac9edcc7690220211a5984f8ab480ff7641073f9dc8622b02ee602228fe27fda788443cd6aadb401ffffffff041027000000000000302ea22c8020432de388aabcb6b4e3326351d1d815cee8be9a8d37b055cd1c0cf8782e5c50c08103120c008203000401cc00a0724e18090000302ea22c80205dcc33b0b3f0573b306ab85ffa9ce8622fbcb81cb6ad8ec00f366935bbf500f78103120c008203000401cc1f0493c2da510000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000426a40f2632102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567074b4d4454455354134b4d445f4254432c4254435f5553442c2a2c3100000000"
}
```

Select the hex value (`0100000001c05c55f5183a412750a...`) and copy it using (CTRL + SHFT + C).

Broadcast this value using [sendrawtransaction.](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction)

```bash
./komodo-cli -ac_name=CREATORUSDK sendrawtransaction insert_hex
```

The value of the response is called the `tokenid`.

```bash
0946d12135cca0757a12931944ff930657f21fd676966c12d66d5750848ea712
```

Copy the `tokenid` into a text editor and keep it available for future use.

Watch the mempool using [getrawmempool](../../../basic-docs/smart-chains/smart-chain-api/blockchain.html#getrawmempool) to verify that the `tokenid` is successfully mined.

```bash
./komodo-cli -ac_name=CREATORUSDK getrawmempool
```

Once the `tokenid` disappears from the mempool the transaction is mined.

Use [tokeninfo](../../../basic-docs/antara/antara-api/tokens.html#tokeninfo) to check that the token is successfully created.

```bash
./komodo-cli -ac_name=CREATORUSDK tokeninfo 0946d12135cca0757a12931944ff930657f21fd676966c12d66d5750848ea712
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

The tutorial reader may now check the balance of the `pubkey` used to launch the daemon using [tokenbalance](../../../basic-docs/antara/antara-api/tokens.html#tokenbalance).

```bash
./komodo-cli -ac_name=CREATORUSDK tokenbalance insert_tokenid insert_pubkey
```

## Create an Oracle

The [Oracles](../../../basic-docs/antara/antara-api/oracles.html#introduction) Module is able to add external data to a blockchain. This modules allows the Pegs module to obtain the information needed regarding user activity and accurate prices.

When creating a new oracle, the name of the oracle is identical to the name of the tokens, `KMD` and the data format starts with `Ihh` (height, blockhash, merkleroot).

Create the oracle using [oraclescreate](../../../basic-docs/antara/antara-api/oracles.html#oraclescreate).

```bash
./komodo-cli -ac_name=CREATORUSDK oraclescreate KMD blockheaders Ihh
```

The response is a hex value.

```json
{
  "hex": "0400008085202f890112a78e8450576dd6126c9676d61ff2570693ff441993127a75a0cc3521d14609020000004847304402206d05f874b04808f5d989325e140e0a618de8081909bc20db24fd70ebfd53fedc02205f88c98f2399119ab680a246ac0613dffabb4a77022cc755b9fca6c96f50c52d01ffffffff0310270000000000002321038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aacffb592c2da510000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000000000001d6a1bec43074b4d4454455354034968680c626c6f636b6865616465727300000000280100000000000000000000000000",
  "result": "success"
}
```

Broadcast the returned hex value using [sendrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction).

```bash
./komodo-cli -ac_name=CREATORUSDK sendrawtransaction insert_hex_data
```

The response is a transaction id, called the `oracleid`.

```bash
ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e
```

Record this value in the text editor.

Execute the `oraclesfund` method to fund the oracle.

```bash
./komodo-cli -ac_name=CREATORUSDK oraclesfund ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f89010e7a96165cbbc6655cf07f2c6ccfd18193406ccaa9956359af1d67d3744668ee01000000494830450221008f3db99deddacc6cf6c39260faac62aa00395a808715923e0301d6063a23618d022044565a478e2fbf316f843ac96c2921f267da71701f51fd0c244aff1aedb00ed101ffffffff031027000000000000302ea22c8020de1ac583c081d079fd4118ec0c29fe975121739d8fba70103e5fb45614913cbe8103120c008203000401ccdf6792c2da510000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000000000004f6a4c4cec460e7a96165cbbc6655cf07f2c6ccfd18193406ccaa9956359af1d67d3744668ee2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567102700000000000000000000290100000000000000000000000000",
  "result": "success"
}
```

</collapse-text>

Send the raw transaction by broadcasting the hex value.

```bash
./komodo-cli -ac_name=CREATORUSDK sendrawtransaction 0400008085202f89010e7a96165cbbc6655cf07f2c6ccfd18193406ccaa9956359af1d67d3744668ee01000000494830450221008f3db99deddacc6cf6c39260faac62aa00395a808715923e0301d6063a23618d022044565a478e2fbf316f843ac96c2921f267da71701f51fd0c244aff1aedb00ed101ffffffff031027000000000000302ea22c8020de1ac583c081d079fd4118ec0c29fe975121739d8fba70103e5fb45614913cbe8103120c008203000401ccdf6792c2da510000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac00000000000000004f6a4c4cec460e7a96165cbbc6655cf07f2c6ccfd18193406ccaa9956359af1d67d3744668ee2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567102700000000000000000000290100000000000000000000000000
```

Response:

<collapse-text hidden title="Response">

```bash
4f87b9769300282ce706eb0bd75d534d7cbbc940b04c1a7131c70e4b35f7c240
```

</collapse-text>

Optionally use the [getrawmempool](../../../basic-docs/smart-chains/smart-chain-api/blockchain.html#getrawmempool) method to ensure that the transaction receives confirmation.

To prepare for the oraclefeed instance, use [oraclesregister](../../../basic-docs/antara/antara-api/oracles.html#oraclesregister) to register as a publisher for the oracle. This command must be executed on a node which can post `KMD` block headers and which can execute withdrawal transactions.

```bash
./komodo-cli -ac_name=CREATORUSDK oraclesregister insert_oracleid data_fee_in_satoshis`
```

This returns a hex value which must be broadcast using [sendrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction). (Not shown for brevity)

```bash
./komodo-cli -ac_name=CREATORUSDK sendrawtransaction insert_hex_value
```

Retrieve the data publisher's `pubkey` using [oraclesinfo](../../../basic-docs/antara/antara-api/oracles.html#oraclesinfo).

```bash
./komodo-cli -ac_name=CREATORUSDK oraclesinfo insert_oracleid
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

The key, `"publisher"`, in the entry, `"registered"`, of the returned json object is the data publisher's `pubkey`, also called the `publisherpubkey`.

Subscribe to the oracle using [oraclessubscribe](../../../basic-docs/antara/antara-api/oracles.html#oraclessubscribe) to receive utxo information for data publishing.

The frequency of data-publishing transactions that can be included in a block is equal to the number of active subscriptions committed to the oracle. Therefore, there must be at least one subscription for the oracle to allow publishing.

Subscribe to the oracle using the following command.

```bash
./komodo-cli -ac_name=CREATORUSDK oraclessubscribe insert_oracleid insert_publisherpubkey insert_amount_of_funds_to_add
```

This returns a hex value that must be broadcast using <b>sendrawtransaction</b> (not shown for brevity).

```bash
./komodo-cli -ac_name=CREATORUSDK sendrawtransaction insert_hex_value
```

In this tutorial example, the tutorial reader needs to be able to publish data more than once per block. Therefore, execute the <b>oraclessubscribe</b> and <b>sendrawtransaction</b> methods several times and with the same amount. 

Verify the oracle information to ensure it is properly established.

```bash
./komodo-cli -ac_name=CREATORUSDK oraclesinfo insert_oracleid
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

Create a gateway and bind the data from this tutorial to the gateway using the [gatewaysbind](../../../basic-docs/antara/antara-api/gateways.html#gatewaysbind) method.

This method requires that tutorial reader decide how many total gateway signatures are desired (represented by the value `N`), and how many signatures are required to withdraw funds (represented by the value `M`).

For this tutorial, the reader may set both `N` and `M` equal to `1` for simplicity.

The <b>gatewaysbind</b> command requires that the user indicate the `pubtype`, `p2shtype`, and `wiftype` values for the chosen coin.  For Smart Chains, these values are `60`, `85` and `188` respectively.

```bash
./komodo-cli -ac_name=CREATORUSDK gatewaysbind insert_tokenid insert_oracleid KMD insert_tokensupply 1 1 insert_gatewayspubkey 60 85 188
```

This method returns a hex value that must be broadcast using <b>sendrawtransaction</b> (not shown for brevity).

```bash
./komodo-cli -ac_name=CREATORUSDK sendrawtransaction insert_hex_value
```

The broadcast returns a transaction id, also called the `bindtxid`. Copy this information to the text editor.

Assuming everything is properly created and executed, review the new gateway using [gatewaysinfo](../../../basic-docs/antara/antara-api/gateways.html#gatewaysinfo).

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

Use the returned information to verify that the `tokenid` and `oracleid` match the information copied from this tutorial to the text editor.

## Start the oraclefeed software

The `oraclefeed` software instance automates the transfer of merkleroot data from the `KMD` chain to the oracle on the `CREATORUSDK` chain.

Change into the directory where `komodod` and `komodo-cli` are compiled.

```bash
cd  ~/komodo/src/
```

Compile the `oraclefeed` software instance.

```bash
gcc cc/dapps/oraclefeed.c -lm -o oraclefeed
```

Initiate the instance.

```bash
./oraclefeed CREATORUSDK insert_oracleid insert_mypubkey Ihh insert_bindtxid "cli command to access te external coin(KMD)"
```

Inserting the values.

```bash
./oraclefeed CREATORUSDK ee684674d3671daf596395a9ca6c409381d1cf6c2c7ff05c65c6bb5c16967a0e 02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567 Ihh 0b5716554e523aa4678112a8ac3d15039e0aae6f4812b9d4c631cc9cfbf48786 "./komodo-cli"
```

<collapse-text hidden title="Response">

```bash
BTC/USD 8469.7417
Powered by CoinDesk (https://www.coindesk.com/price/) 8469.74170000
must supply reference coin
set refcoin RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa <- KMD [./komodo-cli] M.1 of N.1
broadcast CREATORUSDK txid.(13bb4ba78686ae65894c79e67e346e8f8c0bde96dda8d041d4653ce203423b17)
KMD ht.16 <- 10000000f7a5a84d008a6c4107c3bbad442a879355bd7f951e4bf5ac48b8458afa6a1600bbf054d5a9219e8034990f764106c719f9bfc278b1d909be4486ff52d8523ca6
broadcast CREATORUSDK txid.(2eaef55baf9895b4a5b45f0450cc8b4b8e6f95563bc4c0d95086b3ff0d4d394a)
KMD ht.17 <- 1100000010da30ab6d70443dc881c8ee85b02869b3520d016fcd076e4a1e67543a3a9c0714d4bad1c68f74d6d65b7e26ed821fc38aed36f03c101d117440e094823fb2fa
broadcast CREATORUSDK txid.(eff38402e9669ffe7521ab98368e114e44fa8c5ec7a98d57bf600d6ba1cac45d)
KMD ht.18 <- 1200000018d4169fde5fc716b9ebc44da85fa3cfe5d64adf94d4bee09d97bbbebaaeb80e098c0417881230d51281346f29d2566cd164b7ef0e6a6c08332f969f690e10c9
broadcast CREATORUSDK txid.(388c23187083cdc789483d9b8af90c4a4ce3ecaf856785b86f00bf37db900ede)
KMD ht.19 <- 13000000f1fea637bf33149d161bd5a1d20e0ad8911a3710cf941a318b68fa973d4d9403bb5521d6171bcb1d65d6cadff6916e96814b46ae2487d100987820367b702c2f
```

</collapse-text>

## Create the Peg

Create a peg that will create `CREATORUSDK` coins pegged to USD and backed by `KMD` using the [pegscreate](../../../basic-docs/antara/antara-api/pegs.html#pegscreate) method.

The <b>pegscreate</b> method is capable of creating a peg that is backed by more than one external coin. This is accomplished by adding more than one `bindtxid` to the `pegscreate` command.

Each associated gateway requires a unique token, oracle, and a running instance of the `oraclefeed` software, as previously described in this tutorial.

For the sake of simplicity, this tutorial utilizes only one gateway (bound to `KMD` coins).

```bash
./komodo-cli -ac_name=CREATORUSDK pegscreate 100000 1 0b5716554e523aa4678112a8ac3d15039e0aae6f4812b9d4c631cc9cfbf48786
```

This method returns a hex value that must be broadcast using <b>sendrawtransaction</b> (not shown for brevity).

```bash
./komodo-cli -ac_name=CREATORUSDK sendrawtransaction insert_hex_value
```

The broadcast returns a transaction id, also called the `pegstxid`. Copy this information to the text editor.

The `pegstxid` is the reference to the peg created in this tutorial. To make sure all the nodes running the `CREATORUSDK` chain are aware of the correct pegs contract, after the `pegstxid` transaction is mined the reader must shutdown any daemons running the chain. The tutorial reader then restarts the nodes, but with a slightly modified version of the launch parameters. The parameters now include `-earlytxid`, and this parameter is set equal to the value of `pegstxid`.

In the following command, replace the text `<pegstxid>` with the `pegstxid` from this tutorial.

```bash
./komodod -ac_supply=1000000 -ac_reward=10000 -ac_name=CREATORUSDK -ac_cc=2 -ac_import=PEGSCC -ac_end=1 -ac_perc=0 -ac_cbopret=5 -debug=pegscc-2 -debug=importcoin -debug=cctokens -debug=gatewayscc -printtoconsole=1 -earkytxid=<pegstxid>
```


:::tip Note

For any Smart Chain, the `-earlytxid` must be added to the launch parameters before the chain reaches a total block height of `100`. The tutorial reader may control the pace of mining on a Smart Chain with the commands `./komodo-cli setgenerate true 1` (starting) and `./komodo-cli setgenerate false` (stopping).

:::

Any new node joining the `CREATORUSDK` network must use the new launch parameters with the `-earlytxid` included.

## Test the Setup

Follow the [Pegs Module Tutorial - User](./pegs-module-user-tutorial.html) documentation to continue learning about the Pegs Antara Module.
