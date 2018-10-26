#!/bin/sh
set -e

say() { printf "$1 $2\n"; }
ok() { say '   [\033[0;32m ok \033[0m]' "$1"; }
ko() { say '[\033[0;31m error \033[0m]' "$1"; }
nf() { say ' [\033[1;34m info \033[0m]' "$1"; }

usage() { ko "Usage: $0 [-v <version number>]" 1>&2; exit 1; }

if [[ ! $1 =~ [0-9]+\.[0-9]+\.[0-9]+ ]]; then
  usage
fi

catch() {
  local parent_lineno="$1"
  local message="$2"
  local code="${3:-1}"
  if [[ -n "$message" ]] ; then
    ko "Error on or near line ${parent_lineno}: ${message}; exiting with status ${code}"
  else
    ko "Error on or near line ${parent_lineno}; exiting with status ${code}"
  fi
  exit "${code}"
}
trap 'catch ${LINENO}' ERR

v=$1

nf "Pull from origin/master..."
git checkout master
git pull origin
ok "Pull complete"
nf "Create new branch 'release/${v}'..."
git checkout -b release/$v
nf "Update package version..."
npm version $v --no-git-tag-version
git add package*
git commit -m "Bump version ${v}"
nf "Build Userscript..."
npm run build:userscript
ok "Userscript successfully built"
nf "Build Chrome extension..."
npm run build:extension
ok "Extension successfully built"
nf "Commit build..."
git add dist/*.*
git commit -m "Build ${v}"
nf "Create version tag..."
git tag "${v}"
ok "Release ready"
nf "Merge into master..."
git checkout master
git merge --no-ff release/${v}
git branch -d release/${v}
ok "Merge complete"
nf "Push to origin..."
git push origin
ok "Push complete!"
nf "Don't forget to:"
nf " - publish to the Chromw Web Store"
nf " - rebase develop --onto master"
