# Contract Module: Heir

The Heir module allows users to setup crypto inheritance. It uses a special `1of2` CC address, that is, one key of two is able to spend funds. This `1of2` address is funded and freely spendable by the creator of the fund (owner). The owner may also add additional funds to the `1of2` address at anytime.

The heir is allowed to claim the funds only after an `inactivity time` specified by the owner of the fund has passed. This means that if the owner address doesn't spend any funds for the specified `inactivity time` period, then it is time to allow the heir to claim funds from that `1of2` address. After the inactivity time has passed, both the heir and owner may freely claim available funds. This is achieved by setting a special flag in the first `heirclaim` transaction done by the heir, which signals that spending is allowed for the heir from now on, whether the owner adds more funds or spends them hereafter.

Heir contract supports funding both in coins (The base coin of the chain) and tokens (On-chain assets created using the [Tokens](../cryptoconditions/cc-tokens.html) module. These can even be other CryptoCurrencies that have been brought onto this chain through the [Gateways](../cryptoconditions/cc-gateways.html) module).

The `heiradd` rpc call allows anyone to add funds to the funding plan (even from non-owner uxtos). Those additions will be considered as donations and will not be counted in calculation of the `inactivity time` period that is required to elapse before the heir is allowed to spend funds.

The `heiradd` rpc call warns the user that he is making a donation to the fund if he is neither the **owner** nor the **heir**.

The `heiradd` rpc call doesn't allow addition of funds from both owner and non-owner inputs in a single transaction.

::: warning
If the owner manages to create a funding transaction manually using outputs belonging to the owner pubkey and another pubkey, then this transaction is considered as a donation and won't affect the calculation of `inactive-time` period.
:::

The flow of Heir cc plan is as follows:

- Anyone can create a new plan using [heirfund](../cryptoconditions/cc-heir.html#heirfund)
- Owner can add more funds or any other user can add donations to the funding plan using [heiradd](../cryptoconditions/cc-heir.html#heiradd)
- Owner or Heir (Once `inactivity time` period is reached) can claim funds using [heirclaim](../cryptoconditions/cc-heir.html#heirclaim)
- To get details of a particular funding plan, use [heirinfo](../cryptoconditions/cc-heir.html#heirinfo)
- To get list of all funding plans, use [heirlist](../cryptoconditions/cc-heir.html#heirlist)
- To output heir cc addresses, use [heiraddress](../cryptoconditions/cc-heir.html#heiraddress)

## heirfund

**heirfund txfee amount name heirpubkey inactivitytime memo [tokenid]**

The `heirfund` method creates a new heir funding plan.

The method returns a hex value which must then be broadcast using the [`sendrawtransaction`](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments:

| Structure      | Type               | Description                                                                                                                                                                                                                                                                                                          |
| -------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| txfee          | (number)           | transaction fee in sat, defaults to 10000 sat                                                                                                                                                                                                                                                                        |
| amount         | (number)           | initial funds amount, in coins or tokens (dependent on if the tokenid parameter is present)                                                                                                                                                                                                                          |
| name           | (string)           | this heir funding plan name (arbitrary)                                                                                                                                                                                                                                                                              |
| heirpubkey     | (string)           | the heir's public key hexademical                                                                                                                                                                                                                                                                                    |
| inactivitytime | (number)           | time in seconds, as this time has passed from the last owner activity on this plan, heir is allowed to spend funds                                                                                                                                                                                                   |
| memo           | (string)           | a copy of a real world document with owner's requirements for the heir about funds (like a will). This field together with the plan's other fields is limited by 10000 bytes. To store documents of large sizes it is suggested to put into this 'memo' field a link to such document and its hash for verification. |
| tokenid        | (string, optional) | hexademical token id, if set, the funding is considered in tokens                                                                                                                                                                                                                                                    |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Step 1: Create a raw transaction (in coins) and get the HEX value

```
./komodo-cli -ac_name=TESTAC heirfund 0 5 MyDogHeir 037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f9299 100 'http://billionaire.com/mywill md5=5385639869'
```

Note: this example is for coins. For using tokens you need first to create tokens by `tokencreate` and pass the tokenid as the last param of `heirfund`

Response from Step 1:

```
{
  "result": "success",
  "hex": "0400008085202f8902bbc0db728486b88284ac9fc4580a32869009f0ceabc659c5929d1ca5fac0a9a1010000006a47304402202e9e6a63905789547c35d3be0d0c6e022d954ba55efede20b81334e805a6e31902201a72890bfa4fff37ddf9c87c9cb567d70e89b35a82709ea14332481c860a91c10121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562effffffffdbc39ae947682e4c3c835d9326fc32a6f7e64dde869a93c9b17a9c97f5b4aeb5010000006a473044022001b04d40674eb7f309dc17ccd822a6362ade310eb37024303a110731870ccb2702204fd975db4a21995487fac94f49da90901a0c3047ac1a22cf161cacff2a256ab80121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562effffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000302ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cc00634a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0950b54020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000886a4c85ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d3533383536333938363900000000570000000000000000000000000000"
}
```

Step 2: Broadcast raw transaction

```
./komodo-cli -ac_name=TESTAC sendrawtransaction   "hex": "0400008085202f8902bbc0db728486b88284ac9fc4580a32869009f0ceabc659c5929d1ca5fac0a9a1010000006a47304402202e9e6a63905789547c35d3be0d0c6e022d954ba55efede20b81334e805a6e31902201a72890bfa4fff37ddf9c87c9cb567d70e89b35a82709ea14332481c860a91c10121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562effffffffdbc39ae947682e4c3c835d9326fc32a6f7e64dde869a93c9b17a9c97f5b4aeb5010000006a473044022001b04d40674eb7f309dc17ccd822a6362ade310eb37024303a110731870ccb2702204fd975db4a21995487fac94f49da90901a0c3047ac1a22cf161cacff2a256ab80121036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562effffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000302ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cc00634a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0950b54020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000886a4c85ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d3533383536333938363900000000570000000000000000000000000000"

```

Response from Step 2:

```
b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0
```

Please, wait until the tx is confirmed

Step 3: Decode raw transaction (optional to check if the values are sane)

```
./komodo-cli -ac_name=TESTAC decoderawtransaction 0400008085202f8902d47a3327514aedd15ba54f8a7a46cf47f54abc7af8ab816afae87c1b5db683420100000049483045022100a363ff9049cb6178bd0f328f4b99daf4e9ea4135a1a9cc95dc06423807d7fa2b0220402e51e3ca9db0377b3a4975aacc59b7249ee9154c95a0a3500c101ca6ccc68301fffffffffc9f94352e0215037cced1d2b888687afa841310e4451bb0f97dd3303704d8d90200000049483045022100deee8e926637e91cec15d695f6b2a178ef74a3f50c9a31dd2d64f045087e46f5022049e19c838249e1ae9945cac652b3bbb10c05071e3aaab0771f7d75815135a46901ffffffff040065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000302ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cce4a79216000000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000886a4c85ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d3533383536333938363900000000e60000000000000000000000000000
```

Response:

```
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
      "value": 5.00000000,
      "valueZat": 500000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": [
          "RL4bWeVxLen2np68Uxp7eNHRVqquwzSPHV"
        ]
      }
    },
    {
      "value": 0.00010000,
      "valueZat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "a22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c8020286b36b233cc03c91652560f4ecf9404bcf10b61033916d67edf4a216c92cf758103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": [
          "RDVHcSekmXgeYBqRupNTmqo3Rn8QRXNduy"
        ]
      }
    },
    {
      "value": 195.00000000,
      "valueZat": 19500000000,
      "n": 2,
      "scriptPubKey": {
        "asm": "036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e OP_CHECKSIG",
        "hex": "21036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b"
        ]
      }
    },
    {
      "value": 99.99980000,
      "valueZat": 9999980000,
      "n": 3,
      "scriptPubKey": {
        "asm": "036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e OP_CHECKSIG",
        "hex": "21036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": [
          "REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b"
        ]
      }
    },
    {
      "value": 0.00000000,
      "valueZat": 0,
      "n": 4,
      "scriptPubKey": {
        "asm": "OP_RETURN ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d35333835363339383639",
        "hex": "6a4c85ea4621036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e21037736c263991316c6a23397a982a1f8c18ae8642e944448162a93a824c31f92996400000000000000094d79446f67486569722c687474703a2f2f62696c6c696f6e616972652e636f6d2f6d7977696c6c206d64353d35333835363339383639",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": [
  ],
  "valueBalance": 0.00000000,
  "vShieldedSpend": [
  ],
  "vShieldedOutput": [
  ]
}
```

## heiradd

**heiradd txfee amount fundingtxid**

The `heiradd` method adds more funds or donations to the funding plan.

### Arguments:

| Structure  | Type     | Description                                                                                                                        |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| txfee      | (number) | transaction fee in sat, defaults to 10000 sat                                                                                      |
| amount     | (number) | additional funds amount, in coins or tokens (dependent on if the tokenid parameter is present), resets inactivity time calculation |
| fundintxid | (string) | the id of the funding plan, the txid of heirfund transaction                                                                       |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Step 1

```
./komodo-cli -ac_name=TESTAC heiradd 0 5 b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0
```

Response:

```
{
  "result": "success",
  "hex": "0400008085202f8902f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80200000049483045022100a37d7b5929af0928f1dad10ddd686a8e2e47503c96ba5485e982c72d6fb3dfb00220304b039011774652f89eb3e7b6bf187e441ed4a82339623d5d8f058816e2f43a01fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80300000049483045022100c9297262cc12d300ef068d4de7a3d8e6006b87002e4c7a5c8b262be8d87da86102203f73e991704ef492ae57550a3c3cbb57494299d5ef2b3b64b6d88a1fff36a19d01ffffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000232102f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b8ace0303e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0144a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea41b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000620000000000000000000000000000"
}
```

Step 2

```
 ./komodo-cli -ac_name=TESTAC sendrawtransaction 0400008085202f8902f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80200000049483045022100a37d7b5929af0928f1dad10ddd686a8e2e47503c96ba5485e982c72d6fb3dfb00220304b039011774652f89eb3e7b6bf187e441ed4a82339623d5d8f058816e2f43a01fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b80300000049483045022100c9297262cc12d300ef068d4de7a3d8e6006b87002e4c7a5c8b262be8d87da86102203f73e991704ef492ae57550a3c3cbb57494299d5ef2b3b64b6d88a1fff36a19d01ffffffff050065cd1d00000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401cc1027000000000000232102f0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b8ace0303e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eace0144a8a040000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea41b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000620000000000000000000000000000
```

Response:

```
e7b8f58539e2554a51d8438e5e58b0a12896f076e2a2850a503f372e402521b
```

## heirclaim

**heirclaim txfee amount fundingtxid**

The `heirclaim` method allows the owner or heir to claim funds from the funding plan.

### Arguments:

| Structure  | Type     | Description                                                                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| txfee      | (number) | transaction fee in sat, defaults to 10000 sat                                                                                   |
| amount     | (number) | claimed funds amount, in coins or tokens (dependent on if the tokenid parameter is present), resets inactivity time calculation |
| fundintxid | (string) | the id of the funding plan, the txid of heirfund transaction                                                                    |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Step 1

```
./komodo-cli -ac_name=TESTAC heirclaim 0 7 b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0
```

Response:

```
{
  "result": "success",
  "hex": "0400008085202f8903b32125402e373f500a85a2e276f09628a1b0585e8e43d8514a55e23985f5b8e70200000049483045022100f3805c1424472626ee89e2f4c5ab4f7c310d37774604eb97860200d1dfb120d102202a0ffcc6e5c1f8893dde1ab3a67eafa554ac1af17dce14cf0580a55f5b9fdc6e01ffffffffb32125402e373f500a85a2e276f09628a1b0585e8e43d8514a55e23985f5b8e700000000a74ca5a281a1a0819ca28194a067a5658021036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e81404827886fbbd2c8d3337dabfa69e69e5af03151a00fa1c7d3b6f33b68e36974f2228bf0aac209eaa55d16e8c2cdcb9c3993590e47c3e524a29a223db7042b7fa1a129a52780201011d4a0870dff12319f1b00e9a537fb9ddda81d2bba8b0d492cc6b4e9f7b1c98103020000af038001eaa10001fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b800000000a74ca5a281a1a0819ca28194a067a5658021036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e8140bb6e5c5c6b1e3a97d99e5dd1cf8e30942069260f8a482f7004d7638b4f5a53dd4d592d4a1d099cc7c0d6b79fcaeec262606d38c56abd7d13cea0753e73a3985aa129a52780201011d4a0870dff12319f1b00e9a537fb9ddda81d2bba8b0d492cc6b4e9f7b1c98103020000af038001eaa10001ffffffff040027b929000000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac00a3e11100000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401ccd0093e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea43b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000680000000000000000000000000000"
}
```

Step 2

```
./komodo-cli -ac_name=TESTAC sendrawtransaction  0400008085202f8903b32125402e373f500a85a2e276f09628a1b0585e8e43d8514a55e23985f5b8e70200000049483045022100f3805c1424472626ee89e2f4c5ab4f7c310d37774604eb97860200d1dfb120d102202a0ffcc6e5c1f8893dde1ab3a67eafa554ac1af17dce14cf0580a55f5b9fdc6e01ffffffffb32125402e373f500a85a2e276f09628a1b0585e8e43d8514a55e23985f5b8e700000000a74ca5a281a1a0819ca28194a067a5658021036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e81404827886fbbd2c8d3337dabfa69e69e5af03151a00fa1c7d3b6f33b68e36974f2228bf0aac209eaa55d16e8c2cdcb9c3993590e47c3e524a29a223db7042b7fa1a129a52780201011d4a0870dff12319f1b00e9a537fb9ddda81d2bba8b0d492cc6b4e9f7b1c98103020000af038001eaa10001fffffffff0e19c37f7b97f00041baf06404980ddfeaade5aebbab3ba8f5445b546fab5b800000000a74ca5a281a1a0819ca28194a067a5658021036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e8140bb6e5c5c6b1e3a97d99e5dd1cf8e30942069260f8a482f7004d7638b4f5a53dd4d592d4a1d099cc7c0d6b79fcaeec262606d38c56abd7d13cea0753e73a3985aa129a52780201011d4a0870dff12319f1b00e9a537fb9ddda81d2bba8b0d492cc6b4e9f7b1c98103020000af038001eaa10001ffffffff040027b929000000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac00a3e11100000000302ea22c8020fa433cc47b98f7d1eed7441a529eaa6a91425abdda9b28306a9f19e5fda64ab481031210008203000401ccd0093e36020000002321036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562eac0000000000000000256a23ea43b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f00000000000680000000000000000000000000000
```

Response:

```
f0f7f536a261ee8e02fb592d81305b6052939a510e3e3435280b0bad454626c7
```

## heirinfo

**heirinfo fundingtxid**

The `heirinfo` method outputs detailed information about the funding plan.

### Arguments:

| Structure  | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| fundintxid | (string) | the id of the funding plan, the txid of heirfund transaction |

### Response:

| Structure             | Type      | Description                                                                                                                                   |
| --------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| result:               | (string)  | whether the command succeeded                                                                                                                 |
| fundingtxid           | (string)  | txid of this heir funding plan creation tx, used as a handler to it                                                                           |
| name                  | (string)  | name of this heir plan                                                                                                                        |
| tokenid               | (string)  | token id, if funding is in tokens                                                                                                             |
| owner                 | (string)  | the owner's public key                                                                                                                        |
| heir                  | (string)  | the heir's public key                                                                                                                         |
| type                  | (string)  | type of this funding plan, 'coins' or 'tokens'                                                                                                |
| lifetime              | (number)  | total lifetime funding amount for this funding plan, in coins or tokens                                                                       |
| available             | (number)  | amount available, in coins or tokens                                                                                                          |
| OwnerRemainderTokens  | (number)  | the owner's token amount remainder                                                                                                            |
| InactivityTimeSetting | (number)  | the owner inactivity time set for this funding plan after which the heir is allowed to spend fund, in secs                                    |
| IsHeirSpendingAllowed | (boolean) | the flag, if the heir is allowed to spend funds, true or false                                                                                |
| InactivityTime        | (number)  | the owner real inactivity time, in secs                                                                                                       |
| memo                  | (string)  | a real world document (or link to the document and the document's hash) which contains the owner's requirements regarding the inherited funds |

#### :pushpin: Examples:

```
./komodo-cli -ac_name=TESTAC heirinfo b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0
```

Response:

```
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

The `heiradd` method outputs a list of all available funding plan ids.

### Arguments:

| Structure  | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| fundintxid | (string) | the id of the funding plan, the txid of heirfund transaction |

### Response:

| Structure | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| result:   | (string) | whether the command succeeded |

#### :pushpin: Examples:

```
./komodo-cli -ac_name=TESTAC heirlist
```

Response:

```
[
  "b8b5fa46b545548fbab3baeb5adeaafedd80494006af1b04007fb9f7379ce1f0"
]
```

## heiraddress

**heiraddress pubkey**

The `heiraddress` method shows user's address and balances for heir cc contract.

### Arguments:

| Structure | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| pubkey    | (string) | heir's pubkey in hexademical |

### Response:

| Structure                 | Type     | Description                                                                                                          |
| ------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| result                    | (string) | whether the method executed successfully                                                                             |
| HeirCCaddress             | (string) | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey |
| CCbalance                 | (number) | unspent amount on HeirCCaddress in coins                                                                             |
| HeirNormalAddress         | (string) | the unmodified normal public address generated from the contract's privkey, used for markers                         |
| HeirCC`1of2`Address       | (string) | address for storage funds in coins spendable by owner and heir                                                       |
| HeirCC`1of2`TokensAddress | (string) | address for storage funds in tokens spendable by owner and heir                                                      |
| myCCaddress               | (string) | taking the contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                    |
| myaddress                 | (string) | the public normal address of the pubkey used to launch the chain                                                     |
| mybalance                 | (number) | my balance on myaddress in coins                                                                                     |

Command:

```
./komodo-cli -ac_name=TESTAC heiraddress 036a2ec9095b7c2abb748548e6cec53e0c462121aa6037fd83a01ce1b2affa562e
```

Response:

```
{
  "result": "success",
  "HeirCCAddress": "RDVHcSekmXgeYBqRupNTmqo3Rn8QRXNduy",
  "CCbalance": 0.00010000,
  "HeirNormalAddress": "RTPwUjKYECcGn6Y4KYChLhgaht1RSU4jwf",
  "HeirCC`1of2`Address": "RCiaNQq9yVb5biyEy8xWrAJCjjvQ9oW8rn",
  "HeirCC`1of2`TokensAddress": "RGKHD8UaTU2avj6LdmuSgpuaukk6XY4fss",
  "myAddress": "REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b",
  "myCCAddress(Heir)": "RTF9g6SRzbgZXTT7arGZrmTeNKuLoGYyZA",
  "PubkeyCCaddress(Heir)": "RTF9g6SRzbgZXTT7arGZrmTeNKuLoGYyZA",
  "myCCaddress": "RTF9g6SRzbgZXTT7arGZrmTeNKuLoGYyZA",
  "myCCbalance": 0.00000000,
  "myaddress": "REXP3kgaa5wbio76aqnTJDb8CQJHBiZy2b",
  "mybalance": 296.99950000
}
```
