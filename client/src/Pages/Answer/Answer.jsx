import React from 'react'

import classes from "./styles.module.css";
import image from "../../Asset/image/1.png";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
                  
const Answer = ({  answer, user_name }) => {
  return (
    <>
      <div className={classes.outer__Wrapper}>
        <>
          <div className={classes.right_wrapper}>
            <div className={classes.contact__Wrapper}>
              <div className={classes.image_Wrapper}>
                <img src={image} alt="User" />
              </div>
              <small>
                <b>{user_name}</b>
              </small>
            </div>
            <p>{answer}</p>
          </div>
          <div className={classes.icon_wrapper}>
            <MdOutlineKeyboardArrowRight className={classes.testIcon} />
          </div>
        </>
      </div>
    </>
  );
};

export default Answer
