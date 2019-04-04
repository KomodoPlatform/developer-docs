#!/usr/bin/env python3.6

import os
for filename in os.listdir('../docs/basic-docs/komodo-api/'):
    with open('../docs/basic-docs/komodo-api/'+filename, "r") as f, open("./out/"+filename, 'w+') as g:
        for currLine in f:
            count = 0
            if currLine.startswith("| Structure"):
                for word in currLine.split():
                    count = count + 1
                    if word == "Structure":
                        g.write("Name ")
                    elif count == 7:
                        g.write(word + " \n")
                    else:
                        g.write(word + " ")
            else:
                g.write(currLine)
