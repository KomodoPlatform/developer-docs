# Rogue

## Tutorial Availability

An installation, Rogue API, and gameplay walkthrough is available in the [<b>Fluidity Tutorials section.</b>](../basic-docs/fluidity/fluidity-tutorials/rogue-module-tutorial.html#introduction)

## bailout

**cclib bailout 17 '["gametxid"]'**

The `bailout` method allows a user to withdraw their character from the game.

This method is only available when the character is still alive. The character must remain alive until the returned `bailout_txid` is mined.

Also, the character must have more than `0` gold and must have killed at least `1` monster. Otherwise, the `bailout` method will treat the character as dead, regardless of the character's status.

When the character successfully bails out from the game, all in-game gold the character has captured is converted into `ROGUE` coins.

The conversion ratio depends upon the mode of gameplay.

- Single-player mode:
```
ROGUE_satoshis = gold * gold * dungeon_level_on_exit * 10
```

- Multi-player mode:
```
ROGUE_satoshis = gold * gold * dungeon_level_on_exit * 20
```

The conversion is facilitated using globally locked `ROGUE` coins. The funds in this global vault automatically accrue through asset-chain activity. In the event that there are not enough globally locked funds at the time the method is executed, the player must simply wait until the funds are generated via automated methods. You can encourage this fund to grow more quickly by encouraging other players and people to transact using ROGUE, as transactions feed the fund.

The method returns a `hex` value. While most methods in the Komodo API require the user/developer to broadcast the `hex` value using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction), the Rogue module broadcasts automatically.

#### Arguments

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| gametxid | (string) | the `gametxid` transaction id that identifies the game for which the user would like to bail out their character |

#### Response

| Name        | Type     | Description                                                                                                                                                                |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | (string) | the name of the module                                                                                                                                                     |
| method      | (string) | the name of the method                                                                                                                                                     |
| myrogueaddr | (string) | the address on the Smart Chain for the user's `pubkey`     |
| gametxid    | (string) | the unique `gametxid` transaction id that identifies this game                                                                                                             |
| hex        | (string)         | a `hex` value containing the relevant game data; this value is broadcast automatically |
| txid        | (string) | a `playertxid` transaction id that identifies this unique character; this txid can be used in the future with the `register` method to reuse the character from this game |
| result      | (string) | whether the command executed successfully                                                                                                                                  |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib bailout 17 '["39b65c12e37f6338b2daf8b7d8d6e1b6c083622590cb7a318daadabc785b73f0"]'
```


<collapse-text hidden title="Response">


```bash
{
  "name": "rogue",
  "method": "bailout",
  "myrogueaddr": "RVuzXY65FyJiPPWSBc9efATh6nb4M9MceR",
  "gametxid": "39b65c12e37f6338b2daf8b7d8d6e1b6c083622590cb7a318daadabc785b73f0",
  "hex": "0400008085202f8902261b7562e9ce81a3b666a69cd71c1900bece3e8ca9bb85430076f0de51ef9b8700000000a74ca5a281a1a0819ca28194a067a5658021027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e858140d2f916906d56a615de2c3a04bf7977df9136a7adc793681917bc44656c61c0ef68038ff1072632d5b546b17c9a0f58d5e057c4794f01e54c90a247460d6bd2afa129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001fffffffff0735b78bcdaaa8d317acb90256283c0b6e1d6d8b7f8dab238637fe3125cb63902000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140c08bf9ed2c6ddbe3298fcad23f7397fd17bb76cafada4793acb7a6a4c08908731bdf90ace865fa8111a827d874fbd8f447fecca5982654685365577f1b5e7d36a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff0300a60e0000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc30750000000000002321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85ac00000000000000005f6a4c5c1151f0735b78bcdaaa8d317acb90256283c0b6e1d6d8b7f8dab238637fe3125cb63905524f4755450c4c6542726f6e204a616d65730000000021027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e850000000000c04c00000000000000000000000000",
  "txid": "194fe36a878fdac853e05c9b48b771a69a9a980c22c803b2ec5c2ceecb719329",
  "result": "success"
}
```

</collapse-text>


## extract

**cclib extract 17 '["gametxid","pubkey"]'**

The `extract` method allows the user to extract the complete history of a game. This allows the user to view a replay of the game.

#### Arguments

| Name     | Type     | Description                                                                                              |
| -------- | -------- | -------------------------------------------------------------------------------------------------------- |
| gametxid | (string) | the transaction id that was returned after broadcasting the returned hex value from the `newgame` method |
| pubkey   | (string) | the `pubkey` of the player for whom the user desires to extract all relevant game data                   |

#### Response

| Name       | Type     | Description                                                                                              |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------- |
| name       | (string) | the name of the module                                                                                   |
| method     | (string) | the name of the method                                                                                   |
| gametxid   | (string) | the transaction id that was returned after broadcasting the returned hex value from the `newgame` method |
| rogueaddr  | (string) | the address for the `pubkey`                                                              |
| status     | (string) | whether the command executed successfully                                                                |
| keystrokes | (string) | all keyboard strokes concatenated into a single hex string                                               |
| numkeys    | (number) | the total number of keystrokes (ASCII symbols)                                                               |
| playertxid | (string) | the `playertxid` transaction id that represents the character belonging to the indicated `pubkey`        |
| extracted  | (string) | the gameplay progress extracted via the `keystrokes` replay feature     |
| seed       | (decimal number)   | the blockchain-generated random seed. This provides the necessary randomization for players to generate the current game's level design. The `seed` value is revealed at the `start` block height.                                                                        |
| replay     | (string) | the complete terminal command that must be executed to begin this game                                   |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib extract 17 '["6bb0efcb14cd5101a4d8d8865c6a93162aa9480c5d3e0ce33902193cebdc4c39","0325151cf0f7321d0cde232898c5adc6b60f32df71b79af3a49d10020d42925ae9"]'
```


<collapse-text hidden title="Response">


```bash
{
  "name": "rogue",
  "method": "extract",
  "gametxid": "6bb0efcb14cd5101a4d8d8865c6a93162aa9480c5d3e0ce33902193cebdc4c39",
  "rogueaddr": "RJHD68KaUg14DaooPz5VFXeTTh8qdpEseb",
  "status": "success",
  "keystrokes": "772a2064572a20636868686a68686866686868686868686868686868686c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6b6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c686a686a68686c6b6c6c6c6a6c6a6a6a6c6a6a6a6a6a686a6868686868686a6a686a6a6c6c6c6c6c6c6c6c6c6a6a6a6a6a6a6a6a6a6a686b6b6b6c6b6b6b6b6b6b68686868686868686b6b68206b686868686868686868686868686868686868686868686a6a6a6a686868686868686868686b686b686c6c6a6a6a6c6a6c6a6a6a6a6a6a6c6c6c6c6c6c6c6c6c6c6a6a6a686b6c6b6b6b686868686868686868686b6b6b6b68686868686868686868686868686c6c6c6c206c6c686868686868686b6b68686868206868686a6c6c6a6a6a6a6a6a68686868686868686868686a6a6a666a686868686b686c206c6920207170686c6c206a6b206a6920207270686b6c6c6c6c6c6c6c6c6b686b6b6b6c6c6c6c6c6c6c6c6b6b20666b6b6b6b686868686868686868686b6b686b6b6b6b6b6b6b6c6c6c6c6b6b6b6b6c6c6c6c6c6c6c6c6c6c6a6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6a206868686868686868686868666c6c6c6c6c6a6c6c6c6c6c6c6c6c6a6a6a68686868686868686868686868686a6a6a6a6a6a6a6a6c6c6c6c6c6c6c6c6c6a6a6a68686868683e6c686668686b68206c206c6a686a6a6a6a6a6a6a206b6b666a6a6c6c6a6c6c6c6c6868686868686868686868686868686868686868686868686868686868686868686a6a6a686868686868686868686b68686868686868686868206869206868646c6c6c6c6b6b686b6b6b6b6c6c6c6c6b6b6b6868686868686b6b6b6b6b6b6b68686868686868686868686b6b6b6b6b6c6c6c6c6c6c6c6c6c6c6c20686868666c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6a6a6a6c6c6c6c6c6c206868686c6c6c20666b6b6920646a6c64696a686c6c6b206a692071202020726d6b6a6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6a6a6a6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c73736868686868686868686868686868686868686868686868686868686868686868686b6b6b686868686868686868686868686a686a6a6a6a6a6c6c6c6c6c6c6c6c6c6c206c6c6c206c6c6c6c206c6a6a6a6a6a6868686868686868686b6b6b6868686868206a20206c206c6c206c6c206c20",
  "numkeys": 884,
  "playertxid": "aeea6d8b3f50391a4bd477761e4d15ce3872ca6eccdfdb0fe40dd35868924c48",
  "extracted": "$$$gold.288 hp.52 strength.16/16 level.6 exp.271 dl.2",
  "seed": 4344864534442616921,
  "replay": "cc/rogue/rogue 4344864534442616921"
}
```

</collapse-text>


## gameinfo

**cclib gameinfo 17 '["gametxid"]'**

The `gameinfo` method returns relevant information about the indicated `gametxid` game.

#### Arguments

| Name     | Type     | Description                                                                                              |
| -------- | -------- | -------------------------------------------------------------------------------------------------------- |
| gametxid | (string) | the transaction id that was returned after broadcasting the returned hex value from the `newgame` method |

#### Response

| Name       | Type               | Description                                                            |
| ---------- | ------------------ | ---------------------------------------------------------------------- |
| name       | (string)           | the name of the module                                                     |
| method     | (string)           | the name of the method                                                     |
| gametxid   | (decimal number)   | the indicated `gametxid` transaction id                                |
| result     | (string)           | whether the command executed successfully                              |
| gameheight | (decimal number)   | the block height at which this `gametxid` was created                                                                      |
| height     | (decimal number)   | this value is the same as the `gameheight` value above                                                                         |
| start      | (decimal number)   | the block height at which the seed will be revealed                                                                       |
| starthash  | (string)           | the hash of the `start` block                                                                        |
| seed       | (decimal number)   | the blockchain-generated random seed. This provides the necessary entropy for players to generate the current game's level design. The `seed` value is revealed at the `start` block height.                                                                        |
| run        | (string)           | the complete terminal command that must be executed to begin this game |
| alive      | (decimal number)   | the number of players still alive in the game                          |
| numplayers | (decimal number)   | the total number of players that joined the game                       |
| maxplayers | (decimal number)   | the max number of players the game allows                              |
| buyin      | (number)           | the amount of `ROGUE` coins required for a player to join              |
| players    | (array of strings) | an array containing the identifying transaction ids of each player     |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026"]'
```


<collapse-text hidden title="Response">


```json
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026",
  "result": "success",
  "gameheight": 19587,
  "height": 19587,
  "start": 19587,
  "starthash": "0003a5ed4715220a742a6c2381daa5d49d29fa56189c7d676985902734e71e2e",
  "seed": 2991956025523248686,
  "run": "./komodo-cli -ac_name=ROGUE cclib register 17 '["b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026"]'",
  "alive": 0,
  "numplayers": 0,
  "maxplayers": 1,
  "buyin": 0.0,
  "players": []
}
```

</collapse-text>


## games

**cclib games 17**

The `games` method displays a list of the user's unfinished and finished games.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name      | Type               | Description                                                                                   |
| --------- | ------------------ | --------------------------------------------------------------------------------------------- |
| name      | (string)           | the name of the module                                                                        |
| method    | (string)           | the name of the method                                                                        |
| pastgames | (array of strings) | an array of `gametxid` transaction ids of finished games, from the user's local wallet file   |
| games     | (array of strings) | an array of `gametxid` transaction ids of unfinished games, from the user's local wallet file |
| numgames  | (decimal number)   | the total number of games, from the user's local wallet file                                  |

#### :pushpin: Examples

Command:

```bash
 ./komodo-cli -ac_name=ROGUE cclib games 17
```


<collapse-text hidden title="Response">


```json
{
  "name": "rogue",
  "method": "games",
  "pastgames": [
    "2d1010473c9675a3e04e84fe191404926761f324e4053a0f859d4806f68bbf25",
    "39b65c12e37f6338b2daf8b7d8d6e1b6c083622590cb7a318daadabc785b73f0",
    "790b94addb0c19399a7afedbb7580268f4fc8a3d91a600af6729c4d73fdb6498",
    "bbdecbb3b037e299dd5b303a11e4839e5625c94ce4e36acd3b7b549fec342ad3",
    ...
    ...
    ...
    "43244d4be57564ef441fe8790bb08e23787244f533c9591ab3adb9cf755e9eed",
    "0199a50d45e56060ded6aa30e3ce4ae8ed090c0033c78e3e024aef403277a207",
    "a3833e860ff02d178f431032952f947f7e0c485690d9dd7e6e8133813f253a34",
  ],
  "games": [
    "b94a0c14604df04a994e8fde610af7ddede76a62e1e3d86bbdac18e695662301",
    "3443ad3112908b31cab74ec7094c294d337aad5253e4e1af35eaac1f31ed7ab3",
     ...
     ...
     ...
    "dd859a7a9c980e7a5018913de98e48515a96b1ac54b39515e2cca3efed9659eb"
  ],
  "numgames": 140
}
```

</collapse-text>


## highlander

**cclib highlander 17 '["gametxid"]'**

The `highlander` method allows a character to exit the game and claim the `buyin` prize funds.

In single-player mode, the `highlander` method is available after safely retrieving the `amulet` and exiting the dungeon.

In multi-player mode, the `highlander` method is available either to the character that is the last man standing, or to any character that successfully retrieves the `amulet` and exits the dungeon.

### Highlander Rewards

The character that successfully executes the `highlander` method receives an increased ratio of conversion from in-game gold to `ROGUE` coins. The ratio depends upon the mode of gameplay; see below for further details.

The conversion is facilitated using globally locked `ROGUE` coins. The funds in this global vault automatically accrue through asset-chain activity. In the event that there are not enough globally locked funds at the time the `highlander` method is executed, the player must wait until the funds are generated via automated methods. You can encourage this fund to grow more quickly by encouraging other players and people to transact using ROGUE, as transactions feed the fund.

#### Rewards in Single-Player Mode

```
ROGUE_satoshis = gold * gold * dungeon_level_on_exit * 10
```

#### Rewards in Multi-Player Mode

```
ROGUE_satoshis = gold * gold * dungeon_level_on_exit * 20
```

#### Arguments

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| gametxid | (string) | the `gametxid` transaction id that identifies the game for which the user would like to bail out their character |

#### Response

| Name        | Type     | Description                                                                                                                                                                |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | (string) | the name of the module                                                                                                                                                     |
| method      | (string) | the name of the method                                                                                                                                                     |
| myrogueaddr | (string) | the address on the Smart Chain for the user's `pubkey`     |
| gametxid    | (string) | the unique `gametxid` transaction id that identifies this game                                                                                                             |
| txid        | (string) | a `playertxid` transaction id that identifies this unique character; this txid can be used in the future with the `register` method to reuse the character from this game |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib highlander 17 '["b94a0c14604df04a994e8fde610af7ddede76a62e1e3d86bbdac18e695662301"]'
```


<collapse-text hidden title="Response">


```bash
{
  "name": "rogue",
  "method": "highlander",
  "myrogueaddr": "RVuzXY65FyJiPPWSBc9efATh6nb4M9MceR",
  "gametxid": "b94a0c14604df04a994e8fde610af7ddede76a62e1e3d86bbdac18e695662301",
  "result": "success",
  "hex": "hex",
  "txid": "txid"
}
```

</collapse-text>


## keystrokes

**cclib keystrokes 17 '["gametxid","keystrokes"]'**

The `keystrokes` method executes the indicated `keystroke` for the indicated `gametxid`.

The player's keystrokes on the keyboard are recorded in ASCII format. [See this link](https://theasciicode.com.ar/) for a table of ASCII keyboard translations.

After a game concludes the complete list of keystrokes can be found in the `~/komodo/src/keystrokes.log` file.

#### Arguments

| Name       | Type     | Description                                                                                                      |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| gametxid   | (string) | the `gametxid` transaction id that identifies the game for which the user would like to bail out their character |
| keystrokes | (string) | the desired keystrokes, provided in ASCII format and concatenated into a single string                          |

#### Response

| Name   | Type | Description |
| ------ | ---- | ----------- |
| result      | (string) | whether the command executed successfully                                                                                                                                  |
| name        | (string) | the name of the module                                                                                                                                                     |
| method      | (string) | the name of the method                                                                                                                                                     |
| gametxid    | (string) | the unique `gametxid` transaction id that identifies this game                                                                                                             |
| keystrokes | (string) | the desired keystrokes, provided in ASCII format and concatenated into a single string                          |
| batontxid | (string) | the unique `batontxid` transaction id; this value is useful for tracing the route of a utxo/token through the blockchain database |
| playertxid   | (string)           | the unique identifying transaction id of this player                                                    |
| hex        | (string)         | a `hex` value containing the relevant game data; this value is broadcast automatically |
| txid | (string) | a unique transaction id for the `keystrokes` transaction |
| result      | (string) | whether the command executed successfully                                                                                                                                  |
| error | (string) | error messages are returned here |
| id | (string) | the returned value here, `jl777`, is constant and can be ignored |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib keystrokes 17 '["777ba510824b467e9ddfb00a075e9cd5c6f73d1fa6f772b1a22563502def25ee","6a68686868686866686820686868682068686868206868666868686c6c6c6c6a6a6a6a6a6a6a6a6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6a6a6a68666b"]'
```


<collapse-text hidden title="Response">


```bash
{
   "result":{
      "name":"rogue",
      "method":"keystrokes",
      "gametxid":"777ba510824b467e9ddfb00a075e9cd5c6f73d1fa6f772b1a22563502def25ee",
      "keystrokes":"6a68686868686866686820686868682068686868206868666868686c6c6c6c6a6a6a6a6a6a6a6a6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6a6a6a68666b",
      "batontxid":"3d9b93fb784852c5899f5cfa11b0c24f185835169781755027cb7e04fe4a7463",
      "playertxid":"0000000000000000000000000000000000000000000000000000000000000000",
      "hex":"0400008085202f890163744afe047ecb2750758197163558184fc2b011fa5c9f89c5524878fb939b3d00000000a74ca5a281a1a0819ca28194a067a5658021027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85814086ad1e7babe52189c9201acae2a031284ebba0fa5841f4e35a475c9eb267140d535b96e2379b2c99332c4f5efdbddcb5cd850301b9ffe1ba6de139696cea5439a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff029063a70000000000302ea22c80202ba0b269f75c72a0ce23e03812814b1e76a8fd57b3e75fee8b37bfef2b4ebf3581031210008203000401cc0000000000000000ad6a4caa114bee25ef2d506325a2b172f7a61f3df7c6d59c5e070ab0df9d7e464b8210a57b7763744afe047ecb2750758197163558184fc2b011fa5c9f89c5524878fb939b3d21027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85456a68686868686866686820686868682068686868206868666868686c6c6c6c6a6a6a6a6a6a6a6a6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6a6a6a68666b00000000a6b900000000000000000000000000",
      "txid":"1fc6543d4aa577e976f9cb449835fe633510e169e00ceff243ca2791d68aec1c",
      "result":"success"
   },
   "error":null,
   "id":"jl777"
}
```

</collapse-text>


## newgame

**cclib newgame 17 '[maxplayers, buyin]'**

The `newgame` method creates a new game.

The `buyin` argument is required for multi-player games. The coins contributed via `buyin` become a winner-takes-all pot. Either the first player to claim the `amulet` and return from the dungeon, or the last player standing; may claim this prize using the [highlander](../customconsensus/rogue.html#highlander) method.

#### Arguments

| Name       | Type                                     | Description                                                                         |
| ---------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| maxplayers | (decimal number)                         | the max number of players; if set to `1`, the game begins in single-player mode     |
| buyin      | (number, required if `maxplayers` > `1`) | the required amount to contribute per player; the winner receives all `buyin` coins |

#### Response

| Name       | Type             | Description                                                                                                         |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| name       | (string)         | the name of the module                                                                                              |
| method     | (string)         | the name of the method                                                                                              |
| maxplayers | (decimal number) | the max number of players for this game                                                                             |
| buyin      | (number)         | the required amount to contribute per player; the winner receives all `buyin` coins                                 |
| type       | (string)         | the level of difficulty for this game                                                                               |
| hex        | (string)         | a `hex` value containing the relevant game data; this value is broadcast automatically |
| txid       | (string)         | a transaction id that represents the `gametxid`                                                                     |
| result     | (string)         | whether the command executed successfully                                                                           |

#### :pushpin: Examples

Command for a single-player training game:

```bash
./komodo-cli -ac_name=ROGUE cclib newgame 17 "[1]"
```


<collapse-text hidden title="Response">


```json
{
  "name": "rogue",
  "method": "newgame",
  "maxplayers": 1,
  "buyin": 0.0,
  "type": "newbie",
  "hex": "0400008085202f8901018feb110a6e0d8751a158b3e73dac07383c83766a83908d641f2d4b1db6f704010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581405349ce7a0a3823ca35e3dc30d17c8d8f170bfea89373166f14b8b4f04d36c34a41199ad448074be74b7a6344d0c36b4f68748f976f3f95b7d0c8ec84e54bf773a100af03800111a10001ffffffff061027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc40420f0000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc1027000000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc00b8880000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc10270000000000002321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85ac0000000000000000106a0e114700000000000000000100000000000000964c00000000000000000000000000",
  "txid": "b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026",
  "result": "success"
}
```

</collapse-text>


## pending

**cclib pending 17**

The `pending` method displays a list of unfinished games on the Smart Chain.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name       | Type               | Description                                                                 |
| ---------- | ------------------ | --------------------------------------------------------------------------- |
| result     | (string)           | whether the command executed successfully                                   |
| name       | (string)           | the name of the module                                                      |
| method     | (string)           | the name of the method                                                      |
| pending    | (array of strings) | an array of `gametxid`'s that represent unfinished games on the Smart Chain |
| numpending | (decimal number)   | the total number of unfinished games on the Smart Chain                     |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib pending 17
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "name": "rogue",
  "method": "pending",
  "pending": [
    "19de2b0f2562ae775ef213d1e396bc741ccc4f32bac32b36e8ee5da25e451801",
    "ff5139cfcb47366674f52c550cfb9c11eb298afa1479ce9924d8bac2a407d701",
    "8f3e6104ee324bc6a60430ef9485c682ee890cdb0660e9a747599531fecea203",
    ...
    ...
    ...
    "ff9d5e111caaa0e84666ce6e0fda66e93e4fb13ca2dd0debbdc82e663b36d9fc"
  ],
  "numpending": 175
}
```

</collapse-text>


## playerinfo

**cclib playerinfo 17 '["playertxid"]'**

The `playerinfo` method displays information about the currently active character.

##### Tips on Finding Character Information

There are occasions where the developer may wish to start with the `tokentxid` of a character(s) and from there find the most up-to-date `playertxid`.

The following is one solution:

- If necessary, obtain a list of all `tokens` on the Smart Chain via the [tokenlist](../customconsensus/tokens.html#tokenlist) method.
- For each item in the response, execute an iterative function that executes the [playerinfo](../customconsensus/rogue.html#playerinfo) method on the individual `token`.
  - If the method responds with an error, this means that the supplied `token` does not represent a character. Rather, it represents another on-chain asset, and therefore the token can be ignored.
- For each response from the `playerinfo` method check two elements: whether the data contains a `batontxid`; whether the character is alive.
  - If there is a `batontxid`, the `playertxid` has been used in a game and is no longer valid. Therefore, this `playertxid` can be ignored.
  - Likewise, if the character is no longer alive, it can be ignored.
- Each `token` that has a valid response, no `batontxid`, and represents a living character can be considered the correct `tokentxid` for the discovered `playertxid`.

#### Arguments

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| gametxid | (string) | the `gametxid` transaction id that identifies the game for which the user would like to bail out their character |

#### Response

| Name         | Type               | Description                                                                                             |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------- |
| result       | (string)           | whether the command executed successfully                                                               |
| name         | (string)           | the name of the module                                                                                  |
| method       | (string)           | the name of the method                                                                                  |
| player       | (json object)      | a json object containing relevant player data                                                           |
| playertxid   | (string)           | the unique identifying transaction id of this player                                                    |
| tokenid      | (string)           | the unique transaction id that represents this character as a non-fungible asset for on-chain trading using the [Tokens CC](../customconsensus/tokens.html#introduction) module                                                                                                        |
| data         | (string)           | the character-state information in hex form                                                                 |
| pack         | (array of strings) | an array containing the items in the character's pack                                                   |
| packsize     | (number)           | the number of items in the character's pack                                                             |
| hitpoints    | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information |
| strength     | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information |
| level        | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information |
| experience   | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information |
| dungeonlevel | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information |
| chain        | (string)           | the name of the Smart Chain on which this game is occurring                                             |
| pname        | (string)           | the name of the user's currently active character                                                       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib playerinfo 17 '["cf2ae0997e24f100aa9da3cda747105e3134a102da69630d6d1683a6f0f7b0ab"]'
```


<collapse-text hidden title="Response">


```json
"{
  "result": "success",
  "name": "rogue",
  "method": "playerinfo",
  "player": {
    "playertxid": "cf2ae0997e24f100aa9da3cda747105e3134a102da69630d6d1683a6f0f7b0ab",
    "tokenid": "929ff2101e974111499f37f2af86280f403f9e704c070a9225398aa5ce83c1cf",
    "data": "580000000c0000001000000001000000070000000700000001000000000000003a0000000000000003000000000000000000000000000000000000001000000000000000000000000000000000000000000000005d00000000000000010000000100000000000000000000000600000012000000000000000000000000000000000000000000000029000000ffffffff010000000000000001000000010000000000000012000000000000003278340000000000317833000000000029000000ffffffff0100000002000000010000000000000000000000120000000000000031783100000000003178310000000000290000000200000026000000030000000000000000000000000000001e00000000000000317831000000000032783300000000002100000000000000010000000a00000000000000000000000b0000001000000000000000307830000000000030783000000000002100000000000000010000000200000000000000000000000b000000100000000000000030783000000000003078300000000000",
    "pack": [
      "3 rations of food",
      "+1 ring mail [protection 4]",
      "A +1,+1 mace",
      "A +1,+0 short bow",
      "38 +0,+0 arrows",
      "A potion of haste self(topaz)",
      "A potion of poison(amber)"
    ],
    "packsize": 7,
    "hitpoints": 12,
    "strength": 16,
    "level": 1,
    "experience": 7,
    "dungeonlevel": 1,
    "chain": "ROGUE",
    "pname": "fred"
  }
}"
```

</collapse-text>


## players

**cclib players 17**

The `players` method displays a list of all `playertxid` transaction ids held in the user's current `pubkey`.

#### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response

| Name          | Type               | Description                                                                     |
| ------------- | ------------------ | ------------------------------------------------------------------------------- |
| name          | (string)           | the name of the module                                                          |
| method        | (string)           | the name of the method                                                          |
| playerdata    | (array of strings) | an array containing all `playertxid` transaction ids in the user's local wallet |
| numplayerdata | (decimal number)   | the number of `playertxid` transaction ids in the `playerdata` array            |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib players 17
```


<collapse-text hidden title="Response">


```json
{
  "name": "rogue",
  "method": "players",
  "playerdata": [
    "cf2ae0997e24f100aa9da3cda747105e3134a102da69630d6d1683a6f0f7b0ab",
    "1a705d1e900ac760afd5bb24e0d6c40ce6bf10f42d3344559ad18ddfa6ee08bc",
    "5ebd33eb9d62d977bf8d600d84fec1a6a6046a7a171bff64fa9548f05c8caddd"
  ],
  "numplayerdata": 3
}
```

</collapse-text>


## register

**cclib register 17 '["gametxid"(,"playertxid")]'**

The `register` method registers your character for a game.

The optional `playertxid` allows the user to reuse a character that survived a previous game.

For the `playertxid` argument to properly call an existing character, the user's daemon must be set to the `pubkey` that owns the `playertxid`. This can be accomplished either through the [pubkey](../installations/common-runtime-parameters.html#pubkey) launch parameter or through the [setpubkey](..) method.

#### Arguments

| Name       | Type               | Description                                                                   |
| ---------- | ------------------ | ----------------------------------------------------------------------------- |
| gametxid   | (string)           | the `gametxid` of the game the user desires to join                           |
| playertxid | (string, optional) | the `playertxid` of an existing character the user owns and would like to use |

#### Response

| Name       | Type               | Description                                                                           |
| ---------- | ------------------ | ------------------------------------------------------------------------------------- |
| name       | (string)           | the name of the module                                                                |
| method     | (string)           | the name of the method                                                                |
| maxplayers | (decimal number)   | the max number of players allowed in this game                                        |
| buyin      | (number)           | the required `buyin` amount of `ROGUE` coins to enter the game                        |
| type       | (string)           | the level of difficulty for this game                                                 |
| hex        | (string)           | a `hex` value of registration data; this value is broadcast automatically |
| txid       | (string)           | a transaction id that indicates the `playertxid` for this character                   |
| result     | (string)           | whether the command executed successfully                                             |

#### :pushpin: Examples

Command (registration without player):

```bash
./komodo-cli -ac_name=ROGUE cclib register 17 '["b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026"]'
```


<collapse-text hidden title="Response">


```json
{
  "name": "rogue",
  "method": "register",
  "maxplayers": 1,
  "buyin": 0.0,
  "type": "newbie",
  "hex": "0400008085202f890126504f5edd0fc461e09b4bd6d4439751d8037a927bd8d075eace1d9a3b1cabb901000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140a1f23cbe9d8e7a20306df4c86da47b4ae3b59556742b7fcdf68f6f3549b02d734879b94fd73f5847914d448e4d78e48d415bffe55081a491e242ec6256f02638a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff03301b0f0000000000302ea22c80202ba0b269f75c72a0ce23e03812814b1e76a8fd57b3e75fee8b37bfef2b4ebf3581031210008203000401cc0100000000000000302ea22c80207f0205ad6b02be91baf2a56dcc77381e7b0e19cb9a83dfb9530316958f5b706781032210008203000401cc0000000000000000446a42115226504f5edd0fc461e09b4bd6d4439751d8037a927bd8d075eace1d9a3b1cabb9000000000000000000000000000000000000000000000000000000000000000000000000bd4c00000000000000000000000000",
  "txid": "855802e2e83d0d4632518959e4ff9e840ed9838f51bd6b3a80dc27b8ea7900ba",
  "result": "success"
}
```

</collapse-text>


## setname

**cclib setname 17 '["pname"]'**

The `setname` method sets the name of a character.

A character may receive a `name` at any point, but the character's name may be set only once. It is not possible to rename a character.

#### Arguments

| Name               | Type     | Description                                                |
| ------------------ | -------- | ---------------------------------------------------------- |
| pname | (string) | the desired name for the user's currently active character |

#### Response

| Name               | Type     | Description                                                |
| ------------------ | -------- | ---------------------------------------------------------- |
| name               | (string) | the name of the module                                     |
| method             | (string) | the name of the method                                     |
| result             | (string) | whether the command executed successfully                  |
| pname | (string) | the desired name for the user's currently active character |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib setname 17 '["SuperMegaWarrior"]'
```


<collapse-text hidden title="Response">


```json
{
  "name": "rogue",
  "method": "setname",
  "result": "success",
  "pname": "SuperMegaWarrior"
}
```

</collapse-text>

