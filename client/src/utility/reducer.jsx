import {Type}  from "./actiontype";
export const initialState = {
  token: null,
  user: null,
  answers: [], // Add this line to manage answers
};


export const reducer = (state, action) => {
  switch (action.type) {
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case Type.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case Type.CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    case Type.CLEAR_TOKEN:
      return {
        ...state,
        token: null,
      };
    case Type.SET_ANSWERS:
      return {
        ...state,
        answers: action.answers, // Set the answers list
      };
    case Type.ADD_ANSWER:
      return {
        ...state,
        answers: [action.answer, ...state.answers], // Add a new answer to the list
      };
    case Type.CLEAR_ANSWERS:
      return {
        ...state,
        answers: [], // Clear the answers list
      };
    default:
      return state;
  }
};
