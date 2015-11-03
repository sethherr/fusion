export var LayerPanel = React.createClass({
  handleChange: function() {
    this.props.onLayerInfoChange(this.refs.layerDescription.value);
  },

  render: function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Layer {this.props.selectedLayer}</div>
        <div className="panel-body">
          Description:
          <textarea className="form-control" ref="layerDescription" onChange={this.handleChange} value={this.props.layer.description}></textarea>
        </div>
      </div>
    );
  }
});