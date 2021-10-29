
## my\_balance

**my_balance coin**

The `my_balance` method returns the current balance of the specified `coin`.

#### Arguments

| Structure | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| coin      | string | the name of the coin to retrieve the balance |

#### Response

| Structure           | Type             | Description                                                                                   |
| ------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| address             | string           | the address that holds the coins                                                              |
| balance             | string (numeric) | the number of coins in the address; does not include `unspendable_balance`                    |
| unspendable_balance | string (numeric) | the `coin` balance that is unspendable at the moment (e.g. if the address has immature UTXOs) |
| coin                | string           | the name of the coin                                                                          |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_balance\",\"coin\":\"HELLOWORLD\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "address": "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
  "balance": "60.00253836",
  "unspendable_balance": "0.1",
  "coin": "HELLOWORLD"
}
```

</collapse-text>

</div>
