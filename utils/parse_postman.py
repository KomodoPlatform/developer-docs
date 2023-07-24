#!/usr/bin/env python3
import os
import sys
import json

'''Use with grep to get method. In future we might be able to auto derive code samples and populate param tables'''

with open("../postman/collections/mm2_dev.postman_collection.json", 'r') as f:
    for line in f.readlines():
        l = line.strip()
        if len(l) > 40:
            if l.startswith('"raw": "'):
                l = l.replace('"raw": "', "")[:-1].replace(r'\r\n', "").replace(r'\"', '"')
                print(l)
