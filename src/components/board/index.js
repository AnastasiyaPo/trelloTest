import React from "react";

import "./style.scss";

import List from "../list";
import Actions from "../../store/actions/boardActions";

import { axiosRequest } from "../../axios/axiosRequest";
import { connect } from "react-redux";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.board = {
      name: "",
      lists: {},
      id: ""
    };
  }

  componentDidMount() {
    axiosRequest("main", "get").then(resBoard => {
      this.board.name = resBoard.data[0].name; //firstTable
      this.board.id = resBoard.data[0].id;

      axiosRequest("lists", "get", { idBoard: this.board.id }).then(resList => {
        resList.data.forEach(list => {
          this.board.lists[list.name] = {};
          this.board.lists[list.name].name = list.name;
          this.board.lists[list.name].idList = list.id;
        });

        axiosRequest("cards", "get", { idBoard: this.board.id }).then(
          resCard => {
            resCard.data.forEach(card => {
              const idList = card.idList;

              let keyLists = {};
              Object.keys(this.board.lists).forEach(key => {
                keyLists[this.board.lists[key].idList] = this.board.lists[
                  key
                ].name;
              });

              if ((this.board.lists[keyLists[idList]] || {}).value) {
                this.board.lists[keyLists[idList]].value.push(card);
              } else {
                (this.board.lists[keyLists[idList]] || {}).value = [card];
              }
            });

            Actions.board(this.board);
          }
        );
      });
    });
  }

  render(props) {
    const { board: { lists = {} } = {} } = this.props;
    const board = Object.assign(this.props.board);
    return (
      <div className="board">
        <div className="board__title">{(board || {}).name}</div>
        <div className="lists">
          {Object.keys(lists).map((list, index) => (
            <List
              id={list}
              key={`c${index}`}
              index={index}
              name={board.lists[list].name}
              list={board.lists[list].value}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: {
      lists: state.boardState.lists,
      name: state.boardState.name,
      id: state.boardState.id
    }
  };
};

export default connect(mapStateToProps)(Board);
