import React, { useEffect, useState } from "react";
import { Button, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateDeck } from "../actions/Deck/updateDeck";
// import { updateUserInformation } from "../actions/user/updateUserInformation";
import { uploadImage } from "../utils/uploadImage";
import Loader from "./Loader";

const ImageUpload = ({ setUserForm }) => {
  const dispatch = useDispatch();
  // component state
  const [image, setImage] = useState("");

  // App State
  const { loading: uploading, imageUrl } = useSelector(
    (state) => state.imageUploader
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (imageUrl !== "") {
      setImage(imageUrl);
    }
    // eslint-disable-next-line
  }, [user, dispatch, imageUrl]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateDeck({ image }));
  };
  const uploadFileHandler = (e) => {
    dispatch(uploadImage(e.target.files));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Form onSubmit={submitHandler}>
        {uploading ? (
          <Loader />
        ) : (
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              custom
              onChange={(e) => uploadFileHandler(e)}
            ></Form.Control>
          </Form.Group>
        )}
        <Row style={{ padding: "2% 0", justifyContent: "center" }}>
          <Button variant="warning" type="submit" style={{ width: "40%" }}>
            Update Deck Image
          </Button>
        </Row>
      </Form>
    </div>
  );
};
export default ImageUpload;
