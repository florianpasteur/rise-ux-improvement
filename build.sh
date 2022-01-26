#!/usr/bin/env bash

COMMIT_HASH=$(git rev-parse --short HEAD)
#zip dist/rise-ux-improvement-$COMMIT_HASH.zip icons contentscript.js manifest.json mvp.css style.css popup.html popup.js

rm -fr dist/.tmp
mkdir -p dist/.tmp
cp icons contentscript.js manifest.json mvp.css style.css popup.html popup.js dist/.tmp
crx3 dist/.tmp --crx dist/rise-ux-improvement-$COMMIT_HASH.crx --appVersion 1.0.2
