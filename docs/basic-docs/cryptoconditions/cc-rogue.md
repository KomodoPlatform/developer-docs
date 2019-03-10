# Contract Module: Rogue

## Introduction

The Rogue CryptoConditions (CC) contract module serves as a proof-of-concept to demonstrate CryptoCondition's capabilities as a blockchain-based gaming technology.

Rogue CC is based on the classic [Rogue](http://www.livingroguelike.com/rl-games/the-original-rogue-information-and-how-to-play-online/) game. As such, it can be categorized as a [Roguelike.](http://www.livingroguelike.com/roguelike-info-discussions/what-is-a-roguelike/)

The core aspects of Rogue gameplay occur on the blockchain. These aspects include such data as character health points, items, movement, attacks, and other relevant game states.

Komodo's Rogue implementation makes use of the classic on-screen visual representation of gameplay. This interface relies on ASCII characters to represent characters, items, and other in-game objects and actions.

The procedures to launch and finish a game require the execution of various methods (rpcs). To make the game more easy to start and finish for players who are not comfortable with the terminal, the Komodo team has created a Terminal User Interface (TUI).

The following installation and walkthrough tutorials can assist the reader in testing Rogue. For more information, please reach out to our community on [Discord](https://komodoplatform.com/discord). The #cc-rogue channel is available for questions and assistance.

## Installation

### Requirements

Rogue is currently playable on modern MacOS and Linux machines.

Windows is not yet available. Please ask on our #cc-rogue channel on [Discord](https://komodoplatform.com/discord) for updates.

### Install Dependencies

#### Linux

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

#### macOS (OSX)

Use the terminal to ensure the MacOS XCode tools are installed:

```bash
xcode-select --install
```

Ensure the latest version of `brew` is installed. If necessary, execute the following command:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Once `brew` is installed, execute each of the following commands:

```bash
brew update
brew upgrade
brew tap discoteq/discoteq; brew install flock
brew install autoconf autogen automake
brew install gcc@6
brew install binutils
brew install protobuf
brew install coreutils
brew install wget
```

### Clone & Compile Komodo

#### Linux

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

#### MacOS

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build-mac.sh -j8
```

::: tip
Change the `8` in the `-j8` portion of the last command to any number of processor threads desired and/or appropriate for your machine.
:::

### Update `komodod`

```bash
cd ~/komodo
git checkout jl777
git pull
./zcutil/build.sh -j$(nproc)
```

### Set `pubkey` value

#### Step 1 - Start the chain

Start the ROGUE chain with the following command in a terminal window and wait for the daemon to sync. Keep this terminal open and the daemon running for the duration of your Rogue gameplay.

```bash
cd ~/komodo/src
./komodod -ac_name=ROGUE -ac_supply=1000000 -addnode=5.9.102.210  -ac_cclib=rogue -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60001 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc -daemon
```

#### Step 2

Open a new terminal. This terminal can be used to execute all remaining installation and gameplay commands.

```bash
./komodo-cli -ac_name=ROGUE getnewaddress
```

The returned value is a ROGUE address. We need to find the associated pubkey for this address.

#### Step 3

Use the `validateaddress` method with the address.

```bash
./komodo-cli -ac_name=ROGUE validateaddress insert_address_here
```

The `validateaddress` method will return information similar to the following:

```JSON
{
  "isvalid": true,
  "address": "RPCeZmqW4Aam52DFLmMraWtu5CuXPxqk92",
  "scriptPubKey": "76a91498b5caa42ffe9868844c51ba6e085e5e7e92fc2588ac",
  "segid": 13,
  "ismine": true,
  "iswatchonly": false,
  "isscript": false,
  "pubkey": "02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2",
  "iscompressed": true,
  "account": ""
}
```

Look for the `pubkey` value:

```bash
"pubkey": "02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2",
```

This is the `pubkey` for our address.

#### Step 4

Set the pubkey for the ROGUE asset chain.

```bash
./komodo-cli -ac_name=ROGUE setpubkey 02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2
```

Response:

```JSON
{
  "address": "RPCeZmqW4Aam52DFLmMraWtu5CuXPxqk92",
  "ismine": true,
  "pubkey": "02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2"
}
```

The pubkey is now set.

To reuse this pubkey in the future, include the pubkey as a [pubkey](../installations/common-runtime-parameters.html#pubkey) launch parameter.

<!--
ac_pubkey vs pubkey launch parameter in this section?
-->

For example:

```bash
cd ~/komodo/src
./komodod -ac_name=ROGUE -pubkey=02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2 -ac_supply=1000000 -addnode=5.9.102.210  -ac_cclib=rogue -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60001 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc -daemon
```

### Installing the TUI (Optional)

The Terminal User Interface (TUI) provides automated methods for executing the ROGUE methods (rpcs) that are used to start and finish a game. Use of the TUI is optional, but recommended for most players.

#### Linux

Open another terminal window. (Do not close the other terminal windows that are running the game's daemon.)

Install TUI dependencies:

```bash
sudo apt-get install python3.6 python3-pip libgnutls28-dev
```

Install required python packages:

```bash
pip3 install setuptools wheel slick-bitcoinrpc
```

Clone the repo and copy the required files:

```bash
git clone https://github.com/tonymorony/komodo_cryptoconditions_tui
cd komodo_cryptoconditions_tui
git checkout rogue
cp -r * ~/komodo/src
```

Execute the following commands to launch the TUI software:

```bash
cd  ~/komodo/src
./rogue_tui.py
```

#### MacOS (OSX)

Download the latest portable zip for OSX:

[Link to Komodo Rogue TUI downloadable zip](https://github.com/tonymorony/komodo_cryptoconditions_tui/releases)

Extract the contents into the `~/komodo/src` directory.

Execute the following commands to launch the TUI software:

```bash
cd  ~/komodo/src
./rogue_tui.py
```

## Manual Walkthrough

The Komodo team provides a [Terminal User Interface (TUI)](../cryptoconditions/cc-rogue.html#installing-the-tui-optional) to allow players to launch and conclude a game without having to interact with the module's api commands.

For those who would prefer the manual process, the following walkthrough provides detailed step-by-step instructions.

#### Step 1

Open a new terminal and navigate to the `~/komodo/src` directory:

```bash
cd ~/komodo/src
```

#### Step 2

Register a new game via the [newgame](../cryptoconditions/cc-rogue.html#newgame) method. For this example, we choose to have a single player with a `0` buy-in requirement.

Methods for ROGUE require the use of the [cclib](../komodo-api/cclib.html#cclib) method. The Rogue module's required `EVALCODE` for the `cclib` method is `17`.

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib newgame 17 "[1]"
```

Response:

```JSON
{
  "name": "rogue",
  "method": "newgame",
  "maxplayers": 1,
  "buyin": 0.00000000,
  "type": "newbie",
  "hex": "0400008085202f89010061c9741f0451fcbec05ff789eef49487f4e50dcfbe05534b3f37167e9be400010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140aa48a0604d4d2eb76efd21639b26897fa3c036edd8dd4ca3d91c1f9cce294ec55071aab6187326ee1b1e80a1a3d22f72dd393fb65f009a619e8cf7fb0632a52ca100af03800111a10001ffffffff061027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc1027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc40420f0000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc1027000000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc00b8880000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc0000000000000000106a0e114700000000000000000100000000000000341d00000000000000000000000000",
  "txid": "09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70",
  "result": "success"
}
```

Broadcast the raw `hex` value using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction):

```bash
./komodo-cli -ac_name=ROGUE sendrawtransaction 0400008085202f89010061c9741f0451fcbec05ff789eef49487f4e50dcfbe05534b3f37167e9be400010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140aa48a0604d4d2eb76efd21639b26897fa3c036edd8dd4ca3d91c1f9cce294ec55071aab6187326ee1b1e80a1a3d22f72dd393fb65f009a619e8cf7fb0632a52ca100af03800111a10001ffffffff061027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc1027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc40420f0000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc1027000000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc00b8880000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc0000000000000000106a0e114700000000000000000100000000000000341d00000000000000000000000000
```

Response:

```JSON
09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70
```

The returned transaction id is the `gameplay_txid`. Save this for future use.

#### Step 3

Check the game's state using the [gameinfo](../cryptoconditions/cc-rogue.html#gameinfo) method:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'
```

Response:

```JSON
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70",
  "result": "success",
  "height": 7462,
  "start": 7462,
  "starthash": "0006b3ede92cd36bd50f7eca8bfffcb9a32254d1f24193517447752b004b582a",
  "seed": 3767108440867690538,
  "run": "./komodo-cli -ac_name=ROGUE cclib register 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'",
  "alive": 0,
  "numplayers": 0,
  "maxplayers": 1,
  "buyin": 0.00000000,
  "players": [
  ]
}
```

In the returned json object, observe the `run` value. This lists the specific command that must be executed in the terminal to register the game.

#### Step 4

Register the `gameplay_txid` using the [register](../cryptoconditions/cc-rogue.html#register) method:

```bash
./komodo-cli -ac_name=ROGUE cclib register 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'
```

Response:

```JSON
{
  "name": "rogue",
  "method": "register",
  "maxplayers": 1,
  "buyin": 0.00000000,
  "type": "newbie",
  "hex": "0400008085202f890170fe35d4e867e69634ac7bdfebe4e253446b565493c2efd4e98e67bfb902d70902000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581407c0a8458a64c5653b279bbff6f50d23474819c720330510f80294a7a6789d6a11bbb49efb610c8402b67d7323be456bd0b7e787856882cb16a58409b05e42e6aa129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff02301b0f0000000000302ea22c802039784572269885d080d1990f4eea2b3a93b285b10887d66ccc5f63e0026b0be781031210008203000401cc0000000000000000446a42115270fe35d4e867e69634ac7bdfebe4e253446b565493c2efd4e98e67bfb902d709000000000000000000000000000000000000000000000000000000000000000000000000401d00000000000000000000000000",
  "txid": "0896bf6cdabb31d90aa470ba8b85b01193bbca07b44618f8cadc0ed12d4ea749",
  "result": "success"
}
```

Broadcast the raw `hex` value using [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction):

```bash
./komodo-cli -ac_name=ROGUE sendrawtransaction 0400008085202f890170fe35d4e867e69634ac7bdfebe4e253446b565493c2efd4e98e67bfb902d70902000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581407c0a8458a64c5653b279bbff6f50d23474819c720330510f80294a7a6789d6a11bbb49efb610c8402b67d7323be456bd0b7e787856882cb16a58409b05e42e6aa129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff02301b0f0000000000302ea22c802039784572269885d080d1990f4eea2b3a93b285b10887d66ccc5f63e0026b0be781031210008203000401cc0000000000000000446a42115270fe35d4e867e69634ac7bdfebe4e253446b565493c2efd4e98e67bfb902d709000000000000000000000000000000000000000000000000000000000000000000000000401d00000000000000000000000000
```

Response:

```JSON
0896bf6cdabb31d90aa470ba8b85b01193bbca07b44618f8cadc0ed12d4ea749c
```

#### Step 5

Check the game's current state again using the [gameinfo](../cryptoconditions/cc-rogue.html#gameinfo) method. Use the `gameplay_txid` as an argument:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'
```

Response:

```JSON
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70",
  "result": "success",
  "height": 7462,
  "start": 7462,
  "starthash": "0006b3ede92cd36bd50f7eca8bfffcb9a32254d1f24193517447752b004b582a",
  "seed": 3767108440867690538,
  "run": "cc/rogue/rogue 3767108440867690538 09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70",
  "alive": 1,
  "numplayers": 1,
  "maxplayers": 1,
  "buyin": 0.00000000,
  "players": [
    {
      "slot": 0,
      "status": "alive",
      "baton": "0896bf6cdabb31d90aa470ba8b85b01193bbca07b44618f8cadc0ed12d4ea749",
      "batonaddr": "R9dCYMKsDQRCg5CLpvThRser1gbBTmkEHG",
      "batonvout": 0,
      "batonvalue": 0.00990000,
      "batonht": 7469
    }
  ]
}
```

Note that the `gameinfo` method now returned a `seed` value, as well as player data.

In the returned json object, find the `run` value. This is the exact command needed to start the game.

#### Step 6 - Play

Execute the above `run` command to start the game:

<!--The below example seems wrong, but I'm not sure?-->

```bash
cc/rogue/rogue 3767108440867690538 09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70
```

The game is now running and should be visible on-screen.

#### Step 7 - Play the Game

For instructions on in-game controls and objectives, [read this linked section.](../cryptoconditions/cc-rogue.html#gameplay-documentation)

#### Step 8 - Bailout

If your character is still alive and you would like to leave the game, follow this procedure.

This will convert your in-game gold to `ROGUE` coins at a ratio of `1:0.0005`, respectively.

Quit the game by typing `Q` on the keyboard.

Execute the [bailout]() method. For example:

```bash
./komodo-cli -ac_name=ROGUE cclib bailout 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'
```

To use this character in a future game, save the transaction id that is returned from the above command and use it when registering for a future game.

#### Step 9: Highlander Victory (Not Available in Single-Player Mode)

In this walkthrough we have used single-player mode, and therefore the following `highlander` method is not available. For explanatory purposes, we include a description here.

If you are the winner of a multi-player game, you may exit the game in a manner that allows you to claim an additional prize.

The prize is the collective value of all `ROGUE` coins that were contributed during the buy-in stage.

To obtain this prize, use the [highlander](../cryptoconditions/cc-rogue.html#highlander) method:

```bash
./komodo-cli -ac_name=ROGUE cclib highlander 17 '["4fd6f5cad0fac455e5989ca6eef111b00292845447075a802e9335879146ad5a"]'
```

To use the character in a future game, save the transaction id that is returned from the above command and use it when executing the [register](../cryptoconditions/cc-rogue.html#register) method for a future game.

## Gameplay Documentation

As Komodo's Rogue implementation is based off of the classic Rogue game, the classic manual provides the basic instructions for the game:

[Link to Classic Rogue Manual Here](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf)

After reading the linked manual, there are additional aspects to keep in mind for Komodo's unique implementation.

:::tip Quick Tip
Some users report that typing the letter `s` on the keyboard does not properly execute the `save game` command. If this is an issue, instead use `SHIFT + Q`.
:::

Komodo's Rogue features two different game modes. There is one mode for single-player gameplay, where the `maxplayer` value is set to `1`, and one mode for multiplayer gameplay, where the `maxplayer` value is greater than `1`.

#### Single-Player Mode

The single-player mode is more limited in nature. In general, this mode is for practicing or farming purposes.

There are no time limits.

The conversion of in-game gold to `ROGUE` coins is halved to a ratio of `1:0.0005`.

As soon as the `gameplay_txid` is confirmed the player may begin to play.

#### Multi-Player Mode

If more than one player is allowed in the game parameters, the game goes into "Highlander" mode. In this mode, there can be only one winner of each game. The winner is the last player standing.

Multiplayer mode also adds a time limit that is based on the frequency of keystrokes. So long as you are frequently entering commands, the time limit will expire in approximately one hour. If players are not frequently entering keystrokes, the time limit can vary.

There is a waiting period after the `gameplay_txid` is confirmed. This is an arbitrary number of blocks that is determined using blockchain-enforced randomization. This ensures that no player receives an unfair advantage via advanced knowledge of the start time.

If a player uses the `bailout` method, they are allowed to convert all their gold to `ROGUE` coins at a ratio of `1:0.001` each. The conversion is facilitated using globally locked `ROGUE` coins. The funds in this global vault automatically accrue through asset-chain activity. In the event that there are not enough globally locked funds at the time the `bailout` method is executed, the player must simply wait until the funds are generated via automated methods. You can encourage this fund to grow more quickly by encouraging other players and people to transact using ROGUE, as transactions feed the fund.

The most direct way to win the game is to obtain the `amulet` and return from the dungeon. The winner receives all of the buy-in ROGUE coins that were originally contributed, as well as `0.01` ROGUE coin for every in-game gold obtained.

With each player that survives, whether by winning or by bailing out, the player and all of his obtained items are retained on the blockchain. The character is a non-fungible asset that can be traded. The character can also be used in any future ROGUE game. To activate this character, use the character's `player_txid` value when executing the [register](../cryptoconditions/cc-rogue.html#register) method.

## newgame

**cclib newgame 17 '[maxplayers,buyin]'**

The `newgame` method creates a new game. 

The `buyin` argument is required for multi-player games. The coins contributed via `buyin` become a winner-takes-all pot. Either the first player to claim the `amulet` and return from the dungeon, or the last player standing; may claim this prize using the [highlander](../cryptoconditions/cc-rogue.html#highlander) method.

In single-player mode, the conversion ratio of in-game gold to `ROGUE` coins is `1:0.001`.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

#### Arguments:

| Name       | Type             | Description |
| ---------- | ---------------- | ----------- |
| maxplayers | (decimal number) | the max number of players; if set to `1`, the game begins in single-player mode            |
| buyin      | (number, required if `maxplayers` > `1`)        | the required amount to contribute per player; the winner receives all `buyin` coins             |

#### Response:

| Name       | Type             | Description |
| ---------- | ---------------- | ----------- |
| name       | (string)         | the name of the module            |
| method     | (string)         | the name of the method            |
| maxplayers | (decimal number) | the max number of players for this game            |
| buyin      | (number)         | the required amount to contribute per player; the winner receives all `buyin` coins           |
| type       | (string)         | the level of difficulty for this game            |
| hex        | (string)         | a `hex` value containing the relevant game data; this value must be broadcast using the `sendrawtransaction` method            |
| txid       | (string)         | a transaction id that represents the `gametxid`            |
| result     | (string)         | whether the command executed successfully            |

#### :pushpin: Examples:

Command for a single-player training game:

```bash
./komodo-cli -ac_name=ROGUE cclib newgame 17 "[1]"
```

Response:

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

## gameinfo

**cclib gameinfo 17 '["game_txid"]'**

The `gameinfo` method returns relevant information about the indicated `gametxid` game.

#### Arguments:

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| gametxid | (string) | the transaction id that was returned after broadcasting the returned hex value from the `newgame` method            |

#### Response:

| Name       | Type               | Description |
| ---------- | ------------------ | ----------- |
| name       | (string)           | name of the module            |
| method     | (string)           | name of the method            |
| gametxid   | (decimal number)   | the indicated `gametxid` transaction id            |
| result     | (string)           | whether the command executed successfully            |
| gameheight | (decimal number)   |             |
| height     | (decimal number)   |             |
| start      | (decimal number)   |             |
| starthash  | (string)           |             |
| seed       | (decimal number)   |             |
| run        | (string)           | the complete terminal command that must be executed to begin this game            |
| alive      | (decimal number)   | the number of players still alive in the game            |
| numplayers | (decimal number)   | the total number of players that joined the game            |
| maxplayers | (decimal number)   | the max number of players the game allows            |
| buyin      | (number)           | the amount of `ROGUE` coins required for a player to join            |
| players    | (array of strings) | an array containing the identifying transaction ids of each player            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026"]'
```

Response:

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

## pending

**cclib pending 17**

The `pending` method displays a list of unfinished games on the asset chain.

#### Arguments:

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response:

| Name       | Type               | Description |
| ---------- | ------------------ | ----------- |
| result     | (string)           | whether the command executed successfully            |
| name       | (string)           | the name of the module            |
| method     | (string)           | the name of the method            |
| pending    | (array of strings) | an array of `gametxid`'s that represent unfinished games on the asset chain            |
| numpending | (decimal number)   | the total number of unfinished games on the asset chain            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib pending 17
```

Response:

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

## register

**cclib register 17 '["game_txid"(,"player_txid")]'**

The `register` method registers your character for a game. 

The optional `player_txid` allows the user to re-use a character that survived a previous game.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

#### Arguments:

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| gametxid   | (string) | the `gametxid` of the game the user desires to join            |
| playertxid | (string, optional) | the `playertxid` of an existing character the user owns and would like to use            |

#### Response:

| Name       | Type               | Description |
| ---------- | ------------------ | ----------- |
| name       | (string)           | the name of the module            |
| method     | (string)           | the name of the method           |
| pending    | (array of strings) |             |
| maxplayers | (decimal number)   | the max number of players allowed in this game            |
| buyin      | (number)           | the required `buyin` amount of `ROGUE` coins to enter the game           |
| type       | (string)           | the level of difficulty for this game            |
| hex        | (string)           | a `hex` value of registration data; this must be broadcast using `sendrawtransaction`            |
| txid       | (string)           | a transaction id that indicates the `playertxid` for this character             |
| result     | (string)           | whether the command executed successfully            |

#### :pushpin: Examples:

Command (registration without player):

```bash
./komodo-cli -ac_name=ROGUE cclib register 17 '["b9ab1c3b9a1dceea75d0d87b927a03d8519743d4d64b9be061c40fdd5e4f5026"]'
```

Response:

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
## keystrokes

**cclib keystrokes 17 '["game_txid","keystrokes"]'**

The `keystrokes` method executes the indicated `keystroke` for the indicated `game_txid`.

<!-- We need to add a section that explains how the keystrokes are translated from the button push on the keyboard to the long string of characters we see in the example.-->

After a game concludes the complete list of keystrokes can be found in the `keystrokes.log` file. <!--Need the path directory -->

#### Arguments:

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| gametxid | (string) | the `gametxid` transaction id that identifies the game for which the user would like to bail out their character             |
| keystrokes | (string)         | the desired keystroke <!-- need to indicate how the keystroke is provided/formatted -->             |

#### Response:

| Name	| Type	| Description	|
| ----  | ----  | -----------   |
| (none) | | |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib keystrokes 17 '["777ba510824b467e9ddfb00a075e9cd5c6f73d1fa6f772b1a22563502def25ee","6a68686868686866686820686868682068686868206868666868686c6c6c6c6a6a6a6a6a6a6a6a6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6c6a6a6a68666b"]'
```

Response:

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

## bailout

**cclib bailout 17 '["game_txid"]'**

The `bailout` method allows a user to withdraw their character from the game. 

This method is only available when the character is still alive. The character must remain alive until the returned `bailout_txid` is mined.

When the character successfully bails out from the game, all in-game gold the character has captured is converted into `ROGUE` coins.

The conversion ratio depends upon the mode of gameplay. 

- Single-player mode: `1` gold to `0.0005` ROGUE coins
- Multi-player mode: `1` gold to `0.001` ROGUE coins

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

#### Arguments:

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| gametxid | (string) | the `gametxid` transaction id that identifies the game for which the user would like to bail out their character             |

#### Response:

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| name        | (string) | the name of the module            |
| method      | (string) | the name of the method            |
| myrogueaddr | (string) |             |
| gametxid    | (string) | the unique `gametxid` transaction id that identifies this game            |
| hex         | (string) | a hex value that must be broadcast using `sendrawtransaction`            |
| txid        | (string) | a `playertxid` transaction id that identifies this unique character; this txid can be used in the future with the `register` method to re-use the character from this game            |
| result      | (string) | whether the command executed successfully             |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib bailout 17 '["39b65c12e37f6338b2daf8b7d8d6e1b6c083622590cb7a318daadabc785b73f0"]'
```

Response:

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

## highlander

**cclib highlander 17 '["game_txid"]'**

The `highlander` method allows a character to exit the game and claim the `buyin` prize funds.

This method is only available in multi-player mode, and the user's character must either be the last standing character or the character must be in possession of the `amulet` and have successfully exited the dungeon.

#### Arguments:

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| gametxid | (string) | the `gametxid` transaction id that identifies the game for which the user would like to bail out their character             |

#### Response:

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| name        | (string) | the name of the module            |
| method      | (string) | the name of the method            |
| myrogueaddr | (string) |             |
| gametxid    | (string) | the unique `gametxid` transaction id that identifies this game            |
| txid        | (string) | a `playertxid` transaction id that identifies this unique character; this txid can be used in the future with the `register` method to re-use the character from this game            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib highlander 17 '["b94a0c14604df04a994e8fde610af7ddede76a62e1e3d86bbdac18e695662301"]'
```

Response:

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

## playerinfo

**cclib playerinfo 17 '["player_txid"]'**

The `playerinfo` method displays information about the currently active character.

#### Arguments:

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| gametxid | (string) | the `gametxid` transaction id that identifies the game for which the user would like to bail out their character             |

#### Response:

| Name         | Type               | Description |
| ------------ | ------------------ | ----------- |
| result       | (string)           | whether the command executed successfully             |
| name        | (string) | the name of the module            |
| method      | (string) | the name of the method            |
| player       | (json object)      | a json object containing relevant player data            |
| playertxid   | (string)           | the unique identifying transaction id of this player            |
| tokenid      | (string)           |             |
| data         | (string)           |             |
| pack         | (array of strings) | an array containing the items in the character's pack            |
| packsize     | (number)           | the number of items in the character's pack           |
| hitpoints    | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information            |
| strength     | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information           |
| level        | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information           |
| experience   | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information            |
| dungeonlevel | (number)           | see [this linked manual](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf) for further information            |
| chain        | (string)           | the name of the asset chain on which this game is occurring            |
| pname | (string) | the name of the user's currently active character            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib playerinfo 17 '["cf2ae0997e24f100aa9da3cda747105e3134a102da69630d6d1683a6f0f7b0ab"]'
```

Response:

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

## players

**cclib players 17**

The `players` method displays a list of all `playertxid` transaction ids held in the user's local wallet.

#### Arguments:

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response:

| Name                    | Type               | Description |
| ----------------------- | ------------------ | ----------- |
| name        | (string) | the name of the module            |
| method      | (string) | the name of the method            |
| playerdata              | (array of strings) | an array containing all `playertxid` transaction ids in the user's local wallet             |
| numplayerdata | (decimal number)   | the number of `playertxid` transaction ids in the `playerdata` array             |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib players 17
```

Response:

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

## games

**cclib games 17**

The `games` method displays a list of the user's unfinished and finished games.

#### Arguments:

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

#### Response:

| Name      | Type               | Description |
| --------- | ------------------ | ----------- |
| name        | (string) | the name of the module            |
| method      | (string) | the name of the method            |
| pastgames | (array of strings) | an array of `gametxid` transaction ids of finished games, from the user's local wallet file              |
| games     | (array of strings) | an array of `gametxid` transaction ids of unfinished games, from the user's local wallet file           |
| numgames  | (decimal number)   | the total number of games, from the user's local wallet file            |

#### :pushpin: Examples:

Command:

```bash
 ./komodo-cli -ac_name=ROGUE cclib games 17
```

Response:

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

## setname

**cclib setname 17 '["name"]'**

The `setname` method sets the name of the user's currently active character. 

<!--Does the following need to be added?

This method is available only during an active game, and only for characters that do not already have a name.

-->

#### Arguments:

| Name               | Type     | Description |
| ------------------ | -------- | ----------- |
| pname(player_name) | (string) | the desired name for the user's currently active character            |

#### Response:

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| name        | (string) | the name of the module            |
| method      | (string) | the name of the method            |
| result | (string) | whether the command executed successfully             |
| pname(player_name) | (string) | the desired name for the user's currently active character            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib setname 17 '["SuperMegaWarrior"]'
```

Response:

```json
{
  "name": "rogue",
  "method": "setname",
  "result": "success",
  "pname": "SuperMegaWarrior"
}
```

## extract

**cclib extract 17 '["game_txid","pubkey"]'**

The `extract` method allows the user extract the complete history of a game. This allows the user to view a replay of the game.

#### Arguments:

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| gametxid | (string) | the transaction id that was returned after broadcasting the returned hex value from the `newgame` method            |
| pubkey   | (string) | the `pubkey` of the player for whom the user desires to extract all relevant game data            |

#### Response:

| Name     | Type     | Description |
| -------- | -------- | ----------- |
| name       | (string)         | the name of the module            |
| method     | (string)         | the name of the method            |
| gametxid | (string) | the transaction id that was returned after broadcasting the returned hex value from the `newgame` method            |
| rogueaddr | (string) | |
| status | (string) | whether the command executed successfully |
| keystrokes | (string) | all keyboard strokes concatenated into a single string | <!-- ? -->
| numkeys | (number) | |
| playertxid | (string) | the `playertxid` transaction id that represents the character belonging to the indicated `pubkey` |
| extracted  | | |
| seed | | |
| replay        | (string)           | the complete terminal command that must be executed to begin this game            |

#### :pushpin: Examples:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib extract 17 '["6bb0efcb14cd5101a4d8d8865c6a93162aa9480c5d3e0ce33902193cebdc4c39","0325151cf0f7321d0cde232898c5adc6b60f32df71b79af3a49d10020d42925ae9"]'
```

Response:

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
