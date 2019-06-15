# Basic Environment Setup for Linux VPS

## Introduction

This tutorial provides guidance in creating a simple environment for development in the Komodo ecosystem.

The content herein is not comprehensive. Rather, this content provides a starting point, from which an enthusiastic learning should be capable of customizing and developing their own approach.

 first you will need access to an environment in which you'll compile and run the Komodo daemon - `komodod`.

A common environment used is a VPS (virtual private server) or cloud instance, but you can also use on your PC or bare-metal server.

## Stage 0: Rent a VPS

There are various server providers. Some of them: Hetzner, DigitalOcean, AWS, Google Cloud Platform(GCP)

### Recommended servers specifications:

- Hardware requirements vary depending on the type of tasks that you want to perform (Ex: Production system vs just a test srver).
- Usually, a configuration like : A CPU with 4 cores, 8 GB RAM, SSD with a capacity >= 100 GB is sufficient. Please note that using a HDD instead of SSD will cause a huge increase in blockchain synchronization times because of the large amount of IOPS (inputs/outputs per second) required.
- Regarding the operating system, we recommend Ubuntu (version 16.04+) for beginners. It's the most popular Linux distribution and the majority of Komodo's documentation has been tested and written with this Linux distribution in mind. More information on what Linux is can be found here: [https://www.linux.com/what-is-linux](https://www.linux.com/what-is-linux)

## Stage 1: Install the OS

- The first thing you need is a computer or virtual private server (VPS) with a Linux installation.
- Setup Ubuntu on local computer or laptop: [https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop)

OR

- Setup Ubuntu on VPS: Refer to your VPS provider's documentation for the steps to be followed to achive this.

## Stage 2: Initial OS setup

- The very first step after OS installation is to setup some basic access/security configuration.
- You can find a basic guide here: [https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)
- The process of such configuration may be different based on your VPS provider(AWS, GCP) since most of the basic security options are provided from the cloud platform side. But to summarize basic security/access rules:
  : 1. Don't login as the root user for general use and disable it since it's not a safe practice

        1. Use SSH keys for login instead of a password

        1. Enable firewall to limit all unwanted traffic

## Stage 3: Linux basics

- To understand what SSH is, how to configure and use it, etc., the guide below has some examples related to the Digital Ocean platform, but there is a lot of other information that can be accessed through a simple Google search: [https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server-in-ubuntu](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server-in-ubuntu)
- Working with a command line, interactive course: [https://www.codecademy.com/learn/learn-the-command-line](https://www.codecademy.com/learn/learn-the-command-line)
- Some basic information about Linux, it is recommended to carefully read the section "A Culture of Learning" : [https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-basics](https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-basics)
- More useful articles from DigitalOcean:

  1. How To Download Software and Content onto your Linux VPS: [https://www.digitalocean.com/community/tutorials/how-to-download-software-and-content-onto-your-linux-vps](https://www.digitalocean.com/community/tutorials/how-to-download-software-and-content-onto-your-linux-vps)

  1. How To Use cd, pwd, and ls to Explore the File System on a Linux Server: [https://www.digitalocean.com/community/tutorials/how-to-use-cd-pwd-and-ls-to-explore-the-file-system-on-a-linux-server](https://www.digitalocean.com/community/tutorials/how-to-use-cd-pwd-and-ls-to-explore-the-file-system-on-a-linux-server)

  1. How to Add and Delete Users on Ubuntu 16.04: [https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-16-04)

## Stage 4: Compiling the Komodo daemon

- If you have followed the guide so far, you have just arrived at the most straight forward and simplest part. Now you should know the basics to accessing and using a remote Linux installation and proceed to compile the Komodo daemon (komodod): [Installing Komodo on Ubuntu/Debian](../komodo/installation.html#installing-komodo-on-ubuntu-debian)

- To test the Independent blockchains(and their features) that can be spawned using Komodo's technology, you only need to compile the Komodo daemon and there is no need to download Komodo's Blockchain. i.e., only till executing the command `./zcutil/build.sh -j$(nproc)` in the above guide

- The following guide has the instructions for creating a new blockchain: [Creating a new Blockchain using Komodo Platform](../basic-docs/installations/creating-asset-chains.html)
- The various parameters using which the new blockchain can be customized are explained here: [Parameters to customize Blockchains created using Komodo Platform](../basic-docs/installations/asset-chain-parameters.html)

