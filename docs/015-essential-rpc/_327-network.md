# Network

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## addnode

```  
command:

komodo-cli addnode "192.168.0.6:8233" "onetry"

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addnode", "params": ["192.168.0.6:8233", "onetry"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(none)
```

**addnode "node" "add|remove|onetry"**

The `addnode` method attempts to add or remove a node from the addnode list, or to make a single attempt to connect to a node.

### Arguments:

Structure|Type|Description
---------|----|-----------
"node"                                       |(string, required)           |the node (see [`getpeerinfo`](#getpeerinfo) for nodes)
"command"                                    |(string, required)           |'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## clearbanned

```  
command:

komodo-cli clearbanned

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "clearbanned", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(none)
```

**clearbanned**

The `clearbanned` method clears all banned IPs.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## disconnectnode

```
command:

komodo-cli disconnectnode "192.168.0.6:8233"

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "disconnectnode", "params": ["192.168.0.6:8233"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(none)
```

**disconnectnode "node"**

The `disconnectnode` method instructs the daemon to immediately disconnect from the specified node.

Use `getpeerinfo` to determine the result.

### Arguments:

Structure|Type|Description
---------|----|-----------
"node"                                       |(string, required)           |the node's address (see [`getpeerinfo`](#getpeerinfo) for nodes)

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## getaddednodeinfo


```  
command:

komodo-cli getaddednodeinfo true

response:

[
  {
    "addednode": "78.47.196.146",
    "connected": true,
    "addresses": [
      {
        "address": "78.47.196.146:7770",
        "connected": "outbound"
      }
    ]
  }
]
```

```
command:

komodo-cli getaddednodeinfo true "78.47.205.239"

response:

[
  {
    "addednode": "78.47.205.239",
    "connected": true,
    "addresses": [
      {
        "address": "78.47.205.239:7770",
        "connected": "outbound"
      }
    ]
  }
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddednodeinfo", "params": [true, "78.47.205.239"] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    {
      "addednode": "78.47.205.239",
      "connected": true,
      "addresses": [
        {
          "address": "78.47.205.239:7770",
          "connected": "outbound"
        }
      ]
    }
  ],
  "error": null,
  "id": "curltest"
}
```

**getaddednodeinfo dns ( "node" )**

The `getaddednodeinfo` method returns information about the given added node, or all added nodes.

If `dns` is set to `false`, only a list of added nodes is returned. Otherwise, connection information is also provided.

<aside class="notice">
  Nodes added via <b>onetry</b> are not listed here.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
dns                                          |(boolean, required)          |if false, only a list of added nodes will be provided; otherwise, connection information is also provided
"node"                                       |(string, optional)           |if provided, the method returns information about this specific node; otherwise, all nodes are returned

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"addednode"                                  |(string)                     |the node ip address
"connected"                                  |(boolean)                    |if connected
"addresses"                                  |                             |
{                                            |                             |
"address"                                    |(string)                     |the server host and port
"connected"                                  |(string)                     |"connected" accepts two possible values: "inbound" or "outbound"
}                                            |                             |
,                                            |                             |
]                                            |                             |
}                                            |                             |
,                                            |                             |
]                                            |                             |

## getconnectioncount

```  
command:

komodo-cli getconnectioncount

response:

10
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getconnectioncount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": 10,
  "error": null,
  "id": "curltest"
}
```

**getconnectioncount**

The `getconnectioncount` method returns the number of connections to other nodes.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
n                                            |(numeric)                    |the connection count

## getdeprecationinfo

```  
command:

komodo-cli getdeprecationinfo

response:

{
  "version": 1001550,
  "subversion": "/MagicBean:1.0.15/",
  "deprecationheight": 1400000
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getdeprecationinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": {
    "version": 1001550,
    "subversion": "/MagicBean:1.0.15/",
    "deprecationheight": 1400000
  },
  "error": null,
  "id": "curltest"
}
```

**getdeprecationinfo**

The `getdeprecationinfo` method returns an object containing current version and deprecation block height.

<aside class="notice">
  This method is applicable only to the KMD mainnet.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"version"                                    |(numeric)                    |the server version
"subversion"                                 |(string)                     |the server sub-version string (i.e. "/MagicBean:x.y.z[-v]/")
"deprecationheight"                          |(numeric)                    |the block height at which this version will deprecate and shut down (unless [`disabledeprecation`](https://z.cash/blog/new-release-1-1-2/) is set)
}                                            |                             |

## getnettotals

```  
command:

komodo-cli getnettotals

response:

{
  "totalbytesrecv": 29853501,
  "totalbytessent": 15589555,
  "timemillis": 1536821874559
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnettotals", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": {
    "totalbytesrecv": 29872297,
    "totalbytessent": 15650741,
    "timemillis": 1536821938902
  },
  "error": null,
  "id": "curltest"
}
```

**getnettotals**

The `getnettotals` method returns information about network traffic, including bytes in, bytes out, and current time.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"totalbytesrecv"                             |(numeric)                    |total bytes received
"totalbytessent"                             |(numeric)                    |total bytes sent
"timemillis"                                 |(numeric)                    |total cpu time
}                                            |                             |

## getnetworkinfo

```  
command:

komodo-cli getnetworkinfo

response:

{
  "version": 1001550,
  "subversion": "/MagicBean:1.0.15/",
  "protocolversion": 170003,
  "localservices": "0000000000000001",
  "timeoffset": -1,
  "connections": 10,
  "networks": [
    {
      "name": "ipv4",
      "limited": false,
      "reachable": true,
      "proxy": "",
      "proxy_randomize_credentials": false
    },
    {
      "name": "ipv6",
      "limited": false,
      "reachable": true,
      "proxy": "",
      "proxy_randomize_credentials": false
    },
    {
      "name": "onion",
      "limited": true,
      "reachable": false,
      "proxy": "",
      "proxy_randomize_credentials": false
    }
  ],
  "relayfee": 0.00000100,
  "localaddresses": [
  ],
  "warnings": ""
}
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": {
    "version": 1001550,
    "subversion": "/MagicBean:1.0.15/",
    "protocolversion": 170003,
    "localservices": "0000000000000001",
    "timeoffset": -1,
    "connections": 10,
    "networks": [
      {
        "name": "ipv4",
        "limited": false,
        "reachable": true,
        "proxy": "",
        "proxy_randomize_credentials": false
      },
      {
        "name": "ipv6",
        "limited": false,
        "reachable": true,
        "proxy": "",
        "proxy_randomize_credentials": false
      },
      {
        "name": "onion",
        "limited": true,
        "reachable": false,
        "proxy": "",
        "proxy_randomize_credentials": false
      }
    ],
    "relayfee": 1e-06,
    "localaddresses": [],
    "warnings": ""
  },
  "error": null,
  "id": "curltest"
}
```

**getnetworkinfo**

The `getnetworkinfo` method returns an object containing various state info regarding P2P networking.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
{                                            |                             |
"version"                                    |(numeric)                    |the server version
"subversion"                                 |(string)                     |the server subversion string (i.e. "/MagicBean:x.y.z[-v]/")
"protocolversion"                            |(numeric)                    |the protocol version
"localservices"                              |(string)                     |the services we offer to the network
"timeoffset"                                 |(numeric)                    |the time offset
"connections"                                |(numeric)                    |the number of connections
"networks":                                  |                             |
{                                            |                             |
"name"                                       |(string)                     |network (ipv4, ipv6 or onion)
"limited"                                    |(boolean)                    |whether the network is limited using -onlynet
"reachable"                                  |(boolean)                    |whether the network is reachable
"proxy"                                      |(string)                     |(submitted as "host:port") the proxy that is used for this network, or empty if none
}                                            |                             |
,                                            |                             |
],                                           |                             |
"relayfee"                                   |(numeric)                    |minimum relay fee for non-free transactions in COIN/kB
"localaddresses":                            |                             |
{                                            |                             |
"address"                                    |(string)                     |network address
"port"                                       |(numeric)                    |network port
"score"                                      |(numeric)                    |relative score
}                                            |                             |
,                                            |                             |
]                                            |                             |
"warnings"                                   |(string)                     |any network warnings (such as alert messages)
}                                            |                             |

## getpeerinfo

```  
command:

komodo-cli getpeerinfo

response:

[
  {
    "id": 1,
    "addr": "78.47.196.146:7770",
    "addrlocal": "69.178.104.172:49724",
    "services": "0000000000000001",
    "lastsend": 1536827621,
    "lastrecv": 1536827617,
    "bytessent": 5181633,
    "bytesrecv": 6245958,
    "conntime": 1536792412,
    "timeoffset": -2,
    "pingtime": 0.234065,
    "version": 170003,
    "subver": "/MagicBean:1.0.15/",
    "inbound": false,
    "startingheight": 1007074,
    "banscore": 45,
    "synced_headers": 1007671,
    "synced_blocks": 1007671,
    "inflight": [
    ],
    "whitelisted": false
  }
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getpeerinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    {
      "id": 1,
      "addr": "78.47.196.146:7770",
      "addrlocal": "69.178.104.172:49724",
      "services": "0000000000000001",
      "lastsend": 1536827702,
      "lastrecv": 1536827698,
      "bytessent": 5195639,
      "bytesrecv": 6247781,
      "conntime": 1536792412,
      "timeoffset": -2,
      "pingtime": 0.234605,
      "version": 170003,
      "subver": "/MagicBean:1.0.15/",
      "inbound": false,
      "startingheight": 1007074,
      "banscore": 45,
      "synced_headers": 1007672,
      "synced_blocks": 1007672,
      "inflight": [],
      "whitelisted": false
    }
  ],
  "error": null,
  "id": "curltest"
}
```

**getpeerinfo**

The `getpeerinfo` method returns data about each connected network node as a json array of objects.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"id"                                         |(numeric)                    |peer index
"addr":,                                     |(string)                     |the ip address and port of the peer ("host:port")
"addrlocal"                                  |(string)                     |local address ("ip:port")
"services"                                   |(string)                     |the services offered
"lastsend"                                   |(numeric)                    |the time in seconds since epoch (Jan 1 1970 GMT) of the last send
"lastrecv"                                   |(numeric)                    |the time in seconds since epoch (Jan 1 1970 GMT) of the last receive
"bytessent"                                  |(numeric)                    |the total bytes sent
"bytesrecv"                                  |(numeric)                    |the total bytes received
"conntime"                                   |(numeric)                    |the connection time in seconds since epoch (Jan 1 1970 GMT)
"timeoffset"                                 |(numeric)                    |the time offset in seconds
"pingtime"                                   |(numeric)                    |ping time
"pingwait"                                   |(numeric)                    |ping wait
"version"                                    |(numeric)                    |the peer version, such as 170002
"subver"                                     |(string)                     |the string version (i.e. "/MagicBean:x.y.z[-v]/")
"inbound"                                    |(boolean)                    |inbound (true) or outbound (false)
"startingheight"                             |(numeric)                    |the starting height (block) of the peer
"banscore"                                   |(numeric)                    |the ban score
"synced_headers"                             |(numeric)                    |the last header we have in common with this peer
"synced_blocks"                              |(numeric)                    |the last block we have in common with this peer
"inflight":                                  |                             |
number,                                      |(numeric)                    |the heights of blocks we're currently asking from this peer
...                                          |                             |
]                                            |                             |
}                                            |                             |
,                                            |                             |
]                                            |                             |

## listbanned

```  
command:

komodo-cli listbanned

response:

[
  {
    "address": "78.47.205.239/255.255.255.255",
    "banned_until": 1536945306
  }
]
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listbanned", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": [
    {
      "address": "78.47.205.239/255.255.255.255",
      "banned_until": 1536945306
    }
  ],
  "error": null,
  "id": "curltest"
}
```

**listbanned**

The `listbanned` method lists all banned IP addresses and subnets.

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
{                                            |                             |
"address"                                    |(string)                     |the address/subnet that is banned
"banned_until"                               |(numeric)                    |the timestamp, at which point the ban will be removed
},                                           |                             |
...                                          |                             |
]                                            |                             |

## ping

```  
command:

komodo-cli ping

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "ping", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

**ping**

The `ping` method requests that a ping be sent to all other nodes, to measure ping time.

Results provided in `getpeerinfo`, `pingtime` and `pingwait` fields are decimal seconds.

The `ping` command is handled in queue with all other commands, so it measures processing backlog, not just network ping.

<aside class="notice">
  Use <b>getpeerinfo</b> to see <b>ping</b> results.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

## setban

```  
command:

komodo-cli setban "192.168.0.6" "add" 86400

response:

(none)
```

```
command:

komodo-cli setban "192.168.0.0/24" "add"

response:

(none)
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setban", "params": ["78.47.205.239", "add", 86400] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

(none)
```

**setban "ip(/netmask)" "add|remove" (bantime) (absolute)**

The `setban` method attempts to add or remove an IP address (and subnet, if indicated) from the banned list.

### Arguments:

Structure|Type|Description
---------|----|-----------
"ip(/netmask)"                               |(string, ip required)        |the IP/subnet (see `getpeerinfo` for nodes ip) with an optional netmask (default is /32 = single ip)
"command"                                    |(string, required)           |use "add" to add an IP/subnet to the list, or "remove" to remove an IP/subnet from the list
bantime                                      |(numeric, optional)          |indicates how long (in seconds) the ip is banned (or until when, if [absolute] is set). 0 or empty means the ban is using the default time of 24h, which can also be overwritten using the -bantime runtime parameter.
absolute                                     |(boolean, optional)          |if set to true, the bantime must be an absolute timestamp (in seconds) since epoch (Jan 1 1970 GMT)

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |                             |

<aside class="notice">
  Use <b>listbanned</b> to view results.
</aside>
