# Chapter 04 - CC RPC Extensions

Currently, CC contracts need to be integrated at the source level. This limits who is able to create and add new CC contracts, which at first is good, but eventually will be a too strict limitation. The runtime bindings chapter will touch on how to break out of the source based limitation, but there is another key interface level, the RPC.

By convention, each CC contract adds an associated set of rpc calls to the `komodo-cli`. This not only simplifies the creation of the CC contract transactions, it further will allow dapps to be created just via rpc calls. That will require there being enough foundational CC contracts already in place. As we find new usecases that cannot be implemented via rpc, then a new CC contract is made that can handle that (and more) and the power of the rpc level increases. This is a long term process.

The typical rpc calls that are added `<CC>address`, `<CClist>`, `<CCinfo>` return the various special CC addresses, the list of CC contract instances and info about each CC contract instance. Along with an rpc that creates a CC instance and of course the calls to invoke a CC instance.

The role of the rpc calls are to create properly signed `rawtransactions` that are ready for broadcasting. This then allows using only the rpc calls to not only invoke but to create a specific instance of a CC. The faucet contract is special in that it only has a single instance, so some of these rpc calls are skipped.

So, there is no MUSTHAVE rpc calls, just a sane convention to follow so it fits into the general pattern.

One thing that I forgot to describe was how to create a special CC address and even though this is not really an rpc issue, it is kind of separate from the core CC functions, so I will show how to do it here:

```bash
const char *FaucetCCaddr = "R9zHrofhRbub7ER77B7NrVch3A63R39GuC";
const char *FaucetNormaladdr = "RKQV4oYs4rvxAWx1J43VnT73rSTVtUeckk";
char FaucetCChexstr[67] = { "03682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe12" };
uint8_t FaucetCCpriv[32] = { 0xd4, 0x4f, 0xf2, 0x31, 0x71, 0x7d, 0x28, 0x02, 0x4b, 0xc7, 0xdd, 0x71, 0xa0, 0x39, 0xc4, 0xbe, 0x1a, 0xfe, 0xeb, 0xc2, 0x46, 0xda, 0x76, 0xf8, 0x07, 0x53, 0x3d, 0x96, 0xb4, 0xca, 0xa0, 0xe9 };
```

Above are the specifics for the faucet CC, but each one has the equivalent in [CCcustom.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/CCcustom.cpp). At the bottom of the file is a big switch statement where these values are copied into an in memory data structure for each CC type. This allows all the CC codebase to access these special addresses in a standard way.

In order to get the above values, follow these steps:

1. use `getnewaddress` to get a new address and put that in the `<CC>Normaladdr = "";` line

1. use `validateaddress` `<newaddress from A>` to get the pubkey, which is put into the `<CC>hexstr[67] = "";` line

1. stop the daemon [`komodod`] and start with `-pubkey=<pubkey from B>` and do a `<CC>address` rpc call. In the console you will get a printout of the hex for the privkey, assuming the if ( 0 ) in `Myprivkey()` is enabled ([CCutils.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/CCutils.cpp))

1. update the `CCaddress` and `privkey` and dont forget to change the `-pubkey=` parameter

The first rpc command to add is `<CC>address` and to do that, add a line to [rpcserver.h](https://github.com/jl777/komodo/blob/jl777/src/rpc/server.h) and update the commands array in [rpcserver.cpp](https://github.com/jl777/komodo/blob/jl777/src/rpc/server.cpp)

In the [rpcwallet.cpp](https://github.com/jl777/komodo/tree/jl777/src/wallet/rpcwallet.cpp) file you will find the actual rpc functions, find one of the `<CC>address` ones, copy paste, change the eval code to your eval code and customize the function. Oh, and dont forget to add an entry into [eval.h](https://github.com/jl777/komodo/tree/jl777/src/cc/eval.h)

Now you have made your own CC contract, but it wont link as you still need to implement the actual functions of it. This will be covered in the following chapters.
