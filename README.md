![ergodox](resources/ergodox.png)

# Keyboard Layout Maker
Web-based, open source Keyboard Layout Maker for multiple keyboard types.
Currently Ergodox EZ, and [ortholinear](http://ortholinearkeyboards.com)'s Planck and Preonic are supported.

As long as your keyboard firmware supports/uses [keycode.h](keycode.h) it should be relatively easy to get it supported. 

This project will output [JSON file](keyboard_layout.json) for the full layout (including layers),
another tool is needed to convert these JSON files into firmware compatible .c or .h files. 

## Quick Start

    npm install gulp -g
    npm install
    npm start

## Ideas

- Make standalone using http://electron.atom.io/
- Integrate directly with Teensy loader (http://www.pjrc.com/teensy/loader_cli.html)
- Check whether we're on Mac, Linux or Windows to detect which the best representation of the key is.

## License

MIT, see LICENSE