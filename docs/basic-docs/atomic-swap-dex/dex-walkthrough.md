# DEX Walkthrough

Now that you have MarketMaker 2.0 (MM2) installed you are ready for your first atomic swap!

Since we're testing MM2 as a back end, we're going to be doing a few things that a normal user will not be expected to do once we have a GUI or TUI/CLI available. We are working with Ideas By Nature, a user-experience and user-interface design firm, to facilitate this. 

Let's open up the terminal and get started.

## Setting Up Coin List 

In the Komodo ecosystem we use two blockchain coins, BEER and PIZZA, for testing purposes. These coins are freely distributed and there's no blockchain scarcity, so you don't want to treat these coins as real currency. Also, if you lose them or destroy them, there's no need to stress. You can always just grab more from our faucet. 

Let's set up a file in the `~/KomodoPlatform/target/debug` directory to import the settings for these test coins. Make a file called `coins` and place the following text into it:

```
[{"coin": "PIZZA","asset": "PIZZA","txversion":4,"rpcport": 11608},{"coin": "BEER","txversion":4,"asset": "BEER","rpcport": 8923}]
```

Save this file. MM2 will search for it automatically on launch.

#### userpass 

We also need to choose a password. 

Make it a secure one by including at least 8 characters, both uppercase and lowercase letters, and a few numbers and symbols.  

Write this down in a safe location where you won't lose it.  

We have our initial materials, let's launch the software.

## Initiate MarketMaker 2.0

Look at the following command below, but don't execute it yet:

```
stdbuf -oL ./mm2 "{\"gui\":\"MM2GUI\",\"netid\":9999,\"client\":1, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"YOUR_PASSWORD_HERE\"}" &
```

Find the phrase, `YOUR_PASSWORD_HERE`. Replace that with your actual password, and then execute the command in the terminal.

Here is an approximate interpretation of the arguments in the command, to help you see what's happening:

| Argument | (Value) | Description |
| -------- | ------- | ----------- |
| gui | MM2GUI | this is a flag that can be ignored for now |
| netid | 9999 | this tells MM2 which network to join. 9999 is a private test network we use here. 0 is the default network. |
| passphrase | YOUR_PASSWORD_HERE | your password |
| userhome | /${HOME#"/"} | the path to your home, called from your environment variables and entered as a regular expression |
| client | 1 | this tells MarketMaker 2.0 that you are here to buy (e.g. to act as an Alice node), rather than to sell (e.g. to act as a Bob node) |

Having executed the command, you should see output similar to the following:

```
userpass.(PLACEHOLDER FOR YOUR USERPASS) ← USERPASS FOR API CALLS!
29 19:39:41, lp_coins:796] ticker = "BTC", method = Some("enable"), block_count = 0 😅 2019-01-29 20:39:41 +0100 [coin KMD no-conf] Warning, coin KMD is used without a corresponding configuration.
cant open.(/root/.komodo/komodo.conf)
29 19:39:41, lp_coins:796] ticker = "KMD", method = Some("enable"), block_count = 0
userpass.(PLACEHOLDER FOR YOUR USERPASS) ← USERPASS FOR API CALLS!
RPCport.7783 remoteport.7782, nanoports 47762 47772 47782
29 19:39:41, peers:942] initialize] netid 9999 public key ab44ae49d2ff89295ee9a0574e89a2bdd7bfbb4f1a34f7d5c0256cf06e89485d preferred port 47773 drill false
connected to push.(tcp://333.333.333.333:47762) pushsock.0 valid.1  | connected to sub.(tcp://333.333.333.333:47772) subsock.1 valid.1 numactive.1
connected to push.(tcp://333.333.333.333:47762) pushsock.2 valid.1  | connected to sub.(tcp://333.333.333.333:47772) subsock.3 valid.1 numactive.1
_LPaddpeer 333.333.333.333 -> numpeers.2 mypubsock.-1 other.(0)
29 19:39:41, rpc:334] >>>>>>>>>> DEX stats 127.0.0.1:7783 DEX stats API enabled at unixtime.1548790781 <<<<<<<<<
· 2019-01-29 20:39:41 +0100 [dht-boot] DHT bootstrap ... Done.
New priority.1 max_Reserved_msgs.1
29 19:40:01, lp_signatures:613] lp_notify_recv] hailed by peer: 127.0.0.85
29 19:40:01, peers:996] investigate_peer] ip 127.0.0.85 preferred port 7803
29 19:40:01, peers:355] Sending a ping to V4(127.0.0.85:7803)…
connected to push.(tcp://127.0.0.85:7793) pushsock.4 valid.1  | connected to sub.(tcp://127.0.0.85:7803) subsock.5 valid.1 numactive.2
_LPaddpeer 127.0.0.85 -> numpeers.3
```

The terminal will then repeat similar output to the following every so often:

```
04 21:28:47, peers:996] investigate_peer] ip 54.36.126.42 preferred port 7803
04 21:28:47, peers:355] Sending a ping to V4(54.36.126.42:7803)…
04 21:29:08, lp_signatures:613] lp_notify_recv] hailed by peer: 54.36.126.42
```

If you see something similar, MarketMaker 2.0 is up and running!

## Setting userpass Environment Variable

Before going too far, let's look back at the terminal output above, grab some information, and place it as an environment variable in our terminal. This will allow us to call this information easily when we need it.

```
userpass.(PLACEHOLDER FOR YOUR USERPASS) ← USERPASS FOR API CALLS!
```

You can find that content by looking at the terminal output returned directly after launching MM2. You will see different text in the `PLACEHOLDER FOR YOUR USERPASS` location.

Select that text with your mouse and copy it. 

(Normally, to copy in the terminal you need to hit `CTRL + SHIFT + C` on Windows/Linux, or `CMD + SHIFT + C` on MacOS).

Make a new file in the `~/KomodoPlatform/target/debug` directory called `userpass` and enter the following text, including your userpass:

```
export userpass="YOUR_USERPASS"
```

Save it, and then in the terminal execute:

```
source userpass
```

Test it by executing:

```
echo $userpass
```

You should see your userpass as a returned value.

::: tip
The `userpass` environment variable will remain in our terminal's memory until we close the session. When we open up a new session later, we need to create the `userpass` environment variable again. Later, a GUI designer can create functionality to perform this automatically.  
:::

## Connect to the Relevant Coin Networks

While we did set up the coins' configuration properties in the internal files, MM2 isn't going to connect to their blockchain networks immediately. 

One reason for this is that if you trade between many coins, the startup process would require connecting to every coin all at once.

We'll tell MM2 that we're ready to activate these coins now.

Execute the following command:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"BEER\",\"urls\":[\"electrum1.cipig.net:10022\",\"electrum2.cipig.net:10022\",\"electrum3.cipig.net:10022\"]}"
```

You should get a similar response:

```
{"address":"RLgAgBFHFbG2ma9MDTHyKL5vovftMepBkE","balance":16.95595733,"result":"success"}
```

You are now connected to the BEER test-blockchain network.

Let's connect to PIZZA.

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"PIZZA\",\"urls\":[\"electrum1.cipig.net:10024\",\"electrum2.cipig.net:10024\",\"electrum3.cipig.net:10024\"]}"
```

You should get a similar response:

```
{"address":"RLgAgBFHFbG2ma9MDTHyKL5vovftMepBkE","balance":11.27710708,"result":"success"}
```

You are now connected to the PIZZA test-blockchain network.

## Get PIZZA From a Faucet

Note that in the examples the address, `RLgAgBFHFbG2ma9MDTHyKL5vovftMepBkE`, is present in both returned responses.

You will see a different address in your returned responses.

This address is unique to you and you will use it for our trades here.

We don't recommend placing anything valuable in this address for now, as MM2 is still in testing.

On the other hand, BEER and PIZZA have no real value, so you can place as much in here as you like!

Let's retrieve some PIZZA.

[Click on this link](https://www.atomicexplorer.com/#/faucet/pizza) and you should see an address input box. 

Place your address in there, fill out the reCaptcha to prove you're a human, and hit `OK`.

In a minute or so a few PIZZA coins will arrive in your address. 

You can check by executing this command:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_balance\",\"coin\":\"PIZZA\"}"
```

You should see a similar response:

```
{"address":"RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ","balance":77.7,"coin":"PIZZA"}
```

You now have PIZZA.

## Observing the Orderbook

MarketMaker 2.0 uses a decentralized orderbook to allow users to buy and sell from each other without having to rely on a centralized service. This gives it an increased level of security, as there is no central agency that can manipulate prices. This also prevents "wash" trading, where trading activity is faked. 

To see the orderbook's current state, execute the following command:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"BEER\",\"rel\":\"PIZZA\"}"
```

This sends a request to MM2 to see who is willing to give up BEER for PIZZA.

The call will return a similar result:

```
{"bids":[],"numbids":0,"biddepth":0,"asks":[{"coin":"BEER","address":"RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh","price":0.89999998,"numutxos":0,"avevolume":0,"maxvolume":10855.85028615,"depth":0,"pubkey":"5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12","age":5,"zcredits":0}],"numasks":1,"askdepth":0,"base":"BEER","rel":"PIZZA","timestamp":1549319941,"netid":9999}
```

This is the current orderbook.

Now, you'll notice that the output isn't easily readable. Here's where we should start using `jq`.

You may remember that we installed software called `jq` during the setup process. `jq` is optional, but it is recommended as it makes reading the output in the terminal easier.

To activate `jq`, simply add the following to the end of any command: ` | jq`.

For example:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"BEER\",\"rel\":\"PIZZA\"}" | jq
```

(If using `jq` gives you troubles, you can remove it from any of the commands without issue. It is only here for convenience.)

Here's the response:

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   505  100   377  100   128   122k  42666 --:--:-- --:--:-- --:--:--  246k
{
  "bids": [],
  "numbids": 0,
  "biddepth": 0,
  "asks": [
    {
      "coin": "BEER",
      "address": "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh",
      "price": 0.89999998,
      "numutxos": 0,
      "avevolume": 0,
      "maxvolume": 10855.85028615,
      "depth": 0,
      "pubkey": "5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12",
      "age": 9,
      "zcredits": 0
    }
  ],
  "numasks": 1,
  "askdepth": 0,
  "base": "BEER",
  "rel": "PIZZA",
  "timestamp": 1549320152,
  "netid": 9999
}
```

That's much easier to read. We can easily see someone with the address `RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh`.

```
"address": "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh",
```

They are willing to give up BEER for PIZZA.

```
"base": "BEER",
"rel": "PIZZA",
```

They are asking for `0.89999998` PIZZA for every 1 BEER. 

```
"price": 0.89999998,
```

They have a total of `10855.85028615` available to trade. 

```
"maxvolume": 10855.85028615,
```

## MM2 Needs Wiggle Room

Here's the only tricky part about executing atomic swaps.

Earlier, you saw that the user selling `BEER` is willing to go as low as `0.89999998` PIZZA for every `1` BEER coin. 

Naturally, you want to get as much BEER for your PIZZA as you can manage. Therefore, as you prepare to sell your PIZZA you are inclined to say that you want to give up `0.89999998` PIZZA for every `1` BEER coin.

This is where the nature of atomic swaps differentiates from the traditional method. 

There's a tremendous amount of automation happening inside MM2, and the Internet environment of both your machine and the machine of your trading partner are likely of varying quality. Therefore, you need to give MM2 some wiggle room in the price. This will help ensure that both sides of the trade are certain they can commit. 

You need to list your price a bit higher than the price that your trading partner originally offered.

This aspect of your experience can later be refined through a proper user-experience and user-interface design (UX/UI) treatment. 

::: tip
The need to give MM2 some wiggle room goes down as more users create trade offers for these coin on this network. If a trading pair on a MM2 network becomes extremely popular, the need for wiggle room can all but disappear. 
:::

## Initiate a Swap

Let's say that we'll set the wiggle room for a few decimal points higher, `0.95`. That should be enough.

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"BEER\",\"rel\":\"PIZZA\",\"relvolume\":1,\"price\":0.95}" | jq
```

You should receive a similar response:

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   714  100   565  100   149    464    122  0:00:01  0:00:01 --:--:--   587
{
  "result": "success",
  "swaps": [
    [
      877267405,
      379810065
    ]
  ],
  "netamounts": [],
  "pending": {
    "uuid": "78103b83916dac9948a46ac3406281f20e0e17accb2efc491c3de2e6e81f5c4e",
    "expiration": 1549320550,
    "timeleft": 29,
    "tradeid": 1275602112,
    "requestid": 0,
    "quoteid": 0,
    "bob": "BEER",
    "base": "BEER",
    "basevalue": 1.0530423,
    "alice": "PIZZA",
    "rel": "PIZZA",
    "relvalue": 1.0002,
    "desthash": "edb2a3d86a7c1b3665a9bd269974ca154e005c0afa3e95e0e7da6e9bd231ae11",
    "aliceid": 4041324791
  },
  "uuid": "78103b83916dac9948a46ac3406281f20e0e17accb2efc491c3de2e6e81f5c4e"
}
```

If you see `"result": "success"`, it means the swap was successfully submitted to the network.

Your swap is not yet complete, however.

From here, everything is automated.

Watch the terminal output for something similar:

```
29 22:46:03, lp_ordermatch:601] Alice max price: 0.92092
>>>>>>>>>> received quote BEER/PIZZA 0.90733223
29 22:46:04, lp_ordermatch:1158] aliceid.3362797489 got new bestprice 0.9073322323244047 dynamictrust -1.10236255 (unconf 0) slowresponse.0
>>>>>>>>>> received quote BEER/PIZZA 0.91685482
29 22:46:06, lp_ordermatch:1225] send LP_connect aliceid.3362797489 0.9073322323244047
29 22:46:06, lp_ordermatch:1540] CONNECTED.({"address":"RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh","aliceid":3362797489,"base":"BEER","desthash":"ab44ae49d2ff89295ee9a0574e89a2bdd7bfbb4f1a34f7d5c0256cf06e89485d","destsatoshis":"100020000","desttxfee":"1000","etomicdest":"","etomicsrc":"","gui":"cli","maxprice":0.92092,"method":"connected","method2":"connected","pair":"tcp://333.333.333.333:29721","price":0.90733223,"proofsend CONNECT for %u-%u\n":[],"quoteid":3584635608,"quotetime":1548801966,"rel":"PIZZA","requestid":1448202645,"satoshis":"110236255","srchash":"5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12","timestamp":1548801962,"tradeid":2144325567,"txfee":"1000","uuid":"647413d73cb57d22782e94f88bc576b94b2bd1ead20c8dccea54de89f50ffdef"})
29 22:46:07, lp_ordermatch:1110] alice ab44ae49d2ff89295ee9a0574e89a2bdd7bfbb4f1a34f7d5c0256cf06e89485d received CONNECTED.(3362797489) mpnet.0 fill.0 gtc.0
CONNECTED mpnet.0 fill.0 gtc.0 numpending.0 tradeid.2144325567 requestid.1448202645 quoteid.3584635608 pairstr.tcp://333.333.333.333:29721
BEER/PIZZA bid 0.92092000 ask 0.00000000
alice pairstr.(tcp://333.333.333.333:29721) pairsock.15
29 22:46:07, lp_ordermatch:779] Entering the taker_swap_loop
29 22:46:23, lp_swap:521] Received 'negotiation@tcp://333.333.333.333:29721' (102 bytes, crc 385155296)
29 22:46:23, lp_swap:544] Sending 'negotiation-reply@tcp://333.333.333.333:29721' (102 bytes, crc 3978676337)
29 22:47:00, lp_swap:545] Received 'negotiated@tcp://333.333.333.333:29721' (1 bytes, crc 2768625435)
29 22:47:01, lp_swap:567] Taker fee tx hash 1b8ac4dc89e28888f06905226d08a357d06453ced24f58744b889e11f4cad3ec
29 22:47:01, lp_swap:568] Sending 'taker-fee@tcp://333.333.333.333:29721' (252 bytes, crc 334610828)
29 22:47:39, lp_swap:573] Received 'maker-payment@tcp://333.333.333.333:29721' (358 bytes, crc 675425064)
29 22:47:39, lp_swap:593] Got maker payment cbe2f6e361260f85b99f4e16b00769c221d5b93b05c9eca1c5338c8d03fe93b0
29 22:47:41, lp_swap:623] Taker payment tx hash f29a0e07ad0c961c1728c851c6b6fa4524d98beeb6be4aa6789ed3f5be331830
29 22:47:41, lp_swap:626] Sending 'taker-payment@tcp://333.333.333.333:29721' (358 bytes, crc 2915550252)
29 22:48:01, lp_swap:638] Taker payment spend tx 94bd9bbbc351eda3fc1b82d460c295e65142574ca1f4214491fca2715124630e
29 22:48:03, lp_swap:667] Maker payment spend tx e7bbd4750dd17bf2e719c6953c2f3b57d3b02b39008dc3dad7e447d29689d270
· 2019-01-29 23:48:03 +0100 [swap] Spending maker payment…
    Waiting for taker payment spend…
    Sending the Taker fee…
    Waiting for the confirmation of the Maker payment…
    Waiting for Maker payment… Done.
    Sending Taker fee…
    Waiting for Maker negotiated… Done.
    Waiting for Maker negotiation data… Done.
29 22:48:03, lp_ordermatch:781] Swap finished successfully
```

When you see that last line, you know that your swap went through:

```
29 22:48:03, lp_ordermatch:781] Swap finished successfully
```

Let's check by looking at your BEER balance. Execute this command:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_balance\",\"coin\":\"BEER\"}" | jq
```

You should receive a similar response:

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   192  100    77  100   115    377    563 --:--:-- --:--:-- --:--:--   945
{
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 1.1,
  "coin": "BEER"
}
```

Congratulations! You've just been one of the first people in history to trade a currency without any help from a middleman and without even having to know your trading partner.

Please reach out to us [on Discord](https://komodoplatform.com/discord) and tell us about your experience.

Onward and upward...
