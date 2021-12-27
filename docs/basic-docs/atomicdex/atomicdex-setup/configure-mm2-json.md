# AtomicDEX API configuration

AtomicDEX-API configuration parameters are [listed in the source code](https://github.com/KomodoPlatform/atomicDEX-API/blob/mm2.1/mm2src/mm2.rs#L126), along with [additional runtime flags](https://github.com/KomodoPlatform/atomicDEX-API/blob/mm2.1/mm2src/mm2.rs#L115), and [per-process environment variables](https://github.com/KomodoPlatform/atomicDEX-API/blob/mm2.1/mm2src/mm2.rs#L171)


## MM2.json

When running the AtomicDEX API via commandline with the `mm2` binary, some basic configuration parameters need to be defined in either an `MM2.json` file, or at runtime.

| Parameter    | Type              | Description                     |
| ------------ | ------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gui          | string            | Information about your GUI; place essential info about your application (name, version, etc.) here. For example: AtomicDEX iOS 1.0.1                        |
| netid        | integer           | Nework ID number, telling the AtomicDEX API which network to join. 7777 is the current main network, though alternative netids can be used for testing or "private" trades |
| passphrase   | string            | Your passphrase; this is the source of each of your coins private keys. KEEP IT SAFE!                                                                       |
| allow_weak_password   | boolean  | If `true`, will allow low entropy rpc_password. If `false` rpc_password must not have 3 of the same characters in a row, must be between 8-32 characters in length, must contain at least one of each of the following: numeric, uppercase, lowercase, special character (e.g. !#$*). It also can not contain the word "password", or the chars `<`, `>`, and `&`. Defaults to `false`.                                                                        |
| rpc_password | string            | Your password for protected RPC methods (userpass)                                                                                                          |
| userhome     | string            | The path to your home, called from your environment variables and entered as a regular expression                                                           |
| dbdir        | string            | AtomicDEX API database path. Optional, defaults to a subfolder named `DB` in the path of your `mm2` binary                                                  |
| rpcip        | string            | IP address to bind to for RPC server. Optional, defaults to 127.0.0.1                                                                                       |
| rpcport      | integer           | Port to use for RPC communication. Optional, defaults to 7783                                                                                               |
| i_am_seed    | boolean           | Runs AtomicDEX API as a seed node mode (acting as a relay for AtomicDEX API clients). Optional, defaults to false. Use of this mode is not reccomended on the main network (7777) as it could result in a pubkey ban if non-compliant. on alternative testing or private networks, at least one seed node is required to relay information to other AtomicDEX API clients using the same netID.                                            |
| seednodes    | list of strings   | Optional. If operating on a test or private netID, the IP address of at least one seed node is required (on the main network, these are already hardcoded)  |


Example (allowing weak password):

```json
{
  "gui": "DEVDOCS_CLI",
  "netid": 7777,
  "rpc_password": "ENTER_UNIQUE_PASSWORD",
  "passphrase": "ENTER_UNIQUE_SEED_PHRASE_DONT_USE_THIS_CHANGE_IT_OR_FUNDS_NOT_SAFU",
  "allow_weak_password": true,
  "userhome": "/${HOME#\"/\"}",
  "dbdir": "/path/to/DB/folder"
}
```

Example (not allowing weak password):

```json
{
  "gui": "DEVDOCS_CLI",
  "netid": 7777,
  "rpc_password": "Ent3r_Un1Qu3_Pa$$w0rd",
  "passphrase": "ENTER_UNIQUE_SEED_PHRASE_DONT_USE_THIS_CHANGE_IT_OR_FUNDS_NOT_SAFU",
  "allow_weak_password": false,
  "userhome": "/${HOME#\"/\"}",
  "dbdir": "/path/to/DB/folder"
}
```

The `mm2` binary will look for the `MM2.json` in the same folder as your `mm2` binary, unless it is defined as being in a different path via the `MM2_CONF_PATH` environment variable.
Alternatively, you can define the `MM2.json` parameters at runtime as below:

```bash
stdbuf -oL nohup ./mm2 "{\"gui\":\"DEVDOCS_CLI\",\"netid\":7777, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"ENTER_UNIQUE_SEED_PHRASE_DONT_USE_THIS_CHANGE_IT_FUNDS_OR_NOT_SAFU\", \"rpc_password\":\"Ent3r_Un1Qu3_Pa$$w0rd\"}" &
```

::: tip

When using the AtomicDEX API on a VPS without accompanying tools such as `tmux` or `screen`, it is recommended that the user add the command `nohup` to the AtomicDEX API launch command. This addition ensures that the AtomicDEX API instance is not shutdown when the user logs out.


Optional environment variables that can be user defined are as follows:

| Variable      | Type              | Description                     |
| ------------- | ------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MM2_CONF_PATH | string            | File path. MM2 will try to load the JSON configuration from this file. The file must contain valid json with structure mentioned above. Defaults to `MM2.json` in the same folder as your `mm2` binary |
| MM_COINS_PATH | string            | File path. MM2 will try to load coins data from this file. File must contain valid json. A comprehensive version for public use is maintained in the [Komodo Platform coins github repository](https://github.com/KomodoPlatform/coins/blob/master/coins)  |
| MM_LOG        | string            | File path. Must end with '.log'. The AtomicDEX api will write logs to this file. |
| USERPASS      | string            | For convenience, this variable can store the value of your `rpc_password` to be referenced in any shell scripts |

:::

## Setting userpass Environment Variable

::: tip
Userpass will be renamed to <b>rpc_password</b> for clarity in the near future
:::

Make a new file in the `~/atomicDEX-API/target/debug` directory called `USERPASS` and enter the following text, including the `rpc_password` you specified earlier:

```bash
export USERPASS="RPC_PASSWORD"
```

Save it, and then in the terminal execute:

```bash
source USERPASS
```

Test it by executing:

```bash
echo $USERPASS
```

You should see your USERPASS as a returned value.

::: tip
The `USERPASS` environment variable will remain in our terminal's memory until we close the session. When we open up a new session later, we need to create the `USERPASS` environment variable again. 
:::

Refer to the rest of the AtomicDEX API documentation for details and examples of how to:
* [Enable coins](../../atomicdex-api-legacy/electrum.html)
* [Place orders](../../atomicdex-api-legacy/buy.html)
* [View the orderbook](../../atomicdex-api-legacy/orderbook.html) 
* [Check your balance](../../atomicdex-api-legacy/my_balance.html)
* [Configure bot trading!](../../atomicdex-api-20-dev/start_simple_market_maker_bot.html)

When you are finished, you can exit the AtomicDEX API using the following command:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"stop\"}"
```

If you have any questions or feedback, join us on the [Komodo Platform Discord Server](https://komodoplatform.com/discord) and tell us about your experience!
