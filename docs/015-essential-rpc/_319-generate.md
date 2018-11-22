# Generating

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## generate

```
command:

komodo-cli generate 2

response:

[
  "0475316d63fe48bb9d58373595cb334fc2553f65496edfb2fb17b9ed06f4c480",
  "00d29a2b7dec52baa9ab8e4264363f32b4989eef7dbb0a9932fbc11274195b5a"
]
```

**generate numblocks**

<aside class="notice">
  This function can only be used on a <b>regtest</b> network (for testing purposes).
</aside>

The `generate` method instructs the coin daemon to immediately mine the indicated number of blocks.

### Arguments:

Structure|Type|Description
---------|----|-----------
numblocks                                    |(numeric)                    |the desired number of blocks to generate

### Response:

Structure|Type|Description
---------|----|-----------
[                                            |                             |
blockhashes                                  |(array)                      |hashes of blocks generated
,...                                         |                             |
]                                            |                             |

## getgenerate

```
command:

komodo-cli getgenerate

response:

false
```

> You can find your rpcuser, rpcpassword, and rpcport in the coin's .conf file.

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getgenerate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": false,
  "error": null,
  "id": "curltest"
}
```

**getgenerate**

The `getgenerate` method returns a boolean value indicating the server's mining status.

The default value is false.

<aside class="notice">
  See also <b>gen</b>.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |(none)                       |

### Response:

Structure|Type|Description
---------|----|-----------
true/false                                   |(boolean)                    |indicates whether the server is set to generate coins

## setgenerate

> Turn on generation with unlimited processors:

```
command:

komodo-cli setgenerate true -1

response:

(none)
```

> Check the setting:

```
command:

komodo-cli getgenerate

response:

true
```

> Turn off generation:

```
command:

komodo-cli setgenerate false

response:

(none)
```

> Turning the setting on via json rpc:

```
command:

curl --user myrpcuser:myrpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setgenerate", "params": [true, 1] }' -H 'content-type: text/plain;' http://127.0.0.1:myrpcport/

response:

{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

**setgenerate generate ( genproclimit )**

The `setgenerate` method allows the user to set the `generate` property in the coin daemon to `true` or `false`, thus turning generation (mining) on or off.

Generation is limited to [`genproclimit`](#genproclimit) processors. Set `genproclimit` to `-1` for unlimited.

<aside class="notice">
  See also the <b>getgenerate</b> method to query the current setting, and <b>genproclimit</b> for setting processor default parameters.
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
generate                                     |(boolean, required)          |set to true to turn on generation; set to off to turn off generation
genproclimit                                 |(numeric, optional)          |set the processor limit for when generation is on; use value "-1" for unlimited

### Response:

Structure|Type|Description
---------|----|-----------
(none)                                       |(none)                       |
