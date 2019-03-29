# General

## client

The first API to run which will start barterDEX in client mode. Next script to run is `setpassphrase`. If you want to close barterDEX, issue `pkill -15 marketmaker` every time. This ensures all barterDEX process is killed safely.

Sample File Contents:

```bash
#!/bin/bash
source passphrase
source coins
./stop
git pull;
cp ../exchanges/updateprices .;./updateprices
cd ..;
./m_mm;
pkill -15 marketmaker;
stdbuf -oL $1 ./marketmaker "{\"gui\":\"nogui\",\"client\":1,\"userhome\":\"/${HOME#"/"}\",\"passphrase\":\"$passphrase\",\"coins\":$coins}" &
```

Fields that can be used: `gui:nogui` or `gui:SimpleUI` - to identify the CLI/GUI being used to run marketmaker. `client:1` - to start marketmaker as client mode. `"userhome\\":\\"/${HOME#"/"` - defines the data dir for barterDEX. DB dir contains PRICES, SWAPS, UNSPENTS and instantdex_deposit (0conf) files. `passphrase:$passphrase` - is to set the passphrase to run the marketmaker with, to run and login into marketmaker using WIF (Wallet Import Format) key instead of passphrase. You need to use the WIF key as passphrase inside `passphrase` file. barterDEX supports login using WIF Key for all supported coins instead of passphrase. `wif:1` - will display the passphrase's WIF during the first api return. `rpcport:port` - to change the 7782 port to other open port of choice.

## netid

For the startup JSON default is 0, max is 19240, which should be plenty of p2p networks for a while. Each `netid` will operate totally independent of the other netids. The `rpcport` field can be used to specify different ones so you can run multiple mm on the same node, but they will be on separate `netid`. This way you can broadcast the `marketmaker` prices to all the netids. You also need to use the same `netid` in `setpassphrase` script.

Example usage:

```bash
./marketmaker "{\"gui\":\"nogui\",\"client\":1, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"$passphrase\", \"coins\":$coins, \"netid\":1}"
```

## client_osx

It is the same script as above but only for MacOS.

Sample File Contents:

```bash
#!/bin/bash
source passphrase
source coins
pkill -15 marketmaker;
git pull;
cd ..;
./m_mm;
./marketmaker "{\"gui\":\"nogui\",\"client\":1, \"userhome\":\"/${HOME#"/"}/Library/Application\ Support\", \"passphrase\":\"$passphrase\", \"coins\":$coins}" &
```

## convaddress

This script should work with p2sh addresses and also with normal addresses to convert. You just have to specify the `coin`, `address` & `destcoin` parameter and run.

Sample file contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"convaddress\",\"coin\":\"BTC\",\"address\":\"1KPctPk4Zs4Qbe1x32A5bC1roAnmpvi9Fy\",\"destcoin\":\"KMD\"}"
```

Sample Output 1:

```json
{
  "result": "success",
  "coin": "BTC",
  "address": "1KPctPk4Zs4Qbe1x32A5bC1roAnmpvi9Fy",
  "destcoin": "KMD",
  "destaddress": "RTfoxudMAgryfeP9WC9CgiM4ZSFNVM2VvK"
}
```

Sample Output 2:

```json
{
  "result": "success",
  "coin": "BTC",
  "address": "1KPctPk4Zs4Qbe1x32A5bC1roAnmpvi9Fy",
  "destcoin": "DGB",
  "destaddress": "DPXiReghsGxh8eCYmc9e8xBTgJX5CdnALu"
}
```

## debug

This script will let you debug if you run into problem with `marketmaker` and coins using `gdb`. This will kill the `marketmaker` first, do a `git pull` for fresh data and build it again. Once ready, type `run` and hit enter to start. In case of marketmaker crash, you can use `backtrace` command to find the reason of the crash. To exit from this mode type `quit` and hit enter.

Sample File Contents:

```bash
#!/bin/bash
source passphrase
source coins
pkill -15 marketmaker;
git pull;
cd ..;
./m_mm;
gdb -args ./marketmaker "{\"gui\":\"nogui\",\"client\":1,\"userhome\":\"/${HOME#"/"}\",\"passphrase\":\"$passphrase\",\"coins\":$coins}"
```

## disable

This method disables a coin. A disabled coin is not eligible for trading.

Sample File Contents:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"disable\",\"coin\":\"REVS\"}"
```

## enable

This method enables a coin by connecting to a locally running native coin daemon, otherwise, known as **Native Mode**. To be eligible for trading a coin must be enabled and the daemon should be running. You can edit the sample `enable` script file to activate the native coins you want to trade. you can stop it by using the [disable](./mmV1-API.html#disable) script.

Sample File Contents:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BEER\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETOMIC\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PIZZA\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"REVS\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"KMD\"}"
#curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTC\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CHIPS\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SUPERNET\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CRYPTO\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DEX\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BOTS\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BET\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HODL\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MSHARK\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MGW\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PANGEA\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"JUMBLR\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HUSH\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTCH\"}"
```

Sample Output:

```json
[
  {
    "coin": "KMD",
    "installed": true,
    "height": 706875,
    "balance": 1231.55116115,
    "KMDvalue": 1231.55116115,
    "status": "active",
    "electrum": "electrum1.cipig.net:10001",
    "smartaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "rpc": "127.0.0.1:7771",
    "pubtype": 60,
    "p2shtype": 85,
    "wiftype": 188,
    "txfee": 1000,
    "zcredits": 1000,
    "zdebits": {
      "swaps": [
        {
          "iambob": 1,
          "aliceid": 14646443851645911040,
          "requestid": 1531405035,
          "quoteid": 668442874,
          "base": "KMD",
          "satoshis": 398119479,
          "rel": "BTCH",
          "destsatoshis": 996001000,
          "price": 2.50176404,
          "finished": 0,
          "bobneeds_dPoW": 1,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 1,
          "alice_dPoWheight": 0,
          "kmdvalue": 3.98119479
        },
        {
          "iambob": 0,
          "aliceid": 7500808088360189952,
          "requestid": 2426472678,
          "quoteid": 3136038708,
          "base": "KMD",
          "satoshis": 170727131,
          "rel": "MSHARK",
          "destsatoshis": 30001000,
          "price": 0.17572485,
          "finished": 1518455358,
          "bobneeds_dPoW": 706621,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 20948,
          "alice_dPoWheight": 14108,
          "kmdvalue": 1.72646183
        },
        {
          "iambob": 0,
          "aliceid": 10968666690691268608,
          "requestid": 769582120,
          "quoteid": 492899755,
          "base": "KMD",
          "satoshis": 57319224,
          "rel": "MSHARK",
          "destsatoshis": 10001000,
          "price": 0.17447898,
          "finished": 1518455358,
          "bobneeds_dPoW": 706644,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 20963,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.57552564
        },
        {
          "iambob": 0,
          "aliceid": 3325348207487614976,
          "requestid": 1461677939,
          "quoteid": 3994513936,
          "base": "KMD",
          "satoshis": 57334419,
          "rel": "MSHARK",
          "destsatoshis": 10001000,
          "price": 0.17443274,
          "finished": 1518455358,
          "bobneeds_dPoW": 706648,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 20965,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.57552564
        },
        {
          "iambob": 0,
          "aliceid": 3949043092670119936,
          "requestid": 868202615,
          "quoteid": 2718753539,
          "base": "KMD",
          "satoshis": 40174013,
          "rel": "MSHARK",
          "destsatoshis": 7001000,
          "price": 0.17426688,
          "finished": 1518455358,
          "bobneeds_dPoW": 706662,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 20972,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.40288521
        },
        {
          "iambob": 0,
          "aliceid": 1187687474903711744,
          "requestid": 1035974224,
          "quoteid": 4214136299,
          "base": "KMD",
          "satoshis": 40170553,
          "rel": "MSHARK",
          "destsatoshis": 7001000,
          "price": 0.17428189,
          "finished": 1518455358,
          "bobneeds_dPoW": 706665,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 20975,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.40288521
        },
        {
          "iambob": 0,
          "aliceid": 3361541373681205248,
          "requestid": 1030751685,
          "quoteid": 1769312982,
          "base": "KMD",
          "satoshis": 40197682,
          "rel": "MSHARK",
          "destsatoshis": 7001000,
          "price": 0.17416427,
          "finished": 1518455358,
          "bobneeds_dPoW": 706665,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 20982,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.40288521
        },
        {
          "iambob": 0,
          "aliceid": 16301556677736726528,
          "requestid": 1082032834,
          "quoteid": 977860445,
          "base": "KMD",
          "satoshis": 40191021,
          "rel": "MSHARK",
          "destsatoshis": 7001000,
          "price": 0.17419313,
          "finished": 1518455358,
          "bobneeds_dPoW": 706669,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 20991,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.40288521
        },
        {
          "iambob": 0,
          "aliceid": 12486716361556295680,
          "requestid": 131073424,
          "quoteid": 554811147,
          "base": "KMD",
          "satoshis": 57472918,
          "rel": "MSHARK",
          "destsatoshis": 10001000,
          "price": 0.17401239,
          "finished": 1518455358,
          "bobneeds_dPoW": 706718,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21033,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.57552564
        },
        {
          "iambob": 0,
          "aliceid": 13831903913886154752,
          "requestid": 3159266235,
          "quoteid": 2688690321,
          "base": "KMD",
          "satoshis": 57143474,
          "rel": "MSHARK",
          "destsatoshis": 10001000,
          "price": 0.17501561,
          "finished": 1518455358,
          "bobneeds_dPoW": 706715,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21029,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.57552564
        },
        {
          "iambob": 0,
          "aliceid": 10301729584199958528,
          "requestid": 1213522022,
          "quoteid": 54249754,
          "base": "KMD",
          "satoshis": 57528414,
          "rel": "MSHARK",
          "destsatoshis": 10001000,
          "price": 0.17384453,
          "finished": 1518455358,
          "bobneeds_dPoW": 706719,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21038,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.57552564
        },
        {
          "iambob": 0,
          "aliceid": 8232914266839056384,
          "requestid": 4081601584,
          "quoteid": 412356287,
          "base": "KMD",
          "satoshis": 57494778,
          "rel": "MSHARK",
          "destsatoshis": 10001000,
          "price": 0.17394623,
          "finished": 0,
          "bobneeds_dPoW": 1,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 1,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.57552564
        },
        {
          "iambob": 0,
          "aliceid": 9209632436025032704,
          "requestid": 3537842224,
          "quoteid": 3725087089,
          "base": "KMD",
          "satoshis": 21597791,
          "rel": "MSHARK",
          "destsatoshis": 3747597,
          "price": 0.1735176,
          "finished": 1518455358,
          "bobneeds_dPoW": 706758,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21082,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.21566225
        },
        {
          "iambob": 0,
          "aliceid": 8233074053957746688,
          "requestid": 2261166303,
          "quoteid": 22701758,
          "base": "KMD",
          "satoshis": 21597177,
          "rel": "MSHARK",
          "destsatoshis": 3746456,
          "price": 0.1734697,
          "finished": 1518455358,
          "bobneeds_dPoW": 706765,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21091,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.21559659
        },
        {
          "iambob": 0,
          "aliceid": 6122187997339189248,
          "requestid": 1197866694,
          "quoteid": 488405108,
          "base": "KMD",
          "satoshis": 115069202,
          "rel": "MSHARK",
          "destsatoshis": 20001000,
          "price": 0.17381714,
          "finished": 1518455358,
          "bobneeds_dPoW": 706766,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21093,
          "alice_dPoWheight": 14108,
          "kmdvalue": 1.15099373
        },
        {
          "iambob": 0,
          "aliceid": 14721798049184415744,
          "requestid": 739807218,
          "quoteid": 364988835,
          "base": "KMD",
          "satoshis": 115164687,
          "rel": "MSHARK",
          "destsatoshis": 20001000,
          "price": 0.17367303,
          "finished": 1518455358,
          "bobneeds_dPoW": 706773,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21101,
          "alice_dPoWheight": 14108,
          "kmdvalue": 1.15099373
        },
        {
          "iambob": 0,
          "aliceid": 15764304953332531200,
          "requestid": 2360598697,
          "quoteid": 3777086736,
          "base": "KMD",
          "satoshis": 57519187,
          "rel": "MSHARK",
          "destsatoshis": 10001000,
          "price": 0.17387241,
          "finished": 0,
          "bobneeds_dPoW": 1,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 1,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.57552564
        },
        {
          "iambob": 0,
          "aliceid": 15764470458444021760,
          "requestid": 1183002364,
          "quoteid": 2238731236,
          "base": "KMD",
          "satoshis": 20796927,
          "rel": "MSHARK",
          "destsatoshis": 3600230,
          "price": 0.17311355,
          "finished": 1518455358,
          "bobneeds_dPoW": 706822,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21145,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.20718175
        },
        {
          "iambob": 0,
          "aliceid": 15223997733381865472,
          "requestid": 1894968837,
          "quoteid": 948074537,
          "base": "KMD",
          "satoshis": 20806039,
          "rel": "MSHARK",
          "destsatoshis": 3594169,
          "price": 0.17274642,
          "finished": 1518456523,
          "bobneeds_dPoW": 706844,
          "bob_dPoWheight": 687380,
          "aliceneeds_dPoW": 21189,
          "alice_dPoWheight": 14108,
          "kmdvalue": 0.20683295
        }
      ],
      "pendingswaps": 14.49513794
    }
  }
][
  {
    "coin": "SUPERNET",
    "installed": true,
    "height": 85017,
    "balance": 0.94386703,
    "KMDvalue": 35.7775589,
    "status": "active",
    "smartaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "rpc": "127.0.0.1:11341",
    "pubtype": 60,
    "p2shtype": 85,
    "wiftype": 188,
    "txfee": 1000
  }
][
  {
    "coin": "BOTS",
    "installed": true,
    "height": 14118,
    "balance": 8.61219046,
    "KMDvalue": 95.90388479,
    "status": "active",
    "electrum": "electrum1.cipig.net:10007",
    "smartaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "rpc": "127.0.0.1:11964",
    "pubtype": 60,
    "p2shtype": 85,
    "wiftype": 188,
    "txfee": 1000
  }
][
  {
    "coin": "BET",
    "installed": true,
    "height": 16555,
    "balance": 36.65094825,
    "KMDvalue": 0,
    "status": "active",
    "electrum": "electrum1.cipig.net:10012",
    "smartaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "rpc": "127.0.0.1:14250",
    "pubtype": 60,
    "p2shtype": 85,
    "wiftype": 188,
    "txfee": 1000
  }
][
  {
    "coin": "MSHARK",
    "installed": true,
    "height": 21221,
    "balance": 61.90419488,
    "KMDvalue": 356.23889156,
    "status": "active",
    "smartaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "rpc": "127.0.0.1:8846",
    "pubtype": 60,
    "p2shtype": 85,
    "wiftype": 188,
    "txfee": 1000
  }
][
  {
    "coin": "BTCH",
    "installed": true,
    "height": 17922,
    "balance": 1890.26497637,
    "KMDvalue": 1085.25152617,
    "status": "active",
    "smartaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "rpc": "127.0.0.1:8800",
    "pubtype": 60,
    "p2shtype": 85,
    "wiftype": 188,
    "txfee": 1000
  }
]
```

## getcoin

This method will show coin data including smartaddress, balance etc. Do NOT use `getcoin` to get balance in SPV mode, use the `balance` API.

Sample File Contents:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"getcoin\",\"coin\":\"LTC\"}"
```

Sample Output:

```json
{
  "result": "success",
  "enabled": 5,
  "disabled": 88,
  "coin": {
    "coin": "BTCH",
    "installed": true,
    "height": 17914,
    "balance": 1890.26497637,
    "KMDvalue": 1060.52748251,
    "status": "active",
    "smartaddress": "RANyPgfZZLhSjQB9jrzztSw66zMMYDZuxQ",
    "rpc": "127.0.0.1:8800",
    "pubtype": 60,
    "p2shtype": 85,
    "wiftype": 188,
    "txfee": 1000
  }
}
```

## getcoins

This will display the list of all coins that barterDEX supports. It will list both disabled and enabled coins. Along with the status of the coin, this function will also display your smartaddress for that given coin. This method does not need user defined inputs and will just display all the coins.

Sample File Contents:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"getcoins\"}"
```

Sample Output:

```json
[
  {
    "coin": "BTC",
    "height": 0,
    "status": "inactive",
    "smartaddress": "15XAhHK4ULofD6BTckrCWK6XSkCjscX7jj",
    "rpc": "127.0.0.1:8332",
    "pubtype": 0,
    "p2shtype": 5,
    "wiftype": 128,
    "txfee": 0
  },
  {
    "coin": "KMD",
    "height": 538355,
    "status": "active",
    "smartaddress": "RDoMmoCM5AcEH6Yf5vqKbqRjD1fLcQHuWb",
    "rpc": "127.0.0.1:7771",
    "pubtype": 60,
    "p2shtype": 85,
    "wiftype": 188,
    "txfee": 10000
  }
]
```

## getpeers

The `./getpeers` script prints the connected nodes available to trade in the network.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"getpeers\"}"
```

Sample Output:

```json
[
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 1508151814
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  }
]
```

## getpeersIP

The `./getpeersIP` script prints all the connected nodes, their `port` and `session` number.

Sample File Contents:

```bash
curl --url "http://5.9.253.195:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.196:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.197:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.198:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.199:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.200:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.201:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.202:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.203:7783" --data "{\"method\":\"getpeers\"}"
curl --url "http://5.9.253.204:7783" --data "{\"method\":\"getpeers\"}"
```

Sample Output:

```json
[
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 0
  }
][
  ({
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 1508151807
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 0
  })
][
  ({
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 1508151808
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 0
  })
][
  ({
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 1508151809
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 0
  })
][
  ({
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 1508151809
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 0
  })
][
  ({
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 1508151812
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 0
  })
][
  ({
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 1508151813
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.197",
    "po##barterDEX Trading##rt": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 0
  })
][
  ({
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 1508151814
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  })
][
  ({
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 1508151814
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 1508151804
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 0
  })
][
  ({
    "ipaddr": "5.9.253.197",
    "port": 7783,
    "session": 1506966021
  },
  {
    "ipaddr": "5.9.253.195",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.196",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.199",
    "port": 7783,
    "session": 1506966023
  },
  {
    "ipaddr": "5.9.253.201",
    "port": 7783,
    "session": 1506966027
  },
  {
    "ipaddr": "5.9.253.202",
    "port": 7783,
    "session": 1506966028
  },
  {
    "ipaddr": "5.9.253.200",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.203",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "5.9.253.198",
    "port": 7783,
    "session": 0
  },
  {
    "ipaddr": "82.7.169.222",
    "port": 7783,
    "session": 0
  })
]
```

## help

The `./help` API will display a list of all the available API available on barterDEX and usage options.

Sample File Contents:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"help\"}"
```

Sample Output:

```json
{
"result": " available localhost RPC commands:
setprice(base, rel, price, broadcast = 1)
autoprice(base, rel, fixed, minprice, maxprice, margin, refbase, refrel, factor, offset) *
goal(coin = * , val = < autocalc > )
myprice(base, rel)
enable(coin)
disable(coin)
notarizations(coin)
statsdisp(starttime = 0, endtime = 0, gui = , pubkey = , base = , rel = )
ticker(base = , rel = )
tradesarray(base, rel, starttime = < now > -timescale * 1024, endtime = < now > , timescale = 60) - > [timestamp, high, low, open, close, relvolume, basevolume, aveprice, numtrades]
pricearray(base, rel, starttime = 0, endtime = 0, timescale = 60) - > [timestamp, avebid, aveask, highbid, lowask]
getrawtransaction(coin, txid)
inventory(coin, reset = 0, [passphrase = ])
lastnonce()
buy(base, rel, price, relvolume, timeout = 10, duration = 3600, nonce)
sell(base, rel, price, basevolume, timeout = 10, duration = 3600, nonce)
withdraw(coin, outputs[])
sendrawtransaction(coin, signedtx)
swapstatus(pending = 0, fast = 0)
swapstatus(coin, limit = 10)
swapstatus(base, rel, limit = 10)
swapstatus(requestid, quoteid, pending = 0, fast = 0)
recentswaps(limit = 3)
notarizations(coin)
public API: getcoins()
getcoin(coin)
portfolio()
getpeers()
passphrase(passphrase, gui, netid = 0, seednode = )
listunspent(coin, address)
setconfirms(coin, numconfirms, maxconfirms = 6)
trust(pubkey, trust)# positive to trust, 0 for normal, negative to blacklist
balance(coin, address)
balances(address)
fundvalue(address = , holdings = [], divisor = 0)
orderbook(base, rel, duration = 3600)
getprices()
inuse()
getmyprice(base, rel)
getprice(base, rel)
//sendmessage(base=coin, rel=, pubkey=zero, <argjson method2>)
//getmessages(firsti=0, num=100)
//deletemessages(firsti=0, num=100)
secretaddresses(prefix = 'secretaddress', passphrase, num = 10, pubtype = 60, taddr = 0)
electrum(coin, ipaddr, port)
snapshot(coin, height)
snapshot_balance(coin, height, addresses[])
dividends(coin, height, < args > )
stop()
bot_list()
bot_statuslist()
bot_buy(base, rel, maxprice, relvolume) - > botid
bot_sell(base, rel, minprice, basevolume) - > botid
bot_settings(botid, newprice, newvolume)
bot_status(botid)
bot_stop(botid)
bot_pause(botid)
calcaddress(passphrase, coin = KMD)
convaddress(coin, address, destcoin)
instantdex_deposit(weeks, amount, broadcast = 1)
instantdex_claim()
timelock(coin, duration, destaddr = (tradeaddr), amount)
unlockedspend(coin, txid)
opreturndecrypt(coin, txid, passphrase)
getendpoint()
jpg(srcfile, destfile, power2 = 7, password, data = , required, ind = 0)"}
```

## jpg

barterDEX supports password encrypting data into a .jpg. The dest image is virtually indistinguishable from the original. Best to use a raw .jpg you created with a camera and not some file from the internet. As from the internet, it can be compared as to what bits are changed and in that case the encrypted rawdata will be visible.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"password\":\"123\",\"ind\":3453,\"userpass\":\"$userpass\",\"method\":\"jpg\",\"srcfile\":\"/root/boost_1_64_0/libs/gil/doc/doxygen/images/monkey_steps.jpg\",\"destfile\":\"dest.jpg\",\"power2\":3,\"data\":\"68656c6c6f20776f726c64\",\"required\":88}"
```

To write into a .jpg file, specify password, srcfile, destfile, data (hexstring) and required number of bits, power2. The same values of power2, password and required are needed to extract the data.

```bash
curl --url "http://127.0.0.1:7783" --data "{\"password\":\"123\",\"userpass\":\"$userpass\",\"method\":\"jpg\",\"srcfile\":\"dest.jpg\",\"power2\":3,\"required\":88}"
```

Just the name of the image, power2 are required along with the password.

Sample Output:

```bash
    47007d0d6e91a7844e14f685153c71f57b20f79b3d0204009eb1bcef0000000000000000000000000000000067622f82d97186d2c561f7abd6880b8d692563b8c71b1ab299e525 encoded .71
    47007d0d6e91a7844e14f685153c71f57b20f79b3d0204009eb1bcef0000000000000000000000000000000067622f82d97186d2c561f7abd6880b8d692563b8c71b1ab299e525 restored
    68656c6c6f20776f726c64 VERIFIED decryption .11 ind.3453 msglen .71 required .568 New DCT coefficients successfully written to dest.jpg, capacity 35672 modifiedrows .1 / 114 emit .568
    {
    "result": "success",
    "modifiedrows": 1,
    "outputfile": "dest.jpg",
    "power2": 3,
    "capacity": 35672,
    "required": 88,
    "ind": 65535,
    "decoded": "3a4e7dc2785e40d58b8784"
}
    47007d0d6e91a7844e14f685153c71f57b20f79b3d0204009eb1bcef0000000000000000000000000000000067622f82d97186d2c561f7abd6880b8d692563b8c71b1ab299e525 restored {
    "result": "success",
    "modifiedrows": 0,
    "power2": 3,
    "capacity": 35672,
    "required": 88,
    "ind": 3453,
    "decoded": "68656c6c6f20776f726c64"
}
```

## millis

`millis` is a new debug API. James put the millis display in the swaploop, which is once per 10 minutes.

Sample File Content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"millis\"}"
```

Sample Output:

## notarizations

This script will display coin notarization status for a specified coin. Use the script like this `./notarizations KMD`, `./notarizations REVS`, etc.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"notarizations\",\"coin\":\"$1\"}"
```

Sample Output:

```json
{
  "result": "success",
  "coin": "KMD",
  "lastnotarization": 553573,
  "bestheight": 553578
}
```

## parselog

`./parselog` will parse the stats.log file, just the incremental since last time.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"parselog\"}"
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

## passphrase

This method helps the GUI build to take input of the passphrase and generate userpass. This is the second API to run in BarterDEX. On the first call it will display the userpass value at the top of output.

Sample File Content:

```bash
#!/bin/bash
source userpass
source passphrase
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"1d8b27b21efabcd96571cd56f91a40fb9aa4cc623d273c63bf9223dc6f8cd81f\",\"method\":\"passphrase\",\"passphrase\":\"$passphrase\",\"gui\":\"nogui\"}"
```

## sleep

`sleep` API is to create a call with definite duration. What the below example scritps does is, it starts sleep async and it gets queued. While that is happening, we do 2 orderbooks, which immediately return. After 10 seconds the sleep is done and the normal command queue completes and the getcoin is executed. This changes the serialized nature of calls. So, it might destabilize things, but by being limited to orderbook and portfolio the risk is very small. New API can be added to the whitelisted fast calls, by testing it with a `"fast":1`.

Sample file content:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"queueid\":1,\"userpass\":\"$userpass\",\"method\":\"sleep\",\"seconds\":10}" &
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"REVS\",\"rel\":\"KMD\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"REVS\",\"rel\":\"KMD\"}"
curl --url "http://127.0.0.1:7783" --data "{\"queueid\":2,\"userpass\":\"$userpass\",\"method\":\"getcoin\",\"coin\":\"REVS\",\"rel\":\"KMD\"}"
```

## stop

This method will stop `barterDEX`.

Sample File Content:

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"stop\"}"
```

## trust

Make your pubkey trusted by using this `./trust` method. You need to add your pubkey after the command. If you want the pubkey to be not trusted use "trust":-1. -1 means dont trust, 1 means to trust. This API works immediately.

Sample File Contents:

```bash
echo "usage: ./trust <pubkey>"
source userpass
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"pubkey\":\"$1\",\"method\":\"trust\",\"trust\":1}"
```

Sample Output:

```bash
usage: ./trust <pubkey>
{"result":"success"}
```

## trusted

This method will display the `pubkey` you made trusted. No need to edit the file.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"trusted\"}"
```

Sample Output:

```bash
[
        "040f1d2d5d12027afa2cec30477312e225b0d24c77cc4aa08d3fffe51277b904"
]
```
