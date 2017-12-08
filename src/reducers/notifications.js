import { SAVE_NOTIFICATIONS } from "actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SAVE_NOTIFICATIONS:
      const notifications = new Set([...state, ...action.payload]);
      console.log('reducer', notifications);
      return [...notifications];
    default:
      return state;
  }
};
