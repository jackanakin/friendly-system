#!/bin/bash

echo "Running migrations"
yarn run build:run:migration

echo "Starting app"
node build/index.js