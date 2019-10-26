#!/bin/bash
#!/usr/bin/env bash

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

rm -rf ../server/public/*

cp -R ./dist/ ../server/public

