import { combineReducers } from "redux";
import employees from "./employeeReducer";
import skills from "./skillReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  employees: employees,
  skills: skills,
  apiCallsInProgress
});

export default rootReducer;
