# Revenue Sharing/Operations

## dividends

This script will allow users / organizations to send dividends for any specific coins/asstets

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"dividends\",\"coin\":\"KMD\",\"height\":$1,\"prefix\":\"fiat/jumblr sendtoaddress\",\"suffix\":\"\",\"dividend\":50000,\"dust\":1}"
```

## snapshot

The name says it all, snapshot will take a snap of the blockchain for a specified coin/asset on a certain block height for sending dividends or airdrop.

Sample File Contents:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"snapshot\",\"coin\":\"KMD\",\"height\":$1}"
```

## snapshot_balance

This API will display the snapshot balance of a specific coin address after snapshot taken on a specific block height. You need to have jq installed ([https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)).

Sample File Contents:

```bash
ht=$1
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"snapshot_balance\",\"coin\":\"KMD\",\"height\":$ht,\"addresses\":[\"RSAzPFzgTZHNcxLNLdGyVPbjbMA8PRY7Ss\", \"RBgD5eMGwZppid4x7PTEC2Wg1AzvxbsQqB\"]}"
```

## snapshot_loop

This API is used to automate snapshot process for coins/assets at given block height and certain number thereafter. You can configure the script to run on certain block height increments.

Sample File Contents:

```bash
ht=$1
while true
do
curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"snapshot\",\"coin\":\"KMD\",\"height\":$ht}"
#ht=`komodo-cli getinfo | jq .blocks`
ht=$(( $ht + 1000 ))
echo next height $ht
sleep 1
done
```
