# API

## broadcast

**broadcast hex**

Use this method to broadcast a hex returned by the [spend](#spend) method.

#### Arguments

| Name | Type     | Description                   |
| ---- | -------- | ----------------------------- |
| hex  | (string) | the transaction in hex format |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## getinfo

**getinfo [hdrheight]**

#### Arguments

| Name      | Type               | Description                                                                |
| --------- | ------------------ | -------------------------------------------------------------------------- |
| hdrheight | (number, optional) | supplies the height of the blockchain at which the header data is required |

#### Response

| Name                    | Type     | Description                                                                                                                                 |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| result                  | (string) | whether the command was successful                                                                                                          |
| nSPV                    | (string) | the mode of nSPV                                                                                                                            |
| address                 | (string) | the address corresponding to the wifkey                                                                                                     |
| pubkey                  | (string) | the pubkey corresponding to the wifkey                                                                                                      |
| wifexpires              | (string) | the time in seconds till the login expires                                                                                                  |
| height                  | (number) | the current height of the blockchain                                                                                                        |
| chaintip                | (string) | the blockhash of the last block                                                                                                             |
| notarization            | (json)   | a json containing the notarization details                                                                                                  |
| notarized_height        | (number) | the height of the latest block that has been notarized                                                                                      |
| notarized_blockhash     | (string) | the blockhash of the latest block that has been notarized                                                                                   |
| notarization_txid       | (string) | the id of the transaction in which the notarization data is included in the chain being dPoW'ed                                             |
| notarization_txidheight | (number) | the height of the block in which the notarization transaction is included                                                                   |
| notarization_desttxid   | (string) | the id of the transaction in which the notarization data is included in the chain acting as the data store                                  |
| header                  | (string) | a json containing the details of the header (of the current block by default / block of height specified by `hdrheight` if it is specified) |
| height                  | (number) | the height of the block that has been queried                                                                                               |
| blockhash               | (string) | the blockhash of the block that has been queried                                                                                            |
| hashPrevBlock           | (string) | the blockhash of the block before the block that has been queried                                                                           |
| hashMerkleRoot          | (string) | the merkleroot of the block that has been queried                                                                                           |
| nTime                   | (number) | a timestamp recording when this block was created                                                                                           |
| nBits                   | (number) | the calculated difficulty target being used for this block                                                                                  |
| lastpeer                | (string) | the last known peer                                                                                                                         |

#### :pushpin: Examples

Command:

```bash
curl --url "http://127.0.0.1:$port" --data "{\"userpass\":\"$userpass\",\"method\":\"getinfo\"}"
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "nSPV": "superlite",
  "address": "RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb",
  "pubkey": "0217a6aa6c0fe017f9e469c3c00de5b3aa164ca410e632d1c04169fd7040e20e06",
  "height": 1456694,
  "chaintip": "000000008b4a3386489d1438ddc1220652942c95053f2c95c72c6868af215c8a",
  "notarization": {
    "notarized_height": 1456680,
    "notarized_blockhash": "00000000a651e00fa2a71c47511be85ef87e83d5715be3a17ed943b141cdd4d9",
    "notarization_txid": "e82367899ee7a5cb65dabe058cd7369392564f83834c8f1f81a21958da5d241c",
    "notarization_txidheight": 1456693,
    "notarization_desttxid": "1d152621a96c9b249ad8a783651ac827672d10c56fe24cee03ce188d06b3c6f5"
  },
  "header": {
    "height": 1456694,
    "blockhash": "000000008b4a3386489d1438ddc1220652942c95053f2c95c72c6868af215c8a",
    "hashPrevBlock": "01a724e7686a4dce74884ebd8bd869c855d1a71afc80c906830acfa1d14811cd",
    "hashMerkleRoot": "8ea989e47aa590fbabf19b5a7dbace61f32be3c51c558b991f7718b27eaa6b98",
    "nTime": 1563969053,
    "nBits": 486610300
  },
  "lastpeer": "nodeid.1"
}
```

</collapse-text>

## hdrsproof

**hdrsproof prevheight nextheight**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## listtransactions

**listtransactions [address [isCC [skipcount]]]**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## listunspent

**listunspent [address [isCC [skipcount]]]**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## login

**login wif**

#### Arguments

| Name | Type     | Description                                         |
| ---- | -------- | --------------------------------------------------- |
| wif  | (string) | the wifkey (wallet import format of the privatekey) |

#### Response

| Name       | Type      | Description                                                                 |
| ---------- | --------- | --------------------------------------------------------------------------- |
| result     | (string)  | whether the command was successful                                          |
| status     | (string)  | the time till the expiry of the login                                       |
| address    | (string)  | the address corresponding to the wifkey                                     |
| pubkey     | (string)  | the pubkey corresponding to the wifkey                                      |
| wifprefix  | (number)  | the prefix of the wifkey (indicates the netwok the wifkey is to be used on) |
| compressed | (boolean) | indicates whether the wifkey is compressed                                  |

#### :pushpin: Examples

Command:

```bash
curl --url "http://127.0.0.1:$port" --data "{\"userpass\":\"$userpass\",\"method\":\"login\",\"wif\":\"Uxxxxxxxxxxxxxxxxxxx\"}"
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "status": "wif will expire in 777 seconds",
  "address": "Rxxxxxxxxxxxxxxxxxxx",
  "pubkey": "03xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "wifprefix": 188,
  "compressed": 1
}
```

</collapse-text>

## logout

**logout**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## mempool

**mempool func(0 all, 1 address recv, 2 txid/vout spent, 3 txid inmempool) address isCC [txid vout]]]**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## notarizations

**notarizations height**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## spend

**spend address amount**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## spentinfo

**spentinfo txid vout**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>

## txproof

**txproof txid height**

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
|      |      |             |

#### :pushpin: Examples

Command:

```bash

```

<collapse-text hidden title="Response">

```json

```

</collapse-text>
