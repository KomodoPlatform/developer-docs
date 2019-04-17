# Number of confirmations displayed based on dPoW status

## Introduction

A new feature has been added to the Komodo daemon (`komodod`) that changes the behaviour of the value displayed for `"confirmations":` which is output on calling `gettransaction`, `getrawtransaction`, `gettxout`, `listunspent` or `getblock` through the `komodo-cli`

The new behaviour is as follows:

- 0 confirmations means the tx is not confirmed yet
- 1 confirmation means the tx is confirmed on the network, but not dPoW'd yet (Explorers may show different confirmation values and wouldn't match till atleast one notarization happens. `rawconfirmations` value will match, which is only visible if you are quering via CLI.)
- any other confirmation number means the tx is secure with dPoW

This feature is helpful for exchanges mainly and for users who prefer security. This will work automatically for Native mode for KMD or any other assetchain. SPV mode doesn't have this feature implemented and will not show dPoW Conf data. Upon seeing a confirmation number more than 1, exchanges can simply credit the deposit to a user being sure that the transaction is secure and can't be double-spent.

## A practical example of how number of confirmations are displayed after this update

### Stage 1

- `"confirmations": 0,`

### Stage 2

- `"confirmations": 1,`

- `"rawconfirmations": 1`

### Stage 3: After 5 Blocks are added

- `"confirmations": 1,`

- `"rawconfirmations": 5,`

### Stage 4: After 12 Blocks are added and when a BTC notarization happens

- `"confirmations": 12,`

- `"rawconfirmations": 12,`

As seen in the above example, the value corresponding to the `"confirmations":` is greater than 1 only after the transaction/block is secured by dPoW. So exchanges can just keep track of the value of `"confirmations":` and consider the transaction as final when the value is neither `0 nor 1`; any value greater than `1` for the `"confirmations":` field means the transaction is dPoW'd and secure.


It has been implemented in such a way that exchanges can integrate this double-spend prevention mechanism with no major code changes if they have been checking for the number of confirmations from `komodod` previously. Essentially, confirmations have been made dPOW aware: Confirmations will never go above 1 until a transaction is notarized.

So `confirmations <= 1` means not notarized, `confirmations > 1` means notarized. Since all exchanges wait for more than `1 confirmation`, their systems will only work on notarized transactions.
