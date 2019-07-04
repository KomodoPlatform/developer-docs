# Komodo Developer Path | Preparation

## Introduction

The following six guided tutorials cover introductory topics for a new developer in the Komodo ecosystem. This tutorial here guides the reader in creating and installing the necessary environment for the tutorials.

The tutorials rely extensively on downloadable "docker images" of Komodo software. A downloadable docker image is an entirely self-contained virtual machine that holds installations of the software necessary to complete the tutorials.

The developer does not need to alter or make any additions to the Komodo source code itself as a part of these tutorials.

#### Full Overview of Komodo Developer Path Tutorials

The following is a brief summary of the docker tutorial stages.

- Install Development Environment
- Create a New Blockchain (10 minutes)
- Integrate the Faucet Module (5 minutes)
- Connect Your Programming Language to the Tutorials (10 minutes)
- Make an NFT (5 minutes)
- Build a Token DEX (30 minutes)
- Sync the community testnet blockchain RICK (or MORTY)
- Retrieve test coins from a website faucet
- Use a mobile wallet to send coins between your dev node and a community blockchain
- Repeat the tutorials and test with colleagues

#### Menu Options in Docker Images

The options from the main menu of the docker image are the following.

- TUTORIALS
  - Go through the tutorials, including starting a blockchain, run a faucet, create a token dex, use a MuSig Schnorr Signature
- RICK
  - dPoW community testnet blockchain
- MORTY
  - dPoW community testnet blockchain
- MAINT
  - For basic maintenance of this guided tutorial application
- EXIT
  - Return to shell

## Rapid Summary (TL;DR)

If the reader is in a hurry and does not have time to follow all of the instructions in Part I, the following three terminal commands accomplish the essential aspects of the full tutorial's objectives.

```bash
docker pull komodocakeshop/dev-allinone-learn-kmd
```

```bash
docker run -it -p 127.0.0.1:9253:9253 komodocakeshop/dev-allinone-learn-kmd
```

```bash
learn-kmd
```

After the last command, follow the onscreen instructions.

From here, the reader may optionally skip all of the following content and proceed directly to the next article in this tutorial series.

## The Unique Nature of the Docker-Image Tutorials

These guided tutorials are different from many other developer tutorials in the Komodo documentation.

Normally, a developer builds the Komodo software from source. In the tutorials here, however, the developer downloads a "docker image."

A docker image can be described as a complete, self-contained virtual machine that already bears all necessary software installed. This includes the Komodo software, the Zcash parameters, and any necessary instances of Smart Chains.

Once the docker image is downloaded and initiated in the terminal, the developer can utilize all installed software as normal.

In this tutorial, the docker container contains two starting nodes.

If the reader is not familiar with docker, do not worry. These tutorials use docker only as a development tool, and not as a complex deployment strategy. 

The tutorial's image uses the default docker network. Advanced docker users are welcome to adjust docker settings as desired.

#### Sending Commands to the Docker Image's Seed Node

The developer uses a text console within the docker container to controll the blockchain seed node during the guided tutorials. This text console interfaces with the `127.0.0.1` Remote Procedure Call (RPC) server.

The guided tutorial features a preset chain called `TUT1`. The parameters of this chain are an initial coin supply of `1000` and an RPC port of `9253`.

The `docker run` command specifies the RPC port as a passthrough port. This makes the port available outside the docker image, should the developer choose to integrate the docker image's Smart Chain, `TUT1`, with an external programming environment, such as Python or Node.js. 

Supported languages include all languages that can call RPC commands in the terminal, as well as those that can implement tools such as curl, postman, insomnia, and other similar development tools.

The docker image is suitable for testing only; do not use the image in a production setting.

The mining node RPC port is not passed through the docker container at runtime because it is randomly generated. The developer can reconfigure this setting, but the tutorials do not cover this topic.

## Install Docker

#### Estimated Time: 2 Minutes

The following instructions are written for an Ubuntu 18.04 (LTS) user with root privileges.

After completing the following steps, a non-privileged user may continue to use the docker image without further requiring the `sudo` command. 

```bash
sudo apt update
```

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

```bash
sudo apt update
```

```bash
apt-cache policy docker-ce
```

```bash
sudo apt install docker-ce
```

```bash
sudo systemctl status docker
```

```bash
sudo usermod -aG docker ${USER}
```

```bash
sudo su - ${USER}
```

## Download Komodo Image

#### Estimated Time: 3 Minutes

The "all-in-one" Komodo image is available for development only.

This image includes Komodo software and the Zcash parameters.

```bash
docker pull komodocakeshop/dev-allinone-learn-kmd
```

#### (Optional) Install the Reduced-Size Docker Image

If the reader already has the Zcash parameters installed, a smaller docker image is available. Use of this image is entirely optional; the only benefit it serves is a reduced storage-space footprint.

```bash
docker pull komodocakeshop/dev-learn-kmd
```

#### Check the Local Image

Once downloaded, check that the image is in your local docker catalogue using the `docker images` command.

#### Command

```bash
$ docker images
```

#### Expected Response

```bash
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
komodocakeshop/dev-learn-kmd   latest          3792dab98cce        2 days ago          992MB
```

## Start Komodo Development Container

#### Estimated Time: 10 seconds

Start the container.

This drops into a bash prompt that is ready to start the guided tutorials.

```bash
docker run -it -p 127.0.0.1:9253:9253 komodocakeshop/dev-allininone-learn-kmd
```

#### (Optional, for Smaller Docker Image Only) Mount the Local Zcash Parameters

For users relying on pre-existing Zcash parameters and using the smaller Komodo docker image, mount the parameters as a read-only volume.

```bash
docker run -it -p 127.0.0.1:9253:9253 -v /home/${USER}/.zcash-params:/root/.zcash-params:ro komodocakeshop/dev-learn-kmd
```

## Follow The Guided Tutorial Blockchain Starter Kit 

#### Estimated Time: 4 minutes

The guided tutorial starts by automatically creating two sets of randomly generated keys that should be used throughout the tutorials.

Alternatively, run everything from command line using the komodo-cli.

## Begin Guided Tutorial

#### Estimated Time: 20 seconds

Type `learn-kmd` to start the guided tutorials.

```bash
learn-kmd
```

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-1.png">

</div>

The "quick start" menu opens with the following screen.

<div style="clear: both; margin-top: 1rem; margin-bottom: 1rem; display: block;">

<img src="/2019-06-24-tutorial-1-img-2.png">

</div>

-------------------------------

[<b>Click here to proceed to the next tutorial in this series</b>](../../../basic-docs/antara/antara-tutorials/overview-of-development-on-komodo-part-1.md)
