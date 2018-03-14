//  action type
export const CHANGE_TOOL = 'CHANGE_TOOL';
export const CHANGE_STOKE_SIZE = 'CHANGE_STOKE_SIZE';

//  actions
export const changeTool = tool => (
  {
    type: CHANGE_TOOL,
    payload: tool,
  });
export const changeStokeSize = stokeSize => (
  {
    type: CHANGE_STOKE_SIZE,
    payload: Number(stokeSize),
  });

//  other consts
export const STRAIGHT_LINE = 'STRAIGHT_LINE';
export const RECTANGLE = 'RECTANGLE';
export const FREE_LINE = 'FREE_LINE';
export const CIRCLE = 'CIRCLE';
