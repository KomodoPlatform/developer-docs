# Learning Pathway for a Normal Developer

## Introduction

The following outline presents the key points along the learning path for a normal developer in the Komodo ecosystem.

#### Definition of a Normal Developer

By "normal developer," we refer to a person who has the following attributes.

* Comfortable with basic computer functionality
* Has the language skills necessary to read Komodo documentation and source code
* Has general familiarity with at least one mainstream programming language
* Intends to use programming skills to utilize existing Komodo software
* May have ambitions to integrate Komodo software into an external software environment
* Comfortable with problem solving and troubleshooting in a technically complex environment

The "normal developer" is not expected to make adjustments or changes to the Komodo source code itself. For example, the normal developer may not have any interest in creating a new Antara module, although they may intend to utilize existing Antara modules.

This is the key differentiator from the "Advanced Developer." The latter intends to make adjustments to the Komodo source code itself, and may desire to create new Antara modules. 

## Create a Development Environment

The developer should have access to a stable environment.

While the developer can utilize Windows as a main development environment, all Komodo source code must be compiled on a Unix-based operating system, such as MacOS or Linux. 

Many developers who use Windows OS on their desktop or laptop work around the Linux requirement by developing on a Linux-based VPS.

The following guide provides a step-by-step outline for setting up a most common Komodo developer environment.

[Basic Environment Setup for Linux VPS]()

## Compile the Komodo daemon

There are two methods available for installing Komodo Smart Chain software.

The first method is to use what are called, "Precompiled Binaries." These binaries are created by the Komodo team for users who are not comfortable with using a Unix command line, and who are not working in a development environment.

While installing using precompiled binaries is dramatically simpler, we do not recommend this practice for developers. Precompiled binaries are only updated periodically, and users of these binaries may lag behind recent Komodo updates.

Instead, a developer should use the second method: building Komodo software from source code. In this method, the developer downloads the most recent state of the Komodo source code and uses the terminal to build the executable files.

We provide a step-by-step process to accomplish this task.

[Installing Smart Chain Software From Source Code](../../../basic-docs/smart-chains/smart-chain-setup/installing-from-source.html#linux)

To update the Komodo Smart Chain software at a later date, use the following guide.

[Updating Smart Chain Software From Source](../../../basic-docs/smart-chains/smart-chain-setup/updating-from-source.html)

## Test Existing Blockchains

When testing Komodo software as a newcomer, you do not need to sync the Komodo main chain. 

Rather, you may sync an ecosystem test chain, such as the RICK chain.

This chain allows you to use a community faucet to obtain funds for free.

The coin supply on this chain has no scarcity, so they be considered to be nothing but play money -- perfect for testing purposes.

To launch the RICK Smart Chain, follow the link below to see the list of launch commands for all Smart Chains in the Komodo ecosystem.

[Link to list of launch commands in the Komodo ecosystem](https://github.com/KomodoPlatform/komodo/blob/beta/src/assetchains.old)

Then do a search for "RICK" and copy/paste that line of code into your terminal.

(The command must be executed in the shell in the directory where you installed the `komodod` and `komodo-cli` softwares.)

## Create a New Smart Chain

One of the greatest benefits of Komodo software is that the developer can have a secure and decentralized blockchain all to themselves. You can even have multiple blockchains, if you so desire.

Use the following guide to create your first test Smart Chain.

[Create a Default Smart Chain](../../../basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.html)

## Test Various Smart Chains

- The various parameters using which the new blockchain can be customized are explained here: [Parameters to customize Blockchains created using Komodo Platform](../basic-docs/installations/asset-chain-parameters.html)



