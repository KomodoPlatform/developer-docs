# MarketmakerV1 Error Codes

There are various errors codes a user could receive while using the marketmaker. This document intends to list each possible error along with a brief description of why a particular error may occur. Please send any critiques to @Alright on the [Discord](https://komodoplatform.com/discord).

## Alice errors

- `"error","only one pending request at a time"` - You cannot create multiple simulaneous requests as alice.
- `"error creating utxo→pair"` - The order was matched. The UTXOs that were matched are no longer valid. This is likely due to a different wallet spending them after an order was matched.
- -9998: `"time expired for Alice_request"` – Alice made a request that was not filled. The order timed out.
- -9999: `"uuid canceled"` – Alice made an order. No Bob was willing to fill it. The order timed out.
- `"error":"quote validation error"` - The quote given by Bob is no longer valid.
- `"reserved quote validate error {PRICE}"` - The quote received by bob no longer matches the price he is requesting.
- `"error":"invalid parameter"` - Maxprice and relvolume must be >0.
- `"LP_trades_alicevalidate {COIN} src {TXID} failed SPV check"` - The UTXO you attempted to trade is not valid according to the SPV server. This is could be the result of a bad connection to the SPV server, a misconfigured SPV server or another wallet spending that UTXO.
- `"quote {COIN}/{COIN} validate error {price}"` - The quote you received after placing this order is no longer valid.
- `"error":"base or rel not found or inactive"` - One of the coins you are attempting to trade has not been activated.
- `"error creating utxo→pair"` - The order was matched. The UTXOs that were matched are no longer valid. This is likely doe to another wallet spending that UTXO.
- `"error","only one pending request at a time"` - You cannot create multiple simultaneous requests as alice.
- `"error":"not enough utxo, please make more deposits"` - You don't have the appropriate UTXOs for the trade you are attempting to make. You need UTXOs in a ratio of X:>(X/777). X is the amount you would like to trade.
- `"error":"no orderbook entry found to handle request"` - No Bob was willing to fill your request. If you do see Bobs in the orderbook, try different UTXOs sizes or a higher price.
- `"error":"cant find a deposit that is close enough in size. make another deposit that is just a bit larger than what you want to trade"` - You don't have the appropriate UTXOs for the trade you are attempting to make. If you do in fact have the UTXOs, it is possible they may be locked from previous failed swaps. Restart the marketmaker if so.
- `"error":"cant find ETOMIC"` - You need an equivalent amount of ETOMIC for any amount of ETH/ERC20 you attempt to trade. Use the BEER faucet on atomicexplorer.com. Trade BEER for ETOMIC.
- `"blockinit.{COIN} {HEIGHT} error"` - This is likely due to the coin's daemon not properly responding to the marketmaker. Restart the daemon of the coin.

### The -1XXX subset of error codes deal with a swap failing at some point while trading as Alice. These can be caused by network issues or a misconfigured node.

- -1000: `“error LP_sendwait pubkeys”` - The swap was initiated between the two parties. Bob did not send his set of pubkeys.
- -1001: `"error LP_sendwait choosei”` - Bob sent his set of pubkeys. Your node chose one pubkey from this set and requested the privkeys for the remaining pubkeys. Bob did not respond.
- -1002: `"error LP_sendwait mostprivs"` - Your node chose a pubkey from Bob's set. Bob did not respond with the privkeys for the remaining pubkeys in the set.
- -1003: `"basilisk_alicetxs error"` – Your node failed to create the dex fee transaction.
- -1004: `"error sending alicefee”` - Swap failed at 1/7. Your node failed to send the dex fee.
- -1005: `"error waiting for bobdeposit”` - Swap failed at 2/7. Bob failed to send bobdeposit.
- -1006: `"error sending alicepayment”` - Swap failed at 3/7. Your node failed to send alicepayment.
- -1007: `"error waiting for bobpayment”` - Swap failed at 4/7. Bob failed to send bobpayment.

### The -3XXX subset of errors deal with a swap not being able to start while trading as Alice.

- -3000: `"cant find coin.{COIN}"` - The coin you attempted to trade is not activated on your node.
- -3001: `"cant initialize swap”` - Your node did not have enough available memory to start a swap.
- -3002: `"error launching swaploop”` - Your node was unable to start a new process to handle a new swap. Out of available processes.
- -3003: `"couldnt bind to any port {PORT}"` - Your node was unable to make a proper connection to Bob's node via nanomsg. This is likely caused by a firewall or issues with your nanomsg installation.
- -3004: `"cant find privkey for {ADDRESS}"` – Your node cannot find the privkey for the coin you’re attempting to trade.

## Bob errors

- `"error":"not enough utxo, please make more deposits"` - You don't have the appropriate UTXOs for the trade you are attempting to make. You need UTXOs in a ratio of Y:(Y\*>1.125). Y is the amount you would like to trade.
- `"error creating utxo→pair"` - The order was matched. The UTXOs that were matched are no longer valid. This is likely due to another wallet spending that UTXO.
- `"error":"base or rel not found or inactive"` - One of the coins you are attempting to trade has not been activated.
- `"error":"GAME can only be alice coin"` - GAME does not yet support BIP65. It can only be traded as Alice.
- `"error":"cant find ETOMIC"` - You need an equivalent amount of ETOMIC for any amount of ETH/ERC20 you attempt to trade. Use the BEER faucet on atomicexplorer.com. Trade that BEER for ETOMIC.
- `"error":"invalid parameter"` - maxprice and relvolume must be >0.

### The -2XXX subset of error codes deal with a swap failing at some point while trading as Bob. These can be caused by network issues or a misconfigured node.

- -2000: `"error waitsend pubkeys”` - The swap was initiated between the two parties. Alice did not send her set of pubkeys.
- -2001: `"error waitsend choosei”` - Alice sent her set of pubkeys. Your node chose one pubkey from this set and requested the privkeys for the remaining pubkeys. Alice did not respond.
- -2002: `"error waitsend mostprivs”`– Your node choose a pubkey from Alice's set. Alice did not respond with the privkeys for the remaining pubkeys in the set.
- -2003: `"error bobscripts deposit”` – Your node failed to create the bobdeposit transaction. This is the result of the UTXO being spent by a different wallet after the swap has been initiated.
- -2004: `"error waiting for alicefee”` - Swap failed at 1/7. Alice failed to send the dex fee.
- -2005: `"error sending bobdeposit”` - Swap failed at 2/7. Your node failed to send bobdeposit.
- -2006: `"error waiting for alicepayment”` - Swap failed at 3/7. Alice failed to send alicepayment.
- -2007: `"error bobscripts payment”` – Your node failed to create the bobpayment transaction. This is likely the result of the UTXO being spent by a different wallet after the swap has been initiated.
- -2008: `"error sending bobpayment”` - Swap failed at 4/7. Your node failed to send bobpayment.

### The -4XXX subset of errors deal with a swap failing to start while trading as Bob

- -4000: `"{"result","update stats"}` - Your node received a request that was intended for a different node. This request is then relayed to other nodes.
- -4002: `"error": “no price set"` - You attempted to place an order without setting a price.
- -4003: `"error":"cant get alicecoin"` - Your node received an invalid request from alice. Your node does not have an active order for the coin Alice requested to trade. This is likely due to Alice having an outdated orderbook.
- -4005: `"error","couldnt create pairsock"` - Your node failed to make a proper connection with Alice's node via nanomsg. This is likely caused by a firewall or issues with your nanomsg installation. Use `canbind:0` if your node is behind a firewall.
- -4007: `"connect error {nanomsg error}"` - Your node failed to make a proper connection with Bob's node via nanomsg. This is likely caused by a firewall or issues with your nanomsg installation.
- -4008: `"no privkey found coin. {COIN} {address}"` - Your node cannot find the privkey for the coin you’re attempting to trade.
