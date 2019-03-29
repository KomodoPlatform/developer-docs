# Custom CC (WIP)
This document is a work in progress (WIP)

We are fortunate to have been gifted the ability to launch provable ecosystems to build upon.  This tutorial begins with a quick foundation of core concepts then moving into how to make dApps with layer-1, on-chain consensus. The smart-UTXO system of Komodo's Crypto-Conditions.  Consensus & Smart Contract customizations.

## Blockchain Core Concepts
* Public key cryptography is used when a private and public key pair are used for proving something.
* Private Keys are stored in a wallet, not on the blockchain.
* Private keys sign transactions.
* Signatures on transaction are proven by the network using the corresponding public key to spend the claimed ownership of funds.
* Transactions fill blocks, like an item on a shopping list fills a piece of paper.
* Blocks are arranged in sequential order, forming a chain.
* Each block contains agreed transactional information. The proof of the transactional detail and it's arrangement in the block is called consensus. Consensus is achieved by each participant relying on their own computation.
* Coins & Tokens are used in transaction details to transfer value.
* Nodes is the jargon term for computers that do the computations to maintain the network.
* Maintaining the network is done by validating.  OP_CODES are the instructions of the network that need validating.
* Some nodes are heavily computational (miners), some are quiet and store a valuable private key within the wallet.
* There's additional software to make this blockchain useful (for transfering value) & easier to use. Like the internet became useful for transfering information, blockchain technology enables dApps to create new ways of collaborating.  Blockchain: Mobile Wallets, DEX, Explorers vs WWW: webserver, database, email & streaming protocols)

## Goal of our custom consensus module
This `customcc` loadable library example is simply something that requires to send 1 coin.  It can't get much simpler.

## Use jl777 branch

```bash
git clone https://github.com/jl777/komodo.git
git checkout jl777
cd komodo/src/cc
code .
```
Open the 3 files
* customcc.h [src](https://github.com/jl777/komodo/blob/jl777/src/cc/customcc.h)
* customcc.cpp [src](https://github.com/jl777/komodo/blob/jl777/src/cc/customcc.cpp)
* makecustom [src](https://github.com/jl777/komodo/blob/jl777/src/cc/makecustom)

These are the three files we'll work on for learning how to apply custom consensus to a blockchain.  For most 1st & 2nd generation blockchain projects, changing consensus is a bold undertaking.  Komodo has turned it into a loadable module removing the risk of severe bugs - no other project offers this to a custom blockchain.

These 3 files are not boilercode.  It may look like boilercode but it's the gateway to much more powerful stuff.   This is the pandoras box of dApps.  Get ready to understand how to develop on a secure multi-chain distrbuted transactional system.

## customcc.h header file - definitions of functions and variables
From the top, the comments provide a nice summary of what our custom cclib will do.

### Name of our custom cclib
One is referenced externally (`MYCCLIBNAME`) at komodo start.  The other internally (`MYCCNAME`) when programming for function name prefixes.

```cpp
std::string MYCCLIBNAME = (char *)"customcc";
#define MYCCNAME "custom"
```
`MYCCLIBNAME` This is the name of the loadable library module being created.  Here it is "customcc".  This is what is used on the command line to load your custom consensus when [starting your custom blockchain](/basic-docs/installations/creating-asset-chains.html) on a komodo server.

```bash
komodod -ac_name=CUSTOM -ac_cc=1 -ac_cclib=customcc ...
```

The `MYCCNAME` is the prefix for RPC calls and standard consensus functions (e.g. `validate`).
The naming convention used for building a custom consensus library follows:
* MYCCNAME_FUNCTIONNAME

For example `custom_validate`.


### Declaration of constants
```cpp
#define EVAL_CUSTOM (EVAL_FAUCET2+1)
#define CUSTOM_TXFEE 10000
```
The `EVAL_FAUCET2` is a constant (footnote: 1a & 1b) (`0x10` or decimal 16).   These `EVAL_...` constants are identifiers.  They are used to route the validation code.  The low-level bitcoin script in Komodo has a new op_code called `OP_CHECKCRYPTOCONDITION`.   When any node on the network needs to validate this `OP_CHECKCRYPTOCONDITION` op_code, it looks up which `EVAL_...` code it is.

Custom consensus starts at `EVAL_FAUCET2` and add `+1` to it for your customcc library.  Therefore, `EVAL_CUSTOM` is `0x11` = decimal 17.

The `CUSTOM_TXFEE` is the default transaction fee for this type of transaction.  The default txfee for this `EVAL_...` code consensus is `10000` assetoshis (0.0001).


### Declarations of the RPC calls
This is the way 3rd party developers (e.g. front-end developers) and command-line users will interact with your custom crypto condition.  For example commands like `komodo-cli -ac_name=CUSTOM custom_func0` and `komodo-cli -ac_name=CUSTOM custom_func1`.

```cpp
{ (char *)MYCCNAME, (char *)"func0", (char *)"<parameter help>", 1, 1, '0', EVAL_CUSTOM },
{ (char *)MYCCNAME, (char *)"func1", (char *)"<no args>", 0, 0, '1', EVAL_CUSTOM },
```
The declarations for the functions in customcc.cpp - func0 and func1

* `MYCCNAME` is declared previously as "custom"
* `func0` is the name of the first RPC call
* The `<parameter help>` can be replaced with your functions help text.
* The `1,1,'0', EVAL_CUSTOM` means: 1 mandatory parameter, maximum of 1 parameter, 0 is the function id for custom consensus `EVAL_CUSTOM`, in this case `0x11` (decimal 17)
* `func1` is the name of the next RPC call
* The `<no args>` is the real help text this time.  This RPC call `func1` requires no arguments, like `komodo-cli getinfo`
* The `0,0,'1', EVAL_CUSTOM` mean: 0 mandatory parameters, maximum of 0 parameters, 1 is the function id for custom consensus `EVAL_CUSTOM`, in this case `0x11` (decimal 17)

### Declaration of functions
```cpp
bool custom_validate(struct CCcontract_info *cp,int32_t height,Eval *eval,const CTransaction tx);
UniValue custom_func0(uint64_t txfee,struct CCcontract_info *cp,cJSON *params);
UniValue custom_func1(uint64_t txfee,struct CCcontract_info *cp,cJSON *params);
```
These functions follow the naming convention of `MYCCNAME` with a `_`.  Validation is always required and named `MYCCNAME` + `_validate`.  MYCCNAME is `custom`, therefore the validate function is called `custom_validate`.   If MYCCNAME was defined as `mylo`, then my validate function would be called `mylo_validate`.  Odds are you will name your first cclib after yourself or someone else just as loveable.

The validation code is the most important code - it is what makes blockchains sources of truth.  Their truthiness relies on validation based on cryptographic principles.

Functions `custom_func0` and `custom_func1` follow the internal automatic module wiring of cclib.  Again `MYCCNAME` + `_` + `RPCFUNCS` declared earlier.

### Automatic wiring, custom RPC function dispatcher

The following code is part of the automatic wiring that allows a developer to use 3 files, the `.h` the `.cpp` and the `makecustom` makefile.   Automatic wiring saves a developer from potentially  introducing bugs in the consensus and by virtue of this saving, testers, users and organizations many hours of resources.

The custom dispatch is used for dispatching the RPC function declared earlier.

```cpp
#define CUSTOM_DISPATCH \
if ( cp->evalcode == EVAL_CUSTOM ) \
{ \
    if ( strcmp(method,"func0") == 0 ) \
        return(custom_func0(txfee,cp,params)); \
    else if ( strcmp(method,"func1") == 0 ) \
        return(custom_func1(txfee,cp,params)); \
    else \
    { \
        result.push_back(Pair("result","error")); \
        result.push_back(Pair("error","invalid customcc method")); \
        result.push_back(Pair("method",method)); \
        return(result); \
    } \
}
```

The developer must then map the RPC names to the function/method.  This mapping follows the same naming convention that has already been defined.  Namely, `MYCCNAME` + `_` + `FUNCTIONNAME`.  If no match, then an error message returned and no harm done.

e.g.
```cpp
    if ( strcmp(method,"func0") == 0 ) \
        return(custom_func0(txfee,cp,params)); \
```

Finally, in the course of looking where to route the RPC request

## customcc.cpp file - implementation of functions





Ref: [^1a](https://github.com/jl777/komodo/blob/jl777/src/cc/eval.h#L63)

Ref: [^1b](https://github.com/jl777/komodo/blob/jl777/src/cc/cclib.cpp#L31)
