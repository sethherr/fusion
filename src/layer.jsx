import {Key} from 'key';

var KEY_DEFINITIONS = {
  'ergodox_ez': [
    // LEFT
    {x:0, y: 0, width: 1.5, voffset: 0.37}, {x:1.5, y: 0, voffset: 0.37}, {x:2.5, y: 0, voffset: 0.129}, {x:3.5, y: 0}, {x:4.5, y: 0, voffset: 0.129}, {x:5.5, y: 0, voffset: 0.24}, {x:6.5, y: 0, voffset: 0.24},
    {x:0, y: 1, width: 1.5, voffset: 0.37}, {x:1.5, y: 1, voffset: 0.37}, {x:2.5, y: 1, voffset: 0.129}, {x:3.5, y: 1}, {x:4.5, y: 1, voffset: 0.129}, {x:5.5, y: 1, voffset: 0.24}, {x:6.5, y: 1, voffset: 0.24, height: 1.5},
    {x:0, y: 2, width: 1.5, voffset: 0.37}, {x:1.5, y: 2, voffset: 0.37}, {x:2.5, y: 2, voffset: 0.129}, {x:3.5, y: 2}, {x:4.5, y: 2, voffset: 0.129}, {x:5.5, y: 2, voffset: 0.24},
    {x:0, y: 3, width: 1.5, voffset: 0.37}, {x:1.5, y: 3, voffset: 0.37}, {x:2.5, y: 3, voffset: 0.129}, {x:3.5, y: 3}, {x:4.5, y: 3, voffset: 0.129}, {x:5.5, y: 3, voffset: 0.24}, {x:6.5, y: 3, voffset: -0.26, height: 1.5},
    {x:0.5, y: 4, width: 1, voffset: 0.37}, {x:1.5, y: 4, voffset: 0.37}, {x:2.5, y: 4, voffset: 0.129}, {x:3.5, y: 4}, {x:4.5, y: 4, voffset: 0.129},
    // thumb
    {x:7.5, y: 3, height: 1, hoffset: 0.37, voffset: 0.87, rotate: 30},
    {x:8.5, y: 3, height: 1, hoffset: 0.24, voffset: 1.37, rotate: 30},
    {x:8.5, y: 4, height: 1, hoffset: -0.26, voffset: 1.24, rotate: 30},
    {x:6.5, y: 4, height: 2, voffset: 0.24, rotate: 30},
    {x:7.5, y: 4, height: 2, hoffset: -0.13, voffset: 0.74, rotate: 30},
    {x:8.5, y: 5, height: 1, hoffset: -0.76, voffset: 1.11, rotate: 30},

    // RIGHT
    {x: 12, y: 0, voffset: 0.24}, {x: 13, y: 0, voffset: 0.24}, {x: 14, y: 0, voffset: 0.129}, {x: 15, y: 0}, { x: 16, y: 0, voffset: 0.129}, {x: 17, y: 0, voffset: 0.37}, {x: 18, y: 0, width: 1.5, voffset: 0.37},
    {x: 12, y: 1, voffset: 0.24, height: 1.5}, {x: 13, y: 1, voffset: 0.24}, {x: 14, y: 1, voffset: 0.129}, { x: 15, y: 1}, {x: 16, y: 1, voffset: 0.129}, {x: 17, y: 1, voffset: 0.37}, {x: 18, y: 1, width: 1.5, voffset: 0.37},
    {x: 13, y: 2, voffset: 0.24}, {x: 14, y: 2, voffset: 0.129}, {x: 15, y: 2}, {x: 16, y: 2, voffset: 0.129}, { x: 17, y: 2, voffset: 0.37}, {x: 18, y: 2, width: 1.5, voffset: 0.37},
    {x: 12, y: 3, voffset: -0.26, height: 1.5}, {x: 13, y: 3, voffset: 0.24}, {x: 14, y: 3, voffset: 0.129}, { x: 15, y: 3}, {x: 16, y: 3, voffset: 0.129}, {x: 17, y: 3, voffset: 0.37}, {x: 18, y: 3, width: 1.5, voffset: 0.37},
    {x: 14, y: 4, voffset: 0.129}, {x: 15, y: 4}, {x: 16, y: 4, voffset: 0.129}, {x: 17, y: 4, voffset: 0.37}, { x: 18, y: 4, width: 1, voffset: 0.37},
    // thumb
    {x: 10, y: 3, height: 1, hoffset: -0.24, voffset: 1.37, rotate: -30, origin: 'top right'},
    {x: 11, y: 3, height: 1, hoffset: -0.37, voffset: 0.87, rotate: -30, origin: 'top right'},
    {x: 10, y: 4, height: 1, hoffset: 0.26, voffset: 1.24, rotate: -30, origin: 'top right'},
    {x: 10, y: 5, height: 1, hoffset: 0.76, voffset: 1.11, rotate: -30, origin: 'top right'},
    {x: 11, y: 4, height: 2, hoffset: 0.13, voffset: 0.74, rotate: -30, origin: 'top right'},
    {x: 12, y: 4, height: 2, voffset: 0.24, rotate: -30, origin: 'top right'},
  ],
  'planck': [
    {x:0, y: 0}, {x:1, y: 0}, {x:2, y: 0}, {x:3, y: 0}, {x:4, y: 0}, {x:5, y: 0}, {x:6, y: 0}, {x:7, y: 0}, {x:8, y: 0}, {x:9, y: 0}, {x:10, y: 0}, {x:11, y: 0},
    {x:0, y: 1}, {x:1, y: 1}, {x:2, y: 1}, {x:3, y: 1}, {x:4, y: 1}, {x:5, y: 1}, {x:6, y: 1}, {x:7, y: 1}, {x:8, y: 1}, {x:9, y: 1}, {x:10, y: 1}, {x:11, y: 1},
    {x:0, y: 2}, {x:1, y: 2}, {x:2, y: 2}, {x:3, y: 2}, {x:4, y: 2}, {x:5, y: 2}, {x:6, y: 2}, {x:7, y: 2}, {x:8, y: 2}, {x:9, y: 2}, {x:10, y: 2}, {x:11, y: 2},
    {x:0, y: 3}, {x:1, y: 3}, {x:2, y: 3}, {x:3, y: 3}, {x:4, y: 3}, {x:5, y: 3, width: 2}, {x:7, y: 3}, {x:8, y: 3}, {x:9, y: 3}, {x:10, y: 3}, {x:11, y: 3}
  ],
  'preonic': [
    {x:0, y: 0}, {x:1, y: 0}, {x:2, y: 0}, {x:3, y: 0}, {x:4, y: 0}, {x:5, y: 0}, {x:6, y: 0}, {x:7, y: 0}, {x:8, y: 0}, {x:9, y: 0}, {x:10, y: 0}, {x:11, y: 0},
    {x:0, y: 1}, {x:1, y: 1}, {x:2, y: 1}, {x:3, y: 1}, {x:4, y: 1}, {x:5, y: 1}, {x:6, y: 1}, {x:7, y: 1}, {x:8, y: 1}, {x:9, y: 1}, {x:10, y: 1}, {x:11, y: 1},
    {x:0, y: 2}, {x:1, y: 2}, {x:2, y: 2}, {x:3, y: 2}, {x:4, y: 2}, {x:5, y: 2}, {x:6, y: 2}, {x:7, y: 2}, {x:8, y: 2}, {x:9, y: 2}, {x:10, y: 2}, {x:11, y: 2},
    {x:0, y: 3}, {x:1, y: 3}, {x:2, y: 3}, {x:3, y: 3}, {x:4, y: 3}, {x:5, y: 3}, {x:6, y: 3}, {x:7, y: 3}, {x:8, y: 3}, {x:9, y: 3}, {x:10, y: 3}, {x:11, y: 3},
    {x:0, y: 4}, {x:1, y: 4}, {x:2, y: 4}, {x:3, y: 4}, {x:4, y: 4}, {x:5, y: 4, width: 2}, {x:7, y: 4}, {x:8, y: 4}, {x:9, y: 4}, {x:10, y: 4}, {x:11, y: 4}
  ]

};

export var Layer = React.createClass({
  render: function() {
    var self = this;
    var styles = {
      display: 'block',
      position: 'relative',
      height: 415,
    };
    var keys = KEY_DEFINITIONS[this.props.type].map(function (key, i) {
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