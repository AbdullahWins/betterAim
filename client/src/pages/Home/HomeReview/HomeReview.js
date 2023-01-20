import React from "react";

const HomeReview = ({ review }) => {
  const {
    reviewName,
    reviewEmail,
    reviewPersonImage,
    reviewBody,
    reviewServiceRating,
  } = review;
  return (
    <div>
      <div className="card w-96 glass shadow-xl">
        <div className="avatar pt-4">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 m-auto">
            <img alt="reviweimage" src={reviewPersonImage} />
          </div>
        </div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{reviewName}</h2>
          <p>{reviewBody}</p>
          <div className="card-actions">
            <p>
              Email: {reviewEmail} <br /> Rating: {reviewServiceRating}
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeReview;
