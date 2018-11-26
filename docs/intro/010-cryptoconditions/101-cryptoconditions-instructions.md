# CryptoConditions Instructions

## Understanding the Types of Addresses Used in CryptoConditions-Based Contracts

The method of transferring contract-related assets is often slightly different from transferring the main coins of an asset chain.

When making a transaction on the main blockchain of your asset chain, you typically only deal with a sending address and a receiving address. To move coins, you might use rpc calls such as `sendtoaddress` or `z_sendmany`.

In each contract, you may see several addresses involved with a transaction. It is not necessary to fully understand all of them, but basic knowledge about a few addresses will be necessary.

Also, each smart contract will move coins or tokens differently, depending on the nature of the contract. For example, if you are dealing with tokens (similar to "colored coins"), you may use the [`tokentransfer`](../010-cryptoconditions/150-cc-tokens.html#tokentransfer) method.

The first address you must understand is the pubkey. Any user using a CryptoConditions smart contract must have a pubkey indicated in their daemon. The pubkey forms the basis for all the addresses related to contracts. Typically, each CryptoConditions smart contract  will take the pubkey, combine it with a unique and contract-specific number called the `EVAL code`, and create a new [`Base58Check`](https://en.bitcoin.it/wiki/Base58Check_encoding) encoded address from it. This `Base58Check` encoded address will be the address you use to interact with different CryptoConditions based contracts.

## Creating and Launching with a Pubkey

To get a pubkey, launch the chain with the normal launch parameters and execute the [`getnewaddress`](../015-essential-rpc/339-wallet.html#getnewaddress) rpc call.

`./komodo-cli -ac_name=HELLOWORLD getnewaddress`

This will return a new address:

`DO_NOT_USE_ADDRESSgg2ionaes1J5L786`

Now, execute the [`validateaddress`](../015-essential-rpc/335-util.html#validateaddress) rpc call.

`./komodo-cli -ac_name=HELLOWORLD validateaddress DO_NOT_USE_ADDRESSgg2ionaes1J5L786`

This will return a json object with many properties. In the properties you will see:

`"pubkey": "DO_NOT_USE_ADDRESS019a79b0921a1be6d3ca6f9e8a050feb14eb845fe46b9d756"`

This is will be your contract pubkey; you must now indicate it in the daemon.

To do this, first stop the daemon.

`./komodo-cli -ac_name=HELLOWORLD stop`

Then relaunch your daemon using the required parameters, and make sure to include your pubkey as an additional parameter. For example:

`./komodo-cli -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=777 -pubkey=DO_NOT_USE_ADDRESS019a79b0921a1be6d3ca6f9e8a050feb14eb845fe46b9d756`

The daemon will now use the pubkey as the basis for all CryptoConditions based smart contracts.

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

In this list, `myCCaddress` is the contract-address used for transactions related to the `rewards` contract; it is based on the pubkey combined with the contract's unique EVAL code.

The `myaddress` property is the unmodified address that corresponds to the pubkey.

The use cases of the different addresses depends on the functionality in question, and the desired outcome.
