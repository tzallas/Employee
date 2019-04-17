import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function skillReducer(state = initialState.skills, action) {
  switch (action.type) {
    case types.LOAD_SKILLS_SUCCESS:
      return action.skills;
    case types.CREATE_SKILL_SUCCESS:
      return [...state, { ...action.skill }];
    case types.UPDATE_SKILL_SUCCESS:
      return state.map(skill =>
        skill.id === action.skill.id ? action.skill : skill
      );
    case types.DELETE_SKILL_OPTIMISTIC:
      return state.filter(skill => skill.id !== action.skill.id);
    default:
      return state;
  }
}
