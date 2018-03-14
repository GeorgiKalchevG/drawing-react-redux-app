import { connect } from 'react-redux';
import DrawingArea from '../components/DrawingArea';

export function mapStateToProps({ tool, strokeSize }) {
  return {
    tool,
    strokeSize,
  };
}

export function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingArea);
