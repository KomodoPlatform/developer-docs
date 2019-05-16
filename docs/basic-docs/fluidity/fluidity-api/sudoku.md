# Sudoku

## Introduction

The Sudoku Custom Consensus (CC) module serves as a proof-of-concept to demonstrate CC's capabilities as a blockchain-based gaming technology.

Sudoku CC is based on the classic game, Sudoku. To learn more about how Sudoku is played, read the associated Wikipedia article:

[Link to Sudoku Wikipedia article](https://en.wikipedia.org/wiki/Sudoku)

The procedures to launch and finish a game require the execution of various methods (rpcs). By design, the Sudoku CC module assumes the user relies on the associated Sudoku GUI software. The GUI is required because the  UNIX timestamp for each gameplay event must  pass trough the Sudoku CC RPC captcha protection, as this deters bots.

The following installation and walkthrough tutorials can assist the reader in setting up and playing the Sudoku game. For more information, please reach out to our community on [Discord](https://komodoplatform.com/discord). The #cc-sudoku channel is available for questions and assistance.

#### Sudoku CC Module Flow

- Create a puzzle using the [gen](../customconsensus/sudoku.html#gen) method
  - commit the amount of `SUDOKU` coins that will serve as a bounty for the first node to complete this puzzle
- Find a puzzle to solve using the [pending](../customconsensus/sudoku.html#pending) method
- Gather additional information about any puzzle using the [txidinfo](../customconsensus/sudoku.html#txidinfo) method
- Propose a solution for a puzzle using the [solution](../customconsensus/sudoku.html#solution) method

## Installation

### Requirements

Sudoku is currently playable on Linux machines.

OSX and Windows compatible bundles will be ready as soon as possible. Please ask on our #cc-sudoku channel on [Discord](https://komodoplatform.com/discord) for updates.

The Komodo Sudoku software bundle (also called "Komodoku") for Ubunutu Linux comes complete with all necessary software. To download the bundle, please visit the link below:

[Link to "Komodoku" Software Bundle](https://github.com/tonymorony/Komodoku/releases)

To manually compile the software, follow the instructions below. 

### Install Dependencies

#### Linux

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl libcurl4-gnutls-dev cmake clang libsodium-dev -y
```
<!--

#### macOS (OSX)

Use the terminal to ensure the MacOS XCode tools are installed:

```bash
xcode-select ####Remote later, this line is causing formatting issues ##-#-#install
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

-->

### Clone & Compile Komodo

#### Linux

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout FSM
make clean
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
```

Wait for the build process to finish, and then continue with the following commands:

```bash
cd src/cc
./makecclib
cp sudokucc.so ../libcc.so
cd ../..
make -j$(nproc)
```
<!--

#### MacOS

```bash
cd ~
git clone https://github.com/jl777/komodo
cd komodo
git checkout FSM
./zcutil/fetch-params.sh
./zcutil/build-mac.sh -j8
```

::: tip
Change the `8` in the `-j8` portion of the last command to any number of processor threads desired and/or appropriate for your machine.
:::

-->

### Update `komodod`

```bash
cd ~/komodo
git checkout FSM
git pull
make clean
./zcutil/build.sh -j$(nproc)
```

Wait for the build process to finish, and then continue with the following commands:

```bash
cd src/cc
./makecclib
cd ../..
make -j$(nproc)
```

### Set `pubkey` value

Ensure the working directory is correct:

```bash
cd ~/komodo/src
```

#### Step 1 - Start the chain

Start the SUDOKU chain with the following command in a terminal window and wait for the daemon to sync. Keep this terminal open and the daemon running for the duration of your Sudoku gameplay.

```bash
./komodod -ac_name=SUDOKU -ac_supply=1000000 -addnode=5.9.102.210 -gen -genproclimit=1 -ac_cclib=sudoku -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60000 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc &
```

#### Step 2

Open a new terminal. This terminal can be used to execute all remaining installation and gameplay commands.

```bash
./komodo-cli -ac_name=SUDOKU getnewaddress
```

The returned value is a SUDOKU address. We need to find the associated pubkey for this address.

#### Step 3

Use the `validateaddress` method with the address.

```bash
./komodo-cli -ac_name=SUDOKU validateaddress insert_address_here
```

The `validateaddress` method will return information similar to the following:

```json
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

Set the pubkey for the SUDOKU asset chain.

```bash
./komodo-cli -ac_name=SUDOKU setpubkey 02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2
```


<collapse-text hidden title="Response">


```json
{
  "address": "RPCeZmqW4Aam52DFLmMraWtu5CuXPxqk92",
  "ismine": true,
  "pubkey": "02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2"
}
```

</collapse-text>


The pubkey is now set.

To reuse this pubkey in the future, include the pubkey as a [pubkey](../installations/common-runtime-parameters.html#pubkey) launch parameter.

For example:

```bash
./komodod -ac_name=SUDOKU -ac_supply=1000000 -pubkey=02f183a71e93dfa7672ce7212187e45eabcf4077fed575348504b20295751ab1a2 -addnode=5.9.102.210 -gen -genproclimit=1 -ac_cclib=sudoku -ac_perc=10000000 -ac_reward=100000000 -ac_cc=60000 -ac_script=2ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc &
```

### Install Sudoku Graphical User Interface (GUI)

The Komodo team offers an unofficial graphical user interface (GUI) to assist the user with Sudoku-puzzle solving visualization. By design, the Sudoku CC module assumes the user relies on the associated Sudoku GUI software. The GUI is required because the  UNIX timestamp for each gameplay event must  pass trough the Sudoku CC RPC captcha protection, as this deters bots.

Download the portable GUI bundle from the following link: 

[Link to GUI Software Bundle](https://github.com/tonymorony/Komodoku/releases)

To manually compile the GUI from source code, follow the steps below. Please note that the GUI is based on `python2`.

#### Linux

##### Install Dependencies

```bash
sudo apt-get install python-pygame libgnutls28-dev
pip install requests wheel slick-bitcoinrpc pygame
```

##### Install the GUI

```bash
git clone https://github.com/tonymorony/Komodoku
cd Komodoku
```

#### Start Sudoku GUI

```bash
python Sudoku.py
```

<!-- 

#### MacOS (OSX)
there is no compatible daemon right now - so manual installaction on OSX don' have much.
OSX dependencies might be quite tricky part depends of exact OSX version - so I'll just recommend to use portable bundle when it'll be ready

-->

## gen

**cclib gen 17**

The generate method creates a new Sudoku puzzle.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| (none) | | |

#### Response

Daemon `stdout`:

| Name | Type | Description |
| ---- | ---- | ----------- |
| (solved Sudoku puzzle, visualized) | (string, multi-line) | an ASCII-character representation of the generated Sudoku puzzle, with all solutions in place |
| (unsolved Sudoku puzzle, visualized) | (string, multi-line) | an ASCII-character representation of the generated Sudoku puzzle, with numbers removed for gameplay |
| (numbers remaining)                  | (string)             | a description of how many numbers are remaining to solve in the Sudoku puzzle                       |
| (Sudoku Puzzle - integer)            | (number, multi-line) | a multi-line number-based representation of the solved Sudoku puzzle; no visual embellishments      |
| solve | (number) | a number-based concatenated representation of the unsolved Sudoku puzzle; `0`'s represent empty spaces in the puzzle |
| score | (string) | `score` returns three values: the difficulty of the puzzle calculated by the generator, the solution in concatenated format, the number of numbers left to fill |  

JSON output:

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | (string) | whether the command executed successfully |
| name | (string) | name of the module |
| method | (string) | name of the method |
| srand | (number) | the seed of the non-blockchain based puzzle that is creating RNG <!-- I don't know what RNG is, so I don't know how to format this; if the description currently looks good to you, Tony, then it's probably okay --> |
| amount | (number) | the reward provided to the first node to submit the correct solution |
| hex | (string) | a `hex` value representing the encoded data; this must be broadcast using `sendrawtransaction` |
| txid | (string) | a transaction id representing the generation of this Sudoku puzzle, also called the `puzzle_txid` |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=SUDOKU cclib gen 17
```


<collapse-text hidden title="Response">


```bash
-----------------------------------
| 2 : 5 : 7 | 1 : 3 : 6 | 9 : 8 : 4 |
|- - - - - -|- - - - - -|- - - - - -|
| 8 : 9 : 1 | 4 : 5 : 7 | 3 : 2 : 6 |
|- - - - - -|- - - - - -|- - - - - -|
| 3 : 6 : 4 | 9 : 2 : 8 | 7 : 1 : 5 |
|-----------+-----------+-----------|
| 6 : 8 : 9 | 5 : 7 : 4 | 2 : 3 : 1 |
|- - - - - -|- - - - - -|- - - - - -|
| 4 : 2 : 3 | 6 : 8 : 1 | 5 : 9 : 7 |
|- - - - - -|- - - - - -|- - - - - -|
| 1 : 7 : 5 | 2 : 9 : 3 | 6 : 4 : 8 |
|-----------+-----------+-----------|
| 7 : 3 : 6 | 8 : 1 : 9 | 4 : 5 : 2 |
|- - - - - -|- - - - - -|- - - - - -|
| 9 : 1 : 2 | 7 : 4 : 5 | 8 : 6 : 3 |
|- - - - - -|- - - - - -|- - - - - -|
| 5 : 4 : 8 | 3 : 6 : 2 | 1 : 7 : 9 |
----------------------------------- 
-----------------------------------
| 2 : 5 : | 1 : : | : 8 : 4 |
|- - - - - -|- - - - - -|- - - - - -|
| : 9 : | : 5 : | 3 : 2 : |
|- - - - - -|- - - - - -|- - - - - -|
| 3 : : 4 | : 2 : 8 | : 1 : |
|-----------+-----------+-----------|
| : : 9 | : : | : : 1 |
|- - - - - -|- - - - - -|- - - - - -|
| : 2 : | 6 : : | : : 7 |
|- - - - - -|- - - - - -|- - - - - -|
| 1 : : | : : 3 | : 4 : |
|-----------+-----------+-----------|
| : : | : 1 : | : : |
|- - - - - -|- - - - - -|- - - - - -|
| : : | 7 : : | : : |
|- - - - - -|- - - - - -|- - - - - -|
| 5 : : | : : 2 | : : |
----------------------------------- 
*** 26 numbers left ***
257136984
891457326
364928715
689574231
423681597
175293648
736819452
912745863
548362179
solve: 250100084090050320304028010009000001020600007100003040000010000000700000500002000
1:1 score: 898 257136984891457326364928715689574231423681597175293648736819452912745863548362179 26
```

</collapse-text>



<collapse-text hidden title="Response">


```JSON
{
   "result":"success",
   "name":"sudoku",
   "method":"gen",
   "srand":-678890453,
   "amount":898.00000000,
   "hex":"0400008085202f890159a377ff60f9c0173b2de965fa902608490c339626642e5bcfeea4fd13facbf4010000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140460886e61f55924af187b34ed1bffe114bc4af194ab57c9e50301ea9c134135d00dc34c44a42b1ba54390da0b8c2637239a008b6b11fee535be5aecfd73e10b9a100af03800111a10001ffffffff041027000000000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc00427fe814000000302ea22c802033c7f0d5d7327fbe86a1c94d56a6acbc59b2d24e00ed83864bfbf9e9dab41eed8103120c008203000401cc48f28f6002000000302ea22c80203d1579313abe7d8ea85f48c65ea66fc512c878c0d0e6f6d54036669de940febf8103120c008203000401cc0000000000000000576a4c541147510205000100000008040009000005000302000300040002080001000000090000000000010002000600000000070100000000030004000000000001000000000000000700000000000500000000020000000000000067e300000000000000000000000000",
   "txid":"3b00b64e5892987ea2afc1c66384bf304ab2f8ca90d98ebef1d7784ca7347645"
}
```

</collapse-text>


## txidinfo

**cclib txidinfo 17 '["puzzle_txid"]'**

The `txidinfo` method returns information about the indicated `puzzle_txid` puzzle.

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| puzzle_txid | (string) | the unique transaction id of the requested puzzle, as returned from the broadcast hex of the [gen](../customconsensus/sudoku.html#gen) method  |

#### Response

| Name | Type | Description |
| ---- | ---- | ----------- |
| result | (string) | whether the command executed successfully |
| txid | (string) | a transaction id representing the generation of this Sudoku puzzle, also called the `puzzle_txid` | 
| result | (string) | whether the command executed successfully |
| height | (number) | the block height at which the puzzle was generated |
| sudokuaddr | (string) | the CC address that owns this puzzle funds and will distribute the reward |
| amount | (number) | the reward provided to the first node to submit the correct solution |
| unsolved | (string) | the unsolved puzzle, provided in concatenated form, filling playing field from left to right horizontally, and from top to bottom vertically |
| name | (string) | name of the module |
| method | (string) | name of the method |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=SUDOKU cclib txidinfo 17 \%220aaa8fdc83aa9111b1f1d143ca7baf5730cd68c02f1422b3f8cf4186959db6ff%22\"
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "txid": "0aaa8fdc83aa9111b1f1d143ca7baf5730cd68c02f1422b3f8cf4186959db6ff",
  "result": "success",
  "height": 766,
  "sudokuaddr": "RAFVbQbZ5esSkktLQq9mdQWrvi7UBnzqwE",
  "amount": 10.0,
  "unsolved": "4--13--6---89--2--37-2--541--5-8-1-66---4-----1-7------8-------------3---------9-",
  "name": "sudoku",
  "method": "txidinfo"
}
```

</collapse-text>


## pending

**cclib pending 17**

The `pending` method returns a complete list of all unsolved puzzles on the asset chain.

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| (none) | | |

#### Response

| Name       | Type                    | Description                                                                                 |
| ---------- | ----------------------- | ------------------------------------------------------------------------------------------- |
| result     | (string)                | whether the command executed successfully                                                   |
| name       | (string)                | name of the module                                                                          |
| method     | (string)                | name of the method                                                                          |
| pending    | (array of json objects) | an array of json objects, each containing information about an unsolved puzzle on the chain |
| height     | (number)                | the block height at which the puzzle was generated                                          |
| amount     | (number)                | the reward provided to the first node to submit the correct solution                        |
| txid       | (string)                | a transaction id representing the generation of this puzzle, also called the `puzzle_txid`  |
| numpending | (number)                | the total number of on-chain unsolved puzzles                                               |
| total      | (number)                | the collective value of all outstanding bounties for unsolved puzzles                       |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=SUDOKU cclib pending 17
```


<collapse-text hidden title="Response">


```bash
{
   "result":"success",
   "name":"sudoku",
   "method":"pending",
   "pending":[
      {
         "height":665,
         "amount":10000.00000000,
         "txid":"2944aa188737301bb863ea926dd9cca3ec55331c56339dba9ed0ec7fb09a1600"
      },

        ... (omitted for brevity) ...

      {
         "height":766,
         "amount":10.00000000,
         "txid":"0aaa8fdc83aa9111b1f1d143ca7baf5730cd68c02f1422b3f8cf4186959db6ff"
      }
   ],
   "numpending":3290,
   "total":3504801.00000000
}
```

</collapse-text>


## solution

**cclib solution 17 '["puzzle_txid","solution",t0,t1,t2,...]'**

The `solution` method submits the proposed `solution` to the blockchain for the indicated `puzzle_txid` puzzle.

The `t0...` values represent the timestamp at which the solution was found for each number. Pre-filled cells have an automated timestamp of `tX=0`, where `X` is the index of the puzzle number.

The method returns a hex value which must then be broadcast using the [sendrawtransaction](../komodo-api/rawtransactions.html#sendrawtransaction) method.

#### Arguments

| Name | Type | Description |
| ---- | ---- | ----------- |
| txid | (string) | a transaction id representing the generation of this puzzle, also called the `puzzle_txid` | 
| solution | (numeric string) | the proposed solution, provided in a concatenated format |
| tX... | (81 UNIX timestamps separated by comma) | there are `81` total `t...` arguments. `X` is the index of the indicated argument. The argument is a timestamp representing the time at which `X` number was input. Timestamp value should be 0 for numbers which were already known |

#### Response

JSON output:

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | (string) | name of the module |
| hex | (string) | a `hex` value representing the encoded data; this must be broadcast using `sendrawtransaction` |
| txid | (string) | a transaction id representing the generation of this Sudoku puzzle, also called the `puzzle_txid` | 
| amount | (number) | the reward provided to the first node to submit the correct solution |
| result | (string) | whether the command executed successfully |
| sudokuaddr | (string) | the CC address that owns this puzzle reward and will distribute the reward |
| method | (string) | name of the method |

Daemon `stdout`:

| Name | Type | Description |
| ---- | ---- | ----------- |
| solved | (string) | this returns three values: the block height at which the puzzle was solved, the amount of coins rewarded, the solution txid |
| solution | (number) | this contains three values: a number-based concatenated representation of the solved puzzle; a string representing the concatenated unsolved puzzle; the total score for solving this puzzle | 
| statistics | (string) | information which helps this CC developer to detect was puzzle solved by robot or human | 

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=ROGUE cclib solution 17 [%22b5d7e2b50ace182e0ab7b5a18875818fa8e56b937689376bc5bdc8727b78ad52%22,%22157392864829461357436587129795634218381279645642815973978146532563728491214953786%22,1552297383,1552297384,1552297386,0,1552297387,0,0,1552297389,1552297389,1552297391,0,1552297392,1552297394,1552297396,1552297396,1552297397,1552297398,1552297399,1552297401,1552297402,1552297403,1552297404,1552297405,1552297407,1552297408,1552297409,1552297410,1552297412,1552297413,0,1552297415,1552297416,1552297417,0,0,1552297419,0,1552297422,1552297423,1552297424,1552297429,0,1552297431,0,1552297432,1552297435,1552297436,1552297437,1552297439,0,1552297440,1552297441,1552297443,0,1552297445,0,0,1552297446,1552297447,0,1552297449,0,1552297451,0,1552297453,0,1552297455,0,0,0,1552297457,0,1552297458,1552297459,0,0,1552297460,0,1552297462,1552297462,0]
```


<collapse-text hidden title="Response">


```bash
{
   'name':'sudok',
   'hex':'0400008085202f890252ad787b72c8bdc56b378976936be5a88f817588a1b5b70a2e18ce0ab5e2d7b5000000007b4c79a276a072a26ba067a56580210223b2b9d35fb6383bbbc0dd6668825c91713bc21081b9ce33df3d7edbafa883058140f6e597c2b4454dd6c2203744bcdf133e98b4330d0df27933d6db8fb5ccc443d919a04d072b35f6660ca80e647485b8c7f5bee08a56e47e636db67232ebf36fbfa100af03800111a10001ffffffff52ad787b72c8bdc56b378976936be5a88f817588a1b5b70a2e18ce0ab5e2d7b5010000007b4c79a276a072a26ba067a5658021027e0bf5ddd579d858b7997a60f3cd91c1cd99ed78df1753464cb12685251d5bf181401be4b2e389756a56e544e53cc9755ab737d1cd1cec180c2f5993b0a49d3787686d32dbb0364aaf1a8bd17c49e8ede3c4ea05d4705c33b65f16df131ef2a46f16a100af03800111a10001ffffffff0200e40b5402000000232102c4d7a2001384c7c2b95eb3927f6b1cec0c6fc29c35d9b17dc7a012d02203a17cac0000000000000000fd9f016a4d9b01115351313537333932383634383239343631333537343336353837313239373935363334323138333831323739363435363432383135393733393738313436353332353633373238343931323134393533373836fd44015c862da75c862da85c862daa000000005c862dab00000000000000005c862dad5c862dad5c862daf000000005c862db05c862db25c862db45c862db45c862db55c862db65c862db75c862db95c862dba5c862dbb5c862dbc5c862dbd5c862dbf5c862dc05c862dc15c862dc25c862dc45c862dc5000000005c862dc75c862dc85c862dc900000000000000005c862dcb000000005c862dce5c862dcf5c862dd05c862dd5000000005c862dd7000000005c862dd85c862ddb5c862ddc5c862ddd5c862ddf000000005c862de05c862de15c862de3000000005c862de500000000000000005c862de65c862de7000000005c862e5a000000005c862deb000000005c862ded000000005c862def0000000000000000000000005c862df1000000005c862df25c862df300000000000000005c862df4000000005c862df65c862df60000000000000000ade400000000000000000000000000',
   'txid':'b5d7e2b50ace182e0ab7b5a18875818fa8e56b937689376bc5bdc8727b78ad52',
   'amount':100.0,
   'result':'success',
   'sudokuaddr':'RWXsjC1zc7zGqsxa2YdL9zS7G3PwN5xc9m',
   'method':'solution'
}
```

</collapse-text>



<collapse-text hidden title="Response">


```bash
SOLVED ht.58521 100.00000000 4c3fb21e60ef0af863da43c5ebbdf38651f080a3fff1c04855fc42857479f9e5
157392864829461357436587129795634218381279645642815973978146532563728491214953786 score.55 ---3-28---2------------------5---21-3----9-4-----1---3-78--6-3-5-3-284-1--49-3--6
1 2 1 2 0 2 1 2 2 0 1 1 1 2 1 1 1 1 2 1 1 1 2 1 2 1 1 2 3 1 1 5 2 1 3 1 1 2 1 1 2 2 1 1 4 2 2 2 1 1 1 2 0 100 solvetime.179 n.55 avetime.3 variance.177 vs ave2 9
```

</collapse-text>

