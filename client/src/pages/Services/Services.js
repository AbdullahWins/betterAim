import React from "react";
import { useLoaderData } from "react-router-dom";
import Service from "./Service/Service";

const Services = () => {
  const services = useLoaderData();

  document.title = "Better Aim | Services";

  return (
    <div className="py-6  bg-black">
      <h2 className=" text-center text-white py-6 fs-6 text-bold fs-2">
        All Services
      </h2>
      <div className="d-flex flex-wrap align-center justify-center gap-6 py-6">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
