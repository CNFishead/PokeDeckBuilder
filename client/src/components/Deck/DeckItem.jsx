import React from "react";
import { Button, Card } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteDeck } from "../../actions/Deck/deleteDeck";

import "./index.css";
const DeckItem = ({ deck }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Card>
      <div className="deck-icons-container">
        <AiFillDelete
          className="deck-icon deck-icon-delete"
          onClick={() => dispatch(deleteDeck(deck._id))}
        />
      </div>
      <Link to={`/dashboard/deck/${deck._id}/edit`}>
        <Card.Img src={deck.image} />
        <Card.Text className="text-center p-2" as={Button} variant="info" style={{width: '100%'}}>{deck.deck_name}</Card.Text>
      </Link>
    </Card>
  );
};

export default DeckItem;
