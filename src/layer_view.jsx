import {KeyView} from 'key_view';

export var LayerView = React.createClass({
  render: function() {
    var self = this;
    var styles = {
      display: 'block',
      position: 'relative',
      height: 415,
    };
    var keys = this.props.keys.map(function (key, i) {
      var data = key;
      data.label = self.props.keymap[i] ? self.props.keymap[i].label : '';
      return (
        <KeyView data={data} key={i} keyIndex={i} selectedKey={self.props.selectedKey} onSelectKey={self.props.onSelectKey}/>
      );
    });
    return (
      <div className="layout" style={styles}>
        {keys}
      </div>
    );
  }
});