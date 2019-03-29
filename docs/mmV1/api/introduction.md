# Marketmaker Version1 API

## BarterDEX is officially deprecated as of this writing and mm2 is under testing before public release.

MarketmakerV1 was the backend for GUI like barterDEX and initial versions of HyperDEX. It facilitates trustless, p2p, [atomic,](https://www.youtube.com/watch?v=PeavTHz8LSA) swaps between almost 95% of the available cryptocurrencies like BTC, ETH, majority of Bitcoin forks and ERC20 tokens.

## Docker

Use command line JSON args, either `"docker":1` or `"docker":"<ipaddr>"` with marketmaker and the request must come from that ip address to be mapped to localhost.

If you have docker installed you can get the BarterDEX API running on Windows, Mac or Linux by running:

```bash
docker run -e PASSPHRASE="secure passphrase" -p 127.0.0.1:7783:7783 lukechilds/barterdex-api
```

[GitHub link](https://github.com/lukechilds/docker-barterdex-api)
