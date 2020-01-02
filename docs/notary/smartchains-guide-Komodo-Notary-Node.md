# Smart Chains Guide for Notary Nodes

**If you were looking for the readme how to setup the Smart Chains, don't look further. It is integrated into Komodo now.**

This is a small troubleshooting page for problems that may be encountered while starting Smart Chains.

## How do I start the Smart Chains?

```bash
cd ~/komodo/src
./assetchains
```

## Clear all Smart Chains' data

```bash
cd ~/komodo/src
./clearassets
```

## I get "Error: Cannot obtain a lock on data directory /home/komodo/.komodo/REVS. Zcash is probably already running." when I run it

```bash
cd ~/komodo/src
fiat/revs stop
```

## How can I see if I'm in sync?

```bash
cd ~/komodo/src
./fiat-cli getbestblockhash
```

This should result in:

```bash
revs
00004aae197360d4b1ee39ae774c53f5dcfe364e62bca9c08d3371c8048f692c
supernet
00001353826cb50312f978c750e379b3455b9d31d0d44b565fceeac9bde2b7a8
dex
000017362eb5e3695ce93cc98d30c61c4c711b6d729c485c708e02db8c2ae441
pangea
0556228845802eae9c344f1a7f07f4c81e6f9997a3d2e65665c52a5ac49717c0
jumblr
00016572fb1a1685d1988a3bd65c27b0f48aac415f71b4a26c51c4659015d8aa
bet
008d0fdab3e06ea7e06205c92da824a9ab3e04bc681b8b4e82322025d8dfa699
crypto
015ccc340cc2f378c556c990fb8a16ffe08f46b70294d642eef99ce660e1fb38
hodl
0b28d41c4e05cb3a6a129307254004580c46be17b7de152b9a5614424f8a3d98
mshark
00017a755bada0e09f5948b362a8489013bded0e2d071fccf0803b1203621aee
bots
00009e236c58026fcd379d93e172fa080ef61bc711483e0cbb90e16810b09227
mgw
05e37ff5dd6ad6c56fd4c91e6b58c9483ef0c1cf29cf3b3ddd81e6eb91af1436
coqui
00042e300f93f1647021a5bb3c4a2539e2fb7b1ff0e9643d32311f90414db9b5
wlc
02aab4d9db7341c0e4fcf92d1fa5338516334dba1988425a94614753cf7689f8
kv
006184a18c57effb2351771af83b2c8d9a780389829006253eded255199c6743
ceal
00609c071d40ebc299ae00272644f55801c8b47bb802ba357f3f9ce73fb87ccf
mesh
01f054a9090059608243e78f9ded82e534199f9d9f89fd61e50be49a8b588ac1
mnz
01985d6c1ecc63a22f0e653332a1cea32a6ddaebff43a2e3fd0db8afa64ac405
axo
0824de6894ec0c0135c1254da1a1f46581b0f5a75735d4331f8e29247fb30eeb
etomic
05eda4337d5d4546316cc2370a08240c49c404946a9f8b71ca66489fed2b9095
btch
0761193258390efe9b4d4041b29db2f908a8a7cc40d757c2574d980e85403201
pizza
048bacc5af768dc1ed5871a5abdf6783afe90c8bba621ec1731345d60ed1885a
beer
0cc4507dfd4aedfcc151d6c70d1d783a05fad0a41a89acc062e51724138aa2f9
vote2018
071edb56f1d0bed30af57268bb5468008ad7975d4986781f729daecfb462a8c8
ninja
0b3aac6506fc2bbd1f4ea4d27366fca44bbac31718be3681e9e8535c5af47c0d
oot
0d283df2483c57aa95c287304070488cb89a025b8a09ebcf0d9186f1e964bc13
bntn
08ffe7c25ad1b43700b301ba0d42195e63303bfd465112db91a4d8c7afa20af6
```

## I am not in sync with a few hashes. what do I have to do now?

Stop the corresponding fiat value and start it again. For instance REVS:

```bash
cd ~/komodo/src
fiat/revs stop
rm -rf ~/.komodo/REVS
./komodod -ac_name=REVS -ac_supply=1300000 -addnode=78.47.196.146 $1 &
```

## It is running multiple komodod's when I look into (h)top, is that normal?

Yes, each asset value starts a komodod task

## How to stop all of them?

```bash
cd ~/komodo/src
./fiat-cli stop
```

## I receive "error i.1 vs n.2" in the output when I start ./assetchains.

Harmless errors, no problem with it. Let it run.

## I can't get it to run?

```bash
# make sure all komodod / iguana processes are stopped
cd ~/komodo/src/
git pull
make -j8
cd ~/.komodo/
mv komodo.conf ../
mv wallet.dat ../
rm -rf *
mv ../komodo.conf .
mv ../wallet.dat .
cd ..
./start
# wait for resync
cd ~/dPoW/iguana/
./m_notary
# Wait a couple minutes
cd ~/komodo/src/
./assetchains
./fiat-cli importprivkey U****** (Komodo wif)
# wait for it to finish
./assetfunds btcd address
./fiat-cli stop
./assetchains
```

## Here is how I fixed my nodes to work with Smart Chains

1. Reboot the server

1. Update Komodo

```bash
cd komodo && git fetch && git checkout beta && git pull && make -j8
```

1. Delete data files from the `.komodo` folder

```bash
cd ~/.komodo
rm -rf blocks chainstate debug.log komodostate db.log
```

1. Start the ./start script to resync the Komodo chain

```bash
cd
./start
```

1. Wait till resync is done, this time it is a lot faster

1. Go to ~/komodo/src

```bash
cd ~/komodo/src
```

1. Edit clearassets and delete everything in it

```bash
vi clearassets (and delete everything in it)
```

1. And paste the following in it:

```bash
rm -rf ~/.komodo/REVS
rm -rf ~/.komodo/SUPERNET
rm -rf ~/.komodo/DEX
rm -rf ~/.komodo/PANGEA
rm -rf ~/.komodo/JUMBLR
rm -rf ~/.komodo/BET
rm -rf ~/.komodo/CRYPTO
rm -rf ~/.komodo/HODL
rm -rf ~/.komodo/MSHARK
rm -rf ~/.komodo/BOTS
rm -rf ~/.komodo/MGW
rm -rf ~/.komodo/COQUI
rm -rf ~/.komodo/WLC
rm -rf ~/.komodo/KV
rm -rf ~/.komodo/CEAL
rm -rf ~/.komodo/MESH
rm -rf ~/.komodo/MNZ
rm -rf ~/.komodo/AXO
rm -rf ~/.komodo/ETOMIC
rm -rf ~/.komodo/BTCH
rm -rf ~/.komodo/PIZZA
rm -rf ~/.komodo/BEER
rm -rf ~/.komodo/VOTE2018
rm -rf ~/.komodo/NINJA
rm -rf ~/.komodo/OOT
rm -rf ~/.komodo/BNTN
rm -rf ~/.komodo/CHAIN
rm -rf ~/.komodo/PRLPAY
```

1. Save it and run clearassets

```bash
./clearassets
```

1. Run Smart Chains

```bash
./assetchains
```

1. Wait for it till it stops doing its thing. The import your BTCDwif key

```bash
./fiat-cli importprivkey U*************************** (your BTCDwif key)
```

1. After it is finished, fund your assets with your BTCD address

```bash
./assetfunds R********************* (your BTCD address)
```

1. When that is done, start notarizing

```bash
cd
cd dPoW/iguana
git fetch && git checkout master && ./m_notary
```

1. When this is done you should get the following running all the time

```bash
GOT DEX PACKET.1079
```

1. Wait half an hour and somewhere in your iguana output you should see the following:

```bash
[45] ips.55 KMD NOTARIZE.11 matches.17 paxmatches.34 bestmatches.7 bestk.13 1820251030003000 recv.fd37ffd5fb183f70 sigmasks.(0 0) senderind.9 state.0 (98349c0d 0 0) pax.dfc61f91
```

1. When you see pax.dfc61f91 you are ready!!!
