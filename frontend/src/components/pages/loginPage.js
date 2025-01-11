import React from "react";
// import InputTextBuilder from "../components/ui/InputTextBuilder";
// import ToggleSwitch from "../components/ui/ToggleSwitch";
// import ButtonBuilder from "../components/ui/ButtonBuilder";
// import { FcGoogle } from "react-icons/fc";
// import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   TextBetweenLine,
//   Text,
//   LinkText,
// } from "../components/ui/text-variations";
// import ErrorIcon from "@mui/icons-material/Error";

const Login = () => {
  const navigate = useNavigate();

  /* API get: current user */
  // const getCurrentUser = () => {
  //   return localStorage.getItem("username");
  // };

  /* API post: login */
  // const login = (email, password) => {
  //   return instance
  //     .post(
  //       apigatewayURL + "/auth/login",
  //       {
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data.accessToken) {
  //         TokenService.setUser(response.data);
  //       } else {
  //         response.data.errors = ["Error logging in. Please try again"];
  //         throw response;
  //       }
  //     })
  //     .catch((error) => {
  //       // Try block errors. ie. did not receive access token.
  //       if (error.data) {
  //         throw error.data.errors;
  //       }
  
  //       // Validation Server response
  //       if (error.response) {
  //         console.log(error);
  //         throw error.response.data.errors;
  //       }
  
  //       // Backend is down or any other error
  //       throw ["Unable to connect to server"];
  //     });
  // };

  /* send user to landing page upon successful login */
  useEffect(() => {
    if (getCurrentUser() !== null) {
      navigate("/");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [formValidation, setFormValidation] = useState({
    isInvalid: false,
    message: [],
  });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setRemember(event.target.checked);
  };

  const handleLogin = () => {
    if (username === "" || password === "") {
      setFormValidation({
        isInvalid: true,
        message: ["Fill up all the fields"],
      });
    } else {
      login(username, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setFormValidation({ isInvalid: true, message: error });
        });
    }
  };

  return (
    <div>
      
    </div>
  )
}

export default Login
