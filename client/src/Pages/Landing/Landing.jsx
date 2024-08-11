import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import Layout from "../../Component/Layout/LayoutForquestion&ans";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosBase } from "../../Api/axiosConfig";
import classes from "./style.module.css";
import Rowlist from "./Rowlist";
import { MdOutlineSearch } from "react-icons/md";
import GridLoader from "react-spinners/GridLoader";

const Landing = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [{ user }] = useContext(DataContext);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Update axiosBase headers with the latest token
    axiosBase.defaults.headers.Authorization = `Bearer ${token}`;

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axiosBase.get("/question", {
          params: { search: searchQuery },
        });
        setData(response.data.questions);
      } catch (error) {
        console.error(
          "Error fetching questions:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchQuestions();
    }
  }, [token, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layout>
      <section className={classes.section__wrapper}>
        <div className={classes.container__wrapper}>
          <div className={`${classes.wrapper} ${classes.c_height}`}>
            <div className={`${classes.search_area} ${classes.c_height}`}>
              <div className={classes.single_search}>
                <input
                  type="text"
                  placeholder="Search question"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={classes.custom_input}
                />
                <div className={classes.icon_area}>
                  <MdOutlineSearch />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.outerWrapper_container}>
            <div className={classes.wrapper_container}>
              <div className={classes.question_link}>
                <Link
                  to="/question"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Ask Question
                </Link>
              </div>
              <b>
                <div>
                  Welcome:
                  <span style={{ color: "red", paddingLeft: "10px" }}>
                    {user ? user.username : "Guest"}
                  </span>
                </div>
              </b>
            </div>

            <div className={classes.rowlist__wrapper}>
              {loading ? (
                <GridLoader color="#da7000" />
              ) : (
                data.map((question, index) => (
                  <Rowlist
                    user_name={question.user_name}
                    title={question.title}
                    question_id={question.question_id}
                    key={index}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;

