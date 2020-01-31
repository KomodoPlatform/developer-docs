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
1:20 PM]jl777c:how close to 100% CPU usage was it for 10 nodes?
[1:21 PM]jl777c:as soon as all CPU is used,things degrade rapidly. at 5x then best case is 20% of traffic gets through, but with CPU overloaded would be lucky to get 10%, and it seems that is what happened
[1:22 PM]jl777c:plz do this test at 15 nodes, 20 nodes, 25 nodes and 30 nodes
[1:22 PM]jl777c:we should see it gradually decline from 99%+ to 20%
[1:24 PM]jl777c:maybe we can use AWS so the nodes have constant hardware available
[1:46 PM]jl777c:i think it will stay at the 99+ range until the network gets saturated. then it will start degrading, but not sure how fast it will degrade. also, if you can have a mix of priorities then when the network is degraded we can measure the completion percentage of the different priorities. that is really what makes dexp2p unique (maybe this is in some other p2p network?), the graceful degradation built into p2p streaming.
[1:48 PM]jl777c:if the network is not saturated, then it wouldnt matter the priority, similar to txfee not mattering if the blocks are not full. once the nodes start lagging, they will go into a lag mode where the top priority packets are given VIP treatment and try to maintain the 99%+ for them. and iterating down to the next priority as resources allow. so overall, we should see something close to a linear degradation overall, but the highest priority would stay at 99%+ until the network is so saturated, it cant even deliver all the VIP packets
[1:48 PM]jl777c:at least that is what i tried to implement
[1:50 PM]jl777c:however, this is much much harder than it looks and it is very easy to end up with unintended feedback loops and having non-graceful degradation. we know the network will be saturated at some point as with exponentially growing base of usage, it will exceed any given network capacity, so the important thing is to gracefully degrade during the overload so that as little end user experience is affected (for DEX orderbooks as long as the local orderbook is close to the theoretically best, that is good enough)
[1:52 PM]jl777c:then when we detect a specific dexp2p network is overloaded, we spawn another one, so nodes would be connected to multiple dexp2p networks and we can get it to scale almost on-demand. the issue of course is normal end user nodes wont be able to handle more than a single dexp2p network....
[1:53 PM]jl777c:ok, the solution is a hierarchy of dexp2p networks, with the main one reserved for summary data and info about other dexp2p networks. low end network connection clients just connect to this one and it will have all the relevant info from all the lower level dexp2p networks.
[1:55 PM]jl777c:bridge nodes would then connect to both and feed info from the lower level dexp2p to the higher level in summary form, ie. the top of orderbook, directory of files, etc. without the actual data. maybe enough data is needed so two clients on different lower level dexp2p networks can get enough info to do an alice/bob swap just from info in the main dexp2p
[1:56 PM]jl777c:i didnt expect to have to solve realtime sharding... but it seems that is sort of what this is

1:47 PM]jl777c:@TonyL changed the behavior of DEX_list to make it so that if a tag is specified then it must match the packet, this allows for a much more streamlined query sequence. leaving a tag as "" will make it match anything the packet has.

also made DEX_stats return most of the status line that prints every minute. if you need any specific field to have its own JSON field, let me know. easy enough to do, but it seems it would just clutter the return to do it to all of them
[2:01 PM]jl777c:prior testnet did 400 million+ packets
[2:01 PM]jl777c:of 4kb each
[2:03 PM]jl777c:latest version has purgetime of one hour to allow longer time testing of tags
[3:36 PM]jl777c:from what i can tell, the latest version is feature complete for the messaging layer and transport layer, just need to change txpowbits to 12 (or 16) to make it take about a second to calculate the txpow. of course, there are some bugs that still need to be found and fixed
[3:37 PM]jl777c:i am moving onto the reliable file transfer layer as that gives us a real easy to understand demo with a video streamer(s)
[3:38 PM]jl777c:oh, and i will change the destpub encryption to only apply to tagA of "inbox", that allows the destpub tag to be used to send messages and also have unencrypted messages from the pubkey

4:12 PM]jl777c:i didnt test the DEX_list required tag matching, so definitely could be bugs there, along with the "inbox" requirement for encryption

4:57 PM]TonyL:
changed the behavior of DEX_list to make it so that if a tag is specified then it must match the packet, this allows for a much more streamlined query sequence. leaving a tag as "" will make it match anything the packet has.
not 100% sure that understood this change
is main difference that now if no packages with tag found it returns an error?

6:02 PM]jl777c:the change to DEX_list is to make the search tags &&
[6:03 PM]jl777c:so tagA && tagB instead of tagA || tagB
[6:03 PM]jl777c:if you have tagA of KMD and BTC, and tagB of BTC and KMD
[6:03 PM]jl777c:then passing in tagA KMD tagB BTC will return only those with both tags

6:17 PM]jl777c:@TonyL we need to make sure -dexp2p nodes will live in their own isolated universe and not be sending DEX messages to non -dexp2p nodes. they should be able to interoperate using normal protocol, but the DEX messages only sent to nodes with the proper nServices bit set

6:55 PM]jl777c:@TonyL @Sir Seven i changed internals to more easily support orderbooks, would be good to do a regression test to make sure i didnt break any existing functionality.

i havent debugged the DEX_orderbook yet, but the general idea is that you can submit bids (or asks) using the tagA=base, tagB=rel convention, and then the volA and volB will determine a price. ie. tagA=KMD, tagB=BTC, volA=10000, volB=1 -> price of 0.0001

pretty sure the DEX_orderbook has many issues, so dont worry about testing that until it at least passes the spot tests.

you can filter the orderbook by minpriority, or volume min/max for either volA or volB

all orderbook entries needs to have your pubkey specified, along with tagA and tagB being base/rel
[6:55 PM]SHossain:updating my nodes
[6:57 PM]jl777c:the idea is that the payload for an order can have all the details needed to ordermatch atomic swap
[7:03 PM]jl777c:once get it spot tested, then we can make a gui for people to submit/cancel bids and asks and see if the orderbook is updating in realtime for them. this way we simulate the actual usecase -dexp2p was designed for

[6:57 PM]jl777c:the idea is that the payload for an order can have all the details needed to ordermatch atomic swap
[7:03 PM]jl777c:once get it spot tested, then we can make a gui for people to submit/cancel bids and asks and see if the orderbook is updating in realtime for them. this way we simulate the actual usecase -dexp2p was designed for

7:20 PM]jl777c:also, dont use payload ffff, that is a special case for broadcast
[7:21 PM]jl777c:just any other hex is fine
[7:21 PM]SHossain:when i used that pubkey i got 10x
duplicate link attempted ind.0 ptr.0x7fff4c0022a0
[7:21 PM]SHossain:ok. will not use ffff
[7:21 PM]jl777c:ffff does 10x repeat

[7:46 PM]jl777c:half the time you hash 1 extra 0 bit, raising its priority
[7:46 PM]jl777c:quarter the time, 2 extra 0 bits
[7:46 PM]jl777c:one eighth the time 3 extra 0 bits
[7:46 PM]jl777c:is it a minimum priority, to make it an exact match would require to throw away half the valid results

9:01 PM]jl777c:oh, you still need to test identical price with different volumes
[9:01 PM]jl777c:to make sure it is sorting by the proper volA vs volB
[9:01 PM]SHossain:ok
[9:01 PM]jl777c:i think for bid vs ask, it should use a different volA or volB for the secondary sort
[9:02 PM]jl777c:@gcharang DEX_orderbook appears to be ready to document

[10:13 PM]SHossain:what does DEX_get do?
[10:14 PM]jl777c:when i write it, it will get the specified id/hash
[10:14 PM]jl777c:the orderbook now doesnt return the payload and if it will be 1kb in size, that is a lot of data to include in the DEX_orderbook return (though i guess i can add that if needed)
[10:15 PM]jl777c:the idea is that the trading client will look at the orderbook and then for the order it is interested in, DEX_get the id/hash and then use that data to verify that the orderbook entry is valid, the peer is recent, has funds, etc

[10:32 PM]jl777c:probably will need to add some sort of network request for missing id/hash, still not sure the best way to do that. i want to only add things at the core protocol level when it is absolutely needed, or gets us a lot of new functionality.
[10:34 PM]jl777c:i think mm2 nodes could make a bridge to the dexp2p and a bridge from dexp2p and then pretty immediately use it, but with orderbook functionality now, it seems better to do a full integration with the atomicDEX payloads in the packets. i think the reputation system can also be built on top of the dexp2p as it allows all nodes to find out about misbehaving pubkeys very quickly, just need a way to cryptographically prove misbehavior and then broadcast that info tagA:badpubs
[10:35 PM]jl777c:i designed the tagA/tagB/pubkey so you can use it for many different purposes, though for non-orderbook usage there will be fields that are unused and a bit of bloat but it is pretty efficient overall so probably wont matter so much

10:35 PM]jl777c:the volA being able to have min/max filters enables a variety of things for non-orderbook usage
[10:36 PM]Alright:it seems better to do a full integration with the atomicDEX payloads in the packets
by this do you mean any mm2 client would just do the p2p messages directly?
[10:36 PM]Alright:without running coin daemon
[10:36 PM]jl777c:with txpow enabled, it will take 10,000x the nodes to get the same level of network saturation as the 10 nodes do so that is equivalent of 100,000 node capacity, but we will likely be limited to 1000 quotes/sec per dexp2p network
[10:37 PM]jl777c:dexp2p only replaces the caretaker node comms, the thing that bogged down during the last stress test. the rest would stay the same
[10:38 PM]Alright:how does the txpow implementation for this work? What must be hashed with leading/trailing 0s?
[10:38 PM]jl777c:the packet
[10:38 PM]Alright:and how is it ignored if it doesn't have required amount of 0s
[10:38 PM]jl777c:if it doesnt have sufficient priority, it is ignored (after received)
[10:38 PM]jl777c:and so, not relayed, not using any RAM
[10:39 PM]jl777c:certainly an evil peer can spam invalid packets, but a counter for such invalid packets and banning such a peer solves that
[10:39 PM]Alright:I noticed recently that that komodo daemon doesn't care if it's getting spammed with p2p messages
[10:40 PM]Alright:doesn't seem to have much effect even when it is being spammed
[10:40 PM]Alright:was testing something that was sending messages every 10ms to every peer and none of them cared
[10:40 PM]jl777c:BTC protocol has no protections against protocol level spam
[10:40 PM]jl777c:dexp2p does
[10:42 PM]Alright:so first use of this in real world conditions will still have caretaker nodes relaying this data to mm2 peers?
[10:42 PM]jl777c:i think there will need to be mm2 fullnodes vs mm2 litenodes
[10:43 PM]jl777c:then mm2 fullnode could all have a dexp2p node running and just use that, but that probably takes longer to integrate, so i think the plan is to have all the caretaker nodes runing dexp2p nodes and using that to get in sync with each other. but not sure of the details, i am just making dexp2p as fast and useful as possible
[10:45 PM]jl777c:dexp2p is very bandwidth efficient, am seeing only about 0.1% redundant packet transmissions over the theoretical minimum
[10:47 PM]jl777c:basically if dexp2p cant keep up, then nothing would seem to be able to, plus dexp2p has prioritized packets, so if the dapp is monitoring network saturation and just boosts the priority it uses for sending out packets, it will maximize the chances that its packets will propagate. this will allow the entire network to adapt to a spam attack, as each incrementing of priority doubles the PoW needed
[10:48 PM]jl777c:or users can choose to boost priority, similar to paying higher txfee to get confirmed faster, "pay" a higher PoW priority to get propagated at a much higher rate
[10:49 PM]Alright:still need to dig into it, haven't had much time to devote to this. Are there any protections to prevent front running of orders? Would that have to be built on top of this?
[10:49 PM]Alright:that is a great idea, more pow, more priority
[10:49 PM]jl777c:it is broadcast to all nodes via fully decentralized p2p network
[10:50 PM]jl777c:certainly neighbor nodes would have a 1 second time advantage, but in general you wont be the neighbor to an order
[10:50 PM]jl777c:even if you are highly connected, a node will only be sending it out to 3 random nodes
[10:50 PM]jl777c:so if you have majority of the network, then odds are you can find out first (by a second) about any order
[10:51 PM]jl777c:but what exactly will you do in that one second?
[10:51 PM]jl777c:if you fill one side of the order, then you filled one side of the order, since it takes minutes to complete the order you either need to wait for it to complete to fill the other half or just do it speculatively.
[10:52 PM]jl777c:i just dont see any practical advantage to a 1 second earlier knowledge of a quote
[10:52 PM]jl777c:and, alice conducts a bob auction, it wont matter anyway
[10:52 PM]jl777c:alice can say, "i want to do this order" and wait for the best offer to come in. in this case a 1 second advantage is meaningless
[10:53 PM]Markus:Amazing work guys, kmd never stops surprising. Keep it up :thumbsup:
[10:53 PM]kmdkrazy:Looks ready for dCloud storage and dStreams after test is verified
[10:54 PM]jl777c:i still need to get recursive DEX_get working before we can do file sync
[10:54 PM]Alright:When I do start trying to break this, what is the most likely attack vector? Seems spam is handled, front running doesn't matter all that much, can't think of anything :rofl:
[10:55 PM]Alright:evil nodes that selectively propagate orders? :smiling_imp:
[10:55 PM]jl777c:it has 3 protocol messages
[10:55 PM]Alright:what are they?
[10:55 PM]jl777c:ping (with list of shortids)
[10:55 PM]jl777c:packet (with the actual packet)
[10:55 PM]SHossain:probably try changing the orderbook data? :abused:
[10:56 PM]jl777c:get (which requests shortid)
[10:56 PM]jl777c:at the low level, those are the only messages
[10:56 PM]Alright:are the packets signed?
[10:56 PM]SHossain:txpow would do that. no?
[10:56 PM]jl777c:not yet, i will add that soon
[10:56 PM]SHossain:ah...ok
[10:57 PM]jl777c:there is also no tracking/banning of bad peers yet
[10:57 PM]jl777c:one attack is to send a crazy long list in the ping, and then never responding
[10:57 PM]jl777c:this needs to be detected and such a peer banned
[10:58 PM]jl777c:the other messages, not sure what can be abused. small stuff like sending illegal packet, this needs to be detected and banscored
[10:58 PM]jl777c:but all that is for after it is all working, not worried about detecting and banscoring
[10:58 PM]jl777c:txpow makes it permissionless to broadcast packets, as you are paying a cost for all packets
[10:59 PM]jl777c:the larger the packet, the more PoW is needed, just to have priority of 0
[10:59 PM]jl777c:first 1k is free, then up to 2k has 1 extra priority, then up to 4kb needs 2 extra priorities, ... up to 1MB
[11:01 PM]jl777c:for all dexp2p does, it is still only 1700 lines of code, most of it not very complex

11:18 PM]Alright:if this can interact with consensus of the chain it's running on, could we require a "sign up" transaction before orders are propagated?
[11:18 PM]jl777c:yes, any sort of logic can be added
[11:18 PM]jl777c:but it isnt yet
[11:18 PM]Alright:not really priority, but allows for a few different things
[11:19 PM]jl777c:you can have payments to CC (or fee address) required, or the priority is downshifted by a lot
[11:19 PM]jl777c:you can have encrypted payloads sent out, only to pubkeys that prove they made KMD payments to the sellers address
[11:20 PM]jl777c:it is built right into the daemon, so any sort of payment conditions can be added for transactional releases of data
[11:20 PM]jl777c:special CC can be made to blockchain enforce arbitrary logic
[11:21 PM]jl777c:even KMD komodod could run -dexp2p nodes so that KMD can be used for the realtime payments with a native node
[11:21 PM]jl777c:plans are for nSPV support for dexp2p to allow superlite clients the summary data, like orderbooks and individual payloads
[11:22 PM]jl777c:this is the missing piece for all the realtime performance usecases
[11:22 PM]jl777c:and while there is no consensus at the dexp2p level, it can tie into the blockchain consensus for things that require consensus
[11:23 PM]jl777c:its almost as if i identified the missing realtime processing module that could integrate right into the blockchain and CC, and made it

[11:24 PM]jl777c:it doesnt seem to matter from orderbook standpoint the order of identical price with identical volume
[11:24 PM]jl777c:so random
[11:25 PM]jl777c:@Alright if you can calculate a 32 bit collision on the id (lowest 32 bits of hash minus the minimum priority and size priority), then that could create a bit of a problem for packet transmission
[11:26 PM]Alright:minus the minimum priority and size priority this is part of the hash itself?
[11:26 PM]Alright:so after removing leading trailing 0s?
[11:27 PM]jl777c:txpowbits is the baseline bits needed for priority 0
[11:27 PM]jl777c:sizepriority adds to that for packets bigger than 1kb
[11:28 PM]jl777c:it is all part of the hash, but shifted to not lose any entropy, so for a collision you would need a full 32 bit match , on top of the minimum txpowbits. when it is set to 1, not much of a difference, but for production it will be set to 12 to 16, to that is 4096 to 65536x the PoW needed
[11:28 PM]jl777c:it is a single SHA256, so you would need an fpga to calculate fast hashes
[11:29 PM]Alright:yea.... :sweat_smile:
[11:29 PM]Alright:that's a hefty order
[11:29 PM]jl777c:probably not worth the effort to confuse the network routing of a single packet
[11:29 PM]Alright:let me try to understand this though
[11:29 PM]Alright: "id": 1731644715
[11:29 PM]Alright:this id?
[11:29 PM]jl777c:yes
[11:30 PM]jl777c:convert to hex
[11:30 PM]jl777c:shift by 1
[11:30 PM]jl777c:you will see a match to the hash low bits
[11:30 PM]jl777c:shift by txpowbits, currently it is 1
[11:30 PM]Alright:gotcha, let me try this
[11:31 PM]Alright:unlikely I can find a collision like that in a timely matter
[11:31 PM]Alright:basically I would want to look at someone else's packet, create another with the same id while their packet is still propagating?
[11:31 PM]jl777c:you have until the fifo comes full circle, the purgetime
[11:31 PM]Alright:how long is that?
[11:31 PM]jl777c:2 seconds
[11:32 PM]jl777c:but maybe if the network is lagging, you have 30 seconds
[11:32 PM]jl777c:the fifo size is between 5 minutes to one hour, but can be as small as 2 minutes and biggest can be whatever fits in RAM

11:33 PM]Alright:And if I'm able to do this? Wouldn't signing packets negate this anyway?
[11:34 PM]jl777c:the way the ping works is that only the shortid is sent
[11:34 PM]jl777c:so unless a node knows of the full hash, it wont know to ask for it
[11:35 PM]Alright:shortid is just used to cut down on bandwidth?
[11:35 PM]jl777c:and most of the internals uses the shortid to track things, so the assumption is that shortid collision is rare
[11:35 PM]Alright:what am I missing here, why is full hash not used?
[11:35 PM]jl777c:yes, it reduces bandwidth a lot
[11:36 PM]jl777c:10,000 packets per second, savings of 28 bytes per packet, is 280kb/sec
[11:36 PM]jl777c:times N
[11:36 PM]jl777c:as it is sent out to neighbors and also in the requests
[11:37 PM]Alright:double sha should make it impossibly harder
[11:37 PM]jl777c:could well be more than 1MB/sec
[11:37 PM]jl777c:double sha would allow antiminers to make the hash collisions
[11:37 PM]jl777c:and collision of single sha vs double isnt much different
[11:38 PM]jl777c:highest performance was the design objective, even if not 100% accurate
[11:38 PM]jl777c:99.999% accuracy seems to be achieved, and the once in a billion hash collision
[11:38 PM]jl777c:oh, a true hash collision needs to be for the same second
[11:39 PM]Alright:a collision is already very hard to do, but not impossible. Must be some way to make it even harder and not have to worry about it
[11:39 PM]jl777c:as the internal hashtables are a pipeline of one hashtable for each second and the timestamp is known
[11:40 PM]Alright:need to think about double vs single, have a feeling there is some clever way to make it impossibly harder
[11:40 PM]jl777c:all honest nodes check to make sure there is no hash collision first
[11:40 PM]jl777c:only a dishonest node is bypassing this and it needs to make a hash collision for the same timestamp
[11:40 PM]jl777c:and this will allow it to confuse some of the nodes into not getting the original packet
[11:41 PM]jl777c:it seems there is no exposure to worry about and no possible to totally eliminate shortid collision
[11:41 PM]jl777c:higher layers can and will use hashes for 100% accuracy required usecases
[11:42 PM]Alright:sure you can't eliminate it, but based on you asking me to try it, I assume it's not that hard. I'm sure there is some way to make it magnitudes harder than it currently is, just need to think about it
[11:42 PM]jl777c:without an fpga, it is basically impossible to do.
[11:42 PM]jl777c:you would need a billion seconds or so
[11:43 PM]jl777c:but you only have 30
[11:43 PM]jl777c:and by then it has propagated to all the nodes anyway, so too late. each additional second means more and more nodes got the original packet
[11:43 PM]jl777c:i wasnt expecting you to be able to do this, but wanted to put to rest any issues about shortid collisions
[11:44 PM]jl777c:you were asking about vulnerable areas
[11:44 PM]Alright:yea understood, was asking about practical attacks vectors though :rofl:
[11:44 PM]jl777c:blowing up a node by exhausting all its RAM, probably is the only practical attack, which is only practical if txpowbits is set to 1
[11:45 PM]jl777c:1MB packets would take forever to hash, maybe cant even do it within the lag time limit anyway
[11:45 PM]jl777c:but i allow for very fast alien processors
[11:45 PM]jl777c:i think 900 byte packets will have the fastest rate of data consumption
[11:46 PM]jl777c:10,000 packets per second is 10MB/sec, so 36GB for an hour purgetime
[11:46 PM]jl777c:that could cause a problem for smaller nodes
[11:47 PM]jl777c:but at txpowbits of 16... it will take thousands of cores to blast that much data
[11:47 PM]Alright:how does a node know not to continue to propagate a packet?
[11:47 PM]Alright:thinking maybe it's possible to get a packet that will just keep looping through the network indefinitely?
[11:47 PM]jl777c:there is a relay count that is set to a default value
[11:47 PM]jl777c:maximum of 10, i think
[11:47 PM]Alright:is it set client side or within the packet?
[11:48 PM]jl777c:it is the first byte of the packet
[11:48 PM]jl777c:set by the client
[11:48 PM]Alright:so packet is changing with each new propagation of it?
[11:48 PM]jl777c:but remember the 0.1% duplicate packets? it achieves this by tracking all packets from all peers
[11:48 PM]jl777c:yes, the one byte is changing, the rest is the same
[11:49 PM]jl777c:each honest node will decrement it
[11:49 PM]Alright:so I'll setup a few nodes that always change every packet to the max value? :sweat_smile:
[11:49 PM]jl777c:also, it wont send to a peer that it knows already has it
[11:50 PM]Alright:reminds me of onion routing without encryption
[11:50 PM]jl777c:all nodes could just set it to max, but other than boosting the duplicates counts, i dont think it will do much damage. granted tripling bandwidth used is damaging, but that required corrupting every single node
[11:50 PM]jl777c:there is also encryption to pubkey if tagA is "inbox"
[11:51 PM]jl777c:but indeed it is similar to onion routing if only due to the decrementing relay counter
[11:51 PM]jl777c:having a few peers set it to max will just increase the local duplicates by a bit
[11:52 PM]jl777c:we can assume a misbehaving peer will be banscored and dropped, so you are limited to things that wont get banscored
[11:52 PM]Alright:re-propogating every packet with first byte changed to max is a good place to start
[11:53 PM]jl777c:would be interesting to see what sort of duplicates stats you will get with that
[11:53 PM]Alright:can try this tomorrow, today working on getting my dev station back up and running

[12:02 AM]jl777c:dexp2p doesnt have a large surface, so just start using it and you will get ideas on how to attack it. just take into account txpowbits 1 is for testnet and production will be 32k times harder (maybe will need to tune the production value based on various real world timing from nodes)

9:04 PM]jl777c:@TonyL maybe it is even a bit slower, had to add more mutex to prevent the rare crash. it is sustaining 4k/sec on my testnet, which is pretty good performance.
i made a LOT of internals changes. most which has no visible external effect, but we now have a command processor for commands that are embedded in the normal payloads
[9:06 PM]jl777c:this allows proper implementation of DEX_cancel, which needs to take effect networkwide. for commands, it is required to have at least a CMDPRIORITY (currently set to 4) as it will require a bit more processing than normal packets. the way to send out a command is to just use the internal broadcast function with a different funcid than 'Q', using 'X' for cancel. i didnt implement the actual functionality yet, but the 100x harder part of being able to issue a onetime executed command networkwide, it is solved. on the local node, it is possible that the same command will be invoked more than once, but this is a small overhead
[9:07 PM]jl777c:the other change is that ALL packets with a pubkey tag are encrypted. this includes all the orderbook entries. if you are thinking about this, you might wonder who is it encrypted to? since the orderbook is public info, we need all nodes to be able to decrypt it
[9:07 PM]jl777c:very good question!
[9:09 PM]jl777c:what i do is encrypt to the publicly known privkey, so all nodes are able to decrypt and the sender that encrypts it can be verified. the reason to do this is now we can validate that any non "inbox" tagged packet with a pubkey was indeed sent by that pubkey. [this also was needed to properly support DEX_cancel as we cant just let anybody cancel a specific order][9:10 pm]jl777c:now, the general method of having networkwide commands is completed, it will be much faster to add new functionality. but for now i want to make sure the current level of code is not losing a lot of sync percentage relative to the best levels we have seen
[9:18 PM]jl777c:@TonyL i have a theory about the lower success rate. are you blasting with ffff ?
[9:19 PM]jl777c:if not, then the mined priority will vary from the specified and when that happens, if a node detects it is lagging, it will start prioritizing. when this happens the lowest priority will start suffering, but if none of the nodes are showing LAG in the status, then it seems this is not the case
[9:21 PM]jl777c:one interesting test is if you change the TXPOWBITS from 1 to 12
[9:22 PM]jl777c:that will lower the total packets you can send, but we can see if it will propagate better at closer to production values
[9:22 PM]jl777c:this blasting is really not a real world packet flow

[9:27 PM]TonyL:
3480: del.0 00000000, RAM.14099 126f3785 R.12655 S.1444 A.14099 dup.0 | L.31006 A.12610 coll.4 | lag 0.000 (22.7381 17.2374 5.1134) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 48 97 225 442 867 1821 3592 6943 LAG 234/sec
3480: del.0 00000000, RAM.14102 6c965b9f R.12652 S.1450 A.14102 dup.0 | L.31004 A.12621 coll.6 | lag 0.000 (22.5825 17.0636 5.0674) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 48 99 225 442 867 1821 3593 6943 LAG 235/sec
3480: del.0 00000000, RAM.14476 285bbfab R.13030 S.15922 A.14476 dup.0 | L.25986 A.12956 coll.10 | lag 0.000 (2.9840 2.6547 1.8606) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 49 100 230 453 887 1866 3680 7147 241/sec
3480: del.0 00000000, RAM.14476 285bbfab R.13024 S.14432 A.14476 dup.0 | L.34016 A.12916 coll.8 | lag 0.000 (18.0724 12.7920 4.1557) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 49 100 230 453 887 1866 3680 7147 LAG 241/sec
3480: del.0 00000000, RAM.14476 285bbfab R.13023 S.15929 A.14476 dup.0 | L.25953 A.12930 coll.8 | lag 0.000 (5.2601 3.8123 2.2754) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 49 100 230 453 887 1866 3680 7147 241/sec
3480: del.0 00000000, RAM.13635 408a3122 R.12185 S.1450 A.13635 dup.0 | L.26741 A.12140 coll.2 | lag 0.000 (14.4639 9.1557 3.1103) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 49 100 230 453 887 1866 3390 6596 LAG 227/sec
3480: del.0 00000000, RAM.14476 285bbfab R.13035 S.29642 A.14476 dup.0 | L.27503 A.12951 coll.5 | lag 0.000 (9.1973 5.8823 2.3889) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 49 100 230 453 887 1866 3680 7147 LAG 241/sec
3480: del.0 00000000, RAM.14476 285bbfab R.13024 S.43198 A.14476 dup.0 | L.25906 A.12882 coll.5 | lag 0.000 (3.9632 2.9501 1.7407) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 49 100 230 453 887 1866 3680 7147 241/sec
3480: del.0 00000000, RAM.12980 0a806d51 R.11532 S.1448 A.12980 dup.0 | L.28105 A.11469 coll.4 | lag 0.000 (23.3158 18.4461 5.7842) err.0 pend.0 T/F 0/0 | 2 0 4 14 14 29 47 88 207 414 794 1666 3350 6351 LAG 216/sec
[9:28 PM]TonyL:there is lag field and also LAG - not sure if it makes the difference
[9:29 PM]jl777c:lag <deleted> (fast medium slow) are the lag times for the deleted packets, for a fast/medium/long term time frame
[9:29 PM]jl777c:200, 1000 and 10000 approx window size for fast, med, slow
[9:30 PM]jl777c:so if you see lags that are worse as it is faster, it is detecting possible lag. the other indicator is pend. if this number goes up steadily it will trigger LAG
[9:30 PM]jl777c:LAG means it is in LAG mode, which is when prioritization kicks in
[9:32 PM]jl777c:so lag (fast, med, slow) + pend -> state of LAG or not. if LAG is detected then a node goes into a much more passive mode and this is when prioritization has its biggest effect. there are several things it does, one of them is for a given runtime context with another peer, it will only request packets of the highest priority. assuming we are not saturating the network, this wont affect things much as eventually all packets are requested
[9:33 PM]jl777c:however if we are lagging, waiting until all the highest priority packets are requested and iterating, means the lowest priorities can be starved and never requested. this is how a low priority packet is "dropped", it is basically never requested
[9:33 PM]jl777c:so no bandwidth wasted for low priority packets that cant be propagated anyway
[9:34 PM]jl777c:i think a lot can be learned by studying the internals of dexp2p, there are a lot of very simple, yet powerful methods, all working together
[9:36 PM]TonyL:why lag detecting only for some of the 10 nodes? They are on the same host and CPU utilized on half
[9:37 PM]TonyL:network latency should be equal for all (~0)
[9:38 PM]TonyL:is lag just indicating that packages "stuck" in lowest priority protocol traffic jam and there is delay from estimated delivery time and it's non-det for equal conditions nodes?
[9:41 PM]jl777c:3480: del.0 00000000, RAM.14476 285bbfab R.13024 S.14432 A.14476 dup.0 | L.34016 A.12916 coll.8 | lag 0.000 (18.0724 12.7920 4.1557) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 49 100 230 453 887 1866 3680 7147 LAG 241/sec
[9:41 PM]jl777c:3480: del.0 00000000, RAM.14476 285bbfab R.13024 S.43198 A.14476 dup.0 | L.25906 A.12882 coll.5 | lag 0.000 (3.9632 2.9501 1.7407) err.0 pend.0 T/F 0/0 | 2 0 4 14 15 29 49 100 230 453 887 1866 3680 7147 241/sec
[9:41 PM]jl777c:they might be on the same host, but the performance seen by those two nodes are quite different
[9:42 PM]TonyL:maybe OS allocating resources between daemons some tricky way
[9:42 PM]jl777c:and as expected there is a large range of priorities
[9:42 PM]jl777c:you cant expect identical performance from 1/Nth of a server
[9:42 PM]jl777c:maybe they all have identical probabilities, but for them to all get the identical performance would be quite unexpected
[9:43 PM]jl777c:like having 10 different nodes toss a coin 1000 times each and all of them getting exactly 500 heads and 500 tails. while possible it is certainly not expected
[9:43 PM]jl777c:your question seems to indicate you expect all nodes to get identical results...
[9:44 PM]TonyL:I thought that if I spin 6 identical processes with resources allocation <<100% they will not be prioritized that much
[9:45 PM]TonyL:It seems better to use docker containers for this test
[9:45 PM]jl777c:the above stats show 100% in sync
[9:45 PM]jl777c:oh, sorry, not all have the same number of total
[9:46 PM]jl777c:the problem is the lag (23.3158 18.4461 5.7842)
[9:46 PM]jl777c:at 20 seconds of lag, it certainly triggers LAG mode
[9:46 PM]jl777c:it seems there is some sort of bandwidth bottleneck?
[9:46 PM]jl777c:what happens with TXPOWBITS 12

[11:24 PM]jl777c:@SHossain latest version should be crashproof. it also should support DEX_cancel id
[11:24 PM]jl777c:support for DEX_cancel 0 <pubkey> is there, just doesnt do anything except make a printout
[11:25 PM]jl777c:but the DEX_cancel id, should actually cancel the order and it shouldnt appear in the orderbooks anymore, you can verify cancelled status in the DEX_list

1:23 AM]jl777c:@SHossain the more important test is to make sure that blasting away on the -dexp2p WLC21 nodes doesnt affect normal WLC21 nodes
[1:24 AM]jl777c:the way to test is to add a normal WLC21 node and monitor its bandwidth usage, compare the bandwidth usage to a -dexp2p WLC21 node during a blaster loop
[1:24 AM]jl777c:we want to make sure the -dexp2p nodes are isolated from the other nodes
[1:24 AM]jl777c:this way, even KMD can get -dexp2p
[1:26 AM]SHossain:you want the -dexp2p nodes to use only -connect= param between both of them?
[1:26 AM]jl777c:no
[1:26 AM]jl777c:they should be normal peers
[1:26 AM]jl777c:and peers of each other
[1:27 AM]jl777c:being the only -dexp2p nodes, all the DEX messaging should be isolated just between the two of them
[1:27 AM]jl777c:we dont want it to bleed over into the normal nodes

4:58 PM]jl777c:once i fix the crashing bug, i will add DEX_cancel pubkey, which will cancel all current orders
[4:58 PM]jl777c:i think already, there is enough functionality for it to be a useful DEX orderbook network
[4:58 PM]jl777c:let me know if there are any missing functionality
[5:00 PM]cipi:sure, will do
one question: the destpub33 that may be specified in the DEX_broadcast is intended to be used as the pubkey of the mm2 node that has the order?
[5:00 PM]jl777c:i changed the name in the rpc help to be pubkey33
[5:00 PM]jl777c:it is a bit quirky
[5:01 PM]jl777c:if the tagA is "inbox", then it is encrypted to the pubkey
[5:01 PM]jl777c:if tagA is anything else, then it serves as authentication and uses the corresponding privkey to encrypt it to a publickly known privkey
[5:02 PM]jl777c:so for DEX_broadcast, yes, use your local nodes pubkey (starting with 01, available from DEX_stats) and that will authenticate the broadcast is coming from your node
[5:02 PM]jl777c:inside the payload can be the bitcoin pubkey, address, utxo list, atomic swap details, etc
[5:03 PM]jl777c:by separating the -dexp2p pubkey from the bitcoin pubkey, this allows to build a reputation based on the -dexp2p pubkey, so you dont have to start from scratch when changing the bitcoin/KMD address
[5:04 PM]jl777c:it does allow a -dexp2p pubkey to behave badly and then change to a new one and reuse the same bitcoin pubkey, but that can be caught by checking to see if a new dexp2p is using a known bitcoin pubkey
[5:05 PM]jl777c:and i guess inheriting whatever reputation it had
[5:05 PM]cipi:ok, that makes sense... was wondering why the pubkey on dexp2p was decoupled from pubkey of mm2... now i understand
but that means that every mm2 node needs to run komodod with dexp2p, right?
[5:05 PM]jl777c:in general, the -dexp2p can be used for broadcasting realtime things, like a bad pubkey for atomic swaps, maybe an tagA "alerts", tagB "swapfail"
[5:06 PM]jl777c:depending on whether -dexp2p will be used as an alternate means or the only means
[5:06 PM]jl777c:it is relatively lightweight if using a small purgetime

5:07 PM]cipi:yes, already saw that is uses much less RAM then "normal" komodod
[5:08 PM]jl777c:it looks like i might have finally fixed the purgetime crash, at least i have my testnet not crashing after 10 minutes so far. it never got past 3 minutes of purging before
[5:09 PM]jl777c:the bug was very subtle and was triggered by packets random lag making the linked list not have a sorted timestamp
[5:09 PM]jl777c:when purging, it stopped if the head of the list was younger than the purgetime, but on the other side of it could well be packets that are already expired
[5:10 PM]jl777c:still this alone isnt enough to cause a crash, it had to combine with not all codepaths being mutex protected, so most of the time it is ok, but this case of having expired packets that are still around allowed some edge cases to cause a 1 in a million ptr corruption
[5:11 PM]jl777c:at least that is my latest theory on this one. i knew i would be punished for not mutexing all codepaths
[5:12 PM]jl777c:before you ask why i didnt simply mutex all codepaths to avoid this pain, the reason is that 90% of the performance is lost if you mutex everything. the key to fast operation is going as fast as you can into the rotating hashtables without worrying about collisions

5:20 PM]cipi:that sounds much more complicated than i first thought
have you changed the default purge time? was is it atm?
[5:20 PM]jl777c:for purge testing it is set to 5 minutes now
[5:21 PM]jl777c:the big complication is the need to make localhost rpc calls to access all the internal data
[5:21 PM]jl777c:this creates all sorts of race conditions
[5:21 PM]jl777c:and when you are processing thousands per second, that is literally several per millisecond
5:24 PM]jl777c:imagine a rotating door where thousands of balls are being tossed into it at one slit (varying by packet lag) and from another slit being extracted and cleanly recycled. if any ball drops on the floor it will cause a crash. oh and all the balls are chained by four linked lists (tagA, tagB, tagAB, pubkey) so as they come into the rotating door they are chained to the most recent other ball (up to 4 different ones). when a ball is recycled, there cant be any reference to it. and you cant stop spinning the doors, it is always going nonstop

5:27 PM]gcharang:is there a reason to expect pubkey33 as a parameter in the case of tagA != "inbox" ?
the node already knows what the DEX_pubkey is. it is either generated randomly for the session or created from the -pubkey that is set
[5:28 PM]jl777c:you might want to send unauthenticated packets
[5:28 PM]gcharang:got it
[5:28 PM]jl777c:i just didnt want to constrain things, probably most all usecases will want authenticated
[5:28 PM]jl777c:but who knows what usecases unauthenticated provides

9:09 PM]jl777c:a much improved new version:

1. i cant reproduce the occasional crash anymore, under many different configurations
2. refactored internals a LOT, memory usage is much less and there is no hard limit to tx/sec rate, though you cant sustain the max rate of 16k/sec for more than maxlagtime of 1 minute
3. latency is improved
4. duplicates and errors shouldnt be any worse
5. higher sync rate for lower priorities
   [9:09 PM]jl777c:please regression test to make sure i didnt break any existing functionality

[6:37 AM]jl777c:pushed fix for cancel deadlock
[6:37 AM]jl777c:also changed how baseamount and relamount are displayed
[6:37 AM]jl777c:the logic is that if it is more than 1 satoshi, 8 decimals is used, if less, then 15 decimals is used. maybe i should use the same logic for price also
[6:38 AM]jl777c:wait a bit, syntax error
[6:42 AM]jl777c:fixed. i had to always used %.08f format for amounts as they are internally 64bits but i made the price display toggle between 8 and 15 decimals based on whether price is >= 0.00000001

6:56 AM]jl777c:now that the crash seems finally fixed, i can continue to add features. cancel all orders for a pubkey was next on my list. i can add a tagA/tagB filter also. that would require 2 calls to cancel all bids and asks
[6:57 AM]jl777c:also, any other feature requests, you can make. i have things pretty extensible internally now and can issue network wide operations that executes, at most one times. it might not get there due to network congestion
[7:03 AM]cipi:in mm2 there is the API-call cancel_all_orders which takes base and rel as argument and that also needs to be called twice to remove both bids and asks (base/rel and rel/base), so it would be the same
i use this call to remove all order from a pair in cases where i can't get a recent price for that pair (coinpaprika down, coin had no volume)
i don't know how the call is implemented internally in mm2... could be it already has a list of orderids and cancels them one by one... so could be that cancel by id in DEXP2P is enough and the rest is done by mm2, but not sure
[7:07 AM]jl777c:i have not gotten much feedback at all from the mm2 devs, so i am just proceeding with the assumption that dexp2p could implement the entire live orderbook. if they end up not using it, it will just be a day or two of coding wasted, but not really wasted as it allows us to make sure it is adequate for the task.
[7:09 AM]jl777c:with DEX_list allowing a low level view of the data from any of the 4 indexes and DEX_orderbook creating ready made orderbooks, it could be than mm2 can just use it as it. since there is no spec for -dexp2p and not much documentation, it is hard for the mm2 team to decide on how much of it to use. maybe if they see they can just use it as the order cache directly, they will. or maybe it will lack some vitally needed functionality or feature, in which case they can use it just as a low level packet fifo

7:19 AM]jl777c:once it is fully working, maybe i will get ambitious some day and port mm1 into it :slight_smile:
[7:20 AM]jl777c:having a realtime comms channel will make things a lot easier to do, but there is no need for such redundant work and i can see a lot of different usecases for -dexp2p that can use some simple reference implementations
[7:23 AM]jl777c:not sure if dexp2p even works on non-unix systems and i dont plan on supporting them if it takes a lot of pain
[7:23 AM]jl777c:but it should just work with windows as i piggybacked onto existing bitcoin peering code
[7:24 AM]jl777c:and no new dependencies, it is all just C code in komodo_DEX.h

[7:26 AM]Sir Seven:any other feature requests
smth like DEX_genpubkey pubkey that will generate new pubkey33 according to pubkey given and DEX_setpubkey pubkey33 to make node use it instead.
The usecases will be - after importing new privkey from other instanse or after generating a brand new one.
[7:27 AM]jl777c:as long as the pubkey is in the wallet, this can be done
[7:27 AM]jl777c:but you cant relaunch with the -pubkey= param?
[7:28 AM]Sir Seven:It's possible, yes, but will be a pain to relaunch for each privkey in wallet.
[7:28 AM]jl777c:i want to avoid -dexp2p being dependent on the wallet too much to make it easier to make an independent implementation
[7:28 AM]jl777c:ok, if it helps, i will add it

8:02 AM]cipi:btw, i can cancel all orders for a pair like this
for i in `komodo-cli -ac_name=DEXP2P DEX_orderbook 10000 0 KMD DGB | jq -r ".[]|.[].id"`; do komodo-cli -ac_name=DEXP2P DEX_cancel \$i; done

and the orders are gone from orderbook immediately, even if there are hundreds of them... and under heavy load
[8:08 AM]jl777c:i tried to make it fast. maybe there is no need for any other cancels?
[8:09 AM]jl777c:if not needed, that is less bugs for me to worry about. i already have the cancel all coded so maybe i just debug that and you get the single order cancel and the cancel absolutely everything
[8:09 AM]jl777c:then using code like above you can clear out orderbooks
[8:13 AM]jl777c:actually with txpowbits of 1, it will be instant, but with production values of around 1 second per command, it would take forever. i think i need to support cancel tagA/tagB directly
[8:13 AM]jl777c:global commands charge a 8x/16x txpow premium
[8:15 AM]jl777c:i guess i can lower it to a 2x and 4x premium for cancel id/cancel pubkey, but still it will take a while to issue 100 commands. the problem is that cancel is not just a local command it needs to not only be broadcast networkwide, it needs to run once on all nodes
[8:15 AM]jl777c:to avoid spam, everything is charging a txpow "fee"
[8:16 AM]jl777c:it will need to be calibrated to match what is a reasonable execution time for the various commands

8:24 AM]cipi:i think a reasonable execution time also depends on how price updates for existing orders are implemented
i think in mm2 the old order is canceled and a new one is created... if this takes 1s per pair and you have 60 pairs, it would be probably too much (i normally do price updates every 90s for all pairs)
but maybe it could be changed, so i don't remove the old order, but only post new ones and the other nodes simply take the order with the most recent timestamp if it finds more than 1 order from one pubkey... on the other hand, this would mean that you can't post more than one order for a pair...
[8:26 AM]jl777c:if you can do 2 cancels in a second, per CPU core, is that fast enough?

[8:27 AM]cipi:yes, i think that should be enough... the nodes with many pairs also have many cores, so it would work
[8:28 AM]jl777c:i havent tested issuing requests in parallel, but i think you should be able to calculate the txpow in parallel
[8:29 AM]cipi:the txpow tells how much cputime is consumed for the operation, right?
[8:30 AM]jl777c:statistically
[8:30 AM]jl777c:each bit makes half the remaining hashes invalid
[8:31 AM]jl777c:so with 12 bits, only 1 in 4096 is valid with a 4 bit premium for cancel that is 1 in 65536
[8:31 AM]jl777c:but if the baseline needs to be 16 bits, then cancel pow will be 20 bits...
[8:31 AM]jl777c:i guess i need to lower it to a premium of 2. one advantage of higher priority is that it propagates a lot better
[8:32 AM]jl777c:so having it 4 more than baseline would maximize its reaching all nodes
[8:33 AM]jl777c:need to tweak the exact costs with some benchmarks. maybe someone can get time to calculate statistics on various systems at various priorities (keeping track of what txpowbits is set to for that version)
[8:37 AM]cipi:is it sufficient to measure the time till DEX_cancel call returns to get the benchmark values? so if i call DEX_cancel couple thousand times i should get a good value.
[8:37 AM]jl777c:just directly specify the priority with a DEX_broadcast
[8:37 AM]jl777c:payload of 4 bytes size
[8:38 AM]jl777c:dont use ffff as the payload that is the special one that blasts
[8:38 AM]cipi:does it need to be different on each call or can i use the same over and over again?
[8:38 AM]jl777c:certainly a few thousand times will give a good value
[8:39 AM]jl777c:you should be able to use the same payload, it calculates a random nonce and also uses timestamp

8:39 AM]jl777c:i have seen occasional collisions from lots of packets in the same second
[8:41 AM]cipi:you mean collisions like in this output?
583: del.1511 6a8b77c7, RAM.0 00000000 R.9442956 S.1331073 A.9444060 dup.15533 | L.22010247 A.9057584 coll.19158 | lag 1.839 (3.3881 2.4727 2.8938) err.0 pend.964 T/F 4075966/4066097 | 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1473/sec
that is from a node that is also a tor relay and does a lot of tor traffic all the time (150-200 MBits in and out all the time)
[8:44 AM]jl777c:no, that is for an internal hashtable
[8:45 AM]jl777c:when broadcasting if your packets id matches an already existing one, it will printout "cant issue duplicate order..."
[8:46 AM]jl777c:i dont flow through the errors yet, but it is very rare
[8:46 AM]jl777c:literally one in a million
[8:46 AM]cipi:never saw one of those :slight_smile:
[8:47 AM]jl777c:i see a few, but only by doing 100 million packets
[9:49 AM]TonyL:automated process so just needed specify here servers ips, amount of nodes per server and spam duration and starting by one command just as python3 dexp2p_auto_deploy.py
100 nodes results on latest: https://paste.ubuntu.com/p/PYRbcHX3MC/ (not used rate limiter and any diff defines)

interesting python lib btw: https://parallel-ssh.readthedocs.io/en/latest/index.html
[1:39 PM]jl777c:network was saturated. you definitely need to add in sleeps, oh i removed them in the core to allow max performance when finding crashes, plus this allows to control it precisely externally
[5:15 PM]TonyL:https://paste.ubuntu.com/p/N9WmQQZFTH/ exactly same configuration but with rate limiting 1 second each 10
[5:15 PM]TonyL:from my perspective looks much more better than first one
[5:17 PM]TonyL:oh, that's not exact configuration, 8 nodes per host also instead of 10 :slight_smile: let me try with 5 and 10 nodes also now to find the better config

5:53 PM]TonyL:https://paste.ubuntu.com/p/vxG9VkJ2V9/ 5 nodes per server with limiter
https://paste.ubuntu.com/p/N9WmQQZFTH/ 8 nodes per server with limiter
https://paste.ubuntu.com/p/tWgt4jZcbS/ 10 nodes per server with limiter

6:28 PM]jl777c:even the 5 nodes per server is a bit laggy. what are the specifics for the limiter?
[6:30 PM]jl777c:can you add 100 millseconds pause after each broadcast?
[6:30 PM]TonyL:

#!/bin/bash

end=$((SECONDS+$3))

while [ $SECONDS -lt $end ]; do
let "c = $SECONDS % 10"
  if (( $c == 0 ))
then
sleep 1
else
TEST="$2"_$(( ( RANDOM % 1000000 ) + 1 ))
curl --user test:test --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "DEX*broadcast", "params": ["'"$TEST"'", "0", "'"$1"'", "", "", "0.1", "100"] }' -H 'content-type: text/plain;' http://127.0.0.1:$1/ >> spam_p2p/packages/\$2*\$1_packages.txt
fi
done
[6:30 PM]jl777c:that would be 10 per node, per second and 1000 per second today
[6:30 PM]TonyL:each 10th second it sleep for a second
[6:30 PM]jl777c:no wonder it saturated
[6:30 PM]TonyL:oh, should sleep each 10th package
[6:31 PM]TonyL:lol
[6:31 PM]jl777c:yes, every 10th, but that makes a fast burst of 10 and if all nodes are doing it, we get a spike of 1000 in a fraction of a second. the buffering should handle it though, that would be a good test
[6:32 PM]jl777c:maybe do 10 nodes per server and sleep for 1 second after every 5 broadcasts
[6:32 PM]jl777c:that is 500 per second, so it should be well below saturation
[6:32 PM]jl777c:if there is a way to do sub-second sleeps, equivalent to usleep() that would be much better control
[6:32 PM]TonyL:isn't it 50 per second?
[6:33 PM]TonyL:oh 10\*10
6:35 PM]TonyL:I'm not a bash expert at all but google saying that we can use just a second fractions like a:
sleep 0.1
[6:35 PM]TonyL:oh or no, need custom functions and etc
[6:38 PM]TonyL:Sad that python is not good for stress testing things.
Will solve it and make spam script works correct after a lunch break
[6:43 PM]jl777c:at txpowbits of 1, a single node will blast out 1000 per second. so 100 nodes will be trying to blast out 100,000 per second, for 10 seconds or a million packets in 10 seconds. definitely saturated as the numbers show. the fact it did as well as it did means even under extreme saturation, the worst that happens is packets dont get delivered, but higher probability for higher priority
[6:44 PM]jl777c:for now just start at 500/sec rate (5 packets, sleep 1 second)
[6:44 PM]TonyL:yeah, and we testing very extreme case when 10 clients spam non stop from single computer - surprised that it not crashes, server not die and etc
[6:44 PM]jl777c:that is still 10x more traffic than on a 10 node network, equivalent to 5000/sec on a 10 nodes
[6:44 PM]jl777c:it is at 32768x production levels possible
[6:46 PM]kmdkrazy:soooo many possibilities, my brain wont stop to focus on one - it just keeps adding more

11:06 PM]jl777c:using this way to validate network config, we can make sure we dont get stuck wondering why the network looks saturated when it is just that the nodes cant really talk to half the other nodes
[11:07 PM]jl777c:now, my testnet is actually on a single server, but it uses something (proxmox?) to create different nodes, each with its own ip address
[11:08 PM]jl777c:so maybe that is a way to get to 100 nodes, but it needs to be tested on a single server if you can setup the same things. noashh did the config for the proxmox
11:17 PM]jl777c:above priority 2 seems to be 100% i sync, lag is good
[11:17 PM]jl777c:try it without any sleeps
[11:17 PM]jl777c:the problem is probably sharing the same "network" interface via localhost, probably not designed to be high performance. somehow proxmox makes it fully independent nodes
[11:18 PM]jl777c:but you are using the same node, just different ports
[11:18 PM]jl777c:at least we know the reason for the bad performance on prior tests
[11:24 PM]TonyL:Yep, virtualization or containerization is needed. But was interesting to find out this limit - we use similar nodes starting structure in unit-tests, so know we surely know that it'll fit only for simple request-response tests.
[11:26 PM]jl777c:i cant predict the lag time with 100 independent nodes, it could be 4 seconds or 10 seconds, if the former, can be tweaked to get to 2 seconds. actually for every general size of network and local connectivity, there will be an optimal set of internal parameters (fanout, maxlag, etc). so we can make sure that the worst performance using the best parameters at each order of magnitude is acceptable
[11:26 PM]jl777c:then as the network grows, we can simply update the parameters
[11:26 PM]jl777c:but as i said, impossible to know without running the tests how it will actually do

11:29 PM]jl777c:certainly, and if the 100 test server network doesnt have good performance, it will only be worse with a real 100 different locations
[11:29 PM]TonyL:yeah, I was not very clever when tested 10 servers with gazillion of packets when single server can't sync 1 package inside
[11:30 PM]jl777c:after the 100 nodes are working well, i want to verify 1000 nodes. if it scales two orders of magnitude with a couple seconds extra lag, then i think that is sufficient
[11:30 PM]jl777c:this is why i always say, get ANY working config first
[11:30 PM]jl777c:without that you can spend months and years wondering where the problem is
[11:30 PM]TonyL:I've tested single server first, just checked wrong params
[11:31 PM]TonyL:or maybe it was fine before, thats strange actually. Because I can remember that when I've selected server cpus amount/nodes amount per server I ran same test
[11:31 PM]TonyL:and numbers in stats were in sync
[11:31 PM]jl777c:maybe you forgot to check the "reliable networking" checkbox

11:33 PM]jl777c:already saturated, at less than 1000/sec
[11:33 PM]jl777c:at least the first half dozen priorities are almost all in sync
[11:34 PM]jl777c:without the sleep, it could be that you are sending out packets so fast, it just cant receive inbound packets. its supposed to be 100% fully duplex... but results show something breaks down without sleep. so even though actual bandwidth used is less than what is supposed to be there, packets are dropped
[11:35 PM]jl777c:this is what i see on my testnet also. so you now can see an in sync test vs saturated test where the lower priority numbers are very different
[11:35 PM]jl777c:a lot of times the packets sent locally is not even getting to any other node
[11:35 PM]TonyL:what if embeed limiter right into the daemon?
[11:36 PM]jl777c:so clearly if the network is saturated, we cant be 100% in sync, the graceful degradation is to make sure the highest priorities are getting there
[11:36 PM]jl777c:the issue is that with txpowbits at 15, you wont get much more than 2 packets per second
[11:36 PM]jl777c:maybe 10 for a fast CPU
[11:37 PM]jl777c:so there is no point to put in sleeps in the core and we need to make sure it gracefully degrades
[11:37 PM]jl777c:which i think it is.
[11:37 PM]jl777c:while waiting for server provisioning, you can validate the percentage syncing of the different priority levels
[11:38 PM]jl777c:then you can throttle the bandwidth used by having a sleep every packet, every 10, every 20, every 30, ... and we can see how the percentage in sync degrades at the various priority levels
[11:38 PM]kmdkrazy:FYI Chewing

11:44 PM]jl777c:already it will create higher priorities, actually for half of them!
[11:44 PM]jl777c:50% at specified priority
[11:44 PM]jl777c:25% at priority+1
[11:44 PM]jl777c:12.5% at +2
[11:44 PM]jl777c:...
[11:44 PM]jl777c:half dropping with each extra priority
[11:45 PM]jl777c:so you need to record the priority that is returned, (or you can just convert the id to hex and count 0 bits)
[11:46 PM]jl777c:so after you send out the packets, you can tell what priority each packet was. given that and knowing which packets are in sync, you can get a tally for sync percentage by priority
[11:49 PM]jl777c:anyway, it seems there are no verified bugs now, so i will go back to writing more of them

[11:38 AM]jl777c:@Sir Seven pushed a version that has DEX_setpubkey. if the wallet doesnt have the privkey, it makes a temporary session specific pubkey, if the wallet does have the privkey, it is like you started with -pubkey= ,but i havent tested actually sending encrypted packets and if the receivers see the proper sender pubkey. let me know if it works
@cipi DEX_cancel now can cancel by id, or if id is 0, by pubkey (all) or if that is "" then by tagA/tagB, but this is totally untested, so it might even crash. let me know if it works
@TonyL i had a feeling something was not quite right and maybe now at lower packets sent, 100 nodes will stay in sync!

[3:43 PM]jl777c:ok, so it seems the new set of bugs are fixed and we now have a much more complete DEX_cancel and also DEX_setpubkey that allows to change the active keypair without restarting. with these things, the current version is a release candidate for the first three levels of the protocol: low level transport, messaging and orderbooks. we still need to validate the routing on 100 and even 1000 node networks, so likely there will need to be tweaks to the networking for that.

while waiting, i will make new bugs with the reliable file transfer layer. that will need a bit of low level support from the routing layer with a new command message and the actual file transfer layer. i am aiming for end of month to get the initial release for that, which will be about when the -dexp2p will be a month since the start of coding

4:38 PM]jl777c:i hardened the hash function to resist ASIC and even fpga, though it isnt impossible for one to be made for this hash algo sha256(curve25519(sha256(msg))), it seems unlikely it will be made just for -dexp2p

5:03 PM]artem.pikulin:Are newly connected nodes supposed to sync their DEX_list with other nodes that already have some data? If yes, how much time should it take? I've restarted my node and see only new messages, but other node has more in its DEX_list.
[5:03 PM]jl777c:currently only new messages are seen. after the purgetime, all nodes will be as much in sync as network bandwidth allows
[5:04 PM]jl777c:in the file sync layer, i will be adding ways to query older messages

5:05 PM]jl777c:the assumption was that the DEX nodes would be online most of the time, so i didnt solve the syncing issue. one big problem is that as the network gets saturated, there really is no way to sync the older packets as nodes are only able to keep up with the current
[5:06 PM]jl777c:one idea is to use significantly higher priority packets for ones you want to be able to sync from the past and then it would be possible for a node to sync up to just these higher priority packets
5:07 PM]jl777c:that is the type of plan i am working on for the file syncing, so maybe for data that wants to be able to be synced from the past is put into "files" and you can use the file sync method for those. like to make an orderbook from a node that has been online for the full purgetime and put that into a "file"
[5:08 PM]jl777c:given that, a node can see the current orderbook from the long time online node and it will have all the info needed to query the specific packets needed for it
[5:09 PM]jl777c:the current design is definitely minimalist and i have only added the bare minimum to achieve orderbook propagation and highest performance. with the tagA/tagB indexing, any sort of special information can be made very easy to find. and the file layer will allow to put whatever critical info is needed for a bootstrapping node
[5:11 PM]jl777c:"tagA":"orderbook", "tagB":"base_rel" could get the localorderbooks from nodes once per 5 minutes, or any other convention to get the required data to bootstrapping nodes
[5:13 PM]jl777c:keep in mind, there could end up being thousands of messages per second, continuously, so being able to keep up with that, while being able to make queries efficiently... that is the main problem that -dexp2p solved. if you have a specific requirement that is not covered, let me know. i will be adding more third layers on top of the basic messaging layer to make it easy to solve other usecases, but the primary usecase for -dexp2p is the scalable DEX orderbook

5:15 PM]jl777c:i think having a way to query all priority 4+ data will help solve the bootstrapping issue and it also works for the file sync layer

[7:33 PM]jl777c:@artem.pikulin updated so that any message with priority of 4 or more will be automatically propagated to new nodes, even if they arrive 59 minutes after the packet was created
[7:34 PM]jl777c:@TonyL this feature might affect some tests if any node is left running
[7:35 PM]jl777c:one quick is that if a node goes offline and comes back online right away, most of the other nodes will most likely think that it has all the messages that it had before going offline
[7:35 PM]jl777c:this decentralized memory effect will come in very handy for file level things and turned out i didnt need any new protocol messages, there is a #define KOMODO_DEX_VIPLEVEL 4
[7:36 PM]jl777c:that can be changed to a different value if 16x the normal pow is not the right amount. i also reduced txpowbits back to 1, it is just so hard to see 10 packets per second from 10 blaster nodes and all CPU at 100%...
[7:37 PM]jl777c:without sleeps, a blasting node wont have enough CPU to keep up.
[7:38 PM]jl777c:also the VIP bootstrapping (and it also works to get closer to 100% sync for VIP packets) could make the lag stats look worse as it might arrive up to a minute late and still be included in the stats. anything over MAXLAG wont affect the stats, but there wasnt an easy way to tell if a packet arrived due to lag or its vipness
[7:39 PM]jl777c:i use a decentralized process to get the VIP packets in sync, ie. if any of your peers notices that you dont have a VIP packet, it will ping you about it. then the node uses the normal request process to pull the missing VIP packet
[7:40 PM]jl777c:not sure i would consider it a bug if there isnt 100% sync for VIP packets, would like to see how well in sync the VIP packets are
[7:40 PM]jl777c:note: for networks not subject to saturation, you can set the VIP level to 0
[7:41 PM]jl777c:@gcharang some details for documentation, VIP priority is subject to change

3:36 PM]jl777c:it should print different types of hex strings when you issue the cancel
[3:36 PM]jl777c:8chars for cancel of id
[3:36 PM]jl777c:66 chars for cancel pubkey
[3:36 PM]jl777c:lenA,tagA,lenB,tagB for cancel by tag pair
[3:37 PM]jl777c:it will be a hexstring that is sent to DEX_broadcast internally. before it was getting semi-random data, usually the pubkey for the payload, so cancelling all orders

5:12 PM]jl777c:the DEX_publish filename will split up the file into 4kb fragments and send them to tagA/tagB of filename/data with volA incrementing
[5:13 PM]jl777c:after all the fragments are sent, it will broadcast a set of locators to filename/locators
[5:13 PM]jl777c:this is all under a specific publishers pubkey
[5:14 PM]jl777c:so a file is really pubkey+filename, filename limited to 15 chars and should be located in the dir that komodod was launched
[5:15 PM]jl777c:for now, this is just a convenient way to blast up to 400MB of data in one command
[5:16 PM]jl777c:but now this is working, the next step is to reconstruct the file on a remote node using DEX_subscribe
all it has to do is get the set of locators with filename/locators and then magically request any missing blocks
[5:17 PM]jl777c:the "magically" part i still need to figure out the best way to do, also it seems there should be some tagA that has a list of published files. this way you can browse a list of available files and then recreate any specific one

5:21 PM]jl777c:it wont be hard to add a paywall before a specific file is broadcast and since it only exists for one hour (or less), the same content can be sold over and over
[5:22 PM]jl777c:anyway, i am just working on the low level functionality and streaming data is a very good test for network efficiency and accuracy as it will be very easy to see if the data is messed up or not

5:36 PM]jl777c:the volA/volB fields are proving to be useful outside of orderbooks, using it to encode things like fragment number, filesize, etc.
[5:37 PM]jl777c:DEX_publish now sends a payload that is the SHA256 of the file that was broadcast in the "files"/fname tags, doing a DEX_list 0 0 files will list all files from all publeys
[5:38 PM]jl777c:while there is nothing at the low level that prevents broadcasting the same filename again from the same pubkey, i will put a check in to prevent that at the rpc level. this will avoid file name collisions in innocent cases

6:23 PM]jl777c:i will be implementing support for streaming files
[6:24 PM]jl777c:basically that is an append only log
[6:24 PM]jl777c:so just stream the debug.log and it would replicate on all nodes that DEX_subscribe to it

7:49 PM]jl777c:this has a lot of baggage from komodod, the actual dexp2p code is just 2500 lines of C
[7:49 PM]jl777c:but i guess even with the entire komodod, when stripped, it is 17MB
[8:18 PM]kmdkrazy:I was going to ask how to build  a nspv / dexp2p only node -- and was wondering if dexp2p could be deployed in a wasm compatable web browser -- but I am just waiting for this first phase to get to production -- my  guess is yes and to"wait for it" -- Streaming  data  with decentralized personal websites and selling/distributing "things" is my  usecase and will probably be where I will  finally hang  my hat and get to work. - waiting is painful - 17mb   -"According to the website HTTP Archive, which regularly studies the top 10,000 most-visited sites online, the average web page now weighs in at about 1.3 megabytes" - I 
 guess a dexp2p "client" could be made smaller - Back to work, Thank you!
[8:28 PM]jl777c:dexp2p client would fit in a 512kb or less, with nsPV support, but that would be a fair amount of refactoring
[8:29 PM]jl777c:-dexp2p option currently drags in the rest of the code
[8:29 PM]jl777c:it would need to be ported into libnspv to have a chance to be able to be put into wasm

9:16 PM]jl777c:@gcharang @SHossain @Sir Seven @TonyL primitive support for DEX_publish and DEX_subscribe is in the latest version. it might be fast enough for smallish (<100MB files) to stream, but it isnt very efficient yet, just the first version that was able to sync file to the network. for now it is just to make sure that a static file is transferred properly. 

DEX_publish filename 0 <- this will publish the local file at lowest priority above the VIP priority level
DEX_list 0 0 files <- this will show a list of all the published files, it will have the sha256 filehash

9:17 PM]jl777c:if you know the filename already you can directly do: DEX_list 0 0 filename locators and get the id from the most recent published by a pubkey
[9:17 PM]jl777c:using that id: DEX_subscribe filename 0 id <- that should recreate the file locally
[9:19 PM]jl777c:to test a basic streaming, start the streaming video recorder and get the filename. then every second do a DEX_publish. horribly inefficient, but if it is the only thing streaming maybe it will be fast enough. on the receiving side, do the DEX_subsribe in a loop with a one second pause.
[9:20 PM]jl777c:probably it is too inefficient to be transfering the entire file every second, but things are setup so it wont be that much more work to broadcast and update just the new data
[9:21 PM]jl777c:of course, the file contents can be anything from text files to video files

7:33 AM]jl777c:you need to DEX_list 0 0 published_file locators
[7:33 AM]jl777c:you subscribe to the locators id
[7:33 AM]jl777c:the files tag is for validating the sha256 and to find what files exist
[7:34 AM]jl777c:think of it this way. at first you have no idea what files are published. how can you discover what files exist?
answer: DEX_list tagA:files
[7:35 AM]jl777c:once you know the filename, you dont need to do the tagA files search anymore, as you know the filename
[7:35 AM]jl777c:given a filename, you need a set of locators
[7:35 AM]jl777c:to do that you search tagA:filename tagB:locators

9:05 AM]jl777c:fixed the DEX_subscribe so it only updates the new data for a file, but the DEX_publish is still brute force. there is a file size limit of about 500MB (for now). this means you can do a DEX_subscribe every second in a loop (with new id), and performance should still be decent.
[9:05 AM]jl777c:it also doesnt handle missing data (yet)
[9:05 AM]jl777c:but on a network that isnt saturated, it seems very unlikely to have missing data
[9:12 AM]jl777c:increased the filesize limit to 4GB, that should be sufficient
[9:45 AM]jl777c:@Sir Seven i added an optional parameter to DEX_subscribe. you can set the id to 0 and specify a pubkey. in that case it will automatically do the filename/locators query for that publisher and use the id of the most recent
[9:46 AM]jl777c:so now you can just do a loop with DEX_subscribe filename 0 0 <pubkey> and it will keep the published file in sync locally

1:46 PM]jl777c:i am not integrating dexp2p into the blockchain side yet, everything is free other than the configurable txpow costs
[1:47 PM]jl777c:file transfer is very easy to test now:
DEX_publish filename 0
on any node: DEX_subscribe filename 0 0 publisherpubkey
[1:47 PM]jl777c:it goes at network bandwidth speeds (with txpowbits set at low level of 1)
2:03 PM]TonyL:with text file worked without problems for me
[2:03 PM]jl777c:try a bigger file
[2:04 PM]jl777c:and we can setup a video streamer that should work until the file gets too big, publish side improvements are next to allow sustained streaming. just curious how big the file can get before it is too slow
[2:04 PM]jl777c:i guess the silly publish logic also makes the subscribe side do redundant operations, but it is all set to be efifcient when the publish side isnt so silly

2:08 PM]TonyL:
 ./komodo-cli -ac_name=DEXFILE DEX_subscribe  LABS-bs.tar.gz 0 0 01572aaf4131ca39d92adc296978c0f5598e07ad2c5760a7367903236f91f48914
{
  "result": "error",
  "error": "tags mismatch",
  "tagA": "testfile.txt",
  "filename": "LABS-bs.tar.gz",
  "tagB": "locators"
}
[2:09 PM]TonyL:from another node I've executed ./komodo-cli -ac_name=DEXFILE DEX_publish LABS-bs.tar.gz 0
[2:09 PM]jl777c:even the same publisher can (and will have) many different locators for the same name
[2:09 PM]TonyL:it's not completed yet tho, not produced any output
[2:09 PM]jl777c:tagA needs to match the filename

2:29 PM]jl777c:currently it only works with 100% sync
[2:29 PM]jl777c:but getting the send side working is more important as for VIP packets, we seem to have 100% sync most all the time
[2:30 PM]jl777c:also, not decided the best way to retrieve any missing packets, leaning toward a decentralized delivery
[2:30 PM]jl777c:due to the filename limitation, might need to have a naming layer that maps from 15 chars to normal full paths
[2:31 PM]jl777c:but of course, that is just  a matter to make a simple naming layer tagA:filename tagB:fullpath, well a modified full path relative to home directory
[2:31 PM]jl777c:all this can be built on top of DEX_publish/DEX_subscribe

2:33 PM]TonyL:also, not decided the best way to retrieve any missing packets, leaning toward a decentralized delivery maybe like a mark packages filesum:piecenumber and if node don't have filesum:piecenumber it starting to ask another peers it's connected to if they got this one
[2:33 PM]TonyL:but it sounds like an easy DDoS :sweat_smile:
[2:34 PM]jl777c:yes, that is the problem to solve, but i have a very promising idea
[2:34 PM]jl777c:@Sir Seven why not filename/metadata and the metadata can be JSON that includes fullpath?

[2:35 PM]Sir Seven:>>metadata can be JSON that includes fullpath?
Sounds like a good idea, actually.
[2:35 PM]jl777c:it happens
[2:35 PM]Sir Seven:But tags have limit in chars.
[2:35 PM]jl777c:so?
[2:35 PM]jl777c:payload doesnt
[2:36 PM]jl777c:26^15 = 1.677259342285726e21
[2:36 PM]jl777c:sufficiently large name space for all the files you can ever make
[2:36 PM]jl777c:remember the benefit is that tagA gets fully indexed

2:36 PM]TonyL:but to where can I write Content-MD5 lets say?
[2:36 PM]jl777c:along with tagA/tagB
[2:37 PM]jl777c:make JSON for whatever metadata you want, broadcast to filename/metadata with the hex of the JSON as the payload
[2:37 PM]jl777c:DEX_get can they extract the hex, which converts right into the JSON
[2:38 PM]TonyL:yep, I've understood the idea, and then we'll need to prove md5sum of metadata with md5sum
[2:39 PM]jl777c:but there is already a sha256 sum
[2:39 PM]jl777c:in the files/filename message
[2:40 PM]jl777c:so the publisher posts what the sha256 sum is and the receiver can verify it, i will add automatic compare to the subscribe process

2:41 PM]jl777c:i decided to use the tagA/tagB mechanism to build most of the pub/sub, instead of creating new internals
[2:42 PM]jl777c:that is how it came together so fast
[2:42 PM]jl777c:i also serves as a good testing of the tag indexing

2:42 PM]jl777c:do a DEX_list 0 0 filename "locators"
[2:43 PM]jl777c:if it isnt there yet, then it is still processing
[2:43 PM]jl777c:another message that is sent is "files"/filename
[2:43 PM]jl777c:that way, all nodes (including publisher) can tell what files are published

2:47 PM]jl777c:yes, timeout probably affected things
[2:48 PM]jl777c:amountA is the file size, amountB is the number of locators
[2:59 PM]jl777c:@TonyL pushed a hardfork version that is limited to 500MB file (test with 100MB or smaller first) also changed network parameters to make it a bit faster, it is hardforking change
[3:00 PM]jl777c:you will see on the subscribe side: write:... prints, that appears for each fragment written to disk
[3:08 PM]jl777c:this allows to verify the efficiency of the subscribe process. currently, if you have a publish in a loop and a subscribe in a loop, it is making all new locators so it would be creating redundant messages, but now there seems to be no bugs with basic functionality i can optimize the publish side
[3:55 PM]TonyL:with 100mb file worked good
[4:29 PM]SHossain:i spoke to my DC. they can provide 61 ipv4 addresses as a package. created a support ticket to get that. need to drive down to my DC on Wednesday to install Vmware ESXi.
[4:37 PM]jl777c:it is very useful to have a bank of ipv4 addresses
[4:40 PM]jl777c:calibrated the network settings to allow 500kb/sec, which is 4mbits, should be plenty even with 50% loss of bandwidth due to retries
[4:42 PM]jl777c:finding a few issues with large files, probably will need to implement the logic to retrieve missing fragments before improving publish
[5:01 PM]jl777c:networking problem was a false alert, i just had many non-updated nodes in the testnet. sync is back to 100%
[5:06 PM]SHossain:i'll update both my nodes now

5:15 PM]jl777c:good. maybe you can test the streaming setup gcharang came up with?
[5:20 PM]gcharang:obs: https://obsproject.com/ to create a file that keeps increasing in size (set the output format to mkv)
vlc:  https://www.videolan.org/index.html to play a file that is being constructed
[5:24 PM]SHossain:sure. let me get in speed
[5:33 PM]SHossain:doing the recommended setup by @gcharang
[5:37 PM]jl777c:you will also need to make a shell script that loops on the subscribe on the receive side, probably put a 1 second sleep on it and a shell script loop on the publish side, but without a 1 second sleep
[6:13 PM]SHossain:@gcharang what will be the streaming service in setup?
[6:14 PM]gcharang:dexp2p is the streaming service :sweat_smile: 
in obs, select the option to save video to file
[6:14 PM]SHossain:oh. so, if i have a .mp4 already i can use that without using OBS?
[6:15 PM]gcharang:yes, you can just stream it to the network using dexp2p and on another node, use subscribe to recreate it and play using vlc
[6:15 PM]gcharang:but mp4 files can't be played properly when they are incomplete
[6:16 PM]SHossain:i see. i will to try both option. but, instead of using .mp4 i will convert that to .mkv


7:02 PM]jl777c:
while true
do
./komodo-cli -ac_name=DEXP2P DEX_publish mkv1.mkv 0
sleep 1
done
[7:02 PM]jl777c:both publishing and subscribing need to be called in a loop to make it stream
[7:02 PM]jl777c:if you think about what publish does, this will make more sense
[7:03 PM]jl777c:it is taking a snapshot of the current file, making fragments out of it and broadcasting each one to the network
[7:03 PM]jl777c:then also posting a locators file, so any other node can reconstruct it
[7:03 PM]jl777c:and also sending a message to files/filename so people can get a list of all the available files
[7:04 PM]jl777c:if any part of the file changes, of course, the existing fragments might be obsolete
[7:04 PM]SHossain:thanks. just getting my head around this streaming
[7:04 PM]SHossain:will upload the video to my server and start streaming from there and will subscribe from my local computer
[7:05 PM]jl777c:just think of it as sending a file to the network
[7:05 PM]jl777c:and the file just keeps growing in size, so you send the updated parts
[7:05 PM]gcharang:
will upload the video to my server and start streaming from there and will subscribe from my local computer
fyi, this won't help in testing the streaming of a file growing in size
[7:06 PM]jl777c:i did just fix one of the last (i hope) bugs with the incremental publish, so definitely update
[7:06 PM]jl777c:you just want to DEX_publish a filename that is growing in size
[7:06 PM]jl777c:be it a debug.liog
[7:06 PM]jl777c:or a video file
[7:06 PM]jl777c:or audio file
[7:06 PM]jl777c:or a novel
[7:07 PM]SHossain:got it.
[7:09 PM]jl777c:the processing of a 200mb publish now takes about 3 minutes the first time and 6 seconds the second time, when there are no changes
[7:10 PM]jl777c:so with a 30 seconds of buffering, this is actually good enough up to those file sizes. i am doing a compare of 100% of the file to catch any changes. if that is changed to just the last block, it will take only milliseconds to do a new DEX_publish
[7:11 PM]jl777c:so its getting closer and closer to being useful
[7:12 PM]jl777c:speed is up to 1MB/sec, and if there are no bugs, i will add a mode for append only files (actually just the last fragment will be allowed to change until it becomes full)
[7:13 PM]jl777c:then it should be able to continously stream until it hits the 1GB file limit. probably we can say that is big enough as it will be taking 15 minutes to broadcast, which is already 25% of the purgelimit

7:19 PM]jl777c:latest code seems to work as expected for me. there is a printout each time a new packet is broadcast and also when a fragment is saved locally. the publish will do subscribe calls automatically to sync and have the same data other nodes would have, and you can see it "write..." when it updates. each printed line requires network wide action (at least for the nodes that are subscribed)
[7:20 PM]jl777c:plz ask any questions, been a long day, not sure how much longer i will be online
[7:22 PM]jl777c:the biggest thing left is the request for missing data, though i am not seeing any need for this so far, still we cant expect the sync to always be 100%, so it is needed. i think after that will just be some small features and bug fixes and the DEX_publish/DEX_subscribe layer will be done. i had allocated this entire week for this so lets find any and all bugs while it is fresh.
[7:22 PM]jl777c:for now dont go over 1GB, and i expect streaming to bog down when the file gets to around 50MB due to the latency, still it is a good test

9:11 PM]jl777c:let me know how big the stream file gets when the playback starts getting inconsistent
[9:11 PM]jl777c:the packets are already broadcast to the network , so any node that is in sync will be able to reconstruct the video stream

[9:30 PM]jl777c:the locators id has to change, otherwise the data represented by the locators cant change
[9:30 PM]jl777c:in
[9:30 PM]jl777c:DEX_stats, is the output matching on both your nodes?
[9:30 PM]jl777c:it seems that maybe some sleeps need to be added in the scripts

9:31 PM]jl777c:yes, each id is the latest id from publish

9:48 PM]jl777c:dont run script on subscriber side
[9:48 PM]jl777c:manually do DEX_subscribe filename 0 0 <pubkey>
[9:48 PM]jl777c:and make sure it updates the id and doesnt make errors

9:52 PM]jl777c:so the bug seems to be the auto-fetching of the id
[9:52 PM]jl777c:it always returns the first one?
[9:52 PM]jl777c:if using id 0 and relying on pubkey?
[9:53 PM]jl777c:this will be a pain to do, but if you can manually copy paste the new ids, it will likely keep the streaming player happy
[9:53 PM]jl777c:and i will need to duplicate this unchanging id bug to get the streaming to work
[9:54 PM]SHossain:i used id = 0 and it fetched the full stream of 197MB
[9:55 PM]SHossain:shall i try the script with id=0 on subscriber node?
[9:55 PM]SHossain:to see if the file continues to grow
[9:55 PM]jl777c:what id were you using in the subscriber script??
[9:55 PM]SHossain:the id from the output of first node
[9:55 PM]jl777c:then of course it wont change
[9:55 PM]jl777c:same id ->same data
[9:55 PM]jl777c:use 0, for it to auto fetch
[9:55 PM]jl777c:bug was in your script
[9:56 PM]SHossain:ok. yes
[9:56 PM]jl777c:it should just be DEX_subscribe filename 0 0 <pubkey>

10:41 PM]jl777c:@SHossain the next test is to see how many streams can be done at the same time. my estimate is that we can do 1000 10kb packets per second, so that is 10MB/sec of bandwidth, if each stream is using 512 kbits/sec that means we can support about 20 streams at once

10:49 PM]jl777c:i am starting to think about how to integrate dexp2p to the coin side of things. keeping in mind that even KMD can run -dexp2p nodes, that means we can make enhanced KMD functionality. a simple feature to add would be a paywall which would add an address and amount needed for a DEX_publish, at first it would just publish that this file would be available if enough funds are sent to the address. then when the funds arrive, the next call to DEX_publish would work normally. it does require trust in the publisher, but it seems the same as for any web purchase
[10:49 PM]jl777c:open to other ideas on what sort of payments linkages are desired for dexp2p
[10:51 PM]jl777c:the content seller should share the paid funds with the nodes that run the dexp2p, so you can make money by running a node, or by selling content. i will need to add network stats tagA, handle registrations (so you can have a handle, pubkey and payment address linked). then the payments can pay to the top N nodes (based on current statistics) in a single sendmany payment along with payment to the content seller
[10:51 PM]jl777c:something like that
[10:52 PM]jl777c:the payments layer will be next, after the file layer is done
[10:52 PM]jl777c:i would also like to be able to substitute payment in lieu of txpow as the txpow really slows things down for large files

11:13 PM]kmdkrazy:Advertisers will pay through nspv pay per click depending on the content - corporation can pay for storage and use....average Joe that only used 5gb has to share 10gb to get personal storage free
[11:14 PM]SHossain:though receiving file size is increasing
[11:14 PM]jl777c:seems network is close to saturation, indeed i will need to add a way to fill in the missing fragments
[11:14 PM]jl777c:it will make the file the full size if it gets the last fragment, just that it will have gaps in the data
[11:14 PM]kmdkrazy:I have more methods written down at my office

11:16 PM]jl777c:you could pay a storage provider to store your data for you long term, it wouldnt be trustless, but rather the model of having a business who needs to provide good service to keep getting paid. the payments could be made incrementally over the duration of the storage contract
[11:17 PM]jl777c:@SHossain the missing data wouldnt align to frames, so it would likely be all broken when there is a missing fragment
[11:17 PM]jl777c:at least we know how to force the network into this state of missing fragments, that is required step to validate the request command i will implement next

[11:18 PM]jl777c:i solved how to make it realtime performance regardless of filesize. a bit tricky, but i should have it done this week

11:37 PM]Mark81:and to find it i need publisher public hash?
[11:38 PM]SHossain:yes
[11:38 PM]jl777c:you can DEX_list 0 0 files
[11:38 PM]jl777c:it will list all published files

11:38 PM]SHossain:when you use DEX_publish, you will see your pubkey33
[11:38 PM]jl777c:from that you can find pubkeys
[11:38 PM]jl777c:and filenames
[11:38 PM]SHossain:DEX_stats also lists publishers pubkey
[11:38 PM]SHossain:i mean for your own node
[11:39 PM]SHossain:let me write a blog post about it then
[11:39 PM]jl777c:if you dont start with -pubkey= then it will generate a session specific keypair
[11:39 PM]jl777c:pubkey needs to be for an address in your wallet

12:30 AM]jl777c:there is no place to upload as the lifetime is one hour, however one thing i wrote above is you can submit (encrypted) data to a service provider who will store it for you for a specified amount of time, with progress payments along the way

1:38 PM]jl777c:@SHossain updated with new version that improved efficiency of the sending. still not totally optimized, but it should be much better. i think it might be able to stream all the way to 1GB size now, though it will get a bit inefficient toward the end when each update will broadcast almost 1MB of locators. to improve this more would need to handle incremental updating on the subscribe side, but that is not so urgent if we can stream all the way to 1GB file. there is a new flag for DEX_publish at the end that defaults to 0, if set to 1, it will rescan the entire file for changes. if 0, it just checks the very end of the file
[1:39 PM]jl777c:so i think now, it should be able to handle multiple streams at the same time much better also
[1:39 PM]jl777c:i have found some files that are getting decryption errors and that needs to be tracked down and fixed, so probably will be a while before any more pub/sub improvements

7:36 PM]SHossain:i can start again with rescan flag when i'm back
[7:37 PM]jl777c:yes, please. and i will start on a way to automatically get the missing blocks (even though they should already get there as they are VIP blocks..., so this will take a while to find and fix the sync bug and add a mechanism that allows to request the missing)

12:37 AM]SHossain:i just downloaded it again without any error on the computer that doesn't have issue to download
[12:37 AM]jl777c:subscribe DOESNT download
[12:37 AM]jl777c:it only constructs a file out of the messages you already have in RAM
[12:37 AM]jl777c:so if you have it 100% in RAM, it wont have errors

12:37 AM]jl777c:if you dont, it will have errors
[12:38 AM]SHossain:not 100% synced
[12:38 AM]SHossain:sorry, i meant the constructs bit but used download instead
[12:39 AM]jl777c:it is a bit different than other methods, i understand it will take a bit of time to get used to how it is working

1:11 AM]jl777c:i have just 2 things left to fix:
a) get sync from 99.99% to 100%
b) automatically compare sha256 from files/filename vs what subscribe gets

if you have any other issues for the DEX_publish/DEX_subscribe layer, let me know sooner than later. i am about to move to the payments layer. fixing bugs while it is top of mind goes 10x to 100x faster

1:14 AM]kmdkrazy:would  ther  be   a reason why subscribe is not saving filename? @SHossain
[1:15 AM]SHossain:how it's being saved now?
[1:15 AM]jl777c:subscribe doesnt save filename
[1:15 AM]kmdkrazy:while true
do
./komodo-cli -ac_name=DEXP2P DEX_subscribe movie3.mkv 0 0 0145a9c3bc35372ff3b7f4301ed380d152d17c3d43da3d651a9cd196221a437f46
sleep 5
done
[1:15 AM]jl777c:unless you mean saving the file
[1:15 AM]SHossain:the format is filename.extension.pubkey33
[1:16 AM]kmdkrazy:file not in folder to view
[1:16 AM]jl777c:movie3.mkv.0145a9c3bc35372ff3b7f4301ed380d152d17c3d43da3d651a9cd196221a437f46 doesnt exist?
[1:16 AM]SHossain:so, it would be movie3.mkv.0145a9c3bc35372ff3b7f4301ed380d152d17c3d43da3d651a9cd196221a437f46 for you

1:24 AM]kmdkrazy:can  ALL codecs be streamed?
[1:24 AM]SHossain:you can stream ANY file type
[1:25 AM]kmdkrazy:i thought packet losses on some formats screw it up
[1:25 AM]SHossain:.txt .pdf .log .exe .doc .docx .mp4 .kmv .avi .3gp etc...
[1:25 AM]jl777c:the idea is that when i get sync from 99.99% to 100%, there wont be any packet loss
[1:25 AM]SHossain:virtually anything as long as the size doesn't exceed 1GB

2:04 PM]Sir Seven:If you try to publish file after cancelling order - daemon stops responding to rpcs.
AE:
./komodo-cli -ac_name=DEXP2P DEX_broadcast messagehere 4 BTC KMD pubkey33 100 20
./komodo-cli -ac_name=DEXP2P DEX_cancel id
./komodo-cli -ac_name=DEXP2P DEX_publish publish.tar.gz 0
Here DEX_publish will fail by timeout, as any other rpc after it.
[2:10 PM]jl777c:what id is being cancelled?
[2:10 PM]jl777c:does it matter, or does it need to be the broadcast right before that is cancelled
[2:13 PM]jl777c:i do DEX_get after the cancel and it works
[2:15 PM]Sir Seven:DEX_get works after cancel, yes. Problem occur right after you issue DEX_publish call.

2:15 PM]Sir Seven:DEX_get works after cancel, yes. Problem occur right after you issue DEX_publish call.
[2:16 PM]Sir Seven:id being cancelled is id of order broadcasted in 1st call above.
[2:17 PM]Sir Seven:Something like this:
1. broadcast a new order.
2. cancel it.
3. publish any file.

12:28 AM]jl777c:update: only id with a pubkey can be cancelled, by that pubkey. that is why cancel wasnt working for me.

5:14 PM]jl777c:@SHossain pushed a version that has initial implementation to request the missing blocks. when you do a subscribe, if there are any fragments missing, it will broadcast and 'R' request to the network. this will make all nodes behave like the VIP block has just arrived and will do the normal pinging to all their neighbors. which should allow the node that is missing the block to pull it from a neighbor
[5:14 PM]jl777c:so do the tests where you were getting 99.99% in sync, but had a few missing and see if this makes it any better, without having negative effects, like longer lag, or increased duplicates, etc.
[5:15 PM]jl777c:i still cant duplicate the cancel + publish deadlock and am waiting for more info @Sir Seven assuming the retrieval of the missing blocks work, that is about the only thing left that i know of before i can start on the payments layer
[5:16 PM]jl777c:@TonyL it would be interesting to see if video can be streamed on the 100 node network

6:52 PM]jl777c:so sparse networks can stream too
[6:52 PM]jl777c:at least a mini network of 3
[6:53 PM]SHossain:i can run the subscribe script on bystander node if you like
[6:53 PM]SHossain:only can't watch the video
[6:53 PM]jl777c:no
[6:53 PM]jl777c:this is the worst config for streaming, so that is the best one to use for testing
[6:53 PM]jl777c:still streaming?
[6:53 PM]SHossain:yes, still streaming
[6:53 PM]jl777c:and DEX.log is growing on which nodes?
[6:56 PM]SHossain:6.4MB on bystander node and 3.4MB on subscriber's node
[6:57 PM]SHossain:3.6MB on publisher node
[6:57 PM]SHossain:growing on bystander node


8:54 PM]jl777c:here is a workaround that should keep things better in sync. do a DEX_broadcast with a higher priority, something like 8 that will dramatically reduce the chance of the locators to not get to the other nodes. then with a 90 second buffer it should sync better
[8:55 PM]jl777c:while these results are pretty good, actually better than i expected as it was just the first level of REQUEST, it is clear i need a fallback in case the REQUEST doesnt bring in the missing. that wont be ready until next week

9:00 PM]jl777c:it really isnt a streaming friendly protocol now on the locators side, so maybe i need to improve that too, however duplicating these missing data cases is very good as it is getting not so easy to do. it could be that priority 8 and 90 seconds buffer without DEX.log will be sufficient to get to 200 to 500 MB

[9:04 PM]jl777c:i want to get test results with the current REQUEST method. then i will lower the data blocks to priority of 0 and see if we can maintain the same performance. if so, that will make it much better as currently it is using VIP priority for data, which is a bit of overkill
[9:06 PM]jl777c:ok, so you are running several tests to see how far it gets and after that i will know what the next steps should be

4:37 AM]Sir Seven:Okay. DEX_publish will be locked only after DEX_cancel.
No matter if you cancel order by id, pubkey pr tags.
Withought using DEX_cancel -> all works just fine, and no calls will be locked after DEX_cancel except publish.
AE: broadcast -> cancel -> broadcast have no issues.
