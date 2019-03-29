# Chapter 06 - Faucet Example

Finally, we are ready for the first actual example of a CC contract. The faucet. This is a very simple contract and it ran into some interesting bugs in the first incarnation.

The code in [~/komodo/src/cc/faucet.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/faucet.cpp) is the ultimate documentation for it with all the details, so I will just address the conceptual issues here.

The idea is that people send funds to the faucet by locking it in faucet's global CC address and anybody is allowed to create a faucetget transaction that spends it.

There are only 7 functions in [faucet.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/faucet.cpp), a bit over 200 lines including comments. The first three are for validation, the last four for the rpc calls to use.

::: tip Functions
- int64_t IsFaucetvout(struct CCcontract_info *cp,const CTransaction& tx,int32_t v)
- bool FaucetExactAmounts(struct CCcontract_info *cp,Eval* eval,const CTransaction &tx,int32_t minage,uint64_t txfee)
- bool FaucetValidate(struct CCcontract_info *cp,Eval* eval,const CTransaction &tx)
- int64_t AddFaucetInputs(struct CCcontract_infoCC_info *cp,CMutableTransaction &mtx,CPubKey pk,int64_t total,int32_t maxinputs)
- std::string FaucetGet(uint64_t txfee)
- std::string FaucetFund(uint64_t txfee,int64_t funds)
- UniValue FaucetInfo()
:::

Functions in `rpcwallet` implement:

`faucetaddress` fully implemented in [rpcwallet.cpp](https://github.com/jl777/komodo/tree/jl777/src/wallet/rpcwallet.cpp)

`faucetfund` calls `FaucetFund`

`faucetget` calls `FaucetGet`

`faucetinfo` calls `FaucetInfo`

Now you might not be a programmer, but I hope you are able to understand the above sequence. user types in a cli call, `komodo-cli` processes it by calling the rpc function, which in turn calls the function inside [faucet.cpp](://github.com/jl777/komodo/tree/jl777/src/cc/faucet.cpp)

No magic, just simple conversion of a user command line call that runs code inside the komodod. Both the `faucetfund` and `faucetget` create properly signed rawtransaction that is ready to be broadcast to the network using the standard `sendrawtransaction` rpc. It doesnt automatically do this to allow the GUI to have a confirmation step with all the details before doing an irrevocable CC contract transaction.

`faucetfund` allows anybody to add funds to the faucet
`faucetget` allows anybody to get 0.1 coins from the faucet as long as they dont violate the rules.

And we come to what it is all about. The rules of the faucet. Initially it was much less strict and that allowed it to be drained slowly, but automatically and it prevented most from being able to use the faucet.

To make it much harder to leech, it was made so each `faucetget` returned only 0.1 coins (down from 1.0) so it was worth 90% less. It was also made so that it had to be to a fresh address with less than 3 transactions. Finally each txid was constrained to start and end with 00! This is a cool trick to force usage of precious CPU time (20 to 60 seconds depending on system) to generate a valid txid. Like PoW mining for the txid and I expect other CC contracts to use a similar mechanism if they want to rate limit usage.

Combined, it became such a pain to get 0.1 coins, the faucet leeching problem was solved. It might not seem like too much trouble to change an address to get another 0.1 coins, but the way things are setup you need to launch the `komodod` `-pubkey=<your pubkey>` to change the pubkey that is active for a node. That means to change the pubkey being used, the komodod needs to be restarted and this creates a lot of issues for any automation trying to do this. Combined with the PoW required, only when 0.1 coins becomes worth a significant effort will faucet leeching return. In that case, the PoW requirement can be increased and coin amount decreased, likely with a faucet2 CC contract as I dont expect many such variations to be needed.
