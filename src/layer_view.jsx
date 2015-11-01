import {KeyView} from 'key_view';

export var LayerView = React.createClass({
  getInitialState: function() {
    return {keys: []};
  },
  render: function() {
    var keys = this.props.keys.map(function (key) {
      return (
        <KeyView x={key.x} y={key.y} width={key.width} voffset={key.voffset} hoffset={key.hoffset} rotate={key.rotate}/>
      );
    });
    return (
      <div className="layout">
        {keys}
      </div>
    );
  }
});