import React from "react";
import InputTextBuilder from "../layout/InputTextBuilder";
import ToggleSwitch from "../layout/ToggleSwitch";
import ButtonBuilder from "../layout/ButtonBuilder";
// import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextBetweenLine,
  Text,
  LinkText,
} from "../layout/text-variations";
import ErrorIcon from "@mui/icons-material/Error";

const Login = () => {
  const navigate = useNavigate();

  /* API get: current user */
  const getCurrentUser = () => {
    return localStorage.getItem("username");
  };

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
  // useEffect(() => {
  //   if (getCurrentUser() !== null) {
  //     navigate(-1);
  //   }
  // }, []);

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
      // login(username, password)
      //   .then(() => {
      //     navigate("/");
      //   })
      //   .catch((error) => {
      //     setFormValidation({ isInvalid: true, message: error });
      //   });
    }
  };

  return (
    <OuterContainer>
      <InnerContainer>
        {formValidation.isInvalid ? (
          <LoginErrorValidationContainer>
            <ErrorIcon />
            <Text color="red">
              {formValidation.message.map((msg) => (
                <p key={msg}>{msg}</p>
              ))}
            </Text>
          </LoginErrorValidationContainer>
        ) : null}
        <InputTextBuilder
          type="text"
          name="username"
          label="Email Address"
          placeholder="Type your email address"
          value={username}
          onChange={handleUsernameChange}
          required="required"
        />
        <InputTextBuilder
          label="Password"
          type="password"
          name="password"
          placeholder="Enter at least 6 characters"
          value={password}
          onChange={handlePasswordChange}
          required="required"
        />
        <ToggleSwitch
          label="Remember me"
          labelTextColor="rgba(208, 208, 208)"
          labelFontSize={12}
          switchColor="rgba(255, 175, 101, 1)"
          checked={remember}
          onChange={handleSwitchChange}
        />
      </InnerContainer>
      {/* <LinkText fontSize="12px" onClick={() => navigate("/forgotPassword")}>
        Forgot password?
      </LinkText> */}
      <InnerContainer>
        <ButtonBuilder
          fontSize={15}
          width={"100%"}
          height={48}
          buttonColor="#8E1616"
          buttonColorHover="rgba(255, 175, 101, 0.8)"
          label="Log In"
          labelColor="black"
          radius={16}
          bold={true}
          onClick={handleLogin}
        />
        {/* <TextBetweenLine>or continue with</TextBetweenLine>
        <ButtonBuilder
          fontSize={15}
          width={"100%"}
          height={48}
          buttonColor="rgba(255, 255, 255, 1)"
          buttonColorHover="rgba(255, 255, 255, 0.8)"
          label="Google"
          labelColor="black"
          radius={16}
          bold={true}
          icon={<FcGoogle />}
          onClick={handleGoogleLogin}
        /> */}
      </InnerContainer>
      {/* <div>
        <Text>Don&apos;t have a profile? </Text>
        <LinkText onClick={() => navigate("/signup")}>Sign Up</LinkText>
      </div> */}
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  /* used to centralise*/
  margin: 70px auto;

  /* can be extracted as props in the future */
  width: 560px;
  height: 720px;
  background: #FFFFF;

  /* can be abstraacted as seperate component that extends this*/
  display: grid;
  grid-template-rows: 2fr 3fr 1fr 2fr 1fr;
  justify-items: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginErrorValidationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #fbe9e9;
  color: red;
`;


export default Login
