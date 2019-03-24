module.exports = {
  title: "Komodo Documentation",
  base: "/",
  description: "Documentation for developers building on Komodo",
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [{
        text: "Start Here",
        link: "/basic-docs/start-here/introduction.md"
      },
      {
        text: "KomodoPlatform.com",
        link: "https://komodoplatform.com"
      }
    ],
    sidebar: {
      "/basic-docs/": [{
          title: "Start Here",
          collapsable: true,
          children: [
            ["/basic-docs/start-here/introduction.md", "Introduction"],
            [
              "/basic-docs/start-here/outline-for-new-developers.md",
              "Outline for New Developers"
            ],
            [
              "/basic-docs/start-here/cc-overview.md",
              "Overview of Crypto Conditions (Smart Contracts)"
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
          title: "Crypto Conditions (Smart Contracts)",
          collapsable: true,
          children: [
            [
              "/basic-docs/cryptoconditions/cryptoconditions-instructions.md",
              "Instructions for Crypto Conditions"
            ],
            ["/basic-docs/cryptoconditions/cc-channels.md", "Channels"],
            ["/basic-docs/cryptoconditions/cc-dice.md", "Dice"],
            ["/basic-docs/cryptoconditions/cc-faucet.md", "Faucet"],
            ["/basic-docs/cryptoconditions/cc-gateways.md", "Gateways"],
            ["/basic-docs/cryptoconditions/cc-heir.md", "Heir"],
            ["/basic-docs/cryptoconditions/cc-musig.md", "MuSig"],
            ["/basic-docs/cryptoconditions/cc-oracles.md", "Oracles"],
            ["/basic-docs/cryptoconditions/cc-rewards.md", "Rewards"],
            ["/basic-docs/cryptoconditions/cc-rogue.md", "Rogue"],
            ["/basic-docs/cryptoconditions/cc-sudoku.md", "Sudoku"],
            ["/basic-docs/cryptoconditions/cc-tokens.md", "Tokens"]
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
      "/bsk/": [{
          title: "Initialising a Blockchain",
          collapsable: true,
          children: [
            ["/bsk/create-kic.md", "Create a Komodo based Independent Chain"],
          ]
        },
        {
          title: "Launching an Explorer",
          collapsable: true,
          children: [
            ["/bsk/create-kic.md", "Create a Komodo based Independent Chain"],
          ]
        },
        {
          title: "Setting up Electrums",
          collapsable: true,
          children: [
            ["/bsk/create-kic.md", "Create a Komodo based Independent Chain"],
          ]
        },
        {
          title: "Getting listed in Komodo's Multicoin wallet",
          collapsable: true,
          children: [
            ["/bsk/create-kic.md", "Create a Komodo based Independent Chain"],
          ]
        },
        {
          title: "Geting Listed in Komodo's DEX",
          collapsable: true,
          children: [
            ["/bsk/create-kic.md", "Create a Komodo based Independent Chain"],
          ]
        },
        {
          title: "Get your Blockchain secured by Bitcoin's hashpower",
          collapsable: true,
          children: [
            ["/bsk/create-kic.md", "Create a Komodo based Independent Chain"],
          ]
        },
      ],
      "/": ["", "/basic-docs/start-here/introduction.md"]
    }
  }
};
