# Withdraw Tasks



## task\_withdraw\_init

The `task::withdraw::init` method generates and signs transaction which will transfer the `amount` of `coin` to the address indicated in the `to` argument. The status of this method can be queried via the [withdraw_status](#withdraw-status) method, or .

It will return the transaction hex (via `task::withdraw::status`), which then needs to be broadcast with the [sendrawtransaction](../atomicdex-api-legacy/send_raw_transaction.html) to complete the withdrawal. This method is uses the same input fields as the [standard v2 withdraw method](../atomicdex-api-20/withdraw.html), with additional optional fields to specify the `from` address when using a hardware or HD wallet. There are two way to indicate which HW/HD address to send funds from:

- Using `derivation_path` as a single input. E.g `m/44'/20'/0'/0/2`
- Using `account_id` (0), `chain` (External) & `address_id` (2) inputs. The bracketed values are the equavalent of the derivation path above.

To cancel the transaction generation, use the [withdraw_cancel](#withdraw-cancel) method.

:::tip
When used for ZHTLC coins like ARRR or ZOMBIE, it may take some time to complete.
:::


### Arguments

| Structure            | Type             | Description                                                                                                                               |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| coin                 | string           | The name of the coin the user desires to withdraw                                                                                         |
| to                   | string           | Coins are withdrawn to this address                                                                                                       |
| amount               | string (numeric) | The amount the user desires to withdraw, ignored when `max=true`                                                                          |
| memo                 | string           | Optional, used for ZHTLC and Tendermint coins only. Attaches a memo to the transaction.                                                   |
| from                 | string           | Optional, used only for transactions using a hardware or HD wallet.                                                                       |
| from.derivation_path | string           | Optional, HW/HD wallets only. Follows the format `m/44'/COIN_ID'/ACCOUNT_ID'/CHAIN/ADDRESS_ID`                                            |
| from.account_id      | integer          | Optional, HW/HD wallets only. Generally this will be `0` unless you have multiple accounts registered on your HW/HD wallet                |
| from.chain           | string           | Optional, HW/HD wallets only. `Internal`, or `External`. External is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments). Internal is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change. |
| from.address_id      | integer          | Optional, HW/HD wallets only. Check the output from coin activation to find the ID of an address with balance.                            |
| max                  | bool             | Optional. Withdraw the maximum available amount. Defaults to `false`                                                                      |
| fee                  | object           | Optional. Used only to set a custom fee, otherwise fee value will be derived from a deamon's `estimatefee` (or similar) RPC method        |
| fee.type             | string           | Type of transaction fee; possible values: `UtxoFixed` or `UtxoPerKbyte`                                                                   |
| fee.amount           | string (numeric) | Fee amount in coin units, used only when type is `UtxoFixed` (fixed amount not depending on tx size) or `UtxoPerKbyte` (amount per Kbyte) |


#### Response

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | An identifying number which is used to query task status.                                                          |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{
    \"mmrpc\": \"2.0\",
    \"userpass\": \"${userpass}\",
    \"method\": \"task::withdraw::init\",
    \"params\": {
        \"coin\": \"COIN_NAME\",
        \"to\": \"RECIPIENT_ADDRESS\",
        \"amount\": \"AMOUNT\"
    },
    \"id\": 0
}"
```

#### Command (max = true)

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{
    \"mmrpc\": \"2.0\",
    \"userpass\": \"${userpass}\",
    \"method\": \"task::withdraw::init\",
    \"params\": {
        \"coin\": \"COIN_NAME\",
        \"to\": \"RECIPIENT_ADDRESS\",
        \"max\": true
    },
    \"id\": 0
}"
```

#### Command (custom UtxoFixed fee)

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{
    \"mmrpc\": \"2.0\",
    \"userpass\": \"${userpass}\",
    \"method\": \"task::withdraw::init\",
    \"params\": {
        \"coin\": \"COIN_NAME\",
        \"to\": \"RECIPIENT_ADDRESS\",
        \"amount\": \"AMOUNT\",
        \"fee\": {
            \"type\":\"UtxoFixed\",
             \"amount\":\"0.001\"
         }
    },
    \"id\": 0
}"
```

#### Command (custom UtxoPerKbyte fee)

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{
    \"mmrpc\": \"2.0\",
    \"userpass\": \"${userpass}\",
    \"method\": \"task::withdraw::init\",
    \"params\": {
        \"coin\": \"COIN_NAME\",
        \"to\": \"RECIPIENT_ADDRESS\",
        \"amount\": \"AMOUNT\",
        \"fee\": {
            \"type\":\"UtxoPerKbyte\",
             \"amount\":\"0.00097\"
         }
    },
    \"id\": 0
}"
```

#### Command (HW/HD wallet: derivation path option)

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::withdraw::init\",
    \"params\": {
        \"coin\": \"COIN_NAME\",
        \"to\": \"ADDRESS_OF_RECIPIENT\",
        \"amount\": AMOUNT_TO_SEND,
        \"from\": {
            \"derivation_path\": \"DERIVATION_PATH\"
        }
    }
}"
```

#### Command (HW/HD wallet: account_id, chain & address_id option)

```bash
curl --url "http://127.0.0.1:7783" --data "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"task::withdraw::init\",
    \"params\": {
        \"coin\": \"COIN_NAME\",
        \"to\": \"ADDRESS_OF_RECIPIENT\",
        \"amount\": AMOUNT_TO_SEND,
        \"from\": {
            \"account_id\": 0,
            \"chain\": \"External\",
            \"address_id\": ADDRESS_ID
        }
    }
}"
```


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response

```json
{
  "mmrpc": "2.0",
  "result": {
    "task_id": 6
  },
  "id": null
}
```

</collapse-text>

</div>



## task\_withdraw\_status

To get the status of your withdrawal transaction generation, use the `task::withdraw::status` method. Once ready, it will provide the raw hex used to broadcast your transaction with [sendrawtransaction](../atomicdex-api-legacy/send_raw_transaction.html). The response returned is the same as what is returned from the [standard v2 withdraw method](../atomicdex-api-20/withdraw.html#response)


#### Arguments

| Parameter          | Type    | Description                                                                               |
| ------------------ | ------- | ----------------------------------------------------------------------------------------- |
| task_id            | integer | The identifying number returned when initiating the initialisation process.               |
| forget_if_finished | boolean | If `false`, will return final response for completed tasks. Optional, defaults to `true`  |


#### Response

| Structure                  | Type              | Description                                                                                                                                                                                     |
| -------------------------- | ------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status                     | string            | A short indication of how the withdrawal is progressing.                                                                                                                                        |
| details                    | object            | Depending on the state of withdrawal progress, this will contain different information as shown in the responses below.                                                                         |
| details.coin               | string            | The ticker of the coin to be withdrawn.                                                                                                                                                         |
| details.to                 | array of strings  | Coins are withdrawn to these addresses; this may contain the `my_address` address, where change from UTXO coins is sent.                                                                        |
| details.from               | array of strings  | Coins are withdrawn from this address; the array contains a single element, but transactions may be sent from several addresses (UTXO coins)                                                    |
| details.my_balance_change  | string (numeric)  | The expected balance of change in `my_address` after the transaction broadcasts.                                                                                                                |
| details.received_by_me     | string (numeric)  | The amount of coins received by `my_address` after the transaction broadcasts; the value may be above zero when the transaction requires that the AtomicDEX API send change to `my_address`     |
| details.spent_by_me        | string (numeric)  | The amount of coins spent by `my_address`. This value differ from the request amount, as the transaction fee is taken into account.                                                             |
| details.total_amount       | string (numeric)  | The total amount of coins transferred.                                                                                                                                                          |
| details.fee_details        | object            | The fee details of the generated transaction. `fee_details.type` is "Utxo" for Z coins. `fee_details.coin` will be the same as `details.coin`, and `fee_details.amount` will be a numeric value.|
| details.tx_hash            | string            | The hash of the generated transaction.                                                                                                                                                          |
| details.tx_hex             | string            | Transaction bytes in hexadecimal format. Use this value as input for the [send_raw_transaction](../../../basic-docs/atomicdex-api-legacy/send_raw_transaction.html) method.                     |
| details.transaction_type   | string            | A value to indicate the type of transaction. Most often this will be `StandardTransfer`.                                                                                                        |
| details.kmd_rewards               | object (optional)          | If supported (e.g. when withdrawing `KMD`), an object containing information about accrued rewards.                                                                             |
| details.kmd_rewards.amount        | string (numeric, optional) | The amount of accrued rewards                                                                                                                                                   |
| details.kmd_rewards.claimed_by_me | bool (optional)            | Whether or not the rewards been claimed by me.                                                                                                                                  |

#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "{
    \"mmrpc\": \"2.0\",
    \"userpass\": \"$userpass\",
    \"method\": \"task::withdraw::status\",
    \"params\": {
        \"task_id\": TASK_ID,
        \"forget_if_finished\": false
    },
    \"id\":0
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Generating transaction)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "InProgress",
        "details": "GeneratingTransaction"
    },
    "id":0
}
```

</collapse-text>

</div>


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Generating ZHTLC transaction complete)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Ok",
        "details": {
            "tx_hex": "0400008085202f8900000000000056390400e803000000000000017aef9bb6fda6cff496046976f57dea0848fc05a46ce948dd1dab7d551a5e5a5cdc41b3409adec489e1c4ffb33bfca7a949833fadfb7cc93546aab96a8bffca469bbd435682f5af367ab07dbbbecc448010e056103fa236251b2b74d4f43d031d43df8e32672e99dae0ee51ece01c523b7ce7fb9aa8682e23e122d732a67664d3822b04edd1a12ed586b1e7dcef08c4f870792eccc2ad74a48da134a9368adb5967b01681fd1d617c2ce972f5860f976cb828363b9501f167d99e8ac17422a54e055cbfc7fce40e95b4de7bb0c8fa9e61f8a0ec07f23a28a7c4897fa6fe372a2e0fb8a2706b71db38648782eac18529d7bbcb5fe42b9da26fb2adf050538bd21c42aecbad0626ad4f4094c337ff3e9cf19292c1f0cc37b0e506231647573fb9ba479675ed99471b7fad4e54213c98facb47af6851e182ee7142a86cfd80a7741bdbeab8a1a6b093c1c093599165c8a8e7ae43c47b87b97fb7363bebc34df4fc2a045c04f850d5bc693f481ab0028706c673fad02a93c3e8e170e08f438034a600027a2974f846c278dce35d564e4c0d5de17c341fbe97d0048b4129c7dc81c4a0172e0986a5568d240fb50c9dc746e5398603aaec588835165e17162f218b71e55bf1403e4d1b81a8c745c7e87571f6c62966154a10ae908293bc66270d8ebc8d835498c7bfd379f87a57babe18db1e379a2fdb4c7413915015b23a54cf6ea2344bbd4f7abbaaec007427c69be51ea7f696ac94741305860ced9cfe96a1cf6bfbbaa182769bc6c8a74169c52990ee27accb51835766397183f408cd6679ccb04ddfc957bedea7fd2dd81103425f886566658b99baf9e0b7c353c5b19a84fece3f35d3902406b1757149f89cab9fe1301bd03d6e3994f617d0bb8b7706b946a15deb2afa0e42e2b8f15f758c6909a51d3ace11fb465e1ed34986f728568088ca75b20b29e924f561534dd38a54ca79ddc318b06f4d2d9a107ecd7601caa3b766d435ad7099e1aff7a0e64f3dbf9500c4f8274b16a1a76858187cebcbde43c8fc30955ff09f0d2930fbcc54f2b931d76e7924f58dbe181a04c22dc8729cf04d0b939206b62f8abbb07bdeedc65086b0c1703570130f928427ff0b6d605c1760be7d32f6343d0c871575f88785c36db39133cf7ce40a712681baaa299706a69d816a24bb8009c4a900021e91530a952eb4dbf036f29cb7e7788665d7318e9486ae99c9ca0d108134fb79588e73bca79cf34cb50ccfdcfef6154f8a399c87dc212eb29961b7bb61454f455b0ff03b3a57cfaacafb437a9341c0fa1c107c27a065716c9de69c129557e35f6af63312f25138174c020c9754d57c45066e28b0d70d77ceef1f69a4c55ce7a33a4120924fb08207018da848bdc4f4e44fbfe0889ba9cd3741ca565516e34cbb260b3870927310d99059c2651ee645b7d9f755e59a9c3821a4d576d7f5b5db22a9befa3163189b09124789897bde57d662d3c7e25d99d709ffdc803acbb8fde2a93dca1525bb1123ed661f8c58113a7e6d1eeb04f738f31bf80ef687804c32de4ca82ae0c3100533e498d9551618b91424489d31526ea46f78d93aa8eef2a25cf53b83cad226d17ba92dc55366a011c494c7f7b9a9c4e1ac6c41fa96f03a66a402d6e6b1b864e8b640ec44bcaf0c00f5ed093823f0a10749708f69377cab25b393a4251f2b605e8022bbfc8c9832c31a5e98d7730042644b56507e00bc24ecf4979fa22e1b40bed2246f38baf715d25a38e400386847997adaf71fe50d29da6995bd50760b08faeec9360147d68175c7cc81be238b406b1e1d414f142a8053e119b2d1ee508fe510d2adad21bd4dff33f6400f17ef88055992b3335fb2a19836b1df3c7ac5ef1a342c9eadb69202d06bfe25ee84625cec62cf507caa2f5b7de8ccdc85921dbdc09e885ad2a7b1f86a6963086073d33f25fd5281f879e1b01d4422048a9a11d6fb6da1d457dd0f9583e38edc4cb4d0c7a7049fd7821c6ccf86160c3d2e4afba86cf154cabf3e8766607d017e348a15b576347e2fdc6742093b8635c0cb0a22835df10f93859875b36cffd1dcb23c6ea95542c9f3c9b5afe613438347b753af37d955dbbe169733beaaff57f1fc685e8c43abb3aaa4bbc4af0211677d87c7d7bcb69631acecd93110b572f3508ff49a0d64f3bd7c01c60cdfd45b01165e3682e8d68f614b523cc73d1a402d650bca867e5bc09c9a920ac8adf8c502db88da0579087e93125836b6398790dc3cba5c1dcfec974d58bf22a9fbc10ca63d5116da35e15eb149d85aa58de15784cfc2574cbc8c7cf81c0f44ea250925e176d2010f7864a393e43da8349dcaf26d7814d7da07d2069a1ee7bd6184351dfc8ae28757d65d15347eae69e9fac8453e1dc6506f4db9aa22db3f35b1782f7b43b1b85e6e0f8ac772712a044e5ef90235eb79ff83a7723ff78a7bba1381ada81507480ac1f0eca939061891b41c1b25aba3172916c3bab939d9f3baec391b2d503be7f63b44dd0fefd5ba769f2f699923531a7bf3a50079133dba31ff3c13b925e6e678b45e217c7ed0c328c15e36ebc56f2cd8c5e7961dadc99f42fe9a0a7d13e849308bcbd760f9570e821db1ea13d3f65ade8b50d3b9b95d2c0eb3e6b8b9796daa4ad0e1ab9dc6585a2dcf1d189e86c7698657f2684df36f31b5e955f9dd044dd3fd174fafcb814da305d15bfed40b4746875abe999bbfc97c58a24ba383dc7c4bb098e09df55f1ed05bbc3f3e0ea510d7dcfc01b1386a6e376c41879a77427e16cb7a0263b635c99713cfa95794cf7b5717836be632c1434970875f9b5c7886d0237f88c509b08a55981259fa08823bd455febd12ee3e5c6e41f66057a3039946052545694ada38babc3f421a531d90cd80461674e4b8efc0ada6a349e56fd12a60f083cce4169170e4a3bb1aeb7193c8b7f686f88240bda72e8fe682c1ad955689a9de678e143e67e04eefd18d86020829eb7603e4449c92189ddb9e41a63a59920d697f8a1a16f26697f31bd34faf02299e8b99a17523ccfa81ed72c6b7e4edd5d128432d353a8f53e0e6c76835d914e8c7348050f48ec68ddd44e6601502952b3d23afd7621ac7174223b7bbc59da87273fbb82f086df2669825de92e456c00734b072b28574a4fc2f4fba13618980f32df91a34bea01ecfeb619ee4ed52d4885f68f636427ca8fda56a9c4b716814bb9074002e18f369666b6fcef7c0008dd8863ea028f8b7c89575b23a871196846857b7f85bd0532503991342d9ab34dd6d9c7700cfb8e991f660a81f2b110740bec308d67d39998bf89d3d667b240e",
            "tx_hash": "f708b9d83b786af26c186a192f14ba680f33f567189ac2e3cd438a29a05f554a",
            "from": ["zs1e3puxpnal8ljjrqlxv4jctlyndxnm5a3mj5rarjvp0qv72hmm9caduxk9asu9kyc6erfx4zsauj"],
            "to": ["zs1e3puxpnal8ljjrqlxv4jctlyndxnm5a3mj5rarjvp0qv72hmm9caduxk9asu9kyc6erfx4zsauj"],
            "total_amount": "29.99989008",
            "spent_by_me": "29.99989008",
            "received_by_me": "29.99988008",
            "my_balance_change": "-0.00001000",
            "block_height": 0,
            "timestamp": 0,
            "fee_details": {
                "type":"Utxo",
                "coin":"ZOMBIE",
                "amount":"0.00001"
            },
            "coin":"ZOMBIE",
            "internal_id":"f708b9d83b786af26c186a192f14ba680f33f567189ac2e3cd438a29a05f554a",
            "transaction_type":"StandardTransfer"
        }
    },
    "id":0
}
```

#### Response (Generating KMD transaction complete with rewards info)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "Ok",
        "details": {
            "tx_hex": "0400008085202f89051f43676aa53f06aaf67cfe76b4995a80c204aee630bf1909c37e2efc03c8ceac000000006b48304502210084c8d5345794b6bc78557a7aab71668020a6decf2537e9854044969f0125579202207d059c5cb465ffdd5920ddcca2760da49ce03252b4b3fd4b58605adbbc4d3ec1012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2fffffffffc4ba9e537032043caba0982f4b0d46b029ecb261edf9b22fd84a665158cc3d6000000006a47304402207d720393347252195c09b16b9e23a0da7e00979521a9277daa297cd2f5d6d5b902204a8b35f7088ba7e7e7327c2c4fb30de300c26ba1527f3979cf1ed7a85bd70a58012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffff19723c4dd6e57edbf623625370ffc8fbeef1ec367e4514491e3da333896f01260000000069463043021f488fa0fc7c8e1f2dbcff589c72f33d4354bc065b4d0e0c69592df293a81fb40220224e7cf3ec63dbbb6f9a2929baed7328af286b6b5f53c1ac0a9bc8156163d6e5012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffff59c28f535d6b73c7f622f7aade547ef1db2277d3a43207b289cf56afa5e37f6b010000006a473044022017fbc3310ce3ae66caaf6782cba58a6065af43052e0a97db93d0fa9f6a5eb59e02207d3f766a230bf5159333104f773e2c45daa91828ac53da9f87b6c7dcd255370c012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffffcdbbc54aabaa6d0f5984c444f4317500c2f2b2b77e70f310b1940987b5ce9d3c010000006a4730440220793808739a53e3eedec7aef12b833fdd0e1d789e5211170331f492250757cac002207a3b748b674cb875bdf0cce87d61da10ca2eb24788afe5b061dba01972d9cdb1012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffff0200e40b54020000001976a914e6d49471e6e83b5b69c0bee93caa4dc880205d9a88ac5856bb5b000000001976a914d346067e3c3c3964c395fee208594790e29ede5d88ac095cbe63000000000000000000000000000000",
            "tx_hash": "7c201920db65b134a99c8405d84456bed7456bc29451c5bdcc92f30db62a4279",
            "from": ["RUYJYSTuCKm9gouWzQN1LirHFEYThwzA2d"],
            "to": ["RWKi9wkqMH4C9h4psPKjcKQaYNq5vsL89F"],
            "total_amount": "115.39004992",
            "spent_by_me": "115.39004992",
            "received_by_me": "15.39003992",
            "my_balance_change": "-100.00001",
            "block_height": 0,
            "timestamp": 1673421831,
            "fee_details": {
                "type": "Utxo",
                "coin": "KMD",
                "amount": "0.00001"
            },
            "coin": "KMD",
            "internal_id": "",
            "kmd_rewards": {
                "amount": "5.64955481",
                "claimed_by_me": true
            },
            "transaction_type": "StandardTransfer",
            "memo": null
        }
    },
    "id": 0
}
```

</collapse-text>

</div>


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (No such task / task expired)

```json
{
    "mmrpc": "2.0",
    "error": "No such task '1'",
    "error_path": "init_withdraw",
    "error_trace": "init_withdraw:57]",
    "error_type": "NoSuchTask",
    "error_data":1,
    "id":0
}
```

#### Response (error, waiting for user to confirm signing on hardware wallet device)

```json
{
    "mmrpc": "2.0",
    "result": {
        "status": "InProgress",
        "details": "WaitingForUserToConfirmSigning"
    },
    "id": null
}
```

</collapse-text>

</div>


## task\_withdraw\_cancel

Use the `task::withdraw::cancel` method to cancel the withdrawal preparation task.


#### Arguments

| Structure              | Type              | Description                                                                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| task_id                | integer           | The identifying number returned when initiating the withdraw process.                                              |


#### Response

| Structure              | Type              | Description                                                    |
| ---------------------- | ----------------- | -------------------------------------------------------------- |
| result                 | string            | Indicates task cancellation was succesful.                     |
| error                  | string            | An error message to explain what went wrong.                   |
| error_path             | string            | An indicator of the class or function which reurned the error. |
| error_trace            | string            | An indicator of where in the source code the error was thrown. |
| error_type             | string            | An enumerated value for the returned  error.                   |
| error_data             | string            | The input task ID which resulted in the error.                 |


#### :pushpin: Examples

#### Command

```bash
#!/bin/bash
source userpass
curl --url "http://127.0.0.1:7783" --data "
{
    \"userpass\": \"${userpass}\",
    \"method\": \"task::withdraw::cancel\",
    \"mmrpc\": \"2.0\",
    \"params\": {
<<<<<<< HEAD
        \"task_id\": 6
=======
        \"task_id\": TASK_ID
>>>>>>> master
    }
}"
echo
```


<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (Success)


```json
{
  "mmrpc": "2.0",
  "result": "success",
  "id": null
}
```


#### Response (Error: No such task / task expired)

```json
{
    "mmrpc": "2.0",
    "error": "No such task '1'",
    "error_path": "init_withdraw.manager",
    "error_trace": "init_withdraw:92] manager:97]",
    "error_type": "NoSuchTask",
    "error_data": 1,
    "id": 0
}
```


#### Response (Error: Task already finished)

```json
{
    "mmrpc": "2.0",
    "error": "Task is finished already",
    "error_path": "init_withdraw.manager",
    "error_trace": "init_withdraw:94] manager:104]",
    "error_type": "TaskFinished",
    "error_data": 4,
    "id": null
}
```

</collapse-text>

</div>
