export var KeyView = React.createClass({
  render: function() {
    return <div className="key" data-key="38" style={{'top': this.props.y*54 +'px', 'left': this.props.x*54+'px'}}><div className="keytop"></div></div>;
  }
});