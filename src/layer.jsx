import {Key} from 'key';

export var Layer = React.createClass({
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
        <Key data={data} key={i} keyIndex={i} selectedKey={self.props.selectedKey} onSelectKey={self.props.onSelectKey}/>
      );
    });
    return (
      <div className="layout" style={styles}>
        {keys}
      </div>
    );
  }
});