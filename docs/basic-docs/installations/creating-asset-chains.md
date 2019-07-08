# Creating Komodo Asset Chains

## Creating A New Asset Chain

### Requirements for Creating a New Chain

- 2 nodes with the ability to open ports (a node can be either a computer or a VPS)
- At least 4GB RAM each
- At least 2 CPU cores each
- 64-bit Operating System (Ubuntu 16.04 recommended)
- `komodod` built on each
  - (when the goal is only to build a new asset chain, there is no need to sync the KMD main chain)

::: tip
When you are building and testing a Komodo asset chain, please do not hesitate to reach out to us when you are stuck. We wish to make this as easy as possible. Our support agents are available in our <a href="https://komodoplatform.com/discord">#support channel in Discord</a> for many hours each day, and during off hours you can file a ticket on <a href="https://support.komodoplatform.com/support/home">our support page</a>.
:::

::: tip
The word "node" is used throughout this documentation, and it can be confusing for beginners. A node can be a unique desktop computer connected to the Internet. It can also be a virtual-private server (VPS) that is rented or purchased, and which the developer can access at will. Or, it can be another type of unique instance of a computational machine.
:::

### Basic Info for Connecting At Least Two Nodes

If you are ready to press forward with your first test asset chain, some basic knowledge about how to connect two nodes is recommended for the initial setup.

As per the original blockchain designs of Satoshi Nakamoto, on which Komodo is based, a Komodo asset chain does not exist on a single node. Rather, it exists via a connection between two or more nodes. This is the nature of decentralization: it is on the network we rely, rather than a single authority. Therefore, the design of the technology requires you to have two separate nodes, which are able to connect over a network.

In the most ideal circumstance, the new Komodo developer will already have two virtual private servers (VPS's) available for testing. VPS's can be cheap and easy to manage. A typical VPS will either have a static external IP or can be assigned one; this makes it simple to create a connection between the two VPS nodes.

If the new developer does not have two VPS's available, setting up a test asset chain on two local machines in a home or office-type setting is still achievable, but it may require a little more troubleshooting.

If using a home or office-type setup, the challenge lies in the way the network is created, and there are myriad network setups.

For example, if the developers are operating on a local router, where the two machines are connected via wi-fi, the local ip addresses of the machines are harder to find. This is because the router assigns new local ip addresses to the machines each time they re-connect to the router. It is not possible to see the ip addresses from the Internet. In this situation, the developer must log into the router's software interface and search for the currently assigned local ip addresses.

A home or office-type setup can suffice, if you're just looking to test an asset chain quickly and don't want to spend money on a VPS. However, don't be surprised if you need to ask for help. Please reach out to us, and we'll help the best we can.

To prepare for the next step, execute the following command in the terminal on both machines:

```bash
curl ifconfig.me
```

From the response, record the `ip address` value for additional use.

With the ip addresses available, we are now prepared to test the connection between the machines.

```bash
ping <insert the ip address of the other machine here>
```

This command will generate a response every second, indicating the `ping` speed with which your machines are able to connect.

```bash
$ ping 192.168.1.101

PING 192.168.1.101 (192.168.1.101) 56(84) bytes of data

64 bytes from 192.168.1.101: icmp_seq=1 ttl=64 time=131 ms

64 bytes from 192.168.1.101: icmp_seq=2 ttl=64 time=2.40 ms

```

If you do not see a similar response in the shell, your machines are not able to connect. Please reach out to our team and we will do our best to assist you.

## Part I: Creating a New Komodo Asset Chain

With your machines successfully able to `ping` each other, you are ready to create your first asset chain.

The following instructions use the simplest possible set of parameters in creating a new asset chain: a coin with the ticker symbol `HELLOWORLD`, `777777` pre-mined coins, and a block reward of `.0001`.

On your first node, change into the directory where Komodo's `komodod` and `komodo-cli` are installed and execute the following commands in the terminal:

#### Mac & GNU/Linux

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -addnode=<IP address of the second node> &
```

#### Windows

```bash
./komodod.exe -ac_name=HELLOWORLD -ac_supply=777777 -addnode=<IP address of the second node> &
```

### Verify the Response

After issuing this command in the terminal on both machines, you will find the p2p port in the terminal window.

```bash
>>>>>>>>>> HELLOWORLD: p2p.8096 rpc.8097 magic.c89a5b16 3365559062 777777 coins
```

In the above string, take note of the p2p and rpc ports, as well as the magic number. These values must match on both nodes for the chains to be identical. If they are not the same, verify that the launch command is the same on both the nodes.

In the example above, the p2p port is `8096`. Make sure that the p2p port is open to the internet or any other network from which the second node connects.

This completes the first half of the asset-chain creation process. Scroll down to [Part II](../installations/creating-asset-chains.html#part-ii-connecting-the-second-node).

::: tip
Please refer to [Asset Chain Parameters](../installations/asset-chain-parameters.html) for a full list of parameters to customize the characteristics of your blockchain.
:::

::: tip
Please note the requirements for [ac_supply](../installations/asset-chain-parameters.html#ac-supply), and instructions for using [addnode](../installations/common-runtime-parameters.html#addnode) under various network conditions, including firewalls and LANs.
:::

## Part II: Connecting the Second Node

On the second node you issue the same command, but with a key difference. This time, use the first node's IP address.

```bash
./komodod -ac_name=HELLOWORLD -ac_supply=777777 -addnode=<IP address of the first node> &
```

Once the daemon loads, compare the string that starts with `>>>>>>>>>>` in the second node to the one from the first node to make sure they are identical.

Mining can be started on a node using the following command:

```bash
./komodo-cli -ac_name=HELLOWORLD setgenerate true $(nproc)
```

`$(nproc)` in the above command makes the daemon mine using all the available CPU threads, which might be necesary in a low end VPS.

On a Komodo-based blockchain, all of the pre-mined coins are mined in the first block. Therefore, whichever machine executes the mining command will receive the entirety of the blockchain's pre-mined coin supply, as set in the [ac_supply](../installations/asset-chain-parameters.html#ac-supply) parameter. Upon mining the first block, these coins are available in the default `wallet.dat` file.

To collect all the mining rewards from the node to a single address, execute the following commands before issuing the `setgenerate` command:

```bash
# Get a new address
newaddress=$(./komodo-cli -ac_name=HELLOWORLD getnewaddress)

# Get the corresponding pubkey
pubkey=$(./komodo-cli -ac_name=HELLOWORLD validateaddress $newaddress | jq -r '.pubkey' )

# Indicate the pubkey to the daemon
./komodo-cli -ac_name=HELLOWORLD setpubkey $pubkey
```

After issuing the mining command is issued, can check that the two nodes are connected by using the following command:

```bash
./komodo-cli -ac_name=HELLOWORLD getinfo | grep connections
```

If the nodes are properly connected, both nodes will respond with: `"connections": 1`

These are the coins you will later distribute to your community, using either our native DEX, [BarterDEX](../installations/basic-instructions.html#komodo-s-native-dex-barterdex), or our decentralized-ICO software (coming soon), or on any other third-party exchange.

You can check the contents of the wallet by executing the following command in the terminal:

```bash
./komodo-cli -ac_name=HELLOWORLD getwalletinfo
```

To verify that everything is properly initiated, send a few coins from the second node to the first node:

<collapse-text hidden title="Commands">

### Node1

```bash
newaddress=$(./komodo-cli -ac_name=HELLOWORLD getnewaddress)
echo $newaddress
# Copy the returned address for use on the other node
```

### Node2

```bash
# Send ten coins to the address generated on the first node
./komodo-cli -ac_name=HELLOWORLD sendtoaddress Address_from_the_first_node 10
```

### Node1

```bash
./komodo-cli -ac_name=HELLOWORLD getreceivedbyaddress <insert address_from_the_first_node> 0
# The 0 argument in the above command instructs the daemon to include the unconfirmed coin balance in the response
```

</collapse-text>

More info can be found in the debug.log of the chain found at:

- **MacOS:** `~/.komodo/HELLOWORLD/debug.log`
- **Windows:** `%appdata%\komodo\HELLOWORLD\debug.log`
- **GNU/Linux:** `~/.komodo/HELLOWORLD/debug.log`

## Querying the Asset Chain

Using the `komodo-cli` software, which is included in any default installation of `komodod`, you can now execute many commands on your new asset chain. This enables you to perform transactions, create and execute smart contracts, store data in KV storage, etc.

Since the Komodo software began as a fork of Zcash and BTC, essentially all commands that are available on these two upstream blockchains are also available on your new asset chain.

Furthermore, a key purpose of the Komodo blockchain is to create features and functions that facilitate and enhance your development experience. Information regarding these enhancements is available throughout this documentation.

In addition, since you are building on a Komodo-based blockchain, you have easy access to our multi-coin wallet, [Agama](https://komodoplatform.com/komodo-wallets/#desktop-agama), our atomic-swap powered decentralized exchange, [BarterDEX](../installations/basic-instructions.html#komodo-s-native-dex-barterdex), our decentralized-ICO software (coming soon), and our future upgrades.

## Example commands

To see general information about your new asset chain, execute this command:

`./komodo-cli -ac_name=HELLOWORLD getinfo`

The following command returns information about all available rpc and API commands:

`./komodo-cli -ac_name=HELLOWORLD help`

## Secure this Asset Chain with Delayed Proof of Work

Your new asset chain can receive the same security of the Bitcoin hash rate through our security mechanism, called "delayed Proof of Work" (dPoW).

There are two aspects to the cost for dPoW services. The first comes from the cost of making records in your asset chain's database, and in the records of the KMD main chain. These records are called "notarizations."

Notarizations are performed as transactions on your blockchain and on the main KMD blockchain. The transactions have messages included inside that indicate the most recent and secure state of your asset chain. Your Komodo asset chain will know how to recognize and rely on notarizations automatically.

Every ten to twenty minutes, our notary nodes will hash the history of your asset chain and insert it as a record into the KMD main chain. This provides an initial layer of security, but it is not the final layer.

In another ten to twenty minutes, all of the information in the KMD chain (including your asset chain's hashed data) is hashed and inserted into the BTC blockchain. Once your information is pushed into BTC, your asset chain will consider all notarized information effectively settled and immutable; only the recent, un-notarized transactions are still relying on your asset chain's raw consensus mechanism. [Click here to learn more about the types of consensus mechanisms you can choose on a KMD asset chain](../installations/asset-chain-parameters.html#ac-staked).

Thus, your asset chain will have all the power of Bitcoin securing your blockchain's history, with the zero-knowledge privacy of the Zcash parameters pre-installed, and all of the interoperability, scalability, and more that Komodo adds to your development experience.

As the notarizations are transactions, they naturally have a cost, and this cost is covered by you, the asset-chain developer. Over the course of a year, assuming consistent activity, the cost for performing these transactions is 365 KMD, and also 365 of your asset chain's coins.

There are extra costs involved that are aimed to compensate the Notary Nodes for the setup and maintainance of the dPOW service. You may reach out to our third-party service providers to receive a quote. siu (Discord: @siu#3920) is the head of ChainMakers, and PTYX (Discord: @PTYX#6840) is the head of Chainzilla. Both can provide various services related to asset-chain creation, electrum-server (SPV) setup and maintenance, explorer setup, and other blockchain services.

Several teams have already signed up for our services and are developing on our platform. From our experience with them we can confidently say that our pricing is competitive compared to other blockchain services. Furthermore, when considering that a Komodo-based asset chain does not require KMD for gas and transaction fees, the cost to your end-users can be exponentially cheaper. All things considered, creating a fully independent blockchain on Komodo can cost but a small fraction of what it would cost to deploy a single smart contract on the platforms of some of our competitors.

### A Note About Low-Activity Blockchains

The Komodo security system, dPoW, functions best for asset chains that are being actively used. If there is an end-user performing a transaction every minute on average, dPoW should function as normal. This includes hashing the asset chain's most recent state and inserting it into the KMD blockchain every ten to twenty minutes on average (and from there, a hash protecting this data is soon pushed into the Bitcoin blockchain).

Many blockchains will not be used on a regular basis, however. The developers also may not elect to have any block rewards that would act as an incentive for miners to maintain activity on the chain.

It is not economically efficient to notarize every single block that occurs. Therefore Komodo's dPoW security system requires several blocks to be generated before a notarization takes place. Without activity or miners, the notarization process naturally will stall.

This creates a situation which is easily remedied, but only if the developer is proactive to maintain activity on their chain. We advise asset-chain developers who do not expect frequent transaction volume to ensure activity at crucial moments. If a transaction occurs on the blockchain from an end-user, for which notarization security is required, a simple solution can be to have a node running a script to watch for such transactions. When the transaction enters the mempool, the node can perform minimum-amount transactions until the end-user's transaction is notarized, and then the script can cease activity.

The amount it costs the developer to perform these occasional minimum-amount transactions is far cheaper than it would cost the developer to have the asset chain notarized every ten to twenty minutes on an inactive chain.
