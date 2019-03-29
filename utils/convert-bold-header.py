#!/usr/bin/env python3.6

import os
for filename in os.listdir('../docs/basic-docs/cryptoconditions/'):
    with open('../docs/basic-docs/cryptoconditions/'+filename, "r") as f, open(filename, 'w+') as g:
        for currLine in f:
            if currLine.startswith('**'):
                g.write(' '+currLine.strip("*\n") + '\n')
            else:
                g.write(currLine)
