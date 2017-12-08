import { SAVE_ISSUES } from "actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_ISSUES:
      // return action.payload.reduce((obj, issue) => {
      //   const thread = obj[issue.id] || {
      //     notifications: [],
      //     type: notification.subject.type,
      //   };

      //   thread.notifications = [...new Set([
      //     ...thread.notifications,
      //     notification,
      //   ])];

      //   obj[notification.subject.url] = thread;

      //   return obj;
      // }, state);

      const issues = new Set([...state, ...action.payload]);
      return [...issues];
    default:
      return state;
  }
};
