#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
#echo 'developers.komodoplatform.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
GIT_USER=$(git config --global user.name)
#git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:$GIT_USER/$GIT_USER.github.io.git master
#git push -f git@github.com:siddhartha-komodo/developer-docs.git master:gh-pages
#git push -f git@github.com:komodoplatform/developer-docs.git master:gh-pages

cd -
