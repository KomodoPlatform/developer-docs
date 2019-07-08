siddhartha_crypto joined the room.
S
siddhartha_crypto made the room invite only.
S
siddhartha_crypto made future room history visible to all room members.
S
siddhartha_crypto has allowed guests to join the room.
S
siddhartha_crypto changed the room name to Temp-CC-Disc-Jl777-Mylo-Sid.
S
expand
J
jl777 was invited and joined, mylo5ha5 was invited
Yesterday
mylo5ha5 joined the room.

Today
siddhartha_crypto
discussion here
S
jl777
ok, please review customcc*
J
and makecustom
siddhartha_crypto
yes, reading through it now
S
switching to here, mylo5ha5
mylo5ha5
cool thx

siddhartha_crypto
So, what we're looking at in these three files is a script that assists a developer in compiling a CC module as a part of compiling komodod?
S
mylo5ha5

boilerplate cclib (custom dynamic library)
jl777
no
J
it is an example of a very simple libcc
you know, the source code
make a fork, tweak the source code
build, test
repeat
siddhartha_crypto
This is further along than my understanding.
S
jl777
you know about source code?
J
siddhartha_crypto
Mylo, I hate to have to slow you down here, but if it's okay with both of you, can we rewind a bit further into "beginner territory"?
S
I know the general term, "source code", but what it means to me is not as developed as what it means to you.
jl777
you need to be a coder to even think about doing this
J
a C file, a H file
compile and build
what is your understanding of source code?
siddhartha_crypto
source code to me generally means, the unmodified programming instructions that a developer provides to a compiler or interpreter before executing the program on a machine
S
When you say, C file and H file (which I noticed in the extensions), I get lost there.
(Some background about my skills: i've written node apps that run on heroku and serve a very simple dynamic website, such as a chat box. All of the hard stuff is solved with node, and I only write basic instructions that tell node the idea of what I want.)
jl777
customcc.h and customcc.cpp are the source files
J
they are in the src/cc directory
they are compiled and linked into customcc.so by the makecustom script
which is a simple simple set of bash commands
please tell me you can understand this
gcc sourcefile.cc
.cpp
then run it
in this case you are building a library
so after you build the library, you need to relink komodod
if you cant understand these things then it isnt for you to document this
siddhartha_crypto
I've dealt with gcc in some basic studies
S
mylo5ha5
it's like building a nodejs npm module, except in native code. instead of npm build you're doing real things with a compiler.

siddhartha_crypto
When you say, "you are building a library," that's where things become vague. I don't believe it's because I'm not far enough along to understand it, but rather because I have not delved deeply into the inner workings of komdodo, which may now be necessary.

I do get the general idea of a library.

Okay, mylo's explanation helps.
S
Anyhow, we need to rewind a bit, before we get into which files connect to which.
The questions that I wanted to ask you were related to your statements about consensus confusion that developers experience when trying to work with CC.
You've mentioned that developers get confused when dealing with consensus.

I need more information here.

What is it about consensus that most developers find confusing when developing for komodod (or Bitcoin)?

If possible, let's assume that we do not yet have access to CryptoConditions.
mylo5ha5
Ssiddhartha_crypto: devs get confused because they don't understand the "core concepts"

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

siddhartha_crypto
ok, let's delve more into this statement:

Each block contains agreed transactional information. The proof of the transactional detail and it's arrangement in the block is called consensus. Consensus is achieved by each participant relying on their own computation.
S
I'm assuming that there is a challenge when developing a script for a decentralized network to have each computer arrives at the same computational conclusion in the end, and this is the consensus challenge?
mylo5ha5
00:34
Yes lets plz.

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
siddhartha_crypto
This is taking CryptoConditions into account, correct?
S
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
So, I'm trying to get into the "why should someone care about CC?" question, and so to get deeper intot that, let's assume that we do not yet have that function above.

Let's pretend we don't have it.

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
J
mylo5ha5
Ssiddhartha_crypto: when deving a new CC, james has said above "...as you make more CC methods, ou need to add the corresponding validation, otherwise not validated..."

And previously this was the dev hint that goes hand in hand:
By going from a chain without validation, to weak validation to full validation, the advantage is that nodes running older versions keep running, so as long as they arent mining it allows to update the field incrementally with versions that have more and more validations.


siddhartha_crypto
Could I say it like this?

CC allows us to add rules  to the consensus mechanism, thus updating the consensus itself, without having to redo the existing, testing, functioning consensus mechanism itself?
S
jl777
I am pretty sure that in the last several months I have created more new running blockchain consensus systems than anybody else, ever
J
siddhartha_crypto
heh
S
Interesting.
jl777
since there are not so many working consensus systems total, it is quite possible I have made more than everybody else combined. but not sure on the actual number of blockchains with different consensus rules
J
siddhartha_crypto
okay
S
so, let's say that we have a potential customer
and he's considering building on Komodo
He has 10+ years of experience in C/C++ development, and he's reasonably good at what he does.
jl777
from a blockchain enforced faucet, dilithium, ... gameplay validation
J
siddhartha_crypto
While he's comfortable with languages, he's not yet comfortable with blockchain.
S
He's trying to choose between komodo and some other project.
jl777
if you can understand utxo and can code, then you can make CC
J
it is all about the utxo
mylo5ha5
if someone is a strong C++ dev, they need to understand the core concepts.   PKI, signing tx.  the tx uses a utxo.

jl777
weekend coders should use smart contracts
J
real coders should use CC
i guess weekend coders can just use the rpc calls for existing CC also
but definitely for sure, with warnings, weekend coders should NOT be making new consensus rules
siddhartha_crypto
00:55
He gets the general idea of consensus, after looking at the function you showed me above, and after skimming over some of Mastering Bitcoin.

How accurate is this, for the next thing we say to him:

The reason why you would choose Komodo over [insert competitor], is that Komodo allows you to add your creativity into the consensus mechanism itself, without having to rewrite the consensus mechanism from scratch.

Let's say that you want to make a game, and you want to have the rules of gameplay be adopted as a part of the blockchain consensus mechanism. You don't want to have to run a centralized database, because then it would put the responsibility over consensus on your shoulders, instead of on your players. This saves you loads of hassle. Everyone can verify the blockchain, and therefore everyone can be assured that the gameplay and the blockchain are in harmony.

The problem is this: Once you start adding a gameplay rule to a normal blockchain, you're basically dealing with a whole new consensus mechanism. It took years to make the Bitcoin consensus mechanism stable.

when you try to add on your creativity, without a framework to help you, you are going to have to basically start from scratch.

CC allows you to add in your creativity, without having to start over in the testing phase.

The only rule is that you have to bring everything down to true/false. If the result of your creative code + the user's actions is true, then a transaction is executed. It can have any metadata or value transfer in it you want. If false, then no transaction is executed.

Is that a fair way to explain it?

jl777
given mastering bitcoin, any decent senior C/C++ coder will be able to do CC just fine
J
siddhartha_crypto
That's good to know.
S
I will probably want to add that as a note.
jl777
without having to start over in the testing phase.
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
?


jl777
something that projects with $100 mil of funding take years to get completed
J
assuming there is an oracle, the CC would use the consensus rule that checks the tx for the pubkey of who is trying to spend it. then depending on that pubkey, checking the oracle to make sure they are allowed to do whatever spend is in the tx
tx.vout[0].nValue is the amount
tx.vout[0].scriptPubKey is the spending script (destination)
siddhartha_crypto
Okay, from here we need to get more into the technical stuff, and this is where we need to rely on Mylo for help.
S
jl777
all you need is to do transaction level validation
J
all the blocklevel consensus is automatic
siddhartha_crypto
I can tag along on your coat tails, but I don't want to project the idea that I am qualified to build a simple CC module.
S
jl777
also, the tx are still following all the existing consensus rules
J
mylo5ha5
yeah, as long as CC level stuff is reconciled, the low level utxo mgmt is taken care of.

siddhartha_crypto
Mylo, do you think you could build a very, very simple CC module, with James's guidance?
S
jl777
this is why dilithium was so easy to do
J
I just mapped Qutxo to utxo
the only hard part was dealing with the giant sized keypairs
siddhartha_crypto
that is fascinating
S
see, what we want is for developers to realize the power of this
People aren't "thinking" like you, yet, James.
jl777
most devs dont even dream of making their own custom consensus rules blockchains
J
siddhartha_crypto
We need developers out there working on other blockchain-engineering projects, or rather, those who are looking to see which project to pick, look at that and see the value.
S
jl777
it is like an individual dreaming of building a better jumbo jet plane
J
siddhartha_crypto
With my low skill level in coding, it's hard to know how to communicate the value of that.
S
jl777
just not practical to even build one plane in the garage, doesnt fit
J
siddhartha_crypto
But hopefully we can better get that across.
S
jl777
let alone the complexity
J
siddhartha_crypto
Mylo, do you think you can build a simple CC module, with James's help:
S
?
jl777
I have made many simple CC, like faucet
J
and customcc
if you look at customcc.h, jl777 branch
you will see a few constants that need to be changed,
so you can add new CC methods
mylo5ha5
Ssiddhartha_crypto: yeah. something simpler.

send 1KMD to CC address, and locked until blockheight ends in 00
send 0.01KMD to CC address, if blockheight does not end in 00, it is deposited into CC address
send 0.01KMD to CC address, if blockheight ends in 00, release all funds to hardcoded address.

jl777
customcc is just something that requires to send 1 coin
J
please understand this
siddhartha_crypto
^ mylo, in that example, how hard would it be to add somethign that hooks up to an Oracles CC?
S
mylo5ha5
01:06
ok it's half done.

jl777
it cant get much simpler
J
it only allows you to send exactly 1 coin
it is silly and maybe is not actually useful, but it is simple
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
please dont turn off your brain because you think it is too complicated
mylo5ha5
FinalizeCCTx(0,cp,mtx,mypk,txfee,custom_opret('1',mypk));  <---- '1' is the 1 coin?

jl777
let us go one line at a time it is only a dozen lines
J
char expectedaddress[64]; CPubKey pk;
that declares a character array of 64 bytes and a CPubKey which is a pubkey. is this understandable or is it too complex
mylo5ha5
yes i'm following.

understood.
jl777
sidd?
J
siddhartha_crypto
Okay, so Mylo, from here, this is what I would like to do. Let me know wha tyou think.

If you can take notes while youwrite a CC Module that does that super simple example, and take notes on how to hook it up to Oracles, then from there, you and I can write a tutorial.

I'll add a new section that goes over the more high-level ideas that we've discussed, and then I'll follow through the tutorial to make sure I have at least the best idea we can manage.

From there, we can reassess.

We need to "show" people how simple this can make their life. The Dilithium is example is a wonderful example.

Outline of docs would look like this:

1 - Here's why CC matters (high-level discussion)

2 - But you'll never fully understand it, without trying it yourself, so let's do a tutorial

3 - Do a tutorial

4 - Now that you've seen how this works, let's take a look at how this can empower your creativity. (High-level discussion about how Dilithium and others were easy to achieve. The rest is up to your imagination.)
S
^ last part will show the specific way that Dilithium was hooked up to CC.
Does all that sound like a reasonable goal?
jl777
if ( tx.vout.size() != 2 ) // make sure the tx only has 2 outputs
return eval->Invalid("invalid number of vouts");
J
those two lines makes sure the tx has only 2 vouts
mylo5ha5
we're running thru that "super simple example".    the customCC accepts 1 COIN.
this part is obv.   has to be 2 vouts

jl777
else if ( custom_opretdecode(pk,tx.vout[1].scriptPubKey) != '1' ) // verify has opreturn
return eval->Invalid("invalid opreturn");
J
this runs the massively complex custom_opretdecode function to determine if it has a valid opreturn
mylo5ha5
is '1' the default when nothing is set?

jl777
GetCCaddress(cp,expectedaddress,pk);
that gets the CC address for the pk
J
mylo5ha5
oh shit...it expects true

jl777
and puts it in expected address
J
if ( IsCClibvout(cp,tx,0,expectedaddress) == COIN ) // make sure amount and destination matches
return(true);
that checks the tx, vout0 to make sure it is a CC vout for 1.00000000 COINS
so if it got that far, the tx has 2 vouts, second one is a valid opreturn and the first one is for 1 COIN -> return true
otherwise else return eval->Invalid("invalid vout0 amount");
that returns false with an error message "invalid vout0 amount"
that's it. all that is left is to understand the massively complex opreturn decode function
let me know when you are ready to tackle that beast
ok, there is a very instructive "bug" in this example, more at the design level. if you can understand that, you are one step closer to being able to make useful CC
CScript custom_opret(uint8_t funcid,CPubKey pk)
{
CScript opret; uint8_t evalcode = EVAL_CUSTOM;
opret << OP_RETURN << E_MARSHAL(ss << evalcode << funcid << pk);
return(opret);
}
that is the function that creates the custom opreturn. basically it creates the serialized bytes for evalcode (EVAL_CUSTOM), '1' and the pk
uint8_t custom_opretdecode(CPubKey &pk,CScript scriptPubKey)
{
std::vector<uint8_t> vopret; uint8_t e,f;
GetOpReturnData(scriptPubKey,vopret);
if ( vopret.size() > 2 && E_UNMARSHAL(vopret,ss >> e; ss >> f; ss >> pk) != 0 && e == EVAL_CUSTOM )
{
return(f);
}
return(0);
}
that is the monster function to decode it.
extract the opreturn bytes and deserialize the evalcode, funcid and pk
mylo5ha5
ok .... question on syntax.
opret << OP_RETURN << E_MARSHAL(ss << evalcode << funcid << pk);

what is the <<?   c++ way of serializing without calling a serialize()
jl777
yes << sends data to the opret
J
E_MARSHAL(ss ...) does the serializing
mylo5ha5
ok

jl777
since OP_RETURN is 1 byteno need to serialize
J
probably could be inside the E_MARSHAL
i am not a C++ expert though, so once it works i dont mess with it
so the validation is really quite simple and technically this "works" it is just a bad design
do you know why?
mylo5ha5
ok that makes sense.
what is tx.vout[0], it's never validated....?

jl777
IsCClibvout validates it as it is passed tx and 0
J
IsCClibvout returns the satoshis of the specified vout
IsCClibvout(cp,tx,0,expectedaddress)
mylo5ha5
oh, that's what 0 is

jl777
in this case tx/vout0
J
mylo5ha5
cool

jl777
also since expectedaddress is specified it also makes sure it is going to that address
J
even a junior coder should be able to understand things at this complexity level
the details are not hard
the hard part is the design
if you just naively throw something together, you can easily make something useless, like I did with customcc
but its uselessness is instructive in why it is useless
mylo5ha5
ok so far so good.   where is the design 'bug', the uselessness?

01:26
it just traps coins?

jl777
to understand why it is useless, it is good to understand the rpc call that creates the transaction that is being validated
J
UniValue custom_func1(uint64_t txfee,struct CCcontract_info *cp,cJSON *params)
{
CMutableTransaction mtx = CreateNewContextualCMutableTransaction(Params().GetConsensus(), komodo_nextheight()); std::string rawtx;
UniValue result(UniValue::VOBJ); CPubKey mypk; int64_t amount = COIN; int32_t broadcastflag=0;
if ( txfee == 0 )
txfee = CUSTOM_TXFEE;
mypk = pubkey2pk(Mypubkey());
if ( AddNormalinputs(mtx,mypk,COIN+txfee,64) >= COIN+txfee ) // add utxo to mtx
{
mtx.vout.push_back(MakeCC1vout(cp->evalcode,amount,mypk)); // make vout0
// add opreturn, change is automatically added and tx is properly signed
rawtx = FinalizeCCTx(0,cp,mtx,mypk,txfee,custom_opret('1',mypk));
return(custom_rawtxresult(result,rawtx,broadcastflag));
}
return(result);
}
CMutableTransaction mtx = CreateNewContextualCMutableTransaction(Params().GetConsensus(), komodo_nextheight()); std::string rawtx;
UniValue result(UniValue::VOBJ); CPubKey mypk; int64_t amount = COIN; int32_t broadcastflag=0;
that is just declaring a tx template and other variables
mypk = pubkey2pk(Mypubkey());
this sets mypk to your -pubkey CPubKey
if ( AddNormalinputs(mtx,mypk,COIN+txfee,64) >= COIN+txfee )
AddNormalinputs, adds normal inputs from mypk funds to the mtx for the amount of at least COIN+txfee and using no more than 64 utxo
MakeCC1vout(cp->evalcode,amount,mypk)
that adds a vout to the CC address for mypk in the amount of amount
i mean creates
mtx.vout.push_back(CTxOut) actually adds the vout to the mtx
now comes the part that is usually a big giant pain to do, properly signing the tx:
rawtx = FinalizeCCTx(0,cp,mtx,mypk,txfee,custom_opret('1',mypk));
pass in the mtx, the signing mypk, txfee and the opret and it automatically signs all the normal vins, CC vins adds opreturn at the end and also issue normal change (if any) and returns the raw hex
return(custom_rawtxresult(result,rawtx,broadcastflag));
mylo5ha5
yeah it's a big function in CCtx.cpp

jl777
finally custom_rawtxresult adds the rawtx plus a few other fields to the JSON object that is returned. there is also a broadcast flat to control if it should just sendrawtransaction
J
all the rpc functions need to return a UniValue
doesnt matter what is in it as far as the libcc is concerned
mylo5ha5
flag, cool - that's a beast of a function - takes a lot of headaches out for anyone.

jl777
so if you imagine a complex layered protocol stack, CC is just the lowest level layer, where the custom value added code is. the rest of the blockchain protocol, from utxos, to blocks, to reorgs, dPoW, etc. are all there but nowhere needed to be seen
J
mylo5ha5
can FinalizeCCTx ever fail?  or everything has been validated up to this point that it "just works" with signing everything?

jl777
it can fail to find enough funds
J
it can fail to figure out how to sign it, but there are ways to have it know about other privkeys it can use, other addresses it can sign, etc.
it is working for all the CC we have
but I am sure there are still bugs in it, it is quite the complex function. however, without minimizing the important of FinalizeCCtx, it is less important than the validation code. and validation code isnt creating tx
it just validates them
so to make a CC, you design it properly. then have rpc calls to create and sign the transactions and then validate them
mylo5ha5
yep, i meant to ask, "i can trust the FinalizeCCTx" because i would have made mistakes before then with creating mtx.   the FinalizeCCTx is used already a lot.

as long as there are funds.  that would be the main failure i guess....which is not a code error (imo)
jl777
so the overhead of making a new CC is quite small
J
look at makecustom
gcc -O3 -DBUILD_CUSTOMCC -std=c++11 -I../secp256k1/include -I../univalue/include -I../cryptoconditions/include -I../cryptoconditions/src -I../cryptoconditions/src/asn -I.. -I. -fPIC -shared -c -o customcc.so cclib.cpp
cp customcc.so ../libcc.so
cd ..
make
cd cc
mylo5ha5
looking at it.

jl777
any mysteries here?
J
it compiles cclib.cpp with -DBUILD_CUSTOMCC and puts it in customcc.so
then copies over the libcc.so in the ~/komodo/src dir and rebuilds komodod and comes back to the cc dir
mylo5ha5
-I = include and use all those src files for compiling -o outputfiename and compile customlib.cpp

jl777
there is only one file that is being compiled
J
those -I are just directories to search include files for
mylo5ha5
yes that's what i mean sorry

jl777
customcc.so is built just by compiling a single file: cclib.cpp
J
mylo5ha5
yes.

include is the jargon i should have used
jl777
so that cant be too complex to understand
J
now all that is left is the customcc.h
std::string MYCCLIBNAME = (char *)"customcc";

#define EVAL_CUSTOM (EVAL_FAUCET2+1)
#define CUSTOM_TXFEE 10000

#define MYCCNAME "custom"

#define RPC_FUNCS    <br />
{ (char *)MYCCNAME, (char *)"func0", (char *)"<parameter help>", 1, 1, '0', EVAL_CUSTOM }, <br />
{ (char *)MYCCNAME, (char *)"func1", (char *)"<no args>", 0, 0, '1', EVAL_CUSTOM },

bool custom_validate(struct CCcontract_info *cp,int32_t height,Eval *eval,const CTransaction tx);
UniValue custom_func0(uint64_t txfee,struct CCcontract_info *cp,cJSON *params);
UniValue custom_func1(uint64_t txfee,struct CCcontract_info *cp,cJSON *params);

#define CUSTOM_DISPATCH <br />
if ( cp->evalcode == EVAL_CUSTOM ) <br />
{ <br />
if ( strcmp(method,"func0") == 0 ) <br />
return(custom_func0(txfee,cp,params)); <br />
else if ( strcmp(method,"func1") == 0 ) <br />
return(custom_func1(txfee,cp,params)); <br />
else <br />
{ <br />
result.push_back(Pair("result","error")); <br />
result.push_back(Pair("error","invalid customcc method")); <br />
result.push_back(Pair("method",method)); <br />
return(result); <br />
} <br />
}
first line is the -ac_cclib name: std::string MYCCLIBNAME = (char *)"customcc";
then we have the methods definitions:
#define MYCCNAME "custom"

#define RPC_FUNCS    <br />
{ (char *)MYCCNAME, (char *)"func0", (char *)"<parameter help>", 1, 1, '0', EVAL_CUSTOM }, <br />
{ (char *)MYCCNAME, (char *)"func1", (char *)"<no args>", 0, 0, '1', EVAL_CUSTOM },
func0 and func1
the declarations for the functions in customcc.cpp
bool custom_validate(struct CCcontract_info *cp,int32_t height,Eval *eval,const CTransaction tx);
UniValue custom_func0(uint64_t txfee,struct CCcontract_info *cp,cJSON *params);
UniValue custom_func1(uint64_t txfee,struct CCcontract_info *cp,cJSON *params);
notice the func0 is matched up to what is in the RPC_FUNCS
so you add them to the RPC_FUNCS, declare them and finally:
#define CUSTOM_DISPATCH <br />
if ( cp->evalcode == EVAL_CUSTOM ) <br />
{ <br />
if ( strcmp(method,"func0") == 0 ) <br />
return(custom_func0(txfee,cp,params)); <br />
else if ( strcmp(method,"func1") == 0 ) <br />
return(custom_func1(txfee,cp,params)); <br />
this again is looking for func0 to call custom_func0 and func1 to call custom_func1
of course just replace any method name for "func0" in all places and code that rpc function and it will appear in cclibinfo call
the RPC_FUNCS is what cclibinfo rpc call uses
the CUSTOM_DISPATCH is called when the EVAL_CUSTOM evalcode is seen
mylo5ha5
OK what does this mean

    { (char *)MYCCNAME, (char *)"func0", (char *)"<parameter help>", 1, 1, '0', EVAL_CUSTOM }, \
    { (char *)MYCCNAME, (char *)"func1", (char *)"<no args>", 0, 0, '1', EVAL_CUSTOM },

jl777
MYCCNAME is just set to "custom"
J
method name is func0
<parameter help> is the help displayed for func0
1 and 1 means 1 mandatory parameter, max of 1 parameter
'0' is the funcid (if it actually made an opret)
01:48
EVAL_CUSTOM is the evalcode

mylo5ha5
(char *)"<parameter help>" i just replace <parameter help> with helpful text, in this position?

jl777
yes
J
do a cclibinfo call
it just basically displays that table
mylo5ha5
(char *)"<no args>", 0, 0, '1', EVAL_CUSTOM
0, 0, '1'

0 mandatory parameters, max of 0.
funcid 1.


ah ok, helpful text is really helpful this time!
1 - send 1KMD to CC address, and locked until blockheight ends in 00
2 - send 0.01KMD to CC address, if blockheight does not end in 00, it is deposited into CC address
3 - send 0.01KMD to CC address, if blockheight ends in 00, release all funds to hardcoded address.
In step 1.

I've compiled my libcc.so and restarted KMD. Does my -pubkey automatically create the CC address when it's needed to deposit?

komodo-cli -ac_name=MYLO myloinfo

and it will have the myloCC address displayed?

i guess i will look at diceinfo to make a myloinfo
jl777
before you start, you need to understand the design flaw in customcc
J
i must have done this as this will be a very common mistake to make
mylo5ha5
ok cool, yes plz

jl777
plz describe what customcc does in its entirety
J
mylo5ha5
func0 RPC responds with "just an example ...." message

func1 RPC creates mutable tx (mutable because we are still constructing it)
COIN is null?
jl777
no, COIN 100000000. also it is a design problem not implementation
J
dig a bit deeper into the tx created vs tx validated
as in would the tx created by func1 pass validation by the custom_validation
mylo5ha5
if there's change there'll be 3 vouts

jl777
yes there is that!
J
but it is more fundamental
i have stated this number of time, but until you start debugging and things dont work you dont feel the importance
CC validation cannot be triggered by a CC vout!
well it could, but the utxo system validates vins when they are spent and there is only minimal checks on vouts
this is how you can send to any address, any p2sh script, etc. any CC vout
it is totally legal
so the design problem is that func1 functions wont ever even be validated!
and even if func1 is fixed so it spends a CC vin, the validation is "upside down", while it is possible and very common to check vout values, it likely wanted to check the vins
and maybe it doesnt care about the vout values at all, but again this is a design issue as the customcc.cpp was "designed" to send exactly 1.00000000 COIN to the CC vout of the pubkey
it is artificial to show the mechanics. to "fix" it, you would add any CC vin that has EVAL_CUSTOM eval code to trigger the validation. then it will make sure that you are sending exactly 1 COIN to the pk CC address, but any change would mess it up, so it needs to allow for normal change in vout[2] also
validation will do exactly what you code it to do and not necessarily what you want it to do
so fixing it to handle change and adding a CC vin and we end up with 1 COIN having to be spent to a pubkey, so maybe we need to allow more than just change, else the 1 COIN just goes around in a circle
instructive mistake, at least I think it is
so depending on what the customcc design becomes, that will determine how to properly validate it. will it require spending vins that are exactly 1 coin? will it require 1 coin sent to a pk and then allow anything else, it is very freeform as to what you can make it allow/disallow
mylo5ha5
ok a little lost with func1 functions wont ever even be validated

because we don't validate any vins?
jl777
what inputs do the tx that func1 use?
J
func1 creates
mylo5ha5
64 utxos maximum

jl777
of what type of utxo?
J
hint: AddNormalinputs(mtx,mypk,COIN+txfee,64)
what type of inputs do you think mtx will have?
normal inputs or CC inputs?
mylo5ha5
hmmm...my gut all teh time was normal.
but now i'm not so sure.  give me a moment.

jl777
yes, AddNormalinputs adds normal inputs!
J
which are not CC inputs
so such at tx wont trigger any validation
only when you try to spend the tx would it try to validate and the validation was oriented to the funding tx, not the spending of it
without the CC vin there is no validation triggred at all
so the problem is not at the coding level, but at the design of the CC level
you need to make sure the validation is triggered and that you are validating the right thing
this is why weekend coders should not even try this and that utxo needs to be fully understood
mylo5ha5
ok so we validate tx.vin that it is spendable?

yeah validation is key.    how does custom_validate get called?   is it called somehow by MYCCNAME_validate
jl777
the validate code does whatever the validate code does
J
when you validate a block, validate transaction is called
when you validate a transaction, it validates vins and not vouts
mylo5ha5
ok, and if there's a CCvout of this eval type, this is the validation code called.

jl777
if the vin is spending a CC vout with OP_CHECKCRYPTOCONDITIONS, then it calls the CC code that calls CClib validation code that ends up calling the custom_validate function
J
without an OP_CHECKCRYPTOCONDITIONS with the EVAL_CUSTOM evalcode being spent, the vin validation is not called at all
02:34
with CC I spend more time thinking about the design than the coding of it. coding it is usually pretty fast

mylo5ha5
ok, so we're spending a normal input, and we are checking IsCClibvout, but it's not even a CCvin to validate spending

jl777
exactly
J
so it never even gets triggered.
my only excuse was that I was going to write up a doc on how to write a custom CC and realized things were scattered and it would be faster to just make a simple example CC, so i did that and didnt spend any time thinking about the CC itself
the mechanics are relatively easy
the design is tricky, but not impossible, just need to map out each tx that is created and make sure the validation is done based on the tx that is created
i do the validation last as often the tx creation changes (a lot) during the early days
once the tx creation is stable, then I write the strict validation. so initially the validation can just be return(true)
and all the rpc calls will work, it will just be possible for someone making raw tx to bypass the validation that doesnt exist
but during development that is not really an issue
mylo5ha5
so....when designing a CC, you build the transaction and imagine it's sent.   the validation....yeah ok...interesting

jl777
like with rogue at first there was no validation at all
J
then I added warnings if the gameplay validation had errors, but allowed
then i made it a bit more strict, but still allowed some deviations
mylo5ha5
how did you warn?   print to log? or stdout?

jl777
then I just today, locked it down so that the playerdata is required to be 100% valid, though i allow claiming less gold than you earned
J
i still havent validated the non-playerdata rpc calls as that is just a matter of doing it and not on the bleeding edge of possible or not
by starting with the most lenient and gradually making it stricter, you can usually do many updates which otherwise would be hardforks, without requiring all nodes to update
this is because the older nodes are more tolerant, so only the newest nodes would reject new tx. only the mining nodes must update with a new validation
just some practical development cycle things. of course you can go all unit test crazy and make sure everything is properly created and tested before deploying the first node
just a matter of style
mylo5ha5
i've never been a unit testy developer...

jl777
ok, i think you are understanding things pretty good for this now. i dont think it will be possible to document how to design a CC
J
just the rules of validation and lots of examples
study the examples closest to what you want to do and make a custom design
mylo5ha5
cclib seems to have made it much easier to absorb, looking at 3 files, 1 header, 1 makefile and then the cpp part.

One of the biggest hurdles is variable names and helper functions.

jl777
and now with customcc it is reduced to the bare minimum
J
with the great power of CC, comes great flexibility and that means no constraints on what you can create
a tx constraints system is how it is implemented
mylo5ha5
mtx, mypk...the order of vins/vouts in a tx.

jl777
but you can access any blockchain info
J
including contents of opreturn from oracles, which is any data
so the CC can use any data and custom code to determine if a tx is valid or not
mylo5ha5
With AddNormalInputs(mtx,mypk,amount,XX) you chose 64 for the example for max utxos to use. is this just arbitrary? or is too little unrealistic?

jl777
64 is the max vins to use
J
mylo5ha5
When creating a mtx with CreateNewContextualCMutableTransaction(), why `Params().GetConsensus(), komodo_nextheight())?

jl777
that way it creates the proper tx type of sapling or no sapling
J
mylo5ha5
cool

UniValue result(UniValue::VOBJ)   <---- what is this?
jl777
for most all the things you can think to do, one (or more) of the existing CC likely already does it. so it is matter of finding the code doing what you want to do
J
that is how to declare a JSON object
using the UniValue
mylo5ha5
yeah exactly.  the existing CCs do heap, it's the function names (and parameter order) and variable names to get used to.  but mypk, mtx tx.vout[x] seem to have stuck.

ok
jl777
we cant give a tutorial about all the bitcoin internal functions that can be used, especially if all the komodo functions are included, that would take too long
J
maybe the most common CC utility functions in CCutils and CCtx can be documented as they are quite useful
mylo5ha5
of course, that is due diligence on the developers part to dyor (do your own research)

jl777
i tried to name most functions so that reading the function name you get a pretty good idea of what it does
J
and most are quite simple functions anyway
mylo5ha5
it does come down to validation as you've preached, but also fundamentally understanding what a pubkey is, a tx composition (to some extent) and understanding the transactional nature of it.

i'll ask any relevant questions in #cc-general for CCutils and CCtx documentation.   Faucet re-reading and some fiddling with stuff will open the pandoras box of quetions.  i'm sure the other devs might be able to chip in with answers, or should i direct them all to you james?

siddhartha_crypto
we cant give a tutorial about all the bitcoin internal functions that can be used, especially if all the komodo functions are included, that would take too long. maybe the most common CC utility functions in CCutils and CCtx can be documented as they are quite useful

I agree, but I am glad you said this.

I can link or refer to specific chapters in Mastering Bitcoin to clarify that there are multiple additional tools for experimentation.

S
jl777
cc-general is a good place to ask
J
mylo5ha5
ok

thanks for the masterclass
siddhartha_crypto
Thanks very much for your time, JL.
S
jl777
hopefully this conversation will help bring others up to speed also, directly or indirectly from the docs
J
siddhartha_crypto
I hope so as well.

I will work to bring together the framework of the documentation as soon as I can.

I am also trying to get your existing CC modules documented, and techy tech docs -- those that have lots of specific instructions -- don't happen as quickly as a blog post.

We should have everything, including CC tutorial stuff discussed today, done within a few weeks. Won't know for sure until it's done, but I would expect it to go live somewhere in late March or early April.

Thank you again.
S
jl777
glad to help
J
mylo5ha5
yes thanks again.  i don't know the right word to use yet, but plenty of thoughts of gratitude as i unlock more a-ha moments.

JSjl777
03:10
the true power of CC is very hard to realize, even for a coder. even for me, at first I didnt think CC was anywhere near as powerful as I do now
