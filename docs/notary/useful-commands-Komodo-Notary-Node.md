# Useful commands for Komodo Notary Node

Store `komodo-cli` into `/usr/bin`, so you can use it anywhere you are in the CLI

```bash
sudo cp ~/komodo/src/komodo-cli /usr/bin
```

Stop Komodo, Bitcoin and Iguana at once

```bash
komodo-cli stop && bitcoin-cli stop && pkill -15 iguana
```

Update Komodo (be sure to stop Komodo first, see above)

```bash
cd ~/komodo && git pull && cd src && make
```

Search for a specific pubkey in files (like: notaries.c, ratify(A,B,C)\_7776 etc. etc.)

```bash
**notaries.c**
cd ~/SuperNET/iguana
cat notaries.c | grep 0209d48554768dd8dada988b98aca23405057ac4b5b46838a9378b95c3e79b9b9e (or any pubkey of course)

**ratify(A,B,C)_7776**
cd ~/SuperNET/iguana/tests
cat ratifyA_7776 | grep 0209d48554768dd8dada988b98aca23405057ac4b5b46838a9378b95c3e79b9b9e (or any pubkey of course)
```

If you want to copy your full bitcoin blocks to a new node instead of downloading it again you can scp the files to the new node. THIS WILL TAKE A WHILE!

```bash
cd ~/.bitcoin
scp -r blocks/ chainstate/ user@ipofnewnode:~/.bitcoin
```
