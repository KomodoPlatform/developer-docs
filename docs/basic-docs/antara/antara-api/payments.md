# Payments

## Introduction

The Payments Module allows a payment to be distributed between multiple recipients in a pre-defined proportion.

### Payments CC Module Flow

- Use [paymentstxidopret](#paymentstxidopret) to create as many transactions as there are recipients. Each recipient must have the following data: weight (also called "share"), recipient, destopret (optional; data to be stored in the OP_RETURN of the subsequent payment transaction) in its OP_RETURN, this step is to simply make the data available on the blockchain to be used by a later method. The transaction id is called `paytxnid` and is used as a reference to the data
- Use [paymentscreate](#paymentscreate) to create a new Payment plan. The number of blocks to lock the funds after funding, minimum release amount and the `paytxnid`s are passed as arguments. The `paytxnid`s contain the data about the recipients and their corresponding shares. The transaction id is called `createtxid` and will be the reference for this payment plan used by other methods
- Use [paymentsfund](#paymentsfund) to fund any existing payment plan. The method takes <b>createtxid</b> and amount as arguments
- Use [paymentsrelease](#paymentsrelease) to release payments to a Payments plan refered by the `createtxid`

## paymentstxidopret

**paymentstxidopret '[allocation,"scriptPubKey",("destopret")]'**

### allocation

`allocation` is the number that defines the share of a payment to the given `scriptPubkey`.

Example: If a Payments plan has the allocation to `scriptPubkey_1` as the number `n1` and allocation to `scriptPubkey_2` as the number `n2`, then any funds sent to this payment plan are split between `scriptPubkey_1` and `scriptPubkey_2` in the ratio `n1:n2`. If funds sent to the Payments plan has the value N, `scriptPubkey_1` will receive `(N*n1)/(n1+n2)` and `scriptPubkey_1` will receive `(N*n2)/(n1+n2)`

### scriptPubkey

`scriptPubkey` is the puzzle that locks coins in a transaction.

If the recipient is a simple pubkey, the [scriptPubkey](https://learnmeabitcoin.com/glossary/scriptPubKey) can be constructed by sandwiching the pubkey between the strings "21" and "ac". In this case, the privkey corresponding to the pubkey can be used to sign a transaction which will be able to unlock the coins.

The `scriptPubKey` parameter can belong to any valid type described [here](https://learnmeabitcoin.com/glossary/scriptPubKey), but not limited to them.

Example: If pubkey is `02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567` , scriptPubkey will be `2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac`

If the node that is creating the transaction using the `paymentstxidopret` method has the privkey of an address in its wallet, an address can be used in the place of a scriptPubkey.

Example: The address `RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa` can be used directly without any modifications by a node which has the corresponding privkey in its wallet.

The `validateaddress` method can be used to verify if an address belongs to the node. It can also be seen that the `pubkey` used to construct the `scriptPubkey` produced this address.

Using either `RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa` or `2102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac` as the argument `scriptPubKey` is equivalent.

```bash
./komdo-cli -ac_name=HELLOWORLD validateaddress RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa
```

<collapse-text hidden title="Response">

```json
{
  "isvalid": true,
  "address": "RN727JeeiZ6NXic7PUKTCiHT1HvuBN4RDa",
  "scriptPubKey": "76a9148cad275b85eb32fff144f3650b74e7c18bdd9b2288ac",
  "segid": 51,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567",
  "iscompressed": true,
  "account": ""
}
```

</collapse-text>

### destopret (optional)

`destopret` is the data to be stored the OP_RETURN of the transaction that sends funds to the scriptPubkey.

If the scriptPubkey belongs to a CC module that expects OP_RETURN data in the txn that sends coins to it, then `destopret` will be used by it

Example:

If a Payments plan is created which has to send a part of the funds to the Rewards CC module, it needs to add some data to the OP_RETURN of the transaction to specify which rewards plan the payment is funding.

#### Arguments

| Name         | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| allocation   | (number)           | defines the share of a payment to the given `scriptPubkey`.                                 |
| scriptPubKey | (string)           | [scriptPubkey](https://learnmeabitcoin.com/glossary/scriptPubKey) of the recipient          |
| destopret    | (string, optional) | data to be stored in the OP_RETURN of the transaction that sends funds to the scriptPubkey. |

#### Response

| Name   | Type     | Description                                                           |
| ------ | -------- | --------------------------------------------------------------------- |
| hex    | (string) | the paytransaction in raw-transaction format, provided in hexadecimal |
| txid   | (string) | the transaction id of the send transaction                            |
| result | (string) | whether the call executed successfully                                |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD paymentstxidopret '[9,"222102d6f13a8f745921cdb811e32237bb98950af1a5952be7b3d429abd9152f8e388dac"]'
```

<collapse-text hidden title="Response">

```json
{
  "hex": "0400008085202f89010012d25c46d1f831d74c7c3e71fd32343f53ead192cc70e9e8edf7586571759a0000000048473044022004f5a7e3eb7f5010953c2bca7af2113ee3559b5f7adc86ad09b872526e3b36f6022040b6409eb612c847185b274eb76a3ff60f0e970e5e78d3eee9269b5f0661611001ffffffff02f0b9f50500000000232102d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567ac0000000000000000326a30f054090000000000000024222102d6f13a8f745921cdb811e32237bb98950af1a5952be7b3d429abd9152f8e388dac00000000000b0400000000000000000000000000",
  "txid": "9c731f6bbdaa6159b7c0955f3d1e1df72a64a38cd20198d59cd11f0fc506e00e",
  "result": "success"
}
```

</collapse-text>

## paymentscreate

**paymentscreate '[lockedblocks,minamount,"paytxid",...,"paytxidN"]'**

Locked blocks, is how many blocks must pass before the funds sent to the plan can be released.
Minamount is the minimum amount that can be released.
Paytxids are the txids of all the transactions made in the previous step.

## paymentsairdrop

**paymentsairdrop '[lockedblocks,minamount,mintoaddress,top,bottom,fixedFlag,"excludeAddress",...,"excludeAddressN"]**
NOTE: requires -ac_snapshot= to be active to use.
Mintoaddress is the minimum that can be paid to an address, setting to 0 defaults to 10,000 sats.
Top is the top addresses to pay too, it must not be 0 or over 3999
Bottom is to exclude the top X address from the airdrop. Generally this would always be 0, unless you wanted to exclude all whale addresses from an airdrop.
fixedFlag, set to 0, all addresses in the rich list are paid based on their balance.
Set to 1, the amount paid is fixed, the amount paid is split evenly over all the addresses in range of bottom->top on rich list. Eg 50-1000 on rich list.
Set to 7, activates game mode that changes the values of bottom and top based on the block hash of the block the daily airdrop was taken.

## payments_airdroptokens

**payments_airdroptokens '[“tokenid",lockedblocks,minamount,mintoaddress,top,bottom,fixedFlag,"excludePubKey",...,"excludePubKeyN"]'**

NOT IMPLEMENTED YET.
Tokenid, is the token to base the airdrop on.

## paymentsfund

**paymentsfund '[“createtxid",amount(,useopret)]'**

Createtxid is the txid from paymentscreate, paymentsairdrop or payments_airdroptokens
Amount is the amount to send
Useopret is a flag to tell it to make a ccvout tx to the global payments plan. You use this RPC to get the scriptPubKey you need to fund a payments plan from something else, either coinbase, or another contract.

## paymentsmerge

**paymentsmerge '[“createtxid"]'**

Merges all funds on a payments plan to a single utxo in the plans special address.
Merged funds enforce lockedblocks, but cannot be merged again, for 100 blocks longer than this. This is to stop people merging the funds before they can be released, and preventing payments to happen. It exists because a very large tx cannot have lots of inputs.

## paymentsrelease

**paymentsrelease '[“createtxid",amount,(skipminimum)]'**

Amount is amount to release, it must be above the minimum.
Skipminimum is a flag, if there are address with such low balance minimumtoaddress cannot be paid, this will truncate the rich list off at the first address that is being paid the wrong amount.

## paymentsinfo

**paymentsinfo '[“createtxid"]'**

Shows info about a payments plan.

## paymentslist

**paymentslist**

Lists all payments createtxids.
