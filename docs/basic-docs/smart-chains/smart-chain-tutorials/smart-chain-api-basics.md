# Smart Chain API Basics

## API Tutorials: Introduction

The following tutorial can assist in gaining hands-on experience with the essential Smart Chain API.

In this tutorial, we create two new blockchains, called RT1 & RT2. 

The first blockchain, RT1, demonstrates the fundamental API concepts, such as how to create and utilize a simple test blockchain, how to query a blockchain for data, etc.

The RT2 blockchain demonstrates the creation of a custom application-specific blockchain that <!--Sidd: Mylo, your original sentence cut off here -->

For simplicity's sake, we use the blockchain [<b>regtest</b>](../installations/common-runtime-parameters.html#regtest) feature, which allows us to run a blockchain on a single node without having to connect to a network. 

After the tutorial, the developer should be able to repeat the same concepts on live and fully functional Komodo Smart Chains, assuming the Smart Chain in question has the proper CC features enabled.

#### Tutorial Topics Outline

Topics covered in this tutorial include:

- How to create a simple Smart Chain for testing purposes
- How to execute a komodo-cli command to query the blockchain for existing data
- How to execute a curl command for the same purpose
- Understanding common API methods ("RPC's")
- Understanding common technology concepts in the Komodo ecosystem


### Tutorial Prerequisites

#### komodod and komodo-cli

The following tutorials assume that you have already [compiled the Komodo daemon](https://docs.komodoplatform.com/komodo/installation.html), and that you have used the default `~/komodo/src` directory as the root Komodo software directory.

As with all software related to `komodod`, at the command line we use the terminal-based `komodo-cli` software, and the `curl` command, to access the daemon. 

## Komodo API Fundamentals Tutorial

### Create a Regtest Blockchain

The quickest way to establish your own development environment is to use the [<b>regtest</b>](../installations/common-runtime-parameters.html#regtest) feature. 

In regtest mode, the daemon creates a blockchain that is almost fully functional, save for a few exceptions. Two of the exceptions are that the chain runs on a single host, and the user instructs the daemon on when and how to perform new blocks (as opposed to receiving new blocks from a decentralized network of miners).

The command to create our `RT1` regtest chain is as follows:

```bash
./komodod -regtest -ac_name=RT1 -ac_supply=1000 &
```

##### ac_supply

Note the `-ac_supply=1000` argument. This is the total number of coins we desire when the blockchain spawns. 

For more information, refer to the [<b>ac_supply</b>](../installations/asset-chain-parameters.html#ac-supply) launch parameter.

##### ac_name

Also note the `-ac_name=RT1` argument. This is the blockchain ticker name we desire. For more information, refer to the [<b>ac_name</b>](../installations/asset-chain-parameters.html#ac-name) launch parameter.

There are many additional parameters that you can explore later in the [Smart Chain Parameters](../installations/asset-chain-parameters.html) documentation.

##### Observe the Response

The daemon will return a response similar to the following: 

```
[1] 22892
ASSETCHAINS_SUPPLY 1000
MAX_MONEY 106320417438 1063.20417438
Created (/home/mylo/.komodo/RT1/RT1.conf)
call komodo_args.(./komodod) NOTARY_PUBKEY.()
>>>>>>>>>> RT1: p2p.13100 rpc.13101 magic.fd772ab9 4252445369 1000 coins
initialized RT1 at 1555581638
finished loading blocks RT1
fAddressIndex.0/0 fSpentIndex.0/0
height.0 slowflag.1 possible.1 cmp.0
```

From the response, note the following information:

##### Smart Chain Supply

```
ASSETCHAINS_SUPPLY 1000
```

We see the 1000 coin initial supply.

##### Configuration File Location

```
Created (/home/mylo/.komodo/RT1/RT1.conf)
```

This is the location of the configuration file.

Placing the configuration data here follows the Komodo convention of placing all relevant data for a Smart Chain in a subdirectory contained in the `~/.komodo/` directory. The new subdirectory for our regtest chain is named after the `RT1` value we gave to the `ac_name` parameter.

##### Relevant RPC Data

```
>>>>>>>>>> RT1: p2p.13100 rpc.13101 magic.fd772ab9 4252445369 1000 coins
``` 

This information is the blockchain name, its network ports used for p2p (13100), and RPC control (13101).  The magic number is a number the Komodo daemon uses for network purposes, and the number of coins is informational.

##### Explanation of All Initial Daemon Output

Here is an explanation of all of the output, as it appears in the above response. Many of the actual values will be different on your machine, although the underlying purpose of the value is the same.

| Value | Description |
| ----- | ----------- |
| [1] 22892 | the process number; the value is dependent on your machine and will be different | 
| ASSETCHAINS_SUPPLY 1000 | the number of coins when the blockchain initiates for its first time |
| MAX_MONEY 106320417438 1063.20417438 | this value is not important at this time; it states that 100 billion coins is the maximum possible amount the blockchain can mathematically support |
| Created (/home/mylo/.komodo/RT1/RT1.conf) | the location of the configuration file |
| call komodo_args.(./komodod) NOTARY_PUBKEY.() | this value specifies where the new coins from block rewards are sent; by default, the coins will be sent to your node's local wallet |
| >>>>>>>>>> RT1: p2p.13100 rpc.13101 magic.fd772ab9 4252445369 1000 coins | the blockchain name, its network ports and RPC controls; the magic number is used in Komodo networking and the number of coins derives from the <b>ac_supply</b> parameter included at runtime |  
| initialized RT1 at 1555581638 | the time in seconds, past epoch, when the blockchain was initialized | 
| finished loading blocks RT1 | informational |
| fAddressIndex.0/0 fSpentIndex.0/0 | informational and can be ignored for now |
| height.0 slowflag.1 possible.1 cmp.0 | informational and can be ignored for now |

### Querying the Blockchain Using komodo-cli

With the regtest Smart Chain operational we are prepared to execute our first API call. 

#### Access a Daemon via komodo-cli on a Smart Chain

When using `komodo-cli` to access the daemon of a Smart Chain, we must add an additional argument to each terminal input.

This required argument is the name of the Smart Chain for which the user desires `komodo-cli` to connect. The name is provided in the same format used to launch the chain. 

In our tutorial, the argument is: `-ac_name=RT1`

Furthermore, as we are using the regtest feature, we must also include the `-regtest` argument with each terminal input.

Therefore, each `komodo-cli` terminal input will begin with the following:

```bash
./komodo-cli -regtest -ac_name=RT1 INSERT_API_CALL_HERE INSERT_ARGUMENTS_HERE
```

#### Using the getinfo API Method

The [<b>getinfo</b>](../komodo-api/control.html#getinfo) API method does not require any additional parameters when called and provides useful information about our chain.

To execute the method in the terminal we can use the `komodo-cli` software.

#### Command

```bash
./komodo-cli -regtest -ac_name=RT1 getinfo
```

#### Response

```json
{
  "version": 2001526,
  "protocolversion": 170007,
  "KMDversion": "0.3.3b",
  "notarized": 0,
  "prevMoMheight": 0,
  "notarizedhash": "0000000000000000000000000000000000000000000000000000000000000000",
  "notarizedtxid": "0000000000000000000000000000000000000000000000000000000000000000",
  "notarizedtxid_height": "mempool",
  "KMDnotarized_height": 0,
  "notarized_confirms": 0,
  "walletversion": 60000,
  "balance": 0.00000000,
  "blocks": 0,
  "longestchain": 0,
  "timeoffset": 0,
  "tiptime": 1296688602,
  "connections": 0,
  "proxy": "",
  "difficulty": 1,
  "testnet": false,
  "keypoololdest": 1555581641,
  "keypoolsize": 101,
  "paytxfee": 0.00000000,
  "relayfee": 0.00000100,
  "errors": "",
  "name": "RT1",
  "sapling": -1,
  "p2pport": 13100,
  "rpcport": 13101,
  "magic": -42521927,
  "premine": 1000
}
```

Note the `blocks` count of zero `0` and the `balance` sum of `0`. While our regtest chain's daemon is operational, we have yet to mine the genesis block and collect the initial coin value. 

### Querying the Blockchain Using curl

Alternatively, we can execute the [<b>getinfo</b>](../komodo-api/control.html#getinfo) method using the Unix `curl` command. 

##### Sourcing the Configuration File

The `curl` command will also need information about which Smart Chain daemon the user desires to connect. However, the `curl` command will receive these instructions in a different manner.

The user must provide the `myrpcuser`, `myrpcpassword`, and `myrpcport` values from the Smart Chain's configuration file.

The configuration file is automatically generated on Smart Chain creation, and is formatted for use with the Unix `source` command. 

To import all values into our terminal process environment, execute the following:

```bash
source ~/.komodo/RT1/RT1.conf
```

We can test that the variables were loaded correctly with the following commands:

```bash
echo $rpcuser $rpcpassword $rpcport
```

The terminal should return the values from the configuration file. 

##### Executing the curl Command

With these variables set we can now easily use the `curl` command to execute the `getinfo` API method:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

We execute the `curl` command with `-s` silent option; this mutes irrelevant response data.

The `$rpcuser:$rpcpassword` and the `...$rpcport` arguments utilize our sourced environment variables.

The HTTP header `-H`, `--data-binary`, and `content-type: text/plain;` arguments instruct `curl` to reply with a json object.

Without further intervention, the returned json response will be unformatted and difficult to read.

To improve readability, the developer may optionally install and utilize the `jq` terminal software.

[Link to download and install <b>jq</b>](https://stedolan.github.io/jq/download/)

Once installed, add a `|` pipe and a ` jq '.'` reference at the end of the curl command:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getinfo", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

This should return a well formatted json object.

## Preparing Your Local Wallet

The wallet is not part of the blockchain. Rather, it is a separate application that tracks your private keys and grants access to them upon user request. This separate application is built into the Komodo daemon and can be accessed using the API. 

Common API commands include the following:

| Command | Description |
| ------- | ----------- |
|[<b>getnewaddress</b>](../komodo-api/wallet.html#getnewaddress) | get a new address |
| [<b>validateaddress</b>](../komodo-api/util.html#validateaddress) | get the public key of the new address; used often when developing a custom application-specific blockchain |
| [<b>dumpprivkey</b>](../komodo-api/wallet.html#dumpprivkey) | get the private key of an address |

We save details from each response, so that we may avoid continually obtaining new wallet keys.

The next two sections demonstrate how to obtain a new private key. The first section uses `komodo-cli` software, and the second section repeats the same API steps using the `curl` command.

### Preparing Your Wallet Using komodo-cli

#### getnewaddress

To obtain a new address, we use the `getnewaddress` API method:

```bash
./komodo-cli -regtest -ac_name=RT1 getnewaddress
```

Response:

```json
RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs
```

Your response will be a different address of the same format.

#### validateaddress

To obtain the public key, also called the "pubkey", we use the `validateaddress` API method.

```
./komodo-cli -regtest -ac_name=RT1 validateaddress RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs
```

Response:

```
{
  "isvalid": true,
  "address": "RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs",
  "scriptPubKey": "76a91457afccfe042ee068257f95873e1fd3cd4aa210ad88ac",
  "segid": 28,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "0350dd9b828e92600166dd74e521ac8510eb39064dfb30111c990396864542ce56",
  "iscompressed": true,
  "account": ""
}
```

Make a note of the `pubkey` value. We will use it towards the end of the tutorial.

#### dumpprivkey

Use the response from `getnewaddress` as an argument for the `dumpprivkey` API method.

```bash
./komodo-cli -regtest -ac_name=RT1 dumpprivkey RWbzxx8tKncvcVBzBCetMsPRrcB3YFsXhw
```

```json
REDACTED_FOR_TUTORIAL
```
The response is the private key for this address.

The private key should never be shared under any circumstances. We have redacted the response for this tutorial.

### Preparing Your Wallet Using curl

#### getnewaddress

A `curl` command to obtain a new address using the `getnewaddress` API method.

##### Command

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getnewaddress", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

##### Response

```json
{
  "result": "RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B",
  "error": null,
  "id": "curltest"
}
```

#### validateaddress

A `curl` command to obtain the `pubkey` using the `validateaddress` API method.

##### Command

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "validateaddress", "params": ["RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

##### Response

```json
{
  "result": {
    "isvalid": true,
    "address": "RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B",
    "scriptPubKey": "76a914fd3ca56e0dc10a080c1d351b42c75bd82fc76d2288ac",
    "segid": 56,
    "ismine": true,
    "iswatchonly": false,
    "isscript": false,
    "pubkey": "03cb108cdb893a4a6c72c2fe23768929ada335103c6fa2bea428f5204bd051dacc",
    "iscompressed": true,
    "account": ""
  },
  "error": null,
  "id": "curltest"
}
```

#### dumpprivkey

A `curl` command to obtain the `pubkey` using the `validateaddress` API method.

##### Command

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "dumpprivkey", "params": ["RYNBgpcanNdfy4oGLbnVYnPPtu5JWcZM8B"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

##### Response

```json
{
  "result": "REDACTED_FOR_TUTORIAL",
  "error": null,
  "id": "curltest"
}
```

## Generating Blocks and Getting the New Coins

When connecting to an existing blockchain that already has a populated network of miners or stakers, the user does not need to be concerned about how blocks are generated.

However, in this tutorial we are running a regtest chain, and therefore we must instruct the daemon to generate new blocks.

This also provides us with a useful opportunity to discuss the nature of simple mining in the Komodo ecosystem. The methods we discuss here reflect mining on a proof-of-work based Smart Chain. 

The reader should be aware that Komodo also offers proof-of-stake mining, and hybrid models that blend proof-of-work with proof-of-stake. For more information, the reader may turn to the [<b>ac_staked</b>](../installations/asset-chain-parameters.html#ac-staked) feature.

Here are several common API methods for mining:

| Command | Description |
| ------- | ----------- |
| [generate](../komodo-api/generate.html#generate) | the number of blocks to generate |
| [getblock](../komodo-api/blockchain.html#getblock) | query information about a block |
| [gettransaction](../komodo-api/wallet.html#gettransaction) | query a transaction |

In a moment, we will use these commands to generate new blocks on our regtest chain, and in the process of generating, the blockchain will create new coins.

#### Understanding the Coinbase Transaction

The reader should be aware of the manner in which a blockchain creates new coins. 

When a blockchain initiates for the first time, and before it has mined the first block, the total sum of coins on the blockchain is always `0`. 

To add coins into the total coin supply, the blockchain must mint new coins. This minting process occurs in a special transaction that is included as the first transaction in each block of the blockchain. 

This transaction is called the `coinbase` transaction.

While every other transaction on the blockchain can only take coins from the existing supply, the `coinbase` transaction may create new coins from nothing.

These new coins can be sent to any number of locations. The rules of the blockchain, as set by the blockchain's developer, determine how many coins are minted, and who receives the coins. 

For more information about how to customize your `coinbase` transactions on a Komodo Smart Chain, observe the many different customization parameters in the [Custom Smart Chain Parameters](../installations/asset-chain-parameters.html#ac-name) documentation.

For example, read about [<b>ac_reward</b>](../installations/asset-chain-parameters.html#ac-reward), [<b>ac_eras</b>](../installations/asset-chain-parameters.html#ac-eras), [<b>ac_founders</b>](../installations/asset-chain-parameters.html#ac-founders), and many others.

In our tutorial, when we mine our first block, all of the `1000` new coins we indicated will be mined in the first block's `coinbase` transaction. By default, these coins are distributed immediately into our own local wallet. 

### Generating Blocks Using komodo-cli

#### generate

We now generate a few blocks using the `generate` API method.

##### Command

```bash
./komodo-cli -regtest -ac_name=RT1 generate 2
```

##### Response

```json
[
  "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
  "0de2bb48b3a3ef47d5ece90b1ffeccc81b9609879ab86cc03a77cf248adea25d"
]
```

The response contains an array of blockhashes. These are the hashes of the blocks generated.

#### getblock

To inspect the particular information about any given block, we use the `getblock` API method and include our desired blockhash as an argument.

```bash
./komodo-cli -regtest -ac_name=RT1 getblock 0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab
```

Alternatively, with `getblock` we can instead include the desired block `height` of the block we wish to inspect. 

In our case, we desire to inspect the genesis block, which is the first block ever mined on our Smart Chain. Therefore, the block `height` will be `1`.

##### Command

```bash
./komodo-cli -regtest -ac_name=RT1 getblock 1
```

##### Response

```json
{
  "hash": "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
  "confirmations": 2,
  "rawconfirmations": 2,
  "size": 276,
  "height": 1,
  "version": 4,
  "merkleroot": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
  "segid": -1,
  "finalsaplingroot": "3e49b5f954aa9d3545bc6c37744661eea48d7c34e3000d82b7f0010c30f4c2fb",
  "tx": [
    "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"
  ],
  "time": 1555589136,
  "nonce": "0000d66a538f8cc7de721633f23e5d52649e5031a3f0a90e9821189e5b530056",
  "solution": "01de6014269f75bae931362838b75c5fc3e318c620d2a203d65b9d52691b3d056ae753fc",
  "bits": "200f0f0f",
  "difficulty": 1,
  "chainwork": "0000000000000000000000000000000000000000000000000000000000000022",
  "anchor": "59d2cde5e65c1414c32ba54f0fe4bdb3d67618125286e6a191317917c812c6d7",
  "blocktype": "mined",
  "valuePools": [
    {
      "id": "sprout",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0,
      "valueDelta": 0.00000000,
      "valueDeltaZat": 0
    },
    {
      "id": "sapling",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0,
      "valueDelta": 0.00000000,
      "valueDeltaZat": 0
    }
  ],
  "previousblockhash": "029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327",
  "nextblockhash": "0de2bb48b3a3ef47d5ece90b1ffeccc81b9609879ab86cc03a77cf248adea25d"
}
```

Note in the response the `tx` value.

```json

    ...

  "tx": [
    "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"
  ],

    ...

```

This value is an array containing all transactions performed within this block. Because it is the genesis block, and because we did not send any transactions on our blockchain, the only transaction is our `coinbase` transaction, wherein the `1000` coins were minted and sent to our local wallet.

#### gettransaction

To observe this transaction, we use the [<b>gettransaction</b>](../komodo-api/wallet.html#gettransaction) API method.

##### Command

```bash
./komodo-cli -regtest -ac_name=RT1 gettransaction 4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006
```

##### Response

```json
{
  "amount": 1000.07809721,
  "rawconfirmations": 2,
  "generated": true,
  "confirmations": 2,
  "blockhash": "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
  "blockindex": 0,
  "blocktime": 1555589136,
  "expiryheight": 0,
  "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
  "walletconflicts": [
  ],
  "time": 1555589136,
  "timereceived": 1555589136,
  "vjoinsplit": [
  ],
  "details": [
    {
      "account": "",
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "category": "generate",
      "amount": 1000.07809721,
      "vout": 0,
      "size": 98
    }
  ],
  "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff01b912ee4817000000232103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac1068b85c"
}
```

Note that the `amount` value is slightly higher than `1000`. This is normal. It is due to the internal mathematical complexities of a blockchain.

### Generating Blocks Using curl

#### generate

We have already generated the genesis block. The following is a sample of using `curl` with the `generate` API method to generate 5 blocks.

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "generate", "params": [5]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

<collapse-text hidden title="Response">
```json
{
  "result": [
    "0561e5c9e81ff8823be080af1232a99c87c41cb208595da20cf461b4ed34f0a9",
    "0792db3d6976c16ead4c42d4a3fc949931979a0120aefb822b632758fb1968d4",
    "0975e3320f31cc4e06bb6cfba74ae6762517421535f3c1440c6e4c41cb2428df",
    "01102d09117d797253899b5b1a68a66d552e30fcc0fa964b4ab64005acfecf0b",
    "02f1df412f56aee2ea94380e7c59c10ed089481b3a37dc73b9c78577b73ce9f1"
  ],
  "error": null,
  "id": "curltest"
}
```
</collapse-text>

#### getblock

Here is a sample of using `curl` with the `getblock` API method on the blockhash of the genesis block.

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

To use the block `height` instead, the `curl` command is formatted as follows.

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblock", "params": ["1"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

<collapse-text hidden title="Response">

```json
{
  "result": {
    "hash": "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
    "confirmations": 2,
    "rawconfirmations": 2,
    "size": 276,
    "height": 1,
    "version": 4,
    "merkleroot": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
    "segid": -1,
    "finalsaplingroot": "3e49b5f954aa9d3545bc6c37744661eea48d7c34e3000d82b7f0010c30f4c2fb",
    "tx": [
      "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"
    ],
    "time": 1555589136,
    "nonce": "0000d66a538f8cc7de721633f23e5d52649e5031a3f0a90e9821189e5b530056",
    "solution": "01de6014269f75bae931362838b75c5fc3e318c620d2a203d65b9d52691b3d056ae753fc",
    "bits": "200f0f0f",
    "difficulty": 1,
    "chainwork": "0000000000000000000000000000000000000000000000000000000000000022",
    "anchor": "59d2cde5e65c1414c32ba54f0fe4bdb3d67618125286e6a191317917c812c6d7",
    "blocktype": "mined",
    "valuePools": [
      {
        "id": "sprout",
        "monitored": true,
        "chainValue": 0,
        "chainValueZat": 0,
        "valueDelta": 0,
        "valueDeltaZat": 0
      },
      {
        "id": "sapling",
        "monitored": true,
        "chainValue": 0,
        "chainValueZat": 0,
        "valueDelta": 0,
        "valueDeltaZat": 0
      }
    ],
    "previousblockhash": "029f11d80ef9765602235e1bc9727e3eb6ba20839319f761fee920d63401e327",
    "nextblockhash": "0de2bb48b3a3ef47d5ece90b1ffeccc81b9609879ab86cc03a77cf248adea25d"
  },
  "error": null,
  "id": "curltest"
}
```
</collapse-text>

#### gettransaction

Here is the `curl` command to retrieve the first block's `coinbase` transaction.

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "gettransaction", "params": ["4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006"]}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

<collapse-text hidden title="Response">
```json
{
  "result": {
    "amount": 1000.07809721,
    "rawconfirmations": 2,
    "generated": true,
    "confirmations": 2,
    "blockhash": "0d2701895c90f48d80156fbe349bda661c80f38ad6b75acc2294763e348b4eab",
    "blockindex": 0,
    "blocktime": 1555589136,
    "expiryheight": 0,
    "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
    "walletconflicts": [],
    "time": 1555589136,
    "timereceived": 1555589136,
    "vjoinsplit": [],
    "details": [
      {
        "account": "",
        "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
        "category": "generate",
        "amount": 1000.07809721,
        "vout": 0,
        "size": 98
      }
    ],
    "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff01b912ee4817000000232103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac1068b85c"
  },
  "error": null,
  "id": "curltest"
}
```
</collapse-text>


## Inspecting the wallet

We have generated blocks and received the value from the `coinbase` transactions. Now, we would like to inspect the contents of our wallet. We will execute the [<b>listunspent</b>]() method for this purpose. 

However, before we execute this command, the reader should familiarize themselves with the way a blockchain stores value in a wallet. The title of the technical concept to understand is, <b>"utxo."</b> This stands for "unspent transaction." 

The way a utxo works is often difficult to understand for newcomers to blockchain technology. We have provided an article that explains this concept in more detail here, and we recommend the reader study it before proceeding.

[Click Here to Read Our Explanation of the Utxo](https://komodoplatform.com/whats-utxo/)

Also, the reader may turn to Chapter 6, Section 3 of the Komodo whitepaper. Search for the section titled, <u>"The Utxo: An elusive, yet fundamental concept."</u>

[Click Here to Read the Komodo Whitepaper; Search for Chapter 6, Section 3](https://komodoplatform.com/whitepaper)

In blockchain technology, all value is contained within utxos. Every transaction consumes a utxo and creates new utxos.

Once you are comfortably familiar with the concept, you are prepared to continue with the tutorial.

### Listing Unspent Transactions Using komodo-cli

A developer should be able to easily validate ownership of a utxo, as only the owner of a utxo is able to spend it. 

#### listunspent

For this purpose, we turn to the [<b>listunspent</b>](../komodo-api/wallet.html#listunspent) API method:

```bash
./komodo-cli -regtest -ac_name=RT1 listunspent
```

The response is an array of transactions ids, called `txid` for brevity's sake.

```json
[
  {
    "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 1000.07809721,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 7,
    "confirmations": 7,
    "spendable": true
  },
  {
    "txid": "148d8970e3c7e113bd3b4038c1efdd273a6d975f45b194b4257fda6acec4b14a",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 5,
    "confirmations": 5,
    "spendable": true
  },
  {
    "txid": "a0e13cad677b4fede6211c78069aed9345880147ea79edb647383787eb15fe51",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 6,
    "confirmations": 6,
    "spendable": true
  },
  {
    "txid": "01be6fa42a897009477f7a7248c538896ad39a24e132e9bcba00138c781fd57b",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 1,
    "confirmations": 1,
    "spendable": true
  },
  {
    "txid": "73ba44853735808e0b07c45bb1e1acd7c0323bc72e872d4bae92428ad03899be",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 3,
    "confirmations": 3,
    "spendable": true
  },
  {
    "txid": "78a401c6bb7765d73fedf1e2c033935db281a94a58d35f33e6986bda36e57bd5",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 2,
    "confirmations": 2,
    "spendable": true
  },
  {
    "txid": "d81523ef05f9d19abca61982f8c0d5374eb61ecb88c923226277bc0d3e7120e6",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 4,
    "confirmations": 4,
    "spendable": true
  }
]
```

### Listing Unspent Transactions Using curl

With `curl`, the terminal command for `listunspent` is as follows:

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "listunspent", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

<collapse-text hidden title="Response">

```json
{
  "result": [
    {
      "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 1000.07809721,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 7,
      "confirmations": 7,
      "spendable": true
    },
    {
      "txid": "148d8970e3c7e113bd3b4038c1efdd273a6d975f45b194b4257fda6acec4b14a",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 5,
      "confirmations": 5,
      "spendable": true
    },
    {
      "txid": "a0e13cad677b4fede6211c78069aed9345880147ea79edb647383787eb15fe51",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 6,
      "confirmations": 6,
      "spendable": true
    },
    {
      "txid": "01be6fa42a897009477f7a7248c538896ad39a24e132e9bcba00138c781fd57b",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 1,
      "confirmations": 1,
      "spendable": true
    },
    {
      "txid": "73ba44853735808e0b07c45bb1e1acd7c0323bc72e872d4bae92428ad03899be",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 3,
      "confirmations": 3,
      "spendable": true
    },
    {
      "txid": "78a401c6bb7765d73fedf1e2c033935db281a94a58d35f33e6986bda36e57bd5",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 2,
      "confirmations": 2,
      "spendable": true
    },
    {
      "txid": "d81523ef05f9d19abca61982f8c0d5374eb61ecb88c923226277bc0d3e7120e6",
      "vout": 0,
      "generated": true,
      "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
      "segid": 47,
      "amount": 0.0001,
      "interest": 0,
      "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
      "rawconfirmations": 4,
      "confirmations": 4,
      "spendable": true
    }
  ],
  "error": null,
  "id": "curltest"
}
```
</collapse-text>

## Setting the pubkey Parameter

Observe this first `txid` returned from the `listunspent` transaction:

```json
  ...

  {
    "txid": "4ceb1e5818ab6be66035d330217be1722212a1255bfda3c8a7eef832df20c006",
    "vout": 0,
    "generated": true,
    "address": "RDyVsyEJGvSm8HaUHfihsJoXvCzekruzrn",
    "segid": 47,
    "amount": 1000.07809721,
    "interest": 0.00000000,
    "scriptPubKey": "2103f5eccb583425e781216f27b1f6e244f15b1989eecbb8695f6948a26f5a3bfe3cac",
    "rawconfirmations": 7,
    "confirmations": 7,
    "spendable": true
  },

  ...
```

Notice that the address to which these `1000` coins were sent is not the address we generated earlier. Rather, it is an entirely new address. At the moment we may not mind, because the coins were sent to an address that the wallet automatically generated and which we own. 

However, what if we want to control the address to which coins are sent when mining? When this is the case, we turn to the [<b>pubkey</b>](../installations/common-runtime-parameters.html#pubkey) launch parameter.

The `pubkey` we input into this parameter can be the same `pubkey` we generated earlier in the tutorial. 

#### Stopping the Daemon Using komodo-cli

To place this pubkey at startup, we must first stop the Smart Chain.

For this we use the [<b>stop</b>](../komodo-api/control.html#stop) API method.

##### Command

```bash
./komodo-cli -regtest -ac_name=RT1 stop
```

##### Response

```
RT1 server stopping
```

#### Stopping the Daemon Using curl

Using `curl` to stop the daemon.

##### Command

```bash
curl -s --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "stop", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/ | jq '.'
```

##### Response

```json
{
  "result": "RT1 server stopping",
  "error": null,
  "id": "curltest"
}
```

#### Restarting the Smart Chain With the pubkey Parameter

Execute the following to relaunch `komodod` with the `pubkey` we saved at the beginning of the tutorial.

##### Command

```bash
./komodod -regtest -ac_name=RT1 -ac_supply=1000 -pubkey=0350dd9b828e92600166dd74e521ac8510eb39064dfb30111c990396864542ce56 &
```

Now, when we generate new blocks, the `coinbase` transaction sends new coins to the new address associated with our `pubkey`.

First, we generate a new block using komodo-cli.

```bash
./komodo-cli -regtest -ac_name=RT1 generate 1
```

Response:

```json
[
  "06a639d7821f6ee803c6c53fe53a6b1dfe65063240ebc3a2907f7658cad8301e"
]
```

We can repeat the `getblock` method on the blockhash returned above to see the `coinbase` transaction.

With that `coinbase` transaction, we can the execute `gettransaction` to see the address to which the new coins were sent. 

After executing these previously explained methods, here is a snippet of the final result:


```json
...
  {
    "txid": "2411800f0e9c15f5233453ffc17ff301f43043c70887c256a041945d341796f0",
    "vout": 0,
    "generated": true,
    "address": "RHGqU4BPHsTve4jUJtJobAaf8SieYUzeFs",
    "segid": 28,
    "account": "",
    "amount": 0.00010000,
    "interest": 0.00000000,
    "scriptPubKey": "210350dd9b828e92600166dd74e521ac8510eb39064dfb30111c990396864542ce56ac",
    "rawconfirmations": 1,
    "confirmations": 1,
    "spendable": true
  }
...snipped
```

Note that the `address` in this output is the one associated with our desired `pubkey`.

## Closing

Some of the fundamental blockchain and API skills we have learned include the following:

- How to create a new Komodo Smart Chain
- How to make a single-node regtest chain, for development purposes
- How to launch with the pubkey set
- How to generate new blocks
- How to obtain information about blocks and transactions
- The nature of a utxo
- The nature of a coinbase transaction

Having completed this tutorial, the developer should be able to explore the many API methods in the Komodo documentation.

