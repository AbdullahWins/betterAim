import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddService = () => {
  const { user } = useContext(AuthContext);

  document.title = "Better Aim | Add Service";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const serviceName = form.serviceName.value;
    const servicePhoto = form.servicePhoto.value;
    const serviceDescription = form.serviceDescription.value;
    const servicePrice = form.servicePrice.value;
    const serviceRating = form.serviceRating.value;
    const service = {
      name: serviceName,
      rating: serviceRating,
      price: servicePrice,
      img: servicePhoto,
      description: serviceDescription,
    };
    fetch(`https://better-aim-server.vercel.app/services`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="py-6 bg-black text-white">
      <h2 className="pb-6 bg-black text-white text-center fs-2">
        Add New Service
      </h2>
      <Form onSubmit={handleSubmit} className="w-50 m-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Service Name</Form.Label>
          <Form.Control
            name="serviceName"
            type="text"
            placeholder="service name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Service Photo URL</Form.Label>
          <Form.Control
            name="servicePhoto"
            type="text"
            placeholder="service photo URL"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Service Description</Form.Label>
          <Form.Control
            name="serviceDescription"
            type="text"
            placeholder="service description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price in USD</Form.Label>
          <Form.Control
            name="servicePrice"
            type="number"
            placeholder="price"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Rating out of 5</Form.Label>
          <Form.Control
            name="serviceRating"
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
          />
        </Form.Group>

        <div className="d-flex flex-column align-items-center justify-content-center">
          <Button variant="primary" className="text-black w-50" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddService;
