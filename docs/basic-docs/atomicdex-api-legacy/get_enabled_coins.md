# get\_enabled\_coins

**get_enabled_coins**

The `get_enabled_coins` method returns data of coins that are currently enabled on the user's AtomicDEX API node.

#### Arguments

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |             |

#### Response

| Structure      | Type             | Description                            |
| -------------- | ---------------- | -------------------------------------- |
| result         | array of objects | tickers and addresses of enabled coins |
| result.address | string           | the user's address for this coin       |
| result.ticker  | string           | the ticker name of this coin           |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"get_enabled_coins\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "result": [
    {
      "address": "1WxswvLF2HdaDr4k77e92VjaXuPQA8Uji",
      "ticker": "BTC"
    },
    {
      "address": "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
      "ticker": "PIZZA"
    },
    {
      "address": "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
      "ticker": "BEER"
    },
    {
      "address": "0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29",
      "ticker": "ETH"
    },
    {
      "address": "R9o9xTocqr6CeEDGDH6mEYpwLoMz6jNjMW",
      "ticker": "ETOMIC"
    },
    {
      "address": "0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29",
      "ticker": "DEC8"
    },
    {
      "address": "0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29",
      "ticker": "BAT"
    }
  ]
}
```

</collapse-text>

</div>
