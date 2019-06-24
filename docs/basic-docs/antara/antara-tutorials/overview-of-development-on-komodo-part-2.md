Tutorial 2 Introduction: Faucet Module For New Users To Get Coins (5 minutes)

A faucet is a tap fitting of your regular bathroom or kitchen tap.  Faucets sometimes drip.  A blockchain faucet drops small amounts of coins to people that hit the faucet with a request.  In this tutorial, we will activate the Antara Faucet module on the TUT1 blockchain we built in the first tutorial.  Activation is done simply by sending funds to it.  It is a built-in Antara Module of the Smart Chain.

When the new user on the seed node has coins, we will use them to create tokens in Tutorial 3 and a Token DEX in Tutorial 4 so the seed node can place an order for selling some tokens.  We will then fill the order with the mining node, exchanging some coins for the tokens the seed node is selling.

The state of the TUT1 blockchain and what will happen in this tutorial:
    • MINING node has 1000 coins + some extra from the block rewards from the chain’s life
    • MINING node has several UTXOs (unspent transaction outputs) which are like “packets of coins”.  The amount in a UTXO will vary but will look something like:
        ◦ 1 large UTXO with approximately 1000 amount of coins
        ◦ Many UTXOs with 0.0001 coins that represent the reward for mining the blocks
        ◦ (Optionally) To consolidate these into a larger UTXO, send all your funds to yourself
    • MINING node will send some funds to the FAUCET using the faucetfund command
    • SEED node has 0 coins and will be used to get a small amount from the faucet once it is funded

Prerequisites
Have a running Smart Chain.  The guided tutorial 1 is a 10 minute guide for creating a blockchain.  The steps are summarized:
    • docker pull komodocakeshop/dev-allinone-learn-kmd
    • docker run -it -p 127.0.0.1:9253:9253 komodocakeshop/dev-allinone-learn-kmd
    • The container drops you into a command prompt, type learn-kmd to get started with the on-screen instructions

Mining Node RPC Method: sendtoaddress to send all funds to self (2 minutes)
Go to the submenu MINING-NODE > WALLET and select SENDALLTOSELF.  This is a convenience short cutt along with the other SENDTO… commands but the underlying RPC method used is sendtoself.

We are consolidating UTXOs and making them spendable in an Antara Module.  An Antara Module has the requirement that the funds it receives have been previously spent.  Mining rewards and pre-mine supply are not previously spent, they are generated funds.  It’s simply to make the underlying validation code of the blockchain more optimized than having to check for two or more types of coin history.  By limiting the valid spending to only previously spent UTXOs – it makes the underlying code more maintainable.  It’s a nuance for new blockchains and application specific blockchains.

 Wait for your transaction to be confirmed (written into a block) so you have a UTXO to spend.  If you sent the funds to yourself and checked the list of UTXOs, it would have been an empty array (no UTXOs) because they were all used up to send the balance to self.  Feel free to do this again to observe the state of wallet change to empty!

Mining Node RPC Method: faucetfund to send funds to the on-chain faucet (1 minute)

    • MINING-NODE > FAUCET submenu has a FUND command.
    • Enter 200 for the coins to send, but it’s up to you for this tutorial.  Maybe 5 or 500, just keep some on the mining node for later tutorials where

This calls the RPC method faucetfund which expects an amount of coins to fund the faucet application.  The faucet application will send small amounts to new users.   New users are defined by underlying blockchain rules explained in the next step.

Seed Node RPC Method: faucetget to get a small amount of coins as a new user (1 minute)
The guided tutorials have a back option to return to a higher level menu.  Going back to select between SEED and MINING nodes, select SEED to go to the SEED menu options.

    • FAUCET > GET

This sends a faucetget by RPC command using the seed node’s RPC user to the seed node’s RPC.  This is the first time we are using the seed node for anything other than the initial seeding.  The seed node data directory is separate on the filesystem to the mining node’s data directory.  Both nodes are using different RPC ports for commanding.  These settings of user and rpc port are in the configuration file of the chain.

Seed Node RPC Method: getbalance or getinfo or listunspent to see new user coins (1 minute)
There are many ways to do the same simple goal of seeing an updated balance.  One is literally a getbalance RPC command, another is this node’s blockchain state and the other is to list the unspent transaction outputs (UTXOs).  There are other RPC methods to achieve the goal of seeing the balance for the seed node’s dev wallet address not covered in this step.

    • WALLET > BALANCE
    • SEED-GETINFO
    • WALLET > LIST

Now is a good time to do a WALLET > VALIDATE to make sure the funds went to the dev wallet we will be using for the token creation in the next tutorial.   If the attribute ismine is false, then import the dev wallet and repeat the faucetget so the dev wallet has the small amount of coins to use in the token tutorials.   WALLET > IMPORT-DEV-WALLET, then repeate FAUCET > GET.
