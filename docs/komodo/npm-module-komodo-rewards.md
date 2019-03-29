# Calculate Komodo rewards using an npm module

This module has been created by [Luke Childs](https://github.com/lukechilds) a developer in the Komodo ecosystem.

- **Source code**: [https://github.com/atomiclabs/get-komodo-rewards](https://github.com/atomiclabs/get-komodo-rewards)
- **npm module**: [https://www.npmjs.com/package/get-komodo-rewards](https://www.npmjs.com/package/get-komodo-rewards)

## Install

```bash
npm install get-komodo-rewards
```

## Usage

Pass in a utxo object and an integer of the `accrued rewards` in satoshis will be returned.

```js
const getKomodoRewards = require("get-komodo-rewards");

const utxo = {
  tiptime: 1552292091,
  locktime: 1552248193,
  height: 1263192,
  satoshis: 3206795322480
};

const rewards = getKomodoRewards(utxo);
// 205000320
```

## API

### getKomodoRewards(utxo)

Returns the accrued rewards in satoshis.

#### Keys of the `utxo` object

### License

MIT © Atomic Labs

MIT © Luke Childs
