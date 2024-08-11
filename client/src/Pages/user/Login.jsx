import React, { useState } from "react";
import UserLogin from "./Userlogin";
import SignUp from "./SignUp";
import PasswordReset from "./Resetpassword/PasswordReset";
import LoginLayout from "../../Component/Layout/LoginLayout";
import classes from "./signUp.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [view, setView] = useState("login");

  const handleSwitch = (newView) => {
    setView(newView);
  };

  return (
    <LoginLayout>
      <div className={classes.signup}>
        <div className={classes.signup__container}>
          <div className={classes.signup__form}>
            {view === "login" && <UserLogin onSwitch={handleSwitch} />}
            {view === "signUp" && <SignUp onSwitch={handleSwitch} />}
            {view === "passwordReset" && (
              <PasswordReset onSwitch={handleSwitch} />
            )}
          </div>
          <div className={classes.login__about}>
            <p className={classes.about}>About</p>
            <div className={classes.about__title}>
              <h1>Evangadi Networks Q & A</h1>
            </div>
            <div className={classes.about__Description}>
              <p>
                No matter what stage of life you are in, whether you’re just
                starting elementary school or being promoted to CEO of a Fortune
                500 company, you have much to offer to those who are trying to
                follow in your footsteps.
              </p>
              <p>
                Whether you are willing to share your knowledge or you are just
                looking to meet mentors of your own, please start by joining the
                network here.
              </p>
            </div>
            <div className={classes.last_containerWrapper}>
              <Link to={"/how-it-works"}>HOW IT WORKS</Link>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Login;
