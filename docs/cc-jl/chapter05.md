# Chapter 05 - CC Validation

CC validation is what its all about, not the "hokey pokey"!

Each CC must have its own validation function and when the blockchain is validating a transaction, it will call the CC validation code. It is totally up to the CC validation whether to validate it or not.

Any set of rules that you can think of and implement can be part of the validation. Make sure that there is no ambiguity! Make sure that all transactions that should be rejected are in fact rejected.

Also, make sure any rpc calls that create a CC transaction dont create anything that doesnt validate.

Really, that is all that needs to be said about validation that is generic, as it is just a concept and gets a dedicated function to determine if a transaction is valid or not.

For most of the initial CC contracts, I made a function code for various functions of the CC contract and add that along with the creation txid. That enables the validation of the transactions much easier, as the required data is right there in the opreturn.

You do need to be careful not to cause a deadlock as the CC validation code is called while already locked in the main loop of the bitcoin protocol. As long as the provided CC contracts are used as models, you should keep out of deadlock troubles.
