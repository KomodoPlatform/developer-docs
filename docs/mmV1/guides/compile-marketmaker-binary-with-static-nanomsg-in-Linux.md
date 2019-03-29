# Compile marketmaker Binary with Static nanomsg in Linux

This guide will help you to compile your own marketmaker binary in Linux with static nanomsg. Follow this [guide](./compile-marketmaker-binary-with-static-nanomsg-in-MacOS.md) to compile for macOS.

## Install Dependency packages:

```bash
sudo apt-get update
sudo apt-get install cmake git libcurl4-openssl-dev build-essential
```

## Install `nanomsg`

```bash
cd ~
git clone https://github.com/nanomsg/nanomsg
cd nanomsg
cmake . -DNN_TESTS=OFF -DNN_ENABLE_DOC=OFF
make -j2
sudo make install
sudo ldconfig
```

## Clone SuperNET repo and compile

```bash
cd ~
git clone https://github.com/jl777/SuperNET
cd ~/SuperNET/iguana
git checkout dev
./m_LP_StaticNanoMsg
make -f m_mm_StaticNanoMsg -j2 all
```

Once all done, you should be able to find both `iguana` and `marketmaker` static binaries in `~/SuperNET/agents/` dir.
