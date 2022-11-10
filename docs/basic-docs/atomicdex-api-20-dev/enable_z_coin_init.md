
## task::enable_z_coin::init

Z coins, like Pirate (ARRR) and the test coin ZOMBIE take a little longer to enable, and use a new two step method to enable. Activation can take a little while the first time, as we need to download some block cache data, and build a wallet database. Subsequent enabling will be faster, but still take a bit longer than other coins. The second step for activation is optional, but allows us to check the status of the activation process.
<b>To enable Z coins you also need to [install some Zcash Params](https://forum.komodoplatform.com/t/installing-zcash-params/603)</b>


#### Arguments

| Structure                                 | Type            | Description                                                                                                                                                          |
| ----------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticker                                    | string          | Ticker of coin to activate                                                                                                                                           |
| activation_params                         | object          | Contains details required for activation as explained below                                                                                                          |
| activation_params.mode.rpc                | string          | Set as `Light` to use external electrum & lightwallet_d servers or `Native` to use local block chain data. If native, the `rpc_data` fields below are not required.  |
| activation_params.mode.rpc_data           | list of objects | Contains details about servers to be used for `Light` mode operation.                                                                                                |
| ..rpc_data.electrum_servers.protocol      | string          | Transport protocol used by AtomicDEX API to connect to the electrum server (`TCP` or `SSL`). Optional, defaults to `TCP`                                             |
| ..rpc_data.electrum_servers.urls          | string          | Urls which are hosting electrum servers                                                                                                                              |
| ...electrum_servers.disable_cert_verification | boolean     | If `true`, this disables server SSL/TLS certificate verification (e.g. to use self-signed certificate). <b>Use at your own risk</b>                                  |
| ..rpc_data.light_wallet_d_servers         | list of strings | Urls which are hosting lightwallet_d servers                                                                                                                         |
| activation_params.zcash_params_path       | string          | Optional. Path to folder containing [Zcash parameters](https://z.cash/technology/paramgen/). Defaults to standard location as defined in [this guide](https://forum.komodoplatform.com/t/installing-zcash-params/603) |



#### Response

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | An identifying number which is used to query task status.                                                          |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"$userpass\",
    \"method\": \"task::enable_z_coin::init\",
    \"mmrpc\": \"2.0\",
    \"params\": {
        \"ticker\": \"ZOMBIE\",
        \"activation_params\": {
            \"mode\": {
                \"rpc\": \"Light\",
                \"rpc_data\": {
                    \"electrum_servers\": [{\"url\":\"zombie.sirseven.me:10033\"}],
                    \"light_wallet_d_servers\": [\"http://zombie.sirseven.me:443\"]
                }
            },
            \"zcash_params_path\": \"/home/username/path_to/.zcash-params\"
        }
    }
}"
echo
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "task_id": 0
  },
  "id": null
}
```

</collapse-text>

</div>

