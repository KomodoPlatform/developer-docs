# Komodo Developer Path | Connecting to Another Programming Environment

#### Total Estimate Time: ~10-20 Minutes

This tutorial is part of a series. 

[To return to the previous tutorial, click here.]()

## Introduction

Until now we have relied on automated functions in the guided tutorials for assistance in executing Remote Procedure Calls (RPC's). Such RPC's include <b>getinfo</b>, <b>listunspent</b>, <b>faucetfund</b>, and more.

The very purpose of an RPC is to allow another programming environment to access the functionality of the software. For example, an RPC allows Python or JavaScript source code to send a secure call to the Komodo Smart Chain with a request to perform an action, and to return information about the result.

All RPC's are available in any mainstream programming language, and we are now prepared to experiment with this feature.

In this tutorial, we focus on the most essential aspect of this process, the Unix `curl` command. Using `curl` to access Komodo software from the source code of another environment is relatively straightforward, depending upon the programming language itself. 

The guided-tutorial software that holds our `TUT1` Smart Chain has an exposed RPC port that we use to connect to our seed node.

#### Inquiring About Language Wrappers

Before we continue with the tutorial, there is a tangential point to mention.

In the Komodo community, for many popular programming languages there are available enhancements beyond the `curl` command. These enhancements allow a developer to more easily integrate with Komodo. 

In these languages, someone from the Komodo community has created a language "wrapper." A wrapper essentially allows a developer to import all the Komodo RPC calls directly into the source files of their chosen language.

Therefore, the developer can often simply call the Komodo RPC suite into the source file and access each RPC on demand.

For information regarding availability of language wrappers for your preferred language, please reach out to our team and to the community on [Discord.](https://komodoplatform.com/discord)

## Obtaining the Necessary Passwords and Credentials

##### Estimated Time: 1 minute

The Smart Chain software controls access to all your valuable assets. Allowing other software on your node to access and manipulate these assets is a potential security risk. Therefore, the Smart Chain software requires a password and username from any software that attempts to access the Smart Chain's exposed port.

These credentials are called the rpcpassword, rpcuser, and rpcport.

The file that holds these values is typically installed in a `~/komodo/COINNAME/COINNAME.conf` file. You can change the values in this file before launching the Komodo software, and they will be loaded at runtime.

In our guided tutorial, the name of our coin is `TUT1`, and therefore the name of the credential file is `TUT1.conf`. 

We have placed the `TUT1.conf` file for the `SEED` node in a different location, to allow for the underlying tutorial software to function properly.

Here is the location: `/root/.komodo/TUT1/TUT1.conf`

<!--

Sidd: The function below doesn't return the RPC port. 

Alternatively, the `SEED-MENU` also features a function to display, or "dump," the credentials: `DUMP-RPCCREDENTIALS`. Executing this function will kill the guided-tutorial software. Execute `learn-kmd` at the terminal prompt to re-enter the software.

-->

Obtain your `TUT1` RPC credentials and copy/paste them into a nearby location before continuing with the tutorial.

## Using curl

##### Estimated Time: 5 minutes

#### Conceptualizing the curl Command

A `curl` command must be sent to the Komodo software daemon through a Unix shell, or terminal.

When using `curl` from another programming environment, the developer's source code first opens an instance of a Unix terminal. This is typically achieved through some type of environment enhancement. For example, a JavaScript developer might use Node.js to open a Unix terminal instance. The specific Node.js function the developer would use is [<b>child_process.exec().</b>](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)

The developer's source file then creates a `curl` command that fulfills the intended purposes of the developer's software, and sends this `curl` command to the Komodo software daemon.

The `curl` command sends a json reply, which the developer captures in their source code and utilizes in any manner the developer desires.

#### Installing jq

The returned json object is provided without human-friendly json formatting.

To make json responses easier to read, Komodo developers typically make use of a third-party software called "jq".

[You can download and install jq at this link.](https://stedolan.github.io/jq/)

Once installed, with each `curl` command simply include a pipe and a call to jq, along with any desired jq optional parameters. Komodo developers typically include the  `-r` parameter for raw outputs, to help jq interpret the raw string.

## The Anatomy of a curl Command

Observe the anatomy of a sample `curl` command, as executed in the terminal. For this example, we use the <b>getinfo</b> RPC. 

#### Command

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"getinfo\", \"params\": []}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'
```

| Property | Description |
| -------- | ----------- |
| curl | the name of the Unix command |
| -s | the "silent" option; this prevents the shell from returning extraneous information about the command's progress |
| --user | informs the shell that there will be a username and a password directly following this property |
| userXXXX:passXXXX | the rpcuser and rpcpassword, as provided in the coin's .conf file |
| --data-binary | informs the shell that additional data should be included with the curl command, and that the data should be sent exactly as it is provided |
| "{ | begin the string that contains the data object; everything within this string is sent directly to the Komodo daemon for processing |
| \"jsonrpc\": \"1.0\" | informs the Komodo daemon that it is receiving a json rpc object, and that the object is formatted according to version 1.0 of the Komodo RPC's source code |
| \"id\": \"curl test\" | informs the daemon that the json object sent is a curl command |
| \"method\": \"getinfo\" | informs the daemon that the developer is using the [<b>getinfo</b>]() RPC |
| \"params\": [] | provides the required or optional parameters that accompany the Komodo RPC; in this case, the <b>getinfo</b> RPC does not have any parameters, and therefore the array is empty |
| }" | end of the string that contains the data object |
| -H | informs the shell that there is an extra http header to include |
| 'content-type: text/plain;' | the http character set parameter; states that the header is provided in plain-text format |
| http://127.0.0.1:9253/ | the http destination. The 127.0.0.1 tells the shell to serve the content to the node's localhost server. The :9253 extension is the rpcport, as provided in the coin's .conf file |
| \| jq -r | instructs the shell to pipe the response through the jq software; the -r instruction informs jq that this is a raw object |


The response to the <b>getinfo</b> RPC `curl` command is as follows. Note that this is a json string and the developer must actively convert the response into a json object. For example, in JavaScript the appropriate function is `JSON.parse()`.

#### Response

```json
{ 
 "version": 2001526, 
 "protocolversion": 170007, 
 "KMDversion": "0.4.0a", 
 "synced": false, 
 "notarized": 0, 
 "prevMoMheight": 0, 
 "notarizedhash": "0000000000000000000000000000000000000000000000000000000000000000", 
 "notarizedtxid": "0000000000000000000000000000000000000000000000000000000000000000", 
 "notarizedtxid_height": "mempool", 
 "KMDnotarized_height": 0, 
 "notarized_confirms": 0, 
 "walletversion": 60000, 
 "balance": 0, 
 "blocks": 0, 
 "longestchain": 0, 
 "timeoffset": 0, 
 "tiptime": 1231006505, 
 "connections": 1, 
 "proxy": "", 
 "difficulty": 1, 
 "testnet": false, 
 "keypoololdest": 1561227622, 
 "keypoolsize": 101, 
 "paytxfee": 0, 
 "relayfee": 1e-06, 
 "errors": "", 
 "pubkey": "030746f79b31d1bb46aa10ee8ee72a06eba7375ca0aca411fa684936457363cdad", 
 "CCid": 2, 
 "name": "TUT1", 
 "sapling": -1, 
 "p2pport": 9252, 
 "rpcport": 9253, 
 "magic": 230635964, 
 "premine": 1000 
}
```

## Mine on the Seed Node Using curl

Use `curl` to tell the `SEED` node to begin mining the `TUT1` Smart Chain. Use the [<b>setgenerate</b>]() RPC for this function. 

Note that this RPC requires parameters in the `curl` command: `\"params\": [true,1]`

#### Command

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"setgenerate\", \"params\": [true,1]}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'
```

The <b>setgenerate</b> RPC always returns `null` as a response.

#### Response

```json
null
```

## Discover the State of Mining on the Seed Node

Use the [<b>getmininginfo</b>]() RPC to ensure that the command executed successfully. 

#### Command

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"getmininginfo\", \"params\": []}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'                  
```

#### Response

```json
{ 
 "blocks": 1, 
 "currentblocksize": 1000, 
 "currentblocktx": 0, 
 "difficulty": 1, 
 "errors": "", 
 "genproclimit": 1, 
 "localsolps": 1.041666666666667, 
 "networksolps": 0, 
 "networkhashps": 0, 
 "pooledtx": 0, 
 "testnet": false, 
 "chain": "main", 
 "staking": false, 
 "generate": true, 
 "numthreads": 1 
}
```

## Stop Mining on the Seed Node

To instruct the node to cease mining, we again use the [<b>setgenerate</b>]() RPC, but this time we provide the parameter as `false`.

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"setgenerate\", \"params\": [false]}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'       
```

#### Response

```bash
null
```

--------------------

[Proceed to next tutorial article in the series.]()

