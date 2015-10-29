![ergodox](resources/ergodox.png)

# Fusion
Fusion is a web-based, open source keyboard-layout maker. 

It's supports multiple keyboard types: Ergodox EZ, and [ortholinear](http://ortholinearkeyboards.com)'s Planck and Preonic are currently supported.

As long as your keyboard firmware supports/uses [keycode.h](keycode.h) it should be relatively easy to get it supported. 

This project will output [JSON file](keyboard_layout.json) for the full layout (including layers),
another tool is needed to convert these JSON files into firmware compatible .c or .h files. 

## Reactor

Reactor is the firmware generator part of Fusion, currently it resides in the 'generators' folder.
Eventually it will move to it's own repository. The intention for it is to be installed as a service somewhere.
It will take the JSON's exported by the Fusion project and process them in to ready-to-be-uploaded firmware. 

Reactor uses the awesome [qmk_firmware](http://github.com/jackhumbert/qmk_firmware) by Jack Humbert.

## Demo

You can play around on the [Demo environment](http://rocketcode.nl/fusion/)

### Compiling firmware

#### Linux

TBD

#### Mac OSX

Using homebrew it's easy to compile the firmware:

    brew tap osx-cross/avr
    brew install avr-libc
    

Next cd into the appropriate folder of the qmk_firmware, say keyboard/ergodox_ez
 
    cd keyboard/ergodox_ez
    
Then run `make` for the default keymap, or
    
    make KEYMAP="yourown"
    
for your own keymap. This requires a files keymap_yourown.c in the subfolder keymaps.
You should end up with a `ergodox_ez.hex` file, which you can use with the [Teensy loader](http://www.pjrc.com/teensy/loader_cli.html) or [Teensy GUI](https://www.pjrc.com/teensy/loader.html)

#### Windows

TBD

## Quick Start

    npm install gulp -g
    npm install
    npm start

## Ideas

- Make standalone using http://electron.atom.io/
- Integrate directly with [Teensy loader](http://www.pjrc.com/teensy/loader_cli.html) or [Teensy GUI](https://www.pjrc.com/teensy/loader.html)
- Check whether we're on Mac, Linux or Windows to detect which the best representation of the key is.

## Compiling firmware

    brew tap osx-cross/avr
    brew install avr-libc
    
    cd into the appropriate folder of the qmk_firmware 

## License

MIT, see LICENSE