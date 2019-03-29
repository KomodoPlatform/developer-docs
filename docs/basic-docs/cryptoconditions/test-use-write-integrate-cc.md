# Using the Contracts on a Komodo based Blockchain

Currently there are four contracts that can be used on any blockchain created using Komodo. They are:

> -

> ```
> :doc:`Tokens </cc/contracts/tokens/introduction>`
> ```

> ```
> System Message: test-use-write-integrate-cc.rst:, line 7
> ```

> test-use-write-integrate-cc.rst:7: (ERROR/3) Unknown interpreted text role "doc".
>
> ```
>
> ```

> -

> ```
> :doc:`Faucet </cc/contracts/faucet/introduction>`
> ```

> ```
> System Message: test-use-write-integrate-cc.rst:, line 8
> ```

> test-use-write-integrate-cc.rst:8: (ERROR/3) Unknown interpreted text role "doc".
>
> ```
>
> ```

> -

> ```
> :doc:`Rewards </cc/contracts/rewards/introduction>`
> ```

> ```
> System Message: test-use-write-integrate-cc.rst:, line 9
> ```

> test-use-write-integrate-cc.rst:9: (ERROR/3) Unknown interpreted text role "doc".
>
> ```
>
> ```

> -

> ```
> :doc:`Dice </cc/contracts/dice/introduction>`
> ```

> ```
> System Message: test-use-write-integrate-cc.rst:, line 10
> ```

> test-use-write-integrate-cc.rst:10: (ERROR/3) Unknown interpreted text role "doc".
>
> ```
>
> ```

A high level overview of the Komodo Custom Consensus Framework:

```
:ref:`How to write UTXO based CryptoConditions contracts for KMD chains - by jl777`
```

```
System Message: test-use-write-integrate-cc.rst:, line 12

test-use-write-integrate-cc.rst:12: (ERROR/3) Unknown interpreted text role "ref".
```

To use the contracts on the blockchain, the start command of the chain should contain the parameter `-ac-cc` and it should be greater than .

A brief overview of the `-ac-cc` parameter:

```bash
* A chain with -ac_cc=N with N > 0, will have CC active
* If N is 1, then it just enables CC
* if N is >= 2 and <= 100, it allows for non-fungible cross chain contracts within all the chains with the same N value
* if N >= 101, then it forms a cluster of all the chains with the same N value where the base tokens in all the chains in that cluster are fungible via the burn protocol
```

## To test the contracts:

> > - Compile Komodo

> > - Navigate to `src` directory, start the test chain with your `pubkey` and issue the SmartContract RPC commands. All the instructions to get you started are below. For a more elaborate explanation creating a new blockchain using Komodo see:

> > ```
> > :doc:`/komodo/create-Komodo-Assetchain`
> > ```

> > ```
> > System Message: test-use-write-integrate-cc.rst:, line 29
> > ```

> > test-use-write-integrate-cc.rst:29: (ERROR/3) Unknown interpreted text role "doc".
> >
> > ```
> >
> > ```

> ```bash
> #Install dependencies
> ```

> cd ~
> sudo apt-get update
> sudo apt-get upgrade -y
> sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate nano software-properties-common curl libcurl4-gnutls-dev cmake clang

> git clone https://github.com/nanomsg/nanomsg
> cd nanomsg
> cmake . -DNN_TESTS=OFF -DNN_ENABLE_DOC=OFF
> make -j2
> sudo make install
> sudo ldconfig

> #Build Komodo

> cd ~
> git clone https://github.com/jl777/komodo
> cd komodo
> git checkout jl777
> ./zcutil/fetch-params.sh
> ./zcutil/build.sh -j\$(nproc)

> #Start the Test Chain

> cd ~/komodo/src
> ./komodod -ac_cc=1 -ac_name=<CHAIN_NAME> -addressindex=1 -spentindex=1 -ac_supply=1000 -ac_reward=10000000000000 -pubkey=<your_pub_key> -addnode=195.201.20.230 -addnode=195.201.137.5 -addnode=195.201.20.230 -addnode=94.130.224.11 &
>
> ```
>
> ```

## Relevant info:

> - Source repo: [jl777/komodo](https://github.com/jl777/komodo) (Latest code on cc and new contracts are being added to the `FSM` branch.)

> - Source directory: [jl777/komodo:src/cc@FSM](https://github.com/jl777/komodo/tree/FSM/src/cc)

### Useful Links:

(Going through the comments in the following files gives a pretty good overview)

> - [jl777/komodo:src/cc/assets.cpp@FSM (raw)](https://raw.githubusercontent.com/jl777/komodo/FSM/src/cc/assets.cpp)

> - [jl777/komodo:src/cc/dice.cpp@FSM (raw)](https://raw.githubusercontent.com/jl777/komodo/FSM/src/cc/dice.cpp)

> - [jl777/komodo:src/cc/rewards.cpp@FSM (raw)](https://raw.githubusercontent.com/jl777/komodo/FSM/src/cc/rewards.cpp)

> - [jl777/komodo:src/cc/token.cpp@FSM (raw)](https://raw.githubusercontent.com/jl777/komodo/FSM/src/cc/token.cpp)

## To add a new contract

> 1. Add EVAL_CODE to eval.h

> 1. Initialize the variables in the CCinit function below

> 1. Write a Validate function to reject any unsanctioned usage of vin/vout

> 1. Make helper functions to create rawtx for RPC functions

> 1. Add rpc calls to rpcserver.cpp and rpcserver.h and in one of the rpc.cpp files

> 1. Add the new .cpp files to src/Makefile.am

1, 2 and 6 are not even coding tasks. 4 and 5 are non-consensus time, mostly dealing with JSON. 3 is the main work needed, which makes sense as a different 3 is what makes it a different contract. A lot of a contracts can use slightly modified functions from the other CC contracts. So the best way to do a new one would be to pick the one that is closest to what you want and start morphing it.

## General guidance on reporting issues on discord (Regarding CryptoConditions and SmartContract development):

> - the specific chain parameters so anyone can connect to it

> - the **EXACT** rpc call and parameters you used

> - **the most important!** : the raw tx generated

> - clear description of why you think it is a bug. for now you need to look at the raw tx details to make sure all vins are valid, signed and all vouts are sane.

> - Please don't post things like "I tried X and it didnt work" as that does not help at all at this stage. These are raw transaction level things and until everything works, things won't work at the higher level.

[Discord Invite](https://komodoplatform.com/discord)
