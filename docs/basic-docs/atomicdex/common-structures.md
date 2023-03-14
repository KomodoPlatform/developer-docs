## Lightning\_close\_channels\_filter

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| channel_id           | string  |             |
| counterparty_node_id | string  |             |
| funding_tx           | string  |             |
| from_funding_value   | integer |             |
| to_funding_value     | integer |             |
| closing_tx           | string  |             |
| closure_reason       | string  |             |
| claiming_tx          | string  |             |
| from_claimed_balance | decimal |             |
| to_claimed_balance   | decimal |             |
| channel_type         | string  | Accepted values: "Outbound", "Inbound" |
| channel_visibility   | string  | Accepted values: "Public", "Private"   |


```json
"filter": {
        "channel_id": null,
        "counterparty_node_id": null,
        "funding_tx": null,
        "from_funding_value": null,
        "to_funding_value": null,
        "closing_tx": null,
        "closure_reason": null,
        "claiming_tx": null,
        "from_claimed_balance": null,
        "to_claimed_balance": null,
        "channel_type": null,
        "channel_visibility": null
}
```

## Lightning\_open\_channels\_filter

| Parameter            | Type    | Description |
|----------------------|---------|-------------|
| channel_id           | string  |             |
| counterparty_node_id | string  |             |
| funding_tx           | string  |             |
| from_funding_value   | integer |             |
| to_funding_value     | integer |             |
| closing_tx           | string  |             |
| closure_reason       | string  |             |
| claiming_tx          | string  |             |
| from_claimed_balance | decimal |             |
| to_claimed_balance   | decimal |             |
| channel_type         | string  | Accepted values: "Outbound", "Inbound" |
| channel_visibility   | string  | Accepted values: "Public", "Private"   |


```json
"filter": {
    "channel_id": null,
    "counterparty_node_id": null,
    "funding_tx": null,
    "from_funding_value_sats": null,
    "to_funding_value_sats": null,
    "is_outbound": null,
    "from_balance_msat": null,
    "to_balance_msat": null,
    "from_outbound_capacity_msat": null,
    "to_outbound_capacity_msat": null,
    "from_inbound_capacity_msat": null,
    "to_inbound_capacity_msat": null,
    "confirmed": null,
    "is_usable": null,
    "is_public": null
}
```

## Lightning\_payment

| Parameter        | Type    | Description |
|------------------|---------|-------------|
| type             | string  | Accepted values: `invoice` or `keysend` |
| invoice          | string  | Required if `invoice`. uniue string representing an invoice. Use [lightning::payments::get_payment_details](/basic-docs/atomicdex/lightning_payments_get_payment_details.html) for more information      |
| destination      | integer | Required if `keysend`. Destination pubkey to send funds to       |
| amount_in_msat   | integer | Required if `keysend`. Amount to sent in millisats               |
| expiry           | integer | Required if `keysend`. Timestamp for expiry of payment broadcast |


```json
"filter": {
    "channel_id": null,
    "counterparty_node_id": null,
    "funding_tx": null,
    "from_funding_value_sats": null,
    "to_funding_value_sats": null,
    "is_outbound": null,
    "from_balance_msat": null,
    "to_balance_msat": null,
    "from_outbound_capacity_msat": null,
    "to_outbound_capacity_msat": null,
    "from_inbound_capacity_msat": null,
    "to_inbound_capacity_msat": null,
    "confirmed": null,
    "is_usable": null,
    "is_public": null
}
```

## Paging Options

| Parameter  | Type    | Description                     |
|------------|---------|---------------------------------|
| PageNumber | integer | Offset for paginated results    |
| FromId     | integer | Ignore results priod to this Id |

Use either value, not both.

```json
{
    "PageNumber": 1
}
```

```json
{
    "FromId": 4
}
```

