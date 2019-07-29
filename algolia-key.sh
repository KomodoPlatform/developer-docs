#!/bin/sh

echo "test"
echo "var algoliaSecret = { key : \"$ALGOLIAKEY\" }" > ./docs/.vuepress/algolia-secret.js
echo "module.exports = algoliaSecret;" >> ./docs/.vuepress/algolia-secret.js
ls ./docs/.vuepress/
echo "test1"
