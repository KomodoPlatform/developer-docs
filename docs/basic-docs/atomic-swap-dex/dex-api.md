# DEX API

## Note About Current Limitations

This API documentation currently only features RPC methods that are available in MarketMaker 2.0 (MM2). There are many commands from the legacy Market Maker 1.0 that we intend to import to MM2 as soon as possible. For now, you may find those commands at [this external website.](api.kmd.host)

## electrum

**electrum coin ipaddr port**

::: warning Note
This command must be executed at the initiation of each MM2 instance.
:::

The `electrum` method connects your MM2 instance to the `coin` blockchain using electrum technology (e.g. lite mode).

This allows the user to rely on SPV technology for blockchain syncing, rather than syncing the entire blockchain locally.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | (string) | the name of the coin to which you desire to connect |
| ipaddr    | (string) | the initial ip address by which you desire to connect |
| port      | (number) | the port on which to connect |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |           |           |

#### :pushpin: Examples:

(coming soon)

## enable

**enable (coin)**

The `enable` method connects your MM2 instance to the `coin` blockchain using the blockchain's native technology.

A native installation of this blockchain must also be running on the user's node for `enable` to function.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | (string) | the name of the coin to which you desire to connect |

### Response:


| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |||

#### :pushpin: Examples:

(coming soon)

## my_balance

**my_balance coin**

The `my_balance` method returns the current balance of the specified coin.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | (string) | the name of the coin to which you desire to connect |

### Response:


| Structure | Type     | Description |
| --------- | -------- | ----------- |
|(coming soon)|||

#### :pushpin: Examples:

(coming soon)

## orderbook

**orderbook base rel duration=number**

The `orderbook` method requests from the network the currently available orders for the specified trading pair.

By default `duration` should be set to `duration=3600`.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | (string) | the name of the coin the user desires to receive |
| rel       | (string) | the name of the coin the user desires to sell |
| duration  | (number) | |

### Response:


| Structure | Type     | Description |
| --------- | -------- | ----------- |
|(coming soon)|||

## buy

**buy base rel price relvolume timeout=number duration=number**

The `buy` method issues a buy request and attempts to match an order from the orderbook based on the provided arguments.

By default, `timeout` and `duration` should be set to `timeout=10` and `duration=3600`.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | (string) | the name of the coin the user desires to receive |
| rel       | (string) | the name of the coin the user desires to sell |
| price     | (number) | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| relvolume | (number) | the amount of coins the user is willing to spend of the `rel` coin |
| timeout | (number) | |
| duration | (number) | | 

#### :pushpin: Examples:

(coming soon)

## sell

**sell base rel price basevolume timeout=number duration=number**

The `sell` method issues a sell request and attempts to match an order from the orderbook based on the provided arguments.

By default, `timeout` and `duration` should be set to `timeout=10` and `duration=3600`.




