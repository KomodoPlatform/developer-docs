#!/usr/bin/env python3.6

import os
with open("./out/"+'_redirects.js', 'w+') as f:
    startString = "const redirectAliases = {\n"
    endString = "module.exports = redirectAliases;\n"
    f.write(startString)
    for filename in os.listdir('../docs/basic-docs/komodo-api/'):
