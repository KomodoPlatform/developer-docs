# Chapter 12 - Limitless Possibilities

As can be seen, CC contracts can do a wide range of things and since they are Turing complete, we know that this is true. However, what is more important is the added security gained from using a utxo based system. While in some ways it is more complex to have to deal with utxo, as can be seen by the above examples, it is either solved and made invisible at the rpc level, or actually used as part of the solution.

Being utxo based, automatically builds in a rate limit to how many tx per block a specific CC contract can do. The state advancing by one transaction at a time is another means that rate limits. Since more utxo can be made available to increase capacity, it actually offers a way for managing load.

I believe I have made one of the first operational utxo smart contracts, CC or otherwise and hope that there will be many more developers joining forces to create more foundational CC contracts. Feel free to contact me for feedback on the type of CC contract you want to make. I have not documented all my notes and it could well be I already sort of know how to implement what your want your CC contract to do. Just only so many I can actually make time to code and debug.

Our testing cycle went a lot faster than expected as the bugs found were few and far between. Considering the scope of the assets CC and the realtime response aspects of dice CC, this was quite unexpected. I can only attribute it to the fact that CC validation is just the final validation on top of all the standard bitcoin protocol validations. Not having to worry about double spends is sure a nice luxury, though dont get too complacent about chain rewrites! It is possible to wait for information to be divulged and then reorg the chain to take advantage of this knowledge in a chain which is rewound.

Yes, blockchains are complicated.
