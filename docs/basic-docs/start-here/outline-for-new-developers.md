# Start Here

For the developer wishing to build your own blockchain using Komodo's software we recommend the following approach.

## Visit Us in Discord

We encourage you to come [to our Discord channel](https://komodoplatform.com/discord), and to come by frequently throughout your discovery process.

We are a deeply engaged and highly enthusiastic open-source blockchain community, always ready to get creative with like-minded people.

Ask questions in our Discord channels, such as `#developer`, `#cryptoconditions`, and others. Team and community members are usually available to assist you.

### Assumptions for this Documentation

Before we get into specifics, we need to cover a few assumptions we make about our readers.

We're going to start by assuming that you have a general idea of what a blockchain is.

If you're not familiar, we recommend that you [read Part I of our white paper](https://www.komodoplatform.com/whitepaper). It explains what a blockchain is, why blockchain technology is significant, the basic idea of how it works, and why you should care.

We're also going to assume that you are comfortable programming in at least one mainstream language. Technically, Komodo can work with any language, but there are some things to keep in mind before you get too excited. [Find out more about languages on Komodo here](../start-here/outline-for-new-developers.html#a-brief-note-about-languages).

If you're not yet a programmer, but you're interested to make a career in the blockchain revolution, welcome! The open-source nature of Komodo and our enthusiastic community make this a perfect place to begin your journey. We recommend that you come [to our Discord channel](https://komodoplatform.com/discord) and discuss your goals with our community members. We look forward to meeting you!

### The Cost of Running an Asset Chain

You may be wondering about pricing for Komodo Smart Chains. Simply creating and developing the asset chain for testing purposes does not require contact with or payment to the Komodo team.

::: warning IMPORTANT
However, in nearly all circumstances, an asset chain is only secure once it receives our dPoW connection to the Bitcoin hash rate (dPoW).
:::

You can read more about how the security and payment are structured in [the section on Komodo's dPoW security services](../installations/creating-asset-chains.html#secure-this-asset-chain-with-delayed-proof-of-work).

In general, the cost for Komodo's security services is competitive. While the initial setup cost may or may not be higher than other blockchain platforms, the benefits that come from owning your own full blockchain, not having to pay KMD gas/transaction fees, and in being able to deploy unlimited smart contracts and ERC20-like tokens on your chain; can become a cost-saving advantage over time for both you and your end-users.

Please reach out to our team whenever you are ready to purchase dPoW. We will direct you to one of our service providers, and they can give you a direct quote for the annual cost.

::: tip
We have a limited supply of early-adopter discounts. Please inquire while supply last.
:::

### A Brief Note About Languages

In considering the languages available in the Komodo ecosystem, there are two aspects to address: code that runs inside your daemon, and code that runs outside of it.

Code that runs inside the daemon is typically low-level, and working with this code requires strong experience. This low-level code may, for example, change the nature of your consensus mechanism, or provide a foundational smart-contract template that can be called from outside the daemon to be used in a dApp.

Code that runs outside the daemon can be high-level. A dApp that is built on existing smart-contract templates can exist entirely outside the daemon. It could consist of GUI's, back-end databases, and other non-daemon code and assets that make your dApp function.

In both circumstances, you are able to use whatever language you desire.

However, if you are working within the daemon, we currently recommend that you have a considerable amount of programming experience, and that you work primarily in C/C++. These are the native languages of the Komodo daemon. When making adjustments to your coin's daemon, other languages can be supported, depending on the circumstances. It may incur an additional cost. Please reach out to our team with your questions.

For anything that occurs outside of the daemon, naturally you may use any language that can throw an rpc call to your coin's daemon. Most common languages support this functionality. We are working to create wrappers for importing Komodo functionality into your workflow. If you have a language that is not yet available, we welcome you to create a wrapper and contribute it to [our Github repository](https://www.github.com/komodoplatform). Please reach out to us with your language-wrapper requests.

### A Caveat for Daemon and CC Developers

For simplicity's sake, we can divide developers in the Komodo ecosystem into two categories: those who want to utilize the existing Fluidity Module library (relatively easy), and those who want to contribute new modules to the library (hard).

The former type of developer may consume any available modules at will. Please communicate often with our team during your development process.

For those who would like to add to the library, however, there is one caveat. Under most circumstances, only a highly skilled developer should make adjustments to the code that affects the internal workings of the default daemon. This caveat includes creating new Fluidity modules.

For this reason, at this time our team is available to assist developers in writing Fluidity modules -- both those who wish to work outside the daemon and those who wish to work within it.

If you have an idea that you would like to make a reality on Komodo and you need assistance in writing a secure module, please reach out to us. We are actively working to build up our library of Fluidity module, and will therefore do what we can to help you safely code your module idea and add it to your daemon.

This offer is only available for a limited time, and only on an "as is" basis.

Over time, as the library of secure modules increases, it is possible that the need to create new modules will decrease. We also hope that a community of advanced freelance developers will grow in our ecosystem, to facilitate Komodo's adoption.

## Install the Basic Komodo Software

So you've decided you want to take Komodo for a free test drive. Alright!

The next step is to install the software on your machine.

[Follow through the instructions here,](../installations/basic-instructions.html#installing-basic-komodo-software) and return to this spot in the outline when you are finished.

## Get Acquainted With komodod and komodo-cli

Now that you have `komodod` and `komodo-cli` installed, [skim briefly through the instructions on how to interact with a Komodo-based daemon, linked here](../installations/basic-instructions.html#interacting-with-komodo-chains).

You'll come back to this section later, once you're ready to execute API commands and runtime parameters.

::: tip
You do not need to launch or sync the main Komodo chain (KMD), and you do not need to own any KMD to test an asset chain.
:::

## Create Your First Asset Chain

With `komodod` and `komodo-cli` installed you're ready to spin up an asset chain.

[Follow the instructions in this linked guide to build your first asset chain.](../installations/creating-asset-chains.html#creating-a-new-asset-chain)

We recommend that you use the simplest of settings for now.

For example:

`./komodod -ac_name=HELLOWORLD -ac_supply=777777 &`

## Execute Elementary RPC's

After you have your asset chain running on both nodes, we recommend executing some basic rpc calls in the terminal.

Here are links to some simple and common rpc examples:

[getnewaddress](../komodo-api/wallet.html#getnewaddress)

[sendtoaddress](../komodo-api/wallet.html#sendtoaddress)

[getinfo](../komodo-api/control.html#getinfo)

As Komodo is downstream from both [Bitcoin](https://bitcoin.org) and [Zcash](https://z.cash), essentially all of the commands that are available on those two upstream blockchains are also available here.

## Test Out Platform-Specific Features

We create many features, functionalities, and commands that are specifically designed for dApp and platform-oriented developers.

For example, you can learn how to make asset chains that are more complicated in nature.

[Read this documentation first to get the basic idea](../installations/asset-chain-parameters.html).

Once you understand the concept, you can test a few asset-chain tricks -- like making your asset chain's consensus mechanism [a mix between Proof of Work and Proof of Stake](../installations/asset-chain-parameters.html#ac-staked).

Or, you could make your asset chain suitable for a rapid mining period, followed by complete blockchain disposal. Use parameters such as [ac_end](../installations/asset-chain-parameters.html#ac-end), [ac_reward](../installations/asset-chain-parameters.html#ac-reward), [ac_decay](../installations/asset-chain-parameters.html#ac-decay), and [ac_perc](../installations/asset-chain-parameters.html#ac-perc) for this effect.

## Discover Custom Consensus Modules

Now you should be ready to head into the territory for utilizing Komodo's built-in methods to customize your own consensus mechanism.

Playing with your consensus mechanism is akin to creating what other blockchain platforms call a "smart contract." However, on Komodo, things are different. We would argue this method is better, but we admit we're biased.

If you need to catch the general idea, read the section, [Custom Consensus Overview](custom-consensus-overview.html).

First, you must create an asset chain that has the [ac_cc runtime parameter properly enabled](../installations/asset-chain-parameters.html#ac-cc).

With this activated, you can try a few existing templates:

- [Create ERC20 tokens on your new asset chain](../customconsensus/tokens.html)
- Try using your [built-in on-chain DEX](../customconsensus/gateways.html)
- Use [the oracles smart-contract template](../customconsensus/oracles.html) to import real-world data to your blockchain, which can then affect blockchain behavior

...and more!

## Write Your Own Custom Consensus Module

If you're ready to try writing your own Custom Consensus (CC) modules, please read the detailed technical documentation written by our lead developer, JL777: [Mastering Custom Consensus](https://docs.komodoplatform.com/cc-jl/introduction.html).

Most developers don't need to design CC modules on Komodo, but rather, only need to implement existing modules while developing a dApp. So don't be discouraged if the technical documentation appears too thick for your level of experience. Come to Discord when you have questions.

## Learn About BarterDEX and Agama

Your asset chain can easily be integrated into our native atomic-swap powered DEX, [BarterDEX](../installations/basic-instructions.html#komodo-s-native-dex-barterdex), and our multi-coin wallet, [Agama](https://komodoplatform.com/komodo-wallets/).

You can learn more about both on [docs.komodoplatform.com](https://docs.komodoplatform.com).

## Differences between KMD and an Asset Chain

Newcomers to the Komodo ecosystem may benefit from understanding the differences between the main KMD blockchain and all other asset chains in the Komodo ecosystem.

The main KMD blockchain runs on the same underlying framework as all asset chains in the ecosystem, but not all features are active on the KMD blockchain. The KMD chain's active features include Bitcoin-hash rate supported security and the ability to write Custom Consensus (CC) modules. Other features, such as zero-knowledge privacy, are disabled.

This limitation is intentional. The KMD main-net blockchain holds all the meta data of the ecosystem. By keeping the functionality of this chain limited, Komodo discourages rapid data growth on this central blockchain.

All other asset chains are fully customizable. 

## Visit Us in Discord

Once again, we remind you to come visit us in [our Discord channel](https://komodoplatform.com/discord)!

We appreciate your interest and hope to give you a pleasant developer experience.
