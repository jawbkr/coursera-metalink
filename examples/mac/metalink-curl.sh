#!/bin/sh

# Download files in a Metalink with cURL (http://curl.haxx.se/).
#
# Your browser can be instructed to open a Metalink with this script.
# cURL must be built with --with-libmetalink and libmetalink must be installed.
#
# For building libmetalink, see
# http://bazaar.launchpad.net/~metalink-dev/libmetalink/trunk/view/head:/README
#
# For building cURL, see
# http://curl.haxx.se/docs/install.html


NOTIFY="terminal-notifier -title $0 -message"
SAVE_DIR=$HOME/Coursera

mkdir -p $SAVE_DIR && cd $SAVE_DIR

curl --metalink file://$1

if [ $? -eq 0 ]; then
  $NOTIFY "Download complete"
else
  $NOTIFY "Download failed"
fi
