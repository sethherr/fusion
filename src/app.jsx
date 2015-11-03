import {LayerView} from 'layer_view';
import {LayerSelection} from 'layer_selection';

export var App = React.createClass({
  getInitialState: function() {
    return {
      selectedLayer: 0,
      selectedKey: null,
    };
  },

  selectLayer: function(layer) {
    this.state.selectedLayer = layer;
    this.setState(this.state);
  },

  selectKey(key) {
    this.state.selectedKey = this.state.selectedKey == key ? null : key;
    this.setState(this.state);
  },

  render: function() {
    var keymap = this.props.layout.layers[this.state.selectedLayer].keymap;
    return (
      <div>
        <LayerSelection layers={this.props.layout.layers} selectedLayer={this.state.selectedLayer} onSelectLayer={this.selectLayer}/>
        <LayerView keys={this.props.keys} keymap={keymap} selectedKey={this.state.selectedKey} onSelectKey={this.selectKey}/>
      </div>
    );
  }
});