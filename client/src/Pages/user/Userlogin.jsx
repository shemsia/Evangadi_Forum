
import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../../Api/axiosConfig";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { Type } from "../../utility/actiontype";
import classes from "./signUp.module.css";

const UserLogin = ({ onSwitch }) => {
  const [, dispatch] = useContext(DataContext);
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
const [error,setError]=useState(false)
      const handleLogin = async (e) => {
        e.preventDefault();

        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        // Clear previous errors
        setError(false);

        // Basic validation
        if (!emailValue || !passwordValue) {
          if (!emailValue) emailRef.current.style.backgroundColor = "lightpink";
          if (!passwordValue)
            passwordRef.current.style.backgroundColor = "lightpink";
          return;
        }

        try {
          const response = await axiosConfig.post("/user/login", {
            email: emailValue,
            password: passwordValue,
          });
          const { token, username } = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify({ username }));

          // Update context state (uncomment if needed)
          // dispatch({ type: Type.SET_USER, user: { Username } });
          // dispatch({ type: Type.SET_TOKEN, token });

          navigate("/landing");
        } catch (error) {
          console.error(
            "Login failed:",
            error?.response?.data?.msg || "An error occurred"
          );
          setError(true);
        }
      };

  return (
    <>
      <div className={classes.form_Wrapper}>
        <div className={classes.signIn_Wrapper}>
          <form onSubmit={handleLogin}>
            <h6>Login to your account</h6>
            <p>
              Don’t have an account?
              <button
                type="button"
                style={{
                  backgroundColor: "white",
                  color: "#FE8402",
                }}
                onClick={() => onSwitch("signUp")}
              >
                Create a new account
              </button>
              {error ? (
                <div style={{ color: "red", padding: "15px" }}>
                  Either the user name or password your entered is incorrect
                </div>
              ) : (
                ""
              )}
            </p>

            <div className={classes.email_Wrapper}>
              <input ref={emailRef} type="email" placeholder="Email" />
            </div>
            <div className={classes.input_wrapper}>
              <input ref={passwordRef} type="password" placeholder="Password" />
            </div>
            <button
              type="button"
              className={classes.password_Wrapper}
              style={{
                backgroundColor: "white",
                color: "#FE8402",
              }}
              onClick={() => onSwitch("passwordReset")}
            >
              Forgot password?
            </button>
            <button type="submit" className={classes.LoginWrapper}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
