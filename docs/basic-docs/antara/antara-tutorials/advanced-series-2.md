# Advanced Series — Antara Module Development Basics

## The Eval Code

In the Komodo source code, each Antara Module has an associated arbitrary number, called an "eval" code. This code can be any digit between `0` and `255`, there can be only one code per module, and each code is currently one byte in size. To add a new Antara Module, the developer begins by adding a new eval code to the table of all active eval codes on their Smart Chain. 

We define all eval codes in the [~/komodo/src/cc/eval.h](https://github.com/jl777/komodo/tree/jl777/src/cc/eval.h) file. The following eval codes represent the essential, default modules in a Smart Chain.

```C
#define FOREACH_EVAL(EVAL)             \
        EVAL(EVAL_IMPORTPAYOUT, 0xe1)  \
        EVAL(EVAL_IMPORTCOIN,   0xe2)  \
        EVAL(EVAL_ASSETS,   0xe3)  \
        EVAL(EVAL_FAUCET, 0xe4) \
        EVAL(EVAL_REWARDS, 0xe5) \
        EVAL(EVAL_DICE, 0xe6) \
        EVAL(EVAL_FSM, 0xe7) \
        EVAL(EVAL_AUCTION, 0xe8) \
        EVAL(EVAL_LOTTO, 0xe9) \
        EVAL(EVAL_MOFN, 0xea) \
        EVAL(EVAL_CHANNELS, 0xeb) \
        EVAL(EVAL_ORACLES, 0xec) \
        EVAL(EVAL_PRICES, 0xed) \
        EVAL(EVAL_PEGS, 0xee) \
        EVAL(EVAL_TRIGGERS, 0xef) \
        EVAL(EVAL_PAYMENTS, 0xf0) \
        EVAL(EVAL_GATEWAYS, 0xf1)
```

As the eval code must range between `0` and `255`, a Smart Chain can have up to 256 total modules. The developer of a Smart Chain can determine which modules to add from the available modules in the ecosystem. At this time, we do not yet have 256 total modules, and therefore there is no need to choose.

#### Validation Code

The developer adds validation code that will be executed any time the daemon encounters a transaction bearing the relevant module's eval code.

This is where the true power of CC begins. When validating a normal transaction, the daemon has access only to information included in the transaction itself. With a CC transaction, however, the daemon is running arbitrary code, and therefore anything is possible. The validation code can look trough the blockchain history, observe transactions in the mempool, and even utilize Antara's cross-chain technology.

Technically, OP_CCC scripts do not have a required structure. The scripts only need to follow the general structure of the initial layout. The developer may follow the general guideline, as provided in our templates and tutorials. This allows the developer to code and debug their OP_CCC related modules in an efficient manner.

#### Flexbile Pubkey Expression

To understand how CryptoConditions (CC) manages addresses and scripts, the developer should first understand a few basic concepts regarding pubkeys.

Originally, Bitcoin pubkeys were 64 bytes, as opposed to the 33 byte pubkeys of today. The 64 byte pubkeys had a left half and a right half which were used for internal functions in the daemon. Using cryptographic methods, a developer could derive the left half of the function from the right half, and vice versa. 

Early Bitcoin developers took advantage of the ability to derive one half of the pubkey from the other, and compressed the pubkey to a smaller size. They also instituted prefixes that informed the daemon whether the pubkey was odd, even, or large (`02`, `03`, and `04` respectively). In the end, the developers compressed the 64 byte pubkey into a 33 byte version.

Today, there are multiple ways to express a pubkey. There are compressed and uncompressed versions of the pubkey, and the pubkey can also be expressed as two different base58 encoded addresses. All of these are associated with the same private key.

#### Pubkeys and CC Addresses 

When working with software based on the Bitcoin protocol, a common problem a developer encounters is found in creating an address that is associated with a script. A frequent solution is to hash the script and use the hash as the address. Komodo uses this solution in the Antara CC implementation. Using this method, the CC script serves as the CC address.

With this in mind, the essential structure of a CC script is as follows. (The automatically generated content is handled by the daemon's internal functions and can be ignored.)

```
evalcode + pubkey + automatically generated content
```

Each CC script utilizes the eval code of the module to which the CC script belongs. Since the CC script includes both the pubkey and the module's unique eval code, a pubkey makes a unique CC address for each module.

Funds that are sent to a CC address can be spent only by the module with the appropriate eval code, and therefore funds created and associated with an eval code maintain scarcity within this module.

A common and simple CC script exists in nearly all of the default Antara Modules. The structure of this script consists of a single signature from a pubkey and CC validation. This is essentially the equivalent of a P2PK Bitcoin script; the CC validation returns `true` or `false`, whereas the P2PK Bitcoin script returns `1` or `0`.

#### Global CC Address

By convention, each Antara Module has a global CC address where the privkey is publicly available. As usual, spending from this global CC address requires that the spender meet all validation rules set forth by the developer. Therefore, the lack of privacy for the private key is not an issue. 

One purpose for this global CC address is to create a repository that is global (within the module) for information regarding specific instances of this module on the chain.

For example, typically the design of an Antara Module requires that each time a user initiates an instance of the module, the user also sends a small amount of funds to this global CC address. This transaction contains data about the instance the user desires to create. Other users on the network can retrieve the data in this global CC address, and thereby gain knowledge about the current state of all module instances on the Smart Chain.

## Vector Inputs and Outputs

A transaction in the Bitcoin protocol consists of input and output vectors, called "vins" and "vouts" for brevity. The vins take funds from utxos, combine them into one "spend" transaction, and create new vouts. Some of the vouts may be new utxos.

```
vin0 + vin1 + ... + vin[n-1] -> vout0 + vout1 + ... vout[n-1]
```

Each of the vouts has a spend script that must be satisfied before the vout can be spent. 

Suppose vout0 is a normal utxo with a small amount of funds and the receiver of this utxo desires to spend it. They create a new transaction with a vin that consumes vout0. This vin must satisfy any scripts that are contained in vout0.

#### CC Enhances the Script Between Vin and Vout to Advanced Levels

A key power of CryptoConditions (CC) is the ability to enhance the script that must be satisfied between a vin and a vout. In CC, the vout contains the logical condition, and the vin contains the logical fulfillment.

With access to arbitrary code, CC allows the Bitcoin protocol to rival the "smart contracts" common on other platforms. Yet, CC accomplishes this without requiring the virtual-machine counterpart that other smart-contract platforms require. Instead, the consensus mechanism is directly engaged with the scripts in the vins and vouts of transactions.

The Bitcoin protocol's consensus mechanism is constantly placed under the most intense of pressure in the industry, and therefore is likely the most reliable consensus mechanism available. The ability to engage the consensus mechanism in arbitrary code while not changing the consensus mechanism itself grants Antara security and stability. The utxo system of the Bitcoin protocol also reduces the likelihood that modules themselves will contain bugs internally. (The reader should note that CC cannot eliminate attack vectors altogether.)

#### The Many Possibilities of OC_CHECKCRYPTOCONDITION

Consider the implications of the combination of possibilities contained in this new opreturn, OP_CCC. As there can be up to 256 eval codes per Smart Chain, there can be up to 256 different types of CC outputs per chain. Each CC transaction can contain multiple vins and vouts, each of which provides CC related fulfillments and conditions. Also, each module has a globally available CC address to allow for chain-wide functionality, making the possibilities per vin or vout 257. 

Observe the essential structure of a transaction with 3 vins and 2 vouts.

```
vin0 + vin1 + vin2 -> vout0 + vout1
```

With the possibilities of OP_CCC, the combination allows for 1.12e+12 possibile combinations.

```
257 * 257 * 257 * 257 * 257 = 1.12e+12
```

This is a dramatic increase in the possibilities over the limits of the original Bitcoin protocol. 

While the possibilities of a transaction are essentially limitless, the developer must create validation code that ensures the module and its transactions function as intended. Therefore, in practice the developer often limits the possibilities to `1` to `3` types per vin or vout.

## Introduction to the Remote Procedure Call (RPC)

A Remote Procedure Call (RPC) allows a module developer the ability to offer easy access to their module's functionality. The role of the RPC calls are to create properly signed raw transactions that are ready for broadcasting.

The developer places the command name of each RPC they desire to create into a table in the CC source code. From this table, the built-in komodo-cli software is able to access and execute the RPC. In this manner, developers of all skills levels can integrate Antara Modules into other software.  

Antara Modules can have any RPCs the developer desires, or even have no RPCs. By convention, each Antara Modules has a few default RPCs: `<CC_Name>address`, `<CC_name>list`, and `<CC_name>info`. For example, the Dice module has, `diceaddress`, `dicelist`, and `diceinfo`. Respectively, these RPCs return information about a CC-related address, the list of all instances of this module on the Smart Chain, and information about the chain-wide state of the module.  

## Creating a Global CC Address

The following code from the Faucet module serves as an example of the manner in which we begin the creation of a global CC address for this module.

```C
const char *FaucetCCaddr = "R9zHrofhRbub7ER77B7NrVch3A63R39GuC";
const char *FaucetNormaladdr = "RKQV4oYs4rvxAWx1J43VnT73rSTVtUeckk";
char FaucetCChexstr[67] = { "03682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe12" };
uint8_t FaucetCCpriv[32] = { 0xd4, 0x4f, 0xf2, 0x31, 0x71, 0x7d, 0x28, 0x02, 0x4b, 0xc7, 0xdd, 0x71, 0xa0, 0x39, 0xc4, 0xbe, 0x1a, 0xfe, 0xeb, 0xc2, 0x46, 0xda, 0x76, 0xf8, 0x07, 0x53, 0x3d, 0x96, 0xb4, 0xca, 0xa0, 0xe9 };
```

For a template of this logic pattern, view the [CCcustom.cpp](https://github.com/jl777/komodo/tree/jl777/src/cc/CCcustom.cpp) file.

[<b>Link to CCcustom.cpp file</b>](https://github.com/jl777/komodo/tree/jl777/src/cc/CCcustom.cpp)

Note that at the bottom of the file there is a switch statement. There, the above values are copied into an in-memory data structure for each CC type. This allows the entire CC codebase to access the global CC addresses in a standard manner.

To create a global CC address for a new module, follow these steps.

#### Create a value using getnewaddress

With the `komodod` daemon running, use the [<b>getnewaddress</b>](../basic-docs/smart-chains/smart-chain-api/wallet.html#getnewaddress) RPC with `komodo-cli` to get a new address. (You may use any Komodo Smart Chain, such as the KMD main chain, for this procedure.)

Copy this value into the first line of the code. For example, in the Faucet code above the result is as follows.

```C
const char *FaucetNormaladdr = "RKQV4oYs4rvxAWx1J43VnT73rSTVtUeckk";
```

#### Retrieve the pubkey using validateaddress

Use the [<b>validateaddress</b>](../basic-docs/smart-chains/smart-chain-api/util.html#validateaddress) RPC with `komodo-cli` to obtain the pubkey of the new normal address from the previous step.

Place the returned value into the `<CChexstr>[67]` line of code.

```C
char FaucetCChexstr[67] = { "03682b255c40d0cde8faee381a1a50bbb89980ff24539cb8518e294d3a63cefe12" };
```

#### Restart the Daemon with the pubkey 

Stop the daemon and restart with the [<b>pubkey</b>](../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#pubkey) launch parameter enabled. Use the pubkey from the <b>validateaddress</b> RPC as the pubkey value.

#### Ensure the Myprivkey Function is Properly Enabled

Check that the `if ( 0 )` statement is enabled in the  `Myprivkey()` function in the `/src/cc/CCutils.cpp` file.

#### Obtain the CCaddress

<!-- I didn't think the <CC>address RPC call was enabled at this point, unless the RPCs are implemented? -->

Execute the `<CC_name>address` RPC call and use the returned value to complete the `<CC_Name>CCaddr` line of code.

```
const char *FaucetCCaddr = "R9zHrofhRbub7ER77B7NrVch3A63R39GuC";
```

#### Obtain the privkey in Hex Format

From the response returned by the `<CC_name>address` RPC, use the hex value of the private key to complete the appropriate line of code.

```
uint8_t FaucetCCpriv[32] = { 0xd4, 0x4f, 0xf2, 0x31, 0x71, 0x7d, 0x28, 0x02, 0x4b, 0xc7, 0xdd, 0x71, 0xa0, 0x39, 0xc4, 0xbe, 0x1a, 0xfe, 0xeb, 0xc2, 0x46, 0xda, 0x76, 0xf8, 0x07, 0x53, 0x3d, 0x96, 0xb4, 0xca, 0xa0, 0xe9 };
```

<!-- How do we have a new pubkey from this? -->

Stop the daemon and restart it using the new pubkey.

#### Add the First RPC

<!-- This should be part of its own section? Also, still confused about how to execute <CC>address above, since we create the RPC below. -->

Add a line to the `/src/rpcserver.h` file to create the `<CC_name>address` function for the module.

Update the commands array in the `/src/rpcserver.cpp` file.

#### Copy the Existing Default RPCs to the New Module

From the `/src/wallet/rpcwallet.cpp` file, copy and paste the existing RPC functions to create new versions for the new module. Change the eval code and customize the functions as desired.

Add an entry into the `/src/cc/eval.h` file.

<!-- Anything here about testing to ensure that it works properly, or anything? -->

## Introduction to Validation

A large portion of Antara Module customization pertains to the manner in which the validation code constrains CC transaction input.

The CC validation code is called at the time that the consensus mechanism is validating a CC transaction. The consensus mechanism only calls the CC validation code and waits for a response of `true` or `false`. Whether or not the CC validation code is effective is a matter for the developer to resolve. 

The developer is responsible for properly designing both the validation code and the RPC implementations. Both should work together to ensure that RPCs cannot create transactions that should not exist, and the CC validation code should only validate proper transactions.

The CC validation code is already locked in the main loop of the Bitcoin protocol at the time the code is called. Care should be taken with the CC validation code to ensure that the code does not cause a deadlock on the chain.

------------

[<b>Link to Next Tutorial in Advanced Series</b>](../../../basic-docs/antara/antara-tutorials/advanced-series-3.html)
