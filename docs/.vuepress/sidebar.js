// We're using nested sidebar groups now.
// See this PR on the VuePress Github for more information:
//
// https://github.com/vuejs/vuepress/pull/1257

var sidebar = [
    {
        title: "Start Here",
        collapsible: true,
        children: [
            {
                title: 'About Komodo Platform',
                collapsible: true,
                children:
                [
                    [
                        "/basic-docs/start-here/about-komodo-platform/about-komodo-platform.md",
                        "Platform Overview"
                    ],
                    [
                        "/basic-docs/start-here/about-komodo-platform/product-introductions.md",
                        "Product Introductions"
                    ],
                    [
                        "/basic-docs/start-here/about-komodo-platform/orientation.md",
                        "Doc Orientation & FAQ"
                    ],
                    [
                        "/basic-docs/start-here/about-komodo-platform/simple-installations.md",
                        "Simple Installations"
                    ],
                ]
            },
            {
                title: "Learning Launchpad",
                collapsible: true,
                children: 
                [
                    [
                        "/basic-docs/start-here/learning-launchpad/learning-path-outlines.md",
                        "Learning Path Outlines"
                    ],
                    [
                        "/basic-docs/start-here/learning-launchpad/terminology.md",
                        "Terminology"
                    ],
                ]
            },
            {
                title: "General Tutorials",
                collapsible: true,
                children:
                [
                    [
                        "/basic-docs/start-here/general-tutorials/introduction-to-general-tutorials.md",
                        "Introduction to General Tutorials"
                    ],
                    [
                        "/basic-docs/start-here/general-tutorials/basic-environment-setup-for-linux-vps.md",
                        "Basic Environment Setup for Linux VPS"
                    ],
                    [
                        "/basic-docs/start-here/general-tutorials/general-tutorial-1.md",
                        "General Tutorial 1"
                    ],
                    [
                        "/basic-docs/start-here/general-tutorials/general-tutorial-2.md",
                        "General Tutorial 2"
                    ],
                    [
                        "/basic-docs/start-here/general-tutorials/comprehensive-tutorials-type-b-beginner.md",
                        "Comprehensive Tutorial | Type B Beginner"
                    ],
                    [
                        "/basic-docs/start-here/general-tutorials/comprehensive-tutorials-type-b-intermediate.md",
                        "Comprehensive Tutorial | Type B Intermediate"
                    ],
                    [
                        "/basic-docs/start-here/general-tutorials/comprehensive-tutorials-type-b-advanced.md",
                        "Comprehensive Tutorial | Type B Advanced"
                    ],
                ]
            },
        ]
    },
  {
    title: "Smart Chains",
    collapsible: true,
    children: [
        [
            "/basic-docs/smart-chains/introduction-to-smart-chain-documentation.md",
            "Introduction to Smart Chain Documentation"
        ],
        {
            title: "Smart Chain Setup", 
            collapsible: true,
            children: [
                [
                    "/basic-docs/smart-chains/smart-chain-setup/installing-from-source.md",
                    "Installing Smart Chain Software From Source Code"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-setup/updating-from-source.md",
                    "Updating Smart Chain Software From Source Code"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-setup/interacting-with-smart-chains.md",
                    "Interacting with Smart Chains"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-setup/ecosystem-launch-parameters.md",
                    "Ecosystem Smart Chain Launch Commands"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-setup/smart-chain-maintenance.md",
                    "Smart Chain Maintenance"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.md",
                    "Common Runtime Parameters"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-setup/smart-chain-customizations.md",
                    "Smart Chain Customizations"
                ],
            ],
        },
        {
            title: "Smart Chain Tutorials",
            collapsible: true,
            children: [
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/introduction-to-smart-chain-tutorials.md",
                    "Introduction to Smart Chain Tutorials"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.md",
                    "Create a Default Smart Chain"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/launching-with-a-single-node-tutorial.md",
                    "Launching with a Single Node"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/running-komodod-in-debug-mode.md",
                    "Running komodod in Debug Mode"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/multisignature-transaction-creation-and-walkthrough.md",
                    "Multisignature Transaction Creation and Walktrough"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/smart-chain-api-basics.md",
                    "Smart Chain API Basics"
                ],
            ],
        },
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
            ],
        },
    ]
  },
    {
        title: "Fluidity",
        collapsible: true,
        children: [
            [
                "/basic-docs/fluidity/introduction-to-fluidity.md",
                "Introduction to Fluidity Documentation"
            ],
            {
                title: "Fluidity Setup",
                collapsible: true,
                children: [
                    [
                        "/basic-docs/fluidity/fluidity-setup/fluidity-instructions.md", 
                        "Understanding Fluidity Addresses"
                    ],
                ],
            },
            {
                title: "Fluidity Tutorials",
                collapsible: true,
                children: [
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/introduction-to-fluidity-tutorials.md", 
                            "Introduction to Fluidity Tutorials"
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/fluidity-overview.md", 
                            "Fluidity Overview"
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/fluidity-conceptual-overview.md", 
                            "Fluidity Conceptual Overview"
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/advanced-fluidity-tutorial.md", 
                            "Advanced Fluidity Tutorial"
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/musig-module-tutorial.md", 
                            "Musig Module Tutorial" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/heir-module-tutorial.md", 
                            "Heir Module Tutorial" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/payments-module-tutorial.md", 
                            "Payments Module Tutorial" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/fluidity-design-and-methods.md", 
                            "Fluidity Design and Methods" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/ensuring-exclusivity-using-batontxid.md", 
                            "Ensuring Exclusivity Using Batontxid" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/supply-chain-fluidity-module-tutorial.md", 
                            "Supply Chain Fluidity Module Tutorial" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/create-an-oracles-plan-tutorial.md", 
                            "Create anOracles Plan Tutorial" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/transactionality-dao-fluidity-tutorial.md", 
                            "Transactionality DAO Fluidity Tutorial" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/attack-vector-on-commit-and-reveal-methods.md", 
                            "Understanding the Attack Vector on Commit and Reveal Methods" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/rogue-module-tutorial.md", 
                            "Rogue Module Tutorial" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/gateways-module-tutorial.md", 
                            "Gateways Module Tutorial" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/what-are-vin-vout-scriptpubkey.md", 
                            "What are vin, vout, scriptPubkey" 
                        ],
                        [
                            "/basic-docs/fluidity/fluidity-tutorials/jl777-rewrite/00-chapter.md", 
                            "Rewrite Mastering Cryptoconditions" 
                        ],
                ],
            },
          {
            title: "Fluidity API",
            collapsible: true,
            children: [
              [
                  "/basic-docs/fluidity/fluidity-api/channels.md", 
                  "Channels"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/dice.md", 
                  "Dice"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/faucet.md", 
                  "Faucet"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/gateways.md", 
                  "Gateways"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/heir.md", 
                  "Heir"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/musig.md", 
                  "MuSig"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/oracles.md", 
                  "Oracles"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/rewards.md", 
                  "Rewards"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/rogue.md", 
                  "Rogue"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/sudoku.md", 
                  "Sudoku"
              ],
              [
                  "/basic-docs/fluidity/fluidity-api/tokens.md", 
                  "Tokens"
              ]
            ]
          },
        ],
    },
  {
    title: "AtomicDEX",
    collapsible: true,
    children: [
        [
            "/basic-docs/atomicdex/introduction-to-atomicdex.md",
            "Introduction to AtomicDEX Documentation"
        ],
        {
            title: "AtomicDEX Setup",
            collapsible: true,
            children: [
                [
                    "/basic-docs/atomicdex/atomicdex-setup/get-started-atomicdex.md",
                    "Getting Started with AtomicDEX"
                ],
                [
                    "/basic-docs/atomicdex/atomicdex-setup/additional-information-about-atomicdex.md",
                    "Additional Information About AtomicDEX"
                ],
            ],
        },
        {
            title: "AtomicDEX Tutorials",
            collapsible: true,
            children: [
                [
                    "/basic-docs/atomicdex/atomicdex-tutorials/introduction-to-atomicdex.md",
                    "Introduction to AtomicDEX"
                ],
                [
                    "/basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.md",
                    "AtomicDEX Walkthrough"
                ]
            ]
        },
        [
            "/basic-docs/atomicdex/atomicdex-api.md", 
            "AtomicDEX API"
        ]
    ]
  },
    {
        title: "Chainlizards",
        collapsible: true,
        children: [
            [
                "/basic-docs/chainlizards/introduction-to-chainlizards.md",
                "Introduction to Chainlizards Documentation"
            ],
            {
                title: "Chainlizards Setup",
                collapsible: true,
                children: [
                    [
                        "/basic-docs/chainlizards/chainlizards-setup/introduction-to-chainlizards.md",
                        "Chainlizards Introduction"
                    ],
                ]
            },
            {
                title: "Chainlizards Tutorials",
                collapsible: true,
                children: [
                    [
                        "/basic-docs/chainlizards/chainlizards-tutorials/chainlizards-tutorial.md",
                        "Chainlizard Tutorial"
                    ],
                ]
            },
            [
                "/basic-docs/chainlizards/chainlizards-api/chainlizards-api.md",
                "Chainlizards API"
            ],
        ],
    },
]

module.exports = sidebar;
