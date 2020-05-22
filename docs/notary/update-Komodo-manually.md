# How to update Komodo (for Notary Nodes)

Reboot your node (to start fresh).

If you have installed Komodo from it's source code already on your machine, and need to update to the latest version, follow the below steps.

Please follow each step carefully and don't skip to the next one until the previous step is successfully completed. If you have the `komodo daemon` running, you can leave it running while updating if you have enough resources on your machine. If you prefer to stop it before updating, please use `~/komodo/src/komodo-cli stop` to stop the daemon and proceed with the following steps to update.

- Navigate to your komodo directory

```bash
cd ~/komodo
```

- Make sure you don't have any changes made to the source and reset it. This will ensure clean source and shouldn't create issues while pulling the latest source in the next step.

```bash
git reset --hard
```

- Clean the source directory

```bash
make clean
```

- Update the source. (If you have any changes made to the source code, this command may not pull the latest source. Please make sure you have followed the previous steps)

```bash
git pull
```

- Compile the latest binary

```bash
./zcutil/build.sh -j$(nproc)
```

Start your services as usual. If you didn't stop the deamon before compiling, please stop it using `~/komodo/src/komodo-cli stop` and start again.

## How to resync

If you need to resync your Komodo chain from scratch, follow these steps:

- Stop the Komodo daemon

```bash
~/komodo/src/komodo-cli stop
```

- Navigate to your `.komodo` folder

```bash
cd ~/.komodo
```

- Remove the following files and directories

```bash
rm -rf blocks chainstate debug.log komodostate db.log
```

Go back to your home folder

```bash
cd ~
```

Start Komodo and iguana as [described in the setup doc](./setup-Komodo-Notary-Node.html)
