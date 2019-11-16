import React from "react";

import Board from "../board";
import { connect } from "react-redux";

class IndexPage extends React.Component {
  render() {
    return (
      <div className="page" id="page">
        <div className="page-ban" />
        <div className="page__header">header</div>
        <div className="wrapper">
          <Board board={this.props.board} />
        </div>
        <div className="page__footer">footer</div>
      </div>
    );
  }
}

const mapStateToProps = (state, id = state.boardState.id) => {
  return {
    board: {
      lists: state.boardState.lists,
      name: state.boardState.name,
      id: id
    }
  };
};

export default connect(mapStateToProps)(IndexPage);
