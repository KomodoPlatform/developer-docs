# Statistics

## guistats

`guistats` method is for GUI apps to display statistics, based on the `statsdisp` API.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"statsdisp\",\"starttime\":0,\"endtime\":0,\"gui\":\"SimpleUI\"}"
```

## pricearray

pricearray will display statistical price data based on timescale.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"pricearray\",\"base\":\"REVS\",\"rel\":\"KMD\",\"timescale\":300}"
```

This will output the data in an order of `[timestamp, avebid, aveask, highbid, lowask]`

Sample output:

```bash
[
 [1510603500, 1.40944454, 1.40944453, 3.13224635, 1.07003092],
 [1510603800, 1.50064727, 1.50064726, 3.13224635, 1.07003092],
 [1510604100, 1.50064727, 1.50064726, 3.13224635, 1.07003092],
 [1510607100, 1.44868382, 1.44868381, 3.13224635, 1.07003092],
 [1510607400, 1.50064727, 1.50064726, 3.13224635, 1.07003092],
 [1510607700, 1.52877070, 1.52877069, 3.13224635, 1.07003092],
 [1510608000, 1.55019807, 1.55019806, 3.13224635, 1.09860370],
 [1510608300, 1.57205536, 1.57205536, 3.13224635, 1.09860370],
 [1510608600, 1.30344136, 1.30344135, 1.76975636, 1.17393764],
 [1510611600, 1.21488583, 1.21488582, 1.25583401, 1.17393764],
 [1510611900, 1.25661049, 1.25661048, 1.34097978, 1.17393764]
]
```

## statsdisp

`statsdisp` processes the `stats.log` file on your node. It will display the swaps as best as it can figure out the unique number of swaps, you can set specific `starttime` and `endtime`. If not specified, will display all. If both are the same time from the future, it will display only the pending stats.

This is a very good feature as it can identify any node that is trying to do too many trades at once

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"statsdisp\",\"starttime\":0,\"endtime\":0}"
```

Sample Output:

```json
{
  "result": "success",
  "newlines": 0,
  "request": 0,
  "reserved": 0,
  "connect": 0,
  "connected": 0,
  "duplicates": 0,
  "parse_errors": 0,
  "uniques": 0,
  "tradestatus": 0,
  "unknown": 0
}
```

## ticker

`ticker` API returns trades for the previous 24hours. You can set `base/rel` optionally. Most useful for price and marketcap statistics.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"ticker\",\"base\":\"REVS\",\"rel\":\"KMD\"}"
```

Sample Output:

```json
[
  {
    "timestamp": 1513174486,
    "KMD": 4.02827942,
    "CHIPS": 80.0001,
    "price": 19.85962036
  },
  {
    "timestamp": 1513168630,
    "KMD": 0.07448089,
    "MNZ": 0.25609997,
    "price": 3.43846549
  },
  {
    "timestamp": 1513166465,
    "CRYPTO": 44.00844307,
    "KMD": 500.0001,
    "price": 11.36145851
  },
  {
    "timestamp": 1513158008,
    "KMD": 463.91820708,
    "SUPERNET": 10.0001,
    "price": 0.02155574
  }
]
```

## tradesarray

`tradesarray` will display statistical trade data based on timescale in seconds.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"tradesarray\",\"base\":\"REVS\",\"rel\":\"KMD\",\"timescale\":120}"
```

This will output the data in an order of `[timestamp, high, low, open, close, relvolume, basevolume, aveprice, numtrades]`

Sample output:

```bash
[
 [1511480400, 1.27614172, 1.27614172, 1.27614172, 1.27614172, 0.04990000, 0.03910224, 1.27614172, 1],
 [1511480520, 1.97936698, 1.36595231, 1.97936698, 1.36595231, 0.09980000, 0.06174137, 1.61642024, 2],
 [1511480640, 2.11837065, 2.11837065, 2.11837065, 2.11837065, 0.04990000, 0.02355584, 2.11837065, 1],
 [1511481840, 1.63195519, 1.55147942, 1.63195519, 1.55147942, 0.09980000, 0.06273967, 1.59070011, 2],
 [1511481960, 1.82528276, 1.82528276, 1.82528276, 1.82528276, 0.04990000, 0.02733823, 1.82528276, 1],
 [1511482680, 1.77777461, 1.77777461, 1.77777461, 1.77777461, 0.04990000, 0.02806880, 1.77777461, 1]]
`
```
