import { SET_ALERT, REMOVE_ALERT } from "./types";

const uuidv4 = require("uuid/v4");
// When called, the Redux action then calls the reducer
export const setAlert = (msg, alertType, timeout = 2500) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
