# nSPV

## Introduction

nSPV enhances the normal "Simple Payment Verification" (SPV) technology available for a Smart Chain. To learn more about regular SPV technology, [read this entry on the Bitcoin wiki.](https://en.bitcoinwiki.org/wiki/Simplified_Payment_Verification)

nSPV leverages the dPoW security mechanism of the Komodo Platform to enable secure and scalable super-lite "SPV" clients. An nSPV client network utilizes a smaller amount of computation and storage resources compared to a normal SPV network. For all Smart Chains, <b>all the full nodes on the Smart Chain's network</b> can serve the necessary data to nSPV clients for the latter to have full wallet functionality.

All Komodo-compatible Smart Chains, including the KMD main chain, can utilize this technology.

More details are available in the blog posts [here](https://medium.com/@jameslee777/nspv-a-simple-approach-to-superlight-clients-leveraging-notarizations-75d7ef5a37a9) and [here.](https://medium.com/@jameslee777/nspv-reference-cli-client-cf1ffdc03631)

## Installation

Follow the instructions below to set up an nSPV client.

```bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 libsodium-dev curl libevent-dev git cmake nano wget ntp ntpdate automake unzip autoconf libtool -y
git clone https://github.com/KomodoPlatform/libnspv
cd libnspv
./autogen.sh
./configure
./onetime # compiles cc support
make
```

<!---FIXME

Usage: nspv [COIN defaults to NSPV] (-c|continuous) (-i|-ips <ip,ip,...]>) (-m[--maxpeers] <int>) (-t[--testnet]) (-f <headersfile|0 for in mem only>) (-p <rpcport>) (-r[--regtest]) (-d[--debug]) (-s[--timeout] <secs>) <command>
Supported commands:
        scan      (scan blocks up to the tip, creates header.db file)

Examples:
Sync up to the chain tip and stores all headers in headers.db (quit once synced):
> nspv scan

Sync up to the chain tip and give some debug output during that process:
> nspv -d scan

Sync up, show debug info, don't store headers in file (only in memory), wait for new blocks:
> nspv -d -f 0 -c scan

--->

## Enabling the nSPV Client

Copy the following code to the file named `coins` (located at the root level of the source directory).

(Change each value as appropriate for the desired Smart Chain.)

```json
{
  "coin": "COIN",
  "asset": "COIN",
  "fname": "Coin",
  "rpcport": 12345,
  "mm2": 1,
  "p2p": 12346,
  "magic": "feb4cb23",
  "nSPV": "5.9.102.210, 5.9.253.195, 5.9.253.196, 5.9.253.197, 5.9.253.198, 5.9.253.199, 5.9.253.200, 5.9.253.201, 5.9.253.202, 5.9.253.203"
}
```

#### Property Descriptions

| Name    | Type     | Description                                                                                                                                                                                                                         |
| ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin    | (string) | the ticker of the coin                                                                                                                                                                                                              |
| asset   | (string) | the `-ac_name` parameter used to start the Smart Chain                                                                                                                                                                              |
| fname   | (string) | the full name of the Smart Chain                                                                                                                                                                                                    |
| rpcport | (number) | the RPC port the Smart Chain's daemon uses to receive RPC commands                                                                                                                                                                  |
| mm2     | (number) | set this value to `1` if this coin has been tested and proves capable of functioning on MarketMaker 2.0 software                                                                                                                    |
| p2p     | (number) | the p2p port the Smart Chain's daemon uses to communicate with other nodes                                                                                                                                                          |
| magic   | (string) | the netmagic number for this Smart Chain. The decimal value of `magic` can be obtained by executing the `getinfo` RPC on a full node on the Smart Chain network. Convert the decimal value to hex and serialize it into 4 hexbytes; |
| nSPV    | (string) | the ip addresses of the full nodes on the Smart Chain network                                                                                                                                                                       |

::: tip

To start the nSPV client for a specific Smart Chain after its data has been added to the coins file, execute the following.

```bash
./nspv COIN
```

:::

#### Tips and Suggestions for Working with the Magic Number

The magic number is a unique number that the daemon uses for identification purposes.

If the direction of the `magic` number appears to be incorrect, try reversing the order of the numbers.

The `magic` number can also be found from the terminal as a `stdout` printout when launching the daemon. Look for the line that starts with `>>>>>>>>>>` , extract the hex portion of the string (`magic.xxxxxxxx`), and reverse its byte order.

###### Example

```bash
>>>>>>>>>> COIN: p2p.40264 rpc.40265 magic.fe1c3450 4263261264 350689 coins
```

The hex extracted is `fe1c3450`.

Therefore the magic value for the coins file is `50341cfe`

## Interacting with the nSPV Client

The port in each of these examples is the port on which the nSPV client listens for RPC commands.

For KMD, the port is `7771`. For any other Smart Chain, the port is the `rpcport` specified in the `coins` file.

This behaviour can be bypassed by setting the [-p](../../../basic-docs/smart-chains/smart-chain-setup/nspv.html#p) parameter.

#### curl Commands Using Named Parameters

Use the example below as a template for creating new `curl` commands for any RPCs available in the nSPV API.

```bash
curl --url "http://127.0.0.1:$port" --data "{\"userpass\":\"$userpass\",\"method\":\"spentinfo\",\"vout\":1,\"txid\":\"e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855\"}"
```

#### curl Command Using the json2.0 Interface

When using this format for any RPC that requires parameters (also called "arguments"), provide the parameters in the order they are given in this documentation.

For example, the [spentinfo](../../../basic-docs/smart-chains/smart-chain-setup/nspv.html#spentinfo) RPC lists `txid` as the first parameter and `vout` as the second. Observe in the following example how the values in the `"params"` key match this order.

Use quotation marks `""` for all strings.

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "spentinfo", "params": ["e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",1 ] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

#### Accessing localhost in the Browser

To access an nSPV client's API using a browser, create a url that uses `http://127.0.0.1:<insert_port>/api/` as the base url, and add the `rpc_name/` and any relevant additional `parameters/` as additional url directions. See the example below.

##### Example

```
http://127.0.0.1:<port>/api/method/spentinfo/txid/e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855/vout/1
```

#### Static HTML wallet in a browser

Simply visit the url `http://127.0.0.1:<insert_port>/` to access the Static HTML wallet served by the nSPV binary.

## -p

Use this parameter at nSPV runtime to set the port on which the nSPV client should listen for RPC commands.

##### Example

The following command starts the nSPV client for the KMD main chain and listens on port `3000` for RPC commands.

```bash
./nspv KMD -p 3000
```

## broadcast

**broadcast hex**

Use this method to broadcast the hex value returned by the [spend](#spend) method.

#### Arguments

| Name | Type     | Description                   |
| ---- | -------- | ----------------------------- |
| hex  | (string) | the transaction in hex format |

#### Response

| Name      | Type     | Description                                                                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| result    | (string) | whether the command was successful                                                                                           |
| expected  | (string) | the expected transaction id                                                                                                  |
| broadcast | (string) | the broadcasted transaction id                                                                                               |
| retcode   | (number) | the return code<br><br>0: no error<br><br>-1,-2,-3: failure<br><br>-200x: mostly OK, some of the inputs may not be notarized |
| type      | (string) | the type of the broadcast                                                                                                    |
| lastpeer  | (string) | the last known peer                                                                                                          |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "broadcast", "params": ["0400008085202f890155c894ada147bf184bb7dff790ca429e6860775d3bb471dc0f69a28f080977e0010000006a47304402206774ff903a8a4b73bcd5a79fe5c744f34d2263160cd8877c198c2228c66a8a42022063e1d2d6403c395e3472a6a509f01cbff0b90e3413bc6f7bc492649302a4a64001210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ffffffff0200e1f505000000001976a9144726f2838fc4d6ac66615e10604e18926e9b556e88ac48f804060000000023210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ace77e395d000000000000000000000000000000"] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "expected": "c76fede03fd821cf718b8ca7de898b95d04d7b9f7fcaeda89ccc00519476ec4a",
  "broadcast": "c76fede03fd821cf718b8ca7de898b95d04d7b9f7fcaeda89ccc00519476ec4a",
  "retcode": 1,
  "type": "broadcast and mempool",
  "lastpeer": "nodeid.1"
}
```

</collapse-text>

## getinfo

**getinfo [hdrheight]**

Use this method to get the general information on the state of the blockchain at the moment.

#### Arguments

| Name      | Type               | Description                                                            |
| --------- | ------------------ | ---------------------------------------------------------------------- |
| hdrheight | (number, optional) | supplies the height of the block for which the header data is required |

#### Response

| Name                    | Type     | Description                                                                                                                                        |
| ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                  | (string) | whether the command was successful                                                                                                                 |
| nSPV                    | (string) | the mode of nSPV                                                                                                                                   |
| address                 | (string) | the address corresponding to the wifkey                                                                                                            |
| pubkey                  | (string) | the pubkey corresponding to the wifkey                                                                                                             |
| wifexpires              | (string) | the time in seconds till the login expires                                                                                                         |
| height                  | (number) | the current height of the blockchain                                                                                                               |
| chaintip                | (string) | the blockhash of the last block                                                                                                                    |
| notarization            | (json)   | a json object containing the notarization details                                                                                                  |
| notarized_height        | (number) | the height of the latest block that has been notarized                                                                                             |
| notarized_blockhash     | (string) | the blockhash of the latest block that has been notarized                                                                                          |
| notarization_txid       | (string) | the id of the transaction in which the notarization data is included in the chain being dPoW'ed                                                    |
| notarization_txidheight | (number) | the height of the block in which the notarization transaction is included                                                                          |
| notarization_desttxid   | (string) | the id of the transaction in which the notarization data is included in the chain acting as the data store                                         |
| header                  | (string) | a json object containing the details of the header (of the current block by default / block of height specified by `hdrheight` if it is specified) |
| height                  | (number) | the height of the block that has been queried                                                                                                      |
| blockhash               | (string) | the blockhash of the block that has been queried                                                                                                   |
| hashPrevBlock           | (string) | the blockhash of the block before the block that has been queried                                                                                  |
| hashMerkleRoot          | (string) | the merkleroot of the block that has been queried                                                                                                  |
| nTime                   | (number) | a timestamp recording when this block was created                                                                                                  |
| nBits                   | (number) | the calculated difficulty target being used for this block                                                                                         |
| protocolversion         | (string) | the version of the client; helps the nspv client disconnect from nodes that are out of date                                                        |
| lastpeer                | (string) | the last known peer                                                                                                                                |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "getinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "nSPV": "superlite",
  "height": 1458356,
  "chaintip": "09b322ed45c2346316fb7f5bc9fbd7a4e27ea1b4803f68ad4c9649c13f19b479",
  "notarization": {
    "notarized_height": 1458340,
    "notarized_blockhash": "02ec52149e0ebc3d8c0e33612f6a6da76ceb01d3604cd3a63269c9c14f8b50ce",
    "notarization_txid": "3f6e11d0f210fd2fa2d39359fae3e70ce63cfc78e2cf555b1a84d88eb7eab7da",
    "notarization_txidheight": 1458354,
    "notarization_desttxid": "500a12dd8aab6b82db602f3f8f7f80573f6d4af6be4d9eb96dee0accf4ecf1b6"
  },
  "header": {
    "height": 1458356,
    "blockhash": "09b322ed45c2346316fb7f5bc9fbd7a4e27ea1b4803f68ad4c9649c13f19b479",
    "hashPrevBlock": "08d31454a0f5a05c1cb194d608c803b94ec0012d0257d08102da8e26439d48af",
    "hashMerkleRoot": "26123db79cfa63d79e92a375271349e4ba4e0a6d9eddf3fc2044572d29045a16",
    "nTime": 1564069327,
    "nBits": 486605795
  },
  "protocolversion": 0,
  "lastpeer": "nodeid.1"
}
```

</collapse-text>

## getnewaddress

**getnewaddress [lang]**

Use this method to create a new address.

#### Arguments

| Name | Type              | Description                                                                                                                                                                                      |
| ---- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| lang | (string,optional) | the language in which the seed words are to be generated; can be one of: "english", "french", "italian", "japanese", "korean", "russian", "spanish", "chinese_simplified", "chinese_traditional" |

#### Response

| Name       | Type     | Description                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| seed       | (string) | seed phrase of the generated address; currently generates a phrase with `23` seed words compatible with the other wallets in the Komodo Ecosystem |
| wif        | (string) | wifkey of the generated address                                                                                                                   |
| address    | (string) | the generated address                                                                                                                             |
| pubkey     | (string) | pubkey of the generated address                                                                                                                   |
| wifprefix  | (number) | prefix of the generated wifkey; depends on the network                                                                                            |
| compressed | (number) | whether the wifkey generated is compressed                                                                                                        |

#### :pushpin: Examples

##### Command (Without arguments)

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "seed": "shiver heart abuse xxx xxx xxx xxx xxx xxx xxx xxx xxx",
  "wif": "Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "address": "RL5kuVuiJQQcDdaooYerKUxvcXwq8jb71d",
  "pubkey": "03b983f01e528356dfc32b49fc2a830013a28fc95b569b7559b09729912d29f5c5",
  "wifprefix": 188,
  "compressed": 1
}
```

</collapse-text>

##### Command (To get the seed words in italian)

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "getnewaddress", "params": ["italian"] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "seed": "agitare busta rinnovo xxx xxxx xxx xxx xxxx xxx xxx xxx xxxx",
  "wif": "Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "address": "RFKVh3xE3ygK9smStgurByLZ2b3Nksm9bQ",
  "pubkey": "033b8705127f19a6e5de646f3c46590b9196acfc01d68740f0872547677da3d8bf",
  "wifprefix": 188,
  "compressed": 1
}
```

</collapse-text>

## getpeerinfo

**getpeerinfo**

Use this method to get the information of all peers on the network.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name              | Type     | Description                                                                                                                                                                                                                                                                             |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nodeid            | (number) | the number given to a node by our instance of the nSPV client                                                                                                                                                                                                                           |
| ipaddress         | (string) | the ipaddress of the node                                                                                                                                                                                                                                                               |
| port              | (number) | the p2p port used to connect to this node                                                                                                                                                                                                                                               |
| lastping          | (number) | the unix time at which this node was last pinged                                                                                                                                                                                                                                        |
| time_started_con  | (number) | the unix time at which a connection to this node was established                                                                                                                                                                                                                        |
| time_last_request | (number) | the unix time at which a connection was last requested                                                                                                                                                                                                                                  |
| services          | (number) | this value encodes the available services from this node in decimal format; converted to HEX, `70000005` : nSPV support with both addressindex and spent index , `40000005` : nSPV support but neither addressindex nor spent index, `00000005` is the services value for a normal node |
| missbehavescore   | (number) | the score given to this node if the node was misbehaving                                                                                                                                                                                                                                |
| bestknownheight   | (number) | the height of the blockchain as best known by this node                                                                                                                                                                                                                                 |
| in_sync           | (string) | the sync status of the node; `synced` indicates that the client has verified that the chain tip's block header from the node links back to the last notarization; after the client been running a while, all honest nodes should be synced to the same block                            |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "getpeerinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
[
  {
    "nodeid": 1,
    "protocolversion": 2,
    "ipaddress": "5.9.253.195",
    "port": 7770,
    "lastping": 1565175111,
    "time_started_con": 1565174366,
    "time_last_request": 1565175123,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663,
    "in_sync": "not_synced"
  },
  {
    "nodeid": 10,
    "protocolversion": 2,
    "ipaddress": "116.203.17.138",
    "port": 7770,
    "lastping": 1565175121,
    "time_started_con": 1565174376,
    "time_last_request": 1565175126,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663
  },
  {
    "nodeid": 12,
    "protocolversion": 2,
    "ipaddress": "51.68.207.116",
    "port": 7770,
    "lastping": 1565175121,
    "time_started_con": 1565174376,
    "time_last_request": 1565175123,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663
  },
  {
    "nodeid": 15,
    "protocolversion": 2,
    "ipaddress": "178.148.188.34",
    "port": 7770,
    "lastping": 1565175121,
    "time_started_con": 1565174376,
    "time_last_request": 1565175126,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663
  },
  {
    "nodeid": 25,
    "protocolversion": 2,
    "ipaddress": "159.65.93.178",
    "port": 7770,
    "lastping": 1565175121,
    "time_started_con": 1565174376,
    "time_last_request": 1565175125,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663
  },
  {
    "nodeid": 34,
    "protocolversion": 2,
    "ipaddress": "159.69.11.56",
    "port": 7770,
    "lastping": 1565174946,
    "time_started_con": 1565174386,
    "time_last_request": 1565175124,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663
  },
  {
    "nodeid": 35,
    "protocolversion": 2,
    "ipaddress": "5.189.232.34",
    "port": 7770,
    "lastping": 1565174946,
    "time_started_con": 1565174386,
    "time_last_request": 1565175127,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663
  },
  {
    "nodeid": 43,
    "protocolversion": 2,
    "ipaddress": "178.159.11.114",
    "port": 7770,
    "lastping": 1565174946,
    "time_started_con": 1565174386,
    "time_last_request": 1565175126,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663
  },
  {
    "nodeid": 50,
    "protocolversion": 0,
    "ipaddress": "159.69.45.70",
    "port": 7770,
    "lastping": 1565174946,
    "time_started_con": 1565174386,
    "time_last_request": 1565175122,
    "services": 0,
    "missbehavescore": 0,
    "bestknownheight": 1476663,
    "in_sync": "not_synced"
  }
]
```

</collapse-text>

## hdrsproof

**hdrsproof prevheight nextheight**

This method scans backwards from the `prevheight` until the process encounters a notarization transaction, then forward from `nextheight` until the process encounters another notarization transaction.

Then the process finds the notarized blocks corresponding to these two notarization transactions.

Then the process returns all the block headers between these two notarized blocks.

Now that both ends of this segment of blocks are notarized blocks, all block headers in this segment can be validated to see if they link back to each other.

#### Arguments

| Name       | Type     | Description                                      |
| ---------- | -------- | ------------------------------------------------ |
| prevheight | (number) | the block number from which headers are required |
| nextheight | (number) | the block number to which headers are required   |

#### Response

| Name           | Type     | Description                                                                                                                                        |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| result         | (string) | whether the command was successful                                                                                                                 |
| prevht         | (string) | the height of the first notarized block below the height `prevheight`                                                                              |
| nextht         | (string) | the height of the first notarized block above the height `nextheight`                                                                              |
| prevtxid       | (string) | the id of the transaction that contains the notarization data of the block of height `prevht`                                                      |
| prevtxidht     | (string) | the height of the block in which the transaction with id `prevtxid` is present                                                                     |
| prevtxlen      | (string) | the length of the transaction with id `prevtxid`                                                                                                   |
| nexttxid       | (string) | the id of the transaction that contains the notarization data of the block of height `nextht`                                                      |
| nexttxidht     | (string) | the height of the block in which the transaction with id `nexttxid` is present                                                                     |
| nexttxlen      | (string) | the length of the transaction with id `nexttxid`                                                                                                   |
| numhdrs        | (string) | the number of headers being returned                                                                                                               |
| headers        | (string) | a json object containing the details of the header (of the current block by default / block of height specified by `hdrheight` if it is specified) |
| height         | (number) | the height of the block that has been queried                                                                                                      |
| blockhash      | (string) | the blockhash of the block that has been queried                                                                                                   |
| hashPrevBlock  | (string) | the blockhash of the block before the block that has been queried                                                                                  |
| hashMerkleRoot | (string) | the merkleroot of the block that has been queried                                                                                                  |
| nTime          | (number) | a timestamp recording when this block was created                                                                                                  |
| nBits          | (number) | the calculated difficulty target being used for this block                                                                                         |
| lastpeer       | (string) | the last known peer                                                                                                                                |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "hdrsproof", "params": [1456692, 1456694 ] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "prevht": 1456680,
  "nextht": 1456700,
  "prevtxid": "e82367899ee7a5cb65dabe058cd7369392564f83834c8f1f81a21958da5d241c",
  "prevtxidht": 1456693,
  "prevtxlen": 1637,
  "nexttxid": "f11f30e4e62ac3567fa553ace89b1fbde7ffaefaa4f94926f3561928a537b753",
  "nexttxidht": 1456713,
  "nexttxlen": 1630,
  "numhdrs": 21,
  "headers": [
    {
      "height": 1456680,
      "blockhash": "00000000a651e00fa2a71c47511be85ef87e83d5715be3a17ed943b141cdd4d9",
      "hashPrevBlock": "06a51aacc1cb0575cc0a0d33dd001409367fe55b5e97a6d1055d70f60a60ba15",
      "hashMerkleRoot": "4f999aa4c45c2ffc6e43f1c96d5bf8a85a70e056462ff81167ebc1a16698ebf4",
      "nTime": 1563968164,
      "nBits": 486609566
    },
    {
      "height": 1456681,
      "blockhash": "08075e165473d74b87d55ce7ffecd85fb29989876dd596de56ed5cb22eb02b93",
      "hashPrevBlock": "00000000a651e00fa2a71c47511be85ef87e83d5715be3a17ed943b141cdd4d9",
      "hashMerkleRoot": "731295c1dc6067df17b5ff8385213981eb4f65f09f8475e15bc53a55f77b6a5f",
      "nTime": 1563968224,
      "nBits": 486608614
    },
    {
      "height": 1456682,
      "blockhash": "08359b03c7493467c9dbc83ed40c1e606cf3f35a086dd044ac37247d3c298610",
      "hashPrevBlock": "08075e165473d74b87d55ce7ffecd85fb29989876dd596de56ed5cb22eb02b93",
      "hashMerkleRoot": "385ad9e93468c50169def8f30853b094ce8fc89a552deac1c7332956639e9281",
      "nTime": 1563968284,
      "nBits": 486609613
    },
    {
      "height": 1456683,
      "blockhash": "000000010981eef2db9a4a68c274e9e4fe3c8e9ac39e9c666926531ed808d37b",
      "hashPrevBlock": "08359b03c7493467c9dbc83ed40c1e606cf3f35a086dd044ac37247d3c298610",
      "hashMerkleRoot": "6484bec614bf2d4e5ad80e1360f4feb1445d3c24732e1c69bc755dea43be5887",
      "nTime": 1563968229,
      "nBits": 486609556
    },
    {
      "height": 1456684,
      "blockhash": "021ec75467e5b61c226b0f001ffa58e0b7bb6c20b3529fc5ea1f00584601fd64",
      "hashPrevBlock": "000000010981eef2db9a4a68c274e9e4fe3c8e9ac39e9c666926531ed808d37b",
      "hashMerkleRoot": "bd6fbe8e522cb8ae2c06a3af7dd24aa9c8f81e161b1ffd5af2f98434f31cb75f",
      "nTime": 1563968321,
      "nBits": 486609344
    },
    {
      "height": 1456685,
      "blockhash": "024fb917266ec5dc1442116696bb92fe1a19388e6c299362c8f21a895b484a4d",
      "hashPrevBlock": "021ec75467e5b61c226b0f001ffa58e0b7bb6c20b3529fc5ea1f00584601fd64",
      "hashMerkleRoot": "cfc5f2c113970aae7b268f6215dff2d88114f7ee625906f4af1000e55941672b",
      "nTime": 1563968400,
      "nBits": 486609586
    },
    {
      "height": 1456686,
      "blockhash": "07ff3fbe03ed0f8d4d672d278554131631405ee9c8550f93f5b92ae97255c841",
      "hashPrevBlock": "024fb917266ec5dc1442116696bb92fe1a19388e6c299362c8f21a895b484a4d",
      "hashMerkleRoot": "cd02fb3979c59c274e547ef040ac21e72516ec29512ef94d34e38886ce1c50ca",
      "nTime": 1563968498,
      "nBits": 486609053
    },
    {
      "height": 1456687,
      "blockhash": "0aa762a49575bed937e3b67ef7f35b50c73ba1e15885bcd561b0024ec63cdc8f",
      "hashPrevBlock": "07ff3fbe03ed0f8d4d672d278554131631405ee9c8550f93f5b92ae97255c841",
      "hashMerkleRoot": "933a601ec6640b1b327a742edfd4e14c0f1a293ad3fda15db9cb87910185bde7",
      "nTime": 1563968672,
      "nBits": 486608999
    },
    {
      "height": 1456688,
      "blockhash": "0330f6d6d7f2fd87b077165f5c0271129d2f000b65d876db2941c34f87da4491",
      "hashPrevBlock": "0aa762a49575bed937e3b67ef7f35b50c73ba1e15885bcd561b0024ec63cdc8f",
      "hashMerkleRoot": "f83e3585b96988d8dc531c7533ff0bff287ea29e5914b488cbbe3e2d480bb383",
      "nTime": 1563968732,
      "nBits": 486608215
    },
    {
      "height": 1456689,
      "blockhash": "00000000760596dbc4a35428f245346c740bda0c30f0d56136692ed023b0087e",
      "hashPrevBlock": "0330f6d6d7f2fd87b077165f5c0271129d2f000b65d876db2941c34f87da4491",
      "hashMerkleRoot": "3f7a1d70a9d5f7a7ab73862d9f89e2c1ad05d18d5fb04bf360a9b7e2029fe420",
      "nTime": 1563968711,
      "nBits": 486608250
    },
    {
      "height": 1456690,
      "blockhash": "0a735f0f144f0f3d079b9674ef0e3dc39b29ae7c254dccfc7e2b1dc8bf902eb7",
      "hashPrevBlock": "00000000760596dbc4a35428f245346c740bda0c30f0d56136692ed023b0087e",
      "hashMerkleRoot": "63734e94b3ce30f7f0de7a7e3546ee4617bfffca22391fcfac807cdc042aa8ed",
      "nTime": 1563968812,
      "nBits": 486608101
    },
    {
      "height": 1456691,
      "blockhash": "0ecceb771f4706188ac1db125ba3228ddd97d30043e437576605a764f43c57eb",
      "hashPrevBlock": "0a735f0f144f0f3d079b9674ef0e3dc39b29ae7c254dccfc7e2b1dc8bf902eb7",
      "hashMerkleRoot": "d7f6ea68b87b15dcadb8c7f56aebcc11c8cc395186822d67e56c99bcbe95ba30",
      "nTime": 1563968929,
      "nBits": 486609120
    },
    {
      "height": 1456692,
      "blockhash": "0000000034cb2953e5bb5d4137209e8d8ef98608b0dc50f77dfb5174b06f5a26",
      "hashPrevBlock": "0ecceb771f4706188ac1db125ba3228ddd97d30043e437576605a764f43c57eb",
      "hashMerkleRoot": "1f521201d68355b2f0ab5ac7b6e34c998409f60d1789415b3d7673b746ae5545",
      "nTime": 1563968934,
      "nBits": 486609800
    },
    {
      "height": 1456693,
      "blockhash": "01a724e7686a4dce74884ebd8bd869c855d1a71afc80c906830acfa1d14811cd",
      "hashPrevBlock": "0000000034cb2953e5bb5d4137209e8d8ef98608b0dc50f77dfb5174b06f5a26",
      "hashMerkleRoot": "0796959f32409791221a66859b6abbbf5ec31c2afcc22e7b606911da97612e4e",
      "nTime": 1563969054,
      "nBits": 486611292
    },
    {
      "height": 1456694,
      "blockhash": "000000008b4a3386489d1438ddc1220652942c95053f2c95c72c6868af215c8a",
      "hashPrevBlock": "01a724e7686a4dce74884ebd8bd869c855d1a71afc80c906830acfa1d14811cd",
      "hashMerkleRoot": "8ea989e47aa590fbabf19b5a7dbace61f32be3c51c558b991f7718b27eaa6b98",
      "nTime": 1563969053,
      "nBits": 486610300
    },
    {
      "height": 1456695,
      "blockhash": "00325ddee8e46aa1dcea791e370f87bcd94654a19d7bbf69d9fc6fd2afa5bc1f",
      "hashPrevBlock": "000000008b4a3386489d1438ddc1220652942c95053f2c95c72c6868af215c8a",
      "hashMerkleRoot": "dffc52dcc7c758616ec081e376f3385b1f75f41463e5fe2580e720b7c41637a1",
      "nTime": 1563969170,
      "nBits": 486609719
    },
    {
      "height": 1456696,
      "blockhash": "0121ba6e77b2d89461f23390193e5d355ba09abcebd8fa774d13dc925f67d927",
      "hashPrevBlock": "00325ddee8e46aa1dcea791e370f87bcd94654a19d7bbf69d9fc6fd2afa5bc1f",
      "hashMerkleRoot": "31fbd5fc898ec987575eb676abedcee5480375365e7554ac9aa90489c5e29e57",
      "nTime": 1563969248,
      "nBits": 486609177
    },
    {
      "height": 1456697,
      "blockhash": "008f9c7128023e04d1896d101a74b7a5020b4a9c4d372116f8a25117d6fc89b0",
      "hashPrevBlock": "0121ba6e77b2d89461f23390193e5d355ba09abcebd8fa774d13dc925f67d927",
      "hashMerkleRoot": "6122994bfb8f97dc6275119004c042afdd2cf6eab9a8e294f0ef5549793c39e2",
      "nTime": 1563969346,
      "nBits": 486610067
    },
    {
      "height": 1456698,
      "blockhash": "0dffa8155af91fb742dfc6252bd4f7bfd85e7c770db5b06edf45b54bed6afeb8",
      "hashPrevBlock": "008f9c7128023e04d1896d101a74b7a5020b4a9c4d372116f8a25117d6fc89b0",
      "hashMerkleRoot": "d2429d0ee8c131bdba55058e86d7e55c68041dcfe0c72ff8596542fc35571a2e",
      "nTime": 1563969406,
      "nBits": 486609959
    },
    {
      "height": 1456699,
      "blockhash": "0e4f73be5d71475d1203e2bd5350f631b4afc90db65ff1a46a0d0ce9ff6082b0",
      "hashPrevBlock": "0dffa8155af91fb742dfc6252bd4f7bfd85e7c770db5b06edf45b54bed6afeb8",
      "hashMerkleRoot": "0edb7a7f18d2bcf5fd5e1364cd913e8e9769bf7e51292d5d57e5b886fdf39834",
      "nTime": 1563969466,
      "nBits": 486610314
    },
    {
      "height": 1456700,
      "blockhash": "09b87ed9bc81684322cb3fd36775232d4609210ff75fe7a075a5f859f573d7f1",
      "hashPrevBlock": "0e4f73be5d71475d1203e2bd5350f631b4afc90db65ff1a46a0d0ce9ff6082b0",
      "hashMerkleRoot": "98547e5781d6a0d04fd952bd5ff92223bbb4ca03a991818c445f58d2ad88e8bc",
      "nTime": 1563969526,
      "nBits": 486609186
    }
  ],
  "lastpeer": "nodeid.1"
}
```

</collapse-text>

## help

**help**

This method returns the help output of all available methods.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name    | Type             | Description                                                 |
| ------- | ---------------- | ----------------------------------------------------------- |
| result  | (string)         | whether the command was successful                          |
| methods | (array of jsons) | an array containing a json object for each method           |
| method  | (string)         | name of a method                                            |
| fields  | (array)          | an array conataining the description of parameters expected |
| num     | (number)         | the number of methods available                             |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "help", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "methods": [
    { "method": "stop", "fields": [] },
    { "method": "help", "fields": [] },
    { "method": "logout", "fields": [] },
    { "method": "getnewaddress", "fields": [] },
    { "method": "getpeerinfo", "fields": [] },
    { "method": "login", "fields": [{ "wif": "string" }] },
    { "method": "broadcast", "fields": [{ "hex": "string" }] },
    {
      "method": "listunspent",
      "fields": [
        { "address": "string" },
        { "isCC": "uint32_t" },
        { "skipcount": "uint32_t" },
        { "filter": "uint32_t" }
      ]
    },
    {
      "method": "listtransactions",
      "fields": [
        { "address": "string" },
        { "isCC": "uint32_t" },
        { "skipcount": "uint32_t" },
        { "filter": "uint32_t" }
      ]
    },
    { "method": "notarizations", "fields": [{ "height": "uint32_t" }] },
    {
      "method": "hdrsproof",
      "fields": [{ "prevheight": "uint32_t" }, { "nextheight": "uint32_t" }]
    },
    { "method": "getinfo", "fields": [{ "hdrheight": "uint32_t" }] },
    {
      "method": "txproof",
      "fields": [
        { "txid": "hash" },
        { "vout": "uint32_t" },
        { "height": "uint32_t" }
      ]
    },
    {
      "method": "spentinfo",
      "fields": [{ "txid": "hash" }, { "vout": "uint32_t" }]
    },
    {
      "method": "spend",
      "fields": [{ "address": "string" }, { "amount": "float" }]
    },
    {
      "method": "mempool",
      "fields": [
        { "address": "string" },
        { "isCC": "uint32_t" },
        { "memfunc": "uint32_t" },
        { "txid": "hash" },
        { "vout": "uint32_t" },
        { "evalcode": "uint32_t" },
        { "CCfunc": "uint32_t" }
      ]
    }
  ],
  "num": 16
}
```

</collapse-text>

## listtransactions

**listtransactions [address [isCC [skipcount [filter]]]]**

This method returns a list of transactions for an address.

#### Arguments

| Name      | Type               | Description                                                                                                |
| --------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| address   | (string, optional) | the address for which transactions are to be listed; if not specified, the current active address is used  |
| isCC      | (number, optional) | only return transactions that are related to Antara modules                                                |
| skipcount | (number, optional) | skips the specified number of transactions starting from the oldest; always returns the latest transaction |
| filter    | (number, optional) | (in development)                                                                                           |

#### Response

| Name      | Type             | Description                                                                             |
| --------- | ---------------- | --------------------------------------------------------------------------------------- |
| result    | (string)         | whether the command was successful                                                      |
| txids     | (array of jsons) | an array containing jsons that describe the transactions                                |
| height    | (number)         | the height of the block in which the transaction was included                           |
| txid      | (string)         | the id of the transaction                                                               |
| value     | (number)         | the amount of coins in the vin/vout (inputs and outputs)                                |
| vin/vout  | (number)         | the index of vin/vout in the transaction                                                |
| address   | (string)         | the address for which the transactions are being returned                               |
| isCC      | (number)         | whether the address belongs to an Antara module                                         |
| height    | (number)         | the height of the blockchain when this response was returned                            |
| numtxids  | (number)         | number of vouts/vins being returned                                                     |
| skipcount | (number)         | the number of transactions that have been skipped, starting from the oldest transaction |
| filter    | (number)         | (in development)                                                                        |
| lastpeer  | (string)         | the last known peer                                                                     |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "listtransactions", "params": ["RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb"] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "txids": [
    {
      "height": 1453830,
      "txid": "04df7641f114c14fa4fbe2ec6e8ef5b55417f78fd12ef90b1217fcf512cb5ec2",
      "value": 2.98,
      "vout": 1
    },
    {
      "height": 1453881,
      "txid": "e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",
      "value": -2.98,
      "vin": 0
    },
    {
      "height": 1453881,
      "txid": "e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",
      "value": 2.00999,
      "vout": 1
    },
    {
      "height": 1458037,
      "txid": "c76fede03fd821cf718b8ca7de898b95d04d7b9f7fcaeda89ccc00519476ec4a",
      "value": 1,
      "vout": 0
    },
    {
      "height": 1458037,
      "txid": "c76fede03fd821cf718b8ca7de898b95d04d7b9f7fcaeda89ccc00519476ec4a",
      "value": -2.00999,
      "vin": 0
    },
    {
      "height": 1458037,
      "txid": "c76fede03fd821cf718b8ca7de898b95d04d7b9f7fcaeda89ccc00519476ec4a",
      "value": 1.00989,
      "vout": 1
    }
  ],
  "address": "RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb",
  "isCC": 0,
  "height": 1458248,
  "numtxids": 6,
  "skipcount": 0,
  "filter": 0,
  "lastpeer": "nodeid.1"
}
```

</collapse-text>

## listunspent

**listunspent [address [isCC [skipcount [filter]]]]**

Use this method to retrieve all unspent outputs belonging to an address.

#### Arguments

| Name      | Type               | Description                                                                                                |
| --------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| address   | (string, optional) | the address for which transactions are to be listed; if not specified, the current active address is used  |
| isCC      | (number, optional) | only return transactions that are related to Antara modules                                                |
| skipcount | (number, optional) | skips the specified number of transactions starting from the oldest; always returns the latest transaction |
| filter    | (number, optional) | (in development)                                                                                           |

#### Response

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| result    | (string)         | whether the command was successful                           |
| utxos     | (array of jsons) | an array containing jsons that describe the outputs          |
| height    | (number)         | the height of the block in which the output was created      |
| txid      | (string)         | the id of the transaction in which the output is present     |
| vout      | (number)         | the index of the vout (output) in the transaction            |
| value     | (number)         | the amount of coins in the vout (output)                     |
| rewards   | (number)         | the amount of active user rewards claimable by the output    |
| address   | (string)         | the address for which the transactions are being returned    |
| isCC      | (number)         | whether the address belongs to an Antara module              |
| height    | (number)         | the height of the blockchain when this response was returned |
| numutxos  | (number)         | number of vouts(outputs) being returned                      |
| balance   | (number)         | the total balance available for the address                  |
| rewards   | (number)         | the total rewards claimable by the address                   |
| skipcount | (number)         | the number of utoxs that have been skipped; from the oldest  |
| filter    | (number)         | (in development)                                             |
| lastpeer  | (string)         | the last known peer                                          |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "listunspent", "params": ["RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb"] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "utxos": [
    {
      "height": 1458037,
      "txid": "c76fede03fd821cf718b8ca7de898b95d04d7b9f7fcaeda89ccc00519476ec4a",
      "vout": 0,
      "value": 1,
      "rewards": 0
    },
    {
      "height": 1458037,
      "txid": "c76fede03fd821cf718b8ca7de898b95d04d7b9f7fcaeda89ccc00519476ec4a",
      "vout": 1,
      "value": 1.00989,
      "rewards": 0
    }
  ],
  "address": "RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb",
  "isCC": 0,
  "height": 1458307,
  "numutxos": 2,
  "balance": 2.00989,
  "rewards": 0,
  "skipcount": 0,
  "filter": 0,
  "lastpeer": "nodeid.17"
}
```

</collapse-text>

## login

**login wif**

Use this method to log in to an address using its wifkey.

#### Arguments

| Name | Type     | Description                                         |
| ---- | -------- | --------------------------------------------------- |
| wif  | (string) | the wifkey (wallet import format of the privatekey) |

#### Response

| Name       | Type      | Description                                                              |
| ---------- | --------- | ------------------------------------------------------------------------ |
| result     | (string)  | whether the command was successful                                       |
| status     | (string)  | the time till the expiry of the login                                    |
| address    | (string)  | the address corresponding to the wifkey                                  |
| pubkey     | (string)  | the pubkey corresponding to the wifkey                                   |
| wifprefix  | (number)  | the prefix of the wifkey (indicates the intended network for the wifkey) |
| compressed | (boolean) | indicates whether the wifkey is compressed                               |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "login", "params": ["Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "status": "wif will expire in 777 seconds",
  "address": "Rxxxxxxxxxxxxxxxxxxx",
  "pubkey": "03xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "wifprefix": 188,
  "compressed": 1
}
```

</collapse-text>

## logout

**logout**

Use this method to log out of the current active address.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name   | Type     | Description                   |
| ------ | -------- | ----------------------------- |
| result | (string) | whether the command succeeded |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "logout", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{ "result": "success" }
```

</collapse-text>

## mempool

**mempool address isCC memfunc [txid vout evalcode ccfunc]**

This method returns the current transactions in the mempool. The various parameters can be used to filter the transactions.

<!--FIXME
which args are optional and eachone's use

and values and meanings of memfunc

memfunc (0 all, 1 address recv, 2 txid/vout spent, 3 txid inmempool 4)

gcharang: all the arguments are optional; and they are in development
-->

#### Arguments

| Name     | Type               | Description                                            |
| -------- | ------------------ | ------------------------------------------------------ |
| address  | (string, optional) | if the transactions should belong to the address       |
| isCC     | (number, optional) | if the transactions should belong to any Antara module |
| memfunc  | (number, optional) | (in development)                                       |
| txid     | (string, optional) | (in development)                                       |
| vout     | (number, optional) | (in development)                                       |
| evalcode | (number, optional) | (in development)                                       |
| ccfunc   | (number, optional) | (in development)                                       |

#### Response

| Name     | Type               | Description                                                  |
| -------- | ------------------ | ------------------------------------------------------------ |
| result   | (string)           | whether the command was successful                           |
| txids    | (array of strings) | the ids of the transactions in the mempool                   |
| address  | (string)           | the address that was used to filter the mempool              |
| isCC     | (number)           | if the transactions returned belong to an Antara Module      |
| height   | (number)           | the height of the blockchain when this response was returned |
| numtxids | (number)           | the number of transaction ids that are being returned        |
| txid     | (string)           | (in development)                                             |
| vout     | (number)           | (in development)                                             |
| memfunc  | (number)           | (in development)                                             |
| type     | (string)           | the type of the filter apploed to the mempool                |
| lastpeer | (string)           | the last known peer                                          |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "mempool", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "txids": [
    "9f4a28bf746fc4a8f627302ff09159345a2ca4e3be404b7f4b02e90865c1b301",
    "f676945f97e791c54e9c2e507e715cd160ec39452aa9019610861039c199d532",
    "d6712c027c2396265b87a1645cda8fcb8ff40d6c0dd86ff932f25b51387b613b",
    "eb36d507991accc337c45bd9f0113050223fa0b7b43c76b400cf63fb21cfd26e",
    "76bafb69f1c58a0726df1719aa5eb16cdc026f06969dfeef20e5752889381b6f",
    "2d02915d392ca9323fbd2344e9f951dddf59a4a77794d121e88055d90df1bed1",
    "94f61cf68e30764ef31ea0376d74a1c9d774f6ccb4f2e612f9b650ab38405adf",
    "050020b9867306c2ab2b131391a9edf0ab72e4d4a018bb1837734850f78ba8f1"
  ],
  "address": "",
  "isCC": 0,
  "height": 1458372,
  "numtxids": 8,
  "txid": "0000000000000000000000000000000000000000000000000000000000000000",
  "vout": 0,
  "memfunc": 0,
  "type": "all mempool",
  "lastpeer": "nodeid.20"
}
```

</collapse-text>

## notarizations

**notarizations height**

This method returns the notarization data for a given height.

#### Arguments

| Name   | Type     | Description                                       |
| ------ | -------- | ------------------------------------------------- |
| height | (number) | the height at which notarization data is required |

#### Response

| Name                    | Type     | Description                                                                                                |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| result                  | (string) | whether the command was successful                                                                         |
| prev                    | (json)   | the details of the previous notarization                                                                   |
| notarized_height        | (number) | the height of the latest block that has been notarized                                                     |
| notarized_blockhash     | (string) | the blockhash of the latest block that has been notarized                                                  |
| notarization_txid       | (string) | the id of the transaction in which the notarization data is included in the chain being dPoW'ed            |
| notarization_txidheight | (number) | the height of the block in which the notarization transaction is included                                  |
| notarization_desttxid   | (string) | the id of the transaction in which the notarization data is included in the chain acting as the data store |
| next                    | (json)   | the details of the next notarization                                                                       |
| lastpeer                | (string) | the last known peer                                                                                        |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "notarizations", "params": [145677] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "prev": {
    "notarized_height": 1457780,
    "notarized_blockhash": "0cd381289fcc84f28ed9759e6803d2da4f60757da55b91eb8c78b12d99f0f855",
    "notarization_txid": "fff01156657dccb6ba80cd6aa84676a2b66f7f5eb6b882f2cbe6fe87523bd3aa",
    "notarization_txidheight": 1457796,
    "notarization_desttxid": "a2a448d2094eb0687072c38332a5629595a1b30c51aa40b7c8ee8113054a63fc"
  },
  "next": {
    "notarized_height": 1457820,
    "notarized_blockhash": "000000010110afdc044b7652e9be1d177cfb369d16f431c421b3030ab9ca3e4a",
    "notarization_txid": "ba3e0792de1324cb557b9b8a8449d9142d1699e54e677f774d8491c4036f5e1c",
    "notarization_txidheight": 1457833,
    "notarization_desttxid": "e699a1cd513a35cfb8075cbbb5d3db62a6cbcdcced5744e2dcd6744d5e399126"
  },
  "lastpeer": "nodeid.1"
}
```

</collapse-text>

## spend

**spend address amount**

<!--FIXME doc retcodes? -->

This method can be used to spend coins from the current active address to any other address.

#### Arguments

| Name    | Type     | Description                  |
| ------- | -------- | ---------------------------- |
| address | (string) | the address of the recipient |
| amount  | (number) | the amount to be sent        |

#### Response

| Name          | Type             | Description                                                                                                     |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| rewards       | (string)         | the rewards being claimed by this spend transaction                                                             |
| validated     | (string)         | (in development)                                                                                                |
| tx            | (json)           | a json object containing details of the transaction                                                             |
| nVersion      | (number)         | version of the komodo daemon                                                                                    |
| vin           | (array of jsons) | the inputs being consumed by the transaction                                                                    |
| txid          | (string)         | the id of the transaction whose input is being spent                                                            |
| vout          | (number)         | the output number in the above transaction                                                                      |
| scriptSig     | (string)         | the redeem script that satisfies the scriptPubkey of the above output                                           |
| sequenceid    | (number)         | the sequence number that has been set                                                                           |
| vout          | (array of jsons) | the outputs being created by the transaction                                                                    |
| value         | (string)         | the value in the output                                                                                         |
| scriptPubKey  | (string)         | the locking script placed on the above value                                                                    |
| nLockTime     | (number)         | the locktime that has been set                                                                                  |
| nExpiryHeight | (number)         | the block height after which the transaction will be removed from the mempool if it has not been mined          |
| valueBalance  | (number)         | (in development)                                                                                                |
| result        | (string)         | whether the command succeeded                                                                                   |
| hex           | (string)         | the transaction in hex format; this should be broadcast to the network using the [broadcast](#broadcast) method |
| retcodes      | (number)         | the return codes; an indication of the success or failure of the creation of the transaction                    |
| lastpeer      | (string)         | the last known peer                                                                                             |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "spend", "params": ["RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb",1 ] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "rewards": "0.00000000",
  "validated": "0.00000000",
  "tx": {
    "nVersion": 4,
    "vin": [
      {
        "txid": "e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",
        "vout": 1,
        "scriptSig": "47304402206774ff903a8a4b73bcd5a79fe5c744f34d2263160cd8877c198c2228c66a8a42022063e1d2d6403c395e3472a6a509f01cbff0b90e3413bc6f7bc492649302a4a64001210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06",
        "sequenceid": 4294967295
      }
    ],
    "vout": [
      {
        "value": 1,
        "scriptPubKey": "76a9144726f2838fc4d6ac66615e10604e18926e9b556e88ac"
      },
      {
        "value": 1.00989,
        "scriptPubKey": "210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ac"
      }
    ],
    "nLockTime": 1564049127,
    "nExpiryHeight": 0,
    "valueBalance": 0
  },
  "result": "success",
  "hex": "0400008085202f890155c894ada147bf184bb7dff790ca429e6860775d3bb471dc0f69a28f080977e0010000006a47304402206774ff903a8a4b73bcd5a79fe5c744f34d2263160cd8877c198c2228c66a8a42022063e1d2d6403c395e3472a6a509f01cbff0b90e3413bc6f7bc492649302a4a64001210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ffffffff0200e1f505000000001976a9144726f2838fc4d6ac66615e10604e18926e9b556e88ac48f804060000000023210217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06ace77e395d000000000000000000000000000000",
  "retcodes": [0],
  "lastpeer": "nodeid.1"
}
```

</collapse-text>

## spentinfo

**spentinfo txid vout**

This method returns the spent info of the output specified by the arguments.

#### Arguments

| Name | Type     | Description                                                           |
| ---- | -------- | --------------------------------------------------------------------- |
| txid | (string) | the id of the transaction whose spent info is required                |
| vout | (number) | the vout number in the above transaction whose spent info is required |

#### Response

| Name            | Type     | Description                                                           |
| --------------- | -------- | --------------------------------------------------------------------- |
| result          | (string) | whether the command succeeded                                         |
| txid            | (string) | the id of the transaction whose spent info is returned                |
| vout            | (string) | the vout number in the above transaction whose spent info is required |
| spentheight     | (string) | the block height at which the output has been spent                   |
| spenttxid       | (string) | the id of the transaction that spent this output                      |
| spentvini       | (string) | the input number of this output in the transaction that spent it      |
| spenttxlen      | (string) | the length of the transaction that spent this output                  |
| spenttxprooflen | (string) | the length of proof of the transaction that spent this output         |
| lastpeer        | (string) | the last known peer                                                   |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "spentinfo", "params": ["e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",1 ] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "txid": "e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",
  "vout": 1,
  "spentheight": 1458037,
  "spenttxid": "c76fede03fd821cf718b8ca7de898b95d04d7b9f7fcaeda89ccc00519476ec4a",
  "spentvini": 0,
  "spenttxlen": 254,
  "spenttxprooflen": 1655,
  "lastpeer": "nodeid.1"
}
```

</collapse-text>

## stop

**stop**

Stops the nSPV instance associated with the port specified in the curl command.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name   | Type     | Description                        |
| ------ | -------- | ---------------------------------- |
| result | (string) | whether the command was successful |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "stop", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{ "result": "success" }
```

</collapse-text>

## txproof

**txproof txid vout [height]**

This method is an internal function used by the [gettransaction](#gettransaction) method.

#### Arguments

| Name   | Type               | Description                                        |
| ------ | ------------------ | -------------------------------------------------- |
| txid   | (string)           | the id of the transaction whose proof is requested |
| vout   | (number)           | the number of the output in the above transaction  |
| height | (number, optional) |                                                    |

#### Response

| Name       | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| txid       | (string) | the id of the transaction whose proof is returned            |
| height     | (string) | the height at which the proof of the transaction is returned |
| txlen      | (string) | the length of the transaction                                |
| txprooflen | (string) | the length of the proof for the transaction                  |
| lastpeer   | (string) | the last known peer                                          |

#### :pushpin: Examples

##### Command

```bash
curl --data-binary '{"jsonrpc": "2.0", "id":"curltest", "method": "txproof", "params": ["e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",0,1453881 ] }' -H 'content-type: text/plain;' http://127.0.0.1:$port/
```

<collapse-text hidden title="Response">

```json
{
  "txid": "e07709088fa2690fdc71b43b5d7760689e42ca90f7dfb74b18bf47a1ad94c855",
  "height": 1453881,
  "txlen": 244,
  "txprooflen": 1655,
  "lastpeer": "nodeid.1"
}
```

</collapse-text>
