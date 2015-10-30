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
    this.keymap[key-1] = {code: keyCode, label: label};

    var $key = d3.select('.layer.layer-'+layer+' .key.key-'+key);
    if($key.empty()) {
      return;
    }
    var $text = d3.select('.layer.layer-'+layer+' .label.label-'+key);
    var $wrapper = $key.node().parentNode;

    if ($text.empty()) {
      $text = d3.select($wrapper).append('text')
        .attr('class', 'label label-'+key)
        .attr('x', +$key.attr('x') + $key.attr('width')/2)
        .attr('y', +$key.attr('y'));

      $text.append('tspan').attr('dx', 0).attr('dy', 30).html(label);
    } else {
      $text.select('text tspan').html(label);
    }

  }

  draw(container, keyboardType, l) {
    var $template = $('.layer-template.'+keyboardType).clone(false);
    $template.attr('class', 'layer layer-'+l);
    $template.attr('data-layer', l);
    $(container).append($template);
    $template.prepend('<h1>Layer '+(l+1)+'</h1><input name="layer-description" placeholder="Provide an optional description of the layer" class="form-control" value="'+this.description+'"><br/>');

    this.keymap.forEach((k, i) => {
      this.setKey(l, i+1, k.code, k.label);
    });

    // The following will remove existing listners and re-apply for new elements
    d3.selectAll('.layer .key').on('click', this.layout.maker.selectKey.bind(this.layout.maker));
    d3.selectAll('.layer .key').on("mouseover", function() {
      d3.select(this).classed({highlight: true});
    });
    d3.selectAll('.layer .key').on('mouseout', function() {
      d3.select(this).classed({highlight: false});
    });
    d3.select('.layer.layer-'+l+' input').on('change', this.setDescription.bind(this));

  }

  setDescription() {
    this.description = d3.event.target.value;
    console.log(this.description);
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

