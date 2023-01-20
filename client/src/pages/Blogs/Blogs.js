import React from "react";
import { useLoaderData } from "react-router-dom";

const Blogs = () => {
  const blogs = useLoaderData();

  document.title = "Better Aim | Blogs";

  return (
    <div className="bg-black py-6">
      <h2 className="text-center text-white fs-2 pt-6">All Blog Posts</h2>
      <div className="d-flex flex-wrap justify-center gap-4 py-6">
        {blogs.map((blog) => {
          return (
            <div key={blog.id} className="card w-96 bg-base-100 m-6 text-white">
              <div className="card-body">
                <h2 className="card-title text-black">{blog.question}</h2>
                <p>{blog.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
