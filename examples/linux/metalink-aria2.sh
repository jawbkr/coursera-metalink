#!/bin/sh

# Download files in a Metalink with aria2 (http://aria2.sourceforge.net/).
#
# Your browser can be instructed to open a Metalink with this script.

NOTIFY="notify-send $0"

aria2c \
  --dir=$HOME/Coursera \
  --max-concurrent-downloads=5 \
  --metalink-file=$1

if [ $? -eq 0 ]; then
  $NOTIFY "Download complete"
else
  $NOTIFY "Download failed"
fi
