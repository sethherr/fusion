import {Layer} from 'layer';
import {LayerSelection} from 'layer_selection';
import {LayoutPanel} from 'layout_panel';
import {LayerPanel} from 'layer_panel';
import {KeyPanel} from 'key_panel';

import {keyCodes} from 'keycodes';
import {keyCategories} from 'keycodes';

export var App = React.createClass({
  getInitialState: function() {
    return {
      layout: this.props.layout,
      selectedLayer: 0,
      selectedKey: null,
    };
  },

  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyUpDown);
    $(document.body).on('keyup', this.handleKeyUpDown);
  },

  componentWillUnmount: function() {
    $(document.body).off('keydown', this.handleKeyUpDown);
    $(document.body).off('keyup', this.handleKeyUpDown);
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
    if (!this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey]) {
      this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey] = {};
    }
    this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey].description = description;
    this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey].code = code;
    this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey].label = ltl;
    this.setState(this.state);
  },

  render: function() {
    var selectedLayer = this.state.selectedLayer;
    var selectedKey = this.state.selectedKey;
    var keymap = this.state.layout.layers[selectedLayer].keymap;
    var keyInfo = keymap[this.state.selectedKey]||{};
    return (
      <div>
        <button onClick={this.addLayer}>Add layer</button>
        <button onClick={this.load}>Load</button>
        <button onClick={this.save}>Save</button>
        <LayerSelection layers={this.state.layout.layers} selectedLayer={selectedLayer} onSelectLayer={this.selectLayer}/>
        <Layer type={this.props.layout.type} keymap={keymap} selectedKey={selectedKey} onSelectKey={this.selectKey}/>
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
  },

  handleKeyUpDown: function() {
    var focussedElement = $("*:focus");

    if(this.state.selectedKey != null && focussedElement.length == 0) {
      if (!keyCodes[event.keyCode]) {
        console.log("Key not recognised, please report.");
        console.log(e);
        return;
      }

      if (!this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey]) {
        this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey] = {};
      }
      this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey].code = keyCodes[event.keyCode][1];
      this.state.layout.layers[this.state.selectedLayer].keymap[this.state.selectedKey].label = keyCodes[event.keyCode][0];
      this.setState(this.state);

      event.preventDefault();
      return false;
    }
  },

  /**
   * the user wants to save the layout
   */
  save: function() {
    console.log(JSON.stringify(this.state.layout, null, "  "));
    alert("Check browser console for JSON output");
  },

  load: function() {
    var self = this;
    var fileName = "keymap_ergodox_ez.json";
    $.getJSON(fileName).success(function(data) {
      self.state.layout = data;
      self.setState(self.state);
    }).fail(function() {
      console.log("woops");
    });
  }
});