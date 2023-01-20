import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLoaderData } from "react-router-dom";

const UpdateMyReview = () => {
  const review = useLoaderData();

  document.title = "Better Aim | Update Review";

  const successToast = () => toast(`Review Updated`);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const _id = form._id.value;
    const reviewBody = form.reviewBody.value;
    const reviewServiceRating = form.reviewServiceRating.value;

    const updatedReview = [
      {
        _id,
        reviewBody,
        reviewServiceRating,
      },
    ];

    const url = `https://better-aim-server.vercel.app/myReviews/${review[0]._id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          successToast();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" text-white bg-base-300 py-6">
      <h2 className="fs-2 text-white text-center mb-6">Update Review</h2>
      <Form onSubmit={handleUpdate} className="w-50 m-auto mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Review ID</Form.Label>
          <Form.Control
            name="_id"
            type="text"
            placeholder="review id"
            disabled
            defaultValue={review[0]._id}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Edit Review</Form.Label>
          <Form.Control
            name="reviewBody"
            type="text"
            placeholder="reviewBody"
            defaultValue={review[0].reviewBody}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Edit Rating</Form.Label>
          <Form.Control
            name="reviewServiceRating"
            type="number"
            placeholder="rating"
            defaultValue={review[0].reviewServiceRating}
          />
        </Form.Group>
        <Button type="submit">Update Review</Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default UpdateMyReview;
