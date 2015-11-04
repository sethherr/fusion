import {Layer} from 'layer';
import {LayerSelection} from 'layer_selection';
import {LayoutPanel} from 'layout_panel';
import {LayerPanel} from 'layer_panel';
import {KeyPanel} from 'key_panel';

import {keyCodes} from 'keycodes';
import {keyCategories} from 'keycodes';

export var App = React.createClass({
  getInitialState: function() {

    var items = {
      clear: {name: "Clear", callback: this.contextMenuKey },
      separator1: "-----"
    };

    for (var cat in keyCategories) {
      if (keyCategories.hasOwnProperty(cat)) {
        if(keyCategories[cat] == '-----') {
          var catMenu = "-----";
        } else {
          // Category main menu
          var catMenu = {name: keyCategories[cat], items: {} };
          for (var keyCode in keyCodes) {
            if (keyCodes.hasOwnProperty(keyCode)) {
              if (keyCodes[keyCode][2] == cat) {
                // Category - key option
                var name = keyCodes[keyCode][0] || keyCodes[keyCode][1];
                catMenu.items['set|'+keyCodes[keyCode][1]+'|'+keyCodes[keyCode][0]] = {
                  name: name,
                  callback: this.contextMenuKey
                };
              }
            }
          }
        }
        items['cat'+cat] = catMenu;
      }
    }

    // Start context menu on all keys
    //$.contextMenu({
    //  selector: ".key",
    //  items: items
    //});

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

  // FIXME: Remove
  contextMenuKey(optionKey, option) {
    return;
    console.log(option.$trigger[0]);
    var $this = $(option.$trigger);
    var key = $this.data('key');
    console.log("ReactDOM.findDOMNode(this)", ReactDOM.findDOMNode(option.$trigger[0]));

    var what = optionKey.split('|');
    if(what[0] == 'clear') {
      //this.setKey(key, '', '');
      console.log("clear");
    } else if(what[0] == 'set') {
      console.log(key, what[1], what[2]);
      //this.setKey(key, what[1], what[2]);
    }
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
        <LayerSelection layers={this.state.layout.layers} selectedLayer={selectedLayer} onSelectLayer={this.selectLayer}/>
        <Layer keys={this.props.keys} keymap={keymap} selectedKey={selectedKey} onSelectKey={this.selectKey}/>
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