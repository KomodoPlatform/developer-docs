# Basic Instructions

## Installing Basic Komodo Software

To install the Komodo daemon, `komodod`, and its necessary counterpart, `komodo-cli`, the simplest method is to [download and unzip pre-compiled executables](https://github.com/KomodoPlatform/komodo/releases). Once unpacked, the executables do not require installation. Simply find `komodod` and `komodo-cli` in the directory where you unzipped the files.

You may also build `komodod` and `komodo-cli` from source. This is not required, but it is considered the best practice. Building from source enables you to receive the latest patches and security upgrades the moment they are pushed to the `komodod` source.

You will find [a walkthrough on building from source here](https://docs.komodoplatform.com/komodo/install-Komodo-manually.html).

## Interacting with Komodo Chains

There are two cooperating pieces of software that the user utilizes when running a Komodo-compatible blockchain from the command line.

The first is the coin daemon itself, `komodod`. This is initiated by calling it from the command line and including any desired runtime parameters. When initiating any Komodo-compatible blockchain other than the main KMD blockchain, the user should also include the `-ac_name=COINNAME` and `-ac_supply=COINSUPPLY` parameters.

Once the software is set up, change into the installation directory.

<aside class="notice">
  Note to Windows Users: Replace ./komodod and ./komodo-cli with komodod.exe and komodo-cli.exe for each step.
</aside>

To launch the main KMD chain, execute:

`./komodod &` or `./komodod -daemon`

After the daemon launches, you may interact with it using `komodo-cli` like so:

`./komodo-cli API_COMMAND`

To launch another Komodo-based blockchain, include the necessary parameters. The list of launch parameters for each Komodod-based blockchain [is found here](https://github.com/VerusCoin/VerusCoin/blob/master/src/assetchains.old).

For example, to launch the DEX asset chain, execute:

`./komodod -pubkey=$pubkey -ac_name=DEX -ac_supply=999999 -addnode=78.47.196.146 $1 &`

<aside class="notice">
  IMPORTANT: Always execute the launch command EXACTLY as indicated, and as the asset-chain's developers instruct. Failure to do so will cause the blockchain's internal settings to malfunction, and you will have to reinstall and re-sync to regain access to the blockchain's network.
</aside>

To interact with the DEX daemon, use `komodo-cli` like so:

`./komodo-cli -ac_name=DEX API_COMMAND`

Detailed descriptions of all Komodo commands and parameters are provided below.

Also, in the terminal you can call the Komodo documentation by executing:

`./komodo-cli help`

To learn more via the terminal about a specific API command, execute:

`./komodo-cli help API_COMMAND`

```
./komodo-cli help getnewaddress
```

For more information about creating and interacting with asset chains, please visit our [asset-chain creation documentation](#komodo-asset-chain-basics).

Follow this link to find information on [accessing the coin daemon remotely](#accessing-the-coin-daemon-remotely).

<aside class="notice">
  In nearly all circumstances, a Komodo-based blockchain is only secure once it receives our dPoW security service. Please reach out to us when you are ready to purchase.
</aside>

## Komodo's Native DEX: BarterDEX

Komodo offers built-in native decentralized-exchange (DEX) compatibility through our software, BarterDEX. This software is separate from `komodod` and `komodo-cli`.

BarterDEX is a pioneer in atomic-swap based exchange methods. If you're not familiar with the concept of atomic-swaps, check out [Part III of our white paper](https://komodoplatform.com/whitepaper).

We performed our first atomic swap in 2014, and using our BarterDEX v1.0 software we performed thousands in 2017 with the open-source community before the concept gained attention in the news. To date, users in the Komodo ecosystem have conducted over 100,000 atomic swaps. We are currently taking what we learned from these experiences and rewriting the software from the ground up for v2.0.

Via our open-source philosophy, anyone is welcome to use BarterDEX without restriction. As it is based on atomic-swap technology, the end-users utilizing BarterDEX maintain ownership of their private keys at all times. Therefore, developers maintaining any cluster of traders utilizing the BarterDEX software are not acting in the capacity of an escrow-service, a trading provider, a centralized exchange, or even a multi-coin decentralized gateway, unlike most other exchanges. This provides significant relief from the developer's security responsibilities.

Because the BarterDEX software is separate from `komodod` and `komodo-cli`, at this time we do not yet include it in this API documentation. Rather, you may find [API documentation for BarterDEX here](https://docs.komodoplatform.com/barterDEX/barterDEX-API.html).
