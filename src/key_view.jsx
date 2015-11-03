import {decodeHTML} from 'utils';

export var KeyView = React.createClass({
  render: function() {
    var styles = {
      'top': (this.props.data.voffset*54||0)+this.props.data.y*54 +'px',
      'left': (this.props.data.hoffset*54||0)+this.props.data.x*54+'px',
      'width': (this.props.data.width||1)*54+'px',
      'height': (this.props.data.height||1)*54+'px',
      'transform': 'rotate('+(this.props.data.rotate||0)+'deg)',
      'transformOrigin': this.props.data.origin||'top left',
      'backgroundColor': this.props.data.backgroundColor,
    };
    return (
      <div className='key' style={styles} onClick={this.handleClick}>
        <div className="keytop">
          <div className="l l-tl">{decodeHTML(this.props.data.label||'')}</div>
        </div>
      </div>
    );
  }
});