
## get\_trade\_fee (deprecated)

**get_trade_fee coin**

The `get_trade_fee` method returns the approximate amount of the miner fee that is paid per swap transaction.

This amount should be multiplied by 2 and deducted from the volume on `buy/sell` calls when the user is about to trade the entire balance of the selected coin. This aspect is currently under development.

::: tip

This function is deprecated. Please consider using [trade_preimage v2.0](../../../basic-docs/atomicdex/atomicdex-api-20/trade_preimage.html) instead.

:::

::: tip Note

To send QRC20 Maker/Taker payment, you may need to allow the [Etomic Swap](https://github.com/artemii235/etomic-swap/) smart contract to withdraw amounts from your account using the [approve](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-approve-address-uint256-) call.
In the worst case, you should call the `approve` twice (reduce allowance to 0 and set it to a required value) before the [erc20Payment](https://github.com/artemii235/etomic-swap/blob/1.0/contracts/EtomicSwap.sol#L51) is called.

Gas Limit `100000` and Gas Price `40` are sufficient for one smart contract call.

As a result, the value returned by the `get_trade_fee` for a QRC20 token includes gas fee `3 * 100000 * 40 = 12000000` that can be used in the worst case.

:::

#### Arguments

| Structure | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| coin      | string | the name of the coin for the requested trade fee |

#### Response

| Structure              | Type             | Description                                                                                                                                                |
| -------------          | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                 | object           | an object containing the relevant information                                                                                                              |
| result.coin            | string           | the fee is paid from the user's balance of this coin. This coin name may differ from the requested coin. For example, ERC20 fees are paid by ETH (gas)     |
| result.amount          | string (numeric) | the approximate fee amount to be paid per swap transaction in decimal representation                                                                       |
| result.amount_rat      | rational         | the approximate fee amount to be paid per swap transaction in rational representation                                                                      |
| result.amount_fraction | fraction         | the approximate fee amount to be paid per swap transaction in fraction representation                                                                      |

#### :pushpin: Examples

#### Command (BTC)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"get_trade_fee\",\"coin\":\"BTC\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "amount":"0.00042049",
    "amount_fraction":{
      "denom":"100000000",
      "numer":"42049"
    },
    "amount_rat":[[1,[42049]],[1,[100000000]]],
    "coin":"BTC"
  }
}
```

</collapse-text>

</div>

#### Command (ETH)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"get_trade_fee\",\"coin\":\"ETH\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "amount":"0.00594",
    "amount_fraction":{
      "denom":"50000",
      "numer":"297"
    },
    "amount_rat":[[1,[297]],[1,[50000]]],
    "coin":"ETH"
  }
}
```

</collapse-text>

</div>

#### Command (ERC20)

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"get_trade_fee\",\"coin\":\"BAT\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result":{
    "amount":"0.00594",
    "amount_fraction":{
      "denom":"50000",
      "numer":"297"
    },
    "amount_rat":[[1,[297]],[1,[50000]]],
    "coin":"ETH"
  }
}
```

</collapse-text>

</div>
