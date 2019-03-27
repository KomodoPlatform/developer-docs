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
  See also [`-gen`](## gen).
</aside>

### Arguments:

Structure|Type|Description
---------|----|-----------
(none)                                       |(none)                       |

### Response:

Structure|Type|Description
---------|----|-----------
true/false                                   |(boolean)                    |indicates whether the server is set to generate coins
