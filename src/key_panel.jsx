export var KeyPanel = React.createClass({
  handleChange: function() {
    this.props.onKeyInfoChange(this.refs.description.value, this.refs.code.value, this.refs.ltl.value);
  },

  render: function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Key {this.props.selectedKey}</div>
        <div className="panel-body">
          Keycode:
          <input type="text" className="form-control" ref="code" value={this.props.keyInfo.code} onChange={this.handleChange}/>
          Label:
          <input type="text" className="form-control" ref="ltl" value={this.props.keyInfo.label} onChange={this.handleChange}/>

          Description:
          <textarea className="form-control" ref="description" onChange={this.handleChange} value={this.props.keyInfo.description||''}></textarea>
        </div>
      </div>
    );
  }
});