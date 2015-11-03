export var LayoutPanel = React.createClass({
  handleChange: function() {
    this.props.onLayoutInfoChange(this.refs.description.value);
  },

  render: function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Layout</div>
        <div className="panel-body">
          Description:
          <textarea className="form-control" ref="description" onChange={this.handleChange} value={this.props.layout.description}></textarea>
        </div>
      </div>
    );
  }
});