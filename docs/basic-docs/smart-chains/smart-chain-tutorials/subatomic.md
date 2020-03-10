# Subatomic Swaps (Work In Progress)

## Introduction

<!----
Subatomic Swaps 

```bash
sudo apt-get install g++-8 gcc-8
```
----->

This is a **Work in Progress (WIP)** guide for testing Komodo's new tech **Subatomic OTC Swaps**. It works with normal CLTV channels. Read more about it [here](https://bitcoin.stackexchange.com/questions/48243/are-micropayment-channels-still-subject-to-malleability-after-bip65). Bugs are expected, please report them to `#dev_subatomic` channel in [Komodo Discord](https://discord.gg/jrdECGj). Please also report any incorrect info/suggestions on this guide in `#dev_subatomic` channel or leave a comment at the end of this guide.

## Requirements
**All chains must be native on both alice and bob nodes.**  
1. Working CLI knowledge on Ubuntu/Debian to follow along this guide.
2. DEX chain with `dexp2p=2`, special peer IP (available in bob and alice section inside the launch param) and privkey of the R address and zAddr imported (full sync is not mandatory).
3. KMD chain `./komodod &` - fully synced and privkey of the R address imported & funded as required.
4. PIRATE chain `./komodod -ac_name=PIRATE -ac_supply=0 -ac_reward=25600000000 -ac_halving=77777 -ac_private=1 -addnode=178.63.77.56 &` - fully synced and privkey of the zAddr imported & funded as required.

## Install Deps
```
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install build-essential pkg-config libc6-dev m4 g++-multilib autoconf libtool ncurses-dev unzip git python zlib1g-dev wget bsdmainutils automake libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libgtest-dev libqt4-dev libqrencode-dev libdb++-dev ntp ntpdate software-properties-common curl clang libcurl4-gnutls-dev cmake clang libsodium-dev jq -y
```

## Clone, Compile and Link `komodo-cli`
**Make sure you compile `jl777` branch from jl777's repo and don't mix the daemon from another branch or repo.**  
Use the following commands in both bob and alice nodes:
```
git clone https://github.com/jl777/komodo
cd ~/komodo
git checkout jl777
./zcutil/fetch-params.sh
./zcutil/build.sh -j$(nproc)
sudo ln -sf /home/$USER/komodo/src/komodo-cli /usr/local/bin/komodo-cli
```

## Compile the `subatomic` daemon
This is the daemon that will used on subatomic OTC swaps. You will find the `subatomic` daemon inside `~/komodo/src/` directory once compiled. **Please note: you need to have `gcc8` to be able to compile this binary.** Once the compilation finished, the binary will be available inside `~/komodo/src/` directory. Both alice & bob nodes need this. To compile/build the daemon issue the following commands:
```
cd ~/komodo/src/cc/dapps
./make_subatomic.sh
cd ../../
ln cc/dapps/subatomic.json .
```

## bob Node
### Launch DEX Chain
Import the privkey of the corresponding pubkey of the `R` address and zaddr after the chain start. Make sure to change `-handle` according to your liking and leave `_bob` as it it for easy identification.
```
./komodod -pubkey=02c3af47b51a506b08b4ededb156cb4c3f9db9e0ac7ad27b8623c08a056fdcc220 -ac_name=DEX -dexp2p=2 -ac_supply=999999 -addnode=136.243.58.134 -handle=alien_bob -recvZaddr=zs1wq40g4wvrzc2eq9xw7wtstshgar68ash659eq20ellm5jeqsyfwe5qs3tex9l3mjnrj2yf34hw0 &
```
Note:
```
pubkey = is the pubkey of your KMD transparent (R) address. the privkey of that address needs to be imported in both KMD and DEX wallet
recvZaddr = is your PIRATE receiving address. the privkey of this address also needs to be imported into both PIRATE and DEX wallet
```
**Important: After you have completed importing your R and zs addr privkey into the daemon, restart the DEX chain with all the params like above.**  

### Create `bid` and `ask` scripts
Usage:
```
bid: ./komodo-cli -ac_name=DEX DEX_broadcast <recvZaddr> <priority> KMD PIRATE <01pubkey> $2 $1
ask: ./komodo-cli -ac_name=DEX DEX_broadcast <recvaddr> <priority> PIRATE KMD <01pubkey> $1 $2
```
You need to get the `01` pubkey from the DEX chain startup standard outputs, known as `stdout` to use inside the following scripts. For this testing we are using priority `5`. Don't forget to make the `bid` and `ask` scripts executable using `chmod +x` command. For easy access and launch, create them inside the `~/komodo/src/` directory.

##### `bid`
```
./komodo-cli -ac_name=DEX DEX_broadcast zs1wq40g4wvrzc2eq9xw7wtstshgar68ash659eq20ellm5jeqsyfwe5qs3tex9l3mjnrj2yf34hw0 5 KMD PIRATE 01b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f $2 $1
```
##### `ask`
```
./komodo-cli -ac_name=DEX DEX_broadcast RQPZrM4yQaTZpEuoGmcGwzE4SaG2Tn9QiB 5 PIRATE KMD 01b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f $1 $2
```
##### Posting `bid` & `ask`
For both bid and ask: ./bid or ./ask PIRATEvol KMDvol, so to get a 0.1 price use the following commands:
```
./bid 1000 100
./ask 1000 100
```
`bid` example output:
```
./bid 1000 100
{
  "timestamp": 1581516364,
  "id": 2855700768,
  "hash": "079268a3ca4b7e426b8486608886df3fab245db089b0d90c110ee02784db28c2",
  "tagA": "KMD",
  "tagB": "PIRATE",
  "pubkey": "01b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f",
  "payload": "b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f3582d81a2a7fe1cbf178937e9aa28881c92b0d11216403600000000000000000000000000000000068d6998ab646e7b9be0293ed7f153f4c15dd687cf80f36ed5ac94de18e6436fef12bd4d368864d193ec40bd27d625c214577897ae312be9ee7e3eb7c9664487934215c463360e48de6096f88ac348b4e19b451ee7c0adac7d5578bd2c7288a",
  "hex": 1,
  "decrypted": "zs1wq40g4wvrzc2eq9xw7wtstshgar68ash659eq20ellm5jeqsyfwe5qs3tex9l3mjnrj2yf34hw0",
  "decryptedhex": 0,
  "senderpub": "01b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f",
  "amountA": "100.00000000",
  "amountB": "1000.00000000",
  "priority": 5,
  "recvtime": 1581516364,
  "cancelled": 0
}
```
`ask` example output:
```
./ask
{
  "timestamp": 1581528567,
  "id": 1900124800,
  "hash": "07a81914b70bc3bf9fdd2de377bef941a6be52ada355882d400eb28c2e69b853",
  "tagA": "PIRATE",
  "tagB": "KMD",
  "pubkey": "01b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f",
  "payload": "b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f8554141b10696753c487b9f729e7e71ba2808c965e61deea00000000000000000000000000000000dbaa2f2af16622b63e45d351ac120b13729bc6f744c715dc1aca94d3b7b306bd258a1530ada3cb73fe166e46e7abcbff521be2",
  "hex": 1,
  "decrypted": "RQPZrM4yQaTZpEuoGmcGwzE4SaG2Tn9QiB",
  "decryptedhex": 0,
  "senderpub": "01b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f",
  "amountA": "0.00000000",
  "amountB": "0.00000000",
  "priority": 7,
  "recvtime": 1581528567,
  "cancelled": 0
}
```
Remember the `id` from the bid, the `alice` node will need it.

### Start the `subatomic` loop in bob node
This is how you start a bob node to perform the `subatomic` swaps. These loops will be running long term. So, better to use individual `screen` session for each pair your bob is running. You can attach and detach a screen without shutting down the loop.

- To start a bob loop that accepts `PIRATE` for `KMD` use the following command in a screen session or in a separate terminal/SSH window.
```
./subatomic PIRATE "" KMD
```
- To start a bob loop that accepts `KMD` for `PIRATE` use the following command in a screen session or in a separate terminal/SSH window.
```
./subatomic KMD "" PIRATE
```

## Launch DEX Chain for alice
Import the privkey of the corresponding pubkey of the `R` address and zaddr after the chain start. Make sure to change `-handle` according to your liking and leave `_alice` as it it for easy identification.
```
./komodod -pubkey=038e61fbface549a850862f12ed99b7cbeef5c2bd2d8f1daddb34809416f0259e1 -ac_name=DEX -dexp2p=2 -ac_supply=999999 -addnode=136.243.58.134 -handle=alien_alice -recvZaddr=zs1r3ptv82fn0yz6q47nwmgsak2dasl0v5zrprqu222f0r3mtc5p9202t82lt2vu4wmr386v2cx4tn &
```
Note:
```
pubkey = is the pubkey of your KMD transparent (R) address. the privkey of that address needs to be imported in both KMD and DEX wallet
recvZaddr = is your PIRATE receiving address. the privkey of this address also needs to be imported into both PIRATE and DEX wallet
```
**Important: After you have completed importing your R and zs addr privkey into the daemon, restart the DEX chain with all the params like above.**  

You also need KMD and PIRATE chain in native mode in Alice node and corresponding privkey imported & funded as required. You can find the launch params of these chains [here](https://gist.github.com/himu007/add3181427bb53ab5dc5160537f0c238#requirements).

### Display Orderbook
Display orderbook data using the following example. You can change the coin name and base/rel as your liking.
```
./komodo-cli -ac_name=DEX DEX_orderbook 10 0 PIRATE KMD
```
Example Output:
```
./komodo-cli -ac_name=DEX DEX_orderbook 10 0 PIRATE KMD
{
  "asks": [
    {
      "price": "0.05000000",
      "baseamount": "100.00000000",
      "relamount": "5.00000000",
      "priority": 6,
      "pubkey": "01b977e90eba4e21ccaf432a7866e313682b51c350bd319c5ebbc76e176ecad44f",
      "timestamp": 1581538693,
      "hash": "076ce1b408a6e404ed92cd5fff589962e330f36aaf00514e217b8bf51a4e31f5",
      "id": 2337150656
    }
  ],
  "bids": [
  ],
  "base": "PIRATE",
  "rel": "KMD"
}
```

### Start the `subatomic` swaps
Once all above are done and you have the `id` of an order that you would like to swap with, you are ready to start a subatomic swap. All you to do is just use `./subatomic PIRATE "" <bid id> <fill amount>`

Example:
```
./subatomic PIRATE "" 2855700768 10
```

### Important Notes
**- Remember to use small amount while testing.**  
**- Check your balances in the corresponding wallet and make sure that this is what you expected.**  
**- Report any bugs in #dev_subatomic channel of Komodo Discord.**  
**- For the `pubkey` and `recvZaddr`, use your own. Don't use the key and addresses that are used as example.**
