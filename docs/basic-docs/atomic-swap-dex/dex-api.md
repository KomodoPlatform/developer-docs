# DEX API

## Note About Current Limitations

This API documentation currently only features RPC methods that are available in MarketMaker 2.0 (MM2). There are many commands from the legacy Market Maker 1.0 that we intend to import to MM2 as soon as possible. For now, you may find those commands at [this external website.](api.kmd.host)

## electrum

**electrum coin ipaddr port**

::: warning Note
This command must be executed at the initiation of each MM2 instance.
:::

The `electrum` method connects your MM2 instance to the `coin` blockchain using electrum technology (e.g. lite mode).

This allows the user to rely on SPV technology for blockchain syncing, rather than syncing the entire blockchain to their local machine.

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

The `enable` method connects your MM2 instance to the `coin` blockchain using this blockchain's native technology.

A native installation of this blockchain must also be running on the user's node for `enable` to function.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| coin      | (string) | the name of the blockchain to which the user desires to connect |

### Response:


| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |||

#### :pushpin: Examples:

(coming soon)

## my_balance

**my_balance coin**

The `my_balance` method returns the current balance of the specified `coin`.

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

## setprice

**setprice base rel price broadcast=number**

::: warning Note
This API method's documentation is currently limited, as we are still testing.
:::

The `setprice` method places an order on the orderbook, and it relies on this node acting as a `maker` -- also called a `Bob` node.

`setprice` requires that the node have the `maker` environment enabled at runtime. To achieve this, do not set the `client=1` parameter.

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| base       | (string) | the name of the coin the user desires to receive |
| rel       | (string) | the name of the coin the user desires to sell |
| price     | (number) | the price in `rel` the user is willing to pay per one unit of the `base` coin |
| broadcast | (number) | |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (coming soon) | | | 

#### :pushpin: Examples:

(coming soon)

## stop

**stop()**

The `stop` method stops the MM2 software if there are no swaps in process. 

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |   | |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |   | |

#### :pushpin: Examples:

(coming soon)

## help

**help()**

The `help` method returns the full API documentation in the terminal. 

### Arguments:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |   | |

### Response:

| Structure | Type     | Description |
| --------- | -------- | ----------- |
| (none)    |   | |

#### :pushpin: Examples:

(coming soon)

