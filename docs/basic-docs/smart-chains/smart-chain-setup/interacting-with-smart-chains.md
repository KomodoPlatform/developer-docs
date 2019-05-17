# Interacting with Komodo Chains

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

