# The Komodo Asset Chain

## About Asset Chains

A "Komodo asset chain" is an independent blockchain that is forked from Komodo technology and has the option of using Komodo's many services, including security and scalability.

We use the term, "asset chain," because the coins in the blockchain are assets owned by you and your blockchain's users.

The unique combination of technology in a Komodo asset chain grants businesses and developers an increased level of freedom.

Simply creating and developing the asset chain does not require contact with or payment to the Komodo team.

**However, under nearly all circumstances, an asset chain is not secure until it receives our dPoW connection to the Bitcoin hash rate (dPoW)**. Please reach out to our team whenever you are ready to enlist our services. Once set up, your blockchain will be secure enough to interact with other blockchains and exchanges, including fulfilling cross-chain smart contracts and conducting atomic swaps on our decentralized exchange.

For a full description of the nature of a Komodo asset chain, please [refer to our white paper](https://www.komodoplatform.com/whitepaper).

## Creating A New Asset Chain

### Requirements for Creating a New Chain

* 2 nodes with the ability to open ports (a node can be either a computer or a VPS)
* At least 4GB RAM each
* At least 2 CPU cores each
* 64-bit Operating System (Ubuntu 17.10 recommended)
* `komodod` built on each
  * (when the goal is only to build a new asset chain, there is no need to sync the KMD main chain)

### Notes on the Machinery Used to Create an Asset Chain

<aside class="success">
  When you are building and testing a Komodo asset chain, please do not hesitate to reach out to us when you are stuck. We wish to make this as easy as possible. Our support agents are available in our [Discord #support channel](https://komodoplatform.com/discord) for many hours each day, and during off hours you can file a ticket on [our support page](https://support.komodoplatform.com/support/home).
</aside>

<aside class="notice">
  The word "node" is used throughout this documentation, and it can be confusing for beginners. A node can be a unique desktop computer connected to the Internet. It can also be a virtual-private server (VPS) that is rented or purchased, and which the developer can access at will. Or, it can be another type of unique instance of a computational device.
</aside>

If you are ready to press forward with your first test asset chain, some basic knowledge about how to connect two "nodes" is recommended for the initial setup.

As per the original blockchain designs of Satoshi Nakamoto, on which Komodo is based, a Komodo-based asset chain does not exist on a single node. Rather, it exists via a connection between two or more nodes. This is the nature of decentralization: it is on the network we rely, rather than a single authority. Therefore, the design of the technology requires you to have two separate nodes, which are able to connect over a network.

In the most ideal circumstance, the new Komodo developer will already have two virtual private server boxes (VPS's) available for testing. VPS's can be cheap and easy to manage. A typical VPS will automatically have a static external IP; this makes it simple to create a connection between the two VPS nodes.

If the new developer does not have two VPS's available, setting up a test asset chain on two local machines in a home or office-type setting is still achievable, but it may require a little more troubleshooting.

If using a home or office-type setup, the challenge lies in the way the network is created, and there are myriad network setups.

For example, if the developers are operating on a local router, where the two machines are connected via wi-fi, the local ip addresses of the machines are harder to find. This is because the router assigns new local ip addresses to the machines each time they re-connect to the router. It is not possible to see the ip addresses from the Internet. In this situation, the developer must log into the router's software interface and search for the currently assigned local ip addresses.

A home or office-type setup can suffice, if you're just looking to test an asset chain quickly and don't want to spend money on a VPS. However, don't be surprised if you need to ask for help. Please reach out to us, and we will do what we can.

You will know that your machines have successfully connected when you can run the following command in the terminal of one of your machines:

`ping <insert ip address of your other machine here>`

This command will generate a response every second, indicating the `ping` speed with which your machines are able to connect.

`ping 192.168.1.101
PING 192.168.1.101 (192.168.1.101) 56(84) bytes of data.
64 bytes from 192.168.1.101: icmp_seq=1 ttl=64 time=131 ms
64 bytes from 192.168.1.101: icmp_seq=2 ttl=64 time=2.40 ms`

If you do not see a continuing response in the shell, your machines are not yet connected. Please reach out to our team and we will do our best to assist you.

## Part I: Creating a New Komodo Asset Chain

With your machines successfully able to `ping` each other, you are prepared to create your first asset chain.

The following instructions use the simplest possible set of parameters in creating a new asset chain: a coin with the ticker symbol `HELLOWORLD`, `777777` pre-mined coins, and a block reward of `.0001`.

On your first node, change into the directory where Komodo's `komodod` and `komodo-cli` are installed and execute the following commands in the terminal:

(Mac & GNU/Linux)

`./komodod -ac_name=HELLOWORLD -ac_supply=777777 -addnode=<IP address of the second node> &`

(Windows)

`./komodod.exe -ac_name=HELLOWORLD -ac_supply=777777 -addnode=<IP address of the second node> &`

After issuing this command in the terminal, you will find the p2p port in the terminal window.

`>>>>>>>>>> HELLOWORLD: p2p.8096 rpc.8097 magic.c89a5b16 3365559062 777777 coins`

In this case, the p2p port is `8096`.

This completes the first half of the asset-chain creation process.

Please refer to [Asset Chain Parameters](#asset-chain-parameters) for a full list of parameters to customize your initial blockchain state. Please also note the requirements for [`ac_supply`](#ac_supply), and instructions for using [`addnode`](#addnode) under various network conditions, including firewalls and LANs.

## Part II: Connecting the Second Node

On the second node you issue the same command, with two key differences. You will use the other node's IP address, and you will include an additional setting that initiates mining on this machine, `-gen -genproclimit=$(nproc)`.

`./komodod -ac_name=HELLOWORLD -ac_supply=777777 -addnode=<IP address of the first node> -gen -genproclimit=$(nproc) &`

Once the second node connects it will automatically mine blocks.

On a Komodo-based blockchain, all of the pre-mined coins are mined in the first block. Therefore, whichever machine executes the mining command will receive the entirety of the blockchain supply.

You can check the contents of the wallet by executing the following command in the terminal:

`./komodo-cli -ac_name=HELLOWORLD getwalletinfo`

More info can be found in the debug.log of the chain found at:

(Mac & GNU/Linux) `~/.komodo/HELLOWORLD/debug.log`

(Windows) `%appdata%\komodo\HELLOWORLD\debug.log`

## Querying the Asset Chain

Using the `komodo-cli` software, which is included in any default installation of `./komodod`, you can now execute many RPC calls and other commands on your new asset chain. This enables you to perform transactions, create and execute smart contracts, store data in KV storage, create cross-chain compatible contracts, conduct atomic swaps, etc.

Since the Komodo software began as a fork of Zcash and BTC, essentially all commands that are available on these two upstream blockchains are also available on your new asset chain.

Furthermore, a key purpose of the Komodo blockchain is the add features and functions that facilitate and enhance your development experience. Information regarding these many enhancements is available throughout this API documentation.

In addition, since you are building on a Komodo-based blockchain, you have easy access to our decentralized exchange (BarterDEX), our decentralized-ICO software, and our future upgrades.

## Example commands

On a KMD-based blockchain, the entire coin supply is mined in the first block. As soon as your machines connect in the steps above, your coin supply is distributed into the `wallet.dat` file of the machine that mined the first block. You can view this balance by executing the following command:

`./komodo-cli -ac_name=HELLOWORLD getbalance`

These are the coins that you will sell to your future customers.

To see general information about your new asset chain, execute this command:

`./komodo-cli -ac_name=HELLOWORLD getinfo`

The following command returns information about all available RPC and API commands:

`./komodo-cli -ac_name=HELLOWORLD help`

## Secure this Asset Chain with Delayed Proof of Work

Your new asset chain can receive the same security of the Bitcoin hash rate with a simple service from our KMD notary nodes, called "delayed Proof of Work" (dPoW).

There are two aspects to the cost for dPoW services. The first comes from the cost of making records in your asset chain's database, and in the records of the KMD main chain. These records are called "notarizations."

Notarizations are performed as transactions on your blockchain and on the main KMD blockchain. The transactions have messages included inside that indicate the most recent and secure state of your asset chain. Your blockchain will know how to recognize and rely on notarizations automatically.

Every ten to twenty minutes, our notary nodes will hash the history of your asset chain and insert it as a record into the KMD main chain. This provides an initial layer of security, but it is not the final layer.

In another ten to twenty minutes, all of the information in the KMD chain (including your asset chain's hashed data) is hashed and inserted into the BTC blockchain. Once your information is pushed into BTC, your asset chain will consider all notarized information effectively settled and immutable; only the recent, un-notarized transactions are still relying on your asset chain's raw consensus mechanism. [Click here to learn more about the types of consensus mechanisms you can choose on a KMD asset chain](#ac_staked). Thus, your asset chain will have all the power of Bitcoin securing your blockchain's history, with the zero-knowledge privacy of the Zcash parameters pre-installed, and all of the interoperability, scalability, and more that Komodo adds to your development experience.

As the notarizations are transactions, they naturally have a cost, and this cost is covered by you, the asset-chain developer. Over the course of a year, assuming consistent activity, the cost for performing these transactions is 300 KMD, and also 800 of your asset chain's coins.

The second part of the cost of notarization is the payment to the actual Komodo team, which is given in exchange for our services. You may reach out to our third-party service providers to receive a quote. @siu (Discord: @siu#3920) is the head of ChainMakers, and @PTYX (Discord: @PTYX#6840) is the head of Chainzilla. Both can provide different levels of service in asset-chain creation, electrum-server (SPV) setup and maintenance, explorer setup, and other decentralized-technology services.

Several teams have already signed up for our services and are developing on our platform. From our experience with them we can confidently say that our pricing is very affordable and competitive compared to other blockchain services. In several cases, creating a fully independent blockchain on Komodo costs but a small fraction of what it would cost to deploy a single smart contract on other blockchain platforms.

Please send any critique or feedback on this documentation to either @siddhartha, @Alright, or @gcharang on matrix or discord.

`Discord Invite <https://discord.gg/SCdf4eh>`_
