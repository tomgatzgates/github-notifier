import { combineReducers } from "redux";

import token from './token';
import user from "./user";
import issues from "./issues";

export default combineReducers({
  token,
  user,
  issues,
});
