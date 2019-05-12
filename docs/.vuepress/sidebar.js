var sidebar = [{
    title: "Start Here",
    collapsable: true,
    children: [
      [
        "/basic-docs/start-here/about-komodo.md",
          "About Komodo"
      ],
      [
        "/basic-docs/start-here/before-we-begin.md",
        "Before We Begin"
      ],
      [
        "/basic-docs/start-here/get-started.md",
        "Get Started"
      ],
    ]
  },
  {
      title: "Developer Tutorials",
      collapsable: true,
      children: [
          [
            "/basic-docs/developer-tutorials/create-a-default-smart-chain.md",
            "Create a Default Smart Chain"
          ],
          [
            "/basic-docs/developer-tutorials/custom-consensus-overview.md",
            "Custom Consensus Overview"
          ],
      ]
  },
  {
        title: "Smart Chain Setup",
        collapsable: true,
        children: [
            [
                "/basic-docs/smart-chain-setup/basic-launch-parameters.md",
                "Maintenance Instructions"
            ],
            [
                "/basic-docs/smart-chain-setup/basic-launch-parameters.md",
                "Basic Launch Parameters"
                
            ],
            [
                "/basic-docs/smart-chain-setup/smart-chain-customization-parameters.md",
                "Smart Chain Customization Parameters"
            ],
        ]
  },
  {
    title: "Fluidity Module API",
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
  },
  {
    title: "DEX Software & API",
    collapsable: true,
    children: [
        ["/basic-docs/atomic-swap-dex/introduction-to-komodo-dex.md", "Introduction to Komodo DEX Software"],
        ["/basic-docs/atomic-swap-dex/about-dex.md", "Additional Notes"],
        ["/basic-docs/atomic-swap-dex/installing-komodo-dex.md", "Installing DEX Software"],
        ["/basic-docs/atomic-swap-dex/dex-walkthrough.md", "DEX Walkthrough Tutorial"],
        ["/basic-docs/atomic-swap-dex/dex-api.md", "DEX API"]
    ]
  }
]

module.exports = sidebar;
