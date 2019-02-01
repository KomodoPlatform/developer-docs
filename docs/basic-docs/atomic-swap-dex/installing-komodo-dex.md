# About Komodo Dex Software

Komodo's DEX software is built to have a core component that can serve many front-end graphical-user interfaces (GUIs). 

The core component is called MarketMaker 2.0, or MM2 for brevity.

Various front-end GUIs exist in our ecosystem, some of them built by the volunteer efforts of our community members. We are also working to release a Komodo-supported GUI, in coordination with Ideas By Nature, a UX/UI design firm.

The documentation here only concerns the core component, MarketMaker 2.0 (MM2). This component is typically accessed via an API or a terminal interface.

Documentation for a GUI for MM2 is not yet available.

## New Features of MarketMaker 2.0

Users who worked with the previous version of the MM software, MarketMaker 1.0 (MM1), will note several differences with the new release.  

### New Off-Chain Technology

MM1 used nanomsg technology for its off-chain network layer (e.g. orderbook propagation, ordermatching, client traffic routing, and other technologies that are not active on the blockchain itself).

MM2 uses a torrent/DHT network system for the off-chain network layer, `libtorrent`. This p2p software is widely used and highly reliable, granting a greater development experience.

### Rust Implementation

MM1 was based on ANSI C.

For MM2 we ported the system to Rust, utilizing the cargo ecosystem. Internal benchmarks prove this to be more efficient. Furthermore, the Rust codebase supports mobile devices natively, including Android & iOS. This is a key benefit, as we expect mobile devices to be a key component of MM2 adoption.

### Multi-Threading and Other Multi-Tasking Improvements

MM1 had limited multi-tasking capabilities. Also, the bob-side technology was not reliable when using MM1 in lite mode (SPV), wherein blockchain syncing is not required for end-users.

MM2 has multi-threading. This allows it to reliably manage multiple concurrent requests.

###  Each Node is a Standalone P2P Solution

MM1 had two separate types of nodes: full relay and non-full relay. Non-full relay nodes had to rely on full relay nodes for network functionality. This additional layer of complexity was not optimal.

With MM2, each node is a full standalone p2p solution (e.g. there are no longer two types of nodes).


# Installing Komodo DEX Software (MM2)

### Minimum Requirements for Installation

* MacOS, Windows (see note below), and Linux (see note below)

* 64-bit (see note below for 32-bit)

* Minimum 2GB of free RAM 

* Root access

### Note about Linux

For Linux users, much of the following documentation assumes that you are building and running MM2 on a Debian 9/10 or Ubuntu 18.04 host. If you have questions about other releases or distributions, [please reach out to us](https://support.komodoplatform.com/support/tickets/new).

### Note about Installing on Windows

Developing software on Windows typically requires an installation of Git Bash.

Git Bash is a terminal shell based on Unix. It is similar to the Windows Shell or Windows Command Prompt, but uses Unix-based syntax.

All instructions in the MarketMaker 2.0 documentation are given with Unix-based syntax, and therefore we recommend installing Git Bash before proceeding. 

You may download and install Git Bash for Windows here:

[Download Git Bash for Windows](https://git-scm.com/download/win)

The download should begin automatically.

Double-click the downloaded `.exe` file and follow the Installation Wizard.

Once Git Bash is open and running on your machine, you may continue.

### Note about 32-bit Operating Systems

We are currently testing 32-bit operating system functionality. As these can often be comparatively old machines, we cannot guarantee that they will work by default. 

We invite users of 32-bit operating systems to test the software and [report any errors to our team](https://support.komodoplatform.com/support/tickets/new).

### Installing Dependencies

#### Rust

Install [Rust](https://www.rust-lang.org/tools/install):

```bash
curl https://sh.rustup.rs -sSf | sh
```

#### cmake version 3.12 or higher

Download the cmake software here: [download link](https://cmake.org/download/)

Unpack and follow the instructions here: [instructions link](https://cmake.org/install/)

#### Build tools for your OS

Linux: 

```bash
sudo apt-get install build-essential
```

Windows: [Follow these instructions for MSVC](https://docs.microsoft.com/en-us/cpp/build/vscpp-step-0-installation?view=vs-2017)

MacOS: [Install XCode via the App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)

#### Install Additional Dependencies

Install the following additional dependencies using the terminal.

```bash
apt-get install libboost-dev libboost-system-dev build-essential git
```

#### Install Additional Rust Components

Install additional Rust components:

```bash
rustup install nightly-2018-12-24
```

```bash
rustup default nightly-2018-12-24
```

```bash
rustup component add rustfmt-preview
```

### Install MM2

Download the MM2 repository:

```bash
git clone https://github.com/KomodoPlatform/KomodoPlatform --branch spvdex --single-branch && cd KomodoPlatform
```

Compile the source code:

```bash
cargo build -vv
```

If everything installs successfully you will see an approximation on this phrase:

```
“Finished dev [optimized + debuginfo] target(s) in 3m 33s”
```

The executable is now installed in this directory in the folder: `target/debug/`

Change into this directory:

```bash
cd target/debug/
```

MarketMaker 2.0 is now installed and ready.




