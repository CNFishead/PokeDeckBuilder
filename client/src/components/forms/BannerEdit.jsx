import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import FormContainer from "../FormContainer";
import Meta from "../Meta";
import Loader from "../Loader";
import { UPDATE_BANNER_RESET } from "../../constants/dynamicConstants";
import { getBanner } from "../../actions/Admin/Banner/getBanner";
import { updateBanner } from "../../actions/Admin/Banner/updateBanner";

const BannerEdit = ({ history }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const { banner, success: successUpdate } = useSelector(
    (state) => state.dynamic
  );
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_BANNER_RESET });
      window.location.reload();
    } else {
      if (!banner || !banner.value) {
        dispatch(getBanner());
      } else {
        setImage(banner.value);
      }
    }
  }, [dispatch, successUpdate, history, banner]);

  const uploadFileHandler = async (e) => {
    // files, is an array, since we have the ability to upload multiple
    // files we only want the first file.
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    //Triggers the Loader component
    setUploading(true);

    //This makes the request to the backend
    try {
      const config = {
        headers: {
          // Has to have the multipart/form-data!
          // Also only Admins can upload a file, need token
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      //Once the post request is finished, setImage to data, setUploading to false, to remove Loader
      //Component
      setImage(data.data);
      setUploading(false);
      dispatch(setAlert(`Image uploaded successfully`, "success"));
    } catch (error) {
      console.error(error);
      setUploading(false);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setAlert(`Image did not upload: ${message}`, "danger"));
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateBanner(image));
  };

  return (
    <>
      <Meta title={`Banner Edit`} />
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Image src={image} fluid style={{ width: "100%" }} />
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              value={image}
              placeholder="Enter image url"
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}
          </Form.Group>
          <div
            style={{
              width: "80%",
              padding: "1% 0",
              margin: "2% auto",
              textAlign: "center",
            }}
          >
            <Button type="submit" variant="secondary" style={{ width: "100%" }}>
              Update
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default BannerEdit;
