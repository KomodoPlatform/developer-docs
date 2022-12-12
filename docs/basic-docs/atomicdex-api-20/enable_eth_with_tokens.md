# enable_eth_with_tokens

The AtomicDEX-API supports ETH(Ethereum) and many other EVM type platform coins like AVAX(Avalanche), BNB(Binance), FTM(Fantom), MATIC(Polygon), ONE(Harmony), ETH-ARB20(Arbitrum) . Additionally, it supports ERC20 tokens on the ETH chain and associated ERC20 like tokens on the rest of the platform coin chains. Using this method, you can enable a platform coin along with multiple ERC20 like tokens of the platform coin chain in a single command.

| parameter              | Type                                                       | Description                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticker                 | string                                                     | Ticker of the platform protocol coin. Options: `ETH`, `AVAX`, `BNB`, `FTM`, `MATIC`, `ONE`, `ETH-ARB20`                                                                                                                                                                                                                                         |
| gas_station_url        | string (optional for ETH/ERC20 and other gas model chains) | url of [ETH gas station API](https://docs.ethgasstation.info/); The AtomicDEX API uses [eth_gasPrice RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice) by default; when this parameter is set, the AtomicDEX API will request the current gas price from Station for new transactions, and this often results in lower fees |
| swap_contract_address  | string (required for QRC20 only)                           | address of etomic swap smart contract                                                                                                                                                                                                                                                                                                           |
| fallback_swap_contract | string (required for QRC20 only)                           | address of backup etomic swap smart contract                                                                                                                                                                                                                                                                                                    |
| nodes                  | array of objects                                           | objects describing each of the nodes to connect to                                                                                                                                                                                                                                                                                              |
| nodes.url              | string                                                     | url of a node                                                                                                                                                                                                                                                                                                                                   |

## Example

```bash
curl --url "http://127.0.0.1:7783" --data '{
  "userpass":"'$userpass'",
  "method":"enable_eth_with_tokens",
  "mmrpc":"2.0",
  "params":{
    "ticker":"ETH",
    "gas_station_url":"https://ethgasstation.info/json/ethgasAPI.json",
    "swap_contract_address":"0x24ABE4c71FC658C91313b6552cd40cD808b3Ea80",
    "fallback_swap_contract":"0x8500AFc0bc5214728082163326C2FF0C73f4a871",
    "nodes":[
      {
          "url":"http://eth1.cipig.net:8555"
      },
      {
          "url":"http://eth2.cipig.net:8555"
      },
      {
          "url":"http://eth3.cipig.net:8555"
      }
    ],
    "tx_history":true,
    "erc20_tokens_requests":[
      {
        "ticker":"APE-ERC20",
        "required_confirmations": 4
      },
      {
        "ticker":"BCH-ERC20",
        "required_confirmations": 4
      },
      {
        "ticker":"MINDS-ERC20",
        "required_confirmations": 4
      },
      {
        "ticker":"BUSD-ERC20",
        "required_confirmations": 4
      }
    ],
    "required_confirmations":5,
    "requires_notarization":false
  }
}'
```

## Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "current_block": 16145371,
    "eth_addresses_infos": {
      "0x0d317904AF3BA3A993d557b6cba147FEA4DeB57E": {
        "derivation_method": { "type": "Iguana" },
        "pubkey": "042e6e6b1ca76a7cd1fd2e1ed13bdc83909ad17b17748781308abe55caf863bec6dac19a0ead812d54c8c07508e2f30a258628832c1337f4fdd423a879f67bc823",
        "balances": { "spendable": "0", "unspendable": "0" }
      }
    },
    "erc20_addresses_infos": {
      "0x0d317904AF3BA3A993d557b6cba147FEA4DeB57E": {
        "derivation_method": { "type": "Iguana" },
        "pubkey": "042e6e6b1ca76a7cd1fd2e1ed13bdc83909ad17b17748781308abe55caf863bec6dac19a0ead812d54c8c07508e2f30a258628832c1337f4fdd423a879f67bc823",
        "balances": {
          "MINDS-ERC20": { "spendable": "0", "unspendable": "0" },
          "APE-ERC20": { "spendable": "0", "unspendable": "0" },
          "BUSD-ERC20": { "spendable": "0", "unspendable": "0" },
          "BCH-ERC20": { "spendable": "0", "unspendable": "0" }
        }
      }
    }
  },
  "id": null
}
```
