const fs = require('fs')
const path = require('path')
const inputFile = '../../../docs/.vuepress/config.js'
const fd = fs.openSync(path.join(__dirname + '/output.txt'), 'r+')

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
    after: 'cc-channels'
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

const cut = function(str, cutStart, cutEnd, value) {
  return str.substr(0, cutStart) + value + str.substr(cutEnd)
}

fs.ftruncate(fd, 0, (err) => {

  if (err) {
    console.error(err)
    process.exit()
  }

  fs.readFile(path.join(__dirname + inputFile), 'utf8', (err, data) => {

    console.log(`successfully retrieved file`, data.substr(0,15))

    if (err) {
      console.error(err)
      process.exit()
    }

    let wip = data

    for (let i = 0; i < renames.length; i++) {
      console.log(`\nChecking item: `, renames[i].before)
      while (wip.includes(renames[i].before)) {
        let marker = wip.indexOf(renames[i].before)
        console.log(`\nInstance found: `, marker)
        wip = cut(wip, marker, marker + renames[i].before.length, renames[i].after)
        }
    }

    console.log(`All done: `, wip.substr(0, 25))

    fs.appendFileSync(path.join(__dirname + `/output.txt`), wip)

  })

})
