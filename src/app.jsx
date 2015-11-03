import {LayerView} from 'layer_view';
import {LayerSelection} from 'layer_selection';
import {LayoutPanel} from 'layout_panel';
import {LayerPanel} from 'layer_panel';
import {KeyPanel} from 'key_panel';

export var App = React.createClass({
  getInitialState: function() {
    return {
      layout: this.props.layout,
      selectedLayer: 0,
      selectedKey: null,
    };
  },

  addLayer: function() {
    this.state.layout.layers.push({description: 'Untitled', keymap: []});
    this.setState(this.state);
  },

  selectLayer: function(layer) {
    this.state.selectedLayer = layer;
    this.setState(this.state);
  },

  selectKey: function(key) {
    this.state.selectedKey = this.state.selectedKey == key ? null : key;
    this.setState(this.state);
  },

  layoutInfoChange: function(description) {
    this.state.layout.description = description;
    this.setState(this.state);
  },

  layerInfoChange: function(description) {
    this.state.layout.layers[this.state.selectedLayer].description = description;
    this.setState(this.state);
  },

  keyInfoChange: function(description, code, ltl) {
    this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey].description = description;
    this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey].code = code;
    this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey].label = ltl;
    this.setState(this.state);
  },

  render: function() {
    var selectedLayer = this.state.selectedLayer;
    var selectedKey = this.state.selectedKey;
    var keymap = this.state.layout.layers[selectedLayer].keymap;
    var keyInfo = keymap[this.state.selectedKey];
    return (
      <div>
        <button onClick={this.addLayer}>Add layer</button>
        <LayerSelection layers={this.state.layout.layers} selectedLayer={selectedLayer} onSelectLayer={this.selectLayer}/>
        <LayerView keys={this.props.keys} keymap={keymap} selectedKey={selectedKey} onSelectKey={this.selectKey}/>
        <div className="row">
          <div className="col-sm-4">
            <LayerPanel layer={this.state.layout.layers[selectedLayer]} selectedLayer={selectedLayer} onLayerInfoChange={this.layerInfoChange}/>
          </div>
          <div className="col-sm-4">
            { selectedKey != null ? <KeyPanel keyInfo={keyInfo} selectedKey={selectedKey}
                                                 onKeyInfoChange={this.keyInfoChange}/> : null
            }
          </div>
          <div className="col-sm-4">
            <LayoutPanel layout={this.state.layout} onLayoutInfoChange={this.layoutInfoChange}/>
          </div>
        </div>
      </div>
    );
  }
});