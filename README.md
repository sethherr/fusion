![ergodox](resources/ergodox.png)

# Fusion
Fusion is a web-based, open source keyboard-layout maker. 

It's supports multiple keyboard types: Ergodox EZ, and [ortholinear](http://ortholinearkeyboards.com)'s Planck and Preonic are currently supported.

As long as your keyboard firmware supports/uses [keycode.h](keycode.h) it should be relatively easy to get it supported. 

This project will output [JSON file](keyboard_layout.json) for the full layout (including layers),
right now another tool is needed to convert these JSON files into firmware compatible .c or .h files. 

## Reactor
[Reactor](https://github.com/ErgoDox-EZ/reactor) is the firmware generator part of Fusion, which is to be installed as a service somewhere.
It will take the JSON's exported by the Fusion project and process them in to ready-to-be-uploaded firmware. 

Reactor uses the awesome [qmk_firmware](http://github.com/jackhumbert/qmk_firmware) by Jack Humbert.

## Keycodes/keymap

You can view the keycodes and their respective symbols at [lib/key_map/key_map.csv](lib/key_map/key_map.csv).

See something you'd like changed? Submit a pull-request.



## Demo
You can play around on the (outdated) [Demo environment](http://rocketcode.nl/fusion/)

There is a current demo available on Heroku: [fusion-keyboard.herokuapp.com/](http://fusion-keyboard.herokuapp.com)



## Quick Start

    bundle install
    rake db:create db:migrate db:seed
    rails s

**Testing**: `be guard` - runs tests as files change.


## License

MIT, see LICENSE