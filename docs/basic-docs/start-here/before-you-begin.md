# Before You Begin

The following content answers common questions that may later arise during the discovery process. 

## Visit Us in Discord

First, we encourage you to come [to our Discord channel](https://komodoplatform.com/discord) and discuss your goals with our community, and to come by frequently throughout your discovery process.

We are a deeply engaged and highly enthusiastic open-source blockchain community, always ready to get creative with like-minded people.

Ask questions in our Discord channels, such as `#developer`, `#cryptoconditions`, and others. Team and community members are usually available to assist you.

## Assumptions for this Documentation

In the documentation throughout this website, we're going to assume that you have a general idea of what a blockchain is.

If you're not familiar, we recommend that you [read Part I of our white paper](https://www.komodoplatform.com/whitepaper). It explains what a blockchain is, why blockchain technology is significant, the basic idea of how it works, and why you should care.

We're also going to assume that you are comfortable programming in at least one mainstream language. Technically, Komodo can work with any language, but there are some things to keep in mind before you get too excited. [Find out more about languages on Komodo here](../start-here/outline-for-new-developers.html#a-brief-note-about-languages).

If you're not yet a programmer, but you're interested to make a career in the blockchain revolution, welcome! The open-source nature of Komodo and our enthusiastic community make this a perfect place to begin your journey. We recommend that you come [to our Discord channel](https://komodoplatform.com/discord) and discuss your goals with our community members. We look forward to meeting you!

## The Cost of Running a Smart Chain

You may be wondering about pricing for Komodo Smart Chains. Simply creating and developing the Smart Chain for testing purposes does not require contact with or payment to the Komodo team.

::: warning IMPORTANT
However, in nearly all circumstances, a Smart Chain is only secure once it receives our dPoW connection to the Bitcoin hash rate (dPoW).
:::

You can read more about how the security and payment are structured in [the section on Komodo's dPoW security services](../installations/creating-asset-chains.html#secure-this-asset-chain-with-delayed-proof-of-work).

In general, the cost for Komodo's security services is competitive. While the initial-setup cost may or may not be higher than the initial-setup cost of other blockchain platforms, the benefits swiftly reveal many advantages and savings. You own your own full blockchain, you have no need to pay a KMD gas/transaction fee, and you are able to deploy unlimited Fluidity modules and ERC20-like tokens on your chain.

Please reach out to our team whenever you are ready to purchase dPoW. We will direct you to one of our service providers, and they can give you a direct quote for the annual cost.

::: tip
We have a limited supply of early-adopter discounts. Please inquire while supply last.
:::

## A Brief Note About Languages

In considering the languages available in the Komodo ecosystem, there are two aspects to address: code that runs inside your daemon, and code that runs outside of it.

Code that runs inside the daemon is typically low-level, and working with this code requires strong experience. This low-level code may, for example, change the nature of your consensus mechanism using the Fluidity framework.

Code that runs outside the daemon can be high-level, such as JavaScript or Python. A Smart Chain that is built using existing Fluidity modules can exist entirely outside the daemon. It could consist of GUI's, back-end databases, and other non-daemon code and assets that make your Smart-Chain application function.

In both circumstances, you are able to use whatever language you desire.

However, if you are working within the daemon, we currently recommend that you have a considerable amount of programming experience, and that you work primarily in C/C++. These are the native languages of the Komodo daemon. When making adjustments to your coin's daemon, other languages can be supported, depending on the circumstances. It may incur an additional cost. Please reach out to our team with your questions.

Members of our community are in various stages of completing language wrappers, to bring Fluidity-module functionality to different programming languages. Please reach out on [Discord](https://komodoplatform.com/discord) for more information.

## A Caveat for Daemon and Fluidity Developers

For simplicity's sake, we can divide developers in the Komodo ecosystem into two categories: those who want to utilize the existing Fluidity Module library (relatively easy), and those who want to contribute new modules to the library (hard).

The former type of developer may consume any available modules at will. Please communicate often with our team during your development process.

For those who would like to add to the library, however, there is one caveat. Under most circumstances, only a highly skilled developer should make adjustments to the code that affects the internal workings of the default daemon. This caveat includes creating new Fluidity modules.

For this reason, at this time our team is available to assist developers in writing Fluidity modules -- both those who wish to work outside the daemon and those who wish to work within it.

If you have an idea that you would like to make a reality on Komodo and you need assistance in writing a secure module, please reach out to us. We are actively working to build up our library of Fluidity modules, and will therefore do what we can to help you safely code your module idea and add it to your daemon.

This offer is only available for a limited time, and only on an "as is" basis.

Over time, as the library of secure modules increases, it is possible that the need to create new modules will decrease. We also hope that a community of advanced freelance developers will grow in our ecosystem, to facilitate Komodo's adoption.

#### On to the Next Section

With the above points in mind, it's time to install Komodo. Proceed to the next section.
