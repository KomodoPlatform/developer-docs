var redirectAliases = require("./public/_redirects.js");
module.exports = {
  plugins: {
    redirect: {
      alias: redirectAliases
    }
  },
  title: "Komodo Documentation",
  base: "/",
  description: "Documentation for developers building on Komodo",
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "komodoplatform/Documentation",
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: "Github",

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    //docsRepo: 'vuejs/vuepress',
    // if your docs are not at the root of the repo:
    docsDir: "docs",
    // if your docs are in a specific branch (defaults to 'master'):
    //docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Suggest an improvement for this page",
    lastUpdated: "Last Updated",
    nav: [
      {
        text: "Start Here",
        link: "/basic-docs/start-here/introduction.md"
      },
      {
        text: "Whitepaper",
        link: "/whitepaper/introduction.md"
      },
      {
        text: "Guides",
        items: [
          {
            text: "Komodo",
            link: "/komodo/installation.md"
          },
          {
            text: "Asset Chains",
            link: "/assetchains/beginner-vps-linux.md"
          },
          {
            text: "Notary Nodes",
            link: "/notary/setup-Komodo-Notary-Node.md"
          },
          {
            text: "Marketmaker V1",
            link: "/mmV1/introduction.md"
          }
        ]
      },
      {
        text: "CC Book",
        link: "/cc-jl/introduction.md"
      },
      {
        text: "Agama",
        link: "/gui/agama/introduction.md"
      },
      {
        text: "Resources",
        items: [
          {
            text: "Komodo Platform",
            link: "/resources/list-all-KomodoPlatform-repos-links.md"
          },
          {
            text: "Third Party",
            link: "/resources/third-party-repos-resources.md"
          }
        ]
      },
      {
        text: "KomodoPlatform.com",
        link: "https://komodoplatform.com"
      }
    ],
    sidebar: {
      "/basic-docs/": [
        {
          title: "Start Here",
          collapsable: true,
          children: [
            ["/basic-docs/start-here/introduction.md", "Introduction"],
            [
              "/basic-docs/start-here/outline-for-new-developers.md",
              "Outline for New Developers"
            ],
            [
              "/basic-docs/start-here/custom-consensus-overview.md",
              "Overview of Custom Consensus"
            ]
          ]
        },
        {
          title: "Installation and Setup",
          collapsable: true,
          children: [
            [
              "/basic-docs/installations/basic-instructions.md",
              "Basic Installation Instructions"
            ],
            [
              "/basic-docs/installations/creating-asset-chains.md",
              "Asset Chain Creation"
            ],
            [
              "/basic-docs/installations/common-runtime-parameters.md",
              "Launch Settings & Maintenance"
            ],
            [
              "/basic-docs/installations/asset-chain-parameters.md",
              "Custom Asset Chains Parameters"
            ]
          ]
        },
        {
          title: "Custom Consensus",
          collapsable: true,
          children: [
            [
              "/basic-docs/customconsensus/custom-consensus-instructions.md",
              "About Custom Consensus (CC)"
            ],
            [
              "/basic-docs/customconsensus/activate-custom-consensus-assetchain.md",
              "Activate Custom Consensus modules on an Existing Komodo Assetchain"
            ],
            ["/basic-docs/customconsensus/channels.md", "Channels"],
            ["/basic-docs/customconsensus/dice.md", "Dice"],
            ["/basic-docs/customconsensus/faucet.md", "Faucet"],
            ["/basic-docs/customconsensus/dilithium.md", "Dilithium"],
            ["/basic-docs/customconsensus/gateways.md", "Gateways"],
            ["/basic-docs/customconsensus/heir.md", "Heir"],
            ["/basic-docs/customconsensus/musig.md", "MuSig"],
            ["/basic-docs/customconsensus/oracles.md", "Oracles"],
            ["/basic-docs/customconsensus/rewards.md", "Rewards"],
            ["/basic-docs/customconsensus/rogue.md", "Rogue"],
            ["/basic-docs/customconsensus/sudoku.md", "Sudoku"],
            ["/basic-docs/customconsensus/tokens.md", "Tokens"]
          ]
        },
        {
          title: "Komodo API",
          collapsable: true,
          children: [
            ["/basic-docs/komodo-api/address.md", "Address"],
            ["/basic-docs/komodo-api/blockchain.md", "Blockchain"],
            ["/basic-docs/komodo-api/cclib.md", "CC Lib"],
            ["/basic-docs/komodo-api/control.md", "Control"],
            ["/basic-docs/komodo-api/disclosure.md", "Disclosure"],
            ["/basic-docs/komodo-api/generate.md", "Generate"],
            ["/basic-docs/komodo-api/mining.md", "Mining"],
            ["/basic-docs/komodo-api/jumblr.md", "Jumblr"],
            ["/basic-docs/komodo-api/network.md", "Network"],
            ["/basic-docs/komodo-api/rawtransactions.md", "Raw Transactions"],
            ["/basic-docs/komodo-api/util.md", "Util"],
            ["/basic-docs/komodo-api/wallet.md", "Wallet"]
          ]
        }
      ],
      "/whitepaper/": [
        {
          title: "Komodo’s Method Of Security: Delayed Proof Of Work (dPoW)",
          collapsable: true,
          children: [
            [
              "/whitepaper/introduction.md",
              "Komodo (Advanced Blockchain Technology, Focused On Freedom)"
            ],
            [
              "/whitepaper/chapter1.md",
              "A Foundational Discussion of Blockchain Security"
            ],
            [
              "/whitepaper/chapter2.md",
              "Pow is Currently the Most Secure Form of Consensus Mechanisms"
            ],
            ["/whitepaper/chapter3.md", "The Komodo Solution"]
          ]
        },
        {
          title: "The Decentralized Initial Coin Offering(dICO)",
          collapsable: true,
          children: [
            [
              "/whitepaper/chapter4.md",
              "Abstract of the Decentralized Initial Coin Offering"
            ],
            ["/whitepaper/chapter5.md", "The Komodo Solution"]
          ]
        },
        {
          title:
            "Komodo’s Atomic-Swap Powered, Decentralized Exchange: Barterdex",
          collapsable: true,
          children: [["/whitepaper/chapter6.md", "Abstract (BarterDEX)"]]
        },
        {
          title: "Komodo’s Native Privacy Feature: Jumblr",
          collapsable: true,
          children: [["/whitepaper/chapter7.md", "Abstract (Jumblr)"]]
        },
        {
          title: "Additional Information Regarding the Komodo Ecosystem",
          collapsable: true,
          children: [
            [
              "/whitepaper/chapter8.md",
              "Final Notes Regarding the Komodo Project"
            ]
          ]
        },
        {
          title: "References",
          collapsable: true,
          children: [["/whitepaper/references.md", "References"]]
        }
      ],
      "/cc-jl/": [
        [
          "/cc-jl/introduction.md",
          "How to write UTXO based CC modules for KMD based chains - by jl777"
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
        ["/cc-jl/faq.md", "Frequently asked Questions"]
      ],
      "/gui/agama/": [
        {
          title: "Agama",
          collapsable: true,
          children: [
            ["/gui/agama/introduction.md", "Introduction"],
            [
              "/gui/agama/change-log-agama-desktop.md",
              "Change log - Agama Desktop"
            ]
          ]
        },
        {
          title: "Multi Signature transactions in Agama",
          collapsable: true,
          children: [
            [
              "/gui/agama/create-multisig-address.md",
              "Generate a multisig address using Agama"
            ],
            [
              "/gui/agama/sign-multisig-transaction.md",
              "Sign multisig transaction in Agama"
            ]
          ]
        },
        {
          title: "Coin Integrations to Agama Desktop",
          collapsable: true,
          children: [
            [
              "/gui/agama/desktop/add-Bitcoin-Compatible-coin-Agama-Desktop.md",
              "Add a Bitcoin Compatible coin to Agama Desktop"
            ],
            [
              "/gui/agama/desktop/add-ERC20-token-Agama-Desktop.md",
              "Add ERC20 Tokens to Agama Desktop"
            ],
            [
              "/gui/agama/desktop/add-Komodo-Assetchains-Agama-Desktop.md",
              "Add Komodo Assetchains to Agama Desktop"
            ]
          ]
        },
        {
          title: "Coin Integrations to Agama Mobile",
          collapsable: true,
          children: [
            [
              "/gui/agama/mobile/add-Bitcoin-Compatible-coin-Agama-Mobile.md",
              "Add a Bitcoin Compatible coin to Agama Mobile"
            ],
            [
              "/gui/agama/mobile/add-ERC20-token-Agama-Mobile.md",
              "Add ERC20 Tokens to Agama Mobile"
            ],
            [
              "/gui/agama/mobile/add-Komodo-Assetchains-Agama-Mobile.md",
              "Add Komodo Assetchains to Agama Mobile"
            ]
          ]
        }
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
              "Standard Security Setup for Nodes"
            ],
            ["/komodo/setup-electrumX-server.md", "Setup ElectrumX Server"]
          ]
        },
        {
          title: "Features and Announcements",
          collapsable: true,
          children: [
            ["/komodo/dPoW-conf.md", "Confirmations are now dPoW aware"],
            [
              "/komodo/note-exchanges.md",
              "A note to Exchanges regarding 'Rewards'"
            ],
            [
              "/komodo/block-1M-changes.md",
              "Changes to Komodo Blockchain at Block Height 1 Million"
            ],
            ["/komodo/coin-emission.md", "Inflation Mechanisms"],
            ["/komodo/info.md", "Information of various Eco-system coins"]
          ]
        },
        {
          title: "Developers",
          collapsable: true,
          children: [
            [
              "/komodo/npm-module-komodo-rewards.md",
              "NPM module to calculate Komodo Rewards"
            ],
            [
              "/komodo/python-rpc-komodod.md",
              "Access komodo daemon through Python"
            ],
            [
              "/komodo/convert-pubkey-address.md",
              "Convert Pubkey to Komodo Address"
            ],
            ["/komodo/using-Key-Value.md", "Using the Key-Value feature"]
          ]
        },
        {
          title: "Testing & QA",
          collapsable: true,
          children: [
            ["/komodo/debug-Komodo.md", "Debug Komodo with 'gdb'"],
            [
              "/komodo/test-komodo-source-jl777-branch.md",
              "Test komodo source from jl777 branch to make sure all the assetchains sync from scratch properly"
            ]
          ]
        }
      ],
      "/assetchains/": [
        [
          "/assetchains/beginner-vps-linux.md",
          "A Beginner's Guide to starting with the world of Remote UNIX environments and creating Komodo Blockchains"
        ],
        [
          "/assetchains/example-asset-chains.md",
          "Examples and descriptions of various Blockchains that can be created using Komodo Platform"
        ],
        ["/assetchains/checklist-new-coin.md", "Checklist for New Coins"]
      ],
      "/mmV1/": [
        {
          title: "Installation",
          collapsable: true,
          children: [
            ["/mmV1/introduction.md", "Introduction"],
            [
              "/mmV1/installation/install-marketmakerV1.md",
              "Installing marketmakerV1 in Linux and MacOS"
            ],
            [
              "/mmV1/installation/install-marketmakerV1-windows.md",
              "Installing marketmakerV1 in Windows"
            ],
            [
              "/mmV1/installation/install-ETOMIC-marketmakerV1.md",
              "Installing marketmakerV1 with ETOMIC enabled"
            ]
          ]
        },
        {
          title: "Coin integrations",
          collapsable: true,
          children: [
            [
              "/mmV1/coin-integration/coin-integration.md",
              "Get your Coin Token Asset listed on barterDEX"
            ],
            [
              "/mmV1/coin-integration/info-add-coin.md",
              "How to submit a Pull Request to add a coin to BarterDEX"
            ],
            [
              "/mmV1/coin-integration/electrum-servers-list.md",
              "List of Electrum Servers"
            ],
            [
              "/mmV1/coin-integration/list-of-all-coins-tradable.md",
              "List of coins tradable using MarketmakerV1"
            ]
          ]
        },
        {
          title: "Usage",
          collapsable: true,
          children: [
            [
              "/mmV1/usage/enable-electrum-wallet-coins.md",
              "Enabling Electrum Wallet Coins"
            ],
            [
              "/mmV1/usage/enable-native-wallet-coins.md",
              "Enabling Native Wallet Coins"
            ],
            ["/mmV1/usage/trade.md", "Trading"],
            [
              "/mmV1/usage/funding-smart-address.md",
              "Funding the Smart Address"
            ]
          ]
        },
        {
          title: "Guides",
          collapsable: true,
          children: [
            [
              "/mmV1/guides/extract-wif-privkey-from-passphrase.md",
              "Extracting WIF/privkey using mmV1"
            ],
            [
              "/mmV1/guides/0conf-deposit-claim.md",
              "Processing InstantDEX swap in mmV1"
            ],
            [
              "/mmV1/guides/mmV1-Network-Optimization.md",
              "Network Optimisations & Configuration of mmV1 on a Very FAST Computer"
            ],
            [
              "/mmV1/guides/private-swap-using-mmV1.md",
              "Private Trading using mmV1"
            ],
            [
              "/mmV1/guides/manual-claim-legacy-0conf-deposit.md",
              "Manually Claim 0conf Deposits Using Linux"
            ],
            [
              "/mmV1/guides/using-remote-narketmaker-binary-with-GUI.md",
              "Using Remote marketmaker binary with GUI"
            ],
            [
              "/mmV1/guides/compile-marketmaker-binary-with-static-nanomsg-in-Linux.md",
              "Compile marketmaker Binary with Static nanomsg in Linux"
            ],
            [
              "/mmV1/guides/compile-marketmaker-binary-with-static-nanomsg-in-MacOS.md",
              "Compile marketmaker Binary with Static nanomsg in MacOS"
            ]
          ]
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
            ["/mmV1/api/instantswap.md", "InstantDEX SWAP"]
          ]
        },
        {
          title: "Miscellaneous",
          collapsable: true,
          children: [
            [
              "/mmV1/misc/setup-Bitcoin-Cash-mmV1.md",
              "Setup Bitcoin Cash for mmV1"
            ],
            [
              "/mmV1/misc/marketmakerV1-ErrorCodes.md",
              "MarketmakerV1 Error Codes"
            ],
            [
              "/mmV1/misc/index-coin-configs-install-instructions.md",
              "Configuration and Installation Instructions for coins supported on mmV1"
            ],
            [
              "/mmV1/misc/anatomy-of-a-ETOMIC-swap.md",
              "Anatomy of an ETOMIC swap"
            ],
            [
              "/mmV1/misc/setup-Bob-node-using-mmV1.md",
              "Be a marketmaker or Bob node using mmV1"
            ],
            [
              "/mmV1/misc/setup-FR-full-relay-node-mmV1.md",
              "Setting up a Full Relay(FR) Node for mmV1"
            ],
            [
              "/mmV1/misc/zeroconf-API-implementation-BarterDEX-GUI.md",
              "How zeroconf API was implemented in BarterDEX GUI"
            ]
          ]
        }
      ],
      "/notary/": [
        {
          title: "Basics",
          collapsable: true,
          children: [
            ["/notary/setup-Komodo-Notary-Node.md", "Setup Komodo Notary Node"],
            ["/notary/update-Komodo-manually.md", "How to update Komodo"],
            [
              "/notary/assetchains-guide-Komodo-Notary-Node.md",
              "Assetchains Guide for Notary Nodes"
            ],
            [
              "/notary/updating-Komodo-Notary-Node.md",
              "Updating a Komodo Notary Node"
            ],
            [
              "/notary/split-utxo-for-notarization.md",
              "How to Split UTXO for Notarization"
            ]
          ]
        },
        {
          title: "Utilities",
          collapsable: true,
          children: [
            [
              "/notary/generate-privkeys-third-party-coins-from-passphrase.md",
              "How to Generate Address and Private Key (WIF) for 3rd Party Coins Using Passphrase"
            ],
            [
              "/notary/monitor-your-Komodo-Notary-Node.md",
              "Monitor your Komodo Notary Node"
            ],
            [
              "/notary/useful-commands-Komodo-Notary-Node.md",
              "Useful commands for Komodo Notary Node"
            ]
          ]
        }
      ],
      "/": ["", "/basic-docs/start-here/introduction.md"]
    }
  }
};
