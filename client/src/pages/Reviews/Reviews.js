import React from "react";
import { useLoaderData } from "react-router-dom";
import Review from "./Review/Review";

const Reviews = () => {
  const reviews = useLoaderData();
  return (
    <div className="d-flex flex-wrap bg-black py-6 gap-6 text-white items-center justify-center">
      {reviews.map((review) => {
        return <Review key={review._id} review={review}></Review>;
      })}
    </div>
  );
};

export default Reviews;
