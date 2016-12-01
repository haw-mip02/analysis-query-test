#!/bin/bash
envsubst < ./src/constants.js.tpl > ./src/constants.js
envsubst < ./public/index.html.tpl > ./public/index.html
npm run build
node src/server.js
