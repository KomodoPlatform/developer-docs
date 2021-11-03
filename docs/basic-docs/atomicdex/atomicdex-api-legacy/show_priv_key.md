# show\_priv\_key

**show_priv_key coin**

The `show_priv_key` method returns the private key of the specified `coin` in a format compatible with `coin` wallets.
The output can be used for the `importprivkey` method (UTXO coins) or as a private key for MyEtherWallet (ETH/ERC20).

#### Arguments

| Structure | Type   | Description                                     |
| --------- | ------ | --------------------------------------------    |
| coin      | string | the name of the coin of the private key to show |

#### Response

| Structure       | Type             | Description                                                                                                                                                                                                                                              |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin            | string           | the name of the coin                                                                                                                                                                                                                                     |
| priv_key        | string           | the private key of the coin                                                                                                                                                                                                                              |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"show_priv_key\",\"coin\":\"HELLOWORLD\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (UTXO WIF)

```json
{
  "coin": "HELLOWORLD",
  "priv_key": "UvCjJf4dKSs2vFGVtCnUTAhR5FTZGdg43DDRa9s7s5DV1sSDX14g"
}
```

#### Response (0x-prefixed ETH private key)

```json
{
  "coin": "ETH",
  "priv_key": "0xb8c774f071de08c7fd8f62b97f1a5726f6ce9f1bcf141b70b86689254ed6714e"
}
```

</collapse-text>

</div>
