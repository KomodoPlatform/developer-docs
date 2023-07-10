# my_swap_status

**uuid**

The `my_swap_status` method returns the data of an atomic swap executed on an Komodo DeFi Framework node.

#### Arguments

| Structure   | Type   | Description                                                 |
| ----------- | ------ | ----------------------------------------------------------- |
| params uuid | string | the uuid of swap, typically received from the buy/sell call |

#### Response

| Structure      | Type                       | Description                                                                                                                                                                                                                                                                                                                |
| -------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| events         | array of objects           | the events that occurred during the swap                                                                                                                                                                                                                                                                                   |
| events.type    | string                     | an event type; the list of event types with their data structure is available below                                                                                                                                                                                                                                        |
| events.data    | object                     | additional data of the event; the list of events with their data structure is available below                                                                                                                                                                                                                              |
| success_events | array of strings           | a list of events that gained a `success` swap state; the contents are listed in the order in which they should occur in the `events` array                                                                                                                                                                                 |
| error_events   | array of strings           | a list of events that fell into an `error` swap state; if at least 1 of the events happens, the swap is considered a failure                                                                                                                                                                                               |
| type           | string                     | whether the node acted as a market `Maker` or `Taker`                                                                                                                                                                                                                                                                      |
| uuid           | string                     | swap uuid                                                                                                                                                                                                                                                                                                                  |
| gui            | string (optional)          | information about gui; copied from Komodo DeFi Framework configuration (MM2.json)                                                                                                                                                                                                                                          |
| mm_version     | string (optional)          | Komodo DeFi Framework version                                                                                                                                                                                                                                                                                              |
| maker_coin     | string (optional)          | ticker of maker coin                                                                                                                                                                                                                                                                                                       |
| taker_coin     | string (optional)          | ticker of taker coin                                                                                                                                                                                                                                                                                                       |
| maker_amount   | string (numeric, optional) | the amount of coins to be swapped by maker                                                                                                                                                                                                                                                                                 |
| taker_amount   | string (numeric, optional) | the amount of coins to be swapped by taker                                                                                                                                                                                                                                                                                 |
| my_info        | object (optional)          | this object maps event data to make displaying swap data in a GUI simpler (`my_coin`, `my_amount`, etc.)                                                                                                                                                                                                                   |
| recoverable    | bool                       | whether the swap can be recovered using the `recover_funds_of_swap` API command. Important note: The Komodo DeFi Framework does not record the state regarding whether the swap was recovered or not. The Komodo DeFi Framework allows as many calls to the `recover_funds_of_swap` method as necessary, in case of errors |
| my_order_uuid  | string (uuid, optional)    | the uuid of order that matched to start the swap                                                                                                                                                                                                                                                                           |

#### Maker Swap Events

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="">

##### Started

The `Started` event indicates that mandatory pre-checks passed, such as "available balance," and that the swap started successfully.

The swap goes to the negotiation stage after this event occurs.

| Structure                   | Type                              | Description                                                                                                                                                                                                                  |
| --------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taker_coin                  | string                            | the ticker of the taker coin                                                                                                                                                                                                 |
| maker_coin                  | string                            | the ticker of the maker coin                                                                                                                                                                                                 |
| taker                       | string (hexadecimal)              | the p2p ID of taker node                                                                                                                                                                                                     |
| secret                      | string (hexadecimal)              | a random secret, the hash of which is used to lock atomic-swap payments                                                                                                                                                      |
| secret_hash                 | string (hexadecimal)              | the hash of the swap secret                                                                                                                                                                                                  |
| my_persistent_pub           | string (hexadecimal)              | a persistent secp256k1 public key of maker node                                                                                                                                                                              |
| lock_duration               | number (integer)                  | the lock duration of swap payments in seconds. The sender can refund the transaction when the lock duration is passed. The taker payment is locked for the lock duration. The maker payment is locked for lock duration \* 2 |
| maker_amount                | string (numeric)                  | the amount of coins to be swapped by maker                                                                                                                                                                                   |
| taker_amount                | string (numeric)                  | the amount of coins to be swapped by taker                                                                                                                                                                                   |
| maker_payment_confirmations | number (integer)                  | the required number of blockchain confirmations for maker payment                                                                                                                                                            |
| maker_payment_requires_nota | bool                              | whether dPoW notarization is required for maker payment; can be null; available since `beta-2.0.1738`                                                                                                                        |
| taker_payment_confirmations | number (integer)                  | the required number of blockchain confirmations for taker payment                                                                                                                                                            |
| taker_payment_requires_nota | bool                              | whether dPoW notarization is required for taker payment; can be null; available since `beta-2.0.1738`                                                                                                                        |
| maker_payment_lock          | number (UTC timestamp in seconds) | the maker payment is locked until this timestamp                                                                                                                                                                             |
| uuid                        | string                            | the swap uuid                                                                                                                                                                                                                |
| started_at                  | number (UTC timestamp in seconds) | the timestamp at the start of the swap                                                                                                                                                                                       |
| maker_coin_start_block      | number (integer)                  | the maker coin block number at the start of the swap                                                                                                                                                                         |
| taker_coin_start_block      | number (integer)                  | the taker coin block number at the start of the swap                                                                                                                                                                         |

##### StartFailed

The `StartFailed` event indicates that some of the pre-checks did not pass, and therefore the swap did not start.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### Negotiated

The `Negotiated` event indicates that maker has received and validated swap negotiation data from taker.

Maker starts waiting for taker to send the dex fee after this event occurs.

| Structure              | Type                              | Description                                      |
| ---------------------- | --------------------------------- | ------------------------------------------------ |
| taker_payment_locktime | number (UTC timestamp in seconds) | the taker payment is locked until this timestamp |
| taker_pubkey           | string (hexadecimal)              | a persistent secp256k1 public key of taker node  |

##### NegotiateFailed

The `NegotiateFailed` event indicates that taker negotiation data was not received or did not pass validation.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerFeeValidated

The `TakerFeeValidated` event indicates that maker received and validated dex fee data from taker.

Maker sends their payment after this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### TakerFeeValidateFailed

The `TakerFeeValidateFailed` event indicates that taker dex fee data was not received or did not pass validation.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentTransactionFailed

The `MakerPaymentTransactionFailed` event indicates that maker was not able to broadcast his payment transaction to maker coin blockchain.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentSent

The `MakerPaymentSent` event indicates that maker has broadcast the maker payment transaction.

Maker starts waiting for taker to send his payment after this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### MakerPaymentDataSendFailed

The `MakerPaymentDataSendFailed` event indicates that maker was not able to send his payment data to taker due to a network error.
When this event occurs, maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentWaitConfirmFailed

The `MakerPaymentWaitConfirmFailed` event indicates that maker payment transaction did not reach the required number of confirmations before the internal timeout expiration.

When this event occurs maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentReceived

The `TakerPaymentReceived` event indicates that maker received the taker payment transaction data.

Maker starts waiting for taker payment confirmation after this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### TakerPaymentWaitConfirmStarted

The `TakerPaymentReceived` event indicates that maker started waiting for taker payment confirmation.

This event does not have additional data.

##### TakerPaymentValidateFailed

The `TakerPaymentValidateFailed` event indicates that taker payment did not pass validation. For example, taker payment may have an invalid amount or the payment might be locked with a non-matching hash or timestamp.

When this event occurs maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentWaitConfirmFailed

The `MakerPaymentWaitConfirmFailed` event indicates that the taker payment transaction did not reach the required number of confirmations before the internal timeout expiration.

When this event occurs maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentValidatedAndConfirmed

The `TakerPaymentValidatedAndConfirmed` event indicates that maker validated taker payment and payment was confirmed the required number of times.

Maker attempts to spend the taker payment after this event occurs.

This event does not have additional data.

##### TakerPaymentSpendFailed

The `TakerPaymentSpendFailed` event indicates that maker payment was not able to spend taker payment.

When this event occurs maker starts waiting for **maker payment lock time expiration** to issue a refund.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentSpent

The `TakerPaymentSpent` event indicates that maker has broadcast the **taker payment spend** transaction.

Maker starts waiting for **taker payment spend** confirmation after this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### TakerPaymentSpendConfirmStarted

The `TakerPaymentSpendConfirmStarted` event indicates that maker started waiting for **taker payment spend** transaction confirmation.

This event does not have additional data.

##### TakerPaymentSpendConfirmFailed

The `TakerPaymentSpendConfirmFailed` event indicates that the **taker payment spend** transaction did not reach the required number of confirmations before the **maker payment lock time expiration** or the **taker payment spend** transaction rejected for some reason.

Maker attempts to refund the maker payment.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentSpendConfirmed

The `TakerPaymentSpendConfirmed` event indicates that the taker payment spend transaction was confirmed the required number of times.

The swap finishes immediately when this event occurs.

This event does not have additional data.

##### MakerPaymentWaitRefundStarted

The `MakerPaymentWaitRefundStarted` event indicates that maker started waiting for lock time expiration to refund the payment.

| Structure  | Type                   | Description                                |
| ---------- | ---------------------- | ------------------------------------------ |
| wait_until | number (UTC timestamp) | the timestamp at which a refund will occur |

##### MakerPaymentRefundFailed

The `MakerPaymentRefundFailed` event indicates that maker was not able to broadcast a refund transaction to the maker coin blockchain.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentRefunded

The `MakerPaymentRefunded` event indicates that maker has broadcast the maker payment refund transaction.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### Finished

The `Finished` event indicates that the swap finished.

This event does not have additional data.

</collapse-text>

</div>

#### Taker Swap Events

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="">

##### Started

The `Started` event indicates that mandatory pre-checks, such as "available balance," passed and the swap started successfully.

The swap goes to negotiation stage after this event occurs.

| Structure                   | Type                              | Description                                                                                                                                                                                                                  |
| --------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taker_coin                  | string                            | the ticker of taker coin                                                                                                                                                                                                     |
| maker_coin                  | string                            | the ticker of maker coin                                                                                                                                                                                                     |
| maker                       | string (hexadecimal)              | the p2p ID of maker node                                                                                                                                                                                                     |
| my_persistent_pub           | string (hexadecimal)              | a persistent secp256k1 public key of taker node                                                                                                                                                                              |
| lock_duration               | number (integer)                  | the lock duration of swap payments in seconds. The sender can refund the transaction when the lock duration is passed. The taker payment is locked for the lock duration. The maker payment is locked for lock duration \* 2 |
| maker_amount                | string (numeric)                  | the amount of coins to be swapped by maker                                                                                                                                                                                   |
| taker_amount                | string (numeric)                  | the amount of coins to be swapped by taker                                                                                                                                                                                   |
| maker_payment_confirmations | number (integer)                  | the required number of blockchain confirmations for maker payment                                                                                                                                                            |
| maker_payment_requires_nota | bool                              | whether dPoW notarization is required for maker payment; can be null; available since `beta-2.0.1738`                                                                                                                        |
| taker_payment_confirmations | number (integer)                  | the required number of blockchain confirmations for taker payment                                                                                                                                                            |
| taker_payment_requires_nota | bool                              | whether dPoW notarization is required for taker payment; can be null; available since `beta-2.0.1738`                                                                                                                        |
| taker_payment_lock          | number (UTC timestamp in seconds) | the taker payment is locked until this timestamp                                                                                                                                                                             |
| uuid                        | string                            | the swap uuid                                                                                                                                                                                                                |
| started_at                  | number (UTC timestamp in seconds) | the timestamp at the start of the swap                                                                                                                                                                                       |
| maker_payment_wait          | number (UTC timestamp in seconds) | taker will wait for maker payment confirmation until this timestamp                                                                                                                                                          |
| maker_coin_start_block      | number (integer)                  | the maker coin block number at the start of the swap                                                                                                                                                                         |
| taker_coin_start_block      | number (integer)                  | the taker coin block number at the start of the swap                                                                                                                                                                         |

##### StartFailed

The `StartFailed` event indicates that some of the pre-checks did not pass, and therefore the swap did not start.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### Negotiated

The `Negotiated` event indicates that taker has received and validated swap negotiation data from maker.

Taker sends dex fee after this event occurs.

| Structure              | Type                              | Description                                                       |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------- |
| maker_payment_locktime | number (UTC timestamp in seconds) | the maker payment is locked until this timestamp                  |
| maker_pubkey           | string (hexadecimal)              | a persistent secp256k1 public key of maker node                   |
| secret_hash            | string (hexadecimal)              | the swap payments are expected to be locked with this secret hash |

##### NegotiateFailed

The `NegotiateFailed` event indicates that maker negotiation data was not received or did not pass validation.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerFeeSent

The `TakerFeeSent` event indicates that taker broadcast the dex fee transaction.

Taker starts waiting for maker payment after this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### TakerFeeSendFailed

The `TakerFeeSendFailed` event indicates that the taker dex fee transaction failed to broadcast to the taker coin blockchain, or that the taker failed to send the transaction data to maker.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentValidateFailed

The `MakerPaymentValidateFailed` event indicates that taker was not able to receive or validate the maker payment transaction.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentReceived

The `MakerPaymentReceived` event indicates that taker received the maker payment transaction data.

Taker starts waiting for transaction confirmation after this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### MakerPaymentWaitConfirmStarted

The `MakerPaymentWaitConfirmStarted` event indicates that taker started waiting for maker payment confirmation.

This event does not have additional data.

##### MakerPaymentWaitConfirmFailed

The `MakerPaymentWaitConfirmFailed` event indicates that the maker payment transaction did not reach the required number of confirmations before the internal timeout expiration.

Taker swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentValidatedAndConfirmed

The `MakerPaymentValidatedAndConfirmed` event indicates that taker validated maker payment and the payment was confirmed the required number of times.

Taker sends his payment after this event occurs.

This event does not have additional data.

##### TakerPaymentSent

The `TakerPaymentSent` event indicates that taker broadcast taker payment transaction to taker coin blockchain.

Taker starts waiting for maker to spend this transaction.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### TakerPaymentTransactionFailed

The `TakerPaymentTransactionFailed` event indicates that taker failed to broadcast transaction to taker coin blockchain.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentWaitConfirmFailed

The `TakerPaymentWaitConfirmFailed` event indicates that the taker payment transaction did not reach the required number of confirmations before the internal timeout expiration.

When this event occurs taker starts waiting for taker payment lock time expiration to issue a refund.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentDataSendFailed

The `TakerPaymentDataSendFailed` event indicates that taker was not able to send his payment data to maker due to a network error.

When this event occurs taker starts waiting for taker payment lock time expiration to issue a refund.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentSpent

The `TakerPaymentSpent` event indicates that maker spent taker payment and taker discovered the transaction.

When this event occurs taker extracts the secret from the transaction and attempts to spend maker payment.

| Structure           | Type   | Description                                                |
| ------------------- | ------ | ---------------------------------------------------------- |
| secret              | string | the atomic swap secret extracted from spending transaction |
| transaction         | object | transaction object                                         |
| transaction.tx_hash | string | the hash of the transaction                                |
| transaction.tx_hex  | string | transaction bytes in hexadecimal format                    |

##### TakerPaymentWaitForSpendFailed

The `TakerPaymentWaitForSpendFailed` event indicates that maker did not spend taker payment before lock time expiration.

When this event occurs taker attempts to refund the payment.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentSpendFailed

The `MakerPaymentSpendFailed` event indicates that taker failed to broadcast **maker payment spend** transaction to the maker coin blockchain.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### MakerPaymentSpent

The `MakerPaymentSpent` event indicates that taker spent maker payment.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### TakerPaymentWaitRefundStarted

`TakerPaymentWaitRefundStarted` event indicates that taker started waiting for lock time expiration to refund the payment.

| Structure  | Type                   | Description                                |
| ---------- | ---------------------- | ------------------------------------------ |
| wait_until | number (UTC timestamp) | the timestamp at which a refund will occur |

##### TakerPaymentRefundFailed

`TakerPaymentRefundFailed` event indicates that taker was not able to broadcast a refund transaction to taker coin blockchain.
The swap finishes immediately when this event occurs.

| Structure | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| error     | string | error description with stack trace |

##### TakerPaymentRefunded

The `TakerPaymentRefunded` event indicates that taker broadcast the taker payment refund transaction.

The swap finishes immediately when this event occurs.

| Structure | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| tx_hash   | string | the hash of the transaction             |
| tx_hex    | string | transaction bytes in hexadecimal format |

##### Finished

The `Finished` event indicates that the swap finished.

This event does not have additional data.

</collapse-text>

</div>

#### :pushpin: Examples

#### Command

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"my_swap_status\",\"params\":{\"uuid\":\"d14452bb-e82d-44a0-86b0-10d4cdcb8b24\"},\"userpass\":\"$userpass\"}"
```

<div style="margin-top: 0.5rem;">

<collapse-text hidden title="Response">

#### Successful Taker Swap

```json
{
  "result": {
    "type": "Taker",
    "uuid": "0d72c435-821e-4278-b2a7-e36ab1ba8cb7",
    "my_order_uuid": "0d72c435-821e-4278-b2a7-e36ab1ba8cb7",
    "events": [
      {
        "timestamp": 1674802079095,
        "event": {
          "type": "Started",
          "data": {
            "taker_coin": "MORTY",
            "maker_coin": "RICK",
            "maker": "7310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
            "my_persistent_pub": "03d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2",
            "lock_duration": 7800,
            "maker_amount": "1",
            "taker_amount": "1",
            "maker_payment_confirmations": 1,
            "maker_payment_requires_nota": false,
            "taker_payment_confirmations": 0,
            "taker_payment_requires_nota": false,
            "taker_payment_lock": 1674809878,
            "uuid": "0d72c435-821e-4278-b2a7-e36ab1ba8cb7",
            "started_at": 1674802078,
            "maker_payment_wait": 1674805198,
            "maker_coin_start_block": 1800637,
            "taker_coin_start_block": 1813161,
            "fee_to_send_taker_fee": {
              "coin": "MORTY",
              "amount": "0.00001",
              "paid_from_trading_vol": false
            },
            "taker_payment_trade_fee": {
              "coin": "MORTY",
              "amount": "0.00002",
              "paid_from_trading_vol": false
            },
            "maker_payment_spend_trade_fee": {
              "coin": "RICK",
              "amount": "0.00001",
              "paid_from_trading_vol": true
            },
            "maker_coin_htlc_pubkey": "03d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2",
            "taker_coin_htlc_pubkey": "03d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2",
            "p2p_privkey": null
          }
        }
      },
      {
        "timestamp": 1674802095105,
        "event": {
          "type": "Negotiated",
          "data": {
            "maker_payment_locktime": 1674817676,
            "maker_pubkey": "000000000000000000000000000000000000000000000000000000000000000000",
            "secret_hash": "9af6a305578518d693fca3f1e4c529224a81f654",
            "maker_coin_swap_contract_addr": null,
            "taker_coin_swap_contract_addr": null,
            "maker_coin_htlc_pubkey": "037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5",
            "taker_coin_htlc_pubkey": "037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5"
          }
        }
      },
      {
        "timestamp": 1674802095885,
        "event": {
          "type": "TakerFeeSent",
          "data": {
            "tx_hex": "0400008085202f89014b9e44ba75ed80361776ac385feee7bba13b6c2d3147a3d9b5d71362a4624219000000006b483045022100a45de07b5d211c62e8ecf90cd5bee5076f6b6f20715f5618d7d0d93a6209ad870220596ca01682d2dbd4efeba3a0e90a373fd61b619471747df26afc2e2bb167de4c012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88acf4979600000000001976a914d346067e3c3c3964c395fee208594790e29ede5d88acaf73d363000000000000000000000000000000",
            "tx_hash": "b2ee0e692523c5ca081f62e36325d09a629004850be8b86df149fc979e9e3e87"
          }
        }
      },
      {
        "timestamp": 1674802097888,
        "event": {
          "type": "TakerPaymentInstructionsReceived",
          "data": null
        }
      },
      {
        "timestamp": 1674802097890,
        "event": {
          "type": "MakerPaymentReceived",
          "data": {
            "tx_hex": "0400008085202f89036aefd7ae1e6933ef997ad44adf5d0c19bc2bbede499a3421eb2022d06fa772f7000000006b4830450221009ad555b27ee9d0e2044bfc14aec47c160819d79dfaacc36e0426b4c35b5626aa02207624ef91881e42b210f16ce96bca00ce3d7cde46e7aaca76bd39f3aa64489e940121037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ffffffff66f0d84da9abf07914969af7479934a518a5363353e0968efebc78eac561f07e020000006a4730440220597126d39bb86ce6f6e478eeae7714daa08d05d57df69e641293d70cfe78f510022037bdff2a77ead08b8a60cafff9524beacf28513499e57a15615e66955e51636e0121037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ffffffffffe65f8d99d56844f9f5c94a590bf4d6cca116b170fee21e6c04c1a4ab39f4a7000000006a47304402202f2ab19d0f70bfbbc649e78eeda8c14afc72e41a80c9f81c25466307cef619440220466ed647fe07cc75dba20176c05aef671c04cb929e30ce4988014e1c553fe84b0121037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ffffffff0300e1f5050000000017a914252fe9c1a8b61a9ca1da6bcbc017e4677e89c480870000000000000000166a149af6a305578518d693fca3f1e4c529224a81f654798b0306000000001976a91486f747b28c60ad1130bdd3f84f48eeaf1801ca9888acb173d363000000000000000000000000000000",
            "tx_hash": "879535fa1057a1f2587245f0d656ff4126848060574b85f581f7ac57200dcf80"
          }
        }
      },
      {
        "timestamp": 1674802097894,
        "event": {
          "type": "MakerPaymentWaitConfirmStarted"
        }
      },
      {
        "timestamp": 1674802191003,
        "event": {
          "type": "MakerPaymentValidatedAndConfirmed"
        }
      },
      {
        "timestamp": 1674802192167,
        "event": {
          "type": "TakerPaymentSent",
          "data": {
            "tx_hex": "0400008085202f8908873e9e9e97fc49f16db8e80b850490629ad02563e3621f08cac52325690eeeb2010000006a47304402204208734d38019ab1940348bd5091b392cab57565591f26447cdb5396e006dba50220365770af3714083901571635407d43dc87e9abfc05b382c8fde598f624eae2d1012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffffc895dd30ec91dafeb8023af40625a367aaf2a835141c537a4c746fe27e8160b8000000006a4730440220432cb8c44befb2fb076979f275aa205ddd9853a296f7b6df0bfb15dcd7e659fd0220741262c04a3697e474474cdb1e18c908511a7edfec9a7d350403bd8c90039a93012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffffaad904fafd259e9d5960866964c2e2752853b36dcd7bf205196e443f1f611453000000006b483045022100982d3ffb1a0bab130fc51071c0e60de08354161f8ba29593cbb849de31152da502200d74a8edbadf816b2076b14c74b5236b6d98ced09f6700b7411f008726b7d570012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffff354c776ffd2c883236d9135ea72e5991adf27f10f5fdc39e42be9be0d748539b000000006a4730440220742fa6411298f2c02edb690327860729d6a90c74b35f529065f6c15d29e609c20220008b68bd92a7f3c8ac8f00d161658a315103c3e2783c62e57172202c3db6016c012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2fffffffff191e32dca5ace0ca52c8d4dfa59a1e12e5c32968e08c7289fb7e4823fd119c2000000006b483045022100d1ba0bf5aadc658f61d6a348cfd3edaf2341ebafb12209d1da375130d8d17a8602201b09147377c70fead7f8dba9d9d0f2335c85b960e76affeb05cc7bff6cbb7aff012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffffd3cfdb64be12f201fa3ae27871f200f395c014864f87b9744e51540a769ab58c000000006a473044022030214231517e3787c9bf6f85695401d5923ec3d69a5eead708986bc0490bcab302201073be01e5298baaa65f80d6e35dfde54ff81469439e27d741719c31779065f6012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffffa945e0db62d26072c2b20b1e7a959e9cdf09ad840584ae1467264e2658b1f1ca010000006b483045022100aa0f00f2f60dac8ab5944183804a6a92c8b4f6a8cd29a027cac20e6a494a6c3d0220457ff0d4ca023e1f311485c42088043fa5f9a0c37c583ffb510f9caa2fe6b210012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffff1a95c4f75da608bc81f39bed78dc6658da2042ecf1d2cd4da1980a0cc404e2f1010000006b483045022100e933ef22abfb3c6832ecda2b7465a8e218fb2ce7fb4cef2733e7424e6cc5e41f022001e8a9635b5377fe211fb4821557afb7eabe45b04028526e017c8e615a5d4320012103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ffffffff0300e1f5050000000017a9144a8ff1f3c9a654f6ef8b4b12773c8d242ef3cfaa870000000000000000166a149af6a305578518d693fca3f1e4c529224a81f6546761eb02000000001976a914d346067e3c3c3964c395fee208594790e29ede5d88ac0f74d363000000000000000000000000000000",
            "tx_hash": "c6536056800b211635c4f64dbe941a967361fbe92c0c4d4c575f157f922a080a"
          }
        }
      },
      {
        "timestamp": 1674802203724,
        "event": {
          "type": "TakerPaymentSpent",
          "data": {
            "transaction": {
              "tx_hex": "0400008085202f89010a082a927f155f574c4d0c2ce9fb6173961a94be4df6c43516210b80566053c600000000d747304402202ad8f7c2319e6097f5d28953bf45b02ec4501cf82b849d3f2286c8e98aa1ab6d02205e631875f0ff327c24665213195d29f86ba015a0d7c3e134e14b9109331375fc01201e2e0289634d42865e0f82ff0546ce2a384ae3548fb3f927c4aa1faefb0aa5d4004c6b63041692d363b1752103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ac6782012088a9149af6a305578518d693fca3f1e4c529224a81f6548821037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ac68ffffffff0118ddf505000000001976a91486f747b28c60ad1130bdd3f84f48eeaf1801ca9888ac1692d363000000000000000000000000000000",
              "tx_hash": "9a72b62bb99bee92f9e3a047c65fcf7cdd3fc8443286c97647550df42f0f81d4"
            },
            "secret": "1e2e0289634d42865e0f82ff0546ce2a384ae3548fb3f927c4aa1faefb0aa5d4"
          }
        }
      },
      {
        "timestamp": 1674802205274,
        "event": {
          "type": "MakerPaymentSpent",
          "data": {
            "tx_hex": "0400008085202f890180cf0d2057acf781f5854b576080842641ff56d6f0457258f2a15710fa35958700000000d74730440220159ac3c574bed4473bd6da6eb4b37a3c073dbe5311a4648795f2b0c02b68ef8d022034bc743cbe656b3d335a138f21093fcc9039f50bff40cf56e2654eb9eb225ca901201e2e0289634d42865e0f82ff0546ce2a384ae3548fb3f927c4aa1faefb0aa5d4004c6b63048cb0d363b17521037310a8fb9fd8f198a1a21db830252ad681fccda580ed4101f3f6bfb98b34fab5ac6782012088a9149af6a305578518d693fca3f1e4c529224a81f654882103d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2ac68ffffffff0118ddf505000000001976a914d346067e3c3c3964c395fee208594790e29ede5d88ac8cb0d363000000000000000000000000000000",
            "tx_hash": "02c6bc927712478b866c3303cfdfacb868545a6730513605d4d7b5b2dbe97b09"
          }
        }
      },
      {
        "timestamp": 1674802205278,
        "event": {
          "type": "Finished"
        }
      }
    ],
    "maker_amount": "1",
    "maker_coin": "RICK",
    "maker_coin_usd_price": null,
    "taker_amount": "1",
    "taker_coin": "MORTY",
    "taker_coin_usd_price": null,
    "gui": "MM2CLI",
    "mm_version": "2.1.9780_dev_89f720751_Linux_CI",
    "success_events": [
      "Started",
      "Negotiated",
      "TakerFeeSent",
      "TakerPaymentInstructionsReceived",
      "MakerPaymentReceived",
      "MakerPaymentWaitConfirmStarted",
      "MakerPaymentValidatedAndConfirmed",
      "TakerPaymentSent",
      "TakerPaymentSpent",
      "MakerPaymentSpent",
      "Finished"
    ],
    "error_events": [
      "StartFailed",
      "NegotiateFailed",
      "TakerFeeSendFailed",
      "MakerPaymentValidateFailed",
      "MakerPaymentWaitConfirmFailed",
      "TakerPaymentTransactionFailed",
      "TakerPaymentWaitConfirmFailed",
      "TakerPaymentDataSendFailed",
      "TakerPaymentWaitForSpendFailed",
      "MakerPaymentSpendFailed",
      "TakerPaymentWaitRefundStarted",
      "TakerPaymentRefundStarted",
      "TakerPaymentRefunded",
      "TakerPaymentRefundFailed",
      "TakerPaymentRefundFinished"
    ],
    "my_info": {
      "my_coin": "MORTY",
      "other_coin": "RICK",
      "my_amount": "1",
      "other_amount": "1",
      "started_at": 1674802078
    },
    "recoverable": false
  }
}
```

#### Taker Swap Failed with MakerPaymentSpendFailed Event

```json
{
  "error_events": [
    "StartFailed",
    "NegotiateFailed",
    "TakerFeeSendFailed",
    "MakerPaymentValidateFailed",
    "MakerPaymentWaitConfirmFailed",
    "TakerPaymentTransactionFailed",
    "TakerPaymentWaitConfirmFailed",
    "TakerPaymentDataSendFailed",
    "TakerPaymentWaitForSpendFailed",
    "MakerPaymentSpendFailed",
    "TakerPaymentWaitRefundStarted",
    "TakerPaymentRefunded",
    "TakerPaymentRefundFailed"
  ],
  "events": [
    {
      "event": {
        "data": {
          "lock_duration": 7800,
          "maker": "1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
          "maker_amount": "0.12596566232185483",
          "maker_coin": "KMD",
          "maker_coin_start_block": 1458035,
          "maker_payment_confirmations": 1,
          "maker_payment_wait": 1564053079,
          "my_persistent_pub": "0326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0a",
          "started_at": 1564050479,
          "taker_amount": "50.000000000000001504212457800000",
          "taker_coin": "DOGE",
          "taker_coin_start_block": 2823448,
          "taker_payment_confirmations": 1,
          "taker_payment_lock": 1564058279,
          "uuid": "41383f43-46a5-478c-9386-3b2cce0aca20"
        },
        "type": "Started"
      },
      "timestamp": 1564050480269
    },
    {
      "event": {
        "data": {
          "maker_payment_locktime": 1564066080,
          "maker_pubkey": "031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
          "secret_hash": "3669eb83a007a3c507448d79f45a9f06ec2f36a8"
        },
        "type": "Negotiated"
      },
      "timestamp": 1564050540991
    },
    {
      "event": {
        "data": {
          "tx_hash": "bdde828b492d6d1cc25cd2322fd592dafd722fcc7d8b0fedce4d3bb4a1a8c8ff",
          "tx_hex": "0100000002c7efa995c8b7be0a8b6c2d526c6c444c1634d65584e9ee89904e9d8675eac88c010000006a473044022051f34d5e3b7d0b9098d5e35333f3550f9cb9e57df83d5e4635b7a8d2986d6d5602200288c98da05de6950e01229a637110a1800ba643e75cfec59d4eb1021ad9b40801210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0affffffffae6c233989efa7c7d2aa6534adc96078917ff395b7f09f734a147b2f44ade164000000006a4730440220393a784c2da74d0e2a28ec4f7df6c8f9d8b2af6ae6957f1e68346d744223a8fd02201b7a96954ac06815a43a6c7668d829ae9cbb5de76fa77189ddfd9e3038df662c01210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0affffffff02115f5800000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac41a84641020000001976a914444f0e1099709ba4d742454a7d98a5c9c162ceab88ac6d84395d"
        },
        "type": "TakerFeeSent"
      },
      "timestamp": 1564050545296
    },
    {
      "event": {
        "data": {
          "tx_hash": "0a0f11fa82802c2c30862c50ab2162185dae8de7f7235f32c506f814c142b382",
          "tx_hex": "0400008085202f8902ace337db2dd4c56b0697f58fb8cfb6bd1cd6f469d925fc0376d1dcfb7581bf82000000006b483045022100d1f95be235c5c8880f5d703ace287e2768548792c58c5dbd27f5578881b30ea70220030596106e21c7e0057ee0dab283f9a1fe273f15208cba80870c447bd559ef0d0121031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ffffffff9f339752567c404427fd77f2b35cecdb4c21489edc64e25e729fdb281785e423000000006a47304402203179e95877dbc107123a417f1e648e3ff13d384890f1e4a67b6dd5087235152e0220102a8ab799fadb26b5d89ceb9c7bc721a7e0c2a0d0d7e46bbe0cf3d130010d430121031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ffffffff025635c0000000000017a91480a95d366d65e34a465ab17b0c9eb1d5a33bae08876cbfce05000000001976a914c3f710deb7320b0efa6edb14e3ebeeb9155fa90d88ac8d7c395d000000000000000000000000000000"
        },
        "type": "MakerPaymentReceived"
      },
      "timestamp": 1564050588176
    },
    {
      "event": {
        "type": "MakerPaymentWaitConfirmStarted"
      },
      "timestamp": 1564050588178
    },
    {
      "event": {
        "type": "MakerPaymentValidatedAndConfirmed"
      },
      "timestamp": 1564050693585
    },
    {
      "event": {
        "data": {
          "tx_hash": "539cb6dbdc25465bbccc575554f05d1bb04c70efce4316e41194e747375c3659",
          "tx_hex": "0100000001ffc8a8a1b43b4dceed0f8b7dcc2f72fdda92d52f32d25cc21c6d2d498b82debd010000006a47304402203967b7f9f5532fa47116585c7d1bcba51861ea2059cca00409f34660db18e33a0220640991911852533a12fdfeb039fb9c8ca2c45482c6993bd84636af3670d49c1501210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0affffffff0200f2052a0100000017a914f2fa08ae416b576779ae5da975e5442663215fce87415173f9000000001976a914444f0e1099709ba4d742454a7d98a5c9c162ceab88ac0585395d"
        },
        "type": "TakerPaymentSent"
      },
      "timestamp": 1564050695611
    },
    {
      "event": {
        "data": {
          "secret": "1b8886b8a2cdb62505699400b694ac20f04d7bd4abd80e1ab154aa8d861fc093",
          "transaction": {
            "tx_hash": "cc5af1cf68d246419fee49c3d74c0cd173599d115b86efe274368a614951bc47",
            "tx_hex": "010000000159365c3747e79411e41643ceef704cb01b5df0545557ccbc5b4625dcdbb69c5300000000d747304402200e78e27d2f1c18676f98ca3dfa4e4a9eeaa8209b55f57b4dd5d9e1abdf034cfa0220623b5c22b62234cec230342aa306c497e43494b44ec2425b84e236b1bf01257001201b8886b8a2cdb62505699400b694ac20f04d7bd4abd80e1ab154aa8d861fc093004c6b6304a7a2395db175210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0aac6782012088a9143669eb83a007a3c507448d79f45a9f06ec2f36a88821031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ac68ffffffff01008d380c010000001976a914c3f710deb7320b0efa6edb14e3ebeeb9155fa90d88ac8c77395d"
          }
        },
        "type": "TakerPaymentSpent"
      },
      "timestamp": 1564051092890
    },
    {
      "event": {
        "data": {
          "error": "lp_swap:1981] utxo:891] rpc_clients:738] JsonRpcError { request: JsonRpcRequest { jsonrpc: \"2.0\", id: \"67\", method: \"blockchain.transaction.broadcast\", params: [String(\"0400008085202f890182b342c114f806c5325f23f7e78dae5d186221ab502c86302c2c8082fa110f0a00000000d7473044022035791ea5548f87484065c9e1f0bdca9ebc699f2c7f51182c84f360102e32dc3d02200612ed53bca52d9c2568437f087598531534badf26229fe0f652ea72ddf03ca501201b8886b8a2cdb62505699400b694ac20f04d7bd4abd80e1ab154aa8d861fc093004c6b630420c1395db17521031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8ac6782012088a9143669eb83a007a3c507448d79f45a9f06ec2f36a888210326846707a52a233cfc49a61ef51b1698bbe6aa78fa8b8d411c02743c09688f0aac68ffffffff01460ec000000000001976a914444f0e1099709ba4d742454a7d98a5c9c162ceab88ac967e395d000000000000000000000000000000\")] }, error: Transport(\"rpc_clients:668] All electrums are currently disconnected\") }"
        },
        "type": "MakerPaymentSpendFailed"
      },
      "timestamp": 1564051092897
    },
    {
      "event": {
        "type": "Finished"
      },
      "timestamp": 1564051092900
    }
  ],
  "success_events": [
    "Started",
    "Negotiated",
    "TakerFeeSent",
    "MakerPaymentReceived",
    "MakerPaymentWaitConfirmStarted",
    "MakerPaymentValidatedAndConfirmed",
    "TakerPaymentSent",
    "TakerPaymentSpent",
    "MakerPaymentSpent",
    "Finished"
  ],
  "uuid": "41383f43-46a5-478c-9386-3b2cce0aca20"
}
```

#### Successful Maker Swap

```json
{
  "result": {
    "error_events": [
      "StartFailed",
      "NegotiateFailed",
      "TakerFeeValidateFailed",
      "MakerPaymentTransactionFailed",
      "MakerPaymentDataSendFailed",
      "MakerPaymentWaitConfirmFailed",
      "TakerPaymentValidateFailed",
      "TakerPaymentWaitConfirmFailed",
      "TakerPaymentSpendFailed",
      "TakerPaymentSpendConfirmFailed",
      "MakerPaymentWaitRefundStarted",
      "MakerPaymentRefunded",
      "MakerPaymentRefundFailed"
    ],
    "events": [
      {
        "event": {
          "data": {
            "lock_duration": 7800,
            "maker_amount": "1",
            "maker_coin": "BEER",
            "maker_coin_start_block": 154221,
            "maker_payment_confirmations": 1,
            "maker_payment_lock": 1561545442,
            "my_persistent_pub": "02031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3",
            "secret": "ea774bc94dce44c138920c6e9255e31d5645e60c0b64e9a059ab025f1dd2fdc6",
            "started_at": 1561529842,
            "taker": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
            "taker_amount": "1",
            "taker_coin": "PIZZA",
            "taker_coin_start_block": 141363,
            "taker_payment_confirmations": 1,
            "uuid": "6bf6e313-e610-4a9a-ba8c-57fc34a124aa"
          },
          "type": "Started"
        },
        "timestamp": 1561529842866
      },
      {
        "event": {
          "data": {
            "taker_payment_locktime": 1561537641,
            "taker_pubkey": "02631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640"
          },
          "type": "Negotiated"
        },
        "timestamp": 1561529883208
      },
      {
        "event": {
          "data": {
            "tx_hash": "a91469546211cc910fbe4a1f4668ab0353765d3d0cb03f4a67bff9326991f682",
            "tx_hex": "0400008085202f89021c7eeec33f8eb5ff2ed6c3d09e40e04b05a9674ea2feefcc12de3f9dcc16aff8000000006b483045022100e18e3d1afa8a24ecec82c92bfc05c119bfacdbb71b5f5663a4b96cc2a41ab269022017a79a1a1f6e0220d8fa1d2cf3b1c9788272f1ad18e4987b8f1cd4418acaa5b0012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff6a0d321eb52c3c7165adf80f83b15b7a5caa3a0dfa87746239021600d47fb43e000000006b483045022100937ed900e084d57d5e3341499fc66c5574884ca71cd4331fa696c8b7a517591b02201f5f851f94c3ca0ffb4789f1af22cb95dc83564e127ed7d23f1129eb2b981a2f012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff02bcf60100000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac9c120100000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac2f0e135d000000000000000000000000000000"
          },
          "type": "TakerFeeValidated"
        },
        "timestamp": 1561529927879
      },
      {
        "event": {
          "data": {
            "tx_hash": "efa90a2918e6793c8a2725c06ee34d0fa76c43bc85e680be195414e7aee36154",
            "tx_hex": "0400008085202f890cdcd071edda0d5f489b0be9c8b521ad608bb6d7f43f6e7a491843e7a4d0078f85000000006b483045022100fbc3bd09f8e1821ed671d1b1d2ed355833fb42c0bc435fef2da5c5b0a980b9a002204ef92b35576069d640ca0ac08f46645e5ade36afd5f19fb6aad19cfc9fb221fb012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffe6ae2a3ce221a6612d9e640bdbe10a2e477b3bc68a1aeee4a6784cb18648a785010000006a47304402202000a7e60ae2ce1529247875623ef2c5b42448dcaeac8de0f8f0e2f8e5bd8a6b0220426321a004b793172014f522efbca77a3dc92e86ce0a75330d8ceb83072ad4e7012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff9335553edcbac9559cae517a3e25b880a48fabf661c4ac338394972eef4572da000000006b4830450221008ded7230f2fb37a42b94f96174ec192baf4cd9e9e68fb9b6cf0463a36a6093e00220538de51ceda1617f3964a2350802377940fdfa018cc1043d77c66081b1cab0c4012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3fffffffff91b5d3733877f84108de77fec46bee156766e1a6837fa7b580ccbc3905acb14000000006b483045022100d07cf1fd20e07aafdc942ba56f6b45baee61b93145a2bdba391e2cdb8024bf15022056ea8183990703ef05018df2fe8bd5ec678ec0f9207b0283292b2cdafc5e1e0c012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff147870387ca938b2b6e7daa96ba2496014f125c0e4e576273ef36ee8186c415a000000006a47304402204c5b15b641d7e34444456d2ea6663bdc8bd8216e309a7220814474f346b8425e0220634d1dd943b416b7a807704d7f7a3d46a60d88ef4e20734588a0b302c55fa82d012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffd2b954ae9b4a61fad9f7bc956d24e38d7b6fe313da824bd3bd91287d5a6b49d9000000006b483045022100a7387d9ab7b2c92d3cbce525e96ffac5ae3ef14f848661741ada0db17715c4a002202c1417d5e3e04b1a2d1774a83bb8d5aa1c0536c100138123089fa69921b5d976012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff28792a2e26d9d7be0467fac52b12ece67410b23eea845008257979bd87d083e3000000006a473044022027c40517c33cd3202d4310cfd2c75f38e6d7804b255fc3838a32ea26e5a3cb0002202b4399e1d7e655b64f699318f2bfbdced49f064ee54e9d6a678668fce51caf96012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffa8bf797bacd213b74a9977ae1b956afe3af33a1ee94324e010a16db891a07441000000006a473044022004cbb1d970b9f02c578b5c1d7de33361581eebc19c3cd8d2e50b0211ca4ef13702200c93b9fe5428055b6274dc8e52073c3e87f5b5e4206134d745928ccfc9393919012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff2b6fd82c9a68111b67ad85a614a6ecb50f7b6eac3d21d8ebefd9a6065cdf5729000000006b483045022100fdff16c595c7b4a9b4fc1e445b565f7b29fe5b7a08f79291b0ff585c7b72ac2902200c694aa124013bd419ce2349f15d10435827868d35db939b9d3c344d16e78420012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff6a5468dd8c83553dc51022f2a2fb772cf91c8607dc2ca1b8f203ac534612ab29000000006b483045022100ba7cc79e7ae3720238bfc5caa225dc8017d6a0d1cb1ec66abaf724fd20b3b7ab02206e8c942756604af0f63b74af495a9b3b7f4a44c489267f69a14cf2b1b953f46e012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff5f9f48a91d343fd5aef1d85f00850070931459ab256697afb728d1c81c1fa1d2000000006a47304402200ec85fc66f963e7504eb27361a4b4bb17de60e459da414fdc3962476de636134022056b62c15cf7f9b4e7d4e11c03e4e541dd348919b8c55efa4f1927e2fdd5ae8ea012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffffee1f455924d3167e7f7abf452c1856e9abdcfe27dc889942dd249cb376169d38000000006b48304502210089274eed807c5d23d819f6dfa8a358a9748e56f2080be4396ef77bb19d91b17402207fc7b22c879534fffe0eeaaec8fc284e22c2756f380c05ea57b881a96b09f3af012102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ffffffff0200e1f5050000000017a9144eb3a361d8a15d7f6a8ef9d1cf44962a90c44d548702912b00000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac490e135d000000000000000000000000000000"
          },
          "type": "MakerPaymentSent"
        },
        "timestamp": 1561529938879
      },
      {
        "event": {
          "data": {
            "tx_hash": "7e0e38e31dbe80792ef320b8c0a7cb9259127427ef8c2fca1d796f24484046a5",
            "tx_hex": "0400008085202f892082f6916932f9bf674a3fb00c3d5d765303ab68461f4abe0f91cc1162546914a9010000006b483045022100999b8bb0224476b5c344a466d0051ec7a8c312574ad8956a4177a42625cb86e302205a6664396bff3f2e6fe57adb7e082a26d1b8da9ee77b3fc24aa4148fdd5c84db012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffcad29a146b81bcaa44744efbec5149b6e3ca32bace140f75ad5794288d5bff6c000000006b483045022100b4dbfe88561c201fb8fbaf5bbf5bc0985893c909429c579425da84b02d23cc12022075f1e1e3eba38d167a6e84aac23faee5a2eb0799511e647213cee168529d4e5d012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffa13eeacd04b3e26ae3f41530b560c615dafa0fd4235cc5b22d48ab97e7c3399c000000006a47304402201158306fe668cbf56ad3f586dc83c1cda9efab44cef46da6bc0fe242292c85ed02201d622fe283410320e760233ae81dc53df65406b09fd07f8649f1775689219c35012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff4352b9f1f01dde4209b9e91076a3cfcabdaa23d9d5a313abfe7edb67ee4273e3000000006b483045022100825242fb3c6d460580016e93718ae1f43917e53abcc1558a64a6ab6f406763dd0220543936ce4c725e5e9f03831274a8475b535171bb29e1919fcf52ba2a9c85a553012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffcc0fa94b5973c893e61d470ae3982b0bedfd29cb0da2c60a362de438598f108c000000006b4830450221008c70a8e10ca37819e5a4d9783366e729e690d78f2fdd8a1f4812ddc14ec7d6ad022035ba8cb4d4e50684107f8af5c184582687b5d7dfda5d9be1bd45e45749c77f08012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffb0bd3bb9fedb7bbf49ca1612c955ba6095202186cef5be6952aed3dd32da4268000000006a4730440220592216d63c199faa587a4a6cbe11ca26027368a116b50818ce30eced59ca887202201bcafcf88f9f2632151596732f839d77cbe2f2243822c8551faffecc90b5dc19012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff65cf2831fc200e55aaacbe0881ad0edfb298ee6d4421b08b048aecc151716bd1000000006a47304402202032eb1ccebc3be4b94bae343d1d168e87040d2d20977c47d073d6bf490ef6c00220067656e00c4b8930167c54078609925cec7b893a52bcb9304e6b2602f564413e012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffeaf67880bee214acecc74b12f648c1014d6394c4abf99832d408981bb460e999000000006b483045022100b9ae1cc824149220ac517298e6f21c26939485b31d0ae19d97d986c5f8f34e4502200a90578cf2c1835dbea00484af1f225711c255f1d0a3208f2e4f1154f0db2c9a012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffad089c3fe7987a44f150f34b7ac66972de76dd84c739bdeddf360ab029dfd4d6000000006a473044022015f0386ed67a61626fbe5ae79e0d39d38e7b4072b648e8a26e23adadc0a8e5bc02202398188fa2feb26994e5c1e7e758788de3d5f0f0096f956a0cd58804710bea6a012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffd6c66730546c62dd003b5af1f1e5ecfd339c62db0169c1d499584e09a8a9b288000000006b4830450221008d4c73f0e3c9d913ba32fd864167649242e3e891412ab80bdd3f7ff43a238ee20220602738e98008b146256b51d0df99e222aa165f2ce351241ebc23d8a098e2b0db012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff12d9eff354f46cbd4446a0bff27a6a635ff5b1dc8a5dd8b0178bb5f89c9ec080000000006b48304502210098d3349ba9b13560748949933d2704663a5ab52cdc804afa1ac4da3e5992e0a002201525d7ad8466ad260219f3873fb7781addbd363f91e8063bfa86c7ed4e385b84012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff69e16767806ea5f069b7d46674f7aa747fcc6e541189ce7fcf92edcfd7642ff4000000006b4830450221008a5ebfe904c87f21947a44d8418190be5893993a683fde0f96df8a9487923da002205be1bbd8b518ba2f303cae23bc20806e84ffbba6a03f032385b15edb8df107f4012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640fffffffff4fbabd508178f553e676d67ce325796b03aa249b41a23c681c1ad9dedb45ae7000000006a47304402207cea6824abe1ce35e18954b858d45243e2cb57d27d782adc5b6b07ebd21a02d7022007ba0469b298c4b1a7c4a148fa16bae93d28593b34e197c10ac0d1faf9cc1bfa012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff14867aa59932d895be607fb7398f5594e39d9fa2e1c7daaed7b1390dbfdddcab000000006b4830450221009fb6e1885a3658c593809f95ecd2049f8ef9e00379686ac236b17312c9613d4c0220709fc50c9a920a19254389944db366c354708c19885d2479d9968fda0848f9f7012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff75777c692daaa21d216a1a2a7059203becfcdcf6793aa1259cdd7aadec957ab6000000006a47304402202945019860abf9b80e71f340320d114846efa4d2780ce12513e3983fb4d3f15b022019be008fb7368e3f1f022924dc7af1138b94041f46084dd27768bc8cacd1529f012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffca037b85742e93df4eef8e8ac3b8531321c8a8e21a4a941360866ea57a973665000000006a4730440220760283a7828edcc53671fc73e29c30cdc64d60d300292761d39730f0d09f94c202201e026293e3891a6fe46e40cd21778a41e21641a261a7fbf3bf75b034d9c788d9012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffa68edd030b4307ad87bfeff96a6db5b3ddd1a0901c488a4fe4d2093531896d75000000006b48304502210091a41e16b2c27d7ef6077e8de9df692b6013e61d72798ff9f7eba7fc983cdb65022034de29a0fb22a339e8044349913915444ab420772ab0ab423e44cfe073cb4e70012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff8c952791181993a7512e48d098a06e6197c993b83241a4bf1330c0e95f2c304d000000006b483045022100fa14b9301feb056f6e6b10446a660525cc1ff3e191b0c45f9e12dcd4f142422c02203f4a94f2a9d3ec0b74fac2156dd9b1addb8fa5b9a1cfc9e34b0802e88b1cbfa3012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff32bc4d014542abf328fecff29b9f4c243c3dd295fe42524b20bf591a3ddc26a1000000006a47304402206f92c4da6651c8959f7aed61608d26b9e46f5c1d69f4fc6e592b1f552b6067f102201c8cc221eac731867d15d483cc83322dba2f14f31d3efb26be937a68ad772394012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffbb3877248c26b23023d7dbb83a5f8293c65c5bff4ac47935a4a31248cefffd91000000006a47304402205bab19ad082a1918e18ccb6462edc263196fb88c8fdfd6bd07a0cf031a4637810220371a621c1bdc6b957db2447a92dcf87b0309653a2db480c9ed623f34a6e6d8a9012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff6415b7356c94609b9a7a7eb06e4c306896767abbc11399779f952fb9ae197059000000006b483045022100e2d038dbb9a873f5a58ec7901d6a7e79f1b404afea3d852056f4d0746cfb821102207fb274947b10d467cd71aa948e9a50f5f4430b661b27afc347efd9d6cc409d9c012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff1aeefdf80ec8a07d657ca64a2c0aa465f58e6284755c9a263c5a807be43b4b81000000006a47304402206e7ff765ba47a8785008f64f49c8e73232d582b2b2d0a49be0880c2557de8f8602206448423a6a37ad9740eb316513b31f73599ae14f65623709fb5443ae609f3e2e012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff3c091681df17b46f280bc9d8011c1bb31397637ce945b393f70380f8cd0a8b0d010000006a47304402206ca8717000f3086d364318f56d52e2369c40b88a1cb86455a8db262b4816698a02206711caf453bfda6b1b3542e27e68c3180f92f0548326d74e30b3ed18cd2c2353012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff91f32d98b581def165495aff6b69530e1f3de7f68fabfeb93730cf9793bbcd2a000000006a47304402200a8cd5e29ee7ff136772ea1789a39a027eaa1cd92f90f9d57fd8cf77202251f402203dd2bc282a838a5730e840a0d22b4f0edbe3cb2da00466c66bc2b5c66fc8b032012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff854d9226c28a1f5fe440e08f41000f3547f304ecf9cc010d0b5bc845ef1f039a000000006b483045022100fe6cce49975cc78af1c394bc02d995710833ba08cf7f8dd5f99add2cc7db26c40220793491309c215d8314a1c142bef7ec6b9a397249bec1c00a0a5ab47dfc1208b6012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff593bc907aa71f3b0f7aa8c48bb5f650595e65a5a733a9601a8374ed978eec9a7000000006a47304402206362ae3c4cf1a19ba0e43424b03af542077b49761172c1ad26d802f54b1b6ca602206bc7edb655bb0024c0e48c1f4c18c8864f8d1ce59ae55cd81dc0bd1234430691012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff3b9da8c5ab0c0cd6b40f602ea6ed8e36a48034b182b9d1a77ffebd15fe203b94000000006b483045022100f8610eae25899663cb5fa9a4575d937da57cdfd41958794bbb4c02f8bed75da40220262d40e019ec3a57b252f4150d509cce6f8a2dbd83184a9fc2ed56aba8018b15012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0897c8a57e15e7f3893b195d65cf6c6001b29c8c9734213d7a3131f57b9eca2e000000006b483045022100c485cbd6408cf0759bcf23c4154249882934b522a93c6b49e62412305bf7646902201cc4b668af4bb22fe57c32c4d34e822bceb12f6bd6923afdabf4894752a56ec3012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffffffdc7000f7c45b62960623fa3a277e8a55348a4fe4936fef1224b6953434a249000000006b4830450221008a51a9c26f475d5c0838afe9d51524f95adfb21a9b0a02eae31cb01dc0a31fab022071c5492fbc7270731d4a4947a69398bf99dd28c65bb69d19910bf53a515274c8012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff10ec2af7e31ca28e27177215904d9a59abf80f0652b24e3f749f14fb7b2264ec000000006b483045022100fe4269f8f5ca53ebcff6fb782142a6228f0e50498a531b7a9c0d54768af9854102207cc740a9ea359569b49d69a94215ce3e23aeda5779cebc434ad3d608e1752990012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff5e3830c088dd6ea412d778b0a700ef27c183cf03e19f3d6f71bc5eaf53b2c22e000000006b4830450221009788a7e7f2407ba2f7c504091fbdf8f8498367781e8a357616d68e2a6770b4e70220518c92f5fb21e6bfd7d870a783b2a5572ce003f2dbb237ec59df419c9a148966012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff51630ccb0ad32b24cc7ae1b3602950ba518dca6aa65ef560e57f08c23eed8d80000000006a47304402201aa556153ffeb13aa674353bf88c04a7af15c7eb32e1a835464e4b613c31dc2802200395858c29a46e9108de1f90b401ee26c296388b4073143b63f849b2cce461af012102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ffffffff0200e1f5050000000017a914ab802c4d644be63fd1a72834ff63b650d6b5353987bb7e1e00000000001976a91464ae8510aac9546d5e7704e31ce177451386455588ac680e135d000000000000000000000000000000"
          },
          "type": "TakerPaymentReceived"
        },
        "timestamp": 1561529998938
      },
      {
        "event": {
          "type": "TakerPaymentWaitConfirmStarted"
        },
        "timestamp": 1561529998941
      },
      {
        "event": {
          "type": "TakerPaymentValidatedAndConfirmed"
        },
        "timestamp": 1561530000859
      },
      {
        "event": {
          "data": {
            "tx_hash": "235f8e7ab3c9515a17fe8ee721ef971bbee273eb90baf70788edda7b73138c86",
            "tx_hex": "0400008085202f8901a5464048246f791dca2f8cef2774125992cba7c0b820f32e7980be1de3380e7e00000000d8483045022100beca668a946fcad98da64cc56fa04edd58b4c239aa1362b4453857cc2e0042c90220606afb6272ef0773185ade247775103e715e85797816fbc204ec5128ac10a4b90120ea774bc94dce44c138920c6e9255e31d5645e60c0b64e9a059ab025f1dd2fdc6004c6b6304692c135db1752102631dcf1d4b1b693aa8c2751afc68e4794b1e5996566cfc701a663f8b7bbbe640ac6782012088a914eb78e2f0cf001ed7dc69276afd37b25c4d6bb491882102031d4256c4bc9f99ac88bf3dba21773132281f65f9bf23a59928bce08961e2f3ac68ffffffff0118ddf505000000001976a91405aab5342166f8594baf17a7d9bef5d56744332788ac8000135d000000000000000000000000000000"
          },
          "type": "TakerPaymentSpent"
        },
        "timestamp": 1561530003429
      },
      {
        "event": {
          "type": "TakerPaymentSpendConfirmStarted"
        },
        "timestamp": 1561530003430
      },
      {
        "event": {
          "type": "TakerPaymentSpendConfirmed"
        },
        "timestamp": 1561530003522
      },
      {
        "event": {
          "type": "Finished"
        },
        "timestamp": 1561530003525
      }
    ],
    "my_info": {
      "my_amount": "1",
      "my_coin": "BEER",
      "other_amount": "1",
      "other_coin": "PIZZA",
      "started_at": 1561529842
    },
    "maker_coin": "BEER",
    "maker_amount": "1",
    "taker_coin": "PIZZA",
    "taker_amount": "1",
    "gui": "KomoDeFi 1.0",
    "mm_version": "unknown",
    "recoverable": false,
    "success_events": [
      "Started",
      "Negotiated",
      "TakerFeeValidated",
      "MakerPaymentSent",
      "TakerPaymentReceived",
      "TakerPaymentWaitConfirmStarted",
      "TakerPaymentValidatedAndConfirmed",
      "TakerPaymentSpent",
      "TakerPaymentSpendConfirmStarted",
      "TakerPaymentSpendConfirmed",
      "Finished"
    ],
    "type": "Maker",
    "uuid": "6bf6e313-e610-4a9a-ba8c-57fc34a124aa",
    "my_order_uuid": "3447b727-fe93-4357-8e5a-8cf2699b7e86"
  }
}
```

#### Maker Swap Failed with MakerPaymentTransactionFailed Event

```json
{
  "error_events": [
    "StartFailed",
    "NegotiateFailed",
    "TakerFeeValidateFailed",
    "MakerPaymentTransactionFailed",
    "MakerPaymentDataSendFailed",
    "MakerPaymentWaitConfirmFailed",
    "TakerPaymentValidateFailed",
    "TakerPaymentWaitConfirmFailed",
    "TakerPaymentSpendFailed",
    "TakerPaymentSpendConfirmFailed",
    "MakerPaymentWaitRefundStarted",
    "MakerPaymentRefunded",
    "MakerPaymentRefundFailed"
  ],
  "events": [
    {
      "event": {
        "data": {
          "lock_duration": 7800,
          "maker_amount": "3.54932734",
          "maker_coin": "KMD",
          "maker_coin_start_block": 1452970,
          "maker_payment_confirmations": 1,
          "maker_payment_lock": 1563759539,
          "my_persistent_pub": "031bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8",
          "secret": "0000000000000000000000000000000000000000000000000000000000000000",
          "started_at": 1563743939,
          "taker": "101ace6b08605b9424b0582b5cce044b70a3c8d8d10cb2965e039b0967ae92b9",
          "taker_amount": "0.02004833998671660000000000",
          "taker_coin": "ETH",
          "taker_coin_start_block": 8196380,
          "taker_payment_confirmations": 1,
          "uuid": "3447b727-fe93-4357-8e5a-8cf2699b7e86"
        },
        "type": "Started"
      },
      "timestamp": 1563743939211
    },
    {
      "event": {
        "data": {
          "taker_payment_locktime": 1563751737,
          "taker_pubkey": "03101ace6b08605b9424b0582b5cce044b70a3c8d8d10cb2965e039b0967ae92b9"
        },
        "type": "Negotiated"
      },
      "timestamp": 1563743979835
    },
    {
      "event": {
        "data": {
          "tx_hash": "a59203eb2328827de00bed699a29389792906e4f39fdea145eb40dc6b3821bd6",
          "tx_hex": "f8690284ee6b280082520894d8997941dd1346e9231118d5685d866294f59e5b865af3107a4000801ca0743d2b7c9fad65805d882179062012261be328d7628ae12ee08eff8d7657d993a07eecbd051f49d35279416778faa4664962726d516ce65e18755c9b9406a9c2fd"
        },
        "type": "TakerFeeValidated"
      },
      "timestamp": 1563744052878
    },
    {
      "event": {
        "data": {
          "error": "lp_swap:1888] eth:654] RPC error: Error { code: ServerError(-32010), message: \"Transaction with the same hash was already imported.\", data: None }"
        },
        "type": "MakerPaymentTransactionFailed"
      },
      "timestamp": 1563744118577
    },
    {
      "event": {
        "type": "Finished"
      },
      "timestamp": 1563763243350
    }
  ],
  "success_events": [
    "Started",
    "Negotiated",
    "TakerFeeValidated",
    "MakerPaymentSent",
    "TakerPaymentReceived",
    "TakerPaymentWaitConfirmStarted",
    "TakerPaymentValidatedAndConfirmed",
    "TakerPaymentSpent",
    "TakerPaymentSpendConfirmStarted",
    "TakerPaymentSpendConfirmed",
    "Finished"
  ],
  "uuid": "3447b727-fe93-4357-8e5a-8cf2699b7e86"
}
```

#### Response (error)

```json
{
  "error": "swap data is not found"
}
```

</collapse-text>

</div>
