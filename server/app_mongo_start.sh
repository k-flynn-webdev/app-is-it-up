#!/bin/bash
pkill mongod
sleep 1s
mongod --bind_ip 127.0.0.1