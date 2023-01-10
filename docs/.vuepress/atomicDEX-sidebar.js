let atomicDEXsidebar = {
  "/basic-docs/atomicdex/": [
    {
      title: "AtomicDEX",
      collapsable: false,
      children: [
        [
          "/basic-docs/atomicdex/introduction-to-atomicdex.md",
          "Introduction to AtomicDEX Documentation",
        ],
        [
          "/basic-docs/atomicdex/atomicdex-methods.md",
          "RPC Methods for AtomicDEX",
        ],
        {
          title: "Setup",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex/atomicdex-setup/get-started-atomicdex.md",
              "Installing AtomicDEX-API",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-setup/configure-mm2-json.md",
              "Configuring AtomicDEX-API",
            ],
          ],
        },
        {
          title: "Tutorials",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/introduction-to-atomicdex.md",
              "AtomicDEX Introduction",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/atomicdex-walkthrough.md",
              "AtomicDEX Walkthrough",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/atomicdex-metrics.md",
              "DEX Metrics",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/add-coin-to-atomicdex-desktop.md",
              "List a new coin on AtomicDEX Desktop",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/how-to-become-a-liquidity-provider.md",
              "How to Become a Liquidity Provider",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/query-the-mm2-database.md",
              "How to Query the MM2 SQLite Database",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/setup-atomicdex-aws.md",
              "How to Setup and Use AtomicDEX-API on a AWS EC2 Instance",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/coins-file-update.md",
              "How to Update your Coins File",
            ],
            [
              "/basic-docs/atomicdex/atomicdex-tutorials/additional-information-about-atomicdex.md",
              "More Information About AtomicDEX",
            ],
          ],
        },
        {
          title: "User Guides (Mobile)",
          collapsable: true,
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
        ["/basic-docs/atomicdex/changelog.md", "Changelog"],
      ],
    },
  ],
  "/basic-docs/atomicdex-api-legacy/": [
    {
      title: "AtomicDEX API (Legacy)",
      collapsable: false,
      children: [
        [
          "/basic-docs/atomicdex-api-legacy/batch_requests.md",
          "batch_requests",
        ],
        [
          "/basic-docs/atomicdex-api-legacy/rational_number_note.md",
          "Note about rational number type",
        ],
        {
          title: "Coin Activation",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-legacy/coin_activation.md",
              "coin activation",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/coins_needed_for_kick_start.md",
              "coins_needed_for_kick_start",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/disable_coin.md",
              "disable_coin",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/get_enabled_coins.md",
              "get_enabled_coins",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/set_required_confirmations.md",
              "set_required_confirmations",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/set_requires_notarization.md",
              "set_requires_notarization",
            ],
          ],
        },
        {
          title: "Network",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-legacy/get_gossip_mesh.md",
              "get_gossip_mesh",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/get_gossip_peer_topics.md",
              "get_gossip_peer_topics",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/get_gossip_topic_peers.md",
              "get_gossip_topic_peers",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/get_my_peer_id.md",
              "get_my_peer_id",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/get_peers_info.md",
              "get_peers_info",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/get_relay_mesh.md",
              "get_relay_mesh",
            ],
          ],
        },
        {
          title: "Orders",
          collapsable: true,
          children: [
            ["/basic-docs/atomicdex-api-legacy/best_orders.md", "best_orders"],
            ["/basic-docs/atomicdex-api-legacy/buy.md", "buy"],
            [
              "/basic-docs/atomicdex-api-legacy/cancel_all_orders.md",
              "cancel_all_orders",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/cancel_order.md",
              "cancel_order",
            ],
            ["/basic-docs/atomicdex-api-legacy/my_orders.md", "my_orders"],
            ["/basic-docs/atomicdex-api-legacy/orderbook.md", "orderbook"],
            [
              "/basic-docs/atomicdex-api-legacy/orderbook_depth.md",
              "orderbook_depth",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/orders_history_by_filter.md",
              "orders_history_by_filter",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/order_status.md",
              "order_status",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/recover_funds_of_swap.md",
              "recover_funds_of_swap",
            ],
            ["/basic-docs/atomicdex-api-legacy/sell.md", "sell"],
            ["/basic-docs/atomicdex-api-legacy/setprice.md", "setprice"],
            [
              "/basic-docs/atomicdex-api-legacy/update_maker_order.md",
              "update_maker_order",
            ],
          ],
        },
        {
          title: "Swaps",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-legacy/active_swaps.md",
              "active_swaps",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/all_swaps_uuids_by_filter.md",
              "all_swaps_uuids_by_filter",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/get_trade_fee.md",
              "get_trade_fee",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/import_swaps.md",
              "import_swaps",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/min_trading_vol.md",
              "min_trading_vol",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/max_taker_vol.md",
              "max_taker_vol",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/my_recent_swaps.md",
              "my_recent_swaps",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/my_swap_status.md",
              "my_swap_status",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/trade_preimage.md",
              "trade_preimage",
            ],
          ],
        },
        {
          title: "Utility",
          collapsable: true,
          children: [
            ["/basic-docs/atomicdex-api-legacy/ban_pubkey.md", "ban_pubkey"],
            ["/basic-docs/atomicdex-api-legacy/help.md", "help"],
            [
              "/basic-docs/atomicdex-api-legacy/list_banned_pubkeys.md",
              "list_banned_pubkeys",
            ],
            ["/basic-docs/atomicdex-api-legacy/stop.md", "stop"],
            [
              "/basic-docs/atomicdex-api-legacy/unban_pubkeys.md",
              "unban_pubkeys",
            ],
            ["/basic-docs/atomicdex-api-legacy/version.md", "version"],
          ],
        },
        {
          title: "Wallet",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-legacy/convertaddress.md",
              "convertaddress",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/convert_utxo_address.md",
              "convert_utxo_address",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/kmd_rewards_info.md",
              "kmd_rewards_info",
            ],
            ["/basic-docs/atomicdex-api-legacy/my_balance.md", "my_balance"],
            [
              "/basic-docs/atomicdex-api-legacy/my_tx_history.md",
              "my_tx_history",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/send_raw_transaction.md",
              "send_raw_transaction",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/show_priv_key.md",
              "show_priv_key",
            ],
            [
              "/basic-docs/atomicdex-api-legacy/validateaddress.md",
              "validateaddress",
            ],
            ["/basic-docs/atomicdex-api-legacy/withdraw.md", "withdraw"],
          ],
        },
      ],
    },
  ],
  "/basic-docs/atomicdex-api-20/": [
    {
      title: "AtomicDEX API 2.0 (Master)",
      collapsable: false,
      children: [
        [
          "/basic-docs/atomicdex-api-20/",
          "AtomicDEX-API RPC Protocol v2.0 (Master)",
        ],
        {
          title: "Coin Activation",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-20/enable_bch_with_tokens.md",
              "enable_bch_with_tokens",
            ],
            ["/basic-docs/atomicdex-api-20/enable_slp.md", "enable_slp"],
            [
              "/basic-docs/atomicdex-api-20/enable_eth_with_tokens.md",
              "enable_eth_with_tokens",
            ],
            ["/basic-docs/atomicdex-api-20/enable_erc20.md", "enable_erc20"],
            [
              "/basic-docs/atomicdex-api-20/enable_tendermint_with_assets.md",
              "enable_tendermint_with_assets",
            ],
            ["/basic-docs/atomicdex-api-20/enable_tendermint_token.md", "enable_tendermint_token"],
          ],
        },
        {
          title: "Market Maker Bot",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-20/start_simple_market_maker_bot.md",
              "start_simple_market_maker_bot",
            ],
            [
              "/basic-docs/atomicdex-api-20/stop_simple_market_maker_bot.md",
              "stop_simple_market_maker_bot",
            ],
            [
              "/basic-docs/atomicdex-api-20/telegram_alerts.md",
              "telegram_alerts",
            ],
          ],
        },
        {
          title: "Message Signing",
          collapsable: true,
          children: [
            [
            "/basic-docs/atomicdex-api-20/message_signing.md#message-signing",
            "sign_message",
            ],
            [
            "/basic-docs/atomicdex-api-20/message_signing.md#message-verification",
            "verify_message",
            ]
          ]
        },
        {
          title: "Orders",
          collapsable: true,
          children: [
            ["/basic-docs/atomicdex-api-20/best_orders.md", "best_orders"],
          ],
        },
        {
          title: "Seednode Version Stats",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-20/add_node_to_version_stat.md",
              "add_node_to_version_stat",
            ],
            [
              "/basic-docs/atomicdex-api-20/remove_node_from_version_stat.md",
              "remove_node_from_version_stat",
            ],
            [
              "/basic-docs/atomicdex-api-20/start_version_stat_collection.md",
              "start_version_stat_collection",
            ],
            [
              "/basic-docs/atomicdex-api-20/stop_version_stat_collection.md",
              "stop_version_stat_collection",
            ],
            [
              "/basic-docs/atomicdex-api-20/update_version_stat_collection.md",
              "update_version_stat_collection",
            ],
          ],
        },
        {
          title: "Staking",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-20/add_delegation.md",
              "add_delegation",
            ],
            [
              "/basic-docs/atomicdex-api-20/get_staking_infos.md",
              "get_staking_infos",
            ],
            [
              "/basic-docs/atomicdex-api-20/remove_delegation.md",
              "remove_delegation",
            ],
          ],
        },
        {
          title: "Swaps",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-20/recreate_swap_data.md",
              "recreate_swap_data",
            ],
            [
              "/basic-docs/atomicdex-api-20/trade_preimage.md",
              "trade_preimage",
            ],
          ],
        },
        {
          title: "Wallet",
          collapsable: true,
          children: [
            [
              "/basic-docs/atomicdex-api-20/get_public_key.md",
              "get_public_key",
            ],
            [
              "/basic-docs/atomicdex-api-20/get_public_key_hash.md",
              "get_public_key_hash",
            ],
            [
              "/basic-docs/atomicdex-api-20/get_raw_transaction.md",
              "get_raw_transaction",
            ],
            ["/basic-docs/atomicdex-api-20/my_tx_history.md", "my_tx_history"],
            ["/basic-docs/atomicdex-api-20/withdraw.md", "withdraw"],
          ],
        },
      ],
    },
  ],
  "/basic-docs/atomicdex-api-20-dev/": [
    {
      title: "AtomicDEX API 2.0 (Dev)",
      collapsable: false,
      children: [
        [
          "/basic-docs/atomicdex-api-20-dev/",
          "AtomicDEX-API RPC Protocol v2.0 (Dev)",
        ],
        {
          title: "Utility",
          collapsable: true,
          children: [
            ["/basic-docs/atomicdex-api-20-dev/get_current_mtp.md", "get_current_mtp"]
          ]
        },
        [
          "/basic-docs/atomicdex-api-20-dev/withdraw_tasks.md",
          "Withdraw Tasks",
        ],
        [
          "/basic-docs/atomicdex-api-20-dev/zhtlc_coins.md",
          "ZHTLC Coins",
        ],
      ]
    }
  ]
};
module.exports = atomicDEXsidebar;
