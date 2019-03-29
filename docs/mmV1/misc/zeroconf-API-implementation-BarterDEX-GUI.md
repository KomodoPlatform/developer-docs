# How zeroconf API was implemented in BarterDEX GUI

This is how Grewal Satinder implemented zeroconf in BarterDEX GUI:

The files you need:

- [/ipc/shepherd-ipc.js@master#L62](https://github.com/KomodoPlatform/BarterDEX/blob/master/ipc/shepherd-ipc.js#L62)

- [/gui/js/dex_SimpleActions.js@master#L5438](https://github.com/KomodoPlatform/BarterDEX/blob/master/gui/js/dex_SimpleActions.js#L5438)

Look for keyword `zeroconf` in the file. There is Shepherd-IPC-API which interacts with the GUI through Electron IPC. This API's job is to record and backup the output of zeroconf results. Doesn't matter if it's success or error, it will record that output in a log file.

The reason is in case the user somehow got messed up setup with the mm or something which results in loosing the access to their txid. These log files can be used to track those txids done for zeroconf and recover those funds sent to zeroconf. These logs files feature is independent operation to the `marketmaker` zeroconf API calls.

The gui/js side of code is managing the `deposit` part and `claim` part. zeroconf is very easy to implement, as its the only deposit/claim process, nothing else much.
