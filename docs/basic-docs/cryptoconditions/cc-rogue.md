# Contract Module: Rogue

## Introduction

The Rogue CryptoConditions (CC) contract module serves as a proof-of-concept to demonstrate CryptoCondition's capabilities as a blockchain-based gaming technology. 

Rogue CC is based on the classic [Rogue](http://www.livingroguelike.com/rl-games/the-original-rogue-information-and-how-to-play-online/) game. As such, it can be categorized as a [Roguelike.](http://www.livingroguelike.com/roguelike-info-discussions/what-is-a-roguelike/)

The core aspects of Rogue gameplay occur on the blockchain. Core aspects include such data as character health points, items, movement, attacks, and other relevant game states. This data is hashed and pushed into the protection of Bitcoin via Komodo. 

The Rogue implementation makes use of the classic on-screen visual representation of gameplay. This interface relies on ASCII characters to represent characters, items, and other in-game objects and actions.

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

```
xcode-select --install
```

Ensure the latest version of `brew` is installed. If necessary, execute the following command:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Once `brew` is installed, execute each of the following commands:

```
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

```
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

To reuse this pubkey in the future, include the pubkey as an [ac_pubkey](../installations/asset-chain-parameters.html#ac-pubkey) launch parameter.

For example:

```bash
cd ~/komodo/src
./komodod -ac_name=ROGUE -pubkey=02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2 -ac_supply=1000000 -addnode=5.9.102.210  -ac_cclib=rogue -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60001 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc -daemon
```

### Installing the TUI (Optional)

#### Linux

Open another terminal window. (Do not close or terminal processes on other terminals running the ROGUE software.)

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

#### MacOS (OSX)

Download the latest portable zip for OSX [here.](https://github.com/tonymorony/komodo_cryptoconditions_tui/releases)

Extract the contents into the `~/komodo/src` directory.

Execute the following commands to launch the TUI software:

```bash
cd  ~/komodo/src
./rogue_tui.py
```

## Manual and Walkthrough 

### Using the TUI

As Komodo's Rogue implementation is based closely off of the classic Rogue game, the manual for the classic Rogue provides sufficient instructions for TUI gameplay.

[Link to Classic Rogue Manual Here](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf)

### Manual-Gameplay Walkthrough

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
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"
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
  "run": "./komodo-cli -ac_name=ROGUE cclib register 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"",
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
./komodo-cli -ac_name=ROGUE cclib register 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"
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

Check the game's current state again using the `gameinfo` method. Use the `gameplay_txid` as an argument:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"
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

In the above returned json object, find the `run` value. This is the exact command needed to start the game.

#### Step 6 - Play

Execute the above `run` command to start the game:

```bash
cc/rogue/rogue 3767108440867690538 09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70
```

The game is now running.

#### Step 7 - Play the Game

Once the game is running, the manual s

#### Step 8 - Bailout

Once you have enough Gold and if you want to convert them into ROGUE coin, quit from the game by entering **Q** and issue a bailout like below. If your player die in-game, this will not work.

```bash
./komodo-cli -ac_name=ROGUE cclib bailout 17 \"[%2209d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70%22]\"
```

#### Useful read:

Here is the doc on how to play `rogue` game: https://github.com/jl777/komodo/blob/jl777/src/cc/rogue/rogue.doc#L388 

Here are some description on how it works: https://github.com/jl777/komodo/blob/jl777/src/cc/rogue_rpc.cpp

## Important!

This game is being developed. There are bugs present. If you find any bugs, please report them to `cc-rogue` channel in [Komodo Discord](https://komodoplatform.com/discord)

(s) for saving doesn't work,
You may enter ''SHIFT'' + ''Q'' to quit


/*
 Roguelander - using highlander competition between rogue players
 anybody can create a game by specifying maxplayers and buyin. Buyin of 0.00 ROGUE is for newbies and a good way to get experience. All players will start in the identical level, but each level after that will be unique to each player.

 There are two different modes that is based on the maxplayers. If maxplayers is one, then it is basically a practice/farming game where there are no time limits. Also, the gold -> ROGUE conversion rate is cut in half. You can start a single player game as soon as the newgame tx is confirmed.

 If maxplayers is more than one, then it goes into highlander mode. There can only be one winner. Additionally, multiplayer mode adds a timelimit of ROGUE_MAXKEYSTROKESGAP (60) blocks between keystrokes updates. That is approx. one hour and every level it does an automatic update, so as long as you are actively playing, it wont be a problem. The is ROGUE_REGISTRATION blocks waiting period before any of the players can start. The random seed for the game is based on the future blockhash so that way, nobody is able to start before the others.

 rogue is not an easy game to win, so it could be that the winner for a specific group is simply the last one standing. If you bailout of a game you cant win, but you can convert all the ingame gold you gathered at 0.001 ROGUE each. [In the event that there arent enough globally locked funds to payout the ROGUE, you will have to wait until there is. Since 10% of all economic activity creates more globally locked funds, it is just a matter of time before there will be enough funds to payout. Also, you can help speed this up by encouraging others to transact in ROGUE]

 Of course, the most direct way to win, is to get the amulet and come back out of the dungeon. The winner will get all of the buyins from all the players in addition to 0.01 ROGUE for every ingame gold.

 The above alone is enough to make the timeless classic solitaire game into a captivating multiplayer game, where real coins are at stake. However, there is an even better aspect to ROGUE! Whenever your player survives a game, even when you bailout, the entire player and his pack is preserved on the blockchain and becomes a nonfungible asset that you can trade for ROGUE.

 Additionally, instead of just being a collectors item with unique characteristics, the rogue playerdata can be used in any ROGUE game. Just specify the txid that created your character when you register and your character is restored. The better your characteristics your playerdata has, the more likely you are to win in multiplayer mode to win all the buyins. So there is definite economic value to a strong playerdata.

 You can farm characters in single player mode to earn ROGUE or to make competitive playerdata sets. You can purchase existing playerdata for collecting, or for using in battle.

 Here is how to play:

 ./komodo-cli -ac_name=ROGUE cclib newgame 17 \"[3,10]\" -> this will create a hex transaction that when broadcast with sendrawtransaction will get a gametxid onto the blockchain. This specific command was for 3 players and a buyin of 10 ROGUE. Lets assume the gametxid is 4fd6f5cad0fac455e5989ca6eef111b00292845447075a802e9335879146ad5a, most all the other commands will need the gametxid.

 you can always find all the existing games with:

  ./komodo-cli -ac_name=ROGUE cclib pending 17

 and info about a specific game with:

  ./komodo-cli -ac_name=ROGUE cclib gameinfo 17 \"[%224fd6f5cad0fac455e5989ca6eef111b00292845447075a802e9335879146ad5a%22]\"
 due to quirks of various parsing at the shell, rpc and internal level, the above convention is used where %22 is added where " should be. also all fields are separated by , without any space.

 When you do a gameinfo command it will show a "run" field and that will tell you if you are registered for the game or not. If not, the "run" field shows the register syntax you need to do, if you are registered, it will show the command line to start the rogue game that is playing the registered game.

./komodo-cli -ac_name=ROGUE cclib register 17 \"[%224fd6f5cad0fac455e5989ca6eef111b00292845447075a802e9335879146ad5a%22,%22playerdata_txid%22]\"
 If you want to cash in your ingame gold and preserve your character for another battle, do the bailout:

./komodo-cli -ac_name=ROGUE cclib bailout 17 \"[%224fd6f5cad0fac455e5989ca6eef111b00292845447075a802e9335879146ad5a%22]\"
 If you won your game before anybody else did or if you are the last one left who didnt bailout, you can claim the prize:

 ./komodo-cli -ac_name=ROGUE cclib highlander 17 \"[%224fd6f5cad0fac455e5989ca6eef111b00292845447075a802e9335879146ad5a%22]\"
 The txid you get from the bailout or highlander transactions is the "playerdata_txid" that you can use in future games.

 Transaction details
 creategame
 vout0 -> txfee highlander vout TCBOO creation
 vout1 to vout.maxplayers+1 -> 1of2 registration ROGUE_REGISTRATIONSIZE batons
 vout2+maxplayers to vout.2*maxplayers+1 -> 1of2 registration txfee batons for game completion

 register
 vin0 -> ROGUE_REGISTRATIONSIZE 1of2 registration baton from creategame
 vin1 -> optional nonfungible character vout @
 vin2 -> original creation TCBOO playerdata used
 vin3+ -> buyin
 vout0 -> keystrokes/completion baton

 keystrokes
 vin0 -> txfee 1of2 baton from registration or previous keystrokes
 opret -> user input chars

 bailout: must be within ROGUE_MAXKEYSTROKESGAP blocks of last keystrokes
 vin0 -> keystrokes baton of completed game with Q
 vout0 -> 1% ingame gold

 highlander
 vin0 -> txfee highlander vout from creategame TCBOO creation
 vin1 -> keystrokes baton of completed game, must be last to quit or first to win, only spent registration batons matter. If more than ROGUE_MAXKEYSTROKESGAP blocks since last keystrokes, it is forfeit
 vins -> rest of unspent registration utxo so all newgame vouts are spent
 vout0 -> nonfungible character with pack @
 vout1 -> 1% ingame gold and all the buyins


 then to register you need to spend one of the vouts and also provide the buyin
 once you register the gui mode is making automatic keystrokes tx with the raw chars in opreturn.
 if during the registration, you provide a character as an input, your gameplay starts with that character instead of the default

 each keystrokes tx spends a baton vout that you had in your register tx

 so from the creategame tx, you can trace the maxplayers vouts to find all the registrations and all the keystrokes to get the keyboard events

 If you quit out of the game, then the in game gold that you earned can be converted to ROGUE coins, but unless you are the last one remaining, any character you input, is permanently spent

 so you can win a multiplayer by being the last player to quit or the first one to win. In either case, you would need to spend a special highlander vout in the original creategame tx. having this as an input allows to create a tx that has the character as the nonfungible token, collect all the buyin and of course the ingame gold

 once you have a non-fungible token, ownership of it can be transferred or traded or spent in a game
 */

 ## newgame

 ## gameinfo

 ## register
