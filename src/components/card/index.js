import React from "react";
import "./style.scss";

import Actions from "../../store/actions/boardActions";

import { connect } from "react-redux";
import { axiosRequest } from "../../axios/axiosRequest";

export function addCard(dataCard, idBoard) {
  let newCard = {};
  Object.keys(dataCard).forEach(data => {
    if (dataCard[data]) {
      newCard[data] = dataCard[data];
    }
  });

  axiosRequest("createCard", "post", newCard).then(res => {
    Actions.updateList([newCard.idList], idBoard);
  });
}

class Card extends React.Component {
  render() {
    const card = this.props.card || {};
    return (
      <div key={`b${this.props.index}`} className="card-item" id={card.id}>
        <div className="card-item__info">
          {card.name}
          <br />
          {card.id}
          <br />
          Date: {(card.dateLastActivity || "").slice(0, 10)}
          {card.desc ? (
            <span>
              <br />
              desc: {card.desc}
            </span>
          ) : (
            ""
          )}
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

export default connect(mapStateToProps)(Card);
