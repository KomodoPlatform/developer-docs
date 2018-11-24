module.exports = {
  title: 'Komodo Developer Documentation',
  base: '/komodo-docs-vuepress/',
  description: 'Documentation for developers building on Komodo',
  themeConfig: {
    nav: [
      { text: 'Start Here', link: '/000-start-here/_001-introduction.md' },
      { text: 'KomodoPlatform.com', link: 'https://komodoplatform.com' },
    ],
    sidebar: [
      {
        title: 'Start Here',
        collapsable: true,
        children: [
          [ '/000-start-here/_001-introduction.md', 'Introduction'],
          // [ '/000-start-here/_005-outline-for-new-developers.md', 'Outline for New Developers'],
          // [ '/000-start-here/_017-cc-overview.md', 'Overview of CryptoConditions (Smart Contracts)']
        ]
      },
      // {
      //   title: 'Installation and Setup',
      //   collapsable: true,
      //   children: [
      //     [ '/005-installations/_010-basic-instructions.md', 'Basic Installation Instructions'],
      //     [ '/005-installations/_015-creating-asset-chains.md', 'Asset Chain Creation'],
      //     [ '/005-installations/_019-common-runtime-parameters.md', 'Basic Runtime Parameters'],
      //     [ '/005-installations/_023-asset-chain-parameters.md', 'Runtime Tools for Asset Chains']
      //   ]
      // },
      // {
      //   title: 'CryptoConditions (Smart Contract Templates)',
      //   collapsable: true,
      //   children: [
      //     [ '/010-cryptoconditions/_101-cryptoconditions-instructions.md', 'Instructions for CryptoConditions'],
      //     [ '/010-cryptoconditions/_110-cc-channels.md', 'Channels'],
      //     [ '/010-cryptoconditions/_120-cc-dice.md', 'Dice'],
      //     [ '/010-cryptoconditions/_130-cc-faucet.md', 'Faucet'],
      //     [ '/010-cryptoconditions/_133-cc-gateways.md', 'Gateways'],
      //     [ '/010-cryptoconditions/_135-cc-oracles.md', 'Oracles'],
      //     [ '/010-cryptoconditions/_140-cc-rewards.md', 'Rewards'],
      //     [ '/010-cryptoconditions/_150-cc-tokens.md', 'Tokens']
      //   ]
      // },
      // {
      //   title: 'Essential RPC Calls',
      //   collapsable: true,
      //   children: [
      //     [ '/015-essential-rpc/_303-address-index.md', 'Address'],
      //     [ '/015-essential-rpc/_307-blockchain.md', 'Blockchain'],
      //     [ '/015-essential-rpc/_311-control.md', 'Control'],
      //     [ '/015-essential-rpc/_315-disclosure.md', 'Disclosure'],
      //     [ '/015-essential-rpc/_319-generate.md', 'Generate'],
      //     [ '/015-essential-rpc/_323-mining.md', 'Mining'],
      //     [ '/015-essential-rpc/_325-jumblr.md', 'Jumblr'],
      //     [ '/015-essential-rpc/_327-network.md', 'Network'],
      //     [ '/015-essential-rpc/_331-rawtransactions.md', 'Raw Transactions'],
      //     [ '/015-essential-rpc/_335-util.md', 'Util'],
      //     [ '/015-essential-rpc/_339-wallet.md', 'Wallet']
      //   ]
      // }
    ]
  }
}
