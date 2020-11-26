# How to Generate Address and Private Key (WIF) for 3rd Party Coins Using Passphrase

While this guide is intended for Notary Node operators, other users may find it useful too.

Never enter your Notary Node's passphrase into any other computer/server other than your node itself for security purposes.

:::tip Note
For Notary Nodes, we will need `Compressed Public Key` as BTC pubkey, `Compressed WIF` as private key and `Compressed Address` as the public address.
:::

## Install dependencies

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install git php7.2-cli php7.2-gmp php7.2-mbstring
```

## Steps

- Clone the repo: [https://github.com/DeckerSU/komodo_scripts](https://github.com/DeckerSU/komodo_scripts)

```bash
git clone https://github.com/DeckerSU/komodo_scripts
cd komodo_scripts
git submodule init
git submodule update --init --recursive
```

- Edit `genkomodo.php` and fill your passphrase instead of `$passphrase = "myverysecretandstrongpassphrase_noneabletobrute"`. Change only the content inside `""` i.e., replace `myverysecretandstrongpassphrase_noneabletobrute` with your passphrase

- Execute the command: `php genkomodo.php`

- Copy and use your required WIF and delete your passphrase from `genkomodo.php` for security purposes.

## Example Output

```bash
$ php genkomodo.php

             Passphrase: 'myverysecretandstrongpassphrase_noneabletobrute'

[ BTC ]
         Network Prefix: 00
  Compressed Public Key: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
Uncompressed Public Key: 04a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1767ae7bed159fca39dc26e2f9de31817bd32e0d6c5a870801bcd81fb7f1c2030
            Private Key: 907ece717a8f94e07de7bf6f8b3e9f91abb8858ebf831072cdbb9016ef53bc5d
         Compressed WIF: L24bEAJSkFCdjoQNEcboWfJdsLGLmkBgfGb4TSHnbhEmU9jenaes
       Uncompressed WIF: 5JuvXAozwf7G7yjT7Fs2UZhFF85qS6Fez9yCfAMZzFZ7uPJvWtC
  Compressed Address: 1M68ML9dMZZPEdrjncUCe7ZWadAGUxMNyv
Uncompressed Address: 1Py6QmcHgWsoAjTJeixtXt2uGzMVa5Ym1i
[ KMD ]
         Network Prefix: 3C
  Compressed Public Key: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
Uncompressed Public Key: 04a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1767ae7bed159fca39dc26e2f9de31817bd32e0d6c5a870801bcd81fb7f1c2030
            Private Key: 907ece717a8f94e07de7bf6f8b3e9f91abb8858ebf831072cdbb9016ef53bc5d
         Compressed WIF: UtrRXqvRFUAtCrCTRAHPH6yroQKUrrTJRmxt2h5U4QTUN1jCxTAh
       Uncompressed WIF: 7KYb75jv5BgrDCbmW36yhofiBy2vSLpCCWDfJ9dMdZxPWnKicJh
  Compressed Address: RVNKRr2uxPMxJeDwFnTKjdtiLtcs7UzCZn
Uncompressed Address: RYFHVHVaHLgNEjpW7tx1dQN73Fp6Hu5EXs
[ GAME ]
         Network Prefix: 26
  Compressed Public Key: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
Uncompressed Public Key: 04a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1767ae7bed159fca39dc26e2f9de31817bd32e0d6c5a870801bcd81fb7f1c2030
            Private Key: 907ece717a8f94e07de7bf6f8b3e9f91abb8858ebf831072cdbb9016ef53bc5d
         Compressed WIF: Re6YxHzdQ61rmTuZFVbjmGu9Kqu8VeVJr4G1ihTPFsspAjGiErDL
       Uncompressed WIF: 6anDDysDKposF9pFZHSzikUg3TV88rGvtSfHvrVdm9orf3EW88J
  Compressed Address: Gdw3mTUaLRAgK7A2iZ8K4suQVnx7VRJ9rf
Uncompressed Address: Ggp1ptwEfNV6FCkbafczxeNoCA9LcND32e
[ HUSH ]
         Network Prefix: 1cb8
  Compressed Public Key: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
Uncompressed Public Key: 04a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1767ae7bed159fca39dc26e2f9de31817bd32e0d6c5a870801bcd81fb7f1c2030
            Private Key: 907ece717a8f94e07de7bf6f8b3e9f91abb8858ebf831072cdbb9016ef53bc5d
         Compressed WIF: L24bEAJSkFCdjoQNEcboWfJdsLGLmkBgfGb4TSHnbhEmU9jenaes
       Uncompressed WIF: 5JuvXAozwf7G7yjT7Fs2UZhFF85qS6Fez9yCfAMZzFZ7uPJvWtC
  Compressed Address: t1dxjMfZmKtLyqGudj3HKmvfRqHMMEqgmKn
Uncompressed Address: t1gqhR72ReqfPmNWCb9n1fh8pXeYaT8Hks5
[ EMC2 ]
         Network Prefix: 21
  Compressed Public Key: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
Uncompressed Public Key: 04a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1767ae7bed159fca39dc26e2f9de31817bd32e0d6c5a870801bcd81fb7f1c2030
            Private Key: 907ece717a8f94e07de7bf6f8b3e9f91abb8858ebf831072cdbb9016ef53bc5d
         Compressed WIF: T7trfubd9dBEWe3EnFYfj1r1pBueqqCaUUVKKEvLAfQvz3JFsNhs
       Uncompressed WIF: 6vDezJMXr5a8bMdJd5ezFxURCbeJdthgkqNNNMNbhhsjbJoAQhU
  Compressed Address: EdF2quz8nWrJDwTbbTTieFYUMGfPsVB5dv
Uncompressed Address: Eg7zuMSo7UAiA34ATZxQY21s3drd3WJM6h
[ GIN ]
         Network Prefix: 26
  Compressed Public Key: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
Uncompressed Public Key: 04a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1767ae7bed159fca39dc26e2f9de31817bd32e0d6c5a870801bcd81fb7f1c2030
            Private Key: 907ece717a8f94e07de7bf6f8b3e9f91abb8858ebf831072cdbb9016ef53bc5d
         Compressed WIF: WNejFTXR11LFx2L8wvEKEqvjHkL1D3Aa4CCBdEYQyBzbBKjPLHJQ
       Uncompressed WIF: 7ez2sQEEbST7ZQQpZqJyF1fTM7C6wPEx4tvjjeWKa82GSwnepa2
  Compressed Address: Gdw3mTUaLRAgK7A2iZ8K4suQVnx7VRJ9rf
Uncompressed Address: Ggp1ptwEfNV6FCkbafczxeNoCA9LcND32e
[ AYA ]
         Network Prefix: 17
  Compressed Public Key: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
Uncompressed Public Key: 04a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1767ae7bed159fca39dc26e2f9de31817bd32e0d6c5a870801bcd81fb7f1c2030
            Private Key: 907ece717a8f94e07de7bf6f8b3e9f91abb8858ebf831072cdbb9016ef53bc5d
         Compressed WIF: T7trfubd9dBEWe3EnFYfj1r1pBueqqCaUUVKKEvLAfQvz3JFsNhs
       Uncompressed WIF: 6vDezJMXr5a8bMdJd5ezFxURCbeJdthgkqNNNMNbhhsjbJoAQhU
  Compressed Address: Abrzzq1FgiDY3c4jMG8Xnzpc4E5xqktXhz
Uncompressed Address: Aejy4GTv1fXwyhfJDNdDgmHzkbHBwVxnvD
[ GleecBTC ]
         Network Prefix: 23
  Compressed Public Key: 02a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1
Uncompressed Public Key: 04a854251adfee222bede8396fed0756985d4ea905f72611740867c7a4ad6488c1767ae7bed159fca39dc26e2f9de31817bd32e0d6c5a870801bcd81fb7f1c2030
            Private Key: 907ece717a8f94e07de7bf6f8b3e9f91abb8858ebf831072cdbb9016ef53bc5d
         Compressed WIF: AhXsCzbmiZUyMCZyPqjYMhLxBxcFBP6tQSLrCpTpfYkvjJEMthcW
       Uncompressed WIF: 3CT2QZXzFrVzdJ81zjm5PMvTYwHbUjAVQtWRHj26My8gpHMRMYn
  Compressed Address: FRvEp8aiCsn3rojmeJ8McW63cHBHKoxKbV
Uncompressed Address: FUoCsa3NXq6TnuLLWQd3WGZSJeNWVgWuPR
[ ETH/ERC20 ]
   ETH/ERC20 Address: 0x85FE0A232fA144921d880BE72A3C5515e5C17A8c
```
