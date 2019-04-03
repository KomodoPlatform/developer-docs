module.exports = {
  title: "Komodo Documentation",
  base: "/",
  description: "Documentation for developers building on Komodo",
  themeConfig: {
    repo: 'komodoplatform/developer-docs',
    repoLabel: 'Github',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Suggest an improvement for this page',
    lastUpdated: 'Last Updated',
    nav: [{
        text: "Start Here",
        link: "/basic-docs/start-here/outline-for-new-developers.md"
      },
      {
        text: "KomodoPlatform.com",
        link: "https://komodoplatform.com"
      }
    ],
    sidebar: {
      "/": [{
          title: "Start Here",
          collapsable: true,
          children: [
            [
              "/basic-docs/start-here/outline-for-new-developers.md",
              "Outline for New Developers"
            ],
            [
              "/basic-docs/start-here/cc-overview.md",
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
              "/basic-docs/customconsensus/custom-consensus-tutorial.md",
              "Build a CC Module"
            ],
            ["/basic-docs/customconsensus/cc-channels.md", "Channels"],
            ["/basic-docs/customconsensus/cc-dice.md", "Dice"],
            ["/basic-docs/customconsensus/cc-faucet.md", "Faucet"],
            ["/basic-docs/customconsensus/cc-gateways.md", "Gateways"],
            ["/basic-docs/customconsensus/cc-heir.md", "Heir"],
            ["/basic-docs/customconsensus/cc-musig.md", "MuSig"],
            ["/basic-docs/customconsensus/cc-oracles.md", "Oracles"],
            ["/basic-docs/customconsensus/cc-rewards.md", "Rewards"],
            ["/basic-docs/customconsensus/cc-rogue.md", "Rogue"],
            ["/basic-docs/customconsensus/cc-sudoku.md", "Sudoku"],
            ["/basic-docs/customconsensus/cc-tokens.md", "Tokens"]
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
    }
  }
};
