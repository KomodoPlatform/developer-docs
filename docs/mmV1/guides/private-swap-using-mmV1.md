# Private Trading using mmV1

You can use mmV1 with 14,000+ different [netids](../api/). For private trading, both Bob node and client need to use a same `netid` and `seednode`. It is better to choose a higher number netid (i.e.: 1000+).

## Bob Node

You need to edit your `client` and `setpassphrase` with same `netid` and `seednode` like `\"netid\":1024,\"seednode\":\"51.255.10.25\"` and follow the steps above. Your orders will not be visible in the global netid and orderbook. Only users who are connected to that specific netid on that ip can perform swaps. Check the example file below:

### client

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
stdbuf -oL $1 ./marketmaker "{\"gui\":\"nogui\",\"client\":1,   \"netid\":1024,\"seednode\":\"51.255.10.25\",\"canbind\":1,\"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"$passphrase\", \"coins\":$coins}" &
```

### setpassphrase

```bash
#!/bin/bash
source userpass
source passphrase
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"1d8b27b21efabcd96571cd56f91a40fb9aa4cc623d273c63bf9223dc6f8cd81f\",\"method\":\"passphrase\",\"passphrase\":\"$passphrase\",\"netid\":1024,\"seednode\":\"51.255.10.25\",\"gui\":\"nogui\"}"
```

## Alice Node

You need to edit your `client` and `setpassphrase` with same `netid` and `seednode` like `\\"netid\\":1024,\\"seednode\\":\\"51.255.10.25\\"` as the Bob node. Check the example files below:

### client

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
stdbuf -oL $1 ./marketmaker "{\"gui\":\"nogui\",\"client\":1,\"netid\":1024,\"seednode\":\"51.255.10.25\", \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"$passphrase\", \"coins\":$coins}" &
```

### setpassphrase

```bash
#!/bin/bash
source userpass
source passphrase
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"1d8b27b21efabcd96571cd56f91a40fb9aa4cc623d273c63bf9223dc6f8cd81f\",\"method\":\"passphrase\",\"passphrase\":\"$passphrase\",\"netid\":1024,\"seednode\":\"51.255.10.25\",\"gui\":\"nogui\"}"
```
