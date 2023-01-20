import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../contexts/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddReview = ({ service, count, setCount }) => {
  const { user } = useContext(AuthContext);

  const notify = () =>
    toast.success("🦄 Review Added!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const reviewServiceId = form.reviewServiceId.value;
    const reviewName = user?.displayName || "undefined";
    const reviewEmail = user?.email || "nomail@null.com";
    const reviewPersonImage = user?.photoURL;
    const reviewBody = form.reviewBody.value;
    const reviewServiceRating = form.reviewServiceRating.value;
    const review = {
      reviewServiceId,
      reviewName,
      reviewEmail,
      reviewPersonImage,
      reviewBody,
      reviewServiceRating,
    };
    fetch(`https://better-aim-server.vercel.app/addReview`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then(() => {
        notify();
        setCount(count + 1);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="py-6 bg-black text-white">
      <h2 className="pb-6 bg-black text-white text-center fs-2">
        Add A Review
      </h2>
      <Form onSubmit={handleSubmit} className="w-50 m-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Service ID</Form.Label>
          <Form.Control
            defaultValue={service?._id}
            name="reviewServiceId"
            type="text"
            placeholder="service id"
            disabled
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Review</Form.Label>
          <Form.Control
            name="reviewBody"
            type="text"
            placeholder="your review"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Rating out of 5</Form.Label>
          <Form.Control
            name="reviewServiceRating"
            type="number"
            placeholder="rating"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            defaultValue={user?.email}
            placeholder="your email"
            required
            disabled
          />
        </Form.Group>

        <div className="d-flex flex-column align-items-center justify-content-center">
          <Button variant="primary" className="text-black w-50" type="submit">
            Submit Review
          </Button>
        </div>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default AddReview;
