# Contract Module: Heir

## Introduction

The Heir CryptoConditions (CC) module allows cryptocurrency funds to be passed on as an inheritance.

The module functions by the means of a special `1of2` CC address. In this type of address there are two private keys that are capable of spending funds from the address. However, only the first private key may spend funds by default.

This first private key belongs to the owner of the `1of2` CC address. The owner may use this key to freely spend funds and also to add more funds to the address.

Should the owner fail to interact with the `1of2` CC address for a specified period of time (`inactivitytime`), the address automatically unlocks to the second key. This second key is owned by the heir. Once unlocked, both the creator and the heir may freely spend funds from the address.

The [heiradd](../cryptoconditions/cc-heir.html#heiradd) method allows anyone, including users who are neither the owner nor the heir, to add funds to the address. These additions are considered donations and they do not affect the `inactivitytime` calculations that can unlock the funds for the heir. The `heiradd` method warns the user that they are making a donation if the method detects that the user is neither the owner nor the heir.

The Heir CC module accepts both coins and tokens. These can be the base coin of the asset chain, on-chain tokens created via the [Tokens](../cryptoconditions/cc-tokens.html) CC module that represent on-chain assets, or even tokens that are formed via the [Gateways](../cryptoconditions/cc-gateways.html) module to represent off-chain assets or other cryptocurrencies.

#### Heir CC Module Flow

- Anyone can create a new Heir CC address using [heirfund](../cryptoconditions/cc-heir.html#heirfund)
- The owner of this address can add more funds using [heiradd](../cryptoconditions/cc-heir.html#heiradd)
- Any other user, including the heir, can add donations using [heiradd](../cryptoconditions/cc-heir.html#heiradd)
- The owner can claim funds at any time using [heirclaim](../cryptoconditions/cc-heir.html#heirclaim)
- Once `inactivitytime` period is reached, the heir can also claim funds using [heirclaim](../cryptoconditions/cc-heir.html#heirclaim)
- To retrieve the details of a particular funding plan, use [heirinfo](../cryptoconditions/cc-heir.html#heirinfo)
- To retrieve a list of all funding plans on the asset chain, use [heirlist](../cryptoconditions/cc-heir.html#heirlist)
- To output Heir CC addresses, use [heiraddress](../cryptoconditions/cc-heir.html#heiraddress)

<!--The image below needs to be adjusted via @808 before it can be added to the live site:

![sequence diagram of this CC](/heirCC-with-labels.png)

-->

::: warning
If an owner of an Heir CC address seeking to add funds to their account avoids the normal methods (the RPC provided) and instead manually creates a utxo contribution, this utxo will not follow the normal patterns. Specifically, if the owner manually creates a contribution utxo that derives from both the owner pubkey and also from another pubkey, this utxo will not affect the `inactivitytime` calculation. Instead of resetting the `inactivitytime`, the utxo will count only as a donation.
:::

## heirfund

**heirfund txfee amount name heirpubkey inactivitytime memo ( tokenid )**

The `heirfund` method creates a new Heir CC funding plan.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments:

| Structure      | Type               | Description                                                                                                                                      |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| txfee          | (number)           | the transaction fee in satoshis, defaults to 10000 satoshis when set to `0`                                                                      |
| amount         | (number)           | the initial funding amount, in coins or tokens (this parameter is considered to be the amount of tokens if the (tokenid) parameter is present)   |
| name           | (string)           | the name of the heir funding plan (arbitrary)                                                                                                    |
| heirpubkey     | (string)           | the heir's public key (in hexademical)                                                                                                           |
| inactivitytime | (number)           | the time (in seconds) that must pass without the owner executing an `heiradd` or `heirclaim` method, after which the address unlocks to the heir |
| memo           | (string)           | a store for arbitrary data; for example, this can hold a digital copy of a physical will or other relevant documents                             |
| tokenid        | (string, optional) | the token id in hexademical; if set, the funds contributed to this address must be of the variety specified by the tokenid                       |

::: warning

- All data for this transaction, including the memo field, must be less than or equal to 10000 bytes
- To store documents of large sizes, include a [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) in the <b>memo</b> field which links to such a document on the World Wide Web and its hash for verification.

:::

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

##### Step 1: Create a raw transaction (in coins) and get the HEX value

::: tip
The following example demonstrates Heir CC usage when utilizing coins, instead of tokens. When instead using tokens, create the tokens first with the [tokencreate](../cryptoconditions/cc-tokens.html#tokencreate) method and pass the `tokenid` as the last parameter of [heirfund.](../cryptoconditions/cc-heir.html#heirfund)
:::

```bash
./komodo-cli -ac_name=HELLOWORLD heirfund 0 5 MyDogHeir 037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f9299 100 'http://billionaire.com/mywill md5=5385639869'
```

Response from Step 1:

```json
{
  "result": "success",
  "hex": "0400008085202f8902bbc0db728486b88284ac9fc4580a32869009f0ceabc659c5929d1ca5fac0a9a1010000006a47304402202e9e6a63905789547c35d3be0d0c6e022d954ba55efede20b81334e805a6e31902201a72890bfa4fff37ddf9c87c9cb567d70e89b35a82709ea14332481c860a91c10121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562effffffffdbc39ae947682e4c3c835d9326fc32a6f7e64dde869a93c9b17a9c97f5b4aeb5010000006a473044022001b04d40674eb7f309dc17ccd822a6362ade310eb37024303a110731870ccb2702204fd975db4a21995487fac94f49da90901a0c3047ac1a22cf161cacff2a256ab80121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562effffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000302ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cc00634a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0950b54020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000886a4c85ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d3533383536333938363900000000570000000000000000000000000000"
}
```

##### Step 2: Broadcast raw transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f8902bbc0db728486b88284ac9fc4580a32869009f0ceabc659c5929d1ca5fac0a9a1010000006a47304402202e9e6a63905789547c35d3be0d0c6e022d954ba55efede20b81334e805a6e31902201a72890bfa4fff37ddf9c87c9cb567d70e89b35a82709ea14332481c860a91c10121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562effffffffdbc39ae947682e4c3c835d9326fc32a6f7e64dde869a93c9b17a9c97f5b4aeb5010000006a473044022001b04d40674eb7f309dc17ccd822a6362ade310eb37024303a110731870ccb2702204fd975db4a21995487fac94f49da90901a0c3047ac1a22cf161cacff2a256ab80121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562effffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000302ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cc00634a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0950b54020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000886a4c85ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d3533383536333938363900000000570000000000000000000000000000
```

Response from Step 2:

```bash
b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0
```

This transaction id is the funding transaction id of this Heir CC plan. Copy and save this to a safe location.

Wait until the transaction is confirmed.

##### Step 3: Decode the raw transaction to ensure the values are sane (optional)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 0400008085202f8902d47a3327514aedd15ba54f8a7a46cf47f54abc7af8ab816afae87c1b5db683420100000049483045022100a363ff9049cb6178bd0f328f4b99daf4e9ea4135a1a9cc95dc06423807d7fa2b0220402e51e3ca9db0377b3a4975aacc59b7249ee9154c95a0a3500c101ca6ccc68301fffffffffc9f94352e0215037cced1d2b888687afa841310e4451bb0f97dd3303704d8d90200000049483045022100deee8e926637e91cec15d695f6b2a178ef74a3f50c9a31dd2d64f045087e46f5022049e19c838249e1ae9945cac652b3bbb10c05071e3aaab0771f7d75815135a46901ffffffff040065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000302ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cce4a79216000000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000886a4c85ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d3533383536333938363900000000e60000000000000000000000000000
```

Response:

```json
{
  "txid": "b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0",
  "overwintered": true,
  "version": 4,
  "versiongroupid": "892f2085",
  "locktime": 0,
  "expiryheight": 87,
  "vin": [
    {
      "txid": "a1a9c0faa51c9d92c559c6abcef0099086320a58c49fac8482b8868472dbc0bb",
      "vout": 1,
      "scriptSig": {
        "asm": "304402202e9e6a63905789547c35d3be0d0c6e022d954ba55efede20b81334e805a6e31902201a72890bfa4fff37ddf9c87c9cb567d70e89b35a82709ea14332481c860a91c1[ALL] 036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e",
        "hex": "47304402202e9e6a63905789547c35d3be0d0c6e022d954ba55efede20b81334e805a6e31902201a72890bfa4fff37ddf9c87c9cb567d70e89b35a82709ea14332481c860a91c10121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e"
      },
      "sequence": 4294967295
    },
    {
      "txid": "b5aeb4f5979c7ab1c9939a86de4de6f7a632fc26935d833c4c2e6847e99ac3db",
      "vout": 1,
      "scriptSig": {
        "asm": "3044022001b04d40674eb7f309dc17ccd822a6362ade310eb37024303a110731870ccb2702204fd975db4a21995487fac94f49da90901a0c3047ac1a22cf161cacff2a256ab8[ALL] 036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e",
        "hex": "473044022001b04d40674eb7f309dc17ccd822a6362ade310eb37024303a110731870ccb2702204fd975db4a21995487fac94f49da90901a0c3047ac1a22cf161cacff2a256ab80121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 5.0,
      "valueZat": 500000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RL4bWeVxLen2np68Uxp7eNHRVqquwzSPHV"]
      }
    },
    {
      "value": 0.0001,
      "valueZat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "a22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RDVHcSekmXgeYBqRupNTmqo3Rn8QRXNduy"]
      }
    },
    {
      "value": 195.0,
      "valueZat": 19500000000,
      "n": 2,
      "scriptPubKey": {
        "asm": "036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e OP_CHECKSIG",
        "hex": "21036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b"]
      }
    },
    {
      "value": 99.9998,
      "valueZat": 9999980000,
      "n": 3,
      "scriptPubKey": {
        "asm": "036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e OP_CHECKSIG",
        "hex": "21036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b"]
      }
    },
    {
      "value": 0.0,
      "valueZat": 0,
      "n": 4,
      "scriptPubKey": {
        "asm": "OP_RETURN ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d35333835363339383639",
        "hex": "6a4c85ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d35333835363339383639",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": [],
  "valueBalance": 0.0,
  "vShieldedSpend": [],
  "vShieldedOutput": []
}
```

## heiradd

**heiradd txfee amount fundingtxid**

The `heiradd` method adds more funds to the Heir CC plan.

When the owner uses the `heiradd` method the `inactivitytime` calculations are reset, thus renewing the owner's sole access to the funds.

When anyone other than the owner uses the `heiradd` method to add funds, these funds are considered to be donations and won't affect the calculation of the elapsed `inactivitytime`. The method also sends a warning to the contributor to ensure they agree to submit the given funds as a donation.

For each transaction using `heiradd`, the funds may be sent either from the owner's pubkey, or from a non-owner's pubkey. Funds cannot be sent from both owner and non-owner pubkeys at the same time. This can cause confusion for the owner if the funds available in their wallet are held partially in the owner's declared pubkey for this Heir CC account, and partially in other pubkeys. Therefore, the owner should ensure that all funds they desire to add to the account are within their declared Heir CC pubkey before attempting to use `heiradd`.

::: tip
Use the [<b>heirlist</b>](../cryptoconditions/cc-heir.html#heirlist) method to find a <b>fundingtxid</b>.
:::

### Arguments:

| Structure   | Type     | Description                                                                                                                                                                                  |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| txfee       | (number) | the transaction fee (in satoshis); when set to `0`, the default value is 10000 satoshis                                                                                                      |
| amount      | (number) | the amount of funds to be added; this amount will be withdrawn from the contributor's coins or tokens, as determined by the `tokenid` parameter used when the `heirfund` method was executed |
| fundingtxid | (string) | the transaction id returned from the original [heirfund](../cryptoconditions/cc-heir.html#heirfund) transaction                                                                              |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

##### Step 1: Create a raw transaction (in coins) and get the HEX value

```bash
./komodo-cli -ac_name=HELLOWORLD heiradd 0 5 b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0
```

Response:

```json
{
  "result": "success",
  "hex": "0400008085202f8902f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80200000049483045022100a37d7b5929af0928f1dad10ddd686a8e2e47503c96ba5485e982c72d6fb3dfb00220304b039011774652f89eb3e7b6bf187e441ed4a82339623d5d8f058816e2f43a01fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80300000049483045022100c9297262cc12d300ef068d4de7a3d8e6006b87002e4c7a5c8b262be8d87da86102203f73e991704ef492ae57550a3c3cbb57494299d5ef2b3b64b6d88a1fff36a19d01ffffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000232102f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b8ace0303e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0144a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea41b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000620000000000000000000000000000"
}
```

##### Step 2: Broadcast raw transaction

```bash
 ./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0400008085202f8902f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80200000049483045022100a37d7b5929af0928f1dad10ddd686a8e2e47503c96ba5485e982c72d6fb3dfb00220304b039011774652f89eb3e7b6bf187e441ed4a82339623d5d8f058816e2f43a01fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80300000049483045022100c9297262cc12d300ef068d4de7a3d8e6006b87002e4c7a5c8b262be8d87da86102203f73e991704ef492ae57550a3c3cbb57494299d5ef2b3b64b6d88a1fff36a19d01ffffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000232102f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b8ace0303e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0144a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea41b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000620000000000000000000000000000
```

Response:

```bash
e7b8f58539e2554a51d8438e5e58b0a12896f076e2a2850a503f372e402521b
```

##### Step 3: Decode raw transaction to ensure values are sane (optional)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 0400008085202f8902f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80200000049483045022100a37d7b5929af0928f1dad10ddd686a8e2e47503c96ba5485e982c72d6fb3dfb00220304b039011774652f89eb3e7b6bf187e441ed4a82339623d5d8f058816e2f43a01fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80300000049483045022100c9297262cc12d300ef068d4de7a3d8e6006b87002e4c7a5c8b262be8d87da86102203f73e991704ef492ae57550a3c3cbb57494299d5ef2b3b64b6d88a1fff36a19d01ffffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000232102f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b8ace0303e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0144a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea41b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000620000000000000000000000000000
```

Response:

```json
{
  "txid": "e7b8f58539e2554a51d8438e5e58b0a12896f076e2a2850a503f372e402521b3",
  "overwintered": true,
  "version": 4,
  "versiongroupid": "892f2085",
  "locktime": 0,
  "expiryheight": 98,
  "vin": [
    {
      "txid": "b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0",
      "vout": 2,
      "scriptSig": {
        "asm": "3045022100a37d7b5929af0928f1dad10ddd686a8e2e47503c96ba5485e982c72d6fb3dfb00220304b039011774652f89eb3e7b6bf187e441ed4a82339623d5d8f058816e2f43a[ALL]",
        "hex": "483045022100a37d7b5929af0928f1dad10ddd686a8e2e47503c96ba5485e982c72d6fb3dfb00220304b039011774652f89eb3e7b6bf187e441ed4a82339623d5d8f058816e2f43a01"
      },
      "sequence": 4294967295
    },
    {
      "txid": "b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0",
      "vout": 3,
      "scriptSig": {
        "asm": "3045022100c9297262cc12d300ef068d4de7a3d8e6006b87002e4c7a5c8b262be8d87da86102203f73e991704ef492ae57550a3c3cbb57494299d5ef2b3b64b6d88a1fff36a19d[ALL]",
        "hex": "483045022100c9297262cc12d300ef068d4de7a3d8e6006b87002e4c7a5c8b262be8d87da86102203f73e991704ef492ae57550a3c3cbb57494299d5ef2b3b64b6d88a1fff36a19d01"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 5.0,
      "valueZat": 500000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RL4bWeVxLen2np68Uxp7eNHRVqquwzSPHV"]
      }
    },
    {
      "value": 0.0001,
      "valueZat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "02f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b8 OP_CHECKSIG",
        "hex": "2102f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b8ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RDyrGQzYgjS9urojBjcSMPaecHpLQiLruB"]
      }
    },
    {
      "value": 94.9998,
      "valueZat": 9499980000,
      "n": 2,
      "scriptPubKey": {
        "asm": "036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e OP_CHECKSIG",
        "hex": "21036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b"]
      }
    },
    {
      "value": 194.9998,
      "valueZat": 19499980000,
      "n": 3,
      "scriptPubKey": {
        "asm": "036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e OP_CHECKSIG",
        "hex": "21036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b"]
      }
    },
    {
      "value": 0.0,
      "valueZat": 0,
      "n": 4,
      "scriptPubKey": {
        "asm": "OP_RETURN ea41b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f000",
        "hex": "6a23ea41b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f000",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": [],
  "valueBalance": 0.0,
  "vShieldedSpend": [],
  "vShieldedOutput": []
}
```

## heirclaim

**heirclaim txfee amount fundingtxid**

The `heirclaim` method allows the owner to claim funds from the plan.

After the `inactivitytime` period has elapsed, the `heirclaim` method also allows the heir to claim funds.

::: tip
Use the [<b>heirlist</b>](../cryptoconditions/cc-heir.html#heirlist) method to find a <b>fundingtxid</b>.
:::

### Arguments:

| Structure   | Type     | Description                                                                                                                                                                                  |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| txfee       | (number) | the transaction fee (in satoshis); when set to `0`, the default value is 10000 satoshis                                                                                                      |
| amount      | (number) | the amount of funds to be added; this amount will be withdrawn from the contributor's coins or tokens, as determined by the `tokenid` parameter used when the `heirfund` method was executed |
| fundingtxid | (string) | the transaction id returned from the original [heirfund](../cryptoconditions/cc-heir.html#heirfund) transaction                                                                              |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

##### Step 1 Create a raw transaction (in coins) and get the HEX value

```bash
./komodo-cli -ac_name=HELLOWORLD heirclaim 0 7 b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0
```

Response:

```json
{
  "result": "success",
  "hex": "0400008085202f8903b32125402e373f500a85a2e276f09628a1b0585e8e43d8514a55e23985f5b8e70200000049483045022100f3805c1424472626ee89e2f4c5ab4f7c310d37774604eb97860200d1dfb120d102202a0ffcc6e5c1f8893dde1ab3a67eafa554ac1af17dce14cf0580a55f5b9fdc6e01ffffffffb32125402e373f500a85a2e276f09628a1b0585e8e43d8514a55e23985f5b8e700000000a74ca5a281a1a0819ca28194a067a5658021036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e81404827886fbbd2c8d3337dabfa69e69e5af03151a00fa1c7d3b6f33b68e36974f2228bf0aac209eaa55d16e8c2cdcb9c3993590e47c3e524a29a223db7042b7fa1a129a52780201011d4a0870dff12319f1b00e9a537fb9ddda81d2bba8b0d492cc6b4e9f7b1c98103020000af038001eaa10001fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b800000000a74ca5a281a1a0819ca28194a067a5658021036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e8140bb6e5c5c6b1e3a97d99e5dd1cf8e30942069260f8a482f7004d7638b4f5a53dd4d592d4a1d099cc7c0d6b79fcaeec262606d38c56abd7d13cea0753e73a3985aa129a52780201011d4a0870dff12319f1b00e9a537fb9ddda81d2bba8b0d492cc6b4e9f7b1c98103020000af038001eaa10001ffffffff040027b929000000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac00a3e11100000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401ccd0093e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea43b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000680000000000000000000000000000"
}
```

##### Step 2: Broadcast raw transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction  0400008085202f8903b32125402e373f500a85a2e276f09628a1b0585e8e43d8514a55e23985f5b8e70200000049483045022100f3805c1424472626ee89e2f4c5ab4f7c310d37774604eb97860200d1dfb120d102202a0ffcc6e5c1f8893dde1ab3a67eafa554ac1af17dce14cf0580a55f5b9fdc6e01ffffffffb32125402e373f500a85a2e276f09628a1b0585e8e43d8514a55e23985f5b8e700000000a74ca5a281a1a0819ca28194a067a5658021036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e81404827886fbbd2c8d3337dabfa69e69e5af03151a00fa1c7d3b6f33b68e36974f2228bf0aac209eaa55d16e8c2cdcb9c3993590e47c3e524a29a223db7042b7fa1a129a52780201011d4a0870dff12319f1b00e9a537fb9ddda81d2bba8b0d492cc6b4e9f7b1c98103020000af038001eaa10001fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b800000000a74ca5a281a1a0819ca28194a067a5658021036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e8140bb6e5c5c6b1e3a97d99e5dd1cf8e30942069260f8a482f7004d7638b4f5a53dd4d592d4a1d099cc7c0d6b79fcaeec262606d38c56abd7d13cea0753e73a3985aa129a52780201011d4a0870dff12319f1b00e9a537fb9ddda81d2bba8b0d492cc6b4e9f7b1c98103020000af038001eaa10001ffffffff040027b929000000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac00a3e11100000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401ccd0093e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea43b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000680000000000000000000000000000
```

Response:

```bash
f0f7f536a261ee8e02fb592d81305b6052939a510e3e3435280b0bad454626c7
```

## heirinfo

**heirinfo fundingtxid**

The `heirinfo` method returns detailed information about the funding plan.

::: tip
Use the [<b>heirlist</b>](../cryptoconditions/cc-heir.html#heirlist) method to find a <b>fundingtxid</b>.
:::

### Arguments:

| Structure   | Type     | Description                                                                                                     |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| fundingtxid | (string) | the transaction id returned from the original [heirfund](../cryptoconditions/cc-heir.html#heirfund) transaction |

### Response:

| Structure             | Type      | Description                                                                                                                            |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| fundingtxid           | (string)  | the id of the funding plan, the txid of [heirfund](../cryptoconditions/cc-heir.html#heirfund) transaction                              |
| name                  | (string)  | the name of the heir plan                                                                                                              |
| tokenid               | (string)  | `token id`, if applicable                                                                                                              |
| owner                 | (string)  | the owner's public key                                                                                                                 |
| heir                  | (string)  | the heir's public key                                                                                                                  |
| type                  | (string)  | the type of this funding plan (coins or tokens)                                                                                        |
| lifetime              | (number)  | the total amount contributed to this plan since inception, given in the relevant currency (coins or tokens)                            |
| available             | (number)  | the amount available, given in the relevant currency (coins or tokens)                                                                 |
| OwnerRemainderTokens  | (number)  | the amount of funds remaining in the account that were contributed by the owner                                                        |
| InactivityTimeSetting | (number)  | the `inactivitytime` (in secs) that is required to elapse without owner activity before the plan is automatically unlocked to the heir |
| IsHeirSpendingAllowed | (boolean) | a boolean flag that indicates whether the heir is allowed to claim funds                                                               |
| InactivityTime        | (number)  | the owner's real inactivity time (in seconds)                                                                                          |
| memo                  | (string)  | a store for arbitrary data; for example, this can hold a digital copy of a physical will or other relevant documents                   |
| result:               | (string)  | whether the command succeeded                                                                                                          |

#### :pushpin: Example:

```bash
./komodo-cli -ac_name=HELLOWORLD heirinfo b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0
```

Response:

```json
{
  "fundingtxid": "b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0",
  "name": "MyDogHeir",
  "owner": "036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e",
  "heir": "037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f9299",
  "type": "coins",
  "lifetime": "0.00000000",
  "available": "0.00000000",
  "InactivityTimeSetting": "100",
  "IsHeirSpendingAllowed": "true",
  "memo": "http://billionaire.com/mywill md5=5385639869",
  "result": "success"
}
```

## heirlist

**heirlist**

The `heirlist` method outputs a list of all available `fundingtxid`'s on the asset chain.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    | ---- | ----        |

### Response:

| Structure   | Type               | Description                                                |
| ----------- | ------------------ | ---------------------------------------------------------- |
| fundingtxid | (array of strings) | an array containing all `fundingtxid`'s on the asset chain |

#### :pushpin: Example:

```bash
./komodo-cli -ac_name=HELLOWORLD heirlist
```

Response:

```bash
[
  "b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0"
]
```

## heiraddress

**heiraddress pubkey**

The `heiraddress` method shows the owner's addresses and balances for the Heir CC plan.

::: warning

- The functionality of this method is only applicable when executed on a daemon that was launched using the pubkey of the owner of the relevant Heir CC plan. For all other daemons, the method is available, but has no functional purpose.
- The argument of this method is the **heir's** pubkey.

:::

### Arguments:

| Structure | Type     | Description                        |
| --------- | -------- | ---------------------------------- |
| pubkey    | (string) | the heir's pubkey (in hexademical) |

### Response:

| Structure                 | Type     | Description                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result                    | (string) | whether the method executed successfully                                                                                                                                                                                                                                                                                                                         |
| HeirCCaddress             | (string) | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey                                                                                                                                                                                                                                             |
| CCbalance                 | (number) | the unspent amount in the HeirCCaddress                                                                                                                                                                                                                                                                                                                          |
| HeirNormalAddress         | (string) | the unmodified normal public address generated from the contract's privkey, used for markers                                                                                                                                                                                                                                                                     |
| HeirCC`1of2`Address       | (string) | the address for storing funds in **coins** spendable by either the owner or the heir (funds address)                                                                                                                                                                                                                                                             |
| HeirCC`1of2`TokensAddress | (string) | the address for storing funds in **tokens** spendable by either the owner or the heir (token funds address)                                                                                                                                                                                                                                                      |
| myCCaddress(Heir)         | (string) | taking the contract's EVAL code as a modifier, this is the CC address from the pubkey of the **heir**                                                                                                                                                                                                                                                            |
| myaddress                 | (string) | the unmodified normal public address of the pubkey [used to launch the daemon.](../cryptoconditions/cryptoconditions-instructions.html#creating-and-launching-with-a-pubkey) This is the normal address used to withdraw funds in coins from from HeirCC`1of2`Address. This property is applicable to any user who wants to use the Heir CC plan (owner or heir) |
| mybalance                 | (number) | the balance of myaddress in coins                                                                                                                                                                                                                                                                                                                                |
| MyTokenAddress            | (string) | the user's address to withdraw funds in tokens from HeirCC`1of2`TokensAddress (in development)                                                                                                                                                                                                                                                                   |

#### :pushpin: Example:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD heiraddress 036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e
```

Response:

```json
{
  "result": "success",
  "HeirCCAddress": "RDVHcSekmXgeYBqRupNTmqo3Rn8QRXNduy",
  "CCbalance": 0.0001,
  "HeirNormalAddress": "RTPwUjKYECcGn6Y4KYChLhgaht1RSU4jwf",
  "HeirCC`1of2`Address": "RCiaNQq9yVb5biyEy8xWrAJCjjvQ9oW8rn",
  "HeirCC`1of2`TokensAddress": "RGKHD8UaTU2avj6LdmuSgpuaukk6XY4fss",
  "myAddress": "REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b",
  "myCCAddress(Heir)": "RTF9g6SRzbgZXTT7arGZrmTeNKuLoGYyZA",
  "PubkeyCCaddress(Heir)": "RTF9g6SRzbgZXTT7arGZrmTeNKuLoGYyZA",
  "myCCaddress": "RTF9g6SRzbgZXTT7arGZrmTeNKuLoGYyZA",
  "myCCbalance": 0.0,
  "myaddress": "REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b",
  "mybalance": 296.9995
}
```
