# Anatomy of an ETOMIC swap (Atomic swap with ETH/ERC20 tokens using mmV1)

## Introduction

ETOMIC is an independent Blockchain started by the Komodo Team to facilitate Atomic-swaps between Bitcoin/Bitcoin compatibles (UTXO based coins) and Ethereum/ERC20 tokens.

At a higher level, Ethereum is balance based and Bitcoin comapatible coins are UTXO based. With the introduction of ETOMIC, we can simulate UTXO like behaviour for the ETH/ERC20 token so that the existing UTXO based atomic-swap protocol that has been coded into BarterDEX can be used right away to swap between Bitcoin comapatible coins and ETH/ERC20 tokens trustlessly in an Atomic process that has been tested to work for several hundred different pairs of Bitcoin comapatible coins.

Also, Ethereum lacks blockchain enforced multisig and HTLC, so smart contracts need to handle their functions. That is we need to depend on the Ethereum smart contract for the actual atomicity where the swap either completes or is unwound as if neither side started it. (Unless the protocol ensures that both sides of the swap or neither side completes, it isnt atomic.)

To minimize the chance of bugs in the ETH smart contract causing mishaps, the design for the BarterDEX support of ETH is to reduce the requirement on the ETH side to that of a gateway, with a few extra features, like automatic refund on expiration of time.

The bulk of the atomic swap is done via the Bitcoin protocol using the ETOMIC chain. When a swap is negotiated, the exact price of the ETH/ERC20 is agreed to and this spawns a special lock/unlock of ETOMIC for ETH/ERC20.

At the high level, the concept is to swap the ETOMIC first and then have an extra step of redeeming the ETOMIC for the ETH/ERC20 to complete the swap.

The ETOMIC used in the swap will be colored so only the exact specific txid involved will be able to be used to redeem. This solves the problem of other unrelated ETOMIC from stealing the locked ETH/ERC20 token.

All ETOMIC transactions need to be signed to avoid MITM (Man In The Middle) attacks. The nodes doing an etomic-swap will need to monitor the corresponding blockchains and post signed transactions after confirmation of key events.

In the current implementation, ETOMIC is distributed through a faucet. Marketmaker app (Backend of BarterDEX and HyperDEX) makes a request to the faucet when the ETOMIC coin is enabled. The Faucet is programmed to send 100 ETOMIC to every new address. The Mechanics are handled by etomic-swap smart contracts [https://github.com/artemii235/etomic-swap](https://github.com/artemii235/etomic-swap) and marketmaker app.

When a swap between BTC and ETH is performed it's a BTC and ETOMIC swap in reality. The ETH transaction is sent using ETOMIC txid and the redeem script parameters.

## The Details

The normal Atomic-swap protocol:

1. trade negotiation
1. dexfee by alice
1. bobdeposit
1. alicepayment
1. bobpayment
1. alicespend
1. bobspend
1. bobrefund

In the case where a swap completes, bob gets bobspend (of alicepayment) and alice gets alicespend or alice gets the bobdeposit and bob gets the alicepayment.

In all cases where the swap doesn't complete, alice is unable to spend bobpayment and bobdeposit and bob doesnt get alicepayment.

This leads to the ETH side granting a refund in the case for bob when alice doesnt submit either bobpayment or bobdeposit being spent OR for alice when bob doesnt submit a spent alicepayment.

The ETOMIC blockchain works as a proxy (using a colored coins concept) where ETOMIC transactions are sent when ETH/ERC20 swap is happening. ETH/ERC20 are getting locked by etomic-swap smart contracts using same conditions as ETOMIC transactions.

### Example:

Bob deposit ETOMIC transaction: [http://etomic.explorer.dexstats.info/tx/285bc713a4d6a8215c930eaa85a2b46482bc292ddf3d55eba39631bf3d840492](http://etomic.explorer.dexstats.info/tx/285bc713a4d6a8215c930eaa85a2b46482bc292ddf3d55eba39631bf3d840492)

Corresponding ETH deposit: [https://etherscan.io/tx/0x09e245b0e1e0ebf90f5b73bb26b1f48908a87cde548fc4b61f543578a7adc59b](https://etherscan.io/tx/0x09e245b0e1e0ebf90f5b73bb26b1f48908a87cde548fc4b61f543578a7adc59b)

As can be seen in the transaction (tx) details, it uses the ETOMIC txid and other parameters (from ETOMIC tx redeem script) to lock the ETH:

```bash
Function: bobMakesEthDeposit(bytes32 _txId, address _alice, bytes20 _secretHash, uint64 _lockTime)

MethodID: 0xdd23795f
[0]:  285bc713a4d6a8215c930eaa85a2b46482bc292ddf3d55eba39631bf3d840492
[1]:  000000000000000000000000078a1db84a2995c22cb72a390c3d279448dbfbf2
[2]:  49a0f4e29e49cc78b60dcf062026e8d8def636f3000000000000000000000000
[3]:  000000000000000000000000000000000000000000000000000000005ab4cdf8
```

ETOMIC bob deposit spending transaction : [http://etomic.explorer.dexstats.info/tx/f4f23a0c746da4bb0de870d4f1b8f365fd7c436c950dcef74558632fe5fe55c0](http://etomic.explorer.dexstats.info/tx/f4f23a0c746da4bb0de870d4f1b8f365fd7c436c950dcef74558632fe5fe55c0)

It's redeem script is:

```bash
OP_IF 1521798648
OP_NOP2
OP_DROP
OP_SIZE 32
OP_EQUALVERIFY
OP_HASH160 4773d9f9c4d46830f3fcc68e4a7b3707058fd298
OP_EQUALVERIFY 020394b1d0c4f83710b2044fbdf062ffb132243ac89f33f71a47711a53defc4278
OP_CHECKSIG
OP_ELSE
OP_SIZE 32
OP_EQUALVERIFY
OP_HASH160 de738c0c3d433b68cafbe0e5c4dd4ba9e2a90d07
OP_EQUALVERIFY 039d321ddbb2d9e2a3a629cbaedd958f154f389da62487eec818dd98cfd7fc6416
OP_CHECKSIG
OP_ENDIF
```

- The pushed data is:

```bash
30440220122a4969c6b49179dcd0058887d0f7ab8a3524330e5074dd5294c465c5b79a50022026d2408e6769517b789377deb9eb086d26052d3af42adb1010ce8f3c65a4bdcc01 cc21cff653931156deb8961d64e368710c63879174c576081c735604c4a34fe4
```

- Bob refund on ETH side: [https://etherscan.io/tx/0x64c434db95905cbcc14d9ce6172915218fbd5c49840c948a416dc44828ca6499](https://etherscan.io/tx/0x64c434db95905cbcc14d9ce6172915218fbd5c49840c948a416dc44828ca6499)

```bash
Function: bobClaimsDeposit(bytes32 _txId, uint256 _amount, bytes32 _secret, address _alice, address _tokenAddress)

MethodID: 0x1f7a72f7
[0]: 285bc713a4d6a8215c930eaa85a2b46482bc292ddf3d55eba39631bf3d840492
[1]: 0000000000000000000000000000000000000000000000000028ac9ad102f800
[2]: e44fa3c40456731c0876c5749187630c7168e3641d96b8de56119353f6cf21cc
[3]: 000000000000000000000000078a1db84a2995c22cb72a390c3d279448dbfbf2
[4]: 0000000000000000000000000000000000000000000000000000000000000000
```

- When Bob refunded the deposit he revealed his bob privn: `cc21cff653931156deb8961d64e368710c63879174c576081c735604c4a34fe4`

- On ETH side he revealed the same key but in reverted bytes order: `e44fa3c40456731c0876c5749187630c7168e3641d96b8de56119353f6cf21cc`

- On ETOMIC side, bob privn ends with `4f` and `e4` bytes while it starts with `e4` and `4f` on ETH side etc.

- It also uses the same timelock hex `5ab4cdf8`, which is equal to decimal `1521798648`.
