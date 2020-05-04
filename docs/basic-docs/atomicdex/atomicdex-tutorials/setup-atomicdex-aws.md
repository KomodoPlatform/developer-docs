# How to Setup and use AtomicDEX-API on a AWS EC2 instance

## Create the AtomicDEX setup script

- Create a file named `atomicDEX_API_setup.txt`
- Add the following code to it after replacing the text `SEED_WORDS_PLEASE_REPLACE` with your Seed words that will be used to generate addresses and the text `RPC_PASS_PLEASE_REPLACE` with a strong password you will use to authenticate yourself while communicating with the AtomicDEX-API

```bash
#!/bin/bash
apt-get update
apt-get install -y unzip jq curl
wget $(curl --silent https://api.github.com/repos/KomodoPlatform/atomicDEX-API/releases | jq -r '.[0].assets[] | select(.name | endswith("Linux-Release.zip")).browser_download_url')
wget https://raw.githubusercontent.com/KomodoPlatform/coins/master/coins
unzip *Linux-Release.zip
./mm2 "{\"netid\":9999,\"gui\":\"aws_cli\",\"passphrase\":\"SEED_WORDS_PLEASE_REPLACE\",\"rpc_password\":\"RPC_PASS_PLEASE_REPLACE\",\"myipaddr\":\"0.0.0.0\"}"
```

## Install AWS CLI , get AWS access credentials

Installation

```bash
sudo apt-get install awscli
```

To get the access credentials, login to your AWS account, create an IAM user as described in the post [https://tntdrive.com/where-do-i-get-my-access-keys.aspx#create-iam-user-and-keys](https://tntdrive.com/where-do-i-get-my-access-keys.aspx#create-iam-user-and-keys) while selecting the policy `AmazonEC2FullAccess` instead of `AmazonS3FullAccess`. Note down the "Access key ID" and "Secret access key"

Make sure the SSH directory exists

```bash
mkdir -p ~/.ssh/
```

## Create a EC2 Instance

Open a terminal, navigate to the directory where the file `atomicDEX_API_setup.txt` is located, and issue the following commands after changing the text `REPLACE_ACCESS_KEY_ID` with "Access key ID" and `REPLACE_SECRET_ACCESS_KEY` with "Secret access key". You can also change the region where the EC2 instance is hosted by changing all instances of `us-east-1` in the commands

```bash
export AWS_ACCESS_KEY_ID=REPLACE_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=REPLACE_SECRET_ACCESS_KEY
aws ec2 create-key-pair --region us-east-1 --key-name mm2Keypair | jq -r .KeyMaterial > ~/.ssh/mm2.pem
chmod 400 ~/.ssh/mm2.pem
sgID=$(aws ec2 create-security-group --region us-east-1 --group-name sgMM2 --description "sg-mm2"| jq -r '.GroupId')
aws ec2 authorize-security-group-ingress --region us-east-1 --group-name sgMM2 --protocol all --cidr 0.0.0.0/0
aws ec2 run-instances --region us-east-1 --image-id ami-083d24fb90054e5f0 --count 1 --instance-type t3.micro --key-name mm2Keypair --security-group-ids $sgID --user-data file://atomicDEX_API_setup.txt
```

If you see an error similar to the following, click the given link, then click the button "Continue to Subscribe" and then click the button "Accept Terms"

```bash
An error occurred (OptInRequired) when calling the RunInstances operation: In order to use this AWS Marketplace product you need to accept terms and subscribe. To do so please visit https://aws.amazon.com/marketplace/pp?sku=auhljmclkudu651zy27rih2x2
```

Wait for the Subscription to be processed and issue the last command again.
You can verify that the instance has been launched successfully by visiting the page [https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceId](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:sort=instanceId)

From that screen, copy the "IPv4 Public IP" of the instance and replace the text `REPLACE_PUBLIC_IP` in the following command with it.

```bash
nodeIp=REPLACE_PUBLIC_IP
ssh -o IdentitiesOnly=yes -i ~/.ssh/mm2.pem admin@$nodeIp 'curl -s --url "http://127.0.0.1:7783" --data "{\"userpass\":\"RPC_PASS_PLEASE_REPLACE\",\"method\":\"version\"}"'
```

Simply replace the "curl" part from the last command to use [different RPC](https://developers.atomicdex.io/basic-docs/atomicdex/atomicdex-api.html)