----help

DEX_broadcast hex [priority [tagA [tagB [destpub33 [volA [volB]]]]]]
DEX_list stopat minpriority tagA tagB destpub33 [minA maxA minB maxB]

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
