import {Layer} from 'layer';

/**
 * Layout
 */
export class Layout {
  /**
   * Creates a new Layout
   */
  constructor(maker, type="ergodox-ez", description="", properties={}, layers=[]) {
    this.maker = maker;
    this.type = type;
    this.description = description;
    this.properties = properties;
    this.layers = [];
    this.nrOfLayers = 0;
    layers.forEach((l, i) => {
      var l = new Layer(this, l.description, l.properties, l.keymap);
      // TODO: Remove parameters
      l.draw("#keyboard-layers", this.type, i);
      this.layers.push(l);
    });
    d3.select('#layout-description').node().value = description;
  }

  destroy() {
    $(".layer").remove();
  }

  addLayer() {
    var l = new Layer(this);
    this.layers.push(l);
    this.nrOfLayers++;
    return l;
  }

  setKey(layer, key, keyCode, label) {
    this.layers[layer].setKey(layer, key, keyCode, label);
  }

  /**
   * export layout
   */
  toJSON() {
    var jsn = {
      "type": this.type,
      "description": this.description,
      "properties": {},
      "layers": this.layers.map(function (l) {
        return l.toJSON();
      })
    };

    return jsn;
  }

}

