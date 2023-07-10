# How To Compile Komodo DeFi Framework from Source

The following tutorial introduces the reader to a simple method to build the Komodo DeFi Framework from source.

## Installing Dependencies

#### Step 1: OS Packages

##### Command

```bash
sudo apt update
sudo apt-get install build-essential git jq llvm-3.9-dev libclang-3.9-dev clang-3.9 cmake libssl-dev pkg-config
```

If you are using Ubuntu 20.04, run:

```bash
sudo apt update
sudo apt-get install build-essential git jq llvm-dev libclang-dev clang cmake libssl-dev pkg-config
```

For rpm-based distributions:

```bash
sudo dnf groupinstall "Development Tools"
sudo dnf install jq clang cmake openssl-devel clang-devel libzstd systemd-devel  # systemd-devel is used for libudev dep instead of pkg-config
```

#### Step 2: Install Rust

##### Command

```bash
curl https://sh.rustup.rs -sSf | sh
```

When asked to select an installation type, select the following.

```
2) Customize installation
```

Choose default host triple and toolchain, then select minimal profile.

<collapse-text hidden title="Sample Output">

```
$ curl https://sh.rustup.rs -sSf | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust programming
language, and its package manager, Cargo.

It will add the cargo, rustc, rustup and other commands to Cargo's bin
directory, located at:

  /home/mylo/.cargo/bin

This path will then be added to your PATH environment variable by modifying the
profile file located at:

  /home/mylo/.profile

You can uninstall at any time with rustup self uninstall and these changes will
be reverted.

Current installation options:

   default host triple: x86_64-unknown-linux-gnu
     default toolchain: stable
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>2

I'm going to ask you the value of each of these installation options.
You may simply press the Enter key to leave unchanged.

Default host triple?


Default toolchain? (stable/beta/nightly/none)


Profile (which tools and data to install)? (minimal/default/complete)
minimal

info: syncing channel updates for 'stable-x86_64-unknown-linux-gnu'
info: latest update on 2019-07-04, rust version 1.36.0 (a53f9df32 2019-07-03)
info: downloading component 'rustc'
info: downloading component 'rust-std'
info: downloading component 'cargo'
...
...
info: downloading component 'rust-docs'
info: installing component 'rustc'
 91.1 MiB /  91.1 MiB (100 %)  17.7 MiB/s in  5s ETA:  0s
info: installing component 'rust-std'
....
...
 stable installed - rustc 1.36.0 (a53f9df32 2019-07-03)


Rust is installed now. Great!

To get started you need Cargo's bin directory ($HOME/.cargo/bin) in your PATH
environment variable. Next time you log in this will be done automatically.

To configure your current shell run source $HOME/.cargo/env

```

</collapse-text>

Once the installation is complete, enter `Logout` and then `Login` again.

Alternatively, you may execute the following command in each active shell until you reach the `Login` again.

```bash
source $HOME/.cargo/env
```

#### Step 3: Install Rust components

##### Command

```bash
rustup install nightly-2022-02-01
```

<collapse-text hidden title="Sample Output">

```
$ rustup install nightly-2022-02-01
info: syncing channel updates for 'nightly-2022-02-01-x86_64-unknown-linux-gnu'
696.1 KiB / 696.1 KiB (100 %) 567.6 KiB/s in  2s ETA:  0s
info: latest update on 2022-02-01, rust version 1.49.0-nightly (ffa2e7ae8 2020-10-24)
info: downloading component 'cargo'
  5.3 MiB /   5.3 MiB (100 %) 426.6 KiB/s in  3s ETA:  0s
info: downloading component 'clippy'
  2.4 MiB /   2.4 MiB (100 %) 527.6 KiB/s in  2s ETA:  0s
info: downloading component 'rust-docs'
 13.6 MiB /  13.6 MiB (100 %)   4.3 MiB/s in  3s ETA:  0s
info: downloading component 'rust-std'
 22.3 MiB /  22.3 MiB (100 %)   7.1 MiB/s in  4s ETA:  0s
info: downloading component 'rustc'
 55.1 MiB /  55.1 MiB (100 %)  10.7 MiB/s in  7s ETA:  0s
info: downloading component 'rustfmt'
  3.6 MiB /   3.6 MiB (100 %) 289.6 KiB/s in  2s ETA:  0s
info: installing component 'cargo'
info: Defaulting to 500.0 MiB unpack ram
  5.3 MiB /   5.3 MiB (100 %)   4.4 MiB/s in  1s ETA:  0s
info: installing component 'clippy'
info: installing component 'rust-docs'
 13.6 MiB /  13.6 MiB (100 %)   3.8 MiB/s in  3s ETA:  0s
info: installing component 'rust-std'
 22.3 MiB /  22.3 MiB (100 %)   4.0 MiB/s in  5s ETA:  0s
info: installing component 'rustc'
 55.1 MiB /  55.1 MiB (100 %)   4.6 MiB/s in 12s ETA:  0s
info: installing component 'rustfmt'

  nightly-2022-02-01-x86_64-unknown-linux-gnu installed - rustc 1.49.0-nightly (ffa2e7ae8 2020-10-24)

info: checking for self-updates
info: downloading self-update

```

</collapse-text>

##### Command

```bash
rustup default nightly-2022-02-01
```

<collapse-text hidden title="Sample Output">

```
$ rustup default nightly-2022-02-01
info: using existing install for 'nightly-2022-02-01-x86_64-unknown-linux-gnu'
info: default toolchain set to 'nightly-2022-02-01-x86_64-unknown-linux-gnu'

  nightly-2022-02-01-x86_64-unknown-linux-gnu unchanged - rustc 1.49.0-nightly (ffa2e7ae8 2020-10-24)
```

</collapse-text>

##### Command (Optional, skip this step if it fails)

```bash
rustup component add rustfmt-preview
```

<collapse-text hidden title="Sample Output">

```
$ rustup component add rustfmt-preview
info: downloading component 'rustfmt'
  2.9 MiB /   2.9 MiB (100 %) 928.6 KiB/s in  1s ETA:  0s
info: installing component 'rustfmt'
```

</collapse-text>

## Install the Komodo DeFi Framework

#### Step 1: Download source code

```bash
cd ~ ; git clone https://github.com/KomodoPlatform/atomicDEX-API --branch mm2.1 --single-branch && cd atomicDEX-API
```

<collapse-text hidden title="Sample Output">

```
$cd ~ ; git clone https://github.com/KomodoPlatform/atomicDEX-API --branch mm2.1 --single-branch && cd atomicDEX-API
Cloning into 'atomicDEX-API'...
remote: Enumerating objects: 34, done.
remote: Counting objects: 100% (34/34), done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 107436 (delta 14), reused 21 (delta 11), pack-reused 107402
Receiving objects: 100% (107436/107436), 194.19 MiB | 9.59 MiB/s, done.
Resolving deltas: 100% (84045/84045), done.
```

</collapse-text>

#### Step 2: Compile Source Code

##### Command

```bash
cargo build --features native -vv
```

<collapse-text hidden title="Sample Output">

```
…
…
    Finished dev [optimized + debuginfo] target(s) in 6m 40s
```

</collapse-text>
