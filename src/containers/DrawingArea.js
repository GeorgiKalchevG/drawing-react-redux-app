import React from 'react';
import DrawingArea from '../components/DrawingArea';
import {connect} from 'react-redux';

export function mapStateToProps(tool, strokeSize) {
    return {
        tool,
        strokeSize,
    };
}

export function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingArea);
