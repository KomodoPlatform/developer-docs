# Running Komodo Software in Debug Mode

## Introduction

To run Komodo software in debug mode, follow these steps.

## Install gdb

```bash
sudo apt-get install gdb
```

## Run Komodo Daemon With `gdb` Tool

Initiate your daemon using with `gdb -args` as a prefix.

For example, the below command would initiate the Komodod daemon with mining active and a designated pubkey.

```bash
gdb -args ./src/komodod -gen -genproclimit=2 -pubkey="03af2412ebf9517a43d192193490476fd0a44312c70755e07eb03b6d71338ebc9d"
```
::: tip

If you are having trouble initiating komodod in the shell, try use the absolute path to komodod. For example, <b>/home/$USERNAME/komodo/src/komodod</b>

:::

The shell should return the following prompt.

```bash
gdb>
```

Execute `run` in the shell to start Komodo in debug mode.

```bash
gdb> run
```

## Retrieving Backtrace Data

Whenever komodod crashes, you will again see `gdb>` as a prompt.

To recall the last stages of komodod before the crash, execute the following command.

##### Command

```bash
gdb> backtrace
```

The returned data can be shared with any Komodo developer to assist in troubleshooting Komodo development.

Select and highlight all relevant data using the cursor, and then use `CTRL + SHIFT + C` to copy to the clipboard.
