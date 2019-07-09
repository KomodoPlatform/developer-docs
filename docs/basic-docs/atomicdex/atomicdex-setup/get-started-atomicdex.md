# Installing AtomicDEX Software (MM2)

### Minimum Requirements for Installation

* MacOS, Windows (see note below), and Linux (see note below)

* 64-bit (see note below for 32-bit)

* Minimum 2GB of free RAM 

* Normal user account with admin/root privileges

::: warning Note
If you would prefer to avoid building MM2 from source, you can download our pre-built nightly binary [from this link](http://195.201.0.6/mm2/).
:::

### Note about Linux

For Linux users, much of the following documentation assumes that you are building and running MM2 on a Debian 9/10 or Ubuntu 18.04 host. If you have questions about other releases or distributions, [please reach out to us on the #dev-marketmaker channel on Discord](https://komodoplatform.com/discord).

### Note about Installing on Windows

Developing software on Windows typically requires an installation of Git Bash.

Git Bash is a terminal shell based on Unix. It is similar to the Windows Shell or Windows Command Prompt, but uses Unix-based syntax.

All instructions in the MarketMaker 2.0 documentation are given with Unix-based syntax, and therefore we recommend installing Git Bash before proceeding. 

You may download and install Git Bash for Windows here:

[Download Git Bash for Windows](https://git-scm.com/download/win)

The download should begin automatically.

Double-click the downloaded `.exe` file and follow the Installation Wizard.

Once Git Bash is open and running on your machine, you may continue.

### Note About 32-bit Operating Systems

We are currently testing 32-bit operating system functionality. As 32-bit machines can often be comparatively older hardware, we cannot guarantee that MarketMaker 2.0 will run successfully by default. 

We invite users of 32-bit operating systems to test the software and [report any errors to our team on the #dev-marketmaker channel on Discord](https://komodoplatform.com/discord).

### Installing Dependencies

#### Rust

Install [Rust](https://www.rust-lang.org/tools/install):

```bash
curl https://sh.rustup.rs -sSf | sh
```

#### cmake Version 3.12 or Higher

Download the cmake software here: [download link](https://cmake.org/download/)

Unpack and follow the instructions here: [instructions link](https://cmake.org/install/)

#### Build Tools for Your OS

##### Linux: 

```bash
sudo apt-get install build-essential
```

##### Windows: [Follow these instructions for MSVC](https://docs.microsoft.com/en-us/cpp/build/vscpp-step-0-installation?view=vs-2017)

##### MacOS: [Install XCode via the App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)

#### Install Additional Dependencies

Install the following additional dependencies using the terminal.

```bash
sudo apt-get install -y build-essential git llvm-3.9-dev libclang-3.9-dev clang-3.9 libssl-dev pkg-config
```

#### Install Additional Rust Components

Install additional Rust components:

```bash
rustup install nightly-2019-06-26
```

```bash
rustup default nightly-2019-06-26
```

```bash
rustup component add rustfmt-preview
```

#### Install jq

`jq` is an optional, but useful addition to our needed software. `jq` can provide a more readable format of JSON output in the terminal, which helps us more quickly digest mm2's data.

##### Linux:

```
sudo apt-get install jq
```

##### MacOS:

Download the appropriate file from [this link.](https://stedolan.github.io/jq/download/)

In your terminal, make the file executable by changing into the directory where the file downloaded and executing:

```
chmod +x jq
```

Then execute the file.

##### Windows:

Download and execute the appropriate file from [this link.](https://stedolan.github.io/jq/download/)

### Build MM2

Clone the MM2 repository:

```bash
cd ~
git clone https://github.com/artemii235/SuperNET.git --branch mm2 --single-branch && cd SuperNET
```

Compile the source code:

```bash
cargo build --features native -vv
```

If everything installs successfully you will see something similar:

```
“Finished dev [optimized + debuginfo] target(s) in 3m 33s”
```

The MM2 executable is now built and available here: `~/SuperNET/target/debug/mm2`
