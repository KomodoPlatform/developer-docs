#!/usr/bin/env python3.6

import requests

url = "https://raw.githubusercontent.com/jl777/komodo/master/src/cc/eval.h"
r = requests.get(url)
array = r.text.split("\n")
with open("module-evalcode.md", "w+") as f:
    f.write("|Name of the module|EvalCode|\n")
    f.write("|------------------|--------|\n")
    for string in array:
        if "EVAL(EVAL_" in string and not string.endswith(";") and not "IMPORTPAYOUT" in string and not "IMPORTCOIN" in string:
            ind = string.find("EVAL(EVAL_")
            data = string[ind+10:].strip(" \)").split(",")
            f.write("|{}    |{}|\n".format(data[0], int(data[1], 0)))
