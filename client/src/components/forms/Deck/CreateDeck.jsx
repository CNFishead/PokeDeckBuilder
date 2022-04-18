import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import Loader from "../../Loader";
import "./index.css";

const CreateDeck = ({
  show = true,
  handleClose,
  handleCreate,
  loading = false,
}) => {
  const [form, setForm] = useState({
    deck_name: "",
    type: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Huzzah! A new Deck!</Modal.Title>
      </Modal.Header>
      {loading ? (
        <div style={{ padding: "5%" }}>
          <Loader />
        </div>
      ) : (
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Deck Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Evee VMAX.."
                name="deck_name"
                value={form.deck_name}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Deck Type"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Electric/Fighting..."
                name="type"
                value={form.type}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form>
          <div className="create-form-button-container">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={() => handleCreate(form)}
              type="submit"
            >
              Create Deck
            </Button>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default CreateDeck;
