import React from "react";
import "./style.scss";

import { connect } from "react-redux";

import Card, { addCard } from "../card";
import "../../form.scss";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.newCard = {
      name: "",
      desc: "",
      idList: ""
    };
  }
  handleAddCard = (e, idList, idBoard) => {
    e.preventDefault();
    if (!this.newCard.name) {
      alert("input all data");
      return;
    }
    this.newCard.idList = idList;
    addCard(this.newCard, idBoard);
  };

  handleInputChange = e => {
    this.newCard[e.target.name] = e.target.value;
  };

  render() {
    return (
      <div className="list" id={this.props.id}>
        <div className="list__name">{this.props.name}</div>
        <div className="list__count">
          count = {(this.props.list || []).length}
        </div>
        <div className="card">
          {this.props.list.map((item, index) => {
            return <Card card={item} index={index} key={item.id} />;
          })}
        </div>
        <form
          className="form"
          onSubmit={e =>
            this.handleAddCard(
              e,
              this.props.board.lists[this.props.id].idList,
              this.props.board.id
            )
          }
        >
          <div className="form__header">Add card</div>
          <div className="form__input-text">
            <input
              name="name"
              type="text"
              maxLength={30}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form__input-text">
            <textarea
              className="form__textarea"
              name="desc"
              onChange={this.handleInputChange}
            />
          </div>
          <input className="form__button" type="submit" value="add new card" />
        </form>
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

export default connect(mapStateToProps)(List);
