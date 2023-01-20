import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { loginUserEmail, providerLogin } = useContext(AuthContext);

  document.title = "Better Aim | Login";

  const errorToast = (error) => toast(`${error}`);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLogin = () => {
    providerLogin(googleProvider)
      .then((result) => {
        navigate(from, { replace: true });
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        errorToast(error.message);
      });
  };

  const handleGithubLogin = () => {
    providerLogin(githubProvider)
      .then((result) => {
        navigate(from, { replace: true });
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        errorToast(error.message);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUserEmail(email, password)
      .then((result) => {
        const email = result.user.email;
        const currentLogin = { email };
        fetch("https://better-aim-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentLogin),
        })
          .then((res) => res.json())
          .then((data) => localStorage.setItem("betterAimToken", data.token));
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        errorToast(error.message);
      });
  };

  return (
    <div className=" text-white bg-base-300 py-6">
      <h2 className="fs-2 text-white text-center mb-6">LOG IN</h2>
      <Form onSubmit={handleLogin} className="w-50 m-auto mt-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="password"
          />
        </Form.Group>
        <div className="my-3 d-flex flex-column align-items-center justify-content-center">
          <button className="btn btn-success" type="submit">
            Submit
          </button>
          <p className="my-2">Don't have an account?</p>
          <Link to="/register">
            <Button className="btn btn-success">Register Now</Button>
          </Link>
          <p className="text-center">
            Or simply log in using google or github from bellow
          </p>
          <div className="my-4  d-flex align-items-center justify-content-center">
            <Button
              className="mx-2"
              onClick={handleGoogleLogin}
              variant="primary"
              type="submit"
            >
              Google Login
            </Button>
            <Button
              className="mx-2"
              onClick={handleGithubLogin}
              variant="primary"
              type="submit"
            >
              Github Login
            </Button>
          </div>
        </div>
        <>
          <ToastContainer />
        </>
      </Form>
    </div>
  );
};

export default Login;
