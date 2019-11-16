# Pegs (In development)

## Introduction

The Pegs Antara modules is a mechanism for creating a decentralized stable coin, pegged to any asset (fiat currency, stock, crypto that has a price source). To achieve this, users are allowed to lock tokenized external coins and withdraw 80% of their value in the form of the Smart Chain’s coin (a collateralized “deposit and loan” system). For example, if we need a Smart Chain named USDK whose coins are pegged to the USD and backed by KMD, we lock tokenized KMD in the Pegs module and withdraw upto 80% of its USD value as USDK coins. i.e., if the current price is KMD/USD = 1 , locking 100 KMD lets a user withdraw 80 USDK coins. These USDK coins can be used as a replacement for the USD in the open market to either buy other coins or trade for fiat or redeemed for the originally deposited KMD tokens used to create them.

Now, let us consider what happens when the price changes. If KMD/USD increases, this allows the user who locked the KMD initially to withdraw more USDK till they have redeemed 80% of the new value. If KMD/USD decreases, the user’s account is subject to liquidation when the debt ratio exceeds 90%. In this event, a third party can gain a 5% return by paying the debt of the account (returning the USDK coins, which will be burned). The remainder will be added to the Pegs module on the chain, to improve the global debt ratio and prevent the underlying assets(tokenized KMD) of the chain falling below the value of total USDK coins issued. To prevent their deposit from being liquidated, the user can either return some of the USDK coins or deposit more tokenized KMD to maintain a good debt ratio.

The Pegs module utilizes many of the existing Antara modules like Tokens, Gateways, Prices and Oracles:

- The Gateways module is used to lock coins of an external chain and create an equivalent amount as Tokens on the Smart Chain where Pegs is to be used.
- Oracles communicate the information about tokens deposited via the Gateway using an "oraclefeed" app, run by the Gateway/Chain creator (and potentially notary nodes).
- The DTO from the Prices module adds the required prices data to the Smart Chain in a trustless manner from a range of external sources, with a 24 hr delay.

## Tutorial Availability

The Antara Tutorials section features a full walkthrough for the user side of the Pegs module.

[<b>Link to the user side of the Pegs Module Tutorial</b>](../../../basic-docs/antara/antara-tutorials/pegs-module-user-tutorial.html)

## pegsaddress

**pegsaddress**

The `pegsaddress` method returns information about the Pegs module and associated addresses.

### Arguments

| Name   | Type | Description |
| ------ | ---- | ----------- |
| (none) |      |             |

### Response

| Name                  | Type     | Description                                                                                                          |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| "result"              | (string) | whether the command executed successfully                                                                            |
| "PegsCCAddress"       | (string) | taking the contract's EVAL code as a modifier, this is the public address that corresponds to the contract's privkey |
| "PegsCCBalance"       | (number) | the amount of funds in the `PegsCCAddress`                                                                           |
| "PegsNormalAddress"   | (string) | the unmodified public address generated from the contract's privkey                                                  |
| "PegsNormalBalance"   | (number) | the amount of funds in the `PegsNormalBalance`                                                                       |
| "PegsCCTokensAddress" | (string) | the public address where Tokens are locked in the Pegs module                                                        |
| "myCCAddress(Pegs)"   | (string) | taking the module's EVAL code as a modifier, this is the Antara address from the pubkey of the user                  |
| "myCCbalance(Pegs)"   | (number) |                                                                                                                      |
| "myaddress"           | (string) | the public address of the pubkey used to launch the chain                                                            |
| "mybalance"           | (number) | the amount of funds in the `myaddress`                                                                               |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD pegsaddress
```

<collapse-text hidden title="Response">

```json
{
  "result": "success",
  "PegsCCAddress": "RHnkVb7vHuHnjEjhkCF1bS6xxLLNZPv5fd",
  "PegsCCBalance": 999.9993,
  "PegsNormalAddress": "RMcCZtX6dHf1fz3gpLQhUEMQ8cVZ6Rzaro",
  "PegsNormalBalance": 0.0,
  "PegsCCTokensAddress": "RHG4K84bPP9h9KKqvpYbUzocaZ3LSUHxLa",
  "myCCAddress(Pegs)": "RBZ4AsnyhD3pZPasDmHXnbwNvQWy1CWK5H",
  "myCCbalance(Pegs)": 0.0,
  "myaddress": "RFmQiF4Zbzxchv9AG6dw6ZaX8PbrA8FXAb",
  "mybalance": 0.1025
}
```

</collapse-text>
