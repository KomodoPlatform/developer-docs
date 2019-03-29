#!/usr/bin/env python3.6

import json
import pandas as pd
import os

for filename in os.listdir('./coins-master/electrums/'):
    filename1 = "./coins-master/electrums/" + filename
    with open(filename1, "r") as f, open('out.txt', 'a') as g:
        data = json.load(f)
        for myjson in data:
            s = pd.Series(list(myjson))
            text = '"{"userpass":"$userpass","method":"electrum","coin":"' + \
                filename + '","ipaddr":"' + \
                s[0] + '","port":' + str(myjson[s[0]]) + '}"'
            text = 'curl --url "http://127.0.0.1:7783" --data ' + text + "\n"
            g.write(text)
