#!/usr/bin/env bash

COMMIT_HASH=$(git rev-parse --short HEAD)
zip dist/rise-ux-improvement-$COMMIT_HASH.zip icons contentscript.js manifest.json
