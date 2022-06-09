#!/bin/bash

echo "This may take a moment. It is recommended to use start_dev.sh during development."

# build the front end
echo "Resetting NPM and building the front end"
cd client
npm cache clear --force
rm -r node_modules/ package_lock.json
npm install
npm run build

if ! [[ $? ]] ;then
    echo "An error occurred"
    read -n 1 -s -r -p "Press any key to continue"
    kill -INT $$
fi


# Start the server
echo "Building and running rust application targeting release"
cargo run --release

exit 0