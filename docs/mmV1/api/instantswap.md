# InstantDEX SWAP

Fastest swaps are here now as InstantDEX Swap. All nodes can be doing this at the same time, any `bob` to any `alice`. All you need to have is some amount of KMD deposit for dynamic trust. It does require a deposit that matches your trade size.

If you are selling 20 at at time, deposit 20. If you are selling 50 at a time, deposit 50. And, you can trade without any deposit if you want to wait for coin confirmations. Use `InstantDEX` swap, just wait for deposit coin confirmations, you can sell all. The deposit just has to cover the amount you have pending in swaps, not anything regarding your total amount.

You can see your balance using the regular `balance` API. After verification your `zcredits` will be displayed with your KMD balance like this:

```json
{
  "result": "success",
  "coin": "KMD",
  "address": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
  "balance": 363.94840658,
  "zcredits": 50
}
```

## instantdex_deposit

You can `deposit` KMD using the following script into b addresses which will accrue interest as well. This will allow you to do InstantDEX swaps which finishes a swap within 5-20 seconds. The more KMD you deposit for InstantDEX trading, the more limit you can have. It is a timelocked deposit, keeps the honest traders honest. Gives other traders the assurance that you have a valid deposit to cover any hack attempt.

`instantdex_deposit` the values are 1 to 52 weeks and the amount (minimum of 10.0001). These figures are calibrated to the 5% APR, ie. 1 weeks interest is approx the BOTS 0.1% fee, 52 weeks is the most the 5% APR accrues, 10.0001 KMD is min required for interest. It can take few minutes (about 10 confirmations) for the Bob nodes to recognise you. This creates a dynamic trust between nodes and swaps are faster. Just issue normal buy and the Bob nodes will respond with InstantDEX swaps.

It creates a binary file in DB with the unique deposit txids on an append only basis. The first time, it seeds it with the contents of the existing `instantdex.json` files. from the deposits file the `instantdex_address_append.json` is directly created and the `instantdex.json` file is created by removing the already spent deposits.

Sample script:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"instantdex_deposit\",\"weeks\":1,\"amount\":10.0001,\"broadcast\":1}"
```

`weeks:1` means it will be there for 300 hours or 1 week time. Don't set to `week:0` unless you are only testing.

Sample Output:

```json
{
  "rawtx": "01000000014c9758944771d62c731f9b06246ccd3301ea0e198a6bdbdcb22csdffasdc7010fgdfg00ffffffff0300ca9asdf17a914d9da8esdfsfbe957273f842617132c361546e7b8743420f00000000001976a91492816449164623c4e744009923356ff4832ba388ac998e6d07000000001976a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac2b08175a",
  "hex": "01000000014c9758944771d62c731f9b06246ccd3301ea0e1123jdsfbdcb22ce18d5daf0dc7010000006a473044022044b87624341cb4c01cdce88b592fadcf725d3e88315c2cd35a8d6a66d81ea035022047f372108e264634d610227e9c8ba69399e1609f7a37af1470b47ce6d0bde3b4012103fe754763c176e1339a3f62ee6b9484720e17ee4646b65a119e9f6370c7004abcffffffff0300ca9a3b0000000017a914d9da8e493573be957273f842617132c361546e7b8743420f00000000001976a914928104f862284623c4e744009923356ff4832ba388ac998e6d07000000001976a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac2b08175a",
  "tx": {
    "version": 1,
    "locktime": 1511458859,
    "vin": [
      {
        "txid": "c70daf5d8de12cb2dcdb6b8a190eea0133cd6c24069b1f732cd671479458974c",
        "vout": 1,
        "scriptPubKey": {
          "hex": "76a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac"
        }
      }
    ],
    "vout": [
      {
        "satoshis": "1000000000",
        "scriptPubKey": {
          "hex": "a914d9da8e493573be957273f842617132c361546e7b87"
        }
      },
      {
        "satoshis": "1000003",
        "scriptPubKey": {
          "hex": "76a914928104f862284623c4e744009923356ff4832ba388ac"
        }
      },
      {
        "satoshis": "124620441",
        "scriptPubKey": {
          "hex": "76a9140c1007fc1f406a0a519886c0e59327e9c43a634088ac"
        }
      }
    ]
  },
  "txid": "a01b85233259e62edcaf3c171c97de0d2977ce88ae172b9b11809da9757e218c",
  "complete": true,
  "address": "bYbB9P5XG5j1Jr5nbD2nL5jt54WwPEzADd",
  "expiration": 1512201600,
  "deposit": 10,
  "result": "success",
  "broadcast": "a01b85233259e62edcaf3c171c97de0d2977ce88ae172b9b11809da9757e218c"
}
```

## claim

**For 0conf deposits claim can take extra time. The extra time can be up to a week as it operates on a weekly cycle. Best is to make the 0conf deposit on Saturdays. Friday is safest anywhere in the world.**

After the deposit is **expired**, you can claim at any time, though it is rounded up to the next week boundary. You need to use `./claim` API to claim your 0conf deposit (`zcredits`) back. All of your deposits are secured as long as you have the txid handy. If you use `week:0` you need to save the details of timestamp and the `b` address that the funds were sent in order to use with the `./claim` script to claim it back.

```bash
Minutes or hours is not long enough. Remember, the point here is to resolve any blockchain attacks.
```

`claim` API will display the balance of the 0conf deposit `txid` along with interest and wait time to claim. This will claim the deposit instantly if it already expired and ready to claim.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"instantdex_claim\"}"
```

Output:

```json
{
  "result": "success",
  "claimed": 0,
  "txids": [
    {
      "txid": "d5705d948a5a4e0171acec3eb718ca1421ef998b37d0af5c37ac3b440898aef5",
      "deposit": 1000,
      "interest": 10.78139269,
      "waittime": 25702320
    }
  ]
}
```

## Manually Enable 0conf deposits to work with the GUI

You need to put the `txid` of the 0conf / instantdex deposit in an `instantdex.json` and/or `instantdex_address.json` file inside `DB` dir. If the file is not preset in the DB folder, create the file manually. The DB dir is located `C:/Users/<username>/AppData/Roaming/BarterDEX/DB` in Windows and `~/.BarterDEX/DB` in Linux. The content inside the JSON file should look like following:

### 1 txid

```bash
["d5705d948a5a4e0171acec3eb718ca1421ef998b37d0af5c37ac3b440898aef5"]
```

### 2 or more txid

```bash
[
        "d5705d948a5a4e0171acec3eb718ca1421ef998b37d0af5c37ac3b440898aef5",
        "bd2087d431bb9af6213e73efc58e3384227edcf4827e1cf83f3c153e512a9e1f"
]
```

::: tip Note
If you are using Windows, please use 1 txid at a time. Claim for multiple txid may not work together. Claim single txid each time.
:::

Then delete any deposit.address binary file for your address i.e.: `deposits.RPZVpjptzfZnFZZoLnuSbfLexjtkhe6uvn`, all this is in DB dir. **Don't delete any dir in here.**

Next time you start BarterDEX, it should then generate a `deposits.<address>` with the binary of the txid and necessary files. If Electrum mode does not work for you, try with native KMD wallet.

```bash
Negative ``zcredits balance`` is the balance being used for 0conf trade, will be available after the next notarized block.
```
