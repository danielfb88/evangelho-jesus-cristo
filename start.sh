#!/bin/sh

echo "Installing NestJS..."
npm i nest -g 

echo "Installing dependencies..."
yarn

echo "Start server ..."
yarn start:debug
