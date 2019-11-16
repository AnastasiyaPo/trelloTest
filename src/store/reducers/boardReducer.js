import { ActionTypes } from "../../constants/testConstants";

export default function boardReducer(state = {}, action = {}) {
  switch (action.type) {

    case ActionTypes.BOARD:
      return {
        lists: action.lists,
        name: action.boardName,
        id: action.id
      };
    case ActionTypes.REDRAW:
      return state;
    case ActionTypes.UPDATE_LIST:
      return {
        lists: action.lists,
        name: state.name,
        id: action.id
      };

    default:
      return state;
  }
}