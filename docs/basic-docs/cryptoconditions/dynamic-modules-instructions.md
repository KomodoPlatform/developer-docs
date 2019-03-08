# Instructions for Using CCLib-related Modules

## Introduction

A new way of creating the modules has been introduced, which allows the daemon, `komodod`, to be built containing a dynamic library named `libcc.so` that contains any specified set of dynamic modules. Ex: rogue, musig, sudoku etc., And such a `komodod` will be able to start an assetchain that has any of the specified modules enabled.

::: warning

- The creation of `libcc.so` and build process is not yet final.
- Currently `komodod` containing a dynamic module is built and used to launch an asset chain that has the module enabled through the parameter [-ac_cclib.](../installations/asset-chain-parameters.html#ac-cclib)
- Go through the pages for differnt dynamic modules to learn how to build and test them currently.
- The specifics of this process may change in the futute

:::

## Creating a new Dynamic Module

- Make a copy of [cclib.cpp](https://github.com/jl777/komodo/blob/jl777/src/cc/cclib.cpp)

::: tip

- Each module must be given an `EVAL code` which also acts as an identifier to interact with the module when using calls from the [CClib](../komodo-api/cclib.html) section.
- The `EVAL code` defined must be >= 16 and < 128

:::

- Edit the table that defines RPC calls to add any new ones that are required.
- Add the RPC calls and the module to the directory [komodo/src/cc](https://github.com/jl777/komodo/blob/jl777/src/cc/)
- The file `libcc.so` is currently statically linked so you need to relink `komodod` as shown [here](https://github.com/jl777/komodo/blob/jl777/src/cc/makecclib)

::: tip Notice
Work is being done to allow dynamic loading of `libcc.so`. Then it just needs to be in the same directory as `komodod` and it will update the available dynamic modules to whatever is in the `libcc.so`
:::

- Build the `libcc.so` and put it in the directory [komodo/src](https://github.com/jl777/komodo/blob/jl777/src/) and rebuild
- The `komodod` built so, has the newly created module in it.
- To launch a chain that has this module enabled, include the parameter [-ac_cclib.](../installations/asset-chain-parameters.html#ac-cclib) with its value as the name of the dynamic library defined in the file: [cclib.cpp](https://github.com/jl777/komodo/blob/jl777/src/cc/cclib.cpp) in the variable `MYCCLIBNAME`
