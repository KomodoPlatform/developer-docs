# CClib

The following methods interact with CryptoConditions modules that make use of the `-ac_cclib` parameter.

## cclib

**cclib insert_method insert_evalcode \\"[%22json_params%22]\\"**

The `cclib` method allows the user to interact with the dynamic CryptoConditions module associated with `evalcode`.

Each `evalcode` module has unique methods and json parameters associated, as well as unique responses.

Inside the `[]` brackets of the array, the json parameters must be wrapped with the characters `%22`.  

::: tip
The [cclibinfo](../komodo-api/cclib.html#cclibinfo) method returns a complete list of available methods and their parameters for each unique `evalcode`.
:::

### Arguments:

| Name        | Type             | Description                                         |
| ----------- | ---------------- | --------------------------------------------------- |
| method      | (string)         | the unique name of the method                                  |
| evalcode    | (decimal number) | the `EVALCODE` of the module of interest        |
| json_params | (array)          | the parameters to be supplied to the method, provided as an array |

### Response:

| Name        | Type             | Description                                         |
| ----------- | ---------------- | --------------------------------------------------- |
| (each `EVALCODE` is unique) |||

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=MUSIG cclib combine 18 '["0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a","02d3431950c2f0f9654217b6ce3d44468d3a9ca7255741767fdeee7c5ec6b47567"]'
```

Response:

```json
{
  "pkhash": "8897e150bfb07d3f967ffadb4b0f3c84ea73a94c0d715c4b7e6d9c816c5113a9",
  "combined_pk": "03d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a",
  "result": "success"
}
```

## cclibaddress

**cclibaddress evalcode pubkey**

The `cclibaddress` method returns information about the addresses related to the specified `pubkey`, and according to the CryptoConditions module associated with the specified `evalcode`. If no `pubkey` is provided, the `pubkey` used to the launch the daemon is the default.

### Arguments:

| Name     | Type             | Description                                                                         |
| -------- | ---------------- | ----------------------------------------------------------------------------------- |
| evalcode | (decimal number) | the `EVALCODE` of the module of interest        |
| pubkey   | (string, optional)         | the public key related to the requested address information |

### Response:

| Name                   | Type     | Description                                                                                                                |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| result                 | (string) | the result of the operation; can be `success`/ `failed`                                                                    |
| CClibCCAddress         | (string) | taking the parameter `evalcode` as a modifier, this is the public address that corresponds to the CryptoConditions module's privkey |
| CCbalance              | (number) | the amount of coins in the `CClibCCAddress`                                                                                    |
| CClibNormalAddress     | (string) | the unmodified public address generated from the CryptoConditions module's privkey                                                  |
| CClibCCTokensAddress   | (string) | this property is used for development purposes only and can otherwise be ignored                                           |
| myAddress              | (string) | the normal address generated from the `pubkey`                                                                             |
| myCCAddress(CClib)     | (string) | taking the parameter `evalcode` as a modifier, this is the public address that corresponds to the `pubkey`                 |
| PubkeyCCaddress(CClib) | (string) | taking the parameter `evalcode` as a modifier, this is the public address that corresponds to the `pubkey`                 |
| myCCaddress            | (string) | taking the parameter `evalcode` as a modifier, this is the public address that corresponds to the `pubkey`                 |
| myCCbalance            | (number) | the amount of coins in `myCCaddress`                                                                                       |
| mybalance              | (number) | the amount of coins in `myAddress`                                                                                         |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=MUSIG cclibaddress 18 0225f1cbbda1a0c406bb8f6dc7a589d88b2f9e28cd4fdb3f59139f8aff1f5d270a
```

Response:

```json
{
  "result": "success",
  "CClibCCAddress": "RKWS7jxyjPX9iaJttk8iMKf1AumanKypez",
  "CCbalance": 2.0977,
  "CClibNormalAddress": "RQHYfxb21ow4Xppt2H9x7k5XMhk7PMbKCc",
  "CClibCCTokensAddress": "RVjvG3or8b8asoYBJua9p97pf3RSpaEhRG",
  "myAddress": "RUfCUd3UryKJ49baQvSuAs42wakNunvvfT",
  "myCCAddress(CClib)": "RPYCYEtS7GAt1W9LvJWXHsndozaA8yy4H9",
  "PubkeyCCaddress(CClib)": "RPYCYEtS7GAt1W9LvJWXHsndozaA8yy4H9",
  "myCCaddress": "RPYCYEtS7GAt1W9LvJWXHsndozaA8yy4H9",
  "myCCbalance": 0.0,
  "myaddress": "RUfCUd3UryKJ49baQvSuAs42wakNunvvfT",
  "mybalance": 94.60081561
}
```

## cclibinfo

**cclibinfo**

The `cclibinfo` method displays all the methods of all the modules that are available in the current library. 

The library is loaded at runtime using the [-ac_cclib.](../../installations/asset-chain-parameters.html#ac-cclib) parameter.

### Arguments:

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| (none) |  | |

### Response:

| Name            | Type             | Description                                                                                                                                              |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result          | (string)         | whether the command executed successfully                                                                                                  |
| CClib           | (string)         | the name of the given CClibrary                                                                                                                                             |
| methods         | (array of json objects) | an array containing json objects, each of which describe a method of a module                                                                               |
| evalcode        | (decimal number) | the `EVALCODE` of the given CryptoConditions module                                                                                                                         |
| funcid          | (character)      | for methods that generate a transaction, this is the `funcid` in the `opreturn`; for methods that do not generate a transaction, this value is a mnemonic |
| name            | (string)         | the name of the CryptoConditions module                                                                                                                               |
| method          | (string)         | the name of the method                                                                                                                                       |
| help            | (string)         | help for the method, including a description of the method's arguments                                                                                                             |
| params_required | (decimal number) | the number of parameters that are required for the method to succeed                                                                                         |
| params_max      | (decimal number) | the maximum number of parameters the method can accept                                                                                                       |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=MUSIG cclibinfo
```

Response:

```json
{
  "result": "success",
  "CClib": "sudoku",
  "methods": [
    {
      "evalcode": 16,
      "funcid": "F",
      "name": "faucet2",
      "method": "fund",
      "help": "amount",
      "params_required": 1,
      "params_max": 1
    },
    {
      "evalcode": 16,
      "funcid": "G",
      "name": "faucet2",
      "method": "get",
      "help": "<no args>",
      "params_required": 0,
      "params_max": 0
    },
    {
      "evalcode": 17,
      "funcid": "G",
      "name": "sudoku",
      "method": "gen",
      "help": "<no args>",
      "params_required": 0,
      "params_max": 0
    },
.....
}
```
