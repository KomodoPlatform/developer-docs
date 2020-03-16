# Generating

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## generate

**generate numblocks**

::: tip
This function can only be used in the <b>regtest</b> mode (for testing purposes).
:::

The `generate` method instructs the coin daemon to immediately mine the indicated number of blocks.

### Arguments

| Name      | Type      | Description                              |
| --------- | --------- | ---------------------------------------- |
| numblocks | (numeric) | the desired number of blocks to generate |

### Response

| Name        | Type    | Description                |
| ----------- | ------- | -------------------------- |
| blockhashes | (array) | hashes of blocks generated |

#### :pushpin: Examples

Command:

```bash
./komodo-cli generate 2
```

<collapse-text hidden title="Response">

```bash
[
  "0475316d63fe48bb9d58373595cb334fc2553f65496edfb2fb17b9ed06f4c480",
  "00d29a2b7dec52baa9ab8e4264363f32b4989eef7dbb0a9932fbc11274195b5a"
]
```

</collapse-text>

## getgenerate

**getgenerate**

The `getgenerate` method returns a boolean value indicating the server's mining status.

The default value is false.

::: tip
See also <b>gen</b>.
:::

### Arguments

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| (none) | (none) |

### Response

| Name       | Type      | Description                                           |
| ---------- | --------- | ----------------------------------------------------- |
| true/false | (boolean) | indicates whether the server is set to generate coins |

#### :pushpin: Examples

Command:

```bash
./komodo-cli getgenerate
```

<collapse-text hidden title="Response">

```bash
false
```

</collapse-text>

You can find your `rpcuser`, `rpcpassword`, and `rpcport` in the coin's `.conf` file.

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getgenerate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": false,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

## setgenerate

**setgenerate generate ( genproclimit )**

The `setgenerate` method allows the user to set the `generate` property in the coin daemon to `true` or `false`, thus turning generation (mining/staking) on or off.

Generation is limited to [genproclimit](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#genproclimit) processors. Set `genproclimit` to `-1` to use maximum available processors.

::: tip
See also the [getgenerate](../../../basic-docs/smart-chains/smart-chain-api/generate.html#getgenerate) method to query the current setting, and [genproclimit](../../../basic-docs/smart-chains/smart-chain-setup/common-runtime-parameters.html#genproclimit) for setting the default number of processors the daemon uses through the `.conf` file.
:::

### Arguments

| Name         | Type                | Description                                                                     |
| ------------ | ------------------- | ------------------------------------------------------------------------------- |
| generate     | (boolean, required) | set to true to turn on generation; set to off to turn off generation            |
| genproclimit | (numeric, optional) | set the processor limit for when generation is on; use value "-1" for unlimited |

### Response

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| (none) | (none) |

#### :pushpin: Examples

##### Activate mining with maximum available processors

Command:

```bash
./komodo-cli setgenerate true -1
```

<collapse-text hidden title="Response">

```bash
(none)
```

</collapse-text>

##### Activate staking

Command:

```bash
./komodo-cli setgenerate true 0
```

<collapse-text hidden title="Response">

```bash
(none)
```

</collapse-text>

##### Activate mining with 4 threads

Command:

```bash
./komodo-cli setgenerate true 4
```

<collapse-text hidden title="Response">

```bash
(none)
```

</collapse-text>

##### Check the setting

Command:

```bash
./komodo-cli getgenerate
```

<collapse-text hidden title="Response">

```bash
true
```

</collapse-text>

##### Turn off generation

Command:

```bash
./komodo-cli setgenerate false
```

<collapse-text hidden title="Response">

```bash
(none)
```

</collapse-text>

##### Turning the setting on via json RPC

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setgenerate", "params": [true, 1] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
  "result": null,
  "error": null,
  "id": "curltest"
}
```

</collapse-text>

<!-------- FIXME: get confirmation from alright

setstakingsplit

**setstakingsplit split_percentage**

The `setstakingsplit` method allows the user to decide what happens to a UTXO that is successfully able to stake a block in the POS64 staking system (i.e. a Smart Chain started using the [-ac_staked](../../antara/antara-setup/antara-customizations.md#ac-staked) parameter). 

The argument `split_percentage` defines the percentage of the staking UTXO value to leave in the same address. The rest of of the staking UTXO value is added to the new UTXO created to the coinbase address.

Examples:

- `split_percentage` = `0` merges the staking UTXO value and the coinbase value to the coinbase address
- `split_percentage` = `50` takes half of the staking UTXO value and sends it to the coinbase address 
- `split_percentage` = `100` does not change the staking UTXO 

### Arguments

| Name         | Type                | Description                                                                     |
| ------------ | ------------------- | ------------------------------------------------------------------------------- |
| split_percentage     | (numeric, required) | allowed value range: `0` to `100`; the percentage of the staking UTXO value to leave in the same address; the rest of of the staking UTXO value is added to the new UTXO created to the coinbase address          |

### Response

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| split_percentage | (numeric) |the supplied argument |

#### :pushpin: Examples

Command:

```bash
./komodo-cli -ac_name=HELLOWORLD setstakingsplit 0
```

<collapse-text hidden title="Response">

```json
{
    "split_percentage" : 0
}
```

</collapse-text>

Command:

```bash
curl --user $rpcuser:$rpcpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setstakingsplit", "params": [100] }' -H 'content-type: text/plain;' http://127.0.0.1:$rpcport/
```

<collapse-text hidden title="Response">

```json
{
    "split_percentage" : 100
}
```

</collapse-text>
-------->
