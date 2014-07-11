# Coursera Metalink Generator

*Coursera Metalink Generator* is a [userscript](http://en.wikipedia.org/wiki/Userscript) that enables you to easily download lecture videos (and other lecture resources) for your [Coursera](https://www.coursera.org/) classes. It dynamically generates a [Metalink Document](http://en.wikipedia.org/wiki/Metalink) for desired items that can be automatically processed by your favorite download manager or utility.

## Features

* Simple UI allowing fine-grained control over which items to download. (New videos are always selected by default.)
* Uses a `course/section/##-resource`-style directory structure to keep things organized and playlist friendly.
* Works in Firefox and Chrome.

## Requirements

1. [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) (Firefox) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) (Chrome).
2. A download manager or utility with Metalink support.

## Usage

Simply visit the lectures page for one of your Coursera classes, select the resources to download, and click the *Metalink* button. You can instruct your browser to open the resulting file with any Metalink-aware program.

Some download managers have their own configuration for the path and name of downloaded files, and will ignore the path and name supplied with each file in the Metalink. This can result in everything being saved (with default filenames) to a single directory, unless configured otherwise.
 
A few basic [example scripts](examples) are provided for those who wish to use this userscript in conjunction with a CLI download utility.
 
## Installation

Build with gulp:

```sh
$ gulp build
```

and install `build/coursera-metalink.user.js` via Greasemonkey/Tampermonkey. Chrome users should not attempt to install this file by converting it to an extension--it must be installed via Tampermonkey.
