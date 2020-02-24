# How to extract swap data from a AtomicDEX mobile log file

Create a file named `parse_logs.py` and copy the code below into it.

::: tip Note

- the following code is from [https://github.com/smk762/pytomicDEX/blob/master/scripts/parse_logs.py](https://github.com/smk762/pytomicDEX/blob/master/scripts/parse_logs.py)
- we assume that `python3` is already installed in your system 

:::

<collapse-text hidden title="Code">

```py
#!/usr/bin/env python3
import os
import sys
import json

# Change this to your log filename
try:
    logfilename = sys.argv[1]
except:
    print("use like: parse_logs.py logfile.log")

if not os.path.isdir("MAKER"):
    os.makedirs("MAKER")
if not os.path.isdir("TAKER"):
    os.makedirs("TAKER")

with open(logfilename, "r") as f:
    lines = f.readlines()
    for line in lines:
        # Remove log data not during stress test
        if line.find('getRecentSwaps') > -1:
            print(line)
            try:
                swap_json = " ".join(line.split(" ")[5:])
                swap_results = json.loads(swap_json)['result']['swaps']
                for swap in swap_results:
                    if swap['type'] == 'Taker':
                        folder = "TAKER"
                    elif swap['type'] == 'Maker':
                        folder = "MAKER"
                    uuid = swap['uuid']
                    with open(folder+"/"+uuid+".json", "w") as j:
                        print("writing "+folder+"/"+uuid+".json")
                        j.write(json.dumps(swap))
            except json.decoder.JSONDecodeError:
                pass

```

</collapse-text>

To parse a log file named `log_username.txt`, use the command

```bash
python3 parse_logs.py log_username.txt
```

It parses the log file, creates two directories named "MAKER" and "TAKER", then creates files named `<uuid>.json` in the appropriate directory.
