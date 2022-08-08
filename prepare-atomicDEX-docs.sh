#!/bin/sh

set -ev

rsync -avh --delete ./docs/basic-docs/atomicdex/ ./AtomicDEX-docs/docs/basic-docs/atomicdex/
rsync -avh --delete ./docs/basic-docs/atomicdex-api-20/ ./AtomicDEX-docs/docs/basic-docs/atomicdex-api-20/
rsync -avh --delete ./docs/basic-docs/atomicdex-api-20-dev/ ./AtomicDEX-docs/docs/basic-docs/atomicdex-api-20-dev/
rsync -avh --delete ./docs/basic-docs/atomicdex-api-legacy/ ./AtomicDEX-docs/docs/basic-docs/atomicdex-api-legacy/
rsync -avh --delete ./docs/.vuepress/public/ ./AtomicDEX-docs/docs/.vuepress/public/
rsync -avh --delete ./postman/ ./AtomicDEX-docs/postman/
rm -f ./AtomicDEX-docs/docs/.vuepress/atomicDEX-sidebar.js
cp ./docs/.vuepress/atomicDEX-sidebar.js ./AtomicDEX-docs/docs/.vuepress/atomicDEX-sidebar.js
rm -rf ./AtomicDEX-docs/.git
