# Outline for New Developers

## Install the Basic Komodo Software

The first step is to install Komodo software on your machine.

[Follow through the instructions here,](../installations/basic-instructions.html#installing-basic-komodo-software) and return to this spot in the outline when you are finished.

## Get Acquainted With komodod and komodo-cli

Now that you have `komodod` and `komodo-cli` installed, [skim briefly through the instructions on how to interact with a Komodo-based daemon, linked here](../installations/basic-instructions.html#interacting-with-komodo-chains).

You'll come back to this section later, once you're ready to execute API commands and runtime parameters.

::: tip
You do not need to launch or sync the main Komodo chain (KMD), and you do not need to own any KMD to test a Smart Chain.
:::

## Create Your First Asset Chain

With `komodod` and `komodo-cli` installed you're ready to spin up a Smart Chain.

[Follow the instructions in this linked guide to build your first Smart Chain.](../installations/creating-asset-chains.html#creating-a-new-asset-chain)

We recommend that you use the simplest of settings for now.

For example:

`./komodod -ac_name=HELLOWORLD -ac_supply=777777 &`

## Execute Elementary RPC's

After you have your Smart Chain running on both nodes, we recommend executing some basic rpc calls in the terminal.

Here are links to some simple and common rpc examples:

[getnewaddress](../komodo-api/wallet.html#getnewaddress)

[sendtoaddress](../komodo-api/wallet.html#sendtoaddress)

[getinfo](../komodo-api/control.html#getinfo)

As Komodo is downstream from both [Bitcoin](https://bitcoin.org) and [Zcash](https://z.cash), essentially all of the commands that are available on those two upstream blockchains are also available here.

## Test Out Platform-Specific Features

We create many features, functionalities, and commands that are specifically designed for dApp and platform-oriented developers.

For example, you can learn how to make Smart Chains that are more complicated in nature.

[Read this documentation first to get the basic idea](../installations/asset-chain-parameters.html).

Once you understand the concept, you can test a few asset-chain tricks -- like making your Smart Chain's consensus mechanism [a mix between Proof of Work and Proof of Stake](../installations/asset-chain-parameters.html#ac-staked).

Or, you could make your Smart Chain suitable for a rapid mining period, followed by complete blockchain disposal. Use parameters such as [ac_end](../installations/asset-chain-parameters.html#ac-end), [ac_reward](../installations/asset-chain-parameters.html#ac-reward), [ac_decay](../installations/asset-chain-parameters.html#ac-decay), and [ac_perc](../installations/asset-chain-parameters.html#ac-perc) for this effect.

## Discover Custom Consensus Modules

Now you should be ready to head into the territory for utilizing Komodo's built-in methods to customize your own consensus mechanism.

Playing with your consensus mechanism is akin to creating what other blockchain platforms call a "smart contract." However, on Komodo, things are different. We would argue this method is better, but we admit we're biased.

If you need to catch the general idea, read the section, [Custom Consensus Overview](custom-consensus-overview.html).

First, you must create a Smart Chain that has the [ac_cc runtime parameter properly enabled](../installations/asset-chain-parameters.html#ac-cc).

With this activated, you can try a few existing templates:

- [Create ERC20 tokens on your new Smart Chain](../customconsensus/tokens.html)
- Try using your [built-in on-chain DEX](../customconsensus/gateways.html)
- Use [the oracles smart-contract template](../customconsensus/oracles.html) to import real-world data to your blockchain, which can then affect blockchain behavior

...and more!

## Write Your Own Custom Consensus Module

If you're ready to try writing your own Custom Consensus (CC) modules, please read the detailed technical documentation written by our lead developer, JL777: [Mastering Custom Consensus](https://docs.komodoplatform.com/cc-jl/introduction.html).

Most developers don't need to design CC modules on Komodo, but rather, only need to implement existing modules while developing a dApp. So don't be discouraged if the technical documentation appears too thick for your level of experience. Come to Discord when you have questions.

## Learn About BarterDEX and Agama

Your Smart Chain can easily be integrated into our native atomic-swap powered DEX, [BarterDEX](../installations/basic-instructions.html#komodo-s-native-dex-barterdex), and our multi-coin wallet, [Agama](https://komodoplatform.com/komodo-wallets/).

You can learn more about both on [docs.komodoplatform.com](https://docs.komodoplatform.com).

## Differences between KMD and an Asset Chain

Newcomers to the Komodo ecosystem may benefit from understanding the differences between the main KMD blockchain and all other Smart Chains in the Komodo ecosystem.

The main KMD blockchain runs on the same underlying framework as all Smart Chains in the ecosystem, but not all features are active on the KMD blockchain. The KMD chain's active features include Bitcoin-hash rate supported security and the ability to write Custom Consensus (CC) modules. Other features, such as zero-knowledge privacy, are disabled.

This limitation is intentional. The KMD main-net blockchain holds all the meta data of the ecosystem. By keeping the functionality of this chain limited, Komodo discourages rapid data growth on this central blockchain.

All other Smart Chains are fully customizable. 

## Visit Us in Discord

Once again, we remind you to come visit us in [our Discord channel](https://komodoplatform.com/discord)!

We appreciate your interest and hope to give you a pleasant developer experience.
