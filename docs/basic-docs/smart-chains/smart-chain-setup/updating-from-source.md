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

#### Compile the Latest Komodo Binary

```bash
./zcutil/build.sh -j$(nproc)
```

#### Restart the komodod Daemon

Start your services as usual. 

(If you did not stop the daemon before compiling, stop the daemon using `~/komodo/src/komodo-cli stop` and start the daemon again.)

```bash
~/komodo/src/komodod &
```

#### Rapid Update Method

The steps below can often be used to update the daemon. 

These steps take a lesser amount of time, but they may occasionally produce an error during compilation. If the steps below do not succeed, the compiler will cease and return an error. When this happens, simply switch to the update steps listed above.

```bash
cd ~/komodo
git checkout dev
git pull
make -j$(nproc)
```

## MacOS

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

#### Compile the Latest Komodo Binary

```bash
./zcutil/build.sh -j8
```

#### Restart the komodod Daemon

Start your services as usual. 

(If you did not stop the daemon before compiling, stop the daemon using `~/komodo/src/komodo-cli stop` and start the daemon again.)

```bash
~/komodo/src/komodod &
```

#### Rapid Update Method

The steps below can often be used to update the daemon. 

These steps take a lesser amount of time, but they may occasionally produce an error during compilation. If the steps below do not succeed, the compiler will cease and return an error. When this happens, simply switch to the update steps listed above.

```bash
cd ~/komodo
git checkout dev
git pull
make -j8
```

## Windows

To update the Windows software, you will again need access to your available installation of Linux where you originally compiled the software. 

#### Build the New Executables

Execute the following commands on your Linux machine to build the new executable files.

```bash
cd ~/komodo
git pull
./zcutil/build-win.sh -j8
```

This can take some time.

####  Move Executables to Windows OS

Once the process completes, find the `komodod.exe` and `komodo-cli.exe` files and move them to your Windows OS machine.

You may drop these executable files into the same `kmd` folder to overwrite the old executables files.

Once complete, run the `komodod.exe` and `komodo-cli` files to verify that they work properly.

