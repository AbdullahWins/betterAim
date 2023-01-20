import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import ServiceReview from "./ServiceReview/ServiceReview";
import AddReview from "../../Reviews/AddReview/AddReview";
import { AuthContext } from "../../../contexts/AuthProvider";

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);

  document.title = "Better Aim | Service Details";

  const service = useLoaderData();
  const { _id, name, img, description, price, rating } = service;

  useEffect(() => {
    const url = `https://better-aim-server.vercel.app/reviewsFromDetails?id=${_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => console.log(err));
  }, [_id, count]);

  return (
    <div>
      <div className=" py-6  bg-black">
        <h2 className="text-white text-center pb-6 fs-2">Service Details</h2>
        <div className="d-flex items-center justify-center">
          <div className="card lg:card-side bg-base-100 shadow-xl text-white w-75">
            <figure>
              <PhotoProvider>
                <PhotoView src={img}>
                  <img src={img} alt="pic" />
                </PhotoView>
              </PhotoProvider>
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title">
                {name}
                <div className="badge badge-secondary">Rating: {rating}</div>
              </h2>
              <p className="text-start">{description}</p>
              <div className="card-actions justify-center my-2">
                <div className="badge badge-outline">Price: ${price}</div>
              </div>
              <Link to={`/services/${_id}`}>
                <Button className="w-100">Buy This Service</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="text-white">
          <h2 className=" text-center py-6 fs-2">Reviews</h2>
          <div className="d-flex flex-wrap items-center justify-center gap-6 bg-black py-6">
            {reviews.map((review) => (
              <ServiceReview key={review._id} review={review}></ServiceReview>
            ))}
          </div>
          <div>
            {user?.uid ? (
              <div>
                {
                  <AddReview
                    service={service}
                    count={count}
                    setCount={setCount}
                  ></AddReview>
                }
              </div>
            ) : (
              <div className="d-flex flex-wrap items-center justify-center gap-6 bg-black py-6">
                <Link to="/login">
                  <Button>Login to Review</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
