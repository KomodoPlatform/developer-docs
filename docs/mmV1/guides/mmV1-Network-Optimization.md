# Network Optimisations & Configuration of mmV1 on a Very FAST Computer

On a very fast system `nanomsg` can crash. The crash is due to socket exhaustion, i.e., no more sockets in the system are available due to the system processing so fast. It has to do with the coins loop saturating things and using up all sockets, while `Nanomsg` assumes it can get an open socket. The following magic TCP settings change will get sockets to recycle as fast as possible.

The workaround is to create a new conf file and make it run on every boot. You can set them with `sysctl -w`, but to make them permanent, better put them in a file like `/etc/sysctl.d/01-barterdex.conf` and execute `sudo sysctl -p /etc/sysctl.d/01-barterdex.conf` afterwards which will set both parameters.

**Note:** `root` or `sudo` needed for these commands. If you are a total `N00B` and not sure what these lines do, you shouldn't mess with these settings.

To create the conf file use `sudo nano /etc/sysctl.d/01-barterdex.conf` and paste the following inside the conf file and save it using `CTRL+X` then `Y` and hit `Enter`.

Contents of `01-barterdex.conf` file:

```bash
net.core.rmem_default = 1048576
net.core.wmem_default = 1048576
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.udp_rmem_min = 16384
net.ipv4.udp_wmem_min = 16384
net.core.netdev_max_backlog = 262144
net.ipv4.tcp_max_orphans = 262144
net.ipv4.tcp_max_syn_backlog = 262144
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_max_tw_buckets = 2000000
net.ipv4.ip_local_port_range = 16001 65530
net.core.somaxconn = 20480
net.ipv4.tcp_low_latency = 1
net.ipv4.tcp_slow_start_after_idle = 0
net.ipv4.tcp_mtu_probing = 1
net.ipv4.tcp_fastopen = 3
net.ipv4.tcp_limit_output_bytes = 131072
```

You can also use a kernel module dealing with network congestion. But, there is not enough data on how much it helps. For this you need to add the following 2 lines into the previous file. Try to load the module with `sudo modprobe tcp_bbr` to see if you have it. If the terminal shows nothing, that is good. It means it could load the module.

```bash
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr
```

And, for the `bbr` module in the last line to be automatically loaded on boot, put the following line in `/etc/modules-load.d/modules.conf` file.

```bash
tcp_bbr
```

Reboot your computer/server.
