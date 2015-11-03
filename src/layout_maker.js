import {keyCodes} from 'keycodes';
import {keyCategories} from 'keycodes';
import {Layout} from 'layout';
import {LayerView} from 'layer_view';
import {App} from 'app';

/**
 * LayoutMaker
 */
export class LayoutMaker {
  /**
   * Creates a new LayoutMaker
   * @param container {String} selector to the container
   * @param type {String} type of keyboard
   */
  constructor(container, type='ergodox_ez') {
    this.type = type;
    this.container = container;
    this.selectedKey = null;
    this.layout = new Layout(this, type);
    this.activeLayer = 0;
  }

  /**
   * addLayer
   * adds a layer to the layout
   */
  addLayer() {
    var layer = this.layout.addLayer();
    this.switchLayer(this.layout.layers.length-1);
  }

  /**
   * switchLayer
   */
  switchLayer(l) {
    this.selectedKey = null;
    this.activeLayer = l;
    this.layout.layers[l].draw();
    $("#layer-dropdown").val(l);
    $("#layer-panel .panel-heading").html(`Layer ${l}`);
  }

  /**
   * toggleSidebar
   */
  toggleSidebar(event) {
    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
  }

  /**
   * starts the maker, adds the initial layer
   */
  start() {

    var keys = [
      // LEFT
      {x:0, y: 0, width: 1.5, voffset: 0.37}, {x:1.5, y: 0, voffset: 0.37}, {x:2.5, y: 0, voffset: 0.129}, {x:3.5, y: 0}, {x:4.5, y: 0, voffset: 0.129}, {x:5.5, y: 0, voffset: 0.24}, {x:6.5, y: 0, voffset: 0.24},
      {x:0, y: 1, width: 1.5, voffset: 0.37}, {x:1.5, y: 1, voffset: 0.37}, {x:2.5, y: 1, voffset: 0.129}, {x:3.5, y: 1}, {x:4.5, y: 1, voffset: 0.129}, {x:5.5, y: 1, voffset: 0.24}, {x:6.5, y: 1, voffset: 0.24, height: 1.5},
      {x:0, y: 2, width: 1.5, voffset: 0.37}, {x:1.5, y: 2, voffset: 0.37}, {x:2.5, y: 2, voffset: 0.129}, {x:3.5, y: 2}, {x:4.5, y: 2, voffset: 0.129}, {x:5.5, y: 2, voffset: 0.24},
      {x:0, y: 3, width: 1.5, voffset: 0.37}, {x:1.5, y: 3, voffset: 0.37}, {x:2.5, y: 3, voffset: 0.129}, {x:3.5, y: 3}, {x:4.5, y: 3, voffset: 0.129}, {x:5.5, y: 3, voffset: 0.24}, {x:6.5, y: 3, voffset: -0.26, height: 1.5},
      {x:0.5, y: 4, width: 1, voffset: 0.37}, {x:1.5, y: 4, voffset: 0.37}, {x:2.5, y: 4, voffset: 0.129}, {x:3.5, y: 4}, {x:4.5, y: 4, voffset: 0.129},
      // thumb
      {x:7.5, y: 3, height: 1, hoffset: 0.37, voffset: 0.87, rotate: 30},
      {x:8.5, y: 3, height: 1, hoffset: 0.24, voffset: 1.37, rotate: 30},
      {x:8.5, y: 4, height: 1, hoffset: -0.26, voffset: 1.24, rotate: 30},
      {x:6.5, y: 4, height: 2, voffset: 0.24, rotate: 30},
      {x:7.5, y: 4, height: 2, hoffset: -0.13, voffset: 0.74, rotate: 30},
      {x:8.5, y: 5, height: 1, hoffset: -0.76, voffset: 1.11, rotate: 30},

      // RIGHT
      {x: 12, y: 0, voffset: 0.24}, {x: 13, y: 0, voffset: 0.24}, {x: 14, y: 0, voffset: 0.129}, {x: 15, y: 0}, { x: 16, y: 0, voffset: 0.129}, {x: 17, y: 0, voffset: 0.37}, {x: 18, y: 0, width: 1.5, voffset: 0.37},
      {x: 12, y: 1, voffset: 0.24, height: 1.5}, {x: 13, y: 1, voffset: 0.24}, {x: 14, y: 1, voffset: 0.129}, { x: 15, y: 1}, {x: 16, y: 1, voffset: 0.129}, {x: 17, y: 1, voffset: 0.37}, {x: 18, y: 1, width: 1.5, voffset: 0.37},
      {x: 13, y: 2, voffset: 0.24}, {x: 14, y: 2, voffset: 0.129}, {x: 15, y: 2}, {x: 16, y: 2, voffset: 0.129}, { x: 17, y: 2, voffset: 0.37}, {x: 18, y: 2, width: 1.5, voffset: 0.37},
      {x: 12, y: 3, voffset: -0.26, height: 1.5}, {x: 13, y: 3, voffset: 0.24}, {x: 14, y: 3, voffset: 0.129}, { x: 15, y: 3}, {x: 16, y: 3, voffset: 0.129}, {x: 17, y: 3, voffset: 0.37}, {x: 18, y: 3, width: 1.5, voffset: 0.37},
      {x: 14, y: 4, voffset: 0.129}, {x: 15, y: 4}, {x: 16, y: 4, voffset: 0.129}, {x: 17, y: 4, voffset: 0.37}, { x: 18, y: 4, width: 1, voffset: 0.37},
      // thumb
      {x: 11, y: 3, height: 1, hoffset: -0.37, voffset: 0.87, rotate: -30, origin: 'top right'},
      {x: 10, y: 3, height: 1, hoffset: -0.24, voffset: 1.37, rotate: -30, origin: 'top right'},
      {x: 10, y: 4, height: 1, hoffset: 0.26, voffset: 1.24, rotate: -30, origin: 'top right'},
      {x: 12, y: 4, height: 2, voffset: 0.24, rotate: -30, origin: 'top right'},
      {x: 11, y: 4, height: 2, hoffset: 0.13, voffset: 0.74, rotate: -30, origin: 'top right'},
      {x: 10, y: 5, height: 1, hoffset: 0.76, voffset: 1.11, rotate: -30, origin: 'top right'},
    ];

    var layout = {"type": "ergodox_ez","description": "ErgoDox EZ default layout","properties": {},"layers": [{"description": "Basic layer","properties": {},"keymap": [{"code": "KC_KP_EQUAL","label": "="},{"code": "KC_1","label": "1"},{"code": "KC_2","label": "2"},{"code": "KC_3","label": "3"},{"code": "KC_4","label": "4"},{"code": "KC_5","label": "5"},{"code": "KC_LEFT","label": "&#x25c0;"},{"code": "KC_DELETE","label": "&#x2326;"},{"code": "KC_Q","label": "Q"},{"code": "KC_W","label": "W"},{"code": "KC_E","label": "E"},{"code": "KC_R","label": "R"},{"code": "KC_T","label": "T"},{"code": "TO(1)","label": "TO1"},{"code": "KC_BSPACE","label": "&#x232b;"},{"code": "KC_A","label": "A"},{"code": "KC_S","label": "S"},{"code": "KC_D","label": "D"},{"code": "KC_F","label": "F"},{"code": "KC_G","label": "G"},{"code": "KC_LSHIFT","label": "&#x21e7;"},{"code": "KC_Z","label": "Z"},{"code": "KC_X","label": "X"},{"code": "KC_C","label": "C"},{"code": "KC_V","label": "V"},{"code": "KC_B","label": "B"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TAB","label": "&#x21e5;"},{"code": "KC_LEFT","label": "&#x25c0;"},{"code": "KC_RIGHT","label": "&#x25b6;"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_LGUI","label": "&#x2318;"},{"code": "KC_HOME","label": "&#x2196;"},{"code": "KC_SPACE","label": "&#x23b5;"},{"code": "KC_BSPACE","label": "&#x232b;"},{"code": "KC_END","label": "&#x2198;"},{"code": "KC_RIGHT","label": "&#x25b6;"},{"code": "KC_6","label": "6"},{"code": "KC_7","label": "7"},{"code": "KC_8","label": "8"},{"code": "KC_9","label": "9"},{"code": "KC_0","label": "0"},{"code": "KC_MINUS","label": "-"},{"code": "TO(1)","label": "TO1"},{"code": "KC_Y","label": "Y"},{"code": "KC_U","label": "U"},{"code": "KC_I","label": "I"},{"code": "KC_O","label": "O"},{"code": "KC_P","label": "P"},{"code": "KC_BSLASH","label": "\\"},{"code": "KC_H","label": "H"},{"code": "KC_J","label": "J"},{"code": "KC_K","label": "K"},{"code": "KC_L","label": "L"},{"code": "KC_SCOLON","label": ";"},{"code": "KC_QUOTE","label": "'"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_N","label": "N"},{"code": "KC_M","label": "M"},{"code": "KC_COMMA","label": ","},{"code": "KC_DOT","label": "."},{"code": "KC_LCTRL","label": "&#x2732;"},{"code": "KC_LSHIFT","label": "&#x21e7;"},{"code": "KC_UP","label": "&#x25b2;"},{"code": "KC_DOWN","label": "&#x25bc;"},{"code": "KC_LBRACKET","label": "["},{"code": "KC_RBRACKET","label": "]"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_LALT","label": "&#x2325;"},{"code": "KC_ESCAPE","label": "&#x238b;"},{"code": "KC_PGUP","label": "&#x21de;"},{"code": "KC_PGDOWN","label": "&#x21df;"},{"code": "KC_TAB","label": "&#x21e5;"},{"code": "KC_ENTER","label": "&#x23ce;"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""}]},{"description": "Symbol Layer","properties": {},"keymap": [{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_F1","label": "F1"},{"code": "KC_F2","label": "F2"},{"code": "KC_F3","label": "F3"},{"code": "KC_F4","label": "F4"},{"code": "KC_F5","label": "F5"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_F6","label": "F6"},{"code": "KC_F7","label": "F7"},{"code": "KC_F8","label": "F8"},{"code": "KC_F9","label": "F9"},{"code": "KC_F10","label": "F10"},{"code": "KC_F11","label": "F11"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_UP","label": "&#x25b2;"},{"code": "KC_KP_7","label": "7"},{"code": "KC_KP_8","label": "8"},{"code": "KC_KP_9","label": "9"},{"code": "KC_KP_ASTERISK","label": "*"},{"code": "KC_F12","label": "F12"},{"code": "KC_DOWN","label": "&#x25bc;"},{"code": "KC_KP_4","label": "4"},{"code": "KC_KP_5","label": "5"},{"code": "KC_KP_6","label": "6"},{"code": "KC_KP_PLUS","label": "+"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_KP_1","label": "1"},{"code": "KC_KP_2","label": "2"},{"code": "KC_KP_3","label": "3"},{"code": "KC_KP_SLASH","label": "/"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_KP_DOT","label": "."},{"code": "KC_KP_0","label": "0"},{"code": "KC_KP_EQUAL","label": "="},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""}]},{"description": "Media and mouse keys","properties": {},"keymap": [{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_MS_UP","label": "MsUp"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_MS_LEFT","label": "MsLeft"},{"code": "KC_MS_DOWN","label": "MsDown"},{"code": "KC_MS_RIGHT","label": "MsRight"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_MS_BTN3","label": "Lclk"},{"code": "KC_MS_BTN2","label": "Rclk"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_MEDIA_PLAY_PAUSE","label": "Play"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_MEDIA_PREV_TRACK","label": "Prev"},{"code": "KC_MEDIA_NEXT_TRACK","label": "Next"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_AUDIO_VOL_UP","label": "&#x1f50a;"},{"code": "KC_AUDIO_VOL_DOWN","label": "&#x1f509;"},{"code": "KC_AUDIO_MUTE","label": "&#x1f507;"},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""},{"code": "KC_TRANSPARENT","label": ""}]}]};

    ReactDOM.render(<App layout={layout} keys={keys}/>, document.getElementById('app'));

    this.addLayer();

    //$('body').on('keydown', this.pressedKey.bind(this));
    //$('body').on('keyup', this.pressedKey.bind(this));
    //$('#save').on('click', this.save.bind(this));
    //$('#load').on('click', this.load.bind(this));
    //$('.add-layer').on('click', this.addLayer.bind(this));
    //$('#layout-description').on('change', this.setLayoutDescription.bind(this));
    //$('#layer-description').on('change', this.setLayerDescription.bind(this));
    //$('#layer-dropdown').on('change', this.changeLayerDropdown.bind(this));
    //$("#menu-toggle").on('click', this.toggleSidebar.bind(this));
    //$(".key-label").on('change', this.changeKeyLabel.bind(this));

    //$(document).on('click', '.layer .key, .layer .key .label', this.selectKey.bind(this));
    //$(document).on('change', '.layer-container input', this.setLayerDescription.bind(this));

    var items = {
      clear: {name: "Clear", callback: this.contextMenuKey.bind(this) },
      separator1: "-----"
    };

    for (var cat in keyCategories) {
      if (keyCategories.hasOwnProperty(cat)) {
        if(keyCategories[cat] == '-----') {
          var catMenu = "-----";
        } else {
          // Category main menu
          var catMenu = {name: keyCategories[cat], items: {} };
          for (var keyCode in keyCodes) {
            if (keyCodes.hasOwnProperty(keyCode)) {
              if (keyCodes[keyCode][2] == cat) {
                // Category - key option
                var name = keyCodes[keyCode][0] || keyCodes[keyCode][1];
                catMenu.items['set|'+keyCodes[keyCode][1]+'|'+keyCodes[keyCode][0]] = {
                  name: name,
                  callback: this.contextMenuKey.bind(this)
                };
              }
            }
          }
        }
        items['cat'+cat] = catMenu;
      }
    }

    // Start context menu on all keys
    $.contextMenu({
      selector: ".key",
      items: items
    });
  }

  setLayoutDescription(event) {
    this.layout.description = $(even.target).val()
  }

  setLayerDescription(event) {
    this.layout.layers[this.activeLayer].description = $(event.target).val()
  }

  /**
   * Set key in layout
   * @param key {Number} key position of the key (within the layer)
   * @param keyCode {Number} keycode
   * @param label {String} label
   */
  setKey(key, keyCode, label) {
    this.drawKeyPanel(true);
    this.layout.setKey(this.activeLayer, key, keyCode, label);
  }

  setLayout(data) {
    this.layout.destroy();
    this.type = data.type;
    this.layout = new Layout(this, data.type, data.description, data.properties, data.layers);
    this.layout.layers[0].draw();
  }

  drawKeyPanel(visible) {
    if(visible) {
      var key = this.layout.layers[this.activeLayer].keymap[this.selectedKey];
      $("#key-panel .panel-heading").html(`Key ${this.selectedKey}`);
      if(key) {
        $("#key-keycode").val(key.code);
        $("#key-l-tl").val(key.label);
      } else {
        $("#key-keycode").val('');
        $("#key-l-tl").val('');
      }
      $("#key-panel").show();
    } else {
      $("#key-panel").hide();
    }
  }

  /*
   * EVENT HANDLERS
   */

  changeLayerDropdown(event) {
    var l = +$(event.target).val();
    this.switchLayer(l);
  }

  changeKeyLabel(event) {
    var $label = $(event.target);
    var classes = $label.attr("class").split(' ');
    classes.forEach(c => {
      if(c.indexOf('key-label-') >= 0) {
        var labelType = c.slice(10);
        // TODO: Set label
      }
    });
  }

  /**
   * the user selects a key (using mouse)
   */
  selectKey(event) {
    var $this = $(event.target).closest('.key');
    var key = $this.data('key');
    var layer = this.activeLayer;

    if (this.selectedKey != null) {
      $('.layer .key[data-key='+this.selectedKey+']').removeClass('selected');
    }
    if (this.selectedKey != key) {
      $this.addClass('selected');
      this.selectedKey = key;
      this.drawKeyPanel(true);
    } else {
      this.drawKeyPanel(false);
      this.selectedKey = null;
    }
  }

  /**
   * the user uses the context menu with a key (using mouse)
   */
  contextMenuKey(optionKey, option) {
    var $this = $(option.$trigger);
    var key = $this.data('key');

    var what = optionKey.split('|');
    if(what[0] == 'clear') {
      this.setKey(key, '', '');
    } else if(what[0] == 'set') {
      this.setKey(key, what[1], what[2]);
    }
  }

  /**
   * user pressed a key
   */
  pressedKey(event) {
    var focussedElement = $("*:focus");

    if(this.selectedKey != null && focussedElement.length == 0) {
      if (!keyCodes[event.keyCode]) {
        console.log("Key not recognised, please report.");
        console.log(e);
        return;
      }

      this.setKey(this.selectedKey, keyCodes[event.keyCode][1], keyCodes[event.keyCode][0]);
      event.preventDefault();
      return false;
    }
  }

  /**
   * the user wants to save the layout
   */
  save() {
    var jsn = this.layout.toJSON();
    console.log(JSON.stringify(jsn, null, "  "));
    alert("Check browser console for JSON output");
  }

  load() {
    var self = this;
    var fileName = "keymap_ergodox_ez.json";
    $.getJSON(fileName).success(function(data) {
      self.setLayout(data);
    }).fail(function() {
      console.log("woops");
    });
  }
}
