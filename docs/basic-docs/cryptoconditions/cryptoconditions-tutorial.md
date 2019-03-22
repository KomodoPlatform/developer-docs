# Build a New CC Module

(Notes)

Summary:

Public key cryptography is used when a private and public key pair are used for proving something.
Private Keys are stored in a wallet, not on the blockchain.
Private keys sign transactions.
Signatures on transaction are proven by the network using the corresponding public key to spend the claimed ownership of funds.
Transactions fill blocks, like an item on a shopping list fills a piece of paper.
Blocks are arranged in sequential order, forming a chain.
Each block contains agreed transactional information. The proof of the transactional detail and it's arrangement in the block is called consensus. Consensus is achieved by each participant relying on their own computation.
Coins & Tokens are used in transaction details to transfer value.
Nodes is the jargon term for computers that do the computations to maintain the network.

jl777
bool custom_validate(struct CCcontract_info *cp,int32_t height,Eval *eval,const CTransaction tx)
{
char expectedaddress[64]; CPubKey pk;
if ( tx.vout.size() != 2 ) // make sure the tx only has 2 outputs
return eval->Invalid("invalid number of vouts");
else if ( custom_opretdecode(pk,tx.vout[1].scriptPubKey) != '1' ) // verify has opreturn
return eval->Invalid("invalid opreturn");
GetCCaddress(cp,expectedaddress,pk);
if ( IsCClibvout(cp,tx,0,expectedaddress) == COIN ) // make sure amount and destination matches
return(true);
else return eval->Invalid("invalid vout0 amount");
}
J
that is the validation function for the customcc.cpp EVAL_CUSTOM CC


jl777
THAT is the CC validation
J
it is invoked if you spend a CC vout with EVAL_CUSTOM evalcode
not sure what you mean by "into account"
mylo5ha5
custom_func1 is great btw. thx.

Ssiddhartha_crypto do you want to "normal coin" p2p consensus? mastering bitcoin book explains.


siddhartha_crypto
To put it into other words, to check for understanding:

This is the code of CryptoConditions that every machine must run to ensure that the consensus across all machines is the same?
S
jl777
yes. custom_validate is what has to return "true" for it to pass validation
J
siddhartha_crypto
Great
S


How would you describe (in common language) the challenges a developer would face when trying to write a "smart contract" (for lack of a better term) that relies on a blockchain?
jl777
it is a very simple CC, so the validation is really simple. as you make more CC methods, you need to add the corresponding validation. otherwise they are not validated
J
smart contract does not change consensus rules, it is an interpreted set of commands that must follow consensus
i have no idea how to put CC in the context of smart contract
siddhartha_crypto
smart contract does not change consensus rules, it is an interpreted set of commands that must follow consensus
S
this is good stuff
jl777
it is like trying to explain a 3D object when all you have are 2D.
J
i guess you can sort of explain it but it will always be approximations. when the actual thing is so simple, why not to discuss the real thing, instead of a simulation of something that must be interpreted
the first consensus took many years to get working stable, ie. bitcoin protocol


anytime there is a new consensus it is a BIG project
changing consensus rules with CC is a bit easier, ie. customcc.cpp. it is simple enough it is possible for a coder to do in a few hours for simple things and a weekend for not that complex things
instead of taking years, it is reduced to weeks or days
siddhartha_crypto
this is helpful
S
jl777
it is like being able to make a car with custom engines in it, without even having to make a new car, or even a new engine. just the exact thing that is different needs to be created


How accurate is this, for the next thing we say to him:

The reason why you would choose Komodo over [insert competitor], is that Komodo allows you to add your creativity into the consensus mechanism itself, without having to rewrite the consensus mechanism from scratch.

Let's say that you want to make a game, and you want to have the rules of gameplay be adopted as a part of the blockchain consensus mechanism. You don't want to have to run a centralized database, because then it would put the responsibility over consensus on your shoulders, instead of on your players. This saves you loads of hassle. Everyone can verify the blockchain, and therefore everyone can be assured that the gameplay and the blockchain are in harmony.

The problem is this: Once you start adding a gameplay rule to a normal blockchain, you're basically dealing with a whole new consensus mechanism. It took years to make the Bitcoin consensus mechanism stable.


when you try to add on your creativity, without a framework to help you, you are going to have to basically start from scratch.

CC allows you to add in your creativity, without having to start over in the testing phase.

The only rule is that you have to bring everything down to true/false. If the result of your creative code + the user's actions is true, then a transaction is executed. It can have any metadata or value transfer in it you want. If false, then no transaction is executed.



J
you are not understanding the magnitude of labor savings
siddhartha_crypto
How can I better understand it?
S
jl777
imagine you have the idea of a little gizmo to make a car run more efficiently. this is your expertise. it might be hard to do, but you are good at this
J
you can basically plug that into a CC and test a new blockchain using your value add, in a weekend
alternative is to what?
write a new blockchain from scratch?
siddhartha_crypto
right.
S
no need to build a new car, if you're just trying to build a better radio



mylo5ha5
the CC stuff....whatever they customize, they just have build the validation rules for what they build.
example:

i will let daniel to put 10KMD into a CC address
i will let myself put 1KMD into the same CC address
there is a value in an oracle that tracks how many hits on the komodo website a page gets
if one day a page get 1000 hits, the author gets teh CC address funds released to their address
the author & their key is mapped
The validation rules are:

the registered oracle value is >1000 (if not, do nothing)
if it's >1000, get the author's payout address
release the funds to that address



jl777
something that projects with $100 mil of funding take years to get completed
J
assuming there is an oracle, the CC would use the consensus rule that checks the tx for the pubkey of who is trying to spend it. then depending on that pubkey, checking the oracle to make sure they are allowed to do whatever spend is in the tx
tx.vout[0].nValue is the amount
tx.vout[0].scriptPubKey is the spending script (destination)
siddhartha_crypto
Okay, from here we need to get more into the technical stuff, and this is where we need to rely on Mylo for help.
