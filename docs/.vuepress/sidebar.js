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
                        "/basic-docs/start-here/learning-launchpad/normal-developer-outline.md",
                        "Outline for a Normal Developer"
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
                    // [
                        // "/basic-docs/start-here/general-tutorials/general-tutorial-1.md",
                        // "General Tutorial 1"
                    // ],
                    // [
                        // "/basic-docs/start-here/general-tutorials/general-tutorial-2.md",
                        // "General Tutorial 2"
                    // ],
                    // [
                        // "/basic-docs/start-here/general-tutorials/comprehensive-tutorials-type-b-beginner.md",
                        // "Comprehensive Tutorial | Type B Beginner"
                    // ],
                    // [
                        // "/basic-docs/start-here/general-tutorials/comprehensive-tutorials-type-b-intermediate.md",
                        // "Comprehensive Tutorial | Type B Intermediate"
                    // ],
                    // [
                        // "/basic-docs/start-here/general-tutorials/comprehensive-tutorials-type-b-advanced.md",
                        // "Comprehensive Tutorial | Type B Advanced"
                    // ],
                ]
            },
        ]
    },
  {
    title: "Smart Chain Essentials",
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
                    "/basic-docs/smart-chains/smart-chain-tutorials/basic-environment-setup-for-linux-vps.md",
                    "Basic Environment Setup for Linux VPS"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.md",
                    "Create a Default Smart Chain"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/creating-a-smart-chain-on-a-single-node.md",
                    "Creating a Smart Chain on a Single Node"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/running-komodo-software-in-debug-mode.md",
                    "Running Komodo Software in Debug Mode"
                ],
                [
                    "/basic-docs/smart-chains/smart-chain-tutorials/multisignature-transaction-creation-and-walkthrough.md",
                    "Multisignature Transaction Creation and Walkthrough"
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
        title: "Antara",
        collapsible: true,
        children: [
            [
                "/basic-docs/antara/introduction-to-antara.md",
                "Introduction to Antara Documentation"
            ],
            {
                title: "Antara Setup",
                collapsible: true,
                children: [
                    [
                        "/basic-docs/antara/antara-setup/antara-instructions.md", 
                        "Understanding Antara Addresses"
                    ],
                    [
                        "/basic-docs/antara/antara-setup/antara-customizations.md",
                        "Antara Customizations"
                    ],
                ],
            },
            {
                title: "Antara Tutorials",
                collapsible: true,
                children: [
                        [
                            "/basic-docs/antara/antara-tutorials/introduction-to-antara-tutorials.md", 
                            "Introduction to Antara Tutorials"
                        ],
                        [
                            "/basic-docs/antara/antara-tutorials/antara-overview.md", 
                            "Overview of Antara Modules - Part I"
                        ],
                        [
                            "/basic-docs/antara/antara-tutorials/antara-conceptual-overview.md", 
                            "Overview of Antara Modules - Part II"
                        ],
                        [
                            "/basic-docs/antara/antara-tutorials/musig-module-tutorial.md", 
                            "Musig Module Tutorial" 
                        ],
                        [
                            "/basic-docs/antara/antara-tutorials/heir-module-tutorial.md", 
                            "Heir Module Tutorial" 
                        ],
                        // [
                            // "/basic-docs/antara/antara-tutorials/create-an-oracles-plan-tutorial.md", 
                            // "Create an Oracles Plan Tutorial" 
                        // ],
                        [
                            "/basic-docs/antara/antara-tutorials/rogue-module-tutorial.md", 
                            "Rogue Module Tutorial" 
                        ],
                        [
                            "/basic-docs/antara/antara-tutorials/gateways-module-tutorial.md", 
                            "Gateways Module Tutorial" 
                        ],
                        [
                            "/basic-docs/antara/antara-tutorials/an-advanced-approach-to-komodos-antara-framework.md", 
                            "An Advanced Approach to Komodo's Antara Framework" 
                        ],
                ],
            },
          {
            title: "Antara API",
            collapsible: true,
            children: [
              [
                  "/basic-docs/antara/antara-api/channels.md", 
                  "Channels"
              ],
              [
                  "/basic-docs/antara/antara-api/dice.md", 
                  "Dice"
              ],
              [
                  "/basic-docs/antara/antara-api/faucet.md", 
                  "Faucet"
              ],
              [
                  "/basic-docs/antara/antara-api/gateways.md", 
                  "Gateways"
              ],
              [
                  "/basic-docs/antara/antara-api/heir.md", 
                  "Heir"
              ],
              [
                  "/basic-docs/antara/antara-api/musig.md", 
                  "MuSig"
              ],
              [
                  "/basic-docs/antara/antara-api/oracles.md", 
                  "Oracles"
              ],
              [
                  "/basic-docs/antara/antara-api/rewards.md", 
                  "Rewards"
              ],
              [
                  "/basic-docs/antara/antara-api/rogue.md", 
                  "Rogue"
              ],
              [
                  "/basic-docs/antara/antara-api/sudoku.md", 
                  "Sudoku"
              ],
              [
                  "/basic-docs/antara/antara-api/tokens.md", 
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
