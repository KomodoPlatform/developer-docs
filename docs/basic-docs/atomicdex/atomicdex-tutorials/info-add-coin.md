# How to submit a Pull Request to add a coin to AtomicDEX-API


- First go through [this document](./coin-integration.md) to make sure that all the requirements are satisfied by the coin.
- The relevant repository is [https://github.com/KomodoPlatform/coins](https://github.com/KomodoPlatform/coins)
- This repository is the coins database which is accessed by graphical applications like the [AtomicDEX-PRO](https://github.com/KomodoPlatform/atomicDEX-Pro) or [AtomicDEX-mobile](https://github.com/KomodoPlatform/atomicDEX).

When submitting a pull request to add a coin to AtomicDEX-API, make sure you have completed this checklist:

## 0. The coin must be successfully Atomic swapped using the AtomicDEX-API

- When submitting your coin addition request, please submit the URLs of the four transctions (`makerpayment`, `takerpayment` and `takerpaymentspent`, `makerpaymentspent`) which are created by the [atomic swap](./atomicdex-walkthrough.md) performed through the AtomicdEX-API. This means that before going through the further steps in this doc and submitting the data to the [coins repo](https://github.com/KomodoPlatform/coins) , you would have successfully performed an atomic swap. The further steps explain the expected files/values to be submitted.
- You can learn about performing an atomic swap [here (Installing)](../atomicdex-setup/get-started-atomicdex.md) and [here (trading)](./atomicdex-walkthrough.md)
- Or you can contact the team at [coinintegration@komodoplatform.com](mailto:coinintegration@komodoplatform.com) or in the `#mm_2_0` channel in [our Discord server](https://komodoplatform.com/discord) to get help if required.

### Example

- makerpayment: [https://btc.example.org/tx/746179890c7cb6b10fe4fef1c835c51a648bba087d52903d9d889d84779b1b9b](https://btc.example.org/tx/746179890c7cb6b10fe4fef1c835c51a648bba087d52903d9d889d84779b1b9b)

- takerpayment: [https://kmd.example.net/tx/2aa3cdc0000936f8fb2a5285e852a57f128913edea4d562433975fe84f6e6a8c](https://kmd.example.net/tx/2aa3cdc0000936f8fb2a5285e852a57f128913edea4d562433975fe84f6e6a8c)

- takerpaymentspent: [https://kmd.example.net/tx/8e079579b1718f1bbccedb8b41162a599b988a54d4986698a096d4ff84c0dcc4](https://kmd.example.net/tx/8e079579b1718f1bbccedb8b41162a599b988a54d4986698a096d4ff84c0dcc4)

- makerpaymentspent: [https://btc.example.org/tx/f64ae4b56b43ab9017ccc767c16b9d9cdf438ed83de94ba0629f1213b5ecba72](https://btc.example.org/tx/f64ae4b56b43ab9017ccc767c16b9d9cdf438ed83de94ba0629f1213b5ecba72)

## 1. Coin info added to `coins` file (Required)

You need to add the following info in JSON format to [coins](https://github.com/KomodoPlatform/coins/blob/master/coins) file:

### Example 1
```json
{
    "coin": "LTC",
    "name": "litecoin",
    "fname": "Litecoin",
    "rpcport": 9332,
    "pubtype": 48,
    "p2shtype": 5,
    "wiftype": 176,
    "txfee": 100000,
    "mm2": 1,
    "required_confirmations": 3
}
```
### Example 2
```json
{
    "coin": "PEW",
    "name": "brofist",
    "fname": "Brofist",
    "confpath": "USERHOME/.brofistcore/brofist.conf"
    "rpcport": 12454,
    "pubtype": 55,
    "p2shtype": 10,
    "wiftype": 198,
    "txfee": 10000,
    "mm2": 1,
    "required_confirmations": 3
}
```
### Example 3
```json
{
    "coin": "REP",
    "name": "augur",
    "fname": "Augur",
    "etomic": "0xE94327D07Fc17907b4DB788E5aDf2ed424adDff6",
    "rpcport": 80,
    "mm2": 1,
    "required_confirmations": 3
}
```
### Example 4
```json
	{
		"coin": "CHIPS",
		"name": "chips",
		"fname": "Chips",
		"rpcport": 57776,
		"pubtype": 60,
		"p2shtype": 85,
		"wiftype": 188,
		"txfee": 10000,
		"segwit": true,
		"mm2": 1,
		"required_confirmations": 2,
		"requires_notarization": true
	}
```

### Bitcoin Protocol specific JSON

- The value of the key `"coin"` must be the coin ticker.
- The value of the key `"name"` must be coin's name, in all small letters. This is the value which is expected to be the default data directory name for that coin in Linux. For example if the coin's name is Litecoin then it's expected data directory on Linux is `~/.litecoin/`, on Mac - `~/Library/Applications Support/Litecoin/`, on Windows - `%AppData%\\Litecoin`. Please keep this key's value in small letters only.
- `"confpath"` must be used **ONLY** in case the expected data directory name of the coin/project is different to the key - `"name"`'s value, as explained in last point. Please refer to Example 2 above for better understanding. Make sure to use the exact format for `confpath`. You don't need to change the word `USERHOME`, it remains as is. Make sure you have a `/`. after `USERHOME`. And then the expected coin/project's data directory path and its expected `.conf` file name.
- `"fname"` must be the coin's full name.
- `"rpcport"` must be coin's default RPC port. It is expected that it doesn't conflict with any other existing coin in the coins db.
- `"pubtype"`, `"p2shtype"`, and `"wiftype"` is also the very specific information about the coin's parameters. This is specific to Bitcoin Protocol compatible coins only, and such information can be found in the source code of the project. These parameters' information can be expected in files like `src/init.cpp`, `src/base58.h`, and `src/chainparamsbase.h` if the project is following the **bitcoin** source code directory/files structure. If the parameters info is unclear then please have these confirmed by that coin/project's developers and make sure it's correct.
- `"txfee"` is a value of default transactions fee, which must be specified in satoshis. BarterDEX uses this as the default transaction fee value for the coin, when making the atomic swap transactions.
- `"mm2"` is set to 1 for coins that are tested to work with the AtomicdEX-API.
- `"required_confirmations"` is the number of confirmations a transaction must receive before it can be considered to be truly confirmed/final.
- `"requires_notarization"` can be set to true for coins that are protected by the dPoW mechanism of Komodo Platform. When set to true, the transaction is considered final only after it receives atleast one notarization

### Ethereum Protocol specific JSON

- Ethereum protocol specific coin/project addition requests are very simple. `"coin"`, `"name"`, and `"fname"` information is same as explained in the above bitcoin protocol specific json section.
- `"rpcport"` must remain default for all ERC20 token/coins. Make sure its only specified as `80`.
- `"etomic"` must be the ERC20 token/coin's smart contract address.
- `"mm2"` is set to 1 for coins that are tested to work with the AtomicdEX-API.
- `"required_confirmations"` is the number of confirmations a transaction must receive before it can be considered to be truly confirmed/final.

## 2. Icon file (Required)

- An icon that represents the coin is required.
- The icon file must be in the **.png** format.
- Dimentions of icon file: `82x82` pixels.
- The icon file's name **MUST** be in **small letters**.
- The icon file should be submitted to the directory: [icons](https://github.com/KomodoPlatform/coins/blob/master/icons) through a Pull Request.

## 3. Explorer URL (Required)

- Explorer file name must be coin's ticker name matching the `"coin"` value as specified in [coins](https://github.com/KomodoPlatform/coins/blob/master/coins) file.
- Explorer file name must not have any file extension. It is a file without any `.` extension.
- Explorer file name must be all in **capital** letters.
- It must have a valid JSON array with at least one Explorer URL in it. It's better if there are more than one explorer URLs in this JSON array. Example: `["http://example1.com/tx/","http://example2.com/tx/"]`.
- The URL of Explorer must be pointing to the transactions URL. Check BTC file for an example: [explorers/BTC](https://github.com/KomodoPlatform/coins/blob/master/explorers/BTC) , which has `["https://www.blocktrail.com/BTC/tx/"]`. This explorer's URL is used to show in graphical applications to link to the transactions like this [example link](https://www.blocktrail.com/BTC/tx/5268d045196e940ca8ba53b442c38a0f8c159002c912f8427239153dce984cc3) . Make sure this URL ends with `/`.

## 4. Electrum Servers (Optional)

- Electrum file name must be coin's ticker name matching the `"coin"` value as specified in the [coins](https://github.com/KomodoPlatform/coins/blob/master/coins) file.
- Electrum file name must not have any file extension. It is a file without any `.` extension.
- Electrum file name must be in all **capital** letters.
- It must be a valid JSON format as shown in the following example:

```json
[
  {
    "url": "electrum1.example.com:12345",
    "contact": [
      {
        "email": "electrum1_admin_email@example.com"
      },
      {
        "matrix": "@electrum1_admin:matrix.org"
      },
      {
        "skype": "example_username"
      },
      {
        "twitter": "example_username"
      },
      {
        "reddit": "example_username"
      },
      {
        "github": "example_username"
      },
      {
        "keybaseio": "example_username"
      }
    ]
  },
  {
    "url":"electrum2.example.com:12345",
    "contact": [
      {
        "email": "electrum2_admin_email@example.com"
      }
    ]
  }
]
```

- A minimum of 2 or more Electrum servers information must be provided.
- Contact information must be provided in case the server admin needs to be contacted in urgent cases when required. It can be any contact information out of the examples provided. Or may be add your own service/contact information as it suites you.
- The address and port of electrum server are required. The address of electrum server can either be a DNS or an IP address.
