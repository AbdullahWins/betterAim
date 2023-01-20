import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);

  document.title = "Better Aim | My Reviews";

  const handleDelete = (id) => {
    const proceed = window.confirm("Confirm Delete?");
    if (proceed) {
      const url = `https://better-aim-server.vercel.app/myReviews/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted Successfully");
          }
        })
        .then(() => setCount(count + 1))
        .catch((err) => console.log(err));
    }
    console.log(id);
  };

  useEffect(() => {
    const url = `https://better-aim-server.vercel.app/myReviews?email=${user?.email}`;
    fetch(url, {
      headers: {
        jwttoken: `${localStorage.getItem("betterAimToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, [user?.email, count]);

  return (
    <div className="bg-base-300 text-white py-6">
      <h2 className="fs-2 text-white text-center">My Reviews</h2>
      <div>
        {reviews.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-5 py-6">
            {reviews.map((review) => {
              return (
                <div key={review._id}>
                  <div className="card w-96 glass shadow-xl">
                    <div className="avatar pt-4">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 m-auto">
                        <img alt="reviweimage" src={review.reviewPersonImage} />
                      </div>
                    </div>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">{review.reviewName}</h2>
                      <p>{review.reviewBody}</p>
                      <div className="card-actions">
                        <p>
                          Email: {review.reviewEmail} <br /> Rating:
                          {review.reviewServiceRating}
                        </p>
                        <div className="flex items-center justify-center">
                          <div>
                            <Link to={`/myReviews/${review?._id}`}>
                              <Button className="btn btn-warning">
                                Edit This Review
                              </Button>
                            </Link>
                          </div>
                          <div>
                            <Link>
                              <Button
                                onClick={() => handleDelete(review?._id)}
                                variant="danger"
                                className="btn btn-danger ml-2"
                              >
                                Delete This Review
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-6">
            <p>You didnot review any service yet</p>
            <div>
              <Link to="/services">
                <Button>Browse Services</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
