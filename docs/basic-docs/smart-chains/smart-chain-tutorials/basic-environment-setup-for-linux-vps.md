# Basic Environment Setup for Linux VPS

## Introduction

This tutorial provides guidance in creating a simple environment for development in the Komodo ecosystem.

The content herein is not comprehensive. Rather, this content provides a starting point, from which an enthusiastic learner should be capable of customizing and developing their own approach.

## Rent a VPS

A common environment choice among developers is to use a Virtual Private Server (VPS). A VPS allows a developer to use the Internet to access high quality hardware with corporate-level high speed Internet access.

Popular VPS choices include [Amazon Web Services (AWS)](https://aws.amazon.com) and [DigitalOcean](https://digitalocean.com).

One reason a VPS is popular is that a developer can quickly create new instances of a virtual machine. This facilitates the developer in having a clean environment that is targeted for a specific purpose.

VPS's are also relatively cheap. Both AWS and DigitalOcean provide the basic necessities for $0 to $20/month, depending on your desired specifications.

::: tip

Alternatively, you can use your own personal computer, or a bare-metal server. However, troubleshooting on a personal setup can prove to be more time consuming than on a VPS.

:::

### Recommended Minimum Server Specifications:

- CPU with 4 cores
- 8 GB RAM
- ~100GB SSD
  - Note that using an HDD instead of a SSD will dramatically increase synchronization time, and thus slow down your workflow
- Ubuntu version 18.04 (for beginners)
  - Ubuntu is the most popular Linux distribution
  - The majority of Komodo's documentation is tested and written on Ubuntu
  - To learn more about Linux, [read this linked article](https://www.linux.com/what-is-linux)

## Connect to Your VPS

Once you have chosen your VPS provider, you will need to connect to your VPS.

New developers often find this process confusing.

Your VPS provider should have several tutorials available to help you through this process.

Look for tutorials on the following topics.

* How to launch a terminal shell on your laptop or desktop machine
* How to set up SSH keys for secure login access
* How to execute a `ssh` command on your local machine to connect to your VPS
* How to enter `sudo` commands on your VPS

For example, AWS has the following documentation to assist new developers in accessing VPS's that use the AWS EC2 service. Choose between MacOS & Linux, or Windows, both of which have different tutorial paths.

[Link to AWS tutorial starting point](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html)

## Initial VPS Setup

Once you can access your VPS via the terminal, it is time to consider security in your environment. You are accessing a machine over the Internet, and there are myriad ways by which an attack can compromise your connection.

To ensure your own safety, consider the following security measures.

- Never log into your VPS as the root user
- Consider disabling the option to log in as root
- Use SSH keys to log in, instead of a password
- Enable a firewall to limit all unwanted traffic

The following tutorials provide many useful tips on creating a secure server.

- [Initial Server Setup with Ubuntu 18.04 | Digital Ocean](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
- [Using SSH to connect to a remove server](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server-in-ubuntu)

For experience learning the Linux environment, consider the following tutorials.

- [How to use the Unix command line (interactive course)](https://www.codecademy.com/learn/learn-the-command-line)
- [An Introduction to Linux (Especially "A Culture of Learning")](https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-basics)
- [How To Download Software and Content onto your Linux VPS](https://www.digitalocean.com/community/tutorials/how-to-download-software-and-content-onto-your-linux-vps)
- [How To Use cd, pwd, and ls to Explore the File System on a Linux Server](https://www.digitalocean.com/community/tutorials/how-to-use-cd-pwd-and-ls-to-explore-the-file-system-on-a-linux-server)
- [How to Add and Delete Users on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-16-04)
