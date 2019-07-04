# Komodo Developer Path | Create a Blockchain

## Create a Blockchain 

#### Estimated Time: 10 minutes

The following tutorial uses the Komodo tutorial docker image to create a blockchain. This tutorial is part of a series.

[<b>To return to the previous tutorial, click here.</b>](../../../basic-docs/antara/antara-tutorials/overview-of-development-on-komodo-part-0.md)

#### Select the Appropriate Tutorial from the Menu

Begin with the first guided tutorial by selecting `TUTORIALS` and then `TUT1` from the menu. The following screen should appear. Note the detailed instructions onscreen. You may follow these through the tutorial.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-8.png">

</div>

#### Create a Seed Node 

##### Estimated Time: < 1 Minute

The guided tutorial interface follows these screens:

- From the `SEED-MENU` select `SPINUP-SEEDNODE`

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-9.png">

</div>

- Enter `1000` coins as the supply when prompted
- Use the `SEED-GETINFO` menu item to query the chain's current state
  - At this time, you will notice that although our `TUT1` chain has started, the `GETINFO` menu item replies that the chain has `0` blocks
  - This is due to the fact that the chain is still waiting for a mining node to mine blocks

Return to the main `TUT1` menu.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-10.png">

</div>

## Create Mining Node

##### Estimated Time: < 1 Minute

The `TUT1` chain is designed as a blocks-on-demand Smart Chain. This type of chain uses a Proof of Work consensus mechanism for the first 128 blocks, thus forcing the mining of these first blocks, regardless of the number of transactions occurring on the chain. After block 128, the chain stops automatically mining blocks and instead waits until there are a few transactions in the mempool. This style of chain saves computing resources.

For the `TUT1` chain these settings are managed within the pre-built docker image. Later, you will learn how to adjust these settings manually. 

While the settings of the Smart Chain are set to blocks-on-demand, a node on the network has to indicate a desire to mine for the process to begin. Follow the instructions below to launch a mining node on `TUT1`.

Go `BACK` in the menu until you see the options for both `SEED-MENU` and `MINING-MENU`

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-3.png">

</div>

Select `MINING-MENU`, then `SPINUP-MININGNODE`.

Enter `1000` coins as the supply when prompted (we assume here that you entered 1000 coins earlier).

Use the `GETINFO` command to query blockchain state. The chain will still have `0` blocks, but should have `1` connection. This is the connection to the seed node.

## Start Mining

##### Estimated Time: < 1 Minute

- From the `MINING MENU` select `MINING-START`
  - The mining process now begins
  - Mining the first several blocks requires 30 to 90 seconds
- From the `MINING MENU` select `MINER-GETMININGINFO`
  - This queries the mining state of both the network and this node
  - You may see approximately 1.0 solutions per second (`localsolps`)
  - You should see the number of blocks increase when you repeat the `MINER-GETMININGINFO` menu item

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-4.png">

</div>


## Validate An Address

##### Estimated Time: < 1 Minute

The guided tutorial in the docker image automatically creates a blockchain address for the user during the startup process. 

Typically, when blockchain software creates an address for a user, the address is automatically imported into the user's wallet so that the user can use it.

In these tutorials, however, we generate an address that is not automatically imported. This gives you a chance to import the address yourself under the tutorial guidance.

Make sure that you are still in the `MINING-MENU` menu.

Enter the `WALLET` section.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-11.png">

</div>

- Select `VALIDATE` to call the [<b>validateaddress</b>](../../../basic-docs/komodo-api/util.html#validateaddress) Remote Procedure Call (RPC) method.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-12.png">

</div>

The results should be similar to the following.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-5.png">

</div>

Note the `address` in the response. This is the address that was generated for this tutorial.

However, note that the `ismine` value is `false`. (`ismine` stands for "is mine".)

The private key that was automatically generated by the docker image needs to be imported. 

## Import Private Key for the Wallet

In the guided tutorials, you do not need to manage the private key directly. However, this is a good time to become familiar with the concept.

A private key could look like the following.

```
E9873D79C6D87DC0FB6A5778633389_SAMPLE_PRIVATE_KEY_DO_NOT_IMPORT_F4453213303DA61F20BD67FC233AA33262
```

When you enter a private key such as the above into the blockchain software, the automated encryption will match this address with a public key, also called a "pubkey". 

A pubkey can look like the following.

```
04fe53c78e36b86aae8082484a4007b706d5678cabb92d178fc95020d4d8dc41ef44cfbb8dfa7a593c7910a5b6f94d079061a7766cbeed73e24ee4f654f1e51904
```

The public key is the address that receives and holds money. The private key unlocks the address and allows the user to spend money.

Keep the private key private at all times. Never share it - not even with a member of the Komodo team.

<!--

Sidd:

Mylo, we should simply show the address and the private key as a part of the docker tutorial.

-->

To import the private key that was automatically generated for you, select `WALLET`, then `IMPORT-DEV-WALLET`.

This automatically executes the [<b>importprivkey</b>](../../../basic-docs/komodo-api/wallet.html#importprivkey) RPC method, importing the private key and thus the address.

Now, when funds are sent to this address, your wallet has the keys necessary to spend them.

## Check the Wallet Balance

##### Estimated Time: < 1 Minute

From within the `WALLET` menu, select `BALANCE`.

This automatically executes the [<b>getbalance</b>](../../../basic-docs/komodo-api/wallet.html#getbalance) RPC method.  

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-6.png">

</div>

Note that your wallet has the full `1000` coins, and a little extra.

These `1000` coins were mined into your address as a reward for mining the first block of the blockchain. This is called the Genesis Block.

The extra fraction of a coin should be of an amount similar to the displayed `.12532156` above.

This extra fraction of a coin comes in part as a reward for the blocks mined.

By default, each block mined on a Komodo Smart Chain rewards the miner with `0.001` coins.

At the time the screenshot above was taken, the mining node had mined approximately `125` blocks, thus accounting for the extra fraction of a coin.

## List Unspent Transactions (Utxos)

##### Estimated Time: < 1 Minute

The mining node holds the funds. The funds are represented on the blockchain as "unspent transactions," or "utxos." 

Utxos can be difficult for a complete beginner to understand.

A utxo is similar in nature to a dollar bill in your physical wallet. You can have many bills in your wallet, and the total amount of bills you have determines your total amount in your wallet.

Likewise, you can have many utxos in your digital wallet, and the total value of all utxos determines the total amount in your digital wallet.

If you would like a full explanation, [read this post on the Komodo blog](https://komodoplatform.com/whats-utxo/), or read section III of the [Komodo Whitepaper](https://komodoplatform.com/whitepaper).

In this guided tutorial, we will automatically execute a command that allows us to look at the utxos in our wallet. 

Still within the `WALLET` submenu, choose the `LISTUNSPENT` option. This executes the [<b>listunspent</b>]() RPC method. The result should be similar to the following.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-7.png">

</div>

The number of utxos here will differ according to the number of blocks your mining node has mined. Each block mined generates a new utxo in your wallet.

## Stop Mining

##### Estimated Time: < 1 Minute

The [<b>setgenerate</b>]() RPC method tells a node to start and stop mining.

Within the `MINING` menu, choose the `MINING-STOP` menu item.

The screen will flash and then return to the `MINING` menu. This indicates that mining is stopped.

Recall that in this guided tutorial there are only two nodes on the `TUT1` blockchain, and that only one of the nodes is a mining node.

As we have stopped the mining node, the blockchain itself is stopped. If we were to attempt to use the other node to send a transaction to the blockchain, no node would mine this transaction, and therefore the transaction would wait indefinitely for confirmation.

## (Optional) Shut Down Both Nodes

If you would like to exit the tutorial at this time, you may shut down both nodes from within the docker menu.

- `MINING-MENU` -> `SHUTDOWN-NODE-MINER`
- `SEED-MENU` -> `SHUTDOWN-NODE-SEED` 

Otherwise, you may proceed with the tutorial series by clicking on the link below.

--------

[<b>Link to the next tutorial in this series</b>](../../../basic-docs/antara/antara-tutorials/overview-of-development-on-komodo-part-2.md)
