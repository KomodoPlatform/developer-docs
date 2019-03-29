# Coin Features

## balance

This will display the balance of a specific smartaddress for barterDEX trading. The idea of the barterDEX balance are, `utxo`. That are "hot" / "live" ready for trading. It is the analogue of funds in an exchange account. This will not show your full wallet balance, and you wouldn't want the exchange account balance to show the amount of all your coins, including the ones not deposited in the exchange. Edit the file with coin `name` and `smartaddress` and it will display balance of your smartaddress(s).

KMD balance will display `zcredits` as well.

Sample File Contents:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"balance\",\"coin\":\"KMD\",\"address\":\"RHV2As4rox97BuE3LK96vMeNY8VsGRTmBj\"}"
```

Sample Output:

```json
{
    "result": "success",
    "coin": "KMD",
    "address": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "balance": 360.33996021,
    "zcredits": 0,
    "zdebits": {
        "swaps": [],
        "pendingswaps": 0
    }
} {
    "result": "success",
    "coin": "REVS",
    "address": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "balance": 39.10219798
} {
    "result": "success",
    "coin": "BTC",
    "address": "126nKAnGxWtsfPoxGh1snvbtLitkstZbvV",
    "balance": 0.00400000
}
```

## balances

This method will display balance of all active coins in your wallet. No need to use a curl script for a specific coin and address.

Sample File Content:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"balances\"}"
```

Sample Output:

```json
[
  {
    "coin": "BTC",
    "balance": 0.004
  },
  {
    "coin": "KMD",
    "balance": 360.33996021
  },
  {
    "coin": "MNZ",
    "balance": 55.7075604
  },
  {
    "coin": "REVS",
    "balance": 39.10219798
  },
  {
    "coin": "JUMBLR",
    "balance": 1.12038776
  },
  {
    "coin": "SUPERNET",
    "balance": 0.914309
  },
  {
    "coin": "PANGEA",
    "balance": 1
  },
  {
    "coin": "DEX",
    "balance": 1
  },
  {
    "coin": "BET",
    "balance": 1
  },
  {
    "coin": "CRYPTO",
    "balance": 1
  },
  {
    "coin": "HODL",
    "balance": 1
  },
  {
    "coin": "BOTS",
    "balance": 1
  },
  {
    "coin": "COQUI",
    "balance": 10.85596031
  }
]
```

## calcaddress

Useful to get your private key for specific seed passphrase for any supported coin or asset except ETH & ERC20 tokens for now. Edit the passphrase section and change the word `default` with your own seed passphrase and coin name. We used Digibyte (DGB) as example.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"calcaddress\",\"passphrase\":\"default\",\"coin\":\"DGB\"}"
```

Sample Output: This output is based on the passphrase `default`. Change that to your seed passphrase to get your desired private key.

```json
{
  "passphrase": "default",
  "pubsecp": "03562035ac51f940b7f6e1e390df91fb0fe7f59f99acf8f6f389d9472a14797b5f",
  "coinaddr": "DKRQHUtFhFfViZPCcCut3uB45cATTXXBMh",
  "p2shaddr": "3FyKfmS3wk5bGiu2ziauvmNPLzisePpY3W",
  "privkey": "30a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0684f",
  "wif": "KxrJKHQ7phDnVnsbs2XEZUeWxjH3zSG6SzftyQGfojEG7ZkU9Zsn"
}
```

## fundvalue

`fundvalue` will process `"holdings":[]` array and also do an internal balances api call if `address` is specified. This will only work for watchonly addresses that have been rescanned and with active coins. In order for external addresses to work, you need to have `importaddress` and `rescan` done, for obvious reasons, in native mode. SPV mode should just work without that.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"fundvalue\",\"address\":\"RRyyejME7LRTuvdziWsXkAbSW1fdiohGwK\"}"
```

Sample Output:

```json
{
  "holdings": [
    {
      "coin": "KMD",
      "KMD": 6000000
    },
    {
      "coin": "REVS",
      "error": "no price source"
    },
    {
      "coin": "JUMBLR",
      "KMD": 4177502.22193679
    },
    {
      "coin": "SUPERNET",
      "error": "no price source"
    },
    {
      "coin": "PANGEA",
      "error": "no price source"
    },
    {
      "coin": "DEX",
      "error": "no price source"
    },
    {
      "coin": "BET",
      "error": "no price source"
    },
    {
      "coin": "CRYPTO",
      "error": "no price source"
    },
    {
      "coin": "HODL",
      "error": "no price source"
    },
    {
      "coin": "MSHARK",
      "error": "no price source"
    },
    {
      "coin": "BOTS",
      "error": "no price source"
    }
  ],
  "fundvalue": 10177502.22193679
}
```

## getrawtransaction

barterDEX now has `getrawtransaction` API for any installed coin and will use Electrum or native depending on whether electrum was called, that should help us directly issue Electrum for the oversized txid and directly cause any overflows.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"getrawtransaction\",\"coin\":\"KMD\",\"txid\":\"107a2683abbfa9188f78e17d3bcba66ece5bd7cbe105ab5bbaae79364159e84d\"}"
```

## inuse

This API will return you all the UTXOs that are locked for swaps. The UTXOs that are locked for swaps are not spendable until they become free. The lock is basically for about 2 minutes, after that the UTXOs becomes free.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"inuse\"}"
```

Sample Output:

```json
[
  {
    "expiration": 1520277125,
    "txid": "74a9f85dc372c3941bdfa7bc517f209db11c2fbdf7c83df3f4c8ccf15afa9e75",
    "vout": 1
  },
  {
    "expiration": 1520277125,
    "txid": "46f021a999b5f62fc42afeb431d09c85a2f2bc113aa23b5142cafb868a877bd0",
    "vout": 1
  }
]
```

## listtransactions

This API just passes through the call to native mode and filters out any with a different address. For spv it just returns the SPV history.

Sample File Content:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"listtransactions\",\"coin\":\"JUMBLR\",\"address\":\"RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ\"}"
```

Sample output using Native mode:

```json
[
  {
    "account": "",
    "address": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "category": "receive",
    "amount": 0.26042583,
    "vout": 0,
    "confirmations": 8904,
    "blockhash": "00009eeaa7458a5d781830c166158481fda6ae039450607f90e239d839694050",
    "blockindex": 2,
    "blocktime": 1521983789,
    "txid": "2ff201697e8486865638d35f4de796ce025ec72734c4053a6b835dfb50340ca9",
    "walletconflicts": [],
    "time": 1521983789,
    "timereceived": 1522155873,
    "vjoinsplit": [],
    "size": 300
  },
  {
    "account": "",
    "address": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "category": "receive",
    "amount": 0.00203615,
    "vout": 1,
    "confirmations": 5955,
    "blockhash": "00000e1d26d1e13cb9c9456f2f2112fd2c3079fbdf66a88dbbf96db6114aecfe",
    "blockindex": 1,
    "blocktime": 1522161804,
    "txid": "2235aa0b2beed7b2a79619df044912af3baec026cda6a4eb00c9de5b6a1f6788",
    "walletconflicts": [],
    "time": 1522161801,
    "timereceived": 1522161801,
    "vjoinsplit": [],
    "size": 223
  },
  {
    "account": "",
    "address": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "category": "send",
    "amount": -0.00203615,
    "vout": 1,
    "fee": -1e-5,
    "confirmations": 5955,
    "blockhash": "00000e1d26d1e13cb9c9456f2f2112fd2c3079fbdf66a88dbbf96db6114aecfe",
    "blockindex": 1,
    "blocktime": 1522161804,
    "txid": "2235aa0b2beed7b2a79619df044912af3baec026cda6a4eb00c9de5b6a1f6788",
    "walletconflicts": [],
    "time": 1522161801,
    "timereceived": 1522161801,
    "vjoinsplit": [],
    "size": 223
  },
  {
    "involvesWatchonly": true,
    "account": "",
    "address": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "category": "receive",
    "amount": 14.4499848,
    "vout": 0,
    "confirmations": 4278,
    "blockhash": "0000f759c96b9c866e6417bb3c653e323feea999ce1dabcc27c007f72543f14c",
    "blockindex": 1,
    "blocktime": 1522261902,
    "txid": "6b2b506cffe3423e25d3519c64a5279213993e0d235ff89cbb3bf53be7a727fb",
    "walletconflicts": [],
    "time": 1522261807,
    "timereceived": 1522261807,
    "vjoinsplit": [],
    "size": 300
  },
  {
    "involvesWatchonly": true,
    "account": "",
    "address": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "category": "send",
    "amount": -14.4499848,
    "vout": 0,
    "fee": -1e-5,
    "confirmations": 4278,
    "blockhash": "0000f759c96b9c866e6417bb3c653e323feea999ce1dabcc27c007f72543f14c",
    "blockindex": 1,
    "blocktime": 1522261902,
    "txid": "6b2b506cffe3423e25d3519c64a5279213993e0d235ff89cbb3bf53be7a727fb",
    "walletconflicts": [],
    "time": 1522261807,
    "timereceived": 1522261807,
    "vjoinsplit": [],
    "size": 300
  }
]
```

Sample output using SPV mode:

```json
[
  {
    "tx_hash": "7c536b8f3d1e33f110ae62399f181b4c5af9a16938b1ecef59f48c226dd2a9be",
    "height": 8285
  },
  {
    "tx_hash": "f3169db98c3b7263130d8d0d91aa17df361b76737f8df8363e3b4caeb1afaa55",
    "height": 8288
  },
  {
    "tx_hash": "24874d70f3cfa5ae3a1c31916af7bdc6cb6d6fe5d428a12873c373db703bd101",
    "height": 8833
  },
  {
    "tx_hash": "9281bcfc9c3262cb3e6d8440fd0250357a8660a24aa22abeca8ce7512c0cf111",
    "height": 9012
  },
  {
    "tx_hash": "c3561504f2ce0af8f5c63fa01424d6acb5576caddfa543dc3e16301d51f744f6",
    "height": 9013
  },
  {
    "tx_hash": "dce11261eaae611347a5967ea727f0bc0a3ee87e11250ad2ef0758a999d7e920",
    "height": 9602
  },
  {
    "tx_hash": "afc2fd0991bdef89da2cd1018c86ab56a5989c6f2b1d4e40861e88bc6125cbec",
    "height": 10076
  }
]
```

## listunspent

barterDEX uses `utxo` pairs instead of total balance to do the trading. For this the balance has be broken down and fund the address using 1x, 1.2x & 0.1x ratio. It is due to the nature of atomic swap protocol that is bartering specific utxo and the need for two utxo per atomic swap. **Analogy: If you need a quarter and a dime, exactly to make a purchase, is it possible to use just a single coin? barterDEX is swapping PAIRS (as in two) utxos.** `./listunspent` Gives similar output like your coin wallet. It will list all the unspent transactions (`utxo`) you have in a given coin wallet smartaddress.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"listunspent\",\"coin\":\"CHIPS\",\"address\":\"RDoMmoCM5AcEH6Yf5vqKbqRjD1fLcQHuWb\"}"
```

Sample Output:

```json
[
  {
    "tx_hash": "873e12d89eb9a25c1c40f0301b77414da0567982e3a06ce55a3501ff726bd253",
    "tx_pos": 1,
    "height": 534479,
    "value": "1251800000"
  },
  {
    "tx_hash": "8a62bb10f700c16629a52ad0dc8c730490de3038e30af82b1a706c91f337d968",
    "tx_pos": 1,
    "height": 535408,
    "value": "11000000"
  },
  {
    "tx_hash": "8848abd97daca43c702dbb176dac50d85261449c808f19324f5be1b4a495ad69",
    "tx_pos": 1,
    "height": 535379,
    "value": "11000000"
  },
  {
    "tx_hash": "79684e9c19c996292ad4a25c9dc05c89a3a9243af1b83727362bb2e2f92e08f6",
    "tx_pos": 1,
    "height": 534027,
    "value": "1012700000"
  }
]
```

## secretaddresses

It will display secret 10 addresses with their private keys for a given `pubtype`. You can change the `num`, `pubtype` etc by editing the script.

Sample File Contents:

```bash
echo "usage: ./secretaddresses 'passphrase'"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"secretaddresses\",\"num\":16,\"passphrase\":\"$1\"}"
```

Sample Output:

```bash
usage: ./secretaddresses 'passphrase'
{"R9oeSNXqR499PFz2BgUeZJvSsp331TFDYi":"UxKrG3xxxxxx",
"RX7sUCvxV45LmrmVRvkbm8kUedFqhXgqtt":"UuNeHYexxxxxx",
"RRKf3RnmbNDnCfC6P7HHYNBJuRrVxEm7Db":"UsXUNtmxxxxxx",
"RSo6exWzMbnGnwM4b3WcT1MvxvnRuRSURP":"UsFuDaWxxxxxx",
"RRve3cdBJPF2dcT6uD8gT2Bfhg7ZU9krFU":"Uw1Xbcoxxxxxx",
"REkV8JMBuLFTjYH93QfJ4UpmoLw85LomP4":"UpYxoFMxxxxxx",
"RKJ6vpCTYjDCoyrLyuxJRvjiraM5ZEwos5":"Urin6VUxxxxxx",
"RDHo38pWxDEvqx99C2aJhprHQwf9bYoKRE":"UuNsFyBxxxxxx",
"RLGRaoQ7FCu8dk653CMR4nLiRnfYZiXb7D":"UvT2utaxxxxxx",
"RJABFzJzBNoPUGZrMBcBfL5UqYjY8hptJU":"UsoAJqRxxxxxx",
"RN2TRHQBFWMB9G1MkHKdYbg4oU7ToxRTdB":"UqNiGgAxxxxxx",
"RJYuYeXAnWoVPbgHpc1rtxkoBWFCtzib1E":"Uqeaxmzxxxxxx",
"RXkZYAD13G89foJbN7uHpD2A2oZJaDTMzr":"UqejSkPxxxxxx",
"RUfuMah7a9QXar5XcJpage4S7jtoiL99Kv":"Uq7e4Hdxxxxxx",
"RTS385Ny2feDBgLGzrAPRw2Q7u5jpv9jZs":"UvUcSEPxxxxxx",
"RP7haeUQv56FW9X6W1rRbhbqvXPyvX23Fi":"UpqRcKMxxxxxx"}
```

## sendrawtransaction

This method will broadcast a raw transaction over the network. Uses tx-hex from `./withdraw` API output.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sendrawtransaction\",\"coin\":\"KMD\",\"signedtx\":\"$1\"}"
```

## supernet

`supernet` script uses the `balances` API and returs all SuperNET aseet balances along with KMD for a specific address. In order for external addresses to work, you need to have `importaddress` and `rescan` done, for obvious reasons, in native mode. SPV mdoe just works without that.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"balances\",\"address\":\"RRyyejME7LRTuvdziWsXkAbSW1fdiohGwK\"}"
```

Sample Output:

```json
[
  {
    "coin": "KMD",
    "balance": 6000000
  },
  {
    "coin": "REVS",
    "balance": 6335.955
  },
  {
    "coin": "JUMBLR",
    "balance": 239022.389
  },
  {
    "coin": "SUPERNET",
    "balance": 6335.955
  },
  {
    "coin": "PANGEA",
    "balance": 602828.1464
  },
  {
    "coin": "DEX",
    "balance": 257733
  },
  {
    "coin": "BET",
    "balance": 2688
  },
  {
    "coin": "CRYPTO",
    "balance": 320754.737
  },
  {
    "coin": "HODL",
    "balance": 70000
  },
  {
    "coin": "MSHARK",
    "balance": 385403.9
  },
  {
    "coin": "BOTS",
    "balance": 288157
  }
]
```

## timelock and unlockedspend

BarterDEX now has a coin agnostic timelock/unlock mechanism. Of course the coin will need to support CLTV or it wont work. The timelock will work partially, but the unlockspend will NOT. Test with small amount. Don't confuse these APIs with 0conf deposit and claim.

Sample file content:

`timelock`

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"timelock\",\"coin\":\"KMD\",\"duration\":1000,\"amount\":1}"
```

`unlockedspend`

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"unlockedspend\",\"coin\":\"KMD\",\"txid\":\"e858e382a816b4cab22e3fd3e29901c7ef497cd1fdad7683314cc9187eca34fd\"}"
```

`timelock` API is pretty simple, just specify coin, duration in seconds and the amount. An extra txfee will be added to amount so the unlockspend can send the specified amount. there is an optional `destaddr` field that will allow you to send to any address. Like `withdraw`, `timelock` will not actually broadcast the tx, so you need to use `sendrawtransaction` to actually broadcast it.

Once its broadcast, and the time lock expires, you can do an `unlockedspend` using just the coin and the txid. The requirement is that it must be sent to your smartaddress that you are logged into and it will only just unlock and send to yourself.

## withdraw

To withdraw, you just need to specify the array of outputs and the coin. It returns the `rawtx`, the signed transaction in `hex` the `txid` and if it was complete or not. All inputs are assumed to be standard pay to `pubkeyhash`, having other non-standard `utxo` will make it create invalid rawtx. Withdrawing ETH/ERC20 tokens works using different parameters (please see [eth_withdraw](./coinfeatures.html#eth-withdraw),).

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"coin\":\"KMD\",\"outputs\":[{\"RUgW6fLfVsLJ87Ng4zJTqNedJSKYQ9ToAf\":0.001}, {\"RUgW6fLfVsLJ87Ng4zJTqNedJSKYQ9ToAf\":0.002}],\"broadcast\":1}"
```

Sample Output:

```json
{
    "method": "withdraw",
    "coin": "KMD",
    "outputs": [
        {
            "RUgW6fLfVsLJ87Ng4zJTqNedJSKYQ9ToAf": 0.00100000
        },
        {
            "RUgW6fLfVsLJ87Ng4zJTqNedJSKYQ9ToAf": 0.00200000
        }
    ]
} -> f6b04d157c007bf688822a73c754934f53cf28516f64dc64372fa397789e9ce1
    {
    "rawtx": "0100000001b5384fc2f0b737a17239eaf2172bf24c4f410f720e672c3f56a9b5a8e0b33a910100000000ffffffff03a0860100000000001976a914d4d2ffc812cdce0c30c5184e8ea1deb7bfeb5b3888ac400d0300000000001976a914d4d2ffc812cdce0c30c5184e8ea1deb7bfeb5b3888ac06771300000000001976a91459fdba29ea85c65ad90f6d38f7a6646476b26b1688ac7dd4e359",
    "hex": "0100000001b5384fc2f0b737a17239eaf2172bf24c4f410f720e672c3f56a9b5a8e0b33a91010000006b483045022100df405fe4f79e66052a952968b93ed3f56b2fc75908a90c70d9d409b4da45996902200b9136063fcdb0bfdfeb09801d2fcbb0658236d69135711a20ac4aa50c8d3bf0012102ebc786cb83de8dc3922ab83c21f3f8a2f3216940c3bf9da43ce39e2a3a882c92ffffffff03a0860100000000001976a914d4d2ffc812cdce0c30c5184e8ea1deb7bfeb5b3888ac400d0300000000001976a914d4d2ffc812cdce0c30c5184e8ea1deb7bfeb5b3888ac06771300000000001976a91459fdba29ea85c65ad90f6d38f7a6646476b26b1688ac7dd4e359",
    "txid": "f6b04d157c007bf688822a73c754934f53cf28516f64dc64372fa397789e9ce1",
    "complete": true
}
```

If the last output is doing a withdraw to the smartaddress, it is combined with change. Here are two sample console output below. The first one is withdrawing 10 KMD to the same smartaddress. Second one is 10 & 10.0001 KMD withdraw to the same smartaddress. The last output is increased by 0.0001 & change combined in both example.

```bash
vout.0 10.00010000 -> total 10.00020000
dustcombine.0 numpre.0 min0.(nil) min1.(nil) numutxos.172 amount 10.00020000
minutes.381 tiptime.1514745296 locktime.1514722428
46bbfbe93ebfc0a9262143193fe50d5c9ce5c2739da768ce8b5ec919ffaa570f/0 40.01342800 interest 0.00122360 -> sum 0.00122360
numunspents.171 vini.0 value 40.01342800, total 40.01342800 remains -30.01322800 interest 0.00122360 sum 0.00122360 46bbfbe93ebfc0a9262143193fe50d5c9ce5c2739da768ce8b5ec919ffaa570f/v0
set inuse until 1514746673 lag.600 for 46bbfbe93ebfc0a9262143193fe50d5c9ce5c2739da768ce8b5ec919ffaa570f/v0
change 30.01445160 = total 40.01465160 - amount 10.00020000, adjust 0.00000000 numvouts.1
combine last vout 10.00010000 with change 30.01445160
LP_withdraw.KMD {"method":"withdraw","coin":"KMD","outputs":[{"RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ":10.00010000}]} -> d3f32d814e20edcbc0c654eec79d0399b38b907ecc8cb9418da17a543d299e17
```

```bash
vout.0 10.00000000 -> total 10.00010000
vout.1 10.00010000 -> total 20.00020000
dustcombine.0 numpre.0 min0.(nil) min1.(nil) numutxos.172 amount 20.00020000
numunspents.171 vini.0 value 40.01455160, total 40.01455160 remains -20.01435160 interest 0.00000000 sum 0.00000000 d3f32d814e20edcbc0c654eec79d0399b38b907ecc8cb9418da17a543d299e17/v0
set inuse until 1514747480 lag.600 for d3f32d814e20edcbc0c654eec79d0399b38b907ecc8cb9418da17a543d299e17/v0
change 20.01435160 = total 40.01455160 - amount 20.00020000, adjust 0.00000000 numvouts.2
combine last vout 10.00010000 with change 20.01435160
LP_withdraw.KMD {"method":"withdraw","coin":"KMD","outputs":[{"RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ":10}, {"RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ":10.00010000}]} -> f24361b13b7f0188ea422572b882c0df50bef2a33bf8aed7bf0776946332cece
```

## eth_withdraw

This method is required to withdraw ETH/ERC20 coin/tokens. Similar functionality to `withdraw` for Bitcoin protocol based coins.

```bash
curl --url "http://127.0.0.1:7783 " --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DEC8\",\"to\":\"0xbAB36286672fbdc7B250804bf6D14Be0dF69fa29\",\"amount\":1000}"
```

## opreturn

`OP_RETURN` is just built into the `withdraw` API. If an `"opreturn":"<hex>"` is defined, it will create an OP_RETURN with the binary of the hex. Without `outputs` value, it will return `{"error":"withdraw needs to have outputs"}`. There is encryption to the opreturn mode of withdraw. Basically if you specify a non-null passphrase, it encrypts with that passphrase and you will need that passphrase to decode it. The second parameter in the first example script is the passphrase. So, if you don't specify it, it is unencrypted.

3 different sample scripts:

```bash
curl -X POST --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"coin\":\"COQUI\",\"passphrase\":\"$2\", \"opreturn\":\"$(echo -n "$1" | od -A n -t x1 | perl -pe 's/\W+//g')\"}"
```

```bash
curl -X POST --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"coin\":\"COQUI\",\"outputs\":[{\"RGCVXhUxepCxh77thy7XgMrQ5XU9u7SWSR\":0.01}], \"opreturn\":\"$(echo -n "$1" | od -A n -t x1 | perl -pe 's/\W+//g')\"}"
```

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"coin\":\"KMD\",\"outputs\":[{\"RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ\":$1}], \"opreturn\":\"deadbeef\"}"
```

Sample Output:

```json
{
  "rawtx": "01000000029059515dd331b448b213c12e607b4f104a025f9461d1c094d98010a06406b62d0100000000ffffffff6843fc7a13218df69cd7e03c64af2cefae7b1121ed55206da21c57d5665c8b640100000000ffffffff02565c1700000000001976a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac0000000000000000066a04deadbeef1a69a05a",
  "hex": "01000000029059515dd331b448b213c12e607b4f104a025f9461d1c094d98010a06406b62d010000006b483045022100d80b9fcf9561c889bcdbab79d2215e1fe66118ad1c1d1e8ec5421ced6b2de2ad02206ef83ed458e974ecc8fa9b667e34ab571b06f5e62dd83bff37c00ab5e372bdef012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcffffffff6843fc7a13218df69cd7e03c64af2cefae7b1121ed55206da21c57d5665c8b64010000006b483045022100ec7c86079d1ce7512a835d81cedd850028e297ce22841ae925d5aceaff6f5e78022045a09dcad77f0bcc6d9d85f27ca9c13ba407c0c7968f85c50887b231067050e3012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcffffffff02565c1700000000001976a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac0000000000000000066a04deadbeef1a69a05a",
  "tx": {
    "version": 1,
    "locktime": 1520462106,
    "vin": [
      {
        "txid": "2db60664a01080d994c0d161945f024a104f7b602ec113b248b431d35d515990",
        "vout": 1,
        "scriptPubKey": {
          "hex": "76a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac"
        }
      },
      {
        "txid": "648b5c66d5571ca26d2055ed21117baeef2caf643ce0d79cf68d21137afc4368",
        "vout": 1,
        "scriptPubKey": {
          "hex": "76a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac"
        }
      }
    ],
    "vout": [
      {
        "satoshis": "1530966",
        "scriptPubKey": {
          "hex": "76a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac"
        }
      },
      {
        "satoshis": "0",
        "scriptPubKey": {
          "hex": "6a04deadbeef"
        }
      }
    ]
  },
  "txid": "4e2a338232d13643cdbd6fb0c47d649b9c1842284a78ab6ca9cf03088f3dc0cc",
  "complete": true
}
```

## opreturndecrypt

This method will decrypt the encrypted [OP_RETURN](./coinfeatures.html#opreturn) easily.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"opreturndecrypt\",\"coin\":\"KMD\",\"txid\":\"06e59c6e9217ef1e526a1419e231e5f927689765feab9cd48167e089301f6fc2\",\"passphrase\":\"test\"}"
```

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"opreturndecrypt\",\"coin\":\"KMD\",\"txid\":\"34bf4bc2247e43c0c6a2223b79d3f1a3e9962102fb4a563612e5bbb91fb85348\",\"passphrase\":\"test\"}"
```

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"opreturndecrypt\",\"coin\":\"KMD\",\"txid\":\"a9e94e6890d6998b3c2b89685e8c7c2b9e380a53fb813192701d0966480807eb\",\"passphrase\":\"test\"}"
```

Sample Output:

```json
{
  "coin": "KMD",
  "opreturntxid": "06e59c6e9217ef1e526a1419e231e5f927689765feab9cd48167e089301f6fc2",
  "opreturn": "6a4c4c4c0058501c2c290f7241932a8b4614b844bae28cc3117eeb79d5c0c900000000000000000000000000000000a30dc015ac4e4085f0cdb2c7cc24bca01d771449912d2982d7e9401ef52e5a81",
  "result": "success",
  "decrypted": "68656c6c6f2c20776f726c6474657374",
  "original": "hello, worldtest"
}
```

```json
{
  "coin": "KMD",
  "opreturntxid": "34bf4bc2247e43c0c6a2223b79d3f1a3e9962102fb4a563612e5bbb91fb85348",
  "opreturn": "6a4c4d4d00215bb9fee0d7685c5fcf913f4da4fab726104b1b242d5226939b00000000000000000000000000000000cc5eedec8e34b68726ff77cad0558659333fee18e5b63f8ef259444f66f185e62e",
  "result": "success",
  "decrypted": "68656c6c6f2c20776f726c647465737431",
  "original": "hello, worldtest1"
}
```

```json
{
  "coin": "KMD",
  "opreturntxid": "a9e94e6890d6998b3c2b89685e8c7c2b9e380a53fb813192701d0966480807eb",
  "opreturn": "6a4b4b0057a7b6c2ac0354f967534060bc3719a687bedc3b4741c3c64b7d00000000000000000000000000000000fe4170681aab23ba044516812bc5fe9dd5adb3a2f05fbc8d46e7be69f02040",
  "result": "success",
  "decrypted": "68656c6c6f2c20776f726c64746573",
  "original": "hello, worldtes"
}
```

All three recreated the original string passed into the [opreturn](./coinfeatures.html#opreturn) script. This functionality should allow apps to easily created and retrieve encrypted `OP_RETURN`.
