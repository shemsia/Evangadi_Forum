import React, { useState, useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../utility/actiontype";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import logo from "../../Asset/image/evangadi-logo-home.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [state, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggle effect

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: Type.CLEAR_USER });
    dispatch({ type: Type.CLEAR_TOKEN });
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu open/close
  };

  return (
    <section className={classes.section__wrapper}>
      <div className={classes.container_wrapper}>
        <div className={classes.leftContainer_wrapper}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={classes.rightContainer_wrapper}>
          <button className={classes.menuButton} onClick={toggleMenu}>
            ☰
          </button>
          <div
            className={`${classes.menuItems} ${isMenuOpen ? classes.open : ""}`}
          >
            <div>
              <Link
                style={{ textDecoration: "none", color: "rgb(34, 33, 33)" }}
                to={"/landing"}
              >
                Home
              </Link>
            </div>
            <Link
              style={{ textDecoration: "none", color: "rgb(34, 33, 33)" }}
              to={"/how-it-works"}
            >
              How it works
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className={classes.logoutButton}
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
