# Using Remote marketmaker binary with GUI

**Note that the below instructions are for any unixoid OS. Use with CAUTION!** For using Putty in Windows follow this [how-to](https://blog.devolutions.net/2017/4/how-to-configure-an-ssh-tunnel-on-putty) - the section titled 'Local Port Forwarding'. You'd obviously have to adapt hostnames and port numbers.

To have your local GUI talk to a remote marketmaker using an SSH tunnel, we will just block the marketmaker port (7783 per default) with our SSH tunnel before the local marketmaker is started. After that, any data sent to `http://localhost:7783` will effectively be forwarded in a secure manner to your remote server. Execute the below command in a shell or terminal window, in your local computer. You don't have to be in a certain directory to do it.

```bash
ssh -f -N -L 7783:remoteipaddress:7783 user@server.name
```

Details of `-f -N` parameter from manpage:

```bash
-f      Requests ssh to go to background just before command execution. This is useful if ssh is going to ask for passwords or passphrases,
        but the user wants it in the background.  This implies -n.
        The recommended way to start X11 programs at a remote site is with something like ssh -f host xterm.
        If the ExitOnForwardFailure configuration option is set to ``yes'', then a client started with -f will wait for all
        remote port forwards to be successfully established before placing itself in the background.
-N      Do not execute a remote command.  This is useful for just forwarding ports (protocol version 2 only).
```

The order for the -L 7783:remoteipaddress:7783 parameters is: L - local port (the port that will be opened on your machine, this has to be the port your GUI wants to connect to, 7783) - remoteipaddress (the host the remote end will forward the traffic to, which for us is localhost, seen from the remote end) - remote port (the port the remote end will forward the traffic to, i.e. the port your remote marketmaker listens on, probably 7783 too.)

**Check the ssh(1) manpage for further details.**

After that, just start and use your GUI the usual way. Because our tunnel now blocks the local marketmaker port, your GUI/BarterDEX/marketmaker will probably throw errors about that. You can ignore them. Heres what the respective error from the official BarterDEX GUI would look like:

```bash
port 7783 marketmaker is already in use
```

If there is nothing happening on the GUI for a long time (but you see messages on the remote marketmaker), you'll probably have to check the passphrase.

If there is nothing happening on the GUI and you can't see any messages remotely, your tunnel might be bad. `kill -9` the ssh instance in question and retry as described above.

You may find completely different error. Head over to `#tradebots` channel in Komodo Platform [Discord](https://komodoplatform.com/discord) for help.
