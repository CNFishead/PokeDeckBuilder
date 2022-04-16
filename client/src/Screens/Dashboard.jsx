import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllDecks } from "../actions/Deck/getAllDecks";
import Loader from "../components/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { decks, loading } = useSelector((state) => state.listDecks);

  useEffect(() => {
    dispatch(getAllDecks());
  }, [dispatch]);
  return (
    <Container>
      <Row className="py-5">
        {loading ? (
          <Loader />
        ) : (
          <>
            {decks.map((deck) => {
              return (
                <Col key={deck._id} lg={4}>
                  <Card>
                    <Card.Img src={deck.image} />
                    <Card.Text>{deck.deck_name}</Card.Text>
                  </Card>
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
