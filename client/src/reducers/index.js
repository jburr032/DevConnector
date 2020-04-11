import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

// combineReducers creates a reducers object which can be called using the built-in function
export default combineReducers({
  alert,
  auth,
});
