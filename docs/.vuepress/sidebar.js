let atomicDEXsidebar = require("./atomicDEX-sidebar.js");

var sidebar = [
  {
    title: "Start Here",
    collapsible: true,
    children: [
      {
        title: "About Komodo Platform",
        collapsible: true,
        children: [
          [
            "/basic-docs/start-here/about-komodo-platform/about-komodo-platform.md",
            "Platform Overview",
          ],
          [
            "/basic-docs/start-here/about-komodo-platform/product-introductions.md",
            "Product Introductions",
          ],
          [
            "/basic-docs/start-here/about-komodo-platform/orientation.md",
            "Doc Orientation",
          ],
          [
            "/basic-docs/start-here/about-komodo-platform/simple-installations.md",
            "Simple Installations",
          ],
        ],
      },
      {
        title: "Learning Launchpad",
        collapsible: true,
        children: [
          [
            "/basic-docs/start-here/learning-launchpad/learning-path-outline.md",
            "Learning Path Outline",
          ],
          [
            "/basic-docs/start-here/learning-launchpad/common-terminology-and-concepts.md",
            "Common Terminology and Concepts",
          ],
        ],
      },
      {
        title: "Core Technology Discussions",
        collapsible: true,
        children: [
          [
            "/basic-docs/start-here/core-technology-discussions/introduction.md",
            "Introduction",
          ],
          [
            "/basic-docs/start-here/core-technology-discussions/delayed-proof-of-work.md",
            "Delayed Proof of Work",
          ],
          [
            "/basic-docs/start-here/core-technology-discussions/initial-dex-offering.md",
            "Initial DEX Offering (IDO)",
          ],
          [
            "/basic-docs/start-here/core-technology-discussions/antara.md",
            "The Antara Framework",
          ],
          [
            "/basic-docs/start-here/core-technology-discussions/atomicdex.md",
            "AtomicDEX and Atomic Swaps",
          ],
          [
            "/basic-docs/start-here/core-technology-discussions/miscellaneous.md",
            "Miscellaneous",
          ],
          [
            "/basic-docs/start-here/core-technology-discussions/references.md",
            "References",
          ],
        ],
      },
    ],
  },
  {
    title: "Smart Chain Essentials",
    collapsible: true,
    children: [
      [
        "/basic-docs/smart-chains/introduction-to-smart-chain-documentation.md",
        "Introduction to Smart Chain Documentation",
      ],
      ["/basic-docs/smart-chains/changelog.md", "Komodo Change Log"],
      {
        title: "Smart Chain Setup",
        collapsible: true,
        children: [
          [
            "/basic-docs/smart-chains/smart-chain-setup/installing-from-source.md",
            "Installing Smart Chain Software From Source Code",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-setup/updating-from-source.md",
            "Updating Smart Chain Software From Source Code",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-setup/interacting-with-smart-chains.md",
            "Interacting with Smart Chains",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-setup/ecosystem-launch-parameters.md",
            "Ecosystem Smart Chain Launch Commands",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-setup/smart-chain-maintenance.md",
            "Smart Chain Maintenance",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.md",
            "Common Runtime Parameters",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-setup/nspv.md",
            "nSPV (Enhanced Lite Mode)",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-setup/dexp2p.md",
            "Enhanced p2p messaging/data transmission layer",
          ],
        ],
      },
      {
        title: "Smart Chain Tutorials",
        collapsible: true,
        children: [
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/introduction-to-smart-chain-tutorials.md",
            "Introduction to Smart Chain Tutorials",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/basic-environment-setup-for-linux-vps.md",
            "Basic Environment Setup for Linux VPS",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/create-a-default-smart-chain.md",
            "Create a Default Smart Chain",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/creating-a-smart-chain-on-a-single-node.md",
            "Creating a Smart Chain on a Single Node",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/running-komodo-software-in-debug-mode.md",
            "Running Komodo Software in Debug Mode",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/multisignature-transaction-creation-and-walkthrough.md",
            "Multisignature Transaction Creation and Walkthrough",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/smart-chain-api-basics.md",
            "Smart Chain API Basics",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/betdapp.md",
            "Automated P2P betting game",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/publish-download-files-dexp2p.md",
            "How to publish and download files using the DEXP2P layer",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/streaming-dexp2p.md",
            "How to stream and playback a video file using the DEXP2P layer of a Smart Chain",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/subatomic.md",
            "Subatomic Swaps",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-tutorials/get-new-pubkey.md",
            "Retrieve Pubkey,Address and Privkey",
          ],
        ],
      },
      {
        title: "Smart Chain API",
        collapsible: true,
        children: [
          ["/basic-docs/smart-chains/smart-chain-api/address.md", "Address"],
          [
            "/basic-docs/smart-chains/smart-chain-api/blockchain.md",
            "Blockchain",
          ],
          ["/basic-docs/smart-chains/smart-chain-api/cclib.md", "CC Lib"],
          ["/basic-docs/smart-chains/smart-chain-api/control.md", "Control"],
          [
            "/basic-docs/smart-chains/smart-chain-api/crosschain.md",
            "Cross-Chain API",
          ],
          [
            "/basic-docs/smart-chains/smart-chain-api/disclosure.md",
            "Disclosure",
          ],
          ["/basic-docs/smart-chains/smart-chain-api/generate.md", "Generate"],
          ["/basic-docs/smart-chains/smart-chain-api/mining.md", "Mining"],
          ["/basic-docs/smart-chains/smart-chain-api/jumblr.md", "Jumblr"],
          ["/basic-docs/smart-chains/smart-chain-api/network.md", "Network"],
          [
            "/basic-docs/smart-chains/smart-chain-api/rawtransactions.md",
            "Raw Transactions",
          ],
          ["/basic-docs/smart-chains/smart-chain-api/util.md", "Util"],
          ["/basic-docs/smart-chains/smart-chain-api/wallet.md", "Wallet"],
        ],
      },
    ],
  },
  {
    title: "Antara Framework",
    collapsible: true,
    children: [
      [
        "/basic-docs/antara/introduction-to-antara.md",
        "Introduction to Antara Documentation",
      ],
      [
        "/basic-docs/antara/antara-setup/antara-customizations.md",
        "Antara Customizations",
      ],
      // {
      // title: "Antara Setup",
      // collapsible: true,
      // children: [
      // ],
      // },
      {
        title: "Antara Tutorials",
        collapsible: true,
        children: [
          [
            "/basic-docs/antara/antara-tutorials/introduction-to-antara-tutorials.md",
            "Introduction to Antara Tutorials",
          ],
          [
            "/basic-docs/antara/antara-tutorials/understanding-antara-addresses.md",
            "Understanding Antara Addresses",
          ],
          [
            "/basic-docs/antara/antara-tutorials/overview-of-antara-modules-part-i.md",
            "Overview of Antara Modules — Part I",
          ],
          [
            "/basic-docs/antara/antara-tutorials/overview-of-antara-modules-part-ii.md",
            "Overview of Antara Modules — Part II",
          ],
          [
            "/basic-docs/antara/antara-tutorials/beginner-series-part-0.md",
            "Beginner Series — Preparation",
          ],
          [
            "/basic-docs/antara/antara-tutorials/beginner-series-part-1.md",
            "Beginner Series — Create a Blockchain",
          ],
          [
            "/basic-docs/antara/antara-tutorials/beginner-series-part-2.md",
            "Beginner Series — Using a Faucet",
          ],
          [
            "/basic-docs/antara/antara-tutorials/beginner-series-part-3.md",
            "Beginner Series — Connecting to Another Programming Environment",
          ],
          [
            "/basic-docs/antara/antara-tutorials/beginner-series-part-4.md",
            "Beginner Series — Understanding Tokens",
          ],
          [
            "/basic-docs/antara/antara-tutorials/advanced-series-0.md",
            "Advanced Series — Introduction",
          ],
          [
            "/basic-docs/antara/antara-tutorials/advanced-series-1.md",
            "Advanced Series — Smart Chain Development Basics",
          ],
          [
            "/basic-docs/antara/antara-tutorials/advanced-series-2.md",
            "Advanced Series — Antara Module Development Basics",
          ],
          [
            "/basic-docs/antara/antara-tutorials/advanced-series-3.md",
            "Advanced Series — Preparing for Heir Development",
          ],
          [
            "/basic-docs/antara/antara-tutorials/advanced-series-4.md",
            "Advanced Series — Final Conceptual Discussion",
          ],
          [
            "/basic-docs/antara/antara-tutorials/advanced-series-5.md",
            "Advanced Series — Developing the Heir Module Prototype",
          ],
          [
            "/basic-docs/antara/antara-tutorials/advanced-series-6.md",
            "Advanced Series — Miscellaneous",
          ],
          // [
          //   "/basic-docs/antara/antara-tutorials/gaming-sdk-tutorial-0.md",
          //   "Gaming SDK Tutorial — Getting Started"
          // ],
          // [
          //   "/basic-docs/antara/antara-tutorials/gaming-sdk-tutorial-1.md",
          //   "Gaming SDK Tutorial — Adding a Gaming System"
          // ],
          // [
          //   "/basic-docs/antara/antara-tutorials/gaming-sdk-tutorial-3.md",
          //   "Gaming SDK Tutorial — Tic Tac Toe"
          // ],
          // [
          //   "/basic-docs/antara/antara-tutorials/gaming-sdk-tutorial-4.md",
          //   "Gaming SDK Tutorial — Flappy Bird"
          // ],
          [
            "/basic-docs/antara/antara-tutorials/dilithium-module-tutorial.md",
            "Module Tutorial — Dilithium",
          ],
          [
            "/basic-docs/antara/antara-tutorials/gateways-module-tutorial.md",
            "Module Tutorial — Gateways",
          ],
          [
            "/basic-docs/antara/antara-tutorials/musig-module-tutorial.md",
            "Module Tutorial — Musig",
          ],
          [
            "/basic-docs/antara/antara-tutorials/rogue-module-tutorial.md",
            "Module Tutorial — Rogue",
          ],
          [
            "/basic-docs/antara/antara-tutorials/pegs-module-user-tutorial.md",
            "Module Tutorial — Pegs | User",
          ],
          [
            "/basic-docs/antara/antara-tutorials/pegs-module-creator-tutorial.md",
            "Module Tutorial — Pegs | Creator",
          ],
        ],
      },
      {
        title: "Antara Modules",
        collapsible: true,
        children: [
          ["/basic-docs/antara/antara-api/assets.md", "Assets"],
          ["/basic-docs/antara/antara-api/channels.md", "Channels"],
          /*           [
                                   "/basic-docs/antara/antara-api/dice.md", 
                                   "Dice"
                               ], */
          ["/basic-docs/antara/antara-api/dilithium.md", "Dilithium"],
          ["/basic-docs/antara/antara-api/faucet.md", "Faucet"],
          // ["/basic-docs/antara/antara-api/gaming.md", "Gaming SDK"],
          ["/basic-docs/antara/antara-api/gateways.md", "Gateways"],
          ["/basic-docs/antara/antara-api/heir.md", "Heir"],
          ["/basic-docs/antara/antara-api/musig.md", "MuSig"],
          ["/basic-docs/antara/antara-api/oracles.md", "Oracles"],
          ["/basic-docs/antara/antara-api/payments.md", "Payments"],
          ["/basic-docs/antara/antara-api/pegs.md", "Pegs"],
          ["/basic-docs/antara/antara-api/prices.md", "Prices"],
          ["/basic-docs/antara/antara-api/rewards.md", "Rewards"],
          ["/basic-docs/antara/antara-api/rogue.md", "Rogue"],
          ["/basic-docs/antara/antara-api/sudoku.md", "Sudoku"],
          ["/basic-docs/antara/antara-api/tokens.md", "Tokens"],
        ],
      },
    ],
  },
  atomicDEXsidebar,
];
module.exports = sidebar;
