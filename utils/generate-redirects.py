#!/usr/bin/env python3.6

import os
with open("./out/"+'_redirects.js', 'w+') as f:
    startString = "var redirectAliases = {\n"
    endString = "}\nmodule.exports = redirectAliases;\n"
    f.write(startString)
    oldPrefix = "/basic-docs/cryptoconditions/"
    newPrefix = "/basic-docs/customconsensus/"
    for filename in os.listdir('../docs/basic-docs/customconsensus/'):
        filename = filename.split(".")[0]+".html"
        f.write('"'+oldPrefix+filename+'"'+":" +
                '"'+newPrefix+filename+'"'+",\n")
    f.write(endString)
