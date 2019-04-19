# Oracles

## Introduction

The Oracles Custom Consensus (CC) module allows a user to make off-chain data available on-chain. This enables developers to create and use software that responds to off-chain information and events.

Those who publish data to an oracle are called publishers. There is a fee-based model to serve as an incentive for publishers.

### Oracles CC Module Flow

- Create an Oracle using [oraclescreate](../customconsensus/oracles.html#oraclescreate)
- Register as a data publisher for the oracle using the [oraclesregister](../customconsensus/oracles.html#oraclesregister) method; at this stage, the publisher indicates the fee for their data updates
  - Anyone can register as a publisher for any oracle; users subscribe only to the publishers they desire
- The [oracleslist](../customconsensus/oracles.html#oraclelist), [oraclesinfo](../customconsensus/oracles.html#oraclesinfo), and [oraclessamples](../customconsensus/oracles.html#oraclessamples) methods allow the user to find oracles and publishers, find more information about a specific oracle and publisher, and discover samples of an existing publisher, respectively
- Anyone can subscribe to any specific publisher of any oracle using the [ oraclessubscribe](../customconsensus/oracles.html#oraclessubscribe) method
- A publisher can publish data using [oraclesdata](../customconsensus/oracles.html#oraclesdata), and thereby collect their fee from their subscribers

## oraclesaddress

**oraclesaddress (pubkey)**

The `oraclesaddress` method displays the oracle address for a specific pubkey.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | -------------------------------------------------------------------------------------- |
| pubkey    | (string, optional) | the pubkey of the requested info; by default it is the pubkey used to launch the chain |

### Response

| Name | Type | Description | 
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| result           | (string) | whether the method executed successfully                                                                             |
| OraclesCCaddress | (string) | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey |
| Oraclesmarker    | (string) | the unmodified public address generated from the contract's privkey                                                  |
| GatewaysPubkey   | (string) | the pubkey for the gateways cc                                                                                       |
| OraclesCCassets  | (string) | this property is used for development purposes only and can otherwise be ignored                                     |
| CCaddress        | (string) | taking the contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                    |
| myCCaddress      | (string) | taking the contract's EVAL code as a modifier, this is the CC address from the pubkey of the user                    |
| myaddress        | (string) | the public address of the pubkey used to launch the chain                                                            |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesaddress 03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "OraclesCCaddress": "REt2C4ZMnX8YYX1DRpffNA4hECZTFm39e3",
  "Oraclesmarker": "RHkFKzn1csxA3fWzAsxsLWohoCgBbirXb5",
  "GatewaysPubkey": "03ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb40",
  "OraclesCCassets": "RLh5sgvh3scCyM4aq1fhYhwgfbmb5SpCkT",
  "CCaddress": "RTk2Tgp1iAcxxSeuXYDREmtfydMvNkCmq8",
  "myCCaddress": "RTk2Tgp1iAcxxSeuXYDREmtfydMvNkCmq8",
  "myaddress": "RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"
}
```

</collapse-text>


## oraclescreate

**oraclescreate name description format**

The `oraclescreate` method creates a new oracle.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

### Arguments

| Name | Type | Description | 
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| name        | (string) | the desired name of the oracle contract                                                                                          |
| description | (string) | the description of the oracle                                                                                                    |
| format      | (string) | an indication of what format of data is accepted into this contract; use the list of characters provided below for this property |

The various formats of data that can be registered for an oracle and their symbols are as follows:

- `s` -> `char string; size < 256 bytes`
- `S` -> `char string; size < 65536 bytes`
- `d` -> `binary data; size < 256 bytes`
- `D` -> `binary data; size < 65536 bytes`
- `c` -> `1 byte signed little endian number, 'C' if unsigned`
- `t` -> `2 byte signed little endian number, 'T' if unsigned`
- `i` -> `4 byte signed little endian number, 'I' if unsigned`
- `l` -> `8 byte signed little endian number, 'L' if unsigned`
- `h` -> `32 byte hash`

::: warning

- Even though the formats `S` and `D` specify that the data size can be up to `65536` bytes, the combination of the transaction size and the data size cannot exceed the limit of `10000` bytes.
- Although the formats `d` and `D` are for raw binary data, they are preferable to the `s` and `S` human-readable formats. This is because the `s` and `S` formats occupy twice the size of data on the blockchain, and yet their only advantage is their ability to show human-readable output in the [oraclessamples](../customconsensus/oracles.html#oraclessamples) method.

:::

::: tip
If data to be submitted is larger than `8KB`, break it into chunks of size `8KB` or lower.
:::

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result    | (string) | whether the command succeeded                                                                        |
| hex       | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Create a customized oracle contract and get the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD oraclescreate "NYWTHR" "Weather in NYC" "L"
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "010000000185b76ed0fbdb9ee2bdb5693f491b6ea23de6498f42c6e83f9f36c1eaf411dd990200000049483045022100aa198a2ae959ee191e1359df48867480bf5a1a5bd4fa76b4398481c89ff3095102205034824dcd56b312183acd65c27a002a13dae84f5d22c767f1efaae09ef63a5c01ffffffff0310270000000000002321038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aac378740a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000001c6a1aec43064e5957544852014c0e5765617468657220696e204e594300000000"
}
```

</collapse-text>


Step 2: Send raw transaction / broadcast the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000185b76ed0fbdb9ee2bdb5693f491b6ea23de6498f42c6e83f9f36c1eaf411dd990200000049483045022100aa198a2ae959ee191e1359df48867480bf5a1a5bd4fa76b4398481c89ff3095102205034824dcd56b312183acd65c27a002a13dae84f5d22c767f1efaae09ef63a5c01ffffffff0310270000000000002321038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aac378740a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000001c6a1aec43064e5957544852014c0e5765617468657220696e204e594300000000
# This will output an unique txid which will be refered as oracletxid or ID of the oracle.
```


<collapse-text hidden title="Response">


```bash
0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203
```

</collapse-text>


(Use `./komodo-cli -ac_name=HELLOWORLD getrawmempool` to ensure that the transaction receives confirmation.)

Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 010000000185b76ed0fbdb9ee2bdb5693f491b6ea23de6498f42c6e83f9f36c1eaf411dd990200000049483045022100aa198a2ae959ee191e1359df48867480bf5a1a5bd4fa76b4398481c89ff3095102205034824dcd56b312183acd65c27a002a13dae84f5d22c767f1efaae09ef63a5c01ffffffff0310270000000000002321038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aac378740a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000001c6a1aec43064e5957544852014c0e5765617468657220696e204e594300000000
```


<collapse-text hidden title="Response">


```json
{
  "txid": "0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203",
  "size": 249,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "99dd11f4eac1369f3fe8c6428f49e63da26e1b493f69b5bde29edbfbd06eb785",
      "vout": 2,
      "scriptSig": {
        "asm": "3045022100aa198a2ae959ee191e1359df48867480bf5a1a5bd4fa76b4398481c89ff3095102205034824dcd56b312183acd65c27a002a13dae84f5d22c767f1efaae09ef63a5c01",
        "hex": "483045022100aa198a2ae959ee191e1359df48867480bf5a1a5bd4fa76b4398481c89ff3095102205034824dcd56b312183acd65c27a002a13dae84f5d22c767f1efaae09ef63a5c01"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 0,
      "scriptPubKey": {
        "asm": "038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691a OP_CHECKSIG",
        "hex": "21038c1d42db6a45a57eccb8981b078fb7857b9b496293fe299d2b8d120ac5b5691aac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RHkFKzn1csxA3fWzAsxsLWohoCgBbirXb5"]
      }
    },
    {
      "value": 200.02670391,
      "valueSat": 20002670391,
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
        "asm": "OP_RETURN ec43064e5957544852014c0e5765617468657220696e204e5943",
        "hex": "6a1aec43064e5957544852014c0e5765617468657220696e204e5943",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": []
}
```

</collapse-text>


## oraclesdata

**oraclesdata oracletxid hexstr**

The `oraclesdata` method publishes data to an oracle.

A publisher cannot successfully execute this command until they have at least one subscriber. A publisher may create their own subscriber account for this purpose. See [oraclessubscribe.](../customconsensus/oracles.html#oraclessubscribe)

Data is submitted using the `hexstr` property. The first bytes of the `hexstr` property must be the length of the data being submitted in hexadecimal format; this sets the string length for the rest of the data. The second portion of the `hexstr` property is the data itself.

The `oraclesdata` method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method outputs a unique `txid`, called `oraclesdatatxid`, which is the unique identifier for this data sample.

The following script converts data entered in a normal-text form to a format accepted by an Oracle with the following characteristics. The oracle is of type: `S`, and the first two bytes of data are the length, given in **Little Endian** format.

<collapse-text hidden title="Script">

```python
#!/usr/bin/env python3
import sys
import codecs
import time
import readline


while True:
    message = input("Type message: ")
    #convert message to hex
    rawhex = codecs.encode(message).hex()

    #get length in bytes of hex in decimal
    bytelen = int(len(rawhex) / int(2))
    hexlen = format(bytelen, 'x')

    #get length in big endian hex
    if bytelen < 16:
        bigend = "000" + str(hexlen)
    elif bytelen < 256:
        bigend = "00" + str(hexlen)
    elif bytelen < 4096:
        bigend = "0" + str(hexlen)
    elif bytelen < 65536:
        bigend = str(hexlen)
    else:
        print("message too large, must be less than 65536 characters")
        continue

    #convert big endian length to little endian, append rawhex to little endian length
    lilend = bigend[2] + bigend[3] + bigend[0] + bigend[1]
    fullhex = lilend + rawhex

    print(fullhex)
```


</collapse-text>

::: tip Note

- for submitting data of the types `s` and `d`, where the size is less than 256 bytes, the first byte denotes the length
- for submitting data of the types `S` and `D`, where the size is less than 65536 bytes, the first two bytes denotes the length in **Little Endian** format

:::

#### :pushpin: Examples for data submission

##### Example A

- The objective: to submit a `10` character string, `"teststring"`, to an oracle of the format `s`
- The data to meet this objective is as follows: `0a74657374737472696e67`
  - Notice the first byte, `0a`
    - This is the hexadecimal representation of the decimal number `10`
    - `10` is the byte size of this `10` character string, because each character requires `1 byte` of space
  - Notice the remaining bytes, `74657374737472696e67`
    - Each two characters is a byte representing a character
    - `74` = `t`
    - `65` = `e`
    - `73` = `s`
    - `74` = `t` etc.

##### Example B

- The objective: to submit the `10` character string, `"teststring"`, to an oracle of the format `S`
- The data to meet this objective is as follows: `0a0074657374737472696e67`
  - Notice the first two bytes, `0a` and `00`
  - These are the hexadecimal representations of the decimal number `10`, written to fill `2 bytes` and in **Little Endian** format
  - The remaining data, `74657374737472696e67`, is the same as Example A

### Arguments

| Name | Type | Description | 
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oracletxid | (string) | the unique identifying transaction id of the oracle                                                                                                           |
| hexstring  | (string) | the first half of the string indicates the length of the string in bytes, the second half of the string is the data, typically provided in hex-encoded format |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result    | (string) | whether the command succeeded                                                                        |
| hex       | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Subscribe to a oracle plan and get the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesdata 0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203 00000000ffffffff
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "010000000359db76b9b8e9cfaa4514dcc198c375f910b9fb7367d1c9d556cd5eb43b5f4d2d02000000484730440220645b49d6d85454b1015d82a53ec51685fc3b8bf1d092696c3c253b88cab3033a02207023511219897a374ad94951dd2af70b14d99eccbb404eaf783120f3170bd5e301ffffffff75a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f010000007b4c79a276a072a26ba067a5658021035933ab0bd2e2ceb712e7cab393a8c9096ba4be2e3a76f5aaeab72bce4aa61857814047697a246e4442888a3b6ffc4a8c5ae940eec7d19f72053a07b6d8a2968a260626c8001c9138e9fd0e3cfabb811ae71bd8c1c555ca8c8410cb9121ce25860507a100af038001eca10001ffffffff59db76b9b8e9cfaa4514dcc198c375f910b9fb7367d1c9d556cd5eb43b5f4d2d000000007b4c79a276a072a26ba067a565802103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b581404fa0de32bbb96b2e2f61fe823cdba4c3b9fef786ea8c65196f97653a942656812e675e91643ff0ec33853fd2481d40fc48fa51e18c9cbffb49e714c15b47babda100af038001eca10001ffffffff05c09ee60500000000302ea22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401cc1027000000000000302ea22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401cc40420f0000000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5acd7bb49a204000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac0000000000000000706a4c6dec4403921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d75a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b50800000000ffffffff00000000"
}
```

</collapse-text>


Step 2: Send raw transaction / broadcast the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000359db76b9b8e9cfaa4514dcc198c375f910b9fb7367d1c9d556cd5eb43b5f4d2d02000000484730440220645b49d6d85454b1015d82a53ec51685fc3b8bf1d092696c3c253b88cab3033a02207023511219897a374ad94951dd2af70b14d99eccbb404eaf783120f3170bd5e301ffffffff75a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f010000007b4c79a276a072a26ba067a5658021035933ab0bd2e2ceb712e7cab393a8c9096ba4be2e3a76f5aaeab72bce4aa61857814047697a246e4442888a3b6ffc4a8c5ae940eec7d19f72053a07b6d8a2968a260626c8001c9138e9fd0e3cfabb811ae71bd8c1c555ca8c8410cb9121ce25860507a100af038001eca10001ffffffff59db76b9b8e9cfaa4514dcc198c375f910b9fb7367d1c9d556cd5eb43b5f4d2d000000007b4c79a276a072a26ba067a565802103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b581404fa0de32bbb96b2e2f61fe823cdba4c3b9fef786ea8c65196f97653a942656812e675e91643ff0ec33853fd2481d40fc48fa51e18c9cbffb49e714c15b47babda100af038001eca10001ffffffff05c09ee60500000000302ea22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401cc1027000000000000302ea22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401cc40420f0000000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5acd7bb49a204000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac0000000000000000706a4c6dec4403921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d75a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b50800000000ffffffff00000000
```


<collapse-text hidden title="Response">


```bash
9530bdf82744ac57a5ffe0855595f5510c339341cdc3c8728ee547d3f3153433
```

</collapse-text>


Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 010000000359db76b9b8e9cfaa4514dcc198c375f910b9fb7367d1c9d556cd5eb43b5f4d2d02000000484730440220645b49d6d85454b1015d82a53ec51685fc3b8bf1d092696c3c253b88cab3033a02207023511219897a374ad94951dd2af70b14d99eccbb404eaf783120f3170bd5e301ffffffff75a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f010000007b4c79a276a072a26ba067a5658021035933ab0bd2e2ceb712e7cab393a8c9096ba4be2e3a76f5aaeab72bce4aa61857814047697a246e4442888a3b6ffc4a8c5ae940eec7d19f72053a07b6d8a2968a260626c8001c9138e9fd0e3cfabb811ae71bd8c1c555ca8c8410cb9121ce25860507a100af038001eca10001ffffffff59db76b9b8e9cfaa4514dcc198c375f910b9fb7367d1c9d556cd5eb43b5f4d2d000000007b4c79a276a072a26ba067a565802103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b581404fa0de32bbb96b2e2f61fe823cdba4c3b9fef786ea8c65196f97653a942656812e675e91643ff0ec33853fd2481d40fc48fa51e18c9cbffb49e714c15b47babda100af038001eca10001ffffffff05c09ee60500000000302ea22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401cc1027000000000000302ea22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401cc40420f0000000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5acd7bb49a204000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac0000000000000000706a4c6dec4403921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d75a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b50800000000ffffffff00000000
```


<collapse-text hidden title="Response">


```json
{
    "txid": "9530bdf82744ac57a5ffe0855595f5510c339341cdc3c8728ee547d3f3153433",
    "size": 774,
    "version": 1,
    "locktime": 0,
    "vin": [
        {
            "txid": "2d4d5f3bb45ecd56d5c9d16773fbb910f975c398c1dc1445aacfe9b8b976db59",
            "vout": 2,
            "scriptSig": {
                "asm": "30440220645b49d6d85454b1015d82a53ec51685fc3b8bf1d092696c3c253b88cab3033a02207023511219897a374ad94951dd2af70b14d99eccbb404eaf783120f3170bd5e301",
                "hex": "4730440220645b49d6d85454b1015d82a53ec51685fc3b8bf1d092696c3c253b88cab3033a02207023511219897a374ad94951dd2af70b14d99eccbb404eaf783120f3170bd5e301"
            },
            "sequence": 4294967295
        },
        {
            "txid": "8f3c517d023e42bacfd0de8b0174cdc8adab713d08a689c00067ab171488a575",
            "vout": 1,
            "scriptSig": {
                "asm": "a276a072a26ba067a5658021035933ab0bd2e2ceb712e7cab393a8c9096ba4be2e3a76f5aaeab72bce4aa61857814047697a246e4442888a3b6ffc4a8c5ae940eec7d19f72053a07b6d8a2968a2606
26c8001c9138e9fd0e3cfabb811ae71bd8c1c555ca8c8410cb9121ce25860507a100af038001eca10001",
    "hex": "4c79a276a072a26ba067a5658021035933ab0bd2e2ceb712e7cab393a8c9096ba4be2e3a76f5aaeab72bce4aa61857814047697a246e4442888a3b6ffc4a8c5ae940eec7d19f72053a07b6d8a2968a
260626c8001c9138e9fd0e3cfabb811ae71bd8c1c555ca8c8410cb9121ce25860507a100af038001eca10001"
            },
            "sequence": 4294967295
        },
        {
            "txid": "2d4d5f3bb45ecd56d5c9d16773fbb910f975c398c1dc1445aacfe9b8b976db59",
            "vout": 0,
            "scriptSig": {
                "asm": "a276a072a26ba067a565802103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b581404fa0de32bbb96b2e2f61fe823cdba4c3b9fef786ea8c65196f97653a94265681
2e675e91643ff0ec33853fd2481d40fc48fa51e18c9cbffb49e714c15b47babda100af038001eca10001",
    "hex": "4c79a276a072a26ba067a565802103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b581404fa0de32bbb96b2e2f61fe823cdba4c3b9fef786ea8c65196f97653a9426
56812e675e91643ff0ec33853fd2481d40fc48fa51e18c9cbffb49e714c15b47babda100af038001eca10001"
            },
            "sequence": 4294967295
        }
    ],
    "vout": [
        {
            "value": 0.99000000,
            "valueSat": 99000000,
            "n": 0,
            "scriptPubKey": {
                "asm": "a22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401 OP_CHECKCRYPTOCONDITION",
                "hex": "2ea22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401cc",
                "reqSigs": 1,
                "type": "cryptocondition",
                "addresses": [
                    "RTk2Tgp1iAcxxSeuXYDREmtfydMvNkCmq8"
                ]
            }
        },
        {
            "value": 0.00010000,
            "valueSat": 10000,
            "n": 1,
            "scriptPubKey": {
                "asm": "a22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401 OP_CHECKCRYPTOCONDITION",
                "hex": "2ea22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401cc",
                "reqSigs": 1,
                "type": "cryptocondition",
                "addresses": [
                    "RWg43P8s8RtJatAGNa2kV8N2abhQqH93w9"
                ]
            }
        },
        {
            "value": 0.01000000,
            "valueSat": 1000000,
            "n": 2,
            "scriptPubKey": {
                "asm": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5 OP_CHECKSIG",
                "hex": "2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac",
                "reqSigs": 1,
                "type": "pubkey",
                "addresses": [
                    "RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"
                ]
            }
        },
        {
            "value": 199.02610391,
            "valueSat": 19902610391,
            "n": 3,
            "scriptPubKey": {
                "asm": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5 OP_CHECKSIG",
                "hex": "2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac",
                "reqSigs": 1,
                "type": "pubkey",
                "addresses": [
                    "RVXhz5UCJfSRoTfa4zvBFBrpDBbqMM21He"
                ]
            }
        },
        {
            "value": 0.00000000,
            "valueSat": 0,
            "n": 4,
            "scriptPubKey": {
                "asm": "OP_RETURN ec4403921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d75a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b50800000000ffffffff",
                "hex": "6a4c6dec4403921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d75a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b50800000000ffffffff",
                "type": "nulldata"
            }
        }
    ],
    "vjoinsplit": []
}
```

</collapse-text>


## oraclesinfo

**oraclesinfo oracletxid**

The `oraclesinfo` method displays information about a specific oracle using `oracletxid`. 

For a list of all `oracletxid`'s available on the asset chain, see the [oracleslist](../customconsensus/oracles.html#oraclelist) method.

### Arguments

| Name | Type | Description | 
| ---------- | -------- | --------------------------------------------------- |
| oracletxid | (string) | the unique identifying transaction id of the oracle |

### Response

| Name | Type | Description | 
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| result      | (string) | whether the command executed successfully                                                                                                               |
| txid        | (string) | the unique txid, or oracletxid, that identifies the oracle                                                                                              |
| name        | (string) | the name of the oracle contract                                                                                                                         |
| description | (string) | the description of the oracle contract                                                                                                                  |
| format      | (string) | a string that identifies the data type accepted for the oracle contract (see [oraclescreate](../customconsensus/oracles.html#oraclescreate))        |
| marker      | (string) | the unmodified public address generated from the oracle contract's privkey                                                                              |
| registered: | (array)  |
| publisher   | (string) | the unique identifier for the publisher (see [oraclesregister](../customconsensus/oracles.html#oraclesregister))                                    |
| baton       | (string) | the baton address of the publisher, which is a CC address (based on the pubkey of the publisher and the EVAL code of the oracle contract) |
| batontxid   | (string) | the most recent baton utxo sent to the baton address; this is the tip of the linked list that connects all data samples for the publisher               |
| lifetime    | (number) | the length of time since publisher's inception                                                                                                          |
| funds       | (number) | the funds committed by subscribers to the publisher's account, and which are used for payouts                                                           |
| datafee     | (number) | the amount a subscriber pays for each data upload                                                                                                       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesinfo 0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "txid": "0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203",
  "name": "NYWTHR",
  "description": "Weather in NYC",
  "format": "L",
  "marker": "RGEug5JPPkERBpqsGSgw6GQPYTB9v9i4Fj",
  "registered": [
    {
      "publisher": "03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5",
      "baton": "RWg43P8s8RtJatAGNa2kV8N2abhQqH93w9",
      "batontxid": "8f3c517d023e42bacfd0de8b0174cdc8adab713d08a689c00067ab171488a575",
      "lifetime": "0.00000000",
      "funds": "0.00000000",
      "datafee": "0.01000000"
    }
  ]
}
```

</collapse-text>


## oraclelist

**oracleslist**

The `oraclelist` method lists all available oracle contracts on the asset chain.

### Arguments

| Name | Type | Description | 
| --------- | ---- | ----------- |
| (none)    |      |

### Response

| Name | Type | Description | 
| ---------- | ------------------ | ------------------------------------ |
| oracletxid | (array of strings) | the unique identifying oracletxid(s) |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD oracleslist
```


<collapse-text hidden title="Response">


```bash
[
    "66fa795f43534e4d6b038c172172a7c46a3cf37b1628e075e38e94a20cfeae5a",
    "79d02351968e6616f3044cb14523d8d2cbdbd1a8b7b75bd14b1aa80ad41a5845",
    "665b893bdb801f77fd6620969371f8fc391df568150f0a671c1c23e67a0cf039",
    "0fa3c6e12ee4be636f44ce4b2af3b0f213d0403dc46cd42add07816526dd46b2",
    "b24a00e2a895baad4c0246ba5b3d36790b43cc0fb5a4c4ea98161299165a8c96",
    "8790ee741042eedce012a46483143e277851754300da7b7171ce46d63d51b3d3",
    "1ba8f3f9e98cbb41af8cb0bf3a6c1953ea5a89bd44455b8e9078f2216e9ed0fc",
    "2353e77dd3ad18bed4ea053055234424ba7c05fb04f97a323859d0445b64ad33",
    "a594a239f29d0df2f27eda05186ac7fdb26302f8268106a04edfde0c1a03b5e8",
    "4dfd22a3a56b274054cc651c70dc0b35778a3eb12ba025598f4510669b8e88c8",
    "0ae8cf1b008f7c652c1e85aa45832aac8dc62cfd8d73105800f4e3603d4cc15f",
    "7eaa75392e3b634ebf9eb4a67455dedeb503cdd235c932ec49559906394d89c5",
    "59e44ee58435f01dbbadd1ac54f7e6d5e1323c52561e3ab656555b099886217f",
    "e953e88d3f1713aed28510d9bff85e3a09cc96107f1122f1f244273ab1196ca6",
    "128e6c6fa4cde1be654da5f006caf341415e0d19300f7c33578d7f5242bdf033",
    "104f701ccd6cd78b347d68a461bc45031e56cbdbdd895662e3fbc48c8335feb0",
    "161bdf47cc246a4b725676c4c3d08a685ccca8edba11edfbd9c90205bc555212",
    "4a32675232ff020c0ef868ff167ae17754823899bee7b5e96fac210c7030573f",
    "57600b613c7355e768323c7197910ca45ed713b14ed4fdf01a5181bfa1d55753",
    "9755eede3831f003bc1425bdfa9f7f889befd6b8ce7028b17f50c30b0d8088d1",
    "8ed3b092677aec71169a7a11fdfbfe0a855e8120af0ae1ea2d97eb7cfd29835e",
    "03d9e6b199173935c57ebffee93fa1ac91b809e268f50610f31fa14253f7f7bc",
    "0803edf92f40541cf988c2ca1e0bfee6902a5ccf60bbf90bed51cff8a4f91489",
    "482be3ce8bf8607bd501a5aed3018770420a9f6dc48ee21fe423b09d5fe19f16",
    "65fe29870b7ea766365b7c55881f4246ab8d84cba865f3bffa9c1f1e92f97113",
    "8a0810bba8fdf8e0fe20d07ea618bc4810657d1b5aafdc7362b67be1aebf1cf3",
    "0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203"
]
```

</collapse-text>


## oraclesregister

**oraclesregister oracletxid datafee**

A user executes the `oraclesregister` method to register as a data publisher for an existing oracle contract.

The `datafee` property is set in satoshis, and should be `>=` the chain's default transaction fee.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

::: tip
Use `./komodo-cli -ac_name=YOURNAME getrawmempool` to verify the transaction is confirmed.
:::

::: tip
After the transaction confirms, use `oraclesinfo` to output registration information about your oracles plan
:::

### Arguments

| Name | Type | Description | 
| ---------- | --------- | ------------------------------------------------------------------------------------------- |
| oracletxid | (string)  | the unique identifying transaction id of the oracle                                         |
| datafee    | (numbers) | the fee required of a subscriber for each data point the publisher publishes in this oracle |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result:   | (string) | whether the command succeeded                                                                        |
| hex:      | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Set your parameters to create a raw transaction and get the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD oraclesregister 0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203 1000000
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "010000000103921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d010000004847304402207241f313ef2fb65d9eb1f870068ceba436f14996ce79d16ff85f2937c75357ee022025f0b888e742546469ad0b7fae9b85cf7c89cddf307170bbcf794e5e90ae28b101ffffffff04102700000000000023210203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70dac1027000000000000302ea22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401cc071240a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000004f6a4c4cec5203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b540420f000000000000000000"
}
```

</collapse-text>


Step 2: Send/broadcast the raw transaction hex

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000103921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d010000004847304402207241f313ef2fb65d9eb1f870068ceba436f14996ce79d16ff85f2937c75357ee022025f0b888e742546469ad0b7fae9b85cf7c89cddf307170bbcf794e5e90ae28b101ffffffff04102700000000000023210203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70dac1027000000000000302ea22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401cc071240a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000004f6a4c4cec5203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b540420f000000000000000000
```


<collapse-text hidden title="Response">


```bash
8f3c517d023e42bacfd0de8b0174cdc8adab713d08a689c00067ab171488a575
```

</collapse-text>


Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 010000000103921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d010000004847304402207241f313ef2fb65d9eb1f870068ceba436f14996ce79d16ff85f2937c75357ee022025f0b888e742546469ad0b7fae9b85cf7c89cddf307170bbcf794e5e90ae28b101ffffffff04102700000000000023210203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70dac1027000000000000302ea22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401cc071240a804000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000004f6a4c4cec5203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b540420f000000000000000000
```


<collapse-text hidden title="Response">


```json
{
  "txid": "8f3c517d023e42bacfd0de8b0174cdc8adab713d08a689c00067ab171488a575",
  "size": 356,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203",
      "vout": 1,
      "scriptSig": {
        "asm": "304402207241f313ef2fb65d9eb1f870068ceba436f14996ce79d16ff85f2937c75357ee022025f0b888e742546469ad0b7fae9b85cf7c89cddf307170bbcf794e5e90ae28b101",
        "hex": "47304402207241f313ef2fb65d9eb1f870068ceba436f14996ce79d16ff85f2937c75357ee022025f0b888e742546469ad0b7fae9b85cf7c89cddf307170bbcf794e5e90ae28b101"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 0,
      "scriptPubKey": {
        "asm": "0203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d OP_CHECKSIG",
        "hex": "210203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70dac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RGEug5JPPkERBpqsGSgw6GQPYTB9v9i4Fj"]
      }
    },
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "a22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c80200648c12e7e058c98f0a5cc288ac271ad08bd493e1fb7de83edeea69789338fc58103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RWg43P8s8RtJatAGNa2kV8N2abhQqH93w9"]
      }
    },
    {
      "value": 200.02640391,
      "valueSat": 20002640391,
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
        "asm": "OP_RETURN ec5203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b540420f00000$0000",
        "hex": "6a4c4cec5203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b540420f000000000$",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": []
}
```

</collapse-text>


## oraclessamples

**oraclessamples oracletxid batonutxo num**

The `oraclessample` method fetches data samples from a publisher.

The user indicates the desired publisher by inserting the `batonutxo` by the publisher. Use [oraclesinfo](../customconsensus/oracles.html#oraclesinfo) to find a list of publishers and their current batonutxo's.

### Arguments

| Name | Type | Description | 
| ---------- | -------- | ------------------------------------------------------------------------- |
| oracletxid | (string) | the unique identifying transaction id of the oracle contract              |
| batonutxo  | (string) | the baton transaction id, which can be found using the oraclesinfo method |
| num        | (number) | the number of sample data points required                                 |

### Response

| Name | Type | Description | 
| ------------- | ------------------ | ----------------------------------------- |
| result        | (string)           | whether the command executed successfully |
| samples:      | (array of strings) |
| "XXXXXXXXXXX" | (string)           | a sample data point                       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclessamples 0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203 abb4fc6d7fbff88c09b35fc40d96e3a04a891fbf3a2f21e8b8536acbd95d75d7 2
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "samples": [["4982091690320855040"], ["18446744069414584320"]]
}
```

</collapse-text>


## oraclessubscribe

**oraclessubscribe oracletxid publisher amount**

The user executes `oraclessubscribe` to subscribe to a publisher of an oracle plan.

Every publisher must have at least one subscriber before the [oraclesdata](../customconsensus/oracles.html#oraclesdata) can successfully execute.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

The `sendrawtransaction` method then returns a unique txid, also called the `oraclesubscribtiontxid`, or the id of the oracle subscription transaction. This can be used for further development purposes.

::: tip
If the **datafee** is 10 COINS and the `amount` submitted is 1000 COINS, the publisher can publish data 100 times based on this amount.
:::

### Arguments

| Name | Type | Description | 
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| oracletxid | (string) | the unique identifying transaction id of the oracle                                                                                                   |
| publisher  | (string) | the unique publisher id, which can be found using the oraclesinfo method                                                                              |
| amount     | (number) | the total amount of funds the subscriber commits to pay for data upload by the publisher; this amount is immediately withdrawn from the user's wallet |

### Response

| Name | Type | Description | 
| --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| result    | (string) | whether the command succeeded                                                                        |
| hex       | (string) | a raw transaction in hex-encoded format; you must broadcast this transaction to complete the command |

#### :pushpin: Examples

Step 1: Subscribe to an oracle plan and get the hex value:

```bash
./komodo-cli -ac_name=HELLOWORLD oraclessubscribe 0df7c4d844f08dba08abd4bb174558739f17cfe268feb005fb6333b3761d9203 03810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5 1
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "hex": "010000000175a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f0200000048473044022006449e2f324ba8c262ca73eea4642f77ccf906fee5bab4fdc85bcc8c350ce81b022047d76840076f6e02aebe77ffb59b052974badb8747c7b435fd77351fcfbee95e01ffffffff0400e1f50500000000302ea22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401cc102700000000000023210203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70dace7e249a204000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000004f6a4c4cec5303921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b500e1f5050000000000000000"
}
```

</collapse-text>


Step 2: Send raw transaction / broadcast the hex value

```bash
./komodo-cli -ac_name=HELLOWORLD sendrawtransaction 010000000175a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f0200000048473044022006449e2f324ba8c262ca73eea4642f77ccf906fee5bab4fdc85bcc8c350ce81b022047d76840076f6e02aebe77ffb59b052974badb8747c7b435fd77351fcfbee95e01ffffffff0400e1f50500000000302ea22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401cc102700000000000023210203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70dace7e249a204000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000004f6a4c4cec5303921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b500e1f5050000000000000000
```


<collapse-text hidden title="Response">


```bash
2d4d5f3bb45ecd56d5c9d16773fbb910f975c398c1dc1445aacfe9b8b976db59
```

</collapse-text>


Step 3: Decode raw transaction (optional to check if the values are sane)

```bash
./komodo-cli -ac_name=HELLOWORLD decoderawtransaction 010000000175a5881417ab6700c089a6083d71abadc8cd74018bded0cfba423e027d513c8f0200000048473044022006449e2f324ba8c262ca73eea4642f77ccf906fee5bab4fdc85bcc8c350ce81b022047d76840076f6e02aebe77ffb59b052974badb8747c7b435fd77351fcfbee95e01ffffffff0400e1f50500000000302ea22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401cc102700000000000023210203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70dace7e249a204000000232103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b5ac00000000000000004f6a4c4cec5303921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b500e1f5050000000000000000
```


<collapse-text hidden title="Response">


```json
{
  "txid": "2d4d5f3bb45ecd56d5c9d16773fbb910f975c398c1dc1445aacfe9b8b976db59",
  "size": 356,
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "8f3c517d023e42bacfd0de8b0174cdc8adab713d08a689c00067ab171488a575",
      "vout": 2,
      "scriptSig": {
        "asm": "3044022006449e2f324ba8c262ca73eea4642f77ccf906fee5bab4fdc85bcc8c350ce81b022047d76840076f6e02aebe77ffb59b052974badb8747c7b435fd77351fcfbee95e01",
        "hex": "473044022006449e2f324ba8c262ca73eea4642f77ccf906fee5bab4fdc85bcc8c350ce81b022047d76840076f6e02aebe77ffb59b052974badb8747c7b435fd77351fcfbee95e01"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 1.0,
      "valueSat": 100000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "a22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401 OP_CHECKCRYPTOCONDITION",
        "hex": "2ea22c802092392e766d63f73dd7c68ff9eaf9f009f13b17c4167472e8aebb00d96be66aa68103120c008203000401cc",
        "reqSigs": 1,
        "type": "cryptocondition",
        "addresses": ["RTk2Tgp1iAcxxSeuXYDREmtfydMvNkCmq8"]
      }
    },
    {
      "value": 0.0001,
      "valueSat": 10000,
      "n": 1,
      "scriptPubKey": {
        "asm": "0203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d OP_CHECKSIG",
        "hex": "210203921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70dac",
        "reqSigs": 1,
        "type": "pubkey",
        "addresses": ["RGEug5JPPkERBpqsGSgw6GQPYTB9v9i4Fj"]
      }
    },
    {
      "value": 199.02620391,
      "valueSat": 19902620391,
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
        "asm": "OP_RETURN ec5303921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b500e1f50500000000",
        "hex": "6a4c4cec5303921d76b33363fb05b0fe68e2cf179f73584517bbd4ab08ba8df044d8c4f70d2103810d28146f60a42090991b044fe630d1664f3f8f46286c61e7420523318047b500e1f50500000000",
        "type": "nulldata"
      }
    }
  ],
  "vjoinsplit": []
}
```

</collapse-text>

