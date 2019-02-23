# CClib

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

In particular they are useful for interacting with the dynamic consensus modules that can be [built into](../cryptoconditions/dynamic/dynamic-modules-instructions.html) `komodod` for using in assetchains.

## cclib

**cclib method [evalcode][json_params]**

The `cclib` RPC allows the user to interact with various Dynamic Modules that have different `evalcode`s by specifying a predefined `method` and the required `json_params`

### Arguments:

| Name        | Type             | Description                                         |
| ----------- | ---------------- | --------------------------------------------------- |
| method      | (string)         | name of the method                                  |
| evalcode    | (decimal number) | `EVALCODE` of the Dynamic Module of interest        |
| json_params | (array)          | parameters to be supplied to the method in an array |

### Response:

::: tip Notice
The response to the above RPC depends on the `method` used and the Dynamic Module the `evalcode` is referencing. To learn about the methods of a particular Dynamic Module, kindly visit its documentation page.
:::

## cclibaddress

**cclibaddress [evalcode][pubkey]**

The `cclibaddress` method returns information about the addresses related to the specified `pubkey` for the Dynamic Module refered by the supplied `evalcode`. If no `pubkey` is provided, the `pubkey` used to the launch the daemon is the default.

### Arguments:

| Name     | Type             | Description                                                                         |
| -------- | ---------------- | ----------------------------------------------------------------------------------- |
| evalcode | (decimal number) | `EVALCODE` of the Dynamic Module of interest                                        |
| pubkey   | (string)         | the public key whose addresses related to the Dynamic Module are required; optional |

### Response:

| Name                   | Type     | Description                                                                                                                |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| result                 | (string) | the result of the operation; can be `success`/ `failed`                                                                    |
| CClibCCAddress         | (string) | taking the parameter `evalcode` as a modifier, this is the public address that corresponds to the Dynamic Module's privkey |
| CCbalance              | (number) | amount of coins in the `CClibCCAddress`                                                                                    |
| CClibNormalAddress     | (string) | the unmodified public address generated from the Dynamic Module's privkey                                                  |
| CClibCCTokensAddress   | (string) |                                                                                                                            |
| myAddress              | (string) | the normal address generated from the `pubkey`                                                                             |
| myCCAddress(CClib)     | (string) | taking the parameter `evalcode` as a modifier, this is the public address that corresponds to the `pubkey`                 |
| PubkeyCCaddress(CClib) | (string) | taking the parameter `evalcode` as a modifier, this is the public address that corresponds to the `pubkey`                 |
| myCCaddress            | (string) | taking the parameter `evalcode` as a modifier, this is the public address that corresponds to the `pubkey`                 |
| myCCbalance            | (number) | amount of coins in the `myCCaddress`                                                                                       |
| mybalance              | (number) | amount of coins in the `myAddress`                                                                                         |

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

The `cclibinfo` RPC displays all the methods that are available to interact with different dynamic modules that have been bundled with the CC Library that has been loaded through the parameter [-ac_cclib.](../../installations/asset-chain-parameters.html#ac-cclib)

### Arguments:

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| (none) | (none) |

### Response:

| Name            | Type             | Description                                                                |
| --------------- | ---------------- | -------------------------------------------------------------------------- |
| result          | (string)         | the result of the operation; can be `success`/ `failed`                    |
| CClib           | (string)         | name of the                                                                |
| methods         | (array of jsons) | an array containing jsons, that each describe a method of a dynamic module |
| evalcode        | (decimal number) | `EVALCODE` of the Dynamic Module                                           |
| funcid          |                  |                                                                            |
| name            | (string)         | name of the Dynamic Module                                                 |
| method          | (string)         | name of the method                                                         |
| help            | (string)         | help for the method; describes its arguments                               |
| params_required | (decimal number) | number of parameters that are required for the method to succeed           |
| params_max      | (decimal number) | maximum number of parameters the method can accept                         |

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
