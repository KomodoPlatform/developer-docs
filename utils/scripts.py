#!/usr/bin/env python3.6

# import os

# MY_COMMAND1 = "cd ~/komodo/src; ./komodod -daemon"
# os.system("gnome-terminal -e 'bash -c \""+MY_COMMAND1+"; sleep 1000000\" '")
# MY_COMMAND2 = "cd ~/komodo/src; ./komodo-cli getinfo"
# os.system("gnome-terminal -e 'bash -c \""+MY_COMMAND2+"; sleep 1000000\" '")

# i = 1
# while i < 9:
#    filename = "/home/gcharang/gitrepos/portRst2Md/docs/whitepapers/komodo/chapter" + \
#        str(i)+".md"
#    with open(filename, "r") as f:
#        print('["/whitepapers/komodo/chapter'+str(i) +
#              '.md","' + f.readline().strip("# \n")+'"],')
#    i = i+1


# i = 1
# while i < 16:
#    if i < 10:
#        num = "0"+str(i)
#    else:
#        num = str(i)
#    filename = "/home/gcharang/gitrepos/portRst2Md/docs/whitepapers/cc-jl/chapter" + \
#        num+".md"
#
#    with open(filename, "r") as f:
#        print('["/whitepapers/cc-jl/chapter'+num +
#              '.md","' + f.readline().strip("# \n")+'"],')
#    i = i+1

# prevLineStartsWith = ""
#
# with open("test.md", "r") as f, open('out.txt', 'w+') as g:
#     for currLine in f:
#         if currLine[0] == "#":
#             g.write(currLine)
#
#         if currLine[0] == "`" and prevLineStartsWith == "#":
#             text = currLine.strip("`\n")
#             text = "```bash\n" + text + "\n```\n"
#             g.write(text)
#         elif currLine[0] != "\n" and currLine[0] != "#" and prevLineStartsWith != "#":
#             text = "- " + currLine
#             g.write(text)
#
#         if currLine[0] != "\n":
#             prevLineStartsWith = currLine[0]

#import os
# for filename in os.listdir('../docs/basic-docs/customconsensus/'):
#    array = filename.split('-')
#    if array[0] == "cc":
#        os.rename("../docs/basic-docs/customconsensus/"+filename,
#                  "../docs/basic-docs/customconsensus/" + array[1])

import os

for filename in os.listdir('../docs/basic-docs/komodo-api/'):
    with open('../docs/basic-docs/komodo-api/'+filename, "r") as f, open("./out/"+filename, 'w+') as g:
        for currLine in f:
            if currLine.startswith("#"):
                g.write(currLine.rstrip(":\n")+"\n")
            else:
                g.write(currLine)
