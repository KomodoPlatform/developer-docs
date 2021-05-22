#!/bin/sh

set -ev

rsync -avh --delete ./docs/basic-docs/atomicdex/ ./AtomicDEX-docs/docs/basic-docs/atomicdex/
rsync -avh --delete ./docs/.vuepress/public/ ./AtomicDEX-docs/docs/.vuepress/public/
rm -f ./AtomicDEX-docs/docs/.vuepress/atomicDEX-sidebar.js
cp ./docs/.vuepress/atomicDEX-sidebar.js ./AtomicDEX-docs/docs/.vuepress/atomicDEX-sidebar.js
rm -rf ./AtomicDEX-docs/.git
