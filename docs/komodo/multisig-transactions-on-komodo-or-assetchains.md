# Dealing with Multisig addresses and transactions

Multisignature (often called multisig) is a form of technology used to add additional security for cryptocurrency transactions. Multisignature addresses require another user or users sign a transaction before it can be broadcast onto the block chain. _(Source: Wikipedia)_

In this short guide we will demonstrate 2of2 multisignature wallet creation and usage. We'll use 2 nodes and Komodo chain. On Komodo assetchain steps will be same, just add `-ac_name=COIN` param.

There are various tools you can use for multisig including Agama. Check the related materials section at the end of this guide for links.

## Step 1 - Get a new address, pubkey and privkey

First lets create addresses on two nodes which we will combine the into single mutlisig address. Also we will need pubkey and privkey (WIF) for each address:

### Node 1:

#### Generate new address:

Command:

```bash
./komodo-cli getnewaddress
```

Output:

```bash
RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

#### Get pubkey value using `validateaddress`:

Command:

```bash
./komodo-cli validateaddress RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

Output:

```JSON
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

#### Get private key (WIF):

Command:

```bash
./komodo-cli dumpprivkey RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

Output:

```bash
UrunDGyFJu5UFZG7BnFx9R6iaPmWaBX8iqHzRpFRjNp8kBEQYKNt
```

#### To summarise data from Node 1:

```bash
address: RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
pubkey:  02dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a26
privkey: UrunDGyFJu5UFZG7BnFx9R6iaPmWaBX8iqHzRpFRjNp8kBEQYKNt
```

### Node 2:

On a different node, follow the same steps to generate new address, validate and export private key.
Command:

#### Generate new address:

Command:

```bash
./komodo-cli getnewaddress
```

Output:

```
RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s
```

#### Get pubkey value using `validateaddress`:

Command:

```bash
./komodo-cli validateaddress RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s
```

Output:

```JSON
{
  "isvalid": true,
  "address": "RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s",
  "scriptPubKey": "76a9141c0f1c482d38c43bb847506a527521d2204afe6588ac",
  "segid": 38,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a2816",
  "iscompressed": true,
  "account": ""
}
```

#### Get private key (WIF):

Command:

```bash
./komodo-cli dumpprivkey RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s
```

Output:

```bash
UsuE7jG8BD1CV2xuCoBCwgzzbs4HqZ2P2im5fdyJmP2tSd3arAv7
```

#### To summarise data from Node 2:

```bash
address: RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s
pubkey:  032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a2816
privkey: UsuE7jG8BD1CV2xuCoBCwgzzbs4HqZ2P2im5fdyJmP2tSd3arAv7
```

## Step 2 - Create multisig Address

Now we can combine pubkeys to musig (2of2 in this example). You can execute the following command on any node. The command will output the `redeemScript` which we will require to spend funds.

Command:

```bash
./komodo-cli createmultisig 2 '["02dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a26","032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a2816"]'
```

Output:

```JSON
{
  "address": "bEP3HK73CboW8tGN8obyHUQteBzYjFzgNm",
  "redeemScript": "522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652ae"
}
```

## Step 3 - Fund multisig address

Lets fund our multisig address. You can send funds from any source.

Command:

```bash
./komodo-cli sendtoaddress bEP3HK73CboW8tGN8obyHUQteBzYjFzgNm 7.77
```

Output:

```bash
194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c
```

## Step 4 - Create rawtransaction to spend funds

Now let's spend funds from multisig address. We need to create a rawtransaction first. As input We are using unspent vout of transaction by which musig was funded. As destination address we put address to which we want to send amount of funds.

Please note, that in this example we are sending whole deposited sum back, but in case if you don't want to send all amount you have to manually specify second (change) output. Because, by default change will be counted as miner fee. Most probably you'll get the `AcceptToMemoryPool: absurdly high fees` error because of this reason. (It can be passed trough by additional sendrawtransaction `true` param which actually set `allowhighfees=true`, but very unlikely you want to do it).

Command:

```bash
./komodo-cli createrawtransaction '[{"txid":"194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c","vout":1}]' '{"RP81MSVu39QgXhGDHfnk9d9KMnp4vhEVBu":7.77}'
```

Output:

```bash
0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f190100000000ffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000
```

## Step 5 - Sign the rawtransaction

You need to sign the raw transaction using both nodes to be able to broadcast & spend.

### Node 1:

Command:

```bash
./komodo-cli signrawtransaction "0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f190100000000ffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000" '[{"txid":"194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c","vout":1,"scriptPubKey":"a914121cbc7a828772bd4612bc7b9765cbbf13d0b3cc87","redeemScript":"522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652ae","amount":7.77}]' '["UrunDGyFJu5UFZG7BnFx9R6iaPmWaBX8iqHzRpFRjNp8kBEQYKNt"]'
```

Output:

```JSON
{
  "hex": "0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f19010000009200483045022100a5f4bdf5b61a4f4baf0b5b48f69488b8f752e36cbac23ec0c762bba99552ac9e022036e658c7c8c19ec4bd423fcc6a109a811b189311fc874dd466e58a1755ef4e940147522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652aeffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000",
  "complete": false,
  "errors": [
    {
      "txid": "194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c",
      "vout": 1,
      "scriptSig": "00483045022100a5f4bdf5b61a4f4baf0b5b48f69488b8f752e36cbac23ec0c762bba99552ac9e022036e658c7c8c19ec4bd423fcc6a109a811b189311fc874dd466e58a1755ef4e940147522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652ae",
      "sequence": 4294967295,
      "error": "Operation not valid with the current stack size"
    }
  ]
}
```

### Node 2

Use the HEX value which you get from Node 1 signing output and change privkey to Node 2 privkey.

Comamnd:

```bash
./komodo-cli signrawtransaction "0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f19010000009200483045022100a5f4bdf5b61a4f4baf0b5b48f69488b8f752e36cbac23ec0c762bba99552ac9e022036e658c7c8c19ec4bd423fcc6a109a811b189311fc874dd466e58a1755ef4e940147522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652aeffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000" '[{"txid":"194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c","vout":1,"scriptPubKey":"a914121cbc7a828772bd4612bc7b9765cbbf13d0b3cc87","redeemScript":"522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652ae","amount":7.77}]' '["UsuE7jG8BD1CV2xuCoBCwgzzbs4HqZ2P2im5fdyJmP2tSd3arAv7"]'
```

Output:

```JSON
{
  "hex": "0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f1901000000da00483045022100a5f4bdf5b61a4f4baf0b5b48f69488b8f752e36cbac23ec0c762bba99552ac9e022036e658c7c8c19ec4bd423fcc6a109a811b189311fc874dd466e58a1755ef4e940147304402200abc8c1e1e26090a7012df8859a3986229da34b0edd82c42a64efc8b89390e6702202582cbdce3de13fe59196228d4d0a6a80916e23ccb343f1cf32515688a938ebb0147522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652aeffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000",
  "complete": true
}
```

We need to broadcast the above raw HEX to finish sending our transaction.

## Step 6 - Broadcast the transaction

Finally we are ready to broadcast our musig transaction:

Command:

```bash
./komodo-cli sendrawtransaction 0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f1901000000da00483045022100a5f4bdf5b61a4f4baf0b5b48f69488b8f752e36cbac23ec0c762bba99552ac9e022036e658c7c8c19ec4bd423fcc6a109a811b189311fc874dd466e58a1755ef4e940147304402200abc8c1e1e26090a7012df8859a3986229da34b0edd82c42a64efc8b89390e6702202582cbdce3de13fe59196228d4d0a6a80916e23ccb343f1cf32515688a938ebb0147522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652aeffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000
```

Output:

```
23c2aaaf458ada3f171ee5d274e8dcfc91b62099ec15e4b2d02da2b2d1172cb1
```

Where `23c2aaaf458ada3f171ee5d274e8dcfc91b62099ec15e4b2d02da2b2d1172cb1` is output txid which you can use in explorer or other places to verify the transaction.

**Related Materials:**

- [Detailed Article in Russian Language](https://medium.com/@decker.komodo/%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BC%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B5%D0%B9-multisig-%D0%B2-komodo-9d8f8c48da52)
- [Multisig Web Tool](https://deckersu.github.io/coinbin/#newMultiSig)
- [Agama Download](https://komodoplatform.com/komodo-wallets)
- [Agama MultiSig Guide](https://support.komodoplatform.com/en/support/solutions/articles/29000027745-create-sign-and-send-a-multi-sig-transaction)
