import React, { useEffect } from "react";
import { Button, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../../utils/uploadImage";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";

const DeckEditForm = ({
  onSubmit,
  handleChange,
  form: { deck_name, type, image: imageURL2 },
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // App State
  const { loading: uploading, imageUrl } = useSelector(
    (state) => state.imageUploader
  );

  const uploadFileHandler = (e) => {
    dispatch(uploadImage(e.target.files));
  };
  useEffect(() => {
    if (imageUrl !== "") {
      handleChange({ deck_name, type, image: imageUrl });
    }
    // eslint-disable-next-line
  }, [dispatch, imageUrl]);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Deck Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="deck_name"
            value={deck_name}
            onChange={handleChange}
            placeholder="Leafeon VMax..."
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Deck Type"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="type"
            value={type}
            onChange={handleChange}
            placeholder="Fighting/Lighting..."
          />
        </FloatingLabel>
        {uploading ? (
          <Loader />
        ) : (
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              name="image"
              value={imageURL2}
              onChange={handleChange}
            ></Form.Control>
            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              onChange={(e) => uploadFileHandler(e)}
            ></Form.Control>
          </Form.Group>
        )}
        <Row className="justify-content-center py-2">
          <Button variant="info" type="submit" className="update-button">
            Update Deck Details
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default DeckEditForm;
