import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Image,
  Row,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeCard } from "../../actions/Deck/removeCard";
import { getDeck } from "../../actions/Deck/getDeck";
import { updateDeck } from "../../actions/Deck/updateDeck";
import DeckEditForm from "../../components/forms/Deck/DeckEditForm";
import Loader from "../../components/Loader";

import "./index.css";
import { addCard } from "../../actions/Deck/addCard";
import { getCards } from "../../actions/Cards/getCards";
import { CARDS_CLEAR } from "../../constants/deckConstants";
import { generatePdf } from "../../actions/Deck/generatePdf";

const DeckEdit = () => {
  const { deckId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component State
  const [deckForm, setDeckForm] = useState({
    deck_name: "",
    type: "",
    image: "",
  });
  const [search, setSearch] = useState("");
  // App State
  const { deck, loading } = useSelector((state) => state.listDeckDetails);
  const { imageUrl } = useSelector((state) => state.imageUploader);
  const { cards, loading: cardsLoading } = useSelector((state) => state.cards);
  const { loading: updateLoader } = useSelector((state) => state.updateDeck);

  const handleChange = (e) => {
    setDeckForm({ ...deckForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDeck(deckForm));
  };
  const { pdf } = useSelector((state) => state.preview);
  useEffect(() => {
    // if (pdf) {
    //   navigate("/dashboard/deck/preview");
    // }
    if (deckId !== deck._id) {
      dispatch(getDeck(deckId));
    } else {
      setDeckForm(deck);
    }
    if (search !== "") {
      dispatch(getCards(search));
    }
    if (imageUrl) {
      setDeckForm({ ...deckForm, image: imageUrl });
    }
  }, [dispatch, deckId, deck, imageUrl, search, pdf]);

  const generatePreview = () => {
    // hit the api to get to generate the pdf of the deck
    dispatch(generatePdf(deckForm));
    // then we need to download that pdf
  };

  return (
    <Container style={{ padding: "2.5%" }}>
      {loading && updateLoader ? (
        <Loader />
      ) : (
        <>
          <Row className="text-center">
            <h1>{deck.deck_name}</h1>
          </Row>
          <Row className="">
            <Button variant="primary" onClick={generatePreview}>
              PDF
            </Button>
          </Row>
          <Row>
            <Col className="text-center" lg={6}>
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
          <hr />
          <Container>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" className="hide-sm">
                Search Cards
              </InputGroup.Text>
              <FormControl
                placeholder="Look up cards"
                aria-label="Look up cards"
                aria-describedby="basic-addon1"
                value={search}
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroup.Text
                id="basic-addon2"
                as={Button}
                onClick={() => dispatch({ type: CARDS_CLEAR })}
              >
                Clear Search
              </InputGroup.Text>
            </InputGroup>
            <Row className="justify-content-evenly">
              {cardsLoading ? (
                <Loader />
              ) : (
                cards &&
                cards.map((c) => {
                  return (
                    <Col key={c._id} lg={3} md={3} sm={3} xs={4}>
                      <Card
                        className="tcg-card-image"
                        onClick={() => dispatch(addCard(deck._id, c._id))}
                      >
                        <Card.Img src={c.image} />
                        <Card.Text className="text-center">
                          Amount you have: {c.countInStock}
                        </Card.Text>
                      </Card>
                    </Col>
                  );
                })
              )}
            </Row>
          </Container>
          <hr />
          <Row className="deck-cards-container">
            {deck.cards &&
              deck.cards.map((card) => {
                return (
                  <Col
                    key={card._id}
                    lg={2}
                    md={3}
                    sm={3}
                    xs={4}
                    style={{ padding: ".5%" }}
                  >
                    <Card
                      className="tcg-card-image"
                      onClick={() => dispatch(removeCard(deck._id, card._id))}
                    >
                      <Card.Img src={card.imageUrl} />
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </>
      )}
    </Container>
  );
};

export default DeckEdit;
