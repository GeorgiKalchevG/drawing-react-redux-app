import { connect } from 'react-redux';
import ToolsBar from '../components/ToolsBar';
import * as actions from '../actions/index';

export function mapStateToProps({ tool, strokeSize }) {
  return {
    tool,
    strokeSize,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    selectTool: tool => dispatch(actions.changeTool(tool)),
    changeStrokeSize: strokeSize =>
      dispatch(actions.changeStokeSize(strokeSize)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsBar);
