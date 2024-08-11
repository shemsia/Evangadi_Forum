import React, { useRef, useState } from "react";
import { axiosConfig } from "../../Api/axiosConfig";
import classes from "./signUp.module.css";
import { ClipLoader } from "react-spinners";

const SignUp = ({ onSwitch }) => {
  const usernameRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    general: false,
    password: false,
    name: false,
    data: null,
  });

  // Function to check if a string contains numbers
  const containsNumbers = (str) => /\d/.test(str);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const usernameValue = usernameRef.current.value;
    const firstnameValue = firstnameRef.current.value;
    const lastnameValue = lastnameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    // Reset error states
    setError({
      general: false,
      password: false,
      name: false,
      data: null,
    });

    // Validate form inputs
    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      setError((prev) => ({
        ...prev,
        general: true,
      }));
      return;
    }

    if (passwordValue.length < 8) {
      setError((prev) => ({
        ...prev,
        password: true,
      }));
      return;
    }

    if (containsNumbers(firstnameValue) || containsNumbers(lastnameValue)) {
      setError((prev) => ({
        ...prev,
        name: true,
      }));
      return;
    }

    try {
      setLoading(true);
      await axiosConfig.post("/user/register", {
        username: usernameValue,
        first_name: firstnameValue,
        last_name: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      setSuccess(true);
      setTimeout(() => onSwitch("login"), 2000); // Redirect to login after success
    } catch (error) {
      console.error("Registration failed:", error);
      setError((prev) => ({
        ...prev,
        data: error.response?.data?.msg,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success ? (
        <div className={classes.successMessage}>
          <h6>Registration successful! Please log in.</h6>
        </div>
      ) : (
        <form onSubmit={handleSignUp}>
          <div className={classes.signup__title}>
            <h6>Join the Network</h6>
          </div>
          <div className={classes.signUp__Description}>
            <p>
              Already have an account?
              <button
                type="button"
                onClick={() => onSwitch("login")}
                className={classes.signup__Description_orange}
                style={{
                  color: "#da7000",
                  textDecoration: "none",
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "white",
                }}
              >
                Sign In
              </button>
            </p>
            {error.data && <h6 style={{ color: "red" }}>{error.data}</h6>}
            {error.name && (
              <h6 style={{ color: "red" }}>
                Both first name and last name should not contain numeric
                characters.
              </h6>
            )}
            {error.password && (
              <h6 style={{ color: "red" }}>
                Password must be at least 8 characters long.
              </h6>
            )}
          </div>
          <div>
            <input
              className={classes.signup__input}
              type="text"
              name="userName"
              placeholder="User Name"
              ref={usernameRef}
            />
            <div className={classes.firstLast_names}>
              <input
                className={classes.signup__input}
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={firstnameRef}
              />
              <input
                className={classes.signup__input}
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref={lastnameRef}
              />
            </div>
            <input
              className={classes.signup__input}
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
            <input
              id="password"
              className={classes.signup__input}
              type="password"
              name="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <button type="submit" className={classes.signup__btn}>
            {isLoading ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Agree and Join"
            )}
          </button>
          <div className={classes.signup__Description_orange}>
            <button type="button" onClick={() => onSwitch("login")}>
              Already have an account?
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUp;


