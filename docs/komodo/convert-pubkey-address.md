# Convert Pubkey to Komodo Address

- Make sure Python3 is [installed](https://wiki.python.org/moin/BeginnersGuide/Download) in your system.
- Install python-bitcoinlib:

```bash
sudo apt-get install libssl-dev
pip3 install python-bitcoinlib
# Or for the latest git version
pip3 install git+https://github.com/petertodd/python-bitcoinlib
```

- Create a file named `pubkey-address.py`
- Enter the following code in the file and save:

```python
#!/usr/bin/env python3

import bitcoin
from bitcoin.wallet import P2PKHBitcoinAddress
from bitcoin.core import x
from bitcoin.core import CoreMainParams

class CoinParams(CoreMainParams):
    MESSAGE_START = b'\x24\xe9\x27\x64'
    DEFAULT_PORT = 7770
    BASE58_PREFIXES = {'PUBKEY_ADDR': 60,
                       'SCRIPT_ADDR': 85,
                       'SECRET_KEY': 188}

bitcoin.params = CoinParams
PUBKEY = input('pubkey:')

print(P2PKHBitcoinAddress.from_pubkey(x(PUBKEY)))
```

- Open a terminal and `cd` to the directory where the file is located.
- Run `python3 pubkey-address.py` in the terminal.
- Input the pubkey at the prompt and hit `Enter`.
- The Komodo address will be displayed.
- Example:

```bash
python3 pubkey-address.py
pubkey:03xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Rxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
