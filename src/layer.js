/**
 * Layer
 */
export class Layer {
  /**
   * Creates a new Layer
   */
  constructor() {
    this.properties = {};
    this.description = "";
    // Each layer has 84 keys (14 rows 6 columns)
    this.keymap = Array.apply(null, Array(84));
  }

  setKey(key, keyCode, label) {
    this.keymap[key-1] = keyCode;
  }

  draw(container, keyboardType, l) {
    var $template = $('.layer-template.'+keyboardType).clone(false);
    $template.attr('class', 'layer layer-'+l);
    $template.attr('data-layer', l);
    $(container).append($template);
    $template.prepend('<h1>Layer '+(l+1)+'</h1><input name="layer-description" placeholder="Provide an optional description of the layer" class="form-control"><br/>');
  }

  toJSON() {
    var json = {
      "description": this.description,
      "properties": this.properties,
      "keymap": this.keymap.map(function (key) { return key || "KC_TRANSPARENT" })
    };

    return json;
  }

}

