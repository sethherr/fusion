import {KeyView} from 'key_view';

export var LayerView = React.createClass({
  getInitialState: function() {
    return {keys: []};
  },
  componentWillMount: function() {
    this.setState({
      keys: this.props.keys
    });
  },
  rotate: function() {
    console.log("rotate");
    var keys = this.state.keys;
    keys[0].rotate = (keys[0].rotate||0) + 5;
    this.setState({keys: keys});
  },
  render: function() {
    var styles = {
      display: 'block',
      position: 'relative',
    };
    var keys = this.state.keys.map(function (key) {
      return (
        <KeyView x={key.x} y={key.y} width={key.width} height={key.height} voffset={key.voffset} hoffset={key.hoffset} rotate={key.rotate} origin={key.origin} backgroundColor={key.backgroundColor}/>
      );
    });
    return (
      <div className="layout" style={styles}>
        {keys}
      </div>
    );
  }
});