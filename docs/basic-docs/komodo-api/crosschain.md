# Crosschain

The following RPC calls interact with the `komodod` software, and are made available through the `komodo-cli` software.

## MoMoMdata

**MoMoMdata symbol kmdheight ccid**

### Arguments:

### Response:

#### :pushpin: Examples:

## assetchainproof

**assetchainproof needs a txid**

### Arguments:

### Response:

#### :pushpin: Examples:

## calc_MoM

**calc_MoM height MoMdepth**

### Arguments:

### Response:

#### :pushpin: Examples:

## getNotarisationsForBlock

**getNotarisationsForBlock blockHash**

Takes a block hash and returns notarisation transactions within the block

### Arguments:

| Structure | Type     | Description       |
| --------- | -------- | ----------------- |
| blockHash | (string) | hash of the block |

### Response:

#### :pushpin: Examples:

## height_MoM

**height_MoM height**

### Arguments:

### Response:

#### :pushpin: Examples:

## migrate_completeimporttransaction

**migrate_completeimporttransaction importTx**

### Arguments:

### Response:

#### :pushpin: Examples:

## migrate_converttoexport

**migrate_converttoexport rawTx dest_symbol export_amount**

### Arguments:

### Response:

#### :pushpin: Examples:

## migrate_createimporttransaction

**migrate_createimporttransaction burnTx payouts**

### Arguments:

### Response:

#### :pushpin: Examples:

## scanNotarisationsDB

**scanNotarisationsDB blockHeight symbol [blocksLimit=1440]**

### Arguments:

### Response:

#### :pushpin: Examples:
