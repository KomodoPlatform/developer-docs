# Komodo Developer Path | Using a Faucet

#### Total Estimated Time: 5 minutes

This tutorial is part of a series. 

[<b>To return to the previous tutorial, click here.</b>](../../../basic-docs/antara/antara-tutorials/overview-of-development-on-komodo-part-1.md)

## Introduction

In the non-digital world, a faucet is a tap fitting of your regular bathroom or kitchen water supply. Faucets sometimes drip. 

A blockchain faucet is based on this concept. The digital faucet drips small amounts of coins to people that send a request to the faucet.

In this tutorial, we use a Komodo technology called an Antara Module to create a faucet on our `TUT1` Smart Chain. 

There are many types of Antara Modules, and the [Faucet Antara Module]() is but one of them.

Transferring funds via the faucet will allow us to perform other tasks further in the tutorials.

#### The Expected Current State of Our TUT1 Smart Chain

- The mining node has ~1000 coins
- The mining node has several utxos
  - One large utxo with approximately 1000 coins
  - Many small utxos, each having 0.0001 coins
    - These utxos are rewards for mining blocks 
- Both the mining node and the seed node should be running
  - If you stopped the nodes at the end of the last tutorial, restart them using the `SPINUP` functions found within each node's menu
- The mining node should be set to mine
  - To restart the mining node, use the `MINING-START` function in the `MINING-MENU` section

#### Next Steps in the Tutorial

- On the mining node we send some of our funds to the chain's built-in faucet
  - To accomplish this, in this guided tutorial we use an automated version of the [<b>faucetfund</b>]() Remote Procedure Call (RPC)
- On the seed node, which currently has 0 coins, we send a request to the faucet for funds

## Send All Funds to Self 

##### Estimated Time: 2 minutes

We first consolidate all the utxos in our wallet, both large and small, into a single utxo. We send this consolidated utxo to the Antara Module that acts as a faucet.

The reason we first consolidate the utxos into one is related to a subtle nuance of Antara Module technology. One requirement of all funds entering an Antara Module is that they must have been spent at least once before. This requirement simplifies some of the underlying code of an Antara Module.

All the utxos in our current mining wallet were generated either in the first block, or they were generated as a part of a mining reward. Therefore, they have not yet been spent.

To consolidate them in the guided tutorial, we use an automated version of the [<b>sendtoaddress</b>]() RPC.

- Enter the `MINING-MENU`
- Enter the `WALLET` submenu and select `SENDALLSELF`
  - This tutorial function performs several automated tasks
  - First, the function checks our total balance using the <b>getinfo</b> RPC
  - The function gathers the address that we saw earlier in the <b>validateaddress</b> RPC
  - Finally, the function sends the entire amount to this address using the <b>sendtoaddress</b> RPC
  - This sends everything in our wallet in a circular loop back into our wallet

Wait for this transaction to be mined in a block. (This process is also called "confirming a transaction.")

One way to check the status of the transaction is to use the `LIST` function from the last tutorial. Right after performing the `SENDALLSELF` function, you will have zero utxos in your wallet. Once a utxo reappears in your wallet, you know that the transaction is successfully mined.

::: tip

When you finally have a utxo in your wallet again, you will notice that you have two utxos instead of one. This may be surprising, but this provides a good opportunity to learn about "dust."

The mathematics behind blockchain technology are complex, and transactions are rarely able to have perfectly clean total amounts. There is often a remnant of funds in the amount of a tiny fraction of a coin. These leftover funds remain in your wallet as a separate utxo, and as they are typically of such little value, they are effectively useless. This is why they are called "dust."

:::

## Send Funds to the Faucet 

##### Estimated Time: 1 minute

In this guided tutorial, we use an automated version of the [<b>faucetfund</b>]() RPC. This takes any number of coins we choose from our wallet and sends them to the Faucet Antara Module.

Once the funds are in the module, other users on the chain can request to have some of the funds. The funds are disbursed in small amounts, and the module has a feature that discourages users from spamming the faucet to drain all of the funds at once.

- From the `MINING-MENU`, select `FAUCET`
- Select the `FUNDFAUCET` function
- Enter `200` as the amount of coins to send
  - (This amount is arbitrary. We choose `200` for simplicity's sake.)

## Claim a Small Amount of Funds from the Faucet

##### Estimated Time: 5 Minutes

Use the `BACK` function on each page until you again reach the option to choose between the `MINING-MENU` and the `SEED-MENU`. 

Choose the `SEED-MENU`.

#### Validate the Seed Wallet

Just as before, we want to make sure that we've imported our tutorial private key before we send any funds to any address.

- Select `WALLET` and then `VALIDATE`
- If the proper `ismine` is `false`, we need to import the private key
- From the `WALLET` submenu, select `IMPORT-DEV-WALLET`
  - This automatically performs the <b>importprivkey</b> RPC for us

#### Claim Funds from the Faucet

- Return to the `SEED-MENU` section.
- Select `FAUCET`
- Select `GETFUNDS` 

The `GETFUNDS` function in this guided tutorial is yet another automated version of an RPC. This time, the RPC is the [<b>faucetget</b>]() method. 

The <b>faucetget</b> method requests funds from the `TUT1` faucet.

The Antara Module software automatically checks a few things to make sure that we are not attempting to spam and drain the faucet. One task the Antara Module requires is a small amount of work from our computer. The CPU of our computer will perform a few complicated encryption calculations. This may take a few seconds to perform.

The time and electricity this consumes from our computer helps to offset any incentive a malicious actor would have when trying to drain the faucet.

The Antara Module will also check to make sure that our `SEED` node's wallet history is relatively fresh. The `SEED` node is entirely separate from the `MINING` node's data directory, and therefore no issues are detected.

## Check for the Returned Coins 

##### Estimated Time: 1 minute

There are many RPCs available to check the balance of a wallet. 

A common RPC is the [<b>getinfo</b>](). This checks many aspects of the Smart Chain's current state, including the wallet's balance. 

One of the most common RPC's is the [<b>getbalance</b>]() method. This returns only information about the wallet's balance.

A final example is the [<b>]listunspent</b>]() RPC, which returns infromation about all utxos in the user's wallet. 

- In the `SEED-MENU` section, select `SEED-GETINFO` to perform an automated <b>getinfo</b> RPC
  - In the response, look for the `balance` property
  - There should be at least `0.1` coins in your wallet
- In the `SEED-MENU` section once again, select `WALLET`
- Within the `WALLET` submenu, select the `BALANCE` function to perform an automated <b>getbalance</b> RPC
- Also within the `WALLET` submenu, select `LIST` to perform the automated <b>listunspent</b> RPC

----------------------

[<b>Link to next tutorial section</b>]()
