# Crypto Conditions Instructions

## Understanding the Types of Addresses Used in Crypto Conditions-Based Contracts

The method of transferring contract-related assets is often slightly different from transferring the main coins of an asset chain.

When making a transaction on the main blockchain of your asset chain, you typically only deal with a sending address and a receiving address. To move coins, you might use rpc calls such as `sendtoaddress` or `z_sendmany`.

There are a few more addresses to keep in mind when working with transactions using Crypto Conditions. It is not necessary to fully understand all of the addresses, but basic knowledge about a few addresses will be necessary.

## Creating and Launching With a Pubkey

The first address you must understand is the pubkey. Any user using a Crypto Conditions smart contract must have a pubkey indicated in their daemon. This forms the basis for all addresses related to Crypto Conditions.

Typically, each Crypto Conditions smart contract will take the pubkey, combine it with a unique and contract-specific number called the `EVAL code`, and create a new [`Base58Check`](https://en.bitcoin.it/wiki/Base58Check_encoding) encoded address from it. This `Base58Check` encoded address will be the address you use for interacting on the Crypto Conditions-based contract.

To get a pubkey, launch the chain with the normal launch parameters and execute the [`getnewaddress`](../essential-rpc/wallet.html#getnewaddress) rpc call.

`./komodo-cli -ac_name=HELLOWORLD getnewaddress`

This will return a new address:

`DO_NOT_USE_ADDRESSgg2ionaes1J5L786`

Now, execute the [`validateaddress`](../essential-rpc/util.html#validateaddress) rpc call.

`./komodo-cli -ac_name=HELLOWORLD validateaddress DO_NOT_USE_ADDRESSgg2ionaes1J5L786`

This will return a json object with many properties. In the properties you will see:

`"pubkey": "DO_NOT_USE_ADDRESS019a79b0921a1be6d3ca6f9e8a050feb14eb845fe46b9d756"`

This is will be your contract pubkey; you must now indicate it in the daemon.

To do this, first stop the daemon.

`./komodo-cli -ac_name=HELLOWORLD stop`

Then relaunch your daemon using the required parameters, and make sure to include your pubkey as an additional parameter. For example:

`./komodo-cli -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=777 -pubkey=DO_NOT_USE_ADDRESS019a79b0921a1be6d3ca6f9e8a050feb14eb845fe46b9d756`

## Other Crypto Conditions Addresses

The daemon will now use the pubkey as the basis for all Crypto Conditions-based smart contracts.

To see your CC address, you will typically use an `address` related rpc call from the list of available rpc calls of your chosen smart contract. For example, `rewardsaddress` could return a response like this:

```
{
  "result": "success",
  "FaucetCCaddress": "RSxACZQhskPjQyxp7TUPG1oP1wm4agFycJ",
  "CCaddress": "RSxACZQhskPjQyxp7TUPG1oP1wm4agFycJ",
  "myCCaddress": "RSxACZQhskPjQyxp7TUPG1oP1wm4agFycJ",
  "myaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ"
}
```

In this list, the `FaucetCCaddress` is the address that corresponds to the creator of this instance of the `Faucet` smart contract. `myCCaddress` is the contract address you would use for transactions related to this specific `Faucet` contract; it is based on the combination of your pubkey and the contract's unique EVAL code (which you do not typically see).

The `myaddress` property is the unmodified address that corresponds to your pubkey.

The use-cases of the different addresses depends on the functionality in question, and the desired outcome.

Also, each smart contract may have its own RPC calls for moving coins or tokens within the contract. For example, if you are dealing with tokens, you may use the [`tokentransfer`](../cryptoconditions/cc-tokens.html#tokentransfer) method.
