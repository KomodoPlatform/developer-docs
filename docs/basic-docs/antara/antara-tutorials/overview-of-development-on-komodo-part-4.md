Tutorial 4 Introduction: Token Balance & Creating Tokens – Fungible & Non-Fungible

The possibilities that a token platform provides can include:
    • Tokenization of real world assets
    • Trading of tokens
    • Tokenomics as a layer for incentivizing an audience
    • Collectibles markets
    • Many more …

For the historical romantic, colored coins were one of the earliest ways of achieving some tokenization on the Bitcoin blockchain.  The history of Komodo can be traced back to the NXT Asset Exchange where “sub-atomic” non-custodial trading was pioneered.  Non-custodial trading (where the owner of the asset retains control through the entire process) between native coins and  tokens (e.g. ERC20 tokens on Ethereum) of different protocols is now part of the atomic swap platform Atomic DEX founded by the Komodo Core Team.

1 coin is divisible by 100 million.  Each 100,000,000th of a TUT1 coin is a satoshi.  With 0.1 TUT1, we have 10,000,000 satoshis.  Each satoshi in the Antara Tokens module represents 1 token.  The token can now represent other things of value and where a token economy can exist.

Non-Fungible Token Creation
When 1 satoshi is used to create a token, the token is derived from 1 satoshi.   This means that from this creation event (transaction) this satoshi is unique – therefore the token is unique.  There are no other satoshis that have been used to create this token.

Fungible Token Creation
The other method of creating tokens involves more than 1 satoshi at creation.  With 0.1 TUT1 coins, we can create 10,000,000 tokens in one creation transaction, or we can use 0.005 TUT1 coins to create 500,000 tokens.  These 500,000 tokens are all derived from the 0.005 TUT1 that was used for  creating them.  They are collectively the “ABC” token derived from the satoshis in the the token creation transaction 0f329824ccbaba8198715 for example.  These are fungible.

Attaching Data To Tokens
Data can be attached to these tokens at creation.  When using the 1 satoshi derived token, it adds a new level of uniqueness and collectibility.  Attaching data is not limited to NFTs, fungible tokens can equally be used – so there can be 5,000 tokens with one set of rare data and 495,000 tokens with more common data.  The data can be anything from geo-location data points for augmented reality games, to a substring of some algorithm to determine the genes of a cuddly digital card game animal.
Prerequisites
This tutorial follows on from the Antara Faucet module tutorial, Tutorial 2.  One node, the seed node has received 0.1 TUT1 coins from a single request to the faucet.

Seed Node RPC: tokencreate to create 50,000 GOLD tokens
On the seed node menu go the the tokens submenu and press create:
    • SEED-NODE > TOKENS > CREATE
    • Token Name: GOLD
    • How Many Satoshis To Use:  0.0005
    • A Short Description: Some GOLD tokens.

This will create 50,000 GOLD tokens by sending 0.0005 TUT1 coins to the Antara Tokens module.  The record of these 50,000 satoshis will now be used as GOLD tokens.

Waiting for this action to be confirmed, our balance from SEED-NODE > GETINFO will be 0.0993.

Why 0.0993?

Starting with 0.1 TUT1 coins, 0.0005 has been used for creating GOLD tokens.  This create transaction requires a transaction fee to be consumed by the network and awarded to the miner for solving the cryptographic puzzle, this is 0.0001.   Another 0.0001 is used as a marker within the Antara Tokens module.

The marker transaction pattern is an efficient blockchain method of keeping track of specific and special events.  The efficiency is notably used for listing tokens that exist on the TUT1 blockchain.

Seed or Mining Node RPC: tokenlist & tokeninfo to find details of the tokens
Going back to the TOKENS submenu of either of the nodes, the blockchain has recorded the creation of GOLD tokens.
    • SEED-MENU > TOKENS > LIST
    • SEED-MENU > TOKENS > INFO > GOLD

LIST calls the tokenlist RPC method.   This returns an array of token-ids.  The token id is the transaction id of the tokencreate method used above.

INFO calls the tokeninfo RPC method and returns the details of the token passed as an argument. The guided tutorials application uses the list RPC method and loops through each item to get the name, for the purpose of making a nice human readable list.


Seed Node RPC: tokencreate to create 200,000 SILVER tokens
Repeating the process for SILVER tokens:
    • SEED-NODE > TOKENS > CREATE
    • Name: SILVER
    • Amount: 0.002
    • Description: Some Silver TOKENS

Wait for confirm, and the 0.0993 TUT1 balance is reduced down to 0.0971.



Seed Node RPC: tokencreate to create 500,000 BRONZE tokens
Repeat for BRONZE tokens:
    • TOKENS > CREATE
    • Name: BRONZE
    • Amount: 0.005
    • Description: Some BRONZE tokens

Wait for the transaction to confirm.

Seed Node RPC: tokencreate to create 4,000,000 ROCK tokens
Repeat for ROCK tokens taking note of the transaction id after creating it.
    • TOKENS > CREATE
    • Name: ROCK
    • Amount: 0.04
    • Description: Some ROCK tokens



Checking this against the TOKENS > LIST, you will find the transaction id is the token id in this list or checking the details of TOKENS > INFO > ROCK the same transction id is used as the token id.  Very efficient re-use of existing data!



Mining Node RPC: tokencreate to create an NFT with 1 satoshi
Let’s change to the mining node just to see a different owner pubkey on the token creation details and use 1 satoshi 0.00000001  (0. seven zeroes 1)

    • MINING-NODE > TOKENS
    • TOKENS > CREATE
    • Name: NFT1
    • Amount: 0.00000001
    • Description: First unique token

User Balance Of Tokens Using RPC Method: tokenbalance
The seed & mining node in this tutorial have both made tokens.  So, by rights, each user will have a different balance.  The mining node will have a balance of 0 for the GOLD, SILVER, BRONZE & ROCK tokens, but have a balance of 1 for the NFT1 token.
Repeat the following from the SEED-NODE and MINING-NODE:

    • TOKENS > BALANCE > GOLD
    • TOKENS > BALANCE > SILVER
    • TOKENS > BALANCE > BRONZE
    • TOKENS > BALANCE > ROCK
    • TOKENS > BALANCE > NFT1

The seed node GOLD balance is above in the tokeninfo example, but the mining node balance is shown here.

Comparing the NFT1 balance of both the seed & mining nodes below.



Trading Token DEX
In the following tutorial, we will place some orders so the mining node can buy all the gold tokens from the seed node.  Once the seed node is holding only silver, bronze and rock tokens but has a large quantity of TUT1 coins, they will want to buy the NFT1 token because of some emotional reason for owning a scarce resource...or maybe it’s strategic…?  We will never know until we complete the next tutorial!


