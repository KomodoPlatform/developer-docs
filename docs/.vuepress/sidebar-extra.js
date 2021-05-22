var sidebarImport = require("./sidebar.js");

var sidebar = {
  "/basic-docs/start-here/": sidebarImport[0].children,
  "/basic-docs/smart-chains/": sidebarImport[1].children,
  "/basic-docs/antara/": sidebarImport[2].children,
  "/basic-docs/atomicdex/": sidebarImport[3].children,
  "/whitepaper/": [
    {
      title: "Komodo’s Method Of Security: Delayed Proof Of Work (dPoW)",
      collapsable: true,
      children: [
        [
          "/whitepaper/introduction.md",
          "Komodo (Advanced Blockchain Technology, Focused On Freedom)",
        ],
        [
          "/whitepaper/chapter1.md",
          "A Foundational Discussion of Blockchain Security",
        ],
        [
          "/whitepaper/chapter2.md",
          "Pow is Currently the Most Secure Form of Consensus Mechanisms",
        ],
        ["/whitepaper/chapter3.md", "The Komodo Solution"],
      ],
    },
    {
      title: "The Decentralized Initial Coin Offering(dICO)",
      collapsable: true,
      children: [
        [
          "/whitepaper/chapter4.md",
          "Abstract of the Decentralized Initial Coin Offering",
        ],
        ["/whitepaper/chapter5.md", "The Komodo Solution"],
      ],
    },
    {
      title: "Komodo’s Atomic-Swap Powered, Decentralized Exchange: Barterdex",
      collapsable: true,
      children: [["/whitepaper/chapter6.md", "Abstract (BarterDEX)"]],
    },
    {
      title: "Komodo’s Native Privacy Feature: Jumblr",
      collapsable: true,
      children: [["/whitepaper/chapter7.md", "Abstract (Jumblr)"]],
    },
    {
      title: "Additional Information Regarding the Komodo Ecosystem",
      collapsable: true,
      children: [
        ["/whitepaper/chapter8.md", "Final Notes Regarding the Komodo Project"],
      ],
    },
    {
      title: "References",
      collapsable: true,
      children: [["/whitepaper/references.md", "References"]],
    },
  ],
  "/cc-jl/": [
    [
      "/cc-jl/introduction.md",
      "How to write UTXO based CC modules for KMD based chains - by jl777",
    ],
    ["/cc-jl/chapter00.md", "Chapter 00 - Bitcoin Protocol Basics"],
    ["/cc-jl/chapter01.md", "Chapter 01 - OP_CHECKCRYPTOCONDITION"],
    ["/cc-jl/chapter02.md", "Chapter 02 - CC Contract Basics"],
    ["/cc-jl/chapter03.md", "Chapter 03 - CC vins and vouts"],
    ["/cc-jl/chapter04.md", "Chapter 04 - CC RPC Extensions"],
    ["/cc-jl/chapter05.md", "Chapter 05 - CC Validation"],
    ["/cc-jl/chapter06.md", "Chapter 06 - Faucet Example"],
    ["/cc-jl/chapter07.md", "Chapter 07 - Rewards Example"],
    ["/cc-jl/chapter08.md", "Chapter 08 - Assets Example"],
    ["/cc-jl/chapter09.md", "Chapter 09 - Dice Example"],
    ["/cc-jl/chapter10.md", "Chapter 10 - Channels Example"],
    ["/cc-jl/chapter11.md", "Chapter 11 - Oracles Example"],
    ["/cc-jl/chapter12.md", "Chapter 12 - Limitless Possibilities"],
    ["/cc-jl/chapter13.md", "Chapter 13 - Different Languages"],
    ["/cc-jl/chapter14.md", "Chapter 14 - Runtime Bindings"],
    ["/cc-jl/chapter15.md", "Chapter 15 - RPC based dAPPS"],
    ["/cc-jl/faq.md", "Frequently asked Questions"],
  ],
  "/komodo/": [
    {
      title: "General",
      collapsable: true,
      children: [
        ["/komodo/installation.md", "Installing Komodo"],
        ["/komodo/encrypt-wallet.md", "Encrypt wallet.dat"],
        [
          "/komodo/security-setup-full-node.md",
          "Standard Security Setup for Nodes",
        ],
        ["/komodo/setup-electrumX-server.md", "Setup ElectrumX Server"],
        [
          "/komodo/multisig-transactions-on-komodo-or-assetchains.md",
          "Dealing with Multisig addresses and transactions",
        ],
      ],
    },
    {
      title: "Features and Announcements",
      collapsable: true,
      children: [
        ["/komodo/dPoW-conf.md", "Confirmations are now dPoW aware"],
        [
          "/komodo/note-exchanges.md",
          "A note to Exchanges regarding 'Rewards'",
        ],
        [
          "/komodo/block-1M-changes.md",
          "Changes to Komodo Blockchain at Block Height 1 Million",
        ],
        ["/komodo/coin-emission.md", "Inflation Mechanisms"],
        ["/komodo/info.md", "Information of various Eco-system coins"],
      ],
    },
    {
      title: "Developers",
      collapsable: true,
      children: [
        [
          "/komodo/npm-module-komodo-rewards.md",
          "NPM module to calculate Komodo Rewards",
        ],
        [
          "/komodo/python-rpc-komodod.md",
          "Access komodo daemon through Python",
        ],
        [
          "/komodo/convert-pubkey-address.md",
          "Convert Pubkey to Komodo Address",
        ],
        ["/komodo/use-bitcore-lib-komodo.md", "Using `bitcore-lib-komodo`"],
        ["/komodo/using-Key-Value.md", "Using the Key-Value feature"],
      ],
    },
  ],
  /* "/assetchains/": [
      [
        "/assetchains/beginner-vps-linux.md",
        "A Beginner's Guide to starting with the world of Remote UNIX environments and creating Komodo Blockchains"
      ],
      [
        "/assetchains/create-asset-chain-single-node.md",
        "Create and test an Asset Chain using a Single Node"
      ],
      [
        "/assetchains/example-asset-chains.md",
        "Examples and descriptions of various Blockchains that can be created using Komodo Platform"
      ],
      ["/assetchains/checklist-new-coin.md", "Checklist for New Coins"]
    ], */
  "/mmV1/": [
    {
      title: "Installation",
      collapsable: true,
      children: [
        ["/mmV1/introduction.md", "Introduction"],
        [
          "/mmV1/installation/install-marketmakerV1.md",
          "Installing marketmakerV1 in Linux and MacOS",
        ],
        [
          "/mmV1/installation/install-marketmakerV1-windows.md",
          "Installing marketmakerV1 in Windows",
        ],
        [
          "/mmV1/installation/install-ETOMIC-marketmakerV1.md",
          "Installing marketmakerV1 with ETOMIC enabled",
        ],
      ],
    },
    {
      title: "Coin integrations",
      collapsable: true,
      children: [
        [
          "/mmV1/coin-integration/coin-integration.md",
          "Get your Coin Token Asset listed on barterDEX",
        ],
        [
          "/mmV1/coin-integration/info-add-coin.md",
          "How to submit a Pull Request to add a coin to BarterDEX",
        ],
        [
          "/mmV1/coin-integration/electrum-servers-list.md",
          "List of Electrum Servers",
        ],
        [
          "/mmV1/coin-integration/list-of-all-coins-tradable.md",
          "List of coins tradable using MarketmakerV1",
        ],
      ],
    },
    {
      title: "Usage",
      collapsable: true,
      children: [
        [
          "/mmV1/usage/enable-electrum-wallet-coins.md",
          "Enabling Electrum Wallet Coins",
        ],
        [
          "/mmV1/usage/enable-native-wallet-coins.md",
          "Enabling Native Wallet Coins",
        ],
        ["/mmV1/usage/trade.md", "Trading"],
        ["/mmV1/usage/funding-smart-address.md", "Funding the Smart Address"],
      ],
    },
    {
      title: "Guides",
      collapsable: true,
      children: [
        [
          "/mmV1/guides/extract-wif-privkey-from-passphrase.md",
          "Extracting WIF/privkey using mmV1",
        ],
        [
          "/mmV1/guides/0conf-deposit-claim.md",
          "Processing InstantDEX swap in mmV1",
        ],
        [
          "/mmV1/guides/mmV1-Network-Optimization.md",
          "Network Optimisations & Configuration of mmV1 on a Very FAST Computer",
        ],
        [
          "/mmV1/guides/private-swap-using-mmV1.md",
          "Private Trading using mmV1",
        ],
        [
          "/mmV1/guides/manual-claim-legacy-0conf-deposit.md",
          "Manually Claim 0conf Deposits Using Linux",
        ],
        [
          "/mmV1/guides/using-remote-narketmaker-binary-with-GUI.md",
          "Using Remote marketmaker binary with GUI",
        ],
        [
          "/mmV1/guides/compile-marketmaker-binary-with-static-nanomsg-in-Linux.md",
          "Compile marketmaker Binary with Static nanomsg in Linux",
        ],
        [
          "/mmV1/guides/compile-marketmaker-binary-with-static-nanomsg-in-MacOS.md",
          "Compile marketmaker Binary with Static nanomsg in MacOS",
        ],
      ],
    },
    {
      title: "API",
      collapsable: true,
      children: [
        ["/mmV1/api/introduction.md", "Introduction"],
        ["/mmV1/api/general.md", "General"],
        ["/mmV1/api/trading.md", "Trading"],
        ["/mmV1/api/status.md", "Status/Info"],
        ["/mmV1/api/tradebots.md", "TradeBots"],
        ["/mmV1/api/coinfeatures.md", "Coin Features"],
        ["/mmV1/api/statistics.md", "Statistics"],
        ["/mmV1/api/revsharing.md", "Revenue Sharing/Operations"],
        ["/mmV1/api/instantswap.md", "InstantDEX SWAP"],
      ],
    },
    {
      title: "Miscellaneous",
      collapsable: true,
      children: [
        [
          "/mmV1/misc/setup-Bitcoin-Cash-mmV1.md",
          "Setup Bitcoin Cash for mmV1",
        ],
        ["/mmV1/misc/marketmakerV1-ErrorCodes.md", "MarketmakerV1 Error Codes"],
        [
          "/mmV1/misc/index-coin-configs-install-instructions.md",
          "Configuration and Installation Instructions for coins supported on mmV1",
        ],
        ["/mmV1/misc/anatomy-of-a-ETOMIC-swap.md", "Anatomy of an ETOMIC swap"],
        [
          "/mmV1/misc/setup-Bob-node-using-mmV1.md",
          "Be a marketmaker or Bob node using mmV1",
        ],
        [
          "/mmV1/misc/setup-FR-full-relay-node-mmV1.md",
          "Setting up a Full Relay(FR) Node for mmV1",
        ],
        [
          "/mmV1/misc/zeroconf-API-implementation-BarterDEX-GUI.md",
          "How zeroconf API was implemented in BarterDEX GUI",
        ],
      ],
    },
  ],
  "/notary/": [
    {
      title: "Basics",
      collapsable: true,
      children: [
        ["/notary/setup-Komodo-Notary-Node.md", "Setup Komodo Notary Node"],
        ["/notary/update-Komodo-manually.md", "How to update Komodo"],
        /*[
          "/notary/smartchains-guide-Komodo-Notary-Node.md",
          "Smart Chains Guide for Notary Nodes"
        ],
        [
          "/notary/updating-Komodo-Notary-Node.md",
          "Updating a Komodo Notary Node"
        ], */
        [
          "/notary/split-utxo-for-notarization.md",
          "How to Split UTXO for Notarization",
        ],
        [
          "/notary/generate-privkeys-third-party-coins-from-passphrase.md",
          "How to Generate Address and Private Key (WIF) for 3rd Party Coins Using Passphrase",
        ],
      ],
    },
  ],
  /* "/mmV2/": [
         [
             "/mmV2/LP/atomicdex-api-docker-telegram.md", "How To Become a Liquidity Provider for AtomicDEX with Telegram Notifications using Docker"
         ],
         ["/mmV2/LP/walkthrough.md", "How to be a Liquidity Provider for AtomicDEX"] 
     ], */
  "/qa/": [
    {
      title: "Komodo",
      collapsable: true,
      children: [
        ["/qa/debug-Komodo.md", "Debug Komodo with 'gdb'"],
        [
          "/qa/test-komodo-source-jl777-branch.md",
          "Test komodo source from jl777 branch to make sure all the assetchains sync from scratch properly",
        ],
      ],
    },
    {
      title: "AtomicDEX-mobile",
      collapsable: true,
      children: [
        [
          "/qa/adb-logcat.md",
          "Use adb to collect GUI logs of the AtomicDEX android app",
        ],
        [
          "/qa/extract-swap-data-atomicDEX-log.md",
          "How to extract swap data from a AtomicDEX mobile log file",
        ],
        [
          "/qa/recover-atomicDEX-mobile-swap-desktop.md",
          "How to recover a swap that failed in AtomicDEX mobile using CLI on a Desktop",
        ],
      ],
    },
    {
      title: "AtomicDEX-CLI",
      collapsable: true,
      children: [
        ["/qa/atomicDEX-quickstart.md", "Start using or testing AtomicDEX"],
      ],
    },
    {
      title: "AtomicDEX-Desktop",
      collapsable: true,
      children: [
        ["/qa/atomicDEX-PRO/build.md", "Build AtomicDEX Desktop from source"],
      ],
    },
    {
      title: "Misc",
      collapsable: true,
      children: [
        ["/qa/blockscout-deployment-guide.md", "Blockscout deployment guide"],
      ],
    },
  ],
  "/": sidebarImport,
};

module.exports = sidebar;
