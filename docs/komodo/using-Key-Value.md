# Using the Key-Value feature

To search for a key in the whole blockchain database, use the following command:

```bash
./komodo-cli kvsearch hello
```

Output:

```json
{
  "coin": "KMD",
  "currentheight": 406146,
  "key": "hello",
  "keylen": 5,
  "error": "cant find key"
}
```

To create or update a new Key/Value entry in blockchain and also securing it with your own custom password specific to tha Key/Value pair, use the following example:

```bash
./komodo-cli kvupdate hello "ehlo world" testpassphrase
```

Output:

```json
{
  "coin": "KMD",
  "height": 406151,
  "expiration": 407591,
  "flags": 1,
  "key": "hello",
  "keylen": 5,
  "value": "ehlo world",
  "valuesize": 10,
  "fee": 0.001,
  "txid": "9e662c19bbd5c8b011d60ddb86f15d115b365e243c333780e5833d399167f102"
}
```

After updating you'll find the details of the same key/value entry in blockchain will reflect the new data.

```bash
./komodo-cli kvsearch hello
```

Output

```json
{
  "coin": "KMD",
  "currentheight": 406153,
  "key": "hello",
  "keylen": 5,
  "height": 406151,
  "expiration": 407591,
  "flags": 1,
  "value": "ehlo world",
  "valuesize": 10
}
```

You can also set custom expiry date for the key/value with the following example command:

```bash
./komodo-cli kvupdate hello "ehlo world" 125 testpassphrase
```

kvupdate = command

hello = key

"ehlo world" = value

125 = days (will set 1440 blocks per day x 125)

testpassphrase = passphrase for key hello

## FAQ

- How much does KV storage cost?
  - You pay a transaction fee depending on both the key **and** value size. But it depends on which chain you want to store the kv-entry. You can use a Komodo Asset Chain and pay the fee in the Asset Chain's tokens or you can use KV chain and use it there. But each assetchain has the KV capability. So you could even use your own chain for it (due to difference in costs).
