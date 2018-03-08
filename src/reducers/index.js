import {CHANGE_TOOL, CHANGE_STOKE_SIZE, STRAIGHT_LINE} from '../actions/index';

const initialState = {
    tool: STRAIGHT_LINE,
    strokeSize: 1,
};

const rootReducer = (state = initialState, action) => {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case CHANGE_TOOL:
            return {...state, tool: action.payload};
        case CHANGE_STOKE_SIZE:

            return {...state, strokeSize: action.payload};
        default:
            return state;
    }
};

export default rootReducer;
