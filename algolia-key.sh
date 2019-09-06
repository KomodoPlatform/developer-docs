#!/bin/sh

file="./docs/.vuepress/algolia-secret.js"
rm -f $file
echo 'var algoliaSecret = { key : "'$ALGOLIAKEY'" }' > $file
echo "module.exports = algoliaSecret;" >> $file
