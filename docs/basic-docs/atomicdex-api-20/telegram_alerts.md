# Telegram Alerts for Market Maker Bot

The Komodo DeFi Framework Market Maker bot can be configured to send status update alerts via telegram!

To set this up, you can add some additional parameters to your MM2.json as shown in the example below

```json
{
  "gui": "MarketMakerBot",
  "netid": 7777,
  "rpc_password": "YOUR_PASSWORD",
  "passphrase": "YOUR SEED PHRASE",
  "userhome": "/${HOME#\"/\"}",
  "dbdir": "/path/to/your/komodefi/DB",
  "message_service_cfg": {
    "telegram": {
      "api_key": "YOUR:TELEGRAM_API_TOKEN",
      "chat_registry": {
        "default": "YOUR_TELEGRAM_CHAT_ID",
        "maker_bot": "YOUR_TELEGRAM_CHAT_ID",
        "swap_events": "YOUR_TELEGRAM_CHAT_ID"
      }
    }
  }
}
```

The extra fields required are:

| Structure                 | Type   | Description              |
| ------------------------- | ------ | ------------------------ |
| api_key                   | string | A Telegram bot API token |
| chat_registry.default     | string | A Telegram Chat ID       |
| chat_registry.maker_bot   | string | A Telegram Chat ID       |
| chat_registry.swap_events | string | A Telegram Chat ID       |

You can use the same Telegram chat ID for all three `chat_registry` subfields, or sent your alerts to a different chat ID if you want to separate the alerts by type.

To get a Telegram bot API token, you need to [have chat with the BotFather](https://sean-bradley.medium.com/get-telegram-chat-id-80b575520659)

To get a Telegram chat ID, check out [this guide](https://sean-bradley.medium.com/get-telegram-chat-id-80b575520659)
