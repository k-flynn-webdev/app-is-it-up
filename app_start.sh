#!/bin/bash
sleep 1s

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

sh ./server/app_mongo_start.sh &
sleep 5s
sh ./front/app_start.sh &
sleep 15s
sh ./server/app_start.sh
