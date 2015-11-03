import {decodeHTML} from 'utils';

export class KeyView extends React.Component {
  handleClick() {
    console.log("handleClick", this.props);
    //this.props.onSelect(this.props.key);
  }

  render() {
    var styles = {
      top: (this.props.data.voffset*54||0)+this.props.data.y*54,
      left: (this.props.data.hoffset*54||0)+this.props.data.x*54,
      width: (this.props.data.width||1)*54,
      height: (this.props.data.height||1)*54,
      transform: 'rotate('+(this.props.data.rotate||0)+'deg)',
      transformOrigin: this.props.data.origin||'top left',
      backgroundColor: this.props.data.backgroundColor
    };
    var keyTopStyles = {
      height: styles.height - 13,
      width: styles.width - 8
    };

    return (
      <div className='key' style={styles} onClick={this.handleClick}>
        <div className="keytop" style={keyTopStyles}>
          <div className="l l-tl">{decodeHTML(this.props.data.label||'')}</div>
        </div>
      </div>
    );
  }
}