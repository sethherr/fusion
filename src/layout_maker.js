import {keyCodes} from 'keycodes';
import {keyCategories} from 'keycodes';
import {Layout} from 'layout';

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
    this.selectedLayer = null;
    this.layout = new Layout(this, type);
    this.nrOfLayers = 0;
  }

  /**
   * addLayer
   * adds a layer to the layout
   */
  addLayer() {
    var l = this.nrOfLayers;
    var layer = this.layout.addLayer();
    layer.draw(this.container, this.type, l);
    this.nrOfLayers++;
  }

  /**
   * starts the maker, adds the initial layer
   */
  start() {
    this.addLayer();

    $('body').on('keydown', this.pressedKey.bind(this));
    $('body').on('keyup', this.pressedKey.bind(this));
    $('#save').on('click', this.save.bind(this));
    $('#load').on('click', this.load.bind(this));
    $('#add-layer').on('click', this.addLayer.bind(this));
    $('#layout-description').on('change', this.setLayoutDescription.bind(this));

    $(document).on('click', '.layer .key, .layer .key .label', this.selectKey.bind(this));
    $(document).on('change', '.layer-container input', this.setLayerDescription.bind(this));

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

  setLayerDescription(event) {
    var $layerContainer = $(event.target).closest('.layer-container');
    var layer = +$layerContainer.data('layer');
    this.layout.layers[layer].description = $(event.target).val();
  }

  setLayoutDescription() {
    this.layout.description = $(this).val()
  }

  /**
   * Set key in layout
   * @param layer {Number} layer of the key
   * @param key {Number} key position of the key (within the layer)
   * @param keyCode {Number} keycode
   */
  setKey(layer, key, keyCode, label) {
    this.layout.setKey(layer, key, keyCode, label);
  }

  setLayout(data) {
    this.layout.destroy();
    this.layout = new Layout(this, data.type, data.description, data.properties, data.layers);
  }

  /*
   * EVENT HANDLERS
   */

  /**
   * the user selects a key (using mouse)
   */
  selectKey(event) {
    var $this = $(event.target).closest('.key');
    var key = $this.data('key');
    var layer = $this.closest('.layer').data('layer');

    if (this.selectedLayer != null && this.selectedKey != null) {
      $('.layer.layer-'+this.selectedLayer+' .key[data-key='+this.selectedKey+']').removeClass('selected');
    }
    if (this.selectedKey != key || this.selectedLayer != layer) {
      $this.addClass('selected');
      this.selectedKey = key;
      this.selectedLayer = layer;
    } else {
      this.selectedKey = null;
      this.selectedLayer = null;
    }
  }

  /**
   * the user uses the context menu with a key (using mouse)
   */
  contextMenuKey(optionKey, option) {
    var $this = $(option.$trigger);
    var key = $this.data('key');
    var layer = $this.closest('.layer').data('layer');

    var what = optionKey.split('|');
    if(what[0] == 'clear') {
      this.setKey(layer, key, '', '');
    } else if(what[0] == 'set') {
      this.setKey(layer, key, what[1], what[2]);
    }
  }

  /**
   * user pressed a key
   */
  pressedKey(event) {
    if(this.selectedKey != null && this.selectedLayer != null) {
      if (!keyCodes[event.keyCode]) {
        console.log("Key not recognised, please report.");
        console.log(e);
        return;
      }

      this.setKey(this.selectedLayer, this.selectedKey, keyCodes[event.keyCode][1], keyCodes[event.keyCode][0]);
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
