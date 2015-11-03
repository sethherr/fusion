export class LayerSelection extends React.Component {
  handleChange() {
    this.props.onSelectLayer(this.refs.selectedLayer.value);
  }
  render() {
    var options = this.props.layers.map(function (layer, i) {
      return (
        <option value={i} key={i}>Layer {i}</option>
      );
    });
    return (
      <select ref="selectedLayer" value={this.props.selectedLayer} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}