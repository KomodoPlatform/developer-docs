KomoDeFi stores historical information such as swaps and orders within an SQLite database, located under the DB user data folder (e.g. {folder continaing mm2 binary}/DB/{wallet identifying hex string}/MM2.db).

There are a variety of methods to query sqlite databases. Examples below show how to do a sqlite query in Linux terminal, but first you might need to install sqlite with `sudo apt install sqlite3`.

The tables and columns available to query are as follows:

## my_swaps

This table keeps a record of all swaps successfully performed in this pubkey's MM2.db

| ID  | Name       | Type         | Description   |
| --- | ---------- | ------------ | ------------- |
| 0   | id         | INTEGER      | Primary Key   |
| 1   | my_coin    | VARCHAR(255) | Coin sent     |
| 2   | other_coin | VARCHAR(255) | Coin received |
| 3   | uuid       | VARCHAR(255) | Swap UUID     |
| 4   | started_at | INTEGER      | Timestamp     |

#### Query:

`sqlite3 ${PATH_TO_MM2_DB_FILE} "SELECT * FROM my_swaps WHERE id=2 LIMIT 1"`

#### Response:

`2|MORTY|RICK|7086bc8e-bdaa-44b0-ac9b-01aa8760b62b|1636956829`

## stats_swaps

This table keeps a detailed record of all swaps performed (including failed) in this pubkey's MM2.db

| ID  | Name                 | Type         | Description                                     |
| --- | -------------------- | ------------ | ----------------------------------------------- |
| 0   | id                   | INTEGER      | Primary key                                     |
| 1   | maker_coin           | VARCHAR(255) | Maker coin                                      |
| 2   | taker_coin           | VARCHAR(255) | Taker coin                                      |
| 3   | uuid                 | VARCHAR(255) | Swap UUID                                       |
| 4   | started_at           | INTEGER      | Timestamp                                       |
| 5   | finished_at          | INTEGER      | Timestamp                                       |
| 6   | maker_amount         | DECIMAL      | Maker coin                                      |
| 7   | taker_amount         | DECIMAL      | Taker coin                                      |
| 8   | is_success           | INTEGER      | `1` for successful, `0` for failed              |
| 9   | maker_coin_ticker    | VARCHAR(255) | Maker coin ticker                               |
| 10  | maker_coin_platform  | VARCHAR(255) | Maker coin platform                             |
| 11  | taker_coin_ticker    | VARCHAR(255) | Taker coin ticker                               |
| 12  | taker_coin_platform  | VARCHAR(255) | Taker coin platform                             |
| 13  | maker_coin_usd_price | DECIMAL      | USD price of maker coin at the time of the swap |
| 14  | taker_coin_usd_price | DECIMAL      | USD price of taker coin at the time of the swap |
| 15  | taker_pubkey         | DECIMAL      | Taker pubkey                                    |
| 16  | maker_pubkey         | DECIMAL      | Maker pubkey                                    |

#### Query:

`sqlite3 ${PATH_TO_MM2_DB_FILE} "SELECT * FROM stats_swaps WHERE taker_coin = 'DOGE' and maker_coin = 'DGB' ORDER BY finished_at DESC LIMIT 1;"`

#### Response:

```
8|DGB|DOGE|c9515636-f5a4-4767-a0af-c69e59086899|1678815183|1678815631|200|28|1|DGB||DOGE||0.0108|0.07673|02d8064eece4fa5c0f8dc0267f68cee9bdd527f9e88f3594a323428718c391ecc2|03a93f666b9030958f282edd2904f0a33278c0c676ae132d2094840fe722f011c3
```

## my_orders

This table keeps a detailed record of all orders placed in this pubkey's MM2.db

| ID  | Name           | Type         | Description                                       |
| --- | -------------- | ------------ | ------------------------------------------------- |
| 0   | id             | INTEGER      | Primary Key                                       |
| 1   | uuid           | VARCHAR(255) | Order UUID                                        |
| 2   | type           | VARCHAR(255) | Order Type                                        |
| 3   | initial_action | VARCHAR(255) | `Buy` or `Sell`. Setprice maker orders are `Sell` |
| 4   | base           | VARCHAR(255) | Base Coin                                         |
| 5   | rel            | VARCHAR(255) | Rel Coin                                          |
| 6   | price          | DECIMAL      | Order Price                                       |
| 7   | volume         | DECIMAL      | Order Volume                                      |
| 8   | created_at     | INTEGER      | Timestamp                                         |
| 9   | last_updated   | INTEGER      | Timestamp                                         |
| 10  | was_taker      | INTEGER      | `1` if taker, `2` if maker                        |
| 11  | status         | VARCHAR(255) | Order status                                      |

#### Query:

`sqlite3 ${PATH_TO_MM2_DB_FILE} "SELECT * FROM my_orders WHERE base = 'RICK' and rel= 'MORTY' LIMIT 6"`

#### Response:

```
154|6053016b-e1ba-490f-9501-eafb69b4d3a7|Taker|Buy|RICK|MORTY|0.03|1|1640159991278|1640160021808|0|TimedOut
266|77d79265-da87-48bb-aee3-7cc87f442a55|Maker|Buy|RICK|MORTY|0.0505|3|1640857934304|1640874662778|1|InsufficientBalance
267|4c6341d6-1e89-4c3b-8612-a930754701f2|Taker|Sell|RICK|MORTY|1|2|1640872463330|1640872467129|0|Fulfilled
290|57c2b270-ee73-4a21-8fa4-4b8c2d76fc02|Maker|Buy|RICK|MORTY|0.1|0.1|1641539601576|1641539631823|1|ToMaker
291|9cba3b40-2426-4fbf-80c8-2a65c8661eed|Maker|Sell|RICK|MORTY|1|1|1641539652421|1641539813001|0|Cancelled
294|fedcc1e0-a059-47c6-bbfc-3a61454f1208|Maker|Sell|RICK|MORTY|1|12|1641546891912|1641546891912|0|Created
```

## nodes

This table stores a record of all nodes [added for stats collection](../atomicdex-api-20/add_node_to_version_stat.html) in this pubkey's MM2.db

| ID  | Name    | Type         | Description |
| --- | ------- | ------------ | ----------- |
| 0   | id      | INTEGER      | Primary Key |
| 1   | name    | VARCHAR(255) | Node name   |
| 2   | address | VARCHAR(255) | Node IP     |
| 3   | peer_id | VARCHAR(255) | Node PeerID |

#### Query:

`sqlite3 ${PATH_TO_MM2_DB_FILE} "SELECT * FROM nodes WHERE name = 'dragonhound_DEV'"`

#### Respose:

`37|dragonhound_DEV|104.238.221.61|12D3KooWEnrvbqvtTowYMR8FnBeKtryTj9RcXGx8EPpFZHou2ruP`

## stats_nodes

This table stores a record of results returned by registered nodes [tracked for node stats collection](../atomicdex-api-20/start_version_stat_collection.html) in this pubkey's MM2.db

| ID  | Name      | Type         | Description                              |
| --- | --------- | ------------ | ---------------------------------------- |
| 0   | id        | INTEGER      | Primary Key                              |
| 1   | name      | VARCHAR(255) | Node name                                |
| 2   | version   | VARCHAR(255) | Node Komodo DeFi Framework (mm2) version |
| 3   | timestamp | INTEGER      | Timestamp                                |
| 4   | error     | VARCHAR(255) | Error details                            |

#### Query:

`sqlite3 ${PATH_TO_MM2_DB_FILE} "SELECT * FROM stats_nodes WHERE name = 'dragonhound_DEV'" LIMIT 3`

#### Response:

```
540|dragonhound_DEV||1638542507|DialFailure
70638|dragonhound_DEV|2.1.4401_mm2.1_87837cb54_Linux_Release|1640270702|
70692|dragonhound_DEV||1640271615|Error on request the peer PeerId("12D3KooWEnrvbqvtTowYMR8FnBeKtryTj9RcXGx8EPpFZHou2ruP"): "Canceled". Request next peer
```
