# Contract Module: Rewards

## Introduction

The Rewards CryptoConditions (CC) module creates a master-node like rewards program, giving a user the ability to earn rewards by locking coins.

It features configurable parameters, such as a customizable APR, minimum deposit, a required holding period,etc.

There can be many `rewards` plans active at any given time.

### Rewards CC Module Flow

- Anyone can create a new plan using [rewardscreatefunding](../cryptoconditions/cc-rewards.html#rewardscreatefunding)
- Anyone can add funding to the plan using [rewardsaddfunding](../cryptoconditions/cc-rewards.html#rewardsaddfunding)
- Anyone can query the list of all active plans using [rewardslist](../cryptoconditions/cc-rewards.html#rewardslist)
- To get the details of a particular plan, use [rewardsinfo](../cryptoconditions/cc-rewards.html#rewardsinfo)
- After finding a suitable plan, any user can lock funds using [rewardslock](../cryptoconditions/cc-rewards.html#rewardslock)
- After the minimum lock time is met, the user can use [rewardsunlock](../cryptoconditions/cc-rewards.html#rewardsunlock) to unlock their funds and receive their rewards

## rewardsaddfunding

**rewardsaddfunding name fundingtxid amount**

The `rewardsaddfunding` method adds funds to a rewards plan.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments:

| Structure   | Type     | Description                                                       |
| ----------- | -------- | ----------------------------------------------------------------- |
| name        | (string) | the desired name of your rewards plan                             |
| fundingtxid | (string) | the txid of the transaction that created and funded this contract |
| amount      | (number) | the amount of funds to add to the contract                        |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Step 1: Create a raw transaction and get the HEX value

```bash
./komodo-cli -ac_name=HELLOWORLD rewardsaddfunding FREE e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd 100
```

Response from Step 1:

```json
{
  "result": "success",
  "hex": "0100000001bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e00200000048473044022050ab254c7498e411ab5360551148405c4afff28d68729e2bd00ba2508ab105d402204067ab95020d606c35d3604d4385dcb97c899a06aa8bf8ce30471fb7868ac7a401ffffffff0300e40b5402000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401ccd05eefb1fe080000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae5414652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000"
}
```

Step 2: Broadcast raw transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 0100000001bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e00200000048473044022050ab254c7498e411ab5360551148405c4afff28d68729e2bd00ba2508ab105d402204067ab95020d606c35d3604d4385dcb97c899a06aa8bf8ce30471fb7868ac7a401ffffffff0300e40b5402000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401ccd05eefb1fe080000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae5414652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000
```

Response from Step 2:

```
008ca94eebce8dbfa91491028c8861016ad4c25240f9ddc5616f2fb0853da580
```

Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=ATEST decoderawtransaction 0100000001bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e00200000048473044022050ab254c7498e411ab5360551148405c4afff28d68729e2bd00ba2508ab105d402204067ab95020d606c35d3604d4385dcb97c899a06aa8bf8ce30471fb7868ac7a401ffffffff0300e40b5402000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401ccd05eefb1fe080000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae5414652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000
```

Response:

```json
{
  "txid": "008ca94eebce8dbfa91491028c8861016ad4c25240f9ddc5616f2fb0853da580",
  "size": 277,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd",
      "vout": 2,
      "scriptSig": {
        "asm": "3044022050ab254c7498e411ab5360551148405c4afff28d68729e2bd00ba2508ab105d402204067ab95020d606c35d3604d4385dcb97c899a06aa8bf8ce30471fb7868ac7a401",
        "hex": "473044022050ab254c7498e411ab5360551148405c4afff28d68729e2bd00ba2508ab105d402204067ab95020d606c35d3604d4385dcb97c899a06aa8bf8ce30471fb7868ac7a401"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 100.0,
      "valueSat": 10000000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RTsRBYL1HSvMoE3qtBJkyiswdVaWkm8YTK"]
      }
    },
    {
      "value": 98899.9997,
      "valueSat": 9889999970000,
      "n": 1,
      "scriptPubKey": {
        "asm": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5 OP_CHECKSIG",
        "hex": "2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 2,
      "scriptPubKey": {
        "asm": "OP_RETURN e5414652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e0",
        "hex": "6a2ae5414652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e0",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": []
}
```

## rewardsaddress

**rewardsaddress (pubkey)**

The `rewardsaddress` method returns info about the `rewards` plan associated with the given `pubkey`. If no `pubkey` is provided, the `pubkey` used to launch the daemon is used.

### Arguments:

| Structure | Type               | Description                                                                            |
| --------- | ------------------ | -------------------------------------------------------------------------------------- |
| pubkey    | (string, optional) | the pubkey of the requested info; by default it is the pubkey used to launch the chain |

### Response:

| Structure        | Type     | Description                                                                                                          |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| result           | (string) | whether the method executed successfully                                                                             |
| RewardsCCaddress | (string) | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey |
| Rewardsmarker    | (string) | the unmodified public address generated from the contract's privkey                                                  |
| GatewaysPubkey   | (string) | the pubkey for the gateways cc                                                                                       |
| RewardsCCassets  | (string) | this property is used for development purposes only and can otherwise be ignored                                     |
| CCaddress        | (string) | taking the contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                    |
| myCCaddress      | (string) | taking the contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                    |
| myaddress        | (string) | the public address of the pubkey used to launch the chain                                                            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD rewardsaddress 03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5
```

Response:

```json
{
  "result": "success",
  "RewardsCCaddress": "RTsRBYL1HSvMoE3qtBJkyiswdVaWkm8YTK",
  "Rewardsmarker": "RMgye9jeczNjQx9Uzq8no8pTLiCSwuHwkz",
  "GatewaysPubkey": "03ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb40",
  "RewardsCCassets": "RLh5sgvh3scCyM4aq1fhYhwgfbmb5SpCkT",
  "CCaddress": "RJdwcBsoWwmt9dtSqyFCULNW2F3zj2mcD3",
  "myCCaddress": "RJdwcBsoWwmt9dtSqyFCULNW2F3zj2mcD3",
  "myaddress": "RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"
}
```

## rewardscreatefunding

**rewardscreatefunding name amount APR mindays maxdays mindeposit**

The `rewardscreatefunding` method creates a new `rewards` plan.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method will then return a `txid`. This `txid` is the `fundingtxid` that serves to identify the `rewards` plan.

::: tip
If you create a plan with <b>mindeposit: 10000</b>, make sure to also add 10000 of your coin and the transaction fees using the <b>rewardsaddfunding</b> call after creating the plan. The rewards contract won't allow locking of funds greater than the amount already locked in a single transaction as it needs to assure that it will have the required funds to pay.
:::

### Arguments:

| Structure  | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| name       | (string) | the desired name of your rewards plan                       |
| amount     | (number) | the amount of seed funds to withdraw from your wallet       |
| APR        | (number) | the annual percentage of rewards, given in percentage units |
| mindays    | (number) | the minimum number of days the funds will be locked         |
| maxdays    | (number) | the maximum number of days the funds will be locked         |
| mindeposit | (number) | the minimum deposit amount for a user to participate        |

### Response:

| Structure | Type     | Description                                                                                          |
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples:

Step 1: Create raw transaction HEX using your own parameter

```bash
./komodo-cli -ac_name=HELLOWORLD rewardscreatefunding FREE 1000 5 1 10 10
```

Response:

```json
{
  "result": "success",
  "hex": "010000000104f2435046f3ad452e76e53ec01429ae4f49d3322e8cc96da96b9e35d6ada70e0000000049483045022100ebd06f60dea0e1fbfc82fdb1f17ca265c63bae51cd2db558946871513f64453902207d4d39b2418a5206bd7ef4efb9130f93f304577e0c84cc79be4e8abe0c8b22fe01ffffffff0400e8764817000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc1027000000000000232103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9ace069fb0501090000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae54646524545000000000065cd1d000000008051010000000000002f0d000000000000ca9a3b0000000000000000"
}
```

Step 2: Broadcast/send the raw hex/transaction. This will output the txid which is the fundingtxid, also called the rewards plan id.

```bash
./komodo-cli -ac_name=ATEST sendrawtransaction 010000000104f2435046f3ad452e76e53ec01429ae4f49d3322e8cc96da96b9e35d6ada70e0000000049483045022100ebd06f60dea0e1fbfc82fdb1f17ca265c63bae51cd2db558946871513f64453902207d4d39b2418a5206bd7ef4efb9130f93f304577e0c84cc79be4e8abe0c8b22fe01ffffffff0400e8764817000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc1027000000000000232103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9ace069fb0501090000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae54646524545000000000065cd1d000000008051010000000000002f0d000000000000ca9a3b0000000000000000
```

Response from Step 2:

```bash
e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd
```

Step 3: Decode the raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=ATEST decoderawtransaction 010000000104f2435046f3ad452e76e53ec01429ae4f49d3322e8cc96da96b9e35d6ada70e0000000049483045022100ebd06f60dea0e1fbfc82fdb1f17ca265c63bae51cd2db558946871513f64453902207d4d39b2418a5206bd7ef4efb9130f93f304577e0c84cc79be4e8abe0c8b22fe01ffffffff0400e8764817000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc1027000000000000232103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9ace069fb0501090000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae54646524545000000000065cd1d000000008051010000000000002f0d000000000000ca9a3b0000000000000000
```

Response from Step 3:

```json
{
  "txid": "e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd",
  "size": 322,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "0ea7add6359e6ba96dc98c2e32d3494fae2914c03ee5762e45adf3465043f204",
      "vout": 0,
      "scriptSig": {
        "asm": "3045022100ebd06f60dea0e1fbfc82fdb1f17ca265c63bae51cd2db558946871513f64453902207d4d39b2418a5206bd7ef4efb9130f93f304577e0c84cc79be4e8abe0c8b22fe01",
        "hex": "483045022100ebd06f60dea0e1fbfc82fdb1f17ca265c63bae51cd2db558946871513f64453902207d4d39b2418a5206bd7ef4efb9130f93f304577e0c84cc79be4e8abe0c8b22fe01"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 1000.0,
      "valueSat": 100000000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RTsRBYL1HSvMoE3qtBJkyiswdVaWkm8YTK"]
      }
    },
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "03da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9 OP_CHECKSIG",
        "hex": "2103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RMgye9jeczNjQx9Uzq8no8pTLiCSwuHwkz"]
      }
    },
    {
      "value": 98999.9998,
      "valueSat": 9899999980000,
      "n": 2,
      "scriptPubKey": {
        "asm": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5 OP_CHECKSIG",
        "hex": "2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 3,
      "scriptPubKey": {
        "asm": "OP_RETURN e54646524545000000000065cd1d000000008051010000000000002f0d000000000000ca9a3b00000000",
        "hex": "6a2ae54646524545000000000065cd1d000000008051010000000000002f0d000000000000ca9a3b00000000",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": []
}
```

## rewardsinfo

**rewardsinfo fundingtxid**

The `rewardsinfo` method returns information about specific `rewards` plan.

Use [rewardslist](../cryptoconditions/cc-rewards.html#rewardslist) to see a list of all available `fundingtxid`'s.

### Arguments:

| Structure   | Type     | Description                                        |
| ----------- | -------- | -------------------------------------------------- |
| fundingtxid | (string) | the txid given on the creation of the rewards plan |

### Response:

| Structure  | Type     | Description                                                                 |
| ---------- | -------- | --------------------------------------------------------------------------- |
| name       | (string) | the name of the rewards plan                                                |
| sbits      | (number) | a 64-bit int binary encoding of the first 8 characters of the name property |
| APR        | (number) | the annual percentage of rewards, given in percentage units                 |
| minseconds | (number) | the minimum number of seconds the funds will be locked                      |
| maxseconds | (number) | the maximum number of seconds the funds will be locked                      |
| mindeposit | (number) | the minimum deposit amount                                                  |
| funding    | (number) | the total available funds in the rewards plan                               |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD rewardsinfo e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd
```

Response:

```json
{
  "result": "success",
  "fundingtxid": "e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd",
  "name": "FREE",
  "sbits": 1162170950,
  "APR": "5.00000000",
  "minseconds": 86400,
  "maxseconds": 864000,
  "mindeposit": "10.00000000",
  "funding": "1100.00000000",
  "locked": "200.00000000"
}
```

## rewardslist

**rewardslist**

The `rewardslist` method lists the `fundingtxid`'s of all the rewards contracts available on the asset chain.

### Arguments:

| Structure | Type | Description |
| --------- | ---- | ----------- |
| (none)    |      |

### Response:

| Structure   | Type     | Description                                                               |
| ----------- | -------- | ------------------------------------------------------------------------- |
| fundingtxid | (string) | the txid of the transaction that created and funded the relevant contract |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD rewardslist

```

Response:

```bash
[
  "e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd"
]
```

## rewardslock

**rewardslock name fundingtxid amount**

The `rewardslock` method commits your desired amount of funds into the specified rewards plan. They remain locked until the minimum number of seconds/days passes.

The method returns a `hex` value that must be broadcast using [sendrawtransaction.](../komodo-api/rawtransactions.html#sendrawtransaction)

The `sendrawtransaction` method will then return a `txid`, which is later used in the [rewardsunlock](../cryptoconditions/cc-rewards.html#rewardsunlock) method. In general, it is best to save this `txid` in a secure location.

If the final `txid` is lost, it is possible to find it again. See [rewardsunlock](../cryptoconditions/cc-rewards.html#rewardsunlock) for more information.

### Arguments:

| Structure   | Type     | Description                                                                 |
| ----------- | -------- | --------------------------------------------------------------------------- |
| name        | (string) | the name of the rewards plan                                                |
| fundingtxid | (string) | the txid that identifies the desired rewards plan                           |
| amount      | (number) | the amount of funds to commit to the plan (must be over the plan's minimum) |

### Response:

| Structure | Type     | Description                                                                                                         |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                                       |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the `diceaddfunds` command |

#### :pushpin: Examples:

Step 1: Create raw transaction

```bash
./komodo-cli -ac_name=HELLOWORLD rewardslock FREE e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd 200
```

Response from Step 1:

```json
{
  "result": "success",
  "hex": "010000000180a53d85b02f6f61c5ddf94052c2d46a0161888c029114a9bf8dceeb4ea98c000100000049483045022100cf5581a6729eb0f37d03f0975dd6cfaca79ea08d380dae7df25b2335931bff5d02204feaf188f7f28d90c056a7b2bfa1f8d38fdf242c333470cf1e0cd3534ef1609701ffffffff0400c817a804000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc1027000000000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5acb048d709fa080000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae54c4652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000"
}
```

Step 2: Broadcast raw transaction

```bash
./komodo-cli -ac_name=ATEST sendrawtransaction 010000000180a53d85b02f6f61c5ddf94052c2d46a0161888c029114a9bf8dceeb4ea98c000100000049483045022100cf5581a6729eb0f37d03f0975dd6cfaca79ea08d380dae7df25b2335931bff5d02204feaf188f7f28d90c056a7b2bfa1f8d38fdf242c333470cf1e0cd3534ef1609701ffffffff0400c817a804000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc1027000000000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5acb048d709fa080000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae54c4652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000
```

Response from Step 2:

```bash
494c4e8ab19ab73db9fde0454762e50ff3621d9708170083ea9d925918ec0263
```

Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=ATEST decoderawtransaction 010000000180a53d85b02f6f61c5ddf94052c2d46a0161888c029114a9bf8dceeb4ea98c000100000049483045022100cf5581a6729eb0f37d03f0975dd6cfaca79ea08d380dae7df25b2335931bff5d02204feaf188f7f28d90c056a7b2bfa1f8d38fdf242c333470cf1e0cd3534ef1609701ffffffff0400c817a804000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc1027000000000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5acb048d709fa080000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae54c4652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000
```

Response from Step 3:

```json
{
  "txid": "494c4e8ab19ab73db9fde0454762e50ff3621d9708170083ea9d925918ec0263",
  "size": 322,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "008ca94eebce8dbfa91491028c8861016ad4c25240f9ddc5616f2fb0853da580",
      "vout": 1,
      "scriptSig": {
        "asm": "3045022100cf5581a6729eb0f37d03f0975dd6cfaca79ea08d380dae7df25b2335931bff5d02204feaf188f7f28d90c056a7b2bfa1f8d38fdf242c333470cf1e0cd3534ef1609701",
        "hex": "483045022100cf5581a6729eb0f37d03f0975dd6cfaca79ea08d380dae7df25b2335931bff5d02204feaf188f7f28d90c056a7b2bfa1f8d38fdf242c333470cf1e0cd3534ef1609701"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 200.0,
      "valueSat": 20000000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RTsRBYL1HSvMoE3qtBJkyiswdVaWkm8YTK"]
      }
    },
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5 OP_CHECKSIG",
        "hex": "2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"]
      }
    },
    {
      "value": 98699.9995,
      "valueSat": 9869999950000,
      "n": 2,
      "scriptPubKey": {
        "asm": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5 OP_CHECKSIG",
        "hex": "2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 3,
      "scriptPubKey": {
        "asm": "OP_RETURN e54c4652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e0",
        "hex": "6a2ae54c4652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e0",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": []
}
```

## rewardsunlock

**rewardsunlock name fundingtxid (txid)**

The `rewardsunlock` method unlocks your funds from a specific rewards plan after the minimum lock time is met. If `txid` is not provided, `rewardsunlock` unlocks all funds in the `fundingtxid` plan.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method to complete the command.

If you attempt to unlock your funds before the minimum period is met, the daemon returns this error:

The method requires the `txid` that was returned as a result of the original [rewardslock](../cryptoconditions/cc-rewards.html#rewardslock) method.

If the original `txid` is lost, it is possible to find it again by either rebroadcasting the original `hex` (if it is available), or by scanning through available utxos using the [getaddressutxos](../komodo-api/address.html#getaddressutxos) method.

::: tip
{
"result": "error",
"error": "reward 0 is <= the transaction fee"
}
:::

An error similar to the one below prints in the console:

```
APR 5.00000000 minseconds.86400 maxseconds.864000 mindeposit 10.00000000

duration 74628 < minseconds 86400

reward 0 is <= the transaction fee

amount 200.00000000 -> reward 0.00000000
```

### Arguments:

| Structure   | Type               | Description                                                                                                                                                        |
| ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name        | (string)           | the name of the rewards plan                                                                                                                                       |
| fundingtxid | (string)           | the txid that identifies the desired rewards plan                                                                                                                  |
| txid        | (string, optional) | the txid that was returned as a result of the original rewardslock command; if `txid` is not provided, `rewardsunlock` unlocks all funds in the `fundingtxid` plan |

### Response:

| Structure | Type     | Description                                                                                                         |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                                       |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the `diceaddfunds` command |

#### :pushpin: Examples:

Step 1: Create raw transaction

```bash
./komodo-cli -ac_name=HELLOWORLD rewardsunlock FREE e020151cd81647b20aa45a0e6850216ae52d3e895443bbe1ae97dea3ae6767bd 494c4e8ab19ab73db9fde0454762e50ff3621d9708170083ea9d925918ec0263
```

Response from Step 1:

```json
{
  "result": "success",
  "hex": "01000000026302ec1859929dea83001708971d62f30fe5624745e0fdb93db79ab18a4e4c49000000007b4c79a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb98140dd5c7a6e8436748501608056b934a6b6cd54122f9451a1ca76f3d41568cb0e7a08e4d4f9045083425f42a4171e42b2d32f5e331f87d5b45298e006b909c706d2a100af038001e5a10001ffffffff45fc2d61dd7bf709409c3e5b9021ebd6191901a2a43fa7ed2704c03aa0d3a682000000007b4c79a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9814011825693143f97dc51d34b47638f314146c20c92b5020673fb7411ab37018c2003870255e17d87d46b7af7d042335579de566ce492fd8c3c4e883253870ba329a100af038001e5a10001ffffffff0349f04c4817000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cca79841a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae5554652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000"
}
```

Step 2: Broadcast raw transaction

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 01000000026302ec1859929dea83001708971d62f30fe5624745e0fdb93db79ab18a4e4c49000000007b4c79a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb98140dd5c7a6e8436748501608056b934a6b6cd54122f9451a1ca76f3d41568cb0e7a08e4d4f9045083425f42a4171e42b2d32f5e331f87d5b45298e006b909c706d2a100af038001e5a10001ffffffff45fc2d61dd7bf709409c3e5b9021ebd6191901a2a43fa7ed2704c03aa0d3a682000000007b4c79a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9814011825693143f97dc51d34b47638f314146c20c92b5020673fb7411ab37018c2003870255e17d87d46b7af7d042335579de566ce492fd8c3c4e883253870ba329a100af038001e5a10001ffffffff0349f04c4817000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cca79841a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae5554652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000
```

Response from Step 2:

```bash
7a69605f5ecfeb0613c8573cbc4ae2471698a65b60c983ec21fb41f09975c000
```

Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 01000000026302ec1859929dea83001708971d62f30fe5624745e0fdb93db79ab18a4e4c49000000007b4c79a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb98140dd5c7a6e8436748501608056b934a6b6cd54122f9451a1ca76f3d41568cb0e7a08e4d4f9045083425f42a4171e42b2d32f5e331f87d5b45298e006b909c706d2a100af038001e5a10001ffffffff45fc2d61dd7bf709409c3e5b9021ebd6191901a2a43fa7ed2704c03aa0d3a682000000007b4c79a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9814011825693143f97dc51d34b47638f314146c20c92b5020673fb7411ab37018c2003870255e17d87d46b7af7d042335579de566ce492fd8c3c4e883253870ba329a100af038001e5a10001ffffffff0349f04c4817000000302ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cca79841a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000002c6a2ae5554652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e000000000
```

Response from Step 3:

```json
{
  "txid": "7a69605f5ecfeb0613c8573cbc4ae2471698a65b60c983ec21fb41f09975c000",
  "size": 492,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "494c4e8ab19ab73db9fde0454762e50ff3621d9708170083ea9d925918ec0263",
      "vout": 0,
      "scriptSig": {
        "asm": "a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb98140dd5c7a6e8436748501608056b934a6b6cd54122f9451a1ca76f3d41568cb0e7a08e4d4f9045083425f42a4171e42b2d32f5e331f87d5b45298e006b909c706d2a100af038001e5a10001",
        "hex": "4c79a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb98140dd5c7a6e8436748501608056b934a6b6cd54122f9451a1ca76f3d41568cb0e7a08e4d4f9045083425f42a4171e42b2d32f5e331f87d5b45298e006b909c706d2a100af038001e5a10001"
      },
      "sequence": 4294967295
    },
    {
      "txid": "82a6d3a03ac00427eda73fa4a2011919d6eb21905b3e9c4009f77bdd612dfc45",
      "vout": 0,
      "scriptSig": {
        "asm": "a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9814011825693143f97dc51d34b47638f314146c20c92b5020673fb7411ab37018c2003870255e17d87d46b7af7d042335579de566ce492fd8c3c4e883253870ba329a100af038001e5a10001",
        "hex": "4c79a276a072a26ba067a565802103da60379d924c2c30ac290d2a86c2ead128cb7bd571f69211cb95356e2dcc5eb9814011825693143f97dc51d34b47638f314146c20c92b5020673fb7411ab37018c2003870255e17d87d46b7af7d042335579de566ce492fd8c3c4e883253870ba329a100af038001e5a10001"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 999.97249609,
      "valueSat": 99997249609,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c802065686d47a4049c2c845a71895a915eb84c04445896eec5dc0be40df0b31372da8103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RTsRBYL1HSvMoE3qtBJkyiswdVaWkm8YTK"]
      }
    },
    {
      "value": 200.02740391,
      "valueSat": 20002740391,
      "n": 1,
      "scriptPubKey": {
        "asm": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5 OP_CHECKSIG",
        "hex": "2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"]
      }
    },
    {
      "value": 0.0,
      "valueSat": 0,
      "n": 2,
      "scriptPubKey": {
        "asm": "OP_RETURN e5554652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e0",
        "hex": "6a2ae5554652454500000000bd6767aea3de97aee1bb4354893e2de56a2150680e5aa40ab24716d81c1520e0",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": []
}
```
