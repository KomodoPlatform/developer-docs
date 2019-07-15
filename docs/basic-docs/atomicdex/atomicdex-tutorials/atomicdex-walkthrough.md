# DEX Walkthrough

Now that you have MarketMaker 2.0 (MM2) installed you are ready for your first atomic swap!

Since we're testing MM2 as a back end, we're going to be doing a few things that a normal user will not be expected to do once we have a GUI or TUI/CLI available. We are working with Ideas By Nature, a user-experience and user-interface design firm, to facilitate this. 

Let's open up the terminal and get started.

## Setting Up the Coin List 

In the Komodo ecosystem we use two blockchain coins, RICK and MORTY, for testing purposes. These coins are freely distributed and have no blockchain scarcity, so you don't want to treat these coins as real currency. Also, if you lose them or destroy them, there's no need to stress. You can always grab more from our faucet. 

Let's set up a file in the `~/KomodoPlatform/target/debug` directory to import the settings for these test coins. Make a file called `coins` and place the following text into it:

```
[{"coin":"RICK","asset":"RICK","fname":"RICK (TESTCOIN)","rpcport":28223,"mm2":1},{"coin":"MORTY","asset":"MORTY","fname":"MORTY (TESTCOIN)","rpcport":63812,"mm2":1}]
```

Save this file. MM2 will search for it automatically on launch.

::: tip
The `coins` file in [this linked repository](https://github.com/jl777/coins) contains the standard coin configuration file used in GUI software.
:::

#### RPC password 

We also need to choose a password. 

Make it a secure one by including at least 8 characters, both uppercase and lowercase letters, and a few numbers and symbols.  

Write this down in a safe location where you won't lose it.  

We have our initial materials, let's launch the software.

## Initiate MarketMaker 2.0

Look at the following command below, but don't execute it yet:

```
stdbuf -oL ./mm2 "{\"gui\":\"MM2GUI\",\"netid\":9999, \"userhome\":\"/${HOME#"/"}\", \"passphrase\":\"YOUR_PASSPHRASE_HERE\", \"rpc_password\":\"YOUR_PASSWORD_HERE\"}" &
```

Replace `YOUR_PASSPHRASE_HERE` and `YOUR_PASSWORD_HERE` with your actual passphrase and password, and then execute the command in the terminal.

Here is an approximate interpretation of the arguments in the command, to help you see what's happening:

| Argument | (Value) | Description |
| -------- | ------- | ----------- |
| gui | MM2GUI | this is a flag that can be ignored for now |
| netid | 9999 | this tells MM2 which network to join. 9999 is a private test network we use here. 0 is the default network. |
| passphrase | YOUR_PASSPHRASE_HERE | your passphrase; this is the source of each of your coins' private keys |
| rpc_password | YOUR_PASSWORD_HERE | your password for protected RPC methods (userpass) |
| userhome | /${HOME#"/"} | the path to your home, called from your environment variables and entered as a regular expression |

Having executed the command, you should see output similar to the following:

```
29 19:39:41, lp_coins:796] ticker = "BTC", method = Some("enable"), block_count = 0 😅 2019-01-29 20:39:41 +0100 [coin KMD no-conf] Warning, coin KMD is used without a corresponding configuration.
cant open.(/root/.komodo/komodo.conf)
29 19:39:41, lp_coins:796] ticker = "KMD", method = Some("enable"), block_count = 0
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

::: tip
Userpass will be renamed to <b>rpc_password</b> for clarity in the near future
:::

Make a new file in the `~/KomodoPlatform/target/debug` directory called `userpass` and enter the following text, including the `rpc_password` you specified earlier:

```
export userpass="RPC_PASSWORD"
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
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"RICK\",\"servers\":[{\"url\":\"electrum1.cipig.net:10017\"},{\"url\":\"electrum2.cipig.net:10017\"},{\"url\":\"electrum3.cipig.net:10017\"}]}"
```

You should get a similar response:

```
{"address":"RLgAgBFHFbG2ma9MDTHyKL5vovftMepBkE","coin":"RICK",balance":16.95595733,"result":"success"}
```

You are now connected to the RICK test-blockchain network.

Let's connect to MORTY (note it uses a different Electrum port).

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"electrum\",\"coin\":\"MORTY\",\"servers\":[{\"url\":\"electrum1.cipig.net:10018\"},{\"url\":\"electrum2.cipig.net:10018\"},{\"url\":\"electrum3.cipig.net:10018\"}]}"
```

You should get a similar response:

```
{"address":"RLgAgBFHFbG2ma9MDTHyKL5vovftMepBkE","coin":"MORTY","balance":11.27710708,"result":"success"}
```

You are now connected to the MORTY test-blockchain network.

## Get MORTY From a Faucet

Note that in the examples the address, `RLgAgBFHFbG2ma9MDTHyKL5vovftMepBkE`, is present in both returned responses.

You will see a different address in your returned responses.

This address is unique to you and you will use it for our trades here.

We don't recommend placing anything valuable in this address for now, as MM2 is still in testing.

On the other hand, RICK and MORTY have no real value, so you can place as much in here as you like!

Let's retrieve some MORTY.

[Click on this link](https://www.atomicexplorer.com/#/faucet/morty) and you should see an address input box. 

Place your address in there, fill out the reCaptcha to prove you're a human, and hit `OK`.

In a minute or so a few MORTY coins will arrive in your address. 

You can check by executing this command:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_balance\",\"coin\":\"MORTY\"}"
```

You should see a similar response:

```
{"address":"RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ","balance":77.7,"coin":"MORTY"}
```

You now have MORTY.

## Observing the Orderbook

MarketMaker 2.0 uses a decentralized orderbook to allow users to buy and sell from each other without having to rely on a centralized service. This gives it an increased level of security, as there is no central agency that can manipulate prices. This also prevents "wash" trading, where trading activity is faked. 

To see the orderbook's current state, execute the following command:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"RICK\",\"rel\":\"MORTY\"}"
```

This sends a request to MM2 to see who is willing to give up RICK for MORTY.

The call will return a similar result:

```
{"bids":[],"numbids":0,"biddepth":0,"asks":[{"coin":"RICK","address":"RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh","price":0.89999998,"numutxos":0,"avevolume":0,"maxvolume":10855.85028615,"depth":0,"pubkey":"5a2f1c468b7083c4f7649bf68a50612ffe7c38b1d62e1ece3829ca88e7e7fd12","age":5,"zcredits":0}],"numasks":1,"askdepth":0,"base":"RICK","rel":"MORTY","timestamp":1549319941,"netid":9999}
```

This is the current orderbook.

Now, you'll notice that the output isn't easily readable. Here's where we should start using `jq`.

You may remember that we installed software called `jq` during the setup process. `jq` is optional, but it is recommended as it makes reading the output in the terminal easier.

To activate `jq`, simply add the following to the end of any command: ` | jq`.

For example:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"orderbook\",\"base\":\"RICK\",\"rel\":\"MORTY\"}" | jq
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
      "coin": "RICK",
      "address": "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh",
      "price": 1,
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
  "base": "RICK",
  "rel": "MORTY",
  "timestamp": 1549320152,
  "netid": 9999
}
```

That's much easier to read. We can easily see someone with the address `RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh`.

```
"address": "RJTYiYeJ8eVvJ53n2YbrVmxWNNMVZjDGLh",
```

They are willing to give up RICK for MORTY.

```
"base": "RICK",
"rel": "MORTY",
```

They are asking for `1` MORTY for every 1 RICK. 

```
"price": 1,
```

They have a total of `10855.85028615` available to trade. 

```
"maxvolume": 10855.85028615,
```

## Initiate a Swap

Let's create a RICK/MORTY `buy` order

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"buy\",\"base\":\"RICK\",\"rel\":\"MORTY\",\"volume\":\"1\",\"price\":\"1\"}" | jq
```

You should receive a similar response:

```
{
    "result": {
        "action": "Buy",
        "base": "RICK",
        "base_amount": "1",
        "dest_pub_key": "0000000000000000000000000000000000000000000000000000000000000000",
        "method": "request",
        "rel": "MORTY",
        "rel_amount": "1",
        "sender_pubkey": "c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920",
        "uuid": "288743e2-92a5-471e-92d5-bb828a2303c3"
    }
}
```

If you see order data in the response, the order was successfully submitted to the network.

Your swap is not yet started, however.

From here, everything is automated.

If your order is matched you will see something similar in terminal output:

```
26 10:51:50, lp_ordermatch:333] Entering the taker_swap_loop RICK/MORTY
26 10:51:51, lp_ordermatch:490] CONNECTED.({"dest_pub_key":"c213230771ebff769c58ade63e8debac1b75062ead66796c8d793594005f3920","maker_order_uuid":"cbe664e7-3be5-4b45-9bd0-03c6a785e636","method":"connected","sender_pubkey":"199fe4169c30f464bc022273de0c893b4e2864128cdc9f7126fa24bc0910fd0e","taker_order_uuid":"c4d1b840-ebe8-4e44-9cb8-f6c767d3972f"})
26 10:52:12, lp_swap:1629] Received 'negotiation@c4d1b840-ebe8-4e44-9cb8-f6c767d3972f' (69 bytes, crc 794323698)
26 10:52:12, lp_swap:1658] Sending 'negotiation-reply@c4d1b840-ebe8-4e44-9cb8-f6c767d3972f' (69 bytes, crc 2294558621)
26 10:52:53, lp_swap:1665] Received 'negotiated@c4d1b840-ebe8-4e44-9cb8-f6c767d3972f' (1 bytes, crc 2768625435)
26 10:53:00, lp_swap:1731] Taker fee tx hash 2e019f6eb2e43b4d96c6400c86c0b65364024a21e8feb555aa108d3c9518989c
26 10:53:00, lp_swap:1740] Sending 'taker-fee@c4d1b840-ebe8-4e44-9cb8-f6c767d3972f' (244 bytes, crc 3461506896)
26 10:53:44, lp_swap:1748] Received 'maker-payment@c4d1b840-ebe8-4e44-9cb8-f6c767d3972f' (242 bytes, crc 2227964296)
26 10:53:44, lp_swap:1764] Got maker payment 5648da6db5143551fa6ceffe7ef7b0a21b2a4dd479cb7a12dd46f73f2fd87597
26 10:53:45, rpc_clients:111] Waiting for tx 5648da6db5143551fa6ceffe7ef7b0a21b2a4dd479cb7a12dd46f73f2fd87597 confirmations, now 0, required 1
26 10:53:56, rpc_clients:111] Waiting for tx 5648da6db5143551fa6ceffe7ef7b0a21b2a4dd479cb7a12dd46f73f2fd87597 confirmations, now 0, required 1
26 10:54:06, rpc_clients:111] Waiting for tx 5648da6db5143551fa6ceffe7ef7b0a21b2a4dd479cb7a12dd46f73f2fd87597 confirmations, now 0, required 1
26 10:54:16, rpc_clients:111] Waiting for tx 5648da6db5143551fa6ceffe7ef7b0a21b2a4dd479cb7a12dd46f73f2fd87597 confirmations, now 0, required 1
26 10:54:27, rpc_clients:111] Waiting for tx 5648da6db5143551fa6ceffe7ef7b0a21b2a4dd479cb7a12dd46f73f2fd87597 confirmations, now 0, required 1
26 10:54:43, lp_swap:1863] Taker payment tx hash 368a9ee2db36feb6870266695be72e8ed8d1beb2afd95d62920f1d620941fff2
26 10:54:44, lp_swap:1885] Sending 'taker-payment@c4d1b840-ebe8-4e44-9cb8-f6c767d3972f' (242 bytes, crc 3588913089)
26 10:57:11, lp_swap:1902] Taker payment spend tx 364c0df46028be2439f15a31ddae534a98d0e20ec22464c69a9086807f3afc89
26 10:57:14, lp_swap:1949] Maker payment spend tx b8c2a30f23cebb48f0d8fe0a048a65755ca5b8f56f4c68f80d044acd0f8e1ce6
· 2019-06-26 17:57:14 +0700 [swap uuid=c4d1b840-ebe8-4e44-9cb8-f6c767d3972f] Finished
    Maker payment spent...
    Taker payment spent...
    Taker payment sent...
    Maker payment validated and confirmed...
    Maker payment wait confirm started...
    Maker payment received...
    Taker fee sent...
    Negotiated...
    Started...
```

When you see that last line, you know that your swap went through:

```
29 22:48:03, lp_ordermatch:781] Swap finished successfully
```

Let's check by looking at your RICK balance. Execute this command:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"my_balance\",\"coin\":\"RICK\"}" | jq
```

You should receive a similar response, the balance will be a bit less than volume set on trade as you have to pay the fee to mine your swap transaction:

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   192  100    77  100   115    377    563 --:--:-- --:--:-- --:--:--   945
{
  "address": "RQNUR7qLgPUgZxYbvU9x5Kw93f6LU898CQ",
  "balance": 0.99999,
  "coin": "RICK"
}
```

Congratulations! You are one of the first people in history to trade a currency without any help from a middleman and without even having to know your trading partner.

When you are finished, exit using the following command:

```
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"stop\"}"
```

Please reach out to us [on Discord](https://komodoplatform.com/discord) and tell us about your experience.
