const fs = require('fs')
const path = require('path')
// const fd = fs.openSync(path.join(__dirname + '/FILE.md'), 'r+')

const renames = [
  {
    before: '339-wallet',
    after: 'wallet'
  },
  {
    before: '335-util',
    after: 'util'
  },
  {
    before: '331-rawtransactions',
    after: 'rawtransactions'
  },
  {
    before: '327-network',
    after: 'network'
  },
  {
    before: '325-jumblr',
    after: 'jumblr'
  },
  {
    before: '323-mining',
    after: 'mining'
  },
  {
    before: '319-generate',
    after: 'generate'
  },
  {
    before: '315-disclosure',
    after: 'disclosure'
  },
  {
    before: '311-control',
    after: 'control'
  },
  {
    before: '307-blockchain',
    after: 'blockchain'
  },
  {
    before: '303-address-index',
    after: 'address-index'
  },
  {
    before: '150-cc-tokens',
    after: 'cc-tokens'
  },
  {
    before: '140-cc-rewards',
    after: 'cc-rewards'
  },
  {
    before: '135-cc-oracles',
    after: 'cc-oracles'
  },
  {
    before: '133-cc-gateways',
    after: 'cc-gateways'
  },
  {
    before: '130-cc-faucet',
    after: 'cc-faucet'
  },
  {
    before: '120-cc-dice',
    after: 'cc-dice'
  },
  {
    before: '110-cc-channels',
    after: 'cc-dice'
  },
  {
    before: '101-cryptoconditions',
    after: 'cryptoconditions'
  },
  {
    before: '010-cryptoconditions',
    after: 'cryptoconditions'
  },
  {
    before: '015-essential-rpc',
    after: 'essential-rpc'
  }
]

const currFile = fs.readFile(path.join(__dirname + '/FILE.ext'), 'utf8', (err, data) => {
  for (let i = 0; i < renames.length; i++) {
    
  }
})
