import {keyCodes} from 'keycodes';

/**
 * Layer
 */
export class Layer {
  /**
   * Creates a new Layer
   */
  constructor(layout, description="", properties={}, keymap=[]) {
    this.layout = layout;
    this.description = description;
    this.properties = properties;
    // Each layer has 84 keys (14 rows 6 columns)
    this.keymap = keymap;
  }

  setKey(key, keyCode, label) {
    this.keymap[key] = {code: keyCode, label: label};
    this.drawKey(key);
  }

  /**
   * drawKey
   * @param k {Number} keyIndex
   */
  drawKey(k) {
    var $key = $('.layer .key[data-key='+k+']');

    if($key.length == 0) {
      return;
    }

    var key = this.keymap[k];
    var $label = $key.find('.l.l-t-l');
    var $wrapper = $key.find('.keytop');

    if ($label.length == 0) {
      $label = $($wrapper).append('<div class="l l-t-l">'+key.label+'</div>');
    } else {
      $label.html(key.label);
    }
  }

  draw() {
    var $layerContainer = $('<div></div>').attr('class', 'layer-container');
    $('#layer-description').val(this.description);

    var $template = $('.layer-template.'+this.layout.maker.type).clone(false).attr('class', 'layer');
    $layerContainer.append($template);
    $(this.layout.maker.container).html($layerContainer);

    this.keymap.forEach((k, i) => {
      this.drawKey(i);
    });
  }

  setDescription(event) {
    this.description = $(event.target).val();
  }

  toJSON() {
    var self = this;
    var json = {
      "description": this.description,
      "properties": this.properties,
      "keymap": Array.apply(null, Array(84)).map(function (x, i) {
        var key = self.keymap[i];
        if(!key) {
          key = {code: "KC_TRANSPARENT", label: ""}
        }
        return key;
      })
    };

    return json;
  }

}

