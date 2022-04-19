import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDeck } from "../../actions/Deck/getDeck";
import { updateDeck } from "../../actions/Deck/updateDeck";
import DeckEditForm from "../../components/forms/Deck/DeckEditForm";
import Loader from "../../components/Loader";

import "./index.css";

const DeckEdit = () => {
  const { deckId } = useParams();
  const dispatch = useDispatch();

  // Component State
  const [deckForm, setDeckForm] = useState({
    deck_name: "",
    type: "",
    image: "",
  });

  console.log(deckForm);
  // App State
  const { deck, loading } = useSelector((state) => state.listDeckDetails);
  const { imageUrl } = useSelector((state) => state.imageUploader);
  const { deck: updatedDeck, loading: updateLoader } = useSelector(
    (state) => state.updateDeck
  );

  const handleChange = (e) => {
    setDeckForm({ ...deckForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDeck(deckForm));
  };
  useEffect(() => {
    if (deckId !== deck._id) {
      dispatch(getDeck(deckId));
    } else {
      setDeckForm(deck);
    }
    if (imageUrl) {
      setDeckForm({ ...deckForm, image: imageUrl });
    }
  }, [dispatch, deck._id, deckId, updatedDeck, deck, imageUrl]);
  return (
    <Container>
      {loading && updateLoader ? (
        <Loader />
      ) : (
        <>
          <Row className="text-center">
            <h1>{deck.deck_name}</h1>
          </Row>
          <Row>
            <Col className="text-center">
              <Image
                src={imageUrl ? imageUrl : deck.image}
                className="deck-image"
                fluid
              />
              <Container>
                Num of cards: {deck.cards && deck.cards.length}
              </Container>
            </Col>
            <Col>
              <DeckEditForm
                form={deckForm}
                handleChange={handleChange}
                onSubmit={handleSubmit}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default DeckEdit;
