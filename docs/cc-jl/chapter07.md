# Chapter 07 - Rewards Example

The next CC contract in complexity is the rewards CC contract. This is designed to capture what most people like about masternodes, without anything else, ie. the rewards!

The idea is to allow people to lock funds for some amount of time and get an extra reward. We also want to support having more than one rewards plan at a time and to allow customization of plan details. One twist that makes it a bit unexpected is that anybody should be able to unlock the funds that were locked, as long as it ends up in the locking address. The reason for this is that SPV servers want to be supported and while locking can be done via normal `sendrawtransaction`, it requires a native node to do the unlocking. By allowing anybody to be able to unlock, then there can be a special node that unlocks all locked funds when they are ready. This way, from the user's point of view, they lock the funds and after it is matured, it reappears in their wallet.

The above requirements leads us to using the global CC address for the rewards contract to lock the funds in. That allows anybody to properly sign the unlock, but of course that is not enough, we need to make sure they are following all the unlock requirements. Primarily that the funds go back to the locking address.

The four aspects of the rewards plan that are customizable are:
`APR`, `minseconds`, `maxseconds`, `mindeposit`

This allows each plan to set a different APR (up to 25%, anything above is becoming silly), the minimum time funds must be locked, the maximum time they are earning rewards and the minimum that can be deposited.

So the `tx` that creates the rewards plan will have these attributes and it is put into the `OP_RETURN` data. All the other calls will reference the plan creation `txid` and inherit these parameters from the creation `tx`. This means it is an important validation to do, to make sure the funding `txid` is a valid funding `txid`.

Since it is possible that the initial funding will be used up, there needs to be a way for more funding to be added to the rewards plan.

Having multiple possible rewards plans means it is useful to have rpc calls to get information about them. Hence: `rewardslist` returns the list of rewards creation `txids` and `rewardsinfo <txid>` returns the details about a specific rewards plan.

A locking transaction sends funds to the rewards CC address, along with a normal (small) `tx` to the address that the unlock should go to. This allows the validation of the proper unlocking. Also, it is important to make sure only locking transactions are able to be unlocked. Additionally, the minimum time needs to elapse before unlocking is allowed.

All of these things are done in [rewards.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/rewards.cpp), with the validation code being about 200 lines and a total of 700 lines or so. Bigger than faucet, but most of the code is the non-consensus code to create the proper transactions. In order to simplify the validation, specific vin and vout positions are designated to have specific required values:

## createfunding

```bash
vins.*: normal inputs
vout.0: CC vout for funding
vout.1: normal marker vout for easy searching
vout.2: normal change
vout.n-1: opreturn 'F' sbits APR minseconds maxseconds mindeposit
```

## addfunding

```bash
vins.*: normal inputs
vout.0: CC vout for funding
vout.1: normal change
vout.n-1: opreturn 'A' sbits fundingtxid
```

## lock

```bash
vins.\*: normal inputs
vout.0: CC vout for locked funds
vout.1: normal output to unlock address
vout.2: change
vout.n-1: opreturn 'L' sbits fundingtxid
```

## unlock

```bash
vin.0: locked funds CC vout.0 from lock
vin.1+: funding CC vout.0 from 'F' and 'A' and 'U'
vout.0: funding CC change
vout.1: normal output to unlock address
vout.n-1: opreturn 'U' sbits fundingtxid
```

It is recommended to create such a vin/vout allocation for each CC contract to make sure that the rpc calls that create the transaction and the validation code have a specific set of constraints that can be checked for.
