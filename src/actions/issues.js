import { SAVE_ISSUES } from "./types";

export function saveIssues(issues) {
  return { type: SAVE_ISSUES, payload: issues };
}
