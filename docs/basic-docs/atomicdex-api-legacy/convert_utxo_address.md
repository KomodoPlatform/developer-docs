# convert\_utxo\_address

**convert_utxo_address address to_coin**

The `convert_utxo_address` method takes a UTXO address as input, and returns the equivalent address for another UTXO coin (e.g. from BTC address to RVN address)

#### Arguments

| Structure         | Type   | Description                     |
| ----------------- | ------ | ------------------------------- |
| address           | string | Input UTXO address              |
| to_coin           | string | Input address to convert from   |

#### Response

| Structure             | Type             | Description                                                     |
| --------------------- | ---------------- | --------------------------------------------------------------- |
| result                | string           | Converted address                                               |


#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{
        \"userpass\": \"${userpass}\",
        \"method\": \"convert_utxo_address\",
        \"coin\": \"BTC\",
        \"address\": \"1DmFp16U73RrVZtYUbo2Ectt8mAnYScpqM\",
        \"to_coin\": \"RVN\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success)

```json
{
  "result":"RN3StWykhsERZaFjwmn9L9E5u2dPAt3YTS"
}
```

</collapse-text>

</div>


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (error - coin not enabled)

```json
{
  "error":"rpc:174] dispatcher_legacy:155] lp_coins:1668] Coin RVN is not activated"
}
```

</collapse-text>

</div>

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (error - input address checksum failed)

```json
{
  "error":"rpc:174] dispatcher_legacy:155] lp_coins:1665] Invalid Checksum"
}
```

</collapse-text>

</div>