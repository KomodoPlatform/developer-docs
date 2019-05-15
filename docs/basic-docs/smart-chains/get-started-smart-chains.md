# Basic Instructions

## Installing Basic Komodo Software

The basic Komodo software package includes two applications.

`komodod` - This is the Smart Chain daemon that powers all Komodo blockchains.

`komodo-cli` - This software allows a developer to execute API calls to `komodod` via the command line.

#### Pre-compiled Executable Software

To install the basic Komodo software, the simplest method is to download and unzip pre-compiled executables.

[<b>Link to Komodo Software pre-compiled executables</b>](https://github.com/KomodoPlatform/komodo/releases)

Once unpacked, simply find and launch `komodod` in the directory where you unzipped the files.

#### Building Komodo Software From Source

You may also build Komodo software from source.

This is not required, but building from source is considered the best practice in a production environment as this allows you to instantly update to the latest patches and upgrades.

[Link to a walkthrough on building Komodo from source](https://docs.komodoplatform.com/komodo/installation.html).

## Interacting with Komodo Chains

Initiate the `komodod` daemon by calling it from the command line and including any desired runtime parameters.

When initiating any Smart Chain other than the main KMD chain, the user should always include all parameters that were used to create the Smart Chain.

::: tip
  Note to Windows Users: Replace ./komodod and ./komodo-cli with komodod.exe and komodo-cli.exe for each step.
:::

To launch the main KMD chain, execute the following command in the directory where `komodod` is installed.

```bash
./komodod &
```

After the daemon launches, you may interact with it using the `komodo-cli` software.

```bash
./komodo-cli API_COMMAND
```

To launch another Smart Chain, include the necessary parameters.

::: tip IMPORTANT
Always execute the launch command EXACTLY as indicated, and as the Smart Chain's developers instruct. If you make a mistake, you must delete the Smart Chain data and re-launch to regain access to the Smart Chain's network.
:::

For example, to launch the DEX Smart Chain, execute:

```bash
./komodod -ac_name=DEX -ac_supply=999999 -addnode=78.47.196.146 &
```

To interact with the DEX daemon, use `komodo-cli` like so:

```bash
./komodo-cli -ac_name=DEX API_COMMAND
```

In the terminal you can call the Komodo documentation by executing:

```bash
./komodo-cli help
```

To learn more via the terminal about a specific API command, execute:

```bash
./komodo-cli help API_COMMAND
```

## Ecosystem Launch Parameters

A list of launch parameters for all Smart Chains in the Komodo ecosystem can be found here.

[Link to list of all Smart Chain launch parameters](https://github.com/jl777/komodo/blob/master/src/assetchains.old)

