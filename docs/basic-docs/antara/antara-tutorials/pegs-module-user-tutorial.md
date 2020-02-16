# Pegs Module User Tutorial

::: tip

The Pegs Module is in the final stages of production.

The following tutorial is currently only compatible with computer-hardware setups that are running Linux OS's Ubuntu/Debian-based distributions.

For questions and assistance, please reach out to the Komodo team using the `#cc-pegs` channel of the [Komodo Discord](https://komodoplatform.com/discord) live-chat server. Thank you.

:::

## Tutorial Overview

This tutorial uses the `USDKTEST` test and development Smart Chain to introduce the process and workflow of a user of the [Pegs Antara Module.](../antara-api/pegs.html)

#### Tutorial Outline

- Connect to the test Smart Chain `USDKTEST`
- Deposit `KMD` coins (on the `KMD` Smart Chain) in the address associated with the `USDKTEST` Gateways Module
- Claim tokenized `KMD` on the `USDKTEST` chain
- Lock tokenized `KMD` in the Pegs Module and receive `USDK` coins
- Redeem tokenized `KMD` using the `pegsredeem` method
- Return tokenized `KMD` to the Gateway to receive `KMD` coins on the `KMD` Smart Chain

## Installation

::: warning

The following installation procedure creates a version of the Komodo software daemon that should not be used for any purpose other than testing. Several of the customizations active on this particular version of the daemon are intended for testing purposes only.

:::

### Dependencies

Execute the following commands in the Unix terminal.

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
sudo sysctl vm.swappiness=10 # This setting persists until the next reboot of the VPS. To instead set this value automatically at restart, execute the following lines to edit the /etc/sysctl.conf file:
sudo nano /etc/sysctl.conf
vm.swappiness=10
```

### Build the Komodo daemon

```bash
git clone https://github.com/Mixa84/komodo
cd komodo
git checkout pegsCC
export CONFIGURE_FLAGS='CPPFLAGS=-DTESTMODE' # Tweaks some settings to make it easy for testing
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
cd src
```

## Connect and Sync to USDKTEST and KMD

Navigate to the source directory.

```bash
cd ~/komodo/src
```

Execute the following launch parameters.

In the following command, replace the text, `<user pubkey>`, with the appropriate pubkey. [To learn more about setting a proper pubkey, please read this linked article from the Komodo documentation.](../../../basic-docs/antara/antara-tutorials/understanding-antara-addresses.html)

```bash
./komodod -ac_supply=1000000 -ac_reward=10000 -ac_name=USDKTEST -ac_cc=2 -ac_import=PEGSCC -ac_end=1 -ac_perc=0 -ac_cbopret=5 -debug=pegscc-2 -debug=importcoin -debug=cctokens -debug=gatewayscc -printtoconsole=1 -addnode=116.203.17.140 -addnode=116.203.17.141 -earlytxid=a9539ec8db34ee44ff213cda59f412a02795821cf05844b0bc184660711371f7 -pubkey=<user pubkey> &
```

Import the private key corresponding to the pubkey used to start the `USDKTEST` chain. Note the text `<user privkey>` that must be replaced in the following command.

```bash
./komodo-cli -ac_name=USDKTEST importprivkey <user privkey>
```

Allow the chain to sync.

Check the sync status using the [getinfo](../../../basic-docs/smart-chains/smart-chain-api/control.html#getinfo) method. When the keys `blocks` and `longestchain` have the same value, the chain is synced. Once the chain is synced, begin mining the `USDKTEST` chain.

Mine until the balance returned from the [getinfo](../../../basic-docs/smart-chains/smart-chain-api/control.html#getinfo) method is at least `30k` satoshis. This requires mining approximately `3` blocks.

```bash
./komodo-cli -ac_name=USDKTEST setgenerate true 1
```

#### Sync the KMD Smart Chain

In a new terminal, change into the Komodo source directory and execute the following command.

```bash
./komodod &
```

Use the <b>getinfo</b> method, as before, while waiting until the blockchain syncs.

```bash
./komodo-cli getinfo
```

## Start Testing

::: tip Key Information for this Tutorial

The following key information is used throughout this tutorial. Refer back to this content as often as needed.

- KMD token (tokenid): 1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1
- Oracle (oracletxid): a6a59fbdc0ba8b138a4d14ff334a533f0358144091aa999ef45fd7498ab4189a
- Gateways (bindtxid): 50384e7668bd6908d8e0b67f1450c56f017186d802b1065c3258302a30b5adb2
- Faucet: 7bc2dafc4d71c7e178b3a2a89e7ddc894cb14dbeff5937fa869915adf1af5108
- Pegs (pegstxid): a9539ec8db34ee44ff213cda59f412a02795821cf05844b0bc184660711371f7

:::

::: tip

The types of transactions performed in this tutorial require at least one confirmation from the network before the user should proceed to the next step in the outline.

When performing cross-chain operations, the user may need to wait for two or three confirmations on the source chain before any related activity will appear on the destination chain.

:::

### Deposit KMD in the Associated USDKTEST Gateways Address

Execute the following command to discover the address associated with the Gateways Module.

```bash
./komodo-cli -ac_name=USDKTEST gatewaysinfo 50384e7668bd6908d8e0b67f1450c56f017186d802b1065c3258302a30b5adb2
```

Response:

```json
{
  "result": "success",
  "name": "Gateways",
  "M": 2,
  "N": 2,
  "pubkeys": [
    "038814d60d99a594b4b1092247df4384bc21a50733d3acd0e29499e5f03737374d",
    "023a447741707e95bc889fbbb08295d402332217075752bd1bb3999b092e4753ab"
  ],
  "coin": "KMD",
  "oracletxid": "a6a59fbdc0ba8b138a4d14ff334a533f0358144091aa999ef45fd7498ab4189a",
  "taddr": 0,
  "prefix": 60,
  "prefix2": 85,
  "wiftype": 188,
  "deposit": "bPFkXSYYYDWBLbp8AxfY5KKGgxt5RPfN9p",
  "tokenid": "1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1",
  "totalsupply": "100000.00000000",
  "remaining": "99999.86000000",
  "issued": "0.14000000"
}
```

The `deposit` address is `bPFkXSYYYDWBLbp8AxfY5KKGgxt5RPfN9p`.

Go to the `KMD` chain and execute one transaction that sends a few `KMD` coins to two addresses.

The first address is the address above, and this should receive the majority of the `KMD` sent in this transaction.

The second address is the address corresponding to the tutorial user's `pubkey` used to launch the `USDKTEST` Smart Chain. This second address requires only a small amount of `KMD` (a few satoshis); this part of the transaction creates a marker that indicates to the Gateways Module the owner of the `KMD` funds.

The [z_sendmany](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#z-sendmany) allows the user to send coins to two addresses in a single address, as follows.

```bash
./komodo-cli z_sendmany "FROM_ADDRESS" '[{"address":"ADDRESS_CORRESPONDING_TO_USER_PUBLIC_KEY","amount":SMALL_MARKER_AMOUNT},{"address":"GATEWAYS_MULTISIG_ADDRESS","amount":MAIN_AMOUNT_TO_DEPOSIT}]'
```

Observe the following example.

```bash
./komodo-cli z_sendmany "RSVF6SecrtU1ppBGPm3SyNw2D8nSpFcA57" '[{"address":"RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb","amount":0.0001},{"address":"bPFkXSYYYDWBLbp8AxfY5KKGgxt5RPfN9p","amount":0.01}]'
```

#### Obtain the txid of the Deposit Transaction

The [z_sendmany](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#z-sendmany) returns an operation id, `opid`. Use this `opid` to obtain the `txid` of the transaction.

(Alternatively, check the website [explorer](https://kmdexplorer.io/) for the `txid` by searching for any of the addresses associated with the transaction and searching for the most recent transaction.)

Use the `opid` as follows to obtain the `txid` of the transaction.

```bash
./komodo-cli z_getoperationstatus '["opid-4b661588-9924-47ba-bbba-4884eff36395"]'
```

Output:

```json
[
  {
    "id": "opid-4b661588-9924-47ba-bbba-4884eff36395",
    "status": "success",
    "creation_time": 1573737131,
    "result": {
      "txid": "5569e66859a8269b3b7a512ac66a42b1a4d375bb404fc73abaf2faf3080ec4af"
    },
    "execution_secs": 0.009735896000000001,
    "method": "z_sendmany",
    "params": {
      "fromaddress": "RSVF6SecrtU1ppBGPm3SyNw2D8nSpFcA57",
      "amounts": [
        {
          "address": "RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb",
          "amount": 0.0001
        },
        {
          "address": "bPFkXSYYYDWBLbp8AxfY5KKGgxt5RPfN9p",
          "amount": 0.01
        }
      ],
      "minconf": 1,
      "fee": 0.0001
    }
  }
]
```

## Wait for the Deposit Transaction to Reach the Oracle

#### Wait for the Deposit Transaction to be Mined

Before the transaction can reach the Oracle, a miner on the `KMD` chain must mine the transaction.

Use the [getrawmempool](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#getrawmempool) method to obtain a list of transactions waiting to be mined and search for the `txid` of the deposit transaction. If the `txid` is not there, a miner has mined the transaction.

```bash
./komodo-cli getrawmempool
```

Once the transaction is mined, use the [getrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#getrawtransaction) method to find the block height at which the transaction was mined.

In the following command, replace the text `<deposit txid here>` with the deposit `txid` retrieved earlier.

```bash
./komodo-cli getrawtransaction "<deposit txid here>" 1
```

From the response, take note of the value associated with the `height` key. The `txid` transaction was mined at this height.

#### Observe the txid Reach the Oracle

Check whether the block header associated with the `KMD` block of height `height` has been submitted to the Oracle on the `USDKTEST` chain.

Find the pubkey of the publisher associated with the Token, Gateway, and Peg using the [tokeninfo](../../../basic-docs/antara/antara-api/tokens.html#tokeninfo) method.

```bash
./komodo-cli -ac_name=USDKTEST tokeninfo 1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1
```

Take note of the value of the `owner` key in the response. This is the pubkey of the publisher.

Use the [oraclesinfo](../../../basic-docs/antara/antara-api/oracles.html#oraclesinfo) method to find the baton address for this publiser.

```bash
./komodo-cli -ac_name=USDKTEST oraclesinfo a6a59fbdc0ba8b138a4d14ff334a533f0358144091aa999ef45fd7498ab4189a
```

Among the registered publishers in the response, notice that there is a publisher whose pubkey matches the one we took note from the `tokeninfo` call. The value of the key named `baton` is needed to get the past samples published by this publisher.

In the following command, replace the text `<baton here>` with the `baton` from the previous step.

```bash
./komodo-cli -ac_name=USDKTEST oraclessamples a6a59fbdc0ba8b138a4d14ff334a533f0358144091aa999ef45fd7498ab4189a <baton here> 5
```

This returns the `5` latest data points published by the publisher associated with the Peg system.

Note the block height in the returned data points. Wait until the highest block height is `>=` greater than or equal to the block height of the deposit transaction discovered earlier in the tutorial. (This is the process of transferring information between the `KMD` and `USDKTEST` chains.)

### Inform the Gateways Module and Claim the Tokenized KMD

Use the [gatewaysdeposit](../../../basic-docs/antara/antara-api/gateways.html#gatewaysdeposit) method to inform the Gateways Module of the deposit.

Structure of the command to be executed:

`gatewaysdeposit bindtxid height coin cointxid claimvout deposithex proof destpub amount`

#### Details

- `gatewaysdeposit` — The name of the method, submitted as-is
- `bindtxid` — The Gateway's `bindtxid` (see above)
- `height` — The `height` of the block in which the deposit `txid` was confirmed in the earlier step
- `coin` — Ticker of the `coin` deposited (`KMD` in this example)
- `cointxid` — `txid` of the deposit
- `claimvout` — The marker utxo's vout number in the external deposit transaction; this value is always `0` when the `z_sendmany` method is used, as shown in this tutorial
- `deposithex` — The hex value from `gettransaction` call for the deposited `txid` (the method for retrieving this value is shown in the following section)
- `proof` — The `proof` value returned from the `gettxoutproof` method using the deposit `txid` (the method for retrieving this value is shown in the following section)
- `destpub` — The user's `pubkey` used to launch the `USDKTEST` Smart Chain
- `amount` — The `amount` of coin (`KMD`) deposited

The following commands retrieve the missing information.

#### deposithex

The following command returns the `deposithex` value.

```bash
./komodo-cli getrawtransaction 5569e66859a8269b3b7a512ac66a42b1a4d375bb404fc73abaf2faf3080ec4af
```

Response:

```
0400008085202f89010cacb0895bbd5cbbe12a13875c06dac59ad6154780df59d86b28d1da0d64c3c5000000006b483045022100cabf2fc63cebf2eecb186e92053da1d4cebf984980ca645ac050b1fb49e0fc43022070f59307d8f442c295dea500d93a4545a650f1b80d06dab9154562af7c3a28c1012102decc2e49c24ca9f06b96665e8e39836ea1d8c73671166fa6ee917b4bcb307b44ffffffff0310270000000000001976a9144726f2838fc4d6ac66615e10604e18926e9b556e88ac40420f000000000017a9147374f811b053e81a4b4e6e282a2421aaf170afaa8798db2d36000000001976a91408ba4152fe80ffc33f805b166ec9c03c288109b488ac6f52cd5d87b118000000000000000000000000
```

#### proof

Use the [gettxoutproof](../../../basic-docs/smart-chains/smart-chain-api/blockchain.html#gettxoutproof) method with the deposit `txid`. This returns the `proof` as a hex value.

```bash
./komodo-cli gettxoutproof '["5569e66859a8269b3b7a512ac66a42b1a4d375bb404fc73abaf2faf3080ec4af"]'
```

Response:

```
0400000012a703d96b522f36fe13711c96de92b3f17bdbd41eda1a6753e2cd22924c1b0e47dd0fb69db925741977975a5803d8c885c72651b5c0427685e20e16cba73a43a2d8a734eb73a4dc734072dbfd12406f1e7121bfe0e3d6c10922495c44e5cc1cba52cd5dddaf001dffef8831000000000000b22a0000000000000200000000000000000000000000fd40050029a91e2967f03d92e838d3bf73067ed2431bde7f23432431f5d41ef6bd4245f0216b3b9a389d3f8c0813f27547948aec070a0302892468513f07653a83ac3a8c9a373cf12a4ddcb473f92d350417081a7c3696027f82781522fd39ac95449a24bfebf30ae39c328913e777ddca29a3d5b6b15374e1b84e09c9d2af243404e800ed03c3ec32dee990fa10d2b61d43db9987760fb169841e6cc985c6d651a4be3cd9f60cded6232e03f610267e1ed8873a5580c40c07353b0440398032251401ad3063d117d1ba83e674782f65e6d7b525691637434d0c0a0cd758c26b8be9fce02afdc81b6d4a2733432193242135d58d9762874d2d26ac85fbe43d0d324b512ac8012756e68100ce76b9b8bb761053501ea99224b88b66f8c86f236c23d8e0b9ca1ad9000c0e5fbf34a583c245fd9942e94c547345a62731a61a17bf895d2c17dcbb647ce2b7f3e29e5264c01e6d7300d7b9c9881c08e7d5ec71e3adb47de2061513094f13d654d22c502f596225b22ff05d457e479e9895ad05eecb63f71697639b5510e79a9973b5d8561144e41773a8d3e40eb10d5fc352db2e31ed555a8beb8a830aea6e654414a9853dfab20d37300fb0a776d5ccef137cd379ce98204728d7f2117111a59ead081894330faa17677889216b4c3d54c8a97f189296465ebcb739f61b8f53cf8ad6ced60d924b78d0677c3d1d16ab0fa1e0b94c6176d5f12617f6de5e665a99dbd8e84814f53d3fa0ccc383afa5d1cd6ac664bd27c44f0f4620344aacd78b8f0e96b8c853a0ceeafe35d6b338b5338e959b26a710bb3cdc9347fae575da0fae720eb312416cee371cf827cf7875edeb71da95bf07d864a812ffa8c4ddec2b87cf60f3bd2f636306b040976d0f1591a401fecdc304bce3754bd8d8fea5649e93da601995138c8c0bc69d44bc96ad786dc30e5ea13698c900c553d2c01972ad1ffce071a2980271c3525e932508f1f955bca7dee3e94997f8f6c92e4ef1447a3c47053563940ea4b88987fdb0ce0a7ddd8ea2bf375922297947ea8bb18985f6bbe3eab2d03f12f6687f911b12c7ce2b9050995523f0f23a03984f15cfc6785bd92af3ad60daac650ff3a718183967665f92b17eaf5d1459d2eb8255b94b0bd1f279aa18a04a87339941ee4cf11f31c357f31b9ff54858fb43085ebfc7b9868001bbbcd126dfcfeff478063fccde8736c15d1bb16108f1d710aad0694dffb181cc4e57f2b5d00276c18c19ccbacd7096be13a8fdf2c280cd237cbc46466c2e33cd745b465c60c1fdae6399b326ccf9e6164ff24021fce569dc8b6df8dfd26406906f1b25656f37a10626f153ff3239a8cfd35664155cb92ac54205ae517731afa77a86627177435cf5cb4371ab3a35fc99d0fc4731db98fb2ac959dc3757053ff6c41e5db1dc6da501456734a6155287cdc50038f2c43b74acfb683436510e0c6b3e1a0acfbf00663978d88ede7802b5703b05107dfb90a05ae78c9bb62375c4c6e591d9b7a35d2430066e8f528af96c32c2645566305387023dcd4a091ec0ec1bd4a454cc87f17426a65c1543759a7b503129aab79ed9e4b6efcb951da7f00c42d31cda7e4511f164e037762a63ebd2c617195f455687197bdc9f51cc26126ae291d3b0a4578bb8d6d386ac65b5859403bfde32cb619bb7f63f9c100f6b29a771837e3e1f06c83eccd5c2b3ca4d5af1ee5fc42fa4de6aa778402cf72a55e64cd2c5768862f2a65ec24a63da1946092e5bc5789a91cfccd4a553a3eeff0620f3ba53622e1513b6d59babb509a21516a6e9bb5657a6c4ff9a9423a65d555b9236caa510879d3ce809572db65cefa31783a5b5fcf0e6b9e44662536877f96e5e7bfce6593f912611095e905dcb5ef443b626e585a9a056e1d70900000005752526306830c6259c1659fa8ca3bfd85fa782c17efd04ec51cf7b13cc93de02afc40e08f3faf2ba3ac74f40bb75d3a4b1426ac62a517a3b9b26a85968e66955227fdec6d08be9fa88128f0d3c0681a5ba271ae5e27cfa60daa95e938c02f80da2499fa7619612a9acc3398f993475d4b981579f881f39adc29d1beb976be1c02e4e1bb76d33a81fa5f9065c8945a6a7aa2ceed88276ea9723c80bbb314ef89f023700
```

#### Call the gatewaysdeposit Method

Execute the [gatewaysdeposit](../../../basic-docs/antara/antara-api/gateways.html#gatewaysdeposit) method using the acquired information. Observe the following example as necessary.

```bash
./komodo-cli -ac_name=USDKTEST gatewaysdeposit 50384e7668bd6908d8e0b67f1450c56f017186d802b1065c3258302a30b5adb2 1618112 KMD 5569e66859a8269b3b7a512ac66a42b1a4d375bb404fc73abaf2faf3080ec4af 0 0400008085202f89010cacb0895bbd5cbbe12a13875c06dac59ad6154780df59d86b28d1da0d64c3c5000000006b483045022100cabf2fc63cebf2eecb186e92053da1d4cebf984980ca645ac050b1fb49e0fc43022070f59307d8f442c295dea500d93a4545a650f1b80d06dab9154562af7c3a28c1012102decc2e49c24ca9f06b96665e8e39836ea1d8c73671166fa6ee917b4bcb307b44ffffffff0310270000000000001976a9144726f2838fc4d6ac66615e10604e18926e9b556e88ac40420f000000000017a9147374f811b053e81a4b4e6e282a2421aaf170afaa8798db2d36000000001976a91408ba4152fe80ffc33f805b166ec9c03c288109b488ac6f52cd5d87b118000000000000000000000000 0400000012a703d96b522f36fe13711c96de92b3f17bdbd41eda1a6753e2cd22924c1b0e47dd0fb69db925741977975a5803d8c885c72651b5c0427685e20e16cba73a43a2d8a734eb73a4dc734072dbfd12406f1e7121bfe0e3d6c10922495c44e5cc1cba52cd5dddaf001dffef8831000000000000b22a0000000000000200000000000000000000000000fd40050029a91e2967f03d92e838d3bf73067ed2431bde7f23432431f5d41ef6bd4245f0216b3b9a389d3f8c0813f27547948aec070a0302892468513f07653a83ac3a8c9a373cf12a4ddcb473f92d350417081a7c3696027f82781522fd39ac95449a24bfebf30ae39c328913e777ddca29a3d5b6b15374e1b84e09c9d2af243404e800ed03c3ec32dee990fa10d2b61d43db9987760fb169841e6cc985c6d651a4be3cd9f60cded6232e03f610267e1ed8873a5580c40c07353b0440398032251401ad3063d117d1ba83e674782f65e6d7b525691637434d0c0a0cd758c26b8be9fce02afdc81b6d4a2733432193242135d58d9762874d2d26ac85fbe43d0d324b512ac8012756e68100ce76b9b8bb761053501ea99224b88b66f8c86f236c23d8e0b9ca1ad9000c0e5fbf34a583c245fd9942e94c547345a62731a61a17bf895d2c17dcbb647ce2b7f3e29e5264c01e6d7300d7b9c9881c08e7d5ec71e3adb47de2061513094f13d654d22c502f596225b22ff05d457e479e9895ad05eecb63f71697639b5510e79a9973b5d8561144e41773a8d3e40eb10d5fc352db2e31ed555a8beb8a830aea6e654414a9853dfab20d37300fb0a776d5ccef137cd379ce98204728d7f2117111a59ead081894330faa17677889216b4c3d54c8a97f189296465ebcb739f61b8f53cf8ad6ced60d924b78d0677c3d1d16ab0fa1e0b94c6176d5f12617f6de5e665a99dbd8e84814f53d3fa0ccc383afa5d1cd6ac664bd27c44f0f4620344aacd78b8f0e96b8c853a0ceeafe35d6b338b5338e959b26a710bb3cdc9347fae575da0fae720eb312416cee371cf827cf7875edeb71da95bf07d864a812ffa8c4ddec2b87cf60f3bd2f636306b040976d0f1591a401fecdc304bce3754bd8d8fea5649e93da601995138c8c0bc69d44bc96ad786dc30e5ea13698c900c553d2c01972ad1ffce071a2980271c3525e932508f1f955bca7dee3e94997f8f6c92e4ef1447a3c47053563940ea4b88987fdb0ce0a7ddd8ea2bf375922297947ea8bb18985f6bbe3eab2d03f12f6687f911b12c7ce2b9050995523f0f23a03984f15cfc6785bd92af3ad60daac650ff3a718183967665f92b17eaf5d1459d2eb8255b94b0bd1f279aa18a04a87339941ee4cf11f31c357f31b9ff54858fb43085ebfc7b9868001bbbcd126dfcfeff478063fccde8736c15d1bb16108f1d710aad0694dffb181cc4e57f2b5d00276c18c19ccbacd7096be13a8fdf2c280cd237cbc46466c2e33cd745b465c60c1fdae6399b326ccf9e6164ff24021fce569dc8b6df8dfd26406906f1b25656f37a10626f153ff3239a8cfd35664155cb92ac54205ae517731afa77a86627177435cf5cb4371ab3a35fc99d0fc4731db98fb2ac959dc3757053ff6c41e5db1dc6da501456734a6155287cdc50038f2c43b74acfb683436510e0c6b3e1a0acfbf00663978d88ede7802b5703b05107dfb90a05ae78c9bb62375c4c6e591d9b7a35d2430066e8f528af96c32c2645566305387023dcd4a091ec0ec1bd4a454cc87f17426a65c1543759a7b503129aab79ed9e4b6efcb951da7f00c42d31cda7e4511f164e037762a63ebd2c617195f455687197bdc9f51cc26126ae291d3b0a4578bb8d6d386ac65b5859403bfde32cb619bb7f63f9c100f6b29a771837e3e1f06c83eccd5c2b3ca4d5af1ee5fc42fa4de6aa778402cf72a55e64cd2c5768862f2a65ec24a63da1946092e5bc5789a91cfccd4a553a3eeff0620f3ba53622e1513b6d59babb509a21516a6e9bb5657a6c4ff9a9423a65d555b9236caa510879d3ce809572db65cefa31783a5b5fcf0e6b9e44662536877f96e5e7bfce6593f912611095e905dcb5ef443b626e585a9a056e1d70900000005752526306830c6259c1659fa8ca3bfd85fa782c17efd04ec51cf7b13cc93de02afc40e08f3faf2ba3ac74f40bb75d3a4b1426ac62a517a3b9b26a85968e66955227fdec6d08be9fa88128f0d3c0681a5ba271ae5e27cfa60daa95e938c02f80da2499fa7619612a9acc3398f993475d4b981579f881f39adc29d1beb976be1c02e4e1bb76d33a81fa5f9065c8945a6a7aa2ceed88276ea9723c80bbb314ef89f023700 0217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06 0.01
```

This method returns a response that has a hex value that must be broadcast.

Response:

```json
{
  "hex": "0400008085202f890201cbaa60fc93f3e7005f6622999c4abb7258931c3869a6004282014e229358250000000049483045022100f75b4b3dd2a3cac01d389e2957f7337889129f31453a3bf67aa3a6b807417cf0022076ccbb1fd65a6606a2b1e8a816e90edd66d17e6e336755043ab109a1d6cc07f901ffffffff001f6f50578b79a46d6285d9b3c6668104bc1101b7763a33a5e0784b2933fbd7000000004847304402203a76e7c860454b47d653fe9c306a5c53c3b5bda3c68d3c58af89f3754c1d91f3022033c144d67703cd0a1313b31d241bba3eb925200806783cd2557ec18d4669401501ffffffff031027000000000000302ea22c80207f6d7586423d9d8f716988f94728224df39bb0c98bb75655d22a778aea922a208103120c008203000401cc1027000000000000232102afc40e08f3faf2ba3ac74f40bb75d3a4b1426ac62a517a3b9b26a85968e66955ac0000000000000000fd67096a4d6309f144034b4d44b2adb5302a3058325c06b102d88671016fc550147fb6e0d80869bd68764e38500121023a447741707e95bc889fbbb08295d402332217075752bd1bb3999b092e4753ab01524571b97a2bf1b546379e59479430ca188f274215b411e90d2cd51295b12b98c0b01800afc40e08f3faf2ba3ac74f40bb75d3a4b1426ac62a517a3b9b26a85968e6695500000000fd2a023034303030303830383532303266383930313063616362303839356262643563626265313261313338373563303664616335396164363135343738306466353964383662323864316461306436346333633530303030303030303662343833303435303232313030636162663266633633636562663265656362313836653932303533646131643463656266393834393830636136343561633035306231666234396530666334333032323037306635393330376438663434326332393564656135303064393361343534356136353066316238306430366461623931353435363261663763336132386331303132313032646563633265343963323463613966303662393636363565386533393833366561316438633733363731313636666136656539313762346263623330376234346666666666666666303331303237303030303030303030303030313937366139313434373236663238333866633464366163363636313565313036303465313839323665396235353665383861633430343230663030303030303030303031376139313437333734663831316230353365383161346234653665323832613234323161616631373061666161383739386462326433363030303030303030313937366139313430386261343135326665383066666333336638303562313636656339633033633238383130396234383861633666353263643564383762313138303030303030303030303030303030303030303030303030fd77060400000012a703d96b522f36fe13711c96de92b3f17bdbd41eda1a6753e2cd22924c1b0e47dd0fb69db925741977975a5803d8c885c72651b5c0427685e20e16cba73a43a2d8a734eb73a4dc734072dbfd12406f1e7121bfe0e3d6c10922495c44e5cc1cba52cd5dddaf001dffef8831000000000000b22a0000000000000200000000000000000000000000fd40050029a91e2967f03d92e838d3bf73067ed2431bde7f23432431f5d41ef6bd4245f0216b3b9a389d3f8c0813f27547948aec070a0302892468513f07653a83ac3a8c9a373cf12a4ddcb473f92d350417081a7c3696027f82781522fd39ac95449a24bfebf30ae39c328913e777ddca29a3d5b6b15374e1b84e09c9d2af243404e800ed03c3ec32dee990fa10d2b61d43db9987760fb169841e6cc985c6d651a4be3cd9f60cded6232e03f610267e1ed8873a5580c40c07353b0440398032251401ad3063d117d1ba83e674782f65e6d7b525691637434d0c0a0cd758c26b8be9fce02afdc81b6d4a2733432193242135d58d9762874d2d26ac85fbe43d0d324b512ac8012756e68100ce76b9b8bb761053501ea99224b88b66f8c86f236c23d8e0b9ca1ad9000c0e5fbf34a583c245fd9942e94c547345a62731a61a17bf895d2c17dcbb647ce2b7f3e29e5264c01e6d7300d7b9c9881c08e7d5ec71e3adb47de2061513094f13d654d22c502f596225b22ff05d457e479e9895ad05eecb63f71697639b5510e79a9973b5d8561144e41773a8d3e40eb10d5fc352db2e31ed555a8beb8a830aea6e654414a9853dfab20d37300fb0a776d5ccef137cd379ce98204728d7f2117111a59ead081894330faa17677889216b4c3d54c8a97f189296465ebcb739f61b8f53cf8ad6ced60d924b78d0677c3d1d16ab0fa1e0b94c6176d5f12617f6de5e665a99dbd8e84814f53d3fa0ccc383afa5d1cd6ac664bd27c44f0f4620344aacd78b8f0e96b8c853a0ceeafe35d6b338b5338e959b26a710bb3cdc9347fae575da0fae720eb312416cee371cf827cf7875edeb71da95bf07d864a812ffa8c4ddec2b87cf60f3bd2f636306b040976d0f1591a401fecdc304bce3754bd8d8fea5649e93da601995138c8c0bc69d44bc96ad786dc30e5ea13698c900c553d2c01972ad1ffce071a2980271c3525e932508f1f955bca7dee3e94997f8f6c92e4ef1447a3c47053563940ea4b88987fdb0ce0a7ddd8ea2bf375922297947ea8bb18985f6bbe3eab2d03f12f6687f911b12c7ce2b9050995523f0f23a03984f15cfc6785bd92af3ad60daac650ff3a718183967665f92b17eaf5d1459d2eb8255b94b0bd1f279aa18a04a87339941ee4cf11f31c357f31b9ff54858fb43085ebfc7b9868001bbbcd126dfcfeff478063fccde8736c15d1bb16108f1d710aad0694dffb181cc4e57f2b5d00276c18c19ccbacd7096be13a8fdf2c280cd237cbc46466c2e33cd745b465c60c1fdae6399b326ccf9e6164ff24021fce569dc8b6df8dfd26406906f1b25656f37a10626f153ff3239a8cfd35664155cb92ac54205ae517731afa77a86627177435cf5cb4371ab3a35fc99d0fc4731db98fb2ac959dc3757053ff6c41e5db1dc6da501456734a6155287cdc50038f2c43b74acfb683436510e0c6b3e1a0acfbf00663978d88ede7802b5703b05107dfb90a05ae78c9bb62375c4c6e591d9b7a35d2430066e8f528af96c32c2645566305387023dcd4a091ec0ec1bd4a454cc87f17426a65c1543759a7b503129aab79ed9e4b6efcb951da7f00c42d31cda7e4511f164e037762a63ebd2c617195f455687197bdc9f51cc26126ae291d3b0a4578bb8d6d386ac65b5859403bfde32cb619bb7f63f9c100f6b29a771837e3e1f06c83eccd5c2b3ca4d5af1ee5fc42fa4de6aa778402cf72a55e64cd2c5768862f2a65ec24a63da1946092e5bc5789a91cfccd4a553a3eeff0620f3ba53622e1513b6d59babb509a21516a6e9bb5657a6c4ff9a9423a65d555b9236caa510879d3ce809572db65cefa31783a5b5fcf0e6b9e44662536877f96e5e7bfce6593f912611095e905dcb5ef443b626e585a9a056e1d70900000005752526306830c6259c1659fa8ca3bfd85fa782c17efd04ec51cf7b13cc93de02afc40e08f3faf2ba3ac74f40bb75d3a4b1426ac62a517a3b9b26a85968e66955227fdec6d08be9fa88128f0d3c0681a5ba271ae5e27cfa60daa95e938c02f80da2499fa7619612a9acc3398f993475d4b981579f881f39adc29d1beb976be1c02e4e1bb76d33a81fa5f9065c8945a6a7aa2ceed88276ea9723c80bbb314ef89f023700210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0640420f0000000000000000006a9900000000000000000000000000",
  "result": "success"
}
```

Use the [sendrawtransaction](../../../basic-docs/smart-chains/smart-chain-api/rawtransactions.html#sendrawtransaction) method to broadcast the hex value from the response.

```bash
./komodo-cli -ac_name=USDKTEST sendrawtransaction 0400008085202f890201cbaa60fc93f3e7005f6622999c4abb7258931c3869a6004282014e229358250000000049483045022100f75b4b3dd2a3cac01d389e2957f7337889129f31453a3bf67aa3a6b807417cf0022076ccbb1fd65a6606a2b1e8a816e90edd66d17e6e336755043ab109a1d6cc07f901ffffffff001f6f50578b79a46d6285d9b3c6668104bc1101b7763a33a5e0784b2933fbd7000000004847304402203a76e7c860454b47d653fe9c306a5c53c3b5bda3c68d3c58af89f3754c1d91f3022033c144d67703cd0a1313b31d241bba3eb925200806783cd2557ec18d4669401501ffffffff031027000000000000302ea22c80207f6d7586423d9d8f716988f94728224df39bb0c98bb75655d22a778aea922a208103120c008203000401cc1027000000000000232102afc40e08f3faf2ba3ac74f40bb75d3a4b1426ac62a517a3b9b26a85968e66955ac0000000000000000fd67096a4d6309f144034b4d44b2adb5302a3058325c06b102d88671016fc550147fb6e0d80869bd68764e38500121023a447741707e95bc889fbbb08295d402332217075752bd1bb3999b092e4753ab01524571b97a2bf1b546379e59479430ca188f274215b411e90d2cd51295b12b98c0b01800afc40e08f3faf2ba3ac74f40bb75d3a4b1426ac62a517a3b9b26a85968e6695500000000fd2a023034303030303830383532303266383930313063616362303839356262643563626265313261313338373563303664616335396164363135343738306466353964383662323864316461306436346333633530303030303030303662343833303435303232313030636162663266633633636562663265656362313836653932303533646131643463656266393834393830636136343561633035306231666234396530666334333032323037306635393330376438663434326332393564656135303064393361343534356136353066316238306430366461623931353435363261663763336132386331303132313032646563633265343963323463613966303662393636363565386533393833366561316438633733363731313636666136656539313762346263623330376234346666666666666666303331303237303030303030303030303030313937366139313434373236663238333866633464366163363636313565313036303465313839323665396235353665383861633430343230663030303030303030303031376139313437333734663831316230353365383161346234653665323832613234323161616631373061666161383739386462326433363030303030303030313937366139313430386261343135326665383066666333336638303562313636656339633033633238383130396234383861633666353263643564383762313138303030303030303030303030303030303030303030303030fd77060400000012a703d96b522f36fe13711c96de92b3f17bdbd41eda1a6753e2cd22924c1b0e47dd0fb69db925741977975a5803d8c885c72651b5c0427685e20e16cba73a43a2d8a734eb73a4dc734072dbfd12406f1e7121bfe0e3d6c10922495c44e5cc1cba52cd5dddaf001dffef8831000000000000b22a0000000000000200000000000000000000000000fd40050029a91e2967f03d92e838d3bf73067ed2431bde7f23432431f5d41ef6bd4245f0216b3b9a389d3f8c0813f27547948aec070a0302892468513f07653a83ac3a8c9a373cf12a4ddcb473f92d350417081a7c3696027f82781522fd39ac95449a24bfebf30ae39c328913e777ddca29a3d5b6b15374e1b84e09c9d2af243404e800ed03c3ec32dee990fa10d2b61d43db9987760fb169841e6cc985c6d651a4be3cd9f60cded6232e03f610267e1ed8873a5580c40c07353b0440398032251401ad3063d117d1ba83e674782f65e6d7b525691637434d0c0a0cd758c26b8be9fce02afdc81b6d4a2733432193242135d58d9762874d2d26ac85fbe43d0d324b512ac8012756e68100ce76b9b8bb761053501ea99224b88b66f8c86f236c23d8e0b9ca1ad9000c0e5fbf34a583c245fd9942e94c547345a62731a61a17bf895d2c17dcbb647ce2b7f3e29e5264c01e6d7300d7b9c9881c08e7d5ec71e3adb47de2061513094f13d654d22c502f596225b22ff05d457e479e9895ad05eecb63f71697639b5510e79a9973b5d8561144e41773a8d3e40eb10d5fc352db2e31ed555a8beb8a830aea6e654414a9853dfab20d37300fb0a776d5ccef137cd379ce98204728d7f2117111a59ead081894330faa17677889216b4c3d54c8a97f189296465ebcb739f61b8f53cf8ad6ced60d924b78d0677c3d1d16ab0fa1e0b94c6176d5f12617f6de5e665a99dbd8e84814f53d3fa0ccc383afa5d1cd6ac664bd27c44f0f4620344aacd78b8f0e96b8c853a0ceeafe35d6b338b5338e959b26a710bb3cdc9347fae575da0fae720eb312416cee371cf827cf7875edeb71da95bf07d864a812ffa8c4ddec2b87cf60f3bd2f636306b040976d0f1591a401fecdc304bce3754bd8d8fea5649e93da601995138c8c0bc69d44bc96ad786dc30e5ea13698c900c553d2c01972ad1ffce071a2980271c3525e932508f1f955bca7dee3e94997f8f6c92e4ef1447a3c47053563940ea4b88987fdb0ce0a7ddd8ea2bf375922297947ea8bb18985f6bbe3eab2d03f12f6687f911b12c7ce2b9050995523f0f23a03984f15cfc6785bd92af3ad60daac650ff3a718183967665f92b17eaf5d1459d2eb8255b94b0bd1f279aa18a04a87339941ee4cf11f31c357f31b9ff54858fb43085ebfc7b9868001bbbcd126dfcfeff478063fccde8736c15d1bb16108f1d710aad0694dffb181cc4e57f2b5d00276c18c19ccbacd7096be13a8fdf2c280cd237cbc46466c2e33cd745b465c60c1fdae6399b326ccf9e6164ff24021fce569dc8b6df8dfd26406906f1b25656f37a10626f153ff3239a8cfd35664155cb92ac54205ae517731afa77a86627177435cf5cb4371ab3a35fc99d0fc4731db98fb2ac959dc3757053ff6c41e5db1dc6da501456734a6155287cdc50038f2c43b74acfb683436510e0c6b3e1a0acfbf00663978d88ede7802b5703b05107dfb90a05ae78c9bb62375c4c6e591d9b7a35d2430066e8f528af96c32c2645566305387023dcd4a091ec0ec1bd4a454cc87f17426a65c1543759a7b503129aab79ed9e4b6efcb951da7f00c42d31cda7e4511f164e037762a63ebd2c617195f455687197bdc9f51cc26126ae291d3b0a4578bb8d6d386ac65b5859403bfde32cb619bb7f63f9c100f6b29a771837e3e1f06c83eccd5c2b3ca4d5af1ee5fc42fa4de6aa778402cf72a55e64cd2c5768862f2a65ec24a63da1946092e5bc5789a91cfccd4a553a3eeff0620f3ba53622e1513b6d59babb509a21516a6e9bb5657a6c4ff9a9423a65d555b9236caa510879d3ce809572db65cefa31783a5b5fcf0e6b9e44662536877f96e5e7bfce6593f912611095e905dcb5ef443b626e585a9a056e1d70900000005752526306830c6259c1659fa8ca3bfd85fa782c17efd04ec51cf7b13cc93de02afc40e08f3faf2ba3ac74f40bb75d3a4b1426ac62a517a3b9b26a85968e66955227fdec6d08be9fa88128f0d3c0681a5ba271ae5e27cfa60daa95e938c02f80da2499fa7619612a9acc3398f993475d4b981579f881f39adc29d1beb976be1c02e4e1bb76d33a81fa5f9065c8945a6a7aa2ceed88276ea9723c80bbb314ef89f023700210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0640420f0000000000000000006a9900000000000000000000000000
```

Output:

```
9e08b1c5ac37cbce997ceaa68d4ca2d1368b815e8de275bb54d5e230a1341b5f
```

This is the deposit `txid`.

#### Claim the Tokenized KMD

Use the [gatewaysclaim](../../../basic-docs/antara/antara-api/gateways.html#gatewaysclaim) method to claim the tokenized `KMD` on the `USDKTEST` Smart Chain.

Method structure:

`gatewaysclaim bindtxid coin deposittxid destpub amount`

#### Details

- `gatewaysclaim` — The name of the method, executed as-is
- `bindtxid` — This is the creation txid of the Gateway; supplied at the beginning of the tutorial
- `coin` — Ticker of the `coin` deposited
- `deposittxid` — The `txid` returned from the `gatewaysdeposit` transaction
- `destpubkey` — The user pubkey used to launch the `USDKTEST` daemon
- `amount` — The `amount` deposited

Observe the following example structure.

```bash
./komodo-cli -ac_name=USDKTEST gatewaysclaim 50384e7668bd6908d8e0b67f1450c56f017186d802b1065c3258302a30b5adb2 KMD 9e08b1c5ac37cbce997ceaa68d4ca2d1368b815e8de275bb54d5e230a1341b5f 0217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06 0.01
```

Output:

```json
{
  "hex": "0400008085202f89028a91efc8a0073e1d2fd879d71ee5b3771f16ad307cdcf69d477400de679c879801000000804c7ea27ba077a26ba067a565802103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb408140edb95c621f7cc2a57447c230e2c8750941fb747bb80cee91dc6cdc9cdf57342042b01dbef69d7dd7600e3b129d423f11615173cfa2f3f3c0cb303e0918c75e5ca100af038001f1af038001f2a10001ffffffff5f1b34a130e2d554bb75e28d5e818b36d1a24c8da6ea7c99cecb37acc5b1089e000000007b4c79a276a072a26ba067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e068140dbba871356bd3241c73baafd98c134385e156813bdce9c864058de920c3a24d66eb808c4a329e38552756172c0bd1d93bcfb870eec246cd8dd97b08637edaa18a100af038001f1a10001ffffffff0240420f0000000000302ea22c8020d62369afdb9fbe16bae7a6ac394333e9337ecc0b7671cda491df2fa82e48a20d8103120c008203000401cc0000000000000000ba6a4cb7f2741a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf101210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e061370f143b2adb5302a3058325c06b102d88671016fc550147fb6e0d80869bd68764e3850034b4d445f1b34a130e2d554bb75e28d5e818b36d1a24c8da6ea7c99cecb37acc5b1089e210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0640420f000000000000000000a29900000000000000000000000000",
  "result": "success"
}
```

Broadcast the returned hex value using <b>sendrawtransaction</b>.

```bash
./komodo-cli -ac_name=USDKTEST sendrawtransaction 0400008085202f89028a91efc8a0073e1d2fd879d71ee5b3771f16ad307cdcf69d477400de679c879801000000804c7ea27ba077a26ba067a565802103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb408140edb95c621f7cc2a57447c230e2c8750941fb747bb80cee91dc6cdc9cdf57342042b01dbef69d7dd7600e3b129d423f11615173cfa2f3f3c0cb303e0918c75e5ca100af038001f1af038001f2a10001ffffffff5f1b34a130e2d554bb75e28d5e818b36d1a24c8da6ea7c99cecb37acc5b1089e000000007b4c79a276a072a26ba067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e068140dbba871356bd3241c73baafd98c134385e156813bdce9c864058de920c3a24d66eb808c4a329e38552756172c0bd1d93bcfb870eec246cd8dd97b08637edaa18a100af038001f1a10001ffffffff0240420f0000000000302ea22c8020d62369afdb9fbe16bae7a6ac394333e9337ecc0b7671cda491df2fa82e48a20d8103120c008203000401cc0000000000000000ba6a4cb7f2741a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf101210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e061370f143b2adb5302a3058325c06b102d88671016fc550147fb6e0d80869bd68764e3850034b4d445f1b34a130e2d554bb75e28d5e818b36d1a24c8da6ea7c99cecb37acc5b1089e210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0640420f000000000000000000a29900000000000000000000000000
```

Output:

```
e38b3f2022364cb0f0b9b60e9b2d89bad0a3974206e783ed78f1f1b09fa0299c
```

#### Verify the Returned Tokenized KMD

Use the <b>tokeninfo</b> method to check that the above commands result in a deposit in the tutorial user's account of the appropriate amount of tokenized `KMD`.

```bash
./komodo-cli -ac_name=USDKTEST tokeninfo 1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1
```

Output:

```json
{
  "result": "success",
  "tokenid": "1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1",
  "owner": "038814d60d99a594b4b1092247df4384bc21a50733d3acd0e29499e5f03737374d",
  "name": "KMD",
  "supply": 10000000000000,
  "description": "KMD_BTC,BTC_USD,*,1"
}
```

The description `"KMD_BTC,BTC_USD,*,1"` indicates to the Pegs modules the price to be considered. <!-- Sidd: I don't understand what this means specifically. Can we please get more information here? gcharang: it is an artifact from the Prices module, "KMD_BTC,BTC_USD,*,1" is a synthetic price; it means (KMD/BTC)*(BTC/USD) which is equal to KMD/USD this system should be clear once I add the prices doc-->

```bash
./komodo-cli -ac_name=USDKTEST tokenbalance 1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1
```

Output:

```json
{
  "result": "success",
  "CCaddress": "RTcbFr8dH9dPGgGephMoDevHefndQQehxq",
  "tokenid": "1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1",
  "balance": 1000000
}
```

### Exchange Tokenized KMD for USDK Coins

Use the [pegsfund](../../../basic-docs/antara/antara-api/pegs.html#pegsfund) method to lock the tokenized `KMD`.

```bash
./komodo-cli -ac_name=USDKTEST pegsfund a9539ec8db34ee44ff213cda59f412a02795821cf05844b0bc184660711371f7 1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1 0.01
```

Output:

```json
{
  "hex": "0400008085202f89024c386ef60103e74f339867bd7c38b7f187ceee842b8e57ab9a42a16b0721be23040000007b4c79a276a072a26ba067a565802103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece8140213fbd380d7905f770709725fe462e5f0a731eca4e56435c4b2f7c96d5b6201433e7c780d313795ddf9ae1d0b689b4f950af6e0e07dd9bcbc293b46f2a349ef4a100af038001eea10001ffffffff9c29a09fb0f1f178ed83e7064297a3d0ba892d9b0eb6b9f0b04c3622203f8be3000000007b4c79a276a072a26ba067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0681409a7fa29976f948038b77573fb1103836340ebbcdfbbba8dc852186be1666811c034adf2ec9d9515eb58f14df81925f46fb152b2964e8f392b70bafdfe3a8af83a100af038001f2a10001ffffffff051027000000000000302ea22c8020e39343ebe1b40dcc747d145f140983b38f230dcf7963f2b58051265c765f2efa81031210008203000401cc1027000000000000302ea22c8020d77058bfd93eebe366e1c82fc1475690fd290214ed43b8c9dd25374077b35cbe81031210008203000401cc40420f0000000000302ea22c802002bc3497bdabeac3d0c40ac845fa105685724d1b70c84bd6c5cef2ff4c353e7881032214008203000401cc3cdf993b00000000302ea22c802039452b774825750cd9390c3f05c96e486ecf2f21779466efbcd214220a7f288a8103120c008203000401cc0000000000000000c86a4cc5f2741a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf102210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e062103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece175cee46f7711371604618bcb04458f01c829527a012f459da3c21ff44ee34dbc89e53a9210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0640420f000000000040420f0000000000000000000000000000000000a79900000000000000000000000000",
  "result": "success"
}
```

Broadcast the hex value.

```bash
./komodo-cli -ac_name=USDKTEST sendrawtransaction 0400008085202f89024c386ef60103e74f339867bd7c38b7f187ceee842b8e57ab9a42a16b0721be23040000007b4c79a276a072a26ba067a565802103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece8140213fbd380d7905f770709725fe462e5f0a731eca4e56435c4b2f7c96d5b6201433e7c780d313795ddf9ae1d0b689b4f950af6e0e07dd9bcbc293b46f2a349ef4a100af038001eea10001ffffffff9c29a09fb0f1f178ed83e7064297a3d0ba892d9b0eb6b9f0b04c3622203f8be3000000007b4c79a276a072a26ba067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0681409a7fa29976f948038b77573fb1103836340ebbcdfbbba8dc852186be1666811c034adf2ec9d9515eb58f14df81925f46fb152b2964e8f392b70bafdfe3a8af83a100af038001f2a10001ffffffff051027000000000000302ea22c8020e39343ebe1b40dcc747d145f140983b38f230dcf7963f2b58051265c765f2efa81031210008203000401cc1027000000000000302ea22c8020d77058bfd93eebe366e1c82fc1475690fd290214ed43b8c9dd25374077b35cbe81031210008203000401cc40420f0000000000302ea22c802002bc3497bdabeac3d0c40ac845fa105685724d1b70c84bd6c5cef2ff4c353e7881032214008203000401cc3cdf993b00000000302ea22c802039452b774825750cd9390c3f05c96e486ecf2f21779466efbcd214220a7f288a8103120c008203000401cc0000000000000000c86a4cc5f2741a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf102210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e062103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece175cee46f7711371604618bcb04458f01c829527a012f459da3c21ff44ee34dbc89e53a9210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0640420f000000000040420f0000000000000000000000000000000000a79900000000000000000000000000
```

Output:

```
298cfa125e1a38a7aa2a8da8282b017a45cd0c1dc70935712692c00abf48ba3f
```

Use the [pegsget](../../../basic-docs/antara/antara-api/pegs.html#pegsget) method to retrieve the `USDK` coins.

```bash
./komodo-cli -ac_name=USDKTEST pegsget a9539ec8db34ee44ff213cda59f412a02795821cf05844b0bc184660711371f7 1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1 0.001
```

Output:

```json
{
  "hex": "0400008085202f8903b68353f713e1d70cf2fe4fa538de32a8723e603d507c8ee2d42277f3fd7334ad00ca9a3b0201e2ffffffff3fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c2900000000a74ca5a281a1a0819ca28194a067a565802103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece81402e06d560cac761ee7d7720f6ed0f307520fda7c66b2ac0d16cd3c34a33f004393f735429a7ad445a1c970723a7a9d173e1fcc62b54ed164dfb40f23542c9627da129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eea10001ffffffff3fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c2901000000a74ca5a281a1a0819ca28194a067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e068140152ff019e1e4346d450ab149f1ef9115ea84c9ff7c3bb60444a7e48eda0784a46ecefbf1a35f0062513033d9c3fce45a083f70b7ccc41103763c267598bcadcca129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eea10001ffffffff041027000000000000302ea22c8020e39343ebe1b40dcc747d145f140983b38f230dcf7963f2b58051265c765f2efa81031210008203000401cc1027000000000000302ea22c8020d77058bfd93eebe366e1c82fc1475690fd290214ed43b8c9dd25374077b35cbe81031210008203000401cca08601000000000023210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ac0000000000000000fd22016a4d1e01e211b68353f713e1d70cf2fe4fa538de32a8723e603d507c8ee2d42277f3fd7334ad00000400008085202f89013fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c290000000000ffffffff01a086010000000000ab6a4ca8e28efefefe7f065045475343433e140a06d1f028a3abce516bd5d08ebfd860da116dfb0c3a22003b57f0809b5400f7711371604618bcb04458f01c829527a012f459da3c21ff44ee34dbc89e53a9f1eb0ab5bb63b9b36cd1a44d0a30f35d1c113efb5cf5fd4e549ae7f11297451a210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06a08601000000000040420f0000000000a08601000000000000000000b0990000000000000000000000000000000000000000000000000000000000000000",
  "result": "success"
}
```

Broadcast the returned hex value.

```bash
./komodo-cli -ac_name=USDKTEST sendrawtransaction 0400008085202f8903b68353f713e1d70cf2fe4fa538de32a8723e603d507c8ee2d42277f3fd7334ad00ca9a3b0201e2ffffffff3fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c2900000000a74ca5a281a1a0819ca28194a067a565802103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece81402e06d560cac761ee7d7720f6ed0f307520fda7c66b2ac0d16cd3c34a33f004393f735429a7ad445a1c970723a7a9d173e1fcc62b54ed164dfb40f23542c9627da129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eea10001ffffffff3fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c2901000000a74ca5a281a1a0819ca28194a067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e068140152ff019e1e4346d450ab149f1ef9115ea84c9ff7c3bb60444a7e48eda0784a46ecefbf1a35f0062513033d9c3fce45a083f70b7ccc41103763c267598bcadcca129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eea10001ffffffff041027000000000000302ea22c8020e39343ebe1b40dcc747d145f140983b38f230dcf7963f2b58051265c765f2efa81031210008203000401cc1027000000000000302ea22c8020d77058bfd93eebe366e1c82fc1475690fd290214ed43b8c9dd25374077b35cbe81031210008203000401cca08601000000000023210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ac0000000000000000fd22016a4d1e01e211b68353f713e1d70cf2fe4fa538de32a8723e603d507c8ee2d42277f3fd7334ad00000400008085202f89013fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c290000000000ffffffff01a086010000000000ab6a4ca8e28efefefe7f065045475343433e140a06d1f028a3abce516bd5d08ebfd860da116dfb0c3a22003b57f0809b5400f7711371604618bcb04458f01c829527a012f459da3c21ff44ee34dbc89e53a9f1eb0ab5bb63b9b36cd1a44d0a30f35d1c113efb5cf5fd4e549ae7f11297451a210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06a08601000000000040420f0000000000a08601000000000000000000b0990000000000000000000000000000000000000000000000000000000000000000
```

Output:

```
8f18ab623cb91c94ea27b16c455d98df1e057dd120341e54b453090a2c9c9adf
```

Examine the tutorial user's account history using the [pegsaccounthistory](../../../basic-docs/antara/antara-api/pegs.html#pegsaccounthistory) method.

```bash
./komodo-cli -ac_name=USDKTEST pegsaccounthistory a9539ec8db34ee44ff213cda59f412a02795821cf05844b0bc184660711371f7
```

Output:

```json
{
  "result": "success",
  "name": "pegsaccounthistory",
  "account history": [
    {
      "action": "fund",
      "amount": 1000000,
      "accounttxid": "298cfa125e1a38a7aa2a8da8282b017a45cd0c1dc70935712692c00abf48ba3f",
      "token": "KMD",
      "deposit": 1000000,
      "debt": 0
    },
    {
      "action": "get",
      "amount": 100000,
      "accounttxid": "8f18ab623cb91c94ea27b16c455d98df1e057dd120341e54b453090a2c9c9adf",
      "token": "KMD",
      "deposit": 1000000,
      "debt": 100000
    }
    {
      "action": "get",
      "amount": 600000,
      "accounttxid": "8e79ed0a76f359ba048563a0fa2a29ab88ab86b1895e8eff9718f348a04dd1f3",
      "token": "KMD",
      "deposit": 1000000,
      "debt": 700000
    }
    {
      "action": "get",
      "amount": 30000,
      "accounttxid": "9a10581ae047fabe91495cfe558961e3b7362a19b700b2fcea216d06c44d9720",
      "token": "KMD",
      "deposit": 1000000,
      "debt": 730000
    }
  ]
}
```

(If there are duplicate entries in the above call, please ignore them. This is a known bug and will be fixed.)

Use [getbalance](../../../basic-docs/smart-chains/smart-chain-api/wallet.html#getbalance) or [listunspent](../../../basic-docs/smart-chains/smart-chain-setup/nspv.html#listunspent) methods to verify that the `USDKTEST` coins are in the tutorial user's account.

At this point, a normal user may use the stablecoins (`USDKTEST` in this example) to buy, sell, and trade.

#### Redeeming the Stablecoins for the Locked Funds

When finished with the stablecoins, the user may send to the Pegs Module the precise amount of `USDKTEST` coins withdrawn in order to receive the locked `KMD` tokens.

Use the [pegsredeem](../../../basic-docs/antara/antara-api/pegs.html#pegsredeem) method to redeem the tokens.

```bash
./komodo-cli -ac_name=USDKTEST pegsredeem a9539ec8db34ee44ff213cda59f412a02795821cf05844b0bc184660711371f7 1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1
```

Output:

```json
{
  "hex": "0400008085202f891e045ffbf7d56aba87d1527a8bd50c7cbfb44f376b1c0a6815c741a5f6e107f02d00000000484730440220064f36926ed7d6975ad1ecb358df866897554d29d623447b95d0f9d1f575ff0a02203ca4d9ea407c2310cd49be1315887cde4e54619de93d6882f0c2fe871820ef3201ffffffff3fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c29030000007b4c79a276a072a26ba067a565802103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece81400301711d3ddb1753c3a004c250616ea580f0bf75c1c03f791f76327a6efa69792f19eae5fa3c73ab29a4b6754a91111935a46fa1c28d4cdaacdcb24ec571a45fa100af038001eea10001ffffffff20974dc4066d21eafcb200b7192a36b7e3618955fe5c4991befa47e01a58109a00000000a74ca5a281a1a0819ca28194a067a565802103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece81409ffd2bb29f40dbf7b3e741e00e3a97c7e66f49526ea9dd33ec724eb30a81b21b16cdac1ea840cbf902f36ef17b9ac81014a735e97377d6d5f07a6e8ac04556f8a129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eea10001ffffffff20974dc4066d21eafcb200b7192a36b7e3618955fe5c4991befa47e01a58109a01000000a74ca5a281a1a0819ca28194a067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e068140bbfdfb024c50111ed7184b3fd4c7c462ea5093ab9969bab386d54965e248184a00a5cb2a1f625116d3bd02b470f4b33dab11a38ffd4d050fcdbe01e8ae754e70a129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eea10001ffffffff3fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c2902000000ac4caaa281a6a081a1a28194a067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e068140bfb34bd8abc720bef5c13708ad9280893df2b9fb1e70eb6063c05614245f5d3538d3048b9f6e4fbfc3053e594df7e638dd22e42c833c75aa174edf010fb45419a129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eeaf038001f2a10001ffffffff0dfe7aecdaed2498f6a3c29bcd53f15913ae2b36bf7643efcb8d3eb93354fbad00000000484730440220403e6284a585ed11b58207279786396101ea442d79b9df44688ebdaa7467e04d0220474f38ecc4ff53f9d685538805d0f0b7eaf008c9736ddf677a4bb88919e5680e01ffffffff0491bd559806afc9638763c8fb8e550b5e13df6d18ed0eeb7209f8e7e6ccb90f0000000048473044022078b520bbaa03883e03321a98cfca3282f7f1d70d91a977ed81b50d0f91440b3402205d1f346312ffbe4b76c614fb8d9dfcfd38069eca55a8f7d2ae84d4cae6fb481901ffffffff0d5e3529d01acc37c5cfbac0a3321870a5097134029ed474db42023bcbf18bb50000000049483045022100e6ccd2403781c60d928fa090d78d3f42cfa812dcd37ca5c65c91969a81a6d8ab022067f917bd432c69a44fd338a4897462e294b40304ea44dfe544a826bdb75232b901ffffffff07c9ea3dcb2164a8b5e839b23f39e6d2e0d3b8a7848ea188dca6e61a9833a8d00000000048473044022061ffebbf638055097c9bfaf654135e65925e7107cdd86d553264df3c16eefd3f0220401de8c419a842ad1f72eab0eaeca0f63ff95419e222a94141b04b5eaa3e341701ffffffff0ac35ee065ed0090ef129c389f0b84c91feaf9bf8a4ae6c12480a4d435cd550400000000484730440220710f15cebed5631fdaee51b651456b2b56e1d83968526745241a4920c6719b2b022000abc38a4b9ae4f6a7c53c1e80049c7d9109f97e26daf76a27021ee805a21a1d01ffffffff0aee5de22398ff1a61bca8d95d3304337be9cb00d401afa088cf95d31f121b1d000000004847304402207e4c1793bb91c550e462d38531734dd9fece17bab40ad0d2e8c2e9cd741f342302202c4973b14c9a5768a72aa5a4ab752de8fb388fd208280b6e5ef529e918dcca4101ffffffff0bd4eeed3d68d4f361e4e65a06f1e437739d209c5b593adfb9c908a11e5c4b1e0000000049483045022100a3e1e8f18bdd72f3794d3e2bfef1d807f904c93c511d396d33f66a9a84ea988b02203954987e94629cf77982568f115a148d64b44f1619c285d9ea229ac81268a16c01ffffffff023035ddb47d6d6ba1a1e760a750325f912f66934130059313bd2460dd3626a80000000049483045022100be9bc941d1afcc3e816a70e2e49e0c0b5279d8c704b14e8ea6f0a5b8e644f999022016ac0c28af028149a3026eb3cbe266604809643b303ff3ae4c27f4a11ed7059901ffffffff0d0db11a4bfaeb4293d26d4f540f8ae7b8ac648998d32ee4902eb6445bf3b4f4000000004948304502210093896862f4c679d6db6eb57951b5117a6201eda285b257dd60c57a45a3254cbb02205a7d32b4ffbf0f8d90cf1fca8a0f4f09e36da21c536e32f7002a28d6d56d132b01ffffffff0623be2e2bd36d04b45df4fcb8349f0b10095ec1aac30613fd21ca40054361300000000049483045022100d24bb6d6720e876a57607c8e29348f29357181d4369e41b044be9a4ac699272c022046e536c70a5ae151c99cff8795b9a1a6fbf159cfdac0c36bbceced6f6c7cec6b01ffffffff0cc55d115db43ac735fef6a662896b24f288b2fbb7b793c1f96948f6820338ed00000000494830450221009d6ffacd7e7c167c254ad79e03184d30f3598a75baf5422f62a74fbee20f8d35022029c7348297580926f64d6f3dd69f54aaec45b428594fae57af252ccf2fb804e401ffffffff08230c57a73ae1167c7c99c5e135af4e52b21468c9ef6de6528e51700d611fcd00000000484730440220645c65d17a44532e80bec8c40fd683dfbf614a6d64acec64eb2567788bbf9ea402205976d7399e33d20e588230ff6d65cef4dde327ffbb42a15e2191400896b34a4a01ffffffff083ae311d476e71cbd214e90aa7065bc3f8e3735fccdb951e84be2f35dbe86e90000000049483045022100aedf51f885b813acbce5799f976dff5200658396d3c33dd36f5768d5225215e3022070faaccac58b8aee064a312d6ed01301ac947c9e5cfd6be3d81d5cabb48ddf0901ffffffff012f6500ac7ff9cf0a6a624ca7a49e684fc6d28b5646a47c1f65d693965b1c430000000049483045022100ea4eca020c79db8fe46ae1a970c15deda516180c875bbbdb7c43a73e884a60f202207278af9cd50ee2806f6e4f16a5f2e4454881deacbcade363289239fdd54a982d01ffffffff08359b7d0efb9eede36cf0a5d9fdc5f4a83308c8a11099a3fa4cbb1fadbfcfde0000000049483045022100d1c1ed48608d61ae88cd957281e9320311861dbdc3596136533f058313883b6a02200ba029992e819196fd7c83b51a8d108c1b3c9b1f03a7faf2290acfced66c113a01ffffffff083f857139d0711209eef17e2f6177cb4ed0f68c00f520038a587744262445b90000000049483045022100cd94b3dd563ad7a37bd531a89cb0d988f4ec92949df7302ba43e13bdb88082c1022003be0f619ae4b3de597f8716a9374d63becf81d3d3943b3c741ee636b7e5cd8401ffffffff09cb8b189715b655a0c07456648951c3c178a6c6270c484dd3cfad5b18f859880000000048473044022025b7fc3db1a0b33471e5eccd3cb54a71fec8c5366837388489f3d9c90ad80d070220485c4c79790e2cfac55566869a52dbd86426f4d1db9fa23314d82b26ffc8f06d01ffffffff070d10ba3a3bb2f50fbc88549ab14aea8424bfa5cf4932653a82b2af987a82200000000048473044022047ac9d547dbf96cebd1f6dc29aad99d752c60b316df54987b577b7cc04cb6a9302204ae6a4707e6f270a4bfdc1d55e31bbbaf95e233a6c26ae6823b3f592cb39656301ffffffff0be472c9362d31a026a7f22d0fa14f294c95b0457ae66cd7179bb29a1f30278d0000000049483045022100e54335c0b652f35a3ae2eda351638b3b5d1ff76bf256bfcfe6a3e8810fd131ad02202865894c90cdbea6e1f052a83a085236606da96afc03e47a79159c5f9ee1398401ffffffff051c297d636cc51d90a5996a23ffc7c5374a4e3df397f770b5113585749bb5480000000049483045022100d67d9b0c34aa8f8d6c4ed261af543ce4cd9b95fcae7bbbb94c0f2521982037be02207fa0b75e74f2c2e9a5009d160addb3b191cf751e0887f0186526023f7f79b80401ffffffff0b19234b25da56339d70722c5845e39a56513ce6b70c7c26486e7d3b8c5bd02c000000004948304502210086f6f6dc5005207cc4206ff43d29e1ca42fc6cf5ce30e870d6bfa39002264a9c02200be78b519d6d2f7448ded31e96077b00960532c7d7b1484c37fe6a1d6990237e01ffffffff0d628dfaece395d197c0b810668b7af212d083e5f441a4c729b164ab3df91b510000000049483045022100c6ca324eeaafc9bacae5c260981baf9ae8f5c0eb3f83533c8631ecbe592d470c022014d44bc921909246002d64e4c029af2a4abb26812a6902cf61f69782630ce9c901ffffffff039d71284b8643c45e14b5bfc8c9439a17474376a78cec7be3d6b688a40bc4fc000000004847304402206b8320f3ea3cdd73fa9e4ee43a62144076b6ffc6cf58fdb06233b542d6924db402205a2310f7fc382407c8466b5677691988a6dc2a0fe3f3b4c6bc1f1a01d1820e7901ffffffff02803fb66f0c03fa8211d4086ad2262e50ea5dd99f30603e9999603cdfac367c0000000049483045022100837fec21e7ba574c2283ec160bc418485f2dd6fbb5f5dd575156c41450e7deb6022058aefedcc08274f523c52981b69f124197a431580d5692c2a5f6e8af6bef594801ffffffff0af2f9ced5de00310114f70d6756db7df65205aeac26b5607bd71333812f68e40000000049483045022100d5fdd26ad4682b6aa2d522c1b75097f9cb3df94632e5cfc2454d79b76f9401660220193d741cc875e75cf04ad70de582915b14b41a6283967527e931c50565cdb62f01ffffffff071027000000000000302ea22c8020e39343ebe1b40dcc747d145f140983b38f230dcf7963f2b58051265c765f2efa81031210008203000401cc1027000000000000302ea22c8020d77058bfd93eebe366e1c82fc1475690fd290214ed43b8c9dd25374077b35cbe81031210008203000401cc40420f0000000000302ea22c8020d62369afdb9fbe16bae7a6ac394333e9337ecc0b7671cda491df2fa82e48a20d8103120c008203000401cc90230b0000000000232102f7711371604618bcb04458f01c829527a012f459da3c21ff44ee34dbc89e53a9ac2cb8993b00000000302ea22c802039452b774825750cd9390c3f05c96e486ecf2f21779466efbcd214220a7f288a8103120c008203000401cc102700000000000023210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ac0000000000000000a66a4ca3f2741a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf101210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06175cee52f7711371604618bcb04458f01c829527a012f459da3c21ff44ee34dbc89e53a9210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0640420f00000000000000000000000000000000000000000000000000209d00000000000000000000000000",
  "result": "success"
}
```

Broadcast the hex value.

```bash
./komodo-cli -ac_name=USDKTEST sendrawtransaction 0400008085202f891e045ffbf7d56aba87d1527a8bd50c7cbfb44f376b1c0a6815c741a5f6e107f02d00000000484730440220064f36926ed7d6975ad1ecb358df866897554d29d623447b95d0f9d1f575ff0a02203ca4d9ea407c2310cd49be1315887cde4e54619de93d6882f0c2fe871820ef3201ffffffff3fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c29030000007b4c79a276a072a26ba067a565802103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece81400301711d3ddb1753c3a004c250616ea580f0bf75c1c03f791f76327a6efa69792f19eae5fa3c73ab29a4b6754a91111935a46fa1c28d4cdaacdcb24ec571a45fa100af038001eea10001ffffffff20974dc4066d21eafcb200b7192a36b7e3618955fe5c4991befa47e01a58109a00000000a74ca5a281a1a0819ca28194a067a565802103c75c1de29a35e41606363b430c08be1c2dd93cf7a468229a082cc79c7b77eece81409ffd2bb29f40dbf7b3e741e00e3a97c7e66f49526ea9dd33ec724eb30a81b21b16cdac1ea840cbf902f36ef17b9ac81014a735e97377d6d5f07a6e8ac04556f8a129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eea10001ffffffff20974dc4066d21eafcb200b7192a36b7e3618955fe5c4991befa47e01a58109a01000000a74ca5a281a1a0819ca28194a067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e068140bbfdfb024c50111ed7184b3fd4c7c462ea5093ab9969bab386d54965e248184a00a5cb2a1f625116d3bd02b470f4b33dab11a38ffd4d050fcdbe01e8ae754e70a129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eea10001ffffffff3fba48bf0ac09226713509c71d0ccd457a012b28a88d2aaaa7381a5e12fa8c2902000000ac4caaa281a6a081a1a28194a067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e068140bfb34bd8abc720bef5c13708ad9280893df2b9fb1e70eb6063c05614245f5d3538d3048b9f6e4fbfc3053e594df7e638dd22e42c833c75aa174edf010fb45419a129a52780209de43b2cf09dcb2107822237e0afba0b0917b1592457b6fbfddb34fff3d302ae8103020000af038001eeaf038001f2a10001ffffffff0dfe7aecdaed2498f6a3c29bcd53f15913ae2b36bf7643efcb8d3eb93354fbad00000000484730440220403e6284a585ed11b58207279786396101ea442d79b9df44688ebdaa7467e04d0220474f38ecc4ff53f9d685538805d0f0b7eaf008c9736ddf677a4bb88919e5680e01ffffffff0491bd559806afc9638763c8fb8e550b5e13df6d18ed0eeb7209f8e7e6ccb90f0000000048473044022078b520bbaa03883e03321a98cfca3282f7f1d70d91a977ed81b50d0f91440b3402205d1f346312ffbe4b76c614fb8d9dfcfd38069eca55a8f7d2ae84d4cae6fb481901ffffffff0d5e3529d01acc37c5cfbac0a3321870a5097134029ed474db42023bcbf18bb50000000049483045022100e6ccd2403781c60d928fa090d78d3f42cfa812dcd37ca5c65c91969a81a6d8ab022067f917bd432c69a44fd338a4897462e294b40304ea44dfe544a826bdb75232b901ffffffff07c9ea3dcb2164a8b5e839b23f39e6d2e0d3b8a7848ea188dca6e61a9833a8d00000000048473044022061ffebbf638055097c9bfaf654135e65925e7107cdd86d553264df3c16eefd3f0220401de8c419a842ad1f72eab0eaeca0f63ff95419e222a94141b04b5eaa3e341701ffffffff0ac35ee065ed0090ef129c389f0b84c91feaf9bf8a4ae6c12480a4d435cd550400000000484730440220710f15cebed5631fdaee51b651456b2b56e1d83968526745241a4920c6719b2b022000abc38a4b9ae4f6a7c53c1e80049c7d9109f97e26daf76a27021ee805a21a1d01ffffffff0aee5de22398ff1a61bca8d95d3304337be9cb00d401afa088cf95d31f121b1d000000004847304402207e4c1793bb91c550e462d38531734dd9fece17bab40ad0d2e8c2e9cd741f342302202c4973b14c9a5768a72aa5a4ab752de8fb388fd208280b6e5ef529e918dcca4101ffffffff0bd4eeed3d68d4f361e4e65a06f1e437739d209c5b593adfb9c908a11e5c4b1e0000000049483045022100a3e1e8f18bdd72f3794d3e2bfef1d807f904c93c511d396d33f66a9a84ea988b02203954987e94629cf77982568f115a148d64b44f1619c285d9ea229ac81268a16c01ffffffff023035ddb47d6d6ba1a1e760a750325f912f66934130059313bd2460dd3626a80000000049483045022100be9bc941d1afcc3e816a70e2e49e0c0b5279d8c704b14e8ea6f0a5b8e644f999022016ac0c28af028149a3026eb3cbe266604809643b303ff3ae4c27f4a11ed7059901ffffffff0d0db11a4bfaeb4293d26d4f540f8ae7b8ac648998d32ee4902eb6445bf3b4f4000000004948304502210093896862f4c679d6db6eb57951b5117a6201eda285b257dd60c57a45a3254cbb02205a7d32b4ffbf0f8d90cf1fca8a0f4f09e36da21c536e32f7002a28d6d56d132b01ffffffff0623be2e2bd36d04b45df4fcb8349f0b10095ec1aac30613fd21ca40054361300000000049483045022100d24bb6d6720e876a57607c8e29348f29357181d4369e41b044be9a4ac699272c022046e536c70a5ae151c99cff8795b9a1a6fbf159cfdac0c36bbceced6f6c7cec6b01ffffffff0cc55d115db43ac735fef6a662896b24f288b2fbb7b793c1f96948f6820338ed00000000494830450221009d6ffacd7e7c167c254ad79e03184d30f3598a75baf5422f62a74fbee20f8d35022029c7348297580926f64d6f3dd69f54aaec45b428594fae57af252ccf2fb804e401ffffffff08230c57a73ae1167c7c99c5e135af4e52b21468c9ef6de6528e51700d611fcd00000000484730440220645c65d17a44532e80bec8c40fd683dfbf614a6d64acec64eb2567788bbf9ea402205976d7399e33d20e588230ff6d65cef4dde327ffbb42a15e2191400896b34a4a01ffffffff083ae311d476e71cbd214e90aa7065bc3f8e3735fccdb951e84be2f35dbe86e90000000049483045022100aedf51f885b813acbce5799f976dff5200658396d3c33dd36f5768d5225215e3022070faaccac58b8aee064a312d6ed01301ac947c9e5cfd6be3d81d5cabb48ddf0901ffffffff012f6500ac7ff9cf0a6a624ca7a49e684fc6d28b5646a47c1f65d693965b1c430000000049483045022100ea4eca020c79db8fe46ae1a970c15deda516180c875bbbdb7c43a73e884a60f202207278af9cd50ee2806f6e4f16a5f2e4454881deacbcade363289239fdd54a982d01ffffffff08359b7d0efb9eede36cf0a5d9fdc5f4a83308c8a11099a3fa4cbb1fadbfcfde0000000049483045022100d1c1ed48608d61ae88cd957281e9320311861dbdc3596136533f058313883b6a02200ba029992e819196fd7c83b51a8d108c1b3c9b1f03a7faf2290acfced66c113a01ffffffff083f857139d0711209eef17e2f6177cb4ed0f68c00f520038a587744262445b90000000049483045022100cd94b3dd563ad7a37bd531a89cb0d988f4ec92949df7302ba43e13bdb88082c1022003be0f619ae4b3de597f8716a9374d63becf81d3d3943b3c741ee636b7e5cd8401ffffffff09cb8b189715b655a0c07456648951c3c178a6c6270c484dd3cfad5b18f859880000000048473044022025b7fc3db1a0b33471e5eccd3cb54a71fec8c5366837388489f3d9c90ad80d070220485c4c79790e2cfac55566869a52dbd86426f4d1db9fa23314d82b26ffc8f06d01ffffffff070d10ba3a3bb2f50fbc88549ab14aea8424bfa5cf4932653a82b2af987a82200000000048473044022047ac9d547dbf96cebd1f6dc29aad99d752c60b316df54987b577b7cc04cb6a9302204ae6a4707e6f270a4bfdc1d55e31bbbaf95e233a6c26ae6823b3f592cb39656301ffffffff0be472c9362d31a026a7f22d0fa14f294c95b0457ae66cd7179bb29a1f30278d0000000049483045022100e54335c0b652f35a3ae2eda351638b3b5d1ff76bf256bfcfe6a3e8810fd131ad02202865894c90cdbea6e1f052a83a085236606da96afc03e47a79159c5f9ee1398401ffffffff051c297d636cc51d90a5996a23ffc7c5374a4e3df397f770b5113585749bb5480000000049483045022100d67d9b0c34aa8f8d6c4ed261af543ce4cd9b95fcae7bbbb94c0f2521982037be02207fa0b75e74f2c2e9a5009d160addb3b191cf751e0887f0186526023f7f79b80401ffffffff0b19234b25da56339d70722c5845e39a56513ce6b70c7c26486e7d3b8c5bd02c000000004948304502210086f6f6dc5005207cc4206ff43d29e1ca42fc6cf5ce30e870d6bfa39002264a9c02200be78b519d6d2f7448ded31e96077b00960532c7d7b1484c37fe6a1d6990237e01ffffffff0d628dfaece395d197c0b810668b7af212d083e5f441a4c729b164ab3df91b510000000049483045022100c6ca324eeaafc9bacae5c260981baf9ae8f5c0eb3f83533c8631ecbe592d470c022014d44bc921909246002d64e4c029af2a4abb26812a6902cf61f69782630ce9c901ffffffff039d71284b8643c45e14b5bfc8c9439a17474376a78cec7be3d6b688a40bc4fc000000004847304402206b8320f3ea3cdd73fa9e4ee43a62144076b6ffc6cf58fdb06233b542d6924db402205a2310f7fc382407c8466b5677691988a6dc2a0fe3f3b4c6bc1f1a01d1820e7901ffffffff02803fb66f0c03fa8211d4086ad2262e50ea5dd99f30603e9999603cdfac367c0000000049483045022100837fec21e7ba574c2283ec160bc418485f2dd6fbb5f5dd575156c41450e7deb6022058aefedcc08274f523c52981b69f124197a431580d5692c2a5f6e8af6bef594801ffffffff0af2f9ced5de00310114f70d6756db7df65205aeac26b5607bd71333812f68e40000000049483045022100d5fdd26ad4682b6aa2d522c1b75097f9cb3df94632e5cfc2454d79b76f9401660220193d741cc875e75cf04ad70de582915b14b41a6283967527e931c50565cdb62f01ffffffff071027000000000000302ea22c8020e39343ebe1b40dcc747d145f140983b38f230dcf7963f2b58051265c765f2efa81031210008203000401cc1027000000000000302ea22c8020d77058bfd93eebe366e1c82fc1475690fd290214ed43b8c9dd25374077b35cbe81031210008203000401cc40420f0000000000302ea22c8020d62369afdb9fbe16bae7a6ac394333e9337ecc0b7671cda491df2fa82e48a20d8103120c008203000401cc90230b0000000000232102f7711371604618bcb04458f01c829527a012f459da3c21ff44ee34dbc89e53a9ac2cb8993b00000000302ea22c802039452b774825750cd9390c3f05c96e486ecf2f21779466efbcd214220a7f288a8103120c008203000401cc102700000000000023210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ac0000000000000000a66a4ca3f2741a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf101210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06175cee52f7711371604618bcb04458f01c829527a012f459da3c21ff44ee34dbc89e53a9210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e0640420f00000000000000000000000000000000000000000000000000209d00000000000000000000000000
```

Output:

```
ff95e70f0d551748f460e61b7e75b279b8de355cb37df6c5895dfb8a49ee348a
```

#### Verify that the Tokens are Redeemed

Use the [tokenbalance](../../../basic-docs/antara/antara-api/tokens.html#tokenbalance) method to verify that the tokens are redeemed and available in the tutorial user's local wallet.

```bash
./komodo-cli -ac_name=USDKTEST tokenbalance 1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1
```

Output:

```json
{
  "result": "success",
  "CCaddress": "RTcbFr8dH9dPGgGephMoDevHefndQQehxq",
  "tokenid": "1a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1",
  "balance": 1000000
}
```

### Retrieve the KMD Coins on the KMD Smart Chain

Send the `KMD` tokens to the Gateways Module using the [gatewayswithdraw](../../../basic-docs/antara/antara-api/gateways.html#gatewayswithdraw) method.

Method structure:

`gatewayswithdraw bindtxid coin withdrawpub amount`

#### Details

- `gatewayswithdraw` — The name of the method, executed as-is
- `bindtxid` — The Gateway Module's `bindtxid`
- `coin` — Ticker of the `coin` deposited
- `withdrawpub` — The user's pubkey to which the `KMD` coins should be sent on the `KMD` chain
- `amount` — The `amount` to be sent

```bash
./komodo-cli -ac_name=USDKTEST gatewayswithdraw 50384e7668bd6908d8e0b67f1450c56f017186d802b1065c3258302a30b5adb2 KMD 03fa41b540b99161257c3a51e7c1598666361b739dce6a171d2d426255c92fb0e1 0.01
```

Output:

```json
{
  "hex": "0400008085202f89020012559aaf7b951b3cd33a29051dc1a185018ba8f1ad8a3f7778b48fa4dff8e9000000004847304402202b5a8c854de0d17a7fa47c8afa1b2d52c306eda1b5e0bb97fae59365351a9ecf02202d0468c2692036444d00a8312b866fe90af502a7235b7ee6bfa027dca50dcee401ffffffff8a34ee498afb5d89c5f67db35c35deb879b2757e1be660f44817550d0fe795ff020000007b4c79a276a072a26ba067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06814054a28d2f23721da7e5406db542178cc451c1232a2ee485cb429b3638cac5bc5b0bc61f242371fec25746d599f5186e6c24f21da4389391439a785e3c83ac15afa100af038001f2a10001ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc40420f0000000000302ea22c8020bed294e15cd2e327d2f1e6bcf55e2ebe571b7bc2e672363950ca680c8b89226381032210008203000401cc00000000000000009a6a4c97f2741a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1012103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb401350f157b2adb5302a3058325c06b102d88671016fc550147fb6e0d80869bd68764e3850034b4d442103fa41b540b99161257c3a51e7c1598666361b739dce6a171d2d426255c92fb0e140420f000000000000000000cc9f00000000000000000000000000",
  "result": "success"
}
```

Broadcast the hex value.

```bash
./komodo-cli -ac_name=USDKTEST sendrawtransaction 0400008085202f89020012559aaf7b951b3cd33a29051dc1a185018ba8f1ad8a3f7778b48fa4dff8e9000000004847304402202b5a8c854de0d17a7fa47c8afa1b2d52c306eda1b5e0bb97fae59365351a9ecf02202d0468c2692036444d00a8312b866fe90af502a7235b7ee6bfa027dca50dcee401ffffffff8a34ee498afb5d89c5f67db35c35deb879b2757e1be660f44817550d0fe795ff020000007b4c79a276a072a26ba067a56580210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06814054a28d2f23721da7e5406db542178cc451c1232a2ee485cb429b3638cac5bc5b0bc61f242371fec25746d599f5186e6c24f21da4389391439a785e3c83ac15afa100af038001f2a10001ffffffff031027000000000000302ea22c802091abda62a548f9c7f5beb19d16f01714ae3d4e526f3266fc8d347d6123f3d77b8103120c008203000401cc40420f0000000000302ea22c8020bed294e15cd2e327d2f1e6bcf55e2ebe571b7bc2e672363950ca680c8b89226381032210008203000401cc00000000000000009a6a4c97f2741a459712f1e79a544efdf55cfb3e111c5df3300a4da4d16cb3b963bbb50aebf1012103ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb401350f157b2adb5302a3058325c06b102d88671016fc550147fb6e0d80869bd68764e3850034b4d442103fa41b540b99161257c3a51e7c1598666361b739dce6a171d2d426255c92fb0e140420f000000000000000000cc9f00000000000000000000000000
```

Output:

```
62c6a41171cb428625c2d02d7e7077c4fea1e2b4aea839c549be54fc41150be5
```

The user will now receive the requested `KMD` coins in the address of the chosen pubkey.

### Liquidation

A user that does not yet have a pegs account (obtained via the [pegsfund](../../../basic-docs/antara/antara-api/pegs.html#pegsfund) and [pegsexchange](../../../basic-docs/antara/antara-api/pegs.html#pegsexchange) methods) can exchange the Pegs-related Smart Chain's coins for deposited tokens of another user's account whose debt ratio is in the "yellow zone" (`80%` to `90%`).

The [pegsworstaccounts](../../../basic-docs/antara/antara-api/pegs.html#pegsworstaccounts) method can be used to retrieve a list of all accounts that are in the "red zone" (where the debt ratio exceeds `90%`).

The [pegsliquidate](../../../basic-docs/antara/antara-api/pegs.html#pegsliquidate) method can be used to liquidate any of these accounts by repaying the account's outstanding debt using the Pegs-related Smart Chain's coins. This gives the executor of the method an immediate `5%` profit. <!-- Sidd: are we sure on the math here? If the executor sends 10% of the coins necessary to pay off the full debt, and receives 5% of the user's account's KMD, then that's a 50% profit. If the executor sends 90% of the coins necessary to pay off the full debt and receives 5% of the remaining coins in the KMD account, then that's a (5/90)% profit, which is heigher than 5% gcharang: similar comment in the Pegs doc; "The third-party user must deposit `USDK` to cover the user's whole debt (which is valued at 90% of the KMD tokens) according to current prices and will receive 95% of the KMD tokens which can be redeemed on the KMD chain and sold in an exchange for Profit" --> The remaining amount in the indebted user's account is disbursed to the Pegs Module for stablecoin price maintenance.
