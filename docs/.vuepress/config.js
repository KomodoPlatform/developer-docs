module.exports = {
  title: "Komodo Developer Documentation",
  base: "/komodo-docs-vuepress/",
  description: "Documentation for developers building on Komodo",
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [{
        text: "Start Here",
        link: "/basic-docs/000-start-here/001-introduction.html"
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
            ["/basic-docs/000-start-here/001-introduction.md", "Introduction"],
            [
              "/basic-docs/000-start-here/005-outline-for-new-developers.md",
              "Outline for New Developers"
            ],
            [
              "/basic-docs/000-start-here/017-cc-overview.md",
              "Overview of CryptoConditions (Smart Contracts)"
            ]
          ]
        },
        {
          title: "Installation and Setup",
          collapsable: true,
          children: [
            [
              "/basic-docs/005-installations/010-basic-instructions.md",
              "Basic Installation Instructions"
            ],
            [
              "/basic-docs/005-installations/015-creating-asset-chains.md",
              "Asset Chain Creation"
            ],
            [
              "/basic-docs/005-installations/019-common-runtime-parameters.md",
              "Basic Runtime Parameters"
            ],
            [
              "/basic-docs/005-installations/023-asset-chain-parameters.md",
              "Runtime Tools for Asset Chains"
            ]
          ]
        },
        {
          title: "CryptoConditions (Smart Contracts)",
          collapsable: true,
          children: [
            [
              "/basic-docs/010-cryptoconditions/101-cryptoconditions-instructions.md",
              "Instructions for CryptoConditions"
            ],
            ["/basic-docs/010-cryptoconditions/110-cc-channels.md", "Channels"],
            ["/basic-docs/010-cryptoconditions/120-cc-dice.md", "Dice"],
            ["/basic-docs/010-cryptoconditions/130-cc-faucet.md", "Faucet"],
            ["/basic-docs/010-cryptoconditions/133-cc-gateways.md", "Gateways"],
            ["/basic-docs/010-cryptoconditions/135-cc-oracles.md", "Oracles"],
            ["/basic-docs/010-cryptoconditions/140-cc-rewards.md", "Rewards"],
            ["/basic-docs/010-cryptoconditions/150-cc-tokens.md", "Tokens"]
          ]
        },
        {
          title: "Essential RPC Calls",
          collapsable: true,
          children: [
            ["/basic-docs/015-essential-rpc/303-address-index.md", "Address"],
            ["/basic-docs/015-essential-rpc/307-blockchain.md", "Blockchain"],
            ["/basic-docs/015-essential-rpc/311-control.md", "Control"],
            ["/basic-docs/015-essential-rpc/315-disclosure.md", "Disclosure"],
            ["/basic-docs/015-essential-rpc/319-generate.md", "Generate"],
            ["/basic-docs/015-essential-rpc/323-mining.md", "Mining"],
            ["/basic-docs/015-essential-rpc/325-jumblr.md", "Jumblr"],
            ["/basic-docs/015-essential-rpc/327-network.md", "Network"],
            ["/basic-docs/015-essential-rpc/331-rawtransactions.md", "Raw Transactions"],
            ["/basic-docs/015-essential-rpc/335-util.md", "Util"],
            ["/basic-docs/015-essential-rpc/339-wallet.md", "Wallet"]
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
      "/": ["", "/basic-docs/"]
    }
  }
};
