import {keyCodes} from 'keycodes';
import {keyCategories} from 'keycodes';
import {decodeHTML} from 'utils';

// Unused at the moment
export var KeyCodeSelect = React.createClass({
  render: function() {

    var optgroups = [];
    for (var cat in keyCategories) {
      if (keyCategories.hasOwnProperty(cat)) {

        var options = [];
        for (var keyCode in keyCodes) {
          if (keyCodes.hasOwnProperty(keyCode)) {
            if (keyCodes[keyCode][2] == cat) {
              // Category - key option
              var name = decodeHTML(keyCodes[keyCode][0] || keyCodes[keyCode][1]);
              options.push(<option key={keyCode} value={keyCodes[keyCode][1]}>{name}</option>);
            }
          }
        }
        optgroups.push(<optgroup key={cat} label={cat}>{options}</optgroup>);
      }
    }
    return (
      <select className='form-control' value={this.props.value} onChange={this.props.onChange}>
        {optgroups}
      </select>
    );
  }
});