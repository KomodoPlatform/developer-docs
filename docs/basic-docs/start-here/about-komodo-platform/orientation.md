# Documentation Orientation

The following section answers common questions a newcomer may have, and prepares the new reader for the installation procedure.

### Intended Audience of this Technical Documentation Website

This website is targeted for developers in the Komodo ecosystem.

Users who are not interested in developing Komodo-based software, but only in using existing software, should instead turn to the Komodo Support website for questions and answers.

[<b>Link to Komodo Support Website</b>](https://support.komodoplatform.com)

### Assumptions for this Documentation

To limit the scope of what we cover on the technical-documentation website, we list the following prerequisite knowledge. 

#### Familiarity with the Concept of Blockchain Technology

The reader should be generally familiar with the basic concept of blockchain technology and why it matters. If you're not yet familiar, we recommend that you first read our Core Technology Discussion regarding our <b>Delayed Proof of Work</b> consensus mechanism.

[<b>Link to Core Technology Discussion: Delayed Proof of Work</b>](../../../basic-docs/start-here/core-technology-discussions/delayed-proof-of-work.html)

#### Simple Programming Skills

Much of the content on this site will be more understandable for the reader who has a rudimentary understanding of a mainstream programming language. 

Beginner-level knowledge should be sufficient for the majority of the site. For example, the reader should be able to:

- Execute commands on the command line
- Utilize an Application Programming Interface (API)
- Write and execute a rudimentary script in any mainstream language

If you do not have these prerequisite experiences, we encourage you to reach out to our community on [<b>Discord.</b>](https://komodoplatform.com/discord) There are thousands of free tutorials online that can help you quickly cover these topics. We will be happy to help you in your search.

### A Note Regarding Komodo Language Compatibility 

Komodo is a highly capable blockchain technology, and it is designed for compatibility with essentially all mainstream programming languages. However, not all developers will need to use its most advanced aspects.

#### A Normal Developer in the Komodo Ecosystem

A typical developer in the Komodo ecosystem will build all their application logic in a separate application that runs outside of their Smart Chain daemon. 

The developer's software will send API requests to their Smart Chain's daemon to update the blockchain state and take advantage of Komodo's default Antara Modules. (Antara Modules provide functionality similar to the "smart contracts" that are common on other platforms. However, we argue that Antara Modules are dramatically more powerful.) 

For this developer, any programming language that is capable of sending API requests to the software daemon is compatible.

#### An Advanced Antara Developer

A highly advanced developer may be interested to take advantage of the full potential of Komodo technology. 

This developer can utilize Komodo's Antara Framework to add arbitrary code to the consensus mechanism of their autonomous Smart Chain.

Although the Antara Framework can be compatible with essentially all mainstream programming languages, at this time we encourage developers to stay close to the C/C++ languages. 

### The Cost of a Smart Chain

#### Installation and Testing is Free

Creating and experimenting with Komodo Smart Chains is completely free. Even for Production Smart Chains, hardware needed to run the Smart Chains and the other essential associated infrastructure like Electrum servers, Explorers is the only expense if you are doing everything by yourself.

#### Production Smart Chains Typically Require Komodo's Security Services

If your Smart Chain is pure PoW based and doesn't include greater than 50% [PoS](../../../../antara/antara-setup/antara-customizations.html#ac-staked) based block generation, it is only truly secure once it receives the Komodo dPoW Security Service.

Please reach out to our bizdev team for a cost quote on our [<b>Discord</b>](https://komodoplatform.com/discord) live-chat server. Their usernames are:

- `ptyx#6840`
- `polycryptoblog#1173`

### The Cost of Using AtomicDEX Software

Currently, there are no additional costs for AtomicDEX beyond the fees listed for each trade. 

### Differences between KMD and a Smart Chain

The main KMD blockchain runs on the same underlying framework as all Smart Chains in the ecosystem, but not all features are active on the KMD blockchain.

The KMD chain's active features include Bitcoin-hash rate supported security and the ability to execute Antara Modules. Other features, such as zero-knowledge privacy, are disabled.

This limitation is intentional. The KMD chain holds all the meta data of the ecosystem. By keeping the functionality limited, Komodo discourages rapid data growth on this central blockchain.

All other Smart Chains in the ecosystem are fully customizable. 

### Licensing Information

All technical-documentation content on this website can be considered to be available under the MIT standard license. Some of the content, including many of the remote procedure call (RPC) documentation that relates to upstream software, such as Bitcoin and Zcash, is derived from upstream documentation that is also freely available. 

For questions and inquiries about licensing information, please reach out to the Komodo team.
