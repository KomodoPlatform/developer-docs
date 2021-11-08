# Installing the AtomicDEX API

### Minimum Requirements for Installation

- MacOS, Windows (see note below), and Linux (see note below)

- 64-bit (see note below for 32-bit)

- Minimum 2GB of free RAM

- Normal user account with admin/root privileges

::: warning Note
If you would prefer to avoid building the AtomicDEX API from source, you can download our pre-built binary [from our Github releases page.](https://github.com/KomodoPlatform/atomicDEX-API/releases)
:::

### Note about Linux

For Linux users, much of the following documentation assumes that you are building and running the AtomicDEX API on a Debian 9/10 or Ubuntu 18.04 host. If you have questions about other releases or distributions, [please reach out to us on the #dev-marketmaker channel on Discord.](https://komodoplatform.com/discord)

### Note about Installing on Windows

Developing software on Windows typically requires an installation of Git Bash.

Git Bash is a terminal shell based on Unix. It is similar to the Windows Shell or Windows Command Prompt, but uses Unix-based syntax.

All instructions in the AtomicDEX API documentation are given with Unix-based syntax, and therefore we recommend installing Git Bash before proceeding.

You may download and install Git Bash for Windows here:

[Download Git Bash for Windows](https://git-scm.com/download/win)

The download should begin automatically.

Double-click the downloaded `.exe` file and follow the Installation Wizard.

Once Git Bash is open and running on your machine, you may continue.

### Note About 32-bit Operating Systems

We are currently testing 32-bit operating system functionality. As 32-bit machines can often be comparatively older hardware, we cannot guarantee that AtomicDEX API will run successfully by default.

We invite users of 32-bit operating systems to test the software and [report any errors to our team on the #dev-marketmaker channel on Discord](https://komodoplatform.com/discord).

### Installing Dependencies

#### Rust

Install [Rust](https://www.rust-lang.org/tools/install):

```bash
curl https://sh.rustup.rs -sSf | sh
```

Choose `2)` to customize the installation, select `default host triple` and `default toolchain`, and choose the `minimal` profile.

<div>

<img src="/get-started-atomicdex/rustup-minimal.png">

</div>

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
sudo apt-get install -y git llvm-3.9-dev libclang-3.9-dev clang-3.9 libssl-dev pkg-config
```

If you are using Ubuntu-20.04, run:

```bash
sudo apt-get install -y git llvm-dev libclang-dev clang libssl-dev pkg-config
```

#### Install Additional Rust Components

Install additional Rust components:

```bash
rustup install nightly-2020-10-25
```

```bash
rustup default nightly-2020-10-25
```

(Optional) Skip this step if it fails.

```bash
rustup component add rustfmt-preview
```

#### Install jq

`jq` is an optional, but useful addition to our needed software. `jq` can provide a more readable format of JSON output in the terminal, which helps us more quickly digest the data respone output by the AtomicDEX API.

##### Linux:

```bash
sudo apt-get install jq
```

##### MacOS:

Download the appropriate file from [this link.](https://stedolan.github.io/jq/download/)

In your terminal, make the file executable by changing into the directory where the file downloaded and executing:

```bash
chmod +x jq
```

Execute the file.

##### Windows:

Download and execute the appropriate file from [this link.](https://stedolan.github.io/jq/download/)

### Build AtomicDEX API

Clone the AtomicDEX API repository:

```bash
cd ~
git clone https://github.com/KomodoPlatform/atomicDEX-API --branch mm2.1 --single-branch && cd atomicDEX-API
```

Compile the source code.

```bash
cargo build --features native -vv
```

#### MacOS

If the above command results in an error, use the following command instead.

```bash
LIBRARY_PATH=/usr/local/opt/openssl/lib cargo build --features native -vv
```

Alternatively, create a permanent link called `libcrypto` to `/usr/local/lib`.

```bash
ln -s /usr/local/opt/openssl/lib/libcrypto.a /usr/local/lib
```

If everything installed successfully, a response that is similar to the following should appear.

```
“Finished dev [optimized + debuginfo] target(s) in 3m 33s”
```

The AtomicDEX API executable is now built and available here: `~/atomicDEX-API/target/debug/mm2`
