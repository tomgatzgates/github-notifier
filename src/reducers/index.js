import { combineReducers } from "redux";

import token from './token';
import user from "./user";
import notifications from "./notifications";

export default combineReducers({
  token,
  user,
  notifications,
});
