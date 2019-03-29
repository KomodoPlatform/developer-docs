# Chapter 00 - Bitcoin Protocol Basics

There are many aspects of the bitcoin protocol that isnt needed to understand the CC contracts dependence on it. Such details will not be discussed. The primary aspect is the utxo, unspent transaction output. Just a fancy name for `txid/vout`, so when you sendtoaddress some coins, it creates a `txid` and the first output is `vout.0`, combine it and `txid/0` is a specific utxo.

Of course, to understand even this level of detail requires that you understand what a `txid` is, but there are plenty of reference materials on that. It is basically the 64 char long set of letters and numbers that you get when you send funds.

Implicit with the utxo is that it prevents double spends. Once you spend a utxo, you cant spend it again. This is quite an important characteristic and while advanced readers will point out chain reorgs can allow a double spend, we will not confuse the issue with such details. The important thing is that given a blockchain at a specific height's blockhash, you can know if a `txid/vout` has been spent or not.

There are also the transactions that are in memory waiting to be mined, the mempool. And it is possible for the utxo to be spent by a `tx` in the mempool. However since it isnt confirmed yet, it is still unspent at the current height, even if we are pretty sure it will be spent in the next block.

A useful example is to think about a queue of people lined up to get into an event. They need to have a valid ticket and also to get into the queue. After some time passes, they get their ticket stamped and allowed into the event.

In the utxo case, the ticket is the spending transaction and the event is the confirmed blockchain. The queue is the mempool.
