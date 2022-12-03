# Trezor\_Integration

The AtomicDEX API now is able to activate coins in Iguana and HW modes simultaneously!

For example, you can activate RICK with seed phrase private key like usual, and also activate MORTY with Hardware wallet at the same time.


To get started, [configure and launch the AtomicDEX API]("../atomicdex/atomicdex-setup/get-started-atomicdex.html"), then plug in your Trezor hardware wallet device. 

Below are the new v2 RPC methods for interacting with your Trezor.

Authentication:
- Initialise connection with your Trezor with [task::init_trezor::init]("#task_trezor_init")
- Check the status of the connecton with [task::init_trezor::status]("#task_trezor_status")
- Authenitcate usng PIN or phrase with [task::init_trezor::user_action]("#task_trezor_user_action")

Coin Activation in Hardware Mode:
- Use [task::enable_utxo::init]("#task_enable_utxo_init") for UTXO coins like KMD, BTC and DOGE, and check the activation status with [task::enable_utxo::status]("#task_enable_utxo_status")
- Use [task::enable_qtum::init]("#task_enable_qtum_init") for QTUM Ecosystem coins, and check the activation status with [task::enable_qtum::status]("#task_enable_qtum_status")

Withdrawing your Funds:
- Prepare a transaction with [task::withdraw::init]("#task_withdraw_init")
- Check the status of the transaction preparation with [task::withdraw::status]("#task_withdraw_status")
- Cancel the transaction preparation with [task::withdraw::cancel]("#task_withdraw_cancel")

Viewing Hardware Wallet Coin Balances:
- Initialise the balance request with [task::account_balance::init]("#task_withdraw_init")
- Check the status of the balance request with [task::account_balance::status]("#task_withdraw_status")

Creating New Addresses:
- Use [can_get_new_address]("#can_get_new_address") to determine if your current address has been used, or should be updated.
- Use [get_new_address]("#get_new_address") to generate a new address

