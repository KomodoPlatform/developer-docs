# Multisignature Transaction Creation and Walkthrough

## Introduction

Multisignature (multisig) is a technology used to increase the number of signatures required for a transaction from an address. This provides an additional layer of security to cryptocurrency transactions.

In this guide we demonstrate the creation and usage of a `2of2` multisignature wallet. We use two nodes with the KMD main chain.

To accomplish the same task on another Komodo Smart Chain, add `-ac_name=NAMEOFCHAIN` to each command.

## Get a New Address, Public Key, and Private Key

Create addresses on two nodes. We will combine these two addresses into a single multisig address.

## Node One

#### Generate a New Address

##### Command

```
./komodo-cli getnewaddress
```

##### Response

```
RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

#### Get the Public Key Using validateaddress

##### Command

```shell
./komodo-cli validateaddress RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

##### Response 

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

#### Get the Private Key

##### Command

```shell
./komodo-cli dumpprivkey RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
```

##### Response

```
DO_NOT_USEBnFx9R6iaPmWaBX8iqHzRpFRjNp8kBEQYKNt
```

#### A Summarization of Data from Node One

```
# address: RDomQ4tftJGjcHBVpAUx549jZfxtJx74r5
# pubkey:  02dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a26
# privkey: UrunDGyFJu5UFZG7BnFx9R6iaPmWaBX8iqHzRpFRjNp8kBEQYKNt
```

## Node Two

Follow the same steps.

#### Generate a New Address

##### Command

```shell
./komodo-cli getnewaddress
```

##### Response

```
RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s
```

#### Get the Pubkey Value Using validateaddress

##### Command

```shell
./komodo-cli validateaddress RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s
```

##### Response

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

#### Get the Private Key

##### Command

```shell
./komodo-cli dumpprivkey RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s
```

##### Response

```
UsuE7jG8BD1CV2xuCoBCwgzzbs4HqZ2P2im5fdyJmP2tSd3arAv7
```

#### Summarization of Data From Node Two

```
address: RBqZ6nHcANekX3zxF9y4zRyfB6X8VEWF7s
pubkey:  032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a2816
privkey: UsuE7jG8BD1CV2xuCoBCwgzzbs4HqZ2P2im5fdyJmP2tSd3arAv7
```

## Create a Multisig Address

Combine the pubkeys to create a `2of2` multisig address. 

A `2of2` address requires that both addresses sign for every transaction.

::: tip

You can customize the signature requirements for essentially any combination. For example, you can make a <b>3of5</b> multisig address that requires <b>3</b> of <b>5</b> available addresses for each transaction.

:::

Execute the following command on either node. The command returns the `redeemScript` json object, which is required to spend funds.

##### Command

```shell
./komodo-cli createmultisig 2 '["02dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a26","032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a2816"]'
```

##### Response

```JSON
{
  "address": "bEP3HK73CboW8tGN8obyHUQteBzYjFzgNm",
  "redeemScript": "522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652ae"
}
```

## Fund the multisig Address

Fund the multisig address. 

(You may use either node.)

##### Command

```shell
./komodo-cli sendtoaddress bEP3HK73CboW8tGN8obyHUQteBzYjFzgNm 7.77
```

##### Response

```
194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c
```

## Create the Raw Transaction

As input we use the unspent vout of the transaction used to create the multisig address. We also place our desired target destination address in the transaction.

In this example, we send the full `7.77` sum to the destination address.

If you do not want to send the full amount, you must manually specify the "change" address and state how much of the change you desire to keep.

Recall that any amount taken from the initial utxo and not included in either the destination address, or in the change address, will automatically be given to the miners as a mining fee. 

##### Command

```shell
./komodo-cli createrawtransaction '[{"txid":"194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c","vout":1}]' '{"RP81MSVu39QgXhGDHfnk9d9KMnp4vhEVBu":7.77}'
```
##### Response

```
0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f190100000000ffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000
```

## Sign the Raw Transaction

Sign the raw transaction using both nodes.

## Sign Using Node One

##### Command

```shell
./komodo-cli signrawtransaction "0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f190100000000ffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000" '[{"txid":"194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c","vout":1,"scriptPubKey":"a914121cbc7a828772bd4612bc7b9765cbbf13d0b3cc87","redeemScript":"522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652ae","amount":7.77}]' '["UrunDGyFJu5UFZG7BnFx9R6iaPmWaBX8iqHzRpFRjNp8kBEQYKNt"]'
```

##### Response

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

## Sign Using Node Two

Use the hex value from node one, but change the privkey to the privkey of node two's address.

##### Command

```shell
./komodo-cli signrawtransaction "0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f19010000009200483045022100a5f4bdf5b61a4f4baf0b5b48f69488b8f752e36cbac23ec0c762bba99552ac9e022036e658c7c8c19ec4bd423fcc6a109a811b189311fc874dd466e58a1755ef4e940147522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652aeffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000" '[{"txid":"194fea388c5474ae25d261d8c57213b79f9a111e774caeea066f796ddd99e81c","vout":1,"scriptPubKey":"a914121cbc7a828772bd4612bc7b9765cbbf13d0b3cc87","redeemScript":"522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652ae","amount":7.77}]' '["UsuE7jG8BD1CV2xuCoBCwgzzbs4HqZ2P2im5fdyJmP2tSd3arAv7"]'
```

##### Response

```JSON
{
  "hex": "0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f1901000000da00483045022100a5f4bdf5b61a4f4baf0b5b48f69488b8f752e36cbac23ec0c762bba99552ac9e022036e658c7c8c19ec4bd423fcc6a109a811b189311fc874dd466e58a1755ef4e940147304402200abc8c1e1e26090a7012df8859a3986229da34b0edd82c42a64efc8b89390e6702202582cbdce3de13fe59196228d4d0a6a80916e23ccb343f1cf32515688a938ebb0147522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652aeffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000",
  "complete": true
}
```

## Step 6 - Broadcast the transaction

Broadcast the raw hex to finish send the transaction.

##### Command

```shell
./komodo-cli sendrawtransaction 0400008085202f89011ce899dd6d796f06eaae4c771e119a9fb71372c5d861d225ae74548c38ea4f1901000000da00483045022100a5f4bdf5b61a4f4baf0b5b48f69488b8f752e36cbac23ec0c762bba99552ac9e022036e658c7c8c19ec4bd423fcc6a109a811b189311fc874dd466e58a1755ef4e940147304402200abc8c1e1e26090a7012df8859a3986229da34b0edd82c42a64efc8b89390e6702202582cbdce3de13fe59196228d4d0a6a80916e23ccb343f1cf32515688a938ebb0147522102dd22c272504af79b220ba37c12f777596eff4f54598e2db65be325a9393a3a2621032a73cd31fb86150c33f26312b665c21e5f9391829f29cf48aca03bbb4f9a281652aeffffffff014014502e000000001976a91497d5106d5f69619803eb8d72a2bf45a4f033338a88ac00000000a80000000000000000000000000000
```

##### Response

```
23c2aaaf458ada3f171ee5d274e8dcfc91b62099ec15e4b2d02da2b2d1172cb1
```

The above is the output txid which can be used in an online KMD block explorer to verify the transaction.

## Useful Links 
- [Detailed Article in the Russian Language](https://medium.com/@decker.komodo/%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BC%D1%83%D0%BB%D1%8C%D1%82%D0%B8%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B5%D0%B9-multisig-%D0%B2-komodo-9d8f8c48da52)
- [Multisig Web Tool](https://deckersu.github.io/coinbin/#newMultiSig)

