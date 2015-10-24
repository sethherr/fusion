![ergodox](resources/ergodox.png)

# Keyboard Layout Maker
Web-based, open source Keyboard Layout Maker for multiple keyboard types.
Currently Ergodox EZ, and ortholinear's Planck and Preonic are supported.

This project will output JSON file for the full layout (including layers),
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