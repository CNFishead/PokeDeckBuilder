import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { updateUserInformation } from "../actions/user/updateUserInformation";
import { uploadImage } from "../utils/uploadImage";
import Loader from "./Loader";

const ImageUpload = ({ setUserForm }) => {
  const dispatch = useDispatch();
  // component state
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // App State
  const { loading: uploading, imageUrl } = useSelector(
    (state) => state.imageUploader
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setProfileImageUrl(user.profileImageUrl);
    if (imageUrl !== "") {
      setProfileImageUrl(imageUrl);
    }
    // eslint-disable-next-line
  }, [user, dispatch, imageUrl]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(updateUserInformation({ profileImageUrl }));
  };
  const uploadFileHandler = (e) => {
    dispatch(uploadImage(e.target.files));
  };
  return (
    <div style={{ textAlign: "center", padding: "5%" }}>
      <Image
        src={profileImageUrl}
        fluid
        style={{
          maxHeight: "300px",
          maxWidth: "300px",
        }}
      />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
          ></Form.Control>
          <Form.Control
            type="file"
            id="image-file"
            label="Choose File"
            custom
            onChange={(e) => uploadFileHandler(e)}
          ></Form.Control>
          {uploading && <Loader />}
        </Form.Group>
        <div style={{ padding: "2%" }}>
          <Button type="submit">Update Profile Image</Button>
        </div>
      </Form>
    </div>
  );
};
export default ImageUpload;
