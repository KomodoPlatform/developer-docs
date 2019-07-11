# AtomicDEX and Atomic Swaps

## Introduction

Komodo’s decentralized exchange, AtomicDEX, allows people to trade cryptocurrency coins without a counterparty risk. The protocol is open source and trading is available for any coin that any developers choose to connect to AtomicDEX.

Our service fully realizes decentralized order matching and trade clearing. The order-matching aspect relies on a peer-to-peer network to build public orderbooks, and trade clearing is executed through an atomic cross-chain protocol, also called an "atomic swap." 

## Current Problems in Cryptocurrency Exchange

#### Centralized Exchanges are Popular, but Limited

The current, most practical method for cryptocurrency exchange requires the use of centralized exchange services. 

These centralized solutions require vouchers to perform the exchange, wherein the user sends their funds into the care of a corporate entity and receives "I Owe You" (IOU) statements in return. The user then trades these IOUs within a controlled environment and, when finished, returns their IOUs to the corporate entity for reimbursement. 

Centralized exchanges carry great risk. Among many dangers present in this system, users are under the constant risk of their assets being stolen either by an inside theft or an outside hack. Furthermore, the operators of centralized exchanges are under intense legal and social pressure, as the operators are responsible both for the safety of thousands of users' funds and for the users' behaviors on their platforms. 

To eliminate such dangers and limitations requires the creation of a decentralized alternative, wherein either the entity holding the funds during the trading process is not centralized, or the users are allowed to trade directly without middleman involvement.

#### The Concept and Shortcomings of a Normal Decentralized Exchange

A decentralized exchange (DEX) allows users to trade funds within an environment that is at least partially decentralized. 

Decentralization of an exchange can take many forms. For example, in 2014 Komodo developers began one of the earliest instances of a decentralized exchange, called "InstantDEX." 

In this DEX, users sent their blockchain coins not to a centralized entity, but rather to a decentralized "gateway." The gateway was owned and controlled by several cooperating entities who were chosen from the online community. The gateway automatically distributed IOUs (called "proxy tokens") to the users, who then traded within the partially decentralized environment.

When finished, users sent their proxy tokens back to the gateway, and the gateway managers collectively signed for the release of the users' blockchain funds. The underlying technology of this solution is still in use by many blockchain platforms, and is sometimes referred to as a proxy-token protocol. 

This form of a DEX is too limited to compete with centralized exchanges. Among many drawbacks, a proxy-token decentralized exchange must still have a storage center to hold the external cryptocurrencies represented by the proxy tokens. At best, this storage center is only distributed across several authority figures, and therefore users must still surrender control over their assets for the duration of the trading process.

As of today, no decentralized exchange has successfully replaced any of their centralized counterparts.

## AtomicDEX — A Complete Solution

We now present a fully functional, new decentralized technology that makes a competitive decentralized exchange possible. We call our technology AtomicDEX, and it allows people to freely and safely exchange cryptocurrency coins from one person to another.

The AtomicDEX decentralized exchange creates a competitive method for bartering cryptocurrencies, combining the key components of order matching and trade clearing.

These components are combined into a single integrated system that allows users to make a request to trade their coins, find a suitable trading partner, and complete the trade using an "atomic swap."

Unlike previous DEXs, AtomicDEX does not require users to send funds to either a centralized or decentralized party during the trading process. Rather, users maintain full control over the private keys of their funds at all times.

## The Decentralized Orderbook

The first component of AtomicDEX is Order Matching. This is the process of pairing a user’s offer to buy with another user’s offer to sell. The data of these offers form an orderbook.

The process of matching orders is not the actual trade itself, but is only a digitally created promise between users stating that they will perform their parts of the trade.

AtomicDEX features several technologies to facilitate order matching, including a peer-to-peer network, a decentralized orderbook, and a multicoin passphrase.

##### Order Matching with Full-Relay and Non-Relay Nodes

To create a decentralized orderbook, AtomicDEX creates a custom peer-to-peer (P2P) network.

In this network, when a node places an order, other nodes on the network collaborate to distribute the data until all nodes are informed. Each node utilizes the data to build the orderbook locally. No centralized server is required.  

To manage this P2P network, AtomicDEX utilizes two separate types of nodes: a full-relay node and a non-relay node.

The difference between a full-relay node and a non-relay node is that the former is typically a high-volume trader who provides liquidity to the network in exchange for being a trading hub on the network. This puts the trader in the position of being able to complete trades more quickly than their competitors.

The latter type of node (non-relay) is the more common user, and these nodes rely on the full-relay nodes. A non-relay node has all the same available trading options. We expect that most nodes joining the network will be non-relay nodes.


There are no requirements or payments necessary to become either type of node, and so anyone desiring to become a high-volume full-relay node will find no restrictions.

##### One Passphrase, Many Addresses

As a part of order matching, AtomicDEX features a specialty wallet that can manage and trade among a multiplicity of different blockchain coins. In this technology, the user creates a single passphrase and uses this to unlock all public addresses associated with their desired coins. 

The complexities of this process are managed by Komodo's Iguana Core technology.

## Atomic Swaps

For trade clearing, AtomicDEX implements our own unique variation of atomic swaps.

An atomic swap is a technology that allows two users to trade cryptocurrencies across two separate blockchains without requiring an intermediary third party.

The original concept of an atomic swap was created in 2013 by Tier Nolan and many other Bitcoin enthusiasts on the Bitcointalk.org chat forum. In 2014, this conversation inspired members of the Komodo development team to experiment with atomic swaps, and they have remained a key technology in our strategy ever since.

#### The Value of the Atomic Swap

To understand why the atomic-swap protocol is necessary, one must first recall that computer code is executed in linear fashion. Even if we were to assume that both parties in a trade may be honest, on a computer the process of taking money from each digital wallet and pulling the money into the open must happen one wallet at a time.

Therefore, one person must release control over their money first. The atomic-swap protocol protects that person from vulnerability. Without the atomic swap, any malicious party involved would be able to destroy the fairness of the trade.

A key aspect of a proper atomic swap is that at each stage of the trade-clearing process, each user has incentives to proceed to the next step in the proper manner and disincentives to avoid abandoning the procedure. With this structure in place, regardless of a failure by either user to complete the protocol, each user receives a proper reward.

#### AtomicDEX Manages a Public Trading Profile for Maker and Taker

In addition to the atomic-swap protocol, AtomicDEX also allows users to track the behavior of trading partners on the network via a Trust API. 

The Trust API is not based on personal identity, but rather on behavior as associated with public addresses.

As a user practices good behavior on the network while maintaining a consistent public address, their network trust can increase, thus improving their odds of a willing trading partner.

Use of the Trust API is optional for all users.

#### Introducing Taker and Maker

There are two parties in an atomic swap: the liquidity provider and the liquidity receiver. We call the provider "Maker" and the receiver "Taker."

##### Taker Makes a Request

The process of an atomic swap begins with the person who makes the initial request.

Taker will need two transactions to perform her swap. One transaction will cover the protocol fee, which is roughly 1/777th the size of the desired order. We call this fee the `<dexfee>`, and its primary purpose is to serve as a disincentive to Taker from spamming the network with rapid requests.

The second transaction required of Taker sends the actual amount she intends to swap. AtomicDEX first verifies that she has these funds, but for the moment she retains these funds in the safety of her own digital wallet.

##### Maker Answers Taker

On the other side of the atomic swap, we have the liquidity provider — Maker. Maker sees the request on the network for Taker’s atomic swap and decides to accept the trade. Now his part of the process begins.

To complete the trade, he must send one transaction. It will be worth 100% of what he and Taker intend to actually trade.

#### Taker and Maker Are Committed

Assuming Taker and Maker are successfully connected, the process from this point forward becomes quite simple:

A summary of the procedure, starting from the beginning.

1. Taker requests a swap and sends the `<dexfee>` transaction data to Maker.

2. Maker receives the `<dexfee>`, verifies it, and sends `<makerpayment>`

    - Maker generates a "secret", creates a hash of the secret, and shares this hash with Taker
    
    - Maker does not send the payment to Taker directly, but rather into a temporary holding address 
        - On [utxo-based](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept) blockchains, this holding address is a P2SH hash/time locked output
        - On ETH/ERC20 based blockchains, this address is an etomic swap smart contract
    
    - `<makerpayment>` enters a state of limbo on the Maker's coin network, held safely by encryption, awaiting either for Taker to spend the payment, or for the swap to time out
        
    - If the latter occurs, `<makerpayment>` is automatically refunded to Maker via the AtomicDEX protocol

3. Taker now sends `<takerpayment>`

    - Taker does not send the payment to Maker directly, but rather into a temporary holding address
        - On [utxo-based](../../../basic-docs/start-here/core-technology-discussions/miscellaneous.html#the-utxo-an-elusive-yet-fundamental-concept) blockchains, this holding address is a P2SH hash/time locked output
        - On ETH/ERC20 based blockchains, this address is an etomic swap smart contract
    
    
    - `<takerpayment>` enters a state of limbo on the Taker's coin network, held safely by encryption, awaiting either for Maker to spend the payment, or for the swap to time out
        
    - If the latter occurs, `<takerpayment>` is automatically refunded to Taker via the AtomicDEX protocol
    
4.  Maker now spends the `<takerpayment>`

    - To spend the payment Maker reveals the secret 

5.  Taker now "spends" the `<makerpayment>`

    - Taker finds that `<takerpayment>` is spent and extracts the secret from the spending transaction. The secret can be used to unlock the `<makerpayment>` and send the coins to Taker's address

While it may seem inefficient to have five transactions for a swap that could be done with two, the complexity of this process provides us with the requisite "trustless-ness" to maintain user safety.

### Incentives and Disincentives to Maintain Good Behavior

As we will now explain, at every step along the way there are incentives for each side to proceed, and there are various financial protections in place should one side fail.

Also, because payments are sent to these "temporary holding addresses" that exist within the AtomicDEX protocol, the protocol itself can assist in the process of moving money at the appropriate steps.

Let us now examine what is happening after each step.

#### 1 - Taker Sends `<dexfee>`

If Maker accepts the offer to trade, but does not send `<makerpayment>`, Taker only stands to lose the `<dexfee>`. This is only 1/777th of the entire transaction amount, so she loses very little.

Maker, on the other hand, stands to lose more. Since Maker did not follow through with his end of the bargain, the AtomicDEX network indicates on his public AtomicDEX trading profile that he failed in a commitment, thus decreasing his profile’s reputation. If Maker continues this behavior as a habit, he may find it difficult to discover trading partners.

So long as the frequency of Makers failing is low, the occasional extra `<dexfee>` paid by a Taker is a minor issue. However, if there is a sudden spike in misbehavior, the AtomicDEX code has in-built contingency plans which can provide refunds to Takers.

#### 2 - Maker Successfully Sends `<makerpayment>`

If Taker does not follow with her next step, the `<takerpayment>`, then Taker loses not only the `<dexfee>`, but she also receives a mark on her public AtomicDEX profile. She gains nothing, and Maker has no reason to fear as `<makerpayment>` will automatically return to him via the AtomicDEX protocol.

#### 3 - Taker Successfully Sends `<takerpayment>`

If Maker does not proceed with his next step (spending the payment), then after lock time expires Taker can simply activate an AtomicDEX protocol that will refund the payment. 

#### 4 - Maker Spends `<takerpayment>`

If Taker does not follow by also "spending" the `<makerpayment>`, it is of no concern to Maker because he has already received his funds. If Taker is simply sleeping and forgets to spend the `<makerpayment>`, she can only hurt herself.

Naturally, for Taker this is slightly dangerous. Taker’s best course of action is to remain alert and spend the `<makerpayment>` once the `<takerpayment>` is spent and the secret is revealed.

#### 5 - Taker Spends `<makerpayment>`

The process is complete. Taker received the `<makerpayment>`. Maker received the `<takerpayment>`. The entire process only cost Taker the original `<dexfee>`.


At each step along the way, the side that needs to take the next step is motivated to do so, with greater and greater urgency until the process is complete.

## Additional Details

#### Always Manage Risk Appropriately

Naturally, users must understand that outside forces can disable the process and thereby damage one of the users. For instance, an Internet outage for Taker could be particularly dangerous. Therefore, users are advised only to trade manageable sums that they are willing to put at risk, and only with nodes that have reliable reputations.

#### The Connection is the True Challenge of an Atomic Swap

Performing a successful connection between Maker and Taker, and verifying their funds, is the most complex and difficult aspect of creating the AtomicDEX network.

Myriad factors are involved in a successful attempt for Maker and Taker to connect: human motivation; the experience level of the users; economics; connection technology; user hardware setups; normal variations within Internet connections; etc.

We emphasize to users here that the process of performing these actions over a peer-to-peer network has almost an artistic element to it. An attempt to successfully connect Maker and Taker can be thought of more like fishing, where we must simply cast and recast our line until we successfully connect with our target.

If a user attempts a trade and no response returns from the network, the user should slightly adjust the parameters of their offer and try again. As AtomicDEX continues to iterate and improve, and as the number of users increases, we expect any required effort to lessen for users, the network, and the AtomicDEX GUI apps.

#### The DEX Fee

People will notice that there is a small `<dexfee>` required as part of the AtomicDEX protocol. This is 1/777 of the transaction amount and it is calibrated to make spam attacks impractical. The 1/777 fee is about equal to 0.1287% of the `<takerpayment>`.

By forcing a would-be attacker to spend real money, attacking the network becomes costly. Without this spam prevention, the AtomicDEX could otherwise be attacked at the protocol level by any person performing a plethora of trade requests.

It is possible that some atomic swaps can initiate, and then fail to complete, which raises questions about what happens to the `<dexfee>` in this scenario. The `<dexfee>` is the first charge in the protocol; in this sense, there is a `<dexfee>` charged for these failed atomic swaps.

However, this failure should not be looked upon in isolation. The AtomicDEX protocol is based on statistics. Statistically speaking, there will be some percentage of atomic swaps that start and will not complete. 

Let us suppose a 15% failure rate at this stage of the atomic swap (15% is three times higher than the rate of failure we currently observe in our testing). Even in this scenario, the effective `<dexfee>` cost is still only 0.15% to all Taker-side requests across the entire network.

If you experience the loss of a `<dexfee>` transaction for an atomic swap that fails to complete, know that this is all part of the statistical process. If you find yourself paying more than 0.15% of your completed trades in fees, please let us know.

As an organization, when speaking generally to our audience online, we state that the `<dexfee>` is just 0.15%. In this manner, we hope to create the expectation that 0.15% is normal; if the network performs perfectly, on the other hand, users will get a blessing in the form of a lower fee, 0.1287%.

#### Dealing with Confirmations

Since AtomicDEX is trading permanently on blockchains — as opposed to updating an internal database of vouchers — both sides of the trading pair need to wait and watch as miners on the respective blockchains calculate transaction confirmations.

Because the payments that occur on one blockchain will proceed regardless of the actions on the other blockchain — a confirmation failure on one chain will not stop with the other blockchain performing its duties as normal — it is therefore important that the AtomicDEX protocol observe and adjust as necessary. 

#### AtomicDEX is Entirely Experimental, and Should Be Treated As Such

We should warn our readers, nevertheless. Every element of the Komodo ecosystem is still considered to be highly experimental. We provide no investment advice, nor any guarantees of any funds utilized on our network. Use our products only at your own risk.

#### The AtomicDEX API

We created an API model that is generally the same for all coins. 

For more information, [please turn to the AtomicDEX documentation.](../../../basic-docs/atomicdex/introduction-to-atomicdex.html)

