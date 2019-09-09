# Use adb to collect GUI logs of the AtomicDEX android app

[adb](https://developer.android.com/studio/command-line/adb) is a debug tool that can be used to collect logs and track down bugs in android apps running on a mobile device.

The following walkthrough describes the process to collect logs using adb.

:::tip Note
Some parts of this article are taken from the following stackexchange answer: https://android.stackexchange.com/a/144967
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

Excerpts from the article `https://www.xda-developers.com/install-adb-windows-macos-linux/` are used in the following section

- Download the [ADB ZIP file for Windows](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
- Extract the contents of this ZIP file into an easily accessible folder
- Open Windows explorer and browse to where you extracted the contents of this ZIP file
- Then open up a Command Prompt from the same directory as this ADB binary. This can be done by holding Shift and Right-clicking within the folder then click the “open command prompt here” option. (Some Windows 10 users may see “PowerShell” instead of “command prompt”.)

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/power-shell.png">

</div>

- Connect your smartphone or tablet to your computer with a USB cable. Change the USB mode to “file transfer (MTP)” mode. Some OEMs may or may not require this, but it’s best to just leave it in this mode for general compatibility.
- In the Command Prompt window, enter the following command to launch the ADB daemon: `.\adb.exe devices`
- On your phone’s screen, you should see a prompt to allow or deny USB Debugging access. Naturally, you will want to grant USB Debugging access when prompted (and tap the always allow check box if you never want to see that prompt again).

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/allow-usb-debugging.png">

</div>

- Finally, re-enter the command `.\adb.exe devices`. If everything was successful, you should now see your device’s serial number in the command prompt.
- Now, open the AtomicDEX app on your mobile and run the following command in your Command Prompt:

```powershell
.\adb.exe logcat --pid=$(.\adb.exe shell pidof -s com.komodoplatform.atomicdex)
```

- Sample output:

```bash
09-09 21:44:10.834 10446 10446 W 1.gpu   : type=1400 audit(0.0:9728111): avc: denied { read } for name="u:object_r:vendor_default_prop:s0" dev="tmpfs" ino=22632 scontext=u:r:untrusted_app:s0:c52,c257,c512,c768 tcontext=u:object_r:vendor_default_prop:s0 tclass=file permissive=0
09-09 21:44:10.845 10446 10465 E libc    : Access denied finding property "vendor.debug.egl.swapinterval"
09-09 21:44:11.370 10446 10465 I chatty  : uid=10308(com.komodoplatform.atomicdex) 1.gpu identical 31 lines
09-09 21:44:11.385 10446 10465 E libc    : Access denied finding property "vendor.debug.egl.swapinterval"
09-09 21:44:11.387 10446 10464 I flutter : ALL COINS ACTIVATES
09-09 21:44:11.389 10446 10464 I flutter : ConnectionState.active
09-09 21:44:11.420 10446 10465 E libc    : Access denied finding property "vendor.debug.egl.swapinterval"
09-09 21:44:11.431 10446 10465 I chatty  : uid=10308(com.komodoplatform.atomicdex) 1.gpu identical 1 line
09-09 21:44:11.441 10446 10465 E libc    : Access denied finding property "vendor.debug.egl.swapinterval"
09-09 21:44:11.833 10446 10464 I flutter : getBalance{"address":"1NHF2GX8Fb9skXQdMGgRoGk9mH6tzSfqpV","balance":"0","coin":"BTC","locked_by_swaps":"0"}
09-09 21:44:11.836 10446 10464 I flutter : getBalance{"address":"RWZS6nQQrQxSpXmppSfYto5MXYZVdM4wZr","balance":"0","coin":"KMD","locked_by_swaps":"0"}
09-09 21:44:12.339 10446 10464 I flutter : LOADCOIN FINISHED
```

- If the output in your command prompt is similar, it means the setup is working correctly. Hit `CTRL + C` to interrupt the log.
- Create a folder named `logs` in the extracted folder. Run: `mkdir logs`
- To collect logs of the app to a text file when the bug/problem case is executed, run the following command

```powershell
.\adb.exe logcat --pid=$(.\adb.exe shell pidof -s com.komodoplatform.atomicdex) >  .\logs\atomicDEX-log.txt
```

- There won't be any visible output on the terminal except for a blinking cursor.
- Now use the app on the android device till the problem case occurs. Then hit `CTRL + C` on your keyboard to exit from the command. You will find a text file named `atomicDEX-log.txt` in the folder named `logs` in the extracted folder. Share it with the developer to report the issue.
