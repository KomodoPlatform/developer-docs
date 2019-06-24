Guided Tutorials To Create A New Blockchain Project With A Token DEX & NFT in 1 hour

Tutorial 1 Introduction: Start A New Blockchain Project
These 6 guided tutorials cover the following topics:
    1. New Blockchain In 10 minutes
    2. Integrate Faucet Module In 5 minutes
    3. Connecting Your Programming Language Into The Tutorials 10 minutes
    4. Make an NFT in 5 minutes
    5. Build Token DEX 30 minutes
    6. Sync the community testnet blockchain RICK (or MORTY) and get test coins from a website faucet. Using a mobile wallet to send between your dev node and a community blockchain, and repeating the tutorials and testing with colleagues.

The options from the main menu of these guided tutorials are:
    • TUTORIALS to go to the tutorials from starting a blockchain and running a faucet to a token dex and musig schnorr signatures
    • RICK dpow community testnet blockchain
    • MORTY dpow community testnet blockchain
    • MAINT for basic maintenance of this guided tutorial application
    • Exit to return to shell

Too Long Didn’t Read – From container, run learn-kmd & follow on screen instructions
docker pull komodocakeshop/dev-allinone-learn-kmd

docker run -it -p 127.0.0.1:9253:9253 komodocakeshop/dev-allinone-learn-kmd

learn-kmd
What’s The Difference Between These Guided Tutorials & Existing Developer Tutorials?
In order to get going in 10 minutes, we skip the building the daemon from source and use a pre-built docker image.  The single container will run our 2 starting nodes. If you are unfamiliar with docker - do not worry. We use it as a dev tool, not as a complex deployment strategy.  We use the default docker network but if you know how to manage docker, feel free to make your own adjustments – the internal wiring detects network and routing.

Note: Sending Commands To The Guided Tutorial Blockchain Daemon Seed Node
Controlling the blockchain seed node from the guided tutorials is done within the docker container on a text console.   This text console interfaces with the 127.0.0.1 RPC server.
When using the default values of the chain name TUT1 and the initial coin supply of 1000, the RPC port will be 9253.
The docker run command specifies this as a passthrough port so it is available to you from your workstation should you choose to integrate with your programming language for testing.
Any language is supported that can call RPC commands as well as tools like curl, postman, insomnia.
The mining node RPC port is not passed through the docker container at runtime because it is randomly generated.  This can be reconfigured, but is not covered in the scope of this tutorial (refer to configuration file settings for two daemons running on a single host).
Prerequisites
If you have docker installed already, great! 8 minutes to custom blockchain creation!
Install Docker (2 minutes)
On ubuntu 18.04 (LTS) version, these instructions will enable a non-priveledged user to run containers without root priveleges. Sudo is required for installation only.
sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt update

apt-cache policy docker-ce

sudo apt install docker-ce

sudo systemctl status docker

sudo usermod -aG docker ${USER}

su - ${USER}

Download Komodo Image (3 minutes)
If you have zcash params (existing ZEC,KMD or VRSC usage), a smaller docker image is available.
For new developers who don't have local zcash params, the all-in-one Komodo image is available for development only.
docker pull komodocakeshop/dev-allinone-learn-kmd
If you have local zcash params, download the slightly smaller image
docker pull komodocakeshop/dev-learn-kmd
Once downloaded, checking the image is in your local docker catalogue with docker imagescommand.
$ docker images
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
komodocakeshop/dev-learn-kmd   latest          3792dab98cce        2 days ago          992MB
Start Komodo Dev Container (10 seconds)
Start the container, it will drop you into a bash prompt ready to start the guided tutorials.
docker run -it -p 127.0.0.1:9253:9253 komodocakeshop/dev-allininone-learn-kmd
If you have local zcash params and downloaded the smaller image, the local zcash params are mounted as a read-only volume
docker run -it -p 127.0.0.1:9253:9253 -v /home/me/.zcash-params:/root/.zcash-params:ro komodocakeshop/dev-learn-kmd
Follow The Guided Tutorial Blockchain Starter Kit (4 mins)
The guided tutorials starts by automatically creating two sets of randomly generated keys to use for the tutorials.
Alternatively, run everything from command line using the komodo-cli.
Guided Tutorial Begin (20 seconds)
Simply type learn-kmd to start the guided tutorials.
learn-kmd


The quick start opens with this screen


For tutorial 1, select the TUTORIALS -> TUT1 menu.


Tutorial 1 – Create Blockchain (10 minutes)
Create Seed Node (30 seconds)
The guided tutorial interface follows these screens:
    • SEED menu > SPINUP node
    • Enter: 1000 coins as the supply when prompted
    • GETINFO will query the chain has started with 0 blocks waiting for a mining node to mine the first blocks
Back to go to the main TUT1 menu for the next step in setting up the mining node for your custom blockchain
Querying any blockchain with getinfo or getblockchaininfo returns the current state of the blockchain for this node.

The chain created has default options and is a blocks-on-demand type of smart chain. A blocks-on-demand chain runs with regular proof of work for the first 128 blocks then processes blocks on demand when there are transactions to mine. This style of chain saves computing resources.

Create Mining Node (30 seconds)
The guided tutorial interface follows these screens:
    • MINING menu > SPINUP node
    • Enter: 1000 coins as the supply when prompted (or whatever value matches the supply you entered for the seed node)
    • GETINFO will query this node's blockchain. It will have 0 blocks but should have 1 connection to the seed node.
Start Mining (20 seconds)
The guided totuaial interface follow these screens:
    • MINING MENU > START MINING, this will start mining, it will take 30-90 seconds to mine the first few blocks
    • MINING MENU > GETMININGINFO queries the mining of the network and this node, you will see approximately 1.0 solutions per second

Mining Node RPC Method: validateaddress - Validate An Address (15 seconds)
The guided tutorials enable a quick validation of the current dev wallet, the returned data is useful for developers to validate their software is in control of the address being queried.
    • WALLET > VALIDATE to call validateaddress

If the response has `false` for the attribute “ismine”, then the private key needs to be imported that has been automatically generated when the guided tutorial started up.  The validateaddress uses this generated dev wallet by reading in the guided tutorial configurations.
Mining Node RPC Method: importprivkey – Import Dev Wallet
Go to:
WALLET > IMPORT-DEV-WALLET so the guided tutorial imports the generated keys by using the RPC method importprivkey.
Mining Node RPC Method: getbalance - Get Wallet Balance (15 seconds)
Still using the wallet submenu, select BALANCE to query the wallet by calling getbalance.







Mining Node RPC Method: listunspent - Get Wallet Balance (15 seconds)
The mining node has funds.  The funds are represented on the blockchain as unspent outputs.  To list them, still in the WALLET submenu, choose LISTUNSPENT to call the RPC method listunspent.

The number of UTXOs will differ depending how many blocks have been mined (added to the blockchain) which the mining node gets rewarded for solving.  Each additional block reward by default on this blocks-on-demand chain is 0.001 TUT1 coins.  Maybe there are an extra 2-3 in yours or maybe you got interrupted by and off-chain event, like making a cup of tea or coffee.
Mining Node RPC Method: setgenerate - Stop Mining (15 seconds)
The setgenerate RPC command tells a node to mine or mint (in a proof of stake blockchain) and to switch these functions off.
Choose MINING-STOP from the submenu for the MINING node.
Because this blockchain has 2 nodes and one of them is a seed node not set to mine, there are no longer miners to solve the cryptographic puzzle of the block.  No blocks will be produced, and no block rewards for the mining node.  No more UTXOs will be generated and the state of the blockchain will remain the same.
Continue to tutorial 2 for Faucet Module To Enable The SEED (or any user) To Get A Small Amount Of Coins

Optional: Mining Node RPC Method: stop - Shutdown Node (15 seconds)
    • MINING > SHUTDOWN
Optional: Seed Node RPC Method: stop - Shutdown Node (15 seconds)
    • SEED > SHUTDOWN





