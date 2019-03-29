# Configuration and Installation Instructions for coins supported on mmV1

The below configurations and installation instructions for various coins supported by BarterDEX have been verified to work by our Test Engineers while testing their Atomic-Swap compatibility through BarterDEX. But these instructions are provided here for reference purpose only and in case of any difficulty installing or configuring any coin that doesn't belong to the Komodo Ecosystem, it is recommended to contact the Support channels/Developers of the particular coin directly.

Do `CTRL + F` and search for a coin by its TICKER and then NAME if TICKER doesn't yield results.

Contabo is the hosting provider for one of the Bob nodes used while testing. The output beneath the word `Contabo` is the output from the `getcoin` API call on the VPS.

## 888

```
https://bitcointalk.org/index.php?topic=1243963.0
https://github.com/octocoin-project/octocoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = list_of(18);
base58Prefixes[SCRIPT_ADDRESS] = list_of(5);
base58Prefixes[SECRET_KEY] =     list_of(176);

src/main.h
DEFAULT_TX_FEE = 2000000;
src/main.cpp
minRelayTxFee = CFeeRate(DEFAULT_TX_FEE);

{\"coin\":\"888\",\"name\":\"octocoin\",\"rpcport\":22888,\"pubtype\":18,\"p2shtype\":5,\"wiftype\":176,\"txfee\":2000000}


cd ~/wallets
git clone https://github.com/octocoin-project/octocoin
cd octocoin
./autogen.sh
CC=gcc-5 CXX=g++-5 CPP=cpp-5 ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j2
sudo make install
sudo strip /usr/local/bin/octocoin*
mkdir ~/.octocoin
echo "server=1" >> ~/.octocoin/octocoin.conf
echo "listen=0" >> ~/.octocoin/octocoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.octocoin/octocoin.conf
echo "rpcuser=barter888" >> ~/.octocoin/octocoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.octocoin/octocoin.conf
chmod 0600 ~/.octocoin/octocoin.conf
octocoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"888\"}"

home
   {
      "p2shtype" : 5,
      "status" : "active",
      "txfee" : 2000000,
      "pubtype" : 18,
      "rpc" : "127.0.0.1:22888",
      "coin" : "888",
      "smartaddress" : "8cio2kmg8D4rTzo5mAa5gmkMJiGaUDcN3o",
      "wiftype" : 176
   },

contabo
   {
      "status" : "active",
      "rpc" : "127.0.0.1:22888",
      "coin" : "888",
      "p2shtype" : 5,
      "smartaddress" : "8GweZ7PwitCqeLwJxTqC1XMBYbSgPpjTYV",
      "pubtype" : 18,
      "wiftype" : 176,
      "txfee" : 2000000
   },

octocoin-cli sendtoaddress "8GweZ7PwitCqeLwJxTqC1XMBYbSgPpjTYV" 99.9
"fee" : -0.02000000,
"fee" : -0.10000000,
```

## ABY

```
https://bitcointalk.org/index.php?topic=2063158.0
https://bitcointalk.org/index.php?topic=503131.680
https://github.com/AppleByteMe/AppleByte


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,23);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,151);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 100000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;

{\"coin\":\"ABY\",\"name\":\"applebyte\",\"rpcport\":8607,\"pubtype\":23,\"p2shtype\":5,\"wiftype\":151,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/AppleByteMe/AppleByte
cd AppleByte
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j2
sudo make install
sudo strip /usr/local/bin/artbyte*
mkdir ~/.applebyte
echo "server=1" >> ~/.applebyte/applebyte.conf
echo "txindex=1" >> ~/.applebyte/applebyte.conf
echo "listen=0" >> ~/.applebyte/applebyte.conf
echo "listenonion=1" >> ~/.applebyte/applebyte.conf
echo "#proxy=127.0.0.1:9050" >> ~/.applebyte/applebyte.conf
echo "rpcuser=barteraby" >> ~/.applebyte/applebyte.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.applebyte/applebyte.conf
chmod 0600 ~/.applebyte/applebyte.conf
artbyted -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ABY\"}"

home
      "rpc" : "127.0.0.1:8607",
      "balance" : 0,
      "KMDvalue" : 0,
      "height" : 938275,
      "status" : "active",
      "wiftype" : 151,
      "txfee" : 100000,
      "smartaddress" : "AdQoxJG7g7PEZAVWtGEg7Q7HTEZJ4iowVJ",
      "installed" : true,
      "coin" : "ABY",
      "p2shtype" : 5,
      "pubtype" : 23

contabo
      "status" : "active",
      "coin" : "ABY",
      "rpc" : "127.0.0.1:8607",
      "height" : 937860,
      "balance" : 0,
      "KMDvalue" : 0,
      "pubtype" : 23,
      "wiftype" : 151,
      "txfee" : 100000,
      "p2shtype" : 5,
      "installed" : true,
      "smartaddress" : "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf"
```

## ADT

```
{\"coin\":\"ADT\",\"name\":\"adtoken\",\"etomic\":\"0xD0D6D6C5Fe4a677D343cC433536BB717bAe167dD\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ADT\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "status" : "active",
      "pubtype" : 0,
      "height" : -1,
      "wiftype" : 188,
      "coin" : "ADT",
      "installed" : false,
      "balance" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80"

contabo
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "p2shtype" : 85,
      "coin" : "ADT",
      "txfee" : 1000,
      "installed" : false,
      "balance" : 99.95,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ADT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ADT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ADT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
adToken (ADT)
SWAP completed! 1842536542-282622023 {"uuid":"0991e05ec890f9cd2b20ab38e4309009cd3313528c9ba30ddb646ef64e070bce","expiration":1528308398,"tradeid":0,"requestid":1842536542,"quoteid":282622023,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ADT","bobtomic":"0xD0D6D6C5Fe4a677D343cC433536BB717bAe167dD","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70528993,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"756864325022253057","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70529993, 0.08010000, 0.70530993, 0.08011000, 0.79347117, 0, 0, 0.79346117, 0, 0, 0],"result":"success","status":"finished","finishtime":1528293489,"bobdeposit":"85912112d3b507e565a3da36fd9904b2d3fbefa48f93aa8ec8dc849852035201","alicepayment":"98450e4dfc65927c32ef51b871f059f8a96f500caba3a4057ddaa85c644c84c7","bobpayment":"c13db7e070541733e8894ba038fae2827826ed30a070bdd5f50aaba5d060a177","paymentspent":"b3bf85f2ab124619101a9b3bf422014657573ca7dcfad8f285d29bbc0c8eddbb","Apaymentspent":"38fb2006b1e50c3cc88078116291e5d38d742086046bc16ebe93b7ed1cc843f7","depositspent":"cc0d326e8224775fae8983531765c8989f1665d155a62b46eed783555f952d3e","method":"tradestatus","finishtime":1528293489}
bobdeposit https://etherscan.io/tx/0x4d9a74ea4d3dee5bcc695d98ed4a4d4dc5a1ce9f323be2905b9ad910d6366eb6
alicepayment https://kmdexplorer.ru/tx/98450e4dfc65927c32ef51b871f059f8a96f500caba3a4057ddaa85c644c84c7
bobpayment https://etherscan.io/tx/0x4ea2b9081149cfb8d585650517f32064d6173f2abebf30c6c6e641cd90706d94

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ADT\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"adtoken\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ADT\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"adtoken\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ADT\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"adtoken\",\"refrel\":\"coinmarketcap\"}"
```

## AE

```
{\"coin\":\"AE\",\"name\":\"aeternity\",\"etomic\":\"0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"AE\"}"

home
      "p2shtype" : 85,
      "wiftype" : 188,
      "coin" : "AE",
      "txfee" : 1000,
      "installed" : false,
      "pubtype" : 0,
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "height" : -1

contabo
      "p2shtype" : 85,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "status" : "active",
      "coin" : "AE",
      "installed" : false,
      "wiftype" : 188,
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"AE\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"AE\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"AE\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Aeternity (AE)
SWAP completed! 3370229606-2078363275 {"uuid":"12857411e7890cc0d2882036ac8a9b412936da4521698e6afab74603feb06860","expiration":1527363462,"tradeid":0,"requestid":3370229606,"quoteid":2078363275,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"AE","bobtomic":"0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.72965949,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"11987219385781256193","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.72966949, 0.08010000, 0.72967949, 0.08011000, 0.82088692, 0, 0, 0.82087692, 0, 0, 0],"result":"success","status":"finished","finishtime":1527349007,"bobdeposit":"ed3c42db6d0f2543a9503d2de9c85af2228bfe2fc1044d7efddb850a32e5e4e9","alicepayment":"fbd2b74d1398b040da25879e0ef2b497073b66883417729a70d5ed2f5ddce393","bobpayment":"fc853ebc4469fafed2a6e681d4fe8ff18041fa99f2bc1f36bd3c48635c15922a","paymentspent":"14f938030d92272e1251b41eb5b5bd0e811069eca57292648d332275b4e6bc2b","Apaymentspent":"657981f1516f58a30c283d65e878a235fdfecac711529ed92ac0bb9dde9436c4","depositspent":"3c64544635899165b10d88661c705c609afa0447d12fb8cab8d780a59668cdb3","method":"tradestatus","finishtime":1527349007}
bobdeposit https://etherscan.io/tx/0x63fecd8c1040f37107489c2d9e61462ea30f803666709b84b676536a165a2c47
alicepayment https://kmdexplorer.ru/tx/fbd2b74d1398b040da25879e0ef2b497073b66883417729a70d5ed2f5ddce393
bobpayment https://etherscan.io/tx/0xe0e7fdf5ed4935ff5fb0223fdeba4ba01a7a6ead99a178d3c33b18f8c69a2394

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AE\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"aeternity\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AE\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"aeternity\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AE\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"aeternity\",\"refrel\":\"coinmarketcap\"}"
```

## AION

```
{\"coin\":\"AION\",\"name\":\"aion\",\"etomic\":\"0x4CEdA7906a5Ed2179785Cd3A40A69ee8bc99C466\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"AION\"}"

home
      "balance" : 0,
      "pubtype" : 0,
      "status" : "active",
      "height" : -1,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "installed" : false,
      "wiftype" : 188,
      "coin" : "AION"

contabo
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "txfee" : 1000,
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "coin" : "AION",
      "wiftype" : 188,
      "height" : -1,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"AION\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"AION\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"AION\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Aion (AION)
SWAP completed! 1274968381-3316684695 {"uuid":"0d77a3b1ea15682cd3de81b5707df1c7769ec565407a463f85da5c17414afeee","expiration":1527440323,"tradeid":0,"requestid":1274968381,"quoteid":3316684695,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"AION","bobtomic":"0x4CEdA7906a5Ed2179785Cd3A40A69ee8bc99C466","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67220490,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"9412534934086746113","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67221490, 0.08010000, 0.67222490, 0.08011000, 0.75625051, 0, 0, 0.75624051, 0, 0, 0],"result":"success","status":"finished","finishtime":1527425570,"bobdeposit":"7dc6f8aec03a383dcc8ec8657b7ee51d178d0ae1ec4520ec1efc73f3a450134d","alicepayment":"ab2a8414740c086d91c310be8b9d171f6b7025af163e51f93792c8f762c4316b","bobpayment":"6acc068ceea9daf56b5b86342a1b89d9b21d3ff2ebc0eae882becede15f17f27","paymentspent":"26a074a94ec7b73104403f5548cee779f9f81d4fc1b6c25f3699cbef93d71873","Apaymentspent":"c250c270015a42eb632a9f3b88d6ab380217fc93ed0824a0903d02b9870e2a46","depositspent":"99c649b32168921605faea489767ab90565e3a205c6ae1905f6dce967ac26da9","method":"tradestatus","finishtime":1527425570}
bobdeposit https://etherscan.io/tx/0xb83e37ca634c5a6776566c3251b402bfb4d1907e71fb12fc201477aec8dc7a0e
alicepayment https://kmdexplorer.ru/tx/ab2a8414740c086d91c310be8b9d171f6b7025af163e51f93792c8f762c4316b
bobpayment https://etherscan.io/tx/0x2d3ad292be8f2f8d643fe2a892f76019f1c2547d22dd2e60625be5b7b10d873f

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AION\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"aion\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AION\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"aion\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AION\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"aion\",\"refrel\":\"coinmarketcap\"}"
```

## AMB

```
{\"coin\":\"AMB\",\"name\":\"amber\",\"etomic\":\"0x4DC3643DbC642b72C158E7F3d2ff232df61cb6CE\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"AMB\"}"

home
      "coin" : "AMB",
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "installed" : false,
      "pubtype" : 0,
      "balance" : 0,
      "wiftype" : 188,
      "p2shtype" : 85,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "installed" : false,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "AMB",
      "p2shtype" : 85,
      "wiftype" : 188,
      "txfee" : 1000,
      "pubtype" : 0,
      "status" : "active",
      "balance" : 26.97,
      "height" : -1,
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"AMB\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"AMB\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"AMB\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Ambrosus (AMB)
SWAP completed! 3825246932-394020779 {"uuid":"650ced7652d49e3cf12558d90f7c39c5a4e35c23657acc0655c6a198d943557c","expiration":1531287562,"tradeid":0,"requestid":3825246932,"quoteid":394020779,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"AMB","bobtomic":"0x4DC3643DbC642b72C158E7F3d2ff232df61cb6CE","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73229303,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"2598446175309398017","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531272294,"bobdeposit":"6ee38a9458278d25ea2209f879aba2a520ad3938e94a06f8a3e1076288f6b806","alicepayment":"64e960fc58fa7edc30e2fb43fec4fcd2b6a0b0b40b61e12d35a7f1352c7b3466","bobpayment":"36053b5cede77cb73edd27972df882f6198e29048368b60b687d081be6a93f30","paymentspent":"29e999ea1976f9eb8bc18a34e74a1115bda7749265dfded4126836d229c8c857","Apaymentspent":"9d018a51010bb203054c7c3e98a860866cfbeb1f47c76fbb255119c7c09e4f82","depositspent":"2920d084728787f752401800897f783dce268cbf7077757651032d2db8d9c68b","alicedexfee":"365de89d51b5b8e12a4447e32d0a203d3e835d646d1949995cba5fbe75e862c5","method":"tradestatus","finishtime":1531272294}
bobdeposit https://etherscan.io/tx/0xb8f598afade247fa79615cdbadd64aa51963b87ff53c052a08b81174bb3eda23
alicepayment https://kmdexplorer.ru/tx/64e960fc58fa7edc30e2fb43fec4fcd2b6a0b0b40b61e12d35a7f1352c7b3466
bobpayment https://etherscan.io/tx/0x8d717b6beb9941428d92116b460eaf006549c380c9aefe0cd48e3023e4db3c6a

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AMB\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"amber\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AMB\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"amber\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AMB\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"amber\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AMB\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"amber\",\"refrel\":\"coinmarketcap\"}"
```

## ANN

```
{\"coin\":\"ANN\",\"name\":\"agentnotneeded\",\"etomic\":\"0xe0e73E8fc3a0fA161695be1D75E1Bc3E558957c4\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ANN\"}"

home
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "coin" : "ANN",
      "wiftype" : 188,
      "status" : "active",
      "pubtype" : 0,
      "balance" : 0,
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "height" : -1,
      "installed" : false

contabo
      "height" : -1,
      "balance" : 0,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "wiftype" : 188,
      "coin" : "ANN",
      "txfee" : 1000,
      "installed" : false,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ANN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ANN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ANN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ANN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Agent Not Needed (ANN)
SWAP completed! 4217768556-3005775244 {"uuid":"ea25031ebe7edea0cf79dfd851adf7b916a8f941c2f19890f511f21135d79ad6","expiration":1526787696,"tradeid":0,"requestid":4217768556,"quoteid":3005775244,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ANN","bobtomic":"0xe0e73E8fc3a0fA161695be1D75E1Bc3E558957c4","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76880697,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"16097759424147161089","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76881697, 0.08010000, 0.76882697, 0.08011000, 0.86492784, 0, 0, 0.86491784, 0, 0, 0],"result":"success","status":"finished","finishtime":1526772613,"bobdeposit":"ddc769e5091dab097d5916d6f362e7ef8d08aec6ca16881fe01695798d000409","alicepayment":"87aefc49e8c7e6c5c25b476eda1d3560b57c7a0fa392633d7ea8882501ab1fa9","bobpayment":"57419ea26a18b488c23eba7af01c57973e72e784af2a99ff3681d65f126e36e9","paymentspent":"442b7b43102ec39f6780a0c01423a068506e9148ee4df3599a6d37bd771fc7cf","Apaymentspent":"98070c6c5c697bc5783643dd1b65618420dae609225389cd6c1a225b6b18126b","depositspent":"8d739d2f38d3987b78d34bd1092603bd0b130c1ffd3f3a8735941bafe757adb0","method":"tradestatus","finishtime":1526772613}
bobdeposit https://etherscan.io/tx/0x87ea33ad06c83637a5b44a859c6c08a5aec51b0c9dde80cfdbbeef7593614944
alicepayment https://kmdexplorer.ru/tx/87aefc49e8c7e6c5c25b476eda1d3560b57c7a0fa392633d7ea8882501ab1fa9
bobpayment https://etherscan.io/tx/0x75ed1fe26aa90196a42a4b258dd1ac01c41fc656f32cc8b3c7c541ad019fc395

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"ANN\",\"fixed\":0.1}"
```

## ARC

```
https://bitcointalk.org/index.php?topic=1139923
https://github.com/ArcticCore/arcticcoin


src/chainparams.cpp
// ArcticCoin addresses start with 'A'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,23);
// ArcticCoin script addresses start with '4'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,8);
// ArcticCoin private keys start with '7' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 10000; // was 1000

{\"coin\":\"ARC\",\"name\":\"arcticcoin\",\"confpath\":\"${HOME#}/.arcticcore/arcticcoin.conf\",\"rpcport\":7208,\"pubtype\":23,\"p2shtype\":8,\"wiftype\":176,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/ArcticCore/arcticcoin
cd arcticcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/arcticcoin*
mkdir ~/.arcticcore
echo "server=1" >> ~/.arcticcore/arcticcoin.conf
echo "litemode=1" >> ~/.arcticcore/arcticcoin.conf
echo "listen=0" >> ~/.arcticcore/arcticcoin.conf
echo "listenonion=1" >> ~/.arcticcore/arcticcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.arcticcore/arcticcoin.conf
echo "rpcuser=barterarc" >> ~/.arcticcore/arcticcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.arcticcore/arcticcoin.conf
echo "rpcworkqueue=64" >> ~/.arcticcore/arcticcoin.conf
echo "rpcthreads=16" >> ~/.arcticcore/arcticcoin.conf
chmod 0600 ~/.arcticcore/arcticcoin.conf
arcticcoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ARC\"}"

home
   {
      "p2shtype" : 8,
      "pubtype" : 23,
      "smartaddress" : "AdQoxJG7g7PEZAVWtGEg7Q7HTEZJ4iowVJ",
      "wiftype" : 176,
      "txfee" : 10000,
      "rpc" : "127.0.0.1:7208",
      "coin" : "ARC",
      "status" : "active"
   },

contabo
   {
      "status" : "active",
      "pubtype" : 23,
      "wiftype" : 176,
      "rpc" : "127.0.0.1:7208",
      "coin" : "ARC",
      "p2shtype" : 8,
      "smartaddress" : "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf",
      "txfee" : 10000
   },

arcticcoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 9.99956154
"fee": -0.00003840,
```

## ARG

```
https://bitcointalk.org/index.php?topic=1432608.0
https://github.com/argentumproject/argentum


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,23);   // 0x17
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);    // 0x5
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,151);  // 0x97

src/main.cpp
minRelayTxFee = CFeeRate(50000);
src/wallet/wallet.cpp
minTxFee = CFeeRate(50000);

{\"coin\":\"ARG\",\"name\":\"argentum\",\"rpcport\":13581,\"pubtype\":23,\"p2shtype\":5,\"wiftype\":151,\"txfee\":50000}


cd ~/wallets
git clone https://github.com/argentumproject/argentum
cd argentum
./autogen.sh
#CFLAGS="-O2 -fPIC -DUSE_SSE2 -fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-O2 -fPIC -DUSE_SSE2 -fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/argentum*
mkdir ~/.argentum
echo "server=1" >> ~/.argentum/argentum.conf
echo "txindex=1" >> ~/.argentum/argentum.conf
echo "listen=0" >> ~/.argentum/argentum.conf
echo "listenonion=0" >> ~/.argentum/argentum.conf
echo "addrindex=1" >> ~/.argentum/argentum.conf
echo "rpcuser=barterarg" >> ~/.argentum/argentum.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.argentum/argentum.conf
echo "rpcworkqueue=64" >> ~/.argentum/argentum.conf
echo "rpcthreads=16" >> ~/.argentum/argentum.conf
chmod 0600 ~/.argentum/argentum.conf
argentumd -daemon

cd
wget http://www.taur.net/mirrors/argentum/bootstrap.dat.gz
gunzip bootstrap.dat.gz
argentumd -daemon -loadblock=$HOME/bootstrap.dat
rm ~/bootstrap.dat


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ARG\"}"

home
   {
      "txfee" : 50000,
      "coin" : "ARG",
      "smartaddress" : "AdQoxJG7g7PEZAVWtGEg7Q7HTEZJ4iowVJ",
      "wiftype" : 151,
      "p2shtype" : 5,
      "pubtype" : 23,
      "status" : "active",
      "rpc" : "127.0.0.1:13581"
   },

contabo
   {
      "status" : "active",
      "txfee" : 50000,
      "rpc" : "127.0.0.1:13581",
      "coin" : "ARG",
      "p2shtype" : 5,
      "smartaddress" : "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf",
      "pubtype" : 23,
      "wiftype" : 151
   },

argentum-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 99.9979023
"fee" : -0.00009600,
```

## AST

```
{\"coin\":\"AST\",\"name\":\"airswap\",\"etomic\":\"0x27054b13b1B798B345b591a4d22e6562d47eA75a\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"AST\"}"

home
      "coin" : "AST",
      "txfee" : 1000,
      "pubtype" : 0,
      "installed" : false,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "height" : -1,
      "p2shtype" : 85,
      "status" : "active"

hetzner
      "wiftype" : 188,
      "balance" : 86.797,
      "height" : -1,
      "txfee" : 1000,
      "p2shtype" : 85,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "status" : "active",
      "coin" : "AST",
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"AST\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"AST\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
AirSwap (AST)
SWAP completed! 4051508605-1589048660 {"uuid":"c64c4049e7ea111d489b0ce6f3b40eebcf90c1657728d2bcf74a6d0fea376274","expiration":1531439668,"tradeid":0,"requestid":4051508605,"quoteid":1589048660,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"AST","bobtomic":"0x27054b13b1B798B345b591a4d22e6562d47eA75a","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.70402234,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"2399834529291567105","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531424749,"bobdeposit":"1e2380d89e7fe964cea7c2e1bc6c6afbcf24202bf039f54558b315a37afec5d3","alicepayment":"d673df4f46e6e2e076c1ae1729fb2ec5d6637f6b07be7dc2a1897893476bb43b","bobpayment":"208426fff0e8a60277066f219f63e88e4451df2d84ddc9c88c7b1fa5c40bb8dc","paymentspent":"daead3bab7adf8f19606621b72a4b599dd6410b515c5eda5b7670aee05357b51","Apaymentspent":"a97957f6a1ca38f887d76d471bcf0dfb136f3d048b5519adc84a90562953f470","depositspent":"ca05bd5dd93cdd25f6b1cfeba3ded3f71113f731a067194b3aa9e41591630d64","alicedexfee":"3dff9c05188eb9de864f9abe12483ed38584913481c4fcc1d4ccdcc3f644e9ae","method":"tradestatus","finishtime":1531424749}
bobdeposit https://etherscan.io/tx/0x0d0a97d08774ae9953be9c56e2626237bcf00bad9722bc792b396d33cb44e614
alicepayment https://kmdexplorer.ru/tx/d673df4f46e6e2e076c1ae1729fb2ec5d6637f6b07be7dc2a1897893476bb43b
bobpayment https://etherscan.io/tx/0x0c59a019244a5bdcbea1b1dcc386f20b20727933162150a1dde71abe2a9c7e8e

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AST\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"airswap\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AST\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"airswap\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AST\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"airswap\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"AST\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"airswap\",\"refrel\":\"coinmarketcap\"}"
```

## ATB

```
https://bitcointalk.org/index.php?topic=1989756.0
https://github.com/segwit/atbcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,23);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,83);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

{\"coin\":\"ATB\",\"name\":\"atbcoin\",\"confpath\":\"${HOME#}/.ATBCoinWallet/atbcoin.conf\",\"rpcport\":8332,\"pubtype\":23,\"p2shtype\":83,\"wiftype\":128,\"txfee\":10000}


sudo apt-get install libssl1.0-dev
cd ~/wallets
git clone https://github.com/segwit/atbcoin
cd atbcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc
make -j4
sudo make install
sudo strip /usr/local/bin/atbcoin*
sudo apt-get install libssl-dev
mkdir ~/.ATBCoinWallet
echo "server=1" >> ~/.ATBCoinWallet/atbcoin.conf
echo "txindex=1" >> ~/.ATBCoinWallet/atbcoin.conf
echo "listen=0" >> ~/.ATBCoinWallet/atbcoin.conf
echo "listenonion=0" >> ~/.ATBCoinWallet/atbcoin.conf
echo "rpcport=10332" >> ~/.ATBCoinWallet/atbcoin.conf
echo "rpcuser=barteratb" >> ~/.ATBCoinWallet/atbcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.ATBCoinWallet/atbcoin.conf
echo "rpcworkqueue=64" >> ~/.ATBCoinWallet/atbcoin.conf
echo "rpcthreads=16" >> ~/.ATBCoinWallet/atbcoin.conf
chmod 0600 ~/.ATBCoinWallet/atbcoin.conf
atbcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ATB\"}"

home
      "p2shtype" : 83,
      "balance" : 0,
      "pubtype" : 23,
      "coin" : "ATB",
      "rpc" : "127.0.0.1:10332",
      "smartaddress" : "AdQoxJG7g7PEZAVWtGEg7Q7HTEZJ4iowVJ",
      "txfee" : 10000,
      "height" : 153917,
      "KMDvalue" : 0,
      "installed" : true,
      "status" : "active",
      "wiftype" : 128

contabo
      "wiftype" : 128,
      "p2shtype" : 83,
      "balance" : 0,
      "pubtype" : 23,
      "txfee" : 10000,
      "installed" : true,
      "status" : "active",
      "rpc" : "127.0.0.1:10332",
      "KMDvalue" : 0,
      "height" : 153912,
      "coin" : "ATB",
      "smartaddress" : "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf"


atbcoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 1
"fee": -0.00004520

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ATB\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ATB\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
ATBCoin (ATB)
SWAP completed! 2004871572-4154542491 {"uuid":"e4fc95f691f6d84f11c4a3f8628526ab4781c285958f4eed89acbc79c1da2162","expiration":1528072881,"tradeid":0,"requestid":2004871572,"quoteid":4154542491,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ATB","srcamount":0.67701495,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1608605376012288001","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67711495, 0.08010000, 0.67721495, 0.08011000, 0.76184181, 0, 0, 0.76174181, 0, 0, 0],"result":"success","status":"finished","finishtime":1528057813,"bobdeposit":"5cca308181a7f8444484fec8ab503c5a7470680ff50fd77c7124c3976eb17849","alicepayment":"bf712691f776e513bd96cf501ee48259844d64fbf44048f308d2a5b2943f1281","bobpayment":"42ea1c666aa8d3f9c13dc303d4c0dff552df94323de01c8fbc8a6ef0bb213450","paymentspent":"5e073e437201e47eecfcc141abc0e102c3d7152c3b89363339ca51dc97a80a0b","Apaymentspent":"71514bf1a72f060e17342c1ff4b4c76b21936c090eb293145a2b598c3712f8de","depositspent":"719f8a2ad94466bdc090a80bda66cb4c4c4661d52a307c99749dfc86a58075cc","method":"tradestatus","finishtime":1528057813}
bobdeposit https://explorer.atbcoin.com/tx/5cca308181a7f8444484fec8ab503c5a7470680ff50fd77c7124c3976eb17849
alicepayment https://kmdexplorer.ru/tx/bf712691f776e513bd96cf501ee48259844d64fbf44048f308d2a5b2943f1281
bobpayment https://explorer.atbcoin.com/tx/42ea1c666aa8d3f9c13dc303d4c0dff552df94323de01c8fbc8a6ef0bb213450

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ATB\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"atbcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ATB\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"atbcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ATB\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"atbcoin\",\"refrel\":\"coinmarketcap\"}"
```

## AXE

```
https://github.com/AXErunners/axe


src/chainparams.cpp
// Axe addresses start with 'P'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,55);
// Axe script addresses start with '7'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,16);
// Axe private keys start with '7' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

{\"coin\":\"AXE\",\"name\":\"axe\",\"confpath\":\"${HOME#}/.axecore/axe.conf\",\"rpcport\":9337,\"pubtype\":55,\"p2shtype\":16,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/AXErunners/axe
cd axe
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/axe*
mkdir ~/.axecore
echo "server=1" >> ~/.axecore/axe.conf
echo "txindex=1" >> ~/.axecore/axe.conf
echo "litemode=1" >> ~/.axecore/axe.conf
echo "rpcport=9338" >> ~/.axecore/axe.conf
echo "listen=0" >> ~/.axecore/axe.conf
echo "listenonion=0" >> ~/.axecore/axe.conf
echo "#proxy=127.0.0.1:9050" >> ~/.axecore/axe.conf
echo "rpcuser=barteraxe" >> ~/.axecore/axe.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.axecore/axe.conf
chmod 0600 ~/.axecore/axe.conf
axed -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"AXE\"}"

home
      "wiftype" : 204,
      "rpc" : "127.0.0.1:9338",
      "coin" : "AXE",
      "p2shtype" : 16,
      "txfee" : 10000,
      "KMDvalue" : 0,
      "height" : 37855,
      "status" : "active",
      "pubtype" : 55,
      "balance" : 0,
      "installed" : true,
      "smartaddress" : "PWE7TmoLPtDGj2xHfgtsdQpTbNoUqvjxoq"

contabo
      "balance" : 0,
      "rpc" : "127.0.0.1:9338",
      "pubtype" : 55,
      "smartaddress" : "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k",
      "status" : "active",
      "wiftype" : 204,
      "installed" : true,
      "p2shtype" : 16,
      "txfee" : 10000,
      "coin" : "AXE",
      "KMDvalue" : 0,
      "height" : 37853


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"AXE\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"AXE\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
AXE
SWAP completed! 1115357564-566855785 {"expiration":1523050557,"tradeid":0,"requestid":1115357564,"quoteid":566855785,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"AXE","srcamount":0.69700355,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"9865619195785248769","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.69710355, 0.08010000, 0.69720355, 0.08011000, 0.78432899, 0, 0, 0.78422899, 0, 0, 0],"result":"success","status":"finished","finishtime":1523035845,"bobdeposit":"cbba5bc953d9de639524910042b4b6ae342f42247107b8176c9314d0dcce9e5a","alicepayment":"8de0e4f36d31fe32eb7c880bdf6606f6960c08c3b4635193b48c7f3206769c90","bobpayment":"a2a229762561c954acf38eaf546ee65ce0fd2f6d064b8202ef1f5297c8cb2b5b","paymentspent":"c246a767e651570b2a5822e81adfdc889c405df86fb65745281ccd8465adf518","Apaymentspent":"37d4beeb6f69c0178c7b43cb181baceb949782dde20fa58ec13075f4c5debef4","depositspent":"c15625d17d379a00647888bcf95614e07704ff22c1d6769d436b3c54a9dc54c8","method":"tradestatus","finishtime":1523035845}
bobdeposit http://207.246.65.114:3001/tx/cbba5bc953d9de639524910042b4b6ae342f42247107b8176c9314d0dcce9e5a
alicepayment https://kmd.explorer.supernet.org/tx/8de0e4f36d31fe32eb7c880bdf6606f6960c08c3b4635193b48c7f3206769c90
bobpayment http://207.246.65.114:3001/tx/a2a229762561c954acf38eaf546ee65ce0fd2f6d064b8202ef1f5297c8cb2b5b


```

## BAT

```
{\"coin\":\"BAT\",\"name\":\"basic-attention-token\",\"etomic\":\"0x0D8775F648430679A709E98d2b0Cb6250d2887EF\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BAT\"}"

home
      "balance" : 0,
      "status" : "active",
      "installed" : false,
      "height" : -1,
      "wiftype" : 188,
      "coin" : "BAT",
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "pubtype" : 0

contabo
      "height" : -1,
      "coin" : "BAT",
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "balance" : 0,
      "pubtype" : 0,
      "installed" : false,
      "txfee" : 1000,
      "p2shtype" : 85,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "wiftype" : 188


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BAT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BAT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BAT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BAT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Basic Attention Token (BAT)
SWAP completed! 3737442574-1997840017 {"uuid":"c2cdd77d5e769dca5a90eecab89bc55b2906544726d15fd8626c05e260b1aa6a","expiration":1526799732,"tradeid":0,"requestid":3737442574,"quoteid":1997840017,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BAT","bobtomic":"0x0D8775F648430679A709E98d2b0Cb6250d2887EF","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77925915,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"902030927432777729","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77926915, 0.08010000, 0.77927915, 0.08011000, 0.87668654, 0, 0, 0.87667654, 0, 0, 0],"result":"success","status":"finished","finishtime":1526785049,"bobdeposit":"5e66b6e0a2823d88abc48f11ebc3d6c6087420fa5f9bd642813d42c62edf80cf","alicepayment":"c4dfa9d467817c9726bf17841cd420320068da7dc2aa51df948594854f7d2439","bobpayment":"345f9593b294dfeccce3f328e3f7c226a63a89d6cdb1927e8af54c08ab3f8a71","paymentspent":"f1c3d56dd266df2419cd166e0666a9198cf16f1f9351c618c6e1be92048700af","Apaymentspent":"e7185ac0009b4c171a904c07db8008b67be689e26d6972eaa9dc6fe8803c698c","depositspent":"1d5e5476023c22b867524a1a8599bbb83f805e71c7ed7ee6e08afb55fb570663","method":"tradestatus","finishtime":1526785049}
bobdeposit https://etherscan.io/tx/0xc492a1459fc9409b1825c429803a44de2593214ec8a7a7c95b591d5d95a6d9ce
alicepayment https://kmdexplorer.ru/tx/c4dfa9d467817c9726bf17841cd420320068da7dc2aa51df948594854f7d2439
bobpayment https://etherscan.io/tx/0x1dce43808bd219dbfa0c811c94bc61c32358f574dab1f41baf92f2135bf1830c

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BAT\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"basic-attention-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BAT\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"basic-attention-token\",\"refrel\":\"coinmarketcap\"}"
```

## BAY

```
https://bitcointalk.org/index.php?topic=890531
https://github.com/dzimbeck/BitBay


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,25);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,85);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,153);

main.h
MIN_TX_FEE = 10000;

{\"coin\":\"BAY\",\"name\":\"bitbay\",\"isPoS\":1,\"rpcport\":19915,\"pubtype\":25,\"p2shtype\":85,\"wiftype\":153,\"txfee\":10000}


sudo apt-get install libssl1.0-dev
cd ~/wallets
git clone https://github.com/dzimbeck/BitBay
cd BitBay/src
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" make -j4 -f makefile.unix USE_UPNP=-
sudo cp bitbayd /usr/local/bin
sudo strip /usr/local/bin/bitbay*
sudo apt-get install libssl-dev
mkdir ~/.bitbay
echo "server=1" >> ~/.bitbay/bitbay.conf
echo "txindex=1" >> ~/.bitbay/bitbay.conf
echo "listen=0" >> ~/.bitbay/bitbay.conf
echo "listenonion=0" >> ~/.bitbay/bitbay.conf
echo "rpcport=9915" >> ~/.bitbay/bitbay.conf
echo "rpcuser=barterbay" >> ~/.bitbay/bitbay.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitbay/bitbay.conf
echo "rpcworkqueue=64" >> ~/.bitbay/bitbay.conf
echo "rpcthreads=16" >> ~/.bitbay/bitbay.conf
chmod 0600 ~/.bitbay/bitbay.conf
bitbayd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BAY\"}"

home
      "height" : 1491908,
      "pubtype" : 25,
      "status" : "active",
      "wiftype" : 153,
      "balance" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:19915",
      "installed" : true,
      "smartaddress" : "BS61vWrh6UJzC2mgw6uK5eeriF5BVyo2V5",
      "coin" : "BAY",
      "KMDvalue" : 0,
      "txfee" : 10000

contabo
      "height" : 1491912,
      "KMDvalue" : 0,
      "smartaddress" : "B6JsSsUxh9SyNNuv8QARQQFgx8FHKXK1wd",
      "coin" : "BAY",
      "p2shtype" : 85,
      "txfee" : 10000,
      "balance" : 0,
      "rpc" : "127.0.0.1:19915",
      "installed" : true,
      "pubtype" : 25,
      "status" : "active",
      "wiftype" : 153

bitbayd sendtoaddress "B6JsSsUxh9SyNNuv8QARQQFgx8FHKXK1wd" 1
bitbayd sendtoaddress "B6JsSsUxh9SyNNuv8QARQQFgx8FHKXK1wd" 1.2
"fee" : -0.00010000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BAY\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"bitbay\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BAY\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"bitbay\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BAY\",\"rel\":\"BTC\",\"margin\":0.07,\"refbase\":\"bitbay\",\"refrel\":\"coinmarketcap\"}"
```

## BCBC

```
https://bitcointalk.org/index.php?topic=3109563.0
https://github.com/cleanblockchain/Bitcoin-CBC


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,0);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

{\"coin\":\"BCBC\",\"name\":\"bitcoin@cbc\",\"confpath\":\"${HOME#}/.bitcoin@cbc/bitcoin.conf\",\"rpcport\":8340,\"pubtype\":0,\"p2shtype\":5,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/cleanblockchain/Bitcoin-CBC
cd Bitcoin-CBC
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal -lgmp -lgmpxx" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo cp src/bitcoind /usr/local/bin/bitcoincbcd
sudo cp src/bitcoin-cli /usr/local/bin/bitcoincbc-cli
sudo strip /usr/local/bin/bitcoincbc*
mkdir ~/.bitcoin@cbc
echo "server=1" >> ~/.bitcoin@cbc/bitcoin.conf
echo "txindex=1" >> ~/.bitcoin@cbc/bitcoin.conf
echo "listen=0" >> ~/.bitcoin@cbc/bitcoin.conf
echo "listenonion=0" >> ~/.bitcoin@cbc/bitcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.bitcoin@cbc/bitcoin.conf
echo "rpcuser=barterbcbc" >> ~/.bitcoin@cbc/bitcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitcoin@cbc/bitcoin.conf
chmod 0600 ~/.bitcoin@cbc/bitcoin.conf
bitcoincbcd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BCBC\"}"

home
      "height" : 4313,
      "coin" : "BCBC",
      "wiftype" : 128,
      "txfee" : 10000,
      "KMDvalue" : 0,
      "status" : "active",
      "p2shtype" : 5,
      "balance" : 0,
      "pubtype" : 0,
      "installed" : true,
      "smartaddress" : "1NdwJoQVLxj5kCHXKcaLxWrByddbgyHofb",
      "rpc" : "127.0.0.1:8340"

contabo
      "balance" : 0,
      "coin" : "BCBC",
      "txfee" : 10000,
      "wiftype" : 128,
      "rpc" : "127.0.0.1:8340",
      "height" : 4313,
      "status" : "active",
      "installed" : true,
      "pubtype" : 0,
      "p2shtype" : 5,
      "smartaddress" : "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj",
      "KMDvalue" : 0


bitcoincbc-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 1
"fee": -0.00003360

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BCBC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BCBC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Bitcoin@CBC (BCBC)
SWAP completed! 986111048-3702164617 {"expiration":1522984866,"tradeid":0,"requestid":986111048,"quoteid":3702164617,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BCBC","srcamount":0.67360602,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"675858612371783681","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67370602, 0.08010000, 0.67380602, 0.08011000, 0.75800677, 0, 0, 0.75790677, 0, 0, 0],"result":"success","status":"finished","finishtime":1522971103,"bobdeposit":"12776feb92dbf0fe50bab17ac946323f7e35244c384ae9691166a3bfec389933","alicepayment":"00c6aaf16f323562b6d87e11effabe9ff137279d07a83eaec7c673825bd1fd87","bobpayment":"66e1cec60c015998eaec9766670d1d466eaaa13ef42b1d1aa41ce4efbb3656df","paymentspent":"4d112a90848f64db16ff7c1bba93be9a1d12c2c4c44d11ff623562563c2d43e9","Apaymentspent":"1086a218e87a42bb69300ff1dafec76b91cff85151ff56998b220345f4d80e8a","depositspent":"1bfecfccb70be2aa2d3bd0d1254f5edccf9e3ca7de0bfac0f808bc3a11bac34d","method":"tradestatus","finishtime":1522971103}
bobdeposit http://be.cleanblockchain.org/tx/12776feb92dbf0fe50bab17ac946323f7e35244c384ae9691166a3bfec389933
alicepayment https://kmd.explorer.supernet.org/tx/00c6aaf16f323562b6d87e11effabe9ff137279d07a83eaec7c673825bd1fd87
bobpayment http://be.cleanblockchain.org/tx/66e1cec60c015998eaec9766670d1d466eaaa13ef42b1d1aa41ce4efbb3656df
```

## BCH

```
https://bitcointalk.org/index.php?topic=2040221.0
https://github.com/Bitcoin-ABC/bitcoin-abc


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1, 0);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1, 5);
base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1, 128);

src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 1000
src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"BCH\",\"name\":\"bch\",\"rpcport\":33333,\"pubtype\":0,\"p2shtype\":5,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/Bitcoin-ABC/bitcoin-abc
cd bitcoin-abc
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j2
sudo cp src/bitcoind /usr/local/bin/bchd
sudo cp src/bitcoin-cli /usr/local/bin/bch-cli
sudo strip /usr/local/bin/bch*
mkdir ~/.bch
echo "server=1" >> ~/.bch/bch.conf
echo "txindex=1" >> ~/.bch/bch.conf
echo "listen=0" >> ~/.bch/bch.conf
echo "listenonion=0" >> ~/.bch/bch.conf
echo "rpcport=33333" >> ~/.bch/bch.conf
echo "rpcuser=barterbch" >> ~/.bch/bch.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bch/bch.conf
echo "rpcworkqueue=64" >> ~/.bch/bch.conf
echo "rpcthreads=16" >> ~/.bch/bch.conf
chmod 0600 ~/.bch/bch.conf
bchd -daemon -datadir=$HOME/.bch -conf=bch.conf


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BCH\"}"

home
      "txfee" : 10000,
      "status" : "active",
      "rpc" : "127.0.0.1:33333",
      "smartaddress" : "1NdwJoQVLxj5kCHXKcaLxWrByddbgyHofb",
      "installed" : true,
      "coin" : "BCH",
      "pubtype" : 0,
      "balance" : 0,
      "wiftype" : 128,
      "KMDvalue" : 0,
      "height" : 508462,
      "p2shtype" : 5

contabo
      "KMDvalue" : 0,
      "status" : "active",
      "balance" : 0,
      "txfee" : 10000,
      "wiftype" : 128,
      "height" : 508487,
      "installed" : true,
      "pubtype" : 0,
      "smartaddress" : "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj",
      "rpc" : "127.0.0.1:33333",
      "p2shtype" : 5,
      "coin" : "BCH"


bch-cli -datadir=$HOME/.bch -conf=bch.conf sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 0.01
"fee": -0.00000230
```

## BCO

```
https://bitcointalk.org/index.php?topic=2015949.0
https://github.com/CryptoBridge/bridgecoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,27);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,50);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 200000;
DEFAULT_TRANSACTION_MINFEE = 100000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;

{\"coin\":\"BCO\",\"name\":\"bridgecoin\",\"rpcport\":6332,\"pubtype\":27,\"p2shtype\":5,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/CryptoBridge/bridgecoin
cd bridgecoin
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/bridgecoin*
mkdir ~/.bridgecoin
echo "server=1" >> ~/.bridgecoin/bridgecoin.conf
echo "txindex=1" >> ~/.bridgecoin/bridgecoin.conf
echo "listen=0" >> ~/.bridgecoin/bridgecoin.conf
echo "listenonion=0" >> ~/.bridgecoin/bridgecoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.bridgecoin/bridgecoin.conf
echo "rpcuser=barterbco" >> ~/.bridgecoin/bridgecoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bridgecoin/bridgecoin.conf
addnode=167.114.103.43:6333
addnode=144.76.64.238:6333
addnode=173.212.245.112:6333
addnode=176.9.24.230:6333
addnode=178.63.104.7:6333
addnode=45.79.151.135:6333
addnode=61.164.253.37:6333
chmod 0600 ~/.bridgecoin/bridgecoin.conf
bridgecoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BCO\"}"

home
      "KMDvalue" : 0,
      "height" : 183747,
      "txfee" : 100000,
      "balance" : 0,
      "coin" : "BCO",
      "rpc" : "127.0.0.1:6332",
      "pubtype" : 27,
      "smartaddress" : "CEmDtjTGWqEjpu3rywZx3uCRyFb4xpGc2d",
      "status" : "active",
      "wiftype" : 176,
      "p2shtype" : 5,
      "installed" : true

contabo
      "rpc" : "127.0.0.1:6332",
      "height" : 183747,
      "balance" : 0,
      "p2shtype" : 5,
      "installed" : true,
      "txfee" : 100000,
      "status" : "active",
      "pubtype" : 27,
      "smartaddress" : "Btz5R65Y7WNj1FC6BEq4NeoGD8mAjS6FuV",
      "coin" : "BCO",
      "KMDvalue" : 0,
      "wiftype" : 176

bridgecoin-cli sendtoaddress "Btz5R65Y7WNj1FC6BEq4NeoGD8mAjS6FuV" 1
bridgecoin-cli sendtoaddress "Btz5R65Y7WNj1FC6BEq4NeoGD8mAjS6FuV" 1.2
"fee": -0.00045200

```

## BDL

```
https://github.com/bitdeal/bitdeal


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,38);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,50);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;

{\"coin\":\"BDL\",\"name\":\"bitdeal\",\"rpcport\":9332,\"pubtype\":38,\"p2shtype\":5,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/bitdeal/bitdeal
cd bitdeal
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/bitdeal*
mkdir ~/.bitdeal
echo "server=1" >> ~/.bitdeal/bitdeal.conf
echo "listen=0" >> ~/.bitdeal/bitdeal.conf
echo "listenonion=0" >> ~/.bitdeal/bitdeal.conf
echo "rpcport=11332" >> ~/.bitdeal/bitdeal.conf
echo "rpcuser=barterbdl" >> ~/.bitdeal/bitdeal.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitdeal/bitdeal.conf
chmod 0600 ~/.bitdeal/bitdeal.conf
bitdeald -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BDL\"}"

home
   {
      "rpc" : "127.0.0.1:11332",
      "pubtype" : 38,
      "wiftype" : 176,
      "status" : "active",
      "coin" : "BDL",
      "p2shtype" : 5,
      "txfee" : 100000,
      "smartaddress" : "GfUrivjSKpLNpfapFZETPHC5toRSidBkFt"
   },

contabo
   {
      "p2shtype" : 5,
      "status" : "active",
      "pubtype" : 38,
      "rpc" : "127.0.0.1:11332",
      "wiftype" : 176,
      "coin" : "BDL",
      "txfee" : 100000,
      "smartaddress" : "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd"
   },

bitdeal-cli sendtoaddress "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd" 7.16499979
"fee": -0.00074800,
"fee": -0.00045200,
```

## BITSOKO

```
{\"coin\":\"BITSOKO\",\"name\":\"bitsoko\",\"etomic\":\"0xb72627650f1149ea5e54834b2f468e5d430e67bf\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BITSOKO\"}"

home
      "wiftype" : 188,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "balance" : 0,
      "height" : -1,
      "installed" : false,
      "p2shtype" : 85,
      "coin" : "BITSOKO"

contabo
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "installed" : false,
      "status" : "active",
      "p2shtype" : 85,
      "balance" : 400,
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "wiftype" : 188,
      "coin" : "BITSOKO",
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BITSOKO\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BITSOKO\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BITSOKO\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Bitsoko (BITSOKO)
SWAP completed! 1202562631-3610038523 {"uuid":"698b191694d5e0ae54c225c0bb32f3aed6f63508dd916c036c0376f25b76096b","expiration":1530173692,"tradeid":0,"requestid":1202562631,"quoteid":3610038523,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BITSOKO","bobtomic":"0xb72627650f1149ea5e54834b2f468e5d430e67bf","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.75860148,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"5912968051811090433","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1530158636,"bobdeposit":"ce9066a4b4421106a87618576e580e69be09f45c4763acdaba8ac4d152fce3ed","alicepayment":"2e229d16bc3f5a1324592a949166ec6306d7d186cb925ce9557214b84506cca5","bobpayment":"2ce335afe67b3fac5124a457a5821188ce2feccbf7412875b8565547e1a9b83a","paymentspent":"a41cfe23e6afebeadfcb10f29e6e0662329ba9c32231b4843efe0ec7f0ddfc37","Apaymentspent":"82ecfd63726721d121c753b40c3f2d68426bda57eb71f3587771360430dde028","depositspent":"420a9c8964a13aa9d00a03eefb5518ab8729caa9a3a12d22827c90ffe9f224dc","method":"tradestatus","finishtime":1530158636}
bobdeposit https://etherscan.io/tx/0x0c8872619f5929877721354e5abb5aed8436fc4c1de4169dd1505af7ae6dedb0
alicepayment https://kmdexplorer.ru/tx/2e229d16bc3f5a1324592a949166ec6306d7d186cb925ce9557214b84506cca5
bobpayment https://etherscan.io/tx/0xcaa3a488d9ab2a1c51654f1faabc9c2a3a7e7523a08eddf6fdaec8cbdef7b479

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"BITSOKO\",\"fixed\":1}"
```

## BLK

```
https://bitcointalk.org/index.php?topic=469640.0
https://github.com/CoinBlack/blackcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1, 25);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1, 85);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1, 153);

{\"coin\":\"BLK\",\"name\":\"blackcoin\",\"confpath\":\"${HOME#}/.lore/blackcoin.conf\",\"isPoS\":1,\"rpcport\":15715,\"pubtype\":25,\"p2shtype\":85,\"wiftype\":153,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/janko33bd/bitcoin
cd bitcoin
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
configure: error: libdb_cxx headers missing, Bitcoin Core requires this library for wallet functionalit
make -j2
sudo make install
sudo strip /usr/local/bin/blackcoin*

cd ~/wallets
wget https://github.com/janko33bd/bitcoin/releases/download/fff/linux64.zip
unzip linux64.zip
cd linux64
sudo cp lore-cli /usr/local/bin/
sudo cp lored /usr/local/bin/
sudo chmod 755 /usr/local/bin/lore*
mkdir ~/.lore
echo "server=1" >> ~/.lore/blackcoin.conf
echo "txindex=1" >> ~/.lore/blackcoin.conf
echo "listen=0" >> ~/.lore/blackcoin.conf
echo "listenonion=1" >> ~/.lore/blackcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.lore/blackcoin.conf
echo "rpcuser=barterblk" >> ~/.lore/blackcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.lore/blackcoin.conf
echo "rpcworkqueue=64" >> ~/.lore/blackcoin.conf
echo "rpcthreads=16" >> ~/.lore/blackcoin.conf
chmod 0600 ~/.lore/blackcoin.conf
lored -daemon

cd
megadl 'https://mega.nz/#!R64nQARY!o8Ovl-2OLWMF6quSfpEXPEbcsmHiLhPegSnaHQXgR6I'
unzip bootstrap_blackcoin_1631800.zip
lored -daemon -loadblock=/home/barterdex/bootstrap.dat

curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BLK\"}"

home
      "p2shtype" : 85,
      "type" : "PoS",
      "pubtype" : 25,
      "txfee" : 100000,
      "status" : "active",
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:15715",
      "wiftype" : 153,
      "smartaddress" : "BS61vWrh6UJzC2mgw6uK5eeriF5BVyo2V5",
      "balance" : 0,
      "installed" : true,
      "coin" : "BLK",
      "height" : 1909844

contabo
      "balance" : 135.37556669,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:15715",
      "installed" : true,
      "coin" : "BLK",
      "type" : "PoS",
      "pubtype" : 25,
      "KMDvalue" : 12.19733402,
      "height" : 1909862,
      "smartaddress" : "B6JsSsUxh9SyNNuv8QARQQFgx8FHKXK1wd",
      "status" : "active",
      "txfee" : 100000,
      "wiftype" : 153
```

## BLOCK

```
https://github.com/BlocknetDX/BlockDX


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1, 26);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1, 28);
base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1, 154)

"relayfee" : 0.00010000,

{\"coin\":\"BLOCK\",\"name\":\"blocknetdx\",\"rpcport\":41414,\"pubtype\":26,\"p2shtype\":28,\"wiftype\":154,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/BlocknetDX/BlockDX
cd BlockDX
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/blocknet*
mkdir ~/.blocknetdx
echo "server=1" >> ~/.blocknetdx/blocknetdx.conf
echo "litemode=1" >> ~/.blocknetdx/blocknetdx.conf
echo "staking=0" >> ~/.blocknetdx/blocknetdx.conf
echo "listen=0" >> ~/.blocknetdx/blocknetdx.conf
echo "#proxy=127.0.0.1:9050" >> ~/.blocknetdx/blocknetdx.conf
echo "rpcuser=barterblock" >> ~/.blocknetdx/blocknetdx.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.blocknetdx/blocknetdx.conf
chmod 0600 ~/.blocknetdx/blocknetdx.conf
blocknetdxd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BLOCK\"}"

home
   {
      "status" : "active",
      "coin" : "BLOCK",
      "p2shtype" : 28,
      "rpc" : "127.0.0.1:41414",
      "smartaddress" : "BqRcud9yoems1TumxXEdZmveLkL8Dj9TGg",
      "wiftype" : 154,
      "txfee" : 10000,
      "pubtype" : 26
   },

contabo
   {
      "status" : "active",
      "txfee" : 10000,
      "pubtype" : 26,
      "p2shtype" : 28,
      "coin" : "BLOCK",
      "wiftype" : 154,
      "rpc" : "127.0.0.1:41414",
      "smartaddress" : "BVeURynFQKurBp419pVjtXXUadWDzXGBdG"
   },

blocknetdx-cli sendtoaddress "BqRcud9yoems1TumxXEdZmveLkL8Dj9TGg" 1.787
"fee" : -0.00002260,
blocknetdx-cli sendtoaddress "BqRcud9yoems1TumxXEdZmveLkL8Dj9TGg" 2.1444
```

## BNB

```
{\"coin\":\"BNB\",\"name\":\"binance-coin\",\"etomic\":\"0xB8c77482e45F1F44dE1745F52C74426C631bDD52\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BNB\"}"

home
      "status" : "active",
      "balance" : 0,
      "height" : -1,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "coin" : "BNB",
      "txfee" : 1000,
      "pubtype" : 0

contabo
      "wiftype" : 188,
      "height" : -1,
      "coin" : "BNB",
      "installed" : false,
      "balance" : 1.01,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "txfee" : 1000,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BNB\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BNB\",\"rel\":\"KMD\",\"price\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BNB\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":1.2}"
Binance Coin (BNB)
SWAP completed! 2287206822-3001442527 {"uuid":"1449cbd5ad723952927b12e06d7a338a0e17e020e656e74b6918b790ee1eb315","expiration":1527633739,"tradeid":0,"requestid":2287206822,"quoteid":3001442527,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BNB","bobtomic":"0xB8c77482e45F1F44dE1745F52C74426C631bDD52","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.07032909,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12607321946846789633","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.07033909, 0.08010000, 0.07034909, 0.08011000, 0.07914022, 0, 0, 0.07913022, 0, 0, 0],"result":"success","status":"finished","finishtime":1527619020,"bobdeposit":"9b8e66407e95873ddd5a51398d26df8cff49f9880d16e0ba25b5e5a79bc8769e","alicepayment":"70a0542faafbc1ade9b28dfce8e29f7736a430c781a250c89b84aaa620ffa0b0","bobpayment":"f90f93214cc0a8a0061b81b4304377fc64a1e2bbcf4d2facc7812f0a2acc8a8f","paymentspent":"c9a65d09bdc32e12c4f6dfc117471238d4647352df48712a23d713f527e93b49","Apaymentspent":"294a1ed5ec032eea8bee99758d087378110bb3a0eac057e5633a6cc76610aed8","depositspent":"008ab2d79e3a5533d4fb8fa15536327d6369083b78fee077b13bad258e438514","method":"tradestatus","finishtime":1527619020}
bobdeposit https://etherscan.io/tx/0xb5053663bc0c1f6b338f63c725fa5ce0e5f872dabe5f92ebf873d584545e1037
alicepayment https://kmdexplorer.ru/tx/70a0542faafbc1ade9b28dfce8e29f7736a430c781a250c89b84aaa620ffa0b0
bobpayment https://etherscan.io/tx/0x5b94b17a303d05e43711b6e7767438dbf6b6698036800d6438eb5f2990cce968

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BNB\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"binance-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BNB\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"binance-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BNB\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"binance-coin\",\"refrel\":\"coinmarketcap\"}"
```

## BNT

```
{\"coin\":\"BNT\",\"name\":\"bancor\",\"etomic\":\"0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BNT\"}"

home
      "coin" : "BNT",
      "p2shtype" : 85,
      "pubtype" : 0,
      "height" : -1,
      "installed" : false,
      "txfee" : 1000,
      "balance" : 0,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "rpc" : "127.0.0.1:80"

contabo
      "wiftype" : 188,
      "status" : "active",
      "balance" : 0,
      "pubtype" : 0,
      "coin" : "BNT",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BNT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BNT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BNT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Bancor (BNT)
SWAP completed! 3396757584-658862646 {"uuid":"1001c6fc84608523381c406e3b6a6e35fad4aff01d0439d5f7dd960d0b85bc53","expiration":1527314877,"tradeid":0,"requestid":3396757584,"quoteid":658862646,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BNT","bobtomic":"0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70902895,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"15557954093716078593","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70903895, 0.08010000, 0.70904895, 0.08011000, 0.79767756, 0, 0, 0.79766756, 0, 0, 0],"result":"success","status":"finished","finishtime":1527300079,"bobdeposit":"c750905e7d55b5e913c30ea1d28f40a0bea39debead1ab80f047980829d1faa7","alicepayment":"38566ef0dc8a6bd4b8e1daecbf78ac281be96e3ebd31ee24e9612c75eff14e51","bobpayment":"d5e95100f8f5a08985bd803c5225f3f2edb6ad97c88e9dca53917a02a610818b","paymentspent":"bd490524e3ebc848cb210bc78d9ef943994d05c99a3affd000839b7453c36060","Apaymentspent":"49edbeb1d86cfcf64bdbfb4ed8065e377572ad3173ac1f76bf6be9ceb6a8d4f8","depositspent":"e22f32b59bb8adae2b539eacc14c755f71109711c778a68a7d1b003b6c619125","method":"tradestatus","finishtime":1527300079}
bobdeposit https://etherscan.io/tx/0xa771516bbfe71177bab3e3085745e7cd536b5b6d3420ddea59a980f51acd1674
alicepayment https://kmdexplorer.ru/tx/38566ef0dc8a6bd4b8e1daecbf78ac281be96e3ebd31ee24e9612c75eff14e51
bobpayment https://etherscan.io/tx/0xed57a2608262002aca159f76f6ef76a3ce3a6025e3aad843addef5fff7d9d14c

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BNT\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"bancor\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BNT\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"bancor\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BNT\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"bancor\",\"refrel\":\"coinmarketcap\"}"
```

## BOX

```
{\"coin\":\"BOX\",\"name\":\"beonbox\",\"etomic\":\"0x01e579be97433f861340268521a7a2ab9829082c\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BOX\"}"

home
      "balance" : 0,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "pubtype" : 0,
      "wiftype" : 188,
      "height" : -1,
      "txfee" : 1000,
      "coin" : "BOX",
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "txfee" : 1000,
      "coin" : "BOX",
      "wiftype" : 188,
      "balance" : 50,
      "status" : "active",
      "p2shtype" : 85,
      "installed" : false,
      "pubtype" : 0,
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BOX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BOX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BOX\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Beonbox (BOX)
SWAP completed! 285830986-1656260584 {"uuid":"222ee5da474ab714a9d8aca868d6e37bde48ba22784eb076a788a14dd0b025eb","expiration":1529808057,"tradeid":0,"requestid":285830986,"quoteid":1656260584,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BOX","bobtomic":"0x01e579be97433f861340268521a7a2ab9829082c","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.71787946,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12639807569148968961","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1529792784,"bobdeposit":"e4a6c325df1bcd1c3058499395f6e5285458f49e8329ffc1307052cc21711892","alicepayment":"d59f198b98e4839ff0ff561861ad478b0257ed2826a38bcedd4c255c457d4948","bobpayment":"b8d370644db740d1d1b27825647bc9f10b133075c1d02c4786f3d3d174353743","paymentspent":"524f53e2805dec488891f70a2b7c90ba3346b55c67d5d6a14f3e9770ea67582d","Apaymentspent":"a5da292b2a40a69b5359e8ae14ec81ccf3d330c269aa77d74f6bbfad2dd34c84","depositspent":"1f5d2845844934e185d3698cce6f327cd28b595ff063c1c80f5c167803ff92f9","method":"tradestatus","finishtime":1529792784}
bobdeposit https://etherscan.io/tx/0x27deed277d81fbfff9ee04288840f3443a74ac7365525cd0ba4c74fa23b1a845
alicepayment https://kmdexplorer.ru/tx/d59f198b98e4839ff0ff561861ad478b0257ed2826a38bcedd4c255c457d4948
bobpayment https://etherscan.io/tx/0x54312c8f1ea63965c8a45944979ed6dad2e6a3956dbca2eb2146caef3290b817

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"BOX\",\"fixed\":1}"
```

## BSD

```
https://bitcointalk.org/index.php?topic=1370307
https://github.com/LIMXTEC/BitSend


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,102);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 10000;
DEFAULT_BLOCK_MIN_TX_FEE = 1000;
DEFAULT_INCREMENTAL_RELAY_FEE = 1000;
DUST_RELAY_TX_FEE = 1000;
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_TRANSACTION_MINFEE = 1000;
WALLET_INCREMENTAL_RELAY_FEE = 5000;

{\"coin\":\"BSD\",\"name\":\"bitsend\",\"rpcport\":8800,\"pubtype\":102,\"p2shtype\":5,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/LIMXTEC/BitSend
cd BitSend
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/bitsend*
mkdir ~/.bitsend
echo "server=1" >> ~/.bitsend/bitsend.conf
echo "litemode=1" >> ~/.bitsend/bitsend.conf
echo "listen=0" >> ~/.bitsend/bitsend.conf
echo "listenonion=1" >> ~/.bitsend/bitsend.conf
echo "#proxy=127.0.0.1:9050" >> ~/.bitsend/bitsend.conf
echo "rpcuser=barterbsd" >> ~/.bitsend/bitsend.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitsend/bitsend.conf
chmod 0600 ~/.bitsend/bitsend.conf
bitsendd -daemon


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BSD\"}"

home
   {
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:8800",
      "coin" : "BSD",
      "wiftype" : 204,
      "status" : "active",
      "txfee" : 10000,
      "smartaddress" : "iR7TjsosmMzTAQWMpQYrRJcSB5upBVhyBc",
      "pubtype" : 102
   },

contabo
   {
      "smartaddress" : "i5LKGES9N38SLkeb1hoxk4DGQy5v3D5nFp",
      "wiftype" : 204,
      "pubtype" : 102,
      "rpc" : "127.0.0.1:8800",
      "status" : "active",
      "txfee" : 10000,
      "p2shtype" : 5,
      "coin" : "BSD"
   },

bitsend-cli sendtoaddress "i5LKGES9N38SLkeb1hoxk4DGQy5v3D5nFp" 4.29704741
"fee": -0.00004520,
```

## BTA

```
https://bitcointalk.org/index.php?topic=2297895.msg23319563#msg23319563
https://github.com/BTA-BATA/BATA-SOURCE


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = list_of(25);                                           // Bata addresses start with 'B'
base58Prefixes[SCRIPT_ADDRESS] = list_of(5);                                            // Bata script addresses start with '3'
base58Prefixes[SCRIPT_ADDRESS2] = list_of(85);                                          // Bata script addresses start with 'b'
base58Prefixes[SECRET_KEY] =     list_of(188);                                          // Bata private keys start with '2'

src/main.h
DEFAULT_TX_FEE = 100000; // 0.001 BTA

{\"coin\":\"BTA\",\"name\":\"bata\",\"rpcport\":5493,\"pubtype\":25,\"p2shtype\":5,\"wiftype\":188,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/BTA-BATA/BATA-SOURCE
cd BATA-SOURCE
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/bata*
mkdir ~/.bata
echo "server=1" >> ~/.bata/bata.conf
echo "txindex=1" >> ~/.bata/bata.conf
echo "listen=0" >> ~/.bata/bata.conf
echo "rpcuser=barterbta" >> ~/.bata/bata.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bata/bata.conf
chmod 0600 ~/.bata/bata.conf
batad -daemon

wget https://bata.money/downloads/bootstrap.zip
wget http://crypt.midnightminer.net/bootstraps/bata/bootstrap.zip
unzip bootstrap.zip
rm bootstrap.zip
batad -daemon -loadblock=$HOME/bootstrap.dat
rm ~/bootstrap.dat

curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTA\"}"

home
   {
      "pubtype" : 25,
      "status" : "active",
      "coin" : "BTA",
      "wiftype" : 188,
      "p2shtype" : 5,
      "txfee" : 100000,
      "smartaddress" : "BS61vWrh6UJzC2mgw6uK5eeriF5BVyo2V5",
      "rpc" : "127.0.0.1:5493"
   },

contabo
   {
      "smartaddress" : "B6JsSsUxh9SyNNuv8QARQQFgx8FHKXK1wd",
      "pubtype" : 25,
      "rpc" : "127.0.0.1:5493",
      "txfee" : 100000,
      "coin" : "BTA",
      "p2shtype" : 5,
      "wiftype" : 188,
      "status" : "active"
   },

bata-cli sendtoaddress "B6JsSsUxh9SyNNuv8QARQQFgx8FHKXK1wd" 1.72021694
"fee" : -0.03987317,
bata-cli sendtoaddress "BCZ4wcPeeXcGt2FM18WofQts96hfK8gU1b" 33.075
"fee" : -0.04039384,
```

## BTC

```


cd ~/wallets
git clone https://github.com/bitcoin/bitcoin -b 0.15
cd bitcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq --enable-experimental-asm
#--with-gui=qt5
make -j4
sudo make install
sudo strip /usr/local/bin/bitcoin*
mkdir ~/.bitcoin
echo "server=1" >> ~/.bitcoin/bitcoin.conf
echo "txindex=1" >> ~/.bitcoin/bitcoin.conf
echo "rpcworkqueue=64" >> ~/.bitcoin/bitcoin.conf
echo "rpcthreads=16" >> ~/.bitcoin/bitcoin.conf
echo "rpcuser=barterbtc" >> ~/.bitcoin/bitcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitcoin/bitcoin.conf
echo "onion=127.0.0.1:9050" >> ~/.bitcoin/bitcoin.conf
echo "listen=1" >> ~/.bitcoin/bitcoin.conf
echo "listenonion=1" >> ~/.bitcoin/bitcoin.conf
echo "bind=127.0.0.1" >> ~/.bitcoin/bitcoin.conf
chmod 0600 ~/.bitcoin/bitcoin.conf
bitcoind -daemon

home
   {
      "txfee" : 0,
      "smartaddress" : "1NdwJoQVLxj5kCHXKcaLxWrByddbgyHofb",
      "wiftype" : 128,
      "p2shtype" : 5,
      "status" : "active",
      "pubtype" : 0,
      "rpc" : "127.0.0.1:8332",
      "coin" : "BTC"
   },

contabo
   {
      "txfee" : 0,
      "wiftype" : 128,
      "status" : "active",
      "rpc" : "127.0.0.1:8332",
      "p2shtype" : 5,
      "smartaddress" : "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj",
      "coin" : "BTC",
      "pubtype" : 0
   },

```

## BTCL

```
{\"coin\":\"BTCL\",\"name\":\"btclite\",\"etomic\":\"0x5acd19b9c91e596b1f062f18e3d02da7ed8d1e50\",\"rpcport\":80}
https://bitcointalk.org/index.php?topic=2471229.0

home
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "p2shtype" : 85,
      "coin" : "BTCL",
      "installed" : false,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "txfee" : 1000,
      "wiftype" : 188,
      "status" : "active",
      "height" : -1

contabo
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false,
      "wiftype" : 188,
      "pubtype" : 0,
      "p2shtype" : 85,
      "coin" : "BTCL",
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "balance" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BTCL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BTCL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BTCL\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BTCL\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
BTC Lite (BTCL)
SWAP completed! 335678143-1360712871 {"expiration":1522514170,"tradeid":0,"requestid":335678143,"quoteid":1360712871,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BTCL","bobtomic":"0x5acd19b9c91e596b1f062f18e3d02da7ed8d1e50","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.69072005,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"13822459659570511873","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.69073005, 0.08010000, 0.69074005, 0.08011000, 0.77708005, 0, 0, 0.77707005, 0, 0, 0],"result":"success","status":"finished","finishtime":1522498824,"bobdeposit":"7c58122a2474eb289370bf2241218c5222ca7f8d570c887b20b5c872878880ce","alicepayment":"0ef8a80fa2b5cad3a0b5a24b9b9a2b90c1d3d6e6251d922002241dba8d927180","bobpayment":"941555a0ab9dee41b60c50491924a650ea20343b9e08bab3be5004647678d694","paymentspent":"91cc769dc3a9503b63cab48dd2442c41124c562ed4c5742d7a0d281bcecc8e6c","Apaymentspent":"04234ba503174e84ef2bd94a66c04d4de1a831051830f20a1f4590e2297f4f6b","depositspent":"e1334882ece975ef829841a0285f12f9febf65c6732db1bc8ac1b3287c4f6685","method":"tradestatus","finishtime":1522498824}
bobdeposit https://etherscan.io/tx/0xa5353afea1b54d2e542001c175ca4785b01f92ea5825580e5afbebb69fc8f7ae
alicepayment https://kmd.explorer.supernet.org/tx/0ef8a80fa2b5cad3a0b5a24b9b9a2b90c1d3d6e6251d922002241dba8d927180
bobpayment https://etherscan.io/tx/0x952c73ecc2fabca29c6218f09bb63c8d747842d4b57c2e99beb0506e3126a99e
```

## BTCP

```
https://bitcointalk.org/index.php?topic=2675257.0
https://github.com/BTCPrivate/BitcoinPrivate


src/chainparams.cpp
// guarantees the first 2 characters, when base58 encoded, are "b1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x13,0x25};
// guarantees the first 2 characters, when base58 encoded, are "bx"
base58Prefixes[SCRIPT_ADDRESS]     = {0x13,0xAF};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

{\"coin\":\"BTCP\",\"name\":\"btcprivate\",\"rpcport\":7932,\"taddr\":19,\"pubtype\":37,\"p2shtype\":175,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/BTCPrivate/BitcoinPrivate
cd BitcoinPrivate
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./btcputil/build.sh --disable-tests --disable-rust -j4
sudo cp src/btcpd /usr/local/bin/
sudo cp src/btcp-cli /usr/local/bin/
sudo strip /usr/local/bin/btcp*
mkdir ~/.btcprivate
echo "server=1" >> ~/.btcprivate/btcprivate.conf
echo "txindex=1" >> ~/.btcprivate/btcprivate.conf
echo "listen=0" >> ~/.btcprivate/btcprivate.conf
echo "listenonion=0" >> ~/.btcprivate/btcprivate.conf
echo "#proxy=127.0.0.1:9050" >> ~/.btcprivate/btcprivate.conf
echo "rpcuser=barterbtcp" >> ~/.btcprivate/btcprivate.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.btcprivate/btcprivate.conf
chmod 0600 ~/.btcprivate/btcprivate.conf
btcpd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTCP\"}"

home
      "installed" : true,
      "coin" : "BTCP",
      "status" : "active",
      "p2shtype" : 175,
      "KMDvalue" : 0,
      "wiftype" : 128,
      "pubtype" : 37,
      "balance" : 0,
      "rpc" : "127.0.0.1:7932",
      "txfee" : 10000,
      "smartaddress" : "b1S78yzFV67mBsUc6Gm1KZ1psbuLfybM88D",
      "height" : 280757

contabo
      "smartaddress" : "b16KzWLskgnuB3pkKU4GRsmRhqnWmsB6UFT",
      "KMDvalue" : 0,
      "coin" : "BTCP",
      "p2shtype" : 175,
      "txfee" : 10000,
      "installed" : true,
      "wiftype" : 128,
      "rpc" : "127.0.0.1:7932",
      "status" : "active",
      "height" : 280757,
      "pubtype" : 37,
      "balance" : 1.50799324


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BTCP\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"bitcoin-private\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BTCP\",\"rel\":\"BTC\",\"margin\":0.07,\"refbase\":\"bitcoin-private\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BTCP\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"bitcoin-private\",\"refrel\":\"coinmarketcap\"}"
```

## BTCZ

```
https://bitcointalk.org/index.php?topic=3086664.0
https://github.com/btcz/bitcoinz

// guarantees the first 2 characters, when base58 encoded, are "t1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x1C,0xB8};
base58Prefixes[SCRIPT_ADDRESS]     = {0x1C,0xBD};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

{\"coin\":\"BTCZ\",\"name\":\"bitcoinz\",\"rpcport\":1979,\"taddr\":28,\"pubtype\":184,\"p2shtype\":189,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/btcz/bitcoinz
cd bitcoinz
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh -j2
sudo cp src/bitcoinzd src/bitcoinz-cli /usr/local/bin/
sudo strip /usr/local/bin/bitcoinz*
mkdir ~/.bitcoinz
echo "server=1" >> ~/.bitcoinz/bitcoinz.conf
echo "txindex=1" >> ~/.bitcoinz/bitcoinz.conf
echo "listen=0" >> ~/.bitcoinz/bitcoinz.conf
echo "listenonion=0" >> ~/.bitcoinz/bitcoinz.conf
echo "rpcuser=barterbtcz" >> ~/.bitcoinz/bitcoinz.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitcoinz/bitcoinz.conf
echo "rpcworkqueue=64" >> ~/.bitcoinz/bitcoinz.conf
echo "rpcthreads=16" >> ~/.bitcoinz/bitcoinz.conf
chmod 0600 ~/.bitcoinz/bitcoinz.conf
bitcoinzd -daemon


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTCZ\"}"

home
   {
      "height" : 13309,
      "rpc" : "127.0.0.1:1979",
      "pubtype" : 184,
      "txfee" : 10000,
      "status" : "active",
      "p2shtype" : 189,
      "smartaddress" : "t1fWYK8pdKHWgLqLRG3PU6Kx7EHpgVRNjCU",
      "coin" : "BTCZ",
      "wiftype" : 128
   },

contabo
   {
      "p2shtype" : 189,
      "smartaddress" : "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH",
      "rpc" : "127.0.0.1:1979",
      "status" : "active",
      "txfee" : 10000,
      "pubtype" : 184,
      "height" : 13321,
      "coin" : "BTCZ",
      "wiftype" : 128
   },

bitcoinz-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 10
"fee": -0.00000226
```

## BTG

```
https://github.com/BTCGPU/BTCGPU


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,38);  // prefix: G
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,23);  // prefix: A
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 1000;
src/policy/policy.h
DEFAULT_BLOCK_MIN_TX_FEE = 1000;
DEFAULT_INCREMENTAL_RELAY_FEE = 1000;
DUST_RELAY_TX_FEE = 3000;
src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_DISCARD_FEE = 10000;
DEFAULT_TRANSACTION_MINFEE = 1000;
WALLET_INCREMENTAL_RELAY_FEE = 5000;

{\"coin\":\"BTG\",\"name\":\"bitcoingold\",\"rpcport\":8332,\"pubtype\":38,\"p2shtype\":23,\"wiftype\":128,\"txfee\":10000}
{\"coin\":\"BTG\",\"name\":\"bitcoingold\",\"rpcport\":12332,\"pubtype\":38,\"p2shtype\":23,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/BTCGPU/BTCGPU
cd BTCGPU
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq --enable-experimental-asm
make -j4
sudo make install
sudo strip /usr/local/bin/bgold*
mkdir ~/.bitcoingold
echo "server=1" >> ~/.bitcoingold/bitcoingold.conf
echo "txindex=1" >> ~/.bitcoingold/bitcoingold.conf
echo "listen=0" >> ~/.bitcoingold/bitcoingold.conf
echo "listenonion=0" >> ~/.bitcoingold/bitcoingold.conf
echo "rpcport=12332" >> ~/.bitcoingold/bitcoingold.conf
echo "rpcuser=barterbtg" >> ~/.bitcoingold/bitcoingold.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitcoingold/bitcoingold.conf
chmod 0600 ~/.bitcoingold/bitcoingold.conf
bgoldd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTG\"}"

home
      "p2shtype" : 23,
      "txfee" : 10000,
      "rpc" : "127.0.0.1:12332",
      "installed" : true,
      "status" : "active",
      "wiftype" : 128,
      "pubtype" : 38,
      "smartaddress" : "GfUrivjSKpLNpfapFZETPHC5toRSidBkFt",
      "coin" : "BTG",
      "KMDvalue" : 0,
      "balance" : 0,
      "height" : 502802

contabo
      "installed" : true,
      "coin" : "BTG",
      "p2shtype" : 23,
      "wiftype" : 128,
      "height" : 502503,
      "txfee" : 10000,
      "KMDvalue" : 0,
      "balance" : 0,
      "rpc" : "127.0.0.1:12332",
      "smartaddress" : "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd",
      "pubtype" : 38,
      "status" : "active"

bgold-cli sendtoaddress "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd" 1
bgold-cli sendtoaddress "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd" 1.2
"fee": -0.00003771,

```

## BTK

```
{\"coin\":\"BTK\",\"name\":\"bitcointoken\",\"etomic\":\"0xdb8646F5b487B5Dd979FAC618350e85018F557d4\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTK\"}"

home
      "coin" : "BTK",
      "p2shtype" : 85,
      "txfee" : 1000,
      "installed" : false,
      "status" : "active",
      "balance" : 0,
      "wiftype" : 188,
      "pubtype" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "rpc" : "127.0.0.1:80",
      "height" : -1

contabo
      "wiftype" : 188,
      "p2shtype" : 85,
      "pubtype" : 0,
      "coin" : "BTK",
      "height" : -1,
      "balance" : 0,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false,
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BTK\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BTK\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BTK\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BTK\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
BitcoinToken (BTK)
SWAP completed! 2195163067-3280995117 {"uuid":"48c9de7a3ac326ae193cc8bbd1590678842bffb39219969b803aa25cf6be0d6e","expiration":1526588622,"tradeid":0,"requestid":2195163067,"quoteid":3280995117,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BTK","bobtomic":"0xdb8646F5b487B5Dd979FAC618350e85018F557d4","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.69072005,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"10877546663519977473","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.69073005, 0.08010000, 0.69074005, 0.08011000, 0.77708005, 0, 0, 0.77707005, 0, 0, 0],"result":"success","status":"finished","finishtime":1526573606,"bobdeposit":"cfbf7b8193c5e8f93189025e858c8d52a0632d2fb5436b3f1eb19de3d94a9fec","alicepayment":"b66165fc1de4ff6aee50d22f646fa365b410b2bfc42ea0177374beb847f49737","bobpayment":"47fe09a39ad22cb978116f21e1083b1c68b1a39e8d0f96d010c70b08e57ee6a0","paymentspent":"d0ca55492ad51cb981429672e59b6c988fea37fb1c464aeb0d6fe3d4cd9debb5","Apaymentspent":"0bb847b75412fe40affb207d6fb974774938ede64067ef12bbbb217fd84faa83","depositspent":"becd99dd11be47c88ed245eb746ca0c2b89b2f530d4ddc2f885ed9bf19887879","method":"tradestatus","finishtime":1526573606}
bobdeposit https://etherscan.io/tx/0x7e4b623cb5d87b0caf4ffef3f353448a03bb797641781916412bce6139d317c1
alicepayment https://kmdexplorer.ru/tx/b66165fc1de4ff6aee50d22f646fa365b410b2bfc42ea0177374beb847f49737
bobpayment https://etherscan.io/tx/0x08779d35462914fdbd59c93665c61e4f04861b55cc7d37e4921874f794e806b7
```

## BTM

```
{\"coin\":\"BTM\",\"name\":\"bytom\",\"etomic\":\"0xcB97e65F07DA24D46BcDD078EBebd7C6E6E3d750\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTM\"}"

home
      "p2shtype" : 85,
      "pubtype" : 0,
      "balance" : 0,
      "coin" : "BTM",
      "txfee" : 1000,
      "status" : "active",
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "installed" : false

contabo
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false,
      "pubtype" : 0,
      "height" : -1,
      "txfee" : 1000,
      "coin" : "BTM",
      "balance" : 0,
      "p2shtype" : 85,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"BTM\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BTM\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BTM\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Bytom (BTM)
SWAP completed! 1775992749-2655925192 {"uuid":"a87e43ae9d7005c58b426dbb871119a334e996e03dbeade7b7901a620bc4ba31","expiration":1527368705,"tradeid":0,"requestid":1775992749,"quoteid":2655925192,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BTM","bobtomic":"0xcB97e65F07DA24D46BcDD078EBebd7C6E6E3d750","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.78077556,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"18144494919430963201","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.78078556, 0.08010000, 0.78079556, 0.08011000, 0.87839250, 0, 0, 0.87838250, 0, 0, 0],"result":"success","status":"finished","finishtime":1527353502,"bobdeposit":"baf77bebec770d3e4cdf930ff31973ee1c550528779278b4fb4842097bf82fa3","alicepayment":"c771005255abf12e62cf800bf350e13296a15a6e2bc96331bad565a690773b33","bobpayment":"725d14e661117ae6179cd2b5010ce84e09f5b4e21bb2e69a2926b0158be71b4e","paymentspent":"ce571e7a3f790aba8bd7b85b59e7d1b407fdb279ff8f01a517726817005e8b01","Apaymentspent":"114b5155e3cb708b4d85b98e67df2d51b5449a9a0818d6315d3ea63fffe30a1c","depositspent":"8b515bc675c4d1530ff555a734d76e53a699b88fe14f3791f332345d22e95fae","method":"tradestatus","finishtime":1527353502}
bobdeposit https://etherscan.io/tx/0xf6d549235c9cc5c4e97049be657493676b5ab4fb6a6622538d2e0a1ce8e10526
alicepayment https://kmdexplorer.ru/tx/c771005255abf12e62cf800bf350e13296a15a6e2bc96331bad565a690773b33
bobpayment https://etherscan.io/tx/0xd11955beffeb3abc40cece81448abf69adff1cb6c91d9bad0b7ff81d6d24b172

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BTM\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"bytom\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BTM\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"bytom\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"BTM\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"bytom\",\"refrel\":\"coinmarketcap\"}"
```

## BTNX

```
https://bitcointalk.org/index.php?topic=4541359.0
https://github.com/modcrypto/bitnexus


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,25);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,10);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,198);

{\"coin\":\"BTNX\",\"name\":\"bitnexus\",\"confpath\":\"${HOME#}/.bitcoinnodecore/bitnexus.conf\",\"rpcport\":9191,\"pubtype\":25,\"p2shtype\":10,\"wiftype\":198,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/modcrypto/bitnexus
cd bitnexus
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/bitnexus*
mkdir ~/.bitcoinnodecore
echo "server=1" >> ~/.bitcoinnodecore/bitnexus.conf
echo "txindex=1" >> ~/.bitcoinnodecore/bitnexus.conf
echo "litemode=1" >> ~/.bitcoinnodecore/bitnexus.conf
echo "listen=0" >> ~/.bitcoinnodecore/bitnexus.conf
echo "listenonion=0" >> ~/.bitcoinnodecore/bitnexus.conf
echo "rpcuser=barterbtnx" >> ~/.bitcoinnodecore/bitnexus.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitcoinnodecore/bitnexus.conf
echo "rpcworkqueue=64" >> ~/.bitcoinnodecore/bitnexus.conf
echo "rpcthreads=16" >> ~/.bitcoinnodecore/bitnexus.conf
chmod 0600 ~/.bitcoinnodecore/bitnexus.conf
bitnexusd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTNX\"}"

home
      "pubtype" : 25,
      "KMDvalue" : 0,
      "wiftype" : 198,
      "installed" : true,
      "coin" : "BTNX",
      "smartaddress" : "BS61vWrh6UJzC2mgw6uK5eeriF5BVyo2V5",
      "height" : 74835,
      "rpc" : "127.0.0.1:9191",
      "txfee" : 10000,
      "status" : "active",
      "p2shtype" : 10,
      "balance" : 0

contabo
      "installed" : true,
      "balance" : 0,
      "pubtype" : 25,
      "txfee" : 10000,
      "coin" : "BTNX",
      "height" : 74835,
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:9191",
      "wiftype" : 198,
      "smartaddress" : "B6JsSsUxh9SyNNuv8QARQQFgx8FHKXK1wd",
      "status" : "active",
      "p2shtype" : 10

bitnexus-cli sendtoaddress "B6JsSsUxh9SyNNuv8QARQQFgx8FHKXK1wd" 1
"fee": -0.00004520


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"BTNX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BTNX\",\"rel\":\"KMD\",\"relvolume\":0.1,\"price\":0.12}"
BitNexus (BTNX)
SWAP completed! 2031640094-2343233417 {"uuid":"6322660d2d1d90ef1024a37698d55de4ba020888ccc977e39283d5ff9a61864e","expiration":1531128819,"tradeid":0,"requestid":2031640094,"quoteid":2343233417,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"BTNX","srcamount":0.87243222,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.10009000,"alicetxfee":0.00001000,"aliceid":"943821569361051649","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.87253222, 0.10010000, 0.87263222, 0.10011000, 0.98168624, 0, 0, 0.98158624, 0, 0, 0],"result":"success","status":"finished","finishtime":1531114008,"bobdeposit":"ff76e17ffa98cd2363544c362ea3c1f545e3d34806c5a7c0696c5c5d06b414af","alicepayment":"be323406e6a7354981fb46b057c21334223f83454cd717d06de808fa61e0beca","bobpayment":"938b2d6988d1b3f77360d61e3a84376c5b19bcf0601b77ae6471b4a1b08c8439","paymentspent":"6e93022a3e26e51a4b493ca471d49f818d2b2cc5eb596b579de74edd6ae5dcf6","Apaymentspent":"010c25a976f48261605648c95fec3e9789a6cb0837de11e5b1346f993d9f79b8","depositspent":"4aa52d5b9f0fcc592b907ff9f6882f88e251f6f77093be4232ce093b957e6b7d","alicedexfee":"14a35345cadfb8464f05645425c1abe0a552c925ee3469692ad9349d3d207a8e","method":"tradestatus","finishtime":1531114008}
bobdeposit http://explorer.bitnexus.online/tx/ff76e17ffa98cd2363544c362ea3c1f545e3d34806c5a7c0696c5c5d06b414af
alicepayment https://kmdexplorer.ru/tx/be323406e6a7354981fb46b057c21334223f83454cd717d06de808fa61e0beca
bobpayment http://explorer.bitnexus.online/tx/938b2d6988d1b3f77360d61e3a84376c5b19bcf0601b77ae6471b4a1b08c8439

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"BTNX\",\"fixed\":1}"
```

## BTX

```
https://bitcointalk.org/index.php?topic=1883902.0
https://github.com/LIMXTEC/BitCore

src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,0);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1,128);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;
src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;

{\"coin\":\"BTX\",\"name\":\"bitcore\",\"rpcport\":8556,\"pubtype\":0,\"p2shtype\":5,\"wiftype\":128,\"txfee\":50000}


cd ~/wallets
git clone https://github.com/LIMXTEC/BitCore
cd BitCore
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/bitcore*
mkdir ~/.bitcore
echo "server=1" >> ~/.bitcore/bitcore.conf
echo "listen=0" >> ~/.bitcore/bitcore.conf
echo "listenonion=1" >> ~/.bitcore/bitcore.conf
echo "#proxy=127.0.0.1:9050" >> ~/.bitcore/bitcore.conf
echo "rpcuser=barterbtx" >> ~/.bitcore/bitcore.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.bitcore/bitcore.conf
chmod 0600 ~/.bitcore/bitcore.conf
bitcored -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"BTX\"}"

home
   {
      "smartaddress" : "1NdwJoQVLxj5kCHXKcaLxWrByddbgyHofb",
      "p2shtype" : 5,
      "txfee" : 1000,
      "wiftype" : 128,
      "status" : "active",
      "rpc" : "127.0.0.1:8556",
      "estimatedrate" : 20,
      "pubtype" : 0,
      "coin" : "BTX"
   },

contabo
   {
      "wiftype" : 128,
      "coin" : "BTX",
      "p2shtype" : 5,
      "txfee" : 50000,
      "rpc" : "127.0.0.1:8556",
      "pubtype" : 0,
      "smartaddress" : "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj",
      "status" : "active"
   },

bitcore-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 0.58239334
"fee": -0.00037400,
```

## CDT

```
{\"coin\":\"CDT\",\"name\":\"blox\",\"etomic\":\"0x177d39AC676ED1C67A2b268AD7F1E58826E5B0af\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CDT\"}"

home
      "installed" : false,
      "pubtype" : 0,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0,
      "height" : -1,
      "coin" : "CDT",
      "p2shtype" : 85,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "status" : "active"

hetzner
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "installed" : false,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "height" : -1,
      "balance" : 880,
      "coin" : "CDT",
      "pubtype" : 0,
      "status" : "active",
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"CDT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"CDT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Blox (CDT)
SWAP completed! 1546250035-719788540 {"uuid":"933d075bf3875edcba18caf8f374c78b4c0d987803f01215037c3dfa5e636719","expiration":1531462608,"tradeid":0,"requestid":1546250035,"quoteid":719788540,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"CDT","bobtomic":"0x177d39AC676ED1C67A2b268AD7F1E58826E5B0af","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.75432255,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"11915723909497356289","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531448748,"bobdeposit":"dfb6e75b442ca290ec7bac9b3c8fb09231cb8c0a38a967140618dc085838a26f","alicepayment":"8ca99897c9c48782e624aacce20ee76eb26840b3d69e8dd7d1fab5e8bcb6e638","bobpayment":"9f9107c7958a1b08c0ef1eadbbbf64b01545184645cd0d1a1a19bcc91837891b","paymentspent":"493fbd64c809b09f994a43283065478058fc7a92e28eeb0f1d951c4a261173d8","Apaymentspent":"6e02ff52432b70e322350e5002a831771bda2c19266cd95729333a7c243e3399","depositspent":"9aa360f45ca205f164d31e690d4b808126e0611b4a3300b810b895f8d09f9d85","alicedexfee":"51a7946d25ed04078562529795d4d60672a759ba4e5152d50963a4916362bc20","method":"tradestatus","finishtime":1531448748}
bobdeposit https://etherscan.io/tx/0x65dcf7e9d82138c73692f65b6fc49414b3a7ee1b6fea74d6762418ddef09f460
alicepayment https://kmdexplorer.ru/tx/8ca99897c9c48782e624aacce20ee76eb26840b3d69e8dd7d1fab5e8bcb6e638
bobpayment https://etherscan.io/tx/0x95246a1ca19a285e53b75d5bdac8934a5d66710b3ac3cd8d2026eabc3a874dd2

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CDT\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"blox\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CDT\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"blox\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CDT\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"blox\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CDT\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"blox\",\"refrel\":\"coinmarketcap\"}"
```

## CENNZ

```
{\"coin\":\"CENNZ\",\"name\":\"centrality\",\"etomic\":\"0x1122b6a0e00dce0563082b6e2953f3a943855c1f\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CENNZ\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"centrality\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CENNZ\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"centrality\",\"refrel\":\"coinmarketcap\"}"

home
      "coin" : "CENNZ",
      "height" : -1,
      "pubtype" : 0,
      "wiftype" : 188,
      "installed" : false,
      "balance" : 0,
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85

contabo
      "status" : "active",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "height" : -1,
      "pubtype" : 0,
      "wiftype" : 188,
      "coin" : "CENNZ",
      "installed" : false,
      "balance" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"CENNZ\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"CENNZ\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"CENNZ\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Centrality (CENNZ)
SWAP completed! 3886934368-1689579601 {"expiration":1523220724,"tradeid":0,"requestid":3886934368,"quoteid":1689579601,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"CENNZ","bobtomic":"0x1122b6a0e00dce0563082b6e2953f3a943855c1f","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76587193,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"5954376764435595265","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76588193, 0.08010000, 0.76589193, 0.08011000, 0.86162592, 0, 0, 0.86161592, 0, 0, 0],"result":"success","status":"finished","finishtime":1523205572,"bobdeposit":"e96e296b9aa3658a7165e478aa664f87ecf551b314aae10069e3e00cf930db56","alicepayment":"9020cdae0e513386fae2c2f88ea440d6df2071f10b2f1173cfde348a4eda560f","bobpayment":"bbe837f25aa5a1a55032765aa2860ce403f4fd5abddc7ba0c67683b44f5d7ae9","paymentspent":"d15c24f12f7c24971ab25731a11e4afeef5488139588c5f68bb7b63fce5f99fd","Apaymentspent":"f1f8bb8fb83278c4b570844d3efa9884e74464ad1ee4255b54ad7a9c39139e3c","depositspent":"2b1f1d71b60a3ee838a92c776b823b7bf4b38875a84859a789ab84a6e169ca9d","method":"tradestatus","finishtime":1523205572}
bobdeposit https://etherscan.io/tx/0xc64924720104c939d209754ea2e34e79e60d8a59ba1a161924988c2520a6fe3a
alicepayment https://kmd.explorer.supernet.org/tx/9020cdae0e513386fae2c2f88ea440d6df2071f10b2f1173cfde348a4eda560f
bobpayment https://etherscan.io/tx/0x9cf6c72bd81f56cff16f3f8d7540944d59851e588f96c003aba4da2762e3f0bb

```

## CHIPS

```
https://bitcointalk.org/index.php?topic=2078449
https://github.com/jl777/chips3
https://github.com/jl777/chipsln


{\"coin\":\"CHIPS\", \"name\": \"chips\", \"rpcport\":57776,\"pubtype\":60, \"p2shtype\":85, \"wiftype\":188, \"txfee\":10000}


cd ~/wallets
git clone https://github.com/jl777/chips3
cd chips3
git checkout dev
git pull
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq --enable-experimental-asm
make -j4
sudo make install
sudo strip /usr/local/bin/chips*
mkdir ~/.chips
echo "server=1" >> ~/.chips/chips.conf
echo "txindex=1" >> ~/.chips/chips.conf
echo "listen=0" >> ~/.chips/chips.conf
echo "listenonion=0" >> ~/.chips/chips.conf
echo "rpcuser=barterchips" >> ~/.chips/chips.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.chips/chips.conf
echo "rpcworkqueue=64" >> ~/.chips/chips.conf
echo "rpcthreads=16" >> ~/.chips/chips.conf
chmod 0600 ~/.chips/chips.conf
chipsd -addnode=5.9.253.195 -daemon


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CHIPS\"}"

contabo
   {
      "smartaddress" : "RB8yufv3YTfdzYnwz5paNnnDynGJG6WsqD",
      "p2shtype" : 85,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:57776",
      "status" : "active",
      "coin" : "CHIPS",
      "pubtype" : 60,
      "txfee" : 10000
   },
```

## CIX

```
{\"coin\":\"CIX\",\"name\":\"cryptonetix\",\"etomic\":\"0x1175a66a5c3343Bbf06AA818BB482DdEc30858E0\",\"rpcport\":80}

home
      "status" : "active",
      "height" : -1,
      "pubtype" : 0,
      "p2shtype" : 85,
      "installed" : false,
      "txfee" : 1000,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188,
      "coin" : "CIX"

contabo
      "txfee" : 1000,
      "status" : "active",
      "balance" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "CIX",
      "wiftype" : 188,
      "height" : -1,
      "installed" : false,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"CIX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"CIX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"CIX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"CIX\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Cryptonetix (CIX)
SWAP completed! 815945164-4262255410 {"uuid":"219449ace0abf905cd0fde918ac267e9c6a87450120b59ec5b7c29e0a2d2ccdc","expiration":1525503557,"tradeid":0,"requestid":815945164,"quoteid":4262255410,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"CIX","bobtomic":"0x1175a66a5c3343Bbf06AA818BB482DdEc30858E0","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.68835007,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"9797817773172719617","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.68836007, 0.08010000, 0.68837007, 0.08011000, 0.77441382, 0, 0, 0.77440382, 0, 0, 0],"result":"success","status":"finished","finishtime":1525488486,"bobdeposit":"702f17dcd5b4b88a5959821e8539fed21553d5c58913a85b53b01b2fa5e0c7c1","alicepayment":"e6ff6ad5dae33a685767615848cfa39b744af1c2cc138f3712fa4aaa44178918","bobpayment":"a4c54e453f0a37b7d936d7d1228765cda3766201324642807bd7fdd34f000808","paymentspent":"594fcd47a347e8bf95cb7512ee79c0a547d4cd930f52825facf3ab0b9a79b630","Apaymentspent":"2cad9a30b16449b6b7a12baeed4d2c6b1e41c5f28f0930599721a641ad569208","depositspent":"b78132864924aecb03371d92fbc8a86e164427f618bb920f772ef1111fa0213d","method":"tradestatus","finishtime":1525488486}
bobdeposit https://etherscan.io/tx/0x754c3b34cae2c43f2ec981557e4b3cd49312ff8e8c5fc9cd323b67253b9c5764
alicepayment http://www.kmdexplorer.ru/tx/e6ff6ad5dae33a685767615848cfa39b744af1c2cc138f3712fa4aaa44178918
bobpayment https://etherscan.io/tx/0xbf817dfc5a7e1a422dac82995734ba63df42eb0b0e378aaa46f088ee1672b480




```

## CMM

```
https://github.com/CommerciumBlockchain/Commercium


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<uint8_t>(1, 28);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<uint8_t>(1, 50);
base58Prefixes[SECRET_KEY] = std::vector<uint8_t>(1, 140);

{\"coin\":\"CMM\",\"name\":\"commercium\",\"rpcport\":9657,\"pubtype\":28,\"p2shtype\":50,\"wiftype\":140,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/CommerciumBlockchain/Commercium
cd Commercium
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/commercium*
mkdir ~/.commercium
echo "server=1" >> ~/.commercium/commercium.conf
echo "txindex=1" >> ~/.commercium/commercium.conf
echo "listen=0" >> ~/.commercium/commercium.conf
echo "listenonion=0" >> ~/.commercium/commercium.conf
echo "rpcuser=bartercmm" >> ~/.commercium/commercium.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.commercium/commercium.conf
echo "rpcworkqueue=64" >> ~/.commercium/commercium.conf
echo "rpcthreads=16" >> ~/.commercium/commercium.conf
chmod 0600 ~/.commercium/commercium.conf
commerciumd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CMM\"}"

home
      "status" : "active",
      "wiftype" : 140,
      "smartaddress" : "Ce6psqkZE1hceLBx1MuGY2UDbkr1g332ip",
      "installed" : true,
      "height" : 314208,
      "balance" : 0,
      "rpc" : "127.0.0.1:9657",
      "p2shtype" : 50,
      "KMDvalue" : 0,
      "txfee" : 10000,
      "coin" : "CMM",
      "pubtype" : 28

contabo
      "installed" : true,
      "smartaddress" : "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99",
      "height" : 314171,
      "txfee" : 100000,
      "pubtype" : 28,
      "coin" : "CMM",
      "rpc" : "127.0.0.1:9657",
      "p2shtype" : 50,
      "balance" : 0,
      "KMDvalue" : 0,
      "status" : "active",
      "wiftype" : 140


commercium-cli sendtoaddress "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99" 1
"fee": -0.00004520

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"CMM\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"CMM\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Commercium (CMM)
SWAP completed! 2205933191-4141539607 {"uuid":"4d3f3ee4eff39eeb5429b1e038fa6a541b41c188c5d113e35f1d91f678a964b4","expiration":1527549956,"tradeid":0,"requestid":2205933191,"quoteid":4141539607,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"CMM","srcamount":0.68161425,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"14091686060053757953","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.68171425, 0.08010000, 0.68181425, 0.08011000, 0.76701603, 0, 0, 0.76691603, 0, 0, 0],"result":"success","status":"finished","finishtime":1527535412,"bobdeposit":"7dceba690807add0e05a2108b1fc9bc22ab66058b219c7286dba3834732c2b4b","alicepayment":"28ccbc8eac75d3bd2ac153b78f6d4e328ce63e8f5a22a930f3baf35af288553a","bobpayment":"38164c982f64538064d467e607e8d2aed00c5e5036b3d0b16c84ea3e50ca5c10","paymentspent":"feeaf7bcbef9b5b3c8611d9aef9acd0870927d2fdb1a932c1fc32cbbed0b493e","Apaymentspent":"fb9d5e30063696264b62478ba69ac306514f32b6097e1b4913304fe56bb0e079","depositspent":"638667b10d5bc79ae3f29977bbadda83832e7b2147f40e7c0467ad9f6d365f64","method":"tradestatus","finishtime":1527535412}
bobdeposit https://explorer.commercium.net/tx/7dceba690807add0e05a2108b1fc9bc22ab66058b219c7286dba3834732c2b4b
alicepayment https://kmdexplorer.ru/tx/28ccbc8eac75d3bd2ac153b78f6d4e328ce63e8f5a22a930f3baf35af288553a
bobpayment https://explorer.commercium.net/tx/38164c982f64538064d467e607e8d2aed00c5e5036b3d0b16c84ea3e50ca5c10

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"CMM\",\"fixed\":1}"
```

## CMT

```
{\"coin\":\"CMT\",\"name\":\"cybermiles\",\"etomic\":\"0xf85feea2fdd81d51177f6b8f35f0e6734ce45f5f\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CMT\"}"

home
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0,
      "pubtype" : 0,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "status" : "active",
      "p2shtype" : 85,
      "txfee" : 1000,
      "coin" : "CMT"

contabo
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "wiftype" : 188,
      "pubtype" : 0,
      "p2shtype" : 85,
      "balance" : 30.95,
      "status" : "active",
      "coin" : "CMT",
      "installed" : false,
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"CMT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"CMT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"CMT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
CyberMiles (CMT)
SWAP completed! 2048227820-1962598013 {"uuid":"c99f5458f0cb4dff09f26f7c6eae2538c54f5901003db2b0141459444421e387","expiration":1531361416,"tradeid":0,"requestid":2048227820,"quoteid":1962598013,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"CMT","bobtomic":"0xf85feea2fdd81d51177f6b8f35f0e6734ce45f5f","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.75432255,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"15006642359003709441","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531347170,"bobdeposit":"b10df39ba984773f0536c270084ac9db9dfb8a9f91879c97028bf7e46848f67f","alicepayment":"91548a5c3a08b839f461d41a5d2574f1acb5d5e763331b8faa6d1a3bdccea989","bobpayment":"eac2243e79791bbca52a32b9eb22a56f8439b9d882b2c55f63eeb1284b7f68a4","paymentspent":"fd6b5b3dd100c4eb67adcd6044385aed377bee766fcf837888fd65820b3cf877","Apaymentspent":"65183019d5a0a2e7dc2fe413ac95ea7285047f4ed1adc9f051d7ff5355788684","depositspent":"b0e24e01ef3bc52431cae6ef42d92518c7ef4b5fa9ff5ef9fda6c73e67903ad4","alicedexfee":"a50c62d283802cd93ddbf840926af8d6263e91c385a06cc16556010a749a0cc7","method":"tradestatus","finishtime":1531347170}
bobdeposit https://etherscan.io/tx/0x1c9e46e50eded9be02214916ba952c73af45a67fa92a81292d442ca0ef254542
alicepayment https://kmdexplorer.ru/tx/91548a5c3a08b839f461d41a5d2574f1acb5d5e763331b8faa6d1a3bdccea989
bobpayment https://etherscan.io/tx/0x5c606da19b69a49b93073672a2d6581f442a897ed80fbcc877013c6351f61830
aliceClaimsPayment https://etherscan.io/tx/0xb5b9e4d2895887b1be9306432528a87de38a1e0bdf04b4deb30708d17da5a10a

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CMT\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"cybermiles\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CMT\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"cybermiles\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CMT\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"cybermiles\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CMT\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"cybermiles\",\"refrel\":\"coinmarketcap\"}"
```

## CRC

```
https://bitcointalk.org/index.php?topic=2348866.0
https://github.com/crowdcoinChain/Crowdcoin

src/chainparams.cpp
// Crowdcoin addresses start with 'C'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,28);
// Crowdcoin script addresses start with 'c'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,88);
// Crowdcoin private keys start with '1'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,0);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 10000; // was 1000

{\"coin\":\"CRC\",\"name\":\"crowdcoin\",\"confpath\":\"${HOME#}/.crowdcoincore/crowdcoin.conf\",\"rpcport\":11998,\"pubtype\":28,\"p2shtype\":88,\"wiftype\":0,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/crowdcoinChain/Crowdcoin
cd Crowdcoin
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/crowdcoin*
mkdir ~/.crowdcoincore
echo "server=1" >> ~/.crowdcoincore/crowdcoin.conf
echo "txindex=1" >> ~/.crowdcoincore/crowdcoin.conf
echo "litemode=1" >> ~/.crowdcoincore/crowdcoin.conf
echo "rpcport=11998" >> ~/.crowdcoincore/crowdcoin.conf
echo "listen=0" >> ~/.crowdcoincore/crowdcoin.conf
echo "listenonion=0" >> ~/.crowdcoincore/crowdcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.crowdcoincore/crowdcoin.conf
echo "rpcuser=bartercrc" >> ~/.crowdcoincore/crowdcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.crowdcoincore/crowdcoin.conf
chmod 0600 ~/.crowdcoincore/crowdcoin.conf
crowdcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CRC\"}"

home
      "pubtype" : 28,
      "wiftype" : 188,
      "p2shtype" : 88,
      "txfee" : 10000,
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:11998",
      "installed" : true,
      "smartaddress" : "Ce6psqkZE1hceLBx1MuGY2UDbkr1g332ip",
      "height" : 21605,
      "coin" : "CRC",
      "status" : "active",
      "balance" : 0

contabo
      "rpc" : "127.0.0.1:11998",
      "wiftype" : 188,
      "balance" : 0,
      "pubtype" : 28,
      "txfee" : 10000,
      "smartaddress" : "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99",
      "status" : "active",
      "installed" : true,
      "p2shtype" : 88,
      "height" : 21618,
      "coin" : "CRC",
      "KMDvalue" : 0

crowdcoin-cli sendtoaddress "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99" 1
crowdcoin-cli sendtoaddress "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99" 1.2
"fee": -0.00004520

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CRC\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"crowdcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CRC\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"crowdcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CRC\",\"rel\":\"BTC\",\"margin\":0.05,\"refbase\":\"crowdcoin\",\"refrel\":\"coinmarketcap\"}"
```

## CRDS

```
https://bitcointalk.org/index.php?topic=1944858.0;all
https://github.com/crds/Credits


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,28);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,10);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,140);

{\"coin\":\"CRDS\",\"name\":\"credits\",\"rpcport\":31050,\"pubtype\":28,\"p2shtype\":10,\"wiftype\":140,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/crds/Credits
cd Credits
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/credits*
mkdir ~/.credits
echo "server=1" >> ~/.credits/credits.conf
echo "txindex=1" >> ~/.credits/credits.conf
echo "litemode=1" >> ~/.credits/credits.conf
echo "listen=0" >> ~/.credits/credits.conf
echo "listenonion=0" >> ~/.credits/credits.conf
echo "rpcuser=bartercrds" >> ~/.credits/credits.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.credits/credits.conf
chmod 0600 ~/.credits/credits.conf
creditsd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CRDS\"}"

home
      "smartaddress" : "Ce6psqkZE1hceLBx1MuGY2UDbkr1g332ip",
      "p2shtype" : 10,
      "height" : 397873,
      "txfee" : 10000,
      "balance" : 0,
      "wiftype" : 140,
      "KMDvalue" : 0,
      "status" : "active",
      "installed" : true,
      "coin" : "CRDS",
      "pubtype" : 28,
      "rpc" : "127.0.0.1:31050"

contabo
      "installed" : true,
      "txfee" : 10000,
      "status" : "active",
      "wiftype" : 140,
      "rpc" : "127.0.0.1:31050",
      "pubtype" : 28,
      "p2shtype" : 10,
      "balance" : 0,
      "height" : 397873,
      "coin" : "CRDS",
      "smartaddress" : "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99",
      "KMDvalue" : 0


credits-cli sendtoaddress "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99" 1
"fee": -0.00004520

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"CRDS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"CRDS\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Credits (CRDS)
SWAP completed! 1202733749-3351026185 {"uuid":"b57b0725b739f54a34b2dea08829c32534c5ca0a9bc83773284280c6b7e86abf","expiration":1528542020,"tradeid":0,"requestid":1202733749,"quoteid":3351026185,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"CRDS","srcamount":0.67360602,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"4411914506462101505","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67370602, 0.08010000, 0.67380602, 0.08011000, 0.75800677, 0, 0, 0.75790677, 0, 0, 0],"result":"success","status":"finished","finishtime":1528526633,"bobdeposit":"6f7404c46bd91c253f2d0c85e2912b7694cdab9ba7c47f95ce0fc4838a0057ce","alicepayment":"32e1c76db0629cb38893c361120b2dd4177589327e407513bd99db0b7fb43225","bobpayment":"952cc716514c4b6544f296800d19c3e8a364dcc30f962173327767bb22a13bf5","paymentspent":"be0b9b120f452e00c2b04c24ff84323c52042ad4a2211bba13db177c632b2acf","Apaymentspent":"3fb19a134e924564a2e49604c55dd76e60255cb062b97c4004216ed30b6e6d04","depositspent":"a881ff007474ce9ed227ce410fa41f3b4ca8fdbbc41517675ff0863b8e262331","method":"tradestatus","finishtime":1528526633}
bobdeposit http://explorer.crds.co/tx/6f7404c46bd91c253f2d0c85e2912b7694cdab9ba7c47f95ce0fc4838a0057ce
alicepayment https://kmdexplorer.ru/tx/32e1c76db0629cb38893c361120b2dd4177589327e407513bd99db0b7fb43225
bobpayment http://explorer.crds.co/tx/952cc716514c4b6544f296800d19c3e8a364dcc30f962173327767bb22a13bf5

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"CRDS\",\"fixed\":1}"
```

## CREA

```
https://bitcointalk.org/index.php?topic=1809920.0
https://github.com/creativechain/creativechain-core


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,28);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
//base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,50);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 200000;
DEFAULT_TRANSACTION_MINFEE = 100000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;

{\"coin\":\"CREA\",\"name\":\"creativecoin\",\"rpcport\":17711,\"pubtype\":28,\"p2shtype\":5,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/creativechain/creativechain-core
cd creativechain-core
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/creativecoin*
mkdir ~/.creativecoin
echo "server=1" >> ~/.creativecoin/creativecoin.conf
echo "listen=0" >> ~/.creativecoin/creativecoin.conf
echo "listenonion=1" >> ~/.creativecoin/creativecoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.creativecoin/creativecoin.conf
echo "rpcuser=bartercrea" >> ~/.creativecoin/creativecoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.creativecoin/creativecoin.conf
chmod 0600 ~/.creativecoin/creativecoin.conf
creativecoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CREA\"}"

home
   {
      "smartaddress" : "Ce6psqkZE1hceLBx1MuGY2UDbkr1g332ip",
      "p2shtype" : 5,
      "pubtype" : 28,
      "rpc" : "127.0.0.1:17711",
      "wiftype" : 176,
      "status" : "active",
      "coin" : "CREA",
      "txfee" : 100000
   },

contabo
   {
      "rpc" : "127.0.0.1:17711",
      "wiftype" : 176,
      "coin" : "CREA",
      "pubtype" : 28,
      "smartaddress" : "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99",
      "p2shtype" : 5,
      "txfee" : 100000,
      "status" : "active"
   },

creativecoin-cli sendtoaddress "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99" 0.77760212
"fee": -0.00045000,
creativecoin-cli sendtoaddress "CJKgQCNppgqbpgLBCfANrn53qe27TDpF99" 0.23104064
"fee": -0.00104200,
creativecoin-cli sendtoaddress "CaL4JtSgu4hgMG8nZJ7Kfn9gdtZV1w7cad" 149.7
"fee": -0.00452000
```

## CRW

```
https://bitcointalk.org/index.php?topic=815487
https://github.com/crowndev/crowncoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,0);                    // Crown addresses start with '1'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,28);                   // Crown script addresses start with 'C'
base58Prefixes[SECRET_KEY]     = std::vector<unsigned char>(1,128);                  // Crown private keys start with '5'

{\"coin\":\"CRW\",\"name\":\"crown\",\"rpcport\":9341,\"pubtype\":0,\"p2shtype\":28,\"wiftype\":128,\"txfee\":10000}


sudo apt-get install libssl1.0-dev
cd ~/wallets
git clone https://github.com/crowndev/crowncoin
cd crowncoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/crown*
sudo apt-get install libssl-dev
mkdir ~/.crown
echo "server=1" >> ~/.crown/crown.conf
echo "litemode=1" >> ~/.crown/crown.conf
echo "txindex=1" >> ~/.crown/crown.conf
echo "listen=0" >> ~/.crown/crown.conf
echo "rpcuser=bartercrw" >> ~/.crown/crown.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.crown/crown.conf
chmod 0600 ~/.crown/crown.conf
crownd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CRW\"}"

home
   {
      "coin" : "CRW",
      "status" : "active",
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:9341",
      "smartaddress" : "1NdwJoQVLxj5kCHXKcaLxWrByddbgyHofb",
      "txfee" : 10000,
      "wiftype" : 128,
      "pubtype" : 0
   },

contabo
      "wiftype" : 128,
      "coin" : "CRW",
      "pubtype" : 0,
      "smartaddress" : "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj",
      "KMDvalue" : 0,
      "balance" : 85.14861965,
      "rpc" : "127.0.0.1:9341",
      "p2shtype" : 28,
      "status" : "active",
      "txfee" : 10000,
      "installed" : true,
      "height" : 1685920

crown-cli sendtoaddress "1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1" 0.1
crown-cli sendtoaddress "1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1" 0.12
"fee" : -0.00002358
```

## CS

```
{\"coin\":\"CS\",\"name\":\"credits\",\"etomic\":\"0x46b9ad944d1059450da1163511069c718f699d31\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CS\"}"

home
      "pubtype" : 0,
      "status" : "active",
      "installed" : true,
      "height" : 0,
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "coin" : "CS",
      "KMDvalue" : 0,
      "wiftype" : 188

contabo
      "balance" : 26.97,
      "height" : 0,
      "txfee" : 1000,
      "wiftype" : 188,
      "coin" : "CS",
      "KMDvalue" : 0,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "installed" : true,
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"CS\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"CS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"CS\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Credits (CS)
SWAP completed! 3178361340-1925946379 {"uuid":"99a6a06d2197adfe2469fde823b2360e3bb14bb85712b8907057a61696ef5992","expiration":1531285263,"tradeid":0,"requestid":3178361340,"quoteid":1925946379,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"CS","bobtomic":"0x46b9ad944d1059450da1163511069c718f699d31","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.74869184,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"17962314579557875713","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531270252,"bobdeposit":"e5859f4fb0fdfa8f9134c2b71fc95d51bbdba52ae8600adfa3a630cf7574cdbe","alicepayment":"61f49137901e9c7b33c7e9ce89441bc21f50dcab0f1e27ebfce4f25b92dd2b37","bobpayment":"a3e5b1b6e4774bb43e5a64124ab16c009b1b89b63f16c4bd5b20af7b54c6648a","paymentspent":"14bfaa5e4d2ddc2df8f889bdd17a14dd8d8c96a8227c8859134694369ff59f14","Apaymentspent":"2f2024fb9dc447847a2bd5a11a06b2735571a930d5c3c89394a956fd184974a6","depositspent":"8a431f0fefd73f63af77e96d3f549f25abaaf7ab50cf26daa8eb4c147c8ec70c","alicedexfee":"4ab2b2cac52ccd77be314e94003286e6376e8dd61c4828287eb2b7a9f1250aad","method":"tradestatus","finishtime":1531270252}
bobdeposit https://etherscan.io/tx/0x8f7eebbd518368e558a3c4fc060d373905e747f6ec1ecc660bb082b3d3c2e71b
alicepayment https://kmdexplorer.ru/tx/61f49137901e9c7b33c7e9ce89441bc21f50dcab0f1e27ebfce4f25b92dd2b37
bobpayment https://etherscan.io/tx/0x2c10561b790490e24a3fab55cceed3f582e1eef1be0839405c39ccdf35d72e0e

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CS\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"credits\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CS\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"credits\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CS\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"credits\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CS\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"credits\",\"refrel\":\"coinmarketcap\"}"
```

## CVC

```
{\"coin\":\"CVC\",\"name\":\"civic\",\"etomic\":\"0x41e5560054824eA6B0732E656E3Ad64E20e94E45\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"CVC\"}"

home
      "status" : "active",
      "installed" : false,
      "coin" : "CVC",
      "balance" : 0,
      "height" : -1,
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188

contabo
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "CVC",
      "status" : "active",
      "balance" : 46.95,
      "pubtype" : 0,
      "height" : -1,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "p2shtype" : 85,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"CVC\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"CVC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"CVC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Civic (CVC)
SWAP completed! 1444021083-2065365212 {"uuid":"ee1d790a9e46b104b6fdd8a399559be3ed0600cc56fd836d578c4fe397d5ca23","expiration":1531271333,"tradeid":0,"requestid":1444021083,"quoteid":2065365212,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"CVC","bobtomic":"0x41e5560054824eA6B0732E656E3Ad64E20e94E45","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77471504,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"8049754438884720641","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531256159,"bobdeposit":"02209d14d5ecc8b367fa3e6b22db820181bf7be21798194bac99187ad7c1196f","alicepayment":"6a3358e5553cb0e2bfa3d0d32fe7dd8662ec5c6b3aa1ee4cc2461cad02b5c617","bobpayment":"81767e563a58af339b9af719407a0bceb6335c400defbcdf7f60a0dd92df9e8c","paymentspent":"cb1946633288e2697fe3bc333cac7b9805eecd52970951611b66c4088e5b84d3","Apaymentspent":"204ef64acdf4f23a8d08575d3a9f12383b7d4474f13dbde764fa67cf6fe9bc9f","depositspent":"2bc8e921c57d8a9c1ebd2147f89ec02bc887896eef9deeb8cf4701af9734a3d4","alicedexfee":"5fd7ded9acc41b2663edd3eb98d553d8df6e450de75b721330617a910a65c8c6","method":"tradestatus","finishtime":1531256159}
bobdeposit https://etherscan.io/tx/0xaf3b4a195834db50666c8e5352058cde4ac532ed7f788fe251661eca7e08c141
alicepayment https://kmdexplorer.ru/tx/6a3358e5553cb0e2bfa3d0d32fe7dd8662ec5c6b3aa1ee4cc2461cad02b5c617
bobpayment https://etherscan.io/tx/0x68d3e14381246ec8f7a7cea2dc172674812b186dc26f9c06e62af6adde6a5774

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CVC\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"civic\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CVC\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"civic\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CVC\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"civic\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"CVC\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"civic\",\"refrel\":\"coinmarketcap\"}"
```

## DAI

```
{\"coin\":\"DAI\",\"name\":\"dai\",\"etomic\":\"0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DAI\"}"

home
      "coin" : "DAI",
      "pubtype" : 0,
      "status" : "active",
      "txfee" : 1000,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "installed" : false,
      "wiftype" : 188,
      "balance" : 0,
      "rpc" : "127.0.0.1:80"

contabo
      "installed" : false,
      "status" : "active",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "balance" : 0,
      "height" : -1,
      "coin" : "DAI",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DAI\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DAI\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DAI\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Dai (DAI)
SWAP completed! 1658943900-1630097863 {"uuid":"33a425becc7bfb4b6fa27f4d0a6ca715b22083744dd00f71c1d8f4cf284c88af","expiration":1527220681,"tradeid":0,"requestid":1658943900,"quoteid":1630097863,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DAI","bobtomic":"0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67446483,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12360131572634222593","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67447483, 0.08010000, 0.67448483, 0.08011000, 0.75879293, 0, 0, 0.75878293, 0, 0, 0],"result":"success","status":"finished","finishtime":1527206148,"bobdeposit":"4c5de02487dc4ecc3891b738b2df5c5400a787c92e4cafa8dba09fea21184c1d","alicepayment":"2defdad61cf8c3302a66b0351efafc4d2a8cfdec3abb1a03ea592c2679c60d22","bobpayment":"46114111a4259514d0b05026cac8de2ec5782d014f8cc1910a3e17b43399571d","paymentspent":"da7141483b7d02841e7d574f7a0c4fb16e96f8ed7d7f1e314f48ef732a088e7b","Apaymentspent":"13b53302876509515d355a2f97f1c239bb5c7edac547dad17159df3db544494d","depositspent":"1b51f73683e2de3667562db18063cbc13d778e4315f4158a8672b761b199d95e","method":"tradestatus","finishtime":1527206148}
bobdeposit https://etherscan.io/tx/0xf3f31c9315c090222af1edbfe9e81116e23527397f689de2dbba44356a9c946b
alicepayment https://kmdexplorer.ru/tx/2defdad61cf8c3302a66b0351efafc4d2a8cfdec3abb1a03ea592c2679c60d22
bobpayment https://etherscan.io/tx/0x57c1646a0fc4104664c85d870d8e64bec838ce145dcc49358257f9665a72e7dd

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DAI\",\"rel\":\"BCH\",\"margin\":0.02,\"refbase\":\"dai\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DAI\",\"rel\":\"KMD\",\"margin\":0.02,\"refbase\":\"dai\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DAI\",\"rel\":\"LTC\",\"margin\":0.02,\"refbase\":\"dai\",\"refrel\":\"coinmarketcap\"}"
```

## DASH

```
https://bitcointalk.org/index.php?topic=421615.0
https://github.com/dashpay/dash


src/chainparams.cpp
// Dash addresses start with 'X'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,76);
// Dash script addresses start with '7'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,16);
// Dash private keys start with '7' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 10000; // was 1000
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 10000; // was 1000

{\"confpath\":\"${HOME#}/.dashcore/dash.conf\",\"coin\":\"DASH\",\"name\":\"dashcore\",\"rpcport\":9998,\"pubtype\":76,\"p2shtype\":16,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/dashpay/dash
cd dash
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/dash*
mkdir ~/.dashcore
echo "server=1" >> ~/.dashcore/dash.conf
echo "txindex=1" >> ~/.dashcore/dash.conf
echo "litemode=1" >> ~/.dashcore/dash.conf
echo "listen=0" >> ~/.dashcore/dash.conf
echo "listenonion=1" >> ~/.dashcore/dash.conf
echo "#proxy=127.0.0.1:9050" >> ~/.dashcore/dash.conf
echo "rpcuser=barterdash" >> ~/.dashcore/dash.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.dashcore/dash.conf
echo "rpcworkqueue=64" >> ~/.dashcore/dash.conf
echo "rpcthreads=16" >> ~/.dashcore/dash.conf
chmod 0600 ~/.dashcore/dash.conf
dashd -daemon

curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DASH\"}"

home
   {
      "txfee" : 10000,
      "coin" : "DASH",
      "p2shtype" : 16,
      "smartaddress" : "XxKn944PJfwfu8t7BVtZp3XyoyDHjDfiSG",
      "pubtype" : 76,
      "rpc" : "127.0.0.1:9998",
      "estimatedrate" : 20,
      "status" : "active",
      "wiftype" : 204
   },

contabo
   {
      "wiftype" : 204,
      "pubtype" : 76,
      "txfee" : 10000,
      "status" : "active",
      "p2shtype" : 16,
      "rpc" : "127.0.0.1:9998",
      "smartaddress" : "XcYdfQgeuM5f5V2LNo9g8o8p3rPPbKwwCg",
      "coin" : "DASH"
   },

dash-cli sendtoaddress "XcYdfQgeuM5f5V2LNo9g8o8p3rPPbKwwCg" 0.06440722
dash-cli sendtoaddress "XcYdfQgeuM5f5V2LNo9g8o8p3rPPbKwwCg" 0.07728866
dash-cli sendtoaddress "XcYdfQgeuM5f5V2LNo9g8o8p3rPPbKwwCg" 0.01924612
```

## DATA

```
{\"coin\":\"DATA\",\"name\":\"streamr-datacoin\",\"etomic\":\"0x0cf0ee63788a0849fe5297f3407f701e122cc023\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DATA\"}"

home
      "coin" : "DATA",
      "wiftype" : 188,
      "txfee" : 1000,
      "pubtype" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "status" : "active",
      "installed" : false,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "coin" : "DATA",
      "p2shtype" : 85,
      "pubtype" : 0,
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "balance" : 5.29307709,
      "installed" : false,
      "status" : "active"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DATA\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DATA\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DATA\",\"rel\":\"KMD\",\"relvolume\":0.02,\"price\":0.12}"
Streamr DATAcoin (DATA)
SWAP completed! 1519001203-497435306 {"uuid":"944dc16cb1d0f2ad5794fda10ae8257ccb663568bb73231696303313f173d408","expiration":1531094139,"tradeid":0,"requestid":1519001203,"quoteid":497435306,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DATA","bobtomic":"0x0cf0ee63788a0849fe5297f3407f701e122cc023","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.17616606,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.02009000,"alicetxfee":0.00001000,"aliceid":"6748953998513668097","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.02010000, 1.00002000, 0.02011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531078989,"bobdeposit":"1ca1341f76e1f49e52f3c02a64f2e555aba9acdf3c9a79e01bf75db34cfcc684","alicepayment":"168e0f79dcc8a27f43f1b3381cbb8a7ccf55d5e6f3b1991240fa1c063f8b53b6","bobpayment":"f96f1fa1b95e4c3de20f4f26b4668cc3abd65a64eb90f30ca7df359b277a8bdb","paymentspent":"00dd105dfe2dd923d52102e0e1a02999264ac1ab73cf305c0893bfde942f206f","Apaymentspent":"dc9bfeacfdd29b7a13b29e54be751779bf8e4205e8ca3f95171b333c93636898","depositspent":"7fc861186e4cbab45092e66c0cb127ca561fd246789cbdab44cefb1bd7730b13","alicedexfee":"70563f84c3dbd09dd4caca48bcc9ae736cd1c00008181ce1005b619e0ef40242","method":"tradestatus","finishtime":1531078989}
bobdeposit https://etherscan.io/tx/0xdf2d300e3ac4ee957b8995eb26873d22e55e98c0204b5a1f486c343d16f22d71
alicepayment https://kmdexplorer.ru/tx/168e0f79dcc8a27f43f1b3381cbb8a7ccf55d5e6f3b1991240fa1c063f8b53b6
bobpayment https://etherscan.io/tx/0xf2ef052e1982d9d9542639fb1e12c3bada595ac3a68ae23b7e358b24b66bf311

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DATA\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"streamr-datacoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DATA\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"streamr-datacoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DATA\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"streamr-datacoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DATA\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"streamr-datacoin\",\"refrel\":\"coinmarketcap\"}"
```

## DCN

```
{\"coin\":\"DCN\",\"name\":\"dentacoin\",\"etomic\":\"0x08d32b0da63e2C3bcF8019c9c5d849d7a9d791e6\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DCN\"}"

home
      "pubtype" : 0,
      "wiftype" : 188,
      "coin" : "DCN",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "balance" : 0,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "txfee" : 1000,
      "p2shtype" : 85

contabo
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "wiftype" : 188,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "coin" : "DCN",
      "pubtype" : 0,
      "status" : "active",
      "installed" : false,
      "height" : -1,
      "p2shtype" : 85,
      "balance" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DCN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DCN\",\"rel\":\"KMD\",\"price\":0.001}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DCN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.0012}"
Dentacoin (DCN)
SWAP completed! 1489216781-2965653384 {"uuid":"1e58a326827720e5353f973a094b59a58c870d5df5d5e3c6fd4f9737f78cb850","expiration":1528177494,"tradeid":0,"requestid":1489216781,"quoteid":2965653384,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DCN","bobtomic":"0x08d32b0da63e2C3bcF8019c9c5d849d7a9d791e6","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":73.48638226,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"2291473840192815105","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[73.48639226, 0.08010000, 73.48640226, 0.08011000, 82.67220004, 0, 0, 82.67219004, 0, 0, 0],"result":"success","status":"finished","finishtime":1528162408,"bobdeposit":"7d9e5ae7605988bc9d8a28744399601415494a5cb28737201e364fe01bc9e703","alicepayment":"a2c2bb1e8deb375bea25f25ab746962e3ebf1cc62b582492a390cbdb5c4c85ef","bobpayment":"72c15cd2a7941057104d3b8c17fceb7c818d8a437fa9bec3c2c5b50071387541","paymentspent":"754aaa418321a19b5dae539f0c620759ab07bec0d24af78c5880808d2913bf84","Apaymentspent":"c6753086ecaab6344844eee055341e62398fe919dafd63ede84799272abc2277","depositspent":"989ed2a8ba0d35023c68a53f9cba37c546de415637f95457623bfc1e59f57f92","method":"tradestatus","finishtime":1528162408}
bobdeposit https://etherscan.io/tx/0x3fd3137ad2ea8fd1658b4d41d2abe2aa5c1ea9c2217903f2238876ec961a81df
alicepayment https://kmdexplorer.ru/tx/a2c2bb1e8deb375bea25f25ab746962e3ebf1cc62b582492a390cbdb5c4c85ef
bobpayment https://etherscan.io/tx/0x8c64563745597f1a5d2538b350e442d52238cc3b63416b19eb45e0e92880aca8

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DCN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"dentacoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DCN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"dentacoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DCN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"dentacoin\",\"refrel\":\"coinmarketcap\"}"
```

## DGB

```
https://bitcointalk.org/index.php?topic=408268.0
https://github.com/digibyte/digibyte



src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,30);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

src/wallet/wallet.h
DEFAULT_TRANSACTION_FEE = 100000;
DEFAULT_FALLBACK_FEE = 200000;
DEFAULT_TRANSACTION_MINFEE = 100000;
WALLET_INCREMENTAL_RELAY_FEE = 5000;
src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 1000;

{\"coin\":\"DGB\",\"name\":\"digibyte\",\"rpcport\":14022,\"pubtype\":30,\"p2shtype\":5,\"wiftype\":128,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/digibyte/digibyte
cd digibyte
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/digibyte*
mkdir ~/.digibyte
echo "server=1" >> ~/.digibyte/digibyte.conf
echo "txindex=1" >> ~/.digibyte/digibyte.conf
echo "listen=0" >> ~/.digibyte/digibyte.conf
echo "listenonion=1" >> ~/.digibyte/digibyte.conf
echo "#proxy=127.0.0.1:9050" >> ~/.digibyte/digibyte.conf
echo "rpcuser=barterdgb" >> ~/.digibyte/digibyte.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.digibyte/digibyte.conf
echo "rpcworkqueue=64" >> ~/.digibyte/digibyte.conf
echo "rpcthreads=16" >> ~/.digibyte/digibyte.conf
chmod 0600 ~/.digibyte/digibyte.conf
digibyted -daemon

curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DGB\"}"

home
   {
      "rpc" : "127.0.0.1:14022",
      "status" : "active",
      "pubtype" : 30,
      "coin" : "DGB",
      "wiftype" : 128,
      "smartaddress" : "DSn2r4M8eNdNHCU84CZuWH1nrmMu3gbV1i",
      "p2shtype" : 5,
      "txfee" : 100000
   },

contabo
   {
      "coin" : "DGB",
      "wiftype" : 128,
      "p2shtype" : 5,
      "smartaddress" : "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8",
      "pubtype" : 30,
      "status" : "active",
      "rpc" : "127.0.0.1:14022",
      "txfee" : 100000
   },

digibyte-cli sendtoaddress "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8" 100
digibyte-cli sendtoaddress "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8" 120

digibyte-cli sendtoaddress "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8" 386.61
"fee": -0.00096600
"fee": -0.00022600
```

## DGD

```
{\"coin\":\"DGD\",\"name\":\"digixdao\",\"etomic\":\"0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A\",\"rpcport\":80,\"decimals\":9}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DGD\"}"

home
      "balance" : 0,
      "height" : -1,
      "coin" : "DGD",
      "installed" : false,
      "pubtype" : 0,
      "p2shtype" : 85,
      "status" : "active",
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000

contabo
      "pubtype" : 0,
      "balance" : 0.38862068,
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "wiftype" : 188,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "status" : "active",
      "coin" : "DGD"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DGD\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DGD\",\"rel\":\"KMD\",\"price\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DGD\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":1.2}"
DigixDAO (DGD)
SWAP completed! 1860713620-536288889 {"uuid":"98e9639399e72f85eeaf7aa349a60cbe10e9800d98c2453967cc5f59d1391407","expiration":1527650552,"tradeid":0,"requestid":1860713620,"quoteid":536288889,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DGD","bobtomic":"0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.07512149,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"17234623542384787457","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.07513149, 0.08010000, 0.07514149, 0.08011000, 0.08453167, 0, 0, 0.08452167, 0, 0, 0],"result":"success","status":"finished","finishtime":1527636059,"bobdeposit":"5d7b65f8d876044c107cc0c9bdd3deffc3012bdb2865a057298b514dc75b052b","alicepayment":"e97dda6f1f9c95c6ff70aba4b443651a23666ace53903b7d934ab22831092ca6","bobpayment":"31ecc2fbe2b04e8af1ad6830e3d17830c2046219d435224a15bf04b1feeadeff","paymentspent":"750ce8abcbb0fba09620a852f99c86345e599d26f226569ea496b22eddf2e3bb","Apaymentspent":"6608fe8d17326cbd9df8cc7e0db201f0f7fb486488eea566653cdf7b367fb4c6","depositspent":"067cd2a0d677cb433c4fa239e1989273d5eee8f2673fcd707433f7696e3d0eea","method":"tradestatus","finishtime":1527636059}
bobdeposit https://etherscan.io/tx/0xcb9e0ccc4389aea401d38d9aae567548fb393a481871e0f41ff0dc1c5644dd04
alicepayment https://kmdexplorer.ru/tx/e97dda6f1f9c95c6ff70aba4b443651a23666ace53903b7d934ab22831092ca6
bobpayment https://etherscan.io/tx/0xedb9b112690eafb82eb3e82dc12ee875b1110c73f89ae6c5778e18a61ab99fec

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DGD\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"digixdao\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DGD\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"digixdao\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DGD\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"digixdao\",\"refrel\":\"coinmarketcap\"}"

```

## DGPT

```
https://bitcointalk.org/index.php?topic=2203117.0

{\"coin\":\"DGPT\",\"name\":\"digipulse\",\"etomic\":\"0xf6cFe53d6FEbaEEA051f400ff5fc14F0cBBDacA1\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DGPT\"}"

home
      "coin" : "DGPT",
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "p2shtype" : 85,
      "pubtype" : 0,
      "height" : -1,
      "txfee" : 1000,
      "status" : "active"

contabo
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "pubtype" : 0,
      "status" : "active",
      "coin" : "DGPT",
      "wiftype" : 188,
      "installed" : false,
      "p2shtype" : 85,
      "txfee" : 1000,
      "height" : -1,
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DGPT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DGPT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DGPT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DGPT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
DigiPulse (DGPT)
SWAP completed! 1250827769-3333123249 {"uuid":"6b9ecd375ec38046812d065cac997a8cb666a3ef9d00d8c4c466a93309911323","expiration":1526433696,"tradeid":0,"requestid":1250827769,"quoteid":3333123249,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DGPT","bobtomic":"0xf6cFe53d6FEbaEEA051f400ff5fc14F0cBBDacA1","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76587193,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"17460866800354459649","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76588193, 0.08010000, 0.76589193, 0.08011000, 0.86162592, 0, 0, 0.86161592, 0, 0, 0],"result":"success","status":"finished","finishtime":1526418360,"bobdeposit":"7e8c2bbe501a45a63c9a5ff6f41b0e6e53b22f7ca736f275963d015b5a2004fe","alicepayment":"7616040fcf117753bfc1b603460017dbc9fa49342dd7cb02086f794f895981ec","bobpayment":"d0e947c04cadc89dead52b968fb9ad0a2bb1601644d59dbc690343e982621466","paymentspent":"4abf1f0b4f0a87dc03d4249776c80f3d9bd218f577080a4371733d1b8886d5b2","Apaymentspent":"350e7cbc0505d99b3c640aea2d2c183ba703170214e1611700d054092ecfbcd6","depositspent":"db267865cc1d6a3d72c6993183c53129249075a784417b9fdbd66eeee58ac70f","method":"tradestatus","finishtime":1526418360}
bobdeposit https://etherscan.io/tx/0xe15a0ea7cd94851dc77dd79425bb99c9cb760a7c60bbe47e2c50806708d3ece8
alicepayment https://kmdexplorer.ru/tx/7616040fcf117753bfc1b603460017dbc9fa49342dd7cb02086f794f895981ec
bobpayment https://etherscan.io/tx/0x1da1fd53837f0695b33ac5a273b6dcd40da2e92f27b6f286106697b603334ec4

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DGPT\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"digipulse\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DGPT\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"digipulse\",\"refrel\":\"coinmarketcap\"}"
```

## DNR

```
https://bitcointalk.org/index.php?topic=1967207.0
https://github.com/carsenk/denarius


src/base58.h
PUBKEY_ADDRESS = 30
SCRIPT_ADDRESS = 90
SetData(128 + (fTestNet ? CBitcoinAddress::PUBKEY_ADDRESS_TEST : CBitcoinAddress::PUBKEY_ADDRESS), &vchSecret[0], vchSecret.size());

src/main.h
MIN_TX_FEE = 1000
MIN_RELAY_TX_FEE = MIN_TX_FEE

{\"coin\":\"DNR\",\"name\":\"denarius\",\"isPoS\":1,\"rpcport\":32339,\"pubtype\":30,\"p2shtype\":90,\"wiftype\":158,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/carsenk/denarius
cd denarius/src
sudo apt-get install libssl1.0-dev
make -j4 -f makefile.unix USE_UPNP=
sudo cp denariusd /usr/local/bin
sudo strip /usr/local/bin/denarius*
sudo apt-get install libssl-dev
mkdir ~/.denarius
echo "server=1" >> ~/.denarius/denarius.conf
echo "txindex=1" >> ~/.denarius/denarius.conf
echo "listen=0" >> ~/.denarius/denarius.conf
echo "enableaccounts=1" >> ~/.denarius/denarius.conf
echo "staking=0" >> ~/.denarius/denarius.conf
echo "nosmsg=1" >> ~/.denarius/denarius.conf
echo "rpcport=12339" >> ~/.denarius/denarius.conf
echo "rpcuser=barterdnr" >> ~/.denarius/denarius.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.denarius/denarius.conf
chmod 0600 ~/.denarius/denarius.conf
denariusd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DNR\"}"

home
      "txfee" : 10000,
      "p2shtype" : 90,
      "installed" : true,
      "wiftype" : 158,
      "smartaddress" : "DSn2r4M8eNdNHCU84CZuWH1nrmMu3gbV1i",
      "status" : "active",
      "type" : "PoS",
      "KMDvalue" : 0,
      "coin" : "DNR",
      "pubtype" : 30,
      "balance" : 0,
      "height" : 260737,
      "rpc" : "127.0.0.1:32339"

contabo
      "height" : 229585,
      "wiftype" : 158,
      "type" : "PoS",
      "coin" : "DNR",
      "txfee" : 10000,
      "p2shtype" : 90,
      "pubtype" : 30,
      "rpc" : "127.0.0.1:32339",
      "balance" : 0,
      "smartaddress" : "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8",
      "status" : "active",
      "KMDvalue" : 0,
      "installed" : true

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DNR\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"denarius-dnr\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DNR\",\"rel\":\"BTC\",\"margin\":0.07,\"refbase\":\"denarius-dnr\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DNR\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"denarius-dnr\",\"refrel\":\"coinmarketcap\"}"
```

## DNT

```
{\"coin\":\"DNT\",\"name\":\"district0x\",\"etomic\":\"0x0AbdAce70D3790235af448C88547603b945604ea\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DNT\"}"

home
      "txfee" : 1000,
      "balance" : 0,
      "status" : "active",
      "pubtype" : 0,
      "coin" : "DNT",
      "installed" : false,
      "p2shtype" : 85,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "height" : -1

hetzner
      "p2shtype" : 85,
      "wiftype" : 188,
      "installed" : false,
      "height" : -1,
      "balance" : 419.5,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "status" : "active",
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "coin" : "DNT"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DNT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DNT\",\"rel\":\"KMD\",\"relvolume\":0.1,\"price\":0.12}"
district0x (DNT)
SWAP completed! 1673185262-3143533300 {"uuid":"eff5a0606af47755760bdb322ed55c0602e7c00d9d78d3e5502a49e23f4ec2ff","expiration":1531383512,"tradeid":0,"requestid":1673185262,"quoteid":3143533300,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DNT","bobtomic":"0x0AbdAce70D3790235af448C88547603b945604ea","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.94979192,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.10009000,"alicetxfee":0.00001000,"aliceid":"8205054589235625985","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.10010000, 1.00002000, 0.10011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531368367,"bobdeposit":"3061443012e8922bfc570e5db1d5e25dba94011328af8d9f2c7eb4c5f03b7878","alicepayment":"c767682eb12f7287ba638106d9dbe302865e31d48dd83589b355323552b3d4b4","bobpayment":"deefeeef59976f45218d27daab1a2ff3adc098ef8378c2455468809410ef43de","paymentspent":"4e4b1196e34ceb7b7be3666aba6188fe7838a3ce7ebfed23ecf47c8db8318441","Apaymentspent":"e75d6fc814574f91f28146497035f07e82a98d605fcf0825af370d7c411c7ee3","depositspent":"25894edaf3645bad1179a68926778f5c6e120131fbaedac126d448292101f262","alicedexfee":"b5559462881de25e9360e9e35c5b8a8d914572f5766b5d39353bcf50c6ca2a94","method":"tradestatus","finishtime":1531368367}
bobdeposit https://etherscan.io/tx/0x05488cbe08fb02b6dbabbebb1bf45107e57b2194bf80828aaa348c55b3608c72
alicepayment https://kmdexplorer.ru/tx/c767682eb12f7287ba638106d9dbe302865e31d48dd83589b355323552b3d4b4
bobpayment https://etherscan.io/tx/0x2f899b9e870890b8da9c60e7113c5e9eb121c35fab168863576526436cf41784

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DNT\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"district0x\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DNT\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"district0x\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DNT\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"district0x\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DNT\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"district0x\",\"refrel\":\"coinmarketcap\"}"
```

## DOGE

```
https://bitcointalk.org/index.php?topic=361813.0
https://github.com/dogecoin/dogecoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,30);  // 0x1e
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,22);  // 0x16
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,158); // 0x9e

src/policy/fees.h
MIN_FEERATE = 10
src/wallet/wallet.h
DEFAULT_TRANSACTION_FEE = 0

{\"coin\":\"DOGE\",\"name\":\"dogecoin\",\"rpcport\":22555,\"pubtype\":30,\"p2shtype\":22,\"wiftype\":158,\"txfee\":100000000}


cd ~/wallets
git clone https://github.com/dogecoin/dogecoin -b 1.14-dev
cd dogecoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo cp src/bitcoind /usr/local/bin/dogecoind
sudo cp src/bitcoin-cli /usr/local/bin/dogecoin-cli
sudo strip /usr/local/bin/dogecoin*
mkdir ~/.dogecoin
echo "server=1" >> ~/.dogecoin/dogecoin.conf
echo "txindex=1" >> ~/.dogecoin/dogecoin.conf
echo "listen=0" >> ~/.dogecoin/dogecoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.dogecoin/dogecoin.conf
echo "rpcuser=barterdoge" >> ~/.dogecoin/dogecoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.dogecoin/dogecoin.conf
echo "rpcworkqueue=64" >> ~/.dogecoin/dogecoin.conf
echo "rpcthreads=16" >> ~/.dogecoin/dogecoin.conf
chmod 0600 ~/.dogecoin/dogecoin.conf
dogecoind -daemon -datadir=$HOME/.dogecoin -conf=dogecoin.conf


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DOGE\"}"

home
   {
      "smartaddress" : "DSn2r4M8eNdNHCU84CZuWH1nrmMu3gbV1i",
      "coin" : "DOGE",
      "p2shtype" : 22,
      "pubtype" : 30,
      "rpc" : "127.0.0.1:22555",
      "status" : "active",
      "txfee" : 100000000,
      "wiftype" : 158
   },

contabo
   {
      "smartaddress" : "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8",
      "wiftype" : 158,
      "p2shtype" : 22,
      "coin" : "DOGE",
      "pubtype" : 30,
      "status" : "active",
      "txfee" : 100000000,
      "rpc" : "127.0.0.1:22555"
   },

dogecoin-cli -datadir=$HOME/.dogecoin -conf=dogecoin.conf sendtoaddress "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8" 4201
fee 1.00
```

## DRGN

```
{\"coin\":\"DRGN\",\"name\":\"dragonchain\",\"etomic\":\"0x419c4db4b9e25d6db2ad9691ccb832c8d9fda05e\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DRGN\"}"

home
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "status" : "active",
      "pubtype" : 0,
      "txfee" : 1000,
      "coin" : "DRGN",
      "wiftype" : 188,
      "height" : -1,
      "balance" : 0

contabo
      "pubtype" : 0,
      "wiftype" : 188,
      "height" : -1,
      "p2shtype" : 85,
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "DRGN",
      "installed" : false,
      "balance" : 0,
      "status" : "active",
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DRGN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DRGN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DRGN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Dragonchain (DRGN)
SWAP completed! 3999859836-40469150 {"uuid":"61962763033c0b464a35ad6286ec52561fc04508239b1713e0624acdcf13c962","expiration":1526620510,"tradeid":0,"requestid":3999859836,"quoteid":40469150,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DRGN","bobtomic":"0x419c4db4b9e25d6db2ad9691ccb832c8d9fda05e","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.74043164,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1839037208919212033","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.74044164, 0.08010000, 0.74045164, 0.08011000, 0.83300559, 0, 0, 0.83299559, 0, 0, 0],"result":"success","status":"finished","finishtime":1526605370,"bobdeposit":"ca73248cec005b1fbe0f918538312a1f39ccc4d199589613659efcb2c42274ef","alicepayment":"0f11b30e87d287a2c20129b8c7b4ec0b4e41be3728a02570cbd55291ba2953d4","bobpayment":"a71500d18270442be897842bf25e956cf06451a7de12e8a466636fe57e7087e3","paymentspent":"def1eeff364da01990b737536962970dc04d817a9b6229a2998cfa8fecac9c96","Apaymentspent":"c233cd3221a15bf4b150be645da41a623c325c46e761974c37309397200e2d9b","depositspent":"7899b80ede4d9a644f4305827ef04eb4ee1f695fd6a523ee6078a79c9269877f","method":"tradestatus","finishtime":1526605370}
bobdeposit https://etherscan.io/tx/0xcb69ff79f8f81733a23bc89a762ac424e88078992a93871ac156aab7960e6201
alicepayment https://kmdexplorer.ru/tx/0f11b30e87d287a2c20129b8c7b4ec0b4e41be3728a02570cbd55291ba2953d4
bobpayment https://etherscan.io/tx/0x317d8a5cb9e775b21f709abc811132aef14a91b849c8ba446eeb4a51b26563fd

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DRGN\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"dragonchain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DRGN\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"dragonchain\",\"refrel\":\"coinmarketcap\"}"
```

## DROP

```
{\"coin\":\"DROP\",\"name\":\"dropil\",\"etomic\":\"0x4672bad527107471cb5067a887f4656d585a8a31\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DROP\"}"

home
      "pubtype" : 0,
      "coin" : "DROP",
      "height" : -1,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "wiftype" : 188,
      "balance" : 0,
      "p2shtype" : 85

contabo
      "height" : -1,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "coin" : "DROP",
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "balance" : 100,
      "status" : "active",
      "p2shtype" : 85,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DROP\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DROP\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DROP\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Dropil (DROP)
SWAP completed! 2947201455-3397711440 {"uuid":"6c3ad0ecfc4f1291cb08c5fd7c647d18898cd4d665ecb6d62cc55014402dd347","expiration":1527741608,"tradeid":0,"requestid":2947201455,"quoteid":3397711440,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DROP","bobtomic":"0x4672bad527107471cb5067a887f4656d585a8a31","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70281908,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"15877005540082909185","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70282908, 0.08010000, 0.70283908, 0.08011000, 0.79069146, 0, 0, 0.79068146, 0, 0, 0],"result":"success","status":"finished","finishtime":1527726569,"bobdeposit":"33a8432a9424608f47cd8a12c1f14ed37dc4a2e3a5408e93509b1310248e8d6e","alicepayment":"a4c65a48e188514537e6a9860bf037d5373aeed4eced9b23bd02f8758050584f","bobpayment":"51320c9b7386a877b1e804160aad7ea5698f8e37fa7cc39185a38197a9bc3167","paymentspent":"b10fecee22fb2258617e8b18d5b821ebb1a2fb0e90128750b969216e47365400","Apaymentspent":"5dd199b10d23acfa16489ceffcb03a11737648c8c05cf9bc73aecb4b30738634","depositspent":"dde8370b4ab5285118b12770cdea4d4c6d9e4a2396bbed4a2dbdd58b2c5976bf","method":"tradestatus","finishtime":1527726569}
bobdeposit https://etherscan.io/tx/0x6c3fb7a05e8e8df3a1e9f8f063a565ca3544815acbba1654199a99baab66d0ba
alicepayment https://kmdexplorer.ru/tx/a4c65a48e188514537e6a9860bf037d5373aeed4eced9b23bd02f8758050584f
bobpayment https://etherscan.io/tx/0x1ec1d882ddaec9386145625c3fd7321a32dfd0221d99bee3c6e51645fa6a5ab8

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DROP\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"dropil\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DROP\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"dropil\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"DROP\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"dropil\",\"refrel\":\"coinmarketcap\"}"
```

## DRT

```
{\"coin\":\"DRT\",\"name\":\"domraider\",\"etomic\":\"0x9af4f26941677c706cfecf6d3379ff01bb85d5ab\",\"rpcport\":80}

home
     "status" : "active",
      "p2shtype" : 85,
      "wiftype" : 188,
      "installed" : false,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "coin" : "DRT",
      "height" : -1,
      "txfee" : 1000

contabo
      "coin" : "DRT",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "status" : "active",
      "txfee" : 1000,
      "installed" : false,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "balance" : 0,
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DRT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"DRT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"DRT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"DRT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
DomRaider (DRT)
SWAP completed! 2678844172-3898932508 {"expiration":1522378277,"tradeid":0,"requestid":2678844172,"quoteid":3898932508,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"DRT","bobtomic":"0x9af4f26941677c706cfecf6d3379ff01bb85d5ab","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.68365856,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"18104050651861090305","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.68366856, 0.08010000, 0.68367856, 0.08011000, 0.76913588, 0, 0, 0.76912588, 0, 0, 0],"result":"success","status":"finished","finishtime":1522363044,"bobdeposit":"12d084f1ac06df9b202ed7c91b5d98c2e38aead8fbb9f4e7e1616567040e41a9","alicepayment":"fab51cb883812e40ea22fa9586738ad93457383fea088099f2e7eff720d9fee7","bobpayment":"f4371bdb38e96f2f427c184ecab431d6be421067227af0ef537fdb63a72075e2","paymentspent":"7ba718e0441cc5fdbe3df6fd7786b71d9e6abf4476944db4f49f69d29aec5e57","Apaymentspent":"ae65bd3f12db656e36639dc1bb0dc3497cf29ce62c1253c125fe4a97fadc17c9","depositspent":"fdad1a7e9aebd1d4fc0ce7f01d2c8b46880094c3a08f840359548540c51c5c3e","method":"tradestatus","finishtime":1522363044}
bobdeposit https://etherscan.io/tx/0x36b5d757d98761361c170d73d6397f74fd4ffe7e6ea4324e45d5058d2b03d0f1
alicepayment https://kmd.explorer.supernet.org/tx/fab51cb883812e40ea22fa9586738ad93457383fea088099f2e7eff720d9fee7
bobpayment https://etherscan.io/tx/0x2ce2436f990fa0766a191706fc9cfef7b2be29101a8b1bf1dd141b8599807f07
```

## DSR

```
https://bitcointalk.org/index.php?topic=2272607.0
https://github.com/lazyboozer/Desire


src/chainparams.cpp
// Desire addresses start with 'D'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,30);
// Desire script addresses start with '7'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,16);
// Desire private keys start with '7' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

{\"coin\":\"DSR\",\"name\":\"desire\",\"confpath\":\"${HOME#}/.desirecore/desire.conf\",\"rpcport\":9918,\"pubtype\":30,\"p2shtype\":16,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/lazyboozer/Desire
cd Desire
chmod 755 autogen.sh share/genbuild.sh
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j2
sudo make install
sudo strip /usr/local/bin/desire*
mkdir ~/.desirecore
echo "server=1" >> ~/.desirecore/desire.conf
echo "txindex=1" >> ~/.desirecore/desire.conf
echo "litemode=1" >> ~/.desirecore/desire.conf
echo "listen=0" >> ~/.desirecore/desire.conf
echo "listenonion=0" >> ~/.desirecore/desire.conf
echo "rpcuser=barterdsr" >> ~/.desirecore/desire.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.desirecore/desire.conf
chmod 0600 ~/.desirecore/desire.conf
desired -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"DSR\"}"

home
      "KMDvalue" : 0,
      "txfee" : 10000,
      "status" : "active",
      "balance" : 1001,
      "wiftype" : 204,
      "height" : 3574,
      "pubtype" : 30,
      "rpc" : "127.0.0.1:10998",
      "installed" : true,
      "p2shtype" : 16,
      "smartaddress" : "DSn2r4M8eNdNHCU84CZuWH1nrmMu3gbV1i",
      "coin" : "DSR"

contabo
      "balance" : 0,
      "status" : "active",
      "smartaddress" : "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8",
      "txfee" : 10000,
      "rpc" : "127.0.0.1:10998",
      "KMDvalue" : 0,
      "height" : 3574,
      "coin" : "DSR",
      "p2shtype" : 16,
      "pubtype" : 30,
      "wiftype" : 204,
      "installed" : true

desire-cli sendtoaddress "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8" 1
desire-cli sendtoaddress "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8" 1.2
"fee": -0.00004520
```

## EFL

```
https://bitcointalk.org/index.php?topic=843017
https://github.com/Electronic-Gulden-Foundation/egulden


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,48);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 100000;

{\"coin\":\"EFL\",\"name\":\"egulden\",\"confpath\":\"${HOME#}/.egulden/coin.conf\",\"rpcport\":21015,\"pubtype\":48,\"p2shtype\":5,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/Electronic-Gulden-Foundation/egulden
cd egulden
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/egulden*
mkdir ~/.egulden
echo "server=1" >> ~/.egulden/coin.conf
echo "txindex=1" >> ~/.egulden/coin.conf
echo "listen=0" >> ~/.egulden/coin.conf
echo "listenonion=0" >> ~/.egulden/coin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.egulden/coin.conf
echo "rpcuser=barterefl" >> ~/.egulden/coin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.egulden/coin.conf
echo "addnode=dnsseed1.egulden.org" >> ~/.egulden/coin.conf
echo "addnode=dnsseed2.egulden.org" >> ~/.egulden/coin.conf
echo "addnode=dnsseed3.egulden.org" >> ~/.egulden/coin.conf
echo "addnode=dnsseed4.egulden.org" >> ~/.egulden/coin.conf
chmod 0600 ~/.egulden/coin.conf
eguldend -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"EFL\"}"

home
      "pubtype" : 48,
      "KMDvalue" : 0,
      "balance" : 0,
      "status" : "active",
      "wiftype" : 176,
      "height" : 1013814,
      "txfee" : 100000,
      "smartaddress" : "Lgrta1iKRcy8zzygVkZeEXuxBqzssPWtae",
      "rpc" : "127.0.0.1:21015",
      "installed" : true,
      "p2shtype" : 5,
      "coin" : "EFL"

contabo
      "pubtype" : 48,
      "wiftype" : 176,
      "txfee" : 100000,
      "height" : 1013785,
      "KMDvalue" : 0,
      "balance" : 0,
      "installed" : true,
      "status" : "active",
      "coin" : "EFL",
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:21015",
      "smartaddress" : "LM5k6NLb2J78BM7uh3pkZHWnRjAyjbz38N"

egulden-cli sendtoaddress "LM5k6NLb2J78BM7uh3pkZHWnRjAyjbz38N" 10
egulden-cli sendtoaddress "LM5k6NLb2J78BM7uh3pkZHWnRjAyjbz38N" 12
"fee": -0.00045200
```

## ELD

```
{\"coin\":\"ELD\",\"name\":\"electrumdark\",\"etomic\":\"0xaaf7d4cd097317d68174215395eb02c2cca81e31\",\"rpcport\":80}

home
      "coin" : "ELD",
      "pubtype" : 0,
      "status" : "active",
      "txfee" : 1000,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "installed" : false,
      "wiftype" : 188,
      "balance" : 0,
      "rpc" : "127.0.0.1:80"

contabo
      "installed" : false,
      "status" : "active",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "balance" : 0,
      "height" : -1,
      "coin" : "ELD",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ELD\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ELD\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ELD\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Electrum Dark (ELD)
SWAP completed! 4032085511-878440257 {"expiration":1523235473,"tradeid":0,"requestid":4032085511,"quoteid":878440257,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ELD","bobtomic":"0xaaf7d4cd097317d68174215395eb02c2cca81e31","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76441281,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"564685694847090689","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76442281, 0.08010000, 0.76443281, 0.08011000, 0.85998441, 0, 0, 0.85997441, 0, 0, 0],"result":"success","status":"finished","finishtime":1523220216,"bobdeposit":"1f4654986e2e5cf6945ae2b45805ed01cd27df949f2fd65cc3b96ba9a666a5c7","alicepayment":"dd8a950ffdbc8a0c64e8f42319a21161ce183f3a98e8290d92f03e1a84081fd4","bobpayment":"7d32dd44fd91109a9dfdccf17e75c22ffc1b9b604415f7ab8db7a6afbbbcc845","paymentspent":"daf730f7d4657258acbd9ce6cfd7f073e81f88f18ced4057a41e836d64c34164","Apaymentspent":"a53b7c299fbf2dbd8325269e16ec8c0974277ec0b6a257df9915c775c07b2e57","depositspent":"f5bfdda1e2744f1a515a92b20648235a9fe4c8ca64ec2a973b5a20db213f1226","method":"tradestatus","finishtime":1523220216}
bobdeposit https://etherscan.io/tx/0x48d5918ec6a06bd6601d2b8482772dd77a189ca55c8171d6b024cec80d2a2183
alicepayment https://kmd.explorer.supernet.org/tx/dd8a950ffdbc8a0c64e8f42319a21161ce183f3a98e8290d92f03e1a84081fd4
bobpayment https://etherscan.io/tx/0x5bbecb1ddb8bead826e6b354398f07ff0d182f0562c0890bb7ea1e7b0115d432

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"ELD\",\"fixed\":0.1}"
```

## ELF

```
{\"coin\":\"ELF\",\"name\":\"aelf\",\"etomic\":\"0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ELF\"}"

home
      "txfee" : 1000,
      "pubtype" : 0,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "p2shtype" : 85,
      "wiftype" : 188,
      "coin" : "ELF",
      "height" : -1

contabo
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "txfee" : 1000,
      "coin" : "ELF",
      "status" : "active",
      "wiftype" : 188,
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "installed" : false,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ELF\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ELF\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ELF\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
aelf (ELF)
SWAP completed! 1687993616-1347311738 {"uuid":"21497fc48b4790e1c31873c53e845aadb065e61e6225fa46cd194ae68fda1cbf","expiration":1528016772,"tradeid":0,"requestid":1687993616,"quoteid":1347311738,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ELF","bobtomic":"0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.75293694,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1982857183957024769","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.75294694, 0.08010000, 0.75295694, 0.08011000, 0.84707405, 0, 0, 0.84706405, 0, 0, 0],"result":"success","status":"finished","finishtime":1528002059,"bobdeposit":"3f69bcc4ccfeb77254d2fb57e69a14b30c9972eed3d9845be773c4de89f7bc9c","alicepayment":"c7df1ecd8af60223e520c701c3414219d9ccc62ea1cb48b88c0c47d513f11207","bobpayment":"c77306dbb1cf0ef819535229da51b4e6b9e87923e32445bbca6306eea582c136","paymentspent":"497c09992ea5851c6d9bb110a256d48e8700eaf9b32d741656a2db61ebb2e023","Apaymentspent":"67052c683839aefdbde27ae41e6ca25e100bdc93c6fdab0ec66c4c4eec0be9b4","depositspent":"1b5f6aba2a3a3b9a14c1a0f1279c0b66d1d4ba6a77625b231a54c088dc4861f7","method":"tradestatus","finishtime":1528002059}
bobdeposit https://etherscan.io/tx/0x7a8fcc0b42bdf704e30923c89a963324d905d18ae0e8bbd658eec2c753c3742a
alicepayment https://kmdexplorer.ru/tx/c7df1ecd8af60223e520c701c3414219d9ccc62ea1cb48b88c0c47d513f11207
bobpayment https://etherscan.io/tx/0xe77078ae9403e5e3601af1d1cc068257baac6434e8b86b0723a9077563c9522c

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ELF\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"aelf\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ELF\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"aelf\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ELF\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"aelf\",\"refrel\":\"coinmarketcap\"}"
```

## EMC2

```
https://bitcointalk.org/index.php?topic=494708.0
https://github.com/emc2foundation/einsteinium


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,33);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,55); // <-- Einsteinium: different than LTC and BTC!
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/wallet/wallet.h
DEFAULT_TRANSACTION_FEE = 0;
DEFAULT_FALLBACK_FEE = 200000;
DEFAULT_TRANSACTION_MINFEE = 100000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;

{\"coin\":\"EMC2\",\"name\":\"einsteinium\",\"rpcport\":41879,\"pubtype\":33,\"p2shtype\":5,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/emc2foundation/einsteinium
cd einsteinium
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/einsteinium*
mkdir ~/.einsteinium
echo "server=1" >> ~/.einsteinium/einsteinium.conf
echo "txindex=1" >> ~/.einsteinium/einsteinium.conf
echo "listen=0" >> ~/.einsteinium/einsteinium.conf
echo "listenonion=1" >> ~/.einsteinium/einsteinium.conf
echo "#proxy=127.0.0.1:9050" >> ~/.einsteinium/einsteinium.conf
echo "rpcuser=barteremc2" >> ~/.einsteinium/einsteinium.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.einsteinium/einsteinium.conf
echo "rpcworkqueue=64" >> ~/.einsteinium/einsteinium.conf
echo "rpcthreads=16" >> ~/.einsteinium/einsteinium.conf
chmod 0600 ~/.einsteinium/einsteinium.conf
einsteiniumd -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"EMC2\"}"

home
   {
      "estimatedrate" : 20,
      "rpc" : "127.0.0.1:41879",
      "pubtype" : 33,
      "txfee" : 100000,
      "wiftype" : 176,
      "smartaddress" : "EenqoPEzmv1zjVtP8TZrxeq9kH8j8v4zqd",
      "coin" : "EMC2",
      "status" : "active",
      "p2shtype" : 5
   },

contabo
   {
      "coin" : "EMC2",
      "txfee" : 100000,
      "pubtype" : 33,
      "p2shtype" : 5,
      "wiftype" : 176,
      "status" : "active",
      "smartaddress" : "EK1hKjsGNb9yur2cKkpyHQRyzAJq3BZeJ1",
      "rpc" : "127.0.0.1:41879"
   },

"fee": -0.00045200,
```

## ENG

```
{\"coin\":\"ENG\",\"name\":\"enigma-project\",\"etomic\":\"0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ENG\"}"

home
      "height" : -1,
      "installed" : false,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "txfee" : 1000,
      "status" : "active",
      "coin" : "ENG",
      "pubtype" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0

hetzner
      "txfee" : 1000,
      "p2shtype" : 85,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "height" : -1,
      "status" : "active",
      "balance" : 17.78,
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "coin" : "ENG",
      "wiftype" : 188

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ENG\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ENG\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Enigma (ENG)
SWAP completed! 452881085-3657306391 {"uuid":"fb12353a0beb205489c240bedf404c957f6790b119db20deb4aea3a3848eece3","expiration":1531324954,"tradeid":0,"requestid":452881085,"quoteid":3657306391,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ENG","bobtomic":"0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.73363211,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"331188198228492289","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531310023,"bobdeposit":"5241ddd801a3fba5deaa0ee55e3888c9bbce371529e1de6dde356ee46aef8669","alicepayment":"fbe5e864a0360bddf82dd70137580305c097b193705e80d2be2e03c7d6c1731b","bobpayment":"573be61e577e22b6f13624651e629a91e921d27cb159245e05b265c1ac73d22f","paymentspent":"bab099f048f4e15e063fc7645bd2a655f2f1a0c1703f6546e91b0aa233831529","Apaymentspent":"5c72a6d13582ee7e97420c6add94d5e430924bb0ecb09230f928d82549dad512","depositspent":"500c88140e16a1a89c2a12a85e06180da288c0d037b44eb713850644e8f0f217","alicedexfee":"bf87b74daf19e710e09bfab276a8145ad25e551ee6d68fa9f710a77331317941","method":"tradestatus","finishtime":1531310023}
bobdeposit https://etherscan.io/tx/0xa0cbe959b60875b73a4674d315a31acb288afba30f9e6d971c6d71476c27c989
alicepayment https://kmdexplorer.ru/tx/fbe5e864a0360bddf82dd70137580305c097b193705e80d2be2e03c7d6c1731b
bobpayment https://etherscan.io/tx/0xa101e146232aca3bd01f8fe0c7dde94e0d616eaa766fbe34ce8d27178b82d51c

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ENG\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"enigma-project\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ENG\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"enigma-project\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ENG\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"enigma-project\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ENG\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"enigma-project\",\"refrel\":\"coinmarketcap\"}"
```

## ENJ

```
{\"coin\":\"ENJ\",\"name\":\"enjin-coin\",\"etomic\":\"0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ENJ\"}"

home
      "height" : -1,
      "status" : "active",
      "balance" : 0,
      "wiftype" : 188,
      "installed" : false,
      "txfee" : 1000,
      "coin" : "ENJ",
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "wiftype" : 188,
      "txfee" : 1000,
      "p2shtype" : 85,
      "coin" : "ENJ",
      "status" : "active",
      "installed" : false,
      "height" : -1,
      "balance" : 189.8

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ENJ\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ENJ\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ENJ\",\"rel\":\"KMD\",\"relvolume\":0.2,\"price\":0.12}"
Enjin Coin (ENJ)
SWAP completed! 2729682583-2463275409 {"uuid":"80cd73ce01e4b0f7995269efe824771b5b878c26bf56b1ed7151d08ab3024bc9","expiration":1531204481,"tradeid":0,"requestid":2729682583,"quoteid":2463275409,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ENJ","bobtomic":"0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":1.70461217,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.20009000,"alicetxfee":0.00001000,"aliceid":"8138829758793711617","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.20010000, 1.00002000, 0.20011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531189782,"bobdeposit":"2009865e58dffbe0ed82d1d05e3388a4f23718461b644e64e3718c777dfa1cf2","alicepayment":"7e78edfef58ab6b060d2719a33725abad5ba5d3a1ed05bdda47217ae07dd63c4","bobpayment":"6658aec8e616c17b2ae806f371e64abf8d80631a2637ae75a837b78ad431cba7","paymentspent":"0e8d7e4594bde5148d7664b9a7c51c2e4ae4ae956cf14e6fdc8ddb58e162f465","Apaymentspent":"fcf53ac1ea9f8728f0ba44022c6eead988aa4ef0c8fbab3358c479b5498fe79a","depositspent":"43a3038405455a00e787adfe654afd59c830c7bf646f77a478fea725065fc17f","alicedexfee":"a51baf33658e91169ec909901208db47fdf2f891a946ef295cbf6722e9d8b4f8","method":"tradestatus","finishtime":1531189782}
bobdeposit https://etherscan.io/tx/0x27d8d5b6865bf3007eb1aefbab694412ee01405ee8afdaba3b530f7017fcbe25
alicepayment https://kmdexplorer.ru/tx/7e78edfef58ab6b060d2719a33725abad5ba5d3a1ed05bdda47217ae07dd63c4
bobpayment https://etherscan.io/tx/0xeb681dc12fa487121fd6445a695403ceef15c4291a1813244236885a6d4e3569

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ENJ\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"enjin-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ENJ\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"enjin-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ENJ\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"enjin-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ENJ\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"enjin-coin\",\"refrel\":\"coinmarketcap\"}"
```

## EOS

```
{\"coin\":\"EOS\",\"name\":\"eos\",\"etomic\":\"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"EOS\"}"

home
      "installed" : false,
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0,
      "height" : -1,
      "coin" : "EOS",
      "status" : "active",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "pubtype" : 0

contabo
      "p2shtype" : 85,
      "pubtype" : 0,
      "coin" : "EOS",
      "balance" : 0,
      "status" : "active",
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"EOS\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"EOS\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"EOS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"EOS\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
EOS (EOS)
SWAP completed! 919442236-1471120909 {"uuid":"18bb187216a9fc413353a450df33450a595192aa03f2d7b65b0f45ee8740a4d0","expiration":1526423614,"tradeid":0,"requestid":919442236,"quoteid":1471120909,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"EOS","bobtomic":"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73366211,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"13595229646278623233","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.73367211, 0.08010000, 0.73368211, 0.08011000, 0.82538987, 0, 0, 0.82537987, 0, 0, 0],"result":"success","status":"finished","finishtime":1526408515,"bobdeposit":"379e4febb507c78e2de4fb5a88cf25339f2ea6b5e9084efc7bc0347cc04bcee5","alicepayment":"4b41c6724a3981bc65c719cfd45a9ef8c1bcc40aa527f23866c71eb32edabbcb","bobpayment":"3425e76d16a081c34632fcb834021247e4f7b77998f44d0cab6008713519bb8d","paymentspent":"63465aeb2a2921213f69069e1fbb9815363a20c84da3f8d06377f773b970e35b","Apaymentspent":"4c39ffae2cab2c46ec9a8d9eb75e681081d1b2ed71b276b9bffd5efb5c609fa1","depositspent":"d10d894a75343d27878da1636ee02a334a83e3db257721f3423321c5404a53ed","method":"tradestatus","finishtime":1526408515}
bobdeposit https://etherscan.io/tx/0x7816b1acfd730fc2bd87b6cbb210b32206f5f7ae24420aa847ec1b56ae4d669e
alicepayment https://kmdexplorer.ru/tx/4b41c6724a3981bc65c719cfd45a9ef8c1bcc40aa527f23866c71eb32edabbcb
bobpayment https://etherscan.io/tx/0x90151c97aab5dd6b43a433c3fffabd2bef34e81ec36b0684c6c189bb541a0234

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"EOS\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"eos\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"EOS\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"eos\",\"refrel\":\"coinmarketcap\"}"
```

## ERC

```
https://bitcointalk.org/index.php?topic=901605
https://github.com/LIMXTEC/Europecoin-V3


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,33);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,40+128);

src/wallet/wallet.h
DEFAULT_TRANSACTION_FEE = 0;
src/main.cpp
minRelayTxFee = CFeeRate(10000);

{\"coin\":\"ERC\",\"name\":\"europecoin\",\"rpcport\":11989,\"pubtype\":33,\"p2shtype\":5,\"wiftype\":168,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/LIMXTEC/Europecoin-V3
cd Europecoin-V3
chmod 755 autogen.sh
chmod 755 share/genbuild.sh
chmod 755 src/leveldb/build_detect_platform
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc
make -j4
sudo make install
sudo strip /usr/local/bin/europecoin*
mkdir ~/.europecoin
echo "server=1" >> ~/.europecoin/europecoin.conf
echo "listen=0" >> ~/.europecoin/europecoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.europecoin/europecoin.conf
echo "rpcuser=bartererc" >> ~/.europecoin/europecoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.europecoin/europecoin.conf
echo "rpcworkqueue=64" >> ~/.europecoin/europecoin.conf
echo "rpcthreads=16" >> ~/.europecoin/europecoin.conf
chmod 0600 ~/.europecoin/europecoin.conf
europecoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ERC\"}"

home
   {
      "pubtype" : 33,
      "p2shtype" : 5,
      "smartaddress" : "EenqoPEzmv1zjVtP8TZrxeq9kH8j8v4zqd",
      "rpc" : "127.0.0.1:11989",
      "status" : "active",
      "coin" : "ERC",
      "wiftype" : 168,
      "txfee" : 10000
   },

contabo
   {
      "pubtype" : 33,
      "p2shtype" : 5,
      "txfee" : 10000,
      "coin" : "ERC",
      "status" : "active",
      "rpc" : "127.0.0.1:11989",
      "smartaddress" : "EK1hKjsGNb9yur2cKkpyHQRyzAJq3BZeJ1",
      "wiftype" : 168
   },

europecoin-cli sendtoaddress "EK1hKjsGNb9yur2cKkpyHQRyzAJq3BZeJ1" 2.43323167
europecoin-cli sendtoaddress "EK1hKjsGNb9yur2cKkpyHQRyzAJq3BZeJ1" 2.91987800
```

## ETHOS

```
{\"coin\":\"ETHOS\",\"name\":\"ethos\",\"etomic\":\"0x5Af2Be193a6ABCa9c8817001F45744777Db30756\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ETHOS\"}"

home
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "coin" : "ETHOS",
      "pubtype" : 0,
      "wiftype" : 188,
      "txfee" : 1000,
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "installed" : false

contabo
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "txfee" : 1000,
      "wiftype" : 188,
      "balance" : 58.99940415,
      "height" : -1,
      "p2shtype" : 85,
      "status" : "active",
      "coin" : "ETHOS",
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ETHOS\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ETHOS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ETHOS\",\"rel\":\"KMD\",\"relvolume\":1.2,\"price\":0.12}"
Ethos (ETHOS)
SWAP completed! 481087108-683011771 {"uuid":"972b27f299d01bdc09ea69051ce7397b4f65e79e6de74d1b917cd7cf6264ed40","expiration":1531085846,"tradeid":0,"requestid":481087108,"quoteid":683011771,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ETHOS","bobtomic":"0x5Af2Be193a6ABCa9c8817001F45744777Db30756","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":11.60643652,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":1.20009000,"alicetxfee":0.00001000,"aliceid":"4853712491132289025","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 1.20010000, 1.00002000, 1.20011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531072377,"bobdeposit":"f5808f7d48db765323782c8d95840c9c3ca60d087d87fe116971353abf8c29c4","alicepayment":"d28f6d738bfd963ab785c98e03b9f1f7856cea025e4a51b754aae9b99bd917c1","bobpayment":"2907ca08b3b2a1f8426d9b94ddf4dbfba53135aaffe5dff34a81d0aa22b8c258","paymentspent":"ae243d2230f10d412b79cf5a55d1e1caa0cbb31a6ccb9f8d6a0ace4ff07e51ca","Apaymentspent":"a102d583b618a8b281966dc8d0414ca526ac0948fe65e86be5143afa1e257c78","depositspent":"3f1122e0e92e6de5cc34aac82002e7585e6191c1c3bfb25eb1ba807d15cb20bb","alicedexfee":"c2a0986e9a4d88c39a55678dab568c835d96a3431c3ca67150d443de38a656b3","method":"tradestatus","finishtime":1531072377}
bobdeposit https://etherscan.io/tx/0x258eb33c1a9c5b66113c8505d10b3633f0c47149b35cf48f5ff5c832f30d8ae0
alicepayment https://kmdexplorer.ru/tx/d28f6d738bfd963ab785c98e03b9f1f7856cea025e4a51b754aae9b99bd917c1
bobpayment https://etherscan.io/tx/0xe713b2efab67f4a6db399e08b97c12b7f0102ac56784a09fc2b368280b891fc2

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ETHOS\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"ethos\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ETHOS\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"ethos\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ETHOS\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"ethos\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ETHOS\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"ethos\",\"refrel\":\"coinmarketcap\"}"
```

## FAIR

```
https://bitcointalk.org/index.php?topic=702675.0
https://github.com/faircoin/faircoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,95);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,36);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,223);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_TRANSACTION_MINFEE = 1000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 10 * CENT;
src/amount.h
CENT = 1000000;

{\"coin\":\"FAIR\",\"name\":\"faircoin\",\"confpath\":\"${HOME#}/.faircoin2/faircoin.conf\",\"rpcport\":40405,\"pubtype\":95,\"p2shtype\":36,\"wiftype\":223,\"txfee\":1000000}


cd ~/wallets
git clone https://github.com/faircoin/faircoin
cd faircoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/faircoin*
mkdir ~/.faircoin2
echo "server=1" >> ~/.faircoin2/faircoin.conf
echo "listen=0" >> ~/.faircoin2/faircoin.conf
echo "listenonion=1" >> ~/.faircoin2/faircoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.faircoin2/faircoin.conf
echo "rpcuser=barterfair" >> ~/.faircoin2/faircoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.faircoin2/faircoin.conf
echo "rpcworkqueue=64" >> ~/.faircoin2/faircoin.conf
echo "rpcthreads=16" >> ~/.faircoin2/faircoin.conf
chmod 0600 ~/.faircoin2/faircoin.conf
faircoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"FAIR\"}"

home
   {
      "coin" : "FAIR",
      "status" : "active",
      "smartaddress" : "fbkEr7iro6kKSNXkeUDd2RhvmZ7DHxZ1s3",
      "pubtype" : 95,
      "rpc" : "127.0.0.1:40405",
      "p2shtype" : 36,
      "txfee" : 1000000,
      "wiftype" : 223
   },

contabo
   {
      "p2shtype" : 36,
      "coin" : "FAIR",
      "wiftype" : 223,
      "rpc" : "127.0.0.1:40405",
      "smartaddress" : "fFy6NUM8PmtJcifyqmUjMBJm1SHK86Vrrp",
      "pubtype" : 95,
      "txfee" : 1000000,
      "status" : "active"
   },

faircoin-cli sendtoaddress "fFy6NUM8PmtJcifyqmUjMBJm1SHK86Vrrp" 1.12657143
"fee": -0.00225000,
faircoin-cli sendtoaddress "fFy6NUM8PmtJcifyqmUjMBJm1SHK86Vrrp" 1.35188571
"fee": -0.00521000,
```

## FLLW

```
{\"coin\":\"FLLW\",\"name\":\"followcoin\",\"etomic\":\"0x0200412995f1bafef0d3f97c4e28ac2515ec1ece\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"FLLW\"}"

home
      "installed" : false,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "coin" : "FLLW",
      "balance" : 0,
      "wiftype" : 188,
      "height" : -1,
      "p2shtype" : 85,
      "pubtype" : 0,
      "txfee" : 1000

contabo
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "height" : -1,
      "pubtype" : 0,
      "status" : "active",
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "FLLW",
      "balance" : 0,
      "installed" : false


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"FLLW\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":50}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"FLLW\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"FLLW\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
FollowCoin (FLLW)
SWAP completed! 2396193931-3843239979 {"uuid":"264f0a478edae523006bd77d763cc56b0f4dcf1a5e2698dda7262d290d0ec3ef","expiration":1527306963,"tradeid":0,"requestid":2396193931,"quoteid":3843239979,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"FLLW","bobtomic":"0x0200412995f1bafef0d3f97c4e28ac2515ec1ece","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76006859,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1109095903541854209","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76007859, 0.08010000, 0.76008859, 0.08011000, 0.85509716, 0, 0, 0.85508716, 0, 0, 0],"result":"success","status":"finished","finishtime":1527292222,"bobdeposit":"170bb44499e7c844633657054a2a64e0abada3580af7f655f045fc3e3c5c1795","alicepayment":"99d83f76325a08936b99d693243c2b8c5f3e5f345cef2027dc2a111a5fa0edae","bobpayment":"728383be666e9a28a067eac4b0238927ebd8cba556d2de810dcd6ab9fe511303","paymentspent":"18d7b73bc1f31c6b733d13f175670340a62e7e056026fa94ad3111d19bce03c2","Apaymentspent":"6c183caa3bee04ece41dd0eb7cd1e3d960c57ee21b6112011d7f8d6deb12c25d","depositspent":"7a29fccd7796e11567c98808e29b94a14bc351e4f368dec9d6bcef234f0c2902","method":"tradestatus","finishtime":1527292222}
bobdeposit https://etherscan.io/tx/0xb16c36469bb3795186d2728702882a52da32fe58d6d7fffed6b795f07ff0787c
alicepayment https://kmdexplorer.ru/tx/99d83f76325a08936b99d693243c2b8c5f3e5f345cef2027dc2a111a5fa0edae
bobpayment https://etherscan.io/tx/0x885f10d80ff6bf11765c3981aa96745b29f83464d13fca39a307f3e01489234c

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"FLLW\",\"fixed\":0.1}"
```

## FLO

```
https://bitcointalk.org/index.php?topic=236742
https://github.com/florincoin/florincoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = list_of(35);
base58Prefixes[SCRIPT_ADDRESS] = list_of(8);
base58Prefixes[SECRET_KEY] =     list_of(176);

src/main.h
DEFAULT_TX_FEE = 100000; // 0.001 FLO

{\"coin\":\"FLO\",\"name\":\"florincoin\",\"rpcport\":7313,\"pubtype\":35,\"p2shtype\":8,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/florincoin/florincoin
cd florincoin
./autogen.sh
CC=gcc-5 CXX=g++-5 CPP=cpp-5 ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
#--with-libressl
make -j4
sudo make install
sudo strip /usr/local/bin/florincoin*
mkdir ~/.florincoin
echo "server=1" >> ~/.florincoin/florincoin.conf
echo "listen=0" >> ~/.florincoin/florincoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.florincoin/florincoin.conf
echo "rpcuser=barterflo" >> ~/.florincoin/florincoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.florincoin/florincoin.conf
chmod 0600 ~/.florincoin/florincoin.conf
florincoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"FLO\"}"

home
   {
      "p2shtype" : 8,
      "rpc" : "127.0.0.1:7313",
      "txfee" : 100000,
      "pubtype" : 35,
      "coin" : "FLO",
      "smartaddress" : "FTU3mbqaCGwkNNAZBJEVvuNj1HecZiUMKB",
      "status" : "active",
      "wiftype" : 176
   },

contabo
   {
      "coin" : "FLO",
      "wiftype" : 176,
      "pubtype" : 35,
      "smartaddress" : "F7guHxTqnx5jYiJnNbVcFeyZFApiS5bYWM",
      "status" : "active",
      "txfee" : 100000,
      "p2shtype" : 8,
      "rpc" : "127.0.0.1:7313"
   },

florincoin-cli sendtoaddress "F7guHxTqnx5jYiJnNbVcFeyZFApiS5bYWM" 3.91599998
florincoin-cli sendtoaddress "F7guHxTqnx5jYiJnNbVcFeyZFApiS5bYWM" 4.69919997
```

## FSN

```
{\"coin\":\"FSN\",\"name\":\"fusion\",\"etomic\":\"0xd0352a019e9ab9d757776f532377aaebd36fd541\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"FSN\"}"

home
      "p2shtype" : 85,
      "height" : -1,
      "installed" : false,
      "balance" : 0,
      "coin" : "FSN",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "pubtype" : 0,
      "wiftype" : 188

contabo
      "txfee" : 1000,
      "installed" : false,
      "coin" : "FSN",
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "wiftype" : 188,
      "balance" : 0,
      "pubtype" : 0,
      "status" : "active",
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"FSN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"FSN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"FSN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Fusion (FSN)
SWAP completed! 3304723881-2211906237 {"uuid":"751ed74ab31bd01c5122a927b23ea5997b26917d5998e63e5ba5452d4def7433","expiration":1527442846,"tradeid":0,"requestid":3304723881,"quoteid":2211906237,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"FSN","bobtomic":"0xd0352a019e9ab9d757776f532377aaebd36fd541","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.75012162,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"7269379403310825473","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.75013162, 0.08010000, 0.75014162, 0.08011000, 0.84390682, 0, 0, 0.84389682, 0, 0, 0],"result":"success","status":"finished","finishtime":1527427792,"bobdeposit":"9285ddf1da1fce9490ed8b0b49f3bb17a9983c055d62c9dbe04fd3a88d9f7d4e","alicepayment":"702a790ef419a68eab5114cbdbe75684fca595b83e7de68911b13caa4951b849","bobpayment":"9fac4b82ec85eab603ad4dc5867157840427a96ca8509970e23c2aa889af8d6c","paymentspent":"7d9d2cd62914e332ba43db2abf54e4e42e2c70cf8ed2a51e3c9630ce4fa5eb0a","Apaymentspent":"6d8a753c8d7efee4693bda2f4683eb705dac3bce09e108fd534f447e2d82c9a1","depositspent":"96904cbf7140e68dbf25650955ecd6d1d090045f7dee4b94e749219c074bb5c7","method":"tradestatus","finishtime":1527427792}
bobdeposit https://etherscan.io/tx/0xdecd8834e3d3acf92d9787fd2ca22c9e678bd94ee6e390d5fad43af5d90fb3b0
alicepayment https://kmdexplorer.ru/tx/702a790ef419a68eab5114cbdbe75684fca595b83e7de68911b13caa4951b849
bobpayment https://etherscan.io/tx/0xfec87f9cc4cdaef91be9fbca53f33c39065e397acb11a22c270abd35a6028922

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FSN\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"fusion\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FSN\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"fusion\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FSN\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"fusion\",\"refrel\":\"coinmarketcap\"}"
```

## FTC

```
https://bitcointalk.org/index.php?topic=178286.0
https://github.com/FeatherCoin/Feathercoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,14);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,142);

{\"coin\":\"FTC\",\"name\":\"feathercoin\",\"rpcport\":9337,\"pubtype\":14,\"p2shtype\":5,\"wiftype\":142,\"txfee\":1000000}


cd ~/wallets
git clone https://github.com/FeatherCoin/Feathercoin
cd Feathercoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq --enable-sse2
make -j4
sudo make install
sudo strip /usr/local/bin/feathercoin*
mkdir ~/.feathercoin
echo "server=1" >> ~/.feathercoin/feathercoin.conf
echo "txindex=1" >> ~/.feathercoin/feathercoin.conf
echo "listen=0" >> ~/.feathercoin/feathercoin.conf
echo "listenonion=0" >> ~/.feathercoin/feathercoin.conf
echo "rpcuser=barterftc" >> ~/.feathercoin/feathercoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.feathercoin/feathercoin.conf
chmod 0600 ~/.feathercoin/feathercoin.conf
feathercoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"FTC\"}"

home
      "coin" : "FTC",
      "KMDvalue" : 0,
      "height" : 2134967,
      "txfee" : 1000000,
      "wiftype" : 142,
      "installed" : true,
      "p2shtype" : 5,
      "pubtype" : 14,
      "status" : "active",
      "smartaddress" : "71NP6KaXHVDMCGEjfVEokGfCnhEodoAdaD",
      "rpc" : "127.0.0.1:9337",
      "balance" : 6.6529167

contabo
      "txfee" : 1000000,
      "balance" : 2.2,
      "height" : 2134966,
      "wiftype" : 142,
      "installed" : true,
      "status" : "active",
      "smartaddress" : "6fbEcgCntAMLNcNxrnVv52G32aQuZzxA7Q",
      "pubtype" : 14,
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:9337",
      "coin" : "FTC",
      "p2shtype" : 5

feathercoin-cli sendtoaddress "6fbEcgCntAMLNcNxrnVv52G32aQuZzxA7Q" 1
feathercoin-cli sendtoaddress "6fbEcgCntAMLNcNxrnVv52G32aQuZzxA7Q" 1.2
"fee": -0.00452000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FTC\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"feathercoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FTC\",\"rel\":\"BTC\",\"margin\":0.07,\"refbase\":\"feathercoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FTC\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"feathercoin\",\"refrel\":\"coinmarketcap\"}"

```

## FUN

```
{\"coin\":\"FUN\",\"name\":\"funfair\",\"etomic\":\"0x419d0d8bdd9af5e606ae2232ed285aff190e711b\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"FUN\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "coin" : "FUN",
      "height" : -1,
      "wiftype" : 188,
      "balance" : 0,
      "txfee" : 1000,
      "status" : "active",
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "pubtype" : 0

contabo
      "balance" : 0,
      "height" : -1,
      "p2shtype" : 85,
      "pubtype" : 0,
      "status" : "active",
      "txfee" : 1000,
      "coin" : "FUN",
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"FUN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"FUN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"FUN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
FunFair (FUN)
SWAP completed! 423777958-3656463508 {"uuid":"412f572fa3ea983a0e50d8287045a1ca14a08a5a84376eb2761382cadbd290dd","expiration":1527399331,"tradeid":0,"requestid":423777958,"quoteid":3656463508,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"FUN","bobtomic":"0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70036548,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"7826542694367100929","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70037548, 0.08010000, 0.70038548, 0.08011000, 0.78793116, 0, 0, 0.78792116, 0, 0, 0],"result":"success","status":"finished","finishtime":1527384631,"bobdeposit":"a3248dbfbe5fa2c1616f2b6901051d1b3814c0314757e469e23c92086a57ceef","alicepayment":"ee05676a8161b3f096a71d38b5f3bfddbea4a0199d352cbfa19395390cef85c2","bobpayment":"c819e179f587f01909c4da72316f808fa67dfe2728b611cea39b93c5097f6235","paymentspent":"9eb2e362157010fd524422560a59d3c86022d98e84b7de94fd3ed4a01761a750","Apaymentspent":"6b15257f65a05b5762eec2cc97050eb6b063feb9c2fa38f36ed5af5778d124c8","depositspent":"a30e0259ac1a6b9612c357c5fa4ace0a0bc735c8c0250bff726eca7a360025a5","method":"tradestatus","finishtime":1527384631}
bobdeposit https://etherscan.io/tx/0x1fbc6252de714a1823d3dd6c3f5f644d8cef1ed4d6799839831137e7a52de740
alicepayment https://kmdexplorer.ru/tx/ee05676a8161b3f096a71d38b5f3bfddbea4a0199d352cbfa19395390cef85c2
bobpayment https://etherscan.io/tx/0x03f5f49fded98d198972e78e70e43276cde5ea172cdd298237ecc0770c2e6741

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FUN\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"funfair\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FUN\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"funfair\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"FUN\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"funfair\",\"refrel\":\"coinmarketcap\"}"
```

## GAME

```
https://bitcointalk.org/index.php?topic=1266597
https://github.com/gamecredits-project/GameCredits


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,38); // G
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5); // 3
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,166); // R

{\"coin\":\"GAME\",\"name\":\"gamecredits\",\"rpcport\":40001,\"pubtype\":38,\"p2shtype\":5,\"wiftype\":166,\"txfee\":1000000}


sudo apt-get install libssl1.0-dev
cd ~/wallets
git clone https://github.com/gamecredits-project/GameCredits
cd GameCredits
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq --enable-experimental-asm
make -j4
sudo make install
sudo strip /usr/local/bin/gamecredits*
sudo apt-get install libssl-dev
mkdir ~/.gamecredits
echo "server=1" >> ~/.gamecredits/gamecredits.conf
echo "txindex=1" >> ~/.gamecredits/gamecredits.conf
echo "listen=0" >> ~/.gamecredits/gamecredits.conf
echo "listenonion=0" >> ~/.gamecredits/gamecredits.conf
echo "rpcuser=bartergame" >> ~/.gamecredits/gamecredits.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.gamecredits/gamecredits.conf
echo "rpcworkqueue=64" >> ~/.gamecredits/gamecredits.conf
echo "rpcthreads=16" >> ~/.gamecredits/gamecredits.conf
chmod 0600 ~/.gamecredits/gamecredits.conf
gamecreditsd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GAME\"}"

home
      "coin" : "GAME",
      "rpc" : "127.0.0.1:40001",
      "status" : "active",
      "pubtype" : 38,
      "KMDvalue" : 0,
      "balance" : 0,
      "height" : 2033992,
      "smartaddress" : "GfUrivjSKpLNpfapFZETPHC5toRSidBkFt",
      "installed" : true,
      "txfee" : 1000000,
      "wiftype" : 166,
      "p2shtype" : 5

contabo
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:40001",
      "balance" : 0,
      "status" : "active",
      "KMDvalue" : 0,
      "height" : 2033992,
      "coin" : "GAME",
      "installed" : true,
      "wiftype" : 166,
      "txfee" : 1000000,
      "smartaddress" : "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd",
      "pubtype" : 38

gamecredits-cli sendtoaddress "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd" 1
"fee": -0.00610659

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"GAME\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"GAME\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
GameCredits (GAME)
SWAP completed! 1627656040-446827460 {"uuid":"c3cea9bdafb8025f4da329c82f552a938d8dd4a69d3bae8537ead9af689d8ef7","expiration":1525542363,"tradeid":0,"requestid":1627656040,"quoteid":446827460,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"GAME","srcamount":0.73685658,"bobtxfee":0.01000000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"11846672004652859393","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.74685658, 0.08010000, 0.75685658, 0.08011000, 0.84896365, 0, 0, 0.83896365, 0, 0, 0],"result":"success","status":"finished","finishtime":1525528073,"bobdeposit":"202b3a1b5f37c39b8ba7ad6cc41aca1d33fc9dcf993099819d9199bac2919d40","alicepayment":"af05e083696c58bf1481a142d5473aa61d59e569ea1251be46e2211afe764b16","bobpayment":"58056c82ab1b4dcb787ccc44f493f125a33b407ec0b755947750bf0a78383a02","paymentspent":"64fea28ce0bb76baedae9a27e5af98365e9d6f6026525a4ea900738936159e09","Apaymentspent":"3f160c6f316e0c3b1a4cfa848b92fd6aaffc9ac0a866e9a472f3b7fa80b2e715","depositspent":"b0e7851e495841af9beaf769544245872bf8ecab1219e36946e20b48ba661659","method":"tradestatus","finishtime":1525528073}
bobdeposit https://blockexplorer.gamecredits.com/transactions/202b3a1b5f37c39b8ba7ad6cc41aca1d33fc9dcf993099819d9199bac2919d40
alicepayment http://www.kmdexplorer.ru/tx/af05e083696c58bf1481a142d5473aa61d59e569ea1251be46e2211afe764b16
bobpayment https://blockexplorer.gamecredits.com/transactions/58056c82ab1b4dcb787ccc44f493f125a33b407ec0b755947750bf0a78383a02
```

## GBX

```
https://bitcointalk.org/index.php?topic=2442185.0
https://github.com/gobytecoin/gobyte


src/chainparams.cpp
// GoByte addresses start with 'G'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,38);
// GoByte script addresses start with '5'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,10);
// GoByte private keys start with '5' or 'G' (?)
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,198);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 10000; // was 1000

{\"coin\":\"GBX\",\"name\":\"gobyte\",\"confpath\":\"${HOME#}/.gobytecore/gobyte.conf\",\"rpcport\":12454,\"pubtype\":38,\"p2shtype\":10,\"wiftype\":198,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/gobytecoin/gobyte
cd gobyte
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/gobyte*
mkdir ~/.gobytecore
echo "server=1" >> ~/.gobytecore/gobyte.conf
echo "txindex=1" >> ~/.gobytecore/gobyte.conf
echo "litemode=1" >> ~/.gobytecore/gobyte.conf
echo "listen=0" >> ~/.gobytecore/gobyte.conf
echo "listenonion=0" >> ~/.gobytecore/gobyte.conf
echo "rpcuser=bartergbx" >> ~/.gobytecore/gobyte.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.gobytecore/gobyte.conf
chmod 0600 ~/.gobytecore/gobyte.conf
gobyted -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GBX\"}"

home
      "KMDvalue" : 0,
      "smartaddress" : "GfUrivjSKpLNpfapFZETPHC5toRSidBkFt",
      "rpc" : "127.0.0.1:12454",
      "txfee" : 10000,
      "wiftype" : 198,
      "height" : 20134,
      "coin" : "GBX",
      "status" : "active",
      "installed" : true,
      "p2shtype" : 10,
      "pubtype" : 38,
      "balance" : 0

contabo
      "balance" : 0,
      "installed" : true,
      "status" : "active",
      "rpc" : "127.0.0.1:12454",
      "KMDvalue" : 0,
      "pubtype" : 38,
      "height" : 20123,
      "coin" : "GBX",
      "txfee" : 10000,
      "p2shtype" : 10,
      "smartaddress" : "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd",
      "wiftype" : 198

gobyte-cli sendtoaddress "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd" 0.45
gobyte-cli sendtoaddress "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd" 0.55
"fee": -0.00004520
```

## GLD

```
https://bitcointalk.org/index.php?topic=317568
https://github.com/goldcoin/goldcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,32);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,50);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,32+128);

src/validation.h:static const unsigned int DEFAULT_MIN_RELAY_TX_FEE = 1000000;
src/policy/policy.h:static const unsigned int DUST_RELAY_TX_FEE = 100000;
src/wallet/wallet.h:static const CAmount DEFAULT_TRANSACTION_MINFEE = 100000;

{\"coin\":\"GLD\",\"name\":\"goldcoin\",\"rpcport\":9332,\"pubtype\":32,\"p2shtype\":5,\"wiftype\":160,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/goldcoin/goldcoin
cd goldcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/goldcoin*
mkdir ~/.goldcoin
echo "server=1" >> ~/.goldcoin/goldcoin.conf
echo "txindex=1" >> ~/.goldcoin/goldcoin.conf
echo "listen=0" >> ~/.goldcoin/goldcoin.conf
echo "listenonion=0" >> ~/.goldcoin/goldcoin.conf
echo "rpcport=14332" >> ~/.goldcoin/goldcoin.conf
echo "rpcuser=bartergld" >> ~/.goldcoin/goldcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.goldcoin/goldcoin.conf
echo "rpcworkqueue=64" >> ~/.goldcoin/goldcoin.conf
echo "rpcthreads=16" >> ~/.goldcoin/goldcoin.conf
chmod 0600 ~/.goldcoin/goldcoin.conf
goldcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GLD\"}"

home
      "pubtype" : 32,
      "coin" : "GLD",
      "status" : "active",
      "KMDvalue" : 0,
      "height" : 828260,
      "rpc" : "127.0.0.1:9332",
      "wiftype" : 160,
      "balance" : 0,
      "p2shtype" : 5,
      "smartaddress" : "EFTEpGwi4jZ7v4kJ73EYUXZN7msnVqJiij",
      "txfee" : 100000,
      "installed" : true

contabo
      "pubtype" : 32,
      "height" : 828260,
      "coin" : "GLD",
      "installed" : true,
      "txfee" : 100000,
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:14332",
      "wiftype" : 160,
      "p2shtype" : 5,
      "status" : "active",
      "smartaddress" : "Dug6LdZyfQh76QtXJLVeoHACMf3tHUeZHP",
      "balance" : 0


goldcoin-cli sendtoaddress "Dug6LdZyfQh76QtXJLVeoHACMf3tHUeZHP" 1
"fee": -0.00022600

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"GLD\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"GLD\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
GoldCoin (GLD)
SWAP completed! 4148214625-2250196256 {"uuid":"1eb9ba409617d802dc8b4d322c8a4ee4d48026a595830e0e7b6188d6606a6023","expiration":1526604158,"tradeid":0,"requestid":4148214625,"quoteid":2250196256,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"GLD","srcamount":0.80051742,"bobtxfee":0.00100000,"alice":"KMD","destamount":0.09009000,"alicetxfee":0.00001000,"aliceid":"7060320193382252545","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.80151742, 0.09010000, 0.80251742, 0.09011000, 0.90258209, 0, 0, 0.90158209, 0, 0, 0],"result":"success","status":"finished","finishtime":1526589273,"bobdeposit":"e70e67a0e5697b0376f75c6fb4ef49b4c6533085020f39f6d4c2e627ec16f37c","alicepayment":"2b368528294a4a2668c26effe00255b297dbfc5d4d12009b32a266727aeba119","bobpayment":"aea60916db96cf1641c8bffbc6d0f65f4dc50c2495b8a096d9ef65f4e7b2cf4d","paymentspent":"8fbf5727cf273e8b1f33b3051c0941759bfa9efe317b505eb411203c2d304fe3","Apaymentspent":"3e260700f344f546187d342e10cc670e912c56898a43b2cbe6ff256bdbb8e2b8","depositspent":"ae56b141ffa20968915c79f3b07b4797e42e7ccd7e13feb0e10bb21772d22a9d","method":"tradestatus","finishtime":1526589273}
bobdeposit https://chainz.cryptoid.info/gld/tx.dws?e70e67a0e5697b0376f75c6fb4ef49b4c6533085020f39f6d4c2e627ec16f37c.htm
alicepayment https://kmdexplorer.ru/tx/2b368528294a4a2668c26effe00255b297dbfc5d4d12009b32a266727aeba119
bobpayment https://chainz.cryptoid.info/gld/tx.dws?aea60916db96cf1641c8bffbc6d0f65f4dc50c2495b8a096d9ef65f4e7b2cf4d.htm

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GLD\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"goldcoin\",\"refrel\":\"coinmarketcap\"}"
```

## GLT

```
https://github.com/globaltoken/globaltoken


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,38);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,166);

src/wallet/wallet.h
DEFAULT_DISCARD_FEE = 10000;
DEFAULT_TRANSACTION_MINFEE = 1000;
src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 1000;
src/policy/policy.h
DUST_RELAY_TX_FEE = 3000;

{\"coin\":\"GLT\",\"name\":\"globaltoken\",\"rpcport\":9320,\"pubtype\":38,\"p2shtype\":5,\"wiftype\":166,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/globaltoken/globaltoken
cd globaltoken
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/globaltoken*
mkdir ~/.globaltoken
echo "server=1" >> ~/.globaltoken/globaltoken.conf
echo "listen=0" >> ~/.globaltoken/globaltoken.conf
echo "listenonion=1" >> ~/.globaltoken/globaltoken.conf
echo "#proxy=127.0.0.1:9050" >> ~/.globaltoken/globaltoken.conf
echo "rpcuser=barterglt" >> ~/.globaltoken/globaltoken.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.globaltoken/globaltoken.conf
chmod 0600 ~/.globaltoken/globaltoken.conf
globaltokend -daemon


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GLT\"}"

home
   {
      "coin" : "GLT",
      "status" : "active",
      "wiftype" : 166,
      "smartaddress" : "GfUrivjSKpLNpfapFZETPHC5toRSidBkFt",
      "rpc" : "127.0.0.1:9320",
      "txfee" : 1000,
      "p2shtype" : 5,
      "pubtype" : 38
   },

contabo
   {
      "txfee" : 1000,
      "wiftype" : 166,
      "p2shtype" : 5,
      "smartaddress" : "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd",
      "pubtype" : 38,
      "coin" : "GLT",
      "status" : "active",
      "rpc" : "127.0.0.1:9320"
   },

globaltoken-cli sendtoaddress "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd" 99.9994648
"fee": -0.00004520,
```

## GNO

```
{\"coin\":\"GNO\",\"name\":\"gnosis-gno\",\"etomic\":\"0x6810e776880C02933D47DB1b9fc05908e5386b96\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GNO\"}"

home
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "txfee" : 1000,
      "balance" : 0,
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "installed" : false,
      "height" : -1,
      "coin" : "GNO"

contabo
      "balance" : 0,
      "height" : -1,
      "installed" : false,
      "coin" : "GNO",
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "txfee" : 1000,
      "status" : "active",
      "pubtype" : 0,
      "wiftype" : 188

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"GNO\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"GNO\",\"rel\":\"KMD\",\"price\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"GNO\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":1.2}"
Gnosis (GNO)
SWAP completed! 70938805-2967174275 {"uuid":"85ca3b2064c7d7c955f1af395d784f2818cd3e81475f24c24bcfa7fffbdaf721","expiration":1528211045,"tradeid":0,"requestid":70938805,"quoteid":2967174275,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"GNO","bobtomic":"0x6810e776880C02933D47DB1b9fc05908e5386b96","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.07610263,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"3022393284507598849","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.07611263, 0.08010000, 0.07612263, 0.08011000, 0.08563545, 0, 0, 0.08562545, 0, 0, 0],"result":"success","status":"finished","finishtime":1528195976,"bobdeposit":"cc9107651010503794651c7f01c302656dfc31bd59742a08603349220d2f187a","alicepayment":"800a0803589a0fa1a703e11b95d7388e0c35f9fdb12be601b9b5dedc437f7f23","bobpayment":"a54fe798ba795f11065966154b5924ee21ecbcb67828d2b675384827dab5dfd2","paymentspent":"2cee94d98d1804f685dc93d82a6514c768d787a60f99d71f2cd7815d3dbd690d","Apaymentspent":"999a8c2373b7f6ae9ed0e8fab1f39e13e547f712944689c735b6cea7873d03c5","depositspent":"ebbbc86ade76dc1c10c1e35077b5614bf157c38be3151953c8e445d1437de726","method":"tradestatus","finishtime":1528195976}
bobdeposit https://etherscan.io/tx/0x708d10841aab90b73de917579fa22fd9e7d09fad1c73506b207f546c88f7718f
alicepayment https://kmdexplorer.ru/tx/800a0803589a0fa1a703e11b95d7388e0c35f9fdb12be601b9b5dedc437f7f23
bobpayment https://etherscan.io/tx/0xb8e958c8045f656b34ea6cdc3b28723581866246cd7e423be479645351bc1a2e

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GNO\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"gnosis-gno\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GNO\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"gnosis-gno\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GNO\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"gnosis-gno\",\"refrel\":\"coinmarketcap\"}"
```

## GPN

```
{\"coin\":\"GPN\",\"name\":\"gpncoin\",\"etomic\":\"0xE2b407160AAd5540eAc0e80338b9a5085C60F25B\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GPN\"}"

home
      "txfee" : 1000,
      "status" : "active",
      "balance" : 0,
      "height" : -1,
      "pubtype" : 0,
      "p2shtype" : 85,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188,
      "coin" : "GPN"

contabo
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "coin" : "GPN",
      "balance" : 10,
      "p2shtype" : 85,
      "status" : "active",
      "wiftype" : 188,
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "pubtype" : 0,
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"GPN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"GPN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"GPN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
GPN Coin (GPN)
SWAP completed! 1237593243-3754077273 {"uuid":"4e0cc861d9151231b1ffade7046ac29fe80ea97386e210f4f753efb2ce570e8e","expiration":1527732798,"tradeid":0,"requestid":1237593243,"quoteid":3754077273,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"GPN","bobtomic":"0xE2b407160AAd5540eAc0e80338b9a5085C60F25B","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.72048775,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"8108278688912179201","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.72049775, 0.08010000, 0.72050775, 0.08011000, 0.81056871, 0, 0, 0.81055871, 0, 0, 0],"result":"success","status":"finished","finishtime":1527721855,"bobdeposit":"45a228e30edbd1c23059718af47e02c88a6cd1986c10af97bf614f70d2d30be2","alicepayment":"f3f85caa83e40fdb0c1f0681eda626906920c89d782924bd266de67fb6a0afeb","bobpayment":"92d21216c130b2777cc3b1dbcf4775ebccee52539e0b32c3aa0bcc06684a3eeb","paymentspent":"2168160fdf9a348bf42f4100636dd8f070aaa7f4aa89fe7b071d3099b0797bad","Apaymentspent":"adfa064d9487ba1990619bb60f615dbe6a0a9540554530c189f8b2ef21dd256c","depositspent":"39e4d1aaa2b0efada03a235c3cc48e51ebcdd0c1f9f9a3a9931454da8cb95df4","method":"tradestatus","finishtime":1527721855}
bobdeposit https://etherscan.io/tx/0xf6b1e2e28f180abd76b54bfb4f8fbdb3ae574e855af4255613c1544f3a735503
alicepayment https://kmdexplorer.ru/tx/f3f85caa83e40fdb0c1f0681eda626906920c89d782924bd266de67fb6a0afeb
bobpayment https://etherscan.io/tx/0x9a4054c34d3165ebd725a804e5c706d28cfc3e1aea9d88c0cfe1076f98ce6edd

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"GPN\",\"fixed\":1}"
```

## GRLC

```
https://bitcointalk.org/index.php?topic=2800938.0
https://bitcointalk.org/index.php?topic=2893116.0
https://github.com/GarlicoinOrg/Garlicoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,38);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,50);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 100000;

{\"coin\":\"GRLC\",\"name\":\"garlicoin\",\"rpcport\":42068,\"pubtype\":38,\"p2shtype\":5,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/GarlicoinOrg/Garlicoin
cd Garlicoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/garlicoin*
mkdir ~/.garlicoin
echo "server=1" >> ~/.garlicoin/garlicoin.conf
echo "txindex=1" >> ~/.garlicoin/garlicoin.conf
echo "listen=0" >> ~/.garlicoin/garlicoin.conf
echo "listenonion=0" >> ~/.garlicoin/garlicoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.garlicoin/garlicoin.conf
echo "rpcuser=bartergrlc" >> ~/.garlicoin/garlicoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.garlicoin/garlicoin.conf
chmod 0600 ~/.garlicoin/garlicoin.conf
garlicoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GRLC\"}"

home
      "p2shtype" : 5,
      "txfee" : 100000,
      "KMDvalue" : 0,
      "installed" : true,
      "wiftype" : 176,
      "height" : 74097,
      "balance" : 0,
      "pubtype" : 38,
      "rpc" : "127.0.0.1:42068",
      "status" : "active",
      "coin" : "GRLC",
      "smartaddress" : "GfUrivjSKpLNpfapFZETPHC5toRSidBkFt"

contabo
      "installed" : true,
      "balance" : 0,
      "rpc" : "127.0.0.1:42068",
      "pubtype" : 38,
      "wiftype" : 176,
      "txfee" : 100000,
      "smartaddress" : "GKhiFHMhvVUN11j3SrVZi2nv8gbYa41Udd",
      "status" : "active",
      "KMDvalue" : 0,
      "p2shtype" : 5,
      "coin" : "GRLC",
      "height" : 74082

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GRLC\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"garlicoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GRLC\",\"rel\":\"BTC\",\"margin\":0.05,\"refbase\":\"garlicoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GRLC\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"garlicoin\",\"refrel\":\"coinmarketcap\"}"

```

## GRS

```
https://bitcointalk.org/index.php?topic=525926.0
https://github.com/Groestlcoin/groestlcoin


src/groestlcoin.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,36);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);
src/wallet/wallet.h
DEFAULT_TRANSACTION_FEE = 10000;
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"GRS\",\"name\":\"groestlcoin\",\"rpcport\":1441,\"pubtype\":36,\"p2shtype\":5,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/Groestlcoin/groestlcoin
cd groestlcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/groestlcoin*
mkdir ~/.groestlcoin
echo "server=1" >> ~/.groestlcoin/groestlcoin.conf
echo "txindex=1" >> ~/.groestlcoin/groestlcoin.conf
echo "listen=0" >> ~/.groestlcoin/groestlcoin.conf
echo "listenonion=0" >> ~/.groestlcoin/groestlcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.groestlcoin/groestlcoin.conf
echo "rpcuser=bartergrs" >> ~/.groestlcoin/groestlcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.groestlcoin/groestlcoin.conf
chmod 0600 ~/.groestlcoin/groestlcoin.conf
groestlcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GRS\"}"

home
      "txfee" : 10000,
      "status" : "active",
      "electrum" : "electrum14.groestlcoin.org:50001",
      "balance" : 0,
      "wiftype" : 128,
      "installed" : false,
      "rpc" : "127.0.0.1:1441",
      "height" : -1,
      "coin" : "GRS",
      "smartaddress" : "Froeki8ruTQdBoJeCiZpR2eWdnuZHKuQSF",
      "pubtype" : 36,
      "p2shtype" : 5

contabo
      "installed" : true,
      "status" : "active",
      "coin" : "GRS",
      "txfee" : 10000,
      "balance" : 0,
      "p2shtype" : 5,
      "smartaddress" : "FX2WH4m8W8YcN9SsQ1pvjnFLsg5fAb6YJU",
      "KMDvalue" : 0,
      "wiftype" : 128,
      "rpc" : "127.0.0.1:1441",
      "pubtype" : 36,
      "height" : 1929791

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GRS\",\"rel\":\"BCH\",\"margin\":0.11,\"refbase\":\"groestlcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GRS\",\"rel\":\"BTC\",\"margin\":0.11,\"refbase\":\"groestlcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GRS\",\"rel\":\"KMD\",\"margin\":0.11,\"refbase\":\"groestlcoin\",\"refrel\":\"coinmarketcap\"}"
```

## GTO

```
{\"coin\":\"GTO\",\"name\":\"gifto\",\"etomic\":\"0xc5bbae50781be1669306b9e001eff57a2957b09d\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GTO\"}"

home
      "height" : -1,
      "txfee" : 1000,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "status" : "active",
      "coin" : "GTO",
      "p2shtype" : 85,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "balance" : 0

hetzner
      "balance" : 81.9,
      "p2shtype" : 85,
      "installed" : false,
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "txfee" : 1000,
      "status" : "active",
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "coin" : "GTO",
      "pubtype" : 0,
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"GTO\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"GTO\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Gifto (GTO)
SWAP completed! 2504615231-3906509382 {"uuid":"71c5cd680f47331314c037df358417ef48fa9f85ead37832ad7a0adbbbd596db","expiration":1531469305,"tradeid":0,"requestid":2504615231,"quoteid":3906509382,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"GTO","bobtomic":"0xc5bbae50781be1669306b9e001eff57a2957b09d","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.74314456,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"6106901968313581569","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531454153,"bobdeposit":"f1bf0a0dca223d4db64d82e1f43e20157e4492b4db901abc3e9d46a16426d29d","alicepayment":"aaa372a33fa5b392138e52938c5aa034f26e3f717fa139bd8dec178b913aba27","bobpayment":"e5b7eef1b4cbb44586877ccbedbdb5f93712e47f7600d017970ce10e46b1fdbf","paymentspent":"6f234c100f520126adadae7e3d43c568fdcfd9c98a7dc1f1945cafd89a81ea3c","Apaymentspent":"82bf2b096472c7d02836654b0713ebd274eff7def861831efb7eee416bdc8a3f","depositspent":"61a04e1e2b5fb232bc492fb2a9b5ead74e446aa9d4ce36a6bc656e5cd71853ba","alicedexfee":"0eeb09496a04a7b082e329f49a66a53e79a9fbdde774a9ba844cb44f61766012","method":"tradestatus","finishtime":1531454153}
bobdeposit https://etherscan.io/tx/0x1467211de2986cf45f77d8d41c96fd7c06c8f318b1e04b39720bb00d346ab53b
alicepayment https://kmdexplorer.ru/tx/aaa372a33fa5b392138e52938c5aa034f26e3f717fa139bd8dec178b913aba27
bobpayment https://etherscan.io/tx/0xcd2c159157e5d50da70dd4ebc8452ccd0d7e98e935cefbc12dba03dc57d48513

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GTO\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"gifto\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GTO\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"gifto\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GTO\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"gifto\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GTO\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"gifto\",\"refrel\":\"coinmarketcap\"}"
```

## GUP

```
{\"coin\":\"GUP\",\"name\":\"guppy\",\"etomic\":\"0xf7B098298f7C69Fc14610bf71d5e02c60792894C\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"GUP\"}"

home
      "wiftype" : 188,
      "balance" : 0,
      "p2shtype" : 85,
      "height" : -1,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "coin" : "GUP",
      "status" : "active"

contabo
      "height" : -1,
      "pubtype" : 0,
      "wiftype" : 188,
      "p2shtype" : 85,
      "txfee" : 1000,
      "balance" : 52.541,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "coin" : "GUP",
      "status" : "active"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"GUP\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"GUP\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"GUP\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Matchpool (GUP)
SWAP completed! 1556278787-4122539829 {"uuid":"a87d3f9d6fe83c40d0e633762c358399e01fc483c780be64be470e6c948eb013","expiration":1528467727,"tradeid":0,"requestid":1556278787,"quoteid":4122539829,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"GUP","bobtomic":"0xf7B098298f7C69Fc14610bf71d5e02c60792894C","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.71154374,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12276022795734220801","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.71155374, 0.08010000, 0.71156374, 0.08011000, 0.80050670, 0, 0, 0.80049670, 0, 0, 0],"result":"success","status":"finished","finishtime":1528452785,"bobdeposit":"8c0b1d92f1bfd63963ad6c7a295cdd2ee7db1a3a86832895826a5a3b4000c572","alicepayment":"e1f12ae4eac609c6d69c5fe4315bcd4394d01a89d6e537314055a73f16f7bff2","bobpayment":"3c78cec3552658bd4df4f5c1e108fac2b4e0a5346d7e205e7f99b0f6d6af14b1","paymentspent":"070226155455ecdb00b89f35d11b3d910ace0dd5de68affa1d96ca9099e70f73","Apaymentspent":"a3221b10cf0199ae69a428ccab4274a83e04fd7e93580a6324f895226dfd9b1b","depositspent":"ba088f09632a6f79b58d5f9db257964adab62e0bdddbacc5a6f45d151e9d6b86","method":"tradestatus","finishtime":1528452785}
bobdeposit https://etherscan.io/tx/0xa4367efc13c88a53b9d3eb3566af588bd394e3a9a7784197554194e97dc94920
alicepayment https://kmdexplorer.ru/tx/e1f12ae4eac609c6d69c5fe4315bcd4394d01a89d6e537314055a73f16f7bff2
bobpayment https://etherscan.io/tx/0x0785c68fee3826eba361dce4c4e5a67c5c38fa14522ebc636212dcac6c384ec3

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GUP\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"guppy\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GUP\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"guppy\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"GUP\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"guppy\",\"refrel\":\"coinmarketcap\"}"
```

## HMQ

```
{\"coin\":\"HMQ\",\"name\":\"humaniq\",\"etomic\":\"0xcbCC0F036ED4788F63FC0fEE32873d6A7487b908\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HMQ\"}"

home
      "balance" : 0,
      "pubtype" : 0,
      "txfee" : 1000,
      "height" : -1,
      "p2shtype" : 85,
      "installed" : false,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "coin" : "HMQ",
      "wiftype" : 188

contabo
      "p2shtype" : 85,
      "status" : "active",
      "height" : -1,
      "installed" : false,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "coin" : "HMQ",
      "wiftype" : 188,
      "balance" : 99.99,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"HMQ\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"HMQ\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HMQ\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Humaniq (HMQ)
SWAP completed! 280995991-3494239671 {"uuid":"b73a875d5828c8f9f7ba577f88758469de08617a26f2b20740091f9521f70bf8","expiration":1528570468,"tradeid":0,"requestid":280995991,"quoteid":3494239671,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"HMQ","bobtomic":"0xcbCC0F036ED4788F63FC0fEE32873d6A7487b908","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76441281,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1834910391106142209","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76442281, 0.08010000, 0.76443281, 0.08011000, 0.85998441, 0, 0, 0.85997441, 0, 0, 0],"result":"success","status":"finished","finishtime":1528555581,"bobdeposit":"0a89cdab95a56adf7e9fcf1b344331fadb56d7d88641b25fd5e45d16676b89ba","alicepayment":"fa141f4a3806ed45bb671b35e746df555cb9d0cc34039e247e291a292cdce1b4","bobpayment":"6a4e9c9fef2d1738808b2a005694c2b81a732984fd5c8fe3880c307929be5fd1","paymentspent":"9eed3cde1036dd36234c64fe3e5b360f1cc4f4094f7e7e3b258add5952a8f19e","Apaymentspent":"f8f2dc5aaf95a2e5d3ecc28359920997e718b171f5920671c22d28da89dc1ec3","depositspent":"f8d3439b1ccb61b72f81ba9572a446d56ecc2ac70326fad51694e417bd3a239f","method":"tradestatus","finishtime":1528555581}
bobdeposit https://etherscan.io/tx/0x45b98c0477aa12725440306cc633c344fdad43c267da450d9c20c0d49fab8159
alicepayment https://kmdexplorer.ru/tx/fa141f4a3806ed45bb671b35e746df555cb9d0cc34039e247e291a292cdce1b4
bobpayment https://etherscan.io/tx/0x79a4535d40e113121d0118ee2ae55140a4ac0f9670d5b68b19a795e1a297cfee

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HMQ\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"humaniq\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HMQ\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"humaniq\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HMQ\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"humaniq\",\"refrel\":\"coinmarketcap\"}"
```

## HODLC

```
https://bitcointalk.org/index.php?topic=1317918.0
https://github.com/HOdlcoin/HOdlcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,40);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,40+128);

src/main.cpp
minRelayTxFee = CFeeRate(5000);

{\"coin\":\"HODLC\",\"name\":\"hodlcoin\",\"rpcport\":11989,\"pubtype\":40,\"p2shtype\":5,\"wiftype\":168,\"txfee\":5000} (collides with europecoin)
{\"coin\":\"HODLC\",\"name\":\"hodlcoin\",\"rpcport\":12989,\"pubtype\":40,\"p2shtype\":5,\"wiftype\":168,\"txfee\":5000}


cd ~/wallets
git clone https://github.com/HOdlcoin/HOdlcoin
cd HOdlcoin
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/hodlcoin*
mkdir ~/.hodlcoin
echo "server=1" >> ~/.hodlcoin/hodlcoin.conf
echo "listen=0" >> ~/.hodlcoin/hodlcoin.conf
echo "rpcport=12989" >> ~/.hodlcoin/hodlcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.hodlcoin/hodlcoin.conf
echo "rpcuser=barterhodl" >> ~/.hodlcoin/hodlcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.hodlcoin/hodlcoin.conf
chmod 0600 ~/.hodlcoin/hodlcoin.conf
hodlcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HODLC\"}"

home
   {
      "pubtype" : 40,
      "smartaddress" : "HUA4h9L1kBG8TXrzJPu6MXjf9owL7DRt6g",
      "wiftype" : 168,
      "txfee" : 5000,
      "status" : "active",
      "rpc" : "127.0.0.1:12989",
      "p2shtype" : 5,
      "coin" : "HODLC"
   },

contabo
   {
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:12989",
      "wiftype" : 168,
      "coin" : "HODLC",
      "pubtype" : 40,
      "smartaddress" : "H8NvDVxHLrQ7dt1DVhACgHLVPh7RwvmTfH",
      "status" : "active",
      "txfee" : 5000
   },

hodlcoin-cli sendtoaddress "H8NvDVxHLrQ7dt1DVhACgHLVPh7RwvmTfH" 799.996
"fee" : -0.00001130,
```

## HTML

```
https://bitcointalk.org/index.php?topic=801489.0
https://github.com/HTMLCOIN/HTMLCOIN


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,41);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,100);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,169);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 400000;

{\"coin\":\"HTML\",\"name\":\"htmlcoin\",\"rpcport\":4889,\"pubtype\":41,\"p2shtype\":100,\"wiftype\":169,\"txfee\":400000}


cd ~/wallets
git clone --recursive https://github.com/HTMLCOIN/HTMLCOIN
cd HTMLCOIN
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/htmlcoin*
mkdir ~/.htmlcoin
echo "server=1" >> ~/.htmlcoin/htmlcoin.conf
echo "txindex=1" >> ~/.htmlcoin/htmlcoin.conf
echo "staking=0" >> ~/.htmlcoin/htmlcoin.conf
echo "listen=0" >> ~/.htmlcoin/htmlcoin.conf
echo "listenonion=0" >> ~/.htmlcoin/htmlcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.htmlcoin/htmlcoin.conf
echo "rpcuser=barterhtml" >> ~/.htmlcoin/htmlcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.htmlcoin/htmlcoin.conf
chmod 0600 ~/.htmlcoin/htmlcoin.conf
htmlcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HTML\"}"

home
      "txfee" : 400000,
      "wiftype" : 169,
      "installed" : true,
      "KMDvalue" : 0,
      "status" : "active",
      "pubtype" : 41,
      "balance" : 0,
      "p2shtype" : 100,
      "coin" : "HTML",
      "height" : 89707,
      "smartaddress" : "HsVfgFdJTMj1Gy15KpEQqf1SnKCGq3Ng4G",
      "rpc" : "127.0.0.1:4889"

contabo
      "txfee" : 400000,
      "rpc" : "127.0.0.1:4889",
      "installed" : true,
      "height" : 89651,
      "balance" : 0,
      "KMDvalue" : 0,
      "wiftype" : 169,
      "p2shtype" : 100,
      "pubtype" : 41,
      "coin" : "HTML",
      "smartaddress" : "HXiXCcFa42rzTK9JX7VXAQcH2CNNmCyVhJ",
      "status" : "active"


htmlcoin-cli sendtoaddress "HXiXCcFa42rzTK9JX7VXAQcH2CNNmCyVhJ" 1
"fee": -0.00090400

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HTML\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"html-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HTML\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"html-coin\",\"refrel\":\"coinmarketcap\"}"
```

## HUC

```
https://bitcointalk.org/index.php?topic=435170.0
https://github.com/chronokings/huntercore


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,40);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,13); // FIXME: Update.
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,168);

src/wallet/wallet.h:static const CAmount DEFAULT_TRANSACTION_FEE = 0;
src/wallet/wallet.h:static const CAmount DEFAULT_FALLBACK_FEE = 20000;
src/wallet/wallet.h:static const CAmount DEFAULT_TRANSACTION_MINFEE = 1000;
src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = COIN / 1000;
src/amount.h
COIN = 100000000;

{\"coin\":\"HUC\",\"name\":\"huntercoin\",\"rpcport\":8399,\"pubtype\":40,\"p2shtype\":13,\"wiftype\":168,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/chronokings/huntercore -b 0.13
cd huntercore
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/huntercoin*
mkdir ~/.huntercoin
echo "server=1" >> ~/.huntercoin/huntercoin.conf
echo "listen=0" >> ~/.huntercoin/huntercoin.conf
echo "listenonion=1" >> ~/.huntercoin/huntercoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.huntercoin/huntercoin.conf
echo "rpcuser=barterhuc" >> ~/.huntercoin/huntercoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.huntercoin/huntercoin.conf
chmod 0600 ~/.huntercoin/huntercoin.conf
huntercoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HUC\"}"

home
   {
      "smartaddress" : "HUA4h9L1kBG8TXrzJPu6MXjf9owL7DRt6g",
      "wiftype" : 168,
      "pubtype" : 40,
      "p2shtype" : 13,
      "txfee" : 100000,
      "coin" : "HUC",
      "status" : "active",
      "rpc" : "127.0.0.1:8399"
   },

contabo
   {
      "pubtype" : 40,
      "status" : "active",
      "p2shtype" : 13,
      "txfee" : 100000,
      "coin" : "HUC",
      "smartaddress" : "H8NvDVxHLrQ7dt1DVhACgHLVPh7RwvmTfH",
      "wiftype" : 168,
      "rpc" : "127.0.0.1:8399"
   },

huntercoin-cli sendtoaddress "H8NvDVxHLrQ7dt1DVhACgHLVPh7RwvmTfH" 0.8273103
"fee": -0.00019200,
huntercoin-cli sendtoaddress "H8NvDVxHLrQ7dt1DVhACgHLVPh7RwvmTfH" 0.9927723
"fee": -0.00037400,
```

## HUSH

```
https://bitcointalk.org/index.php?topic=2008578.0
https://github.com/MyHush/hush


src/chainparams.cpp
// guarantees the first 2 characters, when base58 encoded, are "t1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x1C,0xB8};
// guarantees the first 2 characters, when base58 encoded, are "t3"
base58Prefixes[SCRIPT_ADDRESS]     = {0x1C,0xBD};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100;

{\"coin\":\"HUSH\",\"name\":\"hush\",\"rpcport\":8822,\"taddr\":28,\"pubtype\":184,\"p2shtype\":189,\"wiftype\":128,\"txfee\":1000}

cd ~/wallets
git clone https://github.com/MyHush/hush
cd hush
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh --disable-tests --disable-rust -j4
sudo cp src/hushd src/hush-cli /usr/local/bin/
sudo strip /usr/local/bin/hush*
mkdir ~/.hush
echo "server=1" >> ~/.hush/hush.conf
echo "txindex=1" >> ~/.hush/hush.conf
echo "listen=0" >> ~/.hush/hush.conf
echo "listenonion=1" >> ~/.hush/hush.conf
echo "#proxy=127.0.0.1:9050" >> ~/.hush/hush.conf
echo "rpcuser=barterhush" >> ~/.hush/hush.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.hush/hush.conf
echo "rpcworkqueue=64" >> ~/.hush/hush.conf
echo "rpcthreads=16" >> ~/.hush/hush.conf
chmod 0600 ~/.hush/hush.conf
hushd -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HUSH\"}"

home
   {
      "wiftype" : 128,
      "txfee" : 1000,
      "coin" : "HUSH",
      "status" : "active",
      "smartaddress" : "t1fWYK8pdKHWgLqLRG3PU6Kx7EHpgVRNjCU",
      "rpc" : "127.0.0.1:8822",
      "pubtype" : 184,
      "p2shtype" : 189
   },

contabo
   {
      "p2shtype" : 189,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:8822",
      "smartaddress" : "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH",
      "coin" : "HUSH",
      "pubtype" : 184,
      "wiftype" : 128,
      "status" : "active"
   },

hush-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 0.94518969
hush-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 1.13422763
"fee": -0.00000225
"fee": -0.00000540
hush-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 0.86755258
"fee": -0.00000226,
```

## HXX

```
https://bitcointalk.org/index.php?topic=2958707
https://github.com/hexxcointakeover/hexxcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector < unsigned char > (1, 40);
base58Prefixes[SCRIPT_ADDRESS] = std::vector < unsigned char > (1, 10);
base58Prefixes[SECRET_KEY] = std::vector < unsigned char > (1, 210);

{\"coin\":\"HXX\",\"name\":\"hexxcoin\",\"rpcport\":29200,\"pubtype\":40,\"p2shtype\":10,\"wiftype\":210,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/hexxcointakeover/hexxcoin
cd hexxcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc
make -j4
sudo make install
sudo strip /usr/local/bin/hexxcoin*
mkdir ~/.hexxcoin
echo "server=1" >> ~/.hexxcoin/hexxcoin.conf
echo "txindex=1" >> ~/.hexxcoin/hexxcoin.conf
echo "listen=0" >> ~/.hexxcoin/hexxcoin.conf
echo "listenonion=0" >> ~/.hexxcoin/hexxcoin.conf
echo "rpcuser=barterhxx" >> ~/.hexxcoin/hexxcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.hexxcoin/hexxcoin.conf
echo "rpcworkqueue=64" >> ~/.hexxcoin/hexxcoin.conf
echo "rpcthreads=16" >> ~/.hexxcoin/hexxcoin.conf
chmod 0600 ~/.hexxcoin/hexxcoin.conf
hexxcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HXX\"}"

home
      "installed" : true,
      "rpc" : "127.0.0.1:29200",
      "balance" : 0,
      "KMDvalue" : 0,
      "smartaddress" : "HUA4h9L1kBG8TXrzJPu6MXjf9owL7DRt6g",
      "wiftype" : 210,
      "coin" : "HXX",
      "status" : "active",
      "pubtype" : 40,
      "p2shtype" : 10,
      "height" : 275759,
      "txfee" : 100000

contabo
      "txfee" : 100000,
      "status" : "active",
      "installed" : true,
      "coin" : "HXX",
      "rpc" : "127.0.0.1:29200",
      "balance" : 2.2,
      "KMDvalue" : 0,
      "height" : 275759,
      "pubtype" : 40,
      "smartaddress" : "H8NvDVxHLrQ7dt1DVhACgHLVPh7RwvmTfH",
      "wiftype" : 210,
      "p2shtype" : 10


hexxcoin-cli sendtoaddress "H8NvDVxHLrQ7dt1DVhACgHLVPh7RwvmTfH" 1
"fee": -0.00022500

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"HXX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HXX\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Hexx (HXX)
SWAP completed! 4026831480-916003441 {"uuid":"81fea72b7dc5962f3049a21ab207825d87afcc26f3238854c428bcd53f6e4c8c","expiration":1528012855,"tradeid":0,"requestid":4026831480,"quoteid":916003441,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"HXX","srcamount":0.68951114,"bobtxfee":0.00100000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"649424514230976513","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.69051114, 0.08010000, 0.69151114, 0.08011000, 0.77770003, 0, 0, 0.77670003, 0, 0, 0],"result":"success","status":"finished","finishtime":1527997583,"bobdeposit":"42857c2f92c0007c8b6ad45fa3a3cf9c588af7860fe01ba6af00e3192f787d84","alicepayment":"c17e4bb69fbacedd3beee34342957d4a48e588fb1a427c5bb9729fe37b6ea844","bobpayment":"d75ed0518d2406fe5cfdfbb2658461f298f40cd93b7186a40c76b47afa51e1bf","paymentspent":"1fedf9bd14585828c623e58551f33b3b23ff364374061c5151d94fbd18f11105","Apaymentspent":"ec9f05e62f0882d135de7f4abba6e597844e294002cf0b6117f0a307897b33ab","depositspent":"0715413325298153bbe5fddd3aebc0c3b0be55a354ad3b981cecba2f29f83e39","method":"tradestatus","finishtime":1527997583}
bobdeposit https://chainz.cryptoid.info/hxx/tx.dws?42857c2f92c0007c8b6ad45fa3a3cf9c588af7860fe01ba6af00e3192f787d84.htm
alicepayment https://kmdexplorer.ru/tx/c17e4bb69fbacedd3beee34342957d4a48e588fb1a427c5bb9729fe37b6ea844
bobpayment https://chainz.cryptoid.info/hxx/tx.dws?d75ed0518d2406fe5cfdfbb2658461f298f40cd93b7186a40c76b47afa51e1bf.htm

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HXX\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"hexx\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HXX\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"hexx\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"HXX\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"hexx\",\"refrel\":\"coinmarketcap\"}"
```

## HYD

```
{\"coin\":\"HYD\",\"name\":\"hydra\",\"etomic\":\"0xD233495C48EB0143661fFC8458EAfc21b633f97f\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"HYD\"}"

home
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "coin" : "HYD",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0,
      "installed" : false,
      "height" : -1,
      "pubtype" : 0,
      "status" : "active",
      "wiftype" : 188

contabo
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "pubtype" : 0,
      "wiftype" : 188,
      "installed" : false,
      "coin" : "HYD",
      "status" : "active",
      "p2shtype" : 85

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"HYD\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"HYD\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"HYD\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Hydra (HYD)
SWAP completed! 3233497964-3122270960 {"uuid":"71893671e3b4b057dc572ab35770d6303dae42d0a6607c766c20dbfe8d7b015e","expiration":1527212649,"tradeid":0,"requestid":3233497964,"quoteid":3122270960,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"HYD","bobtomic":"0xD233495C48EB0143661fFC8458EAfc21b633f97f","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.72308463,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"15632618567521533953","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.72309463, 0.08010000, 0.72310463, 0.08011000, 0.81349020, 0, 0, 0.81348020, 0, 0, 0],"result":"success","status":"finished","finishtime":1527197588,"bobdeposit":"6706016c0d77068e3415c007c6ea4be6b5399be42261738fe54de8bf2cede644","alicepayment":"2997d97997cae522ae59534a6e6a304b5b4211b4883801603f1310c967acd359","bobpayment":"48b5187cde817c9f613f36b6cd1540719d9e24a9bd4acfd242a20b0682b59f1f","paymentspent":"bf5a44f798691c1e89f75cc23d1965e9c7d659cec93bce4c9a69ef4279e94275","Apaymentspent":"1d48bea16ba3a7dc565cd14789cf2fa7b20669069e4ef1d71b4d75c942c3bdf4","depositspent":"d28a1b91319c66e53c2c88b08aac4660831bd4231cbe1619d188a42b7c5c0315","method":"tradestatus","finishtime":1527197588}
bobdeposit https://etherscan.io/tx/0x86447dc7d8799cdabc238bed42303c6df4151f98b01bba21abfc000cc8260429
alicepayment https://kmdexplorer.ru/tx/2997d97997cae522ae59534a6e6a304b5b4211b4883801603f1310c967acd359
bobpayment https://etherscan.io/tx/0x07944c1c67d6bac5f22465ab85d4ff2f98c77b77d657daf61d867f56a74e16bd

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"HYD\",\"fixed\":0.1}"
```

## I0C

```
https://bitcointalk.org/index.php?topic=624935.0
https://github.com/domob1812/i0coin/tree/0.12


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,105);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_TRANSACTION_MINFEE = 1000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 1000;

{\"coin\":\"I0C\",\"name\":\"i0coin\",\"rpcport\":7332,\"pubtype\":105,\"p2shtype\":5,\"wiftype\":128,\"txfee\":1000}


cd ~/wallets
git clone https://github.com/domob1812/i0coin -b 0.12
cd i0coin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/i0coin*
mkdir ~/.i0coin
echo "server=1" >> ~/.i0coin/i0coin.conf
echo "listen=0" >> ~/.i0coin/i0coin.conf
echo "listenonion=1" >> ~/.i0coin/i0coin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.i0coin/i0coin.conf
echo "rpcuser=barteri0c" >> ~/.i0coin/i0coin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.i0coin/i0coin.conf
chmod 0600 ~/.i0coin/i0coin.conf
i0coind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"I0C\"}"

home
   {
      "rpc" : "127.0.0.1:7332",
      "p2shtype" : 5,
      "txfee" : 1000,
      "pubtype" : 105,
      "smartaddress" : "jd8GhChjtuP5chvctfYosgRo4bgeRT8Nyr",
      "status" : "active",
      "estimatedrate" : 20,
      "wiftype" : 128,
      "coin" : "I0C"
   },

contabo
   {
      "smartaddress" : "jHM8DZL1VaX4o44r5xovCS2dJUrkCMNT2Y",
      "coin" : "I0C",
      "status" : "active",
      "pubtype" : 105,
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:7332",
      "wiftype" : 128,
      "txfee" : 1000
   },

i0coin-cli sendtoaddress "jHM8DZL1VaX4o44r5xovCS2dJUrkCMNT2Y" 9.99966488
"fee": -0.00004500,
```

## ICN

```
{\"coin\":\"ICN\",\"name\":\"iconomi\",\"etomic\":\"0x888666CA69E0f178DED6D75b5726Cee99A87D698\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ICN\"}"

home
      "coin" : "ICN",
      "wiftype" : 188,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "installed" : false,
      "txfee" : 1000,
      "balance" : 0

hetzner
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "wiftype" : 188,
      "height" : -1,
      "balance" : 15.48,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "coin" : "ICN",
      "txfee" : 1000,
      "installed" : false,
      "p2shtype" : 85

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ICN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ICN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Iconomi (ICN)
SWAP completed! 3494227049-1764501391 {"uuid":"05c4bdb9d26bf73de082f463f6ccfbf70e0ad81a8c5d51e818d5fba38427e0a3","expiration":1531376729,"tradeid":0,"requestid":3494227049,"quoteid":1764501391,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ICN","bobtomic":"0x888666CA69E0f178DED6D75b5726Cee99A87D698","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.67900057,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"11430268961981595649","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531361733,"bobdeposit":"49361f19b9cd4e755587d446fd3eeace283bd1e30db92dc624f2a431cf385bbe","alicepayment":"b3b8063eb9d3deba6aa91f035a57ee5d15bfcf71985660bbc6337efbe2d5d2ad","bobpayment":"53a6396a92141335d2a744473111ff5d850c69cbc2bc73ad76ab78bd0fee08f5","paymentspent":"07450ccb127d720f2c3c654575a5f15207a0d596b83038ea7dcf5c1c75583584","Apaymentspent":"78728fc0d55baa9667a5991fcd8cfe1df0c5d593b47f3f12c655547c925a50b2","depositspent":"a079009e2c45370d29e6c46a75479769be98e17b3781e53ec4f2f2c5107107d2","alicedexfee":"089e36e3387bcf3e35c054c7f22d915fabd6a5a54f7c1c2fee0b5778e2492a26","method":"tradestatus","finishtime":1531361733}
bobdeposit https://etherscan.io/tx/0x4b6729154e386ed4a1643c7f248049ea69bb706668905dd76cd4384bbe30cd66
alicepayment https://kmdexplorer.ru/tx/b3b8063eb9d3deba6aa91f035a57ee5d15bfcf71985660bbc6337efbe2d5d2ad
bobpayment https://etherscan.io/tx/0x9b2b4d403450b8fcee88aefa1c7784a5594a29f754fc16a1bd0f9bde194a6ed0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ICN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"iconomi\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ICN\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"iconomi\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ICN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"iconomi\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ICN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"iconomi\",\"refrel\":\"coinmarketcap\"}"
```

## ICX

```
{\"coin\":\"ICX\",\"name\":\"icon\",\"etomic\":\"0xb5a5f22694352c15b00323844ad545abb2b11028\",\"rpcport\":80,\"decimals\":18}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ICX\"}"

home
      "coin" : "ICX",
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "txfee" : 1000,
      "pubtype" : 0,
      "height" : -1,
      "wiftype" : 188,
      "p2shtype" : 85,
      "installed" : false,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0

contabo
      "installed" : false,
      "coin" : "ICX",
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "balance" : 0,
      "height" : -1,
      "wiftype" : 188,
      "txfee" : 1000,
      "p2shtype" : 85,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ICX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ICX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ICX\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
ICON (ICX)
SWAP completed! 4207641-2792212684 {"uuid":"b6c40c09a4eaefa06b6112072a368c2ab533b58a5ce09b5f40b65024c3c0ae97","expiration":1527637380,"tradeid":0,"requestid":4207641,"quoteid":2792212684,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ICX","bobtomic":"0xb5a5f22694352c15b00323844ad545abb2b11028","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.69550933,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1425943695473442817","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.69551933, 0.08010000, 0.69552933, 0.08011000, 0.78246799, 0, 0, 0.78245799, 0, 0, 0],"result":"success","status":"finished","finishtime":1527622616,"bobdeposit":"87f04107816edcc3eaaf8df9d82af4bfbb2774973b480723bf85e893c93c3f6c","alicepayment":"be7ff27f90a4dd8de719e54f7c93a5f73742035069a2b3a1a1773f570c264ddb","bobpayment":"764090866a612b997928afc8a774e593276d405c3bed90fee5ac6c131c6b31e5","paymentspent":"403cbf4dce16bdb73b1cf2cd0db358428fea22782e51a0d1925b95484fe45238","Apaymentspent":"69cd1004214f7f32f1d8ae52c36eb9ac80feb460ae6e62684ef875ce2e12381d","depositspent":"03b8a631dbac06a6701df92bbe7a5b6f29f09a948544b142198074159cdac21d","method":"tradestatus","finishtime":1527622616}
bobdeposit https://etherscan.io/tx/0x85e5d2c694a7be12af80fbb3668d38036af224fb46da9ba4bbe3afcfa88e13f6
alicepayment https://kmdexplorer.ru/tx/be7ff27f90a4dd8de719e54f7c93a5f73742035069a2b3a1a1773f570c264ddb
bobpayment https://etherscan.io/tx/0x29bf1e20e216aa896a17f4956a22d64811dd3c74873ff555ac82d74e97e97935

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ICX\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"icon\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ICX\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"icon\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ICX\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"icon\",\"refrel\":\"coinmarketcap\"}"
```

## IND

```
{\"coin\":\"IND\",\"name\":\"indorse-token\",\"etomic\":\"0xf8e386EDa857484f5a12e4B5DAa9984E06E73705\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"IND\"}"

home
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "height" : -1,
      "coin" : "IND",
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "p2shtype" : 85,
      "balance" : 0,
      "installed" : false

contabo
      "wiftype" : 188,
      "status" : "active",
      "p2shtype" : 85,
      "installed" : false,
      "pubtype" : 0,
      "balance" : 99.99,
      "txfee" : 1000,
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "coin" : "IND"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"IND\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"IND\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"IND\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Indorse Token (IND)
SWAP completed! 2661715080-873588165 {"uuid":"b3149d4a835d833b97afc5b8c8f81120a1247dcdfc46231d9215b32d3d092369","expiration":1528574627,"tradeid":0,"requestid":2661715080,"quoteid":873588165,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"IND","bobtomic":"0xf8e386EDa857484f5a12e4B5DAa9984E06E73705","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70902895,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"4586558799058894849","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70903895, 0.08010000, 0.70904895, 0.08011000, 0.79767756, 0, 0, 0.79766756, 0, 0, 0],"result":"success","status":"finished","finishtime":1528560427,"bobdeposit":"e46d1be2200e5caf8903f06418dfc6e8bd333525d5006623f34c1982e88763ec","alicepayment":"11c59cfd291a45d585ca7861b9e90065cfc612a1dbfba89ebbb98c1da2a9a408","bobpayment":"40bdab01ff3fba92fcb4714636c84fafdfceee9bba3dca0be7008116e15fda7a","paymentspent":"a91642250ea0909f761fbff3a272da9e3049244b4b04327e539dc25a18f473c3","Apaymentspent":"08d6df673b586dee999b20bf15bc57f851a19baeadf91c95aaa73fbea0b9ae89","depositspent":"5d5ed0f68c8604374c05866acf18e437cf334307b6e54a14fa96bdb32d85801e","method":"tradestatus","finishtime":1528560427}
bobdeposit https://etherscan.io/tx/0x502d71da63425823d284fe4dc7b120e2e87189490015177bed9773fc3a330e07
alicepayment https://kmdexplorer.ru/tx/11c59cfd291a45d585ca7861b9e90065cfc612a1dbfba89ebbb98c1da2a9a408
bobpayment https://etherscan.io/tx/0xbf71c6f27890516fc12c2b8c508bec6c11d75b2865fa838487a380602dd118ef

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"IND\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"indorse-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"IND\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"indorse-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"IND\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"indorse-token\",\"refrel\":\"coinmarketcap\"}"
```

## INN

```
https://bitcointalk.org/index.php?topic=2291517.0
https://github.com/innovacoin/innova


src/chainparams.cpp
// Innova addresses start with 'i'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,102);
// Innova script addresses start with '9'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,20);
// Innova private keys start with '9' or 'i' (?)
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,195);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 10000; // was 1000

{\"coin\":\"INN\",\"name\":\"innova\",\"confpath\":\"${HOME#}/.innovacore/innova.conf\",\"rpcport\":8818,\"pubtype\":102,\"p2shtype\":20,\"wiftype\":195,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/innovacoin/innova
cd innova
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/innova*
mkdir ~/.innovacore
echo "server=1" >> ~/.innovacore/innova.conf
echo "txindex=1" >> ~/.innovacore/innova.conf
echo "litemode=1" >> ~/.innovacore/innova.conf
echo "listen=0" >> ~/.innovacore/innova.conf
echo "listenonion=0" >> ~/.innovacore/innova.conf
echo "#proxy=127.0.0.1:9050" >> ~/.innovacore/innova.conf
echo "rpcuser=barterinn" >> ~/.innovacore/innova.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.innovacore/innova.conf
chmod 0600 ~/.innovacore/innova.conf
innovad -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"INN\"}"

home
      "pubtype" : 102,
      "installed" : true,
      "txfee" : 10000,
      "p2shtype" : 20,
      "smartaddress" : "iR7TjsosmMzTAQWMpQYrRJcSB5upBVhyBc",
      "wiftype" : 195,
      "rpc" : "127.0.0.1:8818",
      "coin" : "INN",
      "status" : "active",
      "balance" : 0,
      "KMDvalue" : 0,
      "height" : 47511

contabo
      "txfee" : 10000,
      "balance" : 0,
      "status" : "active",
      "coin" : "INN",
      "rpc" : "127.0.0.1:8818",
      "installed" : true,
      "smartaddress" : "i5LKGES9N38SLkeb1hoxk4DGQy5v3D5nFp",
      "KMDvalue" : 0,
      "pubtype" : 102,
      "height" : 48251,
      "p2shtype" : 20,
      "wiftype" : 195

innova-cli sendtoaddress "i5LKGES9N38SLkeb1hoxk4DGQy5v3D5nFp" 1
innova-cli sendtoaddress "i5LKGES9N38SLkeb1hoxk4DGQy5v3D5nFp" 1.2
"fee": -0.00004500

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"INN\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"innova\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"INN\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"innova\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"INN\",\"rel\":\"BTC\",\"margin\":0.05,\"refbase\":\"innova\",\"refrel\":\"coinmarketcap\"}"
```

## IOP

```
https://bitcointalk.org/index.php?topic=1678165.0
https://github.com/Internet-of-People/iop-blockchain


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,117);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,174);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,49);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 1000

{\"coin\":\"IOP\",\"name\":\"IoP\",\"rpcport\":8337,\"pubtype\":117,\"p2shtype\":174,\"wiftype\":49,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/Internet-of-People/iop-blockchain
cd iop-blockchain
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/IoP*
mkdir ~/.IoP
echo "server=1" >> ~/.IoP/IoP.conf
echo "listen=0" >> ~/.IoP/IoP.conf
echo "listenonion=0" >> ~/.IoP/IoP.conf
echo "#proxy=127.0.0.1:9050" >> ~/.IoP/IoP.conf
echo "rpcuser=barteriop" >> ~/.IoP/IoP.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.IoP/IoP.conf
chmod 0600 ~/.IoP/IoP.conf
IoPd -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"IOP\"}"

home
   {
      "wiftype" : 49,
      "status" : "active",
      "rpc" : "127.0.0.1:8337",
      "smartaddress" : "pTBWWWHCR4wbRubfBhYdhBhEcemxqptNUg",
      "coin" : "IOP",
      "pubtype" : 117,
      "txfee" : 10000,
      "p2shtype" : 174
   },

contabo
   {
      "wiftype" : 49,
      "p2shtype" : 174,
      "pubtype" : 117,
      "smartaddress" : "p7QN2ruU1k5acFjtNzok1wJ4rXx4jgD8yE",
      "txfee" : 10000,
      "coin" : "IOP",
      "status" : "active",
      "rpc" : "127.0.0.1:8337"
   },


IoP-cli sendtoaddress "p7QN2ruU1k5acFjtNzok1wJ4rXx4jgD8yE" 68
"fee": -0.00004520
IoP-cli sendtoaddress "p7QN2ruU1k5acFjtNzok1wJ4rXx4jgD8yE" 81.6
"fee": -0.00004520
```

## IOST

```
{\"coin\":\"IOST\",\"name\":\"iostoken\",\"etomic\":\"0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"IOST\"}"

home
      "coin" : "IOST",
      "status" : "active",
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "pubtype" : 0,
      "wiftype" : 188,
      "p2shtype" : 85,
      "txfee" : 1000,
      "installed" : false,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c

contabo
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "IOST",
      "balance" : 0,
      "pubtype" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "installed" : false,
      "height" : -1,
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"IOST\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"IOST\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"IOST\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
IOST (IOST)
SWAP completed! 65680036-3999985268 {"uuid":"5cc6864dffe1d80ebe1777c6248530d4e584b1c2446ab4a3a226f39a46bf17ef","expiration":1527476536,"tradeid":0,"requestid":65680036,"quoteid":3999985268,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"IOST","bobtomic":"0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70159013,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"2452545653771468801","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70160013, 0.08010000, 0.70161013, 0.08011000, 0.78930889, 0, 0, 0.78929889, 0, 0, 0],"result":"success","status":"finished","finishtime":1527461439,"bobdeposit":"ca41833262c2ef58bab89914d26e45fc02420d3d18fc963730d3ac46c435591f","alicepayment":"f030edd21a3cef754545a781ebfbe6aab71fc84fe2050bf04fe8c82a0c4d77a9","bobpayment":"466b66aab6a87e4fcdd0ba0daeaba897c9c1bda62b0ea32c45372b5eff09b18a","paymentspent":"20f881c62b45a865d637eb55112fd280cebadb8ccace7142e28068cab6c2fefd","Apaymentspent":"b224655f6c69b9d1288ba4f2d0b2f28bd5353e8c50eea971dbeabaf5ced0fb23","depositspent":"472ad4520d07e2df155402761f217ecfbe38863871345f0ae5bc562a6f949e63","method":"tradestatus","finishtime":1527461439}
bobdeposit https://etherscan.io/tx/0x9e4d87874a77a7df9a6cc75db234fedba350cc3aaa075dd156b1251aaea28e0b
alicepayment https://kmdexplorer.ru/tx/f030edd21a3cef754545a781ebfbe6aab71fc84fe2050bf04fe8c82a0c4d77a9
bobpayment https://etherscan.io/tx/0x6e9bdb6a461308ad74cf1bbbabab4c8f9ce0c18e75d12a9af2e2fc3ec6d40814

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"IOST\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"iostoken\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"IOST\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"iostoken\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"IOST\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"iostoken\",\"refrel\":\"coinmarketcap\"}"
```

## JOI

```
{\"coin\":\"JOI\",\"name\":\"jointedu\",\"etomic\":\"0x58ded6994124b4fff298f1416aca3fc9cdba37b2\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"JOI\"}"

home
      "coin" : "JOI",
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "p2shtype" : 85,
      "status" : "active",
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188,
      "pubtype" : 0,
      "installed" : false

contabo
      "p2shtype" : 85,
      "installed" : false,
      "coin" : "JOI",
      "status" : "active",
      "txfee" : 1000,
      "pubtype" : 0,
      "balance" : 200,
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"JOI\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"JOI\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"JOI\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
JointEDU (JOI)
SWAP completed! 296737019-3274515483 {"uuid":"03d1f994e43a6644cc20d4209be18a11a996f5a7aad95aa8148090502b3d53fc","expiration":1530179396,"tradeid":0,"requestid":296737019,"quoteid":3274515483,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"JOI","bobtomic":"0x58ded6994124b4fff298f1416aca3fc9cdba37b2","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67443483,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"11021012815808430081","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1530164167,"bobdeposit":"b947d35902aef5dfb7b445f173bf60f91b1dffcd7f8272ea639b0a5088a77551","alicepayment":"4c32b2372288248f59140ed0591b76ce0f721cdf5d768dcc98b48bc4d0df62d8","bobpayment":"584e139bc8a986a26f23b5a4153e030a869fe93492c9ebe23af8fa604b73a0af","paymentspent":"16f181103269a97899acb9d7316fb0a0bc203bf26c03cb333ce67675eed71c40","Apaymentspent":"87255647326a7f6c7ded6a0a0ca9dabbb2535fb29ca35d29990fe8dbcd75f684","depositspent":"6210046ab2a0166e4ac365b05065c842eed95c2f7dda30ed7ec8691885c73fe1","method":"tradestatus","finishtime":1530164167}
bobdeposit https://etherscan.io/tx/0x47371e34c9b396246f5fa65518a59eb68cd45d37db3339125ba7112e253d2981
alicepayment https://kmdexplorer.ru/tx/4c32b2372288248f59140ed0591b76ce0f721cdf5d768dcc98b48bc4d0df62d8
bobpayment https://etherscan.io/tx/0x26a7a8ab0c159d18518ce3a8f2efe3d8fd5bfb2733971b22b9f6ff3e537305d9

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"JOI\",\"fixed\":1}"
```

## KIN

```
{\"coin\":\"KIN\",\"name\":\"kin\",\"etomic\":\"0x818fc6c2ec5986bc6e2cbf00939d90556ab12ce5\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"KIN\"}"

home
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "installed" : false,
      "status" : "active",
      "coin" : "KIN",
      "height" : -1,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "balance" : 0,
      "pubtype" : 0

contabo
      "p2shtype" : 85,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "pubtype" : 0,
      "wiftype" : 188,
      "txfee" : 1000,
      "balance" : 3990,
      "coin" : "KIN",
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"KIN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"KIN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"KIN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Kin (KIN)
SWAP completed! 629868832-3715157397 {"uuid":"a5985fb8eb01ae80f89f44c0b6a5b24e05438910942e602bd62d091fd2b07754","expiration":1529347429,"tradeid":0,"requestid":629868832,"quoteid":3715157397,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"KIN","bobtomic":"0x818fc6c2ec5986bc6e2cbf00939d90556ab12ce5","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67557050,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"7828741881914851329","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1529332135,"bobdeposit":"63e7234de700b1d24db3f5fc5c29b6bc57587143a11815f0cacd4207127389b1","alicepayment":"4b130eb116de0da2b5371d880ca8346699b1005e72890c4e9f3a98c72934caf3","bobpayment":"b190bc1a4eda583cb0b0384debe022bbd8a373b164111e44f8fe5ec4aa0d7a57","paymentspent":"fba3f4acb8f5048310359ac639e664e323a8267291f603fe0cc869a269910f46","Apaymentspent":"49f79bc89f9992f2eff3710dbb5d946061ce538523ed0922838b9d5864e9d5dd","depositspent":"31996ba70e150738982ad5181c9e322ca9fb075ff44ee062cd20a6268015106f","method":"tradestatus","finishtime":1529332135}
bobdeposit https://etherscan.io/tx/0xb6158831374999a77ee770faa86f116e0149460f463a4ad903a36920bed04bb0
alicepayment https://kmdexplorer.ru/tx/4b130eb116de0da2b5371d880ca8346699b1005e72890c4e9f3a98c72934caf3
bobpayment https://etherscan.io/tx/0xd1844e2aba9e995730c46b6ac0c6819cccb6eb28a9ab802869a9b315d6c3b1c1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KIN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"kin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KIN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"kin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KIN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"kin\",\"refrel\":\"coinmarketcap\"}"
```

## KMD

```

cd ~/wallets
git clone https://github.com/jl777/komodo
cd komodo
git checkout dev
#./zcutil/fetch-params.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh -j2
strip src/komodod src/komodo-cli src/komodo-tx
sudo cp src/komodod src/komodo-cli /usr/local/bin/
mkdir ~/.komodo
echo "server=1" >> ~/.komodo/komodo.conf
echo "txindex=1" >> ~/.komodo/komodo.conf
echo "listen=0" >> ~/.komodo/komodo.conf
echo "listenonion=0" >> ~/.komodo/komodo.conf
echo "rpcuser=barterkmd" >> ~/.komodo/komodo.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/komodo.conf
echo "rpcworkqueue=64" >> ~/.komodo/komodo.conf
echo "rpcthreads=16" >> ~/.komodo/komodo.conf
chmod 0600 ~/.komodo/komodo.conf
komodod -daemon

----- assets ----

mkdir ~/.komodo/MNZ
echo "server=1" >> ~/.komodo/MNZ/MNZ.conf
echo "txindex=1" >> ~/.komodo/MNZ/MNZ.conf
echo "listen=0" >> ~/.komodo/MNZ/MNZ.conf
echo "listenonion=1" >> ~/.komodo/MNZ/MNZ.conf
echo "rpcport=14337" >> ~/.komodo/MNZ/MNZ.conf
echo "#proxy=127.0.0.1:9050" >> ~/.komodo/MNZ/MNZ.conf
echo "rpcuser=bartermnz" >> ~/.komodo/MNZ/MNZ.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/MNZ/MNZ.conf
chmod 0600 ~/.komodo/MNZ/MNZ.conf
komodod -ac_name=MNZ -ac_supply=257142858 -addnode=51.15.138.138 -daemon

mkdir ~/.komodo/REVS
echo "server=1" >> ~/.komodo/REVS/REVS.conf
echo "txindex=1" >> ~/.komodo/REVS/REVS.conf
echo "listen=0" >> ~/.komodo/REVS/REVS.conf
echo "listenonion=1" >> ~/.komodo/REVS/REVS.conf
echo "rpcport=10196" >> ~/.komodo/REVS/REVS.conf
echo "#proxy=127.0.0.1:9050" >> ~/.komodo/REVS/REVS.conf
echo "rpcuser=barterrevs" >> ~/.komodo/REVS/REVS.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/REVS/REVS.conf
chmod 0600 ~/.komodo/REVS/REVS.conf
komodod -ac_name=REVS -ac_supply=1300000 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/JUMBLR
echo "server=1" >> ~/.komodo/JUMBLR/JUMBLR.conf
echo "txindex=1" >> ~/.komodo/JUMBLR/JUMBLR.conf
echo "listen=0" >> ~/.komodo/JUMBLR/JUMBLR.conf
echo "listenonion=1" >> ~/.komodo/JUMBLR/JUMBLR.conf
echo "rpcport=15106" >> ~/.komodo/JUMBLR/JUMBLR.conf
echo "#proxy=127.0.0.1:9050" >> ~/.komodo/JUMBLR/JUMBLR.conf
echo "rpcuser=barterjumblr" >> ~/.komodo/JUMBLR/JUMBLR.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/JUMBLR/JUMBLR.conf
chmod 0600 ~/.komodo/JUMBLR/JUMBLR.conf
komodod -ac_name=JUMBLR -ac_supply=999999 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/COQUI
echo "server=1" >> ~/.komodo/COQUI/COQUI.conf
echo "txindex=1" >> ~/.komodo/COQUI/COQUI.conf
echo "listen=0" >> ~/.komodo/COQUI/COQUI.conf
echo "listenonion=1" >> ~/.komodo/COQUI/COQUI.conf
echo "rpcport=14276" >> ~/.komodo/COQUI/COQUI.conf
echo "#proxy=127.0.0.1:9050" >> ~/.komodo/COQUI/COQUI.conf
echo "rpcuser=bartercoqui" >> ~/.komodo/COQUI/COQUI.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/COQUI/COQUI.conf
chmod 0600 ~/.komodo/COQUI/COQUI.conf
komodod -ac_name=COQUI -ac_supply=72000000 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/WLC
echo "server=1" >> ~/.komodo/WLC/WLC.conf
echo "txindex=1" >> ~/.komodo/WLC/WLC.conf
echo "listen=0" >> ~/.komodo/WLC/WLC.conf
echo "listenonion=1" >> ~/.komodo/WLC/WLC.conf
echo "rpcport=12167" >> ~/.komodo/WLC/WLC.conf
echo "#proxy=127.0.0.1:9050" >> ~/.komodo/WLC/WLC.conf
echo "rpcuser=barterwlc" >> ~/.komodo/WLC/WLC.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/WLC/WLC.conf
chmod 0600 ~/.komodo/WLC/WLC.conf
komodod -ac_name=WLC -ac_supply=210000000 -addnode=148.251.190.89 -daemon

mkdir ~/.komodo/SUPERNET
echo "server=1" >> ~/.komodo/SUPERNET/SUPERNET.conf
echo "txindex=1" >> ~/.komodo/SUPERNET/SUPERNET.conf
echo "listen=0" >> ~/.komodo/SUPERNET/SUPERNET.conf
echo "listenonion=1" >> ~/.komodo/SUPERNET/SUPERNET.conf
echo "proxy=127.0.0.1:9050" >> ~/.komodo/SUPERNET/SUPERNET.conf
echo "rpcport=11341" >> ~/.komodo/SUPERNET/SUPERNET.conf
echo "rpcuser=bartersupernet" >> ~/.komodo/SUPERNET/SUPERNET.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/SUPERNET/SUPERNET.conf
chmod 0600 ~/.komodo/SUPERNET/SUPERNET.conf
komodod -ac_name=SUPERNET -ac_supply=816061 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/DEX
echo "server=1" >> ~/.komodo/DEX/DEX.conf
echo "txindex=1" >> ~/.komodo/DEX/DEX.conf
echo "listen=0" >> ~/.komodo/DEX/DEX.conf
echo "listenonion=1" >> ~/.komodo/DEX/DEX.conf
echo "proxy=127.0.0.1:9050" >> ~/.komodo/DEX/DEX.conf
echo "rpcport=11890" >> ~/.komodo/DEX/DEX.conf
echo "rpcuser=barterdex" >> ~/.komodo/DEX/DEX.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/DEX/DEX.conf
chmod 0600 ~/.komodo/DEX/DEX.conf
komodod -ac_name=DEX -ac_supply=999999 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/PANGEA
echo "server=1" >> ~/.komodo/PANGEA/PANGEA.conf
echo "txindex=1" >> ~/.komodo/PANGEA/PANGEA.conf
echo "listen=0" >> ~/.komodo/PANGEA/PANGEA.conf
echo "listenonion=1" >> ~/.komodo/PANGEA/PANGEA.conf
echo "proxy=127.0.0.1:9050" >> ~/.komodo/PANGEA/PANGEA.conf
echo "rpcport=14068" >> ~/.komodo/PANGEA/PANGEA.conf
echo "rpcuser=barterpangea" >> ~/.komodo/PANGEA/PANGEA.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/PANGEA/PANGEA.conf
chmod 0600 ~/.komodo/PANGEA/PANGEA.conf
komodod -ac_name=PANGEA -ac_supply=999999 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/BET
echo "server=1" >> ~/.komodo/BET/BET.conf
echo "txindex=1" >> ~/.komodo/BET/BET.conf
echo "listen=0" >> ~/.komodo/BET/BET.conf
echo "listenonion=1" >> ~/.komodo/BET/BET.conf
echo "proxy=127.0.0.1:9050" >> ~/.komodo/BET/BET.conf
echo "rpcport=14250" >> ~/.komodo/BET/BET.conf
echo "rpcuser=barterbet" >> ~/.komodo/BET/BET.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/BET/BET.conf
chmod 0600 ~/.komodo/BET/BET.conf
komodod -ac_name=BET -ac_supply=999999 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/CRYPTO
echo "server=1" >> ~/.komodo/CRYPTO/CRYPTO.conf
echo "txindex=1" >> ~/.komodo/CRYPTO/CRYPTO.conf
echo "listen=0" >> ~/.komodo/CRYPTO/CRYPTO.conf
echo "listenonion=1" >> ~/.komodo/CRYPTO/CRYPTO.conf
echo "proxy=127.0.0.1:9050" >> ~/.komodo/CRYPTO/CRYPTO.conf
echo "rpcport=8516" >> ~/.komodo/CRYPTO/CRYPTO.conf
echo "rpcuser=bartercrypto" >> ~/.komodo/CRYPTO/CRYPTO.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/CRYPTO/CRYPTO.conf
chmod 0600 ~/.komodo/CRYPTO/CRYPTO.conf
komodod -ac_name=CRYPTO -ac_supply=999999 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/HODL
echo "server=1" >> ~/.komodo/HODL/HODL.conf
echo "txindex=1" >> ~/.komodo/HODL/HODL.conf
echo "listen=0" >> ~/.komodo/HODL/HODL.conf
echo "listenonion=1" >> ~/.komodo/HODL/HODL.conf
echo "proxy=127.0.0.1:9050" >> ~/.komodo/HODL/HODL.conf
echo "rpcport=14431" >> ~/.komodo/HODL/HODL.conf
echo "rpcuser=barterhodl" >> ~/.komodo/HODL/HODL.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/HODL/HODL.conf
chmod 0600 ~/.komodo/HODL/HODL.conf
komodod -ac_name=HODL -ac_supply=9999999 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/MSHARK
echo "server=1" >> ~/.komodo/MSHARK/MSHARK.conf
echo "txindex=1" >> ~/.komodo/MSHARK/MSHARK.conf
echo "listen=0" >> ~/.komodo/MSHARK/MSHARK.conf
echo "listenonion=1" >> ~/.komodo/MSHARK/MSHARK.conf
echo "rpcport=8846" >> ~/.komodo/MSHARK/MSHARK.conf
echo "rpcuser=bartermshark" >> ~/.komodo/MSHARK/MSHARK.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/MSHARK/MSHARK.conf
chmod 0600 ~/.komodo/MSHARK/MSHARK.conf
komodod -ac_name=MSHARK -ac_supply=1400000 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/BOTS
echo "server=1" >> ~/.komodo/BOTS/BOTS.conf
echo "txindex=1" >> ~/.komodo/BOTS/BOTS.conf
echo "listen=0" >> ~/.komodo/BOTS/BOTS.conf
echo "listenonion=1" >> ~/.komodo/BOTS/BOTS.conf
echo "rpcport=11964" >> ~/.komodo/BOTS/BOTS.conf
echo "rpcuser=barterbots" >> ~/.komodo/BOTS/BOTS.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/BOTS/BOTS.conf
chmod 0600 ~/.komodo/BOTS/BOTS.conf
komodod -ac_name=BOTS -ac_supply=999999 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/BTCH
echo "server=1" >> ~/.komodo/BTCH/BTCH.conf
echo "txindex=1" >> ~/.komodo/BTCH/BTCH.conf
echo "listen=0" >> ~/.komodo/BTCH/BTCH.conf
echo "listenonion=0" >> ~/.komodo/BTCH/BTCH.conf
echo "rpcport=8801" >> ~/.komodo/BTCH/BTCH.conf
echo "rpcuser=barterbtch" >> ~/.komodo/BTCH/BTCH.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/BTCH/BTCH.conf
chmod 0600 ~/.komodo/BTCH/BTCH.conf
komodod -ac_name=BTCH -ac_supply=20998641 -addnode=78.47.196.146 -daemon

mkdir ~/.komodo/BNTN
echo "server=1" >> ~/.komodo/BNTN/BNTN.conf
echo "txindex=1" >> ~/.komodo/BNTN/BNTN.conf
echo "listen=0" >> ~/.komodo/BNTN/BNTN.conf
echo "listenonion=0" >> ~/.komodo/BNTN/BNTN.conf
echo "rpcport=14358" >> ~/.komodo/BNTN/BNTN.conf
echo "rpcuser=barterbntn" >> ~/.komodo/BNTN/BNTN.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/BNTN/BNTN.conf
chmod 0600 ~/.komodo/BNTN/BNTN.conf
komodod -ac_name=BNTN -ac_supply=500000000 -addnode=94.130.169.205 -daemon

mkdir ~/.komodo/KV
echo "server=1" >> ~/.komodo/KV/KV.conf
echo "txindex=1" >> ~/.komodo/KV/KV.conf
echo "listen=0" >> ~/.komodo/KV/KV.conf
echo "listenonion=1" >> ~/.komodo/KV/KV.conf
echo "rpcport=8299" >> ~/.komodo/KV/KV.conf
echo "#proxy=127.0.0.1:9050" >> ~/.komodo/KV/KV.conf
echo "rpcuser=barterkv" >> ~/.komodo/KV/KV.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/KV/KV.conf
chmod 0600 ~/.komodo/KV/KV.conf
komodod -ac_name=KV -ac_supply=1000000 -addnode=78.47.196.146 -daemon

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"OOT\",\"rel\":\"BCH\",\"margin\":0.3,\"refbase\":\"utrum\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"OOT\",\"rel\":\"BTC\",\"margin\":0.3,\"refbase\":\"utrum\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"OOT\",\"rel\":\"KMD\",\"margin\":0.3,\"refbase\":\"utrum\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"OOT\",\"rel\":\"LTC\",\"margin\":0.3,\"refbase\":\"utrum\",\"refrel\":\"coinmarketcap\"}"
```

## KNC

```
{\"coin\":\"KNC\",\"name\":\"kyber-network\",\"etomic\":\"0xdd974D5C2e2928deA5F71b9825b8b646686BD200\",\"rpcport\":80}

home
      "coin" : "KNC",
      "height" : -1,
      "pubtype" : 0,
      "installed" : false,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "balance" : 0,
      "wiftype" : 188,
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "installed" : false,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "wiftype" : 188,
      "balance" : 0,
      "txfee" : 1000,
      "status" : "active",
      "pubtype" : 0,
      "coin" : "KNC",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"KNC\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"KNC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"KNC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Kyber Network (KNC)
SWAP completed! 3817497114-1940750085 {"expiration":1523078935,"tradeid":0,"requestid":3817497114,"quoteid":1940750085,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"KNC","bobtomic":"0xdd974D5C2e2928deA5F71b9825b8b646686BD200","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.75719978,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"10537249637034819585","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.75720978, 0.08010000, 0.75721978, 0.08011000, 0.85186975, 0, 0, 0.85185975, 0, 0, 0],"result":"success","status":"finished","finishtime":1523063914,"bobdeposit":"9286a4ff4945cb57196b2756d81bd58f73662832d7c8d41a6f141fda333f73a5","alicepayment":"deac0eebaae1ff0f36b3d8150e61d5183ebaa5f43808a66b7243a4960394764a","bobpayment":"bb54b774f9c3163b1546d4411be80cef91551225c69c41e15c0be692fa414c29","paymentspent":"2db509b010ef48d0e49456bfb53afc5476641ce909fd3294e4e036ff74b376e5","Apaymentspent":"f5f0d86946f44b18e2000c4c8b7db1a69219e7daa42ad4da5361fbaf83266221","depositspent":"a8777f2d5470e88a02a8efcb69e06ac4a470d0814077d62954fbf06e89f2a878","method":"tradestatus","finishtime":1523063914}
bobdeposit https://etherscan.io/tx/0xcd62e8797b1f185d01257edb3287b50808c86d10796cd1dc946f030ecbac384a
alicepayment https://kmd.explorer.supernet.org/tx/deac0eebaae1ff0f36b3d8150e61d5183ebaa5f43808a66b7243a4960394764a
bobpayment https://etherscan.io/tx/0x6bc09d0c9a61549cdfac994847c3a6d16ea3443d1af71224a74672f647ae1a94
```

## KNG

```
BetKings (KNG)


{\"coin\":\"KNG\",\"name\":\"kings\",\"rpcport\":44888,\"pubtype\":75,\"p2shtype\":125,\"wiftype\":203,\"txfee\":10000}


mkdir ~/.kings
echo "server=1" >> ~/.kings/kings.conf
echo "txindex=1" >> ~/.kings/kings.conf
echo "listen=0" >> ~/.kings/kings.conf
echo "staking=0" >> ~/.kings/kings.conf
echo "litemode=1" >> ~/.kings/kings.conf
echo "#proxy=127.0.0.1:9050" >> ~/.kings/kings.conf
echo "rpcuser=barterkings" >> ~/.kings/kings.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.kings/kings.conf
chmod 0600 ~/.kings/kings.conf
kingsd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"KNG\"}"

home
      "installed" : true,
      "pubtype" : 75,
      "KMDvalue" : 0,
      "coin" : "KNG",
      "p2shtype" : 125,
      "rpc" : "127.0.0.1:44888",
      "txfee" : 10000,
      "status" : "active",
      "height" : 41873,
      "wiftype" : 203,
      "smartaddress" : "XYzB9wm6bVUo5hk2A5ZFKvGCBTxM48yfgf",
      "balance" : 0

contabo
      "status" : "active",
      "installed" : true,
      "coin" : "KNG",
      "wiftype" : 203,
      "height" : 41877,
      "KMDvalue" : 0,
      "txfee" : 10000,
      "balance" : 0,
      "p2shtype" : 125,
      "smartaddress" : "XDD2gJPNCAcnG3tFMNpMefs2RM8SsAPZdx",
      "rpc" : "127.0.0.1:44888",
      "pubtype" : 75

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"KNG\",\"fixed\":0.3}"

kings-cli sendtoaddress "XDD2gJPNCAcnG3tFMNpMefs2RM8SsAPZdx" 1
"fee" : -0.00002605
```

## KREDS

```
https://bitcointalk.org/index.php?topic=2886837.0
https://github.com/KredsBlockchain/kreds-core


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,45);// K
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,195);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"KREDS\",\"name\":\"kreds\",\"rpcport\":3850,\"pubtype\":45,\"p2shtype\":5,\"wiftype\":195,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/KredsBlockchain/kreds-core
cd kreds-core
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/kreds*
mkdir ~/.kreds
echo "server=1" >> ~/.kreds/kreds.conf
echo "txindex=1" >> ~/.kreds/kreds.conf
echo "listen=0" >> ~/.kreds/kreds.conf
echo "listenonion=0" >> ~/.kreds/kreds.conf
echo "rpcuser=barterkreds" >> ~/.kreds/kreds.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.kreds/kreds.conf
echo "rpcworkqueue=64" >> ~/.kreds/kreds.conf
echo "rpcthreads=16" >> ~/.kreds/kreds.conf
chmod 0600 ~/.kreds/kreds.conf
kredsd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"KREDS\"}"

home
      "height" : 11046,
      "smartaddress" : "KUr5cgpTJ5aWYhZRRVZgnA6bJLE3kZik9t",
      "wiftype" : 195,
      "rpc" : "127.0.0.1:3850",
      "status" : "active",
      "KMDvalue" : 0,
      "p2shtype" : 5,
      "pubtype" : 45,
      "txfee" : 10000,
      "balance" : 0,
      "coin" : "KREDS",
      "installed" : true

contabo
      "height" : 11046,
      "balance" : 0,
      "p2shtype" : 5,
      "KMDvalue" : 0,
      "wiftype" : 195,
      "status" : "active",
      "smartaddress" : "K94w93SitkiVj3hecnpo6uhRYDQ9WwvSB6",
      "coin" : "KREDS",
      "installed" : true,
      "pubtype" : 45,
      "txfee" : 10000,
      "rpc" : "127.0.0.1:3850"

kreds-cli sendtoaddress "K94w93SitkiVj3hecnpo6uhRYDQ9WwvSB6" 1
```

## LBC

```
@jiggytom
https://bitcointalk.org/index.php?topic=1541268.2720
https://github.com/lbryio/lbrycrd


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,0x55);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,0x7a);
base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1,0x1c);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"LBC\",\"name\":\"lbrycrd\",\"rpcport\":9245,\"pubtype\":85,\"p2shtype\":122,\"wiftype\":28,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/lbryio/lbrycrd
cd lbrycrd
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/lbry*
mkdir ~/.lbrycrd
echo "server=1" >> ~/.lbrycrd/lbrycrd.conf
echo "listen=0" >> ~/.lbrycrd/lbrycrd.conf
echo "listenonion=1" >> ~/.lbrycrd/lbrycrd.conf
echo "#proxy=127.0.0.1:9050" >> ~/.lbrycrd/lbrycrd.conf
echo "rpcuser=uselbc" >> ~/.lbrycrd/lbrycrd.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.lbrycrd/lbrycrd.conf
chmod 0600 ~/.lbrycrd/lbrycrd.conf
lbrycrdd -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"LBC\"}"

home
   {
      "pubtype" : 85,
      "wiftype" : 28,
      "p2shtype" : 122,
      "estimatedrate" : 20,
      "txfee" : 1000,
      "coin" : "LBC",
      "smartaddress" : "baND12jyhJ7ZG38tQGtSBAz4UWXnBWiDwQ",
      "rpc" : "127.0.0.1:9245",
      "status" : "active"
   },

contabo
   {
      "pubtype" : 85,
      "coin" : "LBC",
      "rpc" : "127.0.0.1:9245",
      "p2shtype" : 122,
      "status" : "active",
      "txfee" : 1000,
      "wiftype" : 28,
      "smartaddress" : "bEb4XPNFHyFYSPH7ba9YVvatiPhsxjK1Lf"
   },

lbrycrd-cli sendtoaddress "bEb4XPNFHyFYSPH7ba9YVvatiPhsxjK1Lf" 0.99959648
"fee": -0.00011351,
lbrycrd-cli sendtoaddress "bEb4XPNFHyFYSPH7ba9YVvatiPhsxjK1Lf" 1.19951577
"fee": -0.00026169,

lbrycrd-cli sendtoaddress "bEb4XPNFHyFYSPH7ba9YVvatiPhsxjK1Lf" 10
lbrycrd-cli sendtoaddress "bEb4XPNFHyFYSPH7ba9YVvatiPhsxjK1Lf" 12
"fee": -0.00004500
"fee": -0.00019260
```

## LIKE

```
{\"coin\":\"LIKE\",\"name\":\"likecoin\",\"etomic\":\"0x02f61fd266da6e8b102d4121f5ce7b992640cf98\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"LIKE\"}"

home
      "height" : -1,
      "balance" : 0,
      "txfee" : 1000,
      "status" : "active",
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "coin" : "LIKE",
      "pubtype" : 0,
      "installed" : false,
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "txfee" : 1000,
      "p2shtype" : 85,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "coin" : "LIKE",
      "balance" : 20,
      "pubtype" : 0,
      "height" : -1,
      "wiftype" : 188,
      "status" : "active",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"LIKE\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"LIKE\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"LIKE\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
LikeCoin (LIKE)
SWAP completed! 1868506536-593393554 {"uuid":"56a78854ab96b04622f02dccc3b5a666d26fb04bcef86f0d9202a02713b623f2","expiration":1530175004,"tradeid":0,"requestid":1868506536,"quoteid":593393554,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"LIKE","bobtomic":"0x02f61fd266da6e8b102d4121f5ce7b992640cf98","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77322194,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"8681553781712879617","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1530159715,"bobdeposit":"cbd1b0112caccbc19468ce62db72d3d70800403a9e45c3d641e40798830af082","alicepayment":"051ca171172de44a4d1932dc1f41c5c6ea442f223a97a59d79e248fb6dff11ac","bobpayment":"613462d746860e73944b464fa377c2e06e87f6aebc783d0105cec707cc8bb059","paymentspent":"a9f19cb397ec10a9c8200745edb728a00e64df0f005b352841992021c6e9c6ae","Apaymentspent":"5726977f9e57548bbcbe8ce12062ad51465abb093c86a7aa3446c09e6a7b01c0","depositspent":"055281662d7d54d80b7e12db77b770b241877de4097297c8841cdf1d90af25c8","method":"tradestatus","finishtime":1530159715}
bobdeposit https://etherscan.io/tx/0xfb592ec302594c0998e5dd5ae27cdc7b543f1837e31e8f71745da93fd96dbfa3
alicepayment https://kmdexplorer.ru/tx/051ca171172de44a4d1932dc1f41c5c6ea442f223a97a59d79e248fb6dff11ac
bobpayment https://etherscan.io/tx/0x75057368826abcc5c5358ac1de2f7fd7f6b5b4e456e054bcef3653998e5aa2ee

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LIKE\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"likecoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LIKE\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"likecoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LIKE\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"likecoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LIKE\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"likecoin\",\"refrel\":\"coinmarketcap\"}"
```

## LINK

```
{\"coin\":\"LINK\",\"name\":\"chainlink\",\"etomic\":\"0x514910771af9ca656af840dff83e8264ecf986ca\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"LINK\"}"

home
      "wiftype" : 188,
      "pubtype" : 0,
      "status" : "active",
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "height" : -1,
      "balance" : 0,
      "coin" : "LINK",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80"

hetzner
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "balance" : 86.8,
      "wiftype" : 188,
      "coin" : "LINK",
      "height" : -1,
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "installed" : false,
      "txfee" : 1000,
      "p2shtype" : 85

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"LINK\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"LINK\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
ChainLink (LINK)
SWAP completed! 2151592493-3509256416 {"uuid":"5064215fab2d60db3050b1ad9be3542dcf11a20d525945e82aa4b8006191faaa","expiration":1531470657,"tradeid":0,"requestid":2151592493,"quoteid":3509256416,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"LINK","bobtomic":"0x514910771af9ca656af840dff83e8264ecf986ca","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.67443483,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"2080885900984320001","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531455560,"bobdeposit":"10afd75a6518941c14d4d9e3720e30d5659461f77505ba646aa3af3b14fcd444","alicepayment":"2b302ccf5c85f97cf790e2c0921a4492d7cc38d4f94eca9867d20b17927b2217","bobpayment":"70da4801ac106ba16fec8320002f3383fd4ff6fca5e38919c3d5129000d0f394","paymentspent":"b00f9e4bd1035c15d4d0235c202ddd784a02311b053e5e41ad2cd2ada382a3fe","Apaymentspent":"d64e2ab99ee93935716e120457ad466a5796fc5429cfb24bbe6742a4d6a6d032","depositspent":"e812c50ff196d3668663fdcfbfebb16c6c11f7f8ae4c5a31571ec3f93260a816","alicedexfee":"6162bb51c84c5b4b1f50bfa69dfea5ec782b1fa871d8b09abe629002e038c7bd","method":"tradestatus","finishtime":1531455560}
bobdeposit https://etherscan.io/tx/0x0926d083ed940f9b8dcfc6da07679d566137b746b5ac1cc7369e0379c299f99a
alicepayment https://kmdexplorer.ru/tx/2b302ccf5c85f97cf790e2c0921a4492d7cc38d4f94eca9867d20b17927b2217
bobpayment https://etherscan.io/tx/0x039ddcd55a291edd1cb7656775a621c4d204f258fd214c67993fd4fc73eb44e3

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LINK\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"chainlink\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LINK\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"chainlink\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LINK\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"chainlink\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LINK\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"chainlink\",\"refrel\":\"coinmarketcap\"}"
```

## LOOM

```
{\"coin\":\"LOOM\",\"name\":\"loom-network\",\"etomic\":\"0xa4e8c3ec456107ea67d3075bf9e3df3a75823db0\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"LOOM\"}"

home
      "status" : "active",
      "balance" : 0,
      "height" : -1,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "coin" : "LOOM",
      "p2shtype" : 85,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "installed" : false

contabo
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "installed" : false,
      "coin" : "LOOM",
      "height" : -1,
      "status" : "active",
      "wiftype" : 188,
      "p2shtype" : 85

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"LOOM\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"LOOM\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"LOOM\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"LOOM\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Loom Network (LOOM)
SWAP completed! 814248543-1764013942 {"uuid":"403acadba3d8f75d1a5fd0fa7737c04ce0cf55d2f27f824b280975f64b552527","expiration":1526790251,"tradeid":0,"requestid":814248543,"quoteid":1764013942,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"LOOM","bobtomic":"0xa4e8c3ec456107ea67d3075bf9e3df3a75823db0","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.68599629,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"10440160151029415937","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.68600629, 0.08010000, 0.68601629, 0.08011000, 0.77176582, 0, 0, 0.77175582, 0, 0, 0],"result":"success","status":"finished","finishtime":1526775191,"bobdeposit":"d9bdfd2070489b6337e93fc109110539ef860af50fe640dd01830d14c62c7712","alicepayment":"f15e5e579359e05644f83902177e209962da2062804769dd684a757aec778617","bobpayment":"daac88ca243b88dc8dce38b9efed86d67fe7f973e8f5f74976da3b48f0b12253","paymentspent":"04b1cb028d8fb4d75c58e51930220e40d784e29f51d6f29ce61f47d73dd03772","Apaymentspent":"e0ce6f66d70999f6918b6c661ac2c539c1455e05fa03ac46e60e300d665261f2","depositspent":"d0840bbf3cd28f86083291f05cdd69020ac1ff2a033e8ae00304610b39a0b500","method":"tradestatus","finishtime":1526775191}
bobdeposit https://etherscan.io/tx/0x9675374681dc93979a0f9d66ef5b647f730c5c8e4b2b7e0aeed057ef740bda8d
alicepayment https://kmdexplorer.ru/tx/f15e5e579359e05644f83902177e209962da2062804769dd684a757aec778617
bobpayment https://etherscan.io/tx/0xbc420681b45cf6217da7df9b8b7822a28c11a66f926032ae8adf67d29fa30b0f

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LOOM\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"loom-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LOOM\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"loom-network\",\"refrel\":\"coinmarketcap\"}"
```

## LRC

```
{\"coin\":\"LRC\",\"name\":\"loopring\",\"etomic\":\"0xEF68e7C694F40c8202821eDF525dE3782458639f\",\"rpcport\":80,\"decimals\":18}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"LRC\"}"

home
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "balance" : 0,
      "p2shtype" : 85,
      "wiftype" : 188,
      "txfee" : 1000,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "coin" : "LRC"

contabo
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "wiftype" : 188,
      "height" : -1,
      "balance" : 0,
      "installed" : false,
      "p2shtype" : 85,
      "pubtype" : 0,
      "coin" : "LRC",
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"LRC\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"LRC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"LRC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Loopring (LRC)
SWAP completed! 1416935604-4123801199 {"uuid":"c12336f7f3987b8057f4e8dfbe0a7b262a1fb25ee13896ce1df0e65a9b0a0282","expiration":1527630203,"tradeid":0,"requestid":1416935604,"quoteid":4123801199,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"LRC","bobtomic":"0xEF68e7C694F40c8202821eDF525dE3782458639f","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77925915,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"3538462148359225345","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77926915, 0.08010000, 0.77927915, 0.08011000, 0.87668654, 0, 0, 0.87667654, 0, 0, 0],"result":"success","status":"finished","finishtime":1527615300,"bobdeposit":"4c1910655e175f10b8e338e88401eaf7db949aaad9fb4a9a2cc6cc322cb788f7","alicepayment":"e854b73f7b57d6645972a60d794cdd0708da1da5bc438ff375ac4b585cebc927","bobpayment":"3113d2de54c8281f2d8e0e8da007de820c19d7fa372670d4ff275a16f65c8c7c","paymentspent":"4f283efcb3954e6be2b68e021afeea7224f1a6800c6021939859c0c648c46476","Apaymentspent":"c8861122e72af9d55bf4756c6c6c0809af16ee1f185a309b77e7ae6c092ce046","depositspent":"9baa3d03374d3d1cdd1247c125cc3c01f635ba84444ab6921921cc1ec55ce9c4","method":"tradestatus","finishtime":1527615300}
bobdeposit https://etherscan.io/tx/0x018448a765c7208fcd84afc694219cbead889128d4be256b9d3790af195f89ed
alicepayment https://kmdexplorer.ru/tx/e854b73f7b57d6645972a60d794cdd0708da1da5bc438ff375ac4b585cebc927
bobpayment https://etherscan.io/tx/0xf20c7e809cc78cd3b3e5b16333839c39da2510fb1927ad2b266dcf94489ce5c5

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LRC\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"loopring\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LRC\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"loopring\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LRC\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"loopring\",\"refrel\":\"coinmarketcap\"}"
```

## LTC

```
https://bitcointalk.org/index.php?topic=47417.0
https://github.com/litecoin-project/litecoin

base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,48);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,50);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

{\"coin\":\"LTC\", \"name\":\"litecoin\", \"rpcport\":9332, \"pubtype\":48, \"p2shtype\":5, \"wiftype\":176, \"txfee\":100000}


cd ~/wallets
git clone https://github.com/litecoin-project/litecoin
cd litecoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq --enable-experimental-asm
make -j4
sudo make install
sudo strip /usr/local/bin/litecoin*
mkdir ~/.litecoin
echo "server=1" >> ~/.litecoin/litecoin.conf
echo "txindex=1" >> ~/.litecoin/litecoin.conf
echo "listen=0" >> ~/.litecoin/litecoin.conf
echo "listenonion=0" >> ~/.litecoin/litecoin.conf
echo "rpcuser=barterltc" >> ~/.litecoin/litecoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.litecoin/litecoin.conf
echo "rpcworkqueue=64" >> ~/.litecoin/litecoin.conf
echo "rpcthreads=16" >> ~/.litecoin/litecoin.conf
chmod 0600 ~/.litecoin/litecoin.conf
litecoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"LTC\"}"

home
   {
      "coin" : "LTC",
      "pubtype" : 48,
      "smartaddress" : "Lgrta1iKRcy8zzygVkZeEXuxBqzssPWtae",
      "rpc" : "127.0.0.1:9332",
      "estimatedrate" : 20,
      "wiftype" : 176,
      "status" : "active",
      "txfee" : 100000,
      "p2shtype" : 5
   },

contabo
      "txfee" : 100000,
      "pubtype" : 48,
      "height" : 1349038,
      "status" : "active",
      "p2shtype" : 5,
      "KMDvalue" : 0,
      "smartaddress" : "LM5k6NLb2J78BM7uh3pkZHWnRjAyjbz38N",
      "wiftype" : 176,
      "balance" : 0,
      "coin" : "LTC",
      "installed" : true,
      "rpc" : "127.0.0.1:9332"

litecoin-cli sendtoaddress "LM5k6NLb2J78BM7uh3pkZHWnRjAyjbz38N" 1
litecoin-cli sendtoaddress "LM5k6NLb2J78BM7uh3pkZHWnRjAyjbz38N" 1.2
"fee": -0.00022655
```

## LTZ

```
https://www.litecoinz.info/
https://bitcointalk.org/index.php?topic=2767102.0
https://github.com/litecoinz-project/litecoinz


src/chainparams.cpp
// guarantees the first 2 characters, when base58 encoded, are "L1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x0A,0xB3};
// guarantees the first 2 characters, when base58 encoded, are "L3"
base58Prefixes[SCRIPT_ADDRESS]     = {0x0A,0xB8};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100;

{\"coin\":\"LTZ\",\"name\":\"litecoinz\",\"rpcport\":29332,\"taddr\":10,\"pubtype\":179,\"p2shtype\":184,\"wiftype\":128,\"txfee\":1000}


cd ~/wallets
git clone https://github.com/litecoinz-project/litecoinz
cd litecoinz
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh --disable-tests -j4
sudo cp src/litecoinzd /usr/local/bin/litecoinzd
sudo cp src/litecoinz-cli /usr/local/bin/litecoinz-cli
sudo strip /usr/local/bin/litecoinz*
cd
ln -s .zcash-params .litecoinz-params
mkdir ~/.litecoinz
echo "server=1" >> ~/.litecoinz/litecoinz.conf
echo "txindex=1" >> ~/.litecoinz/litecoinz.conf
echo "listen=0" >> ~/.litecoinz/litecoinz.conf
echo "listenonion=1" >> ~/.litecoinz/litecoinz.conf
echo "#proxy=127.0.0.1:9050" >> ~/.litecoinz/litecoinz.conf
echo "rpcuser=barterltcz" >> ~/.litecoinz/litecoinz.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.litecoinz/litecoinz.conf
chmod 0600 ~/.litecoinz/litecoinz.conf
litecoinzd -daemon


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"LTZ\"}"

home
      "smartaddress" : "L1VP4DDpc45vukPAoMitH9wMzsJKGzb9gMX",
      "height" : 19528,
      "balance" : 0.98440227,
      "p2shtype" : 184,
      "KMDvalue" : 0,
      "pubtype" : 179,
      "status" : "active",
      "wiftype" : 128,
      "rpc" : "127.0.0.1:29332",
      "installed" : true,
      "txfee" : 1000,
      "coin" : "LTZ"

contabo
      "pubtype" : 179,
      "smartaddress" : "L19bujaSsem4tvjK2Z29PUgxq7BVNps2hpF",
      "p2shtype" : 184,
      "rpc" : "127.0.0.1:29332",
      "txfee" : 1000,
      "height" : 19510,
      "wiftype" : 128,
      "status" : "active",
      "balance" : 0,
      "installed" : true,
      "coin" : "LTZ",
      "KMDvalue" : 0

litecoinz-cli sendtoaddress "L19bujaSsem4tvjK2Z29PUgxq7BVNps2hpF" 1
"fee": -0.00000226
```

## LUN

```
{\"coin\":\"LUN\",\"name\":\"lunyr\",\"etomic\":\"0xfa05A73FfE78ef8f1a739473e462c54bae6567D9\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"LUN\"}"

home
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "p2shtype" : 85,
      "coin" : "LUN",
      "balance" : 0,
      "pubtype" : 0,
      "wiftype" : 188,
      "installed" : false,
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "coin" : "LUN",
      "balance" : 4.95,
      "height" : -1,
      "installed" : false,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "txfee" : 1000,
      "wiftype" : 188,
      "p2shtype" : 85,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"LUN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"LUN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"LUN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Lunyr (LUN)
SWAP completed! 485913924-2702260163 {"uuid":"6953a751b199e56570712cc4d5415bddb0366a80e08e4ced828245f3b5fb0648","expiration":1528837530,"tradeid":0,"requestid":485913924,"quoteid":2702260163,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"LUN","bobtomic":"0xfa05A73FfE78ef8f1a739473e462c54bae6567D9","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76295923,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"383270709005778945","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76296923, 0.08010000, 0.76297923, 0.08011000, 0.85834913, 0, 0, 0.85833913, 0, 0, 0],"result":"success","status":"finished","finishtime":1528822314,"bobdeposit":"dbe4e84e4bf93b30c89dea57a448b3251631e9e5fd8f2be9d85f1b2cf131910d","alicepayment":"47fe2849d85b7c86eaaf0207c7168b326897d15733b3a54c2e3c5325d7480734","bobpayment":"2d9b5ac0bc2abe018c912a19709c5625b33367b343d61f6d083191b40c8b3e3b","paymentspent":"f876c97451953dc1c47e1d01bc69bb3361b39a21209e92cc215cd676af991cc3","Apaymentspent":"406d8be562b27c6a0c63dc1a665c522d2b9aa60916b2aa08ff7dd2a46a79afe6","depositspent":"3a648d871f965c5bde06786203af3214cd3b8c60154be9c420f19fb598019706","method":"tradestatus","finishtime":1528822314}
bobdeposit https://etherscan.io/tx/0x8f2640d26642c340710135126ccad6d0c61f93b4cc7ffaca555632dccb8d4296
alicepayment https://kmdexplorer.ru/tx/47fe2849d85b7c86eaaf0207c7168b326897d15733b3a54c2e3c5325d7480734
bobpayment https://etherscan.io/tx/0x7090bd49cd8046d85780f160865b3a539c8019116e3192a5061936efd398b0f3

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LUN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"lunyr\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LUN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"lunyr\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"LUN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"lunyr\",\"refrel\":\"coinmarketcap\"}"
```

## LYS

```
{\"coin\":\"LYS\",\"name\":\"lightyears\",\"etomic\":\"0xdd41fbd1ae95c5d9b198174a28e04be6b3d1aa27\",\"rpcport\":80}

home
      "installed" : false,
      "balance" : 0,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "coin" : "LYS",
      "p2shtype" : 85,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "wiftype" : 188

contabo
      "balance" : 0,
      "coin" : "LYS",
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "height" : -1,
      "installed" : false,
      "status" : "active",
      "p2shtype" : 85,
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"LYS\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"LYS\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"LYS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"LYS\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Lightyears (LYS)
SWAP completed! 740305296-3811116579 {"expiration":1522827171,"tradeid":0,"requestid":740305296,"quoteid":3811116579,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"LYS","bobtomic":"0xdd41fbd1ae95c5d9b198174a28e04be6b3d1aa27","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.72178386,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12887591964719513604","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.72179386, 0.08010000, 0.72180386, 0.08011000, 0.81202684, 0, 0, 0.81201684, 0, 0, 0],"result":"success","status":"finished","finishtime":1522811773,"bobdeposit":"cc24d94d2bf0d20d9eb5c759960d1157380bff0f77fa925d5e13e6186f137f0f","alicepayment":"33c404838eefa6b4c0f131b0ae561a4c4e38e890ac6bba0d30ad12c90c460139","bobpayment":"c6262c8f46783d57b70986bce0ebee671e61e3bcff622a293b2f99dff3e0161a","paymentspent":"f4913cc54aba8fde75730447041ba25768336b8207bd9373a641a84dbe2574ef","Apaymentspent":"4160812f77cce824b24f09b2cb1911d33ccc0ab6a0570e2a573a99e81b2877f9","depositspent":"80e0d82092f787b7f8836150b4473039b2e061ffab9998f2bcfa2a024e457bb6","method":"tradestatus","finishtime":1522811773}
bobdeposit https://etherscan.io/tx/0x7b080a5ed49f3e930c78a9600ac7491912795c42ecdca04cca48c97976e907a3
alicepayment https://kmd.explorer.supernet.org/tx/33c404838eefa6b4c0f131b0ae561a4c4e38e890ac6bba0d30ad12c90c460139
bobpayment https://etherscan.io/tx/0x41d5afc043c97ff836a94b1a46df7150f346e2399834c4d275897c5a46791872
```

## MAC

```
https://bitcointalk.org/index.php?topic=1693210.0
https://github.com/machinecoin-project/machinecoin-core


src/chainparams.cpp
nDefaultPort = 40333;
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,50); // Machinecoin M
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5); // Machinecoin 3
base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1,178); // Machinecoin 2

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;
src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;

{\"coin\":\"MAC\",\"name\":\"machinecoin\",\"rpcport\":40332,\"pubtype\":50,\"p2shtype\":5,\"wiftype\":178,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/machinecoin-project/machinecoin-core
cd machinecoin-core
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/machinecoin*
mkdir ~/.machinecoin
echo "server=1" >> ~/.machinecoin/machinecoin.conf
echo "txindex=1" >> ~/.machinecoin/machinecoin.conf
echo "litemode=1" >> ~/.machinecoin/machinecoin.conf
echo "listen=0" >> ~/.machinecoin/machinecoin.conf
echo "listenonion=0" >> ~/.machinecoin/machinecoin.conf
echo "rpcuser=bartermac" >> ~/.machinecoin/machinecoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.machinecoin/machinecoin.conf
echo "rpcworkqueue=64" >> ~/.machinecoin/machinecoin.conf
echo "rpcthreads=16" >> ~/.machinecoin/machinecoin.conf
chmod 0600 ~/.machinecoin/machinecoin.conf
machinecoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MAC\"}"

home
   {
      "smartaddress" : "MVY6YEJtqyttdsFrYbEHCnTXSrWmGgKB2q",
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:40332",
      "wiftype" : 178,
      "status" : "active",
      "pubtype" : 50,
      "txfee" : 50000,
      "coin" : "MAC"
   },

contabo
   {
      "pubtype" : 50,
      "wiftype" : 178,
      "status" : "active",
      "coin" : "MAC",
      "rpc" : "127.0.0.1:40332",
      "p2shtype" : 5,
      "txfee" : 50000,
      "smartaddress" : "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi"
   },

machinecoin-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 13.66828688
"fee": -0.00067000


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"POLIS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"POLIS\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"

```

## MAGA

```
https://bitcointalk.org/index.php?topic=2003320.0
https://github.com/magacoin/magacoin => schissdreck
https://github.com/kvasir39/magacoin

src/wallparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,23);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,50);
base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,50);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 200000;
DEFAULT_TRANSACTION_MINFEE = 100000;

{\"coin\":\"MAGA\",\"name\":\"magacoin\",\"rpcport\":5332,\"pubtype\":23,\"p2shtype\":50,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/kvasir39/magacoin
cd magacoin
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc
make -j8
sudo make install
mkdir ~/.magacoin
echo "server=1" >> ~/.magacoin/magacoin.conf
echo "txindex=1" >> ~/.magacoin/magacoin.conf
echo "listen=0" >> ~/.magacoin/magacoin.conf
echo "listenonion=0" >> ~/.magacoin/magacoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.magacoin/magacoin.conf
echo "rpcuser=bartermaga" >> ~/.magacoin/magacoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.magacoin/magacoin.conf
chmod 0600 ~/.magacoin/magacoin.conf
magacoind -daemon


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MAGA}"

home
   {
      "smartaddress" : "AdQoxJG7g7PEZAVWtGEg7Q7HTEZJ4iowVJ",
      "txfee" : 100000,
      "wiftype" : 176,
      "pubtype" : 23,
      "p2shtype" : 50,
      "coin" : "MAGA",
      "status" : "active",
      "height" : 57667,
      "rpc" : "127.0.0.1:5332"
   },

contabo
   {
      "txfee" : 100000,
      "status" : "inactive",
      "wiftype" : 176,
      "rpc" : "127.0.0.1:5332",
      "coin" : "MAGA",
      "smartaddress" : "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf",
      "height" : 0,
      "p2shtype" : 50,
      "pubtype" : 23
   },

magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 1
magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 1.2

magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 1
magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 1.2

magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 10
magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 12

magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 10
magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 12

magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 20
magacoin-cli sendtoaddress "AHdfUetPGnXDjWdk5ZVnS9i7h7jPsuzcQf" 24

"fee": -0.00045000



```

## MAN

```
https://bitcointalk.org/index.php?topic=2669586

{\"coin\":\"MAN\",\"name\":\"matrix-ai-network\",\"etomic\":\"0xe25bcec5d3801ce3a794079bf94adf1b8ccd802d\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MAN\"}"

home
      "height" : -1,
      "txfee" : 1000,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "installed" : false,
      "coin" : "MAN",
      "pubtype" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "status" : "active"

contabo
      "pubtype" : 0,
      "coin" : "MAN",
      "status" : "active",
      "balance" : 32.8112,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false,
      "height" : -1,
      "txfee" : 1000,
      "p2shtype" : 85

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MAN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MAN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MAN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Matrix AI Network (MAN)
SWAP completed! 675962970-1130899212 {"uuid":"a995138683c48236cc9d8b036bc068f9f279e1699956624b5ae62ead952667dd","expiration":1531277772,"tradeid":0,"requestid":675962970,"quoteid":1130899212,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MAN","bobtomic":"0xe25bcec5d3801ce3a794079bf94adf1b8ccd802d","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.72436011,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"4135052055263379457","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531263218,"bobdeposit":"8a3b5b32bc6830b39258623fcc2ca3a352b1d8cec25db8ef76077a6ab8bc29ac","alicepayment":"f18d974060672612ca365508138504777df1d73b6a1759ff921cf421a8e5651b","bobpayment":"4bd6b1246dd9de3ecbbff8d939c7fd5c97797dbf4a6ec479a7104a56833cdc38","paymentspent":"87aa4224723ed4793bcb2c67f50f672b276853a21f25a51f65fef6015b640684","Apaymentspent":"c3beb57cba2caaffaa7458886e735a04ce27185df7fe79103de87de8a5cc2932","depositspent":"ab69234073a4e57813089a2285d1cc937e0650251d97cc9c5788752767e87846","alicedexfee":"77b11e82e484835dbcf4413636f927fa56e6d0b6e6255ab2a17887ffd7bc2e2b","method":"tradestatus","finishtime":1531263218}
bobdeposit https://etherscan.io/tx/0x46a90036cb87f474abb0a2e185e9b0c6cf24b009d958b4cc99131dbb94f5adc4
alicepayment https://kmdexplorer.ru/tx/f18d974060672612ca365508138504777df1d73b6a1759ff921cf421a8e5651b
bobpayment https://etherscan.io/tx/0x1d41fe19122f02ccbb634c45020f17ac53430ccc39d0be01eb39bbbaeb5b16f9

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MAN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"matrix-ai-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MAN\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"matrix-ai-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MAN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"matrix-ai-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MAN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"matrix-ai-network\",\"refrel\":\"coinmarketcap\"}"
```

## MANA

```
{\"coin\":\"MANA\",\"name\":\"decentraland\",\"etomic\":\"0x0F5D2fB29fb7d3CFeE444a200298f468908cC942\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MANA\"}"

home
      "pubtype" : 0,
      "height" : -1,
      "p2shtype" : 85,
      "txfee" : 1000,
      "wiftype" : 188,
      "coin" : "MANA",
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "status" : "active"

contabo
      "status" : "active",
      "installed" : false,
      "txfee" : 1000,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "coin" : "MANA",
      "wiftype" : 188,
      "p2shtype" : 85,
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "balance" : 184.8

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MANA\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MANA\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MANA\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Decentraland (MANA)
SWAP completed! 3617541466-4086203384 {"uuid":"b68454ba8b7dfb558fd15ce1650fcfee50e3e88bb842fa5ae96106dd3f8661da","expiration":1531198801,"tradeid":0,"requestid":3617541466,"quoteid":4086203384,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MANA","bobtomic":"0x0F5D2fB29fb7d3CFeE444a200298f468908cC942","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70033548,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"15453045455526756353","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531183862,"bobdeposit":"6e22dea1f8728d50628b370943dcaa463e1f846062ec502171debffb16df2fb1","alicepayment":"221650b85a019c7b7eaf0d178104e57af17461f148e52fdfabbbaf7037c6b7ee","bobpayment":"2460f129d2e2b496c37678beef41e4c5a2751653f1ba9f4a92c0ec7becfc2052","paymentspent":"d678262c8b7ee26dcc13a49bc0cfe564f1f0f6ff3a76dbbbfb8263f171d0bc78","Apaymentspent":"a5a67d5ac3ff44f5b58e5d32dca3287944151b8dff66184194994659099c5a24","depositspent":"be4863e59a67e478c959fd061ac02b7d803d363da078cd0dbf9a1b0da43888c9","alicedexfee":"bacf4709ea8400a99ae490c32fa1982ea31e2b25deb09f31fdf47b017b9dd22b","method":"tradestatus","finishtime":1531183862}
bobdeposit https://etherscan.io/tx/0x5c579ee795a8e68c8c24be37d907ae0017e08d0a4ab20adc97efd0a45d731173
alicepayment https://kmdexplorer.ru/tx/221650b85a019c7b7eaf0d178104e57af17461f148e52fdfabbbaf7037c6b7ee
bobpayment https://etherscan.io/tx/0x8ef7c6a89e2a7043bd6e104c7f50a7a41cdd37e9805746a0324615ba99e6f81a

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MANA\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"decentraland\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MANA\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"decentraland\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MANA\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"decentraland\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MANA\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"decentraland\",\"refrel\":\"coinmarketcap\"}"
```

## MCO

```
{\"coin\":\"MCO\",\"name\":\"monaco\",\"etomic\":\"0xB63B606Ac810a52cCa15e44bB630fd42D8d1d83d\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MCO\"}"

home
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "txfee" : 1000,
      "balance" : 0,
      "coin" : "MCO",
      "height" : -1,
      "pubtype" : 0,
      "wiftype" : 188,
      "installed" : false

contabo
      "balance" : 0,
      "status" : "active",
      "txfee" : 1000,
      "coin" : "MCO",
      "installed" : false,
      "p2shtype" : 85,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MCO\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MCO\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MCO\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Monaco (MCO)
SWAP completed! 613263562-1122024935 {"uuid":"8c9f812cb835a37ac732718d711a43ccd3ebde3677d03e1d4c046d8d16d57190","expiration":1528175168,"tradeid":0,"requestid":613263562,"quoteid":1122024935,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MCO","bobtomic":"0xB63B606Ac810a52cCa15e44bB630fd42D8d1d83d","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.78077556,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1317181454390394882","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.78078556, 0.08010000, 0.78079556, 0.08011000, 0.87839250, 0, 0, 0.87838250, 0, 0, 0],"result":"success","status":"finished","finishtime":1528160425,"bobdeposit":"6d801a486ded7c8adfef128e17fe7d207ff3e7669a9a03133ca698ec3ca8381e","alicepayment":"9aceadb2adc68d2e7d237e57adb29f13ac79a70afcad57fbe40bb8946f0dd50c","bobpayment":"d31b381197f0a43ce7f8318effab66dad4ca4fcad582055bab5b174233716d5b","paymentspent":"a461310f1a7a78eba14ca41a0004439a23972c6f3f987f16343b264aee35ed1b","Apaymentspent":"0912835fb4a0b27585b017efd751acd3fe11cb60968328907ca64bbe89b11b2b","depositspent":"b307d1448a509e4122acbb3a74e3977db49d00a7601d8cf5942b16f7a94cc459","method":"tradestatus","finishtime":1528160425}
bobdeposit https://etherscan.io/tx/0xdb11e4af0ca7f78a53a4e3885c9160f5bb05125c2b0b9c960fca99028a4227ba
alicepayment https://kmdexplorer.ru/tx/9aceadb2adc68d2e7d237e57adb29f13ac79a70afcad57fbe40bb8946f0dd50c
bobpayment https://etherscan.io/tx/0xa927b0737dbf2e4b77468dc62aa1f605b73711e29344215727e9b7433688f952

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MCO\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"monaco\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MCO\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"monaco\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MCO\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"monaco\",\"refrel\":\"coinmarketcap\"}"
```

## MGO

```
{\"coin\":\"MGO\",\"name\":\"mobilego\",\"etomic\":\"0x40395044Ac3c0C57051906dA938B54BD6557F212\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MGO\"}"

home
      "p2shtype" : 85,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "wiftype" : 188,
      "balance" : 0,
      "installed" : false,
      "height" : -1,
      "coin" : "MGO",
      "pubtype" : 0

contabo
      "p2shtype" : 85,
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "height" : -1,
      "installed" : false,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "coin" : "MGO",
      "status" : "active",
      "wiftype" : 188

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MGO\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MGO\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MGO\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MGO\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
MobileGo (MGO)
SWAP completed! 4067778827-135016750 {"uuid":"67b19c28b7af784740dd25d414835dfda863802054913d894ad4c739d5ed7f2c","expiration":1526634781,"tradeid":0,"requestid":4067778827,"quoteid":135016750,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MGO","bobtomic":"0x40395044Ac3c0C57051906dA938B54BD6557F212","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.68133671,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"18008505478234963969","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.68134671, 0.08010000, 0.68135671, 0.08011000, 0.76652379, 0, 0, 0.76651379, 0, 0, 0],"result":"success","status":"finished","finishtime":1526619730,"bobdeposit":"fad59811692c6f026d60afcb665f0ec47b991e482d606e43dcff68aba998933b","alicepayment":"e5eed08cab6322af6bd09a06c23f232fd63b2dfd538bb3bdd00312d3992c00d6","bobpayment":"1b0e659b2f2c950deab5eb0a6c078458498dd370cc7989a0d5df5ef03edf5205","paymentspent":"55f4461d830a3b9350291fdf5e6a8a72b11de5f582a9e0a4be35fac8ed841e31","Apaymentspent":"496d0868fd0dd8722b7555e06ba866d0024f12a430aca407754a5f2c215d614e","depositspent":"90f148aa30907d63c235d2586c259fd6c1af3a4a8d2c1ff4c9fe4a8c87ddb324","method":"tradestatus","finishtime":1526619730}
bobdeposit https://etherscan.io/tx/0x67e0747d1dd17d4494134a91ebbec1ef89e5055ef24d9f041597f92ea779693c
alicepayment https://kmdexplorer.ru/tx/e5eed08cab6322af6bd09a06c23f232fd63b2dfd538bb3bdd00312d3992c00d6
bobpayment https://etherscan.io/tx/0x1368c18742c254e554289287d7677ce0d5b25da7462b809de89fb603ec6e840f

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MGO\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"mobilego\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MGO\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"mobilego\",\"refrel\":\"coinmarketcap\"}"

```

## MKR

```
{\"coin\":\"MKR\",\"name\":\"maker\",\"etomic\":\"0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MKR\"}"

home
      "coin" : "MKR",
      "p2shtype" : 85,
      "installed" : false,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "pubtype" : 0,
      "height" : -1,
      "txfee" : 1000,
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "height" : -1,
      "wiftype" : 188,
      "p2shtype" : 85,
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "txfee" : 1000,
      "coin" : "MKR",
      "status" : "active",
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MKR\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":0.1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MKR\",\"rel\":\"KMD\",\"price\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MKR\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":1.2}"
Maker (MKR)
SWAP completed! 790823036-4146706623 {"uuid":"fd5e4926eedfc75f1fd157d74084090921079f4051a25a1fea6ed57d48252af0","expiration":1527374224,"tradeid":0,"requestid":790823036,"quoteid":4146706623,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MKR","bobtomic":"0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.06890352,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12213295656471494657","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.06891352, 0.08010000, 0.06892352, 0.08011000, 0.07753646, 0, 0, 0.07752646, 0, 0, 0],"result":"success","status":"finished","finishtime":1527359269,"bobdeposit":"13f81a4eff6912979aeed37dce990f1954e56f6ae57d0076fbf74f128040f2ae","alicepayment":"e6698c12db0e16b4ef342229e12631cf149f66a01a9f17044aac8c92aac58309","bobpayment":"370e4292e6eb8c1d0052ff17ffd03f6d958d7c6eff5344a2cb3d9d3c7e21e7d0","paymentspent":"9a4da1b62e4aa20d49da4bee6d4686acec2b7f382100d8614f8ec8fd19d1d584","Apaymentspent":"39c0831d512752fe31b6b53371271088a026ba5e17a68c936f38e03ddacfaff2","depositspent":"e0f17d76bc79f412f46ead6f1b58734deacbb543c49378ba9ff94b0165fe8974","method":"tradestatus","finishtime":1527359269}
bobdeposit https://etherscan.io/tx/0x3937b398a360f7c80a0f4baff90cc9f4d6560f88f83156d061b6d6cd3be4c69e
alicepayment https://kmdexplorer.ru/tx/e6698c12db0e16b4ef342229e12631cf149f66a01a9f17044aac8c92aac58309
bobpayment https://etherscan.io/tx/0x79d7777b42547efe7af04a22662d70bbe1c9617937ba3beac5c703c70bdd6bc2

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MKR\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"maker\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MKR\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"maker\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MKR\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"maker\",\"refrel\":\"coinmarketcap\"}"

```

## MLM

```
https://bitcointalk.org/index.php?topic=2545143
https://github.com/Mktcoin-official/Mktcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,110);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,115);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,238);

{\"coin\":\"MLM\",\"name\":\"mktcoin\",\"rpcport\":9276,\"pubtype\":110,\"p2shtype\":115,\"wiftype\":238,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/Mktcoin-official/Mktcoin
cd Mktcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j2
sudo make install
sudo strip /usr/local/bin/mktcoin*
mkdir ~/.mktcoin
echo "server=1" >> ~/.mktcoin/mktcoin.conf
echo "txindex=1" >> ~/.mktcoin/mktcoin.conf
echo "listen=0" >> ~/.mktcoin/mktcoin.conf
echo "listenonion=0" >> ~/.mktcoin/mktcoin.conf
echo "rpcuser=bartermlm" >> ~/.mktcoin/mktcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.mktcoin/mktcoin.conf
echo "rpcworkqueue=64" >> ~/.mktcoin/mktcoin.conf
echo "rpcthreads=16" >> ~/.mktcoin/mktcoin.conf
chmod 0600 ~/.mktcoin/mktcoin.conf
mktcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MLM\"}"

home
      "p2shtype" : 115,
      "smartaddress" : "mdpHckCBSohThsd41mDQJJnjD7yMyHWrie",
      "coin" : "MLM",
      "KMDvalue" : 0,
      "pubtype" : 110,
      "rpc" : "127.0.0.1:9276",
      "status" : "active",
      "balance" : 0,
      "txfee" : 10000,
      "wiftype" : 238,
      "height" : 282756,
      "installed" : true

contabo
      "rpc" : "127.0.0.1:9276",
      "installed" : true,
      "txfee" : 10000,
      "wiftype" : 238,
      "balance" : 0,
      "status" : "active",
      "p2shtype" : 115,
      "pubtype" : 110,
      "smartaddress" : "mJ3996pT3UqStDmHD4UWd4PZT19ToVdUKe",
      "height" : 282756,
      "coin" : "MLM",
      "KMDvalue" : 0


mktcoin-cli sendtoaddress "mJ3996pT3UqStDmHD4UWd4PZT19ToVdUKe" 1
"fee": -0.00004520

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MLM\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MLM\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
MktCoin (MLM)
SWAP completed! 2422942281-1293978842 {"uuid":"f6bfeade598d20160d86d5ceaf88eb785a8daaed82facf0e40dd8c06f874d72b","expiration":1528648623,"tradeid":0,"requestid":2422942281,"quoteid":1293978842,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MLM","srcamount":0.69100301,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"18324871027314065409","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.69110301, 0.08010000, 0.69120301, 0.08011000, 0.77757838, 0, 0, 0.77747838, 0, 0, 0],"result":"success","status":"finished","finishtime":1528633470,"bobdeposit":"1cf88d61aaf56381da64464a9e03863d16eff3df2ccbf4e8e842cdc63038477d","alicepayment":"b5f321ccdb9629afe346ef2e44b950b91517294296a10214e8f2ca929f415f9e","bobpayment":"aac7d0ef81f15cb3804fd3715d2d8e5a40af58b8cb80330edb531af5e4b2fc1c","paymentspent":"85a3c2713e32e4e569adb07a5e44680ebf08d9cbd2e977e97ff6c49eb4374c40","Apaymentspent":"bb236ee46892bf08b6deb40a58feb03e5ad1bb5c996983585346000a9765c650","depositspent":"0882a35e785812b04e0437703ff782b56eaeb6e993b62296e5dd6d0b2914b799","method":"tradestatus","finishtime":1528633470}
bobdeposit https://info.mktcoin.org/tx/1cf88d61aaf56381da64464a9e03863d16eff3df2ccbf4e8e842cdc63038477d
alicepayment https://kmdexplorer.ru/tx/b5f321ccdb9629afe346ef2e44b950b91517294296a10214e8f2ca929f415f9e
bobpayment https://info.mktcoin.org/tx/aac7d0ef81f15cb3804fd3715d2d8e5a40af58b8cb80330edb531af5e4b2fc1c

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MLM\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"mktcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MLM\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"mktcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MLM\",\"rel\":\"LTC\",\"margin\":0.07,\"refbase\":\"mktcoin\",\"refrel\":\"coinmarketcap\"}"
```

## MMX

```
{\"coin\":\"MMX\",\"name\":\"mechanix\",\"etomic\":\"0xe7c33a0e04f2316bb321c4ad2976873d09538b56\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MMX\"}"

home
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "status" : "active",
      "wiftype" : 188,
      "balance" : 0,
      "coin" : "MMX",
      "height" : -1,
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "installed" : false

contabo
      "pubtype" : 0,
      "balance" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "wiftype" : 188,
      "txfee" : 1000,
      "coin" : "MMX",
      "installed" : false,
      "p2shtype" : 85,
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MMX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MMX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MMX\",\"rel\":\"KMD\",\"relvolume\":0.1,\"price\":0.12}"
Mechanix Token (MMX)
SWAP completed! 1059596686-1246595527 {"uuid":"439c8bd220f843efb548e0ed7fcb24d320d110893a47f7174470851ca920ed8d","expiration":1531102223,"tradeid":0,"requestid":1059596686,"quoteid":1246595527,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MMX","bobtomic":"0xe7c33a0e04f2316bb321c4ad2976873d09538b56","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.85719917,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.10009000,"alicetxfee":0.00001000,"aliceid":"14509649407157731329","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.10010000, 1.00002000, 0.10011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531087080,"bobdeposit":"31fa29216a5e9d8d72b6f2a1cdfee912fe2d6b11d5039cac05a14a92a4a971ce","alicepayment":"3373c7cadaa4a75c32d09fbc5156bb7a24e75f478eb181ebf418fb44f50990e1","bobpayment":"0634b581e26ab083ee7cb7214b04ceb22ff05c9c248aff9333c8d292db911b7c","paymentspent":"9691fe10f27fcaf6a42b56a4e4605c406a80f07f0094f7283e416335a543d29e","Apaymentspent":"743ee0fc42a2ee23908eb75a627dc10b1d61f3b3e64b046f57d97839237b31d2","depositspent":"3e9501875dfac7d380318a827c455e473888d886b69e7ee309e76b1f55d8c715","alicedexfee":"33a405922cee2c6a6b7a27e4fc78a7bb544e3420b781b7224ac58c34976268f4","method":"tradestatus","finishtime":1531087080}
bobdeposit https://etherscan.io/tx/0x95baee8fe6210fd36c4c5fdbbc311a102f5cd8f732b41683d1ab6ebd69be9d78
alicepayment https://kmdexplorer.ru/tx/3373c7cadaa4a75c32d09fbc5156bb7a24e75f478eb181ebf418fb44f50990e1
bobpayment https://etherscan.io/tx/0xf5a432431831f4a463f15fc47f3f6aabdc3d593840fc10064649e2eabccf7bf6

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"MMX\",\"fixed\":1}"
```

## MNX

```
https://bitcointalk.org/index.php?topic=1847292.0
https://github.com/minexcoin/minexcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,75);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"MNX\",\"name\":\"Minexcoin\",\"rpcport\":17786,\"pubtype\":75,\"p2shtype\":5,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/minexcoin/minexcoin
cd minexcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/minexcoin*
mkdir ~/.Minexcoin
echo "server=1" >> ~/.Minexcoin/Minexcoin.conf
echo "txindex=1" >> ~/.Minexcoin/Minexcoin.conf
echo "listen=0" >> ~/.Minexcoin/Minexcoin.conf
echo "listenonion=0" >> ~/.Minexcoin/Minexcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.Minexcoin/Minexcoin.conf
echo "rpcuser=bartermnx" >> ~/.Minexcoin/Minexcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.Minexcoin/Minexcoin.conf
chmod 0600 ~/.Minexcoin/Minexcoin.conf
minexcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MNX\"}"

home
      "smartaddress" : "XYzB9wm6bVUo5hk2A5ZFKvGCBTxM48yfgf",
      "installed" : true,
      "txfee" : 10000,
      "balance" : 0,
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:17786",
      "coin" : "MNX",
      "height" : 94033,
      "KMDvalue" : 0,
      "pubtype" : 75,
      "wiftype" : 128,
      "status" : "active"

contabo
      "height" : 94033,
      "balance" : 0.22,
      "pubtype" : 75,
      "txfee" : 10000,
      "p2shtype" : 5,
      "smartaddress" : "XDD2gJPNCAcnG3tFMNpMefs2RM8SsAPZdx",
      "coin" : "MNX",
      "status" : "active",
      "wiftype" : 128,
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:17786",
      "installed" : true

minexcoin-cli sendtoaddress "XDD2gJPNCAcnG3tFMNpMefs2RM8SsAPZdx" 0.1
"fee": -0.00004520

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MNX\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"minexcoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MNX\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"minexcoin\",\"refrel\":\"coinmarketcap\"}"

```

## MONA

```
https://bitcointalk.org/index.php?topic=392436.0
https://github.com/monacoinproject/monacoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,50);  // M
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SCRIPT_ADDRESS2] = std::vector<unsigned char>(1,55);  // P
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,176);

src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 100000
src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 2000000;
DEFAULT_TRANSACTION_MINFEE = 100000;
WALLET_INCREMENTAL_RELAY_FEE = 5000;
src/policy/policy.h
DEFAULT_BLOCK_MIN_TX_FEE = 1000;
DEFAULT_INCREMENTAL_RELAY_FEE = 1000;
DUST_RELAY_TX_FEE = 100000;

{\"coin\":\"MONA\",\"name\":\"monacoin\",\"rpcport\":9402,\"pubtype\":50,\"p2shtype\":5,\"wiftype\":176,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/monacoinproject/monacoin
cd monacoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq --enable-experimental-asm --enable-sse2
make -j4
sudo make install
sudo strip /usr/local/bin/monacoin*
mkdir ~/.monacoin
echo "server=1" >> ~/.monacoin/monacoin.conf
echo "txindex=1" >> ~/.monacoin/monacoin.conf
echo "listen=0" >> ~/.monacoin/monacoin.conf
echo "listenonion=1" >> ~/.monacoin/monacoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.monacoin/monacoin.conf
echo "rpcuser=bartermona" >> ~/.monacoin/monacoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.monacoin/monacoin.conf
echo "rpcworkqueue=64" >> ~/.monacoin/monacoin.conf
echo "rpcthreads=16" >> ~/.monacoin/monacoin.conf
chmod 0600 ~/.monacoin/monacoin.conf
monacoind -daemon

curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MONA\"}"

home
   {
      "smartaddress" : "MVY6YEJtqyttdsFrYbEHCnTXSrWmGgKB2q",
      "coin" : "MONA",
      "estimatedrate" : 20,
      "p2shtype" : 5,
      "wiftype" : 176,
      "pubtype" : 50,
      "status" : "active",
      "rpc" : "127.0.0.1:9402",
      "txfee" : 100000
   },

contabo
   {
      "wiftype" : 176,
      "pubtype" : 50,
      "rpc" : "127.0.0.1:9402",
      "smartaddress" : "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi",
      "coin" : "MONA",
      "p2shtype" : 5,
      "status" : "active",
      "txfee" : 100000
   },

monacoin-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 0.88650789
"fee": -0.00452000,
monacoin-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 1.06380946
"fee": -0.00748000,
monacoin-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 93.9
"fee": -0.00452000,
```

## MOON

```
https://bitcointalk.org/index.php?topic=1733963.0
https://github.com/mooncoincore/wallet


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,3);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,22);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,131);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 100000;

{\"coin\":\"MOON\",\"name\":\"mooncoin\",\"rpcport\":44663,\"pubtype\":3,\"p2shtype\":22,\"wiftype\":131,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/mooncoincore/wallet
cd wallet
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/mooncoin*
mkdir ~/.mooncoin
echo "server=1" >> ~/.mooncoin/mooncoin.conf
echo "txindex=1" >> ~/.mooncoin/mooncoin.conf
echo "listen=0" >> ~/.mooncoin/mooncoin.conf
echo "listenonion=0" >> ~/.mooncoin/mooncoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.mooncoin/mooncoin.conf
echo "rpcuser=bartermoon" >> ~/.mooncoin/mooncoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.mooncoin/mooncoin.conf
addnode=151.228.208.157
addnode=151.80.186.24
addnode=174.195.146.66
addnode=180.250.42.130
addnode=184.14.146.240
addnode=184.151.36.34
addnode=187.154.187.154
addnode=192.64.114.237
addnode=192.99.6.207
addnode=201.247.35.244
addnode=213.161.21.31
addnode=213.254.134.128
addnode=24.138.179.126
addnode=37.120.168.233
addnode=37.211.12.228
addnode=41.137.155.236
addnode=5.45.105.66
addnode=5.9.14.199
addnode=50.124.154.234
addnode=64.25.164.84
addnode=64.25.190.103
addnode=64.30.93.168
addnode=68.145.15.92
addnode=70.114.29.30
addnode=73.113.135.99
addnode=73.61.204.73
addnode=74.222.14.54
addnode=76.169.57.92
addnode=77.204.46.19
addnode=84.208.160.27
addnode=91.224.77.44
addnode=93.37.178.195
addnode=94.55.241.112
chmod 0600 ~/.mooncoin/mooncoin.conf
mooncoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MOON\"}"

home
      "status" : "active",
      "estimatedrate" : 20,
      "txfee" : 100000,
      "p2shtype" : 22,
      "smartaddress" : "2aekG8JMUW7iCVhnPsaJQtfYs9QRsSDcAE",
      "wiftype" : 131,
      "rpc" : "127.0.0.1:44663",
      "coin" : "MOON",
      "pubtype" : 3

contabo
      "height" : 1178610,
      "smartaddress" : "2EsbnUvd5BFhNqr1bAqQjeGP72aXeCGw3r",
      "pubtype" : 3,
      "balance" : 0,
      "installed" : true,
      "p2shtype" : 22,
      "wiftype" : 131,
      "coin" : "MOON",
      "txfee" : 100000,
      "rpc" : "127.0.0.1:44663",
      "status" : "active",
      "KMDvalue" : 0

mooncoin-cli sendtoaddress "2EsbnUvd5BFhNqr1bAqQjeGP72aXeCGw3r" 9988.99909999
mooncoin-cli sendtoaddress "2EsbnUvd5BFhNqr1bAqQjeGP72aXeCGw3r" 115.09690001
"fee" : -0.10000000
```

## MTL

```
{\"coin\":\"MTL\",\"name\":\"metal\",\"etomic\":\"0xF433089366899D83a9f26A773D59ec7eCF30355e\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MTL\"}"

home
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "balance" : 0,
      "installed" : false,
      "status" : "active",
      "height" : -1,
      "wiftype" : 188,
      "pubtype" : 0,
      "coin" : "MTL"

contabo
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "installed" : false,
      "p2shtype" : 85,
      "status" : "active",
      "height" : -1,
      "balance" : 39.6,
      "coin" : "MTL",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MTL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MTL\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MTL\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Metal (MTL)
SWAP completed! 4099900616-2509948373 {"uuid":"c750ecdf01ac605d15ea751774f91a7922b53f15a54a27ce146435db30cf812c","expiration":1529353352,"tradeid":0,"requestid":4099900616,"quoteid":2509948373,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MTL","bobtomic":"0xF433089366899D83a9f26A773D59ec7eCF30355e","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67105061,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"7837338070286336001","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1529338273,"bobdeposit":"9fe902512a220ab71196e6a0aec1c40da3f49d16cbd4c3271f97774d33321066","alicepayment":"6835f22b6115c50e135784d09c6c76429b11640157143e41eba0af25b7e79891","bobpayment":"c8edf5745078a312d274fdfbfbabc504888273ab06032875f4d21688e40fd6ec","paymentspent":"eda45401f2114830ae3d1e3816438c7db6c70f0c3c502945586e87108d4d5518","Apaymentspent":"840619fcd90a724b55b1db2434b62bd7c49781e565107414924b715daa008702","depositspent":"2ec3b71237ea3305927b303b8f2fbf88c7d81ab8238ebc57585b731ad82113d9","method":"tradestatus","finishtime":1529338273}
bobdeposit https://etherscan.io/tx/0xc1956da4f237096b297318f1c999a241d2999ce244bd55452c54a5d5b4dd6ed6
alicepayment https://kmdexplorer.ru/tx/6835f22b6115c50e135784d09c6c76429b11640157143e41eba0af25b7e79891
bobpayment https://etherscan.io/tx/0x5df70f43698aa93ea16af7c0a45e1faf70023d8b5ddc783d38a176b2ea1d44c5

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MTL\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"metal\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MTL\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"metal\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MTL\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"metal\",\"refrel\":\"coinmarketcap\"}"
```

## MUE

```
https://bitcointalk.org/index.php?topic=778322.0
https://github.com/muecoin/MUECore


src/chainparams.cpp
// MonetaryUnit addresses start with '7'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,16);
// MonetaryUnit script addresses start with 'X'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,76);
// MonetaryUnit private keys start with 's' or 't'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,126);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_TRANSACTION_MINFEE = 10000; // was 1000
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 10000;

{\"confpath\":\"${HOME#}/.muecore/mue.conf\",\"coin\":\"MUE\",\"name\":\"muecore\",\"rpcport\":29683,\"pubtype\":16,\"p2shtype\":76,\"wiftype\":126,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/muecoin/MUECore
cd MUECore
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/mue*
mkdir ~/.muecore
echo "server=1" >> ~/.muecore/mue.conf
echo "litemode=1" >> ~/.muecore/mue.conf
echo "listen=0" >> ~/.muecore/mue.conf
echo "listenonion=1" >> ~/.muecore/mue.conf
echo "#proxy=127.0.0.1:9050" >> ~/.muecore/mue.conf
echo "rpcuser=bartermue" >> ~/.muecore/mue.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.muecore/mue.conf
chmod 0600 ~/.muecore/mue.conf
mued -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MUE\"}"

home
   {
      "smartaddress" : "7p3b4YB6hr96q8WuiKuSiXCn3hkh3AjsPp",
      "pubtype" : 16,
      "status" : "active",
      "estimatedrate" : 20,
      "rpc" : "127.0.0.1:29683",
      "wiftype" : 126,
      "txfee" : 10000,
      "coin" : "MUE",
      "p2shtype" : 76
   },

contabo
   {
      "smartaddress" : "7UGSatoNJXH61Uf8udAZ3GocHavnvKFXrW",
      "rpc" : "127.0.0.1:29683",
      "pubtype" : 16,
      "txfee" : 10000,
      "status" : "active",
      "coin" : "MUE",
      "p2shtype" : 76,
      "wiftype" : 126
   },

mue-cli sendtoaddress "7UGSatoNJXH61Uf8udAZ3GocHavnvKFXrW" 4.97438338
"fee": -0.00013380,
```

## MYB

```
{\"coin\":\"MYB\",\"name\":\"mybit-token\",\"etomic\":\"0x5d60d8d7ef6d37e16ebabc324de3be57f135e0bc\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"MYB\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "height" : -1,
      "p2shtype" : 85,
      "installed" : false,
      "balance" : 0,
      "pubtype" : 0,
      "wiftype" : 188,
      "txfee" : 1000,
      "coin" : "MYB",
      "rpc" : "127.0.0.1:80"

contabo
      "installed" : false,
      "balance" : 1.43439955,
      "p2shtype" : 85,
      "status" : "active",
      "txfee" : 1000,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "pubtype" : 0,
      "coin" : "MYB",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"MYB\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"MYB\",\"rel\":\"KMD\",\"price\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"MYB\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":1.2}"
MyBit Token (MYB)
SWAP completed! 376390437-669416087 {"uuid":"ea5e46dc0d942ae8207f3f7f1c3a3a8a101cb3cb983a7c58a16bbde1d959b497","expiration":1529989258,"tradeid":0,"requestid":376390437,"quoteid":669416087,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"MYB","bobtomic":"0x5d60d8d7ef6d37e16ebabc324de3be57f135e0bc","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.07536922,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"4359291880092401665","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1529974084,"bobdeposit":"e70b1b97f11304cf616eb460885c4a090f904c9cfd53393bc5075989748070eb","alicepayment":"c1351f399eca24b1cf3602ce9edd7a5c64923a073a2e3c055d210ccb3e93bcf8","bobpayment":"351f78d907645a778b3fb891be5d4cd311a354302f81c4ee2082cde538322de4","paymentspent":"d781b52eba9bf38de769c90f49e6099c72003f1416442e3d516a7a6bd3a3fd77","Apaymentspent":"8d59852fae74a7001459eb591640643c6218016257b087d5d48951798c4b0296","depositspent":"92be8c1858ccb0bab28f6ba28345402488b2c9061fe0cb1507cf48701518086a","method":"tradestatus","finishtime":1529974084}
bobdeposit https://etherscan.io/tx/0x35dd5c960745f12ca6bc1d7ab3b1e2c3f1006cdd2a1d272b03b175da85e8f509
alicepayment https://kmdexplorer.ru/tx/c1351f399eca24b1cf3602ce9edd7a5c64923a073a2e3c055d210ccb3e93bcf8
bobpayment https://etherscan.io/tx/0xddb798224dc7e4b7723a51360f9f8a2d4f513a48a6e1189cf7baf21f27d79a2e

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MYB\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"mybit-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MYB\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"mybit-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MYB\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"mybit-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"MYB\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"mybit-token\",\"refrel\":\"coinmarketcap\"}"
```

## NAS

```
{\"coin\":\"NAS\",\"name\":\"nebulas-token\",\"etomic\":\"0x5d65d971895edc438f465c17db6992698a52318d\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"NAS\"}"

home
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0,
      "coin" : "NAS",
      "height" : -1,
      "status" : "active",
      "installed" : false,
      "p2shtype" : 85,
      "wiftype" : 188,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80"

contabo
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false,
      "txfee" : 1000,
      "pubtype" : 0,
      "p2shtype" : 85,
      "height" : -1,
      "coin" : "NAS",
      "wiftype" : 188,
      "balance" : 0,
      "status" : "active",
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"NAS\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"NAS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"NAS\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Nebulas (NAS)
SWAP completed! 2949078224-1146850714 {"uuid":"aa38030304a0659f103b02509fe8bbe57b64180bb4005e0bc84dabd986f1fe8f","expiration":1527400700,"tradeid":0,"requestid":2949078224,"quoteid":1146850714,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"NAS","bobtomic":"0x5d65d971895edc438f465c17db6992698a52318d","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70405234,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1164875205919440897","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70406234, 0.08010000, 0.70407234, 0.08011000, 0.79207888, 0, 0, 0.79206888, 0, 0, 0],"result":"success","status":"finished","finishtime":1527385809,"bobdeposit":"bf0abf04b4dea916adc43e6405792c57fe3481c46df3ef55c378893b30221922","alicepayment":"a7d9ee086fd17a8a392e96018da13f93e84abf3195193ac3c72db0db1f36c797","bobpayment":"9b857d102d1c9145417e076374b386ced4b55202129fcb148a4b04be79017a51","paymentspent":"f040a6054c864ce2d24bd82b47a0281b1f98fea7037abed62406bafa0477434e","Apaymentspent":"5517fbc216328501da1e52d269e57b51b81438999bd74e7e5fcafd4a565f2048","depositspent":"ff1832309c135438a087f6ed358274892e960f34aafbc814b9b4d359907cf00e","method":"tradestatus","finishtime":1527385809}
bobdeposit https://etherscan.io/tx/0x78a54dbae9da651cff072e94310adccd4578b0903159ac91fb3484592f63e5d3
alicepayment https://kmdexplorer.ru/tx/a7d9ee086fd17a8a392e96018da13f93e84abf3195193ac3c72db0db1f36c797
bobpayment https://etherscan.io/tx/0x82984065eed4dc0277560f06f1164ac89891e45d2e907715e86d62f8b138b36e

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NAS\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"nebulas-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NAS\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"nebulas-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NAS\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"nebulas-token\",\"refrel\":\"coinmarketcap\"}"
```

## NAV

```
https://bitcointalk.org/index.php?topic=679791.0
https://github.com/NAVCoin/navcoin-core


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,53);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,85);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,150);

src/wallet/wallet.h
DEFAULT_TRANSACTION_FEE = 10000;
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_TRANSACTION_MINFEE = 10000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 1000;

{\"coin\":\"NAV\",\"name\":\"navcoin\",\"isPoS\":1,\"confpath\":\"${HOME#}/.navcoin4/navcoin.conf\",\"rpcport\":44444,\"pubtype\":53,\"p2shtype\":85,\"wiftype\":150,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/NAVCoin/navcoin-core
cd navcoin-core
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/navcoin*
mkdir ~/.navcoin4
echo "server=1" >> ~/.navcoin4/navcoin.conf
echo "txindex=1" >> ~/.navcoin4/navcoin.conf
echo "listen=0" >> ~/.navcoin4/navcoin.conf
echo "listenonion=0" >> ~/.navcoin4/navcoin.conf
echo "rpcuser=barternav" >> ~/.navcoin4/navcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.navcoin4/navcoin.conf
echo "rpcworkqueue=64" >> ~/.navcoin4/navcoin.conf
echo "rpcthreads=16" >> ~/.navcoin4/navcoin.conf
echo "staking=0" >> ~/.navcoin4/navcoin.conf
chmod 0600 ~/.navcoin4/navcoin.conf
navcoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"NAV\"}"

home
   {
      "smartaddress" : "NhYuVZCkyXHX6Ag7crEEfAGtLNHbME42JB",
      "status" : "active",
      "wiftype" : 150,
      "txfee" : 10000,
      "pubtype" : 53,
      "coin" : "NAV",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:44444"
   },

contabo
      "wiftype" : 150,
      "p2shtype" : 85,
      "balance" : 24.2988,
      "pubtype" : 53,
      "smartaddress" : "NMmm1uq2aCRWGWpLp9VLyusiaFThECzBL6",
      "type" : "PoS",
      "coin" : "NAV",
      "txfee" : 10000,
      "height" : 1677957,
      "KMDvalue" : 8.29430503,
      "status" : "active",
      "installed" : true,
      "rpc" : "127.0.0.1:44444"

navcoin-cli sendtoaddress "NMmm1uq2aCRWGWpLp9VLyusiaFThECzBL6" 0.97843010
"fee": -0.00010000,
```

## NMC

```
https://bitcointalk.org/?topic=6017.0
https://github.com/namecoin/namecoin-core


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,52);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,13);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,180);

src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = COIN / 1000; => 100000
src/amount.h
COIN = 100000000;
src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_DISCARD_FEE = 10000;
DEFAULT_TRANSACTION_MINFEE = 1000;
WALLET_INCREMENTAL_RELAY_FEE = 5000;

{\"coin\":\"NMC\",\"name\":\"namecoin\",\"rpcport\":8336,\"pubtype\":52,\"p2shtype\":13,\"wiftype\":180,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/namecoin/namecoin-core -b 0.15
cd namecoin-core
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --enable-experimental-asm
make -j4
sudo make install
mkdir ~/.namecoin
echo "server=1" >> ~/.namecoin/namecoin.conf
echo "listen=0" >> ~/.namecoin/namecoin.conf
echo "listenonion=1" >> ~/.namecoin/namecoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.namecoin/namecoin.conf
echo "rpcuser=barternmc" >> ~/.namecoin/namecoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.namecoin/namecoin.conf
echo "rpcworkqueue=64" >> ~/.namecoin/namecoin.conf
echo "rpcthreads=16" >> ~/.namecoin/namecoin.conf
chmod 0600 ~/.namecoin/namecoin.conf
namecoind -daemon

curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"NMC\"}"

home
   {
      "status" : "active",
      "pubtype" : 52,
      "txfee" : 10000,
      "rpc" : "127.0.0.1:8336",
      "smartaddress" : "NJDJWSuUGLpeGjY2bRtvB316hs2ek5B4C2",
      "wiftype" : 180,
      "coin" : "NMC",
      "p2shtype" : 13
   },

contabo
   {
      "status" : "active",
      "coin" : "NMC",
      "txfee" : 100000,
      "smartaddress" : "MxSA2oXjs1xdT5gFnjA2VnbvwkCkZ3svhJ",
      "p2shtype" : 13,
      "pubtype" : 52,
      "wiftype" : 180,
      "rpc" : "127.0.0.1:8336"
   },

namecoin-cli sendtoaddress "MxSA2oXjs1xdT5gFnjA2VnbvwkCkZ3svhJ" 0.99600000
"fee": -0.00022678,
```

## NMR

```
{\"coin\":\"NMR\",\"name\":\"numeraire\",\"etomic\":\"0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"NMR\"}"

home
      "coin" : "NMR",
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "height" : -1,
      "installed" : false,
      "wiftype" : 188,
      "pubtype" : 0,
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0

contabo
      "height" : -1,
      "installed" : false,
      "balance" : 3.30996027,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "coin" : "NMR",
      "p2shtype" : 85,
      "txfee" : 1000,
      "pubtype" : 0,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"NMR\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"NMR\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"NMR\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Numeraire (NMR)
SWAP completed! 1835212946-2821991529 {"uuid":"bd204201178e4dc63facb2b860afd380c604f9bad3d14be71302a54b3556b8a2","expiration":1528573086,"tradeid":0,"requestid":1835212946,"quoteid":2821991529,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"NMR","bobtomic":"0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77176458,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12118214949798084609","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77177458, 0.08010000, 0.77178458, 0.08011000, 0.86825515, 0, 0, 0.86824515, 0, 0, 0],"result":"success","status":"finished","finishtime":1528557878,"bobdeposit":"052a2fdbd814f7dd0ce972ad000f582071455d09b2007398894bf2abf6e50216","alicepayment":"a63fee7ed6445eca8d5d12fe3c5d2447e0a1ef812ff979acb3035d625607a026","bobpayment":"e31921f2fdf5e6097b67651a5cdfed689b3971574e3f826da2394b6d88c6177e","paymentspent":"5a20dab122bf26cba0465b9df39b81e2d560b2a022e3d2a904d1d7fe86a6e4d7","Apaymentspent":"459366d0815dd5e651574fc982f4bb8615533edd973496da4eeb233cbc62025f","depositspent":"45f83ab0c5f7672c3df0c3b787037dea695c1ea182d257607bd540791c942649","method":"tradestatus","finishtime":1528557878}
bobdeposit https://etherscan.io/tx/0x428e4fc3a9df1cab64d383117fb643227b6f133b3491ba5ab9e04240b8ea45f0
alicepayment https://kmdexplorer.ru/tx/a63fee7ed6445eca8d5d12fe3c5d2447e0a1ef812ff979acb3035d625607a026
bobpayment https://etherscan.io/tx/0x54dbeee7c6a7576bf229bb6c2ef4a8af2427f11f6d575479dd8d810e7d650dbf

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NMR\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"numeraire\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NMR\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"numeraire\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NMR\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"numeraire\",\"refrel\":\"coinmarketcap\"}"
```

## NOAH

```
{\"coin\":\"NOAH\",\"name\":\"noah-coin\",\"etomic\":\"0x58a4884182d9e835597f405e5f258290e46ae7c2\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"NOAH\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "coin" : "NOAH",
      "status" : "active",
      "wiftype" : 188,
      "pubtype" : 0,
      "balance" : 0,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "installed" : false

hetzner
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "status" : "active",
      "pubtype" : 0,
      "coin" : "NOAH",
      "txfee" : 1000,
      "height" : -1,
      "balance" : 3858.52783172,
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "wiftype" : 188,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"NOAH\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"NOAH\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Noah Coin (NOAH)
SWAP completed! 2909464325-3863172186 {"uuid":"f2b96e3ff993dbdfd448e49395b1625589d70ac966b17e9128eb9a580a13c423","expiration":1531490710,"tradeid":0,"requestid":2909464325,"quoteid":3863172186,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"NOAH","bobtomic":"0x58a4884182d9e835597f405e5f258290e46ae7c2","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.75432255,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"5516087953209098241","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531475562,"bobdeposit":"e197301ea42c9aa6e703d7c897fc1aa4036df9e8629687b3834be39f817a10d0","alicepayment":"c403dc7d6d7ab8c21ba0a242d0f936344986db4f4919eedcfb6febf6548f0139","bobpayment":"9a992d47f01f87757ca9d442c161fb83476b4e5e713126f0720fe0cb2fbff73e","paymentspent":"259d2c9413c920e615b9c6c88a09c94d5e73b4c3d43fb08468b6b53262eb7323","Apaymentspent":"f5a3b84eb84d9bc38f30d739a31f9274c85d2441cc4607973e24940800433679","depositspent":"d22d5f55cfa7b25ce6cc5f07494eb9512f5d9b44311378b0764503fa155d8fcc","alicedexfee":"5d822f91b82bdec8ecd38cf5556e1e5faac5dcba92970c75d6c56dca7fcc7343","method":"tradestatus","finishtime":1531475562}
bobdeposit https://etherscan.io/tx/0xd1e6750f565368e03ba6f3db2e3de8d0ddd9c43b2f5c202b2dd6ee3f7a4a56d6
alicepayment https://kmdexplorer.ru/tx/c403dc7d6d7ab8c21ba0a242d0f936344986db4f4919eedcfb6febf6548f0139
bobpayment https://etherscan.io/tx/0x82aa373c6574f4ca0c3fe75327f0c5aabc9fb0fc1d5b838f0f2369264d409935

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NOAH\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"noah-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NOAH\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"noah-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NOAH\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"noah-coin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NOAH\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"noah-coin\",\"refrel\":\"coinmarketcap\"}"
```

## NULS

```
{\"coin\":\"NULS\",\"name\":\"nuls\",\"etomic\":\"0xb91318f35bdb262e9423bc7c7c2a3a93dd93c92c\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"NULS\"}"

home
      "pubtype" : 0,
      "status" : "active",
      "installed" : false,
      "coin" : "NULS",
      "wiftype" : 188,
      "balance" : 0,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000

contabo
      "height" : -1,
      "balance" : 3.995,
      "status" : "active",
      "p2shtype" : 85,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "wiftype" : 188,
      "pubtype" : 0,
      "coin" : "NULS"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"NULS\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"NULS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"NULS\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Nuls (NULS)
SWAP completed! 269376209-3812848753 {"uuid":"482878f89c90b2ae6e0944646f09be3452e918efea105a0c2404b90d9a6b4377","expiration":1531205870,"tradeid":0,"requestid":269376209,"quoteid":3812848753,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"NULS","bobtomic":"0xb91318f35bdb262e9423bc7c7c2a3a93dd93c92c","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.71404643,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"9536991988086538241","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531190689,"bobdeposit":"b3f7c411c811f4d210cd917ddab78e570d60d1da2ac1fba45aa4a658efda9fb9","alicepayment":"435e1df21b94a8a9d3fc4b52859ef9630fa8aaf4ef8063859644f9ab0588452f","bobpayment":"8324ea6e999b97b5578a0b494488af40227cec8e27cd535128398c7e75f50900","paymentspent":"0f477ee86ddda66956feb285e126092c7c0a096946259bf0e068a8a62f4521d3","Apaymentspent":"d9541339643a066c8126f2c7c5d0145bdc54b6fd35448f4426bbf069f18c8f77","depositspent":"89beb5f679dcf4f02d131b07711c34874cac2ca1709a7ddbd416699b6624d8cf","alicedexfee":"9088364a559241ac90c705d16b0baa87ca3fe5b500619bfec56b5af6312ff195","method":"tradestatus","finishtime":1531190689}
bobdeposit https://etherscan.io/tx/0x4cc508c56f05feffdfe2748977e97dc4f41ffa822adc6457de32f6c13c27b076
alicepayment https://kmdexplorer.ru/tx/435e1df21b94a8a9d3fc4b52859ef9630fa8aaf4ef8063859644f9ab0588452f
bobpayment https://etherscan.io/tx/0xd47655b493b19e171d078c6c0f058bc8228cafbc2b9144535ffd8307d0661ab1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NULS\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"nuls\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NULS\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"nuls\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NULS\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"nuls\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"NULS\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"nuls\",\"refrel\":\"coinmarketcap\"}"
```

## OCC

```
{\"coin\":\"OCC\",\"name\":\"originalcryptocoin\",\"etomic\":\"0x0235fe624e044a05eed7a43e16e3083bc8a4287a\",\"rpcport\":80}

home
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "height" : -1,
      "p2shtype" : 85,
      "wiftype" : 188,
      "balance" : 0,
      "coin" : "OCC",
      "pubtype" : 0,
      "installed" : false,
      "txfee" : 1000

contabo
      "installed" : false,
      "txfee" : 1000,
      "height" : -1,
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "OCC",
      "pubtype" : 0,
      "balance" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "status" : "active"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"OCC\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"OCC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"OCC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Original Crypto Coin (OCC)
SWAP completed! 216845614-3483670229 {"expiration":1522900764,"tradeid":0,"requestid":216845614,"quoteid":3483670229,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"OCC","bobtomic":"0x0235fe624e044a05eed7a43e16e3083bc8a4287a","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77624392,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"13009001761955971076","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77625392, 0.08010000, 0.77626392, 0.08011000, 0.87329441, 0, 0, 0.87328441, 0, 0, 0],"result":"success","status":"finished","finishtime":1522885631,"bobdeposit":"2cab956ae271563a340f1f13084695e817cf9ab262bd24534dc14d6cacec3831","alicepayment":"069f1a322ae639f787796c20f0d4837908c0f3a02efbde3e06e5b86de0399342","bobpayment":"fe8a81af1441531e13047cadd3705d26d26d9d3970b6b793245b68dd1e048d44","paymentspent":"ba0497c9538796b6c7774e67bfaf8fa4bc7dc72870a69a3cc9b9775277be81a2","Apaymentspent":"ad0c58d6f8bd15b8f3fc52fa4b74b70b47684e8a2e805909665a0d0ab9b84dc1","depositspent":"c153cbb2716ea2caa38360d191889b153fa33da1be7f11be9fc607f81a1dc7d1","method":"tradestatus","finishtime":1522885631}
bobdeposit https://etherscan.io/tx/0x5b77cdb018821d31649177e50ab533893e871720d8b0046104ba1f599c10dc18
alicepayment https://kmd.explorer.supernet.org/tx/069f1a322ae639f787796c20f0d4837908c0f3a02efbde3e06e5b86de0399342
bobpayment https://etherscan.io/tx/0x603207c7f4cdc3e6df9b0eada7804ccf003028d51b3ad68c33aaa035173faf02



```

## OCT

```
{\"coin\":\"OCT\",\"name\":\"octus\",\"etomic\":\"0x7e9d365C0C97Fe5FcAdcc1B513Af974b768C5867\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"OCT\"}"

home
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "coin" : "OCT",
      "status" : "active",
      "p2shtype" : 85,
      "wiftype" : 188,
      "pubtype" : 0,
      "installed" : false,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "height" : -1

contabo
      "coin" : "OCT",
      "installed" : false,
      "p2shtype" : 85,
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "wiftype" : 188,
      "pubtype" : 0,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"OCT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"OCT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"OCT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"OCT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Octus (OCT)
SWAP completed! 1984359727-3491584519 {"uuid":"6604d8a9a7acb7bcdb84be62e8def87f71e753aa8d9c0c3da5493a28fe513eb2","expiration":1526319936,"tradeid":0,"requestid":1984359727,"quoteid":3491584519,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"OCT","bobtomic":"0x7e9d365C0C97Fe5FcAdcc1B513Af974b768C5867","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70036548,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"3968908837098291201","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70037548, 0.08010000, 0.70038548, 0.08011000, 0.78793116, 0, 0, 0.78792116, 0, 0, 0],"result":"success","status":"finished","finishtime":1526304787,"bobdeposit":"8e9f36e13f90448a90eb9006993ab259bd11e4daf737f8d042a5cdc2ec2e414e","alicepayment":"802cd1540345f4215e5e42d154c2db99b389e7175173d1631290c471f7b883b2","bobpayment":"6ccce0df90f707e8c177ce7e4c3455b76aa3b1b9a54fdf6407d90e237783f0e9","paymentspent":"c881a121e17f8cc770296c356443150a3a2f4fe4588cef0b9159f6efdb07fd97","Apaymentspent":"2111867c2122abb107d7ed238b73ad5d3a1b9f973fd4e68cf0268e61b6236aaf","depositspent":"c070b2622424e203d163824e1b93067eaf5542b06dbd0947dcd77bc90d4b0018","method":"tradestatus","finishtime":1526304787}
bobdeposit https://etherscan.io/tx/0x928f94e06f3354ec7e4658e7129e8ead6ba49782cd5148161cfcaeb675ae01be
alicepayment https://kmdexplorer.ru/tx/802cd1540345f4215e5e42d154c2db99b389e7175173d1631290c471f7b883b2
bobpayment https://etherscan.io/tx/0x07734841296588a48baf79a320633e926f4a5f9b2a0d8544e5caca86917d2e76
```

## OMG

```
{\"coin\":\"OMG\",\"name\":\"omisego\",\"etomic\":\"0xd26114cd6EE289AccF82350c8d8487fedB8A0C07\",\"rpcport\":80}

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "status" : "active",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "installed" : false,
      "height" : -1,
      "pubtype" : 0,
      "balance" : 0,
      "coin" : "OMG"

contabo
      "pubtype" : 0,
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "p2shtype" : 85,
      "installed" : false,
      "wiftype" : 188,
      "height" : -1,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "coin" : "OMG"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"OMG\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":0.94}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"OMG\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"OMG\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
OmiseGO (OMG)
SWAP completed! 4003322912-3821727092 {"warning":"swaps in critical section, dont exit now","critical":1522463115,"endcritical":1522463024,"expiration":1522478419,"tradeid":0,"requestid":4003322912,"quoteid":3821727092,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"OMG","bobtomic":"0xd26114cd6EE289AccF82350c8d8487fedB8A0C07","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.68835007,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"4170398723212443649","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.68836007, 0.08010000, 0.68837007, 0.08011000, 0.77441382, 0, 0, 0.77440382, 0, 0, 0],"result":"success","status":"finished","finishtime":1522463117,"bobdeposit":"06718642fe94b31d9922899230a11cbc3565a03343403e1faddea6c5509e4fb5","alicepayment":"0e6663b8863c674fc52d834661922663941f143d5e7270759e2ead85280630e6","bobpayment":"8c882eb2e89e3468f74009074ec0ba2289abeba14ab45f61385aefed40e2d64e","paymentspent":"974047cbf49f5124132de9c12a02e1c395c9ef05512eb8e19a811e74df6c9892","Apaymentspent":"33c0f20c026b73f3af80a15713593c4a818aa178ec35c80e83828416ff8dd097","depositspent":"07e89535c1d8cc60f86c5eb44203b4e6c69278de4c84a6b2e0cbb908c18e364c","method":"tradestatus","finishtime":1522463117}
bobdeposit https://etherscan.io/tx/0xbd89d723ece55f1ff74706f41205ccd39bed1c2178dd3ed6e5953ff3d7b0ece1
alicepayment https://kmd.explorer.supernet.org/tx/0e6663b8863c674fc52d834661922663941f143d5e7270759e2ead85280630e6
bobpayment https://etherscan.io/tx/0xee4fb8b31811eaaf50c510dbceaadd0df8a3d2b8c181e464fc9c48651ce3f898
```

## ONNI

```
{\"coin\":\"ONNI\",\"name\":\"misericordae\",\"etomic\":\"0xbd9c6028e1132a6b52f1ca15c0933a2fd342e21f\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ONNI\"}"

home
      "height" : -1,
      "wiftype" : 188,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "balance" : 16.5,
      "pubtype" : 0,
      "coin" : "ONNI",
      "p2shtype" : 85,
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "p2shtype" : 85,
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false,
      "status" : "active",
      "wiftype" : 188,
      "balance" : 0,
      "txfee" : 1000,
      "height" : -1,
      "coin" : "ONNI",
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ONNI\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1,\"broadcast\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ONNI\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ONNI\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Misericordae (ONNI)
SWAP completed! 3025793178-2797148964 {"uuid":"270072f7645d32f5c215f47787b76cafd7656544aaea22ace2ef2d08b81f8c34","expiration":1529021508,"tradeid":0,"requestid":3025793178,"quoteid":2797148964,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ONNI","bobtomic":"0xbd9c6028e1132a6b52f1ca15c0933a2fd342e21f","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67333297,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"8912536178251333633","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67334297, 0.08010000, 0.67335297, 0.08011000, 0.75751959, 0, 0, 0.75750959, 0, 0, 0],"result":"success","status":"finished","finishtime":1529006415,"bobdeposit":"9d80b3d0f0af5cb8c4734137fb28c45564d718f65bbccf8ec88609706c9437c7","alicepayment":"2e2312db792156cbeb9fc28612bd684be803524fb0a7fbbd5371d2f987c695f6","bobpayment":"e955e9045c2e91e6566e15d4349cc61d0321670f1233a866a07abd3c07a0ec72","paymentspent":"b7a2454ee6c52f38849b6b8ba8b9a3cc2d5001ca3fd54c4a4823a0bfcec63b73","Apaymentspent":"05f525ce55ff7fcbd2ec8650ea6bbc703e0394e951a6fd94737b05ed70b05412","depositspent":"64fdde7ddc020521749b096cb89f0e5396c724e78ca95b671ec4c2aeef70f360","method":"tradestatus","finishtime":1529006415}
bobdeposit https://etherscan.io/tx/0xacaf2255ac3ceb0acc20e6c30a55ce94b95b76450ed20187cfd753fedb6e0550
alicepayment https://kmdexplorer.ru/tx/2e2312db792156cbeb9fc28612bd684be803524fb0a7fbbd5371d2f987c695f6
bobpayment https://etherscan.io/tx/0xcf0ec2b6f032713ccd83a1d3e99f9b60d89c83aa1e01915a6a303dd1b83799d1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"ONNI\",\"fixed\":1}"
```

## PAC

```
https://bitcointalk.org/index.php?topic=3047868
https://github.com/PACCommunity/PAC


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,55);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,10);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

{\"coin\":\"PAC\",\"name\":\"paccoin\",\"confpath\":\"${HOME#}/.paccoincore/paccoin.conf\",\"rpcport\":7111,\"pubtype\":55,\"p2shtype\":10,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/PACCommunity/PAC
cd PAC
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/paccoin*
mkdir ~/.paccoincore
echo "server=1" >> ~/.paccoincore/paccoin.conf
echo "txindex=1" >> ~/.paccoincore/paccoin.conf
echo "listen=0" >> ~/.paccoincore/paccoin.conf
echo "listenonion=0" >> ~/.paccoincore/paccoin.conf
echo "rpcuser=barterpac" >> ~/.paccoincore/paccoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.paccoincore/paccoin.conf
echo "rpcworkqueue=64" >> ~/.paccoincore/paccoin.conf
echo "rpcthreads=16" >> ~/.paccoincore/paccoin.conf
echo "litemode=1" >> ~/.paccoincore/paccoin.conf
chmod 0600 ~/.paccoincore/paccoin.conf
paccoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PAC\"}"

home
      "rpc" : "127.0.0.1:7111",
      "txfee" : 10000,
      "coin" : "PAC",
      "status" : "active",
      "height" : 87438,
      "installed" : true,
      "pubtype" : 55,
      "smartaddress" : "PWE7TmoLPtDGj2xHfgtsdQpTbNoUqvjxoq",
      "p2shtype" : 10,
      "KMDvalue" : 0,
      "balance" : 0,
      "wiftype" : 204

contabo
      "height" : 87438,
      "installed" : true,
      "smartaddress" : "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k",
      "p2shtype" : 10,
      "txfee" : 10000,
      "wiftype" : 204,
      "coin" : "PAC",
      "rpc" : "127.0.0.1:7111",
      "KMDvalue" : 0,
      "balance" : 0,
      "pubtype" : 55,
      "status" : "active"


paccoin-cli sendtoaddress "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k" 1
"fee": -0.00000226

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"PAC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"PAC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
PACcoin (PAC)
SWAP completed! 209712948-1410506691 {"uuid":"d903abb0883627c34b9da9b33af2a2c05586bed90eb9251acd5172d4a6125de7","expiration":1530272467,"tradeid":0,"requestid":209712948,"quoteid":1410506691,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"PAC","srcamount":0.72078907,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"11957251688974974977","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.72088907, 0.08010000, 0.72098907, 0.08011000, 0.81108770, 0, 0, 0.81098770, 0, 0, 0],"result":"success","status":"finished","finishtime":1530257450,"bobdeposit":"793b15f0b9a63476c3df9d7da2b474fb24b540c6e4998206daa063e381b50444","alicepayment":"b3f2250a28a5d397af21f2fad5d264ba8046fbaa7278fe93cef1dfb11386a0b0","bobpayment":"1fe9d4bbec5e79aecc730a6dad948fa19efafd4a26a3234851bbf5d0ec3ccd32","paymentspent":"f063aa69a8a1246357a5b0f6cddf6927483ec087bfb3e04e2c3337a09edb3d4a","Apaymentspent":"07ba7389841b04590a48e3efa951feb7f31ef6e95118d682b62df0d4317950d4","depositspent":"00f8f5aef506390451b22148dcfe77d04eb063bbbd71c1ea9003064e70589c9f","method":"tradestatus","finishtime":1530257450}
bobdeposit http://usa.pacblockexplorer.com:3002/tx/793b15f0b9a63476c3df9d7da2b474fb24b540c6e4998206daa063e381b50444
alicepayment https://kmdexplorer.ru/tx/b3f2250a28a5d397af21f2fad5d264ba8046fbaa7278fe93cef1dfb11386a0b0
bobpayment http://usa.pacblockexplorer.com:3002/tx/1fe9d4bbec5e79aecc730a6dad948fa19efafd4a26a3234851bbf5d0ec3ccd32

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"PAC\",\"rel\":\"BCH\",\"margin\":0.11,\"refbase\":\"paccoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"PAC\",\"rel\":\"BTC\",\"margin\":0.11,\"refbase\":\"paccoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"PAC\",\"rel\":\"KMD\",\"margin\":0.11,\"refbase\":\"paccoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"PAC\",\"rel\":\"LTC\",\"margin\":0.11,\"refbase\":\"paccoin\",\"refrel\":\"coinmarketcap\"}"
```

## PAT

```
{\"coin\":\"PAT\",\"name\":\"pat\",\"etomic\":\"0xBB1fA4FdEB3459733bF67EbC6f893003fA976a82\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PAT\"}"

home
      "wiftype" : 188,
      "status" : "active",
      "height" : -1,
      "coin" : "PAT",
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "p2shtype" : 85,
      "balance" : 0

contabo
      "coin" : "PAT",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "status" : "active",
      "balance" : 5,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "txfee" : 1000,
      "pubtype" : 0,
      "height" : -1,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"PAT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"PAT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"PAT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Pangea Arbitration Token (PAT)
SWAP completed! 3089022340-3245749698 {"uuid":"67acd8d0d4d1dd8c14aacf2b66a5c103adff2d53449047963af37a361ce0f9a3","expiration":1528830544,"tradeid":0,"requestid":3089022340,"quoteid":3245749698,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"PAT","bobtomic":"0xbb1fa4fdeb3459733bf67ebc6f893003fa976a82","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67446483,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"17561065591886315521","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67447483, 0.08010000, 0.67448483, 0.08011000, 0.75879293, 0, 0, 0.75878293, 0, 0, 0],"result":"success","status":"finished","finishtime":1528815360,"bobdeposit":"836693834cfded8215b1e2e134cd25a148b5a2f6c7e71ce1e28b23d8ddaae2fd","alicepayment":"ec0db68ca332b1080c4a1e3be7c0ca1607aeac578eedc0c808099c928f56e90c","bobpayment":"89a1a72dceca5dea372a05bd740f5c486d4e9ebff0faedb793a5d968c1858765","paymentspent":"45c89931da62f1af000e270e7be4ba1d3b3b08cfe6bc6ab1482b58ac5b91bf5f","Apaymentspent":"fb24bacdcdac032918127efcb1473a4b8e308aa5c591a1e439b306cc0dd1eba0","depositspent":"9f930cc69f532d16c1897467958ff0ae40cd225b1cee8380f65873b4cfecb6cf","method":"tradestatus","finishtime":1528815360}
bobdeposit https://etherscan.io/tx/0x69106dfa1626fb30c8e7737f5186e5f94b7b912fd83886da831d9d1f82e60239
alicepayment https://kmdexplorer.ru/tx/ec0db68ca332b1080c4a1e3be7c0ca1607aeac578eedc0c808099c928f56e90c
bobpayment https://etherscan.io/tx/0x426b8626314d5fc1a574701f4845e21230149045fc0c94426dbd1610357d68c0
```

## PAY

```
{\"coin\":\"PAY\",\"name\":\"tenx\",\"etomic\":\"0xB97048628DB6B661D4C2aA833e95Dbe1A905B280\",\"rpcport\":80}

home
      "pubtype" : 0,
      "txfee" : 1000,
      "balance" : 0,
      "p2shtype" : 85,
      "height" : -1,
      "installed" : false,
      "coin" : "PAY",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80"

contabo
      "pubtype" : 0,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "wiftype" : 188,
      "coin" : "PAY",
      "installed" : false,
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"PAY\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"PAY\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"PAY\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
TenX (PAY)
SWAP completed! 1911068323-2689699776 {"expiration":1523083590,"tradeid":0,"requestid":1911068323,"quoteid":2689699776,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"PAY","bobtomic":"0xB97048628DB6B661D4C2aA833e95Dbe1A905B280","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76441281,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"13141206478482309121","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76442281, 0.08010000, 0.76443281, 0.08011000, 0.85998441, 0, 0, 0.85997441, 0, 0, 0],"result":"success","status":"finished","finishtime":1523068286,"bobdeposit":"d3222176dcc4cc692a083557b51b0c1592849a02d9b3d6d959ac7e3843734bc0","alicepayment":"541a8f06ce1bcad7d39d53d9094610ab521b3a377aa5c82b6664de3618686eca","bobpayment":"756fb5ab5edcf8db09ff5751abcbb3d821a5ad431e874cffc556e53e940f3ded","paymentspent":"ba484bac21a7f47940a0195d69579719c0c4a83778f0a4df0eb2ef91727a3e8a","Apaymentspent":"a54c2a3ff828f9ed49bf6dd0f13920bfb1498ed483d712cc52fc7083ebd49008","depositspent":"e39ca99a606e9c2299131d571a290a413a002e454cd218ee611af58a8a495d6f","method":"tradestatus","finishtime":1523068286}
bobdeposit https://etherscan.io/tx/0x1434aee4eb4d4539d6327da4c26029804685a6ae82ac562b0c40f276e59428d8
alicepayment https://kmd.explorer.supernet.org/tx/541a8f06ce1bcad7d39d53d9094610ab521b3a377aa5c82b6664de3618686eca
bobpayment https://etherscan.io/tx/0xbf2e6bc43c4b4c688c3c9ba0dafe793fa29da2c74962aca8c39d2dd691229ba4
```

## PCL

```
{\"coin\":\"PCL\",\"name\":\"peculium\",\"etomic\":\"0x3618516f45cd3c913f81f9987af41077932bc40d\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PCL\"}"

home
      "pubtype" : 0,
      "wiftype" : 188,
      "height" : -1,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "coin" : "PCL",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "txfee" : 1000,
      "installed" : false,
      "status" : "active"

contabo
      "installed" : false,
      "wiftype" : 188,
      "p2shtype" : 85,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "txfee" : 1000,
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "pubtype" : 0,
      "coin" : "PCL"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"PCL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"PCL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"PCL\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"PCL\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Peculium (PCL)
SWAP completed! 1849934792-847692029 {"uuid":"b76cbead9e45069cb02509fdde135d341f9b2ad7eda2b05cb70b8664cd38b066","expiration":1525758483,"tradeid":0,"requestid":1849934792,"quoteid":847692029,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"PCL","bobtomic":"0x3618516f45cd3c913f81f9987af41077932bc40d","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.71534955,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"10794274412562874369","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.71535955, 0.08010000, 0.71536955, 0.08011000, 0.80478824, 0, 0, 0.80477824, 0, 0, 0],"result":"success","status":"finished","finishtime":1525743567,"bobdeposit":"3f2d1d75bfa69b26d1b3776a1c1fbd8dacfad2fa82db970b5d60689dbbc24349","alicepayment":"26e4110d665a49b39078b5df523366ac2be2149524c2523dcad12aeaa1188799","bobpayment":"29452478cf7d36a06e83b34cc3c520f93d800a5b84249f2a5111e530b4681d76","paymentspent":"599c6e14e7e545c52e343167c8a26ba9bad403256d5a4f523288bc7eb7a9eb75","Apaymentspent":"e2501caf44a53c15f294751b756aa3e6ef8e155844b2445a2a695b83f682efc7","depositspent":"2937f055a4199bb8254699c3a5ed0365754bc8f2897e9d7af7d27f2710f1b79e","method":"tradestatus","finishtime":1525743567}
bobdeposit https://etherscan.io/tx/0x82fdb396f638adfdd3b6a7957c10e69935e349418222c0ccf1c05acfcd63fc7f
alicepayment http://www.kmdexplorer.ru/tx/26e4110d665a49b39078b5df523366ac2be2149524c2523dcad12aeaa1188799
bobpayment https://etherscan.io/tx/0x27da2612d8aa130cc993d2932d238113f79ef1e5c75ff1594ffe371bcd728b46

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"PCL\",\"rel\":\"BCH\",\"margin\":0.08,\"refbase\":\"peculium\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"PCL\",\"rel\":\"KMD\",\"margin\":0.08,\"refbase\":\"peculium\",\"refrel\":\"coinmarketcap\"}"
```

## PGN

```
https://bitcointalk.org/index.php?topic=3208091.0
https://github.com/Pigeoncoin/pigeoncoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,55); // changed 60 to 55
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,122); // changed 122 to 123
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

{\"coin\":\"PGN\",\"name\":\"pigeon\",\"rpcport\":8756,\"pubtype\":55,\"p2shtype\":122,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/Pigeoncoin/pigeoncoin
cd pigeoncoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/pigeon*
mkdir ~/.pigeon
echo "server=1" >> ~/.pigeon/pigeon.conf
echo "txindex=1" >> ~/.pigeon/pigeon.conf
echo "listen=0" >> ~/.pigeon/pigeon.conf
echo "listenonion=0" >> ~/.pigeon/pigeon.conf
echo "#proxy=127.0.0.1:9050" >> ~/.pigeon/pigeon.conf
echo "rpcuser=barterpgn" >> ~/.pigeon/pigeon.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.pigeon/pigeon.conf
chmod 0600 ~/.pigeon/pigeon.conf
pigeond -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PGN\"}"

home
      "height" : 39914,
      "rpc" : "127.0.0.1:8756",
      "txfee" : 10000,
      "balance" : 0,
      "smartaddress" : "PWE7TmoLPtDGj2xHfgtsdQpTbNoUqvjxoq",
      "pubtype" : 55,
      "wiftype" : 128,
      "KMDvalue" : 0,
      "installed" : true,
      "coin" : "PGN",
      "status" : "active",
      "p2shtype" : 122

contabo
      "height" : 37826,
      "smartaddress" : "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k",
      "wiftype" : 128,
      "installed" : true,
      "balance" : 0,
      "coin" : "PGN",
      "pubtype" : 55,
      "rpc" : "127.0.0.1:8756",
      "KMDvalue" : 0,
      "txfee" : 10000,
      "p2shtype" : 122,
      "status" : "active"

pigeon-cli sendtoaddress "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k" 1
"fee": -0.00005983

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"PGN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"PGN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Pigeon (PGN)
SWAP completed! 858424810-2858669228 {"expiration":1523205165,"tradeid":0,"requestid":858424810,"quoteid":2858669228,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"PGN","srcamount":0.75326032,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12849349922411905025","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.75336032, 0.08010000, 0.75346032, 0.08011000, 0.84761786, 0, 0, 0.84751786, 0, 0, 0],"result":"success","status":"finished","finishtime":1523189885,"bobdeposit":"4c12465877e2cc1f8f1e9c9e4abb9bbf062c4884544196f014ffafda1f07ee5a","alicepayment":"831168d5a9cdd581f7362b3a23b13ad200eec717589076fafebe1e4d708daefc","bobpayment":"b26cc114d4230cce782115faf71676ae335ab000a374467e88aafc39f75aee4f","paymentspent":"a7bd81a0bbcd4a2c5402f99baaf7adcc0e842826fa0de079999df2869cc606c8","Apaymentspent":"17d6a859cca3f29db7b8677f829ec3efea2acb8ca8d9a43bfc6694f2ed584c3d","depositspent":"91b7fa86fb27586b2da1c3ed6bc138fe5256a60f577fd57dba919a57c4d284c3","method":"tradestatus","finishtime":1523189885}
bobdeposit http://explorer.pigeoncoin.org/tx/4c12465877e2cc1f8f1e9c9e4abb9bbf062c4884544196f014ffafda1f07ee5a
alicepayment https://kmd.explorer.supernet.org/tx/831168d5a9cdd581f7362b3a23b13ad200eec717589076fafebe1e4d708daefc
bobpayment http://explorer.pigeoncoin.org/tx/b26cc114d4230cce782115faf71676ae335ab000a374467e88aafc39f75aee4f
```

## PIVX

```
https://bitcointalk.org/index.php?topic=1262920
https://github.com/PIVX-Project/PIVX


src/chainparams.cpp
base58Prefixes[jumblr_iteration r.18369 s.0r<unsigned char>(1, 30);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1, 13);
base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1, 212);

src/main.cpp
minRelayTxFee = CFeeRate(10000);

{\"coin\":\"PIVX\",\"name\":\"pivx\",\"rpcport\":51473,\"pubtype\":30,\"p2shtype\":13,\"wiftype\":212,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/PIVX-Project/PIVX
cd PIVX
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/pivx*
mkdir ~/.pivx
echo "server=1" >> ~/.pivx/pivx.conf
echo "txindex=1" >> ~/.pivx/pivx.conf
echo "litemode=1" >> ~/.pivx/pivx.conf
echo "staking=0" >> ~/.pivx/pivx.conf
echo "listen=0" >> ~/.pivx/pivx.conf
echo "listenonion=0" >> ~/.pivx/pivx.conf
echo "#proxy=127.0.0.1:9050" >> ~/.pivx/pivx.conf
echo "rpcuser=barterpivx" >> ~/.pivx/pivx.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.pivx/pivx.conf
chmod 0600 ~/.pivx/pivx.conf
pivxd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PIVX\"}"

home
   {
      "pubtype" : 30,
      "smartaddress" : "DSn2r4M8eNdNHCU84CZuWH1nrmMu3gbV1i",
      "p2shtype" : 13,
      "rpc" : "127.0.0.1:51473",
      "wiftype" : 212,
      "coin" : "PIVX",
      "status" : "active",
      "txfee" : 10000
   },

contabo
      "coin" : "PIVX",
      "smartaddress" : "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8",
      "installed" : true,
      "KMDvalue" : 3.10977906,
      "wiftype" : 212,
      "height" : 965699,
      "txfee" : 10000,
      "pubtype" : 30,
      "p2shtype" : 13,
      "status" : "active",
      "balance" : 2.22382266,
      "rpc" : "127.0.0.1:51473"

pivx-cli sendtoaddress "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8" 5.1
pivx-cli sendtoaddress "D6ztNQyQF3mMTYcMFVq1q2cd6eXzqPKGc8"
"fee": -0.00674626
```

## POLIS

```
https://bitcointalk.org/index.php?topic=2627897.0
https://github.com/polispay/polis


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,55);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,56);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,60);

{\"coin\":\"POLIS\",\"name\":\"polis\",\"confpath\":\"${HOME#}/.poliscore/polis.conf\",\"rpcport\":24127,\"pubtype\":55,\"p2shtype\":56,\"wiftype\":60,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/polispay/polis
cd polis
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/polis*
mkdir ~/.poliscore
echo "server=1" >> ~/.poliscore/polis.conf
echo "txindex=1" >> ~/.poliscore/polis.conf
echo "listen=0" >> ~/.poliscore/polis.conf
echo "listenonion=0" >> ~/.poliscore/polis.conf
echo "rpcuser=barterpolis" >> ~/.poliscore/polis.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.poliscore/polis.conf
echo "rpcport=4127" >> ~/.poliscore/polis.conf
echo "rpcworkqueue=64" >> ~/.poliscore/polis.conf
echo "rpcthreads=16" >> ~/.poliscore/polis.conf
echo "litemode=1" >> ~/.poliscore/polis.conf
chmod 0600 ~/.poliscore/polis.conf
polisd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"POLIS\"}"

home
      "wiftype" : 60,
      "p2shtype" : 56,
      "smartaddress" : "PWE7TmoLPtDGj2xHfgtsdQpTbNoUqvjxoq",
      "rpc" : "127.0.0.1:4127",
      "installed" : true,
      "txfee" : 10000,
      "balance" : 0,
      "KMDvalue" : 0,
      "coin" : "POLIS",
      "pubtype" : 55,
      "height" : 130438,
      "status" : "active"

contabo
      "height" : 130438,
      "status" : "active",
      "txfee" : 10000,
      "balance" : 0,
      "installed" : true,
      "rpc" : "127.0.0.1:4127",
      "KMDvalue" : 0,
      "smartaddress" : "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k",
      "wiftype" : 60,
      "pubtype" : 55,
      "coin" : "POLIS",
      "p2shtype" : 56

polis-cli sendtoaddress "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k" 1
"fee": -0.00000226

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"POLIS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"POLIS\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Polis (POLIS)
SWAP completed! 809722347-4185700489 {"uuid":"827f9bc34cd6a232ede24cd1437ee99e7c4ca3a973a201eb8a34555a18656399","expiration":1530406214,"tradeid":0,"requestid":809722347,"quoteid":4185700489,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"POLIS","srcamount":0.77960198,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"10819938367336873985","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77970198, 0.08010000, 0.77980198, 0.08011000, 0.87725222, 0, 0, 0.87715222, 0, 0, 0],"result":"success","status":"finished","finishtime":1530391013,"bobdeposit":"746179890c7cb6b10fe4fef1c835c51a648bba087d52903d9d889d84779b1b9b","alicepayment":"2aa3cdc0000936f8fb2a5285e852a57f128913edea4d562433975fe84f6e6a8c","bobpayment":"f64ae4b56b43ab9017ccc767c16b9d9cdf438ed83de94ba0629f1213b5ecba72","paymentspent":"719ce2b32dec51ada9ae4de6f48c40413ae23ce8d593229f305c86ef1f071605","Apaymentspent":"5668ceacca0f8a26a55dffdc7f26f27a11e4b3a60e1bdaaccf7a82244e3a2f15","depositspent":"f42e2fb2a1cd42089c90e9d88f0516bcb7dc6bb8f17936f839f8caa3082b2569","method":"tradestatus","finishtime":1530391013}
bobdeposit https://explorer.polispay.org/tx/746179890c7cb6b10fe4fef1c835c51a648bba087d52903d9d889d84779b1b9b
alicepayment https://kmdexplorer.ru/tx/2aa3cdc0000936f8fb2a5285e852a57f128913edea4d562433975fe84f6e6a8c
bobpayment https://explorer.polispay.org/tx/f64ae4b56b43ab9017ccc767c16b9d9cdf438ed83de94ba0629f1213b5ecba72

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POLIS\",\"rel\":\"BCH\",\"margin\":0.11,\"refbase\":\"polis\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POLIS\",\"rel\":\"BTC\",\"margin\":0.11,\"refbase\":\"polis\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POLIS\",\"rel\":\"KMD\",\"margin\":0.11,\"refbase\":\"polis\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POLIS\",\"rel\":\"LTC\",\"margin\":0.11,\"refbase\":\"polis\",\"refrel\":\"coinmarketcap\"}"
```

## POLY

```
{\"coin\":\"POLY\",\"name\":\"polymath-network\",\"etomic\":\"0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"POLY\"}"

home
      "p2shtype" : 85,
      "height" : -1,
      "txfee" : 1000,
      "installed" : false,
      "pubtype" : 0,
      "wiftype" : 188,
      "balance" : 0,
      "coin" : "POLY",
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "rpc" : "127.0.0.1:80"

contabo
      "txfee" : 1000,
      "p2shtype" : 85,
      "balance" : 26.97,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "height" : -1,
      "pubtype" : 0,
      "installed" : false,
      "coin" : "POLY"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"POLY\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"POLY\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"POLY\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Polymath (POLY)
SWAP completed! 1594456734-1369420403 {"uuid":"f892f773157bbd32f0fdac7df3b54d43eb293b6ae3fb5c7afaafc4d5dced2e9b","expiration":1531275386,"tradeid":0,"requestid":1594456734,"quoteid":1369420403,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"POLY","bobtomic":"0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77173458,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"9184735983202271233","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531260545,"bobdeposit":"49993dda67713aabaa1296248df239157d8ccdcd9585dfbf4a7c322a3dc9c7a1","alicepayment":"9c25a2ad695635bffb258f6f733e0d80fb2f199c670642dbd1701a9eba9501b4","bobpayment":"fd046f11f85f4f55cb3bfce04a24ca6a2c70c22f08d0a310fec26a4abda1e636","paymentspent":"6c10e7ed5a578d1fea5b88808b34f3946319f9c243d7dda17ea4cd374d2f6baa","Apaymentspent":"13a065d7e85fe49fa4e0f2b7dcabb4ee5032451c63b6dde4aac948d76ee1909c","depositspent":"ed79cc3acc14b230220bcab64f36e880bb9c6e6511994fe894c5fedf8ad20b3d","alicedexfee":"b991eda7fb976459a1bbb7ee32c436440c9d43838877332bbd5d1748f11f27c3","method":"tradestatus","finishtime":1531260545}
bobdeposit https://etherscan.io/tx/0xb9c3f14fceba0fc7ee0529713b5ed8da4cf81e08c14584d516b73a72432fd284
alicepayment https://kmdexplorer.ru/tx/9c25a2ad695635bffb258f6f733e0d80fb2f199c670642dbd1701a9eba9501b4
bobpayment https://etherscan.io/tx/0xb15b5cdc40a4d091e0970477f2073c4f6491f83cd616a78f996fda5b9edb7aee

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POLY\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"polymath-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POLY\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"polymath-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POLY\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"polymath-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POLY\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"polymath-network\",\"refrel\":\"coinmarketcap\"}"
```

## POWR

```
{\"coin\":\"POWR\",\"name\":\"power-ledger\",\"etomic\":\"0x595832f8fc6bf59c85c527fec3740a1b7a361269\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"POWR\"}"

home
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "p2shtype" : 85,
      "balance" : 0,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "pubtype" : 0,
      "installed" : false,
      "txfee" : 1000,
      "coin" : "POWR"

contabo
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "height" : -1,
      "status" : "active",
      "installed" : false,
      "txfee" : 1000,
      "wiftype" : 188,
      "balance" : 0,
      "coin" : "POWR"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"POWR\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"POWR\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"POWR\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"POWR\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"

Power Ledger (POWR)
SWAP completed! 3672838604-3573357858 {"uuid":"f5f0de5d2919adbecf6c659a52b5135893691706961886be03c2d56d74c78c6a","expiration":1526894440,"tradeid":0,"requestid":3672838604,"quoteid":3573357858,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"POWR","bobtomic":"0x595832f8fc6bf59c85c527fec3740a1b7a361269","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67333297,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"7538597988608442369","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67334297, 0.08010000, 0.67335297, 0.08011000, 0.75751959, 0, 0, 0.75750959, 0, 0, 0],"result":"success","status":"finished","finishtime":1526879488,"bobdeposit":"b939a6b716a5495491cbce12534ebf177adb97002cb1c17ff88514bb75134c86","alicepayment":"f4392a519159da52474de0729fae28eb2d90f3a0542703cabfc3690b190bbdb4","bobpayment":"87894b9c429ac40c2f103e921b0c8aecb39122afdc57e041e4ad76a923e441f1","paymentspent":"182e2d781506f7ccf5ac8db07015faacc0fc7049217a812109a7b0eb619cfd83","Apaymentspent":"416816c3ad6e3e46bea21d04f014a92885b6ccfd2d3396ad38cbb833e9a4343a","depositspent":"166fba727f653baf1d3d03e3303073f7cd360a07a261e3668a338be29a5e52cd","method":"tradestatus","finishtime":1526879488}
bobdeposit https://etherscan.io/tx/0xa75a13771bac63252eb7f0ff9970ef92f0ea8c5ca49e059588f8e4718cf20af2
alicepayment https://kmdexplorer.ru/tx/f4392a519159da52474de0729fae28eb2d90f3a0542703cabfc3690b190bbdb4
bobpayment https://etherscan.io/tx/0x10b1bd255fb9232e33c6cabd56cf91980fb00ec1c4bbb568ee7a0e06f2e6ca43

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POWR\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"power-ledger\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"POWR\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"power-ledger\",\"refrel\":\"coinmarketcap\"}"
```

## PRL

```
{\"coin\":\"PRL\",\"name\":\"oyster\",\"etomic\":\"0x1844b21593262668b7248d0f57a220caaba46ab9\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PRL\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "installed" : false,
      "balance" : 0,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "coin" : "PRL",
      "p2shtype" : 85,
      "pubtype" : 0,
      "wiftype" : 188,
      "height" : -1

contabo
      "height" : -1,
      "installed" : false,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "PRL",
      "pubtype" : 0,
      "p2shtype" : 85,
      "wiftype" : 188

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"PRL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"PRL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"PRL\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"PRL\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Oyster (PRL)
SWAP completed! 2311776344-2760931975 {"uuid":"1419682afbc753076a783ae102b8178e87f6eb2b2142165e105cdc172016b8c6","expiration":1526714161,"tradeid":0,"requestid":2311776344,"quoteid":2760931975,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"PRL","bobtomic":"0x1844b21593262668b7248d0f57a220caaba46ab9","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73635501,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"356387132377464833","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.73636501, 0.08010000, 0.73637501, 0.08011000, 0.82841938, 0, 0, 0.82840938, 0, 0, 0],"result":"success","status":"finished","finishtime":1526699839,"bobdeposit":"33358ef5b27d7641184b566749fe7bf2d1144da84ce682d90e1292a5fed002d7","alicepayment":"82cc9a5528ebcb0a0a28a7ec6327421890b2987ec732a2502a2634b6097514bc","bobpayment":"d825eacdca52bcfbe1658d33da1ec59c4fd6b3ab3cefcc688a10b1ab10795d38","paymentspent":"7462b17c5175a650539cba930036289885bbca3580a40595722234ad5370243a","Apaymentspent":"f32eca4dae9e2ea23c06594499dd2bcc75bc01d4ef99cfb818a412c7da14186b","depositspent":"aab8d4e1e1738bd08e7fd6aa13245ef0d43101e40d40c4738792796683d44c2d","method":"tradestatus","finishtime":1526699839}
bobdeposit https://etherscan.io/tx/0x276610ea407e8493db321e33812a0c9c11ef788de7193fe48c18de72dfb14c49
alicepayment https://kmdexplorer.ru/tx/82cc9a5528ebcb0a0a28a7ec6327421890b2987ec732a2502a2634b6097514bc
bobpayment https://etherscan.io/tx/0xcfb3f15629f818225c3843048393df14ed5e0791c3012146eafcc5af5fec861f

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"PRL\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"oyster\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"PRL\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"oyster\",\"refrel\":\"coinmarketcap\"}"
```

## PURA

```
https://bitcointalk.org/index.php?topic=2129477.0
https://github.com/puracore/pura


src/chainparams.cpp
// Pura addresses start with 'P'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,55);
// Pura script addresses start with '7'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,16);
// Pura private keys start with '7' or 'P'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,150);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 10000

{\"coin\":\"PURA\",\"name\":\"pura\",\"rpcport\":55555,\"pubtype\":55,\"p2shtype\":16,\"wiftype\":150,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/puracore/pura
cd pura
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc
make -j4
sudo make install
sudo strip /usr/local/bin/pura*
mkdir ~/.pura
echo "server=1" >> ~/.pura/pura.conf
echo "txindex=1" >> ~/.pura/pura.conf
echo "litemode=0" >> ~/.pura/pura.conf
echo "listen=0" >> ~/.pura/pura.conf
echo "#proxy=127.0.0.1:9050" >> ~/.pura/pura.conf
echo "rpcuser=barterpura" >> ~/.pura/pura.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.pura/pura.conf
chmod 0600 ~/.pura/pura.conf
purad -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PURA\"}"

home
      "pubtype" : 55,
      "KMDvalue" : 0,
      "coin" : "PURA",
      "balance" : 0,
      "wiftype" : 150,
      "status" : "active",
      "p2shtype" : 16,
      "smartaddress" : "PWE7TmoLPtDGj2xHfgtsdQpTbNoUqvjxoq",
      "height" : 19384,
      "rpc" : "127.0.0.1:55555",
      "installed" : true,
      "txfee" : 10000

contabo
      "wiftype" : 150,
      "installed" : true,
      "pubtype" : 55,
      "p2shtype" : 16,
      "rpc" : "127.0.0.1:55555",
      "balance" : 0,
      "status" : "active",
      "coin" : "PURA",
      "smartaddress" : "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k",
      "height" : 19384,
      "KMDvalue" : 0,
      "txfee" : 10000

pura-cli sendtoaddress "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k" 26
"fee": -0.00004520
```

## PURC

```
{\"coin\":\"PURC\",\"name\":\"peurcoin\",\"etomic\":\"0x7148b80b38278853ca8263cfc0b57d4478ae6a6e\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PURC\"}"

home
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "height" : -1,
      "txfee" : 1000,
      "wiftype" : 188,
      "balance" : 0,
      "coin" : "PURC",
      "p2shtype" : 85,
      "status" : "active",
      "installed" : false

contabo
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "status" : "active",
      "coin" : "PURC",
      "p2shtype" : 85,
      "balance" : 81987,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"PURC\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"PURC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"PURC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Peurcoin (PURC)
SWAP completed! 3921800441-1715495702 {"uuid":"1895a1854963265f19e30f62f9ea1a1cd8aecd716ad966c96a8a7dfd68100b5f","expiration":1531168021,"tradeid":0,"requestid":3921800441,"quoteid":1715495702,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"PURC","bobtomic":"0x7148b80b38278853ca8263cfc0b57d4478ae6a6e","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76148117,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12047358397415751681","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531153044,"bobdeposit":"8290bbd3e89c7b77bcc7fd8224bd58770c48e2e12f78ca8440914b29c37e006f","alicepayment":"46b167f83e697592d7ee436ed1d783e3f3f8e160d2dcb06130082a0d89dadcc1","bobpayment":"f746fb11b0b19cff029f67105a6b29824e5f5669057015989174bc1fa548af1f","paymentspent":"94730842866702bf877f96ab14ae6fd6599b3d74503113f536de53ad53593df8","Apaymentspent":"a6c5e4875d29fb459773d2c249953409df6c4b43f390306567634192f596ae84","depositspent":"32b06b203bc512e5772ecb6513eae1357340aa1493542dec45677ab90950d3fc","alicedexfee":"c18b65cb75f9ff62de166c8fc9201b522e3ab257c603774bb6eff4532e07243c","method":"tradestatus","finishtime":1531153044}
bobdeposit https://etherscan.io/tx/0x3c6bed1c340d6d66712eb7c414ed8def34f33610372ac4278f159a8aafcdf110
alicepayment https://kmdexplorer.ru/tx/46b167f83e697592d7ee436ed1d783e3f3f8e160d2dcb06130082a0d89dadcc1
bobpayment https://etherscan.io/tx/0x26f1170ed152bf37bcce539a61062dfaa90f4ee28fbbe0bda11bbf20b2320b6f

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"PURC\",\"fixed\":1}"

```

## PYRO

```
https://github.com/pyrocoindev/pyro
https://bitcointalk.org/index.php?topic=3076664.0
http://explorer.pyro.solutions/


src/chainparams.cpp
// PYRO addresses start with 'P'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,55);
// PYRO script addresses start with '5'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,10);
// PYRO private keys start with '5' or 'P' (?)
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,198);

{\"coin\":\"PYRO\",\"name\":\"pyro\",\"confpath\":\"${HOME#}/.pyrocore/pyro.conf\",\"rpcport\":9696,\"pubtype\":55,\"p2shtype\":10,\"wiftype\":198,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/pyrocoindev/pyro
cd pyro
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/pyro*
mkdir ~/.pyrocore
echo "server=1" >> ~/.pyrocore/pyro.conf
echo "txindex=1" >> ~/.pyrocore/pyro.conf
echo "litemode=1" >> ~/.pyrocore/pyro.conf
echo "listen=0" >> ~/.pyrocore/pyro.conf
echo "listenonion=0" >> ~/.pyrocore/pyro.conf
echo "#proxy=127.0.0.1:9050" >> ~/.pyrocore/pyro.conf
echo "rpcuser=barterpyro" >> ~/.pyrocore/pyro.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.pyrocore/pyro.conf
chmod 0600 ~/.pyrocore/pyro.conf
pyrod -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"PYRO\"}"

home
      "wiftype" : 198,
      "coin" : "PYRO",
      "rpc" : "127.0.0.1:9696",
      "height" : 19526,
      "p2shtype" : 10,
      "KMDvalue" : 0,
      "balance" : 0,
      "installed" : true,
      "txfee" : 10000,
      "pubtype" : 55,
      "smartaddress" : "PWE7TmoLPtDGj2xHfgtsdQpTbNoUqvjxoq",
      "status" : "active"

contabo
      "txfee" : 10000,
      "wiftype" : 198,
      "installed" : true,
      "coin" : "PYRO",
      "smartaddress" : "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k",
      "pubtype" : 55,
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:9696",
      "height" : 19530,
      "balance" : 0,
      "p2shtype" : 10,
      "status" : "active"

pyro-cli sendtoaddress "PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k" 1
"fee": -0.00004520

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"PYRO\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"PYRO\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Pyro (PYRO)
SWAP completed! 889511044-393187238 {"uuid":"cab2b988b75c7c296ac108b0e2fcf7b73616416e2bf82fdd09364c62277a6378","expiration":1523365666,"tradeid":0,"requestid":889511044,"quoteid":393187238,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"PYRO","srcamount":0.71183935,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"13031789253123637249","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.71193935, 0.08010000, 0.71203935, 0.08011000, 0.80101926, 0, 0, 0.80091926, 0, 0, 0],"result":"success","status":"finished","finishtime":1523351030,"bobdeposit":"baaba21ae69ec0d48d4d4ce5ecf9c487ee139beab1bd3cf0a553d53ff8b71a83","alicepayment":"d7f7c6bf8929505eaedd6fc8fd54805dcacc6852c2b27185851cf8312ecdcce3","bobpayment":"4ac26f2786725d1bc92b49a98615181800ffe5520b8f801e602045271854ff83","paymentspent":"b018bdbc4b14f2ce08c04b8b1a301b085c21f237c5e97460f309dbda700880c9","Apaymentspent":"e6c34653d6c4a55b5dde425ebfc4fdb67cdc56d9e2b636a380a2717feba0bab0","depositspent":"838c7f3b66b7eaaae4b5405d47ecb1fc3dd82bf6c527a7e60e62c297f09d5763","method":"tradestatus","finishtime":1523351030}
bobdeposit http://138.68.246.198:3001/tx/baaba21ae69ec0d48d4d4ce5ecf9c487ee139beab1bd3cf0a553d53ff8b71a83
alicepayment https://kmd.explorer.supernet.org/tx/d7f7c6bf8929505eaedd6fc8fd54805dcacc6852c2b27185851cf8312ecdcce3
bobpayment http://138.68.246.198:3001/tx/4ac26f2786725d1bc92b49a98615181800ffe5520b8f801e602045271854ff83

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"withdraw\",\"coin\":\"PYRO\",\"outputs\":[{\"PASxz8RbzZMFuP6Wrz9yxARHqFyagJDp2k\":0.69710355}]}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"sendrawtransaction\",\"coin\":\"PYRO\",\"signedtx\":\"$1\"}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"PYRO\",\"fixed\":0.1}"
```

## QBIT

```
{\"coin\":\"QBIT\",\"name\":\"qubitica\",\"etomic\":\"0xcb5ea3c190d8f82deadf7ce5af855ddbf33e3962\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"QBIT\"}"

home
      "coin" : "QBIT",
      "balance" : 0,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "p2shtype" : 85,
      "wiftype" : 188,
      "installed" : false,
      "txfee" : 1000,
      "height" : -1

contabo
      "balance" : 100,
      "txfee" : 1000,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "installed" : false,
      "height" : -1,
      "wiftype" : 188,
      "coin" : "QBIT",
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"QBIT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"QBIT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"QBIT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Qubitica (QBIT)
SWAP completed! 3965745921-4011086963 {"uuid":"8d5b03faeaeadc4a2a2fb43b51e66aa5dc6c60f54c5b69c51ad1fe98757fb351","expiration":1529803803,"tradeid":0,"requestid":3965745921,"quoteid":4011086963,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"QBIT","bobtomic":"0xcb5ea3c190d8f82deadf7ce5af855ddbf33e3962","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.71659722,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"16114926155658428417","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1529788563,"bobdeposit":"7a221f45822e56419c95710164a050e8ee7cd1f2e90e2dff80a8746060a394fd","alicepayment":"673632cb69c424854bcf0ff36ebc627c5e7bc37de191d16b7466d919cb5f3bd0","bobpayment":"857bfecb69794ce94362b6d7c60dc92a5d495c23b1a898d6fb6bbd1d5898d3e8","paymentspent":"f878ca108e0bcf63c697b73af3e22b8bdc85d92b229166d8f6676bc7c74294d1","Apaymentspent":"3bdc6e1ad675749b6785d657eb52b8f0f5fb29878ee99c51c9de908233d54245","depositspent":"65a94e0d18a4e39157e7b2245df3e54be081a579930b8bc515883481b029c17f","method":"tradestatus","finishtime":1529788563}
bobdeposit https://etherscan.io/tx/0x984ca470ebc958119b7300d8c434344cdd9318eb4dcbb3706303f6c55408cf4e
alicepayment https://kmdexplorer.ru/tx/673632cb69c424854bcf0ff36ebc627c5e7bc37de191d16b7466d919cb5f3bd0
bobpayment https://etherscan.io/tx/0x970e352358e39fc1a760c76c0f5689cdde8be52467aecbbded8602bd3bdb4ede

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"QBIT\",\"fixed\":1}"
```

## QSP

```
{\"coin\":\"QSP\",\"name\":\"quantstamp\",\"etomic\":\"0x99ea4dB9EE77ACD40B119BD1dC4E33e1C070b80d\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"QSP\"}"

home
      "balance" : 0,
      "coin" : "QSP",
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "height" : -1,
      "pubtype" : 0,
      "p2shtype" : 85,
      "status" : "active",
      "txfee" : 1000,
      "installed" : false,
      "wiftype" : 188

contabo
      "installed" : false,
      "height" : -1,
      "status" : "active",
      "balance" : 94.9,
      "pubtype" : 0,
      "p2shtype" : 85,
      "wiftype" : 188,
      "coin" : "QSP",
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"QSP\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"QSP\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"QSP\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Quantstamp (QSP)
SWAP completed! 969358352-1988101144 {"uuid":"52c62396ae9e76cae7a78685615cd22acc044a663ce1f6be30f687cda86f4314","expiration":1531282682,"tradeid":0,"requestid":969358352,"quoteid":1988101144,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"QSP","bobtomic":"0x99ea4dB9EE77ACD40B119BD1dC4E33e1C070b80d","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.72436011,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"880596799783895041","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531267495,"bobdeposit":"9eb8132ca8d1580274efd51374a1ca2116be5d8b2a8a6ed416f2890843d614c2","alicepayment":"db48054b98346d9fb020f95f20d83fb0503e4c02759339a3ca3fc958b17337c4","bobpayment":"f16a92954d2495eee17e3f7c286bb5a16fea0dba1af045fda50a2c650001049c","paymentspent":"92143dfedcfecfd1626c0febd3b7a91eb1e3e4a92a3de63bde706d8c41f0a954","Apaymentspent":"1a3545fa9d35ff6f8350c395fd77b78e9d0ac4393b9a5337e275cd4c7fae64bb","depositspent":"76f9a28d740838b17cba54c28c37caa2289e85af2030e28f5dcf188a07bdf06e","alicedexfee":"0e3649e97b8ac7b4c685d3a8c9fe99d6dd31ce82845fc0a1b6f5efe446d622c3","method":"tradestatus","finishtime":1531267495}
bobdeposit https://etherscan.io/tx/0xde0f70f793d20ae6261ce2756cc560eb21b3dedb903b236bc595b51171bba8fb
alicepayment https://kmdexplorer.ru/tx/db48054b98346d9fb020f95f20d83fb0503e4c02759339a3ca3fc958b17337c4
bobpayment https://etherscan.io/tx/0x955bfec1f0b600a72a7dbeee6f3993d6d6065622441c3a6cacbe77488a5aabd0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"QSP\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"quantstamp\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"QSP\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"quantstamp\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"QSP\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"quantstamp\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"QSP\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"quantstamp\",\"refrel\":\"coinmarketcap\"}"
```

## QTUM

```
https://bitcointalk.org/index.php?topic=1720632.0
https://github.com/qtumproject/qtum


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,58);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,50);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 400000;

{\"coin\":\"QTUM\",\"name\":\"qtum\",\"rpcport\":3889,\"pubtype\":58,\"p2shtype\":50,\"wiftype\":128,\"txfee\":400000}


cd ~/wallets
git clone https://github.com/qtumproject/qtum --recursive
cd qtum
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/qtum*
mkdir ~/.qtum
echo "server=1" >> ~/.qtum/qtum.conf
echo "txindex=1" >> ~/.qtum/qtum.conf
echo "staking=0" >> ~/.qtum/qtum.conf
echo "listen=0" >> ~/.qtum/qtum.conf
echo "listenonion=1" >> ~/.qtum/qtum.conf
echo "#proxy=127.0.0.1:9050" >> ~/.qtum/qtum.conf
echo "rpcuser=barterqtum" >> ~/.qtum/qtum.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.qtum/qtum.conf
chmod 0600 ~/.qtum/qtum.conf
qtumd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"QTUM\"}"

home
      "smartaddress" : "QiEvR6hCXRbuBLNYjwtq5ndpUtaJyDyWXD",
      "rpc" : "127.0.0.1:3889",
      "txfee" : 400000,
      "installed" : true,
      "height" : 40710,
      "wiftype" : 128,
      "coin" : "QTUM",
      "pubtype" : 58,
      "p2shtype" : 50,
      "status" : "active",
      "KMDvalue" : 0,
      "balance" : 0

contabo
      "coin" : "QTUM",
      "installed" : true,
      "KMDvalue" : 0,
      "status" : "active",
      "smartaddress" : "QNTmwTKU86jtMgWmwF9wQYEeimkQpXsi4Q",
      "pubtype" : 58,
      "rpc" : "127.0.0.1:3889",
      "txfee" : 400000,
      "balance" : 0,
      "height" : 40691,
      "p2shtype" : 50,
      "wiftype" : 128

qtum-cli sendtoaddress "QNTmwTKU86jtMgWmwF9wQYEeimkQpXsi4Q" 1
qtum-cli sendtoaddress "QNTmwTKU86jtMgWmwF9wQYEeimkQpXsi4Q" 1.2
"fee": -0.00114401
```

R

```
{\"coin\":\"R\",\"name\":\"revain\",\"etomic\":\"0x48f775efbe4f5ece6e0df2f7b5932df56823b990\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"R\"}"

home
      "txfee" : 1000,
      "pubtype" : 0,
      "p2shtype" : 85,
      "wiftype" : 188,
      "height" : -1,
      "balance" : 0,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "coin" : "R",
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "height" : -1,
      "coin" : "R",
      "balance" : 100,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "installed" : false,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "wiftype" : 188,
      "pubtype" : 0,
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"R\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"R\",\"rel\":\"KMD\",\"price\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"R\",\"rel\":\"KMD\",\"relvolume\":10,\"price\":1.2}"
Revain (R)
SWAP completed! 2728546843-2156992361 {"uuid":"e5d6b43cbc10e092fb58336038653d8ed8fe2f9155f2b76cc9062f99d179c8a4","expiration":1529642059,"tradeid":0,"requestid":2728546843,"quoteid":2156992361,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"R","bobtomic":"0x48f775efbe4f5ece6e0df2f7b5932df56823b990","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":8.53269000,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":10.00009000,"alicetxfee":0.00001000,"aliceid":"11504297191605600257","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 10.00009999, 1.00002000, 10.00011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1529626850,"bobdeposit":"7c6b409b9eb1bad93e56aa7073b206350352f4a4b6424861462fb81f2ba4931c","alicepayment":"c525d92a060400d4bb39a37fe71385e6f4e51c3b1fe393b67466d3f8ea4f1ef1","bobpayment":"893605538c68f3220f74c1050a92d1fc66403619376ff68e7d7391701d308f81","paymentspent":"f2b2501d5b51d7dab34da079b86bc96180386478778f618c4709b500961eac94","Apaymentspent":"ed53fa56fc360d46e6f91b4e8ca8ed34bb49a334aed26bd2907fbecff11a28c0","depositspent":"483e02968696d0160b0d05030950c5bdd9108300c5bbfd8a35cd333a1040e9dd","method":"tradestatus","finishtime":1529626850}
bobdeposit https://etherscan.io/tx/0x320d8a9b0e99cc642e3a803f178c83f8b458bea1c362c23af03706627d7d3edd
alicepayment https://kmdexplorer.ru/tx/c525d92a060400d4bb39a37fe71385e6f4e51c3b1fe393b67466d3f8ea4f1ef1
bobpayment https://etherscan.io/tx/0xea59b4ad52145bd703ba7dc5a65417f584a287703df3092f225f5a204c3653c5

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"R\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"revain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"R\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"revain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"R\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"revain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"R\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"revain\",\"refrel\":\"coinmarketcap\"}"
```

## RCN

```
{\"coin\":\"RCN\",\"name\":\"ripio-credit-network\",\"etomic\":\"0xF970b8E36e23F7fC3FD752EeA86f8Be8D83375A6\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"RCN\"}"

home
      "height" : -1,
      "status" : "active",
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "balance" : 0,
      "wiftype" : 188,
      "pubtype" : 0,
      "txfee" : 1000,
      "coin" : "RCN"

hetzner
      "p2shtype" : 85,
      "installed" : false,
      "pubtype" : 0,
      "status" : "active",
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "coin" : "RCN",
      "wiftype" : 188,
      "balance" : 436.5,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"RCN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"RCN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Ripio Credit Network (RCN)
SWAP completed! 4188758412-59264982 {"uuid":"1092499947f249ca53817b00022c70fee23251dfd0d94ef5b9a3c57fb8ee2b24","expiration":1531459271,"tradeid":0,"requestid":4188758412,"quoteid":59264982,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"RCN","bobtomic":"0xF970b8E36e23F7fC3FD752EeA86f8Be8D83375A6","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.69547933,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"13757557576456798209","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531444155,"bobdeposit":"ff794e147fc045a7eacfe7274ab48f518344ca1e77e570ce74ecbe935eac3902","alicepayment":"397c1bdce667912537d59f26f35cff12f0e6795187c9203d738bd6092911823c","bobpayment":"d909068ce2adcd101f371382a7e7be18b02aa78fd7ce9593b347ca13bd82c088","paymentspent":"33bfa7dbb2c0a27b9224f02ceab32dabf8b10d2fb2bdd980f959da9541d69447","Apaymentspent":"1356b4c23450fa9e4af5da71ed8e5270b3e27a19febad579522823da23a081d7","depositspent":"adaacb6830da0c01020782b06e7aa1ab2870e49e2e3fd30cea938a84034f96a3","alicedexfee":"3873c0279c94623c4505578aec4dfd897e78ebde8d1fbde43e6805d940e223da","method":"tradestatus","finishtime":1531444155}
bobdeposit https://etherscan.io/tx/0x298cb1a9176a22c32a1d7dd3e7adf439f79855d1cd900d82f0e654e1277d647c
alicepayment https://kmdexplorer.ru/tx/397c1bdce667912537d59f26f35cff12f0e6795187c9203d738bd6092911823c
bobpayment https://etherscan.io/tx/0x9fa58b43066ad707614ca6e225fe9907bd0c16852864a09371afbe4033e85242

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RCN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"ripio-credit-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RCN\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"ripio-credit-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RCN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"ripio-credit-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RCN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"ripio-credit-network\",\"refrel\":\"coinmarketcap\"}"
```

## RDN

```
{\"coin\":\"RDN\",\"name\":\"raiden-network-token\",\"etomic\":\"0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"RDN\"}"

home
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188,
      "coin" : "RDN",
      "installed" : false,
      "balance" : 0,
      "status" : "active",
      "p2shtype" : 85,
      "pubtype" : 0,
      "height" : -1,
      "rpc" : "127.0.0.1:80"

contabo
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "coin" : "RDN",
      "p2shtype" : 85,
      "pubtype" : 0,
      "balance" : 19.48,
      "installed" : false,
      "height" : -1,
      "wiftype" : 188,
      "status" : "active",
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"RDN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"RDN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"RDN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Raiden Network Token (RDN)
SWAP completed! 1413121055-3260355402 {"uuid":"356f56950fe2fb6d88f81626e42930235c8a56657ad2318ba6fb062fc4359a50","expiration":1531284087,"tradeid":0,"requestid":1413121055,"quoteid":3260355402,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"RDN","bobtomic":"0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73095883,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"6910205143887839233","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531269162,"bobdeposit":"f87c7cdbc5c2ad4ebee0eeb7b15ae82cada59a0ff7609fe67d7cf372b84a04b4","alicepayment":"241c075379818519900f45b1b0e622c553ca6b0c6e2567d7639c29ba7548a62d","bobpayment":"423f638f662f13e33e1ebcb967a3e600852c2472d25016a4f8389c5813f9ae92","paymentspent":"b8bf5e9840a077367e8108d452cc00f01ff727215177d2bcf0bde8ec4e7f7308","Apaymentspent":"2f3c090edb87eb44caf8f836bb8795b7b949f36182decb7e48bac1232720d301","depositspent":"c4fbf1b14e935ac846694e12185552af6725b9c682840990982dae4219b573d1","alicedexfee":"e5aa7d91ecb36ab363762d8407f9f6f1bc18a2325acff16b00432837fe886a0b","method":"tradestatus","finishtime":1531269162}
bobdeposit https://etherscan.io/tx/0x294834d80a834709dbe22a7ed4848bb9d852bbd09ec6c6d4e218d824b461ea57
alicepayment https://kmdexplorer.ru/tx/241c075379818519900f45b1b0e622c553ca6b0c6e2567d7639c29ba7548a62d
bobpayment https://etherscan.io/tx/0xb9cad9a7317cfc8430c88e59eedeaf635cb86010d4aa8b4db9d80be45386c2f5

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RDN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"raiden-network-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RDN\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"raiden-network-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RDN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"raiden-network-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RDN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"raiden-network-token\",\"refrel\":\"coinmarketcap\"}"
```

## REP

```
{\"coin\":\"REP\",\"name\":\"augur\",\"etomic\":\"0xE94327D07Fc17907b4DB788E5aDf2ed424adDff6\",\"rpcport\":80}

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188,
      "pubtype" : 0,
      "p2shtype" : 85,
      "status" : "active",
      "height" : -1,
      "txfee" : 1000,
      "balance" : 0,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "coin" : "REP"

contabo
      "txfee" : 1000,
      "pubtype" : 0,
      "coin" : "REP",
      "wiftype" : 188,
      "p2shtype" : 85,
      "status" : "active",
      "installed" : false,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "balance" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"REP\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"REP\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"REP\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"REP\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Augur (REP)
SWAP completed! 3501951347-1670451742 {"expiration":1522560465,"tradeid":0,"requestid":3501951347,"quoteid":1670451742,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"REP","bobtomic":"0xE94327D07Fc17907b4DB788E5aDf2ed424adDff6","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73770889,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"14305164865015906308","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.73771889, 0.08010000, 0.73772889, 0.08011000, 0.82994250, 0, 0, 0.82993250, 0, 0, 0],"result":"success","status":"finished","finishtime":1522545263,"bobdeposit":"7d33c7f976290c368c3bfc58d98183713c970d2d660810314b0ad059a287085c","alicepayment":"8a8e5b42405e2568fe23ae4a5ac44f14ed82f72a08e44b6c53d3836c5c66a6ea","bobpayment":"3802bb378878c1bd2e37a82be982b51df6acfe7dc9c7acb518008ca0af8dbf45","paymentspent":"7a77e51f8ef2ffcb5c4e197facfd34362cb05694e0874d16903985e50a075c6d","Apaymentspent":"01339ea626d8fffa02e3e9dd135f9f1f3e8262d0e5b7fe4019e457b2303bab42","depositspent":"e7894d019bb56bb04aa0001935015f9285bff4ba4b15b7e56d867694655f3eb3","method":"tradestatus","finishtime":1522545263}
bobdeposit https://etherscan.io/tx/0x401a7e3141df3f4ca51d8c91c9dcf358a612a324fb7119f0b901a0c1fec30528
alicepayment https://kmd.explorer.supernet.org/tx/8a8e5b42405e2568fe23ae4a5ac44f14ed82f72a08e44b6c53d3836c5c66a6ea
bobpayment https://etherscan.io/tx/0x819c187fb6a175bf2f4557b3d45486a854af411275a6db91699f6be9b48501f2
```

## REQ

```
{\"coin\":\"REQ\",\"name\":\"request-network\",\"etomic\":\"0x8f8221afbb33998d8584a2b05749ba73c37a938a\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"REQ\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "txfee" : 1000,
      "installed" : false,
      "p2shtype" : 85,
      "height" : -1,
      "coin" : "REQ",
      "pubtype" : 0,
      "balance" : 0,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80"

contabo
      "installed" : false,
      "txfee" : 1000,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "status" : "active",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "coin" : "REQ",
      "height" : -1,
      "balance" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"REQ\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"REQ\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"REQ\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"REQ\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Request Network (REQ)
SWAP completed! 1146799217-2132460082 {"uuid":"a947bc854511a1d56ad682f3f173943ac4d48668b9e09e732f162508057a6040","expiration":1526704857,"tradeid":0,"requestid":1146799217,"quoteid":2132460082,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"REQ","bobtomic":"0x8f8221aFbB33998d8584A2B05749bA73c37a938a","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73635501,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"3405274793307340801","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.73636501, 0.08010000, 0.73637501, 0.08011000, 0.82841938, 0, 0, 0.82840938, 0, 0, 0],"result":"success","status":"finished","finishtime":1526689815,"bobdeposit":"3b879f3a1ee3aa9d4d9424796cbbb4387b8df92c38353ca448ce34d6f4a795d4","alicepayment":"38e66cd8375c7e044a08fcf08948494cd86af39b42b966befdb6ace2fba024d7","bobpayment":"22ad6c1217903e9036fc4a0cf1b22cb7d7b0cd734b7001b163d38ca834d340f4","paymentspent":"1094c01ee00b04ea4208653b8437e6a4138ec13ac2b9a13f68e4a5aca5aa67ff","Apaymentspent":"4e943dc6e7d2bdbe01590b6c28874753cf47ca0b483945a7ae817dcb5803bf5f","depositspent":"c95516cf65a10c966dd9a40f4025bbd6eb76592a1451e73c6726ba2a790cf532","method":"tradestatus","finishtime":1526689815}
bobdeposit https://etherscan.io/tx/0x19452798f2d9a598952e5d5818389d11191818e7f4e1023f6ab19ac3e5470768
alicepayment https://kmdexplorer.ru/tx/38e66cd8375c7e044a08fcf08948494cd86af39b42b966befdb6ace2fba024d7
bobpayment https://etherscan.io/tx/0x3b1347b66250be03f575d4a0111282e21e45c5eaa45e296d7f8591c533ffb07b

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"REQ\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"request-network\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"REQ\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"request-network\",\"refrel\":\"coinmarketcap\"}"
```

## RHOC

```
{\"coin\":\"RHOC\",\"name\":\"rchain\",\"etomic\":\"0x168296bb09e24a88805cb9c33356536b980d3fc5\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"RHOC\"}"

home
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "wiftype" : 188,
      "p2shtype" : 85,
      "coin" : "RHOC",
      "txfee" : 1000,
      "status" : "active",
      "pubtype" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0

contabo
      "p2shtype" : 85,
      "status" : "active",
      "height" : -1,
      "installed" : false,
      "coin" : "RHOC",
      "wiftype" : 188,
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"RHOC\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"RHOC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"RHOC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
RChain (RHOC)
SWAP completed! 3157820816-1495780778 {"uuid":"c09cbf406b12302d431389b2bc59c0984ec5d4e5df4b602f878098095382027c","expiration":1527376173,"tradeid":0,"requestid":3157820816,"quoteid":1495780778,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"RHOC","bobtomic":"0x168296bb09e24a88805cb9c33356536b980d3fc5","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77176458,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"4340679645519806465","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77177458, 0.08010000, 0.77178458, 0.08011000, 0.86825515, 0, 0, 0.86824515, 0, 0, 0],"result":"success","status":"finished","finishtime":1527361246,"bobdeposit":"e6eb574f46ad6ab92fc211b0162dc6acfe416bc5d47027ff3d515762e0a44b92","alicepayment":"cd6ca890c48197048126eda3db303b11257be969c2911cb8011a4bbd9667ebdc","bobpayment":"4dad25841ef46a8a4a7aaa8d07fbe4e30356bfd90b42120828ea88c6f1063b19","paymentspent":"4f4352551f54b09d3e5247dd90315144019a83c6e426eba5d15656c4f1c6ffef","Apaymentspent":"e150bf0674560ea60cc37b6b87155714e470f10db7eb526ab627f65182d9fd21","depositspent":"68447d7100ed07e43a9d1f822ebcd6473c55b945983da561303a1873aaffaac0","method":"tradestatus","finishtime":1527361246}
bobdeposit https://etherscan.io/tx/0x54abf6ef480dbec96b31a15cb3f7b289833781b049b79715f4248284afdbb966
alicepayment https://kmdexplorer.ru/tx/cd6ca890c48197048126eda3db303b11257be969c2911cb8011a4bbd9667ebdc
bobpayment https://etherscan.io/tx/0xb92fe5b891319ddb3eb847628814b4726825c17d1fdeb1b6e3df6223507f957f

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RHOC\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"rchain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RHOC\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"rchain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RHOC\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"rchain\",\"refrel\":\"coinmarketcap\"}"
```

## RLC

```
{\"coin\":\"RLC\",\"name\":\"rlc\",\"etomic\":\"0x607F4C5BB672230e8672085532f7e901544a7375\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"RLC\"}"

home
      "coin" : "RLC",
      "balance" : 0,
      "status" : "active",
      "pubtype" : 0,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "height" : -1

hetzner
      "txfee" : 1000,
      "installed" : false,
      "height" : -1,
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "p2shtype" : 85,
      "pubtype" : 0,
      "wiftype" : 188,
      "status" : "active",
      "coin" : "RLC",
      "balance" : 6.39,
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"RLC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"RLC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
iExec RLC (RLC)
SWAP completed! 3955002174-1646866782 {"uuid":"85d4b93b8945daaa68889d6655aba4e980e87ecf7d5eee6204922685db78190e","expiration":1531378483,"tradeid":0,"requestid":3955002174,"quoteid":1646866782,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"RLC","bobtomic":"0x607F4C5BB672230e8672085532f7e901544a7375","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.69307642,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"6282761035596103681","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531363403,"bobdeposit":"98d47b2f9fb3d91c1ed4e7b0e18aa2820d5b1831326d1e0c6aa81a1862855b1d","alicepayment":"845757136ae6d84078d76a46496ff4c2ec0986a99cab34d7af749bb183b96b48","bobpayment":"21bfd1cb7f6771dad622ee69ced9edf4daef0a63c197828db359e77e13f21613","paymentspent":"484f1b1f83567cc16b0324181dece7ba321175eaa49063fe91a843d3afe1fd26","Apaymentspent":"ab466e9f2b8e0ea0b98a7b9c0375f32347d01fef4f6d8a162957fe89c4b8e30b","depositspent":"4c7f6bbeb6a8a75797c10064f41f4bbc0ef8fb0cede89744b0876c7ead9c05ab","alicedexfee":"074aa01217812ce77803192aaab5a2fc9403a56c5f1908370ce485b6e5685e3f","method":"tradestatus","finishtime":1531363403}
bobdeposit https://etherscan.io/tx/0x80d39f88dd8108acd2e928ce2ea521ce42955a33b1e6cd1f175754786f157d3e
alicepayment https://kmdexplorer.ru/tx/845757136ae6d84078d76a46496ff4c2ec0986a99cab34d7af749bb183b96b48
bobpayment https://etherscan.io/tx/0x34129df1bed1230534165d57a32bf7369289b4d68d8dfee4475c49bff902c036

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RLC\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"rlc\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RLC\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"rlc\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RLC\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"rlc\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RLC\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"rlc\",\"refrel\":\"coinmarketcap\"}"
```

## RLTY

```
{\"coin\":\"RLTY\",\"name\":\"smartrealty\",\"etomic\":\"0xbe99b09709fc753b09bcf557a992f6605d5997b0\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"RLTY\"}"

home
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "status" : "active",
      "txfee" : 1000,
      "coin" : "RLTY",
      "balance" : 0,
      "wiftype" : 188,
      "pubtype" : 0,
      "height" : -1,
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "installed" : false,
      "coin" : "RLTY",
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "p2shtype" : 85,
      "height" : -1,
      "wiftype" : 188,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"RLTY\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"RLTY\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"RLTY\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"RLTY\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
SMARTRealty (RLTY)
SWAP completed! 522339470-127371988 {"uuid":"57408020df252dcf0898d256677f2370deb8ec9629b82127b1c5af05b6a99c12","expiration":1525677826,"tradeid":0,"requestid":522339470,"quoteid":127371988,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"RLTY","bobtomic":"0xbe99b09709fc753b09bcf557a992f6605d5997b0","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73635501,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"10003593315608231937","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.73636501, 0.08010000, 0.73637501, 0.08011000, 0.82841938, 0, 0, 0.82840938, 0, 0, 0],"result":"success","status":"finished","finishtime":1525662760,"bobdeposit":"278b5d6d81e1d9ab0dc3356b0bc3970c5339d8e3743542c36ee1db04e7d4e534","alicepayment":"b747edb069933160d8a08ce2871b4274e17f7bdfe08fde5f38e4b333cabf3897","bobpayment":"536d944822db6c55d97911b665ebbd6f54f451237f315122b8e3fedb592c6ac0","paymentspent":"55db1717563f6a0b2bb426edbeff323643bf79bea9425980abb062b4119f302b","Apaymentspent":"60c15e76c7e4106394ad77442d70b53d8ceabe0125b9771bf8c4ae9453314941","depositspent":"c5f7d768d6bfea37a2354c11aff3db592debceb9254a99afdfe8c61bf8efc2ad","method":"tradestatus","finishtime":1525662760}
bobdeposit https://etherscan.io/tx/0x955fc527e9bb2c4f8c8aad37a523e35201bb22873f14ce6c3fcccad6ba8effed
alicepayment http://www.kmdexplorer.ru/tx/b747edb069933160d8a08ce2871b4274e17f7bdfe08fde5f38e4b333cabf3897
bobpayment https://etherscan.io/tx/0x528a8217ac300b9bd90866000e3bcce7eabf6143a48ae4f923f3c3658fe82170
```

## ROGER

```
https://github.com/TheHolyRoger/TheHolyRogerCoin


{"coin":"ROGER","eth":false,"fname":"TheHolyRoger","name":"theholyroger","p2shtype":70,"pubtype":61,"rpcport":9662,"txfee":100000,"wiftype":176}


cd ~/wallets
git clone https://github.com/TheHolyRoger/TheHolyRogerCoin
cd TheHolyRogerCoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/theholyroger*
mkdir ~/.theholyroger
echo "server=1" >> ~/.theholyroger/theholyroger.conf
echo "txindex=1" >> ~/.theholyroger/theholyroger.conf
echo "listen=0" >> ~/.theholyroger/theholyroger.conf
echo "listenonion=0" >> ~/.theholyroger/theholyroger.conf
echo "rpcuser=barterroger" >> ~/.theholyroger/theholyroger.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.theholyroger/theholyroger.conf
echo "rpcworkqueue=64" >> ~/.theholyroger/theholyroger.conf
echo "rpcthreads=16" >> ~/.theholyroger/theholyroger.conf
chmod 0600 ~/.theholyroger/theholyroger.conf
theholyrogerd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ROGER\"}"

home
```

## RVN

```
https://bitcointalk.org/index.php?topic=2752467.0
https://github.com/RavenProject/Ravencoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,60);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,122);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"RVN\",\"name\":\"raven\",\"rpcport\":8766,\"pubtype\":60,\"p2shtype\":122,\"wiftype\":128,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/RavenProject/Ravencoin
cd Ravencoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/raven*
mkdir ~/.raven
echo "server=1" >> ~/.raven/raven.conf
echo "txindex=1" >> ~/.raven/raven.conf
echo "listen=0" >> ~/.raven/raven.conf
echo "listenonion=0" >> ~/.raven/raven.conf
echo "#proxy=127.0.0.1:9050" >> ~/.raven/raven.conf
echo "rpcuser=barterrvn" >> ~/.raven/raven.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.raven/raven.conf
chmod 0600 ~/.raven/raven.conf
ravend -daemon
raven-cli setgenerate false

curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"RVN\"}"

home
      "pubtype" : 60,
      "txfee" : 10000,
      "rpc" : "127.0.0.1:8766",
      "installed" : true,
      "coin" : "RVN",
      "smartaddress" : "RWv8PKHmwnXepCeinnZU43BPju6CN8rkcM",
      "wiftype" : 128,
      "p2shtype" : 122,
      "balance" : 0,
      "status" : "active",
      "height" : 103780,
      "KMDvalue" : 0

contabo
      "p2shtype" : 122,
      "balance" : 0,
      "coin" : "RVN",
      "wiftype" : 128,
      "pubtype" : 60,
      "smartaddress" : "RB8yufv3YTfdzYnwz5paNnnDynGJG6WsqD",
      "rpc" : "127.0.0.1:8766",
      "txfee" : 10000,
      "installed" : true,
      "KMDvalue" : 0,
      "status" : "active",
      "height" : 103766


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RVN\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"ravencoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RVN\",\"rel\":\"BTC\",\"margin\":0.07,\"refbase\":\"ravencoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RVN\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"ravencoin\",\"refrel\":\"coinmarketcap\"}"

raven-cli sendtoaddress "RB8yufv3YTfdzYnwz5paNnnDynGJG6WsqD" 1
"fee": -0.00014993
```

## RVT

```
{\"coin\":\"RVT\",\"name\":\"rivetz\",\"etomic\":\"0x3d1ba9be9f66b8ee101911bc36d3fb562eac2244\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"RVT\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "coin" : "RVT",
      "installed" : false,
      "p2shtype" : 85,
      "txfee" : 1000,
      "pubtype" : 0,
      "balance" : 0,
      "height" : -1,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188

contabo
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "coin" : "RVT",
      "status" : "active",
      "height" : -1,
      "balance" : 6,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"RVT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"RVT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"RVT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Rivetz (RVT)
SWAP completed! 1579225949-616418639 {"uuid":"5da5496caeec4a096c24e251b610b9220677126e1cdfd2a975942ef4b6a1d348","expiration":1528396030,"tradeid":0,"requestid":1579225949,"quoteid":616418639,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"RVT","bobtomic":"0x3d1ba9be9f66b8ee101911bc36d3fb562eac2244","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73500610,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"5104388350918524929","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.73501610, 0.08010000, 0.73502610, 0.08011000, 0.82690186, 0, 0, 0.82689186, 0, 0, 0],"result":"success","status":"finished","finishtime":1528381535,"bobdeposit":"96b4895482f651484fba3256bb2a0e52051dfad19f8b730d54cc6c9157c9de8e","alicepayment":"501d555ffa0dc8bc679bc2349d5f8b88025713f5e250ff00eb0e13ae90caaf1b","bobpayment":"07cb2a619d4e7dac585f8e3832b3a94f952b176e83d8a6340e380003cfac9f67","paymentspent":"bdafcab5066b44cafed18c6b3a549aa4ea215e9f1ac7c7fe02af5876087549ae","Apaymentspent":"3a24a730aed3e53845d212a8f6dc8fa6c929ab0503621b9d7182af00e4fe499f","depositspent":"3861ef9aa033c852ff7744acbe532d8b13a00b501f4dbd9fdf27309fe4dbde52","method":"tradestatus","finishtime":1528381535}
bobdeposit https://etherscan.io/tx/0x15921ff19716e95a3a0093c31667b301cc91f87b3c19d5bb5cb302856cdc395f
alicepayment https://kmdexplorer.ru/tx/501d555ffa0dc8bc679bc2349d5f8b88025713f5e250ff00eb0e13ae90caaf1b
bobpayment https://etherscan.io/tx/0xedf52c5b8afd88b9f151bd085178d542a8c23dcb34a4105004d649cc2b76f246

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RVT\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"rivetz\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RVT\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"rivetz\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"RVT\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"rivetz\",\"refrel\":\"coinmarketcap\"}"
```

## SALT

```
{\"coin\":\"SALT\",\"name\":\"salt\",\"etomic\":\"0x4156D3342D5c385a87D264F90653733592000581\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SALT\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "installed" : false,
      "balance" : 0,
      "height" : -1,
      "pubtype" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "coin" : "SALT",
      "wiftype" : 188

hetzner
      "installed" : false,
      "txfee" : 1000,
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "wiftype" : 188,
      "balance" : 7.39,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "status" : "active",
      "coin" : "SALT",
      "pubtype" : 0,
      "height" : -1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"SALT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"SALT\",\"rel\":\"KMD\",\"relvolume\":0.1,\"price\":0.12}"
SALT (SALT)
SWAP completed! 63518504-1568548026 {"uuid":"11c723afba3a504144c589c6a967a268444308907418330ee06fc6a08c2dceb1","expiration":1531375388,"tradeid":0,"requestid":63518504,"quoteid":1568548026,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"SALT","bobtomic":"0x4156D3342D5c385a87D264F90653733592000581","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.88913364,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.10009000,"alicetxfee":0.00001000,"aliceid":"14831992270670331905","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.10010000, 1.00002000, 0.10011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531360261,"bobdeposit":"e9c5c6f59c5f6a7906e2542a24dffaf7d77473a67269b747d582c6b40ba96200","alicepayment":"c064cbc143f04a31f696239e7d03be55915efd2dc34b6ac4f99fb81755935093","bobpayment":"2ad660c0f0bd463754bec1cd932671bf316a765ddd219b5b00f0ff9e02cc1351","paymentspent":"6e31d1214b853902a5cb423944810a2c0fa8f470d7180e8225c3b78f7673d2de","Apaymentspent":"0c3d5325a5801547dac7c057ccad97b638851edad11982a66cade147083209f1","depositspent":"927eb7306d354711ad0efa78acc7ebc6200c71bb10c8b886c022f6500cf16288","alicedexfee":"8dca9b1a639fc3ca703db9710a5241d53785839164c79ea3484971230c03445d","method":"tradestatus","finishtime":1531360261}
bobdeposit https://etherscan.io/tx/0x75b01a2502d7786965007529756b273aec4a9bdd2f260418a1b46256e12dfc9b
alicepayment https://kmdexplorer.ru/tx/c064cbc143f04a31f696239e7d03be55915efd2dc34b6ac4f99fb81755935093
bobpayment https://etherscan.io/tx/0x66f2004c2a40bec64ca82fcccc096bd0c41f8557240d63a8b47f75c2d418a3d6

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SALT\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"salt\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SALT\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"salt\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SALT\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"salt\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SALT\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"salt\",\"refrel\":\"coinmarketcap\"}"
```

## SAN

```
{\"coin\":\"SAN\",\"name\":\"santiment\",\"etomic\":\"0x7C5A0CE9267ED19B22F8cae653F198e3E8daf098\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SAN\"}"

home
      "coin" : "SAN",
      "wiftype" : 188,
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "txfee" : 1000,
      "height" : -1,
      "pubtype" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "status" : "active"

contabo
      "p2shtype" : 85,
      "coin" : "SAN",
      "height" : -1,
      "installed" : false,
      "balance" : 3.95,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "wiftype" : 188,
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"SAN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"SAN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"SAN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Santiment Network Token (SAN)
SWAP completed! 263997050-308327659 {"uuid":"6de96b35e2b4023c212cf09760bb1a862eca4888b0401189c5d94a3f5493e5ff","expiration":1528491151,"tradeid":0,"requestid":263997050,"quoteid":308327659,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"SAN","bobtomic":"0x7C5A0CE9267ED19B22F8cae653F198e3E8daf098","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77774861,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"14027358932782481409","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77775861, 0.08010000, 0.77776861, 0.08011000, 0.87498718, 0, 0, 0.87497718, 0, 0, 0],"result":"success","status":"finished","finishtime":1528475998,"bobdeposit":"cada5f338bee90c9ff7073d3751d2595668745facebfe3fbdf424f1aa66589c9","alicepayment":"e4040ec04ad87727daa9e5306d18fba04a51e04c6be6bfcfd592dfba3cde9307","bobpayment":"f3d559abda7b23c74096fb8c3f5478102136b64426c73136013dd905f3df7b04","paymentspent":"405331594bce3f7f7252569f48c0101be7bf14d9161363a4b6e813f57120aeb7","Apaymentspent":"12582978d76cab25693671d67703db9be75849ca75c8b1b0393aee734ce6fb22","depositspent":"ea76d69b63c7e90f385bdf874fb25f0f3adc4883619c916c0aa8da1b1a3e34e4","method":"tradestatus","finishtime":1528475998}
bobdeposit https://etherscan.io/tx/0x2da340a4fc1c81feeaaaef570f64b8452e89a3e87da97fb7135b4e217fe6bf71
alicepayment https://kmdexplorer.ru/tx/e4040ec04ad87727daa9e5306d18fba04a51e04c6be6bfcfd592dfba3cde9307
bobpayment https://etherscan.io/tx/0x46729c1cdd7cfdc73fde73ba26f617564d10b0d7c08d2cec0d79ad1c59684225

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SAN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"santiment\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SAN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"santiment\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SAN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"santiment\",\"refrel\":\"coinmarketcap\"}"
```

## SANC

```
{\"coin\":\"SANC\",\"name\":\"sancoj\",\"etomic\":\"0x03ec7bb59be036870ef696a2abf124f496d6735a\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SANC\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "status" : "active",
      "pubtype" : 0,
      "balance" : 0,
      "coin" : "SANC",
      "wiftype" : 188,
      "txfee" : 1000,
      "height" : -1,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80"

contabo
      "pubtype" : 0,
      "installed" : false,
      "status" : "active",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "balance" : 30,
      "height" : -1,
      "wiftype" : 188,
      "txfee" : 1000,
      "coin" : "SANC",
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"SANC\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"SANC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"SANC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Sancoj (SANC)
SWAP completed! 2373720386-1507931026 {"uuid":"5a222663efdf0bfa27665977f5433bbb79ce096011052b50a18c8b1d490fe73b","expiration":1527670881,"tradeid":0,"requestid":2373720386,"quoteid":1507931026,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"SANC","bobtomic":"0x03ec7bb59be036870ef696a2abf124f496d6735a","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.76295923,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"13300101371143192577","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.76296923, 0.08010000, 0.76297923, 0.08011000, 0.85834913, 0, 0, 0.85833913, 0, 0, 0],"result":"success","status":"finished","finishtime":1527655797,"bobdeposit":"e7246ebc7aac25fd87608fe9db353b98c4667b7b79c02d4cdc1634e77d6659bd","alicepayment":"c3bdafb5baf1adbebebb5ee9944680127eaa668d59f9d622dbb5e4cb0ef458ff","bobpayment":"7008d1801907e96aad6cfd1a01c6c6093164e55f33a80196b672d78c1fc7031a","paymentspent":"03454ba1c90fac519991c87b5b2d5994cfeb2e02718afb4aad6a0ada2cb64e2b","Apaymentspent":"6b19dbc33f38cf7cb9441df4c886acb6af51092e9ba9f363686b4fdb2fed9f1c","depositspent":"f95b2c2971e4963c540497349be53fee4a03ac65d0244fe1461b9d434d131f6f","method":"tradestatus","finishtime":1527655797}
bobdeposit https://etherscan.io/tx/0x6fb3d0c0405cdee876acc8d6649c4b707261cefcd233a60fed8b345fdb81c8dc
alicepayment https://kmdexplorer.ru/tx/c3bdafb5baf1adbebebb5ee9944680127eaa668d59f9d622dbb5e4cb0ef458ff
bobpayment https://etherscan.io/tx/0x383a8acbc038ed3e016b3aa50dbf2964318c2e32f7dab365689d5f46b482ff32

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"SANC\",\"fixed\":1}"
```

## SCRIV

```
https://bitcointalk.org/index.php?topic=3097184
https://github.com/ScrivNetwork/scriv


src/chainparams.cpp
// Scriv addresses start with 's'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,125);
// Scriv script addresses start with '7'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,16);
// Scriv private keys start with '7' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"SCRIV\",\"name\":\"scriv\",\"confpath\":\"${HOME#}/.scrivcore/scriv.conf\",\"rpcport\":7998,\"pubtype\":125,\"p2shtype\":16,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/ScrivNetwork/scriv
cd scriv
find . -name "*.sh" -exec chmod a+x {} \;
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/scriv*
mkdir ~/.scrivcore
echo "server=1" >> ~/.scrivcore/scriv.conf
echo "txindex=1" >> ~/.scrivcore/scriv.conf
echo "litemode=1" >> ~/.scrivcore/scriv.conf
echo "listen=0" >> ~/.scrivcore/scriv.conf
echo "listenonion=0" >> ~/.scrivcore/scriv.conf
echo "#proxy=127.0.0.1:9050" >> ~/.scrivcore/scriv.conf
echo "rpcuser=barterscriv" >> ~/.scrivcore/scriv.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.scrivcore/scriv.conf
chmod 0600 ~/.scrivcore/scriv.conf
scrivd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SCRIV\"}"

home
      "wiftype" : 204,
      "pubtype" : 125,
      "installed" : true,
      "status" : "active",
      "KMDvalue" : 0,
      "coin" : "SCRIV",
      "balance" : 0,
      "txfee" : 10000,
      "height" : 10912,
      "smartaddress" : "sftLPNfW6WebyNiMP4DBaBsXegqWafQy6y",
      "rpc" : "127.0.0.1:7998",
      "p2shtype" : 16

contabo
      "status" : "active",
      "balance" : 0,
      "p2shtype" : 16,
      "wiftype" : 204,
      "installed" : true,
      "coin" : "SCRIV",
      "txfee" : 10000,
      "pubtype" : 125,
      "smartaddress" : "sL7BujHmhBnb9iraaMUHtwUMta1cQB6Ymc",
      "height" : 10893,
      "rpc" : "127.0.0.1:7998",
      "KMDvalue" : 0

scriv-cli sendtoaddress "sL7BujHmhBnb9iraaMUHtwUMta1cQB6Ymc" 1
scriv-cli sendtoaddress "sL7BujHmhBnb9iraaMUHtwUMta1cQB6Ymc" 1.2
"fee": -0.00000225

```

## SEQ

```
https://bitcointalk.org/index.php?topic=1902896
https://github.com/duality-solutions/Sequence


src/chainparams.cpp
// Sequence PUBKEY_ADDRESS addresses start with 'S'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,63);
// Sequence SCRIPT_ADDRESS addresses start with 'S or T'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,64);
// Sequence SECRET_KEY start with '2'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,170);

src/wallet/wallet.h
DEFAULT_TRANSACTION_FEE = MIN_TX_FEE;
src/amount.h
MIN_TX_FEE = CENT;
CENT    = 100000;

{\"coin\":\"SEQ\",\"name\":\"sequence\",\"rpcport\":16663,\"pubtype\":63,\"p2shtype\":64,\"wiftype\":170,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/duality-solutions/Sequence
cd Sequence
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc
make -j4
sudo make install
mkdir ~/.sequence
echo "server=1" >> ~/.sequence/sequence.conf
echo "listen=0" >> ~/.sequence/sequence.conf
echo "listenonion=0" >> ~/.sequence/sequence.conf
echo "rpcuser=barterseq" >> ~/.sequence/sequence.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.sequence/sequence.conf
chmod 0600 ~/.sequence/sequence.conf
sequenced -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SEQ\"}"

-> 0x03 hats getan
```

## SIB

```
https://bitcointalk.org/index.php?topic=1153781.0
https://github.com/ivansib/sibcoin

src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,63);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,40);
base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1,128);

src/wallet/wallet.h
static const CAmount DEFAULT_TRANSACTION_MINFEE = 10000;

{\"coin\":\"SIB\",\"name\":\"sibcoin\",\"rpcport\":1944,\"pubtype\":63,\"p2shtype\":40,\"wiftype\":128,\"txfee\":10000}

cd ~/wallets
git clone https://github.com/ivansib/sibcoin
cd sibcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/sibcoin*
mkdir ~/.sibcoin
echo "server=1" >> ~/.sibcoin/sibcoin.conf
echo "txindex=1" >> ~/.sibcoin/sibcoin.con
echo "litemode=1" >> ~/.sibcoin/sibcoin.conff
echo "listen=0" >> ~/.sibcoin/sibcoin.conf
echo "listenonion=1" >> ~/.sibcoin/sibcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.sibcoin/sibcoin.conf
echo "rpcuser=bartersib" >> ~/.sibcoin/sibcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.sibcoin/sibcoin.conf
echo "rpcworkqueue=64" >> ~/.sibcoin/sibcoin.conf
echo "rpcthreads=16" >> ~/.sibcoin/sibcoin.conf
chmod 0600 ~/.sibcoin/sibcoin.conf
sibcoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SIB\"}"

home
   {
      "smartaddress" : "SivwLeBe5KvHGW4ys3ZRWQzkdQs2WHhHtN",
      "coin" : "SIB",
      "wiftype" : 128,
      "estimatedrate" : 20,
      "rpc" : "127.0.0.1:1944",
      "pubtype" : 63,
      "status" : "active",
      "txfee" : 10000,
      "p2shtype" : 40
   },

contabo
   {
      "p2shtype" : 40,
      "rpc" : "127.0.0.1:1944",
      "coin" : "SIB",
      "pubtype" : 63,
      "wiftype" : 128,
      "smartaddress" : "SP9nrzoug14GSrDD4LpXqAbasJ38NPWK6Y",
      "status" : "active",
      "txfee" : 10000
   },

sibcoin-cli sendtoaddress "SP9nrzoug14GSrDD4LpXqAbasJ38NPWK6Y" 1.41125930
"fee": -0.00031120
sibcoin-cli sendtoaddress "SP9nrzoug14GSrDD4LpXqAbasJ38NPWK6Y" 1.72419168
"fee": -0.00036960,
sibcoin-cli sendtoaddress "SP9nrzoug14GSrDD4LpXqAbasJ38NPWK6Y" 2.11453
"fee": -0.00007480
```

## SMART

```
https://bitcointalk.org/index.php?topic=2560430.0
https://github.com/SmartCash/smartcash


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,63);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,18);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,191);

src/wallet/wallet.h
static const CAmount DEFAULT_FALLBACK_FEE = 20000;
static const CAmount DEFAULT_TRANSACTION_MINFEE = 1000;
src/primitives/transaction.cpp
nMinFee = 100000;

{\"coin\":\"SMART\",\"name\":\"smartcash\",\"rpcport\":9679,\"pubtype\":63,\"p2shtype\":18,\"wiftype\":191,\"txfee\":200000}


cd ~/wallets
git clone https://github.com/SmartCash/smartcash
cd smartcash
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/smartcash*
mkdir ~/.smartcash
echo "server=1" >> ~/.smartcash/smartcash.conf
echo "txindex=1" >> ~/.smartcash/smartcash.conf
echo "listen=0" >> ~/.smartcash/smartcash.conf
echo "listenonion=1" >> ~/.smartcash/smartcash.conf
echo "litemode=1" >> ~/.smartcash/smartcash.conf
echo "smartnode=0" >> ~/.smartcash/smartcash.conf
echo "#proxy=127.0.0.1:9050" >> ~/.smartcash/smartcash.conf
echo "rpcuser=bartersmart" >> ~/.smartcash/smartcash.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.smartcash/smartcash.conf
chmod 0600 ~/.smartcash/smartcash.conf
smartcashd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SMART\"}"

home
      "installed" : true,
      "p2shtype" : 18,
      "status" : "active",
      "coin" : "SMART",
      "smartaddress" : "SivwLeBe5KvHGW4ys3ZRWQzkdQs2VPeSYQ",
      "KMDvalue" : 0,
      "height" : 357736,
      "txfee" : 200000,
      "pubtype" : 63,
      "wiftype" : 191,
      "balance" : 0,
      "rpc" : "127.0.0.1:9679"

contabo
      "installed" : true,
      "rpc" : "127.0.0.1:9679",
      "p2shtype" : 18,
      "height" : 359030,
      "smartaddress" : "SP9nrzoug14GSrDD4LpXqAbasJ38Pmk8Hw",
      "balance" : 0,
      "pubtype" : 63,
      "wiftype" : 191,
      "coin" : "SMART",
      "status" : "active",
      "txfee" : 200000,
      "KMDvalue" : 0


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SMART\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"smartcash\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SMART\",\"rel\":\"BTC\",\"margin\":0.07,\"refbase\":\"smartcash\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SMART\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"smartcash\",\"refrel\":\"coinmarketcap\"}"

smartcash-cli sendtoaddress "SP9nrzoug14GSrDD4LpXqAbasJ38Pmk8Hw" 1
smartcash-cli sendtoaddress "SP9nrzoug14GSrDD4LpXqAbasJ38Pmk8Hw" 1.2
"fee": -0.00100000
```

## SMC

```
https://bitcointalk.org/index.php?topic=675821
https://github.com/psionin/smartcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,63);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,191);

src/wallet/wallet.cpp
minTxFee = CFeeRate(1000);
src/main.cpp
minRelayTxFee = CFeeRate(CENT);
src/amount.h
CENT = 1000000

{\"coin\":\"SMC\",\"name\":\"smartcoin\",\"rpcport\":58583,\"pubtype\":63,\"p2shtype\":5,\"wiftype\":191,\"txfee\":1000000}


cd ~/wallets
git clone https://github.com/psionin/smartcoin
cd smartcoin
vi src/main.cpp
#rejected nVersion wech
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/smartcoin*
mkdir ~/.smartcoin
echo "server=1" >> ~/.smartcoin/smartcoin.conf
echo "txindex=1" >> ~/.smartcoin/smartcoin.conf
echo "listen=0" >> ~/.smartcoin/smartcoin.conf
echo "rpcport=8583" >> ~/.smartcoin/smartcoin.conf
echo "rpcuser=bartersmc" >> ~/.smartcoin/smartcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.smartcoin/smartcoin.conf
chmod 0600 ~/.smartcoin/smartcoin.conf
smartcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SMC\"}"

home
   {
      "smartaddress" : "SivwLeBe5KvHGW4ys3ZRWQzkdQs2WHhHtN",
      "coin" : "SMC",
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:58583",
      "status" : "active",
      "pubtype" : 63,
      "wiftype" : 191,
      "txfee" : 1000000
   },

contabo
      "rpc" : "127.0.0.1:58583",
      "coin" : "SMC",
      "p2shtype" : 5,
      "KMDvalue" : 0.06282028,
      "wiftype" : 191,
      "txfee" : 1000000,
      "height" : 953341,
      "balance" : 22.89384,
      "pubtype" : 63,
      "smartaddress" : "SP9nrzoug14GSrDD4LpXqAbasJ38NPWK6Y",
      "installed" : true,
      "status" : "active"

smartcoin-cli sendtoaddress "SP9nrzoug14GSrDD4LpXqAbasJ38NPWK6Y" 10.69576992
"fee" : -0.00372000,
```

## SNT

```
{\"coin\":\"SNT\",\"name\":\"status\",\"etomic\":\"0x744d70FDBE2Ba4CF95131626614a1763DF805B9E\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SNT\"}"

home
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "height" : -1,
      "p2shtype" : 85,
      "txfee" : 1000,
      "coin" : "SNT",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "installed" : false,
      "wiftype" : 188,
      "pubtype" : 0

contabo
      "height" : -1,
      "wiftype" : 188,
      "balance" : 0,
      "pubtype" : 0,
      "status" : "active",
      "coin" : "SNT",
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"SNT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"SNT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"SNT\",\"rel\":\"KMD\",\"relvolume\":0.1,\"price\":0.12}"
Status (SNT)
SWAP completed! 546293126-4165698148 {"uuid":"0f28a50a1882578397a8f2bf494d92d3627e29a4e2d112e25d8b46cb578dff9b","expiration":1531208378,"tradeid":0,"requestid":546293126,"quoteid":4165698148,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"SNT","bobtomic":"0x744d70FDBE2Ba4CF95131626614a1763DF805B9E","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.88755909,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.10009000,"alicetxfee":0.00001000,"aliceid":"13037158098682249217","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.10010000, 1.00002000, 0.10011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531193299,"bobdeposit":"1c6077d8e9458e9bb16bb72147b029c749504e5180f978d7324fb68db7d98b1c","alicepayment":"698bec36a43b946f5d0057c55b8dd007ba52fc928e38ee697fe01edd6ab3655b","bobpayment":"01a37224b12f8ff2d56b89f0d90250f05344da32e7ddb8c91045dfccdec72263","paymentspent":"6a67f8f84f94f24b9810b49e783a023a8544a77fb21c2c967345817f0a609e9c","Apaymentspent":"fea78b5b6ff11de5b779b5ba557366de65bcbe6d3bc9ead70e3abada517a8655","depositspent":"d56f56e8ba93abbcd3c98342491b994deb87f0fca1e0ab2abb9afc6fabaaa7bb","alicedexfee":"706917d64644ab62ddec1ad6c74f663666dfab39e605173d1c25a909a747c7bd","method":"tradestatus","finishtime":1531193299}
bobdeposit https://etherscan.io/tx/0xd3e99a9cbca5d2dc42836fecdecae98ca8911071faeff79f315602ceb3d80cc4
alicepayment https://kmdexplorer.ru/tx/698bec36a43b946f5d0057c55b8dd007ba52fc928e38ee697fe01edd6ab3655b
bobpayment https://etherscan.io/tx/0x866a4f41a376844c9add83f859fa61b4c2c71eff4f70e42f229a2753e674ec48

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SNT\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"status\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SNT\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"status\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SNT\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"status\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SNT\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"status\",\"refrel\":\"coinmarketcap\"}"
```

## SPANK

```
{\"coin\":\"SPANK\",\"name\":\"spankchain\",\"etomic\":\"0x42d6622dece394b54999fbd73d108123806f6a18\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SPANK\"}"

home
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "pubtype" : 0,
      "height" : -1,
      "installed" : false,
      "status" : "active",
      "wiftype" : 188,
      "coin" : "SPANK",
      "p2shtype" : 85,
      "balance" : 0

contabo
      "p2shtype" : 85,
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "SPANK",
      "pubtype" : 0,
      "installed" : false,
      "status" : "active",
      "balance" : 50.99,
      "wiftype" : 188,
      "txfee" : 1000,
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"SPANK\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"SPANK\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"SPANK\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
SpankChain (SPANK)
SWAP completed! 970704500-371382975 {"warning":"swaps in critical section, dont exit now","critical":1531086634,"endcritical":1531083193,"uuid":"6aca3b010be1ebc0e69323a522944cab998663ed4727537431262631d9da5cda","expiration":1531097934,"tradeid":0,"requestid":970704500,"quoteid":371382975,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"SPANK","bobtomic":"0x42d6622dece394b54999fbd73d108123806f6a18","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.73632501,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"1711825761501708289","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531086710,"bobdeposit":"e72b9356974b9b6b0c5bf38ac9ca9e148f17877bf77658b6e151a919e4ffba96","alicepayment":"9566f942a04a087fedf2034f1ced04ec6e8967741ace167e6c28cb4369c640fc","bobpayment":"e23cc38f6060b6bdc904d7a8e906ec579a2d56a2e760e295a1e6fa2280e41d54","paymentspent":"2bd9f558cd28effd212a1ed83396a5de66c592ccbe96a451bb39a45b9f8521a2","Apaymentspent":"aa7721ed456312faea7e681c853df09c548e1329fd05a37a0008e52e549e4188","depositspent":"6aa87d1c996ffd99c5aa9411ee71fa4a8cd6121a2420a236b886a049594708aa","alicedexfee":"94e87f5a5c4e48de8cac9392c747b83946b2e1330d6637048400f7d217420181","method":"tradestatus","finishtime":1531086710}
bobdeposit https://etherscan.io/tx/0xa3348511c1d93547e7cf3d7e7de9b8eb228e8f0405614093012c6d4e27733130
alicepayment https://kmdexplorer.ru/tx/9566f942a04a087fedf2034f1ced04ec6e8967741ace167e6c28cb4369c640fc
bobpayment https://etherscan.io/tx/0x63cf4c6ab3c97574a7c223ca4c5dd65b8a07bfe9d676274b4d151a0e500cc8c9

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SPANK\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"spankchain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SPANK\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"spankchain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SPANK\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"spankchain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SPANK\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"spankchain\",\"refrel\":\"coinmarketcap\"}"
```

## SPK

```
https://bitcointalk.org/index.php?topic=2634042.0
https://github.com/sparkscrypto/Sparks


src/chainparams.cpp
// Sparks addresses start with 'G'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,38);
// Sparks script addresses start with '5'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,10);
// Sparks private keys start with '5' or 'G' (?)
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,198);

{\"coin\":\"SPK\",\"name\":\"Sparks\",\"rpcport\":8892,\"pubtype\":38,\"p2shtype\":10,\"wiftype\":198,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/sparkscrypto/Sparks
cd Sparks
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/Sparks*
mkdir ~/.Sparks
echo "server=1" >> ~/.Sparks/Sparks.conf
echo "txindex=1" >> ~/.Sparks/Sparks.conf
echo "litemode=1" >> ~/.Sparks/Sparks.conf
echo "listen=0" >> ~/.Sparks/Sparks.conf
echo "listenonion=0" >> ~/.Sparks/Sparks.conf
echo "#proxy=127.0.0.1:9050" >> ~/.Sparks/Sparks.conf
echo "rpcuser=barterspk" >> ~/.Sparks/Sparks.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.Sparks/Sparks.conf
chmod 0600 ~/.Sparks/Sparks.conf
Sparksd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SPK\"}"

home
```

## SRN

```
{\"coin\":\"SRN\",\"name\":\"sirin-labs-token\",\"etomic\":\"0x68d57c9a1c35f63e2c83ee8e49a64e9d70528d25\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SRN\"}"

home
      "height" : -1,
      "p2shtype" : 85,
      "wiftype" : 188,
      "installed" : false,
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "coin" : "SRN"

contabo
      "coin" : "SRN",
      "p2shtype" : 85,
      "installed" : false,
      "balance" : 0,
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "status" : "active",
      "wiftype" : 188,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"SRN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"SRN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"SRN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
SIRIN LABS Token (SRN)
SWAP completed! 1603632511-2438694354 {"uuid":"96e1a55095c67da3907e6f5680c4abf07f047557a259efdf975610faf55bfffe","expiration":1528028860,"tradeid":0,"requestid":1603632511,"quoteid":2438694354,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"SRN","bobtomic":"0x68d57c9a1c35f63e2c83ee8e49a64e9d70528d25","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.69550933,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"12122049632554450945","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.69551933, 0.08010000, 0.69552933, 0.08011000, 0.78246799, 0, 0, 0.78245799, 0, 0, 0],"result":"success","status":"finished","finishtime":1528016673,"bobdeposit":"84e3bd77271a8786be9132378b792ac06d71162d5e028c621428a0532cb03631","alicepayment":"139c6f16b9142798a73ee6c7bc9c008c09da2309432b2d991652f5165f25a6ad","bobpayment":"23fc7a680b52bf25dd52c13dc55b01616f142ef586abcdfa643830d20e51a393","paymentspent":"4897f842851fc438f4f615e9860e33404e1eb21cc7dfc1346a9ff04a981b6c8c","Apaymentspent":"f2aba9ad67bb53c7a3bc6effcf6ed6290d06b6c04285cd5bf7438c87bbf446cd","depositspent":"b7b795f95d49c5ff62ba2da019157668018365f9e83478b6c7a2db4c1e9cc242","method":"tradestatus","finishtime":1528016673}
bobdeposit https://etherscan.io/tx/0x43a64d5cbb34fd3c3ece8da4c9271a7ff107e962fe213abaed48e251d54352ec
alicepayment https://kmdexplorer.ru/tx/139c6f16b9142798a73ee6c7bc9c008c09da2309432b2d991652f5165f25a6ad
bobpayment https://etherscan.io/tx/0x28bec0d968f37149d3a4b4b8a8ff5a531a2c4c7cf55b197f9099689c76a262da

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SRN\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"sirin-labs-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SRN\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"sirin-labs-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SRN\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"sirin-labs-token\",\"refrel\":\"coinmarketcap\"}"
```

## STAK

```
https://bitcointalk.org/index.php?topic=2433318.0
https://github.com/straks/straks


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,63);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

src/wallet/wallet.h
CAmount DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_TRANSACTION_MINFEE = 1000;
WALLET_INCREMENTAL_RELAY_FEE = 5000;
src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 10000; //TODO--

{\"coin\":\"STAK\",\"name\":\"straks\",\"rpcport\":7574,\"pubtype\":63,\"p2shtype\":5,\"wiftype\":204,\"txfee\":10000}

cd ~/wallets
git clone https://github.com/straks/straks
cd straks
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j2
sudo make install
sudo strip /usr/local/bin/straks*
mkdir ~/.straks
echo "server=1" >> ~/.straks/straks.conf
echo "txindex=1" >> ~/.straks/straks.conf
echo "litemode=1" >> ~/.straks/straks.conf
echo "listen=0" >> ~/.straks/straks.conf
echo "listenonion=1" >> ~/.straks/straks.conf
echo "#proxy=127.0.0.1:9050" >> ~/.straks/straks.conf
echo "rpcuser=barterstak" >> ~/.straks/straks.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.straks/straks.conf
chmod 0600 ~/.straks/straks.conf
straksd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"STAK\"}"

home
      "wiftype" : 204,
      "installed" : true,
      "height" : 33332,
      "rpc" : "127.0.0.1:7574",
      "coin" : "STAK",
      "txfee" : 10000,
      "smartaddress" : "SivwLeBe5KvHGW4ys3ZRWQzkdQs2WHhHtN",
      "balance" : 0,
      "KMDvalue" : 0,
      "p2shtype" : 5,
      "pubtype" : 63,
      "status" : "active"

contabo
      "txfee" : 10000,
      "height" : 33332,
      "KMDvalue" : 0,
      "pubtype" : 63,
      "status" : "active",
      "rpc" : "127.0.0.1:7574",
      "installed" : true,
      "balance" : 0,
      "coin" : "STAK",
      "p2shtype" : 5,
      "smartaddress" : "SP9nrzoug14GSrDD4LpXqAbasJ38NPWK6Y",
      "wiftype" : 204

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STAK\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"straks\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STAK\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"straks\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STAK\",\"rel\":\"BTC\",\"margin\":0.07,\"refbase\":\"straks\",\"refrel\":\"coinmarketcap\"}"
```

## STORJ

```
{\"coin\":\"STORJ\",\"name\":\"storj\",\"etomic\":\"0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"STORJ\"}"

home
      "rpc" : "127.0.0.1:80",
      "coin" : "STORJ",
      "installed" : false,
      "balance" : 0,
      "status" : "active",
      "pubtype" : 0,
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188,
      "txfee" : 1000,
      "height" : -1

contabo
      "pubtype" : 0,
      "balance" : 0,
      "status" : "active",
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "txfee" : 1000,
      "height" : -1,
      "wiftype" : 188,
      "coin" : "STORJ",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"STORJ\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"STORJ\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"STORJ\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Storj (STORJ)
SWAP completed! 1855231112-3963185366 {"uuid":"00ced8ec257594e688854919aab5b1351e917f06f76f63760623807d9bb9b8bc","expiration":1528134067,"tradeid":0,"requestid":1855231112,"quoteid":3963185366,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"STORJ","bobtomic":"0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.68133671,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"15396841264434118656","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.68134671, 0.08010000, 0.68135671, 0.08011000, 0.76652379, 0, 0, 0.76651379, 0, 0, 0],"result":"success","status":"finished","finishtime":1528121304,"bobdeposit":"080a8d6bc566317b2e89c13899597bebccc8ed11326d7e06f92bf2cde543beaf","alicepayment":"2167b9a764906a30b3b11b59a7a31c2a6dda1336bcf1ab1d0dd7cb289bca9f4c","bobpayment":"3bdeda983b72435a26f57812ba88a0ec2f5180696c870011bed2109097b716d2","paymentspent":"4061c4da907d85b882d07d205e53df7cf58e2a1887e07f7aa56f3229272ad810","Apaymentspent":"5d7fb968aa31607319990ccde83011f551ecbbda3638b7c9e02c3fcf650e5082","depositspent":"e4235993777f6ce8792d65498f2fdf49beaf6ea41e1d3d3fabc9dfc3f792caca","method":"tradestatus","finishtime":1528121304}
bobdeposit https://etherscan.io/tx/0x98c70802cd4d66fe0c0a12d273b2253bc3f8eed5540a92438663774e3db441c3
alicepayment https://kmdexplorer.ru/tx/2167b9a764906a30b3b11b59a7a31c2a6dda1336bcf1ab1d0dd7cb289bca9f4c
bobpayment https://etherscan.io/tx/0x17ed25c7b206449c0174a364765b2491d3f69e5409b555b45ee033325941923d

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STORJ\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"storj\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STORJ\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"storj\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STORJ\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"storj\",\"refrel\":\"coinmarketcap\"}"
```

## STORM

```
{\"coin\":\"STORM\",\"name\":\"storm\",\"etomic\":\"0xd0a4b8946cb52f0661273bfbc6fd0e0c75fc6433\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"STORM\"}"

home
      "wiftype" : 188,
      "txfee" : 1000,
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "installed" : false,
      "coin" : "STORM",
      "pubtype" : 0,
      "status" : "active",
      "balance" : 0

contabo
      "txfee" : 1000,
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "balance" : 888.75456607,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "installed" : false,
      "status" : "active",
      "coin" : "STORM",
      "pubtype" : 0,
      "p2shtype" : 85

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"STORM\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"STORM\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"STORM\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Storm (STORM)
SWAP completed! 2463835040-2290425302 {"uuid":"5602a1a073edb2ed5aeca948ee4cea84b7808836b77a208cc73a797559fad569","expiration":1529638123,"tradeid":0,"requestid":2463835040,"quoteid":2290425302,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"STORM","bobtomic":"0xd0a4b8946cb52f0661273bfbc6fd0e0c75fc6433","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.75149664,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"7482385559396483073","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1529623015,"bobdeposit":"4fbdeb5594dfa13f402516c280ac419f2dbdef20e0659e229ef1f9450f7c732b","alicepayment":"9c34ea142f7261685e03c42257f1183e82d725dc77af660a96591465c3e5a73a","bobpayment":"97c04c8530577e91075dd11c3525507a4fc6c12a0c2ff22490b2f9c04f4d9cd1","paymentspent":"0dfa1846967fd92463b07309f9237af1ca159aed9abe1014b428154de07642df","Apaymentspent":"bd8d7874a9f3475d1fb994f55a5fbf3d8d5e020b312820d40651fb602b1314a3","depositspent":"6abba08d065f917dc9237b64d845002b213572b68ac95ed2244a64a4c555c412","method":"tradestatus","finishtime":1529623015}
bobdeposit https://etherscan.io/tx/0xae9450cb516a7b2d3a694677a5e9a9996540e4d2b49df074886e523a6414b937
alicepayment https://kmdexplorer.ru/tx/9c34ea142f7261685e03c42257f1183e82d725dc77af660a96591465c3e5a73a
bobpayment https://etherscan.io/tx/0x7a5640b45b3c59ca1dea67cfa1ab85d37b42586f330827b8d15dd7138cd668ff

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STORM\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"storm\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STORM\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"storm\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STORM\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"storm\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"STORM\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"storm\",\"refrel\":\"coinmarketcap\"}"
```

## STRM41

```
{\"coin\":\"STRM41\",\"name\":\"stream41\",\"etomic\":\"0xbad7a7f7ba71ce3659fe6dcad34af86b9de2a4b2\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"STRM41\"}"

home
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "coin" : "STRM41",
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "status" : "active",
      "p2shtype" : 85,
      "balance" : 0,
      "installed" : false,
      "wiftype" : 188,
      "txfee" : 1000

contabo
      "installed" : false,
      "pubtype" : 0,
      "p2shtype" : 85,
      "txfee" : 1000,
      "balance" : 20,
      "height" : -1,
      "coin" : "STRM41",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"STRM41\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"STRM41\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"STRM41\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Stream41 (STRM41)
SWAP completed! 3890127189-642798568 {"uuid":"ef71761e3edddd4c2600ed27a2285b68fd9a142eab55f8efa697e652e7d49ffe","expiration":1531111232,"tradeid":0,"requestid":3890127189,"quoteid":642798568,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"STRM41","bobtomic":"0xbad7a7f7ba71ce3659fe6dcad34af86b9de2a4b2","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67330297,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"16065025003385716737","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531097226,"bobdeposit":"f7d6c7784e935fb3ffe2a14452d2a96c20170e2ba31d4b72cb1208eec1ca372a","alicepayment":"5050622f72eaa9b0167d53d59522299cfe9fd8f6774feff75b227145c6be4f1e","bobpayment":"bca27c5eebcea1a6964700b9b8b05b12634e83c51b4450329bc600d6d719dcae","paymentspent":"3acd78342004f7fa188ab66cb2b0978642e72bf37cee14a4768950182127c3a1","Apaymentspent":"a09c172297f7559799f8a09ea619b008bfb0503b0871b9788427dd6911161da4","depositspent":"828fd8978a9a942dabeaf6161e7f88e7a568177d60b07f965b5c567c1bd26b41","alicedexfee":"d4e98e930a69dbf44664b17e66bc2919e98e04685b03742d6aaf72dcdf99fba4","method":"tradestatus","finishtime":1531097226}
bobdeposit https://etherscan.io/tx/0xb2b7db664427f2b4815b88a08af05b1e0f0807f95cfa72c4026794753d54a291
alicepayment https://kmdexplorer.ru/tx/5050622f72eaa9b0167d53d59522299cfe9fd8f6774feff75b227145c6be4f1e
bobpayment https://etherscan.io/tx/0x941fda66de50c61f61c07f7413a6f838fd23190199d2e8ba0cd3f1d3794ca8de

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"STRM41\",\"fixed\":1}"
```

## STWY

```
{\"coin\":\"STWY\",\"name\":\"storweeytoken\",\"etomic\":\"0x8a8c71f032362fca2994f75d854f911ec381ac5a\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"STWY\"}"

home
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "status" : "active",
      "installed" : false,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "pubtype" : 0,
      "p2shtype" : 85,
      "balance" : 0,
      "coin" : "STWY",
      "txfee" : 1000

contabo
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "status" : "active",
      "txfee" : 1000,
      "pubtype" : 0,
      "p2shtype" : 85,
      "coin" : "STWY",
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"STWY\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"STWY\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"STWY\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"STWY\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
StorweeyToken (STWY)
SWAP completed! 873207879-1209098854 {"uuid":"c37bddea9fa1e49535ff266c4293b2d86f339a4a8c913fd8c846a51afdae6e64","expiration":1526271498,"tradeid":0,"requestid":873207879,"quoteid":1209098854,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"STWY","bobtomic":"0x8a8c71f032362fca2994f75d854f911ec381ac5a","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67674000,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"11408600110391689217","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67675000, 0.08010000, 0.67676000, 0.08011000, 0.76135250, 0, 0, 0.76134250, 0, 0, 0],"result":"success","status":"finished","finishtime":1526256297,"bobdeposit":"15e0e9aecc6cac6e0019d81551568cd552dc8220fdc6914b2b047542971c527f","alicepayment":"54ecf0a53ffb490c7d2a39eeb97d019e234cb0fd5392efdc9d203af51dfbd2cb","bobpayment":"69c5213a0e612619a9064dc28457ca93e24e6930ee5c42371aaf18fd1faf7a1c","paymentspent":"39f6aae8bad1e51f03ebbe3d47b95ac36395a976b276bd78b8e617f943178d39","Apaymentspent":"f8fde5c7d2babac47e38d6d5598447d4041d7a6a100c68f101bed9fca18a578b","depositspent":"1ae91f3bfaa634421767d27e041acee3fb99390d2a8eb1d60e928ce743525d51","method":"tradestatus","finishtime":1526256297}
bobdeposit https://etherscan.io/tx/0x32a8c35190e084d987fbab6517d6bb0f11765e9dabe91e33ced918033de2c35f
alicepayment https://kmdexplorer.ru/tx/54ecf0a53ffb490c7d2a39eeb97d019e234cb0fd5392efdc9d203af51dfbd2cb
bobpayment https://etherscan.io/tx/0xb9c660c6431609d6c60ffab2ef87c02250657e8328ee06f21ebd1664d841d4e9
```

## SUB

```
{\"coin\":\"SUB\",\"name\":\"substratum\",\"etomic\":\"0x12480e24eb5bec1a9d4369cab6a80cad3c0a377a\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SUB\"}"

home
      "p2shtype" : 85,
      "balance" : 0,
      "status" : "active",
      "installed" : false,
      "coin" : "SUB",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188,
      "height" : -1,
      "txfee" : 1000,
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80"

contabo
      "txfee" : 1000,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "coin" : "SUB",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "wiftype" : 188,
      "installed" : false,
      "status" : "active",
      "balance" : 8.66,
      "p2shtype" : 85,
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"SUB\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"SUB\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"SUB\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Substratum (SUB)
SWAP completed! 701665258-2231349848 {"uuid":"e3d0fc89d98c3130a5d4b22157d5f9da27e41f74463a897bd1c4091cde2509fc","expiration":1531273182,"tradeid":0,"requestid":701665258,"quoteid":2231349848,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"SUB","bobtomic":"0x12480e24eb5bec1a9d4369cab6a80cad3c0a377a","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.69668704,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"7458418953806479361","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531258936,"bobdeposit":"f252c9c35177690048e9b2412df94418be1303080063cb0072baa8c9c7e9eea6","alicepayment":"2359708f81788d3e33b4ab58c2b29dc81ef804ea5c16825da7c9b07e8db7159c","bobpayment":"afa920d3e0f0ec5796e959a4013689116169441a55fbc511e2fd47d3ee04a504","paymentspent":"cbf12ea2b0a58ba63eed7ad79791d8925acc2d7b4f6aa78e79b682db89c86d57","Apaymentspent":"2ca107a7ad5a66f73b9b0908b54ecd31e20d34c6ef2653ba915009adb0bb0aca","depositspent":"bdfdf80bc2c716165449a636c31dff158b80f264d4e9bb22715da523e8e7b671","alicedexfee":"4a7f078928a13a1eba1b1de409c89772c511962d3bbbc5ef3b03ae7c42822159","method":"tradestatus","finishtime":1531258936}
bobdeposit https://etherscan.io/tx/0x12f7f224161c7f1310f9b11a659090fddbbb6ffd76fd7a64c6f1cf2ca3f406ef
alicepayment https://kmdexplorer.ru/tx/2359708f81788d3e33b4ab58c2b29dc81ef804ea5c16825da7c9b07e8db7159c
bobpayment https://etherscan.io/tx/0x98e368d7525e2d135c7c584056aa12657a9e90ae57f99ae78b8469cf23f5d6e0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SUB\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"substratum\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SUB\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"substratum\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SUB\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"substratum\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SUB\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"substratum\",\"refrel\":\"coinmarketcap\"}"
```

## SWT

```
{\"coin\":\"SWT\",\"name\":\"swarm-city\",\"etomic\":\"0xB9e7F8568e08d5659f5D29C4997173d84CdF2607\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SWT\"}"

home
      "balance" : 0,
      "installed" : false,
      "height" : -1,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "txfee" : 1000,
      "status" : "active",
      "coin" : "SWT",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "wiftype" : 188

contabo
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "status" : "active",
      "coin" : "SWT",
      "p2shtype" : 85,
      "txfee" : 1000,
      "pubtype" : 0,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "wiftype" : 188,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"SWT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"SWT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"SWT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Swarm City (SWT)
SWAP completed! 1233544006-1987155967 {"uuid":"de3efe77996ef643efcfab9761059b765a89e2f6c3ca1f11a48430de8ab1bba4","expiration":1528842385,"tradeid":0,"requestid":1233544006,"quoteid":1987155967,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"SWT","bobtomic":"0xB9e7F8568e08d5659f5D29C4997173d84CdF2607","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67903057,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"13915678367335710721","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67904057, 0.08010000, 0.67905057, 0.08011000, 0.76392939, 0, 0, 0.76391939, 0, 0, 0],"result":"success","status":"finished","finishtime":1528827088,"bobdeposit":"d6ebbb4abc3607c16aef12c335a0487ea2b481282403dac39662710458b40694","alicepayment":"2de85679d08643528c58beaaa0743e2a127611c859a9134dfd56572641aeb27f","bobpayment":"570f5a9445b60018bd45a20cc9519fc3dd86f537d739bec8f07b99c495995272","paymentspent":"d58ffcfc78137cbb795ecd2a3302c3cbb39e9bed575dffa2e32a474795d683f6","Apaymentspent":"6bf6d1d9cc68fd386058efa478b2116360fb6478f9b7a99100fb582e42983123","depositspent":"7361f3db9a06f038c7b315b2d8c93e3a4db0e0cbecac6db4da76968710620d82","method":"tradestatus","finishtime":1528827088}
bobdeposit https://etherscan.io/tx/0xeb18a6ff004f7618691299150791e3e7977e5d8512a40486a4df6e0937ac0a77
alicepayment https://kmdexplorer.ru/tx/2de85679d08643528c58beaaa0743e2a127611c859a9134dfd56572641aeb27f
bobpayment https://etherscan.io/tx/0xd2b59e636f758a37523ee1091cb33b14ce80a1aca72d3efd4cf3a5176eb66409

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SWT\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"swarm-city\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SWT\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"swarm-city\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"SWT\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"swarm-city\",\"refrel\":\"coinmarketcap\"}"
```

## SXC

```
https://bitcointalk.org/index.php?topic=1272422.0
https://github.com/sexcoin-project/sexcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = list_of(62);
base58Prefixes[SCRIPT_ADDRESS] = list_of(5);
base58Prefixes[SECRET_KEY] =     list_of(190);

src/main.h
DEFAULT_TX_FEE = 100000; // 0.001 LTC

{\"coin\":\"SXC\",\"name\":\"sexcoin\",\"rpcport\":9561,\"pubtype\":62,\"p2shtype\":5,\"wiftype\":190,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/sexcoin-project/sexcoin
cd sexcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/sexcoin*
mkdir ~/.sexcoin
echo "server=1" >> ~/.sexcoin/sexcoin.conf
echo "listen=0" >> ~/.sexcoin/sexcoin.conf
echo "rpcuser=bartersex" >> ~/.sexcoin/sexcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.sexcoin/sexcoin.conf
chmod 0600 ~/.sexcoin/sexcoin.conf
sexcoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SXC\"}"

home
   {
      "txfee" : 100000,
      "rpc" : "127.0.0.1:9560",
      "coin" : "SXC",
      "pubtype" : 62,
      "status" : "active",
      "smartaddress" : "SKbLMXtMN9TQT4vtqdE72Hixzuc5mi5BrU",
      "wiftype" : 190,
      "p2shtype" : 5
   },

contabo
   {
      "status" : "active",
      "p2shtype" : 5,
      "coin" : "SXC",
      "txfee" : 100000,
      "wiftype" : 190,
      "smartaddress" : "RypBstWcxpbPdR582vVDM3KoEnnBcjgMMa",
      "pubtype" : 62,
      "rpc" : "127.0.0.1:9561"
   },

sexcoin-cli sendtoaddress "RypBstWcxpbPdR582vVDM3KoEnnBcjgMMa" 100
"fee" : -1.00000000,
```

## SYS

```
https://bitcointalk.org/index.php?topic=1466445.0
https://github.com/syscoin/syscoin2


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,0);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY]     = std::vector<unsigned char>(1,128);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 1000;

{\"coin\":\"SYS\",\"name\":\"syscoin\",\"rpcport\":8370,\"pubtype\":0,\"p2shtype\":5,\"wiftype\":128,\"txfee\":1000}


cd ~/wallets
git clone https://github.com/syscoin/syscoin2
cd syscoin2
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/syscoin*
mkdir ~/.syscoin
echo "server=1" >> ~/.syscoin/syscoin.conf
echo "txindex=1" >> ~/.syscoin/syscoin.conf
echo "listen=0" >> ~/.syscoin/syscoin.conf
echo "listenonion=1" >> ~/.syscoin/syscoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.syscoin/syscoin.conf
echo "rpcuser=bartersys" >> ~/.syscoin/syscoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.syscoin/syscoin.conf
echo "rpcworkqueue=64" >> ~/.syscoin/syscoin.conf
echo "rpcthreads=16" >> ~/.syscoin/syscoin.conf
chmod 0600 ~/.syscoin/syscoin.conf
syscoind -daemon


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"SYS\"}"

home
   {
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:8370",
      "status" : "active",
      "coin" : "SYS",
      "smartaddress" : "1NdwJoQVLxj5kCHXKcaLxWrByddbgyHofb",
      "txfee" : 1000,
      "pubtype" : 0,
      "wiftype" : 128
   },

contabo
   {
      "rpc" : "127.0.0.1:8370",
      "wiftype" : 128,
      "txfee" : 1000,
      "pubtype" : 0,
      "coin" : "SYS",
      "status" : "active",
      "p2shtype" : 5,
      "smartaddress" : "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj"
   },

syscoin-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 5.75386666
"fee": -0.00010400,
syscoin-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 6.90463999
"fee": -0.00004520,
syscoin-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 1.7259066
"fee": -0.00010420,
```

## THETA

```
{\"coin\":\"THETA\",\"name\":\"theta-token\",\"etomic\":\"0x3883f5e181fccaF8410FA61e12b59BAd963fb645\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"THETA\"}"

home
      "coin" : "THETA",
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "balance" : 0,
      "pubtype" : 0,
      "height" : -1,
      "txfee" : 1000,
      "status" : "active",
      "p2shtype" : 85,
      "installed" : false,
      "rpc" : "127.0.0.1:80"

hetzner
      "pubtype" : 0,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "balance" : 175.8,
      "p2shtype" : 85,
      "installed" : false,
      "wiftype" : 188,
      "status" : "active",
      "height" : -1,
      "coin" : "THETA",
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"THETA\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"THETA\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Theta Token (THETA)
SWAP completed! 3599361786-609311980 {"uuid":"42e0adb7b3479b7ef2686daac8fcf74e5980a52596179fb6b1ce521406945b50","expiration":1531466999,"tradeid":0,"requestid":3599361786,"quoteid":609311980,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"THETA","bobtomic":"0x3883f5e181fccaF8410FA61e12b59BAd963fb645","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.68596629,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"8714585772781535233","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531452654,"bobdeposit":"ba3bb3d3959d15aea9d36a0326fce24ec584b48af8ab0879d523758de6cbab2d","alicepayment":"f57fd4b14ef47bcd060af7c8f01c5c6acc7c86108506e69e88e87d11a84c1d82","bobpayment":"da61558b3e9847135628c0c4f930e677aff5df450543fe64bdb8fa282f5f0f4f","paymentspent":"6394419ec11ebc92351a15c9b13dd72452f633085903183c7f7c26ab4281c79e","Apaymentspent":"274332f819985a671d706a5f20247457370f926f8adf5588d08e9999690e2a40","depositspent":"817767e2e94cb6a02e85a1895083e084fd950c881ef2ce64472640f756cad0e7","alicedexfee":"82eb19ea85598b0b13c4d36d020920d5b7143110aeacd3f8f89b82be1e7818af","method":"tradestatus","finishtime":1531452654}
bobdeposit https://etherscan.io/tx/0x98d14bf3abb5ad0b34e31727bb5896c8a8022f68e70f62bc19f2fd2fdc70903f
alicepayment https://kmdexplorer.ru/tx/f57fd4b14ef47bcd060af7c8f01c5c6acc7c86108506e69e88e87d11a84c1d82
bobpayment https://etherscan.io/tx/0x0b1059e8ccaf3cc745f678743fb024b81716dccf785039b5522b1727a2b6622a

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"THETA\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"theta-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"THETA\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"theta-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"THETA\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"theta-token\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"THETA\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"theta-token\",\"refrel\":\"coinmarketcap\"}"
```

## TIME

```
{\"coin\":\"TIME\",\"name\":\"chronobank\",\"etomic\":\"0x6531f133e6DeeBe7F2dcE5A0441aA7ef330B4e53\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"TIME\"}"

home
      "installed" : false,
      "height" : -1,
      "wiftype" : 188,
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "balance" : 0,
      "rpc" : "127.0.0.1:80",
      "coin" : "TIME",
      "p2shtype" : 85,
      "pubtype" : 0

contabo
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "txfee" : 1000,
      "installed" : false,
      "coin" : "TIME",
      "pubtype" : 0,
      "p2shtype" : 85,
      "status" : "active"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"TIME\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"TIME\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"TIME\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Chronobank (TIME)
SWAP completed! 1904244750-4129291030 {"uuid":"0de13172ec17e165cd5e3c04b0fa6f3d54622858b19bf4bc403a1edc384f7c40","expiration":1528839735,"tradeid":0,"requestid":1904244750,"quoteid":4129291030,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"TIME","bobtomic":"0x6531f133e6DeeBe7F2dcE5A0441aA7ef330B4e53","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.74732727,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"2178445099625742337","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.74733727, 0.08010000, 0.74734727, 0.08011000, 0.84076317, 0, 0, 0.84075317, 0, 0, 0],"result":"success","status":"finished","finishtime":1528824483,"bobdeposit":"80da8ca5ac421791a7356122b795a818cb726f65f726e3113671b76e44c617a5","alicepayment":"1ec19681aba5e27711777b8c8665c19f675a319e8a0a77c495eab2ee3eb19bb1","bobpayment":"e7f88def14ff4ed7fa055b3808994965962d9baa224baf92603eddd4d18b8314","paymentspent":"82ffac49c3affcd6a502b98f14a0db04995c45f79d8daa26c297647321bcca33","Apaymentspent":"f7af4f521d16dfb8e574faa059db424c8eb337fadf17887026e1775b7a2d8dbf","depositspent":"46a4ea994550a7001df73432959b68744f8857869ba011e485d2e5602cb758ac","method":"tradestatus","finishtime":1528824483}
bobdeposit https://etherscan.io/tx/0x2ce94a9ef6d2ab62ddacdb69438e8c0fdd2ccacc4b2e06b482cb99b550fcd6c1
alicepayment https://kmdexplorer.ru/tx/1ec19681aba5e27711777b8c8665c19f675a319e8a0a77c495eab2ee3eb19bb1
bobpayment https://etherscan.io/tx/0x092025bcee35c1ccf9522503a3c79ead10fc4786130739fbaa858cb268a59f27

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"TIME\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"chronobank\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"TIME\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"chronobank\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"TIME\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"chronobank\",\"refrel\":\"coinmarketcap\"}"
```

## TRC

```
https://bitcointalk.org/index.php?topic=1364146.0
https://github.com/clockuniverse/terracoin
https://github.com/terracoin/terracoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,0);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_TRANSACTION_MINFEE = 1000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 1000;

{\"coin\":\"TRC\",\"name\":\"terracoin\",\"confpath\":\"${HOME#}/.terracoincore/terracoin.conf\",\"rpcport\":13332,\"pubtype\":0,\"p2shtype\":5,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/terracoin/terracoin
cd terracoin
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/terracoin*
mkdir ~/.terracoin
echo "server=1" >> ~/.terracoin/terracoin.conf
echo "txindex=1" >> ~/.terracoin/terracoin.conf
echo "litemode=1" >> ~/.terracoin/terracoin.conf
echo "listen=0" >> ~/.terracoin/terracoin.conf
echo "listenonion=1" >> ~/.terracoin/terracoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.terracoin/terracoin.conf
echo "rpcuser=bartertrc" >> ~/.terracoin/terracoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.terracoin/terracoin.conf
chmod 0600 ~/.terracoin/terracoin.conf
terracoind -daemon

curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"TRC\"}"

home
   {
      "p2shtype" : 5,
      "status" : "active",
      "wiftype" : 128,
      "pubtype" : 0,
      "coin" : "TRC",
      "txfee" : 1000,
      "rpc" : "127.0.0.1:13332",
      "smartaddress" : "1NdwJoQVLxj5kCHXKcaLxWrByddbgyHofb"
   },

contabo
   {
      "pubtype" : 0,
      "txfee" : 1000,
      "smartaddress" : "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj",
      "rpc" : "127.0.0.1:13332",
      "p2shtype" : 5,
      "status" : "inactive",
      "wiftype" : 128,
      "coin" : "TRC"
   },

terracoin-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 9.6494555
"fee": -0.00004520,
terracoin-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 12
"fee": -0.00010440,
terracoin-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 1.34988190
```

## TRX

```
{\"coin\":\"TRX\",\"name\":\"tron\",\"etomic\":\"0xf230b790e05390fc8295f4d3f60332c93bed42e2\",\"rpcport\":80}

home
      "coin" : "TRX",
      "installed" : false,
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "height" : -1,
      "p2shtype" : 85,
      "pubtype" : 0,
      "balance" : 0,
      "txfee" : 1000

contabo
      "pubtype" : 0,
      "p2shtype" : 85,
      "balance" : 0,
      "coin" : "TRX",
      "txfee" : 1000,
      "status" : "active",
      "wiftype" : 188,
      "installed" : false,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"TRX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"TRX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"TRX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"TRX\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
TRON (TRX)
SWAP completed! 2893984384-1014482255 {"expiration":1522403051,"tradeid":0,"requestid":2893984384,"quoteid":1014482255,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"TRX","bobtomic":"0xf230b790e05390fc8295f4d3f60332c93bed42e2","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.70653188,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"2734803039470485505","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.70654188, 0.08010000, 0.70655188, 0.08011000, 0.79486836, 0, 0, 0.79485836, 0, 0, 0],"result":"success","status":"finished","finishtime":1522387906,"bobdeposit":"50156e27c55fbbe623a132355214fc5b36d9773861a3f78c319b6415f367dd9f","alicepayment":"cfbcd021c7de90e7e788b8a27c171830df34feace58bc8b6f14d4a3b48aaa50c","bobpayment":"a6220c1053ff6697a4d7128891d2d3c661061209104b227edf7367918827477d","paymentspent":"2784323b18ecfd86517adff27d21b070191275c2f1410dbe107b11bf0234cb69","Apaymentspent":"0b8d1db693bb8753853ba1cc8aba22797ecaae40cf27277e622df288afd7e3c7","depositspent":"13d9933fd9973311d8180d11af08c87d9daeb9fc02f09efe888806b1d2dc0db1","method":"tradestatus","finishtime":1522387906}
bobdeposit https://etherscan.io/tx/0x9d76cbb3e323f186682dda986b3a0e9a83a1e960e4830b4a1831f44b8452e828
alicepayment https://kmd.explorer.supernet.org/tx/cfbcd021c7de90e7e788b8a27c171830df34feace58bc8b6f14d4a3b48aaa50c
bobpayment https://etherscan.io/tx/0xe25ea62876aedeb8ebdbd296434e988c597c036ada16270c30803d83c0b069c1

```

## TUSD

```
{\"coin\":\"TUSD\",\"name\":\"trueusd\",\"etomic\":\"0x8dd5fbce2f6a956c3022ba3663759011dd51e73e\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"TUSD\"}"

home
      "height" : -1,
      "status" : "active",
      "balance" : 0,
      "txfee" : 1000,
      "wiftype" : 188,
      "pubtype" : 0,
      "installed" : false,
      "coin" : "TUSD",
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85

contabo
      "coin" : "TUSD",
      "p2shtype" : 85,
      "installed" : false,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "height" : -1,
      "balance" : 0,
      "pubtype" : 0,
      "status" : "active",
      "txfee" : 1000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"TUSD\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"TUSD\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"TUSD\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"TUSD\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
TrueUSD (TUSD)
SWAP completed! 598870229-1154401055 {"uuid":"419d92649a97a3215af20e05ed3f95066f662800d37e9c0ea599aea1805fa52e","expiration":1526860905,"tradeid":0,"requestid":598870229,"quoteid":1154401055,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"TUSD","bobtomic":"0x8dd5fbce2f6a956c3022ba3663759011dd51e73e","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.71028412,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"5093190687073239041","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.71029412, 0.08010000, 0.71030412, 0.08011000, 0.79908963, 0, 0, 0.79907963, 0, 0, 0],"result":"success","status":"finished","finishtime":1526845802,"bobdeposit":"d6c23fcb103a203c5cdead1c97c27086aa7cccc40209176ba4e2256cd060fd1e","alicepayment":"373c459b6802d83d01c504eea10cd4dd456a8851e5b5d091f3c1205a65dfbe15","bobpayment":"ad1cd785cab01da6949316219e936ac76ac3a9c66d23dc4c72af9cefca26562c","paymentspent":"0617994e39e429e4f05c8cee5bd813b5ca70cce2098962aa56f2d122541e6487","Apaymentspent":"8dbf126984af85afb9e92b5dff367e27b02d8b3d5ed04e92ea2eaf208bf72d24","depositspent":"afdd7d4954128851e5a3374be4d7e93242c8d6acea106cfc1d960a588d0726d2","method":"tradestatus","finishtime":1526845802}
bobdeposit https://etherscan.io/tx/0xf12151a8df3c2e2d23bb222e058221f80a6c3b73b2d9b2a16b5e9d5a48e160cc
alicepayment https://kmdexplorer.ru/tx/373c459b6802d83d01c504eea10cd4dd456a8851e5b5d091f3c1205a65dfbe15
bobpayment https://etherscan.io/tx/0x49aa3d7ef688c401890357b709c63ed4bef8071033dd5e3193d23131dc855c87

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"TUSD\",\"rel\":\"BCH\",\"margin\":0.03,\"refbase\":\"trueusd\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"TUSD\",\"rel\":\"KMD\",\"margin\":0.03,\"refbase\":\"trueusd\",\"refrel\":\"coinmarketcap\"}"
```

## UCASH

```
{\"coin\":\"UCASH\",\"name\":\"ucash\",\"etomic\":\"0x92e52a1a235d9a103d970901066ce910aacefd37\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"UCASH\"}"

home
      "pubtype" : 0,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "height" : -1,
      "status" : "active",
      "coin" : "UCASH",
      "balance" : 0,
      "txfee" : 1000,
      "installed" : false,
      "p2shtype" : 85

contabo
      "coin" : "UCASH",
      "txfee" : 1000,
      "height" : -1,
      "balance" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "wiftype" : 188,
      "status" : "active",
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"UCASH\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"UCASH\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"UCASH\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
U.CASH (UCASH)
SWAP completed! 2229249840-1158118761 {"uuid":"731d6b943d291744f6ca3de945b7dd238053eb66f62ff7d66a0214e1dc4f4b56","expiration":1528521887,"tradeid":0,"requestid":2229249840,"quoteid":1158118761,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"UCASH","bobtomic":"0x92e52a1a235d9a103d970901066ce910aacefd37","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.78077556,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"6352336343929651201","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.78078556, 0.08010000, 0.78079556, 0.08011000, 0.87839250, 0, 0, 0.87838250, 0, 0, 0],"result":"success","status":"finished","finishtime":1528506722,"bobdeposit":"c69c18a171d0b5ee117d87a3348543302d60e6f6da53389f3cdbb5a15860f1f1","alicepayment":"db8c5910b5fdadfee1dc644190921525be0fb90e0c808684d8df1bc86ffc9dcf","bobpayment":"b794319fc7b0597c2af6785829b439ce26d7b937ad856bc10a7d44ad60b2f1df","paymentspent":"01ae937caa9f87af621601111be412d3f7f93e6913bc17fadf30aa919e993fb3","Apaymentspent":"03d59b32935777ae1cc970b24fd811ada61f8615c1b4d0c66f9231055af0a427","depositspent":"705e99b54e2c78cb9ef87e91c83ce3b9e07436cfddb4f4d628ff03e01d6cb492","method":"tradestatus","finishtime":1528506722}
bobdeposit https://etherscan.io/tx/0x54db41878c0a4030cdeb9dc19e541f00bb86ebf5c839b1af9c918d29ac44306a
alicepayment https://kmdexplorer.ru/tx/db8c5910b5fdadfee1dc644190921525be0fb90e0c808684d8df1bc86ffc9dcf
bobpayment https://etherscan.io/tx/0x32b9fa56bfffe87555c2e81b7a46aeaed75d1e4e181f9966085587cf4fe8b764

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"UCASH\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"ucash\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"UCASH\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"ucash\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"UCASH\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"ucash\",\"refrel\":\"coinmarketcap\"}"
```

## UFO

```
https://bitcointalk.org/index.php?topic=844754.0
https://github.com/UFOCoins/ufo


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,27);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,155);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 100000;

{\"coin\":\"UFO\",\"name\":\"ufocoin\",\"confpath\":\"${HOME#}/.ufo/ufocoin.conf\",\"rpcport\":9888,\"pubtype\":27,\"p2shtype\":5,\"wiftype\":155,\"txfee\":100000}


sudo apt-get install libssl1.0-dev
cd ~/wallets
git clone https://github.com/UFOCoins/ufo
cd ufo
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/ufo*
sudo apt-get install libssl-dev
mkdir ~/.ufo
echo "server=1" >> ~/.ufo/ufocoin.conf
echo "txindex=1" >> ~/.ufo/ufocoin.conf
echo "listen=0" >> ~/.ufo/ufocoin.conf
echo "listenonion=0" >> ~/.ufo/ufocoin.conf
echo "rpcuser=barterufo" >> ~/.ufo/ufocoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.ufo/ufocoin.conf
chmod 0600 ~/.ufo/ufocoin.conf
ufod -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"UFO\"}"

home
      "rpc" : "127.0.0.1:9888",
      "height" : 1243717,
      "wiftype" : 155,
      "KMDvalue" : 0,
      "coin" : "UFO",
      "p2shtype" : 5,
      "txfee" : 100000,
      "balance" : 0,
      "installed" : true,
      "smartaddress" : "CEmDtjTGWqEjpu3rywZx3uCRyFb4xpGc2d",
      "pubtype" : 27,
      "status" : "active"

contabo
      "installed" : true,
      "p2shtype" : 5,
      "rpc" : "127.0.0.1:9888",
      "wiftype" : 155,
      "smartaddress" : "Btz5R65Y7WNj1FC6BEq4NeoGD8mAjS6FuV",
      "height" : 1243717,
      "txfee" : 100000,
      "status" : "active",
      "balance" : 0,
      "KMDvalue" : 0,
      "pubtype" : 27,
      "coin" : "UFO"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"UFO\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"uniform-fiscal-object\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"UFO\",\"rel\":\"BTC\",\"margin\":0.05,\"refbase\":\"uniform-fiscal-object\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"UFO\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"uniform-fiscal-object\",\"refrel\":\"coinmarketcap\"}"

ufo-cli sendtoaddress "Btz5R65Y7WNj1FC6BEq4NeoGD8mAjS6FuV" 1.2
"fee": -0.00045000

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"UFO\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"UFO\",\"rel\":\"KMD\",\"relvolume\":0.1,\"price\":0.0004}"

bobdeposit
alicepayment
bobpayment

```

## UIS

```
https://bitcointalk.org/index.php?topic=1121974.0
https://github.com/unitusdev/unitus


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,68);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,10);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,132);

src/policy/policy.h
DEFAULT_BLOCK_MIN_TX_FEE = 1000;
DEFAULT_INCREMENTAL_RELAY_FEE = 1000;
DUST_RELAY_TX_FEE = 1000;
src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 20000;
WALLET_INCREMENTAL_RELAY_FEE = 5000;
src/validation.h:
DEFAULT_MIN_RELAY_TX_FEE = 0.01 * COIN;
src/amount.h
COIN = 100000000;

{\"coin\":\"UIS\",\"name\":\"unitus\",\"rpcport\":50604,\"pubtype\":68,\"p2shtype\":10,\"wiftype\":132,\"txfee\":1000000}


cd ~/wallets
git clone https://github.com/unitusdev/unitus
cd unitus
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/unitus*
mkdir ~/.unitus
echo "server=1" >> ~/.unitus/unitus.conf
echo "listen=0" >> ~/.unitus/unitus.conf
echo "listenonion=1" >> ~/.unitus/unitus.conf
echo "#proxy=127.0.0.1:9050" >> ~/.unitus/unitus.conf
echo "rpcuser=barteruis" >> ~/.unitus/unitus.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.unitus/unitus.conf
chmod 0600 ~/.unitus/unitus.conf
unitusd -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"UIS\"}"

home
   {
      "rpc" : "127.0.0.1:50604",
      "wiftype" : 132,
      "status" : "active",
      "txfee" : 2000000,
      "pubtype" : 68,
      "p2shtype" : 10,
      "coin" : "UIS",
      "smartaddress" : "UjcxGBg5dEEfMfmQz9E1w3Mgmw9k364GUp"
   },

contabo
   {
      "txfee" : 2000000,
      "pubtype" : 68,
      "smartaddress" : "UPqonYJMDuNeY1ueBSV8FnxX1pKqvMpXAW",
      "status" : "active",
      "wiftype" : 132,
      "rpc" : "127.0.0.1:50604",
      "p2shtype" : 10,
      "coin" : "UIS"
   },

unitus-cli sendtoaddress "UPqonYJMDuNeY1ueBSV8FnxX1pKqvMpXAW" 8.82287977
unitus-cli sendtoaddress "UPqonYJMDuNeY1ueBSV8FnxX1pKqvMpXAW" 10.58745572
```

## USDT

```
{\"coin\":\"USDT\",\"name\":\"tether\",\"etomic\":\"0xdac17f958d2ee523a2206206994597c13d831ec7\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"USDT\"}"

home
      "pubtype" : 0,
      "height" : -1,
      "txfee" : 1000,
      "wiftype" : 188,
      "coin" : "USDT",
      "rpc" : "127.0.0.1:80",
      "p2shtype" : 85,
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "installed" : false,
      "status" : "active"

contabo
      "balance" : 0,
      "status" : "active",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "pubtype" : 0,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "coin" : "USDT",
      "txfee" : 1000,
      "installed" : false,
      "p2shtype" : 85

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"USDT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"USDT\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"USDT\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"USDT\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"

Tether (USDT)
SWAP completed! 1873667227-286202717 {"uuid":"7603e1fad8ff06cf07b37471044ec96592fc25b63491caf047b9f0f5450d1e1e","expiration":1526981572,"tradeid":0,"requestid":1873667227,"quoteid":286202717,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"USDT","bobtomic":"0xdac17f958d2ee523a2206206994597c13d831ec7","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77774861,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"10464419525404590081","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77775861, 0.08010000, 0.77776861, 0.08011000, 0.87498718, 0, 0, 0.87497718, 0, 0, 0],"result":"success","status":"finished","finishtime":1526966524,"bobdeposit":"76e4576756223ca288eb6184e0506fcf3cb1f77d98cd70ac73e2da2c7221d6f4","alicepayment":"f2d830a7362ed068e008d80e094a03045380b5c707cf2a013af726e8ab294574","bobpayment":"1d6d2fc0cefb146204f28abebf32d47863b74f755c420ab17d77139b77246ec0","paymentspent":"b50eeb0dbd71d6071d545e9403dfcb47fccb6ffb3a8eb46b0c82857e48f014e2","Apaymentspent":"927c834e68d35544d6f136c5880a19a07b7b86aba05c3ca7ca5064e94958290e","depositspent":"a8731fba4a7b82b27a586f51f4dfa43a9be601fc0a2bb517d1bf6313870bbde4","method":"tradestatus","finishtime":1526966524}
bobdeposit https://etherscan.io/tx/0x35355d60333be7b49ac7b140d84ddbbef35135c56c9b10c48c4b28993975450f
alicepayment https://kmdexplorer.ru/tx/f2d830a7362ed068e008d80e094a03045380b5c707cf2a013af726e8ab294574
bobpayment https://etherscan.io/tx/0x8995934dcb808bda55e6fa51e375ad92ae3bd0c0b008e69634d41fd400cfb837

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"USDT\",\"rel\":\"BCH\",\"margin\":0.02,\"refbase\":\"tether\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"USDT\",\"rel\":\"KMD\",\"margin\":0.02,\"refbase\":\"tether\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"USDT\",\"rel\":\"LTC\",\"margin\":0.02,\"refbase\":\"tether\",\"refrel\":\"coinmarketcap\"}"

```

## VEN

```
{\"coin\":\"VEN\",\"name\":\"vechain\",\"etomic\":\"0xd850942ef8811f2a866692a623011bde52a462c1\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"VEN\"}"

home
      "rpc" : "127.0.0.1:80",
      "coin" : "VEN",
      "wiftype" : 188,
      "balance" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "height" : -1,
      "txfee" : 1000,
      "pubtype" : 0,
      "p2shtype" : 85,
      "installed" : false

contabo
      "installed" : false,
      "status" : "active",
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "height" : -1,
      "coin" : "VEN",
      "pubtype" : 0,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "balance" : 0,
      "wiftype" : 188

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"VEN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"VEN\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"VEN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"VEN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
VeChain (VEN)
SWAP completed! 1078283746-2574623763 {"uuid":"a2806251ab0d25cedd3a2264ff2d9b2c6f6a74ddb4dd79e04e8e88a853da1575","expiration":1526850610,"tradeid":0,"requestid":1078283746,"quoteid":2574623763,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"VEN","bobtomic":"0xd850942ef8811f2a866692a623011bde52a462c1","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77474504,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"4267153372905799681","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77475504, 0.08010000, 0.77476504, 0.08011000, 0.87160817, 0, 0, 0.87159817, 0, 0, 0],"result":"success","status":"finished","finishtime":1526835502,"bobdeposit":"3cf5b81a8fe2c0da81333250b1482cec171a8f7345370fa103decc14aa546892","alicepayment":"0d4835833095f5db56814b6719bdfdb291da2b09466dff8aeced88dcd6309864","bobpayment":"2495230a1f12daf87901db6fcc68158901cd4a9fc3dc90dbf685d40ef992be8c","paymentspent":"226aa819e319f7c376745953bdc5aa3e9b2b97ed7070b5d639ec780bbd552931","Apaymentspent":"b8ede3c867f1ffd36f78812cb397e9cac848c64a1eff6e691ea4a5dac5903e1a","depositspent":"4931ba47b0361e95c5986c00bd1216f5479f7b914f06c4a0ac86e841672599d8","method":"tradestatus","finishtime":1526835502}
bobdeposit https://etherscan.io/tx/0x35ef31f377c2b35f14bd12e10f527690896350a2374547d82a76040707061136
alicepayment https://kmdexplorer.ru/tx/0d4835833095f5db56814b6719bdfdb291da2b09466dff8aeced88dcd6309864
bobpayment https://etherscan.io/tx/0x004996d6466c5c0b98f7372b44c49d3fbca190cce41a14438b058a0b95591816

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VEN\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"vechain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VEN\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"vechain\",\"refrel\":\"coinmarketcap\"}"
```

## VIA

```
https://bitcointalk.org/index.php?topic=1840789.0
https://github.com/viacoin/viacoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,71);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,33);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,199);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 200000;
DEFAULT_TRANSACTION_MINFEE = 100000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;

{\"coin\":\"VIA\",\"name\":\"viacoin\",\"rpcport\":5222,\"pubtype\":71,\"p2shtype\":33,\"wiftype\":199,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/viacoin/viacoin
cd viacoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/viacoin*
mkdir ~/.viacoin
echo "server=1" >> ~/.viacoin/viacoin.conf
echo "txindex=1" >> ~/.viacoin/viacoin.conf
echo "listen=0" >> ~/.viacoin/viacoin.conf
echo "listenonion=1" >> ~/.viacoin/viacoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.viacoin/viacoin.conf
echo "rpcuser=bartervia" >> ~/.viacoin/viacoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.viacoin/viacoin.conf
echo "rpcworkqueue=64" >> ~/.viacoin/viacoin.conf
echo "rpcthreads=16" >> ~/.viacoin/viacoin.conf
chmod 0600 ~/.viacoin/viacoin.conf
viacoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"VIA\"}"

home
   {
      "p2shtype" : 33,
      "txfee" : 100000,
      "pubtype" : 71,
      "wiftype" : 199,
      "coin" : "VIA",
      "rpc" : "127.0.0.1:5222",
      "status" : "active",
      "smartaddress" : "VwdmDWZwkmdHoyBg4QDyPRB3fSvaEcLqav"
   },

contabo
   {
      "smartaddress" : "VbrcjsCDMSmGzKKuFhV5iAmsuL6g1YyT9K",
      "txfee" : 100000,
      "pubtype" : 71,
      "status" : "active",
      "rpc" : "127.0.0.1:5222",
      "wiftype" : 199,
      "coin" : "VIA",
      "p2shtype" : 33
   },

viacoin-cli sendtoaddress "VbrcjsCDMSmGzKKuFhV5iAmsuL6g1YyT9K" 37.6484
"fee": -0.00045200,
viacoin-cli sendtoaddress "VbrcjsCDMSmGzKKuFhV5iAmsuL6g1YyT9K" 46.01407677
"fee": -0.00038400,
```

## VIVO

```
https://bitcointalk.org/index.php?topic=2110690.0
https://github.com/vivocoin/vivo


src/chainparams.cpp
// Vivo addresses start with 'V'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,70);
// Vivo script addresses start with '5'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,10);
// Vivo private keys start with '5' or 'V' (?)
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,198);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 10000; // was 1000

{\"coin\":\"VIVO\",\"name\":\"vivo\",\"confpath\":\"${HOME#}/.vivocore/vivo.conf\",\"rpcport\":9998,\"pubtype\":70,\"p2shtype\":10,\"wiftype\":198,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/vivocoin/vivo
cd vivo
find . -name "*.sh" -exec chmod +x {} \;
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/vivo*
mkdir ~/.vivocore
echo "server=1" >> ~/.vivocore/vivo.conf
echo "txindex=1" >> ~/.vivocore/vivo.conf
echo "litemode=1" >> ~/.vivocore/vivo.conf
echo "rpcport=19998" >> ~/.vivocore/vivo.conf
echo "listen=0" >> ~/.vivocore/vivo.conf
echo "listenonion=0" >> ~/.vivocore/vivo.conf
echo "#proxy=127.0.0.1:9050" >> ~/.vivocore/vivo.conf
echo "rpcuser=bartervivo" >> ~/.vivocore/vivo.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.vivocore/vivo.conf
chmod 0600 ~/.vivocore/vivo.conf
vivod -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"VIVO\"}"

home
      "wiftype" : 198,
      "installed" : true,
      "pubtype" : 70,
      "height" : 125789,
      "KMDvalue" : 0,
      "smartaddress" : "VYJAEQGf3bAQzY3b2yteuHuG2wfdXZB5a8",
      "balance" : 0,
      "coin" : "VIVO",
      "rpc" : "127.0.0.1:19998",
      "p2shtype" : 10,
      "txfee" : 10000,
      "status" : "active"

contabo
      "p2shtype" : 10,
      "coin" : "VIVO",
      "KMDvalue" : 0,
      "pubtype" : 70,
      "installed" : true,
      "balance" : 0,
      "height" : 125789,
      "txfee" : 10000,
      "smartaddress" : "VCX1kktveGJQAtBpEH9mE3W6GpqjJKXyjf",
      "wiftype" : 198,
      "status" : "active",
      "rpc" : "127.0.0.1:19998"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VIVO\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"vivo\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VIVO\",\"rel\":\"BTC\",\"margin\":0.05,\"refbase\":\"vivo\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VIVO\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"vivo\",\"refrel\":\"coinmarketcap\"}"

vivo-cli sendtoaddress "VCX1kktveGJQAtBpEH9mE3W6GpqjJKXyjf" 1.2
"fee": -0.00004500
```

## VOT

```
https://bitcointalk.org/index.php?topic=2137705.0
https://github.com/Tomas-M/VoteCoin


src/chainparams.cpp
// guarantees the first 2 characters, when base58 encoded, are "t1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x1C,0xB8};
// guarantees the first 2 characters, when base58 encoded, are "t3"
base58Prefixes[SCRIPT_ADDRESS]     = {0x1C,0xBD};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

{\"coin\":\"VOT\",\"name\":\"votecoin\",\"rpcport\":8232,\"taddr\":28,\"pubtype\":184,\"p2shtype\":189,\"wiftype\":128,\"txfee\":10000}
{\"coin\":\"VOT\",\"name\":\"votecoin\",\"rpcport\":8242,\"taddr\":28,\"pubtype\":184,\"p2shtype\":189,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/Tomas-M/VoteCoin
cd VoteCoin
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh --disable-tests --disable-rust -j4
sudo cp src/zcash-cli /usr/local/bin/votecoin-cli
sudo cp src/zcashd /usr/local/bin/votecoind
sudo strip /usr/local/bin/votecoin*
mkdir ~/.votecoin
echo "server=1" >> ~/.votecoin/votecoin.conf
echo "txindex=1" >> ~/.votecoin/votecoin.conf
echo "listen=0" >> ~/.votecoin/votecoin.conf
echo "listenonion=0" >> ~/.votecoin/votecoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.votecoin/votecoin.conf
echo "rpcport=8242" >> ~/.votecoin/votecoin.conf
echo "rpcuser=bartervot" >> ~/.votecoin/votecoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.votecoin/votecoin.conf
echo "addnode=mainnet.votecoin.site" >> ~/.votecoin/votecoin.conf
chmod 0600 ~/.votecoin/votecoin.conf
votecoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"VOT\"}"

home
      "rpc" : "127.0.0.1:8242",
      "KMDvalue" : 0,
      "status" : "active",
      "pubtype" : 184,
      "txfee" : 10000,
      "height" : 71091,
      "balance" : 0,
      "coin" : "VOT",
      "smartaddress" : "t1fWYK8pdKHWgLqLRG3PU6Kx7EHpgVRNjCU",
      "wiftype" : 128,
      "p2shtype" : 189,
      "installed" : true

contabo
      "rpc" : "127.0.0.1:8242",
      "txfee" : 10000,
      "status" : "active",
      "wiftype" : 128,
      "KMDvalue" : 0,
      "smartaddress" : "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH",
      "balance" : 0,
      "p2shtype" : 189,
      "installed" : true,
      "coin" : "VOT",
      "pubtype" : 184,
      "height" : 71091

votecoin-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 10
votecoin-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 12
"fee": -0.00000226

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VOT\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"votecoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VOT\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"votecoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VOT\",\"rel\":\"BTC\",\"margin\":0.05,\"refbase\":\"votecoin\",\"refrel\":\"coinmarketcap\"}"
```

## VRSC

```
https://bitcointalk.org/index.php?topic=4070404.0
https://github.com/VerusCoin/VerusCoin


        base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,60);
        base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,85);
        base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,188);


{\"coin\":\"VRSC\",\"asset\":\"VRSC\",\"rpcport\":27486}


cd ~/wallets
git clone https://github.com/VerusCoin/VerusCoin
cd VerusCoin
git checkout dev
git pull
#./zcutil/fetch-params.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh
strip src/komodod src/komodo-cli src/komodo-tx
sudo cp src/komodod /usr/local/bin/verusd
sudo cp src/komodo-cli /usr/local/bin/verus-cli
mkdir ~/.komodo/VRSC
echo "server=1" >> ~/.komodo/VRSC/VRSC.conf
echo "txindex=1" >> ~/.komodo/VRSC/VRSC.conf
echo "listen=0" >> ~/.komodo/VRSC/VRSC.conf
echo "rpcport=27486" >> ~/.komodo/VRSC/VRSC.conf
echo "rpcuser=bartervrsc" >> ~/.komodo/VRSC/VRSC.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.komodo/VRSC/VRSC.conf
chmod 0600 ~/.komodo/VRSC/VRSC.conf
verusd -ac_name=VRSC -ac_algo=verushash -ac_cc=1 -ac_veruspos=50 -ac_supply=0 -ac_eras=3 -ac_reward=0,38400000000,2400000000 -ac_halving=1,43200,1051920 -ac_decay=100000000,0,0 -ac_end=10080,226080,0 -ac_timelockgte=19200000000 -ac_timeunlockfrom=129600 -ac_timeunlockto=1180800 -addnode=185.25.48.236 -addnode=185.64.105.111 -daemon

```

## VRT

```
https://bitcointalk.org/index.php?topic=2983251
https://github.com/VirtusPay/virtus
https://virtus.blockxplorer.info/


src/chainparams.cpp
// Virtus addresses start with 'V'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,70);
// Virtus script addresses start with '7'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,16);
// Virtus private keys start with '7' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

{\"coin\":\"VRT\",\"name\":\"virtus\",\"confpath\":\"${HOME#}/.virtuscore/virtus.conf\",\"rpcport\":13880,\"pubtype\":70,\"p2shtype\":16,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/VirtusPay/virtus
cd virtus
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/virtus*
mkdir ~/.virtuscore
echo "server=1" >> ~/.virtuscore/virtus.conf
echo "txindex=1" >> ~/.virtuscore/virtus.conf
echo "litemode=1" >> ~/.virtuscore/virtus.conf
echo "listen=0" >> ~/.virtuscore/virtus.conf
echo "listenonion=0" >> ~/.virtuscore/virtus.conf
echo "#proxy=127.0.0.1:9050" >> ~/.virtuscore/virtus.conf
echo "rpcuser=bartervrt" >> ~/.virtuscore/virtus.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.virtuscore/virtus.conf
chmod 0600 ~/.virtuscore/virtus.conf
virtusd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"VRT\"}"

home
      "KMDvalue" : 0,
      "installed" : true,
      "p2shtype" : 16,
      "pubtype" : 70,
      "status" : "active",
      "balance" : 0,
      "txfee" : 10000,
      "height" : 43165,
      "smartaddress" : "VYJAEQGf3bAQzY3b2yteuHuG2wfdXZB5a8",
      "rpc" : "127.0.0.1:13880",
      "coin" : "VRT",
      "wiftype" : 204

contabo
      "coin" : "VRT",
      "smartaddress" : "VCX1kktveGJQAtBpEH9mE3W6GpqjJKXyjf",
      "balance" : 0,
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:13880",
      "height" : 43161,
      "txfee" : 10000,
      "wiftype" : 204,
      "p2shtype" : 16,
      "status" : "active",
      "installed" : true,
      "pubtype" : 70

virtus-cli sendtoaddress "VCX1kktveGJQAtBpEH9mE3W6GpqjJKXyjf" 1
"fee": -0.00000226
```

## VSL

```
{\"coin\":\"VSL\",\"name\":\"vslice\",\"etomic\":\"0x5c543e7AE0A1104f78406C340E9C64FD9fCE5170\",\"rpcport\":80,\"decimals\":18}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"VSL\"}"

home
      "txfee" : 1000,
      "p2shtype" : 85,
      "rpc" : "127.0.0.1:80",
      "wiftype" : 188,
      "height" : -1,
      "pubtype" : 0,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "status" : "active",
      "coin" : "VSL",
      "installed" : false,
      "balance" : 0

contabo
      "pubtype" : 0,
      "p2shtype" : 85,
      "wiftype" : 188,
      "status" : "active",
      "height" : -1,
      "txfee" : 1000,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "balance" : 23.48056728,
      "coin" : "VSL",
      "installed" : false,
      "rpc" : "127.0.0.1:80"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"VSL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"VSL\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"VSL\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
vSlice (VSL)
SWAP completed! 380641656-1353704323 {"uuid":"c4e48d0866c7407787d2eb8f7151f75f29d11ece39c279adf1437a28778084e8","expiration":1528459884,"tradeid":0,"requestid":380641656,"quoteid":1353704323,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"VSL","bobtomic":"0x5c543e7AE0A1104f78406C340E9C64FD9fCE5170","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.71662722,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"8044494136024236033","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.71663722, 0.08010000, 0.71664722, 0.08011000, 0.80622562, 0, 0, 0.80621562, 0, 0, 0],"result":"success","status":"finished","finishtime":1528444847,"bobdeposit":"6bc4b93d94bbab3e86afd6492616611a1601cb62112cfdf705bcfc18ab36336e","alicepayment":"5daa0a0710ef2abacdbffe9acafa75ffcd352bb794d3ce27f93a82f8332f17a8","bobpayment":"90137c77f334ad8be988d231200a8ca03c6ba4e8a4a64078aba5ae7cff7e1cb1","paymentspent":"9f27370ae0a122b5a0d9e16bb41a08dd1f373eb566fc20e4d16f2eee37fd9a22","Apaymentspent":"3b69bd66dd1a8710017795cb2573640207c02243fde6a28c51cc739628e4ded3","depositspent":"443613d2ce612561bd6529d07b032c7341d1af8024675c111633fe798537e962","method":"tradestatus","finishtime":1528444847}
bobdeposit https://etherscan.io/tx/0x6015c3d61d02259b257b79d75ed8f3bc86589844bded950f9dc5d1d738a330dd
alicepayment https://kmdexplorer.ru/tx/5daa0a0710ef2abacdbffe9acafa75ffcd352bb794d3ce27f93a82f8332f17a8
bobpayment https://etherscan.io/tx/0x99bde628df2eb52ef8487f7cf6d171009b37a07029548a8411a3c2a443e382e2

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VSL\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"vslice\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VSL\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"vslice\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"VSL\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"vslice\",\"refrel\":\"coinmarketcap\"}"
```

## VTC

```
https://bitcointalk.org/index.php?topic=1828453
https://github.com/vertcoin/vertcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,71);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,128);

src/validation.h
DEFAULT_MIN_RELAY_TX_FEE = 100000;
src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"VTC\",\"name\":\"vertcoin\",\"rpcport\":5888,\"pubtype\":71,\"p2shtype\":5,\"wiftype\":128,\"txfee\":100000}


cd ~/wallets
git clone https://github.com/vertcoin/vertcoin
cd vertcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/vertcoin*
mkdir ~/.vertcoin
echo "server=1" >> ~/.vertcoin/vertcoin.conf
echo "txindex=1" >> ~/.vertcoin/vertcoin.conf
echo "listen=0" >> ~/.vertcoin/vertcoin.conf
echo "listenonion=1" >> ~/.vertcoin/vertcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.vertcoin/vertcoin.conf
echo "rpcuser=bartervtc" >> ~/.vertcoin/vertcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.vertcoin/vertcoin.conf
echo "rpcworkqueue=64" >> ~/.vertcoin/vertcoin.conf
echo "rpcthreads=16" >> ~/.vertcoin/vertcoin.conf
chmod 0600 ~/.vertcoin/vertcoin.conf
vertcoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"VTC\"}"

home
   {
      "p2shtype" : 5,
      "smartaddress" : "VwdmDWZwkmdHoyBg4QDyPRB3fSvaEcLqav",
      "pubtype" : 71,
      "rpc" : "127.0.0.1:5888",
      "wiftype" : 128,
      "coin" : "VTC",
      "status" : "active",
      "txfee" : 100000
   },

contabo
   {
      "txfee" : 100000,
      "wiftype" : 128,
      "coin" : "VTC",
      "pubtype" : 71,
      "status" : "active",
      "smartaddress" : "VbrcjsCDMSmGzKKuFhV5iAmsuL6g1YyT9K",
      "rpc" : "127.0.0.1:5888",
      "p2shtype" : 5
   },

vertcoin-cli sendtoaddress "VbrcjsCDMSmGzKKuFhV5iAmsuL6g1YyT9K" 56.134
"fee": -0.00022600,
vertcoin-cli sendtoaddress "VbrcjsCDMSmGzKKuFhV5iAmsuL6g1YyT9K" 68.60824023
"fee": -0.00019200,
```

## WAVI

```
https://bitcointalk.org/index.php?topic=3146751.0
https://github.com/wavidev-the-man/wavi


{"coin":"WAVI","confpath":"USERHOME/.wavicore/wavi.conf","name":"wavi","rpcport":9984,"pubtype":73,"p2shtype":15,"wiftype":133,"txfee":10000}

cd ~/wallets
git clone https://github.com/wavidev-the-man/wavi
cd wavi
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/wavi*
mkdir ~/.wavicore
echo "server=1" >> ~/.wavicore/wavi.conf
echo "txindex=1" >> ~/.wavicore/wavi.conf
echo "litemode=1" >> ~/.wavicore/wavi.conf
echo "listen=0" >> ~/.wavicore/wavi.conf
echo "listenonion=0" >> ~/.wavicore/wavi.conf
echo "rpcuser=barterwavi" >> ~/.wavicore/wavi.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.wavicore/wavi.conf
echo "rpcworkqueue=64" >> ~/.wavicore/wavi.conf
echo "rpcthreads=16" >> ~/.wavicore/wavi.conf
chmod 0600 ~/.wavicore/wavi.conf
wavid -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"WAVI\"}"

home
```

## WAX

```
{\"coin\":\"WAX\",\"name\":\"wax\",\"etomic\":\"0x39Bb259F66E1C59d5ABEF88375979b4D20D98022\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"WAX\"}"

home
      "installed" : false,
      "balance" : 0,
      "pubtype" : 0,
      "height" : -1,
      "wiftype" : 188,
      "status" : "active",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "txfee" : 1000,
      "p2shtype" : 85,
      "coin" : "WAX",
      "rpc" : "127.0.0.1:80"

contabo
      "installed" : false,
      "txfee" : 1000,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "balance" : 141.85,
      "wiftype" : 188,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "coin" : "WAX",
      "status" : "active",
      "pubtype" : 0

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"WAX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"WAX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"WAX\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
WAX (WAX)
SWAP completed! 3717706430-2116652614 {"uuid":"9f75bfab6372fbbb40b081f09eed29a54b547f7946f29a58f32811060853e4d9","expiration":1531201210,"tradeid":0,"requestid":3717706430,"quoteid":2116652614,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"WAX","bobtomic":"0x39Bb259F66E1C59d5ABEF88375979b4D20D98022","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.71277784,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"5746403566376714241","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.08010000, 1.00002000, 0.08011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531186315,"bobdeposit":"0ae4cb9aafbf353de076d8f1972f8646d2de1ca3f31381a3e0422f8d10bc217f","alicepayment":"71be52af2d02a954cc7703f77c23498f9ed3ad6eaac679247de602a9efdc1d0b","bobpayment":"8cc4a56645c4dac6b16accb62d42bf1800e76d6bfca1b9fdc3a2c48030b2c4ee","paymentspent":"52c311db3dcc61274a448881c93473a8cf973a38436e1525eca7442e4a4b93eb","Apaymentspent":"d16ede679b7f873432e79fb873f060731897d4f5550125f774a2f6479a0ebf70","depositspent":"f07aa1aee4703581dc4ce98a558fd684de6aac0214527eedec0d3134df8d3cd3","alicedexfee":"85c2b6bc82a63efe2bda1248d004c2639d28f4c2995da8675ed1a49f05f1f370","method":"tradestatus","finishtime":1531186315}
bobdeposit https://etherscan.io/tx/0xa9d5b5dc8a647a1248f34f3d05ca0e87fbd80c7dfb80128afac878cc90e87cab
alicepayment https://kmdexplorer.ru/tx/71be52af2d02a954cc7703f77c23498f9ed3ad6eaac679247de602a9efdc1d0b
bobpayment https://etherscan.io/tx/0xd552db574e46a64b2dabd73e1d8f5ea1a2a55c57775e0e7cdd306bef831a5229

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WAX\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"wax\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WAX\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"wax\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WAX\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"wax\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WAX\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"wax\",\"refrel\":\"coinmarketcap\"}"
```

## WINGS

```
{\"coin\":\"WINGS\",\"name\":\"wings\",\"etomic\":\"0x667088b212ce3d06a1b553a7221E1fD19000d9aF\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"WINGS\"}"

home
      "status" : "active",
      "balance" : 0,
      "installed" : false,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "wiftype" : 188,
      "height" : -1,
      "txfee" : 1000,
      "coin" : "WINGS",
      "p2shtype" : 85,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

hetzner
      "rpc" : "127.0.0.1:80",
      "smartaddress" : "0x98298409c949135eed89233d04c2cfef984baff5",
      "coin" : "WINGS",
      "status" : "active",
      "balance" : 36.65,
      "height" : -1,
      "pubtype" : 0,
      "txfee" : 1000,
      "wiftype" : 188,
      "p2shtype" : 85,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"WINGS\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"WINGS\",\"rel\":\"KMD\",\"relvolume\":0.1,\"price\":0.12}"
Wings (WINGS)
SWAP completed! 2586681756-2489467990 {"uuid":"6585f748210a320f04a43f546713fc73cafc06f8fd684113209e3d6b03d7b9c6","expiration":1531379751,"tradeid":0,"requestid":2586681756,"quoteid":2489467990,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"WINGS","bobtomic":"0x667088b212ce3d06a1b553a7221E1fD19000d9aF","etomicsrc":"0x98298409c949135eed89233d04c2cfef984baff5","srcamount":0.86608680,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.10009000,"alicetxfee":0.00001000,"aliceid":"17776572642397454337","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[1.00000999, 0.10010000, 1.00002000, 0.10011000, 1.12502000, 0, 0, 1.12500999, 0, 0, 0],"result":"success","status":"finished","finishtime":1531364781,"bobdeposit":"695824924681803f5ff029824b3de0e9f38fa80adcb830d85770bb8d9daa1223","alicepayment":"e8614526ccf2a1ea96d451b91bf0734b1e642cb0b123c9aa5a1f4a6a6ad6714d","bobpayment":"feeacf0364880b2da8323917cf683589df90f7f958501c80b83a5230a1597e04","paymentspent":"69b14a3be9f2ecd2d477c7aefb19258abc224bcc0d565ba2f233c10c1528203d","Apaymentspent":"b6537d3e9c4d82e5904bcd0d93c36cca0d4a604874951b2a83d529ea1f8a66c8","depositspent":"f0ddd3ad9a3577a536070e4093de227f5bdeb7b50f4240ed00b01287ef8668f1","alicedexfee":"143aad35397a243a6dae0c9af875afb2ae0fd7936ce7c3f9ae346932076aef57","method":"tradestatus","finishtime":1531364781}
bobdeposit https://etherscan.io/tx/0x04ee788be9c2619dc06746af04db7918ca35b21e666efe31e9cacfc70936432c
alicepayment https://kmdexplorer.ru/tx/e8614526ccf2a1ea96d451b91bf0734b1e642cb0b123c9aa5a1f4a6a6ad6714d
bobpayment https://etherscan.io/tx/0xbe938562fb2b26b0f86b7757dfb307565d881ae869a67856972256b90b581268

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WINGS\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"wings\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WINGS\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"wings\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WINGS\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"wings\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WINGS\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"wings\",\"refrel\":\"coinmarketcap\"}"
```

## WTC

```
{\"coin\":\"WTC\",\"name\":\"waltonchain\",\"etomic\":\"0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"WTC\"}"

home
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "installed" : false,
      "wiftype" : 188,
      "pubtype" : 0,
      "coin" : "WTC",
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "balance" : 0,
      "txfee" : 1000

contabo
      "status" : "active",
      "height" : -1,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "rpc" : "127.0.0.1:80",
      "txfee" : 1000,
      "coin" : "WTC",
      "balance" : 0,
      "wiftype" : 188,
      "pubtype" : 0,
      "p2shtype" : 85,
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"WTC\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"WTC\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"WTC\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Waltonchain (WTC)
SWAP completed! 3313436697-2448078167 {"uuid":"22a7c4a62031cf8f42d11626130af70badc87a43da5d9d6e840456f7952f736d","expiration":1527474209,"tradeid":0,"requestid":3313436697,"quoteid":2448078167,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"WTC","bobtomic":"0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67333297,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"417026718903762945","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67334297, 0.08010000, 0.67335297, 0.08011000, 0.75751959, 0, 0, 0.75750959, 0, 0, 0],"result":"success","status":"finished","finishtime":1527459890,"bobdeposit":"2920af4610462ca5c7c039f4d5d07580e263250953a355c7703b75c8ca294e0d","alicepayment":"2b4e1b5289f7c3a7822e7350e1c458e623c9f24b52b682aee4be230da888fd62","bobpayment":"1534d23ecca86bda2e8b17b08717364c3ef8825622331e0dd971874bb7ca7248","paymentspent":"ceef84c603809f72d7bef21d1f44ce7fada202def99402e31d4fef890458bf0b","Apaymentspent":"786f209de4efcb6b64b0eea1523dc2be9eefd9f761b9b1ce8310cf51f4460709","depositspent":"396c0f41fdfb7bbda36621c98630dbf8f1a09993f36812ac6556d35ac9105292","method":"tradestatus","finishtime":1527459890}
bobdeposit https://etherscan.io/tx/0x030abda5af9a16fe9f1a2e918bd9acec1e5d36a67020d5846cf474087e9ba1f2
alicepayment https://kmdexplorer.ru/tx/2b4e1b5289f7c3a7822e7350e1c458e623c9f24b52b682aee4be230da888fd62
bobpayment https://etherscan.io/tx/0x397d7d8e25e1d6ef178bbdc3186a2d3f6ed4ac09bae2a02fc1da34ca4bc751ee

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WTC\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"waltonchain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WTC\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"waltonchain\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"WTC\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"waltonchain\",\"refrel\":\"coinmarketcap\"}"
```

## XCG

```
https://github.com/cryptforall/Xchange


src/chainparams.cpp
// Xchange addresses start with 'X'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,76);
// Xchange script addresses start with '7'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,16);
// Xchange private keys start with '7' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

{\"coin\":\"XCG\",\"name\":\"Xchange\",\"confpath\":\"${HOME#}/.Xchangecore/Xchange.conf\",\"rpcport\":9386,\"pubtype\":76,\"p2shtype\":16,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/cryptforall/Xchange
cd Xchange
find . -name "*.sh" -exec chmod +x {} \;
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/Xchange*
mkdir ~/.Xchangecore
echo "server=1" >> ~/.Xchangecore/Xchange.conf
echo "txindex=1" >> ~/.Xchangecore/Xchange.conf
echo "litemode=1" >> ~/.Xchangecore/Xchange.conf
echo "listen=0" >> ~/.Xchangecore/Xchange.conf
echo "listenonion=0" >> ~/.Xchangecore/Xchange.conf
echo "#proxy=127.0.0.1:9050" >> ~/.Xchangecore/Xchange.conf
echo "rpcuser=barterxcg" >> ~/.Xchangecore/Xchange.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.Xchangecore/Xchange.conf
chmod 0600 ~/.Xchangecore/Xchange.conf
Xchanged -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"XCG\"}"

home
      "p2shtype" : 16,
      "wiftype" : 204,
      "height" : 3898,
      "balance" : 0,
      "txfee" : 10000,
      "rpc" : "127.0.0.1:9386",
      "pubtype" : 76,
      "KMDvalue" : 0,
      "installed" : true,
      "smartaddress" : "XxKn944PJfwfu8t7BVtZp3XyoyDHjDfiSG",
      "coin" : "XCG",
      "status" : "active"

contabo
      "KMDvalue" : 0,
      "wiftype" : 204,
      "coin" : "XCG",
      "height" : 3894,
      "pubtype" : 76,
      "txfee" : 10000,
      "p2shtype" : 16,
      "balance" : 0,
      "smartaddress" : "XcYdfQgeuM5f5V2LNo9g8o8p3rPPbKwwCg",
      "status" : "active",
      "installed" : true,
      "rpc" : "127.0.0.1:9386"


Xchange-cli sendtoaddress "XcYdfQgeuM5f5V2LNo9g8o8p3rPPbKwwCg" 1
"fee": -0.00000226,

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"XCG\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"XCG\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Xchange (XCG)
SWAP completed! 1107090426-2239394066 {"expiration":1523033879,"tradeid":0,"requestid":1107090426,"quoteid":2239394066,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"XCG","srcamount":0.69219483,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"8321728649220456449","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.69229483, 0.08010000, 0.69239483, 0.08011000, 0.77891918, 0, 0, 0.77881918, 0, 0, 0],"result":"success","status":"finished","finishtime":1523019210,"bobdeposit":"e46c32f874b60b833bec9679222216f20aee5606124f70be6afc9d54977c718e","alicepayment":"7666ace9e36160f5e9a825b1fb7c8f412f0a03af5a8e4e3d00c4518dbeed03b8","bobpayment":"a20b45988f9cac9a26d0d5c45266a6f594eebc8298dd1ef8c148ac64791cb18d","paymentspent":"ecb870bcb83e111690a50ab66f327c13b39715115f2f24839e789a14da4e1742","Apaymentspent":"edfda08376ef0c58915a635caeff38b04bf56d9b199a11ba912d4ccfabca9e10","depositspent":"ac7920c01e071e0d3a4dcea81dbeb36167a0985a53e602182505a4f4898327e5","method":"tradestatus","finishtime":1523019210}
bobdeposit http://159.203.59.19:3001/tx/e46c32f874b60b833bec9679222216f20aee5606124f70be6afc9d54977c718e
alicepayment https://kmd.explorer.supernet.org/tx/7666ace9e36160f5e9a825b1fb7c8f412f0a03af5a8e4e3d00c4518dbeed03b8
bobpayment http://159.203.59.19:3001/tx/a20b45988f9cac9a26d0d5c45266a6f594eebc8298dd1ef8c148ac64791cb18d
```

## XMCC

```
https://bitcointalk.org/index.php?topic=2083054
https://github.com/monacocoin-net/monoeci-core


src/chainparams.cpp
// monoeci addresses start with 'M'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,50);
// monoeci  script addresses start with 'W'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,73);
// monoeci  private keys start with 'Y' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,77);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 10000; // was 1000

{\"coin\":\"XMCC\",\"name\":\"monoeci\",\"confpath\":\"${HOME#}/.monoeciCore/monoeci.conf\",\"rpcport\":24156,\"pubtype\":50,\"p2shtype\":73,\"wiftype\":77,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/monacocoin-net/monoeci-core
cd monoeci-core
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/monoeci*
mkdir ~/.monoeciCore
echo "server=1" >> ~/.monoeciCore/monoeci.conf
echo "txindex=1" >> ~/.monoeciCore/monoeci.conf
echo "litemode=1" >> ~/.monoeciCore/monoeci.conf
echo "listen=0" >> ~/.monoeciCore/monoeci.conf
echo "listenonion=0" >> ~/.monoeciCore/monoeci.conf
echo "rpcuser=barterxmcc" >> ~/.monoeciCore/monoeci.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.monoeciCore/monoeci.conf
chmod 0600 ~/.monoeciCore/monoeci.conf
monoecid -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"XMCC\"}"

home
      "status" : "active",
      "installed" : true,
      "smartaddress" : "MVY6YEJtqyttdsFrYbEHCnTXSrWmGgKB2q",
      "rpc" : "127.0.0.1:24156",
      "pubtype" : 50,
      "txfee" : 10000,
      "wiftype" : 77,
      "height" : 120142,
      "p2shtype" : 73,
      "coin" : "XMCC",
      "KMDvalue" : 0,
      "balance" : 0

contabo
      "pubtype" : 50,
      "balance" : 0,
      "smartaddress" : "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi",
      "status" : "active",
      "height" : 120142,
      "coin" : "XMCC",
      "installed" : true,
      "txfee" : 10000,
      "rpc" : "127.0.0.1:24156",
      "wiftype" : 77,
      "p2shtype" : 73,
      "KMDvalue" : 0

monoeci-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 1
monoeci-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 1.2
"fee": -0.00004520

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XMCC\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"monacocoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XMCC\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"monacocoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XMCC\",\"rel\":\"BTC\",\"margin\":0.07,\"refbase\":\"monacocoin\",\"refrel\":\"coinmarketcap\"}"

```

## XMY

```
https://bitcointalk.org/index.php?topic=483515.0
https://github.com/myriadteam/myriadcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,50);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,9);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,178);

src/main.cpp
minRelayTxFee = CFeeRate(5000);
src/wallet/wallet.cpp
minTxFee = CFeeRate(1000);

{\"coin\":\"XMY\",\"name\":\"myriadcoin\",\"rpcport\":10889,\"pubtype\":50,\"p2shtype\":9,\"wiftype\":178,\"txfee\":5000}

cd ~/wallets
git clone https://github.com/myriadteam/myriadcoin
cd myriadcoin
./autogen.sh
CFLAGS="-O2 -fPIC -DUSE_SSE2" CPPFLAGS="-O2 -fPIC -DUSE_SSE2" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/myriadcoin*
mkdir ~/.myriadcoin
echo "server=1" >> ~/.myriadcoin/myriadcoin.conf
echo "listen=0" >> ~/.myriadcoin/myriadcoin.conf
echo "listenonion=0" >> ~/.myriadcoin/myriadcoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.myriadcoin/myriadcoin.conf
echo "rpcuser=barterxmy" >> ~/.myriadcoin/myriadcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.myriadcoin/myriadcoin.conf
chmod 0600 ~/.myriadcoin/myriadcoin.conf
myriadcoind -daemon

curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"XMY\"}"

home
   {
      "txfee" : 5000,
      "wiftype" : 178,
      "coin" : "XMY",
      "smartaddress" : "MVY6YEJtqyttdsFrYbEHCnTXSrWmGgKB2q",
      "pubtype" : 50,
      "rpc" : "127.0.0.1:10889",
      "p2shtype" : 9,
      "status" : "active",
      "estimatedrate" : 20
   },

contabo
   {
      "pubtype" : 50,
      "wiftype" : 178,
      "status" : "active",
      "p2shtype" : 9,
      "rpc" : "127.0.0.1:10889",
      "txfee" : 5000,
      "smartaddress" : "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi",
      "coin" : "XMY"
   },

myriadcoin-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 45.78614574
myriadcoin-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 54.94337488
myriadcoin-cli sendtoaddress "M9kx4awASf2spDQ5jtVPXY4Mgjgs9Kmozi" 11.82004627
```

## XOV

```
{\"coin\":\"XOV\",\"name\":\"xovbank\",\"etomic\":\"0x153eD9CC1b792979d2Bde0BBF45CC2A7e436a5F9\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"XOV\"}"

home
      "txfee" : 1000,
      "height" : -1,
      "status" : "active",
      "rpc" : "127.0.0.1:80",
      "balance" : 0,
      "installed" : false,
      "pubtype" : 0,
      "coin" : "XOV",
      "p2shtype" : 85,
      "wiftype" : 188,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c"

contabo
      "txfee" : 1000,
      "balance" : 0,
      "coin" : "XOV",
      "height" : -1,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "p2shtype" : 85,
      "pubtype" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "installed" : false

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"XOV\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"XOV\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"XOV\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
XOVBank (XOV)
SWAP completed! 1077876583-2060140138 {"uuid":"38f763aec31504c45fba96d7a77922f5e0bef267a0946f97c365492fa6c99f89","expiration":1527459078,"tradeid":0,"requestid":1077876583,"quoteid":2060140138,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"XOV","bobtomic":"0x153eD9CC1b792979d2Bde0BBF45CC2A7e436a5F9","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.67220490,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"17839920276135870465","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.67221490, 0.08010000, 0.67222490, 0.08011000, 0.75625051, 0, 0, 0.75624051, 0, 0, 0],"result":"success","status":"finished","finishtime":1527444407,"bobdeposit":"93f42099068bbc14275f6d3688085248fb93d6c052dd18577ed356a81152fc16","alicepayment":"12dba4a5b0d7c74896b6fe808ba9911a647f434d7943a0dcf036814d89b70095","bobpayment":"84c8a59999a75bf266edf1c680f2854f62e710377762484d74d104b4f6f2b5f1","paymentspent":"84fb9278a976e4f8cedca0deb968199c6477057af45d042f9ed7ba71650f26ee","Apaymentspent":"f780c11e3e6b36b71865feffc01bd03c0da828c6fb860da19d4fd4269f780b85","depositspent":"4349884aa89235b85e51166022127c790858da3e1c995ff29557a737bf91affe","method":"tradestatus","finishtime":1527444407}
bobdeposit https://etherscan.io/tx/0xe48e86047da73223176deafece0186175eab089b1b014b894a878d18fb657299
alicepayment https://kmdexplorer.ru/tx/12dba4a5b0d7c74896b6fe808ba9911a647f434d7943a0dcf036814d89b70095
bobpayment https://etherscan.io/tx/0x4e097a3255f0d32cf3e906aab76883797df2c70fbed231eb3fa11450b2432bb6

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"KMD\",\"rel\":\"XOV\",\"fixed\":1}"
```

## XRE

```
https://bitcointalk.org/index.php?topic=1479260.0
https://github.com/RevolverCoin/revolvercoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,0);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,5);
base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1,128);

src/wallet/wallet.h
static const CAmount DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"XRE\",\"name\":\"revolvercoin\",\"rpcport\":8775,\"taddr\":1,\"pubtype\":0,\"p2shtype\":5,\"wiftaddr\":1,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/RevolverCoin/revolvercoin
cd revolvercoin
./autogen.sh
./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/revolvercoin*
mkdir ~/.revolvercoin
echo "server=1" >> ~/.revolvercoin/revolvercoin.conf
echo "listen=0" >> ~/.revolvercoin/revolvercoin.conf
echo "listenonion=0" >> ~/.revolvercoin/revolvercoin.conf
echo "rpcuser=barterxre" >> ~/.revolvercoin/revolvercoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.revolvercoin/revolvercoin.conf
chmod 0600 ~/.revolvercoin/revolvercoin.conf
revolvercoind -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"XRE\"}"

home
   {
      "rpc" : "127.0.0.1:8775",
      "wiftype" : 128,
      "status" : "active",
      "coin" : "XRE",
      "pubtype" : 0,
      "estimatedrate" : 20,
      "smartaddress" : "1NdwJoQVLxj5kCHXKcaLxWrByddbgyHofb",
      "p2shtype" : 5,
      "txfee" : 1000
   },

contabo
   {
      "txfee" : 1000,
      "status" : "active",
      "rpc" : "127.0.0.1:8775",
      "wiftype" : 128,
      "p2shtype" : 5,
      "coin" : "XRE",
      "pubtype" : 0,
      "smartaddress" : "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj"
   },

revolvercoin-cli sendtoaddress "12rnqA2kwds4vYRkWuqTHGT2DWohY8reoj" 9.99966231
"fee": -0.00004520,
```

## XSG

```
https://bitcointalk.org/index.php?topic=2630198.0
https://github.com/Snowgem/Snowgem


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS]     = {0x1C,0x28};
base58Prefixes[SCRIPT_ADDRESS]     = {0x1C,0x2D};
base58Prefixes[SECRET_KEY]         = {0x80};

{\"coin\":\"XSG\",\"name\":\"snowgem\",\"rpcport\":16112,\"taddr\":28,\"pubtype\":40,\"p2shtype\":45,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/Snowgem/Snowgem
cd Snowgem
find . -name "*.sh" -exec chmod +x {} \;
chmod +x depends/config.guess
chmod +x depends/config.sub
chmod +x src/leveldb/build_detect_platform
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh --disable-rust -j4
sudo cp src/snowgemd src/snowgem-cli /usr/local/bin/
sudo strip /usr/local/bin/snowgem*
cd
ln -s .zcash-params .snowgem-params
mkdir ~/.snowgem
echo "server=1" >> ~/.snowgem/snowgem.conf
echo "txindex=1" >> ~/.snowgem/snowgem.conf
echo "listen=0" >> ~/.snowgem/snowgem.conf
echo "listenonion=0" >> ~/.snowgem/snowgem.conf
echo "rpcuser=bartersng" >> ~/.snowgem/snowgem.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.snowgem/snowgem.conf
chmod 0600 ~/.snowgem/snowgem.conf
snowgemd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"XSG\"}"

home
      "KMDvalue" : 0,
      "coin" : "XSG",
      "pubtype" : 40,
      "installed" : true,
      "txfee" : 10000,
      "rpc" : "127.0.0.1:16112",
      "electrum" : "electrumsvr2.snowgem.org:50001",
      "status" : "active",
      "balance" : 0,
      "smartaddress" : "s1iqgXVu95JnWaRFwjdRaGGkpbeirBhbc5o",
      "height" : 280167,
      "wiftype" : 128,
      "p2shtype" : 45"

contabo
      "coin" : "XSG",
      "installed" : true,
      "pubtype" : 40,
      "smartaddress" : "s1P4Y3rXQfyvVkmQAvvggb2MeqXtx2EPtJd",
      "balance" : 9.1485752,
      "p2shtype" : 45,
      "KMDvalue" : 0,
      "rpc" : "127.0.0.1:16112",
      "wiftype" : 128,
      "txfee" : 10000,
      "status" : "active",
      "height" : 280747


snowgem-cli sendtoaddress "s1P4Y3rXQfyvVkmQAvvggb2MeqXtx2EPtJd" 0.1

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"XSG\",\"rel\":\"KMD\",\"price\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"XSG\",\"rel\":\"KMD\",\"relvolume\":0.8,\"price\":1.2}"
SnowGem (XSG)
SWAP completed! 3204974197-2334118960 {"uuid":"65f0190288cc2a3f02b3027df49a5e125c1c9e787cda6bc4701efc408b78eed9","expiration":1531077242,"tradeid":0,"requestid":3204974197,"quoteid":2334118960,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"XSG","srcamount":0.73449133,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.80009000,"alicetxfee":0.00001000,"aliceid":"4668293736257421313","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.73459133, 0.80010000, 0.73469133, 0.80011000, 0.82650274, 0, 0, 0.82640274, 0, 0, 0],"result":"success","status":"finished","finishtime":1531062102,"bobdeposit":"b3c9692d5c70ab548a5ab390531150f25a08fa61e902a559bc42ecc53dd6aea4","alicepayment":"14e0855539211ced13dda74d99a11dc83d626f05584a98ff6f720215b72332d0","bobpayment":"0717b26ea00305077f36760f78c8fe729de72bd4e5ccce6532453ea5c209e02e","paymentspent":"10e06414da741c61acc069349fd82d4f420faf581acdb31f9588d380a793815b","Apaymentspent":"6f3308b6dc1f72fb725c299a7c72d1c9374074c6b6c432e77b2527f89be72720","depositspent":"3b026704e3a46f1619f77ac8318617f7a9112adc72e971b9c25e3efb0b2dfbcd","alicedexfee":"dc76e619f673880848f05f6bca0b24ad7a0d8d651464947e71158e140f29256a","method":"tradestatus","finishtime":1531062102}
bobdeposit https://explorer.snowgem.org/tx/b3c9692d5c70ab548a5ab390531150f25a08fa61e902a559bc42ecc53dd6aea4
alicepayment https://kmdexplorer.ru/tx/14e0855539211ced13dda74d99a11dc83d626f05584a98ff6f720215b72332d0
bobpayment https://explorer.snowgem.org/tx/0717b26ea00305077f36760f78c8fe729de72bd4e5ccce6532453ea5c209e02e

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XSG\",\"rel\":\"BCH\",\"margin\":0.15,\"refbase\":\"snowgem\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XSG\",\"rel\":\"BTC\",\"margin\":0.15,\"refbase\":\"snowgem\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XSG\",\"rel\":\"KMD\",\"margin\":0.15,\"refbase\":\"snowgem\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XSG\",\"rel\":\"LTC\",\"margin\":0.15,\"refbase\":\"snowgem\",\"refrel\":\"coinmarketcap\"}"
```

## XSN

```
https://bitcointalk.org/index.php?topic=3213013.0
https://github.com/X9Developers/XSN


src/chainparams.cpp
// XSN addresses start with 'X'
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,76);
// XSN script addresses start with '7'
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,16);
// XSN private keys start with '7' or 'X'
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,204);

{\"coin\":\"XSN\",\"name\":\"xsn\",\"confpath\":\"${HOME#}/.xsncore/xsn.conf\",\"rpcport\":51473,\"pubtype\":76,\"p2shtype\":16,\"wiftype\":204,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/X9Developers/XSN
cd XSN
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/xsn*
mkdir ~/.xsncore
echo "server=1" >> ~/.xsncore/xsn.conf
echo "txindex=1" >> ~/.xsncore/xsn.conf
echo "listen=0" >> ~/.xsncore/xsn.conf
echo "listenonion=0" >> ~/.xsncore/xsn.conf
echo "litemode=1" >> ~/.xsncore/xsn.conf
#echo "gen=0" >> ~/.xsncore/xsn.conf
echo "rpcport=11473" >> ~/.xsncore/xsn.conf
echo "rpcuser=barterxsn" >> ~/.xsncore/xsn.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.xsncore/xsn.conf
echo "rpcworkqueue=64" >> ~/.xsncore/xsn.conf
echo "rpcthreads=16" >> ~/.xsncore/xsn.conf
chmod 0600 ~/.xsncore/xsn.conf
xsnd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"XSN\"}"

home
      "status" : "active",
      "txfee" : 10000,
      "smartaddress" : "XxKn944PJfwfu8t7BVtZp3XyoyDHjDfiSG",
      "coin" : "XSN",
      "wiftype" : 204,
      "pubtype" : 76,
      "rpc" : "127.0.0.1:11473",
      "KMDvalue" : 0,
      "p2shtype" : 16,
      "installed" : true,
      "balance" : 0,
      "height" : 121228

contabo
      "pubtype" : 76,
      "wiftype" : 204,
      "txfee" : 10000,
      "coin" : "XSN",
      "balance" : 0,
      "installed" : true,
      "rpc" : "127.0.0.1:11473",
      "status" : "active",
      "KMDvalue" : 0,
      "height" : 121225,
      "smartaddress" : "XcYdfQgeuM5f5V2LNo9g8o8p3rPPbKwwCg",
      "p2shtype" : 16


xsn-cli sendtoaddress "XcYdfQgeuM5f5V2LNo9g8o8p3rPPbKwwCg" 1
"fee": -0.00000226

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"XSN\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"XSN\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Stakenet (XSN)
SWAP completed! 2947865189-4157667755 {"uuid":"9491ef05c3022b1f7ff0a2916d20c85c0b461f7edbafc79645f6b091e480fa37","expiration":1527830146,"tradeid":0,"requestid":2947865189,"quoteid":4157667755,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"XSN","srcamount":0.73802165,"bobtxfee":0.00010000,"alice":"KMD","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"17741887513946095617","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.73812165, 0.08010000, 0.73822165, 0.08011000, 0.83047435, 0, 0, 0.83037435, 0, 0, 0],"result":"success","status":"finished","finishtime":1527814874,"bobdeposit":"432f90bd2025a83e2c5b3a6fa69eac43ba4c8850bbe8f5199a0222ba77c19269","alicepayment":"4457d00a4d5c466f22227de293796b61bd4d069832f5b36a3da6f5556631baaf","bobpayment":"b23d7a3b2abf3878135617dae99a814fc4f8e372e62b54dd1f2e847289e0d740","paymentspent":"201d31b16d83d65847185e258cbb7afca7a2879c064b2ddbf1dde70f651d9cee","Apaymentspent":"9c856a64389cdfcc4a5433d72603a85f588aa229357e0e7bf4c40897be9a0cae","depositspent":"3fb5e65f20c034d3e122492b1238e30a22e674ea974cb616142f42851574a783","method":"tradestatus","finishtime":1527814874}
bobdeposit https://xsnexplorer.io/transactions/432f90bd2025a83e2c5b3a6fa69eac43ba4c8850bbe8f5199a0222ba77c19269
alicepayment https://kmdexplorer.ru/tx/4457d00a4d5c466f22227de293796b61bd4d069832f5b36a3da6f5556631baaf
bobpayment https://xsnexplorer.io/transactions/b23d7a3b2abf3878135617dae99a814fc4f8e372e62b54dd1f2e847289e0d740

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XSN\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"stakenet\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XSN\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"stakenet\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"XSN\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"stakenet\",\"refrel\":\"coinmarketcap\"}"
```

## XZC

```
https://bitcointalk.org/index.php?topic=1638450
https://github.com/zcoinofficial/zcoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector < unsigned char > (1, 82);
base58Prefixes[SCRIPT_ADDRESS] = std::vector < unsigned char > (1, 7);
base58Prefixes[SECRET_KEY] = std::vector < unsigned char > (1, 210);

src/wallet/wallet.h
DEFAULT_FALLBACK_FEE = 20000;
DEFAULT_TRANSACTION_MINFEE = 1000;
src/main.h
DEFAULT_MIN_RELAY_TX_FEE = CENT / 10; //0.00100000 zcoin,

{\"coin\":\"XZC\",\"name\":\"zcoin\",\"rpcport\":8888,\"pubtype\":82,\"p2shtype\":7,\"wiftype\":210,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/zcoinofficial/zcoin
cd zcoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/zcoin*
mkdir ~/.zcoin
echo "server=1" >>~/.zcoin/zcoin.conf
echo "txindex=1" >> ~/.zcoin/zcoin.conf
echo "listen=0" >> ~/.zcoin/zcoin.conf
echo "listenonion=0" >> ~/.zcoin/zcoin.conf
echo "rpcuser=barterxzc" >> ~/.zcoin/zcoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.zcoin/zcoin.conf
chmod 0600 ~/.zcoin/zcoin.conf
zcoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"XZC\"}"

home
      "installed" : true,
      "KMDvalue" : 0,
      "p2shtype" : 7,
      "txfee" : 100000,
      "pubtype" : 82,
      "wiftype" : 210,
      "smartaddress" : "aNMQ3hr7ZkivojidL1tUioAhazkx4kNDjU",
      "height" : 64758,
      "balance" : 0,
      "coin" : "XZC",
      "rpc" : "127.0.0.1:8888",
      "status" : "active"

contabo
      "status" : "active",
      "p2shtype" : 7,
      "rpc" : "127.0.0.1:8888",
      "installed" : true,
      "coin" : "XZC",
      "txfee" : 100000,
      "balance" : 0,
      "pubtype" : 82,
      "height" : 64755,
      "wiftype" : 210,
      "smartaddress" : "a2aFa4UPARruz5rrXK9b3YmXpsw3uVVYEq",
      "KMDvalue" : 0

zcoin-cli sendtoaddress "a2aFa4UPARruz5rrXK9b3YmXpsw3uVVYEq" 0.1
zcoin-cli sendtoaddress "a2aFa4UPARruz5rrXK9b3YmXpsw3uVVYEq" 0.12
"fee": 0.00000000
```

## ZCL

```
https://bitcointalk.org/index.php?topic=1671982
https://github.com/z-classic/zclassic


src/chainparams.cpp
// guarantees the first 2 characters, when base58 encoded, are "t1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x1C,0xB8};
// guarantees the first 2 characters, when base58 encoded, are "t3"
base58Prefixes[SCRIPT_ADDRESS]     = {0x1C,0xBD};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100;

{\"coin\":\"ZCL\",\"name\":\"zclassic\",\"rpcport\":8023,\"taddr\":28,\"pubtype\":184,\"p2shtype\":189,\"wiftype\":128,\"txfee\":1000}


cd ~/wallets
git clone https://github.com/z-classic/zclassic
cd zclassic
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh --disable-tests --disable-rust -j4
sudo cp src/zcashd /usr/local/bin/zclassicd
sudo cp src/zcash-cli /usr/local/bin/zclassic-cli
sudo strip /usr/local/bin/zclassic*
mkdir ~/.zclassic
echo "server=1" >> ~/.zclassic/zclassic.conf
echo "listen=0" >> ~/.zclassic/zclassic.conf
echo "listenonion=1" >> ~/.zclassic/zclassic.conf
echo "#proxy=127.0.0.1:9050" >> ~/.zclassic/zclassic.conf
echo "rpcuser=barterzcl" >> ~/.zclassic/zclassic.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.zclassic/zclassic.conf
chmod 0600 ~/.zclassic/zclassic.conf
zclassicd -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ZCL\"}"

home
   {
      "rpc" : "127.0.0.1:8023",
      "smartaddress" : "t1fWYK8pdKHWgLqLRG3PU6Kx7EHpgVRNjCU",
      "wiftype" : 128,
      "p2shtype" : 189,
      "coin" : "ZCL",
      "pubtype" : 184,
      "status" : "active",
      "txfee" : 1000
   },

contabo
   {
      "txfee" : 1000,
      "p2shtype" : 189,
      "rpc" : "127.0.0.1:8023",
      "status" : "active",
      "coin" : "ZCL",
      "wiftype" : 128,
      "smartaddress" : "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH",
      "pubtype" : 184
   },

zclassic-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 0.78659249
"fee": -0.00000226
zclassic-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 0.94390828
"fee": -0.00000374
```

## ZEC

```
https://github.com/zcash/zcash


src/chainparams.cpp
// guarantees the first 2 characters, when base58 encoded, are "t1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x1C,0xB8};
// guarantees the first 2 characters, when base58 encoded, are "t3"
base58Prefixes[SCRIPT_ADDRESS]     = {0x1C,0xBD};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

{\"coin\":\"ZEC\",\"name\":\"zcash\",\"rpcport\":8232,\"taddr\":28,\"pubtype\":184,\"p2shtype\":189,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/zcash/zcash
cd zcash
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh -j4
sudo cp src/zcashd src/zcash-cli /usr/local/bin/
sudo strip /usr/local/bin/zcash*
mkdir ~/.zcash
echo "server=1" >> ~/.zcash/zcash.conf
echo "txindex=1" >> ~/.zcash/zcash.conf
echo "listen=0" >> ~/.zcash/zcash.conf
echo "listenonion=0" >> ~/.zcash/zcash.conf
echo "rpcuser=barterzec" >> ~/.zcash/zcash.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.zcash/zcash.conf
echo "rpcworkqueue=64" >> ~/.zcash/zcash.conf
echo "rpcthreads=16" >> ~/.zcash/zcash.conf
chmod 0600 ~/.zcash/zcash.conf
zcashd -daemon


curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ZEC\"}"

home
   {
      "wiftype" : 128,
      "rpc" : "127.0.0.1:8232",
      "p2shtype" : 189,
      "coin" : "ZEC",
      "pubtype" : 184,
      "status" : "active",
      "txfee" : 10000,
      "smartaddress" : "t1fWYK8pdKHWgLqLRG3PU6Kx7EHpgVRNjCU"
   },

contabo
   {
      "coin" : "ZEC",
      "wiftype" : 128,
      "pubtype" : 184,
      "rpc" : "127.0.0.1:8232",
      "txfee" : 10000,
      "p2shtype" : 189,
      "smartaddress" : "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH",
      "status" : "active"
   },

zcash-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 0.02905717
"fee": -0.00009899,
"fee": -0.00009855,
```

## ZEL

```
https://bitcointalk.org/index.php?topic=2853688.0
https://github.com/Scribbles-MCAMK/Zelcash


src/chainparams.cpp
// guarantees the first 2 characters, when base58 encoded, are "t1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x1C,0xB8};
// guarantees the first 2 characters, when base58 encoded, are "t3"
base58Prefixes[SCRIPT_ADDRESS]     = {0x1C,0xBD};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

{\"coin\":\"ZEL\",\"name\":\"zelcash\",\"rpcport\":16124,\"taddr\":28,\"pubtype\":184,\"p2shtype\":189,\"wiftype\":128,\"txfee\":10000}


cd ~/wallets
git clone https://github.com/Scribbles-MCAMK/Zelcash
cd Zelcash
find . -name "*.sh" -exec chmod +x {} \;
chmod +x depends/config.guess
chmod +x depends/config.sub
chmod +x src/leveldb/build_detect_platform
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh --disable-tests --disable-rust -j4
sudo cp src/zelcashd /usr/local/bin/
sudo cp src/zelcash-cli /usr/local/bin/
sudo strip /usr/local/bin/zelcash*
cd
ln -s .zcash-params .zelcash-params
mkdir ~/.zelcash
echo "server=1" >> ~/.zelcash/zelcash.conf
echo "txindex=1" >> ~/.zelcash/zelcash.conf
echo "listen=0" >> ~/.zelcash/zelcash.conf
echo "listenonion=1" >> ~/.zelcash/zelcash.conf
echo "#proxy=127.0.0.1:9050" >> ~/.zelcash/zelcash.conf
echo "rpcuser=barterzel" >> ~/.zelcash/zelcash.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.zelcash/zelcash.conf
echo "addnode=node.zel.cash" >> ~/.zelcash/zelcash.conf
chmod 0600 ~/.zelcash/zelcash.conf
zelcashd -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ZEL\"}"

home
      "txfee" : 10000,
      "height" : 14994,
      "balance" : 0,
      "smartaddress" : "t1fWYK8pdKHWgLqLRG3PU6Kx7EHpgVRNjCU",
      "status" : "active",
      "rpc" : "127.0.0.1:16124",
      "installed" : true,
      "coin" : "ZEL",
      "p2shtype" : 189,
      "KMDvalue" : 0,
      "wiftype" : 128,
      "pubtype" : 184

contabo
      "txfee" : 10000,
      "smartaddress" : "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH",
      "pubtype" : 184,
      "p2shtype" : 189,
      "status" : "active",
      "wiftype" : 128,
      "height" : 14987,
      "rpc" : "127.0.0.1:16124",
      "coin" : "ZEL",
      "balance" : 0,
      "installed" : true,
      "KMDvalue" : 0

zelcash-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 1
"fee": -0.00000226
```

## ZER

```
https://bitcointalk.org/index.php?topic=1796036.0
https://github.com/zerocurrency/zero
https://github.com/zerocurrencycoin/Zero


src/chainparams.cpp
// guarantees the first 2 characters, when base58 encoded, are "t1"
base58Prefixes[PUBKEY_ADDRESS]     = {0x1C,0xB8};
// guarantees the first 2 characters, when base58 encoded, are "t3"
base58Prefixes[SCRIPT_ADDRESS]     = {0x1C,0xBD};
// the first character, when base58 encoded, is "5" or "K" or "L" (as in Bitcoin)
base58Prefixes[SECRET_KEY]         = {0x80};

src/main.h
DEFAULT_MIN_RELAY_TX_FEE = 100;

{\"coin\":\"ZER\",\"name\":\"zero\",\"rpcport\":23801,\"taddr\":28,\"pubtype\":184,\"p2shtype\":189,\"wiftype\":128,\"txfee\":1000}


cd ~/wallets
git clone https://github.com/zerocurrencycoin/Zero
cd Zero
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./zcutil/build.sh --disable-tests --disable-rust -j4
sudo cp src/zcashd /usr/local/bin/zerod
sudo cp src/zcash-cli /usr/local/bin/zero-cli
sudo strip /usr/local/bin/zero*
mkdir ~/.zero
echo "server=1" >> ~/.zero/zero.conf
echo "listen=0" >> ~/.zero/zero.conf
echo "listenonion=1" >> ~/.zero/zero.conf
echo "#proxy=127.0.0.1:9050" >> ~/.zero/zero.conf
echo "rpcuser=barterzer" >> ~/.zero/zero.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.zero/zero.conf
echo "addnode=35.164.216.74" >> ~/.zero/zero.conf
echo "addnode=94.176.235.178" >> ~/.zero/zero.conf
chmod 0600 ~/.zero/zero.conf
zerod -daemon


curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ZER\"}"

home
   {
      "p2shtype" : 189,
      "rpc" : "127.0.0.1:23801",
      "wiftype" : 128,
      "coin" : "ZER",
      "smartaddress" : "t1fWYK8pdKHWgLqLRG3PU6Kx7EHpgVRNjCU",
      "pubtype" : 184,
      "status" : "active",
      "txfee" : 1000
   },

contabo
   {
      "smartaddress" : "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH",
      "wiftype" : 128,
      "status" : "active",
      "coin" : "ZER",
      "rpc" : "127.0.0.1:23801",
      "txfee" : 1000,
      "pubtype" : 184,
      "p2shtype" : 189
   },

zero-cli sendtoaddress "t1KjPqVStuxefXBUeTLeaR5YwUAznLvoyBH" 1.99950773
"fee": -0.00000226,
```

## ZET

```
https://bitcointalk.org/index.php?topic=267545.0
https://github.com/zetacoin/zetacoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,80);
base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1,9);
base58Prefixes[SECRET_KEY] =     std::vector<unsigned char>(1,224);

src/main.cpp
minRelayTxFee = CFeeRate(5000);
src/wallet/wallet.cpp
minTxFee = CFeeRate(1000);
src/wallet/rpcwallet.cpp
payTxFee = CFeeRate(nAmount, 1000);

{\"coin\":\"ZET\",\"name\":\"zetacoin\",\"rpcport\":11111,\"pubtype\":80,\"p2shtype\":9,\"wiftype\":224,\"txfee\":10000}

cd ~/wallets
git clone https://github.com/zetacoin/zetacoin
cd zetacoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/zetacoin*
mkdir ~/.zetacoin
echo "server=1" >> ~/.zetacoin/zetacoin.conf
echo "txindex=1" >> ~/.zetacoin/zetacoin.conf
echo "listen=0" >> ~/.zetacoin/zetacoin.conf
echo "listenonion=0" >> ~/.zetacoin/zetacoin.conf
echo "rpcport=11111" >> ~/.zetacoin/zetacoin.conf
echo "rpcuser=barterzet" >> ~/.zetacoin/zetacoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.zetacoin/zetacoin.conf
chmod 0600 ~/.zetacoin/zetacoin.conf
zetacoind -daemon

curl --url "http://127.0.0.1:7779" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ZET\"}"

home
   {
      "status" : "active",
      "rpc" : "127.0.0.1:11111",
      "pubtype" : 80,
      "wiftype" : 224,
      "coin" : "ZET",
      "p2shtype" : 9,
      "txfee" : 10000,
      "smartaddress" : "ZZgC5VFY9PoBAsSTHBDqkYd8KzF4bAUSaV"
   },

contabo
   {
      "coin" : "ZET",
      "smartaddress" : "ZDu3bqsok4wAMDagUUUx5JDxZsRAUSVZY2",
      "pubtype" : 80,
      "wiftype" : 224,
      "txfee" : 10000,
      "status" : "active",
      "p2shtype" : 9,
      "rpc" : "127.0.0.1:11111"
   },

zetacoin-cli sendtoaddress "ZDu3bqsok4wAMDagUUUx5JDxZsRAUSVZY2" 28.85243866
```

## ZIL

```
{\"coin\":\"ZIL\",\"name\":\"zilliqa\",\"etomic\":\"0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ZIL\"}"

home
      "wiftype" : 188,
      "height" : -1,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "rpc" : "127.0.0.1:80",
      "status" : "active",
      "balance" : 0,
      "p2shtype" : 85,
      "installed" : false,
      "coin" : "ZIL",
      "txfee" : 1000,
      "pubtype" : 0

contabo
      "txfee" : 1000,
      "balance" : 0,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "p2shtype" : 85,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "installed" : false,
      "status" : "active",
      "height" : -1,
      "coin" : "ZIL"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ZIL\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ZIL\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ZIL\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
Zilliqa (ZIL)
SWAP completed! 1201182235-2822114790 {"uuid":"339c5200fd5eb6f03ddb241f441b5c2d2c6bb599b7a10268a6c3746551bcc316","expiration":1527324531,"tradeid":0,"requestid":1201182235,"quoteid":2822114790,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ZIL","bobtomic":"0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.77028293,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"14901808208222027777","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.77029293, 0.08010000, 0.77030293, 0.08011000, 0.86658829, 0, 0, 0.86657829, 0, 0, 0],"result":"success","status":"finished","finishtime":1527309974,"bobdeposit":"33e7296778c713fed980c6e488282cd9c78606402041de32f7049d5714979972","alicepayment":"9ceede6cf0815f96d13797c358e27a883e1129816e30237d2ba6dd5d38331d08","bobpayment":"d0af3079788fef7df9dd6c3eb53d30255f42b598dc21fdb16826666d380b8822","paymentspent":"441ad3cc8d44db152f630b519df044bf7d199ec86cbdc49fcf54efc606fd3f5a","Apaymentspent":"f4291e7ebd7f5b3be0c23dc1ea78223fdcf3783726a91b694987dcd720b993b6","depositspent":"b669610550e6404d66d06b678342a1b6ca0b467b25906a044faf340d74f488cb","method":"tradestatus","finishtime":1527309974}
bobdeposit https://etherscan.io/tx/0xf7b80e4e99bd4f1bdf7bee63d7245571fed89b5750145a97e62f926f8a31f920
alicepayment https://kmdexplorer.ru/tx/9ceede6cf0815f96d13797c358e27a883e1129816e30237d2ba6dd5d38331d08
bobpayment https://etherscan.io/tx/0xb1ca529196a4993cb55b8dc1368e26b4abfa4c2be5a6db42bd0eb2d2674e04c7

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ZIL\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"zilliqa\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ZIL\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"zilliqa\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ZIL\",\"rel\":\"LTC\",\"margin\":0.05,\"refbase\":\"zilliqa\",\"refrel\":\"coinmarketcap\"}"
```

## ZOI

```
https://bitcointalk.org/index.php?topic=2085112.0
https://github.com/zoinofficial/zoin


src/chainparams.cpp
base58Prefixes[PUBKEY_ADDRESS] = std::vector < unsigned char > (1, 80);
base58Prefixes[SCRIPT_ADDRESS] = std::vector < unsigned char > (1, 7);
base58Prefixes[SECRET_KEY] = std::vector < unsigned char > (1, 208);

src/wallet/wallet.h
DEFAULT_TRANSACTION_MINFEE = 1000;

{\"coin\":\"ZOI\",\"name\":\"zoin\",\"rpcport\":8255,\"pubtype\":80,\"p2shtype\":7,\"wiftype\":208,\"txfee\":1000}


cd ~/wallets
git clone https://github.com/zoinofficial/zoin
cd zoin
./autogen.sh
CFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" CPPFLAGS="-fno-builtin-malloc -fno-builtin-calloc -fno-builtin-realloc -fno-builtin-free" LDFLAGS="-ltcmalloc_minimal" ./configure --with-incompatible-bdb --with-gui=no --disable-tests --disable-bench --without-miniupnpc --disable-zmq
make -j4
sudo make install
sudo strip /usr/local/bin/zoin*
mkdir ~/.zoin
echo "server=1" >> ~/.zoin/zoin.conf
echo "txindex=1" >> ~/.zoin/zoin.conf
echo "listen=0" >> ~/.zoin/zoin.conf
echo "listenonion=0" >> ~/.zoin/zoin.conf
echo "#proxy=127.0.0.1:9050" >> ~/.zoin/zoin.conf
echo "rpcuser=barterzoi" >> ~/.zoin/zoin.conf
echo "rpcpassword=`head -c 32 /dev/urandom | base64`" >> ~/.zoin/zoin.conf
chmod 0600 ~/.zoin/zoin.conf
zoind -daemon


curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ZOI\"}"

home
      "status" : "active",
      "balance" : 0,
      "rpc" : "127.0.0.1:8255",
      "txfee" : 10000,
      "smartaddress" : "ZZgC5VFY9PoBAsSTHBDqkYd8KzF4bAUSaV",
      "p2shtype" : 7,
      "KMDvalue" : 0,
      "installed" : true,
      "coin" : "ZOI",
      "pubtype" : 80,
      "wiftype" : 208,
      "height" : 232754

contabo
      "installed" : true,
      "coin" : "ZOI",
      "p2shtype" : 7,
      "txfee" : 10000,
      "KMDvalue" : 0,
      "height" : 232737,
      "pubtype" : 80,
      "smartaddress" : "ZDu3bqsok4wAMDagUUUx5JDxZsRAUSVZY2",
      "status" : "active",
      "wiftype" : 208,
      "balance" : 0,
      "rpc" : "127.0.0.1:8255"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ZOI\",\"rel\":\"BCH\",\"margin\":0.07,\"refbase\":\"zoin\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ZOI\",\"rel\":\"KMD\",\"margin\":0.07,\"refbase\":\"zoin\",\"refrel\":\"coinmarketcap\"}"


zoin-cli sendtoaddress "ZDu3bqsok4wAMDagUUUx5JDxZsRAUSVZY2" 1
zoin-cli sendtoaddress "ZDu3bqsok4wAMDagUUUx5JDxZsRAUSVZY2" 1.2
"fee": 0.00000000,

zoin-cli sendtoaddress "ZDu3bqsok4wAMDagUUUx5JDxZsRAUSVZY2" 3.59 "" "" true

```

## ZRX

```
{\"coin\":\"ZRX\",\"name\":\"0x\",\"etomic\":\"0xE41d2489571d322189246DaFA5ebDe1F4699F498\",\"rpcport\":80}

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"enable\",\"coin\":\"ZRX\"}"

home
      "installed" : false,
      "balance" : 0,
      "txfee" : 1000,
      "smartaddress" : "0xdf38dd108bab50da564092ad0cd739c4634d963c",
      "p2shtype" : 85,
      "status" : "active",
      "height" : -1,
      "coin" : "ZRX",
      "pubtype" : 0,
      "wiftype" : 188,
      "rpc" : "127.0.0.1:80"

contabo
      "txfee" : 1000,
      "installed" : false,
      "height" : -1,
      "rpc" : "127.0.0.1:80",
      "pubtype" : 0,
      "balance" : 0,
      "status" : "active",
      "wiftype" : 188,
      "p2shtype" : 85,
      "smartaddress" : "0x4e623b150b847da59f064f7c7fcc9f787dae2229",
      "coin" : "ZRX"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ZRX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"eth_withdraw\",\"coin\":\"ZRX\",\"to\":\"0x4e623b150b847da59f064f7c7fcc9f787dae2229\",\"amount\":1.2}"

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"setprice\",\"base\":\"ZRX\",\"rel\":\"KMD\",\"price\":0.1}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"ZRX\",\"rel\":\"KMD\",\"relvolume\":0.08,\"price\":0.12}"
0x (ZRX)
SWAP completed! 3128492861-3637939818 {"uuid":"d205652e0f72ba9a28d3c2330d596d30f0952ad68bfacb74548f54a242ac267e","expiration":1526797370,"tradeid":0,"requestid":3128492861,"quoteid":3637939818,"iambob":1,"Bgui":"nogui","Agui":"","gui":"nogui","bob":"ZRX","bobtomic":"0xE41d2489571d322189246DaFA5ebDe1F4699F498","etomicsrc":"0x4e623b150b847da59f064f7c7fcc9f787dae2229","srcamount":0.72178386,"bobtxfee":0.00001000,"alice":"KMD","etomicdest":"0xdf38dd108bab50da564092ad0cd739c4634d963c","destamount":0.08009000,"alicetxfee":0.00001000,"aliceid":"15506810234844020737","sentflags":["alicespend", "bobspend", "bobpayment", "alicepayment", "bobdeposit", "bobrefund"],"values":[0.72179386, 0.08010000, 0.72180386, 0.08011000, 0.81202684, 0, 0, 0.81201684, 0, 0, 0],"result":"success","status":"finished","finishtime":1526782446,"bobdeposit":"08f18d377ea45792432015bb5b2a68e6f7ae5f3784eac7b062164e3f6c92ac39","alicepayment":"595ad5a53612c1295fe24d5010cfa5cb78613e496cf73db3efd77c25c857af2e","bobpayment":"5bf82336fbc32fc6b8760b00dcefa48cacd232b5e1e7a75ee2f9953663a6f30d","paymentspent":"ff9490ca7a3ebddf92d5b854b480a90c84f59e7d531e84bbde2a5e9cce459862","Apaymentspent":"10cf1101fdcb6ca3f8285c16e1f21467daba27c2b3361158328178fc4fc58542","depositspent":"fe64f5468dc1fffed1552987dc71715a2fdb5657677d78bfbc7e667250735d61","method":"tradestatus","finishtime":1526782446}
bobdeposit https://etherscan.io/tx/0xc7e2de328efdc4ab072b96f97fd66151bf72293d7290e5223041c0efa880e893
alicepayment https://kmdexplorer.ru/tx/595ad5a53612c1295fe24d5010cfa5cb78613e496cf73db3efd77c25c857af2e
bobpayment https://etherscan.io/tx/0xea16b4816711f7636199ca8fb0b06aa9b161ec3d8b5d9c2d8af86f5b9995ec16

curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ZRX\",\"rel\":\"BCH\",\"margin\":0.05,\"refbase\":\"0x\",\"refrel\":\"coinmarketcap\"}"
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"autoprice\",\"base\":\"ZRX\",\"rel\":\"KMD\",\"margin\":0.05,\"refbase\":\"0x\",\"refrel\":\"coinmarketcap\"}"
```
