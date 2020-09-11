# How to update the coins file to work with the latest atomicDEX-API

## Instructions

- Compile the latest `mm2` binary following [these instructions](../atomicdex-setup/get-started-atomicdex.html)
- Place the `coins` file in the old format in the same directory as the compiled `mm2` binary
- Open a terminal and navigate to the directory with both the files
- Run the following command `./mm2 update_config coins coins_new`

::: tip Note

`mm2` can accept any valid paths as the arguments for the source and destination files

:::

- Output similar to the following will be shown. The "Success" message indicates that the conversion was successful

```bash
03 09:13:56, mm2:169] AtomicDEX MarketMaker f48b4ad DT 2020-07-28T17:25:18+07:00
Success
```

- You will find a new file named `coins_new` in the same directory with the new format expected by AtomicDEX
- Rename the file named `coins` to `coins_old` and then `coins_new` to `coins`
- `mm2` will use the `coins` file in the new format the next time it is launched

## Examples

### UTXO coin

#### Old Format

```json
{
  "coin":"KMD",
  "name":"komodo",
  "fname":"Komodo",
  "rpcport":7771,
  "pubtype":60,
  "p2shtype":85,
  "wiftype":188,
  "txversion":4,
  "overwintered":1,
  "txfee":1000,
  "mm2":1,
  "required_confirmations":2,
  "requires_notarization":true
}
```

#### New Format

```json
{
  "coin":"KMD",
  "name":"komodo",
  "fname":"Komodo",
  "rpcport":7771,
  "pubtype":60,
  "p2shtype":85,
  "wiftype":188,
  "txversion":4,
  "overwintered":1,
  "txfee":1000,
  "mm2":1,
  "required_confirmations":2,
  "requires_notarization":true,
  "protocol":{
    "type":"UTXO"
  }
}
```

### ERC20 Token

#### Old Format

```json
{
  "coin":"MKR",
  "name":"maker",
  "fname":"Maker",
  "etomic":"0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
  "rpcport":80,
  "mm2":1,
  "required_confirmations":3
}
```

#### New Format

```json
{
  "coin":"MKR",
  "name":"maker",
  "fname":"Maker",
  "required_confirmations":3,
  "rpcport":80,
  "mm2":1,
  "protocol":{
    "type":"ERC20",
    "protocol_data":{
      "platform":"ETH",
      "contract_address":"0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
    }
  }
}
```
