# Komodo Developer Path | Connecting to Another Programming Environment

#### Total Estimate Time: ~10 (per language)

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

#### The Anatomy of a curl Command

Observe the anatomy of a sample `curl` command, as executed in the terminal. 

#### Command

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"getinfo\", \"params\": []}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'
```

| Property | Description |
| -------- | ----------- |
| curl | the name of the Unix command |
| -s | the "silent" option; this prevents the shell from extraneous information about the command's progress |
| --user | informs the shell that there will be a username and a password directly following this property |
| userXXXX:passXXXX | the rpcuser and rpcpassword, as provided in the coin's .conf file |
| --data-binary | informs the shell that additional data should be included with the curl command, and that the data should be sent exactly as it is provided |
| "{ | begin the string that contains the data object; everything within this string is sent directly to the Komodo daemon for processing |
| \"jsonrpc\": \"1.0\" | informs the Komodo daemon that it is receiving a json rpc object, and that the object is formatted according to version 1.0 of the Komodo RPC's source code |
| \"id\": \"curl test\" | informs the daemon that the json object sent is a curl command |
| \"method\": \"getinfo\" | informs the daemon that the developer is using the [<b>getinfo</b>]() RPC |
| \"params\": [] | provides the required or optional parameters that accompany the Komodo RPC; in this case, the <b>getinfo</b> RPC does not have any parameters, and therefore the array is empty |
| -H | informs the shell that there is an extra http header to include |
| 'content-type: text/plain;' | the http character set parameter; states that the header is provided in plain-text format |
| http://127.0.0.1:9253/ | the http destination. The 127.0.0.1 tells the shell to serve the content to the node's localhost server. The :9253 extension is the rpcport, as provided in the coin's .conf file |

<!-- 
jq
-->

#### Command

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"getinfo\", \"params\": []}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'
```

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
 "connections": 0, 
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

You will likely have a few differences to me, I have not got a mining node running – my instance is at block 0 and connections is also 0.   Also my balance is 0.  I have not run through the faucet tutorial yet, but these are easy to fix.  I will start the mining node, mine some blocks and make sure the faucet is funded.

The pubkey will be different because there are more public keys in elliptic curve cryptography than there are oxygen atoms in the known universe.

I start the second node, and I’m calling it the second node this time because that is all it is acting as.  The names “seed” node and “mining” node are only used so we can differentiate our actions to a specific node without speaking in vague terms.  We’ve informally labeled them “seed” and “mining” for functional purposes.  The second node is up and when I issue getinfo now, my connections attribute is 1.

I start mining on the first node (“seed” node) by sending a curl request from my workstation into the docker container (the passthrrough port is exposed locally)

#### Command

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"setgenerate\", \"params\": [true,1]}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'
```

#### Response

```json
null
```

The setgenerate RPC method returns null, which we accept as having started and can check by sending RPC getmininginfo method.

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

Stopping mining we use the same setgenerate RPC method as starting, but instead of passing it a true (and how many threads we want to mine with), we send false to stop mining – again returning null from this method.

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"setgenerate\", \"params\": [false]}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'       
```

#### Response

```bash
null
```

Just to see where we are leaving the blockchain state we send the <b>getinfo</b> RPC method again and get this response.

```bash
curl -s --user user3044755432:passd30f503069f140e8e0ffe4d3f1645a8eae8e923b20e6011630cc98880ec5c47320 --data-binary "{\"jsonrpc\": \"1.0\", \"id\": \"curl test\", \"method\": \"getinfo\", \"params\": []}" -H 'content-type: text/plain;' http://127.0.0.1:9253/ | jq -r '.result'          
```

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
 "balance": 1000.12692156, 
 "blocks": 17, 
 "longestchain": 0, 
 "timeoffset": 0, 
 "tiptime": 1561273759, 
 "connections": 1, 
 "proxy": "", 
 "difficulty": 1, 
 "testnet": false, 
 "keypoololdest": 1561273223, 
 "keypoolsize": 101, 
 "paytxfee": 0, 
 "relayfee": 1e-06, 
 "errors": "", 
 "pubkey": "02213ab9f0d6765a4075757e6e2ab0eb8d5099293a19218888f967d598915ae94b", 
 "CCid": 2, 
 "name": "TUT1", 
 "sapling": -1, 
 "p2pport": 9252, 
 "rpcport": 9253, 
 "magic": 230635964, 
 "premine": 1000 
}
```

Yes it is fiddly doing it manually from the command line that enough time goes by for a dozen blocks to be mined quickly on a new chain.

Let’s explore how to use python or javascript wrapper libraries.

## Snippet 2: python (5 minutes)

A more detailed python snippet follows in Snippet 5 using a more optimized package.

If you’re using ubuntu as your host (or many other linux distributions)  python comes pre-installed as it runs many of the package managers to manage software.

Let’s validate our address, list the unspent transaction outputs and send the balance to ourselves to create a UTXO that derives from a previous spend (and not generated from mining or pre-mine supply at chain start) so that we can send to the on-chain Antara Faucet module with javascript (nodejs) in the next section.

Using  peercoin’s RPC for a quick entry into using a wrapper library 

## Snippet 3: javascript/nodejs (7 minutes)

This nodejs wrapper was started by a notary node operator and uses the popular axios library to connect with the RPC server.

## Snippet 4: javascript/browser (8 minutes)

Browser integration is limited because the RPC server does not support CORS requests, so we need to put a proxy between the browser and the blockchain’s RPC interface.  A very quick how to is at the end of this tutorial.

The browser integration is also from the same notary operator that started the nodejs wrapper library.  The difference is that it uses the browser’s native fetch http method,  so there are no 3rd party depenencies for the deployment.

## Snippet 5: python (5 minutes)

Yet another notary node operator has been using the biitcoin-slickrpc package for a python integration.

## Snippet 6: C++ (5 minutes)
Again, a notary node operator created a C++ binding.  

## Snippet 7: Java (5 minutes)
The same notary node operator that created the C++ wrapper also contributed to some Java integratioin.

## Snippet 8: Go (5 minutes)
A go-lang library was created by a notary operator.  This snippet 

