# Status/Info

## getendpoint

There is a new websockets realtime events to the barterDEX API family, `getendpoint`. It returns a nanomsg NN_PAIR endpoint that if you connect to it. You get an event stream, with hopefully all the relevant events, especially about the change in state of swap. The even stream is started as soon as the `getendpoint` API is called.

There is also a new mode for marketmaker: `./marketmaker events` which we should run in a new terminal. This should connect to the endpoint created by `getendpoint` API call. This will simply launch a new process and printout all the events. It will be like the console spew of printouts so you might want to `nohup` it and then `grep` to find things. This allows GUI to be done in an event driven way. Any command can add a `"queueid":nn` with a non-zero `nn` and it will queue the command. Its completion will arrive in the nanomsg event stream with the `queueid` and the result.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"getendpoint\"}"
```

Sample Output:

```json
{
  "result": "success",
  "endpoint": "ws://127.0.0.1:5555",
  "socket": 20,
  "sockopt": 0
}
```

## pendings

`./pendings` is a special case of `statsdisp` and will display all the pending swaps. Using `recentswaps` API is better suitable for most usecases.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"statsdisp\",\"starttime\":2000000000,\"endtime\":2000000000}"
```

Sample Output:

```json
{
  "result": "success",
  "newlines": 0,
  "swaps": [
    {
      "aliceid": "7276253190735921153",
      "src": "30eb3d952f66eba2df0100b97d6707257cf91dc8c8b0237cfb7c3aa70dc52d4d",
      "base": "REVS",
      "basevol": 0.13338748,
      "dest": "1282417c4e7d5bb870067f5c05ffe87a0d8c8ce9956befff560e92b7c8d23741",
      "rel": "KMD",
      "relvol": 0.1505,
      "price": 1.12913831,
      "requestid": 2339417255,
      "quoteid": 1177391651,
      "line": "2017-10-30T16:16:00Z (nogui).(nogui) 0    connected    7276253190735921153: (0.13338748  REVS) -> (0.15050000   KMD) 1.12913831 finished.0 expired.0"
    }
  ],
  "volumes": [
    {
      "coin": "KMD",
      "srcvol": 0,
      "destvol": 0.1505,
      "numtrades": 1,
      "total": 0.1505
    },
    {
      "coin": "REVS",
      "srcvol": 0.13338748,
      "destvol": 0,
      "numtrades": 1,
      "total": 0.13338748
    }
  ],
  "request": 4,
  "reserved": 2,
  "connect": 4,
  "connected": 1,
  "duplicates": 4,
  "parse_errors": 0,
  "uniques": 1,
  "tradestatus": 0,
  "unknown": 0
}
```

## swapstatus

This will display the swap status for your trades along with `requestid` and `quoteid`. This API also helps unstuck swaps and help claim funds if the swap wasn't successfully completed. In order to claim stuck funds, remove all `.finished` file, start barterDEX, add coins and issue this script.

These available API options are described below:

```bash
swapstatus(pending=0)
swapstatus(coin, limit=10)
swapstatus(base, rel, limit=10)
swapstatus(requestid, quoteid, pending=0)
```

The base/rel swapstatus will scan ALL your historical swaps and that could take a very long time. There is a new parameter for the `swapstatus` API, `fast:1`. You can use this flag with swapstatus for `base/rel`, `requestid/quoteid` for faster and optimised performance while getting the response. 2 different example scripts:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"pending\":1,\"userpass\":\"$userpass\",\"method\":\"swapstatus\", \"base\":\"CHIPS\", \"rel\":\"KMD\", \"fast\":1}"
```

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"swapstatus\",\"requestid\":2291973695,\"quoteid\":3387529385}, \"fast\":1}"
```

This is very helpful when you have so many swap files in DB/SWAPS dir.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"swapstatus\"}"
```

Sample Output:

```json
{
  "result": "success",
  "swaps": [
    {
      "status": "realtime",
      "requestid": 157581336,
      "quoteid": 2717912442
    },
    {
      "status": "realtime",
      "requestid": 2050117881,
      "quoteid": 263483411
    }
  ]
}
```

## pendingswaps

This way you can see what swaps are still pending. This uses `pending=1` arg to `swapstatus` method.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"swapstatus\",\"pending\":1}"
```

Sample Output:

```json
{
  "result": "success",
  "swaps": [
    {
      "expiration": 1512738286,
      "tradeid": 4038861795,
      "requestid": 1887485571,
      "quoteid": 2755902417,
      "iambob": 0,
      "Bgui": "",
      "Agui": "nogui",
      "gui": "nogui",
      "bob": "BTC",
      "srcamount": 0.02555775,
      "bobtxfee": 0.00212221,
      "alice": "KMD",
      "destamount": 95,
      "alicetxfee": 0.0001,
      "aliceid": "9807693779256541185",
      "sentflags": [
        "bobspend",
        "bobpayment",
        "alicepayment",
        "bobdeposit",
        "myfee",
        "bobrefund"
      ],
      "values": [
        0.02343554,
        0,
        0.02555775,
        95.0002,
        0.02875246,
        0,
        0.12226512,
        0.0279102,
        0,
        0,
        0
      ],
      "result": "success",
      "status": "finished",
      "finishtime": 1512839121,
      "bobdeposit": "ec1e73395a7bd855bcf3afe58b0b1d478532ef398f2df68d2d10424e9d36743f",
      "alicepayment": "d3edb95bb9f3bd898f8b655398c5ab0ae86bc90d14176068096b6111eb201a05",
      "bobpayment": "9ff00880871d1474474378a4b9fc445ec13367be51a7b797a3cc76c1c4da52b6",
      "paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
      "Apaymentspent": "1fd16aaf9a41e44efe30bf01087470b9db3cf287b0b7a2634b25b97601e2acda",
      "depositspent": "27d774b0765eee97f7423785a4c80d3cea36adaccb5fa9f4fa5fe0e8fa68bfbe",
      "method": "tradestatus"
    }
  ]
}
```

## coinswaps

This method uses `swapstatus` for a spcific coin.

Sample File Content:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"swapstatus\",\"coin\":\"CHIPS\"}"
```

## baserelswaps

This method uses the `swapstatus` API and displays base/rel swapstatus.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"swapstatus\",\"base\":\"MNZ\",\"rel\":\"KMD\"}"
```

## `swapstatus(requestid, quoteid, pending=0)`

You can get more information about the swaps by quering with `requestid` and `quoteid`. This API helps query about stuck swap and helps them unstuck. The sample file looks like below. `pending=0` is optional.

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"swapstatus\",\"requestid\":157581336,\"quoteid\":2717912442}"
```

The sample result is below:

```json
{
  "requestid": 157581336,
  "quoteid": 2717912442,
  "iambob": 0,
  "bob": "REVS",
  "srcamount": 1.79816276,
  "bobtxfee": 0.0001,
  "alice": "KMD",
  "destamount": 2,
  "alicetxfee": 0.0001,
  "sentflags": [
    "alicespend",
    "bobpayment",
    "alicepayment",
    "bobdeposit",
    "myfee"
  ],
  "values": [
    1.79806276,
    0,
    1.79816276,
    2.0001,
    2.0229331,
    0,
    0.002674,
    0,
    0,
    0,
    0
  ],
  "result": "success",
  "status": "finished",
  "bobdeposit": "6f36a465184f9c2a377dc7a338ff24c1096c97a7cc13aa3a8e3cf2bd46d88c03",
  "alicepayment": "7221eb0ac7cb9985cd580d82310a1f95b4e47617597c1b747d7840e776d73a93",
  "bobpayment": "7a05b28041b112178ecf5d532a18ff8e75d280fec8a7bc4511fce0215a3c66d3",
  "paymentspent": "9a541250257346de1b7d5b4ca11814b2df7098b750af23d0fad5b245c5435110",
  "Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
  "depositspent": "0000000000000000000000000000000000000000000000000000000000000000"
}
```

## recentswaps

This api returns up to "limit" in reverse order the swaps on the node and the current pending swap (if any) so you can see what trade might happen.

'limit' = the number of latest swaps to be visible in output.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"recentswaps\",\"limit\":1}"
```

Sample Output:

```json
{
  "result": "success",
  "swaps": [[2779577435, 2461904533], [932852928, 3189912026]],
  "pending": {
    "expiration": 1508343494,
    "timeleft": 5,
    "base": "",
    "basevalue": 0,
    "rel": "",
    "relvalue": 0
  }
}
```
