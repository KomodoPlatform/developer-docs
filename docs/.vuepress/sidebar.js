// We're using nested sidebar groups now.
// See this PR on the VuePress Github for more information:
//
// https://github.com/vuejs/vuepress/pull/1257

var sidebar = [{
    title: "Komodo Platform Overview",
    collapsible: true,
    children: [
        {
            title: 'Start Here',
            collapsible: true,
            children: 
            [
                [
                    "/basic-docs/komodo-platform-overview/start-here/about-komodo-platform.md",
                    "About Komodo Platform"
                ],
                [
                    "/basic-docs/komodo-platform-overview/start-here/orientation.md",
                    "Orientation"
                ],
            ]
        },
        {
            title: "Educational Outline",
            collapsible: true,
            children: 
            [
                [
                    "/basic-docs/komodo-platform-overview/educational-outline/educational-outline.md",
                    "Educational Outline"
                ],
            ]
        },
        {
            title: "Comprehensive Tutorials",
            collapsible: true,
            children:
            [
                [
                    "/basic-docs/komodo-platform-overview/comprehensive-tutorials/comprehensive-tutorials.md",
                    "Comprehensive Tutorials"
                ],
            ]
        },
    ]
  },
  {
        title: "Smart Chain Setup",
        collapsible: true,
        children: [
            [
                "/basic-docs/smart-chains/get-started-smart-chains.md",
                "Get Started | Smart Chains"
            ],
        ]
  },
  // {
      // title: "Developer Tutorials",
      // collapsible: true,
      // children: [
          // [
            // "/basic-docs/developer-tutorials/tutorial-outline.md",
            // "Tutorial Outline"
          // ],
          // [
            // "/basic-docs/developer-tutorials/create-a-default-smart-chain.md",
            // "Create a Default Smart Chain"
          // ],
          // [
            // "/basic-docs/developer-tutorials/smart-chain-api-basics.md",
            // "Smart Chain API Basics"
          // ],
          // [
            // "/basic-docs/developer-tutorials/fluidity-overview.md",
            // "Fluidity Overview (combine)"
          // ],
          // [
            // "/basic-docs/developer-tutorials/fluidity-instructions.md",
            // "About Fluidity (combine)"
          // ],
          // [
            // "/basic-docs/developer-tutorials/fluidity-conceptual-overview.md",
            // "Fluidity Conceptual Overview (combine)"
          // ],
            // [
                // "/basic-docs/developer-tutorials/introduction-to-atomicdex.md",
                // "Introduction to AtomicDEX"
            // ],
            // [
                // "/basic-docs/atomicdex/atomicdex-walkthrough.md",
                // "AtomicDEX Walkthrough"
            // ],
      // ]
  // },
  {
    title: "Smart Chain API",
    collapsible: true,
    children: [
      [
          "/basic-docs/smart-chains/smart-chain-api/address.md",
          "Address"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/blockchain.md",
          "Blockchain"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/cclib.md",
          "CC Lib"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/control.md",
          "Control"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/disclosure.md", 
          "Disclosure"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/generate.md",
          "Generate"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/mining.md",
          "Mining"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/jumblr.md",
          "Jumblr"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/network.md",
          "Network"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/rawtransactions.md",
          "Raw Transactions"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/util.md",
          "Util"
      ],
      [
          "/basic-docs/smart-chains/smart-chain-api/wallet.md",
          "Wallet"
      ]
    ]
  },
  {
    title: "Fluidity Module API",
    collapsible: true,
    children: [
      [
          "/basic-docs/fluidity/channels.md", 
          "Channels"
      ],
      [
          "/basic-docs/fluidity/dice.md", 
          "Dice"
      ],
      [
          "/basic-docs/fluidity/faucet.md", 
          "Faucet"
      ],
      [
          "/basic-docs/fluidity/gateways.md", 
          "Gateways"
      ],
      [
          "/basic-docs/fluidity/heir.md", 
          "Heir"
      ],
      [
          "/basic-docs/fluidity/musig.md", 
          "MuSig"
      ],
      [
          "/basic-docs/fluidity/oracles.md", 
          "Oracles"
      ],
      [
          "/basic-docs/fluidity/rewards.md", 
          "Rewards"
      ],
      [
          "/basic-docs/fluidity/rogue.md", 
          "Rogue"
      ],
      [
          "/basic-docs/fluidity/sudoku.md", 
          "Sudoku"
      ],
      [
          "/basic-docs/fluidity/tokens.md", 
          "Tokens"
      ]
    ]
  },
  {
    title: "AtomicDEX API",
    collapsible: true,
    children: [
        [
            "/basic-docs/atomicdex/atomicdex-api.md", 
            "AtomicDEX API"
        ]
    ]
  }
]

module.exports = sidebar;
