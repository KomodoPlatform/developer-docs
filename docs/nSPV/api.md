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
