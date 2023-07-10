# recover_funds_of_swap

**recover_funds_of_swap uuid**

In certain cases, a swap can finish with an error wherein the user's funds are stuck on the swap-payment address. (This address is the P2SH address when executing on a utxo-based blockchain, or an etomic-swap smart contract when executing on an ETH/ERC20 blockchain.)

This error can occur when one side of the trade does not follow the protocol (for any reason). The error persists as attempts to refund the payment fail due to network connection issues between the Komodo DeFi Framework node and the coin's RPC server.

In this scenario, the `recover_funds_of_swap` method instructs the Komodo DeFi Framework software to attempt to reclaim the user funds from the swap-payment address, if possible.

#### Arguments

| Structure   | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| params.uuid | string | uuid of the swap to recover the funds |

#### Response

| Structure      | Type   | Description                                                                                       |
| -------------- | ------ | ------------------------------------------------------------------------------------------------- |
| result.action  | string | the action executed to unlock the funds. Can be either `SpentOtherPayment` or `RefundedMyPayment` |
| result.coin    | string | the balance of this coin will be unstuck by the recovering transaction                            |
| result.tx_hash | string | the hash of the recovering transaction                                                            |
| result.tx_hex  | string | raw bytes of the recovering transaction in hexadecimal representation                             |

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"recover_funds_of_swap\",\"params\":{\"uuid\":\"6343b2b1-c896-47d4-b0f2-a11798f654ed\"}}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Response (success - SpentOtherPayment)

```json
{
  "result": {
    "action": "SpentOtherPayment",
    "coin": "HELLO",
    "tx_hash": "696571d032976876df94d4b9994ee98faa870b44fbbb4941847e25fb7c49b85d",
    "tx_hex": "0400008085202f890113591b1feb52878f8aea53b658cf9948ba89b0cb27ad0cf30b59b5d3ef6d8ef700000000d8483045022100eda93472c1f6aa18aacb085e456bc47b75ce88527ed01c279ee1a955e85691b702201adf552cfc85cecf588536d5b8257d4969044dde86897f2780e8c122e3a705e40120576fa34d308f39b7a704616656cc124232143565ca7cf1c8c60d95859af8f22d004c6b63042555555db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a9146e602d4affeb86e4ee208802901b8fd43be2e2a4882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0198929800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac0238555d000000000000000000000000000000"
  }
}
```

#### Response (success - RefundedMyPayment)

```json
{
  "result": {
    "action": "RefundedMyPayment",
    "coin": "HELLO",
    "tx_hash": "696571d032976876df94d4b9994ee98faa870b44fbbb4941847e25fb7c49b85d",
    "tx_hex": "0400008085202f890113591b1feb52878f8aea53b658cf9948ba89b0cb27ad0cf30b59b5d3ef6d8ef700000000d8483045022100eda93472c1f6aa18aacb085e456bc47b75ce88527ed01c279ee1a955e85691b702201adf552cfc85cecf588536d5b8257d4969044dde86897f2780e8c122e3a705e40120576fa34d308f39b7a704616656cc124232143565ca7cf1c8c60d95859af8f22d004c6b63042555555db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a9146e602d4affeb86e4ee208802901b8fd43be2e2a4882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0198929800000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac0238555d000000000000000000000000000000"
  }
}
```

#### Response (error - maker payment was already spent)

```json
{
  "error": "lp_swap:702] lp_swap:412] taker_swap:890] Maker payment is spent, swap is not recoverable"
}
```

#### Response (error - swap is not finished yet)

```json
{
  "error": "lp_swap:702] lp_swap:412] taker_swap:886] Swap must be finished before recover funds attempt"
}
```

</collapse-text>

</div>
