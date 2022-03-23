# Setup ElectrumX Server

An SPV Electrum Server is a server that provides "lite mode" type functionality. These servers run a full node, which maintains a copy of a blockchain's history (a.k.a.) "native mode". The electrum software allows developers and apps like AtomicDEX to communicate with the blockchain to query balances, transaction history or broadcast signed transactions without needing to download and sync the full chain locally.

A list of known electrum servers is maintained at https://github.com/KomodoPlatform/coins/tree/master/electrums
It's recommended to run at least 2 - 3 electrum servers to ensure stable operation.

Check out the [ElectrumX Docs](https://electrumx.readthedocs.io/en/latest/) for more info.


## Installation

```bash
sudo apt-get install python3-setuptools python3-multidict python3.8 libleveldb-dev
cd ~
git clone https://github.com/KomodoPlatform/electrumx-1
cd ~/electrumx-1
pip3 install .
pip3 install .[uvloop,ujson]
```


## Coin Configuration

If you are launching the electrum server for a new smartchain, you will have to add it to the `~/electrumx-1/electrumx/lib/coins.py` file. You can skip this step if seeting up an electrum server for KMD or another coin which already exists in this file.

For example, using the ROCK Smart Chain [we created earlier](create-smart-chain.html):

```python
class Rock(KomodoMixin, EquihashMixin, Coin):
    NAME = "Rock"
    SHORTNAME = "ROCK"
    NET = "mainnet"
    TX_COUNT = 55000
    TX_COUNT_HEIGHT = 42000
    TX_PER_BLOCK = 2
    RPC_PORT = 28762
    REORG_LIMIT = 800
    PEERS = []

```

`NAME`, `SHORTNAME` and `RPC_PORT` are to be changed accordingly.


## Electrum Configuration

Run:

```bash
cd ~/electrumx-1
sudo mkdir -p /electrumdb/ROCK
sudo chown <USERNAME> /electrumdb/ROCK
sudo nano /etc/electrumx_ROCK.conf
```


Get your `RPC_USER`, `RPC_PASS` and `RPC_PORT` from your conf file, e.g.  `~/.komodo/ROCK/ROCK.conf`, then add them as below:

```
COIN = Rock
DB_DIRECTORY = /electrumdb/ROCK
DAEMON_URL = http://<RPC_USER>:<RPC_PASS>@127.0.0.1:<RPC_PORT>/
SERVICES = tcp://:<ELECTRUM_TCP_PORT>,rpc://:<ELECTRUM_RPC_PORT>,wss://:<ELECTRUM_WSS_PORT>,ssl://:<ELECTRUM_SSL_PORT>
EVENT_LOOP_POLICY = uvloop
PEER_DISCOVERY = self
MAX_SESSIONS = 1000
MAX_SEND = 2000000
INITIAL_CONCURRENT = 50
COST_SOFT_LIMIT = 0
COST_HARD_LIMIT = 0
MAX_SEND = 2000000
BANDWIDTH_UNIT_COST = 10000

# Required for WSS or SSL services
SSL_CERTFILE=/etc/letsencrypt/live/<YOUR_DOMAIN_NAME>/fullchain.pem   
SSL_KEYFILE=/etc/letsencrypt/live/<YOUR_DOMAIN_NAME>/privkey.pem      
```

You can read more about the available environment variables in the [ElectrumX Docs](https://electrumx.readthedocs.io/en/latest/environment.html)

Change the `SERVICES` allow the `SERVICES` ports through your firewall as required. E.g. `sudo ufw allow <ELECTRUM_WSS_PORT>`

For listing on AtomicDEX, wss (websocket) and ssl (secure socket) will be required. Please refer to the [EFF Certbot instructions](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal) for details on setting up SSL certificates (this varies depending on OS and installed web server).

For example, using Ubuntu 20.04 and NGINX:
```
sudo snap install core; sudo snap refresh core
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
```

Will create a cert file and key file, and update your nginx `sites-enabled` config.
Add the path to these files in `/etc/electrumx_ROCK.conf`.


## Configure as a service

Run:

```bash
sudo cp ~/electrumx-1/contrib/systemd/electrumx.service /etc/systemd/system/electrumx_ROCK.service
sudo nano /etc/systemd/system/electrumx_ROCK.service
```

Update the following fields in the file (leave the rest as it is):

```
Description=Electrumx_ROCK
EnvironmentFile=/etc/electrumx_ROCK.conf
ExecStart=/home/<username>/electrumx-1/electrumx_server
User=<username>
```


```bash
sudo systemctl start electrumx_ROCK
```

To check its status:

```bash
sudo systemctl status electrumx_ROCK
```

To review it's logs:

```bash
sudo journalctl -f -u electrumx_ROCK.service --since today
```


## Confirm the server is running

To issue commands to the electrum server from a local terminal use (change the transaction ID below to one valid for the chain)

```
echo '{"method":"blockchain.transaction.get","params":["8e3293602465cf6d234fda4a2bb13affb4b5a3fb5bd46eb11a14ed72ac1836e0", true],"id":"test"}' | nc <ELECTRUM_SERVER_IP> <ELECTRUM_TCP_PORT> -i 1 | jq .
```

To confirm websockets are running:

```python
import websocket

ws = websocket.WebSocket()
ws.connect("wss://<YOUR_DOMAIN_NAME>:<ELECTRUM_WSS_PORT>")
ws.send('{"method":"blockchain.transaction.get","params":["8e3293602465cf6d234fda4a2bb13affb4b5a3fb5bd46eb11a14ed72ac1836e0", true],"id":"test"}')
print(ws.recv())
ws.close()
```


## Maintainence

To keep your electrum server running smoothly, it is recommended to compact the database once a week. We can do this with a [crontab](https://crontab.guru/) entry as below:

```bash
33 3 * * 3 sudo systemctl stop electrumx_ROCK && COIN=Rock; DB_DIRECTORY=/electrumdb/ROCK; /home/<USERNAME>/electrumx-1/electrumx_compact_history && sudo systemctl start electrumx_ROCK
```

This means that every Wednesday at 3:33am, we'll stop the electrum service, compact the database, then restart the service. You should change the day of week for each of your electrum servers so that they dont all go down for maintainence at the same time.
