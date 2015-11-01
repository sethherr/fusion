import {keyCodes} from 'keycodes';
import {keyCategories} from 'keycodes';
import {Layout} from 'layout';
import {LayerView} from 'layer_view';

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
      {x:0, y: 0, width: 1.5, voffset: 10}, {x:1.5, y: 0, voffset: 10}, {x:2.5, y: 0}, {x:3.5, y: 0}, {x:4, y: 0}, {x:5, y: 0}, {x:6, y: 0}, {x:7, y: 0}, {x:8, y: 0}, {x:9, y: 0}, {x:10, y: 0}, {x:11, y: 0},
      {x:0, y: 1}, {x:1, y: 1}, {x:2, y: 1}, {x:3, y: 1}, {x:4, y: 1}, {x:5, y: 1}, {x:6, y: 1}, {x:7, y: 1}, {x:8, y: 1}, {x:9, y: 1}, {x:10, y: 1}, {x:11, y: 1},
      {x:4, y: 4, rotate: 30}, {x:1, y: 2}, {x:2, y: 2}, {x:3, y: 2}, {x:4, y: 2}, {x:5, y: 2}, {x:6, y: 2}, {x:7, y: 2}, {x:8, y: 2}, {x:9, y: 2}, {x:10, y: 2}, {x:11, y: 2},
    ];

    ReactDOM.render(<LayerView keys={keys}/>, document.getElementById('key'));


    // We only need to do this once.
    $(".keytop").each(function () {
      $(this).height($(this).parent().height() - 13);
      $(this).width($(this).parent().width() - 8);
    });

    this.addLayer();

    $('body').on('keydown', this.pressedKey.bind(this));
    $('body').on('keyup', this.pressedKey.bind(this));
    $('#save').on('click', this.save.bind(this));
    $('#load').on('click', this.load.bind(this));
    $('.add-layer').on('click', this.addLayer.bind(this));
    $('#layout-description').on('change', this.setLayoutDescription.bind(this));
    $('#layer-description').on('change', this.setLayerDescription.bind(this));
    $('#layer-dropdown').on('change', this.changeLayerDropdown.bind(this));
    $("#menu-toggle").on('click', this.toggleSidebar.bind(this));
    $(".key-label").on('change', this.changeKeyLabel.bind(this));

    $(document).on('click', '.layer .key, .layer .key .label', this.selectKey.bind(this));
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
