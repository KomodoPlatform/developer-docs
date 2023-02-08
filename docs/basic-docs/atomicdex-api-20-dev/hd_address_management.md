# Heirarchical Deterministic Address Management

A hierarchical-deterministic (HD) wallet generates a new key pair from a master key pair, allowing for multiple addresses to be generated from the same seed so that change from transactions go to a previously unused address, enhancing privacy and security. The hierarchical structure resembles that of a tree, with the master key “determining” the key pairs that follow it in the hierarchy. If you have activated a coin with the [task::enable_utxo::init](coin_activation_tasks.html#task-enable-utxo-init) or [task::enable_qtum::init](coin_activation_tasks.html#task-enable-qtum-init) and used the `"priv_key_policy": "Trezor"` parameter, you can use the methods below to generate new addresses.



## can\_get\_new\_address

To avoid generating too many addresses at once, we can use a `gap_limit` constraint so that no more than a specific amount of unused addresses can be generated before more addresses can be generated.


#### Arguments

| Parameter          | Type    | Description                                                                                      |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------ |
| coin               | string  | The ticker of the coin you want to get a new address for                                         |
| account_id         | integer | Generally this will be `0` unless you have multiple accounts registered on your Trezor           |
| chain              | string  | `Internal`, or `External`. External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| gap_limit          | integer | The maximum number of empty addresses in a row.                                                  |


#### Response

| Parameter              | Type     | Description                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- |
| result                 | string   | Returns with value `success` when successful, otherwise returns the error values below |
| result.allowed         | boolean  | Whether or not you can get a new address.                                                                    |
| result.reason          | string   | The reason you cant get a new address (if allowed is `false`).                                               |
| result.details         | object   | Contains extra contextual information about the reason why allowed is `false`                                |
| result.details.address | boolean  | If reason is `LastAddressNotUsed`, this is the address that should be used before you can get a new address. |

Other reasons you might not be able to get a new address are:

- `EmptyAddressesLimitReached` - Last gap_limit addresses are still unused.
- `AddressLimitReached` - Addresses limit reached. Currently, the limit is [2^31](https://www.wolframalpha.com/input?i=2%5E%2832%29)

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"can_get_new_address\",
    \"params\": {
        \"coin\": \"RICK\",
        \"account_id\": 0,
        \"chain\": \"External\",
        \"gap_limit\": 20
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success, allowed)

```json
{
    "mmrpc": "2.0",
    "result": {
        "allowed": true
    },
    "id": null
}
```

#### Response (success, not allowed)

```json
{
    "mmrpc": "2.0",
    "result": {
        "allowed": false,
        "reason": "LastAddressNotUsed",
        "details": {
            "address": "RMHFCEWacWP7dYw1DWxH3TF5YW8q8hM5z7"
        }
    },
    "id": null
}
```

</collapse-text>

</div>


## get\_new\_address

If we don't already have too many unused addresses, we can use the `get_new_address` method to generate a new address. The generated address will be shown in account_balance and init_account_balance RPCs and on the next coin activation.


#### Arguments

| Parameter          | Type    | Description                                                                                      |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------ |
| coin               | string  | The ticker of the coin you want to get a new address for                                         |
| account_id         | integer | Generally this will be `0` unless you have multiple accounts registered on your Trezor           |
| chain              | string  | `Internal`, or `External`. External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| gap_limit          | integer | The maximum number of empty addresses in a row.                                                  |


#### Response

| Parameter                          | Type            | Description                                                                            |
| ---------------------------------- | --------        | -------------------------------------------------------------------------------------- |
| result                             | string          | Returns with value `success` when successful, otherwise returns the error values below |
| result.new_address                 | object          | Contains details about your new address.                                               |
| result.address                     | string          | The new address that was generated.                                                    |
| result.details                     | object          | Contains extra contextual information about the reason why allowed is `false`                                |
| result.details.address             | boolean         | If reason is `LastAddressNotUsed`, this is the address that should be used before you can get a new address. |
| result.details.derivation_path     | string          | The [BIP44 derivation path](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) of the address.  |
| result.details.chain               | string          | `External` or `Internal` External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| result.details.balance             | object          | Contains the spendable and unspendable balance for this address                    |
| result.details.balance.spendable   | string(numeric) | Spendable balance for this address                                                 |
| result.details.balance.unspendable | string(numeric) | Unspendable balance for this address (e.g. from unconfirmed incoming transactions) |

Other reasons you might not be able to get a new address are:

- `EmptyAddressesLimitReached` - Last gap_limit addresses are still unused.
- `AddressLimitReached` - Addresses limit reached. Currently, the limit is [2^31](https://www.wolframalpha.com/input?i=2%5E%2832%29)

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"YOUR_PASS\",
    \"mmrpc\": \"2.0\",
    \"method\": \"get_new_address\",
    \"params\": {
        \"coin\": \"RICK\",
        \"account_id\": 0,
        \"chain\": \"External\",
        \"gap_limit\": 20
    }
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
    "mmrpc": "2.0",
    "result": {
        "allowed": true
    },
    "id": null
}
```

#### Response (success, not allowed)

```json
{
    "mmrpc": "2.0",
    "result": {
        "new_address": {
            "address": "RRqF4cYniMwYs66S4QDUUZ4GJQFQF69rBE",
            "derivation_path": "m/44'/141'/0'/0/3",
            "chain": "External",
            "balance": {
                "spendable": "0",
                "unspendable": "0"
            }
        }
    },
    "id": null
}
```

</collapse-text>

</div>