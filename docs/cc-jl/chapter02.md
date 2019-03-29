# Chapter 02 - CC Contract Basics

Each CC contract has an eval code, this is just an arbitrary number that is associated with a specific CC contract. The details about a specific CC contract are all determined by the validation logic, that is ultimately what implements a CC contract.

However, unlike the normal bitcoin payments, where it is validated with only information in the transaction, a CC contract has the power to do pretty much anything. It has full access to the blockchain and even the mempool, though using mempool information is inherently more risky and needs to be done carefully or for exclusions, rather than inclusions.

However, this is the CC contract basics chapter, so let us ignore mempool issues and deal with just the basics. Fundamentally there is no structure for `OP_CHECKCRYPTOCONDITION` serialized scripts, but if you are like me, you want to avoid having to read and understand a 1000 page IETF standard. What we really want to do is have a logical way to make a new contract and have it be able to be coded and debugged in an efficient way.

That means to just follow a known working template and only changing the things where the existing templates are not sufficient, ie. the core differentiator of your CC contract.

In the [~/komodo/src/cc/eval.h](https://github.com/jl777/komodo/tree/jl777/src/cc/eval.h) file all the eval codes are defined, currently:

```bash
#define FOREACH_EVAL(EVAL)             \
        EVAL(EVAL_IMPORTPAYOUT, 0xe1)  \
        EVAL(EVAL_IMPORTCOIN,   0xe2)  \
        EVAL(EVAL_ASSETS,   0xe3)  \
        EVAL(EVAL_FAUCET, 0xe4) \
        EVAL(EVAL_REWARDS, 0xe5) \
        EVAL(EVAL_DICE, 0xe6) \
        EVAL(EVAL_FSM, 0xe7) \
        EVAL(EVAL_AUCTION, 0xe8) \
        EVAL(EVAL_LOTTO, 0xe9) \
        EVAL(EVAL_HEIR, 0xea) \
        EVAL(EVAL_CHANNELS, 0xeb) \
        EVAL(EVAL_ORACLES, 0xec) \
        EVAL(EVAL_PRICES, 0xed) \
        EVAL(EVAL_PEGS, 0xee) \
        EVAL(EVAL_TRIGGERS, 0xef) \
        EVAL(EVAL_PAYMENTS, 0xf0) \
        EVAL(EVAL_GATEWAYS, 0xf1)
```

Ultimately, we will probably end up with all 256 eval codes used, for now there is plenty of room. I imagined that similar to my coins repo, we can end up with a much larger than 256 number of CC contracts and you select the 256 that you want active for your blockchain. That does mean any specific chain will be limited to "only" having 256 contracts. Since there seems to be so few actually useful contracts so far, this limit seems to be sufficient. I am told that the evalcode can be of any length, but the current CC contracts assumes it is one byte.

The simplest CC script would be one that requires a signature from a pubkey along with a CC validation. This is the equivalent of the pay to pubkey bitcoin script and is what most of the initial CC contracts use. Only the channels one needed more than this and it will be explained in its chapter.

We end up with CC scripts of the form (`evalcode`) + (`pubkey`) + (other stuff), dont worry about the other stuff, it is automatically handled with some handy internal functions. The important thing to note is that each CC contract of this form needs a single pubkey and eval code and from that we get the CC script. Using the standard bitcoin's "hash and make an address from it" method, this means that the same pubkey will generate a different address for each different CC contract!

This is an important point, so I will say it in a different way. In bitcoin there used to be uncompressed pubkeys which had both the right and left half combined, into a giant 64 byte pubkey. But since you can derive one from the other, compressed pubkeys became the standard, that is why you have bitcoin pubkeys of 33 bytes instead of 65 bytes. There is a 02, 03 or 04 prefix, to mean odd or even or big pubkey. This means there are two different pubkeys for each privkey, the compressed and uncompressed. And in fact you can have two different bitcoin protocol addresses that are spendable by the same privkey. If you use some paper wallet generators, you might have noticed this.

CC contracts are like that, where each pubkey gets a different address for each evalcode. It is the same pubkey, just different address due to the actual script having a different evalcode, it ends up with a different hash and thus a different address. Now funds send to a specific CC address is only accessible by that CC contract and must follow the rules of that contract.

I also added another very useful feature where the convention is for each CC contract to have a special address that is known to all, including its private key. Before you panic about publishing the private key, remember that to spend a CC output, you need to properly sign it AND satisfy all the rules. By everyone having the privkey for the CC contract, everybody can do the "properly sign" part, but they still need to follow the rest of the rules.

From a user's perspective, there is the global CC address for a CC contract and some contracts also use the user pubkey's CC address. Having a pair of new addresses for each contract can get a bit confusing at first, but eventually we will get easy to use GUI that will make it all easy to use.
