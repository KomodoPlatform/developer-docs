# Running Komodo Software in Debug Mode

# Debug Komodo

To run Komodo in debug mode and help developer troubleshoot issues found at client end systems, please follow these steps:

::: tip Note
These steps are including notary node references in komodod command, but in case you are not a notary node, you don't need to include those command parameters.
:::

## Prerequisite is to install gdb

```bash
sudo apt-get install gdb
```

## Run Komodo daemon with `gdb` tool

Whichever komodod command you are running which results in crashing or problematic behavior run it with `gdb -args`

```bash
gdb -args  ./src/komodod -gen -genproclimit=2 -notary -pubkey="03af2412ebf9517a43d192193490476fd0a44312c70755e07eb03b6d71338ebc9d"
```

*If you have trouble getting it started, try using the full path to the executable.*

The above command initialize debugging.

Once you see `gdb>` command prompt type `run` to start komodo in debug mode.

## Getting backtrace data

Then when it crashes you'll again see `gdb>` prompt, and some message from komodod daemon itself left some output in gdb before `gdb>`.

Type `backtrace` and and it will show further very important info that you need to pass to Komodo developers. Post whatever output you get from `backtrace` command to help troubleshoot issues.

