import {Layer} from 'layer';

/**
 * Layout
 */
export class Layout {
  /**
   * Creates a new Layout
   */
  constructor(maker, type="ergodox_ez", description="", properties={}, layers=[]) {
    this.maker = maker;
    this.type = type;
    this.description = description;
    this.properties = properties;
    this.layers = [];
    layers.forEach((l, i) => {
      var l = new Layer(this, l.description, l.properties, l.keymap);
      $("#layer-dropdown").append('<option value="'+i+'">Layer '+(i+1)+'</option>');
      this.layers.push(l);
    });

    $('#layout-description').val(description);
  }

  destroy() {
    $(this.maker.container).empty();
    $("#layer-dropdown").empty();
  }

  addLayer() {
    var l = new Layer(this);
    $("#layer-dropdown").append('<option value="'+this.layers.length+'">Layer '+(this.layers.length+1)+'</option>');
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

