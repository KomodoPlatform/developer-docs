# Access `komodod`'s JSON-RPC interface using Python

We use the package [slick-bitcoinrpc](https://github.com/barjomet/slick-bitcoinrpc)

## Installation

Installing the module `slick-bitcoinrpc` and its dependencies.

```bash
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python3.6 python3.6-dev python3-pip libgnutls28-dev libssl-dev
python3.6 -m pip3 install setuptools wheel slick-bitcoinrpc
```

## Usage

- Once the `Proxy` method is called, the object it returns can be used to access `komodod`'s methods any number of times.
- In general, there is no need to convert arguments to strings before they are passed in. But for the [cclib](../basic-docs/komodo-api/cclib.html) methods, all the arguments need to be passed in as strings.
- Find the rpcuser, rpcpassword, rpcport from the coin's `.conf` file

```python
#!/usr/bin/env python3.6

from slickrpc import Proxy

rpcuser = "user784657926501740916"
rpcpassword = "pass893458925237490234890t1941289369215692521238971040172t012039760782t5712d"
rpcport = "8881"

komodo = Proxy("http://{}:{}@127.0.0.1:{}".format(rpcuser, rpcpassword, rpcport))
# Print the best block
print(komodo.getblock(komodo.getbestblockhash()))
# Using a CC Lib method
pubkeys = ['0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a', '02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567']
print(komodo.cclib("combine", "18", str(pubkeys)))
```


