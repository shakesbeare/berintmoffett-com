#!/bin/bash

# Starts the server assuming it is already on the most recent version
# and was shut down unexpectedly

echo "This only starts the server. If changes were made, use \`./start.sh\`"

cargo run --release
