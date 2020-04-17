import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

// combineReducers creates a reducers object which can be called using the built-in function
// Each reducer contains a piece of the state which I assume Redux pulls from using combine
export default combineReducers({
  alert,
  auth,
  profile,
  post,
});
