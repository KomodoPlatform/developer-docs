# Setup ElectrumX Server

Here are the steps required to run electrumx for KMD. Replace the variables according to your setup. You need to setup minimum 2 electrum servers for same coin to ensure stable operation.

- `$user` is the username under which electrumx will run

- `$rpcuser` and `$rpcpass` are from the config of the wallet daemon

## General part

```bash
sudo apt-get install python3-setuptools python3-multidict python3.6 python3.6-dev libleveldb-dev

git clone https://github.com/cipig/electrumx -b kmdassets
cd electrumx
sudo python3.6 setup.py install
```

## Coin specific part

```bash
sudo cp contrib/systemd/electrumx.service /etc/systemd/system/electrumx_KMD.service
sudo vi /etc/systemd/system/electrumx_KMD.service
        Description=Electrumx_KMD
        EnvironmentFile=/etc/electrumx_KMD.conf
        User=$user
        mkdir ~/electrumdb_KMD
        sudo vi /etc/electrumx_KMD.conf
        COIN = Komodo
        DB_DIRECTORY = /home/$user/electrumdb_KMD
        DAEMON_URL = http://$rpcuser:$rpcpass@127.0.0.1:7771/
        RPC_HOST = 127.0.0.1
        RPC_PORT = 8001
        HOST =
        TCP_PORT = 10001
        EVENT_LOOP_POLICY = uvloop
        PEER_DISCOVERY = self

sudo systemctl start electrumx_KMD
```

## More coins

In order to setup and start more electrumx servers, just alter the coin specific part from above accordingly, replacing KMD by another coin symbol, setting COIN to another coin name, setting the right `rpcport` in `DAEMON_URL` and using another `RPC_PORT` and `TCP_PORT` for electrumx. Here is an example for SUPERNET:

```bash
sudo cp contrib/systemd/electrumx.service /etc/systemd/system/electrumx_SUPERNET.service
sudo vi /etc/systemd/system/electrumx_SUPERNET.service
    Description=Electrumx_SUPERNET
    EnvironmentFile=/etc/electrumx_SUPERNET.conf
    User=$user
mkdir ~/electrumdb_SUPERNET
sudo vi /etc/electrumx_SUPERNET.conf
    COIN = SuperNET
    DB_DIRECTORY = /home/$user/electrumdb_SUPERNET
    DAEMON_URL = http://$rpcuser:$rpcpass@127.0.0.1:11341/
    RPC_HOST = 127.0.0.1
    RPC_PORT = 8005
    HOST =
    TCP_PORT = 10005
    EVENT_LOOP_POLICY = uvloop
    PEER_DISCOVERY = self

sudo systemctl start electrumx_KMD
```
