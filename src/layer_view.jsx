import {KeyView} from 'key_view';

export var LayerView = React.createClass({
  render: function() {
    var self = this;
    var styles = {
      display: 'block',
      position: 'relative',
    };
    var keys = this.props.keys.map(function (key, i) {
      var data = key;
      data.label = self.props.keymap[i].label;
      return (
        <KeyView data={data} key={i}/>
      );
    });
    return (
      <div className="layout" style={styles}>
        {keys}
      </div>
    );
  }
});