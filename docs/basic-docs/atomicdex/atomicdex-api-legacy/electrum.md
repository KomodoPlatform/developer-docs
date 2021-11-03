# electrum

**electrum coin servers (mm2 tx_history=false)**

::: warning Important

This command must be executed at the initiation of each AtomicDEX API instance. Also, AtomicDEX software requires the `mm2` parameter to be set for each `coin`; the methods to activate the parameter vary. See below for further information.

:::

::: tip

Electrum mode is available for utxo-based coins and QRC20 tokens only; this includes Bitcoin and Bitcoin-based forks. Electrum mode is not available for ETH/ERC20.

:::

The `electrum` method enables a `coin` by connecting the user's software instance to the `coin` blockchain using electrum technology (e.g. lite mode). This allows the user to avoid syncing the entire blockchain to their local machine.

Each `coin` can be enabled only once, and in either Electrum or Native mode. The DEX software does not allow a `coin` to be active in both modes at once.

#### Notes on the MM2 Parameter

For each `coin`, Komodo software requires the user/developer to set the `mm2` parameter. This can be achieved either in the [coins](../../../basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.html#setting-up-the-coin-list) for more details), or via the [electrum](../../../basic-docs/atomicdex/atomicdex-api.html#electrum) and [enable](../../../basic-docs/atomicdex/atomicdex-api.html#enable) methods.

The value of the `mm2` parameter informs the software as to whether the `coin` is expected to function.

- `0` = `non-functioning`
- `1` = `functioning`

::: tip

GUI software developers may refer to the `coins` file [in this link](https://github.com/KomodoPlatform/coins) for the default coin json configuration.

:::

Volunteers are welcome to test coins with AtomicDEX software at any time. After testing a coin, please create a pull request with the desired coin configuration and successful swap details using the guide linked below.

[Guide to Submitting Coin Test Results](https://github.com/KomodoPlatform/coins#about-this-repository)

##### Examples of the Parameter Settings

Set the value of the `mm2` parameter in the [coins](../../../basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.html#setting-up-the-coin-list) file as follows:

```bash
"mm2" : 1
```

For terminal interface examples, see the examples section below.

#### Using AtomicDEX Software on an Qtum Network

The following information can assist the user/developer in using QRC20 tokens with AtomicDEX software on the Qtum network:

- Swap smart contract on the Qtum mainnet: [0x2f754733acd6d753731c00fee32cb484551cc15d](https://qtum.info/contract/2f754733acd6d753731c00fee32cb484551cc15d)
- Swap smart contract on the Qtum testnet: [0xba8b71f3544b93e2f681f996da519a98ace0107a](https://testnet.qtum.info/contract/ba8b71f3544b93e2f681f996da519a98ace0107a)

To use AtomicDEX software on another Qtum-based network, deploy the Etomic swap contract code from the repository linked below. Use of this code requires a Qtum node setup.

[Link to repository code for Ethereum-based networks](https://github.com/artemii235/etomic-swap)

::: tip

Smart contract deployment is similar to [creating QRC20 tokens](https://docs.qtum.site/en/QRC20-Token-Introduce.html#creating-qrc20-tokens).

:::

#### Arguments

| Structure                           | Type                                             | Description                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin                                | string                                           | the name of the coin you want to enable                                                                                                                              |
| servers                             | array of objects                                 | the list of Electrum servers to which you want to connect                                                                                                            |
| servers.url                         | string                                           | server url                                                                                                                                                           |
| servers.protocol                    | string                                           | the transport protocol that the AtomicDEX API will use to connect to the server. Possible values: `TCP`, `SSL`. Default value: `TCP`                                               |
| servers.disable\_cert\_verification | bool                                             | when set to true, this disables server SSL/TLS certificate verification (e.g. to use self-signed certificate). Default value is `false`. <b>Use at your own risk</b> |
| mm2                                 | number (required if not set in the `coins` file) | this property informs the AtomicDEX software as to whether the coin is expected to function; accepted values are either `0` or `1`                                   |
| tx\_history                         | bool                                             | whether the node should enable `tx_history` preloading as a background process; this must be set to `true` if you plan to use the `my_tx_history` API                |
| required\_confirmations             | number                                           | the number of confirmations for which the AtomicDEX API must wait for the selected coin to perform the atomic swap transactions                                                    |
| requires\_notarization              | bool                                             | whether the node should wait for a notarization of the selected coin that is performing the atomic swap transactions applicable only for coins using Komodo dPoW     |
| swap_contract_address               | string (required for QRC20 only)                 | address of etomic swap smart contract                                                                                                                                |

#### Response

| Structure              | Type                       | Description                                                                                                                                                     |
| ---------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address                | string                     | the address of the user's `coin` wallet, based on the user's passphrase                                                                                         |
| balance                | string (numeric)           | the amount of `coin` the user holds in their wallet; does not include `unspendable_balance`                                                                     |
| unspendable_balance    | string (numeric)           | the `coin` balance that is unspendable at the moment (e.g. if the address has immature UTXOs)                                                                   |
| coin                   | string                     | the ticker of the enabled coin                                                                                                                                  |
| required_confirmations | number                     | the number of transaction confirmations for which the AtomicDEX API must wait during the atomic swap process                                                                  |
| mature_confirmations   | number (optional)          | the number of coinbase transaction confirmations required to become mature; UTXO coins only                                                                     |
| requires_notarization  | bool                       | whether the node must wait for a notarization of the selected coin that is performing the atomic swap transactions; applicable only for coins using Komodo dPoW |
| result                 | string                     | the result of the request; this value either indicates `success`, or an error, or another type of failure                                                       |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HELLOWORLD\",\"servers\":[{\"url\":\"localhost:20025\",\"protocol\":\"SSL\",\"disable_cert_verification\":true},{\"url\":\"localhost:10025\"}]}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "required_confirmations": 1,
  "requires_notarization": false,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `mm2` argument)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HELLOWORLD\",\"servers\":[{\"url\":\"localhost:20025\",\"protocol\":\"SSL\",\"disable_cert_verification\":true},{\"url\":\"localhost:10025\"}],\"mm2\":1}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (With `required_confirmations` and `requires_notarization` arguments)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"HELLOWORLD\",\"servers\":[{\"url\":\"localhost:20025\",\"protocol\":\"SSL\",\"disable_cert_verification\":true},{\"url\":\"localhost:10025\"}],\"required_confirmations\":10,\"requires_notarization\":true}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "HELLOWORLD",
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": "10",
  "required_confirmations": 10,
  "requires_notarization": true,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

</collapse-text>

</div>

#### Command (For QRC20 tokens)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"QRC20-TOKEN\",\"servers\":[{\"url\":\"localhost:20025\",\"protocol\":\"SSL\",\"disable_cert_verification\":true},{\"url\":\"localhost:10025\"}],\"swap_contract_address\":\"0xba8b71f3544b93e2f681f996da519a98ace0107a\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)

```json
{
  "coin": "QRC20-TOKEN",
  "address": "QjXkGgoiycYRm2NbiMpkEHuQt7SB9BKHjz",
  "balance": "10",
  "required_confirmations": 1,
  "requires_notarization": false,
  "unspendable_balance": "0",
  "mature_confirmations":100,
  "result": "success"
}
```

#### Response (Error, `mm2` is not set)

```bash
{
  "error":"lp_coins:943] lp_coins:693] mm2 param is not set neither in coins config nor enable request, assuming that coin is not supported"
}
```

</collapse-text>

</div>
