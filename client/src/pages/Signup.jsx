import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/phone.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/mutations";
import Spline from "@splinetool/react-spline";

export default function Signup() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions,
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions,
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions,
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
            <img src={Logo} alt="logo" />
            <h1>Sign up !!</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
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
  background: #000; /* Pure black background for consistency */

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: #ddd; /* Soft white for contrast against the black background */
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(
      0,
      0,
      0,
      0.8
    ); /* Dark, slightly translucent form background */
    backdrop-filter: blur(4px); /* Subtle blur for a frosted glass effect */
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1); /* Soft, subtle shadow for depth */
    border: 1px solid rgba(255, 255, 255, 0.2); /* Light border for definition */

    input {
      background-color: transparent;
      padding: 1rem;
      border: 2px solid #555; /* Dark gray border for inputs */
      border-radius: 1rem;
      color: #ccc; /* Lighter gray for text, ensuring readability */
      width: 100%;
      font-size: 1rem;

      &:focus {
        border-color: #777; /* Slightly lighter gray on focus for distinction */
        outline: none;
        box-shadow: 0 0 0 2px #777; /* Focus shadow for accessibility */
      }
    }

    button {
      background-color: #222; /* Dark gray button for a subtle, stylish look */
      color: #ccc; /* Matching text color for harmony */
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
        background-color: #333; /* Lighter gray on hover for visual feedback */
        box-shadow: 0 2px 20px rgba(255, 255, 255, 0.2); /* Added glow effect on hover */
      }
    }

    span {
      color: #ccc; /* Consistent text color for readability */
      a {
        color: #777; /* Gray link color for subtle contrast */
        text-decoration: none;
        font-weight: bold;

        &:hover {
          color: #aaa; /* Lighter gray on hover for visual feedback */
          text-decoration: underline; /* Added underline on hover for clarity */
        }
      }
    }
  }
`;
