
## convertaddress

**convertaddress coin from to_address_format**

The `convertaddress` method converts an input address to a specified address format.

For example, this method can be used to convert a BCH address from legacy to cash address format and vice versa.

Or this can be used to convert an ETH address from single to mixed case checksum format.

#### Arguments

| Structure                 | Type          | Description                                                                                                                                                 |
| -----------------         | ------        | -------------------------------------------------------------                                                                                               |
| coin                      | string        | the name of the coin address context                                                                                                                        |
| from                      | string        | input address                                                                                                                                               |
| to_address_format         | object        | address format to which the input address should be converted                                                                                               |
| to_address_format.format  | string (enum) | address format to which the input address should be converted, possible values: `mixedcase` for ETH/ERC20 coins; `cashaddress` or `standard` for UTXO coins |
| to_address_format.network | string (enum) | network prefix for `cashaddress` format. Possible values: `bitcoincash` for BCH mainnet; `bchtest` for BCH testnet; `bchreg` for BCH regtest                |

#### Response

| Structure               | Type             | Description                                                                      |
| ----------------------- | ---------------- | -------------------------------------------------------------------------------- |
| result.address          | string           | the result of address conversion                                                 |

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Examples">

#### :pushpin: Examples

#### Command (ETH single case address to mixed checksum)

```bash  
curl --url "http://127.0.0.1:7783/" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"convertaddress\",
  \"coin\":\"ETH\",
  \"from\":\"0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359\",
  \"to_address_format\":{
    \"format\":\"mixedcase\"
  }
}"
```

#### Response

```json
{
  "result":{
    "address":"0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"
  }
}
```

#### Command (BCH legacy to cash address)

```bash
curl --url "http://127.0.0.1:7783/" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"convertaddress\",
  \"coin\":\"BCH\",
  \"from\":\"1DmFp16U73RrVZtYUbo2Ectt8mAnYScpqM\",
  \"to_address_format\":{
    \"format\":\"cashaddress\",
    \"network\":\"bitcoincash\"
  }
}"
```

#### Response

```json
{
  "result":{
    "address":"bitcoincash:qzxqqt9lh4feptf0mplnk58gnajfepzwcq9f2rxk55"
  }
}
```

#### Command (BCH cash address to legacy)

```bash
curl --url "http://127.0.0.1:7783/" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"convertaddress\",
  \"coin\":\"BCH\",
  \"from\":\"bitcoincash:qzxqqt9lh4feptf0mplnk58gnajfepzwcq9f2rxk55\",
  \"to_address_format\":{
    \"format\":\"standard\"
  }
}"
```

#### Response:

```json
{
  "result":{
    "address":"1DmFp16U73RrVZtYUbo2Ectt8mAnYScpqM"
  }
}
```

#### Command (Qtum wallet address to QRC20 contract address)

```bash
curl --url "http://127.0.0.1:7783/" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"convertaddress\",
  \"coin\":\"QRC20\",
  \"from\":\"qKVvtDqpnFGDxsDzck5jmLwdnD2jRH6aM8\",
  \"to_address_format\":{
    \"format\":\"contract\"
  }
}"
```

#### Response

```json
{
  "result":{
    "address":"0x1549128bbfb33b997949b4105b6a6371c998e212"
  }
}
```

#### Command (QRC20 contract address to Qtum wallet address)

```bash
curl --url "http://127.0.0.1:7783/" --data "{
  \"userpass\":\"$userpass\",
  \"method\":\"convertaddress\",
  \"coin\":\"QRC20\",
  \"from\":\"0x1549128bbfb33b997949b4105b6a6371c998e212\",
  \"to_address_format\":{
    \"format\":\"wallet\"
  }
}"
```

#### Response

```json
{
  "result":{
    "address":"qKVvtDqpnFGDxsDzck5jmLwdnD2jRH6aM8"
  }
}
```

</collapse-text>

</div>

