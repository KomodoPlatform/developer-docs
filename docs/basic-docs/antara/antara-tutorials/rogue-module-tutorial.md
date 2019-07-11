# Rogue Module Tutorial

The Rogue Fluidity module is a Fluidity implementation of the classic Unix game, Rogue.

This tutorial documentation is associated with the Rogue API documentation. 

[<b>Link to Rogue API documentation</b>](../basic-docs/fluidity/fluidity-api/rogue.html#rogue)

## Introduction

The Rogue Fluidity module serves as a proof-of-concept to demonstrate Fluidity's capabilities as a blockchain-based gaming technology.

The Rogue module is based on the classic [Rogue](http://www.livingroguelike.com/rl-games/the-original-rogue-information-and-how-to-play-online/) game. As such, it can be categorized as a [Roguelike.](http://www.livingroguelike.com/roguelike-info-discussions/what-is-a-roguelike/)

The core aspects of Rogue gameplay occur on the blockchain. These aspects include such data as character health points, items, movement, attacks, and other relevant game states.

Komodo's Rogue implementation makes use of the classic on-screen visual representation of gameplay. This interface relies on ASCII characters to represent characters, items, and other in-game objects and actions.

The procedures to launch and finish a game require the execution of various methods (RPCs). To make the game more easy to start and finish for players who are not comfortable with the terminal, the Komodo team has created a Terminal User Interface (TUI).

The following installation and walkthrough tutorials can assist the reader in testing Rogue. For more information, please reach out to our community on [Discord](https://komodoplatform.com/discord). The #cc-rogue channel is available for questions and assistance.

## Installation

### Requirements

Rogue is available for modern MacOS, Linux, and Windows operating systems.

### Download Software Bundles

Komodo provides downloadable software bundles that contain all necessary components. The user need only download and unzip the contents for their appropriate operating system and they are ready for gameplay.

Software bundles can be found in the link below:

[Link to software bundles](https://github.com/tonymorony/komodo_customconsensus_tui/releases)

Please feel free to ask on our #cc-rogue channel on [Discord](https://komodoplatform.com/discord) for updates and assistance.

### Compile Rogue Software Manually

The following instructions are necessary only for users/developers who wish to compile Rogue software from source code. Users who have already downloaded the software bundles linked above do not need to compile source code manually.

#### Install Dependencies

##### Linux

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl libcurl4-gnutls-dev cmake clang libsodium-dev -y
```

##### MacOS (OSX)

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

##### Windows

Playing Rogue on Windows requires an installation of MinGW, which can be downloaded here:

[Link to MinGW](http://www.mingw.org/)

Once installed, use a Debian cross-compilation setup and run the following commands in Linux:

```bash
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python python-zmq zlib1g-dev wget libcurl4-gnutls-dev bsdmainutils automake curl cmake mingw-w64
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup target add x86_64-pc-windows-gnu
```

#### Clone & Compile Komodo

##### Linux

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout FSM
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

##### MacOS

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout FSM
./zcutil/fetch-params.sh
./zcutil/build-mac.sh -j8
```

##### Windows

```bash
git clone https://github.com/jl777/komodo
cd komodo
git checkout FSM
./zcutil/fetch-params.sh
./zcutil/build-win.sh -j8
#This can take some time.
```


::: tip
Change the `8` in the `-j8` portion of the last command to any number of processor threads desired and/or appropriate for your machine.
:::

##### Update `komodod`

```bash
cd ~/komodo
git checkout FSM
git pull
./zcutil/build.sh -j$(nproc)
```

#### Launch the `ROGUE` chain and Set `pubkey` Value

##### Step 1 - Start the chain

Start the ROGUE chain with the following command in a terminal window and wait for the daemon to sync. Keep this terminal open and the daemon running for the duration of your Rogue gameplay.

```bash
cd ~/komodo/src
./komodod -ac_name=ROGUE -ac_supply=1000000 -addnode=5.9.102.210  -ac_cclib=rogue -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60001 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc -daemon
```

##### Step 2

Open a new terminal. This terminal can be used to execute all remaining installation and gameplay commands.

```bash
./komodo-cli -ac_name=ROGUE getnewaddress
```

The returned value is a ROGUE address. We need to find the associated pubkey for this address.

##### Step 3

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

##### Step 4

Set the pubkey for the ROGUE Smart Chain.

```bash
./komodo-cli -ac_name=ROGUE setpubkey 02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2
```


<collapse-text hidden title="Response">


```JSON
{
  "address": "RPCeZmqW4Aam52DFLmMraWtu5CuXPxqk92",
  "ismine": true,
  "pubkey": "02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2"
}
```

</collapse-text>


The pubkey is now set.

To reuse this pubkey in the future, include the pubkey as a [pubkey](../installations/common-runtime-parameters.html#pubkey) launch parameter.

Include the `pubkey` in the `-pubkey` launch parameter as follows:

```bash
cd ~/komodo/src
./komodod -ac_name=ROGUE -pubkey=02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2 -ac_supply=1000000 -addnode=5.9.102.210  -ac_cclib=rogue -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60001 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc -daemon
```

#### Installing the TUI (Optional)

Komodo offers an unofficial Terminal User Interface (TUI) to allow players to launch and conclude a game without having to interact with the module's API commands. The TUI software is provided for testing and ease-of-use purposes only.

Use of the TUI is optional, but recommended for most players.

The TUI software can be found in the downloadable software bundles:

[Link to downloadable software bundles](https://github.com/tonymorony/komodo_customconsensus_tui/releases)

## Walkthrough for API

Under normal circumstances, a user does not need to manually execute methods in the terminal to launch and conclude a game. Rather, the downloadable software bundles contain all necessary tools to play.

For users/developers who need a reference for the manual process, the following walkthroughs provide detailed step-by-step instructions.

- [Single-Player Mode Walkthrough](../customconsensus/rogue.html#single-player-mode-walkthrough)
- [Multi-Player Mode Walkthrough](../customconsensus/rogue.html#multi-player-mode-walkthrough)

### Single-Player Mode Walkthrough

#### Step 1

Open a new terminal and navigate to the `~/komodo/src` directory:

```bash
cd ~/komodo/src
```

#### Step 2

Create a new game via the [newgame](../customconsensus/rogue.html#newgame) method. For this example, we choose to have a single player with a `0` buy-in requirement.

Methods for ROGUE require the use of the [cclib](../komodo-api/cclib.html#cclib) method. The Rogue module's required `EVALCODE` for the `cclib` method is `17`.

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib newgame 17 "[1]"
```


<collapse-text hidden title="Response">


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

</collapse-text>


The ROGUE software currently broadcasts the `hex` value automatically. It is not necessary to use the `sendrawtransaction` method.

The returned transaction id `txid` is the `gametxid`. Save this for future use.

#### Step 3

Check the game's state using the [gameinfo](../customconsensus/rogue.html#gameinfo) method:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'
```


<collapse-text hidden title="Response">


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

</collapse-text>


In the returned json object, observe the `run` value. This lists the specific command that must be executed in the terminal to register the game.

#### Step 4

Register the `gametxid` using the [register](../customconsensus/rogue.html#register) method:

```bash
./komodo-cli -ac_name=ROGUE cclib register 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'
```


<collapse-text hidden title="Response">


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

</collapse-text>



#### Step 5

Check the game's current state again using the [gameinfo](../customconsensus/rogue.html#gameinfo) method. Use the `gametxid` as an argument:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'
```


<collapse-text hidden title="Response">


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

</collapse-text>


Note that the `gameinfo` method now returned a `seed` value, as well as player data.

In the returned json object, find the `run` value. This is the exact command needed to start the game.

#### Step 6 - Play

Wait until the network mines the `register_txid`. Optionally, use the [getrawmempool](../komodo-api/blockchain.html#getrawmempool) method to monitor the status of the transaction.

Once the transaction is mined, execute the `run` command (found in the returned json object earlier) to start the game:

```bash
cc/rogue/rogue 3767108440867690538 09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70
```

The game is now running and should be visible on-screen.

#### Step 7 - Play the Game

For instructions on in-game controls and objectives, [read this linked section.](../customconsensus/rogue.html#gameplay-documentation)

#### Step 8 - Bailout

If your character is still alive and you would like to leave the game while keeping your profits, follow this procedure to save your character:

To quit the game, type the letter `Q` on the keyboard. This opens a context menu. Type the letter `n` and press `Enter`.

This begins the process of leaving the game, but you are not finished yet.

Wait for the ROGUE network to mine all [`keystrokes`](../customconsensus/rogue.html#keystrokes) transactions. To see a list of all `keystrokes` created, check the `keystrokes.log` file in the `~/komodo/src` directory, and use the [getrawmempool](../komodo-api/blockchain.html#getrawmempool) method to verify when the last `keystrokes` are mined.

When the last transactions are mined, execute the [bailout](../customconsensus/rogue.html#bailout) method to leave the game while keeping the character and items in your `pubkey`, and the method will also transfer your in-game gold to `ROGUE` coins.

For example:

```bash
./komodo-cli -ac_name=ROGUE cclib bailout 17 '["09d702b9bf678ee9d4efc29354566b4453e2e4ebdf7bac3496e667e8d435fe70"]'
```

After the `bailout` transaction is mined the player may view their surviving character(s) via the [players](../customconsensus/rogue.html#players) and [playerinfo](../customconsensus/rogue.html#playerinfo) methods.

#### Step 9: Highlander Victory 

In this walkthrough we have used single-player mode. The following [highlander](../customconsensus/rogue.html#highlander) method is only available if the character manages to capture the `amulet` and safely exit the dungeon. In a normal multi-player game, the `highlander` method is available to either the first player to safely retrieve the `amulet`, or to the last player standing after all others have died.

The player that successfully executes the `highlander` method receives a prize: the collective value of all `ROGUE` coins that were contributed during the buy-in stage.

The `highlander` method is executed as follows:

```bash
./komodo-cli -ac_name=ROGUE cclib highlander 17 '["4fd6f5cad0fac455e5989ca6eef111b00292845447075a802e9335879146ad5a"]'
```

After the `highlander` transaction is mined the player may view their surviving character(s) via the [players](../customconsensus/rogue.html#players) and [playerinfo](../customconsensus/rogue.html#playerinfo) methods.

### Multi-Player Mode Walkthrough

In this walktrough we use two nodes to play a multi-player game of Rogue.

- Node 1 is `player1`
- Node 2 is `player2`

For educational purposes, we execute all methods manually, as opposed to using the [TUI](../customconsensus/rogue.html#installing-the-tui-optional).

#### Step 1: Create a Multi-Player Game

Open a new terminal and navigate to the `~/komodo/src` directory:

```bash
cd ~/komodo/src
```

For this game, we choose the following details:

- the max number of players: `2`
- the cost in `ROGUE` coins of the game `buyin`: `0.1`

Execute the [newgame](../customconsensus/rogue.html#newgame) method on `player1` as follows:

```bash
./komodo-cli -ac_name=ROGUE cclib newgame 17 '["2","0.1"]'
```


<collapse-text hidden title="Response">


```JSON
{
  "name": "rogue",
  "method": "newgame",
  "maxplayers": 2,
  "buyin": 0.10000000,
  "type": "buyin",
  "hex": "0400008085202f89010806e5efe696da16723dc894c191db31a78184a6d1e2f49d1be11baf5a711d15010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140166b7641979bb086181d30a5e0c9a84591dc8a3455f77858735fc75aa087b7dd4d0745fac898e547a069b5e75273bf0b28c29466b7f41c5800cb888bfff96f52a100af03800111a10001ffffffff081027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc40420f0000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc40420f0000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc1027000000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401cc1027000000000000302ea22c80208958791fdd38bdf532c97f1691fd231a3f1f5c0c3cd28b68d7383c8b1078828e81031210008203000401ccb04e790000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc10270000000000002321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85ac0000000000000000106a0e1147809698000000000002000000000000000dd400000000000000000000000000",
  "txid": "4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
  "result": "success"
}
```

</collapse-text>


Save the returned `txid` value for future use. This is our `gametxid`.

Use the [gameinfo](../customconsensus/rogue.html#gameinfo) method to check information about the game:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde"]'
```


<collapse-text hidden title="Response">


```JSON
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
  "result": "success",
  "gameheight": 54265,
  "height": 54265,
  "start": 54270,
  "alive": 0,
  "openslots": 2,
  "numplayers": 0,
  "maxplayers": 2,
  "buyin": 0.10000000,
  "seed": 0,
  "players": [
  ]
}
```

</collapse-text>


As shown in the returned json object, the game has a `maxplayers` value of `2` and an `openslots` value of `0`, as no players have joined.

Note that the `gameheight` value is `54265`. This is the block height at which the `gametxid` was created. 

Also note that the `start` value is `54270`. This is the block height at which the `seed` value will be revealed, allowing players to generate the level design and begin the game. 

#### Step 2: Register for the Game

For our example, `player1` would like to use an existing character that survived a previous game. This allows `player1` to start with all the advantages this character achieved previously, including character statistics and items.

To activate the existing character, `player1` includes the associated `playertxid` for the character when executing the [register](../customconsensus/rogue.html#register) method. (The `playertxid` values of any `pubkey` can be found using the [players](../customconsensus/rogue.html#players) method.)

The player also includes the `gametxid` as the first argument of the `register` method.

```bash
./komodo-cli -ac_name=ROGUE cclib register 17 '["4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde","8005f81a604df6bbfae91dc8252505df43edbdf06492a2201362cb42dba4d8f2"]'
```


<collapse-text hidden title="Response">


```JSON
{
  "name": "rogue",
  "method": "register",
  "maxplayers": 2,
  "buyin": 0.10000000,
  "type": "buyin",
  "hex": "0400008085202f8903deab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4c01000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140d68dba89573f717140a84471f1056bc783996ed45b39218425eb0b9dd2f51f2563c8779e21ed4aa62defee170920cd760a5f80dc7a184414a12dec27d6e39990a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001fffffffff2d8a4db42cb621320a29264f0bded43df052525c81de9fabbf64d601af8058001000000804c7ea27ba077a26ba067a5658021027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e858140ba62fa04393766f2a39bc23c1cded3ac8fa940e2f47747b03376ecf467f2307737812e2927cbbd9787f8632979d5f7575e5f603d0dbaafc8905605b836014b0da100af03800111af038001f2a10001ffffffff0d45d807c5f96bbf021e7186e5632c4ff37cda13f4fbc0861e76d32ae078985a000000004847304402206a20289df3b06cec3154ab48d4a3cb62eb7c27ddbaacd24938307a3a003bb8cf02207f658d0c442b81ced5b44031c76d548185fa33f810fa1a3209d5181e2e46e16a01ffffffff04b0b1a70000000000302ea22c80202ba0b269f75c72a0ce23e03812814b1e76a8fd57b3e75fee8b37bfef2b4ebf3581031210008203000401cc0100000000000000302ea22c80207f0205ad6b02be91baf2a56dcc77381e7b0e19cb9a83dfb9530316958f5b706781032210008203000401cc804a5d05000000002321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85ac00000000000000008c6a4c89f2748005f81a604df6bbfae91dc8252505df43edbdf06492a2201362cb42dba4d8f2012102deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddead16421152deab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4cf2d8a4db42cb621320a29264f0bded43df052525c81de9fabbf64d601af805800000000014d400000000000000000000000000",
  "txid": "20b5cf8249dda9e532d93d63e0b7fc3e28b15fdc606dbf04e06b3afd2cbb023d",
  "result": "success"
}
```

</collapse-text>


In our example, the `player2` node does not have a character from a previous game, and therefore `player2` executes the `register` method with only the `gametxid`.

```bash
./komodo-cli -ac_name=ROGUE cclib register 17 '["4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde"]'
```


<collapse-text hidden title="Response">


```JSON
{
  "name": "rogue",
  "method": "register",
  "maxplayers": 2,
  "buyin": 0.10000000,
  "type": "buyin",
  "hex": "0400008085202f8902deab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4c02000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140d6ba58b1f908127a08975c2b894908a5394e17752f3f4fc42f62a84854a6a34e7d36b9b0f5a9e8331b0b763fccd9c751c9768f494a160ba0c173253c598d3459a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff0d47edc39292bc46274460312302e9f5fbc7ff8e9e03dfc26fde0c9137030661000000004847304402204b8bb25641221d02db0af6319044c7249fe6e1e3aacf3430f296444bd00780a7022046a53d377dd1746b32ad38482fc3d88aa485fad2e1a7da634d46a753000b3bc601ffffffff04b0b1a70000000000302ea22c8020dab28a48d54ca8ae474d7ff8fefa29aa38739f873f9a2488d5260e481c4d924381031210008203000401cc0100000000000000302ea22c80207f0205ad6b02be91baf2a56dcc77381e7b0e19cb9a83dfb9530316958f5b706781032210008203000401cc7f4a5d05000000002321030c16387fda9c2c3e1b90b272a938424f9eecf16e859887874fb843892c3572abac0000000000000000446a421152deab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4c00000000000000000000000000000000000000000000000000000000000000000000000017d400000000000000000000000000",
  "txid": "8c595f0fd053d140bb1449b962ffb31fc983c7de9e19c44fd4b1c3e908d99efa",
  "result": "success"
}
```

</collapse-text>


Wait until the `txid` values returned on both nodes are mined. (Use the [getrawmempool](../komodo-api/blockchain.html#getrawmempool) method to check the transaction's status.)

After the transactions are mined, use the [gameinfo](../customconsensus/rogue.html#gameinfo) method to check the game's status again:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde"]'
```


<collapse-text hidden title="Response">


```JSON
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
  "result": "success",
  "gameheight": 54265,
  "height": 54265,
  "start": 54270,
  "starthash": "0009fb977f5d34ff8fbaf5393e17ecc6c590d9f6db120c69b684959922b31fbd",
  "seed": 3928429259918614461,
  "run": "cc/rogue/rogue 3928429259918614461 4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
  "alive": 2,
  "openslots": 0,
  "numplayers": 2,
  "maxplayers": 2,
  "buyin": 0.10000000,
  "seed": 3928429259918614461,
  "players": [
    {
      "slot": 0,
      "status": "registered",
      "baton": "20b5cf8249dda9e532d93d63e0b7fc3e28b15fdc606dbf04e06b3afd2cbb023d",
      "tokenid": "8005f81a604df6bbfae91dc8252505df43edbdf06492a2201362cb42dba4d8f2",
      "batonaddr": "RVuzXY65FyJiPPWSBc9efATh6nb4M9MceR",
      "ismine": false,
      "batonvout": 0,
      "batonvalue": 0.10990000,
      "batonht": 54273,
      "player": {
        "gametxid": "4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
        "batontxid": "20b5cf8249dda9e532d93d63e0b7fc3e28b15fdc606dbf04e06b3afd2cbb023d",
        "playertxid": "8005f81a604df6bbfae91dc8252505df43edbdf06492a2201362cb42dba4d8f2",
        "tokenid": "8005f81a604df6bbfae91dc8252505df43edbdf06492a2201362cb42dba4d8f2",
        "data": "250000000e00000010001000020000000b0000000700000002000000000000003a0000000000000001000000000000000000000000000000000000001000000000000000000000000000000000000000000000005d00000000000000010000000100000000000000000000000600000012000000000000000000000000000000000000000000000029000000ffffffff010000000000000001000000010000000000000012000000000000003278340000000000317833000000000029000000ffffffff010000000200000001000000000000000000000012000000000000003178310000000000317831000000000029000000020000001f000000030000000000000000000000000000001e00000000000000317831000000000032783300000000002f0000000000000001000000080000000000000000000000060000001000000000000000317831000000000031783100000000003d00000000000000010000000200000000000000000000000b000000100000000000000030783000000000003078300000000000",
        "pack": [
          "Some food",
          "+1 ring mail [protection 4]",
          "A +1,+1 mace",
          "A +1,+0 short bow",
          "31 +0,+0 arrows",
          "A staff of slow monster [6 charges](kukui wood)",
          "A ring of sustain strength(obsidian)"
        ],
        "packsize": 7,
        "hitpoints": 14,
        "strength": 16,
        "maxstrength": 16,
        "level": 2,
        "experience": 11,
        "dungeonlevel": 2,
        "chain": "ROGUE",
        "pname": "tester02"
      }
    },
    {
      "slot": 1,
      "status": "registered",
      "baton": "8c595f0fd053d140bb1449b962ffb31fc983c7de9e19c44fd4b1c3e908d99efa",
      "tokenid": "0000000000000000000000000000000000000000000000000000000000000000",
      "batonaddr": "RMYAWp4qQ2RQRAeBHeW3GdD79GjGHkNwE6",
      "ismine": true,
      "batonvout": 0,
      "batonvalue": 0.10990000,
      "batonht": 54276
    }
  ]
}
```

</collapse-text>


The `openslots` value is now `0`, as `2` players have joined. 

Note also that the `start` block height has past, and therefore the `seed` value is available.

Also note that the response includes information about the `playertxid` character provided by `player1` during registration.

The game is prepared. Both players may begin the game using the command found in the returned `run` value. 

```bash
cc/rogue/rogue 3928429259918614461 4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde
```

#### Step 3: Play and Finish the Game

[View this linked section for instructions on gameplay.](../customconsensus/rogue.html#gameplay-documentation)

In our example, `player1` decides to bail out of the game without waiting until `player2` dies, and without retrieving the `amulet` from the dungeon. 

To exit, `player1` executes the [bailout](../customconsensus/rogue.html#bailout) method:

```bash
./komodo-cli -ac_name=ROGUE cclib bailout 17 '["4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde"]'
```


<collapse-text hidden title="Response">


```json
{
  "name": "rogue",
  "method": "bailout",
  "myrogueaddr": "RVuzXY65FyJiPPWSBc9efATh6nb4M9MceR",
  "gametxid": "4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
  "hex": "0400008085202f8903bafcee9bbe5536b0a5dc2bdff72f34ceedc4f6dae07cdf9eef973339a095845900000000a74ca5a281a1a0819ca28194a067a5658021027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e858140542c935c9812a93c4b304123f86f3b71b5a2236edbc7d080dbf9fec1ddd683397935d5990eb2617e304be1560740ff80fdc3d7524c68adfc70cf57e2376b3666a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffffdeab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4c03000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581403f6df06683f5788ee5ea9113af44d0d76753e619be4b1ead6a56c9fbabaa5c1e25a26f2c6097398c1f3eb98578eff8c05315d9f49a30f1006b6d8dc72a7d45c2a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffff04e14b45dfd8f96da57b4cd7207b8349085a9c58e617f559b6a633dc751a83d3010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581400d139c3302c33098fca9d25e3072ab9ccedb07bb82f79e8f97d35078183cf69c230d64ce52c4f9ba5c1f8f26affeb8ff4646a77240cc38f2af7d24be627c6fb8a100af03800111a10001ffffffff061027000000000000302ea22c8020432de388aabcb6b4e3326351d1d815cee8be9a8d37b055cd1c0cf8782e5c50c08103120c008203000401cc0100000000000000302ea22c8020f29dbf12dea61586c1c7a8c6fe99eaa82a32298686bac7d0f698e91e896f48d481032210008203000401cca04b0000000000002321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85ac50603f0100000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc1f4e0000000000002321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85ac0000000000000000fdcf026a4dcb02f26321027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e851333393238343239323539393138363134343631403463636639636138623131393862333562343864633731323663366239363438623234336334343037366534633465346665343734623132393032386162646511fd4e021151deab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4c05524f4755450874657374657230320000000021027d28d7d59ac499fac55f89b9e06933d66aaf74435c48326d83f8fbc6a7b14e85fdf4012c0000000e0000001000100002000000110000000900000001000000000000003a0000000000000001000000000000000000000000000000000000001200000000000000000000000000000000000000000000005d0000000000000001000000010000000000000000000000060000001200000000000000000000000000000000000000000000005d00000000000000010000000000000000000000000000000800000010000000000000003078300000000000307830000000000029000000ffffffff010000000000000001000000010000000000000012000000000000003278340000000000317833000000000029000000ffffffff010000000200000001000000000000000000000012000000000000003178310000000000317831000000000029000000020000001f000000030000000000000000000000000000001e00000000000000317831000000000032783300000000002f0000000000000001000000080000000000000000000000060000001200000000000000317831000000000031783100000000003d00000000000000010000000200000000000000000000000b0000001200000000000000307830000000000030783000000000003f00000000000000010000000800000000000000000000000b000000100000000000000030783000000000003078300000000000000000002dd400000000000000000000000000",
  "txid": "5184b9d50cb70eb3b2f92e53e66ff90777a650e9167f8a133eb13a2da2ae999c",
  "result": "success"
}
```

</collapse-text>


With the `bailout` transaction mined, the `gameinfo` method now returns updated information:

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib gameinfo 17 '["4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde"]'
```


<collapse-text hidden title="Response">


```JSON
{
  "name": "rogue",
  "method": "gameinfo",
  "gametxid": "4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
  "result": "success",
  "gameheight": 54265,
  "height": 54265,
  "start": 54270,
  "starthash": "0009fb977f5d34ff8fbaf5393e17ecc6c590d9f6db120c69b684959922b31fbd",
  "seed": 3928429259918614461,
  "run": "cc/rogue/rogue 3928429259918614461 4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
  "alive": 1,
  "openslots": 0,
  "numplayers": 2,
  "maxplayers": 2,
  "buyin": 0.10000000,
  "seed": 3928429259918614461,
  "players": [
    {
      "slot": 0,
      "status": "finished",
      "baton": "5184b9d50cb70eb3b2f92e53e66ff90777a650e9167f8a133eb13a2da2ae999c",
      "tokenid": "0000000000000000000000000000000000000000000000000000000000000000",
      "batonaddr": "RVuzXY65FyJiPPWSBc9efATh6nb4M9MceR",
      "ismine": true,
      "batonvout": 0,
      "batonvalue": 0.00010000,
      "batonht": 54297,

    ... (omitted for brevity) ...

```

</collapse-text>


Note that the `alive` property has a value of `1`, indicating that the `player1` character has left and the `player2` character remains. Also note that in the `players` array, the first json object (which describes the `player1` node) has a `status` of `finished`.

Since `player1` left early, `player2` is the last character standing. The [highlander](../customconsensus/rogue.html#highlander) method is now available to him.

`player2` first begins the exit procedure by entering `Q`, then `y + Enter`.

With the exit process in motion, `player2` executes the `highlander` method:

```bash 
./komodo-cli -ac_name=ROGUE cclib highlander 17 '["4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde"]'
```


<collapse-text hidden title="Response">


```json
{
  "name": "rogue",
  "method": "highlander",
  "myrogueaddr": "RMYAWp4qQ2RQRAeBHeW3GdD79GjGHkNwE6",
  "gametxid": "4ccf9ca8b1198b35b48dc7126c6b9648b243c44076e4c4e4fe474b129028abde",
  "hex": "0400008085202f8906fb01b5159bd9eb16c969a274573312a870eaec6ca921d45cfea828cf4bfdce7400000000a74ca5a281a1a0819ca28194a067a5658021030c16387fda9c2c3e1b90b272a938424f9eecf16e859887874fb843892c3572ab814040b427395fa60eec5d645994bdf49f56479913f76af9a0143a1cedba51bdf40604db488e5f16c22738d007832cce6f5694e0b72a59934af01283241eabfb04f4a129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffffdeab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4c04000000a74ca5a281a1a0819ca28194a067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581401b629f9b61eef6513f07b351a2a3c3ece554204fc355bc5d22cb2df7fa86355908e4d443783f998fdaa98818078a9644f8147391e2b96f53aa025619deab057ba129a5278020446b52761bffb00eaa7a055c9994987ce2120a551fb4dfd01ffae1ffbee6b56b8103020000af03800111a10001ffffffffdeab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4c000000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa88305814077ca033d18a0125a269abdacb825d399f950e564eb9ad38f53eadd30213d158349952d30e109b7bfd5f47165e3e05b849c919f028bf447813a006fb76cf8fafba100af03800111a10001ffffffff09d702382f7d9bb899b5c935ec85f17da65df496c0898d5466e852235a99a529010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140f9885eba23b5f7ce803cd6256afdfda72cdac6e3112c448c9752e378310b4f8e66f18a1a9309d9c848680c0e1656cabb63857426a5e34c831ee7ba8883478d23a100af03800111a10001ffffffff0b295c8f2da505fd2fd76a23e742976855de3476381ea54ea2f4741398f9c8e5010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa8830581402adefb3329c07c992aa0e5217ec129bbbdea0b60a9ef4dd65a8788833f764012673e9888b28a6cd61e438c95703c93becd0344d59e8b4af0800289b8539e104ca100af03800111a10001ffffffff0b473035d1618096e7856167a47a80e440b05884c2a6f9cc51545ea9bf22477b010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140586da282bd1f1038c2f34f9bf93543cb0bc315d37d3572d262a6b7d9133533920fdb65118b702435bdbb62e41c4d873e79cc9ce6786ea74686f5c49413358c36a100af03800111a10001ffffffff061027000000000000302ea22c8020432de388aabcb6b4e3326351d1d815cee8be9a8d37b055cd1c0cf8782e5c50c08103120c008203000401cc0100000000000000302ea22c8020b3004eceb8c0082eae35418495dc48c6785dc23d0176e82514c90a41d93198ea81032210008203000401cc343a3101000000002321030c16387fda9c2c3e1b90b272a938424f9eecf16e859887874fb843892c3572abacbc9e3f0100000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc2f750000000000002321030c16387fda9c2c3e1b90b272a938424f9eecf16e859887874fb843892c3572abac0000000000000000fd2b026a4d2702f26321030c16387fda9c2c3e1b90b272a938424f9eecf16e859887874fb843892c3572ab1333393238343239323539393138363134343631403463636639636138623131393862333562343864633731323663366239363438623234336334343037366534633465346665343734623132393032386162646511fdaa011148deab2890124b47fee4c4e47640c443b248966b6c12c78db4358b19b1a89ccf4c05524f475545000100000021030c16387fda9c2c3e1b90b272a938424f9eecf16e859887874fb843892c3572abfd58010d0000000c0000001000100001000000020000000600000001000000000000003a0000000000000001000000000000000000000000000000000000001000000000000000000000000000000000000000000000005d00000000000000010000000100000000000000000000000600000012000000000000000000000000000000000000000000000029000000ffffffff010000000000000001000000010000000000000012000000000000003278340000000000317833000000000029000000ffffffff0100000002000000010000000000000000000000120000000000000031783100000000003178310000000000290000000200000022000000030000000000000000000000000000001e00000000000000317831000000000032783300000000003f00000000000000010000000800000000000000000000000b0000001000000000000000307830000000000030783000000000000000000030d400000000000000000000000000",
  "txid": "fc86d6b5f5d3ab98de97d50fbd3853c726197d28a9436aeba66e70dadd541065",
  "result": "success"
}
```

</collapse-text>


The multi-player game is now finished. The `player2` node received the `highlander` prize, including the total `buyin` amount and an increased conversion rate of in-game gold to `ROGUE` coins.

After the `bailout` and `highlander` transactions are mined, the players may view their surviving character via the [players](../customconsensus/rogue.html#players) and [playerinfo](../customconsensus/rogue.html#playerinfo) methods.


## Gameplay Documentation

As Komodo's Rogue implementation is based off of the classic Rogue game, the classic manual provides the basic instructions for the game:

[Link to Classic Rogue Manual Here](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf)

After reading the linked manual, there are additional aspects to keep in mind for Komodo's unique implementation.

### Gameplay Modes

Komodo's Rogue features two different game modes. There is one mode for single-player gameplay, where the `maxplayer` value is set to `1`, and one mode for multi-player gameplay, where the `maxplayer` value is greater than `1`.

#### Single-Player Mode

The single-player mode is more limited in nature. In general, this mode is for practicing or farming purposes.

There are no time limits.

As soon as the `register_txid` is confirmed the player may begin to play.

When concluding the game, the conversion of in-game gold to `ROGUE` coins is halved. See the [highlander](../customconsensus/rogue.html#highlander) and [bailout](../customconsensus/rogue.html#bailout) methods for further details.

#### Multi-Player Mode

If more than one player is allowed in the game parameters, the game goes into "Highlander" mode. In this mode, there can be only one winner of each game. The winner is either the last player standing, or the first player to retrieve the `amulet` and successfully exit the dungeon.

Multi-player mode also adds a time limit that is based on the frequency of keystrokes. So long as the players are frequently entering commands, the time limit will expire in approximately one hour. If players are not frequently entering keystrokes, the time limit can vary.

There is a waiting period after the `gametxid` is confirmed. This ensures that no player receives an unfair advantage via advanced knowledge of the start time. The delay is `5` blocks. On a default Smart Chain, this creates a `5` minute wait period. Once the `5` blocks are mined, the Smart Chain automatically reveals a `seed` that is created using blockchain-based provable randomization. The `seed` provides the basis for level-design generation. After the level is generated, the players may begin to play. 

Due to the fact that the entropy (based on the `seed`) was the same for both players during level generation, both players will begin at dungeon-level `1`. However, the generation of levels greater than `1` take into account the gameplay of the characters, and therefore the level designs will be different for each player.

There are two methods for winning the game. The most direct way to win the game is to obtain the `amulet` and return from the dungeon. Alternatively, the player also may win by having the last surviving character. The winner receives all of the `buyin` coins that were originally contributed, as well as an increased conversion ratio for their in-game gold to `ROGUE` reward.

See the [highlander](../customconsensus/rogue.html#highlander) method for further details.

### The Mechanics of Saving, Trading, and Reusing Characters

::: tip Note

Due to the nature of saving and reusing characters, the Komodo implementation of Rogue changes the manner in which the user saves characters. Instead of typing `s` on the keyboard, type `Q + y + Enter`, then execute the [bailout](../customconsensus/rogue.html#bailout) method to conclude the game.

:::

If a player successfully uses either the [highlander](../customconsensus/rogue.html#highlander) or [bailout](../customconsensus/rogue.html#bailout) method to conclude a game, the player may save their character, items, and achieved characteristics. They also convert the character's in-game gold to `ROGUE` coins. The ratio of conversion depends upon the game conditions; see the `highlander` and `bailout` methods for further details.

#### Recalling an Existing Character

When either of these methods are executed, the returned response includes a `playertxid` transaction id. The `playertxid` represents the state of this character at the completion of the game. It is used as an argument for the [register](../customconsensus/rogue.html#register) method when recalling the character, items, and achieved characteristics into a future game. 

The `playertxid` value changes with each game, and therefore only the most recent `playertxid` for a character should be used. To see a complete list of current `playertxid` values belonging to the user's `pubkey`, use the [playerinfo](../customconsensus/rogue.html#playerinfo) method. 

When the user registers an existing character, the game dungeon's difficulty begins at level `1`, and the character has no gold (as it was converted to `ROGUE` coins). Also, even if the character has armor and a wielded weapon in their item list, these items are not equipped by default. The player must equip them at the start of the game by typing the letters `w` for weapon and `W` for armor.

One gameplay element that the Komodo team has changed from classic Rogue is the ability to scale the amount of inventory the character may carry according to the character's strength. The formula is as follows:

```
current max inventory = character strength * 2
```

The highest `max inventory` value is `23` unique letters. Throwable-object packages count as a single item.

If the user bails out of a game while holding more items than they are allowed to carry, the game will automatically flush items from the character's inventory as a part of the `bailout` method.

#### Trading an Existing Character

A character that survived a game is also a non-fungible asset and can be traded on the blockchain. When trading a character, the user does not use the `playertxid` value. Rather, the user employs the `tokentxid` value. This `tokentxid` is used in coordination with the [Tokens CC](../customconsensus/tokens.html#introduction) module for on-chain trading.

The `tokentxid` can be found by using the [playerinfo](../customconsensus/rogue.html#playerinfo) method and submitting the known `playertxid` as an argument. For more information, see the `playerinfo` method.

The `tokentxid` is created at the character's initial creation and does not change throughout the character's life. When the character dies, the `tokentxid` is sent to a burn address, making the character permanently unplayable. 

