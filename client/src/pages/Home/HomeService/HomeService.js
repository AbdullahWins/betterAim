import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const HomeService = ({ service }) => {
  const { _id, name, img, price, description } = service;

  return (
    <div className="card w-96 bg-base-100 shadow-xl text-white">
      <figure>
        <img src={img} alt="service" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{description.slice(0, 100)}...</p>
        <div className="card-actions justify-center my-2">
          <div className="badge badge-outline">Price: ${price}</div>
        </div>
        <Link to={`/services/${_id}`}>
          <Button className="w-100">Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeService;
