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

  setKey(layer, key, keyCode, label) {
    this.keymap[key] = {code: keyCode, label: label};

    var $key = $('.layer.layer-'+layer+' .key[data-key='+key+']');

    if($key.length == 0) {
      return;
    }

    var $text = $('.layer.layer-'+layer+' .key[data-key='+key+'] .label');
    var $wrapper = $key.find('.keytop');

    if ($text.length == 0) {
      $text = $($wrapper).append('<div class="label label-c-c">'+label+'</div>')
    } else {
      $text.html(label);
    }

  }

  draw(container, keyboardType, l) {
    var $layerContainer = $(container).append('<div></div>');
    $layerContainer.attr('class', 'layer-container layer-container-'+l);
    $layerContainer.data('layer', l);
    $layerContainer.append('<h1>Layer '+(l+1)+'</h1><input name="layer-description" placeholder="Provide an optional description of the layer" class="form-control" value="'+this.description+'"><br/>');

    var $template = $('.layer-template.'+keyboardType).clone(false);
    $template.attr('class', 'layer layer-'+l);
    $template.attr('data-layer', l);

    $layerContainer.append($template);

    this.keymap.forEach((k, i) => {
      this.setKey(l, i, k.code, k.label);
    });

    $(document).ready(function () {
      $(".keytop").each(function () {
        $(this).height($(this).parent().height() - 13);
        $(this).width($(this).parent().width() - 8);
      });
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

