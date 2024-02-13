import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/phone.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/mutations";
import Spline from "@splinetool/react-spline";
export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(process.env.KEY, JSON.stringify(data.user));

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <Spline scene="https://prod.spline.design/SkjvHHxhMPN81ssi/scene.splinecode" />
            <div>
              {" "}
              Manuver this image by holding on phone and moving mouse cursor{" "}
            </div>
            <img src={Logo} alt="logo" />
            <h1>Welcome to RealTalk</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Log In</button>
          <span>
            <Link to="/signup">Click here to create an account</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000; /* Pure black background */

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    position: relative;

    img {
      height: 5rem;
      z-index: 1;
    }

    h1 {
      color: #fff; /* White text for contrast */
      text-transform: uppercase;
      font-size: 2rem;
      z-index: 1;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(
      255,
      255,
      255,
      0.05
    ); /* Slightly visible dark overlay */
    backdrop-filter: blur(4px); /* Subtle frosted glass effect */
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7); /* Deep shadow for depth */
    border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border highlight */
    z-index: 2;
    position: relative;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 2px solid #333; /* Darker border for inputs */
    border-radius: 1rem;
    color: #ddd; /* Soft white text */
    font-size: 1rem;

    &:focus {
      border-color: #555; /* Slightly lighter border on focus */
      outline: none;
      box-shadow: 0 0 0 2px #555; /* Focus shadow */
    }
  }

  button {
    background-color: #222; /* Dark button background */
    color: #ddd; /* Soft white text */
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 1rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition:
      background-color 0.3s,
      box-shadow 0.3s;

    &:hover {
      background-color: #333; /* Slightly lighter on hover */
      box-shadow: 0 2px 20px rgba(255, 255, 255, 0.2); /* Subtle hover glow */
    }
  }

  span {
    color: #ddd;
    a {
      color: #999; /* Muted link color */
      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: #bbb; /* Lighter grey on hover */
        text-decoration: underline;
      }
    }
  }
`;
