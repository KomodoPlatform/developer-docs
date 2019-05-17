# Updating Smart Chain Software From Source
## Linux

To update your compiled `komodod` daemon, follow the steps below carefully. For each step, do not proceed to the next step until the current step is fully complete.

You may leave the `komodod` daemon running, if necessary, and if your machine has sufficient resources. 

Alternatively, you may stop the daemon by executing `~/komodo/src/komodo-cli stop`.

#### Navigate to your komodo directory

```bash
cd ~/komodo
```

#### Reset Your Local Repository

```bash
git reset --hard
```

#### Clean the Source Directory

```bash
make clean
```

#### Update Your Local Source Code

```bash
git pull
```

#### Compile the Latest Zcash Binary

```bash
./zcutil/build.sh -j$(nproc)
```

#### Reset the komodod Daemon

Start your sevices as usual. 

(If you did not stop the deamon before compiling, stop the daemon using `~/komodo/src/komodo-cli stop` and start the daemon again.)

```bash
~/komodo/src/komodod &
```

#### Rapid Update Method

The steps below can often be used to update the daemon. 

These steps take a lesser amount of time, but they may occasionally may produce an error during compilation. If the steps below do not succeed, the compiler will cease and return an error. When this happens, simply switch to the update steps listed above.

```bash
cd ~/komodo
git checkout dev
git pull
make -j$(nproc)
```

