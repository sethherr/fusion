import {LayerView} from 'layer_view';
import {LayerSelection} from 'layer_selection';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedLayer: 0};
  }

  selectLayer(layer) {
    this.setState({
      selectedLayer: layer
    });
  }

  render() {
    var keymap = this.props.layout.layers[this.state.selectedLayer].keymap;
    return (
      <div>
        <LayerSelection layers={this.props.layout.layers} selectedLayer={this.state.selectedLayer} onSelectLayer={this.selectLayer}/>
        <LayerView keys={this.props.keys} keymap={keymap}/>
      </div>
    );
  }
}