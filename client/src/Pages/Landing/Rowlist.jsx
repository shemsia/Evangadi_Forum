import React from "react";
import classes from "./style.module.css";
import image from "../../Asset/image/1.png";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Rowlist = ({ user_name, title, question_id }) => {
  console.log(user_name); // Debugging purpose
  return (
    <div className={classes.outer__Wrapper}>
      <Link
        to={`/question/${question_id}`}
        className={classes.question_wrapper}
        style={{ textDecoration: "none" }}
      >
        <div className={classes.right_wrapper}>
          <div className={classes.contact__Wrapper}>
            <div className={classes.image_Wrapper}>
              <img src={image} alt="User" />
            </div>
            <small>
              <b>{user_name}</b>
            </small>
          </div>
          <h6>{title}</h6>
        </div>
        <div className={classes.icon_wrapper}>
          <MdOutlineKeyboardArrowRight className={classes.testIcon} />
        </div>
      </Link>
    </div>
  );
};

export default Rowlist;
