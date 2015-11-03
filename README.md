![ergodox](resources/ergodox.png)

# Fusion
Fusion is a web-based, open source keyboard-layout maker. 

It's supports multiple keyboard types: Ergodox EZ, and [ortholinear](http://ortholinearkeyboards.com)'s Planck and Preonic are currently supported.

As long as your keyboard firmware supports/uses [keycode.h](keycode.h) it should be relatively easy to get it supported. 

This project will output [JSON file](keyboard_layout.json) for the full layout (including layers),
another tool is needed to convert these JSON files into firmware compatible .c or .h files. 

## Reactor
[Reactor](https://github.com/ErgoDox-EZ/reactor) is the firmware generator part of Fusion, which is to be installed as a service somewhere.
It will take the JSON's exported by the Fusion project and process them in to ready-to-be-uploaded firmware. 

Reactor uses the awesome [qmk_firmware](http://github.com/jackhumbert/qmk_firmware) by Jack Humbert.

## Demo
You can play around on the [Demo environment](http://rocketcode.nl/fusion/)

## Quick Start

    npm install gulp -g
    npm install
    npm start

### Ubuntu / Debian

Make sure you run the latest nodejs, see https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions for instructions.
If you get the ENOSPC exception, please run:

    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

See [Stack Overflow](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)


## License

MIT, see LICENSE