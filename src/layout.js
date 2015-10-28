import {Layer} from 'layer';

/**
 * Layout
 */
export class Layout {
  /**
   * Creates a new Layout
   */
  constructor(keyboardType) {
    this.keyboardType = keyboardType || 'ergodox-ez';
    this.properties = {};
    this.layers = [];
  }

  addLayer() {
    var l = new Layer();
    this.layers.push(l);
    return l;
  }

  setKey(layer, key, keyCode, label) {
    this.layers[layer].setKey(key, keyCode, label);
  }

  /**
   * export layout
   */
  toJSON() {
    var jsn = {
      "keyboard_layout": {
        "type": this.keyboardType,
        "description": this.description,
        "properties": {},
        "layers": this.layers.map(function (l) { return l.toJSON(); })
      }
    };

    return jsn;
  }

}

