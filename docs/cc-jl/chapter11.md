# Chapter 11 - Oracles Example

[Oracles CC](https://github.com/jl777/komodo/blob/jl777/src/cc/oracles.cpp) is an example where it ended up being simpler than I first expected, but at the same time a lot more powerful. It is one of the smaller CC, but it enables creation of an arbitrary number of data markets, in a performant way.

In order to gain the performance, some clever usage of special addresses was needed. It was a bit tricky to generate a special address to keep track of the latest data.

Let's back up to the beginning. Just what is an oracle? In this context it is something that puts data that is not on the blockchain, onto the blockchain. Since everything other than the transactions and blocks are not in the blockchain, there is a very large universe of data that can be oracle-ized. It can be literally anything, from the obvious like prices to specific results relative to an arbitrary description.

The most difficult issue about oracles is that they need to be trusted to various degree to provide accurate and timely data. The danger is that if a trusted node is used to write data to the blockchain, it creates a trust point and a single point of attack. Ultimately there is nothing that can ensure only valid data is written to the blockchain, so what is done is to reinforce good behavior via pay per datapoint. However, for critical data, higher level processing is needed that combines multiple data providers into a validated signal.

At the oracles CC level, it is enough that there is financial incentive to provide good data. Also it is needed to allow multiple vendors for each data that is required and to enable efficient ways to update and query the data.

## The following are the rpc calls:

```bash
oraclescreate name description format
oracleslist
oraclesinfo oracletxid
oraclesregister oracletxid datafee
oraclessubscribe oracletxid publisher amount
oraclesdata oracletxid hexstr
oraclessamples oracletxid batonutxo num
```

The first step is to create a specific data description with `oraclescreate`, which also defines the format of the binary data. This creates an oracletxid, which is used in the other rpc calls. `name` and `description` are just arbitrary strings, with name preferably being a short name used to access the data. The format is a string comprised of a single character per data element:

```bash
's' -> <256 char string
'S' -> <65536 char string
'd' -> <256 binary data
'D' -> <65536 binary data
'c' -> 1 byte signed little endian number, 'C' unsigned
't' -> 2 byte signed little endian number, 'T' unsigned
'i' -> 4 byte signed little endian number, 'I' unsigned
'l' -> 8 byte signed little endian number, 'L' unsigned
'h' -> 32 byte hash
```

For example, if the datapoint is comprised of a `4byte` timestamp and an `8byte` number the format string would be: `"IL"`

`oracleslist` displays a list of all the `oraclestxid` and `oraclesinfo` displays information about the specific `oracletxid`. Each `oracletxid` deterministically generates a marker address and a small amount is sent to that address to mark a transaction's relation to the `oracltxid`.

```json
{
  "result": "success",
  "txid": "4895f631316a649e216153aee7a574bd281686265dc4e8d37597f72353facac3",
  "name": "BTCUSD",
  "description": "coindeskpricedata",
  "format": "L",
  "marker": "RVqJCSrdBm1gYJZS1h7dgtHioA5TEYzNRk",
  "registered": [
    {
      "publisher": "02ebc786cb83de8dc3922ab83c21f3f8a2f3216940c3bf9da43ce39e2a3a882c92",
      "baton": "RKY4zmHJZ5mNtf6tfKE5VMsKoV71Euej3i",
      "batontxid": "4de10b01242ce1a5e29d5fbb03098b4519976879e05ad0458ef7174ed9127f18",
      "lifetime": "1.50000000",
      "funds": "0.01000000",
      "datafee": "0.01000000"
    }
  ]
}
```

A `data publisher` needs to register a `datafee` and their `pubkey` for a specific `oracletxid`. `datafee` needs to be at least as big as a `txfee`. Using `oraclesregister` the current `datafee` can be updated so a `publisher` can adapt to market conditions. Once registered, subscribers can prepay for some number of datapoints to a specific `publisher` using the `oraclessubscribe` rpc. At first, it is likely that the `publisher` would pay themselves to enable the posting of initial data points so the potential subscribers can evaluate the quality and consistency of the data.

The one final rpc is `oraclessamples`, which returns the most recent samples of data from a specific `publisher`. In order to have a performant solution to track all the potential data streams from all the publishers for all the `oracletxid`, a baton `utxo` is used. This is an output sent to a specific address and expected to have just a single `utxo` at any given time to allow for direct lookup. `oraclessamples` requires a starting `txid` to use and with each datapoint having the prior `batontxid`, there is a reverse linked list to traverse the most recent data.

## VIN/VOUT allocation

In order to implement this, the following vin/vout contraints are used:

### create

```bash
vins.*: normal inputs
vout.0: txfee tag to oracle normal address
vout.1: change, if any
vout.n-1: opreturn with name and description and format for data
```

### register

```bash
vins.*: normal inputs
vout.0: txfee tag to normal marker address
vout.1: baton CC utxo
vout.2: change, if any
vout.n-1: opreturn with oracletxid, pubkey and price per data point
```

### subscribe

```bash
vins.*: normal inputs
vout.0: subscription fee to publishers CC address
vout.1: change, if any
vout.n-1: opreturn with oracletxid, registered provider's pubkey, amount
```

### data

```bash
vin.0: normal input
vin.1: baton CC utxo (most of the time)
vin.2+: subscription or data vout.0
vout.0: change to publishers CC address
vout.1: baton CC utxo
vout.2: payment for dataprovider
vout.3: change, if any
vout.n-1: opreturn with oracletxid, prevbatontxid and data in proper format
```

The `oraclesdata` transaction is the most complex as it needs to find and spend the baton `utxo`, use the correct `datafee` and spend funds from the locked subscription funds. With the above, the oracles CC is complete and allows the creations of massively parallel data streams from multiple vendors that uses free market feedback via payments, ie. poorly performing providers wont get renewals.

I expect that at first, the data providers will just be dapp developers deploying a working system including the required data, but its structure allows open market competition. Of course, specific dapps could restrict themselves to using only publishers from a whitelist of pubkeys. The potential usecases for oracles CC is quite varied and limited only by the imagination.
