#!/bin/bash

echo "Building server..."

npm run build

if ! [[ $? ]] ;then
    echo "An error occured"
    read -n 1 -s -r -p "Press any key to continue"
    kill -INT $$
fi

read -n 1 -s -r -p "Press any key to continue"

clear
npm start

