import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout/LayoutForquestion&ans";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { axiosBase } from "../../Api/axiosConfig";
import Answer from "./Answer";
import classes from "./styles.module.css";
import { Type } from "../../utility/actiontype";
import { FaArrowCircleRight } from "react-icons/fa";
import GridLoader from "react-spinners/GridLoader";

const SingleQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(DataContext);
  const { question_id } = useParams();
  const [question, setQuestion] = useState(null);
  const [success, setSuccess] = useState(false);
  const [messageTimeout, setMessageTimeout] = useState(null);
  const answerDome = useRef();

  // Fetch question and answers
  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      setLoading(true);
      try {
        // Fetch question
        const questionResponse = await axiosBase.get(
          `/question/${question_id}`
        );
        setQuestion(questionResponse.data.question);

        // Fetch answers
        const answersResponse = await axiosBase.get(`/answer/${question_id}`);
        dispatch({
          type: Type.SET_ANSWERS,
          answers: answersResponse.data.answers,
        });
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
        dispatch({ type: Type.CLEAR_ANSWERS });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [question_id, dispatch]);

  // Post answer and handle success message
  const postAnswer = async (e) => {
    e.preventDefault();
    const answerContent = answerDome.current.value.trim();

    if (!answerContent) {
      answerDome.current.style.backgroundColor = "#f8d7da"; // Set background color for error
      return;
    }

    try {
      setLoading(true);
      const result = await axiosBase.post("/answer", {
        answer: answerContent,
        questionid: question_id,
      });
      const newAnswer = {
        question_id: result.data.question_id,
        answer_id: result.data.answerId,
        content: answerContent,
        user_name: state.user.username,
        created_at: new Date().toISOString(),
      };

      dispatch({ type: Type.ADD_ANSWER, answer: newAnswer });
      answerDome.current.value = "";
      answerDome.current.style.backgroundColor = ""; // Reset background color
      setSuccess(true);

      if (messageTimeout) clearTimeout(messageTimeout);
      setMessageTimeout(setTimeout(() => setSuccess(false), 2000));
    } catch (error) {
      console.error(
        "Error posting answer:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (messageTimeout) clearTimeout(messageTimeout);
      setSuccess(false); // Reset success state on unmount
    };
  }, [messageTimeout]);

  return (
    <Layout>
      <section className={classes.outerSection_Wrapper}>
        {loading ? (
          <GridLoader color="#da7000" />
        ) : (
          <>
            <div className={classes.title_Wrapper}>
              <h1>QUESTION</h1>
              <div className={classes.question_Wrapper}>
                <div className={classes.question_Title}>
                  <FaArrowCircleRight
                    style={{ color: "blue", fontSize: "20px" }}
                  />
                  <h3>{question?.title}</h3>
                </div>
                <div className={classes.question_Description}>
                  {question?.content}
                </div>
              </div>
            </div>

            <div className={classes.answerWrapper}>
              <h1>Answers From The Community</h1>
              {state?.answers?.map((answer) => (
                <Answer
                  key={answer.answer_id}
                  answer={answer.content}
                  user_name={answer.user_name}
                />
              ))}

              {success && (
                <h6 style={{ color: "green" }}>
                  Your answer has been successfully posted
                </h6>
              )}

              <form onSubmit={postAnswer}>
                <textarea
                  ref={answerDome}
                  rows="4"
                  cols="50"
                  placeholder="Your answer..."
                />
                <br />
                <button type="submit">Post Answer</button>
              </form>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default SingleQuestion;
