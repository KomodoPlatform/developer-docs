# Pegs

## Introduction

Introduction

## sample

**faucetaddress [pubkey]**

The `faucetaddress` method returns the Antara address information for the specified pubkey. If no pubkey is provided, the method returns information for the pubkey used to launch the daemon.

### Arguments

| Name | Type | Description | 
| --------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| pubkey    | (string, optional) | the desired pubkey; the method uses the pubkey used to launch the daemon if no pubkey is provided |

### Response

| Name | Type | Description | 
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| FaucetCCaddress | (string) | taking the faucet module's `EVAL` code as a modifier, this is the public address that corresponds to the faucet module's privkey |
| Faucetmarker    | (string) | the internal address (not related to usage of faucet)                                                                                |
| FaucetCCassets  | (string) | the internal address (not related to usage of faucet)                                                                                |
| GatewaysPubkey  | (string) | the global pubkey for this Gateways module                                                                                  |
| CCaddress       | (string) | taking the faucet module's `EVAL` code as a modifier, this is the Antara address from the pubkey of the user                           |
| myCCaddress     | (string) | taking the faucet module's `EVAL` code as a modifier, this is the Antara address from the pubkey of the user                           |
| myaddress       | (string) | the unmodified public address of the pubkey used to launch the chain                                                                 |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD faucetaddress 03336ca9db27cb6e882830e20dc525884e27dc94d557a5e68b972a5cbf9e8c62a8
```


<collapse-text hidden title="Response">


```json
{
  "result": "success",
  "FaucetCCaddress": "R9zHrofhRbub7ER77B7NrVch3A63R39GuC",
  "Faucetmarker": "RKQV4oYs4rvxAWx1J43VnT73rSTVtUeckk",
  "GatewaysPubkey": "03ea9c062b9652d8eff34879b504eda0717895d27597aaeb60347d65eed96ccb40",
  "FaucetCCassets": "RF2p5LgEBpUzUgUyFSUDa8ZBnr2wxE87do",
  "CCaddress": "RReGLfH2MTrkeLSepkVy5vnQPE29g7KofS",
  "myCCaddress": "RReGLfH2MTrkeLSepkVy5vnQPE29g7KofS",
  "myaddress": "RJYiWn3FRCSSLf9Pe5RJcbrKQYosaMburP"
}
```

</collapse-text>

