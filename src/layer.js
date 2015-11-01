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

    var $key = $('.layer .key[data-key='+key+']');

    if($key.length == 0) {
      return;
    }

    var $text = $('.layer .key[data-key='+key+'] .l');
    var $wrapper = $key.find('.keytop');

    if ($text.length == 0) {
      $text = $($wrapper).append('<div class="l l-t-l">'+label+'</div>');
    } else {
      $text.html(label);
    }

  }

  draw() {
    var $layerContainer = $('<div></div>');
    $layerContainer.attr('class', 'layer-container');
    $layerContainer.append('<input name="layer-description" placeholder="Provide an optional description of the layer" class="form-control" value="'+this.description+'"><br/>');

    var $spacer = $('<div></div>');
    $spacer.attr('class', 'spacer');
    $layerContainer.append($spacer);

    var $template = $('.layer-template.'+this.layout.maker.type).clone(false).attr('class', 'layer');
    $spacer.append($template);
    $(this.layout.maker.container).html($layerContainer);

    this.keymap.forEach((k, i) => {
      this.setKey(i, k.code, k.label);
    });

    $(".keytop").each(function () {
      $(this).height($(this).parent().height() - 13);
      $(this).width($(this).parent().width() - 8);
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

