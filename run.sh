#!/bin/bash
envsubst < ./src/constants.js.tpl > ./src/constants.js
npm run build
pushstate-server build