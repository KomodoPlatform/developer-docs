# Payments

## Introduction

The Payments Custom Consensus (CC) module allows a user to

### Payments CC Module Flow

- Create an Oracle using [oraclescreate](../customconsensus/oracles.html#oraclescreate)
- Register as a data publisher for the oracle using the [oraclesregister](../customconsensus/oracles.html#oraclesregister) method; at this stage, the publisher indicates the fee for their data updates
  - Anyone can register as a publisher for any oracle; users subscribe only to the publishers they desire
- The [oracleslist](../customconsensus/oracles.html#oraclelist), [oraclesinfo](../customconsensus/oracles.html#oraclesinfo), and [oraclessamples](../customconsensus/oracles.html#oraclessamples) methods allow the user to find oracles and publishers, find more information about a specific oracle and publisher, and discover samples of an existing publisher, respectively
- Anyone can subscribe to any specific publisher of any oracle using the [ oraclessubscribe](../customconsensus/oracles.html#oraclessubscribe) method
- A publisher can publish data using [oraclesdata](../customconsensus/oracles.html#oraclesdata), and thereby collect their fee from their subscribers

## paymentstxidopret

**paymentstxidopret ‘[allocation,”scriptPubKey”,(”destopret”)]’**

Allocation is a number that defines how much to pay, using 50 and 50 for example would pay half the released amount to each address.
NOTE: this takes scriptpubleys NOT address’s.
It would be possible to convert address to scriptpubkey, but needs adding a second RPC, not hard task.
destopret, is an opreturn, used to pay a CC address/contract such as rewards.

## paymentscreate

**paymentscreate ‘[lockedblocks,minamount,”paytxid”,...,”paytxidN”]’**
Locked blocks, is how many blocks must pass before the funds sent to the plan can be released.
Minamount is the minimum amount that can be released.
Paytxids are the txids of all the transactions made in the previous step.

## paymentsairdrop

**paymentsairdrop ‘[lockedblocks,minamount,mintoaddress,top,bottom,fixedFlag,”excludeAddress”,...,”excludeAddressN”]**
NOTE: requires -ac_snapshot= to be active to use.
Mintoaddress is the minimum that can be paid to an address, setting to 0 defaults to 10,000 sats.
Top is the top addresses to pay too, it must not be 0 or over 3999
Bottom is to exclude the top X address from the airdrop. Generally this would always be 0, unless you wanted to exclude all whale addresses from an airdrop.
fixedFlag, set to 0, all addresses in the rich list are paid based on their balance.
Set to 1, the amount paid is fixed, the amount paid is split evenly over all the addresses in range of bottom->top on rich list. Eg 50-1000 on rich list.
Set to 7, activates game mode that changes the values of bottom and top based on the block hash of the block the daily airdrop was taken.

## payments_airdroptokens

**payments_airdroptokens ‘[“tokenid”,lockedblocks,minamount,mintoaddress,top,bottom,fixedFlag,”excludePubKey”,...,”excludePubKeyN”]’**
NOT IMPLEMENTED YET.
Tokenid, is the token to base the airdrop on.

## paymentsfund

**paymentsfund ‘[“createtxid”,amount(,useopret)]’**
Createtxid is the txid from paymentscreate, paymentsairdrop or payments_airdroptokens
Amount is the amount to send
Useopret is a flag to tell it to make a ccvout tx to the global payments plan. You use this RPC to get the scriptPubKey you need to fund a payments plan from something else, either coinbase, or another contract.

## paymentsmerge

**paymentsmerge ‘[“createtxid”]’**
Merges all funds on a payments plan to a single utxo in the plans special address.
Merged funds enforce lockedblocks, but cannot be merged again, for 100 blocks longer than this. This is to stop people merging the funds before they can be released, and preventing payments to happen. It exists because a very large tx cannot have lots of inputs.

## paymentsrelease

**paymentsrelease ‘[“createtxid”,amount,(skipminimum)]’**
Amount is amount to release, it must be above the minimum.
Skipminimum is a flag, if there are address with such low balance minimumtoaddress cannot be paid, this will truncate the rich list off at the first address that is being paid the wrong amount.

## paymentsinfo

**paymentsinfo ‘[“createtxid”]’**

## paymentslist

Shows info about a payments plan.
**paymentslist**
Lists all payments createtxids.
