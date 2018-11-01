#!/bin/sh
set -e

ok() { printf "   [\e[0;32m ok \e[0m] $1\n"; }
ko() { printf "[\e[0;31m error \e[0m] $1\n"; }
nf() { printf " [\e[1;34m info \e[0m] $1\n"; }

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

nf "Pull from origin/develop..."
git checkout develop
git pull origin
ok "Pull complete"

nf "Create new branch 'release/${v}'..."
git checkout -b release/$v

nf "Update package version..."
npm version $v --no-git-tag-version
git add package.json package-lock.json
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

nf "Merge into master..."
git checkout master
git pull origin
git merge --no-ff release/${v}
git branch -d release/${v}
ok "Merge complete"

nf "Push to origin..."
git push origin
ok "Push complete"

nf "Create version tag..."
git tag $v
git push origin $v
ok "Release complete!"

nf "Don't forget to:"
nf " - publish to the Chrome Web Store"
nf "   \e[4mhttps://chrome.google.com/webstore/developer/edit/ifbjebjodkkageignlfdkipikmdllhjf\e[0m"
nf " - rebase develop --onto master"
