# Start using or testing AtomicDEX quickly

Download the latest release of AtomicDEX-API for your OS from [https://github.com/KomodoPlatform/atomicDEX-API/releases](https://github.com/KomodoPlatform/atomicDEX-API/releases)

- If the latest release tag is `beta-2.0.1683`, the download links should be available at [https://github.com/KomodoPlatform/atomicDEX-API/releases/tag/beta-2.0.1683](https://github.com/KomodoPlatform/atomicDEX-API/releases/tag/beta-2.0.1683)
- Scroll down to the bottom of the page and expand the "Assets" section by clicking on it
- To download, click on the link that has the words "mm2", "Release" and the name of your OS in it
- Extract the downloaded file into a new folder named `AtomicDEX`
  - The directory structure should be something like  `AtomicDEX/mm2` i.e., the `mm2` binary should be present in a directory named `AtomicDEX`
- Open a Terminal and `cd` into the AtomicDEX directory
- Download the `coins` file; it contains the configuration information for all the supported coins

```bash
wget https://raw.githubusercontent.com/jl777/coins/master/coins
```

- Download the sample mm2 config file

```bash
wget https://raw.githubusercontent.com/gcharang/mm2scripts/master/MM2_sample.json
```

- Rename it to `MM2.json` and change the values of the keys `"rpc_password"` and `"passphrase"`
  - `"rpc_password"`'s value is used to authenticate yourself when sending curl commands
  - `"passphrase"`'s value is your seed words
- Start AtomicDEX by issuing the following command in a terminal window

```bash
stdbuf -oL nohup ./mm2
```

- AtomicDEX (mm2) is up and running
- You can find all the possible methods accepted by it here: [https://developers.atomicdex.io/basic-docs/atomicdex/atomicdex-api.html](https://developers.atomicdex.io/basic-docs/atomicdex/atomicdex-api.html)

- To easily test/use various methods, open another terminal window and export the `rpc_password`'s value to the environment variable named `userpass`

```bash
export userpass="<value of rpc_password from MM2.json here>"
```

- Now, find the version of the program using the `version` RPC:

```bash
curl --url "http://127.0.0.1:7783" --data "{\"method\":\"version\",\"userpass\":\"$userpass\"}"
```
