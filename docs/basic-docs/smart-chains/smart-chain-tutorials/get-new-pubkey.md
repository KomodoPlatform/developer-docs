# Get a new pubkey to launch a Smart Chain

## Generate a new address

Command:

```bash
./komodo-cli -ac_name=HELLO getnewaddress
```

Output:

```bash
RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

## Get the pubkey value using `validateaddress`

Command:

```bash
./komodo-cli -ac_name=HELLO validateaddress RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

Output:

```json
{
  "isvalid": true,
  "address": "RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5",
  "scriptPubKey": "76a91431a8cbc716e21238079729d46cb655ae7fadc9e388ac",
  "segid": 37,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "02dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a26",
  "iscompressed": true,
  "account": ""
}
```

## Get the private key (WIF)

Command:

```bash
./komodo-cli -ac_name=HELLO dumpprivkey RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

Output:

```bash
UrunDGyFJu5UFZG7BnFx9R6iaPmWaBX8iqHzRpFRjNp8kBEQYKNt
```

## Summary of the relevant data collected

```bash
address: RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
pubkey:  02dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a26
privkey: UrunDGyFJu5UFZG7BnFx9R6iaPmWaBX8iqHzRpFRjNp8kBEQYKNt
```