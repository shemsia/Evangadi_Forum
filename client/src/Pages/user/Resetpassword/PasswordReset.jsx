
import { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { axiosBase } from "../../../Api/axiosConfig";
import classes from "./reset.module.css";


const PasswordReset = ({ onSwitch }) => {
  const [success, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const emailRef = useRef(null);
const[error1,setError]=useState(null)
    async function handleReset(e) {
      e.preventDefault();
      const emailValue = emailRef.current.value;

      if (!emailValue) {
        emailRef.current.style.border = "1px solid red";
        return;
      }

      setLoading(true);

      try {
        await axiosBase.post("/user/password-reset", { email: emailValue });
        setSuccess(true);
      } catch (error) {
        console.error("Something went wrong:", error);
setError(error.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    }
console.log(error1);
    if (success) {
      return (
        <div>
          <div>
            <h6
              style={{ color: "green", fontSize: "25px", paddingTop: "45px" }}
            >
              Reset instruction sent
            </h6>
            <p
              style={{
                color: " #67748e",
                fontSize: "18px",
                paddingTop: "10px",
              }}
            >
              Reset instruction is sent to your email. Please check your email
              to reset your password.
            </p>
          </div>
        </div>
      );
    }
  return (
    <div>
      <form onSubmit={handleReset}>
        <div className={classes.reset__password}>
          <h6>Reset your password</h6>
          <p>
            Fill in your e-mail address below and we will send you an email with
            further instructions.
          </p>
        </div>
        {error1 && <h6 style={{color:"red"}}> No account found with this email</h6>}
        <div className={classes.email_Wrapper}>
          <input ref={emailRef} type="email" placeholder="Email" />
        </div>
        <div>
          <button type="submit" className={classes.signUp__btn}>
            {isLoading ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Reset your password"
            )}
          </button>
        </div>
        <div>
          <button
            style={{
              textDecoration: "none",
              color: "#fe8402",
              paddingRight: "7%",
              backgroundColor: "white",
            }}
            type="button"
            onClick={() => onSwitch("login")}
          >
            Already have an account?
          </button>
        </div>
        <div>
          <button
            style={{
              textDecoration: "none",
              color: "#fe8402",
              paddingRight: "7%",
              backgroundColor: "white",
            }}
            type="button"
            onClick={() => onSwitch("signUp")}
          >
            Don't have an account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
