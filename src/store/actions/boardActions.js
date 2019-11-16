import { dispatch } from "../createStore";
import { store } from "../createStore";

import { ActionTypes } from "../../constants/testConstants";
import { axiosRequest } from "../../axios/axiosRequest";

const board = obj => {
  dispatch({
    type: ActionTypes.BOARD,
    lists: obj.lists,
    boardName: obj.name,
    id: obj.id
  });
};

const redraw = () => {
  dispatch({
    type: ActionTypes.REDROW
  });
};

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

const updateList = (idLists, idBoard) => {
  idLists = unique(idLists);
  let lists = Object.assign(store.getState().boardState.lists);

  axiosRequest("cards", "get", { idBoard: idBoard }).then(res => {
    let newList = {};
    res.data.forEach(card => {
      idLists.forEach(idList => {
        if (idList === card.idList) {
          if (!newList[idList]) {
            newList[idList] = {
              idList: idList,
              value: []
            };
          }
          newList[idList].value.push(card);
        }
      });
    });
    Object.keys(lists).forEach(listStart => {
      Object.keys(newList).forEach(listNew => {
        if (lists[listStart].idList === newList[listNew].idList) {
          lists[listStart].value = newList[listNew].value;
        }
      });
    });
    dispatch({
      type: ActionTypes.UPDATE_LIST,
      lists: lists,
      id: idBoard
    });
  });
};

export default { board, redraw, updateList };
