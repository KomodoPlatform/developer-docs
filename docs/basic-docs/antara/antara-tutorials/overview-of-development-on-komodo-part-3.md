# Tutorial 3: Connecting Your Programming Language Into The Tutorials & Getting Network Traces Of Client/Server Communication (~10 minutes per language) 

## Introduction

Now is the time to test your programming skills against the blockchain we’ve been working with so far.  If you want to recreate these tutorials with a “better user interface”, this is the first step.

All of the previous RPC methods are available in any programminig language.  Some languages require more plumbing because someone from the community hasn’t made a handy wrapper API yet.

Various language wrappers exist in some form within the Komodo community, the Bitcoin developer community or other crypto community.  We will include a short snipped of python code from the bitcoin community and the peer coin community.

## Language Snippets Tutorial
We will connect from our host machine to the container because we’ve exposed the RPC port of the seed node.

The host machine, if linux will have python already included but these language snippets will be shown:
- curl from a linux host running the learn-kmd guided tutorial container
- python using a peercoin developed python wrapper
- javascript using a nodejs wrapper example
- C++
- Java
- perl
- go
- dart
- ruby
- rust

If your preferred language is not listed, please make a request in our discord channel and we’ll try to add it in short time.

#### Prerequisites
The running blockchain from Tutorial 1 having optionally completed Tutorial 2.  If you haven’t, simply follow these steps to quickly start the TUT1 blockchain and interact with it using docker.

```bash
docker pull komodocakeshop/dev-allinone-learn-kmd
```

```bash
docker run -it -p 127.0.0.1:9253:9253 komodocakeshop/dev-allinone-learn-kmd
```

Execute the following in the container’s prompt and follow the onscreen instructions.

```bash
learn-kmd
```

## Getting The rpcuser & rpcpassword For TUT1 Seed Node User (1 minute)

The credentials for the seed node are stored in /root/.komodo/TUT1/TUT1.conf so if you know how to read that file you can get them there.   Alternatively, dump the user and password with the guided tutorial DUMP-RPCCREDENTIALS command for convenience.  It will also exit out of the text menu, but you can just run learn-kmd to get back into it.

- SEED-NODE > DUMP-RPCCREDENTIALS

## Snippet 1: curl (5 minutes)

Using the rpcuser and rpcpassword, the TUT1 blockchain with 1000 initial coins can connect to the RPC server on port 9253.

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

