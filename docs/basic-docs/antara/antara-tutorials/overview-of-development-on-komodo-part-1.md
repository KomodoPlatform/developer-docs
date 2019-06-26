# Komodo Developer Path | Create a Blockchain

## Create a Blockchain 

#### Estimated Time: 10 minutes

The following tutorial uses the Komodo tutorial docker image to create a blockchain. This tutorial is part of a series.

#### Create a Seed Node 

##### Estimated Time: 30 seconds

The guided tutorial interface follows these screens:

- SEED menu > SPINUP node
- Enter: `1000` coins as the supply when prompted
- `GETINFO` will query the chain has started with `0` blocks waiting for a mining node to mine the first several blocks

Back to go to the main TUT1 menu for the next step in setting up the mining node for your custom blockchain

Querying any blockchain with `getinfo` or `getblockchaininfo` returns the current state of the blockchain for this node.

The chain created has default options and is a blocks-on-demand type of smart chain. A blocks-on-demand chain runs with regular proof of work for the first 128 blocks then processes blocks on demand when there are transactions to mine. This style of chain saves computing resources.

## Create Mining Node (30 seconds)

The guided tutorial interface follows these screens:

- MINING menu > SPINUP node
- Enter: 1000 coins as the supply when prompted (or whatever value matches the supply you entered for the seed node)
- GETINFO will query this node's blockchain. It will have 0 blocks but should have 1 connection to the seed node.

## Start Mining (20 seconds)

The guided totuaial interface follow these screens:

- MINING MENU > START MINING, this will start mining, it will take 30-90 seconds to mine the first few blocks
- MINING MENU > GETMININGINFO queries the mining of the network and this node, you will see approximately 1.0 solutions per second

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-4.png">

</div>


## Mining Node RPC Method: validateaddress - Validate An Address (15 seconds)

The guided tutorials enable a quick validation of the current dev wallet, the returned data is useful for developers to validate their software is in control of the address being queried.

- WALLET > VALIDATE to call validateaddress

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-5.png">

</div>

If the response has `false` for the attribute `ismine`, then the private key needs to be imported that has been automatically generated when the guided tutorial started up.  The validateaddress uses this generated dev wallet by reading in the guided tutorial configurations.

## Mining Node RPC Method: importprivkey – Import Dev Wallet

Go to:

WALLET > IMPORT-DEV-WALLET so the guided tutorial imports the generated keys by using the RPC method importprivkey.

## Mining Node RPC Method: getbalance - Get Wallet Balance (15 seconds)

Still using the wallet submenu, select BALANCE to query the wallet by calling getbalance.


<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-6.png">

</div>

## Mining Node RPC Method: listunspent - Get Wallet Balance (15 seconds)

The mining node has funds.  The funds are represented on the blockchain as unspent outputs.  To list them, still in the WALLET submenu, choose LISTUNSPENT to call the RPC method listunspent.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-7.png">

</div>

The number of UTXOs will differ depending how many blocks have been mined (added to the blockchain) which the mining node gets rewarded for solving.  Each additional block reward by default on this blocks-on-demand chain is 0.001 TUT1 coins.  Maybe there are an extra 2-3 in yours or maybe you got interrupted by and off-chain event, like making a cup of tea or coffee.

## Mining Node RPC Method: setgenerate - Stop Mining (15 seconds)

The setgenerate RPC command tells a node to mine or mint (in a proof of stake blockchain) and to switch these functions off.

Choose MINING-STOP from the submenu for the MINING node.

Because this blockchain has 2 nodes and one of them is a seed node not set to mine, there are no longer miners to solve the cryptographic puzzle of the block.  No blocks will be produced, and no block rewards for the mining node.  No more UTXOs will be generated and the state of the blockchain will remain the same.

## Continue to tutorial 2 for Faucet Module To Enable The SEED (or any user) To Get A Small Amount Of Coins


Optional: Mining Node RPC Method: stop - Shutdown Node (15 seconds)

- MINING > SHUTDOWN

Optional: Seed Node RPC Method: stop - Shutdown Node (15 seconds)

- SEED > SHUTDOWN 

