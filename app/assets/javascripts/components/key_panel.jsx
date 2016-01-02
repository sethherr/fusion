// import {KeyCodeSelect} from 'key_code_select';
// import {keyCodes} from 'keycodes';
// import {keyCategories} from 'keycodes';
// import {decodeHTML} from 'utils';

// export var KeyPanel = React.createClass({
var KeyPanel = React.createClass({
  handleChange: function() {
    this.props.onKeyInfoChange(this.refs.description.value, this.refs.code.value, this.refs.ltl.value);
  },

  render: function () {
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
      <div className="panel panel-default">
        <div className="panel-heading">Key {this.props.selectedKey}</div>
        <div className="panel-body">
          <div className="form-group">
            <label htmlFor="key_code">Keycode:</label>
            <select id="key_code" className='form-control' ref='code' value={this.props.value} onChange={this.props.onKeyInfoChange}>
              {optgroups}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="key_label">Label:</label>
            <input id="key_label" type="text" className="form-control" ref="ltl" value={this.props.keyInfo.label} onChange={this.handleChange}/>
          </div>
          <label htmlFor="key_description">Description:</label>
          <textarea id="key_description" className="form-control" ref="description" onChange={this.handleChange} value={this.props.keyInfo.description}></textarea>
        </div>
      </div>
    );
  }
});
