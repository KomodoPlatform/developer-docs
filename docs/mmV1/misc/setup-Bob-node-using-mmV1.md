# Be a marketmaker or Bob node using mmV1

It is very easy to be a marketmaker or Bob in barterDEX. Anyone can be Bob using any supported coin and can provide liquidity for any pair in the market.

## Benefits of being a Bob node

- Bob node / marketmaker doesn't have to pay 0.15% DEX fee

- Can do margin trading

## Requirements

1. mmV1 installed - [mmV1 Install guide](../installation/install-marketmakerV1.md)

1. Native coin wallet

## APIs needed

You will only need `client`, `setpassphrase`, `enable` and `autoprice` methods to be a marketmaker in mmV1. All the API usage is explained in the below steps.

### Steps

#### client

Use `./client &` to start barterDEX. Do NOT use `./run` unless you have reliable fast connection from a datacenter or VPS. Don't change the file contents unless you know what you are doing.

#### setpassphrase

This API will set your passphrase and let you use the userpass value in every script. This is the second API/script you need to run.

#### enable

For using native mode, coin daemons need to be installed and blockchains fully synced. Native is recommended for faster performance and reliability. Edit the script with the coin names you want to activate for trading.

#### autoprice

This is the most important API for Bob or marketmaker. You need to edit this file to your liking. This contains the price, coin name for any pair your are making. Check [here](../api/introduction.html) for more info on the mmV1 API.

Once you issue the `./autoprice` script, you just need to wait for alice/buyer to buy from your order. All the trade info will be shown in your console as they are happening.
