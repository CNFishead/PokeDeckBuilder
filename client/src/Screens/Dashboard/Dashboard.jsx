import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
// components
import Loader from "../../components/Loader";
import DeckItem from "../../components/Deck/DeckItem";
import CreateDeck from "../../components/forms/Deck/CreateDeck";

// Actions
import { createNewDeck } from "../../actions/Deck/createNewDeck";
import { getAllDecks } from "../../actions/Deck/getAllDecks";

import "./index.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // component state
  const [show, setShow] = useState(false);

  // App State
  const { decks, loading } = useSelector((state) => state.listDecks);
  const {
    deck,
    success: successCreate,
    loading: loadingCreate,
  } = useSelector((state) => state.deckCreate);

  const handleCreate = (deck) => {
    setShow(false);
    dispatch(createNewDeck(deck));
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    if (successCreate) {
      navigate(`/dashboard/deck/${deck._id}/edit`);
    }
    dispatch(getAllDecks());
  }, [dispatch, deck, navigate, successCreate]);
  return (
    <Container>
      <div className="create-button-container">
        <CreateDeck
          handleCreate={handleCreate}
          loading={loadingCreate}
          show={show}
          handleClose={handleClose}
        />
        <Button variant="success" onClick={() => setShow(true)}>
          <GrAddCircle /> Create New Deck
        </Button>
      </div>
      <Row className="py-2 justify-content-evenly">
        {loading ? (
          <Loader />
        ) : (
          <>
            {decks.map((deck) => {
              return (
                <Col
                  key={deck._id}
                  lg={3}
                  md={4}
                  sm={5}
                  xs={6}
                  className="m-2 deck-card-item"
                >
                  <DeckItem deck={deck} />
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
