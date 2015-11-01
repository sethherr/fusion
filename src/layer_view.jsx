import {KeyView} from 'key_view';

export var LayerView = React.createClass({
  render: function() {
    var keys = this.props.keys.map(function (key) {
      return (
        <KeyView x={key.x} y={key.y}/>
      );
    });
    return (
      <div className="layout">
        {keys}
      </div>
    );
  }
});