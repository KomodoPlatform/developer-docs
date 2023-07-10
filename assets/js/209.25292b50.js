(window.webpackJsonp=window.webpackJsonp||[]).push([[209],{496:function(e,a,t){"use strict";t.r(a);var s=t(10),o=Object(s.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"creating-komodo-smart-chains"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#creating-komodo-smart-chains"}},[e._v("#")]),e._v(" Creating Komodo Smart Chains")]),e._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("h4",{attrs:{id:"requirements-for-creating-a-new-chain"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#requirements-for-creating-a-new-chain"}},[e._v("#")]),e._v(" Requirements for Creating a New Chain")]),e._v(" "),a("ul",[a("li",[e._v("2 nodes with the ability to open ports (a node can be either a computer or a VPS)")]),e._v(" "),a("li",[e._v("At least 4GB RAM each")]),e._v(" "),a("li",[e._v("At least 2 CPU cores each")]),e._v(" "),a("li",[e._v("64-bit Operating System (Ubuntu 18.04 recommended)")]),e._v(" "),a("li",[e._v("Komodo Smart Chain software installed on each\n"),a("ul",[a("li",[e._v("(when the goal is only to build a new Smart Chain, there is no need to sync the KMD main chain)")])])])]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("When you are building and testing a Komodo Smart Chain, please do not hesitate to reach out to us when you are stuck. We wish to make this as easy as possible. Our support agents are available in our "),a("a",{attrs:{href:"https://komodoplatform.com/discord"}},[e._v("#support channel in Discord")]),e._v(" for many hours each day.")])]),e._v(" "),a("h3",{attrs:{id:"basic-info-for-connecting-at-least-two-nodes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#basic-info-for-connecting-at-least-two-nodes"}},[e._v("#")]),e._v(" Basic Info for Connecting At Least Two Nodes")]),e._v(" "),a("p",[e._v("Basic knowledge about how to connect two nodes is recommended for the initial setup.")]),e._v(" "),a("p",[e._v("As per the original blockchain designs of Satoshi Nakamoto, a Komodo Smart Chain does not exist on a single node. Rather, it exists via a connection between two or more nodes. This is the nature of decentralization: it is on the network we rely, rather than a single authority. Therefore, the design of the technology encourages the developer to have two separate nodes which are able to connect over a network.")]),e._v(" "),a("p",[e._v("In the most ideal circumstance, the new Komodo developer will already have two virtual private servers (VPS's) available for testing. VPS's can be cheap and easy to manage. A typical VPS will either have a static external IP or can be assigned one.")]),e._v(" "),a("p",[e._v("If the new developer does not have two VPS's available, setting up a test Smart Chain on two local machines in a home or office-type setting is still achievable, but it may require more troubleshooting.")]),e._v(" "),a("p",[e._v("When using a home or office-type setup, the challenge lies in the way the network is created, and there are myriad network setups.")]),e._v(" "),a("p",[e._v("For example, if the developers are operating on a local router, where the two machines are connected via wifi, the local ip addresses of the machines are harder to find. This is because the router assigns new local ip addresses to the machines each time they re-connect to the router. It is not possible to see the ip addresses from the Internet. In this situation, the developer must log into the router's software interface and search for the currently assigned local ip addresses.")]),e._v(" "),a("p",[e._v("A home or office-type setup can suffice, if you're just looking to test an Smart Chain quickly and don't want to spend money on a VPS. However, don't be surprised if you need to ask for help. Please reach out to us, and we'll help the best we can.")]),e._v(" "),a("p",[e._v("To test the creation of a Smart Chain using only a single node, "),a("RouterLink",{attrs:{to:"/basic-docs/smart-chains/smart-chain-tutorials/creating-a-smart-chain-on-a-single-node.html#introduction"}},[e._v("see these linked instructions.")])],1),e._v(" "),a("p",[e._v("To prepare for the next step, execute the following command in the terminal on both machines:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" ifconfig.me\n")])])]),a("p",[e._v("From the response, record the "),a("code",[e._v("ip address")]),e._v(" value for additional use.")]),e._v(" "),a("p",[e._v("With the ip addresses available, we are now prepared to test the connection between the machines.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("ping")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("insert the "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("ip")]),e._v(" address of the other machine here"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("\n")])])]),a("p",[e._v("This command will generate a response every second, indicating the "),a("code",[e._v("ping")]),e._v(" speed with which your machines are able to connect.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("ping")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("192.168")]),e._v(".1.101\n\nPING "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("192.168")]),e._v(".1.101 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("192.168")]),e._v(".1.101"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("56")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("84")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" bytes of data\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("64")]),e._v(" bytes from "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("192.168")]),e._v(".1.101: "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("icmp_seq")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("ttl")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("64")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("time")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("131")]),e._v(" ms\n\n"),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("64")]),e._v(" bytes from "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("192.168")]),e._v(".1.101: "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("icmp_seq")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("ttl")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("64")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("time")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2.40")]),e._v(" ms\n\n")])])]),a("p",[e._v("If you do not see a similar response in the shell, your machines are not able to connect. Please reach out to our team and we will do our best to assist you.")]),e._v(" "),a("h2",{attrs:{id:"part-i-creating-a-new-komodo-smart-chain"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#part-i-creating-a-new-komodo-smart-chain"}},[e._v("#")]),e._v(" Part I: Creating a New Komodo Smart Chain")]),e._v(" "),a("p",[e._v("With your machines successfully able to "),a("code",[e._v("ping")]),e._v(" each other, you are ready to create your first Smart Chain.")]),e._v(" "),a("p",[e._v("The following instructions use the simplest possible set of parameters in creating a new Smart Chain: a coin with the ticker symbol "),a("code",[e._v("HELLOWORLD")]),e._v(", "),a("code",[e._v("777777")]),e._v(" pre-mined coins, and a block reward of "),a("code",[e._v(".0001")]),e._v(".")]),e._v(" "),a("p",[e._v("On your first node, change into the directory where Komodo's "),a("code",[e._v("komodod")]),e._v(" and "),a("code",[e._v("komodo-cli")]),e._v(" are installed and execute the following commands in the terminal:")]),e._v(" "),a("h4",{attrs:{id:"mac-gnu-linux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mac-gnu-linux"}},[e._v("#")]),e._v(" Mac & GNU/Linux")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodod "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_supply")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("777777")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-addnode")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("IP address of the second node"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&")]),e._v("\n")])])]),a("h4",{attrs:{id:"windows"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#windows"}},[e._v("#")]),e._v(" Windows")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodod.exe "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_supply")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("777777")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-addnode")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("IP address of the second node"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&")]),e._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("If you want the Smart Chain to have Antara Modules enabled, please include the "),a("RouterLink",{attrs:{to:"/basic-docs/antara/antara-setup/antara-customizations.html#ac-cc"}},[e._v("-ac_cc")]),e._v(" parameter with the required value in your launch parameters on both the nodes.")],1)]),e._v(" "),a("h3",{attrs:{id:"verify-the-response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#verify-the-response"}},[e._v("#")]),e._v(" Verify the Response")]),e._v(" "),a("p",[e._v("After issuing this command in the terminal on both machines, you will find the p2p port in the terminal window.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),e._v(" HELLOWORLD: p2p.8096 rpc.8097 magic.c89a5b16 "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("3365559062")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("777777")]),e._v(" coins\n")])])]),a("p",[e._v("In the above string, take note of the p2p and RPC ports, as well as the magic number. These values must match on both nodes for the chains to be identical. If they are not the same, verify that the launch command is the same on both the nodes.")]),e._v(" "),a("p",[e._v("In the example above, the p2p port is "),a("code",[e._v("8096")]),e._v(". Make sure that the p2p port is open to the internet or any other network from which the second node connects.")]),e._v(" "),a("p",[e._v("This completes the first half of the Smart Chain creation process. Scroll down to "),a("RouterLink",{attrs:{to:"/basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.html#part-ii-connecting-the-second-node"}},[e._v("Part II")]),e._v(".")],1),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Please refer to "),a("RouterLink",{attrs:{to:"/basic-docs/antara/antara-setup/antara-customizations.html#ac-algo"}},[e._v("Antara Customization parameters")]),e._v(" for a full list of parameters to customize the characteristics of your blockchain.")],1)]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Please note the requirements for "),a("RouterLink",{attrs:{to:"/basic-docs/antara/antara-setup/antara-customizations.html#ac-supply"}},[e._v("ac_supply")]),e._v(", and instructions for using "),a("RouterLink",{attrs:{to:"/basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#addnode"}},[e._v("addnode")]),e._v(" under various network conditions, including firewalls and LANs.")],1)]),e._v(" "),a("h2",{attrs:{id:"part-ii-connecting-the-second-node"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#part-ii-connecting-the-second-node"}},[e._v("#")]),e._v(" Part II: Connecting the Second Node")]),e._v(" "),a("p",[e._v("On the second node you issue the same command, but with a key difference. This time, use the first node's IP address.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodod "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_supply")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("777777")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-addnode")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("IP address of the first node"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&")]),e._v("\n")])])]),a("p",[e._v("Once the daemon loads, compare the string that starts with "),a("code",[e._v(">>>>>>>>>>")]),e._v(" in the second node to the one from the first node to make sure they are identical.")]),e._v(" "),a("p",[e._v("Mining can be started on a node using the following command:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD setgenerate "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),e._v("nproc"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v("\n")])])]),a("p",[a("code",[e._v("$(nproc)")]),e._v(" in the above command makes the daemon mine using all the available CPU threads, which might be necessary in a low end VPS.")]),e._v(" "),a("p",[e._v("On a Komodo-based blockchain, all of the pre-mined coins are mined in the first block. Therefore, whichever machine executes the mining command will receive the entirety of the blockchain's pre-mined coin supply, as set in the "),a("RouterLink",{attrs:{to:"/basic-docs/antara/antara-setup/antara-customizations.html#ac-supply"}},[e._v("ac_supply")]),e._v(" parameter. Upon mining the first block, these coins are available in the default "),a("code",[e._v("wallet.dat")]),e._v(" file.")],1),e._v(" "),a("p",[e._v("To collect all the mining rewards from the node to a single address, execute the following commands before issuing the "),a("code",[e._v("setgenerate")]),e._v(" command:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Get a new address")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("newaddress")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),e._v("./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD getnewaddress"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Get the corresponding pubkey")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("pubkey")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),e._v("./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD validateaddress $newaddress "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" jq "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-r")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'.pubkey'")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Indicate the pubkey to the daemon")]),e._v("\n./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD setpubkey "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$pubkey")]),e._v("\n")])])]),a("p",[e._v("After issuing the mining command is issued, can check that the two nodes are connected by using the following command:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD getinfo "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("grep")]),e._v(" connections\n")])])]),a("p",[e._v("If the nodes are properly connected, both nodes will respond with: "),a("code",[e._v('"connections": 1')])]),e._v(" "),a("p",[e._v("These are the coins you will later distribute to your community, using either our native DEX, "),a("RouterLink",{attrs:{to:"/basic-docs/atomicdex/atomicdex-tutorials/introduction-to-atomicdex.html#why-is-atomicdex-special"}},[e._v("KomoDeFi")]),e._v(", or our decentralized-ICO software (coming soon), or on any other third-party exchange.")],1),e._v(" "),a("p",[e._v("You can check the contents of the wallet by executing the following command in the terminal:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD getwalletinfo\n")])])]),a("p",[e._v("To verify that everything is properly initiated, send a few coins from the second node to the first node:")]),e._v(" "),a("collapse-text",{attrs:{hidden:"",title:"Commands"}},[a("h3",{attrs:{id:"node1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node1"}},[e._v("#")]),e._v(" Node1")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("newaddress")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),e._v("./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD getnewaddress"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$newaddress")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Copy the returned address for use on the other node")]),e._v("\n")])])]),a("h3",{attrs:{id:"node2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node2"}},[e._v("#")]),e._v(" Node2")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Send ten coins to the address generated on the first node")]),e._v("\n./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD sendtoaddress Address_from_the_first_node "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("10")]),e._v("\n")])])]),a("h3",{attrs:{id:"node1-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node1-2"}},[e._v("#")]),e._v(" Node1")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("./komodo-cli "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-ac_name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("HELLOWORLD getreceivedbyaddress "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("insert address_from_the_first_node"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The 0 argument in the above command instructs the daemon to include the unconfirmed coin balance in the response")]),e._v("\n")])])])]),e._v(" "),a("p",[e._v("More info can be found in the debug.log of the chain found at:")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("MacOS:")]),e._v(" "),a("code",[e._v("~/.komodo/HELLOWORLD/debug.log")])]),e._v(" "),a("li",[a("strong",[e._v("Windows:")]),e._v(" "),a("code",[e._v("%appdata%\\komodo\\HELLOWORLD\\debug.log")])]),e._v(" "),a("li",[a("strong",[e._v("GNU/Linux:")]),e._v(" "),a("code",[e._v("~/.komodo/HELLOWORLD/debug.log")])])]),e._v(" "),a("h2",{attrs:{id:"querying-the-smart-chain"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#querying-the-smart-chain"}},[e._v("#")]),e._v(" Querying the Smart Chain")]),e._v(" "),a("p",[e._v("Using the "),a("code",[e._v("komodo-cli")]),e._v(" software, which is included in any default installation of "),a("code",[e._v("komodod")]),e._v(", you can now execute many commands on your new Smart Chain. This enables you to perform transactions, create and execute smart contracts, store data in KV storage, etc.")]),e._v(" "),a("p",[e._v("Since the Komodo software began as a fork of Zcash and BTC, essentially all commands that are available on these two upstream blockchains are also available on your new Smart Chain.")]),e._v(" "),a("p",[e._v("Furthermore, a key purpose of the Komodo blockchain is to create features and functions that facilitate and enhance your development experience. Information regarding these enhancements is available throughout this documentation.")]),e._v(" "),a("p",[e._v("In addition, since you are building on a Komodo-based blockchain, you have easy access to our multi-coin wallet and atomic-swap powered decentralized exchange through the "),a("RouterLink",{attrs:{to:"/basic-docs/atomicdex/atomicdex-tutorials/introduction-to-atomicdex.html#why-is-atomicdex-special"}},[e._v("Komodo DeFi Framework")]),e._v(", the Antara development framework and modules, our decentralized-ICO software, and our future upgrades.")],1),e._v(" "),a("h2",{attrs:{id:"example-commands"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-commands"}},[e._v("#")]),e._v(" Example commands")]),e._v(" "),a("p",[e._v("To see general information about your new Smart Chain, execute this command:")]),e._v(" "),a("p",[a("code",[e._v("./komodo-cli -ac_name=HELLOWORLD getinfo")])]),e._v(" "),a("p",[e._v("The following command returns information about all available RPC and API commands:")]),e._v(" "),a("p",[a("code",[e._v("./komodo-cli -ac_name=HELLOWORLD help")])]),e._v(" "),a("h2",{attrs:{id:"secure-this-smart-chain-with-delayed-proof-of-work"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#secure-this-smart-chain-with-delayed-proof-of-work"}},[e._v("#")]),e._v(" Secure this Smart Chain with Delayed Proof of Work")]),e._v(" "),a("p",[e._v('Your new Smart Chain can receive the same security of the Bitcoin hash rate through our security mechanism, called "delayed Proof of Work" (dPoW).')]),e._v(" "),a("p",[e._v('There are two aspects to the cost for dPoW services. The first comes from the cost of making records in your Smart Chain\'s database, and in the records of the KMD main chain. These records are called "notarizations."')]),e._v(" "),a("p",[e._v("Notarizations are performed as transactions on your blockchain and on the main KMD blockchain. The transactions have messages included inside that indicate the most recent and secure state of your Smart Chain. Your Komodo Smart Chain will know how to recognize and rely on notarizations automatically.")]),e._v(" "),a("p",[e._v("Every ten to twenty minutes, our notary nodes will hash the history of your Smart Chain and insert it as a record into the KMD main chain. This provides an initial layer of security, but it is not the final layer.")]),e._v(" "),a("p",[e._v("In another ten to twenty minutes, all of the information in the KMD chain (including your Smart Chain's hashed data) is hashed and inserted into the BTC blockchain. Once your information is pushed into BTC, your Smart Chain will consider all notarized information effectively settled and immutable; only the recent, un-notarized transactions are still relying on your Smart Chain's raw consensus mechanism. "),a("RouterLink",{attrs:{to:"/basic-docs/antara/antara-setup/antara-customizations.html#ac-staked"}},[e._v("Click here to learn more about the types of consensus mechanisms you can choose on a KMD Smart Chain")]),e._v(".")],1),e._v(" "),a("p",[e._v("Thus, your Smart Chain will have all the power of Bitcoin securing your blockchain's history, with the zero-knowledge privacy of the Zcash parameters pre-installed, and all of the interoperability, scalability, and more that Komodo adds to your development experience.")]),e._v(" "),a("p",[e._v("As the notarizations are transactions, they naturally have a cost, and this cost is covered by you, the Smart Chain developer. Over the course of a year, assuming consistent activity, the cost for performing these transactions is 365 KMD, and also 365 of your Smart Chain's coins.")]),e._v(" "),a("p",[e._v("There are extra costs involved that are aimed to compensate the Notary Nodes for the setup and maintainance of the dPOW service. You may reach out to our third-party service providers to receive a quote. They can provide various services related to Smart Chain creation, electrum-server (SPV) setup and maintenance, explorer setup, and other blockchain services.")]),e._v(" "),a("p",[a("RouterLink",{attrs:{to:"/basic-docs/start-here/about-komodo-platform/orientation.html#production-smart-chains-typically-require-komodo-s-security-services"}},[a("b",[e._v("Click Here for the List of Third-Party Service Providers")])])],1),e._v(" "),a("p",[e._v("Several teams have already signed up for our services and are developing on our platform. From our experience with them we can confidently say that our pricing is competitive compared to other blockchain services. Furthermore, when considering that a Komodo-based Smart Chain does not require KMD for gas and transaction fees, the cost to your end-users can be exponentially cheaper. All things considered, creating a fully independent blockchain on Komodo can cost but a small fraction of what it would cost to deploy a single smart contract on the platforms of some of our competitors.")]),e._v(" "),a("h3",{attrs:{id:"a-note-about-low-activity-blockchains"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#a-note-about-low-activity-blockchains"}},[e._v("#")]),e._v(" A Note About Low-Activity Blockchains")]),e._v(" "),a("p",[e._v("Blockchain technology relies on a network of users using the blockchain and sharing data to function.")]),e._v(" "),a("p",[e._v("Smart Chains that are built for low-activity networks require extra steps from the developer to ensure proper syncing between nodes.")]),e._v(" "),a("p",[e._v("If you are building a Smart Chain and would like more information on maintaining constant syncing across nodes, our "),a("RouterLink",{attrs:{to:"/basic-docs/start-here/about-komodo-platform/orientation.html#production-smart-chains-typically-require-komodo-s-security-services"}},[a("b",[e._v("third-party service providers")])]),e._v(" can provide dedicated support for this topic. Please also reach out to our support team and community on "),a("a",{attrs:{href:"https://komodoplatform.com/discord",target:"_blank",rel:"noopener noreferrer"}},[a("b",[e._v("Discord.")]),a("OutboundLink")],1)],1)],1)}),[],!1,null,null,null);a.default=o.exports}}]);