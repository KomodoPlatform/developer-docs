# Chapter 10 - Channels Example

It might be hard to believe, but channels CC implements an instant payment mechanism that is secured by dPoW in a way that is backward compatible with the existing wallets, explorers, etc. and channels CC does not require both nodes to be online. Its usecases are all the usecases for Lightning Network, it is just more secure, less expensive and backward compatible! The one aspect which some might consider a downside (and others another benefit) is that all payments are onchain. This means it would increase blockchain size, but the idea is for channels CC to be used on blockchains with relatively lower value coins, so a txfee of 0.0001 is not anything significant.

::: warning
Very confusing blockchain reorganization issues described below. Will be confusing to most people
:::

From a distance, the blockchain is a chain of blocks. One block after the next, each referencing all the prior blocks. Each block containing a group of transactions. Prior to getting into a block, the transactions are broadcast to the network and if it is valid, it enters the memory pool. Each miner then constructs a valid block from these memory pool transactions and when a transaction gets mined (confirmed), it is removed from the memory pool.

That is the simple version!

The reality is quite a bit more complex, but the critical aspect is that the blockchain can (and is) reorganized as part of the expected protocol. This can happen even when there is no 51% attack happening and it is important to understand this process in detail, so here goes.

What happens if two miners find a valid block at the same time? In this case the "same time" means within the time it takes for a block to propagate to the network. When a miner finds a new block, it is broadcast to the network and nodes update and start waiting for the next block. When there are two different (and valid) blocks propagating at the same time, some nodes update with one of the blocks and some the other, lets call it blockA and blockB. Now the nodes will know about both blockA and blockB, but some will consider blockA to be the chaintip and others will consider blockB to be the chaintip.

This is where it gets confusing. Which is the correct chaintip (latest block?). It turns out that both blockA and blockB are valid at this moment in time. So there are actuall two blockchains. We have what is called a small fork! Now dont worry, the protocol will help us converge to a single chain, but in order to do that, we need the next block.

Some miners will be mining from blockA and others from blockB. In most all cases, when the next block is found, it wont be at the "same time" again. So we will end up with a chain that is blockA+blockA2 or blockB+blockB2. Here comes the small reorg! Let's assuming blockA2 was found before blockB2, so that means all nodes that had blockB as the chaintip now see a longer chain blockA+blockA2, which trumps blockB. When that happens, it reorgs the chain so it is on blockA+blockA2. To do this properly, all the transactions that were in blockB are put back into the mempool and blockA is added, then blockA2.

Of course, when blockB2 arrives, the nodes see it but blockB+blockB2 is the same length as blockA+blockA2, so no reorg happens. Since we postulated that blockAs arrived "before" blockB2, that means all nodes are on the same chaintip, including all the miners and the next block found would be blockA3, without any complications.

Believe it or not, this sort of thing is happening all the time, one all blockchains. The chaintip is a volatile thing and that is why more than one confirmation is needed to avoid the small reorgs invalidating blockhash. However, it is possible for more than just the blockhash to change. When the reorg happens, all the transactions in the block are put back into the mempool and then the new blocks are processed in order. So what happens if one of the inputs to a transaction that happened in blockB, gets spent in blockA2? Based on random utxo allocation by wallets this is not impossible if an address has a lot of activity, but if it is part of a 51% attack, then this remote chance of an utxo being spent becomes a certainity! In fact, that is what a 51% attack is.

The attack can go much deeper than just one block. For chains that use the longest chain rule, it can go quite deep indeed. So as all the reorged transactions are put back into the mempool, we feel good that it will get confirmed again. Unfortunately, there is no enforcement of a miner needing to mine any specific transaction in the mempool. And the 51% attacker is intent on mining the transaction that spends an already spent utxo in the reorganized chain. it is called a double spend, but in the reorganized chain, it is spent only once. So it is a bit of a misnomer.

The important thing to understand is that if any transaction has inputs that are signed by a node, it is possible when the chain reorganizes for that transaction to become invalid. This is why dPoW is important as it doesnt strictly use the longest chain rule, but rather the longest notarized chain rule. Once a block is notarized, then it will refuse to reorganize that block (or any block before). So the risk is still there, but only until a notarization. Please see more detailed information about dPoW `here`.

Given the above, if you are wondering how can it be possible to have a mempool payment be secured by dPoW. Since it is explained how the reorgs can make valid transactions disappear, it seems unlikely any such solution is possible. However, the CC is very powerful and it can make unlikely things possible.

The following describes how.

We know that any payment that is utxo based can be invalidated via 51% attack, or even an unlikely but not impossible random utxo allocation from a busy wallet. Which means the payment cant be via a utxo. Since the CC system is utxo based, you might think that it means CC cant solve this. However, CC is very powerful and can implement payments that are not utxo based. But before this non-utxo payment method is explained, first we need to solve the mechanics of payment.

At a high level, we want to lock funds into a channel, have this lock notarized so it cant be reorganized. Then payments can unlock funds. Additionally, if we are restricting the payment to just one destination, we also need a way for the sender to reclaim the unused funds. So there needs a way for a close channel notification, which when notarized allows the sender to reclaim all funds. After the channel close is notarized, then the only action possible should be a reclaim of sender funds.

We need to assume that any payment, channel close, reclaim can be reorganized until it is notarized so great care needs to be made that a payment that is made will always be valid. With some allowances for blocks after a channelclose is notarized, we can protect the payments using the logic of "stop accepting payments after a channelclose is seen". It might be that a full notarization of wait time after the channelclose is notarized is needed to provide sufficient time for all the payments to be reprocessed.

Now we can finally describe the requirements for the CC. The locked funds need to be able to be spent by either the sender or receiver, the former only after sufficient time after a channelclose and the latter only after a payment is seen (not just confirmed, but just seeing it should be enough). The protection from reorgs is that the payment itself reveals a secret that is needed for the payment and only the secret would be needed, so it wont matter what utxo is used. To lock funds into a CC address that can handle this we need a 1of2 CC address, which can accept a signature from either of two pubkeys. The additional CC constraints would be enforced to make sure payments are made until the channel is closed.

A hashchain has the nice property of being able to encode a lot of secrets with a single hash. You can hash the hash, over and over and the final hash is the public value. By revealing the next to last hash, it can be verified that it hashes to the final hash. There is a restriction that a hashchain needs to be of reasonable maximum depth, say 1000. That means each iteration of the hashchain that is revealed is worth 1/1000th the total channelfunds. In fact, if the 500th hash value is revealed, half the channelfunds are released. this allows 1/1000th resolution that can be released with a single hash value.

Now we can make the payment based on the hashvalue revealed at a specified depth before the prior released hashchain value. Both the sender and receiver can make a payment to the destination by attaching a hashchain secret. This means even if the sender's payment is reorganized, if the destination has the revealed secret, a replacement payment can be made that is valid. If the destination account isnt monitoring the blockchain, then it wont see the revealed secret, but in this case there shouldnt be value released for the payments that are reorganized. So it would be a case of no harm, no foul. In any event, all the payments end up verifiable on the blockchain to provide verifiability.

Payments at the speed of the mempool, protected by dPoW!

## The following are the rpc calls:

```bash
channelsopen
channelspayment
channelsclose
channelsrefund
channelsinfo
```

### channelsopen:

Used to open channel between two pub keys (sender and receiver). Parameters: `destination_pubkey`, `total_number_of_payments`, `payment_denomination`.

```bash
Example - channelsopen 03a8fe537de2ace0d9c210b0ff945085c9192c9abf56ea22f22ce7998f289bb7bb 10 10000000
```

### channelspayment:

Sending payment to receiver. Condition is that the channel open tx is confirmed/notarised. Parameters: `open_tx_id`, `payment_amount`, `[secret]` (optional, used when receiver needs to make a payment which secret has already been revealed by sender).

```bash
Example - channelspayment b9c141facc8cb71306d0de8e525b3de1450e93e17fc8799c8fda5ed52fd14440 20000000
```

### channelsclose:

Marking channel as closed. This RPC only creates a tx which says that the channel is closed and will be used in refund RPC to withdraw funds from closed channel. This also notifies receiver that channel fund could be withdrawn, but the payment RPC is still available until all funds are withdrawn. Parameters: `open_tx_id`.

```bash
Example - channelsclose b9c141facc8cb71306d0de8e525b3de1450e93e17fc8799c8fda5ed52fd14440
```

### channelsrefund:

Withdrawing funds back to senders address. Refund can be issued only when channel close tx is confirmed/notarised. Parameters: `open_tx_id`, `close_tx_id`

```bash
Example - channelsrefund b9c141facc8cb71306d0de8e525b3de1450e93e17fc8799c8fda5ed52fd14440 bb0ea34f846247642684c7c541c435b06ee79e47893640e5d2e51023841677fd
```

### channelsinfo:

Getting info about channels in which the issuer is involved, either as sender or receiver. Call without parameters give the list of available channels. Parameters: `[open_tx_id]` (optional - used to get info about specific channel)

## VIN/VOUT allocation

### Open:

```bash
vin.0: normal input
vout.0: CC vout for channel funding on CC1of2 pubkey
vout.1: CC vout marker to senders pubKey
vout.2: CC vout marker to receiver pubkey
vout.n-2: normal change
vout.n-1: opreturn - 'O' zerotxid senderspubkey receiverspubkey totalnumberofpayments paymentamount hashchain
```

### Payment:

```bash
vin.0: normal input
vin.1: CC input from channel funding
vin.2: CC input from src marker
vout.0: CC vout change to channel funding on CC1of2 pubkey
vout.1: CC vout marker to senders pubKey
vout.2: CC vout marker to receiver pubkey
vout.3: normal output of payment amount to receiver pubkey
vout.n-2: normal change
vout.n-1: opreturn - 'P' opentxid senderspubkey receiverspubkey depth numpayments secret
```

### Close:

```bash
 vin.0: normal input
 vin.1: CC input from channel funding
 vin.2: CC input from src marker
 vout.0: CC vout for channel funding
 vout.1: CC vout marker to senders pubKey
 vout.2: CC vout marker to receiver pubkey
 vout.n-2: normal change
 vout.n-1: opreturn - 'C' opentxid senderspubkey receiverspubkey 0 0 0
```

### Refund:

```bash
vin.0: normal input
vin.1: CC input from channel funding
vin.2: CC input from src marker
vout.0: CC vout marker to senders pubKey
vout.1: CC vout marker to receiver pubKey
vout.2: normal output of CC input to senders pubkey
vout.n-2: normal change
vout.n-1: opreturn - 'R' opentxid senderspubkey receiverspubkey numpayments payment closetxid
```
