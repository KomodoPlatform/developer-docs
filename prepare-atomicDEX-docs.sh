#!/bin/bash

set -ev

clone_repo() {
  echo "Cloning the AtomicDEX-docs repository"
  success=0
  count=1
  while [ $success -eq 0 ]; do
    echo "[Try $count] Cloning the AtomicDEX-docs repository"
    git clone https://github.com/KomodoPlatform/AtomicDEX-docs --branch=master --single-branch && success=1 || success=0
    sleep 4
    count=$((count+1))
  done
}

update_repo(){
  rsync -avh --delete ./docs/basic-docs/atomicdex/ ./AtomicDEX-docs/docs/basic-docs/atomicdex/
}

clone_repo
update_repo