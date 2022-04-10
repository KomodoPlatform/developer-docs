# Add ERC20 Tokens to Agama Mobile

The Agama mobile code comprises of two parts. Agama wallet library and MeteorJS app. This assetchain adding guide will cover both. All the files needs changing are linked.

## Agama wallet library

- Add a contract ID [pbca26/agama-wallet-lib:src/eth-erc20-contract-id.js@dev](https://github.com/pbca26/agama-wallet-lib/blob/dev/src/eth-erc20-contract-id.js)

- Add token decimals (optional, only if it's different from default 18 value) [pbca26/agama-wallet-lib:src/eth-erc20-decimals.js@dev](https://github.com/pbca26/agama-wallet-lib/blob/dev/src/eth-erc20-decimals.js)

- Submit a PR, use dev branch!

## MeteorJS app

- Drop a 60 x 60 px logo into [/public/images/cryptologo/eth@dev](https://github.com/KomodoPlatform/agama-mobile/tree/dev/public/images/cryptologo/eth)

- Add ERC20 ticker to coins file [/imports/ui/actions/coins.js@dev#L80](https://github.com/KomodoPlatform/agama-mobile/blob/dev/imports/ui/actions/coins.js#L80)

- Add the ERC20 token name to translation file [/imports/ui/translate/en.js@dev#L475](https://github.com/KomodoPlatform/agama-mobile/blob/dev/imports/ui/translate/en.js#L475).

- Submit a PR, use dev branch!

Please make sure the ERC20 Token is working in Agama before making a PR. Pull requests containing partial information or not working assets/servers will remain unmerged until all requirements are fulfilled.
