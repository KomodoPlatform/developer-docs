# Chapter 08 - Assets Example

In some respects the assets CC is the most complex, it was actually the first one that I coded. It is however using a simple model, even for the DEX functions, so while it is quite involved, it does not have the challenge/response complexity of dice.

There are two major aspects to creating tokens. First is to create and track it, down to every specific satoshi. The second is solving how to implement DEX functions of trading assets.

The model used is "colored coins". This means that the token creating txid issues the assets as denoted by all the satoshis, so locking 1 COIN issues 100 million tokens. This multiplication will allow creation of plenty of assets. We want to preserve all the tokens created across all allowed operations. The way this is achieved is that all operations attaches the token creation `txid` in its `OP_RETURN`, along with the specified operation.

Ownership of tokens are represented by the colored satoshis in the CC address for the user's `pubkey`. This allows using the standard utxo system to automatically track ownership of the tokens. This automatic inheritance is one of the big advantages of utxo CC contracts that compensates for the slightly more work needed to implement a CC contract.

So now we have the standard CC addresss, list and info commands that provide the CC addresses, list of all tokens and info on specific tokens and the ability to create and transfer tokens. Any amount of tokens can be created from 1 to very large numbers and using standard `addressbalance`, `addressutxo` type of commands, the details of all assets owned can be determined for a specific pubkey.

Now we can solve the DEX part of the tokenization, which turns out to be much simpler than initially imagined. We start with bidding for a specific token. Funds for the `bid` are locked into the global CC address, along with the desired token and price. This creates a `bid` utxo that is able to be listed via an orderbook rpc call. To fill the `bid`, a specific `bid` utxo is spent with the appropriate number of assets and change and updated price for the unfilled amount. if the entire amount is filled, then it wont appear in the orderbook anymore.

`asks` work by locking assets along with the required price. Partial fills can be supported and the rpc calls can mask the utxo-ness of the funds/assets needed by automatically gathering the required amount of funds to fill the specific amount.

With calls to cancel the pending `bid` or `ask`, we get a complete set of rpc calls that can support a COIN-centric DEX.

In the future, it is expected that a token swap rpc can be supported to allow directly swapping one token for another, but at first it is expected that there wont be sufficient volumes for such token to token swaps, so it was left out of the initial implementation.

With just these rpc calls and associated validation, we get the ability to issue tokens and trade them on a DEX!

## create

```bash
vin.0: normal input
vout.0: issuance assetoshis to CC
vout.1: tag sent to normal address of AssetsCCaddress
vout.2: normal output for change (if any)
vout.n-1: opreturn [EVAL_ASSETS] ['c'] [origpubkey] "<assetname>" "<description>"
```

## transfer

```bash
vin.0: normal input
vin.1 .. vin.n-1: valid CC outputs
vout.0 to n-2: assetoshis output to CC
vout.n-2: normal output for change (if any)
vout.n-1: opreturn [EVAL_ASSETS] ['t'] [assetid]
```

## buyoffer

```bash
vins.*: normal inputs (bid + change)
vout.0: amount of bid to unspendable
vout.1: normal output for change (if any)
vout.n-1: opreturn [EVAL_ASSETS] ['b'] [assetid] [amount of asset required] [origpubkey]
```

## cancelbuy

```bash
vin.0: normal input
vin.1: unspendable.(vout.0 from buyoffer) buyTx.vout[0]
vout.0: vin.1 value to original pubkey buyTx.vout[0].nValue -> [origpubkey]
vout.1: normal output for change (if any)
vout.n-1: opreturn [EVAL_ASSETS] ['o'] [assetid]
```

## fillbuy

```bash
vin.0: normal input
vin.1: unspendable.(vout.0 from buyoffer) buyTx.vout[0]
vin.2+: valid CC output satisfies buyoffer (*tx.vin[2])->nValue
vout.0: remaining amount of bid to unspendable
vout.1: vin.1 value to signer of vin.2
vout.2: vin.2 assetoshis to original pubkey
vout.3: CC output for assetoshis change (if any)
vout.4: normal output for change (if any)
vout.n-1: opreturn [EVAL_ASSETS] ['B'] [assetid] [remaining asset required] [origpubkey]
```

## selloffer

```bash
vin.0: normal input
vin.1+: valid CC output for sale
vout.0: vin.1 assetoshis output to CC to unspendable
vout.1: CC output for change (if any)
vout.2: normal output for change (if any)
vout.n-1: opreturn [EVAL_ASSETS] ['s'] [assetid] [amount of native coin required] [origpubkey]
```

## cancel

```bash
vin.0: normal input
vin.1: unspendable.(vout.0 from exchange or selloffer) sellTx/exchangeTx.vout[0] inputTx
vout.0: vin.1 assetoshis to original pubkey CC sellTx/exchangeTx.vout[0].nValue -> [origpubkey]
vout.1: normal output for change (if any)
vout.n-1: opreturn [EVAL_ASSETS] ['x'] [assetid]
```

## fillsell

```bash
vin.0: normal input
vin.1: unspendable.(vout.0 assetoshis from selloffer) sellTx.vout[0]
vin.2+: normal output that satisfies selloffer (*tx.vin[2])->nValue
vout.0: remaining assetoshis -> unspendable
vout.1: vin.1 assetoshis to signer of vin.2 sellTx.vout[0].nValue -> any
vout.2: vin.2 value to original pubkey [origpubkey]
vout.3: CC asset for change (if any)
vout.4: CC asset2 for change (if any) 'E' only
vout.5: normal output for change (if any)
vout.n-1: opreturn [EVAL_ASSETS] ['S'] [assetid] [amount of coin still required] [origpubkey]
```
