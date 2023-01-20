import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeReview from "./HomeReview/HomeReview";
import HomeService from "./HomeService/HomeService";

const Home = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  document.title = "Better Aim | Home";

  useEffect(() => {
    const url = `https://better-aim-server.vercel.app/servicesFromHome?count=3`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const url = `https://better-aim-server.vercel.app/reviewsFromHome`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://images.hdqwalls.com/download/counter-strike-global-offensive4k-q3-1600x900.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Get Better Gamer</h1>
            <p className="mb-5">
              I am offering numbers of services to help you ro get better at any
              game you like. Don't just play for fun. Let's build your gaming
              career together.
            </p>
            <Link to="/register">
              <button className="btn btn-primary  shadow-md shadow-black">
                Join For Free
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-base-100 shadow-xl py-6">
        <h2 className="fs-2 text-white text-center mb-6">Main Services</h2>
        <div className="d-flex flex-wrap items-center justify-center gap-6">
          {services.map((service) => (
            <HomeService key={service._id} service={service}></HomeService>
          ))}
        </div>
        <div className="d-flex flex-wrap items-center justify-center pt-6">
          <Link to="/services">
            <Button className="btn btn-ghost text-white px-6 outline">
              SEE ALL
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-base-300 shadow-xl py-6 text-white">
        <h2 className="fs-2 text-center mb-6">Client Reviews</h2>
        <div className="d-flex flex-wrap items-center justify-center gap-6">
          {reviews.map((review) => {
            return <HomeReview key={review._id} review={review}></HomeReview>;
          })}
        </div>
      </div>
      <div className="bg-base-200 shadow-xl py-6 text-white">
        <h2 className="fs-2 text-center mb-6">Why Me?</h2>
        <div>
          <div className="flex flex-col w-full lg:flex-row">
            <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
              <p>Trusted by Pro Players</p>
            </div>
            <div className="divider lg:divider-horizontal">AND</div>
            <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
              <p>4.9 star rating out of 5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-100 shadow-xl py-6 text-white">
        <h2 className="fs-2 text-center mb-6">Join The Community</h2>
        <div className="d-flex flex-wrap items-center justify-center gap-6">
          <img
            className="w-24"
            src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png"
            alt=""
          />
          <img
            className="w-24"
            src="https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png"
            alt=""
          />
          <img
            className="w-24"
            src="https://yoolk.ninja/wp-content/uploads/2020/08/Apps-teamSpeak-1024x1024.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
