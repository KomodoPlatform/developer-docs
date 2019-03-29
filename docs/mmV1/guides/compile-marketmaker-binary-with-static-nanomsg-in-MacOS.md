# Compile marketmaker Binary with Static nanomsg in MacOS

This guide will help you to compile your own marketmaker binary in MacOS (OSX) with static nanomsg. Follow this
[guide](./compile-marketmaker-binary-with-static-nanomsg-in-Linux.md) for Linux.

## Install Dependency packages:

```bash
sudo apt-get update
sudo apt-get install cmake git libcurl4-openssl-dev build-essential
```

## Install `nanomsg`

You'll need to install `homebrew` (Google how to do it)

```bash
brew install nanomsg
```

## Clone SuperNET repo and compile

```bash
cd ~
git clone https://github.com/jl777/SuperNET
cd ~/SuperNET/iguana
git checkout dev
./m_mm
cd ..
./osx_deploy.sh
```

Once all done, you should be able to find both `iguana` and `marketmaker` static binaries in user's home directory, under `~/tmp/iguana/`.
