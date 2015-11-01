export var KeyView = React.createClass({
  render: function() {
    var styles = {
      'top': (this.props.voffset||0)+this.props.y*54 +'px',
      'left': (this.props.hoffset||0)+this.props.x*54+'px',
      'width': (this.props.width||1)*54+'px',
      'transform': 'rotate('+(this.props.rotate||0)+'deg)',
      'transform-origin': 'top left',
    };
    return <div className="key" style={styles}><div className="keytop"></div></div>;
  }
});