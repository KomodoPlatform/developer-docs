# Use adb to collect GUI logs of the AtomicDEX android app

[adb](https://developer.android.com/studio/command-line/adb) is a debug tool that can be used to collect logs and track down bugs in android apps running on a mobile device.

The following walkthrough describes the process to collect logs using adb.

:::tip Note
Parts of this article are from the stackexchange answer: https://android.stackexchange.com/a/144967
:::

## Preparing the android device

To enable USB debugging on the android device, go to `Settings -› Development`. If you don't have that entry in your settings menu, go to `Settings -› About`, scroll to the `Build number`, and tap it until your device congratulates you having become a developer.

Go back to the main page of the Settings menu, and close to the bottom you should see the "Development" (or "Developers") settings now. Enter it, and enable USB Debugging here.

Once the android device is ready, you have to connect it to your Computer to collect logs. Follow the instructions for your specific OS from the following sections.

## Linux/MacOS

### Install and start adb

```bash
sudo apt update
sudo apt-get install android-tools-adb
sudo adb start-server
```

### Connecting the android device

Enable USB debugging on the android device and connect it to your Personal Computer using a USB device.

To verify that the devise is being detected, run:

```bash
adb devices
```

The first time the command is executed, there will be a connection confirmation dialog on your android device. Allow the connection. Now, the command `adb devices` should display your device

```bash
List of devices attached
8394c6a8	device
```

If the device is not being detected, follow the instructions in this [stackexchange answer](https://android.stackexchange.com/a/144967)

### Collecting logs

Once the device is detected, open the AtomicDEX app on your device and execute the following command on your PC

```bash
adb logcat --pid=$(adb shell pidof -s com.komodoplatform.atomicdex)
```

You should see output similar to

```bash
09-04 19:21:18.524  1784  1784 V KeyguardStatusView: refresh statusview showing:true
09-04 19:21:18.537  1784  1784 V KeyguardDisplayManager: show
09-04 19:21:20.953   882 23243 I chatty  : uid=1000 system_server expire 2 lines
09-04 19:21:22.992   882  1068 I chatty  : uid=1000(system) ActivityManager expire 1 line
09-04 19:21:33.339   882  2495 I chatty  : uid=1000(system) Binder:882_8 expire 1 line
09-04 19:21:39.815   882  1416 I chatty  : uid=1000(system) InputReader expire 5 lines
09-04 19:21:39.917  1174  1295 D QMI_FW  : chen-screen on: is_screen_off = 0
09-04 19:21:39.920  1195  1540 D QMI_FW  : chen-screen on: is_screen_off = 0
09-04 19:21:39.925   882   882 I chatty  : uid=1000 system_server expire 9 lines
09-04 19:21:40.034   882  1453 I chatty  : uid=1000(system) ColorBalanceThr expire 5 lines
09-04 19:21:40.211   882  1169 I chatty  : uid=1000(system) PowerManagerSer expire 21 lines
09-04 19:21:40.219  3112  3112 V DreamService[DozeService]: wakeUp(): fromSystem=true, mWaking=false, mFinished=false
09-04 19:21:40.219  3112  3112 V DreamService[DozeService]: finish(): mFinished=false
09-04 19:21:40.226  3112  3112 V DreamService[DozeService]: detach(): Calling onDreamingStopped()
09-04 19:21:40.226  3112  3112 V DreamService[DozeService]: onDreamingStopped()
09-04 19:21:40.233  3112  3112 V DreamService[DozeService]: onDestroy()
09-04 19:21:40.239   882  6736 I chatty  : uid=1000(system) Binder:882_15 expire 2 lines
09-04 19:21:42.963   882  1114 I chatty  : uid=1000(system) batterystats-wo expire 10 lines
09-04 19:21:46.119  1174  1295 D QMI_FW  : chen-screen off: is_screen_off = 1
09-04 19:21:46.119  1195  1540 D QMI_FW  : chen-screen off: is_screen_off = 1
09-04 19:21:46.302   882  1169 I chatty  : uid=1000(system) PowerManagerSer expire 44 lines
09-04 19:21:46.302   882  1164 I chatty  : uid=1000(system) android.fg expire 7 lines
09-04 19:21:46.307  3112  3112 V DreamService[DozeService]: onCreate()
09-04 19:21:46.310  3112  3112 W DreamService[DozeService]: Updating doze without a window token.
09-04 19:21:46.313  3112  3112 V DreamService[DozeService]: onBind() intent = Intent { act=android.service.dreams.DreamService flg=0x800000 cmp=com.oneplus.aod/com.oneplus.doze.DozeService }
09-04 19:21:46.314  3112  3112 V DreamService[DozeService]: Calling onDreamingStarted()
09-04 19:21:46.314  3112  3112 V DreamService[DozeService]: onDreamingStarted()
09-04 19:21:46.342   882  2495 I chatty  : uid=1000(system) Binder:882_8 expire 5 lines
09-04 19:21:46.354   882   882 I chatty  : uid=1000 system_server expire 49 lines
09-04 19:21:46.394   882  1416 I chatty  : uid=1000(system) InputReader expire 2 lines
09-04 19:21:46.395   882  1453 I chatty  : uid=1000(system) ColorBalanceThr expire 18 lines
```

Once you have confirmed the output on your terminal looks similar, hit `CTRL + C` on your keyboard to interrupt the log on your terminal.

To collect logs of the app to a text file when the bug/problem case is executed, run the following command:

```bash
adb logcat --pid=$(adb shell pidof -s com.komodoplatform.atomicdex) > ~/Desktop/atomicDEX-log.txt
```

There won't be any visible output on the terminal except for a blinking cursor.

Now use the app on the android device till the problem case occurs. Then hit `CTRL + C` on your keyboard to exit from the command. You will find a text file named `atomicDEX-log.txt` on your desktop. Share it with the developer to report the issue.

## Windows

WIP
