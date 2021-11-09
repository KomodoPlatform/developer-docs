# get\_staking\_info


The `get_staking_info` method returns information about your node's staking. Currently QTUM and tQTUM (test tokens avalable at http://testnet-faucet.qtum.info/) have been integrated, but this functionality will be expanded to more coins in future.


### Arguments

| Structure | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| coin      | string | the coin being staked           |


#### :pushpin: Examples

#### Command

```bash
curl --location --request POST "http://127.0.0.1:7783" \
--header "Content-Type: application/json" \
--data-raw "{
    \"userpass\": \"$userpass\",
    \"mmrpc\": \"2.0\",
    \"method\": \"get_staking_infos\",
    \"params\": {
        \"coin\": \"tQTUM\"
    },
    \"id\": 0
}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (not currently staking)

```json
{
  "mmrpc":"2.0",
  "result":{
    "staking_infos_details":{
      "type":"Qtum",
      "amount":"0",
      "staker":null,
      "am_i_staking":false,
      "is_staking_supported":true
    }
  },
  "id":0
}
```

#### Response (staking active)

```json
{
  "mmrpc": "2.0",
  "result": {
    "staking_infos_details": {
      "type": "Qtum",
      "amount": "160.16",
      "staker": "qcyBHeSct7Wr4mAw18iuQ1zW5mMFYmtmBE",
      "am_i_staking": true,
      "is_staking_supported": true
    }
  },
  "id": 0
}
```


</collapse-text>

</div>