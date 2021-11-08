let atomicDEXsidebar = {
  title: "AtomicDEX",
  collapsible: true,
  children: [
    [
      "/basic-docs/atomicdex/introduction-to-atomicdex.md",
      "Introduction to AtomicDEX Documentation",
    ],
    {
      title: "AtomicDEX Setup",
      collapsible: true,
      children: [
        [
          "/basic-docs/atomicdex/atomicdex-setup/get-started-atomicdex.md",
          "Installing the AtomicDEX-API (MM2)",
        ],
      ],
    },
    {
      title: "AtomicDEX Tutorials",
      collapsible: true,
      children: [
        [
          "/basic-docs/atomicdex/atomicdex-tutorials/introduction-to-atomicdex.md",
          "Introduction to AtomicDEX",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.md",
          "AtomicDEX Walkthrough",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-tutorials/how-to-become-a-liquidity-provider.md",
          "How to Become a Liquidity Provider",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-tutorials/atomicdex-metrics.md",
          "DEX Metrics",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-tutorials/additional-information-about-atomicdex.md",
          "Additional Information About AtomicDEX",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-tutorials/setup-atomicdex-aws.md",
          "How to Setup and use AtomicDEX-API on a AWS EC2 instance",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-tutorials/coins-file-update.md",
          "How to update the coins file to work with the latest atomicDEX-API",
        ],
      ],
    },
    {
      title: "AtomicDEX API 2.0",
      collapsible: true,
      children: [
        [
          "/basic-docs/atomicdex/atomicdex-api-20/mmrpc-20.md",
          "MmRPC Protocol v2.0",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-20/add_node_to_version_stat.md",
          "add_node_to_version_stat",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-20/remove_node_from_version_stat.md",
          "remove_node_from_version_stat",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-20/start_version_stat_collection.md",
          "start_version_stat_collection",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-20/update_version_stat_collection.md",
          "update_version_stat_collection",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-20/stop_version_stat_collection.md",
          "stop_version_stat_collection",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-20/get_public_key.md",
          "get_public_key",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-20/trade_preimage.md",
          "trade_preimage",
        ],
        ["/basic-docs/atomicdex/atomicdex-api-20/withdraw.md", "withdraw"],
      ],
    },
    {
      title: "AtomicDEX Legacy API ",
      collapsible: true,
      children: [
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/rational_number_note.md",
          "Note about rational number type",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/batch_requests.md",
          "batch_requests",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/active_swaps.md",
          "active_swaps",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/all_swaps_uuids_by_filter.md",
          "all_swaps_uuids_by_filter",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/ban_pubkey.md",
          "ban_pubkey",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/best_orders.md",
          "best_orders",
        ],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/buy.md", "buy"],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/cancel_all_orders.md",
          "cancel_all_orders",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/cancel_order.md",
          "cancel_order",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/coins_needed_for_kick_start.md",
          "coins_needed_for_kick_start",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/convertaddress.md",
          "convertaddress",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/convert_utxo_address.md",
          "convert_utxo_address",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/disable_coin.md",
          "disable_coin",
        ],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/electrum.md", "electrum"],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/enable.md", "enable"],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/get_enabled_coins.md",
          "get_enabled_coins",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/get_my_peer_id.md",
          "get_my_peer_id",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/get_trade_fee.md",
          "get_trade_fee",
        ],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/help.md", "help"],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/import_swaps.md",
          "import_swaps",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/kmd_rewards_info.md",
          "kmd_rewards_info",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/list_banned_pubkeys.md",
          "list_banned_pubkeys",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/max_taker_vol.md",
          "max_taker_vol",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/min_trading_vol.md",
          "min_trading_vol",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/my_balance.md",
          "my_balance",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/my_orders.md",
          "my_orders",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/my_recent_swaps.md",
          "my_recent_swaps",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/my_swap_status.md",
          "my_swap_status",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/my_tx_history.md",
          "my_tx_history",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/orderbook_depth.md",
          "orderbook_depth",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/orderbook.md",
          "orderbook",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/orders_history_by_filter.md",
          "orders_history_by_filter",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/order_status.md",
          "order_status",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/recover_funds_of_swap.md",
          "recover_funds_of_swap",
        ],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/sell.md", "sell"],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/send_raw_transaction.md",
          "send_raw_transaction",
        ],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/setprice.md", "setprice"],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/set_required_confirmations.md",
          "set_required_confirmations",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/set_requires_notarization.md",
          "set_requires_notarization",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/show_priv_key.md",
          "show_priv_key",
        ],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/stop.md", "stop"],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/trade_preimage.md",
          "trade_preimage",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/update_maker_order.md",
          "update_maker_order",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-api-legacy/validateaddress.md",
          "validateaddress",
        ],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/version.md", "version"],
        ["/basic-docs/atomicdex/atomicdex-api-legacy/withdraw.md", "withdraw"],
      ],
    },
    {
      title: "AtomicDEX Beta",
      collapsible: true,
      children: [
        [
          "/basic-docs/atomicdex/atomicdex-beta/create-a-new-wallet-using-atomicdex-mobile.md",
          "Create a New Wallet Using AtomicDEX Mobile",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-beta/restore-wallet-using-atomicdex-mobile.md",
          "Restore Wallet Using AtomicDEX Mobile",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-beta/add-and-activate-coins-on-atomicdex-mobile.md",
          "Add and Activate Coins on AtomicDEX Mobile",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-beta/view-your-receiving-address-to-send-funds-for-trading.md",
          "View Your Receiving Address to Send Funds for Trading",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-beta/withdraw-or-send-funds-using-atomicdex-mobile.md",
          "Withdraw or Send Funds Using AtomicDEX Mobile",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-beta/perform-cross-chain-atomic-swaps-using-atomicdex-mobile.md",
          "Perform Cross-Chain Atomic Swaps Using AtomicDEX Mobile",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-beta/view-ongoing-orders-and-swap-history-on-atomicdex-mobile.md",
          "View Ongoing Orders and Swap History on AtomicDEX Mobile",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-beta/recover-seed-on-atomicdex-mobile.md",
          "Recover Seed on AtomicDEX Mobile",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-beta/delete-seed-from-atomicdex-mobile.md",
          "Delete Seed (Wallet) on AtomicDEX Mobile",
        ],
      ],
    },
    ["/basic-docs/atomicdex/changelog.md", "AtomicDEX Change Log"],
  ],
};
module.exports = atomicDEXsidebar;
