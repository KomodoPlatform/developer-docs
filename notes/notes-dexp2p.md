----help

DEX_broadcast hex [priority [tagA [tagB [destpub33 [volA [volB]]]]]]
DEX_list stopat minpriority tagA tagB destpub33 [minA maxA minB maxB]
DEX_stats ?

---

https://discordapp.com/channels/412898016371015680/455851625915875338/663074841779240970

[11:12 PM]jl777c:i added a handy tx/sec printout
[11:12 PM]jl777c:the epochs are every 5 minutes and it maps each peer it sees to a unique bit position
[11:13 PM]jl777c:max of 1024 peers per epoch
[11:13 PM]jl777c:this is to mitigate sybil attack, though still a determined attacker can fill up a lot of peer spots, so it isnt perfect, but it at least allows new peer sets every 5 minutes and allows for future attack mitigations
[11:14 PM]jl777c:most of what i added was actually parsing the hex string for the broadcast, but to make it more useful added tagA, tagB and destpubkey, which allows the future implementations of lookups instant
[11:14 PM]jl777c:still havent debugged that yet
[11:15 PM]jl777c:also added the concept of a priority for a tx, so the more important it is, the longer it takes to create
[11:16 PM]jl777c:with the priority, then nodes can prioritize which ones to route, which ones to ping about and combined with local "subscriptions" to tags, will allow for much better packet traffic control
[11:17 PM]jl777c:getting all this fully implemented and debugged will take more than 5 more days though. one step at a time, i need to fix a traffic congestion problem and then onto debugging the tags

c:it isnt a lossless protocol, but if a reliability layer is added on top of it, maybe it can. also there isnt a large amount of privacy with the dexp2p, so it would need to be carefully analyzed to see if point to point encryption will be sufficient
[4:31 PM]jl777c:i made a new release, it is hardforking
[4:35 PM]jl777c:now any chain with -dexp2p=2 (or 1) will activate the decentralized DEX p2p messages
txpow is active at a minimal level, tx/sec of blasters will likely be reduced by 10x to 50x
packet priority is supported. each priority level doubles the txpow needed, dont go much above 16 and for now priority is not affecting routing, so can just set it to 0
3 indices in parallel are maintained in realtime for all packets with tags (or destpubkey)
DEX_broadcast now will actually broadcast the hex specified and takes a lot more parameters
DEX_list is able to get a list of all the packets with matching tags
plz dont abuse the messaging side yet, it is not hardened and limited to just 64 different tags for now. also, it will likely crash after an hour if you are making DEX_list requests that needs to get a packet being purged
[4:36 PM]jl777c:destpubkey encryption and min/max amount filtering in DEX_list is not implemented yet, nor is minpriority filtering. DEX_stats and DEX_get is not implemented yet
[4:37 PM]jl777c:however, enough should be work to be able to broadcast a specific message with a specific tag and then see it in a list
[4:39 PM]jl777c:for example if tagA is KMD and tagB is BTC, then the packet will be in the indices for "KMD", "BTC" and "KMD/BTC". that will allow future DEX_list for BTC to find this along with any other that had BTC as tagA or tagB. if you DEX_list with both KMD and BTC, only the ones that match the order will be returned. so to get an orderbook, you can do a DEX_list KMD BTC and a DEX_list BTC KMD and construct it. however, i plan to add convenient orderbook functions as each packet also has volumeA and volumeB fields that can be used to calculate a price
[4:40 PM]jl777c:i was just able to get this to work in a few cases and havent had a chance to find and fix all bugs, but too tired now and will wait for bug reports based on the above functionality
[4:44 PM]looye29:Can orrderbook be filled by multiple targets? E.g. Alice has 1000 KMD and Bob can only fill 500 KMD can Stanley take the other 500 KMD?
[4:46 PM]looye29:Now in explaining of Atomic DEX it talks only about Alice and Bob swap.
[4:55 PM]jl777c:pretty sure that is already implemented
[4:56 PM]jl777c:dexp2p is for a decentralized and fast way to get orders to all nodes, it does not deal with using that data, that is up to the app
[4:57 PM]jl777c:with the messaging layer it should make it quite easy to write dapps that want to deal with any sort of messaging that fits into the tagA/tagB, destpubkey, volumeA volumeB framework

9:15 PM]jl777c:daemon is designed to not overload
[9:15 PM]jl777c:well, if you start blasting 4MB packets, it would make nodes run out of memory
[9:16 PM]jl777c:but based on tx count, it will drop packets, to avoid overload

9:28 PM]jl777c:if any node is blasting, all nodes will see 99.999% the same packets
[9:28 PM]jl777c:and have mem use about the same
9:32 PM]jl777c:if you blast at a higher rate than the network can handle, PACKETS WILL BE DROPPED

9:32 PM]jl777c:and sync will be lost
[9:32 PM]jl777c:if you are below the critical rate, then i am seeing very very few packets out of sync
[9:32 PM]jl777c:on the order of 1 in a millon
[9:33 PM]jl777c:you can check the summary hashes for the totals to see if it is in sync or not (when there are no new packets coming in)
[9:34 PM]jl777c:with the messaging level, it should be possible to packetize files, blast it and then reconstruct it and see if they are the same

1:47 PM]jl777c:@TonyL @SHossain updated to a new hardforking version. this one is close to feature complete at the messaging layer. untagged packets (like from broadcast ffff) will get a general tag. i tested filtering by priority, and basic tracking based on tags, but there should be some bugs to find in complex cases. i didnt test the min/max amount filters, so that is a good one to test.

keep in mind that i expect things can crash after an hour, i need to add protection against that, so if it crashes after an hour, then just restart for now. i will work on that after i increase the 64 tags total limit.

please ask questions, the DEX_broadcast and DEX_list have quite a few parameters
[1:49 PM]jl777c:also destpubkey encryption is not implemented yet

1:51 PM]jl777c:my tests show that as long as you dont exceed the p2p network capacity (determined by the network topology and speed of nodes), then only about 1 in a million packets are out of sync
[1:51 PM]jl777c:with low end nodes, we saw the limit at about 3000/sec
[1:52 PM]jl777c:with higher end nodes, around 10000/sec
[1:52 PM]jl777c:txpow is active now at a minimal level and it would take a lot of cores to reach 10,000/sec
[1:53 PM]jl777c:i dont have priority based routing implemented yet, but the idea is that if the network is under spam attack, the nodes could detect this and increase the priority level they broadcast at. so without changing "consensus" limits, each client can increase the priority level until it sees all its packets arriving in the peer nodes
[1:54 PM]jl777c:the one hour limit is a bit arbitrary and can be increased, but it doesnt seem like too much overhead for a GTC order to have to broadcast once per hour
[1:55 PM]jl777c:i imagine realtime games designed for UDP could work without too much changes to use -dexp2p mode

2:14 PM]TonyL:~/komodo/src/komodod -ac_name=DEXRDO -ac_supply=999999 -addnode=37.9.62.186 -addnode=94.130.224.11 & is this AC from pinned message actual one?
[2:19 PM]jl777c:you can use any chain now, but needs a -dexp2p=2 added to it, using my DEX branch
[2:20 PM]jl777c:there is no blockchain, nothing to sync
[2:20 PM]jl777c:though you can have normal blocks too, they dont affect the dexp2p and dexp2p doesnt affect blocks

[2:21 PM]jl777c:yes, it just uses the bitcoin peering to establish peers and send/recv messages
[2:21 PM]jl777c:a custom DEX message is supported with -dexp2p set
[2:22 PM]jl777c:everything is in RAM, if you exceed RAM, well bad things will happen
[2:22 PM]jl777c:100% sync is not guaranteed, though unless you overload the network, you will get 99.999%+ in sync

2:22 PM]jl777c:only nodes that add -dexp2p will enable it
2:23 PM]jl777c:you can have a subset of nodes with -dexp2p
[2:23 PM]jl777c:and only they will be doing messages. though i do need to add a nServices bit for this to prevent sending to a node that doesnt support dexp2p, would just be a waste of bandwidth
[2:27 PM]SHossain:
./komodod -ac_name=DEXP2P -dexp2p=2 -ac_supply=999999 -addnode=37.9.62.186 -addnode=94.130.224.11 &

2:35 PM]jl777c:@TonyL yes, for ffff it is a special packet for blasters
[2:35 PM]SHossain:seems they are in sync
[2:35 PM]jl777c:it will send out 10 packets
[2:35 PM]jl777c:the printout you see is the tag creation of "general"
[2:36 PM]jl777c:it you send a normal packet with tagA of "general" before the ffff packet, it should be totally silent
[2:36 PM]jl777c:packets that are not ffff can be "an ascii string inside quotes" or a hexstring
[2:36 PM]jl777c:make sure to understand all fields of DEX_broadcast and DEX_list
[2:36 PM]jl777c:ask if any doubts

2:39 PM]jl777c:i just updated (untested yet) using nServices bits to let other nodes know if dexp2p is supported, also made it so komodod -nSPV=1 nodes (superlite) will be able to do dexp2p messages. there are no nSPV remote access commands for dexp2p data (yet), but the plan is to add that and nodes with dexp2p=2 will be the fullnodes that respond to such requests, with dexp2p=1 nodes not responding
[2:40 PM]jl777c:@gcharang i think it is ready to start documenting -dexp2p mode
[2:41 PM]jl777c:for now it is just in my DEX branch, at some point it will be possible to make it compatible with normal branches (ie. not allocate a bunch of static data)

2:53 PM]jl777c:i confirmed that the latest node wont send messages to nodes without the dexp2p bit in nServices
[2:53 PM]jl777c:this is in effect a hardforking change from a few minutes ago
[2:54 PM]jl777c:but now, we should be able to have dexp2p nodes on the same network as normal nodes and they wont interfere with each other

[2:55 PM]jl777c:also please try nSPV=1 nodes to make sure in superlite mode it works. i think that would be the preferable way as dexp2p nodes should be very lightweight

3:05 PM]jl777c:@TonyL @gcharang while dexp2p is designed specifically for DEX orderbooks it is done in a general way so that many other usecases are directly supported. tagA and tagB would be "base" and "rel" (or maker and taker) orders, which can also have a volA and volB field. this will allow the dexp2p to create an orderbook with volumes and price of tagA/tagB

3:07 PM]jl777c: destpubkey is so you can send a DM to a specific address and even though it will be broadcast to all nodes, the data will be encrypted. with network analysis, the sender can be identified (the node who first broadcasts it) and the destpubkey is in plaintext, so the fact that a specific ip address is sending encrypted traffic to a specific pubkey can be determined. though, similar to GRIN it would take having a lot of monitoring nodes nearly fully connected to all the network to find the ip address, so it isnt anything that is easy to do, but then again not too difficult
[3:08 PM]jl777c:if privacy of the sending ip is needed, do not use this for such comms
3:08 PM]TonyL:wow, so pubkey is for OTC inside the DEX network

3:08 PM]jl777c:in most cases other people knowing that an ip address (even if identified as you) is known to be sending messages to a brand new and never used anywhere else pubkey, it seems that is very little info leaked
[3:09 PM]jl777c:you can implement a discord type of channel based public comms with DM using this, and by discord type, i mean tagA == name of discord, tagB == channel
[3:11 PM]jl777c:so you can be connected to multiple dexp2p-discords, each with their own set of channels and send DM to specific pubkeys. you can publish your pubkey and even with monitoring of all traffic, it shouldnt leak that you send a DM, but of course if you link yourself to a pubkey, anything sent to you will be known you got messages, so to keep privacy, have 2 pubkeys. one that is public and linked to your handle, another (one for each other person) that is known only to you and the other person. this is exchanges in the public DM.
[3:12 PM]jl777c:this way, you can get a persons secret pubkey and DM to that and nobody would know who the destination is. but as you can see, using this system for private comms will take a bit of extra work
[3:12 PM]jl777c:it is designed for speed above all else and will drop sync to maintain speed of following the realtime messages

[3:13 PM]TonyL:why broadcasting node might set not max priority ?
[3:13 PM]jl777c:each priority level increase, doubles the time to calculate the txPoW
[3:13 PM]jl777c:priority of 10 is 1024 times harder to find that priority 0
[3:14 PM]TonyL:so if I want more "prioritized" orders I need better server?
[3:14 PM]jl777c:and currently priority 0 is equivalent to an internal priority level of 12
[3:14 PM]jl777c:bigger is better
[3:14 PM]jl777c:but unless the network is overloaded, all messages get through, other than the background loss of 1 in a million
[3:14 PM]TonyL:is time for txPoW is const and not depends of my CPU freq?
[3:15 PM]jl777c:it is SHA256 hash with enough 0 bits
[3:15 PM]jl777c:actually it starts with the lowest bits matching 0x777
[3:15 PM]jl777c:then additional 0 bits on top
[3:15 PM]jl777c:12 bits for 0x777 seems to take a few milliseconds
[3:16 PM]TonyL:I see, so hardware matters just a little bit
[3:16 PM]jl777c:it wont be noticeable even on a slow system
[3:16 PM]jl777c:at a priority of 5, i think it will take about 1 second

[3:17 PM]TonyL:DEX_list stopat minpriority tagA tagB destpub33 [minA maxA minB maxB] last param I wanted to clarify:
is stopat in DEX_list a unix timestamp?
[3:17 PM]jl777c:the idea is that if you dont see your orders appear in the orderbook (from a remote nSPV request) and there are indications that the network is lagging, then boost the priority. that will then give preference to your packets. [this routing preference is not implemented yet]

--
3:17 PM]jl777c:plz do a non-ffff broadcast
[3:17 PM]jl777c:post the JSON that comes back
[3:18 PM]TonyL:
./komodo-cli -ac_name=DEXP2P DEX_broadcast f
{
"timestamp": 1578304073,
"id": 2602463584,
"payload": "",
"hex": 1,
"amountA": 0,
"amountB": 0,
"priority": 0,
"tagA": "general",
"tagB": "",
"destpub": ""
}
[3:18 PM]TonyL:let me try with tags and etc now
[3:18 PM]jl777c:now do a DEX_list 0 0
[3:18 PM]jl777c:and DEX_list 2602463584 0
[3:19 PM]TonyL:
./komodo-cli -ac_name=DEXP2P DEX_list 0 0
{
"tagA": "",
"tagB": "",
"destpub": "",
"n": -1906686050
}
[3:19 PM]TonyL:
./komodo-cli -ac_name=DEXP2P DEX_list 2602463584 0
{
"tagA": "",
"tagB": "",
"destpub": "",
"n": -1906686050
}
[3:19 PM]jl777c:a bug!
[3:19 PM]TonyL:what is n ?
[3:20 PM]jl777c:add general to the DEX_list
[3:20 PM]jl777c:will fix those bugs
[3:21 PM]TonyL:add general to the DEX_list

like that? :slight_smile:
./komodo-cli -ac_name=DEXP2P DEX_list general
{
"tagA": "",
"tagB": "",
"destpub": "",
"n": -1906686050
}
[3:22 PM]jl777c:add, not replace
[3:22 PM]jl777c:DEX_list 0 0 general
3:23 PM]TonyL:DEX_list 0 0 general after ~20 seconds of waiting:
./komodo-cli -ac_name=DEXP2P DEX_list 0 0 general
error: couldn't parse reply from server
[3:23 PM]TonyL:
./komodo-cli -ac_name=DEXP2P DEX_list 2602463584 0 general
reached stopat id
{
"matches": [
],
"tagA": "general",
"tagB": "",
"destpub": "",
"n": 0
}
[3:25 PM]jl777c:update to latest

---

3:25 PM]jl777c:the stopat is the id
[3:26 PM]jl777c:the rest of parameters should be self-explanatory
[3:26 PM]jl777c:keep in mind the messaging layer was started only a couple days ago so is certain to have bugs
[3:27 PM]jl777c:the low level blasting seems to be reasonably solid, other than issues after an hour due to no mutex
3:41 PM]jl777c:hex is a flag whether it is in hex or not
3:44 PM]jl777c:will add a check to make sure hex strings are even in length

"DEX_list 0 0 general"

3:44 PM]TonyL:but can't get by ID it seems
[3:44 PM]jl777c:stopat will stopat that id
[3:45 PM]jl777c:the idea is you do a DEX_list query with the id from the prior time
[3:45 PM]jl777c:then it will return each packet just one time
[3:45 PM]jl777c:so you can have a regular polling loop where you pass in the first id from the JSON from the last time (0 on the first time)
[3:46 PM]jl777c:it should then return only the new packets (within the search parameters)
[3:47 PM]TonyL:Ah, I see. For convenient caching

[3:47 PM]jl777c:yes. this allows to make a layer on top of the messaging layer to apply whatever it needs to all incoming packets, and not have to fiddle with figuring out which packets are new
[3:48 PM]jl777c:all coming at basically no overhead
[3:48 PM]jl777c:if i disable the txpow, we should be able to get back to the 3000 to 10000/sec performance, even while doing all the messaging layer processing
[3:50 PM]jl777c:once we get to feature complete, we will need to disable txpow to make sure we can still handle things at speed. this gives us the confidence that whatever number of nodes we had keeping up with the blasting, we can handle literally 4096 times the real world nodes. or even 128k times depending on where we set the min priority
[3:58 PM]jl777c:basically whatever sustainable throughput we can get with a 1000 node p2p network without the txpow, we can get 4 million to 100 million nodes when txpow is active
[4:07 PM]jl777c:@TonyL pushed a version that handles broadcast f, it will treat any odd length "hex" as an ascii
also put a limit to the packetsize at 1MB
and the priority level is automatically reduced by the size of the packet. anything less than 1kb is no change. after that, each time the packetsize doubles, the priority is reduced by 1. this will make generating valid packets for larger packets more and more expensive as not only is the diff increasing by the packetsize, the amount of data you need to hash is increasing too. for small sizes it wont matter, but for nodes trying to spam... they will bog down very fast

7:16 PM]gcharang:@jl777c can I call this data stored by a node in RAM as "data mempool" ?
is there a limit to the size of the "data mempool"?
when is a packet dropped from RAM of a node?
is it based on 1) time limit ? 2) size of total "data mempool"?
[7:17 PM]jl777c:after one hour data is deleted
[7:17 PM]jl777c:size is limited by memory of the nodes
[7:18 PM]jl777c:i will need to add protection from data flooding that exceeds a nodes ram that is available, but with the txPoW being packet size dependent, it will take a fair amount of hashing to be able to conduct an attack. and i will make it so if memory is low, it just ignores new packets

[10:22 PM]jl777c:@TonyL @gcharang automatic encryption and decryption is working. on startup if -pubkey=02.... is not set, it will create a temporary keypair. if it is set, it will derive it from the privkey for the -pubkey=
it will print the DEX_pubkey from the DEX_stats rpc call, it should start with 01 (which is an illegal secp256k1 pubkey) followed by a curve25519 pubkey. when sending a message to a destpub, use the 01.... pubkey (including the 01) and it will encrypt it automatically.
[10:24 PM]jl777c:you will see that the data is all random hex. but if your node has the privkey for the destination pubkey, it will automatically decrypt it when you display it. it is not stored in decrypted form, this way all nodes have the same encrypted data and only the node that has the DEX_privkey for the matching DEX_pubkey can decrypt it. in case there is a match, there will be the decrypted value (the original hex/ascii)
[10:24 PM]jl777c:with this, there is enough functionality to implement DM
[10:28 PM]jl777c:i only tested small packets, maybe at 2k and bigger, there will be problems. also, there might be memory leaks
[10:29 PM]jl777c:my todo list is shrinking. all that i have left for full functionality is to handle arbitrary number of tags, prioritized routing and hardening (against crashes and attacks). it should work plenty well for testing even without the hardening

12:22 AM]TonyL:Trying to prepare example with usage of all possible data for filters
[12:22 AM]jl777c:[] means optional
[12:22 AM]TonyL:Ouch
[12:23 AM]TonyL:DEX_broadcast hex [priority [tagA [tagB [destpub33 [volA [volB]]]]]] I thought it's a syntax with logical blocks separation
[12:23 AM]jl777c:so you can have 1 , 2, 3, ... parameters. they are all treated as strings and converted internally
[12:24 AM]jl777c:DEX_broadcast hex
[12:24 AM]jl777c:DEX_broadcast hex priority
[12:24 AM]jl777c:DEX_broadcast hex priority tagA
[12:24 AM]jl777c:DEX_broadcast hex priority tagA tagB
[12:24 AM]jl777c:DEX_broadcast hex priority tagA tagB destpub33
[12:24 AM]jl777c:DEX_broadcast hex priority tagA tagB destpub33 volA
[12:24 AM]jl777c:DEX_broadcast hex priority tagA tagB destpub33 volA volB
[12:25 AM]jl777c:volA and volB are floating point, but only 8 decimals max
[12:25 AM]TonyL:what if I don't want to specify destpub but want to specify volumes?
[12:25 AM]jl777c:""
[12:25 AM]jl777c:DEX_broadcast hex priority tagA tagB "" 1.23 4.56
12:25 AM]jl777c:"" can be used for any of the parameters to default to the default value

12:31 AM]jl777c:only pubkeys that start with 01 are valid, i didnt add error checking for that yet
[12:32 AM]jl777c:when you do tagA and tagB, it creates tagA, tagB and tagA/tagB
[12:32 AM]jl777c:this allows finding all orders with BTC involved, you will have to scan the list and filter out ones with BTC in tagB, that shouldnt be too much extra

12:34 AM]TonyL:I've tried to broadcast same package with non 0 priority now:
./komodo-cli -ac_name=DEXP2P DEX_broadcast "TonyL" 5 "BTC" "KMD" "028a45fb6ab295576ccf963371c701776900c15b2583608427c616e2316ef39740" "0.1" "100"

Few times I got "priority": 5 in output also sometimes "priority": 6 and "priority": 9 is it fine?
[12:35 AM]jl777c:what is the priority?
[12:35 AM]TonyL:5 in my command
[12:35 AM]jl777c:it is the number of 0 bits above the baseline 0x777
[12:36 AM]jl777c:when mining, you can get 20 0 bits, every million times
[12:36 AM]jl777c:so there will be a (binomial?) distribution of 0 bits more than the minimum required
[12:36 AM]jl777c:this is why mindiff is the parameter, not an exact match
12:37 AM]jl777c:you ask for diff of X, it will be at least X, but sometimes X+1, X+2, X+3

12:37 AM]jl777c:not sure if you saw what i wrote about packetsize changing the baseline diff. an extra 0 is required for every doubling in size, starting with 1k

1:13 AM]jl777c:
while true
do
./komodo-cli -ac_name=XUZ DEX_broadcast ffff
done
[1:15 AM]jl777c:above is a blaster loop. it seems you can launch more than one on a single node, but with current txpow it will saturate pretty fast. for max throughput change:
#define KOMODO_DEX_TXPOWBITS 12 -->
#define KOMODO_DEX_TXPOWBITS 1
at that setting, a single node can push out about 500 to 1000 per second
[1:15 AM]jl777c:a p2p network should have each node having random 3+ other nodes as local peers
[1:15 AM]jl777c:not sure if you are able to set up such a network automatically
[1:15 AM]jl777c:you dont want it fully connected

1:17 AM]TonyL:if write such test suit on python we'll have rpc proxies for all nodes - the just getpeersinfo for each and some combinatorics peers ban before the test start
[1:18 AM]jl777c:ok, it is lower priority than functionality testing as we already did a bunch of load testing
[1:18 AM]TonyL:or even start 4th node with hardcoded addnode ips of previous three and so on
[1:19 AM]jl777c:that wont work
[1:19 AM]jl777c:you need to generate all the nodes and make a list of ip addresses
[1:19 AM]jl777c:then on each one, pick 4 random nodes and addnode those
[1:20 AM]jl777c:the important thing is that it is randomly selected peers, any pattern in the peer selection will lead to suboptimal connectivity
[1:20 AM]jl777c:but before any stress test, i need to fix the mutex (lack of) problem and speed up the tag creation/lookup, once that is done, there shouldnt be any more significant changes to the internals

1:32 PM]jl777c:i added mutex to avoid the crashes after an hour, waiting for the one hour to pass to make sure it solves the issue. but an unexpected doubling in speed happened! usually when you add a mutex, the overhead slows things down. i was careful in where i put them to minimize the slowdown, but a doubling of speed was unexpected! what that means is that without the mutex, there were a lot of hardware/system inefficiencies due to the overlapped access to the same memory by different threads. i still have txpow active, but it could be that we can achieve 20k/sec now without it
[1:35 PM]jl777c:the small nodes are at 100% CPU usage

2:05 PM]jl777c:bug is not fixed, so things are still unstable after an hour. this will take a while to solve and i seems better to refactor that code to get a cleaner algo, then debug it if it is still crashing
[2:51 PM]gcharang:@jl777c what part of the data blob is changed randomly for calculating txpow ?
[3:08 PM]jl777c:a nonce is added to the end of the payload
[3:08 PM]jl777c:there is also a header added, one part for routing, another for the indexing
[3:08 PM]jl777c:`[relaydepth][funcid][timestamp][index header] [payload][nonce]`
[3:09 PM]jl777c:the [payload] is the hex or ascii that is submitted (or its encrypted form)

[11:05 AM]jl777c:@TonyL i added a "hash" field to the DEX_list output, this field can be used as a stophash (when stopat is 0). i also bulletproofed the indexing, so there should be no more crashes even under heavy load. but i havent had a chance to test all the various functionalities with multiple tags yet. let me know if i broke anything
[11:09 AM]artemciy_dice:bitwise I think the chance of matching against (random, time) and (random+time, time) are very close. especially if the addition wraps around
[11:10 AM]jl777c:it might be, but to be at cryptographic probabilites, it needs to be the fullhash and there now is stophash parameter that is used if stopat is 0
[11:11 AM]jl777c:an adversary can create a 32 bit collision (with or without timestamp)
[11:11 AM]jl777c:it would even be possible to create a hash collision with enough hashrate, but likely not in the timeframe where it matters
[11:12 AM]jl777c:anyway, i think stophash solves this issue fully, dont you agree?
[11:13 AM]artemciy_dice:stophash being a hash? of what?
[11:20 AM]artemciy_dice:looking at the commit I guess it's the shorthash, but I don't know yet what exactly the shorthash is. if it is a hash of the data, then a duplicate datablob will lead to slippage
[11:26 AM]artemciy_dice:let's say we start with a random id but then simply increment (in an atomic fashion) that id (wrapping around on overflow). that simple scheme might actually work better than both the random and the data-based ids
[11:27 AM]artemciy_dice:for stopat, that is
[11:27 AM]jl777c:but multiple nodes are generating packets, there cant be a coordinated incrementing number
[11:28 AM]jl777c:stophash is the hash of the entire message
[11:28 AM]jl777c:so unless the entire payload is identical and the timestamp is the same and the nonce is the same, it will have a different hash
[11:28 AM]artemciy_dice:we're not going to share stopat between nodes, it's used by a client to pull from a single node
[11:29 AM]jl777c:what exactly is the type of usecase are you wanting to do?
[11:30 AM]jl777c:exact duplicates will be treated as the same packet by the network
[11:30 AM]artemciy_dice:use case is getting a stream of datablobs from a given local komodod
[11:30 AM]jl777c:use DEX_list 0 ... the first time
[11:30 AM]jl777c:it will return all datablobs in the matching index
[11:31 AM]jl777c:the JSON object for each datablob will include both the id and the hash
[11:31 AM]jl777c:store these values from the first item in the DEX_list 0 ...
[11:31 AM]jl777c:next time use the hash value in the DEX_list 0.... stophash
[11:31 AM]artemciy_dice:duplicates aren't filtered out by a node currently, they are only filtered between them
[11:32 AM]jl777c:why do you say that?
[11:32 AM]artemciy_dice:because I tested it
[11:32 AM]jl777c:do you have a specific case that violates the uniqueness? if so, that is a bug
[11:32 AM]jl777c:seems better to fix the bug, but if you dont report it, i dont even know it is there
[11:33 AM]jl777c:you are getting the same id in the DEX_list output?
[11:33 AM]artemciy_dice:no bug can exists outside specification
[11:34 AM]jl777c:identical message should appear only once
[11:34 AM]artemciy_dice:I'm getting different ids but multiple instances of the same datablob so I assume the shorthash will be the same
[11:35 AM]jl777c:same payload will almost always lead to different shorthash (bottom 32 bits of full hash)
[11:35 AM]jl777c:this is due to timestamp and nonce added
[11:35 AM]artemciy_dice:I see
[11:35 AM]jl777c:so if submitted at different timestamps, it will be different
[11:36 AM]jl777c:and even at the same timestamp, unless there is a nonce collision it will be different
[11:36 AM]jl777c:at the transport layer, i cannot tell if identical payload is meant to be two different messages, or just a duplicate
[11:36 AM]jl777c:it seems best to filter out identical payloads before calling DEX_broadcast
[11:38 AM]artemciy_dice:good to know. thanks for unwrapping these parts
[11:39 AM]jl777c:you just need to ask the questions to get the clarifications, this has been evolving rather quickly and without feedback, it will just be based on what i think is needed
[11:39 AM]artemciy_dice:exactly what I did
[11:39 AM]jl777c:yes, it is good
[11:40 AM]jl777c:i havent added any hash based lookups of data, as it seems that might not be needed, but if needed, it wouldnt be hard to add
[11:41 AM]jl777c:@kmdkrazy currently there is a limit of 64 tags, so you cant use tags to track the different parts of a video. best to add a sequence id to the payload and reconstruct it based on that

9:07 PM]jl777c:@TonyL with the latest, there is some primitive prioritization. I have a BLASTER #define that is added to the priority created by the blaster loop. so it if it set to iter, you get 10% at each of 10 priorities. at (iter/9) it is 90% 0 and 10% priority of 1. at (iter/3) it would have 1 3 3 3 as the volume of priority 3, 2, 1, 0
[9:08 PM]jl777c:anyway, before this latest version the (iter/9) blast had close to 100 900 split betweeen priority 1 and 0. with the latest version it is around 50/50!
[9:09 PM]jl777c:the 14 numbers before the tx/sec are the relative volumes for the first 14 priorities, with the leftmost being all priority 13+ combined. it is basically 10x the percentage, so 100 900 is 10% 90%, the expected for (iter/9)
[9:09 PM]jl777c:having it go to 500 500 means 5x increase in completed priority 1 packets.
[9:12 PM]jl777c:oh, when the test starts with just one node blasting, the other nodes can keep up, so it is at 100 900, but when all 10 are blasting, the network cant keep up so it starts prioritizing
[9:13 PM]jl777c:this functionality once made smooth, will allow for the entire network to seamlessly adapt to ongoing spam attacks, exponentially raising the cost of the spam, while minimally slowing down the user experience
9:21 PM]kmdkrazy:is 3MB to much for a packet? it would be the max size for P2P fileshare
[9:21 PM]jl777c:currently i set it to 1MB
[9:22 PM]jl777c:likely the hash could take a while to calculate at such big sizes, havent tested that
[9:22 PM]jl777c:more efficient to use smaller sizes

9:22 PM]jl777c:total can be GB
[9:22 PM]jl777c:dexp2p doesnt care how you use the data
[9:22 PM]jl777c:1024x 1MB packets is 1GB
[9:23 PM]kmdkrazy:64 ids X as many
[9:23 PM]jl777c:you will run into bandwidth issues
[9:23 PM]jl777c:i already wrote to you to not use tags for the different pieces
[9:24 PM]jl777c:just add an incrementing number in the payloads
[9:24 PM]kmdkrazy:right -- I see
[9:24 PM]jl777c:then you can reconstruct them, or request any missing piece

9:26 PM]jl777c:i will probably write a lossless file transfer type of layer on top of the messaging layer
9:29 PM]jl777c:many usecases will need a reliable data transfer and the logic to do the error detection, retry, etc. it might as well be in the core. the primitive priority based routing appears to be working quite well. that was the last big issue to solve. still need to fine tune it as i have many ideas to make it better, but at least there is a way to maximize the chances your packet gets fully broadcast, even in a saturated network. currently about 2x network capacity of traffic

9:33 PM]jl777c:would be really cool to be able to specify a file (which is growing as the recording keeps going) which is then broadcast to the network and once caught up, it will continue to send the latest updates
[9:34 PM]jl777c:on the receive side, you would specific a file that you want locally and it would update from the network. just call it every few seconds and you will recreate the file as it grows

[9:35 PM]jl777c:there would be a tag for such streaming files and you would specify the shorthash of its directory of hashes of its initial set of data
[9:36 PM]jl777c:no idea about the labs stuff, i am talking about an automated publishing protocol
[9:36 PM]jl777c:would be all done in C
[9:37 PM]jl777c:but inside the komodod, so just need to specify what stream you want and the file will be created locally. i think that would be a very good demo of this tech

9:39 PM]jl777c:dexp2p is designed for maximum performance and being able to add custom flow control based on txpow priority, this is what will make possible a reliable system that gracefully degrades
[9:39 PM]jl777c:the concept is simple enough to split a file into smaller pieces, send it and reconstruct it
[9:39 PM]jl777c:but dexp2p is like UDP and not 100% reliable, so the reliability needs to be added

9:40 PM]jl777c:with the bandwidth levels we are seeing, hundreds of simultaneously broadcast audio channels can be handled by one dexp2p network
9:41 PM]jl777c:yes, that is a good start and if all the data gets there, there is no problem. the problem is what to do when not all the data gets there
[9:42 PM]jl777c:do you know if the video streaming software creates a single every growing file?
[9:42 PM]jl777c:but it is possible that there is no known pubkey, as that is not required to send packets into dexp2p, it is permissionless network
[9:43 PM]jl777c:if audio and video streaming software creates a single file that just gets bigger the longer the stream goes, then it can fit into what i am thinking of directly
9:44 PM]TonyL:https://en.wikipedia.org/wiki/HTTP_Live_Streaming you can split it on small chunks according to HLS protocol
9:45 PM]jl777c:that would be the simplest. no need to fiddle with making http requests, just specify the local file the stream is going in and it gets replicated in near realtime on all nodes that have subscribed
[9:46 PM]jl777c:and for playback, i am assuming if you have the log that was made, you can just play it. hopefully if it is a growing file it will be able to play it as it grows in size
[9:47 PM]jl777c:i plan to make it no have any missing data
9:47 PM]jl777c:anyway, if someone can verify these assumptions, we can get a video streamer demo made
[9:51 PM]jl777c:also if there are video feeds that are hierarchical, we can use the different priorities to send the lowest res, to highest res. not sure if the video formats are such that the data is low res + medium res + high res, where there can be the difference between the low, med, high res
10:06 PM]jl777c:so i will target the file/stream transmission to be file based
[10:06 PM]jl777c:making it file based, it can be used on any file
10:06 PM]jl777c:so debug.log can be broadcast and it will sync to all subscribed nodes
[10:07 PM]jl777c:this file transmisison protocol belongs in the core, it is not for the app level
[10:07 PM]jl777c:for the app level, if you can just convice video broadcasting to make a file that grows in realtime
[10:08 PM]jl777c:and for the player to stream using such a file, then the file/stream layer will take care of the rest
10:09 PM]jl777c:the low level will be give a filename and it will then do all the splitting, transmitting, sending out high priority directory info, retry for missing pieces. this is all universally needed for anything that needs reliable data
[10:10 PM]jl777c:so the DEX_publishstream "filename" tagA would start the stream

[10:12 PM]jl777c:once a stream is active, then people could subscribe to it. but i think both streams and files are very similar.probably they use the same method for the data transfer, but the streaming would add extra functionality to extend the file
[10:12 PM]jl777c:so the broadcasting side makes sure there is a file that is growing in time based on the video feed. and it calls the DEX_streampublish every second
[10:13 PM]jl777c:that updates everything and sends the data out to the dexp2p network
[10:13 PM]jl777c:any node can then subscribe by doing DEX_streamupdate, which would replicate the file locally.
[10:14 PM]jl777c:doing the video display is up to whatever software can do that with a file that is growing in size
[10:14 PM]jl777c:hope this all makes sense
[10:16 PM]jl777c:so if anybody can find/configure publishing side software to make a growing file, i think the client side can just stream from that
10:18 PM]TonyL:ffmpeg should suit the task as a open source streaming solutuion
[10:19 PM]jl777c:yes, but why to reinvent the wheel?
[10:19 PM]jl777c:there must be end user software already that publishes a stream
[10:19 PM]jl777c:VLC seems to say it can stream from a growing .mp4 file. we need to verify that
[10:20 PM]jl777c:making a GUI for publishing streams will take a very long time
[10:20 PM]jl777c:at least if we want it to look decent
[10:20 PM]jl777c:and much better to work with existing tools that people are already using
[10:21 PM]jl777c:we could probably make our own filesystem too. but what value does that add? there are plenty of good file systems already
[10:21 PM]jl777c:so plz find existing end user apps that do the publishing and verify that VLC or something like it can play a file that is coming in incrementally
[10:22 PM]kmdkrazy::point_up: :thumbsup:
[10:22 PM]jl777c:maybe it is some mac specific thing? not sure, that is why i ask
[10:22 PM]jl777c:player needs to run on all systems, so if VLC does it, fantastic
[10:23 PM]jl777c:publishing side can be some os specific thing

[10:26 PM]jl777c:we actually dont need the publishing side, just the front end to the publishing side
[10:26 PM]jl777c:as we are using dexp2p as the transport
[10:26 PM]jl777c:so a GUI that can make a .mp4 file incrementally from a webcam
[10:26 PM]jl777c:locally
[10:26 PM]jl777c:that is really all that is needed
[10:26 PM]jl777c:it could be it is built into apple OS
[10:27 PM]jl777c:webcam -> .mp4 file locally

[10:27 PM]jl777c:specify that file to be broadcast via DEX_streampublish
[10:27 PM]jl777c:then any node can DEX_streamupdate and play it with VLC
[10:28 PM]jl777c:@gcharang great! please confirm it can create a file locally and that VLC can stream and display that file as it is growing
[10:28 PM]jl777c:once we have that, it is a matter to insert the dexp2p broadcast and reconstruction to allow any node to be able to VLC stream the same file
[10:29 PM]gcharang:yup, testing it

[10:50 PM]gcharang:@jl777c it is working as expected
obs is outputting a file with increasing size
vlc is able to play it while it is increasing in size
I had to set the output format from obs to mkv
[10:53 PM]jl777c:great! i will start on the file sync layer next week
[10:53 PM]jl777c:assuming no bugs found with messaging layer
[10:55 PM]gcharang:that will be so cool!
maybe pubkey signing of the data blob hashes can be added later?
[10:56 PM]gcharang:it can combat fakes/deepfakes :smile:
[10:59 PM]kmdkrazy:ill research P2P open source chat --- discord type --- Ive already found a few - will narrow dow n the list
[11:02 PM]jl777c:yes, a streamed file needs to be signed. a non-streamed file doesnt have to be signed
[11:03 PM]jl777c:oh, yes, an open source chat system, once i add file transfers then we have channels, DM and file uploads. all via totally decentralized -dexp2p. with the layer working as UDP, basically most all the internet services should be able to be replicated
[11:05 PM]jl777c:and since this is all happening inside komodod, of course it can be easily integrated with the native coin for whatever aspect, even payment for priority, certainly payment for subscription, can even use nSPV to accept KMD payments to release paid for services
[11:05 PM]jl777c:it will take a while to replicate all of the major internet services, so the more existing software we can use, the faster it will get done
11:06 PM]gcharang:
certainly payment for subscription
the destpub encryption can help here I think
[11:06 PM]jl777c:exactly
[11:06 PM]jl777c:you pay the publisher, he then sends the data encrypted to your pubkey
[11:07 PM]kmdkrazy:plenty of open source p2p chat -- will find best and easiest
[11:07 PM]jl777c:remember the dexp2p does the networking, we just need the front end GUI
[11:07 PM]jl777c:it can be for a centralized server
[11:08 PM]gcharang:then the best one is https://github.com/RocketChat/Rocket.Chat
11:20 PM]gcharang:messaging protocol https://github.com/TokTok/c-toxcore --> instant p2p encypted
gui for it https://github.com/qTox/qTox

[3:53 PM]jl777c:stophash will stop right before the specified stopat
[3:53 PM]jl777c:i guess it should be called stopjustrightbefore
[3:54 PM]jl777c:the idea is you remember the first id/hash from each DEX_list return and use that as the parameter for the next one
[3:54 PM]jl777c:this way you get each packet exactly once
3:55 PM]jl777c:the list is in reverse time order
[3:55 PM]jl777c:from last to first
[3:55 PM]jl777c:in this ordering third is before the second
[3:55 PM]jl777c:stopjustrightbeforeasyoutraversethelistinreverseorder

5:03 PM]jl777c:yes, you didnt specify tagA
[5:03 PM]jl777c:the lists are organized by tags
[5:03 PM]jl777c:if you use a tag that is not matching, it wont match
[5:03 PM]jl777c:use tagA of BTC or KMD
[5:03 PM]jl777c:or tagB of BTC or KMD
[5:04 PM]jl777c:notice it defaulted to "general" tag in the DEX_list output
[5:04 PM]jl777c:that is what no tag defaults to
[5:05 PM]TonyL:ah, I see
[5:05 PM]TonyL:I thought tag is not mandatory
[5:06 PM]TonyL:like a if no tag filtering specified it should display everything, with correct tag it works correct
[5:06 PM]jl777c:its not mandatory
[5:06 PM]jl777c:it defaults to "general" if not specified, and displays the output in DEX_list
[5:06 PM]jl777c:ok, so only bug is lack of documentation so far then
5:12 PM]TonyL:with some examples - if you do not specify tags on broadcast it gets default tag by default, if you don't specify tag on filtering it filter by default tag by default
[5:13 PM]TonyL:and that if you want to find package broadcasted with tag BTC it's mandatory to specify tag BTC
[5:13 PM]TonyL:you even can explain it as a case in doc: lets say we want to put order for KMD to BTC with price like that and volume like that and from another side lets say we want to find order for KMD to BTC with params like that
[5:19 PM]jl777c:"general" is the default tag

8:13 PM]jl777c:i think i got the priority based flow control working. allocation of 20/40/40 for priority 2/1/0 went to 60/20/20. i changed the outputs to show actual totals so i can see how close the actuals are for the highest priority. that is at about 2x overall network capacity. nearly all the highest priority packets are arriving.
[8:27 PM]jl777c:i made it so if LAG is not detected, it wont change the routing
[8:28 PM]jl777c:this is to prevent an attack by making a veryhigh priority packet, in LAG mode, only the highest few priorities are getting all the packets through
[8:41 PM]TonyL:Hmm, if node got 0 connections (both addnode and connect not specified in startup params) I'm not able to add peers to it by addnode RPC call
Maybe I need to interconnect everything at first and then ban nodes to make not everything interconnected
[8:41 PM]jl777c:not sure, this part of code is very tricky and unpredictable
[8:42 PM]jl777c:-addnode= on commandline tends to work pretty well

[8:44 PM]TonyL:Like a start batch interconnected, then connect randomly by 4 addnode params next batch to previous and so on
If I remember correct there is define in code so I can limit overall amount of peers for each node to lets say 4 - could you please remind where it is?
[8:45 PM]jl777c:-maxconnections=
[8:46 PM]jl777c:but it seems to be very drastic in how it works
[8:47 PM]jl777c:i see where it could have had peers, but ends up with 0
[8:47 PM]jl777c:i would try -addnode= on the commandline with 3 random peers

11:44 PM]jl777c:0 or "" both end up at 0
[11:44 PM]jl777c:if stopat is not 0, it takes precedence over stophash
[11:45 PM]gcharang:got it
[12:50 AM]jl777c:@TonyL pushed new version that is basically feature complete. just have more fields to add to the DEX_stats rpc call. it can now handle arbitrary (RAM limited) number of tags. this allows indexing by pubkeys, ie. destpub with conventions that tagA:inbox and tagB:outbox will allow messages to go to a specific pubkey and a broadcast from that pubkey to be easily findable
[12:51 AM]jl777c:i also hardened it from rare edge case crashes, which before could have happened in rare edge cases
[12:52 AM]jl777c:to fully test the full range, would need to tweak internal #defines. but the default config should allow a decent coverage. let me know when the basic data transmission is working solid. i will then boost txpowbits to 12 or more, which will get us in the expected normal network config and it will take a lot more than a single server to saturate the network
