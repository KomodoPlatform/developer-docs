# How to Generate Address and Private Key (WIF) for 3rd Party Coins Using Passphrase

## Requirements

- You need to have git and php7.0 or hhvm installed.

## Steps

- Clone the repo: [https://github.com/DeckerSU/komodo_scripts](https://github.com/DeckerSU/komodo_scripts)

```bash
git clone https://github.com/DeckerSU/komodo_scripts
cd komodo_scripts
git submodule init
git submodule update --init --recursive
```

- Edit `genkomodo.php` and fill your passphrase instead of `$passphrase = "myverysecretandstrongpassphrase_noneabletobrute"`. Change only the content inside `""` i.e., change `myverysecretandstrongpassphrase_noneabletobrute` with your passphrase

- Run in terminal `php genkomodo.php`

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
```
