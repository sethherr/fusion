import {LayerView} from 'layer_view';
import {LayerSelection} from 'layer_selection';

export var App = React.createClass({
  getInitialState: function() {
    return {
      selectedLayer: 0
    };
  },

  selectLayer: function(layer) {
    this.setState({
      selectedLayer: layer
    });
  },

  render: function() {
    var keymap = this.props.layout.layers[this.state.selectedLayer].keymap;
    return (
      <div>
        <LayerSelection layers={this.props.layout.layers} selectedLayer={this.state.selectedLayer} onSelectLayer={this.selectLayer}/>
        <LayerView keys={this.props.keys} keymap={keymap}/>
      </div>
    );
  }
});