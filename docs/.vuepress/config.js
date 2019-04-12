var redirectAliases = require("./public/_redirects.js");
module.exports = {
  plugins: {
    redirect: {
      alias: redirectAliases
    }
  },
  title: " ",
  base: "/",
  description: "Documentation for developers building on Komodo",
  themeConfig: {
    repo: 'komodoplatform/developer-docs',
    repoLabel: 'Github',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Suggest an improvement for this page',
    lastUpdated: 'Last Updated',
    logo: '/site-name-logo.png',
    nav: [
      {
        text: "Start Here",
        link: "/basic-docs/start-here/outline-for-new-developers.md"
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
            ["/basic-docs/customconsensus/channels.md", "Channels"],
            ["/basic-docs/customconsensus/dice.md", "Dice"],
            ["/basic-docs/customconsensus/faucet.md", "Faucet"],
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

    // Repeat everything from above
      "/": [
        {
          title: "Start Here",
          collapsable: true,
          children: [
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
            ["/basic-docs/customconsensus/channels.md", "Channels"],
            ["/basic-docs/customconsensus/dice.md", "Dice"],
            ["/basic-docs/customconsensus/faucet.md", "Faucet"],
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
      ]
    }
  }
};
