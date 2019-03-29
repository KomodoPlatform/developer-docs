# Chapter 09 - Dice Example

The dice CC contract is actually more complex in the sequences required than the assets/tokens CC. The reason is the need for realtime response by the dealer node, but also having a way to resolve bets if the dealer node is not online. The dice CC contract shows how to build in such a challenge/response mechanism, which likely will be very useful for many other realtime interactive CC contracts.

First, let us describe the issues that the dice CC contract needs to solve. Foremost is that it needs to be random and fair. It should also have realtime response and a fallback timeout in case the realtime response doesnt happen. As with the rewards CC contract, multiple dice plans are supported. Each plan can be customized as to the following: `minbet`, `maxbet`, `maxodds`, `timeoutblocks`

This allows each plan to control the risk exposure and also advertises to everyone when dicebets expire and a timeout win can be claimed. In event the dealer node does not process a dicebet in time, in order to prevent dealer nodes from simply not responding to dicebets that they lose, a timeout must go to the dicebet player. A short timeframe means that the dealer would need to be running multiple redundant nodes to make sure they can respond in time. If the timeout is set to long, then many players would prefer to use a different dice plan with a shorter timeout.

Now to describe how to ensure a proper random number that is fair. The method chosen was for the dealer node to create transactions with hash of their entropy in the `OP_RETURN`. Then the dicebet player would select a specific entropy tx and include their (unhashed) entropy to their `OP_RETURN`. This allows the dealer node to immediately determine if the dicebet won or lost. If the dicebet included the hash of the bettor entropy, then another step would be needed. However, doing so would allow some timeouts to end with a refund, rather than an automatic win for the dicebet player.

One additional technique used to keep all required data on the blockchain is the dealer entropy value calculation. The vin0 txid is used as one of the `privkeys` to calculate a shared secret and then hashed to remove links to the original `privkey`. This method allows recreating the dealer's entropy value (by the dealer node) given the blockchain itself, which means there is no need for any local storage.

This allows the dealer node to recreate the unhashed entropy value used and so when the dicebet transaction is seen (in the mempool!), the dealer node can immediately determine if it is a winner or a loser. This is done by creating a dealer hash vs. a bettor hash via:

```bash
dealer hash: SHA256(dealer entropy + bettor entropy)
bettor hash: SHA256(bettor entropy + dealer entropy)
```

The same values are used, but in different order. The resulting hashes are compared arithmetically for 1:1 bets and the standard industry use is used for the higher odds: [https://dicesites.com/provably-fair](https://dicesites.com/provably-fair)

The dealer creates a dice plan and then also needs to create entropy transactions. Each win or loss that creates change also creates entropy transactions by the dealer, but timeout transactions wont as it needs to be created by the dealer node to prevent cheating. The dealer `tx` are locked into the global dice CC address, as is the dicebet transaction, which selects a specific entropy `tx` to "roll" against. Then the dicefinish process by the dealer will spend the dicebet outputs either all to itself for a loss, or the winning amount to th dice bettor's address. For dicebets that are not dicefinish'ed by the dealer, anybody is able to do a timeout completion.

## createfunding

```bash
vins.*: normal inputs
vout.0: CC vout for funding
vout.1: owner vout
vout.2: dice marker address vout for easy searching
vout.3: normal change
vout.n-1: opreturn 'F' sbits minbet maxbet maxodds timeoutblocks
```

## addfunding (entropy)

```bash
vins.*: normal inputs
vout.0: CC vout for locked entropy funds
vout.1: tag to owner address for entropy funds
vout.2: normal change
vout.n-1: opreturn 'E' sbits fundingtxid hentropy
```

## bet

```bash
vin.0: entropy txid from house (must validate vin0 of 'E')
vins.1+: normal inputs
vout.0: CC vout for locked entropy
vout.1: CC vout for locked bet
vout.2: tag for bettor's address (txfee + odds)
vout.3: change
vout.n-1: opreturn 'B' sbits fundingtxid entropy
```

## loser

```bash
vin.0: normal input
vin.1: betTx CC vout.0 entropy from bet
vin.2: betTx CC vout.1 bet amount from bet
vin.3+: funding CC vout.0 from 'F', 'E', 'W', 'L' or 'T'
vout.0: funding CC to entropy owner
vout.1: tag to owner address for entropy funds
vout.2: change to fundingpk
vout.n-1: opreturn 'L' sbits fundingtxid hentropy proof
```

## winner

```bash
same as loser, but vout.2 is winnings
vout.3: change to fundingpk
vout.n-1: opreturn 'W' sbits fundingtxid hentropy proof
```

## timeout

```bash
same as winner, just without hentropy or proof
```

::: warning

There is an attack vector that precludes betting any large amounts, it goes as follows:

- Do dicebet to get the house entropy revealed
- Calculate bettor entropy that would win against the house entropy
- Reorg the chain and make a big bet using the winning entropy calculated in 2.

:::

In order to mitigate this, the disclosure of the house entropy needs to be delayed beyond a reasonable reorg depth (notarization). It is recommended for production dice games with significant amounts of money to use such a delayed disclosure method.
