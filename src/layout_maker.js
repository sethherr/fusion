import {keyCodes} from 'keycodes';

/**
 * LayoutMaker
 */
export class LayoutMaker {
  /**
   * Creates a new LayoutMaker
   * @param keyboardType {String} type of keyboard
   */
  constructor(keyboardType) {
    this.keyboardType = keyboardType;
    this.selectedKey = null;
    this.selectedLayer = null;
    this.layout = [];
    this.nrOfLayers = 0;
  }

  /**
   * addLayer
   * adds a layer to the layout
   */
  addLayer() {
    var l = this.nrOfLayers;
    this.layout[l] = [];
    var $template = $('.layer-template.'+this.keyboardType).clone(false);
    $template.attr('class', 'layer layer-'+l);
    $template.attr('data-layer', l);
    $('body').append($template);

    // Setup handlers of all the keys
    for(var i=0; i <= 80; i++) {
      d3.select('.layer.layer-'+l+' .key.key-'+i).on("mouseover", function() {
        d3.select(this).classed({highlight: true});
      });
      d3.select('.layer.layer-'+l+' .key.key-'+i).on('mouseout', function() {
        d3.select(this).classed({highlight: false});
      });
      d3.select('.layer.layer-'+l+' .key.key-'+i).on('click', this.selectKey.bind(this));
    }
    this.nrOfLayers++;
  }

  /**
   * starts the maker, adds the initial layer
   */
  start() {
    this.addLayer();

    d3.select('body').on('keydown', this.pressedKey.bind(this));
    d3.select('body').on('keyup', this.pressedKey.bind(this));
    d3.select('#save').on('click', this.save.bind(this));
    d3.select('#add-layer').on('click', this.addLayer.bind(this));

    $.contextMenu({
      selector: ".key",
      items: {
        clear: {name: "Clear", callback: this.contextMenuKey.bind(this) }
      }
    });
  }

  /**
   * Set key in layout
   * @param layer {Number} layer of the key
   * @param key {Number} key position of the key (within the layer)
   * @param keyCode {Number} keycode
   */
  setKey(layer, key, keyCode, label) {
    this.layout[layer][key-1] = keyCode;

    var $key = d3.select('.layer.layer-'+layer+' .key.key-'+key);
    var $text = d3.select('.layer.layer-'+layer+' .label.label-'+key);
    var $wrapper = $key.node().parentNode;

    if ($text.empty()) {
      $text = d3.select($wrapper).append('text')
        .attr('class', 'label label-'+this.selectedKey)
        .attr('x', +$key.attr('x') + $key.attr('width')/2)
        .attr('y', +$key.attr('y'));

      $text.append('tspan').attr('dx', 0).attr('dy', 30).html(label);
    } else {
      $text.select('text tspan').html(label);
    }
  }

  /*
   * EVENT HANDLERS
   */

  /**
   * the user selects a key (using mouse)
   */
  selectKey() {
    var $this = $(d3.event.target);
    var key = $this.data('key');
    var layer = $this.closest('svg').data('layer');

    if (this.selectedLayer != null && this.selectedKey != null) {
      d3.select('.layer.layer-'+this.selectedLayer+' .key.key-'+this.selectedKey).classed({selected: false});
    }
    if (this.selectedKey != key || this.selectedLayer != layer) {
      d3.select(d3.event.target).classed({selected: true});
      this.selectedKey = key;
      this.selectedLayer = layer;
      console.log("selectKey", key, layer);
    } else {
      this.selectedKey = null;
      this.selectedLayer = null;
      console.log("selectKey", 'none', 'none');
    }
  }

  /**
   * the user uses the context menu with a key (using mouse)
   */
  contextMenuKey(key, option) {
    console.log("contextMenuKey", key, option);
    var $this = $(option.$trigger);
    var key = $this.data('key');
    var layer = $this.closest('svg').data('layer');

    this.setKey(layer, key, '', '');
  }

  /**
   * user pressed a key
   */
  pressedKey() {
    console.log("pressedKey");
    if(this.selectedKey != null && this.selectedLayer != null) {
      if (!keyCodes[d3.event.keyCode]) {
        console.log("Key not recognised, please report.");
        console.log(d3.event);
        return;
      }

      this.setKey(this.selectedLayer, this.selectedKey, keyCodes[d3.event.keyCode][1], keyCodes[d3.event.keyCode][0]);
    }
    d3.event.preventDefault();
    return false;
  }

  /**
   * the user wants to save the layout
   */
  save() {
    // Each layout has 84 keys (14 rows 6 columns)
    var jsn = {
      "keyboard_layout": {
        "description": "dvorak",
        "layers": []
      }
    };

    for(var i=0; i<this.layout.length; i++) {
      var keymap = Array.apply(null, Array(84)).map(function (x, i) { return "KC_TRANSPARENT"; });
      for(var k=0; k< this.layout[i].length; k++) {
        keymap[k] = this.layout[i][k] || "KC_TRANSPARENT";
      }
      jsn['keyboard_layout']['layers'].push({"description": "", "keymap": keymap});

    }
    console.log(JSON.stringify(jsn, null, "  "));
  }
}
