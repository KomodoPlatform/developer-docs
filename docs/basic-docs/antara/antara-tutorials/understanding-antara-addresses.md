# Understanding Antara Addresses

The method of transferring module-related assets is often slightly different than the typical Smart Chain transaction.

When making a transaction on a Smart Chain, you normally deal with a sending address and a receiving address. To move coins, you might use methods such as <b>sendtoaddress</b> or <b>z_sendmany</b>.

When using Antara, however, there are a few new types of addresses to keep in mind when working with transactions. It is not necessary to fully understand all of the address types; only a general understanding is needed.

### Creating and Launching With a Pubkey

The first address you must understand is the pubkey. Any user using an Antara based module must have a pubkey indicated in their daemon. This forms the basis for all addresses related to various modules.

<!--

Sidd: We can cut this below, I believe.

Typically, each module will take the pubkey, combine it with a unique and module-specific number called the `EVAL code`, and create a new [Base58Check](https://en.bitcoin.it/wiki/Base58Check_encoding) encoded address from it. This `Base58Check` encoded address will be the address you use for interacting with the specific Antara-based modules.

-->

To get a pubkey, launch the chain with the normal launch parameters and execute the [getnewaddress](../komodo-api/wallet.html#getnewaddress) API command.

```bash
./komodo-cli -ac_name=HELLOWORLD getnewaddress
```

This will return a new address:

```bash
DO_NOT_USE_ADDRESSgg2ionaes1J5L786
```

Now, execute the [validateaddress](../komodo-api/util.html#validateaddress) command.

```bash
./komodo-cli -ac_name=HELLOWORLD validateaddress DO_NOT_USE_ADDRESSgg2ionaes1J5L786
```

This will return a json object with many properties. In the properties you will see:

```bash
"pubkey": "DO_NOT_USE_ADDRESS019a79b0921a1be6d3ca6f9e8a050feb14eb845fe46b9d756"
```

This is will be your module pubkey; you must now indicate it to the daemon.

To do this, first stop the daemon.

```bash
./komodo-cli -ac_name=HELLOWORLD stop
```

Then relaunch your daemon using the required parameters, and make sure to include your pubkey as an additional parameter. For example:

```bash
./komodo-cli -ac_name=HELLOWORLD -ac_supply=777777 -ac_cc=777 -pubkey=DO_NOT_USE_ADDRESS019a79b0921a1be6d3ca6f9e8a050feb14eb845fe46b9d756
```

#### CC Addresses

The daemon will now use the above pubkey as the basis for all addresses used for the different modules.

To discover the addresses the pubkey provides, you will typically use an `address` related API command from the list of available commands of your chosen module. For example, the [<b>faucetaddress</b>](../basic-docs/fluidity/fluidity-api/faucet.html#faucetaddress) command would return a response like this:

```json
{
  "result": "success",
  "FaucetCCaddress": "R9zHrofhRbub7ER77B7NrVch3A63R39GuC",
  "Faucetmarker": "RKQV4oYs4rvxAWx1J43VnT73rSTVtUeckk",
  "GatewaysPubkey": "03ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb40",
  "FaucetCCassets": "RQ3ZQycSBM5MPPEopxoEC6R7VLRo1Fmk6f",
  "myCCaddress": "RReGLfH2MTrkeLSepkVy5vnQPE29g7KofS",
  "myaddress": "RJYiWn3FRCSSLf9Pe5RJcbrKQYosaMburP"
}
```

`FaucetCCaddress` is the address that corresponds to the default Faucet module.

<!-- Sidd: Is the above the same as the global CC address? -->

`myCCaddress` is the address your node uses for interacting with the Faucet module. This is the user address for managing funds in an Antara module.

The `myaddress` property is the normal address that corresponds to your pubkey. This is the user's address for the Smart Chain's main coin.  

::: tip

For readers who are curious, the letters "CC" are an abbreviation of an internal technology that all Antara modules use while creating unique addresses.

:::

The use-cases of the different addresses depends on the functionality in question, and the desired outcome.

Also, each module has its own API commands for moving coins or tokens. For example, the Tokens module offers the [<b>tokentransfer</b>](../customconsensus/tokens.html#tokentransfer) method.
