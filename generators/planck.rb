header = %q(
#include "planck.h"
#include "backlight.h"

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
)

footer = %q(
};

const uint16_t PROGMEM fn_actions[] = {

};

const macro_t *action_get_macro(keyrecord_t *record, uint8_t id, uint8_t opt) {

};
)

require 'json'

layout = JSON.load(File.open(ARGV[0]))
puts header
layout['keyboard_layout']['layers'].each do |layer|

  puts "// #{layer['description']}"
  puts "PLANCK_MIT("
  puts "       %s," % layer['keymap'][0..11].join(",\t")
  puts "       %s," % layer['keymap'][12..23].join(",\t")
  puts "       %s," % layer['keymap'][24..35].join(",\t")
  puts "       %s" % layer['keymap'][36..46].join(",\t")
  puts "),"

end
puts footer
