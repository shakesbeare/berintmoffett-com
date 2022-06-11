#!/bin/bash

echo "This is the development mode. It is recommended to use start.sh for production"


# build the front end
cd client
npm run build

# build and run the back end
cd ..
cargo run