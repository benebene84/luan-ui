#!/usr/bin/env bash
set -o nounset -o errexit -o errtrace -o pipefail

START_TIME=$(date +%s)

printf "Cleaning output directory... \n"
rm -rf dist
printf "Done!\n"

printf "\nCompiling TypeScript... \n"
tsc -p ./tsconfig.build.json
printf "Done!\n"

printf "\nCopying assets... \n"
node --experimental-strip-types scripts/copy-build-assets.ts

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

printf "\n\x1b[32mBuild completed successfully in %d seconds!\x1b[0m 🎉 \n" "$DURATION"